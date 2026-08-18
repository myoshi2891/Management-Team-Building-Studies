// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createMountPage, defineSourceParityContract, texts } from "../support/page-contract";
import Page from "~/pages/capm-domain3-agile-frameworks-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "CAPM® ドメイン3「アジャイルフレームワーク/方法論」完全ガイド",
] as const;

const EXPECTED_H2 = [
  "この記事の使い方",
  "ドメイン3の全体像",
  "第1章 Task 1: アダプティブアプローチが適切な場面を説明する",
  "第2章 Task 2: プロジェクトイテレーションの計画方法を決定する",
  "第3章 Task 3: アダプティブプロジェクトのプロジェクトコントロールの文書化方法を決定する",
  "第4章 Task 4: アダプティブ計画の構成要素を説明する",
  "第5章 Task 5: タスク管理ステップの準備・実行方法を決定する",
  "第6章 よくある混同ポイント・用語集",
  "第7章 ドメイン3 学習チェックリスト",
  "第8章 参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "0.1 CAPM試験全体におけるドメイン3の位置づけ",
  "0.2 ドメイン3を構成する5つのタスク",
  "1.1 予測型 vs アダプティブの比較",
  "1.2 組織構造への適合性",
  "1.3 アダプティブ採用を促進するOPAとEEF",
  "2.1 イテレーションの論理単位",
  "2.2 イテレーションのメリット・デメリット",
  "2.3 WBSをアダプティブなイテレーションへ変換する",
  "2.4 スコープのインプット",
  "2.5 アダプティブ追跡 vs 予測型追跡",
  "4.1 Scrum",
  "4.2 エクストリーム・プログラミング(Extreme Programming, XP)",
  "4.3 Kanban(カンバン)",
  "4.4 Scaled Agile Framework(SAFe®)",
  "4.5 その他のアダプティブ方法論(概要)",
  "4.6 4大フレームワークの比較表",
  "5.1 成功基準の解釈",
  "5.2 タスクの優先順位付け",
  "一次ソース一覧",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TD
D3["ドメイン3 アダプティブフレームワーク・方法論 5つのタスク"]
D3 --> T1["Task1 アダプティブアプローチが適切な場面を説明する"]
D3 --> T2["Task2 プロジェクトイテレーションの計画方法を決定する"]
D3 --> T3["Task3 アダプティブプロジェクトのプロジェクトコントロールの文書化方法を決定する"]
D3 --> T4["Task4 アダプティブ計画の構成要素を説明する"]
D3 --> T5["Task5 タスク管理ステップの準備・実行方法を決定する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D3 hub;
class T1,T2,T3,T4,T5 box;`,
  `flowchart TD
A["プロジェクトの特性を評価する"] --> B{"要求事項は明確で安定しているか"}
B -- "はい" --> C{"変更が発生する可能性は低いか"}
B -- "いいえ" --> D{"要求事項が探索的・流動的か"}
C -- "はい" --> E["予測型アプローチを選択"]
C -- "いいえ" --> F["ハイブリッドアプローチを検討"]
D -- "はい" --> G["アダプティブアプローチを選択"]
D -- "いいえ" --> F
E --> H["WBS・ガントチャート・EVMで管理"]
G --> I["Scrum・Kanban・XP・SAFe等の中から選択"]
F --> J["フェーズごとに予測型・アダプティブを使い分け"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,H,I,J box;
class E,F,G done;`,
  `flowchart TD
WBS["WBS 成果物ベースの階層分解"] --> WP["ワークパッケージ"]
WP --> EPIC["エピック 大きな機能のまとまり"]
EPIC --> STORY["ユーザーストーリー PBIとして起票"]
STORY --> PB["プロダクトバックログ 優先順位付けされたPBIの一覧"]
PB --> REFINE["優先順位付け バックログリファインメント"]
REFINE --> PULL["スプリントバックログへ引き込み Pull"]
PULL --> TASK["選択したPBIをタスクへ分解 見積り可能な作業単位"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class WBS hub;
class WP,EPIC,STORY,PB,REFINE,PULL box;
class TASK done;`,
  `flowchart TD
VISION["プロダクトビジョン ロードマップ"] --> PO["プロダクトオーナーが優先順位付け"]
PO --> PB["プロダクトバックログ"]
PB --> REFINE2["バックログリファインメント"]
REFINE2 --> PLAN["スプリントプランニング 容量とベロシティを考慮"]
PLAN --> GOAL["スプリントゴールの設定"]
GOAL --> SBACK["スプリントバックログの確定"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class VISION hub;
class PO,PB,REFINE2,PLAN,GOAL box;
class SBACK done;`,
  `flowchart TD
PB2["プロダクトバックログ"] --> SP2["スプリントプランニング What Howを決定"]
SP2 --> SG2["スプリントゴールの設定"]
SG2 --> DEV2["スプリント実行 開発作業"]
DEV2 --> DS2["デイリースクラム 毎日15分"]
DS2 --> DEV2
DEV2 --> SR2["スプリントレビュー 検査"]
SR2 --> RETRO2["スプリントレトロスペクティブ 適応"]
RETRO2 --> INC2["インクリメントの完成"]
INC2 --> PB2

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PB2 hub;
class SP2,SG2,DEV2,DS2,SR2,RETRO2 box;
class INC2 done;`,
  `flowchart LR
A2["バックログ"] --> B2["分析中 WIP上限2"]
B2 --> C2["開発中 WIP上限3"]
C2 --> D2["テスト中 WIP上限2"]
D2 --> E2["完了"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A2 hub;
class B2,C2,D2 box;
class E2 done;`,
  `flowchart TB
subgraph L1["ポートフォリオレベル"]
    STRAT2["戦略テーマ リーン予算配分"]
end
subgraph L2["プログラムレベル"]
    ART2["アジャイルリリーストレイン ART"]
    PI2["PIプランニング 8-12週間ごと"]
end
subgraph L3["チームレベル"]
    SCRUM2["Scrumチーム"]
    KANBAN2["Kanbanチーム"]
end
L1 --> L2 --> L3

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class STRAT2 hub;
class ART2,PI2,SCRUM2,KANBAN2 box;`,
  `flowchart LR
DOR["Definition of Ready 着手可能基準"] --> WORK["タスクの実行"]
WORK --> DOD["Definition of Done 完了基準"]
DOD --> AC{"受け入れ基準を満たしているか"}
AC -- "はい" --> ACCEPT["プロダクトオーナーが承認"]
AC -- "いいえ" --> REWORK["プロダクトバックログへ差し戻し"]
REWORK --> WORK

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class DOR hub;
class WORK,DOD,AC,REWORK box;
class ACCEPT done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/certified-associate-capm",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf",
  "https://www.pmi.org/learning/agile",
  "https://scrumguides.org/",
  "https://kanban.university/kanban-guide/",
  "https://djaa.com/the-principles-and-general-practices-of-the-kanban-method/",
  "http://www.extremeprogramming.org/rules.html",
  "https://framework.scaledagile.com/",
  "https://www.scrum.org/scrum-guide-2020",
  "https://agilemanifesto.org/",
] as const;

const EXPECTED_EYEBROWS = [
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

const EXPECTED_TOC_ITEMS = [
  { href: "#how-to-use", text: "この記事の使い方" },
  { href: "#domain3-overview", text: "ドメイン3の全体像" },
  { href: "#task1-adaptive-suitability", text: "Task1 アダプティブの適切性" },
  { href: "#task2-iteration-planning", text: "Task2 イテレーション計画" },
  { href: "#task3-project-controls", text: "Task3 プロジェクトコントロール" },
  { href: "#task4-adaptive-components", text: "Task4 アダプティブ計画の構成要素" },
  { href: "#task5-task-management", text: "Task5 タスク管理ステップ" },
  { href: "#glossary", text: "用語集" },
  { href: "#checklist", text: "学習チェックリスト" },
  { href: "#references", text: "参考文献・ソース" },
] as const;

const EXPECTED_CALLOUT_VARIANTS = { note: 2, source: 6, practice: 5 } as const;

const EXPECTED_CALLOUT_TOTAL = Object.values(EXPECTED_CALLOUT_VARIANTS).reduce(
  (sum, count) => sum + count,
  0,
);

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 2 },
  source: { "ソース": 6 },
  practice: { "ベストプラクティス": 5 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/capm-domain3-agile-frameworks-guide.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_ITEMS.map((item) => item.href.replace(/^#/, "")),
  sectionEyebrows: EXPECTED_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  seoTitleFragments: ["CAPM® ドメイン3"],
});

const mountPage = createMountPage(Page);

describe("pages/capm-domain3-agile-frameworks-guide.vue — ページ固有契約", () => {
  it("TOC のリンク文言が原本と順序込みで完全一致する（共有契約は href のみ照合）", () => {
    const actual = mountPage()
      .findAll(".sidebar-nav a")
      .map((el) => ({ href: el.attributes("href"), text: el.text().trim() }));
    expect(actual).toEqual([...EXPECTED_TOC_ITEMS]);
  });

  it("callout の総数が variant 別の合計と一致する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll('[data-testid="callout"]')).toHaveLength(EXPECTED_CALLOUT_TOTAL);
    expect(wrapper.findAll('[data-testid="callout-label"]')).toHaveLength(EXPECTED_CALLOUT_TOTAL);
  });

  it("見出しの総数が原本の見出し件数と一致する", () => {
    const levels = texts(mountPage(), "h1, h2, h3, h4, h5, h6");
    expect(levels).toHaveLength(
      EXPECTED_H1.length +
        EXPECTED_H2.length +
        EXPECTED_H3.length +
        EXPECTED_H4.length +
        EXPECTED_H5.length +
        EXPECTED_H6.length,
    );
  });

  it("useSeoMeta の description に CAPM が含まれる", () => {
    seoMeta.mockClear();
    mountPage();
    expect(seoMeta).toHaveBeenCalledWith(
      expect.objectContaining({ description: expect.stringContaining("CAPM") }),
    );
  });

  it("サイドバーの開閉トグルボタンが aria-expanded と open クラスを同期させる", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get(".sidebar-toggle");
    const sidebar = wrapper.get("#sidebar");

    expect(toggle.attributes("aria-expanded")).toBe("false");
    expect(sidebar.classes()).not.toContain("open");

    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(sidebar.classes()).toContain("open");

    await toggle.trigger("click");
    await nextTick();
    expect(toggle.attributes("aria-expanded")).toBe("false");
    expect(sidebar.classes()).not.toContain("open");
  });
});
