# Inspector

Prerequisites: open a writable scene, stop Play, and select an entity in **Project → Scene** or the viewport. No selection shows **Nothing selected**. Scene sky and atmosphere settings are available independently of object selection.

## Change properties and transforms

1. Edit the object's name at the top of Inspector.
2. In **Transform**, edit **Position**, **Rotation** (degrees) and **Scale**. These are local transforms relative to the parent.
3. For primitives/meshes, edit **Color**, **Can touch**, **Can collide** and **Anchored**. Parametric primitives also expose a **Geometry** section.
4. Save through **File → Save scene**; use **Edit → Undo** for a mistaken edit.

Expected result: validated authoring changes appear in the preview and saved scene. **Can touch** is reserved for touch events; it does not enable solid collisions. **Can collide** and **Anchored** affect built-in primitive physics in Play. Imported mesh collision is not established by those checkboxes.

## Attach a script and edit public properties

1. Select the target entity, then create an **Object Component Script** from **Programming**, or use an already registered script.
2. In **Gameplay scripts → + Add Component**, choose the registered script path if it is not already attached. Creation through Programming may already attach it; do not duplicate the attachment.
3. Check the script's **Enabled** checkbox. Existing stored public property values appear beneath its Script ID; edit the values supported by the Inspector's value controls.
4. Edit the script source in the external editor, following the language-specific property declaration and callback conventions.
5. Save the scene and source file, then press **Play**. Check Console for the expected output or diagnostics.

Expected result: the enabled attachment executes in its documented lifecycle scope. The Inspector edits stored component properties; it does not guarantee automatic discovery of arbitrary variables declared in source. Entity-valued properties display an identifier rather than a freeform entity picker.

## Camera, light and runtime state

A camera selection exposes active state, priority, zoom, projection and clipping settings. A light exposes type, color, intensity, range and spot angle as applicable. Follow [cameras and lighting](/docs/guides/editor/cameras-lighting) for a complete setup.

During Play, selected-entity telemetry can supply live transforms, attributes and script state. Authoring and runtime are distinct; do not assume that live values are saved or that every Inspector edit is a runtime edit. After Stop, review/apply or discard the proposed runtime changes.

Related: [public properties API](/docs/api/properties), [physics](/docs/guides/physics), [Playtesting](/docs/guides/editor/playtesting).
