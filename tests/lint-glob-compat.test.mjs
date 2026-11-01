import "../eslint.config.mjs";
import assert from "node:assert/strict";
import test from "node:test";
import { ESLint } from "eslint";
import react from "eslint-plugin-react";

test("patched glob matching preserves React rule allowlists and violations", async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: {
      files: ["**/*.jsx"],
      languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
      plugins: { react },
      rules: {
        "react/forbid-component-props": ["error", {
          forbid: [{ propNamePattern: "secret*", allowedForPatterns: ["Allowed*"] }],
        }],
      },
    },
  });
  const [result] = await eslint.lintText(
    'const allowed = <AllowedPanel secretToken="test" />; const denied = <OtherPanel secretToken="test" />;',
    { filePath: "glob-compat.jsx" },
  );
  assert.equal(result.errorCount, 1);
  assert.equal(result.messages[0].ruleId, "react/forbid-component-props");
  assert.ok(result.messages[0].column > 50);
});

test("repository lint config still excludes generated output", async () => {
  const eslint = new ESLint();
  assert.equal(await eslint.isPathIgnored("out/generated.js"), true);
  assert.equal(await eslint.isPathIgnored(".next/generated.js"), true);
  assert.equal(await eslint.isPathIgnored("lib/docs-catalog.ts"), false);
});
