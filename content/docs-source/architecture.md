# Docs architecture and page flow

This site is a static Next.js application written in TypeScript/React. Understanding how a catalog entry becomes an exported page helps you add content, debug missing guides, and develop your own version without introducing a server requirement.

## From source file to published article

1. `lib/docs-catalog.ts` declares a page's slug, title, description, and content source.
2. `docSections` groups catalog entries into Engine usage and Open-Sourced Docs. `allDocs` combines those entries with section/group metadata.
3. `app/docs/[[...slug]]/page.tsx` generates static parameters for catalog pages and legacy aliases.
4. `lib/docs.ts` resolves the slug and reads the source. Plain paths load a Markdown file; `api:` sources invoke `buildApiMarkdown`.
5. `components/docs-shell.tsx` renders the article, table of contents, breadcrumbs, copyable code, and previous/next links.
6. `next build` writes HTML and browser assets to `out/`, which a static host serves.

For example, a slug `open-source/docs/architecture` becomes `/docs/open-source/docs/architecture`. Its Markdown source is a repository-relative filesystem path, not a web URL.

## Server and browser responsibilities

File reading belongs to the server/build side. `lib/docs.ts` imports `server-only` and uses Node's filesystem API; do not import it into a client component.

The shared frame, article interactions, and search use client components. Browser code handles the mobile menu, theme toggle, code-copy button, and keyboard shortcuts. Pages are still prerendered during the build, so browser APIs such as `navigator.clipboard` must be accessed from browser event handlers rather than module initialization.

Catalog metadata is available to search in the browser. The current search checks title, description, group, and section text. It is not a full-text search of every Markdown paragraph or a remote AI query.

## Routing, metadata, and legacy URLs

The optional catch-all route handles documentation pages; `/` and the empty `/docs` route show the welcome page. `dynamicParams = false` means arbitrary uncataloged article slugs are not generated on demand.

`docAliases` maps older repository paths such as `repositories` and `website` to the nested Open-Sourced Docs hierarchy. Aliases are exported too, while page metadata points at the canonical catalog route. Add an alias only when preserving an existing public URL; keep normal navigation pointed at the canonical slug.

Title and description come from the catalog. Metadata for an alias should describe the same underlying article rather than a second independent page.

## Shared components

| Component | Responsibility |
| --- | --- |
| `site-frame.tsx` | Header, section navigation, sidebar, mobile menu, theme, keyboard search shortcut |
| `docs-landing.tsx` | Two main paths: using the engine and developing public source |
| `repository-cards.tsx` | Four repository cards inside Open-Sourced Docs |
| `docs-shell.tsx` | Markdown rendering and article navigation |
| `docs-search.tsx` | Search input, matching catalog entries, and empty results |

Keep global navigation in the shared frame so a source article and a gameplay article do not develop different menus. Use [Customizing the site](/docs/open-source/docs/customizing) to change branding while preserving these responsibilities.

## Static-host constraints

`next.config.ts` sets `output: "export"`. The site cannot rely on a Node server to read files per request, discover new guides at runtime, or serve request-time authentication. Content/catalog changes require a fresh build and deployment.

The build also fetches configured Google fonts, so CI needs network access during compilation. The finished export serves its packaged assets from the static host.

Continue with the worked [Adding a documentation page](/docs/open-source/docs/adding-pages) tutorial.
