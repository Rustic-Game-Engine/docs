# Good development starting points

[Back to Engine repository](/docs/open-source/engine).

| Area you want to change | Start here | What to inspect |
| --- | --- | --- |
| Project creation and launcher | `Engine/apps/project-manager/`, `Engine/crates/engine-project/` | Templates, project descriptors, and opening the editor |
| Editor panels and interaction | `Engine/apps/editor/`, `Engine/crates/engine-editor/` | Docked UI, selection, authoring, and undo |
| Game execution and Play | `Engine/apps/runtime/`, `Engine/crates/engine-play/` | Runtime process, Play sessions, and supervision |
| Scenes and entities | `Engine/crates/engine-world/`, `Engine/crates/engine-core/` | Entity hierarchy, components, and shared services |
| GPU rendering | `Engine/crates/engine-rhi/`, `Engine/crates/renderer-wgpu/` | Engine-owned graphics interface and backend |
| Asset import | `Engine/apps/asset-worker/`, `Engine/crates/engine-assets/` | Importers, catalogs, and derived data |
| Gameplay languages and API | `Engine/crates/engine-scripting/`, `Engine/apps/luau-host/` | Language hosts, runtime adapters, and conformance tests |

A useful first change is a focused editor improvement or a small scripting fix with a reproducible example. Trace the current behavior, read nearby tests, change one boundary at a time, and update both engine-local and published guides when behavior changes. Read [CONTRIBUTING.md](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/CONTRIBUTING.md) and the repository's agent instructions before implementation.
