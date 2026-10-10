# Current limits and diagnosis

[Back to Luau](/docs/scripting/luau).

The embedded Play viewport forwards held WASD, arrows, and Shift. Other keys,
press/release events, named actions, and separate runtime-window input are not wired
in this build. Collision callbacks remain unavailable. API 1.1 provides cross-language
`Events` for every supported script type; see [Shared gameplay actions](gameplayActions.md).

Each instance runs in its own process with a safe environment allowlist and a
temporary working directory. Sources and responses are limited to 1 MiB; callbacks
have three seconds to finish. An exception, invalid engine value, process exit,
timeout, or rejected call disables the behavior. Failed build/reload validation
keeps the last good instance running.

- **Host unavailable:** rebuild or reinstall Rustic; rustic-luau-host must be
  beside the editor/runtime executable. A separate Luau CLI is unnecessary.
- **Nothing moves:** check attachment, owner transform, Play focus, and held KeyW.
- **Property rejected:** declare it in the editor and preserve its type.
- **Wrong parent:** pass the ID returned by Find, not the path string.
- **SDK missing when running manually:** run the behavior through Rustic Play.
- **Callback failed:** read the Rustic Console/build diagnostic. Use `rustic.log`
  for gameplay logs; external stdout belongs to the engine's private transport.
- **Old script has a request loop:** replace it with the [complete behavior callback setup](/docs/scripting/luau/complete-behavior).
  If the old starter defines its own SDK classes, remove those definitions and
  keep your gameplay logic in the callbacks. Rustic now supplies the SDK.
