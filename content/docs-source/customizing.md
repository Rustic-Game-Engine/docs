# Customize your documentation fork

Create your own version of the docs website while preserving a working static build, usable navigation, and responsive article layouts. Start with [repository setup](/docs/open-source/docs) and [the architecture guide](/docs/open-source/docs/architecture).

## Establish a small baseline

Before changing branding, run `npm ci` and `npm run build` on the existing checkout. This separates pre-existing environment failures from problems introduced by your edits. Create a branch and keep the first change small enough to review as one coherent result.

```sh
git switch -c customize-docs
npm ci
npm run dev
```

Open the printed local URL and choose representative pages: the welcome page, Open-Sourced Docs, an engine usage article, a code-heavy article, and search.

## Update identity in the right places

| File | What to change |
| --- | --- |
| `app/layout.tsx` | Site-wide metadata, description, fonts, and icon configuration |
| `public/favicon.svg` | Browser icon |
| `components/site-frame.tsx` | Header identity and repository link |
| `components/docs-landing.tsx` | Welcome copy, main paths, and footer |
| `components/repository-cards.tsx` | Source repository cards and canonical article links |
| `content/` | Guides describing your own project and setup |

Update the real destinations as well as visible names. Changing a card label while leaving it pointed at an unrelated upstream guide creates a misleading experience. Keep license and attribution requirements intact when reusing the source.

## Adjust colors and type

`app/globals.css` defines paper, surface, ink, muted text, borders, rust accent, blue links, and yellow section numbers. Start with those variables rather than replacing every component's styles.

The `.site.dark` scope supplies dark-theme values. Check your changes in both themes; a light background color that looks good alone can make code labels or links unreadable in dark mode. Font variables are configured in `app/layout.tsx` and used by the body and monospaced elements.

Change spacing and sizes while checking the narrowest intended viewport. Long repository titles, breadcrumbs, tables, and fenced code are different overflow cases; a short welcome heading alone does not exercise them all.

## Preserve the two documentation purposes

Engine usage pages teach people to make games. Open-Sourced Docs teaches developers to work on repositories, including the engine implementation. Keep those as separate sections when editing `docGroups` and `docSections`.

Descriptions, groups, and section names feed search. Canonical slugs feed article URLs, metadata, and previous/next links. If you move an already-published page, maintain its old slug through `docAliases` and generate both routes while linking to the canonical one.

For a new guide, follow [Adding a page](/docs/open-source/docs/adding-pages) rather than creating a standalone page that bypasses catalog navigation.

## Check interaction and accessibility

Check visible keyboard focus on links/buttons, descriptive icon-button labels, the mobile menu's open/close state, and Escape behavior. Test search with a matching query and an empty result. Copy a code block over a secure context where browser clipboard access is available.

Honor reduced-motion styles and avoid placing a fixed element inside a container that unexpectedly changes its positioning. The mobile header deliberately removes its backdrop filter so the fixed search trigger does not overlap header controls.

## Deploy your fork independently

Use your own Cloudflare Pages project/account or another static host. Replace the deployment workflow's upstream destination, configure your own repository secrets, and deploy `out/`. A source fork should not publish to Rustic's production project.

After publishing, check the site's main URL and deep links, not just a deployment-success message. Follow [Testing and deployment](/docs/open-source/docs/testing-deployment) for the full checks and troubleshooting.
