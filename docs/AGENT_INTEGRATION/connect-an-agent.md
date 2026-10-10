# Connect an agent

[Back to AI agents & app data](/docs/guides/ai-agents).

1. Install Rustic and open your game project in the Rustic editor once. Opening
   the project generates its agent information and registers the
   `rustic-workspace` MCP server in your user Codex and Claude configuration.
2. Start your agent from the game directory (or a directory below it), and reload
   its MCP connections if it was already running. The backend discovers the
   containing `project.engine` file. You can also explicitly configure its
   command as the installed `rustic-agent-backend.exe` and arguments as
   `["--project", "C:/Games/MyGame"]`.
3. Invoke the `rustic-workspace` skill, or `/rustic-workspace` in Claude, and ask
   it to inspect your project. Call `workspace_info` first; its `project_root`
   identifies the game and `agent_directory` identifies its stored information.
4. Read instructions through `read_agent_file` before editing game content.
   Use `scene_summary` with your scene's relative path before changing a scene.

Only small discovery skills, a Claude command, and client registration settings
remain in the user profile so agent applications can find the integration. The
full skills and plugin live in Rustic app data. No gameplay script attachment or
Play session is needed to use these authoring tools.
