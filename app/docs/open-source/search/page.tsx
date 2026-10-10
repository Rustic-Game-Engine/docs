import type { Metadata } from "next";
import { DocsSearch } from "@/components/docs-search";
import { buildSearchIndex } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Search · Open-Sourced Docs",
  description: "Search the Rustic open-source repository documentation.",
};

export default async function OpenSourceSearchPage() {
  return <DocsSearch project="Open-Sourced Docs" entries={await buildSearchIndex("Open-Sourced Docs")} />;
}
