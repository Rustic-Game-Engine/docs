# Code Examples

A scripting example should let a reader reproduce a visible result with the documented engine and language adapter. Use the public SDK/API rather than exposing internal host messages.

## Required context

State the language and required toolchain, script scope, scene prerequisites, creation/attachment steps, callback context, and expected result. Explain current input, event, or target restrictions that affect the sample. Include relevant failure diagnostics and an engine commit/version when compatibility matters.

## Minimal Lua example

Create a Lua Object Component through Programming, select an object, and attach the script with Inspector **+ Add Component**. Replace its source with:

```lua
return {
  Start = function()
    rustic.log("info", "Example started")
  end,
}
```

Enter Play. The Console should show `Example started` when that instance starts. If it does not, check attachment, enabled state, Lua source errors, and Console diagnostics. This example needs no optional external language toolchain. See the [Lua guide](/docs/scripting/lua) for input and movement examples.

## Document an API contract

Explain arguments, accepted value types, return/error behavior, valid lifecycle contexts, and whether mutations apply immediately or after the callback. Describe stale/missing entity handling, ownership, and language-specific naming where relevant. Do not claim all-language equivalence from a test in only one adapter.

Lua modules return a behavior table; JavaScript assigns `globalThis.behavior`; external languages use their generated SDK conventions. Use separate fenced blocks when syntax differs. A callback listed in declarations may be reserved without current simulator dispatch; verify the event path before promising it.

## Verify examples and reference pages

Check examples against `Engine/crates/engine-scripting/`, its starter SDKs, adapter tests, and runtime behavior. Prefer deterministic, short samples with clear expected output. Keep engine-local language guides, this site's published guides, and `lib/api-docs.ts` consistent. Website quality checks cannot prove that a gameplay example executes; report the engine validation you actually performed.
