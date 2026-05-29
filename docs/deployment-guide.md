# RONGWIN Deployment Guide

## Project Type

This website is currently a static HTML/CSS/JS website, not a Next.js project.

Use these Vercel settings:

- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: leave empty or use `.`
- Install Command: leave empty or `npm install`

Do not use `.next` as the output directory unless the project is rebuilt as a real Next.js application.

## GitHub Repository

Recommended repository name:

`rongwinpressbrake`

## Deployment Checks

After deployment, check:

- Homepage opens
- `/products/` opens
- `/products/press-brake/` opens
- `/contact/` opens
- `/inquiry/` opens and the form is visible
- WhatsApp button is visible and clickable
- Homepage has a `<title>` tag
- Mobile viewport displays without horizontal layout issues

## Current Build Command

`npm run build`

The build command runs `scripts/verify-static-site.mjs`, which verifies key files and homepage features before deployment.
