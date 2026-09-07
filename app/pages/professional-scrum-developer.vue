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

const DIAGRAM_EMPIRICISM_PILLARS = `flowchart LR
T["透明性 Transparency プロセスと成果物が 関係者に見える状態"] --> I["検査 Inspection 進捗と成果物を 頻繁に検査する"]
I --> AD["適応 Adaptation ずれが見つかったら すぐに調整する"]
AD -.->|"フィードバック"| T

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class T,I,AD box;`;

const DIAGRAM_SPRINT_EVENTS = `flowchart LR
SP["Sprint Planning Whatと Howと Whyを決める"] --> DS["Daily Scrum 毎日15分 進捗を検査し計画を調整"]
DS --> DS
DS --> SR["Sprint Review 増分を検査し バックログを適応させる"]
SR --> RETRO["Sprint Retrospective チームの働き方を 検査し改善する"]
RETRO --> SP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SP hub;
class DS,SR,RETRO box;`;
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

      <!-- ===================== 2. Part A: Scrum Framework ===================== -->
      <section id="part-a-scrum-framework">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
        <h2>Part A: Scrumフレームワークの理解と適用</h2>

        <p>このコンピテンシーは、Scrumを実践する上での土台となる部分です。Scrum Guide(2020年11月版)が一次情報源であり、PSD Iの設問の多くはScrum Guideの記述に忠実に基づいています。</p>

        <h3>2.1 経験主義(Empiricism)</h3>
        <p>Scrumは経験主義に基づくフレームワークです。経験主義とは、「知識は経験からのみ得られ、意思決定は観察された事実に基づいて行うべきである」という考え方であり、事前に詳細な計画を立てて実行するのではなく、探索的なプロセスを通じて複雑な問題を解決していくアプローチを指します。</p>
        <p>経験主義を支えるのが「透明性(Transparency)」「検査(Inspection)」「適応(Adaptation)」という3つの柱です。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EMPIRICISM_PILLARS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">経験主義を支える透明性・検査・適応の3本柱</div>
        </div>

        <ul>
          <li><strong>透明性: </strong>不透明な情報の上では正しい検査はできず、誤った適応につながる。プロダクトバックログやスプリントの状態を関係者全員が同じ理解で見られる状態を作ることが前提となる。</li>
          <li><strong>検査: </strong>作業成果物やゴールへの進捗を、望ましくない差異を検出できる頻度で確認すること。検査自体が作業の妨げにならない程度の頻度・熱心さが求められる。</li>
          <li><strong>適応: </strong>プロセスや作成物のいずれかが許容範囲を逸脱していると判断された場合、できるだけ早く調整を行うこと。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>「動くソフトウェア」を頻繁に完成させることで、検査対象の透明性を最大化する(半分できた機能は検査しづらい)。</li>
            <li>スプリントレビューやデイリースクラムを「報告会」にせず、実際の増分(Increment)を見せて検査・適応につなげる。</li>
            <li>CI(継続的インテグレーション)や自動テストの可視化は、開発チームレベルでの透明性を支える技術的な裏付けになる。</li>
          </ul>
        </div>

        <h3>2.2 Scrumの5つの価値基準(Scrum Values)</h3>
        <p>Scrumチームの成功は、以下5つの価値基準をどれだけ体現できるかに懸かっています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>価値基準</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>Commitment(確約)</td><td>ゴール達成とお互いへのサポートを約束する</td></tr>
              <tr><td>Focus(集中)</td><td>スプリントの作業とゴールに集中する</td></tr>
              <tr><td>Openness(公開)</td><td>作業やその過程で生じる課題をオープンにする</td></tr>
              <tr><td>Respect(尊敬)</td><td>チームメンバーを能力ある独立した人として尊重する</td></tr>
              <tr><td>Courage(勇気)</td><td>正しいことをする勇気、難しい問題に取り組む勇気を持つ</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>Scrum Valuesは抽象的に見えますが、開発の現場では非常に具体的に効いてきます。たとえば「動かないコードを隠さずに Daily Scrum で共有する(Openness)」「技術的負債を指摘する(Courage)」など、日々のエンジニアリング行動と直結させて理解すると記憶に残りやすくなります。</p>
        </div>

        <h3>2.3 Scrum Team</h3>
        <p>Scrum Guide 2020では、Product Owner・Scrum Master・Developersの3つのアカウンタビリティ(責任)を持つ、単一のチーム「Scrum Team」という考え方に統一されました。以前存在した「Development Team」という入れ子のチーム概念は廃止されています。</p>
        <ul>
          <li><strong>Product Owner: </strong>プロダクトの価値を最大化する責任を持つ。プロダクトゴールの策定、プロダクトバックログの管理を担う。</li>
          <li><strong>Scrum Master: </strong>Scrumの理解と実践を組織・チームに根付かせる責任を持つ。真のリーダーとしてチームに奉仕する(サーバントリーダーシップ)。</li>
          <li><strong>Developers: </strong>スプリントごとに利用可能な増分の各側面を作成することにコミットする人たち。職能横断的(Cross-functional)かつ自己管理的である必要がある。</li>
        </ul>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/professional-scrum-competencies/understanding-and-applying-scrum-framework" target="_blank" rel="noopener">Professional Scrum Competency: Understanding and Applying the Scrum Framework</a></li>
          </ul>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>PSD I試験では「Developersの人数」「肩書き」「サブチーム」に関する設問で古い(2017年以前の)知識に基づく誤答選択肢が用意されていることがあります。「Development Teamという言葉自体がもう存在しない」という前提を必ず押さえておきましょう。</p>
        </div>

        <h3>2.4 Scrumイベント(Events)</h3>
        <p>5つのイベントは、経験主義の3本柱(透明性・検査・適応)を実践するための定期的な機会です。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SPRINT_EVENTS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">1つのSprintを構成する5つのイベントの循環</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>イベント</th><th>目的</th><th>タイムボックス(1か月スプリントの場合の目安)</th></tr></thead>
            <tbody>
              <tr><td>The Sprint</td><td>すべてのイベントを包含するコンテナ。一貫性のあるIncrementを生み出す</td><td>最大1か月</td></tr>
              <tr><td>Sprint Planning</td><td>今回のスプリントで「何を」「どう」「なぜ」やるかを計画する</td><td>最大8時間</td></tr>
              <tr><td>Daily Scrum</td><td>Sprint Goalに向けた進捗を検査し、計画を調整する</td><td>15分</td></tr>
              <tr><td>Sprint Review</td><td>Increment を検査し、プロダクトバックログを適応させる</td><td>最大4時間</td></tr>
              <tr><td>Sprint Retrospective</td><td>チーム自身の働き方(プロセス・ツール・人間関係)を検査し改善計画を立てる</td><td>最大3時間</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>Daily Scrumは「進捗報告会」ではなく「その日の計画を作り直すための検査・適応の場」と捉える。イベントの主体はDevelopersであり、Product OwnerやScrum MasterもSprint Backlogの作業を実際に行っている場合はDeveloperとして参加する。それ以外の同席者は、イベントを妨げない限り傍聴しても構わない(発言・報告を求める場にはしない)。</li>
            <li>Sprint Reviewは「デモの日」ではなく、ステークホルダーとの協働作業(コラボレーティブなワーキングセッション)として設計する。</li>
            <li>Sprint Retrospectiveの検査対象は、個人・相互作用・プロセス・ツール・Definition of Doneである(Scrum Guide 2020)。個人も検査の対象に含まれる点に注意する。個人を検査対象から外すのではなく、「個人を責める場にしない」ことと「個人の働き方を検査する」ことを区別して扱う。</li>
          </ul>
        </div>

        <h3>2.5 Scrum成果物(Artifacts)とコミットメント</h3>
        <p>Scrum Guide 2020では、3つの成果物それぞれに対応する「コミットメント」が明示されました。コミットメントは、その成果物が実際にどれだけ進捗しているかの透明性を高めるためのものです。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>成果物(Artifact)</th><th>内容</th><th>対応するコミットメント</th></tr></thead>
            <tbody>
              <tr><td>Product Backlog</td><td>プロダクトを改善するために必要な作業の、順序付けされた一覧</td><td>Product Goal(プロダクトゴール)</td></tr>
              <tr><td>Sprint Backlog</td><td>選択されたプロダクトバックログアイテム + 実現計画</td><td>Sprint Goal(スプリントゴール)</td></tr>
              <tr><td>Increment</td><td>完成した(Doneの)プロダクトバックログアイテムの積み上げ</td><td>Definition of Done(完成の定義)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>「成果物=物」「コミットメント=その成果物が目指す方向性・進捗の目安」という対応関係をセットで覚えると、設問で「Sprint Goalはどの成果物に対応するコミットメントか」といった問われ方をされても即答できます。</p>
        </div>

        <h3>2.6 完成の定義(Definition of Done)</h3>
        <p>Definition of Done(DoD)は、Incrementの品質基準を定める正式な記述です。プロダクトバックログアイテムがDoDを満たしたときにのみ、それは「Increment」の一部となります。</p>
        <ul>
          <li>DoDはScrum Teamがコンテキストに応じて作成する。組織で標準のDoDが存在する場合、それを最低ラインとして各Scrum Teamが独自にさらに厳しくすることは可能。</li>
          <li>DoDを満たさない作業は、Sprint Reviewで公開してはならない。むしろプロダクトバックログに戻し、次回以降のスプリントで再検討する。</li>
          <li>開発の過程でDoDに関する新しい知識が得られた場合、DoDの基準そのものを厳格化していくのが一般的な成熟プロセス。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>ソフトウェア開発の文脈では、DoDは単なる「テストが通った」だけでなく、「コードレビュー済み」「静的解析をクリア」「ドキュメント更新済み」「本番相当環境にデプロイ可能」などまで含めて定義することが望ましいとされます。DoDが甘いと、後工程に「隠れた未完成作業(技術的負債)」が積み上がっていく点が、PSD Iでは品質(Quality)や技術的リスクの管理の文脈と結び付けて出題されます。</p>
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
