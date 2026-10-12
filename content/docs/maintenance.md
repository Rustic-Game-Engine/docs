# Documentation maintenance

## Authoritative sources

Engine Rust code and generated SDK templates are authoritative for behavior. The website’s `docs/`, `content/`, `lib/api-docs.ts`, `lib/api-reference.ts` and `lib/api-example-data.json` are authoritative for what is published here. The build reads this repository only; it never silently reads a sibling engine checkout.

Imported engine-local guides are independent copies, not a live mirror. The initial import was engine commit `3db0126b`; this audit reviewed `017db99b7025eeda96acf21967664153a2df0795`. When changing user-visible behavior, review both copies, update affected published pages/examples in the same task and link companion PRs. Do not blindly overwrite website edits with a fresh engine directory copy.

## Editing and routing

Register each page in `lib/docs-catalog.ts`. API categories/functions are generated from `lib/api-reference.ts`; core details come from `lib/api-docs.ts`, gameplay examples from `lib/api-example-data.json`, and per-call Markdown from `lib/api-reference-markdown.ts`. Update the shared source, not generated `out/` HTML. The first-game contributor route and beginner route intentionally use the same tutorial source.

Keep existing slugs or add `docAliases` compatibility entries. Relative Markdown links resolve against the current source before a unique filename fallback; ambiguous filenames must use an explicit `/docs/...` URL. Prefer canonical public routes for user guides. Heading IDs ignore fenced code and disambiguate repeated headings.

## Local checks and CI

Use Node.js 24 and run from the docs repository root:

```sh
npm ci
npm run lint -- --max-warnings=0
npm run check:api-examples
npm run check:docs
npm run check:syntax
npm run build
npm test
npm run check:links
npx tsc --noEmit
npm audit --audit-level=moderate
```

`check:docs` rejects missing sources, duplicate catalog/alias routes, invalid parents, unbalanced fences and broken published Markdown links. `check:links` checks internal HTML routes and fragments after the static export, including compatibility routes. External URLs are not automatically fetched; check edited download links against the real repository/release before publication.

`npm run check:syntax` parses all published JavaScript snippets without executing them. Add `-- --native` to also parse Python and, when a Lua 5.4 shared library is installed, Lua snippets. C/C++/C#/Java/PHP and Luau runtime qualification still require their actual adapters/toolchains.

API example checks validate declared language coverage and published calls. They do not prove every binding executes. Optional `npm run check:engine-source -- /path/to/engine/Engine` corroborates lifecycle names, API version and easing constants against a separate checkout; it is not required to build the site or a substitute for runtime tests.

Optional `npm run test:sdk-lifecycle -- /path/to/engine/Engine` compiles the published C/C++ lifecycle examples with `-Wall -Wextra -Werror` and runs their eight callbacks plus Python against the actual engine SDKs. It requires `cc`, `c++` and `python3`. This exercises SDK dispatch using protocol fixtures, not the native Play runtime.

For executable examples, test the actual runtime/toolchain where available. Do not claim native editor, microphone, OS installer or cross-language execution results based on a Markdown syntax check. Use screenshots only from a verified editor capture. Source revision and manual qualification limits belong in compatibility notes.

Optional browser smoke check: serve `out/` with a server that resolves extensionless routes to the matching `.html` file, then run `python3 scripts/check-browser.py http://127.0.0.1:4173`. It requires Python Playwright and Chromium (`CHROMIUM_PATH` overrides `/usr/bin/chromium`). It checks desktop/mobile pages, copy, search filters, deep links, focus handling and themes. This optional browser check is not run by CI.

CI runs these checks on PRs and main pushes. Deployment is a separate workflow; see [Cloudflare Pages deployment](/docs/open-source/docs/development/cloudflare-pages-deployment). This task changes source and creates a reviewable PR; it does not deploy the website.
