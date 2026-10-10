# Languages and architecture

[Back to Engine repository](/docs/open-source/engine).

The implementation is **Rust**, with `egui` for native UI, `winit` for desktop surfaces, and an engine-owned rendering interface backed by `wgpu`. GPU shaders use **WGSL**. Windows installer and language-toolchain automation use **PowerShell**.

The engine implementation language is separate from the languages used to write games. Gameplay adapters support Lua, Luau, JavaScript, Python, C, C++, C#, Java, PHP, and HTML/CSS with inline JavaScript, subject to the behavior and restrictions in each [scripting guide](/docs/scripting/lua).

Project manager, editor, runtime, and asset worker are distinct native processes. Read the [architecture document](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/ARCHITECTURE.md) before changing those boundaries and the [roadmap](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/ROADMAP.md) before expanding scope.
