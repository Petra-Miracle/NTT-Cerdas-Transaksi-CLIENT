
# Handoff Prompt: Rebuild "NTT Cerdas Transaksi" (Full-Stack)

Salin seluruh isi file ini sebagai prompt awal ke AI coding assistant (Claude
Code, Cursor, dsb.) untuk membangun ulang proyek dari nol dengan stack baru.
Dokumen ini adalah hasil analisis lengkap dari versi frontend-only yang
sudah ada dan berfungsi — tujuannya supaya rebuild ini **tidak kehilangan
satu pun konten, rumus, atau alur interaksi** dari versi sebelumnya,
sekaligus naik level dari sisi arsitektur (frontend framework + backend +
database sungguhan).

---

## 1. Konteks proyek

Proyek untuk **Lomba Karya Inovasi Bank Indonesia (Kupang) 2026**, kategori
mahasiswa aktif PT se-Kupang. Tema: **QRIS** dan **Pelindungan Konsumen**,
dengan sentuhan **Cinta Bangga Paham (CBP) Rupiah**. Nama produk: portal
**"NTT Cerdas Transaksi"** — dashboard edukasi untuk pedagang UMKM di
Kupang, NTT.

Versi sebelumnya (yang sedang di-porting ini) adalah **murni frontend**
(HTML/CSS/JavaScript vanilla, tanpa backend, data disimpan di
`localStorage` browser) dan **sudah selesai dibangun serta berfungsi
penuh** untuk ketiga modulnya. Rebuild ini bukan untuk mengubah fitur atau
konten, melainkan mengganti fondasi teknisnya jadi arsitektur full-stack
sungguhan, sambil mempertahankan (atau meningkatkan) semua fungsi yang
sudah ada.

---

## 2. Perubahan arsitektur: dari versi lama ke versi baru

| Aspek            | Versi lama (sekarang)                                      | Versi baru (target rebuild)                                                                                                                    |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend         | HTML/CSS/JS vanilla, satu`index.html` sebagai SPA manual | **React** (JavaScript, bukan TypeScript)                                                                                                 |
| Styling/komponen | CSS custom murni (design token manual)                     | **Tailwind CSS** + **HeroUI** + **Flowbite** + **Material UI (MUI)** untuk komponen, **Lucide-React** untuk ikon |
| Backend          | Tidak ada                                                  | **Express.js** (REST API)                                                                                                                |
| Database         | Tidak ada (semua state di`localStorage`)                 | **PostgreSQL** lewat **Prisma ORM**                                                                                                |
| Hosting DB       | —                                                         | **Neon** (Postgres serverless)                                                                                                           |
| Hosting Frontend | Statis, dibuka langsung dari file/local server             | **Vercel**                                                                                                                               |
| Hosting Backend  | —                                                         | **Vercel** (sebagai serverless functions)                                                                                                |

### 2.1 Catatan teknis penting — wajib diperhatikan sebelum mulai coding

1. **Kombinasi 3 library komponen (HeroUI + Flowbite + MUI) dalam satu
   frontend berisiko tinggi menghasilkan tampilan yang tidak konsisten**,
   karena ketiganya punya sistem styling berbeda: HeroUI dan Flowbite
   sama-sama berbasis Tailwind (relatif mudah dipadukan), sedangkan MUI
   punya sistem styling sendiri (Emotion/CSS-in-JS) yang tidak otomatis
   selaras dengan token Tailwind. **Sebelum mulai membangun UI, tentukan
   dulu pembagian tanggung jawab tiap library** — misalnya: Tailwind untuk
   layout/utility custom, HeroUI atau Flowbite sebagai sistem komponen
   utama (pilih salah satu sebagai basis, bukan dua-duanya dicampur bebas
   di komponen yang sama), MUI dipakai hanya untuk komponen spesifik yang
   memang tidak tersedia baik di HeroUI/Flowbite, dan Lucide-React sebagai
   satu-satunya sumber ikon di seluruh aplikasi (supaya gaya ikon
   konsisten, tidak campur dengan ikon bawaan MUI). Kalau ini belum jelas,
   **tanyakan dulu ke pemilik proyek sebelum mengasumsikan sendiri
   pembagiannya.**
2. **Express di Vercel berjalan sebagai serverless function, bukan server
   yang terus menyala.** Struktur backend perlu disesuaikan (mis. app
   Express di-export dan dibungkus lewat satu entry point serverless,
   bukan dijalankan dengan `app.listen()` langsung di production) supaya
   kompatibel dengan model deployment Vercel.
3. **Prisma + Neon di lingkungan serverless rawan connection exhaustion**
   kalau tiap invocation function bikin koneksi baru ke Postgres. Gunakan
   *connection pooling* dari Neon (connection string mode "pooled"/
   PgBouncer) untuk `DATABASE_URL` yang dipakai Prisma di runtime
   serverless, supaya jumlah koneksi tidak membludak saat traffic naik.
4. Frontend dan backend boleh disatukan dalam satu repo (monorepo, mis.
   folder `apps/web` dan `apps/api`) atau dipisah jadi dua repo dan dua
   proyek Vercel terpisah — **pilih salah satu dan konsisten**, karena
   akan memengaruhi cara environment variable dan CORS diatur antara FE
   dan BE.

---

## 3. Ringkasan produk: tiga modul (urutan prioritas tetap sama)

Satu dashboard beranda dengan tiga modul. Semua teks antarmuka dalam
**Bahasa Indonesia**, nada aktif dan lugas (bukan bahasa marketing).

### 3.1 Modul 1 — Kalkulator QRIS (modul utama)

Kalkulator untung-rugi adopsi QRIS untuk pedagang UMKM, berupa wizard 4
pertanyaan lalu hasil personalisasi.

**Pertanyaan 1 — Omzet harian dari transaksi tunai** (pilih satu):

| Label opsi               | Nilai numerik dipakai di rumus |
| ------------------------ | ------------------------------ |
| Kurang dari Rp100.000    | 75.000                         |
| Rp100.000 – Rp500.000   | 300.000                        |
| Rp500.000 – Rp1.000.000 | 750.000                        |
| Lebih dari Rp1.000.000   | 1.250.000                      |

**Pertanyaan 2 — Checklist multi-select**, "Pernahkah kamu mengalami hal
berikut saat berjualan? (boleh pilih lebih dari satu)":

- Uang robek/sobek (`robek`)
- Uang basah/lusuh berat (`basah`)
- Uang diragukan keasliannya (`diragukan`)
- Pelanggan kabur tanpa bayar (`kabur`)
- Belum pernah mengalami hal di atas (`tidak-pernah`) — **eksklusif**:
  kalau opsi ini dicentang, opsi lain otomatis batal tercentang, dan
  sebaliknya (mencentang opsi lain otomatis membatalkan opsi ini).

**Pertanyaan 3 — Waktu menghitung & menyetor uang tunai per hari** (pilih
satu):

| Label opsi           | Nilai menit dipakai di rumus |
| -------------------- | ---------------------------- |
| Kurang dari 10 menit | 5                            |
| 10 – 20 menit       | 15                           |
| 20 – 40 menit       | 30                           |
| Lebih dari 40 menit  | 50                           |

**Pertanyaan 4 — Kepemilikan rekening bank** (pilih satu): "Sudah punya"
(`ya`) / "Belum punya" (`belum`) — dipakai untuk rekomendasi tindak
lanjut, bukan untuk hitungan kerugian.

#### Rumus hasil (persis, jangan diubah)

```js
const UPAH_PER_JAM = 15000; // asumsi dari UMP NTT 2026 (~Rp2.700.000/bulan, 173 jam kerja/bulan), dibulatkan

const uangTunaiPerBulan = omzetHarian * 30;
const jamPerBulan = (waktuMenit * 30) / 60;
const nilaiWaktuBulanan = jamPerBulan * UPAH_PER_JAM;
```

Pertanyaan 2 (checklist) dan 4 (rekening) **tidak memengaruhi angka di
atas** — keduanya murni membentuk narasi personalisasi di hasil, bukan
komponen hitungan.

Rincian lengkap rumus + contoh angka worked-example ada di file
`docs/perhitungan-kalkulator-qris.md` pada repo lama — salin isinya sebagai
referensi tambahan kalau AI pembangun ulang butuh contoh numerik konkret.

#### Struktur hasil (headline + breakdown + dua sisi + rekomendasi)

1. **Headline**: angka besar berupa **waktu** (bukan Rupiah) —
   `jamPerBulan` diformat sebagai "X jam" (atau "X,Y jam" kalau desimal),
   dengan label "Waktu yang selama ini terbuang menghitung uang tunai".
   Di bawahnya, sub-teks menunjukkan padanan Rupiah-nya sebagai info
   tambahan: "per bulan menghitung & menyetor uang tunai — setara
   **RpXXX.XXX/bulan** kalau waktumu dihargai ~Rp15.000/jam"
   (`nilaiWaktuBulanan`).
2. **Breakdown**: satu baris menunjukkan rumus "Total uang tunai per
   bulan" = `RpXXX.XXX/hari (jawabanmu di P1) × 30 hari` = `RpXXX.XXX.XXX`
   (`uangTunaiPerBulan`).
3. **Dua sisi berdampingan** (kolom kiri vs kanan, atau stack di mobile):

   - **"Sisi tunai yang selama ini kamu alami"** — untuk tiap item yang
     dicentang di P2 (kecuali "tidak-pernah"), tampilkan: label, teks
     kerugian, dan (kalau ada) tips CBP Rupiah terkait. Kalau user pilih
     "tidak-pernah" atau tidak mencentang apa pun, tampilkan pesan generik
     bahwa user jarang mengalami masalah tapi waktu tetap terbuang.
   - **"Manfaat konkret QRIS untukmu"** — manfaat spesifik dari tiap item
     P2 yang dicentang, ditambah 2 manfaat umum yang selalu muncul.

   Konten lengkap per item P2 (dipakai persis, termasuk teksnya):

   | Item                                  | Kerugian                                                                                                                                        | Tips CBP Rupiah                                                                                                                                                                                                                                        | Manfaat QRIS                                                                                                                                                                      |
   | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **Uang robek/sobek**            | "Uang yang robek cukup parah kadang ditolak pembeli lain atau bikin kamu ragu sendiri saat mau dipakai belanja lagi."                           | "Uang rupiah yang robek sebagian (bukan hilang sebagian besar) sebenarnya masih bisa ditukar resmi di Bank Indonesia atau bank umum sesuai aturan penukaran uang rusak/lusuh — jangan buru-buru dianggap hangus."                                     | "Uang di saldo QRIS tidak punya bentuk fisik, jadi tidak akan pernah robek atau kehilangan nilai karena kondisi fisiknya."                                                        |
   | **Uang basah/lusuh berat**      | "Uang basah atau lusuh berat sering bikin pembeli lain ragu menerimanya, dan kamu harus meyakinkan mereka satu per satu."                       | "Ingat prinsip merawat uang rupiah dari kampanye CBP: jangan dilipat, dicoret, distaples, diremas, atau dibasahi. Simpan uang kertas di tempat kering dan rapi supaya tetap layak edar lebih lama."                                                    | "QRIS menghilangkan urusan fisik uang sepenuhnya — tidak ada lagi uang basah atau lusuh yang bikin transaksi jadi rumit."                                                        |
   | **Uang diragukan keasliannya**  | "Kalau ternyata uang itu palsu, kerugiannya langsung senilai nominal transaksi — dan biasanya baru ketahuan belakangan, saat sudah terlambat." | "Biasakan cek keaslian uang rupiah dengan metode 3D: Dilihat (benang pengaman & gambar berubah warna saat dimiringkan), Diraba (tekstur kasar di angka nominal & tanda tangan), Diterawang (gambar tersembunyi/rectoverso saat diterawang ke cahaya)." | "Transaksi QRIS diverifikasi otomatis oleh sistem perbankan — risiko menerima uang palsu jadi nol."                                                                              |
   | **Pelanggan kabur tanpa bayar** | "Ini kerugian penuh — barang sudah kamu serahkan, tapi pembayarannya tidak pernah sampai."                                                     | *(tidak ada — item ini tidak nyambung ke edukasi CBP)*                                                                                                                                                                                              | "Ini salah satu alasan terkuat pakai QRIS: begitu kode dipindai dan transaksi berhasil, uang langsung masuk ke saldomu lebih dulu — jadi 'kabur setelah bayar' bukan lagi opsi." |

   Manfaat umum yang selalu ditambahkan (di akhir daftar manfaat):


   - "Setiap transaksi otomatis tercatat rapi, jadi kamu punya riwayat
     penjualan tanpa perlu mencatat manual."
   - "Tidak perlu menyiapkan uang kembalian recehan lagi — nominal yang
     dibayar selalu pas."
4. **Rekomendasi tindak lanjut** (`kalk-message`), sesuai jawaban P4:

   - Belum punya rekening: "Langkah selanjutnya: karena kamu belum punya
     rekening bank atas nama sendiri, buka rekening tabungan dulu — baru
     setelah itu kamu bisa mendaftar QRIS lewat bank atau penyedia layanan
     pembayaran."
   - Sudah punya rekening: "Langkah selanjutnya: karena kamu sudah punya
     rekening bank sendiri, kamu bisa langsung mendaftar QRIS lewat bank
     atau penyedia layanan pembayaran pilihanmu."
5. **Disclaimer**: "*Angka dan narasi di atas adalah perkiraan edukatif
   berdasarkan jawabanmu, bukan hitungan akuntansi yang pasti."
6. **CTA**: tombol "Yuk Daftar QRIS Sekarang →" yang **hanya mengarah ke
   tautan eksternal resmi** `https://www.bi.go.id/QRIS` (buka tab baru) —
   **jangan buat form pendaftaran asli**, itu sudah ditolak sebagai fitur
   di versi sebelumnya. Plus tombol "↻ Hitung ulang" untuk reset wizard.

### 3.2 Modul 2 — Keamanan QRIS (modul kedua)

Format: skenario cerita pendek + pilihan tindakan (simulasi pengambilan
keputusan). 3 skenario, tiap skenario 4 opsi jawaban, hanya 1 opsi benar
per skenario. Setelah memilih, tampilkan feedback benar/salah + penjelasan
sebelum lanjut ke skenario berikutnya. Di akhir, tampilkan skor "X/3
jawaban tepat di percobaan pertama" dengan opsi ulangi atau kembali ke
beranda.

**Skenario 1** — "Seorang pembeli baru saja memindai QR code statis yang
ditempel di mejamu. Sebelum transfer, dia bilang: 'Eh, kok pas di-scan
nama tokonya beda ya? Bukan nama tokomu.'"

| Opsi                                                                                                                          | Benar? | Feedback                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Suruh dia lanjut transfer saja, mungkin cuma salah lihat.                                                                     | ✕     | "Jangan diabaikan. Kalau nama yang muncul saat QR dipindai memang beda dari nama tokomu, itu tanda kuat QR aslimu sudah ditempeli stiker QR milik orang lain — uang pembeli bisa masuk ke rekening orang itu, bukan ke rekeningmu."                   |
| Cek sendiri nama yang muncul saat QR dipindai. Kalau memang beda dari nama tokomu, langsung lepas stiker QR itu dan laporkan. | ✓     | "Nama toko yang muncul saat QR dipindai adalah cara paling gampang mengecek keaslian QR statis. Kalau namanya beda, itu tanda ada stiker QR palsu ditempel di atas QR aslimu — segera lepas dan laporkan supaya pembeli lain tidak ikut jadi korban." |
| Minta pembeli bayar tunai saja supaya lebih aman kali ini.                                                                    | ✕     | "Ini cuma menghindari masalah untuk transaksi kali ini — QR palsu yang masih menempel di mejamu tetap bisa menipu pembeli berikutnya kalau tidak segera dicek dan dilepas."                                                                           |
| Diamkan saja, toh transaksi kali ini sudah selesai duluan.                                                                    | ✕     | "Berbahaya buat pembeli-pembeli setelah ini. Kalau QR di mejamu sudah ditempeli stiker QR orang lain, setiap pembeli yang scan berikutnya juga akan salah transfer."                                                                                   |

**Skenario 2** — "Pembeli menunjukkan layar HP-nya: ada tulisan 'Transfer
Berhasil' di aplikasi chat atau screenshot bukti bayar. Tapi di HP-mu
sendiri, belum ada satu pun notifikasi pembayaran masuk."

| Opsi                                                                                                                | Benar? | Feedback                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Percaya saja karena sudah lihat buktinya di layar HP pembeli, langsung kasih barangnya.                             | ✕     | "Screenshot atau tulisan 'Transfer Berhasil' di HP pembeli gampang direkayasa — itu bukan bukti resmi bahwa uang sudah masuk ke rekening/saldomu."                             |
| Tunggu sampai notifikasi transaksi resmi benar-benar muncul di HP atau rekeningmu sendiri, baru serahkan barangnya. | ✓     | "Satu-satunya bukti yang bisa dipercaya adalah notifikasi resmi di perangkat/rekeningmu sendiri, bukan apa pun yang ditunjukkan di layar HP pembeli."                           |
| Minta pembeli transfer ulang supaya lebih yakin.                                                                    | ✕     | "Belum tentu menyelesaikan masalah — kalau memang niatnya menipu, transfer ulang pun bisa 'dibuktikan' dengan cara yang sama. Yang perlu dicek tetap notifikasi di sisi kamu." |
| Langsung tolak transaksinya karena pasti penipuan.                                                                  | ✕     | "Belum tentu penipuan — notifikasi kadang memang telat masuk karena jaringan. Daripada buru-buru menolak, tunggu dulu sebentar sampai notifikasi resminya muncul."             |

**Skenario 3** — "Pembeli bilang, 'Sudah aku transfer Rp150.000 ya, lewat
QRIS.' Nominalnya diisi sendiri oleh pembeli (QRIS dinamis), dan kamu
belum sempat melihat langsung angka yang tertera di layar HP/EDC-mu saat
dia memindai."

| Opsi                                                                                                                                      | Benar? | Feedback                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Percaya saja ucapan pembeli soal nominalnya, tanpa mengecek layar sendiri.                                                                | ✕     | "Nominal QRIS dinamis diisi manual oleh pembeli, jadi rawan salah ketik atau sengaja diisi lebih kecil dari harga sebenarnya. Ucapan lisan saja tidak cukup jadi bukti."  |
| Selalu cek nominal yang tertera di layar HP/EDC milikmu sendiri sebelum menyerahkan barang — jangan hanya percaya sebutan lisan pembeli. | ✓     | "Nominal yang tertera di perangkatmu sendiri adalah satu-satunya angka yang bisa dipercaya, karena itu yang benar-benar diproses sistem — bukan yang diucapkan pembeli." |
| Minta pembeli menunjukkan nominal yang tertera di layar HP-nya sebagai bukti.                                                             | ✕     | "Layar HP pembeli juga bisa saja salah ketik atau direkayasa. Verifikasi paling aman tetap di layar milikmu sendiri, bukan di perangkat pembeli."                         |
| Anggap wajar saja, karena QRIS dinamis biasanya otomatis benar nominalnya.                                                                | ✕     | "Justru sebaliknya — QRIS dinamis itu nominalnya diisi manual tiap transaksi. Ini bagian yang paling rawan human error, jadi justru paling perlu dicek."                 |

Di akhir 3 skenario, pesan ringkasan:

- Kalau skor 3/3: "Mantap, semua jawabanmu tepat di percobaan pertama!
  Kamu sudah paham tiga situasi keamanan QRIS yang paling sering dialami
  pedagang."
- Kalau tidak sempurna: "Terus diingat ya: selalu cek nama toko saat QR
  dipindai, tunggu notifikasi resmi di perangkatmu sendiri, dan selalu
  lihat nominal di layarmu sebelum menyerahkan barang."

Skor modul ini **tidak perlu disimpan permanen** (di versi lama memang
sengaja tidak masuk `localStorage`, murni umpan balik sesaat) — kecuali
pemilik proyek memutuskan lain saat rebuild (lihat §6, opsional).

### 3.3 Modul 3 — Kuis CBP Rupiah (modul pelengkap, pop-up/modal)

Bukan halaman penuh — modal/pop-up dari beranda. 10 soal pilihan ganda
(4 opsi tiap soal, 1 jawaban benar), tiap soal langsung menampilkan
feedback benar/salah + penjelasan sebelum lanjut ke soal berikutnya. Di
akhir, tampilkan skor final (format "Skor: 6/10 · 60% paham") dan pesan
yang menyesuaikan tingkat skor.

| #  | Soal                                                                                                | Opsi (✓ = benar)                                                                                                                                                                                               | Penjelasan                                                                                                                                                                 |
| -- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Apa kepanjangan CBP dalam kampanye Bank Indonesia tentang rupiah?                                   | ✓ Cinta Bangga Paham · Cerdas Bijak Paham · Cinta Bangsa Peduli · Cermat Bangga Percaya                                                                                                                     | CBP adalah singkatan dari Cinta, Bangga, dan Paham Rupiah — kampanye Bank Indonesia untuk mengajak masyarakat merawat, memakai, dan memahami rupiah.                      |
| 2  | Metode apa yang dianjurkan BI untuk mengecek keaslian uang kertas rupiah?                           | Lipat, Gosok, Bandingkan · ✓ Dilihat, Diraba, Diterawang (3D) · Scan, Foto, Simpan · Timbang, Ukur, Catat                                                                                                   | Bank Indonesia menganjurkan metode 3D — Dilihat, Diraba, Diterawang — sebagai cara cepat mengecek keaslian uang kertas rupiah.                                           |
| 3  | Saat uang kertas "diraba", bagian mana yang terasa kasar (hasil cetak timbul)?                      | Seluruh permukaan uang · Hanya bagian pojok uang · ✓ Angka nominal dan tanda tangan pejabat berwenang · Bagian belakang uang saja                                                                           | Uang kertas asli dicetak dengan teknik cetak timbul (intaglio), sehingga angka nominal dan tanda tangan pejabat berwenang terasa kasar saat diraba.                        |
| 4  | Saat uang diterawang ke arah cahaya, apa yang seharusnya terlihat pada uang asli?                   | Tulisan "ASLI" tersembunyi · ✓ Gambar saling isi (rectoverso) yang membentuk logo BI utuh · Tidak ada perubahan apa pun · Warna uang berubah jadi transparan penuh                                          | Saat diterawang ke arah cahaya, uang asli menampilkan gambar saling isi (rectoverso) yang membentuk logo BI secara utuh — ciri keaslian yang sulit dipalsukan.            |
| 5  | Apa fungsi benang pengaman (security thread) pada uang kertas rupiah?                               | Hiasan saja · ✓ Berubah warna saat uang dimiringkan, tanda keaslian · Menandai tahun cetak · Menunjukkan nominal uang                                                                                       | Benang pengaman pada uang kertas rupiah akan berubah warna saat uang dimiringkan ke sumber cahaya — ciri keaslian yang bisa dicek tanpa alat khusus.                      |
| 6  | Berdasarkan prinsip "5 Jangan" merawat uang rupiah, tindakan mana yang sebaiknya dihindari?         | Menyimpan uang di dompet · ✓ Melipat, mencoret, atau menstaples uang · Membelanjakan uang · Menukar uang di bank                                                                                            | Kampanye CBP mengingatkan untuk tidak melipat, mencoret, menstaples, meremas, atau membasahi uang rupiah agar tetap layak edar lebih lama.                                 |
| 7  | Bagaimana cara terbaik menyimpan uang kertas agar tetap layak edar lebih lama?                      | ✓ Di tempat kering, rapi, dan tidak dilipat · Digulung dan diikat karet · Dilipat kecil agar muat di dompet · Di tempat lembap agar tidak mudah sobek                                                       | Menyimpan uang kertas di tempat kering dan rapi (tidak dilipat/diremas) menjaga kondisinya tetap layak edar lebih lama.                                                    |
| 8  | Jika uang kertas robek sebagian (bukan hilang besar bagiannya), apa yang bisa dilakukan pemiliknya? | Uang otomatis hangus, tidak bisa dipakai · Dibuang karena sudah tidak sah · ✓ Bisa ditukar resmi di Bank Indonesia/bank umum sesuai aturan uang rusak · Ditempel selotip lalu dipakai belanja seperti biasa | Uang rupiah yang rusak sebagian (bukan hilang sebagian besar fisiknya) masih bisa ditukar resmi sesuai aturan penukaran uang rusak/lusuh di Bank Indonesia atau bank umum. |
| 9  | Apa makna "Bangga" dalam CBP Rupiah?                                                                | Bangga menyimpan uang asing · ✓ Bangga menggunakan rupiah dalam setiap transaksi di dalam negeri sebagai simbol kedaulatan · Bangga memamerkan uang · Bangga tidak pernah membelanjakan uang                | "Bangga" berarti bangga menggunakan rupiah dalam setiap transaksi di dalam negeri, termasuk transaksi digital seperti QRIS, sebagai wujud kedaulatan mata uang.            |
| 10 | Apa makna "Paham" dalam CBP Rupiah?                                                                 | Paham sejarah bank saja · Paham cara mencetak uang · ✓ Memahami ciri-ciri keaslian uang rupiah agar terhindar dari uang palsu · Paham nilai tukar rupiah ke mata uang asing                                 | "Paham" berarti memahami ciri-ciri keaslian rupiah supaya masyarakat bisa mengenali dan terhindar dari uang palsu.                                                         |

Pesan penutup berdasarkan persentase:

- ≥80%: "Keren! Kamu sudah sangat paham ciri keaslian dan cara merawat
  uang rupiah."
- 50–79%: "Lumayan! Beberapa hal masih perlu diingat lagi — coba ulangi
  kuisnya."
- <50%: "Yuk pelajari lagi ciri keaslian dan cara merawat uang rupiah
  supaya makin paham."

Kuis selalu mulai ulang dari soal 1 tiap kali pop-up dibuka (tidak
melanjutkan sesi sebelumnya).

### 3.4 Onboarding

Kunjungan pertama ke situs: beranda tampil dengan sorotan (spotlight) di
kartu modul Kalkulator QRIS, tooltip "Mulai di sini ↑", mendorong user
klik di situ dulu. Hilang otomatis setelah kartu diklik. Status "sudah
lihat onboarding" perlu diingat per-pengunjung (lihat §5 untuk opsi
implementasi baru: `localStorage` client-side tetap sah dipakai untuk ini,
tidak wajib lewat backend). Modul Keamanan QRIS dan Kuis CBP Rupiah
**tidak** perlu onboarding serupa.

---

## 4. Fitur yang sudah ditolak — jangan dibangun

- **Chatbot** — dibatalkan.
- **Integrasi pendaftaran QRIS langsung ke BI/bank** — ditolak, cukup
  tautan eksternal ke panduan resmi (`https://www.bi.go.id/QRIS`).
- **Sistem akun/login pengguna** — tidak diminta di brief awal. Kalau
  rebuild ini mau menambahkannya karena sekarang ada backend+DB, itu
  perubahan scope yang harus dikonfirmasi dulu ke pemilik proyek, bukan
  diasumsikan sendiri (lihat §6).
- **Testimoni video pedagang** di Kalkulator QRIS — masih opsional, belum
  diputuskan, jangan dikerjakan dulu kecuali diminta eksplisit.

---

## 5. Identitas visual versi sebelumnya (referensi, bukan kewajiban)

Karena FE sekarang pindah ke React + Tailwind + HeroUI/Flowbite/MUI,
**tim boleh mendesain ulang total** tampilannya memakai komponen dari
library baru — tidak wajib meniru pixel-perfect versi lama. Tapi sebagai
referensi arah/identitas yang sudah divalidasi sebelumnya:

- Terinspirasi tenun ikat NTT: **indigo** tua sebagai warna utama & modul
  Kalkulator QRIS, **ochre/emas** sebagai aksen sorotan, **rust**
  (merah-bata) untuk modul Keamanan QRIS, **sage** (hijau zaitun) untuk
  modul Kuis CBP Rupiah.
- Versi terakhir memakai latar biru tua (`#15335F`, diambil dari warna
  dominan materi kampanye CBP Rupiah BI) dengan motif diamond tipis warna
  emas (`#D9A94A`) ala tenun ikat sebagai tekstur latar — lihat detail
  motifnya di `docs/kerangka-ui-website.md` pada repo lama kalau mau
  direplikasi atau dijadikan inspirasi.
- Font judul: **Space Grotesk**. Font isi: **Plus Jakarta Sans**
  (Google Fonts).
- Kartu 3 modul di beranda dan panel tiap modul pakai gaya "dark
  neon-glow": latar radial-gradient gelap + border/shadow warna aksen
  modul yang menyala saat hover/aktif.

Dokumen lengkap sistem desain versi lama (token warna, pola komponen
berulang, breakpoint, catatan area yang belum rapi) ada di
`docs/kerangka-ui-website.md` pada repo lama — salin isinya kalau tim mau
mempertahankan kontinuitas visual, atau abaikan sepenuhnya kalau memang
mau desain baru dari nol memakai HeroUI/Flowbite/MUI.

---

## 6. Rancangan backend (usulan — konfirmasi dulu sebelum final)

Brief asli proyek ini eksplisit bilang **tidak butuh backend**, semua
state cukup di `localStorage` per-browser, dan itu sudah final untuk
konteks lomba (bukan keterbatasan yang perlu diperbaiki). Sekarang
konteksnya berubah — proyek sengaja diminta pakai Express + Prisma +
PostgreSQL. Supaya backend ini **punya fungsi nyata** (bukan cuma
duplikasi `localStorage` yang dipindah ke server tanpa manfaat tambahan),
berikut usulan pemakaiannya. **Ini asumsi, bukan keputusan final — AI yang
membangun ulang wajib mengonfirmasi ke pemilik proyek dulu sebelum
menganggap ini final**, sesuai gaya kerja proyek ini yang memang selalu
klarifikasi dulu untuk keputusan yang belum jelas.

### 6.1 Usulan: analytics anonim, bukan akun pengguna

Tanpa sistem login, backend mencatat **data anonim** tiap kali user
menyelesaikan Kalkulator QRIS atau Kuis CBP Rupiah, murni untuk keperluan
melihat data agregat penggunaan (berguna untuk materi presentasi lomba —
menunjukkan produk benar-benar dipakai, bukan cuma prototipe statis).
Tidak ada data pribadi yang dikumpulkan.

**Draft skema Prisma:**

```prisma
model KalkulatorSubmission {
  id              String   @id @default(cuid())
  omzetHarian     Int
  pengalaman      String[] // ["robek", "basah", ...] atau ["tidak-pernah"]
  waktuMenit      Int
  punyaRekening   Boolean
  uangTunaiPerBulan   Int
  jamPerBulan         Float
  nilaiWaktuBulanan   Int
  createdAt       DateTime @default(now())
}

model KuisAttempt {
  id          String   @id @default(cuid())
  correctCount Int
  totalCount   Int     @default(10)
  createdAt    DateTime @default(now())
}

model SkenarioAttempt {
  id           String   @id @default(cuid())
  correctCount Int
  totalCount   Int      @default(3)
  createdAt    DateTime @default(now())
}
```

`SkenarioAttempt` bersifat opsional — mencatatnya adalah penambahan scope
dibanding versi lama (yang sengaja tidak menyimpan skor Keamanan QRIS).

### 6.2 Draft API endpoints

```
POST /api/kalkulator/submissions   → catat 1 hasil kalkulator (fire-and-forget dari FE, tidak blocking UI)
POST /api/kuis/attempts            → catat 1 hasil kuis selesai (correctCount, totalCount)
POST /api/skenario/attempts        → (opsional) catat 1 hasil skenario Keamanan QRIS
GET  /api/stats/summary            → (opsional, stretch) agregat: rata-rata skor kuis, distribusi omzet, dll — untuk kebutuhan presentasi lomba
```

Skor kuis yang **ditampilkan ke user sendiri** (badge "Skor: 6/10 · 60%
paham" di UI) tetap bisa memakai state React lokal + `localStorage` untuk
kebutuhan tampilan instan tanpa round-trip ke server — POST ke backend
cukup jadi catatan analitik di belakang layar, tidak menjadi
sumber-kebenaran untuk apa yang ditampilkan ke user yang sedang
mengerjakan kuis.

### 6.3 Kalau pemilik proyek TIDAK mau menambah scope analytics ini

Backend tetap bisa dipertahankan sesuai permintaan stack (Express +
Prisma + Postgres + Neon) dengan scope minimal: cukup migrasi skor Kuis
CBP Rupiah dari `localStorage` murni jadi tersimpan lewat API + DB (ganti
`localStorage.setItem` jadi `POST /api/kuis/attempts` lalu `GET` skor
terakhir saat modal dibuka), tanpa fitur analitik tambahan untuk
Kalkulator/Keamanan QRIS. **Tanyakan preferensi ini ke pemilik proyek
sebelum mulai membangun skema database.**

---

## 7. Struktur proyek yang disarankan

```
ntt-cerdas-transaksi-v2/
├── apps/
│   ├── web/            React + Tailwind + HeroUI/Flowbite/MUI + Lucide-React
│   │   ├── src/
│   │   │   ├── pages/ atau routes/   (Beranda, Kalkulator, Keamanan)
│   │   │   ├── components/
│   │   │   ├── modules/kalkulator/   (logika rumus, terpisah dari UI)
│   │   │   ├── modules/keamanan/
│   │   │   └── modules/kuis/
│   │   └── vercel.json (kalau perlu konfigurasi khusus)
│   └── api/             Express + Prisma
│       ├── src/
│       │   ├── routes/
│       │   ├── controllers/
│       │   └── prisma/schema.prisma
│       └── vercel.json (adaptasi serverless — lihat §2.1 poin 2)
└── README.md
```

(Struktur ini usulan awal, boleh disesuaikan sama preferensi tim — yang
penting pemisahan logika rumus/konten dari komponen UI tetap dijaga,
supaya gampang ditest terpisah dari tampilan.)

---

## 8. Instruksi kerja untuk AI yang membangun ulang

1. **Urutan prioritas tetap**: bangun Kalkulator QRIS dulu sampai penuh
   berfungsi (termasuk koneksi ke backend kalau §6 dikonfirmasi), baru
   Keamanan QRIS, baru Kuis CBP Rupiah.
2. **Jangan ubah rumus, teks soal/skenario, atau opsi jawaban** yang sudah
   didokumentasikan di §3 — itu semua sudah final dan pernah diverifikasi
   lewat testing di versi sebelumnya. Kalau ada typo/perbaikan bahasa yang
   dirasa perlu, tanyakan dulu, jangan diam-diam diubah.
3. **Kalau ada keputusan desain, arsitektur, atau konten yang belum jelas
   dari brief ini — tanyakan dulu ke pemilik proyek sebelum
   mengasumsikan sendiri.** Ini bukan basa-basi; brief asli proyek ini
   (`PROMPT-LANJUTAN.md` di repo lama) eksplisit menekankan hal yang sama,
   dan sudah terbukti penting sepanjang proses build versi sebelumnya
   (banyak keputusan kecil — warna latar, bentuk hasil kalkulator, dll —
   memang sengaja dikonfirmasi dulu, bukan diasumsikan).
4. Setelah tiap modul selesai, **uji alurnya end-to-end** (isi form/klik
   semua opsi, cek hasil, cek reset/ulangi, cek tidak ada error console)
   sebelum lanjut ke modul berikutnya.
