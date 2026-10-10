# JavaScript scene lookup

[Back to Scene, instances, cameras, and input](/docs/scripting/javascript/scene-instances-cameras-and-input).

Use these calls inside a JavaScript lifecycle callback.

```javascript
const camera = Game.scene.Find("Room.Camera");
const rootTable = Game.scene.Table;
const paths = Game.scene.List();
```

`Find` and direct scene properties return a stable entity ID or `undefined`.
The current JavaScript `List` implementation returns scene path strings, unlike Lua
and the external SDKs, whose `List` returns IDs.
