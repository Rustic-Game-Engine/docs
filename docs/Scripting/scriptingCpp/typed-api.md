# Typed API

[Back to C++](/docs/scripting/cpp).

```cpp
const std::string id = rustic.entity_id();
const double frame_dt = rustic.delta_time();
const double physics_dt = rustic.fixed_delta_time();
const RusticVector3 p = rustic.get_translation();
rustic.set_translation(p.x, p.y + 1.0, p.z);

RusticValue speedValue = rustic.get_property("speed");
rustic.set_property("speed", RusticValue{5.0});
RusticValue color = rustic.GetAttribute("Color");
rustic.EditAttribute("Position",
    RusticValue::Array{1.0, 2.0, 3.0});

RusticActionState jump = rustic.input("Jump");
RusticActionState forward = rustic.key("KeyW");
std::vector<RusticKeyEvent> events = rustic.key_events();
bool pressed = rustic.any_key_pressed();
rustic.log("warn", "message");
rustic.set_enabled(false);
```

`RusticActionState` contains `pressed`, `released`, `held`, and `axis`.
`RusticKeyEvent` contains `key`, `state`, and `repeat`. Named actions currently arrive
as an empty map for external adapters. Only held WASD, arrow, and Shift keys from
the embedded Play viewport are populated; press/release fields and key events remain
empty. See the [Lua input guide](/docs/scripting/lua/input) for exact names and setup.
`RusticValue` supports null, boolean, double, string, array, and object;
use its type accessors only when the stored alternative matches.
