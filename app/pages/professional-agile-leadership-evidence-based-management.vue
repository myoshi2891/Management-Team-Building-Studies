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

const DIAGRAM_EMPIRICISM_LOOP = `flowchart LR
A["透明性 Transparency"] --> B["検査 Inspection"]
B --> C["適応 Adaptation"]
C --> A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C box;`;

const DIAGRAM_EBM_CYCLE = `flowchart TB
A["現状を測定する Current Valueなど"] --> B["ギャップを特定する 目標と現状の差"]
B --> C["仮説を立てる Hypothesis"]
C --> D["小さく焦点を絞った実験を行う"]
D --> E["結果を測定・検査する"]
E --> F{"仮説は支持されたか?"}
F -- Yes --> G["組織の意思決定・投資配分に反映する"]
F -- No --> H["学びを得て次の仮説を形成する"]
G --> A
H --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,H box;
class G done;`;

const DIAGRAM_KVA_MAP = `flowchart TB
subgraph MV["市場価値 Market Value 顧客視点"]
CV["Current Value 現在価値"]
UV["Unrealized Value 未実現価値"]
end
subgraph AD["価値提供能力 Ability to Deliver Value 組織視点"]
T2M["Time-to-Market 市場投入までの時間"]
A2I["Ability to Innovate イノベーション能力"]
end
MV -. 相互に影響 .- AD

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class CV,UV,T2M,A2I box;`;

const DIAGRAM_PRODUCT_VALUE_FLOW = `flowchart LR
A["プロダクトが今提供している価値"] -->|Current Valueとして測定| B["現状の把握"]
C["まだ満たされていないニーズ・機会"] -->|Unrealized Valueとして測定| D["投資判断の材料"]
B --> E["Sprint Reviewでの検査・適応"]
D --> E

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,C,B,D box;
class E hub;`;

const DIAGRAM_OPPORTUNITY_GAP = `flowchart TB
A["潜在顧客全体のニーズ・市場機会"] --> B["現在満たせている部分 = Current Value"]
A --> C["まだ満たせていない部分 = Unrealized Value 機会のギャップ"]
C --> D["仮説形成"]
D --> E["小さな実験"]
E --> F["学習した内容を戦略・ロードマップに反映"]
F --> B

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;`;

const DIAGRAM_SPRINT_REVIEW_LOOP = `flowchart LR
A["Increment"] --> B["Sprint Review"]
C["CV・UVの測定データ"] --> B
D["ステークホルダーのフィードバック"] --> B
B --> E["Product Backlogの調整 適応"]
B --> F["戦略・優先順位の見直し"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,C,D,E,F box;
class B hub;`;
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

        <div class="callout source" data-variant="source" data-testid="callout">
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

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>試験対策では「どのFocus Areaの、どの概念が問われているか」をまず特定する癖をつけると、選択肢の絞り込みが速くなります。特にScrumシナリオの選択肢が複数正解に見える場合、「これはCurrent Valueの話かUnrealized Valueの話か」「これはT2MかA2Iか」という軸で切り分けると精度が上がります。</p>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/professional-agile-leadership-evidence-based-management-certification</a></li>
            <li><a href="https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management</a></li>
            <li><a href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">https://www.scrum.org/professional-scrum-competencies</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 3. Empiricism ===================== -->
      <section id="empiricism">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 03</div>
        <h2>経験主義(Empiricism)― なぜ、いつ必要か</h2>

        <h3>3.1 経験主義の3本柱</h3>
        <p>Scrum GuideおよびEBM Guideが共通して基盤とするのが「経験主義(Empiricism)」です。経験主義とは、知識は経験から生まれ、意思決定は観察された事実(evidence)に基づくべきという考え方です。Scrumはこの経験主義を支える3本柱の上に成り立っています。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">柱</th><th scope="col">意味</th><th scope="col">EBMにおける位置づけ</th></tr></thead>
            <tbody>
              <tr><td>Transparency(透明性)</td><td>プロセスと成果物が、それを見る人全員に見える形で共有されていること</td><td>KVAの測定結果を関係者全員に公開することが前提になる</td></tr>
              <tr><td>Inspection(検査)</td><td>進捗や成果物を頻繁かつ注意深く検査し、望ましくない差異を検出すること</td><td>Sprint ReviewなどでKVAの測定値を検査する</td></tr>
              <tr><td>Adaptation(適応)</td><td>検査の結果、プロセスや成果物が許容範囲外だと判断された場合に速やかに調整すること</td><td>測定結果に基づき戦略・バックログ・投資配分を調整する</td></tr>
            </tbody>
          </table>
        </div>

        <h3>3.2 なぜ「複雑な問題」に経験主義が必要なのか</h3>
        <p>ソフトウェアプロダクト開発や組織変革は「複雑(complex)」な問題領域に属することが多く、事前に全ての要件・結果を正確に予測することができません。これに対し、伝統的なマネジメント手法の多くは「定義的(defined)プロセス制御」、つまり「決められた通りに実行すれば決められた結果が出る」という前提に立っています。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">アプローチ</th><th scope="col">前提</th><th scope="col">適した問題領域</th><th scope="col">リスク</th></tr></thead>
            <tbody>
              <tr><td>定義的プロセス制御(伝統的マネジメント)</td><td>インプットとプロセスが同じならアウトプットも同じになる</td><td>単純(simple)〜煩雑(complicated)な問題</td><td>複雑な問題に適用すると予測が外れやすい</td></tr>
              <tr><td>経験主義的プロセス制御(Scrum / EBM)</td><td>結果は不確実なので、頻繁な検査と適応で軌道修正する</td><td>複雑(complex)な問題</td><td>短いサイクルでの検査・適応の規律が必要</td></tr>
            </tbody>
          </table>
        </div>

        <h3>3.3 検査と適応のサイクル</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EMPIRICISM_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">透明性・検査・適応の循環サイクル</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>測定指標(メトリクス)は必ず「誰が見ても同じ意味に解釈できる」形で公開する。</strong>透明性の担保につながる。</li>
            <li><strong>検査の頻度は、変化のスピードと不確実性の高さに応じて設計する。</strong>Sprint Reviewはその代表的なイベントの一つ。</li>
            <li><strong>「適応」を行わない検査は意味がない。</strong>検査結果が許容範囲外だった場合の意思決定プロセスをあらかじめ決めておく。</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/scrum-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/scrum-guide(Scrum Guide 経験主義の記述)</a></li>
            <li><a href="https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 4. What is EBM ===================== -->
      <section id="what-is-ebm">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target" aria-hidden="true" />SECTION 04</div>
        <h2>Evidence-Based Management™(EBM)とは何か</h2>

        <h3>4.1 定義と目的</h3>
        <p>Evidence-Based Management™(EBM)は、Ken SchwaberとScrum.orgが開発したフレームワークで、正式名称は<strong>「The Evidence-Based Management Guide: Improving Value Delivery Under Conditions of Uncertainty」</strong>です。組織が不確実性の高い状況下でプロダクト提供から得られる価値を測定・管理・向上させるための経験主義的アプローチを提供します。</p>
        <p>EBMの目的は、意思決定を「勘」や「権威」ではなく「観察可能な証拠(evidence)」に基づかせることで、リスクを低減し、戦略目標に向けたアジリティを高めることです。</p>

        <h3>4.2 EBMの基本サイクル</h3>
        <p>EBMは「目標を設定する → 測定する → 実験する → 学習し改善する」というサイクルを繰り返します。これは経験主義の3本柱(透明性・検査・適応)を組織レベルの価値提供に応用したものです。</p>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EBM_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">EBMの基本サイクル(測定から学習・改善まで)</div>
        </div>

        <h3>4.3 EBMが解決しようとする課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">課題</th><th scope="col">EBMによるアプローチ</th></tr></thead>
            <tbody>
              <tr><td>「忙しく働いているのに価値が出ているか分からない」</td><td>アウトプット指標ではなくアウトカム指標(4つのKVA)で価値を可視化する</td></tr>
              <tr><td>「大規模な投資判断が勘や政治力で決まる」</td><td>小さな実験と測定結果というevidenceに基づいて意思決定する</td></tr>
              <tr><td>「イノベーションが停滞している」</td><td>Ability to Innovate(A2I)を明示的に測定・改善対象にする</td></tr>
              <tr><td>「市場機会を逃している」</td><td>Unrealized Value(UV)として機会のギャップを可視化する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>EBMは「特定の指標セットを導入すること」がゴールではない。</strong>組織の戦略目標に紐づく、その組織固有の測定指標を見つけることが本質。</li>
            <li><strong>測定すること自体を目的化しない。</strong>「何を改善したいのか」を先に定義し、そのための指標を選ぶ順序を守る。</li>
            <li><strong>EBM Guideの最新版では具体的な指標例は「付録(Appendix)の参考例」という位置づけである。</strong>組織はそれをそのまま採用するのではなく自組織のコンテキストに合わせて選定することが推奨されている。</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/evidence-based-management(EBM Guideダウンロードページ)</a></li>
            <li><a href="https://www.infoq.com/articles/evidence-based-management-guide-updated" target="_blank" rel="noopener">https://www.infoq.com/articles/evidence-based-management-guide-updated</a></li>
            <li><a href="https://www.scrum.org/resources/blog/3-questions-consider-when-getting-started-evidence-based-management-ebm" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/3-questions-consider-when-getting-started-evidence-based-management-ebm</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 5. Four Key Value Areas ===================== -->
      <section id="four-kvas">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 05</div>
        <h2>4つの主要価値領域(Key Value Areas, KVA)</h2>

        <p>PAL-EBM試験における最重要トピックです。EBMは価値を4つの「主要価値領域(Key Value Areas, KVA)」に分解して捉えます。2つは「市場に向き合う価値(Market Value)」、残り2つは「価値を提供する組織能力(Ability to Deliver Value)」に関するものです。</p>

        <h3>5.1 全体マップ</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_KVA_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">4つのKVAの全体マップ(市場価値と価値提供能力)</div>
        </div>

        <h3>5.2 各KVAの定義と問いかけ</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">KVA</th><th scope="col">問いかけ</th><th scope="col">定義</th><th scope="col">分類</th></tr></thead>
            <tbody>
              <tr><td>Current Value(CV)</td><td>「今、顧客に届けている価値は何か？」</td><td>プロダクトが現時点で顧客・利用者に提供している価値の大きさ</td><td>市場価値</td></tr>
              <tr><td>Unrealized Value(UV)</td><td>「まだ捉えられていない価値・機会はどれだけあるか？」</td><td>すべての潜在顧客・利用者のニーズを満たした場合に実現しうる価値と、現状とのギャップ</td><td>市場価値</td></tr>
              <tr><td>Time-to-Market(T2M)</td><td>「新しい価値をどれだけ速く届けられるか？」</td><td>組織が新しい機能・サービス・プロダクトを届け、そこから学習するまでの速さ・応答性</td><td>組織能力</td></tr>
              <tr><td>Ability to Innovate(A2I)</td><td>「新しい価値を生み出す力はどれだけあるか？」</td><td>組織が新しい能力を効果的に届け続けられるかどうかの実効性(技術的負債や運用上のムダに影響を受ける)</td><td>組織能力</td></tr>
            </tbody>
          </table>
        </div>

        <h3>5.3 各KVAの詳細とベストプラクティス</h3>
        <h4>Current Value(CV)</h4>
        <p>現在プロダクトが提供している価値のスナップショット。顧客満足度、利用状況(テレメトリデータ)、収益指標などから構成されることが多い。</p>
        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>稼働率や機能数のような「アウトプット」ではなく、顧客が実際にどう使い、どう満足しているかという「アウトカム」ベースで測定する。</p>
        </div>

        <h4>Unrealized Value(UV)</h4>
        <p>「今のプロダクトが全ての潜在顧客・全てのニーズを満たしたら、どれだけの価値を実現できるか」という理論上の上限と、現状とのギャップ。新機能や新市場セグメント、新しいプロダクトラインの可能性を評価する際の拠り所になる。</p>
        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>UVは「絶対に正確に測れる数値」ではなく、意思決定の方向づけに使う指標として扱う。市場調査・顧客インタビュー・競合分析などの定性情報も組み合わせる。</p>
        </div>

        <h4>Time-to-Market(T2M)</h4>
        <p>新しい価値を市場に届け、そこからフィードバック・学習を得るまでの速さ。サイクルタイム、リリース頻度などで測定されることが多い。</p>
        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>T2Mを短縮すること自体が目的化しないよう注意する。速く届けても学びを得られなければ意味がない。「届ける速さ」と「学ぶ速さ」をセットで捉える。</p>
        </div>

        <h4>Ability to Innovate(A2I)</h4>
        <p>組織が新しい能力・機能を効果的に届け続けられる実効性。技術的負債、本番障害の傾向、運用上のムダなどに直接影響を受ける。</p>
        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>短期的なデリバリー速度を優先するあまり技術的負債を放置すると、中長期的にA2Iが低下する。EBMでは技術的負債の削減も価値提供能力への投資として扱う。</p>
        </div>

        <h3>5.4 よくある誤解(試験の落とし穴)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">誤解</th><th scope="col">正しい理解</th></tr></thead>
            <tbody>
              <tr><td>ベロシティ(Velocity)はEBMの価値指標である</td><td>ベロシティはチーム内部のキャパシティ計画のための相対指標であり、顧客価値・品質・ビジネス成果を測るものではない</td></tr>
              <tr><td>KVAはどれか1つだけ改善すれば良い</td><td>4つのKVAはトレードオフの関係にあることが多く、バランスを見ながら測定・改善する必要がある</td></tr>
              <tr><td>EBM Guideが定める指標をそのまま使うべき</td><td>EBM Guide付録の指標例はあくまで「例」であり、組織固有のコンテキストに合わせて選定すべきもの</td></tr>
              <tr><td>Unrealized Valueは正確に算出できる確定値である</td><td>UVは意思決定の方向性を示す推定値であり、仮説検証を通じて更新され続けるもの</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/evidence-based-management</a></li>
            <li><a href="https://www.scrum.org/resources/how-measure-value-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/how-measure-value-evidence-based-management</a></li>
            <li><a href="https://www.scrum.org/resources/blog/pitfalls-challenges-implementing-ebm" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/pitfalls-challenges-implementing-ebm</a></li>
            <li><a href="https://www.thescrummaster.co.uk/docs/what-are-the-four-key-value-areas-kvas-in-ebm-and-what-do-they-represent/" target="_blank" rel="noopener">https://www.thescrummaster.co.uk/docs/what-are-the-four-key-value-areas-kvas-in-ebm-and-what-do-they-represent/</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 6. Product Value ===================== -->
      <section id="product-value">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:package" aria-hidden="true" />SECTION 06</div>
        <h2>プロダクトバリュー(Product Value)の評価方法</h2>

        <p>Focus Area「Managing Products with Agility」の一部で、プロダクトが提供する価値を評価する多様な方法を扱います。</p>

        <h3>6.1 アウトプット指標とアウトカム指標</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">種類</th><th scope="col">説明</th><th scope="col">例</th><th scope="col">落とし穴</th></tr></thead>
            <tbody>
              <tr><td>アウトプット指標(Output)</td><td>チームが「作った量・こなした量」を表す</td><td>ベロシティ、完了ストーリーポイント数、リリース回数</td><td>顧客価値と相関しない場合がある</td></tr>
              <tr><td>アウトカム指標(Outcome)</td><td>顧客・ビジネスに実際に起きた「変化」を表す</td><td>顧客満足度、継続利用率、収益への貢献</td><td>測定に時間がかかる／因果関係の特定が難しい</td></tr>
            </tbody>
          </table>
        </div>

        <h3>6.2 プロダクトバリューをKVAで捉える</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_PRODUCT_VALUE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">プロダクトバリューをCurrent Value / Unrealized Valueで捉える流れ</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>単一の指標に依存せず、CV/UVの両面から「今」と「これから」をセットで評価する。</strong></li>
            <li><strong>顧客の声(定性データ)とテレメトリ(定量データ)を組み合わせることで、指標の解釈精度を高める。</strong></li>
            <li><strong>Product Ownerは、プロダクトバックログの並び替え判断にCV/UVの測定結果を反映させる。</strong></li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management</a></li>
            <li><a href="https://www.scrum.org/resources/how-measure-value-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/how-measure-value-evidence-based-management</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 7. Business Strategy ===================== -->
      <section id="business-strategy">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:trending-up" aria-hidden="true" />SECTION 07</div>
        <h2>ビジネス戦略とUnrealized Value</h2>

        <p>Focus Area「Business Strategy」では、Unrealized Valueの概念を「潜在的な機会の追求」にどう応用するかが問われます。</p>

        <h3>7.1 機会のギャップという考え方</h3>
        <p>顧客・利用者が「今体験していること」と「本来体験したいこと」の間にギャップがあるとき、そのギャップこそがUnrealized Valueであり、戦略的な投資機会の源泉になります。</p>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_OPPORTUNITY_GAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">機会のギャップからUnrealized Valueを捉え、戦略へ反映する流れ</div>
        </div>

        <h3>7.2 戦略判断への活かし方</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">状況</th><th scope="col">戦略的示唆</th></tr></thead>
            <tbody>
              <tr><td>CVは高いがUVも大きい</td><td>既存顧客基盤を維持しつつ、新市場・新機能への投資余地がある</td></tr>
              <tr><td>CVが低くUVが大きい</td><td>現行プロダクトが市場ニーズとズレている可能性があり、方向転換(ピボット)の検討材料になる</td></tr>
              <tr><td>CV・UVともに小さい</td><td>市場自体が縮小している、またはプロダクトのポジショニングを見直す必要がある可能性</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>戦略立案時にUVを「確定した機会」として扱わず、仮説として検証対象にする。</strong></li>
            <li><strong>市場セグメントごとにCV/UVを分解して評価すると、画一的な打ち手を避けられる。</strong></li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management</a></li>
            <li><a href="https://www.scrum.org/resources/evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/evidence-based-management</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 8. Stakeholders & Customers ===================== -->
      <section id="stakeholders-customers">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 08</div>
        <h2>ステークホルダーと顧客管理</h2>

        <p>Focus Area「Stakeholders &amp; Customers」では、Current ValueとUnrealized Valueの概念をステークホルダー・顧客管理にどう応用するかが問われます。</p>

        <h3>8.1 Sprint Reviewを起点とするフィードバックループ</h3>
        <p>Scrumの中で、ステークホルダー・顧客と直接対話し、プロダクトの現在価値と将来価値についてのフィードバックを得る中心的なイベントがSprint Reviewです。EBMの観点では、Sprint ReviewはCV/UVの測定結果を検査し、次の適応(バックログの調整、戦略の見直し)につなげる重要な機会として位置づけられます。</p>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SPRINT_REVIEW_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
          <div class="diagram-caption">Sprint Reviewを起点とするフィードバックループ</div>
        </div>

        <h3>8.2 ステークホルダーマッピングの観点</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th scope="col">観点</th><th scope="col">説明</th></tr></thead>
            <tbody>
              <tr><td>影響力(Influence)</td><td>意思決定にどれだけ影響を与えられるか</td></tr>
              <tr><td>関心(Interest)</td><td>プロダクトの成果にどれだけ関心を持っているか</td></tr>
              <tr><td>価値の受益者か</td><td>Current Value / Unrealized Valueの直接の受益者かどうか</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>ステークホルダーごとに「どのKVAに関心があるか」を把握しておく。</strong>対話の焦点を絞りやすい(例：経営層はUV・A2I、現場顧客はCVに関心が強い傾向)。</li>
            <li><strong>Sprint Reviewを単なる進捗報告の場にせず、測定結果に基づく意思決定の場として設計する。</strong></li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management" target="_blank" rel="noopener">https://www.scrum.org/resources/suggested-resources-professional-agile-leadershiptm-evidence-based-management</a></li>
            <li><a href="https://www.scrum.org/resources/scrum-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/scrum-guide(Scrum Guide: Sprint Reviewの目的)</a></li>
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
