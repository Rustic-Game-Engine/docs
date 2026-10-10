# Behavior lifecycle

[Back to JavaScript](/docs/scripting/javascript).

```javascript
let speed = 4; // private to this behavior instance

globalThis.behavior = {
  Start() {
    rustic.log("info", `started ${rustic.entity_id()}`);
  },
  OnEnable() {},
  FixedUpdate(dt) {
    const move = rustic.key("KeyW");
    if (move.held) {
      const [x, y, z] = rustic.get_translation();
      rustic.set_translation(x, y, z + speed * dt);
    }
  },
  Update(dt) {},
  OnDisable() {},
  OnDestroy() {},
};
```

Every method is optional. Canonical names are `Start`, `FixedUpdate`, `Update`,
`OnEnable`, `OnDisable`, and `OnDestroy`; legacy `on_start`, `fixed_update`, `update`,
`on_enable`, `on_disable`, and `on_destroy` remain compatible. Canonical wins when
both exist. `on_create` and `on_stop` remain recognized legacy internal hooks.
Collision names exist in the common scheduler contract, but the current JavaScript
adapter does not bind them yet.

Global scripts start before scene scripts, which start before object components.
Within a scope, execution order, entity ID, script Asset ID, and attachment order are
the stable tie-breakers. Disabling an object stops its component updates; destruction
invokes teardown and unregisters the instance.
