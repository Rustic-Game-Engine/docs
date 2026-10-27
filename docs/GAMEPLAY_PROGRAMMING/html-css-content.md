# HTML/CSS content

[Back to Gameplay programming](/docs/guides/gameplay-programming).

HTML/CSS/PHP UI content is confined to the project's `ui/` directory. `.html` and
`.css` entries are structurally validated. Inline `<script>` lifecycle
objects use the sandboxed JavaScript API. CSS-only entries are valid content behaviors
with no callbacks. HTML and inline scripts have no DOM, network, filesystem, or Node
APIs. Web entries participate in gameplay lifecycle and state updates; they never
render or replace the editor shell.

The game viewport loads HTML/CSS and standalone PHP pages from `ui/` once when
Play starts. For example, save `<?php echo '<p>Ready</p>';` as an unregistered
`ui/hud.php`, install PHP CLI on `PATH`, restart the editor, and press **Play**;
the viewport displays `Ready`. PHP pages run with their containing folder as the
working directory. This is a basic text overlay, without browser DOM or interactive
web controls. Restart Play after editing page content.

PHP assets registered in `config/scripts.ron` are gameplay behaviors, including
global, scene, and object scripts. The overlay does not execute them as standalone
pages, even when unattached or disabled. Attach and enable these scripts through
the editor to run their callbacks with the engine-provided `rustic.php` SDK.
Keep standalone pages separate from registered behavior assets.

If Play reports `PHP UI ... failed`, the message includes the process exit status
and any stderr/stdout output. A failure with no output explicitly says so; check
the page and PHP CLI configuration. A missing CLI reports that PHP is required.
Fix the reported page error and restart Play. Do not copy the gameplay SDK into
a standalone page to run callbacks: those require the gameplay host.
