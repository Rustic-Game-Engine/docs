# Docs repository

[Open the docs repository on GitHub](https://github.com/Rustic-Game-Engine/docs).

This repository contains the documentation website you are reading: the welcoming landing page, engine guides, gameplay API reference, scripting tutorials, repository guides, and search. Its source-development guide sits alongside the other repositories under [Open-Sourced Docs](/docs/open-source). It is a standalone project at the repository root and builds without an engine checkout. Use it to contribute documentation or develop your own version of the site.

## Contributor guide chapters

Follow these chapters in order, or jump to the system you want to change.

| Chapter | What it covers |
| --- | --- |
| [Documentation Overview](/docs/open-source/docs/overview) | Documentation structure, reading paths, source loading, and catalog search. |
| [Local Setup](/docs/open-source/docs/local-setup) | Run, build, check, and preview the documentation website locally. |
| [Folder Structure](/docs/open-source/docs/folder-structure) | Where engine guides, contributor pages, generated APIs, and site code belong. |
| [Writing Guidelines](/docs/open-source/docs/writing-guidelines) | Supported Markdown, terminology, accuracy, and reproducible examples. |
| [Adding Documentation](/docs/open-source/docs/adding-documentation) | Create pages and sections, register routes, and verify publication. |
| [Editing Existing Pages](/docs/open-source/docs/editing-pages) | Find authoritative sources and correct outdated information and links. |
| [Code Examples](/docs/open-source/docs/code-examples) | Standards for scripting API samples, setup, lifecycle, and expected results. |
| [Versioning](/docs/open-source/docs/versioning) | Maintain compatibility notes and plan documentation for multiple engine versions. |
| [Translations](/docs/open-source/docs/translations) | Propose languages, review translations, and understand locale support needed. |
| [Contributing](/docs/open-source/docs/contributing) | Submit and review documentation changes with the required website checks. |

## Languages and framework

The application is written in **TypeScript** and **React**, using **Next.js 16.4** and React 19. Styling uses **CSS**; guides use **Markdown**; generated API text is maintained in TypeScript. npm manages dependencies. Next.js produces static HTML and browser assets for Cloudflare Pages; the published site does not need a running Node.js server.

## Prerequisites

- Git to clone your fork and manage contributions.
- **Node.js 24** and npm, matching the repository's CI and deployment workflows.
- A modern browser for local preview and an editor for TypeScript, CSS, and Markdown.
- Internet access to install locked npm dependencies and fetch Google fonts during builds.
- Cloudflare access only if you want to publish to your own Pages project. Local development needs no Cloudflare token or engine installation.

## Fork and run your own version

Fork the repository on GitHub, replace `YOUR_ACCOUNT`, then run:

```sh
git clone https://github.com/YOUR_ACCOUNT/docs.git
cd docs
git switch -c my-docs-change
node --version
npm ci
npm run dev
```

Open the local URL printed by Next.js, normally `http://localhost:3000`. Both `/` and `/docs` show the welcome page. `npm ci` uses the committed lockfile so your dependencies match CI.

For a first customization, change a repository guide in `content/` and reload its page. Then update the landing page copy, colors in `app/globals.css`, and the catalog as needed. Keep a new site's project name, GitHub links, metadata, favicon, and deployment target consistent with your fork.

## Source map and good starting points

| File or directory | What it controls | A good first change |
| --- | --- | --- |
| [app/page.tsx](https://github.com/Rustic-Game-Engine/docs/blob/main/app/page.tsx), `components/docs-landing.tsx` | Welcome page and repository cards | Explain your project and link its guides |
| `app/layout.tsx`, `public/favicon.svg` | Site metadata, fonts, and identity | Update the title, description, and icon |
| `app/globals.css` | Colors, typography, article layouts, mobile behavior | Adjust a design token and check desktop/mobile |
| [lib/docs-catalog.ts](https://github.com/Rustic-Game-Engine/docs/blob/main/lib/docs-catalog.ts) | Page slugs, descriptions, repository groups, navigation, and search index | Register a new guide |
| `docs/`, `content/` | Engine guides and repository/contributor guides | Improve setup steps or add a focused tutorial |
| [lib/docs.ts](https://github.com/Rustic-Game-Engine/docs/blob/main/lib/docs.ts) | Finds catalog entries and loads Markdown or generated API text | Understand the build-time source flow |
| `lib/api-docs.ts` | Generates the API reference Markdown | Correct a behavior description against the engine |
| `app/docs/[[...slug]]/page.tsx` | Static documentation routes and page metadata | Understand how catalog entries become exported pages |
| `components/site-frame.tsx` | Shared header, repository navigation, theme, and mobile menu | Improve navigation or accessibility |
| `components/docs-shell.tsx` | Markdown rendering, code copying, table of contents, and pagination | Check how supported Markdown is displayed |
| `components/docs-search.tsx` | Browser-side catalog search and results | Improve search descriptions or presentation |

Guides are rendered by a small custom Markdown renderer. Use its supported headings, lists, links, code fences, blockquotes, and tables; raw HTML and arbitrary MDX components are not part of the documented content format. See [Writing documentation](/docs/open-source/docs/documentation) for a complete page-entry example.

## Main scripts and workflows

Run npm commands at the docs repository root:

| Command or file | Purpose | Expected result |
| --- | --- | --- |
| `npm ci` | Installs the exact locked dependency tree | Creates local `node_modules/` |
| `npm run dev` | Starts Next.js development mode | Local preview with refresh on edits |
| `npm run build` | Compiles, type-checks, and exports all catalog pages | Deployable static site in `out/` |
| `npm run lint -- --max-warnings=0` | Runs ESLint, React, hooks, TypeScript, and accessibility rules | Fails on errors or warnings |
| `npx tsc --noEmit` | Checks TypeScript after route types have been generated | No emitted application files |
| `npm audit --audit-level=moderate` | Checks dependencies for known vulnerabilities | Reports moderate or higher findings |
| `npm run start` | Calls `next start` | Not suitable for this site's static export; preview `out/` instead |
| [quality.yml](https://github.com/Rustic-Game-Engine/docs/blob/main/.github/workflows/quality.yml) | Installs with Node.js 24, then runs lint, build, types, and audit | Pull-request and main-branch validation |
| [deploy-website.yml](https://github.com/Rustic-Game-Engine/docs/blob/main/.github/workflows/deploy-website.yml) | Builds and uploads `out/` to Cloudflare Pages on `main` | Production deployment when credentials are configured |

Before opening a pull request:

```sh
npm run lint -- --max-warnings=0
npm run build
npx tsc --noEmit
npm audit --audit-level=moderate
```

## Publish your own documentation site

Build with `npm run build`, then deploy `out/` to your own static host. For Cloudflare Pages, use a separate project for your fork and replace the upstream project/account settings in the workflow. Configure `CLOUDFLARE_API_TOKEN` in your own repository's Actions secrets with Pages Edit access to that account. Do not commit a token or reuse the upstream production target.

Preview the static build with `npx wrangler pages dev out`. Check `/`, `/docs/open-source`, a deep article link, search, and a missing-page response. Read [Development & deployment](/docs/open-source/docs/development) for the existing project's workflow and configuration.

## Diagnose common setup failures

- `npm ci` fails: confirm Node.js 24 and a consistent `package.json`/`package-lock.json`; use npm when intentionally changing dependencies.
- TypeScript cannot find generated route types: run `npm run build` before the standalone type check.
- A new guide does not appear: add it to `lib/docs-catalog.ts`; creating a Markdown file alone does not register a page.
- A build cannot read a guide: check the catalog's source path relative to this repository root.
- Font download fails: confirm the build environment can reach the configured Google font services.
- Cloudflare's credential check fails: configure the repository secret; the last successful production deployment stays live.

When an engine API changes, update the published guide here alongside the matching `Engine/docs` content in the [engine repository](https://github.com/Rustic-Game-Engine/engine). Return to the [repository directory](/docs/open-source) for the other public projects.
