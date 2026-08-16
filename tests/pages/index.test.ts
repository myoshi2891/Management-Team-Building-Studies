import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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

    // accent は `guide-card-<accent>` クラスとして要素に出る。CSS 側に対応する
    // `--card-accent` 定義が無い accent（例: gold）を検知するため要素クラスも固定する。
    expect(cards.map((card) => ({
      title: card.get("h3").text(),
      category: card.get(".guide-category").text(),
      href: card.get("a").attributes("href"),
      accentClass: card.classes().find((name) => name.startsWith("guide-card-")),
    }))).toEqual([
      {
        title: "CAPM® 認定資格 完全ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/capm",
        accentClass: "guide-card-indigo",
      },
      {
        title: "CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念",
        category: "PROJECT MANAGEMENT",
        href: "/certified-associate-in-project-management-domain1",
        accentClass: "guide-card-gold",
      },
      {
        title: "エンジニアのためのマネジメントキャリアパス",
        category: "ENGINEERING MANAGEMENT",
        href: "/engineering-management-career-path",
        accentClass: "guide-card-forest",
      },
      {
        title: "エンジニアリングチームのリード術 完全ガイド",
        category: "ENGINEERING LEADERSHIP",
        href: "/engineering-team-leadership-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "エンジニアリングマネージャー入門完全ガイド",
        category: "ENGINEERING MANAGEMENT",
        href: "/engineering-manager-guide",
        accentClass: "guide-card-indigo",
      },
    ]);
  });

  it("使用中のアクセントクラスすべてに --card-accent とアイコン配色を定義している", () => {
    const source = readFileSync(resolve(process.cwd(), "app/pages/index.vue"), "utf8");
    const usedAccents = [...new Set(
      mountPage()
        .findAll("[data-testid='guide-card']")
        .map((card) => card.classes().find((name) => name.startsWith("guide-card-")))
        .filter((name): name is string => name !== undefined),
    )];

    expect(usedAccents.length).toBeGreaterThan(0);
    for (const accentClass of usedAccents) {
      expect(source).toContain(`.${accentClass} { --card-accent:`);
      // アイコン配色は既定が indigo のため、それ以外は上書き定義が必須。
      if (accentClass !== "guide-card-indigo") {
        expect(source).toContain(`.${accentClass} .guide-icon {`);
      }
    }
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
