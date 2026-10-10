# Lifetime, safety, and compatibility

[Back to C++](/docs/scripting/cpp).

C++ cannot call another behavior process or VM object. API 1.0 does not yet expose
the scheduler's Engine Event `emit`/`subscribe` surface to scripts; cross-language
coordination must use shared engine state.

Create and attach the file in the Explorer as global, scene, or component scope. The
Asset ID—not the path—is stored in the attachment. Global instances run first, then
scene instances, then object components; editor-created references use order `0` and
stable IDs break ties. Process globals persist for that instance until it is destroyed.

The process reads/writes newline-delimited protocol v1 internally. Do not print to
standard output, because it is reserved for the SDK response. Callbacks have a
three-second deadline and 1 MiB response limit. The process environment and working
directory are isolated. Syntax/build failures prevent replacement; runtime failures
disable the instance. Legacy C++ behavior members are the current native contract and
remain backward compatible.
