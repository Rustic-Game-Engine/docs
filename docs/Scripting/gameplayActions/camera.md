# Animate a camera

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Camera helpers accept an explicit camera entity. Lua/Luau/JavaScript also accept
`Camera.moveTo(position, duration, easing?)` and `Camera.zoom(fov, duration, easing?)`
for the current camera. `Camera.current()` resolves the active camera in those and
the C++/C#/Java/Python/PHP facades:

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local camera = Game.scene.Find("Game.scene.Camera")
  Camera.moveTo(camera, Vector3(0, 4, 10), 2, Ease.OutCubic)
  Camera.zoom(camera, math.rad(45), 2, Ease.InOutSine)
  Camera.lookAt(camera, Vector3(0, 0, 0), 0.2, Ease.OutQuad)
end }
```

`Camera.transition(camera, position, rotation, fov, duration,
easing?)` changes position, rotation and FOV in parallel.
