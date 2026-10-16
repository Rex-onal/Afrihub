import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'frontend/public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5A623" />
      <stop offset="100%" stop-color="#E08B00" />
    </linearGradient>
  </defs>
  <circle cx="32" cy="32" r="30" fill="#1C1B1B" stroke="#F5A623" stroke-width="2" />
  <text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="34" fill="url(#goldGrad)">A</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf-8');
console.log('Created favicon.svg');

// 2. Generate PNG Favicons & Apple Touch Icon using sharp
async function generateIcons() {
  const svgBuf = Buffer.from(faviconSvg);

  // 16x16
  await sharp(svgBuf)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Created favicon-16x16.png');

  // 32x32
  await sharp(svgBuf)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // 180x180 apple-touch-icon
  await sharp(svgBuf)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // favicon.ico (using 32x32 png as base for standard modern browsers)
  await sharp(svgBuf)
    .resize(48, 48)
    .toFormat('png')
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  // 3. Generate 1200x630 Open Graph Image
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bgGlow" cx="20%" cy="25%" r="80%">
      <stop offset="0%" stop-color="#2D2114" />
      <stop offset="60%" stop-color="#191614" />
      <stop offset="100%" stop-color="#100E0D" />
    </radialGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F5A623" />
      <stop offset="50%" stop-color="#FFC56E" />
      <stop offset="100%" stop-color="#F5A623" />
    </linearGradient>
    <linearGradient id="accentBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#835500" stop-opacity="0" />
      <stop offset="50%" stop-color="#F5A623" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#835500" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGlow)" />

  <!-- Subtle Top Accent Border -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#accentBar)" />

  <!-- Geometric Subtle Grid / Pattern in Corner -->
  <circle cx="1080" cy="120" r="320" fill="none" stroke="#F5A623" stroke-width="1" stroke-opacity="0.08" />
  <circle cx="1080" cy="120" r="220" fill="none" stroke="#F5A623" stroke-width="1" stroke-opacity="0.12" />
  <circle cx="1080" cy="120" r="120" fill="none" stroke="#F5A623" stroke-width="1" stroke-opacity="0.16" />

  <!-- Top Brand Row -->
  <g transform="translate(100, 90)">
    <!-- Logo Badge -->
    <circle cx="40" cy="40" r="38" fill="#1C1B1B" stroke="#F5A623" stroke-width="2.5" />
    <text x="40" y="52" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="36" fill="#F5A623">A</text>
    
    <!-- Wordmark -->
    <text x="100" y="40" font-family="Georgia, serif" font-weight="700" font-size="40" fill="#FCF9F8">AfriHub</text>
    <text x="102" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="14" letter-spacing="4" fill="#F5A623">PAN-AFRICAN TECH COMMUNITY</text>
  </g>

  <!-- Main Headline -->
  <text x="100" y="270" font-family="Georgia, serif" font-weight="700" font-size="56" fill="#FCF9F8">Where Africa's Tech Talent</text>
  <text x="100" y="340" font-family="Georgia, serif" font-weight="700" font-size="56" fill="url(#goldGradient)">Rises Together.</text>

  <!-- Subheadline -->
  <text x="100" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="400" font-size="24" fill="#C5BAAF">
    Connecting high-potential builders across 54 nations through hackathons,
  </text>
  <text x="100" y="450" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="400" font-size="24" fill="#C5BAAF">
    scholarships, mentorship, and global career pathways.
  </text>

  <!-- Feature Pills -->
  <g transform="translate(100, 510)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="180" height="42" rx="21" fill="#25211D" stroke="#524534" stroke-width="1" />
    <text x="90" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#EAE1D9">54 African Nations</text>

    <!-- Pill 2 -->
    <rect x="200" y="0" width="230" height="42" rx="21" fill="#25211D" stroke="#524534" stroke-width="1" />
    <text x="315" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#EAE1D9">Hackathons &amp; Challenges</text>

    <!-- Pill 3 -->
    <rect x="450" y="0" width="220" height="42" rx="21" fill="#25211D" stroke="#524534" stroke-width="1" />
    <text x="560" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#EAE1D9">Scholarships &amp; Grants</text>

    <!-- Pill 4 -->
    <rect x="690" y="0" width="190" height="42" rx="21" fill="#25211D" stroke="#524534" stroke-width="1" />
    <text x="785" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#EAE1D9">Global Career Pathways</text>
  </g>

  <!-- Domain watermark bottom right -->
  <text x="1100" y="580" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="18" fill="#8E7F71">afrihub.example</text>

  <!-- Bottom Accent Border -->
  <rect x="0" y="626" width="1200" height="4" fill="url(#accentBar)" />
</svg>`;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Created og-image.png (1200x630)');
}

generateIcons().catch(console.error);

// 4. Create robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /dev-showcase

Sitemap: https://afrihub.example/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
console.log('Created robots.txt');

// 5. Create sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://afrihub.example/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://afrihub.example/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://afrihub.example/what-we-do</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://afrihub.example/events</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://afrihub.example/join</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://afrihub.example/partners</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://afrihub.example/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://afrihub.example/credits</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log('Created sitemap.xml');

// 6. Copy hero-1.webp to public for preloading
const heroSource = path.resolve(process.cwd(), 'frontend/src/assets/hero/hero-1.webp');
if (fs.existsSync(heroSource)) {
  fs.copyFileSync(heroSource, path.join(publicDir, 'hero-1.webp'));
  console.log('Copied hero-1.webp to public directory');
}
