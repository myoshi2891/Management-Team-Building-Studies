// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/itil-service-v5-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ITIL Service (Version 5) 学習ガイド"
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "ITIL Service (Version 5) 試験の全体像",
  "前提知識の総復習: ITIL Version 5 の全体構造",
  "Module 1: デジタル製品とサービスの主要概念",
  "Module 2: Discover(発見)",
  "Module 3: Design(設計)",
  "Module 4: Acquire(獲得)",
  "Module 5: Build(構築)",
  "Module 6: Transition(移行)",
  "Module 7: Operate(運用)",
  "Module 8: Deliver(提供)",
  "Module 9: Support(サポート)",
  "Module 10: ライフサイクル管理・AI・他フレームワーク統合",
  "ベストプラクティス総まとめ",
  "試験対策のポイント",
  "付録: 用語集",
  "参考文献・ソース URL 一覧"
] as const;

const EXPECTED_H3 = [
  "0.1 このモジュールは何を証明する資格か",
  "0.2 試験概要",
  "0.3 受験前提条件(Prerequisites)",
  "0.4 対象者とキャリアパス",
  "0.5 ITIL (Version 5) 資格体系におけるこのモジュールの位置づけ",
  "1.1 Product と Service の定義",
  "1.2 価値の方程式: アウトプットとアウトカム",
  "1.3 ITIL Value System(ITIL VS)の5つの構成要素",
  "1.4 指導原則(Guiding Principles)— 7原則の早見表",
  "1.5 4つの側面(Four Dimensions of Service Management)",
  "1.6 サービスバリューチェーン(6活動)と PSLM(8活動)の違い",
  "1.7 サービス関係性(Service Relationships)とサービスジャーニー",
  "1.8 品質・サービスレベル・SLA(そして XLA)",
  "1.9 ガバナンスと EDM サイクル",
  "1.10 継続的改善モデル(7ステップ)",
  "1.11 34の管理プラクティス概観",
  "2.1 このモジュールの狙い",
  "2.2 デジタルサービスの特徴",
  "2.3 デジタル製品とサービスによる価値創出",
  "2.4 PSLM の範囲と目的(サービスプロバイダー視点)",
  "2.5 サービスプロバイダー視点で見た PSLM のメリット",
  "2.6 サービスプロバイダー視点で見た PSLM の課題",
  "2.7 組織のバリューチェーン活動が PSLM をどう支えるか",
  "3.1 目的(Purpose)",
  "3.2 主要概念",
  "3.3 Discover を支える有効化プラクティス(Enabling Practices)",
  "3.4 Discover 活動のステップ",
  "3.5 アウトプット(Outputs)",
  "3.6 CSF(重要成功要因)と指標の例",
  "3.7 実践的な推奨事項(ベストプラクティス)",
  "4.1 目的(Purpose)",
  "4.2 主要概念",
  "4.3 Design を支える有効化プラクティス",
  "4.4 Design 活動のステップ",
  "4.5 アウトプット(Outputs)",
  "4.6 CSF と指標の例",
  "4.7 実践的な推奨事項(ベストプラクティス)",
  "5.1 目的(Purpose)",
  "5.2 技術・人材・サードパーティサービス調達の違い",
  "5.3 主要概念",
  "5.4 Acquire を支える有効化プラクティス",
  "5.5 Acquire 活動のステップ",
  "5.6 アウトプット(Outputs)",
  "5.7 CSF と指標の例",
  "5.8 実践的な推奨事項(ベストプラクティス)",
  "6.1 目的(Purpose)",
  "6.2 Design から Build への統合",
  "6.3 主要概念",
  "6.4 Build を支える有効化プラクティス",
  "6.5 Build 活動のステップ",
  "6.6 アウトプット(Outputs)",
  "6.7 CSF と指標の例",
  "6.8 実践的な推奨事項(ベストプラクティス)",
  "7.1 目的(Purpose)",
  "7.2 製品移行へのアプローチ",
  "7.3 Transition を支える有効化プラクティス",
  "7.4 Transition 活動のステップ",
  "7.5 アウトプット(Outputs)",
  "7.6 CSF と指標の例",
  "7.7 実践的な推奨事項(ベストプラクティス)",
  "8.1 目的(Purpose)",
  "8.2 主要概念",
  "8.3 Operate を支える有効化プラクティス",
  "8.4 Operate 活動のステップ",
  "8.5 アウトプット(Outputs)",
  "8.6 CSF と指標の例",
  "8.7 実践的な推奨事項(ベストプラクティス)",
  "9.1 目的(Purpose)",
  "9.2 サービス提供活動がどのように価値共創を可能にするか",
  "9.3 主要概念",
  "9.4 Deliver を支える有効化プラクティス",
  "9.5 Deliver 活動のステップ",
  "9.6 アウトプット(Outputs)",
  "9.7 CSF と指標の例",
  "9.8 実践的な推奨事項(ベストプラクティス)",
  "10.1 目的(Purpose)",
  "10.2 主要概念",
  "10.3 Support を支える有効化プラクティス",
  "10.4 Support 活動のステップ",
  "10.5 アウトプット(Outputs)",
  "10.6 CSF と指標の例",
  "10.7 実践的な推奨事項(ベストプラクティス)",
  "11.1 エンドツーエンドのライフサイクル管理",
  "11.2 ITIL AI Capability Model(6C モデル)",
  "11.3 AI 統合における注意点",
  "11.4 DevOps との関係",
  "11.5 PRINCE2 との関係",
  "11.6 共通する原則",
  "12.1 段階を横断するベストプラクティス",
  "13.1 試験の性質を理解する",
  "13.2 頻出の混同ポイント",
  "13.3 学習の進め方(推奨ステップ)",
  "13.4 実務者としての心構え"
] as const;

const EXPECTED_H4 = [
  "一次情報源(PeopleCert / itil.com 公式)",
  "PeopleCert 認定トレーニング機関(ATO)による公開コースアウトライン",
  "解説記事・業界メディア(補足情報、体系的な用語整理)"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-service-version-5-4181",
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1",
  "https://www.itil.com/Itil-News-and-Announcements/itil-product-and-service-lifecycle-model",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-foundation-whats-new-guide",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-experience-user-experience",
  "https://itsmacademy.com/itil-service-course",
  "https://www.qa.com/en-us/course-catalogue/courses/itil-service-version-5-itil5ser/",
  "https://www.hpe.com/us/en/collaterals/collateral.a50015158enw.html",
  "https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation/",
  "https://www.pmgacademy.com/en/articles/itil/itil-version-5-get-to-know-the-fundamental-concepts-for-managing-digital-products-and-services/",
  "https://www.pmgacademy.com/en/articles/itil/information-and-technology-in-itil-version-5-the-guide-for-the-ai-era-and-data-governance/",
  "https://blog.invgate.com/itil-5-what-changes",
  "https://www.diontraining.com/blogs/news/itil-5-process",
  "https://netmind.net/en/news/itil-5-service-lifecycle/",
  "https://ipmoguide.com/itil-v5-ya-esta-aqui-todo-lo-que-necesitas-saber/",
  "https://passionitgroup.com/blog/thoughts-on-itil-version-5-the-new-itil-value-chain-and-what-changed-from-itil-4/",
  "https://agilepmhub.com/blog/itil-version-5-certification-pathway",
  "https://itsm.tools/itil-4-explained/",
  "https://blog.invgate.com/itil-service-operation",
  "https://agilepmhub.com/itil-ai-governance",
  "https://www.invensislearning.com/info/itil-4-vs-itil-v5-differences/",
  "https://spidya.com/en/blog/it-service-management/what-is-itil-v5-framework-new-practices-itil-4-comparison",
  "https://www.tidelineinsights.com/blog/itil-5-whats-coming.html",
  "https://passitexams.com/articles/itil-v4-vs-v5-key-differences/"
] as const;

const EXPECTED_TOC_IDS = [
  "about-guide",
  "exam-overview",
  "foundation-review",
  "module1-key-concepts",
  "module2-discover",
  "module3-design",
  "module4-acquire",
  "module5-build",
  "module6-transition",
  "module7-operate",
  "module8-deliver",
  "module9-support",
  "module10-lifecycle-ai",
  "best-practices-summary",
  "exam-tips",
  "glossary",
  "references"
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 00",
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
  "note": 2,
  "practice": 18
} as const;

const EXPECTED_CALLOUT_LABELS = {
  "note": {
    "補足": 2
  },
  "practice": {
    "ベストプラクティス": 18
  }
} as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart TB\nF[\"ITIL Foundation Version 5 または ITIL 4 Foundation Bridge\"]\nF --> PM[\"ITIL Practice Manager MSF PIC CAI\"]\nF --> MP1[\"ITIL Product Version 5\"]\nF --> MP2[\"ITIL Service Version 5\"]\nF --> MP3[\"ITIL Experience Version 5\"]\nF --> SL1[\"ITIL Strategy Version 5\"]\nF --> SL2[\"ITIL Transformation Version 5\"]\nF --> AIG[\"ITIL AI Governance 拡張モジュール\"]\nMP1 --> MP[\"ITIL Managing Professional Version 5\"]\nMP2 --> MP\nMP3 --> MP\nSL1 --> SLD[\"ITIL Strategic Leader Version 5\"]\nSL2 --> SLD\nMP --> MST[\"ITIL Master Version 5\"]\nSLD --> MST\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px\nclass F box\nclass PM,MP1,MP3,SL1,SL2,AIG box\nclass MP2 hub\nclass MP,SLD done\nclass MST done",
  "flowchart LR\nIN1[\"Opportunity 機会\"] --> VS\nIN2[\"Demand 需要\"] --> VS\nsubgraph VS[\"ITIL Value System\"]\ndirection TB\nGP[\"Guiding Principles 指導原則\"]\nGOV[\"Governance ガバナンス\"]\nSVC[\"Service Value Chain サービスバリューチェーン\"]\nPRAC[\"34 Management Practices 34の管理プラクティス\"]\nCI[\"Continual Improvement 継続的改善\"]\nGOV --> SVC\nGP -.-> SVC\nPRAC -.-> SVC\nCI -.-> SVC\nend\nVS --> OUT[\"Value 価値\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclass IN1,IN2,OUT box\nclass VS hub",
  "flowchart TB\nPESTLE[\"外部要因PESTLE 政治・経済・社会・技術・法律・環境\"]\nPESTLE --> D1[\"① 組織と人材 Organizations and People\"]\nPESTLE --> D2[\"② 情報と技術 Information and Technology\"]\nPESTLE --> D3[\"③ パートナーと供給者 Partners and Suppliers\"]\nPESTLE --> D4[\"④ バリューストリームとプロセス Value Streams and Processes\"]\nD1 --- CENTER[\"サービスの 価値提供\"]\nD2 --- CENTER\nD3 --- CENTER\nD4 --- CENTER\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclass D1,D2,D3,D4 box\nclass CENTER hub",
  "flowchart LR\nsubgraph SVC[\"Service Value Chain6活動\"]\ndirection LR\nP1[\"Plan\"] --- P2[\"Improve\"] --- P3[\"Engage\"] --- P4[\"Design & Transition\"] --- P5[\"Obtain Build\"] --- P6[\"Deliver & Support\"]\nend\nSVC -->|\"より詳細な 8段階モデルへ分解\"| PSLM[\"Product and Service Lifecycle ModelPSLM\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclass P1,P2,P3,P4,P5,P6 box\nclass PSLM hub",
  "flowchart LR\nA[\"Explore 探索\"] --> B[\"Engage 関与\"] --> C[\"Offer 提示\"] --> D[\"Agree 合意\"] --> E[\"Onboard 導入\"] --> F[\"Co-create 共創\"] --> G[\"Reflect 振り返り\"]\nG -.->|継続的改善| A\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px\nclass A,B,C,D,E,F box\nclass G done",
  "flowchart LR\nE[\"Evaluate 評価\"] --> D[\"Direct 指示\"] --> M[\"Monitor 監視\"] --> E\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass E,D,M box",
  "flowchart TB\nS1[\"① What is the vision? ビジョンは何か\"] --> S2[\"② Where are we now? 現在地はどこか\"]\nS2 --> S3[\"③ Where do we want to be? 目指す姿はどこか\"]\nS3 --> S4[\"④ How do we get there? どう到達するか\"]\nS4 --> S5[\"⑤ Take action 行動する\"]\nS5 --> S6[\"⑥ Are we getting there? 到達できているか\"]\nS6 --> S7[\"⑦ How do we keep the momentum going? 改善をどう定着させるか\"]\nS7 -.->|次の改善サイクルへ| S1\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px\nclass S1,S2,S3,S4,S5,S6 box\nclass S7 done",
  "flowchart TB\nsubgraph PRODUCT[\"主に「製品」寄りの活動\"]\ndirection LR\nA1[\"① Discover 発見\"] --> A2[\"② Design 設計\"] --> A3[\"③ Acquire 獲得\"] --> A4[\"④ Build 構築\"]\nend\nsubgraph BRIDGE[\"製品とサービスの橋渡し\"]\ndirection LR\nA5[\"⑤ Transition 移行\"] --> A6[\"⑥ Operate 運用\"]\nend\nsubgraph SERVICE[\"主に「サービス」寄りの活動\"]\ndirection LR\nA7[\"⑦ Deliver 提供\"] --> A8[\"⑧ Support サポート\"]\nend\nPRODUCT --> BRIDGE --> SERVICE\nA8 -.->|フィードバックは<br/>どの活動にも還元される| A1\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclass A1,A2,A3,A4,A7,A8 box\nclass A5,A6 hub",
  "flowchart TB\nS1[\"市場・内部環境の スキャニング\"] --> S2[\"ステークホルダーとの 対話・ニーズ収集\"]\nS2 --> S3[\"ビジネス分析による 要件の構造化\"]\nS3 --> S4[\"組織戦略・ビジョンとの 整合性チェック\"]\nS4 --> S5[\"ポートフォリオへの 反映・優先順位づけ\"]\nS5 --> S6[\"ロードマップ・ サービスオファリングの更新\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass S1,S2,S3,S4,S5,S6 box",
  "flowchart TB\nS1[\"要件・機会の 詳細化\"] --> S2[\"アーキテクチャ・ 技術方式の検討\"]\nS2 --> S3[\"サービスレベル目標 SLA XLAの組み込み\"]\nS3 --> S4[\"プロトタイプ作成・ ユーザー検証\"]\nS4 --> S5[\"運用モデル 誰がどう運用するかの設計\"]\nS5 --> S6[\"仕様書の確定\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass S1,S2,S3,S4,S5,S6 box",
  "flowchart TB\nS1[\"必要リソースの 特定技術 人材 サービス\"] --> S2[\"内製 vs 購入の ソーシング戦略決定\"]\nS2 --> S3[\"サプライヤー評価・ 選定\"]\nS3 --> S4[\"契約・SLA の 締結\"]\nS4 --> S5[\"資産としての 登録・配分\"]\nS5 --> S6[\"TCO を含めた 予算管理への反映\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass S1,S2,S3,S4,S5,S6 box",
  "flowchart TB\nS1[\"コンポーネント単位の 開発\"] --> S2[\"コードレビュー・ 静的解析\"]\nS2 --> S3[\"統合 Integration\"]\nS3 --> S4[\"機能テスト・ 非機能テスト\"]\nS4 --> S5[\"Definition of Done の判定\"]\nS5 --> S6[\"Transition 準備 リリース候補の確定\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass S1,S2,S3,S4,S5,S6 box",
  "flowchart TB\nS1[\"変更のリスク評価 Change Enablement\"] --> S2[\"リリース計画の 策定\"]\nS2 --> S3[\"展開方式の選定 Big Bang カナリア等\"]\nS3 --> S4[\"本番環境への 展開実行\"]\nS4 --> S5[\"移行後の 検証Post-Implementation Review\"]\nS5 --> S6[\"ロールバック要否の 判断\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\n\nclass S1,S2,S3,S4,S5 box\nclass S6 hub",
  "flowchart TB\nS1[\"監視対象・指標 SLIの定義\"] --> S2[\"継続的な監視 Monitoring\"]\nS2 --> S3[\"イベントの検知・ 分類\"]\nS3 --> S4{\"対応要否の 判定\"}\nS4 -->|自動修復可能| S5[\"自動修復 Self-healing\"]\nS4 -->|人的対応が必要| S6[\"Support 活動へ エスカレーション\"]\nS5 --> S7[\"パフォーマンス記録・ キャパシティ管理へ反映\"]\nS6 --> S7\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclass S1,S2,S3,S5,S7 box\nclass S4 hub\nclass S6 box",
  "flowchart TB\nS1[\"リクエスト受付 Service Desk ポータル\"] --> S2[\"リクエストの分類・ 承認要否判定\"]\nS2 --> S3[\"履行 Fulfilment\"]\nS3 --> S4[\"ユーザーへの 提供完了通知\"]\nS4 --> S5[\"SLA XLA 実績の 記録・レポーティング\"]\nS5 --> S6[\"フィードバック収集\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass S1,S2,S3,S4,S5,S6 box",
  "flowchart TB\nS1[\"インシデントの 検知・記録\"] --> S2[\"トリアージ・ 優先度づけ\"]\nS2 --> S3{\"既知のエラー ワークアラウンドが存在するか\"}\nS3 -->|Yes| S4[\"ワークアラウンド 適用\"]\nS3 -->|No| S5[\"調査・診断\"]\nS5 --> S4\nS4 --> S6[\"サービス復旧の 確認\"]\nS6 --> S7[\"インシデントクローズ\"]\nS7 -.->|再発傾向がある場合| S8[\"Problem Management へ引き継ぎ根本原因分析\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px\nclass S1,S2,S4,S5,S6 box\nclass S3 hub\nclass S7,S8 done",
  "flowchart TB\nsubgraph LOOP[\"PSLM継続的なフィードバックループ\"]\ndirection LR\nD1[\"Discover\"] --> D2[\"Design\"] --> D3[\"Acquire\"] --> D4[\"Build\"]\nD4 --> D5[\"Transition\"] --> D6[\"Operate\"] --> D7[\"Deliver\"] --> D8[\"Support\"]\nD8 -.->|障害・問題の傾向| D1\nD6 -.->|性能上の学び| D2\nD7 -.->|ユーザーフィードバック| D1\nD3 -.->|調達上の制約| D2\nend\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass D1,D2,D3,D4,D5,D6,D7,D8 box",
  "flowchart TB\nsubgraph OUTPUT[\"アウトプット生成系\"]\nC1[\"Creation 生成 新しいコンテンツ・コード・ ドキュメントの生成\"]\nC2[\"Curation キュレーション 既存データの品質・関連性の向上、 重複の排除\"]\nend\nsubgraph INTERPRET[\"解釈・分析系\"]\nC3[\"Clarification 明確化 複雑な内容の要約・ 意図の明確化\"]\nC4[\"Cognition 認知 パターン認識と 予兆の発見\"]\nend\nsubgraph INTERACT[\"対話・実行系\"]\nC5[\"Communication コミュニケーション チャットボット等の 自然な対話インターフェース\"]\nC6[\"Coordination 調整 複数システムを横断した 自律的な実行・オーケストレーション\"]\nend\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass C1,C2,C3,C4,C5,C6 box",
  "flowchart LR\nsubgraph P[\"PRINCE2 の管掌範囲\"]\ndirection LR\nPR1[\"プロジェクト開始\"] --> PR2[\"管理・統制された 実行\"] --> PR3[\"プロジェクト クロージャー\"]\nend\nsubgraph I[\"ITIL Version 5 の管掌範囲\"]\ndirection LR\nIT1[\"Operate\"] --> IT2[\"Deliver\"] --> IT3[\"Support\"]\nend\nPR3 -->|\"成果物新規 変更システムの 引き継ぎ\"| IT1\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px\nclass PR1,PR2,PR3 box\nclass IT1,IT2,IT3 hub",
  "flowchart TB\nT1[\"Step 1 前提資格Foundationの 内容を復習する\"] --> T2[\"Step 2 本ガイドで PSLM 8段階の 目的・プラクティス・CSFを理解する\"]\nT2 --> T3[\"Step 3 公式 eBook Learner Workbook で 細部の用語定義を確認する\"]\nT3 --> T4[\"Step 4 公式模擬試験Official Mock Examで 出題形式に慣れる\"]\nT4 --> T5[\"Step 5 間違えた問題の根拠箇所を 公式資料で特定し、索引化する\"]\nT5 --> T6[\"Step 6 オープンブックでの 資料検索速度を本番想定で鍛える\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px\nclass T1,T2,T3,T4,T5,T6 box"
] as const;

defineSourceParityContract({
  suiteName: "pages/itil-service-v5-guide.vue",
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
  allowedHeadingSkips: ["h2 -> h4"],
  seoTitleFragments: ["ITIL", "Service", "Version 5"],
  seoTitle: "ITIL® Service (Version 5) 認定資格 完全ガイド ｜ 初学者向けステップバイステップ解説",
  seoDescription: "PeopleCert ITIL Service (Version 5) 認定資格の学習ガイド。PSLM 8段階(Discover-Support)の目的・有効化プラクティス・CSFとベストプラクティスを初学者向けに解説。",
});
