<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { nextTick, ref } from "vue";
import { useActiveHeading } from "~/composables/useActiveHeading";

const LIGHT_THEME_VARS = {
  fontSize: "16px",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#2E3F72",
  secondaryColor: "#FAF1DF",
  secondaryBorderColor: "#B8802A",
  tertiaryColor: "#FFFFFF",
};

// 0.4 studyRoadmap
const DIAGRAM_STUDY_ROADMAP = `flowchart LR
F["PRINCE2 Agile Foundation (Version 2)"] --> P["PRINCE2 Agile Practitioner (Version 2)"]
P --> E["PRINCE2 Agile Expert (Foundation + Practitioner 取得で到達)"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class F hub;
class P box;
class E done;`;

// 1.4 processFlow
const DIAGRAM_PROCESS_FLOW = `flowchart TB
DP["Directing a Project (プロジェクト指揮)"]
SU["Starting up a Project (立ち上げ)"] --> IP["Initiating a Project (開始)"]
IP --> CS["Controlling a Stage (ステージ管理)"]
CS --> MP["Managing Product Delivery (プロダクト提供管理)"]
MP --> CS
CS --> SB["Managing a Stage Boundary (ステージ境界管理)"]
SB --> CS
SB --> CP["Closing a Project (プロジェクト終結)"]
DP --- SU
DP --- IP
DP --- CS
DP --- SB
DP --- CP

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class DP hub;
class SU,IP,CS,MP,SB,CP box;`;

// 2.3 blendWeaveLevels
const DIAGRAM_BLEND_WEAVE_LEVELS = `flowchart TB
subgraph DirLevel["Direct (指揮レベル)"]
  Board["プロジェクトボード (ビジネス・ユーザー・サプライヤ)"]
end
subgraph MgtLevel["Manage (管理レベル)"]
  PM["プロジェクトマネージャー"]
end
subgraph DelLevel["Deliver (デリバリーレベル: アジャイル適用の中核)"]
  TL["チームリーダー / スクラムマスター"]
  Dev["デリバリーチーム (スプリント / カンバン)"]
end
DirLevel --> MgtLevel
MgtLevel --> DelLevel

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class Board hub;
class PM,TL,Dev box;`;

// 4.2.1 scrumCycle
const DIAGRAM_SCRUM_CYCLE = `flowchart LR
PB["プロダクトバックログ"] --> SP["スプリントプランニング"]
SP --> SB["スプリントバックログ"]
SB --> SPR["スプリント実行 (1-4週間)"]
SPR --> SR["スプリントレビュー"]
SPR --> RET["レトロスペクティブ"]
SR --> INC["完成したインクリメント"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PB,INC hub;
class SP,SB,SPR,SR,RET box;`;

// 4.2.2 kanbanFlow
const DIAGRAM_KANBAN_FLOW = `flowchart LR
TODO["To Do (バックログ)"] --> ANALYZE["分析中 (WIP: 3)"]
ANALYZE --> DEV["開発中 (WIP: 4)"]
DEV --> TEST["テスト中 (WIP: 2)"]
TEST --> DONE["Done (完了)"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class DONE hub;
class TODO,ANALYZE,DEV,TEST box;`;

// 4.2.3 leanStartupLoop
const DIAGRAM_LEAN_STARTUP_LOOP = `flowchart LR
IDEA["アイデア"] --> BUILD["構築 (Build)"]
BUILD --> PROD["MVP / 計測可能プロダクト"]
PROD --> MEASURE["計測 (Measure)"]
MEASURE --> DATA["データ"]
DATA --> LEARN["学習 (Learn: ピボットまたは維持)"]
LEARN --> IDEA

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class IDEA,PROD,DATA hub;
class BUILD,MEASURE,LEARN box;`;

// 5.1 focusAreasOverview
const DIAGRAM_FOCUS_AREAS_OVERVIEW = `flowchart TB
FA["PRINCE2 Agile 5つのフォーカスエリア"]
FA --> AG["Agilometer (環境適合度評価)"]
FA --> RQ["Requirements (要求事項: 優先順位付けと変更)"]
FA --> RC["Rich Communication (コミュニケーションの最適化)"]
FA --> FR["Frequent Releases (早期・頻繁な価値提供)"]
FA --> CC["Contracts (アジャイル契約: Practitioner 範囲)"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class FA hub;
class AG,RQ,RC,FR box;`;

// 6.2 studySteps
const DIAGRAM_STUDY_STEPS = `flowchart TB
S1["Step 1: 第1部で PRINCE2 の土台(原則・テーマ・プロセス・管理プロダクト・ロール)を固める"] --> S2["Step 2: 第2部で PRINCE2 Agile の基本思想(ブレンドとウィーブ・ロール)を理解する"]
S2 --> S3["Step 3: 第3部でテーマ・プロセスの個別適用とヘキサゴン(固定と柔軟)を徹底理解"]
S3 --> S4["Step 4: 第4部でスクラム・カンバン・リーンスタートアップの基本用語を押さえる"]
S4 --> S5["Step 5: 第5部で4つのフォーカスエリア(特にアジロメーター・MoSCoW)を攻略する"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class S1 hub;
class S2,S3,S4,S5 box;`;

const TOC_IDS = [
  "about-the-exam",
  "prince2-fundamentals",
  "prince2-agile-basics",
  "agile-tailoring",
  "agile-glossary-techniques",
  "focus-areas",
  "exam-preparation",
  "glossary-summary",
  "references",
] as const;

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);
const activeId = useActiveHeading(TOC_IDS);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

useSeoMeta({
  title: "PRINCE2 Agile Foundation (Version 2) 学習ガイド | PeopleCert公式シラバス準拠",
  description: "PeopleCert PRINCE2 Agile Foundation (Version 2) 試験の出題範囲を、初学者向けにステップバイステップで解説する学習ガイド。7原則・7テーマ・7プロセスのアジャイル適用、Agilometer、MoSCoWなどをMermaid図解付きで網羅。",
});
</script>

<template>
  <div>
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      :aria-expanded="sidebarOpen"
      aria-controls="sidebar"
      aria-label="目次を開閉する"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div class="layout">
      <aside id="sidebar" class="sidebar" :class="{ 'is-open': sidebarOpen }" aria-label="目次">
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="brand-text">
            <div class="brand-title">PRINCE2 Agile®</div>
            <div class="brand-subtitle">Foundation Version 2</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li class="nav-group-label">概要</li>
          <li><a href="#about-the-exam" :class="{ active: activeId === 'about-the-exam' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />この資格について</a></li>

          <li class="nav-group-label">コア知識</li>
          <li><a href="#prince2-fundamentals" :class="{ active: activeId === 'prince2-fundamentals' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />第1部: PRINCE2 の基礎知識</a></li>
          <li><a href="#prince2-agile-basics" :class="{ active: activeId === 'prince2-agile-basics' }" @click="closeSidebar"><Icon name="tabler:layers-intersect" aria-hidden="true" />第2部: PRINCE2 Agile の基本概念</a></li>
          <li><a href="#agile-tailoring" :class="{ active: activeId === 'agile-tailoring' }" @click="closeSidebar"><Icon name="tabler:adjustments" aria-hidden="true" />第3部: 原則・テーマ・プロセスの適用</a></li>

          <li class="nav-group-label">実践とフォーカスエリア</li>
          <li><a href="#agile-glossary-techniques" :class="{ active: activeId === 'agile-glossary-techniques' }" @click="closeSidebar"><Icon name="tabler:tool" aria-hidden="true" />第4部: 実践用語と技法</a></li>
          <li><a href="#focus-areas" :class="{ active: activeId === 'focus-areas' }" @click="closeSidebar"><Icon name="tabler:target-arrow" aria-hidden="true" />第5部: フォーカスエリア</a></li>

          <li class="nav-group-label">試験対策と付録</li>
          <li><a href="#exam-preparation" :class="{ active: activeId === 'exam-preparation' }" @click="closeSidebar"><Icon name="tabler:bulb" aria-hidden="true" />第6部: 試験対策</a></li>
          <li><a href="#glossary-summary" :class="{ active: activeId === 'glossary-summary' }" @click="closeSidebar"><Icon name="tabler:vocabulary" aria-hidden="true" />付録: 用語集まとめ</a></li>
          <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・出典</a></li>
        </ul>
      </aside>

      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />PeopleCert公式シラバス準拠 学習ガイド</div>
          <h1>PRINCE2 Agile Foundation (Version 2) 学習ガイド</h1>
          <p class="hero-lede">
            初学者向け・ステップバイステップ解説 / Markdown + Mermaid図解版。対象試験: PeopleCert PRINCE2 Agile Foundation (Version 2)。公式製品ページ: <a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074" target="_blank" rel="noopener">peoplecert.org</a>
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">40問</div><div class="stat-label">四肢択一 (Objective Test Question)</div></div>
            <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">クローズドブック</div></div>
            <div class="stat-card"><div class="stat-number">60%</div><div class="stat-label">合格基準</div></div>
            <div class="stat-card"><div class="stat-number">3年</div><div class="stat-label">認定有効期間</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>本ガイドは学習支援を目的とした非公式の解説資料です。出題範囲・試験形式・合格基準は改定される可能性があるため、受験前には必ず<a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074" target="_blank" rel="noopener">PeopleCert公式サイト</a>で最新情報をご確認ください。</span>
          </div>
        </div>

        <!-- ===================== 0. About the Exam ===================== -->
        <section id="about-the-exam">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
          <h2>この資格について</h2>

          <h3>0.1 資格の位置づけ</h3>
          <p>PRINCE2 Agile Foundation は、世界で最も広く使われているプロジェクトマネジメント手法 <strong>PRINCE2</strong> の統制・ガバナンスの枠組みと、<strong>アジャイル (Agile)</strong> の柔軟性・反復性を組み合わせた「PRINCE2 Agile」の基礎知識を認定する資格です。対象者は、アジャイル実務者、プロジェクトマネージャー、プロダクトオーナー、Scrum Master、開発者など、反復的・漸進的なプロダクトデリバリーに関わるすべての人です。前提資格は不要です。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <p>PRINCE2 Agile は「PRINCE2 か Agile か」の二択ではなく、両方の強みを状況に応じて「どの程度」組み合わせるかを判断する手法です。学習の最初の段階で、この「二項対立で考えない」という姿勢を意識しておくと、以降の全テーマの理解が格段にスムーズになります。</p>
          </div>

          <h3>0.2 試験概要</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>出題形式</td><td>四肢択一 (Objective Test Question)</td></tr>
                <tr><td>問題数</td><td>40問</td></tr>
                <tr><td>試験時間</td><td>60分 (英語を母語・業務言語としない受験者は+25%の延長が可能な場合あり)</td></tr>
                <tr><td>合格基準</td><td>60%</td></tr>
                <tr><td>教材持ち込み</td><td>クローズドブック (不可)</td></tr>
                <tr><td>前提資格</td><td>なし</td></tr>
                <tr><td>認定有効期間</td><td>3年 (更新には CPD ポイントの取得、または同スイート内の別資格取得が必要)</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074" target="_blank" rel="noopener">PeopleCert 公式製品ページ「PRINCE2 Agile Foundation (Version 2)」</a></li>
            </ul>
          </div>

          <h3>0.3 出題範囲 (Learning Outcome) の全体像</h3>
          <p>公式のシラバス文書では、出題範囲は次の5つの Learning Outcome (学習成果) に分かれています。本ガイドの第1部から第5部は、この5つの Learning Outcome にそのまま対応しています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>LO</th><th>タイトル</th><th>本ガイドの対応章</th></tr></thead>
              <tbody>
                <tr><td>LO1</td><td>プロジェクトと PRINCE2 に関する主要概念の理解</td><td>第1部</td></tr>
                <tr><td>LO2</td><td>プロジェクトと PRINCE2 Agile に関する主要概念の理解</td><td>第2部</td></tr>
                <tr><td>LO3</td><td>PRINCE2 の原則・テーマ・プロセス・管理プロダクトがアジャイル文脈でどのようにテーラリング・適用されるかの理解</td><td>第3部</td></tr>
                <tr><td>LO4</td><td>アジャイルな働き方・主要用語・技法の理解</td><td>第4部</td></tr>
                <tr><td>LO5</td><td>アジャイル文脈におけるフォーカスエリアの理解</td><td>第5部</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf" target="_blank" rel="noopener">PeopleCert / (旧)AXELOS「PRINCE2 Agile Foundation Candidate Syllabus」</a></li>
              <li><a href="https://www.oxfordcollegeofmanagement.com/wp-content/uploads/2025/06/PRINCE2-Agile-Foundation-Syllabus.pdf" target="_blank" rel="noopener">https://www.oxfordcollegeofmanagement.com/wp-content/uploads/2025/06/PRINCE2-Agile-Foundation-Syllabus.pdf</a></li>
            </ul>
          </div>

          <div class="callout note" data-variant="note" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p><strong>バージョンに関する留意点:</strong> 上記2件の Candidate Syllabus は PeopleCert の公式ドメインではなく第三者サイトによる非公式ミラー(参考文献・出典の8.2節参照)であり、試験時間・問題数・合格ラインについて「50問・55%合格」という、現行の PeopleCert 製品ページ(Version 2)の「40問・60分・60%合格」とは異なる旧版の情報を記載しています。このミラー文書だけでは、出題範囲(LO1〜LO5)やテーマ構成が Version 2 化後も変わっていないかどうかを確認できません。また PRINCE2 Agile は PRINCE2 の土台の上に成り立つ手法であり、PeopleCert は PRINCE2 側も「PRINCE2 Project Management Version 7」として改定を行っているため、本ガイドが扱う7つのテーマ等の用語・範囲が Version 7 の内容と整合しているかも合わせて確認が必要です。<strong>受験前には必ず PeopleCert 公式サイトで最新の Candidate Syllabus・試験概要、および PRINCE2 Project Management Version 7 との用語・範囲の整合性を確認してください。</strong></p>
          </div>

          <h3>0.4 学習の全体マップ</h3>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_STUDY_ROADMAP" theme="base" :theme-variables="LIGHT_THEME_VARS" />
            </ClientOnly>
            <div class="diagram-caption">Foundation から Practitioner・Expert への学習ロードマップ</div>
          </div>

          <p>Foundation は「知識の再認・理解 (recall と comprehension)」を問う試験であるのに対し、Practitioner はケーススタディに基づく「適用力」を問う試験です。Foundation の内容を土台として、まず全体像を正確に押さえることが Practitioner 合格への近道です。</p>
        </section>

        <!-- ===================== 1. PRINCE2 Fundamentals ===================== -->
        <section id="prince2-fundamentals">
<div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
      <h2>第1部: PRINCE2 の基礎知識 (Learning Outcome 1)</h2>

      <p>PRINCE2 Agile はあくまで PRINCE2 という「土台」の上に成り立つ手法です。まず土台となる PRINCE2 そのものの構造を正確に理解しておきましょう。</p>

      <h3>1.1 プロジェクトと PRINCE2 の基本概念</h3>
      <p>PRINCE2 では、<strong>プロジェクト (Project)</strong> を「合意されたビジネスケースに基づき、1つ以上のビジネスプロダクトを提供するために作られる、一時的な組織」と定義します。これは日常的な業務である <strong>BAU (Business As Usual)</strong> と対比されます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>プロジェクト</th><th>BAU (定常業務)</th></tr></thead>
          <tbody>
            <tr><td>期間</td><td>一時的 (開始と終了がある)</td><td>継続的</td></tr>
            <tr><td>目的</td><td>変化 (Change) を生み出す</td><td>現状の運用を維持する</td></tr>
            <tr><td>性質</td><td>独自性が高い、リスクが相対的に大きい</td><td>繰り返し性が高い、リスクが相対的に安定</td></tr>
            <tr><td>組織</td><td>プロジェクトのために臨時に編成される</td><td>恒常的な組織構造</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>「この作業はプロジェクトなのか BAU なのか」を最初に切り分けることは、ガバナンスの設計(誰が承認するか、どの程度の統制が必要か)を決める出発点になります。アジャイルなプロダクトチームであっても、予算・期限・ビジネスケースを伴う独立した取り組みであれば PRINCE2 のプロジェクト定義に当てはまります。</p>
      </div>

      <h3>1.2 PRINCE2 の7つのプリンシプル (原則)</h3>
      <p>プリンシプルは、その取り組みが本当に PRINCE2 で管理されていると言えるかどうかを判断する「守るべき指針」です。7つすべてを適用してはじめて PRINCE2 と呼べます(テーラリング=調整は可能ですが、原則そのものを省略することはできません)。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>原則</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>継続的なビジネス正当化 (Continued business justification)</td><td>プロジェクトを開始・継続する正当な理由が常に存在し、記録・承認され、有効であり続けることを確認する</td></tr>
            <tr><td>2</td><td>経験からの学習 (Learn from experience)</td><td>過去の経験・教訓を探し、記録し、以降のプロジェクトに活かす</td></tr>
            <tr><td>3</td><td>役割と責任の明確化 (Defined roles and responsibilities)</td><td>誰が何に責任を持つかを明確にし、ビジネス・ユーザー・サプライヤーの利害を代表する体制を作る</td></tr>
            <tr><td>4</td><td>段階(ステージ)による管理 (Manage by stages)</td><td>プロジェクトを複数のマネジメントステージに分割し、計画・監視・コントロールを段階的に行う</td></tr>
            <tr><td>5</td><td>例外による管理 (Manage by exception)</td><td>各管理レベルに許容範囲(トレランス)を設定し、逸脱時のみ上位レベルへエスカレーションする</td></tr>
            <tr><td>6</td><td>プロダクトへの焦点 (Focus on products)</td><td>何をするか(活動)ではなく、何を生み出すか(プロダクトの品質要件)に焦点を当てる</td></tr>
            <tr><td>7</td><td>プロジェクト環境に合わせたテーラリング (Tailor to suit the project environment)</td><td>プロジェクトの規模・複雑さ・重要性・能力・リスクに応じて手法を調整する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>7原則の中でも「例外による管理」と「プロジェクト環境に合わせたテーラリング」は、後述するアジャイルとの親和性が特に高い原則です。自己組織化チームへの権限委譲(=例外による管理)と、状況に応じた運用調整(=テーラリング)は、PRINCE2 Agile を理解する上での重要な橋渡しになります。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf" target="_blank" rel="noopener">PeopleCert / AXELOS 公式シラバス Learning Outcome 1.1 (7原則の一覧)</a></li>
        </ul>
      </div>

      <h3>1.3 PRINCE2 の7つのテーマ</h3>
      <p>テーマは、プロジェクトマネジメントの特定の側面について、常に対応し続ける必要がある領域です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>テーマ</th><th>目的 (何を扱うか)</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>ビジネスケース (Business Case)</td><td>プロジェクトが望ましく、実行可能で、実現可能であり、投資に値することを立証・維持する仕組み</td></tr>
            <tr><td>2</td><td>組織 (Organization)</td><td>プロジェクトに関わる人々の役割と責任、指揮命令系統を定義する仕組み</td></tr>
            <tr><td>3</td><td>品質 (Quality)</td><td>プロダクトが目的に適合していることを確実にするための、品質要件の定義と検証の仕組み</td></tr>
            <tr><td>4</td><td>計画 (Plans)</td><td>プロダクトを土台にした計画づくりのステップと、進捗のコミュニケーション手段</td></tr>
            <tr><td>5</td><td>リスク (Risk)</td><td>不確実性を識別・評価し、プロジェクトの目的達成への影響をマネジメントする仕組み</td></tr>
            <tr><td>6</td><td>変更 (Change)</td><td>変更要求や懸念事項(イシュー)を識別・評価・コントロールする仕組み</td></tr>
            <tr><td>7</td><td>進捗 (Progress)</td><td>計画に対する実績を監視し、継続の可否を判断し、コントロールを行う仕組み</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>テーマは独立した「知識エリア」ではなく、相互に密接に連動しています。例えばリスクの深刻化はビジネスケースの見直しを引き起こし、それが進捗コントロールでの意思決定につながる、というように連鎖します。7テーマを暗記する際は「単独の定義」よりも「テーマ同士のつながり」を意識すると、第3部のアジャイル適用の理解が格段に深まります。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf" target="_blank" rel="noopener">PeopleCert / AXELOS 公式シラバス Learning Outcome 1.2</a></li>
        </ul>
      </div>

      <h3>1.4 PRINCE2 の7つのプロセス</h3>
      <p>プロセスは、プロジェクトの開始から終結までの活動の流れを示します。<strong>Directing a Project (プロジェクト指揮)</strong> はプロジェクトボードによる意思決定プロセスであり、他の全プロセスを横断的に統制します。</p>

      <div class="mermaid-wrap">
  <ClientOnly>
    <MermaidDiagram :chart="DIAGRAM_PROCESS_FLOW" theme="base" :theme-variables="LIGHT_THEME_VARS" />
  </ClientOnly>
  <div class="diagram-caption">PRINCE2 の7プロセスの関係(Directing a Project が全体を統制する)</div>
</div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>プロセス</th><th>主な目的</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Starting up a Project (立ち上げ)</td><td>プロジェクトが実施する価値があるかを確認する準備段階。プロジェクト概要書(Project Brief)を作成する</td></tr>
            <tr><td>2</td><td>Initiating a Project (開始)</td><td>プロジェクトの土台を固める。プロジェクト・イニシエーション・ドキュメンテーション(PID)を作成する</td></tr>
            <tr><td>3</td><td>Directing a Project (指揮)</td><td>プロジェクトボードが主要な意思決定を行う(継続可否、例外対応の承認など)</td></tr>
            <tr><td>4</td><td>Controlling a Stage (ステージ管理)</td><td>プロジェクトマネージャーが日々のステージ運営を行い、ワークパッケージを割り当てる</td></tr>
            <tr><td>5</td><td>Managing Product Delivery (プロダクト提供管理)</td><td>チームマネージャーがワークパッケージを受け取り、プロダクトを作成・納品する</td></tr>
            <tr><td>6</td><td>Managing a Stage Boundary (ステージ境界管理)</td><td>現ステージの完了報告と次ステージの計画をプロジェクトボードに提示する</td></tr>
            <tr><td>7</td><td>Closing a Project (終結)</td><td>プロジェクトを正式に終結し、成果と教訓を確定する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>アジャイルなプロダクトチームは Managing Product Delivery と Controlling a Stage の間を、スプリントや反復のサイクルとして日々経験することになります。この2プロセスの「反復のリズム」こそが、PRINCE2 の段階的な統制とアジャイルのタイムボックスが接続する最重要ポイントです。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf" target="_blank" rel="noopener">PeopleCert / AXELOS 公式シラバス Learning Outcome 1.3</a></li>
        </ul>
      </div>

      <h3>1.5 PRINCE2 の主要な管理プロダクト</h3>
      <p>管理プロダクト(マネジメントプロダクト)は、プロジェクトのガバナンスに使われる文書類です。Foundation 試験では次の7種類が中心的に問われます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>管理プロダクト</th><th>目的</th></tr></thead>
          <tbody>
            <tr><td>ビジネスケース (Business Case)</td><td>投資判断の根拠となる、プロジェクトの妥当性・実行可能性を記録する文書</td></tr>
            <tr><td>チェックポイントレポート (Checkpoint Report)</td><td>チームマネージャーからプロジェクトマネージャーへの定期的な進捗報告</td></tr>
            <tr><td>ハイライトレポート (Highlight Report)</td><td>プロジェクトマネージャーからプロジェクトボードへの定期的な進捗報告</td></tr>
            <tr><td>プロジェクト概要書 (Project Brief)</td><td>プロジェクトを開始する価値があるかを判断するための概要情報</td></tr>
            <tr><td>プロジェクト・イニシエーション・ドキュメンテーション (PID)</td><td>プロジェクトの「何を・なぜ・誰が・どのように」を定義する基準文書一式</td></tr>
            <tr><td>プロジェクトプロダクト記述書 (Project Product Description)</td><td>プロジェクト全体の最終成果物とその品質要件を定義する文書</td></tr>
            <tr><td>ワークパッケージ (Work Package)</td><td>チームマネージャー(または個人)に委任される作業内容の合意文書</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>アジャイル文脈では、これらの文書を「一度作って終わり」の静的なものと捉えず、継続的に更新される「生きた(living)」情報源として運用します。特にハイライトレポートやチェックポイントレポートは、情報ラジエーター(Information Radiator)やバーンチャートで代替・補強されることが多く、第3部で詳しく解説します。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf" target="_blank" rel="noopener">PeopleCert / AXELOS 公式シラバス Learning Outcome 1.4</a></li>
        </ul>
      </div>

      <h3>1.6 PRINCE2 の主要ロール</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ロール</th><th>責任の概要</th></tr></thead>
          <tbody>
            <tr><td>プロジェクトボード (Project Board)</td><td>プロジェクト全体に説明責任を負う意思決定機関(Executive・Senior User・Senior Supplier で構成)</td></tr>
            <tr><td>Executive (エグゼクティブ)</td><td>プロジェクトの投資対効果に最終責任を持つ、プロジェクトボードの議長役</td></tr>
            <tr><td>Senior User (シニアユーザー)</td><td>プロダクトを利用する立場を代表し、ベネフィット実現に責任を持つ</td></tr>
            <tr><td>Senior Supplier (シニアサプライヤー)</td><td>プロダクトを提供するリソース・専門知識を代表する</td></tr>
            <tr><td>Project Manager (プロジェクトマネージャー)</td><td>プロジェクトの日々のマネジメントに責任を持つ</td></tr>
            <tr><td>Team Manager (チームマネージャー)</td><td>ワークパッケージを受け取り、プロダクトの作成を管理する(アジャイルでは Scrum Master がこの役割を兼ねることが多い)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>アジャイルなデリバリーチームでは「チームマネージャー」という肩書きは使われず、Scrum Master やプロダクトオーナーといったアジャイル固有の呼称が使われます。試験対策としては、PRINCE2 の役割名とアジャイルでの一般的な呼称の「対応関係」を意識して覚えると混乱を避けられます(詳細は 2.4 節)。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.koenig-solutions.com/CourseContent/custom/2019617460-PRINCE2AgileFoundationCandidateSyllabus.pdf" target="_blank" rel="noopener">PeopleCert / AXELOS 公式シラバス Learning Outcome 1.5</a></li>
        </ul>
      </div>
        </section>

        <!-- ===================== 2. PRINCE2 Agile Basics ===================== -->
        <section id="prince2-agile-basics">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 03</div>
          <h2>第2部: PRINCE2 Agile の基本概念 (Learning Outcome 2)</h2>
        </section>

        <!-- ===================== 3. Agile Tailoring ===================== -->
        <section id="agile-tailoring">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 04</div>
          <h2>第3部: 原則・テーマ・プロセス・管理プロダクトのアジャイルへの適用 (Learning Outcome 3)</h2>
        </section>

        <!-- ===================== 4. Agile Glossary & Techniques ===================== -->
        <section id="agile-glossary-techniques">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 05</div>
          <h2>第4部: アジャイルの実践用語と技法 (Learning Outcome 4)</h2>
        </section>

        <!-- ===================== 5. Focus Areas ===================== -->
        <section id="focus-areas">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 06</div>
          <h2>第5部: フォーカスエリア (Learning Outcome 5)</h2>
        </section>

        <!-- ===================== 6. Exam Preparation ===================== -->
        <section id="exam-preparation">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 07</div>
          <h2>第6部: 試験対策</h2>
        </section>

        <!-- ===================== 7. Glossary Summary ===================== -->
        <section id="glossary-summary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 08</div>
          <h2>付録: 用語集まとめ表</h2>
        </section>

        <!-- ===================== 8. References ===================== -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 09</div>
          <h2>参考文献・出典</h2>
        </section>

        <footer>
          本ガイドは、公式・非公式情報源をもとに独自にまとめた学習教材です。原著作物からの長文引用は行わず、内容は要約・翻訳・再構成した独自の解説となっています。試験の出題範囲・形式は改定される可能性があるため、受験前には必ず PeopleCert 公式サイトで最新情報をご確認ください。<br>
          PRINCE2® および PRINCE2 Agile® は AXELOS Limited の登録商標です。本ガイドは PeopleCert / AXELOS の公式資料ではありません。
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
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

.sidebar-nav a :deep(.iconify) {
  font-size: 17px;
  color: var(--color-ink-faint);
  flex: none;
}

.sidebar-nav a:hover {
  background: var(--color-indigo-tint);
  text-decoration: none;
  color: var(--color-indigo);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
  border-left-color: var(--color-indigo);
}

.sidebar-nav a.active :deep(.iconify) {
  color: var(--color-indigo);
}

/* ===================== Main Content ===================== */
.main-content {
  margin-left: var(--sidebar-width);
  padding: 48px 64px 96px;
  max-width: none;
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-indigo);
  background: var(--color-indigo-tint);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
}

h1 {
  font-family: var(--font-display);
  font-size: 36px;
  line-height: 1.25;
  color: var(--color-ink);
  margin: 0 0 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.hero-lede {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px 20px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 4px;
  line-height: 1.4;
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

/* ===================== Sections & Typography ===================== */
section {
  margin-bottom: 64px;
}

:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h2 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-indigo);
  letter-spacing: -0.005em;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-ink);
  margin: 36px 0 16px;
}

h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink);
  margin: 24px 0 12px;
}

p { margin: 0 0 16px; }

ul, ol { margin: 0 0 18px; padding-left: 24px; }
li { margin-bottom: 8px; }

/* ===================== Tables ===================== */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 20px 0 28px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

th {
  background: var(--color-paper-sunken);
  font-weight: 600;
  color: var(--color-ink);
  white-space: nowrap;
}

tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--color-paper-sunken); }

/* ===================== Callouts ===================== */
.callout {
  border-radius: 8px;
  padding: 16px 20px;
  margin: 20px 0 24px;
  border-left: 4px solid var(--color-border-strong);
  background: var(--color-paper-raised);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 16px;
}

.callout-title :deep(.iconify) { font-size: 18px; flex: none; }

.callout p:last-child { margin-bottom: 0; }

.callout.practice {
  border-left-color: var(--color-gold);
  background: #FAF8F2;
}
.callout.practice .callout-title { color: var(--color-gold); }

.callout.source {
  border-left-color: var(--color-indigo);
  background: var(--color-indigo-tint);
}
.callout.source .callout-title { color: var(--color-indigo); }
.callout.source ul { list-style: none; padding-left: 0; margin-bottom: 0; }
.callout.source li { margin-bottom: 6px; font-size: 16px; word-break: break-all; }

.callout.note {
  border-left-color: var(--color-forest);
  background: var(--color-forest-tint);
}
.callout.note .callout-title { color: var(--color-forest); }

/* ===================== Diagrams ===================== */
.diagram-card {
  margin: 24px 0 32px;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 24px;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 14px;
  font-weight: 500;
}

/* ===================== Step List & Ref List ===================== */
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.step-body { flex: 1; }
.step-title { font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
.step-desc { font-size: 16px; color: var(--color-ink-soft); margin: 0; }

.ref-group { margin-bottom: 28px; }
.ref-list { list-style: none; margin: 0; padding: 0; }
.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 16px;
}
.ref-list li:last-child { border-bottom: none; }
.ref-list .ref-name { color: var(--color-ink); font-weight: 500; display: block; margin-bottom: 2px; }
.ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; }

/* ===================== Footer ===================== */
footer {
  margin-top: 80px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  font-size: 16px;
  color: var(--color-ink-faint);
  line-height: 1.6;
}

/* ===================== Mobile Sidebar Toggle ===================== */
.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #fff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 30;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

@media (max-width: 980px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }
  .sidebar.is-open {
    transform: translateX(0);
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  }
  .sidebar-toggle { display: flex; }
  .main-content {
    margin-left: 0;
    padding: 32px 20px 80px;
  }
}
</style>
