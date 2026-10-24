import { expect, test } from '@playwright/test';

const TOTAL = 10;

test('recorre las 10 diapositivas sin errores ni imágenes rotas', async ({ page }, info) => {
  const problems = [];
  page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => {
    // Chromium de Playwright no trae códecs H.264: aborta la carga del mp4 (en Chrome real carga bien)
    if (r.url().endsWith('.mp4') && r.failure()?.errorText.includes('ERR_ABORTED')) return;
    problems.push(`requestfailed: ${r.url()}`);
  });
  page.on('response', (r) => r.status() >= 400 && problems.push(`${r.status()}: ${r.url()}`));

  await page.goto('/');
  await expect(page.locator('.slide')).toHaveCount(TOTAL);

  for (let i = 1; i <= TOTAL; i++) {
    await expect(page.locator('#count')).toHaveText(`${String(i).padStart(2, '0')} / ${TOTAL}`);
    await expect(page.locator('.slide.active')).toHaveCount(1);
    // las imágenes de la diapositiva visible (las ocultas con display:none no se cargan)
    const imgs = page.locator('.slide.active img:visible');
    for (const img of await imgs.all()) {
      await expect
        .poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0), {
          message: `imagen rota en la diapositiva ${i}`,
        })
        .toBe(true);
    }
    await page.waitForTimeout(700); // deja terminar la transición antes de capturar
    await page.screenshot({
      path: `test-results/${info.project.name}-${String(i).padStart(2, '0')}.png`,
    });
    if (i < TOTAL) await page.keyboard.press('ArrowRight');
  }

  expect(problems).toEqual([]);
});

test('el deep-link por hash abre la diapositiva indicada', async ({ page }) => {
  await page.goto('/#3');
  await expect(page.locator('#count')).toHaveText(`03 / ${TOTAL}`);
});
