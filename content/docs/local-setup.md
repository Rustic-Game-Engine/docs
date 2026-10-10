# Local Setup

Use Node.js 24, npm, Git, and a modern browser. Run every npm command from the docs repository root. Local development needs no engine installation or deployment token.

## Clone and start

Fork first if you will contribute, then replace `YOUR_ACCOUNT`:

```sh
git clone https://github.com/YOUR_ACCOUNT/docs.git
cd docs
git switch -c my-documentation-change
node --version
npm ci
npm run dev
```

Open the URL printed by Next.js, normally `http://localhost:3000`. Visit `/docs/open-source` and the guide you are editing. `npm ci` installs the locked dependency tree; do not remove the lockfile to work around an installation problem.

## Build and preview

```sh
npm run lint -- --max-warnings=0
npm run build
npx tsc --noEmit
npm audit --audit-level=moderate
```

The build creates static HTML/browser assets in `out/` and generates route types. Run the standalone TypeScript check after the build. Build-time Google font loading needs access to the configured font services.

To serve the exported files locally, from the repository root run:

```sh
npx --yes http-server out -p 3000
```

Stop the development server first or choose another port. This previews files without deployment credentials. The existing README also documents a Cloudflare Pages preview. `npm run start` invokes `next start`, which does not serve this static-export configuration.

## Common setup problems

Confirm Node.js 24 when dependency installation fails. A missing source file usually means a catalog path is incorrect; paths are relative to the repository root. A missing generated `PageProps` type needs a build before type checking. A font-download failure is a build-network problem rather than a missing Markdown page.

Check a deep route, navigation, search, and an unknown-page response in the exported preview. See [Development & deployment](/docs/open-source/docs/development) for production configuration.
