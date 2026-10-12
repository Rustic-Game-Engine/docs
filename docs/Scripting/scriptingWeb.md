# Scripting Rustic UI assets with HTML and CSS

Web assets are `.html`, `.htm`, or `.css` files under `ui/`. The directory rule is
enforced: they are not accepted as gameplay assets elsewhere. Rustic structurally
validates the document and executes inline `<script>` content in the same bundled,
sandboxed JavaScript behavior runtime used by `.js` scripts. The current implementation has no rendered HTML layout or DOM and does not replace
the editor shell.

## Current implementation and planned direction

HTML-based game UI, with CSS styling, is the intended direction for Rustic. The
current Web adapter validates structure and executes inline JavaScript behavior;
CSS-only assets have no lifecycle callbacks and do not produce rendered layout.
An HTML/CSS renderer is **planned**, not implemented in this revision. These
current limits do not mean HTML/CSS game UI is permanently unsupported. A full
browser DOM or arbitrary browser compatibility is not an established contract.

Create/register the asset through **Programming** so it has a Script ID and scope.
Attach it as a global, scene, or object component through the editor; never insert a
path or source string into scene metadata.


## Topics

- [HTML behavior](/docs/scripting/web/html-behavior)
- [Available inline JavaScript API](/docs/scripting/web/available-inline-javascript-api)
- [Security and limitations](/docs/scripting/web/security-and-limitations)

## Related guides

- [Edit scene objects](/docs/guides/scene-objects)
- [Use gameplay actions](/docs/guides/gameplay-actions)
