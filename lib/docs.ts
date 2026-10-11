import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { allDocs, resolveDocSlug } from "./docs-catalog";
import { buildApiMarkdown } from "./api-docs";
import { apiCategories } from "./api-reference";
import { buildApiCallMarkdown, buildApiCategoryMarkdown } from "./api-reference-markdown";
import { normalizeSearchText, type SearchEntry } from "./docs-search";

export function findDoc(slugParts?: string[]) {
  const slug = slugParts?.join("/") ?? "";
  return allDocs.find((doc) => doc.slug === resolveDocSlug(slug));
}

export async function readDoc(source: string): Promise<string> {
  if (source.startsWith("api-category:")) {
    const category = apiCategories.find((entry) => entry.slug === source.slice(13));
    const doc = allDocs.find((entry) => entry.slug === category?.slug);
    if (!category || !doc) throw new Error(`Unknown API category: ${source}`);
    return buildApiCategoryMarkdown(category, doc.title, doc.description);
  }
  if (source.startsWith("api-call:")) {
    const slug = source.slice(9);
    const category = apiCategories.find((entry) => entry.calls.some((call) => call.slug === slug));
    const call = category?.calls.find((entry) => entry.slug === slug);
    const doc = allDocs.find((entry) => entry.slug === category?.slug);
    if (!category || !call || !doc) throw new Error(`Unknown API call: ${source}`);
    return buildApiCallMarkdown(category, call, doc.title, await readDoc(category.source));
  }
  if (source.startsWith("api:")) return buildApiMarkdown(source.slice(4));
  return readFile(path.resolve(process.cwd(), source), "utf8");
}

export async function buildSearchIndex(project: string): Promise<SearchEntry[]> {
  return Promise.all(allDocs.filter((doc) => doc.project === project).map(async (doc) => ({
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    group: doc.group,
    project: doc.project,
    searchText: normalizeSearchText(`${doc.title} ${doc.description} ${doc.group} ${await readDoc(doc.source)}`),
  })));
}
