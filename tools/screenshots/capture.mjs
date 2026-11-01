#!/usr/bin/env node
/**
 * Portfolio screenshot tool (headless Chromium via Playwright, WebP via sharp).
 *
 *   node capture.mjs [--only id|slug,...] [--device desktop|mobile] [--headed]
 *       → captures into .tmp/ (nothing in web/ changes)
 *   node capture.mjs --sheet
 *       → .tmp/contact-sheet.html + .tmp/sheet-<slug>.jpg for review
 *   node capture.mjs --publish [--only id,...]
 *       → copies approved shots to web/public/portfolio/<slug>/ and rewrites
 *         web/src/content/media.generated.json for the published slugs
 *   node capture.mjs --video [--only id|slug,...]
 *       → .tmp/<slug>/<id>.mp4 (+ poster) from the `videos` list in targets.mjs
 *   node capture.mjs --og --base http://localhost:4123
 *       → web/public/og/{en,ar}.png from the locally served static export
 *   node capture.mjs --self-check --base http://localhost:4123
 *       → .tmp/self-check/*.png of the portfolio itself (EN/AR × device × theme)
 *
 * Credentials come only from the environment (EPATH_DEMO_USER / EPATH_DEMO_PASS,
 * ETOLV_DEMO_USER / ETOLV_DEMO_PASS, LEEN_DEMO_USER / LEEN_DEMO_PASS) and are never logged
 * or written. No storageState file, HAR or trace is ever written. Videos log in inside a
 * separate, unrecorded browser context and only record what happens after login.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import { targets, videos } from "./targets.mjs";

const run = promisify(execFile);

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const tmpDir = path.join(here, ".tmp");
const tmpManifest = path.join(tmpDir, "manifest.json");
const publicDir = path.join(repo, "web/public/portfolio");
const manifestPath = path.join(repo, "web/src/content/media.generated.json");

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

const devices = {
  desktop: {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    outWidth: 1600,
  },
  mobile: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: IPHONE_UA,
    outWidth: 780,
  },
};

// ── args ───────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const opt = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const only = opt("only")?.split(",").filter(Boolean);
const deviceFilter = opt("device");

function need(name) {
  const v = process.env[name];
  if (!v)
    throw new Error(
      `Missing env var ${name} (set it with: read -rs ${name} && export ${name})`,
    );
  return v;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

// ── page helpers ───────────────────────────────────────────────────────────
async function settle(page, ms = 1500) {
  await page.waitForLoadState("load", { timeout: 45_000 }).catch(() => {});
  await page
    .waitForLoadState("networkidle", { timeout: 12_000 })
    .catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await sleep(ms);
}

/** Prefer the privacy-friendly choice on cookie banners. */
async function dismissConsent(page) {
  const patterns = [
    /reject|decline|necessary only|only necessary|رفض/i,
    /accept|agree|got it|موافق|قبول/i,
  ];
  for (const re of patterns) {
    const btn = page.getByRole("button", { name: re }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click({ timeout: 3_000 }).catch(() => {});
      await sleep(600);
      return;
    }
  }
}

async function scrollViewports(page, n) {
  if (!n) return;
  // Step through so scroll-triggered / lazy content renders on the way down.
  const steps = Math.max(1, Math.ceil(n * 3));
  for (let i = 1; i <= steps; i++) {
    await page.evaluate(
      (y) => {
        const doc = document.scrollingElement;
        if (doc && doc.scrollHeight > window.innerHeight + 10)
          return window.scrollTo(0, y * window.innerHeight);
        // Dashboards often scroll inside a panel instead of the page: use the tallest scrollable element.
        const panel = [...document.querySelectorAll("*")]
          .filter(
            (e) =>
              e.scrollHeight > e.clientHeight + 50 &&
              /auto|scroll/.test(getComputedStyle(e).overflowY),
          )
          .sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
        panel?.scrollTo(0, y * window.innerHeight);
      },
      (n * i) / steps,
    );
    await sleep(250);
  }
  await sleep(900);
}

/** Click only the named close buttons (e.g. a "weak password" notice) — never anything else. */
async function dismiss(page, selectors = []) {
  for (const sel of selectors) {
    const el = page.locator(sel).first();
    if (await el.isVisible().catch(() => false)) {
      await el.click({ timeout: 3_000 }).catch(() => {});
      await sleep(500);
    }
  }
}

/** Steps for screenshots and videos: { wait } | { hover } | { move: [x, y] } | { click } | { dispatch } | { scroll } | { goto } */
async function runSteps(page, steps = []) {
  for (const step of steps) {
    if (step.wait) await sleep(step.wait);
    else if (step.hover)
      await page.locator(step.hover).first().hover({ timeout: 8_000 });
    else if (step.move)
      await page.mouse.move(step.move[0], step.move[1], { steps: 15 });
    // In-app link that a real click can't reach (e.g. inside a collapsed menu): fire its click handler.
    else if (step.dispatch)
      await page.locator(step.dispatch).first().dispatchEvent("click");
    else if (step.click)
      await page.locator(step.click).first().click({ timeout: 8_000 });
    else if (step.scroll != null) await scrollViewports(page, step.scroll);
    else if (step.goto) {
      await page.goto(step.goto, { waitUntil: "load", timeout: 45_000 });
      await settle(page, step.settle ?? 1200);
    }
  }
}

/**
 * Blur regions of the PNG: `{ selector, x, y, w, h }` with x/y/w/h as fractions of the element box.
 * A missing element throws, so a shot is never published unblurred.
 */
async function blurRegions(page, png, regions = [], dsf = 1) {
  if (!regions.length) return png;
  const meta = await sharp(png).metadata();
  const vw = meta.width / dsf;
  const vh = meta.height / dsf;
  const composites = [];
  for (const r of regions) {
    const bb = await page.locator(r.selector).first().boundingBox();
    if (!bb) throw new Error(`blur target not found: ${r.selector}`);
    // Region in CSS px, clipped to the viewport (the element may be partly scrolled away).
    const x0 = Math.max(0, bb.x + (r.x ?? 0) * bb.width);
    const y0 = Math.max(0, bb.y + (r.y ?? 0) * bb.height);
    const x1 = Math.min(vw, bb.x + ((r.x ?? 0) + (r.w ?? 1)) * bb.width);
    const y1 = Math.min(vh, bb.y + ((r.y ?? 0) + (r.h ?? 1)) * bb.height);
    if (x1 - x0 < 2 || y1 - y0 < 2) continue; // not on screen
    const left = Math.round(x0 * dsf);
    const top = Math.round(y0 * dsf);
    const width = Math.min(meta.width - left, Math.round((x1 - x0) * dsf));
    const height = Math.min(meta.height - top, Math.round((y1 - y0) * dsf));
    const input = await sharp(png)
      .extract({ left, top, width, height })
      .blur(10 * dsf)
      .toBuffer();
    composites.push({ input, left, top });
  }
  return composites.length
    ? sharp(png).composite(composites).png().toBuffer()
    : png;
}

// ── auth flows (env-only credentials) ──────────────────────────────────────
const auth = {
  async epath(page) {
    const base = "https://demo.skyapps.me";
    await page.goto(`${base}/auth/login`, { waitUntil: "load" });
    await settle(page, 800);
    await page.fill("#id", need("EPATH_DEMO_USER"));
    await page.fill("#password", need("EPATH_DEMO_PASS"));
    await page.click('button[type="submit"]');
    const left = page.waitForURL((u) => !u.pathname.startsWith("/auth/"), {
      timeout: 30_000,
    });
    const otp = page
      .waitForSelector("#otp", { timeout: 30_000 })
      .then(() => "otp");
    const forced = page
      .waitForSelector("#new_password", { timeout: 30_000 })
      .then(() => "forced");
    const result = await Promise.race([
      left.then(() => "ok"),
      otp,
      forced,
    ]).catch(() => "timeout");
    if (result === "forced")
      throw new Error(
        "ePath asks for a password change — aborting (never change the demo password).",
      );
    if (result === "otp") {
      if (!flag("headed"))
        throw new Error(
          "ePath asks for an OTP — rerun with --headed and type it in the window.",
        );
      console.log("  waiting up to 2 min for you to enter the OTP…");
      await page.waitForURL((u) => !u.pathname.startsWith("/auth/"), {
        timeout: 120_000,
      });
    }
    if (result === "timeout")
      throw new Error("ePath login did not complete — check the credentials.");
    await settle(page, 1200);
  },
  async etolv(page) {
    const base = "https://portal.etolv.net/newportal";
    await page.goto(`${base}/login`, { waitUntil: "load" });
    await settle(page, 800);
    await page.fill("#username", need("ETOLV_DEMO_USER"));
    await page.fill("#password", need("ETOLV_DEMO_PASS"));
    await Promise.all([
      page.waitForURL((u) => !u.pathname.endsWith("/login"), {
        timeout: 30_000,
      }),
      page.keyboard.press("Enter"),
    ]);
    await settle(page, 1500);
    if (/password|reset/i.test(new URL(page.url()).pathname)) {
      throw new Error(
        "ETOLV redirected to a password page — aborting (never change the demo password).",
      );
    }
  },
  async leen(page) {
    const base = process.env.LEEN_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/ar`, {
      signal: AbortSignal.timeout(3_000),
    }).catch(() => null);
    if (!res)
      throw new Error(`Leen is not reachable at ${base} — start it first.`);
    const sel = targetsAuthSelectors.leen;
    await page.goto(`${base}${sel.loginPath}`, { waitUntil: "load" });
    await settle(page, 800);
    await page.fill(sel.user, need("LEEN_DEMO_USER"));
    await page.fill(sel.pass, need("LEEN_DEMO_PASS"));
    await page.click(sel.submit);
    await page.waitForURL((u) => !u.pathname.includes(sel.loginPath), {
      timeout: 30_000,
    });
    await settle(page, 1200);
  },
};

/** From ~/Personal/markaz/apps/web/src/app/[locale]/(auth)/login/page.tsx (phone + password). */
const targetsAuthSelectors = {
  leen: {
    loginPath: "/ar/login",
    user: 'input[name="phone"]',
    pass: 'input[name="password"]',
    submit: 'button[type="submit"]',
  },
};

/** Apps that keep the theme in localStorage instead of following prefers-color-scheme. */
async function applyTheme(context, authKind, scheme) {
  const keys = { epath: "theme", etolv: "portal-theme-mode" };
  if (keys[authKind]) {
    await context.addInitScript(
      ([k, v]) => localStorage.setItem(k, v),
      [keys[authKind], scheme],
    );
  }
}

// ── encode ─────────────────────────────────────────────────────────────────
async function encode(png, outFile, outWidth) {
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  const img = sharp(png).resize({ width: outWidth, withoutEnlargement: true });
  const info = await img.webp({ quality: 80, effort: 6 }).toFile(outFile);
  const thumbFile = outFile.replace(/\.webp$/, "-thumb.webp");
  await sharp(png)
    .resize({ width: 320 })
    .webp({ quality: 70 })
    .toFile(thumbFile);
  return { width: info.width, height: info.height, thumbFile };
}

// ── capture ────────────────────────────────────────────────────────────────
async function capture() {
  const selected = targets.filter(
    (t) => !only || only.includes(t.id) || only.includes(t.slug),
  );
  if (!selected.length) throw new Error("No targets matched --only");
  const manifest = await readJson(tmpManifest, {});
  const browser = await chromium.launch({ headless: !flag("headed") });

  try {
    // One context per (device, scheme, auth) so logins happen once.
    const groups = new Map();
    for (const t of selected) {
      for (const device of t.devices ?? ["desktop"]) {
        if (deviceFilter && device !== deviceFilter) continue;
        for (const scheme of t.schemes ?? ["light"]) {
          const key = `${device}|${scheme}|${t.auth ?? ""}|${JSON.stringify(t.storage ?? {})}`;
          if (!groups.has(key))
            groups.set(key, { device, scheme, auth: t.auth, storage: t.storage, items: [] });
          groups.get(key).items.push(t);
        }
      }
    }

    for (const g of groups.values()) {
      const { outWidth, ...ctxOpts } = devices[g.device];
      const context = await browser.newContext({
        ...ctxOpts,
        colorScheme: g.scheme,
        reducedMotion: "reduce",
        locale: "en-US",
      });
      await applyTheme(context, g.auth, g.scheme);
      // Per-target localStorage (e.g. ePath language) — set before any page script runs.
      if (g.storage) await context.addInitScript((kv) => { for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); }, g.storage);
      const page = await context.newPage();
      try {
        if (g.auth) await auth[g.auth](page);
        for (const t of g.items) {
          const id = `${t.id}-${g.device}-${g.scheme}`;
          process.stdout.write(`• ${id} … `);
          try {
            await page.goto(t.url, { waitUntil: "load", timeout: 45_000 });
            await settle(page, t.settle);
            // Generic cookie-banner clicking only on public sites — inside an app an "Accept" button could change data.
            if (!t.auth && !t.local) await dismissConsent(page);
            await dismiss(page, t.dismiss);
            if (t.hideCss) await page.addStyleTag({ content: t.hideCss });
            await runSteps(page, t.steps);
            await scrollViewports(page, t.scrollTo ?? 0);
            const raw = await page.screenshot({
              type: "png",
              animations: "disabled",
              caret: "hide",
            });
            const png = await blurRegions(
              page,
              raw,
              t.blur,
              ctxOpts.deviceScaleFactor,
            );
            const file = path.join(tmpDir, t.slug, `${id}.webp`);
            const { width, height } = await encode(png, file, outWidth);
            const entry = {
              id,
              src: `/portfolio/${t.slug}/${id}.webp`,
              width,
              height,
              device: g.device,
              scheme: g.scheme,
              ...(t.part ? { part: t.part } : {}),
              host: hostOf(t.url),
              thumb: `/portfolio/${t.slug}/${id}-thumb.webp`,
            };
            const list = (manifest[t.slug] ??= []);
            const i = list.findIndex((m) => m.id === id);
            if (i >= 0) list[i] = entry;
            else list.push(entry);
            console.log(`${width}×${height}`);
          } catch (err) {
            console.log(`FAILED: ${err.message.split("\n")[0]}`);
          }
        }
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  // Keep targets.mjs order inside each slug.
  const order = new Map(targets.map((t, i) => [t.id, i]));
  for (const list of Object.values(manifest)) {
    list.sort(
      (a, b) =>
        (order.get(baseId(a.id)) ?? 999) - (order.get(baseId(b.id)) ?? 999) ||
        a.id.localeCompare(b.id),
    );
  }
  await fs.mkdir(tmpDir, { recursive: true });
  await fs.writeFile(tmpManifest, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `\nSaved to ${path.relative(repo, tmpDir)}/ — review with --sheet, then --publish.`,
  );
}

const baseId = (id) => id.replace(/-(desktop|mobile)-(light|dark)$/, "");

/** Address shown in the gallery's browser bar; local builds get a neutral label. */
const hostOf = (url) => {
  const { hostname } = new URL(url);
  return /^(localhost|127\.0\.0\.1)$/.test(hostname) ? "local build" : hostname;
};

// ── videos ─────────────────────────────────────────────────────────────────
async function recordVideos() {
  const selected = videos.filter(
    (v) => !only || only.includes(v.id) || only.includes(v.slug),
  );
  if (!selected.length) throw new Error("No videos matched --only");
  const manifest = await readJson(tmpManifest, {});
  const rawDir = path.join(tmpDir, "raw-video");
  await fs.mkdir(rawDir, { recursive: true });
  const browser = await chromium.launch({ headless: !flag("headed") });
  try {
    for (const v of selected) {
      try {
        await recordOne(browser, v, manifest, rawDir);
      } catch (err) {
        console.log(`FAILED: ${err.message.split("\n")[0]}`);
      }
    }
  } finally {
    await browser.close();
  }
  await fs.writeFile(tmpManifest, JSON.stringify(manifest, null, 2) + "\n");
}

async function recordOne(browser, v, manifest, rawDir) {
  const scheme = v.scheme ?? "light";
  process.stdout.write(`• ${v.id} … `);
  // Log in without recording, then hand the session to the recorded context in memory.
  let storageState;
  if (v.auth) {
    const loginCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    await auth[v.auth](await loginCtx.newPage());
    storageState = await loginCtx.storageState();
    await loginCtx.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: scheme,
    storageState,
    recordVideo: { dir: rawDir, size: { width: 1440, height: 900 } },
  });
  await applyTheme(context, v.auth, scheme);
  if (v.storage) await context.addInitScript((kv) => { for (const [k, val] of Object.entries(kv)) localStorage.setItem(k, val); }, v.storage);
  const started = Date.now();
  const page = await context.newPage();
  let posterPng;
  let trimStart = 0;
  try {
    await page.goto(v.url, { waitUntil: "load", timeout: 45_000 });
    await settle(page, v.settle ?? 1500);
    await dismiss(page, v.dismiss);
    if (v.hideCss) await page.addStyleTag({ content: v.hideCss });
    posterPng = await blurRegions(
      page,
      await page.screenshot({ type: "png" }),
      v.blur,
    );
    trimStart = Math.max(0, (Date.now() - started) / 1000 - 0.4);
    await runSteps(page, v.steps);
    await sleep(800);
  } finally {
    await context.close();
  }
  const webm = await page.video().path();
  const dir = path.join(tmpDir, v.slug);
  await fs.mkdir(dir, { recursive: true });
  const id = `${v.id}-desktop-${scheme}`;
  const mp4 = path.join(dir, `${id}.mp4`);
  await run(ffmpegPath, [
    "-y",
    "-ss",
    trimStart.toFixed(2),
    "-i",
    webm,
    "-vf",
    "scale=1280:-2,fps=30",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "27",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    mp4,
  ]);
  await fs.rm(webm, { force: true });
  // Frame strip for review (one frame per second)
  await run(ffmpegPath, [
    "-y",
    "-i",
    mp4,
    "-vf",
    "fps=1,scale=480:-2,tile=4x4",
    "-frames:v",
    "1",
    path.join(tmpDir, `frames-${id}.jpg`),
  ]);
  const poster = path.join(dir, `${id}.webp`);
  const info = await sharp(posterPng)
    .resize({ width: 1280 })
    .webp({ quality: 78 })
    .toFile(poster);
  await sharp(posterPng)
    .resize({ width: 320 })
    .webp({ quality: 70 })
    .toFile(poster.replace(/\.webp$/, "-thumb.webp"));
  const size = (await fs.stat(mp4)).size;
  const entry = {
    id,
    type: "video",
    src: `/portfolio/${v.slug}/${id}.mp4`,
    poster: `/portfolio/${v.slug}/${id}.webp`,
    width: info.width,
    height: info.height,
    device: "desktop",
    scheme,
    ...(v.part ? { part: v.part } : {}),
    host: hostOf(v.url),
    thumb: `/portfolio/${v.slug}/${id}-thumb.webp`,
  };
  const list = (manifest[v.slug] ??= []);
  const i = list.findIndex((m) => m.id === id);
  if (i >= 0) list[i] = entry;
  else list.unshift(entry);
  console.log(`${(size / 1024 / 1024).toFixed(1)} MB`);
}

// ── review ─────────────────────────────────────────────────────────────────
async function sheet() {
  const manifest = await readJson(tmpManifest, {});
  const rows = [];
  for (const [slug, list] of Object.entries(manifest)) {
    rows.push(`<h2>${slug}</h2><div class="grid">`);
    for (const m of list) {
      const media =
        m.type === "video"
          ? `<video src="${slug}/${m.id}.mp4" poster="${slug}/${m.id}.webp" controls muted playsinline></video>`
          : `<img src="${slug}/${m.id}.webp" loading="lazy">`;
      rows.push(
        `<figure>${media}<figcaption>${m.id}${m.part ? ` · ${m.part}` : ""} · ${m.width}×${m.height}</figcaption></figure>`,
      );
    }
    rows.push("</div>");

    // JPEG mosaic per slug (for quick review in tools that can't show WebP)
    const tiles = await Promise.all(
      list.map(async (m) =>
        sharp(path.join(tmpDir, slug, `${m.id}.webp`))
          .resize({
            width: 480,
            height: 300,
            fit: "contain",
            background: "#111",
          })
          .jpeg({ quality: 70 })
          .toBuffer(),
      ),
    );
    const cols = 3;
    const w = 480;
    const h = 300;
    const rowsN = Math.ceil(tiles.length / cols) || 1;
    await sharp({
      create: {
        width: cols * w,
        height: rowsN * h,
        channels: 3,
        background: "#111",
      },
    })
      .composite(
        tiles.map((input, i) => ({
          input,
          left: (i % cols) * w,
          top: Math.floor(i / cols) * h,
        })),
      )
      .jpeg({ quality: 75 })
      .toFile(path.join(tmpDir, `sheet-${slug}.jpg`));
  }
  const html = `<!doctype html><meta charset="utf-8"><title>Screenshot contact sheet</title>
<style>body{font:14px system-ui;background:#0b0d12;color:#eef0f4;margin:24px}h2{margin:32px 0 12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px}
figure{margin:0;background:#151922;border-radius:12px;overflow:hidden}img,video{width:100%;display:block;max-height:420px;object-fit:contain;background:#000}
figcaption{padding:8px 12px;color:#9aa3b2;font-size:12px}</style>${rows.join("\n")}`;
  const out = path.join(tmpDir, "contact-sheet.html");
  await fs.writeFile(out, html);
  console.log(out);
}

async function publish() {
  const tmp = await readJson(tmpManifest, {});
  const live = await readJson(manifestPath, {});
  for (const [slug, list] of Object.entries(tmp)) {
    const approved = list.filter(
      (m) =>
        !only ||
        only.includes(m.id) ||
        only.includes(baseId(m.id)) ||
        only.includes(slug),
    );
    if (!approved.length) continue;
    const dest = path.join(publicDir, slug);
    await fs.mkdir(dest, { recursive: true });
    for (const m of approved) {
      const files = [
        `${m.id}.webp`,
        `${m.id}-thumb.webp`,
        ...(m.type === "video" ? [`${m.id}.mp4`] : []),
      ];
      for (const f of files)
        await fs.copyFile(path.join(tmpDir, slug, f), path.join(dest, f));
    }
    // Stills first, videos last: the first desktop still is the cover, and a video's poster repeats a still.
    approved.sort((a, b) => Number(a.type === "video") - Number(b.type === "video"));
    live[slug] = approved;
    console.log(`${slug}: ${approved.length} shots`);
  }
  await fs.writeFile(manifestPath, JSON.stringify(live, null, 2) + "\n");
}

// ── portfolio itself ───────────────────────────────────────────────────────
async function og() {
  const base = opt("base") ?? "http://localhost:4123";
  const browser = await chromium.launch();
  try {
    for (const lang of ["en", "ar"]) {
      const context = await browser.newContext({
        viewport: { width: 1200, height: 630 },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      await context.addInitScript(() => localStorage.setItem("theme", "dark"));
      const page = await context.newPage();
      await page.goto(`${base}/${lang}/`, { waitUntil: "load" });
      await settle(page, 1500);
      const out = path.join(repo, "web/public/og", `${lang}.png`);
      await fs.mkdir(path.dirname(out), { recursive: true });
      const png = await page.screenshot({
        type: "png",
        animations: "disabled",
        caret: "hide",
      });
      await sharp(png)
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toFile(out);
      console.log(out);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

async function selfCheck() {
  const base = opt("base") ?? "http://localhost:4123";
  const paths = (
    opt("paths") ?? "/en/,/ar/,/en/work/comply360/,/ar/work/comply360/"
  ).split(",");
  const outDir = path.join(tmpDir, "self-check");
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const device of ["desktop", "mobile"]) {
      for (const scheme of ["dark", "light"]) {
        const { outWidth, ...ctxOpts } = devices[device];
        const context = await browser.newContext({
          ...ctxOpts,
          deviceScaleFactor: 1,
          reducedMotion: "reduce",
        });
        await context.addInitScript(
          (s) => localStorage.setItem("theme", s),
          scheme,
        );
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(e.message));
        page.on(
          "console",
          (m) => m.type() === "error" && errors.push(m.text()),
        );
        for (const p of paths) {
          await page.goto(`${base}${p}`, { waitUntil: "load" });
          await settle(page, 800);
          await scrollViewports(page, 30); // reveal whileInView sections
          await page.evaluate(() => window.scrollTo(0, 0));
          await sleep(500);
          const name = `${p.replace(/\//g, "_").replace(/^_|_$/g, "") || "root"}-${device}-${scheme}.png`;
          await page.screenshot({
            path: path.join(outDir, name),
            fullPage: true,
            animations: "disabled",
            caret: "hide",
          });
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
          );
          console.log(
            `${name}${overflow > 1 ? `  ⚠ horizontal overflow ${overflow}px` : ""}`,
          );
        }
        if (errors.length)
          console.log(
            `  console/page errors (${device}/${scheme}):\n   - ${[...new Set(errors)].join("\n   - ")}`,
          );
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
  console.log(outDir);
}

const mode = flag("sheet")
  ? sheet
  : flag("publish")
    ? publish
    : flag("video")
      ? recordVideos
      : flag("og")
        ? og
        : flag("self-check")
          ? selfCheck
          : capture;
mode().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
