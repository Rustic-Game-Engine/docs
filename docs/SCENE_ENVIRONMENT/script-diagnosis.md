# Diagnose environment script changes

[Back to Sky & atmosphere](/docs/guides/scene-environment).

If nothing changes, check `enabled`, the active camera, the callback name and the
script attachment. Read `getEnvironment()` to verify the live values. An invalid
update raises an error and an uncaught callback error disables that behavior;
inspect the game console for the diagnostic. Setting a texture validates the path
syntax; file existence, containment within the snapshot, supported format, 2:1
aspect ratio and image limits are checked by the renderer on the next frame.
Missing or invalid images show a renderer error. Clear `sky_image` or choose a
valid snapshot image, and restart Play after adding or changing image files.
If the sky is visible but objects are dark, increase ambient or sun intensity; the panorama itself does not illuminate objects. If haze is invisible, increase density or reduce the start distance. Scenes saved before environment settings were added open with the environment disabled. The corrected display encoding and highlight compression also apply to those scenes, so their lighting can look different from older builds. Damaged environment settings open read-only with a scene diagnostic.
