# Set action duration or speed

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local owner = rustic.entity_id()
  Movement.moveTo(owner, Vector3(10, 0, 0), {
    speed = 5, easing = Ease.OutCubic
  })
  -- Alternatively: { duration = 2, easing = Ease.InOutSine }
end }
```

Dynamic-language movement/tween helpers accept either a duration
number or an options object/table with exactly one of `duration` or `speed`.
Speed is units/second (radians/second for quaternion rotations). For finite tweens,
speed determines the total duration; easing intentionally changes instantaneous
speed. Invalid/non-finite values and non-positive speeds are rejected. A zero
finite duration snaps on the next advancing frame.
