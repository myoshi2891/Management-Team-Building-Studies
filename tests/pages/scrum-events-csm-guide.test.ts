// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/scrum-events-csm-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Scrum Events 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "なぜ「5つのイベント」なのか",
  "The Sprint(スプリント)― すべてを包含するコンテナイベント",
  "Sprint Planning(スプリントプランニング)",
  "Daily Scrum(デイリースクラム)",
  "Sprint Review(スプリントレビュー)",
  "Sprint Retrospective(スプリントレトロスペクティブ)",
  "5つのイベントの相互関係",
  "タイムボックス比較表(1か月Sprintを基準)",
  "Definition of Done とイベントの関係",
  "CSM Learning Objectives 対応表(Scrum Events関連: LO1.7〜1.16)",
  "CSM試験の概要(参考情報)",
  "よくある誤解(FAQ形式)",
  "学習チェックリスト",
  "参考文献・出典一覧",
] as const;

const EXPECTED_H3 = [
  "目的",
  "基本ルール",
  "Sprintの中止(Sprint Cancellation)",
  "進め方(ステップバイステップの捉え方)",
  "目的",
  "参加者",
  "タイムボックス",
  "3つのトピック(Why・What・How)",
  "進め方(ステップバイステップ)",
  "目的",
  "参加者とタイムボックス",
  "進め方",
  "目的",
  "参加者とタイムボックス",
  "内容と性質",
  "目的",
  "参加者とタイムボックス",
  "検査する対象",
  "進め方(ステップバイステップ)",
  "1つのSprintの中での時系列イメージ(2週間Sprintの例)",
  "経験主義の3本柱とイベントの対応",
  "Q1. Daily Scrumは進捗をScrum Masterに報告する場ですか?",
  "Q2. Sprint Reviewでデモが失敗したら不合格・失敗ということですか?",
  "Q3. Sprintの作業計画(How)はScrum Masterが決めるのですか?",
  "Q4. Sprint Retrospectiveは忙しいときは省略してよいですか?",
  "Q5. すべてのイベントは必ず対面で同じ場所で行う必要がありますか?",
  "出典一覧",
] as const;

const EXPECTED_H4 = [
  "CSM試験ポイント",
  "アンチパターン",
  "CSM試験ポイント",
  "アンチパターン",
  "CSM試験ポイント",
  "アンチパターン",
  "CSM試験ポイント",
  "アンチパターン",
  "CSM試験ポイント",
  "アンチパターン",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    subgraph SPRINT["Sprint 1か月以内の固定長 コンテナイベント"]
        direction TB
        SP["Sprint Planning 最大8時間 Sprintの開始"]
        DS["Daily Scrum 15分 作業日ごとに毎日実施"]
        SR["Sprint Review 最大4時間 最後から2番目のイベント"]
        RETRO["Sprint Retrospective 最大3時間 Sprintを締めくくる"]
        SP --> DS --> SR --> RETRO
    end
    RETRO --> NEXT["次のSprintが即座に開始"]
    NEXT -.-> SP

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class SP,DS,SR,RETRO box;
    class NEXT hub;`,
  `flowchart TD
    T1["Topic1 Why 価値と有用性を提案しSprint Goalを定義"] --> SG["Sprint Goal を確定"]
    T2["Topic2 What Product Backlogから今回のSprintに含める項目を選択"] --> ITEMS["Product Backlog Item を選択"]
    T3["Topic3 How 選択した項目をDoneにする作業計画を立てる"] --> PLAN["実行計画 1日以下の作業に分解"]
    SG --> SB["Sprint Backlog Goal 選択したItem 計画"]
    ITEMS --> SB
    PLAN --> SB

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1,T2,T3,SG,ITEMS,PLAN box;
    class SB done;`,
  `flowchart LR
    A["Sprint Goalへの進捗を検査"] --> B["気づいたことを共有"]
    B --> C["翌日の作業計画を調整 Sprint Backlogを適応"]
    C -.->|"15分で完結"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`,
  `flowchart TD
    A["Scrum TeamがIncrementを提示"] --> B["Sprintで達成したこと 環境変化を確認"]
    B --> C["次に何をすべきか協働で決める"]
    C --> D["必要に応じてProduct Backlogを更新"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D box;`,
  `flowchart TD
    A["個々人 相互作用 プロセス ツール Definition of Doneを検査"] --> B["うまくいったこと 問題になったことを洗い出す"]
    B --> C["問題がどう対処されたかを議論"]
    C --> D["最も効果が見込める改善策を特定"]
    D --> E["影響の大きい改善から早く着手"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D box;
    class E done;`,
  `flowchart LR
    D1["Sprint Planning Sprintの開始"] --> D2["Daily Scrum 作業日ごとに毎日実施"]
    D2 --> D3["Sprint Review 最後から2番目"]
    D3 --> D4["Sprint Retrospective Sprintを締めくくる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class D1,D2,D3,D4 box;`,
] as const;

const EXPECTED_EXTERNAL_LINKS = [
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf",
  "https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Japanese.pdf",
  "https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://agilemanifesto.org",
  "https://creativecommons.org/licenses/by-sa/4.0/legalcode",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "why-five-events",
  "the-sprint",
  "sprint-planning",
  "daily-scrum",
  "sprint-review",
  "sprint-retrospective",
  "event-relationships",
  "timebox-comparison",
  "definition-of-done",
  "lo-mapping",
  "exam-overview",
  "faq",
  "checklist",
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
  practice: 5,
  source: 10,
  note: 3,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 5,
  },
  source: {
    ソース: 10,
  },
  note: {
    補足: 3,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/scrum-events-csm-guide.vue",
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
  seoTitleFragments: ["Scrum Events", "CSM"],
  seoTitle: "Scrum Events 完全ガイド | Certified ScrumMaster(CSM)対策",
  seoDescription: "Scrum Alliance CSM認定試験対策として、Scrumの5つのイベント(Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective)を初学者向けにステップバイステップで解説する完全ガイド。",
});

const mountPage = createMountPage(Page);

describe("pages/scrum-events-csm-guide.vue — 目次の現在地", () => {
  it("active な目次リンクだけが aria-current=location を持つ", () => {
    const links = mountPage().findAll(".sidebar-nav a");
    expect(links).toHaveLength(EXPECTED_TOC_IDS.length);

    // 初期状態では先頭の TOC 項目が active。
    // active クラスと aria-current の対象が完全に一致することを保証する。
    const current = links
      .filter((link) => link.attributes("aria-current") === "location")
      .map((link) => link.attributes("href"));
    const active = links
      .filter((link) => link.classes().includes("active"))
      .map((link) => link.attributes("href"));

    expect(current).toEqual([`#${EXPECTED_TOC_IDS[0]}`]);
    expect(active).toEqual(current);
  });
});
