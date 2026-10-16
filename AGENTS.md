# AGENTS.md: AfriHub Website

You are the lead full-stack engineer building the AfriHub website. Read this file and `DESIGN.md` fully before writing any code. When a rule here conflicts with your defaults, this file wins.

## 1. Use your installed skills

This workspace has frontend engineering, software engineering and full-stack development skills installed. Load and follow them:

- **Frontend engineering skill**: all React UI, component architecture, styling, accessibility, responsiveness and performance work.
- **Full-stack development skill**: wiring the frontend to the Express API, environment config, the monorepo layout and deployment readiness.
- **Software engineering skill**: code quality, structure, naming, error handling, testing and reviewing your own work before you call a task done.

If a skill's guidance conflicts with this file or `DESIGN.md`, follow this file and `DESIGN.md`.

## 2. Project overview

AfriHub is a pan-African tech community. It brings tech talent together through events, hackathons, tech challenges and scholarships, and it gives members access to job and internship opportunities across Africa and globally.

The website is a **showcase and conversion site**. It exists to put AfriHub in front of people and convert visitors into:

1. **Community members** (tech talent), via the Join form
2. **Partners and investors**, via the Partner enquiry form
3. **General contacts**, via the Contact form

### Out of scope (do not build)

- User accounts, login or authentication of any kind
- A job board, job posting or job listings (opportunities are described as a member benefit only)
- Payments or donations
- Event ticketing or registration systems (events are showcase cards only)
- A CMS or admin panel

AfriHub is a fictional community. All contact details must be obvious placeholders (see section 8). Never invent real-looking emails, phone numbers, addresses or partner brands.

## 3. Tech stack (fixed, do not substitute)

### Frontend (`/frontend`)
- React 19 with TypeScript
- Vite
- React Router (client-side routing)
- Tailwind CSS (theme tokens defined from `DESIGN.md`)
- React Hook Form and Zod for forms
- `react-helmet-async` (or React 19 native `<title>`/`<meta>`) for per-page SEO and Open Graph tags
- Framer Motion for subtle animation only (optional)
- Three.js / React Three Fiber only if a Stitch screen clearly requires a 3D element. Do not add it otherwise.

### Backend (`/backend`)
- Node.js with Express and TypeScript
- Neon (serverless Postgres) via `@neondatabase/serverless`
- Drizzle ORM and Drizzle Kit for schema and migrations
- Zod for request validation (share schemas with the client where practical)
- `helmet`, `cors` (locked to the client origin), `express-rate-limit`
- `dotenv` for configuration

### Tooling
- npm workspaces monorepo
- ESLint and Prettier
- Vitest for unit tests, Supertest for API tests

## 4. Repository structure

```
afrihub/
  AGENTS.md
  DESIGN.md
  package.json            # npm workspaces: frontend, backend, shared
  shared/
    src/schemas/          # Zod schemas shared by client and server
  frontend/
    index.html
    src/
      main.tsx
      App.tsx
      routes/             # one file per page
      components/
        layout/           # Navbar, Footer, Section, Container
        ui/               # Button, Card, Input, Select, Chip, Badge, etc.
        sections/         # Hero, WhatWeDo, About, Events, Impact, Partners, JoinCTA
      content/            # static content as typed TS data (events, team, stats, partners)
      lib/                # api client, helpers
      styles/
      assets/
  backend/
    src/
      index.ts            # app bootstrap
      app.ts              # express app (exported for tests)
      routes/             # join.ts, partners.ts, contact.ts, health.ts
      db/
        schema.ts         # Drizzle tables
        client.ts         # Neon connection
      middleware/         # error handler, rate limit, honeypot check
    drizzle/              # generated migrations
    .env.example
```

## 5. Pages and routes

Build every page from its matching Stitch screen (see `DESIGN.md`).

| Route | Page | Main purpose |
|---|---|---|
| `/` | Home | Hero, What We Do, About, Upcoming Events, Impact, Partners, Join CTA |
| `/about` | About | Story, mission, vision, values, team |
| `/what-we-do` | What We Do | Events, hackathons and challenges, scholarships, career network |
| `/events` | Events | Upcoming and past events as showcase cards |
| `/join` | Join the Community | Member benefits and the Join form |
| `/partners` | Partners & Investors | Impact, why partner, options, enquiry form |
| `/contact` | Contact | Placeholder details and the Contact form |
| `*` | 404 | On-brand not-found page linking home |

If a page has no Stitch screen yet, build it from existing components and the design system so it matches the rest of the site, and note it in your summary.

## 6. Content

Display content (events, team, stats, partners, programmes) is **static typed data** in `frontend/src/content/`. Do not create database tables or GET endpoints for it. Shape the data so it could be moved behind an API later without changing components.

## 7. Backend: forms only

The backend has one job: receive form submissions, validate them and store them in Neon.

### Tables (Drizzle)

`community_members`
- `id` uuid pk, `full_name` text, `email` text (unique), `country` text, `track` text (enum: software, data_ai, design, product, cybersecurity, other), `experience_level` text (enum: beginner, intermediate, advanced), `interests` text[], `created_at` timestamptz default now()

`partner_enquiries`
- `id` uuid pk, `full_name` text, `organisation` text, `email` text, `interest_type` text (enum: invest, sponsor, hire, partner), `message` text, `created_at` timestamptz default now()

`contact_messages`
- `id` uuid pk, `full_name` text, `email` text, `subject` text, `message` text, `created_at` timestamptz default now()

### Endpoints

| Method | Path | Body | Success |
|---|---|---|---|
| GET | `/api/health` | none | `200 { status: "ok" }` |
| POST | `/api/join` | community member fields | `201 { message }` |
| POST | `/api/partners` | partner enquiry fields | `201 { message }` |
| POST | `/api/contact` | contact message fields | `201 { message }` |

### Rules
- Validate every body with the shared Zod schema. Return `400` with field-level errors on failure.
- A duplicate email on `/api/join` returns `409` with a friendly message, not a 500.
- Every form includes a hidden honeypot field (`website`). If it is filled, return `201` and store nothing.
- Rate limit the POST routes (for example 5 requests per minute per IP).
- Central error handler. Never leak stack traces or SQL errors to the client.
- All secrets come from env vars. Never hard-code the Neon connection string.

### Environment variables

`backend/.env.example`
```
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

`frontend/.env.example`
```
VITE_API_URL=http://localhost:4000
```

## 8. Placeholder contact details (use exactly these)

- Email: `hello@afrihub.example`
- Phone: `+234 000 000 0000`
- Location: `Abuja, Nigeria`
- Social links: `#` placeholders with proper `aria-label`s
- Partner logos: generic placeholder marks, never real company logos

## 9. Frontend rules

- Match the Stitch screens closely: layout, spacing, colour, type and imagery placement.
- Build reusable components first (Button, Card, SectionHeader with eyebrow/title/subtitle, Container), then compose pages from them. No copy-pasted markup between pages.
- Fully responsive: mobile (360px), tablet (768px), desktop (1280px). No horizontal scroll at any width.
- Accessibility: semantic HTML, one `h1` per page, alt text on every image, visible focus states, labelled form fields, colour contrast at WCAG AA, and a mobile nav that works by keyboard.
- Forms: inline validation, disabled submit while sending, clear success and error states, and reset on success.
- Performance: lazy-load images, use modern formats, code-split routes, and avoid heavy libraries.
- SEO: a unique title, meta description and Open Graph tags on every page.
- Strict TypeScript. No `any`.

## 10. Build order

Work in this order and stop for review at the end of each phase:

1. **Setup**: monorepo, tooling, Tailwind theme from `DESIGN.md`, shared Zod schemas.
2. **Design pull**: fetch every screen from the Stitch project (see `DESIGN.md`) and list what you found before you build.
3. **Foundations**: layout (Navbar, Footer), UI components, SectionHeader.
4. **Home page**: every section, matched to Stitch.
5. **Remaining pages**: About, What We Do, Events, Join, Partners, Contact, 404.
6. **Backend**: Express app, Drizzle schema, migration to Neon, the three POST routes, health check.
7. **Integration**: connect the three forms to the API with loading, success and error states.
8. **Polish**: responsiveness, accessibility, SEO tags and performance.
9. **Tests and docs**: API tests with Supertest, key component tests, and a README with setup and run instructions.

## 11. Definition of done

A task is done only when:
- It visually matches its Stitch screen on desktop and mobile
- `npm run lint`, `npm run typecheck` and `npm test` all pass
- No console errors or warnings in the browser
- Forms save to Neon and handle validation, duplicate and network errors
- You have written a short summary of what changed and anything that differs from Stitch

## 12. Working rules

- Ask before adding any dependency not listed in section 3.
- Ask before changing the stack, the data model or the page list.
- Do not build anything listed as out of scope.
- Keep commits small and descriptive.
- Do not use em dashes in any UI copy.
