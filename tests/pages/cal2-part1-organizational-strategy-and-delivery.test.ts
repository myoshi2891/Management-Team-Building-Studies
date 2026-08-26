// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/cal2-part1-organizational-strategy-and-delivery.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Agile Leader® 2 (CAL 2™) スタディガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "1. ミッション・ビジョン・バリュー (Mission, Vision, and Values)",
  "2. 組織戦略とアジリティ (Organizational Strategy and Agility)",
  "3. 組織構造と顧客価値提供 (Organizational Structure and Customer Value Delivery)",
  "4. チェンジマネジメントとその誤解 (Change Management and Its Misconceptions)",
  "5. 変革をリードするためのツール (Tools for Leading Change)",
  "まとめと参考文献一覧",
] as const;

const EXPECTED_H3 = [
  "概要",
  "ステップバイステップ解説",
  "概要",
  "ステップバイステップ解説",
  "概要",
  "ステップバイステップ解説",
  "概要",
  "ステップバイステップ解説",
  "概要",
  "ステップバイステップ解説",
  "Part 1の全体像",
  "参考文献一覧 (URL)",
] as const;

const EXPECTED_H4 = [
  "ステップ1: ミッション・ビジョン・バリューを区別する",
  "ステップ2: Golden Circle でWhy・How・Whatを整理する",
  "ステップ3: 組織レベルで実装する",
  "ステップ4: ポジティブ/ネガティブ両方の影響を理解する",
  "ステップ1: 戦略とアジリティの関係を理解する",
  "ステップ2: Star Modelの5つの構成要素を理解する",
  "ステップ3: 各要素を診断する",
  "ステップ4: アジリティ向上のための戦略的示唆を導く",
  "ステップ1: Conway's Lawを理解する",
  "ステップ2: Team Topologiesの4チームタイプを理解する",
  "ステップ3: Value Stream Mapping(VSM)で顧客への流れを可視化する",
  "ステップ4: 3つの視点を組み合わせて組織を評価する",
  "ステップ1: よくある誤解を認識する",
  "ステップ2: 「抵抗」の裏にある心理的メカニズムを理解する",
  "ステップ3: 4カラムの「Immunity Map」で可視化する",
  "ステップ4: リーダーとして誤解を解消する行動を取る",
  "ステップ1: Kotterの8ステップ・プロセスを理解する",
  "ステップ2: Prosci ADKARモデルを理解する",
  "ステップ3: Bridgesの移行モデル(Transition Model)を理解する",
  "ステップ4: 3つのフレームワークを組み合わせて使う",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TD
    CAL2["Certified Agile Leader 2"]
    P1["Part 1: Organizational Strategy and Delivery(本ガイドの範囲)"]
    P2["Part 2: Developing as a Leader(別ガイドで解説)"]
    CAL2 --> P1
    CAL2 --> P2
    P1 --> T1["1. Mission, Vision, and Values"]
    P1 --> T2["2. Organizational Strategy and Agility"]
    P1 --> T3["3. Organizational Structure and Customer Value Delivery"]
    P1 --> T4["4. Change Management Misconceptions"]
    P1 --> T5["5. Tools for Leading Change"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class CAL2 hub;
    class P1 done;
    class P2,T1,T2,T3,T4,T5 box;`,
  `flowchart TB
    subgraph GC["Golden Circle - 3層構造"]
        direction TB
        WHY["Why: 核心的な目的・信念 なぜこの組織/チームは存在するのか"]
        HOW["How: 差別化する方法 どのような独自のやり方で実現するのか"]
        WHAT["What: 提供する製品/サービス 具体的に何を提供しているのか"]
        WHY --> HOW --> WHAT
    end
    NOTE["インスパイアするリーダーはWhyから語り始め 多くの組織はWhatから語り始める(逆方向)"]
    GC -.-> NOTE

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class WHY hub;
    class HOW box;
    class WHAT done;
    class NOTE box;`,
  `flowchart TD
    STRAT["Strategy 戦略: 方向性・提供価値・競争優位の源泉"]
    STRAT --> STRUCT["Structure 構造: 意思決定権限の所在"]
    STRAT --> PROC["Processes プロセス: 情報の流れ・調整の仕組み"]
    STRAT --> REW["Rewards 報酬: 行動を動機づける仕組み"]
    STRAT --> PPL["People 人材: 採用・育成・スキル開発の方針"]

    STRUCT <-.->|"整合が必要"| PROC
    PROC <-.->|"整合が必要"| REW
    REW <-.->|"整合が必要"| PPL
    PPL <-.->|"整合が必要"| STRUCT

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class STRAT hub;
    class STRUCT,PROC,REW,PPL box;`,
  `flowchart LR
    ORG["組織のコミュニケーション構造(部門・チームの分かれ方)"]
    SYS["システム/プロダクトの構造(モジュール・APIの分かれ方)"]

    ORG -->|"Conway's Law 組織構造がシステム構造を規定する"| SYS
    SYS -.->|"Inverse Conway Maneuver 望ましいアーキテクチャに合わせて組織を再設計する"| ORG

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class ORG hub;
    class SYS done;`,
  `flowchart TB
    SA["Stream-aligned team(顧客への価値提供の主体)"]
    PF["Platform team X-as-a-Serviceで支援"]
    EN["Enabling team Collaborationで一時的に支援"]
    CS["Complicated-subsystem team X-as-a-Serviceで専門機能を提供"]

    PF -->|"セルフサービスAPI/内部プロダクト"| SA
    EN -->|"一時的な伴走・能力移転"| SA
    CS -->|"高度専門機能の提供"| SA

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class SA hub;
    class PF,EN,CS box;`,
  `flowchart LR
    REQ["顧客からのリクエスト発生"] --> A["工程A(処理時間+待ち時間)"]
    A --> B["工程B(処理時間+待ち時間)"]
    B --> C["工程C(処理時間+待ち時間)"]
    C --> VAL["顧客への価値提供"]

    A -.->|"非付加価値(待ち・承認待ち等)"| WASTE1["ムダの特定"]
    B -.->|"非付加価値"| WASTE2["ムダの特定"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class REQ hub;
    class VAL done;
    class A,B,C,WASTE1,WASTE2 box;`,
  `flowchart LR
    C1["1. 改善目標 本当に達成したいこと"]
    C2["2. 阻害行動 やっている/やっていないこと"]
    C3["3. 隠れた競合コミットメント 無意識に守っているもの"]
    C4["4. 大きな思い込み その根拠となる無意識の前提"]

    C1 --> C2 --> C3 --> C4
    C4 -.->|"検証すると多くは思い込みに過ぎないとわかる"| C1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class C1 hub;
    class C2,C3,C4 box;`,
  `flowchart TD
    K1["1. 危機意識を高める"] --> K2["2. 推進チームを結成する"]
    K2 --> K3["3. 戦略的ビジョンを形成する"]
    K3 --> K4["4. ビジョンを伝達する"]
    K4 --> K5["5. 行動の障壁を取り除く"]
    K5 --> K6["6. 短期的な成果を生み出す"]
    K6 --> K7["7. 勢いを維持する"]
    K7 --> K8["8. 変革を文化に定着させる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class K1 hub;
    class K8 done;
    class K2,K3,K4,K5,K6,K7 box;`,
  `flowchart LR
    A["Awareness 変化の必要性の認識"] --> D["Desire 参加・支持する意欲"]
    D --> K["Knowledge 変化の仕方の知識"]
    K --> AB["Ability 新しい行動を実践する能力"]
    AB --> R["Reinforcement 定着のための強化"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class R done;
    class D,K,AB box;`,
  `flowchart LR
    E["Ending 終わり・喪失・手放す"] --> N["Neutral Zone 中間期の混乱・模索"]
    N --> B["New Beginning 新しいアイデンティティ・意欲の回復"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class E hub;
    class B done;
    class N box;`,
  `flowchart TB
    subgraph TIMELINE["変革の時間軸に3モデルを重ねる"]
        direction LR
        S1["Kotter Step1-2 危機意識/推進チーム"] --> S2["Kotter Step3-4 ビジョン形成/伝達"]
        S2 --> S3["Kotter Step5-6 障壁除去/短期成果"]
        S3 --> S4["Kotter Step7-8 勢い維持/文化定着"]
    end
    A2["ADKAR: Awareness/Desire"] -.->|"対応"| S1
    A3["ADKAR: Knowledge/Ability"] -.->|"対応"| S3
    A4["ADKAR: Reinforcement"] -.->|"対応"| S4
    B2["Bridges: Ending"] -.->|"対応"| S1
    B3["Bridges: Neutral Zone"] -.->|"対応"| S3
    B4["Bridges: New Beginning"] -.->|"対応"| S4

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S4 done;
    class S2,S3,A2,A3,A4,B2,B3,B4 box;`,
  `flowchart LR
    MVV["1. Mission Vision Values 組織はなぜ存在するか"] --> STRAT["2. Strategy and Agility 戦略と組織要素の整合"]
    STRAT --> STRUCT["3. Structure and Value Delivery 組織構造と価値提供"]
    STRUCT --> MISC["4. Change Misconceptions 変革の誤解を解く"]
    MISC --> TOOLS["5. Tools for Leading Change 変革を実行するツール"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class MVV hub;
    class TOOLS done;
    class STRAT,STRUCT,MISC box;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/agile-leader-track/cal-2",
  "https://www.scrumalliance.org/get-certified/agile-leader/cal-1",
  "https://simonsinek.com/golden-circle",
  "https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action",
  "https://simonsinek.com/books/start-with-why",
  "https://jaygalbraith.com/services/star-model",
  "https://www.toolshero.com/management/jay-galbraiths-star-model",
  "https://strategicmanagementinsight.com/tools/galbraiths-star-model-explained",
  "https://en.wikipedia.org/wiki/Conway%27s_law",
  "https://teamtopologies.com/key-concepts",
  "https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/oa.std.1-organize-teams-into-distinct-topology-types-to-optimize-the-value-stream.html",
  "https://www.atlassian.com/agile/value-stream-management",
  "https://www.planview.com/resources/guide/what-is-value-stream-mapping",
  "https://www.cio.com/article/3836602/4-steps-to-debunk-the-change-resistance-myth.html",
  "https://www.mnp.ca/en/insights/directory/three-misconceptions-about-change-management-and-how-to-get-past-them",
  "https://www.mindtools.com/a4l75hx/immunity-to-change",
  "https://www.humanizingwork.com/immunity-to-change",
  "https://bcltraining.com/learning-library/immunity-to-change-model",
  "https://www.kotterinc.com/methodology/8-steps",
  "https://mutomorro.com/tools/kotters-8-step-change-model",
  "https://www.prosci.com/methodology/adkar",
  "https://umbrex.com/resources/frameworks/organization-frameworks/prosci-adkar-model-awareness-desire-knowledge-ability-reinforcement",
  "https://wmbridges.com/about/what-is-transition",
  "https://whichframework.org/frameworks/bridges-transition-model.html",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "mission-vision-values",
  "strategy-and-agility",
  "structure-and-value-delivery",
  "change-management-misconceptions",
  "tools-for-leading-change",
  "summary-and-references",
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

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 5,
  source: 5,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: { ベストプラクティス: 5 },
  source: { ソース: 5 },
  note: { 補足: 1 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "CAL 2 Part 1: 組織戦略とデリバリー 完全ガイド | Organizational Strategy and Delivery";

const EXPECTED_SEO_DESCRIPTION =
  "Certified Agile Leader 2 (CAL 2) Part 1「Organizational Strategy and Delivery」を初学者向けに解説する非公式スタディガイド。Golden Circle、Galbraith Star Model、Team Topologies、Immunity to Change、Kotter/ADKAR/Bridgesなどのフレームワークを図解付きで紹介します。";

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "CAL 2",
  "Part 1",
  "Organizational Strategy and Delivery",
] as const;

defineSourceParityContract({
  suiteName: "pages/cal2-part1-organizational-strategy-and-delivery.vue",
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

describe("pages/cal2-part1-organizational-strategy-and-delivery.vue — 個別要素契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローセクションの要素を正しく描画する", () => {
    const wrapper = mountPage();
    expect(wrapper.find(".hero-eyebrow").text()).toContain("Scrum Alliance CAL 2 非公式スタディガイド");
    expect(wrapper.find(".hero-lede").text()).toContain("Part 1: 組織戦略とデリバリー");
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
    expect(wrapper.find(".disclaimer-box").text()).toContain("非公式のスタディガイド");
  });
});
