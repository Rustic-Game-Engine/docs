import assert from "node:assert/strict";
import test from "node:test";
import { highlightCode } from "../lib/syntax-highlighting.ts";

function textContent(nodes) {
  return nodes.map((node) => node.type === "text" ? node.value : textContent(node.children)).join("");
}

test("all scripting languages and documentation fence aliases produce tokens without changing source", () => {
  const examples = {
    lua: 'local name = "Rustic" -- comment',
    luau: 'local name = "Rustic" -- comment',
    javascript: 'const name = "Rustic"; // comment',
    python: 'name = "Rustic" # comment',
    py: 'name = "Rustic" # comment',
    cpp: 'const char* name = "Rustic"; // comment',
    csharp: 'var name = "Rustic"; // comment',
    c: 'const char* name = "Rustic"; // comment',
    java: 'String name = "Rustic"; // comment',
    php: '$name = "Rustic"; // comment',
    html: '<script>const name = "Rustic";</script>',
    json: '{"name": "Rustic"}',
    sh: 'echo "Rustic" # comment',
    powershell: '$name = "Rustic" # comment',
    ts: 'const name: string = "Rustic";',
    markdown: '# Rustic',
    ron: '(name: "Rustic", count: 1)',
  };
  for (const [language, code] of Object.entries(examples)) {
    const nodes = highlightCode(code, language);
    assert.ok(nodes.some((node) => node.type === "element"), language);
    assert.equal(textContent(nodes), code, language);
  }
});

test("HTML highlights embedded JavaScript and remains text inside span tokens", () => {
  const code = '<script>const name = "<img src=x onerror=alert(1)>";</script>\n';
  const nodes = highlightCode(code, "html");
  function checkTokens(tokens) {
    for (const node of tokens) {
      if (node.type === "text") continue;
      assert.equal(node.type, "element");
      assert.equal(node.tagName, "span");
      assert.deepEqual(Object.keys(node.properties), ["className"]);
      checkTokens(node.children);
    }
  }
  checkTokens(nodes);
  assert.match(JSON.stringify(nodes), /hljs-keyword/);
  assert.equal(textContent(nodes), code);
});

test("plain text and unknown languages preserve exact whitespace and markup", () => {
  const code = '  <script>alert("example")</script>\n\t& trailing spaces  \n';
  for (const language of ["", "text", "unknown-language"]) {
    assert.deepEqual(highlightCode(code, language), [{ type: "text", value: code }]);
  }
  assert.deepEqual(highlightCode("", "javascript"), []);
});

test("language names accept case and optional fence metadata", () => {
  const code = 'const name = "Rustic";';
  assert.deepEqual(highlightCode(code, " JavaScript filename=example.js "), highlightCode(code, "javascript"));
});
