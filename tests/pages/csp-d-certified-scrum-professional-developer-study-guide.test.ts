// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csp-d-certified-scrum-professional-developer-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Scrum Professional® Developer (CSP®-D) 学習ガイド"
] as const;

const EXPECTED_H2 = [
  "CSP-D とは何か - Developer Track における位置づけ",
  "受験要件と認定プロセス",
  "Bloom's Taxonomy と学習目標の読み方(CSP-D 版)",
  "CSP-D 学習目標の全体像(5 カテゴリー概観)",
  "カテゴリー1 - Enabling a Culture of Technical Excellence",
  "カテゴリー2(前半)- アーキテクチャ・設計とレガシーシステム",
  "カテゴリー2(後半)- CI/CD とテスト実践",
  "カテゴリー3 - Facilitating Environments for a Shared Understanding",
  "カテゴリー4 - Evolving Teams to Develop and Grow",
  "カテゴリー5 - Developing Self as an Agile Leader",
  "XP プラクティス統合と CSD → A-CSD → CSP-D の積み上げ構造",
  "ベストプラクティス総合チェックリスト",
  "認定後のキャリアパス(SEU・更新・CSD Trainer)",
  "まとめ",
  "参考文献・出典一覧"
] as const;

const EXPECTED_H3 = [
  "1.1 CSP-D の概要",
  "1.2 CSP-D で身につく能力",
  "1.3 CSD / A-CSD / CSP-D の違い",
  "2.1 公式要件",
  "2.2 認定取得から更新までの流れ",
  "CSD/A-CSD との重心の違い",
  "1.1 変化の施策による具体的なメリットを3つ以上説明できる",
  "1.2 技術コーチングの側面を3つ以上説明できる",
  "1.3 1つ以上の Scrum チームとのコーチング契約(コーチングアグリーメント)を作成できる",
  "1.4 複数チームに対して技術的なトピックで技術的卓越性をコーチングする方法を3つ以上実践できる",
  "1.5 チーム間のアジャイルな作業合意を3種類以上、およびそれを維持するためのアクションプランを1つ以上提案できる",
  "2.1 創発的アーキテクチャを可能にする設計原則・パターンを3つ以上統合できる",
  "2.2 システムやプロダクトの振る舞いをユーザー・クライアント・ステークホルダーとともにモデル化する視覚的ファシリテーション技法を1つ以上適用できる",
  "2.3 レガシーシステムを5つ以上の基準で批評(critique)できる",
  "2.4 レガシーシステムの典型的な課題に対応するアジャイルな設計アプローチを3つ以上説明できる",
  "2.5 レガシーシステムに対して継続的リファクタリングのアプローチを実践できる",
  "2.6 自動化された継続的インテグレーションパイプラインの側面を3つ以上構築できる",
  "2.7 アジャイル開発のためのテスト実践を3つ以上説明できる",
  "2.8 論理的な単体テスト・コンポーネントテストを超えたアジャイル開発向けテスト実践を1つ以上実演できる",
  "2.9 システムの振る舞いに関する自動テストアプローチを3つ以上評価し、1つ以上実践できる",
  "2.10 ソフトウェアを超えて継続的インテグレーションの概念を採用する技法を3つ以上概説できる",
  "3.1 開発者コミュニティ・オブ・プラクティス(CoP)を実現するメリットを3つ以上説明できる",
  "3.2 協働デザインセッションを進行するための支援的ファシリテーション技法を3つ以上適用できる",
  "3.3 プロダクトへの取り組みが顧客・ステークホルダー・組織に与える影響を検証する実験を1つ以上設計できる",
  "4.1 アーキテクチャ・設計原則に適した学習フォーマットを3つ以上概説できる",
  "4.2 アーキテクチャ・設計原則のための学習フォーマットを1つ以上実演できる",
  "5.1 「他者を導くこと(Leading Others)」と「リーダーシップを発揮すること(Demonstrating Leadership)」を比較対照できる",
  "5.2 自身の価値観を理解し、それをアジャイルソフトウェア開発宣言の価値観・原則と関連づける手法を1つ以上適用できる",
  "5.3 プロダクト探索・顧客発見・実験に対する開発者の貢献の重要性を説明できる",
  "5.4 価値の流れ(バリューストリーム)のための視覚的モデリング技法を適用し、5つ以上の改善機会を選定できる",
  "13.1 認定の維持",
  "13.2 Comparative Agility の活用",
  "13.3 CSD Trainer(トレーナー)への道",
  "Scrum Alliance 公式ソース",
  "Scrum / Agile 基盤ソース",
  "アーキテクチャ・レガシーシステム",
  "CI/CD・テスト",
  "コミュニティ・ファシリテーション・実験",
  "学習デザイン",
  "アジャイルリーダーシップ",
  "コーチング",
  "認定後のキャリア",
  "補足で参照した個別ソース"
] as const;

const EXPECTED_H4 = [
  "コーチングアグリーメントに含めるべき項目の例",
  "改善機会の例(5つ以上を選定する際の観点)"
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\n    A[\"CSD Certified Scrum Developer 基礎: Lean/Agile/Scrum, XP実践\"] --> B[\"A-CSD Advanced Certified Scrum Developer 応用: 継続的デリバリー, DORA\"]\n    B --> C[\"CSP-D Certified Scrum Professional - Developer プロフェッショナル: 技術的卓越性の伝播, リーダーシップ\"]\n    C --> D[\"CSD Trainer Scrum Alliance 承認の CSD トレーナー\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,B box;\n    class C hub;\n    class D done;",
  "flowchart TB\n    A[\"A-CSD 資格を保有 有効/失効問わず\"] --> C[\"認定教育機関 REP の CSP-D対応コースを受講\"]\n    B[\"24か月以上の Scrum開発者実務経験を証明 過去5年以内・受講の前後を問わない\"] --> D\n    C --> D[\"事前/事後課題を含む 全コンポーネントを完了\"]\n    D --> D2[\"CSP-Dアセスメントに合格 試験またはクラス内評価\"]\n    D2 --> E[\"CSP-D 認定取得 A-CSDも自動更新\"]\n    E --> F[\"Comparative Agility プレミアム購読が付与\"]\n    E --> G[\"2年ごとに SEU 40単位を提出し 更新料を支払って更新\"]\n    G --> H[\"CSD Trainer へのステップアップも可能\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,B,C,D,D2,F,G,H box;\n    class E hub;",
  "flowchart TB\n    K[\"1. Knowledge 知識: 用語や事実を覚えている\"] --> C2[\"2. Comprehension 理解: 自分の言葉で説明できる\"]\n    C2 --> A[\"3. Application 応用: 実際の状況に適用できる\"]\n    A --> An[\"4. Analysis 分析: 要素に分解し関係性を見出せる\"]\n    An --> S[\"5. Synthesis 統合: 新しいものを創り出せる\"]\n    S --> E[\"6. Evaluation 評価: 基準に基づいて判断できる\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class K,C2,A,An box;\n    class S,E hub;",
  "flowchart TB\n    C1[\"1. Enabling a Culture of Technical Excellence 技術的卓越性の文化を複数チームに広げる\"] --> C2[\"2. Catalyzing High-Performing Technology Organizations アーキテクチャ・レガシー刷新・CI/CD・テストで組織力を高める\"]\n    C2 --> C3[\"3. Facilitating Environments for a Shared Understanding コミュニティと実験で共通理解を作る\"]\n    C3 --> C4[\"4. Evolving Teams to Develop and Grow チームの学習フォーマットを設計・実演する\"]\n    C4 --> C5[\"5. Developing Self as an Agile Leader 権威に頼らないリーダーシップを自ら体現する\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class C1,C2,C3,C4 box;\n    class C5 hub;",
  "flowchart LR\n    A[\"現状の課題認識を チームと共有\"] --> B[\"ゴールと成功指標を 合意する\"]\n    B --> C[\"関わり方 頻度・役割・境界線 を明文化する\"]\n    C --> D[\"合意書として 両者がレビュー\"]\n    D --> E[\"定期的な 振り返りで見直す\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,B,C,D box;\n    class E done;",
  "flowchart TB\n    A[\"ビジネス/技術要件の変化\"] --> B[\"Fitness Function 適応度関数で アーキテクチャ特性を自動検証\"]\n    B --> C{\"基準を満たすか?\"}\n    C -->|Yes| D[\"安全にデプロイ 進化を継続\"]\n    C -->|No| E[\"フィードバックを受けて アーキテクチャを調整\"]\n    E --> B\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,C,E box;\n    class B hub;\n    class D done;",
  "flowchart LR\n    A[\"レガシーシステム モノリス\"] -->|新機能はここに実装| B[\"新サービス/モジュール\"]\n    A -->|徐々にトラフィックを移行| C[\"ルーティング層 Facade/Proxy\"]\n    C --> B\n    C -.->|残存機能は徐々に縮小| A\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A box;\n    class C hub;\n    class B done;",
  "flowchart LR\n    A[\"コードコミット\"] --> B[\"自動ビルド\"]\n    B --> C[\"静的解析 Lint/セキュリティスキャン\"]\n    C --> D[\"自動テスト 単体/契約/結合\"]\n    D --> E[\"アーティファクト生成\"]\n    E --> F[\"Fitness Function 検証\"]\n    F --> G[\"デプロイ 段階的リリース\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,B,C,D,E,F box;\n    class G done;",
  "flowchart LR\n    A[\"Consumer 呼び出し側\"] -->|\"期待する契約を テストとして定義\"| B[\"契約ファイル Contract\"]\n    B -->|共有| C[\"契約ブローカー\"]\n    C -->|検証| D[\"Provider 提供側\"]\n    D -->|\"CIで契約に 違反していないか自動検証\"| C\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class A,D box;\n    class B,C hub;",
  "flowchart TB\n    A[\"継続的インテグレーションの思想 小さく統合し、早く検証する\"] --> B[\"ハードウェア開発 頻繁な試作・統合テスト\"]\n    A --> C[\"Infrastructure as Code インフラ変更の自動検証\"]\n    A --> D[\"Documentation as Code ドキュメントのCI/CD\"]\n    A --> E[\"マーケティング/コンテンツ 継続的な仮説検証と統合\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class B,C,D,E box;\n    class A hub;",
  "flowchart LR\n    A[\"共通の関心を持つ 開発者が集まる\"] --> B[\"定期的な交流 勉強会/ペアリング\"]\n    B --> C[\"暗黙知が 形式知化される\"]\n    C --> D[\"チームを超えた 標準/ベストプラクティスが育つ\"]\n    D --> A\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class A,B,C box;\n    class D hub;",
  "flowchart LR\n    A[\"仮説を立てる Build\"] --> B[\"最小限の実装で検証 Measure\"]\n    B --> C[\"データから学ぶ Learn\"]\n    C -->|仮説を更新| A\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class A,B box;\n    class C hub;",
  "flowchart TB\n    A[\"学習目標を定義 何を身につけたいか\"] --> B[\"フォーマットを選定 ワークショップ/ADR輪読/Kata等\"]\n    B --> C[\"セッションを設計 時間配分/進行台本\"]\n    C --> D[\"実施とファシリテーション\"]\n    D --> E[\"振り返りと 次回への改善\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,B,C,D box;\n    class E done;",
  "flowchart LR\n    A[\"Technical Problem 既知の手順で解決可能\"] -->|\"権威による 指示で対応\"| B[\"Leading / Authority\"]\n    C[\"Adaptive Challenge 答えが存在しない/価値観の対立を伴う\"] -->|\"権威に頼らず 対話と実験で対応\"| D[\"Demonstrating Leadership\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class A,B box;\n    class C,D hub;",
  "flowchart LR\n    A[\"アイデア/要求\"] --> B[\"設計\"]\n    B --> C[\"実装\"]\n    C --> D[\"テスト\"]\n    D --> E[\"デプロイ承認 待ち時間が発生しやすい\"]\n    E --> F[\"本番リリース\"]\n    F --> G[\"顧客への価値提供\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,B,C,D,F box;\n    class E hub;\n    class G done;",
  "flowchart TB\n    subgraph CSD[\"CSD: 個人の技術力\"]\n        TDD[\"TDD\"]\n        REF[\"Refactoring\"]\n        CI1[\"Continuous Integration\"]\n        PAIR[\"Pair Programming\"]\n    end\n    subgraph ACSD[\"A-CSD: チームの継続的デリバリー\"]\n        CD[\"Continuous Delivery\"]\n        DORA[\"DORA Four Keys\"]\n        LEGACY1[\"レガシーコード改善の基礎\"]\n    end\n    subgraph CSPD[\"CSP-D: 組織へのスケール\"]\n        COACH[\"技術コーチング Cat.1\"]\n        ARCH[\"アーキテクチャ/レガシー刷新 Cat.2前半\"]\n        CICD[\"CI/CDと高度なテスト Cat.2後半\"]\n        COP[\"コミュニティと実験 Cat.3\"]\n        LEARN[\"学習フォーマット設計 Cat.4\"]\n        LEAD[\"アジャイルリーダーシップ Cat.5\"]\n    end\n\n    TDD --> ARCH\n    REF --> ARCH\n    CI1 --> CICD\n    PAIR --> COACH\n    CD --> CICD\n    DORA --> COACH\n    LEGACY1 --> ARCH\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    class TDD,REF,CI1,PAIR,CD,DORA,LEGACY1 box;\n    class COACH,ARCH,CICD,COP,LEARN,LEAD hub;",
  "flowchart LR\n    A[\"CSP-D 取得\"] --> B[\"CSD Trainer 申請への足がかりを得る トレーナーになるための重要な節目\"]\n    B --> C[\"Scrum Alliance の トレーナー選考プロセス\"]\n    C --> D[\"CSD Trainer Scrum Alliance 承認の CSD トレーナー\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,B,C box;\n    class D done;"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers",
  "https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer",
  "https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer",
  "https://support.scrumalliance.org/hc/en-us/articles/16963666976667-How-to-earn-the-Certified-Scrum-Professional-Developer-CSP-D-certification",
  "https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/",
  "https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_CSP_D_LO_2021.pdf",
  "https://scrumguides.org/scrum-guide.html",
  "https://agilemanifesto.org/",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://cloud.google.com/devops",
  "https://dora.dev/",
  "https://www.agilecoachinginstitute.com/",
  "https://www.agilecoachinginstitute.com/coaching-agile-teams-book/",
  "https://resources.scrumalliance.org/",
  "https://coachingfederation.org/",
  "https://wenger-trayner.com/introduction-to-communities-of-practice/",
  "https://teamtopologies.com/",
  "https://www.thoughtworks.com/insights/books/building-evolutionary-architecture",
  "https://www.infoq.com/news/2019/02/fitness-functions-architecture",
  "https://www.eventstorming.com/",
  "https://leanpub.com/introducing_eventstorming",
  "https://www.oreilly.com/library/view/working-effectively-with/0131177052/",
  "https://martinfowler.com/bliki/TechnicalDebtQuadrant.html",
  "https://martinfowler.com/bliki/StranglerFigApplication.html",
  "https://martinfowler.com/bliki/BranchByAbstraction.html",
  "https://martinfowler.com/books/refactoring.html",
  "https://continuousdelivery.com/",
  "https://martinfowler.com/articles/continuousIntegration.html",
  "https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid",
  "https://martinfowler.com/articles/consumerDrivenContracts.html",
  "https://pact.io/",
  "https://principlesofchaos.org/",
  "https://wikispeed.org/",
  "https://www.oreilly.com/library/view/infrastructure-as-code/9781098114664/",
  "https://www.liberatingstructures.com/",
  "http://theleanstartup.com/",
  "https://adr.github.io/",
  "http://codekata.com/",
  "https://www.hks.harvard.edu/faculty/ronald-heifetz",
  "https://www.hup.harvard.edu/books/9780674518582",
  "https://agilemanifesto.org/principles.html",
  "https://www.producttalk.org/continuous-discovery-habits/",
  "https://www.poppendieck.com/",
  "https://www.toc-goldratt.com/en",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://www.scrumalliance.org/get-certified/renewing-certifications",
  "https://www.comparativeagility.com/",
  "https://www.infoq.com/news/2010/01/comparative-agility-assessment",
  "https://www.scrumalliance.org/get-certified/developer-track"
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-csp-d",
  "certification-requirements",
  "blooms-taxonomy",
  "learning-objectives-overview",
  "category-1-technical-excellence",
  "category-2-architecture-legacy",
  "category-2-cicd-testing",
  "category-3-shared-understanding",
  "category-4-team-learning",
  "category-5-agile-leader",
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
  "SECTION 15"
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 27,
  practice: 12,
  source: 31,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    "補足": 3,
    "原文": 24,
  },
  practice: {
    "ベストプラクティス": 10,
    "ベストプラクティス(カテゴリー2全体)": 1,
    "ベストプラクティス(カテゴリー5全体)": 1,
  },
  source: {
    "ソース": 31,
  },
} as const;

defineSourceParityContract({
  page: Page,
  suiteName: "pages/csp-d-certified-scrum-professional-developer-study-guide.vue",
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
    "CSP-D",
    "Certified Scrum Professional",
    "Developer",
    "完全ガイド",
  ],
  seoTitle: "CSP-D® 認定資格 完全ガイド | Certified Scrum Professional - Developer",
  seoDescription:
    "Scrum Alliance® Certified Scrum Professional - Developer (CSP-D) の公式学習目標を、初学者向けに全24項目ステップバイステップで解説する完全ガイドです。",
});

describe("pages/csp-d-certified-scrum-professional-developer-study-guide.vue — テーブル構造契約", () => {
  it("テーブルが原本と同じ件数（28件）存在し、すべて .table-wrap で包まれている", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(28);
    for (const table of tables) {
      expect(table.element.closest(".table-wrap")).not.toBeNull();
    }
  });

  it("テーブル行の総数が原本と一致する（154行）", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const rows = wrapper.findAll("table tr");
    expect(rows).toHaveLength(154);
  });
});
