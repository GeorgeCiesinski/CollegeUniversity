/**
 * @file
 * Vite config for the ITS Drupal theme.
 *
 * Multi-entry Sass and JS build with a production manifest. jQuery,
 * Drupal, once, and drupalSettings are externals (provided by Drupal,
 * not bundled). Dev server origin is the DDEV site URL on port 5173.
 */

import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const port = 5173;
const origin = process.env.DDEV_PRIMARY_URL
  ? `${process.env.DDEV_PRIMARY_URL}:${port}`
  : `http://localhost:${port}`;

const themeRoot = dirname;

export default defineConfig({
  plugins: [],
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        global: path.resolve(themeRoot, 'src/scss/global.scss'),
        'global-js': path.resolve(themeRoot, 'src/js/global.js'),
        'page-beautiful': path.resolve(themeRoot, 'src/scss/pages/beautiful-page.scss'),
        'page-contact': path.resolve(themeRoot, 'src/scss/pages/contact.scss'),
        'page-careers': path.resolve(themeRoot, 'src/scss/pages/careers.scss'),
        'page-careers-js': path.resolve(themeRoot, 'src/js/pages/careers.js'),
        'page-startup': path.resolve(themeRoot, 'src/scss/pages/startup.scss'),
        'page-tabbed': path.resolve(themeRoot, 'src/scss/pages/tabbed-content.scss'),
        'page-tabbed-js': path.resolve(themeRoot, 'src/js/pages/tabbed-content.js'),
        'page-service-status': path.resolve(themeRoot, 'src/scss/pages/service-status.scss'),
        'page-service-status-js': path.resolve(themeRoot, 'src/js/pages/service-status.js'),
        'page-software-licensing': path.resolve(
          themeRoot,
          'src/scss/pages/software-licensing.scss',
        ),
        'page-whats-new': path.resolve(themeRoot, 'src/scss/pages/whats-new.scss'),
        'page-custom-modules': path.resolve(themeRoot, 'src/scss/pages/custom-modules.scss'),
        dialog: path.resolve(themeRoot, 'src/scss/components/dialog.scss'),
        file: path.resolve(themeRoot, 'src/scss/components/file.scss'),
        'image-widget': path.resolve(themeRoot, 'src/scss/components/image-widget.scss'),
        indented: path.resolve(themeRoot, 'src/scss/components/indented.scss'),
        node: path.resolve(themeRoot, 'src/scss/components/node.scss'),
        progress: path.resolve(themeRoot, 'src/scss/components/progress.scss'),
        'search-results': path.resolve(themeRoot, 'src/scss/components/search-results.scss'),
        user: path.resolve(themeRoot, 'src/scss/components/user.scss'),
      },
      external: ['jquery', 'Drupal', 'once', 'drupalSettings'],
      output: {
        globals: {
          jquery: 'jQuery',
          Drupal: 'Drupal',
          once: 'once',
          drupalSettings: 'drupalSettings',
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port,
    strictPort: true,
    origin,
    cors: {
      origin: /https?:\/\/([A-Za-z0-9-.]+)?(\.ddev\.site)(?::\d+)?$/,
    },
  },
});
