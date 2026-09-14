// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-product-owner-ai-essentials.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum Product Owner™ - AI Essentials 完全学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドの使い方",
  "第1部:認定試験の全体像",
  "第2部:AI Theory and Primer(AI理論の基礎)",
  "第3部:AI Security and Ethics(AIのセキュリティと倫理)",
  "第4部:AI Product Ownership(AIを活用したプロダクトオーナーシップ)",
  "第5部:ベストプラクティス総まとめ表",
  "第6部:試験対策とシナリオ思考トレーニング",
  "第7部:参考文献・公式ソース一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 PSPO-AI Essentials とは何か",
  "1.2 受験資格・前提条件",
  "1.3 試験形式・出題範囲",
  "1.4 PSPO I / II / III との違い・位置づけ",
  "1.5 コースの7セクション構成",
  "2.1 AIの全体像と歴史のポイント",
  "2.2 AIの分類:ANI・AGI・ASI",
  "2.3 機械学習(Machine Learning)の基礎",
  "2.4 深層学習(Deep Learning)とニューラルネットワーク",
  "2.5 生成AI(Generative AI)の仕組み",
  "2.6 エージェンティックAI(Agentic AI)とは",
  "2.7 プロンプトエンジニアリングとトークン化(Tokenization)",
  "2.8 効果的なプロンプトのベストプラクティス",
  "3.1 Responsible AI(責任あるAI)の基本姿勢",
  "3.2 4D AI Fluency Framework(AI流暢性の4Dフレームワーク)",
  "3.3 ハルシネーション(Hallucination)とバイアス(Bias)",
  "3.4 データプライバシーとセキュリティ",
  "3.5 4つのガードレール(Ethical AI for Product Owners)",
  "3.6 規制・法令の概観",
  "3.7 プロダクトオーナーの説明責任(Accountability)",
  "4.1 The Visionary(ビジョナリー)× AI",
  "4.2 The Customer Representative(顧客代表)× AI",
  "4.3 The Experimenter(実験者)× AI",
  "4.4 The Decision Maker(意思決定者)× AI",
  "4.5 The Collaborator & Influencer(協働者・インフルエンサー)× AI",
  "4.6 The Orchestrator(オーケストレーター)— AI時代の新スタンス",
  "4.7 誤解されたスタンスとAI利用の落とし穴",
  "6.1 学習の進め方",
  "6.2 出題されやすい思考パターン",
  "6.3 練習シナリオ例(自作・非公式)",
] as const;

const EXPECTED_H4 = [
  "Scrum.org 公式ページ(PSPO-AI Essentials 関連)",
  "Product Owner スタンス関連(Scrum.org)",
  "Scrumの一次情報",
  "AI理論・倫理・フレームワーク関連",
  "補足:コースパートナーによる紹介ページ(ツール例・学習目標の参照用)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "how-to-use",
  "exam-overview",
  "ai-theory-primer",
  "ai-security-ethics",
  "ai-product-ownership",
  "best-practices-summary",
  "exam-prep",
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
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://academy.claude.com/courses/ai-fluency-framework-foundations/the-4d-framework",
  "https://academy.xebia.com/training/professional-scrum-product-owner-ai-essentials-training/",
  "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
  "https://scrumguides.org/scrum-guide.html",
  "https://tryscrum.com/certifications/agile/scrum/product-owner/professional-scrum-product-owner-ai-essentials-training/",
  "https://www-cdn.anthropic.com/334975cdec18f744b4fa511dc8518bd8d119d29d.pdf",
  "https://www.nist.gov/itl/ai-risk-management-framework",
  "https://www.prowareness.com/academy/en/trainingen/professional-scrum-product-owner-ai-essentials-pspo-ai-english",
  "https://www.scrum.org/assessments/professional-scrum-product-owner-ai-essentials-certification",
  "https://www.scrum.org/courses/professional-scrum-product-owner-ai-essentials-training",
  "https://www.scrum.org/professional-scrum-certifications",
  "https://www.scrum.org/resources/blog/augmented-product-owner-amplifying-scrum-ai",
  "https://www.scrum.org/resources/blog/crossroads-product-ownership-and-ai",
  "https://www.scrum.org/resources/blog/ethical-ai-product-owners-product-managers",
  "https://www.scrum.org/resources/blog/experimenter-preferred-product-owner-stance",
  "https://www.scrum.org/resources/blog/product-owners-ai-start-checklist",
  "https://www.scrum.org/resources/blog/stances-product-owner",
  "https://www.scrum.org/resources/blog/vlog-why-what-pspo-ai-essentials-course-explained",
  "https://www.scrum.org/resources/evidence-based-management-guide",
  "https://www.scrum.org/resources/scrumorg-announces-new-ai-training-product-owners",
  "https://www.scrum.org/resources/what-is-a-product-owner",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["PSPO I 基礎"] --> B["PSPO II 応用"]
B --> C["PSPO III 卓越"]
A -.->|"AI適用を深掘り"| D["PSPO-AI Essentials"]
B -.->|"AI適用を深掘り"| D

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,C box;
class D hub;`,
  `flowchart TD
S1["Section1 Visionary"] --> S2["Section2 Customer Representative"]
S2 --> S3["Section3 Experimenter"]
S3 --> S4["Section4 Decision Maker"]
S4 --> S5["Section5 Collaborator and Influencer"]
S5 --> S6["Section6 Orchestrator"]
S6 --> S7["Section7 AI Theory Ethics Security"]
S7 -.->|"基礎知識として全体を支える"| S1

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6 box;
class S7 hub;`,
  `flowchart LR
A["ルールベースAI 記号主義"] --> B["機械学習 Machine Learning"]
B --> C["深層学習 Deep Learning"]
C --> D["生成AI Generative AI"]
D --> E["エージェンティックAI Agentic AI"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;
class E done;`,
  `sequenceDiagram
participant PO as Product Owner
participant Agent as AI Agent
participant PBL as Product Backlog
PO->>Agent: ユーザーフィードバックの収集と分析を依頼
Agent->>Agent: 繰り返し発生する課題パターンを特定
Agent->>PO: 課題パターンのサマリーを提示
PO->>Agent: ドラフトPBIの作成を依頼
Agent->>PBL: ドラフトPBIを追加
PO->>PBL: 内容を精査しOrderingを確定`,
  `flowchart LR
A["自然言語プロンプト"] --> B["トークン化 Tokenization"]
B --> C["モデル推論 LLM Inference"]
C --> D["次トークンの確率予測を繰り返す"]
D --> E["トークン列をデコード"]
E --> F["自然言語の出力"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F done;`,
  `flowchart LR
D1["Delegation 委任"] --> D2["Description 説明"]
D2 --> D3["Discernment 見極め"]
D3 --> D4["Diligence 責任"]
D4 -.->|"次のタスクへ活かす"| D1

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class D1,D2,D3 box;
class D4 hub;`,
  `flowchart TD
Gov["Govern 統治"] --> Map["Map リスクの特定"]
Map --> Meas["Measure 測定"]
Meas --> Man["Manage 管理"]
Man -.->|"継続的に見直す"| Gov

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Map,Meas,Man box;
class Gov hub;`,
  `flowchart TD
V["価値の最大化 Value Maximization"]
V --> S1["The Visionary"]
V --> S2["The Customer Representative"]
V --> S3["The Experimenter"]
V --> S4["The Decision Maker"]
V --> S5["The Collaborator"]
V --> S6["The Influencer"]
V --> S7["The Orchestrator"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6,S7 box;
class V hub;`,
  `flowchart LR
A["顧客インタビューデータ"] --> B["AIによる要約 分析"]
B --> C["ユーザーペルソナのドラフト"]
C --> D["チームでのレビューと検証"]
D --> E["確定したペルソナをディスカバリーに活用"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;
class E done;`,
  `flowchart TD
Meet["ステークホルダーとの対話 会議"] --> Trans["AIによる文字起こし"]
Trans --> Sum["要点とアクションアイテムの抽出"]
Sum --> Sent["感情分析によるトーンの把握"]
Sent --> Track["要望の分類 優先度付けとトラッキング"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Meet,Trans,Sum,Sent box;
class Track done;`,
  `flowchart TD
A["公式トレーニングを受講する"] --> B["Exam Codeを受領する"]
B --> C["本ガイドで3カテゴリを復習する"]
C --> D["Scrum GuideとEBM Guideを再読する"]
D --> E["自分の言葉で各スタンスのAI活用例を説明できるか確認する"]
E --> F["練習シナリオで自己チェックする"]
F --> G["14日以内を目安に受験する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F box;
class G done;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 3,
  practice: 12,
  source: 6,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    補足: 3,
  },
  practice: {
    ベストプラクティス: 12,
  },
  source: {
    ソース: 6,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "PSPO-AI Essentials® 認定資格 完全ガイド | Professional Scrum Product Owner - AI Essentials 学習ガイド";
const EXPECTED_SEO_DESCRIPTION =
  "Scrum.org Professional Scrum Product Owner - AI Essentials認定資格の非公式学習ガイド。AI Theory and Primer、AI Security and Ethics、AI Product Ownershipの3カテゴリを初学者向けに解説します。";

describe("pages/professional-scrum-product-owner-ai-essentials.vue", () => {
  defineSourceParityContract({
    suiteName: "pages/professional-scrum-product-owner-ai-essentials.vue",
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
    seoTitleFragments: ["PSPO-AI Essentials", "Professional Scrum Product Owner - AI Essentials"],
    seoTitle: EXPECTED_SEO_TITLE,
    seoDescription: EXPECTED_SEO_DESCRIPTION,
    allowedHeadingSkips: ["h2 -> h4"],
  });

  const mountPage = createMountPage(Page);

  it("テーブルがすべて table-wrap で包まれ横スクロール可能である", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables.length).toBe(18);
    const wrappedTables = wrapper.findAll(".table-wrap > table");
    expect(wrappedTables.length).toBe(tables.length);
  });
});
