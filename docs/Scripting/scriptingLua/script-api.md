# Script API

[Back to Lua 5.4](/docs/scripting/lua).

The read API returns engine-owned snapshots; writes validate against the host:

```lua
local id = rustic.entity_id()                 -- stable entity ID string
local frame_dt = rustic.delta_time()
local fixed_dt = rustic.fixed_delta_time()
local x, y, z = rustic.get_translation()
rustic.set_translation(x, y + 1, z)

local health = rustic.get_property("health") -- nil if absent
rustic.set_property("health", 90)             -- declared property only

local name = rustic.GetAttribute("Name")
rustic.EditAttribute("Anchored", true)
print("entity", id)
warn("entity needs attention", id)
rustic.set_enabled(false)
```

`print(...)` writes an `info` entry and `warn(...)` writes a `warn` entry to the
Rustic console. Multiple arguments are converted with Lua's `tostring` and separated
by tabs. `rustic.log(level, message)` remains available when an explicit level is
needed.

`get_attribute`/`GetAttribute` and `edit_attribute`/`EditAttribute` are aliases.
Built-in attributes are `Name`, `Position`, `Size`, `Color`, `CanTouch`,
`CanCollide`, `Anchored`, and `Parent`. Attribute and property writes must match the
existing value's type. Attribute setters accept scalar values, exactly three finite
numbers in a table for `Position`, `Size`, and RGB `Color`, and a stable entity ID
string or `nil` for `Parent`. Public-property setters retain their existing scalar
write rules. To edit another object, use
`rustic.game.Demo.Room.Player:EditAttribute("Position", {1, 2, 3})`; see
[Edit scene objects](sceneObjects.md) for setup and supported types.
Invalid values fail and disable the offending script.

## Edit another object

See [Edit scene objects](sceneObjects.md) for named-scene hierarchy calls, supported
attributes, copyable examples, and native SDK calls to edit another object. Use your language's native call syntax and its current runtime
limitations.

Lua owner and path-based `EditAttribute` calls accept three-number tables for
Position, Size, and RGB Color; Parent accepts a stable entity ID string or `nil`.
Vectors require exactly three finite components. These conversions apply to built-in
attributes; script public-property setters retain their existing value rules.
