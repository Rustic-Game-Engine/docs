# Install external language toolchains

[Back to External process languages](/docs/guides/gameplay-programming/external-process-languages).

Python requires Python 3; C# requires the .NET SDK; C/C++ requires Clang, GCC, or
MSVC; Java requires `java` and `javac`; PHP requires PHP CLI. Run `cargo xtask doctor`
to see the exact executable and version Rustic discovered.

On Windows, Setup offers these external toolchains as optional Gameplay Languages and
installs every selected item through Windows Package Manager. Lua, JavaScript, and
HTML/CSS are bundled. Additional toolchains can be installed later using **Rustic Game
Engine > Language Toolchain Manager** in the Start menu or by rerunning Setup.

Setup uses one PowerShell process without allocating a console for all selected
toolchains and skips tools that are already installed. A bundled GUI setup helper
launches PowerShell and the agent integration installer under the original user's
account. The project manager is a Windows GUI executable, so launching it from the
Finish screen also avoids console-host initialization. Hiding a console window alone
does not prevent console-host startup failures.

A PowerShell launch failure or a WinGet initialization
failure stops the batch instead of retrying the failing host for every language.
Rustic itself remains installed; you can start with the bundled languages and retry
optional tools later from **Language Toolchain Manager**.

If Setup reports error `142` or `0xc0000142`, keep the full message: these are distinct
codes, and the failing executable matters. The Setup failure dialog includes the
launch error or exit code and the path to its log. Setup saves a log in `%TEMP%`
(`Setup Log ...txt`) automatically; use `/LOG="C:\path\setup.log"` to choose a location.
If PowerShell started, check the original user's
`%LOCALAPPDATA%\Rustic Game Engine\logs\toolchain-install.log` for the failed package
and WinGet output. Also check that user's
`%LOCALAPPDATA%\Rustic Game Engine\logs\setup-launch.log` for helper errors,
child-process output and exit codes, including failures before PowerShell starts its
transcript. The Setup log records failures to start the helper.

If `0xc0000142` occurs only during installation or the Finish-screen launch, close
Setup and open **Rustic Game Engine** from Start. If it opens, install a build with
the console-free setup helper; a working Start shortcut does not establish that
PowerShell or WinGet is broken. If **Language Toolchain Manager** also fails when
opened separately from Start, use the failing executable and logs to diagnose
PowerShell or Microsoft App Installer before retrying. Setup does not require Windows
Terminal. Agent integration failures are reported separately; retry with
`rustic-agent-backend.exe --install-user-integrations` from the installation directory.
