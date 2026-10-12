# Documentation validation and engine synchronisation

**Docs v0.1** describes multiple Script API versions; its edition is not an engine release. Run commands from the docs repository with Node.js 24. Ordinary builds and checks need no engine checkout.

## Site and browser checks

```sh
npm ci
npm run lint -- --max-warnings=0
npm run check:api-examples
npm run check:syntax
npm run check:engine-drift
npm run build
npm test
npm run check:docs
npx tsc --noEmit
npm audit --audit-level=moderate
npx playwright install --with-deps chromium
npm run test:browser
```

Build before `npm test` and `check:docs`: reference/export tests inspect `out/`. Browser tests serve the **static export**, not a Next.js server. The quality workflow checks desktop (1440×1000), tablet (820×1180) and mobile (390×844) with Chromium. Failures retain screenshots, traces and an HTML report in GitHub Actions artifacts. Report results actually executed; adding a CI step is not evidence that a remote CI run passed.

The Markdown tests cover nested CommonMark/GFM, malformed input, raw HTML and URL safety, images/captions, heading IDs, internal links and language-section grouping. Export checks validate canonical routes, aliases, parent relationships and internal anchors. Raw HTML is discarded; do not enable executable HTML to implement a documentation widget.

## What example checks establish

| Check | Evidence | Does not establish |
| --- | --- | --- |
| `check:api-examples` | Existing coverage, callback naming and source-preservation checks for ten languages | Runtime success |
| `check:syntax` | JS parsing (including inline Web JS), Python AST parsing; Lua/Luau/PHP syntax when their tooling is installed | Engine host behavior or optional SDK typing |
| `check:syntax -- --engine /path/to/engine/Engine` | C17/C++20 declaration compilation against real engine headers; Java/C# SDK compilation when javac/dotnet is available | Linking, device access or engine execution |
| `check:engine-drift` | Documented signature/language inventory matches the reviewed snapshot | Current remote engine compatibility |
| `check:engine-drift -- --engine /path/to/engine/Engine` | Reviewed adapter/SDK/lifecycle/platform source inputs match, or a review report identifies changes | Every detected source change is a breaking public API change |

Missing optional tools print explicit **SKIP** lines. C/C++ batches preserve snippet labels in compiler diagnostics and compile lifecycle registration separately. Java/C# check callback coverage separately through `check:api-examples`; their compile batches cover API snippets. No check in this repository executes gameplay in the engine. Use the actual engine adapter/runtime test suites for that evidence and describe it separately.

## Review source drift

The authoritative runtime and SDK declarations live in `engine/Engine/crates/engine-scripting/`; scene/gameplay behavior lives in engine-core/engine-play. Published Markdown lives in this repository's `docs/` and `content/`; generated reference definitions/examples live in `lib/api-docs.ts`, `lib/api-reference.ts` and `lib/api-example-data.json`. Navigation is `lib/docs-catalog.ts`. Engine-local docs are a useful reference but are not the site's content source.

The scheduled/manual **Engine API drift review** workflow checks the latest engine default branch against `lib/engine-api-baseline.json`, then attempts available SDK compilation. It is separate from ordinary documentation CI. The baseline records a reviewed engine commit, documented signatures/languages and hashes of adapter, SDK, callback, gameplay and platform-support inputs. Candidate declarations provide additions/removals for review; hashes also flag dynamically constructed APIs and platform guards. Internal-only changes can trigger review too. Overloads, dynamic aliases and required parameters are not inferred from regexes; compiler checks provide reliable parameter checks where available.

After inspecting a drift report:

1. Review new/removed/renamed methods, signatures, callbacks, languages and platform support against the source and relevant runtime tests.
2. Correct affected examples, support notes and guides. Do not replace authored documentation with generated prose.
3. Run available checks and record any untested adapters or devices.
4. Explicitly refresh the reviewed baseline:

```sh
npm run check:engine-drift -- --engine /path/to/engine/Engine --record-reviewed
```

Commit the reviewed baseline with the documentation changes. Do not refresh it simply to suppress a failure. The initial baseline references engine commit `017db99b7025eeda96acf21967664153a2df0795`.

## Language tabs and visuals

Use consecutive language headings matching the existing ten labels, followed by original fenced examples and language-specific warnings. The renderer groups parsed sections into shared accessible tabs, retains hidden content, and remembers the preference where storage works. Shared prerequisites stay above the tabs. A language without a section gets a support notice; do not invent an equivalent. **Show All Languages** supports comparison; language heading deep links reveal the relevant section. Search indexes complete Markdown, including hidden examples.

Use real editor screenshots only. Store optimised images in `public/` and use a descriptive alt text and Markdown title for a caption:

```markdown
![Describe the actual panel and highlighted control](/images/verified-editor.webp "Describe the demonstrated action and editor revision")
```

This is an authoring syntax example, not a supplied screenshot asset. Images render responsively with lazy loading and captions in both themes. No native-editor screenshots are included in this pass: the cloud workspace has source but no runnable editor binary or desktop capture session. Capture and annotate genuine Inspector, Explorer, hierarchy, viewport and attachment workflows on a supported desktop before adding assets. Avoid invented UI and placeholder images.
