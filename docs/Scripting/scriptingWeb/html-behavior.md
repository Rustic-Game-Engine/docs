# HTML behavior

[Back to HTML/CSS](/docs/scripting/web).

```html
<!doctype html>
<html>
  <head>
    <style>
      /* Valid content, but not a rendered browser stylesheet in this release. */
      body { margin: 0; }
    </style>
  </head>
  <body>
    <script>
      globalThis.behavior = {
        Start() {
          rustic.log("info", "web behavior started");
        },
        Update(dt) {},
        OnDestroy() {},
      };
    </script>
  </body>
</html>
```

Inline script blocks and project-relative `<script src="...">` files are combined and
evaluated as one sandboxed JavaScript behavior. Linked files must remain inside the
play snapshot. A CSS-only asset has no callbacks and is therefore a valid no-op
behavior. Module imports, DOM queries, events, fetches, storage, and layout APIs are
not available.

Canonical callbacks are `Start`, `FixedUpdate`, `Update`, `OnEnable`, `OnDisable`,
and `OnDestroy`; snake-case spellings remain compatible. Collision callbacks are not
currently bound by the embedded Web/JavaScript adapter. Only methods actually present
on `globalThis.behavior` run.
