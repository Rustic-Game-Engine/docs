# Animate entity properties

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Properties supported by the scene adapter are `Position`, `Scale` (`Size`),
`Rotation`, `Color`, `Opacity`, and `Fov`. Position/scale/color use three numbers;
rotation uses a nonzero quaternion `[x, y, z, w]`. FOV is in radians and requires a
perspective camera. Opacity and RGB are clamped to `[0, 1]`. Opacity updates material alpha and the renderer uses alpha blending.
Audio voices additionally expose `Volume` and `Pitch`. For script/component/UI
values, use `Tween.value` or `Animation.value` with an update callback. The property
adapter is extensible; arbitrary component reflection is not part of this API.

A tween captures its starting value when it first advances. Sequence children
capture their starts when reached, so earlier movement is respected. If several
actions write the same property, the action created last writes last each frame.
Avoid competing physics or ordinary `Update` setters on that property.
