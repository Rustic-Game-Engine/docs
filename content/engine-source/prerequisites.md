# Prerequisites

[Back to Engine repository](/docs/open-source/engine).

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
