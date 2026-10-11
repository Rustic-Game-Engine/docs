import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSearchText, searchDocs } from "../lib/docs-search.ts";

function entry(title, body = "", description = "") {
  return {
    slug: title.toLowerCase().replaceAll(" ", "-"),
    title,
    description,
    group: "Core API",
    project: "Engine",
    searchText: normalizeSearchText(`${title} ${description} ${body}`),
  };
}

test("exact, phrase, and reordered title matches outrank content matches", () => {
  const entries = [
    entry("Overview", "frame time ".repeat(100), "frame time"),
    entry("Time per frame"),
    entry("Understanding frame time"),
    entry("Frame time"),
  ];
  const results = searchDocs(entries, "  FRAME   time ");
  assert.deepEqual(results.map((result) => result.title), [
    "Frame time", "Understanding frame time", "Time per frame", "Overview",
  ]);
  assert.ok(results.every((result, index) => index === 0 || result.score < results[index - 1].score));
  assert.ok(entries.every((item) => !("score" in item)));
});

test("prefixes and small title typos rank above literal content matches", () => {
  for (const query of ["transform", "tranforms", "trasnforms", "trensformz"]) {
    const results = searchDocs([entry("Overview", query), entry("Transforms")], query);
    assert.deepEqual(results.map((result) => result.title), ["Transforms", "Overview"]);
  }
});

test("partial title matches can combine with content but require every query term", () => {
  const results = searchDocs([
    entry("Overview", "transform velocity"),
    entry("Transforms", "velocity"),
    entry("Transform setup"),
  ], "transform velocity");
  assert.deepEqual(results.map((result) => result.title), ["Transforms", "Overview"]);
  assert.deepEqual(searchDocs([entry("Transforms", "velocity")], "tranforms velocity").map((result) => result.title), ["Transforms"]);
});

test("short queries do not introduce fuzzy acronym matches", () => {
  assert.deepEqual(searchDocs([entry("API overview")], "apt"), []);
  assert.deepEqual(searchDocs([entry("Transforms")], "unrelated"), []);
  assert.deepEqual(searchDocs([entry("Transforms")], "transform missing"), []);
});

test("description and phrase relevance break content-only ties", () => {
  const results = searchDocs([
    entry("Overview", "frame and time"),
    entry("Tutorial", "frame time"),
    entry("Guide", "", "frame time"),
  ], "frame time");
  assert.deepEqual(results.map((result) => result.title), ["Guide", "Tutorial", "Overview"]);
});

test("blank queries and equal scores preserve catalog order without mutation", () => {
  const entries = [entry("Second", "entity"), entry("First", "entity")];
  const original = structuredClone(entries);
  for (const query of ["", " \n\t ", "entity"]) {
    assert.deepEqual(searchDocs(entries, query).map((result) => result.title), ["Second", "First"]);
  }
  assert.ok(searchDocs(entries, "").every((result) => result.score === 0));
  assert.deepEqual(entries, original);
});

test("punctuated titles and literal API identifiers remain searchable", () => {
  assert.equal(searchDocs([entry("Built-in attributes")], "built in attributes")[0].title, "Built-in attributes");
  assert.equal(searchDocs([entry("Transforms", "set_translation and +=")], "set_translation").length, 1);
  assert.equal(searchDocs([entry("Transforms", "set_translation and +=")], "+=").length, 1);
  assert.equal(searchDocs([entry("Transforms", "set_translation")], "translation").length, 1);
});
