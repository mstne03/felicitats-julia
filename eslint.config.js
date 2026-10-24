import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist', 'node_modules', 'test-results'] },
  js.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  { files: ['scripts/**', 'tests/**', 'vite.config.js', 'eslint.config.js'], languageOptions: { globals: globals.node } },
];
