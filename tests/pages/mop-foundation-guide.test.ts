// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/mop-foundation-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "MoP Foundation（Management of Portfolios）学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて(試験概要)",
  "ポートフォリオマネジメントとは何か",
  "MoPフレームワークの全体像",
  "5つの原則(Principles)",
  "組織のエネルギーと活力ある変革文化",
  "ポートフォリオ定義サイクル(5つのプラクティス)",
  "ポートフォリオ・デリバリーサイクル(7つのプラクティス)",
  "主要な役割(Key Roles)",
  "主要文書(Key Documents)",
  "導入・定着・成熟度評価",
  "プラクティス別ベストプラクティス早見表",
  "関連フレームワークとの関係",
  "試験対策のポイント",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "想定される対象読者・応用可能な職種",
  "定義",
  "プロジェクト・プログラム・ポートフォリオの違い",
  "ポートフォリオマネジメントが答える3つの根本的な問い",
  "戦略的・組織的コンテキスト: 6つの連携機能",
  "4.1 上級管理層のコミットメント(Senior Management Commitment)",
  "4.2 ガバナンスの整合(Governance Alignment)",
  "4.3 戦略との整合(Strategy Alignment)",
  "4.4 ポートフォリオオフィス(Portfolio Office)",
  "4.5 活力ある変革文化(Energised Change Culture)",
  "5.1 組織のエネルギーの4つの源泉(4つのC)",
  "5.2 組織のエネルギーとポートフォリオマネジメントの関係",
  "6.1 Understand(理解する)",
  "6.2 Categorize(分類する)",
  "6.3 Prioritize(優先順位付け)",
  "6.4 Balance(バランスを取る)",
  "6.5 Plan(計画する)",
  "6.6 定義サイクルを適切に運用する意義",
  "7.1 マネジメントコントロール(Management Control)",
  "7.2 ベネフィットマネジメント(Benefits Management)",
  "7.3 財務マネジメント(Financial Management)",
  "7.4 リスクマネジメント(Risk Management)",
  "7.5 ステークホルダーエンゲージメント(Stakeholder Engagement)",
  "7.6 組織ガバナンス(Organizational Governance)",
  "7.7 リソースマネジメント(Resource Management)",
  "10.1 3つの実装アプローチ",
  "10.2 定着(Sustaining)のための要因",
  "10.3 成熟度評価: P3M3(Portfolio, Programme and Project Management Maturity Model)",
] as const;

const EXPECTED_H4 = [
  "公式情報源",
  "mop.wiki(認定トレーナーによる独立系解説サイト。AXELOSガイドラインに準拠するが非公式)",
  "その他の解説・研修プロバイダー",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "exam-overview",
  "what-is-portfolio-management",
  "mop-framework-overview",
  "five-principles",
  "organizational-energy",
  "definition-cycle",
  "delivery-cycle",
  "key-roles",
  "key-documents",
  "implementation-and-maturity",
  "best-practices-summary",
  "related-frameworks",
  "exam-tips",
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
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "http://www.advantagelearning.co.uk/news/mop-5-principles.html",
  "https://archive.vanharen.net/blog/mop-management-of-portfolios-in-3-minutes",
  "https://eu-assets.contentstack.com/v3/assets/blt637b065823946b12/blt6582c2653720d239/620b6e06e413e76824f96dda/P3M3-Overview.pdf",
  "https://goodelearning.com/articles/what-is-management-of-portfolios-mop/",
  "https://mop.wiki/",
  "https://mop.wiki/implementing-portfolio-management/",
  "https://mop.wiki/key-documents/",
  "https://mop.wiki/key-roles/",
  "https://mop.wiki/management-cycles/",
  "https://mop.wiki/management-cycles/definition-cycle/",
  "https://mop.wiki/management-cycles/definition-cycle/practices/balance/",
  "https://mop.wiki/management-cycles/definition-cycle/practices/categorize/",
  "https://mop.wiki/management-cycles/definition-cycle/practices/plan/",
  "https://mop.wiki/management-cycles/definition-cycle/practices/prioritize/",
  "https://mop.wiki/management-cycles/definition-cycle/practices/understand/",
  "https://mop.wiki/management-cycles/delivery-cycle/",
  "https://mop.wiki/management-cycles/delivery-cycle/practices/benefits-management/",
  "https://mop.wiki/management-cycles/delivery-cycle/practices/financial-management/",
  "https://mop.wiki/management-cycles/delivery-cycle/practices/management-control/",
  "https://mop.wiki/management-cycles/delivery-cycle/practices/organizational-governance/",
  "https://mop.wiki/management-cycles/delivery-cycle/practices/resource-management/",
  "https://mop.wiki/management-cycles/delivery-cycle/practices/risk-management/",
  "https://mop.wiki/management-cycles/delivery-cycle/practices/stakeholder-engagement/",
  "https://mop.wiki/management-cycles/organizational-energy/",
  "https://mop.wiki/principles/",
  "https://mop.wiki/principles/energised-change-culture/",
  "https://mop.wiki/principles/governance-alignment/",
  "https://mop.wiki/principles/portfolio-office/",
  "https://mop.wiki/principles/senior-management-commitment/",
  "https://mop.wiki/principles/strategy-alignment/",
  "https://training.houseofpmo.com/pmolearning-blog/p3o/pmo-course-deep-dive-mop-foundation/",
  "https://www.abebooks.co.uk/9780113312948/Management-Portfolios-MoP-AXELOS-0113312946/plp",
  "https://www.axelos.com/certifications/propath/mop-portfolio-management",
  "https://www.lumifywork.com/en-au/courses/management-of-portfolios-mop-foundation/",
  "https://www.lumifywork.com/en-ph/offers/mop-foundation-and-practitioner-combo/",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MoP-4/mop-foundation-2644",
  "https://www.qa.com/course-catalogue/courses/management-of-portfolios-mop-foundation-and-practitioner-pbpmopfp/",
  "https://www.vanharen.net/standards/p3m3/p3m3-portfolio-programme-and-project-management-maturity-model-in-3-minutes/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["組織のビジョン 戦略目標"] --> B["ポートフォリオ 戦略目標達成のために選ばれた変革施策の集合"]
    B --> C["プログラム 関連プロジェクト群を束ねアウトカムとベネフィットを実現"]
    C --> D1["プログラム内プロジェクト プログラムの一部として成果物を生み出す有期的活動"]
    B --> D2["単独プロジェクト プログラムに属さずポートフォリオから直接管理される有期的活動"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class B hub;`,
  `flowchart LR
    PM["ポートフォリオマネジメント"]
    PM --- BAU["定常業務 BAU"]
    PM --- SP["戦略計画"]
    PM --- RB["資源配分 予算編成"]
    PM --- PPM["プロジェクト プログラムマネジメント"]
    PM --- PerfM["パフォーマンスマネジメント"]
    PM --- CG["コーポレートガバナンス"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class PM hub;`,
  `flowchart TB
    subgraph P["5つの原則"]
        P1["上級管理層のコミットメント"]
        P2["ガバナンスの整合"]
        P3["戦略との整合"]
        P4["ポートフォリオオフィス"]
        P5["活力ある変革文化"]
    end

    subgraph DC["ポートフォリオ定義サイクル 5プラクティス 逐次的"]
        direction LR
        D1["Understand 理解する"] --> D2["Categorize 分類する"] --> D3["Prioritize 優先順位付け"] --> D4["Balance バランスを取る"] --> D5["Plan 計画する"]
    end

    OE["組織のエネルギー"]

    subgraph DLC["ポートフォリオ デリバリーサイクル 7プラクティス 並行的"]
        L1["マネジメントコントロール"]
        L2["ベネフィットマネジメント"]
        L3["財務マネジメント"]
        L4["リスクマネジメント"]
        L5["ステークホルダーエンゲージメント"]
        L6["組織ガバナンス"]
        L7["リソースマネジメント"]
    end

    P --> DC
    DC -- "ポートフォリオ戦略 デリバリープラン" --> OE
    OE --> DLC
    DLC -. "実績 学習のフィードバック" .-> DC

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class OE hub;`,
  `flowchart TB
    C["活力ある変革文化 組織のエネルギーで駆動"]
    G["ガバナンスの整合"]
    S["戦略との整合"]
    O["ポートフォリオオフィス"]
    M["上級管理層のコミットメント 土台"]
    M --> G
    M --> S
    M --> O
    G --> C
    S --> C
    O --> C

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class M hub;`,
  `flowchart LR
    A["組織のビジョン 高次戦略"] --> B["戦略目標"] --> C["便益"] --> D["変革施策 プロジェクト プログラム"]`,
  `flowchart TB
    OE["組織のエネルギー"]
    OE --> C1["Connection つながり 個人が組織目標にどう結びついているか"]
    OE --> C2["Content 満足度 仕事内容への満足度"]
    OE --> C3["Context 文脈 環境 組織のプラクティスが仕事の遂行をどう支えるか"]
    OE --> C4["Climate 風土 組織が人々の最良の力の発揮をどう支援するか"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class OE hub;`,
  `flowchart LR
    U["Understand 理解する"] --> C["Categorize 分類する"] --> P["Prioritize 優先順位付け"] --> B["Balance バランスを取る"] --> PL["Plan 計画する"]
    PL --> OUT1["ポートフォリオ戦略 何を届けるか"]
    PL --> OUT2["ポートフォリオ デリバリープラン いつ どのように届けるか"]

    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class OUT1,OUT2 done;`,
  `flowchart TB
    subgraph RR["リスク 報酬マトリクスによるバランス評価の例"]
    HH["高リスク 高報酬 複数存在する場合は一部見直しを検討"]
    HL["高リスク 低報酬 原則 中止を検討"]
    LH["低リスク 高報酬 優良案件として維持"]
    LL["低リスク 低報酬 必要最小限に"]
    end

    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class LH done;`,
  `flowchart TB
    STRAT["ポートフォリオ戦略 デリバリープラン 定義サイクルからのインプット"]
    STRAT --> MC["マネジメントコントロール"]
    STRAT --> BM["ベネフィットマネジメント"]
    STRAT --> FM["財務マネジメント"]
    STRAT --> RM["リスクマネジメント"]
    STRAT --> SE["ステークホルダーエンゲージメント"]
    STRAT --> OG["組織ガバナンス"]
    STRAT --> RSM["リソースマネジメント"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class STRAT hub;`,
  `flowchart TB
    PDG["ポートフォリオ ディレクション グループ PDG 投資委員会"]
    PPG["ポートフォリオ プログレス グループ PPG デリバリー委員会"]
    PD["ポートフォリオ ディレクター PD"]
    PM["ポートフォリオ マネージャー"]
    PBM["ポートフォリオ ベネフィット マネージャー"]
    PPM["プロジェクト プログラムマネージャー PPMs"]

    PDG --> PD
    PDG --> PPG
    PD --> PM
    PPG --> PM
    PM --> PBM
    PM --> PPM

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class PDG hub;`,
  `flowchart TB
    subgraph BB["ビッグバン アプローチ"]
        BB1["すべての進行中 パイプライン施策を一斉にポートフォリオへ組み入れる"]
        BB2["長所 迅速な全体像の獲得"]
        BB3["短所 組織への混乱 抵抗が大きい"]
    end
    subgraph EV["エボリューショナリー 漸進的 アプローチ"]
        EV1["ポートフォリオマネジメントのプロセスを段階的 計画的に展開"]
        EV2["長所 即時のニーズに対応し早期に価値を実証 BAUへの混乱を抑制"]
        EV3["短所 導入完了までに時間がかかる 優先度の変化により遅延しうる"]
    end
    subgraph AH["アドホック アプローチ"]
        AH1["場当たり的 非計画的な導入"]
        AH2["P3Oガイドラインでは最も推奨されない"]
    end

    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class EV2 done;`,
  `flowchart TB
    L1["レベル1 プロセスの認識"] --> L2["レベル2 反復可能なプロセス"]
    L2 --> L3["レベル3 定義されたプロセス"]
    L3 --> L4["レベル4 管理されたプロセス"]
    L4 --> L5["レベル5 最適化されたプロセス"]

    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class L5 done;`,
  `flowchart TB
    MoP["MoP Portfolio Management 戦略とポートフォリオ"]
    MSP["MSP Managing Successful Programmes プログラムマネジメント"]
    P2["PRINCE2 プロジェクトマネジメント"]
    P3O["P3O Portfolio Programme and Project Offices オフィス機能の設計"]
    P3M3["P3M3 成熟度評価モデル"]

    MoP --> MSP --> P2
    MoP -. "オフィス機能の設計指針" .-> P3O
    MoP -. "成熟度の測定" .-> P3M3

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class MoP hub;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS: Readonly<Record<string, number>> = {
  source: 34,
  practice: 18,
};

const EXPECTED_CALLOUT_LABELS: Readonly<Record<string, Readonly<Record<string, number>>>> = {
  source: {
    ソース: 34,
  },
  practice: {
    ベストプラクティス: 18,
  },
};

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "MoP Foundation® 認定資格 完全ガイド | PRINCE2 Portfolio Management Foundation対策";
const EXPECTED_SEO_DESCRIPTION =
  "PeopleCert MoP Foundation（PRINCE2 Portfolio Management Foundation）試験対策のための、5つの原則・定義サイクル・デリバリーサイクル・主要な役割と文書・導入と成熟度評価を網羅した初学者向け日本語ガイド。";

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/mop-foundation-guide.vue",
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
  seoTitleFragments: ["MoP", "Foundation"],
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
  allowedHeadingSkips: ["h2 -> h4"],
});

describe("pages/mop-foundation-guide.vue (固有契約)", () => {
  it("Hero の lede テキストが原本と一致する", () => {
    const wrapper = mountPage();
    const lede = wrapper.find(".hero-lede");
    expect(lede.exists()).toBe(true);
    expect(lede.text().trim()).toContain(
      "本ガイドは、世界トップクラスのソフトウェアエンジニア／プロジェクトマネージャー／スクラムマスターの視点から、MoP Foundation試験の出題範囲を初学者にもわかりやすく、ステップ・バイ・ステップで解説するものです。"
    );
  });

  it("4つの stat-card が正しい数値とラベルで描画される", () => {
    const wrapper = mountPage();
    const cards = wrapper.findAll(".stat-card");
    expect(cards).toHaveLength(4);
    const expectedStats = [
      { number: "50問", label: "四肢択一・多肢選択形式" },
      { number: "40分", label: "試験時間" },
      { number: "50%", label: "合格基準（25問以上正答）" },
      { number: "クローズドブック", label: "資料持ち込み不可" },
    ];
    cards.forEach((card, i) => {
      expect(card.find(".stat-number").text().trim()).toBe(expectedStats[i]!.number);
      expect(card.find(".stat-label").text().trim()).toBe(expectedStats[i]!.label);
    });
  });

  it("5つのテーブルがすべて table-wrap で包まれ描画される", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll(".table-wrap table");
    expect(tables).toHaveLength(5);
  });

  it("商標・免責フッターが存在する", () => {
    const wrapper = mountPage();
    const footer = wrapper.find("footer");
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain("PeopleCert groupの登録商標");
  });
});
