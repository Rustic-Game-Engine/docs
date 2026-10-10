# Editing Existing Pages

Use the catalog to identify the source behind a public URL. Editing a similarly named file or generated output may leave the published page unchanged.

## Find the authoritative text

Look up the URL's slug in `lib/docs-catalog.ts`. A `docs/...` or `content/...` source loads Markdown; `README.md` loads the repository guide; an `api:` source comes from `lib/api-docs.ts`. Edit those sources rather than `.next/` or `out/`.

For engine behavior, check the corresponding implementation, tests, and pinned configuration. The architecture baseline includes future work. If the engine and website disagree, trace the current behavior and document its limits; do not infer that every proposed feature exists.

## Update related material

A changed command can affect prerequisites, copyable examples, troubleshooting, and expected output. A scripting change can affect language guides, generated API content, lifecycle references, and the matching engine-local `Engine/docs/` files. Include the engine version/commit checked when a claim is sensitive to change.

Preserve route slugs for content corrections. If moving a page, update incoming links and add an old-slug alias in `docAliases`. Heading renames also affect fragment links; check references before changing them. Revise the catalog description when the page's scope changes because search uses catalog metadata.

## Verify and review

Run the repository checks, then preview the changed public route. Read the rendered table, code blocks, heading links, and navigation. For an API sample, exercise the documented creation/attachment/Play flow in an appropriate engine environment; a website build validates rendering and types, not gameplay behavior.

Explain the outdated claim, replacement behavior, evidence, and checks in the PR. Link a companion engine PR when behavior changed there. See [Code Examples](/docs/open-source/docs/code-examples) and [Contributing](/docs/open-source/docs/contributing).
