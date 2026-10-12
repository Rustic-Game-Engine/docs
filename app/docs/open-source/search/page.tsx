import type { Metadata } from "next";
import { DocsSearch } from "@/components/docs-search";
import { buildSearchIndex } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Search · Open Source Development",
  description: "Search the Rustic open-source repository documentation.",
};

export default async function OpenSourceSearchPage() {
  return <DocsSearch project="Open Source Development" entries={await buildSearchIndex("Open Source Development")} />;
}
