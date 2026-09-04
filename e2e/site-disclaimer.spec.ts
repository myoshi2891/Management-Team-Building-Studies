import { expect, test, type Page } from "@playwright/test";

/*
 * 共通の免責事項（奥付）が、固定サイドバーに隠れないことの実測ゲート。
 *
 * この spec が存在する理由:
 *   ガイドページのサイドバーは position: fixed で画面左端 288px を覆い続ける。
 *   共通フッターの左端がその下へ潜り込むと文字が読めなくなるが、これは「遮蔽」であって
 *   「溢れ」ではないため no-horizontal-scroll.spec.ts では検知できない。
 *   また jsdom はレイアウトを持たないので、ユニットテストは実測値をスタブするしかない。
 *   実際の重なりを判定できるのはここだけ。
 *
 * 対象ページの選び方（サイドバーの逃がし方が異なる 3 系統をすべて踏む）:
 *   /capm                        margin-left: var(--sidebar-width) / 解除 980px（54 ページ）
 *   /an-elegant-puzzle-guide     margin-left: 288px の直書き
 *   /csm-scrum-theory-guide      解除ブレークポイントが 1039px
 */
const SIDEBAR_PAGES = [
  "/capm",
  "/an-elegant-puzzle-guide",
  "/csm-scrum-theory-guide",
] as const;

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 780 };

/**
 * 免責事項の内容が始まる x 座標と、サイドバーが覆っている右端を返す。
 * @param page - Playwright のページ
 */
async function measure(page: Page): Promise<{ contentLeft: number; sidebarRight: number }> {
  const heading = page.locator("#site-disclaimer-heading");
  await expect(heading).toBeVisible();
  const box = await heading.boundingBox();
  if (!box) throw new Error("免責事項の見出しの寸法を取得できない");

  const sidebarRight = await page.evaluate(() => {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return 0;
    if (getComputedStyle(sidebar).position !== "fixed") return 0;
    const rect = sidebar.getBoundingClientRect();
    return rect.left > 0 ? 0 : Math.max(0, rect.right);
  });

  return { contentLeft: box.x, sidebarRight };
}

test.describe("共通の免責事項", () => {
  test("デスクトップ幅で固定サイドバーに隠れない", async ({ page }) => {
    await page.setViewportSize(DESKTOP);

    for (const path of SIDEBAR_PAGES) {
      await page.goto(path);

      /*
       * 退避量が確定するのはハイドレーション後。見出しが可視になった瞬間はまだ
       * SSR の初期値（0px）で、そこで一度だけ測ると結果が実行環境の速さで変わる
       * （並列実行時に実際に取り違えた）。収束した状態を待って判定する。
       *
       * 「サイドバーが固定されている」も一緒に返す。前提が崩れたまま
       * 「隠れていない」だけを見ると、検査が空回りしていても Green になる。
       */
      await expect
        .poll(async () => {
          const { contentLeft, sidebarRight } = await measure(page);
          return {
            サイドバーが固定: sidebarRight > 0,
            免責事項が隠れている: contentLeft < sidebarRight,
          };
        }, { message: `${path}: 免責事項が固定サイドバーに隠れている` })
        .toEqual({ サイドバーが固定: true, 免責事項が隠れている: false });
    }
  });

  test("サイドバーの無いホームでは退避しない", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/");

    const inset = await page.locator("[data-testid='site-disclaimer']").evaluate(
      (element) => getComputedStyle(element).paddingLeft,
    );

    expect(inset).toBe("0px");
  });

  test("モバイル幅で全項目が読める", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/capm");

    const footer = page.locator("[data-testid='site-disclaimer']");
    await expect(footer.locator("dt")).toHaveText(["情報の正確性", "著作権・商標", "責任の範囲"]);
    await expect(footer.locator(".disclaimer-copyright")).toBeVisible();

    const { contentLeft } = await measure(page);
    expect(contentLeft).toBeGreaterThan(0);
  });
});
