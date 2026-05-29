import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "index.html",
  "products/index.html",
  "products/press-brake/index.html",
  "contact/index.html",
  "inquiry/index.html",
  "robots.txt",
  "sitemap.xml",
  "assets/css/styles.css",
  "assets/js/whatsapp-floating.js"
];

const missing = required.filter((file) => !existsSync(join(root, file)));

if (missing.length) {
  console.error("Missing required files:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const homepage = readFileSync(join(root, "index.html"), "utf8");
const checks = [
  ["SEO title", /<title>[^<]+<\/title>/i],
  ["WhatsApp widget", /whatsapp-floating\.js/i],
  ["Homepage hero", /home-hero/i],
  ["Video banner", /rongwin-press-brake-compressed\.mp4/i]
];

const failed = checks.filter(([, pattern]) => !pattern.test(homepage));

if (failed.length) {
  console.error("Homepage checks failed:");
  for (const [label] of failed) console.error(`- ${label}`);
  process.exit(1);
}

function collectIndexPages(dir, prefix = "") {
  const ignored = new Set([".git", ".vendor", ".vercel", "node_modules", "deploy-package"]);
  const pages = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;

    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const abs = join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...collectIndexPages(abs, rel));
    } else if (entry.isFile() && entry.name === "index.html") {
      pages.push(rel);
    }
  }

  return pages;
}

const pages = collectIndexPages(root);

console.log(`Static site verification passed. ${pages.length} HTML pages found.`);
