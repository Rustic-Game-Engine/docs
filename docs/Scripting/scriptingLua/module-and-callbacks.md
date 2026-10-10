# Module and callbacks

[Back to Lua 5.4](/docs/scripting/lua).

Return one behavior table. Every member is optional; Rustic looks up a callback before
calling it. Returning no value is also accepted and creates a no-op behavior.

```lua
local speed = 4.0 -- private state for this behavior instance

return {
  Start = function()
    rustic.log("info", "started " .. rustic.entity_id())
  end,

  OnEnable = function() end,

  FixedUpdate = function(dt)
    local key = rustic.key("KeyW")
    if key.held then
      local x, y, z = rustic.get_translation()
      rustic.set_translation(x, y, z + speed * dt)
    end
  end,

  Update = function(dt) end,
  OnDisable = function() end,
  OnDestroy = function() end,
}
```

Canonical public names are `Start`, `FixedUpdate`, `Update`, `OnEnable`,
`OnDisable`, and `OnDestroy`. The legacy spellings `on_start`, `fixed_update`,
`update`, `on_enable`, `on_disable`, and `on_destroy` still work. The legacy internal
hooks `on_create` and `on_stop` are also recognized. If both canonical and legacy
names are present, the canonical callback wins. Use `FixedUpdate(dt)` for physics and
deterministic movement; use `Update(dt)` for frame-rate work.
`OnStart` is **not** a Lua callback name. A script with `OnStart` can load successfully
while its startup function never runs; rename it to `Start`.

The engine-wide callback model also defines `OnCollisionEnter`,
`OnCollisionStay`, and `OnCollisionExit`. The current embedded Lua adapter does not
yet bind those three names, so do not rely on them in Lua code in this release.
