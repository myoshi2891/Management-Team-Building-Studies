// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/engineering-team-leadership-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "エンジニアリングチームのリード術",
] as const;

const EXPECTED_H2 = [
  "リーダーシップの土台を理解する",
  "効果的なチームを支える科学的根拠",
  "エンジニアリングリーダーの役割を理解する",
  "新任リーダーの最初のステップ",
  "1on1とフィードバックの技術",
  "チームの実行力を高めるシステム思考",
  "コードレビュー文化を築く",
  "よくあるアンチパターンと回避策",
  "継続的な成長とネクストステップ",
  "まとめ",
  "参考文献・出典",
] as const;

// 参考文献セクションの h4 3 件を a11y 基準（Q-3）に従い h3 に昇格させ全 12 件
const EXPECTED_H3 = [
  "Efficiency・Effectiveness・Productivityの違い",
  "3つのEモデル: Enable → Empower → Expand",
  "Project Oxygen: 優れたマネージャーの10の行動",
  "Project Aristotle: 効果的なチームの5つの力学",
  "テックリード・エンジニアリングマネージャー・TLMの違い",
  "キャリアラダーとしての管理職パス",
  "週次1on1という「揺るがない予定」",
  "Radical Candor: ケア・パーソナリーとチャレンジ・ダイレクトリー",
  "委譲の判断フレームワーク",
  "書籍・出版社",
  "Google re:Work / Engineering Practices",
  "著名なエンジニアリングリーダーの記事・インタビュー",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["Enable 土台を整える"] --> B["Empower 力を引き出す"]
    B --> C["Expand 範囲を広げる"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C box;`,
  `flowchart TB
    PS["心理的安全性 Psychological Safety"] --> D["相互信頼性 Dependability"]
    PS --> S["構造と明確さ Structure and Clarity"]
    PS --> M["仕事の意味 Meaning"]
    PS --> I["インパクト Impact"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PS hub;
    class D,S,M,I box;`,
  `flowchart TB
    IC["ソフトウェアエンジニア"] --> TL["テックリード"]
    TL --> EM["エンジニアリングリード 初めての管理職"]
    EM --> SM["シニアマネージャー マネージャーのマネージャー"]
    SM --> DIR["ディレクター"]
    DIR --> VP["VPエンジニアリング"]
    VP --> CTO["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class IC,TL,EM,SM,DIR,VP box;
    class CTO done;`,
  `flowchart TB
    Start["新任エンジニアリングマネージャー"] --> A["チームビルディングと育成"]
    Start --> B["成果を出す仕組みづくり"]
    Start --> C["コラボレーションと連携"]
    Start --> D["ビジョンの共有"]
    Start --> E["自己成長"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Start hub;
    class A,B,C,D,E box;`,
  `flowchart TB
    Task["タスクが発生"] --> Q1{"発生頻度は高いか"}
    Q1 -- はい --> Q2{"複雑さは高いか"}
    Q1 -- いいえ --> Q3{"複雑さは高いか"}
    Q2 -- はい --> R1["人材育成の機会として委譲する"]
    Q2 -- いいえ --> R2["すぐに手放し 仕組み化する"]
    Q3 -- はい --> R3["自分で対応しつつ知見を共有する"]
    Q3 -- いいえ --> R4["まとめて処理するか委譲する"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Task hub;
    class Q1,Q2,Q3 box;
    class R1,R2,R3,R4 done;`,
  `flowchart TB
    A["変更 CL PRを作成する"] --> B["小さく自己完結した変更に分割する"]
    B --> C["レビューを依頼する"]
    C --> D{"コードの健全性は向上するか"}
    D -- はい --> E["LGTM Looks Good To Me で承認"]
    D -- いいえ --> F["建設的なコメントで改善を依頼する"]
    F --> B
    E --> G["マージして次の変更へ"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,F box;
    class E,G done;`,
  `flowchart TB
    AP["効果性を損なうアンチパターン"] --> IND["個人レベル"]
    AP --> PRA["プラクティスレベル"]
    AP --> STR["構造レベル"]
    AP --> LEAD["リーダーシップレベル"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class AP hub;
    class IND,PRA,STR,LEAD box;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/leading-effective-engineering/9781098148232/",
  "https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers",
  "https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness",
  "https://www.shortform.com/blog/the-managers-path-camille-fournier/",
  "https://www.welcometothejungle.com/en/articles/btc-manager-path-camille-fournier",
  "https://blog.pragmaticengineer.com/checklist-for-first-time-managers/",
  "https://www.welcometothejungle.com/en/articles/btc-michael-lopp-interview-management",
  "https://www.radicalcandor.com/our-approach",
  "https://press.stripe.com/an-elegant-puzzle",
  "https://google.github.io/eng-practices/review/reviewer/standard.html",
] as const;

const EXPECTED_TOC_IDS = [
  "leadership-foundations",
  "team-effectiveness-science",
  "leadership-roles",
  "first-90-days",
  "one-on-ones-feedback",
  "systems-thinking",
  "code-review-culture",
  "antipatterns",
  "continuous-growth",
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

/** 原本の `.callout.<variant>` の出現数。variant 名は原本のクラス名をそのまま使う。 */
const EXPECTED_CALLOUT_VARIANTS = { note: 4, source: 9, practice: 3 } as const;

const EXPECTED_CALLOUT_LABELS = ["補足", "ソース", "ベストプラクティス"] as const;

const EXPECTED_STEP_TAGS = [
  "1", "2", "3", "4", "5",
  "1", "2", "3", "4", "5", "6", "7", "8", "9",
] as const;

defineSourceParityContract({
  suiteName: "pages/engineering-team-leadership-guide.vue",
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
  seoTitleFragments: ["エンジニアリングチーム", "リード術"],
});
