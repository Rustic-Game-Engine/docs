# Extending your own engine version

Use a focused branch and a reproducible test project to develop a change to Rustic's Rust implementation. This page describes source-development workflow; gameplay examples remain in the [engine usage guides](/docs/engine).

## Pick a bounded first change

Good first investigations include one editor interaction, a clearer diagnostic, or a reproducible scripting defect. Define the trigger, current result, intended result, and affected source area before adding code. A proposal for a whole renderer, physics backend, or new export platform needs architecture and roadmap review first.

Start from the [source-layout map](/docs/open-source/engine/architecture). Read nearby types, public interfaces, error handling, and tests. Confirm that the behavior exists in implementation rather than only in the architecture baseline.

## Inspect before editing

From `Engine/`:

```sh
git switch -c improve-my-feature
rg --files crates/engine-scripting/src
rg -n 'TODO|#\[test\]' crates/engine-scripting/src
```

Use these searches to identify the appropriate module and tests; do not treat a TODO as a promise that an unimplemented API is already supported. Reproduce the problem in a small disposable project and record the scene, script, actions, and console result needed to trigger it.

## Changing a scripting feature

The scripting crate separates several responsibilities:

| Source area | What to investigate |
| --- | --- |
| `model.rs`, `manifest.rs` | Script model, declarations, and identities |
| `runtime.rs`, `lua.rs`, `javascript.rs` | Execution and bundled adapter behavior |
| `external_runtime.rs`, `external_runtime/` | External-language process adapters |
| `external_sdk.rs`, `cpp_sdk.rs`, `sdk/` | Generated or shipped language bindings and starter code |
| `external_editor.rs`, `workspace.rs` | Editor integration and generated workspace support |

Trace a change through the engine implementation and each affected adapter. Updating only a Lua example does not implement matching behavior for Java, C#, or Python. Keep language-specific limits explicit when support differs.

For a public API change, specify allowed inputs, results, callback timing, lifetime/cancellation behavior, and failure diagnostics. Use [gameplay architecture](/docs/guides/gameplay-architecture) and the existing API guides as cross-checks, then test the actual adapters affected by the change.

## Preserve project data and process boundaries

Do not overwrite scene files, project descriptors, catalogs, or other user data in place. The contribution guide requires temporary-file, flush, atomic-install behavior and a failure path that preserves the previous valid data.

When a change crosses editor/runtime/worker boundaries, inspect both sides and any versioned message or persisted schema. Include migration or compatibility behavior when a file/message format changes. Keep risky or blocking work out of UI/render execution paths according to the architecture boundary.

## Keep implementation and documentation together

An engine behavior change needs corresponding updates in both `Engine/docs` and the separate [docs repository](https://github.com/Rustic-Game-Engine/docs). Published pages are cataloged through `lib/docs-catalog.ts`; generated API content lives in `lib/api-docs.ts`.

Document exact setup, script attachment, expected results, limits, and common failures. Link the companion docs PR in the engine PR so reviewers can verify the intended public behavior. Source contributions to the docs site are explained in [Adding a page](/docs/open-source/docs/adding-pages).

## Finish with reviewable evidence

Run focused checks while iterating, then the full required engine checks and a fresh Windows installer build before reporting code changes complete. Include a reproduction, explanation of the final behavior, validation results, and any remaining manual qualification in the PR. See [Testing and debugging](/docs/open-source/engine/testing) for commands and environment-specific failures.
