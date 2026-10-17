// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/itil-strategy-v5-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ITIL Strategy (Version 5) 完全学習ガイド",
] as const;

const EXPECTED_H2 = [
  "本ガイドについて",
  "1. 試験概要",
  "2. ITIL (Version 5) 全体像の中での位置づけ",
  "3. Module 1: ITIL Foundationの復習と価値創出",
  "4. Module 2: ITIL戦略の主要概念",
  "5. Module 3: 4つの側面における戦略的考慮事項",
  "6. Module 4: ITIL Strategy Management Model",
  "7. Module 5: 戦略策定サイクル(Observe-Orient-Decide-Plan)",
  "8. Module 6: 戦略実装サイクル(Plan-Execute-Synthesize-Reflect)",
  "9. Module 7: 戦略的能力(Strategic Capabilities)",
  "10. Module 8: 他フレームワークとの統合",
  "11. ベストプラクティス総括表",
  "12. 試験対策のポイント",
  "13. 参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "学習内容の全体像",
  "2.1 ITIL (Version 5) が作られた理由",
  "2.2 ITIL (Version 5) の主要な変更点",
  "2.3 ITIL Product and Service Lifecycle(8段階)",
  "2.4 Strategic Leaderパスにおける位置づけ",
  "3.1 デジタル製品・デジタルサービスの定義",
  "3.2 バリューチェーン活動と価値共創",
  "4.1 戦略・ビジネス戦略・デジタル戦略",
  "4.2 ミッション・ビジョン・パーパス",
  "4.3 VUCA環境",
  "4.4 効果的な戦略の特性",
  "4.5 ビジネスモデルとオペレーティングモデル",
  "5.1 組織と人材",
  "5.2 パートナーとサプライヤー",
  "5.3 情報と技術",
  "5.4 バリューストリームとプロセス",
  "5.5 PESTLE要因との関係",
  "6.1 モデルの目的と全体構造",
  "6.2 2つのサイクルの関係性",
  "7.1 Observe(観察)",
  "7.2 Orient(方向づけ)",
  "7.3 Decide(意思決定)",
  "7.4 Plan(計画)",
  "7.5 ガイディングプリンシプルとの関係",
  "7.6 内部ケイパビリティとリソースの影響",
  "8.1 Plan(実装計画)",
  "8.2 Execute(実行)",
  "8.3 Synthesize(統合)",
  "8.4 Reflect(振り返り)",
  "9.1 リーダーシップ",
  "9.2 ガバナンス",
  "9.3 組織的整合性",
  "9.4 継続的改善と組織学習",
  "9.5 レジリエンスと適応力",
  "10.1 ITILとDevOpsの補完関係",
  "10.2 プロジェクトマネジメントとPRINCE2との関係",
  "12.1 出題されやすいポイント",
  "12.2 オープンブックの活用戦略",
  "12.3 学習の進め方(推奨シーケンス)",
] as const;

const EXPECTED_H4 = [
  "公式情報源",
  "認定トレーニングパートナーのコースアウトライン",
  "解説記事・関連情報源",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-strategy-version-5-4175",
  "https://itsmacademy.com/press-room/itil-version-5/",
  "https://www.innovativelearning.eu/news-resources/free-resources/downloads/itil-strategy-version-5.html",
  "https://www.qa.com/course-catalogue/courses/itil-strategy-version-5-itil5str/",
  "https://academy.asseco.pl/szkolenie/itil-strategy-wersja-5-in-english/",
  "https://www.tieturi.fi/tuote/itil-strategy/",
  "https://www.itil.org.uk/training/itil-strategic-leader-sl/itil-strategy-certification-training-course",
  "https://www.ib-formation.fr/formations/gouvernance-des-si-referentiels/itil-strategy-version-5",
  "https://itsm.tools/itil-version-5-explained-key-changes-lifecycle-ai-governance/",
  "https://nex-arc-learning.com/peoplecert/itilfnd-v5/study-guide/cheat-sheet/",
  "https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation/",
  "https://www.teamdynamix.com/blog/an-introduction-to-the-itil-framework/",
  "https://www.diontraining.com/blogs/news/itil-5-process",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-foundation-whats-new-guide",
  "https://www.vivantio.com/blog/https-blog-vivantio-com-itil-best-practices-viv/",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "exam-overview",
  "itil-v5-context",
  "foundation-review",
  "key-concepts",
  "four-dimensions",
  "strategy-management-model",
  "strategy-development-cycle",
  "strategy-implementation-cycle",
  "strategic-capabilities",
  "framework-integration",
  "best-practices-summary",
  "exam-tips",
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
  practice: 4,
  source: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 3 },
  practice: { "ベストプラクティス": 4 },
  source: { "ソース": 1 },
} as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
D1["Discover 機会発見・需要理解"]
D2["Design 解決策の設計"]
D3["Acquire 資源の調達"]
D4["Build 構築・実装"]
D5["Transition 本番移行"]
D6["Operate 基盤の稼働維持"]
D7["Deliver 利用者への価値提供"]
D8["Support インシデント対応"]
D1 --> D2 --> D3 --> D4 --> D5 --> D6 --> D7 --> D8
D8 -.->|"フィードバック"| D1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1,D2,D3,D4 box;
class D5,D6 hub;
class D7,D8 done;`,

  `flowchart TB
BS["ビジネス戦略 組織全体の目標と達成方法"]
DS["デジタル戦略 デジタル技術の活用方法"]
OP["製品・サービス戦略 個別の実行計画"]
BS --> DS --> OP
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class BS hub;
class DS box;
class OP done;`,

  `flowchart TB
V["Volatility 変動性 変化の速さ・振れ幅が大きい"]
U["Uncertainty 不確実性 将来の予測が困難"]
C["Complexity 複雑性 要因が相互に絡み合う"]
A["Ambiguity 曖昧性 因果関係が不明瞭"]
CENTER["VUCA環境における戦略"]
V --> CENTER
U --> CENTER
C --> CENTER
A --> CENTER
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class V,C box;
class U,A box;
class CENTER hub;`,

  `flowchart TB
STRAT["戦略的意図 Strategic Intent"]
OP["組織と人材 文化・構造・ケイパビリティ"]
PS["パートナーとサプライヤー ソーシング・関係性"]
IT["情報と技術 イノベーション・データ活用"]
VS["バリューストリームとプロセス 設計・最適化"]
STRAT --> OP
STRAT --> PS
STRAT --> IT
STRAT --> VS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class OP,PS,IT,VS box;
class STRAT hub;`,

  `flowchart TB
subgraph PESTLE["外部環境要因 PESTLE"]
direction LR
P["Political"]
E["Economic"]
S["Social"]
T["Technological"]
L["Legal"]
EN["Environmental"]
end
FD["4つの側面 組織・人材、パートナー・サプライヤー、情報・技術、バリューストリーム・プロセス"]
VALUE["価値創出への影響"]
PESTLE --> FD
FD --> VALUE
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P,E,S,T,L,EN box;
class FD hub;
class VALUE done;`,

  `flowchart TB
subgraph DEV["戦略策定サイクル Strategy Development Cycle"]
direction LR
O1["Observe 観察"]
O2["Orient 方向づけ"]
O3["Decide 意思決定"]
O4["Plan 計画"]
O1 --> O2 --> O3 --> O4
end
subgraph IMP["戦略実装サイクル Strategy Implementation Cycle"]
direction LR
I1["Plan 計画"]
I2["Execute 実行"]
I3["Synthesize 統合"]
I4["Reflect 振り返り"]
I1 --> I2 --> I3 --> I4
end
O4 -->|"戦略的方向性を引き渡す"| I1
I4 -.->|"学習を策定サイクルへ還元"| O1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class O1,O2,O3,O4 box;
class I1,I2,I3,I4 hub;`,

  `flowchart LR
O["Observe 観察 外部・内部環境の情報収集"]
R["Orient 方向づけ 情報の解釈と意味づけ"]
D["Decide 意思決定 優先順位と選択肢の決定"]
P["Plan 計画 戦略的方向性の文書化"]
O --> R --> D --> P
P -.->|"次の観察へ"| O
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class O,R box;
class D hub;
class P done;`,

  `flowchart LR
P["Plan 実装計画 目標からイニシアチブへの翻訳"]
E["Execute 実行 選定したアプローチでの遂行"]
S["Synthesize 統合 変化と既存運用のバランス"]
R["Reflect 振り返り 持続可能性と長期的妥当性の維持"]
OBS["Observe 観察（策定サイクル） 外部・内部環境の情報収集"]
P --> E --> S --> R
R -.->|"策定サイクルへの学習還元"| OBS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P,E,S hub;
class R done;
class OBS box;`,

  `flowchart TB
CAP["戦略的能力 Strategic Capabilities"]
LEAD["リーダーシップ 方向性の提示と動機づけ"]
GOV["ガバナンス 意思決定の枠組みと説明責任"]
ALIGN["組織的整合性 戦略と実行部隊の接続"]
LEARN["継続的改善と組織学習 Reflectの学びを制度化"]
RES["レジリエンスと適応力 変化への耐性と回復力"]
CAP --> LEAD
CAP --> GOV
CAP --> ALIGN
CAP --> LEARN
CAP --> RES
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class LEAD,GOV,ALIGN,LEARN,RES box;
class CAP hub;`,

  `flowchart LR
ITIL["ITIL 何を・なぜ・誰のために 価値の方向性"]
DEVOPS["DevOps どう速く安全に届けるか フロー・自動化"]
PM["プロジェクト・PRINCE2 どう統制して実行するか 統治・段階管理"]
ITIL <--> DEVOPS
ITIL <--> PM
DEVOPS -.->|"協調"| PM
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class ITIL hub;
class DEVOPS box;
class PM done;`,

  `flowchart LR
S1["① Foundation復習 Module 1"]
S2["② 用語の正確な理解 Module 2"]
S3["③ 4つの側面とPESTLE Module 3"]
S4["④ Strategy Management Modelの全体像 Module 4"]
S5["⑤ 策定・実装サイクルの各活動を精読 Module 5・6"]
S6["⑥ 戦略的能力と他フレームワーク統合 Module 7・8"]
S7["⑦ 公式問題集で時間配分の練習"]
S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3 box;
class S4,S5 hub;
class S6,S7 done;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/itil-strategy-v5-guide.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: [],
  h6: [],
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: [],
  seoTitleFragments: ["ITIL Strategy", "Version 5"],
  seoTitle: "ITIL Strategy (Version 5) 完全学習ガイド | Strategic Leaderパス試験対策",
  seoDescription: "PeopleCert ITIL Strategy (Version 5)資格試験の全体像を、8モジュールの学習目標・Strategy Management Model・ベストプラクティスとともに解説する非公式学習ガイド。",
  allowedHeadingSkips: ["h2 -> h4"],
});

const mountPage = createMountPage(Page);

describe("pages/itil-strategy-v5-guide.vue — 個別検証", () => {
  it("サイドバー目次と主要セクションの対応関係を保持する", () => {
    const wrapper = mountPage();
    const navHrefs = wrapper
      .findAll(".sidebar-nav a")
      .map((el) => el.attributes("href"));
    for (const id of EXPECTED_TOC_IDS) {
      expect(navHrefs).toContain(`#${id}`);
      expect(wrapper.find(`#${id}`).exists()).toBe(true);
    }
  });

  it("統計カードが 4 件表示される", () => {
    const wrapper = mountPage();
    const statCards = wrapper.findAll(".stat-card");
    expect(statCards).toHaveLength(4);
  });
});
