# Complete behavior

[Back to Python](/docs/scripting/python).

Complete the [setup and attachment steps](/docs/scripting/python/setup-and-attachment), then paste this behavior into the attached script.

```py
from rustic import rustic, instance, Game, run

def on_start():
    rustic.log("info", "Behavior started")

def fixed_update(dt):
    x, y, z = rustic.get_translation()
    if rustic.key("KeyW")["held"]:
        rustic.set_translation(x, y, z + dt)

run(globals())
```

The SDK is staged automatically beside the source in an engine temporary directory.
You do not install a package, copy the SDK into your game, or write a process loop.
**Programming > Open Programming Workspace** also writes editor support files under
`.rustic/generated/programming`. Regenerate those files after upgrading Rustic.
Edit your behavior source, not generated SDK files. Run through Rustic Play so the
engine can supply the API and callback state.
