# Set up a sky

[Back to Sky & atmosphere](/docs/guides/scene-environment).

1. Copy a **2:1 equirectangular panorama** into your project, for example `assets/sky/sunset.hdr`. Supported formats are Radiance HDR (`.hdr`), PNG, JPEG and TGA. A 4096 × 2048 image is a typical choice; each dimension must be at most 8192 pixels. Six separate cubemap faces, EXR and model files are not supported.
2. Open the Inspector and expand **Scene sky & atmosphere**, above the selected entity's properties. You can also use it with nothing selected.
3. Turn on **Enable scene environment** and click **Choose image…**. Select a file inside the project folder. The scene stores its project-relative path. Keep the file at that path when moving the project.
4. Adjust **Sky rotation** to turn the panorama and **Sky exposure (stops)** to brighten or darken it. HDR images use simple Reinhard tone mapping after exposure, then sRGB display encoding. PNG, JPEG and TGA colors are decoded before filtering and exposure, then encoded for display; at zero exposure their image colors are preserved. With no image selected, **Sky color** supplies a solid background.
5. Save the scene. Undo and redo work for environment changes. The image is included in the immutable snapshot when starting Play, including unsaved environment changes.

The panorama surrounds the camera at infinity: rotating the camera changes the view of the sky; moving it does not move the sky closer. **Clear image** switches to the solid color. **Reset environment** restores the disabled defaults. Disabling the environment restores the original background, ambient term and object lighting.
