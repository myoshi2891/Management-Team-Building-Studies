// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/team-geek-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Team Geek ― Googleのギークたちはいかにしてチームを作るのか",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "全体像を掴む: 6章の旅",
  "すべての土台となるHRT (謙虚さ・尊敬・信頼)",
  "第1章: 天才プログラマーという神話",
  "第2章: 最高のチーム文化を築く",
  "第3章: すべての船に船長が必要",
  "第4章: 有害な人々への対処",
  "第5章: 組織を操る技術",
  "第6章: ユーザーも人間である",
  "まとめ: 明日から使えるHRT実践チェックリスト",
  "続編・関連書籍",
  "参考文献・出典",
] as const;

// 参考文献セクションの h4 2 件を a11y 基準（Q-3）に従い h3 に昇格させ全 15 件
const EXPECTED_H3 = [
  "何が書かれているか",
  "実践ステップ",
  "何が書かれているか",
  "実践ステップ",
  "何が書かれているか",
  "実践ステップ",
  "何が書かれているか",
  "実践ステップ",
  "何が書かれているか",
  "実践ステップ",
  "何が書かれているか",
  "実践ステップ",
  "重要用語の再確認",
  "一次情報 ― O'Reilly公式ページ",
  "海外の著名開発者による書評・言及",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    C1["第1章 天才プログラマーという神話 個人の心構えを変える"] --> C2["第2章 最高のチーム文化を築く チームの土台をつくる"]
    C2 --> C3["第3章 すべての船に船長が必要 リーダーシップを発揮する"]
    C3 --> C4["第4章 有害な人々への対処 チームを防衛する"]
    C4 --> C5["第5章 組織を操る技術 組織の中でうまく動く"]
    C5 --> C6["第6章 ユーザーも人間である 社外との関係を築く"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class C1 hub;
    class C2,C3,C4,C5,C6 box;`,
  `flowchart LR
    H["謙虚さ Humility 自分は万能でも常に正しいわけでもないと認める"]
    R["尊敬 Respect 相手を一人の人間として心から気にかける"]
    T["信頼 Trust 相手の能力を信じハンドルを預ける"]
    H --> R --> T --> H
    H --> Culture["心理的に安全で生産的なチーム文化"]
    R --> Culture
    T --> Culture

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class H,R,T box;
    class Culture done;`,
  `flowchart TB
    Comm["チームのコミュニケーション設計"]
    Comm --> Sync["同期コミュニケーション"]
    Comm --> Async["非同期コミュニケーション"]
    Sync --> Meeting["効率的なミーティング 目的とアジェンダを明確に"]
    Sync --> Chat["オンラインチャット 雑談・即時の相談"]
    Async --> Mail["メーリングリスト 議論の記録を残す"]
    Async --> Doc["デザインドキュメント 設計を事前にレビュー"]
    Async --> Issue["課題管理ツール タスクと意思決定の追跡"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Comm hub;
    class Sync,Async,Meeting,Chat,Mail,Doc,Issue box;`,
  `flowchart TB
    L["サーバントリーダー 奉仕するリーダー"]
    L --> Zen["Be a Zen Master 動揺を見せず冷静さを保つ"]
    L --> Catalyst["Be a Catalyst 強制せず自発的な合意形成を促す"]
    L --> Teacher["Be a Teacher and a Mentor 答えを与えず育てる"]
    L --> Goals["Set Clear Goals 目指す方向を明確に示す"]
    L --> Honest["Be Honest 都合の悪い情報も正直に伝える"]
    L --> Happy["Track Happiness メンバーの幸福度を把握する"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class L hub;
    class Zen,Catalyst,Teacher,Goals,Honest,Happy box;`,
  `flowchart TD
    Start["チームに問題行動が見られる"] --> Identify{"一時的な摩擦か 持続的な有害パターンか"}
    Identify -- "一時的な摩擦" --> Talk["1on1で対話し誤解を解消する"]
    Identify -- "持続的な有害パターン" --> Classify["タイプを見極める"]

    Classify --> Ego["エゴ・尊大さ"]
    Classify --> Entitle["過剰な権利意識"]
    Classify --> Immature["未熟なコミュニケーション"]
    Classify --> Paranoia["被害妄想"]
    Classify --> Perfection["暴走した完璧主義"]

    Ego --> Repel["対処テクニックを適用する"]
    Entitle --> Repel
    Immature --> Repel
    Paranoia --> Repel
    Perfection --> Repel

    Repel --> Facts["感情的にならず事実だけに注目する"]
    Repel --> Kind["過剰な優しさでトロールの勢いを削ぐ"]
    Repel --> Redirect["完璧主義者のエネルギーを建設的な方向に導く"]

    Facts --> Review{"チーム文化に統合できたか"}
    Kind --> Review
    Redirect --> Review
    Review -- "できた" --> Integrate["継続してチームの一員として迎える"]
    Review -- "できない" --> GiveUp["長期的視点で見切りをつける"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Identify,Talk,Classify,Ego,Entitle,Immature,Paranoia,Perfection,Repel,Facts,Kind,Redirect,Review,GiveUp box;
    class Integrate done;`,
  `flowchart TD
    Goal["組織の中で成果を出したい"] --> Env{"組織の環境は"}
    Env -- "理想的なマネージャーがいる" --> Ideal["目標のすり合わせをしながらまっすぐ前進する"]
    Env -- "官僚的・機能不全な環境" --> Obstacle["立ち回りの戦略が必要"]

    Obstacle --> Forgiveness["許可を求めるより許しを請う"]
    Obstacle --> MakePath["道がなければ自分で道を作る"]
    Obstacle --> ManageUp["上司をマネジメントする"]
    Obstacle --> Favor["日頃から信頼と好意を蓄積しておく"]

    Forgiveness --> Result{"状況は改善したか"}
    MakePath --> Result
    ManageUp --> Result
    Favor --> Result

    Result -- "改善した" --> Stay["留まって影響力を発揮し続ける"]
    Result -- "改善しない" --> PlanB["プランB 異動・転職も選択肢にする"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Goal hub;
    class Env,Ideal,Obstacle,Forgiveness,MakePath,ManageUp,Favor,Result,PlanB box;
    class Stay done;`,
  `flowchart LR
    P1["フェーズ1 認知 第一印象を大切にする 少なめに約束し期待以上に届ける"] --> P2["フェーズ2 使いやすさ 対象ユーザーを絞り複雑さを隠す"]
    P2 --> P3["フェーズ3 信頼関係 誠実に辛抱強く向き合い驚きと喜びを届ける"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class P1,P2 box;
    class P3 done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/team-geek/9781449329839/",
  "https://www.oreilly.com/library/view/team-geek/9781449329839/pr01.html",
  "https://www.oreilly.com/library/view/team-geek/9781449329839/ch01.html",
  "https://www.oreilly.com/library/view/team-geek/9781449329839/ch02.html",
  "https://www.oreilly.com/library/view/team-geek/9781449329839/ch03.html",
  "https://www.oreilly.com/library/view/team-geek/9781449329839/ch04.html",
  "https://www.oreilly.com/library/view/team-geek/9781449329839/ch05.html",
  "https://www.oreilly.com/library/view/team-geek/9781449329839/ch06.html",
  "https://www.oreilly.com/library/view/debugging-teams/9781491932049/",
  "https://book.debuggingteams.com/",
  "https://danielwestheide.com/blog/book-review-team-geek/",
  "https://juri.dev/blog/2012/10/hrt-humility-respect-and-trust/",
  "https://hackernewsbooks.com/book/team-geek/a8ec77e78ddcbd518ac757f18bbd5fca",
  "https://www.goodreads.com/notes/53526633-software-engineering-at-google/30279277-gerardo-ortega/dbad6cd2-1538-4940-94e3-01cf553f647e",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "overview",
  "hrt-foundation",
  "chapter-1-genius-myth",
  "chapter-2-team-culture",
  "chapter-3-leadership",
  "chapter-4-poisonous-people",
  "chapter-5-organizational-manipulation",
  "chapter-6-users-are-people",
  "summary-checklist",
  "related-books",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 4,
  note: 2,
  practice: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { ソース: 4 },
  note: { 補足: 2 },
  practice: { ベストプラクティス: 1 },
} as const;

const EXPECTED_STEP_TAGS = [
  "1", "2", "3", "4", "5", "6",
  "1", "2", "3", "4", "5",
  "1", "2", "3", "4", "5",
  "1", "2", "3", "4", "5", "6",
  "1", "2", "3", "4", "5",
  "1", "2", "3", "4", "5", "6",
] as const;

const SEO_TITLE_FRAGMENTS = [
  "Team Geek",
  "Google",
] as const;

defineSourceParityContract({
  suiteName: "pages/team-geek-guide.vue",
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
  seoTitleFragments: SEO_TITLE_FRAGMENTS,
});
