# C++ API

[Back to External process languages](/docs/guides/gameplay-programming/external-process-languages).

C++ behaviors include the generated `rustic.hpp`; Rustic supplies that header while
validating and building the behavior, and also writes an IntelliSense copy to
`.rustic/generated/programming/rustic.hpp`. Game code does not parse or emit host
protocol JSON. The API deliberately follows the Lua and JavaScript names:

```cpp
#include "rustic.hpp"

void fixed_update(double dt) {
    const auto forward = rustic.key("KeyW");
    if (forward.held) {
        const auto position = rustic.get_translation();
        rustic.set_translation(position.x, position.y, position.z + dt);
    }

    const auto table = Game.scene.Find("Room.Table");
    rustic.EditAttribute("Position", RusticValue::Array{1.0, 2.0, 3.0});
    instance.clone("assets/models/chair.obj");
}

int main() {
    return rustic_run(RusticBehavior{.fixed_update = fixed_update});
}
```

`RusticValue` represents the shared Boolean, Number, String, Vec2, Vec3, entity-ID,
array, object, and null values. `Game.scene.Find` returns
`std::optional<std::string>`, and `rustic.key`/`rustic.input` return a typed
`RusticActionState`.
