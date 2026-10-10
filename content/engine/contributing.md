# Contributing

Contribute focused fixes, documented engine features, reproducible tests, and bug reports to the [engine repository](https://github.com/Rustic-Game-Engine/engine). Read its `AGENTS.md` files, `Engine/CONTRIBUTING.md`, architecture baseline, and roadmap before implementation.

## Workflow and coding standards

Fork and clone the engine, branch from the target branch, and run commands inside `Engine/`. Explain the concrete problem and expected behavior before expanding scope. Keep application wiring in apps, shared services in crates, and backend/language types inside adapters.

Use the pinned Rust toolchain, rustfmt, and workspace Clippy rules. The workspace forbids unsafe code through its lint policy. Keep dependencies locked and approved by `deny.toml`. Persistent user data needs staged, flushed, atomic writes and a failure path that retains prior valid data. Baseline architecture changes need a decision record in `Engine/docs/decisions/`.

## Tests and documentation

```sh
cargo xtask doctor
cargo xtask test
```

The test task builds Luau and runs formatting, Clippy, tests, checks, dependency/license checks, and application smoke checks. Add tests for changed behavior and failure/recovery boundaries; use focused reproduction fixtures rather than assertions that merely repeat implementation.

Update corresponding engine-local guides and the [docs site](/docs/open-source/docs) for user-visible engine or scripting changes. Verify samples against the implementation and link a companion documentation PR when changes span repositories. Repository instructions require a fresh Windows installer for engine code changes; use a Windows environment/workflow and report any failure or unavailable validation.

## Pull requests and review

Describe the final problem, resulting behavior, validation, and any migration or platform limitation. Follow the engine repository's completion instructions for committing, pushing, opening/updating the PR, and applying `type:*` plus relevant `area:*` labels. Keep generated artifacts out of source control.

For bug reports, provide the engine commit, environment, exact steps, expected/actual results, and a minimal scene/script. See [Troubleshooting](/docs/open-source/engine/troubleshooting) for useful diagnostics. Reviewers should be able to reproduce the issue and assess both successful behavior and recovery.
