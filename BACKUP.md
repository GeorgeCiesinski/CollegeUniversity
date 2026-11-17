# Backups

This Drupal 10 site has three parts that should be saved before a risky change. 

Git tracks code. DDEV snapshots the database. Uploaded files live outside both.

| What                                    | Where it lives             | How to back it up                                         |
| --------------------------------------- | -------------------------- | --------------------------------------------------------- |
| Code, config, custom modules/theme      | This repo                  | `git commit`                                              |
| Database (content, users, config in DB) | DDEV MariaDB 10.11         | `ddev snapshot`                                           |
| Public files (images, documents)        | `web/sites/default/files/` | `tar` archive in `backups/`                               |
| `settings.php`                          | `web/sites/default/`       | Left on disk; **not in Git** as this contains credentials |

I kept `backups/` and `.ddev/db_snapshots/` in the project folder and added them to `.gitignore` so they aren't included in the repo. 

## Before a major change

Run these from the project root. DDEV must be running for database commands.

```bash
ddev start
```

### 1. Save the code with Git

```bash
git status
git add -A
git commit -m "Checkpoint before major change"
git tag -a pre-major-change -m "Working site before major change"
```

Use a unique tag name, for example `pre-major-change-2026-10-28`.

### 2. Snapshot the database with DDEV

This is the fastest rollback for content and configuration stored in the database. Snapshots are stored in `.ddev/db_snapshots/`.

```bash
ddev snapshot --name=pre-major-change-2026-10-28
ddev snapshot --list
```

Omit `--name` to let DDEV add a timestamp on its own. Named snapshots are easier to restore.

A snapshot is a binary copy of this project's MariaDB 10.11 data. It will not restore into a different database type or version.

### 3. Archive uploaded files

DDEV snapshots do **not** include `web/sites/default/files/`, so these must be zipped and backed up manually:

```bash
mkdir -p backups
tar -czf backups/files-pre-major-change.tar.gz -C web/sites/default files
cp web/sites/default/settings.php backups/settings.php-pre-major-change
```

`settings.php` is gitignored because it contains credentials. Copying it into `backups/` means a later `git clean` will not be the only copy on disk.

### Optional: portable SQL dump

Use this if you want a dump you can import into another MySQL/MariaDB, not only this DDEV project.

```bash
mkdir -p backups
ddev export-db --file=backups/backup-name.sql.gz
```

## Restore

Restore **code, database, and files together**. A new codebase against an old database (or the reverse) can break the site.

### Restore code

```bash
git switch main
git reset --hard pre-major-change
```

`settings.php` is not in Git. Do not run `git clean -fd` unless you have confirmed it will not delete `web/sites/default/settings.php` or `backups/`.

If Composer-managed packages are missing after a reset:

```bash
ddev composer install
ddev npm --prefix web/themes/its ci
```

### Restore the database from a DDEV snapshot

```bash
ddev start
ddev snapshot restore snapshot-name
```

Restore the most recent snapshot without naming it:

```bash
ddev snapshot restore --latest
```

List snapshots:

```bash
ddev snapshot --list
```

### Restore the database from a SQL dump

```bash
ddev import-db --file=backups/db-pre-major-change.sql.gz
```

### Restore uploaded files

```bash
tar -xzf backups/files-pre-major-change.tar.gz -C web/sites/default
```

### Rebuild caches

```bash
ddev drush cr
```

Then open https://its-website.ddev.site and confirm the site loads.

## Notes

- `web/sites/default/settings.php` is gitignored because it contains database credentials. DDEV overrides those on start via `settings.ddev.php` (also gitignored). Keep the working copy of `settings.php` on disk.
- `ddev delete` removes project containers and can remove snapshots unless you keep `.ddev/db_snapshots/`. Prefer `ddev snapshot restore` over deleting the project.
- After a successful restore you no longer need old snapshots. Remove them with `ddev snapshot --cleanup` only when you are sure you do not need them.
