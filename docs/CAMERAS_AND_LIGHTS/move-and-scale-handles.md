# Move and scale handles

[Back to Cameras & lights](/docs/guides/cameras-and-lights).

Select an object in the Scene viewport and choose **Move** or **Scale** in the
editor toolbar. Drag a colored axis handle to change that axis. **World** uses
scene axes; **Local** uses the selected object's rotation. Enable **Snap** in the
viewport toolbar to use the displayed increment. Each completed drag creates one
Undo entry. Read-only projects show handles but do not allow dragging.

As you orbit, handles shorten when their axes point toward the camera. An almost
end-on handle is hidden because it has no useful screen direction; orbit slightly
to reveal it, or edit that component in the inspector. Move and Scale keep the
screen direction captured at the start of a drag so moving the pivot does not
reverse the drag. No component or script setup is required.
