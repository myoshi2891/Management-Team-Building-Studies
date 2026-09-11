// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-developer.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum Developer(PSD I)認定資格 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "この資格の全体像",
  "Part A: Scrumフレームワークの理解と適用",
  "Part B: プロフェッショナルとしてのプロダクト開発と提供",
  "Part C: 人とチームの成長",
  "Part D: アジリティを持ったプロダクトマネジメント",
  "モダンなエンジニアリングプラクティスとDevOps",
  "ベストプラクティス総まとめ表",
  "学習ロードマップ",
  "理解度チェック(オリジナル問題)",
  "よくある誤解と注意点",
  "参考文献・出典一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 PSD Iとは何か",
  "1.2 試験概要",
  "1.3 前提条件・対象者",
  "1.4 出題範囲マッピング",
  "2.1 経験主義(Empiricism)",
  "2.2 Scrumの5つの価値基準(Scrum Values)",
  "2.3 Scrum Team",
  "2.4 Scrumイベント(Events)",
  "2.5 Scrum成果物(Artifacts)とコミットメント",
  "2.6 完成の定義(Definition of Done)",
  "3.1 プロダクトバックログリファインメント(Backlog Refinement)",
  "3.2 職能横断型チーム(Cross-functional)",
  "3.3 自己管理型の開発(Self-managed Development)",
  "3.4 設計とアーキテクチャ(Design and Architecture)",
  "3.5 プログラミング(Programming)",
  "3.6 品質(Quality)",
  "3.7 テスト(Testing)",
  "4.1 自己管理型チーム(Self-Managing Teams)",
  "4.2 ファシリテーション(Facilitation)",
  "4.3 コーチングとメンタリング(Coaching and Mentoring)",
  "5.1 予測とリリース計画(Forecasting and Release Planning)",
  "5.2 プロダクト価値(Product Value)",
  "5.3 プロダクトバックログマネジメント(Product Backlog Management)",
  "5.4 ステークホルダーと顧客(Stakeholders and Customers)",
  "6.1 継続的インテグレーション / 継続的デリバリー(CI/CD)",
  "6.2 進化的データベース設計(Evolutionary Database Development)",
  "6.3 技術的負債の可視化と返済",
  "Q1. Scrum Guide 2020において、以前存在した「Development Team」というサブチームの概念はどうなったか。",
  "Q2. テストピラミッドの考え方として最も適切なものはどれか。",
  "Q3. 技術的負債への向き合い方として、Scrumのエンジニアリングプラクティスとして推奨されるのはどれか。",
  "Scrum.org 公式リソース",
  "その他の一次情報・外部リソース",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "overview",
  "part-a-scrum-framework",
  "part-b-developing-delivering",
  "part-c-people-teams",
  "part-d-managing-products",
  "devops-engineering-practices",
  "best-practices-summary",
  "study-roadmap",
  "practice-quiz",
  "common-misconceptions",
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
] as const;

const EXPECTED_STEP_TAGS = ["1", "2", "3", "4", "5", "6"] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 2,
  source: 9,
  practice: 25,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { 補足: 2 },
  source: { ソース: 9 },
  practice: { ベストプラクティス: 25 },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-scrum-developer-certification",
  "https://www.scrum.org/assessments/professional-scrum-developer-certification",
  "https://www.scrum.org/assessments/professional-scrum-developer-certification",
  "https://www.in.gov/dwd/files/industry-certifications/Professional-Scrum-Developer-PSD.pdf",
  "https://www.scrum.org/resources/suggested-reading-professional-scrum-developer",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.scrum.org/professional-scrum-competencies/understanding-and-applying-scrum-framework",
  "https://www.scrum.org/professional-scrum-competencies/developing-and-delivering-products-professionally",
  "https://www.scrum.org/resources/suggested-reading-professional-scrum-developer",
  "https://www.scrum.org/resources/professional-scrum-competency-developing-people-and-teams",
  "https://www.scrum.org/professional-scrum-competencies/managing-products-with-agility",
  "https://www.scrum.org/courses/applying-professional-scrum-for-software-development-training",
  "https://www.scrum.org/open-assessments",
  "https://www.scrum.org/open-assessments/scrum-developer-open",
  "https://www.scrum.org/resources/suggested-reading-professional-scrum-developer",
  "https://www.scrum.org/assessments/professional-scrum-developer-certification",
  "https://www.scrum.org/resources/suggested-reading-professional-scrum-developer",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.scrum.org/professional-scrum-competencies/understanding-and-applying-scrum-framework",
  "https://www.scrum.org/professional-scrum-competencies/developing-and-delivering-products-professionally",
  "https://www.scrum.org/resources/professional-scrum-competency-developing-people-and-teams",
  "https://www.scrum.org/professional-scrum-competencies/managing-products-with-agility",
  "https://www.scrum.org/resources/scrum-guide",
  "https://www.scrum.org/courses/applying-professional-scrum-for-software-development-training",
  "https://www.scrum.org/open-assessments",
  "https://www.scrum.org/open-assessments/scrum-developer-open",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.credly.com/org/scrum-org/badge/professional-scrum-developer-i-psd-i",
  "https://www.in.gov/dwd/files/industry-certifications/Professional-Scrum-Developer-PSD.pdf",
  "https://www.scrum.org/assessments/professional-scrum-developer-certification",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
EXAM["PSD I 試験 80問 / 60分 / 合格ライン85%"]
A["A. Scrumフレームワークの 理解と適用"]
B["B. プロフェッショナルとしての プロダクト開発と提供"]
C["C. 人とチームの成長"]
D["D. アジリティを持った プロダクトマネジメント"]

EXAM --> A
EXAM --> B
EXAM --> C
EXAM --> D

A --> A1["Empiricism 経験主義"]
A --> A2["Scrum Values"]
A --> A3["Scrum Team"]
A --> A4["Events"]
A --> A5["Artifacts"]
A --> A6["Done"]

B --> B1["Backlog Refinement"]
B --> B2["Cross-functional"]
B --> B3["Self-managed Development"]
B --> B4["Design and Architecture"]
B --> B5["Programming"]
B --> B6["Quality"]
B --> B7["Testing"]

C --> C1["Self-Managing Teams"]
C --> C2["Facilitation"]
C --> C3["Coaching and Mentoring"]

D --> D1["Forecasting and Release Planning"]
D --> D2["Product Value"]
D --> D3["Product Backlog Management"]
D --> D4["Stakeholders and Customers"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class EXAM hub;
class A,B,C,D,A1,A2,A3,A4,A5,A6,B1,B2,B3,B4,B5,B6,B7,C1,C2,C3,D1,D2,D3,D4 box;`,
  `flowchart LR
T["透明性 Transparency プロセスと成果物が 関係者に見える状態"] --> I["検査 Inspection 進捗と成果物を 頻繁に検査する"]
I --> AD["適応 Adaptation ずれが見つかったら すぐに調整する"]
AD -.->|"フィードバック"| T

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class T,I,AD box;`,
  `flowchart LR
SP["Sprint Planning Whatと Howと Whyを決める"] --> DS["Daily Scrum 毎日15分 進捗を検査し計画を調整"]
DS --> DS
DS --> SR["Sprint Review 増分を検査し バックログを適応させる"]
SR --> RETRO["Sprint Retrospective チームの働き方を 検査し改善する"]
RETRO --> SP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SP hub;
class DS,SR,RETRO box;`,
  `flowchart LR
G["最初に大まかな アーキテクチャ方針を決める"] --> S1["Sprint 1: 動くものを作る"]
S1 --> R1["得られた知見で 設計をリファクタリング"]
R1 --> S2["Sprint 2: 機能を追加"]
S2 --> R2["さらにリファクタリング"]
R2 --> S3["Sprint N: 継続"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class G hub;
class S1,R1,S2,R2,S3 box;`,
  `flowchart LR
RED["Red 失敗するテストを書く"] --> GREEN["Green テストを通す 最小限の実装"]
GREEN --> REFACTOR["Refactor 重複を排除し 設計を改善"]
REFACTOR --> RED

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class RED hub;
class GREEN,REFACTOR box;`,
  `flowchart TB
UI["UI / E2Eテスト 実行数は少なく低速 実際のユーザー操作に近い"]
IT["統合テスト Integration Tests コンポーネント間の結合を検証"]
UT["ユニットテスト Unit Tests 数が多く高速 個々のロジックを検証"]
UT --> IT
IT --> UI

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class UT hub;
class IT,UI box;`,
  `flowchart LR
DEV["コード変更を コミット"] --> BUILD["自動ビルド"]
BUILD --> TEST["自動テスト実行 ユニット/統合"]
TEST --> STAGE["ステージング環境へ 自動デプロイ"]
STAGE --> RELEASE["本番環境へ リリース"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class DEV hub;
class BUILD,TEST,STAGE box;
class RELEASE done;`,
  `flowchart TB
S1["Step 1 Scrum Guide 2020を精読する"] --> S2["Step 2 Professional Scrum Competenciesの4領域を確認する"]
S2 --> S3["Step 3 PSD I向けSuggested Reading ページの推薦図書に目を通す"]
S3 --> S4["Step 4 Scrum Openと Scrum Developer Openを受験する"]
S4 --> S5{"連続して 高得点が取れるか"}
S5 -- いいえ --> S6["Step 5 弱点分野を復習する"]
S6 --> S4
S5 -- はい --> S7["Step 6 PSD I本試験を受験する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1 hub;
class S2,S3,S4,S5,S6 box;
class S7 done;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-scrum-developer.vue",
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
  seoTitleFragments: ["Professional Scrum Developer", "PSD I", "完全ガイド"],
  seoTitle: "Professional Scrum Developer(PSD I)認定資格 完全ガイド | Scrum.org公式情報に基づく学習リソース",
  seoDescription: "Scrum.orgのProfessional Scrum Developer(PSD I)認定資格について、4つのProfessional Scrum Competencies(出題範囲)を初学者向けにステップバイステップで解説する非公式の学習ガイドです。",
});

describe("pages/professional-scrum-developer.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("[data-testid='sidebar-toggle']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("nav.sidebar").classes()).toContain("open");
  });

  it("リスト要素（通常箇条書き、ステップ、参考文献）が適切なクラスとDOM構造を持つ", () => {
    const wrapper = mountPage();
    // 通常リスト
    expect(wrapper.findAll("ul:not(.sidebar-nav):not(.ref-list)").length).toBeGreaterThan(0);
    // ロードマップステップリスト
    const stepLists = wrapper.findAll(".step-list");
    expect(stepLists.length).toBe(1);
    expect(stepLists[0]!.findAll(".step-num").map((el) => el.text())).toEqual([...EXPECTED_STEP_TAGS]);
    // 参考文献リスト
    const refLists = wrapper.findAll(".ref-list");
    expect(refLists.length).toBe(2);
  });
});
