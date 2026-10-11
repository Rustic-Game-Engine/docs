import exampleData from "./api-example-data.json";

export const exampleLanguages = ["Lua 5.4", "JavaScript", "Python", "C++", "C#", "Luau", "C", "Java", "PHP", "HTML / inline JS"] as const;
const fences = ["lua", "javascript", "python", "cpp", "csharp", "lua", "c", "java", "php", "javascript"];
type Example = { title: string; note: string; examples: Record<string, string> };
const examples: Record<string, Example[]> = exampleData;

export function buildFunctionExamples(topic: string): string {
  const entries = examples[topic];
  if (!entries) return "";
  const setup = `## Examples for every function\n\nChoose one snippet at a time and place it inside your language's Start/on_start callback. These are independent examples; each creates its own handles or builders. Follow [Gameplay language bindings](/docs/guides/gameplay-actions/language-bindings) for imports and callback registration. Python must import the modules used in its snippet from rustic; C# uses using static Rustic; Java examples belong inside a Rustic subclass; PHP callbacks declare global $rustic. HTML snippets go inside an inline script in a ui/ HTML asset.\n\nUse an anchored Part for transform and effect examples, an unanchored collidable Part for forces, and a perspective camera named Camera for camera examples. Create Target for follow examples. Audio examples require assets/music.ogg in the Play snapshot. Replace scene paths with those listed by Game.scene.List(). Animation playback and sequence-animation examples require the Reveal fixture on the [Animation page](/docs/api/animation); marker callbacks also require its Halfway marker. Run clock controls separately; a paused clock cannot advance a timer.\n\nC callback examples use these file-scope functions before on_start:\n\n\`\`\`c\nstatic void on_done(void) { rustic.log("info", "done"); }\nstatic void on_sample(RusticValue value) { (void)value; rustic.log("info", "sample received"); }\nstatic void on_event(const RusticValue *args, size_t count) {\n    (void)args; (void)count; rustic.log("info", "event received");\n}\n\`\`\``;
  return `\n\n${setup}\n\n${entries.map((entry) => {
    const blocks = exampleLanguages.map((language, index) => {
      const code = entry.examples[language];
      if (!code?.trim()) throw new Error(`Missing ${language} example for ${entry.title}`);
      return `#### ${entry.title} — ${language}\n\n\`\`\`${fences[index]}\n${code}\n\`\`\``;
    }).join("\n\n");
    return `### ${entry.title}\n\n${entry.note ? entry.note + "\n\n" : ""}${blocks}`;
  }).join("\n\n")}`;
}
