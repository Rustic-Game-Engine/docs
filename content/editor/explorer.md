# Explorer and asset management

Prerequisites: a writable project and an existing asset file. Stop Play before reorganising project files. Switch **Project → Explorer** to browse directories; **Filter** matches names and project-relative paths.

## Import a model

1. Copy the model and its companion files into the project with your operating system's file manager. Keep glTF buffers/textures and OBJ dependencies in their required relative locations.
2. Find the model in Explorer. The viewport accepts `.obj`, `.gltf`, `.glb` and `.fbx` model drops.
3. Drag the file into the authoring viewport. The editor imports it, creates/reads its `.rmeta` sidecar and uses its Asset ID for scene instances.
4. Inspect the created object, save the scene and check Console for import errors.

Expected result: an imported model appears as a scene object. A recognised extension alone does not guarantee that every file variant is supported. Keep the original source and metadata together; regenerating metadata may change identity.

## Files and scripts

The project separates assets, scenes, scripts, `ui/` Web assets, and configuration. **Programming → Object Component Script** creates and registers a script for the selected object; global and scene startup scopes also exist. Existing registered scripts can be attached through **Programming → Attach Existing Script** or Inspector. Double-clicking a script opens the external editor; right-click offers attachment scopes. See [the scripting guides](/docs/scripting/lua) for each language's setup, including Luau registration and optional external runtimes.

## Move or rename assets carefully

Explorer supports dragging a file/directory to another project directory, including the root. The move rejects unsafe paths, missing destinations, name collisions and moving a directory into itself. **The current move performs a filesystem rename only:** it does not migrate manifest paths, scene references, companion files or sidecar metadata. Back up first and update affected references before Play.

There is no verified inline asset-rename control. Rename using the file manager only when you can also maintain those references. Preserve `.rmeta` alongside its source. Do not hand-edit scene attachments to contain script paths instead of registered IDs.

## Known limitations and diagnosis

- `.rmeta` entries and generated/build/cache directories are filtered from the tree; a hidden entry is not necessarily missing from disk.
- For missing files, check the project-relative path and filename case, then dependent buffers/textures.
- For importer failures, inspect Console and the [asset pipeline](/docs/open-source/engine/architecture) limitations.
- For attachment failures, check `config/scripts.ron`, scope, language and toolchain; copying a script into a folder alone does not register it.

Related: [Inspector](/docs/guides/editor/inspector), [Playtesting](/docs/guides/editor/playtesting).
