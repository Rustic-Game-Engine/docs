# Fork, build, and run your own version

[Back to Engine repository](/docs/open-source/engine).

Fork the repository on GitHub, then replace `YOUR_ACCOUNT` below:

```sh
git clone https://github.com/YOUR_ACCOUNT/engine.git
cd engine/Engine
git switch -c my-engine-change
rustup show active-toolchain
cargo install cargo-deny --locked --version 0.20.2
cargo xtask doctor
cargo xtask build
cargo xtask run project-manager
```

Rustup selects the repository-pinned toolchain in `Engine/`. `doctor` checks required tools, repository files, dependency policy, and gameplay toolchain availability. `build` builds the bundled Luau host and the workspace. The last command builds the editor, launches the native project manager, and lets you create or import a project and open the editor.

For a distributable optimized build:

```sh
cargo xtask build --profile distribution
```

The task runner accepts `dev`, `dev-fast`, `release`, and `distribution` profiles. Keep project files and persistent data compatible unless your change includes an explicit migration.
