# Playtesting and debugging

Prerequisites: a saved project, an enabled registered script attachment and any toolchain required by its language. Keep the runtime executable available alongside your editor installation.

## Run, pause and advance

1. Choose **Play**, **New Window** or **Standalone** in the mode selector, then press **Play**.
2. Use embedded Play for editor-integrated testing; New Window opens a separate runtime view. Standalone exercises the staged export-like runtime configuration. It is not a substitute for clean-machine testing of a packaged game.
3. Press **Pause** to pause the runtime. The **Frame** button (Frame Advance) is enabled only while paused; use it to advance one requested step.
4. Press **Resume** to continue, then **Stop** to end the session.

Expected result: the toolbar shows session mode and fixed tick. Missing executables, startup failures and runtime supervision errors appear in Console. Do not promise that a physics tick is identical to a rendered frame.

## Console and script debugging

Read Console entries for severity, subsystem and source diagnostics. Source-linked entries open the external editor at the indicated location when editor integration is configured. Use Console **Copy** to retain a report and **Clear** to clear displayed entries.

Use your language's logging API from a lifecycle callback. Verify scope, Script ID registration, enabled state, callback spelling and runtime dependencies before changing the engine. During Play, **Programming → Reload Scripts** attempts a reload and **Restart Play** starts a new session. Preserve a working source version; failure handling and toolchain constraints differ by adapter.

## Inspect and review runtime changes

1. Select an entity to inspect available live telemetry in Inspector while the runtime is active.
2. Stop Play and read **Review runtime changes** when a proposal is available. It lists target properties and before/after values.
3. Choose **Discard** or **Apply as one undoable edit**. Applying is disabled for read-only documents; conflicts can fail validation and are reported in Console.
4. Save the scene if you applied changes you want to keep.

Expected result: runtime changes are never silently applied to authoring state. This review covers the supported property changes reported by the runtime, not arbitrary filesystem changes, all runtime-created entities or every script's internal variables.

Related: [lifecycle callbacks](/docs/callbacks), [logging API](/docs/api/logging), [Inspector](/docs/guides/editor/inspector), [troubleshooting](/docs/open-source/engine/troubleshooting).
