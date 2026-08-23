// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/your-first-60-days-as-a-leader.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "リーダーとしての最初の60日間",
] as const;

const EXPECTED_H2 = [
  "はじめに:なぜ「最初の60日間」が重要なのか",
  "全体像:60日間のロードマップ",
  "土台となる考え方",
  "フェーズ0:就任前の準備(Day -14〜0)",
  "フェーズ1:最初の10日間 ― オープニング・ギャンビット",
  "フェーズ2:11日目〜30日目 ― 一体感と一貫性をつくる",
  "フェーズ3:31日目〜60日目 ― アジェンダを始動する",
  "1on1ミーティングのベストプラクティス",
  "心理的安全性:チームの土台をつくる",
  "AIを思考パートナーとして活用する",
  "よくある失敗とその回避策",
  "60日間チェックリスト",
  "まとめ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "3-1. リードすることとマネジメントすることの違い",
  "3-2. STARSモデルで「自分が置かれた状況」を診断する",
  "3-3. 利害に基づく交渉のマインドセット",
  "やるべきこと",
  "避けるべきこと",
  "ステップ1: 上司との「5つの対話」を行う",
  "ステップ2: チームメンバー全員と1対1で対話する",
  "ステップ3: 主要ステークホルダーとの対話",
  "この時期の心得",
  "ステップ1: チームの現状を「構造化して」診断する",
  "ステップ2: 共通の目的・価値観を言語化する",
  "ステップ3: 小さな改善アクションに着手する",
  "この時期の心得",
  "ステップ1: 優先事項を絞り込む",
  "ステップ2: 早期の成果(クイックウィン)を可視化する",
  "ステップ3: 60日間を振り返り、次の90日計画に接続する",
  "実践のポイント",
  "質問のフレームワーク例",
  "新任リーダーが最初の60日間でできること",
  "具体的な活用例",
  "AIに情報を渡すときのルール",
  "出典一覧",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
Start["リーダー就任が決定"] --> H0["フェーズ0 就任前の準備 Day -14〜0"]
H0 --> P0A["現状把握のための情報収集"]
P0A --> P0B["前任者・上司との対話"]
P0B --> P0C["初日メッセージの準備"]
P0C --> H1["フェーズ1 最初の10日間"]
H1 --> P1A["チーム全員との1on1"]
P1A --> P1B["上司との期待値のすり合わせ"]
P1B --> P1C["主要ステークホルダーとの対話"]
P1C --> H2["フェーズ2 11日目〜30日目"]
H2 --> P2A["チーム全体の現状診断"]
P2A --> P2B["共通の目的・価値観の言語化"]
P2B --> P2C["初期の改善アクション着手"]
P2C --> H3["フェーズ3 31日目〜60日目"]
H3 --> P3A["中長期の優先事項を確定"]
P3A --> P3B["早期の成果を可視化"]
P3B --> P3C["60日振り返りと次の90日計画"]
P3C --> End["継続的なリーダーシップへ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Start,P0A,P0B,P0C,P1A,P1B,P1C,P2A,P2B,P2C,P3A,P3B,P3C box;
class H0,H1,H2,H3 hub;
class End done;`,
  `flowchart TB
A["現職の引き継ぎ計画を立てる"] --> B["組織図・チーム構成を調べる"]
B --> C["直近の成果物・ドキュメントに目を通す"]
C --> D["前任者・現上司と1対1で対話する"]
D --> E["初日に伝えるメッセージを準備する"]
E --> F["Day 0 正式に就任"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F done;`,
  `flowchart TB
A["Day 1 顔合わせと就任メッセージの発信"] --> B["上司との期待値のすり合わせ"]
B --> C["チームメンバー全員との1on1を開始"]
C --> D["主要ステークホルダーとの対話"]
D --> E["チームの共通の利害・課題を発見する"]
E --> F["初期の合意事項を言語化して共有する"]
F --> G["Day 10 最初の振り返り"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class B,C,D,E,F box;
class A hub;
class G done;`,
  `flowchart TB
A["優先事項を3〜5個に絞る"] --> B["各優先事項にオーナーと期限を設定"]
B --> C["クイックウィンを1つ以上実行"]
C --> D["進捗を上司・チームに可視化"]
D --> E["60日振り返りミーティングを実施"]
E --> F["次の90日計画を策定"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class B,C,D,E box;
class A hub;
class F done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/your-first-60/0642572367008/",
  "https://leaddev.com/career-development/your-30-60-90-day-plan-new-manager",
  "https://leaddev.com/leadership/learnings-my-first-90-days-engineering-manager",
  "https://leaddev.com/hiring/four-mistakes-i-made-new-manager",
  "https://getlighthouse.com/blog/camille-fournier-lessons-managers-path/",
  "https://skamille.medium.com/following-the-managers-path-50e184cde1ff",
  "https://www.juliezhuo.com/book/manager.html",
  "https://thefutureorganization.com/becoming-a-manager-what-to-do-when-everyone-looks-to-you/",
  "https://readingraphics.com/book-summary-the-first-90-days/",
  "https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness",
  "https://www.patkua.com/blog/project-aristotle/",
  "https://www.crackingtheeminterview.com/p/your-first-90-days-as-an-engineering",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "roadmap",
  "foundations",
  "phase0-prep",
  "phase1-first-10-days",
  "phase2-cohesion",
  "phase3-agenda",
  "one-on-ones",
  "psychological-safety",
  "ai-thought-partner",
  "common-mistakes",
  "checklist",
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
  note: 5,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { 補足: 5 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const SEO_TITLE_FRAGMENTS = [
  "リーダーとしての最初の60日間",
  "完全ガイド",
] as const;

defineSourceParityContract({
  suiteName: "pages/your-first-60-days-as-a-leader.vue",
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
