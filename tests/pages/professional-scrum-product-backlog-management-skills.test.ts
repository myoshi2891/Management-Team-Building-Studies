// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-product-backlog-management-skills.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum Product Backlog Management Skills(PSPBM)認定 完全学習ガイド",
] as const;

const EXPECTED_H2 = [
  "本ガイドについて",
  "認定試験の概要",
  "Professional Scrum Competencies フレームワーク",
  "Chapter 1: プロダクトバックログとは何か",
  "Chapter 2: プロダクトビジョンとプロダクトゴール",
  "Chapter 3: プロダクトバックログの形成(Forming)",
  "Chapter 4: リファインメント(Refinement)",
  "Chapter 5: 並び替えと優先順位付け(Ordering)",
  "Chapter 6: ステークホルダーとカスタマーとの協働",
  "Chapter 7: 経験主義とEvidence-Based Managementによる価値最大化",
  "Chapter 8: AI時代のプロダクトバックログマネジメント",
  "Chapter 9: よくある誤解とアンチパターン",
  "Chapter 10: 試験対策のポイント",
  "用語集",
  "参考文献・ソースURL一覧",
] as const;

const EXPECTED_H3 = [
  "試験基本情報",
  "認定が証明する能力",
  "対応する公式トレーニングコース",
  "5つのコンピテンシー全体像",
  "PSPBM Skills が重点的に問う Focus Area",
  "Scrum Guide における定義",
  "Product Owner の説明責任",
  "コミットメント: プロダクトゴール",
  "良いプロダクトバックログの4条件: DEEP モデル",
  "プロダクトという単位",
  "ビジョン・ゴール・戦略の関係",
  "カスタマー・ステークホルダーのニーズを捉える技法",
  "プロダクトバックログ項目(PBI)の属性",
  "定義と位置づけ",
  "リファインメントの5つの戦略",
  "プロダクトバックログ項目の分割技法",
  "INVEST 基準(項目の品質チェック)",
  "見積り(Estimating)",
  "Definition of Ready(DoR)について",
  "「順序」であって「優先度カテゴリ」ではない",
  "代表的な並び替え・優先順位付け技法",
  "並び替えの判断材料",
  "なぜステークホルダー協働がプロダクトバックログマネジメントの核なのか",
  "ステークホルダー識別・関与の技法",
  "コミュニケーションのリズム",
  "期待値マネジメントとコンフリクトの扱い",
  "経験主義の3本柱をプロダクトバックログに適用する",
  "Evidence-Based Management(EBM)",
  "経験主義を競争優位として活かす",
  "学習の進め方",
  "頻出のひっかけパターン",
  "推奨される準備の組み合わせ",
] as const;

const EXPECTED_H4 = [
  "SPIDR(Mike Cohn)",
  "Richard Lawrence の分割パターン(抜粋)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "exam-overview",
  "competencies-framework",
  "what-is-product-backlog",
  "product-vision-and-goal",
  "forming-the-backlog",
  "refinement",
  "ordering-and-prioritization",
  "stakeholders-and-customers",
  "empiricism-and-ebm",
  "ai-and-backlog-management",
  "misconceptions-and-antipatterns",
  "exam-prep-tips",
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
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-scrum-product-backlog-management-skills-certification",
  "https://www.credly.com/org/scrum-org/badge/professional-scrum-product-backlog-management-skill",
  "https://www.scrum.org/resources/blog/how-pass-professional-scrum-product-backlog-management-skills-pspbm-skills",
  "https://academy.xebia.com/training/professional-scrum-product-backlog-management-skills-pspbms/",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.scrum.org/professional-scrum-competencies/managing-products-with-agility",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.scrum.org/resources/what-is-a-product-backlog",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://www.romanpichler.com/blog/make-the-product-backlog-deep/",
  "https://www.scrum.org/resources/product-backlog-refinement",
  "https://www.scrum.org/resources/blog/what-product-backlog-refinement",
  "https://www.scrum.org/resources/blog/5-strategies-product-backlog-refinement",
  "https://www.mountaingoatsoftware.com/agile/five-simple-but-powerful-ways-to-split-user-stories",
  "https://www.scrum.org/forum/scrum-forum/45798/product-backlog-refinement-details",
  "https://framework.scaledagile.com/wsjf",
  "https://scrum-master.org/en/what-is-wsjf-weighted-shortest-job-first-safe/",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://agilemania.com/professional-scrum-product-backlogmanagement-skills-pspbms-training-united-states",
  "https://www.scrum.org/resources",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["Understanding and Applying the Scrum Framework<br/>Scrumフレームワークの理解と適用<br/>すべての土台"]
    B["Developing People and Teams<br/>人とチームの育成"]
    C["Managing Products with Agility<br/>アジリティを持ったプロダクトマネジメント<br/>PSPBM Skillsの主領域"]
    D["Developing and Delivering Products Professionally<br/>プロフェッショナルなプロダクト開発と提供"]
    E["Evolving the Agile Organization<br/>アジャイル組織への進化"]

    A --> B
    A --> C
    A --> D
    A --> E

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class C done;
    class B,D,E box;`,
  `flowchart LR
    PV["Product Vision<br/>プロダクトビジョン<br/>長期・恒久的な方向性"] --> PB["Product Backlog<br/>プロダクトバックログ<br/>創発的・順序付き"]
    PB --> SB["Sprint Backlog<br/>スプリントバックログ"]
    SB --> INC["Increment<br/>インクリメント"]
    PB -.->|"コミットメント"| PG["Product Goal<br/>プロダクトゴール<br/>コミットメント 長期目標"]
    SB -.->|"コミットメント"| SG["Sprint Goal<br/>スプリントゴール<br/>コミットメント"]
    INC -.->|"コミットメント"| DoD["Definition of Done<br/>完成の定義 コミットメント"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class PG,SG,DoD hub;
    class PV,PB,SB,INC box;`,
  `flowchart TD
    START["大きすぎるPBI<br/>Epicレベル"] --> Q1{"未知の技術的<br/>不確実性がある?"}
    Q1 -- "はい" --> SP["Spike調査として切り出す"]
    Q1 -- "いいえ" --> Q2{"複数の処理経路や<br/>選択肢がある?"}
    Q2 -- "はい" --> PA["Pathごとに分割"]
    Q2 -- "いいえ" --> Q3{"複数のUIや<br/>チャネルに対応?"}
    Q3 -- "はい" --> IF["Interfaceごとに分割"]
    Q3 -- "いいえ" --> Q4{"扱うデータの種類が<br/>複数ある?"}
    Q4 -- "はい" --> DA["Dataの種類ごとに分割"]
    Q4 -- "いいえ" --> Q5{"複雑なビジネスルールを<br/>多く含む?"}
    Q5 -- "はい" --> RU["Ruleの適用範囲で段階分割"]
    Q5 -- "いいえ" --> READY["1スプリントで完成可能な<br/>サイズと判断"]

    SP --> READY
    PA --> READY
    IF --> READY
    DA --> READY
    RU --> READY

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q1,Q2,Q3,Q4,Q5 hub;
    class SP,PA,IF,DA,RU box;
    class READY done;`,
  `flowchart LR
    A["ステークホルダーの<br/>ニーズ・フィードバック"] --> B["プロダクトバックログの<br/>形成 リファインメント"]
    B --> C["並び替え<br/>価値順"]
    C --> D["Sprintでの実施<br/>Increment作成"]
    D --> E["Sprint Reviewでの<br/>検査と協働"]
    E --> A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`,
  `flowchart TB
    subgraph EBM["Evidence-Based Managementの4つのKey Value Areas"]
        CV["Current Value<br/>現在届いている価値"]
        UV["Unrealized Value<br/>未実現の価値"]
        A2I["Ability to Innovate<br/>革新する能力"]
        T2M["Time to Market<br/>市場投入までの速度"]
    end
    CV -.->|"継続測定"| DECISION["プロダクトバックログの<br/>内容・並び順の意思決定"]
    UV -.->|"継続測定"| DECISION
    A2I -.->|"継続測定"| DECISION
    T2M -.->|"継続測定"| DECISION
    DECISION -->|"実験・リリース"| CV

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class CV,UV,A2I,T2M hub;
    class DECISION box;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 4,
  practice: 12,
  source: 21,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    補足: 3,
    "補足(試験対策上の注意)": 1,
  },
  practice: {
    ベストプラクティス: 11,
    "ベストプラクティス(時間配分の目安)": 1,
  },
  source: {
    ソース: 21,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/professional-scrum-product-backlog-management-skills.vue",
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
  seoTitleFragments: ["PSPBM", "Professional Scrum Product Backlog Management Skills"],
  seoTitle:
    "PSPBM(Professional Scrum Product Backlog Management Skills)認定 完全ガイド | プロダクトバックログマネジメント実践知識",
  seoDescription:
    "Scrum.org Professional Scrum Product Backlog Management Skills(PSPBM)認定試験の出題範囲を、初学者向けに図解とベストプラクティス、一次情報ソース付きで解説する学習ガイド。",
});

describe("pages/professional-scrum-product-backlog-management-skills.vue — 個別検証", () => {
  it("ヒーローの統計カードが4件表示されている", () => {
    const mountPage = createMountPage(Page);
    const wrapper = mountPage();
    const statCards = wrapper.findAll(".stat-card");
    expect(statCards).toHaveLength(4);
    expect(statCards.map((card) => card.find(".stat-number").text())).toEqual([
      "20問",
      "30分",
      "85%",
      "Intermediate",
    ]);
  });
});
