# Animate script value keyframes

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Animation.value(keys, onUpdate)` runs numeric/vector/quaternion keyframes for
script or UI state; its callback receives an ordinary value. Keys start at zero
and have strictly increasing times. The starting key's easing controls its span.
The following example changes a script value from zero to one and back:

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  Animation.value({
    {time=0, value=0, easing=Ease.OutQuad},
    {time=1, value=1, easing=Ease.InQuad},
    {time=2, value=0},
  }, function(value) print(value) end)
end }
```
