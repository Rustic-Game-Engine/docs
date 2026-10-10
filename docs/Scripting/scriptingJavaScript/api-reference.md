# API reference

[Back to JavaScript](/docs/scripting/javascript).

```javascript
const id = rustic.entity_id();
const dt = rustic.delta_time();
const fixedDt = rustic.fixed_delta_time();
const [x, y, z] = rustic.get_translation();
rustic.set_translation(x + 1, y, z);

const health = rustic.get_property("health");
rustic.set_property("health", 90);
const color = rustic.GetAttribute("Color"); // [red, green, blue]
rustic.EditAttribute("Anchored", true);
print("loaded", id);
warn("message");
console.debug("details");
rustic.set_enabled(false);
```

`print(...)`, `warn(...)`, and `console.log/info/warn/error/debug(...)` write directly
to the Rustic console. `rustic.log(level, message)` remains available when code needs
to select a level dynamically.

Lower-case `get_attribute`/`edit_attribute` are equivalent. Set `Color`, `Position`,
and `Size` with three-number arrays, and `Parent` with an entity ID string or `null`.
Supported built-ins are
`Name`, `Position`, `Size`, `Color`, `CanTouch`, `CanCollide`, `Anchored`, and
`Parent`. Properties must already be declared and writes must preserve their type.
Mutations are queued and applied in issue order after the callback.
