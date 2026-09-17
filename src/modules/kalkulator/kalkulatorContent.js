// Sumber kebenaran: Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md §3.1
// Jangan ubah teks/nilai di sini tanpa konfirmasi pemilik proyek.

// Catatan: handoff §3.1 hanya memberi judul singkat tiap pertanyaan
// ("Pertanyaan 1 — Omzet harian dari transaksi tunai", dst), bukan kalimat
// tanya lengkap. Kalimat di bawah ini disusun mengikuti judul tersebut dan
// perlu dikonfirmasi pemilik proyek — kecuali P2 yang memang kalimat
// literal dari handoff.
export const QUESTIONS = {
  omzet: 'Berapa kira-kira omzet harian dari transaksi tunai di usahamu?',
  pengalaman: 'Pernahkah kamu mengalami hal berikut saat berjualan? (boleh pilih lebih dari satu)',
  waktu: 'Berapa lama waktu yang kamu habiskan tiap hari untuk menghitung & menyetor uang tunai?',
  rekening: 'Apakah kamu sudah punya rekening bank atas nama sendiri?',
}

export const OMZET_OPTIONS = [
  { value: 75000, label: 'Kurang dari Rp100.000' },
  { value: 300000, label: 'Rp100.000 – Rp500.000' },
  { value: 750000, label: 'Rp500.000 – Rp1.000.000' },
  { value: 1250000, label: 'Lebih dari Rp1.000.000' },
]

export const PENGALAMAN_OPTIONS = [
  { value: 'robek', label: 'Uang robek/sobek' },
  { value: 'basah', label: 'Uang basah/lusuh berat' },
  { value: 'diragukan', label: 'Uang diragukan keasliannya' },
  { value: 'kabur', label: 'Pelanggan kabur tanpa bayar' },
  { value: 'tidak-pernah', label: 'Belum pernah mengalami hal di atas' },
]

export const TIDAK_PERNAH_VALUE = 'tidak-pernah'

export const WAKTU_OPTIONS = [
  { value: 5, label: 'Kurang dari 10 menit' },
  { value: 15, label: '10 – 20 menit' },
  { value: 30, label: '20 – 40 menit' },
  { value: 50, label: 'Lebih dari 40 menit' },
]

export const REKENING_OPTIONS = [
  { value: 'ya', label: 'Sudah punya' },
  { value: 'belum', label: 'Belum punya' },
]

export const PENGALAMAN_INFO = {
  robek: {
    label: 'Uang robek/sobek',
    kerugian:
      'Uang yang robek cukup parah kadang ditolak pembeli lain atau bikin kamu ragu sendiri saat mau dipakai belanja lagi.',
    tips:
      'Uang rupiah yang robek sebagian (bukan hilang sebagian besar) sebenarnya masih bisa ditukar resmi di Bank Indonesia atau bank umum sesuai aturan penukaran uang rusak/lusuh — jangan buru-buru dianggap hangus.',
    manfaat:
      'Uang di saldo QRIS tidak punya bentuk fisik, jadi tidak akan pernah robek atau kehilangan nilai karena kondisi fisiknya.',
  },
  basah: {
    label: 'Uang basah/lusuh berat',
    kerugian:
      'Uang basah atau lusuh berat sering bikin pembeli lain ragu menerimanya, dan kamu harus meyakinkan mereka satu per satu.',
    tips:
      'Ingat prinsip merawat uang rupiah dari kampanye CBP: jangan dilipat, dicoret, distaples, diremas, atau dibasahi. Simpan uang kertas di tempat kering dan rapi supaya tetap layak edar lebih lama.',
    manfaat:
      'QRIS menghilangkan urusan fisik uang sepenuhnya — tidak ada lagi uang basah atau lusuh yang bikin transaksi jadi rumit.',
  },
  diragukan: {
    label: 'Uang diragukan keasliannya',
    kerugian:
      'Kalau ternyata uang itu palsu, kerugiannya langsung senilai nominal transaksi — dan biasanya baru ketahuan belakangan, saat sudah terlambat.',
    tips:
      'Biasakan cek keaslian uang rupiah dengan metode 3D: Dilihat (benang pengaman & gambar berubah warna saat dimiringkan), Diraba (tekstur kasar di angka nominal & tanda tangan), Diterawang (gambar tersembunyi/rectoverso saat diterawang ke cahaya).',
    manfaat:
      'Transaksi QRIS diverifikasi otomatis oleh sistem perbankan — risiko menerima uang palsu jadi nol.',
  },
  kabur: {
    label: 'Pelanggan kabur tanpa bayar',
    kerugian: 'Ini kerugian penuh — barang sudah kamu serahkan, tapi pembayarannya tidak pernah sampai.',
    tips: null,
    manfaat:
      "Ini salah satu alasan terkuat pakai QRIS: begitu kode dipindai dan transaksi berhasil, uang langsung masuk ke saldomu lebih dulu — jadi 'kabur setelah bayar' bukan lagi opsi.",
  },
}

export const MANFAAT_UMUM = [
  'Setiap transaksi otomatis tercatat rapi, jadi kamu punya riwayat penjualan tanpa perlu mencatat manual.',
  'Tidak perlu menyiapkan uang kembalian recehan lagi — nominal yang dibayar selalu pas.',
]

// Catatan: teks ini bukan kutipan literal dari handoff (handoff hanya
// mendeskripsikan maksudnya di §3.1 poin 3), disusun mengikuti instruksi
// "pesan generik bahwa user jarang mengalami masalah tapi waktu tetap
// terbuang" — komposisi kalimat ini perlu dikonfirmasi pemilik proyek.
export const PENGALAMAN_KOSONG_MESSAGE =
  'Kamu jarang mengalami masalah uang tunai di atas — tapi waktu untuk menghitung dan menyetor uang tunai tetap terbuang setiap hari.'

export const REKOMENDASI = {
  belum:
    'Langkah selanjutnya: karena kamu belum punya rekening bank atas nama sendiri, buka rekening tabungan dulu — baru setelah itu kamu bisa mendaftar QRIS lewat bank atau penyedia layanan pembayaran.',
  ya: 'Langkah selanjutnya: karena kamu sudah punya rekening bank sendiri, kamu bisa langsung mendaftar QRIS lewat bank atau penyedia layanan pembayaran pilihanmu.',
}

export const DISCLAIMER =
  'Angka dan narasi di atas adalah perkiraan edukatif berdasarkan jawabanmu, bukan hitungan akuntansi yang pasti.'

export const BI_QRIS_URL = 'https://www.bi.go.id/QRIS'

export const UPAH_PER_JAM = 15000
