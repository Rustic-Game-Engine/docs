# Getting Started

Build from the Rust workspace inside `Engine/`, not the repository root. You need Git, rustup, a native compiler/linker, and a desktop graphics environment to launch the UI. The checked-in `rust-toolchain.toml` currently pins Rust 1.98.0 with rustfmt and Clippy.

## Clone and prepare

```sh
git clone https://github.com/Rustic-Game-Engine/engine.git
cd engine/Engine
rustup show active-toolchain
cargo install cargo-deny --locked --version 0.20.2
```

Fork the repository first and clone your fork if you intend to contribute. On Windows, install Visual Studio C++ Build Tools and the Windows SDK for the MSVC toolchain. On Ubuntu, the engine quality workflow uses these native dependencies:

```sh
sudo apt-get update
sudo apt-get install --yes build-essential libwayland-dev libxkbcommon-dev libx11-dev libxcursor-dev libxi-dev libxrandr-dev libegl1 libgl1-mesa-dri mesa-vulkan-drivers
```

## Build and launch

```sh
cargo xtask doctor
cargo xtask build
cargo xtask run project-manager
```

`doctor` checks the pinned compiler, required files, dependency policy, and optional gameplay tools. `build` builds the standalone Luau host and locked workspace. The project-manager command also builds the editor, then opens the launcher. Create or import a game project and open it in the editor.

Optional Python, C/C++, C#, Java, or PHP tools are needed only for the languages you use. Lua 5.4, JavaScript/QuickJS, Web script support, and the engine-built Luau host do not require those optional SDKs.

## First successful run

Create a project, open a scene, add a primitive and a camera, and save. Enter Play and inspect the Console. Follow the [Lua guide](/docs/scripting/lua) for a copyable attached controller. Use [Troubleshooting](/docs/open-source/engine/troubleshooting) if doctor, linking, or GUI startup fails; use [Building & Packaging](/docs/open-source/engine/building-packaging) for optimized builds.
