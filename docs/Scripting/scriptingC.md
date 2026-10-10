# Scripting Rustic games with C

C behaviors use the built-in Rustic API. Define callbacks and call
`rustic.get_translation()` (PHP: `$rustic->get_translation()`). Rustic supplies the
SDK, dispatches lifecycle calls, and handles communication internally. Scripts do
not parse requests, build commands, serialize JSON, or print responses.


## Topics

- [Setup and attachment](/docs/scripting/c/setup-and-attachment)
- [Complete behavior](/docs/scripting/c/complete-behavior)
- [Built-in functions](/docs/scripting/c/built-in-functions)
- [Callbacks and values](/docs/scripting/c/callbacks-and-values)
- [Current limits and diagnosis](/docs/scripting/c/current-limits-and-diagnosis)

## Related guides

- [Edit scene objects](/docs/guides/scene-objects)
- [Use gameplay actions](/docs/guides/gameplay-actions)
