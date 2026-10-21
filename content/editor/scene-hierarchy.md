# Scene hierarchy

Prerequisites: open a writable project, stop Play, and switch the **Project** panel to **Scene**.

## Change scenes

1. Keep your scene files in the project's scenes folder: `scene/` for new projects, or the configured `scenes/` folder in older projects. Both `.scene` and legacy `.rscene` files are supported, including files in subfolders. To try a second scene, save the current scene, then copy `scene/main.scene` to `scene/night.scene` using your file manager.
2. In the **Project** panel, click the **settings gear** at the top right, open **Change scene**, and select a scene. The list shows paths relative to the scenes folder and highlights the current scene. New files appear after the background project scan, normally within a few seconds.
3. The editor saves pending changes to the scene you are leaving, even when autosave is off. It then replaces the hierarchy and viewport with the selected scene's objects, cameras, lights, script attachments and environment. Selection and undo history start fresh. Check Console for `Loaded scene`.
4. Edit **Scene sky & atmosphere** in Inspector and save. Switch back and forth to verify that each scene retains its own sky, ambient light, sun and haze settings. Play, Play Solo and Run use the scene currently selected in the editor.

Stop play and resolve **Review runtime changes** before switching; **Change scene** is disabled until then. Read-only projects can switch scenes for inspection, but cannot save edits. If loading the target or saving local edits fails, the current scene stays open with its edits intact; inspect Console for `Could not change scene` and fix the reported path, scene data or write-permission issue. Scene files outside the configured scenes folder are not listed. Reopening the project loads its saved start scene. Projects without an explicit choice keep using `main.scene` (or legacy `main.rscene`).

## Rename a scene or set the start scene

1. Open **Project → settings gear → Change scene**, then right-click a scene's filename (or two-finger click on a trackpad). This opens a second menu with **Rename** and **Set as start scene**. Right-clicking does not load the scene.
2. Choose **Rename**, enter a new filename, then click **Rename** or press **Enter**. You may omit the extension; the original `.scene` or `.rscene` extension is retained. **Cancel** or **Escape** leaves it unchanged. Names cannot contain directory separators or overwrite another scene or its recovery/metadata files. Errors stay visible in the dialog so you can correct the name.
3. Renaming the active scene saves pending edits first and keeps its selection and undo history. Later saves use the new filename. Recovery backups and asset metadata move with the file. Renaming a different scene leaves your current edits untouched. If the renamed scene was the start scene, its saved reference follows the rename automatically, including the default main scene.
4. Choose **Set as start scene** to save that scene as the project default. The list marks it **Start**. This choice does not switch the scene you are editing; close and reopen the project to verify that its objects and environment load first. Play, Play Solo and Run continue to use the currently edited scene.

Both actions require writable access and are unavailable during play or runtime-change review. The start choice is stored in `project.engine` as `start_scene: Some("night.scene")`, relative to the configured scenes folder. If a start scene is removed outside the editor, restore it at that path or correct the field in `project.engine`; removing the optional `start_scene` field restores the main-scene default. The editor reports a missing explicit start scene instead of silently creating an empty replacement. File renames are filesystem operations and are not reverted by scene Undo.

## Create and organise objects

1. Choose **+ Add → Folder** to create an organisational folder. Select the folder before adding children.
2. Choose **+ Add** and a primitive, **Camera** or **Light**. New items are parented to the selected folder, if one is selected.
3. Click the object's tree row. Inspector shows its name, persistent entity identifier and available components.
4. Click the object name to edit it inline, then press **Enter** or click elsewhere to save (**Escape** cancels). You can also edit the name field at the top of Inspector. Use descriptive names; scene lookup examples depend on the names and hierarchy you choose.
5. Press and hold on an item name, then drag it onto a folder to reparent it, or onto the root drop zone to move it to the scene root. Invalid parenting, including cycles, is rejected; inspect Console for errors.
6. Choose **File → Save scene**.

Expected result: the tree reflects the new name and hierarchy, Inspector tracks selection, and the saved scene retains the edits. Use **Edit → Undo** to revert an accidental authoring edit.

## Objects and components

An entity combines a transform with the components appropriate to its role: primitive or imported mesh, camera, light, folder, and/or gameplay scripts. A script attachment refers to a registered Script ID, not copied source text. Entity IDs and asset IDs identify different things; names are the human-readable scene lookup convention.

## Known limitations

Right-click an object (or two-finger click on a trackpad) for **Copy**, **Cut**, **Paste**, **Delete**, **Use World Space** and **Use Local Space**. Copy captures the object and its descendants; Paste gives them fresh entity IDs and preserves their internal parent links. Paste on an object makes the pasted root its child; right-click empty tree space for **Paste at Scene Root**. Cut moves the original tree only after a successful Paste. Delete removes the object and its descendants. Rename, Paste, Cut/Paste and Delete support **Edit → Undo/Redo** and are disabled during Play or read-only access.

World/Local space changes the active gizmo's axes without modifying the stored transform. Copied scripts and other components keep their existing asset references; embedded entity IDs in arbitrary component data are not rewritten. There is no Delete-key shortcut. Creating a folder does not create a filesystem directory, and moving a scene object does not move its source asset.

Related: [Inspector](/docs/guides/editor/inspector), [scene lookup API](/docs/api/scene), [scene object scripting](/docs/guides/scene-objects).
