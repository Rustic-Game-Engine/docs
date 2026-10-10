# Scene selection outline

[Back to Cameras & lights](/docs/guides/cameras-and-lights).

In the editor Scene viewport, select a mesh to display its orange outline, then
orbit the camera around it. The outline should remain a narrow border when the
camera lines up with any object axis. No material or script setup is required.

The current renderer expands a back-face mesh shell using camera depth and viewport
resolution, targeting roughly three pixels of padding along each object axis.
Nonuniform object scale is accounted for in world space. This is an approximate
outline: corners, perspective across large meshes, and irregular mesh shapes can
vary in thickness. If a selection fills the viewport with orange at a particular
orbit angle, that is a rendering fault; it is not an outline or material setting.
