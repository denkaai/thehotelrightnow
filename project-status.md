# Project Status: thehotelrightnow

This document provides the current build status for future sessions to read before making changes. It is based on an actual audit of the codebase.

## Stack & Repo
- Eleventy 3.x (ESM), Nunjucks, vanilla CSS/JS, Cloudflare Pages
- Repo: github.com/denkaai/thehotelrightnow, branch main
- Local: C:\Users\User\thehotelrightnow (Windows/PowerShell)
- `design.md` exists at project root — read it before any visual/CSS work

## Pages — current status
- **Home (/)** — hero slider, Welcome, 3 full-bleed "Spaces" sections, Shiva artwork feature, booking CTA, footer. Built and refined.
- **Rooms (/rooms/)** — alternating layout, Room 1/2/3 using real photos from rooms/, "coming soon" messaging (no invented names/prices). Room 2 overflow bug fixed (CSS Grid min-width issue).
- **Dining (/dining/), Events (/events/)** — built, pulling from own data/image folders, not yet as deeply refined as Rooms/Contact.
- **Gallery (/gallery/)** — built, needs re-check against current photo set.
- **Contact (/contact/)** — rebuilt with warm gradient sidebar, refined form styling, amber focus states. Most recently completed page.

## Assets
- Real venue photos in `src/assets/img/{hero,hotel,dining,events,gallery,rooms}/` — all WebP, optimized
- Logo: `logo-transparent-2400.webp` / `-1200.webp` (canonical, transparent)
- Favicon generated from full logo (may look like a smudge at 16px — revisit if a cropped icon-only mark becomes available)
- **CRITICAL:** no AI-generated images anywhere — this has been accidentally reintroduced twice before and must never happen again (see `design.md`)

## Known outstanding items
- **Video hero background:** paused. Explored Runway (quota hit), Raylight (template tool, not pure text-to-video), Kling (viable, not yet generated). No finished clip yet — treat as optional future work.
- **Drone aerial photography:** requested from client, real photos pending delivery (3 shots briefed: intimate detail, full aerial reveal, dusk/night aerial) — once delivered, optimize and add to `hero.json` rotation.
- **Social icons + richer mobile menu:** VERIFIED LANDED. The mobile menu contains `mobile-quick-actions` and `mobile-socials`, with `.nav-list a` having a `min-height: 48px` tap target. The menu toggle is `44px` by `44px`.
- **Color grading pass on all photos:** prepared in `grading-preview/` folder, never approved/applied — revisit or discard.
- **site.json data:** VERIFIED PENDING. Current values are placeholders (e.g., `+254 700 000000`, `254700000000`, `hello@thehotelrightnow.com`). Socials are mostly set to `"TBD"` except for standard placeholders for Facebook, Instagram, and TikTok. Tagline and description are set to `"CONTENT REQUIRED"`.

## Rules that must not be violated
1. Never invent room names, prices, amenities, hours
2. Never use AI-generated imagery
3. Real photos only, organized per the folder convention in `design.md`
4. Any CSS/layout change should be checked against `design.md` tokens
5. Visual changes require actual browser verification, not just code review — report explicitly if verification wasn't possible
