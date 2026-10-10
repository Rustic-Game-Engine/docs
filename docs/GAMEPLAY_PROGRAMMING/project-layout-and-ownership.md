# Project layout and ownership

[Back to Gameplay programming](/docs/guides/gameplay-programming).

Rustic's agent instructions and Codex/Claude integration files live in editor app
data. Use the `rustic-workspace` MCP tools to inspect or edit them; see
[AI agents and editor app data](AGENT_INTEGRATION.md) for setup and examples.

- `scripts/*.{lua,js,py,cs,c,cpp,java}` is user-owned gameplay source.
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

Use **Programming** to create a Global Startup, Scene Startup, or Object Component
script in any supported language. Use **+ Add Component** in the Inspector or drag a
script from Explorer onto the viewport to attach an existing script to the selected
object. Use **Open Project in Code Editor**
or click a console source/frame to open the exact file, line, and column. Custom
editor argument templates are arrays of native arguments and support `{file}`,
`{line}`, `{column}`, `{project}`, and
`{workspace}`; shell commands are never constructed.
