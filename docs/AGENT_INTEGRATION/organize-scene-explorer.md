# Organize the scene explorer with AI

[Back to AI agents & app data](/docs/guides/ai-agents).

The bundled `rustic-scene-explorer` skill teaches agents how to organize the
scene explorer (Hierarchy panel), create folders and add, duplicate or delete
objects. These operations work directly through the plugin and the editor's undo
system. They do not require clicking the explorer through computer use.

## Setup and inspect

Open the game in the writable Rustic editor, reload the updated `rustic-workspace`
MCP connection and select the game with `workspace_info`. Call
`scene_explorer_guide` with `{}` to read the current skill, including on upgrades
that preserve customized agent instructions. The skill is also installed in
Rustic app data for Codex, Claude and the Codex plugin. Existing customized skill
files are preserved.

Call `editor_status` with `{}` before changing the hierarchy. Each object has an
`entity_id`, `name`, `parent` (an object UUID or null) and `folder` flag. Use these
UUIDs to distinguish similarly named objects. `scene_summary` also reports folder
flags for saved files; use live status for unsaved edits.

A scene folder is an organizational entity in the active scene, not a directory
on disk. File tools cannot create explorer folders by making asset directories.
This guide concerns scene hierarchy layout; editor dock/tab placement is a
separate preference.

## Lay out useful groups

Use a small, shallow structure that matches the game. For example, World might
contain Buildings and Vegetation, while Gameplay holds actors, triggers and spawn
points, with Lighting and UI as other top-level groups. Reuse existing naming
conventions and avoid creating empty groups without a purpose.

Folders do not contribute translation, rotation or scale to their descendants.
Changing a folder's transform does not move its contents. Use an ordinary empty
root object for an assembly that should move as a group.

Reparenting retains the child's **local** transform. Changing its non-folder
ancestors can change world placement: a folder adds no transform of its own, but
still inherits from any ordinary object above it. Inspect the ancestor chain and
calculate the intended local transform when needed. Folder membership does not
change script lifetime or make its children global.

## Create folders and objects

Pass the following to `object_create`:

```json
{"name":"World","kind":"folder"}
```

The returned `entity_id` is the new folder UUID. Create a nested folder with that
UUID as `parent`:

```json
{"name":"Buildings","kind":"folder","parent":"<World UUID>"}
```

The supported kinds are `folder`, `empty`, `camera`, `light` and `blockout`.
Omit `parent` or pass null to create at scene root. Use `model_create` for finished
visible mesh assets, then parent the returned model object with `object_update`:

```json
{"entity_id":"<model UUID>","properties":{"parent":"<Buildings UUID>"}}
```

Rename a folder or object through `object_update` with `properties.name`.
Use `properties.parent:null` to move it back to scene root. Missing parents,
invalid IDs and cycles are rejected without partially changing the hierarchy.

## Duplicate an object or a folder subtree

Call `object_duplicate`, for example:

```json
{"entity_id":"<Buildings UUID>","name":"Buildings copy"}
```

The entire subtree is copied with fresh object UUIDs and preserved internal
parent links, folder flags, local transforms and components. The source is
unchanged. By default the new root is a sibling under the original parent.
Supply `parent` to choose another destination, or `parent:null` for scene root.
`name` optionally renames only the copied root.

The response contains the copied root `entity_id`, all new `entity_ids`, the
`source_entity_id` and `saved:false`. Use the **new** IDs to edit the copy. The copy
initially overlaps the original when using the same parent and transforms; move
it through `object_update` if that is not intended. A different parent can change
world placement because local transforms are retained.

Mesh/material asset IDs and script source IDs stay shared. Script attachments
and their properties are copied, but arbitrary entity references inside script
properties are not automatically rewritten to the new objects. Inspect those
references when making the copy independent.

## Delete and recover

Inspect the target's descendants using `editor_status`, then call
`object_delete`:

```json
{"entity_id":"<obsolete object or folder UUID>"}
```

Deleting a folder or object removes **every descendant**, as one undoable edit.
To keep children, move them to a surviving parent first. The response lists
`deleted_entity_ids` and `saved:false`. Asset files, script source files, global
scripts and scene startup lists are not deleted.

`editor_undo` restores the deleted subtree with its IDs and parent links;
`editor_redo` deletes it again. Creation, duplication and reparenting also support
scene undo/redo. A duplicate operation is one undo step, including its optional
root name and parent.

## Verify and save

Re-read `editor_status` after changes to verify folder flags, parents and copied
IDs. Inspect the scene with `viewport_capture` to catch unintended placement
changes. Call `scene_save` to persist the hierarchy; these tools initially edit
the unsaved active scene. Refresh IDs after switching scenes.

Stop play and resolve pending runtime-change review before editing. Read-only
editors cannot mutate the scene. If a tool is missing, update/reopen Rustic and
reload its MCP connection. If an operation fails, inspect status and correct the
ID or parent; do not modify a stale saved scene behind unsaved editor work or
claim a hierarchy change succeeded.
