# Feature: Borrow Flow — `feature/borrow-flow`

**Branch:** `feature/borrow-flow` · **Source:** `development` · **Scope:** `05_BORROW` + `06_CONFIRMATION` + `07_SUCCESS`

## Tujuan

Memisahkan transaksi peminjaman LIBRA sesuai V2 spec §7–§8:

- **Borrow ≠ admin form.** Maks 2 field editable setelah R2 (Return date + Pickup), Borrow date = read-only today, Borrower/Book = read-only.
- **Confirmation ≠ optional.** `Borrow → Review (read-only) → Success`. Edit via Back, bukan edit di review.
- **Success = feedback + due.** Pill accent wash, due-card, CTA ke My Loans.

Branch ini mengimplementasikan policy, validasi, dan dokumentasi flow transaksi.

## Screens Terkait

| Screen | Route | File |
|--------|-------|------|
| `05_BORROW` | `/borrow/:id` | `libra-web/src/screens/screens.jsx: Borrow()` |
| `06_CONFIRMATION` | `/confirmation/:id` | `libra-web/src/screens/screens.jsx: Confirmation()` |
| `07_SUCCESS` | `/success/:id` | `libra-web/src/screens/screens.jsx: Success()` |

Screenshots: `05_BORROW.webp` → `06_CONFIRMATION.webp` → `07_SUCCESS.webp`.

## Policy & Helper Baru (di branch ini)

- **Helper:** `libra-web/src/utils/borrowPolicy.js` — `LOAN_PERIOD_DAYS = 14`, `getBorrowDates(borrowDate?)`, `validateBorrow({returnDate})`, `canBorrow(book)`.
  Dipakai untuk: default return date, validasi range, guard unavailable book.
- **Data sumber:** `libra-web/src/data/books.js: BORROW_META` (borrowDate, returnDate, loanPeriod, pickup).
- **Auth guard:** borrow intent → login → kembali ke `/borrow/:id` (lihat `useAuthActions().loginUrl` di `screens.jsx`), tidak ada redirect Home yang buang intent.

## Flow

```
BookDetail [Borrow this book] (jika authed)
  → Borrow (/borrow/:id) — isi Return date + Pickup, Borrow date read-only
    → Confirmation (/confirmation/:id) — review read-only, tombol Confirm → Success
      → Success (/success/:id) — due-card wash, CTA View my loans
        → My Loans (/my-loans) — active loan muncul
Jika guest klik Borrow → Login?next=/borrow/:id&context=borrow → setelah signIn → kembali ke Borrow (intent preserved)
```

## Verification

```bash
git checkout feature/borrow-flow
git log --oneline --graph --all
git diff development -- docs/FEATURE_BORROW_FLOW.md libra-web/src/utils/borrowPolicy.js
cd libra-web && npm run dev
# 1) Guest: buka /book/clean-code → Borrow → redirect Login → Sign in → kembali Borrow (intent terjaga)
# 2) Isi Return date → Continue → Confirmation read-only → Confirm → Success → View my loans
```

## Commit di branch ini

- `feat(borrow): add borrow policy, validation & flow docs — feature/borrow-flow`

Bukti tab Branches: `feature/borrow-flow` punya commit unik vs `development`.
