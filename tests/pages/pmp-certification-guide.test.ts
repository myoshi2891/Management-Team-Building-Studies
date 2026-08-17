// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/pmp-certification-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "PMP®(Project Management Professional)認定試験 完全攻略ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "PMP資格とは何か",
  "PMP取得までのロードマップ",
  "受験資格要件(Eligibility Requirements)",
  "試験の全体像",
  "Domain I: People",
  "Domain II: Process",
  "Domain III: Business Environment",
  "PMI Talent Triangle®と資格維持(PDU / CCRプログラム)",
  "初学者向け 学習ロードマップの提案",
  "初学者がつまずきやすいポイントとベストプラクティスまとめ",
  "2026年7月改定ECOの主な変更点(まとめ)",
  "頻出用語集",
  "参考文献・出典一覧",
] as const;

// 参考文献セクションの h4 4 件を a11y 基準（Q-3）に従い h3 に昇格させ全 44 件
const EXPECTED_H3 = [
  "CAPM®との違い",
  "学歴・実務経験の4パターン",
  "商業研修(35時間)要件",
  "CAPM®保持者への優遇措置",
  "プロジェクト経験の数え方(重複月のカウント方法)",
  "申請時のベストプラクティス",
  "試験形式",
  "出題形式(2026年7月改定で新設された形式を含む)",
  "出題領域(Domain)と配点比率",
  "開発アプローチ(予測型 / アジャイル / ハイブリッド)の出題比率",
  "受験方法と再受験ポリシー",
  "Task 1: 共通ビジョンの構築(Develop a common vision)",
  "Task 2: 対立の管理(Manage conflicts)",
  "Task 3: プロジェクトチームのリード(Lead the project team)",
  "Task 4: ステークホルダーの関与(Engage stakeholders)",
  "Task 5: ステークホルダーの期待の整合(Align stakeholder expectations)",
  "Task 6: ステークホルダーの期待の管理(Manage stakeholder expectations)",
  "Task 7: 知識移転の促進(Help ensure knowledge transfer)",
  "Task 8: コミュニケーションの計画と管理(Plan and manage communication)",
  "Task 1: 統合プロジェクトマネジメント計画の策定とデリバリー計画(Develop an integrated project management plan and plan delivery)",
  "Task 2: プロジェクトスコープの策定と管理(Develop and manage project scope)",
  "Task 3: 価値に基づくデリバリーの促進(Help ensure value-based delivery)",
  "Task 4: 資源の計画と管理(Plan and manage resources)",
  "Task 5: 調達の計画と管理(Plan and manage procurement)",
  "Task 6: 財務の計画と管理(Plan and manage finance)",
  "Task 7: 成果物の品質計画と最適化(Plan and optimize quality of products/deliverables)",
  "Task 8: スケジュールの計画と管理(Plan and manage schedule)",
  "Task 9: プロジェクト状況の評価(Evaluate project status)",
  "Task 10: プロジェクトクロージャーの管理(Manage project closure)",
  "Task 1: プロジェクトガバナンスの定義と確立(Define and establish project governance)",
  "Task 2: プロジェクトコンプライアンスの計画と管理(Plan and manage project compliance)",
  "Task 3: 変更の管理と統制(Manage and control changes)",
  "Task 4: 障害の除去と課題管理(Remove impediments and manage issues)",
  "Task 5: リスクの計画と管理(Plan and manage risk)",
  "Task 6: 継続的改善(Continuous improvement)",
  "Task 7: 組織変革の支援(Support organizational change)",
  "Task 8: 外部ビジネス環境変化の評価(Evaluate external business environment changes)",
  "PMI Talent Triangle®とは",
  "資格維持要件(CCR: Continuing Certification Requirements)",
  "学習時のポイント",
  "PMI公式 資格・試験情報",
  "PMI標準・プラクティスガイド",
  "資格維持・研修",
  "受験ロジスティクス",
] as const;

// 26 タスク直下の「主な行動要素(Enablers)」見出し全 26 件
const EXPECTED_H4 = [
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
  "主な行動要素(Enablers)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/project-management-pmp",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf",
  "https://www.pmi.org/global-accreditation-center/",
  "https://www.pmi.org/learning/authorized-training-partners",
  "https://www.pmi.org/certifications/certified-associate-capm",
  "https://www.pearsonvue.com/us/en/pmi.html",
  "https://www.pearsonvue.com/us/en/pmi/onvue.html",
  "https://www.pmi.org/certifications/certification-resources/accommodations",
  "https://www.pmi.org/standards/pmbok",
  "https://www.pmi.org/certifications/certification-resources/maintain/talent-triangle",
  "https://www.pmi.org/standards/agile",
  "https://www.pmi.org/pmbok-guide-standards/practice-guides/change",
  "https://www.pmi.org/standards/risk-management",
  "https://www.pmi.org/certifications/certification-resources/maintain",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "what-is-pmp",
  "roadmap",
  "eligibility",
  "exam-format",
  "domain-people",
  "domain-process",
  "domain-business",
  "talent-triangle",
  "study-roadmap",
  "pitfalls",
  "eco-changes",
  "glossary",
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

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
    A["Prepare<br/>受験資格の確認"] --> B["Apply<br/>PMIへ申請"]
    B --> C["Study<br/>ECOに沿った学習"]
    C --> D["Earn<br/>受験して合格する"]
    D --> E["Maintain<br/>PDU取得で資格を維持"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`,
  `pie showData title 出題領域別 配点比率
    "People" : 33
    "Process" : 41
    "Business Environment" : 26`,
  `pie showData title 開発アプローチ別 出題比率
    "予測型" : 40
    "アジャイル・ハイブリッド" : 60`,
  `flowchart LR
    A["Identify<br/>ステークホルダーの特定"] --> B["Analyze<br/>関心度と影響力の分析"]
    B --> C["Plan<br/>エンゲージメント計画の策定"]
    C --> D["Engage<br/>計画の実行とコミュニケーション"]
    D --> E["Monitor<br/>満足度と関与度のモニタリング"]
    E -.->|"変化を検知したら再分析"| B

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,C,D,E hub;`,
  `flowchart LR
    A["調達計画<br/>Plan Procurement"] --> B["ソリシテーション<br/>Solicit and Select Sellers"]
    B --> C["交渉と契約締結<br/>Negotiate and Award"]
    C --> D["調達の実行と統制<br/>Administer and Control"]
    D --> E["調達クロージャー<br/>Close Procurement"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`,
  `flowchart TB
    A["成果物の受け入れ確認"] --> B["移行準備状況の検証<br/>運用チームまたは次フェーズへ"]
    B --> C["最終レッスンズラーンドと<br/>レトロスペクティブ実施"]
    C --> D["調達・財務・資源のクローズ"]
    D --> E["ステークホルダーからの<br/>正式な受け入れサインオフ"]
    E --> F["文書とOPAとしてアーカイブ"]

    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,F done;`,
  `flowchart LR
    A["変更要求の提出<br/>Change Request"] --> B["影響分析<br/>スコープ・コスト・スケジュール・リスクへの影響評価"]
    B --> C{"CCB変更管理委員会<br/>による審査"}
    C -->|"承認"| D["ベースラインの更新<br/>関連文書の改訂"]
    C -->|"却下"| E["却下理由の文書化"]
    D --> F["ステークホルダーへの<br/>変更内容の周知"]
    E --> F

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,D,E,F box;
    class C hub;`,
  `flowchart LR
    A["リスクの識別<br/>Identify Risks"] --> B["定性的リスク分析<br/>発生確率と影響度"]
    B --> C["定量的リスク分析<br/>必要な場合のみ"]
    C --> D["リスク対応計画<br/>回避・転嫁・軽減・受容・活用・共有・強化"]
    D --> E["リスク対応の実行"]
    E --> F["リスクの監視と再評価"]
    F -.->|"新たなリスクを検知"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,F box;`,
  `flowchart TB
    A["Step 1<br/>ECO全体をざっと読み<br/>3ドメイン26タスクの全体像を掴む"] --> B["Step 2<br/>配点が最大のProcessドメインから基礎を学習"]
    B --> C["Step 3<br/>Peopleドメインを学習<br/>ステークホルダーとコミュニケーション"]
    C --> D["Step 4<br/>Business Environmentドメインを学習<br/>ガバナンスとリスク管理"]
    D --> E["Step 5<br/>予測型・アジャイル・ハイブリッドの<br/>横断的な比較整理"]
    E --> F["Step 6<br/>公式サンプル問題と模試で<br/>シナリオ形式に慣れる"]
    F --> G["Step 7<br/>弱点ドメインを重点復習し受験申込へ"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,F,G box;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 4,
  source: 44,
  practice: 28,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    補足: 4,
  },
  source: {
    ソース: 44,
  },
  practice: {
    ベストプラクティス: 28,
  },
} as const;

const EXPECTED_STEP_TAGS = ["1", "2", "3", "4", "5"] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "PMP",
  "認定試験",
] as const;

defineSourceParityContract({
  suiteName: "pages/pmp-certification-guide.vue",
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
