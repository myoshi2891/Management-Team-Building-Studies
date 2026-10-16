// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { MERMAID_DIAGRAM_DECLARATION } from "../../.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/itil-managing-professional-transition-v5-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ITIL® Managing Professional Transition (Version 5)",
] as const;

const EXPECTED_H2 = [
  "この資格について",
  "ITIL (Version 5) 全体像 — v3 / v4 からの進化",
  "共通基盤概念 — ITIL Value System・7つのGuiding Principles・Four Dimensions",
  "試験1: ITIL Transformation (Version 5)",
  "試験2: ITIL Managing Professional Transition — Product, Service, Experience (Version 5)",
  "共通トピック: ITIL and AI — AI Capability Model",
  "ITIL と他フレームワークとの関係(DevOps・PRINCE2)",
  "試験対策のポイント",
  "学習チェックリスト",
  "参考文献(Sources)",
] as const;

const EXPECTED_H3 = [
  "ITIL Managing Professional Transition (Version 5) とは何か",
  "認定の位置づけ",
  "試験構成の全体比較",
  "公式教材",
  "資格の更新",
  "ITIL Value System (ITIL VS)",
  "7つの Guiding Principles(変更なし)",
  "Four Dimensions of Product and Service Management",
  "Transformationの基本概念",
  "ITIL Transformation Model — 4つの Layer",
  "変革の複雑性とコンテキストへの適応",
  "変革の3つの共通パターン(Common Patterns)",
  "測定・ツール・学習",
  "ITIL and AI(Transformation観点)",
  "デジタルプロダクトとデジタルサービスの基礎概念",
  "Product and Service Lifecycle Model (PSLM) — 8つの活動",
  "ライフサイクルの管理 — バリューストリームとオペレーティングモデル",
  "ITIL Experience Model",
  "シナリオベース試験への向き合い方",
  "試験別の学習配分の目安",
  "頻出の誤答パターン(Common Pitfalls)",
] as const;

const EXPECTED_H4 = [
  "経験(Experience)の本質",
  "経験のステークホルダー",
  "Four Experience Domains(4つの経験ドメイン)",
  "経験のライフサイクルへの統合",
  "経験のキャプチャ(Capturing Experience)",
  "サービスジャーニー(Service Journey)— 7つのステップ",
  "ステークホルダージャーニー(Stakeholder Journeys)",
  "デジタル経験の改善 — Notice–Interpret–Hypothesize–Experiment ループ",
  "PeopleCert 公式・ITIL公式情報",
  "認定研修プロバイダー(ATO)によるシラバス・コース詳細",
  "解説記事・比較コンテンツ",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "about-mpt",
  "itil-v5-evolution",
  "foundational-concepts",
  "exam1-transformation",
  "exam2-product-service-experience",
  "ai-capability-model",
  "itil-other-frameworks",
  "exam-strategy",
  "study-checklist",
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

const EXPECTED_EXTERNAL_URLS = [
  "https://advancedtraining.com.au/product/itil-ai-governance-version-5/",
  "https://advancedtraining.com.au/product/itil-experience-version-5/",
  "https://advancedtraining.com.au/product/itil-transformation-version-5/",
  "https://agilepmhub.com/itil-experience-version-5",
  "https://agilepmhub.com/itil-managing-professional-version-5",
  "https://blog.invgate.com/itil-5-what-changes",
  "https://blog.invgate.com/itil-service-operation",
  "https://certempire.com/itil-foundation-v5-guide/",
  "https://invgate.com/itsm/itil",
  "https://itsm.tools/itil-version-5-vs-itil-4-key-changes/",
  "https://itsmacademy.com/itil-transformation-course",
  "https://itsmacademy.com/itil-version-5-managing-professional-transition-course",
  "https://medium.com/the-itsm-practice-podcast/itil-5-the-end-of-explaining-failure-f24ccae28573",
  "https://rixmind.com/itil-5-what-changed-and-why-it-matters/",
  "https://www.alloysoftware.com/blog/itil-lifecycle/",
  "https://www.diontraining.com/blogs/news/itil-5-ai-governance",
  "https://www.diontraining.com/blogs/news/itil-5-process",
  "https://www.diontraining.com/blogs/news/itil-5-vs-itil-4",
  "https://www.diontraining.com/collections/itil-5-foundation",
  "https://www.expertrain.co.uk/post/what-comes-after-itil-foundation",
  "https://www.ilxgroup.com/usa/blog/introducing-itil-version-5-everything-you-need-to-know-about-the-new-certification-scheme",
  "https://www.ilxgroup.com/usa/training/itil/experience",
  "https://www.ilxgroup.com/usa/training/itil/itil-transformation-version-5",
  "https://www.itil.com/Itil-News-and-Announcements/itil-product-and-service-lifecycle-model",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-ai-governance-guidance",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-experience-user-experience",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-foundation-whats-new-guide",
  "https://www.itil.com/professionals/certifications/ITIL-AI-Governance-Version-5",
  "https://www.itil.com/professionals/certifications/ITIL-Experience-Version-5",
  "https://www.itil.com/professionals/certifications/ITIL-Product-Version-5",
  "https://www.itil.com/professionals/certifications/ITIL-Transformation-Version-5",
  "https://www.itil.org.uk/blog/itil-version-5-a-complete-guide",
  "https://www.itil.org.uk/training/itil-managing-professional-certification/itil-5-managing-professional-transition-training-course",
  "https://www.itil.org.uk/training/itil-transformation-courses/itil-transformation-certification-training-course",
  "https://www.itsmhub.com/products/itil-transformation-course-examination",
  "https://www.learningtree.com/courses/itil-experience-version-five-training/",
  "https://www.learningtree.com/courses/itil-managing-professional-transition-version-five/",
  "https://www.novelvista.com/blogs/it-service-management/itil5-service-value-chain",
  "https://www.oxfordcollegeoftechnology.com/itil-version-5/itil-experience-version-5/",
  "https://www.oxfordcollegeoftechnology.com/itil-version-5/itil-managing-professional-transition-version-5/",
  "https://www.peoplecert.org/Itil-News-and-Announcements/2026-qualiti7-peoplecert-webinar-series-ai-native-organization-session-3/browse-certifications/it-governance-and-service-management/ITIL-1/itil-experience-version-5-4177",
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-ai-governance-version-5-4234",
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-managing-professional-transition-version-5-4227",
  "https://www.pmgacademy.com/en/articles/itil/service-journey-in-itil-5-the-complete-guide-to-customer-experience-and-digital-value/",
  "https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation/",
  "https://www.qa.com/course-catalogue/courses/itil-managing-professional-transition-itil5trns/",
  "https://www.sapience-consulting.com/itil-experience-certification-v5/",
  "https://www.theknowledgeacademy.com/courses/itil-training/itil-5-managing-professional-transition-training-course/",
  "https://www.udemy.com/course/itil-transformation-version-5-practice-tests/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
subgraph RouteGeneral["ルート1: 一般的なFoundationルート(前提資格なし)"]
direction TB
FG["ITIL Foundation Version 5"] --> FG2["Product/Service/Experience/ Transformationを個別取得"]
FG2 --> FG3["Managing Professional Version 5"]
FG --> FG4["Strategy/Transformationを個別取得"]
FG4 --> FG5["Strategic Leader Version 5"]
FG --> FG6["Practice Managerモジュールを個別取得"]
FG6 --> FG7["Practice Manager Version 5"]
FG3 --> FG8["ITIL Master Version 5"]
FG5 --> FG8
FG7 --> FG8
end
subgraph Route4MP["ルート2: ITIL 4 Managing Professionalからの移行"]
direction TB
MP4["ITIL 4 Managing Professional 保有"] --> MPT4MP["MPT研修 + Exam1/Exam2 合格"]
MPT4MP --> MP4R["Managing Professional Version 5 認定 (Transformationも認定済み)"]
MP4R --> MP4S["残る Practice Manager・Strategic Leaderを 別途個別取得"]
MP4S --> MP4M["ITIL Master Version 5"]
end
subgraph Route4["ルート3: ITIL 4 Masterからの移行"]
direction TB
M4["ITIL 4 Master 保有"] --> MPT4["MPT研修 + Exam1/Exam2 合格"]
MPT4 --> M4R["Managing Professional・Practice Manager・ Strategic Leaderを一括認定"]
M4R --> M4M["ITIL Master Version 5"]
end
subgraph RouteV3["ルート4: ITIL v3 Masterからの移行"]
direction TB
M3["ITIL v3 Master 保有 (v3 Expertも同様にMPまで)"] --> MPT3["MPT研修 + Exam1/Exam2 合格"]
MPT3 --> M3R["Managing Professional Version 5 認定 (Transformationも認定済み)"]
M3R --> M3S["Practice Manager・Strategic Leaderを 別途個別取得"]
M3S --> M3M["ITIL Master Version 5"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class FG,FG2,FG4,FG6,MP4,M4,M3 box;
class MPT4MP,MP4R,MP4S,MPT4,MPT3,M3R,M3S hub;
class FG3,FG5,FG7,FG8,MP4M,M4R,M4M,M3M done;`,
  `flowchart TB
Center["ITIL Value System"]
Center --> D1["Organizations and People (組織と人材/AIとの協働を含む)"]
Center --> D2["Information and Technology (AI Capability Model/6Cモデルを含む)"]
Center --> D3["Partners and Suppliers"]
Center --> D4["Value Streams and Processes"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Center hub;
class D1,D2,D3,D4 box;`,
  `flowchart TB
subgraph L1["Governance layer"]
direction TB
G1["方向性・権限・優先順位づけ"]
end
subgraph L2["Positioning layer"]
direction TB
P1["コンテキストと複雑性の把握"]
end
subgraph L3["Execution layer"]
direction TB
E1["計画と実行"]
end
subgraph L4["Learning layer"]
direction TB
Le1["測定・評価・学習"]
end
L1 --> L2
L2 --> L3
L3 --> L4
L4 -.->|学びのフィードバック| L1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class L1,L2,L3,L4 box;`,
  `flowchart TD
P1["Initiation pattern (変革の立ち上げ)"]
P2["Governance pattern (変革のガバナンス)"]
P3["Execution pattern (変革の実行)"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P1,P2,P3 box;`,
  `flowchart LR
D1["Discover"] --> D2["Design"]
D2 --> D3["Acquire"]
D3 --> D4["Build"]
D4 --> D5["Transition"]
D5 --> D6["Operate"]
D6 --> D7["Deliver"]
D7 --> D8["Support"]
D8 -.->|フィードバック| D1
D8 -.->|フィードバック| D2
D6 -.->|フィードバック| D1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1,D2,D3,D4 box;
class D5,D6 hub;
class D7,D8 done;`,
  `flowchart TB
Exp["経験(Experience)"]
Exp --> P["Personal (個人的ドメイン)"]
Exp --> F["Functional (機能的ドメイン)"]
Exp --> R["Relational (関係的ドメイン)"]
Exp --> C["Contextual (文脈的ドメイン)"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Exp hub;
class P,F,R,C box;`,
  `flowchart LR
S1["Explore (探索)"] --> S2["Engage (関係構築)"]
S2 --> S3["Offer (提案)"]
S3 --> S4["Agree (合意)"]
S4 --> S5["Onboard (導入)"]
S5 --> S6["Co-create (共創)"]
S6 --> S7["Reflect (振り返り)"]
S7 -.->|継続的関係| S1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6,S7 box;`,
  `flowchart LR
N["Notice (気づく)"] --> I["Interpret (解釈する)"]
I --> H["Hypothesize (仮説を立てる)"]
H --> E["Experiment (実験する)"]
E -.->|結果を観察| N
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class N,I,H,E box;`,
  `flowchart TB
AI["ITIL AI Capability Model"]
AI --> C1["Creation (生成)"]
AI --> C2["Curation (選別・整理)"]
AI --> C3["Clarification (明確化)"]
AI --> C4["Cognition (認知・分析)"]
AI --> C5["Communication (伝達)"]
AI --> C6["Coordination (調整)"]
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class AI hub;
class C1,C2,C3,C4,C5,C6 box;`,
] as const;

function normalizeMermaidSource(raw: string): string {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines.at(-1)?.trim() === "") lines.pop();
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const commonIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(commonIndent).trimEnd()).join("\n");
}

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 26,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 24,
    "ベストプラクティス(PSLM全体)": 1,
    "ベストプラクティス(Experience×AI)": 1,
  },
  note: {
    補足: 1,
  },
} as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/itil-managing-professional-transition-v5-guide.vue",
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
  seoTitleFragments: ["ITIL® Managing Professional Transition (Version 5)", "完全ガイド"],
  seoTitle: "ITIL® Managing Professional Transition (Version 5) 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  seoDescription:
    "ITIL Managing Professional Transition (Version 5) を初学者向けにステップバイステップで解説。Transformation Model、PSLM 8活動、ITIL Experience Model、AI Capability Model、各項目のベストプラクティスと出典URLを網羅。",
});

describe("pages/itil-managing-professional-transition-v5-guide.vue — 固有契約", () => {
  it("ヒーロー領域に統計カードが4枚存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
  });
});

