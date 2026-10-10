# Scripting Architecture

`engine-scripting` discovers sources, maintains stable script references, generates programming support, and routes gameplay to language adapters. Projects can mix languages; scripts interact through engine state and the common API rather than sharing language VM objects.

## Language integration and execution

Lua 5.4 and JavaScript use embedded bindings backed by mlua and QuickJS. Python, C, C++, C#, Java, PHP, and Luau use persistent isolated sessions. Luau's engine-owned host is built separately. HTML inline JavaScript uses the JavaScript API; CSS is styling. HTML, CSS, and PHP UI entries must belong under `ui/`.

External adapters receive callback state and return mutations applied after the callback in issue order. Generated SDKs handle that protocol; ordinary gameplay examples should use the SDK instead of implementing a JSON request loop. Read each [language guide](/docs/scripting/lua) for syntax and toolchain requirements.

## Components and lifecycle

Use Programming to create a Global Startup, Scene Startup, or Object Component script. Attach an object behavior through Inspector **+ Add Component** or by dragging an existing script onto its object. References use stable Asset IDs; `config/scripts.ron` is the editor-owned registry.

Global scripts instantiate first, then scene scripts, then object components. Execution order uses scope, explicit order, entity ID, script ID, and attachment order. Canonical callbacks include `Start`, `FixedUpdate`, `Update`, `OnEnable`, `OnDisable`, and `OnDestroy`; original snake-case names remain compatible. Only supplied callbacks are invoked.

```lua
return {
  Start = function()
    rustic.log("info", "Behavior started")
  end,
  Update = function(dt)
    -- Perform frame work here.
  end,
  OnDestroy = function()
    rustic.log("info", "Behavior destroyed")
  end,
}
```

Attach this Lua Object Component and enter Play to see the startup message. Callback recognition alone does not guarantee event dispatch: verify collision/event behavior in the current simulation before relying on reserved callback names.

## Reload and diagnostics

The engine supplies generated declarations and workspace files under `.rustic/generated/programming/`, preserving user-owned editor settings. Code editing happens in an external editor. Reload keeps last-known-good behavior when replacement validation fails; test both success and failure when changing an adapter. Read [Gameplay programming](/docs/guides/gameplay-programming) for runtime restrictions and [Code Examples](/docs/open-source/docs/code-examples) before updating public scripting samples.
