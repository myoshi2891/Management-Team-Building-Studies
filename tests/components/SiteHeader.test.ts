import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import SiteHeader from "~/components/SiteHeader.vue";

const { currentPath } = vi.hoisted(() => ({ currentPath: { value: "/capm" } }));
mockNuxtImport("useRoute", () => () => ({
  path: currentPath.value,
  fullPath: currentPath.value,
  query: {},
  params: {},
  matched: [],
  name: undefined,
  hash: "",
  redirectedFrom: undefined,
  meta: {},
}));

const NuxtLinkStub = {
  props: { to: { type: String, required: true } },
  template: `<a :href="to"><slot /></a>`,
};

const mountHeader = (options: { attachTo?: Element } = {}) =>
  mount(SiteHeader, {
    ...options,
    global: {
      stubs: {
        NuxtLink: NuxtLinkStub,
        Icon: { template: "<span aria-hidden='true' />" },
      },
    },
  });

/** ドロップダウンのトリガー（カテゴリー見出し） */
const triggers = (wrapper: ReturnType<typeof mountHeader>) =>
  wrapper.findAll("[data-testid='nav-category-trigger']");

/** 指定カテゴリーのドロップダウン内リンク */
const panelLinks = (wrapper: ReturnType<typeof mountHeader>, categoryId: string) =>
  wrapper.get(`#nav-panel-${categoryId}`).findAll("a").map((link) => ({
    label: link.text(),
    href: link.attributes("href"),
  }));

describe("SiteHeader — カテゴリー別ドロップダウンナビゲーション", () => {
  it("ホームリンクとカテゴリートリガーを正しい順序で表示する", () => {
    const wrapper = mountHeader();

    const home = wrapper.get("[data-testid='nav-home']");
    expect({ label: home.text(), href: home.attributes("href") }).toEqual({ label: "ホーム", href: "/" });

    expect(triggers(wrapper).map((trigger) => trigger.text())).toEqual([
      "プロジェクトマネジメント",
      "エンジニアリングマネジメント",
      "リーダーシップ",
      "チームビルディング",
    ]);
  });

  it("各カテゴリーのドロップダウンに属するガイドを順序・遷移先まで固定する", () => {
    const wrapper = mountHeader();

    expect(panelLinks(wrapper, "project-management")).toEqual([
      { label: "CAPM 完全ガイド", href: "/capm" },
      { label: "CAPM ドメイン1", href: "/certified-associate-in-project-management-domain1" },
      { label: "CAPM ドメイン2", href: "/certified-associate-in-project-management-domain2" },
      { label: "CAPM ドメイン3", href: "/capm-domain3-agile-frameworks-guide" },
      { label: "CAPM ドメイン4", href: "/capm-domain4-business-analysis-frameworks" },
      { label: "PMP 完全攻略", href: "/pmp-certification-guide" },
      { label: "PMP ドメイン1", href: "/pmp-domain1-people-guide" },
    ]);
    expect(panelLinks(wrapper, "engineering-management")).toEqual([
      { label: "EM キャリアパス", href: "/engineering-management-career-path" },
      { label: "EM 入門", href: "/engineering-manager-guide" },
    ]);
    expect(panelLinks(wrapper, "engineering-leadership")).toEqual([
      { label: "チームリード術", href: "/engineering-team-leadership-guide" },
      { label: "統括責任者の手引き", href: "/engineering-executive-playbook" },
      { label: "リーダーの作法", href: "/leadership-practices-guide" },
    ]);
    expect(panelLinks(wrapper, "team-building")).toEqual([
      { label: "ダイナミック・リチーミング", href: "/dynamic-reteaming-guide" },
    ]);
  });

  it("すべての公開ガイドへ到達できる（登録漏れの検知）", () => {
    const wrapper = mountHeader();

    expect(wrapper.findAll("nav a").map((link) => link.attributes("href"))).toEqual([
      "/",
      "/capm",
      "/certified-associate-in-project-management-domain1",
      "/certified-associate-in-project-management-domain2",
      "/capm-domain3-agile-frameworks-guide",
      "/capm-domain4-business-analysis-frameworks",
      "/pmp-certification-guide",
      "/pmp-domain1-people-guide",
      "/engineering-management-career-path",
      "/engineering-manager-guide",
      "/engineering-team-leadership-guide",
      "/engineering-executive-playbook",
      "/leadership-practices-guide",
      "/dynamic-reteaming-guide",
    ]);
  });

  it("初期状態ではすべてのドロップダウンが閉じている", () => {
    const wrapper = mountHeader();

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "false", "false"]);
  });

  it("トリガーの aria-controls が対応するパネルの id を指す", () => {
    const wrapper = mountHeader();

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-controls"))).toEqual([
      "nav-panel-project-management",
      "nav-panel-engineering-management",
      "nav-panel-engineering-leadership",
      "nav-panel-team-building",
    ]);
  });

  it("トリガーを押すと当該カテゴリーだけが開く", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[1]!.trigger("click");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "true", "false", "false"]);
  });

  it("別のトリガーを押すと開いていたカテゴリーは閉じる", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[1]!.trigger("click");
    await triggers(wrapper)[2]!.trigger("click");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "true", "false"]);
  });

  it("同じトリガーを再度押すと閉じる", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[0]!.trigger("click");
    await triggers(wrapper)[0]!.trigger("click");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "false", "false"]);
  });

  it("Escape キーで開いているドロップダウンを閉じる", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[0]!.trigger("click");
    await wrapper.get("nav").trigger("keydown.escape");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "false", "false"]);
  });

  it("現在のページを含むカテゴリーとそのリンクを通知する", () => {
    const wrapper = mountHeader();

    expect(triggers(wrapper).map((trigger) => trigger.classes().includes("current")))
      .toEqual([true, false, false, false]);
    expect(wrapper.findAll("nav a").map((link) => link.attributes("aria-current"))).toEqual([
      undefined,
      "page",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  });

  it("ホーム表示時はホームリンクだけを現在地として通知する", () => {
    currentPath.value = "/";
    try {
      const wrapper = mountHeader();

      expect(triggers(wrapper).map((trigger) => trigger.classes().includes("current")))
        .toEqual([false, false, false, false]);
      expect(wrapper.get("[data-testid='nav-home']").attributes("aria-current")).toBe("page");
    } finally {
      currentPath.value = "/capm";
    }
  });

  it("モバイル用トグルがナビゲーション本体を制御する", async () => {
    const wrapper = mountHeader();
    const toggle = wrapper.get("[data-testid='nav-toggle']");

    expect(toggle.attributes("aria-expanded")).toBe("false");
    expect(toggle.attributes("aria-controls")).toBe(wrapper.get("nav").attributes("id"));
    expect(toggle.attributes("aria-label")).toBe("ナビゲーションを開く");

    await toggle.trigger("click");

    expect(wrapper.get("[data-testid='nav-toggle']").attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("[data-testid='nav-toggle']").attributes("aria-label")).toBe("ナビゲーションを閉じる");
  });

  it("ブランドとナビゲーションにアクセシブルな名前を持つ", () => {
    const wrapper = mountHeader();

    expect(wrapper.get("header").attributes("data-site-header")).toBe("");
    expect(wrapper.get(".global-brand").attributes("aria-label")).toBe("Management Studies ホーム");
    expect(wrapper.get("nav").attributes("aria-label")).toBe("グローバルナビゲーション");
  });
});

/*
 * DESKTOP_HOVER_QUERY が外れる原因は 2 通りある。
 *   (a) ビューポートが 680px 以下になった  → nav-toggle が可視になる
 *   (b) デスクトップ幅のまま入力方式が変わった（マウス → タッチなど）
 *       → nav-toggle は display:none のままでフォーカスを受け取れない
 * (b) で nav-toggle へ focus() すると無言で失敗し、フォーカスが body へ落ちる。
 *
 * Playwright は hover / pointer のメディア特性を実行時に切り替えられないため
 * （emulateMedia が扱うのは color-scheme / reduced-motion 等のみ）、
 * この経路は matchMedia をスタブしたユニットテストでしか固定できない。
 */
describe("SiteHeader — 入力方式の変化に伴うフォーカス退避", () => {
  type Listener = (event: MediaQueryListEvent) => void;

  /** 幅と入力方式を個別に制御できる matchMedia スタブを仕込む。 */
  function stubMatchMedia(options: { mobileWidth: boolean }) {
    const listeners: Listener[] = [];
    const original = window.matchMedia;

    window.matchMedia = ((query: string) => ({
      matches: query.includes("max-width: 680px") ? options.mobileWidth : !options.mobileWidth,
      media: query,
      addEventListener: (_: string, listener: Listener) => listeners.push(listener),
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    })) as unknown as typeof window.matchMedia;

    return {
      /** hover/pointer だけが変化したことを伝える（幅は options.mobileWidth のまま）。 */
      emitChange: (matches: boolean) =>
        listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent)),
      restore: () => {
        window.matchMedia = original;
      },
    };
  }

  it("デスクトップ幅のまま入力方式が変わったら、隠れた nav-toggle ではなくトリガーへ戻す", async () => {
    const media = stubMatchMedia({ mobileWidth: false });
    const wrapper = mountHeader({ attachTo: document.body });

    try {
      const trigger = wrapper.get("#nav-trigger-project-management");
      await trigger.trigger("click");
      const link = wrapper.get("#nav-panel-project-management a");
      (link.element as HTMLAnchorElement).focus();

      media.emitChange(false);
      await wrapper.vm.$nextTick();

      expect(document.activeElement).toBe(trigger.element);
      expect(trigger.attributes("aria-expanded")).toBe("false");
    } finally {
      wrapper.unmount();
      media.restore();
    }
  });

  /*
   * Escape / 外側クリックのフォーカス退避も同じ落とし穴を持つ。
   * 戻し先を canHover（入力方式）で決めると、デスクトップ幅のままタッチ入力へ
   * 変わった場合に display:none の nav-toggle を選んでしまう。
   */
  it("デスクトップ幅では、開いていない状態の Escape でフォーカスを動かさない", async () => {
    const media = stubMatchMedia({ mobileWidth: false });
    const wrapper = mountHeader({ attachTo: document.body });

    try {
      const home = wrapper.get("[data-testid='nav-home']");
      (home.element as HTMLAnchorElement).focus();

      await wrapper.get("header").trigger("keydown.escape");

      expect(document.activeElement).toBe(home.element);
    } finally {
      wrapper.unmount();
      media.restore();
    }
  });

  it("モバイル幅では、開いていない状態の Escape で nav-toggle へ戻す", async () => {
    const media = stubMatchMedia({ mobileWidth: true });
    const wrapper = mountHeader({ attachTo: document.body });

    try {
      (wrapper.get("[data-testid='nav-home']").element as HTMLAnchorElement).focus();

      await wrapper.get("header").trigger("keydown.escape");

      expect(document.activeElement).toBe(wrapper.get("[data-testid='nav-toggle']").element);
    } finally {
      wrapper.unmount();
      media.restore();
    }
  });

  it("デスクトップ幅で外側を押したら、隠れた nav-toggle ではなくトリガーへ戻す", async () => {
    const media = stubMatchMedia({ mobileWidth: false });
    const outside = document.createElement("button");
    document.body.appendChild(outside);
    const wrapper = mountHeader({ attachTo: document.body });
    /*
     * pointerdown 直後の focus() はブラウザの既定動作に奪われるため、実装は
     * requestAnimationFrame へ退避を遅延させる。テストではコールバックを捕まえ、
     * 「フォーカスが body へ落ちた」状態を再現してから手動で実行する。
     */
    const rafCallbacks: FrameRequestCallback[] = [];
    const raf = vi.spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback) => rafCallbacks.push(callback));

    try {
      // 幅はデスクトップのまま、入力方式だけタッチへ変化させる（nav-toggle は不可視）。
      media.emitChange(false);
      await wrapper.vm.$nextTick();

      const trigger = wrapper.get("#nav-trigger-project-management");
      await trigger.trigger("click");
      const link = wrapper.get("#nav-panel-project-management a").element as HTMLAnchorElement;
      link.focus();

      outside.dispatchEvent(new Event("pointerdown", { bubbles: true }));
      link.blur();
      rafCallbacks.forEach((callback) => callback(0));

      expect(document.activeElement).toBe(trigger.element);
    } finally {
      raf.mockRestore();
      wrapper.unmount();
      outside.remove();
      media.restore();
    }
  });

  it("モバイル幅へ切り替わったときは可視になった nav-toggle へ戻す", async () => {
    const media = stubMatchMedia({ mobileWidth: true });
    const wrapper = mountHeader({ attachTo: document.body });

    try {
      const trigger = wrapper.get("#nav-trigger-project-management");
      await trigger.trigger("click");
      const link = wrapper.get("#nav-panel-project-management a");
      (link.element as HTMLAnchorElement).focus();

      media.emitChange(false);
      await wrapper.vm.$nextTick();

      expect(document.activeElement).toBe(wrapper.get("[data-testid='nav-toggle']").element);
    } finally {
      wrapper.unmount();
      media.restore();
    }
  });
});
