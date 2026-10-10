# Physics forces API

Change simulated body velocity.

[Back to Physics APIs](/docs/api/physics-actions).

## Setup and language support


These engine-owned services work in Lua 5.4, Luau, JavaScript, Python, C, C++, C#, Java, PHP, and HTML inline JavaScript. Follow [Use gameplay actions](/docs/guides/gameplay-actions) to create and attach a script, install external toolchains, and choose the correct language binding. PHP and HTML scripts belong under `ui/`; CSS alone runs no gameplay code.

The signatures and complete example below use JavaScript. Attach a JavaScript Object Component script to the specified target and press **Play**. Globals are supplied by the engine. Schedule actions from `Start` or a callback, rather than at script top level. Native languages use typed options and their own builder conventions; see the guide's language bindings.

## Calls

- `Physics.force(entity, vector, delta?)`
- `Physics.impulse(entity, vector) / Physics.knockback(...)`
- `Physics.launch(entity, velocity)`
- `Physics.explosion(center, radius, strength, ignore?)`

## Parameters

Centers and vectors are finite three-component world vectors. Ignore is an optional array of entity IDs in JavaScript. Force delta defaults to fixed_delta_time in JavaScript.

## Return and timing

Forces mutate physics state synchronously, rather than returning action handles.

## Example

```javascript
globalThis.behavior = {
  Start() {
    Physics.launch(rustic.entity_id(), [0, 6, 0]);
  }
};
```

## Behavior and limitations

- Attach to an unanchored collidable Part above an anchored collidable floor. Launch replaces the Part velocity with an upward velocity.
- The current simulator uses unit mass. Impulse/knockback adds velocity; launch sets it; force integrates over its interval. Clock scaling affects physics.
- Direct force, impulse or launch on an anchored or nonphysical object fails. Explosion uses linear radial falloff and skips anchored bodies.

- See [Basic physics](/docs/guides/physics) for collider setup, gravity and collision limits.
- Check script attachment, enabled state and the Console when an operation fails.
