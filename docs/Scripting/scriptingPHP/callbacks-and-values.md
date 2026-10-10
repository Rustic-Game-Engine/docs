# Callbacks and values

[Back to PHP](/docs/scripting/php).

Supported lifecycle names are `on_create`, `on_start`, `on_enable`, `fixed_update`,
`update`, `on_disable`, `on_destroy`, and `on_stop`. Only frame callbacks receive
`dt` (seconds). Omitted callbacks are handled automatically. C and C++ register
function pointers in `RusticBehavior`; Python passes a callback dictionary to `run`;
PHP passes one to `rustic_run`; C# and Java dispatch the supplied callback name.
Luau returns a table and also accepts `Start`, `FixedUpdate`, `Update`, and the other
capitalized lifecycle aliases used by Lua. State declared outside callbacks persists
for this behavior instance until teardown or reload.

Python and PHP use native dictionaries/arrays for key state. C#, Java, and C use
native action structs/objects with `.held`. Luau uses tables and returns translation
as three separate numbers. C property/attribute reads return `RusticValue`: inspect
its `type` and use `boolean`, `number`, `string`, or `vector`/`length`. C strings and
read values last until the next callback; copy them if you need to retain them.
C# property/attribute reads return ordinary `object?` values (bool, long/double,
string, double[] or null); Java returns Object values (Boolean, Long/Double,
String, double[] or null). Cast to the declared property type before arithmetic.
C scene listing takes a path argument, e.g. `Game.scene.List("Game.scene")`, and
returns a `RusticList` with count/items.
