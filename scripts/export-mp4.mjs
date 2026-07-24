#!/usr/bin/env node
/**
 * Export the Perry intro animation to MP4 (with soundtrack).
 * Usage: npm run export:mp4 [-- --fps 24] [-- --out perry-intro.mp4] [-- --url http://127.0.0.1:8765/]
 *
 * Requires the local preview server to be running (python3 -m http.server 8765).
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FRAMES_DIR = join(ROOT, '.export-frames');
const DEFAULT_OUT = join(ROOT, 'perry-intro.mp4');
const DEFAULT_AUDIO = join(ROOT, 'assets', 'a-little-higher.mp3');
const DEFAULT_URL = 'http://127.0.0.1:8765/';

function parseArgs(argv) {
  const opts = {
    fps: 24,
    out: DEFAULT_OUT,
    url: DEFAULT_URL,
    audio: DEFAULT_AUDIO,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--fps') opts.fps = Number(argv[++i]) || 24;
    else if (argv[i] === '--out') opts.out = resolve(argv[++i]);
    else if (argv[i] === '--url') opts.url = argv[++i];
    else if (argv[i] === '--audio') opts.audio = resolve(argv[++i]);
  }
  return opts;
}

function runFfmpeg(args) {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(ffmpegInstaller.path, args, { stdio: 'inherit' });
    proc.on('error', reject);
    proc.on('close', (code) => (code === 0 ? resolvePromise() : reject(new Error(`ffmpeg exited ${code}`))));
  });
}

async function waitForFonts(page) {
  await page.waitForFunction(() => {
    const svg = document.querySelector('svg[data-om-exportable-video-with-duration-secs]');
    return svg?.getAttribute('data-om-fonts-inlined') === 'true';
  }, { timeout: 90000 });
}

async function prepareExportSurface(page) {
  await page.evaluate(() => {
    document.querySelectorAll('[data-omelette-chrome]').forEach((el) => {
      el.style.display = 'none';
    });
    const svg = document.querySelector('svg[data-om-exportable-video-with-duration-secs]');
    if (svg) {
      svg.style.transform = 'none';
      svg.style.boxShadow = 'none';
    }
  });
}

async function seekTo(page, time) {
  await page.evaluate((t) => {
    const svg = document.querySelector('svg[data-om-exportable-video-with-duration-secs]');
    if (!svg) throw new Error('Export canvas not found');
    const detail = { time: t, sync: true };
    svg.dispatchEvent(new CustomEvent('data-om-seek-to-time-frame', { detail }));
  }, time);
  // One paint settle even with sync seek — screenshots can race layout.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  const probe = await fetch(opts.url).catch(() => null);
  if (!probe?.ok) {
    throw new Error(`Preview server not reachable at ${opts.url}. Start with: python3 -m http.server 8765`);
  }

  let browser;
  try {
    if (existsSync(FRAMES_DIR)) await rm(FRAMES_DIR, { recursive: true, force: true });
    await mkdir(FRAMES_DIR, { recursive: true });

    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 1,
    });

    console.log(`Loading ${opts.url}`);
    await page.goto(opts.url, { waitUntil: 'networkidle', timeout: 120000 });
    await page.click('body').catch(() => {});
    await waitForFonts(page);
    await prepareExportSurface(page);

    const duration = await page.evaluate(() => {
      const svg = document.querySelector('svg[data-om-exportable-video-with-duration-secs]');
      return Number(svg?.getAttribute('data-om-exportable-video-with-duration-secs') || 0);
    });
    if (!duration) throw new Error('Could not read animation duration');

    const frameCount = Math.ceil(duration * opts.fps);
    const svg = page.locator('svg[data-om-exportable-video-with-duration-secs]');

    console.log(`Exporting ${duration}s @ ${opts.fps}fps → ${frameCount} frames`);

    const t0 = Date.now();
    for (let i = 0; i < frameCount; i++) {
      const time = Math.min(i / opts.fps, duration - 1e-6);
      await seekTo(page, time);
      const framePath = join(FRAMES_DIR, `frame_${String(i).padStart(6, '0')}.png`);
      await svg.screenshot({ path: framePath, type: 'png' });
      if (i % 60 === 0 || i === frameCount - 1) {
        const pct = Math.round((i / Math.max(1, frameCount - 1)) * 100);
        const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
        const eta = i > 0 ? (((Date.now() - t0) / i) * (frameCount - i) / 1000).toFixed(0) : '?';
        console.log(`  ${pct}% — frame ${i + 1}/${frameCount} (${time.toFixed(2)}s) · ${elapsed}s elapsed · ~${eta}s left`);
      }
    }

    console.log('Encoding MP4…');
    const ffmpegArgs = [
      '-y',
      '-framerate', String(opts.fps),
      '-i', join(FRAMES_DIR, 'frame_%06d.png'),
    ];
    if (existsSync(opts.audio)) {
      ffmpegArgs.push('-i', opts.audio);
    }
    ffmpegArgs.push(
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
    );
    if (existsSync(opts.audio)) {
      // Keep full animation length; soundtrack may be shorter than the piece.
      ffmpegArgs.push('-c:a', 'aac', '-b:a', '192k', '-t', String(duration));
    }
    ffmpegArgs.push(opts.out);
    await runFfmpeg(ffmpegArgs);

    console.log(`Done: ${opts.out}`);
  } finally {
    if (browser) await browser.close();
    if (existsSync(FRAMES_DIR)) await rm(FRAMES_DIR, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
