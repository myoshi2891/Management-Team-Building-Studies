import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import SiteDisclaimer from "~/components/SiteDisclaimer.vue";

/*
 * サイト共通の免責事項（奥付）の契約。
 *
 * 掲載文は法的な意味を持つため、件数や部分一致ではなく **全文の完全一致**で凍結する。
 * 要約・言い換え・句読点の揺れをテストが素通しすると、公開文言が静かに変質する。
 *
 * 退避量（--disclaimer-inset）の契約が必要な理由:
 *   ガイドページのサイドバーは position: fixed で左端 288px を占有する。共通フッターを
 *   全幅で置くと、その左端がサイドバーの下へ潜り込んで読めなくなる。しかもサイドバーを
 *   解除するブレークポイントはページごとに不揃い（980px / 1039px / 960px）なので、
 *   メディアクエリで退避量を決めると必ず外れるページが出る。よって実測して退避させる。
 */

const EXPECTED_TERMS = ["情報の正確性", "著作権・商標", "責任の範囲"] as const;

const EXPECTED_DESCRIPTIONS = [
  "本サイトは学習支援を目的とした非公式の個人制作物です。掲載内容の正確性・完全性・最新性は保証しません。出題範囲・受験料・認定要件などは、各認定団体の公式サイトで必ずご確認ください。",
  "各資格の名称・ロゴおよび関連する用語は、各権利者の商標または登録商標です。本サイトは、いずれの認定団体とも提携・後援・承認の関係にありません。",
  "本サイトの利用、または利用できなかったことにより生じた損害、および学習の成果や受験の結果について、運営者は一切の責任を負いません。掲載内容は予告なく変更・削除されることがあります。",
] as const;

/**
 * サイドバーを模した要素を body へ差し込む。jsdom はレイアウトを持たないため、
 * 実測に使う getBoundingClientRect だけを差し替える。position は inline style で与えると
 * getComputedStyle がそのまま返す。
 * @param options - 配置。left が負なら画面外へ退避したオフキャンバス状態を表す
 */
function appendSidebar(options: { position: string; left: number; width: number }): HTMLElement {
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.style.position = options.position;
  sidebar.getBoundingClientRect = (): DOMRect => ({
    x: options.left,
    y: 0,
    left: options.left,
    right: options.left + options.width,
    top: 0,
    bottom: 0,
    width: options.width,
    height: 0,
    toJSON: () => ({}),
  });
  document.body.appendChild(sidebar);
  return sidebar;
}

const inset = (wrapper: ReturnType<typeof mount>): string =>
  (wrapper.element as HTMLElement).style.getPropertyValue("--disclaimer-inset");

afterEach(() => {
  document.querySelectorAll(".sidebar").forEach((element) => element.remove());
});

describe("SiteDisclaimer — サイト共通の免責事項", () => {
  it("末尾の補足情報として footer で描画し、テスト用の目印を持つ", () => {
    const wrapper = mount(SiteDisclaimer);

    expect(wrapper.element.tagName).toBe("FOOTER");
    expect(wrapper.attributes("data-testid")).toBe("site-disclaimer");
  });

  it("見出しでアクセシブルな名前を与える", () => {
    const wrapper = mount(SiteDisclaimer);
    const heading = wrapper.get("h2");

    expect({
      labelledBy: wrapper.attributes("aria-labelledby"),
      headingId: heading.attributes("id"),
      headingText: heading.text(),
    }).toEqual({
      labelledBy: "site-disclaimer-heading",
      headingId: "site-disclaimer-heading",
      headingText: "免責事項",
    });
  });

  it("免責の項目名が定めた順序で並ぶ", () => {
    const wrapper = mount(SiteDisclaimer);

    expect(wrapper.findAll("dt").map((element) => element.text())).toEqual([...EXPECTED_TERMS]);
  });

  it("免責の本文が公開文言と全文一致する", () => {
    const wrapper = mount(SiteDisclaimer);

    expect(wrapper.findAll("dd").map((element) => element.text())).toEqual([...EXPECTED_DESCRIPTIONS]);
  });

  it("著作権表示を出す", () => {
    const wrapper = mount(SiteDisclaimer);

    expect(wrapper.get(".disclaimer-copyright").text()).toBe("© 2026 Management Studies");
  });

  it("サイドバーが無いページでは退避しない", async () => {
    const wrapper = mount(SiteDisclaimer);
    await nextTick();

    expect(inset(wrapper)).toBe("0px");
  });

  it("左端に固定されたサイドバーの幅だけ退避する", async () => {
    appendSidebar({ position: "fixed", left: 0, width: 288 });
    const wrapper = mount(SiteDisclaimer);
    await nextTick();

    expect(inset(wrapper)).toBe("288px");
  });

  it("画面外へ退避したサイドバー（モバイルのオフキャンバス）では退避しない", async () => {
    appendSidebar({ position: "fixed", left: -288, width: 288 });
    const wrapper = mount(SiteDisclaimer);
    await nextTick();

    expect(inset(wrapper)).toBe("0px");
  });

  it("固定配置でないサイドバーは本文と一緒に流れるので退避しない", async () => {
    appendSidebar({ position: "static", left: 0, width: 288 });
    const wrapper = mount(SiteDisclaimer);
    await nextTick();

    expect(inset(wrapper)).toBe("0px");
  });

  it("ウィンドウ幅の変化でサイドバーが引っ込んだら退避量を測り直す", async () => {
    const sidebar = appendSidebar({ position: "fixed", left: 0, width: 288 });
    const wrapper = mount(SiteDisclaimer);
    await nextTick();
    expect(inset(wrapper)).toBe("288px");

    sidebar.remove();
    window.dispatchEvent(new Event("resize"));
    await nextTick();

    expect(inset(wrapper)).toBe("0px");
  });

  it("アンマウント後の resize では測り直さない（リスナーを残さない）", async () => {
    const wrapper = mount(SiteDisclaimer);
    const element = wrapper.element as HTMLElement;
    await nextTick();
    wrapper.unmount();

    appendSidebar({ position: "fixed", left: 0, width: 288 });
    window.dispatchEvent(new Event("resize"));
    await nextTick();

    // 生きたままなら 288px を書き込んでしまう。外した要素を触らないことを保証する。
    expect(element.style.getPropertyValue("--disclaimer-inset")).toBe("0px");
  });
});
