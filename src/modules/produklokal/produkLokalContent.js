// Konten modul "Cintai Produk Lokal & Bangga Buatan Indonesia" — pelengkap
// tema lomba yang belum tersentuh modul lain. Format kartu tebak: tiap kartu
// menampilkan satu produk, pemain menebak "Lokal/Buatan Indonesia" atau
// "Produk Impor", lalu dapat fakta singkat kenapa jawabannya begitu.

export const KARTU_LIST = [
  {
    id: 1,
    nama: 'Tenun Ikat Sumba',
    kategori: 'Lokal NTT',
    deskripsi: 'Kain bermotif khas, ditenun manual oleh pengrajin di Sumba, Nusa Tenggara Timur.',
    lokal: true,
    fakta:
      'Tenun ikat Sumba dibuat dengan proses pewarnaan dan tenun manual yang bisa memakan waktu berbulan-bulan — membeli langsung dari pengrajin lokal berarti mendukung ekonomi keluarga penenun di NTT.',
  },
  {
    id: 2,
    nama: 'Kopi Arabika Bajawa',
    kategori: 'Lokal NTT',
    deskripsi: 'Kopi yang ditanam di dataran tinggi Bajawa, Flores, dengan cita rasa khas daerah pegunungan.',
    lokal: true,
    fakta:
      'Kopi Bajawa adalah salah satu kopi arabika unggulan Flores. Membeli dari petani/UMKM lokal — apalagi lewat QRIS — mempercepat perputaran uang di komunitas petani NTT.',
  },
  {
    id: 3,
    nama: 'Sasando',
    kategori: 'Lokal NTT',
    deskripsi: 'Alat musik petik tradisional khas Pulau Rote, NTT, dengan resonator daun lontar.',
    lokal: true,
    fakta:
      'Sasando adalah identitas budaya NTT yang dikenal hingga mancanegara. Mendukung pengrajin sasando lokal membantu melestarikan warisan budaya ini tetap hidup.',
  },
  {
    id: 4,
    nama: 'Batik Tulis Nusantara',
    kategori: 'Buatan Indonesia',
    deskripsi: 'Kain batik yang digambar dan dilukis tangan oleh perajin batik di berbagai daerah Indonesia.',
    lokal: true,
    fakta:
      'Batik tulis adalah warisan budaya Indonesia yang diakui UNESCO. Membeli batik tulis asli mendukung perajin lokal dibanding batik cetak pabrik massal dari luar negeri.',
  },
  {
    id: 5,
    nama: 'Sepatu Kulit Buatan Lokal',
    kategori: 'Buatan Indonesia',
    deskripsi: 'Sepatu kulit yang diproduksi oleh pengrajin dan UMKM sepatu di dalam negeri.',
    lokal: true,
    fakta:
      'Banyak sepatu kulit buatan UMKM lokal punya kualitas setara merek luar, dengan harga yang lebih ramah dan keuntungan yang berputar di ekonomi dalam negeri.',
  },
  {
    id: 6,
    nama: 'Kain Sutra Impor Pabrikan',
    kategori: 'Produk Impor',
    deskripsi: 'Kain sutra bermotif cetak, diproduksi massal oleh pabrik di luar negeri.',
    lokal: false,
    fakta:
      'Kain cetak pabrikan luar negeri sering lebih murah, tapi uangnya mengalir keluar dari ekonomi lokal. Tenun/batik lokal jadi alternatif yang mendukung pengrajin dalam negeri.',
  },
  {
    id: 7,
    nama: 'Mainan Plastik Kemasan Impor',
    kategori: 'Produk Impor',
    deskripsi: 'Mainan anak-anak produksi massal pabrik luar negeri, dijual dalam kemasan impor.',
    lokal: false,
    fakta:
      'Indonesia juga punya banyak produsen mainan edukatif lokal — memilihnya berarti ikut mendukung industri kreatif dalam negeri, bukan cuma soal harga murah.',
  },
  {
    id: 8,
    nama: 'Garam Krosok NTT',
    kategori: 'Lokal NTT',
    deskripsi: 'Garam laut tradisional yang diproduksi petani garam di pesisir Nusa Tenggara Timur.',
    lokal: true,
    fakta:
      'NTT adalah salah satu penghasil garam terbesar di Indonesia. Membeli garam lokal langsung membantu penghidupan petani garam di pesisir NTT.',
  },
]

export const PRODUK_LOKAL_PESAN_SEMPURNA =
  'Mantap, kamu jago membedakan produk lokal dari produk impor! Teruskan kebiasaan ini setiap belanja — kecil-kecilan, tapi dampaknya nyata buat UMKM Kupang dan NTT.'

export const PRODUK_LOKAL_PESAN_BELUM_SEMPURNA =
  'Yuk lebih peka lagi mengenali produk lokal di sekitarmu. Setiap kali kamu pilih produk buatan lokal/Indonesia — apalagi bayar pakai QRIS ke pedagangnya langsung — kamu sudah ikut membantu ekonomi UMKM.'
