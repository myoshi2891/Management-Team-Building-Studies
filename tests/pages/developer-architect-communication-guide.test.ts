// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/developer-architect-communication-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "開発者とアーキテクトのためのコミュニケーションガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに — なぜ「技術力」と同じくらいコミュニケーションが重要なのか",
  "相手(チーム)が今どのフェーズにいるかを見極める",
  "自分がどの「階」でコミュニケーションしているかを自覚する",
  "意思決定を書き残す — Architecture Decision Record (ADR)",
  "設計を伝える前に合意を作る — Design Doc と RFC 文化",
  "複雑な構造を「見える化」する — C4モデル",
  "コードレビューで人間関係を壊さない伝え方",
  "非同期コミュニケーションを設計する",
  "技術的負債をビジネス言語に翻訳する",
  "非技術者・経営層に伝える — SQCA フレームワーク",
  "まとめ: 実践チェックリスト",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "この記事で扱うステップ",
  "Elastic Leadership の3フェーズモデル",
  "Gregor Hohpe の「アーキテクト・エレベーター」",
  "なぜ「決定の理由」を記録する必要があるのか",
  "Nygard 式 ADR テンプレート(初学者向け最小構成)",
  "Google の Design Doc",
  "Amazon の「6ページ・メモ」文化",
  "なぜ図が必要なのか",
  "コードについて語り、人について語らない",
  "レビューを受け取る側の心構え",
  "GitLab の「Handbook-First」文化",
  "Martin Fowler の Technical Debt Quadrant",
  "Will Larson の SQCA",
  "情報源一覧",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    OBS["チームの状態を観察する"] --> Q{"チームは今どのフェーズか"}
    Q -->|"常に火消しに追われている"| SURV["サバイバルモード"]
    Q -->|"新しいスキルを習得している最中"| LEARN["ラーニングモード"]
    Q -->|"自分たちで判断し前進できる"| SELF["自己組織化モード"]
    SURV --> SURV1["具体的な指示を出し短期の生存を優先する"]
    LEARN --> LEARN1["問いかけて学習の時間を確保する"]
    SELF --> SELF1["権限を移譲し意思決定を任せる"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q hub;
    class SELF1 done;`,
  `flowchart TB
    P["ペントハウス 経営 事業戦略が決まる場所"]
    M["中間階 予算とロードマップが決まる場所"]
    E["エンジンルーム 実装と技術的詳細が決まる場所"]
    P --> M --> E
    A(("架け橋になる人"))
    A -.-> P
    A -.-> M
    A -.-> E

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A hub;`,
  `flowchart LR
    D["課題に気づく"] --> PR["ドラフトを書く Proposed"]
    PR --> AC["チームで合意する Accepted"]
    AC --> USE["設計 実装に反映する"]
    AC -.-> DEP["状況が変わり非推奨になる Deprecated"]
    AC -.-> SUP["新しい決定で置き換わる Superseded"]
    SUP --> NEW["新しいADRを書く"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class AC hub;
    class USE done;`,
  `flowchart TB
    ISSUE["解決したい課題を1行で書く"] --> DRAFT["一人でドラフトを書く"]
    DRAFT --> SHARE["関係者に事前共有する"]
    SHARE --> REVIEW["非同期でコメントを集める"]
    REVIEW --> SYNC{"意見が大きく割れているか"}
    SYNC -->|"はい"| MEET["短い同期ミーティングで論点を絞る"]
    SYNC -->|"いいえ"| CONSENSUS["合意形成"]
    MEET --> CONSENSUS
    CONSENSUS --> IMPL["実装を開始する"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class SYNC hub;
    class IMPL done;`,
  `flowchart TB
    L1["レベル1 システムコンテキスト 誰が使いどのシステムと連携するか"]
    L2["レベル2 コンテナ どのアプリやデータストアで構成されるか"]
    L3["レベル3 コンポーネント コンテナ内部のモジュール構成"]
    L4["レベル4 コード クラスや関数レベルの実装"]
    L1 --> L2 --> L3 --> L4

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class L1 hub;
    class L4 done;`,
  `flowchart TB
    START["レビューコメントを書く前に"] --> Q1{"技術的な根拠にもとづいているか"}
    Q1 -->|"いいえ 個人の好みだけ"| STYLE["スタイルガイドを確認し無ければ著者の判断を尊重する"]
    Q1 -->|"はい"| Q2{"必須の修正か 任意の提案か"}
    Q2 -->|"必須"| BLOCK["理由を添えて明確に指摘する"]
    Q2 -->|"任意"| NIT["Nit と明記し任意であることを伝える"]
    BLOCK --> WHY["コードについて語り人について語らない"]
    NIT --> WHY

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q1,Q2 hub;
    class WHY done;`,
  `flowchart TB
    NEED["伝えたいことがある"] --> Q{"緊急かつ結論が曖昧で議論が必要か"}
    Q -->|"はい"| SYNCC["同期 短い通話やミーティングを設定する"]
    Q -->|"いいえ"| ASYNCC["非同期 イシューやドキュメントに書く"]
    SYNCC --> WRITE1["結論は必ず書き残す"]
    ASYNCC --> WRITE2["検索可能な場所に残す"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q hub;
    class WRITE1,WRITE2 done;`,
  `flowchart TB
    S["S 状況 前提となる背景を定義する"] --> C["C 複雑化要因 なぜ今それが問題なのか"]
    C --> Q["Q 問い 何を意思決定すべきかを一文で示す"]
    Q --> A["A 答え 推奨する結論を先に述べる"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q hub;
    class A done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.manning.com/books/elastic-leadership",
  "https://techleadjournal.dev/episodes/110/",
  "https://www.oreilly.com/library/view/the-software-architect/9781492077534/",
  "https://www.enterpriseintegrationpatterns.com/ramblings/79_elevator.html",
  "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
  "https://github.com/joelparkerhenderson/architecture-decision-record",
  "https://www.industrialempathy.com/posts/design-docs-at-google/",
  "https://blog.pragmaticengineer.com/rfcs-and-design-docs/",
  "https://www.cnbc.com/2018/04/23/what-jeff-bezos-learned-from-requiring-6-page-memos-at-amazon.html",
  "https://medium.com/@nathan.baugh/welcome-to-the-jungle-38fdde285b6f",
  "https://ivanahuckova.medium.com/book-notes-staff-engineer-leadership-beyond-the-management-track-by-will-larson-41248b1ca1c6",
  "https://medium.com/@liamchzh/staffeng-how-to-write-a-design-doc-and-how-google-does-it-19c495c53fcf",
  "https://martinfowler.com/bliki/TechnicalDebtQuadrant.html",
  "https://techdebt.guru/tech-debt-quadrant/",
  "https://google.github.io/eng-practices/review/reviewer/comments.html",
  "https://google.github.io/eng-practices/review/reviewer/standard.html",
  "https://github.com/google/eng-practices/blob/master/review/developer/handling-comments.md",
  "https://abseil.io/resources/swe-book/html/ch09.html",
  "https://gitlab.com/gitlab-com/content-sites/handbook/-/tree/main/content/handbook/communication",
  "https://handbook.gitlab.com/handbook/company/culture/all-remote/handbook-first/",
  "https://c4model.com/",
  "https://www.oreilly.com/library/view/the-c4-model/9798341660113/",
  "https://dev.to/victorleungtw/the-c4-model-for-visualising-software-architecture-1g5p",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "step-1-team-phase",
  "step-2-architect-elevator",
  "step-3-adr",
  "step-4-design-docs",
  "step-5-c4-model",
  "step-6-code-review",
  "step-7-async-communication",
  "step-8-tech-debt",
  "step-9-sqca",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 9,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: { 初学者向けの実践ポイント: 9 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const SEO_TITLE_FRAGMENTS = [
  "開発者とアーキテクトのためのコミュニケーションガイド",
  "実践ガイド",
] as const;

defineSourceParityContract({
  suiteName: "pages/developer-architect-communication-guide.vue",
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
