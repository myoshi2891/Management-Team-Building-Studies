import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import SiteHeader from "~/components/SiteHeader.vue";
import { GUIDES, GUIDE_PROGRAMS } from "~/utils/guide-catalog";

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

/** ドロップダウンのトリガー（種別見出し） */
const triggers = (wrapper: ReturnType<typeof mountHeader>) =>
  wrapper.findAll("[data-testid='nav-category-trigger']");

/**
 * 指定種別のドロップダウン内リンク。
 *
 * textContent は要素間に空白を入れずに連結されるため、ラベル・件数・説明を
 * まとめて 1 本の文字列で固定すると、区切りの無い読みにくい期待値になり、
 * どの要素が欠けたのかも分からない。要素ごとに取り出して個別に固定する。
 */
const panelLinks = (wrapper: ReturnType<typeof mountHeader>, kindId: string) =>
  wrapper.get(`#nav-panel-${kindId}`).findAll("a").map((link) => ({
    label: link.find(".nav-program-label").exists()
      ? link.get(".nav-program-label").text()
      : link.text(),
    summary: link.find(".nav-program-summary").exists()
      ? link.get(".nav-program-summary").text()
      : null,
    href: link.attributes("href"),
  }));

/*
 * ナビの契約は「ハブページへの有限個のリンクだけを出す」こと。
 *
 * 以前はここで全ガイドを列挙しており、その結果ナビの項目数がガイド数に比例した。
 * ガイドの到達可能性を保証する役割はハブページ（GuideProgramHub）のテストへ移してある。
 * このファイルが守るのは「ガイドが増えてもナビが太らない」という一点である。
 */
describe("SiteHeader — 種別別ドロップダウンナビゲーション", () => {
  it("ホームリンクと種別トリガーを正しい順序で表示する", () => {
    const wrapper = mountHeader();

    const home = wrapper.get("[data-testid='nav-home']");
    expect({ label: home.text(), href: home.attributes("href") }).toEqual({ label: "ホーム", href: "/" });

    expect(triggers(wrapper).map((trigger) => trigger.text())).toEqual([
      "資格で学ぶ",
      "書籍で学ぶ",
      "テーマで学ぶ",
    ]);
  });

  it("各種別のドロップダウンにハブへのリンクと総覧リンクだけを出す", () => {
    const wrapper = mountHeader();

    expect(panelLinks(wrapper, "certifications")).toEqual([
      { label: "PMI 認定", summary: "CAPM・PMP の全出題ドメイン", href: "/certifications/pmi" },
      { label: "Scrum Alliance 認定", summary: "CSM・CSPO・CSD・CAL の各体系", href: "/certifications/scrum-alliance" },
      { label: "Scrum.org 認定", summary: "PSM・PSPO・PSD の各体系", href: "/certifications/scrum-org" },
      { label: "資格で学ぶをすべて見る", summary: null, href: "/certifications" },
    ]);

    expect(panelLinks(wrapper, "books")).toEqual([
      { label: "マネジメント", summary: "マネジメントの原典と実務書", href: "/books/management" },
      { label: "リーダーシップ", summary: "リードの実践と対話の技術", href: "/books/leadership" },
      { label: "チーム・組織文化", summary: "信頼・心理的安全性・組織文化", href: "/books/team" },
      { label: "チーム設計", summary: "チーム構造とその変え方", href: "/books/org-design" },
      { label: "プロダクト・アジャイル", summary: "プロダクト開発とアジャイル実践", href: "/books/product" },
      { label: "書籍で学ぶをすべて見る", summary: null, href: "/books" },
    ]);

    expect(panelLinks(wrapper, "practices")).toEqual([
      { label: "役割とキャリア", summary: "リーダーの立ち上がりと役割間の協働", href: "/practices/career" },
      { label: "AI 活用", summary: "AI を前提にした実務の進め方", href: "/practices/ai" },
      { label: "テーマで学ぶをすべて見る", summary: null, href: "/practices" },
    ]);
  });

  it("ナビのリンク総数がガイド総数に依存しない", () => {
    /*
     * このモデルが存在する理由そのもの。
     * ホーム 1 + (各種別で プログラム数 + 総覧 1) がナビの全リンクであり、
     * GUIDES が何本になってもこの式は変わらない。
     * 実測でガイド列挙が復活していないことを示すため、件数の桁が違うことも固定する。
     */
    const wrapper = mountHeader();
    const linkCount = wrapper.findAll("nav a").length;

    expect(linkCount).toBe(1 + GUIDE_PROGRAMS.length + 3);
    expect(linkCount).toBeLessThan(GUIDES.length);
  });

  it("ガイド本体へのリンクをナビに一切出さない（列挙モデルへの逆戻り検知）", () => {
    const wrapper = mountHeader();
    const hrefs = new Set(wrapper.findAll("nav a").map((link) => link.attributes("href")));
    const leaked = GUIDES.map((guide) => guide.to).filter((to) => hrefs.has(to));

    expect(leaked).toEqual([]);
  });

  it("パネルのカラム数を data-columns として CSS へ渡す", () => {
    /*
     * ハブ方式のパネルは 1 カラム固定（プログラムを縦に並べる）。
     * 属性が欠けるとグリッドの列数が解決できないため、DOM 契約として固定する。
     */
    const wrapper = mountHeader();

    expect(wrapper.findAll(".nav-dropdown").map((panel) => ({
      id: panel.attributes("id"),
      columns: panel.attributes("data-columns"),
    }))).toEqual([
      { id: "nav-panel-certifications", columns: "1" },
      { id: "nav-panel-books", columns: "1" },
      { id: "nav-panel-practices", columns: "1" },
    ]);
  });

  it("各ハブリンクが件数を機械可読な形で持つ", () => {
    // 件数はカタログから導出する。手書きすると増えるたびに静かにずれる。
    const wrapper = mountHeader();

    expect(wrapper.findAll("[data-testid='nav-program-count']").map((node) => ({
      program: node.attributes("data-program"),
      count: node.text(),
    }))).toEqual(
      GUIDE_PROGRAMS.map((program) => ({
        program: program.id,
        count: String(GUIDES.filter((guide) => guide.programId === program.id).length),
      })),
    );
  });

  it("すべてのハブへ到達できる（プログラム登録漏れの検知）", () => {
    const wrapper = mountHeader();
    const hrefs = wrapper.findAll("nav a").map((link) => link.attributes("href"));

    expect(hrefs).toEqual([
      "/",
      "/certifications/pmi",
      "/certifications/scrum-alliance",
      "/certifications/scrum-org",
      "/certifications",
      "/books/management",
      "/books/leadership",
      "/books/team",
      "/books/org-design",
      "/books/product",
      "/books",
      "/practices/career",
      "/practices/ai",
      "/practices",
    ]);
  });

  it("初期状態ではすべてのドロップダウンが閉じている", () => {
    const wrapper = mountHeader();

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "false"]);
  });

  it("トリガーの aria-controls が対応するパネルの id を指す", () => {
    const wrapper = mountHeader();

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-controls"))).toEqual([
      "nav-panel-certifications",
      "nav-panel-books",
      "nav-panel-practices",
    ]);
  });

  it("トリガーを押すと当該種別だけが開く", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[1]!.trigger("click");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "true", "false"]);
  });

  it("別のトリガーを押すと開いていた種別は閉じる", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[1]!.trigger("click");
    await triggers(wrapper)[2]!.trigger("click");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "true"]);
  });

  it("同じトリガーを再度押すと閉じる", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[0]!.trigger("click");
    await triggers(wrapper)[0]!.trigger("click");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "false"]);
  });

  it("Escape キーで開いているドロップダウンを閉じる", async () => {
    const wrapper = mountHeader();

    await triggers(wrapper)[0]!.trigger("click");
    await wrapper.get("nav").trigger("keydown.escape");

    expect(triggers(wrapper).map((trigger) => trigger.attributes("aria-expanded")))
      .toEqual(["false", "false", "false"]);
  });

  it("ガイド閲覧中は、その所属種別とハブリンクを現在地として通知する", () => {
    /*
     * ナビはガイドを列挙しないので、現在地の手掛かりは種別トリガーとハブリンクしかない。
     * ここが欠けると「今どのあたりを見ているか」がナビから完全に失われる。
     * currentPath は /capm（PMI 認定）。
     */
    const wrapper = mountHeader();

    expect(triggers(wrapper).map((trigger) => trigger.classes().includes("current")))
      .toEqual([true, false, false]);
    expect(wrapper.findAll("nav a").map((link) => link.attributes("aria-current"))).toEqual([
      undefined,
      "true",
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
      undefined,
    ]);
  });

  it("ハブページ表示中は、そのハブリンクを現在地(page)として通知する", () => {
    currentPath.value = "/books/team";
    try {
      const wrapper = mountHeader();

      expect(triggers(wrapper).map((trigger) => trigger.classes().includes("current")))
        .toEqual([false, true, false]);
      // 祖先（ガイド閲覧中）は aria-current="true"、そのページ自身は "page" で区別する。
      const teamHub = wrapper.findAll("nav a").find((link) => link.attributes("href") === "/books/team");
      expect(teamHub?.attributes("aria-current")).toBe("page");
    } finally {
      currentPath.value = "/capm";
    }
  });

  it("ホーム表示時はホームリンクだけを現在地として通知する", () => {
    currentPath.value = "/";
    try {
      const wrapper = mountHeader();

      expect(triggers(wrapper).map((trigger) => trigger.classes().includes("current")))
        .toEqual([false, false, false]);
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
      const trigger = wrapper.get("#nav-trigger-certifications");
      await trigger.trigger("click");
      const link = wrapper.get("#nav-panel-certifications a");
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

      const trigger = wrapper.get("#nav-trigger-certifications");
      await trigger.trigger("click");
      const link = wrapper.get("#nav-panel-certifications a").element as HTMLAnchorElement;
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
      const trigger = wrapper.get("#nav-trigger-certifications");
      await trigger.trigger("click");
      const link = wrapper.get("#nav-panel-certifications a");
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
