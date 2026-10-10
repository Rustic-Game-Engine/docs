# Building & Packaging

Run engine build commands from `engine/Engine`. `cargo xtask help` is the reference for implemented task-runner commands: currently `doctor`, `build`, `test`, and `run`.

## Build profiles

```sh
cargo xtask doctor
cargo xtask build --profile dev
cargo xtask build --profile distribution
```

Profiles are `dev`, `dev-fast`, `release`, and `distribution`. The distribution profile inherits release optimization and retains unwind behavior. xtask builds the standalone Luau host as well as the locked workspace; a raw workspace build alone omits that separate host.

## Operating systems

| Platform | Build preparation | Packaging status |
| --- | --- | --- |
| Windows | MSVC native build tools and Windows SDK | Checked-in self-contained Inno Setup installer script/workflow |
| Linux | Native compiler, window-system libraries, and Mesa/driver support | Source builds and CI checks; no equivalent installer task is exposed by current xtask |
| macOS | Apple native developer tools and Metal-capable environment | Architectural desktop target; consult current acceptance evidence before claiming release qualification |

Windows/Linux quality checks are implemented. Building on a platform and having a supported, tested release package are different milestones. Cross-compilation also requires the target's linker, SDKs, and all native dependencies; adding a Rust target alone is insufficient.

## Windows installer

From PowerShell on Windows, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\build-windows-installer.ps1
```

The script prepares pinned Rust/Inno Setup tools when missing and writes `dist\RusticGameEngine-Setup-*.exe`. Confirm a fresh file was produced. The installer bundles native applications; end users do not need Cargo. Optional gameplay tools are managed through the Language Toolchain Manager/Windows Package Manager.

The repository's [Windows installer workflow](https://github.com/Rustic-Game-Engine/engine/actions/workflows/windows-installer.yml) runs this script on a Windows runner and exposes an installer artifact after success. See the [engine README](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/README.md) for current options and artifact retention.

## Planned packaging interfaces

The architecture baseline proposes `package-editor` and `export`, but the current xtask dispatcher does not implement them. Standalone Play is a runtime mode, not evidence of a finished distributable-game export pipeline. Document a new package/export flow only after its command, assets, runtime dependencies, and target validation are implemented.
