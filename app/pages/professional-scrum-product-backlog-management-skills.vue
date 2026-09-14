<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-this-guide",
  "exam-overview",
  "competencies-framework",
  "what-is-product-backlog",
  "product-vision-and-goal",
  "forming-the-backlog",
  "refinement",
  "ordering-and-prioritization",
  "stakeholders-and-customers",
  "empiricism-and-ebm",
  "ai-and-backlog-management",
  "misconceptions-and-antipatterns",
  "exam-prep-tips",
  "glossary",
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
  title: "PSPBM(Professional Scrum Product Backlog Management Skills)認定 完全ガイド | プロダクトバックログマネジメント実践知識",
  description:
    "Scrum.org Professional Scrum Product Backlog Management Skills(PSPBM)認定試験の出題範囲を、初学者向けに図解とベストプラクティス、一次情報ソース付きで解説する学習ガイド。",
});

const LIGHT_THEME_VARS = {
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

const DIAGRAM_COMPETENCIES_OVERVIEW = `flowchart TB
    A["Understanding and Applying the Scrum Framework<br/>Scrumフレームワークの理解と適用<br/>すべての土台"]
    B["Developing People and Teams<br/>人とチームの育成"]
    C["Managing Products with Agility<br/>アジリティを持ったプロダクトマネジメント<br/>PSPBM Skillsの主領域"]
    D["Developing and Delivering Products Professionally<br/>プロフェッショナルなプロダクト開発と提供"]
    E["Evolving the Agile Organization<br/>アジャイル組織への進化"]

    A --> B
    A --> C
    A --> D
    A --> E

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class C done;
    class B,D,E box;`;

const DIAGRAM_ARTIFACTS_FLOW = `flowchart LR
    PV["Product Vision<br/>プロダクトビジョン<br/>長期・恒久的な方向性"] --> PB["Product Backlog<br/>プロダクトバックログ<br/>創発的・順序付き"]
    PB --> SB["Sprint Backlog<br/>スプリントバックログ"]
    SB --> INC["Increment<br/>インクリメント"]
    PB -.->|"コミットメント"| PG["Product Goal<br/>プロダクトゴール<br/>コミットメント 長期目標"]
    SB -.->|"コミットメント"| SG["Sprint Goal<br/>スプリントゴール<br/>コミットメント"]
    INC -.->|"コミットメント"| DoD["Definition of Done<br/>完成の定義 コミットメント"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class PG,SG,DoD hub;
    class PV,PB,SB,INC box;`;

const DIAGRAM_SPLITTING_DECISION_FLOW = `flowchart TD
    START["大きすぎるPBI<br/>Epicレベル"] --> Q1{"未知の技術的<br/>不確実性がある?"}
    Q1 -- "はい" --> SP["Spike調査として切り出す"]
    Q1 -- "いいえ" --> Q2{"複数の処理経路や<br/>選択肢がある?"}
    Q2 -- "はい" --> PA["Pathごとに分割"]
    Q2 -- "いいえ" --> Q3{"複数のUIや<br/>チャネルに対応?"}
    Q3 -- "はい" --> IF["Interfaceごとに分割"]
    Q3 -- "いいえ" --> Q4{"扱うデータの種類が<br/>複数ある?"}
    Q4 -- "はい" --> DA["Dataの種類ごとに分割"]
    Q4 -- "いいえ" --> Q5{"複雑なビジネスルールを<br/>多く含む?"}
    Q5 -- "はい" --> RU["Ruleの適用範囲で段階分割"]
    Q5 -- "いいえ" --> READY["1スプリントで完成可能な<br/>サイズと判断"]

    SP --> READY
    PA --> READY
    IF --> READY
    DA --> READY
    RU --> READY

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Q1,Q2,Q3,Q4,Q5 hub;
    class SP,PA,IF,DA,RU box;
    class READY done;`;

const DIAGRAM_STAKEHOLDER_CYCLE = `flowchart LR
    A["ステークホルダーの<br/>ニーズ・フィードバック"] --> B["プロダクトバックログの<br/>形成 リファインメント"]
    B --> C["並び替え<br/>価値順"]
    C --> D["Sprintでの実施<br/>Increment作成"]
    D --> E["Sprint Reviewでの<br/>検査と協働"]
    E --> A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`;

const DIAGRAM_EBM_KVA_DIAGRAM = `flowchart TB
    subgraph EBM["Evidence-Based Managementの4つのKey Value Areas"]
        CV["Current Value<br/>現在届いている価値"]
        UV["Unrealized Value<br/>未実現の価値"]
        A2I["Ability to Innovate<br/>革新する能力"]
        T2M["Time to Market<br/>市場投入までの速度"]
    end
    CV -.->|"継続測定"| DECISION["プロダクトバックログの<br/>内容・並び順の意思決定"]
    UV -.->|"継続測定"| DECISION
    A2I -.->|"継続測定"| DECISION
    T2M -.->|"継続測定"| DECISION
    DECISION -->|"実験・リリース"| CV

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class CV,UV,A2I,T2M hub;
    class DECISION box;`;
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

    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">PSPBM&reg; 完全ガイド</div>
          <div class="brand-subtitle">Product Backlog Management Skills</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a href="#about-this-guide" :class="{ active: activeId === 'about-this-guide' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />本ガイドについて</a></li>
        <li><a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />認定試験の概要</a></li>
        <li><a href="#competencies-framework" :class="{ active: activeId === 'competencies-framework' }" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />Competencies フレームワーク</a></li>
        <li><a href="#what-is-product-backlog" :class="{ active: activeId === 'what-is-product-backlog' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" aria-hidden="true" />Ch1: プロダクトバックログとは</a></li>
        <li><a href="#product-vision-and-goal" :class="{ active: activeId === 'product-vision-and-goal' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />Ch2: ビジョンとゴール</a></li>
        <li><a href="#forming-the-backlog" :class="{ active: activeId === 'forming-the-backlog' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />Ch3: 形成(Forming)</a></li>
        <li><a href="#refinement" :class="{ active: activeId === 'refinement' }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />Ch4: リファインメント</a></li>
        <li><a href="#ordering-and-prioritization" :class="{ active: activeId === 'ordering-and-prioritization' }" @click="closeSidebar"><Icon name="tabler:chart-pie" aria-hidden="true" />Ch5: 並び替え</a></li>
        <li><a href="#stakeholders-and-customers" :class="{ active: activeId === 'stakeholders-and-customers' }" @click="closeSidebar"><Icon name="tabler:calendar-event" aria-hidden="true" />Ch6: ステークホルダー協働</a></li>
        <li><a href="#empiricism-and-ebm" :class="{ active: activeId === 'empiricism-and-ebm' }" @click="closeSidebar"><Icon name="tabler:timeline" aria-hidden="true" />Ch7: 経験主義とEBM</a></li>
        <li><a href="#ai-and-backlog-management" :class="{ active: activeId === 'ai-and-backlog-management' }" @click="closeSidebar"><Icon name="tabler:refresh" aria-hidden="true" />Ch8: AI時代の管理</a></li>
        <li><a href="#misconceptions-and-antipatterns" :class="{ active: activeId === 'misconceptions-and-antipatterns' }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />Ch9: 誤解とアンチパターン</a></li>
        <li><a href="#exam-prep-tips" :class="{ active: activeId === 'exam-prep-tips' }" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />Ch10: 試験対策</a></li>
        <li><a href="#glossary" :class="{ active: activeId === 'glossary' }" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />用語集</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org 公式認定試験ガイド</div>
        <h1>Professional Scrum Product Backlog Management Skills(PSPBM)認定 完全学習ガイド</h1>
        <p class="hero-lede">
          対象読者: Scrum Master・Product Owner・ビジネスアナリスト・開発者など、プロダクトバックログの取り扱いを体系的に学びたいすべての初学者。出題範囲の一次情報は<a href="https://www.scrum.org/assessments/professional-scrum-product-backlog-management-skills-certification" target="_blank" rel="noopener">scrum.org公式ページ(Professional Scrum Product Backlog Management Skills Certification)</a>です。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">20問</div><div class="stat-label">出題数(選択式・英語)</div></div>
          <div class="stat-card"><div class="stat-number">30分</div><div class="stat-label">制限時間</div></div>
          <div class="stat-card"><div class="stat-number">85%</div><div class="stat-label">合格基準</div></div>
          <div class="stat-card"><div class="stat-number">Intermediate</div><div class="stat-label">難易度レベル</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは学習支援を目的とした非公式の解説資料です。試験の正式な出題範囲・最新情報は必ず<a href="https://www.scrum.org/assessments/professional-scrum-product-backlog-management-skills-certification" target="_blank" rel="noopener">Scrum.org公式ページ</a>でご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 01. About This Guide ===================== -->
      <section id="about-this-guide">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>本ガイドについて</h2>

        <p>このガイドは、Scrum.org が提供する<strong>Professional Scrum Product Backlog Management Skills(PSPBM Skills)</strong>認定試験の出題領域を、初学者でも段階的に理解できるよう再構成した学習教材です。各章は以下の3要素で構成しています。</p>

        <ul>
          <li><strong>概念解説:</strong> Scrum Guide および Scrum.org 公式リソースに基づく定義</li>
          <li><strong>ベストプラクティス:</strong> 実務で使われている具体的な技法・進め方</li>
          <li><strong>ソース:</strong> 各主張の根拠となる一次・準一次情報のURL</li>
        </ul>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>PSPBM Skills は Scrum Guide の知識に加え、Scrum.org が公開する<strong>Professional Scrum Competencies</strong>の一部領域を出題範囲として明示的に参照する試験です。単なる用語暗記ではなく、「プロダクトバックログをどう形成し、リファインし、並び替え、ステークホルダーと協働しながら価値を最大化するか」という実践スキルが問われます。</p>
        </div>
      </section>

      <!-- ===================== 02. Exam Overview ===================== -->
      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 02</div>
        <h2>認定試験の概要</h2>

        <h3>試験基本情報</h3>

        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>正式名称</td><td>Professional Scrum Product Backlog Management Skills&trade;(PSPBM Skills)</td></tr>
              <tr><td>提供元</td><td>Scrum.org</td></tr>
              <tr><td>初回提供開始日</td><td>2023年9月27日</td></tr>
              <tr><td>難易度レベル</td><td>Intermediate(中級)</td></tr>
              <tr><td>出題形式</td><td>選択式(Multiple Choice)、英語のみ</td></tr>
              <tr><td>問題数</td><td>20問</td></tr>
              <tr><td>制限時間</td><td>30分</td></tr>
              <tr><td>合格基準</td><td>85%以上の正答率</td></tr>
              <tr><td>受験形式</td><td>オンライン、受験者が任意の場所・タイミングで受験可能(試験会場への訪問は不要)</td></tr>
              <tr><td>有効期限</td><td>受験権利(アセスメント)そのものに有効期限なし、合格後の認定に更新義務・更新費用なし</td></tr>
              <tr><td>前提資格</td><td>必須ではないが、PSM I(Professional Scrum Master I)または PSPO I(Professional Scrum Product Owner I)の取得が推奨される</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>出題は「Scrum Guide の暗記」だけでは対応しきれません。PSM I や PSPO I で問われるような Scrum フレームワークの基礎理解を土台としたうえで、プロダクトバックログに関する実務知識(リファインメント技法、並び替え手法、ステークホルダー協働、経験主義の適用)が上乗せされる出題になります。まず土台となる Scrum の基礎を固めてから本ガイドの各章に進むことを推奨します。</p>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-product-backlog-management-skills-certification" target="_blank" rel="noopener">scrum.org — PSPBM Skills Certification</a></li>
            <li><a href="https://www.credly.com/org/scrum-org/badge/professional-scrum-product-backlog-management-skill" target="_blank" rel="noopener">Credly — PSPBM バッジ発行条件</a></li>
            <li><a href="https://www.scrum.org/resources/blog/how-pass-professional-scrum-product-backlog-management-skills-pspbm-skills" target="_blank" rel="noopener">TheScrumMaster.co.uk — 試験形式の解説</a></li>
          </ul>
        </div>

        <h3>認定が証明する能力</h3>

        <p>Scrum.org は、PSPBM Skills 認定の取得によって以下の理解が示されるとしています。</p>

        <ul>
          <li>透明性が確保され、かつ価値に焦点を当てたプロダクトバックログを効果的にマネジメントする能力</li>
          <li>カスタマーのニーズを捉える技法</li>
          <li>プロダクトバックログのリファインメント技法</li>
          <li>ステークホルダーの期待値をマネジメントする技法</li>
          <li>経験主義(empiricism)を競争優位として活用する技法</li>
        </ul>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-product-backlog-management-skills-certification" target="_blank" rel="noopener">scrum.org — PSPBM Skills Certification</a></li>
          </ul>
        </div>

        <h3>対応する公式トレーニングコース</h3>

        <p>Scrum.org は本認定に対応する1日制のコース「Professional Scrum Product Backlog Management Skills」を提供しています。<strong>講師によるライブコース(instructor-led)の参加者</strong>は、受講後14日以内にアセスメントを受験して85%未満だった場合に限り、追加費用なしで2回目の受験機会が付与されます。自己学習型(self-paced)のコース参加者にはこの特典は付かず、受験機会は1回です。</p>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://academy.xebia.com/training/professional-scrum-product-backlog-management-skills-pspbms/" target="_blank" rel="noopener">Xebia Academy — PSPBMS トレーニング概要</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 03. Competencies Framework ===================== -->
      <section id="competencies-framework">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 03</div>
        <h2>Professional Scrum Competencies フレームワーク</h2>

        <p>Scrum.org は、個人のスキル成長を導くモデルとして<strong>Professional Scrum Competencies</strong>(プロフェッショナル・スクラム・コンピテンシー)を定義しています。すべての認定試験・コースウェアはこのコンピテンシーモデルを前提に設計されており、PSPBM Skills もその一部を出題範囲として明示しています。</p>

        <h3>5つのコンピテンシー全体像</h3>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_COMPETENCIES_OVERVIEW" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Professional Scrum Competencies の5領域と、その土台となる関係</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>コンピテンシー</th><th>含まれる Focus Area</th></tr></thead>
            <tbody>
              <tr><td>Understanding and Applying the Scrum Framework</td><td>Empiricism、Scrum Values、Scrum Team、Events、Artifacts、Done、Scaling</td></tr>
              <tr><td>Developing People and Teams</td><td>Self-Managing Teams、Facilitation、Leadership Styles、Coaching and Mentoring</td></tr>
              <tr><td><strong>Managing Products with Agility</strong></td><td><strong>Forecasting &amp; Release Planning、Product Vision、Product Value、Product Backlog Management、Business Strategy、Stakeholders &amp; Customers</strong></td></tr>
              <tr><td>Developing and Delivering Products Professionally</td><td>Emergent Software Development、Managing Technical Risk、Continuous Quality、Continuous Integration、Continuous Delivery、Optimizing Flow</td></tr>
              <tr><td>Evolving the Agile Organization</td><td>Organizational Design &amp; Culture ほか</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">scrum.org — The Professional Scrum Competencies</a></li>
          </ul>
        </div>

        <h3>PSPBM Skills が重点的に問う Focus Area</h3>

        <p>公式に PSPBM Skills の Focus Area として挙げられているのは、<strong>Product Backlog Management</strong> と <strong>Stakeholders &amp; Customers</strong> の2つだけです。加えて、土台となる「Understanding and Applying the Scrum Framework」(Empiricism・Artifacts・Events の基礎)の理解が前提とされます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>公式の Focus Area</th><th>概要</th></tr></thead>
            <tbody>
              <tr><td>Product Backlog Management</td><td>プロダクトバックログの形成、リファインメント、並び替えを継続的に行い、透明性と価値を保つ活動</td></tr>
              <tr><td>Stakeholders &amp; Customers</td><td>プロダクトバックログの内容に影響を与える多様なステークホルダー・カスタマーとの協働</td></tr>
            </tbody>
          </table>
        </div>

        <p>次の3つは同じ「Managing Products with Agility」コンピテンシー配下にありますが、<strong>PSPBM Skills の出題範囲としては公式に挙げられていません</strong>。プロダクトバックログ管理の背景を理解するための周辺知識として扱ってください。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>周辺のコンピテンシー文脈(出題範囲外)</th><th>概要</th></tr></thead>
            <tbody>
              <tr><td>Product Value</td><td>提供した価値・実現しうる価値を継続的に定義し、測定し、検証する活動</td></tr>
              <tr><td>Product Vision</td><td>プロダクトが届けるべき価値と、その届け先を表現する将来像</td></tr>
              <tr><td>Forecasting &amp; Release Planning</td><td>反復的・漸進的アプローチによるリリース計画とステークホルダーへの見通し提示</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/professional-scrum-competencies/managing-products-with-agility" target="_blank" rel="noopener">scrum.org — Professional Scrum Competency: Managing Products with Agility</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 04. What Is Product Backlog ===================== -->
      <section id="what-is-product-backlog">
        <div class="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 04</div>
        <h2>Chapter 1: プロダクトバックログとは何か</h2>
      </section>

      <!-- ===================== 05. Product Vision and Goal ===================== -->
      <section id="product-vision-and-goal">
        <div class="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 05</div>
        <h2>Chapter 2: プロダクトビジョンとプロダクトゴール</h2>
      </section>

      <!-- ===================== 06. Forming the Backlog ===================== -->
      <section id="forming-the-backlog">
        <div class="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 06</div>
        <h2>Chapter 3: プロダクトバックログの形成(Forming)</h2>
      </section>

      <!-- ===================== 07. Refinement ===================== -->
      <section id="refinement">
        <div class="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 07</div>
        <h2>Chapter 4: リファインメント(Refinement)</h2>
      </section>

      <!-- ===================== 08. Ordering and Prioritization ===================== -->
      <section id="ordering-and-prioritization">
        <div class="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 08</div>
        <h2>Chapter 5: 並び替えと優先順位付け(Ordering)</h2>
      </section>

      <!-- ===================== 09. Stakeholders and Customers ===================== -->
      <section id="stakeholders-and-customers">
        <div class="section-eyebrow"><Icon name="tabler:calendar-event" aria-hidden="true" />SECTION 09</div>
        <h2>Chapter 6: ステークホルダーとカスタマーとの協働</h2>
      </section>

      <!-- ===================== 10. Empiricism and EBM ===================== -->
      <section id="empiricism-and-ebm">
        <div class="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 10</div>
        <h2>Chapter 7: 経験主義とEvidence-Based Managementによる価値最大化</h2>
      </section>

      <!-- ===================== 11. AI and Backlog Management ===================== -->
      <section id="ai-and-backlog-management">
        <div class="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 11</div>
        <h2>Chapter 8: AI時代のプロダクトバックログマネジメント</h2>
      </section>

      <!-- ===================== 12. Misconceptions and Antipatterns ===================== -->
      <section id="misconceptions-and-antipatterns">
        <div class="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 12</div>
        <h2>Chapter 9: よくある誤解とアンチパターン</h2>
      </section>

      <!-- ===================== 13. Exam Prep Tips ===================== -->
      <section id="exam-prep-tips">
        <div class="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 13</div>
        <h2>Chapter 10: 試験対策のポイント</h2>
      </section>

      <!-- ===================== 14. Glossary ===================== -->
      <section id="glossary">
        <div class="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 14</div>
        <h2>用語集</h2>
      </section>

      <!-- ===================== 15. References ===================== -->
      <section id="references">
        <div class="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 15</div>
        <h2>参考文献・ソースURL一覧</h2>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: block;
}

.sidebar-overlay {
  display: none;
}

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

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) {
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
  border-left: 2px solid var(--color-indigo);
}

.sidebar-nav a.active :deep(.iconify),
.sidebar-nav a.active :deep(svg) {
  color: var(--color-indigo);
}

.sidebar-toggle {
  display: none;
}

/* ===================== Main content ===================== */
.main-content {
  margin-left: var(--sidebar-width);
  padding: 56px 72px 120px;
}

:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
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

.hero-eyebrow :deep(.iconify),
.hero-eyebrow :deep(svg) {
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
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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
  color: var(--color-ink-faint);
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

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-indigo);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 16px;
}

section {
  margin-bottom: 80px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

section h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 30px;
  line-height: 1.33;
  margin: 0 0 24px;
  color: var(--color-ink);
}

section h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 36px 0 16px;
  color: var(--color-ink);
}

section h4 {
  font-size: 17px;
  font-weight: 700;
  margin: 28px 0 12px;
  color: var(--color-ink);
}

p {
  margin: 0 0 16px;
}

/* ===================== Callouts ===================== */
.callout {
  border-left: 4px solid;
  border-radius: 0 8px 8px 0;
  padding: 18px 22px;
  margin: 24px 0;
  background: var(--color-paper-sunken);
}

.callout.practice {
  border-color: var(--color-gold);
  background: var(--color-gold-tint);
}

.callout.source {
  border-color: var(--color-forest);
  background: var(--color-forest-tint);
}

.callout.note {
  border-color: var(--color-indigo);
  background: var(--color-indigo-tint);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
}

.callout.practice .callout-title { color: var(--color-gold); }
.callout.source .callout-title { color: var(--color-forest); }
.callout.note .callout-title { color: var(--color-indigo); }

.callout p:last-child { margin-bottom: 0; }

/* ===================== Tables ===================== */
.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  line-height: 1.55;
  text-align: left;
}

th, td {
  padding: 14px 18px;
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

/* ===================== Diagrams ===================== */
.mermaid-wrap {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
  margin: 24px 0;
}

.diagram-card {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-paper-raised);
  padding: 24px 20px 20px;
  margin: 28px 0;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 14px;
}

/* ===================== Lists ===================== */
ul, ol {
  margin: 0 0 18px 0;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-indigo);
    color: #ffffff;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 30;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 25;
  }

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 30;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    max-width: 100%;
    padding: 32px 20px 80px;
  }

  .hero h1 { font-size: 32px; }
  .stat-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .stat-row { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar { transition: none; }
}
</style>
