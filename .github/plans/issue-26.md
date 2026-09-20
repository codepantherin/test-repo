# Architectural Plan for Issue #26

# Portfolio Website — Production Implementation Plan

## 1. Scope & Architecture Overview

**Goal:** Build a React SPA (frontend) + Node/Express API (backend) for a personal portfolio with three routes: `/` (Home), `/portfolio`, `/contact`. The contact form POSTs to the Node API, which validates and dispatches (email via Nodemailer) the message.

**Monorepo structure** (single repository, two apps):

```
portfolio/
├── client/                 # React + Vite frontend
└── server/                 # Node + Express API
```

**Why a monorepo?** Shared tooling, atomic commits, simpler deployment. Kept as two isolated packages so each can be deployed independently (e.g. Vercel for client, Render/Railway for server).

---

## 2. Technology Stack (Explicit Choices)

| Layer | Choice | Rationale |
|---|---|---|
| Frontend framework | **React 18 + Vite** | Fast HMR, minimal config, TS-friendly |
| Language | **TypeScript** | Type safety across API contracts |
| Styling | **Tailwind CSS v3** | Utility-first, no CSS drift, tree-shaken |
| UI primitives | **Headless UI** (forms, dialogs) + **Lucide React** (icons) | Accessible, unopinionated, matches Tailwind |
| Routing | **React Router v6** | Standard, data APIs |
| Form handling | **React Hook Form + Zod** | Minimal re-renders, schema validation shared conceptually with server |
| Data fetching | **TanStack Query** | Caching, retries, mutation state |
| Backend framework | **Node 20 + Express 4** | Boring, stable, ubiquitous |
| Validation (server) | **Zod** | Same schema language as client |
| Email delivery | **Nodemailer** (SMTP, e.g. Resend/SendGrid) | No vendor lock-in |
| Security | **helmet, cors, express-rate-limit** | Standard hardening |
| Env management | **dotenv** | 12-factor config |

**Design system tokens** (defined in `tailwind.config.ts`):
- Palette: `ink` (900/700/500), `surface`, `accent` (single brand color), `muted`
- Typography: Inter (self-hosted via `@fontsource/inter`) — one family, tight scale (`text-sm` → `text-6xl`)
- Spacing scale: default Tailwind (4px base)
- Radii: `rounded-lg` / `rounded-2xl` only
- Motion: 150–250ms ease-out transitions

---

## 3. Repository Layout

```
portfolio/
├── README.md
├── .gitignore
├── package.json                  # root: workspaces + scripts
├── client/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css                    # Tailwind directives + tokens
│       ├── lib/
│       │   ├── api.ts                   # fetch wrapper + typed endpoints
│       │   └── constants.ts             # nav items, social links
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── RootLayout.tsx       # <Outlet/> + header/footer
│       │   ├── ui/
│       │   │   ├── Button.tsx
│       │   │   ├── Input.tsx
│       │   │   ├── Textarea.tsx
│       │   │   └── Container.tsx
│       │   └── portfolio/
│       │       └── ProjectCard.tsx
│       ├── features/
│       │   ├── home/
│       │   │   └── Hero.tsx
│       │   ├── portfolio/
│       │   │   ├── projects.ts          # static data (or fetch from API)
│       │   │   └── PortfolioPage.tsx
│       │   └── contact/
│       │       ├── ContactForm.tsx
│       │       ├── schema.ts            # Zod schema (shared shape w/ server)
│       │       └── useSubmitContact.ts  # TanStack mutation
│       └── pages/
│           ├── HomePage.tsx
│           ├── PortfolioPage.tsx
│           ├── ContactPage.tsx
│           └── NotFoundPage.tsx
└── server/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── index.ts                     # bootstrap
        ├── app.ts                       # express app factory
        ├── config/
        │   └── env.ts                   # zod-validated env loader
        ├── routes/
        │   ├── index.ts
        │   └── contact.route.ts
        ├── controllers/
        │   └── contact.controller.ts
        ├── services/
        │   └── mailer.service.ts
        ├── middleware/
        │   ├── errorHandler.ts
        │   ├── notFound.ts
        │   └── rateLimit.ts
        └── schemas/
            └── contact.schema.ts        # Zod schema (source of truth)
```

---

## 4. Design System & Layout Strategy

### Semantic HTML5 skeleton (per page)

Every page follows this structure:

```
<RootLayout>
  <Header>  → <header><nav aria-label="Primary">…</nav></header>
  <main id="main">
     <page-specific sections>
  </main>
  <Footer> → <footer>…</footer>
</RootLayout>
```

Nothing nested deeper than 4 levels of `div`. Prefer `section`, `article`, `nav`, `header`, `footer`, `aside`, `form`, `fieldset`.

### Layout primitives

- **Global container**: a `Container` component using `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`. All content sits inside it — no ad-hoc `max-w-*` scattered around.
- **Page sections**: `<section className="py-16 sm:py-24">` with a Heading + supporting copy.
- **Hero (Home)**: CSS Grid — `grid gap-12 lg:grid-cols-2 lg:items-center`. Left = headline + CTAs, right = visual/avatar.
- **Portfolio grid**: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`. Auto-fit responsive with a single class.
- **Contact page**: `grid gap-10 lg:grid-cols-[1fr_minmax(0,32rem)]` — copy on left, form on right. On mobile, single column.
- **Form fields**: Flex column inside `fieldset` — label (`block text-sm font-medium`), input, and `aria-describedby` error paragraph. No wrapping divs.

### Accessibility & correctness

- Skip-to-content link as first focusable element in `RootLayout`.
- `Header` nav uses `NavLink` and reflects active state via `aria-current="page"`.
- Form: `noValidate` on `<form>`, `role="alert"` on error summary, `aria-invalid` + `aria-describedby` on invalid fields, `autoComplete` attributes set.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-accent` on all interactive elements (enforced via a `Button` primitive).
- Color contrast ≥ WCAG AA verified against palette tokens.

### Reactive states

- **Loading**: `Button` with `disabled` + spinner via `Loader2` icon (`animate-spin`).
- **Success**: inline status region `role="status"` above the form. No toast library needed.
- **Error**: thrown by mutation → rendered as `<p role="alert">` inside the field or the summary.

---

## 5. API Contract

**Endpoint:** `POST /api/contact`

**Request body (Zod schema, shared shape):**
```ts
{
  name:    string,  min 2, max 80
  email:   string,  email, max 120
  subject: string,  min 3, max 120
  message: string,  min 20, max 2000
  // honeypot field, must be empty
  company?: string
}
```

**Responses:**
- `200 { ok: true }`
- `400 { ok: false, errors: { field: string[] } }`
- `429 { ok: false, error: 'RATE_LIMITED' }`
- `500 { ok: false, error: 'INTERNAL' }`

**CORS:** allow only the client origin(s) from `CLIENT_ORIGIN` env var.
**Rate limit:** `express-rate-limit` — 5 requests / 15 min / IP on this route.
**Honeypot:** reject silently if `company` is filled.

---

## 6. Files to Create / Modify

### Create — root
- `package.json` — workspaces `["client", "server"]`, scripts: `dev` (concurrently), `build`, `lint`.
- `.gitignore` — `node_modules`, `dist`, `.env`, `*.log`.
- `README.md` — setup (env vars, dev, deploy), API contract, folder map.

### Create — client
- `client/index.html` — root `<div id="root">`, `<meta name="description">`, `lang="en"`.
- `client/vite.config.ts` — React plugin, `server.proxy` mapping `/api` → `http://localhost:4000` for local dev (avoids CORS in dev).
- `client/tailwind.config.ts` — `content: ['./index.html','./src/**/*.{ts,tsx}']`, extended `colors`, `fontFamily`.
- `client/postcss.config.js`, `client/tsconfig.json`, `client/package.json`.
- `src/index.css` — `@tailwind base; @tailwind components; @tailwind utilities;` + `@layer base` for `html { scroll-behavior: smooth }` and default body font/color.
- `src/main.tsx` — `ReactDOM.createRoot`, `BrowserRouter`, `QueryClientProvider`.
- `src/App.tsx` — route table only:
  ```tsx
  <Routes>
    <Route element={<RootLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="portfolio" element={<PortfolioPage/>}/>
      <Route path="contact" element={<ContactPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Route>
  </Routes>
  ```
- `src/components/layout/{RootLayout,Header,Footer}.tsx`
- `src/components/ui/{Button,Input,Textarea,Container}.tsx` — small, prop-driven primitives. `Button` handles `variant` (`primary | ghost`), `size`, `isLoading`.
- `src/components/portfolio/ProjectCard.tsx` — `<article>` with `<h3>`, tech tags, external link with `rel="noopener noreferrer"`.
- `src/features/home/Hero.tsx`
- `src/features/portfolio/projects.ts` + `PortfolioPage.tsx` (page composition lives in `pages/`, feature folder holds data + components).
- `src/features/contact/schema.ts` — Zod schema mirroring server.
- `src/features/contact/useSubmitContact.ts` — TanStack `useMutation` calling `api.contact.submit`.
- `src/features/contact/ContactForm.tsx` — RHF + zodResolver; renders `<fieldset>` with 4 fields + honeypot + submit button. On success, swaps form for a confirmation panel.
- `src/lib/api.ts` — typed fetch wrapper: reads `import.meta.env.VITE_API_URL`, throws on non-2xx with parsed JSON body.
- `src/lib/constants.ts` — `NAV_ITEMS`, `SOCIAL_LINKS`, `SITE_NAME`.
- `src/pages/{HomePage,PortfolioPage,ContactPage,NotFoundPage}.tsx` — thin route components importing feature components.

### Create — server
- `server/package.json` — deps: `express cors helmet express-rate-limit nodemailer zod dotenv`; devDeps: `typescript tsx @types/*`.
- `server/tsconfig.json` — `target: ES2022`, `module: NodeNext`, `strict: true`, `outDir: dist`.
- `server/.env.example`:
  ```
  PORT=4000
  NODE_ENV=development
  CLIENT_ORIGIN=http://localhost:5173
  SMTP_HOST=
  SMTP_PORT=587
  SMTP_USER=
  SMTP_PASS=
  MAIL_FROM="Portfolio <no-reply@example.com>"
  MAIL_TO=you@example.com
  ```
- `src/config/env.ts` — `dotenv.config()` + Zod parse of `process.env`. Export strongly typed `env`. **Fail fast** if invalid.
- `src/schemas/contact.schema.ts` — Zod.
- `src/services/mailer.service.ts` — `sendContactEmail(payload)`; creates transporter once at module load; returns `Promise<void>`.
- `src/controllers/contact.controller.ts` — parse body, check honeypot, call mailer, respond.
- `src/routes/contact.route.ts` — `router.post('/', rateLimiter, controller)`.
- `src/routes/index.ts` — mounts `/contact`.
- `src/middleware/{errorHandler,notFound}.ts` — JSON responses, no HTML.
- `src/middleware/rateLimit.ts` — configured limiter.
- `src/app.ts` — `express()` → `helmet()` → `cors({ origin: env.CLIENT_ORIGIN })` → `express.json({ limit: '10kb' })` → routes → notFound → errorHandler.
- `src/index.ts` — imports `app`, `app.listen(env.PORT)`.

### Modify
- None (greenfield), but the root `package.json` should add:
  ```json
  "scripts": {
    "dev": "concurrently \"npm:dev -w server\" \"npm:dev -w client\"",
    "build": "npm run build -w server && npm run build -w client",
    "lint": "npm run lint -w client && npm run lint -w server"
  }
  ```

---

## 7. Key Component Sketches (Reference Implementations)

**`Button.tsx` (DRY primitive — the only place styles for buttons live):**
```tsx
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
};

export function Button({ variant='primary', isLoading, className='', children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60';
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90',
    ghost:   'bg-transparent text-ink-700 hover:bg-ink-50',
  };
  return (
    <button {...rest} disabled={rest.disabled || isLoading}
      className={`${base} ${variants[variant]} ${className}`}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
```

**`ContactForm.tsx` (semantic + a11y, no div soup):**
```tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
  <fieldset disabled={mutation.isPending} className="space-y-5">
    <legend className="sr-only">Contact details</legend>

    <Input label="Name"  {...register('name')}  error={errors.name?.message} autoComplete="name" />
    <Input label="Email" type="email" {...register('email')} error={errors.email?.message} autoComplete="email" />

    {/* honeypot */}
    <input {...register('company')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

    <Input label="Subject" {...register('subject')} error={errors.subject?.message} />
    <Textarea label="Message" rows={6} {...register('message')} error={errors.message?.message} />

    <Button type="submit" isLoading={mutation.isPending}>
      {mutation.isPending ? 'Sending…' : 'Send message'}
    </Button>
  </fieldset>

  {mutation.isError && <p role="alert" className="text-sm text-red-600">Something went wrong. Please try again.</p>}
  {mutation.isSuccess  && <p role="status" className="text-sm text-emerald-600">Thanks — I’ll be in touch shortly.</p>}
</form>
```

**`RootLayout.tsx`:**
```tsx
export function RootLayout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only …">Skip to content</a>
      <Header />
      <main id="main" className="min-h-[60vh]"><Outlet /></main>
      <Footer />
    </>
  );
}
```

**`server/src/app.ts` (order matters):**
```ts
export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_ORIGIN }));
  app.use(express.json({ limit: '10kb' }));
  app.use('/api', routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
```

---

## 8. Behavioral Specs

| Feature | Behavior |
|---|---|
| Nav | Sticky header, `backdrop-blur`, active link underlined via `NavLink` |
| Home hero | H1 + one-sentence value prop + two CTAs: “View Work” (`/portfolio`), “Get in touch” (`/contact`) |
| Portfolio | Grid of `ProjectCard`s, each with title, blurb, stack chips, external link |
| Contact | Client validation on blur (RHF mode `'onBlur'`), server re-validates; success replaces form with confirmation |
| 404 | Friendly copy + link home, rendered inside layout |
| API errors | 400 → field errors mapped by RHF; 429/500 → generic alert |

---

## 9. Build, Run, Deploy

**Local dev:**
```bash
npm install              # installs both workspaces
cp server/.env.example server/.env   # fill SMTP creds
npm run dev              # client :5173, server :4000 (proxied via Vite)
```

**Production:**
- `client` → `npm run build -w client` → static `dist/` deployed to Vercel/Netlify. Set `VITE_API_URL=https://api.yourdomain.com`.
- `server` → `npm run build -w server` → `node dist/index.js` on Render/Railway/Fly.io. Set `CLIENT_ORIGIN` to the deployed client URL. Ensure SMTP credentials injected as secrets.

---

## 10. Quality Gates Before Merge

1. **Lint/format**: ESLint + Prettier at root, wired into CI.
2. **TypeScript strict** on both packages; no `any` in committed code.
3. **Accessibility**: axe DevTools scan clean on Home/Portfolio/Contact; keyboard-only navigation works end-to-end.
4. **Performance**: Lighthouse ≥ 95 on Performance/SEO/Accessibility for the built client.
5. **Server tests**: Vitest + Supertest for `POST /api/contact` — happy path (mock mailer), invalid payload, honeypot, rate limit.
6. **Client tests**: RTL test for `ContactForm` — validates errors, submits, shows success and error states.
7. **Security check**: no secrets in repo, `.env` gitignored, helmet headers present, CORS locked to client origin.

---

## 11. Explicit Anti-Slop Rules Enforced

- **No inline styles** anywhere; every visual change goes through Tailwind classes or design tokens.
- **No div-only structure** — semantic tags (`header`, `nav`, `main`, `section`, `article`, `footer`, `fieldset`) required for structural nodes.
- **No duplicated button/input markup** — primitives in `components/ui/` are the single source.
- **No fetch calls inside components** — all network code lives in `lib/api.ts` and is called from hooks.
- **No business logic in route files** — controllers/services/middleware separation is mandatory.
- **No config drift** — every env var is parsed and typed through `config/env.ts` (server) or `import.meta.env` (client).
- **One Tailwind breakpoint strategy** — mobile-first, `sm / lg / xl` only.

Following this plan produces a lean, maintainable, type-safe portfolio that ships fast, looks intentionally designed, and can evolve (blog, CMS-driven projects) without a rewrite.