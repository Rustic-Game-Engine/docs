# Engine development environment

Prepare a source checkout for changing Rustic itself. Gameplay authors using an installed editor can start with [Using Rustic Engine](/docs/engine); this guide is for Rust contributors and people building their own engine version.

## Start with a fork

Fork [Rustic-Game-Engine/engine](https://github.com/Rustic-Game-Engine/engine), then replace `YOUR_ACCOUNT`:

```sh
git clone https://github.com/YOUR_ACCOUNT/engine.git
cd engine/Engine
git switch -c my-engine-change
```

Run Cargo commands in `Engine/`. The parent directory contains repository-level documentation and workflows, not the Cargo workspace. Keep your fork remote separate from upstream so you can push changes without replacing the original project.

## Select the pinned toolchain

Install Rust through rustup, then let the checked-in toolchain file select the supported version:

```sh
rustup show active-toolchain
rustc --version
cargo --version
cargo install cargo-deny --locked --version 0.20.2
```

`rust-toolchain.toml` currently selects Rust 1.98.0 with rustfmt and Clippy. Use that file as the authority instead of choosing whichever version happens to be newest. `Cargo.lock` pins resolved dependencies; `--locked` catches dependency resolution that would change the lockfile.

## Install platform dependencies

On Windows, use the MSVC Rust toolchain, Visual Studio C++ Build Tools, and a Windows SDK. A Rust installation alone does not supply every native linker or SDK used by native dependencies. The Windows installer script can prepare local Rust and Inno Setup tooling, but remains a Windows-only packaging path.

On Ubuntu, the engine quality workflow installs window-system and graphics dependencies. For a desktop development environment:

```sh
sudo apt-get update
sudo apt-get install --yes build-essential libwayland-dev libxkbcommon-dev libx11-dev libxcursor-dev libxi-dev libxrandr-dev libegl1 libgl1-mesa-dri mesa-vulkan-drivers
```

Use the [current CI workflow](https://github.com/Rustic-Game-Engine/engine/blob/main/.github/workflows/quality.yml) to check supported test environments. A successful compilation does not prove a desktop can open a graphics surface. Headless rendering tests also need a usable graphics backend; see [Testing and debugging](/docs/open-source/engine/testing).

## Verify and launch

```sh
cargo xtask doctor
cargo xtask build --profile dev
cargo xtask run project-manager
```

Doctor verifies pinned Rust, required tools and files, workspace metadata, and dependency/license policy, then reports optional gameplay toolchains. Build prepares the standalone Luau host and workspace targets. Run builds the editor before launching the project manager; create a disposable test project and open it in the editor.

Keep the initial test project separate from important personal projects. Before altering persistence or scene migration, make a copy and test recovery as well as the successful path.

## Optional language tools

Rust implements the engine. Python, .NET, C/C++ toolchains, Java, and PHP support optional gameplay adapters; they are not all prerequisites for a first engine build. Doctor's language report tells you what is available. Use the [language guides](/docs/scripting/python) and Windows Language Toolchain Manager when your change involves a particular adapter.

## Resolve setup failures

| Symptom | Check first |
| --- | --- |
| Cargo cannot find a workspace | Confirm you are in `engine/Engine` |
| Rust version mismatch | Check `rust-toolchain.toml` and active rustup toolchain |
| `cargo deny` unavailable | Install the pinned cargo-deny version and check Cargo's bin path |
| Linker or native library failure | Check platform build tools and Linux development packages |
| Editor fails to create a window | Test in a desktop session with working graphics |
| Optional language unavailable | Install only that adapter's documented runtime or compiler |

Continue with [Architecture and source layout](/docs/open-source/engine/architecture) and [Build tools and installer](/docs/open-source/engine/tooling).
