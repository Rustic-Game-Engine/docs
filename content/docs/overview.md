# Documentation Overview

The Rustic documentation website covers engine users and contributors to the public repositories. It builds entirely from this repository; an engine checkout is useful for checking behavior but is not required to render the site.

## Two reading paths

**Engine** contains engine usage, gameplay API reference, language guides, and scene tutorials. **Open-Sourced Docs** contains development guides for the engine, docs site, examples, and hosting SDK repositories. Keep source-development instructions in the contributor sections so game authors can find usage instructions easily.

The [engine contributor guides](/docs/open-source/engine) explain how to build and change the engine. The [docs repository guide](/docs/open-source/docs) introduces this website's framework and development commands.

## How a page reaches the website

`lib/docs-catalog.ts` registers each page's slug, title, description, source, and group. `lib/docs.ts` loads Markdown from this repository or calls the generated API builder for `api:` sources. `app/docs/[[...slug]]/page.tsx` exports catalog routes, and `components/docs-shell.tsx` renders the content.

The same catalog powers sidebar navigation, previous/next links, and browser-side search. Search matches titles, descriptions, groups, and project names; it does not search every paragraph of article text. A useful description makes a page easier to find.

## Choose the appropriate source

Engine guides belong in `docs/`, contributor/site guides in `content/`, and generated API reference text in `lib/api-docs.ts`. The README remains the development/deployment reference. See [Folder Structure](/docs/open-source/docs/folder-structure) for the full map and [Adding Documentation](/docs/open-source/docs/adding-documentation) to register a reachable page.

The current catalog serves one documentation set in English. [Versioning](/docs/open-source/docs/versioning) and [Translations](/docs/open-source/docs/translations) describe maintenance practices and the work needed before exposing additional versions or languages.
