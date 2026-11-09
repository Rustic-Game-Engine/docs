# Scripting Rustic games with JavaScript

JavaScript is bundled and sandboxed. A script assigns one behavior object to
`globalThis.behavior`; it does not export a Node module and cannot use Node or browser
APIs. Create `.js` or `.mjs` gameplay files with the editor so an Asset ID and the
chosen global, scene, or component attachment are created automatically.


JavaScript placed under the project's top-level `ui/` folder (including nested
folders) is automatically categorized as Web/UI code. It keeps the same lifecycle,
scene access and `Events` APIs; attachments still determine when it runs. See
[UI JavaScript and gameplay signals](/docs/scripting/web#javascript-in-ui) for setup,
a working example and runtime limitations.

## Topics

- [Behavior lifecycle](/docs/scripting/javascript/behavior-lifecycle)
- [API reference](/docs/scripting/javascript/api-reference)
- [Scene, instances, cameras, and input](/docs/scripting/javascript/scene-instances-cameras-and-input)
- [Sandbox, values, and diagnostics](/docs/scripting/javascript/sandbox-values-and-diagnostics)

## Related guides

- [Edit scene objects](/docs/guides/scene-objects)
- [Use gameplay actions](/docs/guides/gameplay-actions)
