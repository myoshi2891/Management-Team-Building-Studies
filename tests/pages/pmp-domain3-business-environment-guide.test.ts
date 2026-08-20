// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/pmp-domain3-business-environment-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "PMP® Domain III: Business Environment 徹底解説ガイド",
] as const;

const EXPECTED_H2 = [
  "この記事の使い方",
  "Part 0. 用語ミニ辞典",
  "Part 1. Domain IIIの全体像を掴む",
  "Part 2. Business Environmentの8つのTaskを1つずつ理解する",
  "Part 3. 8つのTask 全体まとめ表",
  "Part 4. 学習のポイント(初学者向けTips)",
  "Part 5. 参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "1-1. PMP試験全体におけるDomain IIIの位置づけ",
  "1-2. Domain・Task・Enablerという3階層構造を理解する",
  "1-3. ECOとPMBOK® Guideの違い",
  "1-4. 開発アプローチとDomain IIIの関係",
  "Task 1. プロジェクトガバナンスの定義と確立",
  "Task 2. プロジェクトコンプライアンスの計画と管理",
  "Task 3. 変更の管理と統制",
  "Task 4. 障害物の除去と課題管理",
  "Task 5. リスクの計画と管理",
  "Task 6. 継続的改善",
  "Task 7. 組織変革の支援",
  "Task 8. 外部ビジネス環境変化の評価",
  "Task間の連携イメージ",
  "4-1. 出題形式を知っておく",
  "4-2. Domain IIIならではの視点",
  "4-3. オリジナル演習シナリオ(学習用)",
  "4-4. 他Domainとのつながりを意識する",
  "一次情報源",
  "関連情報源",
] as const;

const EXPECTED_H4 = [
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
  "Enablerの整理",
  "初学者向け解説",
  "プロセスイメージ",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/project-management-pmp",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf?rev=b618cf45573e4276a54151e7636c97bf",
  "https://www.pmi.org/standards/pmbok",
  "https://www.pmi.org/certifications/certification-resources/maintain",
  "https://www.pmi.org/certifications/certification-resources/faq",
] as const;

const EXPECTED_TOC_IDS = [
  "how-to-use",
  "glossary",
  "domain3-overview",
  "business-environment-tasks",
  "task-summary",
  "study-tips",
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
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
EXAM["PMP試験 180問 240分"] --> D1["Domain I People 33パーセント"]
EXAM --> D2["Domain II Process 41パーセント"]
EXAM --> D3["Domain III Business Environment 26パーセント"]
D3 --> T1["Task1 ガバナンスの定義と確立"]
D3 --> T2["Task2 コンプライアンスの計画と管理"]
D3 --> T3["Task3 変更の管理と統制"]
D3 --> T4["Task4 障害物の除去と課題管理"]
D3 --> T5["Task5 リスクの計画と管理"]
D3 --> T6["Task6 継続的改善"]
D3 --> T7["Task7 組織変革の支援"]
D3 --> T8["Task8 外部ビジネス環境変化の評価"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class EXAM hub;
class D1,D2,D3,T1,T2,T3,T4,T5,T6,T7,T8 box;`,
  `flowchart TB
A["プロジェクト憲章の承認"] --> B["ガバナンス構造の定義"]
B --> C["役割 責任 権限の明確化"]
C --> D["意思決定プロセスの確立"]
D --> E["報告ルールの設定"]
E --> F["エスカレーションパスの整備"]
F --> G{"しきい値を超える問題か"}
G -- はい --> H["上位ガバナンス層へエスカレーション"]
G -- いいえ --> I["プロジェクトチーム内で対応"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G box;
class H,I done;`,
  `flowchart LR
A["コンプライアンス要件の特定"] --> B["コンプライアンスカテゴリの分類"]
B --> C["潜在的な脅威の判定"]
C --> D["遵守を支援する手法の適用"]
D --> E["遵守状況の測定"]
E --> F{"非遵守が検出されたか"}
F -- はい --> G["影響分析と是正措置"]
F -- いいえ --> H["監視を継続"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;
class G,H done;`,
  `flowchart TB
A["変更の提案"] --> B["変更要求の文書化"]
B --> C["PM チームによる影響分析と評価"]
C --> C2["承認権限者 CCB スポンサー等 による審査"]
C2 --> D{"承認されたか"}
D -- 承認 --> E["承認済み変更の実装"]
D -- 却下または保留 --> F["要求者へ理由を伝達"]
E --> G["プロジェクト文書 ベースラインの更新"]
G --> H["ステークホルダーへ状況を伝達"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,C2,D box;
class E,G,H,F done;`,
  `flowchart TB
A["障害物 課題の識別"] --> B["影響度の評価"]
B --> C["優先順位付け"]
C --> D["介入戦略の決定"]
D --> E["対応の実施"]
E --> F{"リスクが顕在化したか"}
F -- はい --> G["課題ログへ登録し対応"]
F -- いいえ --> H["継続的にモニタリング"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;
class G,H done;`,
  `flowchart LR
A["リスクの特定"] --> B["リスクの分析"]
B --> C["リスク対応計画の策定"]
C --> D["リスク対応策の実行"]
D --> E["監視とコントロール"]
E --> A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`,
  `flowchart TB
A["レッスンズラーンドの収集"] --> B["改善プロセスの見直し"]
B --> C["OPAの更新"]
C --> D["次のイテレーション プロジェクトへの適用"]
D --> A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D box;`,
  `flowchart TB
A["組織文化のアセスメント"] --> B["組織変革の影響評価"]
B --> C{"プロジェクトへの影響は大きいか"}
C -- はい --> D["プロジェクト計画 チェンジ計画への反映"]
C -- いいえ --> E["通常のモニタリングを継続"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C box;
class D,E done;`,
  `flowchart TB
A["外部環境の調査 規制 技術 地政学 市場"] --> B["プロジェクトへの影響評価"]
B --> C["優先順位付け"]
C --> D{"対応が必要か"}
D -- はい --> E["変更管理 リスク管理プロセスへ連携"]
D -- いいえ --> F["継続的レビューを続行"]
E --> F
F --> A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;`,
  `flowchart LR
T8["Task8 外部環境変化"] --> T5["Task5 リスク管理"]
T5 --> T4["Task4 課題管理"]
T4 --> T3["Task3 変更管理"]
T3 --> T1["Task1 ガバナンス エスカレーション判断"]
T2["Task2 コンプライアンス"] --> T5
T7["Task7 組織変革"] --> T3
T3 --> T6["Task6 継続的改善 教訓の蓄積"]
T6 --> T1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class T8 hub;
class T5,T4,T3,T2,T7 box;
class T1,T6 done;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 8,
  note: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    "ベストプラクティス": 8,
  },
  note: {
    "補足": 2,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "PMP",
  "Domain III",
  "Business Environment",
] as const;

defineSourceParityContract({
  suiteName: "pages/pmp-domain3-business-environment-guide.vue",
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
