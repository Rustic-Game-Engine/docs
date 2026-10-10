# Security and limitations

[Back to HTML/CSS](/docs/scripting/web).

Inline code cannot call another script object. API 1.1 adds shared `Events`
and gameplay actions to inline JavaScript; see [Shared gameplay actions](gameplayActions.md).

Inline code has no DOM, filesystem, network, Node APIs, processes, environment
variables, package loading, or editor/backend access. Source must be UTF-8 and no
larger than 1 MiB. Syntax/structure is validated before Play or reload. A validation
failure leaves the previous good instance running; a callback failure disables only
the failing behavior. Use Web assets for lifecycle-driven UI logic or future-facing
content organization, not for browser rendering in the current release.
