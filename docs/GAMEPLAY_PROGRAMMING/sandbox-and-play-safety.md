# Sandbox and play safety

[Back to Gameplay programming](/docs/guides/gameplay-programming).

Lua, JavaScript, and Web inline scripts cannot access filesystem, network, environment
variables, processes, registry, packages, native memory, or editor/backend objects. Callback budgets
contain infinite loops; logs and IPC use bounded queues/payloads. Runtime worlds are
copies. Stop never writes transforms or properties into the authoring scene. Runtime
transform changes are offered for explicit conflict-checked review and apply as one
undoable transaction; source edits are never applied automatically.

[![Authoring scene to immutable snapshot to child runtime, then explicit review and Apply or Discard.](/images/engine/isolated-play-flow.svg "Conceptual Play workflow: only explicit Apply changes authoring data.")](/images/engine/isolated-play-flow.svg)
