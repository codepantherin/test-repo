# Harwinder — Portfolio

A fast, accessible, production-grade portfolio built with semantic HTML5, Tailwind CSS (v3), and vanilla ES modules. No framework, no runtime CSS-in-JS, no jQuery — one compiled stylesheet and a handful of small, focused scripts.

## Features

- **Token-driven design system** — colors, typography, spacing, and animations defined once in `tailwind.config.js`.
- **Component layer** — reusable `.btn`, `.card`, `.chip`, `.section` classes defined via `@layer components` in `src/input.css`.
- **Mobile-first responsive layout** — CSS Grid for macro layout, Flexbox for micro layout; verified at 375px, 768px, and 1280px.
- **Accessible by default** — skip link, `aria-labelledby` on sections, `aria-expanded` on the mobile nav toggle, `aria-live` status regions, `aria-invalid` form fields, visible focus rings, and `prefers-reduced-motion` support.
- **Progressive enhancement** — anchor navigation works without JS; the contact form falls back to native HTML validation.
- **Modular JavaScript** — separate modules for navigation, scroll behaviour, project rendering, and form handling.
- **XSS-safe rendering** — all project data is HTML-escaped before interpolation.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | Semantic HTML5 |
| Styles | Tailwind CSS v3 + PostCSS + Autoprefixer |
| Interactivity | Vanilla ES modules |
| Fonts | Inter, JetBrains Mono (Google Fonts) |

## Project Structure

```
portfolio/
├── index.html              # Semantic page shell + all sections
├── package.json            # Build scripts and dev dependencies
├── tailwind.config.js      # Design tokens and content paths
├── postcss.config.js       # PostCSS plugin pipeline
├── src/
│   ├── input.css           # Tailwind directives + @layer components
│   └── js/
│       ├── main.js         # Entry point
│       ├── navigation.js   # Mobile menu toggle
│       ├── scroll.js       # Scroll-spy + reveal animations
│       ├── projects.js     # Project data + renderer
│       └── form.js         # Client-side validation & submission
├── dist/
│   └── styles.css          # Compiled Tailwind output (gitignored)
├── assets/
│   ├── images/
│   │   ├── avatar.webp
│   │   └── projects/*.webp
│   └── favicon.svg
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install

```bash
npm install
```

### Develop

Run Tailwind in watch mode while editing `index.html`, `src/js/**/*.js`, or `src/input.css`:

```bash
npm run dev
```

Then serve the project root over a local web server (e.g. `npx serve .`) and open `index.html`.

### Build

Produce a minified `dist/styles.css` for production:

```bash
npm run build
```

## Deployment

The build output is a static site. Any of the following work as-is:

- **Vercel** — import the repo, build command `npm run build`, output directory `./`.
- **Netlify** — same settings; add a redirect rule if you want clean URLs.
- **GitHub Pages** — run `npm run build`, then publish the repository root from the `main` branch.

## Customization

### Design Tokens

Edit `tailwind.config.js` to change brand colors, fonts, spacing, and animations. The rest of the UI references these tokens through utility classes and the `.btn`, `.card`, and `.chip` component classes in `src/input.css`.

### Content

- **Hero, About, Skills, Contact** — edit the corresponding sections in `index.html`.
- **Projects** — edit the `PROJECTS` array in `src/js/projects.js`. Each entry accepts `title`, `description`, `tech`, `demo`, and `repo`.
- **Contact endpoint** — replace the placeholder `await new Promise(...)` in `src/js/form.js` with your real submission handler (Formspree, an API route, etc.).

### Images

Place your assets under `assets/`. Serve images as WebP and use `loading="lazy"` for anything below the fold.

## Accessibility & Performance

- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Skip-to-content link is the first focusable element.
- `prefers-reduced-motion` disables all animations and transitions.
- Scroll-spy and reveal effects use `IntersectionObserver` — no scroll listeners.
- Single compiled CSS file, ES modules with deferred execution, no runtime CSS-in-JS.

Lighthouse targets: **≥ 95** across Performance, Accessibility, Best Practices, and SEO.

## License

© Harwinder. All rights reserved.
