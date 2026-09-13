// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-agile-leadership-evidence-based-management.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Agile Leadership™ - Evidence-Based Management™(PAL-EBM)認定 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "試験概要",
  "出題範囲(Focus Areas)の全体像",
  "経験主義(Empiricism)― なぜ、いつ必要か",
  "Evidence-Based Management™(EBM)とは何か",
  "4つの主要価値領域(Key Value Areas, KVA)",
  "プロダクトバリュー(Product Value)の評価方法",
  "ビジネス戦略とUnrealized Value",
  "ステークホルダーと顧客管理",
  "ポートフォリオプランニング(Evolving the Agile Organization)",
  "仮説形成と検証(Forming & Evaluating Hypotheses)",
  "目標の設定・検査・適応(Setting, Inspecting & Adapting Goals)",
  "試験対策：シナリオ問題の解き方",
  "学習ステップ(初学者向けロードマップ)",
  "用語集(Glossary)",
  "参考文献・ソースURL一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 PAL-EBMとは",
  "1.2 試験の基本情報",
  "1.3 他のPAL系認定との違い",
  "1.4 認定取得までの流れ",
  "2.1 出題範囲マップ",
  "2.2 出題範囲の構造図",
  "3.1 経験主義の3本柱",
  "3.2 なぜ「複雑な問題」に経験主義が必要なのか",
  "3.3 検査と適応のサイクル",
  "4.1 定義と目的",
  "4.2 EBMの基本サイクル",
  "4.3 EBMが解決しようとする課題",
  "5.1 全体マップ",
  "5.2 各KVAの定義と問いかけ",
  "5.3 各KVAの詳細とベストプラクティス",
  "5.4 よくある誤解(試験の落とし穴)",
  "6.1 アウトプット指標とアウトカム指標",
  "6.2 プロダクトバリューをKVAで捉える",
  "7.1 機会のギャップという考え方",
  "7.2 戦略判断への活かし方",
  "8.1 Sprint Reviewを起点とするフィードバックループ",
  "8.2 ステークホルダーマッピングの観点",
  "9.1 伝統的な予算配分とリーン・アジャイルな投資の違い",
  "9.2 段階的投資(インクリメンタル・ファンディング)の考え方",
  "10.1 仮説ステートメントの型",
  "10.2 仮説駆動のループ",
  "10.3 良い実験設計のチェックポイント",
  "11.1 Scrumにおける目標の階層",
  "11.2 目標を「良いもの」にする観点",
  "11.3 補完的な目標設定フレームワーク(OKR)について",
  "12.1 出題形式の特徴",
  "12.2 よくある「落とし穴」パターン",
  "12.3 学習の優先順位(頻出度の目安)",
  "Scrum.org 公式情報",
  "補足・解説記事(二次情報、理解の補強用)",
] as const;

const EXPECTED_H4 = [
  "Current Value(CV)",
  "Unrealized Value(UV)",
  "Time-to-Market(T2M)",
  "Ability to Innovate(A2I)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "exam-overview",
  "focus-areas",
  "empiricism",
  "what-is-ebm",
  "four-kvas",
  "product-value",
  "business-strategy",
  "stakeholders-customers",
  "portfolio-planning",
  "hypotheses",
  "goals",
  "exam-strategy",
  "study-plan",
  "glossary",
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

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 13,
  practice: 15,
  note: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { ソース: 13 },
  practice: { ベストプラクティス: 15 },
  note: { 補足: 2 },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification",
  "https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification",
  "https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification",
  "https://www.scrum.org/resources/blog/how-pass-professional-agile-leadership-evidence-based-management-pal-ebm-assessment",
  "https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.scrum.org/resources/scrum-guide",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.infoq.com/articles/evidence-based-management-guide-updated",
  "https://www.scrum.org/resources/blog/3-questions-consider-when-getting-started-evidence-based-management-ebm",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.scrum.org/resources/how-measure-value-evidence-based-management",
  "https://www.scrum.org/resources/blog/pitfalls-challenges-implementing-ebm",
  "https://www.thescrummaster.co.uk/docs/what-are-the-four-key-value-areas-kvas-in-ebm-and-what-do-they-represent",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/how-measure-value-evidence-based-management",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/scrum-guide",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/scrum-guide",
  "https://www.infoq.com/articles/agile-goals-okr",
  "https://www.scrum.org/resources/blog/how-pass-professional-agile-leadership-evidence-based-management-pal-ebm-assessment",
  "https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification",
  "https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification",
  "https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management",
  "https://www.scrum.org/resources/evidence-based-management",
  "https://www.scrum.org/resources/how-measure-value-evidence-based-management",
  "https://www.scrum.org/resources/blog/3-questions-consider-when-getting-started-evidence-based-management-ebm",
  "https://www.scrum.org/resources/blog/pitfalls-challenges-implementing-ebm",
  "https://www.scrum.org/resources/blog/how-pass-professional-agile-leadership-evidence-based-management-pal-ebm-assessment",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.scrum.org/resources/scrum-guide",
  "https://www.infoq.com/articles/evidence-based-management-guide-updated",
  "https://www.infoq.com/podcasts/evidence-based-management",
  "https://www.infoq.com/articles/agile-goals-okr",
  "https://www.thescrummaster.co.uk/docs/what-are-the-four-key-value-areas-kvas-in-ebm-and-what-do-they-represent/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
A["Scrum Guideを理解する 経験主義の基礎"] --> B["EBM Guideを精読する 一次情報として最重要"]
B --> C["Focus Areas別に公式資料を学習する"]
C --> D["PAL-EBMクラスを受講 任意だが推奨"]
D --> E["Scrum Open Assessments 無料で理解度を確認"]
E --> F["シナリオ問題形式に慣れる"]
F --> G["PAL-EBM本試験を受験 60分・40問・85%以上"]
G --> H{"合格スコア85%以上?"}
H -- Yes --> I["PAL-EBM認定取得 無期限で有効"]
H -- No --> J["公式には再受験に別料金が必要な場合あり"]
J --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G,H,J box;
class I done;`,
  `flowchart TB
ROOT["PAL-EBM 出題範囲"]
ROOT --> C1["Scrumフレームワークの理解と適用"]
ROOT --> C2["アジリティをもったプロダクトマネジメント"]
ROOT --> C3["アジャイル組織への進化"]
ROOT --> C4["追加トピック"]
C1 --> F1["Empiricism 経験主義"]
C2 --> F2["Product Value プロダクトバリュー"]
C2 --> F3["Business Strategy ビジネス戦略"]
C2 --> F4["Stakeholders & Customers ステークホルダーと顧客"]
C3 --> F5["Portfolio Planning ポートフォリオプランニング"]
C3 --> F6["Evidence-Based Management"]
C4 --> F7["Forming & Evaluating Hypotheses"]
C4 --> F8["Setting, Inspecting & Adapting Goals"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class ROOT hub;
class C1,C2,C3,C4,F1,F2,F3,F4,F5,F6,F7,F8 box;`,
  `flowchart LR
A["透明性 Transparency"] --> B["検査 Inspection"]
B --> C["適応 Adaptation"]
C --> A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C box;`,
  `flowchart TB
A["現状を測定する Current Valueなど"] --> B["ギャップを特定する 目標と現状の差"]
B --> C["仮説を立てる Hypothesis"]
C --> D["小さく焦点を絞った実験を行う"]
D --> E["結果を測定・検査する"]
E --> F{"仮説は支持されたか?"}
F -- Yes --> G["組織の意思決定・投資配分に反映する"]
F -- No --> H["学びを得て次の仮説を形成する"]
G --> A
H --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,H box;
class G done;`,
  `flowchart TB
subgraph MV["市場価値 Market Value 顧客視点"]
CV["Current Value 現在価値"]
UV["Unrealized Value 未実現価値"]
end
subgraph AD["価値提供能力 Ability to Deliver Value 組織視点"]
T2M["Time-to-Market 市場投入までの時間"]
A2I["Ability to Innovate イノベーション能力"]
end
MV -. 相互に影響 .- AD

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class CV,UV,T2M,A2I box;`,
  `flowchart LR
A["プロダクトが今提供している価値"] -->|Current Valueとして測定| B["現状の把握"]
C["まだ満たされていないニーズ・機会"] -->|Unrealized Valueとして測定| D["投資判断の材料"]
B --> E["Sprint Reviewでの検査・適応"]
D --> E

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,C,B,D box;
class E hub;`,
  `flowchart TB
A["潜在顧客全体のニーズ・市場機会"] --> B["現在満たせている部分 = Current Value"]
A --> C["まだ満たせていない部分 = Unrealized Value 機会のギャップ"]
C --> D["仮説形成"]
D --> E["小さな実験"]
E --> F["学習した内容を戦略・ロードマップに反映"]
F --> B

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;`,
  `flowchart LR
A["Increment"] --> B["Sprint Review"]
C["CV・UVの測定データ"] --> B
D["ステークホルダーのフィードバック"] --> B
B --> E["Product Backlogの調整 適応"]
B --> F["戦略・優先順位の見直し"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,C,D,E,F box;
class B hub;`,
  `flowchart TB
A["ポートフォリオ全体の候補となる機会・イニシアチブ"] --> B["小さな投資で仮説を検証"]
B --> C{"evidenceは投資継続を支持するか?"}
C -- Yes --> D["投資を段階的に増やす"]
C -- No --> E["投資を停止し学びを他の機会に活かす"]
D --> F["Current Value・Unrealized Valueの再測定"]
F --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;`,
  `flowchart LR
A["仮説を立てる Hypothesis"] --> B["最小限の実験を設計・実施する"]
B --> C["結果を測定する KVAへの影響を確認"]
C --> D["学びを得る"]
D --> E{"仮説は支持されたか?"}
E -- Yes --> F["スケールする・意思決定に反映する"]
E -- No --> G["仮説を修正する"]
F --> A
G --> A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,G box;
class F done;`,
  `flowchart TB
A["組織のビジョン・戦略目標"] --> B["Product Goal プロダクトゴール"]
B --> C["Sprint Goal スプリントゴール"]
C --> D["Sprint Reviewでの検査"]
D --> E["適応 Product Backlog・戦略の見直し"]
E --> B

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`,
  `flowchart TB
A["最優先 4つのKVAの定義と市場価値・組織能力の分類"] --> B["優先 EBMの基本サイクルと経験主義の3本柱"]
B --> C["優先 仮説形成・実験設計の基本パターン"]
C --> D["補強 目標階層 Vision→Product Goal→Sprint Goal"]
D --> E["補強 ポートフォリオ投資のリーン原則"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-agile-leadership-evidence-based-management.vue",
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
  seoTitleFragments: ["PAL-EBM", "Evidence-Based Management"],
  seoTitle: "PAL-EBM™ 認定資格 完全ガイド | Evidence-Based Management™ で読み解くアジャイルリーダーシップ",
  seoDescription:
    "Scrum.org の Professional Agile Leadership - Evidence-Based Management (PAL-EBM) 認定について、経験主義、4つの主要価値領域(KVA)、仮説検証、目標設定までを初学者向けにステップバイステップで解説する学習ガイドです。",
});

describe("pages/professional-agile-leadership-evidence-based-management.vue — テーブル構造契約", () => {
  const mountPage = createMountPage(Page);

  it("すべての table が table-wrap で包まれ横スクロール可能である", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables.length).toBe(18);

    for (const table of tables) {
      const parent = table.element.parentElement;
      expect(parent).not.toBeNull();
      expect(parent?.classList.contains("table-wrap")).toBe(true);
    }
  });

  it("すべての table が thead と tbody を持ち th が scope='col' を持つ", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");

    for (const table of tables) {
      expect(table.find("thead").exists()).toBe(true);
      expect(table.find("tbody").exists()).toBe(true);
      const ths = table.findAll("thead th");
      expect(ths.length).toBeGreaterThan(0);
      for (const th of ths) {
        expect(th.attributes("scope")).toBe("col");
      }
    }
  });
});
