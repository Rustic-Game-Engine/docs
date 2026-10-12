# Using Rustic Engine

Rustic Engine is a native Rust editor and runtime for 2D and 3D scenes, with gameplay scripting in ten script types. It is under active development: read the [feature status and compatibility reference](/docs/reference/compatibility) before depending on a system.

## Getting started

1. [Check requirements and install](/docs/getting-started/installation). Windows pre-alpha installers are published; other platforms have different availability.
2. [Launch and create a project](/docs/getting-started/create-project).
3. [Learn the editor](/docs/editor/overview).
4. [Build your first playable scene](/docs/tutorials/first-game): move a cube with keyboard input, add a falling physics box, read logs, save and reopen.
5. Continue with [gameplay and scripting](/docs/guides/scripting), [engine systems](/docs/guides/systems), and the [API reference](/docs/api/overview).

Lua 5.4 is a useful first language because its runtime is bundled. Luau, JavaScript and HTML/inline JavaScript also have engine-provided runtimes. Python, C, C++, C#, Java and PHP require their own tools; install only the tools your game uses. HTML/CSS support executes JavaScript behaviors; it does not render browser UI.

## Build and troubleshoot

[Playtesting and publishing](/docs/building/publishing) explains Play modes, debugging and current export limitations. [Troubleshooting](/docs/troubleshooting) covers startup, attachment, input and saving problems. [Versions and changes](/docs/reference/versions) distinguishes the website, engine release and scripting API.

## Contribute to Rustic Engine

Ordinary users of an installed editor do not need Rust or Cargo. For source setup, architecture, tests and contribution policies, use [Open Source Development](/docs/open-source). It covers the public engine, docs, examples and hosting-sdk repositories; examples and hosting-sdk are **Not Yet Implemented**.
