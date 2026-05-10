---

version: 1.0.0
name: Next Notion CMS
description: A modern, high-performance technical documentation and engineering portfolio platform built with Next.js 16, Tailwind CSS 4, and TypeScript. Photography-first content presentation with glassy dashboard aesthetics, teal/cyan accent system, and Notion-powered headless CMS architecture.
colors:
  # Core palette
  primary: hsl(181 100% 28%)      # Teal accent #008080-ish
  primary-focus: hsl(181 100% 34%) # Lighter teal for focus states
  primary-on-dark: hsl(181 100% 45%) # Brighter teal for dark surfaces
  foreground: hsl(220 27% 4%)     # Near-black text on light
  background: hsl(216 100% 98%)   # Off-white canvas
  card: hsl(0 0% 100%)            # Pure white cards
  muted: hsl(216 20% 90%)         # Subtle backgrounds
  muted-foreground: hsl(220 5% 34%) # Secondary text
  border: hsl(222 13% 85%)        # Subtle dividers
  destructive: hsl(3 65% 55%)     # Error states
  # Dark theme overrides
  dark-foreground: hsl(216 33% 94%)
  dark-background: hsl(220 27% 4%)
  dark-card: hsl(214 19% 7%)
  dark-muted: hsl(214 13% 11%)
  dark-border: hsl(218 10% 16%)
  # Sidebar tokens
  sidebar: hsl(218 48% 95%)
  sidebar-foreground: hsl(220 27% 4%)
  sidebar-border: hsl(222 13% 85%)
  sidebar-dark: hsl(223 24% 6%)
  # Brand ramp for selection/accents
  brand-200: hsl(181 100% 78%)
  brand-900: hsl(181 100% 8%)
typography:
  # Font stacks (loaded locally via CSS variables)
  fontFamily:
    display: "Mozilla Headline, Amoria Regular, system-ui, sans-serif"
    body: "Local Inter, Mozilla Text, system-ui, sans-serif"
    mono: "JetBrains Mono, Space Mono, monospace"
    utility: "Google Sans, Roboto, system-ui, sans-serif"
  # Type scale
  hero-display:   { fontSize: 80px, fontWeight: 900, lineHeight: 0.85, letterSpacing: -0.03em }
  display-lg:     { fontSize: 48px, fontWeight: 900, lineHeight: 1.0, letterSpacing: -0.02em }
  display-md:     { fontSize: 36px, fontWeight: 700, lineHeight: 1.1, letterSpacing: -0.01em }
  section-title:  { fontSize: 32px, fontWeight: 700, lineHeight: 1.2, letterSpacing: 0 }
  lead:           { fontSize: 24px, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0 }
  body-strong:    { fontSize: 17px, fontWeight: 600, lineHeight: 1.47, letterSpacing: -0.01em }
  body:           { fontSize: 17px, fontWeight: 400, lineHeight: 1.47, letterSpacing: -0.01em }
  caption:        { fontSize: 14px, fontWeight: 400, lineHeight: 1.43, letterSpacing: -0.01em }
  micro-label:    { fontSize: 9px, fontWeight: 700, lineHeight: 1.0, letterSpacing: 0.2em, textTransform: uppercase, fontFamily: mono }
  nav-link:       { fontSize: 12px, fontWeight: 400, lineHeight: 1.0, letterSpacing: -0.01em }
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 11px
  lg: 18px
  xl: 24px
  pill: 9999px
  card: 2.5rem    # ~40px for hero cards
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 17px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px
components:
  # Navigation
  sidebar-desktop: { width: 256px, collapsed: 80px, glass: "bg-card/70 backdrop-blur-xl", border: "border-r border-border" }
  sidebar-mobile: { overlay: "bg-background/80 backdrop-blur-sm", slide: "-translate-x-full to translate-x-0" }
  top-banner-mobile: { height: 44px, glass: "bg-background/60 backdrop-blur-xl", border: "border-b border-border/40" }
  bottom-dock-mobile: { height: 64px, glass: "bg-background/80 backdrop-blur-xl", shape: "rounded-t-[2.5rem]", border: "border-t border-border" }
  floating-navbar: { position: "top-6 right-6", glass: "bg-background/80 backdrop-blur", shape: "rounded-full", border: "border border-border" }
  # Buttons
  button-primary: { bg: "bg-foreground", text: "text-background", shape: "rounded-[2rem]", padding: "h-16 px-12", hover: "hover:scale-105" }
  button-secondary: { bg: "bg-card/40", border: "border border-border", text: "text-foreground", shape: "rounded-[2rem]", glass: "backdrop-blur-xl" }
  button-icon: { size: "p-2", shape: "rounded-full", hover: "hover:bg-muted", transition: "transition-colors" }
  # Cards
  card-glass: { bg: "bg-card/30", border: "border border-border/40", glass: "backdrop-blur-xl", shape: "rounded-2xl md:rounded-[2.5rem]", shadow: "shadow-2xl" }
  card-dashboard: { shape: "rounded-[3rem]", border: "border border-border/40", glass: "bg-card/80 backdrop-blur-3xl", minHeight: "min-h-[500px]" }
  card-bento: { bg: "bg-card", border: "border border-border", shape: "rounded-xl", hover: "hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg" }
  # Content
  prose-code: { font: "JetBrains Mono", scrollbar: "6px height", selection: "bg-primary/20" }
  prose-details: { glass: "border border-border/50 bg-background/50 backdrop-blur-md", shape: "rounded-3xl", shadow: "0 4px 20px -10px rgba(0,0,0,0.1)" }
  prose-blockquote: { border: "border-l-4 border-primary/80", bg: "bg-linear-to-r from-primary/5 to-transparent", italic: true }
  # Badges & Labels
  badge-micro: { text: "text-[9px] font-bold uppercase tracking-[0.2em]", font: "local-jetbrains-mono", glass: "bg-primary/5 border border-primary/10" }
  tech-tag: { text: "text-[8px] font-black uppercase tracking-widest", border: "border border-primary/10", bg: "bg-primary/5", shape: "rounded-md" }
  # Footer
  footer: { glass: "bg-card/30 backdrop-blur-md", border: "border-t border-border", padding: "pt-16 pb-24" }
```

---

## Overview

**Next Notion CMS** is a technical documentation and engineering portfolio platform that merges **dashboard utility** with **editorial polish**. The design language is defined by:

- **Glassy surfaces**: Cards and navigation use `backdrop-blur` with subtle transparency (`bg-card/30–80`) to create depth without visual weight.
- **Teal accent system**: A single primary accent (`hsl(181 100% 28%)`) drives all interactive states, focus rings, and emphasis — no secondary brand colors.
- **Dense-but-readable information architecture**: Micro-labels in uppercase mono (`tracking-[0.2em]`), tight card grids, and hierarchical typography enable high information density without clutter.
- **Responsive app shell**: Desktop uses a collapsible left sidebar + floating top-right utility navbar; mobile uses a top banner + bottom dock + slide-in sidebar overlay.
- **Prose-polished content**: Long-form articles feature enhanced code blocks (Shiki), collapsible details panels, styled blockquotes, and KaTeX math rendering.
- **Notion-native content flow**: Content cards for blogs, articles, projects, and wiki entries follow a consistent "unique card" pattern with glass backgrounds, deep rounding, and hover lift effects.

**Key Characteristics:**

- Photography and code snippets are first-class citizens; UI chrome recedes via glass effects and muted borders.
- Alternating surface treatments (light cards on off-white canvas, dark cards on near-black) create rhythm without decorative dividers.
- Single teal accent (`{colors.primary}`) carries every interactive signal — links, buttons, focus rings, active nav states.
- Two button grammars: large pill CTAs (`rounded-[2rem]`) for primary actions; compact icon buttons (`rounded-full`) for utilities.
- Typography hierarchy uses heavy display fonts (`Mozilla Headline`, `Amoria Regular`) for headlines, readable body (`Local Inter`) for prose, and mono (`JetBrains Mono`) for micro-labels and code.
- Motion is subtle but intentional: hover lifts (`-translate-y-0.5`), border tint transitions, and timed carousel animations in the hero.
- Section rhythm follows a predictable pulse: hero → content grid → bento widget → footer, with consistent `{spacing.section}` (80px) vertical padding.

---

## Colors

> Source: CSS variables in `styles/globals.css` and Tailwind config. All tokens are HSL-based for theme switching.

### Primary Accent

| Token | Light Value | Dark Value | Use |
|-------|-------------|------------|-----|
| `{colors.primary}` | `hsl(181 100% 28%)` | `hsl(181 100% 34%)` | Primary buttons, active nav, focus rings, interactive links |
| `{colors.primary-focus}` | `hsl(181 100% 34%)` | `hsl(181 100% 40%)` | Keyboard focus outline on interactive elements |
| `{colors.primary-on-dark}` | `hsl(181 100% 45%)` | `hsl(181 100% 50%)` | Links and accents on dark surfaces where primary would be too dark |

### Surface & Background

| Token | Light Value | Dark Value | Use |
|-------|-------------|------------|-----|
| `{colors.background}` | `hsl(216 100% 98%)` | `hsl(220 27% 4%)` | Page canvas, default background |
| `{colors.card}` | `hsl(0 0% 100%)` | `hsl(214 19% 7%)` | Card backgrounds, sidebar, modals |
| `{colors.muted}` | `hsl(216 20% 90%)` | `hsl(214 13% 11%)` | Subtle backgrounds, hover states, secondary surfaces |
| `{colors.sidebar}` | `hsl(218 48% 95%)` | `hsl(223 24% 6%)` | Sidebar background (light/dark variants) |

### Text & Foreground

| Token | Light Value | Dark Value | Use |
|-------|-------------|------------|-----|
| `{colors.foreground}` | `hsl(220 27% 4%)` | `hsl(216 33% 94%)` | Primary text, headlines, body copy |
| `{colors.muted-foreground}` | `hsl(220 5% 34%)` | `hsl(220 4% 57%)` | Secondary text, captions, disabled states |
| `{colors.destructive}` | `hsl(3 65% 55%)` | `hsl(357 100% 45%)` | Error states, destructive actions |

### Borders & Dividers

| Token | Light Value | Dark Value | Use |
|-------|-------------|------------|-----|
| `{colors.border}` | `hsl(222 13% 85%)` | `hsl(218 10% 16%)` | Card borders, input borders, dividers |
| `{colors.input}` | `hsl(222 13% 85%)` | `hsl(218 10% 16%)` | Form input backgrounds/borders |

### Brand Ramp (Selection & Accents)

| Token | Formula | Use |
|-------|---------|-----|
| `{colors.brand-200}` | `hsl(181 100% calc(var(--primary-l) + 50%))` | Text selection background |
| `{colors.brand-900}` | `hsl(181 100% calc(var(--primary-l) - 20%))` | Text selection foreground |

### Gradients (Page Identity)

| Token | Light Value | Dark Value | Use |
|-------|-------------|------------|-----|
| `{colors.page-gradient}` | `linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,1))` | `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,1))` | Overlay on page background images for readability |
| `{colors.item-gradient}` | `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.4))` | — | Decorative overlay on content cards |

---

## Typography

### Font Loading Strategy

Fonts are loaded locally via `@font-face` and attached to CSS variables:

```css
:root {
  --font-mozilla-headline: "Mozilla Headline", "Amoria Regular", system-ui, sans-serif;
  --font-local-inter: "Local Inter", "Mozilla Text", system-ui, sans-serif;
  --font-local-jetbrains-mono: "JetBrains Mono", "Space Mono", monospace;
  --font-google-sans: "Google Sans", "Roboto", system-ui, sans-serif;
}
```

### Font Utility Classes (Must Exist)

```css
.mozilla-headline { font-family: var(--font-mozilla-headline); }
.local-inter { font-family: var(--font-local-inter); }
.local-jetbrains-mono { font-family: var(--font-local-jetbrains-mono); }
.google-sans { font-family: var(--font-google-sans); }
.amoriaregular { font-family: "Amoria Regular", var(--font-mozilla-headline); }
```

### Type Hierarchy

| Token | Font Family | Size | Weight | Line Height | Letter Spacing | Use |
|-------|-------------|------|--------|-------------|----------------|-----|
| `{typography.hero-display}` | Mozilla Headline | 80px | 900 | 0.85 | -0.03em | Hero headlines (homepage) |
| `{typography.display-lg}` | Mozilla Headline | 48px | 900 | 1.0 | -0.02em | Section titles, card titles |
| `{typography.display-md}` | Mozilla Headline | 36px | 700 | 1.1 | -0.01em | Sub-section headers |
| `{typography.section-title}` | Amoria Regular | 32px | 700 | 1.2 | 0 | Content page titles |
| `{typography.lead}` | Local Inter | 24px | 400 | 1.4 | 0 | Intro paragraphs, taglines |
| `{typography.body-strong}` | Local Inter | 17px | 600 | 1.47 | -0.01em | Bold inline text, emphasis |
| `{typography.body}` | Local Inter | 17px | 400 | 1.47 | -0.01em | Default body copy |
| `{typography.caption}` | Local Inter | 14px | 400 | 1.43 | -0.01em | Secondary text, metadata |
| `{typography.micro-label}` | JetBrains Mono | 9px | 700 | 1.0 | 0.2em (uppercase) | Badges, tech tags, version labels |
| `{typography.nav-link}` | Google Sans | 12px | 400 | 1.0 | -0.01em | Navigation items, footer links |

### Typographic Principles

- **Heavy display fonts for headlines**: `Mozilla Headline` / `Amoria Regular` at weight 900 create a bold, technical tone.
- **17px body copy**: Slightly larger than standard 16px for improved readability in technical content.
- **Mono for micro-labels**: `JetBrains Mono` at 9px with `tracking-[0.2em]` and `uppercase` creates "instrument panel" cues.
- **Negative letter-spacing at display sizes**: `-0.01em` to `-0.03em` tightens headlines for a premium, condensed feel.
- **Line-height context**: Tight (0.85–1.1) for headlines; relaxed (1.4–1.47) for body; dense (2.41) for footer link columns.

---

## Layout

### Spacing System

- **Base unit**: 8px. Structural layout snaps to 8/12/16/20/24.
- **Tokens**: `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 17px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **Section vertical padding**: `{spacing.section}` (80px) for major content blocks.
- **Card padding**: `{spacing.lg}` (24px) inside utility cards; `{spacing.xl}` (32px) for hero/dashboard cards.

### Grid & Container

- **Max content width**: `max-w-6xl` (~72rem / 1152px) for text-heavy sections; `max-w-7xl` for wide grids.
- **Centering**: Most sections use `mx-auto` with horizontal padding `px-6 lg:px-8`.
- **Bento grid**: Responsive CSS grid with special spanning rules at `≥1024px` (see Component: Project Explorer).

### Whitespace Philosophy

- **Hero sections**: Minimum `min-h-screen` with centered content; generous padding above/below headlines.
- **Content cards**: Hover lift (`-translate-y-0.5`) creates perceived whitespace without increasing actual padding.
- **Footer**: Dense link columns with relaxed line-height (`2.41`) for scannability; extra bottom padding (`pb-24`) to avoid mobile dock overlap.

---

## Elevation & Depth

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, border only | Base cards, sidebar, content areas |
| Soft border | `border border-border/40` | Glass cards, input fields, dividers |
| Glass blur | `backdrop-blur-xl` + `bg-card/30–80` | Sidebar, floating navbar, hero dashboard card |
| Hover lift | `-translate-y-0.5` + `border-primary/50` + `shadow-lg shadow-primary/5` | Interactive cards, buttons, nav items |
| Deep shadow | `shadow-2xl` | Hero dashboard card, featured content cards |
| Ambient glow | `blur-[120px]` + `bg-primary/10` | Decorative blobs in hero/footer backgrounds |

**Elevation philosophy**: Depth is created through (a) glass transparency + blur, (b) subtle border tints, and (c) hover lift transitions — never heavy drop shadows on UI elements. The only "heavy" shadows are reserved for hero/dashboard cards to create focal points.

---

## Shapes

### Border Radius Scale

| Token | Value | Use |
|-------|-------|-----|
| `{rounded.none}` | 0px | Full-bleed sections, page backgrounds |
| `{rounded.xs}` | 4px | Inline chips, small badges |
| `{rounded.sm}` | 8px | Icon buttons, small inputs |
| `{rounded.md}` | 11px | Secondary buttons, tag chips |
| `{rounded.lg}` | 18px | Utility cards, bento grid items |
| `{rounded.xl}` | 24px | Large cards, modal containers |
| `{rounded.pill}` | 9999px | Primary CTAs, search inputs, nav pills |
| `{rounded.card}` | 2.5rem (~40px) | Hero dashboard card, featured content cards |

### Content Geometry

- **Hero imagery**: Full-bleed or contained within `rounded-[3rem]` cards; hover zoom (`scale-105`) on product/preview images.
- **Code blocks**: Rounded corners (`rounded-2xl`), thin custom scrollbar (`6px` height), subtle selection color.
- **Content cards**: `rounded-2xl md:rounded-[2.5rem]` with internal gridline overlay at `opacity-[0.02]` for subtle technical texture.

---

## Components

### Navigation System

#### Desktop Sidebar (`{component.sidebar-desktop}`)

```css
/* Container */
fixed inset-y-0 left-0 z-40 w-64 lg:w-20
bg-card/70 backdrop-blur-xl border-r border-border
transition-all duration-300 ease-in-out

/* Nav item base */
flex items-center rounded-lg px-3 py-2 text-sm font-medium gap-3
text-muted-foreground hover:bg-muted hover:text-foreground
transition-all local-jetbrains-mono

/* Active state */
bg-primary/10 text-primary

/* Collapsed behavior (lg) */
lg:w-20: label becomes lg:opacity-0 lg:w-0 lg:overflow-hidden
/* Tooltip shows label on hover when collapsed */
```

#### Mobile Bottom Dock (`{component.bottom-dock-mobile}`)

```css
/* Container */
fixed bottom-0 left-0 right-0 z-50
flex items-center justify-around px-2 py-1.5
bg-background/80 backdrop-blur-xl border-t border-border
shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.1)]
rounded-t-[2.5rem] lg:hidden

/* Icon button */
p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors
```

#### Floating Utility Navbar (`{component.floating-navbar}`)

```css
/* Container */
fixed top-6 right-6 z-60
p-1 rounded-full bg-background/80 backdrop-blur
border border-border shadow-lg

/* Internal layout */
flex items-center gap-1 google-sans
/* Separator */
border-l border-border pl-1 ml-1

/* Icon button */
p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors
```

### Buttons

#### Primary CTA (`{component.button-primary}`)

```css
inline-flex h-16 items-center justify-center
rounded-[2rem] bg-foreground text-background
px-12 text-sm font-black
hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]
transition-transform duration-200
```

#### Secondary CTA (`{component.button-secondary}`)

```css
inline-flex h-16 items-center justify-center
rounded-[2rem] border border-border bg-card/40
px-12 text-sm font-bold backdrop-blur-xl
hover:bg-muted hover:border-primary/20
transition-colors duration-200
```

#### Icon Button (`{component.button-icon}`)

```css
p-2 rounded-full
hover:bg-muted text-muted-foreground hover:text-foreground
transition-colors duration-200
/* Tooltip appears on bottom (desktop only) */
```

### Cards

#### Glass Content Card (`{component.card-glass}`)

```css
/* Base */
bg-card/30 backdrop-blur-xl border border-border/40
rounded-2xl md:rounded-[2.5rem] overflow-hidden
shadow-2xl transition-all duration-700

/* Hover */
hover:border-primary/40 hover:bg-card/50 hover:-translate-y-2

/* Internal gridline overlay (decorative) */
::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.02;
  background: linear-gradient(to right, #80808012 1px, transparent 1px),
              linear-gradient(to bottom, #80808012 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}
```

#### Hero Dashboard Card (`{component.card-dashboard}`)

```css
/* Outer glow frame */
absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30
rounded-[3rem] blur-2xl opacity-50
group-hover:opacity-100 transition-opacity duration-1000

/* Main card */
rounded-[3rem] border border-border/40 dark:border-white/10
bg-card/80 backdrop-blur-3xl shadow-2xl
min-h-[500px] flex flex-col overflow-hidden

/* Carousel indicators */
/* Active: w-8 bg-primary; Inactive: w-1.5 bg-border/40 */
/* Transition: duration-500 */
```

#### Bento Grid Card (`{component.card-bento}`)

```css
/* Base */
p-5 rounded-xl border border-border bg-card
transition-all duration-300 ease-in-out

/* Hover */
hover:-translate-y-0.5 hover:border-primary/50
hover:shadow-lg hover:shadow-primary/5

/* Icon chip */
inline-flex rounded-lg bg-primary/10 p-3
shadow-inner shadow-primary/20
```

### Content Elements

#### Micro Badge (`{component.badge-micro}`)

```css
text-[9px] font-bold uppercase tracking-[0.2em]
local-jetbrains-mono
bg-primary/5 border border-primary/10 rounded-full
px-3 py-1 text-muted-foreground
```

#### Tech Tag (`{component.tech-tag}`)

```css
text-[8px] font-black uppercase tracking-widest
border border-primary/10 px-2.5 py-1 rounded-md
bg-primary/5 text-primary/60
```

#### Prose Code Block (`{component.prose-code}`)

```css
/* Font */
code, pre, kbd, samp { font-family: var(--font-local-jetbrains-mono); }

/* Shiki container */
relative rounded-2xl border border-border/40 overflow-hidden
/* Line numbers */
.line::before { content: attr(data-line); color: #666; padding-right: 1em; }
/* Custom scrollbar */
::-webkit-scrollbar { height: 6px; }
::-webkit-scrollbar-thumb { background: hsl(var(--muted)); }
```

#### Collapsible Details (`{component.prose-details}`)

```css
/* Container */
border border-border/50 bg-background/50 backdrop-blur-md
rounded-3xl my-6 transition-all duration-300
shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]

/* Hover */
hover:border-primary/20 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)]

/* Open state */
[open] { bg-card/80 border-primary/20 pb-4; }

/* Summary row */
summary { font-weight: 600; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
/* Custom chevron */
summary::before {
  content: "▸";
  display: inline-block;
  transition: transform 0.2s;
}
[open] summary::before { transform: rotate(90deg); }
```

### Footer (`{component.footer}`)

```css
/* Container */
relative border-t border-border bg-card/30 backdrop-blur-md overflow-hidden

/* Animated blobs (decorative) */
.absolute rounded-full blur-[100px] animate-blob
/* Keyframes: translate + scale loop with 25–35s duration */

/* Grid */
mx-auto max-w-7xl px-6 pt-16 pb-24
grid md:grid-cols-4 lg:grid-cols-5 gap-8

/* Brand block */
/* Icon chip: h-10 w-10 rounded-xl bg-primary/10 group-hover:bg-primary */
/* Name: text-2xl font-bold mozilla-headline tracking-tight */
/* Descriptor: text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold google-sans */

/* Social buttons */
h-9 w-9 rounded-lg border border-border bg-background/50
text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary
transition-colors

/* Column headings */
text-sm font-bold mb-6 mozilla-headline uppercase tracking-widest
flex items-center gap-2
/* Left icon: h-4 w-4 text-primary */

/* Links */
text-sm text-muted-foreground hover:text-primary transition-colors google-sans
/* External arrow: ArrowUpRight opacity-0 -translate-y-1 → opacity-100 translate-y-0 on hover */

/* Bottom bar */
mt-16 pt-8 border-t border-border
text-xs text-muted-foreground google-sans
/* Tech stack line: text-[10px] text-muted-foreground/60 font-mono tracking-tight uppercase */
```

---

## Do's and Don'ts

### Do

- Use `{colors.primary}` (teal `hsl(181 100% 28%)`) for every interactive element — links, buttons, focus rings, active states.
- Set headlines in `{typography.hero-display}` or `{typography.display-lg}` with negative letter-spacing (`-0.01em` to `-0.03em`) for the signature condensed feel.
- Run body copy at `{typography.body}` (17px / 400 / 1.47) — not 16px — for improved technical content readability.
- Apply glass effects (`backdrop-blur-xl` + `bg-card/30–80`) to create depth without visual weight.
- Use `{rounded.pill}` for primary CTAs and search inputs; `{rounded.card}` (2.5rem) for hero/dashboard cards.
- Reserve `{component.badge-micro}` (9px mono uppercase) for version labels, tech tags, and metadata.
- Apply hover lift (`-translate-y-0.5` + `border-primary/50` + `shadow-lg`) to interactive cards and buttons.
- Use `transform: scale(1.05)` as the active/press state on primary buttons.

### Don't

- Don't introduce a second accent color; every "click me" signal is `{colors.primary}`.
- Don't add heavy drop shadows to cards or buttons — use border tints and glass blur for depth.
- Don't use decorative gradients; atmosphere comes from photography, code syntax highlighting, or subtle blob animations.
- Don't set body copy below 17px or above 1.47 line-height — the editorial leading is part of the brand.
- Don't round full-bleed sections — tiles are rectangular; use color/gradient changes as dividers.
- Don't mix radius grammars — use `{rounded.sm}` for utilities, `{rounded.lg}` for cards, `{rounded.pill}` for pills.
- Don't use `{colors.primary-on-dark}` on light surfaces — it's the dark-tile-only variant.

---

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Small phone | ≤ 419px | Single-column grids; hero typography drops to 32px; bottom dock visible |
| Phone | 420–640px | Single-column stack; sidebar slides in as overlay; top banner visible |
| Tablet portrait | 641–833px | 2-column grids; sidebar overlay with dimming; floating navbar hidden |
| Tablet landscape | 834–1023px | Desktop sidebar visible (collapsed to 80px); floating navbar appears |
| Small desktop | 1024–1279px | Full sidebar (256px); bento grid 3-column; hero dashboard visible |
| Desktop | 1280–1439px | Full layout; 4–5 column grids; max-width containers |
| Wide desktop | ≥ 1440px | Content locks at `max-w-7xl`; margins absorb extra width |

### Touch Targets

- Minimum 44 × 44px for interactive elements.
- `{component.button-primary}`: ~64px height × variable width (pill shape increases hit area).
- `{component.button-icon}`: 40 × 40px (p-2 + icon).
- Mobile dock icons: 44 × 44px touch target despite smaller visual size.

### Collapsing Strategy

- **Sidebar**: Full width (256px) on desktop ≥1024px; collapses to 80px at 834–1023px; slides in as overlay at ≤833px.
- **Floating navbar**: Visible on desktop ≥834px; hidden on mobile (functions move to bottom dock).
- **Bottom dock**: Visible only on mobile ≤833px; adds `pb-24` to footer to avoid overlap.
- **Hero typography**: 80px → 48px → 32px across breakpoints.
- **Bento grid**: 1-col (mobile) → 2-col (tablet) → 4-col + spanning rules (desktop).

---

## Iteration Guide

1. **Reference tokens, not values**: Always use `{colors.primary}`, `{typography.body}`, `{rounded.pill}` — never inline hex or pixel values.
2. **One component at a time**: When updating, focus on a single component's YAML key (`{component.card-glass}`, `{component.sidebar-desktop}`).
3. **Variants are separate entries**: Hover, active, focus, and dark-mode variants live as separate tokens in the `components:` section.
4. **Document default + active states only**: Hover states are implied via transition classes; don't document hover as a separate variant.
5. **Typography boundaries are unbreakable**: Display headlines stay `Mozilla Headline` 900 with negative tracking; body stays `Local Inter` 400 at 17px.
6. **Glass is for depth, not decoration**: Use `backdrop-blur` + transparency to create hierarchy — never as a decorative effect alone.
7. **When in doubt, lift, don't shadow**: Prefer `hover:-translate-y-0.5` + border tint over drop shadows for interactive feedback.

---

## Known Gaps

- **Form validation states**: Only neutral input styles are documented; error/success states need specification.
- **Modal/dialog system**: No modal component tokens defined; should follow `{component.card-glass}` patterns.
- **Toast/notification system**: Not surfaced in current UI; needs design tokens for positioning, duration, and variants.
- **Dark mode for all components**: Some utility cards and footer elements are documented in light mode only; dark variants should be explicitly defined.
- **Loading states**: Skeleton loaders and progress indicators are not documented as reusable components.
- **Print styles**: No print-specific token definitions for documentation pages.
- **Reduced motion**: `@media (prefers-reduced-motion)` overrides are not formalized as tokens.

---

## Appendix: Quick Reference Snippets

### Glass Card Base
```css
bg-card/30 backdrop-blur-xl border border-border/40
rounded-2xl md:rounded-[2.5rem] overflow-hidden
shadow-2xl transition-all duration-700
hover:border-primary/40 hover:bg-card/50 hover:-translate-y-2
```

### Icon Button
```css
p-2 rounded-full
hover:bg-muted text-muted-foreground hover:text-foreground
transition-colors duration-200
```

### Micro Badge (Mono Uppercase)
```css
text-[9px] font-bold uppercase tracking-[0.2em]
local-jetbrains-mono
bg-primary/5 border border-primary/10 rounded-full
px-3 py-1 text-muted-foreground
```

### Hover Lift + Primary Glow
```css
transition-all duration-300 ease-in-out
hover:-translate-y-0.5 hover:border-primary/50
hover:shadow-lg hover:shadow-primary/5
```

### View Transition (Page Navigation)
```css
::view-transition-old(root) {
  animation: fade-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards,
             scale-down 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
::view-transition-new(root) {
  animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards,
             scale-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes scale-down { to { transform: scale(0.92); } }
@keyframes scale-up { from { transform: scale(1.08); } }
```

---

> **Note on Personalization**: All brand-specific strings (names, taglines, copyright text) should be treated as placeholders (`{{BRAND_NAME}}`, `{{TAGLINE}}`) during implementation while preserving typography, spacing, and hierarchy. Replace with actual values only in final deployment.

*Last updated: May 2026 • Version 1.0.0 • For Next Notion CMS v16.x*
