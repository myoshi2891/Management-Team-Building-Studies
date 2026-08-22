import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
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
        title: "CAPM® ドメイン2: 予測型・計画重視の手法",
        category: "PROJECT MANAGEMENT",
        href: "/certified-associate-in-project-management-domain2",
        accentClass: "guide-card-gold",
      },
      {
        title: "CAPM® ドメイン3: アジャイルフレームワーク/方法論",
        category: "PROJECT MANAGEMENT",
        href: "/capm-domain3-agile-frameworks-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "CAPM® ドメイン4: ビジネス分析フレームワーク",
        category: "PROJECT MANAGEMENT",
        href: "/capm-domain4-business-analysis-frameworks",
        accentClass: "guide-card-gold",
      },
      {
        title: "PMP® 認定試験 完全攻略ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/pmp-certification-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "PMP® Domain I: People 完全攻略ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/pmp-domain1-people-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "PMP® Domain II: Process 完全解説ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/pmp-domain2-process-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "PMP® Domain III: Business Environment 徹底解説ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/pmp-domain3-business-environment-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "Certified ScrumMaster®(CSM®)完全ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/csm-certified-scrummaster-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "Scrum Team とは何か ― 3つのアカウンタビリティ徹底解説",
        category: "PROJECT MANAGEMENT",
        href: "/csm-scrum-team-3-accountabilities",
        accentClass: "guide-card-gold",
      },
      {
        title: "Scrum理論の基礎(Scrum Theory) ― CSM®試験対応 初学者向け完全ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/csm-scrum-theory-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "スクラム実践者が知るべきベストプラクティス97 - 初学者のための完全ガイド",
        category: "PROJECT MANAGEMENT",
        href: "/scrum-97-things-guide",
        accentClass: "guide-card-forest",
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
      {
        title: "ダイナミック・リチーミング実践ガイド",
        category: "TEAM BUILDING",
        href: "/dynamic-reteaming-guide",
        accentClass: "guide-card-forest",
      },
      {
        title: "エンジニアリング統括責任者の手引き",
        category: "ENGINEERING LEADERSHIP",
        href: "/engineering-executive-playbook",
        accentClass: "guide-card-gold",
      },
      {
        title: "リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド",
        category: "ENGINEERING LEADERSHIP",
        href: "/leadership-practices-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "Team Geek ― Googleのギークたちはいかにしてチームを作るのか",
        category: "TEAM BUILDING",
        href: "/team-geek-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "Team Topologies 実践ガイド",
        category: "TEAM BUILDING",
        href: "/team-topologies-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "開発者とアーキテクトのためのコミュニケーションガイド",
        category: "ENGINEERING LEADERSHIP",
        href: "/developer-architect-communication-guide",
        accentClass: "guide-card-forest",
      },
      {
        title: "Elastic Leadership 実践ガイド",
        category: "ENGINEERING LEADERSHIP",
        href: "/elastic-leadership-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "The Leadership Challenge Workbook 完全ガイド",
        category: "ENGINEERING LEADERSHIP",
        href: "/leadership-challenge-workbook-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "Lean UX 実践ガイド ― はじめての人のためのステップバイステップ入門",
        category: "TEAM BUILDING",
        href: "/lean-ux-beginner-guide",
        accentClass: "guide-card-forest",
      },
      {
        title: "リーダーとしての最初の60日間",
        category: "ENGINEERING LEADERSHIP",
        href: "/your-first-60-days-as-a-leader",
        accentClass: "guide-card-forest",
      },
    ]);
  });

  it("使用中のアクセントクラスすべてに --card-accent とアイコン配色を定義している", () => {
    // 実行ディレクトリに依存しないよう、このテストファイルからの相対で解決する。
    // nuxt 環境ではグローバル URL が jsdom 実装のため、new URL(相対, import.meta.url) は
    // file: ベースを無視して http://localhost:3000 で解決してしまう。パスに落としてから解決する。
    const testDir = dirname(fileURLToPath(import.meta.url));
    const source = readFileSync(resolve(testDir, "../../app/pages/index.vue"), "utf8");
    const usedAccents = [...new Set(
      mountPage()
        .findAll("[data-testid='guide-card']")
        .map((card) => card.classes().find((name) => name.startsWith("guide-card-")))
        .filter((name): name is string => name !== undefined),
    )];

    expect(usedAccents.length).toBeGreaterThan(0);
    for (const accentClass of usedAccents) {
      // 整形（改行・インデント）で偽陰性にならないよう空白を許容して照合する。
      expect(source).toMatch(
        new RegExp(`\\.${accentClass}\\s*\\{[^}]*--card-accent\\s*:`),
      );
      // アイコン配色は既定が indigo のため、それ以外は上書き定義が必須。
      // セレクタの存在だけでは空ルールを通してしまうため、background と color の
      // 両方が宣言されていることまで確認する（--color-*-tint の誤マッチは lookbehind で除く）。
      if (accentClass !== "guide-card-indigo") {
        const iconRule = source.match(
          new RegExp(`\\.${accentClass}\\s+\\.guide-icon\\s*\\{([^}]*)\\}`),
        );
        expect(iconRule, `${accentClass} に .guide-icon の上書き定義が無い`).not.toBeNull();
        expect(iconRule?.[1]).toMatch(/(?<![\w-])background\s*:/);
        expect(iconRule?.[1]).toMatch(/(?<![\w-])color\s*:/);
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
