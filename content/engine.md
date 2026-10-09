# Welcome to Rustic Engine

Build 2D and 3D games with a native Rust engine and editor. Start with a gameplay guide, choose a scripting language, and explore the API as you need it. Rustic is under active development; each guide describes the behavior and limitations available today.

## Build your first behavior

1. Read [Gameplay programming](/docs/guides/gameplay-programming) for script creation, attachment, and Play mode.
2. Choose a language, such as [Lua](/docs/scripting/lua) or [JavaScript](/docs/scripting/javascript), and follow its setup and copyable examples.
3. Use the [API overview](/docs/api/overview) and [Lifecycle callbacks](/docs/callbacks) to understand when your code runs.
4. Add [Gameplay actions](/docs/guides/gameplay-actions), [Scene objects](/docs/guides/scene-objects), or [Physics](/docs/guides/physics) as your game grows.

## Work on the engine

The Rust workspace, native applications, engine documentation, and engine-specific instructions live in `Engine/` in the [engine repository](https://github.com/Rustic-Game-Engine/engine). Run engine commands from that directory. Install the pinned toolchain in `Engine/rust-toolchain.toml`, then launch the project manager:

```sh
cd Engine
cargo xtask doctor
cargo xtask run project-manager
```

The project manager creates or imports projects and launches the editor. See `Engine/README.md` for the full build and validation commands and `Engine/AGENTS.md` for the engine completion requirements.

## Keep the docs current

When engine functionality or scripting behavior changes, update the affected guides and API reference in a companion change in the docs repository, keep `Engine/docs` accurate, and link the docs pull request in the engine pull request. The [documentation workflow](/docs/website/documentation) explains where those sources live and how to make new pages reachable.
