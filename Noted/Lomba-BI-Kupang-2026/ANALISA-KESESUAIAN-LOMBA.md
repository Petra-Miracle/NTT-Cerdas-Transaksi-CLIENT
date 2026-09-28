# Analisa Kesesuaian NTT Cerdas Transaksi terhadap Syarat & Ketentuan Lomba KKI/FEKDI — Bank Indonesia Kupang 2026

> Ditulis untuk: tim pengembang NTT Cerdas Transaksi, sebagai bahan evaluasi sebelum pendaftaran/presentasi lomba.
> Sumber syarat & ketentuan: poster resmi panitia (Syarat & Ketentuan + Timeline Lomba), dibaca 2026-09-28.
> Status: item 3.1 (Pelindungan Konsumen) sudah dikerjakan per 2026-09-28 — lihat catatan di bagian 3.1 dan 4.

## 1. Ringkasan Syarat & Ketentuan Lomba

- **Peserta**: mahasiswa aktif Perguruan Tinggi se-Kupang.
- **Tema** (pilih 1 atau lebih): Cintai Produk Lokal, Bangga Buatan Indonesia, Cinta Bangga Paham Rupiah, QRIS, Pelindungan Konsumen.
- **Bentuk karya** — salah satu dari dua kategori:
  - a) Produk kreatif fisik dari bahan daur ulang/bekas: Permainan Edukatif, Papan Mading, Pojok Rupiah.
  - b) Produk digital/konten edukasi yang **dipublikasikan lewat akun media sosial masing-masing peserta**: Website, Video, Poster, Flayer.
- **Wajib**: deskripsi/proposal singkat maksimal 1 halaman.
- **Wajib**: karya mengandung unsur edukasi, kreativitas, dan manfaat sesuai tema.
- **Wajib**: presentasi di depan dewan juri, durasi presentasi + tanya jawab total **7 menit**.
- **Dilarang**: plagiarisme atau memakai karya pihak lain tanpa izin.
- Panitia berhak mendiskualifikasi peserta yang melanggar ketentuan.
- **Timeline**: Pendaftaran 7–30 Sep 2026 · Technical Meeting 1 Okt 2026 · Pelaksanaan & Pengumuman Lomba 4 Okt 2026.

NTT Cerdas Transaksi masuk kategori **b) Website** — sudah sesuai bentuk karya yang diperbolehkan.

## 2. Pemetaan Tema Lomba vs Modul yang Sudah Ada

| Tema Lomba | Status di sistem saat ini |
|---|---|
| QRIS | ✅ Kuat — Kalkulator QRIS (penghematan waktu/biaya) + Keamanan QRIS (3 skenario penipuan) |
| Cinta Bangga Paham Rupiah | ✅ Kuat — Kuis CBP Rupiah (10 soal seputar keaslian & perawatan uang) |
| Pelindungan Konsumen | ✅ Kuat (sejak 2026-09-28) — Keamanan QRIS kini menutup dengan panel hak konsumen digital + kanal pengaduan resmi (BI BICARA 131, OJK 157) |
| Cintai Produk Lokal | ✅ Kuat (sejak 2026-09-28) — modul ke-4 "Lokal atau Bukan?" (kartu tebak 8 produk lokal NTT vs impor) |
| Bangga Buatan Indonesia | ✅ Kuat (sejak 2026-09-28) — kartu yang sama juga mencakup produk buatan Indonesia secara umum (batik, sepatu lokal, dll.), bukan cuma NTT |

Sistem saat ini sudah menyentuh kelima tema lomba (QRIS, CBP Rupiah, Pelindungan Konsumen, Cintai Produk Lokal, Bangga Buatan Indonesia). Proposal tetap boleh memilih fokus ke sebagian tema saja kalau ingin narasi lebih tajam — syarat lomba tidak mewajibkan semua tema dicakup.

## 3. Kekurangan yang Perlu Ditambahkan

### 3.1 Perlindungan Konsumen belum jadi modul/penekanan eksplisit — ✅ Selesai (2026-09-28)

Keamanan QRIS sebelumnya berhenti di "kenali skenario penipuan" tanpa langkah lanjutan. Sudah ditambahkan:

- Panel "Kamu Punya Hak sebagai Konsumen Digital" yang tampil setelah pengguna menyelesaikan ketiga skenario (`src/modules/keamanan/KeamananFlow.jsx`, layar `selesai`), berisi 3 hak dasar konsumen: hak atas informasi jelas, hak mengajukan komplain, hak atas keamanan data (`HAK_KONSUMEN_DIGITAL` di `keamananContent.js`).
- Daftar kanal pengaduan resmi — Bank Indonesia BICARA (call center 131) dan OJK Layanan Konsumen (call center 157) — beserta anjuran menghubungi bank/penyedia QRIS terkait untuk kasus spesifik (`KANAL_PENGADUAN_RESMI` di `keamananContent.js`).

Belum dilakukan: verifikasi ulang nomor/kanal kontak ke sumber resmi terbaru sebelum presentasi ke juri BI (nomor yang dipakai adalah kanal publik yang sudah lama dikenal, tapi ada baiknya dicek ulang menjelang hari-H).

### 3.2 Proposal/deskripsi karya (dokumen, bukan kode)
Syarat lomba mewajibkan deskripsi/proposal maksimal 1 halaman. Ini dokumen terpisah dari aplikasi, belum ada di repo. Perlu disusun sebelum pendaftaran (7–30 Sep 2026), berisi: latar belakang masalah, solusi (3 modul), tema yang dipilih, manfaat, dan keunikan (mis. maskot KoRa sebagai Duta Rupiah Flobamora).

**Prioritas: Tinggi — ada tenggat pendaftaran.**

### 3.3 Deklarasi orisinalitas & kejelasan lisensi aset
Lomba melarang plagiarisme/memakai karya pihak lain tanpa izin. Perlu dicek dan didokumentasikan:
- Status maskot KoRa (`src/assets/img/BonekaKoRa-removebg.png`) — apakah aset buatan sendiri/tim, atau render pihak ketiga yang perlu izin/atribusi.
- Font (Space Grotesk, Plus Jakarta Sans dari Google Fonts — aman, open license) dan ikon (Lucide — open source, aman).
- Sumber data/formula kalkulator dan soal kuis (sudah ada di `Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md`, tapi presentasi ke juri sebaiknya menyebut sumber rujukan resmi, mis. ketentuan BI soal QRIS dan kampanye CBP Rupiah).

**Prioritas: Tinggi** — risiko diskualifikasi kalau tidak jelas saat ditanya juri.

### 3.4 Mode presentasi/demo untuk sesi juri (7 menit)
Aplikasi saat ini dirancang untuk pengguna akhir (UMKM), bukan untuk demo cepat ke juri. Untuk sesi presentasi 7 menit, akan membantu bila ada:
- Alur demo singkat yang sudah dihafal/di-script (bukan fitur kode), atau
- Tombol/skenario "reset cepat" yang sudah ada (`↻ Ulangi`, `↻ Hitung ulang`) — ini sudah cukup, tinggal dipraktikkan agar demo lancar dalam waktu terbatas.

**Prioritas: Sedang** — lebih ke latihan presentasi daripada fitur baru.

### 3.5 Rujukan regulasi resmi untuk kredibilitas edukasi
Konten edukasi (kalkulator, skenario keamanan, kuis CBP) saat ini disajikan sebagai fakta tanpa kutipan sumber resmi di dalam UI. Menambahkan referensi singkat (mis. footnote/link ke halaman resmi BI tentang QRIS atau kampanye CBP Rupiah) akan memperkuat nilai "manfaat" dan "edukasi" di mata juri.

**Prioritas: Sedang.**

### 3.6 Bukti dampak/penggunaan untuk presentasi
Sudah ada endpoint analytics fire-and-forget (`submitKuisAttempt`, `submitSkenarioAttempt`), tapi belum ada tampilan agregat (mis. total percobaan, rata-rata skor) yang bisa ditunjukkan ke juri sebagai bukti "manfaat terukur". Ini nice-to-have, bukan wajib di syarat lomba, tapi kuat secara persuasif saat presentasi.

**Prioritas: Rendah/opsional** — tergantung waktu yang tersisa sebelum 4 Okt 2026.

### 3.7 Publikasi media sosial
Syarat kategori digital menyebut karya "dipublikasikan melalui akun sosial media masing-masing peserta". Ini di luar cakupan aplikasi itu sendiri (aksi tim, bukan fitur website), tapi perlu dicatat sebagai *to-do administratif*: siapkan poster/video pendek yang merangkum NTT Cerdas Transaksi untuk diposting sebagai bagian dari syarat publikasi.

**Prioritas: Tinggi — ada kewajiban publikasi, bukan cuma bikin website.**

### 3.8 Tema "Cintai Produk Lokal" / "Bangga Buatan Indonesia" — ✅ Selesai (2026-09-28)

Ditambahkan modul ke-4: **"Lokal atau Bukan?"** (`/produk-lokal`, `src/modules/produklokal/`) — game kartu tebak. Tiap kartu menampilkan satu produk (deskripsi singkat), pemain menebak "Lokal/Buatan Indonesia" atau "Produk Impor", lalu mendapat fakta singkat kenapa jawabannya begitu dan skor di akhir (8 kartu total, mencakup produk khas NTT — tenun ikat, kopi Bajawa, sasando, garam krosok — dan produk buatan Indonesia lain seperti batik dan sepatu lokal, dikontraskan dengan produk impor generik).

Dipilih format ini (dibanding galeri statis atau kuis pilihan ganda biasa) supaya modul ke-4 terasa beda secara interaksi dari 3 modul sebelumnya (kalkulator, skenario keamanan, kuis) — tetap konsisten secara arsitektur/visual dengan modul lain (dipakai lagi komponen `AnswerCard`, `ProgressDots`, pola panel-glow), jadi risiko dan waktu pengerjaannya tetap rendah.

## 4. Rekomendasi Prioritas (Ringkas)

| # | Item | Jenis | Prioritas |
|---|---|---|---|
| 1 | ~~Tambah info kanal pengaduan/hak konsumen di modul Keamanan QRIS~~ | Fitur kecil | ✅ Selesai |
| 2 | Susun proposal/deskripsi 1 halaman | Dokumen (non-kode) | Tinggi |
| 3 | Cek & dokumentasikan lisensi/orisinalitas aset (maskot, konten) | Administratif | Tinggi |
| 4 | Siapkan poster/video untuk publikasi media sosial | Administratif | Tinggi |
| 5 | Latihan demo 7 menit pakai alur yang sudah ada | Persiapan presentasi | Sedang |
| 6 | Tambah rujukan sumber resmi di konten edukasi | Konten | Sedang |
| 7 | Tampilan agregat dampak penggunaan (opsional) | Fitur | Rendah |
| 8 | ~~Modul tambahan untuk tema Produk Lokal/Buatan Indonesia~~ | Fitur besar | ✅ Selesai |

## 5. Catatan

Analisis ini dibuat berdasarkan kondisi sistem per 2026-09-28 (awalnya 3 modul: Kalkulator QRIS, Keamanan QRIS, Kuis CBP Rupiah, ditambah loading screen & hero redesign). Item 3.1 (Pelindungan Konsumen) dan 3.8 (modul ke-4 "Lokal atau Bukan?") sudah dikerjakan pada tanggal yang sama — sistem sekarang punya 4 modul dan menyentuh kelima tema lomba. Item 3.2–3.7 di atas masih perlu dikonfirmasi dan diprioritaskan bersama tim sebelum dikerjakan, terutama yang bertenggat sebelum pendaftaran ditutup (30 Sep 2026).
