# Engine repository

[Open the engine repository on GitHub](https://github.com/Rustic-Game-Engine/engine).

Rustic Game Engine is a native 2D/3D game engine and editor under active development. Its Rust workspace lives in `Engine/`; the repository root is not a Cargo workspace. It includes a project manager, authoring editor, runtime, asset worker, scene model, rendering, and gameplay scripting. It is the starting point for modifying the engine itself or building your own engine version.

## Languages and architecture

The implementation is **Rust**, with `egui` for native UI, `winit` for desktop surfaces, and an engine-owned rendering interface backed by `wgpu`. GPU shaders use **WGSL**. Windows installer and language-toolchain automation use **PowerShell**.

The engine implementation language is separate from the languages used to write games. Gameplay adapters support Lua, Luau, JavaScript, Python, C, C++, C#, Java, PHP, and HTML/CSS with inline JavaScript, subject to the behavior and restrictions in each [scripting guide](/docs/scripting/lua).

Project manager, editor, runtime, and asset worker are distinct native processes. Read the [architecture document](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/ARCHITECTURE.md) before changing those boundaries and the [roadmap](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/ROADMAP.md) before expanding scope.

## Prerequisites

- Git and a Rust installation managed by `rustup`. The checked-in `Engine/rust-toolchain.toml` currently pins **Rust 1.98.0** with `rustfmt` and `clippy`; use the file's version if it changes.
- A native compiler and linker for your platform. On Windows, use the MSVC Rust toolchain with Visual Studio C++ Build Tools and a Windows SDK.
- On Linux, install the window-system and graphics dependencies used by the engine CI. The Ubuntu package command below mirrors that workflow.
- `cargo-deny` **0.20.2** for the workspace's dependency and license checks.
- A working desktop graphics environment to launch the editor. Some headless tests still render frames; CI uses Mesa's CPU Vulkan driver.
- Optional language toolchains for games using Python, C/C++, C#, Java, or PHP. Lua 5.4, Luau, JavaScript/QuickJS, and Web support are bundled; you do not need every optional language to start.

Ubuntu native dependencies:

```sh
sudo apt-get update
sudo apt-get install --yes build-essential libwayland-dev libxkbcommon-dev libx11-dev libxcursor-dev libxi-dev libxrandr-dev libegl1 libgl1-mesa-dri mesa-vulkan-drivers
```

The [quality workflow](https://github.com/Rustic-Game-Engine/engine/blob/main/.github/workflows/quality.yml) is the reference for current Windows/Linux build and test environments. Read the [language guides](/docs/scripting/python) before installing an optional scripting SDK.

## Fork, build, and run your own version

Fork the repository on GitHub, then replace `YOUR_ACCOUNT` below:

```sh
git clone https://github.com/YOUR_ACCOUNT/engine.git
cd engine/Engine
git switch -c my-engine-change
rustup show active-toolchain
cargo install cargo-deny --locked --version 0.20.2
cargo xtask doctor
cargo xtask build
cargo xtask run project-manager
```

Rustup selects the repository-pinned toolchain in `Engine/`. `doctor` checks required tools, repository files, dependency policy, and gameplay toolchain availability. `build` builds the bundled Luau host and the workspace. The last command builds the editor, launches the native project manager, and lets you create or import a project and open the editor.

For a distributable optimized build:

```sh
cargo xtask build --profile distribution
```

The task runner accepts `dev`, `dev-fast`, `release`, and `distribution` profiles. Keep project files and persistent data compatible unless your change includes an explicit migration.

## Good development starting points

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

## Main scripts and commands

| Entry point | Purpose | How to use it |
| --- | --- | --- |
| [tools/xtask/src/main.rs](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/tools/xtask/src/main.rs) | Rust task runner, exposed by the `.cargo/config.toml` alias | Run `cargo xtask help` from `Engine/` |
| `cargo xtask doctor` | Checks pinned Rust, Cargo, targets, required files, cargo-deny, and optional gameplay tools | Use before diagnosing a build |
| `cargo xtask build` | Builds the standalone Luau host and locked workspace targets | Add `--profile release` or `--profile distribution` as needed |
| `cargo xtask test` | Builds Luau, runs doctor, formatting, Clippy, tests, checks, dependency audit, and application smoke checks | Use for full local validation |
| `cargo xtask run project-manager` | Builds the editor and launches the launcher | Start creating or importing a game project |
| `cargo xtask run editor` | Runs the authoring application | Consult the application's arguments before opening a project directly |
| [tools/build-windows-installer.ps1](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/tools/build-windows-installer.ps1) | Builds a self-contained Windows installer, preparing pinned Rust/Inno Setup tools when missing | Run on Windows from `Engine/`; output is in `dist/` |
| [tools/manage-language-toolchains.ps1](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/tools/manage-language-toolchains.ps1) | Detects or installs optional scripting tools through Windows Package Manager | Use the installed Language Toolchain Manager, or inspect script parameters for source use |

Windows installer command:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\build-windows-installer.ps1
```

Expect a fresh `dist\RusticGameEngine-Setup-*.exe`. The installer includes the native applications, so end users do not need Rust or Cargo. Optional language installation needs Windows Package Manager. See the [engine README](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/README.md) for installer options and the Windows installer workflow.

## Build a first gameplay behavior

If you want to make a game rather than modify the Rust workspace, begin with [gameplay programming](/docs/guides/gameplay-programming). Follow [Lua's setup and controller example](/docs/scripting/lua), create a script asset, attach it to the intended entity, enter Play, and inspect the console. Then explore [callbacks](/docs/callbacks), [scene objects](/docs/guides/scene-objects), and [gameplay actions](/docs/guides/gameplay-actions).

## Diagnose common setup failures

- Wrong Rust version: run commands in `engine/Engine` and compare `rustup show active-toolchain` with `rust-toolchain.toml`.
- Linker or window-system errors: install native build tools and the platform dependencies above.
- `cargo deny` unavailable: install the pinned `cargo-deny` version and rerun `doctor`.
- An optional gameplay language is reported unavailable: install that language's toolchain and follow its guide; that is different from a missing Rust build prerequisite.
- GUI launch fails in a headless environment: use the CI smoke-test setup or launch in a desktop session with working graphics.

Return to the [open-source repository directory](/docs/open-source) for docs, examples, and hosting SDK guides.
