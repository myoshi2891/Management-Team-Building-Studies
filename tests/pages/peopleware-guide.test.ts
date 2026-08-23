// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/peopleware-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "『Peopleware: Productive Projects and Teams』完全ガイド",
] as const;

const EXPECTED_H2 = [
  "Peoplewareとは何か",
  "核心テーゼ: プロジェクトの問題は技術ではなく社会学である",
  "書籍全体の構成(6部39章)",
  "Part I: 人的資源のマネジメント",
  "Part II: オフィス環境とフロー状態",
  "Part III: 適切な人材",
  "Part IV: 生産的なチームを育てる",
  "Part V: 肥沃な土壌 (組織文化)",
  "Part VI: ここで働くのは楽しいはず",
  "実践ロードマップ: 7ステップで始めるPeopleware",
  "著名な開発者たちはどう語っているか",
  "批判的な視点・限界",
  "まとめ",
  "参考ソース (URL一覧)",
] as const;

const EXPECTED_H3 = [
  "各Partの主な章(第3版の目次より抜粋)",
  "チーズバーガー・マネジメントを避ける",
  "「時間さえあれば品質は上がる」という誤解 (Quality—If Time Permits)",
  "Parkinson's Law (パーキンソンの法則) は必ずしも成り立たない",
  "Laetrile (レートリル) — 効かない万能薬に注意",
  "フロー (Flow) とは何か",
  "「ファニチャー・ポリス (Furniture Police)」— 均一性という名の牢獄",
  "実証データ: Coding War Games",
  "必要な物理スペースの目安",
  "Bring Back the Door (ドアを取り戻せ)",
  "Hiring a Juggler (ジャグラーを雇う)",
  "リーダーシップの語り方",
  "離職の隠れたコスト (Happy to Be Here / Human Capital)",
  "ジェルしたチーム (Jelled Team) とは",
  "The Black Team (ブラックチーム) の逸話",
  "チーミサイド (Teamicide) — チームを殺す7つ (+2つ) の方法",
  "Competition (内部競争の弊害)",
  "A Spaghetti Dinner (スパゲッティ・ディナー)",
  "Chemistry for Team Formation (チーム形成の化学反応)",
  "The Self-Healing System (自己修復するシステム)",
  "Dancing with Risk (リスクと共に踊る)",
  "Meetings, Monologues, and Conversations (会議・独白・対話)",
  "E(vil) Mail (メールという名の悪魔)",
  "The Ultimate Management Sin (究極のマネジメントの罪)",
  "Organizational Learning (組織学習)",
  "Chaos and Order (混沌と秩序)",
  "Free Electrons (自由電子)",
  "Holgar Dansk (伝説の戦士ホルガー・ダンスク)",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["ソフトウェアプロジェクトが失敗する"]:::hub --> B{"原因をどこに求めるか"}
    B -->|"従来型の思い込み"| C["技術的要因を疑う 新しい言語・ツール・手法の導入"]
    B -->|"Peoplewareの主張"| D["社会学的要因を疑う 人間関係・職場環境・組織文化"]:::hub
    C --> E["効果は限定的 問題は再発しやすい"]
    D --> F["生産性・品質・定着率が 大きく改善しやすい"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class B,C,E box;`,
  `flowchart TB
    P1["Part I 人的資源のマネジメント 失敗の社会学的原因を診断する"]:::hub --> P2["Part II オフィス環境 フローを守る空間を設計する"]
    P2 --> P3["Part III 適切な人材 採用 リーダーシップ 定着"]
    P3 --> P4["Part IV 生産的なチームを育てる ジェリングとチーミサイド"]
    P4 --> P5["Part V 肥沃な土壌 会議 変化 組織学習"]
    P5 --> P6["Part VI ここで働くのは楽しいはず 秩序と自由裁量の両立"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class P2,P3,P4,P5 box;`,
  `flowchart TB
    A1["作業に没入し始める"] --> A2["電話 チャットや声かけで割り込まれる"]
    A2 --> A3["集中状態フローが中断する"]
    A3 --> A4["再没入まで平均15分前後を要する"]
    A4 --> A5["エラーが増え生産性が下がる"]
    A5 --> H1["環境を見直す"]:::hub
    H1 --> B1["静かで区切られた作業環境を用意する"]
    B1 --> B2["個室や高いパーティション 在席サインを設ける"]
    B2 --> B3["まとまった無割り込み時間を確保する"]
    B3 --> B4["フロー状態を維持できる"]
    B4 --> B5["高品質 高生産性 低いエラー率を実現する"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A1,A2,A3,A4,A5,B1,B2,B3,B4 box;`,
  `flowchart TB
    T0["マネージャーが陥りがちな行動"]:::hub --> T1["防衛的マネジメント 不信からの過干渉"]
    T1 --> T2["官僚主義 過剰な書類仕事"]
    T2 --> T3["物理的な分断 座席や拠点をバラバラに"]
    T3 --> T4["品質の妥協や見せかけの締切"]
    T4 --> T5["結果 チームは決してジェルしない"]
    T5 ~~~ J0["マネージャーが意識したい行動"]:::hub
    J0 --> J1["小さな成功体験を共有する"]
    J1 --> J2["適切な人選と裁量を与える"]
    J2 --> J3["結果に対する共同オーナーシップを育てる"]
    J3 --> J4["サーバントとしてチームを支援する"]
    J4 --> J5["結果 チームがジェルする"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1,T2,T3,T4,T5,J1,J2,J3,J4 box;`,
  `flowchart TB
    S1["ステップ1 失敗要因を人間面から棚卸しする"] --> S2["ステップ2 静かな作業環境とまとまった集中時間を確保する"]
    S2 --> S3["ステップ3 採用と配置を適性重視で行う"]
    S3 --> S4["ステップ4 会議とメールを最小化しフローの中断を減らす"]
    S4 --> S5["ステップ5 小さな成功体験でチームの化学反応を育てる"]
    S5 --> S6["ステップ6 チーミサイドの芽を早期に摘む"]
    S6 --> S7["ステップ7 継続的な振り返りで学習する組織文化を育てる"]
    S7 --> S8["生産的なプロジェクトとチーム"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1,S2,S3,S4,S5,S6,S7 box;`,
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-peopleware",
  "core-thesis",
  "book-structure",
  "part1-human-resource",
  "part2-office-environment",
  "part3-right-people",
  "part4-productive-teams",
  "part5-fertile-soil",
  "part6-fun-to-work-here",
  "action-roadmap",
  "developer-voices",
  "critiques-and-limits",
  "summary",
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
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/",
  "https://www.usnews.com/opinion/blogs/economic-intelligence/2013/04/19/how-office-space-affects-company-productivity",
  "https://fs.blog/increasing-the-productivity-of-computer-programmers-and-engineers/",
  "https://appliedframeworks.com/what-is-teamicide/",
  "https://thescrumacademy.com/2015/03/16/peopleware-productive-teams-and-projects-3rd-edition/",
  "https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/ch23.xhtml",
  "https://www.joelonsoftware.com/2003/09/24/bionic-office/",
  "https://www.joelonsoftware.com/2002/04/30/20020430/",
  "https://stackoverflow.blog/2015/01/16/why-we-still-believe-in-private-offices/",
  "https://calnewport.com/is-facebooks-massive-open-office-scaring-away-developers/",
  "https://en.wikipedia.org/wiki/Tim_Lister",
  "https://www.goodreads.com/book/show/67825.Peopleware",
  "https://en.wikipedia.org/wiki/Peopleware:_Productive_Projects_and_Teams",
  "https://en.wikipedia.org/wiki/Peopleware",
  "https://www.joelonsoftware.com/2006/09/07/a-field-guide-to-developers-2/",
] as const;

defineSourceParityContract({
  suiteName: "pages/peopleware-guide.vue",
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
  calloutVariants: {
    note: 2,
    practice: 11,
    source: 3,
  },
  calloutLabels: {
    note: {
      補足: 2,
    },
    practice: {
      ベストプラクティス: 11,
    },
    source: {
      ソース: 3,
    },
  },
  stepTags: [],
  seoTitleFragments: ["Peopleware", "完全ガイド"],
  seoTitle: "『Peopleware』完全ガイド | ソフトウェア開発チームのための実践知",
  seoDescription:
    "Tom DeMarcoとTim Listerの名著『Peopleware Productive Projects and Teams』を初学者向けにステップバイステップで解説。核心テーゼ、6部構成、チーミサイド、Coding War Gamesのデータ、著名開発者の言及までを図解と表で整理した実践ガイド。",
});
