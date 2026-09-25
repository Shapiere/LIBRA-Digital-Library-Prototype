# LIBRA — Web Prototype Code-First Report

**Project:** LIBRA — Modern digital library platform (consumer/startup, bukan admin)
**Spec source:** `G:/Course LSM/UI-UX/LIBRA_UX_SCREEN_SPECIFICATION_V2.md` (8 core screens, 1440×900, Tier 1 golden flow, muted indigo accent)
**Implementation:** Local web prototype — React + Vite + React Router + CSS (code-first, **no Figma MCP write**)
**Date:** 2026-09-24 ~19:50 WIB (UTC+7)
**Repo:** `G:/Course LSM/UI-UX/libra-web/`
**Dev server:** `http://127.0.0.1:5173` (process `libra-dev`, pid 2376, Vite 8.3.1 — `Local: http://127.0.0.1:5173/`)
**Screenshots:** `G:/Course LSM/UI-UX/libra-web/screenshots/` (9 webp, 1440×900 viewport, lihat §6)
**Sumber Figma tidak dipakai untuk write:** File Figma sebelumnya `tyx3clGkj8iW7pR3NtYtPh` tidak dimodifikasi pada fase ini

---

## 1. Ringkasan Eksekusi

Tugas code-first diminta:
- 8 screens, 1440×900, high-fidelity real rendered UI (bukan wireframe)
- Visual system V2: Inter, white/neutral foundation, primary #111111, muted indigo #4C5B8A + wash #F0F2FF / border #E3E7FF, 80px outer, 12-col grid, editorial spacing
- Golden flow: `Home → Discover → Book Detail → Login (guest borrow, intent preserved) → Borrow → Confirmation → Success → My Loans`
- Reusable React components, setiap route bisa dibuka langsung via localhost
- Verifikasi: jalankan server → cek route → screenshot tiap screen → consistency check → BERHENTI

Hasil: **DONE — 8/8 cores + 2-state My Loans (guest/authed)**, visual V2 diimplementasi, golden flow terverifikasi via browser automation (click-flow, bukan mock), build `vite build` OK, server tetap jalan. Tidak ada file Figma baru/timpa.

---

## 2. Tech Stack & Struktur File

| Layer | Detail |
|-------|--------|
| Scaffold | `npm create vite@latest libra-web --template react` → React 19.2.8 + react-dom 19.2.8 + react-router-dom 7.18.4 + @vitejs/plugin-react 6.1.1 + Vite 8.3.0 |
| Fonts | Inter via Google Fonts: `@import Inter 400/500/600/700` (`src/index.css:1`) |
| Router | `BrowserRouter` di `src/App.jsx` — 8 route + fallback Not Found |
| Build | `dist/assets/index-BnZOPmml.css 7.3 KB / index-DRVyysUd.js 290 KB (gzip ~89 KB)` — `✓ built in 225ms` |
| Server | `vite.config.js` → `server: { port: 5173, host: '127.0.0.1' }` — `VITE ready in 415 ms` |

**File inventory inti:**

```
libra-web/
  vite.config.js        191 B — port/host
  index.html            361 B
  package.json          495 B
  src/
    index.css           8.7 KB — tokens, nav, hero, cards, grid, panel, tabs, loan
    App.jsx             896 B — BrowserRouter + 8 routes
    components/ui.jsx   3.1 KB — Nav, BookCard, Chip, SearchBar, RatingRow, CoverSmall
    data/books.js       4.8 KB — 12 books (Clean Code utama) + CATEGORIES + BORROW_META + USER
    screens/screens.jsx 29.6 KB — Home, Discover, BookDetail, Login, Borrow, Confirmation, Success, MyLoans + hooks useAuth/useAuthActions
```

Reusable — one component = one responsibility: `Nav (guest/auth variant)`, `BookCard (cover typographic 3:4)`, `Chip (selected = accent wash)`, `SearchBar (sole primary, 52h)`, `CoverSmall`, `RatingRow`, plus `Block/Divider` lokal untuk Confirmation.

Book data konsisten across semua screen (lihat §4).

---

## 3. Visual System V2 — Implementasi

Dikutip langsung dari `LIBRA_UX_SCREEN_SPECIFICATION_V2.md §14`:

| Token | Value | Pemakaian |
|-------|-------|-----------|
| `--page` / `--card` | `#FFFFFF` | Canvas & card bg |
| `--border` | `#E9E9E9` | Card/ section hairline |
| `--border-strong` | `#E0E0E0` | Input border |
| `--text` | `#111111` | Primary CTA bg `#111111` — tidak diganti accent |
| `--body` | `#333333` | Body copy |
| `--sec` | `#666666` | Secondary/meta |
| `--ter` / `--hint` | `#999999` / `#777777` | Tertiary/helper |
| `--muted` / `--muted-2` | `#F6F6F7` / `#F0F0F2` | Borrow/Confirmation/Success page bg & read-only rows |
| `--accent` | `#4C5B8A` | Muted indigo — **restrained** |
| `--accent-wash` | `#F0F2FF` | Selected chip, due highlight, cover bg, 14-days pill |
| `--accent-border` | `#E3E7FF` | Border wash |
| Grid | 12-col, outer 80px (`container: max-width calc(100% - 160px)`), gutter via gap 16/32 | |
| Type | Inter 400/500/600/700 — hero 40 Bold, page 28 Bold, detail 32 Bold, body 14–15 lh 1.6, meta 12–13, pill 11 | |

Accent tidak pernah jadi primary: primary tetap `#111111` (Search bar button, `Borrow this book` 48h, `Continue`, `Confirm borrowing`, `Sign in`, `View my loans`). Accent hanya selected chip + Confirmation/Success pill + Success due-card wash — bukan page dominan. Tidak ada gradient/glass/illustration wall.

---

## 4. Book Data — Konsistensi

`src/data/books.js`:

- **Utama:** `Clean Code — Robert C. Martin — Programming — 4.8 (1,240) — 464 pages — 2008 — English — Available`
  - CoverSlot: `CLEAN CODE / ROBERT C. MARTIN / A Handbook of Agile…` — sama di Home/Discover/Detail/Login banner/Borrow/Confirmation/Success/My Loans
  - Deskripsi real (bukan lorem): `A handbook of agile software craftsmanship...`
- **Dua belas buku total** (Disqus 4-col / rail 5-col memakai 10 berbeda: Designing Data-Intensive Apps, Refactoring, SICP, DDD, Atomic Habits, Design of Everyday Things, Deep Work, Thinking Fast and Slow, Pragmatic Programmer, Lean Startup, Storytelling with Data)
- **CATEGORIES:** `All · Programming · Design · Science · Business · Fiction · History`
- **BORROW_META (single source of truth, tidak tabrakan antar screen):**
  ```js
  borrowDate: '24 Sep 2026'  // read-only row: "Today · set by the library"
  returnDate: '08 Oct 2026'  // editable (2nd field)
  loanPeriod: '14 days'
  pickup: 'Library Pickup — Main Library, 1st Floor'  // editable (2nd field)
  ```
  Dipakai via `BORROW_META` di Borrow, Confirmation (`24 Sep · Today` + `08 Oct` + pill `14 days`), Success (`Due: 08 Oct`, `14 days · Library Pickup`), My Loans (`Borrowed 24 Sep · Due 08 Oct · 14 days`), Detail note `Returns in 14 days`.
- **USER:** `Shapiere Januar — shapiere@student.ac.id — 2024XXXX` — hanya di Borrow row & Confirmation block.

---

## 5. Routes — Semua Bisa Dibuka Langsung via Localhost

`src/App.jsx`:

```jsx
<Route path="/" element={<Home />} />
<Route path="/discover" element={<Discover />} />
<Route path="/book/:id" element={<BookDetail />} />
<Route path="/login" element={<Login />} />
<Route path="/borrow/:id" element={<Borrow />} />
<Route path="/confirmation/:id" element={<Confirmation />} />
<Route path="/success/:id" element={<Success />} />
<Route path="/my-loans" element={<MyLoans />} />
```

SPA fallback via Vite dev server — verifikasi HTTP:

```
GET /                         → 200
GET /discover                 → 200
GET /book/clean-code          → 200
GET /login                    → 200
GET /borrow/clean-code        → 200 (redirect ke login jika guest)
GET /confirmation/clean-code  → 200
GET /success/clean-code       → 200
GET /my-loans                 → 200
GET /my-loans?authed          → 200
```

Query-param login intent: `/login?next=%2Fborrow%2Fclean-code&context=borrow&book=clean-code` (borrow) dan `/login?next=%2Fmy-loans&context=myloans` (My Loans) — keduanya direct-openable.

---

## 6. Screens — 8 Core + 1 Variant (9 Captures)

Viewport browser: **1440×900** (headless `viewport: {width:1440,height:900}`), screenshot 1024×640 display (original 1800×1125) — file `libra-web/screenshots/`:

| # | Route | File | Size | Deskripsi render |
|---|-------|------|------|------------------|
| 1 | `/` | `01_HOME.webp` | 18.6 KB | Nav `Home` active (`Home Discover My Loans / Sign in`), hero `A library that reads like a product.` + subhead `Discover. Borrow. Keep track — without the paperwork.` + Search bar `Search titles, authors, or ISBN` + `Search` (sole primary black), rails `Recommended` / `Trending` 5 cards each, chips `Programming` selected indigo wash |
| 2 | `/discover` | `02_DISCOVER.webp` | 13.6 KB | `Discover 12 books` + search + chip row `All` selected + grid 4×3 = 12 cards + `Showing 12 of 128` |
| 3 | `/book/clean-code` | `03_BOOK_DETAIL.webp` | 13.2 KB | `← Back to discover` + left cover 480×640 `#F0F2FF/#E3E7FF` `CLEAN CODE` + right `Clean Code` 32 Bold, `Robert C. Martin` 16, badge `Programming` + `Available` dot, `★ 4.8 …`, desc, `Borrow this book` 48h full right-col, publisher/ISBN |
| 4 | `/login?next=%2Fborrow…` | `04_LOGIN.webp` | 7.9 KB | Banner `Sign in to borrow "Clean Code"` + CC thumb + `Robert C. Martin · Programming` + trust note `Your borrowing intent is saved…` + Email/Password + `Sign in` + `Back · Continue browsing` |
| 5 | `/borrow/clean-code` (authed) | `05_BORROW.webp` | 9.8 KB | `Borrow` + `Review your borrowing details` + book row + `Borrower: Shapiere Januar` + Borrow date `24 Sep 2026 — Today · set by the library` read-only + Return `08 Oct 2026` 📅 + Pickup `Library Pickup…` ▾ + `Continue` |
| 6 | `/confirmation/clean-code` | `06_CONFIRMATION.webp` | 9.8 KB | `Confirm borrowing` + `Check your details…` + read-only `Borrower` + `Borrow 24 Sep · Today` + `Return 08 Oct` + pill `14 days` (`#F0F2FF/#E3E7FF`) + `Pickup …` + `Confirm borrowing` |
| 7 | `/success/clean-code` | `07_SUCCESS.webp` | 8.0 KB | `✓ Borrowed!` + `Your borrowing is confirmed.` + book row `Borrowed on 24 Sep` + due highlight `Due: 08 Oct 2026` wash `#F0F2FF` + `14 days · Library Pickup` + `View my loans` (primary) + `Back to home` |
| 8a | `/my-loans` guest | `08a_MYLOANS_GUEST.webp` | 5.6 KB | `My loans` + gate card `📚 Sign in to view your loans` + `Track your current borrowing…` + `Sign in` + `Browse books` |
| 8b | `/my-loans` authed | `08b_MYLOANS_AUTHED.webp` | 11.0 KB | `My loans 1 active · 3 returned` + tabs `Active | History` (`Active` underline) + loan card `CC Clean Code — Borrowed 24 Sep · Due 08 Oct · 14 days · Due in 14 days → View details` + `Borrowing history` 3 rows (`Returned 10 Sep / 28 Aug / 12 Aug`) |

Semua adalah real rendered UI — bukan wireframe: cover typographic 3:4, badge `#F0F2FF`, chip selected indigo, due wash, avatar/initial, icon ✓/📚/📅. `libra-web/screenshots/` berisi 9 webp; copy pertama sempat salah mapping sudah dikoreksi via Python `shutil.copy2` — ukuran final di atas adalah yang write terakhir.

---

## 7. Golden Flow — Intent-Preserving Verification

Browser automation (click-flow, bukan unit test) — reset `localStorage.removeItem('libra_authed')` → guest start, 7 langkah Tier 1 diwired:

```
Home → Discover → Book Detail → Login(borrow-intent) → Borrow → Confirmation → Success → My Loans
```

**Hasil click-verification (JSON dari `tab.evaluate`, diringkas):**

```json
{
  "homeCheck": {
    "hasHero": true,
    "hasSubhead": true,
    "hasSearch": true,
    "searchPlaceholder": "Search titles, authors, or ISBN",
    "hasRecommended": true,
    "hasTrending": true,
    "hasCards": 10,
    "navHomeActive": "Home",
    "url": "/"
  },
  "guestLoans": {
    "hasGate": true,
    "hasBrowse": true,
    "url": "/my-loans"
  },
  "afterGateClick": {
    "url": "/login?next=%2Fmy-loans&context=myloans",
    "text includes": "Sign in to view your loans"
  },
  "afterBorrowClick": {
    "url": "/login?next=%2Fborrow%2Fclean-code&context=borrow&book=clean-code",
    "hasBanner": true,
    "hasCover": true
  },
  "afterLogin": {
    "url": "/borrow/clean-code",
    "authed": "1",
    "text includes": "Borrow — Review your borrowing details"
  },
  "afterContinue": {
    "url": "/confirmation/clean-code"
  },
  "afterConfirm": {
    "url": "/success/clean-code",
    "text includes": "Due: 08 Oct 2026"
  },
  "afterSuccess": {
    "url": "/my-loans",
    "text includes": "1 active · 3 returned — Clean Code — Due in 14 days"
  }
}
```

**Poin kunci (harus BERHENTI di login intent):**

- Home sole primary `Search` (placeholder tepat) — bukan card yang jadi primary, sesuai V2 R1
- Guest `My Loans` tidak dead-end → gate + `Sign in` membawa ke `/login?next=%2Fmy-loans&context=myloans`, bukan kosong
- `Book Detail Borrow (guest) → /login?next=%2Fborrow%2Fclean-code&context=borrow&book=clean-code` — banner `Sign in to borrow "Clean Code"` + cover hadir (intent preserved)
- `Login Sign in → /borrow/clean-code` **(bukan `/`)** — intent dipertahankan, `localStorage libra_authed=1` set
- `Borrow Continue → /confirmation/clean-code` (read-only echo 24 Sep / 08 Oct / 14 days / Library Pickup)
- `Confirm borrowing → /success/clean-code` (`Due: 08 Oct` highlight wash)
- `View my loans → /my-loans` authed (`1 active` Clean Code + `Due in 14 days` + history)

Semua primary CTA Tier 1 memiliki destination nyata — tidak ada fake button.

**Auth behavior (V2 §10):**

| Entry | Banner | Return |
|-------|--------|--------|
| `Detail Borrow` guest | `Sign in to borrow "Clean Code"` + CC thumb + trust note | `Borrow` (same book) |
| `My Loans` guest | `Sign in to view your loans` | `My Loans` authed |
| Generic | `Sign in` | `/my-loans` (default `next`) |

Disimpan di `localStorage key libra_authed=1` — prototype realism, bukan real session.

---

## 8. Visual Consistency Check

**Hierarki:** Hero 40 Bold dominant di Home (Search satu-satunya primary, bukan card). Detail 55/45 editorial (cover 480 vs text 580). Borrow 640 centered card — 2 fields editable (Return + Pickup) + 3 read-only rows + helper. Confirmation read-only, pill `#F0F2FF`. Success due-card `#F0F2FF` border `#E3E7FF`.

**Spacing:** Outer 80px konstan (`.container` / `nav paddingLeft/Right 80`). Section gap 32, rail/grid gap 16, card body 12/14 — konsisten di screenshot.

**Typography:** Inter semua; page 28 Bold / detail 32 / hero 40 / body 14–15 lh1.6 / meta 12–13 / pill 11 — tidak ada fallback serif.

**Cards aligned:** `BookCard` 3:4 (`aspect-ratio: 3/4`), border 1px `#E9E9E9`, radius 8 — reusable antara Home rail (5) dan Discover grid (4×3).

**Accent restrained:** Hanya selected chip (Programming at Home + All at Discover) + Confirmation 14-days + Success due — tidak mewarnai nav/primary.

**Cover konsisten:** Clean Code = `CC` / `CLEAN CODE` di wash `#F0F2FF` border `#E3E7FF` — sama di setiap screen (bukan 8 cover berbeda untuk buku sama).

**Tidak admin dashboard:** Tidak ada metrics/stat, bell, cart, gamification. V2 intentionally aman tapi tidak `generic black-and-white SaaS` — indigo memberi brand tanpa ornament.

**Tidak kosong/tidak overcrowded:** Home dense tapi dengan 2 rails + categories + footer tiny — balance. Discover grid 12 cards + `Showing 12 of 128` hint — readable.

**Clickable tapi punya interaksi:** Semua `.card` `cursor: pointer` + `onClick navigate /book/:id`; chips + search → filter/query; nav links — semua wired (Tier 1 polished, Tier 2 category/search dan My Loans tabs, Tier 3 sort/availability/date-picker sengaja tidak — sesuai V2 §13).

**Navigasi konsisten:** `Nav` sama (`LIBRA. 20 Bold — tracking -0.02`), guest `Sign in` ↔ authed `S Shapiere ▾` (satu slot), active underline 2px `#111`.

---

## 9. Cek Route, Build, Sisa Artefak

- **Build:** `npm run build` → `dist/assets/index-BnZOPmml.css 7.3 KB / index-DRVyysUd.js 290 KB` — OK (ganti nama chunk stabil: `DRVyysUd`).
- **Server:** `libra-dev` — `ready pid=2376, uptime 1.5s+`, `Local: http://127.0.0.1:5173/` — tetap jalan, tidak di-stop agar bisa handed-off.
- **Probe file:** `G:/Course LSM/UI-UX/.probe` (5 B) — file probe awal, boleh dihapus (bukan deliverable).
- **Screenshots listing (Python):** 9 webp 5.6–18.6 KB — copy verified via `shutil.copy2` (handle `Os { code: 123 }` fallback).
- **dist:** `favicon.svg, icons.svg, index.html 459 B, assets/*` — siap untuk `npm run preview` atau deploy static.

---

## 10. Yang Tidak Dikerjakan (Sesuai Instruksi)

- Tidak ada **Figma file** — tidak ada `create_new_file`, `use_figma` write pada fase ini (hanya 2 frame sebelumnya `HOME` at 0,0 & `DISCOVER` at 1500,0 di `tyx3clGkj8iW7pR3NtYtPh` — Starter limit 20/month ter-hit, sengaja dibiarkan dan dialihkan ke code-first).
- Tidak ada Figma MCP rate-limit upgrade — ditanya user, ditolak (pivot ke code-first).
- Tidak ada HTML/React membuat Figma design — ini adalah local web prototype, bukan generate Figma.
- Tidak ada admin/profile/payment/notification/social login/reading — se scope V2 §2.

---

## 11. Final Status: **READY FOR REVIEW**

LIBRA code-first prototype memenuhi 8 screens + golden flow lengkap, visual V2, reusable components, intent-preserving auth, direct local routes, screenshot-verified, build-clean, dan **BERHENTI** — tidak melanjutkan ke iteration lain tanpa instruksi.

**Next step untuk tugas kampus:**
1. (Opsional deploy) `npm run preview` / deploy `dist` ke Vercel/Netlify — LMS seringkali minta URL public, bukan `localhost`.
2. Kumpulkan `http://127.0.0.1:5173` (local) atau deploy URL + lampirkan screenshot folder untuk LMS — pastikan My Loans guest gate & intent login terlihat jelas di recording.

---

*Generated 2026-09-24 20:00 WIB — Hermes Agent code-first phase — JANGAN membuat Figma file sampai instruksi berikutnya.*
