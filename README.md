# Rustic Engine documentation website

The site builds to static HTML for Cloudflare Pages. Documentation is read from
this repository’s `docs/` folder during the build;
generated API content is in `lib/api-docs.ts` and navigation in `lib/docs-catalog.ts`.
No engine checkout or sibling directory is required.

Markdown was imported from `Engine/docs` at engine commit `3db0126b`.
Engine-local documentation remains in the engine repository; changes affecting
published guides and API references must also be made here.

## Development and build

Run from the repository root with Node.js 24:

```sh
npm ci
npm run dev
```

For a production build, run `npm run build`. The deployable site is in `out/`.
It includes the documentation, generated API pages, client-side search, and a
404 page. Cloudflare reads `out/_redirects` to redirect `/` to `/docs`.
Preview the exported site with `npx wrangler pages dev out`; `next start` does
not support static exports.

Before opening a pull request, run:

```sh
npm run lint -- --max-warnings=0
npm run build
npx tsc --noEmit
npm audit --audit-level=moderate
```

The `Documentation site quality` workflow runs these checks on pull requests,
pushes to `main`, and merge queues.

## Cloudflare Pages deployment

The production site is [rustic-game-engine.pages.dev/docs](https://rustic-game-engine.pages.dev/docs).
It is deployed to the `rustic-game-engine` Pages project in the **Rustic Engine**
account (`1f022710f213ec82b159f83255603917`) using Direct Upload.
The repository-root workflow `.github/workflows/deploy-website.yml` rebuilds and
publishes the site on every push to `main`, including merges. It checks out this
repository, installs locked dependencies with Node.js 24,
builds `out/`, and uploads it to the existing Pages project. Other branches
do not publish to production. Runs are serialized so deployments do not overlap.

Before merging the migration, set this repository's Actions secret
`CLOUDFLARE_API_TOKEN` to a Cloudflare token
with **Account → Cloudflare Pages → Edit** access limited to the Rustic Engine
account. The account ID is configured in the workflow. Never commit the token.
Create it in [Cloudflare account API tokens](https://dash.cloudflare.com/1f022710f213ec82b159f83255603917/api-tokens)
and save it in [GitHub Actions secrets](https://github.com/Rustic-Game-Engine/docs/settings/secrets/actions).
Repository secrets do not transfer with files. If the secret is missing, the
workflow fails with setup instructions before
building. Failed builds do not publish; the last successful deployment stays live.

View runs or manually rebuild `main` from [the website deployment workflow](https://github.com/Rustic-Game-Engine/docs/actions/workflows/deploy-website.yml).

Merge the docs migration and verify a successful deployment before merging the
companion engine cleanup, which removes its deployment workflow. Once both
changes merge, only this repository publishes the site.

For a separate project with automatic Git deployments, connect the
`Rustic-Game-Engine/docs` GitHub repository to a Pages project and configure:

| Setting | Value |
| --- | --- |
| Root directory | Repository root |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Build environment variable | `NODE_VERSION=24` |

Select the repository's production branch. If using build watch paths, include
both site code and `docs/*` so documentation changes trigger a rebuild.

For a direct upload after a local build, authenticate Wrangler and explicitly
select the verified Rustic Engine account ID:

```sh
npx wrangler login
npx wrangler whoami
CLOUDFLARE_ACCOUNT_ID=1f022710f213ec82b159f83255603917 npx wrangler pages deploy out --project-name=rustic-game-engine --branch=main
```

Verify the project's `pages.dev` URL, documentation deep links, search, and
unknown-page responses before attaching the production domain in Pages
**Custom domains**. Complete any DNS changes shown there after the domain is
added. Preserve unrelated DNS records, including email records. Keep the previous
deployment available until the custom domain works over HTTPS.

See [Cloudflare's static Next.js deployment guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).
