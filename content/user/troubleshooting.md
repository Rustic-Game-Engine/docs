# Troubleshooting

## Installation and first launch

Use [Installation](/docs/getting-started/installation) for actual release assets and platform availability. Check Project Manager **Diagnostics** for editor launch errors and **Settings** for optional language tools. Installed-editor users do not need `cargo xtask doctor`; source contributors can use [source troubleshooting](/docs/open-source/engine/troubleshooting).

## Script errors

| Symptom | Check |
| --- | --- |
| Start never runs | Correct language/extension, registered asset, enabled attachment and correct scope. Lua uses `Start`, not `OnStart`. |
| Teardown never runs | Lua/JS/Luau use `OnStop`; `Stop` is not a lifecycle callback. External SDKs register `on_stop`. |
| Latest edit appears ignored | Save source in the external editor. A failed reload preserves the old good instance; inspect Console and restart Play. |
| Toolchain unavailable | Install the interpreter/compiler for that language, restart Rustic after PATH changes, check Project Manager Settings. |
| Object path fails | Use unique sibling names and the correct hierarchy from `Game.scene.List`. Check that the object exists in the Play snapshot. |
| Getter ignores a write | Check [runtime mutation timing](/docs/guides/scripting#when-mutations-take-effect). JavaScript and external SDK simple getters use callback snapshots. |
| Collision callback is silent | The primitive simulator does not dispatch collision/touch callbacks. Use implemented physics queries instead. |

Inspect the first source error rather than flooding Console with per-frame logging. External sessions have callback deadlines and source/response bounds; unbounded loops can disable an instance. [Language guides](/docs/guides/scripting#language-specific-guides) show valid syntax and complete registration.

## Input, cameras and physics

Hover/click embedded Play before using held WASD/arrows/Shift. Other keys, press/release edges, named actions and separate-window forwarding are not implemented by the current editor bridge. If a game view is blank, verify an active camera, its local +Z orientation, priority and object placement. For falling-through errors, anchor the floor and enable **Can collide** on both primitive bodies. Imported meshes require primitive proxies; consult [physics limits](/docs/guides/physics#current-limits).

## Files, saving and reopening

Read-only projects may have another active editor holding the lock or a future unsupported scene schema. Save via **File > Save scene**, keep source assets/sidecars together, and save script files separately. Stop Play and discard runtime changes unless you intend to apply them. Inspect the actual permission/recovery diagnostic before altering files; [Scene System](/docs/open-source/engine/scene-system) describes backups and schema migration.

## Audio and platform differences

Native playback/devices and microphone input require Windows in this implementation. Game-output recording works headlessly in Lua/Luau; hot mic does not. Denied microphone access, absent devices, stale device IDs and unsupported formats can raise script errors. The selected input device does not redirect Lua/Luau capture from the system default. See [Audio](/docs/api/audio) and [Compatibility](/docs/reference/compatibility).

## Reporting a problem

Include the engine release/revision, OS, script language/tool version, smallest reproducible project steps, first Console diagnostic and expected behavior. Avoid reporting Docs v0.1 as the engine release. Review [Versions and changes](/docs/reference/versions) and known limitations before assuming an unimplemented feature is a regression.
