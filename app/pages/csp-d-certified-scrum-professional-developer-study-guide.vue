<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
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
  "references",
];

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);
const activeId = useActiveHeading(TOC_IDS);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

useSeoMeta({
  title: "CSP-D® 認定資格 完全ガイド | Certified Scrum Professional - Developer",
  description:
    "Scrum Alliance® Certified Scrum Professional - Developer (CSP-D) の公式学習目標を、初学者向けに全24項目ステップバイステップで解説する完全ガイドです。",
});

const MERMAID_THEME_VARIABLES = {
  background: "transparent",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#2E3F72",
  secondaryColor: "#FAF1DF",
  secondaryBorderColor: "#B8802A",
  tertiaryColor: "#FFFFFF",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
  fontSize: "16px",
};

const DIAGRAM_TRACK_PROGRESSION = `flowchart LR
    A["CSD Certified Scrum Developer 基礎: Lean/Agile/Scrum, XP実践"] --> B["A-CSD Advanced Certified Scrum Developer 応用: 継続的デリバリー, DORA"]
    B --> C["CSP-D Certified Scrum Professional - Developer プロフェッショナル: 技術的卓越性の伝播, リーダーシップ"]
    C --> D["CSD Trainer Scrum Alliance 承認の CSD トレーナー"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B box;
    class C hub;
    class D done;`;

const DIAGRAM_CERTIFICATION_FLOW = `flowchart TB
    A["A-CSD 資格を保有 有効/失効問わず"] --> C["認定教育機関 REP の CSP-D対応コースを受講"]
    B["24か月以上の Scrum開発者実務経験を証明 過去5年以内・受講の前後を問わない"] --> D
    C --> D["事前/事後課題を含む 全コンポーネントを完了"]
    D --> D2["CSP-Dアセスメントに合格 試験またはクラス内評価"]
    D2 --> E["CSP-D 認定取得 A-CSDも自動更新"]
    E --> F["Comparative Agility プレミアム購読が付与"]
    E --> G["2年ごとに SEU 40単位を提出し 更新料を支払って更新"]
    G --> H["CSD Trainer へのステップアップも可能"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,D2,F,G,H box;
    class E hub;`;

const DIAGRAM_BLOOMS_PYRAMID = `flowchart TB
    K["1. Knowledge 知識: 用語や事実を覚えている"] --> C2["2. Comprehension 理解: 自分の言葉で説明できる"]
    C2 --> A["3. Application 応用: 実際の状況に適用できる"]
    A --> An["4. Analysis 分析: 要素に分解し関係性を見出せる"]
    An --> S["5. Synthesis 統合: 新しいものを創り出せる"]
    S --> E["6. Evaluation 評価: 基準に基づいて判断できる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class K,C2,A,An box;
    class S,E hub;`;

const DIAGRAM_CATEGORY_OVERVIEW = `flowchart TB
    C1["1. Enabling a Culture of Technical Excellence 技術的卓越性の文化を複数チームに広げる"] --> C2["2. Catalyzing High-Performing Technology Organizations アーキテクチャ・レガシー刷新・CI/CD・テストで組織力を高める"]
    C2 --> C3["3. Facilitating Environments for a Shared Understanding コミュニティと実験で共通理解を作る"]
    C3 --> C4["4. Evolving Teams to Develop and Grow チームの学習フォーマットを設計・実演する"]
    C4 --> C5["5. Developing Self as an Agile Leader 権威に頼らないリーダーシップを自ら体現する"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class C1,C2,C3,C4 box;
    class C5 hub;`;

const DIAGRAM_COACHING_AGREEMENT_FLOW = `flowchart LR
    A["現状の課題認識を チームと共有"] --> B["ゴールと成功指標を 合意する"]
    B --> C["関わり方 頻度・役割・境界線 を明文化する"]
    C --> D["合意書として 両者がレビュー"]
    D --> E["定期的な 振り返りで見直す"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D box;
    class E done;`;

const DIAGRAM_FITNESS_FUNCTION_FLOW = `flowchart TB
    A["ビジネス/技術要件の変化"] --> B["Fitness Function 適応度関数で アーキテクチャ特性を自動検証"]
    B --> C{"基準を満たすか?"}
    C -->|Yes| D["安全にデプロイ 進化を継続"]
    C -->|No| E["フィードバックを受けて アーキテクチャを調整"]
    E --> B

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,C,E box;
    class B hub;
    class D done;`;

const DIAGRAM_STRANGLER_FIG_FLOW = `flowchart LR
    A["レガシーシステム モノリス"] -->|新機能はここに実装| B["新サービス/モジュール"]
    A -->|徐々にトラフィックを移行| C["ルーティング層 Facade/Proxy"]
    C --> B
    C -.->|残存機能は徐々に縮小| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A box;
    class C hub;
    class B done;`;

const DIAGRAM_CI_PIPELINE_FLOW = `flowchart LR
    A["コードコミット"] --> B["自動ビルド"]
    B --> C["静的解析 Lint/セキュリティスキャン"]
    C --> D["自動テスト 単体/契約/結合"]
    D --> E["アーティファクト生成"]
    E --> F["Fitness Function 検証"]
    F --> G["デプロイ 段階的リリース"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,F box;
    class G done;`;

const DIAGRAM_CONTRACT_TESTING_FLOW = `flowchart LR
    A["Consumer 呼び出し側"] -->|"期待する契約を テストとして定義"| B["契約ファイル Contract"]
    B -->|共有| C["契約ブローカー"]
    C -->|検証| D["Provider 提供側"]
    D -->|"CIで契約に 違反していないか自動検証"| C

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,D box;
    class B,C hub;`;

const DIAGRAM_CI_BEYOND_SOFTWARE_FLOW = `flowchart TB
    A["継続的インテグレーションの思想 小さく統合し、早く検証する"] --> B["ハードウェア開発 頻繁な試作・統合テスト"]
    A --> C["Infrastructure as Code インフラ変更の自動検証"]
    A --> D["Documentation as Code ドキュメントのCI/CD"]
    A --> E["マーケティング/コンテンツ 継続的な仮説検証と統合"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class B,C,D,E box;
    class A hub;`;

const DIAGRAM_COMMUNITY_OF_PRACTICE_CYCLE = `flowchart LR
    A["共通の関心を持つ 開発者が集まる"] --> B["定期的な交流 勉強会/ペアリング"]
    B --> C["暗黙知が 形式知化される"]
    C --> D["チームを超えた 標準/ベストプラクティスが育つ"]
    D --> A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,C box;
    class D hub;`;

const DIAGRAM_BUILD_MEASURE_LEARN_LOOP = `flowchart LR
    A["仮説を立てる Build"] --> B["最小限の実装で検証 Measure"]
    B --> C["データから学ぶ Learn"]
    C -->|仮説を更新| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B box;
    class C hub;`;

const DIAGRAM_LEARNING_FORMAT_FLOW = `flowchart TB
    A["学習目標を定義 何を身につけたいか"] --> B["フォーマットを選定 ワークショップ/ADR輪読/Kata等"]
    B --> C["セッションを設計 時間配分/進行台本"]
    C --> D["実施とファシリテーション"]
    D --> E["振り返りと 次回への改善"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D box;
    class E done;`;

const DIAGRAM_LEADERSHIP_VS_AUTHORITY = `flowchart LR
    A["Technical Problem 既知の手順で解決可能"] -->|"権威による 指示で対応"| B["Leading / Authority"]
    C["Adaptive Challenge 答えが存在しない/価値観の対立を伴う"] -->|"権威に頼らず 対話と実験で対応"| D["Demonstrating Leadership"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B box;
    class C,D hub;`;

const DIAGRAM_VALUE_STREAM_MAP = `flowchart LR
    A["アイデア/要求"] --> B["設計"]
    B --> C["実装"]
    C --> D["テスト"]
    D --> E["デプロイ承認 待ち時間が発生しやすい"]
    E --> F["本番リリース"]
    F --> G["顧客への価値提供"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,F box;
    class E hub;
    class G done;`;

const DIAGRAM_XP_INTEGRATION_MAP = `flowchart TB
    subgraph CSD["CSD: 個人の技術力"]
        TDD["TDD"]
        REF["Refactoring"]
        CI1["Continuous Integration"]
        PAIR["Pair Programming"]
    end
    subgraph ACSD["A-CSD: チームの継続的デリバリー"]
        CD["Continuous Delivery"]
        DORA["DORA Four Keys"]
        LEGACY1["レガシーコード改善の基礎"]
    end
    subgraph CSPD["CSP-D: 組織へのスケール"]
        COACH["技術コーチング Cat.1"]
        ARCH["アーキテクチャ/レガシー刷新 Cat.2前半"]
        CICD["CI/CDと高度なテスト Cat.2後半"]
        COP["コミュニティと実験 Cat.3"]
        LEARN["学習フォーマット設計 Cat.4"]
        LEAD["アジャイルリーダーシップ Cat.5"]
    end

    TDD --> ARCH
    REF --> ARCH
    CI1 --> CICD
    PAIR --> COACH
    CD --> CICD
    DORA --> COACH
    LEGACY1 --> ARCH

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class TDD,REF,CI1,PAIR,CD,DORA,LEGACY1 box;
    class COACH,ARCH,CICD,COP,LEARN,LEAD hub;`;

const DIAGRAM_TRAINER_PATH_FLOW = `flowchart LR
    A["CSP-D 取得"] --> B["CSD Trainer 申請への足がかりを得る トレーナーになるための重要な節目"]
    B --> C["Scrum Alliance の トレーナー選考プロセス"]
    C --> D["CSD Trainer Scrum Alliance 承認の CSD トレーナー"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C box;
    class D done;`;

</script>

<template>
  <div class="csp-d-page">
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div
      v-if="sidebarOpen"
      class="sidebar-backdrop"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <div class="layout">
      <!-- ===================== Sidebar ===================== -->
      <nav
        id="sidebar"
        class="sidebar"
        :class="{ open: sidebarOpen }"
        aria-label="目次"
      >
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="brand-text">
            <div class="brand-title">CSP-D® 完全ガイド</div>
            <div class="brand-subtitle">Developer Track 最上位認定</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li>
            <a
              href="#what-is-csp-d"
              :class="{ active: activeId === 'what-is-csp-d' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:certificate" aria-hidden="true" />1. CSP-Dとは何か
            </a>
          </li>
          <li>
            <a
              href="#certification-requirements"
              :class="{ active: activeId === 'certification-requirements' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-check" aria-hidden="true" />2. 受験要件と認定プロセス
            </a>
          </li>
          <li>
            <a
              href="#blooms-taxonomy"
              :class="{ active: activeId === 'blooms-taxonomy' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:list-check" aria-hidden="true" />3. Bloom's Taxonomy
            </a>
          </li>
          <li>
            <a
              href="#learning-objectives-overview"
              :class="{ active: activeId === 'learning-objectives-overview' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:chart-pie" aria-hidden="true" />4. 学習目標の全体像
            </a>
          </li>
          <li>
            <a
              href="#category-1-technical-excellence"
              :class="{ active: activeId === 'category-1-technical-excellence' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:users" aria-hidden="true" />5. カテゴリー1: 技術的卓越性の文化
            </a>
          </li>
          <li>
            <a
              href="#category-2-architecture-legacy"
              :class="{ active: activeId === 'category-2-architecture-legacy' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:building" aria-hidden="true" />6. カテゴリー2前半: アーキテクチャ/レガシー
            </a>
          </li>
          <li>
            <a
              href="#category-2-cicd-testing"
              :class="{ active: activeId === 'category-2-cicd-testing' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:git-branch" aria-hidden="true" />7. カテゴリー2後半: CI/CDとテスト
            </a>
          </li>
          <li>
            <a
              href="#category-3-shared-understanding"
              :class="{ active: activeId === 'category-3-shared-understanding' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:message-circle" aria-hidden="true" />8. カテゴリー3: 共通理解の促進
            </a>
          </li>
          <li>
            <a
              href="#category-4-team-learning"
              :class="{ active: activeId === 'category-4-team-learning' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:school" aria-hidden="true" />9. カテゴリー4: チームの学習と成長
            </a>
          </li>
          <li>
            <a
              href="#category-5-agile-leader"
              :class="{ active: activeId === 'category-5-agile-leader' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:compass" aria-hidden="true" />10. カテゴリー5: アジャイルリーダー
            </a>
          </li>
          <li>
            <a
              href="#xp-integration-map"
              :class="{ active: activeId === 'xp-integration-map' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:stack-2" aria-hidden="true" />11. XPプラクティス統合
            </a>
          </li>
          <li>
            <a
              href="#best-practices-checklist"
              :class="{ active: activeId === 'best-practices-checklist' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:checklist" aria-hidden="true" />12. ベストプラクティスチェックリスト
            </a>
          </li>
          <li>
            <a
              href="#career-path"
              :class="{ active: activeId === 'career-path' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:refresh" aria-hidden="true" />13. 認定後のキャリアパス
            </a>
          </li>
          <li>
            <a
              href="#summary"
              :class="{ active: activeId === 'summary' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:flag-3" aria-hidden="true" />14. まとめ
            </a>
          </li>
          <li>
            <a
              href="#references"
              :class="{ active: activeId === 'references' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:link" aria-hidden="true" />15. 参考文献・出典一覧
            </a>
          </li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">


    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance&reg; Developer Track</div>
      <h1>Certified Scrum Professional&reg; Developer (CSP&reg;-D) 学習ガイド</h1>
      <p class="hero-lede">
        本ガイドは、世界トップクラスのソフトウェアエンジニア兼スクラムマスターの視点から、Scrum Alliance&reg; の Certified Scrum Professional&reg; - Developer (CSP&reg;-D) 認定について、初学者にもわかりやすいように段階を踏んで解説するものです。公式 Learning Objectives (LO) の各項目を1つずつ丁寧に説明し、それぞれに対応するベストプラクティスと出典 URL を付記しています。図解はすべて Mermaid で記述しており、ASCII アートは使用していません。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">学習目標カテゴリー</div></div>
        <div class="stat-card"><div class="stat-number">24項目</div><div class="stat-label">全学習目標(LO)数</div></div>
        <div class="stat-card"><div class="stat-number">24ヶ月+</div><div class="stat-label">必要な実務経験(過去5年以内)</div></div>
        <div class="stat-card"><div class="stat-number">2年ごと</div><div class="stat-label">更新に必要なSEU40単位</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは、上記出典に基づき教育目的で作成された非公式の学習補助資料です。認定試験・コースの正式な内容については、必ず<a href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>およびScrum Alliance承認トレーナーの最新情報をご確認ください。</span>
      </div>
    </div>

    <div class="callout note" data-variant="note" data-testid="callout">
      <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>対象読者:</strong> CSD (Certified Scrum Developer) / A-CSD (Advanced Certified Scrum Developer) を取得済み、またはこれから CSP-D を目指す開発者・テックリード・エンジニアリングマネージャー</p>
      <p><strong>前提知識:</strong> 本ガイドは CSD 学習ガイドおよび A-CSD 学習ガイドで扱った Scrum 基礎・XP プラクティス(TDD、リファクタリング、継続的インテグレーション)を前提とします。CSP-D はそれらの技術スキルを土台に、<strong>複数チームにまたがる技術的卓越性の醸成</strong>と<strong>アジャイルリーダーシップ</strong>を扱う、Developer Track 最上位の認定です。</p>
    </div>

    <!-- ===================== 1. What is CSP-D ===================== -->
    <section id="what-is-csp-d">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      <h2>CSP-D とは何か - Developer Track における位置づけ</h2>

      <h3>1.1 CSP-D の概要</h3>
      <p>CSP-D(Certified Scrum Professional&reg; - Developer)は、Scrum Alliance の <strong>Developer Track(開発者トラック)における最上位の認定資格</strong>です。公式ページでは次のように説明されています。</p>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>CSP-D 認定は、技術的卓越性とアジャイルリーダーシップの両面で熟達を目指す Scrum 開発者のために設計されている。</p>
      </div>
      <p>CSD(基礎)&rarr; A-CSD(応用)&rarr; <strong>CSP-D(プロフェッショナル)</strong> という順に、開発者としてのスキルが「個人の技術力」から「複数チーム・組織全体への影響力」へと段階的に拡張していく設計になっています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TRACK_PROGRESSION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSD &rarr; A-CSD &rarr; CSP-D &rarr; CSD Trainer という Developer Track の積み上げ構造</div>
      </div>

      <h3>1.2 CSP-D で身につく能力</h3>
      <p>公式サイトの "What you'll learn" セクションでは、以下の5つの能力が掲げられています。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>能力</th><th>意味(初学者向け言い換え)</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>複数の Scrum チームにまたがる技術的卓越性の文化を醸成する</td><td>1チームだけでなく、組織全体の開発品質を底上げする力</td></tr>
            <tr><td>2</td><td>高パフォーマンスなテクノロジー組織の形成を触媒する</td><td>技術力の高いチームが自然に育つ環境をつくる力</td></tr>
            <tr><td>3</td><td>ステークホルダー間の共通理解を育む環境を促進する</td><td>開発者・顧客・経営層の間で「同じ絵」を見られるようにする力</td></tr>
            <tr><td>4</td><td>Scrum チームの継続的な学習と成長を導く</td><td>チームが自走して学び続けられるように支援する力</td></tr>
            <tr><td>5</td><td>アジャイルリーダーとして自己を成長させる</td><td>役職に頼らない「権威なきリーダーシップ」を発揮する力</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">Certified Scrum Professional for Developer (CSP-D) - Scrum Alliance</a></li>
        </ul>
      </div>

      <h3>1.3 CSD / A-CSD / CSP-D の違い</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>CSD</th><th>A-CSD</th><th>CSP-D</th></tr></thead>
          <tbody>
            <tr><td>レベル</td><td>基礎(Foundation)</td><td>応用(Intermediate)</td><td>プロフェッショナル(Advanced/Leadership)</td></tr>
            <tr><td>前提資格</td><td>なし(Scrum Alliance 承認コースの受講が要件)</td><td>CSD(有効/失効問わず)</td><td>A-CSD(有効/失効問わず)</td></tr>
            <tr><td>焦点</td><td>XP エンジニアリングプラクティスの実践</td><td>継続的デリバリー・DORA・レガシーコード改善</td><td>複数チームへの技術文化の伝播、アジャイルリーダーシップ</td></tr>
            <tr><td>Bloom's レベルの中心</td><td>Knowledge&#12316;Application</td><td>Application&#12316;Analysis</td><td>Analysis&#12316;Synthesis&#12316;Evaluation</td></tr>
            <tr><td>スコープ</td><td>個人・チーム</td><td>チーム&#12316;プロダクト</td><td>複数チーム・組織</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>実務経験を先に積む。</strong>CSP-D の学習に入る前に、CSD/A-CSD で学んだ XP プラクティス(TDD、リファクタリング、CI)を実務で最低1&#12316;2年運用し、「うまくいかなかった経験」を蓄積しておくと、CSP-D のコーチング・リーダーシップ系 LO の学習効果が大きく高まります。</li>
          <li><strong>位置づけの違いを理解する。</strong>CSP-D は「答えを知っている人」になるための資格ではなく、「複数チームが自ら答えを見つける環境をつくる人」になるための資格である、という位置づけの違いを最初に理解しておくこと。</li>
        </ul>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer" target="_blank" rel="noopener">CSD - Scrum Alliance</a></li>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">A-CSD - Scrum Alliance</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 2. Certification Requirements ===================== -->
    <section id="certification-requirements">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 02</div>
      <h2>受験要件と認定プロセス</h2>

      <h3>2.1 公式要件</h3>
      <p>CSP-D 概要ページと Scrum Alliance 公式 Help Center に記載されている CSP-D の要件は以下の5点です。</p>
      <ol>
        <li><strong>A-CSD&reg; 資格を保有していること</strong>(有効・失効いずれでも可。CSP-D 取得時に A-CSD は自動更新される)</li>
        <li><strong>CSP-D 対応の教育プログラムを受講</strong>し、技術的卓越性の実現方法とアジャイルリーダーへの成長手法を学ぶこと</li>
        <li>教育提供者が設計した<strong>すべてのコンポーネント</strong>(事前・事後課題を含む)を完了すること</li>
        <li>教育提供者が実施する <strong>CSP-D アセスメント</strong>(試験形式またはクラス内評価形式)に合格すること</li>
        <li>過去5年以内に、Scrum 開発者/チームメンバーとしての<strong>実務経験24ヶ月以上</strong>を証明すること</li>
      </ol>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">CSP-D 要件 - Scrum Alliance</a></li>
          <li><a href="https://support.scrumalliance.org/hc/en-us/articles/16963666976667-How-to-earn-the-Certified-Scrum-Professional-Developer-CSP-D-certification" target="_blank" rel="noopener">How to earn the Certified Scrum Professional - Developer (CSP-D) certification - Scrum Alliance Help Center</a>(要件4のアセスメントの取り扱い)</li>
        </ul>
      </div>

      <h3>2.2 認定取得から更新までの流れ</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CERTIFICATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">A-CSD 保有から CSP-D 取得、更新、CSD Trainer までの流れ</div>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>実務経験を Scrum イベントの観点で棚卸しする。</strong>24ヶ月の実務経験は「Scrum チームのメンバーとして開発に関わった期間」であることが前提のため、応募前に自分の職務経歴を Scrum イベント(スプリントプランニング、デイリー、レビュー、レトロスペクティブ)への関与という観点で棚卸ししておくと申請がスムーズです。</li>
          <li><strong>コースのシラバスでカテゴリーの偏りを確認する。</strong>コース選定時は、教育提供者(Trainer)が Category 2(技術)だけでなく Category 5(リーダーシップ)もバランスよく扱っているかを事前にシラバスで確認しましょう。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 3. Bloom's Taxonomy ===================== -->
    <section id="blooms-taxonomy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 03</div>
      <h2>Bloom's Taxonomy と学習目標の読み方(CSP-D 版)</h2>

      <p>CSD・A-CSD と同様、CSP-D の学習目標も Bloom's Taxonomy(ブルームの分類学)の6段階に基づいて設計されています。CSP-D の学習目標文はすべて次の枕詞を補って読みます。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"Upon successful validation of the CSP-D learning objectives, the learner will be able to ..."<br/>(CSP-D の学習目標の達成が確認された時点で、学習者は次のことができるようになる)</p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BLOOMS_PYRAMID" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Bloom's Taxonomy の6段階(Knowledge から Evaluation まで)</div>
      </div>

      <h3>CSD/A-CSD との重心の違い</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>資格</th><th>中心となる Bloom's レベル</th><th>典型的な動詞</th></tr></thead>
          <tbody>
            <tr><td>CSD</td><td>Knowledge, Comprehension, Application</td><td>explain, describe, practice</td></tr>
            <tr><td>A-CSD</td><td>Application, Analysis</td><td>apply, integrate, demonstrate</td></tr>
            <tr><td><strong>CSP-D</strong></td><td><strong>Analysis, Synthesis, Evaluation</strong></td><td>critique, create, propose, compare and contrast, evaluate</td></tr>
          </tbody>
        </table>
      </div>

      <p>CSP-D の LO 文をよく読むと、"create a coaching agreement"(1.3)、"critique a legacy system"(2.3)、"compare and contrast"(5.1)のように、<strong>創造・批評・評価</strong>を要求する動詞が中心になっていることがわかります。これは、CSP-D が「知っている・できる」から「他者や組織を動かせる」への飛躍を求めているためです。</p>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>末尾の動詞に注目する。</strong>各 LO を読むとき、末尾の動詞(explain / practice / critique / create など)に注目し、「自分は今この動詞のレベルで実践できているか」を自己評価する習慣をつけると学習の抜け漏れが減ります。</li>
        </ul>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/" target="_blank" rel="noopener">Bloom's Taxonomy - Vanderbilt University CFT</a></li>
          <li><a href="https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_CSP_D_LO_2021.pdf" target="_blank" rel="noopener">CSP-D Learning Objectives (PDF)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 4. Learning Objectives Overview ===================== -->
    <section id="learning-objectives-overview">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 04</div>
      <h2>CSP-D 学習目標の全体像(5 カテゴリー概観)</h2>

      <p>CSP-D の公式 Learning Objectives(2021年8月版)は、以下の<strong>5つのカテゴリー・全24項目</strong>で構成されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CATEGORY_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSP-D 学習目標の5カテゴリーの流れ</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>カテゴリー</th><th>項目数</th><th>一言でいうと</th></tr></thead>
          <tbody>
            <tr><td>1. Enabling a Culture of Technical Excellence</td><td>5 (1.1-1.5)</td><td>技術コーチングで文化をつくる</td></tr>
            <tr><td>2. Catalyzing High-Performing Technology Organizations</td><td>10 (2.1-2.10)</td><td>アーキテクチャ・レガシー・CI/CD・テストで組織を強くする</td></tr>
            <tr><td>3. Facilitating Environments for a Shared Understanding</td><td>3 (3.1-3.3)</td><td>コミュニティと実験で理解を揃える</td></tr>
            <tr><td>4. Evolving Teams to Develop and Grow</td><td>2 (4.1-4.2)</td><td>学習フォーマットでチームを育てる</td></tr>
            <tr><td>5. Developing Self as an Agile Leader</td><td>4 (5.1-5.4)</td><td>自分自身がアジャイルリーダーになる</td></tr>
          </tbody>
        </table>
      </div>

      <p>これらの学習目標は、次の情報源を基盤としています。</p>
      <ul>
        <li><strong>Scrum Guide</strong>(<a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">scrumguides.org</a>)</li>
        <li><strong>Manifesto for Agile Software Development</strong>(4つの価値観と12の原則、<a href="https://agilemanifesto.org/" target="_blank" rel="noopener">agilemanifesto.org</a>)</li>
        <li><strong>Scrum Alliance の Scrum 価値観</strong>(<a href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">scrumalliance.org/about-scrum/values</a>)</li>
        <li><strong>Scrum Alliance Scrum Foundations Learning Objectives</strong></li>
        <li><strong>Scrum Alliance Guide Level Feedback</strong>(各コースの実施結果からのフィードバック)</li>
      </ul>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_CSP_D_LO_2021.pdf" target="_blank" rel="noopener">CSP-D Learning Objectives (PDF, 2021年8月版)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 5. Category 1 ===================== -->
    <section id="category-1-technical-excellence">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 05</div>
      <h2>カテゴリー1 - Enabling a Culture of Technical Excellence</h2>

      <p>このカテゴリーは、<strong>技術的卓越性を「自分ひとり」ではなく「複数チーム」に広げる</strong>ことをテーマとしています。CSD/A-CSD で個人・チームレベルの技術力(TDD、リファクタリング、CI)を身につけた開発者が、次に取り組むべきは「その技術文化をどう伝播させるか」です。</p>

      <h3>1.1 変化の施策による具体的なメリットを3つ以上説明できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>explain at least three tangible benefits of change measures toward higher operational excellence.</em></p>
      </div>
      <p>「変化のための施策(change measures)」とは、TDD の導入、ペアプログラミングの試験導入、CI パイプラインの整備など、チームの働き方を変える具体的な取り組みを指します。CSP-D レベルでは、これらを「なんとなく良さそう」ではなく、<strong>測定可能な成果</strong>として説明できる必要があります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>変化の施策</th><th>具体的なメリットの例</th></tr></thead>
          <tbody>
            <tr><td>TDD の導入</td><td>本番障害率の低下、リグレッションの早期検出</td></tr>
            <tr><td>CI/CD パイプラインの整備</td><td>デプロイ頻度の向上、変更のリードタイム短縮(DORA Four Keys)</td></tr>
            <tr><td>ペアプログラミング&#65295;モブプログラミング</td><td>属人化の解消、暗黙知の形式知化</td></tr>
            <tr><td>リファクタリングの継続実施</td><td>新機能追加にかかる時間の短縮(技術的負債の利子の削減)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>メリットを説明する際は、必ず「Before/After」の指標(デプロイ頻度、変更失敗率、平均復旧時間、リードタイムなど DORA Four Keys)とセットで語ること。感覚的な「良くなった」ではなく、経営層やステークホルダーにも伝わる定量的な言葉に翻訳する練習をしましょう。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://cloud.google.com/devops" target="_blank" rel="noopener">DORA - Google Cloud DevOps Research and Assessment</a></li>
          <li><a href="https://dora.dev/" target="_blank" rel="noopener">State of DevOps Report</a></li>
        </ul>
      </div>

      <h3>1.2 技術コーチングの側面を3つ以上説明できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>describe at least three aspects of technical coaching.</em></p>
      </div>
      <p>技術コーチング(Technical Coaching)は、単なる「教える」ではなく、コーチング(相手の中にある答えを引き出す)・メンタリング(自分の経験を伝える)・ティーチング(知識を教える)・ファシリテーション(対話の場を設計する)という複数の側面を状況に応じて使い分けるスキルです。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>側面</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>ティーチング (Teaching)</td><td>明確な知識ギャップがある場合に、直接的に知識・手法を教える</td></tr>
            <tr><td>メンタリング (Mentoring)</td><td>自身の経験や失敗談を共有し、相手の意思決定を支援する</td></tr>
            <tr><td>コーチング (Coaching)</td><td>答えを与えず、質問を通じて相手自身に気づきを促す</td></tr>
            <tr><td>ファシリテーション (Facilitating)</td><td>個人ではなくチーム全体が学び合える「場」を設計する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>「いつティーチングをやめてコーチングに切り替えるべきか」を判断する基準を自分の中に持つこと。相手が既に答えを持っているのにこちらが教え続けると、成長機会を奪ってしまいます。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.agilecoachinginstitute.com/" target="_blank" rel="noopener">Agile Coaching Institute - Coaching-Mentoring-Teaching-Facilitating (CDJ) model, Lyssa Adkins</a></li>
          <li><a href="https://www.agilecoachinginstitute.com/coaching-agile-teams-book/" target="_blank" rel="noopener">Coaching Agile Teams by Lyssa Adkins</a></li>
        </ul>
      </div>

      <h3>1.3 1つ以上の Scrum チームとのコーチング契約(コーチングアグリーメント)を作成できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>create a coaching agreement with one or multiple scrum teams.</em></p>
      </div>
      <p>コーチングアグリーメントとは、コーチとチームの間で「何を目的に」「どのくらいの期間」「どのような関わり方で」支援を行うかを明文化した合意です。口約束ではなく、<strong>期待値のズレを事前に解消するための成果物</strong>として作成します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_COACHING_AGREEMENT_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">コーチングアグリーメントを作成するプロセス</div>
      </div>

      <h4>コーチングアグリーメントに含めるべき項目の例</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容例</th></tr></thead>
          <tbody>
            <tr><td>目的</td><td>なぜこのコーチングを行うのか(例: レガシーコードのテスト網羅率向上)</td></tr>
            <tr><td>期間</td><td>3スプリント、6週間など</td></tr>
            <tr><td>成功指標</td><td>テストカバレッジ&#9675;%達成、CIパイプライン稼働率&#9675;%など</td></tr>
            <tr><td>関わり方</td><td>週2回のペアリング、デイリーへのオブザーブ参加など</td></tr>
            <tr><td>コーチの役割の境界</td><td>技術的意思決定はチームが行い、コーチは問いかけに徹する、等</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://resources.scrumalliance.org/" target="_blank" rel="noopener">Coaching Agreements - Scrum Alliance Resources</a></li>
          <li><a href="https://coachingfederation.org/" target="_blank" rel="noopener">International Coaching Federation - Coaching Agreements</a></li>
        </ul>
      </div>

      <h3>1.4 複数チームに対して技術的なトピックで技術的卓越性をコーチングする方法を3つ以上実践できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>practice at least three ways of coaching technical excellence with multiple teams on a technical topic.</em></p>
      </div>
      <p>1つのチームでうまくいった手法を、そのまま複数チームに水平展開しようとすると失敗しがちです。CSP-D では、<strong>複数チームという規模の違いに対応した</strong>コーチング手法を実践できる必要があります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>手法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>コードレビューのローテーション</td><td>チームをまたいでレビュアーを交換し、標準の目線合わせを行う</td></tr>
            <tr><td>技術系ギルド&#65295;チャプター運営</td><td>特定技術(テスト、アーキテクチャなど)ごとに横断コミュニティを運営する(第8章で詳述)</td></tr>
            <tr><td>ペアリング・モブプログラミングの越境実施</td><td>異なるチームのメンバー同士を一時的にペアにする</td></tr>
            <tr><td>内部カンファレンス&#65295;ライトニングトーク</td><td>チーム間で成功事例・失敗事例を共有する場を定例化する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://wenger-trayner.com/introduction-to-communities-of-practice/" target="_blank" rel="noopener">Communities of Practice - Wenger-Trayner</a></li>
        </ul>
      </div>

      <h3>1.5 チーム間のアジャイルな作業合意を3種類以上、およびそれを維持するためのアクションプランを1つ以上提案できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>propose at least three kinds of agile working agreements between teams and at least one action plan to uphold them.</em></p>
      </div>
      <p>複数チームが連携するとき、暗黙のルールに頼っていると摩擦が生まれます。<strong>チーム間の作業合意(Working Agreements)</strong>を明文化し、それを維持する仕組みまでセットで設計することが CSP-D レベルの要求です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>作業合意の種類</th><th>内容例</th></tr></thead>
          <tbody>
            <tr><td>API&#65295;インターフェース合意</td><td>チーム間の連携インターフェースの後方互換性ルール(Consumer-Driven Contracts、後述)</td></tr>
            <tr><td>「Definition of Done」の共通化</td><td>複数チームが同じ Done 基準に合意する</td></tr>
            <tr><td>依存関係の可視化・報告合意</td><td>週次でクロスチームの依存関係を共有する場を持つ</td></tr>
            <tr><td>インシデント対応時の連携合意</td><td>障害発生時にどのチームがどう連携するかの合意</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>維持するためのアクションプラン例:</strong> 四半期ごとに合意内容をレトロスペクティブで見直し、形骸化した合意を廃止し、新たに必要な合意を追加する「合意のリファクタリング」サイクルを設ける。</p>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://teamtopologies.com/" target="_blank" rel="noopener">Team Topologies - Matthew Skelton &amp; Manuel Pais</a>(チーム間インタラクションモードの整理)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 6. Category 2 (Architecture / Legacy) ===================== -->
    <section id="category-2-architecture-legacy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building" aria-hidden="true" />SECTION 06</div>
      <h2>カテゴリー2(前半)- アーキテクチャ・設計とレガシーシステム</h2>

      <p>カテゴリー2「Catalyzing High-Performing Technology Organizations」は CSP-D の中で最もボリュームが大きい(10項目)カテゴリーです。前半(2.1&#12316;2.5)はアーキテクチャ設計とレガシーシステムの刷新を扱います。</p>

      <h3>2.1 創発的アーキテクチャを可能にする設計原則・パターンを3つ以上統合できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>integrate at least three design principles or patterns that enable emerging architectures.</em></p>
      </div>
      <p>「創発的アーキテクチャ(Emerging Architecture)」とは、最初にすべてを設計し尽くすのではなく、<strong>変化を前提に段階的に育てていくアーキテクチャ</strong>のことです。Neal Ford らが提唱する「進化的アーキテクチャ(Evolutionary Architecture)」と「適応度関数(Fitness Function)」の概念が代表的な理論的基盤です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_FITNESS_FUNCTION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Fitness Function によるアーキテクチャ特性の継続検証サイクル</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>設計原則&#65295;パターン</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>Fitness Function(適応度関数)</td><td>パフォーマンス・セキュリティ・可用性などの非機能要件を自動テストとして継続検証する仕組み</td></tr>
            <tr><td>Consumer-Driven Contracts</td><td>サービス間の契約を消費者(呼び出し側)視点で定義し、破壊的変更を自動検知する</td></tr>
            <tr><td>Strangler Fig パターン</td><td>レガシーシステムを段階的に新システムへ置き換える(次節で詳述)</td></tr>
            <tr><td>Bounded Context(境界づけられたコンテキスト)</td><td>ドメイン駆動設計(DDD)でシステムの境界を明確化し、変更の影響範囲を局所化する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>Fitness Function は「後から追加するもの」ではなく、アーキテクチャ上重要な特性(セキュリティ、パフォーマンス、可用性)を洗い出した時点でバックログ化し、CI パイプラインに組み込むことで形骸化を防ぎます。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.thoughtworks.com/insights/books/building-evolutionary-architecture" target="_blank" rel="noopener">Building Evolutionary Architectures - Neal Ford, Rebecca Parsons, Patrick Kua</a></li>
          <li><a href="https://www.infoq.com/news/2019/02/fitness-functions-architecture" target="_blank" rel="noopener">Fitness Functions to Ensure Architectural Goals Are Met - InfoQ/ThoughtWorks</a></li>
        </ul>
      </div>

      <h3>2.2 システムやプロダクトの振る舞いをユーザー・クライアント・ステークホルダーとともにモデル化する視覚的ファシリテーション技法を1つ以上適用できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>apply at least one visual facilitation technique to model the behaviour of a system or product with users, clients, or stakeholders.</em></p>
      </div>
      <p>コードだけでなく、<strong>関係者全員が同じ絵を見ながら会話できる</strong>視覚的モデリング技法を使いこなす必要があります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th><th>向いている場面</th></tr></thead>
          <tbody>
            <tr><td>EventStorming</td><td>ドメインイベント(過去形の付箋)を時系列に並べてビジネスプロセスを可視化する</td><td>新規ドメインの理解、レガシー業務フローの棚卸し</td></tr>
            <tr><td>Domain Storytelling</td><td>アクターとアクションを絵文字風のアイコンで物語として描く</td><td>非エンジニアを含む対話</td></tr>
            <tr><td>User Story Mapping</td><td>ユーザーの行動フローに沿ってストーリーを配置する</td><td>プロダクトバックログの構造化</td></tr>
            <tr><td>C4 モデル</td><td>System Context &rarr; Container &rarr; Component &rarr; Code の4階層でアーキテクチャを図示する</td><td>エンジニア間のアーキテクチャ共有</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>EventStorming セッションを実施する際は、Alberto Brandolini が強調するように「答えを持つ人」と「質問を持つ人」の両方を招待し、ノートPCを使わせず、模造紙と付箋だけで進めることで、参加者の集中と対話の質が高まります。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.eventstorming.com/" target="_blank" rel="noopener">EventStorming - Alberto Brandolini</a></li>
          <li><a href="https://leanpub.com/introducing_eventstorming" target="_blank" rel="noopener">Introducing EventStorming - Alberto Brandolini</a></li>
        </ul>
      </div>

      <h3>2.3 レガシーシステムを5つ以上の基準で批評(critique)できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>critique a legacy system using at least five criteria.</em></p>
      </div>
      <p>「レガシーシステム」を「古いから悪い」で終わらせず、<strong>複数の評価軸で構造的に批評する</strong>ことが求められます。Michael Feathers は著書 <em>Working Effectively with Legacy Code</em> の中で、レガシーコードを「テストのないコード」と定義しています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>評価基準</th><th>確認すること</th></tr></thead>
          <tbody>
            <tr><td>テストカバレッジ</td><td>自動テストがどの程度、振る舞いを保護しているか</td></tr>
            <tr><td>結合度・凝集度</td><td>モジュール間の結合度が低く、責務がまとまっているか</td></tr>
            <tr><td>デプロイ容易性</td><td>変更を安全に本番へ届けるまでの所要時間・手順の複雑さ</td></tr>
            <tr><td>ドキュメント&#65295;知識の属人化</td><td>コードの意図を理解しているのが特定の個人に偏っていないか</td></tr>
            <tr><td>技術的負債の種類</td><td>Martin Fowler の技術的負債の4象限(意図的/無意識、慎重/無謀)のどこに位置するか</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.oreilly.com/library/view/working-effectively-with/0131177052/" target="_blank" rel="noopener">Working Effectively with Legacy Code - Michael Feathers</a></li>
          <li><a href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" target="_blank" rel="noopener">Technical Debt Quadrant - Martin Fowler</a></li>
        </ul>
      </div>

      <h3>2.4 レガシーシステムの典型的な課題に対応するアジャイルな設計アプローチを3つ以上説明できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>explain at least three agile design approaches to address typical challenges with legacy systems.</em></p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_STRANGLER_FIG_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Strangler Fig パターンによるレガシーシステムの段階的置き換え</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>アプローチ</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>Strangler Fig パターン</td><td>ルーティング層を介して新機能を段階的に外側に構築し、レガシー部分を少しずつ「絞め殺す」ように縮小させる</td></tr>
            <tr><td>Branch by Abstraction</td><td>抽象化レイヤーを挟むことで、実装を切り替えながら段階的に置き換える</td></tr>
            <tr><td>Characterization Test</td><td>既存の振る舞いをそのままテスト化し、リファクタリングの安全網を作る(Michael Feathers)</td></tr>
            <tr><td>Seam(継ぎ目)の発見</td><td>テストが書きにくい箇所に「継ぎ目」を見つけ、依存を注入可能にする</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/bliki/StranglerFigApplication.html" target="_blank" rel="noopener">Strangler Fig Application - Martin Fowler</a></li>
          <li><a href="https://martinfowler.com/bliki/BranchByAbstraction.html" target="_blank" rel="noopener">Branch By Abstraction - Martin Fowler</a></li>
        </ul>
      </div>

      <h3>2.5 レガシーシステムに対して継続的リファクタリングのアプローチを実践できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>practice a continuous refactoring approach on a legacy system.</em></p>
      </div>
      <p>A-CSD で学んだリファクタリングの技法(小さなステップ、テストによる保護、ボーイスカウトルール)を、<strong>レガシーシステムという難易度の高い対象</strong>に適用します。ポイントは「一気に書き直す」のではなく、日々の変更のたびに少しずつ改善を積み重ねることです。</p>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>ボーイスカウトルールを合意に組み込む。</strong>「ボーイスカウトルール(来た時よりも美しく)」をチームのワーキングアグリーメントに組み込み、触れたコードは必ず少しだけ改善してからコミットする文化を作る。</li>
          <li><strong>大規模書き直しを避ける。</strong>大規模な書き直し(Big Rewrite)は失敗率が高いことが経験的に知られているため、Strangler Fig パターンとの併用を基本方針とする。</li>
        </ul>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/books/refactoring.html" target="_blank" rel="noopener">Refactoring: Improving the Design of Existing Code - Martin Fowler</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 7. Category 2 (CI/CD & Testing) ===================== -->
    <section id="category-2-cicd-testing">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 07</div>
      <h2>カテゴリー2(後半)- CI/CD とテスト実践</h2>

      <h3>2.6 自動化された継続的インテグレーションパイプラインの側面を3つ以上構築できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>set up at least three aspects of an automated continuous integration pipeline.</em></p>
      </div>
      <p>A-CSD で学んだ CI の基礎を、<strong>組織横断で標準化されたパイプライン</strong>として構築する視点が求められます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CI_PIPELINE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">コードコミットからデプロイまでの自動化 CI パイプライン</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>CI パイプラインの側面</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>トリガーの自動化</td><td>コミット/プルリクエストごとに自動実行される</td></tr>
            <tr><td>品質ゲート</td><td>静的解析・セキュリティスキャン・テストカバレッジ閾値を通過しない限り先に進めない</td></tr>
            <tr><td>フィードバックの速さ</td><td>開発者に数分以内に結果が返る設計(Fast Feedback)</td></tr>
            <tr><td>アーティファクトの一元管理</td><td>ビルド成果物をバージョン管理し、再現性を担保する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://continuousdelivery.com/" target="_blank" rel="noopener">Continuous Delivery - Jez Humble &amp; Dave Farley</a></li>
          <li><a href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank" rel="noopener">Continuous Integration - Martin Fowler</a></li>
        </ul>
      </div>

      <h3>2.7 アジャイル開発のためのテスト実践を3つ以上説明できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>explain at least three testing practices for agile development.</em></p>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>テスト実践</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>テストピラミッド</td><td>単体テストを土台に、結合・E2E テストを少数精鋭にする比率戦略(Mike Cohn)</td></tr>
            <tr><td>Consumer-Driven Contract Testing</td><td>サービス間の契約をコンシューマー視点でテスト化し、統合テストの脆さを解消する</td></tr>
            <tr><td>Exploratory Testing(探索的テスト)</td><td>スクリプト化されていない自由な探索によって、想定外の欠陥を見つける</td></tr>
            <tr><td>Mutation Testing(変異テスト)</td><td>テストコード自体の品質を、意図的にバグを混入させて検証する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid" target="_blank" rel="noopener">Succeeding with Agile - Mike Cohn(テストピラミッド)</a></li>
          <li><a href="https://martinfowler.com/articles/consumerDrivenContracts.html" target="_blank" rel="noopener">Consumer-Driven Contracts: A Service Evolution Pattern - Martin Fowler</a></li>
        </ul>
      </div>

      <h3>2.8 論理的な単体テスト・コンポーネントテストを超えたアジャイル開発向けテスト実践を1つ以上実演できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>demonstrate at least one testing practice for agile development beyond logical unit or component tests.</em></p>
      </div>
      <p>2.7 で説明した実践のうち、少なくとも1つを<strong>手を動かして実演できる</strong>レベルまで習熟している必要があります。特に Consumer-Driven Contract Testing(例: Pact)は、マイクロサービス間の結合テストを高速かつ安定させる代表的な手法です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CONTRACT_TESTING_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Consumer-Driven Contract Testing の検証フロー</div>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://pact.io/" target="_blank" rel="noopener">Pact - Contract Testing Tool</a></li>
          <li><a href="https://martinfowler.com/articles/consumerDrivenContracts.html" target="_blank" rel="noopener">Consumer-Driven Contracts - Martin Fowler</a></li>
        </ul>
      </div>

      <h3>2.9 システムの振る舞いに関する自動テストアプローチを3つ以上評価し、1つ以上実践できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>evaluate at least three, and practice at least one automated testing approach for system behavior.</em></p>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>アプローチ</th><th>評価すべき観点</th></tr></thead>
          <tbody>
            <tr><td>Property-Based Testing</td><td>個別ケースではなく「性質(プロパティ)」を定義し、多数の入力で自動検証する</td></tr>
            <tr><td>Contract Testing</td><td>サービス間インターフェースの整合性</td></tr>
            <tr><td>Snapshot Testing</td><td>UI/出力の意図しない変化の検出</td></tr>
            <tr><td>Chaos Engineering</td><td>本番相当環境での障害注入によるレジリエンス検証</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://principlesofchaos.org/" target="_blank" rel="noopener">Principles of Chaos Engineering</a></li>
        </ul>
      </div>

      <h3>2.10 ソフトウェアを超えて継続的インテグレーションの概念を採用する技法を3つ以上概説できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>outline at least three techniques to adopt continuous integration concepts beyond software.</em></p>
      </div>
      <p>CSP-D の Program Team には、ハードウェア領域でアジャイル/CI の概念を実践してきた Joe Justice(WikiSpeed)が名を連ねています。この LO は、<strong>CI/CD の思想をソフトウェア以外の領域にも展開する</strong>視点を問うものです。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CI_BEYOND_SOFTWARE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">継続的インテグレーションの思想をソフトウェア以外の領域へ展開する例</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>領域</th><th>CI 的な適用例</th></tr></thead>
          <tbody>
            <tr><td>ハードウェア開発</td><td>短いサイクルで試作機を統合・検証する(WikiSpeed の事例)</td></tr>
            <tr><td>Infrastructure as Code</td><td>インフラ構成変更を自動テスト・自動適用する</td></tr>
            <tr><td>Documentation as Code</td><td>ドキュメントをコードと同じリポジトリ・CI で管理し、陳腐化を防ぐ</td></tr>
            <tr><td>データパイプライン</td><td>データスキーマの変更を自動検証し、下流への影響を早期検知する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://wikispeed.org/" target="_blank" rel="noopener">WikiSpeed - Joe Justice</a></li>
          <li><a href="https://www.oreilly.com/library/view/infrastructure-as-code/9781098114664/" target="_blank" rel="noopener">Infrastructure as Code - Kief Morris (O'Reilly)</a></li>
        </ul>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス(カテゴリー2全体)</div>
        <p>アーキテクチャ・レガシー刷新・CI/CD・テストの4領域は独立しているのではなく、「Fitness Function &rarr; CI パイプラインでの自動検証 &rarr; 契約テストによるサービス間整合性の担保」という<strong>一つの連続した仕組み</strong>として設計すると、複数チームにまたがる技術基盤として機能します。</p>
      </div>
    </section>

    <!-- ===================== 8. Category 3 ===================== -->
    <section id="category-3-shared-understanding">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:message-circle" aria-hidden="true" />SECTION 08</div>
      <h2>カテゴリー3 - Facilitating Environments for a Shared Understanding</h2>

      <h3>3.1 開発者コミュニティ・オブ・プラクティス(CoP)を実現するメリットを3つ以上説明できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>explain at least three benefits of enabling a developer community of practice.</em></p>
      </div>
      <p>Community of Practice(実践共同体)は、Etienne Wenger が提唱した概念で、「関心や情熱を共有し、定期的に交流することでより上手にそれを行う方法を学ぶ人々の集まり」と定義されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_COMMUNITY_OF_PRACTICE_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">開発者コミュニティ・オブ・プラクティスの循環</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>メリット</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>属人化の解消</td><td>特定チームだけが持つ知識がコミュニティ全体に共有される</td></tr>
            <tr><td>技術標準の自然な形成</td><td>トップダウンでなく現場からボトムアップで標準が育つ</td></tr>
            <tr><td>心理的な居場所の提供</td><td>所属チームとは別に「専門性で繋がる」場ができ、離職防止にも寄与する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://wenger-trayner.com/introduction-to-communities-of-practice/" target="_blank" rel="noopener">Introduction to Communities of Practice - Wenger-Trayner</a></li>
        </ul>
      </div>

      <h3>3.2 協働デザインセッションを進行するための支援的ファシリテーション技法を3つ以上適用できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>apply at least three supportive facilitation techniques to conduct a collaborative design session.</em></p>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>ラウンドロビン(Round-Robin)</td><td>参加者全員に均等に発言機会を与え、声の大きい人だけが発言するのを防ぐ</td></tr>
            <tr><td>Silent Brainstorming(沈黙のブレスト)</td><td>最初は個人で付箋に書き出し、その後グループ化することで同調バイアスを避ける</td></tr>
            <tr><td>ドット投票(Dot Voting)</td><td>複数の設計案から優先度を可視化する簡易合意形成技法</td></tr>
            <tr><td>タイムボックス化されたディスカッション</td><td>発散と収束のフェーズを時間で区切り、議論の停滞を防ぐ</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.liberatingstructures.com/" target="_blank" rel="noopener">Liberating Structures</a></li>
        </ul>
      </div>

      <h3>3.3 プロダクトへの取り組みが顧客・ステークホルダー・組織に与える影響を検証する実験を1つ以上設計できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>create at least one experiment to examine the impact of product work on customers, stakeholders, and/or the organization.</em></p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BUILD_MEASURE_LEARN_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Build-Measure-Learn のフィードバックループ</div>
      </div>

      <p>Build-Measure-Learn のフィードバックループ(リーン・スタートアップ)を使い、機能開発を「作ることが目的」ではなく「学ぶための実験」として設計します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>実験の要素</th><th>例</th></tr></thead>
          <tbody>
            <tr><td>仮説</td><td>「この機能を追加すればコンバージョン率が&#9675;%改善する」</td></tr>
            <tr><td>最小の検証手段</td><td>A/B テスト、フィーチャーフラグによる段階的公開、コンシェルジュMVP</td></tr>
            <tr><td>成功指標</td><td>事前に定義した定量指標(North Star Metric など)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="http://theleanstartup.com/" target="_blank" rel="noopener">The Lean Startup - Eric Ries</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 9. Category 4 ===================== -->
    <section id="category-4-team-learning">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:school" aria-hidden="true" />SECTION 09</div>
      <h2>カテゴリー4 - Evolving Teams to Develop and Grow</h2>

      <h3>4.1 アーキテクチャ・設計原則に適した学習フォーマットを3つ以上概説できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>outline at least three suitable learning formats for architecture and design principles.</em></p>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>学習フォーマット</th><th>向いている内容</th></tr></thead>
          <tbody>
            <tr><td>ハンズオンワークショップ</td><td>実際に手を動かして設計パターンを体験する</td></tr>
            <tr><td>アーキテクチャデシジョンレコード(ADR)の輪読</td><td>過去の意思決定の背景と結果から学ぶ</td></tr>
            <tr><td>コードカタ(Code Kata)</td><td>反復練習で設計原則を体に染み込ませる</td></tr>
            <tr><td>ペアリング/モブでの実プロダクトへの適用</td><td>実務の文脈で即座にフィードバックを得る</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://adr.github.io/" target="_blank" rel="noopener">Architectural Decision Records (ADR)</a></li>
          <li><a href="http://codekata.com/" target="_blank" rel="noopener">Code Kata - Dave Thomas</a></li>
        </ul>
      </div>

      <h3>4.2 アーキテクチャ・設計原則のための学習フォーマットを1つ以上実演できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>demonstrate at least one learning format for architecture and design principles.</em></p>
      </div>
      <p>4.1 で概説した学習フォーマットのうち、少なくとも1つを<strong>実際にファシリテートして見せる</strong>必要があります。CSP-D 受講者は、単に「知っている」だけでなく、他の開発者を巻き込んで学習セッションを運営できることが求められます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_LEARNING_FORMAT_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">学習セッションを設計・実施するプロセス</div>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>学習セッションは「一度きりのイベント」ではなく、レトロスペクティブと同様に<strong>定例化</strong>し、毎回少しずつ改善するプロセスとして運営すると定着しやすくなります。</p>
      </div>
    </section>

    <!-- ===================== 10. Category 5 ===================== -->
    <section id="category-5-agile-leader">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:compass" aria-hidden="true" />SECTION 10</div>
      <h2>カテゴリー5 - Developing Self as an Agile Leader</h2>

      <p>CSP-D の最後のカテゴリーは、技術やプロセスではなく<strong>開発者自身のリーダーシップのあり方</strong>を扱います。</p>

      <h3>5.1 「他者を導くこと(Leading Others)」と「リーダーシップを発揮すること(Demonstrating Leadership)」を比較対照できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>compare and contrast leading others vs. demonstrating leadership.</em></p>
      </div>
      <p>Ronald Heifetz(ハーバード・ケネディスクール)が提唱する <strong>Adaptive Leadership(適応型リーダーシップ)</strong> の中核的な考え方が、この LO の理論的背景です。Heifetz は「権威(Authority)」と「リーダーシップ(Leadership)」を明確に区別しました。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>Leading Others(権威による牽引)</th><th>Demonstrating Leadership(権威なきリーダーシップ)</th></tr></thead>
          <tbody>
            <tr><td>前提となる立場</td><td>役職・肩書きに基づく指示</td><td>役職に関係なく、誰でも発揮できる</td></tr>
            <tr><td>対応する問題の種類</td><td>Technical Problem(既知の解決策がある問題)</td><td>Adaptive Challenge(答えが存在しない、価値観の変化を伴う問題)</td></tr>
            <tr><td>アプローチ</td><td>指示・命令で解決する</td><td>問いを投げかけ、関係者自身に変化を促す</td></tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_LEADERSHIP_VS_AUTHORITY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Technical Problem と Adaptive Challenge への対応の違い</div>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>開発者が直面する問題を「これは Technical Problem か、Adaptive Challenge か」で最初に切り分ける習慣をつけると、無自覚に権威(マネージャーの決定待ち)に頼りすぎることを防げます。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.hks.harvard.edu/faculty/ronald-heifetz" target="_blank" rel="noopener">Ronald Heifetz - Harvard Kennedy School</a></li>
          <li><a href="https://www.hup.harvard.edu/books/9780674518582" target="_blank" rel="noopener">Leadership Without Easy Answers - Ronald Heifetz</a></li>
        </ul>
      </div>

      <h3>5.2 自身の価値観を理解し、それをアジャイルソフトウェア開発宣言の価値観・原則と関連づける手法を1つ以上適用できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>apply at least one method to understand their own value system and relate it to the values and principles of the Manifesto for Agile Software Development.</em></p>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>手法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>価値観の書き出しワーク</td><td>自分が仕事で大切にしていることを言語化し、アジャイル宣言の4つの価値観と照合する</td></tr>
            <tr><td>Personal Working Agreement</td><td>自分自身が他者とどう協働したいかを明文化する</td></tr>
            <tr><td>フィードバックの収集(360度フィードバック的手法)</td><td>他者からの評価と自己認識のギャップを可視化する</td></tr>
          </tbody>
        </table>
      </div>

      <p>Agile Manifesto の4つの価値観(<a href="https://agilemanifesto.org/" target="_blank" rel="noopener">agilemanifesto.org</a>):</p>
      <ol>
        <li>プロセスやツールよりも<strong>個人と対話</strong>を</li>
        <li>包括的なドキュメントよりも<strong>動くソフトウェア</strong>を</li>
        <li>契約交渉よりも<strong>顧客との協調</strong>を</li>
        <li>計画に従うことよりも<strong>変化への対応</strong>を</li>
      </ol>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">Manifesto for Agile Software Development</a></li>
          <li><a href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">Principles behind the Agile Manifesto</a></li>
        </ul>
      </div>

      <h3>5.3 プロダクト探索・顧客発見・実験に対する開発者の貢献の重要性を説明できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>describe the importance of developer contribution to product exploration, customer discovery and experimentation.</em></p>
      </div>
      <p>CSP-D は、開発者が「要件をもらって実装するだけの存在」ではなく、<strong>プロダクト探索(何を作るべきか)や顧客発見に主体的に関わる存在</strong>であるべきだという考え方を明確に打ち出しています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>開発者の貢献領域</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>技術的実現可能性のフィードバック</td><td>顧客発見の初期段階から「作れるか・作る価値があるか」を助言する</td></tr>
            <tr><td>プロトタイピングへの参加</td><td>技術的な観点から素早い検証手段(スパイク、フィーチャーフラグ)を提案する</td></tr>
            <tr><td>データに基づく意見形成</td><td>実験結果や技術的制約を踏まえ、プロダクトオーナーと対等に議論する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.producttalk.org/continuous-discovery-habits/" target="_blank" rel="noopener">Continuous Discovery Habits - Teresa Torres</a></li>
        </ul>
      </div>

      <h3>5.4 価値の流れ(バリューストリーム)のための視覚的モデリング技法を適用し、5つ以上の改善機会を選定できる</h3>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />原文</div>
        <p><em>apply a visual modelling technique for a value stream and select at least five improvement opportunities.</em></p>
      </div>
      <p><strong>バリューストリームマッピング(Value Stream Mapping, VSM)</strong>は、アイデアが顧客への価値提供に至るまでの全工程を可視化し、ムダ(待ち時間・手戻り・過剰な承認プロセスなど)を発見する手法です。もともとはリーン生産方式(トヨタ生産方式)に由来し、Mary &amp; Tom Poppendieck によってソフトウェア開発に適用されました。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_VALUE_STREAM_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">アイデアから顧客への価値提供までのバリューストリーム</div>
      </div>

      <h4>改善機会の例(5つ以上を選定する際の観点)</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th></tr></thead>
          <tbody>
            <tr><td>1. 各工程間の待ち時間(Wait Time)の削減</td></tr>
            <tr><td>2. 手戻り・やり直し(Rework)を生む工程の特定</td></tr>
            <tr><td>3. 不要な承認ステップの削除・簡素化</td></tr>
            <tr><td>4. バッチサイズ(一度に運ぶ作業量)の縮小</td></tr>
            <tr><td>5. ボトルネック工程(制約条件)への集中的な改善投資</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.poppendieck.com/" target="_blank" rel="noopener">Lean Software Development - Mary &amp; Tom Poppendieck</a></li>
          <li><a href="https://www.toc-goldratt.com/en" target="_blank" rel="noopener">The Goal - Eliyahu Goldratt(制約理論)</a></li>
        </ul>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス(カテゴリー5全体)</div>
        <p>4つのリーダーシップ系 LO は、いずれも「学んで終わり」にせず、実際の1on1・レトロスペクティブ・バリューストリームマッピングのワークショップという<strong>具体的な場</strong>で実践することで初めて評価可能なスキルになります。</p>
      </div>
    </section>

    <!-- ===================== 11. XP Integration Map ===================== -->
    <section id="xp-integration-map">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:stack-2" aria-hidden="true" />SECTION 11</div>
      <h2>XP プラクティス統合と CSD &rarr; A-CSD &rarr; CSP-D の積み上げ構造</h2>

      <p>CSP-D の学習目標は独立したものではなく、CSD/A-CSD で学んだ XP(エクストリーム・プログラミング)プラクティスの上に成り立っています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_XP_INTEGRATION_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSD の個人技術力から CSP-D の組織スケールへの発展</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>CSD/A-CSD の技術基盤</th><th>CSP-D での発展先</th></tr></thead>
          <tbody>
            <tr><td>TDD・リファクタリング</td><td>レガシーシステムの批評(2.3)と継続的リファクタリング(2.5)へ拡張</td></tr>
            <tr><td>継続的インテグレーション</td><td>組織横断の自動化パイプライン構築(2.6)へ拡張</td></tr>
            <tr><td>DORA Four Keys</td><td>変化施策のメリット説明(1.1)の定量的根拠として活用</td></tr>
            <tr><td>ペアプログラミング</td><td>技術コーチングの手法(1.4)、越境ペアリングへ拡張</td></tr>
            <tr><td>レガシーコード改善(A-CSD)</td><td>レガシーシステムの評価軸(2.3)・アジャイル設計アプローチ(2.4)へ深化</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 12. Best Practices Checklist ===================== -->
    <section id="best-practices-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checklist" aria-hidden="true" />SECTION 12</div>
      <h2>ベストプラクティス総合チェックリスト</h2>

      <p>以下は、CSP-D の5カテゴリーにまたがる実践のベストプラクティスをチェックリスト形式でまとめたものです。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>チェック項目</th><th>カテゴリー</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>施策の効果を DORA Four Keys 等の定量指標で語れるようにしている</td><td>1</td></tr>
            <tr><td>2</td><td>ティーチング/メンタリング/コーチング/ファシリテーションを状況に応じて使い分けている</td><td>1</td></tr>
            <tr><td>3</td><td>チームとのコーチングアグリーメントを口約束でなく文書化している</td><td>1</td></tr>
            <tr><td>4</td><td>Fitness Function を CI パイプラインに組み込み、アーキテクチャ特性を継続検証している</td><td>2</td></tr>
            <tr><td>5</td><td>レガシーシステムを5つ以上の基準(テスト・結合度・デプロイ性・属人化・技術的負債の種類)で評価している</td><td>2</td></tr>
            <tr><td>6</td><td>Strangler Fig パターンなど段階的なレガシー刷新アプローチを選定している</td><td>2</td></tr>
            <tr><td>7</td><td>Consumer-Driven Contract Testing など単体テストを超えるテスト実践を導入している</td><td>2</td></tr>
            <tr><td>8</td><td>CI/CD の思想をインフラ・ドキュメント等ソフトウェア以外にも展開している</td><td>2</td></tr>
            <tr><td>9</td><td>開発者コミュニティ・オブ・プラクティスを定例で運営している</td><td>3</td></tr>
            <tr><td>10</td><td>協働デザインセッションでラウンドロビンや沈黙のブレストなど支援的技法を使っている</td><td>3</td></tr>
            <tr><td>11</td><td>機能開発を Build-Measure-Learn の実験として設計している</td><td>3</td></tr>
            <tr><td>12</td><td>アーキテクチャ学習をワークショップ・ADR輪読・Code Kata等、複数フォーマットで提供している</td><td>4</td></tr>
            <tr><td>13</td><td>Technical Problem と Adaptive Challenge を区別してから対応方針を決めている</td><td>5</td></tr>
            <tr><td>14</td><td>自分の価値観をアジャイル宣言の4価値観と定期的に照合している</td><td>5</td></tr>
            <tr><td>15</td><td>プロダクト探索・顧客発見に開発者として主体的に関与している</td><td>5</td></tr>
            <tr><td>16</td><td>バリューストリームマッピングで5つ以上の改善機会を継続的に発見・実行している</td><td>5</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 13. Career Path ===================== -->
    <section id="career-path">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 13</div>
      <h2>認定後のキャリアパス(SEU・更新・CSD Trainer)</h2>

      <h3>13.1 認定の維持</h3>
      <p>CSP-D は「取得して終わり」ではなく、<strong>2年ごとに Scrum Education Units(SEU)40単位を取得</strong>して更新する必要があります。SEU は書籍を読む、ウェビナーを視聴する、イベントに参加するなど、継続的な学習活動によって蓄積されます。</p>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">Scrum Education Units - Scrum Alliance</a></li>
          <li><a href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">Renewing Certifications - Scrum Alliance</a></li>
        </ul>
      </div>

      <h3>13.2 Comparative Agility の活用</h3>
      <p>CSP-D 取得者には <strong>Comparative Agility&reg;</strong> のプレミアム購読が特典として提供されます。これは、チーム・組織のアジリティを8つの次元(チームワーク、要求、計画、技術的実践、品質、文化、知識創造、Outcomes(成果))で診断し、業界内での相対比較を可能にするアセスメントプラットフォームです。</p>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.comparativeagility.com/" target="_blank" rel="noopener">Comparative Agility</a></li>
          <li><a href="https://www.infoq.com/news/2010/01/comparative-agility-assessment" target="_blank" rel="noopener">How Does Your Agile Compare to Your Competition? - InfoQ</a></li>
        </ul>
      </div>

      <h3>13.3 CSD Trainer(トレーナー)への道</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TRAINER_PATH_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSP-D 取得から CSD Trainer に至る道筋</div>
      </div>

      <p>公式ページには「CSP-D 認定を受けることは、CSD トレーナーになりたい場合の重要なマイルストーンである」と明記されています。技術力とリーダーシップの両輪を備えた CSP-D は、次世代の開発者を育てる CSD Trainer への自然なステップアップとなります(CSD トレーナーの申請経路・要件は Scrum Alliance のトレーナー申請ページを正とします)。</p>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">CSP-D - Scrum Alliance("Register for CSP-D today!"セクション)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 14. Summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 14</div>
      <h2>まとめ</h2>

      <p>CSP-D は、CSD・A-CSD で培った<strong>個人・チームレベルの技術的卓越性</strong>を、<strong>複数チーム・組織全体</strong>へと展開するための認定資格です。5つのカテゴリーを通じて学ぶ内容を一言でまとめると、次のようになります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>カテゴリー</th><th>一言まとめ</th></tr></thead>
          <tbody>
            <tr><td>1. Enabling a Culture of Technical Excellence</td><td>自分の技術力を、コーチングを通じて他者・他チームに広げる</td></tr>
            <tr><td>2. Catalyzing High-Performing Technology Organizations</td><td>アーキテクチャ・レガシー刷新・CI/CD・テストで組織の技術基盤を強くする</td></tr>
            <tr><td>3. Facilitating Environments for a Shared Understanding</td><td>コミュニティと実験によって、関係者間の共通理解を作る</td></tr>
            <tr><td>4. Evolving Teams to Develop and Grow</td><td>チームが自ら学び続けられる学習フォーマットを設計・実演する</td></tr>
            <tr><td>5. Developing Self as an Agile Leader</td><td>権威に頼らず、自分自身がアジャイルリーダーとして成長する</td></tr>
          </tbody>
        </table>
      </div>

      <p>CSP-D の学習を通じて開発者は、「良いコードを書く人」から「良いコードが自然に生まれる組織文化とリーダーシップを作る人」へと役割を拡張していきます。これは CSD の技術基礎、A-CSD の継続的デリバリー実践の先にある、Developer Track の到達点です。</p>
    </section>

    <!-- ===================== 15. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 15</div>
      <h2>参考文献・出典一覧</h2>

      <div class="ref-group">
        <h3>Scrum Alliance 公式ソース</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Certified Scrum Professional for Developer (CSP-D) - Scrum Alliance</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers</a></li>
          <li><span class="ref-name">CSP-D Learning Objectives (PDF, 2021年8月版)</span><a class="ref-url" href="https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_CSP_D_LO_2021.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_CSP_D_LO_2021.pdf</a></li>
          <li><span class="ref-name">Certified Scrum Developer (CSD) - Scrum Alliance</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer</a></li>
          <li><span class="ref-name">Advanced Certified Scrum Developer (A-CSD) - Scrum Alliance</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer</a></li>
          <li><span class="ref-name">Scrum Alliance の Scrum 価値観</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
          <li><span class="ref-name">Scrum Education Units (SEU)</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
          <li><span class="ref-name">Renewing Certifications - Scrum Alliance</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/renewing-certifications</a></li>
          <li><span class="ref-name">Developer Track - Scrum Alliance</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>Scrum / Agile 基盤ソース</h3>
        <ul class="ref-list">
          <li><span class="ref-name">The Scrum Guide</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
          <li><span class="ref-name">Manifesto for Agile Software Development</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          <li><span class="ref-name">Principles behind the Agile Manifesto</span><a class="ref-url" href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/principles.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>アーキテクチャ・レガシーシステム</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Building Evolutionary Architectures - ThoughtWorks</span><a class="ref-url" href="https://www.thoughtworks.com/insights/books/building-evolutionary-architecture" target="_blank" rel="noopener">https://www.thoughtworks.com/insights/books/building-evolutionary-architecture</a></li>
          <li><span class="ref-name">Fitness Functions to Ensure Architectural Goals Are Met - InfoQ</span><a class="ref-url" href="https://www.infoq.com/news/2019/02/fitness-functions-architecture" target="_blank" rel="noopener">https://www.infoq.com/news/2019/02/fitness-functions-architecture</a></li>
          <li><span class="ref-name">Working Effectively with Legacy Code - Michael Feathers</span><a class="ref-url" href="https://www.oreilly.com/library/view/working-effectively-with/0131177052/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/working-effectively-with/0131177052/</a></li>
          <li><span class="ref-name">Technical Debt Quadrant - Martin Fowler</span><a class="ref-url" href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TechnicalDebtQuadrant.html</a></li>
          <li><span class="ref-name">Strangler Fig Application - Martin Fowler</span><a class="ref-url" href="https://martinfowler.com/bliki/StranglerFigApplication.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/StranglerFigApplication.html</a></li>
          <li><span class="ref-name">Branch By Abstraction - Martin Fowler</span><a class="ref-url" href="https://martinfowler.com/bliki/BranchByAbstraction.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/BranchByAbstraction.html</a></li>
          <li><span class="ref-name">Refactoring: Improving the Design of Existing Code - Martin Fowler</span><a class="ref-url" href="https://martinfowler.com/books/refactoring.html" target="_blank" rel="noopener">https://martinfowler.com/books/refactoring.html</a></li>
          <li><span class="ref-name">EventStorming - Alberto Brandolini</span><a class="ref-url" href="https://www.eventstorming.com/" target="_blank" rel="noopener">https://www.eventstorming.com/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>CI/CD・テスト</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Continuous Delivery - Jez Humble &amp; Dave Farley</span><a class="ref-url" href="https://continuousdelivery.com/" target="_blank" rel="noopener">https://continuousdelivery.com/</a></li>
          <li><span class="ref-name">Continuous Integration - Martin Fowler</span><a class="ref-url" href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank" rel="noopener">https://martinfowler.com/articles/continuousIntegration.html</a></li>
          <li><span class="ref-name">Consumer-Driven Contracts: A Service Evolution Pattern - Martin Fowler</span><a class="ref-url" href="https://martinfowler.com/articles/consumerDrivenContracts.html" target="_blank" rel="noopener">https://martinfowler.com/articles/consumerDrivenContracts.html</a></li>
          <li><span class="ref-name">Pact - Contract Testing Tool</span><a class="ref-url" href="https://pact.io/" target="_blank" rel="noopener">https://pact.io/</a></li>
          <li><span class="ref-name">The Forgotten Layer of the Test Automation Pyramid - Mike Cohn</span><a class="ref-url" href="https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid" target="_blank" rel="noopener">https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid</a></li>
          <li><span class="ref-name">Principles of Chaos Engineering</span><a class="ref-url" href="https://principlesofchaos.org/" target="_blank" rel="noopener">https://principlesofchaos.org/</a></li>
          <li><span class="ref-name">DORA - Google Cloud DevOps Research and Assessment</span><a class="ref-url" href="https://cloud.google.com/devops" target="_blank" rel="noopener">https://cloud.google.com/devops</a></li>
          <li><span class="ref-name">WikiSpeed - Joe Justice</span><a class="ref-url" href="https://wikispeed.org/" target="_blank" rel="noopener">https://wikispeed.org/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>コミュニティ・ファシリテーション・実験</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Introduction to Communities of Practice - Wenger-Trayner</span><a class="ref-url" href="https://wenger-trayner.com/introduction-to-communities-of-practice/" target="_blank" rel="noopener">https://wenger-trayner.com/introduction-to-communities-of-practice/</a></li>
          <li><span class="ref-name">Liberating Structures</span><a class="ref-url" href="https://www.liberatingstructures.com/" target="_blank" rel="noopener">https://www.liberatingstructures.com/</a></li>
          <li><span class="ref-name">The Lean Startup - Eric Ries</span><a class="ref-url" href="http://theleanstartup.com/" target="_blank" rel="noopener">http://theleanstartup.com/</a></li>
          <li><span class="ref-name">Continuous Discovery Habits - Teresa Torres</span><a class="ref-url" href="https://www.producttalk.org/continuous-discovery-habits/" target="_blank" rel="noopener">https://www.producttalk.org/continuous-discovery-habits/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>学習デザイン</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Bloom's Taxonomy - Vanderbilt University CFT</span><a class="ref-url" href="https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/" target="_blank" rel="noopener">https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/</a></li>
          <li><span class="ref-name">Architectural Decision Records (ADR)</span><a class="ref-url" href="https://adr.github.io/" target="_blank" rel="noopener">https://adr.github.io/</a></li>
          <li><span class="ref-name">Code Kata - Dave Thomas</span><a class="ref-url" href="http://codekata.com/" target="_blank" rel="noopener">http://codekata.com/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>アジャイルリーダーシップ</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Ronald Heifetz - Harvard Kennedy School</span><a class="ref-url" href="https://www.hks.harvard.edu/faculty/ronald-heifetz" target="_blank" rel="noopener">https://www.hks.harvard.edu/faculty/ronald-heifetz</a></li>
          <li><span class="ref-name">Leadership Without Easy Answers - Ronald Heifetz</span><a class="ref-url" href="https://www.hup.harvard.edu/books/9780674518582" target="_blank" rel="noopener">https://www.hup.harvard.edu/books/9780674518582</a></li>
          <li><span class="ref-name">Team Topologies - Matthew Skelton &amp; Manuel Pais</span><a class="ref-url" href="https://teamtopologies.com/" target="_blank" rel="noopener">https://teamtopologies.com/</a></li>
          <li><span class="ref-name">Lean Software Development - Mary &amp; Tom Poppendieck</span><a class="ref-url" href="https://www.poppendieck.com/" target="_blank" rel="noopener">https://www.poppendieck.com/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>コーチング</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Agile Coaching Institute - Lyssa Adkins</span><a class="ref-url" href="https://www.agilecoachinginstitute.com/" target="_blank" rel="noopener">https://www.agilecoachinginstitute.com/</a></li>
          <li><span class="ref-name">International Coaching Federation - Coaching Agreements</span><a class="ref-url" href="https://coachingfederation.org/" target="_blank" rel="noopener">https://coachingfederation.org/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>認定後のキャリア</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Comparative Agility</span><a class="ref-url" href="https://www.comparativeagility.com/" target="_blank" rel="noopener">https://www.comparativeagility.com/</a></li>
          <li><span class="ref-name">How Does Your Agile Compare to Your Competition? - InfoQ</span><a class="ref-url" href="https://www.infoq.com/news/2010/01/comparative-agility-assessment" target="_blank" rel="noopener">https://www.infoq.com/news/2010/01/comparative-agility-assessment</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>補足で参照した個別ソース</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Coaching Agreements - Scrum Alliance Resources</span><a class="ref-url" href="https://resources.scrumalliance.org/" target="_blank" rel="noopener">https://resources.scrumalliance.org/</a></li>
          <li><span class="ref-name">Coaching Agile Teams by Lyssa Adkins</span><a class="ref-url" href="https://www.agilecoachinginstitute.com/coaching-agile-teams-book/" target="_blank" rel="noopener">https://www.agilecoachinginstitute.com/coaching-agile-teams-book/</a></li>
          <li><span class="ref-name">Introducing EventStorming - Alberto Brandolini</span><a class="ref-url" href="https://leanpub.com/introducing_eventstorming" target="_blank" rel="noopener">https://leanpub.com/introducing_eventstorming</a></li>
          <li><span class="ref-name">Infrastructure as Code - Kief Morris (O'Reilly)</span><a class="ref-url" href="https://www.oreilly.com/library/view/infrastructure-as-code/9781098114664/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/infrastructure-as-code/9781098114664/</a></li>
          <li><span class="ref-name">State of DevOps Report</span><a class="ref-url" href="https://dora.dev/" target="_blank" rel="noopener">https://dora.dev/</a></li>
          <li><span class="ref-name">The Goal - Eliyahu Goldratt(制約理論)</span><a class="ref-url" href="https://www.toc-goldratt.com/en" target="_blank" rel="noopener">https://www.toc-goldratt.com/en</a></li>
        </ul>
      </div>

      <p><em>本ガイドは、上記出典に基づき教育目的で作成された非公式の学習補助資料です。認定試験・コースの正式な内容については、必ず Scrum Alliance 公式サイトおよびScrum Alliance承認トレーナーの最新情報をご確認ください。</em></p>
    </section>


    <footer>
      Certified Scrum Professional&reg;、CSP&reg;、Scrum Alliance&reg; は Scrum Alliance, Inc. の登録商標です。本ページはその教育目的の非公式解説であり、Scrum Alliance の公式提供物ではありません。内容は執筆時点の公式情報に基づいています。
    </footer>

  
      </main>
    </div>
  </div>
</template>

<style scoped>

  :root {
    /* ---- Named palette (paper / ink / indigo / gold / forest / plum) ---- */
    --color-paper:        #F6F7F9;
    --color-paper-raised: #FFFFFF;
    --color-paper-sunken: #EEF0F4;

    --color-ink:          #161B26;
    --color-ink-soft:     #4B5566;
    --color-ink-faint:    #8A93A3;

    --color-border:       #DFE3EA;
    --color-border-strong:#C7CDD9;

    --color-indigo:       #2E3F72;
    --color-indigo-dark:  #1F2C57;
    --color-indigo-tint:  #EEF1F8;

    --color-gold:         #B8802A;
    --color-gold-tint:    #FAF1DF;

    --color-forest:       #1B6E6A;
    --color-forest-tint:  #E7F3F2;

    --color-plum:         #8C3A5C;
    --color-plum-tint:    #F6EAEF;

    --color-success-bg:    #EAF4EC;
    --color-success-text:  #2F6B3D;
    --color-success-border:#BFE0C6;

    --color-info-bg:       #EEF1F8;
    --color-info-text:     #2E3F72;
    --color-info-border:   #C7D1EA;

    /* ---- Typography ---- */
    --font-display: "Source Serif 4", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif;
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif;
    --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;

    --sidebar-width: 288px;
  }

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--color-indigo); text-decoration: none; }
  a:hover { text-decoration: underline; }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--color-indigo); outline-offset: 2px; }

  img, svg { max-width: 100%; }

  .layout {
    display: block;
  }

  /* ===================== Sidebar ===================== */
  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    width: var(--sidebar-width);
    height: calc(100vh - var(--global-nav-height));
    overflow-y: auto;
    background: var(--color-paper-raised);
    border-right: 1px solid var(--color-border);
    padding: 32px 24px 40px;
    z-index: 20;
    transition: transform 0.25s ease;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }

  .seal {
    flex: none;
    width: 36px;
    height: 36px;
  }

  .brand-text .brand-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 19px;
    color: var(--color-ink);
    letter-spacing: 0.02em;
  }

  .brand-text .brand-subtitle {
    font-size: 16px;
    color: var(--color-ink-faint);
    margin-top: 2px;
  }

  .sidebar-nav {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sidebar-nav .nav-group-label {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-ink-faint);
    letter-spacing: 0.06em;
    margin: 22px 0 8px;
    padding-left: 12px;
  }

  .sidebar-nav .nav-group-label:first-child { margin-top: 0; }

  .sidebar-nav li { margin: 2px 0; }

  .sidebar-nav a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    color: var(--color-ink-soft);
    font-size: 16px;
    line-height: 1.4;
    border-left: 2px solid transparent;
  }

  .sidebar-nav a i { font-size: 17px; color: var(--color-ink-faint); flex: none; }

  .sidebar-nav a:hover {
    background: var(--color-indigo-tint);
    text-decoration: none;
    color: var(--color-indigo);
  }

  .sidebar-nav a.active {
    background: var(--color-indigo-tint);
    color: var(--color-indigo);
    font-weight: 600;
    border-left: 2px solid var(--color-indigo);
  }

  .sidebar-nav a.active i { color: var(--color-indigo); }

  .sidebar-toggle {
    display: none;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 30;
    background: var(--color-paper-raised);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--color-ink);
    cursor: pointer;
  }

  /* ===================== Main content ===================== */
  .main-content {
    margin-left: var(--sidebar-width);
    padding: 56px 72px 120px;
  }

  .hero {
    margin-bottom: 56px;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--color-gold);
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .hero-eyebrow i { font-size: 17px; }

  .hero h1 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 42px;
    line-height: 1.28;
    margin: 0 0 16px;
    color: var(--color-ink);
  }

  .hero .hero-lede {
    font-size: 18px;
    color: var(--color-ink-soft);
    margin: 0 0 28px;
  }

  .stat-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(140px, 1fr));
    gap: 16px;
  }

  .stat-card {
    border: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    border-radius: 10px;
    padding: 18px 20px;
  }

  .stat-card .stat-number {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 28px;
    color: var(--color-indigo);
    line-height: 1.1;
  }

  .stat-card .stat-label {
    font-size: 16px;
    color: var(--color-ink-soft);
    margin-top: 6px;
  }

  .disclaimer-box {
    border: 1px solid var(--color-info-border);
    background: var(--color-info-bg);
    color: var(--color-info-text);
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 16px;
    margin-top: 28px;
  }

  section {
    margin: 72px 0;
    scroll-margin-top: 32px;
  }

  section:first-of-type { margin-top: 0; }

  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-ink-faint);
    letter-spacing: 0.05em;
    margin-bottom: 10px;
  }

  h2 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 29px;
    color: var(--color-ink);
    margin: 0 0 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
  }

  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 21px;
    color: var(--color-ink);
    margin: 40px 0 16px;
  }

  h4 {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 17px;
    color: var(--color-ink);
    margin: 28px 0 12px;
  }

  p { margin: 0 0 18px; }

  ul, ol { margin: 0 0 18px; padding-left: 24px; }
  li { margin-bottom: 8px; }

  strong { font-weight: 600; color: var(--color-ink); }

  em { color: var(--color-ink-soft); }

  /* ===================== Domain badge cards ===================== */
  .domain-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(160px, 1fr));
    gap: 16px;
    margin: 28px 0 8px;
  }

  .domain-card {
    border: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    border-radius: 10px;
    padding: 20px;
    border-top: 3px solid var(--d-color);
  }

  .domain-card .domain-pct {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 30px;
    color: var(--d-color);
  }

  .domain-card .domain-name {
    font-size: 16px;
    color: var(--color-ink-soft);
    margin-top: 6px;
  }

  .domain-card.d1 { --d-color: var(--color-indigo); }
  .domain-card.d2 { --d-color: var(--color-forest); }
  .domain-card.d3 { --d-color: var(--color-gold); }
  .domain-card.d4 { --d-color: var(--color-plum); }

  .domain-tag {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    padding: 3px 12px;
    border-radius: 999px;
    margin-bottom: 14px;
  }

  .domain-tag.d1 { background: var(--color-indigo-tint); color: var(--color-indigo); }
  .domain-tag.d2 { background: var(--color-forest-tint); color: var(--color-forest); }
  .domain-tag.d3 { background: var(--color-gold-tint); color: var(--color-gold); }
  .domain-tag.d4 { background: var(--color-plum-tint); color: var(--color-plum); }

  /* ===================== Tables ===================== */
  .table-wrap {
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    margin: 0 0 24px;
    max-width: 100%;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 16px;
  }

  thead th {
    background: var(--color-paper-sunken);
    text-align: left;
    font-weight: 600;
    color: var(--color-ink);
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border-strong);
    white-space: nowrap;
  }

  tbody td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-ink-soft);
    vertical-align: top;
  }

  tbody tr:last-child td { border-bottom: none; }
  tbody tr:nth-child(even) { background: var(--color-paper); }

  td strong, th strong { color: var(--color-ink); }

  /* ===================== Callouts ===================== */
  .callout {
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--color-indigo);
    background: var(--color-paper-raised);
    border-radius: 10px;
    padding: 20px 24px;
    margin: 28px 0;
  }

  .callout-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 16px;
    color: var(--color-indigo);
    margin-bottom: 10px;
  }

  .callout ul { margin-bottom: 0; padding-left: 20px; }
  .callout p:last-child { margin-bottom: 0; }

  .callout.practice { border-left-color: var(--color-gold); }
  .callout.practice .callout-title { color: var(--color-gold); }

  .callout.source { border-left-color: var(--color-forest); background: var(--color-forest-tint); }
  .callout.source .callout-title { color: var(--color-forest); }
  .callout.source a { color: var(--color-forest); font-weight: 500; }
  .callout.source ul { list-style: none; padding-left: 0; }
  .callout.source li { margin-bottom: 6px; font-size: 16px; word-break: break-all; }

  .callout.note { border-left-color: var(--color-plum); }
  .callout.note .callout-title { color: var(--color-plum); }

  /* ===================== Diagram containers ===================== */
  .diagram-card {
    border: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    border-radius: 12px;
    padding: 28px;
    margin: 28px 0;
  }

  .diagram-card .diagram-caption {
    font-size: 16px;
    color: var(--color-ink-faint);
    margin-top: 14px;
    text-align: center;
  }

  .diagram-container {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 60px;
  }

  .diagram-loading {
    color: var(--color-ink-faint);
    font-size: 16px;
    padding: 20px 0;
  }

  .diagram-error {
    color: var(--color-plum);
    font-size: 16px;
  }

  /* ===================== Step list (roadmap) ===================== */
  .step-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 16px;
  }

  .step-list li {
    display: flex;
    gap: 16px;
    margin-bottom: 0;
  }

  .step-num {
    flex: none;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1.5px solid var(--color-indigo);
    color: var(--color-indigo);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-body .step-title { font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
  .step-body .step-desc { color: var(--color-ink-soft); font-size: 16px; }

  /* ===================== Glossary ===================== */
  .glossary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: 16px;
  }

  .glossary-item {
    border: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    border-radius: 10px;
    padding: 16px 20px;
  }

  .glossary-item .g-term {
    font-weight: 600;
    color: var(--color-indigo);
    margin-bottom: 4px;
  }

  .glossary-item .g-def {
    color: var(--color-ink-soft);
    font-size: 16px;
  }

  /* ===================== Reference list ===================== */
  .ref-group { margin-bottom: 28px; }
  .ref-group h4 { margin-top: 0; }
  .ref-list { list-style: none; margin: 0; padding: 0; }
  .ref-list li {
    padding: 12px 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 16px;
  }
  .ref-list li:last-child { border-bottom: none; }
  .ref-list .ref-name { color: var(--color-ink); font-weight: 500; display: block; margin-bottom: 2px; }
  .ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; }

  footer {
    margin-top: 96px;
    padding-top: 32px;
    border-top: 1px solid var(--color-border);
    color: var(--color-ink-faint);
    font-size: 16px;
  }

  code {
    font-family: var(--font-mono);
    background: var(--color-paper-sunken);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 16px;
    color: var(--color-ink);
  }

  /* ===================== Responsive ===================== */
  @media (max-width: 980px) {
    .sidebar-toggle { display: flex; }
    .sidebar {
      transform: translateX(-100%);
      /* 画面外のリンクがキーボードフォーカスを受け取らないよう visibility も落とす */
      visibility: hidden;
      transition: transform 0.2s ease, visibility 0.2s ease;
      box-shadow: none;
    }
    .sidebar.open { transform: translateX(0); visibility: visible; }
    .main-content { margin-left: 0; padding: 88px 24px 100px; }
    .hero h1 { font-size: 32px; }
    .stat-row { grid-template-columns: repeat(2, 1fr); }
    .domain-grid { grid-template-columns: repeat(2, 1fr); }
    .glossary-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 560px) {
    .stat-row { grid-template-columns: 1fr; }
    .domain-grid { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .sidebar { transition: none; }
  }

:is(h2, h3, h4, section) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}
.sidebar-backdrop {
  display: none;
}
@media (max-width: 980px) {
  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 19;
  }
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 16px;
  margin-top: 28px;
  line-height: 1.6;
}
.disclaimer-box :deep(.iconify),
.disclaimer-box :deep(svg) {
  flex: none;
  font-size: 20px;
  margin-top: 2px;
}
.disclaimer-box > span {
  flex: 1;
}
.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 20px 0;
}
.table-wrap table {
  margin: 0;
  width: 100%;
}
.mermaid-wrap {
  margin: 24px 0;
}
.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 14px;
  text-align: center;
  padding: 20px;
}

</style>
