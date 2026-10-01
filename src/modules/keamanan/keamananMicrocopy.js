// Microcopy untuk mode belajar cepat. Detail edukasi resmi tetap tersedia
// melalui tombol "Kenapa?" setelah pengguna menjawab.
export const SKENARIO_MICROCOPY = {
  1: {
    cerita: 'Nama toko yang muncul berbeda dari nama tokomu. Apa yang kamu lakukan?',
    konteks: 'Pembeli sudah memindai QR di meja tokomu.',
    opsi: [
      {
        label: 'Lepas QR itu dan laporkan.',
        benar: true,
        feedback: 'QR statis palsu bisa mengalihkan uang ke rekening pelaku.',
        detail:
          'Kalau nama yang muncul saat QR dipindai berbeda dari nama tokomu, QR aslimu mungkin ditempeli stiker QR milik orang lain — uang pembeli bisa masuk ke rekening orang itu.',
      },
      {
        label: 'Lanjutkan saja, mungkin salah lihat.',
        benar: false,
        feedback: 'Jangan abaikan nama yang berbeda pada hasil pemindaian QR.',
        detail:
          'Nama toko yang berbeda adalah tanda kuat QR perlu dicek. Hentikan transaksi, lepas stiker QR yang mencurigakan, lalu laporkan agar pembeli berikutnya aman.',
      },
    ],
  },
  2: {
    cerita: 'Pembeli menunjukkan screenshot “Transfer Berhasil”. Belum ada notifikasi di HP-mu. Apa langkahmu?',
    konteks: 'Barang masih ada di meja kasir.',
    opsi: [
      {
        label: 'Tunggu notifikasi di HP-mu.',
        benar: true,
        feedback: 'Notifikasi di perangkatmu adalah bukti pembayaran yang tepercaya.',
        detail:
          'Screenshot atau tulisan “Transfer Berhasil” di layar pembeli dapat direkayasa. Serahkan barang hanya setelah notifikasi resmi muncul di perangkat atau rekeningmu sendiri.',
      },
      {
        label: 'Berikan barang karena ada screenshot.',
        benar: false,
        feedback: 'Screenshot bukan bukti uang sudah masuk ke rekeningmu.',
        detail:
          'Jangan mengandalkan layar milik pembeli. Tunggu konfirmasi transaksi resmi di perangkat atau rekeningmu sendiri sebelum menyerahkan barang.',
      },
    ],
  },
  3: {
    cerita: 'Pembeli menyebut sudah transfer Rp150.000 lewat QRIS dinamis. Apa yang perlu kamu cek?',
    konteks: 'Nominal diisi sendiri oleh pembeli.',
    opsi: [
      {
        label: 'Cek nominal di layarmu.',
        benar: true,
        feedback: 'Nominal di perangkatmu adalah angka yang benar-benar diproses.',
        detail:
          'Pada QRIS dinamis, nominal diisi manual. Periksa nominal yang tampil di HP atau EDC milikmu sebelum menyerahkan barang; jangan hanya percaya ucapan pembeli.',
      },
      {
        label: 'Percaya nominal yang disebut pembeli.',
        benar: false,
        feedback: 'Nominal QRIS dinamis bisa salah ketik atau sengaja lebih kecil.',
        detail:
          'Nominal QRIS dinamis diisi manual tiap transaksi. Selalu lihat nominal yang tampil di perangkatmu sendiri sebelum menyerahkan barang.',
      },
    ],
  },
}
