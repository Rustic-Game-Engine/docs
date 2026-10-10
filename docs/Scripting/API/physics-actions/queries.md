# Physics queries API

Query live primitive colliders.

[Back to Physics APIs](/docs/api/physics-actions).

## Setup and language support


These engine-owned services work in Lua 5.4, Luau, JavaScript, Python, C, C++, C#, Java, PHP, and HTML inline JavaScript. Follow [Use gameplay actions](/docs/guides/gameplay-actions) to create and attach a script, install external toolchains, and choose the correct language binding. PHP and HTML scripts belong under `ui/`; CSS alone runs no gameplay code.

The signatures and complete example below use JavaScript. Attach a JavaScript Object Component script to the specified target and press **Play**. Globals are supplied by the engine. Schedule actions from `Start` or a callback, rather than at script top level. Native languages use typed options and their own builder conventions; see the guide's language bindings.

## Calls

- `Physics.raycast(origin, direction, distance, ignore?)`
- `Physics.sphereCast(origin, direction, distance, radius, ignore?)`
- `Physics.overlap(center, radius, ignore?)`

## Parameters

Origins and centers are finite three-component world vectors. Direction must be nonzero and is normalized by the engine. Ignore is an optional array of entity IDs in JavaScript; native query signatures differ.

## Return and timing

Raycast/sphereCast immediately return the nearest {entity, point, normal, distance} or null; overlap returns entity IDs.

## Example

```javascript
globalThis.behavior = {
  Start() {
    const hit = Physics.raycast([0, 4, 0], [0, -1, 0], 10);
    if (hit) print("ground", hit.entity, hit.distance);
  }
};
```

## Behavior and limitations

- Attach to a Part above an anchored collidable floor. The query reports the nearest hit.
- Queries use primitive world AABBs including parent transforms. SphereCast uses rounded sphere/box contacts; model meshes do not automatically acquire primitive colliders.

- See [Basic physics](/docs/guides/physics) for collider setup, gravity and collision limits.
- Check script attachment, enabled state and the Console when an operation fails.
