# Finding and creating objects

[Back to Lua 5.4](/docs/scripting/lua).

```lua
local table_id = Game.scene.Find("Room.Table")
local all_in_room = Game.scene.List("Room")
local direct_root_child = Game.scene.Camera

local new_id = instance.add("Cube")
local model_id = instance.add("assets/models/chair.glb", table_id)
local copy_id = instance.clone("Room.Table")
Game.setCurrentCamera("Room.Camera")
```

Paths may be dotted or slash-separated. `Find` returns an ID or `nil`; `List`
returns stable IDs. `instance.add` accepts an entity ID/path, an Explorer model path,
or `Part`, `Cube`, `Sphere`, `Cylinder`, `Plane`, `Rectangle2D`, or `Circle2D`.
`clone` copies an existing scene object. The optional parent must be a stable entity
ID string. Both calls return the new ID immediately. Camera selection accepts a path,
ID, or the compatibility form `{ "Game.scene.Room.Camera" }`.
