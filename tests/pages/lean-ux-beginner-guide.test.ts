// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/lean-ux-beginner-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Lean UX 実践ガイド ― はじめての人のためのステップバイステップ入門",
] as const;

const EXPECTED_H2 = [
  "Lean UXとは何か",
  "Lean UXを支える原則",
  "Lean UXの全体サイクル",
  "Lean UX Canvasによるステップバイステップ実践",
  "仮説(ハイポセシス)の書き方",
  "MVPと実験の設計",
  "コラボレイティブデザイン: デザインスタジオ",
  "Lean UXとアジャイル / スクラムの統合",
  "組織にLean UXを浸透させる",
  "2024年以降の進化: Lean Product CanvasとLean Strategy Canvas",
  "はじめてのLean UX: 実践チェックリスト",
  "よくある落とし穴(アンチパターン)",
  "まとめ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "なぜ今、重要なのか",
  "3つの源流",
  "アウトプットからアウトカムへ",
  "各ボックスのステップバイステップ解説",
  "基本テンプレート",
  "テンプレートとCanvasの対応関係",
  "具体例(イメージ)",
  "仮説を書くときの注意点",
  "MVPとは何か",
  "真実の曲線(Truth Curve)という考え方",
  "代表的なMVP・実験の種類",
  "一次情報源",
  "解説・二次情報源",
] as const;

const EXPECTED_H4 = [
  "O'Reilly Media",
  "Jeff Gothelf(著者公式サイト)",
  "Nielsen Norman Group",
  "その他(著者関連の公式情報)",
  "Interaction Design Foundation",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["デザイン思考 Design Thinking"] --> D["Lean UX"]
    B["アジャイル開発 Agile"] --> D
    C["リーンスタートアップ Lean Startup"] --> D
    D --> E["少人数のクロスファンクショナルなチームが仮説を高速に検証しながらプロダクトを作る"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,C,E box;
    class D hub;`,
  `flowchart LR
    O1["アウトプット 作ったもの・機能や画面"] --> O2["アウトカム ユーザー行動の変化"]
    O2 --> O3["インパクト ビジネスへの効果"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class O1,O2,O3 box;`,
  `flowchart LR
    A["Think 思考する 仮説を立てる"] --> B["Make 作る MVPを設計する"]
    B --> C["Check 確かめる 実験で検証する"]
    C --> A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`,
  `flowchart TB
    B1["Box1 ビジネス課題"] --> B2["Box2 ビジネス成果"]
    B2 --> B3["Box3 ユーザー"]
    B3 --> B4["Box4 ユーザーの成果とベネフィット"]
    B4 --> B5["Box5 解決策アイデア"]
    B5 --> B6["Box6 仮説"]
    B6 --> B7["Box7 最初に検証すべきこと"]
    B7 --> B8["Box8 MVPと実験"]
    B8 -->|学びをCanvasに反映する| B1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class B1,B2,B3,B4,B5,B6,B7,B8 box;`,
  `flowchart TB
    S1["問題定義とルール確認 約15分"] --> S2["個人でアイデアスケッチ 約10分"]
    S2 --> S3["発表とクリティーク 1人あたり約3分"]
    S3 --> S4["ペアで反復・改良 約10分"]
    S4 --> S5["チームでアイデアを統合 約45分"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class S1,S2,S3,S4,S5 box;`,
  `flowchart TB
    Track1["発見トラック"] --> D1["仮説を立てる"]
    D1 --> D2["MVPで検証する"]
    D2 --> D3["学びを得る"]
    D3 -->|検証済みの項目を渡す| Backlog["共有バックログ"]
    Backlog --> Track2["提供トラック"]
    Track2 --> E1["検証済みの項目を実装する"]
    E1 --> E2["リリースする"]
    E2 --> E3["計測する"]
    E3 -->|フィードバック| D1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class D1,D2,D3,E1,E2,E3 box;
    class Track1,Track2,Backlog hub;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/",
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/ch12.html",
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/ch10.html",
  "https://jeffgothelf.com/blog/the-lean-product-canvas/",
  "https://jeffgothelf.com/blog/whats-new-lean-ux-book-3rd-edition/",
  "https://jeffgothelf.com/blog/how-to-use-the-lean-ux-canvas/",
  "https://jeffgothelf.com/blog/leanuxcanvas-v2/",
  "https://jeffgothelf.com/blog/leanuxcanvas/",
  "https://www.nngroup.com/videos/lean-ux/",
  "https://www.nngroup.com/articles/lean-ux-agile-study-guide/",
  "https://www.nngroup.com/articles/agile-glossary/",
  "https://www.nngroup.com/articles/agile-development-and-usability/",
  "https://www.nngroup.com/articles/lean-agile-documentation/",
  "https://www.senseandrespond.co/blog/lean-ux-canvas-workshop-guide",
  "https://leanuxbook.com/",
  "https://agiledata.io/podcast/no-nonsense-agile-podcast/jeff-gothelf-lean-ux-and-sense-and-respond/",
  "https://ixdf.org/literature/topics/lean-ux",
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-lean-ux",
  "lean-ux-principles",
  "lean-ux-cycle",
  "lean-ux-canvas",
  "hypothesis-writing",
  "mvp-and-experiments",
  "design-studio",
  "lean-ux-and-agile",
  "organizational-adoption",
  "canvas-evolution-2024",
  "getting-started-checklist",
  "common-pitfalls",
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

const EXPECTED_CALLOUT_VARIANTS = {
  note: 3,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { 補足: 3 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const SEO_TITLE_FRAGMENTS = [
  "Lean UX",
  "実践ガイド",
] as const;

defineSourceParityContract({
  suiteName: "pages/lean-ux-beginner-guide.vue",
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
  seoTitle: "Lean UX 実践ガイド | 初学者のためのステップバイステップ入門",
  seoDescription: "Jeff GothelfとJosh Seidenの著書『Lean UX, 3rd Edition』を主軸に、Lean UX Canvas・仮説の書き方・MVPと実験・デザインスタジオ・デュアルトラック・アジャイルまでを、初学者向けにステップバイステップで解説するガイドです。",
});
