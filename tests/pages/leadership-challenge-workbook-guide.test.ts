// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/leadership-challenge-workbook-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "The Leadership Challenge Workbook 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "この本を読む前に知っておきたいこと",
  "The Five Practices of Exemplary Leadership(模範的リーダーシップの5つの実践)",
  "Ten Commitments of Leadership(リーダーシップの10の誓約)",
  "LPI(Leadership Practices Inventory)とは",
  "ワークブックの全体構成とワークフロー",
  "ステップバイステップ実践ガイド",
  "スクラム / アジャイル現場への適用マップ",
  "海外テックリーダーシップ論との接続",
  "他のリーダーシップ理論との位置づけ",
  "よくあるアンチパターン",
  "まとめ",
  "参考文献・出典(Sources)",
] as const;

// 参考文献セクションの h4 4 件を a11y 基準（Q-3）に従い h3 に昇格させ全 11 件
const EXPECTED_H3 = [
  "書籍としての位置づけ",
  "なぜソフトウェアエンジニア・スクラムマスターに関係するのか",
  "Step 1: 使い方を理解する(Chapter 1 相当)",
  "Step 2: Personal-Best Leadership Project を選ぶ(Chapter 3 相当)",
  "Step 3〜7: 5つの実践を一つずつ深める(Chapter 4〜8 相当)",
  "Step 8: プロジェクトを振り返る(Chapter 9 相当)",
  "Step 9: 継続する(Chapter 10 相当)",
  "公式・出版社情報",
  "学術・解説記事",
  "ソフトウェアエンジニアリング / テックリーダーシップの文脈",
  "二次情報・歴史的資料",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/the-leadership-challenge/9781394152223/",
  "https://www.leadershipchallenge.com/five-practices",
  "https://www.leadershipchallenge.com/home",
  "https://www.leadershipchallenge.com/five-practices/about-the-authors",
  "https://www.wiley.com/en-us/The+Leadership+Challenge:+How+to+Make+Extraordinary+Things+Happen+in+Organizations,+7th+Edition-p-9781119736127",
  "https://scholarcommons.scu.edu/mgmt/30/",
  "https://umbrex.com/resources/frameworks/organization-frameworks/kouzes-posner-five-practices-of-exemplary-leadership/",
  "https://www.boisestate.edu/academics-deptchairs/home/resources-for-academic-leaders/new-academic-leaders-program/the-5-practices-of-exemplary-leadership/",
  "https://engineeringmanagement.org/essential-em-books/",
  "https://www.coreweave.com/resources/videos/empowering-development-teams",
  "https://en.wikipedia.org/wiki/The_Leadership_Challenge",
  "https://en.wikipedia.org/wiki/Camille_Fournier",
  "https://www.infoq.com/articles/book-review-managers-path",
  "https://www.infoq.com/culture-methods/podcasts/9",
] as const;

const EXPECTED_TOC_IDS = [
  "before-you-begin",
  "five-practices",
  "ten-commitments",
  "lpi-assessment",
  "workbook-workflow",
  "step-by-step-guide",
  "scrum-agile-mapping",
  "tech-leadership-connection",
  "other-leadership-theories",
  "common-antipatterns",
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
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["Chapter 1 ワークブックの使い方を理解する"] --> B["Chapter 2 The Five Practices を学ぶ"]
    B --> C["Chapter 3 Personal-Best Leadership Project を選ぶ"]
    C --> D1["Chapter 4 Model the Way"]
    D1 --> D2["Chapter 5 Inspire a Shared Vision"]
    D2 --> D3["Chapter 6 Challenge the Process"]
    D3 --> D4["Chapter 7 Enable Others to Act"]
    D4 --> D5["Chapter 8 Encourage the Heart"]
    D5 --> E["Chapter 9 プロジェクトを振り返る"]
    E --> F["Chapter 10 The Challenge Continues"]
    F -.->|"次のプロジェクトへ"| C

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,D1,D2,D3,D4,D5,E,F box;
    class C hub;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {} as const;
const EXPECTED_CALLOUT_LABELS = {} as const;
const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "Leadership Challenge Workbook",
  "リーダーシップ",
] as const;

defineSourceParityContract({
  suiteName: "pages/leadership-challenge-workbook-guide.vue",
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
});

describe("pages/leadership-challenge-workbook-guide.vue — 固有要素契約", () => {
  const mountPage = createMountPage(Page);

  it("D-custom: stat-card が 4 件存在し、統計数値を正しく表示する", () => {
    const wrapper = mountPage();
    const stats = wrapper.findAll(".stat-card");
    expect(stats).toHaveLength(4);
    expect(stats.map((s) => s.find(".stat-number").text())).toEqual([
      "5",
      "10",
      "160ページ",
      "40年+",
    ]);
  });

  it("D-custom: 免責事項 disclaimer-box が存在する", () => {
    const wrapper = mountPage();
    const box = wrapper.find(".disclaimer-box");
    expect(box.exists()).toBe(true);
    expect(box.text()).toContain("The Leadership Challenge Workbook, 4th Edition");
  });
});
