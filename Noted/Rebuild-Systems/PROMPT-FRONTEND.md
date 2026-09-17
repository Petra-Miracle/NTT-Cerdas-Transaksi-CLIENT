# Prompt Pengerjaan Frontend

Salin seluruh isi dokumen ini sebagai prompt untuk mengerjakan frontend proyek **NTT Cerdas Transaksi**.

## Peran dan tujuan

Anda adalah senior frontend engineer. Bangun frontend dari nol di direktori/repo frontend yang terpisah menggunakan **React + JavaScript**, bukan TypeScript. Frontend ini adalah dashboard edukasi untuk pedagang UMKM di Kupang, NTT, dalam konteks Lomba Karya Inovasi Bank Indonesia 2026.

Sumber kebenaran utama untuk seluruh konten, rumus, opsi jawaban, feedback, dan alur interaksi adalah file:

- `Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md`

Jangan mengubah teks final, rumus, atau urutan fitur tanpa meminta konfirmasi pemilik proyek. Dokumen ini hanya membagi pekerjaan agar implementasi frontend rapi; jangan menghilangkan detail yang ada di handoff.

## Keputusan awal yang wajib dikonfirmasi

Sebelum menulis komponen utama, tanyakan dan catat keputusan berikut:

1. Apakah backend menggunakan **analytics anonim** untuk submission Kalkulator QRIS dan attempt Kuis CBP, atau hanya penyimpanan minimal skor kuis?
2. Apakah attempt Keamanan QRIS dikirim ke backend? Default-nya **tidak**, karena versi lama tidak menyimpan skor modul ini.
3. Dari HeroUI, Flowbite, dan MUI, library mana yang menjadi komponen utama? Rekomendasi: Tailwind untuk layout/token, pilih satu antara HeroUI atau Flowbite sebagai basis komponen, dan gunakan MUI hanya jika ada kebutuhan spesifik. Gunakan Lucide-React sebagai satu-satunya sumber ikon.
4. URL produksi backend dan strategi environment variable frontend, misalnya `VITE_API_BASE_URL`.

Jika pemilik belum memberi keputusan, gunakan default rekomendasi di atas, dokumentasikan asumsi di README, dan buat lapisan API agar keputusan dapat diganti tanpa mengubah UI.

## Target struktur frontend

Gunakan struktur yang mudah diuji dan tidak mencampur konten dengan tampilan:

```text
src/
  components/
  modules/
    kalkulator/
      kalkulatorContent.js
      kalkulatorLogic.js
    keamanan/
      keamananContent.js
    kuis/
      kuisContent.js
  pages/
  services/
    api.js
  styles/
```

Nama folder dapat disesuaikan dengan framework routing yang dipilih, tetapi logika rumus dan data konten harus tetap terpisah dari komponen presentasi.

## Urutan implementasi

Kerjakan dan validasi dalam urutan berikut:

1. Fondasi aplikasi, routing/view dashboard, design tokens, responsive layout, dan error boundary.
2. Modul **Kalkulator QRIS** sampai alur penuh selesai.
3. Modul **Keamanan QRIS** sampai seluruh skenario dan reset selesai.
4. Modal **Kuis CBP Rupiah** sampai seluruh soal, feedback, skor, dan ulangi selesai.
5. Onboarding spotlight pada kartu Kalkulator QRIS.
6. Integrasi fire-and-forget ke API backend sesuai kontrak di bawah.

Setelah setiap tahap, jalankan lint/typecheck/test yang tersedia dan uji alur pengguna end-to-end.

## Persyaratan fungsional

### Kalkulator QRIS

Implementasikan wizard empat pertanyaan persis seperti handoff:

- omzet harian: `75000`, `300000`, `750000`, `1250000`;
- pengalaman: `robek`, `basah`, `diragukan`, `kabur`, `tidak-pernah`;
- waktu harian: `5`, `15`, `30`, `50` menit;
- rekening: `ya` atau `belum`.

Pilihan `tidak-pernah` bersifat eksklusif terhadap pilihan lain. Pertanyaan pengalaman dan rekening tidak boleh memengaruhi hasil numerik.

Gunakan rumus persis berikut:

```js
const UPAH_PER_JAM = 15000;
const uangTunaiPerBulan = omzetHarian * 30;
const jamPerBulan = (waktuMenit * 30) / 60;
const nilaiWaktuBulanan = jamPerBulan * UPAH_PER_JAM;
```

Hasil wajib memuat headline waktu, padanan rupiah, breakdown omzet bulanan, dua sisi narasi, rekomendasi rekening, disclaimer, tautan eksternal `https://www.bi.go.id/QRIS` dengan tab baru, dan tombol hitung ulang. Semua teks item, kerugian, tips CBP, manfaat, dan rekomendasi harus diambil persis dari handoff.

Validasi minimal:

- tidak dapat lanjut tanpa jawaban wajib;
- hasil dapat di-reset ke wizard awal;
- angka rupiah memakai format Indonesia;
- desimal jam ditampilkan sebagai angka yang mudah dibaca;
- layout dua sisi menjadi stack pada layar kecil;
- request analytics tidak memblokir tampilan hasil.

### Keamanan QRIS

Implementasikan tiga skenario, masing-masing empat pilihan dan satu jawaban benar. Setelah pilihan dikunci, tampilkan feedback dan penjelasan sebelum tombol lanjut. Skor hanya state sesi, bukan localStorage, kecuali ada keputusan baru dari pemilik. Akhir modul menampilkan skor `X/3`, pesan sesuai hasil, tombol ulangi, dan kembali ke beranda.

### Kuis CBP Rupiah

Implementasikan sebagai modal dari beranda, bukan halaman penuh. Modal selalu mulai dari soal pertama setiap dibuka. Tampilkan sepuluh soal, empat pilihan, feedback langsung, penjelasan, skor akhir `Skor: X/10 · Y% paham`, dan pesan berdasarkan ambang `>=80%`, `50-79%`, dan `<50%` seperti di handoff. Pengiriman attempt ke backend terjadi setelah kuis selesai dan tidak boleh menentukan tampilan skor lokal.

### Onboarding

Pada kunjungan pertama, sorot kartu Kalkulator QRIS dengan tooltip `Mulai di sini`. Hilangkan setelah kartu diklik dan simpan status sudah dilihat di `localStorage`. Jangan membuat onboarding untuk dua modul lain.

## Kontrak API dengan backend

Gunakan service terpusat, timeout yang wajar, dan kegagalan analytics harus diabaikan secara aman tanpa merusak UX. Payload yang dikirim:

```text
POST /api/kalkulator/submissions
{
  "omzetHarian": number,
  "pengalaman": string[],
  "waktuMenit": number,
  "punyaRekening": boolean,
  "uangTunaiPerBulan": number,
  "jamPerBulan": number,
  "nilaiWaktuBulanan": number
}

POST /api/kuis/attempts
{
  "correctCount": number,
  "totalCount": 10
}
```

Endpoint berikut hanya dipakai jika dikonfirmasi:

```text
POST /api/skenario/attempts
GET  /api/stats/summary
```

Frontend tidak boleh mengirim data pribadi, identitas perangkat, atau data akun. Jangan membuat login, form pendaftaran QRIS, chatbot, atau testimoni video.

## Standar kualitas dan validasi

- Gunakan Bahasa Indonesia untuk seluruh UI.
- Pastikan keyboard navigation, label form, fokus modal, dan kontras dapat digunakan.
- Jangan mencampur ikon dari banyak library; gunakan Lucide-React.
- Hindari duplikasi data konten di komponen.
- Tambahkan unit test untuk rumus, eksklusivitas checkbox, format angka, skor kuis, dan pesan rekomendasi.
- Tambahkan pengujian komponen/alur untuk submit wizard, feedback, reset, modal, dan onboarding.
- Jalankan build production dan uji di viewport desktop serta mobile.
- Periksa console browser agar tidak ada error.

Selesaikan implementasi sampai dapat dijalankan lokal. Laporkan file yang dibuat, keputusan yang diasumsikan, perintah menjalankan aplikasi, dan hasil validasi. Jangan mengerjakan backend di direktori frontend.
