// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createMountPage, defineSourceParityContract, texts } from "../support/page-contract";
import Page from "~/pages/certified-associate-in-project-management-domain1.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念",
] as const;

const EXPECTED_H2 = [
  "CAPM試験の全体像",
  "ドメイン1の構造",
  "Task 1: プロジェクトのライフサイクルとプロセスの理解",
  "Task 2: プロジェクトマネジメント計画の理解",
  "Task 3: プロジェクトの役割と責任の理解",
  "Task 4: 計画された戦略・フレームワークの実行方法の決定",
  "Task 5: 一般的な問題解決ツールと技法の理解",
  "ドメイン1 学習・試験対策のベストプラクティス",
  "参考文献・出典(References)",
] as const;

const EXPECTED_H3 = [
  "0.1 試験概要",
  "0.2 4ドメインの配点",
  "0.3 公式参考文献リスト",
  "1.1 プロジェクト・プログラム・ポートフォリオの違い",
  "1.2 プロジェクトと定常業務(オペレーション)の違い",
  "1.3 予測型(Predictive)と適応型(Adaptive)アプローチの違い",
  "1.4 課題・リスク・前提条件・制約条件の違い(通称IRAC)",
  "1.5 プロジェクトスコープのレビュー/批評",
  "1.6 PMIの倫理・職業行動規範(Code of Ethics and Professional Conduct)の適用",
  "1.7 プロジェクトが変化の手段であること",
  "2.1 コスト・品質・リスク・スケジュール等の目的と重要性",
  "2.2 プロジェクトマネジメント計画 vs プロダクトマネジメント計画",
  "2.3 マイルストーンとタスク期間の違い",
  "2.4 プロジェクトにおけるリソースの数と種類の決定",
  "2.5 リスク登録簿(Risk Register)の活用",
  "2.6 ステークホルダー登録簿(Stakeholder Register)の活用",
  "2.7 プロジェクトの終結と移行",
  "3.1 プロジェクトマネージャーとプロジェクトスポンサーの役割比較",
  "3.2 プロジェクトチームとプロジェクトスポンサーの役割比較",
  "3.3 プロジェクトマネージャーが担う多様な役割",
  "3.4 リーダーシップとマネジメントの違い",
  "3.5 感情知能(EQ: Emotional Intelligence)とプロジェクトマネジメントへの影響",
  "4.1 計画された戦略・フレームワークへの適切な対応例",
  "4.2 プロジェクト立上げとベネフィットプランニング",
  "5.1 会議の効果性の評価",
  "5.2 フォーカスグループ、スタンドアップミーティング、ブレインストーミングの目的",
] as const;

const EXPECTED_H4 = [
  "プロジェクトマネジメントへの影響",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["CAPM試験 135採点問題"] --> B["ドメイン1 PM基礎と主要概念 36%"]
A --> C["ドメイン2 予測型計画ベース手法 17%"]
A --> D["ドメイン3 アジャイルフレームワーク手法 20%"]
A --> E["ドメイン4 ビジネス分析フレームワーク 27%"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`,
  `flowchart TB
S["組織の戦略目標"] --> P["ポートフォリオ Portfolio"]
P --> PG1["プログラムA Program"]
P --> PJ1["単独プロジェクトX プログラムに属さない"]
PG1 --> PJ2["プロジェクトA-1"]
PG1 --> PJ3["プロジェクトA-2"]
PG1 --> OPS["関連する定常業務"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P hub;
class S,PG1,PJ1,PJ2,PJ3,OPS box;`,
  `flowchart LR
A["予測型 Predictive"] --- B["ハイブリッド型 Hybrid"] --- C["適応型 Adaptive"]
A2["要件が安定 明確"] -.- A
C2["要件が不確実 変化前提"] -.- C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,C box;
class B hub;
class A2,C2 box;`,
  `flowchart TB
COE["PMI Code of Ethics and Professional Conduct"] --> R1["責任 Responsibility"]
COE --> R2["尊重 Respect"]
COE --> R3["公正 Fairness"]
COE --> R4["誠実 Honesty"]
COE --> A1["向上目標基準"]
COE --> M1["必須基準"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class COE hub;
class R1,R2,R3,R4,A1,M1 box;`,
  `flowchart LR
A["リスクの特定"] --> B["定性的リスク分析 発生確率×影響度"]
B --> C["リスク対応計画の策定"]
C --> D["リスク登録簿への記録"]
D --> E["リスクの監視 コントロール"]
E -->|"新規リスク発見"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D,E done;`,
  `flowchart LR
A["最終成果物の検証 受入"] --> B["契約の終結 調達がある場合"]
B --> C["教訓レッスンズラーンドの収集"]
C --> D["資源の解放"]
D --> E["運用部門等への引き継ぎ 移行"]
E --> F["行政上の終結 文書のアーカイブ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F done;`,
  `flowchart TB
PM["プロジェクトマネージャー"] --- R1["開始者"]
PM --- R2["交渉者"]
PM --- R3["傾聴者"]
PM --- R4["コーチ"]
PM --- R5["実務メンバー"]
PM --- R6["ファシリテーター"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PM hub;
class R1,R2,R3,R4,R5,R6 box;`,
  `flowchart LR
A["ビジネスケースの作成"] --> B["プロジェクト憲章の作成 承認"]
B --> C["ベネフィットマネジメント計画の策定"]
C --> D["プロジェクトのキックオフ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/certified-associate-capm",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf",
  "https://www.pmi.org/standards/pmbok",
  "https://www.pmi.org/about/what-is-project-management",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf",
  "https://www.pmi.org/about/ethics/guidelines",
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
] as const;

const EXPECTED_TOC_ITEMS = [
  { href: "#exam-overview", text: "試験の全体像" },
  { href: "#domain1-structure", text: "ドメイン1の構造" },
  { href: "#task1-lifecycle", text: "Task1: ライフサイクルとプロセス" },
  { href: "#task2-planning", text: "Task2: PM計画の理解" },
  { href: "#task3-roles", text: "Task3: 役割と責任" },
  { href: "#task4-strategy-execution", text: "Task4: 戦略の実行" },
  { href: "#task5-problem-solving", text: "Task5: 問題解決の技法" },
  { href: "#study-best-practices", text: "学習・試験対策" },
  { href: "#references", text: "参考文献・出典" },
] as const;

/**
 * 原本の `.callout.<variant>` の出現数。件数は必ずこの 1 か所から導出し、
 * variant 別と合計を別々にハードコードしない（片方だけ直して食い違う事故を防ぐ）。
 */
const EXPECTED_CALLOUT_VARIANTS = { source: 25, practice: 21 } as const;

const EXPECTED_CALLOUT_TOTAL = Object.values(EXPECTED_CALLOUT_VARIANTS).reduce(
  (sum, count) => sum + count,
  0,
);

const EXPECTED_CALLOUT_LABELS = {
  source: { "ソース": 25 },
  practice: { "ベストプラクティス": 21 },
} as const;

// 原本にステップ表記は存在しないため空。原本に無い要素を移植先へ要求しない。
const EXPECTED_STEP_TAGS = [] as const;

// 原本照合 (S) / コンテンツ (C) / デザイン (D) / 品質 (Q) の共通契約。
// 1 ファイルにつき呼び出しは 1 回まで（page-contract.ts の NOTE を参照）。
defineSourceParityContract({
  suiteName: "pages/certified-associate-in-project-management-domain1.vue",
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
  seoTitleFragments: ["CAPM® ドメイン1"],
});

const mountPage = createMountPage(Page);

describe("pages/certified-associate-in-project-management-domain1.vue — ページ固有契約", () => {
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

  it("統計カードが 4 件存在する", () => {
    expect(mountPage().findAll(".stat-card")).toHaveLength(4);
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
    const toggle = wrapper.find("#sidebarToggle");
    const sidebar = wrapper.find("#sidebar");

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
