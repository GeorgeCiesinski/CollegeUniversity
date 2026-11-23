# Pantheon hosting

This project is hosted on a Pantheon sandbox at the below URLs.

| Environment | URL |
| --- | --- |
| Dev | https://dev-collegeuniversity.pantheonsite.io/ |
| Test | https://test-collegeuniversity.pantheonsite.io/ |
| Live | https://live-collegeuniversity.pantheonsite.io/ |

## CI / branch flow

This project uses CI/CD to ensure code quality and automate deployments to Pantheon's **Dev**, **Test**, and **Live** environments.

- PRs into `develop` run [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (format, lint, test, then theme build).
- PRs into `main` must come from `develop` ([`.github/workflows/main-source-gate.yml`](../.github/workflows/main-source-gate.yml)).
- PRs into `develop` or `main` run [`.github/workflows/deploy-pantheon.yml`](../.github/workflows/deploy-pantheon.yml) with the below behaviour (depending on destination branch):

| GitHub branch | Pantheon                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `develop`     | Push → Pantheon **Dev** Promote **Dev** → **Test** (staging — QA here before promoting to prod) |
| `main`        | Push → Pantheon **Dev** Promote **Dev** → **Test** Promote **Test** → **Live** (production)     |

**Note:** GitHub must have repository secrets `PANTHEON_MACHINE_TOKEN` (PAT) and `PANTHEON_SSH_KEY`, plus variable `PANTHEON_SITE` specifying the machine-name on Pantheon. Pantheon PATs expire after 90 days so this secret must be rotated every three months for automated deployment to work.

## One-time content import

After the first successful code deploy to Dev (Integrated Composer build must be green), import local DB and files once.

The easiest method for a one-time local dump is to use the Pantheon Dashboard to upload your database and files backups:

```bash
ddev start
ddev export-db --file=/tmp/its.sql.gz
# Archive contents of files/ (not a nested files/ folder). COPYFILE_DISABLE skips macOS ._ junk.
COPYFILE_DISABLE=1 tar -C web/sites/default/files -czf /tmp/its-files.tar.gz .
```

Once the backups have been generated, you can go to the Pantheon portal for your site and upload the database and files manually. In my experience, this works better than Terminus commands. Finally, you can clone the files & database to the Pantheon **test** and **live** environment. 
