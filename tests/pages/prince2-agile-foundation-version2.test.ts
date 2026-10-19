// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/prince2-agile-foundation-version2.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "PRINCE2 Agile Foundation (Version 2) 学習ガイド"
] as const;

const EXPECTED_H2 = [
  "この資格について",
  "第1部: PRINCE2 の基礎知識 (Learning Outcome 1)",
  "第2部: PRINCE2 Agile の基本概念 (Learning Outcome 2)",
  "第3部: 原則・テーマ・プロセス・管理プロダクトのアジャイルへの適用 (Learning Outcome 3)",
  "第4部: アジャイルの実践用語と技法 (Learning Outcome 4)",
  "第5部: フォーカスエリア (Learning Outcome 5)",
  "第6部: 試験対策",
  "付録: 用語集まとめ表",
  "参考文献・出典"
] as const;

const EXPECTED_H3 = [
  "0.1 資格の位置づけ",
  "0.2 試験概要",
  "0.3 出題範囲 (Learning Outcome) の全体像",
  "0.4 学習の全体マップ",
  "1.1 プロジェクトと PRINCE2 の基本概念",
  "1.2 PRINCE2 の7つのプリンシプル (原則)",
  "1.3 PRINCE2 の7つのテーマ",
  "1.4 PRINCE2 の7つのプロセス",
  "1.5 PRINCE2 の主要な管理プロダクト",
  "1.6 PRINCE2 の主要ロール",
  "2.1 PRINCE2 Agile とは何か / プロジェクトと BAU",
  "2.2 PRINCE2 Agile と親和性の高いアジャイル手法",
  "2.3 「ブレンドとウィーブ」と8つのガイダンスポイント",
  "2.4 PRINCE2 Agile デリバリーチームのロール",
  "3.1 アジャイル文脈での PRINCE2 原則",
  "3.2 PRINCE2 Agile の5つの振る舞い (Behaviours)",
  "3.3 テーマごとのアジャイルガイダンス",
  "3.4 プロセスごとのアジャイルガイダンス",
  "3.5 管理プロダクトのテーラリング",
  "3.6 何を固定し何を柔軟にするか: ヘキサゴンと5つのターゲット",
  "4.1 用語集 (Glossary)",
  "4.2 主要なアジャイルの概念と技法",
  "5.1 Agilometer (アジロメーター)",
  "5.2 Requirements (要求事項の優先順位付け)",
  "5.3 Rich Communication (リッチコミュニケーション)",
  "5.4 Frequent Releases (頻繁なリリース)",
  "6.1 出題形式のおさらい",
  "6.2 学習の進め方(ステップバイステップ)",
  "6.3 頻出のひっかけパターン"
] as const;

const EXPECTED_H4 = [
  "4.2.1 Scrum (スクラム)",
  "4.2.2 Kanban (カンバン)",
  "4.2.3 Lean Startup と MVP",
  "4.2.4 レトロスペクティブ (Retrospectives)",
  "4.2.5 ユーザーストーリーと Definition of Ready / Done",
  "4.2.6 ワークショップ (Workshops)",
  "4.2.7 バーンチャート (Burn Charts)",
  "4.2.8 アジャイル見積り (ポイントと T シャツサイジング)",
  "4.2.9 ワーキングアグリーメント (Working Agreements)",
  "8.1 公式・一次情報源",
  "8.2 補足・研修プロバイダ資料(非公式・参考情報)"
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "about-the-exam",
  "prince2-fundamentals",
  "prince2-agile-basics",
  "agile-tailoring",
  "agile-glossary-techniques",
  "focus-areas",
  "exam-preparation",
  "glossary-summary",
  "references"
] as const;

const EXPECTED_SECTION_EYEBROWS = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.oxfordcollegeofmanagement.com/wp-content/uploads/2025/06/PRINCE2-Agile-Foundation-Syllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://publications.axelos.com/PRINCE2Agile2016/content.aspx?showNav=true&expandNav=true&page=PRA_25",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://publications.axelos.com/PRINCE2Agile2016/",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://publications.axelos.com/PRINCE2Agile2016/",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074",
  "https://publications.axelos.com/PRINCE2Agile2016/content.aspx?showNav=true&expandNav=true&page=PRA_25",
  "https://publications.axelos.com/PRINCE2Agile2016/",
  "https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf",
  "https://www.oxfordcollegeofmanagement.com/wp-content/uploads/2025/06/PRINCE2-Agile-Foundation-Syllabus.pdf",
  "https://www.projex.com/important-points-about-prince2-7-with-agile/",
  "https://www.brendanmartin.com/prince2-agile/",
  "https://www.whatisprince2.net/agile/prince2-agile"
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 27,
  source: 22,
  note: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 27,
  },
  source: {
    ソース: 22,
  },
  note: {
    補足: 2,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\n    F[\"PRINCE2 Agile Foundation (Version 2)\"] --> P[\"PRINCE2 Agile Practitioner (Version 2)\"]\n    P --> E[\"PRINCE2 Agile Expert (Foundation + Practitioner 取得で到達)\"]\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class F hub;\n    class P box;\n    class E done;",
  "flowchart TB\n    DP[\"Directing a Project (プロジェクト指揮)\"]\n    SU[\"Starting up a Project (立ち上げ)\"] --> IP[\"Initiating a Project (開始)\"]\n    IP --> CS[\"Controlling a Stage (ステージ管理)\"]\n    CS --> MP[\"Managing Product Delivery (プロダクト提供管理)\"]\n    MP --> CS\n    CS --> SB[\"Managing a Stage Boundary (ステージ境界管理)\"]\n    SB --> CS\n    SB --> CP[\"Closing a Project (プロジェクト終結)\"]\n    DP --- SU\n    DP --- IP\n    DP --- CS\n    DP --- SB\n    DP --- CP\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class DP hub;\n    class SU,IP,CS,MP,SB box;\n    class CP done;",
  "flowchart TB\n    subgraph L1[\"プロジェクト指揮 (Project Direction)\"]\n        A1[\"PRINCE2: プロジェクトボードによるガバナンスと意思決定\"]\n    end\n    subgraph L2[\"プロジェクトマネジメント (Project Management)\"]\n        A2[\"PRINCE2: プロセスとテーマによる管理の枠組み\"]\n        A3[\"Agile: タイムボックス化された計画とレビュー\"]\n    end\n    subgraph L3[\"プロダクトデリバリー (Product Delivery)\"]\n        A4[\"Agile: Scrum / Kanban によるチームの日々の実行\"]\n    end\n    L1 --> L2\n    L2 --> L3\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A1 hub;\n    class A2,A3 box;\n    class A4 done;",
  "flowchart LR\n    PB[\"プロダクトバックログ\"] --> SP[\"スプリントプランニング\"]\n    SP --> SB2[\"スプリントバックログ\"]\n    SB2 --> DS[\"デイリースタンドアップ\"]\n    DS --> INC[\"インクリメント (動くプロダクト)\"]\n    INC --> SR[\"スプリントレビュー\"]\n    SR --> RETRO[\"スプリントレトロスペクティブ\"]\n    RETRO --> SP\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    class PB hub;\n    class SP,SB2,DS,INC,SR,RETRO box;",
  "flowchart LR\n    TODO[\"To Do\"] --> DOING[\"Doing (WIP制限あり)\"]\n    DOING --> REVIEW[\"Review\"]\n    REVIEW --> DONE[\"Done\"]\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class TODO hub;\n    class DOING,REVIEW box;\n    class DONE done;",
  "flowchart LR\n    B[\"構築 (Build)\"] --> M[\"計測 (Measure)\"]\n    M --> L[\"学習 (Learn)\"]\n    L --> B\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    class B hub;\n    class M,L box;",
  "flowchart TB\n    FA[\"4つのフォーカスエリア\"] --> AG[\"Agilometer\"]\n    FA --> RQ[\"Requirements (要求事項の優先順位付け)\"]\n    FA --> RC[\"Rich Communication\"]\n    FA --> FR[\"Frequent Releases\"]\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    class FA hub;\n    class AG,RQ,RC,FR box;",
  "flowchart TB\n    S1[\"Step 1: 第1部で PRINCE2 の土台(原則・テーマ・プロセス・管理プロダクト・ロール)を固める\"] --> S2[\"Step 2: 第2部で PRINCE2 Agile 固有の考え方(ブレンドとウィーブ、8つのガイダンスポイント)を理解する\"]\n    S2 --> S3[\"Step 3: 第3部で原則・テーマ・プロセス・管理プロダクトのアジャイル適用を、対応表として覚える\"]\n    S3 --> S4[\"Step 4: 第4部で用語と技法を、実際の文脈の中で使えるレベルまで定着させる\"]\n    S4 --> S5[\"Step 5: 第5部のフォーカスエリアを押さえ、模擬問題でシナリオ形式に慣れる\"]\n\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class S1 hub;\n    class S2,S3,S4 box;\n    class S5 done;"
] as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/prince2-agile-foundation-version2.vue",
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
  seoTitleFragments: ["PRINCE2", "Agile", "Foundation"],
  seoTitle: "PRINCE2 Agile Foundation (Version 2) 学習ガイド | PeopleCert公式シラバス準拠",
  seoDescription: "PeopleCert PRINCE2 Agile Foundation (Version 2) 試験の出題範囲を、初学者向けにステップバイステップで解説する学習ガイド。7原則・7テーマ・7プロセスのアジャイル適用、Agilometer、MoSCoWなどをMermaid図解付きで網羅。",
});

describe("pages/prince2-agile-foundation-version2.vue (固有契約)", () => {
  it("Hero の lede テキストが原本と一致する", () => {
    const wrapper = mountPage();
    const lede = wrapper.find(".hero-lede");
    expect(lede.exists()).toBe(true);
    expect(lede.text()).toContain("初学者向け・ステップバイステップ解説 / Markdown + Mermaid図解版");
  });

  it("4つの stat-card が正しい数値とラベルで描画される", () => {
    const wrapper = mountPage();
    const cards = wrapper.findAll(".stat-card");
    expect(cards).toHaveLength(4);
    expect(cards.map((c) => c.find(".stat-number").text())).toEqual([
      "40問",
      "60分",
      "60%",
      "3年",
    ]);
    expect(cards.map((c) => c.find(".stat-label").text())).toEqual([
      "四肢択一 (Objective Test Question)",
      "クローズドブック",
      "合格基準",
      "認定有効期間",
    ]);
  });

  it("23個のテーブルがすべて table-wrap で包まれ描画される", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(23);
    for (const table of tables) {
      expect(table.element.parentElement?.classList.contains("table-wrap")).toBe(true);
    }
  });

  it("免責事項ボックス (disclaimer-box) が正しく描画される", () => {
    const wrapper = mountPage();
    const disclaimer = wrapper.find(".disclaimer-box");
    expect(disclaimer.exists()).toBe(true);
    expect(disclaimer.text()).toContain("本ガイドは学習支援を目的とした非公式の解説資料です");
  });

  it("商標・免責フッターが存在する", () => {
    const wrapper = mountPage();
    const footer = wrapper.find("footer");
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain("PRINCE2® および PRINCE2 Agile® は AXELOS Limited の登録商標です");
  });
});
