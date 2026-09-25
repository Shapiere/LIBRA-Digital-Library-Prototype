# Feature: Auth & My Loans — `feature/auth-myloans`

**Branch:** `feature/auth-myloans` · **Source:** `development` · **Scope:** `04_LOGIN` + `08_MYLOANS` (guest gate vs authed)

## Tujuan

Memisahkan auth & manajemen pinjaman LIBRA sesuai V2 spec §4 (user states) + §15 R4:

- **Login = interupsi kecil, bukan destination.** Strip `Forgot password`, `Create account`, `Continue as guest` — hanya context banner + Email + Password + Sign in + Back + trust note.
- **Intent-preserving auth.** Gate selalu bilang *why* ("Sign in to borrow Clean Code") dan return ke step exact (`Detail → Login → Borrow`, bukan `→ Home`).
- **My Loans dual-state.** Guest = gate CTA (`08a_MYLOANS_GUEST.webp`), Authed = content active loans + history (`08b_MYLOANS_AUTHED.webp`), Nav `Sign in` ↔ `Avatar ▾`.

Branch ini mengimplementasikan guard, hook auth, dan dokumentasi gate.

## Screens Terkait

| Screen | Route | File |
|--------|-------|------|
| `04_LOGIN` | `/login?next=...&context=borrow&book=clean-code` | `libra-web/src/screens/screens.jsx: Login()` |
| `08_MYLOANS` guest | `/my-loans` (tanpa `libra_authed`) | `libra-web/src/screens/screens.jsx: MyLoans()` + `HistoryRows()` |
| `08_MYLOANS` authed | `/my-loans` (dengan `libra_authed=1`) | sama, branch authed |

Screenshots: `04_LOGIN.webp`, `08a_MYLOANS_GUEST.webp`, `08b_MYLOANS_AUTHED.webp`.

## Helper Baru (di branch ini)

- **`libra-web/src/utils/auth.js`** — `isAuthed()`, `signIn(returnTo?)`, `signOut()`, `loginUrl(intent, bookId?)`, `requireAuth(nextPath)`.
  Wrapper `localStorage libra_authed` agar logic auth tidak tersebar di screens.

## Flow

```
[Guest] —tries to borrow / clicks My Loans—
  → Login (borrow intent + cover, ?next=/borrow/clean-code)
    —signIn success—→ Borrow (same book, intent preserved) atau My Loans authed
      → Borrow → Confirmation → Success → My Loans (authed content)
[Authed] —nav Avatar ▾—→ My Loans (loans + history), Sign out → guest gate
```

Tidak ada anonymous personalization. Session-scoped prototype (no dedicated Profile screen — per V2 spec).

## Verification

```bash
git checkout feature/auth-myloans
git log --oneline --graph --all
git diff development -- docs/FEATURE_AUTH_MYLOANS.md libra-web/src/utils/auth.js
cd libra-web && npm run dev
# Guest: buka /my-loans → lihat gate → Sign in → /my-loans authed
# Guest: buka /book/clean-code → Borrow → redirect /login?next=/borrow/clean-code → Sign in → kembali Borrow
# Authed: localStorage.setItem('libra_authed','1'), reload, cek Nav jadi Avatar + MyLoans berisi loan
# localStorage.removeItem('libra_authed') untuk logout
```

## Commit di branch ini

- `feat(auth): add auth guard helpers & myloans docs — feature/auth-myloans`

Bukti tab Branches: `feature/auth-myloans` punya commit unik vs `development`.
