# Sandbox, values, and diagnostics

[Back to JavaScript](/docs/scripting/javascript).

JavaScript cannot obtain another behavior's VM object. API 1.1 adds shared
`Events.on`, `once`, `emit`, and object signals; see [Shared gameplay actions](gameplayActions.md).

There is no DOM, `window`, Node `require`, module loader, filesystem, network,
environment, native browser timers, process, or editor/backend access.
Use the engine-owned `Timer` facade for delayed/repeating gameplay callbacks. Script-visible state and API
objects are frozen; do not attempt to modify them. Values crossing the bridge are
JSON-compatible representations of the shared engine types. A callback exception or
instruction-budget failure disables that behavior, while other scripts continue.

Engine query failures throw a JavaScript `Error` whose `message` contains the
engine's rejection reason. During Play, use `try/catch` around an optional query
and log `error.message` (or `error.stack`) to diagnose missing objects, invalid
arguments, or unavailable host features. An uncaught exception in source loading
or a lifecycle callback retains its message and available stack in the runtime
error log. A caught query error lets the behavior continue; an uncaught callback
error disables that behavior.

Generated type declarations are at
`.rustic/generated/programming/rustic_api.d.ts`; generated files may be regenerated,
so never put game logic there.
