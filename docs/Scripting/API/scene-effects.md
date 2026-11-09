# Scene Effects API

Use `Effects` to control one typed effect component on an existing scene entity. The same global retains the existing `fade`, `flash`, `shake` and `pulse` tween helpers. Read the [authoring guide](/docs/guides/scene-effects) for editor steps, all 26 kind names, presets, composites and backend limitations.

## Setup and attachment

Create a Lua or JavaScript **Object Component Script** through Programming, attach it to an entity in the Inspector, and press Play. Python has equivalent `Effects` wrappers in the engine-provided SDK; import `Effects` from `rustic`. Engine SDKs also provide Effects facades for C, C++, C#, Java and PHP over the same validated JSON query boundary. C query results remain owned by the engine session; copy data you need after the callback. Generic requests below are available in every SDK. Do not install a third-party package named rustic.

## Signatures

| Call | Result |
| --- | --- |
| `Effects.types()` | Array of the 26 case-sensitive kind keys |
| `Effects.create(entity, kind)` | Creates an effect and returns its configuration; existing effect is an error |
| `Effects.get(entity)` | Configuration, or null/nil when no component exists |
| `Effects.configure(entity, settings)` | Validated recursive patch and resulting configuration |
| `Effects.group(entity)` | Composite timeline configuration, or null/nil |
| `Effects.configureGroup(entity, settings)` | Validated timeline/parameter/binding patch and resulting configuration |
| `Effects.refreshProbe(entity)` | Requests another six-face capture and returns its generation |
| `Effects.play(entity)` | Begins playback |
| `Effects.pause(entity)` | Freezes playback |
| `Effects.resume(entity)` | Resumes playback |
| `Effects.stop(entity)` | Stops playback |
| `Effects.restart(entity)` | Clears previous simulation and starts again |
| `Effects.reset(entity)` | Clears simulation and restores the initial playback state |
| `Effects.dispose(entity)` | Removes effect component and runtime state, preserving the entity |
| `Effects.state(entity)` | Playback state string, or null/nil |
| `Effects.instantiate(asset, parent, position)` | Composite root UUID, using registered asset UUID, optional parent and default zero position |
| `Effects.spawn(asset, position, lifetime, parent)` | Temporary root UUID; explicit positive lifetime schedules whole group destruction |
| `Effects.sampleWind(position, time, layers)` | XYZ wind vector; time in seconds; layers defaults to all bits |

Entity arguments accept the existing resolved entity forms. Lua `nil` or JavaScript `null` chooses the script owner. UI/global script owners may be synthetic; pass a real scene entity for those scopes. Raw protocol requests require stable entity UUID strings. Playback states are `Stopped`, `Playing`, `Paused`, `Completed` and `Disposed`. Disposal removes the component, so subsequent component state reads return null/nil.

## Complete Lua example

This example requires an entity without an existing effect. For an authored emitter, remove `Effects.create`.

```lua
return {
  Start = function()
    Effects.create(nil, "Particle")
    Effects.configure(nil, {
      common = {duration = 2, looping = false},
      kind = {Particle = {
        rate = 40,
        lifetime = {0.5, 1.0},
        gravity = {0, -2, 0}
      }}
    })
    Effects.restart(nil)
  end
}
```

Expected result: an upward emitter runs for its configured duration. Restart repeats it from cleared simulation state. Changing settings is a live Play mutation; saving the authored scene requires Inspector changes outside Play.

## JavaScript and Python

```javascript
globalThis.behavior = {
  Start() {
    Effects.create(null, "Weather");
    Effects.configure(null, {kind: {Weather: {intensity: 0.3}}});
    Effects.restart(null);
  }
};
```

```python
from rustic import Effects

def on_start():
    Effects.create(None, "Wind")
    Effects.configure(None, {"kind": {"Wind": {"strength": 3.0}}})
```

Use the generated Python starter's callback registration pattern if it differs from this callback body. The wind example changes compatible particles; a wind volume has no standalone visible mesh.

## Events and generic requests

The existing Events service carries `EffectBirth`, `EffectCollision`, `EffectDeath` and `EffectCompleted`. Subscribe with `Events.connect(entity, name, callback)`; payload includes a world-position vector. Composite roots emit `EffectCompleted` once when their own timeline completes. Their default duration includes authored child delays, durations and particle/trail tails. Restart/reset starts a new cycle. Keep callbacks small and avoid recursively creating unbounded effects. Sub-emitter recursion is separately bounded by the runtime generation limit.

Generic operations are `effect_types`, `effect_create`, `effect_get`, `effect_configure`, `effect_control`, `effect_state`, `effect_wind`, `effect_group_get`, `effect_group_configure`, `effect_refresh_probe`, `effect_instantiate` and `effect_spawn`. For example, `rustic.query({op:'effect_create',entity:id,kind:'Particle'})` is equivalent to creation through the wrapper. Configuration requests use `settings`; controls use an `action` string such as `pause`. `effect_instantiate` accepts asset UUID, optional parent and position; `effect_spawn` requires position and a positive lifetime so a missing lifetime cannot silently create a persistent instance. Use the native query syntax for your language; do not construct private transport messages yourself.

## Validation and lifetime

Configuration has the shape `{source, common, kind}`. Kind settings are nested under the variant key, for example `{kind:{Particle:{rate:50}}}`. Unknown fields and invalid values return an error before the world transaction is committed. Use the [typed reference](/docs/guides/scene-effects/configuration) for exact fields, defaults and limits.

Effect configuration survives scene serialization when authored. Runtime clocks, live particles, script mutations and event queues do not become permanent scene edits. Entity destruction and scene unload release effect state. One component is allowed per entity; composite assets instantiate children as ordinary scene effects. Controls and state can target the composite group root; disposal removes descendant effect components and preserves the entity hierarchy. Particle `simulation_mode` selects `Cpu`, `Gpu` or `Auto`. Unsupported features and browser WebGL use the CPU fallback; the Inspector reports the selected backend and reason. Cosmetic particle collisions remain separate from gameplay physics.


## Composite parameters and event tracks

`Effects.group(root)` returns `auto_play`, `looping`, `duration`, `time_scale`, `sound_cues`, `parameters`, `bindings` and `trigger_bindings`. `source`, `source_baseline` and `child_entities` are read-only identity metadata. Group state comes from its own timeline; an early-finishing child does not complete the group. Pause and playback speed affect descendants and scheduled audio. Restart clears the previous cycle.

```javascript
Effects.configureGroup(root, {
  time_scale: 0.75,
  parameters: {power: {Scalar: 1.5}},
  bindings: [{parameter: "power", child: 0,
    property_path: "kind.Particle.rate", scale: 40, offset: 0}],
  trigger_bindings: [{source_child: 0, event: "Completed",
    target_child: 1, action: "Restart"}]
});
```

A binding's zero-based `child` indexes the ordered `child_entities` list. Paths address existing `common` or `kind` properties; array entries use dot indices, such as `kind.LightPulse.intensity.keys.0.value`. Numeric bindings apply `value * scale + offset`. Vector and color dimensions must match; Boolean bindings require scale 1 and offset 0. Unknown paths, missing parameters, invalid child indices and invalid resulting values reject the entire transaction. Child configuration stays authored separately: binding values are applied to simulation copies. Parameter keys accept `null` to remove them, provided no surviving binding still requires them.

Trigger events are `Birth`, `Collision`, `Death` and `Completed`. Actions are `Play`, `Pause`, `Resume`, `Stop`, `Restart` and `Reset`. Repeated events for the same target/action collapse into one command; at most 64 commands run per tick. Sub-emitter assets retain their composite timeline, audio, child lights and bindings. Recursion is bounded to eight generations, 128 spawned entities per tick and 1,024 temporary entities.
