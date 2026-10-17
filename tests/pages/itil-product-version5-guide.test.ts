// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/itil-product-version5-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ITIL® Product (Version 5) 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "ITIL Product (Version 5)とは何か",
  "試験概要と出題形式",
  "基礎概念:デジタルプロダクトとサービス(Category 1)",
  "ITIL Product and Service Lifecycle Model全体像",
  "Discover(発見)活動",
  "Design(設計)活動",
  "Acquire(調達)活動",
  "Build(構築)活動",
  "Transition(移行)活動",
  "Operate(運用)活動",
  "Deliver(提供)活動",
  "Support(サポート)活動",
  "ライフサイクル全体のマネジメント(Category 10.1)",
  "ITIL・AI・他フレームワークとの関係(Category 10.2)",
  "学習・試験対策チェックリスト",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "資格の位置づけ",
  "対象者とキャリアパス",
  "受験前提条件(Entry Requirements)",
  "なぜこのモジュールが生まれたのか(Why It Matters)",
  "試験の基本仕様",
  "Bloom's Levelの考え方",
  "出題タイプ(Question Types)",
  "出題カテゴリ(Exam Specification)",
  "プロダクトとサービスの定義",
  "デジタルプロダクトの特徴",
  "価値創出のメカニズム(価値共創)",
  "ITIL Product and Service Lifecycle Modelの目的と範囲",
  "バリューチェーン活動とライフサイクルの関係",
  "各活動の一覧と目的(概要)",
  "目的と主要概念",
  "ステップとアウトプット",
  "Discoverを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "目的と主要概念",
  "ステップとアウトプット",
  "Designを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "目的と主要概念",
  "ステップとアウトプット",
  "Acquireを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "目的と主要概念",
  "ステップとアウトプット",
  "Buildを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "目的と主要概念",
  "ステップとアウトプット",
  "Transitionを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "目的と主要概念",
  "ステップとアウトプット",
  "Operateを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "目的と主要概念",
  "ステップとアウトプット",
  "Deliverを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "目的と主要概念",
  "ステップとアウトプット",
  "Supportを支える代表的プラクティス(例)",
  "成功要因(CSF)とメトリクス(例)",
  "プロダクトベンダー視点でのメリットと課題",
  "オペレーティングモデルと責任分担",
  "プロダクトベンダーのバリューストリーム",
  "バリューストリームがライフサイクル段階を統合する方法",
  "組織・テクノロジーイネーブルメント",
  "デジタルプロダクトマネジメント成功要因(横断的まとめ)",
  "プロダクトマネジメントを支える組織構造",
  "ITIL AI Capability Model(6Cモデル)",
  "AIがプロダクトマネジメントを支援する方法",
  "AI・自動化が手法とツールに与える影響",
  "ITILとDevOpsの補完関係",
  "ITILとPRINCE2の補完関係",
  "学習の進め方(推奨ステップ)",
  "チェックリスト",
  "よくあるつまずきポイント",
] as const;

const EXPECTED_H4 = [
  "公式情報源(PeopleCert / ITIL公式)",
  "認定研修プロバイダー・専門メディアによる解説記事",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "what-is-itil-product",
  "exam-format",
  "basic-concepts",
  "lifecycle-overview",
  "discover",
  "design",
  "acquire",
  "build",
  "transition",
  "operate",
  "deliver",
  "support",
  "lifecycle-management",
  "ai-and-frameworks",
  "study-checklist",
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
  "SECTION 15",
  "SECTION 16",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-product-version-5-4179",
  "https://www.itil.com/professionals/certifications/ITIL-Product-Version-5",
  "https://www.theknowledgeacademy.com/blog/itil-certification-path/",
  "https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf",
  "https://www.oxfordcollegeoftechnology.com/itil-version-5/itil-product-version-5/",
  "https://itsm.tools/itil-version-5-vs-itil-4-key-changes/",
  "https://www.teamdynamix.com/blog/an-introduction-to-the-itil-framework/",
  "https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation/",
  "https://www.diontraining.com/blogs/news/itil-5-process",
  "https://blog.invgate.com/itil-5-what-changes",
  "https://www.theknowledgeacademy.com/courses/itil-training/itil-5-managing-professional-transition-training-course/",
  "https://www.pmgacademy.com/en/articles/itil/information-and-technology-in-itil-version-5-the-guide-for-the-ai-era-and-data-governance/",
  "https://agilepmhub.com/itil-ai-governance",
  "https://itecor.com/a-new-itil-so-what/",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-experience-user-experience",
  "https://certempire.com/itil-4-vs-itil-5/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
Q["出題される設問"] --> S{"どの形式か"}
S -->|"通常の4択"| A["Standard: 設問+4択から1つ選択"]
S -->|"否定形の設問"| B["Negative: NOTを含む設問文で誤りでない選択肢を除外"]
S -->|"穴埋め"| C["Missing word: 文中の空欄に入る語句を選択"]
S -->|"正しい記述の組合せ"| D["List: 4項目中、正しい2項目の組合せを選択"]`,
  `flowchart LR
subgraph PRODUCT["プロダクト志向が強い活動"]
direction LR
DIS["Discover 発見"] --> DES["Design 設計"] --> ACQ["Acquire 調達"] --> BLD["Build 構築"]
end
subgraph BRIDGE["橋渡しの活動"]
direction LR
TRA["Transition 移行"] --> OPE["Operate 運用"]
end
subgraph SERVICE["サービス志向が強い活動"]
direction LR
DEL["Deliver 提供"] --> SUP["Support サポート"]
end
BLD --> TRA
OPE --> DEL
SUP -.->|"フィードバック"| DIS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class DIS,DES,ACQ,BLD box
class TRA,OPE hub
class DEL,SUP done`,
  `flowchart TB
A["機会・課題の特定 (市場動向・利用者の声・データ分析)"] --> B["ビジョン/ポジショニング/ ポートフォリオと照合"]
B --> C["仮説の設定 (誰に・何を・なぜ)"]
C --> D["初期評価 (実現可能性・市場性・戦略適合度)"]
D --> E["優先順位付けと合意形成"]
E --> F(("アウトプット: 検証済み機会・ プロダクトコンセプト"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart TB
A["要件の具体化 (機能/非機能)"] --> B["ソリューション設計 (アーキテクチャ・UX)"]
B --> C["プロトタイプ/ 詳細仕様の作成"]
C --> D["リスク・セキュリティ・ コンプライアンス評価"]
D --> E["設計レビューと承認"]
E --> F(("アウトプット: 詳細設計仕様・ アーキテクチャ決定"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart TB
A["必要リソースの特定 (技術/人材/サードパーティ)"] --> B["Make/Buy/Partner の意思決定"]
B --> C["サプライヤー評価・ 調達先の選定"]
C --> D["契約・SLA・ 条件の合意"]
D --> E["オンボーディングと 受け入れ確認"]
E --> F(("アウトプット: 利用可能なリソース・ サプライヤー契約"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart TB
A["設計仕様の 実装計画への分解"] --> B["コンポーネントの 開発・構成・組み立て"]
B --> C["自動化されたテスト (単体/結合/セキュリティ)"]
C --> D["技術的負債の 可視化と管理"]
D --> E["品質ゲートの通過確認"]
E --> F(("アウトプット: テスト済みビルド成果物"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart TB
A["移行計画とリスク評価"] --> B["移行アプローチの選定 (一括/段階的/並行稼働)"]
B --> C["リハーサル・ 移行テスト"]
C --> D["運用準備状況の確認 (Operational Readiness)"]
D --> E["本番移行の実行"]
E --> F(("アウトプット: 本番稼働状態・ 移行記録"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart TB
A["監視・オブザーバビリティ の実装"] --> B["キャパシティ・ 可用性の計画"]
B --> C["日常運用 (パフォーマンス管理)"]
C --> D["異常検知と 自動対応/エスカレーション"]
D --> E["継続性計画の維持 (Continuity Planning)"]
E --> F(("アウトプット: 安定稼働・ 運用データ"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart TB
A["提供チャネル・ アクセス方法の確定"] --> B["エンタイトルメント/ アクセス権の管理"]
B --> C["サービスリクエストの 受付と履行"]
C --> D["SLA/合意水準に 基づく提供"]
D --> E["利用状況の可視化"]
E --> F(("アウトプット: 利用可能な状態のプロダクト・ 履行済みリクエスト"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart TB
A["問い合わせ・ インシデントの受付"] --> B["トリアージと 優先順位付け"]
B --> C["診断と解決 (または回避策の提供)"]
C --> D["根本原因分析 (Problem Management)"]
D --> E["ナレッジの 蓄積とフィードバック"]
E --> F(("アウトプット: 解決済みインシデント・ ナレッジベース更新"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`,
  `flowchart LR
S(("開始: 利用者からの 改善要望")) --> D1["Discover (機会の検証)"]
D1 --> D2["Design (解決策の設計)"]
D2 --> B1["Build (実装とテスト)"]
B1 --> T1["Transition (段階的リリース)"]
T1 --> DL1["Deliver (利用者への公開)"]
DL1 --> E(("完了: 価値の実現"))
DL1 -.->|"利用データ"| D1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
class D1,D2,B1,T1,DL1 box
class S,E hub`,
  `flowchart LR
S2(("開始: インシデント発生")) --> SU["Support (トリアージ・診断)"]
SU --> O1["Operate (復旧措置)"]
O1 --> SU2["Support (根本原因分析)"]
SU2 --> E2(("完了: 正常状態への復帰・ 再発防止"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
class SU,O1,SU2 box
class S2,E2 hub`,
  `flowchart TB
S1["Step 1 ITIL Foundation (V5)の 用語を再確認する"] --> S2["Step 2 Category 1: 基礎概念を固める"]
S2 --> S3["Step 3 8活動を1つずつ (目的→ステップ→CSF)の順に学習"]
S3 --> S4["Step 4 Category 10: バリューストリーム/AI/DevOps/PRINCE2で統合"]
S4 --> S5["Step 5 Car Rental Scenarioで シナリオ演習"]
S5 --> S6["Step 6 Sample Papersで 4つの出題形式に慣れる"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
class S1,S2,S3,S4,S5,S6 box`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 13,
  source: 14,
  note: 4,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 13,
  },
  source: {
    ソース: 14,
  },
  note: {
    補足: 4,
  },
} as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  suiteName: "pages/itil-product-version5-guide.vue",
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
  stepTags: [],
  seoTitleFragments: ["ITIL® Product (Version 5)", "完全ガイド"],
  seoTitle: "ITIL® Product (Version 5) 完全ガイド | デジタルプロダクトを統合バリューストリームでマネジメントする",
  seoDescription:
    "PeopleCert公式シラバス(Version 5.0 PL)に基づく、ITIL Product (Version 5)の初学者向け学習ガイド。8つのライフサイクル活動とAI Capability Modelを解説。",
});

describe("pages/itil-product-version5-guide.vue — 固有契約", () => {
  it("ヒーロー領域に統計カードが4枚存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
  });
});
