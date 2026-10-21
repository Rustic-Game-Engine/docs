# Requirements and installation

## Available builds

**Windows: experimental pre-alpha builds.** The engine’s [GitHub releases](https://github.com/Rustic-Game-Engine/engine/releases) publish x64 setup executables. Choose the release explicitly: GitHub’s “latest” shortcut can exclude pre-releases. Read its notes, download the attached `RusticGameEngine-Setup-*.exe`, run Setup, and launch Rustic from its Start-menu entry.

This is an engine release tag, separate from **Docs v0.1**. An installer filename’s package version is not the documentation version. No download is hosted by this docs site.

Setup bundles Project Manager, editor, runtime and asset worker; Lua 5.4, JavaScript/QuickJS, HTML/inline JS and the Luau host are engine-provided. Optional Python, C/C++, C#, Java and PHP tools can be selected in Setup or installed later through the **Language Toolchain Manager**. These tools use Windows Package Manager. You do not need Rust, Cargo or Inno Setup to use the installed editor.

If a release asset is unavailable, a successful [Windows installer workflow](https://github.com/Rustic-Game-Engine/engine/actions/workflows/windows-installer.yml) can provide an artifact to users with GitHub access. Extract the artifact ZIP before running Setup. Artifacts expire; a workflow existing does not guarantee a successful downloadable run.

## Automatic Windows updates

Windows builds that include the automatic updater check GitHub Releases when
Project Manager or the editor starts, then hourly while Rustic is open. Older
installations need one manual upgrade to an installer containing this feature.
There is no account or Rust toolchain setup step.

Newer Windows x64 releases, including the project's pre-alpha releases, download
in the background. The updater verifies the installer's size and SHA-256 against
GitHub before running Setup. Save your work and close Project Manager, every
editor and any running games or workers normally: installation waits until they
are closed. Start Rustic again to use the updated version. The updater never
forces an editor closed or reboots Windows. Setup retains the installation
directory, installation scope, selected languages and shortcut/PATH settings;
an all-users installation can still show Windows' elevation prompt.

This applies to installed Windows builds whose exact build commit has a published
release. Source builds, unpublished workflow artifacts, Linux and macOS do not
install updates automatically. Releases missing a single x64 installer or GitHub's
SHA-256 metadata are skipped. A build whose release has not been published yet
waits to avoid downgrading; the installer filename's package version is not used
to compare releases.

For download, checksum, API rate-limit or Setup failures, inspect
`%LOCALAPPDATA%\Rustic Game Engine\updates\<installation-key>\update.log` and
`update-setup.log` in the same folder. Failed checks retry hourly while Rustic is
open or on a later launch. If an update is waiting, close all Rustic processes;
you can also install the release manually from its GitHub page.

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

- **Optional tool install failed:** Setup runs one hidden PowerShell process for all selected languages and skips already-installed tools. A host initialization failure stops the batch and reports one optional-toolchain error; the engine remains installed. Retry later from **Language Toolchain Manager** after repairing the failing PowerShell or Microsoft App Installer installation. Setup does not require Windows Terminal.
- **Error `142` or `0xc0000142` during Setup:** retain the complete message; these are distinct codes. The failure dialog shows the launch error or exit code and the Setup log path. Setup automatically creates `Setup Log ...txt` in `%TEMP%`; run the installer with `/LOG="C:\path\setup.log"` to choose a location. If PowerShell started, its transcript is in the original user's `%LOCALAPPDATA%\Rustic Game Engine\logs\toolchain-install.log`. If that file is absent, the Setup log still records PowerShell startup failures. Start with bundled Lua while diagnosing optional tools.
- **Tool installed but not discovered:** restart Rustic after changing PATH. Use Project Manager **Settings** and the editor Console to inspect language availability.
- **Access denied:** choose a writable project directory. Avoid a protected installation location; check the actual OS permission error.
- **Editor does not launch or the viewport stays blank:** inspect Project Manager **Diagnostics**, then editor Console output. Check graphics-driver/backend errors and [Troubleshooting](/docs/troubleshooting).
- **Luau host missing:** reinstall a complete build or ask the distributor for the matching host. A standalone editor executable is not the full installed application.

## Build from source instead

Use [Building Rustic Engine from Source](/docs/open-source/engine/getting-started) if no suitable binary is available or you want to develop the engine. It documents the pinned Rust toolchain, native linker/dependencies, and `cargo xtask` commands. These are contributor requirements, not installed-editor setup steps.
