# Complete behavior

[Back to PHP](/docs/scripting/php).

Complete the [setup and attachment steps](/docs/scripting/php/setup-and-attachment), then paste this behavior into the attached script.

```php
<?php
require __DIR__ . "/rustic.php";

function on_start(): void {
    global $rustic;
    $rustic->log("info", "Behavior started");
}
function fixed_update(float $dt): void {
    global $rustic;
    [$x, $y, $z] = $rustic->get_translation();
    if ($rustic->key("KeyW")["held"]) $rustic->set_translation($x, $y, $z + $dt);
}
rustic_run(["on_start"=>"on_start", "fixed_update"=>"fixed_update"]);
```

The SDK is staged automatically beside the source in an engine temporary directory.
You do not install a package, copy the SDK into your game, or write a process loop.
**Programming > Open Programming Workspace** also writes editor support files under
`.rustic/generated/programming`. Regenerate those files after upgrading Rustic.
Edit your behavior source, not generated SDK files. Run through Rustic Play so the
engine can supply the API and callback state.
