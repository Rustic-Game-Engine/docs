# Diagnose gameplay actions

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

If nothing moves, check attachment/enabled state, press Play, anchor the Part, and
check the Console. For external languages, check toolchain discovery; Java needs
both `java` **and** `javac`, not just a JRE. An unsupported property, wrong value
type, or unavailable perspective camera is an error, not a successful action.
Asynchronous target errors appear in operation state and the Console. Schedule
through `Start` or an event/callback; API state is not initialized at script top
level. Callback exceptions disable the owning behavior and clean its actions.
