# Architectural Plan for Issue #22

# Implementation Plan: Harwinder's Professional Portfolio

## 1. Design System & Architecture Decisions

**Design System: Tailwind CSS (v3) via CDN-to-build pipeline**
- Chosen over Material Design/DaisyUI for granular control, smaller CSS footprint, and JIT compiler output.
- Extended with a custom design token layer (colors, spacing, typography scale) defined once in `tailwind.config.js`.
- Custom component classes via `@layer components` for DRY reuse (`.btn`, `.card`, `.section`, `.container-prose`).

**Layout Strategy**
- **CSS Grid** for macro page layout (section stacking, project gallery `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`).
- **Flexbox** for micro layouts (navigation bar, button groups, skill chips, footer).
- **Mobile-first** breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

**HTML5 Semantics**
- `<header>`, `<nav>`, `<main>`, `<section>` (with `aria-labelledby`), `<article>` for project cards, `<footer>`.
- Skip-link for a11y, focus-visible rings, `aria-expanded` on nav toggle.

**JavaScript Architecture**
- Modular ES modules: `navigation.js`, `scroll.js`, `form.js`, `projects.js`.
- No framework — vanilla JS, event delegation, `IntersectionObserver` for scroll reveal, `requestAnimationFrame` for throttled scroll handlers.
- Progressive enhancement: form works without JS (native validation + `action` fallback).

---

## 2. File Structure

```
portfolio/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── input.css          # Tailwind directives + @layer components
│   └── js/
│       ├── main.js        # Entry point
│       ├── navigation.js  # Mobile menu + smooth scroll
│       ├── scroll.js      # Scroll-spy + reveal animations
│       ├── projects.js    # Project data + renderer
│       └── form.js        # Validation & submission
├── dist/
│   └── styles.css         # Compiled Tailwind output (gitignored)
├── assets/
│   ├── images/
│   │   ├── avatar.webp
│   │   └── projects/*.webp
│   └── favicon.svg
└── README.md
```

---

## 3. Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Create | Tailwind, PostCSS, Autoprefixer, dev server |
| `tailwind.config.js` | Create | Design tokens, content paths |
| `src/input.css` | Create | Tailwind + component layer |
| `index.html` | Create | Semantic page shell + all sections |
| `src/js/*.js` | Create | Modular interactivity |
| `.gitignore` | Modify | Ignore `node_modules/`, `dist/` |

---

## 4. Core Implementation

### `package.json`
```json
{
  "name": "harwinder-portfolio",
  "private": true,
  "scripts": {
    "dev": "tailwindcss -i ./src/input.css -o ./dist/styles.css --watch",
    "build": "tailwindcss -i ./src/input.css -o ./dist/styles.css --minify"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

### `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0f172a", soft: "#1e293b" },
        accent: { DEFAULT: "#6366f1", hover: "#4f46e5" },
        surface: "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: { prose: "72ch" },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: { fadeUp: "fadeUp .6s ease-out forwards" },
    },
  },
  plugins: [],
};
```

### `src/input.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; scroll-padding-top: 5rem; }
  body { @apply bg-surface text-ink font-sans antialiased; }
  :focus-visible { @apply outline-none ring-2 ring-accent ring-offset-2; }
}

@layer components {
  .container-page { @apply mx-auto w-full max-w-6xl px-6; }
  .section       { @apply py-20 md:py-28 scroll-mt-20; }
  .section-title { @apply text-3xl md:text-4xl font-bold tracking-tight mb-10; }

  .btn {
    @apply inline-flex items-center justify-center rounded-lg px-6 py-3
           font-medium transition-colors duration-200;
  }
  .btn-primary { @apply btn bg-accent text-white hover:bg-accent-hover; }
  .btn-ghost   { @apply btn border border-ink/15 text-ink hover:bg-ink/5; }

  .card {
    @apply rounded-2xl bg-white border border-ink/5 p-6 shadow-sm
           transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg;
  }
  .chip {
    @apply inline-block rounded-full bg-accent/10 text-accent
           px-3 py-1 text-xs font-medium;
  }
  .nav-link {
    @apply text-sm font-medium text-ink/70 hover:text-ink transition-colors;
  }
}
```

### `index.html` (key structural excerpts)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Harwinder — Full Stack Web Developer</title>
  <meta name="description" content="Harwinder is a Full Stack Web Developer building fast, accessible, production-grade web applications." />
  <link rel="icon" href="/assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" />
  <link rel="stylesheet" href="/dist/styles.css" />
</head>
<body>
  <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded">Skip to content</a>

  <!-- HEADER / NAV -->
  <header class="sticky top-0 z-50 backdrop-blur bg-surface/80 border-b border-ink/5">
    <nav class="container-page flex items-center justify-between h-16" aria-label="Primary">
      <a href="#home" class="font-bold tracking-tight">Harwinder<span class="text-accent">.</span></a>
      <ul class="hidden md:flex gap-8 items-center">
        <li><a class="nav-link" href="#about">About</a></li>
        <li><a class="nav-link" href="#skills">Skills</a></li>
        <li><a class="nav-link" href="#projects">Projects</a></li>
        <li><a class="nav-link" href="#contact">Contact</a></li>
      </ul>
      <button id="nav-toggle" class="md:hidden p-2 -mr-2" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </nav>
    <div id="mobile-menu" class="md:hidden hidden border-t border-ink/5">
      <ul class="container-page py-4 flex flex-col gap-4">
        <li><a class="nav-link" href="#about">About</a></li>
        <li><a class="nav-link" href="#skills">Skills</a></li>
        <li><a class="nav-link" href="#projects">Projects</a></li>
        <li><a class="nav-link" href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>

  <main id="main">
    <!-- HERO -->
    <section id="home" class="section" aria-labelledby="hero-title">
      <div class="container-page grid gap-10 md:grid-cols-2 md:items-center">
        <div class="animate-fadeUp">
          <p class="text-accent font-mono text-sm mb-4">Hello, I'm</p>
          <h1 id="hero-title" class="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            Harwinder —<br/>Full Stack Web Developer
          </h1>
          <p class="text-lg text-ink/70 max-w-prose mb-8">
            I design and ship performant, accessible web applications end-to-end —
            from pixel-precise UIs to resilient APIs and databases.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="#projects" class="btn-primary">View My Work</a>
            <a href="#contact" class="btn-ghost">Get in Touch</a>
          </div>
        </div>
        <div class="relative justify-self-center md:justify-self-end">
          <img src="/assets/images/avatar.webp" alt="Portrait of Harwinder" width="360" height="360"
               class="rounded-3xl shadow-xl object-cover" loading="eager" decoding="async" />
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section bg-white" aria-labelledby="about-title">
      <div class="container-page">
        <h2 id="about-title" class="section-title">About Me</h2>
        <div class="grid gap-10 md:grid-cols-3">
          <p class="md:col-span-2 text-lg text-ink/75 max-w-prose">
            I'm a full-stack developer who treats software as a product, not just code.
            My approach is simple: understand the problem deeply, choose boring reliable
            tools, and iterate in small, testable slices. I've built SPAs, REST and
            GraphQL APIs, and data pipelines — always with accessibility and performance
            as first-class requirements.
          </p>
          <dl class="grid grid-cols-2 gap-4 content-start text-sm">
            <div><dt class="font-mono text-accent">5+</dt><dd class="text-ink/60">Years coding</dd></div>
            <div><dt class="font-mono text-accent">20+</dt><dd class="text-ink/60">Projects shipped</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="section" aria-labelledby="skills-title">
      <div class="container-page">
        <h2 id="skills-title" class="section-title">Skills</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <!-- Repeat per category -->
          <article class="card">
            <h3 class="font-semibold mb-4">Frontend</h3>
            <ul class="flex flex-wrap gap-2">
              <li class="chip">React</li><li class="chip">TypeScript</li>
              <li class="chip">Tailwind</li><li class="chip">Next.js</li>
            </ul>
          </article>
          <article class="card">
            <h3 class="font-semibold mb-4">Backend</h3>
            <ul class="flex flex-wrap gap-2">
              <li class="chip">Node.js</li><li class="chip">Express</li>
              <li class="chip">Python</li><li class="chip">GraphQL</li>
            </ul>
          </article>
          <article class="card">
            <h3 class="font-semibold mb-4">Databases</h3>
            <ul class="flex flex-wrap gap-2">
              <li class="chip">PostgreSQL</li><li class="chip">MongoDB</li><li class="chip">Redis</li>
            </ul>
          </article>
          <article class="card">
            <h3 class="font-semibold mb-4">Tools</h3>
            <ul class="flex flex-wrap gap-2">
              <li class="chip">Git</li><li class="chip">Docker</li>
              <li class="chip">AWS</li><li class="chip">CI/CD</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- PROJECTS (rendered by JS) -->
    <section id="projects" class="section bg-white" aria-labelledby="projects-title">
      <div class="container-page">
        <h2 id="projects-title" class="section-title">Projects</h2>
        <div id="projects-grid"
             class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
             aria-live="polite"></div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section" aria-labelledby="contact-title">
      <div class="container-page grid gap-12 md:grid-cols-2">
        <div>
          <h2 id="contact-title" class="section-title">Let's build something</h2>
          <p class="text-ink/70 max-w-prose mb-6">
            Open to full-time roles and select freelance engagements.
            The fastest way to reach me is via email or LinkedIn.
          </p>
          <ul class="flex flex-col gap-3 text-sm">
            <li><a class="nav-link" href="mailto:hello@harwinder.dev">hello@harwinder.dev</a></li>
            <li><a class="nav-link" href="https://github.com/harwinder" rel="noopener">github.com/harwinder</a></li>
            <li><a class="nav-link" href="https://linkedin.com/in/harwinder" rel="noopener">linkedin.com/in/harwinder</a></li>
          </ul>
        </div>
        <form id="contact-form" class="card space-y-4" novalidate>
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <input id="name" name="name" required minlength="2"
                   class="w-full rounded-lg border border-ink/15 px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent" />
            <p class="text-xs text-red-600 mt-1 hidden" data-error-for="name"></p>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium mb-1">Email</label>
            <input id="email" name="email" type="email" required
                   class="w-full rounded-lg border border-ink/15 px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent" />
            <p class="text-xs text-red-600 mt-1 hidden" data-error-for="email"></p>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium mb-1">Message</label>
            <textarea id="message" name="message" rows="5" required minlength="10"
                      class="w-full rounded-lg border border-ink/15 px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent"></textarea>
            <p class="text-xs text-red-600 mt-1 hidden" data-error-for="message"></p>
          </div>
          <button type="submit" class="btn-primary w-full">Send Message</button>
          <p id="form-status" class="text-sm text-center" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  </main>

  <footer class="border-t border-ink/5 py-8">
    <div class="container-page flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-ink/60">
      <p>© <span id="year"></span> Harwinder. All rights reserved.</p>
      <p>Built with HTML, Tailwind CSS &amp; vanilla JS.</p>
    </div>
  </footer>

  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

### `src/js/main.js`
```js
import { initNavigation } from "./navigation.js";
import { initScroll } from "./scroll.js";
import { renderProjects } from "./projects.js";
import { initForm } from "./form.js";

document.getElementById("year").textContent = new Date().getFullYear();

initNavigation();
initScroll();
renderProjects();
initForm();
```

### `src/js/navigation.js`
```js
export function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("hidden", open);
  });

  menu.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}
```

### `src/js/scroll.js`
```js
export function initScroll() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll('a[href^="#"]')];

  // Scroll-spy via IntersectionObserver (no scroll listeners)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle("text-ink", l.hash === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => observer.observe(s));

  // Reveal-on-scroll — one observer, applied to tagged elements
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeUp");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".card, .section-title").forEach((el) => {
    el.style.opacity = 0;
    revealObserver.observe(el);
  });
}
```

### `src/js/projects.js`
```js
const PROJECTS = [
  {
    title: "DevBoard",
    description: "Real-time collaborative task board with WebSocket sync and role-based access.",
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    demo: "https://devboard.example.com",
    repo: "https://github.com/harwinder/devboard",
  },
  {
    title: "ShopKit",
    description: "Headless e-commerce storefront with Stripe checkout and admin analytics.",
    tech: ["Next.js", "Stripe", "MongoDB"],
    demo: "https://shopkit.example.com",
    repo: "https://github.com/harwinder/shopkit",
  },
  {
    title: "PulseWatch",
    description: "Lightweight uptime monitor with alerting via email and webhook channels.",
    tech: ["Python", "FastAPI", "Redis", "Docker"],
    demo: "https://pulsewatch.example.com",
    repo: "https://github.com/harwinder/pulsewatch",
  },
];

const escape = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => `
    <article class="card flex flex-col">
      <h3 class="text-lg font-semibold mb-2">${escape(p.title)}</h3>
      <p class="text-sm text-ink/70 mb-4 flex-1">${escape(p.description)}</p>
      <ul class="flex flex-wrap gap-2 mb-5">
        ${p.tech.map((t) => `<li class="chip">${escape(t)}</li>`).join("")}
      </ul>
      <div class="flex gap-3 text-sm font-medium">
        <a href="${escape(p.demo)}" class="text-accent hover:underline" rel="noopener" target="_blank">Live Demo →</a>
        <a href="${escape(p.repo)}" class="text-ink/60 hover:text-ink" rel="noopener" target="_blank">Source</a>
      </div>
    </article>
  `).join("");
}
```

### `src/js/form.js`
```js
const VALIDATORS = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address."),
  message: (v) => (v.trim().length >= 10 ? "" : "Message must be at least 10 characters."),
};

export function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  const setError = (name, msg) => {
    const el = form.querySelector(`[data-error-for="${name}"]`);
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle("hidden", !msg);
    form.elements[name].setAttribute("aria-invalid", msg ? "true" : "false");
  };

  form.addEventListener("input", (e) => {
    const { name, value } = e.target;
    if (VALIDATORS[name]) setError(name, VALIDATORS[name](value));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;
    for (const [name, validate] of Object.entries(VALIDATORS)) {
      const msg = validate(form.elements[name].value);
      setError(name, msg);
      if (msg) valid = false;
    }
    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    status.textContent = "Sending…";
    try {
      // Replace with your real endpoint (Formspree, API route, etc.)
      await new Promise((r) => setTimeout(r, 600));
      status.textContent = "Thanks — I'll get back to you soon.";
      status.className = "text-sm text-center text-emerald-600";
      form.reset();
    } catch {
      status.textContent = "Something went wrong. Please email me directly.";
      status.className = "text-sm text-center text-red-600";
    }
  });
}
```

---

## 5. Execution Order (Mapping to the Issue's To-Do List)

1. **Foundations** → Create `package.json`, `tailwind.config.js`, `src/input.css`, run `npm install && npm run dev`.
2. **HTML boilerplate** → Complete `index.html` with semantic tags and section IDs.
3. **Mobile-first CSS** → Use `@layer components` classes; verify at 375px, 768px, 1280px.
4. **Sections** → Hero → About → Skills → Projects → Contact, in that order.
5. **JavaScript** → Wire `main.js` modules one at a time; test each in isolation.
6. **Asset optimization** → Serve images as WebP, use `loading="lazy"` for below-fold, `font-display: swap` (already via Google Fonts URL), self-host Inter for production.
7. **Cross-browser QA** → Test on Chrome, Firefox, Safari, Edge; run Lighthouse (target ≥ 95 across Performance, Accessibility, Best Practices, SEO).

---

## 6. Engineering Guardrails (Anti-Slop Checklist)

- ✅ **No inline styles** — only Tailwind utility classes and semantic component classes.
- ✅ **No deep div nesting** — max depth ~4; use semantic elements instead.
- ✅ **Single source of truth** — design tokens in `tailwind.config.js`; project data in `projects.js`; validators in `form.js`.
- ✅ **Accessibility** — skip link, `aria-expanded`, `aria-live`, `aria-invalid`, focus-visible rings, `prefers-reduced-motion` (add via Tailwind variant).
- ✅ **Performance** — no jQuery, no runtime CSS-in-JS, single compiled CSS file, ES modules with `defer` semantics.
- ✅ **XSS-safe rendering** — `escape()` on all interpolated project data.
- ✅ **Progressive enhancement** — nav works with JS disabled (anchor links), form falls back to native validation if JS fails.

Add this to `src/input.css` for reduced-motion compliance:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

This plan ships a fast, accessible, maintainable portfolio with a token-driven design system, modular JS, and a clear path from `git clone` to production deploy (Vercel, Netlify, or GitHub Pages — all support the `dist/styles.css` build output as-is).