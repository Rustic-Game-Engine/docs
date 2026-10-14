import { buildCallExamples } from "./api-examples";
import type { ApiCall, ApiCategory } from "./api-reference";
// Capture uses the same engine-owned service across every gameplay binding.
type CaptureReference = {
  parameters: string;
  returns: string;
  example: string;
};

const noParameters = "This call has no arguments.";
const audioCaptureReference: Record<string, CaptureReference> = {
  "start-recording": {
    parameters: "| Parameter | Meaning |\n| --- | --- |\n| path | Optional new `.wav` filename. Omit it to retain PCM in the returned handle. Absolute paths persist outside the play snapshot; relative paths resolve inside it. Parent directories must exist and existing files are never overwritten. |\n| options | Optional table: `{source = \"game\"}` (default) or `{source = \"microphone\"}`. Microphone capture requires Windows. |",
    returns: "Returns a script-owned recording handle. Game output is 48,000 Hz stereo float PCM; microphone rate and channels come from the default input device. Stop the handle before consuming the completed recording. A path also writes a 32-bit float WAV that is finalized on stop or cleanup.",
    example: 'local rec\nreturn {\n  Start = function()\n    rec = rustic.game:startRecording()\n    -- Or pass a new absolute .wav path to also save a file.\n  end,\n  OnStop = function()\n    rec:stopRecording()\n    local packet = rec:read()\n    print(packet.sampleRate, packet.channels, #packet.samples)\n    rec:unload()\n  end\n}',
  },
  "stop-recording": {
    parameters: "| Parameter | Meaning |\n| --- | --- |\n| recording | Optional recording handle owned by this script. Omit it to stop all of this script's recordings. |",
    returns: "Stops recording and finalizes any WAV file. Lua/Luau return the supplied handle or nil; other bindings return no value. Retained PCM remains readable until unload or owner cleanup. Repeated stops are safe.",
    example: 'local rec\nreturn {\n  Start = function() rec = rustic.game:startRecording() end,\n  OnStop = function()\n    rustic.game:stopRecording(rec)\n    local packet = rec:read()\n    print(#packet.samples)\n    rec:unload()\n  end\n}',
  },
  "start-hot-mic": {
    parameters: noParameters,
    returns: "Returns a script-owned hot mic handle capturing the Windows default input device. Read local interleaved PCM chunks during Update for audio processing or your own relay code. Automatic network transport and speaker monitoring are not provided.",
    example: 'local mic\nreturn {\n  Start = function() mic = rustic.game:startHotMic() end,\n  Update = function()\n    local packet = mic:read()\n    -- Use packet.samples, packet.sampleRate and packet.channels.\n    local peak = 0\n    for _, sample in ipairs(packet.samples) do\n      peak = math.max(peak, math.abs(sample))\n    end\n  end,\n  OnStop = function() mic:stopHotMic(); mic:unload() end\n}',
  },
  "stop-hot-mic": {
    parameters: "| Parameter | Meaning |\n| --- | --- |\n| mic | Optional hot mic handle owned by this script. Omit it to stop all of this script's hot microphones. |",
    returns: "Closes the input device and discards unread hot mic input. Lua/Luau return the supplied handle or nil; other bindings return no value. Repeated stops are safe.",
    example: 'local mic\nreturn {\n  Start = function() mic = rustic.game:startHotMic() end,\n  OnStop = function() rustic.game:stopHotMic(mic); mic:unload() end\n}',
  },
  "rec-stop-recording": {
    parameters: noParameters,
    returns: "Stops this recording and finalizes its WAV file, returning the same recording handle. Recorded PCM remains available through read() until unload or owner cleanup. Repeated stops are safe.",
    example: 'local rec\nreturn {\n  Start = function() rec = rustic.game:startRecording() end,\n  OnStop = function()\n    rec:stopRecording()\n    repeat\n      local packet = rec:read()\n      print(#packet.samples)\n    until #packet.samples == 0\n    rec:unload()\n  end\n}',
  },
  "mic-stop-hot-mic": {
    parameters: noParameters,
    returns: "Closes this microphone and discards unread input, returning the same mic handle. Repeated stops are safe.",
    example: 'local mic\nreturn {\n  Start = function() mic = rustic.game:startHotMic() end,\n  OnStop = function() mic:stopHotMic(); mic:unload() end\n}',
  },
  "capture-read": {
    parameters: noParameters,
    returns: "Returns `{samples, sampleRate, channels, active, droppedSamples}`. Consumes at most 4,096 interleaved float samples while preserving complete channel frames. An empty samples table means no queued data is available. Recordings can be read after stop; a hot mic supplies only live queued input. droppedSamples reports input discarded since the preceding read.",
    example: 'local capture\nreturn {\n  Start = function() capture = rustic.game:startRecording() end,\n  OnStop = function()\n    capture:stopRecording()\n    repeat\n      local packet = capture:read()\n      print(packet.sampleRate, packet.channels, #packet.samples)\n    until #packet.samples == 0\n    capture:unload()\n  end\n}',
  },
  "capture-stop": {
    parameters: noParameters,
    returns: "Stops this recording or hot mic. Lua/Luau return the same handle; other bindings return no value. This is an alias for stopRecording() on recordings and stopHotMic() on hot microphones.",
    example: 'local capture\nreturn {\n  Start = function() capture = rustic.game:startRecording() end,\n  OnStop = function() capture:stop(); capture:unload() end\n}',
  },
  "capture-unload": {
    parameters: noParameters,
    returns: "Releases this capture handle and its retained PCM, closes any input device and finalizes any WAV file. Further calls on the handle raise an error. No value is returned.",
    example: 'local capture\nreturn {\n  Start = function() capture = rustic.game:startRecording() end,\n  OnStop = function() capture:stop(); capture:unload() end\n}',
  },
};

const captureSetup = "Available in every supported gameplay language. Create an Object Component script in `scripts/`, attach it to an enabled scene object, and press **Play**. Start capture in Start or another callback. Native SDKs use their own member syntax; Lua uses colons. Microphone input requires Windows and OS microphone access. Recording captures audio, not video.";
const captureConstraints = "- Capture handles belong to their script. Destroying the owner, ending Play or successful reload closes devices, finalizes files and releases handles. Read retained data in OnStop before cleanup.\n- Each script may retain at most four capture handles; call `:unload()` after use. Recordings retain at most 64 MiB of PCM, including recordings written to files (about 175 seconds of stereo game audio). Exceeding the limit stops capture and read/stop report an error.\n- Hot mic queues at most two seconds of input. Read regularly, using multiple reads if needed. `droppedSamples` reports lost input. Microphone samples are finite floats in `[-1, 1]`; channel count and rate come from the device.\n- Default F32, I16 and U16 microphone formats are supported. Missing devices, denied access, unsupported formats, startup timeouts and disconnection raise errors. Catch expected failures with `pcall`.\n- A recording destination must be a new `.wav` file in an existing writable directory. Game mixer recording also works headlessly.\n\nSee [the recording and hot mic guide](/docs/guides/api-languages) for full setup and examples.";


export function buildApiCategoryMarkdown(category: ApiCategory, title: string, description: string, shared = "") {
  const guidance = shared.split(/(?=^## )/m).slice(1).filter((part) => !/^## (Calls|Example|Language examples|Examples for every function)(?:\n|$)/.test(part)).join("");
  return `# ${title}\n\n${description}\n\n[Feature status and language/platform compatibility](/docs/reference/compatibility)\n\nChoose an API to see its signature, parameters, examples and behavior.\n\n## APIs\n\n${category.calls.map((call) => `- [${call.title}](/docs/${call.slug})`).join("\n")}\n\n${guidance ? `## Module guide\n\n${guidance}` : ""}`;
}

function section(markdown: string, heading: string) {
  const start = markdown.indexOf(`\n## ${heading}\n`);
  if (start < 0) return "";
  const body = markdown.slice(start + `\n## ${heading}\n`.length);
  const end = body.indexOf("\n## ");
  return (end < 0 ? body : body.slice(0, end)).trim();
}

const audioParameters: Record<string, string> = {
  id: "Opaque ID from the latest device list for the matching direction in this Play scene. Pass null to select the current system default; names are display labels, not IDs.",
  source: "Project-relative WAV, MP3, AAC, FLAC or OGG asset path. Provide the file before Play.",
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
  if (method === "set-input-device") return "Returns no value. Validates and retains this scene's selected Windows input device. This call does not start microphone capture or route sound to playback. Recording and hot mic capture currently use the system default input independently of this selection.";
  if (method === "load") return "Decodes and retains the clip without starting playback; returns a reusable loaded audio handle.";
  if (method.startsWith("audio-")) return "Operates on a reusable loaded clip. load returns the same handle; play returns a voice; stop/pause/resume/unload return no value. C reload obtains a new Audio.load handle. Stop retains PCM; unload frees it.";
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

// Core snippets include prerequisite reads and writes, so keep each complete
// language block for every supported binding.
function coreCallExamples(shared: string): string {
  const examples = section(shared, "Language examples");
  return examples;
}

function compatibilityFor(category: ApiCategory, call: ApiCall) {
  const name = call.signature.split("(")[0];
  const languages = ["print", "warn"].includes(name) ? "Lua 5.4, Luau, JavaScript and HTML/inline JavaScript; other languages use rustic.print/rustic.warn"
    : "C, C++, C#, Python, JavaScript, Lua 5.4, Luau, Java, PHP and HTML/inline JavaScript (binding spellings and return shapes differ)";
  const platforms = category.slug === "api/audio"
    ? "Native devices and microphone input require Windows. Game-output recording and the mixer can run headlessly. Other operating systems do not supply the Windows native device backend."
    : "Use a compatible native engine build and the language tools required by your binding. This does not establish browser/mobile export or release qualification for every OS.";
  return `## Compatibility\n\n**Supported languages:** ${languages}.\n\n${platforms}\n\nThe signature below is the shared reference notation; language examples show the actual binding syntax. Question marks mark optional arguments and explicit defaults are shown where recorded. Do not copy reference notation as a typed declaration.\n\nSee [Feature status and compatibility](/docs/reference/compatibility) for API 1.0/1.1 and per-method restrictions. Engine release tags and Docs v0.1 are independent versions.`;
}

function relatedFor(category: ApiCategory, call: ApiCall) {
  return `## Related APIs\n\n${category.calls.filter((entry) => entry.slug !== call.slug).slice(0, 5).map((entry) => `- [${entry.title}](/docs/${entry.slug})`).join("\n")}\n\n[All ${category.slug.slice(4)} APIs](/docs/${category.slug})`;
}

export function buildApiCallMarkdown(category: ApiCategory, call: ApiCall, title: string, shared: string) {
  if (category.slug === "api/entity-foundations") {
    const name = call.signature.split("(")[0];
    return [
      `# ${call.title}`,
      `[${title}](/docs/${category.slug})`,
      `## Signature\n\n\`${call.signature}\``,
      `## Purpose and example\n\n${section(shared, name)}`,
      `## Language examples\n\n${buildCallExamples("entity-foundations", name)}`,
      `## Setup and language support\n\n${section(shared, "Setup and language support")}`,
      `## Parameters\n\n${section(shared, "Parameters")}`,
      `## Return and timing\n\n${section(shared, "Return and timing")}`,
      `## Behavior and limitations\n\n${section(shared, "Behavior and limitations")}`,
    ].join("\n\n");
  }
  const method = call.slug.split("/").pop()!;
  const audio = category.slug === "api/audio";
  const capture = audio ? audioCaptureReference[method.replace(/^game-/, "")] : undefined;
  if (capture) {
    return [
      `# ${call.title}`,
      `[${title}](/docs/${category.slug})`,
      compatibilityFor(category, call),
      `## Signature\n\n\`${call.signature}\``,
      `## Setup and usage\n\n${captureSetup}`,
      `## Parameters\n\n${capture.parameters}`,
      `## Return and timing\n\n${capture.returns}`,
      `## Language examples\n\n${buildCallExamples("audio", call.signature.split("(")[0])}`,
      `## Complete Lua lifecycle example\n\n\`\`\`lua\n${capture.example}\n\`\`\``,
      `## Capture limits and troubleshooting\n\n${captureConstraints}`,
      relatedFor(category, call),
    ].join("\n\n");
  }
  const audioDevice = audio && ["get-output-devices", "get-input-devices", "set-output-device", "set-input-device"].includes(method);
  const args = call.signature.match(/\((.*)\)/)?.[1] ?? "";
  const parameters = audio && args ? `| Parameter | Meaning |\n| --- | --- |\n${args.split(",").map((arg) => {
    const name = arg.trim().replace(/[?=].*$/, "").trim();
    const meaning = name === "value" ? (method === "pitch" ? "Finite positive pitch multiplier." : "Finite non-negative volume within f32 range.") : audioParameters[name];
    return `| ${name} | ${meaning} |`;
  }).join("\n")}` : parametersFor(call, section(shared, "Parameters") || section(shared, "Variables"));
  const setup = section(shared, "Setup and language support") || section(shared, "When to call it");
  const returns = audio ? audioReturn(method) : section(shared, "Return and timing");
  const name = call.signature.split("(")[0];
  const topic = category.slug.slice(4);
  const example = category.source.startsWith("api:")
    ? coreCallExamples(shared)
    : buildCallExamples(topic, name);
  const constraints = section(shared, "Behavior and limitations") || section(shared, "Constraints and behavior");
  // Example-specific outcomes belong alongside the example that demonstrates them.
  const sharedConstraints = constraints.split("\n").filter((line) => !/^- (Attach (the|this) example|The (Console|voice) |Provide assets\/music)/.test(line)).join("\n");
  const deviceConstraints = "Native device methods work in the Windows player and are available in every supported scripting language. Lists are snapshots: another enumeration of the same direction invalidates older IDs. IDs belong to the current Play scene; do not save them in project settings. Output and input IDs are not interchangeable, and names can be duplicated. Selection is shared by scripts in the scene and resets on Stop/new Play.\n\nSelecting on a headless platform, selecting an unknown/stale ID, a missing system default or a native driver failure raises a script error. Check the Console, refresh the list after hardware changes, and select a valid ID or null. Device removal is not automatically recovered.\n\nUse nil in Lua/Luau, None in Python and NULL in C for the system default. Java and C require an explicit argument; other bindings also allow omitting it. C lists use RusticAudioDevices (count and items[i].id/name) and last until the next callback; C++ returns a RusticValue array, C# a JsonElement array, Java a list of maps and PHP associative arrays.";
  return [
    `# ${call.title}`,
    `[${title}](/docs/${category.slug})`,
      compatibilityFor(category, call),
    `## Signature\n\n\`${call.signature}\``,
    setup && `## Setup and usage\n\n${setup}`,
    `## Parameters\n\n${parameters || "See the category conventions and the language-specific examples below; no additional parameter contract is asserted here."}`,
    returns && `## Return and timing\n\n${returns}`,
    `## Execution behavior\n\nCore write timing differs between immediate Lua host calls, deferred JavaScript/Web commands and external SDK query flushes. Scheduled actions advance with the scene clock; synchronous queries evaluate at the call. Follow [execution rules](/docs/guides/scripting#when-mutations-take-effect) and the return/timing notes for this category.`,
    example && `## Language examples\n\n${example}`,
    (audioDevice ? deviceConstraints : sharedConstraints) && `## Shared ${title} constraints\n\n${audioDevice ? deviceConstraints : sharedConstraints}`,
    `## Errors and debugging\n\nRead the constraints above and the Console diagnostic. Invalid types, non-finite values, stale targets or unavailable native services can fail validation. A failed callback disables the behavior; a failed source reload keeps the last good instance. Exact error messages depend on the language adapter. See [Troubleshooting](/docs/troubleshooting).`,
    relatedFor(category, call),
  ].filter(Boolean).join("\n\n");
}
