# Set up gameplay actions

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

1. Open a game project and scene. Create/select a **Part**.
2. Set its **Anchored** attribute to true so gravity does not compete with scripted
   movement. Action transforms are local to the object's parent.
3. Use **Programming > New Script > Object Component Script**, select Lua 5.4, and
   save it under `scripts/`. Attach it through **Programming > Attach Existing
   Script**, **+ Add Component** in the Inspector, or drag it onto the object.
4. Replace its source with the complete example below and press **Play**. The object
   moves to `(10, 5, 0)` in one second, holds for two seconds, and returns in one
   second. The Console prints `closed` when the sequence finishes. Stop Play restores
   the authored scene. No `Update` function is required.

```lua
return {
  Start = function()
    local door = rustic.entity_id()
    Sequence.new()
      .move(door, Vector3(10, 5, 0), 1, Ease.OutCubic)
      .wait(2)
      .move(door, Vector3(0, 0, 0), 1, Ease.InCubic)
      .play()
      .onFinished(function() print("closed") end)
  end,
}
```

Global and scene scripts use the same Programming menus for their scope. Timers
and subscriptions in those scopes last until Stop/reload; they are not removed
when an unrelated object disappears. Actions targeting an object are removed when
that object disappears. Use explicit stable entity IDs resolved through
`Game.scene.Find(path)` for controllers that target other objects.

For external languages, install the toolchain described in the corresponding
language guide. **Programming > Open Programming Workspace** regenerates SDK/editor
support after an engine upgrade; generated SDK files are not gameplay source.
