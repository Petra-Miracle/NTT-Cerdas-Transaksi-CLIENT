// Sumber kebenaran: Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md §3.3
// Jangan ubah teks soal/opsi/penjelasan tanpa konfirmasi pemilik proyek.

export const KUIS_LIST = [
  {
    soal: 'Apa kepanjangan CBP dalam kampanye Bank Indonesia tentang rupiah?',
    opsi: ['Cinta Bangga Paham', 'Cerdas Bijak Paham', 'Cinta Bangsa Peduli', 'Cermat Bangga Percaya'],
    benar: 0,
    penjelasan:
      'CBP adalah singkatan dari Cinta, Bangga, dan Paham Rupiah — kampanye Bank Indonesia untuk mengajak masyarakat merawat, memakai, dan memahami rupiah.',
  },
  {
    soal: 'Metode apa yang dianjurkan BI untuk mengecek keaslian uang kertas rupiah?',
    opsi: ['Lipat, Gosok, Bandingkan', 'Dilihat, Diraba, Diterawang (3D)', 'Scan, Foto, Simpan', 'Timbang, Ukur, Catat'],
    benar: 1,
    penjelasan:
      'Bank Indonesia menganjurkan metode 3D — Dilihat, Diraba, Diterawang — sebagai cara cepat mengecek keaslian uang kertas rupiah.',
  },
  {
    soal: 'Saat uang kertas "diraba", bagian mana yang terasa kasar (hasil cetak timbul)?',
    opsi: [
      'Seluruh permukaan uang',
      'Hanya bagian pojok uang',
      'Angka nominal dan tanda tangan pejabat berwenang',
      'Bagian belakang uang saja',
    ],
    benar: 2,
    penjelasan:
      'Uang kertas asli dicetak dengan teknik cetak timbul (intaglio), sehingga angka nominal dan tanda tangan pejabat berwenang terasa kasar saat diraba.',
  },
  {
    soal: 'Saat uang diterawang ke arah cahaya, apa yang seharusnya terlihat pada uang asli?',
    opsi: [
      'Tulisan "ASLI" tersembunyi',
      'Gambar saling isi (rectoverso) yang membentuk logo BI utuh',
      'Tidak ada perubahan apa pun',
      'Warna uang berubah jadi transparan penuh',
    ],
    benar: 1,
    penjelasan:
      'Saat diterawang ke arah cahaya, uang asli menampilkan gambar saling isi (rectoverso) yang membentuk logo BI secara utuh — ciri keaslian yang sulit dipalsukan.',
  },
  {
    soal: 'Apa fungsi benang pengaman (security thread) pada uang kertas rupiah?',
    opsi: ['Hiasan saja', 'Berubah warna saat uang dimiringkan, tanda keaslian', 'Menandai tahun cetak', 'Menunjukkan nominal uang'],
    benar: 1,
    penjelasan:
      'Benang pengaman pada uang kertas rupiah akan berubah warna saat uang dimiringkan ke sumber cahaya — ciri keaslian yang bisa dicek tanpa alat khusus.',
  },
  {
    soal: 'Berdasarkan prinsip "5 Jangan" merawat uang rupiah, tindakan mana yang sebaiknya dihindari?',
    opsi: ['Menyimpan uang di dompet', 'Melipat, mencoret, atau menstaples uang', 'Membelanjakan uang', 'Menukar uang di bank'],
    benar: 1,
    penjelasan:
      'Kampanye CBP mengingatkan untuk tidak melipat, mencoret, menstaples, meremas, atau membasahi uang rupiah agar tetap layak edar lebih lama.',
  },
  {
    soal: 'Bagaimana cara terbaik menyimpan uang kertas agar tetap layak edar lebih lama?',
    opsi: [
      'Di tempat kering, rapi, dan tidak dilipat',
      'Digulung dan diikat karet',
      'Dilipat kecil agar muat di dompet',
      'Di tempat lembap agar tidak mudah sobek',
    ],
    benar: 0,
    penjelasan:
      'Menyimpan uang kertas di tempat kering dan rapi (tidak dilipat/diremas) menjaga kondisinya tetap layak edar lebih lama.',
  },
  {
    soal: 'Jika uang kertas robek sebagian (bukan hilang besar bagiannya), apa yang bisa dilakukan pemiliknya?',
    opsi: [
      'Uang otomatis hangus, tidak bisa dipakai',
      'Dibuang karena sudah tidak sah',
      'Bisa ditukar resmi di Bank Indonesia/bank umum sesuai aturan uang rusak',
      'Ditempel selotip lalu dipakai belanja seperti biasa',
    ],
    benar: 2,
    penjelasan:
      'Uang rupiah yang rusak sebagian (bukan hilang sebagian besar fisiknya) masih bisa ditukar resmi sesuai aturan penukaran uang rusak/lusuh di Bank Indonesia atau bank umum.',
  },
  {
    soal: 'Apa makna "Bangga" dalam CBP Rupiah?',
    opsi: [
      'Bangga menyimpan uang asing',
      'Bangga menggunakan rupiah dalam setiap transaksi di dalam negeri sebagai simbol kedaulatan',
      'Bangga memamerkan uang',
      'Bangga tidak pernah membelanjakan uang',
    ],
    benar: 1,
    penjelasan:
      '"Bangga" berarti bangga menggunakan rupiah dalam setiap transaksi di dalam negeri, termasuk transaksi digital seperti QRIS, sebagai wujud kedaulatan mata uang.',
  },
  {
    soal: 'Apa makna "Paham" dalam CBP Rupiah?',
    opsi: [
      'Paham sejarah bank saja',
      'Paham cara mencetak uang',
      'Memahami ciri-ciri keaslian uang rupiah agar terhindar dari uang palsu',
      'Paham nilai tukar rupiah ke mata uang asing',
    ],
    benar: 2,
    penjelasan: '"Paham" berarti memahami ciri-ciri keaslian rupiah supaya masyarakat bisa mengenali dan terhindar dari uang palsu.',
  },
]

export function getKuisMessage(percent) {
  if (percent >= 80) return 'Keren! Kamu sudah sangat paham ciri keaslian dan cara merawat uang rupiah.'
  if (percent >= 50) return 'Lumayan! Beberapa hal masih perlu diingat lagi — coba ulangi kuisnya.'
  return 'Yuk pelajari lagi ciri keaslian dan cara merawat uang rupiah supaya makin paham.'
}
