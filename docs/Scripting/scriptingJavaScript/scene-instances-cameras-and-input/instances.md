# JavaScript instance creation

[Back to Scene, instances, cameras, and input](/docs/scripting/javascript/scene-instances-cameras-and-input).

Use these calls inside a JavaScript lifecycle callback.

```javascript
instance.add("Cube");
const camera = Game.scene.Find("Room.Camera");
instance.clone("assets/models/chair.obj", camera);
```

An instance source can be a stable
ID, scene path, model path, or built-in object name. Instance calls queue creation and
do not return the new ID. A parent, when supplied, must be a stable ID.
