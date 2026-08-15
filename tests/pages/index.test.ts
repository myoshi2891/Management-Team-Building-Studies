import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import Page from "~/pages/index.vue";

const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const NuxtLinkStub = {
  props: { to: { type: String, required: true } },
  template: `<a :href="to"><slot /></a>`,
};

const mountPage = () =>
  mount(Page, {
    global: {
      stubs: {
        NuxtLink: NuxtLinkStub,
        Icon: { template: "<span aria-hidden='true' />" },
      },
    },
  });

describe("pages/index.vue — 学習ライブラリ契約", () => {
  it("ホームの主要コピーを正しい順序で表示する", () => {
    const wrapper = mountPage();

    expect(wrapper.get("h1").text()).toBe("マネジメントを、実践できる知識に。");
    expect(wrapper.get(".hero-eyebrow").text()).toBe("MANAGEMENT LEARNING LIBRARY");
    expect(wrapper.get(".hero-lede").text()).toBe(
      "資格取得からキャリアの選択まで。信頼できる情報を、理解しやすい学習ガイドとして届けます。",
    );
  });

  it("公開中ガイドを内容・順序・遷移先まで固定する", () => {
    const wrapper = mountPage();
    const cards = wrapper.findAll("[data-testid='guide-card']");

    expect(cards.map((card) => ({
      title: card.get("h3").text(),
      category: card.get(".guide-category").text(),
      href: card.get("a").attributes("href"),
    }))).toEqual([
      {
        title: "CAPM® 認定資格 完全ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/capm",
      },
      {
        title: "CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念",
        category: "PROJECT MANAGEMENT",
        href: "/certified-associate-in-project-management-domain1",
      },
      {
        title: "エンジニアのためのマネジメントキャリアパス",
        category: "ENGINEERING MANAGEMENT",
        href: "/engineering-management-career-path",
      },
      {
        title: "エンジニアリングチームのリード術 完全ガイド",
        category: "ENGINEERING LEADERSHIP",
        href: "/engineering-team-leadership-guide",
      },
      {
        title: "エンジニアリングマネージャー入門完全ガイド",
        category: "ENGINEERING MANAGEMENT",
        href: "/engineering-manager-guide",
      },
    ]);
  });

  it("ガイド選択を助ける学習テーマを完全一致で表示する", () => {
    const themes = mountPage()
      .findAll("[data-testid='learning-theme']")
      .map((theme) => theme.text());

    expect(themes).toEqual([
      "体系的に理解する",
      "実務の判断に活かす",
      "次のキャリアを描く",
    ]);
  });

  it("見出し構造がアクセシブルである", () => {
    const wrapper = mountPage();

    expect(wrapper.findAll("h1")).toHaveLength(1);
    expect(wrapper.findAll("h2").map((heading) => heading.text())).toEqual([
      "公開中のガイド",
      "知識を、現場で使える形へ",
    ]);
    expect(wrapper.get("footer nav").attributes("aria-label")).toBe("フッターナビゲーション");
  });

  it("SEOメタ情報を設定する", () => {
    mountPage();

    expect(seoMeta).toHaveBeenCalledWith({
      title: "Management Studies | マネジメント学習ガイド",
      description: "プロジェクトマネジメントとエンジニアリングマネジメントを、体系的かつ実践的に学べるガイドライブラリ。",
    });
  });
});
