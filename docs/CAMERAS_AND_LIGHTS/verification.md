# Verification

[Back to Cameras & lights](/docs/guides/cameras-and-lights).

GPU tests compare actual rendered pixels for camera projection/clipping and light intensity, color, range, and direction. World tests cover component persistence, validation, and undo/redo. Runtime process tests transport the rendered scene through authenticated IPC in all three play modes and check pause, step, resume, and shutdown.

IPC generation 3 transports bounded binary pixel frames and viewport resize requests. Editor and runtime must come from the same build.

To check resize sharpness, drag the editor viewport divider between wide and tall shapes, then repeat with embedded Play, New Window, and Standalone. The authoring frame keeps its aspect while the next frame renders, and completed frames repaint immediately. Game views retain 16:9 letterboxing. Repeat on a display with higher DPI scaling: the render size follows physical pixels, rather than logical window units.
