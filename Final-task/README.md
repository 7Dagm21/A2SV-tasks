<div align="center">
   <h1>Job Listing & Verification App</h1>
   <p><strong>Next.js 14 • TypeScript • Tailwind • Cypress • Jest</strong></p>
   <p>Authentication (modal), human verification (OTP), job browsing, bookmarking.</p>
</div>

---

## Project Description

This is a demo Job Listing & Human Verification web application built with Next.js (App Router) and TypeScript. It showcases:

- Auth via modal (login & register) with an OTP-style verification step (skipped during Cypress tests for speed)
- Human verification (/verify) flow using a 4‑digit code input
- Job browsing: list, detail pages, loading / empty / error and not‑found states
- Bookmarking jobs (optimistic UI, auth‑guarded tooltip feedback)
- Reusable UI component library (Radix primitives + Tailwind styling)
- Full testing stack: Jest unit tests + Cypress end‑to‑end (auth, bookmark, verification) with automated screenshot capture

Use this as a template / reference for structuring feature contexts (Auth / Bookmarks), layering services & hooks, and integrating visual artifacts into documentation.

## 1. Clone & Quick Start

```bash
# HTTPS
git clone https://github.com/your-org/your-repo.git job-app
cd job-app

# or SSH
# git clone git@github.com:your-org/your-repo.git job-app

# Install dependencies
pnpm install   # or npm install

# Run dev server (default 3001)
pnpm dev
```

If port 3001 is taken:

```bash
pnpm dev:alt   # runs on 3010
```

Prod build:

```bash
pnpm build && pnpm start
```

---

## 2. Core Features

| Domain             | Capabilities                                                                     |
| ------------------ | -------------------------------------------------------------------------------- |
| Auth               | Modal login & register (role forced to `user`), token storage, stubbed E2E flows |
| Jobs               | Listing with search + sort, detail pages, loading / empty / error states         |
| Bookmarks          | Auth‑guarded toggle button with feedback tooltip + optimistic UI                 |
| Human Verification | `/verify` page: Begin -> OTP (4 digits) -> simulated or API submit               |
| UI                 | Tailwind + Radix-based components (shadcn style)                                 |
| Testing            | Jest unit tests + Cypress E2E (auth, bookmark, human verification)               |

---

## 3. Architecture

```
app/                # Routes (landing, jobs/[id], verify)
components/         # UI + feature components
components/auth     # Auth modal/forms
components/ui       # Reusable primitives
contexts/           # AuthContext, BookmarkContext
hooks/              # Data + utility hooks
services/           # API calls (auth, bookmark, jobs)
types/              # TypeScript interfaces
cypress/e2e         # E2E specs
__tests__/          # Jest tests
```

Data flow: Components -> hooks/services -> backend (stubbed in tests via `cy.intercept`).

---

## 4. Key Files

| File                               | Purpose                                    |
| ---------------------------------- | ------------------------------------------ |
| `app/page.tsx`                     | Landing + job listing + auth modal trigger |
| `components/auth/AuthModal.tsx`    | Switchable login/register modal            |
| `components/auth/RegisterForm.tsx` | Registration + OTP skip in Cypress         |
| `components/BookmarkButton.tsx`    | Auth-aware toggle button                   |
| `contexts/AuthContext.tsx`         | Auth state + login/register/logout         |
| `contexts/BookmarkContext.tsx`     | Bookmark state & toggle logic              |
| `services/auth.ts`                 | Auth API + token storage helpers           |
| `services/bookmark.ts`             | Bookmark API integration                   |
| `services/api.ts`                  | Jobs fetch + transform                     |

---

## 5. Testing

Unit (Jest):

```bash
pnpm test            # run once
pnpm test:watch      # watch mode
pnpm test:coverage   # coverage report
```

E2E (Cypress headless all specs):

```bash
pnpm e2e          # port 3001
pnpm e2e:alt      # port 3010
```

Individual specs:

```bash
pnpm e2e:auth-only
pnpm e2e:bookmark-only
pnpm e2e:verify
```

Interactive runner:

```bash
pnpm e2e:open
```
