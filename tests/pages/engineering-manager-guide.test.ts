// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/engineering-manager-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "エンジニアリングマネージャー入門完全ガイド",
] as const;

const EXPECTED_H2 = [
  "エンジニアリングマネージャーとは何か",
  "最初の90日間 — 新任マネージャーのスタートダッシュ",
  "自己管理 — マネージャーとしての自分を整える",
  "1on1ミーティングの技術",
  "フィードバックとコーチング",
  "委任(デリゲーション)の技術",
  "心理的安全性とチームビルディング",
  "パフォーマンス評価とキャリアラダー",
  "採用と面接",
  "チームの生産性を測る(DORA & SPACE)",
  "AI時代のエンジニアリングマネジメント(2026年最新動向)",
  "リモート/ハイブリッドチームのマネジメント",
  "まとめ:ベストプラクティス・チェックリスト",
  "参考文献・情報源一覧",
] as const;

// 参考文献セクションの h4 4 件を a11y 基準（Q-3）に従い h3 に昇格させ全 34 件
const EXPECTED_H3 = [
  "なぜ「優れたエンジニア」がそのまま「優れたマネージャー」にはならないのか",
  "エンジニアリングマネージャーの役割の全体像",
  "マネージャーの仕事を5つの領域で捉える",
  "「忙しい」と「生産的」は別物",
  "自己管理の実践ポイント",
  "1on1は「ステータス報告」ではない",
  "1on1の準備と運営",
  "なぜ1on1が「予防保全」なのか",
  "フィードバックの黄金式:Observation → Impact → Request",
  "マネジメントの4つの帽子:メンタリング/コーチング/スポンサリング/フィードバック",
  "Radical Candor(徹底したフィードバック)",
  "なぜ委任が必要なのか",
  "状況的リーダーシップと委任の7段階",
  "委任のステップ",
  "Googleの「Project Oxygen」と「Project Aristotle」",
  "心理的安全性とは何か(Amy Edmondson)",
  "BICEPS:人が仕事で持つ6つの核心的ニーズ",
  "デュアルラダー(Dual Ladder)という考え方",
  "パフォーマンスレビューのプロセス",
  "キャリブレーション(評価の目線合わせ)がなぜ重要か",
  "構造化面接(Structured Interviewing)",
  "構造化面接を実践するステップ",
  "James Stanierが挙げる採用の基本姿勢",
  "DORAメトリクス",
  "SPACEフレームワーク",
  "DORAとSPACEをどう組み合わせるか",
  "「プレイヤーコーチ」モデルへの回帰",
  "なぜこの変化が起きているのか",
  "マネージャーが押さえておくべき実務上の変化",
  "リモート/ハイブリッドチームで意識すべきポイント",
  "書籍",
  "著名な実践者のブログ・ニュースレター",
  "企業・研究機関の一次情報",
  "実務ガイド・2026年動向",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["ソフトウェアエンジニア"] --> B["テックリード"]
    B --> C["エンジニアリングマネージャー"]
    C --> D["シニアマネージャー"]
    D --> E["ディレクター"]
    E --> F["VPエンジニアリング"]
    F --> G["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,D,E,F,G box;
    class C hub;`,
  `flowchart TB
    W1["第1週 傾聴とスナップショット作成"] --> W2["〜30日 信頼構築と1on1の開始"]
    W2 --> W3["〜60日 チーム構造とプロセスの見直し"]
    W3 --> W4["〜90日 最初のビジョンとアクションプランの提示"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class W1,W2,W3 box;
    class W4 done;`,
  `flowchart TB
    Q["「調子はどう？」と尋ねる"] --> A{回答の性質を見極める}
    A -->|淡々とした状況報告| U["Update 更新 手短に確認して次へ"]
    A -->|不満や苛立ちの表出| V["Vent 発散 解決しようとせず ただ聴き切る"]
    A -->|重く沈黙がちな様子| D["Disaster 危機 最優先で向き合い 感情に寄り添う"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Q,U,V,D box;
    class A hub;`,
  `flowchart LR
    O["Observation 観察した具体的な事実"] --> I["Impact それがもたらした影響"]
    I --> R["Request 次に期待する具体的な行動"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class O,I box;
    class R done;`,
  `flowchart TB
    L1["Lv1 指示する Tell マネージャーがすべて決めて伝える"] --> L2["Lv2 説得する Sell 理由を説明したうえで指示する"]
    L2 --> L3["Lv3 相談する Consult 意見を聞いたうえでマネージャーが決める"]
    L3 --> L4["Lv4 合意する Agree 話し合いのうえ全員で合意して決める"]
    L4 --> L5["Lv5 助言する Advise 助言はするが決定権は相手に渡す"]
    L5 --> L6["Lv6 尋ねる Inquire 相手が決めて実行し 事後に報告を受ける"]
    L6 --> L7["Lv7 完全委任 Delegate 相手にすべてを委ね 報告も求めない"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class L1,L2,L3,L4,L5,L6 box;
    class L7 done;`,
  `flowchart TB
    PS["心理的安全性 Psychological Safety"] --> D1["相互信頼 Dependability"]
    PS --> D2["構造と明確さ Structure and Clarity"]
    PS --> D3["仕事の意味 Meaning"]
    PS --> D4["インパクト Impact"]
    D1 --> R["チームの効果性"]
    D2 --> R
    D3 --> R
    D4 --> R

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class D1,D2,D3,D4 box;
    class PS hub;
    class R done;`,
  `flowchart TB
    A["自己評価の記入"] --> B["マネージャーによる一次評価の作成"]
    B --> C["エビデンス収集 プロジェクト実績 ピアフィードバック"]
    C --> D["キャリブレーション会議 他のマネージャーと評価基準をすり合わせる"]
    D --> E["評価の確定"]
    E --> F["本人へのフィードバック面談"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,E box;
    class D hub;
    class F done;`,
  `flowchart LR
    DORA["DORAメトリクス シグナル 今どうなっているか"] --> SPACE["SPACEフレームワーク 診断 なぜ 何を改善すべきか"]
    SPACE --> ACTION["具体的な改善アクション"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class DORA,SPACE box;
    class ACTION done;`,
  `flowchart TB
    Old["これまでのEM像 コードから離れマネジメントに専念"] --> New["2026年のEM像 プレイヤーコーチ型"]
    New --> C1["週に数時間のハンズオン開発"]
    New --> C2["アーキテクチャ判断への直接関与"]
    New --> C3["AIエージェントの成果物のレビューと監督"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Old box;
    class New hub;
    class C1,C2,C3 box;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/",
  "https://blog.pragmaticengineer.com/checklist-for-first-time-managers/",
  "https://www.runn.io/blog/the-managers-path-summary",
  "https://randsinrepose.com/archives/the-update-the-vent-and-the-disaster/",
  "https://larahogan.me/management/",
  "https://resilient-management.com/",
  "https://www.radicalcandor.com/our-approach",
  "https://management30.com/empower-teams/delegation-empowerment/",
  "https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers",
  "https://hbr.org/2013/12/how-google-sold-its-engineers-on-management",
  "https://en.wikipedia.org/wiki/Amy_Edmondson",
  "https://larahogan.me/blog/predictability-stability-terrible-times/",
  "https://www.cultureamp.com/blog/performance-review-calibrations",
  "https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices",
  "https://newsletter.pragmaticengineer.com/p/developer-productivity-a-new-framework",
  "https://space-framework.com/",
  "https://leaddev.com/management/engineering-managers-are-back-in-the-codebase",
  "https://www.lennysnewsletter.com/p/engineering-leadership-camille-fournier",
  "https://lethain.com/",
  "https://lethain.com/good-eng-mgmt-is-a-fad/",
  "https://lethain.com/managing-staff-plus-engineers/",
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-em",
  "first-90-days",
  "self-management",
  "one-on-ones",
  "feedback-coaching",
  "delegation",
  "psychological-safety",
  "performance-review",
  "hiring-interviews",
  "measuring-productivity",
  "ai-era-management",
  "remote-hybrid",
  "summary-checklist",
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

/** 原本の `.callout.<variant>` の出現数。variant 名は原本のクラス名をそのまま使う。 */
const EXPECTED_CALLOUT_VARIANTS = { note: 1, source: 12, practice: 2 } as const;

const EXPECTED_CALLOUT_LABELS = ["補足", "ソース", "ベストプラクティス"] as const;

const EXPECTED_STEP_TAGS = [
  "1", "2", "3", "4",
] as const;

defineSourceParityContract({
  suiteName: "pages/engineering-manager-guide.vue",
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
  seoTitleFragments: ["エンジニアリングマネージャー"],
});
