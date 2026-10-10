# Gameplay language bindings

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Every supported script type exposes `Tween`, `Ease`, `Movement`, `Animation`,
`Sequence` / `Timeline`, `Timer`, `Smooth` / `Interpolation`, `Path`, `Camera`,
`Physics`, `Effects`, `Audio`, and `Events`. `Clock` controls the shared scene clock.
Callbacks stay in their language runtime; action state and math stay in Rust.

| Language | Access and construction |
| --- | --- |
| Lua 5.4 / Luau | Globals; `Sequence.new()`; dot or colon handle calls |
| JavaScript / HTML inline JS | Globals; `Sequence.new()`; member calls |
| Python | Import modules from `rustic`; `Sequence.new()` |
| C++ | Namespaces; `Sequence::create()`; returned shared handle uses `->` (chained methods return a reference) |
| C# | `using static Rustic`; `Sequence.New()`; typed option/clip records |
| Java | Extend `Rustic`; `Sequence.create()`; `.waitFor(seconds)`; typed records |
| PHP | Static classes; `Sequence::create()`; returned handle uses `->` |
| C | Function tables such as `Tween.move`; typed structs; callbacks are function pointers |

C uses `Sequence.create()` and explicit `Sequence.destroy(&builder)` / `Path.destroy(&path)`
for builder storage. Playback owns its action data after scheduling. C query list strings
last until the next lifecycle callback; copy any string you retain. An omitted C callback
or easing is `NULL`; easing then defaults to Linear. Native bindings provide typed motion
options (`MotionOptions`, `RusticMotionOptions`) for duration or speed. C uses
`Tween.toOptions` / `Movement.moveToOptions` for those options.

For external languages, install the toolchain in its language guide and regenerate the
Programming Workspace after upgrading. Python imports the modules it uses, for example:
`from rustic import rustic, run, Tween, Animation, Physics, Audio, Clock`.

PHP and HTML entries remain restricted to `ui/`; CSS alone executes no actions.
