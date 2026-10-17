// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/msp-foundation-5th-edition-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "MSP Foundation, 5th edition 完全学習ガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに ― MSPとは何か",
  "試験の全体像",
  "プログラム・プロジェクト・ポートフォリオの違い",
  "MSPフレームワークの全体構造",
  "7つの原則(Principles)",
  "7つのテーマ(Themes)",
  "プログラムライフサイクル: 7つのプロセス",
  "ガバナンスと組織構造",
  "ベネフィット管理の実践",
  "リスク・課題・意思決定管理",
  "アシュアランスと三線防御モデル",
  "テーラリング ― 組織・状況への適応",
  "テーマ・プロセス別ベストプラクティスチェックリスト",
  "よくある落とし穴(アンチパターン)",
  "用語集",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "5th edition での主な変更点",
  "Organization テーマ(組織)",
  "Design テーマ(デザイン)",
  "Justification テーマ(正当化)",
  "Structure テーマ(構造)",
  "Knowledge テーマ(知識)",
  "Assurance テーマ(アシュアランス)",
  "Decisions テーマ(意思決定)",
  "Identify the Programme(プログラムを識別する)― 一度きり",
  "Design the Outcomes(アウトカムをデザインする)― サイクリック",
  "Plan Progressive Delivery(段階的デリバリーを計画する)― サイクリック",
  "Deliver the Capabilities(ケイパビリティを届ける)― サイクリック",
  "Embed the Outcomes(アウトカムを定着させる)― サイクリック",
  "Evaluate New Information(新しい情報を評価する)― サイクリック",
  "Close the Programme(プログラムをクローズする)― 一度きり",
  "用語の定義",
  "ベネフィット実現の流れ",
  "主要な管理文書",
  "リスクと課題の違い",
  "意思決定の階層",
  "Organizationテーマ",
  "Designテーマ",
  "Justificationテーマ",
  "Structureテーマ",
  "Knowledgeテーマ",
  "Assuranceテーマ",
  "Decisionsテーマ",
  "プロセス全体",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "what-is-msp",
  "exam-overview",
  "programme-project-portfolio",
  "framework-structure",
  "principles",
  "themes",
  "lifecycle",
  "governance",
  "benefits",
  "risk-decisions",
  "assurance",
  "tailoring",
  "checklist",
  "anti-patterns",
  "glossary",
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
  "SECTION 12",
  "SECTION 13",
  "SECTION 14",
  "SECTION 15",
  "SECTION 16",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "http://www.know-how-what.com/Home/news-detail/key-roles-in-managing-successful-programmes-5th-edition",
  "https://aaronpercival.substack.com/p/innovate-iterate-integrate",
  "https://acumon.com/blog/three-lines-of-defence-model/",
  "https://goodelearning.com/msp-5th-edition-whats-changed-about-managing-successful-programmes/",
  "https://hennyportman.wordpress.com/2020/10/07/brief-comparison-between-msp-5th-edition-and-msp-2011-edition/",
  "https://pdcaconsulting.com/wp-content/uploads/2025/03/MSP-Summary-v5.pdf",
  "https://trustedinstitute.com/flashcards/msp-foundation/the-msp-processes-and-programme-lifecycle/",
  "https://umbrex.com/resources/frameworks/project-management-frameworks/msp-managing-successful-programmes/",
  "https://www.1worldtraining.com/book/live-online/3-days-live-online/msp-foundation-live-online-and-official-peoplecert-certification-exam-course-code-mspfnd-l/",
  "https://www.avtechcn.com/pdf/M-S-P-5th-Edition-Practitioner_Candidate_Syllabus.pdf",
  "https://www.good-governance.org.uk/publications/insights/the-three-lines-of-defence-for-assurance-and-reassurance",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-foundation-5th-edition-2930",
  "https://www.pmtoday.co.uk/msp-5th-edition-the-what-where-and-why/",
  "https://www.tecknologia.co.uk/home/book-detail/managing-successful-programmes-(msp)-manual",
  "https://www.theknowledgeacademy.com/blog/msp-blueprint/",
  "https://www.theknowledgeacademy.com/courses/msp-training/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
A["組織の戦略目標"] --> B["ポートフォリオ 複数のプログラム・プロジェクトの集合"]
B --> C["プログラム1 アウトカムとベネフィットの実現"]
B --> D["プログラム2 アウトカムとベネフィットの実現"]
C --> E["プロジェクトA アウトプットの提供"]
C --> F["プロジェクトB アウトプットの提供"]
C --> G["その他の活動 BAUへの移行支援など"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B box;
class C,D box;
class E,F,G done;`,
  `flowchart TB
subgraph P["原則 Principles ― 常に守るべき指針"]
direction LR
P1["Lead with purpose"]
P2["Collaborate across boundaries"]
P3["Deal with ambiguity"]
P4["Align with priorities"]
P5["Deploy diverse skills"]
P6["Realize measurable benefits"]
P7["Bring pace and value"]
end
subgraph T["テーマ Themes ― ガバナンスの仕組み"]
direction LR
T1["Organization"]
T2["Design"]
T3["Justification"]
T4["Structure"]
T5["Knowledge"]
T6["Assurance"]
T7["Decisions"]
end
subgraph PR["プロセス Processes ― ライフサイクルの経路"]
direction LR
PR1["Identify"]
PR2["Design"]
PR3["Plan"]
PR4["Deliver"]
PR5["Embed"]
PR6["Evaluate"]
PR7["Close"]
end
P -->|"ガバナンスに落とし込む"| T
T -->|"実践に移す"| PR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P1,P2,P3,P4,P5,P6,P7,T1,T2,T3,T4,T5,T6,T7,PR1,PR2,PR3,PR4,PR5,PR6,PR7 box;`,
  `flowchart TB
TH["7つのテーマ ライフサイクル全体を通じて並行・継続的に適用 適用の順序はない"]
TH --- O["Organization 誰が意思決定するか"]
TH --- D["Design どんな未来を目指すか"]
TH --- J["Justification 投資として妥当か"]
TH --- S["Structure どう計画・実行するか"]
TH --- K["Knowledge 何を学び蓄積するか"]
TH --- A["Assurance 本当に正しく進んでいるか"]
TH --- DE["Decisions どう意思決定するか"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class O,D,J,S,K,A,DE box;
class TH hub;`,
  `flowchart TB
SG["Sponsoring Group スポンサリンググループ"] --> PB["Programme Board プログラムボード"]
PB --> SRO["SRO Senior Responsible Owner"]
PB --> PM["Programme Manager"]
PB --> BCM["Business Change Manager"]
PB --> POL["Programme Office Lead"]
PM --> PO["Programme Office 情報のハブ"]
PM --> PR1["プロジェクト1"]
PM --> PR2["プロジェクト2"]
BCM --> BAU["ビジネス部門 BAUへの定着"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SG,PB,PM,BCM,POL,PR1,PR2,BAU box;
class SRO,PO hub;`,
  `flowchart LR
V["Vision 望ましい未来の姿"] --> TOM["Target Operating Model 役割・文化・プロセス・技術・ 情報とデータ・知識と学習"]
TOM --> BM["Benefits Map アウトプット→アウトカム→ベネフィット"]
BM --> R["初期リスクの識別と優先順位づけ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class V,TOM,BM,R box;`,
  `flowchart TB
E["事象の発生"] --> Q{"種類は？"}
Q -->|"将来のリスク"| RR["Risk Register に登録"]
Q -->|"既に発生した課題"| IR["Issue Register に登録"]
RR --> DA["Decision-Making Approach に基づき対応レベルを判断"]
IR --> DA
DA -->|"プロジェクトレベルで対応可能"| PJ["プロジェクトチームで解決"]
DA -->|"プログラムへの影響が大きい"| PB2["Programme Boardへエスカレーション"]
PJ --> DR["Decision Register に記録"]
PB2 --> DR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class E,RR,IR,PJ,DR box;
class Q,DA,PB2 hub;`,
  `flowchart TB
M["プログラムマンデート"] --> P1["1. Identify the Programme プログラムを識別する"]
P1 --> GATE1{"認可の判断"}
GATE1 -->|"Go"| P2
GATE1 -->|"No-Go 認可されず"| P7
subgraph CYCLE["トランシェごとに繰り返すサイクル"]
direction TB
P2["2. Design the Outcomes アウトカムをデザインする"]
P3["3. Plan Progressive Delivery 段階的デリバリーを計画する"]
P4["4. Deliver the Capabilities ケイパビリティを届ける"]
P5["5. Embed the Outcomes アウトカムを定着させる"]
P6["6. Evaluate New Information 新しい情報を評価する"]
P2 --> P3 --> P4 --> P5 --> P6
end
P6 --> GATE2{"継続判断 Go・No-Go"}
GATE2 -->|"Go 次のトランシェへ"| P2
GATE2 -->|"No-Go 目標達成 または これ以上の投資価値なし"| P7["7. Close the Programme プログラムをクローズする"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class M,P1,P2,P3,P4,P5,P6 box;
class GATE1,GATE2 hub;
class P7 done;`,
  `flowchart TB
CG["Corporate Governing Body and Audit Committee 企業の統治機関"] --> SG["Sponsoring Group スポンサリンググループ"]
SG --> PB["Programme Board プログラムボード"]
PB --> DEL["Deliver the Capabilities プロジェクト群によるアウトプット提供"]
PB --> BO["Business Operations BCMを通じたビジネス運用への定着"]
BO -.->|"実績・課題のフィードバック"| CG

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SG,PB,DEL,BO box;
class CG hub;`,
  `flowchart LR
OUT["アウトプット プロジェクトの成果物"] --> OC["アウトカム 業務・行動の変化"]
OC --> BEN["ベネフィット 測定可能な改善"]
BEN --> OBJ["組織目標への貢献"]
OC -.->|"意図しない場合"| DIS["ディスベネフィット 測定可能な悪化"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class OUT,OC,BEN,OBJ box;
class DIS hub;`,
  `flowchart TB
L1["第1線 現場のマネジメント プロジェクト・プログラムの 日常的なマネジメントコントロール"]
L2["第2線 監視機能 リスク管理・品質管理・ コンプライアンス機能による監督"]
L3["第3線 独立監査 内部監査など、 第1線・第2線から独立した保証"]
L1 --> L2 --> L3
L3 -.->|"経営層・監査委員会への報告"| GOV["Corporate Governing Body"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class L1,L2,L3 box;
class GOV hub;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS: Readonly<Record<string, number>> = {
  source: 16,
  practice: 15,
  note: 1,
};

const EXPECTED_CALLOUT_LABELS: Readonly<Record<string, Readonly<Record<string, number>>>> = {
  source: {
    ソース: 16,
  },
  practice: {
    ベストプラクティス: 14,
    "ベストプラクティス(プロセス全体を通じて)": 1,
  },
  note: {
    注記: 1,
  },
};

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "MSP® Foundation 5th edition 完全学習ガイド | Managing Successful Programmes";
const EXPECTED_SEO_DESCRIPTION =
  "PeopleCert MSP Foundation, 5th edition の出題範囲を、初学者向けにステップバイステップで解説した日本語の学習ガイド。";

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/msp-foundation-5th-edition-guide.vue",
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
  seoTitleFragments: ["MSP", "Foundation"],
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});

describe("pages/msp-foundation-5th-edition-guide.vue (固有契約)", () => {
  it("Hero の lede テキストが原本と一致する", () => {
    const wrapper = mountPage();
    const lede = wrapper.find(".hero-lede");
    expect(lede.exists()).toBe(true);
    expect(lede.text().trim()).toContain(
      "Managing Successful Programmes(プログラムマネジメント)― 初学者向け・出題範囲対応版"
    );
  });

  it("4つの stat-card が正しい数値とラベルで描画される", () => {
    const wrapper = mountPage();
    const cards = wrapper.findAll(".stat-card");
    expect(cards).toHaveLength(4);
    const expectedStats = [
      { number: "7", label: "原則(Principles)" },
      { number: "7", label: "テーマ(Themes)" },
      { number: "7", label: "プロセス(Processes)" },
      { number: "60問", label: "60分・合格基準60%" },
    ];
    cards.forEach((card, i) => {
      expect(card.find(".stat-number").text().trim()).toBe(expectedStats[i]!.number);
      expect(card.find(".stat-label").text().trim()).toBe(expectedStats[i]!.label);
    });
  });

  it("8つのテーブルがすべて table-wrap で包まれ描画される", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll(".table-wrap table");
    expect(tables).toHaveLength(8);
  });

  it("商標・免責フッターが存在する", () => {
    const wrapper = mountPage();
    const footer = wrapper.find("footer");
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain("PeopleCert groupの登録商標");
  });
});
