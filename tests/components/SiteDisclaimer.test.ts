import { mount } from "@vue/test-utils";
import { useNuxtApp } from "#imports";
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

/**
 * jsdom には ResizeObserver が無い。購読先と発火のタイミングを検査できる最小の実装を置く。
 * @returns 差し替えの後片付けと、購読中の要素・発火用のハンドル
 */
function stubResizeObserver(): {
  observed: Element[];
  trigger: () => void;
  restore: () => void;
} {
  const observed: Element[] = [];
  const callbacks: (() => void)[] = [];
  const original = Reflect.get(window, "ResizeObserver");

  class FakeResizeObserver {
    /* 購読解除はインスタンス単位で効く必要がある（遷移のたびに張り直すため）。 */
    private readonly fire = (): void => this.callback();

    constructor(private readonly callback: () => void) {
      callbacks.push(this.fire);
    }

    observe(target: Element): void {
      observed.push(target);
    }

    disconnect(): void {
      const index = callbacks.indexOf(this.fire);
      if (index >= 0) callbacks.splice(index, 1);
    }
  }

  Reflect.set(window, "ResizeObserver", FakeResizeObserver);

  return {
    observed,
    trigger: () => callbacks.forEach((callback) => callback()),
    restore: () => Reflect.set(window, "ResizeObserver", original),
  };
}

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

  /*
   * マウント時の一度きりの計測では、その瞬間にまだスタイルが確定していない場合に
   * 誤った値を焼き付けたまま固定されてしまう（実測: 全体 CSS の box-sizing が
   * 効く前はサイドバーの右端が 288px ではなく 336px に見える）。
   * サイドバーの寸法そのものを購読し、確定したところで測り直す。
   */
  it("サイドバーの寸法変化を購読して測り直す", async () => {
    const observer = stubResizeObserver();
    try {
      const sidebar = appendSidebar({ position: "fixed", left: 0, width: 336 });
      const wrapper = mount(SiteDisclaimer);
      await nextTick();
      expect(observer.observed).toEqual([sidebar]);

      // レイアウト確定後の寸法へ差し替えて、購読側から再計測させる。
      sidebar.getBoundingClientRect = (): DOMRect => ({
        x: 0, y: 0, left: 0, right: 288, top: 0, bottom: 0, width: 288, height: 0,
        toJSON: () => ({}),
      });
      observer.trigger();
      await nextTick();

      expect(inset(wrapper)).toBe("288px");
    } finally {
      observer.restore();
    }
  });

  it("アンマウントで寸法の購読も解除する", async () => {
    const observer = stubResizeObserver();
    try {
      appendSidebar({ position: "fixed", left: 0, width: 288 });
      const wrapper = mount(SiteDisclaimer);
      const element = wrapper.element as HTMLElement;
      await nextTick();
      wrapper.unmount();

      document.querySelectorAll(".sidebar").forEach((node) => node.remove());
      observer.trigger();
      await nextTick();

      expect(element.style.getPropertyValue("--disclaimer-inset")).toBe("288px");
    } finally {
      observer.restore();
    }
  });

  /*
   * 免責事項は <NuxtPage> の外にあるため、遷移しても再マウントされない。
   * 一方 .sidebar は遷移先のページごとに作り直されるので、マウント時の
   * 一度きりの購読では、遷移後のサイドバーを誰も測らないまま取り残される。
   * 遷移の完了（page:finish = Suspense 解決）を待って測り直す契約。
   */
  it("サイドバーの無いページから遷移したら、遷移先のサイドバーを測る", async () => {
    const wrapper = mount(SiteDisclaimer);
    await nextTick();
    expect(inset(wrapper)).toBe("0px");

    appendSidebar({ position: "fixed", left: 0, width: 288 });
    await useNuxtApp().callHook("page:finish");
    await nextTick();

    expect(inset(wrapper)).toBe("288px");
  });

  it("遷移先のサイドバーへ購読を張り直す", async () => {
    const observer = stubResizeObserver();
    try {
      const first = appendSidebar({ position: "fixed", left: 0, width: 288 });
      const wrapper = mount(SiteDisclaimer);
      await nextTick();
      expect(observer.observed).toEqual([first]);

      first.remove();
      const second = appendSidebar({ position: "fixed", left: 0, width: 240 });
      await useNuxtApp().callHook("page:finish");
      await nextTick();

      expect(observer.observed).toEqual([first, second]);
      expect(inset(wrapper)).toBe("240px");
    } finally {
      observer.restore();
    }
  });

  it("遷移でサイドバーが消えたら退避も解く（古い購読を残さない）", async () => {
    const observer = stubResizeObserver();
    try {
      const sidebar = appendSidebar({ position: "fixed", left: 0, width: 288 });
      const wrapper = mount(SiteDisclaimer);
      await nextTick();
      expect(inset(wrapper)).toBe("288px");

      sidebar.remove();
      await useNuxtApp().callHook("page:finish");
      await nextTick();
      expect(inset(wrapper)).toBe("0px");

      // 張り直しの際に古い購読を切っていなければ、ここで消えた要素を測り直してしまう。
      observer.trigger();
      await nextTick();

      expect(inset(wrapper)).toBe("0px");
    } finally {
      observer.restore();
    }
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
