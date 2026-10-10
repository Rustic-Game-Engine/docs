# Development and build

[Back to Development & deployment](/docs/open-source/docs/development).

Run from the repository root with Node.js 24:

```sh
npm ci
npm run dev
```

For a production build, run `npm run build`. The deployable site is in `out/`.
It includes the documentation, generated API pages, client-side search, and a
404 page. Both `/` and `/docs` show the welcome page. The open-source directory is at `/docs/open-source`, with detailed guides
for engine source (`/docs/open-source/engine`), docs (`/docs/open-source/docs`), examples (`/docs/open-source/examples`),
and hosting SDK (`/docs/open-source/hosting-sdk`) repositories.
Engine usage guides remain in `/docs/engine`. Legacy repository URLs remain available.
The API overview is at `/docs/api/overview`. Website guides live in `content/`
and are registered alongside engine guides in `lib/docs-catalog.ts`.
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
