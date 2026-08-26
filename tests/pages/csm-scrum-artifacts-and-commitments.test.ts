// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csm-scrum-artifacts-and-commitments.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Scrum Artifacts と Commitments 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "Step 0. このガイドについて / CSM試験の基礎知識",
  "Step 1. アーティファクトとコミットメントの全体像",
  "Step 2. プロダクトバックログ(Product Backlog)とプロダクトゴール(Product Goal)",
  "Step 3. スプリントバックログ(Sprint Backlog)とスプリントゴール(Sprint Goal)",
  "Step 4. インクリメント(Increment)と完成の定義(Definition of Done)",
  "Step 5. イベントとアーティファクトの検査ポイント",
  "Step 6. プロダクトビジョン・プロダクトゴール・スプリントゴールの階層構造",
  "Step 7. よくある誤解とCSM試験のひっかけポイント",
  "Step 8. CSM Learning Objectives との対応チェックリスト",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "1-1. アーティファクトとは何か",
  "1-2. コミットメントとは何か",
  "1-3. 全体の流れ(図解)",
  "2-1. 定義",
  "2-2. プロダクトバックログ・リファインメント(Refinement)",
  "2-3. ベストプラクティス:DEEP 特性",
  "2-4. ベストプラクティス:INVEST(項目の書き方)",
  "2-5. リファインメントの実践ポイント",
  "2-6. コミットメント:プロダクトゴール(Product Goal)",
  "2-7. ベストプラクティス:プロダクトゴールの立て方",
  "3-1. 定義",
  "3-2. 特性",
  "3-3. ベストプラクティス",
  "3-4. よくあるアンチパターン",
  "3-5. コミットメント:スプリントゴール(Sprint Goal)",
  "3-6. ベストプラクティス:良いスプリントゴールの書き方",
  "4-1. 定義",
  "4-2. 特性",
  "4-3. ベストプラクティス",
  "4-4. コミットメント:完成の定義(Definition of Done)",
  "4-5. 完成の定義 と 受け入れ基準(Acceptance Criteria)の違い",
  "4-6. ベストプラクティス:完成の定義の作り方",
] as const;

const EXPECTED_H4 = [
  "Scrum Guides(公式)",
  "Scrum Alliance",
  "Scrum.org",
  "その他の一次情報",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
PO["プロダクトオーナー (Product Owner)"] --> PB["プロダクトバックログ (Product Backlog)"]
PB -.->|"Commitment"| PG["プロダクトゴール (Product Goal)"]
PB --> SP["スプリントプランニング (Sprint Planning)"]
SP --> SB["スプリントバックログ (Sprint Backlog)"]
SB -.->|"Commitment"| SG["スプリントゴール (Sprint Goal)"]
SB --> WORK["開発者の作業 (Developers at work)"]
WORK --> INC["インクリメント (Increment)"]
INC -.->|"Commitment"| DOD["完成の定義 (Definition of Done)"]
INC --> SR["スプリントレビュー (Sprint Review)"]
SR --> PB
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PO,SP,WORK,SR box;
class PB,SB,INC hub;
class PG,SG,DOD done;`,
  `flowchart LR
PBI["プロダクトバックログ項目 (PBI)"] --> CHECK{"完成の定義を満たすか"}
CHECK -->|"満たす"| BORN["インクリメントが誕生する"]
CHECK -->|"満たさない"| RETURN["プロダクトバックログへ差し戻す"]
BORN --> REVIEW["スプリントレビューで提示・検査"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PBI,RETURN,REVIEW box;
class CHECK hub;
class BORN done;`,
  `flowchart LR
E1["スプリントプランニング"] --> E2["デイリースクラム (毎日)"]
E2 --> E3["スプリントレビュー"]
E3 --> E4["スプリントレトロスペクティブ"]
E4 -.-> E1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class E1 hub;
class E2,E3 box;
class E4 done;`,
  `flowchart TB
VISION["プロダクトビジョン (組織戦略・長期)"] --> GOAL["プロダクトゴール (長期的な目的地)"]
GOAL --> SG1["スプリントゴール (今回)"]
GOAL --> SG2["スプリントゴール (次回)"]
GOAL --> SG3["スプリントゴール (以降)"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class VISION hub;
class GOAL box;
class SG1,SG2,SG3 done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://caroli.org/en/user-story/",
  "https://resources.scrumalliance.org/Article/product-goals-scrum",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://scrumguides.org/revisions.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.mountaingoatsoftware.com/blog/make-the-product-backlog-deep",
  "https://www.scrum.org/resources/blog/crafting-effective-sprint-goals-scrum",
  "https://www.scrum.org/resources/blog/crafting-good-sprint-goal",
  "https://www.scrum.org/resources/blog/done-understanding-definition-done",
  "https://www.scrum.org/resources/blog/getting-done-creating-good-sprint-goals",
  "https://www.scrum.org/resources/blog/getting-started-definition-done-dod",
  "https://www.scrum.org/resources/blog/product-goal-explained",
  "https://www.scrum.org/resources/blog/scrum-guide-2020-update-commitments",
  "https://www.scrum.org/resources/formulating-product-goal",
  "https://www.scrum.org/resources/using-sprint-backlogs-effectively",
  "https://www.scrum.org/resources/what-definition-done",
  "https://www.scrum.org/resources/what-is-a-sprint-backlog",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf",
] as const;

const EXPECTED_TOC_IDS = [
  "exam-overview",
  "artifacts-commitments-overview",
  "product-backlog",
  "sprint-backlog",
  "increment-definition-of-done",
  "inspection-points",
  "goal-hierarchy",
  "common-misconceptions",
  "learning-objectives-checklist",
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

const EXPECTED_CALLOUT_VARIANTS = {
  note: 4,
  practice: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { 補足: 4 },
  practice: { ベストプラクティス: 2 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "Scrum Artifacts と Commitments 完全ガイド | CSM(R)対策";

const EXPECTED_SEO_DESCRIPTION =
  "Certified ScrumMaster(CSM)取得を目指す初学者向けに、Scrumの3つのアーティファクト(Product Backlog / Sprint Backlog / Increment)と3つのコミットメント(Product Goal / Sprint Goal / Definition of Done)をステップバイステップで解説する学習ガイド。";

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "Scrum Artifacts",
  "Commitments",
] as const;

defineSourceParityContract({
  suiteName: "pages/csm-scrum-artifacts-and-commitments.vue",
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

describe("pages/csm-scrum-artifacts-and-commitments.vue — 個別要素契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローセクションの要素を正しく描画する", () => {
    const wrapper = mountPage();
    expect(wrapper.find(".hero-eyebrow").text()).toContain("Scrum Alliance CSM(R) Learning Objectives 準拠");
    expect(wrapper.find(".hero-lede").text()).toContain("Certified ScrumMaster(R)(CSM(R))取得を目指す初学者を対象に");
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
    expect(wrapper.find(".disclaimer-box").text()).toContain("学習支援を目的とした非公式の解説資料");
  });
});
