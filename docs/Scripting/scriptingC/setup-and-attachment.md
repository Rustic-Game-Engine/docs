# Setup and attachment

[Back to C](/docs/scripting/c).

1. Install Clang, GCC, or MSVC (C17). On Windows, Rustic also checks the saved
   system/user PATH and registered or standard LLVM install folders. After installation
   or a saved PATH change, press **Play** to recheck. On other platforms, put the
   compiler on PATH before starting the editor.
   Check the Project Manager’s **Settings** language tools and the editor **Console** for discovery errors. Contributors with a source checkout can optionally run `cargo xtask doctor` from `Engine/`.
2. Open your game project and scene. Select a **Part** object for this movement example.
3. Use **Programming > Object Component Script** and select C.
   Save the asset, then attach it to the selected object using
   **Programming > Attach Existing Script** or **+ Add Component** in the Inspector.
   Create global or scene scripts through their corresponding Programming commands.
   Keep the editor-assigned Asset ID; do not edit the registry or scene files by hand.
4. Paste the [complete behavior example](/docs/scripting/c/complete-behavior). Press **Play**, then hover or click the embedded
   Play viewport and hold **W**. The owner moves along positive Z at one unit per
   second. The Console shows **Behavior started** once. Stop Play to restore the
   authored scene. Attach to an object with a transform to see movement.

See [Complete behavior](/docs/scripting/c/complete-behavior) for the source to paste after attaching the script.
