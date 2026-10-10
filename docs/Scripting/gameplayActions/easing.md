# Choose easing curves

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Ease.Linear` is the default. The other families are Sine, Quad, Cubic, Quart,
Quint, Expo, Circ, Back, Elastic, and Bounce, each with `In`, `Out`, and `InOut`
prefixes (`Ease.InOutSine`, `Ease.OutBounce`, etc.). Every time-based action uses
the same core curves. Back/Elastic can overshoot numeric, vector, and quaternion progress. Path
parameters, opacity, and color are bounded by their backend contracts.
