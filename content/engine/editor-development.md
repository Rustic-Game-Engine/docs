# Editor Development

The editor is a native Rust application. Its application wiring lives in `Engine/apps/editor/`; reusable authoring models live in `Engine/crates/engine-editor/`. egui/eframe presents the UI and egui_tiles manages docking.

## Panels and workspace

The current default panel set includes 3D Viewport, 2D Viewport, Game Project Explorer, Inspector, and Console. Template-aware layouts can select the relevant viewport. `workspace.rs` owns durable tab/window preferences and migration; the application owns the actual docking geometry. Legacy panel variants in the schema do not mean every old panel remains part of the default UI.

Start with the application panel code for presentation changes. Put reusable document or workspace behavior in `engine-editor`, scene mutations in validated world commands/undo, and graphics work behind the viewport/RHI boundary. Save layouts through the configuration model and handle missing monitors and old layouts conservatively.

## Project manager and authoring

The separate project manager creates/imports projects and launches the editor. Project templates and descriptors belong in `engine-project`, while launcher UI belongs in `apps/project-manager`. Preserve project locking, read-only opening, and transactional saves when changing the opening flow.

For a focused panel addition, define its purpose, wire it into the application, update workspace registration/migration if persistent, and provide a usable empty state. Check selection changes, undo/redo, reopened projects, and 2D/3D templates rather than only the initial layout.

## Debugging and Play tools

Use Console output and clickable source diagnostics to trace scripting failures. Play, pause, Frame Advance, New Window, and Standalone exercise the runtime boundary; a stalled or crashed runtime should be surfaced through supervision. Review/apply runtime changes explicitly.

Rustic uses an external code editor for scripts. Generated workspace/API support belongs under `.rustic/generated/programming/`; user-owned `.vscode` settings must survive changes. Use [Troubleshooting](/docs/open-source/engine/troubleshooting) for reports and [Contributing](/docs/open-source/engine/contributing) for validation.
