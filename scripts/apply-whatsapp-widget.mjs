import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, sep } from "node:path";

const root = process.cwd();

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

function ensureCss(html, prefix) {
  if (html.includes("whatsapp-floating.css")) return html;
  return html.replace("</head>", `  <link rel="stylesheet" href="${prefix}assets/css/whatsapp-floating.css">\n</head>`);
}

function ensureJs(html, prefix) {
  if (html.includes("whatsapp-floating.js")) return html;
  return html.replace("</body>", `  <script src="${prefix}assets/js/whatsapp-floating.js"></script>\n</body>`);
}

let updated = 0;
for (const file of walk(root)) {
  let html = readFileSync(file, "utf8");
  const prefix = prefixFor(file);
  const next = ensureJs(ensureCss(html, prefix), prefix);
  if (next !== html) {
    writeFileSync(file, next, "utf8");
    updated += 1;
  }
}

console.log(`WhatsApp widget references updated on ${updated} pages.`);
