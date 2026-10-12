import exampleData from "./api-example-data.json";

import { exampleLanguages } from "./script-languages";
export { exampleLanguages } from "./script-languages";
const fences = ["lua", "javascript", "python", "cpp", "csharp", "lua", "c", "java", "php", "javascript"];
type Example = { title: string; note: string; examples: Record<string, string> };
const examples: Record<string, Example[]> = exampleData;

const exampleSetup = `Choose one snippet at a time and place it inside your language's Start/on_start callback. These are independent examples; each creates its own handles or builders. Follow [Gameplay language bindings](/docs/guides/gameplay-actions/language-bindings) for imports and callback registration. Python must import the modules used in its snippet from rustic; C# uses using static Rustic; Java examples belong inside a Rustic subclass; PHP callbacks declare global $rustic. HTML snippets go inside an inline script in a ui/ HTML asset.\n\nUse an anchored Part for transform and effect examples, an unanchored collidable Part for forces, and a perspective camera named Camera for camera examples. Create Target for follow examples. Audio examples require assets/music.ogg in the Play snapshot. Replace scene paths with those listed by Game.scene.List(). Animation playback and sequence-animation examples require the Reveal fixture on the [Animation page](/docs/api/animation); marker callbacks also require its Halfway marker. Run clock controls separately; a paused clock cannot advance a timer.\n\nC callback examples use these file-scope functions before on_start:\n\n\`\`\`c\nstatic void on_done(void) { rustic.log("info", "done"); }\nstatic void on_sample(RusticValue value) { (void)value; rustic.log("info", "sample received"); }\nstatic void on_event(const RusticValue *args, size_t count) {\n    (void)args; (void)count; rustic.log("info", "event received");\n}\n\`\`\``;

const entitySetup = "Place one snippet inside a Start/on_start callback attached to a live scene object. Python imports the named service from rustic; C includes rustic.h; C++ includes rustic.hpp; C# uses using static Rustic; Java uses a Rustic subclass; PHP requires rustic.php and global $rustic. See [Entity foundations](/docs/guides/entity-foundations) for full setup, errors and lifetime. For PHP and HTML UI scripts, replace the UI owner with a live scene ID. Hierarchy keep_world defaults to true except C, which requires it. These snippets do not require any assets or a browser DOM.";

function languageBlocks(entry: Example, heading: string): string {
  return exampleLanguages.map((language, index) => {
    const code = entry.examples[language];
    if (!code?.trim()) throw new Error(`Missing ${language} example for ${entry.title}`);
    return `${heading}${language}\n\n\`\`\`${fences[index]}\n${code}\n\`\`\``;
  }).join("\n\n");
}

export function buildCallExamples(topic: string, name: string): string {
  const entries = examples[topic];
  if (!entries) return "";
  const entry = entries.find((entry) => entry.title.split(" / ").includes(name));
  if (!entry) throw new Error(`Missing examples for ${topic}/${name}`);
  return `${topic === "entity-foundations" ? entitySetup : exampleSetup}\n\n${entry.note ? entry.note + "\n\n" : ""}${languageBlocks(entry, "### ")}`;
}

export function buildFunctionExamples(topic: string): string {
  const entries = examples[topic];
  if (!entries) return "";
  return `\n\n## Examples for every function\n\n${topic === "entity-foundations" ? entitySetup : exampleSetup}\n\n${entries.map((entry) => {
    const blocks = languageBlocks(entry, `#### ${entry.title} — `);
    return `### ${entry.title}\n\n${entry.note ? entry.note + "\n\n" : ""}${blocks}`;
  }).join("\n\n")}`;
}
