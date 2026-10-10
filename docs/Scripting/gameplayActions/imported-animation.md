# Play imported animation clips

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Import a glTF, GLB or FBX model through the Explorer so it has an `.rmeta` sidecar.
Attach a script to its mesh entity. Before `Start`, the engine binds source nodes
as descendants named `node_N`, retains the skin palette/inverse bind matrices and
registers named clips. Script-created model instances receive the same binding.
`Animation.clips(object)` lists names; `Animation.load(object, "assets/character.glb")`
explicitly binds a model to a fresh target. Rebinding an animated target is rejected
so duplicate skeletons cannot accumulate.

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local actor = rustic.entity_id()
  for _, name in ipairs(Animation.clips(actor)) do print(name) end
  Animation.addMarker(actor, "Attack", 0.4, "Hit") -- add before playing
  Animation.play(actor, "Attack", {
    speed = 1.2,
    blendIn = 0.25, blendInEase = Ease.OutCubic,
    blendOut = 0.2, blendOutEase = Ease.InCubic,
  }).onMarker("Hit", function() print("apply damage") end)
    .onFinished(function() print("attack finished") end)
end }
```

`Animation.addMarker(object, clipName, time, name)` adds a source-clock event to
a registered/imported clip. Running actions retain their existing clip snapshot, so
add markers before playing.

Play returns the usual pausable/resumable/cancellable handle plus `stop`, `speed`,
`loop` and `onMarker`. Source time stays linear at the selected speed. Changing playback speed leaves
blend durations measured in scene-clock seconds; looping keeps the initial blend
clock and turning looping off finishes the current cycle. `easing` is
an alternative default for blend curves; only explicit `progressionEase` warps
clip sampling. Marker times use the source clock. `Animation.blend(actor, "Walk",
"Run", {duration=0.3, easing=Ease.InOutCubic})` samples both clips during the
transition; `transition` is an alias. Duration measures blend time, not clip length.

The glTF importer preserves linear, step and cubic-spline interpolation. FBX takes
are baked at 60 Hz; skeletal vertices use four linear skin influences and retained
inverse binds. Malformed FBX joint indices that exceed the 16-bit palette limit
are rejected during import rather than truncated. Rendering consumes live node
transforms. Morph-target animation,
dual-quaternion skinning and animation graph/editor UI are outside this surface.
