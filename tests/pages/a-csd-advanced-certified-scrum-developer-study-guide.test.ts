// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/a-csd-advanced-certified-scrum-developer-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Advanced Certified Scrum Developer® (A-CSD®) 完全ガイド"
] as const;

const EXPECTED_H2 = [
  "本ガイドの使い方",
  "1. A-CSD® とは何か — Developer Track における位置づけ",
  "2. 受験資格・コース要件(Requirements)",
  "3. Bloom's Taxonomy の復習 — LO の読み方",
  "4. カテゴリ1 — Lean, Agile & Scrum (LO 1.1–1.7)",
  "5. カテゴリ2 — Collaboration & Team Dynamics (LO 2.1–2.6)",
  "6. カテゴリ3 — Architecture & Design (LO 3.1–3.4)",
  "7. カテゴリ4 — Refactoring (LO 4.1–4.4)",
  "8. カテゴリ5 — Test Driven Development (LO 5.1–5.9)",
  "9. カテゴリ6 — Integrating Continuously (LO 6.1–6.3)",
  "10. カテゴリ7 — Learning by Delivering Continuously (LO 7.1–7.4)",
  "11. XPプラクティスとA-CSD LOの統合マップ",
  "12. ベストプラクティス総合チェックリスト",
  "13. 認定取得後のキャリアパス",
  "14. まとめ",
  "15. 参考文献(出典一覧)"
] as const;

const EXPECTED_H3 = [
  "1.1 A-CSD® の位置づけ",
  "1.2 A-CSD と CSD の違い(公式FAQより)",
  "1.3 認定の価値(ベストプラクティスの観点)",
  "2.1 要件の詳細",
  "2.2 認定の維持(ベストプラクティス)",
  "3.1 A-CSD LO 全体構成",
  "LO 1.1 — ワークフローを可視化するモデリング技法を適用する [応用]",
  "LO 1.2 — 作業システムの改善点を特定するのに役立つ概念を3つ以上説明する [理解]",
  "LO 1.3 — プロダクト開発環境における3種類以上の無駄と、それをScrumチームのDefinition of Doneでどう対処できるかを議論する [理解]",
  "LO 1.4 — Definition of Done (DoD) を策定し反復的に進化させることを実践し、DoDが進化すべき理由を3つ以上特定する [応用]",
  "LO 1.5 — 複数チームで1つのプロダクトを扱う際に生じる課題に対処するための手法を3つ以上議論する [理解]",
  "LO 1.6 — レトロスペクティブの結果として自分やチームが取り入れた改善を1つ以上評価する [評価]",
  "LO 1.7 — 開発作業に関するビジネス視点を1つ以上議論する [理解]",
  "LO 2.1 — 協働の異なるアプローチを3つ以上比較対照する [分析]",
  "LO 2.2 — 傾聴と相互理解を改善する技法を1つ以上適用する [応用]",
  "LO 2.3 — フィードバックを与え、受け取ることを実践する [応用]",
  "LO 2.4 — 協働的な開発プラクティスを1つ以上適用する [応用]",
  "LO 2.5 — 使用率(Utilization)・効率性(Efficiency)・有効性(Effectiveness)の違いを説明する [理解]",
  "LO 2.6 — プロダクトバックログアイテムをスプリントに収まるようサイズ調整する方法を1つ以上実践する [応用]",
  "LO 3.1 — 事前設計(Up-Front Architecture)と創発的設計(Emergent Architecture)の違いを3つ以上説明する [理解]",
  "LO 3.2 — アジャイルなアーキテクチャの検討に情報を与える設計原則を3つ以上説明する [理解]",
  "LO 3.3 — システム制約を設計・検証する方法を3つ以上説明し、うち1つを実践する [応用]",
  "LO 3.4 — コード・プロダクト品質メトリクスを3つ以上比較対照する [分析]",
  "LO 4.1 — 保守性のためにシステムをリファクタリングするアプローチを1つ以上実演する [応用]",
  "LO 4.2 — コード・プロダクトの「におい(smell)」を3つ以上説明し、そのうち1つへのリファクタリングでのアプローチを示す [応用]",
  "LO 4.3 — 非技術者のステークホルダーにリファクタリングを説明する [理解]",
  "LO 4.4 — 技術的負債を説明し、その原因を3つ以上挙げ、そのうち1つへの対処法を議論する [分析]",
  "LO 5.1 — TDDの指導原則を3つ以上再言し、それらがなぜ必要かを説明する [理解]",
  "LO 5.2 — TDDを設計アプローチとして用いてソフトウェアやプロダクトエンティティを設計することを実演する [応用]",
  "LO 5.3 — 5つ以上の単体テストの原則とプラクティスを適用する [応用]",
  "LO 5.4 — テストの品質と有効性を改善する5つ以上の方法を特定し、3つ以上のテストリファクタリングアプローチを適用する [分析]",
  "LO 5.5 — テストを分類し、異なるカテゴリに異なるテスト方法を割り当てる概念を1つ以上示す [応用]",
  "LO 5.6 — テストファーストでビジネス視点に立った協働的アプローチの属性を3つ以上挙げる [理解]",
  "LO 5.7 — ステークホルダーやユーザーとテスト駆動のフィードバックループを実装するアプローチを1つ以上適用する [応用]",
  "LO 5.8 — 欠落した、またはリソース効率の悪いコンポーネント/サブシステムに対処する技法を1つ以上適用する [応用]",
  "LO 5.9 — システムの内部品質を検証・改善することで技術的卓越性にアプローチする方法を3つ以上議論し、そのうち1つを実践する [評価]",
  "LO 6.1 — 継続的インテグレーションを行う際に対処すべき懸念事項を5つ以上議論する [分析]",
  "LO 6.2 — 自動化され、自己テストを行い、高速なビルドを作成することを実践する [応用]",
  "LO 6.3 — チームとともに継続的インテグレーション(CI)のアプローチを1つ以上適用する [応用]",
  "LO 7.1 — 継続的デリバリー(CD)を定義し、その利点を3つ以上議論する [理解]",
  "LO 7.2 — 継続的デリバリーのための技術的プラクティスを3つ以上説明する [理解]",
  "LO 7.3 — デリバリーの期待される成果についてフィードバックを組み込むアプローチを1つ以上議論する [応用]",
  "LO 7.4 — 継続的デプロイメントのアプローチを概説する [理解]",
  "12.1 リーン・アジャイル・Scrum",
  "12.2 協働とチームダイナミクス",
  "12.3 アーキテクチャと設計",
  "12.4 リファクタリング",
  "12.5 テスト駆動開発",
  "12.6 継続的インテグレーション・デリバリー",
  "Scrum Alliance 公式情報源",
  "フレームワークの一次資料",
  "リファクタリング・技術的負債・コード品質",
  "テスト駆動開発・テスト戦略",
  "継続的インテグレーション・継続的デリバリー",
  "補足: XPプラクティス全般"
] as const;

const EXPECTED_H4 = [
  "フィードバックを受け取る側のベストプラクティス",
  "フィードバックを与える側のベストプラクティス"
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\nA[\"CSD Certified Scrum Developer<br/>基礎 Scrum下での開発実践\"] --> B[\"A-CSD Advanced Certified Scrum Developer<br/>応用 高度な技術・協働スキル\"]\nB --> C[\"CSP-D Certified Scrum Professional - Developer<br/>熟達 専門性の証明\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A box;\nclass B hub;\nclass C done;",
  "flowchart TD\nS([\"A-CSD 取得を目指す\"]) --> R1{\"CSD® 有効/失効どちらでも可<br/>またはPSM I / PSM II を<br/>保持しているか?\"}\nR1 -- いいえ --> G1[\"まずCSD®コースを受講・取得する<br/>PSM I / PSM II でも可\"]\nG1 --> R1\nR1 -- はい --> R2[\"承認されたA-CSD®コースを受講する\"]\nR2 --> R3{\"過去5年以内に<br/>Scrum開発者/チームメンバーとして<br/>12か月以上の実務経験があるか?\"}\nR3 -- いいえ --> G2[\"実務経験を積んでから申請する\"]\nR3 -- はい --> R4[\"コースの事前/事後課題を含む<br/>全コンポーネントを完了する\"]\nR4 --> DONE([\"A-CSD® 認定取得<br/>CSD®も自動更新される\"])\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass S,R2,R4 box;\nclass R1,R3,G1,G2 hub;\nclass DONE done;",
  "flowchart BT\nK[\"知識 Knowledge<br/>用語や事実を思い出せる\"] --> C[\"理解 Comprehension<br/>意味を説明できる\"]\nC --> AP[\"応用 Application<br/>実際の状況で使える\"]\nAP --> AN[\"分析 Analysis<br/>要素に分解し関係を見出せる\"]\nAN --> S[\"統合 Synthesis<br/>新しい形に組み合わせられる\"]\nS --> E[\"評価 Evaluation<br/>価値判断・妥当性評価ができる\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass K,C,AP,AN,S,E box;",
  "flowchart LR\nA[\"要求発生\"] -->|\"待機時間\"| B[\"開発着手\"]\nB -->|\"実作業時間\"| C[\"コードレビュー\"]\nC -->|\"待機時間\"| D[\"テスト\"]\nD -->|\"実作業時間\"| E[\"リリース\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E box;",
  "flowchart LR\nA[\"現在のDoD\"] --> B[\"スプリントで運用\"]\nB --> C[\"レトロスペクティブで<br/>ギャップを振り返る\"]\nC --> D[\"DoDを更新する\"]\nD --> A\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A,B,D box;\nclass C hub;",
  "flowchart LR\nA[\"Solo Programming<br/>個人作業\"] --> B[\"Code Review<br/>非同期レビュー\"]\nB --> C[\"Pair Programming<br/>2人1組でリアルタイム協働\"]\nC --> D[\"Mob Programming<br/>チーム全員で1台の画面に向かう\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A box;\nclass B,C hub;\nclass D done;",
  "flowchart LR\nS[\"Situation<br/>状況を具体的に示す\"] --> B[\"Behavior<br/>観察した行動を述べる\"]\nB --> I[\"Impact<br/>それがもたらした影響を伝える\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass S,B,I box;",
  "flowchart TB\nsubgraph U[\"Up-Front Architecture 事前設計\"]\nU1[\"要件を早期に確定\"] --> U2[\"詳細設計を先に完成\"] --> U3[\"設計通りに実装\"]\nend\nsubgraph E[\"Emergent Architecture 創発的設計\"]\nE1[\"最小限の骨格を決める\"] --> E2[\"小さく実装し学習する\"] --> E3[\"学習に基づき設計を進化させる\"]\nE3 --> E2\nend\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass U1,U2,U3 box;\nclass E1,E2,E3 done;",
  "flowchart LR\nA[\"1. 対象コードを<br/>保護するテストがあるか確認\"] --> B{\"テストは<br/>十分か?\"}\nB -- いいえ --> C[\"テストを追加する\"]\nC --> A\nB -- はい --> D[\"2. 小さな一歩で<br/>リファクタリングを実施\"]\nD --> E[\"3. テストを実行し<br/>振る舞いが変わっていないことを確認\"]\nE --> F{\"目的の構造に<br/>到達したか?\"}\nF -- いいえ --> D\nF -- はい --> G[\"4. コミットする\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,D,E box;\nclass B,C,F hub;\nclass G done;",
  "flowchart TB\nsubgraph Deliberate[\"意図的 Deliberate\"]\nDP[\"思慮深く意図的<br/>『今はこれでいく、理由は分かっている』<br/>= しばしば正しいビジネス判断\"]\nDR[\"無謀で意図的<br/>『設計する時間がない』\"]\nend\nsubgraph Inadvertent[\"無自覚 Inadvertent\"]\nIP[\"思慮深く無自覚<br/>『今ならこう設計するのに』<br/>= 経験を積んだ結果の気づき\"]\nIR[\"無謀で無自覚<br/>『レイヤーとは何ですか?』\"]\nend\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass DP done;\nclass IP hub;\nclass DR,IR box;",
  "flowchart LR\nR[\"Red<br/>失敗するテストを書く\"] --> G[\"Green<br/>テストを通す<br/>最小限の実装をする\"]\nG --> RF[\"Refactor<br/>テストを保ったまま<br/>コードを整理する\"]\nRF --> R\n\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass R hub;\nclass G done;\nclass RF box;",
  "flowchart TB\nE2E[\"E2E / UIテスト<br/>少数・低速・高コスト\"] --> INT[\"統合テスト<br/>中程度の数・中速\"]\nINT --> UNIT[\"単体テスト<br/>多数・高速・低コスト\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass E2E box;\nclass INT hub;\nclass UNIT done;",
  "flowchart LR\nA[\"コードをコミット\"] --> B[\"自動的にビルドが起動\"]\nB --> C[\"静的解析・単体テストを実行\"]\nC --> D{\"すべて成功?\"}\nD -- いいえ --> E[\"チームに即座に通知<br/>最優先で修正\"]\nD -- はい --> F[\"成果物・アーティファクトを生成\"]\nE --> A\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C box;\nclass D,E hub;\nclass F done;",
  "flowchart LR\nCI[\"継続的インテグレーション<br/>頻繁な統合\"] --> CD[\"継続的デリバリー<br/>常にリリース可能\"]\nCD --> DEPLOY[\"継続的デプロイメント<br/>自動で本番へ反映\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass CI box;\nclass CD hub;\nclass DEPLOY done;",
  "flowchart TB\nsubgraph Foundation[\"土台 協働とリーン思考 カテゴリ1・2\"]\nF1[\"ワークフローの可視化\"]\nF2[\"ペア/モブプログラミング\"]\nF3[\"フィードバックの授受\"]\nend\n\nsubgraph Design[\"設計と実装 カテゴリ3・4・5\"]\nD1[\"創発的アーキテクチャ<br/>+ シンプルデザイン原則\"]\nD2[\"TDD<br/>Red-Green-Refactor\"]\nD3[\"継続的リファクタリング\"]\nend\n\nsubgraph Delivery[\"統合とデリバリー カテゴリ6・7\"]\nE1[\"継続的インテグレーション\"]\nE2[\"継続的デリバリー/デプロイ\"]\nE3[\"成果のフィードバックループ\"]\nend\n\nFoundation --> Design --> Delivery\nE3 -.->|\"学習を次のスプリントへ\"| Foundation\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass F1,F2,F3 box;\nclass D1,D2,D3 hub;\nclass E1,E2,E3 done;",
  "flowchart LR\nA[\"A-CSD®取得\"] --> B[\"Scrum Education Units SEU<br/>を継続的に蓄積\"]\nB --> C[\"2年ごとに認定更新<br/>SEUの提出と更新料の支払い\"]\nA --> D[\"実務経験を重ねる\"]\nD --> E[\"CSP-D®<br/>Certified Scrum Professional - Developer<br/>に挑戦\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,D box;\nclass C hub;\nclass E done;"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://www.scrumalliance.org/get-certified/renewing-certifications",
  "https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_A_CSD_LO_2021.pdf",
  "https://scrumguides.org/scrum-guide.html",
  "https://en.wikipedia.org/wiki/Extreme_programming_practices",
  "https://refactoring.com/",
  "https://martinfowler.com/bliki/CodeSmell.html",
  "https://martinfowler.com/bliki/TechnicalDebtQuadrant.html",
  "https://martinfowler.com/bliki/TechnicalDebt.html",
  "https://martinfowler.com/bliki/TestDrivenDevelopment.html",
  "https://martinfowler.com/bliki/TestPyramid.html",
  "https://martinfowler.com/articles/practical-test-pyramid.html",
  "https://martinfowler.com/bliki/SpecificationByExample.html",
  "https://martinfowler.com/articles/mocksArentStubs.html",
  "https://martinfowler.com/articles/continuousIntegration.html",
  "https://martinfowler.com/articles/feature-toggles.html",
  "https://continuousdelivery.com/",
  "https://docs.cloud.google.com/solutions/devops/devops-tech-version-control",
  "https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers",
  "https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://resources.scrumalliance.org/Article/share-insights-agile-skills-workplace",
  "https://agilemanifesto.org/",
  "https://agilemanifesto.org/principles.html",
  "https://martinfowler.com/testing/"
] as const;

const EXPECTED_TOC_IDS = [
  "about-guide",
  "what-is-acsd",
  "acsd-requirements",
  "blooms-taxonomy",
  "lean-agile-scrum",
  "collaboration-team-dynamics",
  "architecture-design",
  "refactoring",
  "test-driven-development",
  "integrating-continuously",
  "delivering-continuously",
  "xp-integration-map",
  "best-practices-checklist",
  "career-path",
  "summary",
  "references"
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
  "SECTION 16"
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 45,
  practice: 38,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: {
    "ソース": 45,
  },
  practice: {
    "ベストプラクティス": 38,
  },
  note: {
    "補足": 1,
  },
} as const;

defineSourceParityContract({
  page: Page,
  suiteName: "pages/a-csd-advanced-certified-scrum-developer-study-guide.vue",
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: [],
  seoTitleFragments: [
    "A-CSD®",
    "Advanced Certified Scrum Developer",
    "認定資格 完全ガイド",
  ],
  seoTitle: "A-CSD® (Advanced Certified Scrum Developer) 認定資格 完全ガイド | Scrum Alliance 公式Learning Objectives準拠",
  seoDescription:
    "Scrum Alliance® の Advanced Certified Scrum Developer (A-CSD) Learning Objectives (2021年8月版) に基づき、7カテゴリ・全LOをステップバイステップで解説する学習ガイド。",
});

describe("pages/a-csd-advanced-certified-scrum-developer-study-guide.vue — テーブル構造契約", () => {
  it("テーブルが原本と同じ件数（22件）存在し、すべて .table-wrap で包まれている", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(22);
    for (const table of tables) {
      expect(table.element.closest(".table-wrap")).not.toBeNull();
    }
  });

  it("テーブル行の総数が原本と一致する（115行）", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const rows = wrapper.findAll("table tr");
    expect(rows).toHaveLength(115);
  });
});
