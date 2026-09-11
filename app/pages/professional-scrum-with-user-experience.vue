<script setup lang="ts">
import { useSeoMeta } from "#imports";
const DIAGRAM_EXAM_OVERVIEW_MAP = `flowchart TB
ROOT["Professional Scrum with User Experience (PSU I)"]
subgraph A["Understanding and Applying the Scrum Framework"]
A1["Empiricism"]
A2["Scrum Values"]
A3["Scrum Team"]
A4["Events"]
A5["Artifacts"]
A6["Done"]
end
subgraph B["Developing People and Teams"]
B1["Self-Managing Cross-Functional Teams including UX"]
end
subgraph C["Managing Products with Agility"]
C1["Product Value"]
C2["Product Backlog Management"]
C3["Stakeholders and Customers"]
C4["Work Management with UX"]
end
subgraph D["Complementary Practices"]
D1["Lean UX Practices and Techniques"]
end
ROOT --> A
ROOT --> B
ROOT --> C
ROOT --> D
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class ROOT hub;`;

const DIAGRAM_EMPIRICISM_PILLARS = `flowchart LR
T["透明性 Transparency 作業とその進捗が関係者全員に見える"]
I["検査 Inspection 作業成果物と進捗を頻繁かつ注意深く検査する"]
AD["適応 Adaptation 逸脱を検知したらプロセスや対象を調整する"]
T --> I
I --> AD
AD --> T`;

const DIAGRAM_SCRUM_EVENTS_CYCLE = `flowchart TB
SP["Sprint Planning Product Backlogを検査しSprint BacklogとSprint Goalを適応させる"]
DS["Daily Scrum Sprint Goalへの進捗を検査しSprint Backlogを適応させる(毎日)"]
DEV["Sprintの作業 設計・リサーチ・実装が並行して進む"]
SR["Sprint Review Sprint・Increment・Product Backlog・Product Goalへの進捗を検査する"]
RETRO["Sprint Retrospective チームレベルでSprintを検査しDefinition of Doneを含む改善策を作る"]
SP --> DS
DS --> DEV
DEV --> DS
DEV --> SR
SR --> RETRO
RETRO --> SP`;

const DIAGRAM_CROSS_FUNCTIONAL_TEAM = `flowchart TB
subgraph OLD["ウォーターフォール的な引き渡し型(アンチパターン)"]
UXTEAM["UXチーム (別部門)"] -->|"仕様書・モックアップを渡す"| DEVTEAM["開発チーム"]
end
subgraph NEW["機能横断型 Scrum Team(PSUが推奨する姿)"]
ST["1つの Scrum Team"]
ST --> PM["プロダクトの視点"]
ST --> UX["UX/リサーチの視点"]
ST --> ENG["実装の視点"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class ST,PM,UX,ENG,UXTEAM,DEVTEAM box;`;

const DIAGRAM_DUAL_TRACK_AGILE = `flowchart TB
subgraph DISCOVERY["Discoveryトラック(何を作るべきかを検証する)"]
direction LR
D1["問題の理解 ユーザーインタビュー"] --> D2["アイデア探索 スケッチ・プロトタイプ"]
D2 --> D3["検証 ユーザビリティテスト・実験"]
end
subgraph DELIVERY["Deliveryトラック(検証済みのものを作る)"]
direction LR
E1["Sprint Planning"] --> E2["実装・テスト"]
E2 --> E3["Sprint Review Increment"]
end
D3 -->|"検証済みの解決策としてProduct Backlogへ"| E1
E3 -->|"リリース後の実データ・フィードバックが次の探索へ"| D1`;

const DIAGRAM_LEAN_UX_CANVAS_FLOW = `flowchart LR
B1["1. ビジネス課題 解決したい問題は何か"] --> B2["2. ビジネスの成果 成功をどう測るか"]
B2 --> B3["3. ユーザー 誰のためのものか"]
B3 --> B4["4. ユーザーの成果と便益 ユーザーは何を得られるか"]
B4 --> B5["5. ソリューション 解決策のアイデア"]
B5 --> B6["6. 仮説 検証可能な文にする"]
B6 --> B7["7. 最も重要な前提 最もリスクが高いもの"]
B7 --> B8["8. 実験 MVPで何をどう検証するか"]`;

const DIAGRAM_OPPORTUNITY_SOLUTION_TREE = `flowchart TB
O["プロダクトアウトカム 測定可能なユーザー行動の変化"]
O --> OP1["機会 A ユーザーの課題・欲求"]
O --> OP2["機会 B ユーザーの課題・欲求"]
OP1 --> S1["ソリューション案 1"]
OP1 --> S2["ソリューション案 2"]
OP2 --> S3["ソリューション案 3"]
S1 --> AT1["前提の検証実験"]
S2 --> AT2["前提の検証実験"]
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class O hub;`;

const DIAGRAM_DESIGN_SPRINT_FLOW = `flowchart LR
M["月: 理解 問題の整理・ゴール設定"] --> T["火: 発散 解決策のスケッチ"]
T --> W["水: 決定 最有力案を選定"]
W --> TH["木: 試作 プロトタイプ作成"]
TH --> F["金: 検証 ユーザーテスト"]`;

const DIAGRAM_SPRINT_INTEGRATION_FLOW = `flowchart TB
subgraph SPRINT_N["Sprint N"]
direction LR
N_DISC["Discovery Sprint N+1向けのインタビュー・検証"]
N_DEV["Delivery Sprint N確定分の実装"]
N_REV["Sprint Review Incrementと学びの両方を共有"]
N_RETRO["Retrospective DoDとプロセスを見直す"]
N_DISC --> N_REV
N_DEV --> N_REV
N_REV --> N_RETRO
end
subgraph SPRINT_N1["Sprint N+1"]
direction LR
N1_PLAN["Sprint Planning 検証済みアイテムを選択"]
N1_DISC["Discovery Sprint N+2向けの検証"]
N1_DEV["Delivery 実装"]
N1_PLAN --> N1_DEV
end
N_RETRO --> N1_PLAN
N_DISC -->|"検証結果をBacklogへ"| N1_PLAN
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class N_REV hub;`;

const DIAGRAM_STUDY_PLAN_STEPS = `flowchart TB
S1["Step 1 Scrum Guide 2020を読み込む (PSM I / PSPO I相当の理解)"] --> S2["Step 2 Scrum Open / Product Owner Openで基礎知識を確認する"]
S2 --> S3["Step 3 Lean UX (第3版)を通読する"]
S3 --> S4["Step 4 Continuous Discovery Habitsでディスカバリーの実践知識を補強する"]
S4 --> S5["Step 5 Scrum.orgのSuggested Reading内のブログ記事群に目を通す"]
S5 --> S6["Step 6 本ガイドの模擬問題で理解度をセルフチェックする"]
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S6 done;`;

const TOC_IDS = [
  "exam-overview",
  "scrum-framework",
  "people-and-teams",
  "product-agility",
  "lean-ux-practices",
  "sprint-integration",
  "practice-questions",
  "study-plan",
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
  title: "PSU I® 認定資格 完全ガイド | Professional Scrum with User Experience",
  description:
    "Scrum.org Professional Scrum with User Experience(PSU I)認定資格を初学者向けに体系解説。Scrumフレームワーク、Dual-Track Agile、Lean UXの実践知識とベストプラクティスをMermaid図解と模擬問題付きで網羅。",
});
</script>

<template>
  <div class="layout">
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <!-- ===================== Sidebar ===================== -->
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">PSU I&reg; 完全ガイド</div>
          <div class="brand-subtitle">Professional Scrum with User Experience</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li class="nav-group-label">概要</li>
        <li><a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />この試験について</a></li>

        <li class="nav-group-label">出題範囲の解説</li>
        <li><a href="#scrum-framework" :class="{ active: activeId === 'scrum-framework' }" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />Scrumフレームワーク</a></li>
        <li><a href="#people-and-teams" :class="{ active: activeId === 'people-and-teams' }" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />人とチームの成長</a></li>
        <li><a href="#product-agility" :class="{ active: activeId === 'product-agility' }" @click="closeSidebar"><Icon name="tabler:chart-line" aria-hidden="true" />プロダクトマネジメント</a></li>
        <li><a href="#lean-ux-practices" :class="{ active: activeId === 'lean-ux-practices' }" @click="closeSidebar"><Icon name="tabler:flask" aria-hidden="true" />Lean UX実践</a></li>
        <li><a href="#sprint-integration" :class="{ active: activeId === 'sprint-integration' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />Sprintへの統合</a></li>

        <li class="nav-group-label">仕上げ</li>
        <li><a href="#practice-questions" :class="{ active: activeId === 'practice-questions' }" @click="closeSidebar"><Icon name="tabler:help-hexagon" aria-hidden="true" />模擬問題</a></li>
        <li><a href="#study-plan" :class="{ active: activeId === 'study-plan' }" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />学習の進め方</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main id="main-content" class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org 公式認定資格</div>
        <h1>Professional Scrum™ with User Experience(PSU I) 完全ガイド</h1>
        <p class="hero-lede">
          本ガイドは、Scrum初学者〜中級者が「なぜUXとScrumを統合するのか」「どう統合するのか」をステップバイステップで理解し、PSU Iの出題範囲を体系的にカバーすることを目的としています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">$200</div><div class="stat-label">受験料(USD、1回の受験につき)</div></div>
          <div class="stat-card"><div class="stat-number">85%</div><div class="stat-label">合格ライン</div></div>
          <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">制限時間</div></div>
          <div class="stat-card"><div class="stat-number">60問</div><div class="stat-label">問題数(選択式・正誤問題)</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは学習支援を目的とした非公式の解説資料であり、Scrum.orgによる公式教材ではありません。試験の最新の出題範囲や詳細は必ず<a href="https://www.scrum.org/assessments/professional-scrum-user-experience-certification" target="_blank" rel="noopener">Scrum.org公式サイト</a>でご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 1. Exam Overview ===================== -->
      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>この試験について</h2>

        <p>Professional Scrum with User Experience I(PSU I)は、Scrum TeamがUX(ユーザーエクスペリエンス)をどのようにScrumへ統合し、価値の創出と提供を高めるかについての基礎的な理解を証明する認定資格です。UXデザイナー単体の資格ではなく、<strong>Product Owner・Scrum Master・Developers全員がUXマインドセットを持ってScrumを実践できるか</strong>を問う試験である点が特徴です。</p>

        <h3>試験概要</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>受験料</td><td>$200 USD(1回の受験につき)</td></tr>
              <tr><td>合格ライン</td><td>85%</td></tr>
              <tr><td>制限時間</td><td>60分</td></tr>
              <tr><td>問題数</td><td>60問</td></tr>
              <tr><td>出題形式</td><td>選択式(単一選択・複数選択)、正誤問題</td></tr>
              <tr><td>受験前提</td><td>受講は必須ではないが、PSUトレーニングコースの受講が強く推奨される</td></tr>
              <tr><td>有効期限</td><td>生涯有効(更新不要)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://www.scrum.org/assessments/professional-scrum-user-experience-certification" target="_blank" rel="noopener">Professional Scrum with User Experience Certification - Scrum.org</a></li></ul>
        </div>

        <h3>出題範囲(Focus Areas)</h3>
        <p>PSU Iは、Scrum.orgが定める<a href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">The Professional Scrum Competencies</a>というコンピテンシーモデルのうち、以下4つのコンピテンシー領域・12のFocus Areaから出題されます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>コンピテンシー領域</th><th>Focus Area</th></tr></thead>
            <tbody>
              <tr><td>Understanding and Applying the Scrum Framework(Scrumフレームワークの理解と適用)</td><td>Empiricism, Scrum Values, Scrum Team, Events, Artifacts, Done</td></tr>
              <tr><td>Developing People and Teams(人とチームの成長)</td><td>Self-Managing (Cross-Functional) Teams - Including UX</td></tr>
              <tr><td>Managing Products with Agility(アジリティを持ったプロダクトマネジメント)</td><td>Product Value, Product Backlog Management, Stakeholders &amp; Customers, Work Management with UX</td></tr>
              <tr><td>Complementary Practices(補完的プラクティス)</td><td>Lean UX Practices &amp; Techniques</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://www.scrum.org/resources/suggested-reading-professional-scrum-user-experience" target="_blank" rel="noopener">Suggested Reading for Professional Scrum with User Experience - Scrum.org</a></li></ul>
        </div>

        <h3>全体マップ</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_EXAM_OVERVIEW_MAP" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">PSU Iの4つのコンピテンシー領域とFocus Areaの全体像</div>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>このガイドの構成: 第1章〜第4章で上記4領域を順に解説し、第5章で「Sprintの中でどうUXを実践するか」を統合的にまとめます。最後に模擬問題と学習計画、参考文献一覧を掲載します。</p>
        </div>
      </section>

      <!-- ===================== 2. Understanding and Applying the Scrum Framework ===================== -->
      <section id="scrum-framework">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
        <h2>第1章: Understanding and Applying the Scrum Framework(Scrumフレームワークの理解と適用)</h2>

        <p>PSU Iの土台となる章です。PSM I / PSPO Iと共通のFocus Areaですが、UX視点での補足を随所に加えています。すでにScrumに精通している場合も、UXとの接続部分(1.6節など)は必ず押さえてください。</p>

        <h3>1.1 経験主義(Empiricism)とScrumの理論</h3>
        <p>Scrumは<strong>経験主義(Empiricism)</strong>と<strong>リーン思考(Lean Thinking)</strong>の上に成り立っています。経験主義とは「知識は経験から生まれ、意思決定は観察された事実に基づいて行われるべきである」という考え方です。UXの世界で言う「推測ではなくユーザー観察・データに基づいて意思決定する」という姿勢そのものであり、これがPSUがLean UXと親和性を持つ根本理由です。</p>

        <p>経験主義を支えるのが、以下の<strong>3本柱</strong>です。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_EMPIRICISM_PILLARS" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">経験主義を支える3本柱: 透明性・検査・適応</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>柱</th><th>説明</th><th>UXの実務での対応例</th></tr></thead>
            <tbody>
              <tr><td>透明性</td><td>作業プロセスと成果物が、実施者・受け手の双方から見える状態であること。透明性が低いと誤った意思決定につながる</td><td>ユーザーリサーチの生データや調査結果を、デザイナーだけが抱え込まずチーム全員に共有する</td></tr>
              <tr><td>検査</td><td>成果物やプロセスの状態を、目的からの逸脱を検知するために頻繁に検査すること</td><td>プロトタイプを都度チームでレビューし、ユーザーテストの結果を定期的に確認する</td></tr>
              <tr><td>適応</td><td>検査の結果、許容範囲を超える逸脱が判明したら、できるだけ早くプロセスや対象を調整すること</td><td>ユーザビリティテストで致命的な問題が見つかったら、次のSprintを待たずデザインを修正する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li></ul>
        </div>

        <h3>1.2 Scrumの価値基準(Scrum Values)</h3>
        <p>Scrum Teamが経験主義を実践するにあたり拠り所とする、5つの価値基準です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>価値基準</th><th>意味</th></tr></thead>
            <tbody>
              <tr><td>確約(Commitment)</td><td>ゴールの達成とお互いの支援にコミットする</td></tr>
              <tr><td>集中(Focus)</td><td>Sprintの作業とゴールに集中する</td></tr>
              <tr><td>公開(Openness)</td><td>作業や課題について透明・オープンである</td></tr>
              <tr><td>尊敬(Respect)</td><td>互いを能力のある独立した人間として尊重する</td></tr>
              <tr><td>勇気(Courage)</td><td>正しいことをする勇気、困難な問題に取り組む勇気を持つ</td></tr>
            </tbody>
          </table>
        </div>

        <p>これらの価値がScrum Teamと関わる人々に体現されたとき、経験主義の3本柱(透明性・検査・適応)が実際に機能し始め、信頼が構築されます。UXの文脈では、たとえば「ユーザーテストでデザインの欠陥が見つかったことを正直に共有する(Openness)」「まだ検証されていない仮説であることを認める勇気(Courage)」が典型例です。</p>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li></ul>
        </div>

        <h3>1.3 Scrum TeamとUXの位置づけ</h3>
        <p>Scrum Teamは、Product Owner・Scrum Master・Developersという3つのアカウンタビリティ(責任)から成る、通常10名以下の小さなチームです。重要なのは、<strong>UXデザイナー / リサーチャーは「別チーム」ではなく、Developersの一員としてScrum Teamに内包される</strong>という考え方です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>アカウンタビリティ</th><th>主な役割</th><th>UXとの関わり</th></tr></thead>
            <tbody>
              <tr><td>Product Owner</td><td>プロダクトの価値を最大化する。プロダクトバックログの管理に責任を持つ</td><td>ユーザー価値とビジネス価値の両方を代弁し、どの学習・仮説検証を優先するかを判断する</td></tr>
              <tr><td>Scrum Master</td><td>Scrumの理解と実践を組織全体に広める。チームの障害を取り除く</td><td>Discovery(発見)とDelivery(提供)の両トラックがうまく協調するようファシリテートする</td></tr>
              <tr><td>Developers</td><td>Increment(インクリメント)を作成する全ての人。デザイナー・リサーチャー・エンジニアを含む</td><td>「デザイナーが作ってエンジニアが実装する」という受け渡し型ではなく、Sprintを通じて協働する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>Scrum Guideには「UXデザイナー」という役職名は登場しません。PSU Iが強調するのは、UXの専門性を持つ人を含めてDevelopersを<strong>機能横断的(Cross-Functional)</strong>に構成し、Sprintの中でデザイン・リサーチ・実装が並行して進む状態を作ることです(詳細は第2章)。</p>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li></ul>
        </div>

        <h3>1.4 Scrumのイベント(Events)</h3>
        <p>Sprintという「コンテナイベント」の中に、4つの正式なイベントが内包されます。これらのイベントはすべて、検査と適応を行うための機会として設計されています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCRUM_EVENTS_CYCLE" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Sprintを構成する4つのイベントの循環</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>イベント</th><th>タイムボックス(目安)</th><th>検査対象</th><th>適応対象</th></tr></thead>
            <tbody>
              <tr><td>Sprint Planning</td><td>1ヶ月Sprintで最大8時間</td><td>Product Backlog、Product Goal</td><td>Sprint Backlog、Sprint Goal</td></tr>
              <tr><td>Daily Scrum</td><td>15分</td><td>Sprint Goalへの進捗</td><td>Sprint Backlog(当日の作業計画)</td></tr>
              <tr><td>Sprint Review</td><td>1ヶ月Sprintで最大4時間</td><td>Increment、Product Backlogの状態、市場の変化</td><td>Product Backlogの内容・優先順位</td></tr>
              <tr><td>Sprint Retrospective</td><td>1ヶ月Sprintで最大3時間</td><td>個人・相互作用・プロセス・ツール、Definition of Done</td><td>実行可能な改善計画</td></tr>
            </tbody>
          </table>
        </div>

        <p>UXの観点で特に重要なのは<strong>Sprint Review</strong>です。ここは単なる「動くソフトウェアのデモ」の場ではなく、<strong>ユーザーやステークホルダーからのフィードバックを得る協働セッション</strong>として設計されています。ユーザビリティテストの結果、デザイン案のフィードバック、ディスカバリー活動で得た学びを共有する最適な場です。</p>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li>
            <li><a href="https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism" target="_blank" rel="noopener">Three - Wait: Four - Elements of Empiricism - Scrum.org Blog</a></li>
          </ul>
        </div>

        <h3>1.5 Scrumの作成物(Artifacts)とコミットメント</h3>
        <p>Scrumには3つの作成物(Artifacts)があり、それぞれに透明性を担保するための「コミットメント」が紐づいています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>Artifact</th><th>内容</th><th>対応するコミットメント</th><th>コミットメントの役割</th></tr></thead>
            <tbody>
              <tr><td>Product Backlog</td><td>プロダクトを改善するために必要な作業の、創発的で並び替え可能な一覧</td><td>Product Goal</td><td>プロダクトの長期的な目的・状態を示す</td></tr>
              <tr><td>Sprint Backlog</td><td>Sprint GoalとそのためのProduct Backlogアイテム、実行計画</td><td>Sprint Goal</td><td>そのSprintで達成したい単一の目的を示す</td></tr>
              <tr><td>Increment</td><td>Sprint中に完成した、これまでのIncrementすべてを合算した具体的な踏み台</td><td>Definition of Done</td><td>品質基準を満たしているかを判断する基準</td></tr>
            </tbody>
          </table>
        </div>

        <p>UXの実務では、Product Backlogに「機能(Feature)」だけでなく、<strong>リサーチや検証のための作業(Research Spike、Design Spike、実験ストーリー)</strong>が並ぶ点がPSM/PSPOとの違いです(詳細は3.2節)。</p>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li></ul>
        </div>

        <h3>1.6 完成の定義(Definition of Done)とUX</h3>
        <p>Definition of Done(DoD)は、Incrementが満たすべき品質基準の正式な記述であり、Product Backlogアイテムが「Doneとみなされる」ために必要な条件です。DoDを満たさない作業はリリースはおろか、Sprint Reviewで提示することもできません。</p>

        <p>PSU Iで問われる重要な論点は、<strong>「UX・デザインに関する検証や作業を、DoDにどう組み込むか」</strong>です。</p>

        <ul>
          <li>DoDに「ユーザビリティテストを実施済み」を含めるチームもある。その場合、デザインだけが完了してユーザビリティ検証がまだの状態は「Done」ではない(ユーザビリティテストの実施が全チームに一律で求められるわけではなく、何をDoDに含めるかはチームが決める)</li>
          <li>逆に、リサーチや実験そのもの(仮説の検証)は、機能の実装とは別に、それ単体で「学びを得る」という価値を生む作業として扱われる</li>
          <li>1つのSprintで完結しない大きなデザイン課題は、そのSprintのDoDを満たす小さな単位に分解する(例: 「コンセプト検証まで」を今回のDoneとする)</li>
        </ul>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>DoDは固定ではなく、Sprint Retrospectiveを通じて継続的に強化していく(例: 最初はコードレビューのみだったDoDに、後からアクセシビリティ確認やユーザビリティ確認を追加する)</li>
            <li>「デザインが完了した」と「ユーザーにとって価値があると検証された」を明確に区別し、後者を伴わない完了を安易に許容しない</li>
            <li>大きすぎるUX課題は、Product Backlog Refinementの中でDoDを満たせるサイズに分解する(詳細は3.2節)</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li></ul>
        </div>
      </section>

      <!-- ===================== 3. Developing People and Teams ===================== -->
      <section id="people-and-teams">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 03</div>
        <h2>第2章: Developing People and Teams(人とチームの成長)</h2>

        <h3>2.1 自己管理型・機能横断型チーム(Self-Managing Cross-Functional Teams - Including UX)</h3>
        <p>このFocus Areaは、PSU I独自の重点分野です。PSM Iでは「Self-Managing Teams, Facilitation, Coaching」が問われますが、PSU Iでは<strong>UXを含む機能横断性</strong>にフォーカスが絞られています。</p>

        <p><strong>自己管理(Self-Managing)</strong>とは、Scrum Teamが「誰が」「何を」「いつ」「どのように」作業するかを、外部から指示されるのではなく、内部で決定することです。<strong>機能横断(Cross-Functional)</strong>とは、Sprintの間にIncrementを作成するために必要なすべてのスキル(設計、リサーチ、実装、テストなど)をチーム内に持つことです。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CROSS_FUNCTIONAL_TEAM" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">引き渡し型チーム構成と機能横断型 Scrum Teamの比較</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>引き渡し型(アンチパターン)</th><th>機能横断型(PSUが推奨)</th></tr></thead>
            <tbody>
              <tr><td>チーム構成</td><td>UXチームと開発チームが別組織・別バックログ</td><td>同じScrum Team、同じProduct Backlog</td></tr>
              <tr><td>協働のタイミング</td><td>デザインが完成してから開発に引き渡す(Sprint 0的な前倒し作業)</td><td>SprintのはじめからPO・SM・デザイナー・エンジニアが一緒に検討する</td></tr>
              <tr><td>フィードバック</td><td>実装後にしかユーザーの反応が分からない</td><td>Sprint中に継続的にプロトタイプ・実装物を検証する</td></tr>
              <tr><td>スキルの持ち方</td><td>I字型(1つの専門性のみ)</td><td>T字型(1つの深い専門性＋他領域への理解と協力)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>UXの専門家をDevelopersチームに常駐させ、「毎Sprint、設計・検証・実装が同時並行で進む」状態を目指す(Dual-Track Agileとの接続は3.4節)</li>
            <li>「デザイナー」「リサーチャー」「エンジニア」という肩書きより先に、チーム全員が「価値のある成果(Outcome)を届ける」という共通目的を持つ</li>
            <li>T字型スキル(自分の専門を深く持ちつつ、隣接領域を理解し手伝える)を育成し、単一障害点(特定の人しかできない作業)を減らす</li>
            <li>ペアワーク(デザイナー×エンジニア、PO×デザイナーなど)を通じて暗黙知を共有し、引き渡しによる情報の欠落を防ぐ</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li>
            <li><a href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">The Professional Scrum Competencies - Scrum.org</a></li>
            <li><a href="https://www.ideaplan.io/guides/dual-track-agile-guide" target="_blank" rel="noopener">Dual-Track Agile: A Practical Guide for Product Teams</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 4. Managing Products with Agility ===================== -->
      <section id="product-agility">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-line" aria-hidden="true" />SECTION 04</div>
        <h2>第3章: Managing Products with Agility(アジリティを持ったプロダクトマネジメント)</h2>

        <h3>3.1 プロダクトの価値(Product Value): アウトプットからアウトカムへ</h3>
        <p>Scrumの目的は「機能を作ること」自体ではなく、「価値を創出すること」です。PSU Iでは、この価値の考え方をUXの言葉で捉え直します。すなわち<strong>アウトプット(Output)とアウトカム(Outcome)の違い</strong>です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th></th><th>アウトプット(Output)</th><th>アウトカム(Outcome)</th></tr></thead>
            <tbody>
              <tr><td>定義</td><td>チームが作り、出荷したもの(機能、画面、リリース)</td><td>その結果として生まれた、ユーザーの行動・状態の変化</td></tr>
              <tr><td>例</td><td>「新しいオンボーディング画面をリリースした」</td><td>「新規ユーザーの初回利用継続率が向上した」</td></tr>
              <tr><td>測定しやすさ</td><td>測りやすい(完了/未完了)</td><td>測るには仮説と検証が必要</td></tr>
              <tr><td>リスク</td><td>作ったのに使われない・価値がない可能性がある</td><td>価値が検証されているため手戻りが少ない</td></tr>
            </tbody>
          </table>
        </div>

        <p>Lean UXおよびContinuous Discovery Habitsが強調するのは、<strong>Product Backlogの並び替え(優先順位付け)を「機能の大きさ」ではなく「期待されるアウトカムと、それを検証するための学習の速さ」で行う</strong>という発想です。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>Product Backlogアイテムに「この機能によって、どのユーザー行動をどう変えたいか」という仮説を明記する</li>
            <li>リリースそのものをゴールにせず、リリース後の指標(継続率、タスク完了率、満足度など)をチームで追跡する</li>
            <li>「作ったかどうか」ではなく「学んだかどうか・価値があったかどうか」でSprintの成功を評価する文化を作る</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/" target="_blank" rel="noopener">Lean UX, 3rd Edition - O'Reilly</a></li>
            <li><a href="https://www.producttalk.org/continuous-discovery-habits/" target="_blank" rel="noopener">Continuous Discovery Habits - Product Talk</a></li>
          </ul>
        </div>

        <h3>3.2 UXを踏まえたプロダクトバックログ管理(Product Backlog Management with UX)</h3>
        <p>Product Backlog Managementとは、Product Backlogの内容、可用性、順序を明確にする活動です。UXを統合したチームでは、Product Backlogアイテムの種類が多様化します。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>バックログアイテムの種類</th><th>内容</th><th>完了の定義(例)</th></tr></thead>
            <tbody>
              <tr><td>機能ストーリー(Feature Story)</td><td>実装すべき機能要求</td><td>実装・テスト・DoDを満たしてリリース可能な状態</td></tr>
              <tr><td>デザインストーリー(Design Story)</td><td>デザイン検討・プロトタイピングの作業</td><td>プロトタイプが完成し、次の検証に進める状態</td></tr>
              <tr><td>リサーチスパイク(Research Spike)</td><td>ユーザーインタビューや競合調査など、知識を得るための時間限定の調査</td><td>学びがドキュメント化され、チームに共有された状態</td></tr>
              <tr><td>実験ストーリー(Experiment Story)</td><td>仮説を検証するための小さな実験(A/Bテスト、コンシェルジュMVPなど)</td><td>仮説が検証(または反証)され、結論が出た状態</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Backlog Refinement(バックログの磨き込み)</strong>は、これらの多様なアイテムを次のSprintで着手できる十分小さいサイズに分解し、受け入れ基準を明確にする継続的な活動です。UXの検証がまだ済んでいない大きな機能は、「検証のための小さな一歩(実験・プロトタイプ)」に分解しておくと着手しやすくなります。ただし検証済みであることはProduct Backlogに載せる条件ではなく、未検証の仮説やそれを確かめる実験そのものをBacklogアイテムとして扱って構いません。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>「実装ストーリー」と「検証・学習ストーリー」を同じProduct Backlog上で並び替え、優先順位を統一する(別々のバックログに分けると、価値の比較ができなくなる)</li>
            <li>大きすぎるUX課題は、検証可能な小さい単位に分解してからバックログに載せると扱いやすい(分解や検証の完了を、バックログ登録の前提条件にはしない)</li>
            <li>受け入れ基準にユーザビリティやアクセシビリティの観点を含める</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li>
            <li><a href="https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/" target="_blank" rel="noopener">Lean UX, 3rd Edition - O'Reilly</a></li>
          </ul>
        </div>

        <h3>3.3 ステークホルダーと顧客(Stakeholders &amp; Customers)</h3>
        <p>PSU Iでは、Scrum Teamと関わる関係者を明確に区別して理解しているかが問われます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>区分</th><th>定義</th><th>具体例</th></tr></thead>
            <tbody>
              <tr><td>顧客(Customer)</td><td>プロダクトを購入・利用し、その価値を直接享受する人</td><td>エンドユーザー、購買担当者</td></tr>
              <tr><td>ステークホルダー(Stakeholder)</td><td>プロダクトに影響を与える、またはプロダクトから影響を受ける関係者。Scrum Teamの外部にいるが、Product Goalや状況に応じてScrum Teamと継続的に協働することもある</td><td>経営層、営業部門、法務、サポート部門、ユーザー代表</td></tr>
              <tr><td>ユーザー(User)</td><td>実際にプロダクトを操作・利用する人(顧客と同一とは限らない)</td><td>企業向けSaaSであれば、契約者(顧客)と実際の利用者(ユーザー)が異なることが多い</td></tr>
            </tbody>
          </table>
        </div>

        <p>UXの実務知識が特に効くのは、この「顧客」「ステークホルダー」「ユーザー」の違いを踏まえて、<strong>適切な相手から適切なタイミングでフィードバックを得る設計</strong>をすることです。Sprint Reviewはステークホルダーとの協働の場であると同時に、可能であれば実際のユーザーやユーザー調査の結果を招き入れる場にもなり得ます。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>Sprint Reviewを「社内向けの進捗報告会」にせず、実データ・実ユーザーの声を持ち込む場にする</li>
            <li>ステークホルダーの「要望」と、ユーザー調査で裏付けられた「ニーズ」を区別し、後者を優先する透明な基準を持つ</li>
            <li>ペルソナやジャーニーマップを用いて、チーム全体がどの顧客・ユーザー像に向けて意思決定しているかの共通理解を作る</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide - scrumguides.org</a></li></ul>
        </div>

        <h3>3.4 UXを踏まえたワークマネジメント(Work Management with UX): Dual-Track Agile</h3>
        <p>これがPSU I最大の山場です。<strong>「デザイン作業はSprintのリズムに馴染まない」という古くからの課題に、Scrumの枠組みを変えずにどう応えるか</strong>——その答えが<strong>Dual-Track Agile(デュアルトラック・アジャイル)</strong>です。Marty CaganとJeff Pattonが2012年に提唱した考え方が起点になっています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DUAL_TRACK_AGILE" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Discoveryトラックと Deliveryトラックが合流する Dual-Track Agile</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th></th><th>Discoveryトラック</th><th>Deliveryトラック</th></tr></thead>
            <tbody>
              <tr><td>目的</td><td>何を作るべきかを検証する(What)</td><td>検証済みのものを、いかに正しく作るかを実行する(How)</td></tr>
              <tr><td>主な活動</td><td>ユーザーインタビュー、プロトタイピング、ユーザビリティテスト、実験</td><td>設計・実装・テスト・リリース</td></tr>
              <tr><td>進むペース</td><td>Deliveryより1〜2Sprint先行することが多い</td><td>通常のSprintのリズムで進む</td></tr>
              <tr><td>参加者</td><td>PO・デザイナー・リサーチャー(＋必要に応じてエンジニア)</td><td>Developers全員</td></tr>
              <tr><td>アウトプット</td><td>検証済みの解決策・仮説の結論</td><td>Done Increment</td></tr>
            </tbody>
          </table>
        </div>

        <p>重要なポイントは、<strong>Dual-Track AgileはScrumのイベントを増やしたり複雑にしたりするものではない</strong>ということです。DiscoveryとDeliveryは「別のプロセス」ではなく、<strong>同じProduct Backlogに合流する、並行した2つの作業の流れ</strong>です。Discoveryで得た学びは、Product Backlogアイテムの作成・リファインメント・並び替え、そしてSprint Planningでの選択に継続的に反映されます。ただしDiscoveryはProduct Backlogへ入るための必須ゲートではありません。未検証の仮説や、それを確かめるための実験そのものをProduct Backlogアイテムとして扱い、Sprintの中で検証することもできます。何をいつ検証するかの判断は、最終的にProduct Ownerの説明責任の範囲にあります。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>Discoveryを走らせすぎない。「Deliveryのバックログが常に2〜3Sprint分の検証済みアイテムで満たされている」状態を目安に、Discoveryの投資量を調整する</li>
            <li>Discoveryの結果(検証済み・反証済みの両方)をSprint Reviewで共有し、「学び自体」も成果として扱う</li>
            <li>1つのSprint内でも、デザイナーは「今のSprintの実装を支援しながら、次のSprintのDiscoveryを進める」という二重の役割を担うのが自然な姿である</li>
            <li>Discovery専用ボード・Delivery専用ボードを分けて運用する場合でも、両者は必ずリンクさせ、Product Backlogとしての優先順位は一元管理する</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.productboard.com/glossary/dual-track-agile/" target="_blank" rel="noopener">What is Dual-Track Agile? - Productboard</a></li>
            <li><a href="https://www.senseandrespond.co/blog/dual-track-agile" target="_blank" rel="noopener">Dual-Track Agile: Managing Discovery and Delivery in a Single Sprint - Sense &amp; Respond Press</a></li>
            <li><a href="https://www.scrum.org/courses/professional-scrum-user-experience-training" target="_blank" rel="noopener">Professional Scrum with User Experience Training - Scrum.org</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 5. Complementary Practices: Lean UX ===================== -->
      <section id="lean-ux-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flask" aria-hidden="true" />SECTION 05</div>
        <h2>第4章: Complementary Practices - Lean UX Practices &amp; Techniques</h2>

        <p>PSU Iのもう一つの柱が<strong>Lean UX</strong>です。公式教材はJeff GothelfとJosh Seidenの共著『Lean UX: Designing Great Products with Agile Teams』(第3版)をベースに作られており、実際の合格者体験談でも「この本の内容を理解していれば試験範囲の9割はカバーできる」と言われるほど重要な位置づけです。</p>

        <h3>4.1 Lean UXの基本思想</h3>
        <p>Lean UXは、Lean StartupとAgile開発に着想を得た、<strong>「成果物(Deliverable)ではなく、体験そのもの」に焦点を当てる</strong>プロダクト開発・デザインの考え方です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>従来のUX</th><th>Lean UX</th></tr></thead>
            <tbody>
              <tr><td>詳細なワイヤーフレーム・仕様書などの成果物中心</td><td>学びを最速で得るための最小限の成果物</td></tr>
              <tr><td>長いリサーチ期間の後にまとめて設計</td><td>継続的・少人数での検証サイクル</td></tr>
              <tr><td>フィードバックは早期と終盤のみ</td><td>週次・日次レベルでの継続的なフィードバック</td></tr>
              <tr><td>「要求」を確定した事実として扱う</td><td>「要求」は権威を持って語られた仮定に過ぎないとみなす</td></tr>
            </tbody>
          </table>
        </div>

        <p>Lean UXを支える主な原則は、次の3つのグループに整理されます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>グループ</th><th>原則の例</th></tr></thead>
            <tbody>
              <tr><td>チーム編成の原則</td><td>機能横断型・少人数・専有・自己完結・問題志向のチーム</td></tr>
              <tr><td>文化の原則</td><td>アウトプットではなくアウトカムを重視する / 無駄を減らす / 共通理解を作る / 「失敗する許可」を与える</td></tr>
              <tr><td>プロセスの原則</td><td>謙虚さを持つ / 失敗する許可 / 自己主導性 / 透明性</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>「要求仕様書」を作りこむ前に、まず仮説として明文化し、検証する対象として扱う</li>
            <li>デザインレビューを「承認を得る儀式」にせず、チーム全員が参加する共同作業にする</li>
            <li>学びを最大化するために、成果物は「伝わる最小限」にとどめる(高精細なモックアップより、素早い検証を優先する)</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/" target="_blank" rel="noopener">Lean UX, 3rd Edition - O'Reilly</a></li>
            <li><a href="https://medium.com/10x-curiosity/lean-ux-a-summary-from-the-ground-floor-bc195341dbea" target="_blank" rel="noopener">Lean UX - A Summary from the Ground Floor</a></li>
          </ul>
        </div>

        <h3>4.2 Lean UX Canvas</h3>
        <p>Lean UX Canvasは、Jeff Gothelfが考案した1枚のワークショップツールで、チームがビジネス課題を明確にし、前提(Assumption)を洗い出し、仮説(Hypothesis)に変換し、検証実験を設計するプロセスを構造化します。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_LEAN_UX_CANVAS_FLOW" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Lean UX Canvasの8つのボックスを埋める流れ</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>Box</th><th>名称</th><th>問い</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>ビジネス課題</td><td>私たちが解決しようとしているビジネス課題は何か</td></tr>
              <tr><td>2</td><td>ビジネスの成果</td><td>ビジネスとして成功したと言える状態を、どの指標で測るか</td></tr>
              <tr><td>3</td><td>ユーザー</td><td>誰のために作るのか(ペルソナ・セグメント)</td></tr>
              <tr><td>4</td><td>ユーザーの成果と便益</td><td>ユーザーは何を達成・体験できるようになるか</td></tr>
              <tr><td>5</td><td>ソリューション</td><td>考えられる解決策のアイデア一覧</td></tr>
              <tr><td>6</td><td>仮説</td><td>前提を検証可能な形に変換した文</td></tr>
              <tr><td>7</td><td>最も重要な前提</td><td>仮説の中で、間違っていた場合の影響が最も大きいもの</td></tr>
              <tr><td>8</td><td>実験(MVP)</td><td>その前提を検証するための最小限の実験・プロトタイプ</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足: 仮説(Hypothesis)の書き方テンプレート</div>
          <p>私たちは、<strong>[この機能・解決策]</strong>によって、<strong>[これらのユーザー]</strong>が<strong>[この便益・アウトカム]</strong>を得られると信じている。もしこれが正しければ、<strong>[このビジネス成果]</strong>を達成できるだろう。</p>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>Canvasはチーム全員(PO・デザイナー・エンジニア・場合によってはステークホルダー)で一緒に埋める。個人やデザイナーだけで完結させない</li>
            <li>仮説は「測定可能」で「反証可能」な形にする(例: 「使いやすくなる」ではなく「タスク完了時間が20%短縮される」)</li>
            <li>最もリスクの高い前提(Box 7)から検証する。検証コストが低く、間違っていた場合の影響が大きい前提を最優先にする</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://creately.com/guides/lean-ux-canvas/" target="_blank" rel="noopener">Lean UX Canvas: A Practical Tool for the Lean UX Process</a></li>
            <li><a href="https://www.senseandrespond.co/blog/lean-ux-canvas-workshop-guide" target="_blank" rel="noopener">Facilitating the Lean UX Canvas: A Workshop Guide for Agile Coaches</a></li>
          </ul>
        </div>

        <h3>4.3 MVPと実験(MVP &amp; Experiments)</h3>
        <p>Lean UXにおけるMVP(Minimum Viable Product)は、「製品として出荷できる最小限のもの」ではなく、<strong>「学びを得るための最小限の実験」</strong>として捉え直されます。実際の実装を伴わない、ランディングページ・コンシェルジュ型対応・ペーパープロトタイプなども立派なMVPです。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>MVPの種類</th><th>内容</th><th>検証できること</th></tr></thead>
            <tbody>
              <tr><td>プロトタイプMVP</td><td>クリック可能なモックアップ</td><td>ユーザーがフローを理解できるか</td></tr>
              <tr><td>コンシェルジュMVP</td><td>裏側は人力で対応し、自動化されているように見せる</td><td>サービス自体に需要があるか</td></tr>
              <tr><td>フィーチャーフラグMVP</td><td>一部のユーザーにのみ機能を公開する</td><td>実際の利用データ上で仮説が成立するか</td></tr>
              <tr><td>A/Bテスト</td><td>2つ以上のバリエーションを同時に提示する</td><td>どちらのデザインがより高い成果を生むか</td></tr>
            </tbody>
          </table>
        </div>

        <h3>4.4 継続的ディスカバリー(Continuous Discovery Habits)</h3>
        <p>Teresa Torresが提唱する<strong>Continuous Discovery Habits</strong>は、Discoveryを「一度きりのプロジェクト」ではなく<strong>「週次の習慣」</strong>として定着させるためのフレームワークです。PSU Iの公式Suggested Readingでも取り上げられる代表的な書籍の一つです。</p>

        <p>主要な実践は次の4つです。</p>
        <ol>
          <li><strong>明確なプロダクトアウトカムを持つ</strong> - 「機能をリリースする」ではなく、チームがコントロールできるユーザー行動の変化を目標に据える</li>
          <li><strong>週次でユーザーと対話する</strong> - 最低週1回、Product Trio(PO・デザイナー・エンジニアの3者)が揃ってユーザーインタビューを行う</li>
          <li><strong>Opportunity Solution Tree(機会ソリューションツリー)で機会を可視化する</strong></li>
          <li><strong>前提を仮説として明示し、意見の対立ではなく実験で検証する</strong></li>
        </ol>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_OPPORTUNITY_SOLUTION_TREE" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">プロダクトアウトカムから実験へつながる Opportunity Solution Tree</div>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>インタビューはProduct Trio全員で参加する。リサーチ担当者だけに任せない</li>
            <li>「ユーザーが将来どうしたいか」という仮定の質問ではなく、「過去に実際に何をしたか」という具体的な経験を聞く</li>
            <li>Opportunity Solution Treeは一度作って終わりにせず、新しい学びが得られるたびに更新し続ける</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.producttalk.org/continuous-discovery-habits/" target="_blank" rel="noopener">Continuous Discovery Habits - Product Talk(Teresa Torres)</a></li>
            <li><a href="https://greatquestion.co/blog/continuous-discovery-habits" target="_blank" rel="noopener">Continuous discovery habits: how to build and sustain them</a></li>
          </ul>
        </div>

        <h3>4.5 デザインスプリント(Design Sprint)</h3>
        <p>Google Venturesが考案した<strong>Design Sprint</strong>は、5日間で「理解 → 発散 → 決定 → 試作 → 検証」を一気に行う、集中型のDiscovery手法です。Dual-Track Agileにおいて、通常の週次ペースの探索だけでは間に合わない、大きな意思決定が必要な場面で使われます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DESIGN_SPRINT_FLOW" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">5日間で完結する Design Sprintの流れ</div>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>Design Sprintは頻発させない(燃え尽きにつながる)。年に数回、重要な意思決定のタイミングに絞って実施する</li>
            <li>参加者には意思決定権を持つ人(PO、時には経営層)を必ず含める。持ち帰って承認を得る形にしない</li>
            <li>金曜のユーザーテストの結果は、次のDiscoveryやDeliveryの出発点として必ずバックログに反映する</li>
          </ul>
        </div>

        <h3>4.6 ユーザビリティテスト(Usability Testing)</h3>
        <p>ユーザビリティテストは、実際のユーザーに製品やプロトタイプを操作してもらい、問題点を発見する手法です。Nielsen Norman Group(NN/g)が提唱する<strong>「5ユーザーの法則」</strong>はPSU Iでも背景知識として押さえておくべき考え方です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>テスト参加者数</th><th>発見できるユーザビリティ問題の割合(目安)</th></tr></thead>
            <tbody>
              <tr><td>1人</td><td>約31%</td></tr>
              <tr><td>5人</td><td>約85%</td></tr>
              <tr><td>15人</td><td>ほぼ100%(費用対効果は逓減)</td></tr>
            </tbody>
          </table>
        </div>

        <p>ポイントは、「多くの人数を1回で厳密にテストする」より、<strong>「少人数(5人程度)で何度も繰り返しテストする」</strong>方が、限られたリソースの中でより多くの改善につながるという考え方です。これはScrumの反復的・漸進的アプローチと非常に相性が良い発想です。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>大規模な一発勝負のテストより、5人前後の小規模テストをSprintごとに繰り返す</li>
            <li>定性的な使いやすさの検証(5人ルールが有効な範囲)と、定量的な行動データの検証(A/Bテストなど、より大きなサンプルが必要)を使い分ける</li>
            <li>ユーザーに「thinking aloud(考えていることを声に出す)」形式で操作してもらい、行動と発話の両方を観察する</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/" target="_blank" rel="noopener">Why You Only Need to Test with 5 Users - Nielsen Norman Group</a></li>
            <li><a href="https://www.nngroup.com/articles/how-many-test-users/" target="_blank" rel="noopener">How Many Test Users in a Usability Study? - NN/g</a></li>
          </ul>
        </div>

        <h3>4.7 その他の関連ツール(補足)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>手法</th><th>概要</th></tr></thead>
            <tbody>
              <tr><td>ユーザーストーリーマッピング(Jeff Patton)</td><td>ユーザーの行動フローに沿ってストーリーを並べ、リリースの切れ目(スライス)を可視化する手法。Product Backlogを「積み上げるだけのリスト」ではなく「旅」として捉え直す</td></tr>
              <tr><td>ペルソナ</td><td>調査に基づく典型的ユーザー像。チーム内の意思決定の共通言語になる</td></tr>
              <tr><td>カスタマージャーニーマップ</td><td>ユーザーが目的を達成するまでの一連の体験・感情の変化を可視化する図</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul><li><a href="https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/" target="_blank" rel="noopener">Lean UX, 3rd Edition - O'Reilly</a></li></ul>
        </div>
      </section>

      <!-- ===================== 6. Sprint Integration ===================== -->
      <section id="sprint-integration">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 06</div>
        <h2>第5章: SprintサイクルへのUX統合実践(まとめ)</h2>

        <p>ここまでの内容を、実際の複数Sprintの時間軸に統合すると、次のようなイメージになります。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SPRINT_INTEGRATION_FLOW" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Discovery・Delivery・Scrumイベントが複数Sprintにまたがって連携する様子</div>
        </div>

        <h3>統合の要点まとめ表</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Scrumのイベント/成果物</th><th>UX統合における役割</th></tr></thead>
            <tbody>
              <tr><td>Product Backlog</td><td>機能・デザイン検証・リサーチ・実験の全アイテムを一元的に優先順位づけする場</td></tr>
              <tr><td>Sprint Planning</td><td>Discoveryで得た学びを踏まえ、次のSprintで取り組むアイテムを選ぶ場(検証済みのアイテムだけに限定する関門ではなく、検証そのものを目的としたアイテムも選べる)</td></tr>
              <tr><td>Daily Scrum</td><td>DiscoveryとDeliveryの進捗を同期し、両者の連携の詰まりを早期発見する場</td></tr>
              <tr><td>Sprint Review</td><td>Incrementのデモに加え、ユーザーテストや実験の結果を共有し、次の優先順位に反映する場</td></tr>
              <tr><td>Sprint Retrospective</td><td>Definition of Doneにユーザビリティ・アクセシビリティ観点を追加するなど、プロセス自体を継続的に改善する場</td></tr>
              <tr><td>Definition of Done</td><td>「動く」だけでなく「検証された価値がある」水準まで含めるかをチームで合意する基準</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 7. Practice Questions ===================== -->
      <section id="practice-questions">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:help-hexagon" aria-hidden="true" />SECTION 07</div>
        <h2>模擬問題で理解度チェック</h2>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>以下は学習用に作成した非公式の模擬問題です。実際の試験問題とは異なります。</p>
        </div>

        <div class="quiz-card">
          <span class="quiz-q-label">Q1</span>
          <p>Scrum TeamがDual-Track Agileを採用する主な目的として、最も適切なものはどれか。</p>
          <ul class="quiz-options">
            <li><strong>A.</strong> Scrumのイベントを増やし、より詳細な計画を立てるため</li>
            <li><strong>B.</strong> 検証されていないアイデアをDeliveryトラックに直接流し込み、開発速度を上げるため</li>
            <li><strong>C.</strong> 何を作るべきかを検証するDiscoveryと、それを実装するDeliveryを並行させ、Discoveryで得た学びをProduct Backlogの作成・リファインメント・並び替えへ継続的に反映するため</li>
            <li><strong>D.</strong> UXデザイナーを開発チームから独立させ、別々のバックログで管理するため</li>
          </ul>
          <details>
            <summary>解答と解説</summary>
            <p><strong>正解: C</strong><br>
            Dual-Track Agileは、DiscoveryとDeliveryを並行させることで、Deliveryトラックが根拠のある作業に取り組めるようにする考え方です。ScrumのイベントやArtifactを増やすものではなく、同じProduct Backlogに合流します。なお「検証済みの作業しかProduct Backlogに入れてはならない」という意味ではありません。未検証の仮説や実験自体をProduct Backlogアイテムとして扱い、Sprintの中で検証することもできます。Bが誤りなのは、検証を省いて速度だけを上げることがDual-Track Agileの目的ではないためです。</p>
          </details>
        </div>

        <div class="quiz-card">
          <span class="quiz-q-label">Q2</span>
          <p>Lean UXにおける「仮説(Hypothesis)」の説明として最も適切なものはどれか。</p>
          <ul class="quiz-options">
            <li><strong>A.</strong> すでに市場調査で確定した、疑う余地のない事実</li>
            <li><strong>B.</strong> 権威を持って語られているが、検証されていない前提を、測定可能・検証可能な形に書き換えたもの</li>
            <li><strong>C.</strong> デザイナーが個人の経験に基づいて下す最終的な意思決定</li>
            <li><strong>D.</strong> ステークホルダーからの要望をそのまま文書化したもの</li>
          </ul>
          <details>
            <summary>解答と解説</summary>
            <p><strong>正解: B</strong><br>
            Lean UXでは「要求は権威を持って語られた前提にすぎない」と捉え、それを検証可能な仮説の形に変換します。仮説は「もし〜すれば、〜という成果が得られるだろう」という形で書かれ、実験によって検証・反証されます。</p>
          </details>
        </div>

        <div class="quiz-card">
          <span class="quiz-q-label">Q3</span>
          <p>Definition of Doneに関する説明として適切なものはどれか。</p>
          <ul class="quiz-options">
            <li><strong>A.</strong> Definition of Doneは一度定義したら二度と変更してはならない</li>
            <li><strong>B.</strong> デザインが完成した時点で、そのProduct Backlogアイテムは常にDoneとみなされる</li>
            <li><strong>C.</strong> Definition of Doneは、Increment(作成物)が満たすべき品質基準の正式な記述であり、Sprint Retrospectiveなどを通じて継続的に強化されうる</li>
            <li><strong>D.</strong> Definition of DoneはScrum Masterのみが単独で決定する</li>
          </ul>
          <details>
            <summary>解答と解説</summary>
            <p><strong>正解: C</strong><br>
            Definition of Doneは固定的な文書ではなく、チームの成熟度に応じてSprint Retrospectiveなどを通じて強化されていくものです。デザインが完成しても、品質基準(ユーザビリティ検証などを含む場合はそれも)を満たさなければDoneとはみなされません。</p>
          </details>
        </div>

        <div class="quiz-card">
          <span class="quiz-q-label">Q4</span>
          <p>ステークホルダーと顧客・ユーザーの違いに関する説明として、最も適切なものはどれか。</p>
          <ul class="quiz-options">
            <li><strong>A.</strong> ステークホルダーと顧客は常に同一人物である</li>
            <li><strong>B.</strong> ステークホルダーはプロダクトに影響を与える、または影響を受ける関係者であり、顧客・ユーザーと重なることもあるため、それぞれの立場を区別したうえで協働の仕方を設計する必要がある</li>
            <li><strong>C.</strong> ユーザーは常にプロダクトの購入者と同一である</li>
            <li><strong>D.</strong> Scrum Teamはステークホルダーの要望のみを優先し、ユーザー調査は不要である</li>
          </ul>
          <details>
            <summary>解答と解説</summary>
            <p><strong>正解: B</strong><br>
            ステークホルダー、顧客、ユーザーは重なることもありますが、常に同一とは限りません。特にBtoBプロダクトでは、契約する顧客と実際に使うユーザーが異なることが多く、これらを区別して意思決定することが重要です。なお、ステークホルダーは「日々の開発に関与しない人」に限定されません。Sprint Reviewでの協働が中心になる場合もあれば、Product Goalや状況によってはScrum Teamと継続的に協働する場合もあります。</p>
          </details>
        </div>

        <div class="quiz-card">
          <span class="quiz-q-label">Q5</span>
          <p>Nielsen Norman Groupが提唱する「5ユーザーの法則」が示唆する実践として、最も適切なものはどれか。</p>
          <ul class="quiz-options">
            <li><strong>A.</strong> どのような検証でも常に5人だけをテストすれば十分である</li>
            <li><strong>B.</strong> 大規模な一度きりのテストより、少人数(目安5人程度)でのテストをSprintごとに繰り返す方が、限られたリソースの中で効果的なことが多い</li>
            <li><strong>C.</strong> 5人未満のテストにはまったく意味がない</li>
            <li><strong>D.</strong> 定量的なA/Bテストも5人で十分である</li>
          </ul>
          <details>
            <summary>解答と解説</summary>
            <p><strong>正解: B</strong><br>
            「5ユーザーの法則」は定性的なユーザビリティテストにおける目安であり、少人数での反復的なテストが効率的であることを示しています。定量的な検証(A/Bテストなど)にはより大きなサンプルが必要になる点には注意が必要です。</p>
          </details>
        </div>
      </section>

      <!-- ===================== 8. Study Plan ===================== -->
      <section id="study-plan">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 08</div>
        <h2>学習の進め方(おすすめステップ)</h2>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_STUDY_PLAN_STEPS" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">合格に向けたおすすめ学習ステップ</div>
        </div>

        <ol class="step-list">
          <li>
            <div class="step-num">1</div>
            <div class="step-body">
              <div class="step-title">Scrum Guideの理解を固める</div>
              <div class="step-desc">PSU Iの半分近くは通常のScrum知識(PSM I / PSPO I相当)です。ここが曖昧だと、UX固有の設問以前に失点します。</div>
            </div>
          </li>
          <li>
            <div class="step-num">2</div>
            <div class="step-body">
              <div class="step-title">Scrum OpenとProduct Owner Openを繰り返す</div>
              <div class="step-desc">Scrum.orgが無料公開している練習アセスメントで、基礎知識の抜けを確認します。</div>
            </div>
          </li>
          <li>
            <div class="step-num">3</div>
            <div class="step-body">
              <div class="step-title">Lean UX(第3版)を読む</div>
              <div class="step-desc">本ガイドの第4章はこの書籍の要点整理です。可能であれば原著(またはその要約)にも目を通すことを推奨します。</div>
            </div>
          </li>
          <li>
            <div class="step-num">4</div>
            <div class="step-body">
              <div class="step-title">Continuous Discovery Habitsに目を通す</div>
              <div class="step-desc">Discoveryの具体的な実践習慣(週次インタビュー、Opportunity Solution Tree)の理解を深めます。</div>
            </div>
          </li>
          <li>
            <div class="step-num">5</div>
            <div class="step-body">
              <div class="step-title">Scrum.orgのSuggested Readingのブログ記事群を確認する</div>
              <div class="step-desc">「Work Management with UX」など、公式ガイド本体には載っていない実践的な視点を補います。</div>
            </div>
          </li>
          <li>
            <div class="step-num">6</div>
            <div class="step-body">
              <div class="step-title">本ガイドの模擬問題や、他の非公式練習問題で理解度を確認する</div>
              <div class="step-desc">解けなかった論点は、対応する章に戻って復習しましょう。</div>
            </div>
          </li>
        </ol>
      </section>

      <!-- ===================== 9. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 09</div>
        <h2>参考文献・情報源一覧</h2>

        <div class="ref-group">
          <h3>Scrum.org 公式</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Professional Scrum with User Experience Certification</span><a class="ref-url" href="https://www.scrum.org/assessments/professional-scrum-user-experience-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/professional-scrum-user-experience-certification</a></li>
            <li><span class="ref-name">Suggested Reading for Professional Scrum with User Experience</span><a class="ref-url" href="https://www.scrum.org/resources/suggested-reading-professional-scrum-user-experience" target="_blank" rel="noopener">https://www.scrum.org/resources/suggested-reading-professional-scrum-user-experience</a></li>
            <li><span class="ref-name">The Professional Scrum Competencies</span><a class="ref-url" href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">https://www.scrum.org/professional-scrum-competencies</a></li>
            <li><span class="ref-name">Professional Scrum with User Experience Training</span><a class="ref-url" href="https://www.scrum.org/courses/professional-scrum-user-experience-training" target="_blank" rel="noopener">https://www.scrum.org/courses/professional-scrum-user-experience-training</a></li>
            <li><span class="ref-name">Scrum.org Launches Professional Scrum with User Experience (PSU) Training Course</span><a class="ref-url" href="https://www.scrum.org/resources/scrumorg-launches-professional-scrum-user-experience-psu-training-course" target="_blank" rel="noopener">https://www.scrum.org/resources/scrumorg-launches-professional-scrum-user-experience-psu-training-course</a></li>
            <li><span class="ref-name">Three - Wait: Four - Elements of Empiricism (Scrum.org Blog)</span><a class="ref-url" href="https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>Scrum Guide</h3>
          <ul class="ref-list">
            <li><span class="ref-name">The 2020 Scrum Guide - scrumguides.org</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>Lean UX / 書籍</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Lean UX, 3rd Edition - O'Reilly(Jeff Gothelf, Josh Seiden)</span><a class="ref-url" href="https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/</a></li>
            <li><span class="ref-name">Chapter 7. Integrating Lean UX and Agile - O'Reilly</span><a class="ref-url" href="https://www.oreilly.com/library/view/lean-ux/9781449366834/ch07.html" target="_blank" rel="noopener">https://www.oreilly.com/library/view/lean-ux/9781449366834/ch07.html</a></li>
            <li><span class="ref-name">Lean UX Canvas: A Practical Tool for the Lean UX Process</span><a class="ref-url" href="https://creately.com/guides/lean-ux-canvas/" target="_blank" rel="noopener">https://creately.com/guides/lean-ux-canvas/</a></li>
            <li><span class="ref-name">Facilitating the Lean UX Canvas: A Workshop Guide for Agile Coaches</span><a class="ref-url" href="https://www.senseandrespond.co/blog/lean-ux-canvas-workshop-guide" target="_blank" rel="noopener">https://www.senseandrespond.co/blog/lean-ux-canvas-workshop-guide</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>Continuous Discovery / Dual-Track Agile</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Continuous Discovery Habits - Product Talk(Teresa Torres)</span><a class="ref-url" href="https://www.producttalk.org/continuous-discovery-habits/" target="_blank" rel="noopener">https://www.producttalk.org/continuous-discovery-habits/</a></li>
            <li><span class="ref-name">Continuous discovery habits: how to build and sustain them</span><a class="ref-url" href="https://greatquestion.co/blog/continuous-discovery-habits" target="_blank" rel="noopener">https://greatquestion.co/blog/continuous-discovery-habits</a></li>
            <li><span class="ref-name">What is Dual-Track Agile? - Productboard</span><a class="ref-url" href="https://www.productboard.com/glossary/dual-track-agile/" target="_blank" rel="noopener">https://www.productboard.com/glossary/dual-track-agile/</a></li>
            <li><span class="ref-name">Dual-Track Agile: Managing Discovery and Delivery in a Single Sprint - Sense &amp; Respond Press</span><a class="ref-url" href="https://www.senseandrespond.co/blog/dual-track-agile" target="_blank" rel="noopener">https://www.senseandrespond.co/blog/dual-track-agile</a></li>
            <li><span class="ref-name">Dual-Track Agile: A Practical Guide for Product Teams</span><a class="ref-url" href="https://www.ideaplan.io/guides/dual-track-agile-guide" target="_blank" rel="noopener">https://www.ideaplan.io/guides/dual-track-agile-guide</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>ユーザビリティテスト</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Why You Only Need to Test with 5 Users - Nielsen Norman Group</span><a class="ref-url" href="https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/" target="_blank" rel="noopener">https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/</a></li>
            <li><span class="ref-name">How Many Test Users in a Usability Study? - Nielsen Norman Group</span><a class="ref-url" href="https://www.nngroup.com/articles/how-many-test-users/" target="_blank" rel="noopener">https://www.nngroup.com/articles/how-many-test-users/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>受験体験記(参考・非公式)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Passing the PSU I assessment with 100% - a retrospective (Medium)</span><a class="ref-url" href="https://medium.com/serious-scrum/passing-the-psu-i-assessment-with-100-a-retrospective-97c5f34cb831" target="_blank" rel="noopener">https://medium.com/serious-scrum/passing-the-psu-i-assessment-with-100-a-retrospective-97c5f34cb831</a></li>
            <li><span class="ref-name">How To Pass The Professional Scrum With User Experience (PSU I) Assessment</span><a class="ref-url" href="https://www.thescrummaster.co.uk/scrum/how-to-pass-the-professional-scrum-with-user-experience-i-psu-i-assessment/" target="_blank" rel="noopener">https://www.thescrummaster.co.uk/scrum/how-to-pass-the-professional-scrum-with-user-experience-i-psu-i-assessment/</a></li>
          </ul>
        </div>
      </section>

      <footer>
        本ガイドは学習支援を目的とした非公式の要約・解説であり、Scrum.orgによる公式教材ではありません。Professional Scrum™、Professional Scrum with User Experience™、PSU™、Scrum.org&reg; は Scrum.org の商標です。本ガイドはScrum.orgとは無関係の非公式資料であり、内容の正確性を保証するものではありません。試験の最新の出題範囲・詳細は必ず<a href="https://www.scrum.org/assessments/professional-scrum-user-experience-certification" target="_blank" rel="noopener">Scrum.org公式サイト</a>でご確認ください。
      </footer>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: block;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(22, 27, 38, 0.4);
  backdrop-filter: blur(2px);
  z-index: 25;
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
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.seal {
  width: 40px;
  height: 40px;
  flex: none;
}

.brand-text .brand-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
  color: var(--color-ink);
}

.brand-text .brand-subtitle {
  font-size: 16px;
  color: var(--color-ink-faint);
  line-height: 1.3;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav .nav-group-label {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
  margin: 20px 0 6px 10px;
}

.sidebar-nav .nav-group-label:first-child {
  margin-top: 0;
}

.sidebar-nav li {
  margin: 2px 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  color: var(--color-ink-soft);
  font-size: 16px;
  line-height: 1.4;
  transition: background 0.15s, color 0.15s;
}

.sidebar-nav a :deep(svg),
.sidebar-nav a :deep(.iconify) {
  font-size: 17px;
  color: var(--color-ink-faint);
  flex: none;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  text-decoration: none;
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.sidebar-nav a.active :deep(svg),
.sidebar-nav a.active :deep(.iconify) {
  color: var(--color-indigo);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: calc(var(--global-nav-height) + 16px);
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

.hero-eyebrow :deep(svg),
.hero-eyebrow :deep(.iconify) {
  font-size: 17px;
}

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

section {
  margin: 72px 0;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

section:first-of-type {
  margin-top: 0;
}

:is(section, h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

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

.section-eyebrow :deep(svg),
.section-eyebrow :deep(.iconify) {
  font-size: 17px;
}

.ref-group h3,
.ref-group h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 0.75rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--color-border);
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

p {
  margin: 0 0 18px;
}

ul, ol {
  margin: 0 0 18px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
}

strong {
  font-weight: 600;
  color: var(--color-ink);
}

em {
  color: var(--color-ink-soft);
}

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

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:nth-child(even) {
  background: var(--color-paper);
}

td strong, th strong {
  color: var(--color-ink);
}

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

.callout ul {
  margin-bottom: 0;
  padding-left: 20px;
}

.callout p:last-child {
  margin-bottom: 0;
}

.callout.practice {
  border-left-color: var(--color-gold);
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.source {
  border-left-color: var(--color-forest);
  background: var(--color-forest-tint);
}

.callout.source .callout-title {
  color: var(--color-forest);
}

.callout.source a {
  color: var(--color-forest);
  font-weight: 500;
}

.callout.source ul {
  list-style: none;
  padding-left: 0;
}

.callout.source li {
  margin-bottom: 6px;
  font-size: 16px;
  word-break: break-all;
}

.callout.note {
  border-left-color: var(--color-plum);
}

.callout.note .callout-title {
  color: var(--color-plum);
}

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

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 20px 0;
  text-align: center;
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

.step-body .step-title {
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 4px;
}

.step-body .step-desc {
  color: var(--color-ink-soft);
  font-size: 16px;
}

/* ===================== Quiz cards ===================== */
.quiz-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 12px;
  padding: 24px 28px;
  margin: 24px 0;
}

.quiz-card .quiz-q-label {
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-indigo);
  background: var(--color-indigo-tint);
  padding: 2px 12px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.quiz-card p {
  margin-bottom: 14px;
}

.quiz-card .quiz-options {
  list-style: none;
  padding-left: 0;
  margin-bottom: 6px;
}

.quiz-card .quiz-options li {
  padding: 4px 0 4px 28px;
  position: relative;
  color: var(--color-ink-soft);
}

.quiz-card .quiz-options li strong {
  position: absolute;
  left: 0;
  color: var(--color-ink);
}

.quiz-card details {
  margin-top: 16px;
  border-top: 1px solid var(--color-border);
  padding-top: 14px;
}

.quiz-card summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--color-forest);
  display: flex;
  align-items: center;
  gap: 6px;
}

.quiz-card summary::marker {
  color: var(--color-forest);
}

.quiz-card details p:last-child {
  margin-bottom: 0;
  margin-top: 10px;
}

/* ===================== Reference list ===================== */
.ref-group {
  margin-bottom: 28px;
}

.ref-group h4 {
  margin-top: 0;
}

.ref-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 16px;
}

.ref-list li:last-child {
  border-bottom: none;
}

.ref-list .ref-name {
  color: var(--color-ink);
  font-weight: 500;
  display: block;
  margin-bottom: 2px;
}

.ref-list .ref-url {
  color: var(--color-ink-faint);
  word-break: break-all;
}

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
  .sidebar-toggle {
    display: flex;
  }

  .sidebar {
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.2s ease, visibility 0.2s ease;
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
    visibility: visible;
  }

  .main-content {
    margin-left: 0;
    padding: 88px 24px 100px;
  }

  .hero h1 {
    font-size: 32px;
  }

  .stat-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .stat-row {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar {
    transition: none;
  }
}
</style>
