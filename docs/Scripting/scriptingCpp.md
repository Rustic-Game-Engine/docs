# Scripting Rustic games with C++

C++ uses the built-in Rustic API, like every gameplay language. Rustic supplies `rustic.hpp`,
compiles each `.cc`, `.cpp`, or `.cxx` behavior as C++20, and runs one isolated
process per instance. The header parses protocol requests and exposes typed native
helpers, so ordinary game code should not emit JSON.

Install `clang++`, `g++`, or MSVC `cl` on `PATH`. Clang/GCC builds use `-Wall
-Wextra -Werror -std=c++20`; MSVC uses `/nologo /W4`. The editor also writes an
IntelliSense copy to `.rustic/generated/programming/rustic.hpp`, but Rustic supplies
the authoritative temporary copy when building. Never edit or vendor the generated
header.


## Topics

- [Complete behavior](/docs/scripting/cpp/complete-behavior)
- [Typed API](/docs/scripting/cpp/typed-api)
- [Scene and object operations](/docs/scripting/cpp/scene-and-object-operations)
- [Lifetime, safety, and compatibility](/docs/scripting/cpp/lifetime-safety-and-compatibility)

## Related guides

- [Edit scene objects](/docs/guides/scene-objects)
- [Use gameplay actions](/docs/guides/gameplay-actions)
