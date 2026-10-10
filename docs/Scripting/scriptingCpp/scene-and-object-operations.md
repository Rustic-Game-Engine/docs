# Scene and object operations

[Back to C++](/docs/scripting/cpp).

```cpp
std::optional<std::string> table = Game.scene.Find("Room.Table");
std::vector<std::string> room = Game.scene.List("Room");
Game.setCurrentCamera("Room.Camera");

instance.add("Cube");
instance.add("assets/models/tree.glb", table);
instance.clone("Room.Table");
```

`Find` returns a stable ID or `std::nullopt`; `List` returns IDs beneath a path
prefix. Instance source strings accept IDs, scene paths, model paths, or built-in
object names. The optional parent is an ID. These mutations are queued and applied
after the callback, in call order, so creation does not return a new ID.

Built-in attributes are `Name`, `Position`, `Size`, `Color`, `CanTouch`,
`CanCollide`, `Anchored`, and `Parent`. Property/attribute writes must retain the
existing engine type. A rejected command fails and disables only this behavior.
