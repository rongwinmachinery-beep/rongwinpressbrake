import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const site = "https://www.rongwin.com";
const updated = "2026-05-28";

const facts = [
  "Global manufacturer since 2009",
  "15+ years press brake manufacturing experience",
  "150+ countries served",
  "82% repeat purchase rate",
  "10,000+ sqm factory facilities",
  "1,000+ press brakes produced yearly",
  "CE / SGS / ISO 9001 quality system",
  "72-hour load tests and 100+ inspections",
];

const products = [
  ["press-brake", "Press Brake", "press brake manufacturer", "Custom press brake systems for metal fabrication buyers who need stable accuracy, factory control, and lifetime service support."],
  ["cnc-press-brake", "CNC Press Brake", "cnc press brake manufacturer", "CNC press brakes built for repeatable bending, easier programming, and scalable sheet metal production."],
  ["hydraulic-press-brake", "Hydraulic Press Brake", "hydraulic press brake", "Hydraulic press brakes for dependable forming power, durable frames, and broad workshop applications."],
  ["electric-press-brake", "Electric Servo Press Brake", "electric servo press brake", "Oil-free electric servo bending for high precision, lower energy use, and cleaner production."],
  ["panel-bender", "Panel Bender", "panel bender manufacturer", "Panel bending equipment for cabinets, boxes, small workpieces, and automated sheet metal workflows."],
  ["laser-cutting-machine", "Laser Cutting Machine", "fiber laser cutting machine", "Fiber laser cutting machines that support flexible sheet metal processing before forming and assembly."],
  ["robot-welding-machine", "Robot Welding Machine", "robot laser welding machine", "Robot welding systems for repeatable weld quality and reduced dependence on manual welding labor."],
  ["plate-rolling-machine", "Plate Rolling Machine", "plate rolling machine", "Plate rolling machines that extend RONGWIN's metalworking machinery portfolio."],
];

const solutions = [
  ["custom-press-brake", "Custom Press Brake Solutions", "custom press brake solution", "Fit bending capacity, tooling, controls, and workflow to your parts instead of forcing your factory around a standard machine."],
  ["smart-metal-fabrication", "Smart Metal Fabrication", "smart metal fabrication", "Industry 4.0 consulting and connected bending workflows powered by MetalworkMaster smart technologies."],
  ["press-brake-retrofit-upgrade", "Press Brake Retrofit & Upgrade", "press brake retrofit", "Modernize controls, tooling, fixtures, and production reliability without replacing every existing asset."],
  ["tooling-and-spare-parts", "Tooling & Spare Parts", "press brake tooling and spare parts", "Bending tools, consumables, and spare parts support to keep your machines productive for the long term."],
  ["metalworking-production-line", "Metalworking Production Line", "metalworking production line", "Combine cutting, bending, welding, tooling, and automation into a practical production line plan."],
];

const industries = [
  ["metal-fabrication", "Metal Fabrication", "press brake for metal fabrication"],
  ["furniture-manufacturing", "Furniture Manufacturing", "press brake for furniture manufacturing"],
  ["building-and-construction", "Building & Construction", "sheet metal bending for construction"],
  ["elevator-and-cabinet", "Elevator & Cabinet", "panel bending for elevator and cabinet"],
  ["automotive-parts", "Automotive Parts", "press brake for automotive parts"],
];

const resources = [
  ["press-brake-buying-guide", "Press Brake Buying Guide", "How to choose a press brake by tonnage, bending length, control system, tooling, and supplier capability."],
  ["press-brake-maintenance", "Press Brake Maintenance Guide", "A practical maintenance guide for hydraulic, CNC, and electric press brake buyers."],
  ["press-brake-tooling-guide", "Press Brake Tooling Guide", "Tooling basics, material considerations, and supplier questions for better bending accuracy."],
];

const landing = [
  ["press-brake-manufacturer", "Press Brake Manufacturer", "Compare RONGWIN factory capability, customization flow, certifications, and RFQ support."],
  ["cnc-press-brake", "CNC Press Brake RFQ", "Get a CNC press brake recommendation for your bending length, material, thickness, and production volume."],
  ["custom-press-brake-solution", "Custom Press Brake Solution", "Send your part requirements and receive a practical custom bending solution from RONGWIN engineers."],
];

function rel(path) {
  const depth = path.split("/").filter(Boolean).length;
  return depth ? "../".repeat(depth) : "";
}

function pagePath(route) {
  return route === "/" ? "index.html" : join(route.replace(/^\/|\/$/g, ""), "index.html");
}

function write(route, html) {
  const file = join(root, pagePath(route));
  if (route === "/" && existsSync(file)) return;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html, "utf8");
}

function schema(type, data) {
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": type, ...data })}</script>`;
}

function layout({ route, title, description, lang = "en", h1, eyebrow, body, schemaJson = "" }) {
  const prefix = rel(route);
  const canonical = `${site}${route}`;
  const esRoute = route === "/" ? "/es/" : `/es${route}`;
  const enRoute = route.startsWith("/es/") ? route.replace(/^\/es/, "") || "/" : route;
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${site}${enRoute}">
  <link rel="alternate" hreflang="es" href="${site}${esRoute}">
  <link rel="alternate" hreflang="x-default" href="${site}${enRoute}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${site}/assets/images/rongwin-banner.jpg">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="${prefix}assets/css/styles.css">
  ${schema("Organization", {
    name: "Nanjing RONGWIN Machinery Technology Co., Ltd.",
    url: site,
    logo: `${site}/assets/images/rongwin-logo.png`,
    foundingDate: "2009",
    email: "Info@rongwin.com",
    slogan: "Mastering Metal, Shaping Futures",
    contactPoint: [{ "@type": "ContactPoint", telephone: "+86-15156147667", contactType: "sales", availableLanguage: ["English", "Spanish"] }],
    sameAs: ["https://www.metalworkmaster.com"]
  })}
  ${schemaJson}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${prefix}index.html" aria-label="RONGWIN home"><img src="${prefix}assets/images/rongwin-logo.png" alt="RONGWIN press brake manufacturer logo"></a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="${prefix}products/">Products</a>
      <a href="${prefix}solutions/">Solutions</a>
      <a href="${prefix}industries/">Industries</a>
      <a href="${prefix}factory/">Factory</a>
      <a href="${prefix}resources/">Resources</a>
      <a href="${prefix}contact/">Contact</a>
    </nav>
    <div class="header-actions">
      <a class="lang" href="${prefix}${lang === "es" ? "" : "es/"}">${lang === "es" ? "EN" : "ES"}</a>
      <a class="button small" data-track="quote_button_click" href="${prefix}contact/">Request Quote</a>
    </div>
  </header>
  <main>
    <section class="hero">
      <img src="${prefix}assets/images/rongwin-banner.jpg" alt="RONGWIN precision press brake and smart metal manufacturing banner">
      <div class="hero-copy">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${h1}</h1>
        <p>${description}</p>
        <div class="cta-row">
          <a class="button" data-track="quote_button_click" href="${prefix}contact/">Request a Quote</a>
          <a class="button secondary" data-track="whatsapp_click" href="https://wa.me/8615156147667">Talk to an Engineer</a>
          <a class="button ghost" data-track="catalog_download" href="${prefix}assets/catalogs/rongwin-press-brake-2026.pdf">Download Catalog</a>
        </div>
      </div>
    </section>
    ${body}
  </main>
  <aside class="sticky-cta" aria-label="Quick contact">
    <a data-track="whatsapp_click" href="https://wa.me/8615156147667">WhatsApp</a>
    <a data-track="email_click" href="mailto:Info@rongwin.com">Email</a>
    <a data-track="catalog_download" href="${prefix}resources/catalogs/">Catalog</a>
  </aside>
  <footer class="site-footer">
    <div><img src="${prefix}assets/images/rongwin-logo.png" alt="RONGWIN logo"><p>Precision Press Brake Manufacturer | Lifetime Partnerships</p></div>
    <div><strong>Contact</strong><p>Info@rongwin.com<br>WhatsApp: +86 151 5614 7667</p></div>
    <div><strong>Quality</strong><p>CE / SGS / ISO 9001<br>72-hour load tests, 100+ inspections</p></div>
  </footer>
  <script src="${prefix}assets/js/site.js"></script>
</body>
</html>`;
}

function factGrid() {
  return `<section class="band"><div class="grid stats">${facts.map((f) => `<div><strong>${f.split(" ")[0]}</strong><span>${f.replace(f.split(" ")[0] + " ", "")}</span></div>`).join("")}</div></section>`;
}

function inquiryForm() {
  return `<form class="rfq-form" data-form="rfq">
    ${["Name", "Email", "Country", "Company", "Product Interest", "Material", "Thickness", "Bending Length", "Quantity"].map((x) => `<label>${x}<input name="${x.toLowerCase().replaceAll(" ", "_")}" ${x === "Email" ? "type=\"email\"" : ""}></label>`).join("")}
    <label class="wide">Message<textarea name="message" rows="4"></textarea></label>
    <button class="button" type="submit">Submit RFQ</button>
  </form>`;
}

function productCards(prefix = "") {
  return `<div class="grid cards">${products.map(([slug, name, kw, desc]) => `<article class="card"><h3>${name}</h3><p>${desc}</p><p class="keyword">${kw}</p><a href="${prefix}products/${slug}/">View machine</a></article>`).join("")}</div>`;
}

write("/", layout({
  route: "/",
  title: "RONGWIN | Precision Press Brake Manufacturer for Smart Metal Manufacturing",
  description: "RONGWIN is a press brake manufacturer serving 150+ countries with custom bending machines, smart metal fabrication solutions, factory quality control, and lifetime support.",
  eyebrow: "Global manufacturer since 2009",
  h1: "Precision Press Brake Manufacturer | Lifetime Partnerships",
  body: `
${factGrid()}
<section class="section two-col"><div><p class="eyebrow">Brand strength</p><h2>Custom press brakes built by a factory that owns the full process.</h2><p>RONGWIN combines press brake manufacturing, tooling, spare parts, upgrades, and smart metal automation into one supplier relationship for global buyers.</p></div><img class="portrait" src="assets/images/jane-wu-founder.png" alt="Jane Wu, founder of RONGWIN machinery"></section>
<section class="section"><p class="eyebrow">Core products</p><h2>Metalworking machinery centered on press brake expertise</h2>${productCards()}</section>
<section class="section split"><div><h2>Factory proof for serious B2B buyers</h2><p>10,000+ sqm facilities, 1,000+ press brakes produced yearly, CE / SGS / ISO 9001, 72-hour load tests, and 100+ detailed inspections support RONGWIN's export manufacturing promise.</p></div>${inquiryForm()}</section>`
}));

write("/products/", layout({
  route: "/products/",
  title: "Products | Press Brakes, Panel Benders and Metalworking Machinery | RONGWIN",
  description: "Explore RONGWIN press brakes, CNC press brakes, hydraulic and electric servo press brakes, panel benders, laser cutting, robot welding, and plate rolling machines.",
  eyebrow: "Product center",
  h1: "Press brakes and metalworking machinery for global fabrication buyers",
  body: `<section class="section">${productCards("../")}</section>`
}));

for (const [slug, name, kw, desc] of products) {
  write(`/products/${slug}/`, layout({
    route: `/products/${slug}/`,
    title: `${name} | RONGWIN ${kw}`,
    description: desc,
    eyebrow: "Product page",
    h1: `${name} from RONGWIN`,
    schemaJson: schema("Product", { name, brand: "RONGWIN", description: desc, category: "Metalworking Machinery" }),
    body: `<section class="section two-col"><div><h2>What is a ${name}?</h2><p>${desc} RONGWIN supports machine selection, customized production, inspection reports, logistics updates, installation guidance, and lifetime service.</p><h2>Typical applications</h2><ul><li>Sheet metal fabrication</li><li>Building and construction parts</li><li>Furniture, cabinet, and enclosure production</li><li>Custom metal product manufacturing</li></ul></div><div class="panel"><h2>RFQ checklist</h2><table><tr><td>Material</td><td>Steel, stainless steel, aluminum</td></tr><tr><td>Key inputs</td><td>Thickness, bending length, tonnage, quantity</td></tr><tr><td>Support</td><td>Video inspection, packaging, delivery report</td></tr></table></div></section><section class="section split"><div><h2>Supplier questions buyers should ask</h2><p>Ask about frame processing, controller options, tooling compatibility, spare parts, quality inspection, and after-sales support before choosing a ${kw}.</p></div>${inquiryForm()}</section>`
  }));
}

write("/solutions/", layout({ route: "/solutions/", title: "Solutions | Custom Press Brake and Smart Metal Fabrication | RONGWIN", description: "RONGWIN solutions cover custom press brakes, smart fabrication, retrofit upgrades, tooling, spare parts, and metalworking production lines.", eyebrow: "Solutions", h1: "Custom metal manufacturing solutions around your parts", body: `<section class="section grid cards">${solutions.map(([s,n,k,d])=>`<article class="card"><h3>${n}</h3><p>${d}</p><p class="keyword">${k}</p><a href="../solutions/${s}/">Explore solution</a></article>`).join("")}</section>` }));
for (const [slug, name, kw, desc] of solutions) {
  write(`/solutions/${slug}/`, layout({ route: `/solutions/${slug}/`, title: `${name} | RONGWIN`, description: desc, eyebrow: "Solution", h1: name, body: `<section class="section split"><div><h2>From pain point to production result</h2><p>${desc}</p><ol><li>Demand analysis</li><li>Solution design and quotation</li><li>Customized production</li><li>Testing, inspection report, and videos</li><li>Packaging, logistics, installation guidance, and lifetime service</li></ol></div>${inquiryForm()}</section>` }));
}

write("/industries/", layout({ route: "/industries/", title: "Industries | Press Brake Applications | RONGWIN", description: "RONGWIN press brakes support metal fabrication, furniture manufacturing, construction, elevator, cabinet, and automotive parts production.", eyebrow: "Industries", h1: "Press brake applications by industry", body: `<section class="section grid cards">${industries.map(([s,n,k])=>`<article class="card"><h3>${n}</h3><p>RONGWIN helps ${n.toLowerCase()} buyers choose bending capacity, tooling, controls, and support for practical production needs.</p><p class="keyword">${k}</p><a href="../industries/${s}/">View industry</a></article>`).join("")}</section>` }));
for (const [slug, name, kw] of industries) {
  write(`/industries/${slug}/`, layout({ route: `/industries/${slug}/`, title: `${name} Press Brake Applications | RONGWIN`, description: `RONGWIN provides ${kw} solutions with custom machine selection, factory inspection, and lifetime service support.`, eyebrow: "Industry solution", h1: `${name} metalworking solutions`, body: `<section class="section split"><div><h2>Built for ${name.toLowerCase()} purchasing teams</h2><p>Use this page as a starting point for RFQs, Google Ads traffic, and SEO long-tail demand around ${kw}.</p><p>RONGWIN can match machine type, tooling, controls, and support workflow to your parts and factory constraints.</p></div>${inquiryForm()}</section>` }));
}

const trustPages = [
  ["/about/", "About RONGWIN", "Meet RONGWIN, a press brake manufacturer founded in 2009 and serving 150+ countries.", "Company built around lifetime partnerships"],
  ["/factory/", "Press Brake Factory", "RONGWIN operates 10,000+ sqm facilities and produces 1,000+ press brakes yearly.", "Factory capability for global demand"],
  ["/quality-control/", "Quality Control", "RONGWIN machines undergo 72-hour load tests and 100+ inspections under CE, SGS, and ISO 9001 systems.", "Quality control from frame to shipment"],
  ["/certifications/", "Certifications", "RONGWIN highlights CE, SGS, ISO 9001, and export-ready manufacturing controls.", "Certifications and compliance"],
  ["/customer-cases/", "Customer Cases", "RONGWIN serves 150+ countries with custom press brake and panel bender solutions.", "Customer success across 150+ countries"],
  ["/service-support/", "Service Support", "RONGWIN provides installation guidance, spare parts, upgrades, and lifetime service support.", "Lifetime support beyond delivery"],
  ["/contact/", "Contact RONGWIN", "Contact RONGWIN for press brake quotations, catalogs, engineering consultation, and WhatsApp support.", "Request a quote from RONGWIN"],
];
for (const [route, title, desc, h1] of trustPages) {
  write(route, layout({ route, title: `${title} | RONGWIN`, description: desc, eyebrow: "Trust center", h1, body: `<section class="section split"><div>${factGrid()}<p class="note">MetalworkMaster is presented as RONGWIN's smart manufacturing solution brand for Industry 4.0 projects.</p></div>${inquiryForm()}</section>` }));
}

write("/resources/", layout({ route: "/resources/", title: "Resources | Press Brake Guides and Catalogs | RONGWIN", description: "Read RONGWIN press brake buying, maintenance, tooling, and catalog resources for B2B metal fabrication buyers.", eyebrow: "Resources", h1: "Press brake guides, catalogs, and buyer resources", body: `<section class="section grid cards">${resources.map(([s,n,d])=>`<article class="card"><h3>${n}</h3><p>${d}</p><a href="../resources/${s}/">Read guide</a></article>`).join("")}<article class="card"><h3>Catalog Downloads</h3><p>Download company, press brake, panel bender, and laser cutting catalogs.</p><a href="../resources/catalogs/">View catalogs</a></article></section>` }));
write("/resources/catalogs/", layout({ route: "/resources/catalogs/", title: "Catalog Downloads | RONGWIN", description: "Download RONGWIN company profile, press brake, panel bender, and laser cutting machine catalogs.", eyebrow: "Catalogs", h1: "Download RONGWIN catalogs", body: `<section class="section grid cards">${["rongwin-company-profile-2026.pdf","rongwin-press-brake-2026.pdf","rongwin-panel-bender-2026.pdf","rongwin-laser-cutting-machine-2025.pdf"].map((f)=>`<article class="card"><h3>${f.replaceAll("-"," ").replace(".pdf","")}</h3><p>PDF catalog for buyer review and sourcing teams.</p><a data-track="catalog_download" href="../../assets/catalogs/${f}">Download PDF</a></article>`).join("")}</section>` }));
for (const [slug, title, desc] of resources) {
  write(`/resources/${slug}/`, layout({ route: `/resources/${slug}/`, title: `${title} | RONGWIN`, description: desc, eyebrow: `Guide | Updated ${updated}`, h1: title, schemaJson: schema("Article", { headline: title, dateModified: updated, author: { "@type": "Organization", name: "RONGWIN Engineering Team" } }), body: `<section class="section prose"><h2>Short answer</h2><p>${desc}</p><h2>Key buying checks</h2><ul><li>Confirm material, thickness, bending length, and tonnage.</li><li>Compare supplier factory capability, certifications, inspection workflow, and service support.</li><li>Ask for controller options, tooling compatibility, video inspection, packaging, and delivery report.</li></ul><h2>FAQ</h2><details open><summary>How do I choose press brake tonnage?</summary><p>Start from material, thickness, bending length, die opening, and bend geometry, then confirm with the supplier's engineering team.</p></details><details><summary>Why buy from a press brake factory?</summary><p>A factory can align customization, quality control, spare parts, and service support in one accountable workflow.</p></details></section>` }));
}

for (const [slug, title, desc] of landing) {
  write(`/landing/${slug}/`, layout({ route: `/landing/${slug}/`, title: `${title} | RONGWIN RFQ Landing Page`, description: desc, eyebrow: "RFQ landing page", h1: title, body: `<section class="section split"><div><h2>Why buyers choose RONGWIN</h2><ul>${facts.slice(0,6).map((f)=>`<li>${f}</li>`).join("")}</ul><h2>What happens after you submit</h2><ol><li>Engineer reviews your material and part requirements.</li><li>RONGWIN recommends machine type, tooling, and options.</li><li>You receive quotation, production plan, inspection, and delivery support.</li></ol></div>${inquiryForm()}</section>` }));
}

write("/es/", layout({ route: "/es/", lang: "es", title: "RONGWIN | Fabricante de plegadoras CNC para fabricación metálica", description: "RONGWIN fabrica plegadoras y soluciones de fabricación metálica inteligente para compradores globales, con soporte de por vida y control de calidad de fábrica.", eyebrow: "Fabricante global desde 2009", h1: "Fabricante de plegadoras de precisión | Alianzas de por vida", body: `${factGrid()}<section class="section split"><div><h2>Soluciones de plegado para compradores industriales</h2><p>La versión española prioriza la página inicial, productos clave, contacto y aterrizajes de RFQ para campañas y SEO inicial.</p></div>${inquiryForm()}</section>` }));
write("/es/contact/", layout({ route: "/es/contact/", lang: "es", title: "Contacto | RONGWIN", description: "Contacte con RONGWIN para cotizaciones de plegadoras, catálogos y soporte por WhatsApp.", eyebrow: "Contacto", h1: "Solicite una cotización", body: `<section class="section split"><div><p>Envíe sus requisitos de material, espesor, longitud de plegado y volumen de producción.</p></div>${inquiryForm()}</section>` }));

const allRoutes = ["/","/products/",...products.map(([s])=>`/products/${s}/`),"/solutions/",...solutions.map(([s])=>`/solutions/${s}/`),"/industries/",...industries.map(([s])=>`/industries/${s}/`),...trustPages.map(([r])=>r),"/resources/","/resources/catalogs/",...resources.map(([s])=>`/resources/${s}/`),...landing.map(([s])=>`/landing/${s}/`),"/es/","/es/contact/"];
writeFileSync(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allRoutes.map((r)=>`<url><loc>${site}${r}</loc><lastmod>${updated}</lastmod></url>`).join("")}</urlset>`);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
