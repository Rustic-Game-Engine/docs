# Scene hierarchy

Prerequisites: open a writable project, stop Play, and switch the **Project** panel to **Scene**.

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
