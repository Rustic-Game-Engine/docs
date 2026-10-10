# Use procedural animation

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Animation.ik(root, middle, tip, target, options?)` solves a two-bone chain in world
space. `options` supplies `pole`, `weight`, `duration` and `easing`. The solver clamps
unreachable targets and preserves segment lengths; joints must form a direct
root/middle/tip parent chain. `footPlacement` uses the same solver.
`headTracking` and `lookAt` turn toward a target; update the target through your
controller when needed. `recoil` eases a rotation out and back. Native bindings
provide typed parameters rather than dynamic option tables.
