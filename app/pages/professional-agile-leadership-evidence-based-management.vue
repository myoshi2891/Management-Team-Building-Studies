<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "exam-overview",
  "focus-areas",
  "empiricism",
  "what-is-ebm",
  "four-kvas",
  "product-value",
  "business-strategy",
  "stakeholders-customers",
  "portfolio-planning",
  "hypotheses",
  "goals",
  "exam-strategy",
  "study-plan",
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
  title: "PAL-EBM™ 認定資格 完全ガイド | Evidence-Based Management™ で読み解くアジャイルリーダーシップ",
  description:
    "Scrum.org の Professional Agile Leadership - Evidence-Based Management (PAL-EBM) 認定について、経験主義、4つの主要価値領域(KVA)、仮説検証、目標設定までを初学者向けにステップバイステップで解説する学習ガイドです。",
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

const DIAGRAM_CERT_ROADMAP = `flowchart TB
A["Scrum Guideを理解する 経験主義の基礎"] --> B["EBM Guideを精読する 一次情報として最重要"]
B --> C["Focus Areas別に公式資料を学習する"]
C --> D["PAL-EBMクラスを受講 任意だが推奨"]
D --> E["Scrum Open Assessments 無料で理解度を確認"]
E --> F["シナリオ問題形式に慣れる"]
F --> G["PAL-EBM本試験を受験 60分・40問・85%以上"]
G --> H{"合格スコア85%以上?"}
H -- Yes --> I["PAL-EBM認定取得 無期限で有効"]
H -- No --> J["公式には再受験に別料金が必要な場合あり"]
J --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G,H,J box;
class I done;`;

const DIAGRAM_FOCUS_AREA_TREE = `flowchart TB
ROOT["PAL-EBM 出題範囲"]
ROOT --> C1["Scrumフレームワークの理解と適用"]
ROOT --> C2["アジリティをもったプロダクトマネジメント"]
ROOT --> C3["アジャイル組織への進化"]
ROOT --> C4["追加トピック"]
C1 --> F1["Empiricism 経験主義"]
C2 --> F2["Product Value プロダクトバリュー"]
C2 --> F3["Business Strategy ビジネス戦略"]
C2 --> F4["Stakeholders & Customers ステークホルダーと顧客"]
C3 --> F5["Portfolio Planning ポートフォリオプランニング"]
C3 --> F6["Evidence-Based Management"]
C4 --> F7["Forming & Evaluating Hypotheses"]
C4 --> F8["Setting, Inspecting & Adapting Goals"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class ROOT hub;
class C1,C2,C3,C4,F1,F2,F3,F4,F5,F6,F7,F8 box;`;
</script>

<template>
  <div class="layout">
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
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
          <div class="brand-title">PAL-EBM™ 完全ガイド</div>
          <div class="brand-subtitle">Evidence-Based Management</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a :class="{ active: activeId === 'exam-overview' }" href="#exam-overview" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />1. 試験概要</a></li>
        <li><a :class="{ active: activeId === 'focus-areas' }" href="#focus-areas" @click="closeSidebar"><Icon name="tabler:sitemap" aria-hidden="true" />2. 出題範囲の全体像</a></li>
        <li><a :class="{ active: activeId === 'empiricism' }" href="#empiricism" @click="closeSidebar"><Icon name="tabler:refresh" aria-hidden="true" />3. 経験主義</a></li>
        <li><a :class="{ active: activeId === 'what-is-ebm' }" href="#what-is-ebm" @click="closeSidebar"><Icon name="tabler:target" aria-hidden="true" />4. EBMとは何か</a></li>
        <li><a :class="{ active: activeId === 'four-kvas' }" href="#four-kvas" @click="closeSidebar"><Icon name="tabler:chart-pie" aria-hidden="true" />5. 4つの主要価値領域</a></li>
        <li><a :class="{ active: activeId === 'product-value' }" href="#product-value" @click="closeSidebar"><Icon name="tabler:package" aria-hidden="true" />6. プロダクトバリュー</a></li>
        <li><a :class="{ active: activeId === 'business-strategy' }" href="#business-strategy" @click="closeSidebar"><Icon name="tabler:trending-up" aria-hidden="true" />7. ビジネス戦略とUV</a></li>
        <li><a :class="{ active: activeId === 'stakeholders-customers' }" href="#stakeholders-customers" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />8. ステークホルダーと顧客管理</a></li>
        <li><a :class="{ active: activeId === 'portfolio-planning' }" href="#portfolio-planning" @click="closeSidebar"><Icon name="tabler:briefcase" aria-hidden="true" />9. ポートフォリオプランニング</a></li>
        <li><a :class="{ active: activeId === 'hypotheses' }" href="#hypotheses" @click="closeSidebar"><Icon name="tabler:flask" aria-hidden="true" />10. 仮説形成と検証</a></li>
        <li><a :class="{ active: activeId === 'goals' }" href="#goals" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />11. 目標の設定・検査・適応</a></li>
        <li><a :class="{ active: activeId === 'exam-strategy' }" href="#exam-strategy" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />12. 試験対策</a></li>
        <li><a :class="{ active: activeId === 'study-plan' }" href="#study-plan" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />13. 学習ステップ</a></li>
        <li><a :class="{ active: activeId === 'glossary' }" href="#glossary" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />14. 用語集</a></li>
        <li><a :class="{ active: activeId === 'references' }" href="#references" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />15. 参考文献・ソースURL</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main id="main-content" class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org 公式アセスメント</div>
        <h1>Professional Agile Leadership™ - Evidence-Based Management™(PAL-EBM)認定 完全ガイド</h1>
        <p class="hero-lede">
          本ガイドは <a href="https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification" target="_blank" rel="noopener">Scrum.org 公式アセスメントページ</a> および Scrum.org が公開する Evidence-Based Management™ Guide、公式ブログ等の一次情報をもとに、初学者が「なぜ経験主義的な組織運営が必要なのか」から「4つの主要価値領域(KVA)をどう実務に落とし込むか」までをステップバイステップで理解できるよう構成しています。各章末に根拠ソースのURLを明記しています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">40問</div><div class="stat-label">制限時間60分</div></div>
          <div class="stat-card"><div class="stat-number">85%以上</div><div class="stat-label">合格ライン</div></div>
          <div class="stat-card"><div class="stat-number">USD 200</div><div class="stat-label">受験費用</div></div>
          <div class="stat-card"><div class="stat-number">無期限</div><div class="stat-label">認定の有効期限</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは教育・学習支援を目的とした非公式の解説資料です。試験の出題形式・合格基準・受験料等は変更される場合があるため、必ず<a href="https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification" target="_blank" rel="noopener">Scrum.org公式サイト</a>で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 1. Exam Overview ===================== -->
      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>試験概要</h2>

        <h3>1.1 PAL-EBMとは</h3>
        <p>PAL-EBM(Professional Agile Leadership™ - Evidence-Based Management™)は、Scrum.org が提供する認定資格の1つです。組織が顧客アウトカム(customer outcomes)、組織能力(organizational capabilities)、ビジネス成果(business results)を継続的に改善するために、なぜ経験主義的アプローチ(empirical approach)が有効なのかについて、応用レベルの理解を証明する資格です。</p>
        <p>対象は Scrum Master、Product Owner、チームリード、コーチ、コンサルタント、そして組織の意思決定に関わるエグゼクティブ／マネージャーです。PAL Iが「リーダーシップと自己管理型チームの育成」に焦点を当てるのに対し、PAL-EBMは「Evidence-Based Management™ フレームワークを用いた価値の測定と組織アジリティの向上」に焦点を当てます。</p>

        <h3>1.2 試験の基本情報</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">項目</th><th scope="col">内容</th></tr></thead>
            <tbody>
              <tr><td>試験名</td><td>Professional Agile Leadership™ - Evidence-Based Management™(PAL-EBM)</td></tr>
              <tr><td>提供元</td><td>Scrum.org</td></tr>
              <tr><td>レベル</td><td>Intermediate(中級)</td></tr>
              <tr><td>出題数</td><td>40問</td></tr>
              <tr><td>制限時間</td><td>60分</td></tr>
              <tr><td>出題形式</td><td>選択式(Multiple Choice)、複数選択(Multiple Answer)、True/False</td></tr>
              <tr><td>合格ライン</td><td>85%以上</td></tr>
              <tr><td>受験費用</td><td>USD 200</td></tr>
              <tr><td>言語</td><td>英語</td></tr>
              <tr><td>有効期限</td><td>なし(一度取得すると失効しない)</td></tr>
              <tr><td>受験場所</td><td>オンライン(自宅や職場から受験可能、試験会場への訪問不要)</td></tr>
              <tr><td>前提条件</td><td>公式には必須のトレーニング受講条件はないが、PAL-EBMクラスの受講が強く推奨されている</td></tr>
            </tbody>
          </table>
        </div>
        <p>出典：Scrum.orgアセスメントページおよびScrum.org公式ブログ「How To Pass The PAL-EBM Assessment」に基づく。</p>

        <h3>1.3 他のPAL系認定との違い</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">認定</th><th scope="col">主な焦点</th></tr></thead>
            <tbody>
              <tr><td>PAL I(Professional Agile Leadership I)</td><td>自己管理型チームの育成、権限移譲、組織的インペディメントの除去</td></tr>
              <tr><td>PAL-EBM(本ガイドの対象)</td><td>Evidence-Based Management™フレームワークによる価値の測定、仮説駆動の意思決定</td></tr>
            </tbody>
          </table>
        </div>

        <h3>1.4 認定取得までの流れ</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CERT_ROADMAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">PAL-EBM認定取得までのステップ</div>
        </div>

        <div class="callout source" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification</a></li>
            <li><a href="https://www.scrum.org/resources/blog/how-pass-professional-agile-leadership-evidence-based-management-pal-ebm-assessment" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/how-pass-professional-agile-leadership-evidence-based-management-pal-ebm-assessment</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 2. Focus Areas Map ===================== -->
      <section id="focus-areas">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:sitemap" aria-hidden="true" />SECTION 02</div>
        <h2>出題範囲(Focus Areas)の全体像</h2>

        <p>PAL-EBMの出題範囲は、Scrum.orgが定義する「Professional Scrum Competencies(プロフェッショナル・スクラム・コンピテンシー)」モデルの中から、EBMに関連するFocus Areaと、コンピテンシーモデルには明示されていない追加トピック(Additional Topics)から構成されます。</p>

        <h3>2.1 出題範囲マップ</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">コンピテンシー領域</th><th scope="col">Focus Area</th><th scope="col">概要</th></tr></thead>
            <tbody>
              <tr><td>Understanding and Applying the Scrum Framework(スクラムフレームワークの理解と適用)</td><td>Empiricism(経験主義)</td><td>なぜ・いつ経験主義が必要かを説明できる</td></tr>
              <tr><td>Managing Products with Agility(アジリティをもったプロダクトマネジメント)</td><td>Product Value(プロダクトバリュー)</td><td>プロダクトが提供する価値を評価する方法</td></tr>
              <tr><td>同上</td><td>Business Strategy(ビジネス戦略)</td><td>Unrealized Valueの概念を機会追求に応用する</td></tr>
              <tr><td>同上</td><td>Stakeholders &amp; Customers(ステークホルダーと顧客)</td><td>Current Value、Unrealized Valueをステークホルダー・顧客管理に応用する</td></tr>
              <tr><td>Evolving the Agile Organization(アジャイル組織への進化)</td><td>Portfolio Planning(ポートフォリオプランニング)</td><td>リーン・アジャイル原則をビジネス便益最大化の投資に適用する</td></tr>
              <tr><td>同上</td><td>Evidence-Based Management™</td><td>EBMフレームワークの概念理解</td></tr>
              <tr><td>Additional Topics(コンピテンシーモデル外の追加トピック)</td><td>Forming &amp; Evaluating Hypotheses(仮説の形成と検証)</td><td>短く焦点を絞った実験を通じて望む成果に近づく</td></tr>
              <tr><td>同上</td><td>Setting, Inspecting &amp; Adapting Goals(目標の設定・検査・適応)</td><td>複雑な世界で経験主義を使い目標に向かって進む方法</td></tr>
            </tbody>
          </table>
        </div>

        <h3>2.2 出題範囲の構造図</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FOCUS_AREA_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">PAL-EBM 出題範囲の構造(コンピテンシー領域とFocus Areaの対応)</div>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>試験対策では「どのFocus Areaの、どの概念が問われているか」をまず特定する癖をつけると、選択肢の絞り込みが速くなります。特にScrumシナリオの選択肢が複数正解に見える場合、「これはCurrent Valueの話かUnrealized Valueの話か」「これはT2MかA2Iか」という軸で切り分けると精度が上がります。</p>
        </div>

        <div class="callout source" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification</a></li>
            <li><a href="https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management</a></li>
            <li><a href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">https://www.scrum.org/professional-scrum-competencies</a></li>
          </ul>
        </div>
      </section>
    </main>
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

.sidebar-nav li {
  margin: 2px 0;
}

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
  border-left: 2px solid var(--color-indigo);
}

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

.sidebar-overlay {
  display: none;
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
  line-height: 1.7;
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

.disclaimer-box :deep(.iconify) {
  flex: none;
  font-size: 20px;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}

/* ===================== Sections & Typography ===================== */
section {
  margin-bottom: 72px;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-indigo);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section-eyebrow :deep(.iconify) {
  font-size: 16px;
}

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  color: var(--color-ink);
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  line-height: 1.35;
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  color: var(--color-ink);
  margin: 36px 0 14px;
  line-height: 1.4;
}

h4 {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 17px;
  color: var(--color-ink);
  margin: 24px 0 10px;
}

p {
  color: var(--color-ink);
  margin: 0 0 16px;
  line-height: 1.75;
}

/* ===================== Tables ===================== */
.table-wrap {
  overflow-x: auto;
  max-width: 100%;
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

thead tr {
  background: var(--color-paper-sunken);
  border-bottom: 1px solid var(--color-border);
}

th {
  padding: 12px 16px;
  font-weight: 600;
  color: var(--color-ink);
  white-space: nowrap;
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-ink);
  vertical-align: top;
  line-height: 1.6;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* ===================== Diagrams ===================== */
.mermaid-wrap {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
  margin: 24px 0;
}

.diagram-caption {
  text-align: center;
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 12px;
}

/* ===================== Callouts ===================== */
.callout {
  border-radius: 10px;
  padding: 18px 22px;
  margin: 24px 0;
  font-size: 16px;
  line-height: 1.7;
}

.callout.source {
  border: 1px solid var(--color-border);
  background: var(--color-paper-sunken);
  color: var(--color-ink-soft);
}

.callout.practice {
  border: 1px solid var(--color-gold-tint);
  background: #FCF8F0;
  color: var(--color-ink);
}

.callout.note {
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}

.callout.source .callout-title {
  color: var(--color-ink-soft);
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.note .callout-title {
  color: var(--color-indigo);
}

.callout ul {
  margin: 8px 0 0;
  padding-left: 20px;
}

.callout li {
  margin: 4px 0;
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
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
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
