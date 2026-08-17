// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
//   見出し配列: audit_source_parity.mjs --emit-headings の出力を貼り付け
//   その他:     同じ正規化規則で抽出したもの
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/engineering-management-career-path.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "エンジニアのためのマネジメントキャリアパス",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "マネジメントキャリアの全体像(デュアルキャリアラダー)",
  "各役職の詳細解説",
  "自分はマネジメントに向いているか(判断チェックリスト)",
  "マネージャーになる前の準備: テックリードという助走路",
  "新任マネージャーの最初の90日",
  "マネージャーのコアプラクティス",
  "優れたマネージャーの共通点(Google Project Oxygen)",
  "よくある失敗と対処法",
  "ICとマネジメントを行き来する「振り子」というキャリア戦略",
  "スキルロードマップまとめ表",
  "参考文献・情報源",
] as const;

// 参考文献セクションの h4 4 件を a11y 基準（Q-3）に従い h3 に昇格させ全 15 件
const EXPECTED_H3 = [
  "2.1 全体のキャリアフロー図",
  "2.2 ICトラックとマネジメントトラックの対応関係(目安)",
  "3.1 テックリード(Tech Lead)",
  "3.2 エンジニアリングマネージャー(EM)",
  "3.3 シニアEM / マネージャーオブマネージャーズ",
  "3.4 ディレクター",
  "3.5 VPオブエンジニアリング / CTO",
  "7.1 1on1ミーティング",
  "7.2 委任(デリゲーション)",
  "7.3 フィードバックと評価",
  "7.4 採用",
  "書籍",
  "ブログ・記事",
  "企業・調査レポート",
  "その他リソース",
] as const;

const EXPECTED_H4 = [
] as const;

const EXPECTED_H5 = [
] as const;

const EXPECTED_H6 = [
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["ソフトウェアエンジニア"] --> B["シニアソフトウェアエンジニア"]
    B --> C{"キャリアの分岐点"}
    C -->|"技術を極める"| D1["スタッフエンジニア"]
    D1 --> D2["シニアスタッフ・プリンシパルエンジニア"]
    D2 --> D3["ディスティングイッシュトエンジニア・フェロー"]
    C -->|"人と組織を率いる"| E1["テックリード"]
    E1 --> E2["エンジニアリングマネージャー"]
    E2 --> E3["シニアEM・マネージャーオブマネージャーズ"]
    E3 --> E4["ディレクター"]
    E4 --> E5["VPオブエンジニアリング"]
    E5 --> E6["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,D1,D2,E1,E2,E3,E4,E5 box;
    class C hub;
    class D3,E6 done;`,
  `flowchart TB
    S1["1週目 傾聴に徹する 1on1で期待値とチームの状況をヒアリング"] --> S2["2〜4週目 シグナル収集 コード・プロセス・人間関係を観察する"]
    S2 --> S3["30日目 30-60-90日プランを作成しチームと共有する"]
    S3 --> S4["60日目 小さな成功体験を積み重ね信頼を構築する"]
    S4 --> S5["90日目 マネジメントスタイルを確立しフィードバックの循環をつくる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4 box;
    class S5 done;`,
  `flowchart LR
    A["個人貢献者ICとして技術力を磨く期間"] --> B["テックリードとして技術と組織の橋渡しをする期間"]
    B --> C["エンジニアリングマネージャーとして人と組織を育てる期間"]
    C -.->|"スキルの陳腐化を避けるため一定期間で技術側へ戻る"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,C box;
    class B hub;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
  "https://www.juliezhuo.com/book/manager.html",
  "https://www.amazon.com/Staff-Engineer-Leadership-beyond-management/dp/1736417916",
  "https://resilient-management.com/",
  "https://skamille.spicytakes.org/",
  "https://lethain.com/path-to-eng-manager-of-managers/",
  "https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/",
  "https://blog.pragmaticengineer.com/what-becoming-an-engineering-manager-is-like/",
  "https://newsletter.pragmaticengineer.com/p/staying-technical",
  "https://larahogan.me/management/",
  "https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers",
  "https://www.engguidebook.com/",
  "https://www.nidup.io/garden/engineering-career-ladders/",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "career-path-overview",
  "role-descriptions",
  "self-assessment",
  "tech-lead-preparation",
  "first-90-days",
  "core-practices",
  "project-oxygen",
  "common-pitfalls",
  "engineer-manager-pendulum",
  "skill-roadmap",
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

/** 原本の `.callout.<variant>` の出現数。variant 名は原本のクラス名をそのまま使う。 */
const EXPECTED_CALLOUT_VARIANTS = { note: 3 } as const;

const EXPECTED_CALLOUT_LABELS = {
  // 原本では note variant が 2 種類のラベルを持つ（補足 x2 / 重要な示唆 x1）。
  note: { "補足": 2, "重要な示唆": 1 },
} as const;

const EXPECTED_STEP_TAGS = ["1", "2", "3", "4", "5"] as const;

defineSourceParityContract({
  suiteName: "pages/engineering-management-career-path.vue",
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
  seoTitleFragments: ["エンジニア", "マネジメント"],
});
