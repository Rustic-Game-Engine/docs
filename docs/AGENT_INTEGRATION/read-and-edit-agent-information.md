# Read and edit agent information

[Back to AI agents & app data](/docs/guides/ai-agents).

The following are MCP tool names and copyable argument objects:

```json
{}
```

Pass that object to `workspace_info`, then to `list_agent_files` to list this
project's stored instructions and integration files.

Read project instructions with `read_agent_file`:

```json
{"path":"AGENTS.md"}
```

Replace instructions with `write_agent_file` (read the existing content first and
include any instructions you want to retain):

```json
{"path":"AGENTS.md","content":"# My game\nKeep gameplay scripts in scripts/. Inspect scenes before editing them.\n"}
```

Expect a `written` path in the response. Read it again to confirm the saved text.
Instruction and skill edits survive opening the editor again.

All three tools default to `scope: "project"`. To inspect shared user integrations,
pass `{"scope":"user"}` to `list_agent_files`. For example, read the stored Claude
skill with:

```json
{"scope":"user","path":".claude/skills/rustic-workspace/SKILL.md"}
```

`write_agent_file` accepts the same scope together with `path` and `content`.
Shared skill and instruction edits persist; Rustic refreshes client registration
and the shared plugin MCP command when the editor starts to follow the installed
backend executable.
