# Troubleshooting

[Back to Gameplay programming](/docs/guides/gameplay-programming).

- **Editor executable missing:** install VS Code, select VS Code Insiders, configure a
  validated custom executable and native argument template, or use system association.
- **Invalid script:** click its diagnostic to open the exact location. The last-known-
  good runtime instance continues during Play.
- **Manifest mismatch/missing source:** restore or re-import the source, or move it
  through the editor so the asset registry updates automatically;
  duplicate IDs are quarantined instead of guessed.
- **Reload rejected:** check API major, property types, source size, and syntax; use
  Restart Play after an intentionally incompatible change.
