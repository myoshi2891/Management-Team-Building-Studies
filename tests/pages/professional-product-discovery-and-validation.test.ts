// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-product-discovery-and-validation.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Product Discovery and Validation™ 認定試験 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドの読み方",
  "第1章: PPDV認定試験の概要",
  "第2章: PPDVの土台となる考え方 — ダブルダイヤモンド",
  "第3章: 問題 vs ソリューション(Problem vs Solution)",
  "第4章: Discovery(発見)技法",
  "第5章: Validation(検証)技法",
  "第6章: Scrumチームでの実践への統合",
  "第7章: よくある誤解・アンチパターン",
  "第8章: 試験対策の進め方",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 PPDVとは何か",
  "1.2 試験の基本情報",
  "1.3 対象者",
  "1.4 公式の学習目標(Course Learning Objectives)",
  "2.1 ダブルダイヤモンドとは",
  "2.2 Discovery(発見)とは何か",
  "3.1 問題・ニーズの定式化",
  "3.2 ビジネス問題ステートメント(Business Problem Statement)",
  "3.3 感情・印象から測定可能な事実へ",
  "4.1 Proto Persona(プロトペルソナ)vs Persona(ペルソナ)",
  "4.2 Customer Journey Map vs User Story Map",
  "4.3 Impact Map(インパクトマップ)",
  "4.4 Empathy Map(エンパシーマップ)",
  "4.5 Value Proposition Canvas(バリュー・プロポジション・キャンバス)",
  "4.6 Curve of Truth(Truth Curve / 真実の曲線)",
  "4.7 Jobs-to-be-Done(JTBD)によるセグメンテーション",
  "5.1 仮説と実験の定式化",
  "5.2 実験技法(Experimentation Techniques)の全体像",
  "5.3 Concierge MVP と Wizard of Oz",
  "5.4 Test Card + Learning Card(Strategyzer)",
  "5.5 導入・行動の測定(Measuring Adoption and Behavior)",
  "5.6 Evidence-Based Management™(EBM)",
  "5.7 Problem-Solution Fit から Product-Market Fit へ",
  "6.1 Discoveryは「フェーズ」ではなく「並行する活動」",
  "6.2 3つの地平線(Three Horizons)",
  "8.1 学習ステップ(推奨の順序)",
  "8.2 出題傾向への向き合い方",
  "8.3 受験の実務情報",
] as const;

const EXPECTED_H4 = [
  "Test Card(実験を設計する)",
  "Learning Card(実験結果を記録する)",
  "Scrum.org 公式ソース",
  "認定研修パートナー(Scrum.org Professional Training Network)",
  "各技法の原典・一次情報源",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "how-to-use",
  "ppdv-overview",
  "double-diamond",
  "problem-vs-solution",
  "discovery-techniques",
  "validation-techniques",
  "scrum-integration",
  "myths-antipatterns",
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
  "SECTION 08",
  "SECTION 09",
  "SECTION 10",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-product-discovery-and-validation-certification",
  "https://www.scrum.org/courses/professional-product-discovery-and-validation-training",
  "https://www.credly.com/org/scrum-org/badge/professional-product-discovery-and-validation",
  "https://scrumdojo.cz/en/courses/professional-product-discovery-and-validation",
  "https://www.designcouncil.org.uk/resources/framework-for-innovation/",
  "https://www.scrum.org/resources/blog/product-discovery-and-validation-scrum",
  "https://gojko.net/books/impact-mapping/",
  "https://openpracticelibrary.com/practice/impact-mapping/",
  "https://xplane.com/the-empathy-map-a-human-centered-tool-for-understanding-how-your-audience-thinks/",
  "https://www.strategyzer.com/library/value-proposition-design-book-summary",
  "https://jeffgothelf.com/blog/the-truth-curve/",
  "https://www.library.hbs.edu/working-knowledge/clay-christensens-milkshake-marketing",
  "https://www.jpattonassociates.com/story-mapping/",
  "https://www.shortform.com/blog/concierge-mvp/",
  "https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card",
  "https://www.strategyzer.com/library/capture-customer-insights-and-actions-with-the-learning-card",
  "https://assets.strategyzer.com/assets/resources/the-test-card.pdf",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.scrum.org/resources/evidence-based-management-guide",
  "https://www.scrum.org/resources/blog/dispelling-myths-product-discovery-scrum",
  "https://www.scrum.org/resources/scrumorg-launches-new-professional-product-ownership-initiative-aligning-evolution-agility",
  "https://podcasts.scrum.org/872401/episodes/15736683-the-creation-of-the-professional-product-discovery-and-validation-course",
  "https://academy.xebia.com/training/professional-product-discovery-validation-ppdv/",
  "https://responsiveadvisors.com/professional-scrum-training/professional-product-discovery-and-validation-training/",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 4,
  source: 8,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 4,
  },
  source: {
    ソース: 8,
  },
} as const;

const EXPECTED_STEP_TAGS = ["1", "2", "3", "4", "5"] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
subgraph DD1["第1のダイヤモンド: 問題空間"]
direction LR
A["Discover 発散: 広く探索する"] --> B["Define 収束: 問題を定義する"]
end
subgraph DD2["第2のダイヤモンド: 解決空間"]
direction LR
C["Develop 発散: 解決策を発想する"] --> E["Deliver 収束: テストし届ける"]
end
B --> C
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,E box;`,
  `journey
title 新規ユーザーのオンボーディング体験の例
section 認知
広告を見る: 3: ユーザー
製品ページを訪問: 4: ユーザー
section 検討
価格を比較する: 2: ユーザー
レビューを読む: 3: ユーザー
section 利用開始
サインアップする: 4: ユーザー
初期設定を行う: 2: ユーザー
section 定着
主要機能を使う: 5: ユーザー`,
  `flowchart TB
Why["Why: ビジネスゴール"] --> Who1["Who: アクターA"]
Why --> Who2["Who: アクターB"]
Who1 --> How1["How: 望む行動変化1"]
Who2 --> How2["How: 望む行動変化2"]
How1 --> What1["What: 施策候補1"]
How1 --> What2["What: 施策候補2"]
How2 --> What3["What: 施策候補3"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Who1,Who2,How1,How2,What1,What2,What3 box;
class Why hub;`,
  `flowchart LR
A["インタビュー"] --> B["ペーパープロトタイプ"]
B --> C["広告出稿 クリック計測"]
C --> D["ランディングページ テスト"]
D --> E["タスク完了テスト ユーザビリティテスト"]
E --> F["プロトタイプ"]
F --> G["事前販売 Pre-selling"]
G --> H["コンシェルジュMVP"]
H --> I["Wizard of Oz"]
I --> J["実製品 / 実事業"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F,G,H,I box;
class J done;`,
  `flowchart LR
Idea["アイデア / 仮説"] --> Build["Build 最小の実験を構築する"]
Build --> Measure["Measure データを計測する"]
Measure --> Learn["Learn 学びを得る"]
Learn -->|"仮説を更新"| Idea
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class Idea,Build,Measure,Learn box;`,
  `flowchart LR
TC["Test Card 仮説とテスト方法を設計"] --> EXP["実験を実施する"]
EXP --> LC["Learning Card 観察と学びを記録"]
LC -->|"意思決定"| NEXT["次のアクション: 継続 / ピボット / 中止"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class TC,EXP,LC box;
class NEXT done;`,
  `flowchart TB
subgraph Market["市場に対する価値(何を届けているか)"]
CV["Current Value 現在の価値"]
UV["Unrealized Value 未実現の価値"]
end
subgraph Org["価値を届ける組織能力(どう届けているか)"]
T2M["Time-to-Market 市場投入までの時間"]
A2I["Ability to Innovate 革新する能力"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class CV,UV box;
class T2M,A2I hub;`,
  `flowchart LR
A["課題の発見 Problem"] --> B{"Problem-Solution Fit 課題と解決策が噛み合っているか"}
B -->|"検証できた"| C["Product-Market Fit 製品と市場が噛み合っているか"]
C --> D["スケール・成長"]
B -->|"検証できない"| A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A box;
class B hub;
class C box;
class D done;`,
  `flowchart TB
subgraph S1["Sprint 1"]
Dis1["Discovery活動"]
Del1["Delivery活動"]
end
subgraph S2["Sprint 2"]
Dis2["Discovery活動"]
Del2["Delivery活動"]
end
subgraph S3["Sprint 3"]
Dis3["Discovery活動"]
Del3["Delivery活動"]
end
Dis1 -.->|"検証済みの気づき"| Del2
Dis2 -.->|"検証済みの気づき"| Del3
Del1 --> Del2
Del2 --> Del3
Dis1 --> Dis2
Dis2 --> Dis3
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Dis1,Dis2,Dis3 hub;
class Del1,Del2,Del3 box;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-product-discovery-and-validation.vue",
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
  seoTitleFragments: ["PPDV", "Professional Product Discovery and Validation"],
  seoTitle:
    "Professional Product Discovery and Validation(PPDV)認定試験 学習ガイド | Scrum.org公式アセスメント",
  seoDescription:
    "Scrum.org Professional Product Discovery and Validation(PPDV)認定試験の初学者向け学習ガイド。ダブルダイヤモンド、Discovery/Validation技法、EBM、ベストプラクティスと一次情報源のURLを解説。",
  allowedHeadingSkips: ["h2 -> h4"],
});

describe("pages/professional-product-discovery-and-validation.vue — 個別検証", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローの統計カードが4件表示されている", () => {
    const wrapper = mountPage();
    const statCards = wrapper.findAll(".stat-card");
    expect(statCards).toHaveLength(4);
    expect(statCards.map((c) => c.find(".stat-number").text())).toEqual([
      "20問",
      "30分",
      "85%以上",
      "生涯有効",
    ]);
    expect(statCards.map((c) => c.find(".stat-label").text())).toEqual([
      "出題数",
      "制限時間",
      "合格ライン",
      "資格の有効期限(失効なし)",
    ]);
  });
});
