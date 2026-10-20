// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/msp-practitioner-5th-edition-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "MSP® プラクティショナー(第5版)学習ガイド ― 初学者のための実践適用ステップバイステップ解説",
] as const;

const EXPECTED_H2 = [
  "はじめに:MSPプラクティショナーとは何か",
  "試験概要",
  "MSPの全体構造:3つのレンズ",
  "7つの原則(Principles)とその実践適用",
  "プログラム組織とガバナンス構造",
  "7つのテーマ(Themes)詳細解説",
  "7つのプロセス(プログラムライフサイクル)",
  "テーラリング(Tailoring):MSPを現場に合わせる",
  "プラクティショナー試験対策:シナリオ適用のコツ",
  "ベストプラクティス総まとめ表",
  "参考文献・出典(ソースURL)",
] as const;

const EXPECTED_H3 = [
  "4.1 各原則の意味とPractitionerレベルの適用ポイント",
  "6.1 Organization(組織)テーマ",
  "6.2 Design(設計)テーマ",
  "6.3 Justification(正当化)テーマ",
  "6.4 Structure(構造)テーマ",
  "6.5 Knowledge(知識)テーマ",
  "6.6 Assurance(保証)テーマ",
  "6.7 Decisions(意思決定)テーマ",
  "プロセス別サマリー表",
  "7.1 各プロセスの詳細とベストプラクティス",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "what-is-msp-practitioner",
  "exam-overview",
  "three-lenses",
  "principles",
  "governance-structure",
  "themes",
  "lifecycle",
  "tailoring",
  "exam-tips",
  "best-practices",
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
  "SECTION 11",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://aaronpercival.substack.com/p/innovate-iterate-integrate",
  "https://axelos.com/resource-hub/blog/msp-5th-edition-what-has-changed",
  "https://eapad.dk/?p=6228",
  "https://goodelearning.com/articles/what-is-msp/",
  "https://goodelearning.com/msp-5th-edition-whats-changed-about-managing-successful-programmes/",
  "https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/",
  "https://ilxgroup.com/uk/training/msp/practitioner",
  "https://www.finance-ni.gov.uk/articles/programme-board",
  "https://www.finance-ni.gov.uk/articles/senior-responsible-owner",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-foundation-5th-edition-2930",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932",
  "https://www.theknowledgeacademy.com/za/courses/msp-training/msp-training/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
accTitle: MSP の 3 つのレンズの関係
accDescr: 原則はテーマに方向性を与え、テーマはプロセスの各工程で適用され、プロセスは実践を通じて原則の実現度を検証する循環構造を示す。
subgraph L1["レンズ1: 原則 Principles"]
P["7つの普遍的な指針 プログラム全体を貫く価値観"]
end
subgraph L2["レンズ2: テーマ Themes"]
T["7つの統治領域 継続的に対処し続ける管理側面"]
end
subgraph L3["レンズ3: プロセス Processes"]
PR["7つのライフサイクル工程 段階的・循環的な進め方"]
end

P -->|"方向性を与える"| T
T -->|"各工程で適用される"| PR
PR -->|"実践を通じて 原則の実現度を検証"| P

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class P box
class T hub
class PR done`,
  `flowchart TB
accTitle: MSP プログラムの組織構造
accDescr: スポンサリンググループが SRO を任命し、SRO の下にプログラムボードが置かれる。ボードの下にプログラムマネージャーとビジネスチェンジマネージャーが並び、プログラムマネージャーはプログラムオフィスと構成プロジェクト群を統括する。ビジネスチェンジマネージャーはベネフィット実現の説明責任をボードへ負う。
SG["Sponsoring Group スポンサリンググループ  戦略的な投資判断・SROの任命"]
SRO["Senior Responsible Owner  SRO プログラム全体の説明責任を負う 単一の説明責任者 Accountable Owner"]
PB["Programme Board プログラムボード  SROの意思決定を支援"]
PM["Programme Manager プログラムマネージャー  日常運営・プロジェクト群の統合"]
BCM["Business Change Manager(s) ビジネスチェンジマネージャー  ベネフィット実現・業務側の変革"]
PO["Programme Office プログラムオフィス  情報管理・支援機能"]
PROJ["構成プロジェクト群 Constituent Projects"]

SG --> SRO
SRO --> PB
PB --> PM
PB --> BCM
PM --> PO
PM --> PROJ
BCM -.->|"ベネフィット実現の 説明責任"| PB

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
class SG,SRO box
class PB,PM,BCM,PO,PROJ hub`,
  `flowchart LR
accTitle: MSP の 7 つのテーマ
accDescr: 組織、設計、正当化、構造、知識、保証、意思決定の 7 テーマを順に並べ、意思決定から組織へ戻る点線で、すべてのテーマが並行して継続的に機能することを示す。
O["Organization 組織"] --> D["Design 設計"]
D --> J["Justification 正当化"]
J --> S["Structure 構造"]
S --> K["Knowledge 知識"]
K --> A["Assurance 保証"]
A --> DE["Decisions 意思決定"]
DE -.->|"すべてのテーマは 並行して継続的に機能する"| O

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
class O,D,J,S,K,A,DE box`,
  `flowchart TB
accTitle: MSP プログラムのライフサイクル
accDescr: プログラムの着想から①特定、②成果の設計、③段階的デリバリーの計画、④ケイパビリティの提供、⑤成果の定着、⑥新しい情報の評価へ進む。⑥で継続なら次のトランシェとして②へ戻り、完了または中止と判断すれば⑦終結を経て運用へ完全移行する。
START(["プログラムの着想"]) --> P1["① Identify the Programme プログラムを特定する"]
P1 --> P2["② Design the Outcomes 成果を設計する"]
P2 --> P3["③ Plan Progressive Delivery 段階的デリバリーを計画する"]
P3 --> P4["④ Deliver the Capabilities ケイパビリティを提供する"]
P4 --> P5["⑤ Embed the Outcomes 成果を定着させる"]
P5 --> P6["⑥ Evaluate New Information 新しい情報を評価する"]
P6 -->|"継続: 次のトランシェへ"| P2
P6 -->|"完了/中止判断"| P7["⑦ Close the Programme プログラムを終結する"]
P7 --> END(["プログラム終了 運用への完全移行"])

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class P1,P2 box
class P3,P4,P5,P6 hub
class P7 done`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 16,
  practice: 4,
  note: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: {
    ソース: 16,
  },
  practice: {
    ベストプラクティス: 4,
  },
  note: {
    補足: 2,
  },
} as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/msp-practitioner-5th-edition-guide.vue",
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
  stepTags: [],
  seoTitleFragments: ["MSP", "Practitioner"],
  seoTitle: "MSP® Practitioner 第5版 完全ガイド | 実践適用ステップバイステップ解説",
  seoDescription:
    "MSP Practitioner 5th edition の原則・テーマ・プロセスを、シナリオ適用とテーラリングの視点で学ぶ初学者向けガイド",
});

describe("pages/msp-practitioner-5th-edition-guide.vue (固有契約)", () => {
  it("Hero の lede テキストが原本と一致する", () => {
    const wrapper = mountPage();
    const lede = wrapper.find(".hero-lede");
    expect(lede.exists()).toBe(true);
    expect(lede.text()).toContain("MSP® Practitioner, 5th edition");
    expect(lede.text()).toContain("PeopleCert / 旧AXELOS");
  });

  it("4つの stat-card が正しい数値とラベルで描画される", () => {
    const wrapper = mountPage();
    const cards = wrapper.findAll(".stat-card");
    expect(cards).toHaveLength(4);

    const stats = cards.map((c) => ({
      number: c.find(".stat-number").text().trim(),
      label: c.find(".stat-label").text().trim(),
    }));

    expect(stats).toEqual([
      { number: "58問 / 70点", label: "オープンブックのオブジェクティブテスト" },
      { number: "150分", label: "試験時間" },
      { number: "60%", label: "合格基準" },
      { number: "7 / 7 / 7", label: "原則・テーマ・プロセス" },
    ]);
  });

  it("9つのテーブルがすべて table-wrap で包まれ描画される", () => {
    const wrapper = mountPage();
    const tableWraps = wrapper.findAll(".table-wrap");
    expect(tableWraps).toHaveLength(9);
    for (const wrap of tableWraps) {
      expect(wrap.find("table").exists()).toBe(true);
      expect(wrap.find("thead th").exists()).toBe(true);
      expect(wrap.find("tbody td").exists()).toBe(true);
    }
  });

  it("商標・免責フッターが存在する", () => {
    const wrapper = mountPage();
    const footer = wrapper.find("footer");
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain("PeopleCert International Limited");
    expect(footer.text()).toContain("非公式の学習資料");
  });

  it("7.1 各プロセスの詳細とベストプラクティス（Section 07）が process-grid と process-card（7件）で構造化されている", () => {
    const wrapper = mountPage();
    const lifecycle = wrapper.find("#lifecycle");
    expect(lifecycle.exists()).toBe(true);
    const grid = lifecycle.find(".process-grid");
    expect(grid.exists()).toBe(true);
    const cards = grid.findAll(".process-card");
    expect(cards).toHaveLength(7);
    const expectedTitles = [
      "① Identify the Programme(プログラムを特定する)",
      "② Design the Outcomes(成果を設計する)",
      "③ Plan Progressive Delivery(段階的デリバリーを計画する)",
      "④ Deliver the Capabilities(ケイパビリティを提供する)",
      "⑤ Embed the Outcomes(成果を定着させる)",
      "⑥ Evaluate New Information(新しい情報を評価する)",
      "⑦ Close the Programme(プログラムを終結する)",
    ];
    cards.forEach((card, index) => {
      expect(card.find(".process-title").text().trim()).toBe(expectedTitles[index]);
      expect(card.findAll(".process-points li").length).toBeGreaterThanOrEqual(2);
    });
  });

  it("プラクティショナー試験対策:シナリオ適用のコツ（Section 09）が step-list（5件）で構造化されている", () => {
    const wrapper = mountPage();
    const examTips = wrapper.find("#exam-tips");
    expect(examTips.exists()).toBe(true);
    const stepList = examTips.find("ol.step-list");
    expect(stepList.exists()).toBe(true);
    const items = stepList.findAll("li");
    expect(items).toHaveLength(5);
    for (const item of items) {
      expect(item.find("strong").exists()).toBe(true);
    }
  });

  it("参考文献・出典（Section 11）が ref-list（12件）と ref-name / ref-url で構造化されている", () => {
    const wrapper = mountPage();
    const references = wrapper.find("#references");
    expect(references.exists()).toBe(true);
    const refList = references.find("ul.ref-list");
    expect(refList.exists()).toBe(true);
    const items = refList.findAll("li");
    expect(items).toHaveLength(12);
    for (const item of items) {
      expect(item.find(".ref-name").exists()).toBe(true);
    }
    // 公式マニュアルは書誌だけを示す（権利者の許諾が確認できない電子書籍サイトへのリンクは置かない）。
    expect(items.filter((item) => !item.find(".ref-url a").exists()).map((item) => item.get(".ref-name").text()))
      .toEqual(["公式マニュアル『Managing Successful Programmes (5th edition)』章立て(原則・各テーマの節構成)"]);
  });

  it("プロセス詳細・試験対策ステップ・参考文献の必須 CSS セレクタが scoped style 内に定義されている", async () => {
    const fs = await import("node:fs/promises");
    const content = await fs.readFile(
      "app/pages/msp-practitioner-5th-edition-guide.vue",
      "utf-8"
    );
    const styleSection = content.slice(content.indexOf("<style scoped>"));

    const REQUIRED_SELECTORS = [
      ".process-grid",
      ".process-card",
      ".process-title",
      ".process-points",
      ".step-list",
      ".step-list li",
      ".step-list li::before",
      ".ref-list",
      ".ref-list li",
      ".ref-list li::before",
      ".ref-list .ref-name",
      ".ref-list .ref-url",
    ];

    for (const selector of REQUIRED_SELECTORS) {
      expect(styleSection).toContain(selector);
    }
  });
});

