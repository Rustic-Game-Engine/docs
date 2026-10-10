export type DocEntry = { slug: string; title: string; description: string; source: string };
export type DocGroup = { label: string; docs: DocEntry[] };

export const docGroups: DocGroup[] = [
  { label: "Start here", docs: [
    { slug: "engine", title: "Using Rustic Engine", description: "Create a game, attach scripts, and learn how to use the editor and gameplay API.", source: "content/engine.md" },
    { slug: "api/overview", title: "API overview", description: "Rustic API concepts, language support, and execution rules.", source: "api:overview" },
    { slug: "callbacks", title: "Lifecycle callbacks", description: "Choose the correct callback for setup, frames, physics, and teardown.", source: "api:callbacks" },
  ] },
  { label: "Core API", docs: [
    { slug: "api/entity", title: "Entity & time", description: "Read the current entity ID and frame timing.", source: "api:entity" },
    { slug: "api/transforms", title: "Transforms", description: "Read and change the owning entity's position.", source: "api:transforms" },
    { slug: "api/properties", title: "Public properties", description: "Read and update declared script properties.", source: "api:properties" },
    { slug: "api/attributes", title: "Built-in attributes", description: "Read or edit engine-owned entity attributes.", source: "api:attributes" },
    { slug: "api/input", title: "Input", description: "Use held keys in Play and see current input limits.", source: "api:input" },
    { slug: "api/logging", title: "Logging", description: "Write bounded messages to the live game console.", source: "api:logging" },
    { slug: "api/enabled", title: "Enabled state", description: "Enable or disable the owning behavior entity.", source: "api:enabled" },
  ] },
  { label: "Gameplay APIs", docs: [
    { slug: "api/gameplay", title: "Gameplay actions", description: "All-language easing, actions, animation, physics, audio and signals.", source: "api:gameplay" },
    { slug: "guides/gameplay-actions", title: "Use gameplay actions", description: "Attach scripts, play clips, compose actions and use physics, audio and callbacks.", source: "docs/Scripting/gameplayActions.md" },
    { slug: "guides/gameplay-architecture", title: "Gameplay API architecture", description: "Core services, property adapters, clip handles, timing and lifetime boundaries.", source: "docs/GAMEPLAY_API_ARCHITECTURE.md" },
    { slug: "api/tween", title: "Tween", description: "Animate an entity property or script value without writing an Update loop.", source: "docs/Scripting/API/tween.md" },
    { slug: "api/ease", title: "Ease", description: "Choose one of 31 shared easing curves for actions and synchronous interpolation.", source: "docs/Scripting/API/ease.md" },
    { slug: "api/movement", title: "Movement", description: "Move, turn, follow and orbit objects with finite engine-scheduled actions.", source: "docs/Scripting/API/movement.md" },
    { slug: "api/animation", title: "Animation", description: "Play imported skeletal clips, register property tracks, animate script values and run procedural poses.", source: "docs/Scripting/API/animation.md" },
    { slug: "api/sequence", title: "Sequence and Timeline", description: "Compose sequential and parallel actions without nesting timer callbacks.", source: "docs/Scripting/API/sequence.md" },
    { slug: "api/timer", title: "Timer", description: "Schedule one-shot or repeating scene-clock callbacks.", source: "docs/Scripting/API/timer.md" },
    { slug: "api/smooth", title: "Smooth and Interpolation", description: "Evaluate interpolation and damping immediately without scheduling an action.", source: "docs/Scripting/API/smooth.md" },
    { slug: "api/path", title: "Path", description: "Traverse linear, Bezier and spline paths with global and per-segment easing.", source: "docs/Scripting/API/path.md" },
    { slug: "api/camera-actions", title: "Camera actions", description: "Move, aim, zoom, follow and shake a game camera using shared actions.", source: "docs/Scripting/API/camera-actions.md" },
    { slug: "api/physics-actions", title: "Physics queries and forces", description: "Query live primitive colliders and change simulated body velocity.", source: "docs/Scripting/API/physics-actions.md" },
    { slug: "api/effects", title: "Effects", description: "Fade, flash, shake and pulse entity properties with shared easing.", source: "docs/Scripting/API/effects.md" },
    { slug: "api/audio", title: "Audio", description: "Play engine-decoded WAV/OGG voices, adjust parameters and schedule fades.", source: "docs/Scripting/API/audio.md" },
    { slug: "api/events", title: "Events and signals", description: "Communicate through queued global events and object-scoped signals across scripting languages.", source: "docs/Scripting/API/events.md" },
    { slug: "api/clock", title: "Clock", description: "Scale or pause the shared scene clock for actions, animation, physics and audio.", source: "docs/Scripting/API/clock.md" },
    { slug: "api/operation-handles", title: "Operation handles", description: "Inspect, pause, resume, cancel and observe engine-scheduled actions.", source: "docs/Scripting/API/operation-handles.md" },
  ] },
  { label: "Scene API", docs: [
    { slug: "guides/scene-objects", title: "Edit scene objects", description: "Target an object by scene name and hierarchy in any script language.", source: "docs/Scripting/sceneObjects.md" },
    { slug: "api/environment", title: "Scene environment", description: "Read and change sky textures, ambient and sun lighting, and haze from every script language.", source: "api:environment" },
    { slug: "api/scene", title: "Scene lookup", description: "Find entities and enumerate stable scene paths.", source: "api:scene" },
    { slug: "api/instances", title: "Add & clone instances", description: "Queue creation from a source path with an optional parent.", source: "api:instances" },
    { slug: "api/camera", title: "Current camera", description: "Select the active game camera by path or entity ID.", source: "api:camera" },
  ] },
  { label: "Engine guides", docs: [
    { slug: "guides/scene-environment", title: "Sky & atmosphere", description: "Set a per-scene panorama, ambient and sun lighting, and distance haze.", source: "docs/SCENE_ENVIRONMENT.md" },
    { slug: "guides/physics", title: "Basic physics", description: "Gravity, falling primitives, collision, anchored floors, and current limits.", source: "docs/PHYSICS.md" },
    { slug: "guides/ai-agents", title: "AI agents & app data", description: "Connect Codex or Claude and inspect or edit agent information through MCP.", source: "docs/AGENT_INTEGRATION.md" },
    { slug: "guides/gameplay-programming", title: "Gameplay programming", description: "Script attachment, execution order, reload, and runtime behavior.", source: "docs/GAMEPLAY_PROGRAMMING.md" },
    { slug: "guides/cameras-and-lights", title: "Cameras & lights", description: "Camera components, projection, priorities, and lighting.", source: "docs/CAMERAS_AND_LIGHTS.md" },
  ] },
  { label: "Scripting languages", docs: [
    { slug: "scripting/lua", title: "Lua 5.4", description: "Create, attach, and debug Lua gameplay scripts, including a copyable keyboard controller.", source: "docs/Scripting/scriptingLua.md" },
    { slug: "scripting/javascript", title: "JavaScript", description: "Write JavaScript behaviors with lifecycle callbacks and the Script API.", source: "docs/Scripting/scriptingJavaScript.md" },
    { slug: "scripting/luau", title: "Luau", description: "Use Luau callbacks and the built-in Script API.", source: "docs/Scripting/scriptingLuau.md" },
    { slug: "scripting/python", title: "Python", description: "Write persistent Python API behaviors.", source: "docs/Scripting/scriptingPython.md" },
    { slug: "scripting/c", title: "C", description: "Build C API behaviors.", source: "docs/Scripting/scriptingC.md" },
    { slug: "scripting/cpp", title: "C++", description: "Build C++ API behaviors with the generated SDK.", source: "docs/Scripting/scriptingCpp.md" },
    { slug: "scripting/csharp", title: "C#", description: "Build C# API behaviors with the generated SDK.", source: "docs/Scripting/scriptingCSharp.md" },
    { slug: "scripting/java", title: "Java", description: "Build Java API behaviors.", source: "docs/Scripting/scriptingJava.md" },
    { slug: "scripting/php", title: "PHP", description: "Build PHP API behaviors for UI entries.", source: "docs/Scripting/scriptingPHP.md" },
    { slug: "scripting/web", title: "HTML/CSS", description: "Use inline JavaScript in Web script assets.", source: "docs/Scripting/scriptingWeb.md" },
  ] },
  { label: "Open-Sourced Docs", docs: [
    { slug: "open-source", title: "Open-Sourced Docs", description: "Repository development guides for the engine, docs, examples, and hosting SDK.", source: "content/repositories.md" },
  ] },
  { label: "Engine source", docs: [
    { slug: "open-source/engine", title: "Engine repository", description: "Rust architecture, prerequisites, builds, tooling, and starting points for your own engine.", source: "content/engine-source.md" },
    { slug: "open-source/engine/introduction", title: "Introduction", description: "What Rustic Engine is, implemented features, and core technologies.", source: "content/engine/introduction.md" },
    { slug: "open-source/engine/getting-started", title: "Getting Started", description: "Clone, prepare, build, and run the engine from source.", source: "content/engine/getting-started.md" },
    { slug: "open-source/engine/architecture", title: "Architecture", description: "Editor, runtime, rendering, physics, scripting, and asset ownership.", source: "content/engine/architecture.md" },
    { slug: "open-source/engine/project-structure", title: "Project Structure", description: "Navigate the Rust workspace, applications, crates, and game project files.", source: "content/engine/project-structure.md" },
    { slug: "open-source/engine/rendering-system", title: "Rendering System", description: "Graphics backends, automatic selection, diagnostics, and performance.", source: "content/engine/rendering-system.md" },
    { slug: "open-source/engine/scripting-architecture", title: "Scripting Architecture", description: "Language adapters, execution, script components, lifecycle, and reload.", source: "content/engine/scripting-architecture.md" },
    { slug: "open-source/engine/scene-system", title: "Scene System", description: "Scene loading, stable objects, components, versioned storage, and recovery.", source: "content/engine/scene-system.md" },
    { slug: "open-source/engine/editor-development", title: "Editor Development", description: "Develop panels, project manager flows, workspaces, and debugging tools.", source: "content/engine/editor-development.md" },
    { slug: "open-source/engine/building-packaging", title: "Building & Packaging", description: "Build profiles, operating-system requirements, and Windows packaging.", source: "content/engine/building-packaging.md" },
    { slug: "open-source/engine/extending", title: "Extending the Engine", description: "Add functionality, modules, importers, scripting APIs, and custom tooling.", source: "content/engine/extending.md" },
    { slug: "open-source/engine/troubleshooting", title: "Troubleshooting", description: "Diagnose build failures, graphics initialization, and runtime problems.", source: "content/engine/troubleshooting.md" },
    { slug: "open-source/engine/contributing", title: "Contributing", description: "Engine pull requests, coding standards, validation, and bug reports.", source: "content/engine/contributing.md" },
  ] },
  { label: "Docs", docs: [
    { slug: "open-source/docs", title: "Docs repository", description: "TypeScript and Next.js setup, source files, npm scripts, and developing your own documentation site.", source: "content/website.md" },
    { slug: "open-source/docs/overview", title: "Documentation Overview", description: "Documentation structure, reading paths, source loading, and catalog search.", source: "content/docs/overview.md" },
    { slug: "open-source/docs/local-setup", title: "Local Setup", description: "Run, build, check, and preview the documentation website locally.", source: "content/docs/local-setup.md" },
    { slug: "open-source/docs/folder-structure", title: "Folder Structure", description: "Where engine guides, contributor pages, generated APIs, and site code belong.", source: "content/docs/folder-structure.md" },
    { slug: "open-source/docs/writing-guidelines", title: "Writing Guidelines", description: "Supported Markdown, terminology, accuracy, and reproducible examples.", source: "content/docs/writing-guidelines.md" },
    { slug: "open-source/docs/adding-documentation", title: "Adding Documentation", description: "Create pages and sections, register routes, and verify publication.", source: "content/docs/adding-documentation.md" },
    { slug: "open-source/docs/editing-pages", title: "Editing Existing Pages", description: "Find authoritative sources and correct outdated information and links.", source: "content/docs/editing-pages.md" },
    { slug: "open-source/docs/code-examples", title: "Code Examples", description: "Standards for scripting API samples, setup, lifecycle, and expected results.", source: "content/docs/code-examples.md" },
    { slug: "open-source/docs/versioning", title: "Versioning", description: "Maintain compatibility notes and plan documentation for multiple engine versions.", source: "content/docs/versioning.md" },
    { slug: "open-source/docs/translations", title: "Translations", description: "Propose languages, review translations, and understand locale support needed.", source: "content/docs/translations.md" },
    { slug: "open-source/docs/contributing", title: "Contributing", description: "Submit and review documentation changes with the required website checks.", source: "content/docs/contributing.md" },
    { slug: "open-source/docs/documentation", title: "Writing documentation", description: "Add guides, maintain API pages, and make content searchable.", source: "content/documentation.md" },
    { slug: "open-source/docs/development", title: "Development & deployment", description: "Build, preview, and deploy the documentation website.", source: "README.md" },
  ] },
  { label: "Examples", docs: [
    { slug: "open-source/examples", title: "Examples repository", description: "Current sample repository status, prerequisites, and how to create your first example game.", source: "content/examples.md" },
  ] },
  { label: "Hosting SDK", docs: [
    { slug: "open-source/hosting-sdk", title: "Hosting SDK repository", description: "Public SDK scope, current source status, and starting points for a new implementation.", source: "content/hosting-sdk.md" },
  ] },
];

const sourceGroups = ["Open-Sourced Docs", "Engine source", "Docs", "Examples", "Hosting SDK"];
export const docSections = [
  { title: "Engine", href: "/docs/engine", groups: docGroups.filter((group) => !sourceGroups.includes(group.label)) },
  { title: "Open-Sourced Docs", href: "/docs/open-source", groups: docGroups.filter((group) => sourceGroups.includes(group.label)) },
];

export const docAliases: Record<string, string> = {
  "repositories": "open-source",
  "website": "open-source/docs",
  "website/documentation": "open-source/docs/documentation",
  "website/development": "open-source/docs/development",
  "examples": "open-source/examples",
  "hosting-sdk": "open-source/hosting-sdk",
};
export function resolveDocSlug(slug: string) { return docAliases[slug] ?? slug; }
export function canonicalDocPath(pathname: string) { return routeFor(resolveDocSlug(pathname.replace(/^\/docs\/?/, ""))); }

export const allDocs = docSections.flatMap((section) => section.groups.flatMap((group) => group.docs.map((doc) => ({ ...doc, group: group.label, project: section.title }))));
export function routeFor(slug: string) { return slug ? `/docs/${slug}` : "/docs"; }

export function projectForPath(pathname: string) {
  const canonicalPath = canonicalDocPath(pathname);
  return canonicalPath === "/docs/open-source" || canonicalPath.startsWith("/docs/open-source/") ? "Open-Sourced Docs" : "Engine";
}

export function searchRouteFor(project: string) {
  return project === "Open-Sourced Docs" ? "/docs/open-source/search" : "/docs/search";
}
