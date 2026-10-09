# Welcome to the documentation website

This is the home of Rustic Engine's guides and API reference. The Next.js website lives at the root of the [docs repository](https://github.com/Rustic-Game-Engine/docs), separate from the Rust [engine repository](https://github.com/Rustic-Game-Engine/engine).

## Run the website

Use Node.js 24 and run these commands from the docs repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js. The welcome page is available at `/` and `/docs`; the engine documentation starts at `/docs/engine`.

## Find your way around

- [Writing documentation](/docs/website/documentation) covers source files, the page catalog, and API generation.
- [Development & deployment](/docs/website/development) covers the static build, Cloudflare Pages, and repository deployment workflow.
- [Engine overview](/docs/engine) leads to gameplay guides, scripting languages, and the API reference.

## Separate projects

Run Rust commands inside `Engine/` in the engine repository. Run Node.js commands at the root of the docs repository. Keep the two projects separate; the docs site builds on its own without an engine checkout.

Published engine guides live in `docs/`, generated API content in `lib/api-docs.ts`, website contributor guides in `content/`, and navigation in `lib/docs-catalog.ts`. Read the docs repository's `AGENTS.md` before changing this project. When engine behavior changes, update the affected published docs here and the corresponding `Engine/docs` content in the engine repository.
