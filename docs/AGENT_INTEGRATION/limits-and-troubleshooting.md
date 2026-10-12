# Limits and troubleshooting

[Back to AI agents & app data](/docs/guides/ai-agents).

- These tools operate locally for the current OS user. App-data instructions are
  not included when sharing or checking in a game directory. Moving the project
  changes its storage key; copy important instructions through the tools if needed.
- Reads and writes accept UTF-8 text up to 2 MiB. Paths are relative to the selected
  agent directory and use `/` separators. Absolute paths (including Windows drive
  paths on Linux), backslashes, colons, `..`, `.git`, and symlinks that escape it
  are rejected. For example, use `notes/behavior.md`, not `C:/notes/behavior.md`
  or `notes\behavior.md`. Project and shared user scopes do not expose other
  projects' storage. A path error means you should call `list_agent_files`, then
  use a relative path within the selected scope.
- If the tools are missing, reopen the editor and reload your agent's MCP server.
  Confirm the installed backend executable exists. You can rerun
  `rustic-agent-backend.exe --install-user-integrations` to register it again.
- “No Rustic project is selected” is a tool error, not a failed MCP startup.
  Call `workspace_info` with `{"project_root":"C:/Games/MyGame"}` using an
  absolute path to a readable game directory containing `project.engine`.
  Later file and scene tools use that selected game. An invalid selection
  reports a tool error and keeps the previous selection; it does not close the
  server. You can also set `--project` in the MCP registration and reload it.
- An older backend may exit with “The supplied folder is not a readable Rustic
  project” before connecting when Codex starts outside a game. Point that
  registration at the game with `--project`, or install the updated backend
  and reload the connection. Opening the editor alone does not replace an
  already running MCP process.
- If a file is missing, call `list_agent_files` and check the scope and relative
  path. Ordinary `read_file` and `write_file` address game content; agent metadata
  uses `read_agent_file` and `write_agent_file`.
- If migration or saving fails, check permissions on the project and Rustic app
  data and the editor's startup error output. Existing files are only removed
  after their contents have been stored; unrelated agent directories stay intact.
