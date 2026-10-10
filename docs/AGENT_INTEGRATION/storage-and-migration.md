# Storage and migration

[Back to AI agents & app data](/docs/guides/ai-agents).

On Windows the location is normally
`%LOCALAPPDATA%/RusticEngine/RusticGameEngine/data/editor/agents`.
`projects/<hash>` separates projects using the canonical project path; `user`
holds shared integrations. Trust `workspace_info.agent_directory` for the actual
project location rather than calculating a hash yourself.

Opening an older project transfers Rustic's plugin and Claude skill, including
edited files, into app data. Generated `AGENTS.md` and `CLAUDE.md` move as well.
Rustic removes only its own registration from shared project MCP and marketplace
files. Other plugins and user-owned instruction files stay in place. If both
locations contain different versions of a file, migration keeps the old file in
the project as well as the app-data version; compare them before removing either.
Empty integration directories are removed after migration.
