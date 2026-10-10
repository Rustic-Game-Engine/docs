# Register animation tracks

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Animation.register(object, clip)` adds engine-created tracks without editing an
asset or JSON. Track targets are `Position`, `Rotation`, `Scale`, `Opacity`, `Color`,
`Fov`, or `child/path/Property`; imported tracks use `node_N/Property`.

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local object = rustic.entity_id()
  Animation.register(object, {
    name="Reveal", duration=1,
    tracks={{target="Opacity", keys={
      {time=0, value=0, easing=Ease.OutSine},
      {time=1, value=1},
    }}}, markers={{time=0.5, name="Halfway"}},
  })
  Sequence.new().animation(object, "Reveal").wait(1).call(function()
    print("cutscene step finished")
  end).play()
end }
```
