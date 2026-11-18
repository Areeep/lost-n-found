# temuin. — Design Guide

Design reference for the **temuin.** lost & found web app (Instagram-style). Use this as the single source of truth for colors, type, spacing, icons and components so all screens look like one product.

- **Styling:** Tailwind CSS. Every color is a default Tailwind shade, so no custom color config is needed.
- **Icons:** [Lucide](https://lucide.dev).

> "temuin." is a working name. Change it in the logo and here if the team picks another.

---

## 1. Design principles

1. **Status first.** Within one second a user must know if a post is *lost* (HILANG) or *found* (DITEMUKAN). The status badge always sits on the photo, top-left.
2. **Photo-led, like Instagram.** Big photo, short caption, quick actions. Details live on the Detail page.
3. **One clear action per post.** Lost post → "Aku menemukannya". Found post → "Ini punyaku".
4. **Calm UI, loud status.** Grays and near-black everywhere; color is reserved for status.
5. **Mobile first, then desktop.** Build at 390 px, then expand to 1440 px.

---

## 2. Color (Tailwind palette)

### Core

| Role | Tailwind color | Hex | Example classes |
|---|---|---|---|
| Ink: main text, primary button, active nav & chip | `gray-900` | `#111827` | `text-gray-900` `bg-gray-900` |
| Muted: location, time, helper text | `gray-600` | `#4B5563` | `text-gray-600` |
| Disabled / dashed upload border | `gray-400` | `#9CA3AF` | `border-gray-400` |
| Field border: inputs, outline buttons, chips | `gray-300` | `#D1D5DB` | `border-gray-300` |
| Line: dividers, card borders | `gray-200` | `#E5E7EB` | `border-gray-200` `divide-gray-200` |
| Canvas: feed background, search field, segmented track | `gray-100` | `#F3F4F6` | `bg-gray-100` |
| Surface: cards, header, nav | `white` | `#FFFFFF` | `bg-white` |

### Status

| Role | Tailwind color | Hex | Example classes |
|---|---|---|---|
| **Lost** badge, liked heart, logo dot | `orange-700` | `#C2410C` | `bg-orange-700 text-white` `text-orange-700` |
| Lost selected background | `orange-50` | `#FFF7ED` | `bg-orange-50 border-orange-700` |
| Lost photo placeholder | `orange-100` | `#FFEDD5` | `bg-orange-100` |
| Logo dot on dark background | `orange-400` | `#FB923C` | `text-orange-400` |
| **Found** badge, links, "Bagikan" | `blue-700` | `#1D4ED8` | `bg-blue-700 text-white` `text-blue-700` |
| Found selected background | `blue-50` | `#EFF6FF` | `bg-blue-50 border-blue-700` |
| Found photo placeholder | `blue-100` | `#DBEAFE` | `bg-blue-100` |
| Link hover | `blue-900` | `#1E3A8A` | `hover:text-blue-900` |

### Placeholders & avatars

| Use | Tailwind colors |
|---|---|
| Photo placeholder tints | `orange-100`, `blue-100`, `gray-200`, `violet-100`, `emerald-100`, `amber-100` |
| Avatar backgrounds (white initials) | `violet-600`, `teal-700`, `amber-700` |
| "Sudah kembali" overlay | `bg-gray-900/60` with white text |
| Dark card on login panel | `gray-700` |

**Rules**
- Orange = lost, blue = found. Never swap them and never use them for decoration.
- White text on `orange-700` and `blue-700` passes WCAG AA (≥ 4.5:1).
- Don't use `gray-500` or lighter for text. It drops below 4.5:1 on `gray-100`. Use `gray-600`.

---

## 3. Typography

| Role | Font | Weight | Size (mobile / desktop) | Tailwind |
|---|---|---|---|---|
| Logo | Bricolage Grotesque | 700 / 800 | 26 / 30 px | `font-heading font-extrabold text-[30px] tracking-tight` |
| Page title (H1) | Bricolage Grotesque | 800 | 22–26 / 32–36 px | `font-heading font-extrabold text-2xl md:text-4xl` |
| Section title (H2) | Bricolage Grotesque | 700 | 18 px | `font-heading font-bold text-lg` |
| Status badge | Bricolage Grotesque | 700, uppercase | 12 px | `font-heading font-bold text-xs uppercase tracking-wider` |
| Body | Plus Jakarta Sans | 400 | 14–15 px | `text-sm` |
| Label / username | Plus Jakarta Sans | 700 | 14 px | `text-sm font-bold` |
| Button | Plus Jakarta Sans | 700 | 14–15 px | `text-sm font-bold` |
| Caption / meta | Plus Jakarta Sans | 400 | 12–13 px | `text-xs text-gray-600` |
| Mobile nav label | Plus Jakarta Sans | 400 (700 active) | 11 px | `text-[11px]` |

Google Fonts import (put in `index.html` `<head>`):

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Line height: `leading-normal` / `leading-relaxed` for body, `leading-tight` for big headings.

---

## 4. Spacing, radius, size

- **Spacing:** use the Tailwind scale (`1`=4px, `2`=8px, `3`=12px, `4`=16px, `5`=20px, `6`=24px, `8`=32px, `12`=48px). Page side padding: `px-4` mobile, `px-6` desktop.
- **Radius:** badge `rounded-md` · inputs & buttons `rounded-lg` · big buttons & tiles `rounded-xl` · cards `rounded-2xl` · chips & comment field `rounded-full` · avatars `rounded-full`.
- **Touch targets:** every tappable thing is at least **44 × 44 px** (`size-11`).
- **Heights:** input `h-12` · primary button `h-12` · chip `h-9` · icon button `size-11`.

---

## 5. Layout & breakpoints

| Breakpoint | Tailwind | Layout |
|---|---|---|
| Mobile | default (< 768 px) | Top header + content + **bottom nav** (Beranda, Cari, Posting, Profil) |
| Tablet / desktop | `md:` (≥ 768 px) | **Left sidebar** (`w-60`) + content |
| Wide desktop | `lg:` (≥ 1024 px) | Feed adds a right column (`w-72`) |

Content max widths on desktop: feed column `max-w-[600px]`, explore `max-w-5xl`, profile `max-w-[935px]`, create form `max-w-5xl`, detail `max-w-6xl`.

---

## 6. Components

**Status badge**: on the photo, top-left (`absolute top-3 left-3`).
`rounded-md px-2.5 py-1 font-heading text-xs font-bold uppercase tracking-wider text-white bg-orange-700` (lost) or `bg-blue-700` (found).

**Post card**: header (avatar, username, "lokasi · waktu", `Ellipsis` button) → photo (`h-[330px] md:h-[420px]`) → action row (`Heart`, `MessageCircle`, `Send` … `Bookmark`) → likes → caption ("**Nama barang** — caption") → "Lihat N komentar" → primary CTA. Card: `bg-white border border-gray-200 md:rounded-2xl overflow-hidden`.

**Filter chip**: `h-9 px-4 rounded-full border border-gray-300 bg-white text-sm font-semibold`. Active: `bg-gray-900 border-gray-900 text-white`.

**Segmented control** (Semua / Hilang / Ditemukan): track `bg-gray-100 rounded-xl p-1 grid grid-cols-3 gap-1`; active segment `bg-white text-gray-900`, inactive `text-gray-600`.

**Buttons**
- Primary: `h-12 rounded-xl bg-gray-900 text-white font-bold`
- Secondary: `h-12 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold`
- Text: `text-blue-700 font-bold hover:text-blue-900`

**Input**: `h-12 px-3.5 rounded-lg border border-gray-300 bg-white text-[15px]`, always with a visible `<label class="text-sm font-bold">`.

**Status picker** (create form): two big toggle buttons. Selected lost: `border-2 border-orange-700 bg-orange-50 text-orange-700`. Selected found: `border-2 border-blue-700 bg-blue-50 text-blue-700`.

**Profile grid tile**: square (`aspect-square`), item name label bottom-left. Returned items get `bg-gray-900/60` overlay with a `Check` icon and "SUDAH KEMBALI".

**Navigation**
- Mobile bottom nav: 4 items, `grid grid-cols-4 border-t border-gray-200 bg-white`.
- Desktop sidebar: Beranda, Cari, Notifikasi, Pesan, Profil + black "Posting barang" button, `Keluar` at the bottom.
- Active item: bold label + filled icon (`fill="currentColor"`) + `bg-gray-100` on desktop.

---

## 7. Icons (Lucide)

Use **Lucide** for every icon. Defaults: size 24 (20 for small buttons), `strokeWidth={2}`, color inherited (`currentColor`). Don't use emoji in the UI. Icon-only buttons need an `aria-label`.

| Where | Lucide icon | React component |
|---|---|---|
| Nav: Beranda | `house` | `House` |
| Nav: Cari / search field | `search` | `Search` |
| Nav: Posting | `square-plus` | `SquarePlus` |
| Nav: Profil | `user` | `User` |
| Notifikasi | `bell` | `Bell` |
| Pesan (sidebar), chat button | `message-square` | `MessageSquare` |
| Bagikan (share) | `send` | `Send` |
| Suka (like) | `heart` | `Heart` |
| Komentar | `message-circle` | `MessageCircle` |
| Simpan (save) | `bookmark` | `Bookmark` |
| Post options | `ellipsis` | `Ellipsis` |
| Back / carousel | `chevron-left`, `chevron-right` | `ChevronLeft`, `ChevronRight` |
| Photo placeholder | `image` | `Image` |
| Sudah kembali | `check` | `Check` |
| Posting barang button, add photo | `plus` | `Plus` |
| Upload area | `upload` | `Upload` |
| Keluar (logout) | `log-out` | `LogOut` |

**React**

```bash
npm install lucide-react
```

```jsx
import { Heart } from "lucide-react";

<button aria-label="Suka" className="size-11 grid place-items-center">
  <Heart size={24} className={liked ? "text-orange-700" : "text-gray-900"} fill={liked ? "currentColor" : "none"} />
</button>
```

**Plain HTML**

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="heart"></i>
<script>lucide.createIcons();</script>
```

---

## 8. Interaction states

- **Hover (desktop):** links `hover:text-blue-700`; primary buttons `hover:bg-gray-800`; secondary `hover:bg-gray-50`.
- **Focus:** `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`. Never remove outlines.
- **Liked:** `Heart` filled, `text-orange-700`, count +1.
- **Empty states:** short sentence + one action (e.g. "Belum ada postingan. **Posting barang**").
- **Loading:** `animate-pulse bg-gray-200` skeleton blocks, same size as the post card / tile.

---

## 9. Accessibility checklist

- Real `<button>`, `<a>`, `<input>` + `<label>`. No clickable `<div>`.
- Text contrast ≥ 4.5:1 (`gray-600` is the lightest text color allowed).
- Status is shown with **text** (HILANG/DITEMUKAN), not color alone.
- Images get `alt` like "Foto dompet kulit coklat".
- App copy is in Indonesian: set `<html lang="id">`.

---

## 10. Screens

| # | Screen | Mobile | Desktop |
|---|---|---|---|
| 1 | Beranda (Feed) | ✓ | ✓ |
| 2 | Cari / Explore | ✓ | ✓ |
| 3 | Detail Postingan | ✓ | ✓ |
| 4 | Buat Postingan | ✓ | ✓ |
| 5 | Profil | ✓ | ✓ |
| 6 | Masuk (Login) | ✓ | ✓ |

Not designed yet: Daftar (register), Notifikasi, Pesan/Chat, Edit profil.

---

## 11. Tailwind setup

Colors come from Tailwind's default palette, so you only add the fonts (and optional semantic aliases).

**Tailwind v4** (`src/index.css`):

```css
@import "tailwindcss";

@theme {
  --font-heading: "Bricolage Grotesque", sans-serif;
  --font-sans: "Plus Jakarta Sans", sans-serif;

  /* optional semantic aliases → bg-lost, text-found, etc. */
  --color-lost: var(--color-orange-700);
  --color-lost-soft: var(--color-orange-50);
  --color-found: var(--color-blue-700);
  --color-found-soft: var(--color-blue-50);
  --color-ink: var(--color-gray-900);
  --color-muted: var(--color-gray-600);
}

body {
  @apply bg-gray-100 text-gray-900 font-sans;
}
```

**Tailwind v3** (`tailwind.config.js`):

```js
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bricolage Grotesque"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        lost: { DEFAULT: colors.orange[700], soft: colors.orange[50] },
        found: { DEFAULT: colors.blue[700], soft: colors.blue[50] },
        ink: colors.gray[900],
        muted: colors.gray[600],
      },
    },
  },
};
```

Pick one naming style as a team: either raw Tailwind classes (`bg-orange-700`) or the aliases (`bg-lost`). Don't mix them.
