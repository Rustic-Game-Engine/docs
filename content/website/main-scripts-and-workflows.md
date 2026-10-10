# Main scripts and workflows

[Back to Docs repository](/docs/open-source/docs).

Run npm commands at the docs repository root:

| Command or file | Purpose | Expected result |
| --- | --- | --- |
| `npm ci` | Installs the exact locked dependency tree | Creates local `node_modules/` |
| `npm run dev` | Starts Next.js development mode | Local preview with refresh on edits |
| `npm run build` | Compiles, type-checks, and exports all catalog pages | Deployable static site in `out/` |
| `npm run lint -- --max-warnings=0` | Runs ESLint, React, hooks, TypeScript, and accessibility rules | Fails on errors or warnings |
| `npx tsc --noEmit` | Checks TypeScript after route types have been generated | No emitted application files |
| `npm audit --audit-level=moderate` | Checks dependencies for known vulnerabilities | Reports moderate or higher findings |
| `npm run start` | Calls `next start` | Not suitable for this site's static export; preview `out/` instead |
| [quality.yml](https://github.com/Rustic-Game-Engine/docs/blob/main/.github/workflows/quality.yml) | Installs with Node.js 24, then runs lint, build, types, and audit | Pull-request and main-branch validation |
| [deploy-website.yml](https://github.com/Rustic-Game-Engine/docs/blob/main/.github/workflows/deploy-website.yml) | Builds and uploads `out/` to Cloudflare Pages on `main` | Production deployment when credentials are configured |

Before opening a pull request:

```sh
npm run lint -- --max-warnings=0
npm run build
npx tsc --noEmit
npm audit --audit-level=moderate
```
