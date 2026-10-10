# Translations

The current documentation set is English. The site does not yet have locale-aware routing, a language selector, or a translation synchronization workflow. Contributors can propose translations, but publishing another language requires both translated sources and website support.

## Prepare a translation contribution

Choose a small, useful guide and identify the English source plus its commit. Open a docs issue describing the target language, scope, and review help available. Agree on source locations and public routes before adding a whole translated catalog.

Translate explanatory prose while preserving API identifiers, callback names, commands, file paths, and code syntax. Preserve link destinations until localized equivalents exist. Use consistent terminology for engine, editor, runtime, scene, and component; explain English UI labels when the application still displays them.

## Publication work required

A locale-prefixed source/slug layout is a possible design, not an implemented convention. Website work must include catalog grouping, locale-aware navigation and pagination, metadata, search labels, fallback behavior, and a discoverable language choice. `app/layout.tsx` currently declares English; published translated pages need appropriate language metadata. Test fonts, line wrapping, and right-to-left layout when relevant.

Do not copy translated files into `out/`: builds replace that directory. Register sources through the catalog once a supported route design is in place. See [Folder Structure](/docs/open-source/docs/folder-structure) and [Adding Documentation](/docs/open-source/docs/adding-documentation).

## Keep translations current

Record the source revision in contribution tracking, ask a fluent reviewer to check meaning and technical accuracy, and update translations when the English behavior changes. Mark stale content clearly if updates cannot be made immediately. Review translated examples against the same engine implementation and preserve current limitations rather than translating older inaccurate claims.

Submit a focused PR that explains the language, source revision, review performed, and any website support still needed. See [Contributing](/docs/open-source/docs/contributing).
