// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createMountPage, defineSourceParityContract, texts } from "../support/page-contract";
import Page from "~/pages/certified-associate-in-project-management-domain2.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "CAPM(R) ドメイン2: 予測型・計画重視の手法(Predictive, Plan-Based Methodologies) 完全学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドの使い方",
  "ドメイン2の全体像",
  "Task 1: 予測型・計画重視アプローチが適切な場面の説明",
  "Task 2: プロジェクトマネジメント計画とスケジュールの理解",
  "Task 3: 予測型プロジェクトのプロジェクトコントロールの文書化",
  "ドメイン2 ベストプラクティス総まとめ",
  "学習チェックリスト",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "CAPM試験全体におけるドメイン2の位置づけ",
  "ドメイン2を構成する3つのTask",
  "予測型(Predictive)アプローチとは何か",
  "組織構造と予測型アプローチの適合性",
  "プロセス群とプロセス内の典型的な活動",
  "さまざまなプロジェクト構成要素の違い",
  "Work Breakdown Structure(WBS)",
  "クリティカルパス法(Critical Path Method, CPM)",
  "スケジュール差異(Schedule Variance, SV)",
  "品質管理計画(Quality Management Plan)の適用",
  "統合管理計画(Integration Management Plan)の適用",
  "予測型プロジェクトで使用される主なアーティファクト",
  "コストとスケジュールの差異計算(EVM: Earned Value Management)",
  "変更管理とプロジェクトコントロールの流れ",
  "CAPM公式情報(PMI一次情報源)",
  "組織構造・プロジェクトマネジメント基礎(PMI公式ライブラリ)",
  "WBS・スケジュールマネジメント(PMI公式ライブラリ)",
  "品質マネジメント(PMI公式ライブラリ)",
  "アーンドバリューマネジメント(EVM)・コスト/スケジュール差異(PMI公式ライブラリ)",
  "補足情報源(第三者による解説記事・参考用)",
] as const;

const EXPECTED_H4 = [
  "100%ルール",
  "計算の基本用語",
  "サンプルプロジェクトのネットワーク図",
  "フォワードパス/バックワードパスの計算結果",
  "EVMの基本3指標と主要な派生指標",
  "サンプルプロジェクトでの計算例",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TD
D2["ドメイン2: 予測型・計画重視の手法 (17%)"]
D2 --> T1["Task 1\\n予測型アプローチが適切な場面を説明する"]
D2 --> T2["Task 2\\nプロジェクトマネジメント計画の\\nスケジュールを理解する"]
D2 --> T3["Task 3\\n予測型プロジェクトの\\nプロジェクトコントロールを文書化する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class D2,T1,T2,T3 box;`,
  `flowchart LR
F["ファンクショナル型\\nFunctional\\nPM権限: なし〜非常に低い"] --> WM["ウィークマトリックス\\nWeak Matrix\\nPM権限: 低い"]
WM --> BM["バランスマトリックス\\nBalanced Matrix\\nPM権限: 低〜中程度"]
BM --> SM["ストロングマトリックス\\nStrong Matrix\\nPM権限: 中〜高い"]
SM --> PZ["プロジェクタイズド型\\nProjectized\\nPM権限: 高い〜ほぼ全権"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class F,WM,BM box;
class SM,PZ hub;`,
  `flowchart LR
I["立ち上げ\\nInitiating"] --> P["計画\\nPlanning"]
P --> E["実行\\nExecuting"]
E <--> M["監視・コントロール\\nMonitoring & Controlling"]
M --> P
E --> C["終結\\nClosing"]
M --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class I,P,E,M box;
class C done;`,
  `flowchart TD
CH["プロジェクト憲章\\nProject Charter"] --> PMP["プロジェクトマネジメント計画\\nProject Management Plan"]
PMP --> BL["ベースライン\\nBaselines"]
PMP --> DOC["プロジェクト文書\\nProject Documents"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class CH,PMP,BL,DOC box;`,
  `flowchart TD
ROOT["1.0 社内タスク管理ツール導入プロジェクト"]
ROOT --> D1["1.1 要件定義"]
ROOT --> D2["1.2 設計"]
ROOT --> D3["1.3 開発"]
ROOT --> D4["1.4 テスト"]
ROOT --> D5["1.5 導入・移行"]

D1 --> W1["1.1.1 業務要件ヒアリング"]
D1 --> W2["1.1.2 要件定義書"]

D2 --> W3["1.2.1 画面設計書"]
D2 --> W4["1.2.2 DB設計書"]
D2 --> W5["1.2.3 API設計書"]

D3 --> W6["1.3.1 画面開発"]
D3 --> W7["1.3.2 DB構築"]
D3 --> W8["1.3.3 API開発"]

D4 --> W9["1.4.1 結合テスト"]
D4 --> W10["1.4.2 受入テスト"]

D5 --> W11["1.5.1 データ移行"]
D5 --> W12["1.5.2 本番リリース"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class ROOT,D1,D2,D3,D4,D5 box;
class W1,W2,W3,W4,W5,W6,W7,W8,W9,W10,W11,W12 done;`,
  `flowchart LR
A["A: 要件定義\\n5日"] --> B["B: 設計\\n7日"]
B --> C["C: DB構築\\n4日"]
B --> D["D: 画面開発\\n10日"]
B --> E["E: API開発\\n8日"]
C --> F["F: 結合テスト\\n5日"]
D --> F
E --> F
F --> G["G: 受入テスト\\n3日"]
G --> H["H: 本番移行\\n2日"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,D,F,G,H hub;
class C,E box;`,
  `flowchart LR
QMP["品質管理計画\\nQuality Management Plan"] --> QP["品質計画\\nQuality Planning\\n基準・指標の定義"]
QMP --> QA["品質保証\\nQuality Assurance\\nプロセスが正しく守られているかの確認"]
QMP --> QC["品質コントロール\\nQuality Control\\n成果物が基準を満たしているかの検査"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class QMP,QP,QA,QC box;`,
  `flowchart TD
PMP["プロジェクトマネジメント計画\\n(統合された全体計画)"]
PMP --> SC["スコープ管理計画"]
PMP --> SCH["スケジュール管理計画"]
PMP --> CO["コスト管理計画"]
PMP --> QM["品質管理計画"]
PMP --> RE["リソース管理計画"]
PMP --> COM["コミュニケーション管理計画"]
PMP --> RI["リスク管理計画"]
PMP --> PR["調達管理計画"]
PMP --> ST["ステークホルダー管理計画"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PMP hub;
class SC,SCH,CO,QM,RE,COM,RI,PR,ST box;`,
  `flowchart TD
PV["PV: Planned Value\\n計画時点までの予算価値"]
EV["EV: Earned Value\\n完了した作業の予算価値(出来高)"]
AC["AC: Actual Cost\\n実際に発生したコスト"]

PV --> SV["SV = EV - PV\\nスケジュール差異"]
EV --> SV
EV --> CV["CV = EV - AC\\nコスト差異"]
AC --> CV
PV --> SPI["SPI = EV / PV\\nスケジュール効率指数"]
EV --> SPI
EV --> CPI["CPI = EV / AC\\nコスト効率指数"]
AC --> CPI
CPI --> EAC["EAC\\n完成時総コスト予測"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PV,EV,AC box;
class SV,CV,SPI,CPI,EAC hub;`,
  `flowchart LR
IS["課題・逸脱の発見\\n(Issue Logに登録)"] --> CR["変更要求の起票\\nChange Request"]
CR --> CCB["統合変更管理\\n(変更管理委員会 CCBによる審査)"]
CCB -->|"承認"| BU["ベースラインの更新\\n(スコープ/スケジュール/コスト)"]
CCB -->|"却下"| LG["却下理由をChange Logに記録"]
BU --> SR["ステータスレポートへ反映"]
LG --> SR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class IS,CR,CCB,LG box;
class BU,SR done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/certified-associate-capm",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf",
  "https://www.pmi.org/learning/library/pm-matrix-organizations-10000",
  "https://www.pmi.org/learning/library/strategic-alignment-project-management-organizational-structure-10956",
  "https://www.pmi.org/learning/library/practice-standard-work-breakdown-structures-8063",
  "https://www.pmi.org/standards/pmbok",
  "https://www.pmi.org/learning/library/quality-management-9107",
  "https://www.pmi.org/learning/library/practice-three-project-quality-management-7198",
  "https://www.pmi.org/learning/library/earned-value-management-systems-analysis-8026",
  "https://www.pmi.org/learning/library/evm-cpm-evaluate-project-performance-6355",
  "https://www.pmi.org/learning/library/integrating-scheduling-evm-metrics-8516",
  "https://www.pmi.org/learning/library/make-earned-value-work-project-6001",
  "https://ecampusontario.pressbooks.pub/hrstrategicprojectmanagement/chapter/2-2-structures/",
  "https://www.smartsheet.com/content/project-management-organization",
  "https://blog.planview.com/project-management-organization-the-basics/",
  "https://www.workbreakdownstructure.com/",
  "https://www.projectmanager.com/blog/schedule-variance-what-is-it-how-do-i-calculate-it",
  "https://www.projectengineer.net/project-quality-management-according-to-the-pmbok/",
  "https://www.projectengineer.net/project-integration-management-according-to-the-pmbok/",
  "https://www.projectengineer.net/the-pmboks-project-management-documents/",
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
] as const;

const EXPECTED_TOC_ITEMS = [
  { href: "#how-to-use-this-guide", text: "このガイドの使い方" },
  { href: "#domain-2-overview", text: "ドメイン2の全体像" },
  { href: "#task-1-when-predictive-fits", text: "Task 1: 予測型・計画重視アプローチが適切な場面の説明" },
  { href: "#task-2-schedule-and-plan", text: "Task 2: プロジェクトマネジメント計画とスケジュールの理解" },
  { href: "#task-3-project-controls", text: "Task 3: 予測型プロジェクトのプロジェクトコントロールの文書化" },
  { href: "#domain-2-best-practices", text: "ドメイン2 ベストプラクティス総まとめ" },
  { href: "#study-checklist", text: "学習チェックリスト" },
  { href: "#references", text: "参考文献・出典" },
] as const;

const EXPECTED_CALLOUT_VARIANTS = { practice: 12, source: 7, note: 8 } as const;

const EXPECTED_CALLOUT_TOTAL = Object.values(EXPECTED_CALLOUT_VARIANTS).reduce(
  (sum, count) => sum + count,
  0,
);

const EXPECTED_CALLOUT_LABELS = {
  practice: { "ベストプラクティス": 12 },
  source: { "ソース": 7 },
  note: { "補足": 8 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/certified-associate-in-project-management-domain2.vue",
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
  seoTitleFragments: ["CAPM(R) ドメイン2"],
});

const mountPage = createMountPage(Page);

describe("pages/certified-associate-in-project-management-domain2.vue — ページ固有契約", () => {
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
