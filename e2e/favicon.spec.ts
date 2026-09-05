import { expect, test } from "@playwright/test";

/**
 * favicon 一式の契約。
 *
 * 静的生成（bun run generate）した成果物の <head> と、実際に配信される
 * アセットの応答を検証する。ユニットテストでは nuxt.config.ts の app.head が
 * 生成 HTML に反映されたかを確認できないため、この層で固定する。
 */

const ICON_LINKS = [
  { selector: 'link[rel="icon"][type="image/svg+xml"]', href: "/favicon.svg", contentType: "image/svg+xml" },
  { selector: 'link[rel="icon"][sizes="48x48"]', href: "/favicon.ico", contentType: "image/" },
  { selector: 'link[rel="apple-touch-icon"]', href: "/apple-touch-icon.png", contentType: "image/png" },
];

test("全ページ共通の <head> が favicon 3 種を宣言する", async ({ page }) => {
  await page.goto("/");

  for (const { selector, href } of ICON_LINKS) {
    await expect(page.locator(selector)).toHaveCount(1);
    await expect(page.locator(selector)).toHaveAttribute("href", href);
  }
});

test("ガイドページでも同じ favicon が宣言される", async ({ page }) => {
  await page.goto("/capm");

  for (const { selector, href } of ICON_LINKS) {
    await expect(page.locator(selector)).toHaveAttribute("href", href);
  }
});

test("宣言された favicon がすべて実体として配信される", async ({ page, request }) => {
  await page.goto("/");

  for (const { href, contentType } of ICON_LINKS) {
    const response = await request.get(href);
    expect(response.status(), `${href} が 200 で配信されること`).toBe(200);
    expect(response.headers()["content-type"] ?? "").toContain(contentType);
    expect((await response.body()).byteLength).toBeGreaterThan(0);
  }
});
