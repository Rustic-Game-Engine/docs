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

### Automatic updates and agent backends

Packaged Windows builds check for updates when Project Manager or the editor starts. Once an installer is downloaded and verified, choose **Install update** or the title-bar **Update** button. Editors ask to save unsaved scenes before closing. Close standalone games and other workers separately. Updates can also install after a normal app exit.

After the desktop windows, games and other workers close, the updater stops every `rustic-agent-backend` from that installation, including multiple MCP connections kept alive by external agent clients. Backends from other installations remain running. Setup waits for all Rustic processes from the installation to exit, then reopens windows closed through **Update** with their original projects. Reconnect the Rustic MCP server in your agent client after installation to start the updated backend.

If Setup does not start, check `%LOCALAPPDATA%\Rustic Game Engine\updates\<installation-key>\update.log` for remaining process names, IDs or backend termination failures. Close remaining games/workers. If an agent client continually restarts its backend, disconnect its Rustic MCP server until Setup finishes. Processes with unreadable executable paths block installation and must be closed separately. A requested update blocked for two minutes restores already-closed windows and leaves **Update** available. See the [automatic update guide](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/docs/AUTOMATIC_UPDATES.md) for verification, restart and recovery details.

## Planned packaging interfaces

The architecture baseline proposes `package-editor` and `export`, but the current xtask dispatcher does not implement them. Standalone Play is a runtime mode, not evidence of a finished distributable-game export pipeline. Document a new package/export flow only after its command, assets, runtime dependencies, and target validation are implemented.
