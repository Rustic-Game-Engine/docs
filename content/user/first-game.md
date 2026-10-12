# Your first playable scene

Build a small 3D movement sandbox: steer an anchored cube with WASD while a second cube falls onto a floor. You will create a project, arrange objects, attach a Lua behavior, play, debug and reopen it. This is a playable scene, not a finished exported game: collision events, scoring UI and distributable export are not available as complete workflows here.

## Prerequisites

Follow [Installation](/docs/getting-started/installation) and [Create a project](/docs/getting-started/create-project), selecting **Empty3d**. Lua 5.4 is bundled; no external language tools or Rust build are required. Use a writable project and the default scene.

## Arrange a floor and two cubes

1. In **Project > Scene**, open **+ Add** and choose **Rectangular Prism**. Select it and set its name to `Floor` in Inspector. Set primitive dimensions to `[20, 1, 20]`, Position to `[0, -0.5, 0]`, and transform scale to `[1, 1, 1]`. Check **Anchored** and **Can collide**.
2. Add a **Cube**, name it `Player`, set Position to `[0, 0.5, 0]`, and set unit size/scale. Check **Anchored** and **Can collide**. Anchoring prevents gravity competing with scripted movement.
3. Add another **Cube** named `Box` at `[3, 5, 0]`. Leave **Anchored** unchecked and check **Can collide**. No extra physics component is required for built-in primitives.
4. Use **+ Add > Camera** if the scene has no camera. Navigate the authoring viewport until you see the floor and both cubes; select the camera and click **Align to editor view** in Inspector. Cameras look along local **+Z**. Ensure the camera is active; if multiple cameras are active, the highest priority is used.
5. Use **File > Save scene**.

Expected setup: a stationary floor, a player resting above it, a higher box and a game camera that can see all three. [Viewport navigation](/docs/editor/overview#viewport-navigation) explains framing and camera controls.

## Create and attach your script

1. Select `Player`. Choose **Programming > Object Component Script > Lua 5.4**. Rustic creates a `.lua` asset and registers it with a stable ID.
2. Open it in your external editor through **Programming > Open Project in Code Editor** or Explorer. Replace its contents with the complete behavior below and save the file.
3. Confirm that the script is attached to `Player` and enabled in Inspector. If using an existing asset instead, select `Player` and use **+ Add Component** to attach it. Avoid attaching the same controller twice.

```lua
local SPEED = 4.0

return {
  Start = function()
    rustic.log("info", "Player ready: hold WASD in the Play viewport")
  end,

  FixedUpdate = function(dt)
    local dx, dz = 0, 0
    if rustic.key("KeyA").held then dx = dx - 1 end
    if rustic.key("KeyD").held then dx = dx + 1 end
    if rustic.key("KeyW").held then dz = dz + 1 end
    if rustic.key("KeyS").held then dz = dz - 1 end
    local length = math.sqrt(dx * dx + dz * dz)
    if length == 0 then return end
    local x, y, z = rustic.get_translation()
    rustic.set_translation(x + dx / length * SPEED * dt,
                           y,
                           z + dz / length * SPEED * dt)
  end,

  OnStop = function()
    rustic.log("info", "Play stopped")
  end,
}
```

`Start` runs once for this behavior instance. `FixedUpdate(dt)` runs on simulation ticks and scales movement by elapsed time. Normalizing the direction prevents diagonal movement being faster. `OnStop` is the teardown callback; `Stop` and `OnStart` are not Lua lifecycle names. The owning object is the movement target, so there is no scene-name lookup in this controller.

## Play and inspect the result

1. Press **Play** in the editor toolbar. Hover or click the embedded game viewport, then hold WASD.
2. The Console should show `Player ready: hold WASD in the Play viewport`. The player moves on the floor; `Box` falls and rests with its centre near Y = 0.5.
3. Use **Pause** and **Frame Advance** to inspect one fixed step. Resume to continue.
4. Press **Stop**. If the runtime-change review appears, choose **Discard** to keep your starting positions. Apply changes only when you deliberately want simulated transforms saved into the authored scene.

This controller teleports the anchored player and is not a swept character controller. It can pass through obstacles; it does not implement collision resolution or jumping. Keyboard forwarding currently works only in embedded Play for held WASD, arrows and Shift. **New Window** and **Standalone** do not forward these keyboard events.

## Fix common mistakes

- **No startup log:** check `.lua` language, enabled attachment on `Player`, `return { ... }`, and `Start` spelling. Inspect the first Console error; a failed callback disables that instance.
- **Log appears but no movement:** hover/click embedded Play, use `KeyW`, and check that `Player` has the script. Moving the authoring camera is different from moving the player.
- **Objects disappear:** check the game camera and its orientation. Verify `Floor` is anchored and both floor/box have **Can collide** enabled.
- **Player falls:** check **Anchored**. The controller keeps its existing height; it does not override gravity.
- **Cannot save:** check the read-only indicator/project lock, project-directory permissions and Console diagnostics.

Fix and save script syntax errors, then restart Play for a clean run. Hot reload can retain the previous good behavior when new source fails validation; do not confuse that with running your latest edit.

## Save the finished scene and run again

Stop, discard simulated changes, use **File > Save scene**, and save your `.lua` file. Close and reopen the project through Project Manager. Press Play and verify the startup message, player movement and falling box again. No downloadable sample is required or currently provided by the **Not Yet Implemented** examples repository.

## Next steps

Read [Lua input](/docs/scripting/lua/input) for arrows and sprinting, [Physics](/docs/guides/physics) for collider limits, [Gameplay actions](/docs/guides/gameplay-actions) for tweens/timers, and [Scripting scopes and execution](/docs/guides/scripting). [Playtesting and publishing](/docs/building/publishing) explains the current boundary between running a scene and distributing a game.
