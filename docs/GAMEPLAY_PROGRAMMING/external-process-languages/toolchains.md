# Install external language toolchains

[Back to External process languages](/docs/guides/gameplay-programming/external-process-languages).

Python requires Python 3; C# requires the .NET SDK; C/C++ requires Clang, GCC, or
MSVC; Java requires `java` and `javac`; PHP requires PHP CLI. Run `cargo xtask doctor`
to see the exact executable and version Rustic discovered.

On Windows, Setup offers these external toolchains as optional Gameplay Languages and
installs every selected item through Windows Package Manager. Lua, JavaScript, and
HTML/CSS are bundled. Additional toolchains can be installed later using **Rustic Game
Engine > Language Toolchain Manager** in the Start menu or by rerunning Setup.

On Windows, Rustic checks the editor's PATH first, then the saved system and user
PATH on each dependency check. For C/C++, it also checks LLVM's registered install
folder and the standard LLVM folders under Program Files and
`%LOCALAPPDATA%\Programs`. An existing LLVM installation does not need to be
reinstalled or added to PATH when it is found in one of those locations. After
installing a toolchain, return to the editor and press **Play** to check again.

If C/C++ is still reported missing, check that the LLVM `bin` folder contains
`clang.exe` for C and `clang++.exe` for C++. For an unregistered custom installation,
add its `bin` folder to your Windows user or system PATH and press **Play** again.
A WinGet package listing alone does not confirm that the required compiler files
are present. Other compiler, SDK, or linker errors appear in the Console after
discovery succeeds; repair the relevant toolchain if compilation fails.

Setup uses one hidden PowerShell process for all selected toolchains and skips tools
that are already installed. A PowerShell launch failure or a WinGet initialization
failure stops the batch instead of retrying the failing host for every language.
Rustic itself remains installed; you can start with the bundled languages and retry
optional tools later from **Language Toolchain Manager**.

If Setup reports error `142` or `0xc0000142`, keep the full message: these are distinct
codes, and the failing executable matters. The Setup failure dialog includes the
launch error or exit code and the path to its log. Setup saves a log in `%TEMP%`
(`Setup Log ...txt`) automatically; use `/LOG="C:\path\setup.log"` to choose a location.
If PowerShell started, check the original user's
`%LOCALAPPDATA%\Rustic Game Engine\logs\toolchain-install.log` for the failed package
and WinGet output. If no transcript exists, inspect the Setup log for a PowerShell
startup failure. Repair the failing PowerShell or Microsoft App Installer installation
before retrying; opening Windows Terminal is not required by Setup.
