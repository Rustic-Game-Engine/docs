# Writing Guidelines

Write for someone encountering the engine or repository for the first time. Explain what works, prerequisites, exact steps, expected results, current limits, and how to diagnose failure. Describe implemented behavior rather than turning architecture proposals into product promises.

## Page formatting

Use one level-one heading, descriptive level-two sections, and level-three subsections when useful. The custom renderer supports paragraphs, simple ordered/unordered lists, links, inline code, bold text, fenced code blocks, blockquotes, and tables. Use simple flat lists; arbitrary MDX, raw HTML, images, and complex nested Markdown are not supported by the current article renderer.

Label fenced code blocks with their language. Keep commands copyable, identify the working directory, and separate shell commands from output. Use explicit `/docs/...` links for published pages and complete HTTPS links for repository sources. Heading anchors are derived from heading text, so renaming a heading can break incoming fragment links.

## Terminology and claims

Use **Rustic Game Engine** for the product, **engine** for the Rust implementation, **editor** for authoring, and **runtime** for execution. Preserve exact UI labels such as Play, Inspector, and Console. Distinguish engine source from a game project and engine implementation language from gameplay language.

State operating-system or language restrictions beside the affected step. Distinguish a supported callback name from an event the simulator actually dispatches, and a planned export interface from an implemented command. Check versions in pinned configuration rather than guessing from dependency names.

## Examples and maintenance

Use the smallest example that demonstrates the promised result. Include creation, attachment, callback context, and expected Console/scene behavior. Avoid unexplained helpers, user-specific paths, secrets, or SDK protocol boilerplate. See [Code Examples](/docs/open-source/docs/code-examples) for scripting API standards.

Give every catalog entry a useful title and description: these are search fields. When correcting a page, update examples, related links, and generated API text together if they describe the same behavior. See [Editing Existing Pages](/docs/open-source/docs/editing-pages).
