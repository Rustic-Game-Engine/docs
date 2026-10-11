import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { apiCategories } from "../lib/api-reference.ts";
import { buildApiMarkdown } from "../lib/api-docs.ts";
import { buildApiCallMarkdown, buildApiCategoryMarkdown } from "../lib/api-reference-markdown.ts";

const calls = apiCategories.flatMap((category) => category.calls);

test("API routes are unique, nested under their category, and contain valid signatures", () => {
  assert.equal(new Set(calls.map((call) => call.slug)).size, calls.length);
  for (const category of apiCategories) {
    for (const call of category.calls) {
      assert.ok(call.slug.startsWith(`${category.slug}/`));
      assert.match(call.signature, /^[\w.:]+(?:\([^()]*\))?$/);
    }
  }
  assert.ok(calls.some((call) => call.slug === "api/audio/play"));
  assert.ok(calls.some((call) => call.slug === "api/sequence/timeline-new"));
  assert.equal(apiCategories.find((category) => category.slug === "api/ease").calls.length, 31);
});

test("audio device methods have searchable routes and accurate device reference pages", async () => {
  const category = apiCategories.find((entry) => entry.slug === "api/audio");
  const shared = await readFile(new URL(`../${category.source}`, import.meta.url), "utf8");
  for (const method of ["get_output_devices", "get_input_devices", "set_output_device", "set_input_device"]) {
    const slug = `api/audio/${method.replaceAll("_", "-")}`;
    const call = category.calls.find((entry) => entry.slug === slug);
    assert.ok(call, `${method} must be registered for navigation, search and export`);
    const markdown = buildApiCallMarkdown(category, call, "Audio", shared);
    assert.ok(markdown.includes(`Audio.${method}(`));
    assert.match(markdown, /Windows/);
    assert.match(markdown, /snapshot/i);
    assert.match(markdown, method.startsWith("get") ? /Returns a list of device records/ : /Returns no value/);
    assert.doesNotMatch(markdown, /Updates the voice playback directly/);
  }
});

test("category indexes link every API and call pages expose exactly one signature", async () => {
  for (const category of apiCategories) {
    const index = buildApiCategoryMarkdown(category, "Category", "Description");
    assert.ok(!index.includes("## Calls"));
    const shared = category.source.startsWith("api:")
      ? buildApiMarkdown(category.source.slice(4))
      : await readFile(new URL(`../${category.source}`, import.meta.url), "utf8");
    for (const call of category.calls) {
      assert.ok(index.includes(`](/docs/${call.slug})`));
      const markdown = buildApiCallMarkdown(category, call, "Category", shared);
      assert.equal(markdown.match(/^## Signature$/gm)?.length, 1);
      assert.ok(markdown.includes(`\`${call.signature}\``));
      assert.ok(!markdown.includes("## Calls"));
      assert.ok(!/\| undefined \||\nundefined(?:\n|$)/.test(markdown), call.slug);
    }
  }
});

test("static export publishes every category and call with the category breadcrumb", async () => {
  const search = await readFile(new URL("../out/docs/search.html", import.meta.url), "utf8");
  for (const category of apiCategories) {
    const index = await readFile(new URL(`../out/docs/${category.slug}.html`, import.meta.url), "utf8");
    for (const call of category.calls) {
      assert.ok(index.includes(`href="/docs/${call.slug}"`), call.slug);
      assert.ok(search.includes(`href="/docs/${call.slug}"`), call.slug);
      const page = await readFile(new URL(`../out/docs/${call.slug}.html`, import.meta.url), "utf8");
      const article = page.match(/<article class="markdown">([\s\S]*?)<\/article>/)?.[1];
      assert.ok(article?.includes(call.title), call.slug);
      assert.equal(article.match(/<h2 id="signature">/g)?.length, 1, call.slug);
      assert.ok(page.match(/<div class="breadcrumbs">([\s\S]*?)<\/div>/)?.[1].includes(`href="/docs/${category.slug}"`), call.slug);
    }
  }
  for (const alias of ["identity", "frame-time"]) {
    const page = await readFile(new URL(`../out/docs/api/entity/${alias}.html`, import.meta.url), "utf8");
    assert.match(page, /rel="canonical"/);
  }
});


test("recording and hot mic APIs are registered and publish Lua/Luau usage", async () => {
  const category = apiCategories.find((entry) => entry.slug === "api/audio");
  const shared = await readFile(new URL(`../${category.source}`, import.meta.url), "utf8");
  for (const slug of ["start-recording", "stop-recording", "start-hot-mic", "stop-hot-mic", "rec-stop-recording", "mic-stop-hot-mic", "capture-read", "capture-stop", "capture-unload"]) {
    const call = category.calls.find((entry) => entry.slug === `api/audio/${slug}`);
    assert.ok(call, `Missing published capture API: ${slug}`);
    const markdown = buildApiCallMarkdown(category, call, "Audio", shared);
    assert.match(markdown, /Available in Lua 5.4 and Luau/);
    assert.match(markdown, /```lua/);
    assert.ok(!markdown.includes("```javascript"), slug);
    assert.ok(!markdown.includes("undefined"), slug);
    const exported = await readFile(new URL(`../out/docs/${call.slug}.html`, import.meta.url), "utf8");
    assert.ok(exported.includes(call.title), slug);
    assert.ok(exported.includes("64 MiB"), slug);
  }
});
