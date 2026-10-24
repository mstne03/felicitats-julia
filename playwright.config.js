import { defineConfig } from '@playwright/test';

const viewports = {
  escritorio: { width: 1440, height: 900 },
  movil: { width: 390, height: 844 },
};

export default defineConfig({
  testDir: 'tests',
  outputDir: 'test-results/.artifacts',
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: 'http://localhost:4173' },
  projects: Object.entries(viewports).map(([name, viewport]) => ({ name, use: { viewport } })),
});
