<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-guide",
  "acspo-overview",
  "requirements",
  "blooms-taxonomy",
  "scrum-foundations-bridge",
  "core-competencies-mindset",
  "core-competencies-stakeholders",
  "core-competencies-technical-debt",
  "core-competencies-scaling",
  "goal-setting-planning",
  "empathizing-customers",
  "assumption-validation",
  "backlog-management",
  "best-practices-checklist",
  "misconceptions-antipatterns",
  "career-path",
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
  title: "A-CSPO® 認定資格 完全ガイド | Advanced Certified Scrum Product Owner 学習ガイド",
  description: "Scrum Alliance Advanced Certified Scrum Product Owner (A-CSPO) の公式ラーニングオブジェクティブに基づく、初学者向けステップバイステップ学習ガイド。",
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
  pie1: "#C7D1EA",
  pie2: "#AEDBD6",
  pie3: "#F0D9A6",
  pie4: "#E7C0D0",
  pieOpacity: "1",
  pieStrokeColor: "#FFFFFF",
  pieStrokeWidth: "2px",
  pieOuterStrokeWidth: "1px",
  pieOuterStrokeColor: "#DFE3EA",
  pieSectionTextColor: "#161B26",
  pieLegendTextColor: "#161B26",
  pieTitleTextColor: "#161B26"
};

const DIAGRAM_CERTIFICATION_PATH = `flowchart LR
A["CSPO
基礎を学ぶ"] --> B["12ヶ月以上の
実務経験"]
B --> C["A-CSPO
応用力を鍛える"]
C --> D["CSP-PO
実務家として認められる"]
D --> E["SEUによる
継続的な更新"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;`;

const DIAGRAM_REQUIREMENTS_FLOW = `flowchart TD
S["Start"] --> A["CSPOを保有している？"]
A -- No --> A1["先にCSPOコースを受講"]
A1 --> A
A -- Yes --> B["直近5年以内に
PO実務経験12ヶ月以上ある？"]
B -- No --> B1["PO業務の経験を積む"]
B1 --> B
B -- Yes --> C["A-CSPO認定コースを受講"]
C --> D["事前/事後課題を完了"]
D --> E["ライセンス契約に同意し
プロフィールを完成"]
E --> F["A-CSPO取得"]
F --> G["2年ごとにSEUで更新"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S,A,B,C,D,E box;
class A1,B1 hub;
class F,G done;`;

const DIAGRAM_BLOOMS_TAXONOMY_PYRAMID = `flowchart BT
K["Knowledge
知識"] --> C["Comprehension
理解"]
C --> App["Application
応用"]
App --> An["Analysis
分析"]
An --> S["Synthesis
統合"]
S --> E["Evaluation
評価"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class K,C box;
class App,An hub;
class S,E done;`;

const DIAGRAM_SCRUM_FRAMEWORK_OVERVIEW = `flowchart TB
subgraph Team["Scrum Team"]
PO["Product Owner"]
SM["Scrum Master"]
DEV["Developers"]
end
subgraph Artifacts["Artifacts と Commitments"]
PB["Product Backlog
Product Goal"]
SB["Sprint Backlog
Sprint Goal"]
INC["Increment
Definition of Done"]
end
subgraph Events["Events"]
SP["Sprint Planning"]
DS["Daily Scrum"]
SR["Sprint Review"]
RETRO["Sprint Retrospective"]
end
PO --> PB
PB --> SP
SP --> SB
Team --> SB
SB --> DS
DS --> INC
INC --> SR
SR --> RETRO
RETRO --> PB
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PO,SM,DEV,PB,SB,INC,SP,DS,SR,RETRO box;`;

const DIAGRAM_STAKEHOLDER_DECISION_FLOW = `flowchart TD
A["意見が出そろう"] --> B["評価基準を
先に合意する"]
B --> C["基準に沿って
選択肢を絞り込む"]
C --> D["合意形成技術を選ぶ"]
D --> E1["フィストトゥファイブ"]
D --> E2["ローマ式投票"]
D --> E3["決定者を明確にした上での相談"]
E1 --> F["決定を記録し
合意内容を全員に共有"]
E2 --> F
E3 --> F
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,C,F box;
class D,E1,E2,E3 hub;`;

const DIAGRAM_TECHNICAL_DEBT_QUADRANT = `flowchart TB
subgraph Deliberate["意図的 - Deliberate"]
DP["思慮深い
リリースを優先し
後で返済すると
合意した近道"]
DR["無謀
設計をきちんと
やる時間がないから
このまま進める"]
end
subgraph Inadvertent["偶発的 - Inadvertent"]
IP["思慮深い
今ならこうすべきだったと
後から気づいた設計"]
IR["無謀
そもそも設計の
原則を知らなかった"]
end
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class DP done;
class IP,DR,IR box;`;

const DIAGRAM_DEPENDENCY_MANAGEMENT_FLOW = `flowchart TD
A["依存関係の存在に気づく"] --> B["可視化する"]
B --> B1["依存関係ボード
Cross-team Dependency Board"]
B --> B2["ストーリーマップ上での
チーム横断表示"]
B --> C["管理する"]
C --> C1["Nexus統合チームによる
定期的な調整"]
C --> C2["共通のDefinition of Done"]
B --> D["削減する"]
D --> D1["プロダクトバックログの
順序を見直し
依存の強い項目を近づける"]
D --> D2["チーム構成そのものを
見直す(フィーチャーチーム化)"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,C,D box;
class B1,B2,C1,C2,D1,D2 hub;`;

const DIAGRAM_PRODUCT_STRATEGY_CASCADE = `flowchart TB
V["プロダクトビジョン
なぜこのプロダクトが存在するか"] --> S["プロダクト戦略
どの市場・顧客に
どう価値を届けるか"]
S --> G["プロダクトゴール
次に到達したい
具体的な状態"]
G --> R["ロードマップ
Now / Next / Later"]
R --> PB["プロダクトバックログ
順序付けされた
具体的な作業項目"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class V,S,G,R,PB box;`;

const DIAGRAM_IMPACT_MAPPING_FLOW = `flowchart LR
Why["Why
達成したい
ビジネスゴール"] --> Who["Who
ゴールに影響を
与えるアクター"]
Who --> How["How
アクターに
起こしたい
インパクト"]
How --> What["What
インパクトを
実現するための
デリバラブル"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class Why,Who,How,What box;`;

const DIAGRAM_PRODUCT_DISCOVERY_LOOP = `flowchart LR
P["問題を発見する"] --> D["顧客インタビュー"]
P --> O["行動観察
オブザベーション"]
D --> H["仮説を立てる"]
O --> H
H --> T["プロトタイプ・
モックアップで検証"]
T --> L["学びをバックログに反映"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P,D,O,H,T,L box;`;

const DIAGRAM_BUILD_MEASURE_LEARN_LOOP = `flowchart LR
B["Build
最小限の実験
または
MVPを作る"] --> M["Measure
実際の
利用データ・反応を
測定する"]
M --> L["Learn
検証された学びを
得る"]
L --> D{"仮説は
支持されたか"}
D -- Yes --> Persevere["Persevere
このまま前進する"]
D -- No --> Pivot["Pivot
方向転換する"]
Persevere --> B
Pivot --> B
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class B,M,L,Persevere,Pivot box;
class D hub;`;

const DIAGRAM_HYPOTHESIS_VALIDATION_FLOW = `flowchart TD
H["仮説を1文で書く"] --> M["成功/失敗を判断する
測定可能な指標を決める"]
M --> E["最小限の実験方法を選ぶ
インタビュー / プロトタイプ / A/Bテスト"]
E --> Th["判定基準を
実験前に決めておく"]
Th --> Run["実験を実施する"]
Run --> Result["結果を評価し
次のアクションを決める"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class H,M,E,Th,Run,Result box;`;

const DIAGRAM_WSJF_FLOW = `flowchart LR
BV["ビジネス価値"] --> CoD["Cost of Delay
遅延コスト"]
TC["時間的緊急度"] --> CoD
RR["リスク低減・
機会創出"] --> CoD
CoD --> WSJF["WSJF =
Cost of Delay
÷
Job Size"]
JS["Job Size
所要期間"] --> WSJF
WSJF --> Order["優先順位が
高いものから着手"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class BV,TC,RR,CoD,JS,WSJF,Order box;`;

const DIAGRAM_BACKLOG_READY_FLOW = `flowchart TD
A["プロダクトバックログ
リファインメントを
定期的に実施"] --> B["上位項目から順に
詳細化する"]
B --> C["受け入れ基準を
明文化する"]
C --> D["見積もり可能な
粒度まで分割する"]
D --> E["チームで
準備完了の基準を
合意しておく"]
E --> F["Sprint Planningで
即座に着手できる
状態を維持"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F box;`;

const DIAGRAM_ACSPO_CATEGORY_MAP = `flowchart TB
ACSPO["A-CSPO
5つの学習目標カテゴリー"] --> C1["1. Product Owner
Core Competencies"]
ACSPO --> C2["2. Advanced Goal
Setting and Planning"]
ACSPO --> C3["3. Empathizing with
Customers and Users"]
ACSPO --> C4["4. Advanced Product
Assumption Validation"]
ACSPO --> C5["5. Product Backlog
Management"]
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class ACSPO hub;
class C1,C2,C3,C4,C5 box;`;

const DIAGRAM_CSP_PO_CAREER_PATH = `flowchart LR
CSPO["CSPO"] --> ACSPO["A-CSPO"]
ACSPO --> CSPPO["CSP-PO"]
CSPPO --> CTC["CTC / CEC など
トレーナー・コーチ系
資格への発展も可能"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class CSPO,ACSPO,CSPPO,CTC box;`;

const DIAGRAM_SEU_RENEWAL_CYCLE = `flowchart TD
A["A-CSPO取得"] --> B["学習活動を継続する"]
B --> B1["書籍を読む"]
B --> B2["ウェビナーを視聴する"]
B --> B3["カンファレンスに参加する"]
B1 --> C["SEUを蓄積する"]
B2 --> C
B3 --> C
C --> D["2年ごとに
資格を更新する"]
D --> B
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,C,D box;
class B,B1,B2,B3 hub;`;

const checklistState = reactive<Record<string, boolean>>({});

function toggleChecklist(key: string, event: Event): void {
  const target = event.target as HTMLInputElement;
  checklistState[key] = target.checked;
  if (import.meta.client) {
    if (target.checked) {
      localStorage.setItem(key, "1");
    } else {
      localStorage.removeItem(key);
    }
  }
}

onMounted(() => {
  if (import.meta.client) {
    const keys = document.querySelectorAll("input[data-checklist-key]");
    keys.forEach((el) => {
      const key = el.getAttribute("data-checklist-key");
      if (key && localStorage.getItem(key) === "1") {
        checklistState[key] = true;
      }
    });
  }
});
</script>

<template>
  <div class="acspo-guide">
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
        <div class="brand-title">A-CSPO® 完全ガイド</div>
        <div class="brand-subtitle">Advanced Certified Scrum Product Owner</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">はじめに</li>
      <li><a href="#about-guide" :class="{ active: activeId === 'about-guide' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />この章立てについて</a></li>
      <li><a href="#acspo-overview" :class="{ active: activeId === 'acspo-overview' }" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />A-CSPO資格の概要とProduct Owner Trackにおける位置づけ</a></li>
      <li><a href="#requirements" :class="{ active: activeId === 'requirements' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />受験要件と認定への道のり</a></li>
      <li><a href="#blooms-taxonomy" :class="{ active: activeId === 'blooms-taxonomy' }" @click="closeSidebar"><Icon name="tabler:stairs" aria-hidden="true" />Bloom's Taxonomyの読み方</a></li>
      <li><a href="#scrum-foundations-bridge" :class="{ active: activeId === 'scrum-foundations-bridge' }" @click="closeSidebar"><Icon name="tabler:building-bridge-2" aria-hidden="true" />CSPOからの橋渡し: Scrum基礎の要点整理</a></li>
      <li class="nav-group-label">Core Competencies (LO 1.1-1.13)</li>
      <li><a href="#core-competencies-mindset" :class="{ active: activeId === 'core-competencies-mindset' }" @click="closeSidebar"><Icon name="tabler:brain" aria-hidden="true" />Core Competencies① プロダクトオーナーシップの本質とマインドセット</a></li>
      <li><a href="#core-competencies-stakeholders" :class="{ active: activeId === 'core-competencies-stakeholders' }" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />Core Competencies② ステークホルダーとの協働技術</a></li>
      <li><a href="#core-competencies-technical-debt" :class="{ active: activeId === 'core-competencies-technical-debt' }" @click="closeSidebar"><Icon name="tabler:report-money" aria-hidden="true" />Core Competencies③ 開発者との協働と技術的負債</a></li>
      <li><a href="#core-competencies-scaling" :class="{ active: activeId === 'core-competencies-scaling' }" @click="closeSidebar"><Icon name="tabler:network" aria-hidden="true" />Core Competencies④ 複数チームでのプロダクトオーナーシップ</a></li>
      <li class="nav-group-label">4つの学習領域 (LO 2-5)</li>
      <li><a href="#goal-setting-planning" :class="{ active: activeId === 'goal-setting-planning' }" @click="closeSidebar"><Icon name="tabler:target" aria-hidden="true" />Advanced Goal Setting and Planning</a></li>
      <li><a href="#empathizing-customers" :class="{ active: activeId === 'empathizing-customers' }" @click="closeSidebar"><Icon name="tabler:heart-handshake" aria-hidden="true" />Empathizing with Customers and Users</a></li>
      <li><a href="#assumption-validation" :class="{ active: activeId === 'assumption-validation' }" @click="closeSidebar"><Icon name="tabler:flask" aria-hidden="true" />Advanced Product Assumption Validation</a></li>
      <li><a href="#backlog-management" :class="{ active: activeId === 'backlog-management' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />Product Backlog Management</a></li>
      <li class="nav-group-label">実践とキャリア</li>
      <li><a href="#best-practices-checklist" :class="{ active: activeId === 'best-practices-checklist' }" @click="closeSidebar"><Icon name="tabler:checklist" aria-hidden="true" />ベストプラクティス総まとめチェックリスト</a></li>
      <li><a href="#misconceptions-antipatterns" :class="{ active: activeId === 'misconceptions-antipatterns' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />よくある誤解・アンチパターン</a></li>
      <li><a href="#career-path" :class="{ active: activeId === 'career-path' }" @click="closeSidebar"><Icon name="tabler:trending-up" aria-hidden="true" />認定後のキャリアパス</a></li>
      <li class="nav-group-label">まとめ</li>
      <li><a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />まとめ</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考資料・出典一覧</a></li>
    </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">
        <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance® 公式ラーニングオブジェクティブ準拠</div>
      <h1>Advanced Certified Scrum Product Owner (A-CSPO®) 学習ガイド</h1>
      <p class="hero-lede">
        本ガイドは、Scrum Alliance® が公開している公式情報(A-CSPO® Learning Objectives、Scrum Foundations® Learning Objectives、Scrum Guide、Agile Manifesto など)と、プロダクトマネジメント/アジャイル分野で広く参照される一次情報を根拠として作成した、初学者から中級者向けの学習教材です。各章の末尾に「ソース」として根拠URLを明記しています。ASCII図は使用せず、フローチャートはすべて Mermaid、比較表・一覧はすべて Markdown テーブルで表現しています。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">学習目標カテゴリー</div></div>
        <div class="stat-card"><div class="stat-number">29</div><div class="stat-label">ラーニングオブジェクティブ(LO 1.1-5.5)</div></div>
        <div class="stat-card"><div class="stat-number">17</div><div class="stat-label">Mermaid図解</div></div>
        <div class="stat-card"><div class="stat-number">21</div><div class="stat-label">引用ソース</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは教育・学習支援を目的とした非公式の解説資料です。認定要件・出題範囲・料金などの最新情報は、必ず<a href="https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>でご確認ください。</span>
      </div>
    </div>

    <!-- ===================== 01. この章立てについて ===================== -->
    <section id="about-guide">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      <h2>この章立てについて</h2>

      <div class="table-wrap">
        <table>
          <thead><tr>
<th>#</th>
<th>章</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>1</td><td>A-CSPO資格の概要とProduct Owner Trackにおける位置づけ</td><td>資格の目的、CSPOとの違い、対象者</td></tr>
<tr><td>2</td><td>受験要件と認定への道のり</td><td>前提資格、実務経験、コース、更新</td></tr>
<tr><td>3</td><td>Bloom's Taxonomyの読み方</td><td>学習目標の6段階の理解</td></tr>
<tr><td>4</td><td>CSPOからの橋渡し: Scrum基礎の要点整理</td><td>Scrum Team・イベント・作成物の再確認</td></tr>
<tr><td>5</td><td>Core Competencies①: プロダクトオーナーシップの本質</td><td>1.1〜1.3</td></tr>
<tr><td>6</td><td>Core Competencies②: ステークホルダーとの協働</td><td>1.4〜1.8</td></tr>
<tr><td>7</td><td>Core Competencies③: 開発者との協働と技術的負債</td><td>1.9〜1.10</td></tr>
<tr><td>8</td><td>Core Competencies④: 複数チームでのプロダクトオーナーシップ</td><td>1.11〜1.13</td></tr>
<tr><td>9</td><td>Advanced Goal Setting and Planning</td><td>2.1〜2.4</td></tr>
<tr><td>10</td><td>Empathizing with Customers and Users</td><td>3.1〜3.2</td></tr>
<tr><td>11</td><td>Advanced Product Assumption Validation</td><td>4.1〜4.5</td></tr>
<tr><td>12</td><td>Product Backlog Management</td><td>5.1〜5.5</td></tr>
<tr><td>13</td><td>ベストプラクティス総まとめチェックリスト</td><td>全項目横断</td></tr>
<tr><td>14</td><td>よくある誤解・アンチパターン</td><td>実務でつまずきやすい点</td></tr>
<tr><td>15</td><td>認定後のキャリアパス</td><td>CSP-PO、SEU、更新</td></tr>
<tr><td>—</td><td>まとめ</td><td>全体総括</td></tr>
<tr><td>—</td><td>参考資料・出典一覧</td><td>引用元URL一覧</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 02. A-CSPO資格の概要とProduct Owner Trackにおける位置づけ ===================== -->
    <section id="acspo-overview">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 02</div>
      <h2>第1章 A-CSPO資格の概要とProduct Owner Trackにおける位置づけ</h2>

      <h3>1.1 A-CSPOとは何か</h3>
      <p>Advanced Certified Scrum Product Owner(A-CSPO®)は、Scrum Alliance® が提供する Product Owner Track の中級認定資格です。公式ページでは、A-CSPOコースは「ビジネス価値とROIを最大化しながら顧客を満足させるために、最も困難なシナリオに取り組めるようになる」ことを目的とした講座であると説明されています。<sup>[1]</sup></p>
      <p>A-CSPOは、初級資格であるCertified Scrum Product Owner(CSPO®)の内容を土台とし、以下のような、より複雑な実務課題に踏み込みます。<sup>[1]</sup></p>
      <ul>
        <li>複数の取り組み(イニシアチブ)が競合する中での時間と注意の配分</li>
        <li>複雑化したプロダクトバックログのマネジメント</li>
        <li>より効果的なプロダクトビジョンの定義</li>
        <li>難易度の高いステークホルダーとの議論のファシリテーション</li>
        <li>最も価値の高いビジネス機会の見極め</li>
      </ul>
      <h3>1.2 CSPOとの違い</h3>
      <p>公式FAQでは、CSPOが「Scrum環境でプロダクトオーナーとして働くための土台を作る」資格であるのに対し、A-CSPOは「より複雑なプロジェクトやステークホルダーとの力学に対応するための高度なスキルと手法を身につける」次のステップと位置づけられています。<sup>[1]</sup></p>
      <p>つまり、CSPOが「型を学ぶ」段階だとすれば、A-CSPOは「型を実際の複雑な現場でどう応用するか」を学ぶ段階だと理解すると分かりやすいです。</p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CERTIFICATION_PATH" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">CSPOからA-CSPOを経てCSP-POへ至る認定パス</div>
      </div>
      <h3>1.3 対象者</h3>
      <p>A-CSPOは、すでにCSPOを取得し、実際にプロダクトオーナーとして一定期間働いた経験を持つ人を対象としています。A-CSPOはプロダクトオーナートラックの最高位資格であるCSP-PO(Certified Scrum Professional® - Product Owner)の前提資格であり、CSP-POへ至るパスの一部として位置づけられています。これとは別の選択肢として、学習目標文書(Learning Objectives)にはScrum Allianceが承認した「Individual Path to CSP-PO」の教育者が扱う補足トピックについての言及もあります。<sup>[2]</sup></p>
      <h3>1.4 プロダクトオーナーとスクラムマスターの関係</h3>
      <p>公式FAQでは、プロダクトオーナーとスクラムマスターの関係は「上下関係ではなく補完関係」であると明記されています。プロダクトオーナーは主に「何を作るか」を顧客とステークホルダーのフィードバックに基づいて定義することに集中し、スクラムマスターはチームがスクラムの枠組みの中で効果的に協働し、問題を解決し、継続的に改善できるよう支援することに集中します。<sup>[1]</sup></p>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>A-CSPO学習者は「プロダクトオーナーが偉い」「スクラムマスターの下請け」といった誤解を持たないこと。両者は対等なアカウンタビリティを持つパートナーです。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner" target="_blank" rel="noopener">Scrum Alliance「Advanced Certified Scrum Product Owner (A-CSPO®)」公式ページ</a></li>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 03. 受験要件と認定への道のり ===================== -->
    <section id="requirements">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 03</div>
      <h2>第2章 受験要件と認定への道のり</h2>

      <h3>2.1 公式要件</h3>
      <p>A-CSPOを取得するためには、以下をすべて満たす必要があります。<sup>[1]</sup></p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>#</th>
<th>要件</th>
<th>補足</th>
</tr></thead>
          <tbody>
<tr><td>1</td><td>Scrum AllianceのCSPO資格を保有していること</td><td>有効・失効いずれでも可。A-CSPO取得時に自動更新される</td></tr>
<tr><td>2</td><td>過去5年以内にプロダクトオーナーとしての実務経験が12ヶ月以上あること</td><td>「プロダクトオーナーというアカウンタビリティに特化した」経験であることが求められる</td></tr>
<tr><td>3</td><td>Scrum Alliance認定の教育プロバイダーが提供するA-CSPOコースを受講すること</td><td>—</td></tr>
<tr><td>4</td><td>コースの全構成要素(事前課題・事後課題を含む場合がある)を完了すること</td><td>教育者によって課題内容が異なる</td></tr>
<tr><td>5</td><td>A-CSPOライセンス契約に同意し、Scrum Allianceのメンバープロフィールを完成させること</td><td>—</td></tr>
<tr><td>6</td><td>Scrum Education Units(SEU)を獲得し、2年ごとに資格を更新すること</td><td>詳細は第15章を参照</td></tr>
          </tbody>
        </table>
      </div>
      <h3>2.2 要件を満たすまでの流れ</h3>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_REQUIREMENTS_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">A-CSPO要件を満たすまでの意思決定フロー</div>
      </div>
      <h3>2.3 なぜ「12ヶ月の実務経験」が要件になっているのか</h3>
      <p>A-CSPOはコースを聞くだけで理解できる知識ではなく、「実際にステークホルダーと衝突し、バックログが肥大化し、思ったように優先順位付けができなかった」という現場経験があって初めて深く理解できる内容を扱います。学習目標そのものが「実世界の事例を議論する」「実際にステークホルダーとプロダクトプランを作成する」といった実践的な動詞(discuss, create, practice, experiment)で書かれていることからも、経験の蓄積を前提とした設計であることが分かります。<sup>[2]</sup></p>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>A-CSPOコースを受講する前に、自分がこの1年で経験した「ステークホルダー対応の失敗談」「バックログが手に負えなくなった経験」などを2〜3個書き出しておくと、コース内のディスカッションで実務に即した学びが得やすくなります。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner" target="_blank" rel="noopener">Scrum Alliance「Advanced Certified Scrum Product Owner (A-CSPO®)」公式ページ</a></li>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 04. Bloom's Taxonomyの読み方 ===================== -->
    <section id="blooms-taxonomy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:stairs" aria-hidden="true" />SECTION 04</div>
      <h2>第3章 Bloom's Taxonomyの読み方</h2>

      <h3>3.1 なぜBloom's Taxonomyを理解する必要があるのか</h3>
      <p>A-CSPO Learning Objectives文書は、すべての学習目標を「A-CSPO Learning Objectivesの検証に成功した学習者は、〜できるようになる」という前提のもとで、Bloom's Taxonomy(ブルームの分類学)に基づく動詞を使って記述しています。<sup>[1]</sup> 動詞はその項目が要求する理解のレベルを読み取る手がかりになりますが、レベルは動詞だけで決まるものではありません。実際のレベルは、公式PDFに記載されたBloomレベルの表示と、その学習目標の文脈をあわせて判断してください(3.3節を参照)。</p>
      <h3>3.2 6段階の分類</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>レベル</th>
<th>説明</th>
<th>代表的な動詞例</th>
</tr></thead>
          <tbody>
<tr><td>Knowledge(知識)</td><td>情報・プロセス・事実・概念の記憶</td><td>定義する、挙げる、列挙する</td></tr>
<tr><td>Comprehension(理解)</td><td>情報を解釈し、重要性を判断する</td><td>説明する、議論する、認識する</td></tr>
<tr><td>Application(応用)</td><td>得た知識・概念を実生活で適用する</td><td>適用する、実演する、例示する</td></tr>
<tr><td>Analysis(分析)</td><td>批判的思考で情報を分解・整理する</td><td>比較する、対比する、区別する</td></tr>
<tr><td>Synthesis(統合)</td><td>知識を使って新しい成果物・プロセスを作る</td><td>創造する、準備する、組織する</td></tr>
<tr><td>Evaluation(評価)</td><td>判断力を用いて意思決定・問題解決を行う</td><td>測定する、査定する、評価する</td></tr>
          </tbody>
        </table>
      </div>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BLOOMS_TAXONOMY_PYRAMID" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">Bloom's Taxonomy 6段階のピラミッド構造</div>
      </div>
      <h3>3.3 A-CSPOの学習目標のレベル感</h3>
      <p>CSPOの学習目標が主に Knowledge〜Application 中心であるのに対し、A-CSPOの学習目標は discuss(議論する)、practice(実践する)、create(作成する)、experiment(実験する)、appraise(査定する)、develop(開発する)といった、Analysis〜Evaluationに近い高次の動詞が数多く使われています。<sup>[1]</sup> これは、A-CSPOが「知っている」ではなく「実際の複雑な状況で使いこなせる」ことを求めている証拠です。</p>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>学習目標を読むときは、動詞に注目してください。「describe(説明できる)」であれば言葉で説明できれば十分ですが、「create(作成できる)」「experiment(実験できる)」であれば、実際に手を動かして成果物を作る・試行することが求められています。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 05. CSPOからの橋渡し：Scrum基礎の要点整理 ===================== -->
    <section id="scrum-foundations-bridge">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bridge-2" aria-hidden="true" />SECTION 05</div>
      <h2>第4章 CSPOからの橋渡し: Scrum基礎の要点整理</h2>

      <p>A-CSPOはCSPO取得者を対象としているため、Scrum Foundations® Learning Objectivesで定義される基礎知識(Scrum Theory、Scrum Team、Scrum Events、Scrum Artifacts)はすでに習得済みという前提で進みます。<sup>[1]</sup> ここでは、A-CSPOの学習に入る前に、要点だけを素早く再確認します。</p>
      <h3>4.1 Scrum Theory(スクラム理論)の要点</h3>
      <p>Scrum Foundations Learning Objectivesは、スクラムの定義、5つのスクラム価値基準、経験主義(Empiricism)の定義、経験主義を支える3本柱(透明性・検査・適応)を基礎知識として求めています。<sup>[1]</sup></p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>3本柱</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>透明性(Transparency)</td><td>プロセスや作業の重要な側面が、結果に責任を持つ人々に見える状態であること</td></tr>
<tr><td>検査(Inspection)</td><td>スクラムの作成物や、ゴールに向けた進捗を頻繁かつ注意深く検査すること</td></tr>
<tr><td>適応(Adaptation)</td><td>プロセスや作成物が許容範囲から逸脱していると分かった場合、できるだけ早く調整すること</td></tr>
          </tbody>
        </table>
      </div>
      <h3>4.2 Scrum Team・イベント・作成物の全体像</h3>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_SCRUM_FRAMEWORK_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">Scrum Team・Artifacts・Eventsの関係全体図</div>
      </div>
      <h3>4.3 プロダクトバックログの本質(復習)</h3>
      <p>Scrum GuideはProduct Backlogを「プロダクトを改善するために必要なものが記載された、創発的で順序付けされたリスト」であり「スクラムチームが行う作業の唯一の情報源」と定義しています。<sup>[2]</sup> A-CSPOでは、この定義を土台に、バックログが巨大化・複雑化した状況にどう対処するかを第12章で深く扱います。</p>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>A-CSPOの学習に入る前に、自分のチームの現在のProduct Goal、Sprint Goal、Definition of Doneをそれぞれ一文で言えるか確認してください。言えない場合は、基礎の再確認から始めることを推奨します。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://assets.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「Scrum Foundations® Learning Objectives」(2022年1月、2024年2月フォーマット更新)</a></li>
          <li><a href="https://scrumguides.org/" target="_blank" rel="noopener">Scrum Guide(2020年11月改訂版)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 06. Core Competencies① プロダクトオーナーシップの本質とマインドセット ===================== -->
    <section id="core-competencies-mindset">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:brain" aria-hidden="true" />SECTION 06</div>
      <h2>第5章 Core Competencies① プロダクトオーナーシップの本質とマインドセット(LO 1.1〜1.3)</h2>

      <h3>5.1 学習目標</h3>
      <ul>
        <li>1.1 プロダクトオーナーシップの重要性を分析する</li>
        <li>1.2 成功しているプロダクトオーナーのマインドセットと行動を振り返る</li>
        <li>1.3 スクラムチームが最新のスクラム定義を採用した場合に、ステークホルダーとの関係やプロダクトに生じうる影響を、少なくとも3つ議論する<sup>[1]</sup></li>
      </ul>
      <h3>5.2 プロダクトオーナーシップの重要性を分析する(1.1)</h3>
      <p>プロダクトオーナーは、プロダクトの価値を最大化する責任(アカウンタビリティ)を負う唯一の人物です。Scrum Guideは、プロダクトオーナーが「スクラムチームが行う作業の価値を最大化することに責任を持つ」と定めています。A-CSPOレベルでは、この責任を「なぜ重要か」という観点で分析することが求められます。具体的には以下の観点が挙げられます。</p>
      <ul>
        <li>プロダクトオーナーの意思決定が遅い・不明確だと、開発チームの手が止まる、または誤った方向に進む</li>
        <li>一人のプロダクトオーナーが明確な優先順位を示すことで、組織全体の投資判断に一貫性が生まれる</li>
        <li>プロダクトオーナーがビジネス価値と顧客価値の橋渡し役を担うことで、技術チームが「作ること」ではなく「価値を届けること」に集中できる</li>
      </ul>
      <h3>5.3 成功するプロダクトオーナーのマインドセット(1.2)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>マインドセットの要素</th>
<th>具体的な行動例</th>
</tr></thead>
          <tbody>
<tr><td>仮説思考</td><td>「これが正しい」ではなく「これが正しいかもしれない、検証しよう」と考える</td></tr>
<tr><td>サーバントリーダーシップ</td><td>開発チームに指示するのではなく、意思決定に必要な情報を提供する</td></tr>
<tr><td>権限委譲への理解</td><td>細部の実装判断は開発チームに委ね、Whatと Whyに集中する</td></tr>
<tr><td>継続的な学習姿勢</td><td>Sprint Reviewやユーザーからのフィードバックを次のプランニングに反映する</td></tr>
<tr><td>Noと言う勇気</td><td>すべての要求を受け入れず、プロダクトゴールに沿わないものを断る</td></tr>
          </tbody>
        </table>
      </div>
      <h3>5.4 最新のスクラム定義の採用がもたらす影響(1.3)</h3>
      <p>2020年版Scrum Guideでは、Product GoalやDefinition of Doneの位置づけが明確化されるなど、旧版からの変更点があります。A-CSPOでは、こうした「スクラムの定義そのものが更新された場合」に、自チームやステークホルダー関係にどのような影響が生じうるかを議論することが求められます。例えば、以下のような影響が考えられます。</p>
      <ol>
        <li><strong>Product Goalの明文化により、ステークホルダーへの説明責任がより明確になる</strong> — バックログの各項目が「なぜ今やるのか」をProduct Goalに紐づけて説明しやすくなる一方、Product Goalが曖昧なままだとステークホルダーからの信頼を損ないやすくなる</li>
        <li><strong>Developersという呼称への統一により、役割の垣根が下がる</strong> — 「テスターだから」「デザイナーだから」といった分業意識が薄れ、ステークホルダーとの対話にも複数の専門性を持つメンバーが参加しやすくなる</li>
        <li><strong>単一のスクラムチームという概念の強調により、サブチーム的な運用が見直される</strong> — 複数チームでプロダクトオーナーシップを行っている場合、チーム間の調整コストの再設計が必要になることがある</li>
      </ol>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>スクラムの定義が更新されるたびに「何が変わったか」だけでなく「この変更によってステークホルダーとの関係がどう変わるか」を必ずセットで考える習慣を持ちましょう。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
          <li><a href="https://scrumguides.org/" target="_blank" rel="noopener">Scrum Guide(2020年11月改訂版)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 07. Core Competencies② ステークホルダーとの協働技術 ===================== -->
    <section id="core-competencies-stakeholders">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 07</div>
      <h2>第6章 Core Competencies② ステークホルダーとの協働技術(LO 1.4〜1.8)</h2>

      <h3>6.1 学習目標</h3>
      <ul>
        <li>1.4 複数スプリントにわたってステークホルダーと関わるための技術を、少なくとも3つ実演する</li>
        <li>1.5 プロダクトオーナーがステークホルダーのファシリテーターとして振る舞うべきでない例を、少なくとも2つ説明する</li>
        <li>1.6 ファシリテーティブ・リスニング(傾聴技術)を、少なくとも3つ実演する</li>
        <li>1.7 オープンディスカッションに対する代替手法を、少なくとも2つ使用する</li>
        <li>1.8 ステークホルダーと最終的な意思決定をファシリテートする方法を、少なくとも3つ説明する<sup>[1]</sup></li>
      </ul>
      <h3>6.2 ステークホルダーと関わる技術(1.4)</h3>
      <p>A-CSPOでは、単発の会議ではなく「複数スプリントにわたる」継続的な関係構築の技術が問われます。</p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>技術</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>ステークホルダーマップの定期更新</td><td>影響力・関心度の変化を毎スプリントで見直し、対話の頻度・深さを調整する</td></tr>
<tr><td>Sprint Reviewの戦略的活用</td><td>単なる進捗報告の場にせず、次に検証したい仮説をステークホルダーと一緒に決める場にする</td></tr>
<tr><td>1on1の定例化</td><td>主要ステークホルダーとの個別対話を定例化し、大人数の場で言いにくい懸念を早期に拾う</td></tr>
          </tbody>
        </table>
      </div>
      <h3>6.3 プロダクトオーナーがファシリテーターであるべきでない場面(1.5)</h3>
      <p>プロダクトオーナー自身が強い利害関係を持つ議題や、意思決定の当事者である議論では、中立的なファシリテーションができません。</p>
      <ol>
        <li><strong>自分の提案の是非そのものが議題になっている場合</strong> — 例えば「このプロダクトビジョンを継続すべきか」という議論で、ビジョンの提案者本人がファシリテーターを兼ねると、議論が誘導的になりやすい</li>
        <li><strong>対立するステークホルダー間の利害調整が主目的の場合</strong> — プロダクトオーナー自身がどちらかの利害と結びついていると中立性が疑われるため、スクラムマスターや第三者にファシリテーションを依頼する方が健全</li>
      </ol>
      <h3>6.4 ファシリテーティブ・リスニングの技術(1.6)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>技術</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>パラフレーズ(言い換え)</td><td>相手の発言を自分の言葉で言い換えて確認し、誤解を防ぐ</td></tr>
<tr><td>オープンクエスチョンの活用</td><td>「はい/いいえ」で終わらない質問で、相手の本音や背景を引き出す</td></tr>
<tr><td>沈黙の活用</td><td>相手が話し終えてもすぐに埋めず、間を置くことで深い発言を促す</td></tr>
          </tbody>
        </table>
      </div>
      <h3>6.5 オープンディスカッションへの代替手法(1.7)</h3>
      <p>大人数での自由討議は、声の大きい人の意見に引っ張られやすいという弱点があります。A-CSPOでは代替手法を使いこなすことが求められます。</p>
      <ul>
        <li><strong>ドット投票(ドットボーティング)</strong>: 各参加者に一定数の投票権を与え、匿名に近い形で優先度を可視化する</li>
        <li><strong>ラウンドロビン方式</strong>: 発言順を固定し、全員に均等な発言機会を与える</li>
        <li><strong>サイレントブレインストーミング</strong>: まず個人で付箋に書き出してから共有することで、同調バイアスを避ける</li>
      </ul>
      <h3>6.6 ステークホルダーとの最終意思決定のファシリテーション(1.8)</h3>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_STAKEHOLDER_DECISION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">ステークホルダーとの最終意思決定ファシリテーションの流れ</div>
      </div>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>意思決定の合意形成技術(フィストトゥファイブなど)を使う前に、必ず「誰が最終決定権を持つか」を事前に明確にしておきましょう。プロダクトオーナーが最終決定権を持つ場合でも、事前にそれを共有しておくことで、後から「聞いていない」という不満を防げます。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 08. Core Competencies③ 開発者との協働と技術的負債 ===================== -->
    <section id="core-competencies-technical-debt">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:report-money" aria-hidden="true" />SECTION 08</div>
      <h2>第7章 Core Competencies③ 開発者との協働と技術的負債(LO 1.9〜1.10)</h2>

      <h3>7.1 学習目標</h3>
      <ul>
        <li>1.9 プロダクトオーナーが技術的負債の蓄積に慎重であるべき理由を説明する</li>
        <li>1.10 スクラムチームが毎スプリント高品質なインクリメントを届け、技術的負債を減らすのに役立つ開発プラクティスを、少なくとも3つ挙げる<sup>[1]</sup></li>
      </ul>
      <h3>7.2 技術的負債とは何か</h3>
      <p>Technical Debt(技術的負債)は、Ward Cunninghamが考案した比喩で、Martin Fowlerは「短期的な利益を得るために、長期的には持続不可能な設計上の近道を意図的に選ぶこと」を負債になぞらえています。コードの複雑さや設計の乱れ(クラフト)が蓄積すると、新機能を追加するために余計にかかる時間が「利息」として発生し続けます。<sup>[2]</sup></p>
      <h3>7.3 プロダクトオーナーが技術的負債に慎重であるべき理由(1.9)</h3>
      <p>プロダクトオーナーは機能(Feature)の価値には敏感でも、技術的負債の存在は見えにくいという構造的な問題があります。</p>
      <ol>
        <li><strong>技術的負債は「見えない借金」である</strong> — バックログ上のユーザーストーリーとして表現されにくく、プロダクトオーナーが認識しないまま蓄積しやすい</li>
        <li><strong>利息(interest)は複利で効いてくる</strong> — 技術的負債を放置するほど、新機能の追加速度そのものが低下し、将来のビジネス価値の実現を阻害する</li>
        <li><strong>短期的な機能追加の圧力と長期的な保守性はトレードオフの関係にある</strong> — プロダクトオーナーが常に新機能ばかりを優先すると、開発チームは負債解消のための時間を確保できなくなる</li>
      </ol>
      <h3>7.4 技術的負債の4象限(Technical Debt Quadrant)</h3>
      <p>Martin Fowlerは技術的負債を「意図的か偶発的か」「思慮深いか無謀か」という2軸で整理する4象限モデルを提示しています。<sup>[3]</sup> A-CSPOレベルのプロダクトオーナーは、この分類を理解し、開発チームとの対話で「どの種類の負債なのか」を見極める必要があります。</p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TECHNICAL_DEBT_QUADRANT" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">技術的負債の4象限(意図的/偶発的 x 思慮深い/無謀)</div>
      </div>
      <h3>7.5 技術的負債を減らす開発プラクティス(1.10)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>プラクティス</th>
<th>技術的負債への効果</th>
</tr></thead>
          <tbody>
<tr><td>継続的インテグレーション(CI)</td><td>統合の遅れによる「統合負債」の蓄積を防ぎ、問題を早期発見する</td></tr>
<tr><td>リファクタリング</td><td>動作を変えずに内部構造を改善し、既存の負債を計画的に返済する</td></tr>
<tr><td>テスト駆動開発(TDD)</td><td>設計の質を保ちながら開発することで、新たな負債の発生を抑制する</td></tr>
<tr><td>Definition of Doneへの品質基準の明記</td><td>「動くが汚いコード」がインクリメントとして許容されない基準を、チーム全体で合意する</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>プロダクトバックログに「リファクタリング」や「技術的負債の解消」専用の項目を作るだけでなく、通常のユーザーストーリーの受け入れ基準(Acceptance Criteria)に品質基準を組み込むことで、負債が新たに発生すること自体を防ぎましょう。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
          <li><a href="https://martinfowler.com/bliki/TechnicalDebt.html" target="_blank" rel="noopener">Martin Fowler「bliki: Technical Debt」</a></li>
          <li><a href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" target="_blank" rel="noopener">Martin Fowler「bliki: Technical Debt Quadrant」</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 09. Core Competencies④ 複数チームでのプロダクトオーナーシップ ===================== -->
    <section id="core-competencies-scaling">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:network" aria-hidden="true" />SECTION 09</div>
      <h2>第8章 Core Competencies④ 複数チームでのプロダクトオーナーシップ(LO 1.11〜1.13)</h2>

      <h3>8.1 学習目標</h3>
      <ul>
        <li>1.11 スクラムをスケーリングするアプローチを、少なくとも2つ認識する</li>
        <li>1.12 依存関係を可視化・管理・削減する技術を、少なくとも2つ特定する</li>
        <li>1.13 フィーチャーチームとコンポーネントチームのメリット・デメリットを、少なくとも3つ説明する<sup>[1]</sup></li>
      </ul>
      <h3>8.2 スクラムのスケーリングアプローチ(1.11)</h3>
      <p>複数のスクラムチームが1つのプロダクトに関わる場合、単一チームのスクラムだけでは対応しきれない調整課題が生まれます。代表的なスケーリングアプローチの一つが、Scrum.orgが提供するNexusです。Nexusは「単一のプロダクトバックログから作業する複数(概ね3〜9)のスクラムチームを束ね、統合されたインクリメントを届けるためのフレームワーク」と定義されています。Nexusはスクラムの基本構造を変えず、最小限の拡張(Nexus統合チームなどの役割やイベント)を加える点が特徴です。<sup>[2]</sup></p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>アプローチ</th>
<th>特徴</th>
</tr></thead>
          <tbody>
<tr><td>Nexus</td><td>スクラムを最小限拡張し、3〜9チーム程度の統合を支援する。単一のプロダクトバックログを維持する</td></tr>
<tr><td>LeSS(Large-Scale Scrum)</td><td>「スクラムをそのまま大規模に適用する」思想で、余分な役割やプロセスを増やさない方向性を重視する</td></tr>
<tr><td>SAFe(Scaled Agile Framework)</td><td>ART(Agile Release Train)などの概念を導入し、企業レベルでの計画・予算配分までを扱う、より広範なフレームワーク</td></tr>
          </tbody>
        </table>
      </div>
      <h3>8.3 依存関係を可視化・管理・削減する技術(1.12)</h3>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_DEPENDENCY_MANAGEMENT_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">依存関係の可視化・管理・削減の3ステップ</div>
      </div>
      <h3>8.4 フィーチャーチームとコンポーネントチーム(1.13)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>観点</th>
<th>フィーチャーチーム</th>
<th>コンポーネントチーム</th>
</tr></thead>
          <tbody>
<tr><td>定義</td><td>エンドツーエンドで顧客価値(機能)を届けられるチーム</td><td>特定の技術コンポーネント・レイヤーを専門に担当するチーム</td></tr>
<tr><td>メリット</td><td>依存関係が少なく、1チームで機能を完結して届けられる</td><td>特定技術領域における深い専門性が育ちやすい</td></tr>
<tr><td>デメリット</td><td>複数の技術領域を横断するスキルが必要になり、育成コストが高い</td><td>1つの機能を届けるために複数チームの調整が必要になり、待ち時間が発生しやすい</td></tr>
<tr><td>プロダクトオーナーへの影響</td><td>バックログの優先順位付けが機能単位でシンプルになる</td><td>バックログがコンポーネント単位に分断され、機能全体の価値を追いにくくなる</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>複数チーム編成を検討する際は、まず「フィーチャーチーム化できないか」を検討し、どうしても専門性の観点でコンポーネントチームが必要な場合のみ採用しましょう。コンポーネントチーム編成を選ぶ場合は、Nexusのような統合の仕組みをあらかじめ用意しておくことが重要です。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
          <li><a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">Scrum.org「The Nexus Guide」(オンライン版)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Advanced Goal Setting and Planning ===================== -->
    <section id="goal-setting-planning">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target" aria-hidden="true" />SECTION 10</div>
      <h2>第9章 Advanced Goal Setting and Planning(LO 2.1〜2.4)</h2>

      <h3>9.1 学習目標</h3>
      <ul>
        <li>2.1 プロダクト戦略が実際にどのように運用され、時間とともに進化していくかについて、実世界の例を議論する</li>
        <li>2.2 目的を特定する、または戦略を定義するための技術を、少なくとも2つ実践する</li>
        <li>2.3 ステークホルダーとともにプロダクトプランまたはフォーキャストを作成する</li>
        <li>2.4 プロダクト戦略・アイデア・機能・前提を可視化・伝達するための技術を、少なくとも1つ実践する<sup>[1]</sup></li>
      </ul>
      <h3>9.2 プロダクトビジョンから日々のバックログへのつながり</h3>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_PRODUCT_STRATEGY_CASCADE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">プロダクトビジョンから日々のバックログへのつながり</div>
      </div>
      <p>プロダクト戦略は一度作って終わりではなく、市場の変化・顧客からの学び・競合の動きに応じて継続的に見直されるべきものです。A-CSPOの学習目標2.1は、この「戦略が実際にどう運用され、進化していくか」を実例で理解することを求めています。</p>
      <h3>9.3 目的の特定・戦略定義の技術(2.2)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>技術</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>インパクトマッピング(Impact Mapping)</td><td>ゴール→アクター→インパクト(行動変容)→デリバラブルの順で、戦略的な計画を可視化する手法。Gojko Adzicが提唱した</td></tr>
<tr><td>Vision Board / エレベーターピッチ形式</td><td>「誰のために」「何を」「なぜ」を短い定型文で言語化し、チーム全体の目線を揃える</td></tr>
          </tbody>
        </table>
      </div>
      <p>インパクトマッピングは「機能のショッピングリスト」に陥りがちな計画を、「ビジネスゴールを達成するために、対象者にどんな行動変容(インパクト)を起こす必要があるか」という問いに立ち返らせる手法です。<sup>[2]</sup></p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_IMPACT_MAPPING_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">インパクトマッピングのWhy-Who-How-What構造</div>
      </div>
      <h3>9.4 プロダクトプラン・フォーキャストの作成(2.3)</h3>
      <p>プロダクトプランやフォーキャストは、「いつまでに、どの範囲を、どの確度で届けられるか」をステークホルダーと共有するための道具です。A-CSPOでは、これを一人で作るのではなく、ステークホルダーと共同で作成する(create with stakeholders)ことが強調されています。<sup>[1]</sup></p>
      <ul>
        <li>スループット(過去の完了実績)を用いた確率的フォーキャスト</li>
        <li>Now/Next/Later形式のロードマップによる、確度の異なる時間軸の明示</li>
        <li>前提条件(Assumption)を明記し、状況が変わった場合にプランを見直す条件を事前に合意しておく</li>
      </ul>
      <h3>9.5 戦略・アイデア・機能・前提の可視化と伝達(2.4)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>技術</th>
<th>向いている用途</th>
</tr></thead>
          <tbody>
<tr><td>ストーリーマッピング(User Story Mapping)</td><td>ユーザーの行動の流れに沿って機能を並べ、MVPのスライス(切り出し)を判断する。Jeff Pattonが体系化した</td></tr>
<tr><td>Now/Next/Laterロードマップ</td><td>確度の異なる時間軸を区別しながら、優先順位の大枠をステークホルダーに伝える</td></tr>
<tr><td>インパクトマップ</td><td>戦略とデリバラブルのつながりを1枚で可視化する</td></tr>
          </tbody>
        </table>
      </div>
      <p>ストーリーマッピングは、ユーザーの一連の行動(バックボーン)を横軸に、優先度を縦軸に配置することで、「機能の羅列」ではなく「ユーザー体験の全体像」からリリース範囲を判断できるようにする手法です。<sup>[3]</sup></p>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>プロダクト戦略を1枚のスライドで説明できるようにしておきましょう。説明できない場合、それはまだ戦略ではなく「やりたいことのリスト」である可能性が高いです。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
          <li><a href="https://www.impactmapping.org/" target="_blank" rel="noopener">Impact Mapping 公式サイト</a></li>
          <li><a href="https://jpattonassociates.com/story-mapping-quick-ref/" target="_blank" rel="noopener">Jeff Patton「Story Mapping Quick Reference」</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 11. Empathizing with Customers and Users ===================== -->
    <section id="empathizing-customers">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:heart-handshake" aria-hidden="true" />SECTION 11</div>
      <h2>第10章 Empathizing with Customers and Users(LO 3.1〜3.2)</h2>

      <h3>10.1 学習目標</h3>
      <ul>
        <li>3.1 開発者を顧客・ユーザーに直接つなげる技術を1つ使用する</li>
        <li>3.2 プロダクトディスカバリーの技術を、少なくとも2つ実践する<sup>[1]</sup></li>
      </ul>
      <h3>10.2 開発者を顧客・ユーザーに直接つなげる(3.1)</h3>
      <p>多くの組織では、顧客の声はプロダクトオーナーというフィルターを通じてしか開発者に届きません。しかし、開発者が顧客の反応を直接目にすることで、実装上の細かな判断の質が向上します。</p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>技術</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>Sprint Reviewへの顧客招待</td><td>実際のユーザーやステークホルダーをSprint Reviewに招き、開発者が直接フィードバックを受け取る場を作る</td></tr>
<tr><td>ユーザビリティテストへの開発者同席</td><td>開発者がユーザーテストを録画で見る、または同席することで、仕様書越しでは伝わらない使いにくさに気づく</td></tr>
<tr><td>サポート対応のシャドーイング</td><td>開発者がカスタマーサポートに一定期間同席し、実際の問い合わせ内容に触れる</td></tr>
          </tbody>
        </table>
      </div>
      <h3>10.3 プロダクトディスカバリーの技術(3.2)</h3>
      <p>プロダクトディスカバリーとは、「何を作るべきか」をまだ作る前に検証する活動全般を指します。</p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_PRODUCT_DISCOVERY_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">プロダクトディスカバリーの技術の全体像</div>
      </div>
      <ul>
        <li><strong>顧客インタビュー</strong>: オープンクエスチョンを中心に、顧客の「困りごと」を深掘りする。仕様の是非を聞くのではなく、課題そのものを理解することを優先する</li>
        <li><strong>行動観察(オブザベーション)</strong>: 顧客が実際にどのようにプロダクト(または競合プロダクト)を使っているかを観察し、本人も言語化できていない不満やクセを発見する</li>
        <li><strong>プロトタイプ・モックアップによる検証</strong>: 作り込む前に、低コストな試作物でユーザーの反応を確かめる</li>
      </ul>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>顧客インタビューでは「この機能は欲しいですか?」と聞かないようにしましょう。多くの人は礼儀正しく「欲しい」と答えてしまいます。代わりに「直近でこの課題に困った具体的な場面を教えてください」と過去の行動を尋ねる方が、実態に近い情報が得られます。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 12. Advanced Product Assumption Validation ===================== -->
    <section id="assumption-validation">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flask" aria-hidden="true" />SECTION 12</div>
      <h2>第11章 Advanced Product Assumption Validation(LO 4.1〜4.5)</h2>

      <h3>11.1 学習目標</h3>
      <ul>
        <li>4.1 プロダクトオーナーがビジネス価値を効果的に届ける能力に影響しうる認知バイアスを、少なくとも2つ挙げる</li>
        <li>4.2 スプリント中に完了したSprint GoalとIncrementに基づいて、Sprint Reviewが検査と適応にどれだけ効果的に使われたかを査定する</li>
        <li>4.3 前提を検証する仕組みをスクラムフレームワークに組み込むアプローチを、少なくとも1つ実験する</li>
        <li>4.4 ターゲット顧客に関する仮説を、少なくとも2つ開発する</li>
        <li>4.5 少なくとも1つの仮説を検証するための計画を作成する<sup>[1]</sup></li>
      </ul>
      <h3>11.2 プロダクトオーナーに影響しうる認知バイアス(4.1)</h3>
      <p>認知バイアスは、人間の思考に組み込まれた系統的な判断の偏りです。プロダクトオーナーの意思決定に特に影響しやすいバイアスには、以下のようなものがあります。<sup>[2]</sup></p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>バイアス</th>
<th>内容</th>
<th>プロダクトオーナーへの影響例</th>
</tr></thead>
          <tbody>
<tr><td>確証バイアス(Confirmation Bias)</td><td>自分の既存の信念を裏づける情報ばかりを探し、注目する傾向</td><td>過去にうまくいったベンダーやアプローチを、今回も無条件に選んでしまう</td></tr>
<tr><td>サンクコスト効果(Sunk Cost Fallacy / Irrational Escalation)</td><td>すでに投じた労力・コストを理由に、合理的でない継続投資をしてしまう傾向</td><td>すでに市場性を失った機能への投資を、開発コストがかかったことを理由に止められない</td></tr>
<tr><td>バンドワゴン効果(Bandwagon Effect)</td><td>競合や他社の動向に流され、自社の文脈を検証せずに追随してしまう傾向</td><td>競合が導入した技術を、自社の顧客に本当に価値があるか検証せずに真似してしまう</td></tr>
<tr><td>ネガティビティバイアス(Negativity Bias)</td><td>ポジティブな情報よりネガティブな情報を強く記憶・重視する傾向</td><td>一部の否定的なフィードバックに引きずられ、多数の肯定的な反応を過小評価してしまう</td></tr>
          </tbody>
        </table>
      </div>
      <h3>11.3 Sprint Reviewの効果性を査定する(4.2)</h3>
      <p>Sprint Reviewは単なるデモの場ではなく、「Sprint Goalに対してIncrementがどう寄与したか」を検査し、次の方向性を適応させるための場です。A-CSPOでは、この検査と適応のプロセスがどれだけ効果的に機能しているかを、批判的に査定する能力が求められます。</p>
      <p>査定の視点の例:</p>
      <ol>
        <li>Sprint Reviewで実際に意思決定(プロダクトバックログの変更など)が行われたか、それとも一方的な報告で終わったか</li>
        <li>参加したステークホルダーが、次のSprintで何を検証したいかについて発言する機会があったか</li>
        <li>Sprint Goalに対する進捗が、具体的なデータや顧客の反応をもとに検査されたか、それとも「完了/未完了」の報告に留まったか</li>
      </ol>
      <h3>11.4 前提検証をスクラムフレームワークに組み込む(4.3)</h3>
      <p>前提検証を体系的に行うためのアプローチとして広く参照されるのが、Eric Riesが提唱したLean Startupの「Build-Measure-Learn」ループです。これは「最小限の労力で構築し(Build)、市場の反応を測定し(Measure)、そこから学ぶ(Learn)」というサイクルを繰り返すことで、不確実性の高い状況でも合理的に前進する仕組みです。<sup>[3]</sup></p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BUILD_MEASURE_LEARN_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">Build-Measure-Learnの仮説検証ループ</div>
      </div>
      <p>このループをスプリントの中に組み込む際は、Sprint Reviewを「実験結果を確認し、次の実験を決める場」として明確に再定義することが実務上の鍵になります。</p>
      <h3>11.5 ターゲット顧客に関する仮説の開発(4.4)</h3>
      <p>良い仮説は「検証可能」で「反証可能」である必要があります。曖昧な仮説の例と、改善した仮説の例を比較します。</p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>曖昧な仮説(検証しにくい)</th>
<th>改善された仮説(検証しやすい)</th>
</tr></thead>
          <tbody>
<tr><td>このユーザーはこの機能を気に入るはずだ</td><td>[特定の顧客セグメント]は、[特定の課題]を抱えており、[特定の解決策]を提供すれば、[観測可能な行動]が起きるはずだ</td></tr>
<tr><td>もっと機能を増やせば満足度が上がる</td><td>既存機能Xの完了率が低いのは[特定の原因]によるものであり、それを解消すれば完了率が[具体的な数値]まで改善するはずだ</td></tr>
          </tbody>
        </table>
      </div>
      <h3>11.6 仮説を検証する計画の作成(4.5)</h3>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_HYPOTHESIS_VALIDATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">仮説を検証する計画作成の5ステップ</div>
      </div>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>実験を始める前に「この結果が出たらPersevere(継続)、この結果が出たらPivot(転換)」という判定基準を必ず書面で決めておきましょう。結果が出てから基準を決めると、都合の良い解釈(確証バイアス)に陥りやすくなります。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
          <li><a href="https://appliedframeworks.com/blog/fourteen-cognitive-biases-common-to-product-owners" target="_blank" rel="noopener">Applied Frameworks「Fourteen Cognitive Biases Common to Product Owners」</a></li>
          <li><a href="https://theleanstartup.com/principles" target="_blank" rel="noopener">The Lean Startup「Principles」(Eric Ries)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 13. Product Backlog Management ===================== -->
    <section id="backlog-management">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 13</div>
      <h2>第12章 Product Backlog Management(LO 5.1〜5.5)</h2>

      <h3>12.1 学習目標</h3>
      <ul>
        <li>5.1 価値をモデル化する技術を少なくとも2つ、価値を測定する技術を少なくとも2つ使用する</li>
        <li>5.2 プロダクトゴールを支えるようにプロダクトバックログを順序付けする技術を、少なくとも3つ適用する</li>
        <li>5.3 次のスプリントに向けて十分な数のプロダクトバックログ項目が「レディ」であることを、プロダクトオーナーがどう確保できるかを説明する</li>
        <li>5.4 少なくとも3つの情報源からフィードバックを統合し、プロダクトバックログ項目を生成・洗練する</li>
        <li>5.5 プロダクトバックログのリファインメントを改善する方法を、少なくとも2つ実験する<sup>[1]</sup></li>
      </ul>
      <h3>12.2 価値のモデル化・測定技術(5.1)</h3>
      <p>「価値」は主観的で測定しにくい概念ですが、A-CSPOでは、これを構造的にモデル化・測定する技術が求められます。</p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>技術</th>
<th>種別</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>Kanoモデル</td><td>モデル化</td><td>機能を「当たり前品質」「一元的品質(性能)」「魅力的品質(デライター)」などに分類し、顧客満足度への影響の質的な違いを可視化する。Noriaki Kanoが1984年に提唱した</td></tr>
<tr><td>インパクトマッピング</td><td>モデル化</td><td>ビジネスゴールから逆算して、機能ではなく「行動変容」で価値を捉える</td></tr>
<tr><td>Cost of Delay(遅延コスト)</td><td>測定</td><td>ある機能の提供が遅れることで失われる価値を定量化する考え方。Don Reinertsenが体系化した</td></tr>
<tr><td>WSJF(Weighted Shortest Job First)</td><td>測定</td><td>Cost of DelayをJob Duration(所要期間)で割ることで、経済合理性に基づいた優先順位を算出する手法。SAFeで採用されている</td></tr>
          </tbody>
        </table>
      </div>
      <p>Kanoモデルは、機能を顧客満足度への影響のパターンで分類します。<sup>[2]</sup></p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>Kanoモデルの分類</th>
<th>特徴</th>
</tr></thead>
          <tbody>
<tr><td>当たり前品質(Must-be)</td><td>欠けていると強い不満につながるが、あっても満足度は上がらない</td></tr>
<tr><td>一元的品質(Performance)</td><td>充実度に比例して満足度が上がる(高性能であるほど満足)</td></tr>
<tr><td>魅力的品質(Attractive/Delighter)</td><td>なくても不満はないが、あると満足度が大きく上がる</td></tr>
<tr><td>無関心品質(Indifferent)</td><td>あってもなくても満足度に影響しない</td></tr>
<tr><td>逆品質(Reverse)</td><td>充実させるほどかえって満足度が下がる</td></tr>
          </tbody>
        </table>
      </div>
      <p>WSJFは、Cost of Delayを「ビジネス価値」「時間的な緊急度」「リスク低減・機会創出」の3要素の合計として算出し、それをJob Sizeで割ることで、経済的な効果が最大になる順序を導き出します。<sup>[3]</sup></p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_WSJF_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">WSJF算出とCost of Delayの構成要素</div>
      </div>
      <h3>12.3 プロダクトゴールを支える順序付け技術(5.2)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>技術</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>WSJF</td><td>経済合理性に基づく定量的な優先順位付け</td></tr>
<tr><td>Kanoモデル</td><td>顧客満足度の質的な違いに基づく優先順位付け</td></tr>
<tr><td>MoSCoW(Must/Should/Could/Won't)</td><td>ステークホルダー間の期待値を大まかに揃えるための簡易分類</td></tr>
          </tbody>
        </table>
      </div>
      <p>いずれの技術も、単独の「正解」ではなく、プロダクトゴールという文脈の中で使い分けることが重要です。</p>
      <h3>12.4 「レディ」なバックログ項目を確保する方法(5.3)</h3>
      <p>Scrum Guideには「Definition of Ready」という公式な作成物はありませんが、実務上多くのチームが独自の「準備完了の基準」を定めています。A-CSPOでは、プロダクトオーナーがこれをどう確保するかが問われます。</p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_BACKLOG_READY_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">レディなバックログ項目を確保するリファインメントの流れ</div>
      </div>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>「レディ」の基準はチームによって異なって構いませんが、必ず文書化し、定期的(四半期に一度など)に見直しましょう。基準が曖昧なまま運用されると、チームによって「レディ」の解釈がずれ、スプリント中の手戻りが発生しやすくなります。</p>
      </div>
      <h3>12.5 複数の情報源からのフィードバック統合(5.4)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>情報源</th>
<th>統合の仕方</th>
</tr></thead>
          <tbody>
<tr><td>Sprint Reviewでのステークホルダーの反応</td><td>次のリファインメントで優先順位を見直す材料にする</td></tr>
<tr><td>カスタマーサポート・問い合わせログ</td><td>頻出する課題をパターン化し、バックログ項目の根拠として明記する</td></tr>
<tr><td>プロダクト利用データ(アナリティクス)</td><td>実際の利用状況と仮説のギャップを定量的に確認する</td></tr>
<tr><td>セールス・カスタマーサクセスチームからの声</td><td>契約・解約に直結する要望を優先順位付けの文脈情報として活用する</td></tr>
          </tbody>
        </table>
      </div>
      <h3>12.6 バックログリファインメントの改善(5.5)</h3>
      <p>肥大化した巨大なバックログは、それ自体がアンチパターンです。Scrum Allianceの実務者向け記事は、大きくなりすぎたバックログへの対処法として「分割(Split)」「制限(Limit)」「削除(Eliminate)」「統合(Consolidate)」の4ステップを提案しています。<sup>[4]</sup></p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>ステップ</th>
<th>内容</th>
</tr></thead>
          <tbody>
<tr><td>分割(Split)</td><td>対象とするユーザー層や課題の種類が大きく異なる場合、バックログ自体を複数に分ける</td></tr>
<tr><td>制限(Limit)</td><td>「プロダクトゴールに沿うものだけ」「件数の上限」「一定期間更新のない項目の除外」などの基準を設ける</td></tr>
<tr><td>削除(Eliminate)</td><td>長期間放置され陳腐化した「ゾンビ項目」を削除する</td></tr>
<tr><td>統合(Consolidate)</td><td>類似・重複した項目を1つにまとめ、ノイズを減らす</td></tr>
          </tbody>
        </table>
      </div>
      <p>さらに、テーマ・エピック・ユーザーストーリー・サブタスクという階層構造を意識し、階層が上位になるほど詳細度を下げ、着手が遠い項目ほど詳細に書き込みすぎないことも、リファインメントを持続可能にするための重要な原則です。<sup>[4]</sup></p>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>バックログのリファインメントの改善は「一度きりの大掃除」ではなく、継続的な習慣にしましょう。四半期ごとに「ゾンビ項目探し」の時間を設けるだけでも、バックログの健全性は大きく改善します。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「A-CSPO Learning Objectives」(2022年1月)</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Kano_model" target="_blank" rel="noopener">Kano model — Wikipedia</a></li>
          <li><a href="https://framework.scaledagile.com/wsjf" target="_blank" rel="noopener">Scaled Agile Framework「Weighted Shortest Job First (WSJF)」</a></li>
          <li><a href="https://resources.scrumalliance.org/Article/manage-large-product-backlog" target="_blank" rel="noopener">Scrum Alliance「How to Manage a Large Product Backlog」(Miloš Belčević)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 14. ベストプラクティス総まとめチェックリスト ===================== -->
    <section id="best-practices-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checklist" aria-hidden="true" />SECTION 14</div>
      <h2>第13章 ベストプラクティス総まとめチェックリスト</h2>

      <p>以下は、これまでの章で紹介したベストプラクティスを、5つのA-CSPO学習目標カテゴリー別に整理したチェックリストです。</p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_ACSPO_CATEGORY_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">A-CSPO 5つの学習目標カテゴリーの全体マップ</div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>カテゴリー</th>
<th>チェック項目</th>
</tr></thead>
          <tbody>
<tr><td>Core Competencies</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-0'] }]" for="chk-0">
          <input
            id="chk-0"
            type="checkbox"
            data-checklist-key="acspoBP-0"
            :checked="checklistState['acspoBP-0']"
            @change="toggleChecklist('acspoBP-0', $event)"
          ><span class="checklist-text">自分のマインドセットが仮説思考・サーバントリーダーシップになっているか定期的に振り返っている</span></label></td></tr>
<tr><td>Core Competencies</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-1'] }]" for="chk-1">
          <input
            id="chk-1"
            type="checkbox"
            data-checklist-key="acspoBP-1"
            :checked="checklistState['acspoBP-1']"
            @change="toggleChecklist('acspoBP-1', $event)"
          ><span class="checklist-text">ステークホルダーとの対話にファシリテーティブ・リスニングと合意形成技術を意図的に使い分けている</span></label></td></tr>
<tr><td>Core Competencies</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-2'] }]" for="chk-2">
          <input
            id="chk-2"
            type="checkbox"
            data-checklist-key="acspoBP-2"
            :checked="checklistState['acspoBP-2']"
            @change="toggleChecklist('acspoBP-2', $event)"
          ><span class="checklist-text">技術的負債の状態を開発チームと定期的に対話し、負債解消をバックログの中に組み込んでいる</span></label></td></tr>
<tr><td>Core Competencies</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-3'] }]" for="chk-3">
          <input
            id="chk-3"
            type="checkbox"
            data-checklist-key="acspoBP-3"
            :checked="checklistState['acspoBP-3']"
            @change="toggleChecklist('acspoBP-3', $event)"
          ><span class="checklist-text">複数チーム編成が必要な場合、フィーチャーチーム化を優先的に検討し、依存関係を可視化している</span></label></td></tr>
<tr><td>Goal Setting and Planning</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-4'] }]" for="chk-4">
          <input
            id="chk-4"
            type="checkbox"
            data-checklist-key="acspoBP-4"
            :checked="checklistState['acspoBP-4']"
            @change="toggleChecklist('acspoBP-4', $event)"
          ><span class="checklist-text">プロダクト戦略を1枚で説明できる状態を維持している</span></label></td></tr>
<tr><td>Goal Setting and Planning</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-5'] }]" for="chk-5">
          <input
            id="chk-5"
            type="checkbox"
            data-checklist-key="acspoBP-5"
            :checked="checklistState['acspoBP-5']"
            @change="toggleChecklist('acspoBP-5', $event)"
          ><span class="checklist-text">ロードマップやプランをステークホルダーと共同で作成し、前提条件を明記している</span></label></td></tr>
<tr><td>Empathizing with Customers</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-6'] }]" for="chk-6">
          <input
            id="chk-6"
            type="checkbox"
            data-checklist-key="acspoBP-6"
            :checked="checklistState['acspoBP-6']"
            @change="toggleChecklist('acspoBP-6', $event)"
          ><span class="checklist-text">開発者が顧客と直接接点を持つ機会を定期的に作っている</span></label></td></tr>
<tr><td>Empathizing with Customers</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-7'] }]" for="chk-7">
          <input
            id="chk-7"
            type="checkbox"
            data-checklist-key="acspoBP-7"
            :checked="checklistState['acspoBP-7']"
            @change="toggleChecklist('acspoBP-7', $event)"
          ><span class="checklist-text">顧客インタビューでは過去の具体的な行動を尋ね、機能の是非を直接聞かないようにしている</span></label></td></tr>
<tr><td>Assumption Validation</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-8'] }]" for="chk-8">
          <input
            id="chk-8"
            type="checkbox"
            data-checklist-key="acspoBP-8"
            :checked="checklistState['acspoBP-8']"
            @change="toggleChecklist('acspoBP-8', $event)"
          ><span class="checklist-text">自分の意思決定が確証バイアスやサンクコスト効果に影響されていないか、定期的に自問している</span></label></td></tr>
<tr><td>Assumption Validation</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-9'] }]" for="chk-9">
          <input
            id="chk-9"
            type="checkbox"
            data-checklist-key="acspoBP-9"
            :checked="checklistState['acspoBP-9']"
            @change="toggleChecklist('acspoBP-9', $event)"
          ><span class="checklist-text">実験を始める前にPersevere/Pivotの判定基準を書面で決めている</span></label></td></tr>
<tr><td>Backlog Management</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-10'] }]" for="chk-10">
          <input
            id="chk-10"
            type="checkbox"
            data-checklist-key="acspoBP-10"
            :checked="checklistState['acspoBP-10']"
            @change="toggleChecklist('acspoBP-10', $event)"
          ><span class="checklist-text">価値のモデル化(Kanoなど)と測定(WSJFなど)を使い分けて優先順位付けをしている</span></label></td></tr>
<tr><td>Backlog Management</td><td><label :class="['checklist-label', { 'is-checked': checklistState['acspoBP-11'] }]" for="chk-11">
          <input
            id="chk-11"
            type="checkbox"
            data-checklist-key="acspoBP-11"
            :checked="checklistState['acspoBP-11']"
            @change="toggleChecklist('acspoBP-11', $event)"
          ><span class="checklist-text">バックログが肥大化する前に、分割・制限・削除・統合のいずれかの手段を定期的に実行している</span></label></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 15. よくある誤解・アンチパターン ===================== -->
    <section id="misconceptions-antipatterns">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 15</div>
      <h2>第14章 よくある誤解・アンチパターン</h2>

      <p>A-CSPOレベルのプロダクトオーナーが陥りやすい誤解・アンチパターンを整理します。</p>
      <div class="table-wrap">
        <table>
          <thead><tr>
<th>誤解・アンチパターン</th>
<th>何が問題か</th>
<th>望ましい姿勢</th>
</tr></thead>
          <tbody>
<tr><td>プロダクトオーナーは「要求を受け取ってチケットを起票する係」である</td><td>単なる要求の取り次ぎ役では、価値の最大化というアカウンタビリティを果たせない</td><td>すべての要求に対して「これはプロダクトゴールに貢献するか」を問い、時にはNoと言う</td></tr>
<tr><td>バックログはすべての要望を書き留めておく倉庫である</td><td>バックログが肥大化し、優先順位付け自体が機能しなくなる(大きすぎるバックログはアンチパターンである)</td><td>定期的に分割・制限・削除・統合を行い、健全な規模を維持する</td></tr>
<tr><td>ステークホルダーの意見が一番大きい人(声の大きい人・役職の高い人)の意見を優先する(ハイポの意思決定=HiPPO)</td><td>データや顧客の声よりも、社内政治的な力学で優先順位が決まってしまう</td><td>WSJFやKanoモデルなど、経済合理性・顧客価値に基づいた基準を先に合意しておく</td></tr>
<tr><td>技術的負債は開発チームだけの問題である</td><td>プロダクトオーナーが負債解消の時間を確保しなければ、負債は減らない</td><td>技術的負債の状態を継続的に可視化し、バックログの優先順位に反映する</td></tr>
<tr><td>Sprint Reviewはデモをして終わりの儀式である</td><td>検査と適応が行われず、次のプランニングに学びが反映されない</td><td>Sprint Reviewを「次に何を検証するか」を決める意思決定の場として運用する</td></tr>
<tr><td>前提の検証は一度やれば十分である</td><td>市場や顧客の状況は変化し続けるため、一度の検証で永久に正しいとは限らない</td><td>Build-Measure-Learnのループを継続的な習慣として組み込む</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 16. 認定後のキャリアパス ===================== -->
    <section id="career-path">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:trending-up" aria-hidden="true" />SECTION 16</div>
      <h2>第15章 認定後のキャリアパス</h2>

      <h3>15.1 A-CSPOの次に位置する資格</h3>
      <p>A-CSPOは、Certified Scrum Professional® - Product Owner(CSP®-PO)の前提資格です。公式ページでは、CSP-POが「新しいスクラムチームを立ち上げ、組織のアジャイル導入において重要な役割を果たすためのスキルセット」を身につける資格であると説明されています。<sup>[1]</sup></p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_CSP_PO_CAREER_PATH" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">CSPOからCSP-POへのキャリアパス</div>
      </div>
      <h3>15.2 資格の維持とScrum Education Units(SEU)</h3>
      <p>Scrum Allianceの認定は「一度取ったら終わり」の資格ではありません。公式サイトでは、資格保持者が書籍を読む・ウェビナーを視聴する・イベントに参加するなどの学習活動を通じてSEUを獲得し、2年ごとの更新でその継続的な成長を証明する仕組みになっていると説明されています。<sup>[2]</sup></p>
      <div class="diagram-card mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_SEU_RENEWAL_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
        <div class="diagram-caption">Scrum Education Unitsによる資格更新サイクル</div>
      </div>
      <h3>15.3 なぜ「学び続ける資格」なのか</h3>
      <p>Scrum自体が経験主義(検査と適応)に基づくフレームワークであることを踏まえると、資格制度自体が「一度学んで終わり」ではなく「継続的に学び、実践し、更新する」設計になっているのは自然なことです。A-CSPOを取得した後も、市場や組織の状況変化に応じて、プロダクトオーナーとしての手法をアップデートし続ける姿勢が求められます。</p>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>資格更新のためだけにSEUを集めるのではなく、日々の実務で読んだ記事や参加した勉強会を記録する習慣をつけておくと、更新時期にまとめて苦労することがなくなります。</p>
      </div>
      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner" target="_blank" rel="noopener">Scrum Alliance「Certified Scrum Professional® - Product Owner (CSP®-PO)」公式ページ</a></li>
          <li><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">Scrum Alliance「Scrum Education Units」公式ページ</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 17. まとめ ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 17</div>
      <h2>まとめ</h2>

      <p>A-CSPOは、CSPOで学んだ基礎知識を土台に、「複雑な現場で実際にプロダクトオーナーシップを発揮する」ための応用力を鍛える資格です。本ガイドで扱った5つの学習目標カテゴリーは、それぞれ以下のように要約できます。</p>
      <ol>
        <li><strong>Product Owner Core Competencies</strong>: 自分自身のマインドセット、ステークホルダーとの協働、開発チームとの信頼関係、複数チームでのスケーリングという、プロダクトオーナーとしての土台を強化する</li>
        <li><strong>Advanced Goal Setting and Planning</strong>: プロダクト戦略を実際に運用可能な形に落とし込み、ステークホルダーと共同で計画を作る力を養う</li>
        <li><strong>Empathizing with Customers and Users</strong>: 開発チーム全体が顧客に近づき、プロダクトディスカバリーの技術で「作る前に確かめる」姿勢を身につける</li>
        <li><strong>Advanced Product Assumption Validation</strong>: 自分自身の認知バイアスに自覚的になり、Build-Measure-Learnのループで前提を継続的に検証する</li>
        <li><strong>Product Backlog Management</strong>: 価値のモデル化・測定・順序付けの技術を使い分け、バックログを持続可能な規模と質で保つ</li>
      </ol>
      <p>A-CSPOは、コースを受講して終わりではなく、これらの技術を実際の現場で試し、失敗し、調整し続けることで初めて身につくものです。認定取得後も、SEUを通じた継続学習と、日々の実務での実験を通じて、プロダクトオーナーとしての力を磨き続けていきましょう。</p>
    </section>

    <!-- ===================== 18. 参考資料・出典一覧 ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 18</div>
      <h2>参考資料・出典一覧</h2>

      <div class="table-wrap">
        <table>
          <thead><tr>
<th>#</th>
<th>タイトル</th>
<th>発行元・著者</th>
<th>URL</th>
</tr></thead>
          <tbody>
<tr><td>1</td><td>Advanced Certified Scrum Product Owner (A-CSPO®) 公式ページ</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner</a></td></tr>
<tr><td>2</td><td>A-CSPO Learning Objectives(2022年1月)</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf</a></td></tr>
<tr><td>3</td><td>Scrum Foundations® Learning Objectives(2022年1月、2024年2月フォーマット更新)</td><td>Scrum Alliance</td><td><a href="https://assets.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://assets.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf</a></td></tr>
<tr><td>4</td><td>Scrum Guide(2020年11月改訂版)</td><td>Ken Schwaber & Jeff Sutherland</td><td><a href="https://scrumguides.org/" target="_blank" rel="noopener">https://scrumguides.org/</a></td></tr>
<tr><td>5</td><td>Manifesto for Agile Software Development</td><td>Agile Manifesto</td><td><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></td></tr>
<tr><td>6</td><td>Scrum Values</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></td></tr>
<tr><td>7</td><td>Product Owner Track 概要ページ</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/get-certified/product-owner-track" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track</a></td></tr>
<tr><td>8</td><td>Certified Scrum Product Owner® (CSPO®) 公式ページ</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner</a></td></tr>
<tr><td>9</td><td>Certified Scrum Professional® - Product Owner (CSP®-PO) 公式ページ</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner</a></td></tr>
<tr><td>10</td><td>Scrum Education Units 公式ページ</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></td></tr>
<tr><td>11</td><td>Certification Renewal 公式ページ</td><td>Scrum Alliance</td><td><a href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/renewing-certifications</a></td></tr>
<tr><td>12</td><td>bliki: Technical Debt</td><td>Martin Fowler</td><td><a href="https://martinfowler.com/bliki/TechnicalDebt.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TechnicalDebt.html</a></td></tr>
<tr><td>13</td><td>bliki: Technical Debt Quadrant</td><td>Martin Fowler</td><td><a href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TechnicalDebtQuadrant.html</a></td></tr>
<tr><td>14</td><td>The Nexus™ Guide(オンライン版)</td><td>Scrum.org</td><td><a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/online-nexus-guide</a></td></tr>
<tr><td>15</td><td>Weighted Shortest Job First (WSJF)</td><td>Scaled Agile Framework</td><td><a href="https://framework.scaledagile.com/wsjf" target="_blank" rel="noopener">https://framework.scaledagile.com/wsjf</a></td></tr>
<tr><td>16</td><td>Kano model</td><td>Wikipedia</td><td><a href="https://en.wikipedia.org/wiki/Kano_model" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Kano_model</a></td></tr>
<tr><td>17</td><td>Impact Mapping 公式サイト</td><td>Gojko Adzic ほか</td><td><a href="https://www.impactmapping.org/" target="_blank" rel="noopener">https://www.impactmapping.org/</a></td></tr>
<tr><td>18</td><td>Story Mapping Quick Reference</td><td>Jeff Patton</td><td><a href="https://jpattonassociates.com/story-mapping-quick-ref/" target="_blank" rel="noopener">https://jpattonassociates.com/story-mapping-quick-ref/</a></td></tr>
<tr><td>19</td><td>The Lean Startup — Principles</td><td>Eric Ries</td><td><a href="https://theleanstartup.com/principles" target="_blank" rel="noopener">https://theleanstartup.com/principles</a></td></tr>
<tr><td>20</td><td>Fourteen Cognitive Biases Common to Product Owners</td><td>Applied Frameworks</td><td><a href="https://appliedframeworks.com/blog/fourteen-cognitive-biases-common-to-product-owners" target="_blank" rel="noopener">https://appliedframeworks.com/blog/fourteen-cognitive-biases-common-to-product-owners</a></td></tr>
<tr><td>21</td><td>How to Manage a Large Product Backlog</td><td>Scrum Alliance(Miloš Belčević)</td><td><a href="https://resources.scrumalliance.org/Article/manage-large-product-backlog" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/manage-large-product-backlog</a></td></tr>
          </tbody>
        </table>
      </div>
    </section>


    <footer>
      Advanced Certified Scrum Product Owner、A-CSPO、Scrum Alliance は Scrum Alliance, Inc. の登録商標です。本ガイドはその教育目的の非公式な二次資料であり、Scrum Alliance による公認・監修を受けたものではありません。
    </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>

.acspo-guide {
  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  line-height: 1.75;
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 25;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 16px 0;
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

.sidebar {
  top: var(--global-nav-height, 0px);
  height: calc(100vh - var(--global-nav-height, 0px));
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

.diagram-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 24px;
  margin: 24px 0;
}

.diagram-caption {
  text-align: center;
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 12px;
}

.diagram-loading {
  text-align: center;
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 32px 0;
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
    html { scroll-behavior: auto; }
    .sidebar { transition: none; }
  }

  /* ===================== Checklist checkboxes ===================== */
  .checklist-label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    line-height: 1.6;
  }

  .checklist-label input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-top: 3px;
    border: 2px solid var(--color-border-strong);
    border-radius: 4px;
    background: var(--color-paper-raised);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    position: relative;
  }

  .checklist-label input[type="checkbox"]:checked {
    background: var(--color-indigo);
    border-color: var(--color-indigo);
  }

  .checklist-label input[type="checkbox"]:checked::after {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: 5px;
    width: 5px;
    height: 9px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }

  .checklist-label input[type="checkbox"]:focus-visible {
    outline: 2px solid var(--color-indigo);
    outline-offset: 2px;
  }

  .checklist-label.is-checked .checklist-text {
    color: var(--color-ink-faint);
    text-decoration: line-through;
    text-decoration-color: var(--color-indigo);
  }

</style>
