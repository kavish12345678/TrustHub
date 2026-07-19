# 08 — TrustHub Design System

> Source of truth for visual language, tokens, and reusable UI primitives.  
> Implementation lives under `frontend/src/styles/` and `frontend/src/components/`.  
> **No Tailwind** — CSS custom properties + component classes only (per `TRUSTHUB_SPEC.md`).

---

## 1. Design Principles

1. **Brand first** — TrustHub is the hero-level signal on marketing surfaces.
2. **Dark blockchain SaaS** — Deep navy surfaces, luminous blue/purple accents, emerald for trust/success.
3. **Glass where it clarifies** — Frosted panels for nav, cards, modals, and toasts—not decoration overload.
4. **One job per section** — Clear hierarchy; restrained motion that supports focus.
5. **Accessible by default** — Visible focus rings, readable contrast, reduced-motion respect.
6. **Reusable only** — Pages compose primitives; avoid one-off styled markup when a component exists.

---

## 2. Color Palette

| Token | Value | Role |
|-------|-------|------|
| `--th-primary` | `#3B82F6` | Primary actions, links, focus |
| `--th-secondary` | `#8B5CF6` | Secondary emphasis, brand gradient mid |
| `--th-accent` | `#10B981` | Success, trust markers, eyebrows |
| `--th-bg` | `#070B14` | App background |
| `--th-bg-elevated` | `#0C1220` | Inputs / elevated surfaces |
| `--th-bg-surface` | `#111827` | Focused inputs / panels |
| `--th-text` | `#F1F5F9` | Primary text |
| `--th-text-secondary` | `#94A3B8` | Supporting copy |
| `--th-text-muted` | `#64748B` | Hints, meta |
| `--th-danger` | `#EF4444` | Errors |
| `--th-warning` | `#F59E0B` | Warnings |

### Gradients

- **Brand:** blue → purple → emerald (`--th-gradient-brand`)
- **Hero atmosphere:** layered radial washes (`--th-gradient-hero`)
- **Card sheen:** subtle blue/purple wash (`--th-gradient-card`)

### Contrast notes

- Body text `#F1F5F9` on `#070B14` exceeds WCAG AAA for normal text.
- Secondary text `#94A3B8` on dark bg targets AA for supporting copy.
- Emerald eyebrows and mono labels remain ≥ AA against dark glass panels.
- Never place muted text on low-contrast glass without sufficient opacity/border.

---

## 3. Typography

| Role | Family | Token |
|------|--------|-------|
| Display / headings | **Syne** | `--th-font-display` |
| Body / UI | **Manrope** | `--th-font-body` |
| Hashes / technical | **IBM Plex Mono** | `--th-font-mono` |

### Scale

`xs` → `sm` → `base` → `lg` → `xl` → `2xl` → `3xl` → `4xl` → `5xl` → `hero` (fluid clamp).

Headings use tight leading (`1.15`) and slight negative tracking. Body uses `1.6` line-height.

---

## 4. Spacing, Radius, Elevation

**Spacing:** 4px base scale via `--th-space-*` (`1`–`24`).

**Radius:** `sm` 8px · `md` 12px · `lg` 16px · `xl` 20px · `2xl` 24px · `full`.

**Shadows:** soft dark elevation + optional blue/emerald glow for primary CTAs and trust markers.

**Container:** max `72rem` (`--th-container`); narrow `42rem` for focused copy.

---

## 5. Motion

| Token / class | Use |
|---------------|-----|
| `th-fade-up` | Hero and section entrances |
| `th-fade-in` | Overlays, decorative layers |
| `th-scale-in` | Modal appear |
| `th-float` | Ambient hero orbs |
| `th-spin` | Spinner |
| `th-toast-in` | Toast enter |

Durations: fast `150ms`, default `250ms`, slow `450ms`. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

`prefers-reduced-motion: reduce` collapses animations globally.

---

## 6. Component Library

### Navbar — `components/navbar/Navbar.jsx`

Sticky glass header. Brand + primary links + auth CTAs. Mobile drawer toggle below `768px`.

### Footer — `components/footer/Footer.jsx`

Multi-column links, brand tagline, copyright / tech meta row.

### Button — `components/ui/Button.jsx`

| Prop | Values |
|------|--------|
| `variant` | `primary` · `secondary` · `accent` · `ghost` · `outline` |
| `size` | `sm` · `md` · `lg` |
| `to` / `href` | Renders `Link` or `<a>` |
| `block` | Full width |

### Card — `components/ui/Card.jsx`

Glass panel with optional `hoverable` lift. Padding: `compact` · `default` · `spacious`.

### Input — `components/ui/Input.jsx`

Labeled field with hint/error. Supports `as="textarea"`. Error state wired to `aria-invalid`.

### Modal — `components/ui/Modal.jsx`

Portal overlay, Escape + optional overlay click to close, focus-safe body scroll lock. Sizes: `md` · `lg`.

### Toast — `components/ui/Toast.jsx`

`ToastProvider` + `useToast()` helpers: `success`, `error`, `info`, `warning`, `push`, `dismiss`.

### Spinner — `components/ui/Spinner.jsx`

Sizes `sm` · `md` · `lg`. Optional `accent` (emerald) and `label`.

### Empty State — `components/common/EmptyState.jsx`

Icon, title, description, optional primary action (`actionTo` / `onAction`).

### Section Container — `components/common/SectionContainer.jsx`

Consistent vertical rhythm, optional eyebrow/title/subtitle, `align`, `spacing`, `narrow`.

### Public Layout — `layouts/PublicLayout.jsx`

Composes Navbar + `<main>` + Footer for marketing/auth shells.

---

## 7. File Map

```
frontend/src/
├── index.css                 # Fonts + token/base/animation/component imports
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── animations.css
│   ├── components.css
│   └── landing.css
├── components/
│   ├── navbar/Navbar.jsx
│   ├── footer/Footer.jsx
│   ├── common/
│   │   ├── EmptyState.jsx
│   │   └── SectionContainer.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Spinner.jsx
│       ├── Toast.jsx
│       └── index.js
└── layouts/PublicLayout.jsx
```

---

## 8. Usage Guidelines

### Do

- Import primitives from `components/ui` or explicit paths.
- Use `SectionContainer` for page sections.
- Prefer tokens over hard-coded colors.
- Keep landing hero free of cards/stat strips; put cards in content sections only.

### Don’t

- Introduce Tailwind or alternate CSS frameworks without approval.
- Place private keys or sensitive hashes as decorative fake “security theater” that looks real—demo hashes should read as illustrative.
- Nest multiple glass layers that kill contrast.
- Ship pages that bypass the design system for one-off styling.

### Example

```jsx
import { Button, Card } from "../components/ui";
import SectionContainer from "../components/common/SectionContainer";

<SectionContainer eyebrow="Product" title="Features" align="center">
  <Card hoverable>
    <h3>Upload & hash</h3>
    <Button variant="primary" to="/upload">Upload</Button>
  </Card>
</SectionContainer>
```

---

## 9. Landing Page Composition

Route `/` uses the design system exclusively:

1. **Hero** — Brand, one headline, one support line, CTA group, full-bleed atmosphere + decorative chain visual  
2. **Features** — Card grid  
3. **How It Works** — Three step cards  
4. **Why Blockchain** — Split narrative + bullet list  
5. **Security** — Four assurance cards  
6. **CTA** — Conversion band  
7. **Footer** — Via `PublicLayout`

---

## 10. Status

| Item | Status |
|------|--------|
| Tokens & global CSS | Implemented |
| Core UI primitives | Implemented |
| Design guide (this doc) | Implemented |
| Landing page | Implemented |
| Auth / dashboard theming | Pending (reuse same tokens) |
| Backend-driven UI | Not in scope yet |

---

*TrustHub Design System — modern dark SaaS for verifiable documents.*
