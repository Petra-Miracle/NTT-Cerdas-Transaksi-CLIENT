// Galeri video edukasi YouTube — 4 kategori × 10 video. Seluruh ID sudah
// diverifikasi ada via oEmbed YouTube; judul + kanal disalin persis dari sana.
// Klik kartu membuka video di tab baru. Thumbnail diambil dari i.ytimg.com.

function thumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function watch(id) {
  return `https://www.youtube.com/watch?v=${id}`
}

export const VIDEO_BELAJAR = [
  {
    id: 'hemat',
    label: 'Hemat ala QRIS',
    desc: 'Cara kerja, daftar merchant, dan bayar pakai QRIS.',
    bg: 'bg-[#E8590C]',
    videos: [
      { yt: 'YMcI754wroM', title: 'Gimana Sebenarnya Cara Kerja QRIS?', channel: 'Kok Bisa?' },
      { yt: 'YlAjpPbyYCM', title: 'Usaha Makin Gampang, Yuk Jadi Merchant QRIS Sekarang!', channel: 'Bank Indonesia Channel' },
      { yt: 'iShnTXXy0RU', title: 'Step by Step Cara Membuat QRIS All Payment untuk Usaha', channel: 'TVAsuransi' },
      { yt: 'y9Ef8R95j8I', title: 'CARA MEMBUAT QRIS UNTUK SEMUA PEMBAYARAN | CARA DAFTAR QRIS TANPA BIAYA ADMIN TERBARU 2026..!!', channel: 'Devi Ananda Official' },
      { yt: 'k4EGy4Ov3Ag', title: 'Sosialisasi QRIS', channel: 'Hana Bank Indonesia' },
      { yt: '31zaoAB01c0', title: 'Apa Itu QRIS?', channel: 'Hobon id' },
      { yt: 'NW4HtiT3-Gg', title: 'QRIS: Indonesia’s Homegrown Digital Payment Revolution', channel: 'YAMADA Consulting & Spire' },
      { yt: 'zjH0OwXC-x0', title: 'Simak! Ini Cara Baru Pakai QRIS', channel: 'CNBC Indonesia' },
      { yt: 'pKxorxLHR6o', title: 'QRIS, Inovasi yang Terus Melangkah Jauh!', channel: 'Bank Indonesia Channel' },
      { yt: 'WJuewJ2bwXY', title: 'Tutorial Pakai QRIS nih Sobat!', channel: 'Bank Indonesia Jateng' },
    ],
  },
  {
    id: 'waspada',
    label: 'Waspada QR Palsu',
    desc: 'Modus stiker palsu, bukti transfer fiktif, dan scam.',
    bg: 'bg-[#7C5CFF]',
    videos: [
      { yt: 'Z7sR6onuWBU', title: 'Akibat QRIS Palsu, Pedagang Pujasera Rugi Jutaan Rupiah', channel: 'CNN Indonesia' },
      { yt: 'c2eS2Crr_z4', title: 'Modus Baru Penipuan QRIS Palsu di Bandung, Pedagang Kantin Kampus Jadi Korban | BORGOL', channel: 'KOMPASTV' },
      { yt: 'Z87byKYsFhU', title: 'Pelaku Stiker QRIS Palsu Masjid Disebut Meraup Sampai Rp 13 Juta', channel: 'Kompas.com' },
      { yt: 'gbkToxk0f74', title: 'Pelaku Ngaku Tempel QRIS Palsu di 38 Titik Masjid dan Mal, Berikut Daftar Lokasinya', channel: 'KOMPASTV' },
      { yt: 'M_u5KDPhMLA', title: 'Modus Bukti Transfer Palsu Makin Marak! Seller Wajib Cek Mutasi Sebelum Kirim Barang!!', channel: 'Lim Erwin Hartono' },
      { yt: 'pUrO0vaWg2M', title: 'Bukti Transfer palsu | Awas Boncos.!', channel: 'Polda NTB' },
      { yt: 'Ibs7sMO39I0', title: 'Hati-Hati Bukti Transfer Palsu!', channel: 'Bank Mandiri' },
      { yt: '2qUZPyMhgbc', title: 'OJK Minta Masyarakat Waspada Modus Penipuan Baru | IDX CHANNEL', channel: 'IDX CHANNEL' },
      { yt: '3-sW37JJ4XQ', title: 'OJK Luncurkan Kampanye Nasional Berantas SCAM - [ Prioritas Indonesia ]', channel: 'METRO TV' },
      { yt: 'xDzcdMNp92w', title: 'Waspada Modus Penipuan Pemberian dan Penyaluran Hadiah Mengatasnamakan OJK', channel: 'Otoritas Jasa Keuangan' },
    ],
  },
  {
    id: 'cbp',
    label: 'Kuis CBP Rupiah',
    desc: '3D, 5 Jangan, tukar uang rusak, dan makna CBP.',
    bg: 'bg-[#E5484D]',
    videos: [
      { yt: 'GzLLbWADnm8', title: 'Cinta-Bangga-Paham Rupiah: Dimulai dari Kita', channel: 'Bank Indonesia Channel' },
      { yt: 'E5dMoXCWzlI', title: '[BI Netifest 2022] Juara 1 Kategori Video 1 Menit: Kata Siapa CINTA, BANGGA, PAHAM Rupiah Itu Sulit?', channel: 'Bank Indonesia Channel' },
      { yt: 'g1ubYWafc8Q', title: '[BI Netifest 2022] Juara 1 Kategori Animasi : Cinta, Bangga, Paham Rupiah', channel: 'Bank Indonesia Channel' },
      { yt: 'lYqTl-4gTfo', title: 'Cinta Bangga Paham Rupiah: Uang Kita, Identitas Kita!', channel: 'CBP Rupiah BI Jember' },
      { yt: '-3udSGn_IPs', title: 'Yuk, Kenali Ciri Keaslian Uang Rupiah dengan 3D (Dilihat, Diraba, Diterawang)!', channel: 'Bank Indonesia Channel' },
      { yt: 'aApNNtEe52w', title: 'ILM 3D (Dilihat, Diraba, Diterawang)', channel: 'Bank Indonesia Channel' },
      { yt: 'dl-AKXDdY4Q', title: 'Ciri-ciri Keaslian Uang Rupiah Kertas Tahun Emisi 2022', channel: 'Bank Indonesia Channel' },
      { yt: 'PWLow4bx19c', title: 'RAGU UANG ASLI ATAU PALSU? Ini Cara Cek & Alur Lapor ke Bank Indonesia! [MetroPedia]', channel: 'METRO TV' },
      { yt: 'k4v8hETcBkM', title: 'Rawat Rupiah Dengan 5 Jangan', channel: 'Bank Indonesia Channel' },
      { yt: '2ElupYZFdi4', title: 'Cara Tukar Uang Rupiah yang Rusak ke Bank Indonesia', channel: 'KOMPASTV' },
    ],
  },
  {
    id: 'lokal',
    label: 'Bangga Produk Lokal',
    desc: 'Tenun, kopi, sasando, batik, dan UMKM naik kelas.',
    bg: 'bg-[#1A5DAD]',
    videos: [
      { yt: 'kcvq1cZa618', title: 'Bangga Buatan Indonesia Dukung Produk Lokal, Dorong Ekonomi Bangsa', channel: 'linkumkm by BRI' },
      { yt: '6dA1wsmMTQ4', title: 'Bangga Buatan Indonesia', channel: 'Kementerian Pariwisata' },
      { yt: '9QDtv6_BR0E', title: '[FULL] JOURNEY - Tenun Timur Indonesia', channel: 'METRO TV' },
      { yt: 'ir0Rj6jcYRA', title: 'Pembuatan Kain Tenun di Sumba, Nusa Tenggara Timur - NET12', channel: 'MDTV NEWS OFFICIAL' },
      { yt: 'zRcsxUFSzpw', title: 'Kopi Bajawa Flores', channel: 'MPIG Kopi Bajawa Flores' },
      { yt: 'mLNpLh7AzrA', title: 'Pesona Kopi Bajawa & Sawah Jaring Laba-laba', channel: 'CNN Indonesia' },
      { yt: 'N44vPqyYa1Q', title: 'AMI ETHNIC : Alat Musik Sasando', channel: 'Anugerah Musik Indonesia (AMI Awards)' },
      { yt: 'WhVt928VD5o', title: 'BATIK ADALAH KITA (DOCUMENTARY)', channel: 'UNIBA SURAKARTA' },
      { yt: '4A6koPqkqO4', title: 'BANGGA BUATAN INDONESIA HADIR UNTUK NEGERI', channel: 'Sekretariat Kabinet RI' },
      { yt: '4VHf_ll9BgM', title: 'UMKM Naik Kelas: Solusi Komprehensif Hadapi Tantangan Digital', channel: 'CIPS Learning Hub' },
    ],
  },
]

export function videoThumb(id) {
  return thumb(id)
}

export function videoWatch(id) {
  return watch(id)
}
