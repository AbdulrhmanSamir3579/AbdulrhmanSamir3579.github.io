# Screenshot tool

Captures project screenshots with headless Chromium (Playwright) and encodes them to WebP (sharp).
It has its own `package.json` and is never installed in CI.

```bash
cd tools/screenshots && npm install    # uses the Chromium Playwright already cached, or: npx playwright install chromium

node capture.mjs [--only <id|slug>,...] [--device desktop|mobile] [--headed]   # → .tmp/
node capture.mjs --sheet                                                       # → .tmp/contact-sheet.html
node capture.mjs --publish [--only <id>,...]                                   # → web/public/portfolio + media.generated.json
```

Targets (URLs, scroll positions, devices, colour schemes, steps, blur regions) live in `targets.mjs`.

## Videos

```bash
node capture.mjs --video [--only <id|slug>]   # → .tmp/<slug>/<id>.mp4 + WebP poster + a frame strip for review
```

Recordings are MP4/H.264 (via the bundled `ffmpeg-static`). Apps that need a login sign in inside a separate,
unrecorded browser context first, so credentials never appear on screen.

## Logins

Credentials are read from the environment only — never pass them inline (shell history) and never commit them:

```bash
read -rs EPATH_DEMO_USER && export EPATH_DEMO_USER
read -rs EPATH_DEMO_PASS && export EPATH_DEMO_PASS
node capture.mjs --only epath-erp          # add --headed if the demo asks for an OTP
```

The script never writes storage-state files, HAR files or traces, records video only after the login has happened in a
separate context, and aborts if a login asks for a password change.

ETOLV's new portal uses a demo account the same way (`ETOLV_DEMO_USER` / `ETOLV_DEMO_PASS`). Its targets close the
"weak password" notice (never "Change password"), blur the staff names on the home chart, and never visit the
customers or suppliers lists (personal data).

Red Sea and Hwadi run locally from their repos (no backend needed for the captured pages):

```bash
git clone https://github.com/AbdulrhmanSamir3579/red-sea-frontend && cd red-sea-frontend && npm ci && npx ng serve --port 4201
git clone https://github.com/Next-devteam/hwadi_dashboard_front && cd hwadi_dashboard_front && npm ci && npx ng serve --port 4202
```

Leen is captured from a local seeded build: `cd ~/Personal/markaz && pnpm db:up && pnpm dev`, then
`LEEN_DEMO_USER=… LEEN_DEMO_PASS=… node capture.mjs --only leen` with a seeded demo account.

## Portfolio checks

With `web/out` served locally (`python3 -m http.server 4123 -d web/out`):

```bash
node capture.mjs --og --base http://127.0.0.1:4123          # web/public/og/{en,ar}.png
node capture.mjs --self-check --base http://127.0.0.1:4123  # full-page EN/AR × device × theme + console errors
```
