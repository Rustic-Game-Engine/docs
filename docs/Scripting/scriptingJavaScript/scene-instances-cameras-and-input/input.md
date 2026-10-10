# JavaScript keyboard input

[Back to Scene, instances, cameras, and input](/docs/scripting/javascript/scene-instances-cameras-and-input).

Use these calls inside a JavaScript lifecycle callback.

```javascript
if (rustic.key("KeyW").held) {
  rustic.log("debug", "forward key is held");
}
```

The editor's embedded Play viewport currently forwards held WASD, arrow, and Shift
keys. Use `rustic.key(name).held` with `KeyW`, `KeyA`, `KeyS`, `KeyD`,
`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `ShiftLeft`, or `ShiftRight`.
The API exposes `pressed`, `released`, `key_events()`, `any_key_pressed()`, and
named `input()` actions, but those values are not populated by the current Play
bridge. Other key names and separate runtime windows do not forward input yet.
For focus and setup steps, see the [Lua input guide](/docs/scripting/lua/input); the
input transport and limitations are the same for JavaScript.
