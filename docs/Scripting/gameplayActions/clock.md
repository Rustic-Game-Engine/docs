# Control the scene clock

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

The play scene advances actions once per frame using actual elapsed seconds,
independent of script count and omitted `Update` callbacks. Play pause freezes the
runtime; Stop discards its state. `Clock.timeScale(0.5)` slows actions, clip source clocks, physics and audio playback.
`Clock.pause()` / `resume()` pause the scene clock while leaving script callbacks
available to resume it. Per-operation pause freezes just that action. Audio voice
pause freezes its source cursor independently.
