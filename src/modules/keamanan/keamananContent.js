// Sumber kebenaran: Noted/Rebuild-Systems/HANDOFF-REBUILD-FULLSTACK.md §3.2
// Jangan ubah teks skenario/opsi/feedback tanpa konfirmasi pemilik proyek.

export const SKENARIO_LIST = [
  {
    id: 1,
    cerita:
      "Seorang pembeli baru saja memindai QR code statis yang ditempel di mejamu. Sebelum transfer, dia bilang: 'Eh, kok pas di-scan nama tokonya beda ya? Bukan nama tokomu.'",
    opsi: [
      {
        label: 'Suruh dia lanjut transfer saja, mungkin cuma salah lihat.',
        benar: false,
        feedback:
          'Jangan diabaikan. Kalau nama yang muncul saat QR dipindai memang beda dari nama tokomu, itu tanda kuat QR aslimu sudah ditempeli stiker QR milik orang lain — uang pembeli bisa masuk ke rekening orang itu, bukan ke rekeningmu.',
      },
      {
        label:
          'Cek sendiri nama yang muncul saat QR dipindai. Kalau memang beda dari nama tokomu, langsung lepas stiker QR itu dan laporkan.',
        benar: true,
        feedback:
          'Nama toko yang muncul saat QR dipindai adalah cara paling gampang mengecek keaslian QR statis. Kalau namanya beda, itu tanda ada stiker QR palsu ditempel di atas QR aslimu — segera lepas dan laporkan supaya pembeli lain tidak ikut jadi korban.',
      },
      {
        label: 'Minta pembeli bayar tunai saja supaya lebih aman kali ini.',
        benar: false,
        feedback:
          'Ini cuma menghindari masalah untuk transaksi kali ini — QR palsu yang masih menempel di mejamu tetap bisa menipu pembeli berikutnya kalau tidak segera dicek dan dilepas.',
      },
      {
        label: 'Diamkan saja, toh transaksi kali ini sudah selesai duluan.',
        benar: false,
        feedback:
          'Berbahaya buat pembeli-pembeli setelah ini. Kalau QR di mejamu sudah ditempeli stiker QR orang lain, setiap pembeli yang scan berikutnya juga akan salah transfer.',
      },
    ],
  },
  {
    id: 2,
    cerita:
      "Pembeli menunjukkan layar HP-nya: ada tulisan 'Transfer Berhasil' di aplikasi chat atau screenshot bukti bayar. Tapi di HP-mu sendiri, belum ada satu pun notifikasi pembayaran masuk.",
    opsi: [
      {
        label: 'Percaya saja karena sudah lihat buktinya di layar HP pembeli, langsung kasih barangnya.',
        benar: false,
        feedback:
          "Screenshot atau tulisan 'Transfer Berhasil' di HP pembeli gampang direkayasa — itu bukan bukti resmi bahwa uang sudah masuk ke rekening/saldomu.",
      },
      {
        label: 'Tunggu sampai notifikasi transaksi resmi benar-benar muncul di HP atau rekeningmu sendiri, baru serahkan barangnya.',
        benar: true,
        feedback:
          'Satu-satunya bukti yang bisa dipercaya adalah notifikasi resmi di perangkat/rekeningmu sendiri, bukan apa pun yang ditunjukkan di layar HP pembeli.',
      },
      {
        label: 'Minta pembeli transfer ulang supaya lebih yakin.',
        benar: false,
        feedback:
          "Belum tentu menyelesaikan masalah — kalau memang niatnya menipu, transfer ulang pun bisa 'dibuktikan' dengan cara yang sama. Yang perlu dicek tetap notifikasi di sisi kamu.",
      },
      {
        label: 'Langsung tolak transaksinya karena pasti penipuan.',
        benar: false,
        feedback:
          'Belum tentu penipuan — notifikasi kadang memang telat masuk karena jaringan. Daripada buru-buru menolak, tunggu dulu sebentar sampai notifikasi resminya muncul.',
      },
    ],
  },
  {
    id: 3,
    cerita:
      "Pembeli bilang, 'Sudah aku transfer Rp150.000 ya, lewat QRIS.' Nominalnya diisi sendiri oleh pembeli (QRIS dinamis), dan kamu belum sempat melihat langsung angka yang tertera di layar HP/EDC-mu saat dia memindai.",
    opsi: [
      {
        label: 'Percaya saja ucapan pembeli soal nominalnya, tanpa mengecek layar sendiri.',
        benar: false,
        feedback:
          'Nominal QRIS dinamis diisi manual oleh pembeli, jadi rawan salah ketik atau sengaja diisi lebih kecil dari harga sebenarnya. Ucapan lisan saja tidak cukup jadi bukti.',
      },
      {
        label:
          'Selalu cek nominal yang tertera di layar HP/EDC milikmu sendiri sebelum menyerahkan barang — jangan hanya percaya sebutan lisan pembeli.',
        benar: true,
        feedback:
          'Nominal yang tertera di perangkatmu sendiri adalah satu-satunya angka yang bisa dipercaya, karena itu yang benar-benar diproses sistem — bukan yang diucapkan pembeli.',
      },
      {
        label: 'Minta pembeli menunjukkan nominal yang tertera di layar HP-nya sebagai bukti.',
        benar: false,
        feedback:
          'Layar HP pembeli juga bisa saja salah ketik atau direkayasa. Verifikasi paling aman tetap di layar milikmu sendiri, bukan di perangkat pembeli.',
      },
      {
        label: 'Anggap wajar saja, karena QRIS dinamis biasanya otomatis benar nominalnya.',
        benar: false,
        feedback:
          'Justru sebaliknya — QRIS dinamis itu nominalnya diisi manual tiap transaksi. Ini bagian yang paling rawan human error, jadi justru paling perlu dicek.',
      },
    ],
  },
]

export const SKENARIO_PESAN_SEMPURNA =
  'Mantap, semua jawabanmu tepat di percobaan pertama! Kamu sudah paham tiga situasi keamanan QRIS yang paling sering dialami pedagang.'

export const SKENARIO_PESAN_BELUM_SEMPURNA =
  'Terus diingat ya: selalu cek nama toko saat QR dipindai, tunggu notifikasi resmi di perangkatmu sendiri, dan selalu lihat nominal di layarmu sebelum menyerahkan barang.'
