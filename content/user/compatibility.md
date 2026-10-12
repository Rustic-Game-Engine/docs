# Feature status and scripting compatibility

This reference was checked against engine commit `017db99b7025eeda96acf21967664153a2df0795` on 12 October 2026. It describes source implementation, not a guarantee that every historical installer contains it. Check your release notes/build revision before using an API. **Docs v0.1**, engine release tags and **Script API 1.0/1.1** are separate identifiers.

## Status vocabulary

| Status | Meaning |
| --- | --- |
| Implemented | Code paths exist in the inspected source; restrictions still apply. |
| Experimental | An implemented development workflow has limited qualification or a pre-alpha release label. |
| Planned | A roadmap/design describes a future direction; no working workflow is claimed. |
| Not Yet Implemented | Required code/workflow is absent in the inspected implementation. |
| Unsupported | The current adapter/platform explicitly lacks the capability. |

## Engine systems

| Feature | Status | Boundaries and reference |
| --- | --- | --- |
| Native rendering and editor viewport | Implemented | RHI/wgpu, primitives, models, cameras and lighting. Shadow casting is unsupported in the inspected editor; [rendering](/docs/open-source/engine/rendering-system). |
| Primitive physics | Implemented | Gravity and world-aligned box response, API 1.1 queries/forces. Mesh collision, joints and collision callbacks are Not Yet Implemented; [physics](/docs/guides/physics). |
| Animation | Implemented | Imported clips, property tracks, blending and procedural API; no claim of a full visual animation editor; [Animation](/docs/api/animation). |
| Tweening and easing | Implemented | Shared scheduler and 31 curves; [Tween](/docs/api/tween), [Ease](/docs/api/ease). |
| Paths and movement | Implemented | API actions and path builders; [Path](/docs/api/path), [Movement](/docs/api/movement). |
| Audio playback and capture | Implemented | Windows native devices; non-Windows headless mixer. Capture/loading differences below; [Audio](/docs/api/audio). |
| Scripting | Implemented | Ten script types, isolated execution and per-binding differences. Luau creation-menu omission is documented in [Scripting](/docs/guides/scripting). |
| Keyboard input | Implemented | Embedded Play held WASD/arrows/Shift only. Named actions, key edges and separate-window forwarding are Not Yet Implemented. |
| Cameras | Implemented | Active scene camera and action helpers; [Cameras and lights](/docs/guides/cameras-and-lights). |
| HTML/CSS game UI rendering | Planned | Current HTML assets execute inline/linked JavaScript; rendered HTML layout and CSS styling are not implemented yet. Full browser DOM compatibility is not an established contract. See [HTML/CSS](/docs/scripting/web). |
| Networking / hosting SDK | Not Yet Implemented | Public hosting-sdk has no implementation. Audio hot mic has no automatic network transport. Runtime/editor IPC is not multiplayer networking. |
| Standalone Play | Implemented | A supervised runtime shell for testing; [Playtesting](/docs/building/publishing). |
| Game export / platform packaging | Planned | Architecture describes export; current xtask has no export command. No supported distributable-game workflow is claimed. |
| Editor primitives and transforms | Implemented | Hierarchy, Inspector, assets and Play controls. Mesh Boolean/negation/separation tools are Not Yet Implemented in the inspected editor. |
| Windows releases | Experimental | Published x64 pre-alpha installers. Linux has source/CI coverage; macOS release qualification is not established. |
| Public examples repository | Not Yet Implemented | No runnable downloadable sample; use the inline [first-scene tutorial](/docs/tutorials/first-game). |

## Language and API matrix

“Core” means lifecycle, translation, properties, attributes, scene lookup and basic instance commands, not every convenience method. API 1.1 includes shared actions, physics queries, events and audio playback; method spellings and return values differ. Use each language guide for imports and registration.

| Script type | Runtime/tool requirement | Core / shared API 1.1 | Capture and reusable audio |
| --- | --- | --- | --- |
| Lua 5.4 (.lua) | Bundled embedded Lua | Implemented; immediate core host writes, new instance ID returned | Recording, hot mic and reusable loading implemented |
| Luau (.luau) | Engine-provided external host | Implemented; SDK command/query boundary | Recording, hot mic and reusable loading implemented |
| JavaScript (.js) | Bundled QuickJS | Implemented; deferred core writes, synchronous queries | Capture and reusable loading unsupported |
| Python (.py) | Python toolchain | Implemented via SDK | Capture and reusable loading unsupported |
| C (.c) | C17 compiler | Implemented via SDK; explicit callback/storage conventions | Capture and reusable loading unsupported |
| C++ (.cpp) | C++ toolchain | Implemented via typed SDK | Capture and reusable loading unsupported |
| C# (.cs) | .NET SDK | Implemented via SDK | Capture and reusable loading unsupported |
| Java (.java) | java and javac | Implemented via SDK | Capture and reusable loading unsupported |
| PHP (.php in ui/) | PHP CLI | Implemented via SDK | Capture and reusable loading unsupported |
| HTML/inline JS (.html in ui/) | QuickJS extraction, no browser | Implemented JavaScript behavior surface; CSS-only is a no-op | Capture and reusable loading unsupported |

### Method-specific differences

- `rustic.find_entity` and object-path `GetAttribute` convenience calls are embedded Lua-specific in the published reference. Prefer each language’s scene lookup guide; general scene lookup support does not imply identical helper names.
- `Clock.state` is exposed in embedded Lua/JavaScript, Luau and Python; other SDKs provide setter controls. C#/PHP additionally expose a scale getter. See [Clock](/docs/api/clock).
- Audio device enumeration/selection exists in all ten script types but native devices require Windows. Non-Windows enumeration returns empty lists; device selection raises an error. Microphone capture requires Windows permissions and uses the system default input, independently of selected input-device metadata.
- Lua/Luau game-output recording can run headlessly; microphone recording and hot mic require Windows. Recording captures audio, not video. Read and unload capture handles before owner cleanup; see [Audio recording](/docs/api/audio/start-recording).
- Collision callback names are not evidence of event delivery: no collision/touch callbacks are emitted by the primitive simulator.

## Platform compatibility

A scripting adapter being present does not establish all language tools or native devices on every OS. Bundled engines and optional interpreters/compilers must be available in the installed build and discoverable. Only embedded Play currently forwards the documented held-key subset. Source builds/CI are distinct from graphical manual testing and release certification. See [Installation](/docs/getting-started/installation) for platform evidence and [Execution behavior](/docs/guides/scripting#when-mutations-take-effect) for command timing.
