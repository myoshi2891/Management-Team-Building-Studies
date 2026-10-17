// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/itil-experience-version-5-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ITIL® Experience (Version 5) 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "この試験は何か ── 全体像をつかむ",
  "試験概要(Exam Overview)",
  "前提となる基礎概念のリフレッシュ(Syllabus Category 1.1)",
  "Experience の主要概念(Syllabus Category 1.2) ── BL2",
  "ITIL Experience(Syllabus Category 2) ── 体験のフレームワーク全体像",
  "Experience の捕捉(Capturing Experience)(Syllabus Category 3)",
  "サービスジャーニー(Service Journey)(Syllabus Category 4)",
  "ITIL と AI(Syllabus Category 5)",
  "ITIL と他のフレームワーク(Syllabus Category 6)",
  "ベストプラクティス総まとめ表",
  "試験対策のポイント(まとめ)",
  "用語集(Glossary)",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "0.1 定義",
  "0.2 なぜこの資格が必要なのか(理由)",
  "0.3 対象者・前提資格・キャリアパス",
  "1.1 試験形式",
  "1.2 Bloom's Level(BL) ── 出題の「思考レベル」",
  "1.3 設問タイプ(4種類)",
  "2.1 ITIL Guiding Principles(ITIL指導原則)",
  "2.2 Product・Service・Digital Product/Service の定義",
  "2.3 ITIL Product and Service Lifecycle(8段階)",
  "2.4 ITIL Four Dimensions of Product and Service Management",
  "2.5 ITIL Value System(ITIL VS)",
  "3.1 「Experience(体験)」を人間の反応として定義する",
  "3.2 Digital Experience と Digital Experience System",
  "4.1 主要ステークホルダーと「Tensions(緊張関係)」── BL2",
  "4.2 Experience と ITIL Four Dimensions ── BL2〜BL3",
  "4.3 ITIL Product and Service Lifecycle の中での Experience ── BL2〜BL4",
  "5.1 Experience Capture の基本概念と「メトリクスは仮説である」── BL2",
  "5.2 4つの Experience Domains(体験ドメイン) ── BL1〜BL2",
  "5.3 Experience Evidence(証拠)の種類・情報源・データの3層構造 ── BL2",
  "5.4 Direct / Indirect / Synthetic な捕捉テクニック ── BL2",
  "5.5 データ品質の評価:Trustworthiness と Coherence ── BL3(適用)",
  "5.6 Experience Capture のアンチパターン、役割、ツール ── BL2",
  "6.1 Service Relationships と Agreements(体験の視点から) ── BL2",
  "6.2 Service Journey の7ステップ ── BL2",
  "6.3 Consumer Stakeholder Journey と Provider Stakeholder Journey ── BL2〜BL3",
  "6.4 Digital Experience Improvement(継続的な体験改善) ── BL2〜BL4",
  "7.1 AI が Experience Management にもたらす価値 ── BL2",
  "7.2 ITIL AI Capability Model(6Cモデル) ── BL2",
  "7.3 AI Governance と Digital Ethics(Assessment Criteria 5.1.2, 5.2.2) ── BL2",
  "8.1 ITIL と DevOps ── BL2",
  "8.2 ITIL と PRINCE2(プロジェクトマネジメント) ── BL2",
] as const;

const EXPECTED_H4 = [
  "定義",
  "Experience 文脈での理由",
  "定義",
  "なぜこの定義が重要か(理由)",
  "具体例",
  "定義",
  "なぜ重要か",
  "定義",
  "Consumer 側の役割",
  "Provider 側の役割",
  "なぜ Tension を明示するのか(理由)",
  "定義",
  "各次元での改善アプローチ",
  "定義:Value Chain Activities が生む \"Experience Moments\"",
  "Functional Interactions と Relational Interactions の違い(重要:BL4で差別化が問われる)",
  "典型的な Experience Frictions(摩擦)と緩和策(Assessment Criteria 2.3.3、BL4:分析して緩和策を提案する)",
  "Stakeholder Role Mapping の適用(Assessment Criteria 2.3.4、BL3:適用)",
  "定義",
  "なぜ「メトリクスは仮説」なのか(極めて重要な理由)",
  "データの3層構造(Three Tiers of Data)",
  "Numerical Signals と Narrative Signals(数値シグナルと物語的シグナル)",
  "定義",
  "具体例(適用シナリオ)",
  "代表的なアンチパターン",
  "捕捉に関わる役割・ツール",
  "Service Relationship の3タイプ",
  "Service Agreement の視点",
  "定義",
  "各ステップの定義とExperience上の要点",
  "定義",
  "Consumer 側ジャーニーの例(Customer の視点)",
  "Provider 側ジャーニーの例(Agent の視点)",
  "ITIL Service Journey Model の適用(Assessment Criteria 4.4.3、BL3)",
  "notice – interpret – hypothesize – experiment ループ(Assessment Criteria 4.5.1、BL3:適用)",
  "定義",
  "「Improvements by the system」vs「Improvements to the system」(Assessment Criteria 4.5.2、BL4:差別化)",
  "Trust と Psychological Safety(心理的安全性)の役割(Assessment Criteria 4.5.3、BL2)",
  "定義",
  "理由",
  "定義",
  "定義",
  "Experience の文脈での理由",
  "定義と理由",
  "Experience の文脈での接続点",
  "定義と理由",
  "参考文献一覧(17件)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "overview",
  "exam-overview",
  "foundations-refresh",
  "key-concepts",
  "experience-framework",
  "capturing-experience",
  "service-journey",
  "itil-and-ai",
  "related-frameworks",
  "best-practices-summary",
  "exam-tips",
  "glossary",
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
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://advancedtraining.com.au/product/itil-experience-version-5",
  "https://agilepmhub.com/itil-experience-version-5",
  "https://edutrainings.eu/training/itil-experience-version-5-exam-and-retake",
  "https://itecor.com/a-new-itil-so-what",
  "https://itsm.tools/itil-version-5-vs-itil-4-key-changes",
  "https://itsmacademy.com/itil-ai-governance-course",
  "https://torque-it.com/product/itil-experience-version-5-including-exam",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-experience-user-experience",
  "https://www.itil.org.uk/training/itil-managing-professional-certification/itil-5-managing-professional-transition-training-course",
  "https://www.oxfordcollegeoftechnology.com/itil-version-5/itil-experience-version-5",
  "https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Experience-Syllabus.pdf",
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-experience-version-5-4177",
  "https://www.pmgacademy.com/en/articles/itil/information-and-technology-in-itil-version-5-the-guide-for-the-ai-era-and-data-governance",
  "https://www.pmgacademy.com/en/articles/itil/service-journey-in-itil-5-the-complete-guide-to-customer-experience-and-digital-value",
  "https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation",
  "https://www.sapience-consulting.com/itil-experience-certification-v5",
  "https://www.theknowledgeacademy.com/courses/itil-training",
  "https://www.theknowledgeacademy.com/courses/itil-training/itil-5-managing-professional-transition-training-course",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["Discover"] --> B["Design"]
B --> C["Acquire"]
C --> D["Build"]
D --> E["Transition"]
E --> F["Operate"]
F --> G["Deliver"]
G --> H["Support"]
H -.->|"feedback"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G box;
class H done;`,
  `flowchart TB
subgraph Consumer["Consumer-side stakeholders"]
U["User 実際にサービスを使う人"]
CU["Customer 要件を定義し成果に責任を持つ"]
CS["Customer Sponsor 予算承認・投資判断を行う"]
end
subgraph Provider["Provider-side stakeholders"]
AG["Agent サービスを実際に提供する担当者"]
PR["Principal 提供責任を最終的に負う"]
PS["Provider Sponsor 提供側の投資判断を行う"]
EN["Enabler 提供を技術的に支える"]
end
Consumer <-->|Tensions| Provider

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class U,CU,CS box;
class AG,PR,PS,EN hub;`,
  `flowchart TB
EXP["Experience 体験"]
D1["Organizations and People 役割・権限・スキル・文化"] --> EXP
D2["Information and Technology データ品質・UI/UX・AI活用"] --> EXP
D3["Partners and Suppliers 外部委託先の体験品質"] --> EXP
D4["Value Streams and Processes 手続きの摩擦・待ち時間"] --> EXP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class EXP hub;
class D1,D2,D3,D4 box;`,
  `flowchart LR
subgraph Journey["Product and Service Lifecycle across the journey"]
direction LR
S1["Discover"] --> S2["Design"] --> S3["Acquire"] --> S4["Build"] --> S5["Transition"] --> S6["Operate"] --> S7["Deliver"] --> S8["Support"]
end
U["User 使いやすさへの信頼"] -.-> S6
CU["Customer 成果達成への信頼"] -.-> S7
AG["Agent 現実的な運用可能性への信頼"] -.-> S6
PR["Principal 品質保証への信頼"] -.-> S8

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5 box;
class S6,S7 hub;
class S8 done;
class U,CU,AG,PR box;`,
  `flowchart LR
P["Primary data"] --> QC["Data quality assessment"]
S["Secondary data"] --> QC
T["Tertiary data"] --> QC
QC --> TR["Trustworthiness"]
QC --> CO["Coherence"]
TR --> DEC["改善アクションの意思決定"]
CO --> DEC

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P,S,T box;
class QC hub;
class TR,CO box;
class DEC done;`,
  `flowchart LR
A["1. Explore 市場・ニーズを探る"] --> B["2. Engage 関係と信頼を構築する"]
B --> C["3. Offer 提供内容を提示し需要を言語化"]
C --> D["4. Agree 期待値を合意・正式化"]
D --> E["5. Onboard 移行し利用を開始する"]
E --> F["6. Co-create 日常利用で価値を共創"]
F --> G["7. Reflect 成果を振り返り改善する"]
G -.->|"次サイクルへ"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;
class G done;`,
  `flowchart TB
N["Notice 体験シグナルに気づく"] --> I["Interpret シグナルを解釈する"]
I --> H["Hypothesize 改善仮説を立てる"]
H --> EX["Experiment 小さく試す"]
EX --> N

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class N hub;
class I,H,EX box;`,
  `flowchart TB
subgraph Model["ITIL AI Capability Model 6C"]
direction LR
C1["Creation コンテンツ・コード・文書の生成"]
C2["Curation 既存データの品質向上・重複排除"]
C3["Clarification 複雑な内容の要約・案内"]
C4["Cognition パターン検出・予兆分析"]
C5["Communication チャットボット等の自然な対話"]
C6["Coordination 複数アクションの自律的な統制・実行"]
end

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class C1,C2,C3,C4,C5,C6 box;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 16,
  source: 12,
  note: 5,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 16,
  },
  source: {
    ソース: 12,
  },
  note: {
    補足: 4,
    免責事項: 1,
  },
} as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/itil-experience-version-5-study-guide.vue",
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
  allowedHeadingSkips: ["h2 -> h4"],
  seoTitleFragments: ["ITIL Experience (Version 5)", "完全ガイド"],
  seoTitle: "ITIL Experience (Version 5)® 認定資格 完全ガイド | PeopleCert Managing Professional",
  seoDescription:
    "PeopleCert ITIL Experience (Version 5) の出題範囲を、定義・理由・具体例・図解の順で初学者向けに解説する学習ガイド。",
});

describe("pages/itil-experience-version-5-study-guide.vue — 固有契約", () => {
  it("ヒーロー領域に認証シール(SVG)が存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.find(".seal").exists()).toBe(true);
  });
});
