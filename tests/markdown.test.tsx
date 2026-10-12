import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Markdown, resolveDocHref } from "../components/markdown";
import { headingIndex, parseMarkdown, remarkDocumentation } from "../lib/markdown-model";

function render(source: string) { return renderToStaticMarkup(<Markdown source={source} />); }
test("CommonMark and GFM render nested structure, escapes, images and responsive tables", () => {
  const html = render(`# Title\n\n*italic* **bold** \\*literal\\* and \`code\`\n\n3. first\n   - nested\n     - deeper\n\n> quote\n>\n> another paragraph\n\n| Name | Value |\n| --- | --- |\n| cell | **bold** |\n\n- [x] done\n\n---\n\n![Editor panel](/favicon.svg "Actual asset caption")`);
  for (const part of ['<em>italic</em>', '<strong>bold</strong>', '*literal*', '<ol start="3">', '<ul>', '<blockquote>', 'class="table-wrap"', 'type="checkbox"', '<hr', 'alt="Editor panel"', 'loading="lazy"', 'Actual asset caption']) assert.ok(html.includes(part), part);
});
test("anchors and TOC share parsed headings, exclude fenced headings and disambiguate duplicates", () => {
  const source = '## `Tween.to()`\n\n## Tween.to()\n\n```text\n## Fake heading\n```\n\n### Deep *heading*';
  assert.deepEqual(headingIndex(parseMarkdown(source)).map((h) => h.id), ['tween-to', 'tween-to-1', 'deep-heading']);
  const html = render(source);
  assert.ok(html.includes('id="tween-to-1"'));
  assert.ok(!html.includes('id="fake-heading"'));
});
test("malformed Markdown stays safe and executable HTML/URLs are discarded", () => {
  const html = render('[unsafe](javascript:alert%281%29)\n\n<script>alert(1)</script>\n\n<img src=x onerror=alert(2)>\n\n**unclosed\n\n~~~js\nconst x = "<script>";');
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(!html.includes('<script>') && !html.includes('onerror='));
  assert.ok(html.includes('Copy javascript code') || html.includes('Copy js code'));
  assert.ok(html.includes('**unclosed'));
});
test("relative internal links resolve against the current file and keep fragments", () => {
  assert.equal(resolveDocHref('../scriptingLua.md#input', 'docs/Scripting/scriptingWeb/html-behavior.md'), '/docs/scripting/lua#input');
  assert.equal(resolveDocHref('/docs/api/audio#limits'), '/docs/api/audio#limits');
  assert.equal(resolveDocHref('javascript:alert(1)'), '');
});
test("language sections include warnings and preserve all code while SSR selects one example", () => {
  const source = '## Examples\n\n### Lua 5.4\n\nLua warning\n\n```lua\nprint("hi")\n```\n\n### JavaScript\n\nJS warning\n\n```javascript\nprint("hi");\n```\n\n## Limits\n\nCommon limit';
  const tree = parseMarkdown(source); remarkDocumentation()(tree);
  assert.equal(tree.children[1].data?.hProperties?.['data-language-group'], true);
  const html = render(source);
  assert.ok(html.includes('role="tablist"') && html.includes('role="tabpanel"'));
  assert.ok(html.includes('hidden=""'));
  for (const text of ['Lua warning', 'JS warning', 'Common limit', 'Show All Languages']) assert.ok(html.includes(text));
});
