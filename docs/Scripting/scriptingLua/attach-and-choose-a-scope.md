# Attach and choose a scope

[Back to Lua 5.4](/docs/scripting/lua).

- **Global Startup Script**: one game-lifetime instance, started when Play starts.
- **Scene Startup Script**: one scene-lifetime instance, started after globals when
  its `scene/{name}.scene` loads.
- **Object Component Script**: one instance per attachment, created and removed with
  its object. Select the object and use **+ Add Component**, or drag the script from
  Explorer onto the viewport.



[![Programming menu showing global startup, scene startup and object component script scopes.](/images/engine/programming-01-scope-menu.png "Choose global, scene, or object-component scope from Programming.")](/images/engine/programming-01-scope-menu.png)



[![Cube gameplay scripts section with Add Component picker offering scripts example behavior Lua.](/images/engine/programming-03-attach-existing-picker.png "Cube is selected and its component picker lists the existing example behavior. This is not a newly created script.")](/images/engine/programming-03-attach-existing-picker.png)



[![Gameplay scripts section with one enabled example Lua behavior on Cube.](/images/engine/attached-lua-component-detail.png "The sample Cube has one enabled Lua attachment. Open the full image to see the source file in Explorer.")](/images/engine/programming-04-attached-script-and-explorer.png)

Moving or renaming the `.lua` file in the editor is safe because the attachment holds
its persistent Asset ID. Do not edit `config/scripts.ron`.
