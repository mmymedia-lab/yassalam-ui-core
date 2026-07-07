# yassalam-ui-core

## Status Publikasi Repository

- Repository ini **sudah dipublish** dan **dapat diakses publik** di:
  **https://github.com/mmymedia-lab/yassalam-ui-core**
- Remote git: `origin → https://github.com/mmymedia-lab/yassalam-ui-core.git`
- Branch default: `master`
- Visibility: **public** (terverifikasi via GitHub API, 2026-07-07)
- Bisa di-install proyek lain via: `npm install github:mmymedia-lab/yassalam-ui-core`

> Catatan: repo `github.com/mmymedia-lab/yassalam-core-api` adalah repo TERPISAH
> (backend API) dan per 2026-07-07 tidak ditemukan / belum publik di GitHub.
> Folder ini BUKAN repo tersebut — folder ini adalah `yassalam-ui-core`.

## Tentang Proyek

Paket npm `@yassalam/ui-core` — UI shell publik, admin shell, dan dynamic
section engine yang dipakai ulang di seluruh website ekosistem Yassalam.
Hasil ekstraksi dari web YASSALAM.

- Entry point: `index.js` (barrel export semua komponen)
- Sumber: `src/shell/`, `src/admin-shell/`, `src/section-engine/`, `src/lib/`
- ESM only (`"type": "module"`), semua dependensi utama berupa peerDependencies
- Styling: class Tailwind CSS (proyek pemakai wajib memindai folder paket ini)
- Homepage dinamis digerakkan tabel `layout_sections` di database backend;
  proyek pemakai memetakan `section_type` → komponen via `createSectionRegistry()`

## Perintah

- `npm run check` — verifikasi bundling seluruh modul dengan esbuild
  (tidak ada test suite; ini satu-satunya pemeriksaan otomatis)

Dokumentasi lengkap untuk manusia: lihat `README.md`.
