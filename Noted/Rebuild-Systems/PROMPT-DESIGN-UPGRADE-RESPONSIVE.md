# Prompt Upgrade Desain & Responsivitas — NTT Cerdas Transaksi

Salin seluruh isi dokumen ini sebagai prompt untuk AI design yang akan mengerjakan upgrade tampilan frontend **NTT Cerdas Transaksi**.

## Peran dan tujuan

Anda adalah senior frontend/UI designer yang mengerjakan React (JavaScript, bukan TypeScript) + Vite + Tailwind CSS v4. Tugas Anda: **meningkatkan kualitas visual/UX di seluruh halaman yang sudah ada**, dan **memastikan seluruh sistem benar-benar responsive di semua ukuran device** (HP kecil sampai desktop besar).

Ini bukan desain dari nol — proyek ini sudah melalui redesign besar (tema "Kahoot-style", terang, playful, per-modul berwarna) yang sudah bagus. Tugas Anda adalah **menyempurnakan**, bukan mengganti arah desain yang sudah ada.

## Konteks produk

NTT Cerdas Transaksi adalah website edukasi untuk pedagang UMKM Kupang & NTT, dibuat untuk Lomba Karya Inovasi Bank Indonesia Kupang 2026 (kompetisi berlangsung 4 Okt 2026). Empat modul interaktif:

1. **Kalkulator QRIS** (`/kalkulator`) — tema oranye, wizard 4 pertanyaan + hasil penghematan.
2. **Keamanan QRIS** (`/keamanan`) — tema ungu, 3 skenario penipuan + info pengaduan konsumen.
3. **Kuis CBP Rupiah** (`/kuis`) — tema merah muda, 10 soal keaslian uang.
4. **Cintai Produk Lokal** (`/produk-lokal`) — tema biru tua, 8 kartu tebak produk lokal vs impor.

Plus **Beranda** (`/`) sebagai hub, dan maskot **KoRa** (banteng khas NTT) sebagai identitas visual yang muncul di semua halaman.

## Apa yang SUDAH bagus — jangan dirombak arahnya

- Tema terang (putih) dengan warna identitas per modul: navy `#15335F` (brand utama), oranye `#E8590C` (Kalkulator), ungu `#7C5CFF` (Keamanan), merah/pink `#E5484D`/`#E11D48` (Kuis), biru `#1A5DAD` (Produk Lokal), kuning `#FFD02F` (aksen/CTA universal).
- Backdrop ilustrasi tematik per halaman (`PasarBackdrop.jsx`, `KeamananBackdrop.jsx`, `TenunBackdrop.jsx`, `RupiahBackdrop.jsx`).
- Animasi peluncuran modul `ModuleLaunch.jsx` (KoRa terbang + kabut + tombol Play) — ini elemen favorit, pertahankan konsepnya.
- Reaksi maskot KoRa (`KoraNote.jsx`) yang memantul/bergoyang sesuai jawaban benar/salah.
- Narasi suara, musik latar, dan efek suara (`narration.js`, `ambientSound.js`, `actionSound.js`, `gameSound.js`, `koraSound.js`).
- Dokumentasi lengkap ada di `UPDATE-yudha-feature.md` (root repo) — baca dulu sebelum mulai, supaya tidak mengulang kerja yang sudah ada.

## Yang TIDAK boleh diubah

- **`src/components/LoadingScreen.jsx` — JANGAN DIUBAH SAMA SEKALI.** Tampilan loading antar-halaman (animasi koin KoRa terbalik) harus tetap persis seperti sekarang. Ini satu-satunya elemen yang sengaja dipertahankan dari desain lama.
- **Jangan ubah teks/konten edukasi** (pertanyaan kalkulator, skenario keamanan, soal kuis, deskripsi produk lokal) — sumber kebenarannya ada di `Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md`. Perubahan visual/layout boleh, perubahan isi/kalimat tidak boleh tanpa konfirmasi pemilik proyek.
- **Jangan hapus/ubah** atribut `data-testid`, `data-tour`, `role`, `aria-*` yang sudah ada — ini dipakai test suite (73 test) dan sistem product tour (`ProductTour.jsx`). Kalau perlu styling ulang elemen yang punya atribut ini, pertahankan atributnya, ubah hanya class/style-nya.
- **Jangan tambah dependency baru** (library komponen UI, animasi, dll.) tanpa menyebutkannya eksplisit di laporan akhir — proyek ini sempat melepas total HeroUI/framer-motion karena berakhir tidak terpakai, jadi pertimbangkan baik-baik sebelum menambah lagi.

## Cakupan upgrade

Review dan tingkatkan kualitas visual/UX semua halaman dan komponen berikut:

```text
src/pages/Beranda.jsx
src/pages/Kalkulator.jsx
src/pages/Keamanan.jsx
src/pages/Kuis.jsx
src/pages/ProdukLokal.jsx
src/pages/NotFound.jsx
src/modules/kalkulator/KalkulatorWizard.jsx
src/modules/kalkulator/KalkulatorResult.jsx
src/modules/keamanan/KeamananFlow.jsx
src/modules/kuis/KuisFlow.jsx
src/modules/produklokal/ProdukLokalFlow.jsx
src/components/Topbar.jsx
src/components/ModuleLaunch.jsx
src/components/VideoBelajar.jsx
src/components/ProductTour.jsx
src/components/KoraNote.jsx
src/components/AmbientToggle.jsx
```

Untuk tiap halaman/komponen, pertimbangkan: hierarki visual (apakah yang paling penting paling menonjol?), konsistensi spacing/typography antar section, micro-interaction (hover/focus/active state), dan apakah transisi antar elemen terasa halus — bukan cuma "ganti warna".

## Target: RESPONSIVE penuh di semua device

Ini **wajib**, bukan opsional. Setiap halaman harus diuji dan dipastikan rapi di breakpoint berikut:

- **Mobile kecil** (360–390px, mis. iPhone SE/Android kecil)
- **Mobile besar** (414–430px, mis. iPhone Pro Max)
- **Tablet** (768–834px, mis. iPad)
- **Laptop** (1024–1280px)
- **Desktop besar** (1440px ke atas)

Checklist yang wajib dipenuhi di setiap breakpoint:

- **Tidak ada horizontal scroll** sama sekali di lebar berapa pun.
- **Touch target minimal 44×44px** untuk semua tombol/link interaktif di mobile (termasuk tombol di dalam `Topbar`, `ModuleLaunch`, kartu modul, dan tombol jawaban kuis/skenario).
- **Teks tetap terbaca** — tidak ada font yang terlalu kecil (<14px untuk body text) atau judul yang terpotong/overflow di layar sempit.
- **Grid/layout reflow dengan benar**: kartu modul, galeri video, dan kartu hasil yang di desktop berjajar beberapa kolom harus rapi turun jadi 1 kolom di mobile tanpa elemen bertumpuk atau terpotong.
- **Gambar/ilustrasi (backdrop, maskot KoRa, motif modul)** tidak pecah/terdistorsi dan tidak bikin layout meluber di layar kecil — gunakan `object-contain`/`object-cover` dan ukuran relatif (`vw`/`%`/`clamp()`) secukupnya.
- **Modal/overlay** (`ModuleLaunch`, `ProductTour`) tetap pas di layar kecil — tidak terpotong di atas/bawah, dan tetap bisa di-scroll kalau kontennya lebih tinggi dari viewport.
- **Safe-area untuk perangkat dengan notch** (opsional tapi disarankan): pertimbangkan `env(safe-area-inset-*)` untuk elemen fixed seperti `AmbientToggle` dan tombol kembali yang nempel di tepi layar.
- **Navbar/Topbar**: menu mobile (hamburger) harus mudah dijangkau ibu jari (bottom-friendly atau minimal mudah di-tap di pojok atas), dan tidak menutupi konten penting saat terbuka.
- Gunakan breakpoint Tailwind standar yang sudah dipakai proyek ini (`sm:`, `md:`, `lg:`, `xl:`) — jangan perkenalkan sistem breakpoint custom baru kalau tidak benar-benar perlu.

## Verifikasi sebelum melaporkan selesai

Jalankan semua ini dan laporkan hasilnya:

```bash
npm run test     # harus tetap 73 test lulus (atau lebih, kalau Anda menambah test)
npm run lint     # harus 0 warning/error baru
npm run build    # harus sukses
```

Lakukan juga pengecekan visual manual (`npm run dev`) minimal di 3 lebar layar: ~375px (mobile), ~768px (tablet), ~1440px (desktop) untuk setiap halaman yang disebut di atas.

## Format laporan akhir

Setelah selesai, laporkan:

1. Daftar file yang diubah.
2. Ringkasan perubahan visual per halaman (sebelum → sesudah, cukup deskriptif, tidak perlu screenshot).
3. Konfirmasi eksplisit bahwa `LoadingScreen.jsx` tidak disentuh.
4. Hasil `test`/`lint`/`build`.
5. Device/breakpoint apa saja yang sudah dicek manual.
