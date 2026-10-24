// Renderiza og/og.html a public/og.png (1200×630) con Playwright.
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL('og/og.html').href);
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode()));
});
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('public/og.png generado');
