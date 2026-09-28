# Addendum Prompt Backend — Modul "Cintai Produk Lokal / Bangga Buatan Indonesia"

Salin seluruh isi dokumen ini sebagai prompt lanjutan untuk backend **NTT Cerdas Transaksi** yang sudah dibangun sesuai `Noted/Rebuild-Systems/PROMPT-BACKEND.md`. Dokumen ini HANYA menambah satu kapasitas baru — jangan mengubah model/endpoint yang sudah ada di luar yang disebutkan di sini.

## Latar belakang

Frontend menambahkan modul ke-4: game kartu tebak "Lokal atau Bukan?" (tema lomba "Cintai Produk Lokal" & "Bangga Buatan Indonesia"). Pemain menebak 8 kartu produk, backend perlu mencatat hasilnya seperti pola `KuisAttempt`/`SkenarioAttempt` yang sudah ada.

Frontend sudah memanggil (fire-and-forget, lihat `src/services/api.js`):

```js
POST /api/produk-lokal/attempts
```

## Yang perlu ditambahkan

### 1. Model Prisma baru

```prisma
model ProdukLokalAttempt {
  id           String   @id @default(cuid())
  correctCount Int
  totalCount   Int      @default(8)
  createdAt    DateTime @default(now())

  @@index([createdAt])
}
```

Buat migration baru untuk model ini — jangan mengubah model `KalkulatorSubmission`, `KuisAttempt`, atau `SkenarioAttempt` yang sudah ada.

### 2. Endpoint baru

```text
POST /api/produk-lokal/attempts
```

Payload yang dikirim frontend:

```json
{
  "correctCount": 6,
  "totalCount": 8
}
```

Aturan validasi (ikuti pola `KuisAttempt`/`SkenarioAttempt` yang sudah ada di codebase):

- `correctCount` integer `0..8`;
- `totalCount` harus persis `8`;
- tolak field tambahan yang tidak diperlukan bila validator yang dipakai mendukungnya;
- response `201` untuk record berhasil dibuat, `400` untuk payload invalid, `500` untuk error internal tanpa membocorkan detail database.

### 3. Konsistensi dengan endpoint lain

- Gunakan struktur route/controller/service yang sama dengan `kuisRoutes.js`/`skenarioRoutes.js` yang sudah ada (buat `produkLokalRoutes.js` sejajar).
- Endpoint harus idempotent terhadap retry sejauh masuk akal, cepat, tidak bergantung session pengguna — konsisten dengan sifat fire-and-forget di frontend.
- Jangan menyimpan data selain `correctCount`/`totalCount`/`createdAt` — tidak ada jawaban per-kartu, nama, email, IP, atau data yang bisa mengidentifikasi pengguna.
- CORS, helmet, rate limit, dan error handler terpusat mengikuti konfigurasi yang sudah ada — tidak perlu konfigurasi baru.

### 4. Sekaligus konfirmasi ini

Sebelum atau sesudah menambah endpoint di atas, cek dan laporkan:

- Apakah `POST /api/skenario/attempts` (dan model `SkenarioAttempt`) sudah benar-benar diaktifkan di backend saat ini? Frontend modul Keamanan QRIS sudah memanggil endpoint ini sejak awal (fire-and-forget, jadi tidak blocking kalau belum ada) — tapi kalau memang belum diaktifkan, ini saat yang tepat untuk sekalian menambahkannya mengikuti spesifikasi asli di `PROMPT-BACKEND.md`.

## Pengujian

Tambahkan test untuk endpoint baru mengikuti pola test endpoint kuis/skenario yang sudah ada:

- payload valid → `201`;
- `correctCount` di luar rentang `0..8` → `400`;
- `totalCount` selain `8` → `400`;
- error database/internal → `500` tanpa bocor detail.

Jalankan Prisma generate, migration pada database development, test, lint, dan build setelah selesai. Laporkan file yang dibuat/diubah, hasil test, dan status konfirmasi `SkenarioAttempt` di atas.
