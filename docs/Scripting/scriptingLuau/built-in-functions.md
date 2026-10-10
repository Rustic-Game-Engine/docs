# Built-in functions

[Back to Luau](/docs/scripting/luau).

All gameplay languages expose owner ID and timing, translation, declared public
properties, built-in attributes, held-key input, logging, enabled state, scene lookup,
instance creation, and camera selection. Use native member syntax for your language.

| API | Result or effect |
| --- | --- |
| `rustic.entity_id()` | Stable owner ID string |
| `rustic.delta_time()`, `rustic.fixed_delta_time()` | Seconds |
| `rustic.get_translation()` | Three numbers; C uses `RusticVector3` with x/y/z |
| `rustic.set_translation(x,y,z)` | Queues owner movement |
| `rustic.get_property(name)`, `rustic.set_property(name,value)` | Reads or updates an already declared property |
| `rustic.get_attribute(name)`, `rustic.edit_attribute(name,value)` | Reads or edits an owner built-in attribute |
| `rustic.key(name)`, `rustic.input(name)` | Action state with pressed/released/held/axis |
| `rustic.key_events()`, `rustic.any_key_pressed()` | Input event snapshot |
| `rustic.log(level,message)`, `rustic.set_enabled(enabled)` | Logs or queues enabled state |
| `Game.scene.Find(path)`, `Game.scene.List()` | Finds an ID or lists matching IDs |
| `instance.add(source,parent)`, `instance.clone(source,parent)` | Queues creation; no immediate new ID |
| `Game.setCurrentCamera(source)` | Queues camera selection by path or ID |

Mutations apply after the callback, in call order. Getters read the callback's
snapshot, so a getter after a setter still reads the original state. Properties and
attributes must retain their engine types; numbers must be finite. Attribute names
are `Name`, `Position`, `Size`, `Color`, `CanTouch`, `CanCollide`, `Anchored`, and
`Parent`. Color is three RGB numbers. Instance parents must be stable entity IDs;
resolve a path with `Game.scene.Find` first. Scene List returns IDs, not path strings.

## Edit another object

Use `rustic.game.Demo.Room.Player:EditAttribute("Position", {1, 2, 3})` inside
a callback. See [Edit scene objects](sceneObjects.md) for named-scene setup,
supported attributes, and troubleshooting. The bundled Luau SDK queues edits
after the callback and does not provide path-based getters.
