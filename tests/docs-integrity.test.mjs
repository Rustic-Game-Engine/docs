import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { load } from "../scripts/load-lib.mjs";
const { allDocs, docAliases, docSections } = load("docs-catalog.ts");
const { resolveDocHref, markdownHeadings } = load("docs-markdown.ts");
const { readDoc } = load("docs.ts");

test("every pre-audit route is retained and exported", async () => {
  const legacy = JSON.parse(await readFile(new URL("fixtures/legacy-routes.json", import.meta.url), "utf8"));
  const routes = new Set([...allDocs.map((doc) => doc.slug), ...Object.keys(docAliases)]);
  for (const slug of legacy) {
    assert.ok(routes.has(slug), slug);
    await readFile(new URL(`../out/docs/${slug}.html`, import.meta.url));
  }
});

test("user journey and contributor areas stay separate", () => {
  assert.deepEqual(Array.from(docSections[0].groups, (group) => group.label), ["Getting Started", "Editor Manual", "Gameplay and Scripting", "Engine Systems", "API Reference", "Building and Publishing", "Tutorials and Examples", "Troubleshooting and Releases"]);
  assert.equal(docSections[1].title, "Open Source Development");
  assert.ok(docSections[1].groups.every((group) => group.docs.every((doc) => doc.slug.startsWith("open-source"))));
});

test("relative links resolve from the current source without ambiguous basename guesses", () => {
  assert.equal(resolveDocHref("setup-and-attachment.md", "docs/Scripting/scriptingPython.md"), "setup-and-attachment.md");
  assert.equal(resolveDocHref("../scriptingLua/input.md#copyable-top-down-controller", "docs/Scripting/scriptingPython/setup-and-attachment.md"), "/docs/scripting/lua/input#copyable-top-down-controller");
  assert.equal(resolveDocHref("scriptingJavaScript.md", "docs/Scripting/scriptingWeb.md"), "/docs/scripting/javascript");
  assert.equal(resolveDocHref("/docs/reference/compatibility"), "/docs/reference/compatibility");
});

test("heading IDs ignore code and disambiguate repeated headings", () => {
  const headings = markdownHeadings("# Test\n## `Audio.stop()`\n```python\n## not a heading\n```\n## Audio.stop()\n");
  assert.deepEqual(Array.from(headings, (heading) => heading.id), ["test", "audio-stop", "audio-stop-1"]);
});

test("audio categories preserve their shared guide and old deep links", async () => {
  const markdown = await readDoc("api-category:api/audio");
  assert.match(markdown, /## Supported audio files/);
  assert.match(markdown, /## Module guide/);
  assert.ok(markdownHeadings(markdown).some((heading) => heading.id === "supported-audio-files"));
});

test("capture teardown uses OnStop and references actual restrictions", async () => {
  const doc = await readDoc("api-call:api/audio/stop-recording");
  assert.match(doc, /OnStop = function/);
  assert.doesNotMatch(doc, /\bStop = function/);
  assert.match(doc, /Lua 5.4 and Luau/);
  assert.match(doc, /Microphone input requires Windows/);
});


test("logging signature does not invent structured fields unsupported by SDKs", async () => {
  const doc = await readDoc("api-call:api/logging/log");
  assert.match(doc, /rustic.log\(level, message\)/);
  assert.doesNotMatch(doc, /fields\?/);
});
