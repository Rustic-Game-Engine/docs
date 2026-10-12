import { spawnSync } from "node:child_process";

// Preserve both validation paths and forward optional flags to each checker.
// In a shell 'first && second' script, npm forwards flags only to the last command.
for (const script of ["scripts/check-snippet-syntax.mjs", "scripts/check-example-syntax.mjs"]) {
  const result = spawnSync(process.execPath, [script, ...process.argv.slice(2)], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) { process.exitCode = result.status ?? 1; break; }
}
