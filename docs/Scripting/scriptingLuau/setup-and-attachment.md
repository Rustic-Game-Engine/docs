# Setup and attachment

[Back to Luau](/docs/scripting/luau).

1. Use the current Rustic installer, which bundles the Luau runtime. Rebuild or reinstall Rustic if the bundled host is missing.
   Run `cargo xtask doctor` from the Engine folder to check discovery.
2. Open your game project and scene. Select a **Part** object for this movement example.
3. Use **Programming > New Script > Object Component Script** and select Luau.
   Save the asset, then attach it to the selected object using
   **Programming > Attach Existing Script** or **+ Add Component** in the Inspector.
   Create global or scene scripts through their corresponding Programming commands.
   Keep the editor-assigned Asset ID; do not edit the registry or scene files by hand.
4. Paste the [complete behavior example](/docs/scripting/luau/complete-behavior). Press **Play**, then hover or click the embedded
   Play viewport and hold **W**. The owner moves along positive Z at one unit per
   second. The Console shows **Behavior started** once. Stop Play to restore the
   authored scene. Attach to an object with a transform to see movement.

For a source checkout, build with `cargo xtask build` from Engine. This builds the
Luau host beside the editor/runtime. If you build individual Cargo packages, build
the host too:

```powershell
cargo build --locked --manifest-path apps/luau-host/Cargo.toml --target-dir target
```

The Luau host has its own Cargo workspace to keep Luau's native library separate
from Lua 5.4. User scripts keep the `.luau` extension and their editor-assigned IDs.

See [Complete behavior](/docs/scripting/luau/complete-behavior) for the source to paste after attaching the script.
