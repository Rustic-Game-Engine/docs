# Troubleshooting

Identify whether a failure occurs in setup, compilation, graphics initialization, asset import, or a gameplay session. Capture the first actionable error and a minimal reproduction before changing the environment.

## Build and setup failures

| Symptom | Check and next step |
| --- | --- |
| Cargo cannot find a workspace | Change directory to `engine/Engine` |
| Rust version mismatch | Compare `rustup show active-toolchain` with `rust-toolchain.toml`; run inside the workspace |
| `cargo deny` is missing | Install `cargo-deny` 0.20.2 with `cargo install cargo-deny --locked --version 0.20.2` |
| Native linker/header error | Install MSVC/Windows SDK on Windows or the Linux packages in Getting Started |
| Luau host is missing | Use `cargo xtask build`, which also builds the separate host |
| Optional gameplay tool unavailable | Install only that language's SDK and follow its language guide |
| Unknown xtask command | Run `cargo xtask help`; proposed export/package commands are not implemented |

Run `cargo xtask doctor` after fixing prerequisites. Preserve the error output if dependency policy fails; updating the lockfile or ignoring an advisory without understanding it is not a diagnosis.

## Graphics and runtime failures

GUI applications need a working desktop session. For headless checks, use the environment in the [quality workflow](https://github.com/Rustic-Game-Engine/engine/blob/main/.github/workflows/quality.yml), including Mesa's CPU Vulkan support. Record the selected GPU/backend and initialization-attempt diagnostics when graphics fails.

If Play exits or stops responding, inspect Console and runtime-supervision diagnostics. Verify script attachment, registry identity, optional toolchains, and the callback syntax for that language. Keep failing imports/scripts and last-good outputs available so a reproduction can show recovery behavior.

If objects fall away or pass through floors, check primitive dimensions, Anchored, and CanCollide on both objects. Imported meshes are different from built-in collision primitives; see [Basic physics](/docs/guides/physics) and the current gameplay API limits.

## Report a reproducible issue

Include engine commit, OS/architecture, compiler, GPU/driver/backend, exact command, expected and actual behavior, and the relevant error text. Reduce the scene or script to the smallest example that still fails. Remove secrets and unrelated private content from attached logs/projects. Submit the report to [engine issues](https://github.com/Rustic-Game-Engine/engine/issues) and link any regression commit you identified.
