# Engine architecture and source layout

Rustic separates native applications from reusable engine services. Use this map to locate a change and understand which boundaries it crosses before editing code. The [architecture baseline](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/ARCHITECTURE.md) describes both current decisions and future scope; the actual workspace manifest and source determine what is implemented today.

## Applications and process boundaries

| Directory under Engine/ | Responsibility | Useful questions when changing it |
| --- | --- | --- |
| `apps/project-manager/` | Creates/imports projects and launches the editor | Does project opening remain reproducible? |
| `apps/editor/` | Native authoring application | Does an edit remain undoable and persistent? |
| `apps/runtime/` | Game execution outside the editor process | Does Play start, stop, and recover correctly? |
| `apps/asset-worker/` | Asset-processing executable | Are import failures contained and reported? |
| `apps/agent-backend/` | Agent integration executable | Are request boundaries and diagnostics preserved? |
| `apps/luau-host/` | Separate bundled Luau host | Does the host match its scripting adapter? |

The launcher, editor, runtime, and workers are distinct native processes. A change that looks local may affect process startup, versioned messages, supervision, or packaging. Trace both sender and receiver before changing a cross-process message.

## Reusable crates

| Crate | Development focus |
| --- | --- |
| `engine-core` | Shared foundations and services |
| `engine-platform` | Platform integration |
| `engine-project` | Project model and persistence |
| `engine-world` | Scene and entity model |
| `engine-editor` | Authoring UI and editor behavior |
| `engine-play` | Play execution and gameplay services |
| `engine-assets` | Importing, catalogs, and derived data |
| `engine-scripting` | Script identities, adapters, SDKs, and execution |
| `engine-rhi` | Engine-owned graphics/resource interface |
| `renderer-wgpu` | wgpu rendering backend |

The engine UI uses Rust/egui rather than Electron. GPU shaders use WGSL. Keep backend-specific graphics details behind the rendering interface and platform-specific behavior in the platform boundary rather than spreading them through editor panels.

## Workspace and dependency boundaries

[Engine/Cargo.toml](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/Cargo.toml) lists the workspace members, shared dependencies, lints, and profiles. It uses Rust edition 2024 and resolver 3. `apps/luau-host` is built separately through its own manifest; do not assume a plain workspace build covers it.

The current workspace forbids unsafe code through its Rust lint policy. An architecture paragraph discussing future audited FFI does not grant an exception to the actual lint configuration. Read both the design document and the package manifest before introducing a dependency or changing a boundary.

## Trace a feature through the source

For an editor feature, start with the relevant authoring code, find the project/scene data it reads, and follow how a change becomes persistent and undoable. For a Play issue, reproduce in a disposable project, then inspect the runtime and `engine-play` rather than assuming the editor process executes all game logic.

For an asset issue, distinguish the original project asset from derived import/cache data. For a graphics issue, inspect the engine-owned render model before changing the backend implementation.

Use `rg` to find the relevant types and tests:

```sh
rg --files crates/engine-editor apps/editor
rg -n 'struct |enum |trait ' crates/engine-world/src
rg -n '#\[test\]' crates/engine-play
```

These are discovery commands, not claims about a specific feature's entry function. Follow call sites from the actual symbol you are investigating.

## Design decisions and current limits

A change to an architectural decision needs a short record in `Engine/docs/decisions/`. Record the problem, new boundary, migration effect, and rollback plan. Check the roadmap and acceptance status before documenting a planned feature as available.

For example, the architecture baseline describes full physics backends and build/export interfaces beyond the current task runner. Current Play physics uses the implemented basic simulator; use the [physics guide](/docs/guides/physics) for its limits. See [Build tools](/docs/open-source/engine/tooling) for commands the runner currently accepts.

Next: [Extending the engine](/docs/open-source/engine/extending).
