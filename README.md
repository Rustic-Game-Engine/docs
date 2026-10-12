# Rustic Engine documentation website

The site builds to static HTML for Cloudflare Pages. Documentation is read from
this repository’s `docs/` folder during the build;
generated API content is in `lib/api-docs.ts` and navigation in `lib/docs-catalog.ts`.
No engine checkout or sibling directory is required.

Markdown was imported from `Engine/docs` at engine commit `3db0126b`.
This audit checked behavior against engine commit `017db99b7025eeda96acf21967664153a2df0795`.
See [maintenance](/docs/open-source/docs/maintenance) for route/link checks and source synchronization.

Engine-local documentation remains in the engine repository; changes affecting
published guides and API references must also be made here.

## Topics

- [Development and build](/docs/open-source/docs/development/development-and-build)
- [Cloudflare Pages deployment](/docs/open-source/docs/development/cloudflare-pages-deployment)

## API examples

Core scripting examples and lifecycle registration live in `lib/api-docs.ts`.
Gameplay function examples live in `lib/api-example-data.json`; `lib/api-examples.ts`
adds them to the published module pages and search index through `lib/docs.ts`.
Each entry has an example for all ten script types. Where a language lacks a
getter or needs explicit storage cleanup, document that difference instead of
inventing a call. Check signatures against the engine SDKs when editing examples.

Run `npm run check:api-examples` to verify language coverage, published calls,
reachable pages, and lifecycle examples. CI runs this check before building.
