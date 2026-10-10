# Change the environment from scripts

[Back to Sky & atmosphere](/docs/guides/scene-environment).

All ten scripting adapters expose `Game.scene.getEnvironment()`,
`Game.scene.setEnvironment(settings)` and `Game.scene.setSkyTexture(path)`.
These calls target the loaded scene, including from global startup scripts, scene
startup scripts, and object component scripts. They work in Play, Play Solo and Run.
CSS-only assets have no executable callbacks; HTML uses inline JavaScript.

1. Copy both daytime and nighttime 2:1 panoramas into your project, for example
   `assets/skies/day.hdr` and `assets/skies/night.hdr`, **before starting Play**.
   Runtime scripts use the immutable play snapshot; they cannot download an image
   or select a file outside it.
2. Create a Lua script using Explorer's scripting commands. Attach it as a
   **Scene Startup Script** for the scene, or select an object and use
   **+ Add Component** to attach the script. See the
   [language guides](/docs/engine) for other languages and their toolchains.
3. Use the following script and start Play with an active camera and visible geometry:

```lua
return {
  Start = function()
    Game.scene.setEnvironment({
      enabled = true,
      sky_image = 'assets/skies/day.hdr',
      rotation_degrees = 45,
      exposure = 0,
      ambient_color = {1, 1, 1},
      ambient_intensity = 0.12,
      sun_color = {1, 0.95, 0.85},
      sun_intensity = 1,
      sun_direction = {0.3, 0.8, 0.4},
      haze_color = {0.6, 0.7, 0.8},
      haze_density = 0.01,
      haze_start = 20
    })
    print(Game.scene.getEnvironment().sky_image)
  end
}
```

The next game frame shows the daytime sky, sun lighting and distance haze. The
console prints `assets/skies/day.hdr`. To switch skies during a later callback:

```lua
Game.scene.setSkyTexture('assets/skies/night.hdr')
Game.scene.setEnvironment({sun_intensity = 0, ambient_intensity = 0.06})
```

`setEnvironment` applies a partial update: omitted fields keep their current values.
It validates the entire resulting environment and applies all supplied fields
atomically. Unknown fields, wrong types and invalid values raise a script error
without changing the environment. `getEnvironment` returns a fresh copy of the live
settings; editing that copy alone has no effect. Reads immediately see successful
updates, including earlier updates from other scripts. Nine adapters return all
settings from setters too; C setters return void.

`setSkyTexture` changes only `sky_image`; it does not enable a disabled environment
or change lighting. Use an empty string to clear the panorama and show `sky_color`.
Use `setEnvironment({enabled=false})` in Lua (or `{enabled:false}` in JavaScript)
to disable the environment while keeping its settings. These runtime changes do
not save back to the editor scene or appear in Apply Runtime Changes. Stop and
restart Play to restore the editor's settings.

| Setting | Type and accepted values |
| --- | --- |
| `enabled` | Boolean; enables the sky, scene ambient/sun and haze. |
| `sky_image` | Project-relative HDR, PNG, JPEG or TGA path with `/` separators; empty clears it. Absolute paths, backslashes, drive prefixes, empty path segments, `.` and `..` are rejected. |
| `sky_color` | Three finite, non-negative RGB numbers; used without an image. |
| `rotation_degrees` | Finite panorama rotation in degrees. |
| `exposure` | Finite sky-image exposure in stops, from -20 to 20. |
| `ambient_color` | Three finite, non-negative RGB numbers. |
| `ambient_intensity` | Finite, non-negative ambient strength. |
| `sun_color` | Three finite, non-negative RGB numbers. |
| `sun_intensity` | Finite, non-negative directional light strength. |
| `sun_direction` | Three finite numbers pointing from a surface towards the sun; squared length must exceed 0.000001 and remain finite. |
| `haze_color` | Three finite, non-negative RGB numbers. |
| `haze_density` | Finite, non-negative density; zero disables haze. |
| `haze_start` | Finite, non-negative starting distance in world units. |

Colors may exceed 1 for HDR lighting. Values must fit the engine's 32-bit float
representation. Sky rotation does not rotate the sun. The sky remains a background,
so changing it does not generate reflections or image-based lighting.
