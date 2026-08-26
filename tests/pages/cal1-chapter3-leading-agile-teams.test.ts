// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/cal1-chapter3-leading-agile-teams.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "第3章:アジャイルチームのリード(Leading Agile Teams)",
] as const;

const EXPECTED_H2 = [
  "この章の位置づけ",
  "リーダーシップスタイルの転換:指揮命令型から支援型へ",
  "サーバントリーダーシップの実践",
  "チームの発達段階を理解する:タックマンモデル",
  "チームの心理的安全性を醸成する",
  "チームの機能不全に対処する:Lencioniの5つの機能不全モデル",
  "権限委譲とエンパワーメント:Delegation Poker(7段階の委任レベル)",
  "クロスファンクショナルな協働を促進する",
  "コンフリクトマネジメント:Thomas-Kilmannモデル",
  "フィードバックとコーチングによる成長支援:SBIモデル",
  "まとめ:ハイパフォーマンスチームを導くリーダーのチェックリスト",
  "参考文献一覧",
] as const;

const EXPECTED_H3 = [
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "概要(What & Why)",
  "ステップ・バイ・ステップ",
  "章末チェックリスト",
  "Scrum Alliance公式情報源",
  "アジャイル基礎の一次情報源",
  "チームリーダーシップのフレームワーク(提唱者・一次情報源)",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
    O1["1 The Case for Agile Leadership"] --> O2["2 Agile Leadership in Action"]
    O2 --> O3["3 Leading Agile Teams"]
    O3 --> O4["4 Leading Agile Organizations"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class O1,O2,O4 box;
    class O3 hub;`,
  `flowchart LR
    A["指揮命令型 Command & Control"] --> B["コーチ型 Coaching"]
    B --> C["支援型 Facilitating"]
    C --> D["委任型 Delegating"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C box;
    class D done;`,
  `flowchart TD
    SL["Servant Leadership サーバントリーダーシップ"]
    SL --> G1["傾聴・共感 Listening Empathy"]
    SL --> G2["気づき・説得 Awareness Persuasion"]
    SL --> G3["癒し・概念化 Healing Conceptualization"]
    SL --> G4["先見性・スチュワードシップ Foresight Stewardship"]
    SL --> G5["成長支援・コミュニティ構築 Growth Community Building"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class SL hub;
    class G1,G2,G3,G4,G5 box;`,
  `flowchart LR
    F["Forming 形成期"] --> S["Storming 混乱期"]
    S --> N["Norming 統一期"]
    N --> P["Performing 機能期"]
    P --> A["Adjourning 散会期"]
    S -.->|"大きな変化で逆戻り"| F

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class F,S,N box;
    class P,A done;`,
  `flowchart TD
    PS["Psychological Safety 心理的安全性"] --> D["Dependability 相互信頼"]
    PS --> C["Structure & Clarity 構造と明確さ"]
    PS --> M["Meaning 個人にとっての意味"]
    PS --> I["Impact インパクトの実感"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class PS hub;
    class D,C,M,I box;`,
  `flowchart BT
    T["1 Absence of Trust 信頼の欠如"] --> CF["2 Fear of Conflict 衝突への恐れ"]
    CF --> CM["3 Lack of Commitment コミットメント不足"]
    CM --> AC["4 Avoidance of Accountability 説明責任の回避"]
    AC --> R["5 Inattention to Results 結果への無関心"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class T hub;
    class CF,CM,AC,R box;`,
  `flowchart LR
    L1["1 Tell 指示"] --> L2["2 Sell 説得"]
    L2 --> L3["3 Consult 相談"]
    L3 --> L4["4 Agree 合意"]
    L4 --> L5["5 Advise 助言"]
    L5 --> L6["6 Inquire 確認"]
    L6 --> L7["7 Delegate 委任"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class L1 hub;
    class L2,L3,L4,L5,L6 box;
    class L7 done;`,
  `flowchart LR
    PBI["作業項目 Backlog Item"] --> SW["Swarming 複数スキルで同時対応"]
    SW --> DA["Developer A 専門 Backend"]
    SW --> DB["Developer B 専門 Frontend"]
    SW --> DC["Developer C 専門 QA"]
    DA --> FIN["Done Increment"]
    DB --> FIN
    DC --> FIN

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class PBI,DA,DB,DC box;
    class SW hub;
    class FIN done;`,
  `flowchart LR
    S1["Situation 状況 いつ・どこで"] --> B1["Behavior 行動 観察した事実"]
    B1 --> I1["Impact 影響 結果"]
    I1 -.->|"SBIIでは追加"| IN["Inquiry 意図の確認"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1,B1 box;
    class I1 hub;
    class IN done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://agilemanifesto.org/",
  "https://drive.google.com/file/d/1LpDNidfA_r6J2wFvgRhIWfPw_wEnqjiO/view",
  "https://greenleaf.org/what-is-servant-leadership/",
  "https://infed.org/dir/welcome/bruce-w-tuckman-forming-storming-norming-and-performing-in-groups/",
  "https://kilmanndiagnostics.com/brief-overview-of-the-tki-assessment/",
  "https://management30.com/practice/delegation-poker/",
  "https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.ccl.org/articles/leading-effectively-articles/sbi-feedback-model-a-quick-win-to-improve-talent-conversations-development/",
  "https://www.pm-partners.com.au/course/certified-agile-leader/",
  "https://www.scrumalliance.org/courses-events/search/coursedetail?id=202405528",
  "https://www.scrumalliance.org/get-certified/agile-leader/cal-1",
  "https://www.tablegroup.com/topics-and-resources/teamwork-5-dysfunctions/",
] as const;

const EXPECTED_TOC_IDS = [
  "chapter-position",
  "leadership-style-shift",
  "servant-leadership",
  "tuckman-model",
  "psychological-safety",
  "five-dysfunctions",
  "delegation-poker",
  "cross-functional-collaboration",
  "conflict-management",
  "sbi-feedback",
  "chapter-summary",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 9,
  source: 10,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: { ベストプラクティス: 9 },
  source: { ソース: 10 },
  note: { 補足: 1 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "Certified Agile Leader® 1 (CAL 1™) 完全ガイド | 第3章:アジャイルチームのリード";

const EXPECTED_SEO_DESCRIPTION =
  "Scrum Alliance Certified Agile Leader 1(CAL 1)の学習目標領域「3. Leading Agile Teams」を、サーバントリーダーシップ・タックマンモデル・心理的安全性・Lencioniの5つの機能不全・Delegation Pokerなど9つのフレームワークで初学者向けに解説する学習ガイド。";

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "CAL 1",
  "アジャイルチームのリード",
] as const;

defineSourceParityContract({
  suiteName: "pages/cal1-chapter3-leading-agile-teams.vue",
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

describe("pages/cal1-chapter3-leading-agile-teams.vue — 個別要素契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローセクションの要素を正しく描画する", () => {
    const wrapper = mountPage();
    expect(wrapper.find(".hero-eyebrow").text()).toContain("Scrum Alliance公式 CAL 1™ 学習ガイド シリーズ・第3章");
    expect(wrapper.find(".hero-lede").text()).toContain("CAL 1");
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
    expect(wrapper.find(".disclaimer-box").text()).toContain("非公式の解説資料");
  });
});
