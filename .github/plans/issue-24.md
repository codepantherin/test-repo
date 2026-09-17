# Architectural Plan for Issue #24

# Implementation Plan: Add `about.html` Page

## 1. Executive Summary

**Goal:** Introduce a semantic, accessible `about.html` page using placeholder content, integrated into the existing site's design system without introducing new dependencies or architectural drift.

**Scope:** Single new page + minimal shared asset wiring (nav link, shared CSS entry, optional build/config registration).

**Non-goals:** CMS integration, dynamic content, i18n. The page is intentionally static and structure-only.

---

## 2. Design System Selection

**Chosen system: Tailwind CSS (utility-first) with a small design-token layer.**

Rationale:
- Zero runtime overhead (JIT-compiled at build time).
- Composable, DRY primitives via `@apply` for repeated patterns (buttons, cards, container).
- Matches the modern static-HTML use case in the issue ("simple `about.html`").
- Scales cleanly to DaisyUI / Material 3 tokens later without rewrites.

**Fallback (if Tailwind is not already in the project):** ship with a hand-rolled `tokens.css` (CSS custom properties) + `components.css`. Do **not** mix both. Choose one. The plan below assumes Tailwind is installed; a "no-Tailwind" variant is included in §8.

**Design tokens (single source of truth — `tailwind.config.js`):**
```js
theme: {
  extend: {
    colors: {
      brand: { DEFAULT: '#2563eb', fg: '#ffffff', muted: '#eff6ff' },
      ink:   { DEFAULT: '#0f172a', soft: '#475569', faint: '#94a3b8' },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    container: { center: true, padding: '1.25rem', screens: { '2xl': '72rem' } },
  }
}
```

---

## 3. HTML Structure & Layout Strategy

**Semantic layout** — no `div` soup. Structure:

```
<header>          → site nav (shared header partial)
<main>
  <section id="hero">        → Grid (text + illustration)
  <section id="mission">     → Container + prose
  <section id="team">        → CSS Grid, auto-fit, responsive cards
  <section id="contact-cta"> → Flex row, wrap
</main>
<footer>          → shared footer partial
```

**Layout techniques chosen deliberately:**
| Region | Technique | Why |
|---|---|---|
| Page shell | `<body class="min-h-dvh grid grid-rows-[auto_1fr_auto]">` | Sticky footer without hacks. |
| Hero | CSS Grid `md:grid-cols-2` | Two-column on desktop, stacked mobile. |
| Team cards | `grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]` | Responsive without breakpoint sprawl. |
| CTA | Flexbox `flex flex-wrap items-center gap-4` | Natural wrap behavior. |

**Accessibility invariants:**
- One `<h1>` per page.
- Landmark elements (`header`, `main`, `nav`, `footer`) — no `role` needed.
- `aria-label` on icon-only links.
- Sufficient contrast (brand `#2563eb` on white = 4.6:1, passes AA).
- `<img>` uses `width`, `height`, `loading="lazy"`, meaningful `alt`.

---

## 4. Files to Create

| Path | Purpose |
|---|---|
| `about.html` | The new page (see §5 skeleton). |
| `assets/css/about.css` *(optional)* | Only if page-specific styles cannot be expressed in Tailwind utilities. Prefer `@layer components` in the global CSS instead. |
| `assets/img/team/placeholder.svg` | Generic avatar placeholder (DRY across cards). |

## 5. Files to Modify

| Path | Change |
|---|---|
| `index.html` | Add `<a href="/about.html">About</a>` to primary `<nav>`. |
| Shared nav partial (if templating exists: `partials/nav.html`) | Add About link — **prefer this over editing each page**. |
| `assets/css/main.css` (Tailwind entry) | Add `@layer components { .btn { … } .card { … } }` if not present. |
| `tailwind.config.js` | Add `content: ['./**/*.html']` if missing (ensures `about.html` utilities compile). |
| `sitemap.xml` | Add `<url><loc>…/about.html</loc></url>`. |
| Site menu/manifest (if applicable: `_config.yml`, `mkdocs.yml`, Next `app/` layout) | Register route. |
| `README.md` | Document the new route under "Pages". |

---

## 6. Production-Ready `about.html` Skeleton

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>About — Acme</title>
  <meta name="description" content="Learn about Acme's mission, team, and how to get in touch." />
  <link rel="canonical" href="https://example.com/about.html" />
  <link rel="stylesheet" href="/assets/css/main.css" />
</head>
<body class="min-h-dvh grid grid-rows-[auto_1fr_auto] font-sans text-ink bg-white">

  <!-- Shared site header -->
  <header class="border-b border-ink/10">
    <nav class="container flex items-center justify-between h-16" aria-label="Primary">
      <a href="/" class="font-semibold">Acme</a>
      <ul class="flex items-center gap-6 text-sm">
        <li><a href="/index.html" class="hover:text-brand">Home</a></li>
        <li><a href="/about.html" aria-current="page" class="text-brand font-medium">About</a></li>
        <li><a href="/contact.html" class="hover:text-brand">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" class="container py-16 space-y-24">

    <!-- Hero: CSS Grid -->
    <section aria-labelledby="about-title" class="grid gap-10 md:grid-cols-2 items-center">
      <div class="space-y-5">
        <h1 id="about-title" class="text-4xl md:text-5xl font-semibold tracking-tight">
          Building thoughtful software for teams that ship.
        </h1>
        <p class="text-ink-soft text-lg leading-relaxed">
          Placeholder copy — replace with the company story. One or two sentences
          describing the mission and the people behind it.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="/contact.html" class="btn btn-primary">Get in touch</a>
          <a href="/careers.html" class="btn btn-ghost">Join the team</a>
        </div>
      </div>
      <img
        src="/assets/img/team/placeholder.svg"
        alt="Illustration of the Acme team collaborating"
        width="640" height="480" loading="lazy" decoding="async"
        class="w-full h-auto rounded-xl border border-ink/10" />
    </section>

    <!-- Mission: readable prose -->
    <section aria-labelledby="mission-title" class="max-w-3xl">
      <h2 id="mission-title" class="text-2xl font-semibold mb-4">Our mission</h2>
      <p class="text-ink-soft leading-relaxed">
        Placeholder paragraph. Explain the problem the team is solving, the
        principles guiding decisions, and what success looks like.
      </p>
    </section>

    <!-- Team: auto-fit grid -->
    <section aria-labelledby="team-title">
      <h2 id="team-title" class="text-2xl font-semibold mb-6">Meet the team</h2>
      <ul class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] list-none p-0">
        <!-- Repeat 3–4 times -->
        <li class="card">
          <img src="/assets/img/team/placeholder.svg" alt="" width="96" height="96"
               loading="lazy" class="w-24 h-24 rounded-full" />
          <h3 class="mt-4 font-medium">Jane Doe</h3>
          <p class="text-sm text-ink-faint">Co-founder & CEO</p>
        </li>
      </ul>
    </section>

    <!-- CTA: Flexbox -->
    <section class="rounded-2xl bg-brand-muted p-8 md:p-12 flex flex-wrap items-center justify-between gap-6">
      <div>
        <h2 class="text-xl font-semibold">Have a project in mind?</h2>
        <p class="text-ink-soft mt-1">We'd love to hear about it.</p>
      </div>
      <a href="/contact.html" class="btn btn-primary">Contact us</a>
    </section>

  </main>

  <footer class="border-t border-ink/10">
    <div class="container py-8 text-sm text-ink-faint flex flex-wrap gap-4 justify-between">
      <p>© <span id="year"></span> Acme, Inc.</p>
      <ul class="flex gap-4 list-none p-0">
        <li><a href="/privacy.html" class="hover:text-brand">Privacy</a></li>
        <li><a href="/terms.html" class="hover:text-brand">Terms</a></li>
      </ul>
    </div>
  </footer>

  <script>document.getElementById('year').textContent = new Date().getFullYear();</script>
</body>
</html>
```

### DRY component layer (`assets/css/main.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn { @apply inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors; }
  .btn-primary { @apply bg-brand text-brand-fg hover:bg-brand/90; }
  .btn-ghost   { @apply text-ink border border-ink/15 hover:bg-ink/5; }
  .card        { @apply rounded-xl border border-ink/10 p-6 bg-white; }
}
```

---

## 7. Content & Copy Guidelines

Placeholder content must be **obviously placeholder yet structurally accurate**:
- Use `Lorem-ipsum`-free prose that mirrors final length/rhythm (see `figma`-style rationale). This exposes layout issues early.
- Mark every placeholder block with an adjacent `<!-- TODO(copy): ... -->` comment so the content team can grep for `TODO(copy)`.
- Never ship `lorem ipsum` to production — include a Lint rule / CI grep:
  ```bash
  grep -rIn "lorem ipsum" --include="*.html" . && exit 1 || exit 0
  ```

---

## 8. Fallback If Tailwind Is Not Adopted

Replace utility classes with semantic classes and define in `assets/css/main.css`:
```css
:root { --brand:#2563eb; --ink:#0f172a; --ink-soft:#475569; --container:72rem; }
.container { max-width: var(--container); margin-inline: auto; padding-inline: 1.25rem; }
.hero { display: grid; gap: 2.5rem; }
@media (min-width: 768px) { .hero { grid-template-columns: 1fr 1fr; align-items: center; } }
.team { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); }
.btn { display: inline-flex; align-items: center; … }
```
Same HTML otherwise; only the `class` attributes change.

---

## 9. Verification Checklist (Definition of Done)

- [ ] `about.html` renders at 320px, 768px, 1280px without horizontal scroll.
- [ ] Lighthouse: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.
- [ ] `aria-current="page"` set on About nav link.
- [ ] HTML validates against W3C Nu validator (no errors).
- [ ] No inline `style=""` attributes; no duplicated `<nav>` markup across pages (extracted to partial or documented as intentional if static site).
- [ ] `about.html` present in `sitemap.xml`.
- [ ] All images have `alt`, `width`, `height`, and `loading="lazy"` (except LCP image which uses `fetchpriority="high"`).
- [ ] All `TODO(copy)` markers listed in the PR description for the content team.
- [ ] CI grep for `lorem ipsum` passes.
- [ ] Link check: internal links from `index.html` → `about.html` resolve.

---

## 10. PR Delivery Plan

1. **Branch:** `feat/about-page`.
2. **Commit sequence** (atomic, reviewable):
   - `chore(tailwind): register html content globs`
   - `feat(css): add btn/card component layer`
   - `feat(about): add semantic about.html with placeholder content`
   - `feat(nav): link About in shared header`
   - `chore(seo): add about.html to sitemap`
3. **PR description template:**
   - Linked issue, screenshots at 3 breakpoints, axe-core scan output, list of `TODO(copy)` items.
4. **Reviewer focus:** semantics, responsive behavior, a11y landmarks, DRY (no repeated nav/footer markup across pages — if duplication occurs, escalate to partial-templating refactor in a follow-up).

---

## 11. Explicitly Avoided (Anti-Slop Guardrails)

- ❌ Deep `<div>` nesting to achieve layout — replaced with Grid/Flex on semantic elements.
- ❌ Inline styles — banned via ESLint/Stylelint rule.
- ❌ Copy-pasted nav/footer across pages without a partial strategy — flagged for templating.
- ❌ Lorem ipsum in committed code — CI-enforced.
- ❌ Ad-hoc colors/font sizes — all via tokens in `tailwind.config.js`.
- ❌ Icon-only links without `aria-label`.
- ❌ Fixed pixel heights that break on zoom.

---

**Estimated effort:** 2–4 hours for a competent front-end engineer, including a11y checks and responsive polish. **Risk:** Low — additive change; the only cross-cutting touch is the shared nav link, which is idempotent.