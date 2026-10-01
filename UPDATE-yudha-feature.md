# Update Branch `yudha-feature`

Ringkasan semua perubahan dari sesi redesign — branch dibuat dari `main`,
commit `55d2349` (50 file, +4217/−712). Status push: **tertunda (403)**,
akun `YudhaPalulun` belum punya akses tulis ke repo `Petra-Miracle`.

## 1. Beranda (ala Kahoot, tanpa login)

- Tema putih + topbar **biru BI** (`#15335F`), tombol pill modul warna-warni.
- 4 kartu modul berwarna (oranye/ungu/merah/biru) + **motif ilustrasi per modul**
  (`ModulMotif.jsx`): kalkulator, peringatan+QR, kipas uang rupiah, tenun.
- **Animasi peluncuran KoRa** (`ModuleLaunch.jsx`): KoRa terbang + kabut,
  tombol Play besar, ledakan kabut sebelum masuk modul.
- **Galeri 40 video YouTube** (`VideoBelajar.jsx`, `videoBelajar.js`): 4 tab
  kategori × 10 video, sorotan utama berputar otomatis, thumbnail + judul +
  kanal asli (semua 58 ID kandidat diverifikasi via oEmbed).
- Slogan penutup khas Kupang: *"Lu sonde keren kalau belum pakai QRIS!"*.
- Musik latar ceria 40% + tombol speaker (`ambientSound.js`, `useAmbientSound`).

## 2. Kalkulator QRIS (oranye, pasar & sembako)

- Halaman terang + **backdrop ilustrasi pasar/sembako** blur (`PasarBackdrop.jsx`).
- Wizard kartu putih-oranye + ikon tiap langkah (`OptionCard` tone terang).
- **Hasil interaktif**: tab Harian/Mingguan/Bulanan, hujan koin, akordeon,
  bunyi "ding!".
- **Narasi suara perempuan** tiap pertanyaan + tombol Dengarkan.
- Musik 40% + tombol speaker.

## 3. Keamanan QRIS (ungu, perlindungan konsumen)

- Halaman terang + **backdrop perisai/QR/peringatan/meja pengaduan 131**.
- Kartu jawaban terang (`AnswerCard` tone terang), `KoraNote` tone terang.
- **Loop action tegang** saat menjawab → musik ceria lagi saat hasil (`actionSound.js`).
- **Narasi suara perempuan otomatis per skenario, rate 1,15x** + tombol Dengarkan.

## 4. Kuis CBP Rupiah (merah muda, halaman sendiri `/kuis`)

- Pindah dari modal menumpuk → **halaman `/kuis`** (`Kuis.jsx` + `KuisFlow.jsx`,
  `KuisModal.jsx` dihapus). Tombol topbar "Kuis CBP" kini berfungsi di semua halaman.
- Backdrop **nominal rupiah melayang** Rp1.000–Rp100.000 (`RupiahBackdrop.jsx`).
- Hasil ala game: ring skor, bintang, konfeti (≥80%), awan hujan (<75%),
  **pembahasan tiap soal**.
- Sound hasil 60%: **hore + tepuk tangan** (≥80%), **jingle gagal** (<75%)
  (`gameSound.js` + `getResultSound`).

## 5. Produk Lokal (biru tua, tenun 3D)

- Halaman terang + **backdrop tenun ikat animasi 3D** (`TenunBackdrop.jsx`).
- **Kartu tematik per produk** (`produkLokalTheme.js` + `KartuMotif.jsx`):
  kopi, tenun, sasando, batik, sepatu, pabrik, mainan, garam.
- **Poin + streak beruntun**, kartu goyang/berpendar, **pembahasan tiap kartu**
  di layar hasil.
- Sound: tepat → **ding + "yey!" + tepuk tangan**; meleset → **tetot + "ow-ow"**.

## 6. Suara & util bersama

- `koraSound.js`: benar = "ding!" centang, salah = "tetot" (berlaku di semua modul).
- `useSoundLoop.js`: hook generik loop suara (dipakai ambient + action).
- `narration.js`: TTS perempuan `id-ID` (gagal diam-diam bila tak tersedia).

## 7. Verifikasi

- **72 test hijau** (`npm.cmd run test`), lint 0 warning, `npm.cmd run build` sukses.
- Catatan: test interaksi berat kadang timeout saat full-run paralel di mesin
  sibuk — selalu lulus saat dijalankan terpisah (bukan kegagalan logika).

## 8. Tindak lanjut push

- Minta akses collaborator untuk `YudhaPalulun`, lalu `git push -u origin yudha-feature`;
  atau fork → push → Pull Request ke repo asli.
- Website live ikut update setelah branch ini di-merge ke branch deploy (umumnya `main`).
