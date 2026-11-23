# College University ITS Website

![Front page screenshot](docs/images/front-page.png)

A Drupal 10 demo inspired by ITS work at a post-secondary institution. 

**Live site:** https://live-collegeuniversity.pantheonsite.io/

## Stack

- [Drupal 10](https://new.drupal.org/)
- [Vite](https://vite.dev/)
- [DDEV](https://ddev.com/) + [OrbStack](https://orbstack.dev/) (or another Docker provider DDEV supports)
- [MariaDB](https://mariadb.com/)
- [Pantheon](https://pantheon.io/) hosting

## Highlights

- Custom Stable 9 theme with Vite HMR for local CSS/JS
- Pantheon CI/CD from GitHub (`develop` → Test, `main` → Live)
- Vitest unit tests and Prettier/ESLint gates on PRs and deploy
- Mobile-first breakpoints shared with Responsive Image module

## Quick start

**Prerequisites:** [DDEV](https://ddev.com/get-started/) and Docker via OrbStack (or another provider DDEV supports).

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

Theme build, Vite HMR, and related workflows: [Local development](docs/LOCAL-DEVELOPMENT.md).

## Docs

- [Local development](docs/LOCAL-DEVELOPMENT.md) — DDEV theme build, Vite HMR
- [Theme](docs/THEME.md) — SCSS/JS layout, breakpoints
- [Pantheon](docs/PANTHEON.md) — environments, CI/CD, content import
- [Backups](docs/BACKUP.md) — database and files backup steps
