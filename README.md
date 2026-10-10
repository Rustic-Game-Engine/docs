# Rustic Engine documentation website

The site builds to static HTML for Cloudflare Pages. Documentation is read from
this repository’s `docs/` folder during the build;
generated API content is in `lib/api-docs.ts` and navigation in `lib/docs-catalog.ts`.
No engine checkout or sibling directory is required.

Markdown was imported from `Engine/docs` at engine commit `3db0126b`.
Engine-local documentation remains in the engine repository; changes affecting
published guides and API references must also be made here.

## Topics

- [Development and build](/docs/open-source/docs/development/development-and-build)
- [Cloudflare Pages deployment](/docs/open-source/docs/development/cloudflare-pages-deployment)
