# Lifecycle, execution order, and API 1.0

[Back to Gameplay programming](/docs/guides/gameplay-programming).

Global scripts are instantiated first when the game starts. Scene scripts are next
when their scene loads. Component scripts are instantiated with their object and are
disabled/unregistered with it. Only callbacks actually supplied by a script are
invoked. The canonical callbacks are `Start`, `Update`, `FixedUpdate`,
`OnCollisionEnter`, `OnCollisionStay`, `OnCollisionExit`, `OnEnable`, `OnDisable`, and
`OnDestroy`. Original snake-case callback names continue to work.

The basic Play simulator runs gravity and primitive box collision response after
`FixedUpdate`, including in scenes with no scripts. `Anchored` prevents physics
movement; `CanCollide` must be enabled on both objects for solid response. Collision
callback names are reserved: the simulator does not dispatch collision or touch
events. See `PHYSICS.md` for floor setup, falling objects, and current limitations.

Execution is deterministic: scope (global, scene, component), explicit execution
order, entity Asset ID, script Asset ID, then attachment order. Scripts communicate
through typed Engine Events and the common Script API, never by sharing language VM
objects. This keeps cross-language calls and future language adapters independent of
the core scheduler.

### Lua

A module returns a table with any of these callbacks, called in order:

```lua
return {
  Start = function() end,
  FixedUpdate = function(fixed_dt) end,
  Update = function(frame_dt) end,
  OnEnable = function() end,
  OnDisable = function() end,
  OnDestroy = function() end,
}
```

The global `rustic` table exposes `entity_id`, `get_translation`, `set_translation`,
`find_entity`, `get_attribute`/`GetAttribute`, `edit_attribute`/`EditAttribute`,
`input`, `log`, `delta_time`, `fixed_delta_time`, `get_property`, `set_property`, and
`set_enabled`. The built-in attributes are `Name`, `Position`, `Size`, `Color`,
`CanTouch`, `CanCollide`, `Anchored`, and `Parent`.
Lua also provides `print(...)` for an info Console entry and `warn(...)` for a
warning Console entry. Use `rustic.log(level, message)` to choose a different level.

Scene objects can be resolved by a dotted or slash-separated path. Lua provides
`Game.scene.Find("Room.Table")` and `Game.scene.List("Room")`; JavaScript additionally
supports direct root access such as `Game.scene.Table`. Entity lookup is fallible. Missing/stale entities,
unknown properties, type changes, non-finite transforms, and unauthorized operations
return errors and contain the failing instance. Public values are Boolean, Integer,
Number, String, Vec2, Vec3, and optional stable Entity ID.

Runtime objects can be created with `instance.add(source, parent?)` or copied with
`instance.clone(source, parent?)`. `source` may be a stable entity ID, a dotted or
slash-separated scene/explorer path, or a built-in object name (`Part`, `Cube`,
`Sphere`, `Cylinder`, `Plane`, `Rectangle2D`, or `Circle2D`). Lua returns the new
stable entity ID immediately. JavaScript queues the structural change for the end of
the callback, consistent with its other mutation APIs.

Model files from the Game Project Explorer can be instantiated directly, for example
`instance.add("assets/models/chair.obj")`. OBJ, glTF, and GLB sources are copied into
the immutable play snapshot with their adjacent `.rmeta` files; the runtime never
reads from or mutates the live project directory.

**Current Play input:** The editor's embedded Play viewport forwards the held
state of WASD, arrow keys, and Shift to scripts while that viewport is hovered or
focused. The supported names are `KeyW`, `KeyA`, `KeyS`, `KeyD`, `ArrowUp`,
`ArrowDown`, `ArrowLeft`, `ArrowRight`, `ShiftLeft`, and `ShiftRight`.
`rustic.key(name).held` is available for movement; `axis` is `1` when held and
`0` otherwise. The API also exposes `pressed`, `released`, `key_events()`,
`any_key_pressed()`, and named `input()` actions, but the editor does not yet
forward their events or action state. Press/release fields remain false, event
lists remain empty, and named actions remain inactive. Other key names and
keyboard input in New Window or Standalone mode are not forwarded yet. The
[Lua guide](Scripting//docs/scripting/lua/input) gives exact setup steps and a
copyable controller.
