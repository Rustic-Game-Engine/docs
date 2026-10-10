# Diagnose problems

[Back to Sky & atmosphere](/docs/guides/scene-environment).

If the image cannot be selected, copy it into the project folder first; files outside the project are rejected. If the viewport reports a sky-image error, check that the file still exists, is readable, has a supported format, and is exactly twice as wide as it is tall. Invalid or oversized images stop that frame and show the renderer error; clear the image to return to a solid sky. Changes to an image are picked up on the next rendered frame. Restart Play to include changed image bytes in its snapshot.

If the sky is visible but objects are dark, increase ambient or sun intensity; the panorama itself does not illuminate objects. If haze is invisible, increase density or reduce the start distance. Existing scenes open with the environment disabled and preserve their previous appearance. Damaged environment settings open read-only with a scene diagnostic.
