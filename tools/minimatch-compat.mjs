import { createRequire } from "node:module";

// ESLint's React plugins still call minimatch's old CommonJS function export.
// Load this before the plugins in eslint.config.mjs, exposing that entry point
// while every match uses patched minimatch 11 (GHSA-g3hv-75wg-m249).
const loadCommonJs = createRequire(import.meta.url);
const filename = loadCommonJs.resolve("minimatch");
const modern = loadCommonJs(filename);
loadCommonJs.cache[filename].exports = Object.assign(modern.minimatch, modern);
