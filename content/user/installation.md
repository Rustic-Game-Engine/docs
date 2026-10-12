# Requirements and installation

## Available builds

**Windows: experimental pre-alpha builds.** The engine’s [GitHub releases](https://github.com/Rustic-Game-Engine/engine/releases) publish x64 setup executables. On 12 October 2026 the newest published release tag was **v0.5-Pre-Alpha**. Choose the release explicitly: GitHub’s “latest” shortcut can exclude pre-releases. Read its notes, download the attached `RusticGameEngine-Setup-*.exe`, run Setup, and launch Rustic from its Start-menu entry.

This is an engine release tag, separate from **Docs v0.1**. An installer filename’s package version is not the documentation version. No download is hosted by this docs site.

Setup bundles Project Manager, editor, runtime and asset worker; Lua 5.4, JavaScript/QuickJS, HTML/inline JS and the Luau host are engine-provided. Optional Python, C/C++, C#, Java and PHP tools can be selected in Setup or installed later through the **Language Toolchain Manager**. These tools use Windows Package Manager. You do not need Rust, Cargo or Inno Setup to use the installed editor.

If a release asset is unavailable, a successful [Windows installer workflow](https://github.com/Rustic-Game-Engine/engine/actions/workflows/windows-installer.yml) can provide an artifact to users with GitHub access. Extract the artifact ZIP before running Setup. Artifacts expire; a workflow existing does not guarantee a successful downloadable run.

## System requirements and platform status

| Platform | What the available evidence supports |
| --- | --- |
| Windows x64 | Published pre-alpha installer; MSVC source workflow and Windows CI. Native audio output, microphone capture and device selection are Windows-specific. |
| Linux | Source builds and Linux CI. Requires a desktop/window environment and working graphics drivers for the GUI. The current player audio implementation is headless on non-Windows hosts. No Linux installer is established by the checked-in packaging workflow. |
| macOS | Architectural target; release qualification and a ready-to-use package are not established by the inspected source. |
| Browser/mobile | No verified browser or mobile game export workflow. HTML scripting is not browser deployment. |

A working native graphics driver, writable project directory and space for project assets/caches are required. No verified minimum RAM, CPU, GPU or disk specification is published; do not treat invented hardware numbers as requirements. Rendering backend selection is covered in [Rendering System](/docs/open-source/engine/rendering-system).

## First launch

1. Launch the installed **Project Manager**.
2. Choose a writable location for projects, such as a directory in your user files. The program installation directory is not a suitable project workspace.
3. Continue to [Create and reopen a project](/docs/getting-started/create-project).

## Installation and startup problems

- **Optional tool install failed:** inspect Setup/Language Toolchain Manager output and Windows Package Manager availability. Start with bundled Lua; other languages can wait.
- **Tool installed but not discovered:** restart Rustic after changing PATH. Use Project Manager **Settings** and the editor Console to inspect language availability.
- **Access denied:** choose a writable project directory. Avoid a protected installation location; check the actual OS permission error.
- **Editor does not launch or the viewport stays blank:** inspect Project Manager **Diagnostics**, then editor Console output. Check graphics-driver/backend errors and [Troubleshooting](/docs/troubleshooting).
- **Luau host missing:** reinstall a complete build or ask the distributor for the matching host. A standalone editor executable is not the full installed application.

## Build from source instead

Use [Building Rustic Engine from Source](/docs/open-source/engine/getting-started) if no suitable binary is available or you want to develop the engine. It documents the pinned Rust toolchain, native linker/dependencies, and `cargo xtask` commands. These are contributor requirements, not installed-editor setup steps.
