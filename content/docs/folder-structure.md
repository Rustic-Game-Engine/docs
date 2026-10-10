# Folder Structure

Choose a source by audience and content type. The website reads from its own repository and must continue building without a sibling engine checkout.

## Content locations

| Location | Content | Example |
| --- | --- | --- |
| `docs/` | Published engine guides and scripting documentation | `docs/GAMEPLAY_PROGRAMMING.md` |
| `docs/Scripting/` | Language and gameplay tutorials | `docs/Scripting/scriptingLua.md` |
| `docs/Scripting/API/` | Detailed gameplay API guides | `docs/Scripting/API/tween.md` |
| `docs/decisions/` | Imported engine architecture records | Adapter decisions and rationale |
| `content/` | Repository overviews and website/contributor guides | `content/engine-source.md` |
| `content/engine/` | Engine source-development chapters | `content/engine/scene-system.md` |
| `content/docs/` | Documentation-site contributor chapters | `content/docs/writing-guidelines.md` |
| `lib/api-docs.ts` | Generated API reference Markdown | Catalog sources beginning with `api:` |
| `README.md` | Website development and deployment reference | Production static export setup |

## Website implementation

`lib/docs-catalog.ts` owns routes and group order. `lib/docs.ts` loads sources. `app/` owns Next.js routes, metadata, and global CSS. `components/` owns shared navigation, Markdown presentation, repository cards, and search. `public/` contains static website assets; `.github/workflows/` contains quality and deployment automation.

`node_modules/`, `.next/`, `out/`, and TypeScript build-info files are local/generated output and stay out of Git. Do not place new guides in the export directory; a rebuild replaces it.

## Engine-local copies

The engine repository retains `Engine/docs/`. A user-visible engine change can require updates there and in this website's `docs/`. The original import commit is recorded in the README; the website does not automatically read the latest engine source at build time.

A file is published only after registration in the catalog. Follow [Adding Documentation](/docs/open-source/docs/adding-documentation) and keep repository-relative source paths distinct from public `/docs/...` URLs.
