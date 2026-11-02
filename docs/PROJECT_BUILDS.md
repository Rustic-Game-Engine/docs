# Build and distribute a project

Open a writable project in the editor, choose **File → Build Project…**, and select a target. Every build gets a new `project-*` folder in the project's configured builds directory. The dialog displays requirements, build failures, and the successful output path. Settings are saved in `config/build.json` when you build. Failed output folders are removed; previous successful builds remain available.

Game packages contain a validated snapshot of the **active scene, including unsaved edits**, other scenes in `scene/` or `scenes/`, assets in `assets/`, HTML/CSS UI in `ui/`, game settings, and registered script sources. Save other scenes before building. This packages the engine runtime and scripts; it does not translate scripts into machine code. The current snapshot collector uses these standard content folders. Projects with custom content paths should move referenced content into the standard folders before exporting.

## Windows game and custom installer

Build on Windows with `rustic-runtime.exe` beside the editor. Installed engine distributions include it; source users should build the workspace. A compatible Windows GPU/driver is required to run the game.

1. Select **Windows game (.exe)** and enter the application name.
2. Leave **Create a custom installer** enabled to build setup, or disable it for a portable game folder.
3. For setup, leave the **Inno Setup compiler** field as `ISCC.exe` (or blank). When you click **Build Project**, the background worker finds Inno Setup on PATH, in standard installation folders, or through its Windows uninstall registration. If missing, it downloads the signed Inno Setup 6.7.3 installer from the official GitHub release and installs it for the current user without administrator access. The compiler folder is added to your user PATH, and this build continues without restarting the editor. First installation requires internet access. To use a custom installation, expand **Design installer** and enter its existing absolute `ISCC.exe` path.
4. Set a numeric version such as `1.0.0`, publisher and welcome message. Choose modern/classic wizard styling and whether to offer a desktop shortcut. The dialog shows a text preview.
5. Optionally use **Browse…** beside the license, setup icon, and wizard image fields to select a plain text (`.txt`) license, `.ico` setup icon, and `.bmp` wizard image. The file explorer starts in your project folder and stores the selected path relative to it. Copy files from outside the project into it before selecting them; otherwise the dialog reports an error and keeps the previous value. You can also type or clear these optional paths directly. For example, `branding/license.txt`, `branding/setup.ico`, and `branding/wizard.bmp`. Inno Setup validates image formats/dimensions; its standard large wizard image is 164 × 314 pixels. The compiled wizard displays these images; the editor preview displays text.
6. Click **Build Project**. Distribute `setup.exe`, or distribute the complete `game/` folder containing `<Application name>.exe` and `data/`. Launch the game by opening the executable; the editor is not required.

Setup installs per user into `%LOCALAPPDATA%\Programs\<Application name>`, adds a Start menu shortcut and an uninstaller, and optionally offers a desktop shortcut. The generated `installer.iss` is kept beside setup for inspection. The setup icon customizes the installer, not the game executable's embedded icon. These are unsigned builds; signing and store publication are separate steps.

The game opens its own window and isolated simulation, forwards keyboard, primary mouse and touch input, and stops the simulation when the window closes. Logs are written under `%LOCALAPPDATA%\RusticGames\<Application name>\logs` on Windows. Lua 5.4, JavaScript and HTML/CSS script support are bundled. Available sibling DLLs and `rustic-luau-host.exe` are copied. Other external script languages still require their supported toolchains on the player's machine; test the result on a clean machine.

## Playable website

Select **Website (playable game)** and click **Build Project**. The editor exports the current game automatically: its scene snapshot, registered scripts, assets, HTML/CSS game UI, browser player and compiled WebAssembly runtime. **Do not create a `web/` folder or prepare a separate website.** No game server is required.

The output's `website/` directory contains `index.html`, `player.js`, `rustic-browser.js`, `rustic-browser.wasm`, the game file manifest, `data/`, and a `readme.md` with local preview and publishing instructions. Publish the complete directory to any static web host, including a subdirectory. For a local preview:

```sh
python -m http.server 8080 --directory <output>/website
```

Open `http://localhost:8080`. The game starts automatically with no engine-added menu, Play button, or loading overlay; only startup failures display an error. The browser runs the shared Rustic game simulation, physics, scene loading, renderer, Lua/JavaScript behaviors and audio locally. Keyboard input goes to the focused game canvas; mouse and touch input are mapped to the letterboxed game image. Click, tap, or press a key in the game to enable audio; browsers require a player interaction before sound can start. Opening `index.html` directly through `file://` does not work because browsers restrict file fetches.

Use a recent browser with WebAssembly exception handling and WebGL 2. The generated player reports missing/corrupted files, unsupported graphics and runtime initialization failures. Game files are verified before scripts execute. Browser file writes use the runtime's in-memory filesystem and disappear on reload. Native microphone capture and native audio-device selection are unavailable; ordinary game audio uses Web Audio.

**Script compatibility:** direct web and Android exports currently support Lua 5.4, JavaScript and HTML/CSS behaviors. Scripts that need external desktop processes (including Luau, Python, C/C++, C#, Java and PHP) cause an explicit build error. Standalone PHP pages also cause an error. They are not silently omitted or converted. Use supported behaviors for these targets.

Installed engine distributions bundle `browser-runtime/` beside the editor. Game authors do not need Emscripten to export when those resources are installed. Source developers must build that runtime once with `python tools/build-browser-runtime.py` from the engine workspace, after activating Emscripten SDK 6.0.13 and installing Rust, Python 3 and libclang. The default output is `target/distribution/browser-runtime/`; keep it beside the editor executable. For a `dev-fast` editor, pass `--profile dev-fast`.

## Android APK and AAB

This target builds an **existing compatible Android app template**; the desktop engine currently does not supply an Android runtime or automatically turn scenes into a mobile game. Your template must implement the runtime that consumes the staged snapshot. Installing the Android SDK alone is insufficient.

1. Place the compatible Gradle project in `android/` (or select another project-relative folder). It must contain an `app/` module, the Gradle wrapper script (`gradlew` on Unix or `gradlew.bat` on Windows), `gradle/wrapper/gradle-wrapper.jar`, and its wrapper properties. Keep the usual `settings.gradle[.kts]` and build scripts.
2. Install a JDK compatible with the template's Android Gradle plugin. Set `JAVA_HOME` to that JDK. Install the Android SDK, accept its licenses, and set `ANDROID_HOME` or `ANDROID_SDK_ROOT` to its directory. Install the platform/build-tools/NDK versions required by your template; Gradle reports any remaining missing resources.
3. Leave `app/src/main/assets/rustic` absent in the template: the build reserves it for the snapshot. The template's runtime must read its manifest and game files from that assets path.
4. Select **Android APK (debug)** to run `assembleDebug`, or **Android App Bundle (release)** to run `bundleRelease`. Configure package ID, SDK levels, version codes, ABIs, and release signing in your Android template. Configure signing with environment variables or a local credential provider; keep credentials and keystores outside game assets.
5. Build. The template is copied into the new output folder and built there, leaving the original unchanged. The snapshot is added to the copied app's assets. Completed `.apk` or `.aab` files appear under `artifacts/`. The temporary copied Android project is removed after success. Release signing follows the template; an AAB is not guaranteed store-ready or signed by this dialog.

An APK can be installed on a compatible device with `adb install <output>/artifacts/app-0.apk`. An AAB is a publishing artifact, not directly installable with adb. Test with your template's supported device/ABI and store tooling before distribution.

## Troubleshooting

- **Build is disabled:** check the Required messages. Read-only editors cannot build; close the other writable editor and reopen the project. Windows packaging requires a Windows host and its bundled runtime. Inno Setup is configured automatically only when creating setup; a missing default compiler does not disable the build.
- **Inno Setup configuration failed:** check the displayed error, internet access to GitHub releases, and permission to install in your local Programs folder and update your user PATH, then retry **Build Project**. A failed signature check stops installation. You can also install Inno Setup 6 manually and enter its existing absolute `ISCC.exe` path. Invalid custom paths are reported in **Required**; reset the field to `ISCC.exe` for automatic setup. Inspect compiler failures for invalid version or image resources.
- **Website fails to load:** serve the complete generated `website/` directory over HTTP/HTTPS rather than opening `index.html` directly. Check the displayed error, browser console, and WebGL 2/WebAssembly support.
- **Browser runtime missing:** install an engine distribution with `browser-runtime/` or build the resources from source as described above.
- **Website has no sound:** click, tap, or press a key in the game to enable browser audio.
- **Resource path rejected:** use a path inside the project without `..` or absolute components. Remove symbolic links from website/Android build inputs. Choose a source folder outside the builds directory; outputs cannot be nested in their input.
- **Gradle fails:** the dialog includes its exit status and output. Check JDK/SDK compatibility, wrapper resources, required platform packages, SDK licenses, network access for Gradle dependencies, and release signing configuration.
- **Game fails to launch:** distribute the whole `game/` folder or run setup; do not move only the executable. Restore modified/missing data files, check game logs, graphics drivers, and external language toolchains.
