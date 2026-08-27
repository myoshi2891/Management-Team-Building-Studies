// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/ai-driven-project-management-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "AI駆動プロジェクトマネジメント実践ガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "AI駆動プロジェクトマネジメント(AI-PM)とは何か",
  "全体像:導入までのロードマップ",
  "ステップ0:現状を棚卸しする",
  "ステップ1:ユースケースを選ぶ",
  "ステップ2:適切なツール・AIエージェントを選定する",
  "ステップ3:Human-in-the-Loopガバナンスを設計する",
  "ステップ4:プロンプトエンジニアリングの基礎",
  "ステップ5:エージェント型ワークフローを実践する",
  "ステップ6:リスク管理と倫理的配慮",
  "ステップ7:効果を計測し、スケールする",
  "よくある失敗パターンと回避策",
  "30・60・90日 導入ロードマップ",
  "まとめ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "定義",
  "なぜ今重要なのか",
  "従来型PMとAI駆動PMの違い",
  "チェックリスト",
  "PM知識エリア × AI活用の相性表",
  "選定の優先順位づけの目安",
  "代表的なツール・エージェントの比較",
  "選定時に確認すべき観点",
  "リスクの大きさに応じたエスカレーション設計例",
  "良いプロンプトの構成要素",
  "実践例",
  "実務者コミュニティからの知見",
  "主なリスクと対策",
  "スケール時につまずきやすいポイント",
  "KPIの設計例",
  "書籍",
  "業界標準・専門機関",
  "エンジニアリング・開発者コミュニティ(著名な発信者)",
  "調査レポート・市場分析",
] as const;

const EXPECTED_H4 = [
  "リスクブレインストーミング",
  "ステータスレポートの下書き",
  "議事録からのアクションアイテム抽出",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["Step 0 現状診断 ワークフローとデータ品質を棚卸し"] --> B["Step 1 ユースケース選定 痛みが大きい業務から着手"]
    B --> C["Step 2 ツールまたはエージェント選定"]
    C --> D["Step 3 ガバナンス設計 人間の関与ポイントを定義"]
    D --> E["Step 4 小規模パイロット運用"]
    E --> F{"成果は出ているか"}
    F -- "Yes" --> G["Step 5 チーム標準へ展開"]
    F -- "No" --> H["Step 6 ワークフローを再設計"]
    H --> E
    G --> I["Step 7 全社スケールと継続計測"]
    I --> D

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,G,H box;
    class F hub;
    class I done;`,
  `flowchart TB
    Hub1["8つの指導原則"] --> P1["戦略的価値"]
    P1 ~~~ P2["リスク管理"]
    P2 ~~~ P3["ガバナンスとコンプライアンス"]
    P3 ~~~ P4["人材と組織文化"]
    P4 ~~~ P5["倫理と専門的責任"]
    P5 ~~~ P6["ステークホルダーエンゲージメント"]
    P6 ~~~ P7["最適化とイノベーション"]
    P7 ~~~ P8["データ品質"]
    P8 --> Hub2["5つのパフォーマンス領域"]
    Hub2 --> D1["ステークホルダー期待値の管理"]
    D1 ~~~ D2["AI適用範囲の定義"]
    D2 ~~~ D3["品質と信頼性の設計"]
    D3 ~~~ D4["戦略目標の実行"]
    D4 ~~~ D5["リスクと不確実性の管理"]
    D5 --> H["人間による判断 Human-in-the-Loop"]
    H -- "承認・修正" --> R["説明責任のある成果"]
    H -- "フィードバック" --> Hub1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class P1,P2,P3,P4,P5,P6,P7,P8,D1,D2,D3,D4,D5 box;
    class Hub1,Hub2,H hub;
    class R done;`,
  `flowchart TB
    A["AIがタスクを実行または提案を生成"] --> B{"影響度はどの程度か"}
    B -- "低リスク 定型作業" --> C["自動実行し事後サンプリング確認 例 議事録要約"]
    B -- "中リスク 判断を含む提案" --> D["担当PMが確認・調整 例 タスク優先度提案"]
    B -- "高リスク 予算またはスコープ変更" --> E["ステアリング委員会の承認が必須 例 予算5%超の再配分"]
    C --> F["ログと根拠を記録"]
    D --> F
    E --> F
    F --> G["フィードバックをモデル改善へ反映"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,C,D,E,F box;
    class B hub;
    class G done;`,
  `flowchart TB
    A["Issueまたはチケット作成 要件を自然言語で記述"] --> B["AIエージェントに割り当て 例 コーディングエージェント"]
    B --> C["エージェントが計画を立案 Plan Mode"]
    C --> D["コード変更を実行"]
    D --> E["自動テスト・静的解析"]
    E --> F{"検証に合格したか"}
    F -- "No" --> D
    F -- "Yes" --> G["セキュリティスキャン CodeQL等"]
    G --> H["Pull Request作成"]
    H --> I["人間によるレビュー Human-in-the-Loop"]
    I -- "差し戻し" --> D
    I -- "承認" --> J["マージしてCI CDパイプラインへ"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,G,H box;
    class F,I hub;
    class J done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/ai-driven-project-management/9781394232215/",
  "https://www.pmi.org/standards/artificial-intelligence",
  "https://www.pmi.org/blog/pmi-ai-standard-project-management",
  "https://www.pmi.org/about/press-media/2026/pmi-publishes-worlds-first-global-standard-for-ai-in-project-work",
  "https://www.pmi.org/learning/ai-in-project-management",
  "https://newsletter.pragmaticengineer.com/p/ai-impact-on-software-engineers-part-2",
  "https://github.blog/ai-and-ml/github-copilot/from-idea-to-pr-a-guide-to-github-copilots-agentic-workflows/",
  "https://github.blog/ai-and-ml/github-copilot/how-to-maximize-github-copilots-agentic-capabilities/",
  "https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/",
  "https://www.microsoft.com/en-us/research/publication/agentic-coding-in-the-wild-characterizing-github-copilot-at-production-scale/",
  "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
  "https://www.atlassian.com/whitepapers/state-of-ai",
  "https://deviniti.com/blog/leadership-teamwork/35-system-of-work-statistics/",
  "https://www.techtarget.com/searchenterpriseai/feature/How-AI-is-transforming-project-management",
  "https://www.sciencedirect.com/science/article/pii/S1877050926007301",
  "https://www.airtable.com/articles/ai-project-management",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "what-is-ai-pm",
  "roadmap-overview",
  "step0-assessment",
  "step1-use-cases",
  "step2-tool-selection",
  "step3-governance",
  "step4-prompt-engineering",
  "step5-agentic-workflow",
  "step6-risk-ethics",
  "step7-measure-scale",
  "anti-patterns",
  "roadmap-30-60-90",
  "summary",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [] as const;
const EXPECTED_CALLOUT_VARIANTS = {} as const;
const EXPECTED_CALLOUT_LABELS = {} as const;
const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "AI駆動プロジェクトマネジメント実践ガイド",
] as const;

const EXPECTED_SEO_TITLE =
  "AI駆動プロジェクトマネジメント実践ガイド | 初学者のためのステップバイステップ・ベストプラクティス";
const EXPECTED_SEO_DESCRIPTION =
  "PMI AI標準・McKinsey調査・GitHub公式ブログなど一次情報に基づく、AI駆動プロジェクトマネジメント(AI-PM)の初学者向け実践ガイド。導入ロードマップからガバナンス設計、エージェント活用まで解説。";

defineSourceParityContract({
  suiteName: "pages/ai-driven-project-management-guide.vue",
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
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});
