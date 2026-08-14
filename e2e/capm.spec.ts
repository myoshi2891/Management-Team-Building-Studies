import { expect, test } from "@playwright/test";

/**
 * 静的生成（bun run generate）した成果物に対するスモークテスト。
 *
 * ユニットテストでは検証できない領域だけを対象にする:
 *   - Mermaid の実描画（jsdom には getBBox が無いため単体では不可能）
 *   - @nuxt/icon の静的バンドル（サーバー API 無しでアイコンが出るか）
 *   - スクロール連動の実挙動
 */

const SECTION_IDS = [
  "what-is-capm", "roadmap", "eligibility", "exam-format", "eco-overview",
  "domain1", "domain2", "domain3", "domain4", "glossary",
  "exam-day", "ccr", "study-plan", "summary", "references",
];

const DIAGRAM_COUNT = 9;

test("h1 と全セクションが描画される", async ({ page }) => {
  await page.goto("/capm");

  await expect(page.locator("h1")).toHaveText("CAPM® 認定資格 完全ガイド");

  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("サイドバー TOC の全アンカーが実在の見出しへ解決し、スクロール連動する", async ({ page }) => {
  await page.goto("/capm");

  const links = page.locator(".sidebar-nav a");
  await expect(links).toHaveCount(SECTION_IDS.length);

  // 初期状態では先頭がアクティブ。
  await expect(page.locator(".sidebar-nav a.active")).toHaveAttribute("href", "#what-is-capm");

  // Mermaid の描画が終わるまで待ってからクリックする。描画のたびに文書高さが変わり、
  // 進行中のスムーススクロールの目標位置が動いてしまうため。
  await expect(page.locator(".mermaid svg")).toHaveCount(DIAGRAM_COUNT, { timeout: 30_000 });

  // 中ほどの節へ飛ぶとアクティブが追随する。
  // #domain3 はページ先頭から 17,000px 超あり、scroll-behavior:smooth での移動に数秒かかる。
  await page.locator('.sidebar-nav a[href="#domain3"]').click();
  await expect(page.locator("#domain3")).toBeInViewport({ timeout: 15_000 });
  await expect(page.locator('.sidebar-nav a.active[href="#domain3"]')).toBeVisible();
});

test("Mermaid 図が 9 枚とも SVG として描画され、エラー表示が出ない", async ({ page }) => {
  await page.goto("/capm");

  // 描画はクライアントで非同期に走るため、9 枚揃うまで待つ。
  await expect(page.locator(".mermaid svg")).toHaveCount(DIAGRAM_COUNT, { timeout: 30_000 });
  await expect(page.locator(".diagram-error")).toHaveCount(0);

  // 縮小フィットの後処理が効いているか（列幅を超えて溢れていない）。
  const overflowing = await page.evaluate(() => {
    const svgs = Array.from(document.querySelectorAll<SVGElement>(".mermaid svg"));
    return svgs.filter((svg) => {
      const parent = svg.parentElement;
      return parent ? svg.getBoundingClientRect().width > parent.getBoundingClientRect().width + 1 : false;
    }).length;
  });
  expect(overflowing).toBe(0);
});

test("コンソールエラーが無く、Tabler アイコンが SVG として同梱される", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/capm");
  await expect(page.locator(".mermaid svg")).toHaveCount(DIAGRAM_COUNT, { timeout: 30_000 });

  // @nuxt/icon は serverBundle:false + clientBundle.scan で静的同梱している。
  // 設定を誤るとランタイム API を叩きに行き、静的ホスティングで消える。
  await expect(page.locator(".sidebar-nav a .ti").first()).toBeVisible();

  expect(errors).toEqual([]);
});
