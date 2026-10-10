# Verification

[Back to Cameras & lights](/docs/guides/cameras-and-lights).

GPU tests compare actual rendered pixels for camera projection/clipping and light intensity, color, range, and direction. World tests cover component persistence, validation, and undo/redo. Runtime process tests transport the rendered scene through authenticated IPC in all three play modes and check pause, step, resume, and shutdown.

IPC generation 2 transports pixel buffers as bounded binary frames instead of decimal text. Editor and runtime must come from the same build.
