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
        <div class="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>本ガイドについて</h2>
      </section>

      <!-- ===================== 02. Exam Overview ===================== -->
      <section id="exam-overview">
        <div class="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 02</div>
        <h2>認定試験の概要</h2>
      </section>

      <!-- ===================== 03. Competencies Framework ===================== -->
      <section id="competencies-framework">
        <div class="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 03</div>
        <h2>Professional Scrum Competencies フレームワーク</h2>
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
