# PROJECT_NOTES.md — thehotelrightnow

---

## Current State

The project is a static website built with Eleventy 3.x (ESM), Nunjucks templates, vanilla CSS, and vanilla JS. It targets Cloudflare Pages for deployment.

**What exists:**
- Full project scaffold and directory structure
- Eleventy config with passthrough for assets (`.gitkeep` excluded from output)
- Self-hosted WOFF2 fonts: Cormorant Garamond (400, 500) and Jost (400, 500), latin subset only
- Five-file CSS architecture: tokens → base → layout → components → pages
- Base layout with skip link, canonical tag, conditional meta description, font preloads, favicon placeholder
- Header component: fixed, transparent-to-espresso on scroll (IntersectionObserver), mobile hamburger overlay with focus trap, aria-expanded, Escape key, body scroll lock via CSS class, link-click close, viewport-resize close
- Footer component: address, conditional contact details (suppressed until real values supplied), footer nav, conditional social icons
- Floating WhatsApp button: suppressed until real number supplied
- Phase 2 Homepage Experience Blueprint: cinematic hero with architectural media slot and primary booking/enquiry action, quick experience navigation strip, editorial introduction with architectural pillars, 4-part alternating experience storytelling framework (Rooms, Dining, Experiences, Events), visual narrative gallery preview, and reservation/enquiry CTA section
- All data files populated; all unknown real-world values use the string "CONTENT REQUIRED" (never exposed to visitors)
- `booking.json` data file created

**What does not exist yet:**
- Actual client photographic assets in `src/assets/img/` (hero, rooms, dining, events, gallery, hotel, brand)
- /rooms/, /dining/, /events/, /gallery/, /contact/ interior pages
- Real hotel content (photos, copy, prices, hours, etc.)
- Enquiry form submission endpoint
- Sitemap, robots.txt, 404 page
- JSON-LD schema

---

## Site Map

The following pages are planned. **None except the homepage scaffold have been created yet.**

- **Home** (`/`) — Hero, welcome, quick links, rooms teaser, dining teaser, events teaser, gallery teaser, location, booking CTA
- **Rooms** (`/rooms/`) — Editorial list of room types from `rooms.json`
- **Dining** (`/dining/`) — Dining venues from `dining.json`
- **Experiences** — To be confirmed by client; not yet in data model
- **Events** (`/events/`) — Weddings, corporate, private events from `events.json`
- **Gallery** (`/gallery/`) — Masonry grid with lightbox from `gallery.json`
- **Contact** (`/contact/`) — Address, contact details, enquiry form

---

## Content Required Checklist

The hotel must supply real values for every field marked **CONTENT REQUIRED** before pages can go live. Fields that already have real data are marked ✅.

### site.json

- [ ] `tagline` — CONTENT REQUIRED
- [ ] `description` — CONTENT REQUIRED (used as the site meta description)
- [ ] `phone` — CONTENT REQUIRED
- [ ] `whatsapp` — CONTENT REQUIRED (digits only, with country code, no spaces or dashes)
- [ ] `email` — CONTENT REQUIRED
- [ ] `bookingUrl` — CONTENT REQUIRED (external booking engine URL, or confirm none)
- [ ] `mapsUrl` — CONTENT REQUIRED (Google Maps or similar link to the property)
- [ ] `socials` — CONTENT REQUIRED (add keys: `instagram`, `facebook`, `twitter`, etc. with URLs; leave empty object `{}` if none)
- ✅ `name` — `"thehotelrightnow"`
- ✅ `displayName` — `"thehotelrightnow"`
- ✅ `address` — `"Eastern Bypass, Ruiru-Kamakis, Kenya"`
- ✅ `url` — `"https://thehotelrightnow.pages.dev"` *(confirm this is the final domain)*

### rooms.json

Currently an empty array `[]`. For each room type, supply an object with:

- [ ] `name` — Room type name
- [ ] `description` — Editorial description
- [ ] `features` — Array of feature strings (e.g. `["King bed", "Balcony"]`)
- [ ] `size` — Floor area (e.g. `"42 sqm"`) — omit if unknown
- [ ] `price` — Starting rate (e.g. `"KES 12,000 per night"`) — omit if not to be published
- [ ] `image` — Filename of the image in `src/assets/img/rooms/`

### dining.json

Currently an empty array `[]`. For each dining venue, supply an object with:

- [ ] `name` — Venue name
- [ ] `cuisine` — Cuisine type or style
- [ ] `description` — Editorial description
- [ ] `hours` — Opening hours (e.g. `"7:00 AM – 10:30 PM"`) — omit if unknown
- [ ] `image` — Filename of the image in `src/assets/img/dining/`

### facilities.json

Currently an empty array `[]`. For each facility, supply an object with:

- [ ] `name` — Facility name
- [ ] `description` — Brief description

### events.json

Currently `{ "weddings": [], "corporate": [], "private": [] }`. For each event type, supply objects with:

- [ ] `name` — Event space or package name
- [ ] `description` — Editorial description
- [ ] `capacity` — Maximum guest count — omit if unknown
- [ ] `image` — Filename of the image in `src/assets/img/events/`

### policies.json

Currently an empty object `{}`. Supply fields such as:

- [ ] `checkIn` — Check-in time (e.g. `"14:00"`)
- [ ] `checkOut` — Check-out time (e.g. `"11:00"`)
- [ ] `cancellation` — Cancellation policy text
- [ ] `pets` — Pet policy
- [ ] `children` — Children policy

### booking.json

- [ ] `bookingMethod` — CONTENT REQUIRED (e.g. `"whatsapp"`, `"email"`, `"online"`, `"phone"`)
- [ ] `bookingUrl` — CONTENT REQUIRED (external booking engine URL, or `null` if not applicable)
- [ ] `bookingPhone` — CONTENT REQUIRED
- [ ] `bookingEmail` — CONTENT REQUIRED
- [ ] `whatsapp` — CONTENT REQUIRED (digits only, with country code)
- [ ] `enquiryForm` — CONTENT REQUIRED (`true` or `false` — whether to use the on-site form)
- [ ] `externalBookingEngine` — CONTENT REQUIRED (name of engine if any, e.g. `"Beds24"`, or `null`)
