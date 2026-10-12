# Rustic documentation: second improvement pass

Implemented in the docs repository only, against engine commit
`017db99b7025eeda96acf21967664153a2df0795`. No engine functionality changed;
no new engine release or server runtime is required. Cloudflare Pages continues
to deploy the Next.js static export. Typography, colors, themes and edition
label (Docs v0.1) remain in place.

## Implemented changes

- Added an editor entry point and six focused guides: hierarchy, Explorer/assets,
  Inspector, viewport/tools, cameras/lighting/environment, and Play/debugging.
  Each includes prerequisites, verified steps, expected behavior, limits and links.
  Added a first playable scene tutorial and beginner entry links.
- Replaced the custom Markdown parser with React Markdown/remark and GFM. Nested
  lists, emphasis, escapes, tables, images/captions, blockquotes, task lists and
  malformed input now follow an established parser. Raw HTML is discarded and
  URLs pass the renderer's safe-protocol transform. Highlighting and copy buttons
  remain; failed clipboard writes show a useful message.
- Added shared, keyboard-accessible language tabs for all ten existing script
  types. Browser storage preserves selection; memory works when storage is denied.
  Show All Languages, support notices, language-specific content, narrow-screen
  scrolling, deterministic SSR, refresh/navigation and heading deep links work.
  Hidden examples remain in the static HTML and full Markdown search index.
- Unified parsed heading anchors and TOC, disambiguated duplicate IDs and excluded
  fenced headings. Kept existing simple heading IDs. Removed language-tab headings
  from TOC clutter while retaining their deep links.
- Added tutorial/guide/API search filters and alternate language spellings;
  API labels retain receivers. Previous/next navigation stays within a group.
  Mobile navigation now traps focus, restores it when dismissed, and hides closed
  drawer controls from keyboard navigation.
- Consolidated unimplemented examples/hosting SDK documentation into concise
  overviews. Removed ten repetitive source pages; preserved their routes as aliases
  and retained topic headings for fragment compatibility. Engine/docs contributor
  sections remain detailed.
- Added static route/alias/parent/link/anchor checks; Markdown/security/regression
  tests; Chromium desktop/tablet/mobile tests; CI browser diagnostics artifacts.
- Preserved existing API example checks and added JS/Python/Lua/Luau/PHP syntax
  tooling plus opt-in C/C++/Java/C# compilation using the actual engine SDKs.
- Added a reviewed signature/language baseline and scheduled/manual source-drift
  review workflow covering 23 adapter, SDK, lifecycle, gameplay and platform files.
  Declaration hints identify additions/removals; source hashes flag dynamic API
  changes. Ordinary builds still work without the engine repository.
- Documented validation levels, source ownership, baseline review, tab authoring
  and genuine screenshot requirements for contributors.

## Important files and routes

| Area | Files |
| --- | --- |
| Renderer and language tabs | `components/markdown.tsx`, `components/language-tabs.tsx`, `lib/markdown-model.ts`, `lib/script-languages.ts` |
| Navigation/search/reference | `components/docs-shell.tsx`, `components/site-frame.tsx`, `components/docs-search.tsx`, `lib/docs-catalog.ts`, `lib/docs.ts`, `lib/docs-search.ts`, `lib/api-reference*.ts` |
| Guides | `content/editor.md`, `content/editor/*.md`, `content/tutorials/first-playable-scene.md`, `content/docs/validation.md` |
| Consolidation/status corrections | `content/examples.md`, `content/hosting-sdk.md`, `docs/Scripting/scriptingWeb*.md`, `docs/Scripting/scriptingWeb/html-behavior.md` |
| Audio callback corrections | `lib/api-reference-markdown.ts`, `docs/Scripting/API/audio.md`, `docs/Scripting/gameplayActions/audio.md` |
| Validation and CI | `scripts/check-docs.mts`, `scripts/check-example-syntax.mjs`, `scripts/check-engine-drift.mjs`, `lib/engine-api-baseline.json`, `playwright.config.ts`, `tests/`, `.github/workflows/{quality,engine-drift}.yml` |

New public entries: `/docs/guides/editor` and its six workflow pages,
`/docs/tutorials/first-playable-scene`, and `/docs/open-source/docs/validation`.
Existing canonical API routes and consolidated repository-topic URLs remain valid.

## Documentation corrections

- Recording/hot-mic cleanup snippets used the unbound `Stop` callback. Corrected
  them to `OnStop`, matching Lua/Luau lifecycle dispatch, and added a regression
  check. No engine behavior was changed.
- HTML/CSS game UI is explicitly **planned**, rather than permanently unsupported.
  Current structural validation and JavaScript behavior are separate from future
  layout/rendering. Added missing OnCreate/OnStop lifecycle names to the Web guide.
- Preserved implemented linked-script support: player preprocessing resolves
  quoted src paths relative to the HTML file; absolute paths and `..` are rejected.
- Restored shared API category guidance so audio-format deep links resolve.
- Clarified that Explorer moves do not repair references/metadata, Can touch is
  reserved, Inspector properties are stored component values, and no verified
  editor scene-delete or inline asset-rename control exists in this revision.
- Examples/hosting SDK checkouts contain only Apache 2.0 LICENSE files; this is
  intentional, with no invented APIs, implementation language or packages.

## Executed validation

| Command | Actual result |
| --- | --- |
| `npm ci` | Passed with the final lockfile; existing package versions unchanged |
| `npm run lint -- --max-warnings=0` | Passed |
| `npx tsc --noEmit` | Passed |
| `npm run build` | Passed; 403 static pages generated |
| `npm test` | 25 tests passed |
| `npm run check:docs` | 379 canonical pages, 18 aliases and 1,465 internal links/anchors passed, including exported heading IDs |
| `npm run check:api-examples` | 1,430 gameplay examples plus core calls/eight lifecycle callbacks in ten languages passed |
| `npm run check:syntax -- --engine /workspace/engine/Engine` with temporary Lua/Luau tools on PATH | JS/inline JS: 310 syntax checks; Python: 155 AST checks; Lua 5.4: 175 syntax checks; Luau: 164 syntax checks; C: 155 and C++: 155 SDK declaration compilation checks passed |
| `npm run check:engine-drift` and engine-backed comparison | Baseline matched: 23 source inputs, 168 signatures, ten language labels |
| `npm audit --audit-level=moderate` | Passed; zero vulnerabilities |
| `git diff --check` | Passed |

Lua 5.4.8 and Luau commit `8387cfb461b38ce09e37c1e4c2811538ef1bf5cb`
were built in temporary directories solely to run syntax checks. These do not
prove behavior in the engine's specific runtime build. C17/C++20 checks compile
without linking or executing; Python/JS checks do not resolve SDK calls.

## Browser validation

`npm run test:browser` executed against the production static export in Chromium:
16 tests passed, with two intentional skips for mobile-only drawer tests in the
desktop/tablet projects. Verified representative home/engine/open-source/tutorial/
editor/category/function pages, responsive widths, themes, breadcrumbs, language
switching and navigation/refresh persistence, unavailable-language notices,
comparison mode, keyboard focus, deep links, clipboard copying, hidden-language
search, filters, storage denial and mobile navigation. Failures retain real browser
screenshots/traces; no fictional native-editor screenshots were created.

The first run exposed a test attempting to click the intentionally hidden narrow-
screen TOC; the test now verifies deep links directly there. An intermediate link
check ran during an export rebuild and encountered an incomplete output file;
the final check ran after the build and passed. No remote CI outcome is claimed.

## Remaining limitations and future work

- Native editor screenshots/annotations are unavailable: no desktop display or
  runnable native editor binary was provided. Responsive image/caption support
  is implemented with no misleading placeholders. Capture genuine Inspector,
  Explorer, hierarchy, viewport and attachment workflows on a supported desktop.
- PHP, Java and C# validation tools are not installed in this environment. Their
  conditional validation paths are implemented but were not executed locally.
  Quality CI installs Lua/PHP; the engine-review workflow attempts SDK compilation
  with available hosted-runner tools. Luau syntax runs when luau-compile is present.
- No gameplay example was executed in the engine, and no native device/Windows
  microphone behavior was tested. Add representative engine adapter fixtures when
  their runtimes/devices are available; do not equate syntax with runtime coverage.
- Source drift detection is deliberately conservative: private changes can flag
  review, and candidate declaration extraction is not a full cross-language API
  parser. Reviewed source diffs and SDK compilation remain necessary.
- Browser coverage is Chromium only; hosted CI jobs and deployed-site validation
  have not been executed in this task. Run the new workflow before merging.
- HTML/CSS rendering guides and screenshots should expand when the planned game
  UI renderer exists. Likewise, add repository-specific example/hosting SDK guides
  only when implementations are published.

## Integration with current main

Merged docs main `0657761cc3b0fc8611275435af149e30f6bacddb` into this PR.
Retained its installation/user journey, entity-service documentation, skip link,
mobile focus/scroll handling, compatibility notes, source/lifecycle checks and
legacy-route tests. Focused editor guides now appear in Editor Manual, and both
beginner tutorial routes remain reachable. Both syntax-check paths and their
optional flags are preserved through a small shared command runner. Relative
links use main's unambiguous source resolver with the renderer's safe URL filter;
reference tables retain keyboard access and column-header semantics.

Merged validation: production export (434 pages), 32 tests, 410 canonical pages,
18 aliases, 3,103 internal links/anchors, all exported links, 1,600 gameplay
examples, lint, TypeScript and zero-vulnerability audit passed. Chromium passed
16 tests with two intentional mobile-only skips, including the retained skip
link. The search regression test accepts both legitimate beginner tutorials.

The reviewed source baseline includes engine PR #30 at
`efc834d838780dc955ac9a4fe5925a972f27b5ff`, which implements the entity services
already documented on docs main. That engine PR was still open during validation;
no engine PR was merged or modified. Source corroboration, C/C++/Python lifecycle
SDK protocol fixtures and C/C++ declaration compilation passed against it.
The fixtures execute SDK dispatch, not native Play. Syntax checks covered all
published snippets via the retained main checker (399 JS, 194 Python, 493 Lua)
and generated examples via the shared checker (344 JS/inline JS, 172 Python,
192 Lua, 181 Luau); 172 C and 172 C++ examples compiled against the actual SDK.
PHP/Java/C# tools remain unavailable locally. The scheduled source-drift job will
correctly request review while engine main lacks the companion implementation.

Main's newly added UI status text also retains this pass's distinction between
planned HTML/CSS game UI and currently unimplemented layout. The Explorer move
warning and entity-service setup use the verified editor controls.

## CI syntax and browser setup corrections

CI exposed an opening-tag bug in the PHP validator: it prepended `<?php` to
complete lifecycle examples that already contained that tag. The validator now
preserves full files and wraps only fragments; regression tests use the actual
published lifecycle example and a fragment containing a tag inside a string.
All 172 PHP snippets passed `php -l` locally with a temporary Debian PHP 8.4.24
binary. This verifies syntax, not PHP engine execution. The local test suite now
has 34 passing tests; lint, build, TypeScript and the dependency audit passed.

The initial syntax failure also skipped Chromium installation while the browser
tests continued. Browser setup now runs unless cancelled, and the tests require
successful setup. This retains independent browser validation after another
check fails without producing missing-executable errors.
