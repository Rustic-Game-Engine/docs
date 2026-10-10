# JavaScript lifecycle and API 1.0

[Back to Gameplay programming](/docs/guides/gameplay-programming).

JavaScript assigns the same lifecycle to `globalThis.behavior`:

```javascript
globalThis.behavior = {
  Start() { rustic.log("info", "started"); },
  FixedUpdate(dt) {
    const [x, y, z] = rustic.get_translation();
    rustic.set_translation(x + dt, y, z);
  },
  Update(dt) {},
  OnDestroy() {},
};
```

Lua and JavaScript behaviors can be attached to the same entity. They share engine
state rather than VM values. The JavaScript bridge exposes time, entity identity,
translation, typed public properties, action-state snapshots, logging, and enabled
state. Generated declarations live at `.rustic/generated/programming/rustic_api.d.ts`.
