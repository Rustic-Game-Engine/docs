# Setup and attachment

[Back to Python](/docs/scripting/python).

1. Install Python 3 on PATH. Restart the editor after changing PATH.
   Run `cargo xtask doctor` from the Engine folder to check discovery.
2. Open your game project and scene. Select a **Part** object for this movement example.
3. Use **Programming > New Script > Object Component Script** and select Python.
   Save the asset, then attach it to the selected object using
   **Programming > Attach Existing Script** or **+ Add Component** in the Inspector.
   Create global or scene scripts through their corresponding Programming commands.
   Keep the editor-assigned Asset ID; do not edit the registry or scene files by hand.
4. Paste the [complete behavior example](/docs/scripting/python/complete-behavior). Press **Play**, then hover or click the embedded
   Play viewport and hold **W**. The owner moves along positive Z at one unit per
   second. The Console shows **Behavior started** once. Stop Play to restore the
   authored scene. Attach to an object with a transform to see movement.

See [Complete behavior](/docs/scripting/python/complete-behavior) for the source to paste after attaching the script.
