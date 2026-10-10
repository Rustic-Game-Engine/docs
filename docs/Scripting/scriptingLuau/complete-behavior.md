# Complete behavior

[Back to Luau](/docs/scripting/luau).

Complete the [setup and attachment steps](/docs/scripting/luau/setup-and-attachment), then paste this behavior into the attached script.

```luau
return {
    on_start = function() rustic.log("info", "Behavior started") end,
    fixed_update = function(dt)
        local x, y, z = rustic.get_translation()
        if rustic.key("KeyW").held then rustic.set_translation(x, y, z + dt) end
    end,
}
```

The SDK is staged automatically beside the source in an engine temporary directory.
You do not install a package, copy the SDK into your game, or write a process loop.
**Programming > Open Programming Workspace** also writes editor support files under
`.rustic/generated/programming`. Regenerate those files after upgrading Rustic.
Edit your behavior source, not generated SDK files. Run through Rustic Play so the
engine can supply the API and callback state.
