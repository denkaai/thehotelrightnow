# thehotelrightnow

Premium contemporary Indian hospitality MVP. 

## Description
This is a static website built for a premium hotel located on the Eastern Bypass, Ruiru-Kamakis, Kenya. It features sections for Rooms & Suites, Dining, Events, and a Gallery.

## Requirements
- Node.js (v18+)
- npm

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start Development Server:**
   ```bash
   npm start
   ```
   *or*
   ```bash
   npm run dev
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```

## Cloudflare Pages Settings
- **Build command:** `npm run build`
- **Output directory:** `_site`
- **Framework Preset:** None

## Folder Layout
- `src/`: Source files.
  - `_data/`: JSON data files containing all hotel facts.
  - `_includes/`: Nunjucks layouts, components, and partials.
  - `assets/`: CSS, JS, Fonts, and Images.
- `_site/`: Built static files for production (generated on build).

## Content Management
- **Text & Facts:** All content is driven by JSON data. Edit files in `src/_data/*.json` to update rooms, dining, events, gallery, and site-wide facts.
- **Photos:** Place raw photos in their respective folders under `src/assets/img/` (e.g., `brand/`, `hero/`, `hotel/`, `rooms/`, `dining/`, `events/`, `gallery/`). Reference these image paths in the corresponding data JSON files.
