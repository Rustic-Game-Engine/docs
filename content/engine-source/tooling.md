# Engine build tools and installer

Rustic's public source-build interface is `cargo xtask`. The Cargo alias in `Engine/.cargo/config.toml` runs the Rust task runner in `tools/xtask/src/main.rs`. Run these commands from `Engine/` after following [development setup](/docs/open-source/engine/setup).

## Commands implemented today

| Command | What it does |
| --- | --- |
| `cargo xtask help` | Prints accepted command syntax |
| `cargo xtask doctor` | Checks the pinned toolchain, required files/tools, metadata, dependency policy, and optional language availability |
| `cargo xtask build --profile dev` | Builds standalone Luau and locked workspace/all-target builds |
| `cargo xtask test` | Builds Luau, runs doctor and the full verification sequence |
| `cargo xtask run project-manager` | Builds the editor first, then starts the launcher |
| `cargo xtask run editor` | Starts the native authoring application |

The [task runner source](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/tools/xtask/src/main.rs) currently dispatches `doctor`, `build`, `test`, `run`, and help. The architecture baseline also describes future `package-editor` and `export` interfaces; those are not currently accepted commands in this runner. Consult its help before relying on a command from a design document.

## Choose a build profile

| Profile | Current configuration | When it helps |
| --- | --- | --- |
| `dev` | Development build with debug information | Normal source iteration |
| `dev-fast` | Inherits dev, removes debug info, enables incremental compilation | Iteration where full debug information is unnecessary |
| `release` | Thin LTO, one codegen unit, stripped symbols | Optimized binary checks |
| `distribution` | Inherits release and keeps unwind panic behavior | Distribution and installer build path |

For example:

```sh
cargo xtask build --profile dev-fast
cargo xtask build --profile distribution
```

Profiles change build characteristics, not the documented gameplay API. Optimized builds can take longer to link. Do not assume an optimized binary alone is a distributable installer containing every required application.

## Standalone Luau host

The host has a separate Cargo manifest. The task runner builds it into the selected target directory before workspace builds. For a targeted host investigation:

```sh
cargo build --locked --manifest-path apps/luau-host/Cargo.toml --target-dir target
cargo test --locked --manifest-path apps/luau-host/Cargo.toml
```

The repository CI checks this manifest separately. Run those checks when changing the host instead of depending only on workspace checks.

## Windows installer script

[build-windows-installer.ps1](https://github.com/Rustic-Game-Engine/engine/blob/main/Engine/tools/build-windows-installer.ps1) explicitly requires Windows. From `Engine/`:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\build-windows-installer.ps1
```

The script prepares local tools in `.tools/`, verifies downloaded rustup against the official checksum, validates the Inno Setup installer's signature, builds the Luau host and distribution applications, and invokes the installer definition in `installer/RusticGameEngine.iss`. It reads application version information through Cargo metadata and gives the installer a build timestamp suffix.

Expect a fresh `dist\RusticGameEngine-Setup-*.exe`. The script stops on failed tool preparation, compilation, or installer generation. Merely finding an older setup file does not verify your latest build.

Use `-InstallDirectoryOnPath` only when you want the installer to select the application-path option by default. The normal desktop install does not add its directory to PATH by default.

## Optional gameplay tooling

`tools/manage-language-toolchains.ps1` exposes `Languages`, `LogPath`, and `CheckOnly` parameters and uses Windows Package Manager for optional Python, .NET, C/C++, Java, and PHP tooling. Read the script before selecting identifiers. These are gameplay toolchains, separate from the Rust engine build and its pinned Cargo dependencies.

## Diagnose failures at the right stage

If doctor fails, address setup or dependency-policy errors before packaging. If the standalone host fails, inspect its own manifest/toolchain. If Cargo succeeds but Inno Setup fails, inspect the installer definition and missing packaged files. Read the final script output and confirm the setup executable's fresh timestamp.

Continue with [Testing and debugging](/docs/open-source/engine/testing).
