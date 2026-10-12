# Connect an agent

[Back to AI agents & app data](/docs/guides/ai-agents).

1. Install Rustic and open your game project in the Rustic editor once. Opening
   the project generates its agent information and registers the
   `rustic-workspace` MCP server in your user Codex and Claude configuration.
2. Reload the agent's MCP connections if it was already running. Starting
   from the game directory (or a directory below it) automatically discovers
   the containing `project.engine` file. The backend also starts from other
   directories: the MCP handshake and tool list do not require a game project.
   To bind a game from the Codex desktop app or an engine checkout, call
   `workspace_info` with `{"project_root":"C:/Games/MyGame"}`. Use an absolute
   directory path; selection is retained for this MCP session. Alternatively,
   configure the installed `rustic-agent-backend.exe` with arguments
   `["--project", "C:/Games/MyGame"]` and reload the connection.
3. Invoke the `rustic-workspace` skill, or `/rustic-workspace` in Claude, and ask
   it to inspect your project. Call `workspace_info` first; its `project_root`
   identifies the game and `agent_directory` identifies its stored information.
4. Read instructions through `read_agent_file` before editing game content.
   Use `scene_summary` with your scene's relative path before changing a scene.


The stdio MCP server runs on the same computer as the agent client and the game
files. A local Rustic editor registration is not available to a Codex cloud
chat. Use a local Codex chat with the registered MCP connection to control that
game. Opening a game locally does not expose the backend to a remote executor,
and a missing `@rustic-workspace` entry in a cloud chat does not establish that
the local server crashed.

Only small discovery skills, a Claude command, and client registration settings
remain in the user profile so agent applications can find the integration. The
full skills and plugin live in Rustic app data. No gameplay script attachment or
Play session is needed to use these authoring tools.
