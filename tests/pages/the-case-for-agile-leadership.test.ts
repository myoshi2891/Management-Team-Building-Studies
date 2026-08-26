// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/the-case-for-agile-leadership.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "アジャイルリーダーシップの必要性を理解する",
] as const;

const EXPECTED_H2 = [
  "まずCAL1全体の中での位置づけを把握する",
  "なぜ今「アジャイルリーダーシップ」が必要なのか",
  "アジャイルリーダーとは何か: 求められるマインドセットシフト",
  "なぜマインドセットの転換が必要なのか: リーダーシップ・アジリティ発展モデル",
  "アジャイルリーダーの4つの重要な行動(ベストプラクティス集)",
  "CAL1コースの構成を理解する(実務情報)",
  "初学者向け: 第1章をステップバイステップで学ぶロードマップ",
  "理解度チェックリスト",
  "まとめ",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 VUCAな事業環境という背景",
  "1.2 従来型リーダーシップの限界",
  "1.3 伝統的リーダーシップとアジャイルリーダーシップの対比",
  "3.1 モデルの全体像: 5段階のリーダーシップ発展",
  "3.2 なぜこのモデルが「アジャイルリーダーシップの必要性」の根拠になるのか",
  "4.1 変化と不確実性をナビゲートする",
  "4.2 チームを信頼する",
  "4.3 実験を奨励する文化を支援する",
  "4.4 スキル開発を提唱する",
] as const;

const EXPECTED_H4 = [
  "出典一覧",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    S["CAL1 4つの学習領域"] --> M1["1 The Case for Agile Leadership 本ガイドの範囲"]
    S --> M2["2 Agile Leadership in Action"]
    S --> M3["3 Leading Agile Teams"]
    S --> M4["4 Leading Agile Organizations"]
    M1 -.->|"土台になる"| M2
    M2 -.->|"土台になる"| M3
    M3 -.->|"土台になる"| M4

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class S hub;
class M1,M2,M3,M4 box;`,
  `flowchart TB
    A["VUCAな事業環境"] --> B["変動性・不確実性・複雑性・曖昧性の増大"]
    B --> C["従来型 指揮命令型 リーダーシップの限界"]
    C --> D["トップダウンの意思決定"]
    C --> E["長期計画への過度な依存"]
    C --> F["統制中心の管理"]
    D --> G["変化への対応遅延"]
    E --> G
    F --> G
    G --> H["アジャイルリーダーシップへの転換"]
    H --> I["自己組織化チームの支援"]
    H --> J["継続的な学習と適応"]
    H --> K["信頼に基づく権限移譲"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class H done;
class B,C,D,E,F,G,I,J,K box;`,
  `flowchart LR
    A["Expert Leader 専門性で貢献する"] --> B["Achiever Leader 成果と戦略で導く"]
    B --> C["Catalyst Leader ビジョンと参加型意思決定"]
    C -.-> D["Co-Creator と Synergist 到達者はごく少数"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D done;`,
  `flowchart TB
    L["アジャイルリーダー"] --> B1["変化と不確実性をナビゲートする"]
    L --> B2["チームを信頼する"]
    L --> B3["実験を奨励する文化を支援する"]
    L --> B4["スキル開発を提唱する"]
    B1 --> O["組織のレジリエンスと成果向上"]
    B2 --> O
    B3 --> O
    B4 --> O

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class L hub;
class B1,B2,B3,B4 box;
class O done;`,
  `flowchart TB
    Pre["事前学習 約1時間の事前課題"] --> D1["Day1 自己内省と自分のリーダーシップスタイル"]
    D1 --> D2["Day2 チームとカルチャーの構築"]
    D2 --> D3["変革のリーダーシップとチェンジモデル"]
    D3 --> Cert["コース参加により認定バッジを取得 試験なし"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Pre hub;
class D1,D2,D3 box;
class Cert done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/agile-leader/cal-1",
  "https://www.pm-partners.com.au/course/certified-agile-leader",
  "https://resources.scrumalliance.org/Article/makes-agile-leader",
  "https://agilemanifesto.org",
  "https://drive.google.com/file/d/1LpDNidfA_r6J2wFvgRhIWfPw_wEnqjiO/view",
  "https://www.researchgate.net/publication/23318406_Leadership_agility",
  "https://www.agileleadershipjourney.com/leadership-journey/leadership-agility",
  "https://www.infoq.com/news/2016/08/certified-agile-leadership",
  "https://www.infoq.com/jp/news/2016/10/certified-agile-leadership",
  "https://6606649.fs1.hubspotusercontent-na1.net/hubfs/6606649/Skills%20in%20the%20New%20World%20of%20Work%20Report%202023.pdf",
] as const;

const EXPECTED_TOC_IDS = [
  "cal1-overview",
  "why-agile-leadership",
  "mindset-shift",
  "leadership-agility-model",
  "four-agile-leader-behaviors",
  "cal1-course-structure",
  "step-by-step-roadmap",
  "understanding-checklist",
  "summary",
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

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 6,
  source: 5,
  note: 4,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: { ベストプラクティス: 6 },
  source: { ソース: 5 },
  note: { 補足: 4 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "CAL1® 第1章ガイド | The Case for Agile Leadership";

const EXPECTED_SEO_DESCRIPTION =
  "Certified Agile Leader® 1(CAL1)の学習領域1「The Case for Agile Leadership」を初学者向けにステップバイステップで解説する非公式ガイド。VUCA環境の背景、リーダーシップ・アジリティモデル、アジャイルリーダーの4つの行動とベストプラクティスを解説します。";

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "CAL1",
  "The Case for Agile Leadership",
] as const;

defineSourceParityContract({
  suiteName: "pages/the-case-for-agile-leadership.vue",
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
  seoTitleFragments: EXPECTED_SEO_TITLE_FRAGMENTS,
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});

describe("pages/the-case-for-agile-leadership.vue — 個別要素契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローセクションの要素を正しく描画する", () => {
    const wrapper = mountPage();
    expect(wrapper.find(".hero-eyebrow").text()).toContain("Scrum Alliance CAL1 第1章");
    expect(wrapper.find(".hero-lede").text()).toContain("CAL 1");
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
    expect(wrapper.find(".disclaimer-box").text()).toContain("非公式の解説資料");
  });
});
