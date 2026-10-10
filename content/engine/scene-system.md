# Scene System

`engine-world` owns the live ECS world and the versioned scene document. A scene combines stable entity identities, parent hierarchy, components, environment settings, startup scripts, and additive-instance mappings.

## Objects and components

`SceneWorld` hides the underlying bevy_ecs storage. Entity snapshots include transforms and optional mesh/material references, cameras, lights, primitives, script components, and part attributes. Stable IDs connect authored objects and assets across saves; display names and hierarchy paths are convenient lookups, not replacements for those identities.

World commands and undo transactions should validate hierarchy and component data before committing changes. Additive scene instantiation remaps entity IDs and internal parent references so multiple copies can coexist. See [Edit scene objects](/docs/guides/scene-objects) for gameplay lookup and [Cameras & lights](/docs/guides/cameras-and-lights) for view components.

## Loading and storage

Current authored paths use `scene/{scene-name}.scene`. Existing `scenes/*.rscene` projects are supported and saved in place. The serializer in `Engine/crates/engine-world/src/scene.rs` uses a deterministic RON envelope with resource kind, schema version, scene ID, components, and checksum.

The current scene schema is version 2. Version 1 migrates in memory; future schema versions open read-only. Unsupported component data is preserved with diagnostics where possible. Invalid values or checksum failures must not silently become writable healthy scenes.

`save_scene_atomic` validates and stages output, flushes it, installs it atomically, and retains a backup. `load_scene_recovering` can use that backup when the primary file is missing or invalid. Preserve these paths when adding fields or changing persistence.

## Editor and runtime ownership

The editor owns the authored document. Play starts from an immutable staged snapshot and creates a separate runtime world. Stopping Play does not automatically overwrite the authored scene; the runtime-change review/apply operation is explicit and undoable.

For a scene-format change, test round trips, deterministic ordering, old-version migration, unknown data, invalid components, failed saves, and backup recovery. Update both the engine-local guide and published documentation when user-visible behavior changes.
