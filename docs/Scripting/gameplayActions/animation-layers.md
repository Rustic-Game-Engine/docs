# Layer animation clips

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`weight`, `mask` (track-name prefixes), and `additive` control layering. Start a base
clip first, then a masked layer so the layer sees the base pose each frame. Additive
tracks apply their delta from the first clip pose to the current pose. Blend weights
use the shared easing curves. Completed clips leave the final pose unless blend-out
returns their weight to zero. Stop cancels playback without resetting the pose.
