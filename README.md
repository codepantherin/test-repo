# Portfolio Website

A production-grade personal portfolio built as a monorepo with a **React 18 + Vite + TypeScript** frontend and a **Node 20 + Express + TypeScript** backend. The contact form POSTs to the API, which validates the payload with Zod, protects against bots via a honeypot field and rate limiting, and dispatches messages over SMTP with Nodemailer.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Repository Layout](#repository-layout)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Contract](#api-contract)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Quality Gates](#quality-gates)
- [Deployment](#deployment)

## Features

- **Three routes** — `/` (Home), `/portfolio`, `/contact`, plus a friendly 404 page rendered inside the shared layout.
- **Type-safe contact flow** — a single Zod schema shape shared conceptually between client and server; invalid payloads surface as field-level errors.
- **Bot-resistant form** — hidden honeypot field rejected silently, plus `express-rate-limit` at 5 requests / 15 min / IP on the contact route.
- **Hardened API** — `helmet` security headers, CORS locked to the configured client origin, and a 10 kB JSON body limit.
- **Fail-fast configuration** — every environment variable is parsed and typed through `config/env.ts` (server) or `import.meta.env` (client).
- **Accessible by default** — skip-to-content link, semantic landmarks, `aria-invalid` / `aria-describedby` on invalid fields, `role="alert"` and `role="status"` live regions, and visible `focus-visible` rings on all interactive elements.
- **Reactive UI states** — loading spinner on submit, inline success confirmation that replaces the form, and generic alerts for 429/500 responses.

## Architecture

The repository is a **monorepo** containing two independent packages:

```
portfolio/
├── client/   # React + Vite SPA
└── server/   # Node + Express API
```

Keeping the two apps isolated means each can be **built and deployed independently** — the client as static assets (Vercel/Netlify) and the server as a long-running process (Render/Railway/Fly.io) — while a single repository preserves atomic commits and shared tooling.

In development, Vite proxies `/api` to `http://localhost:4000`, so the browser sees a same-origin request and no CORS preflight is required. In production the client talks to the server directly via `VITE_API_URL`, with the server's allowed origin pinned by `CLIENT_ORIGIN`.

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| UI primitives | Headless UI + Lucide React |
| Routing | React Router v6 |
| Form handling | React Hook Form + Zod |
| Data fetching | TanStack Query |
| Backend framework | Node 20 + Express 4 |
| Server validation | Zod |
| Email delivery | Nodemailer (SMTP) |
| Security | helmet, cors, express-rate-limit |
| Config | dotenv |

## Repository Layout

```
portfolio/
├── README.md
├── .gitignore
├── package.json                  # root: workspaces + scripts
├── client/
│   ├── index.html
│   ├── vite.config.ts            # React plugin + /api dev proxy
│   ├── tailwind.config.ts        # design tokens
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── src/
│       ├── main.tsx              # providers: BrowserRouter, QueryClient
│       ├── App.tsx               # route table only
│       ├── index.css             # Tailwind directives + base layer
│       ├── lib/
│       │   ├── api.ts            # typed fetch wrapper + endpoints
│       │   └── constants.ts      # nav items, social links, site name
│       ├── components/
│       │   ├── layout/           # RootLayout, Header, Footer
│       │   ├── ui/               # Button, Input, Textarea, Container
│       │   └── portfolio/        # ProjectCard
│       ├── features/
│       │   ├── home/             # Hero
│       │   ├── portfolio/        # projects data + composition
│       │   └── contact/          # schema, useSubmitContact, ContactForm
│       └── pages/                # thin route components
└── server/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── index.ts              # bootstrap + listen
        ├── app.ts                # express app factory
        ├── config/env.ts         # Zod-validated env loader
        ├── routes/               # index + contact.route
        ├── controllers/          # contact.controller
        ├── services/             # mailer.service
        ├── middleware/           # errorHandler, notFound, rateLimit
        └── schemas/              # contact.schema (source of truth)
```

## Getting Started

### Prerequisites

- **Node.js 20+**
- **npm 9+** (workspace support)
- An SMTP provider (e.g. Resend, SendGrid, Amazon SES) for the contact form

### Install

```bash
npm install
```

Installing at the root installs dependencies for both workspaces.

### Configure the server

```bash
cp server/.env.example server/.env
```

Fill in your SMTP credentials and set `CLIENT_ORIGIN` to the client dev URL (`http://localhost:5173`). See [Environment Variables](#environment-variables).

### Run in development

```bash
npm run dev
```

- Client → http://localhost:5173
- Server → http://localhost:4000
- Requests to `/api/*` from the client are proxied to the server automatically.

## Environment Variables

All server variables are parsed and validated by `server/src/config/env.ts`. The server **fails fast** on startup if any required value is missing or malformed.

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `4000` | HTTP port the API listens on |
| `NODE_ENV` | no | `development` | `development` \| `production` \| `test` |
| `CLIENT_ORIGIN` | yes | — | Allowed CORS origin (the deployed client URL) |
| `SMTP_HOST` | yes | — | SMTP server hostname |
| `SMTP_PORT` | no | `587` | SMTP port |
| `SMTP_USER` | yes | — | SMTP username |
| `SMTP_PASS` | yes | — | SMTP password |
| `MAIL_FROM` | yes | — | `From` header, e.g. `"Portfolio <no-reply@example.com>"` |
| `MAIL_TO` | yes | — | Destination inbox for contact submissions |

The client reads a single build-time variable:

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | production only | Base URL of the deployed API (e.g. `https://api.yourdomain.com`). In dev, the Vite proxy is used instead. |

## Available Scripts

Run from the repository root:

| Command | Description |
|---|---|
| `npm run dev` | Runs the server and client concurrently |
| `npm run build` | Builds the server, then the client |
| `npm run lint` | Lints both workspaces |

Workspace-scoped commands are available via `-w`, e.g. `npm run build -w client`.

## API Contract

### `POST /api/contact`

**Request body**

```ts
{
  name:    string,  // min 2, max 80
  email:   string,  // valid email, max 120
  subject: string,  // min 3, max 120
  message: string,  // min 20, max 2000
  company?: string  // honeypot — must be empty
}
```

**Responses**

| Status | Body | Meaning |
|---|---|---|
| `200` | `{ "ok": true }` | Message accepted and dispatched |
| `400` | `{ "ok": false, "errors": { "field": ["..."] } }` | Validation failed |
| `429` | `{ "ok": false, "error": "RATE_LIMITED" }` | Too many requests (5 / 15 min / IP) |
| `500` | `{ "ok": false, "error": "INTERNAL" }` | Unexpected server failure |

**Behavior notes**

- If the `company` honeypot field is non-empty, the request is **rejected silently** with a success-shaped response so bots cannot distinguish a block from a success.
- All responses are JSON. There is no HTML error output.
- The request body is capped at **10 kB**.

## Design System

Tokens live in `client/tailwind.config.ts`; visual changes flow only through Tailwind classes and tokens — **no inline styles**.

- **Palette** — `ink` (900/700/500), `surface`, a single `accent` brand color, `muted`.
- **Typography** — Inter, self-hosted via `@fontsource/inter`, tight scale from `text-sm` to `text-6xl`.
- **Spacing** — default Tailwind 4px base.
- **Radii** — `rounded-lg` and `rounded-2xl` only.
- **Motion** — 150–250 ms `ease-out` transitions.
- **Breakpoints** — mobile-first; only `sm`, `lg`, and `xl` are used.

Layout primitives keep spacing consistent: a global `Container` (`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`) wraps every section, so widths are never redefined ad hoc.

## Accessibility

- Skip-to-content link is the first focusable element in `RootLayout`.
- Header navigation uses `NavLink` and reflects the active route via `aria-current="page"`.
- Form sets `noValidate`, marks invalid fields with `aria-invalid` and `aria-describedby`, and exposes errors through a `role="alert"` summary.
- Submission status uses `role="status"`; failures use `role="alert"`.
- Every interactive element carries a `focus-visible:ring-2 focus-visible:ring-accent` ring via the shared `Button` primitive.
- Color contrast meets **WCAG AA** against the palette tokens.

## Quality Gates

1. **Lint & format** — ESLint + Prettier configured at the root and wired into CI.
2. **TypeScript strict** on both packages; no `any` in committed code.
3. **Accessibility** — axe DevTools scans clean on Home, Portfolio, and Contact; full keyboard-only navigation works end-to-end.
4. **Performance** — Lighthouse ≥ 95 on Performance, SEO, and Accessibility for the built client.
5. **Server tests** — Vitest + Supertest covering `POST /api/contact`: happy path (mock mailer), invalid payload, honeypot, and rate limit.
6. **Client tests** — React Testing Library coverage of `ContactForm`: validation errors, successful submit, and error state.
7. **Security review** — no secrets committed, `.env` gitignored, helmet headers present, CORS locked to `CLIENT_ORIGIN`.

## Deployment

### Client

```bash
npm run build -w client
```

Deploy the resulting `client/dist/` as static assets to Vercel, Netlify, or any static host. Set:

```
VITE_API_URL=https://api.yourdomain.com
```

### Server

```bash
npm run build -w server
node dist/index.js
```

Run on Render, Railway, Fly.io, or any Node 20 host. Set the following in the host's secret store:

- `CLIENT_ORIGIN` — the deployed client URL (must match exactly for CORS)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `MAIL_FROM`, `MAIL_TO`
- `NODE_ENV=production`

## License

MIT
