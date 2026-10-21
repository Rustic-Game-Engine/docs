# Troubleshooting

[Back to Gameplay programming](/docs/guides/gameplay-programming).

- **Play reports `IPC I/O failed` / `os error 2`:** older builds loaded assets,
  initialized graphics, and ran startup scripts before opening the runtime pipe.
  Update the editor and `rustic-runtime` together. The runtime now authenticates
  first and reports snapshot, script, UI, or renderer startup failures in the
  editor console. Startup uses a 30-second connection/readiness budget by default.
  If the process exits before authentication, the error includes its exit status
  and the project's logs directory; inspect the newest `crash-*.log` there.
  A missing crash log can mean Windows could not load the executable or a required
  DLL. Reinstall the engine to restore its bundled files. For a source checkout,
  run `cargo build --locked --workspace` so matching binaries sit together.
  Start Play again after correcting the reported cause; the first game frame
  appears once startup succeeds.
- **Editor executable missing:** install VS Code, select VS Code Insiders, configure a
  validated custom executable and native argument template, or use system association.
- **Invalid script:** click its diagnostic to open the exact location. The last-known-
  good runtime instance continues during Play.
- **Manifest mismatch/missing source:** restore or re-import the source, or move it
  through the editor so the asset registry updates automatically;
  duplicate IDs are quarantined instead of guessed.
- **Reload rejected:** check API major, property types, source size, and syntax; use
  Restart Play after an intentionally incompatible change.
