# Scene hierarchy

Prerequisites: open a writable project, stop Play, and switch the **Project** panel to **Scene**.

## Create and organise objects

1. Choose **+ Add → Folder** to create an organisational folder. Select the folder before adding children.
2. Choose **+ Add** and a primitive, **Camera** or **Light**. New items are parented to the selected folder, if one is selected.
3. Click the object's tree row. Inspector shows its name, persistent entity identifier and available components.
4. Edit the name field at the top of Inspector. Use descriptive names; scene lookup examples depend on the names and hierarchy you choose.
5. Drag a tree item onto a folder to reparent it, or onto the root drop zone to move it to the scene root. Invalid parenting, including cycles, is rejected; inspect Console for errors.
6. Choose **File → Save scene**.

Expected result: the tree reflects the new name and hierarchy, Inspector tracks selection, and the saved scene retains the edits. Use **Edit → Undo** to revert an accidental authoring edit.

## Objects and components

An entity combines a transform with the components appropriate to its role: primitive or imported mesh, camera, light, folder, and/or gameplay scripts. A script attachment refers to a registered Script ID, not copied source text. Entity IDs and asset IDs identify different things; names are the human-readable scene lookup convention.

## Known limitations

The current scene tree has no verified Delete command or Delete-key handler. Do not assume another engine's deletion shortcut works here. Removal APIs in the world model are not evidence of an editor control. Creating a folder does not create a filesystem directory, and moving a scene object does not move its source asset.

Related: [Inspector](/docs/guides/editor/inspector), [scene lookup API](/docs/api/scene), [scene object scripting](/docs/guides/scene-objects).
