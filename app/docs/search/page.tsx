import type { Metadata } from "next";
import { DocsSearch } from "@/components/docs-search";
import { buildSearchIndex } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Search · Rustic Engine Docs",
  description: "Search the Rustic Engine documentation index.",
};

export default async function SearchPage() {
  return <DocsSearch project="Engine" entries={await buildSearchIndex("Engine")} />;
}
