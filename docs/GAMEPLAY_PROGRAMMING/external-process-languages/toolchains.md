# Install external language toolchains

[Back to External process languages](/docs/guides/gameplay-programming/external-process-languages).

Python requires Python 3; C# requires the .NET SDK; C/C++ requires Clang, GCC, or
MSVC; Java requires `java` and `javac`; PHP requires PHP CLI. Run `cargo xtask doctor`
to see the exact executable and version Rustic discovered.

On Windows, Setup offers these external toolchains as optional Gameplay Languages and
installs every selected item through Windows Package Manager. Lua, JavaScript, and
HTML/CSS are bundled. Additional toolchains can be installed later using **Rustic Game
Engine > Language Toolchain Manager** in the Start menu or by rerunning Setup.
