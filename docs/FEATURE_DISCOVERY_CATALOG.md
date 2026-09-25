# Feature: Discovery & Catalog — `feature/discovery-catalog`

**Branch:** `feature/discovery-catalog` · **Source:** `development` · **Scope:** `02_DISCOVER` + `03_BOOK_DETAIL` + `01_HOME` (curated discovery)

## Tujuan

Memisahkan dua kecepatan discovery LIBRA sesuai V2 spec §3 Principle #5:

- **Home (curated, fast):** hero + featured/curated list, satu primary (`Search`), card secondary tapi clickable.
- **Discover (exhaustive, filtered):** search + category chips + grid penuh — exhaustive bukan skin ulang Home.

Branch ini mengimplementasikan search, filter kategori, dan katalog detail.

## Screens Terkait

| Screen | Route | File |
|--------|-------|------|
| `02_DISCOVER` | `/discover` | `libra-web/src/screens/screens.jsx: Discover()` |
| `03_BOOK_DETAIL` | `/book/:id` | `libra-web/src/screens/screens.jsx: BookDetail()` |
| `01_HOME` | `/` | `libra-web/src/screens/screens.jsx: Home()` |

Screenshots bukti ada di `libra-web/screenshots/02_DISCOVER.webp` & `03_BOOK_DETAIL.webp`.

## Data & Komponen

- **Data:** `libra-web/src/data/books.js` — `BOOKS` (12 buku, `clean-code` hero), `CATEGORIES` (`All`, `Programming`, `Design`, `Science`, `Business`, `Fiction`, `History`), `BORROW_META`, `USER`.
- **Helpers baru di branch ini:** `SEARCHABLE_FIELDS` + `searchBooks(query, category)` — index pencarian di `books.js` (title, author, category, coverSub).
- **UI:** `libra-web/src/components/ui.jsx` — `SearchBar`, `Chip`, `BookCard`, `CoverSmall`, `RatingRow` dipakai di Discover & Home.

## Cara Kerja

```
User input (SearchBar) + Chip select
  → useMemo filter BOOKS by (query ∧ category)
  → grid BookCard
  → klik Card → /book/:id → BookDetail (cover, meta, rating, deskripsi, CTA Borrow)
```

- Search case-insensitive, trim, kosong = tampilkan semua (sesuai kategori aktif).
- Category `All` = bypass filter kategori.
- BookDetail guard: `id` tidak ketemu → fallback Not Found (route `*` di `App.jsx`).

## Verification (di branch ini)

```bash
git checkout feature/discovery-catalog
git log --oneline --graph --all
git diff development -- docs/FEATURE_DISCOVERY_CATALOG.md libra-web/src/data/books.js
cd libra-web && npm run dev  # buka /discover, test search "clean" + chip Programming
```

## Commit di branch ini

- `feat(catalog): add searchable index & discovery docs`

Lihat tab Branches → `feature/discovery-catalog` punya commit unik dibanding `development`.

## Next

Merge: `feature/discovery-catalog` → `development` → `main` (setelah review).
Related: `feature/borrow-flow` (lanjut transaksi), `feature/auth-myloans` (gate borrow & my loans).
