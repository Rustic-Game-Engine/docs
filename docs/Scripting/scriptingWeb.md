# Scripting Rustic UI assets with HTML and CSS

Web assets are `.html`, `.htm`, or `.css` files under `ui/`. The directory rule is
enforced: they are not accepted as gameplay assets elsewhere. Rustic structurally
validates the document and executes inline `<script>` content in the same bundled,
sandboxed JavaScript behavior runtime used by `.js` scripts. It does **not** embed a
browser renderer and does not replace the editor shell.

Create the file with the Explorer so the editor registers its Asset ID and scope.
Attach it as a global, scene, or object component through the editor; never insert a
path or source string into scene metadata.


## Topics

- [HTML behavior](/docs/scripting/web/html-behavior)
- [Available inline JavaScript API](/docs/scripting/web/available-inline-javascript-api)
- [Security and limitations](/docs/scripting/web/security-and-limitations)

## Related guides

- [Edit scene objects](/docs/guides/scene-objects)
- [Use gameplay actions](/docs/guides/gameplay-actions)
