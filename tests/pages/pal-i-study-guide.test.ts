// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/pal-i-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Agile Leadership™ I(PAL I)認定試験 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "PAL I 認定試験概要と「アジャイルリーダーシップ」の基本理念",
  "高業績・自己管理型チームの育成(Developing People & Teams)",
  "組織的な障害の排除とカルチャー変革(Managing the Organization)",
  "価値とエビデンスに基づく測定と改善(EBM: Evidence-Based Management)",
  "試験対策・頻出シチュエーション問題の解法パターン",
  "参考リソース・公式リンク集",
] as const;

const EXPECTED_H3 = [
  "1.1 PAL I 試験の目的と試験形式",
  "1.2 なぜアジャイル組織に新しいリーダーシップが求められるのか",
  "1.3 伝統的マネジメントとアジャイルリーダーシップの根本的な違い",
  "2.1 自己管理型(Self-Managing)チームへの成熟度ステージ",
  "2.2 権限委譲(Delegation & Empowerment)の実践",
  "2.3 ガードレール(境界線・制約条件)の設定",
  "2.4 心理的安全性の担保と失敗を学習に変える文化",
  "3.1 チーム内の課題(Team Impediments)と組織全体の課題(Organizational Impediments)の切り分け",
  "3.2 スクラムマスターとアジャイルリーダーの協調関係",
  "3.3 サイロの打破と部門横断的なコラボレーションの促進",
  "3.4 アジリティを阻害する既存システム(人事評価、予算配分、承認プロセス)の刷新",
  "4.1 EBM フレームワークとは",
  "4.2 4つの主要価値領域(Key Value Areas, KVA)",
  "4.3 誤ったメトリクスとアンチパターンの危険性",
  "5.1 典型的なジレンマ・状況判断シナリオ",
  "5.2 合格に向けた推奨学習ステップ",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "what-is-pal1",
  "developing-teams",
  "managing-organization",
  "evidence-based-management",
  "exam-strategy",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 01",
  "SECTION 02",
  "SECTION 03",
  "SECTION 04",
  "SECTION 05",
  "SECTION 06",
] as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 6,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { ソース: 6 },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-agile-leadership-certification",
  "https://www.scrum.org/assessments/professional-agile-leadership-certification",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/pathway/agile-leader-learning-series",
  "https://www.scrum.org/pathway/agile-leader-learning-series",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/pathway/agile-leader-learning-series",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/resources/evidence-based-management-guide",
  "https://www.scrum.org/assessments/professional-agile-leadership-certification",
  "https://www.scrum.org/assessments/professional-agile-leadership-certification",
  "https://www.scrumguides.org/",
  "https://www.scrum.org/resources/evidence-based-management-guide",
  "https://www.scrum.org/pathway/agile-leader-learning-series",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["リーダー: ビジョン・予算・制約などのガードレールを設定する"] --> B["チーム: ガードレールの範囲内で意思決定する"]
    B --> C["チーム: スプリントで実行し、成果物を検査する"]
    C --> D["チームとリーダー: スプリントレビュー・レトロスペクティブで振り返る"]
    D --> E["学習: 何がうまくいき、何が障害だったかを可視化する"]
    E --> F{"ガードレール自体の見直しが必要か"}
    F -->|"はい"| A
    F -->|"いいえ"| B

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;`,
  `flowchart TB
    A["チーム: 日々の作業で障害を経験する"] --> B["スクラムマスター: 障害を観察し、チーム内で解決可能かを判断する"]
    B --> C{"チーム内で解決可能か"}
    C -->|"はい"| D["スクラムマスターとチームで解決する"]
    C -->|"いいえ: 組織的な障害"| E["スクラムマスター: 組織的障害としてアジャイルリーダーにエスカレーションする"]
    E --> F["アジャイルリーダー: 組織的な意思決定権限を用いて障害の除去に取り組む"]
    F --> G["経営層・他部門: 制度変更や部門間調整を実施する"]
    G --> H["チーム: 障害が解消された環境で作業を継続する"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,E,F,G box;
    class D,H done;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/pal-i-study-guide.vue",
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
  seoTitleFragments: ["PAL I", "Professional Agile Leadership"],
  seoTitle: "PAL I(Professional Agile Leadership I)認定資格 完全ガイド | サーバントリーダーシップと組織アジリティの実践",
  seoDescription:
    "Scrum.org 公式 Professional Agile Leadership I(PAL I)認定試験の学習ガイド。サーバントリーダーシップ、自己管理型チームの育成、組織的障害の除去、Evidence-Based Management を初学者向けに解説します。",
});

describe("pages/pal-i-study-guide.vue — テーブル構造契約", () => {
  const mountPage = createMountPage(Page);

  it("テーブルが原本と同じ件数（4件）存在し、すべて .table-wrap で包まれている", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(4);
    expect(wrapper.findAll(".table-wrap table")).toHaveLength(4);
  });

  it("テーブル行の総数が原本と一致する（29行）", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll("tr")).toHaveLength(29);
  });
});
