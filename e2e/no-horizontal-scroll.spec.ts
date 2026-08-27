import { expect, test } from "@playwright/test";
import { GUIDES } from "../app/utils/guide-catalog";

/*
 * 全ページ・全幅域での横スクロール禁止。
 *
 * この契約が存在する理由:
 *   横スクロールはレイアウトの実測でしか判定できない。ある指定が溢れるかどうかは
 *   サイドバー幅・padding・ブレークポイントの組み合わせ次第で決まり、CSS の
 *   テキストからは決定できない（静的検査は誤検知だらけでゲートにならないことを実測で確認した）。
 *   したがってここが唯一の機械的ゲートになる。
 *
 * 対象ページは guide-catalog の GUIDES から導出する。新規ガイドを追加すると
 * 自動的にこの契約の対象になり、追加時の登録漏れも同時に検知できる。
 *
 * 幅の選び方（すべて「過去に事故が出た帯」を含む）:
 *   1440 — 標準的なデスクトップ。閉じたドロップダウンのはみ出しが出た帯
 *   1024 — サイドバー（288px）が生きたまま本文が狭くなる帯。列数固定グリッドが溢れた
 *    390 — モバイル。長いラテン文字トークンが折り返せずに溢れた
 */
const WIDTHS = [1440, 1024, 390] as const;

const PATHS = ["/", ...GUIDES.map((guide) => guide.to)];

/**
 * ドキュメントが横方向に溢れている量を返す。0 以下なら横スクロールは出ない。
 * @param page - Playwright のページ
 */
async function horizontalOverflow(page: import("@playwright/test").Page): Promise<number> {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

/**
 * Mermaid の描画完了を待つ。図は ClientOnly + onMounted の非同期描画なので、
 * 待たずに測ると「まだ図が無い状態」の幅を測ってしまい、図が原因の溢れを取り逃がす。
 * `.mermaid-wrap` は ClientOnly の外側にあり静的生成の HTML に含まれるため、
 * ハイドレーション前でも期待枚数を数えられる。図が 0 枚のページでは何も待たない。
 * @param page - Playwright のページ
 */
async function waitForDiagrams(page: import("@playwright/test").Page): Promise<void> {
  const expected = await page.locator(".mermaid-wrap").count();
  if (expected === 0) return;

  // 描画失敗（.diagram-error）も「確定した状態」なので待機の終端として数える。
  // ここで待ち切らないと、失敗した図があるページだけ永久にタイムアウトする。
  await expect(page.locator(".mermaid-wrap svg, .mermaid-wrap .diagram-error")).toHaveCount(
    expected,
    { timeout: 30_000 },
  );
}

test.describe("横スクロールが出ない", () => {
  for (const width of WIDTHS) {
    test(`幅 ${width}px: 全 ${PATHS.length} ページ`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      const offenders: string[] = [];
      for (const path of PATHS) {
        await page.goto(path);
        // 本文が描画され、レイアウトが確定してから測る。
        await expect(page.locator("[data-site-header]")).toBeVisible();
        // 図は非同期描画。描画完了前に測ると図由来の溢れを見逃す。
        await waitForDiagrams(page);

        const overflow = await horizontalOverflow(page);
        if (overflow > 0) offenders.push(`${path} (+${overflow}px)`);
      }

      // 1 ページで落とさず全件を挙げる。原因が共通部品なら全ページに出るため、
      // 「どこが壊れたか」は溢れたページの分布が最も雄弁に示す。
      expect(offenders, `幅 ${width}px で横スクロールが出るページ:\n${offenders.join("\n")}`)
        .toEqual([]);
    });
  }
});
