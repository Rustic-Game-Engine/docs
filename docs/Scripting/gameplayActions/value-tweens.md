# Tween script values

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

The core interpolates scalars, vectors, and rotations. Callback tweening applies
those values to your own gameplay or UI state:

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  Tween.value(0, 100, 2, function(value)
    -- Apply value to your own gameplay state here.
    rustic.log("info", tostring(value))
  end, Ease.OutQuad)
end }
```
