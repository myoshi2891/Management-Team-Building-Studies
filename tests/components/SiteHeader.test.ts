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

const mountHeader = () =>
  mount(SiteHeader, {
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
      { label: "PMP 完全攻略", href: "/pmp-certification-guide" },
    ]);
    expect(panelLinks(wrapper, "engineering-management")).toEqual([
      { label: "EM キャリアパス", href: "/engineering-management-career-path" },
      { label: "EM 入門", href: "/engineering-manager-guide" },
    ]);
    expect(panelLinks(wrapper, "engineering-leadership")).toEqual([
      { label: "チームリード術", href: "/engineering-team-leadership-guide" },
      { label: "統括責任者の手引き", href: "/engineering-executive-playbook" },
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
      "/pmp-certification-guide",
      "/engineering-management-career-path",
      "/engineering-manager-guide",
      "/engineering-team-leadership-guide",
      "/engineering-executive-playbook",
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
