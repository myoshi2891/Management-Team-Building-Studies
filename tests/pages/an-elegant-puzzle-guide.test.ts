// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/an-elegant-puzzle-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "An Elegant Puzzle: Systems of Engineering Management 徹底解説ガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "著者と本の全体像",
  "第1部: 組織設計(Organizations)",
  "第2部: マネジメントの道具箱(Tools)",
  "第3部: アプローチ(Approaches)",
  "第4部: 文化(Culture)",
  "第5部: キャリア(Careers)",
  "初学者向け: 明日から使える実践チェックリスト",
  "業界での評価: 著名なエンジニアリングリーダーはどう読んだか",
  "まとめ",
  "参考文献・情報源(URL付き)",
] as const;

const EXPECTED_H3 = [
  "1-1. チームの適正規模を決める",
  "1-2. チームの「4つの状態」を見極める",
  "1-3. トップダウン最適化への警鐘",
  "1-4. ハイパーグロース下の生産性",
  "1-5. 組織のリスクをどこに置くか",
  "1-6. 後継者計画(サクセッションプランニング)",
  "2-1. すべての土台となる「システム思考」",
  "2-2. ビジョンと戦略を書き分ける",
  "2-3. メトリクスとベースラインで変化を導く",
  "2-4. マイグレーションを「安く」保つ",
  "2-5. 組織再編(リオルグ)を正しく進める",
  "5-1. 採用ファネルを設計する",
  "5-2. パフォーマンスマネジメントとキャリアラダー",
  "5-3. 面接ループを設計する",
  "公式・書籍情報",
  "著者本人による一次情報(Irrational Exuberance ブログ)",
  "著名な国際的エンジニア・開発者による書評・解説",
  "その他の実務者による読書メモ・要約(補足参考情報)",
] as const;

const EXPECTED_H4 = [] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["序章 Introduction"] --> B["第1部 組織 Organizations"]
    B --> C["第2部 道具箱 Tools"]
    C --> D["第3部 アプローチ Approaches"]
    D --> E["第4部 文化 Culture"]
    E --> F["第5部 キャリア Careers"]
    F --> G["付録 Appendix"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`,
  `flowchart LR
    FB["① Falling Behind バックログが毎週増え続ける"] -->|人を増員する| TW["② Treading Water 重要業務はこなせるが技術的負債は減らない"]
    TW -->|同時進行案件を減らす| RD["③ Repaying Debt 負債返済が雪だるま式に加速する"]
    RD -->|時間を守り抜く| IN["④ Innovating 負債は低水準、士気も高い"]
    IN -.->|油断すると逆戻り| RD
    RD -.->|油断すると逆戻り| TW
    TW -.->|油断すると逆戻り| FB

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class FB box;
    class TW hub;
    class RD hub;
    class IN done;`,
  `flowchart TB
    A["デザインドキュメントを5本程度書く"] --> B["共通するテーマを抽出する"]
    B --> C["1つのエンジニアリング戦略・特定課題への具体策"]
    C --> D["戦略を5本程度書く"]
    D --> E["2〜3年先の帰結を外挿・予測する"]
    E --> F["1つのエンジニアリングビジョン・組織全体の方向性"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,D,E box;
    class C hub;
    class F done;`,
  `flowchart TB
    S1["① 組織変更が本当に必要かを検証する"] --> S2["② 1年後の人員規模を見積もる"]
    S2 --> S3["③ マネジメント比率の目標を設定する"]
    S3 --> S4["④ 論理的なチーム・グループを特定する"]
    S4 --> S5["⑤ チームへの人員配置を計画する"]
    S5 --> S6["⑥ 実行することにコミットする"]
    S6 --> S7["⑦ 新しい組織構造をロールアウトする"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5,S6 box;
    class S7 done;`,
  `flowchart LR
    A["ソーシング 候補者を見つける"] --> B["スクリーニング"]
    B --> C["面接ループ"]
    C --> D["デブリーフ・意思決定"]
    D --> E["オファー"]
    E --> F["オンボーディング"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E box;
    class F done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://press.stripe.com/an-elegant-puzzle",
  "https://press.stripe.com/an-elegant-puzzle",
  "https://www.amazon.com/Elegant-Puzzle-Systems-Engineering-Management/dp/1732265186",
  "https://www.goodreads.com/book/show/45303387-an-elegant-puzzle",
  "https://lethain.com/sizing-engineering-teams/",
  "https://lethain.com/durably-excellent-teams/",
  "https://lethain.com/strategies-visions/",
  "https://lethain.com/good-engineering-strategy-is-boring/",
  "https://lethain.com/things-that-arent-engineering-strategy/",
  "https://lethain.com/survey-of-engineering-strategies/",
  "https://lethain.com/",
  "https://staffeng.com/guides/engineering-strategy/",
  "https://blog.pragmaticengineer.com/an-elegant-puzzle-book-review/",
  "https://copyconstruct.medium.com/book-review-an-elegant-puzzle-f787ad381ce0",
  "https://refactoring.fm/p/an-elegant-puzzle",
  "https://tomtunguz.com/an-elegant-problem-will-larson.md/",
  "https://review.firstround.com/how-to-size-and-assess-teams-from-an-eng-lead-at-stripe-uber-and-digg/",
  "https://www.scottbrady.io/leadership/book-notes-elegant-puzzle",
  "https://manassaloi.com/booksummaries/2021/02/14/elegant-puzzle-larson.html",
  "https://danlebrero.com/2022/07/06/an-elegant-puzzle-systems-of-engineer-management-book-summary/",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "author-overview",
  "organizations",
  "tools",
  "approaches",
  "culture",
  "careers",
  "starter-checklist",
  "industry-reception",
  "conclusion",
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
  note: 4,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 4 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "An Elegant Puzzle",
  "完全ガイド",
] as const;

const EXPECTED_SEO_TITLE =
  "An Elegant Puzzle 完全ガイド | エンジニアリングマネジメントの体系的入門";
const EXPECTED_SEO_DESCRIPTION =
  "Will Larson著『An Elegant Puzzle: Systems of Engineering Management』を初学者向けに解説。チームサイジング、4つの状態、ビジョンと戦略、マイグレーション、リオルグなど主要フレームワークをMermaid図とともに紹介。";

defineSourceParityContract({
  suiteName: "pages/an-elegant-puzzle-guide.vue",
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

describe("pages/an-elegant-puzzle-guide.vue — アクセシビリティ固有契約", () => {
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
