# Main scripts and commands

[Back to Engine repository](/docs/open-source/engine).

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
