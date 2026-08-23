import { expect, test, type Page } from "@playwright/test";

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

/*
 * キーボード（Enter）でドロップダウンを開く。
 *
 * SSG された HTML はボタンが押せる状態で先に描画されるため、goto() 直後に
 * focus() → keyboard.press() を送ると Vue のリスナーが付く前のネイティブ click になり、
 * パネルが開かないままタイムアウトする。再試行の効かない一発勝負の操作なので flaky になる。
 *
 * aria-expanded を見てから押すことで再試行を冪等にする（開いているものを閉じない）。
 * ハイドレーション完了の内部フラグには依存しない。
 */
/*
 * hover でドロップダウンを開く。keyboard 版と同じハイドレーション競合があるため、
 * 一度マウスを外してから当て直す形で再試行する（hover は一度当てただけでは
 * リスナーが付いた後に mouseenter が再発火しない）。
 */
async function openWithHover(page: Page, triggerId: string): Promise<void> {
  const panel = page.locator(`#nav-panel-${triggerId}`);
  await expect(async () => {
    await page.mouse.move(0, 0);
    await page.locator(`#nav-trigger-${triggerId}`).hover();
    await expect(panel).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 10_000 });
}

async function openWithKeyboard(page: Page, triggerId: string): Promise<void> {
  const trigger = page.locator(`#nav-trigger-${triggerId}`);
  await expect(async () => {
    await trigger.focus();
    if (await trigger.getAttribute("aria-expanded") === "false") {
      await page.keyboard.press("Enter");
    }
    await expect(page.locator(`#nav-panel-${triggerId}`)).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 10_000 });
}

test("デスクトップ: hover でドロップダウンが開き、現在のページを含むカテゴリーを示す", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/capm");

  const trigger = page.locator("#nav-trigger-project-management");
  const panel = page.locator("#nav-panel-project-management");

  await expect(trigger).toHaveClass(/current/);
  await expect(panel).toBeHidden();

  await openWithHover(page, "project-management");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel.locator("a.current")).toHaveAttribute("href", "/capm");

  // パネルはヘッダーの下端より下に出る（ヘッダーに潜り込んで切れない）。
  // toBeVisible() は visibility が切り替わった時点で通るが、パネルは 160ms かけて
  // translateY(-6px) → translateY(0) するため、直後の boundingBox() はまだ 6px 上にある。
  // 最終位置を見るために expect.poll で落ち着くまで待つ。
  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  await expect
    .poll(async () => (await panel.boundingBox())!.y)
    .toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 2);
});

test("デスクトップ: どの幅・どのカテゴリーでもパネルがビューポート内に収まる", async ({ page }) => {
  /*
   * シリーズカラム化でパネルが横に広がったため、項目基準（left: 0）のままだと
   * 右寄りのカテゴリーで画面外へはみ出す。パネルの配置基準は nav の右端であり、
   * これは CSS だけで決まるので jsdom のユニットテストでは検証できない。
   */
  for (const width of [1440, 1040]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    for (const id of CATEGORY_IDS) {
      await openWithHover(page, id);
      const panel = page.locator(`#nav-panel-${id}`);

      const box = (await panel.boundingBox())!;
      expect(box.x, `${id} @${width}px が左へはみ出している`).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width, `${id} @${width}px が右へはみ出している`).toBeLessThanOrEqual(width);
      // 1 カラムに潰れていないこと（グリッドの列数指定が失われた場合の検知）。
      const columns = Number(await panel.getAttribute("data-columns"));
      expect(box.width).toBeGreaterThanOrEqual(196 * columns);
    }
  }
});

test("デスクトップ: Escape で閉じてトリガーへフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("#nav-trigger-engineering-leadership");
  const panel = page.locator("#nav-panel-engineering-leadership");

  await openWithKeyboard(page, "engineering-leadership");

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

  // カタログの並べ替えにより、チームビルディングの先頭は「チーム文化」シリーズの Team Geek。
  await expect(page).toHaveURL(/\/team-geek-guide$/);
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
  // main.css の `scroll-behavior: smooth` により既定の scrollTo はアニメーションになるため、
  // 直後に boundingBox() を読むとスクロール反映前の座標で判定してしまう。
  // behavior: "instant" なら evaluate 内で位置が確定するので、待ち合わせ自体が不要になる。
  // （waitForFunction の既定 polling は rAF。fullyParallel でページが非アクティブだと
  //   rAF が止まり、待ち合わせがそのままタイムアウトしうる。）
  const scrolledY = await page.evaluate(() => {
    window.scrollTo({ top: 1200, behavior: "instant" });
    return window.scrollY;
  });
  expect(scrolledY).toBeGreaterThanOrEqual(1100);

  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  const sidebarBox = (await page.locator(".sidebar-nav").first().boundingBox())!;
  expect(sidebarBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 2);
});

test("モバイル幅: Escape でメニューが閉じて nav-toggle へフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto("/");

  const toggle = page.locator("[data-testid='nav-toggle']");
  await toggle.click();
  await expect(page.locator("#global-nav")).toBeVisible();

  // カテゴリを開いてリンクにフォーカスを当てる
  await page.locator("#nav-trigger-project-management").click();
  const link = page.locator("#nav-panel-project-management a").first();
  await link.focus();
  await expect(link).toBeFocused();

  // Escape でパネルが閉じトリガーに戻る
  await page.keyboard.press("Escape");
  await expect(page.locator("#nav-panel-project-management")).toBeHidden();
  await expect(page.locator("#nav-trigger-project-management")).toBeFocused();

  // もう一度 Escape でメニュー自体が閉じて nav-toggle に戻る
  await page.keyboard.press("Escape");
  await expect(page.locator("#global-nav")).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("デスクトップ: 外側クリックでパネルが閉じトリガーへフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("#nav-trigger-engineering-management");
  const panel = page.locator("#nav-panel-engineering-management");

  // キーボードで開く（フォーカスがナビ内に入る）
  await openWithKeyboard(page, "engineering-management");

  // パネル内のリンクにフォーカスを当ててから外側クリック。
  // クリック先は必ず <main> にする。`locator("main, body")` は CSS セレクタリストを
  // DOM 順で解決するため .first() が <body> になり、body 相対 (10,10) は
  // position: sticky なヘッダーの内側に落ちる（= 外側クリックにならない）。
  await panel.locator("a").first().focus();
  const main = page.locator("main").first();
  await expect
    .poll(async () => (await main.boundingBox())!.y)
    .toBeGreaterThanOrEqual((await page.locator("[data-site-header]").boundingBox())!.height);
  await main.click({ position: { x: 4, y: 4 }, force: true });
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});
