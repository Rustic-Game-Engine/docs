# Environment calls in other languages

[Back to Sky & atmosphere](/docs/guides/scene-environment).

JavaScript and HTML inline JavaScript:

```javascript
globalThis.behavior = {
  Start() {
    Game.scene.setEnvironment({enabled: true, sun_intensity: 1});
    Game.scene.setSkyTexture('assets/skies/day.hdr');
    print(Game.scene.getEnvironment().sky_image);
  }
};
```

Python:

```python
from rustic import Game, run

def on_start():
    Game.scene.setEnvironment({"enabled": True, "sun_intensity": 1})
    Game.scene.setSkyTexture("assets/skies/day.hdr")
    print(Game.scene.getEnvironment()["sky_image"])

run(globals())
```

Luau uses the same calls and tables as Lua. In C++, pass a `RusticValue::Object`
(e.g. `{{"enabled",true},{"sun_intensity",1.0}}`); reads return a `RusticValue`
object. In C#, pass an anonymous object such as
`new {enabled=true,sun_intensity=1}`; reads return a `JsonElement`. In Java, pass
`Map.of("enabled",true,"sun_intensity",1)`; reads return an object containing a
map. PHP uses `$Game->scene->setEnvironment(["enabled"=>true])` and returns an
associative array. See the [environment API](/docs/api/environment) for copyable
calls for each language.

C reads and writes one named field per call, using `RusticValue`:

```c
Game.scene.setEnvironment("enabled", (RusticValue){.type=RUSTIC_BOOL,.boolean=true});
Game.scene.setEnvironment("sun_intensity", (RusticValue){.type=RUSTIC_NUMBER,.number=1});
Game.scene.setSkyTexture("assets/skies/day.hdr");
RusticValue intensity = Game.scene.getEnvironment("sun_intensity");
```

A C field update is atomic; several calls are separate updates. Returned C strings
last until the next callback. Other language calls accept a whole partial settings
object, so multiple fields can be changed in one atomic update.
