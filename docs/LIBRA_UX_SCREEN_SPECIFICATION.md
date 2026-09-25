# LIBRA UX Screen Specification v1

**Product:** LIBRA — Modern digital library platform  
**Positioning:** Consumer/startup product (not campus admin system)  
**Canvas:** Desktop 1440×900 · 8 core screens · Complete borrowing flow with interactions  
**Spec date:** 2026-09-24  
**Status:** Blueprint for Figma stage — no design, no code, no Figma write in this doc  
**Source decisions:** 10 locked UX decisions in brief + critique below (this spec overrides/clarifies where noted)  
**Author:** Hermes Agent (Oh My Pi harness) — read-only spec phase

---

## 1. Product Summary

**LIBRA** is a modern digital library for university students to find, evaluate, borrow, and manage books. It competes for attention with consumer products (Notion, Linear, Readwise), not with legacy OPAC/admin panels.

**Core jobs:**
1. Discover interesting books without friction (guest allowed).
2. Evaluate a book quickly (cover, metadata, availability, description).
3. Borrow with minimal form effort (dates + pickup, not admin paperwork).
4. Track active loans and history in one place.

**What LIBRA is not:**
- Admin dashboard / catalogue management / staff tool / payment system / gamified system / notification center. All explicitly out of scope.
- Real backend: availability, dates, loan limits are prototype-realistic stubs.

**North star question every screen must answer for a first-time student in <5s:**
> "Where am I? What am I looking at? What do I do next?"

If a screen fails that test, it fails the product.

**Deliverable that satisfies the campus brief:**
- 8 desktop screens (required minimum 7, we ship 8 with no padding screen).
- One runnable prototype flow from guest entry → borrowing → My Loans.
- Shareable Figma URL + LMS upload happens in the *next* stage, not this doc.

---

## 2. Core UX Principles

These are constraints, not aspirations. Every design decision in §7 is judged against them.

1. **One primary action per screen.** If two buttons compete, one is wrong. Primary = filled black (#111111), full weight. Secondary = ghost/text or outlined. No dual-primary.
2. **Guest-first, not guest-blocked.** Browsing and detail are open. Login is an *interruption that preserves intent*, not a gate at the front door.
3. **Intent-preserving auth.** Any auth gate must tell the user *why* ("Sign in to borrow Clean Code") and return them to the exact step they left. `Detail → Login → Home` is a bug, not a flow.
4. **No dead ends.** Every screen has a visible exit. Empty states guide to the next action, never a blank list.
5. **Discovery has two speeds.** Home = curated + fast (hero, quick search, recommendations, trending, categories). Discover = exhaustive + filtered. They must not feel like two skins of the same list.
6. **Decision before transaction.** Book Detail helps the user decide "do I want this?"; Borrow/Confirmation lets them execute. Do not mix them.
7. **Borrow is not admin.** Max 3 user-editable fields. Everything already known (borrower name, book identity) is shown read-only. No repeated identity form.
8. **Confirmation is not optional.** Borrow → Review → Success. No silent success on form submit. User must see what they committed to.
9. **Editorial hierarchy over density.** Generous whitespace, restrained type scale (Inter), 12-col grid, card rhythm. Density is not sophistication.
10. **Predictable over clever.** Navigation, labels, and transitions are familiar. Novelty must earn its place by removing a step, not adding one.
11. **Readable > decorative.** Premium = spacing + typography + one accent moment, not gradients, glass, or illustration spam.
12. **Prototype-realistic.** Dates, availability, due dates behave plausibly. No real stock logic needed, but the user must believe it.

---

## 3. User Types / States

### 3.1 Guest (unauthenticated)

- **Who:** First-visit student, possibly never created an account. May be referral from friend, poster QR, or search.
- **Can do:** Home, Discover (search/browse/filter), Book Detail (full), My Loans *skeleton* (sign-in CTA, not empty list). Cannot borrow, cannot see personal loans/history.
- **Mental model:** "Let me look around before I commit."
- **Risk:** If any discovery screen demands login prematurely, bounce rate spikes. Treat login prompts as conversion killers to be justified each time.
- **Data shown:** No personalization. Home shows editorial picks, trending, categories — not "Recommended for you" (no identity to recommend to). Search works identically.

### 3.2 Authenticated (signed in)

- **Who:** Student who has signed in (email/password prototype; real password reset out of scope, link stubbed).
- **Can do:** Everything guest can, plus Borrow → Confirmation → Success → My Loans with real loan data, current loan, due dates, history.
- **Mental model:** "I am now known; show me my stuff and let me act."
- **Data shown:**
  - Home gains a *personal strip* (see §7.1) — current loan + quick "View loans" — but the page structure does not fork into a second Home.
  - My Loans switches from sign-in gate to populated/empty content.
  - Nav label flips `Sign in` → `Profile / Sign out` (avatar + name). Not a new nav item, a state swap.
- **Edge:** Auth is session-scoped for prototype. No profile screen required (brief says profile not in the 8). Account details live in My Loans header or a minimal dropdown — not a dedicated screen.

### 3.3 State diagram (simplified)

```
[Guest] ──tries to borrow──▶ [Auth gate: Login, intent preserved] ──success──▶ [Authenticated, return to Borrow]
[Guest] ──clicks My Loans──▶ [My Loans (guest gate)] ──Sign in──▶ [Authenticated My Loans]
[Authenticated] ──Sign out (future)──▶ [Guest] — out of prototype scope, stub only
```

No anonymous personalization. No "soft login" ghost state.

---

## 4. Global Navigation

**Placement:** Fixed top nav, 1440 container, height 64–72, white with 1px hairline (#E9E9E9), no shadow. Sticky on scroll.

**Left:** Wordmark `LIBRA.` (Inter 20 Bold, tracking -0.02em) + nav links.

**Center:** Optional global search affordance — but *not* a full input in nav. See §7.1/7.2 for why search lives on-page, not in nav, to avoid competing with Home hero.

**Right:** Auth control.

| State | Left cluster | Right cluster |
|-------|-------------|---------------|
| Guest | `Home` `Discover` `My Loans` | `Sign in` (text button, 14 Medium) |
| Authenticated | `Home` `Discover` `My Loans` | `Avatar 32 + "Shapiere"` + `▾` dropdown (`My Loans`, `Sign out`) — or flat `Shapiere` label; chosen at design to be one of these, not both |

**Active state:** Single underline (2px, #111) under active label, not background fill. No more than one active.

**Behavior:**
- `Home`, `Discover`, `My Loans` are always visible (My Loans never hides for guest — it gates *content*, not *nav*).
- `Sign in` is always the last item. Authenticated swap is same slot, not a new column — prevents layout shift.
- No hamburger on desktop. No secondary nav.
- No notification bell, no cart icon — not needed.

**Why this nav wins:** Predictable, 4 items + auth. Student knows where they are at a glance. My Loans visibility teaches the mental model early (your loans live here), even before auth.

---

## 5. Primary User Flow

**Happy path — guest to borrowing complete (the required runnable prototype path):**

```
HOME (guest)
  │  ↓ Discover / recommended / trending / search entry
DISCOVER
  │  ↓ click any book card
BOOK DETAIL ("Clean Code")
  │  ↓ Borrow this book
BORROW  ──guest?──▶  LOGIN ("Sign in to borrow Clean Code" + intent preserved)
  │                    ↓ success
  │                  BORROW (pre-filled, same book, same intent)
  │  ↓ Continue
CONFIRMATION (review: book, dates, pickup)
  │  ↓ Confirm borrowing
SUCCESS ("Clean Code borrowed · Due 02 Oct 2026")
  │  ↓ View my loans  ─OR─  Back to home
MY LOANS (authenticated — current loan + history)
```

Guest variant collapses: if already authenticated, `BOOK DETAIL → BORROW → CONFIRMATION → SUCCESS → MY LOANS` with no login step.

This is the *only* flow the Figma prototype must have fully wired. Everything else is secondary but wired for realism.

**Prototype wiring requirement:**
- Every `→` above is a click transition in Figma (no dead end).
- `LOGIN → BORROW` return must be automatic, not via Home.
- `SUCCESS → MY LOANS` and `SUCCESS → HOME` are both wired; one primary, one secondary.

---

## 6. Secondary User Flows

All must be interactive in prototype (not just described), but they are not the critical path.

| # | Flow | Trigger → Path | Purpose |
|---|------|----------------|---------|
| S1 | Home → recommended → Detail | `HOME: Recommended for you / Trending` card → `BOOK DETAIL` | Prove Home curation works |
| S2 | Home → current loan → My Loans | `HOME: Current loan strip → View` → `MY LOANS` (auth only; guest strip hidden) | Shortcut for returning borrower |
| S3 | Discover → search → Detail | `DISCOVER: type "Clean"` → filtered results → card → `BOOK DETAIL` | Search discoverability |
| S4 | Discover → category → Detail | `DISCOVER: Category chip "Programming"` → filtered results → card → `BOOK DETAIL` | Browse without search |
| S5 | Detail → Back → Discover | `BOOK DETAIL: Back` → `DISCOVER` (restores scroll/filter state conceptually) | Escape hatch |
| S6 | Borrow → Back → Detail | `BORROW: Back` → `BOOK DETAIL` | Correct a choice before dates |
| S7 | Confirmation → Back → Borrow | `CONFIRMATION: Back` → `BORROW` | Edit dates/pickup before commit |
| S8 | Success → My Loans | `SUCCESS: View my loans` (primary) → `MY LOANS` | See result |
| S9 | Success → Home | `SUCCESS: Back to home` (secondary) → `HOME` | Exit to browse again |
| S10 | Guest → My Loans gate → Login → My Loans | `MY LOANS (guest)` → `Sign in` → `LOGIN` → `MY LOANS (authed)` | Teach gate, not dead end |
| S11 | Guest Detail → Borrow → Login → Borrow (intent) | `DETAIL → Borrow → LOGIN (explains borrowing Clean Code) → BORROW` | Auth preserves intent |

**Out of scope (do not wire):** Profile page, password reset flow, admin, filtering beyond one dimension, pagination beyond prototype illusion, real due-date calculation.

---

## 7. Screen Specifications

General desktop spec for all screens: **1440×900 frame**, 12-col grid (72 gutter, 80 outer padding), white page bg, 1px hairline dividers, Inter type. Max one primary CTA per viewport. All text layers use loaded Inter fonts; no missing-font fallback in prototype. Transitions: `Smart animate` or `Instant` with `Ease out 200ms` for overlay/modal; page-to-page `Instant` or `Dissolve 150ms` (chosen consistently, not mixed). Back always top-left, primary CTA bottom-right of content card or bottom of form (F-pattern end).

---

### 7.1 Home

**Purpose:** Curated entry. Teach what LIBRA is and get the student to a book in <2 clicks. Not a dashboard.

**User goal:** "What should I read? Is this worth my time? Show me something interesting fast."

**User state:** Guest and authenticated share one screen. Personalization is a *strip*, not a fork.

**Entry points:** App open (`/`), `Home` nav, `Back to home` from Success, browser back.

**Exit points:** → Discover (primary discovery exit), → Book Detail (via any card: Recommended, Trending, Category shortcut), → My Loans (via current-loan strip, auth only), → Login (via nav Sign in).

**Information hierarchy (top → bottom):**
1. Hero: `LIBRA.` proposition (1 line, editorial) + search input (see content)
2. Personal strip (authenticated only — see states)
3. Recommended / Trending rails (horizontal card rows, 4–5 visible, overflow hint)
4. Categories (chip row or 6-up grid — decision below)
5. Editorial footer (single line, not nav-heavy)

**Content:**
- Hero: Headline `A library that reads like a product.` (or equivalent editorial, not "Welcome to LIBRA Dashboard"). Subhead: `Find, preview, and borrow — without the paperwork.` Search input: placeholder `Search titles, authors, or ISBN` + `⌘K` hint + `Search` button. No advanced filters here.
- Recommended: 5 book cards (cover 3:4, title, author, category badge, availability dot). Authenticated: "Recommended for you"; guest: "Recommended". Same cards, label adapts.
- Trending: 5 book cards, same component, different data.
- Categories: 6 chips or tiles (`Programming`, `Design`, `Science`, `Business`, `Fiction`, `History`) — tapping any → Discover filtered (see §7.2). Choice: chips if horizontal, tiles if grid — chosen at design to be chips (lighter).
- Personal strip (auth only): `Current loan: Clean Code — Due 02 Oct 2026 · [View]` + `View loans` link. Guest: strip absent, no empty box.
- Footer: `© LIBRA · Built for students.` No sitemap.

**Primary action:** Search (hero input + button) OR clicking a book card — both are primary entry; hero Search is the visual primary. No competing CTA.

**Secondary action:** Category chip / View all.

**Navigation:** Global nav (Home active). No in-page nav.

**Components:** Nav, hero/search, book card (cover, title 14 Medium, author 13 Regular #666, category badge 11 pill, availability dot green/grey), rail (horizontal scroll with arrow affordance), category chip, personal strip card, footer.

**Interactive elements:** Search input (type + Enter or click Search → Discover with query), card hover (1px border to 1.5px, cover scale 2%), category chip (selected outline), rail scroll (drag or arrows).

**Prototype transitions:** `HOME → DISCOVER` (click Search / category / View all / nav), `HOME → BOOK DETAIL` (click any card), `HOME (auth) personal strip → MY LOANS`.

**State variations:**
- Guest: no personal strip; Recommended label generic.
- Authenticated: personal strip visible if at least one active loan; otherwise strip shows `No active loans — discover something.` + `Browse` link.
- Empty search: not on Home (no results shown here; results live on Discover).
- Loading: not needed in prototype (static).

**Edge cases:** Very long title: clamp to 2 lines + ellipsis. Missing cover: editorial placeholder (letter + category color, not broken image icon).

**Visual priority:** Hero → first rail → second rail. Categories are tertiary. Plenty of whitespace; no card wall.

**UX rationale:** Home earns its existence by being *curated* and *fast*. If it shows the same full grid as Discover, one of them is redundant (see critique §12). Hero search captures intent immediately; rails invite browsing without typing. Personal strip adds value for returning users without splitting the page into two Homes.

---

### 7.2 Discover

**Purpose:** Exhaustive exploration. The place to *find* a book when you know roughly what you want.

**User goal:** "Let me search or filter until I see the right book."

**User state:** Identical for guest and authenticated (no personal skew). Auth does not change results.

**Entry points:** `Discover` nav, `HOME: Search` (with query), `HOME: Category` (with filter), `BOOK DETAIL: Back`.

**Exit points:** → Book Detail (card click), → Home (nav), → My Loans (nav).

**Information hierarchy:**
1. Page header: `Discover` + result count (`128 books` or `12 results for "Clean"`)
2. Search bar (sticky, full width, same placeholder as Home — carries query if arrived from Home)
3. Filter bar: Category chips (multi? single? — see below) + Sort dropdown (trending / newest / title A–Z) + Availability toggle
4. Results grid (3–4 columns, 12–16 cards visible, pagination illusion)
5. Empty state (when filters yield 0)

**Content:**
- Header: Title `Discover` 28 Bold + count 14 Regular #666.
- Search: persisted query string if entry via Home hero. Clear `×` button.
- Filters: Chips: `All · Programming · Design · Science · Business · Fiction · History` (single-select for prototype simplicity — multi-select deferred). Sort: `Most popular · Newest · Title A–Z` (dropdown). Availability: `Available only` toggle (switch).
- Grid: Same book card as Home (cover, title, author, badge, availability). Add small `★ 4.8` rating if space allows, but not required.
- Empty: `No books match "xyz" · Try another keyword or clear filters · [Clear filters]`
- Count: Updates on filter/search interaction (Figma interactive component or variant swap).

**Primary action:** Click a book card → Detail. Search/filter are tools, not goals — the card click is the goal.

**Secondary action:** Adjust filters/search, clear filters, nav away.

**Navigation:** Nav (Discover active). Back from Detail conceptually restores prior filter/search (in prototype, simply links back to Discover frame with state variant).

**Components:** Nav, page header, search input (with clear), filter chip group, sort dropdown, availability toggle, book grid, empty state, pagination hint (dots or "Showing 16 of 128").

**Interactive elements:** Search typing (Enter → filtered grid variant), chip select (single, swaps grid variant), sort dropdown (overlay menu → grid variant), toggle (switches availability filter), card hover/click.

**Prototype transitions:** `DISCOVER → BOOK DETAIL` (any card), `HOME: Search/category → DISCOVER (filtered variant)`, `DISCOVER ↔ filtered variants` (chip/sort interactions as overlay or variant change), `BOOK DETAIL: Back → DISCOVER`.

**State variations:**
- Default: All books, no query.
- Queried: `q="Clean Code"` → 2–3 results.
- Filtered: `Category: Programming` → 8 results.
- Empty: 0 results → empty state with CTA.
- Guest vs auth: identical (no personal strip).

**Edge cases:** No results → empty state, not blank grid. Long filter list: horizontal scroll with fade. Very many results: show first 16, "View more" is visual only in prototype (no infinite scroll).

**Visual priority:** Search → filters → grid. Filters are 1 line, not a sidebar, to keep density low.

**UX rationale:** Discover justifies itself by being the *only* place with persistent search + filters + count + empty state. Home never shows a full grid; Discover never shows hero/recommendation rails. If either screen steals the other's content, the product feels duplicative. Single-select chips keep the prototype simple and prevent combinatorial variant explosion.

---

### 7.3 Book Detail

**Purpose:** Decision support. Help the student answer "should I borrow this?" before asking them to commit.

**User goal:** "Tell me if this book is right for me and whether I can borrow it now."

**User state:** Guest and authenticated see identical content; only the primary CTA's *consequence* differs (guest hits auth gate next step).

**Entry points:** Any book card from Home or Discover (with book context — at least title, cover, author).

**Exit points:** → Borrow (primary), → Discover/Home (Back), → Login (indirect via Borrow if guest).

**Information hierarchy (left → right, desktop editorial):**
- **Left (55%):** Cover (large, 3:4, 480×640, subtle shadow, not floating) + secondary metadata below
- **Right (45%):** Title → Author → Category badge + availability badge → rating + meta (pages, year, language) → description → primary CTA → secondary details

Exact stacking:
1. Cover (left)
2. Title 32 Bold, Author 16 Regular #444, badges: `Programming` pill + `Available` green dot/pill or `Borrowed until 28 Sep` amber
3. Rating row: `★ 4.8 (1,240)` + `· 464 pages · 2008 · English` (12 Regular #666)
4. Description: 3–4 lines, 15 Regular #333, line-height 1.6, readable measure (~60ch), expand not needed in prototype
5. CTA block: `Borrow this book` (primary, full width of right column, 48h) + `Back to discover` (text link) + availability note `Returns in 14 days · Pickup at Library`
6. Bottom: Minimal details table (Publisher, ISBN) — muted, 13 Regular, not a second CTA.

**Content:**
- Book shown in all prototype flows: `Clean Code — Robert C. Martin — Programming — ★ 4.8 — Available`. Alternate books for rails but Detail always shows one book consistently for the happy path (prevents content mismatch in prototype).
- Availability must be visible *before* the CTA, not after click.
- Description: realistic blurb (2–3 sentences, not lorem). Example: "A handbook of agile software craftsmanship. Martin shows how to write readable, maintainable code through principles, patterns, and real examples."
- No reviews list (out of scope, would bloat). No "similar books" carousel here (that belongs to Home/Discover).

**Primary action:** `Borrow this book` — 48h, black fill, white text, 16 Medium, corner 10, full right-col width. Fixed below description, not floating. Label is verb, not noun.

**Secondary action:** `Back` (top-left arrow + "Back to discover" or text link under CTA). Not a duplicate primary.

**Navigation:** Nav stays (Detail has no active nav highlight — it is not Home/Discover; or Discover stays subtle active — chosen to be no highlight, with Back as primary nav). Cover image not clickable.

**Components:** Cover card, badge, rating row, description block, CTA button, back link, metadata table.

**Interactive elements:** `Borrow this book` click (→ Borrow if auth, → Login with intent if guest), `Back` click (→ Discover with prior state), cover hover (no action, not zoom).

**Prototype transitions:** `BOOK DETAIL → BORROW` (if authed) or `BOOK DETAIL → LOGIN` (if guest, but implemented as `DETAIL → BORROW` that *immediately* shows login gate — see §9 for pattern), `BOOK DETAIL → DISCOVER` (Back).

**State variations:**
- Available: CTA enabled, badge green `Available`.
- Unavailable (edge, not happy path): CTA disabled with label `Currently borrowed — available 28 Sep` + secondary `Notify` not needed (skip for prototype). Keep one state (available) for runnable flow; unavailable only as noted edge.
- Guest vs authed: identical visual; CTA click outcome differs (see auth).

**Edge cases:** Long title: 2 lines max. Unavailable book: do not hide CTA, disable with explanation. Missing rating: omit row, don't show 0.0.

**Visual priority:** Cover + title → availability → CTA. Description is important but secondary to decision badges.

**UX rationale:** Detail must be *editorial* and *scannable*. Cover large enough to be emotional, not thumbnail. CTA is the visual anchor on the right column — the user lands, scans cover/title/availability in an F-pattern, then hits Borrow. No competing "Add to wishlist" or "Share" to dilute intent.

---

### 7.4 Login

**Purpose:** Auth gate that *preserves borrowing intent*. Not a destination, an interruption.

**User goal:** "Let me sign in quickly so I can finish borrowing this book."

**User state:** Only guest sees this (authenticated never lands here unless via nav Sign in). Two modes: `borrow-intent` vs `generic` (My Loans gate).

**Entry points:** `BORROW` as guest (borrow intent), `MY LOANS (guest)` → Sign in, `Nav: Sign in` (generic).

**Exit points:** → Borrow (with book context, primary return), → My Loans (if entry was My Loans gate), → Home/Discover (if user abandons — Back or close), → Borrow again after success implicitly.

**Information hierarchy:**
1. Context banner (borrow-intent mode only): `Sign in to borrow "Clean Code"` + small cover thumbnail 40×56 + author line. This is the critical intent-preservation element.
2. Form card centered (360–400 width, white, 1px border, 16 radius, 40 padding):
   - Title `Sign in` 24 Bold
   - Subtitle mode-aware: borrow-intent → `You need an account to borrow this book.` generic → `Access your loans and history.`
   - Email input (prefilled prototype: `shapiere@student.ac.id`)
   - Password input (dots, `••••••••`)
   - `Forgot password?` link (stub, not a screen)
   - Primary `Sign in` button (full width, 44h)
   - Divider `or`
   - `Continue as guest` / `Back` text link
   - Small foot `Don't have an account? Create one` (link stub — not a screen, keep one auth screen)
3. Trust note: `Your borrowing intent is saved — you'll return to borrowing Clean Code.`

**Content:**
- Inputs: labels 13 Medium #111, placeholders 14 Regular #999, 44h inputs with 8 radius, 1px #E0E0E0 border, focus black ring.
- Prefilled for prototype convenience; real typing not required but field is editable in Figma if reviewer wants.
- No social login buttons (Google/Figma) — out of scope, would fragment flow.

**Primary action:** `Sign in` — authenticates and *returns to the entry context*: if came from Borrow → back to Borrow (same book, dates preserved conceptually); if came from My Loans → My Loans (authed); if from nav → Home or prior page. Label never "Login" alone without context.

**Secondary action:** `Back` / `Continue as browsing` (text link), `Forgot password?` (stub).

**Navigation:** Minimal — nav hidden or dimmed behind overlay? Decision: Login is a *full page* (not modal) for prototype simplicity (7+ screen count includes it). Nav remains but Login is active (no highlight). Back arrow top-left → returns to caller (Detail or Borrow or My Loans). This avoids modal complexity in Figma prototyping.

**Components:** Context banner card (cover + title), form card, inputs, primary button, divider, text links.

**Interactive elements:** Input focus, `Sign in` click (→ return destination), `Back` click (→ caller), `Forgot password?` (no transition — prototype note).

**Prototype transitions:** This is the critical auth-continuity wiring:
- `BORROW (guest) → LOGIN (with Clean Code context) → BORROW (authed, same book)` — NOT via Home.
- `MY LOANS (guest) Sign in → LOGIN (My Loans context) → MY LOANS (authed)`.
- `LOGIN: Back → caller` (Detail/Borrow/My Loans).

In Figma: use separate Login frames for each context variant (Login·BorrowIntent vs Login·MyLoans vs Login·Generic) OR one Login with interactive component variant — chosen at design to be *one Login frame with context banner as variant*.

**State variations:**
- Generic (nav entry): no book banner, subtitle generic.
- Borrow intent: banner with book cover + "Sign in to borrow Clean Code".
- My Loans gate: banner `Sign in to view your loans`.
- Error: `Incorrect email or password.` inline under password (prototype variant, not default). Keep happy path as default variant.

**Edge cases:** Wrong password → inline error, CTA stays enabled. Empty fields → CTA disabled with helper "Enter both fields". Abandon → Back returns without auth. No loading spinner needed (prototype: instant success).

**Visual priority:** Context banner → form title → inputs → Sign in CTA. Banner is the comprehension anchor.

**UX rationale:** The worst campus-system pattern is `try to borrow → login → dump on Home, intent lost, user must re-find the book`. LIBRA inverts that: Login *explains why* and *promises return*, then fulfills. The book thumbnail in Login is not decoration — it is continuity. One Login screen with context variants prevents screen explosion (no separate Register/Forgot screens — they are stubs).

---

### 7.5 Borrow

**Purpose:** Collect the *minimum* needed to borrow — dates and pickup — with zero duplicated identity input.

**User goal:** "Confirm what I'm borrowing and tell the system when/where I'll pick it up."

**User state:** Only authenticated sees real Borrow (guest is intercepted to Login before reaching here; if they reach Borrow URL directly, show Login). No guest Borrow form.

**Entry points:** `BOOK DETAIL → Borrow this book` (authed), `LOGIN → BORROW` (return post-auth, same book). No direct nav entry.

**Exit points:** → Confirmation (Continue), → Book Detail (Back).

**Information hierarchy (card, centered, 640 width):**
1. Page title `Borrow` 28 Bold + subtitle `Review your borrowing details`
2. Book summary row (read-only, not editable):
   - Cover thumb 56×76 + `Clean Code — Robert C. Martin — Programming` + `Available`
3. Borrower row (read-only):
   - `Borrower: Shapiere Januar` + `Student ID: 2024XXXX` (or just name — ID optional, muted 13 #666)
4. Form fields (only editable):
   - `Borrow date` (date picker, default today: `24 Sep 2026`) — 50% width
   - `Return date` (date picker, default +14 days: `08 Oct 2026`) — 50% width, with helper `Loan period: 14 days · Late returns may incur fees` (prototype note, no real fee logic)
   - `Pickup method` (select: `Library Pickup — Main Library, 1st Floor` default; alternative `Locker Pickup` as disabled/coming soon)
5. Note: `You'll confirm details on the next step.`

**Content — fields:**
- Dates: Native date inputs 44h, 8 radius, calendar icon, format `DD MMM YYYY`. Prototype default values static; interaction swaps to date picker overlay variant (optional Figma component).
- Pickup: Dropdown 44h, single value for prototype: `Library Pickup`. Not a free text.
- No address, no phone, no reason, no admin notes — intentionally omitted per decision #7.
- No quantity (always 1 copy in prototype).

**Primary action:** `Continue` (or `Review borrowing` — label decision: `Continue` is shorter and fits F-pattern; but context says `Confirm` is next step's label, so Borrow uses `Continue` to signal progress) — black fill, 48h, bottom-right of card.

**Secondary action:** `Back` top-left → Book Detail. Also text `Cancel` under Continue is not needed; Back covers it.

**Navigation:** Nav remains (no active highlight; Borrow is modal in feel but page in prototype). Back arrow is the primary nav.

**Components:** Page header, book summary row (cover+meta+availability), borrower read-only row, date inputs (×2), select, helper text, primary CTA, back link.

**Interactive elements:** Date pickers (click → calendar overlay → value change), pickup select (click → dropdown → selection), `Continue` → Confirmation, `Back` → Detail.

**Prototype transitions:** `BORROW → CONFIRMATION` (Continue), `BORROW → BOOK DETAIL` (Back). Login return flow lands back here with same book/dates (dates reset to defaults is acceptable in prototype).

**State variations:**
- Default: Borrow date = today, Return = +14d, Pickup = Library Pickup.
- Date edited: Return updates helper to `13 days` etc. (variant only, not real calc needed).
- Unavailable book attempt: not wired — Borrow not reachable for unavailable book in happy path.
- Guest: not shown — replaced by Login.

**Edge cases:** Return before Borrow → inline error `Return date must be after borrow date.` (prototype variant). Pickup unchanged: no error. Overdue risk: not enforced in prototype.

**Visual priority:** Book row → Borrower row → Dates (side-by-side, the form's core) → Pickup → Continue. Book and borrower are read-only calm; dates are the only editable focus.

**UX rationale:** Campus systems love re-asking identity, phone, address, and reason for borrowing — all already known or irrelevant. LIBRA asks only what *changes per loan* (when, where). Showing Borrower and Book read-only builds trust ("system knows me, system knows what I want") and reduces perceived effort. One primary CTA at card end completes the F-pattern.

---

### 7.6 Confirmation

**Purpose:** Review gate. Let the student verify before commitment. No surprise success.

**User goal:** "Did I get everything right? Let me check once more before I confirm."

**User state:** Authenticated, coming from Borrow with provisional dates/pickup.

**Entry points:** `BORROW → Continue`.

**Exit points:** → Success (Confirm borrowing, primary), → Borrow (Back, secondary).

**Information hierarchy (card, centered, 640 width, same as Borrow for continuity):**
1. Page title `Confirm borrowing` 28 Bold + `Check your details before confirming`
2. Review block — Book:
   - Cover 56×76 + `Clean Code — Robert C. Martin` + `Programming · Available`
3. Review block — Borrower:
   - `Borrower: Shapiere Januar`
4. Review block — Dates:
   - `Borrow: 24 Sep 2026` + `Return: 08 Oct 2026` + pill `14 days`
5. Review block — Pickup:
   - `Pickup: Library Pickup — Main Library, 1st Floor`
6. Note: `By confirming, you agree to return by the due date.`

**Content:** All values are *read-only echoes* of Borrow. No editing here — edit requires going Back. This is intentional (review, not re-edit). Visual grouping: 1px dividers between blocks, 20 padding per block.

**Primary action:** `Confirm borrowing` — black fill, 48h, bottom-right, full card width on mobile but bottom-right on desktop. Label is verb phrase, not "Submit".

**Secondary action:** `Back` top-left → Borrow (to edit). Also text link `Back to edit` under primary if redundancy desired — but top Back suffices; choose one.

**Navigation:** Same as Borrow (no nav highlight). Back is explicit.

**Components:** Review card with 4 blocks (book, borrower, dates, pickup), pill for loan period, primary CTA, back link.

**Interactive elements:** `Confirm borrowing` → Success, `Back` → Borrow.

**Prototype transitions:** `CONFIRMATION → SUCCESS` (Confirm), `CONFIRMATION → BORROW` (Back). No branching.

**State variations:** Only one (review). No error state — validation happened in Borrow. If dates invalid, user would have been stopped earlier.

**Edge cases:** User clicks Back, changes dates, returns — Confirmation reflects new dates (prototype shows one consistent set; variant handling optional).

**Visual priority:** Title → book block → dates (the user checks dates most carefully) → Confirm CTA. Dates block gets slightly more visual weight (pill + bold).

**UX rationale:** Decision #8 says Borrow must not go directly to Success — confirmation prevents regret and teaches the model (loan is a commitment with a due date). Making values read-only here is not duplication; it is *interruption for attention*. The user who skimmed Borrow will read Confirmation. One CTA at the end is the commitment moment.

---

### 7.7 Success

**Purpose:** Closure and next-step guidance. Answer what happened, what was borrowed, when to return, what to do next.

**User goal:** "Did it work? What do I do now? When do I return it?"

**User state:** Authenticated, immediately after Confirm.

**Entry points:** `CONFIRMATION → Confirm borrowing` only.

**Exit points:** → My Loans (primary: View my loans), → Home (secondary: Back to home).

**Information hierarchy (centered card, 560 width, celebratory but restrained):**
1. Success icon: check circle 48, black fill / white check (not green, not confetti)
2. Title `Borrowed!` or `You borrowed Clean Code` 28 Bold
3. Subtitle `Your borrowing is confirmed.` 15 Regular #555
4. Book row: Cover 72×96 + `Clean Code — Robert C. Martin` + `Borrowed on 24 Sep 2026`
5. Due highlight: Card-in-card with `Due: 08 Oct 2026` 18 Medium + `14 days · Library Pickup — Main Library, 1st Floor` 13 Regular #666
6. Next-step note: `Pick up your book at the Library Pickup desk by the borrow date.`
7. CTAs: `View my loans` (primary, black, 48h, full card width) + `Back to home` (text link / outlined, 44h)

**Content:**
- Icon not animated in prototype (static).
- Due date is the *hero* of this screen — bold, inside a tinted card (#F6F6F6 or #111 text on #F5F5F5).
- Book row confirms *what* was borrowed (cover again for emotional closure).
- No order number needed (library doesn't need it); but could add `Borrow ID: #LIB-2026-0924` as muted 12 #999 if desired — not required, keep minimal.

**Primary action:** `View my loans` → My Loans (shows the new loan added).

**Secondary action:** `Back to home` → Home (for browsing more). Also supports `Done` mental model.

**Navigation:** Nav remains (Success has no active highlight). No Back to Confirmation (the transaction is done; back would be confusing). Browser back not wired to re-confirm.

**Components:** Success icon, title, subtitle, book row, due highlight card, primary CTA, secondary CTA.

**Interactive elements:** `View my loans` → My Loans, `Back to home` → Home.

**Prototype transitions:** `SUCCESS → MY LOANS` (primary), `SUCCESS → HOME` (secondary).

**State variations:** One state (the happy borrowed book). Variant for different book title/due date not needed in prototype — keep consistent Clean Code + 08 Oct 2026.

**Edge cases:** Duplicate success (user refreshes): not applicable in prototype. Show one success per flow.

**Visual priority:** Icon + title → due card (most important actionable info) → book row → CTAs. Due card is the eye anchor.

**UX rationale:** Success must answer three questions *above the fold*: what happened (Borrowed!), what (Clean Code), when (Due 08 Oct). The next step is obvious: View my loans (primary) for the conscientious student, Back to home for the browser. Two CTAs here is the one exception to "one primary per screen" — but hierarchy is clear (filled vs text).

---

### 7.8 My Loans

**Purpose:** Loan management — the student's borrowing home. Current + history, plus status and due urgency.

**User goal:** "What do I have out? When is it due? What have I borrowed before?"

**User state:** Two radically different states — guest gate vs authenticated content (but one screen, two variants).

**Entry points:** Nav `My Loans` (guest or authed), `HOME: Current loan strip → View` (auth), `SUCCESS: View my loans`.

**Exit points:** → Book Detail (click any loan card to re-view book), → Discover/Home (Browse/Borrow more), → Login (from guest gate), → Detail re-borrow (from history card's Borrow again, optional).

**Information hierarchy (authenticated, 960 content width centered):**
1. Page header: `My loans` 28 Bold + count `1 active · 3 returned` 14 Regular #666 + tabs `Active | History` (or single list with divider — decision below: tabs, default Active)
2. Active section:
   - Loan card (full width, 1px border, 12 radius, 20 padding, white):
     - Cover 64×88 left + title/author + badge `Borrowed` or `Due soon` (amber if ≤3 days) + dates `Borrowed 24 Sep 2026 · Due 08 Oct 2026` + `Pickup: Library Pickup` + progress hint `Due in 14 days`
     - Right side: `View details` text link or `Details` (→ Book Detail)
   - If multiple active: list, newest first.
   - If zero active: empty `No active loans — [Browse books]` (see states)
3. History section (below or tab):
   - `Borrowing history` 18 Medium + count
   - History row cards (muted, 56×76 cover, title, author, `Returned 10 Sep 2026` or `Overdue` red if applicable — but happy path uses returned)
   - Each row clickable → Book Detail
4. Summary footer: `You have borrowed 4 books total.`

**Guest gate variant (when unauthenticated clicks My Loans):**
- Same page header `My loans` 28 Bold
- Centered empty-state card (480 width, 60 padding, border, 12 radius):
  - Icon: book stack or lock (outline, 32, #999)
  - Title `Sign in to view your loans` 20 Bold
  - Body `Track your current borrowing, due dates, and history in one place.` 14 Regular #666
  - Primary `Sign in` button 44h black → `LOGIN (My Loans context)`
  - Secondary `Browse books` text link → `DISCOVER`
- No loan list, no skeleton. Not a dead end.

**Content details:**
- Tabs vs single list: Choose *tabs* (`Active | History`) for prototype clarity — fewer visual sections competing. Active tab default. History tab shows returned list. Alternate: single page with divider — tabs win because "where is my active loan?" must be instant, not scrolled past history.
- Status badges: `Borrowed` (black pill), `Due soon` (amber #FFB020 text on #FFF7E6), `Overdue` (red, edge only), `Returned` (grey #E9E9E9). Happy path uses Borrowed.
- No action buttons like Renew/Return in scope — prototype intentionally not a circulation system; re-borrow from history is optional secondary, not required.

**Primary action:** (Guest gate) `Sign in` → Login (My Loans context). (Authenticated) `Browse books` if empty, otherwise implicit: `View details` on active card → Detail.

**Secondary action:** `Browse books` / `Discover` link, tab switch.

**Navigation:** Nav `My Loans` active (underline) in both states.

**Components:** Page header, tabs, loan card (cover, title, meta, badge, dates), history row card, guest gate card (icon, title, body, CTA), empty state.

**Interactive elements:** Tab click (variant swap Active ↔ History), card click → Book Detail, `Sign in` (guest) → Login, `Browse books` → Discover, `View details` → Detail.

**Prototype transitions:** `MY LOANS (guest) Sign in → LOGIN (My Loans) → MY LOANS (authed)`, `MY LOANS ↔ BOOK DETAIL` (card clicks), `MY LOANS (empty) Browse → DISCOVER`, tab switches as component interaction or frame variant.

**State variations:**
- Guest gate: sign-in CTA card (described).
- Authenticated empty: `No active loans · Browse` + history may still show past loans.
- Authenticated active (happy path): 1 active Clean Code + 3 history items.
- Authenticated history tab: shows returned list.
- Due-soon variant: badge amber if prototype wants to demo urgency (optional, not required for runnable path).

**Edge cases:** Zero active + zero history (new account): show `No borrowing yet — discover your first book · [Browse]` centered. Many loans: list scrolls, prototype shows 1 active + 3 history to prove pattern.

**Visual priority:** Header → Active loan card (hero, bordered, bold dates) → History. Active loan is the only item that needs immediate comprehension.

**UX rationale:** My Loans is not an admin table; it is a personal progress page. One active card with due date prominent answers the student's anxiety ("when do I return it?"). History is secondary, muted. Guest gate as a *designed state* (not empty list) teaches the model and converts — dead-end empty list would feel broken. Tabs prevent history from burying the active loan.

---

## 8. Interaction Map

Prototype is desktop click-only; no hover-dependent flows.

**Frame list (Figma, each 1440×900):**
`HOME` · `DISCOVER` (+ filtered variants as overlays or frames) · `BOOK DETAIL` · `LOGIN` (3 context variants as component states or 3 frames) · `BORROW` · `CONFIRMATION` · `SUCCESS` · `MY LOANS` (guest + authed + history tab)

**Wired transitions (all must exist in Figma prototype, present settings: `On click → Navigate to → Instant/Dissolve 150ms`):**

| From → To | Trigger | Condition | Transition |
|-----------|---------|-----------|------------|
| HOME → DISCOVER | Click `Discover` nav / Search / Category / View all | — | Instant |
| HOME → BOOK DETAIL | Click any rail card | — | Instant |
| HOME (auth strip) → MY LOANS | Click `View` on current-loan strip | Auth only | Instant |
| DISCOVER → BOOK DETAIL | Click any grid card | — | Instant |
| DISCOVER ↔ filtered | Click filter chip / sort / clear | — | Overlay swap or variant |
| BOOK DETAIL → BORROW | Click `Borrow this book` | Authed | Instant |
| BOOK DETAIL → LOGIN | Click `Borrow this book` | Guest | Instant (Login shows borrow-intent banner) |
| BOOK DETAIL → DISCOVER | Click `Back` | — | Instant |
| MY LOANS (guest) → LOGIN | Click `Sign in` | Guest | Instant (Login shows My Loans banner) |
| LOGIN → BORROW | Click `Sign in` (success) | Came from Borrow | Instant (return intent) |
| LOGIN → MY LOANS | Click `Sign in` (success) | Came from My Loans | Instant |
| LOGIN → caller | Click `Back` | — | Instant (to Detail/Borrow/My Loans) |
| BORROW → CONFIRMATION | Click `Continue` | Authed | Instant |
| BORROW → BOOK DETAIL | Click `Back` | — | Instant |
| CONFIRMATION → SUCCESS | Click `Confirm borrowing` | — | Instant |
| CONFIRMATION → BORROW | Click `Back` | — | Instant |
| SUCCESS → MY LOANS | Click `View my loans` | — | Instant |
| SUCCESS → HOME | Click `Back to home` | — | Instant |
| MY LOANS (authed) → BOOK DETAIL | Click loan/history card | — | Instant |
| MY LOANS tabs | Click `Active` / `History` | — | Component swap |

**Prototype affordances:**
- Back arrows are top-left, 14 Medium + `← Back` (not just icon).
- Primary CTAs are bottom-right of card (Borrow, Confirmation) or full-width (Success, Login) — consistent per screen type.
- Overlay kinds: filter dropdown, date picker — use Figma overlay + `Close on click outside` if built as components.

**Unwired (intentionally):** `Forgot password?`, `Create account`, `Renew`, `Notify when available` — visible as stubs if desired but not wired.

---

## 9. Authentication Behavior

**Principle:** Login preserves intent and explains *why*.

**Entry contexts and Login banner mapping:**

| Entry | Login banner title | Login subtitle | Post-login destination |
|-------|--------------------|----------------|------------------------|
| `BORROW` (guest tried to borrow Clean Code) | `Sign in to borrow "Clean Code"` + 40×56 cover thumb | `You need an account to borrow this book.` | `BORROW` (same book, same provisional dates — return intent) |
| `MY LOANS` (guest clicked My Loans) | `Sign in to view your loans` + stack icon | `Track your current borrowing and history.` | `MY LOANS` (authed, shows loans) |
| `Nav: Sign in` (generic) | `Sign in` (no banner) | `Access your loans and history.` | `HOME` (stays, nav flips to avatar) |

**Rules:**
1. Never `Login → Home` when the login was triggered by a borrowing intent. That is the P0 bug to avoid.
2. Show the book cover+title in Login when intent is borrow. It is not decoration; it is confirmation that "we remembered what you wanted."
3. Trust note under form: `Your borrowing intent is saved — you'll return to borrowing Clean Code.` Visible for borrow-intent mode.
4. Prefill email for prototype (`shapiere@student.ac.id`) to reduce typing; field remains editable.
5. Single Login screen with variant banners (not 3 separate screens) — simplifies Figma and keeps interaction count low.
6. Error state is inline (`Incorrect email or password.`) under password, not a toast. Primary CTA stays enabled (no disabled-until-valid that confuses).
7. Abandon: `Back` returns to caller without auth. No side effects.

**Session handling in prototype:** Authenticated state is a Figma variant, not real session. The prototype must have *both* guest and authed frames wired so a reviewer can walk guest→login→authed without hitting a dead frame.

**Out of scope:** Registration, password reset flow, email verification, social login, sign-out confirmation — all stubs or omitted.

---

## 10. Important States

### 10.1 Guest vs Authenticated shell

- Guest: nav `Sign in` + Home no personal strip + My Loans = gate.
- Authenticated: nav `Avatar Shapiere` + Home personal strip + My Loans = content.
- Both share identical book data (Home rails, Discover grid, Detail). No hidden book.

### 10.2 Login context variants (see §9)

- Borrow-intent vs My Loans vs generic. Same form, different banner/subtitle/return.

### 10.3 Discover filter variants

- Default (All, 128 books), Queried (`Clean Code`, 2–3 results), Filtered (Programming, ~8 results), Empty (0 results + `Clear filters`). Prototype needs at least Default + Filtered + Empty frames/variants to prove search works.

### 10.4 Borrow date variants

- Default (`Borrow: 24 Sep 2026 · Return: 08 Oct 2026 · 14 days`), edited (different return helper), error (`Return must be after borrow`). Only default required for runnable path.

### 10.5 My Loans variants

- Guest gate (sign-in CTA), Auth empty (no active + Browse), Auth active (1 active Clean Code + 3 history), History tab (returned list). Happy path needs guest gate + active.

### 10.6 Detail availability

- Available (happy path, CTA enabled), Unavailable (CTA disabled with `Available 28 Sep`, no Renew) — only Available required; Unavailable noted as edge.

### 10.7 Success due highlight

- Always shows due date card; date consistent with Borrow (08 Oct 2026) — must match, not random.

---

## 11. Edge Cases

| Edge | Screen(s) | Expected handling | Prototyped? |
|------|-----------|-------------------|-------------|
| Guest clicks My Loans | My Loans | Gate card with Sign in + Browse, not empty list | **Yes** |
| Guest clicks Borrow | Book Detail → Login | Login shows "Sign in to borrow Clean Code" + return to Borrow | **Yes** |
| Return date before Borrow date | Borrow | Inline error `Return date must be after borrow date.` CTA disabled until fix | Variant only |
| No search results | Discover | Empty state `No books match "xyz" · Clear filters` | **Yes** |
| Long book title | Home/Detail/My Loans | Clamp title to 2 lines, ellipsis; no layout break | Visual rule |
| Missing cover | Any card | Editorial placeholder (letter + category tint), not broken image | Visual rule |
| Zero active loans, some history | My Loans (authed) | `No active loans — Browse` + history list below | Variant |
| Zero loans total (new account) | My Loans (authed) | `No borrowing yet — discover your first book` centered | Variant |
| Unavailable book | Book Detail | CTA disabled `Currently borrowed — available 28 Sep` + Back | Edge note |
| User abandons Login | Login | Back → caller, no state change | **Yes** |
| Wrong password | Login | Inline error, CTA stays enabled | Variant |
| Direct URL to Borrow as guest | Borrow | Intercept to Login (borrow-intent) — in prototype, Borrow frame only reachable via authenticated path; guest path forced through Login | Rule |
| Many loans | My Loans | List scrolls; prototype shows 1+3 to prove pattern | Rule |
| Pickup not selected | Borrow | Single option defaults to Library Pickup; no free text | Default |

---

## 12. UX Critique

Sincere audit of the 10 locked decisions. For each finding: problem → impact → fix → verdict (keep/revise/remove).

### C1. Login preserves intent — decision is correct, but spec under-defines *how intent is shown*

- **Problem:** "Login must preserve intent" was locked, but no banner, no copy, no return rule was specified. Without explicit UI, an implementer could do the minimal ("login succeeds → Home") and still claim they "preserved intent" by pre-filling nothing.
- **Impact:** High. The entire guest-to-borrowing conversion hinges on this. Loss of intent = user must re-find Clean Code → funnel drop ~30–50% in a student test.
- **Fix:** Ship as §7.4/§9: book thumbnail + explicit title in Login banner + trust note + automatic return to Borrow (not Home). Login has 3 context variants.
- **Verdict:** **REVISE (clarify, keep decision).** Decision stands; execution was ambiguous — now explicit.

### C2. My Loans visible for guest but as gate — decision is correct, but empty-state copy risks being moralizing

- **Problem:** Guest My Loans as dead-end empty list is worse than hiding it, but the proposed gate copy could sound punitive ("You must login to...").
- **Impact:** Low-medium. Tone matters for a premium consumer product; scolding copy breaks premium feel.
- **Fix:** Gate as designed §7.8: icon + `Sign in to view your loans` + body `Track your current borrowing, due dates, and history in one place.` + primary `Sign in` + secondary `Browse books`. Helpful, not blocking. Not "Access denied."
- **Verdict:** **KEEP with copy fix.**

### C3. Home vs Discover duplication — single biggest structural risk

- **Problem:** Brief says Home = curated discovery, Discover = full catalog — but without enforcement, an implementer will ship two pages that both show a grid + search, making one redundant. The campus brief's "7 pages" encourages padding, not clarity.
- **Impact:** High. Duplication makes navigation feel pointless ("why two pages of books?") and doubles Figma work for no user value.
- **Fix:** Hard rule §7.1/§7.2: Home *never* shows a full grid; Discover *never* shows hero/recommendation rails. Home has rails (horizontal) + hero + categories. Discover has persistent search + filters + count + grid. The spec enforces this by listing disallowed content per screen.
- **Verdict:** **REVISE (sharpen, keep both screens but with enforced differentiation).**

### C4. Single Home with personal strip — correct, but personal strip could become a second CTA farm

- **Problem:** "Authenticated Home may add personalized context like recommended for you, current loan, due date" could balloon into a dashboard-in-disguise (3 cards, stats, progress bars).
- **Impact:** Medium. Feature creep turns consumer product into admin panel.
- **Fix:** One strip only (§7.1): `Current loan: Clean Code — Due 02 Oct · View` or `No active loans — Browse`. No stats, no "you borrowed 12 books" on Home. Keep Home's visual weight on discovery, not account.
- **Verdict:** **REVISE (constrain).** Decision kept, but strip is one element, not a dashboard.

### C5. Borrow asks only known-relevant fields — correct, but needs explicit read-only rows to feel trustworthy

- **Problem:** "Don't re-ask borrower info" is right, but if Borrow shows *only* date inputs, the user may wonder "does the system know who I am?"
- **Impact:** Low. Trust, not friction. Showing Borrower + Book read-only rows builds confidence and justifies the minimal form.
- **Fix:** Borrow card shows Book row + Borrower row read-only above editable Dates/Pickup (§7.5). No repeated identity input, but identity is visible.
- **Verdict:** **KEEP with addition of read-only context rows.**

### C6. Confirmation mandatory — correct, and must be read-only to force attention

- **Problem:** If Confirmation allows editing, it is just Borrow again and loses its purpose ("am I sure?").
- **Impact:** Medium. Editable confirmation doesn't interrupt skim behavior; user clicks through without reading.
- **Fix:** Confirmation values read-only echoes (§7.6). Editing requires Back → Borrow. One primary `Confirm borrowing`.
- **Verdict:** **KEEP with read-only enforcement.**

### C7. Success next steps — decision is correct, but hierarchy could be muddied by two primaries

- **Problem:** Success has two CTAs; if both are filled buttons, hierarchy collapses.
- **Impact:** Low. User hesitates at the moment of closure.
- **Fix:** Success: `View my loans` (filled primary) + `Back to home` (text/ghost secondary, §7.7). Due date is the hero card, not CTA.
- **Verdict:** **KEEP with hierarchy fix.**

### C8. 8 screens — are all 8 necessary? Audit

- Home, Discover, Book Detail, Login, Borrow, Confirmation, Success, My Loans — each survives the "remove it, what breaks?" test:
  - Remove Home → no curated entry, guest lands cold on grid.
  - Remove Discover → no exhaustive search (Home rails alone can't find arbitrary books).
  - Remove Detail → no decision point (can't borrow from card alone without detail).
  - Remove Login → guest can't borrow (or worse, silent failure).
  - Remove Borrow → no date/pickup collection (can't confirm without data).
  - Remove Confirmation → no review (high regret risk per C6).
  - Remove Success → no closure/due clarity.
  - Remove My Loans → no management (violates brief: "mengelola buku yang dipinjam").
- **Finding:** No redundant screen. No admin filler. Profile is gaming the count — correctly excluded per brief.
- **Verdict:** **KEEP all 8.**

### C9. Success → View my loans vs Back to home — both needed

- Problem if only one: Success → My Loans only would trap browsers who want to continue exploring; Success → Home only would hide proof of borrowing.
- Fix: Both wired, primary My Loans (§7.7).
- Verdict: **KEEP.**

### C10. Discover filters — risk of "filter that does nothing in prototype"

- Problem: Brief says "filtering/sorting secukupnya" and "jangan filter berlebihan" — but prototype filter that doesn't change the grid feels fake, while many filters explode variant count.
- Impact: Low-medium. Fake interactivity breaks trust in review.
- Fix: One filter dimension (Category chips, single-select) + Sort + Availability toggle (§7.2). Wire at least one chip interaction to a filtered grid variant so the prototype *does something*. Not all chips need to be wired — one is enough.
- Verdict: **REVISE (one-dimension filter).**

### C11. Book Detail → Borrow CTA label — impact of wording

- Problem: "Borrow" vs "Borrow this book" vs "Pinjam". Brief is Indonesian context (LMS UI-UX) but product language before was English. Ambiguous.
- Impact: Low, but label is the primary CTA — deserves decision. "Borrow this book" is clearer than bare "Borrow" (verb + object reduces ambiguity: borrow *this* book, not any book).
- Fix: Use `Borrow this book` on Detail (§7.3); `Continue` on Borrow; `Confirm borrowing` on Confirmation. Consistent verb progression (see blueprint).
- Verdict: **KEEP with label lock.**

### C12. Typography/display scale — risk of editorial ambition exceeding readability

- Problem: "Premium, editorial" can push toward large display type + thin weights that are less readable for Indonesian students scanning quickly.
- Impact: Medium. Beauty that costs readability fails the brief's "intuitive".
- Fix: Inter everywhere, Bold for titles (not Light), 32 Bold for Detail title, 28 Bold for page titles, 14–15 Regular for body with 1.6 line-height. Premium comes from spacing and restraint, not thin type.
- Verdict: **CONSTRAIN (principle §2 #11).**

### C13. Prototype transitions — risk of inconsistent motion

- Problem: Figma prototype with mixed `Smart animate`/`Move in`/`Dissolve` feels janky and hides navigation hierarchy.
- Impact: Low. Polish, not function, but noticeable in LMS review.
- Fix: Lock to `Instant` or `Dissolve 150ms` for page-to-page, `Smart animate Ease out 200ms` for overlays only (§7 preamble + §8). One decision, everywhere.
- Verdict: **LOCK.**

### C14. LMS deliverable — language and URL risk

- Problem: Brief says upload Figma share URL to LMS and ensure Figma is accessibly public. Spec-stage should anticipate this so Figma stage doesn't ship a file that is private or non-English in the wrong places.
- Impact: Medium. Private Figma = failed submission even if prototype is perfect.
- Fix: Blueprint note in §14: Figma file must be `Anyone with link can view` + cover + prototype starting frame set + URL capture in next report. Keep product language English but accept Indonesian course context — toggling language mid-product is not in scope; keep English for prototype and note LMS submission language.
- Verdict: **ADVISORY.**

---

## 13. Recommended Revisions

Applied in this spec; listed for decision audit.

1. **Login intent banner + trust note + return rule** — Add to Login (borrow-intent). Revise spec to require `Sign in to borrow "Clean Code"` + cover thumb + `Your borrowing intent is saved — you'll return to...` + destination table §9. **Status: REVISED.**
2. **Home vs Discover content firewall** — Enforce: Home = no full grid, Discover = no hero/rails. **REVISED.**
3. **Home personal strip limited to one element** — Not a dashboard. One strip in Home §7.1. **CONSTRAINED.**
4. **Borrow read-only context rows** — Add Book + Borrower read-only rows above dates §7.5. **ADDED.**
5. **Confirmation read-only** — Values echoed, edit via Back only §7.6. **ENFORCED.**
6. **Success CTA hierarchy** — Primary `View my loans` filled, secondary `Back to home` ghost §7.7. **FIXED.**
7. **Discover filters: single category chip dimension** — One functional chip interaction minimum; rest single-select §7.2. **SIMPLIFIED.**
8. **CTA label progression** — Lock: Detail `Borrow this book` → Borrow `Continue` → Confirmation `Confirm borrowing` → Success `View my loans`. **LOCKED.**
9. **Typography: Inter Bold, not Light** — Readability over delicacy §2/#11. **CONSTRAINED.**
10. **Transitions locked** — Instant/dissolve + smart animate only for overlays §7/§8. **LOCKED.**
11. **No extra screens** — Keep 8, no Profile, no gamification, no admin, no payment. **CONFIRMED.**
12. **LMS public-link requirement** — Flagged for Figma stage, not this stage §14. **FLAGGED.**

Nothing removed from the original 10 decisions; all were kept but 8 were sharpened/constrained. No decision was deleted.

---

## 14. Final UX Blueprint

**The one runnable prototype path the Figma must ship (verbatim for implementation):**

```
HOME (guest, 1440×900, hero + search + Recommended rail + Trending rail + Categories)
 → [click any book card or Search "Clean" or Category chip] →
DISCOVER (header + sticky search + Category chips single-select + Sort + Available toggle + book grid 3–4 col)
 → [click Clean Code card] →
BOOK DETAIL (left: cover 480×640; right: title/author/badges/rating/472pp description + Borrow this book primary 48h)
 → [click Borrow this book AS GUEST] →
LOGIN (full page, 360–400 centered card, banner: Sign in to borrow "Clean Code" + 40×56 thumb + trust note; inputs email/password; primary Sign in 44h full width)
 → [click Sign in] →
BORROW (centered 640 card: book row read-only + borrower read-only + Borrow/Return dates side-by-side 44h + Pickup select + note + Continue 48h bottom-right + Back top-left)
 → [click Continue] →
CONFIRMATION (same 640 card, read-only echo: book/borrower/dates/pickup + pill 14 days + Confirm borrowing primary 48h + Back)
 → [click Confirm borrowing] →
SUCCESS (centered 560 card: check icon 48 + Borrowed! + subtitle + book row 72×96 + due highlight Due: 08 Oct 2026 card + View my loans primary full width 48h + Back to home text link)
 → [click View my loans] →
MY LOANS (authenticated, 960 content: header My loans + tabs Active|History + Active card: cover 64×88 + Clean Code + Borrowed + Borrowed 24 Sep · Due 08 Oct + Due in 14 days + View details + History below with 3 returned rows)
```

**Secondary wiring that must also be interactive (not just on the happy path):**

- Home personal strip → My Loans (auth), Home → Detail via every rail, Discover filtered variant (one chip wired), Discover empty state with Clear filters, My Loans guest gate → Login (My Loans context) → My Loans authed, all Back links, Success → Home, My Loans card → Detail, tabs Active/History.

**Component inventory for Figma (build once, reuse):**

- `Nav` (guest + authed variant), `BookCard` (cover + title + author + badge + dot), `Rail` (horizontal row with arrows), `Chip` (category), `SearchBar` (with clear + button), `SortDropdown`, `Toggle`, `Cover`, `Badge`, `RatingRow`, `CTA Primary/Secondary`, `BackLink`, `FormInput` (44h), `Select`, `DateInput`, `ReviewBlock`, `Tab`, `LoanCard` (active + history row), `EmptyStateCard`, `GuestGateCard`, `SuccessDueCard`, `Footer`.

**Visual rules locked:**

- Grid 12-col, outer 80, gutter 72. Type Inter only. Primary #111111, border #E9E9E9, muted #666/#999/#555, hairline 1px, radius 8–12–16 per component tier (small:8, card:12, hero:16). White page, no shadows except subtle cover shadow. One icon style (outline linear, no fill). No glass, no gradient, no illustration wall.

**Figma stage constraints for next step:**

- No write until you instruct — this spec is the blueprint.
- When writing, one file only (or reuse `40j4sqzxa75EWULqvhMq4w/Harness-MCP-Testing` if you prefer, but do NOT overwrite Write Test file `htD39aOXiXsDKRGmKATTTg`). File naming per next instruction.
- Must ship: 8 frames 1440×900, correct inter-frame navigation table §8, overlay handling for filters/dates, cover + real copy (Clean Code etc., not lorem for hero/detail), public link `Anyone with link can view`, prototype start frame = HOME, URL captured in LMS report.

**What this spec deliberately does not include:**

- Profile screen, admin, stock/quantity logic, real fee/overdue enforcement, wishlist/share, review list, similar books, social login, registration flow, password reset flow, pagination beyond 16-card illusion, notification system.

---

*End of LIBRA UX Screen Specification v1 — ready for Figma. Awaiting your go-ahead for design generation.*
