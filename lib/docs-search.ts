export type SearchEntry = {
  slug: string;
  title: string;
  description: string;
  group: string;
  project: string;
  searchText: string;
};

export function normalizeSearchText(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function searchDocs(entries: SearchEntry[], query: string) {
  const terms = normalizeSearchText(query).split(" ").filter(Boolean);
  return entries.filter((entry) => terms.every((term) => entry.searchText.includes(term)));
}
