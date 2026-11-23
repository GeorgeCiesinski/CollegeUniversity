# Local development

Day-to-day setup for the custom theme (`web/themes/its`), a Stable 9 subtheme. CSS and JavaScript are built with [Vite](https://vitejs.dev). Run these from the project root with [DDEV](https://ddev.com/) running.

For first-time site start, see the [README quick start](../README.md#quick-start). Theme layout and breakpoints are in [THEME.md](THEME.md).

## Theme build

After SCSS/JS changes, run `build` if you are not using `dev`.

- `ddev npm --prefix web/themes/its ci` — install theme Node dependencies
- `ddev npm run build` — production build to `web/themes/its/dist/` (and slick overrides)
- `ddev npm run dev` — Vite HMR server (port 5173)

### Quality scripts

- `ddev npm run test` — run theme JS unit tests with [Vitest](https://vitest.dev/)
- `ddev npm run format` / `format:fix` — Prettier check / write (theme JS and SCSS)
- `ddev npm run lint` / `lint:fix` — ESLint check / fix (theme JS)
- `ddev npm run check` / `check:fix` — format + lint (check or fix)
- `ddev npm run validate` — `check` then `test` (same gate as Pantheon deploy)

## Vite HMR

1. With DDEV running: `ddev npm run dev` (leave it running)
2. Once: `ddev drush cr` so Drupal switches from `dist/` to the Vite server
3. Open https://its-website.ddev.site and hard-refresh if needed.

Confirm HMR in DevTools: asset URLs should point at `https://its-website.ddev.site:5173/…`, not `dist/assets/…`.

Run `ddev drush cr` again after stopping or restarting Vite.

`web/sites/default/settings.local.php` should include:

```php
$settings['vite'] = [
  'devServerUrl' => ($_ENV['DDEV_PRIMARY_URL'] ?? 'https://its-website.ddev.site') . ':5173',
];
```

Keep CSS/JS aggregation off locally so HMR stays easy to debug. When Vite is not running, Drupal uses `dist/.vite/manifest.json`. Twig, PHP, and CMS content still use Drupal’s usual cache workflow.
