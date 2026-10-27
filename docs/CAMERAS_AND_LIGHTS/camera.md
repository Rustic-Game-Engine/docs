# Camera

[Back to Cameras & lights](/docs/guides/cameras-and-lights).

Play, New Window, and Standalone render the live scene through its current active camera. The highest Priority wins; equal priorities use stable entity ID order. Scripts can select the current camera during startup or gameplay with `setCurrentCamera` (or the language-specific equivalent). This activates the selected camera and deactivates the others. Until a camera is active, the game view is empty.

**Align to editor view** copies the editor viewpoint into the selected camera. New cameras start aligned to the editor. Cameras look along local +Z with +Y up; parent transforms affect their position and orientation. Camera scale does not zoom the lens.

- Active: makes the camera eligible for the game view.
- Priority: selects the camera when more than one is active.
- Zoom: optical magnification. Values above 1 zoom in and values below 1 zoom out.
- Perspective field of view: changes how much of the scene is visible before zoom is applied.
- Orthographic vertical size: changes the visible world-space height without perspective foreshortening.
- Near/Far clip: limits visible depth.

The game view keeps a fixed 16:9 aspect ratio with letterboxing and renders at the physical pixel size of the visible game area. Embedded Play follows the editor panel size and display scaling; New Window and Standalone follow their own window size and display scaling. Resizing requests a new render target instead of enlarging a fixed 640 by 360 image. Game frames are limited to 4096 pixels on either axis; larger views scale the bounded frame. Editor navigation and gizmos are separate from the game camera. Stop restores the editor view. Simulation changes to camera or parent transforms are reflected in subsequent game frames.

Selecting a camera displays a cyan frustum and center trajectory in the editor viewport. The guide follows the camera transform, projection, aspect ratio, clipping settings, and zoom. Very long far clipping distances are shortened in the editor guide so the scene remains usable; this does not change rendering.
