# Orbit — Lost & Found

Aplikasi web lost & found bergaya Instagram untuk lingkungan kampus. Pengguna
dapat memposting barang hilang atau ditemukan lengkap dengan foto, menelusuri
postingan, memberi like, menyimpan, dan berkomentar. Proyek ini hanya frontend:
data disimulasikan dan disimpan di `localStorage` (lihat `prd.md`; nama kode di
PRD adalah *temuin*, nama tampilan aplikasi adalah *orbit*).

## Dokumen

| Dokumen | Isi |
|---|---|
| [`prd.md`](prd.md) | Spesifikasi produk, fitur, data model, milestone, kriteria penerimaan |
| [`design.md`](design.md) | Sistem desain: warna, tipografi, komponen, layar |
| [`frontend-development-rules.md`](frontend-development-rules.md) | Aturan penulisan kode dan arsitektur |
| [`docs/diagram.md`](docs/diagram.md) | Diagram arsitektur, alur, urutan, dan model data |
| [`CHANGELOG.md`](CHANGELOG.md) | Riwayat perubahan |

## Identifikasi modul

Arsitektur berbasis fitur (`src/features/<fitur>`), tiap fitur berisi halaman,
`components/`, `hooks/`, dan bila perlu `services/`.

| Modul | Lokasi | Tanggung jawab |
|---|---|---|
| Aplikasi dan rute | `src/App.jsx`, `src/main.jsx` | Konfigurasi router, rute publik dan terproteksi |
| Data layer | `src/lib/storage.js` | Satu-satunya akses `localStorage`: sesi pengguna, postingan, komentar, like, simpan |
| Auth | `src/features/auth` | Halaman login, validasi form (`useLoginForms`), `ProtectedRoute` |
| Beranda (feed) | `src/features/feed` | Daftar postingan, filter status dan kategori, like dan simpan (`useFeed`) |
| Cari (explore) | `src/features/explore` | Pencarian, segmented control, grid hasil (`useExplore`) |
| Detail postingan | `src/features/post-detail` | Carousel foto, info, komentar, edit dan hapus (`usePostDetail`) |
| Buat postingan | `src/features/posts` | Form posting, pemilih foto dan status, penyimpanan (`useCreatePost`, `postStorage`) |
| Profil | `src/features/profile` | Header profil, tab postingan dan disimpan, edit profil (`useProfile`) |
| Komponen bersama | `src/components` | `Sidebar` |

## Menjalankan

```bash
npm install
npm run dev       # pengembangan
npm run lint      # ESLint
npm run build     # build produksi
```

Login berupa simulasi: username (min. 3 karakter) dan kata sandi (min. 6
karakter) apa pun diterima. `rina.ay` dan `bima_k` memakai profil mock
(`MOCK_USERS` di `src/lib/storage.js`); username lain dibuatkan profil baru.

## Konvensi kode

- ESLint (`eslint.config.js`) dan Prettier (`.prettierrc`).
- Header file dan TSDoc/JSDoc berbahasa Indonesia, komentar `// *` untuk
  penjelasan, `// !` untuk peringatan.
- Pesan commit mengikuti Conventional Commits.
- Galat dari `localStorage` dan operasi asinkron ditangani dengan `try/catch`.

## Dokumentasi API

Dokumentasi dihasilkan dari JSDoc/TSDoc dengan [TypeDoc](https://typedoc.org):

```bash
npm run docs      # hasil di docs/api (buka docs/api/index.html)
```
