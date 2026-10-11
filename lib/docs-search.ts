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

export type SearchResult = SearchEntry & { score: number };

function words(text: string) {
  return normalizeSearchText(text).match(/[\p{L}\p{N}_]+/gu) ?? [];
}

// Restricted edit distance also treats adjacent transpositions as a single typo.
function editDistance(left: string, right: string) {
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  let beforePrevious = previous;
  for (let row = 1; row <= left.length; row++) {
    const current = [row];
    for (let column = 1; column <= right.length; column++) {
      current[column] = Math.min(
        previous[column] + 1,
        current[column - 1] + 1,
        previous[column - 1] + Number(left[row - 1] !== right[column - 1]),
      );
      if (row > 1 && column > 1 && left[row - 1] === right[column - 2] && left[row - 2] === right[column - 1]) {
        current[column] = Math.min(current[column], beforePrevious[column - 2] + 1);
      }
    }
    beforePrevious = previous;
    previous = current;
  }
  return previous[right.length];
}

function titleWordScore(term: string, word: string) {
  if (word === term) return 1;
  if (word.startsWith(term)) return 0.9;
  if (word.includes(term)) return 0.8;
  // Avoid fuzzy matches for short acronyms and expensive comparisons of long API names.
  if (term.length < 4 || term.length > 64 || word.length > 64) return 0;
  const allowedEdits = term.length >= 8 ? 2 : 1;
  if (Math.abs(term.length - word.length) > allowedEdits) return 0;
  const distance = editDistance(term, word);
  return distance <= allowedEdits ? 0.7 * (1 - distance / Math.max(term.length, word.length)) : 0;
}

export function searchDocs(entries: SearchEntry[], query: string): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return entries.map((entry) => ({ ...entry, score: 0 }));

  const terms = [...new Set(words(normalizedQuery))];
  // Keep punctuation-only and API-symbol searches working as literal content searches.
  if (!terms.length) terms.push(normalizedQuery);
  const titleQuery = words(normalizedQuery).join(" ");

  return entries.flatMap((entry): SearchResult[] => {
    const titleWords = words(entry.title);
    const title = titleWords.join(" ");
    const titleScores = terms.map((term) => Math.max(0, ...titleWords.map((word) => titleWordScore(term, word))));
    const content = normalizeSearchText(entry.searchText);
    if (!terms.every((term, index) => titleScores[index] > 0 || content.includes(term))) return [];

    // Each tier is wider than all secondary signals combined, so content cannot
    // outweigh an exact, phrase, complete, fuzzy, or partial title match.
    let tier = 0;
    if (titleQuery && title === titleQuery) tier = 5;
    else if (titleQuery && ` ${title} `.includes(` ${titleQuery} `)) tier = 4;
    else if (titleScores.every((score) => score >= 0.8)) tier = 3;
    else if (titleScores.every((score) => score > 0)) tier = 2;
    else if (titleScores.some((score) => score > 0)) tier = 1;

    const titleQuality = titleScores.reduce((total, score) => total + score, 0) / terms.length;
    const description = normalizeSearchText(entry.description);
    const descriptionQuality = terms.filter((term) => description.includes(term)).length / terms.length;
    const phraseQuality = content.includes(normalizedQuery) ? 1 : 0;
    const score = tier * 100 + Math.round(titleQuality * 60 + descriptionQuality * 20 + phraseQuality * 10) + 1;
    return [{ ...entry, score }];
  }).sort((left, right) => right.score - left.score);
}
