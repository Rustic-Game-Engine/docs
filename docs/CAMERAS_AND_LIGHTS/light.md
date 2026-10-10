# Light

[Back to Cameras & lights](/docs/guides/cameras-and-lights).

Scene lights illuminate primitives in both the editor and game view. A small ambient term keeps unlit surfaces visible by default. An enabled [scene environment](SCENE_ENVIRONMENT.md) replaces that term with configurable ambient light and adds sun lighting and haze. The renderer uses up to 32 lights in stable entity order.

- Directional: shines along local +Z throughout the scene; rotate it to change illumination.
- Point: emits from its world position with inverse-square distance falloff, fading smoothly to zero at Range.
- Spot: combines point-light range with a cone along local +Z. Cone half-angle controls coverage, with a soft edge.
- Light color and Intensity affect illumination. Intensity zero turns the light off.

This display conversion applies to scene lights and the environment sun in both the Scene viewport and all game views. No material or script changes are required. Open a scene, select a cube, and orbit it: each flat face should shade consistently, and highlights should change smoothly as a point light moves.

Point and spot Intensity is a relative source strength: away from the range boundary, doubling the source-to-surface distance gives approximately one quarter of the direct illumination. Range is a cutoff, not a brightness control; keep it well beyond the surfaces you want to illuminate. Falloff is capped within 0.1 world units to avoid a singularity at the source. Directional intensity is independent of distance. All lights use diffuse surface-angle shading; surfaces facing away receive no direct contribution. These are relative engine units, not calibrated lumens or lux.

To check distance falloff, add a point light in front of a flat surface, set Range to `100` and Intensity to `0.5`, and compare distances of `1` and `2` world units from the surface. The direct contribution should fall to roughly one quarter; ambient light remains, so the displayed pixel will not become exactly four times darker. Material colors from the inspector and imported models are already linear. The renderer accumulates light in that space, applies Reinhard highlight compression, blends the linear haze color, and encodes to sRGB for display. Dark faces retain ambient detail and increasing Intensity remains visible through bright highlights instead of immediately clipping to white. Selection outlines and editor guides retain their authored colors. Very high intensities can still approach white in the 8-bit image; lower Intensity when needed. Older scenes may need higher point/spot intensity after the distance-falloff correction, especially for lights several world units away. Pixel brightness is display encoded and compressed, so measure falloff in linear light rather than dividing screenshot byte values. If rectangular patches flicker while orbiting, check for two meshes occupying the same space: overlapping faces can fight for depth, and changing lighting will not resolve that geometry issue.

Parent transforms move and rotate lights. Range and cone controls appear only for the light types that use them. Shadow casting is not implemented and has no editable control.

Selecting a light displays an amber editor guide: an arrow for directional lights, the range sphere for point lights, or the complete range cone and center trajectory for spot lights. Guides are editor-only and do not appear in the game view.
