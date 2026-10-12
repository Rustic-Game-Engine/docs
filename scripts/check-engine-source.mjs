// Optional corroboration; normal docs build remains independent of engine source.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { load } from "./load-lib.mjs";
const root = process.argv[2];
assert.ok(root, "Pass an Engine/ checkout path");
const read = (file) => readFile(path.join(root, file), "utf8");
const { apiCategories } = load("api-reference.ts");
const { buildApiCallMarkdown } = load("api-reference-markdown.ts");
const lua = await read("crates/engine-scripting/src/lua.rs");
const js = await read("crates/engine-scripting/src/javascript.rs");
const luau = await read("crates/engine-scripting/src/sdk/rustic.luau");
for (const [canonical, legacy] of [["Start", "on_start"], ["OnStop", "on_stop"], ["FixedUpdate", "fixed_update"]]) {
  assert.ok(lua.includes(`call_compatible("${canonical}", "${legacy}"`));
  assert.ok(js.includes(`call_compatible("${canonical}", "${legacy}"`));
  assert.ok(luau.includes(`${legacy}='${canonical}'`));
}
const model = await read("crates/engine-scripting/src/model.rs");
assert.match(model, /CURRENT: Self = Self \{ major: 1, minor: 1 \}/);
assert.match(model, /"luau" => Some\(Self::Luau\)/);
const easing = await read("crates/engine-core/src/gameplay/ease.rs");
for (const call of apiCategories.find((entry) => entry.slug === "api/ease").calls) {
  assert.ok(easing.includes(call.signature.split(".")[1]), call.signature);
}
const audio = apiCategories.find((entry) => entry.slug === "api/audio");
for (const call of audio.calls.filter((entry) => /recording|hot-mic|capture/.test(entry.slug))) {
  const markdown = buildApiCallMarkdown(audio, call, "Audio", "");
  assert.doesNotMatch(markdown, /\bStop = function/);
  assert.match(markdown, /OnStop = function/);
}
console.log("Engine-source corroboration passes: Lua/JS/Luau lifecycle, API 1.1, Luau discovery, 31 easing constants and capture teardown examples. This is not runtime execution.");
