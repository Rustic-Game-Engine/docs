# Setup and attachment

[Back to C#](/docs/scripting/csharp).

1. Install .NET SDK 10 or newer. On Windows, select **C#** in Rustic Setup or
   **Language Toolchain Manager** from the Start menu to install the SDK. Rustic
   automatically checks the default Windows location, `%ProgramFiles%\dotnet`,
   the per-user `.dotnet` folder, and PATH. Standard system and per-user .NET
   folders are checked on macOS and Linux too. For a custom location, set
   `DOTNET_ROOT` to the folder containing `dotnet` and reopen Rustic so it
   inherits the new variable. Run `dotnet --list-sdks` using that installation
   to check that it lists version 10 or newer.
   Check the Project Manager’s **Settings** language tools and the editor **Console** for discovery errors. Contributors with a source checkout can optionally run `cargo xtask doctor` from `Engine/`.
2. Open your game project and scene. Select a **Part** object for this movement example.
3. Use **Programming > Object Component Script** and select C#.
   Save the asset, then attach it to the selected object using
   **Programming > Attach Existing Script** or **+ Add Component** in the Inspector.
   Create global or scene scripts through their corresponding Programming commands.
   Keep the editor-assigned Asset ID; do not edit the registry or scene files by hand.
4. Paste the [complete behavior example](/docs/scripting/csharp/complete-behavior). Press **Play**, then hover or click the embedded
   Play viewport and hold **W**. The owner moves along positive Z at one unit per
   second. The Console shows **Behavior started** once. Stop Play to restore the
   authored scene. Attach to an object with a transform to see movement.

See [Complete behavior](/docs/scripting/csharp/complete-behavior) for the source to paste after attaching the script.
