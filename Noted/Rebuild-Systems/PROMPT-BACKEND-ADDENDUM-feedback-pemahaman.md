# Addendum Prompt Backend — Feedback Anonim & Cek Pemahaman (Pre/Post-Test)

Salin seluruh isi dokumen ini sebagai prompt lanjutan untuk backend **NTT Cerdas Transaksi** yang sudah dibangun sesuai `Noted/Rebuild-Systems/PROMPT-BACKEND.md` (dan addendum produk lokal jika sudah dikerjakan). Dokumen ini HANYA menambah dua kapasitas baru — jangan mengubah model/endpoint yang sudah ada di luar yang disebutkan di sini.

## Latar belakang

Untuk memperkuat bukti dampak edukasi (dipakai sebagai evidence penjurian lomba), frontend menambahkan dua fitur baru:

1. **Feedback anonim pasca-modul** — form singkat 3 pertanyaan yang tampil setelah user menyelesaikan sebuah modul (pilot: Keamanan QRIS, nantinya bisa dipasang di modul lain).
2. **Cek pemahaman pre/post-test** — 3 soal pilihan ganda yang sama, dijawab sekali sebelum materi (`fase: "awal"`) dan sekali sesudah materi (`fase: "akhir"`), untuk mengukur peningkatan pemahaman keamanan QRIS secara agregat. Pilot: modul Keamanan QRIS saja.

Frontend sudah memanggil (fire-and-forget, lihat `src/services/api.js`):

```js
POST /api/feedback
POST /api/pemahaman/attempts
```

Kedua panggilan **tidak memblokir UI** — kalau backend belum ada/gagal, user tetap melihat hasil dan konfirmasi seperti biasa (pola yang sama dengan `submitKuisAttempt`/`submitSkenarioAttempt`/`submitProdukLokalAttempt`).

## Prinsip privasi (wajib)

- **Tidak ada** field nama, nomor telepon, email, IP address, fingerprint device, session ID, atau data lain yang bisa mengidentifikasi individu.
- Komentar bebas teks (`komentar`) hanya untuk isi masukan materi — jangan tambahkan validasi/parsing yang mencoba mengekstrak identitas dari teks tersebut.
- Data hanya boleh dipakai/diekspos sebagai **agregat** (rata-rata, distribusi, jumlah) untuk keperluan laporan lomba — jangan buat endpoint yang mengembalikan baris mentah individual ke publik.

## Yang perlu ditambahkan

### 1. Model Prisma baru

```prisma
model Feedback {
  id             String   @id @default(cuid())
  modul          String
  pemahaman      Int
  relevansi      String
  komentar       String?
  laporanKonten  Boolean  @default(false)
  createdAt      DateTime @default(now())

  @@index([createdAt])
  @@index([modul])
}

model PemahamanAttempt {
  id         String   @id @default(cuid())
  modul      String
  fase       String
  skor       Int
  totalCount Int      @default(3)
  createdAt  DateTime @default(now())

  @@index([createdAt])
  @@index([modul, fase])
}
```

Buat migration baru untuk kedua model ini — jangan mengubah model `KalkulatorSubmission`, `KuisAttempt`, `SkenarioAttempt`, atau `ProdukLokalAttempt` yang sudah ada.

### 2. Endpoint: `POST /api/feedback`

Payload yang dikirim frontend (lihat `src/components/FeedbackForm.jsx`):

```json
{
  "modul": "keamanan",
  "pemahaman": 4,
  "relevansi": "ya",
  "komentar": "Bagian notifikasi resmi paling membantu",
  "laporanKonten": false
}
```

Aturan validasi:

- `modul` string, wajib diisi, whitelist nilai yang dikenal (`"keamanan"` untuk saat ini; siapkan agar mudah menambah modul lain seperti `"kalkulator"`, `"kuis"`, `"produk-lokal"` nanti tanpa migration baru).
- `pemahaman` integer `1..5`.
- `relevansi` hanya boleh `"ya"`, `"sebagian"`, atau `"tidak"`.
- `komentar` string opsional, maksimal 500 karakter, boleh string kosong/null — simpan sebagai `null` jika kosong.
- `laporanKonten` boolean, default `false`.
- Tolak field tambahan yang tidak diperlukan bila validator yang dipakai mendukungnya.
- Response `201` untuk record berhasil dibuat, `400` untuk payload invalid, `500` untuk error internal tanpa membocorkan detail database.

### 3. Endpoint: `POST /api/pemahaman/attempts`

Payload yang dikirim frontend (lihat `src/components/KnowledgeCheck.jsx`):

```json
{
  "modul": "keamanan",
  "fase": "awal",
  "skor": 2,
  "totalCount": 3
}
```

Aturan validasi:

- `modul` string, wajib diisi, sama pola whitelist seperti di atas.
- `fase` hanya boleh `"awal"` atau `"akhir"`.
- `skor` integer `0..totalCount`.
- `totalCount` harus persis `3` untuk saat ini (satu-satunya cek pemahaman yang ada adalah Keamanan QRIS, 3 soal).
- Tolak field tambahan yang tidak diperlukan bila validator yang dipakai mendukungnya.
- Response `201` untuk record berhasil dibuat, `400` untuk payload invalid, `500` untuk error internal tanpa membocorkan detail database.

### 4. Konsistensi dengan endpoint lain

- Gunakan struktur route/controller/service yang sama dengan `kuisRoutes.js`/`skenarioRoutes.js`/`produkLokalRoutes.js` yang sudah ada (buat `feedbackRoutes.js` dan `pemahamanRoutes.js` sejajar).
- Endpoint harus idempotent terhadap retry sejauh masuk akal, cepat, tidak bergantung session pengguna — konsisten dengan sifat fire-and-forget di frontend.
- CORS, helmet, rate limit, dan error handler terpusat mengikuti konfigurasi yang sudah ada — tidak perlu konfigurasi baru.

### 5. Endpoint agregat opsional (hanya jika diminta untuk laporan lomba)

Jangan buat endpoint ini kecuali diminta eksplisit. Jika diminta, buat `GET /api/pemahaman/summary?modul=keamanan` yang mengembalikan **hanya** agregat, contoh:

```json
{
  "modul": "keamanan",
  "awal": { "rataRataSkor": 1.4, "totalCount": 3, "jumlahResponden": 87 },
  "akhir": { "rataRataSkor": 2.6, "totalCount": 3, "jumlahResponden": 74 }
}
```

Dan `GET /api/feedback/summary?modul=keamanan` yang mengembalikan agregat serupa (rata-rata `pemahaman`, distribusi `relevansi`, jumlah `laporanKonten=true`) — **tanpa** mengembalikan `komentar` mentah satu per satu ke endpoint publik; jika komentar mentah dibutuhkan untuk laporan internal, buat endpoint terpisah yang jelas ditandai tidak untuk publik.

## Pengujian

Tambahkan test untuk kedua endpoint baru mengikuti pola test endpoint kuis/skenario/produk-lokal yang sudah ada:

**`POST /api/feedback`**

- payload valid (dengan & tanpa komentar) → `201`;
- `pemahaman` di luar rentang `1..5` → `400`;
- `relevansi` selain `ya`/`sebagian`/`tidak` → `400`;
- `komentar` lebih dari 500 karakter → `400`;
- error database/internal → `500` tanpa bocor detail.

**`POST /api/pemahaman/attempts`**

- payload valid untuk `fase: "awal"` dan `fase: "akhir"` → `201`;
- `fase` selain `awal`/`akhir` → `400`;
- `skor` di luar rentang `0..totalCount` → `400`;
- `totalCount` selain `3` → `400`;
- error database/internal → `500` tanpa bocor detail.

Jalankan Prisma generate, migration pada database development, test, lint, dan build setelah selesai. Laporkan file yang dibuat/diubah, hasil test, dan konfirmasi apakah endpoint agregat opsional (§5) ikut dibuat atau tidak.
