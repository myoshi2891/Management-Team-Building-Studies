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

/**
 * 指定カテゴリーのシリーズカラム。
 * 見出し・見出しとの a11y 紐付け・所属リンクをカラム単位で取り出す。
 */
const seriesColumns = (wrapper: ReturnType<typeof mountHeader>, categoryId: string) =>
  wrapper.get(`#nav-panel-${categoryId}`).findAll(".nav-series").map((column) => ({
    label: column.find(".nav-series-label").exists() ? column.get(".nav-series-label").text() : null,
    labelledBy: column.get("ul").attributes("aria-labelledby") ?? null,
    links: column.findAll("a").map((link) => ({ label: link.text(), href: link.attributes("href") })),
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
      { label: "PMP ドメイン2", href: "/pmp-domain2-process-guide" },
      { label: "PMP ドメイン3", href: "/pmp-domain3-business-environment-guide" },
      { label: "CSM 完全ガイド", href: "/csm-certified-scrummaster-guide" },
      { label: "CSM 3つのアカウンタビリティ", href: "/csm-scrum-team-3-accountabilities" },
      { label: "CSM Scrum理論", href: "/csm-scrum-theory-guide" },
      { label: "CSM アーティファクト", href: "/csm-scrum-artifacts-and-commitments" },
      { label: "CSM スクラムイベント", href: "/scrum-events-csm-guide" },
      { label: "CSM コアコンピテンシー", href: "/csm-scrum-master-core-competencies" },
      { label: "スクラム 97の知恵", href: "/scrum-97-things-guide" },
      { label: "CAF 完全ガイド", href: "/caf-certified-agile-facilitator-study-guide" },
      { label: "CAL1 完全ガイド", href: "/cal1-certified-agile-leader-1-guide" },
      { label: "CAL1 第1章", href: "/the-case-for-agile-leadership" },
      { label: "CAL1 第2章", href: "/agile-leadership-in-action" },
      { label: "CAL1 第3章", href: "/cal1-chapter3-leading-agile-teams" },
      { label: "CAL1 第4章", href: "/cal1-chapter4-leading-agile-organizations" },
      { label: "CAL2 Part 1", href: "/cal2-part1-organizational-strategy-and-delivery" },
      { label: "CAL2 Part 2", href: "/cal2-part2-developing-as-a-leader" },
      { label: "CAL2 完全ガイド", href: "/cal2-certified-agile-leader-2-study-guide" },
      { label: "AI-PM 実践ガイド", href: "/ai-driven-project-management-guide" },
    ]);
    expect(panelLinks(wrapper, "engineering-management")).toEqual([
      { label: "EM キャリアパス", href: "/engineering-management-career-path" },
      { label: "EM 入門", href: "/engineering-manager-guide" },
      { label: "Managing Humans", href: "/managing-humans-best-practices-guide" },
      { label: "人月の神話", href: "/mythical-man-month-guide" },
      { label: "High Output Management", href: "/high-output-management-guide" },
      { label: "An Elegant Puzzle", href: "/an-elegant-puzzle-guide" },
    ]);
    expect(panelLinks(wrapper, "engineering-leadership")).toEqual([
      { label: "チームリード術", href: "/engineering-team-leadership-guide" },
      { label: "リーダーの作法", href: "/leadership-practices-guide" },
      { label: "最初の60日間", href: "/your-first-60-days-as-a-leader" },
      { label: "Leadership Challenge", href: "/leadership-challenge-workbook-guide" },
      { label: "統括責任者の手引き", href: "/engineering-executive-playbook" },
      { label: "Elastic Leadership", href: "/elastic-leadership-guide" },
      { label: "開発者・アーキテクト", href: "/developer-architect-communication-guide" },
    ]);
    expect(panelLinks(wrapper, "team-building")).toEqual([
      { label: "Team Geek", href: "/team-geek-guide" },
      { label: "Debugging Teams", href: "/debugging-teams-guide" },
      { label: "Peopleware", href: "/peopleware-guide" },
      { label: "Radical Candor", href: "/radical-candor-guide" },
      { label: "No Rules Rules", href: "/no-rules-rules-guide" },
      { label: "5つの機能不全", href: "/five-dysfunctions-of-a-team-guide" },
      { label: "Team Topologies", href: "/team-topologies-guide" },
      { label: "ダイナミック・リチーミング", href: "/dynamic-reteaming-guide" },
      { label: "Lean UX 入門", href: "/lean-ux-beginner-guide" },
    ]);
  });

  it("ドロップダウンをシリーズカラムへ分割する（見出し・a11y 紐付け・所属リンク）", () => {
    /*
     * カラム分割はドロップダウンが縦に伸び続けるのを防ぐための構造。
     * 見出しだけ・件数だけの検証では、ガイドが別カラムへ紛れ込んでも通ってしまうため、
     * 見出しと所属リンクを 1 つの構造として順序込みで固定する。
     */
    const wrapper = mountHeader();

    expect(seriesColumns(wrapper, "project-management")).toEqual([
      {
        label: "CAPM",
        labelledBy: "nav-series-capm",
        links: [
          { label: "CAPM 完全ガイド", href: "/capm" },
          { label: "CAPM ドメイン1", href: "/certified-associate-in-project-management-domain1" },
          { label: "CAPM ドメイン2", href: "/certified-associate-in-project-management-domain2" },
          { label: "CAPM ドメイン3", href: "/capm-domain3-agile-frameworks-guide" },
          { label: "CAPM ドメイン4", href: "/capm-domain4-business-analysis-frameworks" },
        ],
      },
      {
        label: "PMP",
        labelledBy: "nav-series-pmp",
        links: [
          { label: "PMP 完全攻略", href: "/pmp-certification-guide" },
          { label: "PMP ドメイン1", href: "/pmp-domain1-people-guide" },
          { label: "PMP ドメイン2", href: "/pmp-domain2-process-guide" },
          { label: "PMP ドメイン3", href: "/pmp-domain3-business-environment-guide" },
        ],
      },
      {
        label: "CSM / Scrum",
        labelledBy: "nav-series-csm",
        links: [
          { label: "CSM 完全ガイド", href: "/csm-certified-scrummaster-guide" },
          { label: "CSM 3つのアカウンタビリティ", href: "/csm-scrum-team-3-accountabilities" },
          { label: "CSM Scrum理論", href: "/csm-scrum-theory-guide" },
          { label: "CSM アーティファクト", href: "/csm-scrum-artifacts-and-commitments" },
          { label: "CSM スクラムイベント", href: "/scrum-events-csm-guide" },
          { label: "CSM コアコンピテンシー", href: "/csm-scrum-master-core-competencies" },
          { label: "スクラム 97の知恵", href: "/scrum-97-things-guide" },
          { label: "CAF 完全ガイド", href: "/caf-certified-agile-facilitator-study-guide" },
        ],
      },
      {
        label: "CAL 1・2",
        labelledBy: "nav-series-cal",
        links: [
          { label: "CAL1 完全ガイド", href: "/cal1-certified-agile-leader-1-guide" },
          { label: "CAL1 第1章", href: "/the-case-for-agile-leadership" },
          { label: "CAL1 第2章", href: "/agile-leadership-in-action" },
          { label: "CAL1 第3章", href: "/cal1-chapter3-leading-agile-teams" },
          { label: "CAL1 第4章", href: "/cal1-chapter4-leading-agile-organizations" },
          { label: "CAL2 Part 1", href: "/cal2-part1-organizational-strategy-and-delivery" },
          { label: "CAL2 Part 2", href: "/cal2-part2-developing-as-a-leader" },
          { label: "CAL2 完全ガイド", href: "/cal2-certified-agile-leader-2-study-guide" },
        ],
      },
      {
        label: "AI-PM",
        labelledBy: "nav-series-ai-pm",
        links: [
          { label: "AI-PM 実践ガイド", href: "/ai-driven-project-management-guide" },
        ],
      },
    ]);

    // シリーズ未定義のカテゴリーは、見出しの無い 1 カラム（分割前と同じ見た目）。
    expect(seriesColumns(wrapper, "engineering-management")).toEqual([
      {
        label: null,
        labelledBy: null,
        links: [
          { label: "EM キャリアパス", href: "/engineering-management-career-path" },
          { label: "EM 入門", href: "/engineering-manager-guide" },
          { label: "Managing Humans", href: "/managing-humans-best-practices-guide" },
          { label: "人月の神話", href: "/mythical-man-month-guide" },
          { label: "High Output Management", href: "/high-output-management-guide" },
          { label: "An Elegant Puzzle", href: "/an-elegant-puzzle-guide" },
        ],
      },
    ]);

    expect(seriesColumns(wrapper, "engineering-leadership")).toEqual([
      {
        label: "はじめてのリード",
        labelledBy: "nav-series-first-leadership",
        links: [
          { label: "チームリード術", href: "/engineering-team-leadership-guide" },
          { label: "リーダーの作法", href: "/leadership-practices-guide" },
          { label: "最初の60日間", href: "/your-first-60-days-as-a-leader" },
          { label: "Leadership Challenge", href: "/leadership-challenge-workbook-guide" },
        ],
      },
      {
        label: "組織・スケール",
        labelledBy: "nav-series-exec-scale",
        links: [
          { label: "統括責任者の手引き", href: "/engineering-executive-playbook" },
          { label: "Elastic Leadership", href: "/elastic-leadership-guide" },
          { label: "開発者・アーキテクト", href: "/developer-architect-communication-guide" },
        ],
      },
    ]);

    expect(seriesColumns(wrapper, "team-building")).toEqual([
      {
        label: "チーム文化",
        labelledBy: "nav-series-team-culture",
        links: [
          { label: "Team Geek", href: "/team-geek-guide" },
          { label: "Debugging Teams", href: "/debugging-teams-guide" },
          { label: "Peopleware", href: "/peopleware-guide" },
          { label: "Radical Candor", href: "/radical-candor-guide" },
          { label: "No Rules Rules", href: "/no-rules-rules-guide" },
          { label: "5つの機能不全", href: "/five-dysfunctions-of-a-team-guide" },
        ],
      },
      {
        label: "チーム設計・変革",
        labelledBy: "nav-series-team-design",
        links: [
          { label: "Team Topologies", href: "/team-topologies-guide" },
          { label: "ダイナミック・リチーミング", href: "/dynamic-reteaming-guide" },
          { label: "Lean UX 入門", href: "/lean-ux-beginner-guide" },
        ],
      },
    ]);
  });

  it("パネルのカラム数を data-columns として CSS へ渡す", () => {
    // グリッドの列数は CSS 側で var(--nav-panel-columns) として使う。
    // 属性が欠けると全カラムが 1 列に潰れるため、DOM 契約として固定する。
    const wrapper = mountHeader();

    expect(wrapper.findAll(".nav-dropdown").map((panel) => ({
      id: panel.attributes("id"),
      columns: panel.attributes("data-columns"),
    }))).toEqual([
      { id: "nav-panel-project-management", columns: "5" },
      { id: "nav-panel-engineering-management", columns: "1" },
      { id: "nav-panel-engineering-leadership", columns: "2" },
      { id: "nav-panel-team-building", columns: "2" },
    ]);
  });

  it("シリーズ見出しの id が重複しない（aria-labelledby の指し先が一意）", () => {
    const ids = mountHeader().findAll(".nav-series-label").map((label) => label.attributes("id"));

    expect(ids).toEqual([...new Set(ids)]);
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
      "/pmp-domain2-process-guide",
      "/pmp-domain3-business-environment-guide",
      "/csm-certified-scrummaster-guide",
      "/csm-scrum-team-3-accountabilities",
      "/csm-scrum-theory-guide",
      "/csm-scrum-artifacts-and-commitments",
      "/scrum-events-csm-guide",
      "/csm-scrum-master-core-competencies",
      "/scrum-97-things-guide",
      "/caf-certified-agile-facilitator-study-guide",
      "/cal1-certified-agile-leader-1-guide",
      "/the-case-for-agile-leadership",
      "/agile-leadership-in-action",
      "/cal1-chapter3-leading-agile-teams",
      "/cal1-chapter4-leading-agile-organizations",
      "/cal2-part1-organizational-strategy-and-delivery",
      "/cal2-part2-developing-as-a-leader",
      "/cal2-certified-agile-leader-2-study-guide",
      "/ai-driven-project-management-guide",
      "/engineering-management-career-path",
      "/engineering-manager-guide",
      "/managing-humans-best-practices-guide",
      "/mythical-man-month-guide",
      "/high-output-management-guide",
      "/an-elegant-puzzle-guide",
      "/engineering-team-leadership-guide",
      "/leadership-practices-guide",
      "/your-first-60-days-as-a-leader",
      "/leadership-challenge-workbook-guide",
      "/engineering-executive-playbook",
      "/elastic-leadership-guide",
      "/developer-architect-communication-guide",
      "/team-geek-guide",
      "/debugging-teams-guide",
      "/peopleware-guide",
      "/radical-candor-guide",
      "/no-rules-rules-guide",
      "/five-dysfunctions-of-a-team-guide",
      "/team-topologies-guide",
      "/dynamic-reteaming-guide",
      "/lean-ux-beginner-guide",
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
