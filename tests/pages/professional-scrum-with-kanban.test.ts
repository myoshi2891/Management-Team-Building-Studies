// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-with-kanban.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum with Kanban(PSK I)認定資格 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "PSK(Professional Scrum with Kanban)試験概要と基本思想",
  "スクラムチーム向けカンバンの4つの基本プラクティス",
  "フローを測る4つの主要メトリクス",
  "スクラムイベントにおけるカンバンの適用(実践ベストプラクティス)",
  "ソフトウェアエンジニアリングにおける実践テクニック",
  "試験対策: 頻出の落とし穴とアンチパターン",
  "参考リソース・公式リンク集",
] as const;

const EXPECTED_H3 = [
  "PSK認定の目的と試験形式",
  "なぜスクラムチームにカンバンが必要なのか",
  "カンバンの基本原則とスクラムとの補完関係",
  "2-1. ワークフローの定義と可視化(Definition of Workflow)",
  "2-2. 仕掛品制限(Limiting Work in Progress)",
  "2-3. アクティブなアイテムの管理(Actively Managing Work Items in Progress)",
  "2-4. ワークフローの継続的改善(Inspecting and Adapting the Definition of Workflow)",
  "3-1. Work in Progress(WIP: 仕掛中の作業量)",
  "3-2. Cycle Time(サイクルタイム: 作業開始から完了までの実経過時間)",
  "3-3. Work Item Age(未完了アイテムの経過時間: 最も重要な先行指標)",
  "3-4. Throughput(単位時間あたりの完了アイテム数)",
  "4つのメトリクス比較表",
  "3-5. リトルの法則(Little's Law)",
  "3-6. フローチャート・散布図の読み解き方",
  "4-1. Sprint Planning: 確率的予測に基づくバックログ選定",
  "4-2. Daily Scrum: 「ボードを右から左へ見る(Walk the Board)」",
  "4-3. Sprint Review: フロー実績データの共有",
  "4-4. Sprint Retrospective: 定量的なフローデータに基づく振り返り",
  "4-5. Refinement(リファインメント): アイテムサイズの均一化(Right-sizing)",
  "5-1. バッチサイズの極小化",
  "5-2. CI/CDパイプラインとの統合",
  "5-3. 緊急対応(Fast Track / Expediteレーン)の運用ルール",
  "6-1. 試験でよく出る誤解",
  "6-2. 合格に向けた推奨学習ステップ",
] as const;

const EXPECTED_H4 = [
  "Scrum.org 公式リソース",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "exam-overview",
  "kanban-practices",
  "flow-metrics",
  "kanban-in-scrum-events",
  "engineering-practices",
  "exam-pitfalls",
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
] as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 3,
  source: 6,
  practice: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { 補足: 3 },
  source: { ソース: 6 },
  practice: { ベストプラクティス: 2 },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-scrum-with-kanban-certification",
  "https://www.scrum.org/assessments/professional-scrum-with-kanban-certification",
  "https://www.scrum.org/resources/kanban-guide-scrum-teams",
  "https://www.scrum.org/resources/professional-scrum-with-kanban",
  "https://www.scrum.org/resources/kanban-guide-scrum-teams",
  "https://www.scrum.org/resources/kanban-guide-scrum-teams",
  "https://www.scrum.org/resources/littles-law-professional-scrum-kanban",
  "https://www.scrum.org/resources/kanban-guide-scrum-teams",
  "https://www.scrum.org/resources/professional-scrum-with-kanban",
  "https://www.scrum.org/assessments/professional-scrum-with-kanban-certification",
  "https://www.scrum.org/assessments/professional-scrum-with-kanban-certification",
  "https://www.scrum.org/resources/kanban-guide-scrum-teams",
  "https://www.scrum.org/resources/professional-scrum-with-kanban",
  "https://www.scrum.org/resources/littles-law-professional-scrum-kanban",
  "https://www.scrum.org/resources/professional-scrum-with-kanban",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart TB\n    subgraph SCRUM[\"スクラムフレームワーク 変更されない部分\"]\n        direction TB\n        A[\"Scrum Team 役割 PO SM Developers\"]\n        B[\"Scrum Events Sprint Planning Daily Scrum Review Retrospective\"]\n        C[\"Scrum Artifacts Product Backlog Sprint Backlog Increment\"]\n        subgraph KANBAN[\"カンバンプラクティス フローを強化する部分\"]\n            direction TB\n            D[\"ワークフローの可視化\"]\n            E[\"WIP制限\"]\n            F[\"アクティブな管理\"]\n            G[\"継続的な改善\"]\n        end\n    end\n    A --> B --> C\n    C -.->|\"フローの可視化と計測で強化\"| KANBAN\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class A,B,C,D,E,F,G box;\n    class KANBAN hub;",
  "flowchart TB\n    PB[\"Product Backlog\"] --> RD[\"Ready リファインメント済み\"]\n    RD -->|\"プル 開始点\"| IP[\"In Progress WIP制限あり\"]\n    IP -->|\"Work Item Ageを監視\"| RV[\"Review ブロック時は直ちに可視化\"]\n    RV -->|\"完了基準を満たす\"| DN[\"Done 終了点\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class PB,RD box;\n    class IP,RV hub;\n    class DN done;",
  "flowchart LR\n    subgraph healthy[\"健全なフロー\"]\n        direction LR\n        A1[\"流入線と完了線がほぼ平行\"] --> A2[\"WIPが安定\"]\n    end\n    subgraph risky[\"危険なフロー\"]\n        direction LR\n        B1[\"流入線と完了線の間隔が拡大\"] --> B2[\"WIPが増加 ボトルネックの兆候\"]\n    end\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A1,A2 done;\n    class B1,B2 hub;",
  "flowchart TD\n    SP[\"Sprint Planning Throughputに基づく確率的予測\"] --> DS[\"Daily Scrum ボードを右から左へ Work Item Ageに注目\"]\n    DS --> SR[\"Sprint Review フロー実績データを共有\"]\n    SR --> RETRO[\"Sprint Retrospective CFD 散布図で振り返り\"]\n    RETRO --> REF[\"Refinement アイテムのRight-sizing\"]\n    REF -.->|\"次のスプリントへ反映\"| SP\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class DS,SR,RETRO,REF box;\n    class SP hub;",
  "flowchart LR\n    subgraph normal[\"通常レーン\"]\n        direction LR\n        N1[\"Ready\"] --> N2[\"In Progress WIP制限あり\"] --> N3[\"Review\"] --> N4[\"Done\"]\n    end\n    subgraph express[\"特急レーン\"]\n        direction LR\n        E1[\"緊急発生\"] --> E2[\"Expedite 上限はチームが定める(例: 常に1件まで)\"]\n    end\n    E2 --> N3\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class N1,N2,N3 box;\n    class E1,E2 hub;\n    class N4 done;",
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-scrum-with-kanban.vue",
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
  seoTitleFragments: ["Professional Scrum with Kanban", "完全ガイド", "PSK"],
  seoTitle: "Professional Scrum with Kanban(PSK I)認定資格 完全ガイド | フローで読み解くスクラムとカンバン",
  seoDescription:
    "Scrum.org公式のThe Kanban Guide for Scrum Teamsに基づき、PSK I認定試験に必要なフローメトリクスとカンバンプラクティスを体系的に解説する非公式学習ガイドです。",
});

describe("pages/professional-scrum-with-kanban.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("[data-testid='sidebar-toggle']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("nav.sidebar").classes()).toContain("open");
  });

  it("テーブルが原本と同じ件数（4件）存在し、すべて .table-wrap で包まれている", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(4);
    expect(wrapper.findAll(".table-wrap table")).toHaveLength(4);
  });

  it("テーブル行の総数が原本と一致する（27行）", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll("tr")).toHaveLength(27);
  });

  it("推奨学習ステップ（5件）が存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".step-list li")).toHaveLength(5);
  });

  it("参考文献リストが適切なリスト構造を持つ", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".ref-list")).toHaveLength(1);
    expect(wrapper.findAll(".ref-list li")).toHaveLength(4);
  });
});
