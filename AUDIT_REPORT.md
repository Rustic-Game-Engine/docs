# Documentation implementation report

## Completed improvements

- Reorganized Engine Documentation into eight task-oriented sections; renamed the other area **Open Source Development**. Preserved every pre-audit route and eight compatibility routes.
- Added requirements/downloads, first launch/project creation, practical editor manual, complete first-scene tutorial, scripting execution guide, systems index, publishing limitations, troubleshooting, feature/language/platform compatibility and independent version definitions.
- Verified public Windows pre-alpha release assets through GitHub. Clearly marked the examples and hosting-sdk repositories **Not Yet Implemented**; GitHub contents checks confirm each currently contains only LICENSE.
- Corrected every published Lua/Luau audio `Stop` callback example to `OnStop`, accidental PHP references, incorrect Programming menu paths, source-only setup prerequisites, outdated physics limits, and unsupported structured logging fields. Documented the Luau creation-menu omission and verified Explorer attachment workaround.
- Documented immediate Lua writes, deferred JavaScript/Web core commands, external SDK query flushes and lifecycle snapshot getters. C/C++ lifecycle samples now compile under the engine's warning-as-error policy.
- Qualified API function labels, retained complete module guides beneath API category indexes, and added shared compatibility, timing, errors and related-function context. Some individual references intentionally retain the original module-level parameter/return conventions; this is not a claim of generated per-binding typed declarations.
- Improved relative-link resolution, unique heading IDs, table scrolling/focus, copy error handling, keyboard skip links, mobile menu focus/escape/restoration, Docs v0.1 visibility and search filters for guides/tutorials/APIs. Preserved existing branding.
- Added source/route/Markdown integrity, exported internal route/fragment, snippet syntax, optional source corroboration, optional executable SDK lifecycle checks and reproducible browser smoke checks. CI now runs the independent checks; normal builds need no engine checkout.

## Files and routes

New user routes: `/docs/getting-started/installation`, `/docs/getting-started/create-project`, `/docs/editor/overview`, `/docs/guides/scripting`, `/docs/guides/systems`, `/docs/tutorials/first-game`, `/docs/building/publishing`, `/docs/troubleshooting`, `/docs/reference/compatibility`, `/docs/reference/versions`. Maintenance: `/docs/open-source/docs/maintenance`.

The contributor first-behavior route shares the same tutorial source. Existing `/docs/api/...` pages receive reference/navigation changes; category guides retain content/anchors. All previous published slugs remain in the export. The full file inventory follows below.

## Verified corrections and evidence

Reviewed engine commit `017db99b7025eeda96acf21967664153a2df0795` without changing engine files:

| Finding | Implementation evidence |
| --- | --- |
| OnStop / on_stop, not Stop | `engine-scripting/src/lua.rs`, `javascript.rs`, `sdk/rustic.luau` lifecycle dispatch |
| Immediate Lua transform/attribute/instance writes | `engine-play/src/script_runtime.rs` RuntimeHost and Lua host bindings |
| Deferred JS core writes / immediate gameplay queries | `engine-scripting/src/javascript.rs` command bridge, query host and callback drain |
| External query flush before evaluation | `engine-scripting/src/external_runtime.rs` query response loop and SDK query methods |
| API 1.1 with compatible 1.0 | `engine-scripting/src/model.rs` ScriptApiVersion |
| Luau host/discovery but omitted creation menu | `model.rs`, `apps/editor/src/main.rs`, Explorer Use Script As registration |
| Physics queries/forces versus missing collision events | `engine-play/src/script_runtime.rs`, `physics.rs`, gameplay physics modules |
| log has two parameters, no structured fields contract | Lua/JS bindings and actual C/C++/Python SDKs |
| C/C++ unused dt causes -Werror failure | Compiled the documented samples against actual SDK headers; corrected with `(void)dt` and reran successfully |
| Editor/menu/input controls, active camera orientation | `apps/project-manager/src/main.rs`, `apps/editor/src/main.rs` |
| Export commands absent; installer is an engine package | `tools/xtask`, Windows installer script/workflow |
| Audio capture and platform restrictions | Lua/Luau bindings, player audio/capture implementation and SDK method differences |

GitHub read-only checks confirmed Windows release tag `v0.5-Pre-Alpha`, its executable asset, active installer workflow and LICENSE-only public examples/hosting-sdk contents on 12 October 2026. No installation, deployment or native editor execution is claimed.

## Validation performed

| Command / check | Result |
| --- | --- |
| `npm ci` | Installed locked dependencies using Node 24 |
| `npm run lint -- --max-warnings=0` | Passed |
| `npm run build` | Passed; static export generated |
| `npx tsc --noEmit` | Passed |
| `npm audit --audit-level=moderate` | Passed; zero reported vulnerabilities |
| `npm test` | Passed, 24 tests including every pre-audit route export |
| `npm run check:api-examples` | Passed static coverage: 1,430 gameplay examples, core calls and eight callbacks in ten script types |
| `npm run check:docs` | Passed: 391 catalog pages, eight aliases, sources, parents, Markdown links/fragments and code fences |
| `npm run check:links` | Passed internal routes/fragments across 405 exported HTML pages |
| `npm run check:syntax -- --native` | Passed parsing: 654 JavaScript, 313 Python and 680 Lua snippets; not engine execution |
| `npm run check:engine-source -- /workspace/engine/Engine` | Passed optional source corroboration: lifecycle, API version, Luau and 31 easing constants |
| `npm run test:sdk-lifecycle -- /workspace/engine/Engine` | Passed actual C/C++ SDK compilation with warning-as-error flags and C/C++/Python eight-callback protocol dispatch |
| `python3 scripts/check-browser.py http://127.0.0.1:4173` | Chromium desktop/mobile pages, search filters, code copying, deep links, focus handling, themes and overflow checks passed; no page errors |
| `git diff --check` | Passed |

Native SDK checks use protocol fixtures. Browser checks exercise the documentation website. Neither proves the complete native game tutorial or every platform/language/API works end-to-end.

## Remaining limitations and future work

- Native editor/gameplay, Windows installer, microphone hardware and OS qualification were not executed in this environment. No fabricated editor screenshots or benchmark claims were added.
- All-language API coverage is static; C#/Java/PHP/Luau runtime execution and exhaustive individual API semantics still need adapter/toolchain tests. Preserve module conventions until richer per-binding signature metadata exists.
- A complete visual scene creation/switching workflow, mesh Boolean/separation tools, collision/touch callbacks, browser DOM/UI rendering, wider input forwarding and game export are not implemented as the requested complete workflows. Documentation now states their boundaries instead of inventing UI actions or APIs.
- The public examples and hosting SDK remain undeveloped. Future runnable examples need release/revision prerequisites and licensed assets; a hosting SDK needs an implemented protocol before installation/endpoints can be documented.
- Website guides are independently maintained copies of engine-local documentation. The maintenance guide defines source authority and companion-update steps; synchronization is deliberately not an automatic overwrite.
- Build, CI and a reviewable pull request are provided; no website deployment or merge is performed.

## Changed file inventory

- `.github/workflows/quality.yml`
- `AUDIT_REPORT.md`
- `README.md`
- `app/docs/open-source/search/page.tsx`
- `app/globals.css`
- `app/not-found.tsx`
- `components/docs-landing.tsx`
- `components/docs-search.tsx`
- `components/docs-shell.tsx`
- `components/repository-cards.tsx`
- `components/site-frame.tsx`
- `content/docs/maintenance.md`
- `content/docs/overview.md`
- `content/docs/versioning.md`
- `content/documentation.md`
- `content/engine-source/build-a-first-gameplay-behavior.md`
- `content/engine.md`
- `content/engine/scripting-architecture.md`
- `content/examples.md`
- `content/hosting-sdk.md`
- `content/repositories.md`
- `content/user/compatibility.md`
- `content/user/create-project.md`
- `content/user/editor.md`
- `content/user/first-game.md`
- `content/user/installation.md`
- `content/user/publishing.md`
- `content/user/scripting.md`
- `content/user/systems.md`
- `content/user/troubleshooting.md`
- `content/user/versions.md`
- `content/website.md`
- `docs/GAMEPLAY_PROGRAMMING/project-layout-and-ownership.md`
- `docs/PHYSICS.md`
- `docs/Scripting/API/audio.md`
- `docs/Scripting/README.md`
- `docs/Scripting/gameplayActions/audio.md`
- `docs/Scripting/gameplayActions/setup.md`
- `docs/Scripting/sceneObjects.md`
- `docs/Scripting/scriptingC.md`
- `docs/Scripting/scriptingC/setup-and-attachment.md`
- `docs/Scripting/scriptingCSharp.md`
- `docs/Scripting/scriptingCSharp/setup-and-attachment.md`
- `docs/Scripting/scriptingJava.md`
- `docs/Scripting/scriptingJava/setup-and-attachment.md`
- `docs/Scripting/scriptingLua.md`
- `docs/Scripting/scriptingLua/module-and-callbacks.md`
- `docs/Scripting/scriptingLuau/setup-and-attachment.md`
- `docs/Scripting/scriptingPHP.md`
- `docs/Scripting/scriptingPHP/setup-and-attachment.md`
- `docs/Scripting/scriptingPython.md`
- `docs/Scripting/scriptingPython/setup-and-attachment.md`
- `lib/api-docs.ts`
- `lib/api-reference-markdown.ts`
- `lib/api-reference.ts`
- `lib/docs-catalog.ts`
- `lib/docs-markdown.ts`
- `lib/docs.ts`
- `package.json`
- `scripts/check-browser.py`
- `scripts/check-docs.mjs`
- `scripts/check-engine-source.mjs`
- `scripts/check-links.mjs`
- `scripts/check-native-snippet-syntax.py`
- `scripts/check-sdk-lifecycle.mjs`
- `scripts/check-snippet-syntax.mjs`
- `scripts/load-lib.mjs`
- `tests/docs-integrity.test.mjs`
- `tests/fixtures/legacy-routes.json`
