# Engine testing and debugging

Verify a source change at the level it affects: a crate test for local logic, an application smoke check for startup, an adapter test for external scripting, and a real editor/Play scenario for interactive behavior. No single build proves all four paths work.

## Full local verification

After [setting up the environment](/docs/open-source/engine/setup), run from `Engine/`:

```sh
cargo xtask doctor
cargo xtask test
```

The current test task builds the standalone Luau host, runs doctor, checks formatting, runs Clippy with warnings denied, runs workspace tests and checks, audits dependencies/licenses, and runs project-manager/editor smoke checks. It also verifies that the deliberate failure smoke path actually fails.

The [quality workflow](https://github.com/Rustic-Game-Engine/engine/blob/main/.github/workflows/quality.yml) adds separate Luau formatting/Clippy/tests, external-language qualification, and Windows installer verification. Read it when your change involves those areas.

## Focused iteration

Use targeted checks to shorten iteration, then run the full gates before completion:

```sh
cargo test --locked -p engine-scripting
cargo check --locked -p engine-editor
cargo fmt --all --check
cargo clippy --locked --workspace --all-targets -- -D warnings
```

Substitute the actual crate/package for the source area you changed. Test-name filters can match zero tests, so inspect the test output; a successful exit with no relevant cases is not evidence for the changed behavior.

## Application startup checks

```sh
cargo run --locked -p rustic-project-manager -- --headless-smoke
cargo run --locked -p rustic-editor -- --headless-smoke
```

These exercise application startup paths. They do not replace manual editor interaction, script attachment, imported assets, or Play testing. The `--headless-smoke-fail` launcher path is deliberately unsuccessful; CI checks that it does not accidentally return success.

## Headless graphics environments

Some runtime tests render frames even without an interactive window. Linux CI installs Mesa Vulkan drivers, locates the Lavapipe ICD, sets `VK_DRIVER_FILES`, and creates a private `XDG_RUNTIME_DIR`. Use the workflow's actual setup for your runner rather than copying an assumed ICD filename from another distribution.

If a test fails only on a headless machine, distinguish missing graphics setup from an engine assertion. Record the backend/driver and failing command. A GUI application still needs a desktop session when testing its visible editor behavior.

## External-language conformance

The workflow provisions Python, .NET, Java, PHP, and C/C++ tools and builds the standalone Luau host before running external runtime tests. If your machine lacks an optional toolchain, confirm which cases actually ran.

For a language adapter change, reproduce the behavior with that language's documented starter/SDK, callback registration, and entity attachment. Check diagnostics, teardown, and reload behavior as well as the successful call. A bundled-language test alone does not validate every external host.

## Package and manually qualify

Engine code completion requires a fresh Windows installer built through `tools/build-windows-installer.ps1`. Run it on Windows or the repository's installer workflow and confirm a new setup executable, not an older artifact. Source checks on Linux cannot prove the Windows installer succeeded.

For a behavior change, write down a minimal manual sequence: create/open the test project, attach the script or component, enter Play, inspect the expected result, stop, and repeat after reload. Include relevant failure and recovery behavior, especially when altering persistence or process supervision.

## Report useful failures

Capture the command, engine revision, operating system, graphics setup when relevant, exact error, and a minimal project or test case. Avoid sharing tokens, private project data, or machine-specific credentials in logs. Separate reproducible source defects from missing optional tools and platform setup.

Return to the [engine source overview](/docs/open-source/engine).
