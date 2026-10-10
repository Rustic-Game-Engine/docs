# Available inline JavaScript API

[Back to HTML/CSS](/docs/scripting/web).

Inline code receives `rustic`, `Game`, and `instance` exactly as described in
[the JavaScript guide](scriptingJavaScript.md):

```javascript
const [x, y, z] = rustic.get_translation();
rustic.set_translation(x, y + 1, z);
rustic.set_property("score", 10);
rustic.EditAttribute("Color", [1.0, 1.0, 1.0]);

const camera = Game.scene.Find("Room.Camera");
Game.setCurrentCamera(camera);
instance.add("Cube");

if (rustic.key("KeyW").held) {
  rustic.log("info", "forward key held in Play");
}
```

JavaScript mutations are applied in command order after the callback. Properties must
be declared and type-compatible. Scene lookup returns stable IDs; JavaScript
`Game.scene.List()` currently returns path strings. Instance operations are queued
and do not return the created ID.
The [Play input limits](/docs/scripting/lua/input) also apply to inline JavaScript:
only held WASD, arrow, and Shift state is forwarded from the embedded Play viewport.
