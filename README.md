# Abdulrahman Samir — portfolio

Bilingual (English / Arabic) portfolio, live at **https://abdulrhmansamir3579.github.io/**.

- `web/` — the site: Next.js 16 static export, Tailwind CSS 4, Framer Motion. See [`web/README.md`](web/README.md).
- `tools/screenshots/` — Playwright script that captures the project screenshots. See [`tools/screenshots/README.md`](tools/screenshots/README.md).
- `.github/workflows/deploy-pages.yml` — every push to `main` that touches `web/` lints, type-checks, builds and deploys to GitHub Pages.

```bash
cd web && npm install && npm run dev   # http://localhost:3000/en/
```
