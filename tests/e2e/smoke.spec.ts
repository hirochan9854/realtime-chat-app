import { test, expect } from "@playwright/test";

test("トップページが正常に表示される", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/.*/);
  await expect(page.locator("body")).toBeVisible();
});
