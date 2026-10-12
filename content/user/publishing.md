# Playtesting and publishing

## Local playtesting

Use **Play** for the embedded game viewport. **Pause/Resume** controls simulation, **Frame Advance** advances one fixed step, and **Stop** ends the runtime session. **New Window** and **Standalone** start distinct native runtime shells. Keyboard forwarding is currently limited to held keys in embedded Play; separate-window modes are useful for observing simulation but do not implement the same keyboard bridge.

Play copies project content into an immutable snapshot and runs a separate runtime world. Script files must be present and registered before the snapshot/reload can use them. Stopping does not automatically save simulation results; review/apply is explicit and undoable. Choose **Discard** to return to authored positions. Save scripts in your code editor and scenes with **File > Save scene**.

## Debugging

Read Console output, click source diagnostics to open the external editor, and pause/frame-advance to isolate fixed-tick behavior. A failing callback disables its instance; a validation failure during hot reload retains the last good version. Restart Play after saving a fix for a clean run. Use [Troubleshooting](/docs/troubleshooting) and [script execution](/docs/guides/scripting) before relying on an assumed update order or input event.

## Standalone games and supported export platforms

**Planned:** a distributable-game export workflow is described by the architecture but the inspected xtask implements only `doctor`, `build`, `test` and `run`. There is no working `cargo xtask export` or `package-editor` command. Do not interpret the **Standalone** Play button as an installer/export pipeline.

No ready-to-use browser/mobile export target or platform packaging matrix is established by this implementation. Windows editor installers package development applications; they are not generated game releases. Source build profiles compile engine binaries and do not replace an asset/runtime export contract.

## Share a project for development

Until game export is implemented, share the project source with another developer who has a compatible Rustic build. Include `project.engine`, authored scenes, scripts, source assets and their identity sidecars; exclude machine-specific caches, logs, credentials and build outputs. State the engine release/revision, script languages and optional tools. Test reopening the copied project before sharing it. Follow repository and asset licenses; do not assume a source project is a standalone playable package.

[Building and packaging the engine](/docs/open-source/engine/building-packaging) remains a contributor workflow. The [examples](/docs/open-source/examples) and [hosting SDK](/docs/open-source/hosting-sdk) repositories are **Not Yet Implemented**.
