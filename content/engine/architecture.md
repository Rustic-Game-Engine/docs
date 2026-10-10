# Architecture

Rustic separates authoring, execution, rendering, and asset processing through engine-owned interfaces. The [architecture baseline](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/ARCHITECTURE.md) includes long-term decisions; the Cargo workspace and implementation are the authority for available modules.

## Applications and process boundaries

| Process | Responsibility | Source |
| --- | --- | --- |
| Project manager | Create/import projects and launch the editor | `Engine/apps/project-manager/` |
| Editor | Author scenes, manage selection, present panels and Play controls | `Engine/apps/editor/` |
| Runtime | Execute an isolated Play snapshot and report frames/diagnostics | `Engine/apps/runtime/` |
| Asset worker | Decode and process asset work across a worker boundary | `Engine/apps/asset-worker/` |
| Agent backend | Editor agent integration services | `Engine/apps/agent-backend/` |

`engine-play` owns authenticated local IPC, snapshot staging, runtime supervision, simulation, and runtime-change transactions. The editor remains the authoring owner; a runtime executes a snapshot rather than modifying live project files. Applying runtime changes is an explicit undoable operation.

## Systems and ownership

`engine-world` wraps ECS storage, scene hierarchy, components, persistence, and render extraction. `engine-rhi` owns graphics contracts and selection policy; `renderer-wgpu` implements the GPU adapter. `engine-assets` owns metadata, importers, dependency indexing, and derived artifacts. `engine-scripting` owns language discovery, manifests, adapters, SDKs, and behavior execution. `engine-editor` owns reusable document, workspace, locking, viewport, and console models.

The current primitive physics simulator lives in `engine-play`; do not assume the proposed third-party physics architecture has replaced it. Read [Basic physics](/docs/guides/physics) and the gameplay physics implementation when changing simulation.

## Changing a boundary

Keep backend types and language VM values inside their adapters. Move expensive compilation/import work away from UI and rendering callbacks. Preserve stable IDs, versioned messages, and recoverable persistent writes. Changes to baseline decisions require an architecture decision record in `Engine/docs/decisions/`; implementation changes within an existing boundary usually do not.

Use [Project Structure](/docs/open-source/engine/project-structure) to locate modules and [Extending the Engine](/docs/open-source/engine/extending) to plan a focused addition.
