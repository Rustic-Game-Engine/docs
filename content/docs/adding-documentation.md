# Adding Documentation

A Markdown file does not become a website page until it has a catalog entry. Choose its audience, create the source, register a unique route, and verify the exported result.

## Create a page

For a docs-site contributor guide, create `content/docs/my-guide.md` with a single title, prerequisites, steps, expected results, and relevant limitations. For an engine usage guide, choose an appropriate location under `docs/`. Follow [Writing Guidelines](/docs/open-source/docs/writing-guidelines).

## Register the route

Add an entry to the appropriate group in `lib/docs-catalog.ts`:

```ts
{ slug: "open-source/docs/my-guide", title: "My guide", description: "Set up and verify a specific documentation workflow.", source: "content/docs/my-guide.md" }
```

The public URL is `/docs/open-source/docs/my-guide`; the source path is relative to the repository root. Keep slugs unique and stable. Place engine contributor chapters in Engine source and website contributor chapters in Docs. Catalog order controls navigation and previous/next links.

For a new section, add a group and ensure `docSections` selects it into the intended project. Open-source groups are explicitly listed in `sourceGroups`; omitting one can place it in the engine usage section. Link the new guide from its repository overview so readers have a clear starting point.

## Add an API reference

Each API call or constant gets its own subpage under its category. For example, Audio is the index at `/docs/api/audio` and `Audio.play()` is documented at `/docs/api/audio/play`. Category pages list their APIs instead of combining several signatures into one reference.

Register the category in `lib/docs-catalog.ts` and its individual signatures in `lib/api-reference.ts`. The catalog adds the subpages automatically, including sidebar nesting, breadcrumbs, search and static export. Keep shared setup and behavior in the category's Markdown source or generated `lib/api-docs.ts` source; `lib/api-reference-markdown.ts` builds the individual references from it. Complete usage examples can include prerequisite calls. Calls that share a method name use a receiver prefix to keep their URLs unique.

Keep the original category source path available as `sourcePath` so Markdown links to that source still resolve to the category index. When replacing an older topic route, add a `docAliases` entry to preserve access.

After building, run `npm run test:api-reference` to check unique API routes, single signatures, category links, exported pages and legacy entity URLs.

## Verify publication

Run lint, build, TypeScript, and dependency checks from [Local Setup](/docs/open-source/docs/local-setup). Confirm the new route is exported, the title appears in the sidebar, search finds it by title/description, and previous/next links are sensible. Check internal links and the layout on desktop and mobile.

Keep legacy URLs working when moving a page. The catalog's `docAliases` can map an old slug to a canonical one, and static params export those aliases. Link new content to the canonical URL. Submit the change using [Contributing](/docs/open-source/docs/contributing).
