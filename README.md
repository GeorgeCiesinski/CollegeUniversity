# ITS Website

Drupal 10 site for local development with [DDEV](https://ddev.com/) and [OrbStack](https://orbstack.dev/).

## Prerequisites

- [DDEV](https://ddev.com/get-started/)
- Docker via OrbStack (or another Docker provider DDEV supports)

## Start the site

From the project root:

```bash
ddev start
ddev launch
```

The site is available at https://its-website.ddev.site.

One-time login as an admin:

```bash
ddev drush uli
```

## Stop the site

```bash
ddev stop
```

Stop every DDEV project on this machine:

```bash
ddev poweroff
```
