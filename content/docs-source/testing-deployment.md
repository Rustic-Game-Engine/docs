# Docs testing and deployment

Check both the source and the exported user experience before publishing a docs change. This project is a static export: build-time success, correct article registration, and browser behavior each provide different evidence.

## Required source checks

From the repository root with Node.js 24:

```sh
npm ci
npm run lint -- --max-warnings=0
npm run build
npx tsc --noEmit
npm audit --audit-level=moderate
```

| Check | What it verifies | What it does not prove |
| --- | --- | --- |
| Lint | TypeScript/React patterns, hooks rules, and configured accessibility checks | Visual layout or actual keyboard interactions |
| Build | Compilation, Next route types, source loading, and static page generation | Every example's engine behavior |
| TypeScript | Type consistency after route types are generated | That a Markdown guide's setup instructions are correct |
| Dependency audit | Known moderate-or-higher npm advisories | General correctness or every security property |

Run the build before standalone type checking so Next's generated route helpers are available. For an API or engine guide, separately check examples against the engine implementation; the docs build does not execute Rust, Lua, or other fenced examples.

## Preview the exported site

```sh
npx wrangler pages dev out
```

Open the local address Wrangler prints. Preview the exported artifact rather than relying only on development mode. `npm run start` calls `next start`, which is unsuitable for the project's `output: "export"` configuration.

Check a representative route set: `/`, `/docs/engine`, `/docs/open-source`, the new article, an older alias such as `/docs/repositories`, search, and a nonexistent route. The missing route should produce the site's 404 behavior rather than showing an unrelated article.

## Browser checks for a content change

Confirm headings, tables, code blocks, copy controls, table-of-contents anchors, and article links. Check that the guide is listed under its intended source repository and search finds it from catalog metadata.

For navigation/layout changes, also test a narrow mobile viewport, menu open/close, theme toggle, keyboard focus, and text overflow. Inspect browser errors; a page can display prerendered HTML while an interaction fails after hydration.

## How production deployment works

The [deployment workflow](https://github.com/Rustic-Game-Engine/docs/blob/main/.github/workflows/deploy-website.yml) runs on pushes to `main` and supports manual dispatch. Its job is restricted to `main`. It checks credentials before installation, builds with Node.js 24 and locked npm dependencies, then uploads `out/` through pinned Wrangler tooling to the configured Cloudflare Pages project.

The workflow requires a `CLOUDFLARE_API_TOKEN` repository Actions secret with Pages Edit access to the selected account. Secrets do not automatically transfer to a new repository or fork. A failed credential check prevents publication and leaves the last successful deployment live.

The quality workflow is separate and runs lint/build/types/audit for pull requests, `main`, and merge queues. A green quality run does not establish that deployment credentials are configured.

## Publish your own fork

Choose a separate Pages project, update the workflow account and project target, and set a scoped token in your own Actions secrets. If using direct upload, authenticate Wrangler and verify the account before running a command for your project:

```sh
npx wrangler whoami
npx wrangler pages deploy out --project-name=YOUR_PROJECT --branch=main
```

Replace `YOUR_PROJECT` with your verified target and explicitly select the correct account when you have access to more than one. Consult [the deployment reference](/docs/open-source/docs/development) for the upstream configuration; do not publish your fork over upstream production.

## Verify publication and diagnose failures

After a successful deployment, load the public main URL and the new deep link, then test search and mobile navigation. Compare the deployment's commit with the source you intended to publish.

If installation fails, check Node and lockfile consistency. If page generation fails, check catalog source paths and filenames. If font download fails, inspect build network access. If the deployment succeeds but content is old, confirm you uploaded the rebuilt `out/`, the correct production branch/project, and the intended revision.

Return to the [docs repository overview](/docs/open-source/docs).
