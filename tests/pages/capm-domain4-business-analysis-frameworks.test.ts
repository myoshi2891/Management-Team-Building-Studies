// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createMountPage, defineSourceParityContract, texts } from "../support/page-contract";
import Page from "~/pages/capm-domain4-business-analysis-frameworks.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ドメイン4: ビジネス分析フレームワーク(Business Analysis Frameworks)",
] as const;

const EXPECTED_H2 = [
  "ドメイン4の全体像",
  "そもそも「ビジネス分析」とは何か",
  "Task 1: ビジネス分析(BA)の役割と責任を理解する",
  "Task 2: ステークホルダーとのコミュニケーション方法を決定する",
  "Task 3: 要求事項の収集方法を決定する",
  "Task 4: プロダクトロードマップを理解する",
  "Task 5: プロジェクト手法がビジネス分析プロセスに与える影響を判断する",
  "Task 6: プロダクトデリバリーを通じて要求事項を検証する",
  "ドメイン4 全体像の整理",
  "学習チェックリスト",
  "参考文献・出典(Sources)",
] as const;

const EXPECTED_H3 = [
  "出題内容(Enablers)",
  "詳細解説",
  "内部の役割 vs 外部の役割",
  "出題内容(Enablers)",
  "詳細解説",
  "コミュニケーションが重要な理由",
  "出題内容(Enablers)",
  "3-1. 要求収集(エリシテーション)の代表的な手法",
  "3-2. ユーザーストーリー vs ユースケース",
  "3-3. 要求トレーサビリティマトリクス(RTM)とプロダクトバックログ",
  "出題内容(Enablers)",
  "詳細解説",
  "どの構成要素をどのリリースに含めるか",
  "出題内容(Enablers)",
  "詳細解説",
  "出題内容(Enablers)",
  "詳細解説",
  "RTM / プロダクトバックログを用いた提供可否の判断",
  "PMI公式資料",
  "要求収集・トレーサビリティ関連",
  "ユーザーストーリー・ユースケース関連",
  "プロダクトロードマップ関連",
  "受け入れ基準・完了の定義関連",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
    A["経営課題/ビジネスニーズ"] --> B["ステークホルダー特定"]
    B --> C["要求事項の収集(Elicitation)"]
    C --> D["要求事項の分析/文書化"]
    D --> E["ソリューション設計への橋渡し"]
    E --> F["プロダクト提供/検証"]
    F --> G["ビジネス価値の実現"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`,
  `flowchart TB
    subgraph INT["内部ステークホルダー"]
        I1["プロジェクトスポンサー"]
        I2["部門マネージャー"]
        I3["開発チーム"]
    end
    subgraph EXT["外部ステークホルダー"]
        E1["顧客"]
        E2["規制当局"]
        E3["サプライヤー"]
    end
    BA["ビジネスアナリスト"] --> INT
    BA --> EXT

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class BA hub;
    class I1,I2,I3,E1,E2,E3 box;`,
  `flowchart LR
    BIZ["ビジネス側(経営層/現場部門)"] -->|"業務要求"| BA["ビジネスアナリスト"]
    BA -->|"要求仕様/ユーザーストーリー"| DEV["開発チーム"]
    DEV -->|"実現可能性/技術的制約"| BA
    BA -->|"進捗/合意結果"| BIZ

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class BIZ,DEV box;
    class BA hub;`,
  `flowchart TB
    START["要求収集の開始"] --> Q{"ステークホルダー数は?"}
    Q -->|"少人数/キーパーソン"| INT["インタビュー"]
    Q -->|"多人数/分散"| SUR["サーベイ"]
    Q -->|"利害調整が必要"| WS["ワークショップ"]
    INT --> DOC["要求事項の文書化"]
    SUR --> DOC
    WS --> DOC
    DOC --> RTM["トレーサビリティマトリクスへ登録"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class START,INT,SUR,WS,DOC box;
    class Q hub;
    class RTM done;`,
  `flowchart LR
    subgraph PRE["予測型プロジェクト"]
        R1["要求事項"] --> R2["RTM(要求トレーサビリティマトリクス)"]
        R2 --> R3["設計/テストケースへの追跡"]
    end
    subgraph AGL["アジャイルプロジェクト"]
        A1["要求事項"] --> A2["プロダクトバックログ"]
        A2 --> A3["スプリントごとの優先順位見直し"]
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class R1,R2,R3,A1,A2,A3 box;`,
  `flowchart LR
    subgraph NOW["Now(現在着手中)"]
        N1["確定仕様/開発中の機能"]
    end
    subgraph NEXT["Next(次に着手予定)"]
        X1["優先度の高いテーマ"]
    end
    subgraph LATER["Later(将来の検討事項)"]
        L1["長期的な戦略アイデア"]
    end
    NOW --> NEXT --> LATER

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class N1,X1,L1 box;`,
  `flowchart TB
    METHOD{"プロジェクトの進め方"}
    METHOD -->|"予測型/計画駆動型"| PRE["要求を早期に確定/RTMで追跡/変更管理プロセスで統制"]
    METHOD -->|"アジャイル型"| AGL["要求を継続的に発見/バックログで管理/優先順位を都度調整"]
    METHOD -->|"ハイブリッド型"| HYB["フェーズごとに両者を組み合わせる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class METHOD hub;
    class PRE,AGL,HYB box;`,
  `flowchart TB
    ITEM["要求事項/ユーザーストーリー"] --> DOD{"DoD(完了の定義)を満たすか?"}
    DOD -->|"No"| REWORK1["品質基準を満たすまで修正"]
    DOD -->|"Yes"| AC{"受け入れ基準(AC)を満たすか?"}
    AC -->|"No"| REWORK2["要求事項に合わせて修正"]
    AC -->|"Yes"| DONE["提供可能(Ready for Delivery)"]
    REWORK1 --> DOD
    REWORK2 --> AC

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class ITEM,REWORK1,REWORK2 box;
    class DOD,AC hub;
    class DONE done;`,
  `flowchart TB
    T1["Task1: BAの役割と責任を理解する"] --> T2["Task2: ステークホルダーコミュニケーションを設計する"]
    T2 --> T3["Task3: 要求事項を収集する"]
    T3 --> T4["Task4: プロダクトロードマップを構築する"]
    T4 --> T5["Task5: プロジェクト手法に応じてBAプロセスを適応させる"]
    T5 --> T6["Task6: 要求事項をデリバリーを通じて検証する"]
    T6 -.->|"継続的なフィードバック"| T3

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1,T2,T3,T4,T5 box;
    class T6 done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/certified-associate-capm",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf?rev=583ca4688c844ea59a5f84258c106146",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf",
  "https://www.bridging-the-gap.com/elicitation-techniques-business-analysts/",
  "https://sites.nd.edu/businessanalysis/?page_id=321",
  "https://businessanalyststoolkit.com/ba-essentials-elicitation-techniques/",
  "https://www.testrail.com/blog/requirements-traceability-matrix/",
  "https://www.cio.com/article/220411/business-requirements-tracing-project-deliverables-to-business-goals.html",
  "https://craft.io/blog/use-case-vs-user-story-the-final-showdown/",
  "https://blog.uxtweak.com/use-case-vs-user-stories/",
  "https://dovetail.com/product-development/guide-to-outcome-based-roadmaps/",
  "https://www.producttalk.org/product-roadmaps/",
  "https://www.aakashg.com/product-roadmap-best-practices/",
  "https://www.atlassian.com/work-management/project-management/acceptance-criteria",
  "https://www.altexsoft.com/blog/acceptance-criteria-purposes-formats-and-best-practices/",
  "https://nulab.com/learn/software-development/definition-of-done-vs-acceptance-criteria/",
] as const;

const EXPECTED_TOC_IDS = [
  "overview",
  "what-is-business-analysis",
  "task1-ba-roles-responsibilities",
  "task2-stakeholder-communication",
  "task3-requirements-gathering",
  "task4-product-roadmap",
  "task5-methodology-influence",
  "task6-validate-requirements",
  "domain4-summary",
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
  "SECTION 11",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 6,
  note: 2,
  source: 3,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 6,
  },
  note: {
    補足: 2,
  },
  source: {
    ソース: 3,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/capm-domain4-business-analysis-frameworks.vue",
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
  seoTitleFragments: ["CAPM", "ドメイン4", "ビジネス分析フレームワーク"],
});

describe("pages/capm-domain4-business-analysis-frameworks.vue — 固有UI構造契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローセクションにドメイン4の出題比率カードと試験情報カードを表示する", () => {
    const wrapper = mountPage();
    const statCards = wrapper.findAll(".stat-card");

    expect(statCards).toHaveLength(4);
    expect(texts(wrapper, ".stat-card .stat-number")).toEqual([
      "27%",
      "6",
      "150問",
      "180分",
    ]);
    expect(texts(wrapper, ".stat-card .stat-label")).toEqual([
      "ドメイン4の出題比率(全4ドメイン中2番目)",
      "ドメイン4を構成するTask数",
      "試験全体の問題数(135問が採点対象)",
      "試験時間(10分の休憩を含む)",
    ]);
  });

  it("モバイル用サイドバートグルが aria-expanded を更新する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get<HTMLButtonElement>(".sidebar-toggle");

    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    await nextTick();
    expect(toggle.attributes("aria-expanded")).toBe("true");
  });
});
