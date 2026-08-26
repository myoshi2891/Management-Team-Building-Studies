// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/cal2-certified-agile-leader-2-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Agile Leader® 2 (CAL 2TM) 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "ミッション・ビジョン・バリュー",
  "組織戦略とアジリティ",
  "組織構造と顧客価値提供",
  "チェンジマネジメントの誤解とツール",
  "変革を導くためのツール",
  "個人の成長を阻む障壁を乗り越える",
  "自分らしいリーダーシップアプローチの確立",
  "困難な会話での戦略伝達",
  "フィードバックの提供と受領",
  "人をマネジメントする上での課題",
  "権限委譲と意思決定",
  "まとめ: CAL 2 学習目標とフレームワーク対応表",
  "参考文献・出典一覧",
] as const;

const EXPECTED_H3 = [
  "CAL 2 とは何か",
  "認定の仕組み(前提条件・評価方法・更新)",
  "カリキュラム全体マップ",
  "3つの概念を区別する",
  "Golden Circle(Simon Sinek)",
  "戦略とアジリティの関係",
  "戦略とアジリティを結びつける実践的な考え方",
  "なぜ構造が価値提供を左右するのか",
  "Galbraith Star Model(組織設計の5要素)",
  "Value Stream Mapping(顧客価値の流れを可視化する)",
  "よくある誤解",
  "Bridges' Transition Model(変化と移行を分けて考える)",
  "誤解を踏まえた実践ツール",
  "なぜ「わかっているのに変われない」のか",
  "Immunity to Change(変化への免疫マップ)",
  "唯一の正解のリーダーシップスタイルは存在しない",
  "Situational Leadership II(SLII)",
  "「クルーシャル・カンバセーション」とは",
  "安全性を築く",
  "Radical Candor(ラディカル・キャンダー)",
  "フィードバックを「受け取る」側の技術",
  "リーダーが直面する典型的な課題",
  "「唯一の正解」を探さない",
  "なぜ意思決定の停滞が起きるのか",
  "RAPIDフレームワーク(Bain & Company)",
  "Scrum Alliance 公式",
  "ミッション・ビジョン・バリュー",
  "組織構造・価値提供",
  "チェンジマネジメント",
  "個人の成長",
  "リーダーシップスタイル",
  "困難な会話",
  "フィードバック",
  "権限委譲と意思決定",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    CAL1["CAL 1 アジャイルリーダーシップの基礎"] --> CAL2["CAL 2 戦略実行とリーダーとしての成長"]

    subgraph PART1["Part 1 組織戦略とデリバリー"]
        direction TB
        P1_1["1 ミッション・ビジョン・バリュー"]
        P1_2["2 組織戦略とアジリティ"]
        P1_3["3 組織構造と顧客価値提供"]
        P1_4["4 チェンジマネジメントの誤解とツール"]
        P1_5["5 変革を導くためのツール"]
    end

    subgraph PART2["Part 2 リーダーとしての成長"]
        direction TB
        P2_1["6 個人の成長を阻む障壁"]
        P2_2["7 自分らしいリーダーシップスタイル"]
        P2_3["8 困難な会話の伝え方"]
        P2_4["9 フィードバックの提供と受領"]
        P2_5["10 人をマネジメントする上での課題"]
        P2_6["11 権限委譲と意思決定"]
    end

    CAL2 --> PART1
    CAL2 --> PART2

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class CAL1,CAL2 hub;
    class P1_1,P1_2,P1_3,P1_4,P1_5,P2_1,P2_2,P2_3,P2_4,P2_5,P2_6 box;`,
  `flowchart TB
    subgraph GC["Golden Circle"]
        direction TB
        WHY["Why なぜ存在するのか - 目的・信念"]
        HOW["How どう実現するのか - 戦略・強み・差別化要因"]
        WHAT["What 何をしているのか - 提供する製品・サービス"]
    end
    WHY --> HOW --> WHAT

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class WHY hub;
    class HOW,WHAT box;`,
  `flowchart TB
    STRATEGY["Strategy 戦略 - 勝ち筋・目的"]
    STRATEGY --> STRUCTURE["Structure 構造 - 権限・意思決定の所在"]
    STRATEGY --> PROCESS["Process プロセス - 情報と意思決定の流れ"]
    STRATEGY --> REWARDS["Rewards 報酬 - 評価・インセンティブ"]
    STRATEGY --> PEOPLE["People 人材 - 採用・育成・スキル"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class STRATEGY hub;
    class STRUCTURE,PROCESS,REWARDS,PEOPLE box;`,
  `flowchart LR
    A["顧客の要求発生"] --> B["要求の受付・優先順位付け"]
    B --> C["設計・開発"]
    C --> D["レビュー・承認待ち"]
    D --> E["リリース・デプロイ"]
    E --> F["顧客への価値提供"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;
    class F done;`,
  `flowchart LR
    E["Ending Losing and Letting Go 終わりを受け入れる"] --> N["Neutral Zone 中立圏 混乱と模索"]
    N --> B["New Beginning 新たな始まり"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class E box;
    class N hub;
    class B done;`,
  `flowchart TB
    C["クルーシャルな状況 意見の相違 高い利害 強い感情"] --> S{"安全性は保たれているか"}
    S -->|失われている| SV["Silence 沈黙 または Violence 攻撃へ逃避"]
    S -->|保たれている| D["Dialogue 対話が継続する"]
    SV --> RESTORE["安全性の回復 共通の目的 相互の敬意を確認する"]
    RESTORE --> D

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class C,SV,RESTORE box;
    class S hub;
    class D done;`,
  `graph TD
    I["Input 意思決定に必要な情報・専門知識を提供する"]
    R["Recommend 選択肢を分析し、提案をまとめる"]
    A["Agree 提案に対し合意または拒否権を行使する"]
    D["Decide 最終的な意思決定を下す"]
    P["Perform 決定を実行に移す"]

    I -->|情報提供| R
    D -->|実行依頼| P
    R -.->|提案を参照| A
    R -.->|提案を参照| D

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class I,R,A box;
    class D hub;
    class P done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/agile-leader-track/cal-2",
  "https://support.scrumalliance.org/hc/en-us/articles/24643517272219-Certified-Agile-Leader-1-CAL-1-and-Certified-Agile-Leader-2-CAL-2-Refactor-Frequently-Asked-Questions",
  "https://upraise.io/blog/golden-circle-framework/",
  "https://www.cesarritzcolleges.edu/en/news/simon-sinek-golden-circle/",
  "https://umbrex.com/resources/frameworks/organization-frameworks/galbraith-star-model/",
  "https://flevy.com/blog/developing-an-organizational-design-that-works-the-galbraith-star-model/",
  "https://itrevolution.com/articles/value-stream-mapping/",
  "https://kaizen.com/insights/value-stream-mapping-bottleneck-capacity/",
  "https://www.peoplestudypro.com/blog/bridges-transition-model-explained",
  "https://umbrex.com/resources/change-management-frameworks/what-is-bridges-transition-model/",
  "https://wmbridges.com/about/what-is-transition/",
  "https://www.mindtools.com/a4l75hx/immunity-to-change/",
  "https://www.humanizingwork.com/immunity-to-change/",
  "https://www.toolshero.com/leadership/situational-leadership-hersey-blanchard/",
  "https://umbrex.com/resources/frameworks/organization-frameworks/hersey-blanchard-situational-leadership-model/",
  "https://resources.blanchard.com/blanchard-leaderchat/a-situational-approach-to-effective-leadership",
  "https://evansamek.substack.com/p/crucial-conversations-by-grenny-patterson",
  "https://readingraphics.com/book-summary-crucial-conversations/",
  "https://www.radicalcandor.com/our-approach",
  "https://kimmalonescott.medium.com/what-is-radical-candor-learn-the-basic-principles-in-6-minutes-50391b3ad76a",
  "https://www.mindtools.com/av8ceid/bains-rapid-framework/",
  "https://umbrex.com/resources/frameworks/organization-frameworks/bain-rapid-decision-framework/",
  "https://www.scrumalliance.org/get-certified/agile-leader/cal-1",
  "https://support.scrumalliance.org/hc/en-us/articles/24477898697627-How-to-earn-the-Certified-Agile-Leader-1-CAL-1-certification",
] as const;

const EXPECTED_TOC_IDS = [
  "about-cal2",
  "mission-vision-values",
  "strategy-and-agility",
  "structure-and-value-delivery",
  "change-misconceptions",
  "leading-change-tools",
  "immunity-to-change",
  "situational-leadership",
  "crucial-conversations",
  "radical-candor",
  "managing-people-challenges",
  "rapid-decision-making",
  "framework-summary",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 00",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 12,
  source: 13,
  note: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: { ベストプラクティス: 12 },
  source: { ソース: 13 },
  note: { 補足: 2 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "CAL 2™ Certified Agile Leader 2 認定資格 完全ガイド | 組織戦略とリーダーシップ成長のフレームワーク集";

const EXPECTED_SEO_DESCRIPTION =
  "Scrum Alliance Certified Agile Leader 2 (CAL 2) の学習目標に基づき、組織戦略・チェンジマネジメント・リーダーシップ成長の主要フレームワークをステップバイステップで解説する非公式学習ガイドです。";

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "CAL 2",
  "Certified Agile Leader 2",
  "完全ガイド",
] as const;

defineSourceParityContract({
  suiteName: "pages/cal2-certified-agile-leader-2-study-guide.vue",
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

describe("pages/cal2-certified-agile-leader-2-study-guide.vue — 個別要素契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローセクションの要素を正しく描画する", () => {
    const wrapper = mountPage();
    expect(wrapper.find(".hero-eyebrow").text()).toContain("Scrum Alliance CAL 2 非公式学習ガイド");
    expect(wrapper.find(".hero-lede").text()).toContain("組織戦略の実行とリーダー自身の成長");
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
    expect(wrapper.find(".disclaimer-box").text()).toContain("非公式の学習ガイド");
  });
});
