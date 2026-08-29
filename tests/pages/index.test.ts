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
    // category はカテゴリー表記ではなくシリーズ表記（セクション見出しとの重複を避ける）。
    const wrapper = mountPage();
    const cards = wrapper.findAll("[data-testid='guide-card']");

    // accent は `guide-card-<accent>` クラスとして要素に出る。CSS 側に対応する
    // `--card-accent` 定義が無い accent（例: gold）を検知するため要素クラスも固定する。
    expect(cards.map((card) => ({
      title: card.get("h4").text(),
      category: card.get(".guide-category").text(),
      href: card.get("a").attributes("href"),
      accentClass: card.classes().find((name) => name.startsWith("guide-card-")),
    }))).toEqual([
      {
        title: "CAPM® 認定資格 完全ガイド",
        category: "CAPM",
        href: "/capm",
        accentClass: "guide-card-indigo",
      },
      {
        title: "CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念",
        category: "CAPM",
        href: "/certified-associate-in-project-management-domain1",
        accentClass: "guide-card-gold",
      },
      {
        title: "CAPM® ドメイン2: 予測型・計画重視の手法",
        category: "CAPM",
        href: "/certified-associate-in-project-management-domain2",
        accentClass: "guide-card-gold",
      },
      {
        title: "CAPM® ドメイン3: アジャイルフレームワーク/方法論",
        category: "CAPM",
        href: "/capm-domain3-agile-frameworks-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "CAPM® ドメイン4: ビジネス分析フレームワーク",
        category: "CAPM",
        href: "/capm-domain4-business-analysis-frameworks",
        accentClass: "guide-card-gold",
      },
      {
        title: "PMP® 認定試験 完全攻略ガイド",
        category: "PMP",
        href: "/pmp-certification-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "PMP® Domain I: People 完全攻略ガイド",
        category: "PMP",
        href: "/pmp-domain1-people-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "PMP® Domain II: Process 完全解説ガイド",
        category: "PMP",
        href: "/pmp-domain2-process-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "PMP® Domain III: Business Environment 徹底解説ガイド",
        category: "PMP",
        href: "/pmp-domain3-business-environment-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "Certified ScrumMaster®(CSM®)完全ガイド",
        category: "CSM / SCRUM",
        href: "/csm-certified-scrummaster-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "Scrum Team とは何か ― 3つのアカウンタビリティ徹底解説",
        category: "CSM / SCRUM",
        href: "/csm-scrum-team-3-accountabilities",
        accentClass: "guide-card-gold",
      },
      {
        title: "Scrum理論の基礎(Scrum Theory) ― CSM®試験対応 初学者向け完全ガイド",
        category: "CSM / SCRUM",
        href: "/csm-scrum-theory-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "Scrum Artifacts と Commitments 完全ガイド",
        category: "CSM / SCRUM",
        href: "/csm-scrum-artifacts-and-commitments",
        accentClass: "guide-card-gold",
      },
      {
        title: "Scrum Events 完全ガイド",
        category: "CSM / SCRUM",
        href: "/scrum-events-csm-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "Scrum Master Core Competencies 完全解説ガイド",
        category: "CSM / SCRUM",
        href: "/csm-scrum-master-core-competencies",
        accentClass: "guide-card-gold",
      },
      {
        title: "スクラム実践者が知るべきベストプラクティス97 - 初学者のための完全ガイド",
        category: "CSM / SCRUM",
        href: "/scrum-97-things-guide",
        accentClass: "guide-card-forest",
      },
      {
        title: "Certified Agile Facilitator(CAF)学習ガイド",
        category: "CSM / SCRUM",
        href: "/caf-certified-agile-facilitator-study-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "Advanced Certified Scrum Developer® (A-CSD®) 完全ガイド",
        category: "CSM / SCRUM",
        href: "/a-csd-advanced-certified-scrum-developer-study-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "Certified Agile Leader® 1 (CAL 1™) 完全ガイド",
        category: "CAL 1 & 2",
        href: "/cal1-certified-agile-leader-1-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "アジャイルリーダーシップの必要性を理解する",
        category: "CAL 1 & 2",
        href: "/the-case-for-agile-leadership",
        accentClass: "guide-card-gold",
      },
      {
        title: "実践におけるリーダーシップ(Agile Leadership in Action)",
        category: "CAL 1 & 2",
        href: "/agile-leadership-in-action",
        accentClass: "guide-card-gold",
      },
      {
        title: "第3章:アジャイルチームのリード(Leading Agile Teams)",
        category: "CAL 1 & 2",
        href: "/cal1-chapter3-leading-agile-teams",
        accentClass: "guide-card-gold",
      },
      {
        title: "第4章: Leading Agile Organizations(アジャイル組織のリード)",
        category: "CAL 1 & 2",
        href: "/cal1-chapter4-leading-agile-organizations",
        accentClass: "guide-card-gold",
      },
      {
        title: "Certified Agile Leader® 2 (CAL 2™) スタディガイド",
        category: "CAL 1 & 2",
        href: "/cal2-part1-organizational-strategy-and-delivery",
        accentClass: "guide-card-gold",
      },
      {
        title: "CAL2 Part 2: リーダーとしての成長(Developing as a Leader)完全ガイド",
        category: "CAL 1 & 2",
        href: "/cal2-part2-developing-as-a-leader",
        accentClass: "guide-card-gold",
      },
      {
        title: "Certified Agile Leader® 2 (CAL 2™) 学習ガイド",
        category: "CAL 1 & 2",
        href: "/cal2-certified-agile-leader-2-study-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "AI駆動プロジェクトマネジメント実践ガイド",
        category: "AI-PM",
        href: "/ai-driven-project-management-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "エンジニアのためのマネジメントキャリアパス",
        category: "ENGINEERING MANAGEMENT",
        href: "/engineering-management-career-path",
        accentClass: "guide-card-forest",
      },
      {
        title: "エンジニアリングマネージャー入門完全ガイド",
        category: "ENGINEERING MANAGEMENT",
        href: "/engineering-manager-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "『Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager』完全ガイド",
        category: "ENGINEERING MANAGEMENT",
        href: "/managing-humans-best-practices-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "『人月の神話』完全ガイド ― 初学者のためのステップ・バイ・ステップ実践集",
        category: "ENGINEERING MANAGEMENT",
        href: "/mythical-man-month-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "HIGH OUTPUT MANAGEMENT 完全ガイド",
        category: "ENGINEERING MANAGEMENT",
        href: "/high-output-management-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "An Elegant Puzzle: Systems of Engineering Management 徹底解説ガイド",
        category: "ENGINEERING MANAGEMENT",
        href: "/an-elegant-puzzle-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "エンジニアリングチームのリード術 完全ガイド",
        category: "FIRST LEADERSHIP",
        href: "/engineering-team-leadership-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド",
        category: "FIRST LEADERSHIP",
        href: "/leadership-practices-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "リーダーとしての最初の60日間",
        category: "FIRST LEADERSHIP",
        href: "/your-first-60-days-as-a-leader",
        accentClass: "guide-card-forest",
      },
      {
        title: "The Leadership Challenge Workbook 完全ガイド",
        category: "FIRST LEADERSHIP",
        href: "/leadership-challenge-workbook-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "エンジニアリング統括責任者の手引き",
        category: "ORG & SCALE",
        href: "/engineering-executive-playbook",
        accentClass: "guide-card-gold",
      },
      {
        title: "Elastic Leadership 実践ガイド",
        category: "ORG & SCALE",
        href: "/elastic-leadership-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "開発者とアーキテクトのためのコミュニケーションガイド",
        category: "ORG & SCALE",
        href: "/developer-architect-communication-guide",
        accentClass: "guide-card-forest",
      },
      {
        title: "Team Geek ― Googleのギークたちはいかにしてチームを作るのか",
        category: "TEAM CULTURE",
        href: "/team-geek-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "Debugging Teams 完全ガイド ― チームの人間関係を「デバッグ」するベストプラクティス",
        category: "TEAM CULTURE",
        href: "/debugging-teams-guide",
        accentClass: "guide-card-plum",
      },
      {
        title: "『Peopleware: Productive Projects and Teams』完全ガイド",
        category: "TEAM CULTURE",
        href: "/peopleware-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "Radical Candor 完全ガイド ― 初学者のための実践フレームワーク",
        category: "TEAM CULTURE",
        href: "/radical-candor-guide",
        accentClass: "guide-card-gold",
      },
      {
        title: "『NO RULES RULES』完全ガイド",
        category: "TEAM CULTURE",
        href: "/no-rules-rules-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "『あなたのチームは、機能してますか？』完全ガイド",
        category: "TEAM CULTURE",
        href: "/five-dysfunctions-of-a-team-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "Team Topologies 実践ガイド",
        category: "TEAM DESIGN",
        href: "/team-topologies-guide",
        accentClass: "guide-card-indigo",
      },
      {
        title: "ダイナミック・リチーミング実践ガイド",
        category: "TEAM DESIGN",
        href: "/dynamic-reteaming-guide",
        accentClass: "guide-card-forest",
      },
      {
        title: "Lean UX 実践ガイド ― はじめての人のためのステップバイステップ入門",
        category: "TEAM DESIGN",
        href: "/lean-ux-beginner-guide",
        accentClass: "guide-card-forest",
      },
    ]);
  });

  it("ガイドをカテゴリーセクションへ分けて見出し・件数まで固定する", () => {
    /*
     * 30 枚近いカードを区切り無しで流すと、どこまでが何の領域か読み取れない。
     * セクションの並びはナビのカテゴリー順と一致していなければならないため、
     * 見出しと件数を順序込みで固定する。
     */
    const sections = mountPage().findAll("[data-testid='guide-category-section']");

    expect(sections.map((section) => ({
      kicker: section.get(".section-kicker").text(),
      title: section.get("h3").text(),
      count: section.get("[data-testid='guide-category-count']").text(),
      cards: section.findAll("[data-testid='guide-card']").length,
    }))).toEqual([
      { kicker: "PROJECT MANAGEMENT", title: "プロジェクトマネジメント", count: "26 ガイド", cards: 26 },
      { kicker: "ENGINEERING MANAGEMENT", title: "エンジニアリングマネジメント", count: "6 ガイド", cards: 6 },
      { kicker: "ENGINEERING LEADERSHIP", title: "リーダーシップ", count: "7 ガイド", cards: 7 },
      { kicker: "TEAM BUILDING", title: "チームビルディング", count: "9 ガイド", cards: 9 },
    ]);
  });

  it("MORE TO COME のカードはセクションの外に 1 つだけ置く", () => {
    // 各セクション末尾に複製すると、同じ案内が 4 回並ぶ。
    const wrapper = mountPage();

    expect(wrapper.findAll(".guide-card-coming")).toHaveLength(1);
    expect(wrapper.findAll("[data-testid='guide-category-section'] .guide-card-coming")).toHaveLength(0);
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
    // カテゴリーセクション、MORE TO COMEカード、学習テーマが h3。カードの見出しはその下の h4。
    expect(wrapper.findAll("h3").map((heading) => heading.text())).toEqual([
      "プロジェクトマネジメント",
      "エンジニアリングマネジメント",
      "リーダーシップ",
      "チームビルディング",
      "学びの領域を拡張していきます",
      "体系的に理解する",
      "実務の判断に活かす",
      "次のキャリアを描く",
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
