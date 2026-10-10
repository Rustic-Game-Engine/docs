# Documentation site

Run Node.js 24 commands from the repository root. Markdown lives in `docs/`,
generated API content in `lib/api-docs.ts`, and navigation in `lib/docs-catalog.ts`.
The site must build from this repository alone without an engine checkout.
Check documentation against the engine implementation when changing API behavior.

Before opening a pull request, run `npm run lint -- --max-warnings=0`,
`npm run build`, `npx tsc --noEmit`, and `npm audit --audit-level=moderate`.
Keep generated `.next/`, `out/`, and TypeScript build-info files out of Git.

For every new feature or code change, commit the completed work on a dedicated
branch, push it, and open a pull request after the required checks pass. Include
the behavior change and validation results in the pull request description, and
return its link to the user. Do not merge the pull request unless asked.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
