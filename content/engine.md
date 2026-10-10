# Using Rustic Engine

Create 2D and 3D games with the native Rustic editor. This section explains how to use the engine: create gameplay scripts, attach behaviors, work with scene objects, and use the API in Play.

## Start making a game

1. Open the Rustic project manager, create or import a project, and open it in the editor.
2. Read [Gameplay programming](/docs/guides/gameplay-programming) for script creation, attachment, execution, and reload behavior.
3. Choose a language. The [Lua guide](/docs/scripting/lua) includes setup and a copyable keyboard controller; [JavaScript](/docs/scripting/javascript) is another starting point.
4. Attach the script to the intended entity, enter Play, and inspect the console. Follow the language guide's expected results and troubleshooting steps.

## Prerequisites for gameplay

You need a working Rustic editor installation and a project. Bundled Lua, Luau, JavaScript/QuickJS, and Web support let you start without installing every optional language. Python, C/C++, C#, Java, and PHP may require external toolchains; follow the relevant language guide.

You do not need to modify or compile the Rust engine to write a gameplay behavior using an installed editor. Source-build and installer instructions live in the separate [engine open-source documentation](/docs/open-source/engine).

## Explore the engine API

- [API overview](/docs/api/overview): concepts, supported languages, and execution rules.
- [Lifecycle callbacks](/docs/callbacks): setup, frames, physics, and teardown.
- [Scene objects](/docs/guides/scene-objects): target objects by name and hierarchy.
- [Gameplay actions](/docs/guides/gameplay-actions): animation, movement, timing, audio, and callbacks.
- [Physics](/docs/guides/physics): primitive bodies, gravity, collision, and current limits.
- [Cameras and lights](/docs/guides/cameras-and-lights): scene camera and lighting behavior.

Rustic is under active development. Each guide describes the implemented behavior and its current limitations; use the guide's examples and diagnostic steps when something does not behave as expected.

## Develop the engine itself

For Rust architecture, repository setup, prerequisites, build commands, source entry points, and main scripts, visit [Open-Sourced Docs → Engine](/docs/open-source/engine). The [Open-Sourced Docs directory](/docs/open-source) also covers the docs, examples, and hosting SDK repositories.
