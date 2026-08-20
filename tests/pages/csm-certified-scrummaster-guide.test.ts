// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csm-certified-scrummaster-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified ScrumMaster®(CSM®)完全ガイド",
] as const;

const EXPECTED_H2 = [
  "CSM資格とは何か",
  "認定取得までのロードマップ(ステップバイステップ)",
  "出題範囲(Learning Objectives)の全体像",
  "Scrum理論の基礎(Scrum Theory)",
  "Scrum Team(3つのアカウンタビリティ)",
  "Scrum Events(5つのイベント)",
  "Scrum ArtifactsとCommitments",
  "Scrum Master Core Competencies",
  "Scrum Team・Product Owner・組織への奉仕(Service)",
  "CSM試験の詳細",
  "効果的な学習・試験対策のベストプラクティス",
  "認定更新(Renewal)とキャリアパス",
  "用語対照表(英日対訳)",
  "まとめ",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "CSM資格の概要",
  "Scrum Masterという役割",
  "CSMを取得すべき人",
  "CSM取得のメリット",
  "ステップ詳細",
  "Scrumの定義",
  "Empiricism(経験主義)と3本柱",
  "Scrumの5つの価値基準",
  "アジャイルソフトウェア開発宣言との関係",
  "Developers",
  "Product Owner",
  "Scrum Master",
  "タイムボックス早見表(1ヶ月Sprintの場合の上限)",
  "Sprint",
  "Sprint Planning",
  "Daily Scrum",
  "Sprint Review",
  "Sprint Retrospective",
  "Product Backlog Refinement(詳細化)",
  "Product Backlogと Product Goal",
  "Sprint Backlogと Sprint Goal",
  "Incrementと Definition of Done",
  "ファシリテーションが求められる場面",
  "ファシリテーション・ティーチング・メンタリング・コーチングの違い",
  "Scrum Teamに対するリーダーシップ",
  "技術的負債(Technical Debt)",
  "組織的障害物への対応",
  "組織設計への影響",
  "なぜScrumにはプロジェクトマネージャーがいないのか",
  "受験の流れ",
  "再受験ポリシー",
  "CSM試験に特化した対策",
  "多肢選択式試験全般に有効な一般的コツ",
  "SEU(Scrum Education Units)とは",
  "更新に必要なSEU数と更新料",
  "更新の3ステップ",
  "CSMの先にあるキャリアパス",
  "Scrum Alliance公式",
  "Scrum Guide公式 / アジャイル宣言",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TD
A["Step 1 CST主催の公式CSMコースを受講 最低16時間"] --> B["Step 2 Welcomeメールを受信し認定アカウントを有効化"]
B --> C["Step 3 Dashboardから CSM Examを開始"]
C --> D["Step 4 50問中37問以上正解で合格 制限時間1時間"]
D -->|"不合格の場合"| E["90日以内かつ2回まで無料で再受験可能"]
E --> C
D -->|"合格"| F["Step 5 CSM認定取得 Scrum Alliance会員登録"]
F --> G["Step 6 2年ごとにSEU20単位と更新料で更新"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F,G done;`,
  `flowchart LR
T["Transparency 透明性 作業とプロセスが見える状態"] --> I["Inspection 検査 作成物と進捗を頻繁かつ入念に確認"]
I --> A["Adaptation 適応 逸脱を検知したら速やかに調整"]
A -.->|"学びを得るたびに繰り返す"| T

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class T hub;
class I,A box;`,
  `flowchart TD
SP["Sprint Planning 1ヶ月Sprintで最大8時間"] --> DS["Daily Scrum 毎営業日15分"]
DS -->|"Sprint期間中は毎日繰り返す"| DS
DS --> SR["Sprint Review 1ヶ月Sprintで最大4時間"]
SR --> RETRO["Sprint Retrospective 1ヶ月Sprintで最大3時間"]
RETRO --> SP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SP hub;
class DS,SR,RETRO box;`,
  `flowchart TD
SM["Scrum Master"] --> TEAM["Scrum Teamへの奉仕"]
SM --> PO["Product Ownerへの奉仕"]
SM --> ORG["組織への奉仕"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SM hub;
class TEAM,PO,ORG box;`,
] as const;

const EXPECTED_EXTERNAL_LINKS = [
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://support.scrumalliance.org/hc/en-us/articles/360002112772",
  "https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf",
  "https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://www.scrumalliance.org/about-scrum",
  "https://agilemanifesto.org/principles.html",
  "https://agilemanifesto.org/",
  "https://support.scrumalliance.org/hc/en-us/articles/208753326",
  "https://resources.scrumalliance.org/Article/scrum-exam-study-guide",
  "https://www.scrumalliance.org/get-certified/renewing-certifications",
  "https://support.scrumalliance.org/hc/en-us/articles/7372447688731",
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-csm",
  "certification-roadmap",
  "learning-objectives-overview",
  "scrum-theory",
  "scrum-team",
  "scrum-events",
  "scrum-artifacts",
  "scrum-master-competencies",
  "service-to-team-po-org",
  "exam-details",
  "study-best-practices",
  "renewal-career-path",
  "glossary",
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
  "SECTION 11",
  "SECTION 12",
  "SECTION 13",
  "SECTION 14",
  "SECTION 15",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 12,
  source: 13,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: { "ベストプラクティス": 12 },
  source: { "ソース": 13 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/csm-certified-scrummaster-guide.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  externalUrls: EXPECTED_EXTERNAL_LINKS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  seoTitleFragments: ["Certified ScrumMaster", "CSM", "完全ガイド"],
});
