# AfriHub — Pan-African Tech Community

AfriHub is a pan-African tech community that unites tech talent across all 54 African nations. It connects African builders to scholarships, high-stakes hackathons, dedicated mentorship, regional tech events, and global career opportunities.

This repository is built as an npm workspaces monorepo containing the React 19 frontend (`client/`), Express 5 API backend (`server/`), and shared Zod validation contracts (`shared/`).

---

## Licenses & Attribution of Third-Party Assets

Per project governance, all third-party media and geographic assets are strictly open-licensed, with sources and licenses documented below:

### 1. Africa Geographic Continent Map & Silhouette
- **Asset:** `client/src/assets/africa-map.svg`
- **Source:** [Wikimedia Commons — File:BlankMap-Africa.svg](https://commons.wikimedia.org/wiki/File:BlankMap-Africa.svg)
- **License:** Public Domain ([CC Public Domain Dedication](https://commons.wikimedia.org/wiki/Help:Public_domain) / released into the public domain worldwide by its author Lokal_Profil, without conditions; no attribution required).
- **Permitted Uses:** Free commercial and non-commercial reproduction, distribution, modification, and derivative works.

### 2. Hero Showcase Photography
All hero photos feature young African tech professionals coding, collaborating, and mentoring in modern tech workspaces and hackathons:

1. **`hero-1.webp`**
   - **Description:** Young African tech builders collaborating around laptops in an innovation hub with whiteboard architecture diagrams.
   - **Source:** Google Stitch Project (`AfriHub Community Homepage`).
   - **License:** Editorial Project Asset.
2. **`hero-2.webp`**
   - **Description:** African tech developers collaborating and reviewing code on a laptop screen at Arewa Hackathon 2026.
   - **Photographer:** JosefAnthony ([User:JosefAnthony](https://commons.wikimedia.org/wiki/User:JosefAnthony))
   - **Source:** [Wikimedia Commons — File:Arewa_Hackathon17.jpg](https://commons.wikimedia.org/wiki/File:Arewa_Hackathon17.jpg)
   - **License:** [Creative Commons Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) (CC BY-SA 4.0).
3. **`hero-3.webp`**
   - **Description:** Young African tech builders collaborating with laptops in an innovation workshop room ("Build Your Own Roadmap").
   - **Photographer:** Ruky Wunpini ([User:Ruky_Wunpini](https://commons.wikimedia.org/wiki/User:Ruky_Wunpini))
   - **Source:** [Wikimedia Commons — File:Wiki_Mentor_Africa_Tamale_Hackathon_2025_14.jpg](https://commons.wikimedia.org/wiki/File:Wiki_Mentor_Africa_Tamale_Hackathon_2025_14.jpg)
   - **License:** [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0).
4. **`hero-4.webp`**
   - **Description:** African software engineers and students in a tech code camp session with laptops and a presentation display.
   - **Photographer:** Kongnyu Roger ([User:Kongnyu_Roger](https://commons.wikimedia.org/wiki/User:Kongnyu_Roger))
   - **Source:** [Wikimedia Commons — File:Wikimentor_Africa_Hackathon_2024_at_Rebase.jpg](https://commons.wikimedia.org/wiki/File:Wikimentor_Africa_Hackathon_2024_at_Rebase.jpg)
   - **License:** [Creative Commons CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/deed.en) (CC0).

---

## Fictional Organizations & Placeholder Contact Details

AfriHub is a fictional tech community demonstration. All institutional brands, event venues, and contact credentials are fictional placeholders:
- **Email:** `hello@afrihub.example` (All mock emails use `example.com`)
- **Phone:** `+234 000 000 0000`
- **Location:** `Abuja, Nigeria`
- **Fictional Partner Marks:** Savanna Capital, Kigali Tech Ventures, Atlas Innovation Lab, Zambezi Cloud Systems, Sahara Open Academy, Bantu Engineering Guild.

---

## Getting Started

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+` or `v11+`

### Installation
```bash
npm install
```

### Development
To run both client (port 5173) and backend API (port 4000) concurrently with live reloads of the shared package:
```bash
npm run dev
```

Or run individual workspaces:
```bash
npm run dev:client   # Vite dev server
npm run dev:server   # Express API server
npm run dev:shared   # tsc --watch for shared contracts
```

### Verification
```bash
npm run typecheck    # Strict TypeScript check across all workspaces
npm run lint         # ESLint check across all workspaces
npm run build        # Production bundle build
```
