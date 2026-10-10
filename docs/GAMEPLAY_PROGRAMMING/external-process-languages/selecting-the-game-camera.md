# Selecting the game camera

[Back to External process languages](/docs/guides/gameplay-programming/external-process-languages).

Pass a scene path or a camera entity ID to `Game.setCurrentCamera` during a gameplay
callback. Lua also accepts the requested single-item table syntax:

```lua
Game.setCurrentCamera({"Game.scene.Room.Camera"})
-- These work too:
Game.setCurrentCamera("Room.Camera")
Game.setCurrentCamera(Game.scene.Find("Room.Camera"))
```

The selected camera becomes active and all other cameras become inactive, regardless
of priority. Projection, transforms, and priorities are preserved. The next game
frame uses this camera in Play, New Window, and Standalone. Missing/stale IDs and
non-camera entities produce a script error without changing camera activation.

| Language | Call |
| --- | --- |
| Lua / Luau | `Game.setCurrentCamera({"Game.scene.Room.Camera"})` |
| JavaScript / HTML inline JavaScript | `Game.setCurrentCamera("Game.scene.Room.Camera")` |
| Python | `Game.setCurrentCamera("Game.scene.Room.Camera")` (also `set_current_camera`) |
| C++ / Java | `Game.setCurrentCamera("Game.scene.Room.Camera");` |
| C# | `Game.SetCurrentCamera("Game.scene.Room.Camera");` (also `setCurrentCamera`) |
| C | `Game_setCurrentCamera("Game.scene.Room.Camera");` |
| PHP | `$Game->setCurrentCamera("Game.scene.Room.Camera");` |
