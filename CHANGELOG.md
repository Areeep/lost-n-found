# Changelog

Riwayat perubahan Orbit (Lost & Found). Format mengikuti
[Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/). Tanggal diambil
dari riwayat commit.

## [Unreleased]

### Ditambahkan
- README proyek, `docs/diagram.md`, dan changelog ini.
- `@throws` pada `savePost` di `postStorage.js`.
- Opsi "Hapus postingan" di menu titik tiga untuk pemilik (sebelumnya handler hapus sudah ada tetapi tidak terpasang).

### Diperbaiki
- 3 error ESLint: `handleConfirmDelete` tidak terpakai, impor `Check` tidak terpakai,
  dan `setState` di dalam effect pada `EditPostModal` (form kini diinisialisasi dari `post` saat dipasang).

## [0.1.0] - 2026-10-17

### Ditambahkan
- Edit postingan dari halaman detail, dengan perbaikan panel aksi sticky.
- Halaman beranda (feed) dengan filter dan interaksi like/simpan. (2026-10-16)
- Tema warna primary dan fitur detail postingan lanjutan. (2026-10-14)
- Sesi pengguna, edit profil, dan sinkronisasi postingan baru ke feed. (2026-10-13)
- Halaman Buat Postingan dan alur selesai posting. (2026-10-13)
- `ProtectedRoute` dan guard autentikasi. (2026-10-13)
- Halaman Cari (explore) dengan komponen yang dapat dipakai ulang. (2026-10-12)
- Login username/password dengan persistensi sesi. (2026-10-12)
- Halaman detail postingan, login, dan profil responsif. (2026-10-10)
- Tipografi kustom dan `lucide-react`; spesifikasi produk, sistem desain,
  dan panduan pengembangan. (2026-10-10)

### Diubah
- Penamaan aplikasi dikembalikan menjadi *orbit* setelah sempat diganti. (2026-10-16)

### Dasar proyek
- Inisialisasi React, Vite, dan Tailwind v4; `react-router-dom`. (2026-10-10)
