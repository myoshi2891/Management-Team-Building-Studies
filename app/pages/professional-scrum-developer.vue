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

const DIAGRAM_EMERGENT_ARCHITECTURE = `flowchart LR
G["最初に大まかな アーキテクチャ方針を決める"] --> S1["Sprint 1: 動くものを作る"]
S1 --> R1["得られた知見で 設計をリファクタリング"]
R1 --> S2["Sprint 2: 機能を追加"]
S2 --> R2["さらにリファクタリング"]
R2 --> S3["Sprint N: 継続"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class G hub;
class S1,R1,S2,R2,S3 box;`;

const DIAGRAM_TDD_CYCLE = `flowchart LR
RED["Red 失敗するテストを書く"] --> GREEN["Green テストを通す 最小限の実装"]
GREEN --> REFACTOR["Refactor 重複を排除し 設計を改善"]
REFACTOR --> RED

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class RED hub;
class GREEN,REFACTOR box;`;

const DIAGRAM_TEST_PYRAMID = `flowchart TB
UI["UI / E2Eテスト 実行数は少なく低速 実際のユーザー操作に近い"]
IT["統合テスト Integration Tests コンポーネント間の結合を検証"]
UT["ユニットテスト Unit Tests 数が多く高速 個々のロジックを検証"]
UT --> IT
IT --> UI

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class UT hub;
class IT,UI box;`;
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

      <!-- ===================== 3. Part B: Developing and Delivering Products Professionally ===================== -->
      <section id="part-b-developing-delivering">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:code" aria-hidden="true" />SECTION 03</div>
        <h2>Part B: プロフェッショナルとしてのプロダクト開発と提供</h2>

        <p>このコンピテンシーが、PSD Iを他のScrum.org資格(PSM Iなど)と差別化する中核部分です。「Developing and Delivering Products Professionally」というコンピテンシーは、高品質なプロダクトを反復的・漸進的に、しかも高い頻度で提供することを目的としています。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/professional-scrum-competencies/developing-and-delivering-products-professionally" target="_blank" rel="noopener">Professional Scrum Competency: Developing and Delivering Products Professionally</a></li>
          </ul>
        </div>

        <h3>3.1 プロダクトバックログリファインメント(Backlog Refinement)</h3>
        <p>リファインメントとは、プロダクトバックログアイテムに詳細・見積もり・順序を追加していく継続的な活動です。Scrum Guideでは正式な「イベント」ではなく、必要に応じて随時行う活動として位置づけられています。</p>
        <ul>
          <li>大きすぎるアイテムを、より小さく、より扱いやすい単位に分割する。</li>
          <li>受け入れ基準(Acceptance Criteria)を明確にし、Developersが実装可能な粒度まで具体化する。</li>
          <li>見積もりの精度を高め、次のスプリント以降の計画をしやすくする。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>リファインメントに使う時間は、かつてScrum Guideに記載されていた「スプリントの稼働時間の10%以下」という目安が実務でも参照されることがある。ただしこれは現行のScrum Guideにも試験の規則にも存在しない過去の目安であり、プロダクトバックログの状態やチームの習熟度に応じて必要な時間を調整するのが本来の考え方である。</li>
            <li>ユーザーストーリーの分割には「垂直分割(画面から永続化層まで一気通貫で薄く切る)」を優先し、「水平分割(フロントだけ、バックエンドだけ)」は避ける。垂直に分割することで、各アイテムが独立して「動く」ものとして完成させられる。</li>
            <li>INVEST(Independent, Negotiable, Valuable, Estimable, Small, Testable)の観点でアイテムの品質をチェックする。</li>
          </ul>
        </div>

        <h3>3.2 職能横断型チーム(Cross-functional)</h3>
        <p>Developersは、Increment を作成するために必要なすべてのスキルを、チーム全体として持っている必要があります。個々人が全スキルを持つ必要はなく、チーム全体として職能横断的であればよい、という点が重要です。</p>
        <ul>
          <li>特定の専門家(DBA、フロントエンド専任など)に依存すると、その人が不在のときにボトルネックが発生する。</li>
          <li>T型人材(一つの専門を深く持ちつつ周辺領域もある程度対応できる)を育てることで、チームのフロー効率が上がる。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>ペアプログラミングやモブプログラミングは、知識のサイロ化を防ぎ、チーム全体のクロスファンクショナル性を高める実践的な手段として推奨される。</li>
            <li>スキルマトリクス(誰が何を得意とするかの可視化表)を作り、意図的にペア構成やタスクアサインをローテーションする。</li>
          </ul>
        </div>

        <h3>3.3 自己管理型の開発(Self-managed Development)</h3>
        <p>Scrum Guide 2020では「自己組織化(Self-organizing)」から「自己管理(Self-managing)」へと用語が変わりました。自己管理とは、Scrum Team全体が「誰が」「どのように」「何を」行うかを、チーム内部で決定することを指します(外部からの管理・指示ではなく)。その内訳として、Product OwnerがProduct Backlogの順序付けに責任を持ち、DevelopersがSprint Backlogを作成し、その実現方法を自分たちで計画・適応します。</p>
        <ul>
          <li>自己管理には、適切な開発スキルの存在だけでなく、協働・チームコミットメント・共同の課題オーナーシップ・共有ゴール・創造性が必要とされる。</li>
          <li>マネージャーがタスクを個人に割り当てるのではなく、チーム自身がSprint Backlogの中でタスクを引き受けていく。</li>
        </ul>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/suggested-reading-professional-scrum-developer" target="_blank" rel="noopener">Suggested Reading for PSD I 内 "Cross-Functional, Self-Managed Development" の項</a></li>
          </ul>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>自己管理は「放任」ではありません。明確なSprint Goal・DoD・透明性という「枠組み」があってはじめて機能する自由度です。PSD Iでは「マネージャーがDevelopersにタスクを割り振るべきか」といった設問で、自己管理の原則からの逸脱を見抜けるかが問われます。</p>
        </div>

        <h3>3.4 設計とアーキテクチャ(Design and Architecture)</h3>
        <p>Scrumでは、詳細な設計を事前にすべて確定させる「Big Design Up Front(BDUF)」ではなく、アーキテクチャの境界の中で設計が創発的(Emergent)に育っていくアプローチを取ります。</p>
        <ul>
          <li>アーキテクチャの大枠(境界・原則)は初期に方向性を定めるが、詳細はスプリントを重ねる中で、実際に得られた知見をもとに進化させる。</li>
          <li>YAGNI(You Aren't Gonna Need It)の原則に従い、「今必要なもの」だけを作り、将来のための過剰設計を避ける。</li>
          <li>リファクタリングを継続的に行うことで、設計をコードベースの成長に追従させる。</li>
        </ul>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EMERGENT_ARCHITECTURE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">創発的アーキテクチャがスプリントを重ねる中で育っていく流れ</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>アーキテクチャ決定の背景を記録する軽量な手法として ADR(Architecture Decision Record)を使い、なぜその設計を選んだかをチームで共有する。</li>
            <li>技術的な選択肢を早期に検証するために、スパイク(時間を区切った調査用の作業)を活用する。</li>
            <li>ドキュメンテーションは「作って終わり」ではなく、コードや設計と同様に継続的にメンテナンスする対象として扱う。</li>
          </ul>
        </div>

        <h3>3.5 プログラミング(Programming)</h3>
        <p>PSD Iでは、具体的なプログラミング言語や実装テクニックそのものよりも、Scrumの文脈でどのようなプログラミングプラクティスが「継続的に高品質なDoneの増分」を支えるかが問われます。</p>
        <ul>
          <li><strong>テスト駆動開発(TDD): </strong>先にテストを書き、そのテストを通す最小限の実装を行い、その後リファクタリングするサイクル(Red → Green → Refactor)。</li>
          <li><strong>ペアプログラミング / モブプログラミング: </strong>知識共有と品質担保を同時に行う協働的な実装スタイル。</li>
          <li><strong>クリーンコード: </strong>可読性・単純性を重視し、将来の変更コストを下げるコーディング。</li>
          <li><strong>継続的リファクタリング: </strong>機能を変えずに内部構造を改善し続けることで、技術的負債の蓄積を防ぐ。</li>
        </ul>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TDD_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">テスト駆動開発(TDD)のRed-Green-Refactorサイクル</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>TDDは「テストを後から書く」文化と対比され、設計の質を早期に検証する手段として位置づけられる。</li>
            <li>コードレビューをDefinition of Doneの一部に組み込み、属人化と品質低下を防ぐ。</li>
            <li>静的解析・Linter・フォーマッタをCIパイプラインに組み込み、レビューの負荷を「スタイルの指摘」から「設計・ロジックの指摘」にシフトさせる。</li>
          </ul>
        </div>

        <h3>3.6 品質(Quality)</h3>
        <p>品質は「後から付け加えるもの」ではなく、開発プロセス全体に組み込まれるべきものだという考え方が、Scrumのエンジニアリングプラクティスの中核にあります。</p>
        <ul>
          <li><strong>継続的品質(Continuous Quality): </strong>品質保証をスプリント末のフェーズとして切り離すのではなく、日々の開発活動の中に統合する。</li>
          <li><strong>技術的負債(Technical Debt): </strong>短期的な近道の代償として将来発生する追加コスト。可視化し、計画的に返済する対象として扱う。</li>
          <li><strong>技術的リスクの管理(Managing Technical Risk): </strong>不確実性の高い技術要素を早期に検証し、後工程での手戻りを防ぐ。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>技術的負債をプロダクトバックログに可視化し、「見えない負債」を「管理可能な負債」に変える。</li>
            <li>サイクルタイム(Cycle Time)やリードタイムなどのフロー指標をチームで計測し、品質と速度のトレードオフを定量的に把握する。</li>
            <li>Definition of Doneに品質基準(テストカバレッジ、静的解析の合格、パフォーマンス基準など)を明示的に組み込む。</li>
          </ul>
        </div>

        <h3>3.7 テスト(Testing)</h3>
        <p>Scrumが求めるのは「Definition of Doneを満たす利用可能なIncrementを毎Sprint作成すること」であり、これを支えるうえでテストは開発の一部として組み込まれている必要があります(作成したIncrementを実際にユーザーへリリースするかどうかは、Sprintの途中でも終了時でも別途判断される任意の活動です)。どこまで自動化し、手動テストへの依存をどの程度減らすかは、Scrumが規定するものではなく、チームや組織がDefinition of Doneとして定める品質基準の問題です。多くの現場では、スプリントごとにリリース可能な品質を保つ手段として自動化されたテストが選ばれています。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TEST_PYRAMID" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">ユニットテストを土台とするテストピラミッド</div>
        </div>

        <ul>
          <li><strong>テストピラミッド: </strong>ユニットテストを土台に多く配置し、統合テスト、E2E/UIテストの順に数を絞っていく考え方。逆ピラミッド(UIテストに偏重する構成)はメンテナンスコストが高く壊れやすい。</li>
          <li><strong>受け入れテスト駆動開発(ATDD): </strong>実装に着手する前に、ビジネス側と合意した受け入れ基準をテストとして定義し、そのテストが通ることで完成を判断する手法。</li>
          <li><strong>振る舞い駆動開発(BDD): </strong>望ましい振る舞いをドメインの言葉(ユビキタス言語)で記述し、関係者の共通理解を作ることに主眼を置く補完的なアプローチ。ATDDと組み合わせて用いられることが多い。</li>
          <li><strong>探索的テスト: </strong>自動化だけでは見つけにくいユーザビリティやエッジケースの問題を、テスターが能動的に探索して発見する手法。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>どこまでのテストをDefinition of Doneに含めるかをチームで合意する。「テストが書かれていない機能はDoneとしない」という基準を置く現場は多いが、これはScrumが定める規則ではなく、チームまたは組織が選んだDoDである。</li>
            <li>テスターはスプリントの最後にまとめて作業するのではなく、リファインメントや実装の初期段階からDevelopersと協働する(シフトレフト)。</li>
            <li>CIパイプライン上でテストスイートを自動実行し、失敗した場合はビルドを止める「壊れたビルドを放置しない」文化を徹底する。</li>
          </ul>
        </div>
      </section>

      <!-- ===================== 4. Part C: Developing People and Teams ===================== -->
      <section id="part-c-people-teams">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 04</div>
        <h2>Part C: 人とチームの成長</h2>

        <p>このコンピテンシーは、Scrumチームが「単に手順を回す集団」から「継続的に学習し成長するチーム」へと成熟していくために必要な、対人的なスキルを扱います。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/professional-scrum-competency-developing-people-and-teams" target="_blank" rel="noopener">Professional Scrum Competency: Developing People and Teams</a></li>
          </ul>
        </div>

        <h3>4.1 自己管理型チーム(Self-Managing Teams)</h3>
        <p>複雑な問題に取り組むチームを支援する最良の方法は、チームに「どう仕事をするか」を細かく指示することではなく、チーム自身が決められる余地(スペース)を与えることです。</p>
        <ul>
          <li>自己管理型チームには、明確な境界(ゴール・制約・Definition of Done)が必要。境界がないまま自由度だけを与えると混乱を招く。</li>
          <li>「自己管理=マネージャー不要」という誤解が多いが、実際には組織的な支援やコーチングは依然として必要。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>チームの自己管理度合いを一足飛びに最大化しようとせず、段階的に権限移譲していく(タスクの割り当て→見積もり→スプリント計画→リリース判断、の順で裁量を広げるなど)アプローチが実務では有効とされます。</p>
        </div>

        <h3>4.2 ファシリテーション(Facilitation)</h3>
        <p>ファシリテーションとは、参加・当事者意識・創造性を促す形で、人々を合意された目標に導く技術です。Scrum Masterに限らず、Developers自身がミーティングや議論をファシリテートできることが望ましいとされます。</p>
        <ul>
          <li>Scrumイベント(特にSprint RetrospectiveやRefinement)は、ファシリテーション技術を活用することで質が大きく変わる。</li>
          <li>特定の声の大きい人だけが発言する状況を避け、全員の視点を引き出す工夫(ラウンドロビン、匿名アイデア出しなど)が重要。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>レトロスペクティブでは、毎回同じフォーマット(例: KPT、Start-Stop-Continue)だけに頼らず、チームの状況に応じてファシリテーション手法を変えることでマンネリ化を防ぐ。</p>
        </div>

        <h3>4.3 コーチングとメンタリング(Coaching and Mentoring)</h3>
        <ul>
          <li><strong>コーチング: </strong>コーチはプロセスの専門家として振る舞い、対話や積極的傾聴、示唆に富む質問を通じて、相手自身が答えにたどり着けるよう支援する。</li>
          <li><strong>メンタリング: </strong>メンターが自身の経験・専門知識に基づいて、メンティーに具体的なガイダンスを提供する、双方向の関係性。</li>
        </ul>
        <p>両者は混同されがちですが、コーチングは「答えを引き出す」、メンタリングは「答え(または方向性)を提供する」という違いがあります。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>経験豊富なDeveloperが新しいメンバーに対してペアプログラミングを通じてメンタリングを行うことは、知識移転とオンボーディングの高速化に直結する実践例としてよく挙げられます。</p>
        </div>
      </section>

      <!-- ===================== 5. Part D: Managing Products with Agility ===================== -->
      <section id="part-d-managing-products">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-details" aria-hidden="true" />SECTION 05</div>
        <h2>Part D: アジリティを持ったプロダクトマネジメント</h2>

        <p>PSD Iでは主にProduct Ownerの役割とされる領域からも、Developerとして知っておくべき部分が出題されます。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/professional-scrum-competencies/managing-products-with-agility" target="_blank" rel="noopener">Professional Scrum Competency: Managing Products with Agility</a></li>
          </ul>
        </div>

        <h3>5.1 予測とリリース計画(Forecasting and Release Planning)</h3>
        <p>予測とリリース計画はScrumが規定するルールではなく、Scrumを補完する実践です。多くのチームは、大きな一度きりのビッグバンリリースではなく、小さく頻繁な増分リリースを導くためのガイドとしてこれらを用います(Scrumが求めるのはDefinition of Doneを満たすIncrementを毎Sprint作成することまでで、リリースの可否とタイミングは別途の判断です)。</p>
        <ul>
          <li>ベロシティ(過去の実績)をもとにした予測は「約束」ではなく、不確実性を伴う目安として扱う。</li>
          <li>経験主義に基づき、計画は一度立てたら終わりではなく、スプリントを重ねるごとに継続的に更新する。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>バーンダウン / バーンアップチャートだけに頼らず、スコープの変化そのものを可視化する(バーンアップチャートはスコープの増減が見えやすい)ことで、ステークホルダーとの期待値調整がしやすくなります。</p>
        </div>

        <h3>5.2 プロダクト価値(Product Value)</h3>
        <p>Scrumチームの目的は、顧客とステークホルダーに価値を届けることです。価値の定義・測定・検証を継続的に行うことが求められます。</p>
        <ul>
          <li>価値を継続的に定義し、実際に実現された価値を測定し、仮説を検証し、傾向を分析することが鍵となる。</li>
          <li>アウトプット(作った機能の数)ではなく、アウトカム(それによって生まれた成果)で成功を測る。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>リリース後の利用状況やビジネス指標(例: 離脱率、コンバージョン率)をチームにフィードバックする仕組みを作り、「作ったら終わり」にしない。</p>
        </div>

        <h3>5.3 プロダクトバックログマネジメント(Product Backlog Management)</h3>
        <p>プロダクトバックログの効果的な管理には、Scrumチーム自身を含む多様なステークホルダーからの入力と協働が必要です。透明性のレベルは、ステークホルダーのニーズに応じて進化させる必要があります。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>DevelopersはPBMを「Product Ownerだけの仕事」と捉えず、技術的な観点からアイテムの分割・見積もり・依存関係の指摘に積極的に関わることで、バックログの質を高められます。</p>
        </div>

        <h3>5.4 ステークホルダーと顧客(Stakeholders and Customers)</h3>
        <p>ステークホルダーとの関わり方は、Sprint Reviewを中心に設計されますが、それだけに閉じません。継続的なフィードバックループを設計することが重要です。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>Sprint Reviewを「完成した機能の発表会」にせず、ステークホルダーと一緒に次の優先順位を議論する場として設計する。</p>
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
