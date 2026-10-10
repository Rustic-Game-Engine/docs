# Source map and good starting points

[Back to Docs repository](/docs/open-source/docs).

| File or directory | What it controls | A good first change |
| --- | --- | --- |
| [app/page.tsx](https://github.com/Rustic-Game-Engine/docs/blob/main/app/page.tsx), `components/docs-landing.tsx` | Welcome page and repository cards | Explain your project and link its guides |
| `app/layout.tsx`, `public/favicon.svg` | Site metadata, fonts, and identity | Update the title, description, and icon |
| `app/globals.css` | Colors, typography, article layouts, mobile behavior | Adjust a design token and check desktop/mobile |
| [lib/docs-catalog.ts](https://github.com/Rustic-Game-Engine/docs/blob/main/lib/docs-catalog.ts) | Page slugs, descriptions, repository groups, navigation, and search index | Register a new guide |
| `docs/`, `content/` | Engine guides and repository/contributor guides | Improve setup steps or add a focused tutorial |
| [lib/docs.ts](https://github.com/Rustic-Game-Engine/docs/blob/main/lib/docs.ts) | Finds catalog entries and loads Markdown or generated API text | Understand the build-time source flow |
| `lib/api-docs.ts` | Generates the API reference Markdown | Correct a behavior description against the engine |
| `app/docs/[[...slug]]/page.tsx` | Static documentation routes and page metadata | Understand how catalog entries become exported pages |
| `components/site-frame.tsx` | Shared header, repository navigation, theme, and mobile menu | Improve navigation or accessibility |
| `components/docs-shell.tsx` | Markdown rendering, code copying, table of contents, and pagination | Check how supported Markdown is displayed |
| `components/docs-search.tsx` | Browser-side catalog search and results | Improve search descriptions or presentation |

Guides are rendered by a small custom Markdown renderer. Use its supported headings, lists, links, code fences, blockquotes, and tables; raw HTML and arbitrary MDX components are not part of the documented content format. See [Writing documentation](/docs/open-source/docs/documentation) for a complete page-entry example.
