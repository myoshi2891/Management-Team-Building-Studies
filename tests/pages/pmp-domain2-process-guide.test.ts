// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/pmp-domain2-process-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "PMP® Domain II: Process 完全解説ガイド",
] as const;

const EXPECTED_H2 = [
  "本ガイドについて",
  "PMP試験全体像とDomain IIの位置づけ",
  "ECOの構造を理解する: Domain / Task / Enabler",
  "Domain II: Process 10タスクの全体マップ",
  "Task別詳細解説",
  "Domain II 学習ロードマップとタスク間の関係",
  "試験対策のポイント",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "2-1. 3つのDomainと出題比率",
  "2-2. アプローチ(開発手法)の出題バランス",
  "2-3. 試験フォーマットの基本情報",
  "Task 1: 統合プロジェクトマネジメント計画の作成とデリバリー計画",
  "Task 2: プロジェクトスコープの策定と管理",
  "Task 3: 価値ベースのデリバリーの徹底",
  "Task 4: 資源の計画と管理",
  "Task 5: 調達の計画と管理",
  "Task 6: 財務の計画と管理",
  "Task 7: 製品/成果物の品質計画と最適化",
  "Task 8: スケジュールの計画と管理",
  "Task 9: プロジェクト状況の評価",
  "Task 10: プロジェクト終結の管理",
  "7-1. Domain IIならではの出題傾向",
  "7-2. 学習の進め方の提案",
  "7-3. 受験資格・申請の概要(参考)",
  "情報源一覧",
] as const;

const EXPECTED_H4 = [
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
  "Enabler(業務例)一覧",
  "初学者向けステップ解説",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/project-management-pmp",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf?rev=b618cf45573e4276a54151e7636c97bf",
  "https://www.pmi.org/standards/pmbok",
  "https://www.pearsonvue.com/us/en/pmi.html",
  "https://www.pmi.org/certifications/certification-resources/maintain",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "exam-overview-domain-ii",
  "eco-structure",
  "domain-ii-task-map",
  "task-details",
  "learning-roadmap",
  "exam-tips",
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
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `pie showData
    title PMP試験 Domain別出題比率
    "Process" : 41
    "People" : 33
    "Business Environment" : 26`,
  `flowchart TB
    D["Domain<br/>プロセスに不可欠な<br/>ハイレベル知識領域"] --> T["Task<br/>統合プロジェクトマネジメント<br/>計画の作成とデリバリー計画"]
    T --> E1["Enabler<br/>ニーズ・複雑さ・規模を評価"]
    T --> E2["Enabler<br/>開発アプローチを推奨"]
    T --> E3["Enabler<br/>統合計画を作成・維持"]`,
  `%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 70, "nodeSpacing": 55}}}%%
flowchart TB
    subgraph PLAN["計画の基盤づくり"]
        direction TB
        T1["Task1 統合計画"]
        T2["Task2 スコープ"]
        T4["Task4 資源"]
        T5["Task5 調達"]
        T6["Task6 財務"]
        T7["Task7 品質"]
        T8["Task8 スケジュール"]
    end
    subgraph DELIVER["価値の提供"]
        T3["Task3 価値ベースデリバリー"]
    end
    subgraph MONITOR["状況の評価"]
        T9["Task9 状況評価"]
    end
    subgraph CLOSE["終結"]
        T10["Task10 終結管理"]
    end
    T1 --> T2
    T2 --> T4
    T2 --> T5
    T2 --> T6
    T2 --> T7
    T2 --> T8
    T4 --> T3
    T5 --> T3
    T6 --> T3
    T7 --> T3
    T8 --> T3
    T3 --> T9
    T9 -.->|継続的サイクル| T3
    T9 --> T10`,
  `flowchart LR
    A["プロジェクトの<br/>ニーズ・複雑さ・<br/>規模を評価"] --> B["開発アプローチを推奨<br/>(予測型/アジャイル/<br/>ハイブリッド)"]
    B --> C["重要な情報要件を決定<br/>(例: サステナビリティ)"]
    C --> D["プロジェクト<br/>実行戦略を推奨"]
    D --> E["統合プロジェクト<br/>マネジメント計画を作成"]
    E --> F["工数・資源要件を<br/>見積もる"]
    F --> G["依存関係・ギャップ・<br/>ビジネス価値を評価"]
    G --> H["統合計画を<br/>維持・更新"]
    H --> I["データを収集・分析し<br/>意思決定"]
    I -.->|継続的フィードバック| G`,
  `flowchart LR
    A["主要ステークホルダーと<br/>価値の構成要素を特定"] --> B["価値とフィードバックに<br/>基づき作業を<br/>優先順位付け"]
    B --> C["段階的な価値提供の<br/>機会を評価"]
    C --> D["プロジェクト全体を<br/>通じてビジネス価値を検証"]
    D --> E["ベネフィット追跡の<br/>測定システムを確認"]
    E --> F["価値を実証する<br/>デリバリーオプションを評価"]
    F -.->|継続的サイクル| A`,
  `flowchart TB
    A["調達を計画"] --> B["調達戦略を<br/>計画・管理"]
    B --> C["優先する契約タイプを<br/>選定"]
    C --> D["デリバリーソリューションを<br/>策定"]
    D --> E["交渉戦略を決定"]
    E --> F["合意交渉に参加"]
    F --> G["調達マネジメント計画を<br/>実行"]
    G --> H["サプライヤーと<br/>契約を管理"]
    H --> I["ベンダーパフォーマンスを<br/>評価"]
    I --> J["調達契約の目的達成を<br/>確認"]`,
  `flowchart LR
    A["開発アプローチに基づき<br/>スケジュールを準備"] --> B["他プロジェクト・<br/>運用と調整"]
    B --> C["タスクを見積もる<br/>(マイルストーン/依存関係/<br/>ストーリーポイント)"]
    C --> D["ベンチマークと<br/>過去データを活用"]
    D --> E["プロジェクト<br/>スケジュールを作成"]
    E --> F["スケジュールを<br/>ベースライン化"]
    F --> G["スケジュール<br/>マネジメント計画を実行"]
    G --> H["スケジュールの<br/>差異を分析"]
    H -.->|見積り精度の改善| C`,
  `flowchart TB
    A["メトリクス・分析・<br/>照合の仕組みを策定"] --> B["必要な成果物を<br/>特定・テーラリング"]
    B --> C["成果物の作成・レビュー・<br/>更新・文書化を徹底"]
    C --> D["成果物への<br/>アクセス性を確保"]
    D --> E["現在の進捗を評価"]
    E --> F["メトリクスを<br/>測定・分析・更新"]
    F --> G["プロジェクト状況を<br/>コミュニケーション"]
    G --> H["成果物管理の<br/>有効性を継続評価"]
    H -.->|次のサイクルへ| A`,
  `flowchart LR
    A["プロジェクト完了について<br/>ステークホルダーの<br/>承認を取得"] --> B["終結の基準を決定"]
    B --> C["移行への準備状況を検証<br/>(運用チーム/次フェーズ等)"]
    C --> D["終結活動を完了<br/>(教訓・振り返り・調達・<br/>財務・資源の解放等)"]`,
  `%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 70, "nodeSpacing": 55}}}%%
flowchart TB
    START(["プロジェクト開始"]) --> T1["Task1<br/>統合計画の作成"]
    T1 --> T2["Task2<br/>スコープの策定"]
    T2 --> BRANCH{"補助計画を<br/>並行して展開"}
    BRANCH --> T4["Task4 資源"]
    BRANCH --> T5["Task5 調達"]
    BRANCH --> T6["Task6 財務"]
    BRANCH --> T7["Task7 品質"]
    BRANCH --> T8["Task8 スケジュール"]
    T4 --> T3["Task3<br/>価値ベースデリバリー<br/>(継続サイクル)"]
    T5 --> T3
    T6 --> T3
    T7 --> T3
    T8 --> T3
    T3 --> T9["Task9<br/>状況評価<br/>(継続サイクル)"]
    T9 -.->|フィードバック| T3
    T9 --> T10["Task10<br/>終結管理"]
    T10 --> END(["プロジェクト完了"])`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 10,
  note: 5,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    "ベストプラクティス": 10,
  },
  note: {
    "補足": 4,
    "免責事項": 1,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "PMP",
  "Domain II",
  "Process",
] as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/pmp-domain2-process-guide.vue",
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

describe("pages/pmp-domain2-process-guide.vue — 目次の現在地", () => {
  it("active な目次リンクだけが aria-current=location を持つ", () => {
    const links = mountPage().findAll(".sidebar-nav a");
    expect(links).toHaveLength(EXPECTED_TOC_IDS.length);

    // 初期状態では先頭の TOC 項目が active（契約 C-3）。
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
