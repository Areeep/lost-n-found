# PRD — temuin. (Lost & Found Web App)

| | |
|---|---|
| **Product** | temuin. — Instagram-style lost & found web app |
| **Scope** | Frontend only (no backend, data is mocked) |
| **Team** | 6 mentees |
| **Status** | Draft v1 |
| **Related** | `design.md`, design canvas (mobile + desktop) |

---

## 1. Background & problem

When people lose things on campus, the news spreads through random WhatsApp groups and Instagram stories that disappear in 24 hours. People who *find* items don't know where to post them, and owners don't know where to look. There is no single place to search.

## 2. Goal

Build a web app where anyone can **post a lost or found item with a photo** and **browse/search posts** in a familiar Instagram-like feed, so items get back to their owners faster.

### Goals (this project)
- A working, clickable frontend for all core screens on mobile and desktop.
- Realistic behavior using mock data + `localStorage` (posting, liking, saving, filtering actually work in the browser).
- Clean, consistent UI that follows `design.md`.
- Every team member owns and ships one feature end-to-end.

### Non-goals
- No real backend, database, or real authentication.
- No real-time chat or push notifications.
- No image hosting — uploaded photos are previewed locally only.
- No admin/moderation panel.

---

## 3. Target users

| Persona | Need |
|---|---|
| **The Loser** — student who lost something | Post fast with a photo & last-seen location; get contacted by finders |
| **The Finder** — student who found something | Post the item and where it's kept; let the owner claim it |
| **The Browser** — anyone checking if their item was found | Search and filter by category, status and location |

---

## 4. User stories

1. As a user, I can **log in** (simulated) so my posts are linked to my profile.
2. As a user, I can **see a feed** of the newest lost & found posts.
3. As a user, I can **filter** the feed by status (Hilang / Ditemukan) and category.
4. As a user, I can **search** items by name or location.
5. As a user, I can **open a post** to see all details, photos and comments.
6. As a user, I can **create a post** with photos, status, name, category, date, location, description and contact.
7. As a user, I can **like, comment on and save** posts.
8. As a post owner, I can **edit, delete, or mark my post as "Sudah kembali"**.
9. As a user, I can **see my profile** with my posts and saved posts.
10. As a user, I can **contact** the poster (opens WhatsApp link or a mock chat).

---

## 5. Features & requirements

Priority: **P0** = must have for demo · **P1** = should have · **P2** = nice to have

### 5.1 Auth (Masuk / Daftar) — P0
- Login form: email + password, "Lupa kata sandi?" link, "Lihat-lihat tanpa akun".
- Register form: name, username, email, password.
- Simulated: on submit, save the current user to `localStorage` and redirect to Beranda.
- Logout clears the current user.
- Basic validation: required fields, email format, password ≥ 8 characters.

### 5.2 Beranda / Feed — P0
- List of post cards, newest first.
- Each card: avatar, username, location · relative time, photo, status badge, like / comment / share / save, like count, caption, comment count, CTA button.
- CTA text depends on status: Hilang → "Aku menemukannya", Ditemukan → "Ini punyaku".
- Filter chips: Semua, Hilang, Ditemukan + categories.
- Like toggles instantly and persists in `localStorage`.
- Desktop: right column with "Baru saja kembali" list and a "Posting sekarang" callout (P1).

### 5.3 Cari / Explore — P0
- Search input (matches item name, description and location; case-insensitive).
- Segmented control: Semua / Hilang / Ditemukan.
- Category chips.
- Grid of tiles (3 columns mobile, auto-fill desktop) with status badge/dot.
- Empty state when nothing matches.

### 5.4 Detail Postingan — P0
- Photo carousel (1–3 photos), status badge.
- Poster info, title, info list (Kategori, Lokasi, Waktu, Ciri-ciri), description.
- Comments list + add comment (saved to `localStorage`).
- Sticky action bar: Save + main CTA (opens contact).
- If the viewer is the owner: Edit, Hapus, "Tandai sudah kembali" (P1).

### 5.5 Buat Postingan — P0
- Photo picker with preview (max 3, JPG/PNG, max 5 MB) using `URL.createObjectURL` or base64.
- Status picker (Aku kehilangan / Aku menemukan); labels change with status ("Tanggal hilang" vs "Tanggal ditemukan", "Terakhir terlihat di" vs "Ditemukan di").
- Fields: nama barang*, kategori*, tanggal*, lokasi*, ciri-ciri, kontak WhatsApp*.
- Validation with inline error messages.
- On submit: save to `localStorage`, redirect to the new post's detail page.
- Edit mode reuses the same form (P1).

### 5.6 Profil — P0
- Avatar, username, full name, bio.
- Stats: postingan, sudah kembali, disimpan.
- Tabs: Postingan / Disimpan, each a 3-column grid.
- Returned items show the "SUDAH KEMBALI" overlay.
- Edit profil (P1): name, bio, avatar.

### 5.7 Notifikasi & Pesan — P2
- Notification list (mock): likes, comments, "someone claims your item".
- Simple mock chat screen between finder and owner.

---

## 6. Data model (mock)

Keep mock data in `src/data/` and agree on this shape **before** coding.

```js
// users.js
{
  id: "u1",
  username: "rina.ay",
  name: "Rina Ayuningtyas",
  bio: "Teknik Informatika '24",
  avatarColor: "#7C3AED"
}

// posts.js
{
  id: "p1",
  userId: "u1",
  status: "hilang",            // "hilang" | "ditemukan"
  isReturned: false,            // true = "Sudah kembali"
  name: "Dompet kulit coklat",
  category: "dompet",           // dompet | elektronik | kunci | pakaian | buku | lainnya
  location: "Kantin Gedung B",
  date: "2026-10-10",
  description: "Isi KTM dan kartu ATM...",
  features: "Lipat dua, inisial R di pojok",
  contact: "08xxxxxxxxxx",
  photos: ["/img/p1-1.jpg"],
  likes: ["u2", "u3"],          // user ids
  comments: [
    { id: "c1", userId: "u2", text: "Coba tanya ibu kantin", createdAt: "2026-10-10T06:00:00Z" }
  ],
  createdAt: "2026-10-10T05:00:00Z"
}
```

`localStorage` keys: `temuin_currentUser`, `temuin_posts`, `temuin_saved`. On first load, seed `temuin_posts` from `posts.js`.

---

## 7. Technical notes

- **Stack:** React + Vite (recommended) or plain HTML/CSS/JS — decide in week 1.
- **Routing:** `/login`, `/register`, `/`, `/explore`, `/post/:id`, `/create`, `/post/:id/edit`, `/profile/:username`.
- **Styling:** Tailwind CSS with the default palette and fonts set up as in `design.md` §11.
- **Icons:** Lucide (`lucide-react`, or the Lucide CDN for plain HTML). See `design.md` §7 for which icon goes where.
- **Responsive:** mobile-first; sidebar layout from 768 px.
- **Data layer:** one shared helper file (`src/lib/storage.js`) with `getPosts()`, `savePost()`, `toggleLike()`, etc. Nobody reads `localStorage` directly in components.
- **Git:** one branch per feature → pull request → review by Member 1 → merge to `main`.

---

## 8. Team ownership

| Member | Owns | Screens / work |
|---|---|---|
| 1 — Lead | Setup, layout & shared components | Repo, routing, sidebar + bottom nav, design tokens, Button/Input/Badge/Chip/Avatar, mock data, `storage.js`, code review |
| 2 | Auth | Masuk, Daftar, logout, route guard |
| 3 | Feed | Beranda, post card, like/save, filter chips, desktop right column |
| 4 | Create / Edit | Buat Postingan, photo preview, validation, edit mode |
| 5 | Explore & Detail | Cari, search & filter logic, Detail page, comments |
| 6 | Profile & extras | Profil, tabs, "Sudah kembali", Edit profil, Notifikasi (P2) |

---

## 9. Milestones

| Week | Deliverable |
|---|---|
| 1 | Agree on stack & data model. Member 1 ships layout, tokens, shared components, mock data. Others build static versions of their screens. |
| 2 | All P0 screens static + responsive, merged to `main`. |
| 3 | Wire up `localStorage` logic: create, like, save, comment, filter, search. |
| 4 | P1 features, bug fixing, accessibility pass, polish, demo. |

---

## 10. Acceptance criteria (demo-ready)

- [ ] All 6 core screens work on mobile (390 px) and desktop (1440 px) without horizontal scroll.
- [ ] A new post created in the form appears at the top of the feed and survives a page refresh.
- [ ] Filters and search return correct results; empty state shows when nothing matches.
- [ ] Likes, saves and comments persist after refresh.
- [ ] Owner can mark a post as "Sudah kembali" and it shows the overlay on the profile.
- [ ] Every interactive element is reachable by keyboard with a visible focus ring.
- [ ] UI matches `design.md` (fonts, colors, status badges).

---

## 11. Open questions

1. Final app name — keep "temuin."?
2. React or plain HTML/CSS/JS?
3. Contact flow: WhatsApp link only, or also a mock chat screen?
4. Should guests (not logged in) be allowed to post, or only browse?
5. Do we need a "location" picker list (fixed campus places) instead of free text?
