import assert from "node:assert/strict";
import test from "node:test";
import { load } from "../scripts/load-lib.mjs";
import { phpSource } from "../scripts/snippet-source.mjs";

test("PHP lifecycle files preserve their existing opening tag", () => {
  const markdown = load("api-docs.ts").buildApiMarkdown("callbacks");
  const code = markdown.match(/### PHP\n\n```php\n([\s\S]*?)\n```/)[1];
  assert.match(code, /^<\?php/);
  assert.equal(phpSource(code), code);
  assert.equal(phpSource(`\n  ${code}`), `\n  ${code}`);
});
test("PHP API fragments enter code mode even when an opening tag appears inside a string", () => {
  const code = '$rustic->log("info", "<?php is a tag");';
  assert.equal(phpSource(code), `<?php\n${code}\n`);
});
