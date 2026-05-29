import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, sep } from "node:path";

const root = process.cwd();
const locales = ["en", "es", "ru", "ar", "fr", "pt"];

function walk(dir, out = []) {
  for (const item of readdirSync(dir)) {
    const path = `${dir}${sep}${item}`;
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, out);
    else if (item === "index.html") out.push(path);
  }
  return out;
}

function prefixFor(file) {
  const dir = dirname(relative(root, file));
  if (dir === ".") return "";
  return "../".repeat(dir.split(sep).length);
}

function localeAndSubpath(file) {
  const rel = relative(root, dirname(file)).split(sep).filter(Boolean);
  const locale = locales.includes(rel[0]) ? rel[0] : "en";
  const subpath = locales.includes(rel[0]) ? rel.slice(1).join("/") : rel.join("/");
  return { locale, subpath };
}

function path(prefix, target = "") {
  return `${prefix}${target}`;
}

function switcher(prefix, subpath) {
  const suffix = subpath ? `${subpath}/` : "";
  return `<div class="language-switcher">
        <button class="language-current" type="button" aria-expanded="false">English</button>
        <div class="language-menu">
          <a href="${prefix}en/${suffix}" lang="en">English</a>
          <a href="${prefix}es/${suffix}" lang="es">Español</a>
          <a href="${prefix}ru/${suffix}" lang="ru">Русский</a>
          <a href="${prefix}ar/${suffix}" lang="ar" dir="rtl">العربية</a>
          <a href="${prefix}fr/${suffix}" lang="fr">Français</a>
          <a href="${prefix}pt/${suffix}" lang="pt">Português</a>
        </div>
      </div>`;
}

function header(prefix, subpath) {
  return `<header class="site-header">
    <a class="brand" href="${path(prefix)}index.html" aria-label="RONGWIN home">
      <img src="${path(prefix, "assets/images/rongwin-logo.png")}" alt="RONGWIN machinery logo">
    </a>
    <nav class="main-nav mega-nav" aria-label="Main navigation">
      <div class="mega-item">
        <a class="mega-trigger" href="${path(prefix, "products/")}">Products</a>
        <div class="mega-panel">
          <div class="mega-inner">
            <div class="mega-column">
              <p class="mega-label">Popular Products</p>
              <a href="${path(prefix, "products/press-brake/")}"><strong>Press Brake</strong><span>CNC, hydraulic, electric and custom bending solutions.</span></a>
              <a href="${path(prefix, "products/laser-cutting-machine/")}"><strong>Laser Cutting Machine</strong><span>Sheet metal cutting equipment for complete workflows.</span></a>
              <a href="${path(prefix, "products/panel-bender/")}"><strong>Panel Bender</strong><span>Automated bending for cabinets, panels and enclosures.</span></a>
            </div>
            <div class="mega-column">
              <p class="mega-label">Buyer Shortcuts</p>
              <a href="${path(prefix, "products/")}"><strong>All Products</strong><span>Browse RONGWIN machinery categories.</span></a>
              <a href="${path(prefix, "resources/press-brake-buying-guide/")}"><strong>Press Brake Buying Guide</strong><span>Choose tonnage, bending length and supplier capability.</span></a>
              <a href="${path(prefix, "resources/catalogs/")}"><strong>Download Catalogs</strong><span>Company profile and product brochures.</span></a>
            </div>
            <div class="mega-cta">
              <p>Need a machine recommendation?</p>
              <strong>Send material, thickness and target country.</strong>
              <a class="button small" data-track="quote_button_click" href="${path(prefix, "inquiry/")}">Get RFQ Support</a>
            </div>
          </div>
        </div>
      </div>
      <div class="mega-item">
        <a class="mega-trigger" href="${path(prefix, "industries/")}">Applications</a>
        <div class="mega-panel">
          <div class="mega-inner compact">
            <div class="mega-column">
              <p class="mega-label">Applications</p>
              <a href="${path(prefix, "industries/metal-fabrication/")}"><strong>Metal Fabrication</strong><span>General sheet metal production.</span></a>
              <a href="${path(prefix, "industries/building-and-construction/")}"><strong>Building & Construction</strong><span>Profiles, panels and structural parts.</span></a>
              <a href="${path(prefix, "industries/elevator-and-cabinet/")}"><strong>Elevator & Cabinet</strong><span>Cabinets, enclosures and box forming.</span></a>
            </div>
            <div class="mega-column">
              <p class="mega-label">Solutions</p>
              <a href="${path(prefix, "solutions/custom-press-brake/")}"><strong>Custom Press Brake</strong><span>Configure bending around your workpieces.</span></a>
              <a href="${path(prefix, "solutions/smart-metal-fabrication/")}"><strong>Smart Metal Fabrication</strong><span>MetalworkMaster Industry 4.0 solutions.</span></a>
              <a href="${path(prefix, "solutions/tooling-and-spare-parts/")}"><strong>Tooling & Spare Parts</strong><span>Support for long-term machine operation.</span></a>
            </div>
          </div>
        </div>
      </div>
      <div class="mega-item">
        <a class="mega-trigger" href="${path(prefix, "about/")}">Company</a>
        <div class="mega-panel">
          <div class="mega-inner compact">
            <div class="mega-column">
              <p class="mega-label">Trust Center</p>
              <a href="${path(prefix, "about/")}"><strong>About RONGWIN</strong><span>Company positioning, team and service commitment.</span></a>
              <a href="${path(prefix, "factory/")}"><strong>Factory Capability</strong><span>Workshop, inspection, packing and delivery proof.</span></a>
              <a href="${path(prefix, "quality-control/")}"><strong>Quality Control</strong><span>Testing, inspection and industrial-grade quality process.</span></a>
            </div>
            <div class="mega-column">
              <p class="mega-label">Proof</p>
              <a href="${path(prefix, "certifications/")}"><strong>Certifications</strong><span>Publish only verified certificates and documents.</span></a>
              <a href="${path(prefix, "customer-cases/")}"><strong>Customer Cases</strong><span>Project country, application and machine result.</span></a>
              <a href="${path(prefix, "service-support/")}"><strong>Service Support</strong><span>Lifetime support, spare parts and upgrade service.</span></a>
            </div>
          </div>
        </div>
      </div>
      <div class="mega-item">
        <a class="mega-trigger" href="${path(prefix, "resources/")}">Resources</a>
        <div class="mega-panel">
          <div class="mega-inner compact">
            <div class="mega-column">
              <p class="mega-label">SEO Guides</p>
              <a href="${path(prefix, "resources/blog/")}"><strong>Blog Center</strong><span>SEO articles for overseas sourcing questions.</span></a>
              <a href="${path(prefix, "resources/press-brake-buying-guide/")}"><strong>Buying Guide</strong><span>How to choose a press brake supplier.</span></a>
              <a href="${path(prefix, "resources/press-brake-tooling-guide/")}"><strong>Tooling Guide</strong><span>Tooling basics and RFQ questions.</span></a>
            </div>
            <div class="mega-column">
              <p class="mega-label">Downloads</p>
              <a href="${path(prefix, "resources/catalogs/")}"><strong>Catalog Center</strong><span>Download RONGWIN PDF catalogs.</span></a>
              <a href="${path(prefix, "assets/catalogs/rongwin-press-brake-2026.pdf")}"><strong>Press Brake Catalog</strong><span>Fast access for sourcing teams.</span></a>
            </div>
          </div>
        </div>
      </div>
      <a class="mega-link" href="${path(prefix, "resources/catalogs/")}">Download</a>
      <a class="mega-link" href="${path(prefix, "contact/")}">Contact</a>
    </nav>
    <div class="header-actions">
      ${switcher(prefix, subpath)}
      <a class="button small" data-track="quote_button_click" href="${path(prefix, "inquiry/")}">Get a Quote</a>
    </div>
  </header>`;
}

function footer(prefix) {
  return `<footer class="site-footer">
    <div>
      <img src="${path(prefix, "assets/images/rongwin-logo.png")}" alt="RONGWIN logo">
      <p>Precision Press Brake Manufacturer | Lifetime Partnerships</p>
    </div>
    <div>
      <strong>Products</strong>
      <p>Press Brake<br>Laser Cutting Machine<br>Panel Bender</p>
    </div>
    <div>
      <strong>Contact</strong>
      <p>Info@rongwin.com<br>WhatsApp: +86 151 5614 7667</p>
    </div>
  </footer>`;
}

function ensureAsset(html, prefix, href) {
  const tag = `<link rel="stylesheet" href="${prefix}${href}">`;
  if (html.includes(href)) return html;
  return html.replace("</head>", `  ${tag}\n</head>`);
}

function ensureScript(html, prefix, src) {
  const tag = `<script src="${prefix}${src}"></script>`;
  if (html.includes(src)) return html;
  return html.replace("</body>", `  ${tag}\n</body>`);
}

let changed = 0;
for (const file of walk(root)) {
  let html = readFileSync(file, "utf8");
  if (!/<header[\s\S]*?<\/header>/.test(html) || !/<footer[\s\S]*?<\/footer>/.test(html)) continue;
  const prefix = prefixFor(file);
  const { subpath } = localeAndSubpath(file);
  html = html.replace(/<header[\s\S]*?<\/header>/, header(prefix, subpath));
  html = html.replace(/<footer[\s\S]*?<\/footer>/, footer(prefix));
  html = ensureAsset(html, prefix, "assets/css/mega-menu.css");
  html = ensureAsset(html, prefix, "assets/css/language-switcher.css");
  html = ensureAsset(html, prefix, "assets/css/interaction-fix.css");
  html = ensureScript(html, prefix, "assets/js/language-switcher.js");
  writeFileSync(file, html, "utf8");
  changed += 1;
}

console.log(`Updated ${changed} pages`);
