# Setup and attachment

[Back to Luau](/docs/scripting/luau).

1. Use the current Rustic installer, which bundles the Luau runtime. Rebuild or reinstall Rustic if the bundled host is missing.
   Check the Project Manager’s **Settings** language tools and the editor **Console** for discovery errors. Contributors with a source checkout can optionally run `cargo xtask doctor` from `Engine/`.
2. Open your game project and scene. Select a **Part** object for this movement example.
3. The inspected creation menu omits Luau. Create a `.luau` file under `scripts/` with an external editor. In Explorer, right-click the file and choose **Set As > Object Component Script** while your target object is selected. This registers the asset and attaches it. Subsequent attachment can use **+ Add Component**.
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
