# College University ITS Website

Drupal 10 demo website inspired by the website I built when I  worked at a post-secondary institution.

# ITS Theme

Stable 9 subtheme. CSS and JavaScript are built with [Vite](https://vitejs.dev). 

Drupal still renders the pages; Vite only compiles assets.

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
| `ci` / install | Installs theme Node deps **inside DDEV** (required so native packages match Linux) |
| `build` | Writes production files to `dist/` and slick overrides |
| `dev` | Starts the Vite HMR server (port 5173) |
| `test` | Runs theme JS unit tests in jsdom (not the live Drupal page) |

`dist/` is committed so the site works without Node. After SCSS/JS changes, run `build` if you are not using `dev`. Commit the updated `dist/` assets with those source changes.

**Note:** Always install or reinstall theme packages with `ddev npm …`, not host `npm`. Host installs can miss Linux-native Rollup binaries and break `ddev npm run dev`.

## Local development

### Start DDEV

```bash
ddev start
```

Browse the site at **https://its-website.ddev.site**. Without Vite running, Drupal serves the committed `dist/` assets.

### Start Vite and enable HMR

Do not open the `localhost:5173` / `192.168…` URLs Vite prints — those are the Vite process inside the DDEV container, not the Drupal site.

1. With DDEV already running: `ddev npm run dev` (leave it running)
2. **Once:** `ddev drush cr` so Drupal switches from `dist/` CSS/JS to the Vite server
3. Open https://its-website.ddev.site and hard-refresh if needed

After that, SCSS and theme JS edits hot-reload. 

Run `ddev drush cr` again if you stop Vite, restart it later, or the page falls back to hashed files under `/themes/its/dist/assets/`. Confirm HMR in DevTools: stylesheet/script URLs should point at `https://its-website.ddev.site:5173/…`, not `dist/assets/…`.

### Local settings

`web/sites/default/settings.local.php` should include:

```php
$settings['vite'] = [
  'devServerUrl' => ($_ENV['DDEV_PRIMARY_URL'] ?? 'https://its-website.ddev.site') . ':5173',
];
```

Keep CSS/JS aggregation off locally (`css.preprocess` / `js.preprocess` false in `settings.local.php`) so HMR stays easy to debug.

If the Vite process is not running, Drupal uses `dist/.vite/manifest.json`.

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

Page CSS/JS is attached in `its.theme` from node type or path (beautiful pages, contact, careers, startup, tabbed content, service status, software licensing, what's new, custom modules).

## Breakpoints

Three mobile-first breakpoints in `its.breakpoints.yml` and `src/scss/abstracts/_breakpoints.scss` (also used by Responsive Image):

| Key | Label | Query |
| --- | --- | --- |
| `sm` | Small (mobile) | default / no media query |
| `md` | Medium (tablet) | `min-width: 48rem` (768px) |
| `lg` | Large (desktop+) | `min-width: 64rem` (1024px) |

Write mobile styles in the base ruleset. Use `@include breakpoint(md)` / `@include breakpoint(lg)` for larger viewports.
