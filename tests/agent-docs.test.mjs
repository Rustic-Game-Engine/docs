import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { agentMarkdown } from "../lib/agent-markdown.ts";
import { load } from "../scripts/load-lib.mjs";

const { allDocs } = load("docs-catalog.ts");
const { readDoc } = load("docs.ts");
const siteUrl = "https://rustic-game-engine.pages.dev";
const exported = (pathname) => readFile(new URL(`../out/${pathname}`, import.meta.url), "utf8");

test("agent index and full text include every published document and all code examples", async () => {
  const index = await exported("llms.txt");
  const fullText = await exported("llms-full.txt");
  for (const doc of allDocs) {
    const pathname = `markdown/${doc.slug}.md`;
    assert.ok(index.includes(`${siteUrl}/${pathname}`), doc.slug);
    const markdown = await exported(pathname);
    const original = await readDoc(doc.source);
    assert.ok(fullText.includes(markdown.trim()), doc.slug);
    assert.deepEqual(markdown.match(/```[\s\S]*?```/g), original.match(/```[\s\S]*?```/g), doc.slug);
  }
});

test("Markdown links resolve source-relative links and canonical aliases without editing code", () => {
  const code = "```md\n[Lua](scriptingLua.md)\n```";
  const source = `[Lua](scriptingLua.md)\n[Alias](/docs/website#topics)\n[Home](/docs)\n[External](https://example.com)\n[Reference][lua]\n\n[lua]: scriptingLua.md\n\n${code}`;
  const markdown = agentMarkdown(source, "docs/Scripting/scriptingPython.md");
  assert.ok(markdown.includes(`[Lua](${siteUrl}/markdown/scripting/lua.md)`));
  assert.ok(markdown.includes(`[Alias](${siteUrl}/markdown/open-source/docs.md#topics)`));
  assert.ok(markdown.includes(`[Home](${siteUrl}/docs)`));
  assert.ok(markdown.includes("[External](https://example.com)"));
  assert.ok(markdown.includes(`[lua]: ${siteUrl}/markdown/scripting/lua.md`));
  assert.ok(markdown.includes(code));
});

test("every exported Markdown documentation link targets an exported file", async () => {
  const paths = new Set(allDocs.map((doc) => `markdown/${doc.slug}.md`));
  for (const pathname of paths) {
    const markdown = await exported(pathname);
    for (const match of markdown.matchAll(/https:\/\/rustic-game-engine\.pages\.dev\/(markdown\/[^\s)#]+\.md)/g)) {
      assert.ok(paths.has(match[1]), `${pathname}: ${match[1]}`);
    }
  }
});

test("HTML advertises plain text and Markdown and crawlers discover canonical pages", async () => {
  const html = await exported("docs/api/audio/stop-recording.html");
  assert.doesNotMatch(html, /<a\b[^>]*href="\/llms\.txt"/);
  assert.match(html, /<link[^>]+type="text\/markdown"[^>]+href="https:\/\/rustic-game-engine\.pages\.dev\/markdown\/api\/audio\/stop-recording\.md"/);
  assert.match(html, /<link[^>]+type="text\/plain"[^>]+href="https:\/\/rustic-game-engine\.pages\.dev\/llms\.txt"/);
  const sitemap = await exported("sitemap.xml");
  for (const doc of allDocs) assert.ok(sitemap.includes(`<loc>${siteUrl}/docs/${doc.slug}</loc>`), doc.slug);
  const robots = await exported("robots.txt");
  assert.match(robots, /User-Agent: \*\nAllow: \//);
  assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
  const headers = await exported("_headers");
  assert.match(headers, /\/markdown\/\*\n\s+Content-Type: text\/markdown; charset=utf-8/);
});
