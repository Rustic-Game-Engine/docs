# Complete behavior

[Back to C++](/docs/scripting/cpp).

```cpp
#include "rustic.hpp"

double speed = 4.0; // process/instance-local state

void on_start() {
    rustic.log("info", "behavior started");
}

void fixed_update(double dt) {
    const auto forward = rustic.key("KeyW");
    if (forward.held) {
        const auto p = rustic.get_translation();
        rustic.set_translation(p.x, p.y, p.z + speed * dt);
    }
}

void on_destroy() {
    rustic.log("info", "behavior destroyed");
}

int main() {
    return rustic_run(RusticBehavior{
        .on_start = on_start,
        .on_destroy = on_destroy,
        .fixed_update = fixed_update,
    });
}
```

`RusticBehavior` has `on_create`, `on_start`, `on_enable`, `on_disable`,
`on_destroy`, `on_stop`, `fixed_update`, and `update` slots. Omitted callbacks
are handled automatically. Frame callbacks receive seconds. Collision callbacks
are not exposed by this external SDK.
