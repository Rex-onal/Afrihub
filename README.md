# AfriHub: Pan-African Tech Community

AfriHub is a pan-African tech community that unites tech talent across all 54 African nations. It connects African builders to scholarships, high-stakes hackathons, dedicated mentorship, regional tech events, and global career opportunities.

The website is a **showcase and conversion site** designed to put AfriHub in front of developers, partners, and the global tech ecosystem, converting visitors into community members, partner organisations, and general contacts.

This repository is built as an npm workspaces monorepo containing the React 19 frontend (`client/`), Express 5 API backend (`server/`), and shared Zod validation contracts (`shared/`).

---

## Tech Stack & Installed Versions

### Monorepo Tooling
- **Package Manager:** npm Workspaces (v10+ / v11+)
- **Runtime:** Node.js (v20+ / v22+ / v24+)
- **Process Orchestration:** `concurrently` (^10.0.6)
- **Formatting & Linting:** `eslint` (^10.12.0), `typescript-eslint` (^8.71.2), `prettier` (^3.9.10)
- **TypeScript:** `typescript` (^6.0.3) across all packages

### Frontend (`@afrihub/client`)
- **Core Framework:** React 19 (`19.3.1`) & React DOM (`19.3.1`)
- **Build Tooling:** Vite (`8.3.4`)
- **Routing:** React Router DOM (`7.18.4`)
- **Styling:** Tailwind CSS v4 (`4.3.3`) with `@tailwindcss/vite` (`4.3.3`)
- **Icons:** `lucide-react` (`1.57.0`)
- **Animation:** `motion` (`14.2.0`) with `prefers-reduced-motion` compliance
- **Forms & Validation:** `react-hook-form` (`7.90.0`), `@hookform/resolvers` (`5.9.1`), `zod` (`4.6.7`)
- **Automated Accessibility Testing:** `axe-core` (`4.14.0`), `vitest-axe` (`0.1.0`)
- **Unit Testing:** `vitest` (`5.0.4`), `@testing-library/react` (`16.3.3`), `jsdom` (`30.1.3`)

### Backend (`@afrihub/server`)
- **Runtime:** Node.js with Express 5 (`5.3.0`)
- **Database Engine:** Neon Serverless PostgreSQL (`@neondatabase/serverless` ^1.2.0)
- **ORM & Migrations:** `drizzle-orm` (`0.45.4`), `drizzle-kit` (`0.31.11`)
- **Security & Middleware:** `helmet` (`8.3.0`), `cors` (`2.8.6`), `express-rate-limit` (`8.7.1`), `dotenv` (`18.0.8`)
- **Request Validation:** `zod` (`4.6.7`) consuming shared contracts
- **API Testing:** `vitest` (`5.0.4`), `supertest` (`7.3.1`)

### Shared Contracts (`@afrihub/shared`)
- **Validation Engine:** `zod` (`4.6.7`)
- **Zero-Build Architecture:** Direct TypeScript path resolution and project references for instant feedback

---

## Monorepo Structure

```
afrihub/
  package.json              # Monorepo workspaces definition and orchestration scripts
  .gitignore                # Git exclusions (credentials, dist, logs, node_modules)
  README.md                 # Complete system documentation
  shared/                   # Shared types, Zod schemas, and enum constants
    src/
      schemas/
        join.ts             # JoinForm schema (track, experience, country, interests, honeypot)
        partner.ts          # PartnerForm schema (interestType, budgetRange, message, honeypot)
        contact.ts          # ContactForm schema (category, subject, message, newsletter, honeypot)
      index.ts              # Shared contract entry point
    tsconfig.json
  client/                   # React 19 client application
    public/                 # Favicons (SVG, PNG, ICO), og-image.png, robots.txt, sitemap.xml
    src/
      main.tsx              # Application entry point
      App.tsx               # Route layout, Skip-to-Content link, React Router
      routes/               # Per-page views (Home, About, WhatWeDo, Events, Join, Partners, Contact, Credits, 404)
      components/
        layout/             # Navbar, Footer, Section, Container, PageWrapper, SEO
        ui/                 # Button, Card, Input, Select, StatCounter, Accordion, RadioCardGroup
        forms/              # JoinForm, PartnerForm, ContactForm
        sections/           # HeroSection, WhatWeDoSection, AboutSection, UpcomingEventsSection, etc.
      content/              # Typed static content (events, team, stats, partners, faq, testimonials)
      lib/                  # API client, config, motion utilities
      styles/               # Tailwind theme tokens and accessible focus/motion rules
      __tests__/            # Accessibility (axe), unit, and form integration tests
    vite.config.ts
    tsconfig.json
  server/                   # Express 5 API application
    src/
      index.ts              # Server bootstrap and port listener
      app.ts                # Express application configuration (cors, helmet, rate limiting)
      routes/               # Route controllers (health.ts, join.ts, partners.ts, contact.ts)
      db/
        schema.ts           # Drizzle PostgreSQL schema definitions
        client.ts           # Neon serverless client with environment-aware branch routing
      middleware/           # honeypot.ts, rate-limiter.ts, error-handler.ts
    drizzle/                # Generated SQL migration files (0000_...)
    tests/                  # Vitest and Supertest API suite running against TEST_DATABASE_URL
    drizzle.config.ts       # Drizzle Kit CLI configuration
    tsconfig.json
```

---

## Prerequisites

- **Node.js:** Node.js version `20.x` or higher (`node -v`)
- **npm:** npm version `10.x` or higher (`npm -v`)
- **Neon Account:** A Neon serverless Postgres project with a `main` branch and a `test` branch

---

## Environment Variables

All secrets and environment configs reside in `server/.env`. No secrets or environment files are ever committed to version control.

### `server/.env`
| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Connection string for Neon **main** branch (`postgres://...ba1yp33z...neon.tech/neondb?sslmode=require`). Used in production and standard dev server. |
| `TEST_DATABASE_URL` | Yes | Connection string for Neon **test** branch (`postgres://...baa9rvuu...neon.tech/neondb?sslmode=require`). Used for test suites and preview servers. |
| `PORT` | Optional | Port for the Express API server (defaults to `4000`). |
| `CLIENT_ORIGIN` | Optional | Allowed CORS origins, comma-separated (defaults to `http://localhost:5173,http://localhost:4173`). |
| `USE_TEST_DB` | Optional | Set to `true` to force the Express server to connect to `TEST_DATABASE_URL` during local preview. |

### `client/.env`
| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Optional | Base URL for backend API calls (defaults to `http://localhost:4000`). |
| `VITE_SITE_URL` | Optional | Canonical URL base for SEO tags and sitemap (defaults to `https://afrihub.example`). |

---

## Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rex-onal/Afrihub.git
   cd Afrihub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the example environment file and add your Neon connection strings:
   ```bash
   cp server/.env.example server/.env
   ```
   Add your `DATABASE_URL` (main branch) and `TEST_DATABASE_URL` (test branch) in `server/.env`.

---

## npm Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `concurrently ...` | Runs client (5173), server (4000), and shared watch concurrently with live hot-reload |
| `npm run dev:client` | `npm run dev --workspace=@afrihub/client` | Runs Vite development server on port 5173 |
| `npm run dev:server` | `npm run dev --workspace=@afrihub/server` | Runs Express API server via `tsx watch` |
| `npm run dev:shared` | `npm run dev --workspace=@afrihub/shared` | Runs TypeScript compilation watch for shared contracts |
| `npm run typecheck` | `tsc --noEmit` across all workspaces | Strict TypeScript verification across client, server, and shared (zero `any`) |
| `npm run lint` | `eslint "**/*.{ts,tsx,js,jsx}"` | Monorepo ESLint code style and quality validation |
| `npm test` | Runs both client and server test suites | Executes Vitest client tests and Supertest server API suite |
| `npm run test:client` | `vitest run` in `client` | Executes client unit, accessibility (axe), and integration tests |
| `npm run test:server` | `vitest run` in `server` | Executes server API tests strictly against `TEST_DATABASE_URL` |
| `npm run build` | Builds shared, client, and server | Compiles production bundles for all three workspaces |
| `npm run check` | Typecheck, lint, test, and build | Comprehensive monorepo validation pipeline |
| `npm run preview` | Builds and launches preview | Runs built client on port 4173 and built server on port 4000 connected to `TEST_DATABASE_URL` |

---

## Database Workflow

AfriHub uses Drizzle ORM and Drizzle Kit with serverless Neon PostgreSQL.

### 1. Generating Migrations
When schema updates are made in `server/src/db/schema.ts`, generate SQL migrations:
```bash
npm run db:generate --workspace=@afrihub/server
```
This generates SQL files in `server/drizzle/` (e.g. `0000_...sql`).

### 2. Applying Migrations
Apply migrations across database branches using Drizzle Kit:
```bash
# Migrating the isolated test branch
TEST_DATABASE_URL="postgresql://..." npx drizzle-kit migrate

# Migrating the production main branch
DATABASE_URL="postgresql://..." npx drizzle-kit migrate
```
Migration state is tracked in PostgreSQL inside the `drizzle.__drizzle_migrations` journal table with SHA-256 migration hashes.

### 3. The Isolated Test Branch
All automated test runs and manual preview runs are strictly isolated to `TEST_DATABASE_URL`. The server test suite automatically enforces this check and will abort if `TEST_DATABASE_URL` is missing or accidentally matches `DATABASE_URL`.

---

## Testing Approach

The project enforces automated test coverage across both frontend and backend.

### Frontend Testing (`client/src/__tests__`)
- **Automated Axe Accessibility (WCAG 2.1 AA):** Tests all 9 site routes and standalone forms using `axe-core` and `vitest-axe` to guarantee zero accessibility violations.
- **Component Unit Tests:**
  - `Navbar.test.tsx`: Desktop and mobile navigation drawer, ARIA states, keyboard traps.
  - `Button.test.tsx` & `Input.test.tsx`: Rendering variants, disabled states, aria-invalid attributes.
  - `Accordion.test.tsx`: Expansion toggles, `aria-expanded` synchronization, multi-open behavior.
  - `EventsFilter.test.tsx`: Event category filtering (Hackathons, Workshops, Summits).
  - `StatCounter.test.tsx`: Instant metric rendering under `prefers-reduced-motion: reduce`.
- **Form Integration Tests:**
  - Valid payload submission with realistic mock network responses.
  - Inline error rendering on 400 validation failures.
  - User-friendly error messaging on 409 conflict and 429 rate limit errors.

### Backend API Testing (`server/tests/server.test.ts`)
- Runs strictly against Neon `TEST_DATABASE_URL`.
- **Health:** Verifies `GET /api/health` returns status `200 { status: 'ok' }`.
- **Valid Submissions:** Submits valid data to `/api/join`, `/api/partners`, and `/api/contact`, confirming HTTP 201 and record persistence in Neon.
- **Validation:** Verifies 400 Bad Request with field-level error messages.
- **Enums:** Verifies strict rejection of unrecognised enum values.
- **Conflict Handling:** Confirms HTTP 409 and exact copy: `"This email is already registered with AfriHub. Contact us if you need help."`
- **Honeypot Trap:** Verifies that filling the hidden `website` field returns silent HTTP 201 with zero database records created.
- **Rate Limiting:** Confirms HTTP 429 after 5 POST requests per minute per IP.
- **Automatic Cleanup:** Deletes all test records after test runs.

---

## How to Run Local Dev and Preview Servers

### Development Server (Hot Reload)
To launch all monorepo workspaces in development mode:
```bash
npm run dev
```
- Client runs at: `http://localhost:5173`
- API server runs at: `http://localhost:4000`
- API Health check: `http://localhost:4000/api/health`

### Production Preview Server
To test the built production bundle locally connected to the Neon test branch:
```bash
npm run preview
```
- Client preview runs at: `http://localhost:4173`
- API server runs at: `http://localhost:4000` (connected to `TEST_DATABASE_URL`)
- Any form submissions submitted during preview are stored in the test branch, keeping the main branch pristine.

---

## Deployment

> **Deployment Status:** Marked as **To be completed later**.
> Production hosting, DNS routing, and CI/CD deployment pipelines will be provisioned in a subsequent phase.

---

## Licenses & Attribution of Media Assets

All media and geographic assets utilized across AfriHub are open-licensed and documented below matching the `/credits` route:

### 1. Africa Geographic Continent Map & Silhouette
- **Asset:** `client/src/assets/africa-map.svg`
- **Source:** [Wikimedia Commons: File:BlankMap-Africa.svg](https://commons.wikimedia.org/wiki/File:BlankMap-Africa.svg)
- **License:** Public Domain ([CC Public Domain Dedication](https://commons.wikimedia.org/wiki/Help:Public_domain) / released into the public domain worldwide by its author Lokal_Profil, without conditions; no attribution required).
- **Modifications:** Styled with CSS fills `#FCF9F8` and accent strokes `#D7C3AE`. Interactive hub pins placed over key continental hubs (Abuja, Lagos, Nairobi, Kigali, Accra, Johannesburg).

### 2. Photography Assets
All photography features African software builders and students in modern tech workshops, hackathons, and design labs:

1. **`hero-1.webp`**
   - **Title:** Young African tech builders collaborating in an innovation hub
   - **Source:** Generated in Google Stitch for this project
   - **License:** Editorial Project Asset (no external license link required)
   - **Usage:** Homepage Hero showcase card, What We Do section thumbnail

2. **`hero-2.webp`**
   - **Title:** Code review and developer collaboration at Arewa Hackathon 2026
   - **Author:** JosefAnthony ([User:JosefAnthony](https://commons.wikimedia.org/wiki/User:JosefAnthony))
   - **Source:** [Wikimedia Commons: File:Arewa_Hackathon17.jpg](https://commons.wikimedia.org/wiki/File:Arewa_Hackathon17.jpg)
   - **License:** [Creative Commons Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) (CC BY-SA 4.0)
   - **Modifications:** Converted to modern WebP format, resized, and optimized for responsive web delivery

3. **`hero-3.webp`**
   - **Title:** Tech workshop collaboration session at Tamale Hackathon
   - **Author:** Ruky Wunpini ([User:Ruky_Wunpini](https://commons.wikimedia.org/wiki/User:Ruky_Wunpini))
   - **Source:** [Wikimedia Commons: File:Wiki_Mentor_Africa_Tamale_Hackathon_2025_14.jpg](https://commons.wikimedia.org/wiki/File:Wiki_Mentor_Africa_Tamale_Hackathon_2025_14.jpg)
   - **License:** [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0)
   - **Modifications:** Converted to modern WebP format, resized, and optimized for responsive web delivery

4. **`hero-4.webp`**
   - **Title:** African software engineers at Rebase code camp
   - **Author:** Kongnyu Roger ([User:Kongnyu_Roger](https://commons.wikimedia.org/wiki/User:Kongnyu_Roger))
   - **Source:** [Wikimedia Commons: File:Wikimentor_Africa_Hackathon_2024_at_Rebase.jpg](https://commons.wikimedia.org/wiki/File:Wikimentor_Africa_Hackathon_2024_at_Rebase.jpg)
   - **License:** [Creative Commons CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/deed.en) (CC0)
   - **Modifications:** Converted to modern WebP format, resized, and optimized for responsive web delivery

---

## Fictional Organizations & Contact Credentials

AfriHub is a fictional community demonstration. All contact details and partner names are obvious placeholders:
- **Email:** `hello@afrihub.example`
- **Phone:** `+234 000 000 0000`
- **Headquarters Location:** `Abuja, Nigeria`
- **Fictional Partner Marks:** Savanna Capital, Kigali Tech Ventures, Atlas Innovation Lab, Zambezi Cloud Systems, Sahara Open Academy, Bantu Engineering Guild.
