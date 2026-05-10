---

name: Next Notion CMS
version: "1.0"
description: >
  A clean, minimal, content-first design system for a Next.js blog
  powered by Notion as a CMS. Optimized for readability, fast scanning,
  and a distraction-free reading experience.

colors:
  primary: "#1A1A2E"
  primary-hover: "#16213E"
  accent: "#0F3460"
  accent-light: "#E2E8F0"
  on-primary: "#FFFFFF"
  on-accent: "#FFFFFF"
  surface: "#FFFFFF"
  surface-alt: "#F8FAFC"
  on-surface: "#1A1A2E"
  on-surface-muted: "#64748B"
  border: "#E2E8F0"
  border-strong: "#CBD5E1"
  success: "#16A34A"
  warning: "#EAB308"
  error: "#DC2626"
  code-bg: "#F1F5F9"
  code-text: "#0F172A"
  highlight: "#DBEAFE"

typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  h1:
    fontFamily: "Inter, sans-serif"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Inter, sans-serif"
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Inter, sans-serif"
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  h4:
    fontFamily: "Inter, sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.02em"
  code:
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.7

rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px

shadows:
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)"
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)"
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"

breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px

components:
  # --- Navigation ---
  navbar:
    backgroundColor: "rgba(255, 255, 255, 0.8)"
    backdropFilter: "blur(12px)"
    borderBottom: "1px solid {colors.border}"
    height: 64px
    padding: "0 {spacing.lg}"

  # --- Buttons ---
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    fontWeight: 600
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    border: "1px solid {colors.border-strong}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-alt}"

  # --- Cards (Blog Post Cards) ---
  card-post:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
    shadow: "{shadows.sm}"
  card-post-hover:
    shadow: "{shadows.md}"
    borderColor: "{colors.border-strong}"

  # --- Tags ---
  tag:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.accent}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "4px 12px"

  # --- Code Blocks ---
  code-inline:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-text}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  code-block:
    backgroundColor: "{colors.code-bg}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
    border: "1px solid {colors.border}"

  # --- Blog Article Prose ---
  prose:
    maxWidth: 720px
    typography: "{typography.body}"
    textColor: "{colors.on-surface}"

  # --- Cover Image ---
  cover-image:
    rounded: "{rounded.lg}"
    width: "100%"
    aspectRatio: "16/9"
    objectFit: cover

  # --- Footer ---
  footer:
    backgroundColor: "{colors.surface-alt}"
    borderTop: "1px solid {colors.border}"
    padding: "{spacing.2xl} {spacing.lg}"
---

# Next Notion CMS — Design System

## Overview

Next Notion CMS is a developer blog and content management system built with
**Next.js** and powered by **Notion** as a headless CMS. The design system
prioritises **readability**, **speed**, and **minimalism** — letting the
written content be the hero of every page.

The visual language borrows from modern editorial design: generous whitespace,
tight typographic hierarchy, and restrained use of colour. Every decision is
made to reduce noise and guide the reader's eye to what matters.

---

## Design Principles

1. **Content is king** — Every visual element exists to support readability.
   If it doesn't serve the content, remove it.
2. **Quiet confidence** — The interface should feel authoritative without being
   loud. Use colour sparingly; let typography and spacing do the heavy lifting.
3. **Performance as a feature** — Visual choices must support fast load times.
   Prefer system font stacks, minimal shadows, and CSS-first solutions.
4. **Accessible by default** — All colour pairings meet WCAG AA contrast
   ratios. Interactive elements have visible focus states.
5. **Progressive disclosure** — Show the essentials first (title, excerpt,
   date), reveal details on interaction or navigation.

---

## Colors

### Primary Palette

| Token          | Hex       | Usage                                         |
| -------------- | --------- | --------------------------------------------- |
| `primary`      | `#1A1A2E` | Headings, navbar text, primary buttons        |
| `primary-hover`| `#16213E` | Button hover, link hover states               |
| `accent`       | `#0F3460` | Secondary emphasis, active tags, links         |
| `accent-light` | `#E2E8F0` | Tag backgrounds, subtle highlights            |

### Surface & Text

| Token             | Hex       | Usage                                      |
| ----------------- | --------- | ------------------------------------------ |
| `surface`         | `#FFFFFF` | Page background, card background           |
| `surface-alt`     | `#F8FAFC` | Alternating sections, footer, code blocks  |
| `on-surface`      | `#1A1A2E` | Primary body text                          |
| `on-surface-muted`| `#64748B` | Dates, captions, secondary metadata        |

### Borders

| Token          | Hex       | Usage                              |
| -------------- | --------- | ---------------------------------- |
| `border`       | `#E2E8F0` | Default dividers, card borders     |
| `border-strong`| `#CBD5E1` | Hover borders, input focus rings   |

### Semantic

| Token     | Hex       | Usage                           |
| --------- | --------- | ------------------------------- |
| `success` | `#16A34A` | Published status, confirmations |
| `warning` | `#EAB308` | Draft status, caution states    |
| `error`   | `#DC2626` | Errors, failed states           |

### Code

| Token      | Hex       | Usage                      |
| ---------- | --------- | -------------------------- |
| `code-bg`  | `#F1F5F9` | Inline and block code bg   |
| `code-text`| `#0F172A` | Code text                  |

**Rationale:** The dark navy primary (`#1A1A2E`) paired with pure white
surfaces creates a high-contrast, editorial feel without the harshness of
`#000000`. The muted accent keeps the palette cohesive and avoids visual
competition with blog cover images.

---

## Typography

### Type Scale

| Level      | Family       | Size    | Weight | Line Height | Use Case                    |
| ---------- | ------------ | ------- | ------ | ----------- | --------------------------- |
| `display`  | Inter        | 3rem    | 800    | 1.1         | Hero titles, landing page   |
| `h1`       | Inter        | 2.25rem | 700    | 1.2         | Blog post title             |
| `h2`       | Inter        | 1.75rem | 700    | 1.3         | Section headings in posts   |
| `h3`       | Inter        | 1.375rem| 600    | 1.4         | Sub-section headings        |
| `h4`       | Inter        | 1.125rem| 600    | 1.5         | Card titles, sidebar heads  |
| `body`     | Inter        | 1rem    | 400    | 1.75        | Blog body text, descriptions|
| `body-sm`  | Inter        | 0.875rem| 400    | 1.6         | Metadata, dates, buttons    |
| `caption`  | Inter        | 0.75rem | 500    | 1.5         | Tags, labels, footnotes     |
| `code`     | JetBrains Mono| 0.875rem| 400   | 1.7         | Code blocks, inline code    |

**Rationale:** Inter is chosen for its excellent screen readability and wide
availability. The generous `line-height: 1.75` for body text prevents long
blog articles from feeling cramped. Negative letter-spacing on headings
tightens them for visual impact at larger sizes.

**Font Loading Strategy:** Use `next/font/google` to self-host Inter and
JetBrains Mono with `display: swap` for zero layout shift.

---

## Spacing

The spacing system follows an **8px base grid** with a 4px option for tight
elements:

| Token | Value | Common Use                            |
| ----- | ----- | ------------------------------------- |
| `xs`  | 4px   | Inline padding, icon gaps             |
| `sm`  | 8px   | Tight element spacing, tag padding    |
| `md`  | 16px  | Default padding, input padding        |
| `lg`  | 24px  | Card padding, section gaps            |
| `xl`  | 32px  | Section spacing                       |
| `2xl` | 48px  | Page section breaks                   |
| `3xl` | 64px  | Major section separators              |
| `4xl` | 96px  | Hero spacing, landing page sections   |

**Rationale:** Consistent spacing creates visual rhythm. Blog content pages
use generous vertical spacing (`2xl`–`3xl`) between blocks to give readers
breathing room.

---

## Layout

### Page Structure

- **Max content width:** `1280px` (outer container)
- **Prose/article width:** `720px` (centered, optimal reading line length)
- **Sidebar (if applicable):** `280px`
- **Navbar height:** `64px` (sticky, with backdrop blur)
- **Footer:** Full-width, `surface-alt` background

### Grid

- Blog listing: **3-column** grid on desktop (`lg`), **2-column** on tablet
  (`md`), **1-column** on mobile.
- Gap between cards: `{spacing.lg}` (24px)

### Responsive Breakpoints

| Name | Value   | Target             |
| ---- | ------- | ------------------ |
| `sm` | 640px   | Large phones       |
| `md` | 768px   | Tablets            |
| `lg` | 1024px  | Small desktops     |
| `xl` | 1280px  | Large desktops     |

---

## Components

### Navigation Bar

- Fixed/sticky at top with `backdrop-filter: blur(12px)` and semi-transparent
  white background for a frosted-glass effect.
- Logo/site name on the left, nav links on the right.
- 1px bottom border for subtle separation.
- Mobile: hamburger menu with slide-in drawer.

### Blog Post Card

- White background with 1px `border` and `rounded-lg`.
- Cover image at top with `rounded-lg` corners and `16:9` aspect ratio.
- Title (`h4`), excerpt (`body-sm`, 2-line clamp), date (`caption`, muted),
  and tags.
- On hover: shadow lifts from `sm` → `md`, border darkens to `border-strong`.
- Transition: `all 200ms ease`.

### Tags / Badges

- Pill-shaped (`rounded-full`).
- `accent-light` background with `accent` text.
- Caption typography.
- Used on post cards and post detail pages.

### Buttons

- **Primary:** Solid `primary` background, white text, `rounded-md`. Hover
  darkens to `primary-hover`.
- **Secondary/Ghost:** Transparent background, `primary` text, 1px
  `border-strong` border. Hover fills `surface-alt`.
- Padding: `10px 20px`. Minimum touch target: `44px` height.
- Transition: `background-color 150ms ease, box-shadow 150ms ease`.

### Code Blocks

- **Inline:** `code-bg` background, `code-text` text, `rounded-sm`, small
  horizontal padding.
- **Block:** `code-bg` background, 1px `border`, `rounded-lg`, `md` padding.
  Use syntax highlighting (e.g., Prism or Shiki) with a light theme that
  respects the palette.
- Line numbers in `on-surface-muted`.
- Copy button positioned top-right inside the block.

### Blog Article Prose

- Max width of `720px`, centered on page.
- `body` typography with `1.75` line height for comfortable reading.
- Headings (`h2`, `h3`) get top margin of `2xl` and bottom margin of `md`
  to create clear section breaks.
- Blockquotes: left border `3px solid {colors.accent}`, `surface-alt`
  background, `md` padding, italic body text.
- Images: full-width within prose container, `rounded-lg`, optional caption
  below in `caption` style.
- Lists: `md` left padding, `sm` vertical gap between items.
- Horizontal rules: `1px solid {colors.border}`, `2xl` vertical margin.

### Cover Image

- `16:9` aspect ratio, `object-fit: cover`.
- `rounded-lg` corners.
- On blog detail pages, spans the full prose width.
- On cards, flush to card edges with top corners matching card radius.

### Footer

- `surface-alt` background with top border.
- Contains copyright, links to GitHub repo, and optional social links.
- `body-sm` typography, `on-surface-muted` colour.

---

## Elevation / Shadows

| Level | Value                                                      | Usage                    |
| ----- | ---------------------------------------------------------- | ------------------------ |
| `sm`  | `0 1px 2px rgba(0,0,0,0.05)`                              | Cards at rest            |
| `md`  | `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)` | Cards on hover  |
| `lg`  | `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)` | Dropdowns, modals |
| `xl`  | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.04)` | Hero cards        |

**Rationale:** Shadows are intentionally subtle. The design relies more on
borders and whitespace for separation. Shadows are reserved for interactive
feedback (hover) and layered elements (modals, dropdowns).

---

## Motion & Transitions

| Property          | Duration | Easing        | Usage                         |
| ----------------- | -------- | ------------- | ----------------------------- |
| Hover transitions | 150–200ms| `ease`        | Buttons, cards, links         |
| Page transitions  | 300ms    | `ease-in-out` | Route changes (if animated)   |
| Fade-in           | 400ms    | `ease-out`    | Content loading, images       |

- Prefer CSS transitions over JS animations for performance.
- No motion for users who set `prefers-reduced-motion: reduce`.

---

## Accessibility

- **Contrast:** All text/background combinations meet **WCAG AA** minimum
  (`4.5:1` for body text, `3:1` for large text).
  - `on-surface` (#1A1A2E) on `surface` (#FFFFFF) → **16.3:1** ✓
  - `on-surface-muted` (#64748B) on `surface` (#FFFFFF) → **4.9:1** ✓
- **Focus states:** All interactive elements show a visible `2px solid
  {colors.accent}` focus ring with `2px` offset.
- **Touch targets:** Minimum `44×44px` for all tappable elements.
- **Semantic HTML:** Use proper heading hierarchy (`h1` → `h2` → `h3`),
  landmarks (`nav`, `main`, `footer`), and ARIA labels where needed.
- **Alt text:** All Notion cover images must include descriptive alt text
  (sourced from Notion page properties or caption).
- **Keyboard navigation:** Full tab navigation support across all interactive
  components.

---

## Icons

- Use **Lucide React** (or similar thin-line icon set) for consistency.
- Icon size: `20px` default, `16px` for inline/small contexts.
- Icon colour: inherits `currentColor` from parent text.
- Stroke width: `1.5px`.

---

## Dark Mode (Optional / Future)

If dark mode is implemented, override these tokens:

| Token             | Light       | Dark        |
| ----------------- | ----------- | ----------- |
| `surface`         | `#FFFFFF`   | `#0F172A`   |
| `surface-alt`     | `#F8FAFC`   | `#1E293B`   |
| `on-surface`      | `#1A1A2E`   | `#F1F5F9`   |
| `on-surface-muted`| `#64748B`   | `#94A3B8`   |
| `border`          | `#E2E8F0`   | `#334155`   |
| `code-bg`         | `#F1F5F9`   | `#1E293B`   |

Use `prefers-color-scheme` media query or a toggle in the navbar.

---

## Do's and Don'ts

### ✅ Do

- Use the `720px` max-width for all article content.
- Maintain generous vertical spacing between content blocks.
- Use `primary` colour only for the most important actions and headings.
- Keep cards simple — image, title, excerpt, date, tags. Nothing more.
- Use the monospace font exclusively for code elements.
- Lazy-load cover images and below-the-fold content.
- Serve images via Next.js `<Image>` component for automatic optimization.

### ❌ Don't

- Don't use more than 2 font families (Inter + JetBrains Mono).
- Don't add background colours or gradients to the main reading area.
- Don't use shadows heavier than `lg` — keep the interface flat and clean.
- Don't mix rounded and sharp corners within the same visual context.
- Don't center-align body text. Always left-align for readability.
- Don't use `accent` as a background colour for large areas.
- Don't override Notion content styles — let the markdown rendering
  handle formatting consistently.

---

## File Structure Reference

```
project-root/
├── DESIGN.md          ← This file
├── README.md
├── app/
│   ├── layout.tsx     ← Global fonts, navbar, footer
│   ├── page.tsx       ← Blog listing (card grid)
│   └── blog/
│       └── [slug]/
│           └── page.tsx  ← Blog post detail (prose)
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── TagBadge.tsx
│   └── CodeBlock.tsx
└── styles/
    └── globals.css    ← Tailwind + custom tokens
```

---

## Token Integration with Tailwind CSS

Map DESIGN.md tokens to your `tailwind.config.ts`:

```ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1A1A2E", hover: "#16213E" },
        accent: { DEFAULT: "#0F3460", light: "#E2E8F0" },
        surface: { DEFAULT: "#FFFFFF", alt: "#F8FAFC" },
        "on-surface": { DEFAULT: "#1A1A2E", muted: "#64748B" },
        border: { DEFAULT: "#E2E8F0", strong: "#CBD5E1" },
        code: { bg: "#F1F5F9", text: "#0F172A" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      maxWidth: {
        prose: "720px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
};
```

---

*This design system is the single source of truth for all UI decisions in
Next Notion CMS. When in doubt, reference this file. When prompting AI
agents, point them here.*


