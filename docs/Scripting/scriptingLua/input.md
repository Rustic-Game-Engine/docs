# Input

[Back to Lua 5.4](/docs/scripting/lua).

### What works in the editor's Play viewport

The editor forwards **held keys** to scripts while its Play viewport is hovered or
focused. Click the game view once if another panel has focus. The forwarded names
are `KeyW`, `KeyA`, `KeyS`, `KeyD`, `ArrowUp`, `ArrowDown`, `ArrowLeft`,
`ArrowRight`, `ShiftLeft`, and `ShiftRight`. Either physical Shift key sets both
Shift names because the editor currently receives a combined Shift modifier.
For these names, `rustic.key(name).held` is true while the key is held and false
after release or when the Play viewport loses keyboard focus. `axis` is `1` when
held and `0` otherwise.

The `rustic.key(name)` result also has `pressed` and `released` fields, but the
current Play bridge does **not** forward press/release edges. Those fields remain
false. `rustic.key_events()` returns an empty list, and
`rustic.any_key_pressed()` remains false. Named `rustic.input("action")` actions
remain inactive. Other names, including `Space`, `Escape`, `Digit1`, and function
keys, are not forwarded yet. Keyboard forwarding currently applies to the editor's
embedded **Play** viewport; a separate **New Window** or **Standalone** runtime
window does not send its keyboard events to scripts. Use `.held` with the names
listed above for gameplay movement in this build.

### Copyable top-down controller

1. In the editor, create a **Lua 5.4** `.lua` **Object Component Script**. `.luau` uses a different adapter. If the file already exists, select the player object and attach it with **+ Add Component** in the Inspector.
2. Replace the script contents with the example below. Keep `return { ... }` and use `Start`, not `OnStart`.
3. Start **Play**, hover or click the game viewport, then hold WASD or an arrow key. Hold Shift to sprint. The Console should show both startup messages.

```lua
local WALK_SPEED = 4.0
local SPRINT_SPEED = 7.0
local PLAYER_HEIGHT = 1.0

local function held(primary, alternate)
  return rustic.key(primary).held or rustic.key(alternate).held
end

return {
  Start = function()
    print("Character ready - use WASD or arrow keys to move")
    warn("Movement controller is running")
  end,

  FixedUpdate = function(dt)
    local horizontal = 0
    local vertical = 0
    if held("KeyA", "ArrowLeft") then horizontal = horizontal - 1 end
    if held("KeyD", "ArrowRight") then horizontal = horizontal + 1 end
    if held("KeyW", "ArrowUp") then vertical = vertical - 1 end
    if held("KeyS", "ArrowDown") then vertical = vertical + 1 end

    if horizontal == 0 and vertical == 0 then return end

    local length = math.sqrt(horizontal * horizontal + vertical * vertical)
    local speed = WALK_SPEED
    if held("ShiftLeft", "ShiftRight") then speed = SPRINT_SPEED end
    local x, _, z = rustic.get_translation()
    rustic.set_translation(
      x + horizontal / length * speed * dt,
      PLAYER_HEIGHT,
      z + vertical / length * speed * dt
    )
  end,
}
```

This moves the **object carrying the component**, not a player object found by
name. Diagonal motion is normalized so it has the same speed as straight motion.
`PLAYER_HEIGHT` is applied when movement starts; change it to match your scene.
Make sure the active game camera can see the object and has enough room to show
the translation.

If the startup messages are missing, check that the file is `.lua`, the script is
attached and enabled, the callback is named `Start`, and Play actually started.
If messages appear but movement does not, use the editor's embedded Play viewport,
hover or click it, and try `KeyW` first. Check the Console for a script error: a
failing callback is disabled until the script is fixed and reloaded or Play restarts.
