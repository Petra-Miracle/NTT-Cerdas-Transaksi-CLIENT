# Prompt Pengerjaan Backend

Salin seluruh isi dokumen ini sebagai prompt untuk mengerjakan backend proyek **NTT Cerdas Transaksi**.

## Peran dan tujuan

Anda adalah senior backend engineer. Bangun backend di direktori/repo yang berbeda dari frontend menggunakan **Express.js + Prisma ORM + PostgreSQL Neon**. Backend akan di-deploy ke Vercel sebagai serverless function, bukan sebagai proses server yang selalu hidup.

Sumber kebenaran produk, isi fitur, dan batas scope adalah:

- `Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md`

Backend harus mendukung frontend tanpa mengambil alih state UI. Tidak ada login, akun pengguna, pendaftaran QRIS langsung, chatbot, atau penyimpanan data pribadi.

## Keputusan yang wajib dikonfirmasi sebelum migrasi

Tanyakan dan catat terlebih dahulu:

1. Mode backend yang dipilih:
   - **Analytics anonim**: simpan submission kalkulator dan attempt kuis.
   - **Minimal**: simpan hanya attempt kuis.
2. Apakah `SkenarioAttempt` diaktifkan? Default-nya **tidak**.
3. Apakah endpoint statistik agregat dibutuhkan untuk presentasi lomba? Default-nya **tidak** sampai diminta.
4. Nama database Neon, environment deployment, URL frontend yang diizinkan CORS, dan strategi migrasi production.

Jika keputusan belum tersedia, gunakan mode analytics anonim untuk endpoint kalkulator dan kuis, matikan attempt skenario dan statistik, lalu dokumentasikan bahwa itu asumsi yang dapat diubah. Jangan meminta frontend menunggu keputusan analytics untuk tetap berfungsi.

## Target struktur backend

```text
src/
  app.js
  server.js
  routes/
    kalkulatorRoutes.js
    kuisRoutes.js
    skenarioRoutes.js
    statsRoutes.js
  controllers/
  services/
  middleware/
    errorHandler.js
    validateRequest.js
  lib/
    prisma.js
prisma/
  schema.prisma
api/
  index.js
vercel.json
.env.example
README.md
```

Nama file boleh disesuaikan, tetapi `app` Express harus dapat di-export tanpa `app.listen()` untuk Vercel. `app.listen()` hanya boleh digunakan oleh entrypoint development lokal.

## Skema Prisma

Untuk mode analytics anonim, mulai dari skema berikut dan gunakan nama field yang kompatibel dengan kontrak frontend:

```prisma
model KalkulatorSubmission {
  id                 String   @id @default(cuid())
  omzetHarian        Int
  pengalaman         String[]
  waktuMenit         Int
  punyaRekening      Boolean
  uangTunaiPerBulan  Int
  jamPerBulan        Float
  nilaiWaktuBulanan  Int
  createdAt          DateTime @default(now())

  @@index([createdAt])
}

model KuisAttempt {
  id           String   @id @default(cuid())
  correctCount Int
  totalCount   Int      @default(10)
  createdAt    DateTime @default(now())

  @@index([createdAt])
}
```

Tambahkan model berikut hanya jika sudah dikonfirmasi:

```prisma
model SkenarioAttempt {
  id           String   @id @default(cuid())
  correctCount Int
  totalCount   Int      @default(3)
  createdAt    DateTime @default(now())

  @@index([createdAt])
}
```

Jangan menyimpan jawaban mentah yang tidak diperlukan, nama, email, nomor telepon, IP address, fingerprint, atau kredensial pengguna.

## Kontrak endpoint

Implementasikan endpoint berikut:

```text
GET  /api/health
POST /api/kalkulator/submissions
POST /api/kuis/attempts
```

Endpoint opsional, hanya setelah dikonfirmasi:

```text
POST /api/skenario/attempts
GET  /api/stats/summary
```

### Validasi request

`POST /api/kalkulator/submissions` menerima:

```json
{
  "omzetHarian": 75000,
  "pengalaman": ["robek"],
  "waktuMenit": 5,
  "punyaRekening": true,
  "uangTunaiPerBulan": 2250000,
  "jamPerBulan": 2.5,
  "nilaiWaktuBulanan": 37500
}
```

Aturan validasi:

- `omzetHarian` hanya boleh `75000`, `300000`, `750000`, atau `1250000`;
- `pengalaman` hanya berisi `robek`, `basah`, `diragukan`, `kabur`, `tidak-pernah`;
- `tidak-pernah` eksklusif dan harus menjadi satu-satunya nilai jika dipakai;
- `waktuMenit` hanya boleh `5`, `15`, `30`, atau `50`;
- `punyaRekening` wajib boolean;
- hasil numerik harus konsisten dengan rumus resmi: `omzetHarian * 30`, `(waktuMenit * 30) / 60`, dan `jamPerBulan * 15000`;
- angka harus finite, tidak negatif, dan integer/float sesuai field;
- tolak field tambahan yang tidak diperlukan bila validator yang dipakai mendukungnya.

`POST /api/kuis/attempts` menerima `correctCount` integer `0..10` dan `totalCount` harus `10`. Jika endpoint skenario diaktifkan, terima `correctCount` integer `0..3` dan `totalCount` harus `3`.

Gunakan status HTTP yang konsisten: `201` untuk record berhasil dibuat, `400` untuk payload invalid, `404` untuk route tidak ditemukan, dan `500` untuk error internal tanpa membocorkan detail database.

## Database dan serverless

- Gunakan satu singleton PrismaClient per instance runtime agar development hot reload dan serverless tidak membuat client berlebihan.
- Gunakan `DATABASE_URL` pooled Neon/PgBouncer untuk runtime serverless.
- Gunakan `DIRECT_URL` hanya bila dibutuhkan Prisma migration.
- Jangan menjalankan migration otomatis setiap request.
- Tambahkan `.env.example` tanpa secret.
- Sediakan script `prisma:generate`, `prisma:migrate:dev`, dan command build/deploy yang jelas.
- Tangani graceful shutdown hanya untuk proses lokal, bukan dengan asumsi server production selalu hidup.

## CORS dan keamanan minimum

- Batasi CORS ke origin frontend melalui environment variable; dukung daftar origin bila diperlukan.
- Aktifkan `helmet`, JSON body limit yang kecil, dan rate limit untuk endpoint POST.
- Jangan menganggap data dari frontend tepercaya; hitung ulang hasil kalkulator di server dan simpan hasil server-side.
- Jangan log payload lengkap bila kelak payload berubah mengandung informasi sensitif.
- Gunakan error handler terpusat dan response error yang tidak membocorkan stack trace pada production.

## Statistik opsional

Jangan membuat endpoint statistik sebelum dikonfirmasi. Jika diaktifkan, endpoint harus hanya mengembalikan agregat anonim, misalnya jumlah submission, rata-rata skor kuis, dan distribusi omzet. Jangan mengembalikan record mentah atau data yang dapat mengidentifikasi pengguna.

## Integrasi dan pengujian

Frontend akan memanggil endpoint tanpa menunggu analytics selesai. Karena itu endpoint harus idempotent terhadap retry sejauh masuk akal, cepat, dan tidak bergantung pada session pengguna.

Tambahkan pengujian untuk:

- health check;
- payload valid pada tiap endpoint;
- semua batas enum dan formula kalkulator;
- konflik `tidak-pernah`;
- nilai skor di luar rentang;
- error database/internal;
- CORS dan response status;
- route handler tanpa database real menggunakan mock bila sesuai stack.

Jalankan Prisma generate, migration pada database development, test, lint, dan build. Uji endpoint dengan request lokal. Verifikasi deployment shape Vercel: entrypoint mengekspor Express app dan tidak memanggil `app.listen()` saat di-import oleh platform.

Selesaikan implementasi sampai dapat dijalankan lokal. Laporkan file yang dibuat, keputusan yang diasumsikan, environment variable yang diperlukan, command menjalankan/migrate/test, serta hasil validasi. Jangan mengerjakan UI atau memindahkan logika tampilan ke backend.
