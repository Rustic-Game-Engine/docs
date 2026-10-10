# Control operation handles

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Lua handles use dot or colon calls; JavaScript/Python use member calls.
`onFinished` registers a completion function, `state()` reports status/error (`Gameplay.state(handle)` in C), and `pause`, `resume`, `cancel`, `reverse` control
an operation. Reverse is supported on tween/value/move/lookAt/path/orbit/wait, not
sequence/parallel/follow/shake. Cancel does not call completion. Completed state
history is bounded to 1024 operations. The scene supports at most 8192 retained
operations (up to 65536 aggregate action nodes), 4096 subscriptions, and 4096 queued callbacks per queue.
