import { defineConfig } from 'vite';
import { SITE_URL } from './src/site.js';

export default defineConfig({
  plugins: [
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    },
  ],
});
