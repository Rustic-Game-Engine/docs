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

Inline script bodies and linked `<script src="...">` files are combined and
evaluated as one sandboxed JavaScript behavior. The player resolves quoted src
paths relative to the HTML document inside the play snapshot before the Web
adapter extracts the script bodies. Absolute paths and any `..` path component
are rejected; remote script fetching is not implemented. Keep linked files in
the same directory or a child directory of the HTML asset. A CSS-only asset has no callbacks and is therefore a valid no-op
behavior. Module imports, DOM queries, events, fetches, storage, and layout APIs are
not available.

Canonical callbacks are `OnCreate`, `Start`, `FixedUpdate`, `Update`, `OnEnable`,
`OnDisable`, `OnDestroy` and `OnStop`; snake-case spellings remain compatible. Collision callbacks are not
currently bound by the embedded Web/JavaScript adapter. Only methods actually present
on `globalThis.behavior` run.

HTML layout and CSS styling for game UI are planned. The sample above exercises
JavaScript callbacks only; it does not currently display a rendered HTML body.
