# LIBRA UX Screen Specification v2

**Product:** LIBRA — Modern digital library platform  
**Positioning:** Consumer/startup product (not campus admin system)  
**Canvas:** Desktop 1440×900 · 8 core screens · Complete borrowing flow with interactions  
**Spec date:** 2026-09-24 (V2 revision)  
**Source:** `LIBRA_UX_SCREEN_SPECIFICATION.md` V1 — this is a targeted revision, not a rewrite from zero  
**Scope rule:** Revises only the 8 directed areas (§1). Solid decisions from V1 are kept unless a revision explicitly overrides them  
**No Figma write in this doc:** No `create_new_file`, no `use_figma`, no HTML/React, no prototype

---

## 1. Revision Summary

### What changed from V1 and why

| # | Revision | V1 problem | V2 decision | Why it matters |
|---|----------|------------|-------------|----------------|
| R1 | Home CTA hierarchy | Principle "one primary per screen" contradicted by Home listing two primaries (Search + card click) | **Search is the sole primary on Home.** Book cards remain clickable but are treated as secondary discovery with quiet visual weight | Removes hierarchy contradiction, makes hero intent unmistakable, lowers visual competition |
| R2 | Borrow form | Both borrow and return dates editable — unrealistic and heavier than needed. Unclear which date the user should change | **Borrow date = read-only / system-generated (today).** Only Return date + Pickup are editable | More natural (libraries set borrow = today), lower cognitive load, fewer error states, simpler prototype, more believable |
| R3 | Scope control | Many secondary states mixed with core flow; risk of shipping many half-polished screens | **Tier 1 / 2 / 3 implementation priority** (§13). Polish beats quantity | Guarantees the 7-screen assignment is met with high-quality Tier 1 before any Tier 3 polish |
| R4 | Login simplification | Login carried production-auth baggage (`Forgot password?`, `Create account`, `Continue as guest`) with no wiring and diluted the interruption | **Strip Login to: context banner + Email + Password + Sign in (primary) + Back (secondary) + small trust note.** Remove unwired extras | Keeps login as a *small interruption to continue borrowing*, not a destination page |
| R5 | Visual direction | V1 was intentionally restrained but risked reading as generic black-and-white SaaS | **Add one restrained brand accent: Muted Indigo** (evaluation of alternatives in §14). Primary CTA stays black | Gives identity without decorating, helps selected states and editorial moments, still premium and readable |
| R6 | Copy consistency | Hero used "preview" — implies a reading/preview feature that does not exist in the product | **Remove "preview".** Hero now uses only verbs the product actually does: discover / explore / borrow / manage | Prevents promising a feature that cannot be delivered in the prototype |
| R7 | Core vs state | V1 listed 8 screens but also many states/variants — a reviewer could confuse states for extra required screens | **Explicit Core (8) vs State/Variant classification** (§11 preamble). 8 screens satisfy the assignment; states are supporting realism | Removes grading ambiguity |
| R8 | Final critique | V1 critique focused on locked decisions only | **New 15-point V2 self-critique** (§15) with severity and fix status | Catches residual contradictions after the 7 revisions |

### What was deliberately not changed

- Guest-first, intent-preserving auth, My Loans visible for guest — kept verbatim.
- 8 core screens (Home, Discover, Book Detail, Login, Borrow, Confirmation, Success, My Loans) — kept; no screen added or removed, no profile added.
- Product direction (clean, premium, editorial, discoverable, intuitive, visually structured) — kept. "One restrained accent" is an addition, not a new direction.
- No new product feature was introduced (no reading, no gamification, no payments, no notifications).

---

## 2. Product Summary

LIBRA is a modern digital library for university students to find, evaluate, borrow, and manage books. It competes with consumer products, not legacy OPAC/admin panels.

**Core jobs (unchanged):**
1. Discover interesting books without friction (guest allowed).
2. Evaluate a book quickly (cover, metadata, availability, description).
3. Borrow with minimal form effort — not admin paperwork.
4. Track active loans and history in one place.

**What LIBRA is not (unchanged):**
Admin dashboard, catalogue management, staff tool, payment, gamification, notification center, real backend. Dates/availability/loan limits are prototype-realistic stubs.

**North star — every screen must pass in <5s:**
> "Where am I? What am I looking at? What do I do next?"

**Campus brief — still met:**
- 8 desktop screens (required minimum: 7) — no padding screen.
- One runnable flow from guest entry → borrowing → My Loans.
- Figma share URL + LMS upload in the *next* stage, not this doc.

---

## 3. Core UX Principles

V1 had 12 principles. V2 keeps all 12 and **clarifies P1** per R1.

1. **One primary action per screen.** If two buttons compete, one is wrong. Primary = filled black (#111111). Secondary = ghost/text. No dual-primary. **V2 clarification:** On Home the sole primary is **Search** (hero input + button). Book cards are *secondary discovery interactions* — clickable but visually quiet, not competing for primary weight. This resolves the prior "Search OR card" contradiction.
2. **Guest-first, not guest-blocked.** Browsing and detail are open. Login is an interruption that preserves intent.
3. **Intent-preserving auth.** Any gate must say *why* ("Sign in to borrow Clean Code") and return to the exact step. `Detail → Login → Home` is a bug.
4. **No dead ends.** Every screen has a visible exit. Empty states guide to the next action.
5. **Discovery has two speeds.** Home = curated + fast. Discover = exhaustive + filtered. They must not read as two skins of the same list.
6. **Decision before transaction.** Detail decides; Borrow/Confirmation transact.
7. **Borrow is not admin.** Max 2 editable fields after R2 (Return date + Pickup — down from 3). Read-only rows for Borrower/Book/Borrow date.
8. **Confirmation is not optional.** Borrow → Review → Success. Review is read-only (edit via Back).
9. **Editorial hierarchy over density.** Whitespace, restrained type, 12-col grid, card rhythm.
10. **Predictable over clever.** Familiar labels, familiar transitions.
11. **Readable > decorative.** Premium = spacing + type + *one* accent (§14), not gradients or illustration walls.
12. **Prototype-realistic.** Dates and due dates behave plausibly.

---

## 4. User Types / States

### 4.1 Guest (unauthenticated)

First-visit student. Can do Home, Discover, Book Detail, My Loans *gate* (sign-in CTA). Cannot borrow or see personal loans. Mental model: "Let me look around before I commit." No personalization on Home.

### 4.2 Authenticated (signed in)

Student who has signed in (email/password, prototype stubs). Everything guest can, plus Borrow → Confirmation → Success → My Loans with real data. Home gains a *single* personal strip (current loan or "No active loans — browse"). My Loans switches gate → content. Nav `Sign in` swaps to `Avatar + Shapiere ▾`. Session-scoped for prototype; no dedicated Profile screen.

### 4.3 State diagram

```
[Guest] ──tries to borrow──▶ [Login: borrow intent + cover] ──success──▶ [Borrow (same book, intent preserved)]
[Guest] ──clicks My Loans──▶ [My Loans (guest gate)] ──Sign in──▶ [My Loans (authenticated)]
```

No anonymous personalization. No soft-login ghost state.

---

## 5. Global Navigation

Fixed top nav, 1440 container, 64–72h, white + 1px hairline #E9E9E9, sticky.

| State | Left | Right |
|-------|------|-------|
| Guest | `Home` `Discover` `My Loans` | `Sign in` (text, 14 Medium) |
| Authenticated | `Home` `Discover` `My Loans` | `Avatar 32 + Shapiere ▾` dropdown (`My Loans`, `Sign out`) — or flat label; chosen at design to be one of these |

Active: single 2px underline #111 under one label. `My Loans` is always visible; guest content is gated, not nav. No hamburger, no bell, no cart. One restrained accent (§14) never used in nav — nav stays neutral.

---

## 6. Primary User Flow

Guest happy path — the only flow Tier 1 must have fully wired and polished:

```
HOME (guest)
  │  ↓ Search (primary) or pick a card / category
DISCOVER
  │  ↓ click any book card
BOOK DETAIL ("Clean Code")
  │  ↓ Borrow this book
LOGIN  ──guest?──▶  "Sign in to borrow Clean Code" (+ cover, intent preserved)
  │                    ↓ success → return
BORROW  (Borrow date read-only today, Return date + Pickup editable)  ← Login returns here if guest
  │  ↓ Continue
CONFIRMATION  (read-only review: book, borrower, borrow/return/pickup)
  │  ↓ Confirm borrowing
SUCCESS  ("Clean Code borrowed · Due 08 Oct 2026")
  │  ↓ View my loans  ─OR─  Back to home
MY LOANS  (authenticated: current + history)
```

Authenticated variant collapses: `DETAIL → BORROW → CONFIRMATION → SUCCESS → MY LOANS` (no login step).

Prototype wiring requirements:
- Every `→` is a Figma click transition. No dead end.
- `LOGIN → BORROW` returns to Borrow automatically, not via Home.
- `SUCCESS` wires both `View my loans` (primary) and `Back to home` (secondary).

---

## 7. Secondary User Flows

All Tier 1 flows must be wired. Tier 2 flows are supporting polish; missing Tier 2 does not block the assignment.

| # | Flow | Trigger | Tier | Purpose |
|---|------|---------|------|---------|
| S1 | Home card → Detail | `HOME: any rail card` → `BOOK DETAIL` | 2 | Prove curation |
| S2 | Home current-loan strip → My Loans | `HOME: strip View` → `MY LOANS` (auth only) | 2 | Shortcut for returner |
| S3 | Discover search → Detail | `DISCOVER: type "Clean"` → card → `DETAIL` | 2 | Search |
| S4 | Discover category → Detail | `DISCOVER: Programming chip` → card → `DETAIL` | 2 | Browse |
| S5 | Detail → Back → Discover | `DETAIL: Back` → `DISCOVER` | **1** | Escape hatch |
| S6 | Borrow → Back → Detail | `BORROW: Back` → `DETAIL` | **1** | Correct choice |
| S7 | Confirmation → Back → Borrow | `CONFIRMATION: Back` → `BORROW` | **1** | Edit before commit |
| S8 | Success → My Loans | `SUCCESS: View my loans` → `MY LOANS` | **1** | See result |
| S9 | Success → Home | `SUCCESS: Back to home` → `HOME` | 2 | Browse again |
| S10 | Guest → My Loans gate → Login → My Loans | `MY LOANS(guest) → LOGIN → MY LOANS(authed)` | **1** | Gate, not dead end |
| S11 | Guest Detail → Borrow → Login → Borrow | `DETAIL → Borrow → LOGIN(Clean Code) → BORROW` | **1** | Intent preserved |

Out of scope for any tier: Profile page, password reset flow, admin, real due-date calc.

---

## 8. Core Screen Specifications

General: 1440×900, 12-col grid (gutter 72, outer 80), white page, 1px hairline, Inter, max one primary per viewport, Back top-left, primary bottom-right of card (or full-width on Login/Success). Transitions: page-to-page `Instant` or `Dissolve 150ms`; overlays `Smart animate Ease out 200ms` — one choice per prototype. Brand accent (§14) never replaces black primary.

---

### 8.1 Home

**Purpose:** Curated entry. Teach LIBRA in one glance and get to a book in ≤2 clicks. Not a dashboard.

**User goal:** "What should I read? Is this worth my time?"

**User state:** One screen for guest + authenticated. Personalization is a single strip, not a fork.

**Entry points:** App open `/`, `Home` nav, `Back to home` from Success.

**Exit points:** → Discover, → Book Detail, → My Loans (strip, auth), → Login (nav Sign in).

**Information hierarchy (top → bottom):**
1. Hero: proposition + Search (the *only* primary)
2. Personal strip (auth only)
3. Recommended rail
4. Trending rail
5. Categories row
6. Editorial footer

**Content:**
- **Hero:** Headline `A library that reads like a product.` Subhead **V2 revised** `Discover. Borrow. Keep track — without the paperwork.` Search input placeholder `Search titles, authors, or ISBN` + `Search` button (black filled, 44h). `⌘K` hint kept if desired. No advanced filters.
- **Recommended:** 5 cards (cover 3:4, title, author, category badge, availability dot). Label adapts: "Recommended" (guest) / "Recommended for you" (auth). Same cards.
- **Trending:** 5 cards, same component, different data.
- **Categories:** 6 chips — `Programming · Design · Science · Business · Fiction · History`. Tap → Discover filtered (Tier 2 interaction).
- **Personal strip (auth only):** `Current loan: Clean Code — Due 08 Oct 2026 · [View]` or `No active loans — [Browse]`. Guest: strip absent — no empty box.
- **Footer:** `© LIBRA · Built for students.`

**Primary action (R1 resolved): Search — hero input + button is the sole primary.** No competing primary. Book cards are secondary discovery (clickable but visually quiet).

**Secondary actions:** Click a book card → Detail, click a category chip → Discover filtered, rail scroll.

**Navigation:** Nav Home active. No in-page nav.

**Components:** Nav, hero+search, book card (cover, title 14 Med, author 13 #666, category badge 11 pill, availability dot), rail, category chip, personal strip card, footer. Accent (§14) appears only as selected-chip background and optional thin rail indicator — never on the primary button.

**Interactive elements:** Search (Enter or button → Discover with query), card click (quiet hover: 1→1.5px border, subtle cover scale), chip click, rail scroll arrows.

**Prototype transitions:** `HOME → DISCOVER` (Search/category/View all), `HOME → BOOK DETAIL` (any card), `HOME strip → MY LOANS` (auth).

**State variations:**
- Guest: no strip.
- Auth with active loan: strip with due.
- Auth without active: strip "No active loans — Browse."

**Edge cases:** Long title → clamp 2 lines. Missing cover → editorial placeholder (letter + accent-tinted bg, not broken-icon).

**Visual priority:** Hero (Search) → first rail → second rail. Categories tertiary. The eye lands on Search first; everything else is secondary scan.

**UX rationale (R1 addressed):** The prior "Search OR card" line made two elements compete for "most important." Real user behavior is: intent-known users go to Search, intent-unknown browse rails. Both are valid entries, but only one can be *visually dominant*. Making Search the sole primary clarifies "where to act first" while keeping cards obviously clickable (entire card hit-area + hover). This removes contradiction #1 without hurting discoverability. Categories as chips stay tertiary so Home does not read as a grid.

---

### 8.2 Discover

**Purpose:** Exhaustive exploration. The only place to find *any* book when you roughly know what you want.

**User goal:** "Let me search or filter until I see the right book."

**User state:** Identical guest/auth.

**Entry points:** `Discover` nav, `HOME: Search` (with query), `HOME: Category` (with filter), `BOOK DETAIL: Back`.

**Exit points:** → Book Detail, → Home/My Loans via nav.

**Information hierarchy:**
1. Header: `Discover` + count (`128 books` or `12 results for "Clean"`)
2. Sticky search bar (carries query if from Home)
3. Filter bar — single line: Category chips (single-select) + Tier assignment below
4. Grid (3–4 cols, 12–16 cards)
5. Empty state (0 results)

**Content:**
- Header 28 Bold + count 14 #666.
- Search with `×` clear.
- Filter chips: `All · Programming · Design · ...` **single-select** (Tier 1 default; wiring one chip to a filtered variant satisfies the assignment). Sort and availability are **Tier 3** — not required for polish.
- Grid: same card as Home, optional `★ 4.8` if space allows.
- Empty: `No books match "xyz" · Try another keyword or clear filters · [Clear filters]`.

**Primary action:** Click a book card → Detail. Search/filter are tools, not goals.

**Secondary:** Adjust filters/search, clear, nav away.

**Navigation:** Nav Discover active. Back from Detail restores Discover (variant).

**Components:** Nav, header, search, chip group, grid, empty state, pagination hint. Accent used only for *selected* chip state (muted indigo fill + dark text) — rest stay neutral.

**Interactive elements:** Tier 1 = one chip swap (e.g., `Programming` → filtered grid variant). Tier 2 = search typing → filtered variant. Tier 3 = sort dropdown, availability toggle — optional.

**Prototype transitions:** `DISCOVER → DETAIL` (any card), `HOME Search/category → DISCOVER filtered variant`, `DISCOVER ↔ DISCOVER filtered` (chip), `DETAIL Back → DISCOVER`.

**State variations (core vs variant — see §11):**
- Default: All, no query (Tier 1).
- Filtered (one chip): `Programming` → ~8 results (Tier 1 if one is wired; Tier 3 if many).
- Queried: `Clean` → 2–3 results (Tier 2).
- Empty: 0 results (Tier 3 unless time permits).

**Edge cases:** 0 results → empty state, not blank grid.

**Visual priority:** Search → selected chip (accent helps one chip stand out, not many) → grid.

**UX rationale:** Discover earns its keep as the only screen with persistent search + count + grid. The single-select chip keeps Figma variant count low and ensures the interactive filter *does something*. Accent makes the selected filter legible without painting the whole bar.

---

### 8.3 Book Detail

**Purpose:** Decision support — "should I borrow this?"

**User goal:** "Tell me if this book is right for me and whether I can borrow it now."

**User state:** Guest/auth identical; only CTA consequence differs (guest hits Login next step).

**Entry points:** Any card from Home/Discover.

**Exit points:** → Borrow (primary), → Discover/Home via Back, → Login indirectly via Borrow if guest.

**Information hierarchy (left 55 / right 45, editorial):**
- Left: Cover 480×640 (3:4, subtle shadow) + muted secondary metadata below
- Right: Title 32 Bold → Author 16 #444 → badges (category pill + `Available` green dot/pill) → rating `★ 4.8 (1,240) · 464 pages · 2008 · English` 12 #666 → description 15 #333, 1.6 line-height (~60ch) → `Borrow this book` 48h primary → `Back to discover` link + note `Returns in 14 days · Pickup at Library`

**Content:** Happy path book is `Clean Code — Robert C. Martin — Programming — ★ 4.8 — Available`. Description is real blurb (2–3 lines): "A handbook of agile software craftsmanship..." No reviews list (no bloat). No "similar books" carousel.

**Primary action:** `Borrow this book` — black fill, white, 16 Med, 10 radius, full right-col width. Fixed below description.

**Secondary:** `Back` top-left (`← Back to discover`) + availability note.

**Navigation:** Detail is not Home/Discover — no nav highlight. Cover not clickable.

**Components:** Cover, badge, rating row, description block, CTA, back link, metadata table. Accent not used here (keeps decision calm).

**Interactive elements:** `Borrow this book` → Borrow (authed) or Login borrow-intent (guest); `Back` → Discover.

**Prototype transitions:** `DETAIL → BORROW` (authed) / `DETAIL → LOGIN` (guest, borrow-intent banner); `DETAIL → DISCOVER` (Back).

**State variations:** Available = enabled CTA. Unavailable (`Currently borrowed — available 28 Sep`, CTA disabled) is Tier 3 edge, not required for happy path.

**Edge cases:** Long title 2-line clamp. Missing rating → omit row.

**Visual priority:** Cover + title → availability badge → CTA.

**UX rationale:** Editorial and scannable. Cover carries emotion at 480 width; CTA is the right-col anchor at the end of an F-scan. No competing "Wishlist/Share" — one decision, one action.

---

### 8.4 Login

**Purpose (R4 revised):** Small interruption that explains *why* and promises return. Not a production auth page.

**User goal:** "Sign in quickly so I can finish what I was doing."

**User state:** Guest only. Two modes, same form: *borrow-intent* vs *My Loans* (different banner/return).

**Entry points:** `Borrow` as guest (borrow intent), `MY LOANS (guest) → Sign in`, `Nav: Sign in` (generic — routes to My Loans context in Tier 1).

**Exit points:** → Borrow (if came from borrow), → My Loans (if came from My Loans), → caller via Back. No `Login → Home` when the entry was a borrow intent.

**Information hierarchy (centered card 360–400, white, 1px #E9E9E9, 16 radius, 40 padding):**
1. **Context banner — retained, the core of R4.** Borrow-intent: `Sign in to borrow "Clean Code"` + 40×56 cover thumb + author. My Loans entry: `Sign in to view your loans` + stack icon. Generic: no banner but title remains `Sign in`.
2. Card: `Sign in` 24 Bold + subtitle mode-aware: borrow-intent → `You need an account to borrow this book.` generic → `Access your loans and history.`
3. **Form — trimmed (R4):** Email (prefilled `shapiere@student.ac.id` for convenience, editable), Password (`••••••••`). **Removed/hidden vs V1:** `Forgot password?`, `Create account`, `Continue as guest`. They are not wired in the prototype and dilute the interruption. If a visual needs to show them, keep as non-interactive 12 #999 text stubs at card bottom — not as CTAs, not wired, not counted as flows.
4. **Trust note — retained but smaller:** `Your borrowing intent is saved — you'll return to borrowing Clean Code.` 12 #777 beneath subtitle (borrow-intent mode only).
5. Primary: `Sign in` 44h black full-width.
6. Secondary: `Back` / `Continue browsing` text link 14 #666 beneath primary.

**Primary action:** `Sign in` — returns to entry context (table §10).

**Secondary:** `Back` → caller. No other secondary auth links.

**Navigation:** Full page for Figma count (not modal). Nav remains; Login not highlighted. Back arrow top-left → caller.

**Components:** Context banner (cover+title or icon), form card, two inputs (44h, 8 radius), primary button, secondary link, small trust note. Accent not used in Login (keeps borrowing intent black-primary).

**Interactive elements:** Inputs (focus ring), `Sign in` → return destination, `Back` → caller.

**Prototype transitions:** `BORROW(guest) → LOGIN(borrow) → BORROW`, `MY LOANS(guest) Sign in → LOGIN(My Loans) → MY LOANS(authed)`, `LOGIN Back → caller`. One Login frame with banner variants (§11).

**State variations:**
- Borrow-intent vs My Loans vs generic — variants of one screen.
- Error (`Incorrect email or password.` 13 #C0392B under password) — Tier 3 polish, not wired for Tier 1 happy path.

**Edge cases:** Empty fields → inline 12 #C0392B "Enter both fields" — Tier 3; Tier 1 CTA stays enabled and succeeds on click (prototype convenience). Abandon → Back.

**Visual priority:** Banner (why) → inputs → Sign in (action). Banner is the comprehension anchor.

**UX rationale (R4):** Campus systems showcase every auth link they could need for production. LIBRA is a prototype with one job: get a guest back to borrowing with context. Every extra link (`Forgot?`, `Create account`) is an unwired promise that makes the screen feel like a destination. Removing them is not minimalism for style — it is scope honesty. A reviewer can sign in with the prefilled credentials and return without wondering what the other links do. The book thumbnail is kept because it is the only decoration that carries function: it proves intent was preserved.

---

### 8.5 Borrow

**Purpose (R2 revised):** Collect the minimum needed — with borrow date now believable as system-set.

**User goal:** "Confirm what I'm borrowing and tell the system when/where I'll pick it up."

**User state:** Authenticated only. Guest is intercepted to Login before reaching this frame.

**Entry points:** `BOOK DETAIL → Borrow this book` (authed), `LOGIN → BORROW` (post-auth return, same book).

**Exit points:** → Confirmation (Continue), → Book Detail (Back).

**Information hierarchy (card 640, centered):**
1. Header: `Borrow` 28 Bold + `Review your borrowing details` 14 #666
2. **Book row — read-only (R4/R2):** cover 56×76 + `Clean Code — Robert C. Martin — Programming` + `Available`
3. **Borrower row — read-only:** `Borrower: Shapiere Januar` + muted `Student ID: 2024XXXX` 13 #666
4. **Borrow date — read-only (R2 — changed):** `Borrow date: 24 Sep 2026` 14 Med + helper `Today · set by the library` 12 #777 (no input, no picker, no validation)
5. **Editable fields — only two:**
   - `Return date` 44h date input, default `08 Oct 2026` + helper `Loan period: 14 days · Please return by the due date` 12 #777
   - `Pickup method` select 44h, value `Library Pickup — Main Library, 1st Floor` (single option in Tier 1; alternatives Tier 3)
6. Note: `You'll confirm details on the next step.` 12 #777

**Content — fields:**
- **Borrow date:** Not editable. Display only. In prototype, static text row with muted helper. No date picker, no error state.
- **Return date:** Editable. 44h, 8 radius, calendar icon, `DD MMM YYYY`. Calendar overlay is Tier 3 — Tier 1 shows the value and helper only, no interactive picker needed.
- **Pickup:** Dropdown 44h, single value Tier 1. No free text, no new field.

**Primary action:** `Continue` — black 48h, bottom-right of card. Label stays `Continue` (not "Confirm" — that belongs to next screen).

**Secondary:** `Back` top-left → Detail.

**Navigation:** Nav remains (no highlight). Back is primary nav.

**Components:** Header, book row, borrower row, borrow-date read-only row, return-date input, pickup select, helper texts, primary CTA, back link.

**Interactive elements (by tier):**
- Tier 1: `Continue` → Confirmation, `Back` → Detail.
- Tier 2: Pickup select interaction (if alternate pickup added).
- Tier 3: Return date picker overlay, date validation error `Return must be after borrow date` — not required for polished Tier 1.

**State variations:**
- Default (Tier 1): `Borrow: 24 Sep 2026 (Today, read-only) · Return: 08 Oct 2026 · Pickup: Library Pickup`.
- Edited return (Tier 3): helper updates to `13 days` etc.
- Error (Tier 3): `Return date must be after borrow date` — only if editable return is regressed before borrow.

**Edge cases:** Only return-before-borrow matters now (borrow cannot be edited, so borrow-after-return is impossible by construction — a direct benefit of R2).

**Visual priority:** Book row → Borrower row → Return date + Pickup (the two editable rows, visually grouped) → Continue. Borrow date reads calmly as info, not a field.

**UX rationale — R2 evaluation:**

*Approach A — Borrow date editable (V1):*
- Flexibility for user to pick a future borrow start.
- Costs: 3 editable fields → higher cognitive load (user must reason about 2 dates that must be ordered). Requires validation and error messaging. Less realistic — real libraries start the loan today (or at pickup). Adds a date picker interaction that needs Figma wiring and maintenance for a feature students rarely need (borrowing is usually immediate). Prototype variant explosion.

*Approach B — Borrow date read-only / system-generated (V2 chosen):*
- Realism higher — borrow date is the day you borrow; system sets it to today (or pickup day). Matches library reality and student mental model ("I borrow now").
- Cognitive load lower — user thinks about one future date only: "when must I return?" Reduces fields from 3 to 2 editable (+1 read-only). No borrow-date validation, no borrow-after-return bug.
- Simplicity — one fewer picker, one fewer error state, fewer Figma variants, faster to polish.
- Honesty — prototype does not pretend to offer future-start loans it cannot enforce.

**V2 verdict: B.** Applied to spec, map, states, edges, and blueprint. Rationale above and load/realism/simplicity recorded per requirement.

---

### 8.6 Confirmation

**Purpose:** Review gate before commitment. No silent success.

**User goal:** "Did I get everything right? One more check."

**User state:** Auth from Borrow with return+pickup.

**Entry points:** `BORROW → Continue`.

**Exit points:** → Success (Confirm borrowing), → Borrow (Back).

**Information hierarchy (card 640 — same width as Borrow for continuity):**
1. `Confirm borrowing` 28 Bold + `Check your details before confirming` 14 #666
2. Book: 56×76 + `Clean Code — Robert C. Martin` + `Programming · Available`
3. Borrower: `Borrower: Shapiere Januar`
4. Dates: `Borrow: 24 Sep 2026` (read-only) + `Return: 08 Oct 2026` + pill `14 days`
5. Pickup: `Pickup: Library Pickup — Main Library, 1st Floor`
6. Agreement: `By confirming, you agree to return by the due date.` 12 #777

**Content:** All read-only echoes of Borrow. No editing here; edit via Back → Borrow (intentional interruption for attention).

**Primary:** `Confirm borrowing` — black 48h bottom-right.

**Secondary:** `Back` top-left → Borrow.

**Navigation:** No nav highlight.

**Components:** Review card with 4 blocks (book, borrower, dates, pickup), period pill, CTAs.

**Interactive elements:** Tier 1 `Confirm borrowing` → Success, `Back` → Borrow.

**State variations:** One (review). Tier 3 edit-back variant handled by returning to Borrow with updated values.

**Visual priority:** Title → book block → dates block (slightly heavier — pill + bold).

**UX rationale:** Read-only here is not duplication; it forces the skim-reader to actually read before committing. One CTA is the commitment moment.

---

### 8.7 Success

**Purpose:** Closure + next step. Answers what happened, what, when, what next.

**User goal:** "Did it work? What do I do now?"

**User state:** Immediately after Confirm.

**Entry points:** `CONFIRMATION → Confirm borrowing` only.

**Exit points:** → My Loans (primary), → Home (secondary, Tier 2).

**Information hierarchy (card 560):**
1. Check circle 48 (black fill, white check — not green)
2. `Borrowed!` or `You borrowed Clean Code` 28 Bold
3. `Your borrowing is confirmed.` 15 #555
4. Book row 72×96 + `Clean Code — Robert C. Martin · Borrowed on 24 Sep 2026`
5. **Due highlight — accent moment (R5):** card-in-card `Due: 08 Oct 2026` 18 Med on soft accent-tinted bg (e.g., indigo wash #F0F2FF 1px border accent #E3E7FF) + `14 days · Library Pickup` 13 #666 — still black text, accent only as background/border.
6. Note: `Pick up your book at the Library Pickup desk by the borrow date.` 12 #777
7. CTAs: `View my loans` primary black 48h full width + `Back to home` text link 44h

**Primary:** `View my loans` → My Loans (shows new loan).

**Secondary:** `Back to home` → Home (Tier 2).

**Navigation:** No active highlight. No Back to Confirmation.

**State variations:** One happy-path variant (Clean Code + 08 Oct). Additional book/due variants Tier 3.

**Visual priority:** Icon+title → Due card (actionable info) → book row → CTAs.

**UX rationale:** Answers *what happened / what / when* above the fold. Due is the hero. Two CTAs here are the exception to "one primary" — hierarchy is clear (filled vs text). Accent gives premium lift without turning success celebratory.

---

### 8.8 My Loans

**Purpose:** Loan management — current + history, not admin table.

**User goal:** "What do I have out? When is it due? What came before?"

**User state:** Two designs, one screen, two variants: guest gate vs authenticated content.

**Entry points:** `My Loans` nav (any state), `HOME strip View` (auth), `SUCCESS View my loans`.

**Exit points:** → Book Detail (card click), → Discover/Home, → Login (from guest gate).

**Information hierarchy — authenticated (960 content width):**
1. Header: `My loans` 28 Bold + `1 active · 3 returned` 14 #666 + tabs `Active | History` (default Active)
2. Active: loan card (1px #E9E9E9, 12 radius, 20 padding): cover 64×88 + title/author + badge `Borrowed` (black pill) or `Due soon` (amber #FFB020 on #FFF7E6) + `Borrowed 24 Sep · Due 08 Oct` + `Pickup: Library Pickup` + `Due in 14 days` + `View details` link
3. History: `Borrowing history` 18 Med + muted rows (56×76, `Returned 10 Sep`). Rows clickable → Detail
4. Footer: `You have borrowed 4 books total.` 13 #666

**Guest gate variant (My Loans as guest):**
- Same header `My loans`. Centered card 480, 60 padding, 12 radius:
  - Icon 32 outline #999 (book stack or lock)
  - `Sign in to view your loans` 20 Bold
  - `Track your current borrowing, due dates, and history in one place.` 14 #666
  - `Sign in` 44h black → Login (My Loans context)
  - `Browse books` text link → Discover

**Primary action — guest gate:** `Sign in` → Login. **Authenticated:** implicit `View details` → Detail; empty gate `Browse books` → Discover.

**Navigation:** Nav `My Loans` active.

**Interactive elements:** Tab click Active↔History (Tier 2), card → Detail (Tier 2), `Sign in` → Login (Tier 1), `Browse` → Discover (Tier 1 empty state).

**State variations (classified §11):**
- Guest gate (Tier 1), authed empty + Browse (Tier 3), authed active 1+3 (Tier 1), History tab (Tier 2), due-soon amber variant (Tier 3).

**Visual priority:** Active card (bordered, bold dates) → history.

**UX rationale:** Active card's due date answers anxiety first. History secondary and muted. Gate as a designed state converts; empty blank list would read as broken. Tabs prevent history burying the active loan.

---

## 9. Interaction Map

Desktop click-only. No hover-dependent flows.

**Frame list (Figma — each 1440×900):**
`HOME` · `DISCOVER` (+ Tier 1 filtered variant only if needed) · `BOOK DETAIL` · `LOGIN` (one frame, banner variants as component states) · `BORROW` · `CONFIRMATION` · `SUCCESS` · `MY LOANS` (guest + authed + optional history-tab)

**Tier-tagged transitions (Tier 1 must all exist in Figma, Tier 2/3 conditional — see §13):**

| From → To | Trigger | Tier | Transition |
|-----------|---------|------|------------|
| HOME → DISCOVER | `Discover` nav / Search button / Enter in hero input | **1** | Instant |
| HOME category → DISCOVER filtered | Category chip click | 2 | Overlay/variant |
| HOME → BOOK DETAIL | Any rail card click | 2 | Instant |
| HOME strip → MY LOANS | `View` on current-loan strip (auth) | 2 | Instant |
| DISCOVER → BOOK DETAIL | Any grid card click | **1** | Instant |
| DISCOVER filtered ↔ DISCOVER default | Category chip / `Clear filters` | 2 / 3 empty state | Overlay swap |
| BOOK DETAIL → BORROW | `Borrow this book` | **1** if authed; guest routed via Login | Instant |
| BOOK DETAIL → LOGIN | `Borrow this book` while guest | **1** (borrow-intent banner) | Instant |
| BOOK DETAIL → DISCOVER | `Back` | **1** | Instant |
| MY LOANS(guest) → LOGIN | `Sign in` on gate card | **1** (My Loans context) | Instant |
| LOGIN → BORROW | `Sign in` success (came from borrow) | **1** | Instant — return to Borrow, not Home |
| LOGIN → MY LOANS | `Sign in` success (came from My Loans) | **1** | Instant |
| LOGIN → caller | `Back` | **1** | Instant |
| BORROW → CONFIRMATION | `Continue` | **1** | Instant |
| BORROW → BOOK DETAIL | `Back` | **1** | Instant |
| BORROW field edits | Return date / Pickup interact | 3 picker / 2 pickup | Component swap (Tier 3 picker optional) |
| CONFIRMATION → SUCCESS | `Confirm borrowing` | **1** | Instant |
| CONFIRMATION → BORROW | `Back` | **1** | Instant |
| SUCCESS → MY LOANS | `View my loans` | **1** | Instant |
| SUCCESS → HOME | `Back to home` | 2 | Instant |
| MY LOANS(authed) → BOOK DETAIL | Active/history card click | 2 | Instant |
| MY LOANS tabs Active/History | Tab click | 2 | Component swap |
| MY LOANS(empty) → DISCOVER | `Browse books` | 3 | Instant |

**Tier 1 path in one line — must be polish-perfect:**
`HOME (Search) → DISCOVER → BOOK DETAIL → (guest? LOGIN) → BORROW (Continue) → CONFIRMATION (Confirm) → SUCCESS (View my loans) → MY LOANS(authed)` plus every `Back` in that line.

**Affordances:** Back arrows top-left `← Back`, Tier 1 primaries bottom-right of card (Borrow/Confirmation) or full-width (Login/Success). Overlays: Tier 1 has none required; Tier 3 date picker/filter dropdown use overlay + `Close on click outside` if built.

---

## 10. Authentication Behavior

Principle: Login preserves intent and explains *why*. V2 keeps the 3 context modes from V1, trims the form per R4, and locks the return rule.

| Entry | Login banner (R4 trimmed still shows why) | Subtitle | Post-login destination |
|-------|--------------------------------------------|----------|------------------------|
| `BORROW` as guest (borrowing Clean Code) | `Sign in to borrow "Clean Code"` + 40×56 cover + author | `You need an account to borrow this book.` + small trust note `Your borrowing intent is saved — you'll return to borrowing Clean Code.` | `BORROW` (same book, same return date preserved) — **not Home** |
| `MY LOANS` as guest | `Sign in to view your loans` + stack icon | `Track your current borrowing and history.` | `MY LOANS` (authenticated) |
| `Nav: Sign in` | `Sign in` (no banner — generic) | `Access your loans and history.` | `HOME` (nav flips to avatar) |

**Rules (V1 kept, R4 addition):**
1. Never `Login → Home` when entry was a borrow intent. P0 bug.
2. Borrow-intent Login shows cover+title — proves continuity.
3. Single Login frame with banner variants (`LOGIN borrow-intent` / `LOGIN My Loans` / `LOGIN generic`) — not three screens. Variants counted as states, not core-screen inflation (§11/R7).
4. Form is Email + Password only. `Forgot password?` / `Create account` are **not** wired; if shown, they are 12 #999 text stubs at card bottom, non-interactive, not transitions. `Continue as guest` removed (already a guest — redundant).
5. Prefilled email `shapiere@student.ac.id` for reviewer convenience; fields remain editable.
6. Error inline under password — Tier 3 variant, not Tier 1 happy path. Tier 1 succeeds on click.
7. `Back` returns to caller with no side effects.

---

## 11. Important States

**Scope note (R7 — Core vs State):** LIBRA has **8 core screens** (§8). Everything below is a *state/variant* of one of those 8 — not an additional screen for the assignment count. A reviewer who counts frames will see N Figma frames; the submission counts 8 screens.

**Core (8):**
1. Home · 2. Discover · 3. Book Detail · 4. Login · 5. Borrow · 6. Confirmation · 7. Success · 8. My Loans

**States / variants (support realism, tier-tagged; Tier 1 bold):**

| Core | State / variant | Tier | Figma form |
|------|----------------|------|------------|
| Home | Guest (no strip) | **1** | Variant of Home (conditional layer) |
| Home | Authenticated with active loan strip (`Current loan — Due 08 Oct`) | 2 | Variant/strip component |
| Home | Authenticated without active (`No active loans — Browse`) | 3 | Variant |
| Discover | Default — All, no query | **1** | Base frame |
| Discover | Filtered — `Programming` chip selected, ~8 results | 2 | Filtered variant (one chip wired) |
| Discover | Queried — `Clean` → 2–3 results | 2 | Queried variant |
| Discover | Empty — `No books match "xyz" · Clear filters` | 3 | Empty variant |
| Book Detail | Available (CTA enabled) — happy path `Clean Code` | **1** | Base |
| Book Detail | Unavailable (`Currently borrowed — available 28 Sep`, CTA disabled) | 3 | Edge variant, not wired to happy path |
| Login | Borrow-intent banner + cover + trust note | **1** | Component variant of one Login frame |
| Login | My Loans intent (stack icon banner) | **1** | Component variant |
| Login | Generic (no banner) | 3 | Variant (nav-initiated) |
| Login | Error `Incorrect email or password` | 3 | Error variant |
| Borrow | Default — Borrow 24 Sep read-only + Return 08 Oct + Pickup Library | **1** | Base (R2) |
| Borrow | Return edited (`13 days` helper) | 3 | Edited variant |
| Borrow | Error `Return must be after borrow` | 3 | Error — only return-before-borrow possible post-R2 |
| Confirmation | Review (read-only echo) — only one | **1** | Base |
| Success | Borrowed — Clean Code, Due 08 Oct highlight | **1** | Base |
| Success | Alternate book/due | 3 | Optional variant |
| My Loans | Guest gate — Sign in CTA | **1** | Base variant |
| My Loans | Authed — 1 active Clean Code + 3 history (Active tab) | **1** | Base variant |
| My Loans | Authed — History tab (returned list) | 2 | Tab variant |
| My Loans | Authed — no active (`No active loans — Browse`) | 3 | Empty variant |
| My Loans | Due-soon amber (`Due in 3 days`) | 3 | Urgency variant |

Total variants required for Tier 1 polish: ~8 frames/variant groups, not 20+. Tier 2/3 add only if polish is already perfect.

---

## 12. Edge Cases

P1 = must handle in Tier 1. P2 = supporting, nice to have. P3 = optional polish — handle only if it does not hurt maintenance.

| Edge | Screen(s) | Handling | P | Prototyped in Tier 1? |
|------|-----------|----------|---|------------------------|
| Guest clicks My Loans | My Loans | Gate card `Sign in to view your loans` + `Browse books` — not blank list | P1 | **Yes** |
| Guest clicks Borrow | Detail → Login | `Sign in to borrow Clean Code` banner + return to Borrow | P1 | **Yes** |
| User abandons Login | Login | `Back` → caller, no auth state change | P1 | **Yes** |
| No search results | Discover | Empty state `No books match "xyz" · Clear filters` | P3 | P3 (only if grid variant exists) |
| Long book title | Home/Detail/My Loans | Clamp 2 lines, ellipsis; no layout break | P1 | Rule (component) |
| Missing cover | Any card | Editorial placeholder (letter + accent-wash bg, not broken icon) | P1 | Rule |
| Many loans | My Loans | Scroll; show 1 active + 3 history to prove pattern | P1 | Base shows 1+3 |
| Return before Borrow | Borrow | Inline `Return must be after borrow` — **only this error remains** post-R2 (borrow is read-only, so no other date-order bug). Tier 3 | P3 | P3 |
| Borrow date questioned ("why can't I change it?") | Borrow | Read-only row + `Today · set by the library` 12 #777 — explains system-set without an input | P1 | **Yes** (R2) |
| Unavailable book | Detail | CTA disabled `Currently borrowed — available 28 Sep` + Back | P3 | P3, not on happy path |
| Wrong password | Login | Inline error under field, CTA stays enabled | P3 | P3 |
| Zero active + zero history (new account) | My Loans | `No borrowing yet — discover your first book · Browse` centered | P3 | P3 |
| Direct URL Borrow as guest | Borrow | Intercept to Login borrow-intent — in Figma, Borrow only reachable via authed path or post-Login return | P1 | Rule |
| Sort / Availability filter | Discover | **Tier 3** — not required; one category chip in Tier 1 is sufficient | P3 | P3 |
| Pickup not selected | Borrow | Single option `Library Pickup` default — no error Tier 1 | P1 | Default |

---

## 13. Implementation Priority

**Rule (R3): Better 8 polished screens than 8 unfinished screens with 20 interactions. Tier 1 is the grading floor; Tier 2/3 only if Tier 1 is already premium.**

### Tier 1 — Must Have (grading-critical — fully polished and fully wired)

Every item here must be present, correctly spaced, readable, and click-wired. Review this set first; do not leave Tier 1 to add Tier 3.

**Screens:** All 8 cores exist as 1440×900 frames (Home, Discover, Book Detail, Login, Borrow, Confirmation, Success, My Loans).

**Flows and states:**
- Home hero Search → Discover (primary)
- Discover → Book Detail (any card → `Clean Code`)
- Guest Detail `Borrow this book` → Login borrow-intent banner (cover + title + trust note)
- Login (borrow) `Sign in` → Borrow (same book, borrow date read-only `24 Sep`, return `08 Oct`, pickup `Library Pickup`)
- Borrow `Continue` → Confirmation (read-only echo with `14 days` pill)
- Confirmation `Confirm borrowing` → Success (`Borrowed!` + Due 08 Oct highlight + `View my loans`)
- Success `View my loans` → My Loans (authenticated: 1 active `Clean Code` + 3 history)
- My Loans guest gate: `Sign in to view your loans` + `Sign in` → Login (My Loans context) → My Loans authed
- All `Back` links on the happy path: `Detail ↔ Discover`, `Borrow ↔ Detail`, `Confirmation ↔ Borrow`, `Login Back → caller`

**Visual:** Tier 1 carries the restrained accent in its minimal role (selected chip — see §14) plus neutral foundation, Inter, 12-col grid, whitespace.

### Tier 2 — Supporting Interactions (polish if Tier 1 is already premium)

Do these next, only if Tier 1 is already reviewer-ready.

- Home rail card → Detail (any card, secondary discovery)
- Discover category chip `Programming` → filtered grid variant (one chip wired, single-select)
- Discover search typing `Clean` → 2–3 results variant
- Success `Back to home` → Home
- My Loans active/history history card → Book Detail
- My Loans `Active | History` tab switch (component swap)
- Home personal strip (auth): `Current loan — Due 08 Oct · View` → My Loans

### Tier 3 — Optional Polish (do not force if it adds frames, variant sprawl, or hurts visual quality)

Skip Tier 3 if it would delay Tier 1 polish or add >2–3 extra frames.

- Sort dropdown, Availability toggle
- Return date picker overlay interaction + validation error
- Borrow alternate date helpers, pickup alternatives
- Wrong-password / empty-field Login errors
- Unavailable book Detail state
- Additional Discover filter/empty states beyond the one Tier 2 chip
- Additional Success alternate-book variants
- Due-soon (`Due in 3 days` amber) variant
- Brand micro-polish beyond the minimal accent wash (keep §14 minimal)

**If Tier 3 needs many frames, variant complexity, or fragile overlays, skip it.** A reviewer who sees a Tier 1 set that is truly premium will grade higher than one who sees a sprawling but rough prototype.

---

## 14. Visual Direction

Foundation from V1 is kept (white/neutral, Inter, restrained type, strong spacing, editorial hierarchy, no glass/glow/illustration wall, no admin dashboard). R5 adds **one** restrained accent. R6 fixes copy.

### Typography

- Family: **Inter** exclusively (no secondary display face — this is a library product, not a marketing site).
- Weights: Regular 400 body, Medium 500 labels, Semibold 600 chips/badges, Bold 700 titles. No Light 300 (readability, §12).
- Scale (restrained): Page titles 28 Bold, Detail title 32 Bold, hero headline 40 Bold (tight −0.02em), rails 16–18 Med, body 14–15 Regular 1.6lh, meta 12–13 Regular #666, pill 11 Med. Clamp long titles at 2 lines.
- Rule: Premium comes from spacing + hierarchy, not large decorative type.

### Neutral foundation

- Page: #FFFFFF. Cards: #FFFFFF + 1px border #E9E9E9. Hairlines #E9E9E9, dividers #EDEDED.
- Text: primary #111111, body #333333, secondary #666666, tertiary #999999, hint #777777.
- Muted surfaces: #F6F6F7 (card washes), #F0F0F2 (empty states), success due card uses accent wash (see Accent).
- Elevation: no shadows except subtle cover shadow (y 4, blur 16, 8% black) and optional card border; no layered shadow stacks.

### Primary

- Stays **black / near-black (#111111 fill, white text)** for every primary CTA (Search on Home, `Borrow this book`, `Continue`, `Confirm borrowing`, `Sign in`, `View my loans`). Primary never changes color per screen. 48h on transaction screens, 44h on Search/Login.

### Accent direction — decision (R5)

Three candidates were evaluated:

| Direction | Pros | Cons | Fit for LIBRA |
|-----------|------|------|---------------|
| **Deep indigo / muted blue** | Trust, focus, "library + tech"; reads on white, complements black primary without competing, accessible for selected states | Needs restraint or it reads corporate | **Best fit** — modern library + startup, calm focus |
| Restrained warm editorial (burnt ochre / paper) | Warm, editorial, bookish | Risks reading as publishing/literary, clashes subtly with black primary's cold premium | Warm but less digital |
| Muted green/teal | Fresh, natural, "growth" | Associated with success/health; confuses with status badges; less bookish | Not wrong, but not library |

**Chosen: Muted Indigo — a single restrained accent.**

- **Accent value:** `#4C5B8A` (muted indigo, desaturated, not vivid blue) — used sparingly. Supporting tints: wash `#F0F2FF` (soft background), border tint `#E3E7FF` (1px). Dark text on wash stays #111/#4C5B8A, never white-on-accent for body.
- **Why it wins for LIBRA:** Feels like a *modern digital library* — editorial but digital, trustworthy for a loan system, quiet enough to let black stay primary, and legible at 14px for chips and small editorial moments. It is not flashy, not illustration-driven, not gamified. It helps hierarchy (which chip is selected? which date is highlighted?) without painting the interface.
- **Anti-goal:** Accent is never the dominant color. Page stays white; accent appears only in selected states, subtle washes, and at most one editorial highlight (Discover count, success due card border/wash, optional thin rail indicator). If a screenshot's most visible color after black/white is the accent, it is too much.
- **Palette kept small (R5):** White + neutral greys + black primary + *one* muted indigo with two tints (wash + border). Not a full rainbow. No secondary accent.

### Where the accent appears — and where it does not

**Appears (subtle, consistent):**
- Selected category chip (filled wash `#F0F2FF` + border `#E3E7FF` + text `#2E3866` or `#111` with accent border — chosen at design; not a saturated filled chip).
- Success due highlight: card-in-card with accent wash bg + accent border, pill badge may use accent tint.
- Optional: thin 2px indicator under selected rail or header count "128 books" in #4C5B8A — at most one of these, not all.
- Editorial footer link hover if applicable.

**Does not appear:**
- Nav rollover, primary CTA, form focus ring (stays black ring), error (#C0392B), availability green/amber/grey (keep semantic), cover images, history rows.

### Spacing

- Grid: 12-col, 72 gutter, 80 outer padding on 1440. Card padding 20–24, section gap 24–32, rail gap 16–20, page header bottom 24, card-in-card padding 16. Generous whitespace is the premium signal. No cramped rows.

### Component philosophy

- One component = one responsibility (`BookCard`, `Chip`, `SearchBar`, `ReviewBlock`, `LoanCard`, `EmptyState`). Reuse with variants, not new components per screen.
- Borders over shadows; radius 8 (inputs/chips) → 10–12 (cards) → 16 (hero only). No giant radii.
- States: default, hover (subtle border 1→1.5), selected (accent wash + border), disabled (40% opacity), error (red text + icon). One icon style: outline linear.
- Transitions: `Instant` / `Dissolve 150ms` for pages; overlay `Smart animate 200ms` only for dropdown/picker if Tier 3 is built.
- Quality rule: Better one pixel-perfect 12px card radius everywhere than three different card styles.

---

## 15. UX Critique v2

Post-R1–R7 critique. 15 questions from the brief. For each: Problem, Why it matters, Proposed fix, Severity (High/Med/Low), Fix status (V2 done / optional / deferred).

### Q1. Still contradictory UX rule?

- **Problem V1:** "One primary per screen" vs "Search OR card" on Home; also implicit "max 3 editable" vs actually 3 editable before.
- **Why it matters:** Contradiction teaches implementers to pick one — prototype diverges.
- **Fix:** R1 makes Home sole-primary = Search (§8.1 + P1). R2 reduces editable fields to 2 (Return + Pickup) + 1 read-only (§8.5 + P7). Principles reworded in §3.
- **Severity:** Med (would cause Figma inconsistency)
- **Status:** **V2 done.**

### Q2. Home vs Discover truly different?

- **Problem:** Without a content firewall, one screen could re-skin the other.
- **Why it matters:** Navigation feels pointless if both show the same grid.
- **Fix:** Firewall in §8.1/§8.2 + principle P5 reworded. Home = hero+rails+chips, no full grid. Discover = header+search+chips+grid+count/empty, no hero/rails. Chip accent helps differentiation (§14).
- **Severity:** High (structural)
- **Status:** **V2 done.**

### Q3. Login too disruptive?

- **Problem V1:** Login had 5 extra elements (forgot/create/continue as guest etc.) that made it feel like a destination page.
- **Why it matters:** Every link that doesn't go anywhere wastes attention and makes "sign in to borrow" feel heavy.
- **Fix:** R4 strips Login to banner + email + password + Sign in + Back + small trust note (§8.4). Unwired links become non-interactive text stubs or are hidden.
- **Severity:** Med
- **Status:** **V2 done.**

### Q4. Intent truly preserved?

- **Problem:** "Preserve intent" is easy to claim, hard to see.
- **Why it matters:** If `Login → Home`, a student must re-find Clean Code — funnel collapse.
- **Fix:** §10 table locks return per entry context; book cover+title in borrow-intent banner; trust note; prototype wiring `Login → Borrow` explicitly listed Tier 1 (§9/§13). §7.4 preamble still calls `Detail → Login → Home` a bug.
- **Severity:** High
- **Status:** **V2 done (Tier 1 wired requirement).**

### Q5. Borrow still admin-like?

- **Problem V1:** 3 editable fields (borrow, return, pickup) plus three pickers/errors made Borrow feel like a form.
- **Why it matters:** Admin feel breaks consumer positioning and raises perceived effort.
- **Fix:** R2: Borrow date is read-only row `24 Sep 2026 · Today · set by the library` (§8.5). Prototype shows one future choice only (return). No address/phone/reason field was ever added — confirmed not added in V2.
- **Severity:** High (positioning)
- **Status:** **V2 done.**

### Q6. Confirmation still justified?

- **Challenge:** Could you skip Confirmation and go Borrow → Success?
- **Why keep it:** Confirmation is the only read-only review where the skim-reader actually reads. Removing it merges transaction and commitment and raises regret without saving a meaningful step. It also teaches the loan commitment model (due date).
- **Fix:** Kept and sharpened: values read-only, edit via Back (§8.6). No alternative path added.
- **Severity:** Low (question asked, answered keep)
- **Status:** **Kept — no fix needed.**

### Q7. Success next step clear?

- **Problem:** Two CTAs could compete if both filled.
- **Why it matters:** Closure moment needs obvious "what now."
- **Fix:** Hierarchy §8.7: `View my loans` filled + `Back to home` text. Due card with accent wash is the eye anchor, not the second button. Tier 1 wires My Loans; Tier 2 wires Home.
- **Severity:** Low
- **Status:** **V2 done.**

### Q8. My Loans truly useful?

- **Problem:** "My Loans" on many campus systems is a table dump.
- **Why it matters:** If active loan is buried under history, daily usefulness is lost.
- **Fix:** Tabs `Active | History` (§8.8), active card bordered and bold with `Due in 14 days` + `Due soon` amber variant. History muted. Guest gate designed as a gate, not an empty list. Tabs Tier 2, gate + active Tier 1.
- **Severity:** Med
- **Status:** **V2 done.**

### Q9. Navigation too complex?

- **Problem:** 4 nav items + auth + breadcrumbs + secondary nav could creep in.
- **Why it matters:** Complex nav confuses "where am I?"
- **Fix:** 4 items only (§5), single underline active, no secondary nav, no breadcrumbs, no bell/cart. Accent never touches nav.
- **Severity:** Low
- **Status:** **Kept — already simple.**

### Q10. Wow-only features that don't help?

- **Problem:** V1 could invite sort, availability toggle, additional empty states, due-soon animation — visually clever but not needed for assignment.
- **Why it matters:** Wow without job completion wastes polish budget.
- **Fix:** R3 tiers. Sort/availability/wrong-password/unavailable/extra filters are **Tier 3** (§13) — explicitly skippable if they cost premium feel. One chip filter in Tier 2 is enough.
- **Severity:** Med (scope creep)
- **Status:** **V2 done (tiered as optional).**

### Q11. C2/startup positioning still felt?

- **Problem after accent:** Accent could still be misused as corporate blue or editorial warmth that undercuts startup cleanness.
- **Why it matters:** LIBRA must not drift to admin or literary magazine.
- **Fix:** R5 chooses muted indigo (not warm, not vivid), usage is selected-state + subtle wash only, not hero recolor. Type, spacing, and editorial hierarchy (§14) carry startup feel; accent only assists.
- **Severity:** Low
- **Status:** **V2 done (restrained use locked).**

### Q12. Too generic?

- **Problem V1 risk:** All-white + black primary could read as any SaaS.
- **Why it matters:** Portfolio task needs a touch of identity without decoration.
- **Fix:** One muted indigo accent (§14) + editorial placeholder covers (§8.1) + due card wash (§8.7) give identity in three small moments — not a theme.
- **Severity:** Med
- **Status:** **V2 done.**

### Q13. 1440×900 realistic?

- **Problem:** Proposed ratio 55/45 editorial on Detail and 3–4 col grid on Discover must still breathe at 1440×900 without scrolling past primary CTA.
- **Why it matters:** If Borrow/Detail require scroll to reach CTA, "one primary" principle is undermined.
- **Fix:** Card widths (640 Borrow/Confirmation, 560 Success, 960 My Loans content) + vertical rhythm 24–32 ensure primaries sit above a comfortable fold. Left:Right 55:45 on Detail with cover 480×640 fits within 1440 with 80 outer padding. No scroll-required CTA in Tier 1.
- **Severity:** Low
- **Status:** **Confirmed — dimensions unchanged, layout tightened.**

### Q14. Scope still realistic for one course assignment?

- **Problem V1:** If Tier 3 is treated as required, a student could face 20+ frames/variants — unfinished look is more punishing than missing a nice-to-have interaction.
- **Why it matters:** Grading favors polished required work over sprawling but rough work.
- **Fix:** R3 tier summary (§13) explicitly says: perfect Tier 1 before touching Tier 3; skip Tier 3 if it adds >2–3 frames. Tier 1 is ~8 frames + 2 gate variants + 1 Login variant set — weeks-realistic for one task. V1's variant sprawl deferred to Tier 3.
- **Severity:** High (submission risk)
- **Status:** **V2 done.**

### Q15. Is Tier 1 enough for the assignment?

- **Problem:** Does a polished Tier 1 alone satisfy "minimal 7 pages with interactions" and "URL share + LMS upload"?
- **Why it matters:** Must not need Tier 3 to pass.
- **Fix:** Map: Tier 1 covers 8 frames (Home, Discover, Book Detail, Login×2 contexts as one frame's variants, Borrow, Confirmation, Success, My Loans×2 gate/authed) + full happy path with all Back links + guest gate. That is 8 screens + every interaction the brief names. Tier 2/3 only make the prototype *feel* more complete, not *pass vs fail*.
- **Severity:** High
- **Status:** **Yes — Tier 1 alone passes (see §13 intro + §17 checklist).**

---

## 16. Recommended Final Revisions

Beyond the 8 instructed revisions, these are final polish items that landed in V2 and should stay locked.

1. **Lock CTA copy progression** — Detail `Borrow this book` → Borrow `Continue` → Confirmation `Confirm borrowing` → Success `View my loans`. Do not re-label mid-Figma.
2. **Lock grid and radii** — 12-col/72/80 on 1440; radius 8 (inputs/chips), 12 (cards), 16 (hero only). One rule, everywhere.
3. **Lock transition pair** — `Instant` / `Dissolve 150ms` for pages; overlay `Smart animate 200ms` only if a dropdown/picker in Tier 3 is actually built.
4. **Cover asset** — Use a real Clean Code cover (or consistent placeholder) across Home/Detail/Borrow/Confirmation/Success/My Loans so the same book looks like the same book.
5. **Date consistency** — Borrow today `24 Sep 2026` → Return `08 Oct 2026` → `14 days` → Success due `08 Oct 2026` → My Loans due `08 Oct 2026`. One date set everywhere.
6. **Language** — English product copy for prototype; LMS submission text may be Indonesian per course norm but prototype stays English (no mid-file toggle).
7. **Public link readiness** — Not in this doc, but flagged: Figma file must be `Anyone with link can view`, cover frame, and prototype start frame = HOME with URL captured in next report.

---

## 17. Final UX Blueprint

**Explicit checklist — all 15 requirements from §"FINAL BLUEPRINT REQUIREMENTS" stated verbatim and satisfied:**

- **8 core screens:** Home, Discover, Book Detail, Login, Borrow, Confirmation, Success, My Loans — each a 1440×900 frame (§8). No screen added or removed. Profile not counted; not a 9th screen.
- **Desktop 1440×900:** All frames 1440×900; card widths Home 1280 nav, Borrow/Confirmation 640, Success 560, My Loans 960 content (§8 preamble).
- **Guest-first:** Browsing and detail are open; login is interruption, not gate (§6, P2).
- **Login only when needed:** Login appears only when trying to borrow or opening My Loans as guest — not on Home/Discover/Detail (§6/§10).
- **Intent-preserving login:** `Sign in to borrow "Clean Code"` banner + cover thumb + trust note + table of returns per entry context (§10). `Detail → Login → Home` is a declared bug.
- **My Loans visible for guest:** Nav slot `My Loans` is always visible (§5).
- **My Loans guest gate:** Guest who clicks My Loans sees `Sign in to view your loans` card with `Sign in` + `Browse books` — not an empty list (§8.8 gate variant, Tier 1).
- **Borrowing happy path fully wired (Tier 1):** `HOME(Search) → DISCOVER → BOOK DETAIL → LOGIN(borrow-intent) → BORROW → CONFIRMATION → SUCCESS → MY LOANS(authed)` plus every `Back` step. Every `→` is a Figma click transition (§9 Tier 1 line).
- **One clear primary action per core screen (R1 resolved):** Home = `Search` (sole primary); Discover = book-card click; Detail = `Borrow this book`; Login = `Sign in`; Borrow = `Continue`; Confirmation = `Confirm borrowing`; Success = `View my loans` (+ secondary `Back to home`); My Loans = `Sign in` (gate) or `View details`. See P1 and §8.1.
- **Home = curated discovery:** Hero + search (primary) → Recommended/Trending rails (secondary) → categories tertiary. No full grid (§8.1).
- **Discover = exhaustive exploration:** Header+count + sticky search + category chips (single-select) + grid (+ optional Tier 3 filters). No hero/rails (§8.2).
- **Book Detail = decision:** Cover + title/author/badges/rating + description + `Borrow this book` (§8.3).
- **Borrow = minimal transaction input:** Book + Borrower read-only, Borrow date read-only `Today · set by the library`, only Return date + Pickup editable (2 fields) + `Continue` (§8.5 R2).
- **Confirmation = review before commitment:** Read-only echo (book/borrower/borrow/return/pickup + 14-day pill) + `Confirm borrowing` (§8.6).
- **Success = closure + next step:** `Borrowed!` + Due 08 Oct highlight (accent wash) + book row + `View my loans` primary + `Back to home` secondary (§8.7).
- **My Loans = management:** `Active | History` tabs, active card bold due, guest vs authed states (§8.8).
- **Visual hierarchy > decoration:** 12-col grid, generous whitespace, editorial cover scale, restrained type, 1px hairlines, muted greys, one icon style — not shadows or illustration walls (§14).
- **One restrained brand accent:** Muted Indigo `#4C5B8A` with wash `#F0F2FF` / border `#E3E7FF` — used only for selected chip and subtle highlights (success due, optional count), never replacing black primary or painting the page (§14).
- **No unnecessary features:** No admin, stock/quantity, gamification, payments, notifications, wishlist, reviews, similar-books, social login, registration flow — explicitly out (§2, §13 Tier 3 excluded).
- **Figma prototype prioritizes Tier 1 polish:** Better 8 polished screens than 8 unfinished with 20 interactions. Tier 3 is skippable if it costs polish (§13 rule).

**Component inventory carried from V1 (single source, reuse with variants):**

`Nav` (guest/auth) · `BookCard` · `Rail` · `Chip` (accent selected) · `SearchBar` · `Cover` · `Badge` · `RatingRow` · `CTA Primary/Secondary` · `BackLink` · `FormInput` · `Select` · `ReviewBlock` · `Tab` · `LoanCard` + `HistoryRow` · `EmptyStateCard` · `GuestGateCard` · `SuccessDueCard` · `Footer` · (`SortDropdown`/`Toggle`/`DatePicker` only if Tier 3).

**Figma stage flagged — not done in this doc:**

One file, 8 frames 1440×900, §9 Tier 1 wiring verbatim, accented selected-chip + due-card wash as the only accent moments, cover/hero/Detail copy consistent (Clean Code etc., not lorem), public `Anyone with link can view`, prototype start = `HOME`. URL capture in next report. No write until you instruct.

---

*End of LIBRA UX Screen Specification v2 — revised, contradiction-free, scope-tiered, and Figma-ready. Awaiting your go-ahead for design generation.*

