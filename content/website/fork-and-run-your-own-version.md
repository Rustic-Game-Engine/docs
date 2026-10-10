# Fork and run your own version

[Back to Docs repository](/docs/open-source/docs).

Fork the repository on GitHub, replace `YOUR_ACCOUNT`, then run:

```sh
git clone https://github.com/YOUR_ACCOUNT/docs.git
cd docs
git switch -c my-docs-change
node --version
npm ci
npm run dev
```

Open the local URL printed by Next.js, normally `http://localhost:3000`. Both `/` and `/docs` show the welcome page. `npm ci` uses the committed lockfile so your dependencies match CI.

For a first customization, change a repository guide in `content/` and reload its page. Then update the landing page copy, colors in `app/globals.css`, and the catalog as needed. Keep a new site's project name, GitHub links, metadata, favicon, and deployment target consistent with your fork.
