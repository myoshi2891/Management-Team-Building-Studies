<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "overview",
  "part-a-scrum-framework",
  "part-b-developing-delivering",
  "part-c-people-teams",
  "part-d-managing-products",
  "devops-engineering-practices",
  "best-practices-summary",
  "study-roadmap",
  "practice-quiz",
  "common-misconceptions",
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
  title: "Professional Scrum Developer(PSD I)認定資格 完全ガイド | Scrum.org公式情報に基づく学習リソース",
  description:
    "Scrum.orgのProfessional Scrum Developer(PSD I)認定資格について、4つのProfessional Scrum Competencies(出題範囲)を初学者向けにステップバイステップで解説する非公式の学習ガイドです。",
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

const DIAGRAM_COMPETENCY_MAP = `flowchart TB
EXAM["PSD I 試験 80問 / 60分 / 合格ライン85%"]
A["A. Scrumフレームワークの 理解と適用"]
B["B. プロフェッショナルとしての プロダクト開発と提供"]
C["C. 人とチームの成長"]
D["D. アジリティを持った プロダクトマネジメント"]

EXAM --> A
EXAM --> B
EXAM --> C
EXAM --> D

A --> A1["Empiricism 経験主義"]
A --> A2["Scrum Values"]
A --> A3["Scrum Team"]
A --> A4["Events"]
A --> A5["Artifacts"]
A --> A6["Done"]

B --> B1["Backlog Refinement"]
B --> B2["Cross-functional"]
B --> B3["Self-managed Development"]
B --> B4["Design and Architecture"]
B --> B5["Programming"]
B --> B6["Quality"]
B --> B7["Testing"]

C --> C1["Self-Managing Teams"]
C --> C2["Facilitation"]
C --> C3["Coaching and Mentoring"]

D --> D1["Forecasting and Release Planning"]
D --> D2["Product Value"]
D --> D3["Product Backlog Management"]
D --> D4["Stakeholders and Customers"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class EXAM hub;
class A,B,C,D,A1,A2,A3,A4,A5,A6,B1,B2,B3,B4,B5,B6,B7,C1,C2,C3,D1,D2,D3,D4 box;`;

</script>

<template>
  <div class="layout">
    <button
      ref="sidebarToggle"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次メニューを開閉"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      aria-controls="sidebar"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">PSD I 完全ガイド</div>
          <div class="brand-subtitle">Professional Scrum Developer</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a :class="{ active: activeId === 'overview' }" href="#overview" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />1. この資格の全体像</a></li>
        <li><a :class="{ active: activeId === 'part-a-scrum-framework' }" href="#part-a-scrum-framework" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />2. Part A: Scrumフレームワーク</a></li>
        <li><a :class="{ active: activeId === 'part-b-developing-delivering' }" href="#part-b-developing-delivering" @click="closeSidebar"><Icon name="tabler:code" aria-hidden="true" />3. Part B: プロダクト開発と提供</a></li>
        <li><a :class="{ active: activeId === 'part-c-people-teams' }" href="#part-c-people-teams" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />4. Part C: 人とチームの成長</a></li>
        <li><a :class="{ active: activeId === 'part-d-managing-products' }" href="#part-d-managing-products" @click="closeSidebar"><Icon name="tabler:list-details" aria-hidden="true" />5. Part D: プロダクトマネジメント</a></li>
        <li><a :class="{ active: activeId === 'devops-engineering-practices' }" href="#devops-engineering-practices" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />6. DevOpsとエンジニアリング</a></li>
        <li><a :class="{ active: activeId === 'best-practices-summary' }" href="#best-practices-summary" @click="closeSidebar"><Icon name="tabler:bulb" aria-hidden="true" />7. ベストプラクティス総まとめ</a></li>
        <li><a :class="{ active: activeId === 'study-roadmap' }" href="#study-roadmap" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />8. 学習ロードマップ</a></li>
        <li><a :class="{ active: activeId === 'practice-quiz' }" href="#practice-quiz" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />9. 理解度チェック</a></li>
        <li><a :class="{ active: activeId === 'common-misconceptions' }" href="#common-misconceptions" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />10. よくある誤解と注意点</a></li>
        <li><a :class="{ active: activeId === 'references' }" href="#references" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />11. 参考文献・出典一覧</a></li>
      </ul>
    </nav>

    <main id="main-content" class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org 認定資格ガイド</div>
        <h1>Professional Scrum Developer(PSD I)認定資格 学習ガイド</h1>
        <p class="hero-lede">
          Scrum.orgの<a href="https://www.scrum.org/assessments/professional-scrum-developer-certification" target="_blank" rel="noopener">「Professional Scrum Developer™ Certification」</a>ページおよび関連ページ、The Scrum Guide(2020年11月版)等の一次情報をもとに、初学者向けに再構成した非公式の学習資料です。原文の丸写しは避け、要点を筆者の言葉で解説しています。試験の正式な合否基準・出題内容は必ず一次情報(各リンク先)でご確認ください。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">80問</div><div class="stat-label">出題数(択一・複数選択・正誤問題)</div></div>
          <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">制限時間</div></div>
          <div class="stat-card"><div class="stat-number">85%</div><div class="stat-label">合格ライン</div></div>
          <div class="stat-card"><div class="stat-number">USD 200</div><div class="stat-label">受験料</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは学習支援を目的とした非公式の解説資料であり、Scrum.orgの公式教材ではありません。試験の出題形式・合格基準・Focus Areaの内容は変更される可能性があるため、受験前に必ず<a href="https://www.scrum.org/assessments/professional-scrum-developer-certification" target="_blank" rel="noopener">公式ページ</a>で最新情報を確認してください。</span>
        </div>
      </div>

      <!-- ===================== 1. Overview ===================== -->
      <section id="overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>この資格の全体像</h2>

        <h3>1.1 PSD Iとは何か</h3>
        <p>Professional Scrum Developer™ I(PSD I)は、Scrum.orgが提供する認定資格の一つで、Scrumフレームワークを使ってソフトウェアを開発・提供する能力を検証するものです。他の多くのアジャイル資格が「研修に出席したこと」を認定するのに対し、Scrum.orgの資格はすべて「試験に合格したこと」を根拠とする知識証明型の資格である点が特徴です。</p>
        <p>PSD Iは、単なるScrum理論の理解にとどまらず、<strong>自己管理型の開発、設計とアーキテクチャ、ドキュメンテーション、プログラミング、品質、テスト、リリース計画、プロダクト価値</strong>まで、開発者(Developer)としてScrumを実践するために必要な幅広い知識を対象とします。</p>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>受験に際して研修の受講は必須ではありませんが、Scrum.orgは公式研修「Applying Professional Scrum for Software Development(APS-SD)」の受講を強く推奨しています。</p>
        </div>

        <h3>1.2 試験概要</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>試験名</td><td>Professional Scrum Developer(PSD I)</td></tr>
              <tr><td>出題形式</td><td>択一式(Multiple Choice)、複数選択(Multiple Answer)、正誤問題(True/False)</td></tr>
              <tr><td>試験言語</td><td>英語(試験問題は英語で提供される)。Scrum.org が案内する手順に従うことで、受験時に Google Translate Plugin による翻訳補助を利用できる</td></tr>
              <tr><td>問題数</td><td>80問</td></tr>
              <tr><td>制限時間</td><td>60分</td></tr>
              <tr><td>合格ライン</td><td>85%</td></tr>
              <tr><td>受験形式</td><td>オンライン受験。参照できるのは紙の資料のみで、受験中に試験画面から離れることはできない(AIツールの使用も不可)</td></tr>
              <tr><td>受験料</td><td>200 USD</td></tr>
              <tr><td>前提条件</td><td>なし(誰でも受験可能)</td></tr>
              <tr><td>有効期限・更新</td><td>更新不要(永続的な認定)</td></tr>
              <tr><td>受験可能回数</td><td>1回分の受験料につき1回。不合格の場合は再度購入が必要(研修経由の場合は別条件あり)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-developer-certification" target="_blank" rel="noopener">Scrum.org公式ページおよびIndiana州DWD公開資料</a></li>
            <li><a href="https://www.in.gov/dwd/files/industry-certifications/Professional-Scrum-Developer-PSD.pdf" target="_blank" rel="noopener">https://www.in.gov/dwd/files/industry-certifications/Professional-Scrum-Developer-PSD.pdf</a></li>
          </ul>
        </div>

        <h3>1.3 前提条件・対象者</h3>
        <p>PSD Iには公式な受験資格要件はなく、誰でも受験可能です。ただし対象として想定されているのは、Scrumチームの中で実際にプロダクトを作り上げる立場にある人たちです。</p>
        <ul>
          <li>プログラマー / コーダー</li>
          <li>アーキテクト</li>
          <li>データベース開発者</li>
          <li>テスター</li>
          <li>IT運用(Operations)担当者</li>
          <li>(技術的知識を持つ)Scrum MasterやProduct Owner</li>
        </ul>
        <p>Scrum Guide 2020では「Development Team」という下位区分は廃止され、スプリントごとに利用可能なIncrementを作り出す作業にコミットするScrum Teamのメンバーが「Developers」と呼ばれるようになりました。これは役割による除外ではなく担う作業による定義であり、Product OwnerやScrum MasterもSprint Backlogの作業を実際に行っている場合はDeveloperとして参加します(2.4節のベストプラクティスも参照)。PSD Iはこの意味での「Developers」を主対象としています。</p>

        <h3>1.4 出題範囲マッピング</h3>
        <p>PSD Iの出題は「Professional Scrum Competencies(プロフェッショナルScrumコンピテンシー)」というScrum.orgの知識体系モデルに基づいています。出題の約85%はコンピテンシーB「Developing &amp; Delivering Products Professionally(プロフェッショナルとしてのプロダクト開発と提供)」に含まれる「Focus Area(フォーカスエリア)」から出題され、残りの約15%がA・C・Dの3コンピテンシーから出題されます。A・C・Dそれぞれの内訳比率は公開されていません。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_COMPETENCY_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">PSD I試験の4つのコンピテンシーとFocus Areaの全体像</div>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/suggested-reading-professional-scrum-developer" target="_blank" rel="noopener">Suggested Reading for PSD I</a></li>
            <li><a href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">The Professional Scrum Competencies</a></li>
          </ul>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>出題の約85%を占めるBが学習の中心です。ここが「PSD Iらしさ」の部分であり、他の資格(PSM Iなど)と重なるA・C・Dの部分は、既にScrum知識のある人にとっては復習で済むことが多いです。まずBを厚く学習し、残りの約15%にあたるA・C・Dは知識の抜けを埋める形で補うとよいでしょう(A・C・D内の出題比率は公開されていないため、この3つに優先順位を付ける根拠はありません)。</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-paper);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: calc(var(--global-nav-height) + 12px);
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

.sidebar-overlay {
  display: none;
}

.sidebar {
  position: sticky;
  top: var(--global-nav-height);
  height: calc(100vh - var(--global-nav-height));
  width: var(--sidebar-width, 280px);
  min-width: var(--sidebar-width, 280px);
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
  padding: 24px 0 32px;
  z-index: 20;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px 20px;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-brand .seal {
  width: 38px;
  height: 38px;
  flex: none;
}

.brand-text .brand-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--color-indigo);
  line-height: 1.2;
}

.brand-text .brand-subtitle {
  font-size: 12px;
  color: var(--color-ink-faint);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
}

.sidebar-nav li {
  margin: 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  font-size: 14px;
  color: var(--color-ink-soft);
  text-decoration: none;
  line-height: 1.4;
  border-left: 2px solid transparent;
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar-nav a :deep(svg),
.sidebar-nav a :deep(.iconify) {
  font-size: 17px;
  color: var(--color-ink-faint);
  flex: none;
}

.sidebar-nav a:hover {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
  border-left-color: var(--color-indigo);
}

.sidebar-nav a.active :deep(svg),
.sidebar-nav a.active :deep(.iconify) {
  color: var(--color-indigo);
}

.main-content {
  flex: 1;
  min-width: 0;
  padding: 48px 48px 120px;
  max-width: 960px;
}

.hero {
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.hero h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 36px;
  line-height: 1.28;
  margin: 0 0 16px;
  color: var(--color-ink);
}

.hero .hero-lede {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-ink-soft);
  margin: 0 0 24px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 16px;
}

.stat-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 16px 18px;
}

.stat-card .stat-number {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 26px;
  color: var(--color-indigo);
  line-height: 1.1;
}

.stat-card .stat-label {
  font-size: 13px;
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
  font-size: 14px;
  line-height: 1.6;
  margin-top: 24px;
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
  margin: 56px 0;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

section:first-of-type {
  margin-top: 0;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-faint);
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 26px;
  color: var(--color-ink);
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 20px;
  color: var(--color-ink);
  margin: 36px 0 14px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-ink);
  margin: 0 0 16px;
}

ul, ol {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-ink);
  margin: 0 0 16px;
  padding-left: 24px;
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

li {
  margin-bottom: 6px;
}

strong {
  font-weight: 600;
  color: var(--color-ink);
}

/* Callouts */
.callout {
  border-left: 4px solid var(--color-indigo);
  background: var(--color-paper-raised);
  border-radius: 0 8px 8px 0;
  padding: 16px 20px;
  margin: 20px 0;
  border-top: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.callout .callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
}

.callout p {
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
}

.callout p + p {
  margin-top: 8px;
}

.callout.practice {
  border-left-color: var(--color-gold);
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.source {
  border-left-color: var(--color-forest);
}

.callout.source .callout-title {
  color: var(--color-forest);
}

.callout.source ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.callout.source li {
  margin-bottom: 4px;
  font-size: 14px;
  word-break: break-all;
}

.callout.source a {
  color: var(--color-forest);
  font-weight: 500;
}

.callout.note {
  border-left-color: var(--color-plum);
}

.callout.note .callout-title {
  color: var(--color-plum);
}

/* Tables */
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-paper-raised);
  margin: 20px 0;
  max-width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  line-height: 1.55;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
  font-size: 14px;
}

tr:last-child td {
  border-bottom: none;
}

/* Diagrams */
.mermaid-wrap {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
}

.diagram-caption {
  font-size: 13px;
  color: var(--color-ink-faint);
  margin-top: 12px;
  text-align: center;
}

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 14px;
  padding: 20px 0;
  text-align: center;
}

/* Responsive */
@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }

  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    bottom: 0;
    height: calc(100vh - var(--global-nav-height));
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
  }

  .main-content {
    padding: 32px 24px 80px;
  }
}
</style>
