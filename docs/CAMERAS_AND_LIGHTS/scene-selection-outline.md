# Scene selection outline

[Back to Cameras & lights](/docs/guides/cameras-and-lights).

In the editor Scene viewport, select a mesh to display its orange outline, then
orbit the camera around it. The outline should remain a narrow border when the
camera lines up with any object axis. No material or script setup is required.
The mesh keeps its shaded surface colors while selected; orange appears around
its visible silhouette, including holes, rather than filling its faces. Geometry
in front of the selection still hides the outline.

The current renderer expands a back-face mesh shell using camera depth and viewport
resolution, targeting roughly three pixels of padding along each object axis.
Nonuniform object scale is accounted for in world space. This is an approximate
outline: corners, perspective across large meshes, and irregular mesh shapes can
vary in thickness. Visible selected surfaces are masked before the shell is drawn
so concave or overlapping parts cannot paint orange across the selected faces.
If a selection fills the viewport with orange at a particular
orbit angle, that is a rendering fault; it is not an outline or material setting.
