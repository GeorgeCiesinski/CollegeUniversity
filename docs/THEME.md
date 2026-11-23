# Theme

The custom theme lives at `web/themes/its` (Stable 9 subtheme). For Vite build and HMR, see [LOCAL-DEVELOPMENT.md](LOCAL-DEVELOPMENT.md).

## Layout

```
web/themes/its/
  src/scss/global.scss     sitewide styles (Vite entry)
  src/scss/pages/          page-only styles
  src/scss/components/     partials and component libraries
  src/js/global.js         sitewide behaviors entry
  src/js/behaviors/        shared Drupal.behaviors
  src/js/pages/            page-only behaviors
  dist/                    production build (committed)
  overrides/               slick and fieldgroup replacements
```

## Breakpoints

Defined in `its.breakpoints.yml` and `src/scss/abstracts/_breakpoints.scss` (also used by Responsive Image):

| Key | Label | Query |
| --- | --- | --- |
| `sm` | Small (mobile) | default / no media query |
| `md` | Medium (tablet) | `min-width: 48rem` (768px) |
| `lg` | Large (desktop+) | `min-width: 64rem` (1024px) |

This theme uses mobile-first styles, so the base ruleset is for mobile, and `@include breakpoint(md)` / `@include breakpoint(lg)` is used for larger viewports.
