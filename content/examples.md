# Examples repository

[Open the examples repository on GitHub](https://github.com/Rustic-Game-Engine/examples).

This repository is intended to host example games, sample projects, and code demonstrations showing Rustic's features, APIs, and development workflows. It should be the place to learn from a small complete project and adapt it into your own game.

## Current contents and development language

As checked on 10 October 2026, the default branch contains **only `LICENSE`**, under Apache 2.0. No example game, README, script, build manifest, or test runner is published yet. There is no implementation language to report and no existing sample you can currently run from this repository.

Future sample languages will depend on each project's gameplay scripts. The engine supports several scripting adapters; this does not establish which languages this repository will use. Read a sample's own instructions when it is published.

## Prerequisites

Git is sufficient to inspect or fork the current repository. To create your own Rustic sample, you also need a working engine/editor installation or a source build following the [engine source guide](/docs/open-source/engine). Install only the external scripting toolchain needed by your sample's language.

For a first sample, Lua uses bundled support and avoids requiring an extra gameplay language installation. Read [Lua's setup guide](/docs/scripting/lua) and [gameplay programming](/docs/guides/gameplay-programming) for script creation, attachment, and Play behavior.

## Start your own example project

Fork the examples repository and replace `YOUR_ACCOUNT`:

```sh
git clone https://github.com/YOUR_ACCOUNT/examples.git
cd examples
git switch -c add-my-first-example
```

These commands clone the current repository; they do not launch a game. To build an example:

1. Create a new project using Rustic's project manager, then open it in the editor.
2. Start with one scene and one behavior. Follow the copyable controller example in the [Lua guide](/docs/scripting/lua), then test it in Play and inspect console output.
3. Keep the example focused: demonstrate input, object movement, a camera, or one [gameplay action](/docs/guides/gameplay-actions).
4. Copy the complete portable project into a clearly named directory in your fork. Preserve project metadata and asset references; exclude machine-specific caches, logs, credentials, and build output.
5. Write a README identifying the engine revision, script language, required tools, how to import/open the project, the scene to run, controls, and expected result.
6. Reopen the project from a fresh checkout to confirm someone else can reproduce your setup.

This is a suggested workflow for a new contribution, not an existing repository convention. Coordinate the directory structure with maintainers before submitting a sample.

## Main scripts and useful starting points

There are currently **no main scripts, package commands, or automated checks** in this repository. Do not assume `npm install`, Cargo, or a particular server starts an example here.

For a new project, explain each entry script in its README: which entity it attaches to, which lifecycle callback starts it, which public properties configure it, and what happens when the reader enters Play. Link the matching [callback reference](/docs/callbacks) and [scene-object guide](/docs/guides/scene-objects).

A helpful first contribution is a small, reproducible sample with documented setup and licensed assets. For implemented behavior and ready-to-copy script snippets today, use the [engine guides](/docs/engine) and [API reference](/docs/api/overview).

## License and common pitfalls

Keep the Apache 2.0 license and applicable attribution notices. Check separate licenses for textures, models, audio, fonts, and other assets before including them.

If a checkout contains only `LICENSE`, that is the current published state rather than a missing dependency. If your own example cannot be opened on another machine, check the required engine revision, complete project files, external asset paths, and chosen language toolchain.

Return to the [open-source repository directory](/docs/open-source).
