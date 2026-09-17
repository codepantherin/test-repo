# Arsh Dhiman — Portfolio

A static portfolio site for Arsh Dhiman, graphic designer. Built with hand-authored HTML, CSS, and vanilla JavaScript with GSAP animations.

## Pages

| Route | Description |
|---|---|
| `/index.html` | Landing page — hero, about, portfolio, services, contact. |
| `/about.html` | About page — mission, team, and contact CTA. |

> Adding a new page? Register it in the table above, add it to the shared `<nav class="nav-links">` markup, and (if applicable) include it in `sitemap.xml`.

## Project Structure

```
.
├── index.html          # Landing page
├── about.html          # About page
├── styles.css          # Global stylesheet (design tokens in :root)
├── script.js           # GSAP animations, smooth scroll, nav behavior
└── README.md
```

### Design System

All colors, typography, and spacing are driven by CSS custom properties declared in `:root` inside `styles.css`. Do not hard-code colors or font sizes in markup — extend the token set instead.

Key tokens:

- `--bg`, `--text`, `--accent`, `--gray`
- `--card-bg`, `--border`
- `--shadow`, `--shadow-hover`

Shared component classes:

- `.btn` — primary action button (used across hero, forms, and CTAs)
- `.section` + `.section-header` + `.section-number` + `.section-title` — consistent section framing
- `.service-card`, `.portfolio-item` — reusable card primitives

### JavaScript Behavior

`script.js` progressively enhances the page:

- Adds a `.no-js` fallback that renders hero content if GSAP fails to load.
- Animates hero entrance, section headers, and scroll-triggered reveals via GSAP + ScrollTrigger.
- Smooth-scrolls in-page `#anchor` links.
- Toggles `.header.scrolled` past 50px of scroll.
- Handles the contact form submit as a placeholder (no backend).

Animations are layered on top of rendering — the site remains usable with JavaScript disabled.

## Local Development

No build step. Serve the directory over HTTP (needed for relative asset paths to behave like production):

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx serve .
```

Then open http://localhost:8080.

## Conventions

- **Semantic HTML**: one `<h1>` per page, real landmark elements (`header`, `nav`, `main`, `footer`).
- **Accessibility**: meaningful `alt` text, adequate color contrast, keyboard-operable links and form controls.
- **No inline styles** in HTML (the single exception is the anti-FOUC `.no-js` block in `<head>`).
- **No lorem ipsum** in committed content — use structurally accurate placeholder copy and mark blocks with `<!-- TODO(copy): ... -->`.
- **DRY**: nav and footer markup is currently duplicated across pages. If a third page is added, extract to a partial/templating step (e.g. a small build script or static site generator).
- **Images**: always include `width`, `height`, `loading="lazy"`, and `decoding="async"` (except the LCP image, which should use `fetchpriority="high"`).

## Verification Checklist

Before opening a PR:

- [ ] Page renders cleanly at 320px, 768px, and 1280px — no horizontal scroll.
- [ ] Lighthouse: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.
- [ ] W3C Nu HTML validator reports zero errors.
- [ ] All internal links resolve.
- [ ] All images include `alt`, `width`, `height`, and lazy loading where appropriate.
- [ ] New page is listed in the Pages table above.

## License

© 2025 Arsh Dhiman. All rights reserved.
