# Multilingual Implementation Notes

## Current project status

This workspace is currently a static HTML website, not a Next.js application. No `package.json`, `next.config.*`, `app/`, or `pages/` directory was detected.

Because of that, the implemented solution is a static equivalent of `next-intl`:

- Translation dictionaries: `locales/en.json`, `locales/es.json`, `locales/ru.json`, `locales/ar.json`, `locales/fr.json`, `locales/pt.json`
- Language routes: `/en`, `/es`, `/ru`, `/ar`, `/fr`, `/pt`
- RTL support for Arabic via `dir="rtl"` and CSS overrides
- Language switcher CSS/JS
- Hreflang tags on localized pages
- Multilingual sitemap entries

## Future Next.js / next-intl migration

If the site is migrated to Next.js, use this shape:

```text
app/[locale]/layout.tsx
app/[locale]/page.tsx
app/[locale]/products/page.tsx
app/[locale]/products/press-brake/page.tsx
messages/en.json
messages/es.json
messages/ru.json
messages/ar.json
messages/fr.json
messages/pt.json
middleware.ts
next.config.mjs
```

`next-intl` config should use:

```ts
export const locales = ['en', 'es', 'ru', 'ar', 'fr', 'pt'];
export const defaultLocale = 'en';
```

## Translation API placeholders

Do not expose translation API keys in frontend code. Store them server-side:

```env
DEEPL_API_KEY=
GOOGLE_CLOUD_TRANSLATE_API_KEY=
```

Product names, brand names, model names, and certification names should remain stable:

- RONGWIN
- MetalworkMaster
- Press Brake
- CNC Press Brake
- Laser Cutting Machine
- Panel Bender
- CE / SGS / ISO 9001

## Human review needed

Machine-assisted translations should be reviewed by native or fluent speakers before production, especially Arabic and Russian technical terms.
