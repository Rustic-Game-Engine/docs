import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { allDocs, resolveDocSlug } from "./docs-catalog";
import { buildApiMarkdown } from "./api-docs";
import { buildFunctionExamples } from "./api-examples";
import { normalizeSearchText, type SearchEntry } from "./docs-search";

export function findDoc(slugParts?: string[]) {
  const slug = slugParts?.join("/") ?? "";
  return allDocs.find((doc) => doc.slug === resolveDocSlug(slug));
}

export async function readDoc(source: string) {
  if (source.startsWith("api:")) return buildApiMarkdown(source.slice(4));
  const markdown = await readFile(path.resolve(process.cwd(), source), "utf8");
  const apiPrefix = "docs/Scripting/API/";
  const topic = source.startsWith(apiPrefix) ? source.slice(apiPrefix.length).replace(/\.md$/, "") : "";
  return markdown + buildFunctionExamples(topic);
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
