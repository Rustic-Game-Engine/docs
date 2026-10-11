import type { ApiCall, ApiCategory } from "./api-reference";

export function buildApiCategoryMarkdown(category: ApiCategory, title: string, description: string) {
  return `# ${title}\n\n${description}\n\nChoose an API to see its signature, parameters, examples and behavior.\n\n## APIs\n\n${category.calls.map((call) => `- [${call.title}](/docs/${call.slug})`).join("\n")}`;
}

function section(markdown: string, heading: string) {
  const start = markdown.indexOf(`\n## ${heading}\n`);
  if (start < 0) return "";
  const body = markdown.slice(start + `\n## ${heading}\n`.length);
  const end = body.indexOf("\n## ");
  return (end < 0 ? body : body.slice(0, end)).trim();
}

// Audio examples focus on the selected call; voice creation is setup for controls.
const audioExamples: Record<string, string> = {
  "get-output-devices": 'const devices = Audio.get_output_devices();\nprint(JSON.stringify(devices));',
  "get-input-devices": 'const devices = Audio.get_input_devices();\nprint(JSON.stringify(devices));',
  "set-output-device": 'const devices = Audio.get_output_devices();\nif (devices.length > 0) {\n  Audio.set_output_device(devices[0].id);\n}',
  "set-input-device": 'const devices = Audio.get_input_devices();\nif (devices.length > 0) {\n  Audio.set_input_device(devices[0].id);\n}',
  play: 'const voice = Audio.play("assets/music.ogg", {loop: true});',
  "play-at": 'const voice = Audio.playAt("assets/music.ogg", [0, 0, 0]);',
  "voice-pause": 'const voice = Audio.play("assets/music.ogg");\nvoice.pause();',
  "voice-resume": 'const voice = Audio.play("assets/music.ogg");\nvoice.pause();\nTimer.after(1, () => voice.resume());',
  "voice-stop": 'const voice = Audio.play("assets/music.ogg");\nvoice.stop();',
  volume: 'const voice = Audio.play("assets/music.ogg");\nAudio.volume(voice, 0.5);',
  pitch: 'const voice = Audio.play("assets/music.ogg");\nAudio.pitch(voice, 1.25);',
  "fade-in": 'const voice = Audio.play("assets/music.ogg", {volume: 0});\nAudio.fadeIn(voice, 2, Ease.InSine);',
  "fade-out": 'const voice = Audio.play("assets/music.ogg");\nAudio.fadeOut(voice, 1, Ease.OutSine);',
  crossfade: 'const oldVoice = Audio.play("assets/music.ogg");\nconst newVoice = Audio.play("assets/next.ogg", {volume: 0});\nAudio.crossfade(oldVoice, newVoice, 2, Ease.InOutSine);',
};

const audioParameters: Record<string, string> = {
  id: "Opaque ID from the latest device list for the matching direction in this Play scene. Pass null to select the current system default; names are display labels, not IDs.",
  source: "Project-relative WAV/OGG asset path. Provide the file before Play.",
  options: "Optional playback options: loop, volume and pitch.",
  position: "World vector used for distance attenuation relative to the active camera.",
  voice: "Voice returned by Audio.play or Audio.playAt.",
  oldVoice: "Playing voice to fade to zero volume.",
  newVoice: "Voice to fade from zero to one.",
  value: "Finite non-negative volume within f32 range; pitch must be finite and positive.",
  duration: "Finite non-negative duration in scene-clock seconds.",
  easing: "Optional Ease constant; defaults to Linear.",
  volume: "Target volume; defaults to one.",
};

function audioReturn(method: string) {
  if (["get-output-devices", "get-input-devices"].includes(method)) return "Returns a list of device records containing string id and name fields. Empty lists are valid on hosts without devices. Enumeration currently requires Windows; headless platforms return an empty list.";
  if (method === "set-output-device") return "Returns no value. Switches this scene's mixer output to the selected Windows device. Mixer voices retain their playback cursors; queued output samples are discarded, so a brief interruption is possible. A failed switch preserves the previous output.";
  if (method === "set-input-device") return "Returns no value. Validates and retains this scene's selected Windows input device. This call does not start microphone capture or route sound to playback. Lua/Luau recording and hot mic capture currently use the system default input independently of this selection.";
  if (["play", "play-at"].includes(method)) return "Returns a voice object with an ID and playback controls.";
  if (["fade-in", "fade-out", "crossfade"].includes(method)) return "Returns an operation handle. The shared scheduler advances the fade using scene-clock time.";
  return "Updates the voice playback directly without creating an operation handle.";
}

function parametersFor(call: ApiCall, shared: string) {
  const args = call.signature.match(/\((.*)\)/)?.[1];
  if (args === "") return "This call has no arguments.";
  if (args === undefined) return "This constant has no arguments. Pass it to an action or interpolation function.";
  if (!shared.startsWith("|")) return shared;
  const names = args.split(",").map((arg) => arg.trim().replace(/[?=].*$/, "").trim());
  const rows = shared.split("\n");
  const selected = rows.slice(2).filter((row) => {
    const parameter = row.split("|")[1]?.replaceAll("`", "").trim() ?? "";
    return parameter.split(/\s*\/\s*/).some((name) => names.includes(name));
  });
  // Keep the shared conventions if the table uses semantic groups (for example,
  // "to / from" for a move's position) rather than every signature argument.
  const documented = rows.slice(2).flatMap((row) => (row.split("|")[1]?.replaceAll("`", "").trim() ?? "").split(/\s*\/\s*/));
  return names.every((name) => documented.includes(name)) ? [...rows.slice(0, 2), ...selected].join("\n") : shared;
}

export function buildApiCallMarkdown(category: ApiCategory, call: ApiCall, title: string, shared: string) {
  const method = call.slug.split("/").pop()!;
  const audio = category.slug === "api/audio";
  const audioDevice = audio && ["get-output-devices", "get-input-devices", "set-output-device", "set-input-device"].includes(method);
  const args = call.signature.match(/\((.*)\)/)?.[1] ?? "";
  const parameters = audio && args ? `| Parameter | Meaning |\n| --- | --- |\n${args.split(",").map((arg) => {
    const name = arg.trim().replace(/[?=].*$/, "").trim();
    const meaning = name === "value" ? (method === "pitch" ? "Finite positive pitch multiplier." : "Finite non-negative volume within f32 range.") : audioParameters[name];
    return `| ${name} | ${meaning} |`;
  }).join("\n")}` : parametersFor(call, section(shared, "Parameters") || section(shared, "Variables"));
  const setup = section(shared, "Setup and language support") || section(shared, "When to call it");
  const returns = audio ? audioReturn(method) : section(shared, "Return and timing");
  const originalExample = section(shared, "Example") || section(shared, "Language examples");
  const name = call.signature.split("(")[0].split(".").pop()!;
  // Keep complete working examples when they demonstrate this call, including
  // any prerequisite operations. Other examples stay with their own API page.
  const example = audio ? `\`\`\`javascript\nglobalThis.behavior = {\n  Start() {\n${audioExamples[method].split("\n").map((line) => `    ${line}`).join("\n")}\n  }\n};\n\`\`\`` : originalExample.includes(name) ? originalExample : "";
  const constraints = section(shared, "Behavior and limitations") || section(shared, "Constraints and behavior");
  // Example-specific outcomes belong alongside the example that demonstrates them.
  const sharedConstraints = constraints.split("\n").filter((line) => !/^- (Attach (the|this) example|The (Console|voice) |Provide assets\/music)/.test(line)).join("\n");
  const deviceConstraints = "Native device methods work in the Windows player and are available in every supported scripting language. Lists are snapshots: another enumeration of the same direction invalidates older IDs. IDs belong to the current Play scene; do not save them in project settings. Output and input IDs are not interchangeable, and names can be duplicated. Selection is shared by scripts in the scene and resets on Stop/new Play.\n\nSelecting on a headless platform, selecting an unknown/stale ID, a missing system default or a native driver failure raises a script error. Check the Console, refresh the list after hardware changes, and select a valid ID or null. Device removal is not automatically recovered.\n\nUse nil in Lua/Luau, None in Python and NULL in C for the system default. Java and C require an explicit argument; other bindings also allow omitting it. C lists use RusticAudioDevices (count and items[i].id/name) and last until the next callback; C++ returns a RusticValue array, C# a JsonElement array, Java a list of maps and PHP associative arrays.";
  return [
    `# ${call.title}`,
    `[${title}](/docs/${category.slug})`,
    `## Signature\n\n\`${call.signature}\``,
    setup && `## Setup and usage\n\n${setup}`,
    `## Parameters\n\n${parameters}`,
    returns && `## Return and timing\n\n${returns}`,
    example && `## Usage example\n\n${example}`,
    (audioDevice ? deviceConstraints : sharedConstraints) && `## Shared ${title} constraints\n\n${audioDevice ? deviceConstraints : sharedConstraints}`,
  ].filter(Boolean).join("\n\n");
}
