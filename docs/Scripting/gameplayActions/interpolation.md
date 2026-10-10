# Evaluate interpolation

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Smooth.lerp` and `slerp` accept shared easing. `inverseLerp` and `remap` do not clamp
values. `smoothDamp(current, target, velocity, smoothTime, delta)` returns updated
value and velocity; pass the velocity into the next call. It uses an analytic damped
spring rather than a frame-rate-dependent fixed fraction. `Interpolation` exposes
the same math. Smoothing is synchronous; actions and callbacks are asynchronous.
