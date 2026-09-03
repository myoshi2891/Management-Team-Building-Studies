<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-guide",
  "what-is-csppo",
  "requirements",
  "blooms-taxonomy",
  "stakeholder-discussion",
  "launching-teams",
  "multiple-team-ownership",
  "market-driven-strategy",
  "planning-forecasting",
  "product-economics",
  "customer-interactions",
  "assumption-validation",
  "backlog-management",
  "best-practices-checklist",
  "misconceptions",
  "career-renewal",
  "summary",
  "references"
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
  title: "CSP-PO® (Certified Scrum Professional - Product Owner) 認定資格 完全ガイド | Scrum Alliance公式学習目標を徹底解説",
  description: "Scrum Alliance公式のCSP-PO Learning Objectives(2022年1月版)に基づく、5カテゴリー31項目の完全解説。初学者向けのステップバイステップの進め方とベストプラクティス、一次情報源URLを掲載。",
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
A["CSPO 基礎"] --> B["A-CSPO 応用"]
B --> C["CSP-PO プロフェッショナル"]
C --> D["CST・CEC・CTCへの道"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,D box;
class C hub;`;

const DIAGRAM_REQUIREMENTS_FLOW = `flowchart TD
A["A-CSPO認定を保有"] --> B["CSP-PO認定教育プログラムを受講"]
B --> C["事前課題・事後課題を含む全コンポーネントを完了"]
C --> D["CSP-PO License Agreementに同意しメンバープロフィールを完成"]
D --> E["過去5年以内にPOとして24ヶ月以上の実務経験を証明"]
E --> F["CSP-PO認定取得"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F done;`;

const DIAGRAM_BLOOMS_TAXONOMY = `flowchart BT
K["知識 Knowledge"] --> C["理解 Comprehension"]
C --> A["応用 Application"]
A --> AN["分析 Analysis"]
AN --> S["統合 Synthesis"]
S --> E["評価 Evaluation"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class K hub;
class C,A,AN,S box;
class E done;`;

const DIAGRAM_TUCKMAN_STAGES = `flowchart LR
A["Forming 形成期"] --> B["Storming 混乱期"]
B --> C["Norming 統一期"]
C --> D["Performing 機能期"]
D --> E["Adjourning 解散期"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,E box;
class D done;`;

const DIAGRAM_SCALING_PATTERNS = `flowchart TD
A["単一プロダクト、複数チーム"] --> B{"チームの独立性・規模"}
B -- "少数のチームが密接に連携" --> C["Nexus型 単一PO + Nexus統合チーム"]
B -- "多数の独立性が高いチーム" --> D["階層型 チーフPO + エリアPO"]
C --> E["単一のプロダクトバックログをクロスチームで共有"]
D --> E

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D box;
class E done;`;

const DIAGRAM_BUSINESS_MODEL_CANVAS = `flowchart TD
CS["顧客セグメント"] --> VP["価値提案"]
CH["チャネル"] --> VP
CR["顧客との関係"] --> VP
VP --> RS["収益の流れ"]
KA["主要活動"] --> VP
KR["主要リソース"] --> VP
KP["主要パートナー"] --> VP
VP --> COST["コスト構造"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class CS,CH,CR,KA,KR,KP box;
class VP hub;
class RS,COST done;`;

const DIAGRAM_FIVE_FORCES = `flowchart TD
F["業界内の競争"]
A["新規参入の脅威"] --> F
B["代替品・代替サービスの脅威"] --> F
C["供給者の交渉力"] --> F
D["買い手・顧客の交渉力"] --> F

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;
class F hub;`;

const DIAGRAM_RELEASE_STRATEGY = `flowchart TD
A["プロダクトゴールを明確化"] --> B["ビジネスモデルの特性を考慮"]
B --> C["段階的リリース フィーチャーを順次追加"]
B --> D["日付固定リリース タイムボックス型"]
B --> E["スコープ固定リリース MVP確定型"]
C --> F["リリース戦略を確定"]
D --> F
E --> F

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F done;`;

const DIAGRAM_BUILD_MEASURE_LEARN = `flowchart LR
A["仮説"] --> B["構築 Build"]
B --> C["計測 Measure"]
C --> D["学習 Learn"]
D --> A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D box;`;

const DIAGRAM_COST_OF_DELAY = `flowchart TD
A["ビジネス価値を見積もる"] --> D["Cost of Delayを算出"]
B["時間的緊急性を見積もる"] --> D
C["リスク低減・機会実現価値を見積もる"] --> D
D --> E["月または週あたりの金額として表現"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D hub;
class E done;`;

const DIAGRAM_OPPORTUNITY_SOLUTION_TREE = `flowchart TD
O["望ましいアウトカム"] --> OP1["顧客の機会1"]
O --> OP2["顧客の機会2"]
OP1 --> S1["解決策の案A"]
OP1 --> S2["解決策の案B"]
S1 --> T1["アサンプションテスト"]
S2 --> T2["アサンプションテスト"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class O hub;
class OP1,OP2,S1,S2 box;
class T1,T2 done;`;

const DIAGRAM_HYPOTHESIS_EXPERIMENT = `flowchart TD
A["リスクの高いアサンプションを特定"] --> B["検証可能な仮説として記述"]
B --> C["最小限の実験を設計"]
C --> D["実験を実行"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C box;
class D done;`;

const DIAGRAM_EXPERIMENT_EVALUATION = `flowchart TD
D["実験を実行"] --> E["結果を測定・評価"]
E --> F{"仮説は支持されたか"}
F -- "Yes" --> G["確信を持って前進 persevere"]
F -- "No" --> H["方向転換 pivot しプロダクトバックログを更新"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D hub;
class E,F box;
class G,H done;`;

const DIAGRAM_OUTPUT_OUTCOME_IMPACT = `flowchart LR
A["アウトプット 出荷した機能の数"] --> B["アウトカム 顧客行動の変化"]
B --> C["インパクト ビジネス・組織への効果"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B box;
class C done;`;

const DIAGRAM_BACKLOG_ORDERING_TECHNIQUES = `flowchart TD
A["プロダクトバックログの並び替え技術"] --> B["価値ベース Kanoモデル"]
A --> C["緊急度ベース WSJFとCD3"]
A --> D["MoSCoW法"]
A --> E["学習価値優先 リスクの高い仮説から着手"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`;

const DIAGRAM_WSJF_CALCULATION = `flowchart TD
A["ビジネス価値"] --> D["Cost of Delay"]
B["時間的緊急性"] --> D
C["リスク低減・機会実現価値"] --> D
D --> E["Duration 所要期間で除算"]
E --> F["WSJF・CD3スコア"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D hub;
class E box;
class F done;`;

const DIAGRAM_CAREER_PATH = `flowchart LR
A["CSP-PO取得"] --> B["Certified Scrum Trainer CST"]
A --> C["Certified Enterprise Coach CEC"]
A --> D["Certified Team Coach CTC"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D done;`;

const DIAGRAM_RENEWAL_CYCLE = `flowchart LR
A["CSP-PO取得"] --> B["2年間の実務・学習活動"]
B --> C["40 SEUを蓄積"]
C --> D["更新申請フォームを提出"]
D --> E["更新料$250を支払い"]
E --> F["CSP-PO更新完了"]
F --> B

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F done;`;

const DIAGRAM_FIVE_CATEGORIES_SUMMARY = `flowchart TD
A["1. Product Owner Core Competencies コアコンピテンシー"] --> F["CSP-PO"]
B["2. Implementing Goal Setting and Planning ゴール設定と計画"] --> F
C["3. Advanced Interactions with Customers and Users 顧客・ユーザーとの高度なインタラクション"] --> F
D["4. Complex Product Assumption Validation 複雑なプロダクト仮説検証"] --> F
E["5. Advanced Product Backlog Management 高度なプロダクトバックログマネジメント"] --> F

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F hub;`;

</script>

<template>
  <div class="csp-po-guide">
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
            <div class="brand-title">CSP-PO® 完全ガイド</div>
            <div class="brand-subtitle">Product Owner Track 最上位資格</div>
          </div>
        </div>

        <ul class="sidebar-nav">

      <li class="nav-group-label">基礎知識</li>
      <li>
            <a
              href="#about-guide"
              :class="{ active: activeId === 'about-guide' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:info-circle" aria-hidden="true" />このガイドについて
            </a>
          </li>
      <li>
            <a
              href="#what-is-csppo"
              :class="{ active: activeId === 'what-is-csppo' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:certificate" aria-hidden="true" />CSP-POとは
            </a>
          </li>
      <li>
            <a
              href="#requirements"
              :class="{ active: activeId === 'requirements' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-check" aria-hidden="true" />取得要件
            </a>
          </li>
      <li>
            <a
              href="#blooms-taxonomy"
              :class="{ active: activeId === 'blooms-taxonomy' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:list-check" aria-hidden="true" />学習目標の読み方
            </a>
          </li>

      <li class="nav-group-label">カテゴリー1: コアコンピテンシー</li>
      <li>
            <a
              href="#stakeholder-discussion"
              :class="{ active: activeId === 'stakeholder-discussion' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-text" aria-hidden="true" />高度なステークホルダー対話
            </a>
          </li>
      <li>
            <a
              href="#launching-teams"
              :class="{ active: activeId === 'launching-teams' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:route" aria-hidden="true" />新チームの立ち上げ
            </a>
          </li>
      <li>
            <a
              href="#multiple-team-ownership"
              :class="{ active: activeId === 'multiple-team-ownership' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:git-branch" aria-hidden="true" />複数チームのPO
            </a>
          </li>

      <li class="nav-group-label">カテゴリー2: ゴール設定と計画</li>
      <li>
            <a
              href="#market-driven-strategy"
              :class="{ active: activeId === 'market-driven-strategy' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:building-bank" aria-hidden="true" />市場駆動型戦略
            </a>
          </li>
      <li>
            <a
              href="#planning-forecasting"
              :class="{ active: activeId === 'planning-forecasting' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:timeline" aria-hidden="true" />計画とフォーキャスティング
            </a>
          </li>
      <li>
            <a
              href="#product-economics"
              :class="{ active: activeId === 'product-economics' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:chart-pie" aria-hidden="true" />プロダクトエコノミクス
            </a>
          </li>

      <li class="nav-group-label">カテゴリー3〜5: 実践スキル</li>
      <li>
            <a
              href="#customer-interactions"
              :class="{ active: activeId === 'customer-interactions' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:book-2" aria-hidden="true" />顧客・ユーザー対応
            </a>
          </li>
      <li>
            <a
              href="#assumption-validation"
              :class="{ active: activeId === 'assumption-validation' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:external-link" aria-hidden="true" />仮説検証
            </a>
          </li>
      <li>
            <a
              href="#backlog-management"
              :class="{ active: activeId === 'backlog-management' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:map-2" aria-hidden="true" />バックログマネジメント
            </a>
          </li>

      <li class="nav-group-label">実務とキャリア</li>
      <li>
            <a
              href="#best-practices-checklist"
              :class="{ active: activeId === 'best-practices-checklist' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス
            </a>
          </li>
      <li>
            <a
              href="#misconceptions"
              :class="{ active: activeId === 'misconceptions' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:file-text" aria-hidden="true" />誤解とアンチパターン
            </a>
          </li>
      <li>
            <a
              href="#career-renewal"
              :class="{ active: activeId === 'career-renewal' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:refresh" aria-hidden="true" />キャリアパスと更新
            </a>
          </li>
      <li>
            <a
              href="#summary"
              :class="{ active: activeId === 'summary' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:flag-3" aria-hidden="true" />まとめ
            </a>
          </li>
      <li>
            <a
              href="#references"
              :class="{ active: activeId === 'references' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:link" aria-hidden="true" />参考文献
            </a>
          </li>
    
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">
<div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance公式 Product Owner Track 最上位資格</div>
      <h1>Certified Scrum Professional® - Product Owner (CSP®-PO) 完全学習ガイド</h1>
      <p class="hero-lede">
        初学者から経験者まで、CSP-PO認定が求める5つのカテゴリー・31の学習目標(Learning Objectives)を、ステップバイステップでわかりやすく解説する日本語ガイドです。各項目には「詳細な説明」「具体的な進め方」「ベストプラクティス」「一次情報源のURL」を必ず添えています。ASCII図解は一切使用せず、フローチャートはすべてMermaid、比較・整理はすべてMarkdownの表で表現しています。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">31</div><div class="stat-label">学習目標(Learning Objectives)数</div></div>
        <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">学習カテゴリー数</div></div>
        <div class="stat-card"><div class="stat-number">24ヶ月</div><div class="stat-label">必要な実務経験(過去5年以内)</div></div>
        <div class="stat-card"><div class="stat-number">40 SEU</div><div class="stat-label">更新に必要なSEU(2年ごと)</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        本ガイドは教育・学習支援を目的とした非公式の解説資料です。認定要件や学習目標は改訂される可能性があるため、実際の受験・受講にあたっては必ず<a href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>で最新情報をご確認ください。
      </div>
    </div>

    <!-- ===================== 00. About This Guide ===================== -->
    <section id="about-guide">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:info-circle" aria-hidden="true" />SECTION 00</div>
      <h2>このガイドについて</h2>

      <h3>対象読者</h3>
      <ul>
        <li>すでにCertified Scrum Product Owner®(CSPO)、Advanced Certified Scrum Product Owner®(A-CSPO)を取得しており、CSP-POを目指す経験豊富なプロダクトオーナー</li>
        <li>複数のスクラムチームやプロダクトバックログを横断的に扱う立場になった、あるいはこれから任される予定の実務者</li>
        <li>CSP-PO教育プログラム(認定研修)を受講する前に、学習目標の全体像を把握しておきたい人</li>
        <li>Certified Scrum Trainer®(CST)やCertified Enterprise Coach(CEC)、Certified Team Coach(CTC)といった上位資格を見据えている人</li>
      </ul>

      <h3>このガイドの作り方</h3>
      <p>本ガイドは、Scrum Alliance公式サイトの「<a href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner" target="_blank" rel="noopener">Certified Scrum Professional Product Owner (CSP-PO) Certification</a>」ページ、および同ページからリンクされている公式PDF「<a href="https://www.scrumalliance.org/media/certifications/los/csp_po_learning_objectives_2022.pdf" target="_blank" rel="noopener">CSP-PO Learning Objectives (2022年1月版)</a>」を一次情報源として直接取得し、そこに定義された5カテゴリー・31個の学習目標をすべて網羅する形で構成しています。加えて、各学習目標の実務的な理解を助けるため、Scrum Guide、Agile Manifesto、Scrum Alliance公式リソース記事、そしてCost of Delay/WSJF、Business Model Canvas、Lean Startup、Opportunity Solution Tree、Kanoモデル、Nexus、Tuckmanモデル、Porterのファイブフォースといった、プロダクトマネジメント/アジャイル業界で広く参照される一次情報源・原典に近い資料を補助的な根拠として引用しています。引用箇所には文中に <code>[番号]</code> を付与し、末尾の「参考文献・出典一覧」で該当URLを確認できます。</p>

      <h3>表記について</h3>
      <ul>
        <li>本文中の英語の専門用語(Product Owner、Product Backlog、Sprint、Cost of Delayなど)はあえて英語表記のまま残し、初出時に日本語訳を併記しています。これはCSP-PO教育プログラムや実務の現場で英語表記のまま使われることが多いためです。</li>
        <li>フローチャートはすべてMermaid記法で記述しています。ASCIIアートによる図解は使用していません。</li>
        <li>比較表・チェックリストはすべてMarkdownの表(テーブル)で記述しています。</li>
      </ul>
    </section>
    <!-- ===================== 01. What is CSP-PO ===================== -->
    <section id="what-is-csppo">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      <h2>CSP-POとは何か(概要とProduct Owner Trackにおける位置づけ)</h2>

      <h3>1.1 CSP-POの定義</h3>
      <p>Certified Scrum Professional® - Product Owner(CSP®-PO)は、Scrum AllianceがProduct Owner Track(プロダクトオーナー系統)で提供する認定の中で最上位に位置する資格です。公式サイトでは次のように説明されています。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>CSP-POは、CSPOコースから始まった旅の中で到達する最高レベルを表す。経験豊富なPOであり、スクラムとアジャイルの原則について人々をコーチングする高いレベルの熟達度を示した人のために設計されている[1]。</p>
      </div>

      <p>CSP-POが検証する高度な知識領域は、公式FAQによれば次の3つに整理されています[1]。</p>
      <ul>
        <li>戦略の実行(Strategy implementation)</li>
        <li>プロダクト仮説の検証(Product assumption testing)</li>
        <li>プロダクトバックログマネジメント(Product backlog management)</li>
      </ul>

      <h3>1.2 Product Owner Trackにおける位置づけ</h3>
      <p>Scrum AllianceのProduct Owner Trackは、CSPO → A-CSPO → CSP-POという3段階で構成されており、CSP-POはその最終段階です[1][6][7]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TRACK_PROGRESSION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Product Owner Trackの3段階と、その先のトレーナー・コーチ資格への道</div>
      </div>

      <p>各段階のおおまかな違いを整理すると、以下のようになります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>資格</th><th>主な焦点</th><th>前提条件</th><th>対象者像</th></tr></thead>
          <tbody>
            <tr><td>CSPO</td><td>Scrumの基礎、PO役割の基本理解</td><td>なし</td><td>プロダクトオーナーになったばかりの人</td></tr>
            <tr><td>A-CSPO</td><td>技術的負債への理解、スケーリングの基礎、高度なゴール設定</td><td>CSPO保有</td><td>実務経験を積んだPO</td></tr>
            <tr><td>CSP-PO</td><td>戦略実装、複雑な仮説検証、複数チームのバックログマネジメント</td><td>A-CSPO保有 + 実務経験24ヶ月</td><td>複数チーム・複雑なプロダクトを扱うシニアPO</td></tr>
          </tbody>
        </table>
      </div>

      <p>公式ページのFAQでも、A-CSPOとCSP-POの違いについて次のように説明されています。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>A-CSPOはPOのスキルセットを基礎以上に拡張することに焦点を当てるのに対し、CSP-POコースはプロダクトバックログマネジメントと顧客とのやり取りに必要な高度な戦略・検証手法・マネジメントスキルを教える[1]。</p>
      </div>

      <h3>1.3 学べること(公式の学習領域)</h3>
      <p>公式ページでは、CSP-POコースで学ぶ内容として以下が挙げられています[1]。</p>
      <ul>
        <li>意見が対立するステークホルダーとの議論をファシリテーションする方法</li>
        <li>社内外のステークホルダーとの協働の仕方</li>
        <li>新しいスクラムチームの結成</li>
        <li>新しいスクラムチームの立ち上げが、従来のプロジェクトキックオフとなぜ異なるのか</li>
        <li>複数チームにまたがるプロダクトバックログのマネジメント</li>
        <li>複雑なプロダクト計画の実践</li>
      </ul>
      <p>さらに、プロダクトエコノミクス(Product Economics)、顧客リサーチ(Customer Research)、プロダクト戦略(Product Strategy)についても深く掘り下げます[1]。</p>

      <h3>1.4 なぜこのレベルの認定が必要なのか</h3>
      <p>Scrum Guide(2020年版)は、Product Ownerの責務を次のように定義しています。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>Product Ownerは、プロダクトの価値を最大化する責任を単独で担う[3]。</p>
      </div>

      <p>しかし、実際の組織では以下のような複雑性が発生します。</p>
      <ul>
        <li>プロダクトが成長するにつれて、1つのスクラムチームでは対応しきれなくなり、複数チームでの開発が必要になる</li>
        <li>ステークホルダーの数が増え、それぞれの利害が対立するようになる</li>
        <li>「作ったものが本当に価値を生むのか」を検証する仮説検証のスキルが不可欠になる</li>
        <li>プロダクトの収益性やROI(投資対効果)を定量的に語る必要が出てくる</li>
      </ul>
      <p>CSP-POは、まさにこうした「複雑化したプロダクトオーナーシップ」に対応するための、実務直結型のプロフェッショナル認定です。</p>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>複雑性の棚卸し。</strong>CSP-POを目指す前に、自分が実際にどのような複雑性(複数チーム、対立するステークホルダー、収益性の説明責任など)に直面しているかを棚卸ししておくと、教育プログラムでの学びを実務にすぐ接続できます。</li>
          <li><strong>A-CSPOの知識との接続。</strong>A-CSPOで学んだ技術的負債・スケーリングの基礎知識を、CSP-POの「複数チームマネジメント」「戦略実装」の学習と意識的に結びつけて復習しておくと理解が深まります。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 02. Requirements ===================== -->
    <section id="requirements">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 02</div>
      <h2>CSP-PO取得要件</h2>

      <h3>2.1 公式要件の全体像</h3>
      <p>公式ページに明記されているCSP-POの取得要件は以下の5点です[1]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_REQUIREMENTS_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSP-PO取得までの要件フロー</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>要件</th><th>補足</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Scrum AllianceのA-CSPO認定を保有していること</td><td>有効でも失効していてもよい。CSP-PO取得時にA-CSPOとCSPOの両方が自動更新される[1]</td></tr>
            <tr><td>2</td><td>認定されたCSP-PO教育プログラム(公式トレーニング)を受講すること</td><td>目的の実装・戦略、プロダクト仮説検証の高レベルアプローチ、高度なプロダクトバックログマネジメント技術を学ぶ[1]</td></tr>
            <tr><td>3</td><td>事前課題・事後課題を含む承認済み教育プログラムの全コンポーネントを完了すること</td><td>&nbsp;</td></tr>
            <tr><td>4</td><td>CSP-PO License Agreementへの同意とScrum Allianceメンバープロフィールの完成</td><td>&nbsp;</td></tr>
            <tr><td>5</td><td>過去5年以内に、プロダクトオーナーとしての役割に特化した実務経験を24ヶ月以上保有していること</td><td>&nbsp;</td></tr>
          </tbody>
        </table>
      </div>

      <h3>2.2 認定後の維持(概要)</h3>
      <p>CSP-POは「一度取得すれば終わり」の資格ではありません。Scrum Alliance自体が次のように説明しています。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2001年に設立されたScrum Allianceは、実質を伴う認定を提供する。バッジを取得した後も、更新要件として書籍を読む、ウェビナーを視聴する、イベントに参加するなどして知識を継続的に伸ばしていることの証明が求められる[1]。</p>
      </div>

      <p>具体的には、2年ごとにScrum Education Units(SEU)を蓄積し、更新申請を行う必要があります。詳細は「認定後のキャリアパスと更新」で扱います。</p>

      <h3>2.3 A-CSPOやCSPOとの要件比較</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>資格</th><th>前提資格</th><th>必要実務経験</th><th>教育プログラム</th><th>更新サイクル</th></tr></thead>
          <tbody>
            <tr><td>CSPO</td><td>なし</td><td>なし</td><td>必須(2日間相当が一般的)</td><td>2年ごと</td></tr>
            <tr><td>A-CSPO</td><td>CSPO</td><td>過去5年以内に12ヶ月以上のPO経験</td><td>必須</td><td>2年ごと</td></tr>
            <tr><td>CSP-PO</td><td>A-CSPO</td><td>過去5年以内に24ヶ月以上のPO経験</td><td>必須(事前・事後課題含む)</td><td>2年ごと(40 SEU)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>実務経験の記録整理。</strong>実務経験の「24ヶ月」は、単に在籍期間ではなく「PO役割に特化した」期間である点に注意し、担当したプロダクト・チーム・期間を記録として整理しておくと申請時にスムーズです。</li>
          <li><strong>事前課題を実例で。</strong>教育プログラムの事前課題は、自分が実際に抱えている複数チームやステークホルダー対立の実例を題材にすると、研修中の議論がより実務的になります。</li>
          <li><strong>失効を恐れない。</strong>A-CSPOが失効していても要件を満たせるため、更新を後回しにしていた人も臆せずCSP-POに挑戦できます[1]。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 03. Bloom's Taxonomy ===================== -->
    <section id="blooms-taxonomy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 03</div>
      <h2>Bloom's Taxonomyと学習目標の読み方</h2>

      <h3>3.1 なぜBloom's Taxonomyが使われるのか</h3>
      <p>CSP-PO Learning Objectives文書の冒頭では、次のように説明されています。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>Bloomスタイルの学習目標は、学習者がプログラム修了時に何ができるようになるかを記述する。各学習目標の冒頭には「CSP-POの学習目標を無事に検証した上で、学習者は...できるようになる」というフレーズを暗黙的に補って読む[2]。</p>
      </div>

      <p>Bloom's Taxonomy(ブルームの分類学)は、学習を6段階の「思考の高度さ」で捉えるフレームワークです。CSP-POの学習目標はすべて、この6段階のいずれかに位置づけられています[2]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BLOOMS_TAXONOMY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Bloom's Taxonomyの6段階(下から上へ思考の高度さが増す)</div>
      </div>

      <h3>3.2 6段階の意味</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>段階</th><th>英語</th><th>意味</th><th>CSP-POでの動詞の例</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Knowledge</td><td>事実や用語を思い出せる</td><td>(CSP-POではほぼ使われない、より基礎的な認定向け)</td></tr>
            <tr><td>2</td><td>Comprehension</td><td>意味を理解し説明できる</td><td>explain, discuss</td></tr>
            <tr><td>3</td><td>Application</td><td>実際の場面に適用できる</td><td>demonstrate, apply, plan</td></tr>
            <tr><td>4</td><td>Analysis</td><td>要素に分解し関係性を分析できる</td><td>compare, contrast, assess</td></tr>
            <tr><td>5</td><td>Synthesis</td><td>複数の要素を組み合わせ新しいものを作れる</td><td>construct, develop, prepare</td></tr>
            <tr><td>6</td><td>Evaluation</td><td>基準に基づき価値判断ができる</td><td>evaluate, appraise, defend</td></tr>
          </tbody>
        </table>
      </div>

      <h3>3.3 CSP-POの学習目標がなぜ「上位レベル」中心なのか</h3>
      <p>CSPOの学習目標が主にKnowledge~Applicationレベルであるのに対し、A-CSPOはApplication~Analysisレベルが中心になります。そしてCSP-POでは、実際に学習目標の動詞を見ると、evaluate(評価する)、appraise(査定する)、defend(擁護する)、construct(構築する)、develop(開発する)といった、Analysis~Evaluationレベルの高次思考動詞が圧倒的に多く使われています[2]。これは、CSP-POが「知っている」「できる」を超えて、「自分の判断で価値を評価し、他者に説明・弁護できる」レベルを要求していることを意味します。</p>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>動詞に注目する。</strong>学習目標を読むときは、動詞に注目してください。「compare(比較する)」なら2つ以上の選択肢を実際に比較検討した経験を、「defend(擁護する)」ならステークホルダーに向けて自分の判断を説明した経験を、それぞれ言語化できるように準備しておくと、教育プログラムでの実技課題にスムーズに対応できます。</li>
          <li><strong>暗黙のフレーズを意識する。</strong>各学習目標の冒頭に暗黙的に付く「Upon successful validation of the CSP-PO Learning Objectives, the learner will be able to...」というフレーズを常に意識すると、単なる知識暗記ではなく「自分は何ができるようになるのか」という視点で学習を進められます[2]。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 04. Advanced Stakeholder Discussion ===================== -->
    <section id="stakeholder-discussion">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 04</div>
      <h2>カテゴリー1-A: 高度なステークホルダー対話 (Advanced Stakeholder Discussion)</h2>

      <p>このセクションは、公式学習目標のカテゴリー「1. Product Owner Core Competencies」のうち、LO1.1~LO1.4を扱います[2]。</p>

      <h3>4.1 LO1.1: 組織的コンテキストがPO選定に与える影響を査定する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.1 appraise how different organizational contexts might impact how a person is selected to be a Product Owner.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 同じ「プロダクトオーナー」という役職でも、組織の構造によって選ばれ方や求められる資質は大きく異なります。例えば、スタートアップでは創業者自身がPOを兼務することが多く、大企業では事業部門のマネージャーがPOに任命されることが多いといった違いがあります。また、社内向けシステムのPOと、社外顧客向けプロダクトのPOでは、求められるドメイン知識やステークホルダーとの距離感も異なります。</p>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自組織の意思決定構造(トップダウンか、権限委譲されているか)を図示する</li>
        <li>PO選定の実際のプロセス(誰が任命するか、どんな基準か)を関係者にヒアリングする</li>
        <li>別の組織タイプ(例: スタートアップ vs 大企業、社内向け vs 社外向け)を仮定し、同じプロダクトのPO選定がどう変わるかを比較する</li>
        <li>自組織のPO選定プロセスの強みと弱みを言語化する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>4軸評価。</strong>PO選定基準を「ドメイン知識」「意思決定権限」「ステークホルダーとの関係性」「時間の確保度合い」の4軸で評価すると、組織間の違いが見えやすくなります。</li>
          <li><strong>権限とアカウンタビリティの一致確認。</strong>権限が不十分なままPOに任命されるケースは典型的なアンチパターンです。Scrum Guideが定義する「Product Ownerはプロダクトの価値を最大化する責任を単独で担う」[3]という原則に照らし、権限とアカウンタビリティが一致しているかを確認しましょう。</li>
        </ul>
      </div>

      <h3>4.2 LO1.2: 対立するステークホルダーのファシリテーションセッションを評価する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.2 assess a facilitated session with stakeholders who are in conflict, providing two examples of how to improve facilitation.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: ステークホルダー同士の意見対立は、プロダクト開発において避けられない現象です。CSP-POレベルでは、単に対立を解消するだけでなく、「そのファシリテーションセッション自体を振り返り、改善点を具体的に2つ以上挙げられる」ことが求められます。</p>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>対立するステークホルダーの立場・利害・懸念を事前にマッピングする</li>
        <li>ファシリテーションのゴール(合意形成か、選択肢の可視化か)を明確にする</li>
        <li>セッションを実施し、発言時間の偏り・感情的な対立の兆候・沈黙しているステークホルダーの有無を観察する</li>
        <li>セッション後に「うまくいった点」と「改善できる点」を最低2つずつ振り返る</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>3つの評価軸。</strong>ファシリテーションの評価軸として、「心理的安全性」「発言機会の公平性」「合意の質(妥協ではなく納得か)」の3点を用いると振り返りが具体的になります。</li>
          <li><strong>利害と立場を分ける。</strong>対立の背後にある「利害(interest)」と表面的な「立場(position)」を分けて可視化する手法(利害関係マッピング)は、ファシリテーションの質を大きく改善します。</li>
        </ul>
      </div>

      <h3>4.3 LO1.3: ステークホルダー情報の収集・伝達・活用技術を比較する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.3 compare at least two techniques for gathering, communicating, and leveraging information from internal and external stakeholders.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 社内ステークホルダー(経営層、営業、サポート部門など)と社外ステークホルダー(顧客、パートナー企業など)では、情報の集め方・伝え方が異なります。CSP-POでは、最低2つの技術を比較できることが求められます。</p>

      <p><strong>代表的な技術の比較表</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>技術</th><th>概要</th><th>向いている場面</th></tr></thead>
          <tbody>
            <tr><td>ステークホルダーマップ(権力・関心度マトリクス)</td><td>影響力と関心度の2軸でステークホルダーを分類する</td><td>誰にどの頻度・粒度で情報共有すべきか判断したいとき</td></tr>
            <tr><td>プロダクトレビューへの招待</td><td>Sprint Reviewにステークホルダーを招き、増分を直接見せてフィードバックを得る</td><td>継続的な信頼関係構築、透明性の確保</td></tr>
            <tr><td>定期的な1on1インタビュー</td><td>ステークホルダー個別に深く話を聞く</td><td>対立の火種を早期に発見したいとき、公の場で話しにくい懸念を拾いたいとき</td></tr>
            <tr><td>ロードマップ共有セッション</td><td>プロダクトの方向性を定期的に可視化して共有する</td><td>期待値のズレを防ぎたいとき</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自分が扱っているステークホルダーを社内/社外に分類する</li>
        <li>それぞれに対して現在使っている情報収集・伝達手法を棚卸しする</li>
        <li>上記表を参考に、まだ使っていない技術を1つ選んで試してみる</li>
        <li>効果(情報の質、関係性の変化)を比較する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>顧客リサーチとの連携。</strong>社外ステークホルダー(特に顧客)からのフィードバックは、「顧客・ユーザーとの高度なインタラクション」の顧客リサーチ手法と組み合わせるとより効果的です。</li>
          <li><strong>活用までを技術と捉える。</strong>情報を「集める」だけでなく「活用する」ところまでを技術として捉えることが重要です。集めたフィードバックがプロダクトバックログにどう反映されたかを可視化する仕組み(トレーサビリティ)を持つと、ステークホルダーの信頼を得やすくなります。</li>
        </ul>
      </div>

      <h3>4.4 LO1.4: Scrumの最新の定義の採用がステークホルダー関係やプロダクトにどう役立つかを評価する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.4 evaluate how their stakeholder relationships and/or product could benefit from the adoption of the latest definition of Scrum.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: Scrum Guideは定期的に改訂されており、2020年版では「Product Goal(プロダクトゴール)」という新しい概念が導入されました[3]。CSP-POでは、こうした最新の定義の変化が、自分のステークホルダー関係やプロダクトにどう役立つかを評価する力が求められます。</p>

      <p><strong>Scrum Guide 2020年版の主な変更点(抜粋)</strong>:</p>
      <ul>
        <li>Product Goalの導入により、プロダクトの長期的な方向性がProduct Backlogのコミットメントとして明示された[3]</li>
        <li>3つのコミットメント(Product GoalはProduct Backlogに、Sprint GoalはSprint Backlogに、Definition of Doneはインクリメントに、それぞれ対応する)が整理された[3]</li>
        <li>Development Teamという表現がなくなり、「Scrum Team」として一体性が強調された[3]</li>
      </ul>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自分が現在使っているScrum Guideのバージョンを確認する</li>
        <li>最新版(2020年版)との差分を洗い出す</li>
        <li>Product Goalの概念を自分のプロダクトに当てはめ、ステークホルダーへの説明にどう使えるか検討する</li>
        <li>実際にステークホルダーとの対話でProduct Goalを用いて説明してみる</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>優先順位の説明軸に使う。</strong>Product Goalは、複数チームで1つのプロダクトを扱う際に「なぜこのプロダクトバックログ項目が今優先されているのか」をステークホルダーに説明する強力な軸になります。</li>
          <li><strong>原文を読み込む。</strong>Scrum Guideの原文は無料で公開されているため[3]、教育プログラム受講前に必ず最新版を読み込んでおくことを強く推奨します。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 05. Launching Scrum Teams ===================== -->
    <section id="launching-teams">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 05</div>
      <h2>カテゴリー1-B: 新しいスクラムチームの立ち上げ (Launching Scrum Teams)</h2>

      <p>このセクションは、LO1.5~LO1.7を扱います[2]。</p>

      <h3>5.1 LO1.5: 新しいスクラムチームの立ち上げが従来のプロジェクトキックオフと異なるべき理由を3つ以上説明する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.5 explain at least three reasons why the start of a new Scrum Team should be handled differently from a traditional project kickoff or charter.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 従来型のプロジェクトキックオフは「計画を確定し、要件を固め、スケジュールを引く」ことに主眼が置かれます。一方、新しいスクラムチームの立ち上げは、チームという「生きたシステム」を育てるプロセスであり、以下のような理由から異なる扱いが必要です。</p>

      <ol>
        <li>
          <strong>チームは段階的に成熟する</strong>: 心理学者Bruce Tuckmanが1965年に提唱した「Forming(形成期)-Storming(混乱期)-Norming(統一期)-Performing(機能期)」モデルによれば、チームは対人関係とタスク遂行能力の両面で段階的に発達していきます[10][11]。プロジェクト憲章のように「初日から高いパフォーマンスを期待する」計画は非現実的です。
          <div class="diagram-card">
            <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TUCKMAN_STAGES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
            <div class="diagram-caption">Tuckmanのチーム発達モデル5段階</div>
          </div>
        </li>
        <li><strong>要件は最初から確定できない</strong>: Scrumは経験主義(検査・適応・透明性)に基づいており、Product Backlogは継続的に進化することが前提です[3]。従来のプロジェクト憲章のように、スコープを最初に固定することはScrumの原則と矛盾します。</li>
        <li><strong>自己管理型チームの立ち上げには時間がかかる</strong>: Scrum Guideは、Scrum Teamが自己管理型(self-managing)であることを求めています[3]。指示命令型のプロジェクトチームとは異なり、チームが自分たちで作業の進め方を決められるようになるまでの「立ち上げ投資」が必要です。</li>
      </ol>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>新チーム発足時に、Tuckmanモデルを踏まえたチームビルディングの時間を意図的に確保する</li>
        <li>初回のプロダクトバックログは「完璧な要件定義書」ではなく「学習しながら磨いていく仮説の集合」として提示する</li>
        <li>チームの自己管理を促すため、最初は意思決定の権限委譲の範囲を明示的に合意する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>不安定さを事前に共有する。</strong>チーム立ち上げの最初の数Sprintは、ベロシティが不安定になることを前提にステークホルダーへ事前に説明しておくと、後々の期待値のズレを防げます。</li>
          <li><strong>後戻りを通常のプロセスと捉える。</strong>Tuckmanモデルは「一直線に進む」とは限らず、メンバー交代や大きな対立があれば前の段階に戻ることもあります[10]。POはこれを異常事態ではなく通常のプロセスとして捉える視点を持つべきです。</li>
        </ul>
      </div>

      <h3>5.2 LO1.6: チーム結成時の品質期待値を定義するPOの責任について議論する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.6 discuss the Product Owner's responsibility to define expectations for quality when their Scrum Team forms.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: Scrum Guideでは、Definition of Done(完成の定義)がScrum Teamの品質基準を定めるコミットメントとされています[3]。新チームが結成される際、POは単に「何を作るか」だけでなく「どのレベルの品質で完成とみなすか」についても、最初から明確な期待値を持って議論に参加する責任があります。</p>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>チーム発足時のワークショップで、Definition of Doneの叩き台を開発者と一緒に作成する</li>
        <li>組織全体のDefinition of Doneの基準(全社的な品質基準)があれば、それをチームレベルのDefinition of Doneに反映する</li>
        <li>品質基準がプロダクトバックログの見積もりやSprintの計画にどう影響するかをチームと合意する</li>
        <li>定期的にDefinition of Doneを見直す機会(レトロスペクティブ等)を設ける</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>品質議論に積極参加する。</strong>POが「品質は開発者だけの責任」と考えてしまうのはアンチパターンです。品質基準はビジネス価値の実現可能性に直結するため、POも積極的に議論に参加すべきです。</li>
          <li><strong>早期の明文化。</strong>品質期待値を明文化しないままチームが走り出すと、後になって「そもそも何をもって完成とするか」の認識齟齬が表面化し、手戻りが発生しやすくなります。</li>
        </ul>
      </div>

      <h3>5.3 LO1.7: 新しいスクラムチームの立ち上げを計画する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.7 plan the launch of a new Scrum Team.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: これはLO1.5・LO1.6で学んだ内容を統合し、実際に「計画する(plan)」という応用レベルの学習目標です。</p>

      <p><strong>新チーム立ち上げ計画の主要な要素</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>要素</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>プロダクトゴールの共有</td><td>チーム全員が同じ方向を向けるよう、プロダクトゴールを最初に共有する[3]</td></tr>
            <tr><td>初期プロダクトバックログの準備</td><td>完璧である必要はないが、最初のSprintを開始できる程度に十分な項目を用意する</td></tr>
            <tr><td>Definition of Doneの叩き台作成</td><td>上記5.2を参照</td></tr>
            <tr><td>チームビルディングの時間確保</td><td>Tuckmanモデルを踏まえ、対人関係構築の時間を計画に組み込む</td></tr>
            <tr><td>ステークホルダーへの期待値調整</td><td>立ち上げ初期はベロシティが安定しないことを事前共有する</td></tr>
            <tr><td>作業環境・ツールの整備</td><td>チームが自己管理できるための基盤(バックログ管理ツール、コミュニケーション手段等)を用意する</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>プロダクトゴールを1枚のドキュメントやビジュアルにまとめる</li>
        <li>初期プロダクトバックログを、少なくとも最初の1~2 Sprint分準備する</li>
        <li>チーム発足キックオフのアジェンダを設計する(ゴール共有、自己紹介、働き方の合意、Definition of Doneの叩き台作成を含める)</li>
        <li>最初の数Sprintのステークホルダーへの報告頻度・粒度を事前に合意する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>計画を「最初の仮説」として扱う。</strong>「新しいスクラムチームの立ち上げは、従来のプロジェクトキックオフとは異なる」という原則([1]の公式説明にもある通り)を体現するには、計画そのものを「固定的な手順書」ではなく「最初の仮説」として扱う姿勢が重要です。</li>
          <li><strong>Scrum Valuesを言語化する。</strong>新チーム発足時こそ、Scrum Values(確約、勇気、集中、公開、尊敬)[5]をチームで言語化し、行動規範として合意しておくと、Storming期の対立を乗り越えやすくなります。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 06. Product Ownership with Multiple Teams ===================== -->
    <section id="multiple-team-ownership">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 06</div>
      <h2>カテゴリー1-C: 複数チームにおけるプロダクトオーナーシップ (Product Ownership with Multiple Teams)</h2>

      <p>このセクションは、LO1.8~LO1.10を扱います[2]。Scrum Guideの原則は「one product, one Product Owner, one Product Backlog」ですが、実際には1人のPOが複数のスクラムチームを担当する場面が頻繁に発生します[8]。</p>

      <h3>6.1 LO1.8: 複数のスクラムチームにまたがるプロダクトバックログマネジメントの手法を最低2つ実演する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.8 demonstrate at least two methods to support Product Backlog management across multiple Scrum Teams.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: Scrum Alliance公式リソースライブラリの記事「What to Do When You're Asked to Be the Product Owner for Multiple Teams」では、複数チームを担当するPOにとって「アカウンタビリティ(当事者意識)」と「委任(delegation)」が2大ツールであると説明されています[8]。</p>

      <p>代表的な手法を整理すると以下の通りです。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>手法</th><th>概要</th><th>ポイント</th></tr></thead>
          <tbody>
            <tr><td>プロダクトゴールの統一的な明文化と定期的な強化</td><td>全チームが同じプロダクトゴールを理解できるよう、詳細に言語化し、会議で繰り返し確認する[8]</td><td>ゴール設定ワークショップの実施、可視化資料の掲示</td></tr>
            <tr><td>単一のプロダクトバックログと戦略的な並び替え</td><td>依存関係・複雑性・影響を考慮し、複数チームの視点をバランスよく取り入れて並び替える[8]</td><td>チームごとの視点を統合するための協働的な議論の場を設ける</td></tr>
            <tr><td>透明性の高いドキュメント化</td><td>決定事項・変更・進捗を一貫して記録し、全チームが同じ情報源を参照できるようにする[8]</td><td>優先順位付けの根拠も含めて記録する</td></tr>
            <tr><td>委任によるスケール</td><td>POが単独で全ての詳細を把握するのではなく、ステークホルダーや専門家に権限委譲する[8]</td><td>委任時は期待される成果・制約・権限のレベルを明確にする</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>まず、現在担当している(あるいは今後担当する)チーム数と、それぞれの役割・依存関係を可視化する</li>
        <li>プロダクトゴールを1つの文書にまとめ、全チームに共有するワークショップを設計する</li>
        <li>単一のプロダクトバックログを維持しつつ、各チームの専門性や制約を反映した並び替えルールを合意する</li>
        <li>委任できるタスク(バックログ項目の詳細化など)をリストアップし、適切な相手(サブジェクトマターエキスパートやステークホルダー)に権限委譲する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>クロスチーム・リファインメント。</strong>定期的な「クロスチーム・リファインメント」の場を設けることで、依存関係を早期に発見し解消できます。これはNexusフレームワークが「Cross-Team Refinement」として正式に定義しているプラクティスと同様の考え方です[9]。</li>
          <li><strong>唯一の情報源を維持する。</strong>ドキュメントを「透明性の高い唯一の情報源(single source of truth)」として維持することが、複数チーム間の認識齟齬を防ぐ最大のポイントです[8]。</li>
        </ul>
      </div>

      <h3>6.2 LO1.9: プロダクトオーナー役割をスケールするパターンを最低2つ対比する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.9 contrast at least two patterns for scaling the Product Owner role.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 業界では、プロダクトオーナー役割をスケールするためのいくつかのパターンが確立されています。ここでは代表的な2つのパターンを対比します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_SCALING_PATTERNS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">チームの独立性・規模に応じたPOスケーリングパターンの選択</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>パターン</th><th>概要</th><th>出典・関連フレームワーク</th></tr></thead>
          <tbody>
            <tr><td>Nexus型(統合チームによる調整)</td><td>単一のプロダクトバックログを複数チームで共有し、Nexus Integration Teamが統合上の課題を横断的に扱う[9]</td><td>Scrum.org Nexus Guide[9]</td></tr>
            <tr><td>階層型(チーフPO + エリアPO)</td><td>大規模プロダクトを複数の「エリア」に分割し、それぞれにエリアPOを置きつつ、チーフPOが全体の一貫性を担保する</td><td>LeSS(Large-Scale Scrum)のArea Product Ownerパターンなどに類似</td></tr>
            <tr><td>委任ネットワーク型</td><td>POが特定の意思決定権限をステークホルダーや専門家ネットワークに委任し、自身は戦略とゴールの一貫性に集中する[8]</td><td>Scrum Alliance公式リソース記事[8]</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自組織の規模・チーム数・独立性を評価する</li>
        <li>上記3パターンのうち、少なくとも2つを自組織に当てはめてシミュレーションする</li>
        <li>各パターンのメリット・デメリット(意思決定の速度、一貫性の維持コスト、コミュニケーションオーバーヘッド)を比較する</li>
        <li>最も適したパターン、あるいはハイブリッドなアプローチを選択する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>単一バックログの原則は崩さない。</strong>どのパターンを選んでも、「単一のプロダクトバックログ」という原則自体は崩さないことが重要です。バックログが分裂すると、優先順位の一貫性が失われ、チーム間の対立が起きやすくなります[9]。</li>
          <li><strong>継続的な見直し。</strong>パターンの選択は一度きりの意思決定ではなく、組織の成長に応じて見直すべきものです。</li>
        </ul>
      </div>

      <h3>6.3 LO1.10: プロダクトオーナーシップに関連するトピックを開発し、教える</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>1.10 develop and then teach a topic related to product ownership.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: これは、CSP-POの学習目標の中でも特にSynthesis(統合)レベルの高度な目標です。単に学ぶだけでなく、「他者に教える」ところまでを求めています。これは、教えることによって自分自身の理解がより深まるという教育学的な原則(ラーニングピラミッド的な考え方)にも合致します。</p>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自分が特に強みを持つ、あるいは深く学んだプロダクトオーナーシップのトピックを1つ選ぶ(例: Cost of Delayの計算方法、Opportunity Solution Treeの使い方など)</li>
        <li>トピックを初学者にもわかるように構造化する(このガイド自体がその一例です)</li>
        <li>社内勉強会、コミュニティ・オブ・プラクティス、あるいはScrum Allianceのユーザーグループなどで実際に発表・教育を行う</li>
        <li>フィードバックを受けて、教材や説明の仕方を改善する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>上位資格への実績にする。</strong>教える機会は、CSTやCEC、CTCといった上位資格([1]で言及されている次のキャリアステップ)を目指す上でも非常に重要な実績になります。</li>
          <li><strong>PO同士のコミュニティを主催する。</strong>社内で「PO同士のコミュニティ・オブ・プラクティス」を主催することは、この学習目標を継続的に満たす良い方法です。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 07. Market-Driven Product Strategy ===================== -->
    <section id="market-driven-strategy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 07</div>
      <h2>カテゴリー2-A: 市場駆動型プロダクト戦略 (Market-Driven Product Strategy Practices)</h2>

      <p>このセクションは、公式カテゴリー「2. Implementing Goal Setting and Planning」のうち、LO2.1~LO2.3を扱います[2]。</p>

      <h3>7.1 LO2.1: プロダクトのためのビジネスモデルを最低3つ比較対照する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.1 compare and contrast at least three business models for a product.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクトの価値提供の仕方(ビジネスモデル)は多様です。CSP-POでは、少なくとも3つのビジネスモデルを比較対照できることが求められます。ビジネスモデルを構造的に捉えるための代表的なツールが、Alexander OsterwalderとYves Pigneurが考案したBusiness Model Canvas(ビジネスモデルキャンバス)です[12]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BUSINESS_MODEL_CANVAS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Business Model Canvasの9ブロックと価値提案の関係</div>
      </div>

      <p>Business Model Canvasは9つの要素(ブロック)で構成され、企業やプロダクトの価値創造の全体像を1枚で可視化するツールとして、200,000以上の企業で使われています[12][17]。</p>

      <p><strong>代表的なビジネスモデル3種の比較</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ビジネスモデル</th><th>収益の仕組み</th><th>代表例</th><th>向いているプロダクト</th></tr></thead>
          <tbody>
            <tr><td>サブスクリプション型</td><td>継続課金</td><td>SaaS、動画配信サービス</td><td>継続的な価値提供が可能なプロダクト</td></tr>
            <tr><td>フリーミアム型</td><td>基本無料 + 追加課金</td><td>モバイルアプリ、一部のSaaS</td><td>ネットワーク効果が働くプロダクト</td></tr>
            <tr><td>マーケットプレイス/仲介型</td><td>取引手数料</td><td>ECプラットフォーム、マッチングサービス</td><td>需要と供給を結ぶプラットフォーム</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自社プロダクトの現在のビジネスモデルをBusiness Model Canvasの9ブロックで書き出す</li>
        <li>競合や別業界のプロダクトから、異なる2つ以上のビジネスモデルを選んで同様にキャンバスを埋める</li>
        <li>3つのキャンバスを並べて、収益の流れ・顧客セグメント・価値提案の違いを比較する</li>
        <li>自社プロダクトに他のビジネスモデルの要素を取り入れられないか検討する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>定期的に見直す。</strong>Business Model Canvasは「一度書いて終わり」ではなく、市場の変化に応じて定期的に見直すべきツールです[12]。</li>
          <li><strong>ステークホルダーを巻き込む。</strong>POはビジネスモデルの選択を単独で決めるのではなく、経営層・営業・ファイナンス部門といったステークホルダーを巻き込んで検討することが望ましいです。</li>
        </ul>
      </div>

      <h3>7.2 LO2.2: プロダクトアイデアのためのビジネスモデルを開発する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.2 develop a business model for a product idea.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: LO2.1の比較分析を踏まえ、実際に新しいプロダクトアイデアに対してビジネスモデルを「開発する(develop)」、つまりゼロから構築する応用力が求められます。</p>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>プロダクトアイデアの核となる価値提案(Value Proposition)を明確にする</li>
        <li>Business Model Canvasの9ブロックを、顧客セグメント → 価値提案 → チャネル → 顧客との関係 → 収益の流れ → 主要リソース → 主要活動 → 主要パートナー → コスト構造、の順で埋めていく</li>
        <li>収益の流れとコスト構造のバランスを検証し、経済的に成立しうるかを粗く試算する</li>
        <li>ステークホルダーとキャンバスをレビューし、フィードバックを反映する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>検証可能な仮説の集合として扱う。</strong>最初から完璧なビジネスモデルを作ろうとせず、「検証可能な仮説の集合」として捉えることが重要です。Lean Startupの考え方([16]、後述のカテゴリー4で詳述)と組み合わせると効果的です。</li>
          <li><strong>コスト構造も同時に検討する。</strong>収益の流れだけでなく、コスト構造(特に開発・運用コスト)を同時に検討することで、後述のプロダクトエコノミクス(カテゴリー2-C)へスムーズにつながります。</li>
        </ul>
      </div>

      <h3>7.3 LO2.3: 競合分析を構築する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.3 construct a competitive analysis.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 競合分析は、自社プロダクトが置かれている市場環境を理解するための重要な戦略ツールです。代表的なフレームワークとして、Harvard Business SchoolのMichael E. Porter教授が1979年に提唱したPorterのファイブフォース分析(Five Forces Analysis)があります[13]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_FIVE_FORCES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Porterのファイブフォース分析: 業界内の競争に影響する5つの力</div>
      </div>

      <p>Porterのファイブフォースは、業界の競争環境を分析し、そこから得られる潜在的な収益性を評価するために業界組織論に根ざしたフレームワークです[13]。</p>

      <p><strong>5つの力の説明</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>力</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>新規参入の脅威</td><td>新しい競合がどれだけ容易に市場に参入できるか</td></tr>
            <tr><td>代替品の脅威</td><td>顧客が別の手段・製品で同じニーズを満たせるか</td></tr>
            <tr><td>供給者の交渉力</td><td>部品・技術・人材などの供給元がどれだけ強い交渉力を持つか</td></tr>
            <tr><td>買い手の交渉力</td><td>顧客がどれだけ価格や品質について交渉力を持つか</td></tr>
            <tr><td>業界内の競争</td><td>既存の競合同士の競争の激しさ</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自社プロダクトが属する業界を定義する(範囲を狭すぎず広すぎず設定するのがポイント)</li>
        <li>5つの力それぞれについて、「強い/中程度/弱い」を評価し根拠を記述する</li>
        <li>直接競合(同じ課題を同じ方法で解決する製品)と間接競合(異なる方法で同じ課題を解決する製品)をリストアップする</li>
        <li>分析結果をプロダクト戦略(差別化ポイント、価格戦略など)に反映する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>戦略への翻訳を忘れない。</strong>ファイブフォース分析は業界単位の分析であり、個別企業の戦略そのものではありません。分析結果を「自社がどう動くべきか」という戦略に翻訳する作業が別途必要です[13]。</li>
          <li><strong>定期的な見直し。</strong>競合分析は一度作って終わりにせず、四半期に一度など定期的に見直すことで、市場変化への感度を保てます。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 08. Complex Product Planning and Forecasting ===================== -->
    <section id="planning-forecasting">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 08</div>
      <h2>カテゴリー2-B: 複雑なプロダクト計画とフォーキャスティング (Complex Product Planning and Forecasting)</h2>

      <p>このセクションは、LO2.4~LO2.7を扱います[2]。</p>

      <h3>8.1 LO2.4: プロダクト計画・フォーキャストを開発するための技術を最低2つ比較する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.4 compare at least two techniques to develop a product plan or forecast.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクト計画・フォーキャスティング(将来予測)には複数の技術があります。代表的なものを比較します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技術</th><th>概要</th><th>向いている場面</th></tr></thead>
          <tbody>
            <tr><td>ベロシティベースのフォーキャスト</td><td>過去のSprintのベロシティ(完了した作業量)を基に将来の完了時期を予測する</td><td>安定したチームで、比較的予測しやすいバックログがある場合</td></tr>
            <tr><td>モンテカルロ・シミュレーション</td><td>過去のスループットのばらつきを確率分布として扱い、複数のシナリオをシミュレーションして完了確率を算出する</td><td>不確実性が高く、単純な平均値では誤差が大きい場合</td></tr>
            <tr><td>Cost of Delayに基づく優先順位付け計画</td><td>各項目の遅延コストを定量化し、経済的に最適な順序で計画する(詳細はプロダクトエコノミクスで扱う)[14][15]</td><td>経済合理性を重視した計画が必要な場合</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自チームの過去数Sprintのベロシティデータを収集する</li>
        <li>ベロシティベースの単純なフォーキャストを作成する</li>
        <li>同じデータを使ってモンテカルロ・シミュレーションを試し、両者の予測の違い(特に不確実性の表現の違い)を比較する</li>
        <li>どちらの技術がステークホルダーへの説明に適しているかを検討する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>確率分布で伝える。</strong>単一の数値(「〇月〇日に完了します」)よりも、確率分布(「80%の確率で〇月〇日までに完了します」)で伝える方が、不確実性を誠実に扱えます。</li>
          <li><strong>約束ではなく推定と伝える。</strong>フォーキャストは「約束」ではなく「その時点での最良の推定」であることを、常にステークホルダーに明確に伝えることが重要です。</li>
        </ul>
      </div>

      <h3>8.2 LO2.5: ビジネスモデルに適したリリース戦略を開発する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.5 develop an appropriate release strategy for a business model.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: LO2.1・2.2で検討したビジネスモデルに応じて、最適なリリース戦略は変わります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_RELEASE_STRATEGY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">ビジネスモデルの特性に応じた3つのリリース戦略</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>リリース戦略</th><th>特徴</th><th>向いているビジネスモデル</th></tr></thead>
          <tbody>
            <tr><td>段階的リリース</td><td>機能を継続的に小刻みにリリースする</td><td>サブスクリプション型(継続的な価値向上が重要)</td></tr>
            <tr><td>日付固定リリース</td><td>特定の日付(規制対応、季節イベントなど)に合わせてスコープを調整する</td><td>規制・季節性が強いビジネス</td></tr>
            <tr><td>スコープ固定リリース(MVP型)</td><td>最小限の機能セットを固定し、期間は柔軟にする</td><td>新規事業の検証段階</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>ビジネスモデルの収益化タイミング(いつ収益が発生するか)を確認する</li>
        <li>市場・規制・季節性などの外部制約を洗い出す</li>
        <li>上記3つの戦略のうち、制約に最も適したものを選ぶ、あるいは組み合わせる</li>
        <li>リリース戦略をロードマップとして可視化し、ステークホルダーと合意する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>固定せず調整前提で設計する。</strong>リリース戦略は一度決めたら固定するものではなく、市場からのフィードバックに応じて調整する前提で設計しましょう。</li>
        </ul>
      </div>

      <h3>8.3 LO2.6: 計測可能なプロダクトローンチゴールを最低3つ特定する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.6 identify at least three measurable product launch goals.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクトローンチ(市場投入)の成功を判断するには、計測可能な(measurable)ゴールが不可欠です。曖昧な「成功させる」ではなく、具体的な指標に落とし込む必要があります。</p>

      <p><strong>計測可能なローンチゴールの例</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>カテゴリ</th><th>ゴール例</th></tr></thead>
          <tbody>
            <tr><td>採用(Adoption)</td><td>ローンチ後30日以内にアクティブユーザー数〇〇人達成</td></tr>
            <tr><td>満足度</td><td>NPS(ネットプロモータースコア)〇〇以上を達成</td></tr>
            <tr><td>ビジネス成果</td><td>ローンチ後四半期の売上〇〇円達成</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>プロダクトゴールから逆算して、ローンチが成功したと言える状態を言語化する</li>
        <li>採用・満足度・ビジネス成果などの異なる観点から、最低3つの計測可能な指標を設定する</li>
        <li>各指標の測定方法・測定タイミングを事前に決めておく</li>
        <li>ローンチ後に実際のデータと比較する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>アウトカムでゴールを設定する。</strong>「アウトプット(機能を出したこと)」ではなく「アウトカム(顧客行動やビジネス指標の変化)」でゴールを設定することが重要です。これはカテゴリー5(高度なプロダクトバックログマネジメント)のLO5.1にも直結する考え方です。</li>
        </ul>
      </div>

      <h3>8.4 LO2.7: プロダクトローンチ計画の要素を最低5つ特定する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.7 identify at least five elements of a product launch plan.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクトローンチ計画は、開発だけでなく、マーケティング・サポート・営業など複数の機能を横断する計画です。</p>

      <p><strong>プロダクトローンチ計画の代表的な要素(5つ以上の例)</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>要素</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>ターゲット顧客セグメントの定義</td><td>誰に向けたローンチか</td></tr>
            <tr><td>2</td><td>計測可能なローンチゴール</td><td>LO2.6で設定した指標</td></tr>
            <tr><td>3</td><td>マーケティング・コミュニケーション計画</td><td>どうやって認知を獲得するか</td></tr>
            <tr><td>4</td><td>サポート体制の準備</td><td>問い合わせ増加への対応体制</td></tr>
            <tr><td>5</td><td>リスク・ロールバック計画</td><td>問題発生時にどう対応するか</td></tr>
            <tr><td>6</td><td>社内トレーニング計画</td><td>営業・サポートチームへの教育</td></tr>
            <tr><td>7</td><td>ローンチ後のモニタリング計画</td><td>どの指標をいつ確認するか</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>上記の要素リストを出発点に、自プロダクトのローンチに必要な要素を洗い出す</li>
        <li>各要素の担当者・期限を明確にする</li>
        <li>部門横断のステークホルダーとレビューし、抜け漏れを確認する</li>
        <li>ローンチ後に振り返りを行い、計画の精度を次回に活かす</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>部門横断の調整役になる。</strong>プロダクトローンチは開発チームだけの仕事ではありません。POは、部門横断の調整役として積極的に関わる必要があります。</li>
          <li><strong>ロードマップと連動させる。</strong>Scrum Allianceの公式リソース記事「Product Roadmaps: Your Secret Weapon for Success」も参考になります[26]。ロードマップとローンチ計画を連動させることで、ステークホルダーへの説明が一貫性を持ちます。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 09. Product Economics ===================== -->
    <section id="product-economics">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 09</div>
      <h2>カテゴリー2-C: プロダクトエコノミクス (Product Economics)</h2>

      <p>このセクションは、LO2.8~LO2.13を扱います[2]。プロダクトエコノミクスは、CSP-POの中でも特に「経営・財務的な視点」が強く求められる領域です。</p>

      <h3>9.1 LO2.8: プロダクトの収益性を判断する方法を最低2つ適用する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.8 apply at least two methods to determine the profitability of a product.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクトの収益性(profitability)を判断するには複数の財務的手法があります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>手法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>単純な損益計算(収益 - コスト)</td><td>一定期間の収益からコストを差し引いてプロダクト単位の利益を算出する</td></tr>
            <tr><td>ROI(投資対効果)計算</td><td>投資額に対してどれだけのリターンが得られたかを比率で示す</td></tr>
            <tr><td>LTV(顧客生涯価値) vs CAC(顧客獲得コスト)</td><td>1顧客あたりの生涯価値と獲得コストを比較し、持続可能性を判断する</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>プロダクトにかかる固定費・変動費を洗い出す</li>
        <li>収益データ(実績または予測)を収集する</li>
        <li>上記手法のうち2つを使って収益性を算出する</li>
        <li>手法ごとの結果の違いと、それぞれが示唆する意思決定の違いを比較する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>共通言語で対話する。</strong>POが自らファイナンス部門と共通言語で対話できるようになると、プロダクト戦略の意思決定における発言力が大きく向上します。</li>
        </ul>
      </div>

      <h3>9.2 LO2.9: 固定費・変動費・予測リターンに基づいて、プロダクトリリースの期待される成果や経済的結果を計算する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.9 calculate the expected outcome or economic results of a product release, given fixed and variable costs, and forecasted return.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: これはLO2.8の応用で、実際に数値を使って計算する実践的なスキルです。</p>

      <p><strong>計算の基本構造</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>固定費</td><td>リリースの有無にかかわらず発生するコスト(基盤インフラ、固定給与等)</td></tr>
            <tr><td>変動費</td><td>リリース規模やユーザー数に応じて変動するコスト(トランザクション費用、サポートコスト等)</td></tr>
            <tr><td>予測リターン</td><td>リリースによって見込まれる収益・コスト削減効果</td></tr>
            <tr><td>期待される経済的成果</td><td><code>予測リターン - (固定費 + 変動費)</code></td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>リリース対象の機能・プロダクトに関連する固定費・変動費を分解する</li>
        <li>過去データや市場調査に基づいて予測リターンを見積もる</li>
        <li>上記の式で期待される経済的成果を算出する</li>
        <li>前提条件(仮定)を明記し、感度分析(前提が変わった場合の影響)を行う</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>前提条件の透明性。</strong>計算結果そのものよりも、前提条件の透明性が重要です。ステークホルダーに説明する際は、「この数字がどんな仮定に基づいているか」を明確にしましょう。</li>
        </ul>
      </div>

      <h3>9.3 LO2.10: プロダクト開発のための反復的・漸進的な投資モデルを説明する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.10 explain an iterative and incremental investment model for product development.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 従来型の投資モデルは「最初に全予算を確定し、計画通りに使い切る」形が一般的でした。しかし、アジャイル・Lean Startup的な投資モデルでは、小さな投資で学習し、その結果に応じて追加投資を判断する「反復的・漸進的」なアプローチを取ります。Eric Riesが提唱したBuild-Measure-Learn(構築-計測-学習)フィードバックループは、この考え方の中核をなすフレームワークです[16]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BUILD_MEASURE_LEARN" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Build-Measure-Learnフィードバックループ</div>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>Lean Startupは、スタートアップを創造・マネジメントするための科学的アプローチであり、望ましいプロダクトをより早く顧客の手に届けることを可能にする[16]。</p>
      </div>

      <p><strong>反復的・漸進的投資モデルのステップ</strong>:</p>
      <ol>
        <li>最小限の投資でBuild-Measure-Learnの1サイクルを回す</li>
        <li>実測データ(バニティメトリクスではなく、意思決定に使えるアクショナブルなメトリクス)を収集する</li>
        <li>データに基づき「継続(persevere)」「方向転換(pivot)」「中止」を判断する</li>
        <li>継続すると判断した場合のみ、次の投資を行う</li>
      </ol>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>大きな投資判断を、小さな検証可能なマイルストーンに分割する</li>
        <li>各マイルストーンの投資額と、そこで検証したい仮説を明確にする</li>
        <li>マイルストーンごとに実測データを評価し、次の投資を判断する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>サンクコストに引きずられない。</strong>「サンクコスト(すでに投じた埋没費用)」に引きずられて、データが示す方向転換のシグナルを無視してしまうのは典型的なアンチパターンです。</li>
          <li><strong>経営層を巻き込む。</strong>投資判断の会議体には、開発チームだけでなくファイナンス・経営層を巻き込み、反復的投資モデルへの理解を共有しておくことが重要です。</li>
        </ul>
      </div>

      <h3>9.4 LO2.11: 投資対効果(ROI)を改善する方法を最低3つ実演する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.11 demonstrate at least three ways how return on investment can be improved.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: ROIはリターンをコストで割った比率であるため、改善方法は「リターンを増やす」か「コストを減らす」かの2方向、あるいはその両方に整理できます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>改善方法</th><th>分類</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>Cost of Delayが高い項目を先に着手する</td><td>リターンを増やす</td><td>早く価値を届けることで、遅延による機会損失を減らす[14]</td></tr>
            <tr><td>不要な機能(使われない機能)への投資を止める</td><td>コストを減らす</td><td>プロダクト分析データを用いて利用率の低い機能を特定し、開発リソースを再配分する</td></tr>
            <tr><td>バッチサイズを小さくする</td><td>リターンを増やす/コストを減らす</td><td>小さいバッチで頻繁にリリースすることで、フィードバックループを短縮し、手戻りコストを削減する[14]</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>現在のプロダクトバックログをCost of Delayの観点で並び替える(詳細はLO2.12を参照)</li>
        <li>利用率データを分析し、投資対効果の低い機能を特定する</li>
        <li>バッチサイズ(1リリースあたりの変更量)を測定し、削減余地を検討する</li>
        <li>実施後にROIの変化を追跡する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>リターンを増やす視点も持つ。</strong>ROI改善の議論は、単なるコストカットに陥りがちです。POは「リターンを増やす」側の視点(価値の早期提供、顧客満足度の向上)も同時に持つべきです。</li>
        </ul>
      </div>

      <h3>9.5 LO2.12: プロダクトフィーチャーのCost of Delayを計算する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.12 calculate the cost of delay for a product feature.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: Cost of Delay(遅延コスト)は、プロダクト開発における最も重要な経済的概念の1つです。Don Reinertsenは次のように述べています。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>Cost of Delayは、時間が私たちの目指す成果に与える影響を伝える方法である。より正式には、時間に対する総期待価値の偏微分である[14]。もし1つだけ定量化するなら、Cost of Delayを定量化せよ[14]。</p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_COST_OF_DELAY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Cost of Delayを構成する3つの要素</div>
      </div>

      <p><strong>Cost of Delayの計算の基本的な考え方</strong>: Cost of Delayは、「その機能のリリースが1週間(または1ヶ月)遅れると、いくらの価値を失うか」という単位(通貨/時間)で表現されます[14]。厳密な計算には財務モデルが必要な場合もありますが、CSP-POレベルでは概算(qualitative/relative)での算出方法も広く実務で使われています[14]。</p>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>対象のプロダクトフィーチャーがもたらすビジネス価値(収益向上、コスト削減など)を見積もる</li>
        <li>その価値がいつまでに実現される必要があるか(時間的緊急性)を見積もる</li>
        <li>上記2つから、「1週間(または1ヶ月)の遅延でいくらの価値を失うか」を算出する</li>
        <li>複数のフィーチャー間でCost of Delayを比較し、優先順位付けに活用する(LO2.13、LO5.2で詳述)</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>相対的な比較で十分。</strong>Cost of Delayは、精緻な計算よりも「相対的な比較ができること」が実務上は重要です。厳密さにこだわりすぎて計算自体が停滞するアンチパターンに陥らないよう注意しましょう[14]。</li>
          <li><strong>経済合理性に基づく議論に変える。</strong>Cost of Delayを可視化することで、ステークホルダー間の「なぜこれを優先するのか」という議論が、感情論ではなく経済合理性に基づいたものになります。</li>
        </ul>
      </div>

      <h3>9.6 LO2.13: アジャイルプロダクト開発に資金を提供するアプローチを最低2つ比較する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>2.13 compare at least two approaches to fund agile product development.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: アジャイル開発における資金提供(funding)の方法にはいくつかのアプローチがあります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>アプローチ</th><th>概要</th><th>メリット・注意点</th></tr></thead>
          <tbody>
            <tr><td>プロジェクトベースの固定予算</td><td>開発開始前に総予算を確定する</td><td>予算管理はしやすいが、アジャイルの適応性と相性が悪い</td></tr>
            <tr><td>プロダクトチームへの継続的資金提供(persistent team funding)</td><td>プロジェクト単位ではなく、恒常的なチームに継続的に予算を配分する</td><td>チームの学習が蓄積されやすく、Lean Startup的な反復投資と相性が良い[16]</td></tr>
            <tr><td>WSJF/Cost of Delayに基づく段階的資金配分</td><td>経済的優先順位(WSJF)が高いものから順に予算を配分する</td><td>経済合理性は高いが、算出の手間がかかる[15]</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>現在の資金提供の仕組み(プロジェクト予算か、チーム予算か)を確認する</li>
        <li>上記のうち異なる2つのアプローチを、自組織に当てはめて比較する</li>
        <li>アジャイルの適応性(方向転換のしやすさ)と、組織のガバナンス要件(予算承認プロセス)のバランスを検討する</li>
        <li>移行が必要な場合は、段階的な移行計画を検討する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>段階的に進める。</strong>資金提供の仕組みを変えることは、多くの場合POだけでは決定できない組織的な変更です。ファイナンス部門・経営層との対話を通じて、段階的に進めることが現実的です。</li>
          <li><strong>反復的投資モデルと組み合わせる。</strong>継続的資金提供モデルへの移行は、Lean StartupのBuild-Measure-Learnループ[16]や反復的投資モデル(LO2.10)と組み合わせることで、より説得力のある提案になります。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 10. Advanced Interactions with Customers and Users ===================== -->
    <section id="customer-interactions">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 10</div>
      <h2>カテゴリー3: 顧客・ユーザーとの高度なインタラクション (Advanced Interactions with Customers and Users)</h2>

      <p>このセクションは、公式カテゴリー「3. Advanced Interactions with Customers and Users」のLO3.1~LO3.2を扱います[2]。</p>

      <h3>10.1 LO3.1: 顧客リサーチをプロダクトディスカバリーと開発に統合する計画を準備する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>3.1 prepare a plan to integrate customer research into product discovery and development.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクトディスカバリー(発見)とは、「何を作るべきか」を検証するプロセスです。Teresa Torresが提唱するContinuous Discovery Habits(継続的ディスカバリーの習慣)は、プロダクトトリオ(PM・デザイナー・エンジニアの三者)が少なくとも週次で顧客と対話し、その洞察をOpportunity Solution Tree(機会解決策ツリー)に反映していく実践です[17]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_OPPORTUNITY_SOLUTION_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Opportunity Solution Treeの構造: アウトカムから機会・解決策・アサンプションテストへ</div>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>Opportunity Solution Treeは、望ましいアウトカムをどう達成するかを視覚的に表現するシンプルな方法である。それはまた、暗黙の前提を明示的にするのにも役立つ[17]。</p>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>プロダクトゴールに紐づく「望ましいアウトカム」を1つ明確にする</li>
        <li>顧客インタビューを通じて、そのアウトカムに関連する「機会(顧客のニーズ・痛み・欲求)」を洗い出す</li>
        <li>Opportunity Solution Treeとして機会・解決策・アサンプションテストを構造化する</li>
        <li>週次で顧客対話を行うリズムを計画に組み込む</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>まずは月次から始める。</strong>週次の顧客対話は理想ですが、実務上は多くのチームがこの頻度を達成できていません。まずは月次からでも始め、徐々に頻度を上げていくアプローチが現実的です[17]。</li>
          <li><strong>誘導質問を避ける。</strong>インタビューでは「傾聴して理解する」ことに徹し、誘導的な質問を避けることが重要です。</li>
        </ul>
      </div>

      <h3>10.2 LO3.2: 顧客リサーチまたはプロダクトディスカバリーの技術を最低3つ評価する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>3.2 evaluate at least three techniques for customer research or product discovery.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 顧客リサーチ・プロダクトディスカバリーには多様な技術があります。CSP-POでは、少なくとも3つの技術を「評価する(evaluate)」、つまりそれぞれの適用場面や限界を判断できることが求められます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技術</th><th>概要</th><th>向いている場面</th><th>限界</th></tr></thead>
          <tbody>
            <tr><td>ユーザーインタビュー</td><td>顧客と直接対話し、ニーズや行動の背景を深掘りする</td><td>定性的な深い理解が必要なとき</td><td>サンプル数が少なく、一般化には注意が必要</td></tr>
            <tr><td>Opportunity Solution Tree</td><td>インタビューから得た機会を構造化し、アウトカムに紐づける[17]</td><td>継続的にディスカバリーを行うチーム</td><td>継続的な更新の運用負荷がかかる</td></tr>
            <tr><td>アサンプションテスト(実験)</td><td>プロトタイプやランディングページ等で仮説を検証する</td><td>具体的な解決策の実行可能性を確かめたいとき</td><td>実験設計を誤ると誤った結論を導くリスクがある</td></tr>
            <tr><td>Kanoモデル調査</td><td>機能の有無に対する顧客の感情的反応をアンケートで分類する[18]</td><td>機能の優先順位付けの参考にしたいとき</td><td>調査対象者のセグメント分けを誤ると結果が歪む</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>自チームが現在使っている顧客リサーチ技術を棚卸しする</li>
        <li>上記表を参考に、まだ使っていない技術を最低1つ試す</li>
        <li>各技術の「得られる洞察の種類」「かかるコスト・時間」「限界」を評価する</li>
        <li>プロダクトディスカバリーのプロセスに、複数の技術を組み合わせて組み込む</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>定性と定量を組み合わせる。</strong>1つの技術だけに頼らず、定性的技術(インタビュー)と定量的技術(Kanoモデル調査、実験)を組み合わせることで、より頑健な意思決定ができます。</li>
          <li><strong>結果を反映するところまでを設計する。</strong>顧客リサーチの結果は、必ずOpportunity Solution Treeやプロダクトバックログに反映されるところまでを一連のプロセスとして設計しましょう。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 11. Complex Product Assumption Validation ===================== -->
    <section id="assumption-validation">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:external-link" aria-hidden="true" />SECTION 11</div>
      <h2>カテゴリー4: 複雑なプロダクト仮説検証 (Complex Product Assumption Validation)</h2>

      <p>このセクションは、公式カテゴリー「4. Complex Product Assumption Validation」のLO4.1~LO4.2を扱います[2]。</p>

      <h3>11.1 LO4.1: 仮説を検証するための適切な実験を選択する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>4.1 select an appropriate experiment to test a hypothesis.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクト開発における多くの意思決定は「仮説」に基づいています。CSP-POレベルでは、その仮説を検証するために「適切な」実験を選択する判断力が求められます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_HYPOTHESIS_EXPERIMENT" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">リスクの高いアサンプションから実験実行までの流れ</div>
      </div>

      <p><strong>代表的な実験手法</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>実験手法</th><th>検証できること</th><th>コスト/速度</th></tr></thead>
          <tbody>
            <tr><td>ランディングページテスト</td><td>需要の有無(顧客が興味を持つか)</td><td>低コスト・高速</td></tr>
            <tr><td>コンシェルジュ型MVP(手動で価値提供)</td><td>ソリューションの価値そのもの</td><td>中コスト・中速</td></tr>
            <tr><td>A/Bテスト</td><td>既存プロダクトにおける変更の効果</td><td>実装コストは高いが精度が高い</td></tr>
            <tr><td>プロトタイプユーザビリティテスト</td><td>使いやすさ、UI/UXの妥当性</td><td>低〜中コスト</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>検証したい仮説を、「もし〇〇をすれば、〇〇という結果が得られるはずだ」という形で明文化する</li>
        <li>仮説の中でも特に「これが間違っていたら計画全体が崩れる」というリスクの高い前提(risky assumption)を特定する</li>
        <li>そのリスクの高い前提を検証するのに最も低コストで済む実験手法を選ぶ</li>
        <li>実験の成功基準(何が観測されたら仮説が支持されたと言えるか)を事前に定義する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>顧客が本当に望むものを学ぶ。</strong>Eric Riesが指摘するように、「顧客が本当に望んでいるものを学ぶべきであり、顧客が言っていること、あるいは私たちが顧客はこうあるべきと考えることを学ぶのではない」という原則を忘れないようにしましょう[16]。</li>
          <li><strong>最小限の労力を目指す。</strong>実験は「最小限の労力でMVP(実用最小限の製品)を構築し、仮説を検証すること」を目指すべきです[16]。</li>
        </ul>
      </div>

      <h3>11.2 LO4.2: 実験の結果とインパクトを評価する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>4.2 evaluate the results and impact of an experiment.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 実験を実施した後は、その結果を客観的に評価し、次のアクションにつなげる必要があります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_EXPERIMENT_EVALUATION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">実験結果の評価から継続・方向転換の判断まで</div>
      </div>

      <p><strong>評価の際に注意すべきポイント</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ポイント</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>バニティメトリクスを避ける</td><td>見た目は良いが意思決定に使えない指標(総ページビュー等)ではなく、アクショナブルな指標を使う[16]</td></tr>
            <tr><td>統計的な有意性を考慮する</td><td>サンプル数が少ない実験で断定的な結論を出さない</td></tr>
            <tr><td>インパクトの大きさを評価する</td><td>統計的に有意でも、ビジネスへのインパクトが小さければ優先度は下がる</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>実験前に定義した成功基準と、実際の結果を照合する</li>
        <li>結果がビジネスにどの程度のインパクトを持つかを定量的に評価する</li>
        <li>「継続(persevere)」「方向転換(pivot)」「中止」のいずれかを判断する</li>
        <li>判断結果と根拠をステークホルダーに共有し、プロダクトバックログに反映する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>失敗を価値ある学習と伝える。</strong>実験結果が「期待外れ」だったとしても、それ自体が価値ある学習です。POは実験の失敗を「悪いニュース」としてではなく「安価に得られた重要な情報」としてチームやステークホルダーに伝える姿勢が求められます。</li>
          <li><strong>根本原因を掘り下げる。</strong>「Five Whys(なぜなぜ分析)」のような手法を使って、実験結果の背後にある根本原因を掘り下げることも有効です[16]。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 12. Advanced Product Backlog Management ===================== -->
    <section id="backlog-management">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 12</div>
      <h2>カテゴリー5: 高度なプロダクトバックログマネジメント (Advanced Product Backlog Management)</h2>

      <p>このセクションは、公式カテゴリー「5. Advanced Product Backlog Management」のLO5.1~LO5.4を扱います[2]。</p>

      <h3>12.1 LO5.1: スクラムチームや組織がアウトプットよりもアウトカムとインパクトを重視しているかどうかを査定する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>5.1 assess how Scrum Teams and/or organizations emphasize outcomes and impact over output.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: 「アウトプット(機能を出荷した数)」と「アウトカム(顧客行動・ビジネス指標の変化)」の違いを理解し、組織がどちらを重視しているかを査定する力が求められます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_OUTPUT_OUTCOME_IMPACT" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">アウトプットからアウトカム、インパクトへの連鎖</div>
      </div>

      <p>Teresa TorresはOpportunity Solution Treeの文脈で「アウトプット(output)」ではなく「プロダクトアウトカム(顧客行動における測定可能な変化)」を出発点にすべきだと強調しています[17]。</p>

      <p><strong>アウトプット偏重の兆候チェックリスト</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>兆候</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>ベロシティやストーリーポイント消化数だけが評価指標になっている</td><td>顧客への価値提供が測られていない</td></tr>
            <tr><td>ロードマップが機能名の羅列になっている</td><td>なぜその機能が必要かの説明(アウトカムとの紐付け)がない</td></tr>
            <tr><td>リリース後の効果測定が行われていない</td><td>出荷して終わり、その後の顧客行動の変化を追っていない</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>現在のロードマップやプロダクトバックログが「機能ベース」か「アウトカムベース」かを確認する</li>
        <li>チームのベロシティ以外に、顧客行動やビジネス指標を追跡する仕組みがあるかを確認する</li>
        <li>上記チェックリストを用いて、自組織のアウトプット偏重度を査定する</li>
        <li>必要に応じて、プロダクトゴールやSprint Goalをアウトカムベースの表現に書き換える</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>期待する変化を併記する。</strong>ロードマップの各項目に「これによってどんな顧客行動の変化・ビジネス指標の変化を期待するか」を必ず併記する習慣をつけましょう。</li>
        </ul>
      </div>

      <h3>12.2 LO5.2: プロダクトバックログを並び替える技術を最低3つ比較する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>5.2 compare at least three techniques to order a Product Backlog.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクトバックログの並び替え(ordering)には複数の技術があります。CSP-POでは最低3つを比較できることが求められます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BACKLOG_ORDERING_TECHNIQUES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">プロダクトバックログの並び替え技術4種</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技術</th><th>概要</th><th>出典</th></tr></thead>
          <tbody>
            <tr><td>Kanoモデル</td><td>機能を「当たり前品質」「一元的品質」「魅力的品質」等に分類し、顧客満足度への影響で優先順位付けする</td><td>Noriaki Kano, 1984年[18]</td></tr>
            <tr><td>WSJF/CD3(Cost of Delay Divided by Duration)</td><td>Cost of Delayを所要期間で割った値が高い順に着手する</td><td>Don Reinertsen(概念)、Joshua Arnold(CD3の命名)[14][15]</td></tr>
            <tr><td>MoSCoW法</td><td>Must have(必須)、Should have(重要)、Could have(あれば良い)、Won't have(今回は含めない)の4段階に分類する</td><td>業界で広く使われる優先順位付けの古典的手法</td></tr>
            <tr><td>学習価値優先</td><td>最もリスクの高い(不確実性の高い)仮説を検証できる項目から着手する</td><td>Lean Startup的な考え方[16]</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>WSJF/CD3の計算式</strong>:</p>
      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_WSJF_CALCULATION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">WSJF/CD3スコアの算出方法</div>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>CD3を使うと、異なる価値・緊急性を持つ機会を共通の尺度で比較でき、所要期間が異なる場合にも対応できる[15]。</p>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>現在のプロダクトバックログの並び替えロジックを確認する(直感的な並び替えになっていないか)</li>
        <li>上記4技術のうち3つを選び、同じバックログに実際に適用してみる</li>
        <li>それぞれの技術で並び替えた結果の違いを比較する</li>
        <li>状況(不確実性の高さ、ステークホルダーの構成、経済的なプレッシャーの度合い)に応じて最適な技術、あるいは複数の技術の組み合わせを選ぶ</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>状況に応じて使い分ける。</strong>単一の技術に固執せず、状況に応じて技術を使い分けることが、CSP-POレベルの高度なバックログマネジメントの本質です。</li>
          <li><strong>相対的な見積もりでも客観性は上がる。</strong>Cost of Delayの相対的な見積もりだけでも、直感的な優先順位付けよりはるかに客観的な議論ができるようになります[14]。</li>
        </ul>
      </div>

      <h3>12.3 LO5.3: 1人以上のステークホルダーに対してプロダクトバックログの並び順を擁護する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>5.3 defend the order of a Product Backlog with one or more stakeholders.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: これはEvaluationレベルの学習目標で、単に並び替えができるだけでなく、その根拠をステークホルダーに説明し、納得してもらう(defend、擁護する)コミュニケーション力が求められます。</p>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>プロダクトバックログの並び順の根拠(使用した技術、Cost of Delayなどの数値)を整理する</li>
        <li>ステークホルダーが最も気にするであろう反論を事前に想定する</li>
        <li>数値やデータだけでなく、プロダクトゴールとの関連性でストーリーとして説明する</li>
        <li>ステークホルダーからの反論・懸念に対し、データに基づいて誠実に応答する</li>
        <li>合意した並び順、あるいは修正した並び順を記録し、透明性を保つ</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>経済的根拠で語る。</strong>「なぜこの順番なのか」を説明する際は、「私が決めた」ではなく「これこれの経済的根拠(Cost of Delayなど)に基づいて、こういう判断をした」という形で語ることで、感情的な対立を避けやすくなります。</li>
          <li><strong>擁護と柔軟性を両立する。</strong>ステークホルダーの反論の中に、POが見落としていた重要な情報が含まれている場合もあります。「擁護する」ことは「意見を曲げない」ことと同義ではなく、正当な理由があれば並び順を修正する柔軟性も必要です。</li>
        </ul>
      </div>

      <h3>12.4 LO5.4: 自分のスクラムチームのプロダクトバックログをリファインメントする能力を評価する</h3>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>5.4 evaluate their Scrum Team's ability to effectively refine the Product Backlog.[2]</p>
      </div>

      <p><strong>詳細な説明</strong>: プロダクトバックログリファインメント(Refinement)は、Scrum Guideにおいて「Product Backlog項目に詳細、見積もり、順序を追加する、継続的な活動」と定義されています[3]。CSP-POでは、自チームがこのリファインメントを効果的に行えているかを評価する自己省察力が求められます。</p>

      <p><strong>リファインメントの効果性を評価するチェックリスト</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>評価項目</th><th>良い兆候</th><th>悪い兆候</th></tr></thead>
          <tbody>
            <tr><td>頻度</td><td>定期的に(例: 毎Sprint)実施されている</td><td>場当たり的、または全く行われていない</td></tr>
            <tr><td>参加者</td><td>POと開発者が協働して詳細化している</td><td>POのみ、または開発者のみで進めている</td></tr>
            <tr><td>アウトプットの質</td><td>Sprint Planningで着手可能な粒度になっている</td><td>大きすぎる/曖昧すぎる項目が残っている</td></tr>
            <tr><td>ステークホルダーの声の反映</td><td>顧客リサーチ・実験結果が反映されている</td><td>過去の決定がそのまま放置されている</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>進め方(ステップバイステップ)</strong>:</p>
      <ol>
        <li>上記チェックリストを使って、自チームの現在のリファインメントの状態を評価する</li>
        <li>弱点(例: 参加者が偏っている、頻度が不安定)を特定する</li>
        <li>レトロスペクティブでチームと一緒に改善策を議論する</li>
        <li>改善策を次のSprintから試し、再評価する</li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>継続的な活動として捉える。</strong>リファインメントは「Sprintの一部」であり、追加のイベントというよりは継続的な活動として捉えるべきです[3]。</li>
          <li><strong>クロスチームでの場を設ける。</strong>複数チームでプロダクトバックログを共有している場合、Nexusフレームワークが定義する「Cross-Team Refinement」のように、依存関係を横断的に扱う場を設けることが有効です[9]。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 13. Best Practices Checklist ===================== -->
    <section id="best-practices-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:bulb" aria-hidden="true" />SECTION 13</div>
      <h2>ベストプラクティス総合チェックリスト</h2>

      <p>以下は、これまでの各カテゴリーで紹介したベストプラクティスを横断的に整理した、実務で使えるチェックリストです。</p>

      <h3>13.1 ステークホルダー・チームマネジメント</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>チェック項目</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>対立するステークホルダーの利害と立場を分けて可視化しているか</td></tr>
            <tr><td>2</td><td>新チーム発足時にTuckmanモデルを踏まえたチームビルディングの時間を確保しているか[10][11]</td></tr>
            <tr><td>3</td><td>Definition of Doneの品質期待値をチーム発足時から明文化しているか[3]</td></tr>
            <tr><td>4</td><td>複数チームを担当する場合、単一のプロダクトゴール・プロダクトバックログを維持しているか[8][9]</td></tr>
            <tr><td>5</td><td>委任(delegation)する際に、期待される成果・制約・権限を明確にしているか[8]</td></tr>
          </tbody>
        </table>
      </div>

      <h3>13.2 戦略・計画</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>チェック項目</th></tr></thead>
          <tbody>
            <tr><td>6</td><td>ビジネスモデルをBusiness Model Canvas等で定期的に見直しているか[12]</td></tr>
            <tr><td>7</td><td>競合分析(Porterのファイブフォース等)を定期的に更新しているか[13]</td></tr>
            <tr><td>8</td><td>リリース戦略をビジネスモデルの特性に合わせて選択しているか</td></tr>
            <tr><td>9</td><td>プロダクトローンチゴールを計測可能な形で最低3つ以上設定しているか</td></tr>
          </tbody>
        </table>
      </div>

      <h3>13.3 プロダクトエコノミクス</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>チェック項目</th></tr></thead>
          <tbody>
            <tr><td>10</td><td>Cost of Delayを相対的にでも定量化する習慣があるか[14]</td></tr>
            <tr><td>11</td><td>WSJF/CD3のような経済的な優先順位付け手法を使っているか[15]</td></tr>
            <tr><td>12</td><td>反復的・漸進的な投資モデル(Build-Measure-Learn)を採用しているか[16]</td></tr>
            <tr><td>13</td><td>資金提供の仕組みがアジャイルな方向転換を妨げていないか確認しているか</td></tr>
          </tbody>
        </table>
      </div>

      <h3>13.4 顧客理解と仮説検証</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>チェック項目</th></tr></thead>
          <tbody>
            <tr><td>14</td><td>継続的な顧客リサーチの仕組み(Opportunity Solution Tree等)を持っているか[17]</td></tr>
            <tr><td>15</td><td>リスクの高い前提から優先的に実験で検証しているか[16]</td></tr>
            <tr><td>16</td><td>バニティメトリクスではなくアクショナブルなメトリクスで実験を評価しているか[16]</td></tr>
          </tbody>
        </table>
      </div>

      <h3>13.5 プロダクトバックログマネジメント</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>チェック項目</th></tr></thead>
          <tbody>
            <tr><td>17</td><td>アウトプットではなくアウトカム・インパクトを重視した指標を使っているか[17]</td></tr>
            <tr><td>18</td><td>複数の並び替え技術を状況に応じて使い分けているか</td></tr>
            <tr><td>19</td><td>並び順の根拠をステークホルダーに説明できる状態にしているか</td></tr>
            <tr><td>20</td><td>リファインメントの効果性を定期的に自己評価しているか[3]</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <!-- ===================== 14. Common Misconceptions and Anti-Patterns ===================== -->
    <section id="misconceptions">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:file-text" aria-hidden="true" />SECTION 14</div>
      <h2>よくある誤解とアンチパターン</h2>

      <p>CSP-POレベルの学習者が陥りやすい誤解・アンチパターンを整理します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>誤解・アンチパターン</th><th>正しい理解</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>「複数チームを担当するPOは、各チームのバックログを別々に管理すればよい」</td><td>Scrumの原則は「one product, one Product Backlog」であり、複数チームでも単一のバックログを維持すべき[9]</td></tr>
            <tr><td>2</td><td>「新チームの立ち上げは、要件をきっちり固めることから始めるべき」</td><td>Scrumは経験主義に基づき、要件は継続的に進化することを前提とする[3]</td></tr>
            <tr><td>3</td><td>「Cost of Delayは厳密に計算できないと使えない」</td><td>相対的・概算での算出でも、優先順位付けの議論を大きく改善できる[14]</td></tr>
            <tr><td>4</td><td>「顧客インタビューは大規模なプロジェクトとして年に1回行えば十分」</td><td>継続的ディスカバリー(週次~月次の対話)がプロダクトの質を継続的に高める[17]</td></tr>
            <tr><td>5</td><td>「実験が失敗したら、その機能開発は無駄だった」</td><td>失敗した実験も、安価に得られた重要な学習である[16]</td></tr>
            <tr><td>6</td><td>「ベロシティが高いチーム=価値を生んでいるチーム」</td><td>アウトプットの量とアウトカムの質は別物であり、混同すべきではない[17]</td></tr>
            <tr><td>7</td><td>「ビジネスモデルは一度決めたら変更すべきではない」</td><td>市場環境の変化に応じて定期的に見直すべきツールである[12]</td></tr>
            <tr><td>8</td><td>「PO一人がすべての意思決定を担うべきで、委任は責任放棄である」</td><td>適切な委任は、複数チームをスケールする上で不可欠なスキルである[8]</td></tr>
            <tr><td>9</td><td>「ステークホルダーとの対立は避けるべきものであり、起きたら失敗」</td><td>対立は自然な現象であり、ファシリテーションの質を高める学習機会である</td></tr>
            <tr><td>10</td><td>「プロダクトバックログの並び順は、一度決めたら変えるべきではない」</td><td>市場・データの変化に応じて継続的にリファインメント・並び替えを行うべき[3]</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <!-- ===================== 15. Career Path and Renewal ===================== -->
    <section id="career-renewal">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 15</div>
      <h2>認定後のキャリアパスと更新</h2>

      <h3>15.1 CSP-PO取得後に開けるキャリアパス</h3>
      <p>公式ページによれば、CSP-PO取得は以下のキャリアパスへの重要なマイルストーンとなります[1]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CAREER_PATH" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSP-PO取得後の3つのキャリアパス</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>資格</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>Certified Scrum Trainer®(CST)</td><td>Scrum Alliance公認のトレーナーとして、CSM・CSPOなどの認定コースを教える資格[1][23]</td></tr>
            <tr><td>Certified Enterprise Coach(CEC)</td><td>組織全体のアジャイル変革をコーチングする、Scrum Allianceの最高位のコーチ資格の1つ[1][24]</td></tr>
            <tr><td>Certified Team Coach(CTC)</td><td>チームレベルのアジャイルコーチングを専門とする資格[1][25]</td></tr>
          </tbody>
        </table>
      </div>

      <h3>15.2 CSP-PO取得のその他のメリット</h3>
      <p>公式ページでは、CSP-PO取得の主なメリットとして以下が挙げられています[1]。</p>
      <ul>
        <li>就職機会と給与ポテンシャルの向上</li>
        <li>CST・CEC・CTCへのゲートウェイ・マイルストーンの確立</li>
        <li>Comparative Agility®(世界最大級のアジャイルアセスメント・改善プラットフォーム)へのプレミアム無料サブスクリプション[1][19][20]</li>
      </ul>

      <h3>15.3 更新(Renewal)の仕組み</h3>
      <p>CSP-POは2年ごとに更新が必要です[1]。公式FAQによれば、更新には以下が必要です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_RENEWAL_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSP-POの2年ごとの更新サイクル</div>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>CSP-POの整合性と価値を維持するため、2年ごとに更新すること。これには、40 Scrum Education Units(SEU)の蓄積、Scrum Alliance公式サイトでの更新申請の完了、$250の更新料の支払いが含まれる[1][21][22]。</p>
      </div>

      <h3>15.4 Scrum Education Units(SEU)の稼ぎ方</h3>
      <p>SEUは、書籍を読む、ウェビナーを視聴する、イベントに参加するなど、継続的な学習活動によって蓄積されます[1]。Scrum Alliance公式リソースライブラリの記事や動画にも、閲覧するだけでSEUが付与されるものがあります[21]。</p>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>日常的に蓄積する。</strong>SEUは更新期限の直前にまとめて稼ごうとするのではなく、日常的な学習活動(業界記事の閲覧、社内勉強会での登壇など)を通じて継続的に蓄積する習慣をつけましょう。</li>
          <li><strong>Comparative Agilityを実務で活かす。</strong>Comparative Agilityのプレミアムアクセスを活用し、自チーム・自組織のアジャイル成熟度を定期的にアセスメントすることは、CSP-POが学んだ「評価・査定(assess)」スキルを実務で継続的に活かす良い機会になります[19][20]。</li>
        </ul>
      </div>
    </section>
    <!-- ===================== 16. Summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 16</div>
      <h2>まとめ</h2>

      <p>CSP-PO(Certified Scrum Professional® - Product Owner)は、Scrum AllianceのProduct Owner Trackにおける最高位の認定であり、以下の5つのカテゴリー・31の学習目標を通じて、経験豊富なプロダクトオーナーが直面する複雑な現実の課題に対応する力を養います[2]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_FIVE_CATEGORIES_SUMMARY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSP-POを構成する5つの学習目標カテゴリー</div>
      </div>

      <p>本ガイドで扱った主要なポイントを振り返ると:</p>
      <ol>
        <li><strong>ステークホルダー対話とチーム立ち上げ</strong>: 対立の解消、新チームの段階的な立ち上げ、複数チームにまたがるスケーリングパターンの使い分けが求められる</li>
        <li><strong>戦略とプロダクトエコノミクス</strong>: ビジネスモデル、競合分析、リリース戦略、そしてCost of Delay・WSJFといった経済的な優先順位付け手法の理解と実践が中核となる</li>
        <li><strong>顧客理解と仮説検証</strong>: 継続的ディスカバリーとOpportunity Solution Tree、そして最小限の実験による仮説検証が、Lean Startup的なアプローチとして統合される</li>
        <li><strong>高度なバックログマネジメント</strong>: アウトプットではなくアウトカムを重視し、複数の並び替え技術を使い分け、その根拠をステークホルダーに擁護できることが求められる</li>
      </ol>

      <p>CSP-POは、単なる知識の証明ではなく、Bloom's Taxonomyの高次レベル(分析・統合・評価)に相当する「実務での判断力」を検証する認定です[2]。取得後は、Certified Scrum Trainer®、Certified Enterprise Coach、Certified Team Coachといった、より広い範囲でアジャイル変革をリードするキャリアパスへの道が開かれます[1]。</p>
    </section>
    <!-- ===================== 17. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 17</div>
      <h2>参考文献・出典一覧</h2>

      <div class="ref-group">
        <h3>引用文献一覧</h3>
        <ul class="ref-list">
          <li><span class="ref-name">[1] Scrum Alliance, "Certified Scrum Professional Product Owner (CSP-PO) Certification"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner</a></li>
          <li><span class="ref-name">[2] Scrum Alliance, "CSP-PO Learning Objectives" (January 2022, PDF)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/csp_po_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/csp_po_learning_objectives_2022.pdf</a></li>
          <li><span class="ref-name">[3] Ken Schwaber and Jeff Sutherland, "The Scrum Guide" (2020)</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
          <li><span class="ref-name">[4] "Manifesto for Agile Software Development"</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          <li><span class="ref-name">[5] Scrum Alliance, "Scrum Values"</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
          <li><span class="ref-name">[6] Scrum Alliance, "Advanced Certified Scrum Product Owner (A-CSPO)"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner</a></li>
          <li><span class="ref-name">[7] Scrum Alliance, "Certified Scrum Product Owner (CSPO)"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner</a></li>
          <li><span class="ref-name">[8] Jim Schiel, "What to Do When You're Asked to Be the Product Owner for Multiple Teams," Scrum Alliance Resource Library</span><a class="ref-url" href="https://resources.scrumalliance.org/article/youre-asked-product-owner-multiple-teams" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/youre-asked-product-owner-multiple-teams</a></li>
          <li><span class="ref-name">[9] Scrum.org, "The Nexus Guide"</span><a class="ref-url" href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/online-nexus-guide</a></li>
          <li><span class="ref-name">[10] "Tuckman's stages of group development," Wikipedia(Bruce Tuckman, 1965/1977年の研究に基づく)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development</a></li>
          <li><span class="ref-name">[11] MindTools, "Forming, Storming, Norming, and Performing"</span><a class="ref-url" href="https://www.mindtools.com/abyj5fi/forming-storming-norming-and-performing/" target="_blank" rel="noopener">https://www.mindtools.com/abyj5fi/forming-storming-norming-and-performing/</a></li>
          <li><span class="ref-name">[12] Strategyzer, "The Business Model Canvas"(Alexander Osterwalder &amp; Yves Pigneur)</span><a class="ref-url" href="https://www.strategyzer.com/library/the-business-model-canvas" target="_blank" rel="noopener">https://www.strategyzer.com/library/the-business-model-canvas</a></li>
          <li><span class="ref-name">[13] "Porter's five forces analysis," Wikipedia(Michael E. Porter, 1979年)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Porter%27s_five_forces_analysis" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Porter%27s_five_forces_analysis</a></li>
          <li><span class="ref-name">[14] Black Swan Farming, "Cost of Delay"(Don Reinertsenの理論に基づく)</span><a class="ref-url" href="https://blackswanfarming.com/cost-of-delay/" target="_blank" rel="noopener">https://blackswanfarming.com/cost-of-delay/</a></li>
          <li><span class="ref-name">[15] Black Swan Farming, "WSJF – Weighted Shortest Job First"</span><a class="ref-url" href="https://blackswanfarming.com/wsjf-weighted-shortest-job-first/" target="_blank" rel="noopener">https://blackswanfarming.com/wsjf-weighted-shortest-job-first/</a></li>
          <li><span class="ref-name">[16] The Lean Startup, "Methodology"(Eric Ries)</span><a class="ref-url" href="https://theleanstartup.com/principles" target="_blank" rel="noopener">https://theleanstartup.com/principles</a></li>
          <li><span class="ref-name">[17] Product Talk, "Opportunity Solution Trees"(Teresa Torres)</span><a class="ref-url" href="https://www.producttalk.org/opportunity-solution-trees/" target="_blank" rel="noopener">https://www.producttalk.org/opportunity-solution-trees/</a></li>
          <li><span class="ref-name">[18] "Kano model," Wikipedia(Noriaki Kano, 1984年)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Kano_model" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Kano_model</a></li>
          <li><span class="ref-name">[19] Scrum Alliance, "Comparative Agility Member Benefit"</span><a class="ref-url" href="https://www.scrumalliance.org/member-benefits/comparative-agility" target="_blank" rel="noopener">https://www.scrumalliance.org/member-benefits/comparative-agility</a></li>
          <li><span class="ref-name">[20] Comparative Agility, 公式サイト</span><a class="ref-url" href="https://www.comparativeagility.com/" target="_blank" rel="noopener">https://www.comparativeagility.com/</a></li>
          <li><span class="ref-name">[21] Scrum Alliance, "Scrum Education Units (SEUs)"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
          <li><span class="ref-name">[22] Scrum Alliance, "Renewing Certifications"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/renewing-certifications</a></li>
          <li><span class="ref-name">[23] Scrum Alliance, "Certified Scrum Trainer&reg;"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/trainers" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/trainers</a></li>
          <li><span class="ref-name">[24] Scrum Alliance, "Certified Enterprise Coach"</span><a class="ref-url" href="https://www.scrumalliance.org/agile-coaching/cec" target="_blank" rel="noopener">https://www.scrumalliance.org/agile-coaching/cec</a></li>
          <li><span class="ref-name">[25] Scrum Alliance, "Certified Team Coach"</span><a class="ref-url" href="https://www.scrumalliance.org/agile-coaching/ctc" target="_blank" rel="noopener">https://www.scrumalliance.org/agile-coaching/ctc</a></li>
          <li><span class="ref-name">[26] Scrum Alliance, "Product Roadmaps: Your Secret Weapon for Success"</span><a class="ref-url" href="https://resources.scrumalliance.org/article/product-roadmaps-secret-weapon-success" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/product-roadmaps-secret-weapon-success</a></li>
        </ul>
      </div>
    </section>

    <footer>
      <p>本ガイドは、2026年8月時点でScrum Alliance公式サイトから取得した一次情報源に基づいて作成されています。認定要件・学習目標は改訂される可能性があるため、実際の受験・受講にあたっては、必ず<a href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>で最新情報をご確認ください。</p>
      <p>Certified Scrum Professional&reg;、CSP&reg;、Scrum Alliance&reg; は Scrum Alliance, Inc. の登録商標です。本ページはScrum Allianceの公式資料ではなく、教育・学習支援を目的として作成された非公式のガイドです。</p>
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

  

  .csp-po-guide { 
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
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    height: 100vh;
    overflow-y: auto;
    background: var(--color-paper-raised);
    border-right: 1px solid var(--color-border);
    padding: 32px 24px 40px;
    z-index: 20;
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
    
    .sidebar { transition: none; }
  }

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  z-index: 15;
}
</style>
