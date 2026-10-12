import { expect, test } from "@playwright/test";

const api = "/docs/api/transforms/set-translation";
test("representative routes, themes and responsive layout", async ({ page }) => {
  const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/", "/docs/engine", "/docs/open-source", "/docs/tutorials/first-playable-scene", "/docs/guides/editor", "/docs/guides/editor/inspector", "/docs/api/transforms", api]) {
    await page.goto(route); await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  }
  await page.getByRole("button", { name: "Toggle theme" }).click(); await expect(page.locator(".site")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Toggle theme" }).click(); await expect(page.locator(".site")).not.toHaveClass(/dark/);
  expect(errors).toEqual([]);
});
test("language preference persists across navigation and refresh, supports unsupported APIs and comparison", async ({ page }) => {
  await page.goto(api);
  await expect(page.getByRole("tab", { name: "Lua 5.4", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: "Python", exact: true }).click();
  await expect(page.locator('[data-language="Python"]')).toBeVisible();
  await expect(page.locator('[data-language="Lua 5.4"]')).not.toBeVisible();
  await page.locator(".breadcrumbs").getByRole("link", { name: "TRANSFORMS", exact: true }).click();
  await page.locator("article").getByRole("link", { name: "rustic.get_translation()", exact: true }).click();
  await expect(page.getByRole("tab", { name: "Python", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.reload(); await expect(page.getByRole("tab", { name: "Python", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.goto("/docs/api/audio/start-recording"); await expect(page.getByRole("status")).toContainText("No Python example");
  await page.getByRole("tab", { name: "Show All Languages" }).click();
  await expect(page.locator('[data-language="Lua 5.4"]')).toBeVisible(); await expect(page.locator('[data-language="Luau"]')).toBeVisible();
});
test("keyboard tabs, focus, deep links and copying", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(`${api}#javascript`);
  await expect(page.getByRole("tab", { name: "JavaScript", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("link", { name: "Skip to content" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  const tab = page.getByRole("tab", { name: "JavaScript", exact: true }); await tab.focus(); await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Python", exact: true })).toBeFocused();
  await page.keyboard.press("End"); await expect(page.getByRole("tab", { name: "Show All Languages" })).toBeFocused();
  await page.keyboard.press("Home"); await expect(page.getByRole("tab", { name: "Lua 5.4", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Copy lua code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("rustic.set_translation");
  const toc = page.locator('.on-page a[href="#signature"]');
  if (await toc.isVisible()) await toc.click();
  else await page.evaluate(() => { window.location.hash = "signature"; });
  await expect(page).toHaveURL(/#signature$/);
});
test("search finds hidden-language examples and filters page types", async ({ page }) => {
  await page.goto("/docs/search"); const input = page.getByRole("textbox", { name: "Search Engine documentation" });
  await input.fill("RusticVector3"); await expect(page.locator(".search-index-list a").first()).toBeVisible();
  await page.getByRole("combobox", { name: "Page type" }).selectOption("API reference");
  for (const href of await page.locator(".search-index-list a").evaluateAll((links) => links.map((link) => link.getAttribute("href")))) expect(href).toMatch(/^\/docs\/api\//);
  await page.getByRole("combobox", { name: "Page type" }).selectOption("Tutorial"); await input.fill("first playable");
  await expect(page.locator('.search-index-list a[href="/docs/tutorials/first-playable-scene"]')).toBeVisible();
  for (const href of await page.locator(".search-index-list a").evaluateAll((links) => links.map((link) => link.getAttribute("href")))) expect(href).toMatch(/^\/docs\/tutorials\//);
  await page.keyboard.press("Escape"); await expect(input).toHaveValue("");
  await page.keyboard.press("Control+k"); await expect(input).toBeFocused();
});
test("storage denial still allows language switching", async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.getItem = () => { throw new Error("denied"); }; Storage.prototype.setItem = () => { throw new Error("denied"); }; });
  await page.goto(api); await page.getByRole("tab", { name: "Java", exact: true }).click();
  await expect(page.locator('[data-language="Java"]')).toBeVisible();
});
test("mobile navigation opens, follows a guide, and closes with focus restored", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "Mobile drawer only");
  await page.goto("/docs/engine"); const open = page.getByRole("button", { name: "Open navigation" });
  await open.click(); await expect(page.locator("#docs-sidebar")).toBeVisible();
  await page.locator("#docs-sidebar summary").filter({ hasText: "Editor overview" }).click();
  await page.locator("#docs-sidebar").getByRole("link", { name: "Inspector", exact: true }).click();
  await expect(page).toHaveURL(/\/guides\/editor\/inspector$/); await expect(open).toHaveAttribute("aria-expanded", "false");
  await open.click(); await page.keyboard.press("Escape"); await expect(open).toBeFocused();
});
