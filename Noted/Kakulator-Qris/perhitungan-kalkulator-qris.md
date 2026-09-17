# Cara Kerja Perhitungan Kalkulator QRIS

Dokumen ini menjelaskan dari mana angka-angka di halaman hasil Kalkulator
QRIS berasal, lengkap dengan rumus dan contoh perhitungan. Rumus ini ada di
`js/main.js`, di dalam fungsi `calculateResult()` dan `renderResult()`.

## Ringkasan: pertanyaan mana yang menghasilkan angka

Kalkulator punya 4 pertanyaan (P1–P4), tapi **hanya P1 dan P3 yang
menghasilkan angka Rupiah/jam**. P2 dan P4 tidak memengaruhi angka sama
sekali — keduanya cuma mengubah *narasi* (teks) yang ditampilkan.

| Pertanyaan                  | Dipakai untuk hitungan angka? | Dipakai untuk apa                                                                                 |
| --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| P1 — Omzet harian          | ✅ Ya                         | Menghitung "Total uang tunai per bulan"                                                           |
| P2 — Checklist pengalaman  | ❌ Tidak                      | Menentukan isi teks "Sisi tunai yang dialami" + tips CBP Rupiah + "Manfaat QRIS" mana yang muncul |
| P3 — Waktu menghitung uang | ✅ Ya                         | Menghitung "Waktu terbuang per bulan" (jam) dan nilai Rupiah-nya                                  |
| P4 — Rekening bank         | ❌ Tidak                      | Menentukan teks "Langkah selanjutnya" di bagian bawah                                             |

Ini kenapa waktu Anda mengetes dengan omzet yang **sama** tapi jawaban lain
diganti-ganti, angka "Total uang tunai per bulan" **tetap sama** — itu
memang benar, karena angka itu murni dari jawaban P1.

## 1. Total uang tunai per bulan (dari P1)

**Rumus:**

```
Total uang tunai per bulan = omzet harian × 30 hari
```

Setiap pilihan di P1 diwakili satu angka omzet harian (bukan rentangnya
persis, tapi angka representatif di tengah/awal rentang):

| Pilihan di P1            | Omzet harian yang dipakai | × 30 hari | Hasil                  |
| ------------------------ | ------------------------- | ---------- | ---------------------- |
| Kurang dari Rp100.000    | Rp75.000                  | × 30      | **Rp2.250.000**  |
| Rp100.000 – Rp500.000   | Rp300.000                 | × 30      | **Rp9.000.000**  |
| Rp500.000 – Rp1.000.000 | Rp750.000                 | × 30      | **Rp22.500.000** |
| Lebih dari Rp1.000.000   | Rp1.250.000               | × 30      | **Rp37.500.000** |

**Contoh yang Anda lihat:** pilih "Kurang dari Rp100.000" →

```
Rp75.000/hari × 30 hari = Rp2.250.000/bulan
```

Angka ini murni asumsi sederhana "kalau omzet segini tiap hari, berapa
total uang tunai yang mengalir lewat tanganmu sebulan" — bukan dihitung
sebagai kerugian, tapi sebagai gambaran skala uang tunai yang bisa
langsung masuk otomatis ke rekening kalau pakai QRIS.

## 2. Waktu terbuang per bulan & nilai Rupiahnya (dari P3)

Ini dua angka yang saling berkaitan: dulu kartunya cuma menampilkan nilai
Rupiah dengan label "Waktu...", yang membingungkan karena label bilang
"waktu" tapi angkanya Rupiah — sudah diperbaiki supaya angka besar di
kartu hasil **benar-benar dalam jam**, dan nilai Rupiah jadi keterangan
tambahan di bawahnya.

**Langkah 1 — ubah menit/hari jadi jam/bulan:**

```
Jam per bulan = (menit per hari × 30 hari) ÷ 60
```

Setiap pilihan di P3 diwakili satu angka menit/hari representatif:

| Pilihan di P3        | Menit/hari yang dipakai | Perhitungan      | Jam per bulan     |
| -------------------- | ----------------------- | ---------------- | ----------------- |
| Kurang dari 10 menit | 5 menit                 | (5 × 30) ÷ 60  | **2,5 jam** |
| 10 – 20 menit       | 15 menit                | (15 × 30) ÷ 60 | **7,5 jam** |
| 20 – 40 menit       | 30 menit                | (30 × 30) ÷ 60 | **15 jam**  |
| Lebih dari 40 menit  | 50 menit                | (50 × 30) ÷ 60 | **25 jam**  |

**Langkah 2 — ubah jam/bulan jadi nilai Rupiah, pakai asumsi upah per jam:**

```
Nilai waktu per bulan = jam per bulan × Rp15.000/jam
```

Angka **Rp15.000/jam** ini bukan angka acak — berasal dari asumsi UMP
(Upah Minimum Provinsi) NTT 2026 sekitar **Rp2.700.000/bulan**, dibagi
**173 jam kerja/bulan** (standar jam kerja bulanan yang lazim dipakai di
Indonesia: 40 jam/minggu × 4,33 minggu), lalu dibulatkan:

```
Rp2.700.000 ÷ 173 jam ≈ Rp15.606/jam → dibulatkan jadi Rp15.000/jam
```

**Contoh yang Anda lihat:** pilih "20 – 40 menit" (30 menit/hari) →

```
Jam per bulan  = (30 × 30) ÷ 60      = 15 jam
Nilai waktu    = 15 jam × Rp15.000   = Rp225.000/bulan
```

Yang ditampilkan di kartu hasil:

- **Angka besar:** `15 jam` (bukan Rupiah lagi)
- **Keterangan di bawahnya:** "...setara **Rp225.000/bulan** kalau
  waktumu dihargai ~Rp15.000/jam"

## Kenapa P2 dan P4 tidak masuk hitungan

- **P2 (checklist pengalaman)** — awalnya (versi lama) tiap item checklist
  punya persentase kerugian sendiri yang dikalikan ke omzet. Setelah
  disesuaikan dengan brief asli proyek, pendekatan itu diganti jadi murni
  naratif: tiap item yang dicentang (robek, basah, diragukan, kabur)
  memunculkan kartu penjelasan + tips CBP Rupiah + manfaat QRIS yang
  relevan, tanpa dikonversi ke angka Rupiah — karena brief menekankan
  "narasi personalisasi", bukan kalkulator akuntansi presisi.
- **P4 (rekening bank)** — dari awal memang didesain hanya untuk
  menentukan teks rekomendasi tindak lanjut ("buka rekening dulu" vs
  "langsung daftar QRIS"), bukan untuk hitungan kerugian.

## Ringkasan rumus (kode asli)

Potongan dari `js/main.js`:

```js
const UPAH_PER_JAM = 15000;

const uangTunaiPerBulan = omzetHarian * 30;
const jamPerBulan = (waktuMenit * 30) / 60;
const nilaiWaktuBulanan = jamPerBulan * UPAH_PER_JAM;
```

## Catatan penting

Semua angka ini adalah **perkiraan edukatif untuk ilustrasi**, bukan hasil
audit keuangan atau survei UMKM yang sebenarnya. Ini juga ditulis eksplisit
di halaman hasil: *"Angka dan narasi di atas adalah perkiraan edukatif
berdasarkan jawabanmu, bukan hitungan akuntansi yang pasti."*
