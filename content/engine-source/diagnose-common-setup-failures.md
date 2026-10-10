# Diagnose common setup failures

[Back to Engine repository](/docs/open-source/engine).

- Wrong Rust version: run commands in `engine/Engine` and compare `rustup show active-toolchain` with `rust-toolchain.toml`.
- Linker or window-system errors: install native build tools and the [platform dependencies](/docs/open-source/engine/prerequisites).
- `cargo deny` unavailable: install the pinned `cargo-deny` version and rerun `doctor`.
- An optional gameplay language is reported unavailable: install that language's toolchain and follow its guide; that is different from a missing Rust build prerequisite.
- GUI launch fails in a headless environment: use the CI smoke-test setup or launch in a desktop session with working graphics.

Return to the [open-source repository directory](/docs/open-source) for docs, examples, and hosting SDK guides.
