import { expect, test } from "@playwright/test";

/*
 * グローバルナビのスモーク。
 *
 * ユニットテスト（tests/components/SiteHeader.test.ts）は DOM 構造と状態遷移を固定するが、
 * メディアクエリに依存する挙動は jsdom では再現できない。
 * とくに「ポインタデバイスでウィンドウを狭めた状態」（= モバイルレイアウトなのに
 * hover が効く環境）は、hover とクリックの両方が発火して開いた直後に閉じる事故が起きる。
 * この経路はここでしか検知できない。
 */

const CATEGORY_IDS = [
  "project-management",
  "engineering-management",
  "engineering-leadership",
  "team-building",
] as const;

const MOBILE = { width: 375, height: 720 };

test("デスクトップ: hover でドロップダウンが開き、現在のページを含むカテゴリーを示す", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/capm");

  const trigger = page.locator("#nav-trigger-project-management");
  const panel = page.locator("#nav-panel-project-management");

  await expect(trigger).toHaveClass(/current/);
  await expect(panel).toBeHidden();

  await trigger.hover();
  await expect(panel).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel.locator("a.current")).toHaveAttribute("href", "/capm");

  // パネルはヘッダーの下端より下に出る（ヘッダーに潜り込んで切れない）
  const panelBox = (await panel.boundingBox())!;
  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  expect(panelBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 2);
});

test("デスクトップ: Escape で閉じてトリガーへフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("#nav-trigger-engineering-leadership");
  const panel = page.locator("#nav-panel-engineering-leadership");

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(panel).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("デスクトップ: 閉じているドロップダウンのリンクはタブ順に現れない", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await page.locator("#nav-trigger-project-management").focus();
  await page.keyboard.press("Tab");

  await expect(page.locator("#nav-trigger-engineering-management")).toBeFocused();
});

test("モバイル幅: ポインタデバイスでもタップでアコーディオンが開く", async ({ page }) => {
  // Desktop Chrome を狭めた状態を再現する（hover: hover のままモバイルレイアウトになる）。
  await page.setViewportSize(MOBILE);
  await page.goto("/");

  await page.locator("[data-testid='nav-toggle']").click();
  await expect(page.locator("#global-nav")).toBeVisible();

  for (const id of CATEGORY_IDS) {
    const trigger = page.locator(`#nav-trigger-${id}`);
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(`#nav-panel-${id}`)).toBeVisible();

    await trigger.click();
    await expect(page.locator(`#nav-panel-${id}`)).toBeHidden();
  }
});

test("モバイル幅: リンクをタップすると遷移してナビが閉じる", async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto("/");

  await page.locator("[data-testid='nav-toggle']").click();
  await page.locator("#nav-trigger-team-building").click();
  await page.locator("#nav-panel-team-building a").first().click();

  await expect(page).toHaveURL(/\/dynamic-reteaming-guide$/);
  await expect(page.locator("#global-nav")).toBeHidden();
});

test("横幅 320px でもヘッダーが横にはみ出さない", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.locator("[data-testid='nav-toggle']")).toBeVisible();
  await expect(page.locator("#global-nav")).toBeHidden();
});

test("ガイドページのサイドバー TOC が固定ヘッダーに隠れない", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/capm");
  await page.evaluate(() => window.scrollTo(0, 1200));

  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  const sidebarBox = (await page.locator(".sidebar-nav").first().boundingBox())!;
  expect(sidebarBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 2);
});
