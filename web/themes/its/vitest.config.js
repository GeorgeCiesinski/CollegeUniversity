/**
 * @file
 * Vitest config for ITS theme Drupal.behaviors (jsdom, not the live site).
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/js/test/setup.js'],
    include: ['src/js/**/*.test.js'],
  },
});
