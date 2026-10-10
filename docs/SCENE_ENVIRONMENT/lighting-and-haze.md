# Lighting and haze

[Back to Sky & atmosphere](/docs/guides/scene-environment).

- **Ambient color / intensity** illuminate every surface uniformly. A value of zero removes ambient light.
- **Sun color / intensity** add directional light independently of entity lights. The **Direction towards sun (X, Y, Z)** vector points from a surface towards the sun; it must be nonzero. For example, `(0.3, 0.8, 0.4)` lights upward-facing surfaces. Raising sun intensity from `0` to `1` makes it visible on geometry. Sky rotation does not rotate this direction.
- **Haze color / density** blend distant geometry towards the haze color. **Haze starts at** sets the distance from the camera before that blend begins, in world units. Density zero disables haze. The factor is `1 - exp(-density * max(distance - start, 0))`.
- Haze also tints the sky near the horizon. This horizon tint depends on density; the start distance controls geometry only.

Inspector color values and imported material factors are linear. Lighting stays linear, lit highlights are compressed with Reinhard tone mapping, and the sky, lit surfaces and haze are encoded to sRGB for display. This preserves ambient detail and avoids immediate white clipping when ambient or sun intensity is high.

For a simple daytime setup, choose a panorama, leave ambient intensity at `0.12`, set sun intensity to `1`, set haze density to `0.01` and haze start to `20`. Distant objects should gradually blend into the haze while close objects stay clear. Entity lights continue to contribute alongside the scene ambient and sun.

The image is a visible background; it does not automatically produce image-based lighting or reflections. Set ambient and sun values to match it. Volumetric clouds, physical atmosphere scattering, shadow casting, and a visible sun disc are not implemented. Editor grid, selection outlines and object guides remain unlit. The game needs an active camera to show the scene and its sky. The 2D viewport does not render the sky. Environment controls are disabled during play and in read-only documents.
