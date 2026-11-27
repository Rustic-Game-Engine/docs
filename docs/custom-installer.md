# Custom installers and UI

Create a Windows installer with your own interface. Choose the approach that fits
how you want to distribute it:

- [C# and web installer UI](#c-and-web-installer-ui): compile a self-contained
  Windows x64 front end using C# Windows Forms or HTML/CSS/JavaScript, with Inno
  Setup handling installation and uninstalling.
- [Companion HTTP installer API](#companion-http-installer-api): run a Python
  companion host and use its screen configuration, options and progress API
  from a browser or a native client.

Both use your project's `scripts/install` directory, but their manifest formats
are separate. Follow one approach's setup and examples. For the general export
workflow, see [Build and distribute a project](/docs/guides/editor/build-project).

## C# and web installer UI

You can replace the setup front end with your own **C# Windows Forms** UI or
**HTML, CSS and JavaScript**. This is a Windows x64 installer feature; gameplay
script registration is not involved. Create these files in your game's project,
then use **File → Build Project… → Windows game (.exe)** with **Create a custom
installer** enabled. No manifest means the standard wizard is used.

The `kind` field explicitly selects a compiled front end. Manifests without
`kind` retain the companion HTTP installer API format; they do not require .NET
or generate `install/setup.exe`. The two manifest schemas are separate: use the
examples below only for a compiled UI. Compiled manifests do not also generate
the Python companion bundle. A portable export with setup disabled does not
compile the UI or export the compiled manifest as an HTTP configuration.

Install **.NET SDK 8 or newer** on the build machine. Rustic checks PATH and
standard .NET installation folders automatically. For a custom installation,
set `DOTNET_ROOT` to the folder containing `dotnet.exe` before opening Rustic.
Publishing restores Microsoft WebView2 from NuGet and the
Windows/.NET runtime packs, requiring network access on the first build. Players
do not need .NET. Web interfaces require the **Microsoft Edge WebView2 Runtime**
on the player's Windows machine; install it from Microsoft if startup reports it
missing. This does not bundle a browser runtime or automatically install it.

### HTML/CSS/JavaScript example

Create `scripts/install/installer.json`:

```json
{"kind":"web","entry":"index.html"}
```

Create `scripts/install/index.html`:

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Game setup</title>
<style>
  body { font: 18px system-ui; margin: 3rem; background: #17202a; color: white; }
  input { width: 100%; margin-block: 1rem; }
  button { padding: .7rem 1.5rem; }
</style>
<h1 id="title">Game setup</h1>
<label>Install folder <input id="folder"></label>
<button id="install" disabled>Install</button>
<button id="close">Close</button>
<p id="status" role="status"></p>
<script>
const bridge = window.chrome.webview;
const folder = document.getElementById('folder');
const install = document.getElementById('install');
const status = document.getElementById('status');
bridge.addEventListener('message', ({data}) => {
  if (data.type === 'ready') {
    document.getElementById('title').textContent = data.name + ' Setup';
    folder.value = data.directory;
    install.disabled = false;
  }
  if (data.type === 'installing') {
    install.disabled = true;
    status.textContent = 'Installing…';
  }
  if (data.type === 'complete') status.textContent = 'Installed successfully.';
  if (data.type === 'error') {
    install.disabled = false;
    status.textContent = data.message || 'Installation failed: ' + data.exitCode;
  }
});
install.onclick = () => bridge.postMessage({
  type: 'install', directory: folder.value, desktopShortcut: false
});
document.getElementById('close').onclick = () => bridge.postMessage({type: 'close'});
bridge.postMessage({type: 'ready'});
</script>
</html>
```

Put CSS, JavaScript, images and other static assets beside the page and reference
them with relative URLs. The page runs in WebView2 at
`https://installer.rustic/`; navigation to other origins and popup windows are
blocked. The installation bridge accepts messages from this local origin only.
Use `ready` after attaching your message listener. `install` accepts an optional
absolute `directory` (defaults to the local Programs folder) and a Boolean
`desktopShortcut`. Responses are `installing`, `complete` (exit code 0), or
`error` (message or Inno Setup exit code). `close` closes the window when idle.
Only one installation can run, and closing is blocked during installation.
There is no percentage progress or in-progress cancellation API. TypeScript,
React, Sass and other web build tools must produce static HTML/CSS/JavaScript
inside this directory before building the game. Server languages such as PHP
are not executed here.

### C# example

Use this `scripts/install/installer.json`:

```json
{"kind":"csharp","entry":"InstallerUi.cs"}
```

Create `scripts/install/InstallerUi.cs`:

```csharp
using System.Windows.Forms;

public sealed class InstallerUi : Form
{
    public InstallerUi(InstallerContext context)
    {
        Text = context.GameName + " Setup";
        Width = 600;
        var folder = new TextBox { Dock = DockStyle.Top, Text = context.DefaultDirectory };
        var button = new Button { Dock = DockStyle.Bottom, Text = "Install" };
        Controls.Add(folder);
        Controls.Add(button);
        button.Click += async (_, _) =>
        {
            button.Enabled = false;
            try
            {
                var code = await context.InstallAsync(folder.Text, desktopShortcut: false);
                button.Text = code == 0 ? "Installed" : "Retry (exit " + code + ")";
                button.Enabled = code != 0;
            }
            catch (System.Exception error)
            {
                MessageBox.Show(error.Message);
                button.Enabled = true;
            }
        };
    }
}
```

The entry is a single C# source file defining `public class InstallerUi : Form`
with an `InstallerUi(InstallerContext context)` constructor. The engine supplies
the application entry point and compiles it with .NET 8 Windows Forms. Additional
project files, NuGet dependencies, WPF and arbitrary `.csproj` entry points are
not supported. Put helper classes in the same source file. Access copied assets
through `context.AssetsDirectory`. `InstallAsync(directory, desktopShortcut)`
returns the Inno Setup exit code; `Installing` and `Installed` expose state.
The host prevents window closing during installation.

### Window title bar, size and controls

For either compiled UI kind, add an optional `window` object to
`scripts/install/installer.json`. For example, this web installer hides the
Windows title bar, starts at 900 × 650, and stays between 600 × 400 and
1200 × 900:

```json
{
  "kind": "web",
  "entry": "index.html",
  "window": {
    "titleBar": false,
    "width": 900,
    "height": 650,
    "minWidth": 600,
    "minHeight": 400,
    "maxWidth": 1200,
    "maxHeight": 900,
    "resizable": true,
    "minimizeButton": true,
    "maximizeButton": true,
    "startMaximized": false
  }
}
```

For C#, keep the same `window` object and use `"kind": "csharp"` and your
`.cs` entry. Rebuild the Windows game with **Create a custom installer** enabled,
then launch the generated `install/setup.exe` to see the configured window.
No scene/script attachment is needed.

| Field | Default when `window` is present | Effect |
| --- | --- | --- |
| `titleBar` | `true` | Show the standard Windows title bar and frame; `false` makes the window borderless. |
| `width`, `height` | `900`, `650` | Initial outer window dimensions, including any native frame. |
| `minWidth`, `minHeight` | `320`, `240` | Smallest permitted outer window dimensions. |
| `maxWidth`, `maxHeight` | `0`, `0` | Largest permitted dimensions; `0` leaves that axis unlimited. |
| `resizable` | `true` | Allow interactive resizing. Fixed windows also disable maximizing. |
| `minimizeButton` | `true` | Enable the native minimize button and web `minimize` command. |
| `maximizeButton` | `true` | Enable maximizing when `resizable` is also true. |
| `startMaximized` | `false` | Start maximized; requires `resizable` and `maximizeButton`. |

Dimensions are Windows Forms pixels; OS minimum frame sizes, display scaling and
the available desktop can affect the visible bounds. Supply positive integers up
to 32767, with minimum ≤ initial ≤ maximum for each finite axis. A maximum of
zero means unlimited. Unknown fields, negative sizes and contradictory limits
stop the build with a window-settings error. Omitted fields take the defaults
above. Omit `window` entirely to preserve existing behavior: web uses the normal
900 × 650 window; C# keeps the form properties set in its constructor. An explicit
`window` object is applied **after** the C# constructor, so it overrides the
corresponding form properties. C# code can read the optional `context.Window`
settings and use ordinary Windows Forms APIs for its own controls.

#### Custom controls for a borderless web UI

Hiding the title bar removes its standard buttons and drag area. Add your own
controls to the HTML page, or keep `titleBar: true`. The `ready` response includes
`window.titleBar`, `window.resizable`, `window.minimizeButton` and
`window.maximizeButton` so your page can adapt its controls.

Add these elements to your existing page and attach their handlers before its
`bridge.postMessage({type: 'ready'})` call. This uses the `bridge` variable from
the web example above:

```html
<header id="window-bar">
  <span>My game setup</span>
  <button id="minimize" aria-label="Minimize">−</button>
  <button id="maximize" aria-label="Maximize or restore">□</button>
  <button id="window-close" aria-label="Close">×</button>
</header>
<button id="resize-corner" aria-label="Resize from bottom right">↘</button>
<script>
const bar = document.getElementById('window-bar');
const minimize = document.getElementById('minimize');
const maximize = document.getElementById('maximize');
const corner = document.getElementById('resize-corner');
bar.onpointerdown = event => {
  if (event.button === 0 && !event.target.closest('button')) {
    event.preventDefault();
    bridge.postMessage({type: 'drag'});
  }
};
minimize.onclick = () => bridge.postMessage({type: 'minimize'});
maximize.onclick = () => bridge.postMessage({type: 'toggleMaximize'});
document.getElementById('window-close').onclick = () =>
  bridge.postMessage({type: 'close'});
corner.onpointerdown = event => {
  if (event.button === 0) {
    event.preventDefault();
    bridge.postMessage({type: 'resize', edge: 'bottomRight'});
  }
};
bridge.addEventListener('message', ({data}) => {
  if (data.type !== 'ready') return;
  bar.hidden = data.window.titleBar;
  minimize.hidden = !data.window.minimizeButton;
  maximize.hidden = !data.window.maximizeButton;
  corner.hidden = data.window.titleBar || !data.window.resizable;
});
</script>
```

The native host enforces the minimize/maximize/resize settings; hiding a button
in HTML is not required to enforce them. `drag` moves a normal window.
`toggleMaximize` switches between normal and maximized states. For borderless
resizing, send `resize` on primary pointer-down with an `edge` of `left`, `right`,
`top`, `bottom`, `topLeft`, `topRight`, `bottomLeft` or `bottomRight`. Position and
style the resize handles yourself. Minimum and maximum sizes remain enforced.
Borderless maximization respects the monitor's taskbar area and finite limits.
Closing through custom controls or Alt+F4 stays blocked during installation.

These settings apply to the compiled installer front end, not the Inno Setup
fallback wizard, the game window or a normal browser tab. In the companion HTTP
API below, `window` remains layout metadata; the browser or native client owns
its window chrome and size. If resizing is unavailable, check `resizable`,
`titleBar` and your borderless resize handlers. If a window opens with the old
appearance, rebuild and launch the new `install/setup.exe` rather than editing
the source manifest beside an already-built executable.

### Build output and limits

Distribute **`install/setup.exe`** from the build folder. This standalone
executable bundles the .NET runtime, UI assets, window settings and Inno Setup
payload; the runtime extracts its contents when launched. The generated
`installer.iss` remains in the parent build folder. Installation still uses the
configured game name, publisher, version, shortcuts and per-user uninstaller.
The custom UI controls presentation and calls the silent installation backend;
standard welcome/license pages are hidden during that call. If you require
license acceptance, implement it in your custom UI. Wizard banners/styles apply
to the fallback wizard, not to the custom interface. Enable **Offer desktop
shortcut** in build settings before requesting it from your UI.

The manifest must use `web` with an existing `.html` entry or `csharp` with an
existing `.cs` entry, relative to `scripts/install`. Absolute paths, parent
components, escaping resources, unknown manifest fields and symbolic links in
copied inputs are rejected. A malformed manifest stops the build instead of
silently falling back. The directory is copied with `bin/` and `obj/` excluded;
keep credentials and unrelated files out of it. These are trusted author sources:
C# runs as native code with the player's account privileges. Installer sources
are independent of game behaviors; do not register them in `config/scripts.ron`.
Portable Windows builds and website/Android exports do not use this UI.

If publishing fails, check the .NET SDK and the reported NuGet/compiler output.
If the web page is blank, check relative asset paths and script errors in WebView2
developer tools. If installation fails, display the bridge error/exit code, check
the chosen directory is writable. To diagnose the standard wizard separately,
remove the compiled UI manifest and rebuild a standard installer. Test installation and
uninstallation on a clean Windows machine before distribution.

## Companion HTTP installer API

Windows game exports include `scripts/install/server.py`, `installer.json`, and
`index.html` alongside the `game` payload. This is an additional installer path;
the existing Inno Setup wizard remains available. The host requires Python 3.10+
on the end user's computer. It is not a standalone executable or an uninstaller.

### Design and launch

Export a Windows game from the editor Build window. To customize future exports,
put `installer.json` and/or `index.html` in your **project's** `scripts/install/`
directory and export again. These two files override the bundled defaults. The project's `scripts/install/hooks/` directory is also copied recursively into the export.
Installer files are not gameplay behaviors and need no scene attachment.

A complete configuration example:

```json
{
  "title": "My Game",
  "payload": "../../game",
  "location": "~/My Game",
  "allowLocationChange": true,
  "window": { "width": 800, "height": 600 },
  "screens": [
    { "kind": "welcome", "title": "Welcome", "text": "Install My Game" },
    { "kind": "location", "title": "Choose a folder" },
    { "kind": "options", "title": "Select components" },
    { "kind": "install", "title": "Ready" }
  ],
  "options": [
    { "id": "extras", "label": "Install bonus content", "default": false, "pathPrefix": "extras" }
  ]
}
```

`payload` is relative to the exported `scripts/install` directory. Options are
boolean; an unchecked option excludes its `pathPrefix` directory or file from
the payload. Options without a prefix are selections exposed to your UI only.
All other payload files are installed. Supply an empty `options` array if none
are needed. Screen titles/text, order, and content are editable. The example UI
uses width and height for page layout; browsers control their own window size.
Native UI clients can use these values to size their windows.

From the export directory, run:

```sh
python scripts/install/server.py
```

The host prints one JSON line containing a loopback `url` and a random `token`.
Open that URL, paste the token into the example UI, and click Connect. The port
is chosen automatically; `--port 8765` selects a fixed port. Keep the host running
until installation finishes. Ctrl+C closes it. Never publish or log the token.

### HTTP contract

All API requests require `Authorization: Bearer TOKEN`. Responses are JSON.
The host binds only to `127.0.0.1`. Browser clients should be served from its `/`
page; cross-origin browser access is intentionally unavailable. Replace
`index.html` with bundled HTML/CSS/JavaScript (inline assets), or start the host
as a child process from a C#, C++, Python, or other native UI and parse its first
stdout line. No particular UI toolkit is required.

| Method | Route | Result |
| --- | --- | --- |
| GET | `/scripts/install/config` | Screen design, window size, option definitions and defaults |
| GET | `/scripts/install/status` | `status`, `percentage`, `currentTask`, `location`, `options`, `logs`, `error` |
| GET | `/scripts/install/logs` | Most recent 1,000 file/error messages |
| POST | `/scripts/install/configure` | Set `location` and/or boolean `options` before starting |
| POST | `/scripts/install/start` | Start background installation once |
| POST | `/scripts/install/cancel` | Request cancellation between files or stop the active task |

For example, from C# with an `HttpClient` whose BaseAddress is the printed URL:

```csharp
client.DefaultRequestHeaders.Authorization =
    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
var status = await client.GetStringAsync("scripts/install/status");
var body = new System.Net.Http.StringContent(
    "{\"options\":{\"extras\":true}}", System.Text.Encoding.UTF8, "application/json");
var configured = await client.PostAsync("scripts/install/configure", body);
configured.EnsureSuccessStatusCode();
var started = await client.PostAsync("scripts/install/start", null);
started.EnsureSuccessStatusCode();
```

Poll status while installing. Progress measures completed files and tasks, rather than
bytes; `currentTask` names the file being copied or the running task ID. Status is `ready`, `installing`,
`completed`, `cancelled`, or `failed`. Configuration locks after start. HTTP 400
means invalid configuration/state; 401 means a missing/wrong token.

### Limits and troubleshooting

Installation copies files into the selected folder with the current user's
permissions. File copying does not install runtimes, create shortcuts, register uninstallers,
or elevate privileges. Author-defined tasks can perform additional work with
the current user's permissions. Existing files are
never overwritten; choose a fresh folder if installation reports a collision.
Cancellation/failure can leave partial files or task side effects, with no rollback or resume. Logs
and state are session-only; save API responses in your UI if persistence is needed.
Symlink payloads and destination paths escaping the install folder are rejected.
Use a trusted payload and a destination under your control.

If the host cannot start, verify Python's version, the JSON configuration, and
that `../../game` exists relative to `installer.json`. If Connect fails, use the
URL and token from the current process, rather than a previous session. A failed
copy's `error` field reports the filesystem failure; check folder permissions and
existing files. Custom native UI frameworks must be shipped by the UI author.

### Script installer logic in other languages

Use `tasks` in `installer.json` for installer logic, independently of your UI.
Tasks execute in array order within each phase: `beforeCopy`, then file copying,
then `afterCopy` (the default). Each task has an `id`, a `command` argument array,
an optional `timeoutSeconds` (default 300, maximum 86400), and an optional `option`
ID that gates execution. Arguments run directly without shell expansion.
Commands come from the packaged configuration; HTTP clients cannot submit commands.

```json
{
  "tasks": [
    {
      "id": "prepare",
      "phase": "beforeCopy",
      "command": ["python", "hooks/prepare.py"],
      "timeoutSeconds": 60
    },
    {
      "id": "configure-extras",
      "phase": "afterCopy",
      "option": "extras",
      "command": ["dotnet", "hooks/ConfigureExtras.dll"]
    }
  ]
}
```

Add this property to the complete configuration above. Put task sources and
binaries under your project's `scripts/install/hooks/` before exporting. Commands
run with the exported `scripts/install/` as their working directory. The first
stdin line is a JSON object containing `location`, `options`, `bundle`, `payload`,
and `task`. The task may read this to decide what to install or configure.

Python example (`hooks/prepare.py`):

```python
import json
import sys
from pathlib import Path

context = json.loads(sys.stdin.readline())
print(json.dumps({"log": "Preparing destination", "percentage": 10}), flush=True)
Path(context["location"]).mkdir(parents=True, exist_ok=True)
print(json.dumps({"log": "Preparation complete", "percentage": 100}), flush=True)
```

C# example (compile and publish as `hooks/ConfigureExtras.dll`, including its
runtime configuration and dependencies):

```csharp
using System;
using System.IO;
using System.Text.Json;

using var context = JsonDocument.Parse(Console.ReadLine()!);
var location = context.RootElement.GetProperty("location").GetString()!;
File.WriteAllText(Path.Combine(location, "extras-configured.txt"), "enabled");
Console.WriteLine(JsonSerializer.Serialize(new { log = "Extras configured", percentage = 100 }));
```

Plain stdout/stderr text also becomes a log message. JSON stdout lines can contain
`log` and a task-local `percentage` from 0 to 100; the host combines task progress
with copying progress. Each file and task has equal weight. Exit code zero succeeds;
a nonzero code or timeout fails installation and stops later tasks. Missing
executables also fail with an error in status. Task output is read in chunks of
up to 8 KiB and retained in the bounded session log.

Language choices use ordinary executables:

| Language | Task command example | Requirement |
| --- | --- | --- |
| Python | `["python", "hooks/setup.py"]` | Python runtime |
| JavaScript | `["node", "hooks/setup.mjs"]` | Node.js runtime |
| Lua | `["lua", "hooks/setup.lua"]` | Standalone Lua CLI |
| Luau | `["luau", "hooks/setup.luau"]` | Standalone Luau CLI and any needed JSON/I/O adapter |
| C# | `["dotnet", "hooks/Setup.dll"]` | .NET runtime, or publish a standalone executable |
| Java | `["java", "-jar", "hooks/setup.jar"]` | Java runtime |
| PHP | `["php", "hooks/setup.php"]` | PHP CLI |
| C / C++ | `["hooks/setup.exe"]` | Precompiled executable and its dependencies |

These are installer processes, separate from engine scripting. Bundled gameplay
Lua, Luau, and JavaScript hosts do not supply general installer runtimes or the
gameplay API here. Compile C/C++/C#/Java code before distributing, or explicitly
supply a build tool command if the installer machine has its SDK. Other languages
with a CLI can follow the same protocol. HTML/CSS continue to provide presentation;
JavaScript or a task process supplies logic.

Cancellation kills the direct active task process and prevents subsequent work;
child processes spawned by the task are its responsibility. Tasks run as the
current user and can modify files, so distribute trusted task code. Shutting down
the host while a task is active does not guarantee cleanup of that process.
