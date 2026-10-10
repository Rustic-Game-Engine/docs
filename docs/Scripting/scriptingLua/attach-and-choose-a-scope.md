# Attach and choose a scope

[Back to Lua 5.4](/docs/scripting/lua).

- **Global Startup Script**: one game-lifetime instance, started when Play starts.
- **Scene Startup Script**: one scene-lifetime instance, started after globals when
  its `scene/{name}.scene` loads.
- **Object Component Script**: one instance per attachment, created and removed with
  its object. Select the object and use **+ Add Component**, or drag the script from
  Explorer onto the viewport.

Moving or renaming the `.lua` file in the editor is safe because the attachment holds
its persistent Asset ID. Do not edit `config/scripts.ron`.
