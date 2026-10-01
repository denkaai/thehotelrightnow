import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as icons from 'simple-icons';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const platforms = [
  { id: 'facebook', key: 'siFacebook' },
  { id: 'instagram', key: 'siInstagram' },
  { id: 'youtube', key: 'siYoutube' },
  { id: 'twitter', key: 'siX' },
  { id: 'tiktok', key: 'siTiktok' },
  { id: 'linkedin', key: 'siLinkedin' },
  { id: 'pinterest', key: 'siPinterest' },
  { id: 'whatsapp', key: 'siWhatsapp' }
];

let njkContent = `<div class="social-icons-row">\n`;

for (const platform of platforms) {
  const icon = icons[platform.key];
  if (!icon) {
    console.error('Missing icon for', platform.id);
    continue;
  }
  const color = `#${icon.hex}`;
  let svg = icon.svg;
  
  // Update fill color to white for use on a dark background, or use currentcolor
  svg = svg.replace('<svg ', '<svg fill="currentColor" ');
  
  njkContent += `
  {% if site.socials.${platform.id} and site.socials.${platform.id} != 'CONTENT REQUIRED' and site.socials.${platform.id} != 'TBD' %}
    <a href="{{ site.socials.${platform.id} }}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Visit our ${icon.title}" style="--brand-color: ${color};">
      ${svg}
    </a>
  {% endif %}`;
}

njkContent += `\n</div>\n`;

const outPath = path.join(__dirname, '..', 'src', '_includes', 'components', 'social-icons.njk');
fs.writeFileSync(outPath, njkContent, 'utf-8');
console.log('Created social-icons.njk');
