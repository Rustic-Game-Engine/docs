# Follow a path

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Path.create(points, kind)` supports `Linear`, `Bezier`, `CubicBezier` (exactly four
control points), `CatmullRom`, and `Spline` (uniform Catmull-Rom). Bezier supports up
to 32 control points. Other paths allow 2–4096 points. Linear/spline paths use each
starting point's easing for the following segment. Bezier uses the first point's
segment easing for its single curve span.

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local patrol = Path.create({
    { point = Vector3(0, 0, 0), easing = Ease.OutQuad },
    { point = Vector3(10, 0, 0), easing = Ease.InOutCubic },
    { point = Vector3(20, 5, 0), easing = Ease.InSine },
  })
  Path.follow(rustic.entity_id(), patrol, {
    duration = 8, easing = Ease.InOutSine,
    loop = true, pingPong = true, orientToPath = true,
  })
end }
```

Whole-path easing and per-segment easing alter traversal, not geometry/control
points. Speed-based paths use an approximate arc-length table; segment easing can
still accelerate/decelerate locally. Looping repeats the traversal; a closed
geometric loop requires matching endpoints. Ping-pong reverses at endpoints.
`orientToPath` faces local -Z along the tangent. Coordinates are local to the
object's parent. Choose Catmull-Rom or Spline for smooth corners; segment curves provide local
acceleration/deceleration without moving control points.
