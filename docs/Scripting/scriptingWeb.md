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

### Build and organize elements

1. Choose **Add element → Panel** to create a container (`div`). Give it a **Name**
   to find it easily; this is saved as its HTML ID.
2. Keep the panel selected and use **Add element → Text**, **Button**, or **Image**
   to add children inside it. Panels can contain other panels at any depth. Use
   **Add at page level** to create an element outside the selection.
3. Select elements in the **Elements and layers** tree. The arrow expands children;
   clicking the name selects the element without collapsing it.
4. Use the **Parent** menu to move the selected element and its children into
   another container, or choose **Page (root)** to move it out. The canvas position
   stays the same. The editor excludes the element itself, its descendants, and
   parents that cannot legally contain it, such as images or buttons containing panels.

Properties are grouped into **Layout**, **Text**, **Appearance**, **Layer order**,
and **HTML attributes**. Layout has **X position**, **Y position**, **Width**, and
**Height**, in pixels. The canvas **Move** and **Scale** handles still work.
**Layer order** includes numeric order and **Send to back / Bring to front**;
**HTML attributes** keeps ID, class, and image source/alt text available.
**Duplicate** copies a subtree; **Delete** removes the element and its children.
**Show scene properties** returns to scene editing.

### Colors, gradients, and rounded corners

In **Appearance → Background**, choose **Solid** or **Gradient**. A linear gradient
starts with two colors. Change each color and its percentage position, set the
angle, and use **Add color stop** or **Remove** to adjust the gradient (2–16 stops).
Angles follow CSS: 0° goes up, 90° right, 180° down, and 270° left.

**Text → Text color** offers the same solid and gradient controls. Select a text-only
element, such as Text or a Button containing plain text. If an element has other
editable children, select its text child to change text appearance. Background and
text gradients can coexist. Gradients preview on the canvas and save as ordinary
CSS `linear-gradient(...)` styles; text fills use a nested text span so the parent
can keep its own background.

In **Appearance → Corner radius**, leave **Link all corners** checked to change all
four corners with one value. Uncheck it to edit **Top left**, **Top right**,
**Bottom right**, and **Bottom left** separately. Linking different corners uses
the current top-left value for all four. Each radius supports 0–255 pixels and
previews with both solid and gradient backgrounds.

**Undo UI** and **Redo UI** affect the UI document independently of scene history.
A transform drag is one undo step. **Save UI** writes the HTML, retaining the previous
file as `.bak`; scene Save and scene autosave do not save UI changes. HTML formatting
is normalized by the HTML parser when edited; scripts, styles, and unrelated
attributes remain in the document. CSS preview does not copy stylesheet rules into
the saved HTML: visual edits write inline overrides. Save or discard changes before
opening another UI document. Closing the editor with unsaved UI changes offers save,
discard, and cancel. Editing is disabled during Play and in read-only projects.

The canvas is a native layout preview, not a browser. It supports inline pixel
positions and sizes, hex colors, linear gradients with hex color stops, pixel corner
radii, and flat selector rules from inline stylesheets
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
