# Apply physics forces

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`force(object, vector, delta?)` applies force for the interval, `impulse` / `knockback`
add velocity, and `launch` sets velocity. The current simulation uses unit mass.
`explosion(center, radius, strength, ignore?)` applies radial distance-falloff impulses
and skips anchored bodies. Direct force/impulse/launch on an anchored or nonphysical
object is an error. Models do not automatically acquire primitive colliders.
