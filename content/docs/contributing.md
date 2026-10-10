# Contributing

Contribute setup improvements, accurate examples, corrected API descriptions, and website changes to the [docs repository](https://github.com/Rustic-Game-Engine/docs). Read `AGENTS.md`, use Node.js 24, and keep the site build independent of an engine checkout.

## Submit a focused change

Fork and clone the repository, create a branch, and identify the authoritative source using [Editing Existing Pages](/docs/open-source/docs/editing-pages). New pages need catalog registration and overview links. Explain the user problem and resulting guidance; avoid unrelated styling or dependency changes in a text-only correction.

Use supported Markdown, stable routes, accurate terminology, copyable commands, and reproducible API samples. For engine behavior, verify the implementation and update engine-local documentation as needed. Link the companion engine PR when the change spans repositories.

## Required checks

Run from the repository root:

```sh
npm ci
npm run lint -- --max-warnings=0
npm run build
npx tsc --noEmit
npm audit --audit-level=moderate
```

The quality workflow uses these checks for pull requests, main-branch pushes, and merge queues. Keep `node_modules/`, `.next/`, `out/`, and TypeScript build-info files out of Git. Preview changed routes, navigation, search, code copying, and mobile layout. State separately whether gameplay samples were exercised in the engine; a site build does not execute them.

## Pull requests and review

Describe the concrete error or missing workflow, the final content/behavior, and checks performed. Provide the source/commit evidence for changed API claims and call out validation you could not perform. Reviewers should check correctness, first-time setup usability, current restrictions, link destinations, and catalog reachability.

Open bug reports in [docs issues](https://github.com/Rustic-Game-Engine/docs/issues) with the affected URL, incorrect text or steps, expected guidance, and relevant engine/environment version. For rendering defects, include reproduction steps and viewport information.

Publishing follows the main-branch deployment workflow described in [Development & deployment](/docs/open-source/docs/development). A contribution does not need production credentials to be developed or reviewed locally.
