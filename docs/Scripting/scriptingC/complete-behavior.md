# Complete behavior

[Back to C](/docs/scripting/c).

Complete the [setup and attachment steps](/docs/scripting/c/setup-and-attachment), then paste this behavior into the attached script.

```c
#include "rustic.h"

void start(void) { rustic.log("info", "Behavior started"); }
void fixed(double dt) {
    RusticVector3 p = rustic.get_translation();
    if (rustic.key("KeyW").held) rustic.set_translation(p.x, p.y, p.z + dt);
}
int main(void) {
    return rustic_run((RusticBehavior){.on_start=start, .fixed_update=fixed});
}
```

The SDK is staged automatically beside the source in an engine temporary directory.
You do not install a package, copy the SDK into your game, or write a process loop.
**Programming > Open Programming Workspace** also writes editor support files under
`.rustic/generated/programming`. Regenerate those files after upgrading Rustic.
Edit your behavior source, not generated SDK files. Run through Rustic Play so the
engine can supply the API and callback state.
