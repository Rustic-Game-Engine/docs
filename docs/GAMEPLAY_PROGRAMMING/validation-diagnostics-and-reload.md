# Validation, diagnostics, and reload

[Back to Gameplay programming](/docs/guides/gameplay-programming).

Source is UTF-8 and limited to 1 MiB. Validation compiles without execution before a
snapshot or reload is sent. Snapshot and reload hashes are verified. During Play,
**Reload Scripts** validates all manifest entries and sends only successful source over
authenticated, bounded IPC. Replacement occurs at a simulation boundary. Existing
typed properties and runtime transforms remain. Property-schema additions/removals
currently require Restart Play; incompatible live replacement is rejected. A failed
reload leaves the prior instance running. **Restart Play** rebuilds the
immutable snapshot.

Console records identify process and subsystem, collapse duplicates, filter/search,
copy, clear, and open source/stack locations externally. Interactive debugging is not
currently claimed.
