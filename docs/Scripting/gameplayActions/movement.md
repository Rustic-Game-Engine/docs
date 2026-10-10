# Follow and orbit objects

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Movement.lookAt`/`Camera.lookAt` sample the target orientation when starting.
`follow(object, target, duration, easing?, offset?)` re-reads the target position
each frame during its finite catch-up duration.
`orbit(object, center, radius, turns, duration, easing?)` circles in the local XZ
plane.
