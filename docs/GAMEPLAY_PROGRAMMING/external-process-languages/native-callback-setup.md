# Native callback setup

[Back to External process languages](/docs/guides/gameplay-programming/external-process-languages).

| Language | Setup |
| --- | --- |
| Python | `from rustic import rustic, instance, Game, run`; define callback functions; `run(globals())` |
| C# | `using static Rustic;`; `Run((callback, dt) => { ... });` |
| C | `#include "rustic.h"`; `rustic_run((RusticBehavior){.on_start=start})` |
| C++ | `#include "rustic.hpp"`; `rustic_run(RusticBehavior{.on_start=start})` |
| Java | `class RusticBehavior extends Rustic`; call `run((callback, dt) -> { ... })` in main |
| PHP | `require __DIR__."/rustic.php"`; `rustic_run(["on_start"=>"on_start"])` |
| Luau | `return {on_start=function() ... end, fixed_update=function(dt) ... end}` |

Each SDK handles omitted callbacks automatically. Supported names are `on_create`,
`on_start`, `on_enable`, `fixed_update`, `update`, `on_disable`, `on_destroy`, and
`on_stop`. Only frame callbacks take dt. Luau also accepts the capitalized Lua
aliases. External collision callbacks remain unavailable. API 1.1 adds shared
`Events` to every supported script type, backed by the same scene services.
See [Shared gameplay actions](Scripting/gameplayActions.md) for coverage and setup. Use `rustic.log` for game diagnostics and run scripts through Play.

See the [language guides](/docs/engine) for complete copyable examples,
attachment steps, native return types, current limits, and troubleshooting.
