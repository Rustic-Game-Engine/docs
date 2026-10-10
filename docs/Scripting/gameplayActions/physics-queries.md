# Query physics colliders

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local hit = Physics.sphereCast(Vector3(0, 4, 0), Vector3(0, -1, 0), 10, 0.25)
  if hit then print(hit.entity, hit.distance) end
end }
```

`raycast(origin, direction, distance, ignore?)` returns the nearest hit or nil/null.
`sphereCast` adds a radius and uses rounded sphere/box contacts; `overlap(center,
radius, ignore?)` returns entity IDs. Hits contain entity, point, normal and distance.
Direction is normalized by the engine. Queries use the simulation's authored
primitive colliders represented by world AABBs, including parent transforms.
