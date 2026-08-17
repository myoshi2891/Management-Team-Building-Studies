// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/engineering-executive-playbook.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "エンジニアリング統括責任者の手引き",
] as const;

const EXPECTED_H2 = [
  "エンジニアリング統括責任者とは何か",
  "全体像：統括責任者としての仕事の流れ",
  "Phase 1：最初の90日間",
  "Phase 2：組織を設計する（採用・オンボーディング・チーム構造）",
  "Phase 3：実行の仕組みを作る（戦略・計画・ミーティング）",
  "Phase 4：人を育てる（パフォーマンス管理・文化）",
  "Phase 5：組織を測定する（DORAメトリクス）",
  "Phase 6：障害に備える（インシデント管理とポストモーテム）",
  "リーダーシップスタイルを使い分ける",
  "ステークホルダーとの協働",
  "よくある落とし穴（アンチパターン）",
  "実践チェックリスト",
  "参考文献・引用元",
] as const;

// 参考文献セクションの h4 2 件を a11y 基準（Q-3）に従い h3 に昇格させ全 29 件
const EXPECTED_H3 = [
  "3-1. 最初にすべきこと：理解を優先する",
  "3-2. 何を学ぶべきか",
  "3-3. 書かれていない前提を書き出す",
  "3-4. 社外のサポート体制を作る",
  "4-1. 採用プロセスを確立する",
  "4-2. オンボーディングを設計する",
  "4-3. 組織構造とConway's Law（コンウェイの法則）",
  "5-1. エンジニアリング戦略を書く",
  "5-2. 計画プロセスの3フェーズ",
  "5-3. 会議体を設計する",
  "6-1. パフォーマンス管理とキャリアラダー",
  "6-2. 組織文化と価値観",
  "6-3. 心理的安全性：チームの効果性を左右する最大要因",
  "6-4. 「信頼するだけ」では不十分：Inspected Trust（検証された信頼）",
  "7-1. 完璧な指標より「有用で不完全な指標」",
  "7-2. DORAメトリクス",
  "7-3. DORAだけでは測れないもの",
  "8-1. インシデント対応からポストモーテムまでの流れ",
  "8-2. ブレームレス・ポストモーテムとは",
  "8-3. アラートの設計原則",
  "10-1. CEO・経営陣との関係",
  "10-2. CEOをエンジニアリングの詳細に引き込む",
  "10-3. リーダーシップチームを機能させる",
  "10-4. 社外ネットワークとプレゼンスの構築",
  "アンチパターン1：マイクロマネジメント回避のしすぎ",
  "アンチパターン2：不完全な指標を測定することへの過度な抵抗",
  "アンチパターン3：チームの「傘」になりすぎる",
  "書籍・著者本人の発信",
  "研究機関・企業発の一次情報",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/the-engineering-executives/9781098149475/",
  "https://review.firstround.com/unexpected-anti-patterns-for-engineering-leaders-lessons-from-stripe-uber-carta/",
  "https://lethain.com/",
  "https://itrevolution.com/articles/conways-law-critical-for-efficient-team-design-in-tech/",
  "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
  "https://www.lennysnewsletter.com/p/engineering-leadership-camille-fournier",
  "https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness",
  "https://rdel.substack.com/p/rdel-115-what-are-the-2025-benchmarks",
  "https://sre.google/sre-book/postmortem-culture/",
  "https://sre.google/workbook/postmortem-culture/",
  "https://lethain.com/developing-leadership-styles/",
  "https://www.pragmaticengineer.com/",
  "https://www.engguidebook.com/",
  "https://dora.dev/dora-report-2025/",
  "https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report",
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-eng-exec",
  "overview-roadmap",
  "first-90-days",
  "org-design",
  "execution-system",
  "people-culture",
  "measuring-dora",
  "incident-management",
  "leadership-styles",
  "stakeholders",
  "anti-patterns",
  "checklist",
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
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["着任"] --> B["Phase 1 最初の90日間 学習と信頼構築"]
B --> C["Phase 2 組織設計 採用・オンボーディング"]
C --> D["Phase 3 実行の仕組み化 戦略・計画・会議体"]
D --> E["Phase 4 人を育てる 評価・文化"]
E --> F["Phase 5 組織を測定する DORA等の指標"]
F --> G["Phase 6 障害に備える インシデント管理"]
G --> D
G --> H["継続的な改善サイクル"]
H --> D

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G box;
class H done;`,
  `flowchart TD
A["Day 0 着任"] --> B["Week 1-2 傾聴フェーズ 1on1で信頼関係を築く"]
B --> C["Week 3-4 組織診断 採用・実行システム・技術を理解"]
C --> D["Week 5-8 小さな正しい変更 クイックウィンで信頼を積む"]
D --> E["Week 9-12 戦略の初稿を作成 診断結果から方向性を示す"]
E --> F["Day 90 学びと計画を上司・取締役会と共有"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F done;`,
  `flowchart LR
subgraph チームタイプ
ST["ストリーム整合チーム"]
EN["イネーブリングチーム"]
CS["複雑サブシステムチーム"]
PF["プラットフォームチーム"]
end
EN -->|"ファシリテーション"| ST
CS -->|"コラボレーション"| ST
CS -->|"X-as-a-Service"| ST
PF -->|"X-as-a-Service"| ST

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class ST hub;
class EN,CS,PF box;`,
  `flowchart LR
P1["フェーズ1 財務計画の策定"] --> P2["フェーズ2 機能別ポートフォリオ配分"]
P2 --> P3["フェーズ3 ロードマップの合意"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P1,P2 box;
class P3 done;`,
  `flowchart TD
A["検知 Detect"] --> B["トリアージ Triage"]
B --> C["緩和 Mitigate"]
C --> D["復旧 Resolve"]
D --> E["ブレームレス ポストモーテム作成"]
E --> F["アクションアイテムの割当"]
F --> G["組織全体へ共有"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;
class G done;`,
  `flowchart TD
Q{"意思決定の場面をどう見るか"}
Q -->|"再現性が高くルール化できる"| S1["ポリシーで導く"]
Q -->|"専門知識が分散し合意形成が必要"| S2["合意形成で導く"]
Q -->|"緊急性が高く方向性の提示が必要"| S3["確信を持って導く"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class Q hub;
class S1,S2,S3 box;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 4,
  source: 10,
  practice: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    補足: 2,
    "補足：計画作成時に陥りやすい失敗": 1,
    "補足：計画プロセスにおけるアンチパターン": 1,
  },
  source: {
    ソース: 10,
  },
  practice: {
    "ベストプラクティス：コンフリクト・マイニング": 1,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "エンジニアリング統括責任者の手引き",
] as const;

defineSourceParityContract({
  suiteName: "pages/engineering-executive-playbook.vue",
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
});
