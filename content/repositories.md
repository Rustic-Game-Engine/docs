# Open-Sourced Docs

Rustic is developed across separate public repositories. Use this directory to choose what to build, find the right toolchain, and understand which projects have runnable code today. The repository contents below were checked on 10 October 2026.

## Choose a repository

| Repository | What it is | Development language | Current starting point |
| --- | --- | --- | --- |
| [engine](https://github.com/Rustic-Game-Engine/engine) | Native 2D/3D game engine, project manager, editor, and runtime | Rust; WGSL shaders; PowerShell tooling | [Engine development guide](/docs/open-source/engine) |
| [docs](https://github.com/Rustic-Game-Engine/docs) | This documentation site, guides, and scripting API reference | TypeScript, React, Next.js, CSS, and Markdown | [Docs development guide](/docs/open-source/docs) |
| [examples](https://github.com/Rustic-Game-Engine/examples) | Intended home for sample games, projects, and code demonstrations | No implementation language established yet | [Examples repository guide](/docs/open-source/examples) |
| [hosting-sdk](https://github.com/Rustic-Game-Engine/hosting-sdk) | Intended open-source SDK for game-server deployment and infrastructure management | No implementation language established yet | [Hosting SDK repository guide](/docs/open-source/hosting-sdk) |

The engine and docs repositories contain working implementations. The examples and hosting-sdk default branches currently contain only an Apache 2.0 license: no sample projects, package manifests, implementation, or build scripts have been published there yet.

## Build a game or build your own engine

To make a game, begin with [gameplay programming](/docs/guides/gameplay-programming) and a language guide such as [Lua](/docs/scripting/lua). You can use the editor without changing its Rust implementation. External scripting toolchains depend on your chosen language.

To develop your own engine version, fork the engine repository, install its pinned Rust toolchain and native dependencies, and run the project manager from `Engine/`. Follow the [engine source guide](/docs/open-source/engine) for crate boundaries, commands, and installer tooling.

To develop your own documentation site, fork the docs repository, install Node.js 24, run `npm ci`, and edit the page catalog and source content. Follow the [docs guide](/docs/open-source/docs) for the files and scripts involved.

## Fork and contribute

1. Open the repository you want and use GitHub's Fork action to create your own copy.
2. Clone your fork. Replace `YOUR_ACCOUNT` in the repository-specific commands with your GitHub account name.
3. Create a branch for one focused change, follow that repository's instructions, and run its checks.
4. Commit and push to your fork, then open a pull request to the upstream repository.

Keep license and attribution notices when redistributing source. Read each repository's own `LICENSE` and any third-party notices; do not assume every dependency has the same license.

## How the projects fit together

The engine repository keeps implementation and engine-local documentation in `Engine/`. The docs repository independently builds the published website from its own `docs/`, `content/`, and generated API reference. An engine checkout is not required to build this site.

When engine behavior changes, update corresponding engine-local and published documentation and link the companion pull requests. Example projects should state which engine revision they require. A future hosting SDK should document its supported server protocol and versions before users depend on it.

This directory covers the organization's public repositories. The separate product website and managed cloud platform repositories are not public source projects.
