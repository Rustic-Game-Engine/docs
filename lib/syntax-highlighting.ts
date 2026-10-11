import { createLowlight } from "lowlight";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import lua from "highlight.js/lib/languages/lua";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

// Register only the docs' grammars, including CSS/JS for inline HTML examples.
const highlighter = createLowlight({ bash, c, cpp, csharp, css, java, javascript, json, lua, markdown, php, powershell, python, rust, typescript, xml });
highlighter.registerAlias({ lua: ["luau"], rust: ["ron"] });

export function highlightCode(code: string, language: string) {
  const name = language.trim().toLowerCase().split(/\s+/, 1)[0];
  if (!highlighter.registered(name)) return [{ type: "text" as const, value: code }];
  return highlighter.highlight(name, code).children;
}

export type SyntaxNode = ReturnType<typeof highlightCode>[number];
