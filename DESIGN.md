# DESIGN.md: AfriHub Design Source and System

## 1. Source of truth: Stitch

The AfriHub UI is already designed in Google Stitch. **The Stitch project is the source of truth for every screen.** This file tells you how to pull it and gives a fallback design system for anything Stitch does not cover.

- **Stitch project name:** `Afrihubcommuintyhomepage` (spelled exactly like this)
- **Access:** through the Stitch MCP server connected to this workspace

### How to pull the designs

1. Use the Stitch MCP to list projects and find `Afrihubcommuintyhomepage`.
2. List every screen in the project (desktop and mobile versions, if both exist).
3. For each screen, fetch its generated code and its screenshot or preview.
4. Before writing any components, write a short inventory:
   - each screen name and which route it maps to (see `AGENTS.md` section 5)
   - the colours, fonts, radii, shadows and spacing you extracted
   - any screens missing for a planned page
5. Extract the design tokens from the Stitch code into the Tailwind theme. Where the Stitch values differ from section 3 below, **Stitch wins**.

### How to use Stitch code

- Treat the Stitch output as a **visual and structural reference**, not production code.
- Rebuild it as clean, typed React components that follow `AGENTS.md`: reusable components, Tailwind theme tokens instead of hard-coded values, semantic HTML and accessibility.
- Keep the layout, hierarchy, spacing rhythm and imagery placement faithful to the screens.
- If the Stitch MCP is unavailable or the project cannot be found, stop and report it. Do not guess the design.

## 2. Design direction

Warm, modern and editorial, with a pan-African tech identity. The feel is optimistic, energetic and credible enough for investors. It is a tech community, not a charity, so the imagery shows young African tech professionals and students coding, collaborating at hackathons, presenting and celebrating wins. Never use poverty or charity-style imagery.

## 3. Fallback design tokens

Use these only where Stitch is silent.

### Colours
| Token | Hex | Use |
|---|---|---|
| `background` | `#FAF8F5` | Page background (warm off-white) |
| `surface` | `#FFFFFF` | Cards, form cards |
| `ink` | `#111111` | Headings, primary buttons, dark banners |
| `body` | `#6B6B6B` | Body text |
| `primary` | `#F5A623` | Accent: eyebrows, icons, secondary buttons, highlights |
| `teal` | `#1E9E73` | Play button, small accents, decorative dots |
| `sky` | `#2D9CDB` | Decorative dots only |
| `coral` | `#E8572A` | Decorative dots only |
| `border` | `#ECE8E1` | Dividers, input borders |

### Typography
- **Headings:** DM Serif Display (high-contrast serif)
- **Body and UI:** DM Sans
- **Eyebrow labels:** DM Sans, uppercase, small (12px), letter-spaced, `primary` colour
- **Scale (desktop):** H1 56 to 64px, H2 40px, H3 24px, body 16px, small 14px. Scale down on mobile.

### Shape and depth
- Card radius: 20px. Input radius: 12px. Buttons: full pill.
- Shadow: soft and diffuse, for example `0 10px 30px rgba(17,17,17,0.06)`.
- Content max width: 1200px, centred. Section vertical padding: 96px on desktop, 64px on mobile.

### Buttons
- **Primary:** black pill, white text, with a small circular icon on the left
- **Secondary:** orange (`primary`) pill with dark text
- **Outline:** transparent with a 1px `ink` border
- **Play:** round teal button with a white play icon and a label beside it
- **Card action:** small orange square "+" button in the bottom-right corner of the card

## 4. Signature visual motifs

Recreate these wherever the Stitch screens use them:

- **Africa silhouette mask:** the hero photo collage is clipped inside an Africa continent shape (SVG `clipPath`).
- **Faint world map texture:** a very light grey world map behind sections.
- **Dotted map pattern:** a halftone-dot map behind the About photo cluster and the Join CTA banner.
- **Floating dots:** small circles in `primary`, `teal`, `sky` and `coral` scattered around the hero and image areas. These are decorative, so mark them `aria-hidden`.
- **Overlapping circular photos:** a cluster of three round images in the About section.
- **Gradient Africa map with pins:** an orange-to-amber Africa shape with white location pins in the Impact section.
- **Section header pattern:** eyebrow label, then a centred serif title, then a one-line grey subtitle.

## 5. Home page section order

1. Navbar
2. Hero
3. What We Do (4 cards)
4. About
5. Upcoming Events (3 cards with a Date / Location / Seats stat row)
6. Impact (2x2 stat cards plus the gradient Africa map)
7. Partners & Investors
8. Join CTA banner (black, rounded)
9. Footer

Follow the Stitch screen if its order differs.

## 6. Responsive behaviour

- **Navbar:** collapses to a hamburger with an accessible slide-down or drawer menu below 1024px.
- **Hero:** text stacks above the Africa collage on mobile.
- **Card grids:** 4 columns, then 2, then 1. Event cards: 3, then 2, then 1.
- **Split sections** (About, Impact, Contact): stack vertically on mobile, with the image first.
- **Forms:** full width on mobile, and two-column field rows collapse to one.

## 7. Motion

Keep it subtle: fade and slide-up on scroll for sections, gentle hover lift on cards, and a slow float on the decorative dots. Respect `prefers-reduced-motion`.

## 8. Imagery

- Use royalty-free placeholder photos of young African tech professionals until real photos are supplied.
- Every image needs meaningful alt text. Decorative shapes use empty alt or `aria-hidden`.
- Serve images in WebP or AVIF, at sensible sizes, and lazy-load anything below the fold.
