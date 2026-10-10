# External language runtime integration

[Back to External process languages](/docs/guides/gameplay-programming/external-process-languages).

Every supported gameplay language calls the engine-owned API. SDKs are supplied
by Rustic during validation/build and at runtime; generated editor copies live in
`.rustic/generated/programming`. Gameplay scripts do not implement a JSON request
loop, build response commands, or serialize output. Existing custom protocol
programs remain compatible, but new scripts should use the native API.

Lua and JavaScript use embedded bindings. Python, C#, C, C++, Java, PHP, and Luau
use persistent isolated sessions. The engine supplies each callback's owner state,
input, properties, attributes and scene references. External mutations apply after
the callback in issue order. Luau returns a behavior table and keeps its typed
locals alive across callbacks; its engine-owned Luau host handles invocation.
CSS alone is styling; HTML inline JavaScript has the JavaScript API.
