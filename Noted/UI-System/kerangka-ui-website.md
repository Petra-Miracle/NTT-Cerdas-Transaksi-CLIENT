# Kerangka UI/UX — NTT Cerdas Transaksi

Dokumen ini memetakan **seluruh struktur, komponen, dan sistem desain** situs
saat ini, supaya jadi acuan waktu kamu mendesain ulang tampilannya. Isinya
murni deskriptif (apa yang sudah ada dan kenapa dibuat begitu) — bukan
rekomendasi desain baru.

Tiga file yang membangun seluruh situs (murni HTML/CSS/JS, tanpa framework
atau build tool):

```
ntt-cerdas-transaksi/
├── index.html   markup semua halaman + modal kuis + overlay onboarding
├── css/style.css   seluruh design token dan styling
├── js/main.js      navigasi, wizard, skenario, kuis, localStorage
└── assets/
    └── maskot-kora.png   maskot "KoRa" (Duta Rupiah Flobamora)
```

Situs berjalan sebagai **SPA satu halaman**: semua "halaman" adalah
`<section class="page" data-page="...">` di dalam satu `index.html`, dan
`showPage(id)` di `main.js` yang menyembunyikan/menampilkan lewat class
`.page.active`. Tidak ada routing URL — refresh selalu kembali ke beranda.

---

## 1. Peta halaman & komponen

### 1.1 Topbar (tampil di semua halaman)

`.topbar` — flex row, max-width 960px, center. Berisi:
- `.wordmark` — nama situs "NTT Cerdas Transaksi", jadi tombol untuk pulang
  ke beranda (`#btn-home`).
- `.topbar-note` — pill kecil "Karya Inovasi Bank Indonesia Kupang 2026",
  murni informatif.

### 1.2 Beranda (`#page-beranda`)

Struktur dari atas ke bawah:

1. `.hero` — judul besar (`<h1>` dengan gradient putih→ochre di teks) +
   `.hero-sub` (paragraf penjelasan singkat).
2. `.beranda-row` — flex row berisi:
   - `.module-grid` — **panel gelap "dark-neon-glow"** yang membungkus 3
     kartu modul (lihat 1.2.1).
   - `.maskot-float` — gambar maskot KoRa (`assets/maskot-kora.png`),
     mengambang di sebelah panel dengan animasi loop naik-turun
     (`@keyframes maskot-mengambang`, 3.2s). Di layar sempit (≤860px)
     pindah ke bawah panel dan mengecil.

#### 1.2.1 Tiga kartu modul (di dalam `.module-grid`)

Struktur kartu (`.card`): `card-index` (badge angka 01/02/03) → `card-icon`
(SVG outline) → `card-eyebrow` (label kecil) → `<h2>` judul → `card-desc`
(deskripsi) → `card-cta` (pill tombol aksi).

| Kartu | ID | Warna glow (`--glow`) | Aksi klik |
|---|---|---|---|
| Kalkulator QRIS (`card-featured`) | `#card-kalkulator` | Indigo `#7C93FF` | `showPage("kalkulator")` + reset wizard |
| Keamanan QRIS (`card-keamanan`) | `#card-keamanan` | Rust `#FF7A59` | `showPage("keamanan")` + reset skenario |
| Kuis CBP Rupiah (`card-kuis`) | `#card-kuis` | Sage `#5CE0B0` | Buka `.modal#modal-kuis` + reset kuis |

Kartu pertama (Kalkulator) dapat sorotan onboarding sekali per browser
(lihat 3.4). Kartu kedua & ketiga bersebelahan dalam `.module-row` (grid
2 kolom, jadi 1 kolom di ≤640px).

### 1.3 Halaman Kalkulator QRIS (`#page-kalkulator`)

1. `.back-link` — "← Kembali ke beranda", pill dengan hover slide ke kiri.
2. `<h1>` + `.page-intro`.
3. `.kalk-panel` — panel gelap yang membungkus **seluruh** alur (baik form
   pertanyaan maupun hasil), berisi:
   - `.kalk-progress` — 4 titik progres (`.kalk-progress-dot`), status
     `.done` (ochre) / `.current` (putih).
   - `<form id="kalk-form">` — 4 `<fieldset class="kalk-step">` (hanya satu
     yang `.active`/tampil sesuai langkah berjalan), masing-masing berisi
     `<legend>` pertanyaan + daftar `.kalk-option` (radio/checkbox custom
     berbentuk kartu, highlight biru saat `:checked` lewat `:has()`).
     Ditutup `.kalk-nav` (tombol Sebelumnya/Lanjut, `.btn-ghost` /
     `.btn-primary`).
   - `.kalk-result` (tersembunyi sampai form selesai dijawab) — lihat 1.3.1.

Detail 4 pertanyaan dan rumus hasil ada di
[`perhitungan-kalkulator-qris.md`](perhitungan-kalkulator-qris.md).

#### 1.3.1 Struktur hasil kalkulator (`#kalk-result`)

```
.kalk-result-hero        → angka besar + 3 koin melayang dekoratif (.coin)
.kalk-breakdown          → 1 baris rincian rumus "Total uang tunai per bulan"
.kalk-compare            → grid 2 kolom (1 kolom di ≤700px):
  .kalk-sisi-kerugian     → daftar dampak tunai yang dialami + tips CBP
  .kalk-sisi-manfaat      → daftar manfaat QRIS terkait
.kalk-message             → rekomendasi tindak lanjut (sesuai P4/rekening)
.kalk-disclaimer          → teks kecil italic, disclaimer estimasi
.kalk-result-actions      → CTA eksternal "Daftar QRIS" + "Hitung ulang"
```

Detail konten tiap item diisi dinamis oleh `js/main.js` berdasarkan jawaban
(lihat `PENGALAMAN_INFO`, `MANFAAT_UMUM`, `renderResult()`).

### 1.4 Halaman Keamanan QRIS (`#page-keamanan`)

Struktur sejajar dengan Kalkulator, tapi lebih sederhana:

```
.back-link + <h1> + .page-intro
.skenario-progress   → titik progres (3 titik, di luar panel)
.skenario-panel      → panel gelap (radial-gradient rust/maroon)
  #skenario-content  → diisi ulang total oleh JS tiap ganti skenario:
      .skenario-cerita   (ikon + narasi situasi)
      .skenario-opsi     (4 tombol pilihan, .skenario-opsi-btn)
      .skenario-feedback (muncul setelah pilih: benar/salah + penjelasan
                           + tombol lanjut)
    → di soal terakhir, #skenario-content diganti total jadi
      .skenario-selesai (skor X/3 + pesan + tombol ulangi/kembali)
```

3 skenario (QR statis ditempeli stiker, notifikasi transfer palsu, nominal
QRIS dinamis diisi sendiri) ada di `SKENARIO_LIST` dalam `main.js`. Skor
skenario ini **tidak** disimpan ke `localStorage` — murni umpan balik sesaat
tiap kali modul dibuka ulang.

### 1.5 Modal Kuis CBP Rupiah (`#modal-kuis`)

Bukan halaman (`.page`), tapi overlay `.modal` fixed di atas semua konten,
dibuka dari kartu ketiga di beranda. Struktur:

```
.modal-backdrop        → klik untuk tutup
.modal-box              → panel gelap (radial-gradient netral, aksen sage)
  .modal-header          → .score-badge (skor tersimpan) + tombol ✕
  <h2>                    → judul gradient putih→sage
  .kuis-intro             → deskripsi singkat
  .kuis-progress          → 10 titik progres kecil
  #kuis-content           → diisi ulang oleh JS tiap ganti soal, sama pola
                            dengan #skenario-content:
      .kuis-soal-nomor + .kuis-soal-teks + .kuis-opsi (4 tombol)
      .kuis-feedback (setelah pilih)
    → di soal ke-10, diganti .kuis-selesai (skor X/10 + % + tombol)
```

10 soal ada di `KUIS_LIST` dalam `main.js`. Skor akhir disimpan ke
`localStorage` (`ntt_cbp_quiz_score`) tiap kali kuis selesai dikerjakan
sampai soal terakhir, lalu ditampilkan sebagai badge di modal maupun
`#kuis-card-score` di kartu beranda.

### 1.6 Onboarding (`#onboarding-overlay`)

Overlay transparan yang hanya menyorot kartu Kalkulator QRIS (spotlight +
tooltip "Mulai di sini ↑") pada kunjungan pertama, hilang otomatis setelah
kartu diklik atau kalau `localStorage.ntt_onboarding_seen` sudah pernah
diset. Tidak mengulang untuk modul lain.

---

## 2. Sistem desain saat ini

### 2.1 Dua "mode" visual dalam satu situs

Ada dua gaya berdampingan yang perlu dipahami sebelum desain ulang:

1. **Latar situs & panel modul = gelap ("dark-neon-glow")** — beranda,
   panel Kalkulator, panel Keamanan, dan modal Kuis semuanya pakai latar
   gelap radial-gradient + glow warna aksen di border/shadow saat hover
   atau status aktif. Pola ini awalnya cuma diminta untuk kartu modul di
   beranda, lalu diperluas ke seluruh alur interaktif supaya konsisten.
2. **Beberapa komponen di dalam alur tetap pakai kartu putih (`--surface`)**
   — misalnya `.kalk-breakdown-item`, `.kalk-sisi-item`, `.kalk-tip`,
   `.kalk-message` masih putih/terang meski duduk di atas panel gelap. Ini
   dari iterasi desain hasil kalkulator yang belum disamakan sepenuhnya ke
   gaya gelap — salah satu area yang mungkin perlu diperhatikan saat
   desain ulang.

### 2.2 Token warna (`:root` di `css/style.css`)

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--bg` | `#15335F` | Latar dasar seluruh situs (biru tua, dari materi CBP Rupiah BI) |
| `--surface` | `#FFFFFF` | Kartu/permukaan putih |
| `--ink` / `--ink-muted` | `#1C2333` / `#5B5F55` | Teks **di dalam** permukaan putih |
| `--ink-on-bg` / `--ink-on-bg-muted` | `#EEF1FA` / rgba putih 72% | Teks **langsung di atas** latar biru |
| `--border-on-bg` | rgba putih 28% | Border elemen di atas latar biru |
| `--indigo` / `--indigo-dark` / `--indigo-tint` | `#1F2A44` / `#141C30` / `#E4E7EE` | Warna utama & modul Kalkulator QRIS |
| `--ochre` / `--ochre-dark` | `#C98A2C` / `#9C6A1E` | Aksen sorotan onboarding, hover back-link |
| `--rust` / `--rust-tint` | `#8C3B2E` / `#F4E3DE` | Modul Keamanan QRIS |
| `--sage` / `--sage-tint` | `#4B6350` / `#E4EBE0` | Modul Kuis CBP Rupiah |

**Catatan penting**: token di atas (indigo/ochre/rust/sage "murni") dipakai
di komponen bergaya terang (mis. `.card-featured`, `.kalk-tip`,
`.kalk-message`). Tapi panel gelap & elemen glow-nya (`.module-grid`,
`.kalk-panel`, `.skenario-panel`, `.modal-box`) pakai **warna hex langsung**
yang tidak masuk token — misalnya glow indigo dark-mode adalah `#7C93FF`
(bukan `--indigo`), glow rust adalah `#FF7A59` (bukan `--rust`), glow sage
adalah `#5CE0B0` (bukan `--sage`). Ini dua palet berbeda untuk dua mode
visual (terang vs gelap) yang kebetulan searah hue. Kalau desain ulang mau
menyatukan token warna, ini titik yang perlu dirapikan.

### 2.3 Tipografi

- **Space Grotesk** (700, 500) — `--font-display`, dipakai untuk semua
  judul (`h1`, `h2`, `.kalk-step legend`, angka hasil, skor).
- **Plus Jakarta Sans** (400, 500, 600) — `--font-body`, teks isi.
- Dimuat dari Google Fonts via `<link>` di `<head>` (tidak ada fallback
  self-hosted).

### 2.4 Radius & spacing

- `--radius: 16px` (kartu, elemen umum), `--radius-sm: 10px` (opsi, badge,
  breakdown item).
- Panel besar (`.module-grid`, `.kalk-panel`, `.skenario-panel`,
  `.modal-box`) pakai radius lebih besar, `28px` (`22px` di mobile).
- `--max-width: 760px` — lebar maksimum konten teks (hero, page-intro,
  langkah kalkulator) supaya baris tidak terlalu panjang di layar lebar.
- `main` dibatasi `max-width: 960px`, center, padding 24px kiri-kanan.

### 2.5 Pola "panel dark-neon-glow" (dipakai berulang)

Empat komponen (`.module-grid`, `.kalk-panel`, `.skenario-panel`,
`.modal-box`) memakai resep CSS yang sama persis:

```css
background: radial-gradient(120% 160% at 50% -20%, <warna1> 0%, <warna2> 55%, <warna3> 100%);
border-radius: 28px;
box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 30px 60px -20px rgba(5,7,16,.55);
```

Ditambah pseudo-elemen `::after` (glow blur tipis di bagian bawah panel)
kecuali `.modal-box`. Warna gradiennya beda tiap panel supaya senada dengan
warna modul:

| Panel | Gradien (atas→bawah) |
|---|---|
| `.module-grid` (beranda) | `#232b4d → #0d0f1a → #060710` (indigo gelap) |
| `.kalk-panel` | sama seperti `.module-grid` |
| `.skenario-panel` | `#3a2436 → #180f14 → #0a0608` (maroon/rust gelap) |
| `.modal-box` | `#1c2a3a → #0d141c → #060a0f` (netral, sengaja **bukan**
  hijau tua — supaya highlight jawaban benar/salah tetap kontras, lihat
  catatan di §2.7) |

### 2.6 Pola "tombol opsi" (dipakai berulang)

Tiga komponen jawaban-interaktif (`.kalk-option`, `.skenario-opsi-btn`,
`.kuis-opsi-btn`) memakai resep visual serupa: kartu kecil dengan border
tipis putih transparan, hover mengangkat (`translateY(-1px)`) + border/glow
warna aksen modul. Bedanya:

- `.kalk-option` — pakai `<input>` asli (radio/checkbox), highlight state
  lewat CSS `:has(input:checked)`, warna aktif selalu biru `#7C93FF`
  (indigo), terlepas dari langkah keberapa.
- `.skenario-opsi-btn` / `.kuis-opsi-btn` — `<button>` polos (bukan form
  input), state benar/salah ditandai lewat class `.benar`/`.salah` yang
  ditambahkan manual oleh JS setelah user memilih, lalu semua tombol lain
  didisable (opacity 0.4 kalau bukan `.benar`/`.salah`).

### 2.7 Pola "feedback benar/salah" (Keamanan & Kuis)

Sama persis antara `.skenario-feedback` dan `.kuis-feedback`: box dengan
`animation: skenario-feedback-in` (fade+slide masuk), warna hijau sage
`#5CE0B0` untuk benar / merah `#FF6B6B` untuk salah, dipakai baik di border
tombol opsi maupun box feedback teks di bawahnya.

**Catatan dari proses build**: warna "benar" di kedua modul sama-sama hijau
sage, terlepas dari warna aksen modulnya sendiri (rust untuk Keamanan, sage
untuk Kuis) — ini konsisten sebagai bahasa universal "benar = hijau, salah
= merah", tapi berarti kontrasnya bergantung penuh pada warna *latar panel*
yang menampungnya. Panel Keamanan gelap-maroon sehingga hijau kontras kuat;
modal Kuis sengaja dibuat netral (bukan hijau tua) supaya highlight hijau
"benar" tidak menyatu dengan latarnya sendiri.

### 2.8 Tombol umum (`.btn`)

`.btn-primary` (gradasi indigo, dipakai untuk aksi utama: Lanjut, CTA
daftar QRIS, Ulangi kuis/skenario) dan `.btn-ghost` (transparan berborder,
untuk aksi sekunder: Sebelumnya, Tutup, Hitung ulang, Kembali ke beranda —
tapi "Kembali ke beranda" sebenarnya pakai `.back-link` terpisah, bukan
`.btn-ghost`, kecuali versi di dalam ringkasan skenario/kuis yang memang
pakai `.btn.btn-ghost`). Tombol "lanjut" di dalam feedback Keamanan/Kuis
(`.skenario-lanjut`, `.kuis-lanjut`) override warnanya sendiri
(gradasi rust / gradasi sage) di luar `.btn-primary` supaya senada modul.

### 2.9 Aksesibilitas yang sudah ada

- `.skip-link` ("Langsung ke konten utama") — tersembunyi kecuali fokus.
- `:focus-visible` outline ochre di semua elemen fokusable.
- Kartu modul pakai `role="button"` + `tabindex="0"` + penanganan
  keydown Enter/Space (bukan cuma klik mouse).
- `aria-hidden` di elemen dekoratif murni (ikon SVG, progress dots, koin
  melayang, overlay onboarding saat tertutup).
- `prefers-reduced-motion: reduce` — mematikan animasi maskot mengambang,
  koin melayang, dan pulse onboarding.
- Modal pakai `role="dialog"` + `aria-modal="true"` + `aria-labelledby`,
  bisa ditutup lewat tombol ✕, klik backdrop, atau tombol Escape.

### 2.10 Motion/animasi yang sudah ada

| Animasi | Elemen | Durasi |
|---|---|---|
| `maskot-mengambang` | `.maskot-float` (maskot beranda) | 3.2s loop |
| `coin-float` | `.coin` (3 koin di hasil kalkulator) | 3.6s loop, staggered delay |
| `onboarding-pulse` | highlight kartu Kalkulator saat onboarding | 1.8s loop |
| `skenario-feedback-in` | box feedback benar/salah (Keamanan & Kuis) | 0.35s sekali jalan |
| Count-up angka | `#kalk-result-total` (`animateNumber()` di JS, bukan CSS) | 0.9s, ease-out cubic |
| Fade+slide masuk hasil kalkulator | `.kalk-result.revealed` | 0.5s |

---

## 3. Alur interaksi & state (ringkas dari sudut JS)

- **Navigasi**: `showPage(id)` toggle `.page.active`; listener klik hanya
  dipasang ke elemen `[data-page]:not(.page)` (kartu), bukan ke `<section
  class="page">` itu sendiri — supaya klik di dalam halaman tidak
  membubble dan memicu ulang `showPage()` pada section leluhurnya (bug
  yang pernah terjadi, sudah diperbaiki, ada catatan di kode & README).
- **Reset-on-entry**: tiap kali kartu di beranda diklik untuk masuk ke
  Kalkulator, Keamanan, atau Kuis, state wizard/skenario/kuis di-reset ke
  langkah pertama — supaya user selalu mulai dari awal, bukan melanjutkan
  sesi sebelumnya.
- **localStorage** dipakai hanya untuk dua hal: status onboarding sudah
  dilihat (`ntt_onboarding_seen`), dan skor kuis CBP Rupiah
  (`ntt_cbp_quiz_score`, format `{correct, total}`). Kalkulator dan
  Keamanan QRIS tidak menyimpan apa pun.

---

## 4. Area yang mungkin relevan diperhatikan saat desain ulang

Catatan objektif dari proses build (bukan saran desain, murni observasi
teknis yang mungkin membantu):

1. **Dua palet warna berbeda untuk mode terang vs gelap** (§2.2) belum
   disatukan jadi token formal — kalau mau ganti skema warna, perlu ubah
   di dua tempat (token `:root` untuk komponen terang, hex literal di CSS
   untuk komponen gelap).
2. **Komponen putih di tengah alur gelap** (`.kalk-breakdown-item`,
   `.kalk-sisi-item`, `.kalk-tip`, `.kalk-message`) — konsisten secara
   fungsi tapi kontrasnya beda gaya dibanding sisanya yang serba gelap.
3. Belum ada dark/light mode toggle atau preferensi pengguna — semua warna
   fixed, tidak menyesuaikan `prefers-color-scheme`.
4. Tidak ada sistem grid/breakpoint terpusat — tiap komponen punya media
   query sendiri-sendiri (kebanyakan breakpoint di 640px/700px/860px),
   jadi kalau mau redesain responsif secara sistematis, breakpoint-nya
   tersebar di banyak tempat, bukan di satu tempat.
5. Font selalu dimuat dari Google Fonts CDN, tanpa self-host atau
   font-display fallback eksplisit selain `&display=swap` di URL.
6. Ikon kartu modul memakai SVG inline hand-drawn sederhana (bukan dari
   library ikon), jadi kalau mau ganti gaya ikon perlu digambar ulang
   manual per ikon.

---

## 5. Dokumentasi terkait

- [`perhitungan-kalkulator-qris.md`](perhitungan-kalkulator-qris.md) —
  rumus & contoh angka di balik hasil Kalkulator QRIS.
- [`../PROMPT-LANJUTAN.md`](../PROMPT-LANJUTAN.md) — brief awal proyek,
  termasuk keputusan yang sudah final dan fitur yang sudah ditolak.
- [`../README.md`](../README.md) — status fitur & catatan teknis ringkas.
