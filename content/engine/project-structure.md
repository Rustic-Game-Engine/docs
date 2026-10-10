# Project Structure

The Git repository contains the Rust workspace in `Engine/`. Workspace membership is declared in `Engine/Cargo.toml`; use it instead of the architecture document's proposed directory tree when locating implemented modules.

## Repository source map

```text
engine/
  .github/workflows/       Repository quality and installer workflows
  Engine/
    Cargo.toml             Workspace members, dependencies, and profiles
    Cargo.lock             Locked Rust dependencies
    rust-toolchain.toml    Pinned compiler and tools
    .cargo/config.toml     Cargo aliases, including xtask
    apps/                  Native application entry points
    crates/                Reusable engine systems
    tools/xtask/           Rust build and validation orchestration
    tools/                 Windows packaging and language tooling
    installer/             Inno Setup installer definition
    assets/                Engine-owned visual resources
    docs/                  Engine-local guides and decisions
```

`apps/luau-host/` is built separately by xtask; it is not a normal member of the main workspace. The documentation website is in the separate [docs repository](/docs/open-source/docs), not inside this build.

## Choose a module

| Module | What belongs here |
| --- | --- |
| `engine-core` | Shared identity, errors, diagnostics, and core services |
| `engine-project` | Project descriptors, templates, and safe project paths |
| `engine-platform` | Platform configuration and native services |
| `engine-world` | ECS hierarchy, components, scenes, undo, and extraction |
| `engine-assets` | Source metadata, import pipeline, index, and artifacts |
| `engine-rhi`, `renderer-wgpu` | Graphics contracts/policy and concrete implementation |
| `engine-scripting` | Script manifests, language hosts, SDKs, and execution |
| `engine-play` | Snapshot, IPC, supervision, simulation, physics, and gameplay services |
| `engine-editor` | Documents, workspace layout, locking, console, and view models |

Shared crates should not depend on application entry points. Split a new crate when ownership or platform/build dependencies justify it, rather than creating empty modules for every planned subsystem.

## Game project files

A game project is distinct from engine source. `project.engine` describes it; scripts and assets are user-owned content. Current authored scenes use `scene/{scene-name}.scene`, while older `scenes/*.rscene` projects remain supported. Generated programming support lives under `.rustic/generated/programming/`. See [Scene System](/docs/open-source/engine/scene-system) and [Gameplay programming](/docs/guides/gameplay-programming) before changing those formats.
