# LIBRA — Digital Library Prototype

> Modern digital library platform for university students — discover, evaluate, borrow, and manage books.
> **Tugas Version Control System** — public repository dengan multi-branch workflow.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter)](https://reactrouter.com)
[![License](https://img.shields.io/badge/License-MIT-green)](#)

**Repository:** https://github.com/Shapiere/LIBRA---Digital-Library-Prototype
**Figma:** https://www.figma.com/design/tyx3clGkj8iW7pR3NtYtPh
**Live (local):** `http://127.0.0.1:5173`

---

## ✨ Preview

| Home | Discover | Book Detail | Login |
|------|----------|-------------|-------|
| `libra-web/screenshots/01_HOME.webp` | `02_DISCOVER.webp` | `03_BOOK_DETAIL.webp` | `04_LOGIN.webp` |

| Borrow | Confirmation | Success | My Loans |
|--------|--------------|---------|----------|
| `05_BORROW.webp` | `06_CONFIRMATION.webp` | `07_SUCCESS.webp` | `08a/b_MYLOANS_*.webp` |

> Semua screenshot 1440×900, ada di `libra-web/screenshots/`.

---

## 🎯 Fitur Utama

- **Guest-first** — browsing & detail tanpa login; login hanya sebagai interupsi saat borrow (intent preserved).
- **8 Core Screens** — `Home → Discover → Book Detail → Login → Borrow → Confirmation → Success → My Loans` (V2 spec, 80px outer, 12-col grid, Inter, muted indigo #4C5B8A).
- **Discovery dua kecepatan** — Home (curated) vs Discover (search + filter by category).
- **Borrow flow realistik** — Borrow date read-only (today), Return date + Pickup editable, Confirmation read-only, Success + due-card wash.
- **Auth sederhana** — `localStorage libra_authed`, My Loans guest gate vs authed content.

---

## 🧱 Tech Stack

| Layer | Detail |
|-------|--------|
| Scaffold | Vite + React 19 + React Router 7 + @vitejs/plugin-react (Oxc) |
| Styling | CSS murni (`src/index.css` ~8.7KB) — tokens, grid, cards, loan UI |
| Data | `src/data/books.js` — 12 buku (Clean Code hero), CATEGORIES, BORROW_META, USER |
| Components | `Nav`, `BookCard`, `Chip`, `SearchBar`, `RatingRow`, `CoverSmall` |
| Route | `BrowserRouter` di `src/App.jsx` — 8 route + fallback Not Found |

---

## 📁 Struktur

```
.
├── docs/                                   # Spec & report (dipindah dari root)
│   ├── LIBRA_UX_SCREEN_SPECIFICATION.md    # Spec V1 (12 principles, 8 screens)
│   ├── LIBRA_UX_SCREEN_SPECIFICATION_V2.md # Spec V2 — 8 revisi + tokens
│   ├── LIBRA_WEB_REPORT.md                 # Code-first implementation report
│   ├── LIBRA_FIGMA_GENERATION_REPORT.md    # Figma Code-to-Canvas capture (9 frames)
│   ├── FIGMA_MCP_AUDIT_REPORT.md
│   └── FIGMA_MCP_WRITE_TEST_REPORT.md
├── libra-web/                              # React app (runnable)
│   ├── src/
│   │   ├── App.jsx                         # Router
│   │   ├── screens/screens.jsx             # 8 screens + useAuth hooks
│   │   ├── components/ui.jsx               # Reusable UI
│   │   ├── data/books.js                   # Books + meta
│   │   ├── index.css / App.css / main.jsx
│   │   └── assets/hero.png
│   ├── screenshots/                        # 9 webp, 1440×900
│   ├── public/icons.svg, favicon.svg
│   ├── package.json / vite.config.js
│   └── .gitignore / .oxlintrc.json
├── .gitignore
└── README.md
```

---

## 🚀 Cara Menjalankan

```bash
cd libra-web
npm install
npm run dev
# → http://127.0.0.1:5173
npm run build   # cek production build
```

| Route | Screen |
|-------|--------|
| `/` | Home |
| `/discover` | Discover |
| `/book/clean-code` | Book Detail |
| `/login?next=/borrow/clean-code&context=borrow&book=clean-code` | Login (borrow intent) |
| `/borrow/clean-code` | Borrow |
| `/confirmation/clean-code` | Confirmation |
| `/success/clean-code` | Success |
| `/my-loans` | My Loans (guest vs authed) |

> Auth stub: `localStorage.setItem('libra_authed','1')` untuk login; `removeItem` untuk logout.

---

## 🌿 Branching (Tugas VCS — minimal 3, repo ini pakai 5)

| Branch | Tujuan | Isi Commit |
|--------|--------|------------|
| `main` | Stable / release | Initial full project |
| `development` | Integrasi | Branching docs + workflow |
| `feature/discovery-catalog` | Search, filter, catalog | Search index + Discover docs |
| `feature/borrow-flow` | Borrow → Confirmation → Success | Borrow policy + validation |
| `feature/auth-myloans` | Login, guest gate, My Loans | Auth guard + My Loans docs |

Flow:
```
main → development → feature/*
```

Lihat tab **Branches** di GitHub untuk bukti.

---

## 🍴 Fork

Repo ini mem-fork 3 repository se-scope Digital Library / React LMS (untuk tugas forking):

1. `prosenjeetshil/React-CRUD-Library-Management-System` — React CRUD library (paling 1:1 dengan LIBRA)
2. `nehalmr/LMS-APP-ReactJS` — LMS React + lending/transaction
3. `gelargew/construe` — Digital library / reader

Cek profile **Shapiere** → tab Repositories → filter `fork`.

---

## 📄 Lisensi

MIT — untuk keperluan tugas & portfolio.

---

**Author:** Shapiere Januar Rafiansyah
**Course:** Version Control System — 2026
**Original local path:** `G:/Course LSM/UI-UX/`
