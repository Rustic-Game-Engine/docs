# Complete behavior

[Back to C#](/docs/scripting/csharp).

Complete the [setup and attachment steps](/docs/scripting/csharp/setup-and-attachment), then paste this behavior into the attached script.

```csharp
using static Rustic;

Run((callback, dt) => {
    if (callback == "on_start") rustic.log("info", "Behavior started");
    if (callback == "fixed_update" && rustic.key("KeyW").held) {
        var p = rustic.get_translation();
        rustic.set_translation(p[0], p[1], p[2] + dt);
    }
});
```

The SDK is staged automatically beside the source in an engine temporary directory.
You do not install a package, copy the SDK into your game, or write a process loop.
**Programming > Open Programming Workspace** also writes editor support files under
`.rustic/generated/programming`. Regenerate those files after upgrading Rustic.
Edit your behavior source, not generated SDK files. Run through Rustic Play so the
engine can supply the API and callback state.
