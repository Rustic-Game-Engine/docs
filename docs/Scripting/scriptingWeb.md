# Scripting Rustic UI assets with HTML and CSS

Web assets are `.html`, `.htm`, or `.css` files under `ui/`. The directory rule is
enforced: they are not accepted as gameplay assets elsewhere. Rustic structurally
validates HTML documents and executes inline `<script>` content or standalone
`ui/*.js` / `ui/*.mjs` behaviors in the same bundled,
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

## Optional visual UI authoring

In the native editor's **Explorer**, right-click an `.html`, `.htm`, or `.css` file
inside the project's `ui/` directory and choose **Edit UI Visually**. Normal **Open**
continues to use your code editor. The action opens a dockable **Visual UI** panel
and switches **Properties** to **UI Properties**. For CSS, choose one of the HTML
documents that links that stylesheet; a stylesheet without a referencing HTML
document cannot be opened visually.

Start with a file such as `ui/hud.html`:

```html
<!doctype html>
<html><body>
  <div id="hud" style="position:absolute;left:20px;top:20px;width:320px;height:100px;background-color:#202020">
    <button style="position:absolute;left:12px;top:12px;width:160px;height:48px;color:#ffffff">Start</button>
  </div>
</body></html>
```

Select an element on the canvas or in **Layers**. Use **Move** or **Scale** with
the transform handles, or edit pixel position, size, font size, text, ID, class,
image source/alt text, colors, visibility, and z-index in Properties. Layers retain
HTML nesting; move and scale use the parent's canvas position. New elements are
added to the body; duplicate and delete operate on the selected subtree. The layer
buttons move the element beyond the lowest/highest sibling z-index. **Scene
properties** returns Properties to scene editing.

**Undo UI** and **Redo UI** affect the UI document independently of scene history.
A transform drag is one undo step. **Save UI** writes the HTML, retaining the previous
file as `.bak`; scene Save and scene autosave do not save UI changes. HTML formatting
is normalized by the HTML parser when edited; scripts, styles, and unrelated
attributes remain in the document. CSS preview does not copy stylesheet rules into
the saved HTML: visual edits write inline overrides. Save or discard changes before
opening another UI document. Closing the editor with unsaved UI changes offers save,
discard, and cancel. Editing is disabled during Play and in read-only projects.

The canvas is a native layout preview, not a browser. It supports inline pixel
positions and sizes, hex colors, and flat selector rules from inline stylesheets
and local linked CSS files in `ui/`. Stylesheet rules are applied in document order,
then inline styles; full CSS specificity, `!important`, inheritance, flex/grid,
percentage sizing, media queries, image rendering, DOM events and script execution
are not supported by the preview. Image source and alt text can still be authored.
Use positioned containers for nested layouts. This feature does not add browser UI
rendering during Play.

If the action is absent, check the extension and that the file is inside `ui/`.
If CSS has no document choices, add a relative `<link rel="stylesheet" href="...">`
from an HTML file under `ui/`. If Save reports an external change, keep the document
open to retain your edits, or discard and reopen to load the disk version; Save
will not overwrite that external version. Files must be UTF-8 and at most 1 MiB;
paths and symlinks that leave `ui/` are rejected. Open failures appear in Terminal.


## JavaScript in `ui/`

Files ending in `.js` or `.mjs` under the project's top-level `ui/` folder,
including subfolders, automatically use the Web/UI category. For example,
`ui/hud.js` is UI code; `scripts/player.js` is gameplay JavaScript. Existing
registrations adopt this category on load while preserving their asset IDs and
attachments. Moving a registered script into or out of `ui/` updates its category.

The folder selects the category, not when the script runs. In the Project Files
panel, right-click `ui/hud.js`, choose **Set As**, then **Scene Startup Script**
for a scene HUD. Save the scene and press Play. Use **Object Component Script**
for object-owned UI behavior or **Global Startup Script** for session services.
A helper included with `<script src="hud.js"></script>` in an attached HTML
entry runs within that entry; attach it separately only if you want another instance.

UI scripts keep the same sandboxed JavaScript APIs as gameplay scripts. They can
read scene state exposed by gameplay objects and receive or emit `Events` signals.
Each behavior has its own JavaScript globals; another script's private variables
are not directly accessible. Publish the values needed by the UI through signals
or engine-owned object state.

For example, create `scripts/player.js` and attach it to an object named `Player`:

```javascript
globalThis.behavior = {
  FixedUpdate() {
    rustic.set_translation(3, 0, 0);
    Events.emit("ScoreChanged", [7]);
  }
};
```

Create `ui/hud.js` and attach it as a scene startup script:

```javascript
globalThis.behavior = {
  Start() {
    Events.on("ScoreChanged", score => {
      const position = rustic.get_object_attribute("Player", "Position");
      rustic.log("info", `HUD score: ${score}; player x: ${position[0]}`);
    });
  }
};
```

Play logs show `HUD score: 7; player x: 3`. Signals deliver during frame updates;
a listener must be connected before emission, so publish current state after
subscribing or read engine-owned state to initialize a HUD. If nothing runs,
check the attachment, enabled state, active scene and script diagnostics. The
folder alone does not start a script. Use the exact top-level `ui/` name;
`scripts/ui/` remains gameplay code.

UI JavaScript still uses the bundled behavior runtime: `document`, DOM updates,
browser globals, Node APIs and ES module imports are unavailable. `.mjs` uses
the same behavior format as `.js`. Use the supported engine APIs to consume
state; this classification does not add a rendered HTML HUD.
