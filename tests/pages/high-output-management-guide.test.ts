// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/high-output-management-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "HIGH OUTPUT MANAGEMENT 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに ― 著者アンディ・グローブとこの本について",
  "本書が「シリコンバレーのバイブル」と呼ばれる理由",
  "全体構造 ― 3つの柱",
  "ステップ1: 生産の基本原則を理解する ― 「朝食工場」モデル",
  "ステップ2: マネジャーの「アウトプット」を再定義する",
  "ステップ3: レバレッジ(テコの原理)に集中する",
  "ステップ4: ミーティングを「マネジメントの媒体」として使いこなす",
  "ステップ5: 意思決定と組織設計 ― ハイブリッド組織とグローブの法則",
  "ステップ6: OKR(目標と主要な結果)を実践する",
  "ステップ7: タスク別成熟度(TRM)でマネジメントスタイルを変える",
  "ステップ8: 人を育てる ― 訓練と動機付け",
  "ステップ9: 評価とパフォーマンスレビュー",
  "現代(2020年代後半)における意義",
  "実践チェックリスト",
  "まとめ",
  "参考文献",
] as const;

const EXPECTED_H3 = [
  "律速段階(限定ステップ)を見極める",
  "品質管理の考え方",
  "良い指標を持つ",
  "高レバレッジ活動の3分類",
  "会議の2分類",
  "1on1ミーティングを最大のレバレッジ源にする",
  "知識のパワーと地位のパワー",
  "ファンクショナル組織とミッション指向型組織",
  "グローブの法則",
  "OKRの系譜",
  "OKRの基本構造",
  "TRMに応じたマネジメントスタイル",
  "モチベーションと「運動場としての職場」",
  "著者・書籍の基本情報",
  "経営者・著名開発者による評価",
  "書評・要約ブログ",
  "OKRの歴史",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    ROOT["High Output Management 3つの柱"]
    ROOT --> P1["1 生産の原理 Production Principles"]
    ROOT --> P2["2 マネジャーのレバレッジ Managerial Leverage"]
    ROOT --> P3["3 チーム・個人のピークパフォーマンス Team and Peak Performance"]

    P1 --> P1a["朝食工場モデル"]
    P1 --> P1b["ボトルネックと品質管理"]
    P1 --> P1c["良い指標の設計"]
    P1a ~~~ P1b ~~~ P1c

    P2 --> P2a["アウトプット=自組織+影響組織の産出"]
    P2 --> P2b["高レバレッジ活動への集中"]
    P2 --> P2c["ミーティングという媒体の活用"]
    P2a ~~~ P2b ~~~ P2c

    P3 --> P3a["タスク別成熟度TRM"]
    P3 --> P3b["訓練と動機付け"]
    P3 --> P3c["評価とパフォーマンスレビュー"]
    P3a ~~~ P3b ~~~ P3c

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class ROOT hub;
    class P1,P2,P3,P1a,P1b,P1c,P2a,P2b,P2c,P3a,P3b,P3c box;`,
  `flowchart LR
    A["受注 卵・トースト・コーヒー"] --> B["律速段階を特定 ゆで卵=3分"]
    B --> C["他工程を律速段階に合わせて逆算 トースト・コーヒーの開始タイミング"]
    C --> D["中間検査 品質を工程内でチェック"]
    D --> E["同時提供 アウトプット"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D box;
    class E done;`,
  `flowchart TB
    L["マネジャーの活動"] --> POS["正のレバレッジ"]
    L --> NEG["負のレバレッジ"]

    POS --> POS1["質の高い1on1"]
    POS --> POS2["準備された研修"]
    POS --> POS3["的確な意思決定の共有"]
    POS1 ~~~ POS2 ~~~ POS3

    NEG --> NEG1["過度な介入 マイクロマネジメント"]
    NEG --> NEG2["準備不足の会議"]
    NEG --> NEG3["委任した仕事への不必要な差し戻し"]
    NEG1 ~~~ NEG2 ~~~ NEG3

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class L hub;
    class POS,POS1,POS2,POS3 done;
    class NEG,NEG1,NEG2,NEG3 box;`,
  `flowchart TB
    M["ミーティングを招集する"] --> Q{"目的は何か"}
    Q -->|"定例的な情報共有・関係構築"| PROC["プロセス指向型 例 1on1・定例会"]
    Q -->|"特定の課題解決・意思決定"| MISS["ミッション指向型 例 臨時の意思決定会議"]
    PROC --> PROC1["アジェンダは部下側が用意"]
    MISS --> MISS1["終了条件を明確にする"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class M,Q hub;
    class PROC,MISS,PROC1,MISS1 box;`,
  `flowchart TB
    F["ファンクショナル組織 専門性・規模の経済"]
    MI["ミッション指向型組織 俊敏性・現場適応力"]
    F --> H["ハイブリッド組織 グローブの法則"]
    MI --> H
    H --> D["デュアルレポーティング 機能軸とミッション軸の両方に報告"]
    D --> R["資源配分と対立解消が最重要のマネジメント課題になる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class F,MI box;
    class H hub;
    class D,R done;`,
  `flowchart TB
    D1["1954年 ピーター・ドラッカー 目標管理MBOを提唱"]
    D1 --> G["1970年代 アンディ・グローブ インテルでMBOを改良しiMBOとして導入 Operation Crushなどで活用"]
    G --> J["1975年 ジョン・ドーア インテル在籍中にグローブの研修でOKRを学ぶ"]
    J --> K["1980年 ドーア Kleiner Perkinsへ移籍"]
    K --> GO["1999年 ドーアがGoogle創業者ラリー・ペイジとセルゲイ・ブリンにOKRを紹介"]
    GO --> SP["2000年代以降 LinkedIn・Twitter・Airbnb・Dropbox等へ拡大"]
    SP --> B["2018年 ドーア著Measure What Mattersで世界的に普及"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class D1,G,J,K box;
    class GO hub;
    class SP,B done;`,
  `flowchart TB
    T1["TRMが低い 新しいタスクへの着手時"] --> S1["構造的・指示的スタイル 詳細な指示と密な進捗確認"]
    T2["TRMが中程度 基本を習得した段階"] --> S2["対話的スタイル 方針の共有と定期的なチェックイン"]
    T3["TRMが高い タスクに習熟した段階"] --> S3["委任的スタイル 最小限の監督で裁量を大きく渡す"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1,T2,T3 box;
    class S1 box;
    class S2 hub;
    class S3 done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://en.wikipedia.org/wiki/High_Output_Management",
  "https://en.wikipedia.org/wiki/Andrew_Grove",
  "https://californiamuseum.org/inductee/andrew-s-grove/",
  "https://computerhistory.org/blog/remembering-andy-s-grove/",
  "https://digitaldefynd.com/IQ/famous-berkeley-alumni/",
  "https://a16z.com/andy/",
  "https://theceolibrary.com/high-output-management-3809.html",
  "https://handbook.gitlab.com/handbook/leadership/high-output-management",
  "https://medium.com/@iantien/top-takeaways-from-andy-grove-s-high-output-management-2e0ecfb1ea63",
  "https://tyastunggal.com/p/high-output-management-by-andy-grove",
  "https://www.annashipman.co.uk/jfdi/high-output-management.html",
  "https://getlighthouse.com/blog/high-output-management/",
  "https://www.tability.io/odt/articles/a-complete-okr-history-from-intel-to-the-modern-workplace",
  "https://www.betterworks.com/magazine/keys-okr-success-qa-john-doerr",
  "https://hbr.org/2018/05/how-vc-john-doerr-sets-and-achieves-goals",
  "https://stripe.com/fr-be/guides/atlas/ama-john-doerr",
  "https://a16z.com/on-micromanagement/",
  "https://a16z.com/notes-on-leadership/",
  "https://tylerdevries.com/book-summaries/high-output-management/",
  "https://podcast.staffeng.com/season-1/will-larson-calm/",
  "https://blog.mocoso.co.uk/links/leadership/",
  "https://medium.com/software-is-eating-the-world/andy-37e10d4780bc",
  "https://jamesingold.com/books/high-output-management",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "why-praised",
  "three-pillars",
  "production-principles",
  "manager-output",
  "leverage",
  "meetings",
  "hybrid-org",
  "okr",
  "trm",
  "training",
  "performance-review",
  "modern-relevance",
  "checklist",
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
  "SECTION 15",
  "SECTION 16",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 8,
  note: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { "ソース": 8 },
  note: { "補足": 2 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "HIGH OUTPUT MANAGEMENT",
  "完全ガイド",
] as const;

const EXPECTED_SEO_TITLE =
  "HIGH OUTPUT MANAGEMENT 完全ガイド | 初学者のためのステップバイステップ実践入門";
const EXPECTED_SEO_DESCRIPTION =
  "アンディ・グローブ著『HIGH OUTPUT MANAGEMENT』を初学者向けに解説。朝食工場モデル、レバレッジ、OKR、タスク別成熟度(TRM)など主要概念をMermaid図と表でステップバイステップに整理し、参照ソースURLも掲載。";

defineSourceParityContract({
  suiteName: "pages/high-output-management-guide.vue",
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
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});

describe("pages/high-output-management-guide.vue — アクセシビリティ固有契約", () => {
  it("A-1: スキップリンクが存在し、main#main-content を指している", () => {
    const wrapper = createMountPage(Page)();
    const skipLink = wrapper.find("a.skip-link");
    expect(skipLink.exists()).toBe(true);
    expect(skipLink.attributes("href")).toBe("#main-content");
  });

  it("A-2: main 要素が id='main-content' を持つ", () => {
    const wrapper = createMountPage(Page)();
    const main = wrapper.find("main#main-content");
    expect(main.exists()).toBe(true);
  });
});
