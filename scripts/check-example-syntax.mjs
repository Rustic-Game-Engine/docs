import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { Script } from "node:vm";
import { load } from "./load-lib.mjs";

const data = JSON.parse(readFileSync(new URL("../lib/api-example-data.json", import.meta.url)));
const { buildApiMarkdown } = load("api-docs.ts");
const snippets = Object.entries(data).flatMap(([topic, entries]) => entries.flatMap((entry) => Object.entries(entry.examples).map(([language, code]) => ({ label: `${topic}/${entry.title}/${language}`, language, code }))));
for (const topic of ["entity", "transforms", "properties", "attributes", "input", "logging", "enabled", "environment", "scene", "instances", "camera", "callbacks"]) {
  for (const match of buildApiMarkdown(topic).matchAll(/^### ([^\n]+)\n\n```[^\n]+\n([\s\S]*?)\n```/gm)) snippets.push({ label: `${topic}/${match[1]}`, language: match[1], code: match[2] });
}
const { apiCategories } = load("api-reference.ts");
const { buildApiCallMarkdown } = load("api-reference-markdown.ts");
const captureCategory = apiCategories.find((category) => category.slug === "api/audio");
const audioSource = readFileSync(new URL("../docs/Scripting/API/audio.md", import.meta.url), "utf8");
for (const call of captureCategory.calls.filter((call) => /recording|hot-mic|capture-/.test(call.slug))) {
  for (const match of buildApiCallMarkdown(captureCategory, call, "Audio", audioSource).matchAll(/^### ([^\n]+)\n\n```[^\n]+\n([\s\S]*?)\n```/gm)) {
    snippets.push({ label: `${call.slug}/${match[1]}`, language: match[1], code: match[2] });
  }
}
for (const file of ["docs/Scripting/API/audio.md", "docs/Scripting/gameplayActions/audio.md"]) {
  const markdown = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  let index = 0;
  for (const match of markdown.matchAll(/```lua\n([\s\S]*?)\n```/g)) snippets.push({ label: `${file}/${++index}`, language: "Lua 5.4", code: match[1] });
}
for (const entry of snippets) {
  if (/\bStop\s*=\s*function/.test(entry.code)) throw new Error(`${entry.label}: use OnStop, not the unbound Stop callback.`);
}
const directory = mkdtempSync(path.join(tmpdir(), "rustic-doc-examples-"));
const available = (command) => spawnSync(command, ["--version"], { stdio: "ignore" }).error?.code !== "ENOENT";
function run(command, args, label) {
  const result = spawnSync(command, args, { encoding: "utf8", timeout: 30000 });
  if (result.status !== 0) throw new Error(`${label}: ${result.error?.message ?? `${result.stderr}\n${result.stdout}`}`);
}
const groups = (language) => snippets.filter((entry) => entry.language === language);
try {
  const js = snippets.filter((entry) => ["JavaScript", "HTML / inline JS"].includes(entry.language));
  for (const entry of js) new Script(`(function(){\n${entry.code}\n})`, { filename: entry.label });
  console.log(`JavaScript syntax: ${js.length} snippets (including inline HTML JavaScript); not runtime execution.`);
  const python = groups("Python");
  if (available("python3")) {
    const file = path.join(directory, "python.json"); writeFileSync(file, JSON.stringify(python));
    run("python3", ["-c", 'import ast,json,sys\nfor entry in json.load(open(sys.argv[1])): ast.parse(entry["code"], filename=entry["label"])', file], "Python syntax");
    console.log(`Python syntax: ${python.length} snippets; no SDK imports or runtime execution.`);
  } else console.log("SKIP Python syntax: python3 unavailable.");
  for (const [language, command, args] of [["Lua 5.4", "luac", ["-p"]], ["Luau", "luau-compile", ["--null"]], ["PHP", "php", ["-l"]]]) {
    if (!available(command)) { console.log(`SKIP ${language} syntax: ${command} unavailable.`); continue; }
    for (const entry of groups(language)) {
      const file = path.join(directory, language === "PHP" ? "example.php" : "example.lua");
      writeFileSync(file, language === "PHP" ? `<?php\n${entry.code}\n` : entry.code);
      run(command, [...args, file], entry.label);
    }
    console.log(`${language} syntax: ${groups(language).length} snippets; no engine runtime execution.`);
  }
  // SDK-backed compilation is opt-in: normal docs checks require no engine checkout.
  const engineIndex = process.argv.indexOf("--engine");
  if (engineIndex < 0) {
    console.log("SKIP SDK compilation (C, C++, C#, Java): provide --engine /path/to/engine/Engine.");
  } else {
    const engine = path.resolve(process.argv[engineIndex + 1]);
    const sdk = path.join(engine, "crates/engine-scripting/src/sdk");
    writeFileSync(path.join(directory, "rustic.h"), readFileSync(path.join(sdk, "rustic.h")));
    const cpp = readFileSync(path.join(engine, "crates/engine-scripting/src/cpp_sdk.rs"), "utf8").match(/const HEADER: &str = r#"([\s\S]*?)"#;/)?.[1];
    if (!cpp) throw new Error("Could not extract the actual C++ SDK header.");
    writeFileSync(path.join(directory, "rustic.hpp"), cpp);
    const callbackC = 'static void on_done(void) {}\nstatic void on_sample(RusticValue value) { (void)value; }\nstatic void on_event(const RusticValue *args, size_t count) { (void)args; (void)count; }';
    for (const [language, command, standard, extension] of [["C", "gcc", "c17", "c"], ["C++", "g++", "c++20", "cpp"]]) {
      if (!available(command)) { console.log(`SKIP ${language} compilation: ${command} unavailable.`); continue; }
      const entries = groups(language).filter((entry) => !entry.label.startsWith("callbacks/"));
      const file = path.join(directory, `examples.${extension}`);
      writeFileSync(file, `#include "rustic.${language === "C" ? "h" : "hpp"}"\n${language === "C" ? callbackC : ""}\n` + entries.map((entry, index) => `void example_${index}(void) {\n#line 1 "${entry.label}"\n${entry.code}\n}`).join("\n"));
      run(command, [`-std=${standard}`, "-fsyntax-only", ...(language === "C" ? ["-Werror=implicit-function-declaration", "-Werror=incompatible-pointer-types"] : []), file], `${language} actual SDK declaration check`);
      // Lifecycle examples are complete registrations, so compile them separately.
      for (const entry of groups(language).filter((entry) => entry.label.startsWith("callbacks/"))) {
        writeFileSync(file, `#include "rustic.${language === "C" ? "h" : "hpp"}"\n${entry.code}`);
        run(command, [`-std=${standard}`, "-fsyntax-only", file], entry.label);
      }
      console.log(`${language} SDK declaration compilation: ${groups(language).length} snippets, without linking or execution.`);
    }
    if (available("javac")) {
      writeFileSync(path.join(directory, "Rustic.java"), readFileSync(path.join(sdk, "Rustic.java")));
      const entries = groups("Java").filter((entry) => !entry.label.startsWith("callbacks/"));
      const file = path.join(directory, "Examples.java");
      writeFileSync(file, 'import java.util.*;\nclass Examples extends Rustic {\n' + entries.map((entry, index) => `void example_${index}() {\n${entry.code}\n}`).join("\n") + '\n}');
      run("javac", ["-d", directory, path.join(directory, "Rustic.java"), file], "Java actual SDK compilation");
      console.log(`Java SDK compilation: ${entries.length} snippets; no engine execution. Lifecycle registration checked by check:api-examples.`);
    } else console.log("SKIP Java compilation: javac unavailable.");
    if (available("dotnet")) {
      writeFileSync(path.join(directory, "Rustic.cs"), readFileSync(path.join(sdk, "Rustic.cs")));
      const version = spawnSync("dotnet", ["--version"], { encoding: "utf8" }).stdout.trim().split(".")[0];
      writeFileSync(path.join(directory, "Examples.csproj"), `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net${version}.0</TargetFramework><Nullable>enable</Nullable><OutputType>Library</OutputType><EnableDefaultCompileItems>false</EnableDefaultCompileItems></PropertyGroup><ItemGroup><Compile Include="Rustic.cs"/><Compile Include="Examples.cs"/></ItemGroup></Project>`);
      const entries = groups("C#").filter((entry) => !entry.label.startsWith("callbacks/"));
      writeFileSync(path.join(directory, "Examples.cs"), 'using System;\nusing System.Linq;\nusing System.Collections.Generic;\nusing System.Text.Json;\nusing static Rustic;\nclass Examples {\n' + entries.map((entry, index) => `void Example_${index}() {\n${entry.code}\n}`).join("\n") + '\n}');
      run("dotnet", ["build", path.join(directory, "Examples.csproj"), "--nologo", "--verbosity", "quiet"], "C# actual SDK compilation");
      console.log(`C# SDK compilation: ${entries.length} snippets; no engine execution. Lifecycle registration checked by check:api-examples.`);
    } else console.log("SKIP C# compilation: dotnet unavailable.");
  }
} finally { rmSync(directory, { recursive: true, force: true }); }
