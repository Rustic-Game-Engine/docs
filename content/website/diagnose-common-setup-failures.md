# Diagnose common setup failures

[Back to Docs repository](/docs/open-source/docs).

- `npm ci` fails: confirm Node.js 24 and a consistent `package.json`/`package-lock.json`; use npm when intentionally changing dependencies.
- TypeScript cannot find generated route types: run `npm run build` before the standalone type check.
- A new guide does not appear: add it to `lib/docs-catalog.ts`; creating a Markdown file alone does not register a page.
- A build cannot read a guide: check the catalog's source path relative to this repository root.
- Font download fails: confirm the build environment can reach the configured Google font services.
- Cloudflare's credential check fails: configure the repository secret; the last successful production deployment stays live.

When an engine API changes, update the published guide here alongside the matching `Engine/docs` content in the [engine repository](https://github.com/Rustic-Game-Engine/engine). Return to the [repository directory](/docs/open-source) for the other public projects.
