import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
export const load = (file) => {
  const exports = {};
  const source = readFileSync(new URL(`../lib/${file}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  runInNewContext(compiled, { exports, process, require: (id) => {
    if (id === "server-only") return {};
    if (id.startsWith("./") && !id.endsWith(".json")) return load(`${id.slice(2)}.ts`);
    return require(id === "./api-example-data.json" ? "../lib/api-example-data.json" : id);
  } });
  return exports;
};
