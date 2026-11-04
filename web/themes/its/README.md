# ITS Theme

Drupal 10 front-end theme for this site. Stable 9 subtheme. CSS and JavaScript are built with [Vite](https://vitejs.dev). Drupal still renders the pages; Vite only compiles assets.

Browse the site at **https://its-website.ddev.site**. Do not open `localhost:5173`.

## Commands

From the project root, with DDEV running:

```bash
ddev npm --prefix web/themes/its ci
ddev npm --prefix web/themes/its run build
ddev npm --prefix web/themes/its run dev
ddev npm --prefix web/themes/its test
```

Or from the project root `package.json` proxies:

```bash
ddev npm run build
ddev npm run dev
ddev npm run test
```

| Command | What it does |
| --- | --- |
| `build` | Writes production files to `dist/` and slick overrides |
| `dev` | Starts the Vite HMR server (port 5173) |
| `test` | Runs theme JS unit tests in jsdom (not the live Drupal page) |

`dist/` is committed so the site works without Node. After SCSS/JS changes, run `build` if you are not using `dev`.

## Local HMR

1. `ddev start`
2. `ddev npm run dev`
3. Keep https://its-website.ddev.site open

`web/sites/default/settings.local.php` should include:

```php
$settings['vite'] = [
  'devServerUrl' => ($_ENV['DDEV_PRIMARY_URL'] ?? 'https://its-website.ddev.site') . ':5173',
];
```

If the Vite process is not running, Drupal uses `dist/.vite/manifest.json`.

Keep CSS/JS aggregation off locally (`css.preprocess` / `js.preprocess` false in `settings.local.php`) so HMR and unhashed source maps stay easy to debug.

Twig, PHP, and CMS content still need Drupal's usual cache/Twig debug workflow. Vite only hot-reloads CSS and theme JS.

## Layout

```
src/scss/global.scss     sitewide styles (Vite entry)
src/scss/pages/          page-only styles
src/scss/components/     partials and component libraries
src/js/global.js         sitewide behaviors
src/js/pages/            page-only behaviors
dist/                    production build
overrides/               slick and fieldgroup replacements
```

Page CSS/JS is attached in `its.theme` from node type or path (beautiful pages, contact, careers, startup, tabbed AI, service status, software licensing, what's new, individual reflection).

## Breakpoints

Six breakpoints (`xs`–`xxl`) in `its.breakpoints.yml` and `src/scss/abstracts/_breakpoints.scss`. Used by Responsive Image and Sass mixins.
