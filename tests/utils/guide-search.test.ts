import { describe, expect, it } from "vitest";
import { GUIDES } from "~/utils/guide-catalog";
import { SEARCH_RESULT_LIMIT, searchGuides } from "~/utils/guide-search";

/*
 * サイト内検索の仕様の正はこの純関数。
 *
 * ハブ方式ではガイドが 1 クリック遠くなるため、その代償を検索が相殺する。
 * 件数が増えるほど回遊の主導線は検索へ移るので、ここが弱いと 4 階層モデルの前提が崩れる。
 * DOM に依存しないぶん仕様を厳密に固定できる。UI（SiteSearch.vue）はこの結果を描くだけ。
 */
describe("utils/guide-search — カタログ全体を対象にした絞り込み", () => {
  it("空のクエリでは何も返さない（全件を返さない）", () => {
    // 開いた瞬間に 59 件が並ぶと、検索ではなく単なる一覧になり選べない。
    expect(searchGuides("")).toEqual([]);
    expect(searchGuides("   ")).toEqual([]);
  });

  it("ナビ表記の前方一致を最上位に置く", () => {
    const hits = searchGuides("CAPM ド");

    expect(hits.map((hit) => hit.guide.navLabel)).toEqual([
      "CAPM ドメイン1",
      "CAPM ドメイン2",
      "CAPM ドメイン3",
      "CAPM ドメイン4",
    ]);
  });

  it("大文字小文字と全角半角の違いを吸収する", () => {
    // 資格名は英字略称が多く、全角で打たれる場面が実際にある。
    const lower = searchGuides("pspo").map((hit) => hit.guide.to);
    const upper = searchGuides("PSPO").map((hit) => hit.guide.to);
    const wide = searchGuides("ＰＳＰＯ").map((hit) => hit.guide.to);

    expect(upper).toEqual(lower);
    expect(wide).toEqual(lower);
  });

  it("タイトル・説明・プログラム名・シリーズ名も対象にする", () => {
    // ナビ表記だけを見ると「認定団体で探す」「訳語で探す」が空振りする。
    expect(searchGuides("Scrum Alliance").length).toBeGreaterThan(0);
    expect(searchGuides("プロダクトオーナー").map((hit) => hit.guide.to))
      .toContain("/cspo-certified-scrum-product-owner-study-guide");
    expect(searchGuides("心理的安全性").length).toBeGreaterThan(0);
  });

  it("ナビ表記の一致をタイトル・説明だけの一致より上位に置く", () => {
    const hits = searchGuides("Team Topologies");

    expect(hits[0]?.guide.to).toBe("/team-topologies-guide");
  });

  it("結果に所属プログラム・シリーズの表記を添える", () => {
    // どの体系のガイドかが分からないと、同名に近い資格（CSPO と PSPO 等）を選び分けられない。
    const hit = searchGuides("CAPM 完全")[0];

    expect(hit).toBeDefined();
    expect({ program: hit?.programLabel, series: hit?.seriesLabel })
      .toEqual({ program: "PMI 認定", series: "CAPM" });
  });

  it("結果件数に上限を設ける", () => {
    // 全ガイドに一致するクエリでも、候補リストが画面を覆ってはいけない。
    const hits = searchGuides("ガイド");

    expect(hits.length).toBeLessThanOrEqual(SEARCH_RESULT_LIMIT);
    expect(SEARCH_RESULT_LIMIT).toBeLessThan(GUIDES.length);
  });

  it("同じガイドを重複して返さない", () => {
    // 複数フィールドに一致したガイドを 2 回積むと、候補が水増しされて他が押し出される。
    const routes = searchGuides("scrum").map((hit) => hit.guide.to);

    expect(routes).toEqual([...new Set(routes)]);
  });

  it("一致しないクエリでは空を返す", () => {
    expect(searchGuides("該当なしのはずの文字列xyzzy")).toEqual([]);
  });

  it("空白区切りの語をすべて含むものだけを返す（AND 検索）", () => {
    /*
     * OR にすると「CAPM ドメイン3」で PMP のドメイン群まで並び、絞り込みにならない。
     * 語順には依存させない（「ドメイン3 CAPM」でも同じ結果になる）。
     */
    const hits = searchGuides("CAPM アジャイル");
    expect(hits.map((hit) => hit.guide.to)).toEqual(["/capm-domain3-agile-frameworks-guide"]);

    expect(searchGuides("アジャイル CAPM").map((hit) => hit.guide.to))
      .toEqual(hits.map((hit) => hit.guide.to));
  });
});
