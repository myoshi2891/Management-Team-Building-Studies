// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/elastic-leadership-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Elastic Leadership 実践ガイド",
] as const;

const EXPECTED_H2 = [
  "Elastic Leadershipとは",
  "3つのチームフェーズを理解する",
  "フェーズの見極め方",
  "Team Leader Manifesto",
  "主要な実践テクニック",
  "ステップバイステップ：サバイバルモードからの脱出",
  "ステップバイステップ：ラーニングモードでチームを育てる",
  "ステップバイステップ：セルフオーガナイジングモードを維持する",
  "よくあるアンチパターン",
  "ラインマネージャー向けの指針",
  "実践チェックリスト",
  "まとめ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "各フェーズの詳細",
  "公式情報",
  "インタビュー・メディア記事",
  "参考モデル",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TD
    A["サバイバルモード"] -->|"学習時間を確保する"| B["ラーニングモード"]
    B -->|"スキルが定着する"| C["セルフオーガナイジングモード"]
    C -.->|"状況やメンバーの変化"| A
    B -.->|"新たな火消しが発生"| A
    C -.->|"未知のスキルが必要になる"| B

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B box;
    class C done;`,
  `flowchart TD
    Q0["チームの状況を観察する"] --> Q1{"学習に使える時間はあるか"}
    Q1 -->|"ない"| M1["サバイバルモード"]
    Q1 -->|"ある"| Q2{"チームは自力で問題を解決できるか"}
    Q2 -->|"まだ難しい"| M2["ラーニングモード"]
    Q2 -->|"できる"| M3["セルフオーガナイジングモード"]
    M1 --> A1["指示命令型で舵を取る"]
    M2 --> A2["コーチング型で挑戦を促す"]
    M3 --> A3["ファシリテーション型でゴールのみ示す"]
    M1 ~~~ Q2

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q0 hub;
    class Q1,Q2,M1,M2,A1,A2 box;
    class M3,A3 done;`,
  `flowchart TD
    S1["現在のすべてのコミットメントを洗い出す"] --> S2["経営層に現状を正直に共有する"]
    S2 --> S3["今後30日で完了できる分だけに絞り込む"]
    S3 --> S4["残りは学習時間を織り込んで再見積もりする"]
    S4 --> S5["マルチタスクをやめ1つずつ終わらせる"]
    S5 --> S6["期限が来たらラーニングモードへ切り替える"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5 box;
    class S6 done;`,
  `flowchart LR
    subgraph vicious["悪循環"]
        N1["自動テストを学ぶ時間がない"] --> N2["手動テストを続ける"]
        N2 --> N3["手動テストに時間を奪われる"]
        N3 --> N1
    end
    subgraph virtuous["好循環"]
        P1["自動テストに時間を投資する"] --> P2["手動テストの時間が減る"]
        P2 --> P3["学習に使える時間が増える"]
        P3 --> P1
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class N1,N2,N3 box;
    class P1,P2,P3 done;`,
  `flowchart TD
    TLM["Team Leader Manifesto"] --> P1["人を機械のように扱わず心理を理解する"]
    TLM --> P2["単一スタイルに固執せずフェーズに応じて変える"]
    TLM --> P3["恐れや不快感を避けず挑戦と実験を歓迎する"]
    TLM --> P4["自分がボトルネックでなくなることを目指す"]
    P1 ~~~ P2
    P2 ~~~ P3
    P3 ~~~ P4

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class TLM hub;
    class P1,P2,P3,P4 box;`,
] as const;

const EXPECTED_EXTERNAL_LINKS = [
  "https://www.manning.com/books/elastic-leadership",
  "https://www.infoq.com/articles/book-review-elastic-leadership/",
  "https://techleadjournal.dev/episodes/110/",
  "https://leaddev.com/career-development/elastic-leadership-roy-osherove-conversation",
  "https://www.5whys.com/articles/team-leader-manifesto-take-4.html",
  "https://www.5whys.com/",
  "https://www.infoq.com/presentations/Team-Leadership-in-the-Age-of-Internet/",
  "https://www.elasticleadership.com/",
  "https://osherove.com/",
  "https://www.maxcode.net/blog/elastic-leadership-for-technical-leaders-with-roy-osherove/",
  "https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development",
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-elastic-leadership",
  "three-phases",
  "phase-assessment",
  "team-leader-manifesto",
  "key-techniques",
  "escaping-survival-mode",
  "growing-in-learning-mode",
  "sustaining-self-organization",
  "anti-patterns",
  "line-manager-guidance",
  "practice-checklist",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 5,
  source: 9,
  practice: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 5 },
  source: { "ソース": 9 },
  practice: { "ベストプラクティス": 1 },
} as const;

const EXPECTED_STEP_TAGS = [
  "1", "2", "3", "4", "5", "6",
  "1", "2", "3", "4", "5", "6",
  "1", "2", "3", "4",
] as const;

defineSourceParityContract({
  suiteName: "pages/elastic-leadership-guide.vue",
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
  seoTitleFragments: ["Elastic Leadership", "実践ガイド"],
});
