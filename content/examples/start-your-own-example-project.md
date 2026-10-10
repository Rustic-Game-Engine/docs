# Start your own example project

[Back to Examples repository](/docs/open-source/examples).

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
