# Project layout and ownership

[Back to Gameplay programming](/docs/guides/gameplay-programming).

- `scripts/*.{lua,luau,js,py,cs,c,cpp,java}` is user-owned gameplay source.
- `scene/{scene-name}.scene` contains authored scenes. Existing
  `scenes/*.rscene` projects remain supported and are saved in place.
- `ui/*.{html,css,js,php}` is user-owned game UI source. HTML, CSS, and PHP
  entries outside this directory are rejected by the manifest loader.
- `config/scripts.ron` is the editor-owned, versioned asset registry. Developers do
  not edit it. Every source receives a stable Asset ID; editor moves/renames update
  the path transactionally while scene and object references remain unchanged.
- `<Project>.code-workspace` and `.rustic/generated/programming/*` are reproducible
  engine output and carry a generated marker.
- `.vscode/settings.json`, `tasks.json`, and `launch.json` are user-owned and never
  overwritten. Generated extension recommendations, API declarations, and protocol
  schema live below `.rustic/generated/programming`.



[![Cube with one enabled Lua behavior and Explorer listing the source script, main scene, registry and UI directory.](/images/engine/programming-04-attached-script-and-explorer.png "The source file in Explorer and the enabled behavior attached to Cube.")](/images/engine/programming-04-attached-script-and-explorer.png)



[![Programming menu showing global startup, scene startup and object component script scopes.](/images/engine/programming-01-scope-menu.png "Choose global, scene, or object-component scope from Programming.")](/images/engine/programming-01-scope-menu.png)



[![Programming scope and component language menus, including Lua 5.4.](/images/engine/programming-scope-language-detail.png "Scope and language menus in the captured build. Luau is absent from this menu; availability depends on the installed build.")](/images/engine/programming-02-component-languages.png)



[![User-owned source is registered with a stable Asset ID, attached by scope, validated and instantiated in Play.](/images/engine/script-asset-lifecycle.svg "Conceptual script lifecycle. Source belongs to you; the registry and attachment identities are managed by the editor.")](/images/engine/script-asset-lifecycle.svg)

Use **Programming** to create a Global Startup, Scene Startup, or Object Component
script in any supported language. Use **+ Add Component** in the Inspector or drag a
script from Explorer onto the viewport to attach an existing script to the selected
object. Use **Open Project in Code Editor**
or click a console source/frame to open the exact file, line, and column. Custom
editor argument templates are arrays of native arguments and support `{file}`,
`{line}`, `{column}`, `{project}`, and
`{workspace}`; shell commands are never constructed.
