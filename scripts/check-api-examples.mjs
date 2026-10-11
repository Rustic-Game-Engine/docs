import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const load = (file) => {
  const exports = {};
  const source = readFileSync(new URL(`../lib/${file}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  runInNewContext(compiled, { exports, require: (id) => require(id === "./api-example-data.json" ? "../lib/api-example-data.json" : id) });
  return exports;
};
const { buildApiMarkdown } = load("api-docs.ts");
const { buildFunctionExamples, exampleLanguages } = load("api-examples.ts");
const { allDocs } = load("docs-catalog.ts");
const data = JSON.parse(readFileSync(new URL("../lib/api-example-data.json", import.meta.url), "utf8"));
const blocks = (markdown) => [...markdown.matchAll(/```[^\n]+\n([\s\S]*?)\n```/g)].map((match) => match[1]);
let total = 0;
for (const [topic, entries] of Object.entries(data)) {
  const source = `docs/Scripting/API/${topic}.md`;
  assert(allDocs.some((doc) => doc.source === source), `Examples are unreachable: ${topic}`);
  const markdown = buildFunctionExamples(topic);
  const titles = new Set();
  for (const entry of entries) {
    assert(!titles.has(entry.title), `Duplicate function: ${topic}/${entry.title}`);
    titles.add(entry.title);
    assert.deepEqual(Object.keys(entry.examples).sort(), [...exampleLanguages].sort());
    for (const language of exampleLanguages) {
      assert(entry.examples[language].trim(), `Missing ${topic}/${entry.title}/${language}`);
      assert(markdown.includes(entry.examples[language]), `Unrendered ${entry.title}/${language}`);
      assert(!/\bundefined\b/.test(entry.examples[language]), `Placeholder in ${entry.title}/${language}`);
      total++;
    }
  }
  // Every qualified call in the published Calls section needs a named example.
  const reference = readFileSync(new URL(`../${source}`, import.meta.url), "utf8");
  const calls = reference.split("## Calls\n")[1]?.split("\n## ")[0] ?? "";
  for (const match of calls.matchAll(/\b([A-Za-z]+)\.([A-Za-z]+)\(/g)) {
    const name = `${match[1]}.${match[2]}`;
    assert(entries.some((entry) => entry.title.includes(name)), `No example for published call ${topic}/${name}`);
  }
}
const core = {
  entity: ["entity_id", "delta_time", "fixed_delta_time"],
  "entity-identity": ["entity_id"], "frame-time": ["delta_time", "fixed_delta_time"],
  transforms: ["get_translation", "set_translation"], properties: ["get_property", "set_property"],
  attributes: ["get_attribute", "edit_attribute", "EditAttribute"],
  input: ["input", "key", "key_events", "any_key_pressed"], logging: ["log"], enabled: ["set_enabled"],
  environment: ["getEnvironment", "setEnvironment", "setSkyTexture"], scene: ["Find", "List"],
  instances: ["add", "clone"], camera: ["setCurrentCamera"],
};
for (const [topic, names] of Object.entries(core)) {
  const examples = blocks(buildApiMarkdown(topic));
  assert.equal(examples.length, exampleLanguages.length, `Missing language block: ${topic}`);
  for (const [index, code] of examples.entries()) {
    for (const name of names) assert(code.includes(`${name}(`), `Missing ${topic}/${name}/${exampleLanguages[index]}`);
  }
}
const callbacks = blocks(buildApiMarkdown("callbacks"));
assert.equal(callbacks.length, exampleLanguages.length);
for (const [index, code] of callbacks.entries()) {
  const names = ["OnCreate", "Start", "OnEnable", "FixedUpdate", "Update", "OnDisable", "OnDestroy", "OnStop"];
  const native = ["on_create", "on_start", "on_enable", "fixed_update", "update", "on_disable", "on_destroy", "on_stop"];
  for (const name of [0, 1, 5, 9].includes(index) ? names : native) assert(code.includes(name), `Missing callback ${name}/${exampleLanguages[index]}`);
}
console.log(`Verified ${total} gameplay examples, every core call and all eight callbacks in ten languages.`);
