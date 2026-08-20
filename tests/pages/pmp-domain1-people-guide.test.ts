// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/pmp-domain1-people-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "PMP® Domain I: People 完全攻略ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "PMP試験の全体像",
  "2026年7月改定のポイント",
  "Domain I: Peopleとは何か",
  "Task 1: 共通ビジョンの醸成 (Develop a common vision)",
  "Task 2: コンフリクトのマネジメント (Manage conflicts)",
  "Task 3: プロジェクトチームのリード (Lead the project team)",
  "Task 4: ステークホルダーのエンゲージメント (Engage stakeholders)",
  "Task 5: ステークホルダーの期待値の整合 (Align stakeholder expectations)",
  "Task 6: ステークホルダーの期待値のマネジメント (Manage stakeholder expectations)",
  "Task 7: 知識移転の推進 (Help ensure knowledge transfer)",
  "Task 8: コミュニケーションの計画とマネジメント (Plan and manage communication)",
  "タスク横断ベストプラクティス総まとめ表",
  "People領域の試験対策のコツ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "概要",
  "Enabler(実務行動例)",
  "ステップバイステップ解説",
  "概要",
  "Enabler(実務行動例)",
  "コンフリクトマネジメントのプロセスフロー",
  "ベストプラクティス: Thomas-Kilmann Conflict Mode Instrument(TKI)",
  "概要",
  "Enabler(実務行動例)",
  "ベストプラクティス: リーダーシップスタイルの使い分け",
  "概要",
  "Enabler(実務行動例)",
  "ステークホルダーエンゲージメントのサイクル",
  "ベストプラクティス: ステークホルダー分析ツール",
  "概要",
  "Enabler(実務行動例)",
  "ベストプラクティス: Stakeholder Engagement Assessment Matrix",
  "概要",
  "Enabler(実務行動例)",
  "Task 5とTask 6の違いを理解する",
  "概要",
  "Enabler(実務行動例)",
  "知識移転のプロセスフロー",
  "ベストプラクティス: 暗黙知(Tacit Knowledge)と形式知(Explicit Knowledge)",
  "概要",
  "Enabler(実務行動例)",
  "コミュニケーション計画のフロー",
  "ベストプラクティス: 3つのコミュニケーション方式",
  "PMI公式・一次情報源",
  "コンフリクトマネジメント関連",
  "リーダーシップ関連",
  "ステークホルダーマネジメント関連",
  "知識移転関連",
  "コミュニケーション管理関連",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf",
  "https://www.pmi.org/certifications/project-management-pmp",
  "https://en.wikipedia.org/wiki/Ralph_H._Kilmann",
  "https://www.pmi.org/learning/library/leadership-conflict-advance-project-teams-6711",
  "https://www.pmi.org/learning/library/leadership-essentials-project-management-professionals-6226",
  "https://www.pmi.org/learning/library/great-project-leadership-five-essentials-5915",
  "https://pmstudycircle.com/stakeholder-engagement-assessment-matrix/",
  "https://www.projectengineer.net/3-types-of-stakeholder-matrix/",
  "https://www.pmi.org/learning/library/turning-experience-into-knowledge-3828",
  "https://www.pmi.org/learning/library/tapping-tacit-knowledge-across-enterprise-7747",
  "https://www.pmi.org/learning/library/support-knowledge-transfer-pmos-10206",
  "https://www.pmi.org/learning/library/uncovering-tacit-knowledge-projects-7378",
  "https://www.pmi.org/learning/library/communication-strategy-stakeholder-generating-reports-6887",
  "https://www.pmi.org/standards/pmbok",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "exam-overview",
  "eco-2026-update",
  "what-is-domain-people",
  "task-1-common-vision",
  "task-2-manage-conflicts",
  "task-3-lead-team",
  "task-4-engage-stakeholders",
  "task-5-align-expectations",
  "task-6-manage-expectations",
  "task-7-knowledge-transfer",
  "task-8-plan-communication",
  "cross-task-summary",
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
  "SECTION 09",
  "SECTION 10",
  "SECTION 11",
  "SECTION 12",
  "SECTION 13",
  "SECTION 14",
  "SECTION 15",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TD
D["Domain I: People (33%)"] --> T1["Task 1 共通ビジョンの醸成"]
D --> T2["Task 2 コンフリクトのマネジメント"]
D --> T3["Task 3 プロジェクトチームのリード"]
D --> T4["Task 4 ステークホルダーのエンゲージメント"]
D --> T5["Task 5 期待値の整合"]
D --> T6["Task 6 期待値のマネジメント"]
D --> T7["Task 7 知識移転の推進"]
D --> T8["Task 8 コミュニケーションの計画"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class D hub;
class T1,T2,T3,T4,T5,T6,T7,T8 box;`,
  `flowchart LR
P["原則の周知徹底(発生前に実施)"] --> A["コンフリクトの発生"]
G["グラウンドルールの維持・是正(継続)"] --> A
A --> B["発生源の特定"]
B --> C["背景・状況の分析"]
C --> D["解決戦略の選択"]
D --> E["合意した解決策の実行"]
E --> F["フォローアップ"]
F --> H["再発防止"]
H -.->|"グラウンドルールへ反映"| G

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P,G hub;
class A,B,C,D,E,F box;
class H done;`,
  `flowchart TD
A["ステークホルダーの特定"] --> B["分析(影響力・関心度)"]
B --> C["エンゲージメント戦略の立案"]
C --> D["コミュニケーションの実行"]
D --> E["期待値のモニタリング"]
E --> F["満足度の確認・対応"]
F --> B

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;`,
  `flowchart LR
A["プロジェクトに重要な知識の特定"] --> B["知識の収集"]
B --> C["形式知への変換"]
C --> D["知識移転を促す環境づくり"]
D --> E["組織のナレッジベースへ格納"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D box;
class E done;`,
  `flowchart TD
A["コミュニケーション戦略の定義"] --> B["伝達方法の選択"]
B --> C["Push型"]
B --> D["Pull型"]
B --> E["Interactive型"]
C --> F["フィードバックループの確立"]
D --> F
E --> F
F --> G["レポーティング・ガバナンスへの反映"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;
class G done;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 12,
  practice: 9,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    "ベストプラクティス": 2,
    "その他のベストプラクティス": 6,
    "ベストプラクティス: ステークホルダー分析ツール": 1,
  },
  source: {
    "ソース": 12,
  },
} as const;

const EXPECTED_STEP_TAGS = [
  "ビジョンを言語化する",
  "主要ステークホルダーと共同構築する",
  "反復的に発信する",
  "定点観測する",
  "ズレが起きたら分解して原因分析する",
] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "PMP",
  "Domain I",
  "People",
  "攻略ガイド",
] as const;

defineSourceParityContract({
  suiteName: "pages/pmp-domain1-people-guide.vue",
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

const mountPage = createMountPage(Page);

describe("pages/pmp-domain1-people-guide.vue — 目次の現在地", () => {
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
