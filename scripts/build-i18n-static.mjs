import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const site = "https://www.rongwin.com";
const updated = "2026-05-28";

const locales = {
  en: { name: "English", dir: "ltr" },
  es: { name: "Español", dir: "ltr" },
  ru: { name: "Русский", dir: "ltr" },
  ar: { name: "العربية", dir: "rtl" },
  fr: { name: "Français", dir: "ltr" },
  pt: { name: "Português", dir: "ltr" },
};

const pages = [
  { key: "home", path: "", assetPrefix: "../" },
  { key: "products", path: "products", assetPrefix: "../../" },
  { key: "pressBrake", path: "products/press-brake", assetPrefix: "../../../" },
  { key: "applications", path: "applications", assetPrefix: "../../" },
  { key: "about", path: "about", assetPrefix: "../../" },
  { key: "factory", path: "factory", assetPrefix: "../../" },
  { key: "cases", path: "projects", assetPrefix: "../../" },
  { key: "blog", path: "blog", assetPrefix: "../../" },
  { key: "contact", path: "contact", assetPrefix: "../../" },
];

const t = {
  en: {
    nav: ["Products", "Applications", "About", "Factory", "Projects", "Blog", "Contact"],
    cta: "Get a Quote",
    whatsapp: "WhatsApp Us",
    catalog: "Download Catalog",
    switcher: "Language",
    pages: {
      home: ["RONGWIN | Precision Press Brake Manufacturer", "RONGWIN supplies press brakes, laser cutting machines, and panel benders with OEM/ODM customization, lifetime service support, global delivery, and industrial-grade quality control.", "Precision Press Brake Manufacturer for Global Metal Fabrication Projects", "Press brakes, laser cutting machines, and panel benders for importers, contractors, dealers, distributors, and EPC companies."],
      products: ["Products | RONGWIN Metalworking Machinery", "Explore RONGWIN press brakes, laser cutting machines, panel benders, tooling, spare parts, and custom machinery solutions.", "Metalworking Machinery for Global Buyers", "Choose press brakes, laser cutting machines, panel benders, tooling and spare parts from one export-oriented machinery supplier."],
      pressBrake: ["Press Brake Manufacturer | RONGWIN", "RONGWIN press brake solutions for CNC, hydraulic, electric, and customized sheet metal bending applications.", "Press Brake Manufacturer for Custom Sheet Metal Bending", "Compare CNC, hydraulic, electric and customized press brake solutions for your factory."],
      applications: ["Applications | RONGWIN", "RONGWIN machinery supports metal fabrication, building, cabinets, elevator panels, furniture, and automotive parts.", "Applications for Sheet Metal Fabrication", "Match bending, cutting and panel forming equipment to your industry and workpieces."],
      about: ["About RONGWIN", "Meet RONGWIN, a press brake manufacturer and smart metal automation solution supplier for overseas B2B buyers.", "About RONGWIN", "Nanjing RONGWIN Machinery Technology Co., Ltd. serves global buyers with machinery, spare parts, upgrades and lifetime support."],
      factory: ["Factory Capability | RONGWIN", "Review RONGWIN factory capability, quality control, testing, packing, and shipment preparation.", "Factory Capability and Quality Control", "Build buyer trust with workshop, assembly, testing, inspection, packing and delivery proof."],
      cases: ["Projects and Customer Cases | RONGWIN", "Explore RONGWIN project case structure for countries, applications, products, and customer requirements.", "Projects and Customer Cases", "Use country, product, application and result details to show real project experience."],
      blog: ["Blog | RONGWIN Press Brake Guides", "Read RONGWIN guides for press brake selection, panel bender comparison, tooling, maintenance, and RFQ preparation.", "Press Brake and Metalworking Guides", "SEO and AI-ready buyer guides for overseas machinery sourcing teams."],
      contact: ["Contact RONGWIN", "Contact RONGWIN for press brake quotations, catalogs, WhatsApp support, and machinery recommendations.", "Contact RONGWIN for a Machinery Quote", "Send your material, thickness, bending length, country and product requirement."],
    },
  },
  es: {
    nav: ["Productos", "Aplicaciones", "Nosotros", "Fábrica", "Proyectos", "Blog", "Contacto"],
    cta: "Solicitar cotización", whatsapp: "WhatsApp", catalog: "Descargar catálogo", switcher: "Idioma",
    pages: {
      home: ["RONGWIN | Fabricante de plegadoras", "RONGWIN suministra plegadoras, máquinas de corte láser y panel benders con personalización OEM/ODM, soporte de por vida y entrega global.", "Fabricante de plegadoras para proyectos globales de fabricación metálica", "Equipos para importadores, contratistas, distribuidores y empresas EPC."],
      products: ["Productos | Maquinaria RONGWIN", "Explore plegadoras, corte láser, panel benders, herramientas, repuestos y soluciones personalizadas.", "Maquinaria metalmecánica para compradores globales", "Seleccione equipos de corte, plegado y conformado desde un proveedor exportador."],
      pressBrake: ["Fabricante de plegadoras | RONGWIN", "Soluciones de plegadoras CNC, hidráulicas, eléctricas y personalizadas para chapa metálica.", "Fabricante de plegadoras para plegado personalizado", "Compare soluciones CNC, hidráulicas, eléctricas y personalizadas."],
      applications: ["Aplicaciones | RONGWIN", "Equipos para fabricación metálica, construcción, gabinetes, paneles de elevador, muebles y autopartes.", "Aplicaciones para fabricación de chapa", "Conecte equipos de plegado, corte y panelado con su industria."],
      about: ["Sobre RONGWIN", "Conozca RONGWIN, proveedor de plegadoras y automatización metálica inteligente para compradores B2B.", "Sobre RONGWIN", "Nanjing RONGWIN Machinery Technology Co., Ltd. atiende a compradores globales con maquinaria, repuestos y soporte."],
      factory: ["Fábrica | RONGWIN", "Capacidad de fábrica, control de calidad, pruebas, embalaje y preparación de envío.", "Capacidad de fábrica y control de calidad", "Genere confianza con taller, montaje, pruebas, inspección y entrega."],
      cases: ["Proyectos y casos | RONGWIN", "Estructura de casos por país, aplicación, producto y requisitos del cliente.", "Proyectos y casos de clientes", "Muestre experiencia real con país, producto, aplicación y resultado."],
      blog: ["Blog | Guías RONGWIN", "Guías sobre selección de plegadoras, panel bender, herramientas, mantenimiento y RFQ.", "Guías de plegadoras y metalmecánica", "Contenido SEO y AI-ready para compradores internacionales."],
      contact: ["Contacto RONGWIN", "Contacte con RONGWIN para cotizaciones, catálogos, WhatsApp y recomendaciones.", "Contacte con RONGWIN para una cotización", "Envíe material, espesor, longitud de plegado, país y requisito."],
    },
  },
  ru: {
    nav: ["Продукты", "Применения", "О нас", "Завод", "Проекты", "Блог", "Контакты"],
    cta: "Получить предложение", whatsapp: "WhatsApp", catalog: "Скачать каталог", switcher: "Язык",
    pages: {
      home: ["RONGWIN | Производитель листогибочных прессов", "RONGWIN поставляет листогибочные прессы, лазерные станки и panel benders с OEM/ODM, сервисной поддержкой и глобальной доставкой.", "Производитель листогибочных прессов для международных проектов", "Оборудование для импортеров, подрядчиков, дилеров, дистрибьюторов и EPC-компаний."],
      products: ["Продукты | RONGWIN", "Листогибочные прессы, лазерная резка, panel benders, инструмент, запчасти и индивидуальные решения.", "Металлообрабатывающее оборудование для покупателей", "Выберите оборудование для резки, гибки и формовки у экспортного поставщика."],
      pressBrake: ["Производитель листогибочных прессов | RONGWIN", "CNC, гидравлические, электрические и индивидуальные решения для гибки листового металла.", "Листогибочный пресс для индивидуальной гибки", "Сравните CNC, гидравлические, электрические и специальные решения."],
      applications: ["Применения | RONGWIN", "Оборудование для металлообработки, строительства, шкафов, лифтовых панелей, мебели и автодеталей.", "Применения для листового металла", "Подберите гибку, резку и формовку под вашу отрасль."],
      about: ["О RONGWIN", "RONGWIN является поставщиком листогибочных прессов и интеллектуальной автоматизации для B2B покупателей.", "О RONGWIN", "Nanjing RONGWIN Machinery Technology Co., Ltd. поставляет оборудование, запчасти, модернизацию и сервис."],
      factory: ["Завод | RONGWIN", "Производственные возможности, контроль качества, испытания, упаковка и подготовка отгрузки.", "Завод и контроль качества", "Доверие через цех, сборку, испытания, инспекцию и доставку."],
      cases: ["Проекты | RONGWIN", "Структура кейсов по странам, применению, продукту и требованиям заказчика.", "Проекты и кейсы клиентов", "Показывайте опыт через страну, продукт, применение и результат."],
      blog: ["Блог | Руководства RONGWIN", "Руководства по выбору листогиба, panel bender, инструменту, обслуживанию и RFQ.", "Руководства по гибке и металлообработке", "SEO и AI-ready контент для международных покупателей."],
      contact: ["Контакты RONGWIN", "Свяжитесь с RONGWIN для предложения, каталогов, WhatsApp и рекомендаций.", "Свяжитесь с RONGWIN для предложения", "Отправьте материал, толщину, длину гибки, страну и требования."],
    },
  },
  ar: {
    nav: ["المنتجات", "التطبيقات", "من نحن", "المصنع", "المشاريع", "المدونة", "اتصل بنا"],
    cta: "اطلب عرض سعر", whatsapp: "واتساب", catalog: "تحميل الكتالوج", switcher: "اللغة",
    pages: {
      home: ["RONGWIN | مصنع مكابس ثني المعادن", "توفر RONGWIN مكابس ثني، آلات قطع ليزر، و panel benders مع تخصيص OEM/ODM ودعم خدمة طويل الأمد وشحن عالمي.", "مصنع مكابس ثني لمشاريع تصنيع المعادن العالمية", "معدات للمستوردين والمقاولين والموزعين وشركات EPC."],
      products: ["المنتجات | RONGWIN", "استكشف مكابس الثني، آلات القطع بالليزر، panel benders، الأدوات، قطع الغيار والحلول المخصصة.", "معدات تصنيع المعادن للمشترين العالميين", "اختر معدات القطع والثني والتشكيل من مورد تصدير واحد."],
      pressBrake: ["مصنع مكابس الثني | RONGWIN", "حلول مكابس ثني CNC وهيدروليكية وكهربائية ومخصصة لتشكيل الصفائح المعدنية.", "مكبس ثني لتشكيل الصفائح حسب الطلب", "قارن حلول CNC والهيدروليك والكهرباء والتخصيص."],
      applications: ["التطبيقات | RONGWIN", "معدات لتصنيع المعادن والبناء والخزائن ولوحات المصاعد والأثاث وقطع السيارات.", "تطبيقات تصنيع الصفائح المعدنية", "اربط معدات الثني والقطع والتشكيل بصناعتك."],
      about: ["من نحن | RONGWIN", "تعرف على RONGWIN كمورد لمكابس الثني وحلول الأتمتة المعدنية الذكية لمشتري B2B.", "من نحن RONGWIN", "تخدم Nanjing RONGWIN Machinery Technology Co., Ltd. المشترين العالميين بالمعدات وقطع الغيار والدعم."],
      factory: ["المصنع | RONGWIN", "قدرات المصنع، مراقبة الجودة، الاختبار، التغليف والتحضير للشحن.", "قدرات المصنع ومراقبة الجودة", "ابن الثقة عبر الورشة والتجميع والاختبار والفحص والتسليم."],
      cases: ["المشاريع | RONGWIN", "هيكل حالات المشاريع حسب البلد والتطبيق والمنتج ومتطلبات العميل.", "المشاريع وحالات العملاء", "اعرض الخبرة الحقيقية من خلال البلد والمنتج والتطبيق والنتيجة."],
      blog: ["المدونة | أدلة RONGWIN", "أدلة اختيار مكبس الثني و panel bender والأدوات والصيانة وتحضير RFQ.", "أدلة مكابس الثني وتصنيع المعادن", "محتوى SEO و AI-ready للمشترين الدوليين."],
      contact: ["اتصل بـ RONGWIN", "تواصل مع RONGWIN لعروض الأسعار والكتالوجات وواتساب وتوصيات المعدات.", "اتصل بـ RONGWIN لعرض سعر", "أرسل المادة والسماكة وطول الثني والبلد والمتطلبات."],
    },
  },
  fr: {
    nav: ["Produits", "Applications", "À propos", "Usine", "Projets", "Blog", "Contact"],
    cta: "Demander un devis", whatsapp: "WhatsApp", catalog: "Télécharger le catalogue", switcher: "Langue",
    pages: {
      home: ["RONGWIN | Fabricant de presses plieuses", "RONGWIN fournit presses plieuses, machines de découpe laser et panel benders avec personnalisation OEM/ODM, support à vie et livraison mondiale.", "Fabricant de presses plieuses pour projets mondiaux", "Équipements pour importateurs, entrepreneurs, distributeurs et sociétés EPC."],
      products: ["Produits | RONGWIN", "Découvrez presses plieuses, découpe laser, panel benders, outillage, pièces de rechange et solutions personnalisées.", "Machines de tôlerie pour acheteurs internationaux", "Choisissez découpe, pliage et formage auprès d’un fournisseur export."],
      pressBrake: ["Fabricant de presses plieuses | RONGWIN", "Solutions CNC, hydrauliques, électriques et personnalisées pour pliage de tôle.", "Presse plieuse pour pliage personnalisé", "Comparez les solutions CNC, hydrauliques, électriques et personnalisées."],
      applications: ["Applications | RONGWIN", "Machines pour tôlerie, construction, armoires, panneaux d’ascenseur, mobilier et pièces automobiles.", "Applications de fabrication de tôle", "Associez pliage, découpe et formage à votre industrie."],
      about: ["À propos de RONGWIN", "Découvrez RONGWIN, fournisseur de presses plieuses et d’automatisation métal intelligente pour acheteurs B2B.", "À propos de RONGWIN", "Nanjing RONGWIN Machinery Technology Co., Ltd. fournit machines, pièces, modernisation et support."],
      factory: ["Usine | RONGWIN", "Capacités d’usine, contrôle qualité, tests, emballage et préparation d’expédition.", "Capacité d’usine et contrôle qualité", "Créer la confiance avec atelier, assemblage, tests, inspection et livraison."],
      cases: ["Projets | RONGWIN", "Structure de cas par pays, application, produit et exigences client.", "Projets et cas clients", "Montrez l’expérience réelle par pays, produit, application et résultat."],
      blog: ["Blog | Guides RONGWIN", "Guides sur choix de presse plieuse, panel bender, outillage, maintenance et RFQ.", "Guides presses plieuses et tôlerie", "Contenu SEO et AI-ready pour acheteurs internationaux."],
      contact: ["Contact RONGWIN", "Contactez RONGWIN pour devis, catalogues, WhatsApp et recommandations machines.", "Contactez RONGWIN pour un devis", "Envoyez matière, épaisseur, longueur de pliage, pays et besoin produit."],
    },
  },
  pt: {
    nav: ["Produtos", "Aplicações", "Sobre", "Fábrica", "Projetos", "Blog", "Contato"],
    cta: "Solicitar cotação", whatsapp: "WhatsApp", catalog: "Baixar catálogo", switcher: "Idioma",
    pages: {
      home: ["RONGWIN | Fabricante de prensas dobradeiras", "A RONGWIN fornece prensas dobradeiras, máquinas de corte a laser e panel benders com OEM/ODM, suporte vitalício e entrega global.", "Fabricante de prensas dobradeiras para projetos globais", "Equipamentos para importadores, empreiteiros, revendedores, distribuidores e EPC."],
      products: ["Produtos | RONGWIN", "Explore prensas dobradeiras, corte a laser, panel benders, ferramentas, peças e soluções personalizadas.", "Máquinas para metalurgia para compradores globais", "Escolha corte, dobra e conformação de um fornecedor exportador."],
      pressBrake: ["Fabricante de prensas dobradeiras | RONGWIN", "Soluções CNC, hidráulicas, elétricas e personalizadas para dobra de chapas.", "Prensa dobradeira para dobra personalizada", "Compare soluções CNC, hidráulicas, elétricas e customizadas."],
      applications: ["Aplicações | RONGWIN", "Máquinas para fabricação metálica, construção, gabinetes, painéis de elevador, móveis e autopeças.", "Aplicações para fabricação de chapas", "Combine dobra, corte e conformação com sua indústria."],
      about: ["Sobre a RONGWIN", "Conheça a RONGWIN, fornecedora de prensas dobradeiras e automação metálica inteligente para B2B.", "Sobre a RONGWIN", "Nanjing RONGWIN Machinery Technology Co., Ltd. atende compradores globais com máquinas, peças e suporte."],
      factory: ["Fábrica | RONGWIN", "Capacidade fabril, controle de qualidade, testes, embalagem e preparação de envio.", "Capacidade fabril e controle de qualidade", "Construa confiança com oficina, montagem, testes, inspeção e entrega."],
      cases: ["Projetos | RONGWIN", "Estrutura de casos por país, aplicação, produto e requisitos do cliente.", "Projetos e casos de clientes", "Mostre experiência real por país, produto, aplicação e resultado."],
      blog: ["Blog | Guias RONGWIN", "Guias sobre escolha de prensa dobradeira, panel bender, ferramentas, manutenção e RFQ.", "Guias de prensas dobradeiras e metalurgia", "Conteúdo SEO e AI-ready para compradores internacionais."],
      contact: ["Contato RONGWIN", "Fale com a RONGWIN para cotações, catálogos, WhatsApp e recomendações de máquinas.", "Fale com a RONGWIN para cotação", "Envie material, espessura, comprimento de dobra, país e requisito."],
    },
  },
};

function route(locale, page) {
  return `/${locale}/${page.path ? `${page.path}/` : ""}`;
}

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, "utf8");
}

function altLinks(page, locale) {
  const links = Object.keys(locales).map((l) => `<link rel="alternate" hreflang="${l}" href="${site}${route(l, page)}">`).join("\n  ");
  return `${links}\n  <link rel="alternate" hreflang="x-default" href="${site}${route("en", page)}">\n  <link rel="canonical" href="${site}${route(locale, page)}">`;
}

function switcher(locale, page, prefix) {
  return `<div class="language-switcher">
    <button class="language-current" type="button" aria-expanded="false">${locales[locale].name}</button>
    <div class="language-menu">
      ${Object.entries(locales).map(([l, meta]) => `<a href="${prefix}${l}/${page.path ? `${page.path}/` : ""}" lang="${l}" dir="${meta.dir}">${meta.name}</a>`).join("")}
    </div>
  </div>`;
}

function nav(locale, prefix) {
  const n = t[locale].nav;
  const hrefs = ["products", "applications", "about", "factory", "projects", "blog", "contact"];
  return n.map((label, i) => `<a href="${prefix}${locale}/${hrefs[i]}/">${label}</a>`).join("");
}

function pageHtml(locale, page) {
  const tr = t[locale];
  const p = tr.pages[page.key];
  const prefix = page.assetPrefix;
  const dir = locales[locale].dir;
  return `<!doctype html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${p[0]}</title>
  <meta name="description" content="${p[1]}">
  ${altLinks(page, locale)}
  <meta property="og:title" content="${p[0]}">
  <meta property="og:description" content="${p[1]}">
  <meta property="og:image" content="${site}/assets/images/rongwin-banner.jpg">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="${prefix}assets/css/styles.css">
  <link rel="stylesheet" href="${prefix}assets/css/interaction-fix.css">
  <link rel="stylesheet" href="${prefix}assets/css/language-switcher.css">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Nanjing RONGWIN Machinery Technology CO.,Ltd","url":"${site}","logo":"${site}/assets/images/rongwin-logo.png","brand":"RONGWIN","email":"Info@rongwin.com","telephone":"+86-15156147667"}</script>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${prefix}${locale}/"><img src="${prefix}assets/images/rongwin-logo.png" alt="RONGWIN ${p[2]}"></a>
    <nav class="main-nav" aria-label="Main navigation">${nav(locale, prefix)}</nav>
    <div class="header-actions">${switcher(locale, page, prefix)}<a class="button small" href="${prefix}${locale}/contact/">${tr.cta}</a></div>
  </header>
  <main>
    <section class="hero">
      <img src="${prefix}assets/images/rongwin-banner.jpg" alt="RONGWIN ${p[2]}">
      <div class="hero-copy">
        <p class="eyebrow">RONGWIN</p>
        <h1>${p[2]}</h1>
        <p>${p[3]}</p>
        <div class="cta-row">
          <a class="button" href="${prefix}${locale}/contact/">${tr.cta}</a>
          <a class="button secondary" href="https://wa.me/8615156147667">${tr.whatsapp}</a>
          <a class="button ghost" href="${prefix}assets/catalogs/rongwin-press-brake-2026.pdf">${tr.catalog}</a>
        </div>
      </div>
    </section>
    <section class="section">
      <p class="eyebrow">SEO / GEO / AIO</p>
      <h2>${p[0]}</h2>
      <p>${p[1]}</p>
      <div class="grid cards">
        <article class="card"><h3>Press Brake</h3><p>RONGWIN Press Brake, CNC Press Brake, Hydraulic Press Brake and Electric Servo Press Brake.</p></article>
        <article class="card"><h3>Laser Cutting Machine</h3><p>Fiber laser cutting equipment for metal fabrication workflows.</p></article>
        <article class="card"><h3>Panel Bender</h3><p>Automated panel bending for cabinets, enclosures and sheet metal parts.</p></article>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div><img src="${prefix}assets/images/rongwin-logo.png" alt="RONGWIN logo"><p>Precision Press Brake Manufacturer | Lifetime Partnerships</p></div>
    <div><strong>Contact</strong><p>Info@rongwin.com<br>WhatsApp: +86 151 5614 7667</p></div>
    <div><strong>Languages</strong><p>${Object.values(locales).map((l) => l.name).join("<br>")}</p></div>
  </footer>
  <script src="${prefix}assets/js/language-switcher.js"></script>
</body>
</html>`;
}

for (const [locale, data] of Object.entries(t)) {
  write(join("locales", `${locale}.json`), JSON.stringify(data, null, 2));
  for (const page of pages) {
    write(join(locale, page.path, "index.html"), pageHtml(locale, page));
  }
}

const urls = [];
for (const locale of Object.keys(locales)) {
  for (const page of pages) urls.push(`${site}${route(locale, page)}`);
}
writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${updated}</lastmod></url>`).join("\n")}\n</urlset>\n`);
