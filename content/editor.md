# Editor overview

The Rustic editor is a native application for authoring scenes and running gameplay. **Docs v0.1** is the documentation edition; it is separate from Script API 1.0/1.1. Start with an installed editor and runtime, or follow the [source setup](/docs/open-source/engine/getting-started) if you are building Rustic yourself.

## Open and save a project

Prerequisites: a working desktop graphics session and a writable project location.

1. In Project Manager, choose **New project**, enter a name and location, choose a template, then **Create project**. For an existing project, choose **Import…**, select its location, and **Import project**.
2. Choose **Open project**. The editor shows the project name in the toolbar. A locked project may open read-only; the **READ ONLY** indicator means authoring changes cannot be saved.
3. Use the **Project** panel's **Scene** tab for objects and **Explorer** tab for files. Select an object to show its properties in **Inspector**. The settings gear at the top right of Project opens **Change scene**, which loads another scene with its objects and environment. Right-click a scene in that list for **Rename** and **Set as start scene**; the start choice is saved for the next project opening.
4. Save with **File → Save scene**. Check Console for `Scene saved transactionally` or a save error. Game Settings exposes autosave; when enabled, changed scenes are saved automatically, with a periodic save check at 30 seconds.

Expected result: your project opens with its scene, and a successful save persists authored changes. Save explicitly before closing or copying a project.

## Layout, panels and toolbar

The workspace includes 3D/2D viewports, Game Project Explorer, Inspector and Console. Drag panel tabs to change docking. **View → Reset dock layout** restores the default dock arrangement. **View** includes egui's built-in dark/light/system theme controls and can open a missing 3D or 2D viewport or the **Scene Graph** and offers **Inspector on native viewport**. Workspace preferences persist, but this does not promise that every arbitrary dock geometry survives reopening.

**File** contains scene saving, Game Settings and renderer refresh. **Edit** provides Undo/Redo. **Programming** creates and attaches scripts, opens an external code editor, and offers Reload Scripts/Restart Play while running. **Move**, **Rotate** and **Scale** select the gizmo operation. The Play toolbar controls runtime sessions.

The editor and Project Manager use standard [egui](https://www.egui.rs/#demo)
widgets and built-in themes. Panel docking uses
[egui_tiles](https://github.com/rerun-io/egui_crates/tree/main/crates/egui_tiles),
transform handles use [transform-gizmo](https://urholaukkarinen.github.io/transform-gizmo/),
and Scene Graph uses [egui-snarl](https://zakarumych.github.io/egui-snarl/).

### View the scene as a graph

1. Open a project and choose **View → Open Scene Graph**.
2. Each scene entity appears as a node. Wires run from a parent's **Children** pin
   to its child's **Parent** pin.
3. Click a node's name to select its entity in Inspector. Drag node headers to
   arrange the view; use egui-snarl's canvas pan and zoom gestures to navigate.
4. Create, rename, delete, or reparent objects in **Project → Scene**. Return to
   Scene Graph to see the updated hierarchy.

Expected result: the graph reflects the loaded scene and shares Inspector
selection. An empty scene displays guidance to add an object. Graph node
positions last while the scene remains loaded; wire gestures do not change parenting.
Use the Project scene tree to change parent links and the normal Undo/Redo menu
to undo those edits. This view does not execute visual scripts.

Interface controls, folders and non-script file types use bundled Lucide icons.
Script and programming-language icons keep their existing designs. Move, Rotate,
Scale and playback controls still have text labels. Icons work offline without
installing a font or downloading an icon pack.

## Focused workflows

- [Scene hierarchy](/docs/guides/editor/scene-hierarchy): create, select, name and parent objects.
- [Explorer and assets](/docs/guides/editor/explorer): import models, manage files and diagnose asset errors.
- [Inspector](/docs/guides/editor/inspector): transforms, attributes and script attachments.
- [Viewport tools](/docs/guides/editor/viewport): camera navigation, picking and gizmos.
- [Cameras, lighting and environment](/docs/guides/editor/cameras-lighting): prepare the game view.
- [Playtesting and debugging](/docs/guides/editor/playtesting): pause, step, read diagnostics and review runtime changes.
- [First playable scene](/docs/tutorials/first-playable-scene): a short beginner walkthrough.

## Known limitations

Scripts open in an external editor, rather than an embedded code panel. A panel label or legacy workspace schema does not establish an implemented control. The focused guides describe controls verified in `Engine/apps/editor/src/main.rs` and the authoring document model.
