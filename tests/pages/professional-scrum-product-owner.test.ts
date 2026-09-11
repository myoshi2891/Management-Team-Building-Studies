// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-product-owner.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum Product Owner™(PSPO I / PSPO II)学習ガイド",
] as const;

const EXPECTED_H2 = [
  "PSPO 認定試験概要とプロダクトオーナーの本質",
  "プロダクトビジョンと戦略(Product Vision & Strategy)",
  "プロダクトバックログ管理と優先順位付け(PBL Management & Ordering)",
  "エビデンスベースドマネジメント(EBM: Evidence-Based Management)",
  "スクラムイベントとプロダクトオーナーの振る舞い",
  "試験対策・頻出シチュエーション問題の解法パターン",
  "参考リソース・公式リンク集",
] as const;

const EXPECTED_H3 = [
  "PSPO 試験とは何か",
  "プロダクトオーナーの唯一の目的：価値の最大化",
  "アウトプットとアウトカムの違い",
  "プロダクトオーナーのアンチパターン",
  "ビジョン・ビジネスゴール・プロダクトゴールの階層構造",
  "ロードマップ設計：フィーチャードリブンからアウトカムドリブンへ",
  "ターゲットユーザーの特定：ペルソナとカスタマージャーニーマップ",
  "プロダクトバックログの原則",
  "価値基準の優先順位付け(Ordering)テクニック",
  "PBI(プロダクトバックログアイテム)の具体化",
  "経験主義に基づく意思決定",
  "4つの Key Value Areas(KVA)",
  "EBM を実務でどう使うか",
  "スプリントプランニング(Sprint Planning)",
  "デイリースクラム(Daily Scrum)",
  "スプリントレビュー(Sprint Review)",
  "スプリントレトロスペクティブ(Sprint Retrospective)",
  "スプリントの中止(Cancelling a Sprint)",
  "ステークホルダーの要望とプロダクトゴールの衝突",
  "開発チームの見積りに対するPOの介入制限",
  "リリース判定基準と「Doneの定義」の満たし方",
  "合格に向けた推奨学習ステップ",
] as const;

const EXPECTED_H4 = [
  "ユーザーストーリーと INVEST 原則",
  "受け入れ基準と Given-When-Then",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "what-is-pspo",
  "vision-and-strategy",
  "backlog-management",
  "evidence-based-management",
  "scrum-events",
  "exam-prep",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 01",
  "SECTION 02",
  "SECTION 03",
  "SECTION 04",
  "SECTION 05",
  "SECTION 06",
  "SECTION 07",
] as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 7,
  note: 1,
  practice: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { ソース: 7 },
  note: { 補足: 1 },
  practice: { ベストプラクティス: 1 },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/professional-scrum-product-owner-certifications",
  "https://www.scrum.org/professional-scrum-product-owner-certifications",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/professional-scrum-product-owner-certifications",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/pathway/product-owner-learning-series",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/pathway/product-owner-learning-series",
  "https://www.scrum.org/resources/evidence-based-management-guide",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/professional-scrum-product-owner-certifications",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/professional-scrum-product-owner-certifications",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/resources/evidence-based-management-guide",
  "https://www.scrum.org/pathway/product-owner-learning-series",
  "https://www.scrum.org/professional-scrum-product-owner-certifications",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart TD\nA[\"プロダクトビジョン 数年単位の世界観\"] --> B[\"ビジネスゴール 組織の戦略目標\"]\nB --> C[\"プロダクトゴール プロダクトの将来状態(北極星)\"]\nC --> D[\"スプリントゴール 1スプリントの単一目的\"]\nD --> E[\"プロダクトバックログアイテム 具体的な作業単位\"]\nE -.->|\"検証・学習をフィードバック\"| C\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A,B,D,E box;\nclass C hub;",
  "flowchart LR\nsubgraph 現在の価値軸\nCV[\"Current Value(CV) 現在提供している価値\"]\nUV[\"Unrealized Value(UV) 未実現の潜在的価値\"]\nend\nsubgraph 価値創出能力軸\nT2M[\"Time to Market(T2M) 価値を届ける速さ\"]\nA2I[\"Ability to Innovate(A2I) 新しい価値を生む組織能力\"]\nend\nCV --- UV\nT2M --- A2I\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass CV,UV box;\nclass T2M,A2I hub;",
  "flowchart LR\nSP[\"Sprint Planning スプリントゴールの提案・交渉\"] --> DS[\"Daily Scrum 参加義務なし・要請時に対応\"]\nDS --> SR[\"Sprint Review フィードバック収集・バックログ調整\"]\nSR --> Retro[\"Sprint Retrospective チームの一員として参加\"]\nRetro -.->|\"次のスプリントへ\"| SP\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass SP,DS,SR,Retro box;",
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-scrum-product-owner.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  seoTitleFragments: ["Professional Scrum Product Owner", "完全ガイド", "PSPO"],
  seoTitle: "PSPO(Professional Scrum Product Owner)認定資格 完全ガイド | 価値最大化の思想から実践プラクティスまで",
  seoDescription:
    "Scrum.org公認 Professional Scrum Product Owner(PSPO I/II)認定試験の出題範囲を、価値最大化の本質からEBM、優先順位付け、スクラムイベントでの振る舞いまで体系的に解説する学習ガイド。",
});

describe("pages/professional-scrum-product-owner.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("[data-testid='sidebar-toggle']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("nav.sidebar").classes()).toContain("open");
  });

  it("テーブルが原本と同じ件数（9件）存在し、すべて .table-wrap で包まれている", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(9);
    expect(wrapper.findAll(".table-wrap table")).toHaveLength(9);
  });

  it("テーブル行の総数が原本と一致する（49行）", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll("tr")).toHaveLength(49);
  });

  it("参考文献リストが適切なリスト構造を持つ", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".ref-list")).toHaveLength(1);
    expect(wrapper.findAll(".ref-list li")).toHaveLength(4);
  });
});
