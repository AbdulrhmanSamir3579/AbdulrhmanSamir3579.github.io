# Screenshot tool

Captures project screenshots with headless Chromium (Playwright) and encodes them to WebP (sharp).
It has its own `package.json` and is never installed in CI.

```bash
cd tools/screenshots && npm install    # uses the Chromium Playwright already cached, or: npx playwright install chromium

node capture.mjs [--only <id|slug>,...] [--device desktop|mobile] [--headed]   # → .tmp/
node capture.mjs --sheet                                                       # → .tmp/contact-sheet.html
node capture.mjs --publish [--only <id>,...]                                   # → web/public/portfolio + media.generated.json
```

Targets (URLs, scroll positions, devices, colour schemes) live in `targets.mjs`.

## Logins

Credentials are read from the environment only — never pass them inline (shell history) and never commit them:

```bash
read -rs EPATH_DEMO_USER && export EPATH_DEMO_USER
read -rs EPATH_DEMO_PASS && export EPATH_DEMO_PASS
node capture.mjs --only epath-erp          # add --headed if the demo asks for an OTP
```

The script never saves storage state, HAR files, traces or video, and aborts if a login asks for a password change.

Leen is captured from a local seeded build: `cd ~/Personal/markaz && pnpm db:up && pnpm dev`, then
`LEEN_DEMO_USER=… LEEN_DEMO_PASS=… node capture.mjs --only leen` with a seeded demo account.

## Portfolio checks

With `web/out` served locally (`python3 -m http.server 4123 -d web/out`):

```bash
node capture.mjs --og --base http://127.0.0.1:4123          # web/public/og/{en,ar}.png
node capture.mjs --self-check --base http://127.0.0.1:4123  # full-page EN/AR × device × theme + console errors
```
