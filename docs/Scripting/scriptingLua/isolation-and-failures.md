# Isolation and failures

[Back to Lua 5.4](/docs/scripting/lua).

Lua cannot directly call another behavior's VM object. API 1.1 adds shared
`Events.on`, `once`, `emit`, and object signals across every supported script type. See
[Shared gameplay actions](gameplayActions.md) for payloads and lifetime rules.

Lua cannot access `io`, `os`, `package`, `debug`, `dofile`, `loadfile`, `require`,
or `collectgarbage`. It has no filesystem, network, process, registry, or editor
access. An exception or exhausted instruction budget disables only that behavior.
Use the Console diagnostic to open the source location, fix it, then reload scripts.
