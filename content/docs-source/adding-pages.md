# Add a documentation page

This worked example adds one website source-development guide, registers it under Open-Sourced Docs, and checks that readers can navigate and search for it. Run commands at the [docs repository](https://github.com/Rustic-Game-Engine/docs) root with Node.js 24.

## Create a focused source file

Create `content/docs-source/my-guide.md` containing:

```markdown
# My contribution guide

Learn how to make one small change to your documentation fork.

## Prerequisites

Install Node.js 24, clone your fork, and run npm ci.

## Try the change

Edit a paragraph, start the development server, and reload the guide.

## Expected result

The guide displays your updated paragraph without losing its navigation.

## Troubleshooting

If the page is missing, check the catalog slug and source path.
```

Use one level-one heading and descriptive section headings. State a real task, its requirements, precise steps, expected results, and failure diagnosis. The sample above demonstrates structure; replace its short paragraphs with verified instructions for your actual contribution.

## Register the guide

In `lib/docs-catalog.ts`, add this entry to the `Docs` group's `docs` array:

```ts
{
  slug: "open-source/docs/my-guide",
  title: "My contribution guide",
  description: "Set up a documentation fork and make your first content change.",
  source: "content/docs-source/my-guide.md",
}
```

The title appears in navigation, results, and metadata. The description helps users search for the workflow. Use a unique slug without a leading `/docs/`; the routing helper adds that prefix. The source must match the file's case and path relative to the repository root.

Use the other source groups when appropriate: `Engine source`, `Examples`, or `Hosting SDK`. Engine usage instructions belong in the usage groups instead. Adding a file without a catalog entry does not publish a route.

## Link from the parent page

Add a link to the relevant overview using the canonical route:

```markdown
[My contribution guide](/docs/open-source/docs/my-guide)
```

Use explicit article URLs for cross-section links. Source-file links may be resolved against catalog entries, but matching solely by filename can be ambiguous; canonical URLs make your destination clear.

## Preview the complete experience

```sh
npm run dev
```

Open the printed local URL followed by `/docs/open-source/docs/my-guide`. Confirm the heading and content, then check the sidebar, breadcrumb, table of contents, and previous/next links. Search for “documentation fork” and confirm the guide appears from its metadata.

Search does not index arbitrary article body text, so words present only in a paragraph may not match. Add a useful, accurate description rather than stuffing unrelated terms into it.

## Use supported Markdown

The custom renderer supports headings through level four, paragraphs, ordered/unordered lists, links, inline code, bold text, fenced code blocks, blockquotes, horizontal rules, and simple tables. It does not provide arbitrary MDX components, raw HTML rendering, images, or a full Markdown extension engine. Check a format in the renderer before assuming GitHub's rendering guarantees it here.

Keep fenced examples complete and copyable. Code blocks render their language label and a copy button, but do not execute or type-check the example.

## Verify and submit

Run [the required checks](/docs/open-source/docs/testing-deployment), including the static build. Inspect the exported guide through a static preview and verify every new link. A development route working alone does not prove it was included in the export.

Commit the source file, catalog entry, and overview link together. Do not commit generated `.next/`, `out/`, `node_modules/`, or TypeScript build-info files. Explain the reader's new workflow and the checks you ran in the pull request.
