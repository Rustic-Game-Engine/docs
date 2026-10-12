# Editor manual

Use [Create a project](/docs/getting-started/create-project) before this guide. The native editor separates the authored scene from the isolated Play runtime. You can dock panels; **View > Reset dock layout** restores the default arrangement and **View > Open …** restores closed panels.

## Focused editor guides

Use [Editor overview](/docs/guides/editor) for step-by-step guides to hierarchy, Explorer, Inspector, viewport tools, cameras/lighting and Playtesting.

## Project Manager

**New project** creates a project from a template, **Import…** registers an existing project, and **Open project** launches its editor. **Settings** shows optional language tools; **Diagnostics** helps investigate launch errors. Removing a project card is different from deleting its files.

## Scene hierarchy, Explorer and Inspector

| Area | Practical task |
| --- | --- |
| Project > Scene | Select objects, arrange their parent hierarchy, and use **+ Add** to create a Folder, camera, light or built-in primitive. |
| Project > Explorer | Browse project files, script assets and imported models. Filesystem drag moves do not update script registrations or companion metadata; maintain references and sidecars explicitly. See [Explorer and assets](/docs/guides/editor/explorer). |
| Inspector | Edit the selected object’s name, transform, primitive parameters, attributes, camera/light settings and script attachments. |
| Console | Read editor/runtime messages and source diagnostics. **Copy** copies output; **Clear** clears the visible log. Click a source location to open the external editor. |

A folder organizes hierarchy; a primitive is renderable geometry. A script component connects an asset to an object; the same script can have separate state on different objects. Use **+ Add Component** to attach an existing behavior rather than editing scene data by hand. Public properties must be declared with compatible types; see [Public properties](/docs/api/properties).

## Viewport navigation

These controls apply to the authoring viewport when hovered/focused and no text field captures keyboard input:

| Control | Action |
| --- | --- |
| F / **Frame (F)** | Frame the selected object. |
| Home / **Reset (Home)** | Reset the editor camera. |
| Mouse wheel | Dolly toward/away from the scene. |
| Middle-button drag | Orbit; Shift + middle drag pans. |
| Right-button drag | Orbit the view. |
| WASD | Fly the authoring view. |
| Q / E | Pan horizontally. |

The toolbar selects transform operations; Inspector provides numeric edits for precise values. The authoring view is independent of the scene camera. Select a camera and use **Align to editor view** to match it to your current composition. Cameras look along local **+Z**; lights of directional/spot type shine along local **+Z** too.

## Basic modelling and properties

Use **Project > Scene > + Add** for primitives, then edit dimensions/segments in Inspector. Transform scale multiplies primitive dimensions. **Anchored** prevents simulated gravity and **Can collide** enables primitive solid response when both objects enable it. **CanTouch** is stored but does not dispatch touch events.

Boolean/negation and mesh separation tools are not exposed by the inspected editor. Do not confuse parenting, primitive generation or physics box intersections with a mesh Boolean workflow. Preserve source models and use external modelling software for operations absent from this build.

## Assets and file management

Keep project assets inside `assets/` and script source inside the language-appropriate directories. The import pipeline generates `.rmeta` sidecars with stable IDs and derived artifacts; preserve sidecars when moving assets. Supported model paths in runtime instancing include OBJ, glTF, GLB and FBX. glTF dependencies must remain inside the permitted asset tree. Use [Scene objects](/docs/guides/scene-objects) and [Asset pipeline](/docs/open-source/engine/architecture) for path and validation details.

Explorer supports model-file workflows; this guide does not assume a generic **Import model** wizard or a texture-to-material drag operation is available. Adding a model file is different from Project Manager’s **Import project**. Imported meshes currently need a separate primitive collision proxy.

## Materials, lighting and cameras

Primitive Color is editable in Inspector. Environment settings control a 2:1 sky panorama, ambient/sun lighting and haze; use [Sky and atmosphere](/docs/guides/scene-environment). Point, directional and spot light controls are covered in [Cameras and lights](/docs/guides/cameras-and-lights). The inspected editor states that shadow casting is not supported and limits scenes to 32 lights.

For animation, follow [Imported animation](/docs/guides/gameplay-actions/imported-animation) and the [Animation reference](/docs/api/animation). Script-driven playback and blending do not establish a complete visual animation timeline editor.

## Scene management and saving

The first project opens a default scene. Use **File > Save scene** after authoring edits. **File > Game Settings…** includes **Autosave scene**; save settings explicitly. Generated cache files are not substitutes for saved scene/source assets. Current scene paths use `scene/{name}.scene`; legacy `scenes/*.rscene` files remain supported and saved in place. See [Scene System](/docs/open-source/engine/scene-system) for migration and recovery.

## Playtesting and debugging

**Play**, **Pause/Resume**, **Frame Advance**, **New Window**, **Standalone**, and **Stop** are playtesting controls. Read-only runtime values may be inspected during Play. Stop opens a review of changed authoring properties when applicable; **Discard** keeps the authored scene and applying changes is explicit/undoable. Read [Playtesting and publishing](/docs/building/publishing) before interpreting Standalone as export.

Follow [Your first playable scene](/docs/tutorials/first-game) for exact object, camera, script and physics setup. No new screenshots are included: this audit has no verified capture of the native editor.
