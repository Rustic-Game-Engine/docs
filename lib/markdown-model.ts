import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import type { Root, RootContent, BlockContent, DefinitionContent } from "mdast";
import { exampleLanguages } from "./script-languages";

export function textSlug(text: string) {
  // Retain the site's existing anchor convention, including API punctuation.
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function nodeText(node: { value?: string; children?: unknown[] }): string {
  return node.value ?? (node.children ?? []).map((child) => nodeText(child as typeof node)).join("");
}
export function parseMarkdown(source: string): Root {
  return unified().use(remarkParse).use(remarkGfm).parse(source);
}
export function headingIndex(tree: Root) {
  const counts = new Map<string, number>();
  const headings: { level: number; text: string; id: string }[] = [];
  function walk(nodes: RootContent[]) {
    for (const node of nodes) {
      if (node.type === "heading") {
        const text = nodeText(node);
        const base = textSlug(text);
        const count = counts.get(base) ?? 0;
        counts.set(base, count + 1);
        const id = count ? `${base}-${count}` : base;
        node.data = { ...node.data, hProperties: { id } };
        headings.push({ level: node.depth, text, id });
      }
      if ("children" in node) walk(node.children as RootContent[]);
    }
  }
  walk(tree.children);
  return headings;
}
function languageOf(node: RootContent) {
  if (node.type !== "heading") return undefined;
  const text = nodeText(node);
  return exampleLanguages.find((language) => text === language || text.endsWith(` — ${language}`));
}
// Operate on parsed sections, not fences: warnings, lists and setup within each
// language section travel with its example. No authored code is rewritten.
export function remarkDocumentation() {
  return (tree: Root) => {
    headingIndex(tree);
    const output: RootContent[] = [];
    for (let index = 0; index < tree.children.length;) {
      const first = tree.children[index];
      if (!languageOf(first) || first.type !== "heading") {
        output.push(first); index++; continue;
      }
      const panels: (BlockContent | DefinitionContent)[] = [];
      while (index < tree.children.length) {
        const heading = tree.children[index];
        const language = languageOf(heading);
        if (!language || heading.type !== "heading" || heading.depth !== first.depth) break;
        const children: (BlockContent | DefinitionContent)[] = [heading];
        index++;
        while (index < tree.children.length) {
          const next = tree.children[index];
          if (next.type === "heading" && next.depth <= first.depth) break;
          children.push(next as BlockContent | DefinitionContent); index++;
        }
        panels.push({ type: "blockquote", children, data: { hName: "div", hProperties: { "data-language": language } } });
      }
      output.push({ type: "blockquote", children: panels, data: { hName: "div", hProperties: { "data-language-group": true } } });
    }
    tree.children = output;
  };
}
