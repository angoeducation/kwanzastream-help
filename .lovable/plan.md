# KwanzaStream Help Center — Build Plan

A production-ready dark-themed Help Center in Portuguese, modeled on help.twitch.tv, with a landing page, category pages, and article pages.

## Stack note (important)

Your brief specifies React Router DOM, but this project is built on **TanStack Start + TanStack Router** (file-based routing, SSR-ready). Swapping in React Router DOM would break the bootstrap. I'll implement equivalent routes using TanStack Router — same URLs, same UX, fully type-safe. Everything else (React, Vite, TS, Tailwind v4, shadcn/ui, Framer Motion, lucide-react) is already in place or trivially added.

Icons: your brief mixes `lucide-react` and `ti-*` (Tabler) names. I'll use **lucide-react throughout** (Search, Menu, Headset, MessageSquare, Twitter, Instagram, Youtube, etc.) for consistency with the stack.

## Design system

Add tokens in `src/styles.css` under `@theme inline` mapped to CSS variables on `:root` (dark-only — site is always dark, no light mode toggle):

- Colors: `--ks-bg`, `--ks-surface`, `--ks-surface-2`, `--ks-border`, `--ks-border-hover`, `--ks-accent`, `--ks-accent-glow`, `--ks-accent-2`, `--ks-text`, `--ks-muted`, `--ks-success` — exact values from brief.
- Also remap shadcn semantic tokens (`--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--border`, etc.) onto the KS palette so shadcn components inherit the look.
- Fonts loaded via `<link>` in `src/routes/__root.tsx` head: Space Grotesk (700), Inter (400/500/600), DM Mono (400). Register `--font-display`, `--font-sans`, `--font-mono` in `@theme`.
- Radius tokens: `--radius-sm: 6px`, `--radius-md: 12px`, `--radius-lg: 20px`, plus `rounded-full` for pills.
- Shadow utilities: `shadow-card` (`0 1px 3px rgba(0,0,0,0.4)`) and `shadow-accent-glow` (`0 0 24px var(--ks-accent-glow)`) via `@utility`.
- A `useReducedMotion`-aware Motion wrapper so every animation respects `prefers-reduced-motion`.

## Routes (TanStack file-based)

```
src/routes/
  __root.tsx                  → font links, global meta, <Navbar/> + <Outlet/> + <Footer/>
  index.tsx                   → Help Center landing (all 8 sections)
  categoria.$slug.tsx         → /categoria/:slug
  artigo.$slug.tsx            → /artigo/:slug
```

Each route sets its own `head()` with PT title + description + og tags. Navigation uses `<Link to="/categoria/$slug" params={{ slug }}>` — never string interpolation.

A small in-memory content module (`src/content/helpCenter.ts`) holds categories, featured articles, and what's-new entries as typed data so category/article pages can render from the same source.

## Component structure

```
src/components/
  layout/
    Navbar.tsx                → sticky, scroll-aware backdrop, mobile overlay menu
    Footer.tsx                → 4-col grid + bottom bar
  sections/
    Hero.tsx                  → eyebrow + headline + SearchBar + popular tags
    SearchBar.tsx             → controlled input, ⌘K hint, exposes value via context
    CategoryGrid.tsx          → 8 cards, filters live via search context
    FeaturedArticles.tsx      → 2-col split, 5 article rows
    SystemStatus.tsx          → bento status card + tooltip on API indicator
    WhatsNew.tsx              → horizontal snap-scroll, 3 cards
    ContactSupport.tsx        → 55/45 split bento (support + community)
  ui/                         → existing shadcn components reused (Button, Tooltip, Badge, Input)
  article/
    Breadcrumb.tsx
    FeedbackWidget.tsx        → "Foi útil?" thumbs up/down, local state only
    RelatedArticles.tsx
```

A lightweight `SearchContext` (provider in `Hero`) lets `CategoryGrid` filter/highlight cards as the user types — title + description + category name matched, with matched substring wrapped in a `<mark>` styled to accent color. No backend.

## Sections — implementation notes

1. **Navbar** — `useScroll` from Framer Motion (or scroll listener) toggles `backdrop-blur-xl bg-[rgba(11,11,15,0.85)]` past 60px. Mobile: full-screen overlay, staggered link entry. Active link detection via `useRouterState`/`useMatchRoute`.
2. **Hero** — radial gradient overlay via a single absolutely-positioned div. Search input is 56px, focus ring uses `--ks-accent-glow`. `⌘K` pill hides on focus; `kbd` listener focuses input on Cmd/Ctrl+K. Page-load stagger via Motion variants.
3. **Category grid** — 8 cards from data file with lucide icons (Rocket, User, Video, Palette, Coins, Shield, Smartphone, Wrench). `whileInView` stagger. Hover lifts `-translate-y-0.5`, border + bg shift, chevron slides in. Each card is a `<Link to="/categoria/$slug">`. Live-filtered by `SearchContext` — non-matching cards fade to 40% opacity rather than unmount, preserving layout.
4. **Featured articles** — 40/60 split (stacks on mobile). Rows with category color dot, hover bg + padding-left transition. Links to `/artigo/:slug`.
5. **System status** — single bento, Activity icon, 4 inline indicators with colored dots. shadcn `Tooltip` on the API indicator.
6. **What's New** — `overflow-x-auto snap-x snap-mandatory`, scrollbar hidden via `[&::-webkit-scrollbar]:hidden`. 3 cards with date + NOVO/ACTUALIZAÇÃO badge.
7. **Contact support** — 55/45 grid; left card has accent radial glow top-left; primary/secondary buttons stacked; right card has 3 community rows with hover bg.
8. **Footer** — 4-col → 2-col → 1-col responsive grid, social icons, bottom bar with language pill.

## Category & article pages

- **`/categoria/:slug`** — Looks up category in content module (404 via `notFoundComponent` if missing). Renders hero strip (icon + title + description + article count), then grid of article cards (title, read time, category dot, excerpt).
- **`/artigo/:slug`** — Breadcrumb (Início › Categoria › Artigo), title, meta row (read time, last updated), placeholder body content using `prose`-style classes (h2 Space Grotesk, body Inter, code blocks DM Mono with `--ks-surface-2` bg). Right rail: related articles list. Bottom: `FeedbackWidget` (local state, toast on submit using existing `sonner`).
- Both routes include `head()` with route-specific title/description/og tags.

## Animations

A single `motion.ts` helper exports variants: `fadeUp`, `fadeIn`, `staggerContainer(delay)`, `cardHover`. Every component imports from it. Variants check `useReducedMotion()` and return identity transforms when true.

Page-load sequence on `/` matches the brief exactly (navbar 0.3s → eyebrow 0.5s @0.1 → headline 0.6s @0.2 → sub 0.5s @0.35 → search 0.5s @0.5 → tags stagger 0.06s @0.7).

Scroll triggers use `whileInView={{ once: true, margin: "-80px" }}` on section wrappers.

## Accessibility & quality

- All interactive elements get `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--ks-accent]`.
- Semantic HTML (`<nav>`, `<main>`, `<section>` with aria-labels, `<article>`, `<footer>`).
- Mobile menu traps focus and closes on Escape.
- All copy in Portuguese, real content per brief — no lorem ipsum.
- No raw hex in JSX — only Tailwind utility classes referencing tokens (e.g. `bg-[--ks-surface]`, or named utilities via `@theme inline` like `bg-ks-surface`).
- `<html lang="pt">` in root shell.

## File list (new)

- `src/styles.css` — extend with KS tokens + utilities (modify existing)
- `src/routes/__root.tsx` — font links, lang, Navbar + Footer wrapper (modify existing)
- `src/routes/index.tsx` — landing (replace placeholder)
- `src/routes/categoria.$slug.tsx`
- `src/routes/artigo.$slug.tsx`
- `src/content/helpCenter.ts`
- `src/context/SearchContext.tsx`
- `src/lib/motion.ts`
- `src/components/layout/{Navbar,Footer}.tsx`
- `src/components/sections/{Hero,SearchBar,CategoryGrid,FeaturedArticles,SystemStatus,WhatsNew,ContactSupport}.tsx`
- `src/components/article/{Breadcrumb,FeedbackWidget,RelatedArticles}.tsx`

## Dependencies to add

- `motion` (Framer Motion for React, the v11+ package name)

`lucide-react`, `react`, `@tanstack/react-router`, Tailwind, and shadcn primitives are already present.

## Out of scope

- No backend, no Supabase — all content is static in `helpCenter.ts`.
- No real search backend — client-side filter only.
- No i18n framework — site is PT-only; language pill is decorative.
- No auth, no analytics, no real ticketing — CTAs are visual.

Ready to build on approval.