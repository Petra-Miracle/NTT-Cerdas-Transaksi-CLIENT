# NTT Cerdas Transaksi — Frontend

Dashboard edukasi QRIS & Cinta Bangga Paham (CBP) Rupiah untuk pedagang UMKM
Kupang. Frontend-only (React + JavaScript, Vite). Backend (Express + Prisma +
PostgreSQL) dikerjakan di repo terpisah — lihat `Noted/Rebuild-Systems/`.

Sumber kebenaran konten: [`Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md`](Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md).

## Menjalankan lokal

```bash
npm install
npm run dev       # dev server (default http://localhost:5173)
npm run build     # build production ke dist/
npm run preview   # preview hasil build
npm run test      # unit + component test (Vitest)
npm run lint      # oxlint
```

Environment variable opsional (`.env.local`):

```env
VITE_API_BASE_URL=http://localhost:3000
```

Kalau tidak diisi, default ke `http://localhost:3000`. Semua panggilan ke
backend bersifat fire-and-forget (analytics) dan gagal secara diam-diam —
tidak pernah memblokir atau mengubah tampilan hasil kalkulator/kuis/skenario
yang sudah final di sisi klien.

## Keputusan yang sudah dikonfirmasi pemilik proyek

1. **Analytics**: penuh — submission Kalkulator QRIS dan attempt Kuis CBP
   dikirim ke backend (`POST /api/kalkulator/submissions`,
   `POST /api/kuis/attempts`).
2. **Skenario Keamanan QRIS**: attempt-nya **juga** dikirim ke backend
   (`POST /api/skenario/attempts`) — ini scope tambahan dibanding versi lama
   yang sengaja tidak menyimpan skor modul ini (lihat handoff §6.1). Skor
   yang ditampilkan ke user tetap murni state sesi React, tidak pernah masuk
   `localStorage`.
3. **Library UI**: Tailwind CSS v4 untuk layout/token dan seluruh komponen
   (lihat catatan redesign di bawah — HeroUI sempat dipasang tapi akhirnya
   dilepas), **Lucide-React** sebagai satu-satunya sumber ikon. MUI tidak
   dipasang — tidak ada kebutuhan komponen di luar Tailwind.
4. **API base URL**: `VITE_API_BASE_URL`, fallback `http://localhost:3000`.

## Keputusan implementasi tambahan (bukan dari handoff, murni teknis)

- **Modal Kuis dan "option card"/"answer card" (radio/checkbox/jawaban
  skenario) dibangun custom dengan Tailwind**, bukan lewat komponen HeroUI
  `Modal`/`Radio`/`Checkbox`. HeroUI v3 memakai primitif React Aria
  Components yang punya API compound cukup kompleks untuk kasus ini (state
  benar/salah dinamis per opsi, highlight custom, indikator radio/checkbox
  bergaya bebas dari desain Pencil). Setelah desain ulang (lihat bagian
  berikut), **seluruh komponen UI ternyata dibangun custom dengan Tailwind**
  mengikuti gaya visual dari file desain — dependensi `@heroui/react` dan
  `framer-motion` akhirnya dilepas (`npm uninstall`) karena tidak lagi
  dipakai sama sekali, supaya bundle CSS/JS tidak membawa kode yang tidak
  terpakai (CSS bundle turun dari ~455KB ke ~36KB setelah dilepas).
  Modal custom tetap mengimplementasikan `role="dialog"`, `aria-modal`,
  focus trap, dan penutupan lewat Escape/klik backdrop.

## Redesign visual dari `Pendev/NTT-Cerdas-Transaksi.pen`

Tampilan (bukan konten/rumus) dirombak total mengikuti file desain Pencil
`Pendev/NTT-Cerdas-Transaksi.pen`, dianalisis lewat MCP tool `pencil` (5
frame layar: Beranda, Kalkulator — Langkah, Kalkulator — Hasil, Keamanan
QRIS — Skenario, Kuis CBP Rupiah — Modal, plus 4 komponen reusable:
Button/Primary, Button/Ghost, Pill/Badge, Topbar). Perubahan utama:

- **Token warna** diselaraskan persis ke variabel desain di file `.pen`
  (`bg #15335F`, `ochre #E7B15C`, `indigo #7C93FF`, `rust #FF7A59`,
  `sage #5CE0B0`, dll. — lihat `src/index.css`).
- **Tombol primer** kini pill gradient ochre (teks cokelat gelap) untuk CTA
  utama/marketing, dengan varian gradient per-modul (indigo/rust/sage, teks
  putih atau hijau tua tergantung kontras) untuk tombol navigasi "Lanjut" di
  dalam tiap modul — persis pola pada file desain.
- **Kartu opsi** (wizard Kalkulator) memakai indikator radio/checkbox custom
  bulat/kotak dengan aksen indigo saat dipilih; **kartu jawaban** (Keamanan
  & Kuis) menampilkan ikon centang/silang setelah dikunci, opsi lain meredup
  45%.
- **Panel hasil & feedback** memakai kartu kaca bertint warna (bukan lagi
  kartu putih di tengah alur gelap — ini sekaligus memperbaiki
  inkonsistensi yang dicatat di `kerangka-ui-website.md` §4.2) dan kotak
  "callout" solid hitam untuk pesan rekomendasi/feedback, sesuai file
  desain.
- **Motif tenun ikat**: file desain memakai shader GLSL kustom
  (`tenun-motif-ntt.glsl`, tidak tersedia untuk diekspor) sebagai tekstur
  latar. Didekati dengan pola SVG diamond berulang beropasitas rendah
  (`.textured-bg` di `src/index.css`) yang divisualisasikan mirip pada
  render Pencil.
- **Maskot "KoRa"**: sempat direkonstruksi sebagai vector art dari file
  `.pen` (diekspor ke PNG), lalu diganti pemilik proyek dengan foto render
  resmi maskot "KoRa" (`src/assets/img/BonekaKoRa.jpg`, dikompres dari
  ~1.5MB jadi ~40KB via `ffmpeg` supaya tidak membengkakkan bundle) yang
  dipakai di Hero beranda.
- **Salinan pemasaran baru** (bukan dari handoff, bebas diubah pemilik
  proyek): headline & subheadline Hero, eyebrow "Program Edukasi Transaksi
  Digital NTT", judul seksi modul "Belajar Transaksi Digital Lewat Praktik
  Langsung", dan label tombol "Skenario Berikutnya"/"Soal Berikutnya" —
  semua disusun mengikuti pola teks di file desain, bukan kutipan dari
  handoff. Seluruh rumus, opsi jawaban, skenario, soal kuis, dan feedback
  tetap **kutipan persis** dari handoff, tidak diubah oleh redesign ini.
- **Topbar** menambahkan CTA "Mulai Sekarang" (mengarah ke `/kalkulator`)
  sesuai file desain — sebelumnya topbar hanya berisi wordmark + pill event.
- Badge "Skor terbaik" pada modal Kuis di file desain **sengaja tidak
  diterapkan** — bertentangan dengan keputusan arsitektur bahwa skor yang
  ditampilkan ke user murni state sesi, bukan dibaca ulang dari
  backend/`localStorage` (lihat §6.2 handoff).

## Teks yang dikomposisi (bukan kutipan literal dari handoff)

Handoff §3.1 hanya memberi judul singkat tiap pertanyaan kalkulator dan
deskripsi maksud pesan kosong P2, bukan kalimat lengkap. Teks berikut
disusun mengikuti maksud tersebut dan sebaiknya direview pemilik proyek
sebelum dianggap final (lokasi: `src/modules/kalkulator/kalkulatorContent.js`):

- 4 kalimat tanya wizard (`QUESTIONS.omzet/pengalaman/waktu/rekening`) — P2
  sudah literal dari handoff, P1/P3/P4 disusun dari judul singkatnya.
- `PENGALAMAN_KOSONG_MESSAGE` — pesan saat user pilih "belum pernah
  mengalami" atau tidak mencentang apa pun di P2.

Semua rumus, opsi jawaban, skenario, soal kuis, feedback, dan disclaimer
lainnya adalah kutipan persis dari handoff — tidak diubah.

## Struktur proyek

```text
src/
  components/        Komponen presentasi generik (OptionCard, AnswerCard, Modal, dst.)
  modules/
    kalkulator/       kalkulatorContent.js (data) + kalkulatorLogic.js (rumus, murni)
    keamanan/         keamananContent.js (3 skenario)
    kuis/             kuisContent.js (10 soal)
  pages/              Beranda, Kalkulator, Keamanan, NotFound
  services/api.js     Lapisan fetch fire-and-forget ke backend
  hooks/useOnboarding.js
  utils/format.js     formatRupiah, formatJam
```

Logika rumus (`kalkulatorLogic.js`) dan konten statis (`*Content.js`) sengaja
dipisah dari komponen UI supaya bisa ditest independen dari tampilan.

## Status pengujian

`npm run test` → 8 file test, 27 test, semua lulus:

- Rumus kalkulator (semua kombinasi omzet & waktu dari tabel handoff).
- Eksklusivitas checklist "belum pernah mengalami" di P2.
- Format Rupiah & jam (termasuk desimal berkoma).
- Ambang pesan skor kuis (≥80%, 50–79%, <50%).
- Alur wizard Kalkulator end-to-end (validasi tiap langkah, navigasi
  mundur, submit, reset ke wizard).
- Alur Keamanan QRIS end-to-end (feedback benar/salah, skor akhir, pesan
  sempurna vs belum, ulangi).
- Alur Kuis CBP end-to-end (skor & pesan akhir, submit analytics, modal
  selalu reset ke soal 1 saat ditutup).
- Onboarding spotlight (tampil di kunjungan pertama, hilang & tersimpan ke
  `localStorage` setelah kartu Kalkulator diklik, tidak pernah muncul di
  kartu Keamanan/Kuis).

`npm run build` sukses (Vite + Tailwind v4 + HeroUI). Sudah diverifikasi
manual di browser (beranda, wizard Kalkulator, skenario Keamanan) — tidak
ada error di console.

## Fitur yang sengaja tidak dibangun

Sesuai handoff §4: tidak ada chatbot, tidak ada integrasi pendaftaran QRIS
langsung (CTA murni tautan eksternal ke `bi.go.id/QRIS`), tidak ada sistem
akun/login, tidak ada testimoni video.
