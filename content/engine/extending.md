# Extending the Engine

Start with a small change inside an existing ownership boundary. Rustic exposes engine-owned contracts around world data, graphics, assets, scripting, and Play; keep third-party APIs behind their adapters.

## Add functionality in the right module

| Addition | Implementation starting point | Verification focus |
| --- | --- | --- |
| Editor tool/panel | `apps/editor`, reusable models in `engine-editor` | Selection, undo, saved layout, empty/error states |
| Scene component | `engine-world` components and serialization | Validation, round trip, migration, extraction |
| Asset importer | `engine-assets` importers/pipeline and worker | Malformed input, size limits, metadata, cache invalidation |
| Gameplay API | `engine-scripting` bindings/SDKs and `engine-play` services | Every supported adapter, lifecycle, invalid/stale targets |
| GPU feature | `engine-rhi` contracts and `renderer-wgpu` | Resource lifetimes, unsupported features, fallback |
| Developer command | `tools/xtask` | Help text, errors, platform paths, reproducibility |

Read nearby implementation and tests before designing a new module. Declare shared dependencies in the workspace manifest and keep dependency/license policy accurate. Add a crate only when its public boundary or build dependencies warrant one.

## Persistence and custom tooling

Version persisted data and protocol changes deliberately. Preserve unknown data and read-only recovery, and use staged, flushed, atomic writes for authored files. Tools must resolve paths through project services and preserve user-owned files; caches and generated files should remain rebuildable.

For a scripting API addition, expose the common behavior through language SDKs, test adapter conformance and errors, and update generated declarations plus [published API content](/docs/open-source/docs/code-examples). A working Lua binding alone does not establish all-language support.

## Extension boundaries and review

The architecture describes versioned native/Wasm plugin boundaries and capabilities as a long-term direction. Do not assume a general-purpose stable plugin loader exists merely because those interfaces are proposed. For current custom tooling, make a reviewed source change at an implemented boundary.

Record an architecture decision when changing a baseline decision. Include migration and rollback effects, demonstrate a concrete use case, run relevant quality checks, and update the engine-local and website guides. See [Contributing](/docs/open-source/engine/contributing).
