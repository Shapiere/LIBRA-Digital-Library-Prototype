# Branching Strategy — LIBRA VCS

> Model: GitFlow ringan, adaptasi tugas VCS (minimal 3 branch, repo ini pakai 5).

## Branch List

| Branch | Type | Source | Purpose |
|--------|------|--------|---------|
| `main` | stable | — | Release / stable prototype |
| `development` | integration | `main` | Integrasi semua feature sebelum merge ke main |
| `feature/discovery-catalog` | feature | `development` | Search, filter, catalog (Discover + Book Detail) |
| `feature/borrow-flow` | feature | `development` | Borrow → Confirmation → Success |
| `feature/auth-myloans` | feature | `development` | Login, guest gate, My Loans |

## Flow Diagram

```
main ─────────────●──────────────────────────● (merge development)
                  \                        /
development ───────●──┬──●──┬──●──┬──●──────●
                      │     │     │
         feature/discovery   │     │
                feature/borrow    │
                      feature/auth
```

## Rules

1. Tidak ada direct commit ke `main` setelah initial — semua via `development`.
2. Tiap feature branch = 1 scope LIBRA (sesuai 8 screen V2 spec).
3. Commit message prefix: `feat:`, `docs:`, `fix:`, `chore:`.
4. Push tiap branch ke origin untuk bukti tab Branches di GitHub.
5. Fork tugas terpisah — tidak masuk branching ini.

## Verification

```bash
git branch -a
git log --oneline --all --graph
git ls-remote --heads origin
```

Lihat tab **Branches** di GitHub: https://github.com/Shapiere/LIBRA-Digital-Library-Prototype/branches
