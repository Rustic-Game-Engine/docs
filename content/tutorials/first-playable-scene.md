# First playable scene

Prerequisites: a working Rustic installation, a writable project opened from Project Manager and a desktop graphics session. This Lua example needs no optional external language toolchain.

1. In **Project → Scene → + Add**, add a primitive and select it. Rename it `Player` in Inspector.
2. Set **Anchored** so gravity does not move it during this logging-only exercise.
3. Add a **Camera**, then use **Align to editor view** and enable **Active** so the primitive is visible in Play.
4. Select Player and choose **Programming → Object Component Script → Lua 5.4**. Open the created source in the external editor and replace it with:

```lua
return {
  Start = function()
    rustic.log("info", "Player started")
  end,
}
```

5. Save the source and scene. Check **Gameplay scripts** in Inspector to confirm the attachment is enabled.
6. Press **Play**. Expect the primitive in the game-camera view and `Player started` in Console.
7. Pause, use **Frame**, resume, and stop. Discard runtime changes for this exercise.

## Diagnose the result

No message: check the selected entity's attachment and Enabled state, syntax and callback spelling. A blank game view: check Active camera, its position and orientation. A startup error: inspect Console and verify the runtime executable is installed.

This exercise validates attachment and startup, not movement or HTML layout. Continue with the [Lua keyboard controller](/docs/scripting/lua) and [Playtesting](/docs/guides/editor/playtesting). Use [Editor overview](/docs/guides/editor) for panel navigation.
