# Introduction

Rustic Game Engine is a native 2D/3D engine and editor under active development. Use it to author scenes, attach gameplay behaviors, import assets, and run isolated Play sessions. Use the source repository to change the engine, its editor, or its tooling.

## Features available today

- Separate project manager, editor, runtime, and asset worker processes.
- Dockable 2D/3D views, Game Project Explorer, Inspector, Console, undo, and saved workspaces.
- ECS scenes with stable IDs, hierarchy, primitives, cameras, lights, and versioned persistence.
- Incremental asset imports, adjacent metadata, cached artifacts, and an asset index.
- Embedded Play, New Window, Standalone, pause, frame advance, and explicit review of runtime changes.
- Multi-language gameplay scripting with generated SDK/editor support and last-known-good reload.

The engine README describes the M0–M6 foundation. Read the [acceptance status](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/M0-M6_STATUS.md) for qualification gaps and the [roadmap](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/ROADMAP.md) for future work. An architectural proposal does not mean a feature is shipping.

## Technologies

The engine uses Rust 2024, Cargo, and a pinned Rust toolchain. Native UI uses egui/eframe and egui_tiles; native surfaces use winit. The graphics adapter uses wgpu and WGSL behind engine-owned interfaces. bevy_ecs supplies ECS storage, glam supplies math, serde/RON support text resources, and SQLite supports the asset index.

Gameplay languages are separate from the engine implementation: Lua, Luau, JavaScript, Python, C, C++, C#, Java, PHP, and HTML/CSS with inline JavaScript have adapters. Their toolchains and restrictions vary; start with a [language guide](/docs/scripting/lua).

## Choose a starting point

Follow [Getting Started](/docs/open-source/engine/getting-started) to build from source or [Using Rustic Engine](/docs/engine) to make a game. Read [Architecture](/docs/open-source/engine/architecture) before changing subsystem boundaries.
