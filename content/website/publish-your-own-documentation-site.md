# Publish your own documentation site

[Back to Docs repository](/docs/open-source/docs).

Build with `npm run build`, then deploy `out/` to your own static host. For Cloudflare Pages, use a separate project for your fork and replace the upstream project/account settings in the workflow. Configure `CLOUDFLARE_API_TOKEN` in your own repository's Actions secrets with Pages Edit access to that account. Do not commit a token or reuse the upstream production target.

Preview the static build with `npx wrangler pages dev out`. Check `/`, `/docs/open-source`, a deep article link, search, and a missing-page response. Read [Development & deployment](/docs/open-source/docs/development) for the existing project's workflow and configuration.
