// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/prince2-7-foundation-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "PRINCE2® Project Management Foundation (Version 7) 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "試験の全体像(まずここを把握する)",
  "PRINCE2とは何か / プロジェクトの文脈",
  "7つの原則(Principles)",
  "People(人) — V7で新設された章",
  "7つのプラクティス(Practices)",
  "マネジメント製品(Management Products)の全体像",
  "役割と責任(Roles and Responsibilities)",
  "7つのプロセス(Processes)",
  "テーラリング(Tailoring)",
  "デジタル&データマネジメント(Digital and Data Management)— V7新規要素",
  "サステナビリティ(Sustainability)の統合",
  "プラクティス×プロセス×原則の関係(横断整理)",
  "試験対策のポイント",
  "参考文献・出典(URL)",
] as const;

const EXPECTED_H3 = [
  "出題される知識領域(PeopleCert公式「学習内容」より)",
  "原則の詳細解説",
  "Peopleに関する3つの活動",
  "コミュニケーション・マネジメント・アプローチ",
  "Business Case(ビジネスケース)",
  "Organizing(組織化)",
  "Plans(計画)",
  "Quality(品質)",
  "Risk(リスク)",
  "Issues(課題)— 旧「Change」からの改称",
  "Progress(進捗)",
  "兼務(役割の共有)に関するルール",
  "プロセス全体の流れ",
  "各プロセスの詳細",
] as const;

const EXPECTED_H4 = [
  "出典一覧",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "exam-overview",
  "what-is-prince2",
  "principles",
  "people",
  "practices",
  "management-products",
  "roles-responsibilities",
  "processes",
  "tailoring",
  "digital-data-management",
  "sustainability",
  "cross-mapping",
  "exam-tips",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 00",
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

// S-3 は出現回数で照合するため、原本で複数回出る URL は回数分列挙する（12 種・23 件）。
const EXPECTED_EXTERNAL_URLS = [
  "https://goodelearning.com/downloads/project-program-management/learning-prince2-poster-56-7-prince2-processes",
  "https://goodelearning.com/downloads/project-program-management/learning-prince2-poster-56-7-prince2-processes",
  "https://onlinepmcourses.com/prince2-7th-edition-the-top-10-changes-you-need-to-know",
  "https://onlinepmcourses.com/prince2-7th-edition-the-top-10-changes-you-need-to-know",
  "https://prince2.wiki/practices/organizing",
  "https://prince2.wiki/practices/organizing",
  "https://prince2.wiki/principles/define-roles-responsibilities-and-relationships",
  "https://prince2.wiki/principles/define-roles-responsibilities-and-relationships",
  "https://www.knowledgetrain.co.uk/project-management/prince2/prince2-course/prince2-practices",
  "https://www.knowledgetrain.co.uk/project-management/prince2/prince2-manual-managing-successful-projects-with-prince2",
  "https://www.knowledgetrain.co.uk/project-management/prince2/prince2-manual-managing-successful-projects-with-prince2",
  "https://www.knowledgetrain.co.uk/project-management/prince2/prince2-roles-responsibilities",
  "https://www.knowledgetrain.co.uk/project-management/prince2/prince2-roles-responsibilities",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-2/PRINCE2-7-foundation-3579",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-2/PRINCE2-7-foundation-3579",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-2/PRINCE2-7-foundation-3579",
  "https://www.projex.com/processes-and-practices-in-prince2-7-project-management",
  "https://www.projex.com/processes-and-practices-in-prince2-7-project-management",
  "https://www.scribd.com/document/799374849/Managing-Successful-Projects-With-PRINCE2-7-Watermarked",
  "https://www.scribd.com/document/799374849/Managing-Successful-Projects-With-PRINCE2-7-Watermarked",
  "https://www.spoclearn.com/blog/prince2-7-roles-responsibilities",
  "https://www.spoclearn.com/blog/prince2-7-roles-responsibilities",
  "https://www.whatisprince2.net/principles",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
accTitle: PRINCE2の統合構造
accDescr: 7つの原則・人・7つのプラクティス・7つのプロセスがPRINCE2の統合構造を構成し、テーラリングによって各プロジェクトに適応させる関係を示す図
A["7つの原則 Principles"] --> D["PRINCE2の統合構造"]
B["人 People"] --> D
C["7つのプラクティス Practices"] --> D
E["7つのプロセス Processes"] --> D
D --> F["テーラリング Tailoring"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,E box;
class D hub;
class F done;`,
  `flowchart LR
accTitle: トレランスとエスカレーションの経路
accDescr: コーポレート/プログラムマネジメントがプロジェクトトレランス、プロジェクトボードがステージトレランス、プロジェクトマネージャーがワークパッケージトレランスを設定し、逸脱予測時は下位から上位へ例外報告としてエスカレーションされる関係を示す図
Corp["コーポレート/プログラムマネジメント"] -->|"プロジェクトトレランスを設定"| Board["プロジェクトボード"]
Board -->|"ステージトレランスを設定"| PM["プロジェクトマネージャー"]
PM -->|"ワークパッケージトレランスを設定"| TM["チームマネージャー"]
TM -->|"トレランス逸脱の予測"| PM
PM -->|"例外報告"| Board
Board -->|"トレランス逸脱の予測(プロジェクトレベル)"| Corp
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Corp,PM,TM box;
class Board hub;`,
  `flowchart TB
accTitle: 7つのプラクティスの関係
accDescr: ビジネスケースを中心に、組織化・プラン・品質・リスク・課題・進捗の6つのプラクティスが環状に関連し合う構造を示す図
BC["Business Case"] --- ORG["Organizing"]
ORG --- PL["Plans"]
PL --- Q["Quality"]
Q --- R["Risk"]
R --- I["Issues"]
I --- P["Progress"]
P --- BC
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class ORG,PL,Q,R,I,P box;
class BC hub;`,
  `flowchart TB
accTitle: プロジェクト組織の4階層
accDescr: コーポレート/プログラムマネジメントから、指揮レベルのプロジェクトボード、管理レベルのプロジェクトマネージャー、実行レベルのチームマネージャーへと続く指揮命令の階層を示す図
Corp["コーポレート/プログラムマネジメント(プロジェクト外)"]
subgraph Direct["指揮レベル"]
Board["プロジェクトボード(Executive / Senior User / Senior Supplier)"]
end
subgraph Manage["管理レベル"]
PM["プロジェクトマネージャー"]
end
subgraph Deliver["実行レベル"]
TM["チームマネージャー"]
end
Corp --> Board --> PM --> TM
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Corp,PM,TM box;
class Board hub;`,
  `flowchart LR
accTitle: プロダクトベースプランニングの手順
accDescr: プロジェクト・プロダクト・ディスクリプションからプロダクト・ブレイクダウン・ストラクチャー、各プロダクトのディスクリプション、プロダクト・フロー・ダイアグラムを経てスケジュール化・見積りに至る一連の手順を示す図
PPD["プロジェクト・プロダクト ディスクリプション"] --> PBS["プロダクト・ブレイクダウン ストラクチャー"]
PBS --> PD["各プロダクトの ディスクリプション"]
PD --> PFD["プロダクト・フロー ダイアグラム"]
PFD --> SCHEDULE["スケジュール化・見積り"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PBS,PD,PFD box;
class PPD hub;
class SCHEDULE done;`,
  `flowchart LR
accTitle: 品質監査証跡の流れ
accDescr: 顧客の品質期待から受け入れ基準、品質マネジメントアプローチ、プロダクト・ディスクリプションの品質基準を経て品質レジスターへ記録されるまでの追跡関係を示す図
CQE["顧客の品質期待"] --> AC["受け入れ基準"]
AC --> QMA["品質マネジメント アプローチ"]
QMA --> PD2["プロダクト・ディスクリプション(品質基準/方法/責任)"]
PD2 --> QR["品質レジスター(実施記録)"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class AC,QMA,PD2 box;
class CQE hub;
class QR done;`,
  `flowchart TB
accTitle: リスクマネジメント手順
accDescr: 特定・評価・計画・実行を繰り返す循環プロセスと、全ステップに継続的に関与するコミュニケーションの関係を示す図
ID["特定(Identify)"] --> AS["評価(Assess)"]
AS --> PLAN["計画(Plan)"]
PLAN --> IMP["実行(Implement)"]
IMP --> ID
COMM["コミュニケーション(全ステップに継続的に関与)"] -.-> ID
COMM -.-> AS
COMM -.-> PLAN
COMM -.-> IMP
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class ID,AS,PLAN,IMP box;
class COMM hub;`,
  `flowchart LR
accTitle: 課題と変更管理の手順
accDescr: 捕捉・評価・推奨・決定・実施の5段階を順に経る課題および変更のコントロール手順を示す図
CAP["捕捉(Capture)"] --> EXAM["評価(Assess)"]
EXAM --> PROP["推奨(Recommend)"]
PROP --> DEC["決定(Decide)"]
DEC --> IMPL["実施(Implement)"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class EXAM,PROP,DEC box;
class CAP hub;
class IMPL done;`,
  `flowchart TB
accTitle: マネジメント製品の分類
accDescr: マネジメント製品をベースライン・記録類・報告類の3分類に分け、それぞれに含まれる具体的な製品名を列挙したマップ図
MP["マネジメント製品"]
MP --> BL["ベースライン(Baselines)"]
MP --> REC["記録類(Project Log: レジスター/ログ)"]
MP --> REP["報告類(Reports)"]
BL --> BL1["ビジネスケース"]
BL --> BL2["各種マネジメント・アプローチ(Benefits/Change/Commercial/Communication/Digital and Data/Issue/Quality/Risk/Sustainability)"]
BL --> BL3["プラン(Project/Stage/Team/Exception)"]
BL --> BL4["プロダクト・ディスクリプション"]
BL --> BL5["プロジェクトブリーフ"]
BL --> BL6["プロジェクト・イニシエーション ドキュメンテーション(PID)"]
BL --> BL7["ワークパッケージ・ディスクリプション"]
REC --> REC1["デイリーログ"]
REC --> REC2["課題レジスター"]
REC --> REC3["教訓ログ"]
REC --> REC4["プロダクトレジスター"]
REC --> REC5["品質レジスター"]
REC --> REC6["リスクレジスター"]
REP --> REP1["チェックポイント報告"]
REP --> REP2["ハイライト報告"]
REP --> REP3["例外報告"]
REP --> REP4["エンドステージ報告"]
REP --> REP5["エンドプロジェクト報告"]
REP --> REP6["教訓報告"]
REP --> REP7["課題報告"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class BL,REC,REP,BL1,BL2,BL3,BL4,BL5,BL6,BL7,REC1,REC2,REC3,REC4,REC5,REC6,REP1,REP2,REP3,REP4,REP5,REP6,REP7 box;
class MP hub;`,
  `flowchart TB
accTitle: PRINCE2プロセス全体の流れ
accDescr: プロジェクト開始前のSU、全期間を通じて継続するDP、初期化ステージのIP、繰り返される提供ステージのCS・MP・SB、最終ステージのCPへと連なるプロセス全体の流れを示す図
subgraph PreProject["プロジェクト開始前"]
SU["SU: プロジェクト開始"]
end
subgraph Direct["DP: プロジェクト指揮(全期間を通じて継続)"]
DP1["初期化の認可"]
DP2["プロジェクトの認可"]
DP3["ステージ/例外プランの認可"]
DP4["アドホックな方向付け"]
DP5["終結の認可"]
end
subgraph Initiation["初期化ステージ"]
IP["IP: プロジェクト初期化"]
end
subgraph Delivery["提供ステージ(繰り返し)"]
CS["CS: ステージ統制"]
MP["MP: プロダクト提供管理"]
SB["SB: ステージ境界管理"]
CS <--> MP
CS --> SB
end
subgraph FinalStage["最終ステージ"]
CP["CP: プロジェクト終結"]
end
SU --> DP1 --> IP --> DP2 --> CS
SB --> DP3 --> CS
CS --> CP --> DP5
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class DP1,DP2,DP3,DP4,DP5,IP,CS,MP,SB box;
class SU hub;
class CP done;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 10,
  source: 5,
  note: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    "ベストプラクティス": 10,
  },
  source: {
    "ソース": 5,
  },
  note: {
    "補足(V6→V7での構造変化)": 1,
    "補足(用語の変遷とV7での新設)": 1,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/prince2-7-foundation-guide.vue",
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
  seoTitleFragments: ["PRINCE2", "Foundation", "Version 7"],
  seoTitle: "PRINCE2® Project Management Foundation (Version 7) 完全ガイド | PeopleCert公式資格対応",
  seoDescription:
    "PeopleCert PRINCE2 Project Management Foundation (Version 7) の出題範囲を、7つの原則・7つのプラクティス・7つのプロセス・役割と責任・People・デジタル&データマネジメント・サステナビリティまで初学者向けに解説する学習ガイド。",
  allowedHeadingSkips: ["h2 -> h4"],
});

const mountPage = createMountPage(Page);

describe("pages/prince2-7-foundation-guide.vue (固有契約)", () => {
  it("Hero の lede テキストが原本と一致する", () => {
    const wrapper = mountPage();
    const lede = wrapper.find(".hero-lede");
    expect(lede.exists()).toBe(true);
    expect(lede.text().replace(/\s+/g, " ")).toContain("本ガイドは初学者が「なぜそうするのか」を理解しながら");
  });

  it("4つの stat-card が正しい数値とラベルで描画される", () => {
    const wrapper = mountPage();
    const cards = wrapper.findAll(".stat-card");
    expect(cards).toHaveLength(4);
    const pairs = cards.map((c) => ({
      num: c.find(".stat-number").text().trim(),
      label: c.find(".stat-label").text().trim(),
    }));
    expect(pairs).toEqual([
      { num: "60問", label: "選択式(Multiple Choice)" },
      { num: "60分", label: "試験時間・Closed book" },
      { num: "60%", label: "合格基準(36/60問正解)" },
      { num: "14言語", label: "対応言語(日本語を含む)" },
    ]);
  });

  it("13個のテーブルがすべて table-wrap で包まれ描画される", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(13);
    const wrappedTables = wrapper.findAll(".table-wrap table");
    expect(wrappedTables).toHaveLength(13);
  });

  it("商標・免責フッターが存在する", () => {
    const wrapper = mountPage();
    const footer = wrapper.find("footer");
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain("PRINCE2®はPeopleCert groupの登録商標です");
  });

  it("参考文献・出典(URL)（Section 14）に出典一覧（12件）が存在する", () => {
    const wrapper = mountPage();
    const refItems = wrapper.findAll(".ref-list li");
    expect(refItems).toHaveLength(12);
  });

  // 原則③の公式名は Version 7 で "Define roles, responsibilities and relationships" に改められた。
  // 原本 HTML は旧称「明確な役割と責任」のままのため、この差分は原本照合監査の対象外（正当な差分）。
  it("原則③の名称が Version 7 の「役割・責任・関係性の定義」に統一されている", () => {
    const wrapper = mountPage();
    expect(wrapper.text()).not.toContain("明確な役割と責任");
    const principle3 = wrapper.findAll("strong").filter((el) => el.text().startsWith("③"));
    // ③ は原則（SECTION 04）とプロセス（SECTION 07）の 2 か所に現れる
    expect(principle3.map((el) => el.text())).toEqual([
      "③ 役割・責任・関係性の定義",
      "③ Initiating a Project (IP)",
    ]);
    expect(wrapper.text()).toContain("PRINCE2の原則③「役割・責任・関係性の定義」を具体化したのがこの組織構造です。");
    const organizingRow = wrapper
      .findAll("tr")
      .find((tr) => tr.findAll("td")[0]?.text() === "Organizing");
    expect(organizingRow?.findAll("td").map((td) => td.text())).toEqual([
      "Organizing",
      "役割・責任・関係性の定義",
      "SU, IP",
    ]);
  });

  // 「Tailor to suit the project environment」→「Tailor to suit the project」は 2009 年版→2017 年版（V6）の改称であり、
  // V6→V7 の変化ではない。原本 HTML はこの例を含むため、この差分は原本照合監査の対象外（正当な差分）。
  it("V6→V7 の補足 callout が V6 以前の改称を V7 の変化として挙げない", () => {
    const wrapper = mountPage();
    const note = wrapper
      .findAll('[data-variant="note"]')
      .find((el) => el.text().includes("V6→V7での構造変化"));
    expect(note?.text()).not.toContain("Tailor to suit the project environment");
    expect(note?.text()).toContain(
      "原則の名称は一部改められました(例:「Defined roles and responsibilities」→「Define roles, responsibilities and relationships」)。",
    );
  });

  // 受け入れ基準はプロジェクト・プロダクト・ディスクリプションの構成要素であり、個々のプロダクト・ディスクリプションは
  // 品質基準・品質許容度・品質方法などの品質仕様を持つ。原本 HTML は両者を混同しているため、この差分は原本照合監査の対象外（正当な差分）。
  it("受け入れ基準をプロジェクト・プロダクト・ディスクリプションの手順に置き、個々のプロダクト・ディスクリプションは品質仕様として記述する", () => {
    const wrapper = mountPage();
    const items = wrapper.findAll("li").map((el) => el.text());
    expect(items).toContain("プロジェクト・プロダクト・ディスクリプションの作成(顧客の品質期待・受け入れ基準を含む)");
    expect(items).toContain("プロダクト・ディスクリプションの作成(各プロダクトの品質基準・品質許容度・品質方法などの品質仕様を含む)");
    expect(items).not.toContain("プロダクト・ディスクリプションの作成(品質基準・受け入れ基準を含む)");
  });

  // Problem と Concern は Version 7 では別個の課題種別であり、性質も異なる（即時の悪影響 / 時期と影響の評価が必要）。
  // 原本 HTML は「Problem/Concern」を 1 行に束ねているため、この差分は原本照合監査の対象外（正当な差分）。
  it("課題の種類の表で Problem と Concern を別行に分けて記述する", () => {
    const wrapper = mountPage();
    const rows = wrapper.findAll("tr").map((tr) => tr.findAll("td").map((td) => td.text()));
    expect(rows).toContainEqual(["Problem(問題)", "プロジェクトに即座に悪影響を及ぼす、対応が必要な事象"]);
    expect(rows).toContainEqual(["Concern(懸念)", "発生時期と影響の大きさを評価する必要がある事象"]);
    expect(rows.some((cells) => cells[0] === "Problem/Concern(問題・懸念)")).toBe(false);
  });

  // prince2.wiki/principles/... は原則③のページであり Organizing プラクティスではない。
  // 原本 HTML はラベルを「Organizing プラクティス」としているため、この差分は原本照合監査の対象外（正当な差分）。
  it("参考文献で Define roles, responsibilities and relationships を原則として表記する", () => {
    const wrapper = mountPage();
    const ref = wrapper
      .findAll(".ref-list li")
      .find((li) => li.find("a").attributes("href") === "https://prince2.wiki/principles/define-roles-responsibilities-and-relationships/");
    expect(ref?.find(".ref-name").text()).toBe("原則③ — Define roles, responsibilities and relationships(prince2.wiki)");
  });
});
