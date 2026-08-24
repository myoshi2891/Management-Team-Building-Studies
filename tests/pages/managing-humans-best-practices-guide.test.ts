// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/managing-humans-best-practices-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "『Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager』完全ガイド",
] as const;

const EXPECTED_H2 = [
  "この本の基本情報",
  "なぜこの本が読まれ続けているのか(国際的な評価)",
  "本書全体の構成マップ",
  "Part I: The Management Quiver(マネジメントの矢筒)を学ぶ",
  "Part II: The Process is the Product(プロセスこそが成果物)を学ぶ",
  "Part III: Versions of You(変容していくあなた)を学ぶ",
  "初心者マネージャーのための実践ステップバイステップまとめ",
  "よくある落とし穴(アンチパターン)",
  "併読をおすすめする関連書籍",
  "まとめ",
  "参考文献・情報源(URL一覧)",
] as const;

const EXPECTED_H3 = [
  "版の変遷",
  "主要章と実践ポイント一覧",
  "ステップ実践: 健全な1on1の進め方",
  "ステップ実践: 会議をレフェリーとして進行する",
  "ステップ実践: トップダウンの意思決定(Mandate)を通す",
  "Stables(安定志向型)とVolatiles(変革志向型)",
  "主要章と実践ポイント一覧",
  "「1.0」における優先順位ピラミッド",
  "ステップ実践: 危機対応(When the Sky Falls)",
  "「Bored People Quit(退屈な人は辞める)」から学ぶ実践",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `graph TD
    A["Managing Humans 第4版"] --> B["Part I The Management Quiver マネジメントの矢筒"]
    A --> C["Part II The Process is the Product プロセスこそが成果物"]
    A --> D["Part III Versions of You 変容していくあなた"]

    B --> B1["人としての向き合い方 Don't Be a Prick / Managers Are Not Evil"]
    B --> B2["1on1・会議・意思決定の型 Update/Vent/Disaster / Mandate"]
    B --> B3["情報共有とオフサイト運営"]

    C --> C1["1.0優先順位ピラミッド Pitch > People > Process > Product"]
    C --> C2["危機対応フロー When the Sky Falls"]
    C --> C3["思考時間の確保 / プロセスの意義"]

    D --> D1["キャリアパスと多様な人材類型"]
    D --> D2["ストレス管理・インクルーシブな運営"]
    D --> D3["退屈させない・チームを飽きさせない工夫"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,B1,B2,B3,C1,C2,C3,D1,D2,D3 box;`,
  `flowchart TD
    S["1on1を開始する 『調子はどう?』とあえて曖昧に尋ねる"] --> L["相手の話に耳を傾ける"]
    L --> J{"どのタイプの話か"}
    J -->|"アップデート型 業務報告寄り"| U["深掘りする質問をして 単なる進捗確認で終わらせない"]
    J -->|"ベント型 愚痴・不満"| V["解決策を提示せず 最後まで聞き切ることに徹する"]
    J -->|"ディザスター型 感情的な訴え"| D["感情に反応せず 静かに時間を与えて落ち着かせる"]
    U --> F["次回の1on1でフォローアップする"]
    V --> F
    D --> F

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S hub;
    class L,J,U,V,D box;
    class F done;`,
  `flowchart TD
    M1["会議の目的を明確にする"] --> M2{"アラインメント会議か クリエイティブ会議か"}
    M2 -->|"アラインメント"| M3["アジェンダに沿って淡々と進行する"]
    M2 -->|"クリエイティブ"| M4["発散的な議論を許容しつつ着地点を探る"]
    M3 --> M5["参加者の集中度を観察する"]
    M4 --> M5
    M5 --> M6{"議論から離脱している人はいるか"}
    M6 -->|"いる"| M7["質問を投げかけ再エンゲージさせる"]
    M6 -->|"いない"| M8["議論を続ける"]
    M7 --> M9["結論とネクストアクションを明文化して終了する"]
    M8 --> M9

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class M1 hub;
    class M2,M3,M4,M5,M6,M7,M8 box;
    class M9 done;`,
  `flowchart LR
    D1["①Decide 議論が非生産的になったら決定を下す"] --> D2["②Deliver 決定事項を明確かつ毅然と伝える"]
    D2 --> D3["③Deliver Again 個別に理由を説明し反応を受け止める"]
    D3 --> D4["反対意見のガス抜きを許容する"]
    D4 --> D5["チーム全体が前に進む"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class D1 hub;
    class D2,D3,D4 box;
    class D5 done;`,
  `flowchart LR
    V1["Volatile: リスクを取り破壊的に行動する"] --> V2["1.0リリースを成功させる"]
    V2 --> V3["経験を積み プロセスを整備してStableへ移行"]
    V3 --> V4["自分に似た人材を採用する"]
    V4 --> V5["その中から新たなVolatileが生まれる"]
    V5 --> V1

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class V1 hub;
    class V2,V3,V4,V5 box;`,
  `flowchart TD
    C1["異常事態を検知する"] --> C2["War Room 対策拠点を招集する"]
    C2 --> C3["情報収集の幅を優先し、仮の理論を組み立てる"]
    C3 --> C4["直接関与していない第三者3名以上に 仮説を検証してもらう"]
    C4 --> C5["ホワイトボードにタスクと担当者を明記する"]
    C5 --> C6["進捗を社内へ継続的に発信し続ける"]
    C6 --> C7{"根本原因は解決したか"}
    C7 -->|"いいえ"| C3
    C7 -->|"はい"| C8["振り返りを行い再発防止策を残す"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class C1 hub;
    class C2,C3,C4,C5,C6,C7 box;
    class C8 done;`,
  `flowchart TD
    S1["Step 1 週次1on1を全メンバーに設定する"] --> S2["Step 2 会議にアジェンダとレフェリー役を導入する"]
    S2 --> S3["Step 3 チーム内のStable/Volatileのバランスを観察する"]
    S3 --> S4["Step 4 意思決定にDecide→Deliver→Deliver Againを使う"]
    S4 --> S5["Step 5 有益無益を問わず情報を流し続ける習慣をつける"]
    S5 --> S6["Step 6 危機発生時はWar Room方式で対応する"]
    S6 --> S7["Step 7 コードやプロダクトから完全に離れない"]
    S7 --> S8["Step 8 『ノー』と言える文化と多様なキャリアパスを整える"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5,S6,S7 box;
    class S8 done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://randsinrepose.com/",
  "https://www.oreilly.com/library/view/managing-humans-more/9781484271162/",
  "https://link.springer.com/book/10.1007/978-1-4842-7116-2",
  "https://blog.pragmaticengineer.com/holiday-tech-book-recommendations/",
  "https://dev.to/rachelsoderberg/book-review-managing-humans-by-michael-lopp-11fo",
  "https://horia141.com/book_reviews/2022-08-08-managing-humans-review",
  "https://github.com/mgp/book-notes/blob/master/managing-humans.markdown",
  "https://github.com/charlax/engineering-management",
  "https://news.ycombinator.com/item?id=21508140",
  "https://www.goodreads.com/book/show/1317946.Managing_Humans",
  "https://www.briansnotes.io/book/managing-humans/",
  "https://randsinrepose.com/archives/managing-humans-4th-edition/",
  "https://www.goodreads.com/book/show/58153385",
  "https://randsinrepose.com/books/",
  "https://link.springer.com/book/10.1007/978-1-4302-0271-4",
  "https://randsinrepose.com/archives/managing-humans-third-edition/",
  "https://github.com/skyzyx/managing-humans",
  "https://www.thriftbooks.com/w/managing-humans-biting-and-humorous-tales-of-a-software-engineering-manager_michael-lopp/399304/",
] as const;

const EXPECTED_TOC_IDS = [
  "book-info",
  "why-read",
  "structure-map",
  "part1-quiver",
  "part2-process",
  "part3-versions",
  "beginner-steps",
  "pitfalls",
  "related-books",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 14,
  note: 1,
  practice: 5,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: {
    "出典": 14,
  },
  note: {
    "補足": 1,
  },
  practice: {
    "実践のコツ": 5,
  },
} as const;

const EXPECTED_STEP_TAGS: readonly string[] = [
  "全メンバーと週次30分の1on1を固定枠で設定する",
  "すべての会議にアジェンダを用意し、進行役として時間を管理する",
  "誰が安定志向で誰が変革志向かを意識してタスクを割り振る",
  "議論が停滞したら「決める・伝える・個別に説明する」の順で決定する",
  "自分だけが知っている情報を溜め込まず共有する",
  "障害・炎上時はWar Roomを立て、役割分担と発信を徹底する",
  "開発環境に触れ続け、エンジニアの言葉で会話できる状態を保つ",
  "反対意見を歓迎し、役職に依存しない成長パスを用意する",
] as const;

defineSourceParityContract({
  suiteName: "pages/managing-humans-best-practices-guide.vue",
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
  seoTitleFragments: ["Managing Humans", "完全ガイド"],
  seoTitle: "Managing Humans 完全ガイド | ソフトウェアエンジニアリングマネージャーのためのベストプラクティス",
  seoDescription: "Michael Lopp著『Managing Humans』(第4版)を初心者向けに解説する実践ガイド。1on1、会議運営、意思決定、危機対応をMermaid図解とともに紹介します。",
});
