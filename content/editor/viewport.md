# Viewport and editing tools

Prerequisites: a loaded writable scene with an object. Stop Play for authoring navigation. Open a missing viewport from **View**.

## Navigate and select

1. Stop Play and hover or click the **3D** authoring viewport. Clicking gives the viewport keyboard focus, so navigation continues even if the pointer moves outside it. If an Inspector field or Explorer rename field has focus, click the viewport to return keyboard control to it.
2. Orbit with middle-button drag, right-button drag, or left-button drag away from the gizmo. **Shift + middle drag** pans; the wheel dollies.
3. Use **W/A/S/D** to move the editor camera and **Q/E** for horizontal panning.
4. Click a rendered object to select it. **F** or **Frame (F)** frames the selection; **Home** or **Reset (Home)** resets the editor camera.

Expected result: only the authoring camera moves. The selected entity remains available in Inspector. Clicking empty space clears selection unless Shift or the command modifier is held; this is not a multi-selection promise.

Hold a movement key for continuous navigation; release it to stop. **W/S** move forward/backward, **A/D** move left/right, and **Q/E** pan left/right. These keys do not navigate the 2D authoring viewport. Navigation pauses when the editor window loses focus. If keys appear unresponsive, stop Play, activate the editor window, then click the 3D viewport to leave any focused text field. In Play, WASD is forwarded to scripts instead of moving the authoring camera.

## Move, rotate and scale

1. Select the object and choose **Move**, **Rotate** or **Scale** in the main toolbar.
2. Drag the visible axis handle or rotation ring. Check the new local values in Inspector.
3. For exact placement, enter numeric values in Inspector's Transform section.
4. Save the scene; use **Edit → Undo** to revert an unintended change.

Expected result: the selected object's transform changes with a refreshed preview. Camera orbit and gizmo drags have different targets; begin the drag on the handle to manipulate the object.

## Viewport modes and limits

The editor offers 3D and 2D viewport panels. These are authoring views; do not infer undocumented wireframe, material-preview or snapping modes. Picking depends on the rendered scene, so use the hierarchy when an object is obscured or cannot be picked.

In Play, input is forwarded to gameplay and the active **game camera** determines the runtime view. The editor camera's authoring pose does not automatically become the game camera pose. Use **Align to editor view** on a camera in Inspector when you want to copy that pose.

Related: [Inspector](/docs/guides/editor/inspector), [camera setup](/docs/guides/editor/cameras-lighting), [Playtesting](/docs/guides/editor/playtesting).
