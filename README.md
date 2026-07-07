# @yassalam/ui-core

Reusable UI shell, admin shell, dan dynamic section engine untuk ekosistem website **Yassalam** (PP Markaz Mulazamah Yasalam & MPZ Yassalam Peduli).

[![Status](https://img.shields.io/badge/status-published-brightgreen)](https://github.com/mmymedia-lab/yassalam-ui-core)
[![License](https://img.shields.io/badge/license-private-lightgrey)](#lisensi)

> **Status publikasi:** Repository ini telah dipublish dan dapat diakses publik di
> **https://github.com/mmymedia-lab/yassalam-ui-core** (branch default: `master`).

---

## Apa Ini?

Paket ini adalah hasil ekstraksi komponen inti dari web YASSALAM agar bisa dipakai ulang di banyak website dalam satu arsitektur yang sama:

- **Shell publik** — `Header`, `Footer`, `PublicLayout` (SEO meta, Google Analytics, Meta Pixel), tombol scroll-to-top, dan sistem toast.
- **Admin shell** — `AdminLayout` dan `AdminLogin` untuk halaman panel admin.
- **Section engine** — merender section homepage secara dinamis dari tabel `layout_sections` di database.
- **Lib** — `createApiClient` (Axios untuk API PHP Yassalam), `UiSettingsProvider` (context pengaturan situs), dan utilitas `cn`.

## Instalasi

Install langsung dari GitHub:

```bash
npm install github:mmymedia-lab/yassalam-ui-core
```

Atau via `package.json`:

```json
{
  "dependencies": {
    "@yassalam/ui-core": "github:mmymedia-lab/yassalam-ui-core"
  }
}
```

### Peer Dependencies

Proyek pemakai harus menyediakan dependensi berikut (tidak di-bundle):

| Paket | Versi |
|---|---|
| `react` / `react-dom` | ^18 |
| `react-router-dom` | ^6 atau ^7 |
| `axios` | ^1 |
| `framer-motion` | ^10 atau ^11 |
| `lucide-react` | >=0.400 |
| `react-helmet` | ^6 |
| `@radix-ui/react-toast` | ^1.2 |
| `class-variance-authority` | ^0.7 |
| `clsx` | ^2 |
| `tailwind-merge` | ^2 |

Styling menggunakan class Tailwind CSS — pastikan Tailwind di proyek pemakai memindai (`content`) folder paket ini.

## Cara Pakai

### 1. Bungkus aplikasi dengan `UiSettingsProvider`

Semua komponen shell membaca pengaturan situs (nama, logo, SEO, sosial media, dsb.) dari context ini. Sumber datanya bebas — biasanya dari endpoint settings API proyek.

```jsx
import { UiSettingsProvider, PublicLayout, Toaster } from '@yassalam/ui-core';

<UiSettingsProvider value={settings}>
  <Routes>
    <Route element={<PublicLayout anchorMap={{ profil: '/#profil' }} />}>
      <Route index element={<HomePage />} />
    </Route>
  </Routes>
  <Toaster />
</UiSettingsProvider>
```

### 2. API client

```js
import { createApiClient } from '@yassalam/ui-core';

const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL, // fallback otomatis ke VITE_API_URL
  onError: (error) => {
    // interceptor kustom per proyek
    return Promise.reject(error);
  },
});
```

### 3. Section engine (homepage dinamis)

Homepage dirender dari baris tabel `layout_sections` (`section_type`, `is_visible`, `order_index`). Tiap proyek memetakan `section_type` ke komponen bisnisnya sendiri:

```jsx
import { SectionRenderer, createSectionRegistry } from '@yassalam/ui-core';

const registry = createSectionRegistry({
  system_hero: HeroCarousel,
  system_programs: ProgramsSection,
  custom_text: GenericSection,
});

<SectionRenderer sections={sections} registry={registry} />
```

Tipe section bawaan (`SECTION_TYPES`): `system_hero`, `system_programs`, `system_kajian`, `system_about`, `system_articles`, `system_contact`, `system_crowdfunding`, `system_afiliasi`, `custom_text`, `custom_video`, `custom_video_slider` — dan boleh ditambah tipe baru per proyek.

### 4. Admin shell

```jsx
import { AdminLayout, AdminLogin } from '@yassalam/ui-core';

<Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
<Route path="/admin" element={<AdminLayout menu={adminMenu} />}>
  {/* halaman-halaman admin */}
</Route>
```

## Ekspor Lengkap

Semua ekspor tersedia dari root paket (`index.js`):

| Kategori | Ekspor |
|---|---|
| Shell publik | `Header`, `Footer`, `PublicLayout`, `ScrollToTop`, `ScrollToTopButton` |
| Toast | `Toaster`, `toast`, `useToast`, `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastProvider`, `ToastTitle`, `ToastViewport` |
| Admin shell | `AdminLayout`, `AdminLogin` |
| Section engine | `SectionRenderer`, `SECTION_TYPES`, `createSectionRegistry` |
| Lib | `createApiClient`, `UiSettingsProvider`, `useUiSettings`, `cn` |

## Struktur Proyek

```
yassalam-ui-core/
├── index.js                  # Barrel export
└── src/
    ├── shell/                # Header, Footer, PublicLayout, scroll, toast
    ├── admin-shell/          # AdminLayout, AdminLogin
    ├── section-engine/       # SectionRenderer, SectionRegistry
    └── lib/                  # apiClient, UiSettingsContext, utils (cn)
```

## Pengembangan

Verifikasi bahwa seluruh modul bisa di-bundle tanpa error:

```bash
npm install
npm run check
```

## Ekosistem Terkait

Paket ini adalah lapisan UI dari arsitektur Yassalam. Backend-nya adalah API PHP dengan tabel `layout_sections` dan endpoint settings yang dikonsumsi lewat `createApiClient`.

## Lisensi

Penggunaan internal ekosistem Yassalam (MMY Media Lab). Hubungi [mmy.media@yassalam.id](mailto:mmy.media@yassalam.id) untuk keperluan lain.
