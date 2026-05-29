# RONGWIN Static Website

Static bilingual website for RONGWIN's first-phase foreign trade independent site.

## Run locally

Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 8080
```

## Build pages

```powershell
node scripts/build-site.mjs
```

The generator creates English product, solution, industry, trust, resource, landing pages, Spanish starter pages, `sitemap.xml`, and `robots.txt`.
