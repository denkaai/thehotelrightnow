# Design System: thehotelrightnow

This document serves as the single source of truth for the design system. It reflects the **actual current code** implemented in the project.

## Brand
- **Name:** thehotelrightnow
- **Tagline:** CONTENT REQUIRED (TBD)
- **Positioning Statement:** Premium Indian hospitality venue, Eastern Bypass Ruiru-Kamakis
- **Logo:**
  - **Location:** `src/assets/img/brand/`
  - **Canonical Version:** `logo-transparent-2400.webp` (transparent background)
  - **Alternative:** `logo-1-2400.webp` (white background)
  - **Usage Sizes:** Desktop header uses `height: 58px`, mobile header uses `height: 48px`.

## Color Palette
The CSS custom properties are defined in `tokens.css`:

- `--charcoal`: `#17140F` (Background base for body, dark sections)
- `--ivory`: `#F5F0E6` (Base text color for dark backgrounds, light section backgrounds)
- `--amber`: `#C9963A` (Primary accent, primary CTAs, active states, borders)
- `--amber-light`: `#E0AD52` (Hover state for primary buttons)
- `--teal-glow`: `#3FA79A` (Secondary accent)
- `--violet-glow`: `#6B5CA5` (Secondary accent)
- `--stone`: `#D9D0C3` (Secondary text, architectural frames, subdued elements)
- `--espresso`: `#2B211C` (Darker structural sections, footer background)
- `--espresso-light`: `#3a2d26` (Subtle overlays or slightly lighter dark sections)

**Gradients:**
Explicitly NO gradients are permitted except the following exact approved gradients:
- **Hero Canvas (`.hero-media-canvas`):** `radial-gradient(ellipse at 30% 20%, rgba(201,150,58,0.1) 0%, transparent 60%), linear-gradient(160deg, #2b211c 0%, #1c1917 100%)`
- **Hero Overlay (`.hero-overlay`):** `linear-gradient(to top, rgba(23,20,15,0.55) 0%, rgba(23,20,15,0) 55%), linear-gradient(to bottom, rgba(23,20,15,0.25) 0%, rgba(23,20,15,0) 30%)`
- **Story Full-Bleed Overlay (`.story-fw-overlay`):** `linear-gradient(to top, rgba(23, 20, 15, 0.88) 0%, rgba(23, 20, 15, 0.4) 40%, rgba(23, 20, 15, 0) 100%)`
- **Reservation CTA Section (`.reservation-cta-section`):** `radial-gradient(ellipse at 50% 0%, rgba(201,150,58,0.07) 0%, transparent 65%)`
- **Site Header (`.site-header`):** `linear-gradient(to bottom, rgba(23,20,15,0.72) 0%, rgba(23,20,15,0) 100%)`

## Typography
Fonts are configured in `base.css` and `tokens.css`:

- **Serif (`--font-serif`):** `Cormorant Garamond`, `Georgia`, `'Times New Roman'`, `serif`
  - Used for: Headings (`h1`-`h6`), large display titles, section titles.
  - Weights: `400`, `500`
- **Sans-Serif (`--font-sans`):** `'Jost'`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `Helvetica`, `Arial`, `sans-serif`
  - Used for: Body copy, button labels, eyebrows, form inputs, metadata.
  - Weights: `400`, `500`

**Fluid Typography (clamp() scales):**
- `.hero-title`: `clamp(2.75rem, 7vw, 5.5rem)`
- `.hero-tagline`: `clamp(1rem, 1.8vw, 1.2rem)`
- `.story-fw-title`: `clamp(2.25rem, 4.5vw, 3.25rem)`
- `.gallery-preview-title`: `clamp(2rem, 3.5vw, 3rem)`
- `.reservation-cta-title`: `clamp(2.25rem, 4vw, 3.25rem)`
- `.section-title`: `clamp(2rem, 3.5vw, 2.875rem)`

## Spacing & Layout
**Spacing Tokens:**
- `--space-1`: `0.25rem`
- `--space-2`: `0.5rem`
- `--space-3`: `1rem`
- `--space-4`: `1.5rem`
- `--space-5`: `2rem`
- `--space-6`: `3rem`
- `--space-8`: `4rem`
- `--space-12`: `6rem`
- `--space-16`: `8rem`

**Layout Dimensions:**
- Container max-width: `--container-max: 1280px`
- Header height padding: `--header-h: 72px`

**Full-Bleed Technique:**
When a section (like `.story-fw-section`) needs to break out of its container and span the full viewport width, use the `calc(50% - 50vw)` pattern:
```css
width: 100vw;
max-width: 100vw;
margin-left: calc(50% - 50vw);
margin-right: calc(50% - 50vw);
```

## Motion Principles
**Hero Animation (Cinematic Ken Burns):**
- **Scale:** `1.06 → 1.15` (8% zoom travel).
- **Drift:** 1.5–2% lateral or vertical translation.
- **Duration:** 16s per slide.
- **Easing:** `cubic-bezier(0.1, 0, 0.25, 1)`
- **WHY:** This curve is near-linear with a short ease-in, mimicking a camera operator on a gimbal. It provides a deliberate constant pace without easing at the end, preventing the distracting "rubber-band" deceleration/bouncing effect.

**Entrance Animation Pattern:**
- Handled by `IntersectionObserver` in `animations.js` (threshold: 12%).
- `.reveal`: Starts at `opacity: 0`, `translateY(24px)`. Transitions to `opacity: 1`, `translateY(0)`.
- `.reveal-scale`: Starts at `opacity: 0`, `scale(0.97)`. Transitions to `opacity: 1`, `scale(1)`.
- **Duration:** `--transition-reveal: 0.7s cubic-bezier(0.22, 1, 0.36, 1)`.

**Mandatory Reduced Motion:**
Every animated element must respect `@media (prefers-reduced-motion: reduce)`.
- `base.css` completely strips transitions/animations from `.reveal` and `.reveal-scale`.
- `pages.css` overrides the Ken Burns effect: `.hero-slide img { transform: scale(1) !important; animation: none !important; }`.
- JS respects `window.matchMedia` and bypasses delays.

## Photography Rules
- **ONLY REAL PHOTOS ALLOWED.**
- Organized by folder: `hero/`, `hotel/`, `dining/`, `events/`, `gallery/`, `rooms/`.
- **Naming Convention:** Lowercase, hyphens, includes resolution when applicable (e.g., `hero-1-2400.webp`).
- **EXPLICIT RULE: NO AI-GENERATED IMAGERY ANYWHERE ON THIS SITE, EVER, UNDER ANY CIRCUMSTANCE.** This is a critical requirement that cannot be bypassed.
- **Color Grading:** Preserve natural exposure and shadows. Do not apply artificial blurring, Instagram-style filters, or heavily processed HDR effects. The aesthetic is "quiet luxury."

## Content Rules
- **NEVER INVENT INFORMATION.** Do not make up room names, prices, amenities, operating hours, or facts that are not explicitly confirmed by the client.
- For unconfirmed data, strictly use the **"Coming soon"** or **`CONTENT REQUIRED`** pattern.

## Component Patterns
**Buttons:**
- `.btn`: Base styles (padding: 0.8125rem 1.75rem, font-sans, 0.875rem font size, uppercase letter-spacing).
- `.btn-primary`: Background `--amber`, color `--charcoal`.
  - Hover/Focus: Background `--amber-light`, `translateY(-2px)`, box-shadow `var(--shadow-amber)`.
- `.btn-outline`: Transparent background, border and text `--espresso`.
  - Hover/Focus: Background `--espresso`, text `--ivory`.
- `.btn-outline-light`: Transparent background, light border and text `--ivory`.

**Focus States:**
Global visible keyboard focus ring applied via `:focus-visible`:
```css
outline: 2px solid var(--amber);
outline-offset: 3px;
border-radius: 2px;
```

**Form Inputs:**
- Padding: `0.875rem 1rem`
- Border: `1px solid rgba(43, 33, 28, 0.2)`
- Background: `--ivory`
- Focus: `border-color: var(--amber)`, `box-shadow: 0 0 0 3px rgba(201, 150, 58, 0.15)`
