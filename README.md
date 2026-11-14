# College University ITS Website

Drupal 10 demo site inspired by work at a post-secondary institution. Local development uses [DDEV](https://ddev.com/) and [OrbStack](https://orbstack.dev/) (or another Docker provider DDEV supports).

The custom theme (`web/themes/its`) is a Stable 9 subtheme. CSS and JavaScript are built with [Vite](https://vitejs.dev). Drupal still renders the pages.

## Prerequisites

- [DDEV](https://ddev.com/get-started/)
- Docker via OrbStack (or another Docker provider DDEV supports)

## Start the site

From the project root:

```bash
ddev start
ddev composer install
ddev launch
```

The site is at https://its-website.ddev.site.

One-time admin login:

```bash
ddev drush uli
```

Stop:

```bash
ddev stop
```

See [BACKUP.md](BACKUP.md) for database and files backup steps.

## Theme (Vite)

From the project root, with DDEV running:

```bash
ddev npm --prefix web/themes/its ci
ddev npm run build
ddev npm run dev
ddev npm run test
```

| Command | What it does |
| --- | --- |
| `ci` / install | Installs theme Node deps **inside DDEV** (required so native packages match Linux) |
| `build` | Writes production files to `web/themes/its/dist/` and slick overrides |
| `dev` | Starts the Vite HMR server (port 5173) |
| `test` | Runs theme JS unit tests in jsdom |

`dist/` is committed so the site works without Node. After SCSS/JS changes, run `build` if you are not using `dev`.

Always install theme packages with `ddev npm …`, not host `npm`. Host installs can miss Linux-native Rollup binaries and break `ddev npm run dev`.

### Vite HMR

Do not open the `localhost:5173` URLs Vite prints — those are inside the DDEV container, not the Drupal site.

1. With DDEV running: `ddev npm run dev` (leave it running)
2. Once: `ddev drush cr` so Drupal switches from `dist/` to the Vite server
3. Open https://its-website.ddev.site and hard-refresh if needed

Confirm HMR in DevTools: asset URLs should point at `https://its-website.ddev.site:5173/…`, not `dist/assets/…`. Run `ddev drush cr` again after stopping or restarting Vite.

`web/sites/default/settings.local.php` should include:

```php
$settings['vite'] = [
  'devServerUrl' => ($_ENV['DDEV_PRIMARY_URL'] ?? 'https://its-website.ddev.site') . ':5173',
];
```

Keep CSS/JS aggregation off locally so HMR stays easy to debug. When Vite is not running, Drupal uses `dist/.vite/manifest.json`. Twig, PHP, and CMS content still use Drupal’s usual cache workflow.

### Theme layout

```
web/themes/its/
  src/scss/global.scss     sitewide styles (Vite entry)
  src/scss/pages/          page-only styles
  src/scss/components/     partials and component libraries
  src/js/global.js         sitewide behaviors
  src/js/pages/            page-only behaviors
  dist/                    production build (committed)
  overrides/               slick and fieldgroup replacements
```

### Breakpoints

Defined in `its.breakpoints.yml` and `src/scss/abstracts/_breakpoints.scss` (also used by Responsive Image):

| Key | Label | Query |
| --- | --- | --- |
| `sm` | Small (mobile) | default / no media query |
| `md` | Medium (tablet) | `min-width: 48rem` (768px) |
| `lg` | Large (desktop+) | `min-width: 64rem` (1024px) |

Write mobile styles in the base ruleset to keep styles mobile-first. Use `@include breakpoint(md)` / `@include breakpoint(lg)` for larger viewports.
