# HTML/CSS content

[Back to Gameplay programming](/docs/guides/gameplay-programming).

HTML/CSS/PHP UI content is confined to the project's `ui/` directory. `.html` and
`.css` entries are structurally validated. Inline `<script>` lifecycle
objects use the sandboxed JavaScript API. CSS-only entries are valid content behaviors
with no callbacks. HTML and inline scripts have no DOM, network, filesystem, or Node
APIs. Web entries participate in gameplay lifecycle and state updates; they never
render or replace the editor shell.
