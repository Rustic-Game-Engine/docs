# Cameras, lighting and environment

Prerequisites: a writable project with visible geometry. Stop Play while preparing the scene.

## Prepare the game camera

1. Position the editor view using the [viewport controls](/docs/guides/editor/viewport).
2. In **Project → Scene → + Add**, choose **Camera**. New cameras use the editor-view placement.
3. Select the camera, choose **Align to editor view** if needed, then inspect its Transform. Game cameras look along local **+Z**.
4. In Camera, enable **Active**, set **Priority**, **Zoom**, projection and clipping planes. The highest active priority determines the game camera.
5. Save and press Play to inspect the runtime view.

Expected result: Play uses the active scene camera rather than the authoring camera. Optical zoom above 1 magnifies; values below 1 zoom out. Use [the current-camera API](/docs/api/camera) for scripted selection rather than assuming editor selection changes the runtime camera.

## Add a light

1. Choose **+ Add → Light**, then select it.
2. In Inspector's Light section, choose **Directional**, **Point** or **Spot**.
3. Set **Light color** and **Intensity**; adjust **Range** for point/spot lights and **Cone half-angle (degrees)** for spot lights.
4. Position/rotate the entity. Directional and spot lights shine along local **+Z**. Save and inspect Play.

Expected result: geometry responds to the light configuration. Intensity 0 turns a light off. The current renderer supports up to 32 scene lights and does not implement shadow casting yet.

## Set sky and atmosphere

1. Expand **Scene sky & atmosphere** in Inspector and enable the scene environment.
2. For an image sky, first copy a 2:1 panorama into the project. Use **Choose image…** for HDR, PNG, JPEG or TGA; external files are rejected.
3. Adjust sky rotation/exposure, ambient color/intensity, sun color/intensity/direction and haze color/density/start.
4. Use **Clear image** for a solid sky or **Reset environment** to restore defaults, then save.

Expected result: preview and Play use the scene environment. Environment sun settings and scene light entities are separate controls; a panorama does not imply full image-based lighting or a browser UI renderer.

Related: [sky and atmosphere guides](/docs/guides/scene-environment), [environment API](/docs/api/environment), [cameras and lights reference](/docs/guides/cameras-and-lights).
