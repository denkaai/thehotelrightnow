# Architecture

## Project Structure
- `src/`: Input directory for all source files.
- `_site/`: Output directory for compiled static files.

## Template Structure
- Built with **Eleventy 3.x (ESM)** and **Nunjucks**.
- Layouts, components, and partials are located in `src/_includes/`.

## Data Structure
- Pure JSON data files in `src/_data/` feed the templates.
- Content is fully separated from presentation (no hardcoded facts in templates).

## CSS Architecture
- **Vanilla CSS** with no external frameworks.
- Organized into specific files:
  - `tokens.css`: Design tokens (colors, fonts, spacing).
  - `base.css`: CSS reset and typography.
  - `layout.css`: Structural layouts and containers.
  - `components.css`: Reusable UI components.
  - `pages.css`: Page-specific styling.

## JS Architecture
- **Vanilla JS**, strictly for necessary interactions (e.g., sticky header observer, mobile menu, lightbox). No heavy client-side frameworks or unnecessary animation libraries.

## Build Process
- `eleventy.config.js` configures the static site generation.
- Nunjucks templates and JSON data compile into pure HTML.
- `src/assets/` is passed through directly to the `_site/` directory (excluding placeholder files like `.gitkeep`).

## Future Upgrade Path: Enquiry Form
Currently, the enquiry form uses a `mailto` or `wa.me` fallback for MVP. In the future, this will be upgraded to use a **Cloudflare Pages Function** to handle form submissions on the backend seamlessly without relying on the client's local email or WhatsApp client.
