// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/itil-foundation-v5-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ITIL Foundation (Version 5) 完全学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドの使い方",
  "出題配点マップ(全体像)",
  "第1章: 主要なITIL用語と定義(配点30% / 12点)",
  "第2章: ITILの4つの側面(配点10% / 4点)",
  "第3章: ITIL 製品・サービスライフサイクル(配点10% / 4点)",
  "第4章: ITIL バリューシステム(配点40% / 16点)",
  "第5章: バリューストリームの特定・マッピング・マネジメント(配点5% / 2点)",
  "第6章: ITILとAI(配点2.5% / 1点)",
  "第7章: ITILと他フレームワークとの関係(配点2.5% / 1点)",
  "第8章: 出題形式・Bloom's Level・学習計画",
  "付録A: 用語集",
  "付録B: 34のマネジメントプラクティス早見表",
  "付録C: 出典・参考文献一覧",
] as const;

const EXPECTED_H3 = [
  "1-1. Digital Product and Service Management とは",
  "1-2. Continual Improvement と ITIL Product and Service Lifecycle(キーコンセプトとしての導入)",
  "1-3. Utility・Warranty・User Experience・Sustainability(価値の4要素)",
  "1-4. Service Offering と Service Interactions(サービス提供物とやり取り)",
  "1-5. Value Co-Creation(価値の共創)",
  "1-6. Service Relationships(サービス関係)",
  "3-1. Product and Service Lifecycle Model(PSLM)とは",
  "3-2. 各活動の目的(Purpose)",
  "4-1. ITIL Value System(ITIL VS)の全体像",
  "4-2. ITIL Guiding Principles(指導原則) — 7項目",
  "4-3. Governance(ガバナンス)",
  "4-4. Value Chain(バリューチェーン)",
  "4-5. Management Practices(マネジメントプラクティス)",
  "4-6. ITIL Continual Improvement Model(継続的改善モデル)",
  "5-1. Value Stream(バリューストリーム)の基本定義",
  "5-2. Complexity Thinking(複雑性思考)",
  "5-3. Value Stream Mapping and Management の目的",
  "6-1. 基本用語の定義",
  "6-2. AIとPSLM・バリューチェーンの関係",
  "6-3. AI Governance(AIガバナンス)",
  "6-4. ITIL AI Capability Model(6Cモデル)",
  "7-1. ITIL と DevOps",
  "7-2. ITIL と PRINCE2(プロジェクトマネジメント)",
  "8-1. 問題形式(Question Types)",
  "8-2. Bloom's Level(思考レベル)",
  "8-3. 推奨学習ステップ",
  "B-1. Product and Service Management Practices(製品・サービスマネジメントプラクティス/22項目)",
  "B-2. General Management Practices(汎用マネジメントプラクティス/12項目)",
] as const;

const EXPECTED_H4 = [
  "学習の進め方(ステップ)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "how-to-use",
  "exam-blueprint",
  "key-terms",
  "four-dimensions",
  "product-service-lifecycle",
  "value-system",
  "value-streams",
  "itil-and-ai",
  "other-frameworks",
  "exam-strategy",
  "glossary",
  "management-practices",
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
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://agilepmhub.com/itil-ai-governance",
  "https://community.peoplecert.org/public/clubs/itil/blogs/itil-version-5-a-value-stream-perspective",
  "https://fasttracklearningsolutions.com/wp-content/uploads/2026/02/ITIL_Version5_Foundation_Syllabus_v5.0.pdf",
  "https://governancedocs.com/itil-5-practices/",
  "https://itecor.com/a-new-itil-so-what/",
  "https://itsm.tools/itil-version-5-management-practices/",
  "https://itsm.tools/itil-version-5-vs-itil-4-key-changes/",
  "https://www.diontraining.com/blogs/news/itil-5-ai-governance",
  "https://www.diontraining.com/blogs/news/itil-5-process",
  "https://www.itil.com/professionals/certifications/ITIL-AI-Governance-Version-5",
  "https://www.itil.org.uk/training/itil-foundation-level-courses/itil-version-5-foundation-certification-course",
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-5-foundation-version-50-4154",
  "https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation/",
  "https://www.pmgacademy.com/en/articles/itil/value-streams-and-processes-in-itil-version-5-the-practical-guide-to-digital-efficiency/",
  "https://www.teamdynamix.com/blog/an-introduction-to-the-itil-framework/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
subgraph Exam["ITIL Foundation V5 試験 40問"]
C1["Cat.1 用語と定義 30% 12点"]
C4["Cat.4 Value System 40% 16点"]
C2["Cat.2 4つの側面 10% 4点"]
C3["Cat.3 ライフサイクル 10% 4点"]
C5["Cat.5 バリューストリーム 5% 2点"]
C6["Cat.6 AI 2.5% 1点"]
C7["Cat.7 他フレームワーク 2.5% 1点"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class C2,C3,C5,C6,C7 box;
class C1,C4 hub;`,
  `flowchart LR
SO["Service Offering サービス提供物"]
A1["Goods 財の移転 Transfer of Goods"]
A2["Resource Access 資源へのアクセス Access to Resources"]
A3["Service Actions サービスアクション"]
SO --> A1
SO --> A2
SO --> A3
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SO hub;
class A1,A2,A3 box;`,
  `flowchart LR
SP["Service Provider サービスプロバイダー"] -->|"Service Offering の提供"| SC["Service Consumer サービスコンシューマー"]
SC -->|"要求・フィードバック・利用データ"| SP
SP -.->|"協働"| VCC["Value Co-Creation 価値共創"]
SC -.->|"協働"| VCC
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SP,SC box;
class VCC hub;`,
  `flowchart TB
Core["Products & Services 製品・サービス"]
D1["Organizations and People 組織と人材"]
D2["Information and Technology 情報と技術"]
D3["Partners and Suppliers パートナーと供給者"]
D4["Value Streams and Processes バリューストリームとプロセス"]
PESTLE["外部要因 PESTLE Political Economic Social Technological Legal Environmental"]
D1 --- Core
D2 --- Core
D3 --- Core
D4 --- Core
PESTLE -.->|"影響"| D1
PESTLE -.->|"影響"| D2
PESTLE -.->|"影響"| D3
PESTLE -.->|"影響"| D4
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1,D2,D3,D4 box;
class Core hub;
class PESTLE done;`,
  `flowchart LR
Discover["1. Discover 発見"] --> Design["2. Design 設計"]
Design --> Acquire["3. Acquire 調達"]
Acquire --> Build["4. Build 構築"]
Build --> Transition["5. Transition 移行"]
Transition --> Operate["6. Operate 運用"]
Operate --> Deliver["7. Deliver 提供"]
Deliver --> Support["8. Support サポート"]
Support -.->|"フィードバック"| Discover
Support -.->|"フィードバック"| Design
Deliver -.->|"フィードバック"| Discover
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Discover,Design,Acquire,Build box;
class Transition,Operate hub;
class Deliver,Support done;`,
  `flowchart TB
subgraph SVS["ITIL Value System ITIL VS"]
GP["Guiding Principles 指導原則 7項目"]
GOV["Governance ガバナンス"]
VC["Value Chain バリューチェーン 8活動"]
MP["Management Practices マネジメントプラクティス 34"]
CI["Continual Improvement 継続的改善 7ステップ"]
GOV --> VC
GP -.->|"適用"| VC
MP -.->|"支援"| VC
CI -.->|"改善"| VC
end
Opportunity["需要・機会 Opportunity Demand"] --> SVS
SVS --> Value["価値 Value"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class GP,GOV,MP,CI box;
class VC hub;
class Opportunity,Value done;`,
  `flowchart TB
MP["34 Management Practices マネジメントプラクティス"]
G["General Management Practices 汎用マネジメントプラクティス 12"]
PS["Product and Service Management Practices 製品・サービスマネジメントプラクティス 22"]
MP --> G
MP --> PS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class MP hub;
class G,PS box;`,
  `flowchart LR
V["1. ビジョンは何か？ What is the vision?"] --> W1["2. 現在地は？ Where are we now?"]
W1 --> W2["3. どこを目指すか？ Where do we want to be?"]
W2 --> H["4. どう到達するか？ How do we get there?"]
H --> A["5. 行動する Take action"]
A --> D["6. 到達したか？ Did we get there?"]
D --> M["7. モメンタムの維持 Keep the momentum going"]
M -.->|"繰り返す"| V
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class V,W1,W2,H,A,D,M box;`,
  `flowchart TD
Start["状況を評価する Confused 未確定の状態から出発"] --> Q1{"因果関係は明確か？"}
Q1 -->|"明確・再現性が高い"| Ordered["Ordered 秩序だった状況"]
Q1 -->|"事後にしか理解できない"| Complex["Complex 複雑な状況"]
Q1 -->|"危機的・即応が必要"| Chaotic["Chaotic 混沌とした状況"]
Ordered --> O1["Appraise Plan Do Study Act 定型手順に沿って実装"]
Complex --> C1["Bound Design Run Examine Distil 範囲を区切り実験しながら発見"]
Chaotic --> Ch1["まず行動して状況を安定化させる"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Start,Q1,Chaotic,Ch1 box;
class Complex,C1 hub;
class Ordered,O1 done;`,
  `flowchart TB
AI["ITIL AI Capability Model 6Cモデル"]
C1["Creation 創出"]
C2["Curation 選別・整理"]
C3["Clarification 明確化"]
C4["Cognition 認知・分析"]
C5["Communication 伝達"]
C6["Coordination 調整"]
AI --- C1
AI --- C2
AI --- C3
AI --- C4
AI --- C5
AI --- C6
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class AI hub;
class C1,C2,C3,C4,C5,C6 box;`,
  `flowchart LR
ITIL["ITIL Value System"] <--> DevOps["DevOps 高速なフロー・自動化文化"]
ITIL <--> P2["PRINCE2 プロジェクトマネジメント手法"]
DevOps -.->|"特に強く関連"| BuildOp["Build Transition Operate 活動"]
P2 -.->|"特に強く関連"| Discover["Discover Design 活動 企画・立ち上げ局面"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class DevOps,P2 box;
class ITIL hub;
class BuildOp,Discover done;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 19,
  note: 3,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 19,
  },
  note: {
    補足: 3,
  },
} as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/itil-foundation-v5-study-guide.vue",
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
  seoTitleFragments: ["ITIL Foundation (Version 5)", "完全学習ガイド"],
  seoTitle: "ITIL Foundation (Version 5) 完全学習ガイド | 初学者のためのステップ・バイ・ステップ解説",
  seoDescription:
    "PeopleCert シラバス v5.0 に基づく ITIL Foundation (Version 5) の非公式学習ガイド。7カテゴリー40問の出題範囲を初学者向けに詳細解説し、各項目のベストプラクティスと出典URLを掲載。",
});

describe("pages/itil-foundation-v5-study-guide.vue — 固有契約", () => {
  it("ヒーロー領域に統計カードが4枚存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
  });
});
