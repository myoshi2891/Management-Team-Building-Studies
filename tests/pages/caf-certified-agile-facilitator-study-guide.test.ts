// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/caf-certified-agile-facilitator-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Agile Facilitator(CAF)学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "1. CAFとは何か(資格概要)",
  "2. ファシリテーションの定義",
  "3. 誰がCAFを学ぶべきか",
  "4. CAFの5つの学習目標を深掘りする",
  "5. 中立性の原則:コンテンツとプロセスの分離",
  "6. グループ発達モデル:Tuckmanの5段階",
  "7. 心理的安全性:ファシリテーションの土台",
  "8. 参加型意思決定モデル:Diamond of Participation",
  "9. 対立(コンフリクト)を通したファシリテーション",
  "10. リモート/バーチャルファシリテーション",
  "11. イベントの前・最中・後:ファシリテーターの実務フロー",
  "12. ファシリテーション技法ツールボックス",
  "13. アジャイルにおけるファシリテーター:隣接ロールとの違い",
  "14. ベストプラクティス総まとめ表",
  "15. 認定パスと関連リソース",
  "16. 参考文献・出典一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 コースの特徴(公式FAQより)",
  "1.2 名称に関する補足(重要)",
  "2.1 Scrum Allianceの定義",
  "2.2 Roger Schwarzの定義(学術的に最も引用される定義の一つ)",
  "4.1 学習目標1:ファシリテーターとは何か、何をするかを知る",
  "4.2 学習目標2:中立なファシリテーターのマインドセットを実践する",
  "4.3 学習目標3:対立を通してチームをファシリテートする方法を学ぶ",
  "4.4 学習目標4:異なるチームのニーズを理解する",
  "4.5 学習目標5:イベントの前・最中・後にスキルセットを適用する",
  "5.1 中立性がないとどうなるか",
  "9.1 対立を「行き詰まり」で終わらせないための基本姿勢",
  "9.2 対立を扱うための具体的な足場(Roger Schwarzのグラウンドルール的アプローチ)",
  "11.1 各フェーズのチェックリスト",
  "12.1 Liberating Structuresの10原則",
  "Scrum Alliance 公式ソース",
  "学術・専門文献",
  "専門機関・団体",
  "二次的な解説記事(一次資料の裏付けとして)",
] as const;

const EXPECTED_H4 = [
  "Before(事前)",
  "During(実施中)",
  "After(事後)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["ファシリテーターの3条件 Schwarz 1994"] --> B["1 中立である substantively neutral"]
    A --> C["2 意思決定権を持たない no decision-making authority"]
    A --> D["3 全メンバーに受け入れられている acceptable to all members"]
    B --> E["結果ではなくプロセスに責任を持つ"]
    C --> E
    D --> E`,
  `flowchart LR
    subgraph ROLE["CAFが役立つロール"]
        direction TB
        SM["スクラムマスター"]
        PO["プロダクトオーナー"]
        DEV["開発チームメンバー"]
        LEAD["チームリーダー"]
        COACH["アジャイルコーチ 現役 志望"]
        CONS["アジャイルコンサルタント"]
        PF["プロフェッショナルファシリテーター"]
    end
    ROLE --> OUT["共通のゴール 会議 ワークショップ 意思決定の場を機能させる"]`,
  `flowchart LR
    A["1 ファシリテーターとは何かを知る"] --> B["2 中立なマインドセットを実践"]
    B --> C["3 対立を通してチームを導く"]
    C --> D["4 チームごとのニーズを理解する"]
    D --> E["5 前 中 後でスキルセットを適用"]
    E -.->|"継続的改善"| A`,
  `flowchart TB
    subgraph CONTENT["コンテンツ 中身"]
        C1["議題そのもの"]
        C2["提案される解決策"]
        C3["最終的な意思決定の内容"]
    end
    subgraph PROCESS["プロセス 進め方"]
        P1["議論の順番と構造"]
        P2["発言機会の分配"]
        P3["対立の扱い方"]
        P4["合意形成の手法"]
    end
    TEAM["チーム 参加者"] -->|"専門家として責任を持つ"| CONTENT
    FAC["ファシリテーター"] -->|"専門家として責任を持つ"| PROCESS
    FAC -.->|"介入しない 中立"| CONTENT`,
  `flowchart LR
    F["1 Forming 形成期"] --> S["2 Storming 混乱期"]
    S --> N["3 Norming 統一期"]
    N --> P["4 Performing 機能期"]
    P --> A["5 Adjourning 散会期"]
    S -.->|"新メンバー参加や大きな変化で逆戻り"| F`,
  `flowchart TB
    PS["心理的安全性が高い場"] --> Q1["質問できる"]
    PS --> Q2["懸念を言える"]
    PS --> Q3["ミスを認められる"]
    PS --> Q4["新しいアイデアを出せる"]
    Q1 --> OUT["学習 イノベーション 率直な意思決定"]
    Q2 --> OUT
    Q3 --> OUT
    Q4 --> OUT`,
  `flowchart TB
    T["トピック提示"] --> D["Divergent Zone 発散ゾーン アイデアと視点を広げる"]
    D --> G["Groan Zone うめきゾーン 混乱と対立が最も高まる"]
    G --> C["Convergent Zone 収束ゾーン 選択肢を絞り込む"]
    C --> DP["Decision Point 意思決定"]
    DP --> CL["Closure 合意事項の実行"]`,
  `flowchart LR
    CONF["対立の発生"] --> BAD["ファシリテーターが介入しない 避ける"]
    CONF --> GOOD["ファシリテーターがプロセスで受け止める"]
    BAD --> IMP["Impasse 行き詰まり"]
    GOOD --> WELL["Well-considered decision よく検討された意思決定"]`,
  `flowchart TB
    subgraph BEFORE["事前"]
        B1["少人数に分割設計"]
        B2["技術トラブルのPlan B"]
        B3["期待値 マナー の共有"]
    end
    subgraph DURING["実施中"]
        D1["ブレイクアウト活用"]
        D2["NOSTUESOで発言を分配"]
        D3["45分ごとに休憩"]
        D4["最初の5分で発言を促す"]
    end
    subgraph AFTER["事後"]
        A1["パラフレーズで理解を確認"]
        A2["心理的安全な作業合意を更新"]
    end
    BEFORE --> DURING --> AFTER`,
  `flowchart LR
    subgraph PRE["Before 事前設計"]
        P1["目的とゴールの明確化"]
        P2["参加者と人数の設計"]
        P3["アジェンダとタイムボックス"]
        P4["ツールと場の準備"]
        P5["グラウンドルールの下書き"]
    end
    subgraph LIVE["During 実施"]
        L1["目的とグラウンドルールの共有"]
        L2["発散からうめきを経て収束へ誘導"]
        L3["中立性の維持"]
        L4["対立をプロセスで受け止める"]
        L5["時間管理"]
    end
    subgraph POST["After 事後"]
        A1["決定事項とアクションの確認"]
        A2["参加者からのフィードバック収集"]
        A3["自己の振り返り 何を改善するか"]
        A4["次回への申し送り"]
    end
    PRE --> LIVE --> POST
    POST -.->|"継続的改善"| PRE`,
  `flowchart TB
    subgraph TOOLBOX["ファシリテーション技法ツールボックス"]
        direction LR
        ORID["ORID 振り返り"]
        LS["Liberating Structures 発言の分配"]
        DIA["Diamond of Participation 意思決定"]
        GR["Ground Rules 対立予防"]
    end
    PHASE1["発散フェーズ"] --> LS
    PHASE1 --> ORID
    PHASE2["うめき 対立フェーズ"] --> GR
    PHASE2 --> DIA
    PHASE3["収束フェーズ"] --> DIA`,
  `flowchart TB
    subgraph STANCE["アジャイルコーチの4つのスタンス Adkins and Spayd Agile Coaching Institute"]
        FAC["Facilitating ファシリテーション プロセスを支援 中立"]
        TEACH["Teaching ティーチング 知識を教える"]
        MENT["Mentoring メンタリング 経験を伝える"]
        COACH["Coaching コーチング 本人の気づきを引き出す"]
    end
    FAC -->|"意思決定権 持たない"| N1["中立"]
    TEACH -->|"専門知識を提供"| N2["答えを教える"]
    MENT -->|"助言を提供"| N3["経験を共有"]
    COACH -->|"問いを投げる"| N4["本人に気づかせる"]`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/certified-agile-facilitator",
  "https://resources.scrumalliance.org/article/facilitation-skills-important",
  "https://digitalcommons.usu.edu/advance/257",
  "https://drive.google.com/file/d/1sOGykvoYGYJIxtuV6WwHGUW8CRe6RUH0/view",
  "https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development",
  "https://www.hbs.edu/faculty/Pages/profile.aspx?facId=6451",
  "https://resources.scrumalliance.org/article/10-tips-for-hosting-fun-effective-virtual-meetings",
  "https://www.infoq.com/articles/facilitators-guide-book-review/",
  "https://en.wikipedia.org/wiki/Gradients_of_agreement_scale",
  "https://www.canr.msu.edu/news/gradients_of_agreement_can_help_move_groups_forward",
  "https://aese.psu.edu/research/centers/cecd/engagement-toolbox/facilitation/facilitation-tools/tools-and-strategies",
  "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6518626/",
  "https://www.liberatingstructures.com/",
  "https://www.iaf-world.org/",
  "https://www.infoq.com/agile_techniques/interviews/72",
  "https://www.scrumalliance.org/courses-events/search?ctyp=AcsCf",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://resources.scrumalliance.org/video/remote-facilitation",
  "https://resources.scrumalliance.org/webinar/webinar-stop-facilitating-worlds-boring-meetings",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "what-is-caf",
  "facilitation-definition",
  "who-should-take-caf",
  "five-learning-objectives",
  "neutrality-principle",
  "tuckman-model",
  "psychological-safety",
  "diamond-of-participation",
  "facilitating-through-conflict",
  "remote-facilitation",
  "before-during-after",
  "facilitation-toolbox",
  "facilitator-vs-adjacent-roles",
  "best-practices-summary",
  "certification-path-resources",
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
  "SECTION 16",
  "SECTION 17",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 8,
  practice: 14,
  source: 15,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    "補足": 8,
  },
  practice: {
    "ベストプラクティス": 13,
    "ベストプラクティス(NOSTUESOルールの詳細)": 1,
  },
  source: {
    "ソース": 15,
  },
} as const;

defineSourceParityContract({
  suiteName: "pages/caf-certified-agile-facilitator-study-guide.vue",
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
  stepTags: [],
  seoTitleFragments: ["Certified Agile Facilitator", "CAF", "完全ガイド"],
  seoTitle: "Certified Agile Facilitator(CAF)認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  seoDescription:
    "Scrum Alliance Certified Agile Facilitator(CAF)を初学者向けに解説する非公式学習ガイド。5つの学習目標、中立性の原則、Tuckmanモデル、心理的安全性、Diamond of Participationなどを図解とベストプラクティスつきで詳しく解説します。",
});

describe("pages/caf-certified-agile-facilitator-study-guide.vue — 個別要素契約", () => {
  const mountPage = createMountPage(Page);

  it("テーブルが 11 件存在し、すべて .table-wrap で包まれている", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(11);
    const wrappedTables = wrapper.findAll(".table-wrap table");
    expect(wrappedTables).toHaveLength(11);
  });
});
