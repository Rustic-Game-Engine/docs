# Writing documentation

Help first-time users succeed with exact setup steps, copyable examples, expected results, current limitations, and ways to diagnose common failures. Update documentation alongside the engine change whenever engine functionality or scripting behavior changes.

For the complete contributor path, begin with [Documentation Overview](/docs/open-source/docs/overview), then [Local Setup](/docs/open-source/docs/local-setup) and [Writing Guidelines](/docs/open-source/docs/writing-guidelines). Use [Adding Documentation](/docs/open-source/docs/adding-documentation) for new routes and [Editing Existing Pages](/docs/open-source/docs/editing-pages) for corrections.

## Choose the source

- Engine guides live in `docs/` in this repository. Keep the corresponding `Engine/docs/` content in the engine repository accurate too.
- Generated API reference content lives in `lib/api-docs.ts`.
- Website contributor guides live in `content/`; development and deployment instructions live in `README.md`.

`lib/docs.ts` reads these sources at build time. Engine sources use paths such as `docs/Scripting/gameplayActions.md`. Generated sources use the `api:` prefix. Website sources use paths such as `content/my-guide.md` or `README.md`.

## Add a reachable page

Add an entry to the appropriate group in `lib/docs-catalog.ts`. Each entry needs a unique slug, a title, a concise description, and a source:

```ts
{ slug: "open-source/docs/my-guide", title: "My guide", description: "What readers will learn.", source: "content/my-guide.md" }
```

The catalog supplies static routes, sidebar navigation, previous and next links, and the client-side search index. Put engine usage pages in the engine groups. Under Open-Sourced Docs, use Engine source for engine development, Docs for website development, Examples for sample contributions, and Hosting SDK for SDK development. The page above appears at `/docs/open-source/docs/my-guide`.

## Link and format content

Use a single level-one heading, followed by descriptive level-two or level-three sections. The renderer supports paragraphs, lists, links, inline code, bold text, fenced code blocks, blockquotes, and tables. Use explicit `/docs/...` links for website pages and cross-project references; source-file links can be resolved for cataloged engine documents.

## Verify the result

Check the text against the implemented engine behavior. From the docs repository root, run `npm run build`, then preview the exported site as described in [Development & deployment](/docs/open-source/docs/development). Confirm your page appears in navigation and search, and check the setup, examples, and links before opening a pull request.
