// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/five-dysfunctions-of-a-team-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "『あなたのチームは、機能してますか？』完全ガイド",
] as const;

const EXPECTED_H2 = [
  "この本について",
  "著者紹介: パトリック・レンシオーニ",
  "全体像: 5つの機能不全モデルとは",
  "機能不全を1つずつ理解する",
  "ステップバイステップ実践ガイド: チーム改善の5ステップサイクル",
  "ソフトウェア開発・エンジニアリングチームでの実践例",
  "関連フレームワークとの比較: Googleの「Project Aristotle」",
  "批判的視点と限界",
  "今週から始める実践チェックリスト",
  "まとめ",
  "参考文献・出典URL一覧",
] as const;

const EXPECTED_H3 = [
  "機能不全1: 信頼の欠如(Absence of Trust)",
  "機能不全2: 衝突への恐怖(Fear of Conflict)",
  "機能不全3: 積極的関与の不足(Lack of Commitment)",
  "機能不全4: 説明責任の回避(Avoidance of Accountability)",
  "機能不全5: 結果への無関心(Inattention to Results)",
  "各ステップの詳細",
  "書誌・原典情報",
  "エンジニアリングリーダーからの実践知見",
  "比較・批判的視点",
] as const;

const EXPECTED_H4 = [
  "Step1: チーム診断アンケートを実施する",
  "Step2: 最も弱い階層を特定する",
  "Step3: 具体的な介入策を選ぶ",
  "Step4: 実践する",
  "Step5: ふりかえり、効果を測定する",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart BT
    T["1 信頼の欠如 Absence of Trust"] --> C["2 衝突への恐怖 Fear of Conflict"]
    C --> CM["3 積極的関与の不足 Lack of Commitment"]
    CM --> AC["4 説明責任の回避 Avoidance of Accountability"]
    AC --> R["5 結果への無関心 Inattention to Results"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T hub;
    class C,CM,AC box;
    class R done;`,
  `flowchart TD
    S1["Step1 チーム診断アンケートを実施する"] --> S2["Step2 最も弱い階層を特定する"]
    S2 --> S3["Step3 該当する機能不全への具体的な介入策を選ぶ"]
    S3 --> S4["Step4 1on1やチームミーティングで実践する"]
    S4 --> S5["Step5 定期的にふりかえり効果を測定する"]
    S5 -->|"改善が不十分な場合"| S2
    S5 -->|"土台が固まった場合"| S6["次の階層に着手する"]
    S6 --> S2

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5 box;
    class S6 done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/the-five-dysfunctions/9780787960759/",
  "https://en.wikipedia.org/wiki/The_Five_Dysfunctions_of_a_Team",
  "https://addyosmani.com/blog/debugging-teams-lencioni/",
  "https://lethain.com/gelling-engineering-leadership-team/",
  "https://www.patkua.com/blog/project-aristotle/",
  "https://handbook.gitlab.com/teamops/equal-contributions/",
  "https://www.infoq.com/news/2009/08/agile-five-team-dysfunctions",
  "https://www.discprofile.com/fac-sup/fac-tips/model",
  "https://getleda.com/high-performing-teams/frameworks",
  "https://prairieoyster24.substack.com/p/the-five-dysfunctions-of-a-team-a",
] as const;

const EXPECTED_TOC_IDS = [
  "about-the-book",
  "about-the-author",
  "the-model-overview",
  "five-dysfunctions-explained",
  "step-by-step-practice-guide",
  "engineering-team-practices",
  "comparison-project-aristotle",
  "critiques-and-limitations",
  "this-weeks-checklist",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 1 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "あなたのチームは、機能してますか？",
  "完全ガイド",
] as const;

const EXPECTED_SEO_TITLE =
  "『あなたのチームは、機能してますか？』完全ガイド | The Five Dysfunctions of a Team";
const EXPECTED_SEO_DESCRIPTION =
  "Patrick Lencioni著『The Five Dysfunctions of a Team』を初学者向けに解説。5つの機能不全のピラミッド構造とステップバイステップの実践ガイド、エンジニアリングチームでの応用例を紹介します。";

defineSourceParityContract({
  suiteName: "pages/five-dysfunctions-of-a-team-guide.vue",
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

describe("pages/five-dysfunctions-of-a-team-guide.vue — アクセシビリティ固有契約", () => {
  it("A-1: スキップリンクが存在し、main#main-content を指している", () => {
    const wrapper = createMountPage(Page)();
    const skipLink = wrapper.find("a.skip-link");
    expect(skipLink.exists()).toBe(true);
    expect(skipLink.attributes("href")).toBe("#main-content");
  });

  it("A-2: main 要素が id='main-content' を持つ", () => {
    const wrapper = createMountPage(Page)();
    const main = wrapper.find("main#main-content");
    expect(main.exists()).toBe(true);
  });
});
