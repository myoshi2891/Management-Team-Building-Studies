<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { MERMAID_THEME_VARIABLES } from "~/utils/mermaid-theme";

const TOC_IDS = [
  "how-to-use",
  "domain3-overview",
  "task1-adaptive-suitability",
  "task2-iteration-planning",
  "task3-project-controls",
  "task4-adaptive-components",
  "task5-task-management",
  "glossary",
  "checklist",
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
  title: "CAPM® ドメイン3 アジャイルフレームワーク/方法論 完全ガイド | Agile Frameworks/Methodologies",
  description: "PMI公式のCAPM Exam Content Outlineに基づく、ドメイン3アジャイルフレームワーク/方法論(試験全体の20%)の初学者向け解説ガイド。Scrum・XP・Kanban・SAFeの構成要素とベストプラクティスをMermaid図解付きで詳解し、一次ソースのURLを明記する。",
});


const DIAGRAM_TASK_OVERVIEW = `flowchart TD
D3["ドメイン3 アダプティブフレームワーク・方法論 5つのタスク"]
D3 --> T1["Task1 アダプティブアプローチが適切な場面を説明する"]
D3 --> T2["Task2 プロジェクトイテレーションの計画方法を決定する"]
D3 --> T3["Task3 アダプティブプロジェクトのプロジェクトコントロールの文書化方法を決定する"]
D3 --> T4["Task4 アダプティブ計画の構成要素を説明する"]
D3 --> T5["Task5 タスク管理ステップの準備・実行方法を決定する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D3 hub;
class T1,T2,T3,T4,T5 box;`;

const DIAGRAM_PREDICTIVE_VS_ADAPTIVE = `flowchart TD
A["プロジェクトの特性を評価する"] --> B{"要求事項は明確で安定しているか"}
B -- "はい" --> C{"変更が発生する可能性は低いか"}
B -- "いいえ" --> D{"要求事項が探索的・流動的か"}
C -- "はい" --> E["予測型アプローチを選択"]
C -- "いいえ" --> F["ハイブリッドアプローチを検討"]
D -- "はい" --> G["アダプティブアプローチを選択"]
D -- "いいえ" --> F
E --> H["WBS・ガントチャート・EVMで管理"]
G --> I["Scrum・Kanban・XP・SAFe等の中から選択"]
F --> J["フェーズごとに予測型・アダプティブを使い分け"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,H,I,J box;
class E,F,G done;`;

const DIAGRAM_WBS_TO_BACKLOG = `flowchart TD
WBS["WBS 成果物ベースの階層分解"] --> WP["ワークパッケージ"]
WP --> EPIC["エピック 大きな機能のまとまり"]
EPIC --> STORY["ユーザーストーリー PBIとして起票"]
STORY --> PB["プロダクトバックログ 優先順位付けされたPBIの一覧"]
PB --> REFINE["優先順位付け バックログリファインメント"]
REFINE --> PULL["スプリントバックログへ引き込み Pull"]
PULL --> TASK["選択したPBIをタスクへ分解 見積り可能な作業単位"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class WBS hub;
class WP,EPIC,STORY,PB,REFINE,PULL box;
class TASK done;`;

const DIAGRAM_ITERATION_PLANNING = `flowchart TD
VISION["プロダクトビジョン ロードマップ"] --> PO["プロダクトオーナーが優先順位付け"]
PO --> PB["プロダクトバックログ"]
PB --> REFINE2["バックログリファインメント"]
REFINE2 --> PLAN["スプリントプランニング 容量とベロシティを考慮"]
PLAN --> GOAL["スプリントゴールの設定"]
GOAL --> SBACK["スプリントバックログの確定"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class VISION hub;
class PO,PB,REFINE2,PLAN,GOAL box;
class SBACK done;`;

const DIAGRAM_SCRUM_SPRINT_CYCLE = `flowchart TD
PB2["プロダクトバックログ"] --> SP2["スプリントプランニング What Howを決定"]
SP2 --> SG2["スプリントゴールの設定"]
SG2 --> DEV2["スプリント実行 開発作業"]
DEV2 --> DS2["デイリースクラム 毎日15分"]
DS2 --> DEV2
DEV2 --> SR2["スプリントレビュー 検査"]
SR2 --> RETRO2["スプリントレトロスペクティブ 適応"]
RETRO2 --> INC2["インクリメントの完成"]
INC2 --> PB2

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PB2 hub;
class SP2,SG2,DEV2,DS2,SR2,RETRO2 box;
class INC2 done;`;

const DIAGRAM_KANBAN_FLOW = `flowchart LR
A2["バックログ"] --> B2["分析中 WIP上限2"]
B2 --> C2["開発中 WIP上限3"]
C2 --> D2["テスト中 WIP上限2"]
D2 --> E2["完了"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A2 hub;
class B2,C2,D2 box;
class E2 done;`;

const DIAGRAM_SAFE_LAYER_STRUCTURE = `flowchart TB
subgraph L1["ポートフォリオレベル"]
    STRAT2["戦略テーマ リーン予算配分"]
end
subgraph L2["プログラムレベル"]
    ART2["アジャイルリリーストレイン ART"]
    PI2["PIプランニング 8-12週間ごと"]
end
subgraph L3["チームレベル"]
    SCRUM2["Scrumチーム"]
    KANBAN2["Kanbanチーム"]
end
L1 --> L2 --> L3

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class STRAT2 hub;
class ART2,PI2,SCRUM2,KANBAN2 box;`;

const DIAGRAM_DOR_DOD_AC = `flowchart LR
DOR["Definition of Ready 着手可能基準"] --> WORK["タスクの実行"]
WORK --> DOD["Definition of Done 完了基準"]
DOD --> AC{"受け入れ基準を満たしているか"}
AC -- "はい" --> ACCEPT["プロダクトオーナーが承認"]
AC -- "いいえ" --> REWORK["プロダクトバックログへ差し戻し"]
REWORK --> WORK

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class DOR hub;
class WORK,DOD,AC,REWORK box;
class ACCEPT done;`;

</script>

<template>
  <div class="capm-domain3-page">
    <button
      id="sidebarToggle"
      ref="sidebarToggle"
      class="sidebar-toggle"
      type="button"
      aria-label="目次を開閉する"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      aria-controls="sidebar"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <div class="layout">

      <!-- ===================== Sidebar ===================== -->
      <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
    <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">CAPM® 完全ガイド</div>
        <div class="brand-subtitle">ドメイン3 アジャイル</div>
      </div>
    </div>

    <ul class="sidebar-nav">

      <li><a href="#how-to-use" :class="{ active: activeId === 'how-to-use' }" @click="closeSidebar"><Icon name="tabler:file-text" />この記事の使い方</a></li>
      <li><a href="#domain3-overview" :class="{ active: activeId === 'domain3-overview' }" @click="closeSidebar"><Icon name="tabler:chart-pie" />ドメイン3の全体像</a></li>
      <li><a href="#task1-adaptive-suitability" :class="{ active: activeId === 'task1-adaptive-suitability' }" @click="closeSidebar"><Icon name="tabler:git-branch" />Task1 アダプティブの適切性</a></li>
      <li><a href="#task2-iteration-planning" :class="{ active: activeId === 'task2-iteration-planning' }" @click="closeSidebar"><Icon name="tabler:timeline" />Task2 イテレーション計画</a></li>
      <li><a href="#task3-project-controls" :class="{ active: activeId === 'task3-project-controls' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" />Task3 プロジェクトコントロール</a></li>
      <li><a href="#task4-adaptive-components" :class="{ active: activeId === 'task4-adaptive-components' }" @click="closeSidebar"><Icon name="tabler:building-bank" />Task4 アダプティブ計画の構成要素</a></li>
      <li><a href="#task5-task-management" :class="{ active: activeId === 'task5-task-management' }" @click="closeSidebar"><Icon name="tabler:list-check" />Task5 タスク管理ステップ</a></li>
      <li><a href="#glossary" :class="{ active: activeId === 'glossary' }" @click="closeSidebar"><Icon name="tabler:book-2" />用語集</a></li>
      <li><a href="#checklist" :class="{ active: activeId === 'checklist' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" />学習チェックリスト</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" />参考文献・ソース</a></li>
    
      </ul>
  </nav>

  <!-- ===================== Main content ===================== -->
  <main class="main-content">

    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" />PMI公式ソース準拠 学習ガイド</div>
      <h1>CAPM® ドメイン3「アジャイルフレームワーク/方法論」完全ガイド</h1>
      <p class="hero-lede">
        対象認定はPMI Certified Associate in Project Management(CAPM)®。対象ドメインはDomain 3 Agile Frameworks/Methodologies(アジャイルフレームワーク/方法論、試験全体の20%)です。これからCAPMを受験する初学者、アジャイル/スクラム未経験の方を想定読者とし、CAPM Exam Content Outline 2023 Exam Updateに準拠してステップバイステップで解説します。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">20%</div><div class="stat-label">試験全体に占めるドメイン3の出題比率</div></div>
        <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">ドメイン3を構成するタスク数(Task1-5)</div></div>
        <div class="stat-card"><div class="stat-number">4</div><div class="stat-label">詳解する主要フレームワーク(Scrum・XP・Kanban・SAFe)</div></div>
        <div class="stat-card"><div class="stat-number">150問</div><div class="stat-label">CAPM試験の総問題数(採点対象135問)</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" />
        本ガイドはPMI公式の教材・出版物ではありません。試験範囲・出題形式は変更される可能性があるため、受験前に必ず<a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI公式サイト</a>で最新のExam Content Outlineをご確認ください。
      </div>
    </div>

    <!-- ===================== 01. How to Use ===================== -->
    <section id="how-to-use">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:file-text" />SECTION 01</div>
      <h2>この記事の使い方</h2>

      <p>この記事は、PMIが公開している最新の一次資料に基づいて、CAPM試験のドメイン3で問われる5つのタスク(Task)を、初学者でも理解できるようステップバイステップで解説したものです。ASCIIアートは使用せず、フローチャートはMermaid、比較表はMarkdownテーブルで表現しています。各セクションの末尾には「ベストプラクティス」と「参照ソース」を明記していますので、実務でアジャイルを導入する際の参考にもなります。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
        <p>本ガイドはPMIの公式教材ではなく、公開されている一次資料を基にした学習補助資料です。試験の最終的な出題範囲は、必ずPMI公式のExam Content Outline(ECO)でご確認ください。</p>
      </div>
    </section>

    <!-- ===================== 02. Domain 3 Overview ===================== -->
    <section id="domain3-overview">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" />SECTION 02</div>
      <span class="domain-tag d3">ドメイン3 &middot; 20%</span>
      <h2>ドメイン3の全体像</h2>

      <h3>0.1 CAPM試験全体におけるドメイン3の位置づけ</h3>

      <p>CAPM試験は150問(採点対象135問+プレテスト15問)、制限時間180分で構成されており、4つのドメインから出題されます(出題比率の合計は100%)。</p>

      <div class="domain-grid">
        <div class="domain-card d1"><div class="domain-pct">36%</div><div class="domain-name">ドメインI: Project Management Fundamentals and Core Concepts(プロジェクトマネジメントの基礎と主要概念)</div></div>
        <div class="domain-card d2"><div class="domain-pct">17%</div><div class="domain-name">ドメインII: Predictive, Plan-Based Methodologies(予測型・計画駆動型の方法論)</div></div>
        <div class="domain-card d3"><div class="domain-pct">20%</div><div class="domain-name">ドメインIII: Agile Frameworks/Methodologies(アジャイルフレームワーク/方法論)</div></div>
        <div class="domain-card d4"><div class="domain-pct">27%</div><div class="domain-name">ドメインIV: Business Analysis Frameworks(ビジネス分析フレームワーク)</div></div>
      </div>

      <p>ドメイン3は全体の<strong>5分の1</strong>を占めており、ドメイン1・4に次いで比重が大きい領域です。Q1〜75の回答後に10分の休憩が挿入される点も覚えておくとよいでしょう。</p>

      <h3>0.2 ドメイン3を構成する5つのタスク</h3>

      <p>CAPMのECOでは、各ドメインは「タスク(Task)」と、その具体例を示す「イネーブラー(Enabler)」で構成されています。ドメイン3には次の5つのタスクがあります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TASK_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">ドメイン3を構成する5つのタスクの学習フロー</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>Task</th><th>内容</th><th>本ガイドの対応章</th></tr></thead>
          <tbody>
            <tr><td>Task 1</td><td>アダプティブアプローチが適切な場面を説明する</td><td>第1章</td></tr>
            <tr><td>Task 2</td><td>プロジェクトイテレーションの計画方法を決定する</td><td>第2章</td></tr>
            <tr><td>Task 3</td><td>アダプティブプロジェクトのプロジェクトコントロールの文書化方法を決定する</td><td>第3章</td></tr>
            <tr><td>Task 4</td><td>アダプティブ計画の構成要素を説明する</td><td>第4章</td></tr>
            <tr><td>Task 5</td><td>タスク管理ステップの準備・実行方法を決定する</td><td>第5章</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">PMI, CAPM Exam Content Outline (2023 Exam Update), pp.5, 9</a></li>
          <li><a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI, CAPM Certification page</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 03. Task 1 ===================== -->
    <section id="task1-adaptive-suitability">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 03</div>
      <h2>第1章 Task 1: アダプティブアプローチが適切な場面を説明する</h2>

      <p>ECOが示すイネーブラーは次の3つです。</p>
      <ul>
        <li>予測型(Predictive)とアダプティブ(Adaptive)のメリット・デメリットを比較する</li>
        <li>組織構造(仮想チーム、コロケーション、マトリックス組織、階層型組織など)に対するアダプティブアプローチの適合性を判断する</li>
        <li>アダプティブアプローチの採用を促進する組織のプロセス資産(OPA)と組織体の環境要因(EEF)を特定する</li>
      </ul>

      <h3>1.1 予測型 vs アダプティブの比較</h3>

      <p>「予測型」は要求事項を事前にすべて計画し、その計画どおりに実行する伝統的なウォーターフォール型のアプローチです。一方「アダプティブ」は、短いサイクルで計画・実行・検査・適応を繰り返しながら、変化する要求事項に対応していくアプローチです。PMIの用語では、この2つの中間に位置する「ハイブリッドアプローチ」も存在します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>予測型(Predictive)</th><th>アダプティブ(Adaptive)</th></tr></thead>
          <tbody>
            <tr><td>要求事項の安定性</td><td>事前に明確化・固定化されている</td><td>探索的で、進行中に変化しうる</td></tr>
            <tr><td>計画の立て方</td><td>プロジェクト開始時に詳細計画(WBS・スケジュール)を一括作成</td><td>全体はラフに計画し、直近のイテレーション分だけ詳細化(ローリングウェーブ的)</td></tr>
            <tr><td>変更への対応</td><td>変更管理プロセス(Change Control)を通して厳格に統制</td><td>変更を前提とし、バックログの再優先順位付けで柔軟に取り込む</td></tr>
            <tr><td>顧客の関与</td><td>主に要求定義フェーズと最終納品時</td><td>各イテレーション(スプリント)ごとに継続的にフィードバックを取得</td></tr>
            <tr><td>進捗の可視化</td><td>ガントチャート、EVM(アーンド・バリュー・マネジメント)</td><td>バーンダウン/バーンアップチャート、ベロシティ、カンバンボード</td></tr>
            <tr><td>適したプロジェクト例</td><td>建設、規制の厳しい業界、要求が明確な定型業務</td><td>ソフトウェア開発、新製品開発、要求が不確実な研究開発</td></tr>
            <tr><td>メリット</td><td>予算・スケジュールの予測可能性が高い、進捗管理がしやすい</td><td>変化への対応力が高い、早期に価値を提供できる、リスクを早期に発見できる</td></tr>
            <tr><td>デメリット</td><td>途中の変更コストが高い、顧客が最終成果物を見るまで齟齬に気づきにくい</td><td>全体の完了時期・総コストの見通しが立てにくい、自己管理型チームの成熟度が必要</td></tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_PREDICTIVE_VS_ADAPTIVE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">プロジェクト特性から予測型・アダプティブ・ハイブリッドを選ぶ意思決定フロー</div>
      </div>

      <h3>1.2 組織構造への適合性</h3>

      <p>アダプティブアプローチは、チームの自己管理性やコミュニケーションの密度に強く依存するため、組織構造によって導入のしやすさが変わります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>組織構造</th><th>特徴</th><th>アダプティブアプローチとの適合性</th></tr></thead>
          <tbody>
            <tr><td>コロケーション(Co-located)</td><td>チーム全員が同じ場所で働く</td><td>非常に高い。対面でのデイリースクラムやペアプログラミングが行いやすい</td></tr>
            <tr><td>仮想チーム(Virtual)</td><td>メンバーが地理的に分散</td><td>中程度。同期コミュニケーションツールやタイムゾーン調整が必須。非同期のカンバン運用が有効な場合も多い</td></tr>
            <tr><td>マトリックス組織(Matrix)</td><td>メンバーが複数のマネージャーに報告</td><td>中程度〜やや低い。専任度が下がりやすく、スクラムチームの安定確保が課題になりやすい</td></tr>
            <tr><td>階層型組織(Hierarchical/Functional)</td><td>職能ごとに縦割りで統制が強い</td><td>低い。意思決定の階層が長く、チームの自己管理性・権限委譲と衝突しやすい</td></tr>
          </tbody>
        </table>
      </div>

      <h3>1.3 アダプティブ採用を促進するOPAとEEF</h3>

      <p>CAPMでは「組織のプロセス資産(Organizational Process Assets, OPA)」と「組織体の環境要因(Enterprise Environmental Factors, EEF)」という用語が繰り返し登場します。ドメイン3では、これらのうちアダプティブアプローチの採用を後押しする要素を見分けられるかが問われます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>区分</th><th>定義</th><th>アダプティブ採用を促進する具体例</th></tr></thead>
          <tbody>
            <tr><td>OPA(組織のプロセス資産)</td><td>組織が過去から蓄積してきた知識・手順・テンプレート・過去のプロジェクト記録など</td><td>アジャイルコーチングの社内ガイドライン、過去のスプリントレトロスペクティブの記録、既存のスクラムチームのベロシティデータ、社内のDefinition of Doneテンプレート</td></tr>
            <tr><td>EEF(組織体の環境要因)</td><td>組織を取り巻く外部・内部の環境で、プロジェクトに影響を与えるがチームが直接コントロールできない要素</td><td>市場の変化スピードが速い業界文化、経営層のアジャイル推進方針、リモートワークを前提とした企業文化、変化に寛容な組織文化、アジャイルツール(Jira等)の全社導入状況</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>予測型かアダプティブかを二択で捉えず、</strong>要求の不確実性・変更頻度・チームの専任度・組織文化という複数の軸で評価する。</li>
          <li><strong>組織構造がアダプティブに不向き(階層型・強いマトリックス)な場合でも、</strong>まずは小さなパイロットチームから始めて実績(OPA)を積み上げるアプローチが有効。</li>
          <li><strong>EEFの評価では「変化を歓迎する文化があるか」「経営層のスポンサーシップがあるか」を必ず確認する。</strong>これが欠けているとアジャイル導入は形骸化しやすい。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">PMI, CAPM Exam Content Outline, p.9(Domain 3 Task 1)</a></li>
          <li><a href="https://www.pmi.org/learning/agile" target="_blank" rel="noopener">PMI & Agile Alliance, Agile Practice Guide(2017年、PMBOK Guide第6版との同梱版として刊行)の概説 — PMI学習ページ</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 04. Task 2 ===================== -->
    <section id="task2-iteration-planning">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" />SECTION 04</div>
      <h2>第2章 Task 2: プロジェクトイテレーションの計画方法を決定する</h2>

      <p>ECOが示すイネーブラーは次の5つです。</p>
      <ul>
        <li>イテレーションの論理的な単位を区別する</li>
        <li>イテレーションのメリット・デメリットを解釈する</li>
        <li>WBSをアダプティブなイテレーションに変換する</li>
        <li>スコープのインプットを決定する</li>
        <li>アダプティブなプロジェクト追跡と予測型の追跡の重要性の違いを説明する</li>
      </ul>

      <h3>2.1 イテレーションの論理単位</h3>

      <p>「イテレーション」とは、計画・実行・レビュー・振り返りを一つのサイクルとして繰り返す固定期間の作業単位です。Scrumでは「スプリント(Sprint)」と呼ばれ、通常1〜4週間の<strong>タイムボックス(timebox)</strong>で運用されます。イテレーションが長すぎるとフィードバックが遅れ、短すぎるとオーバーヘッド(計画・レビューの手間)が相対的に増えるため、チームの成熟度やプロダクトの複雑さに応じて期間を選定します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>イテレーション期間</th><th>特徴</th><th>向いているケース</th></tr></thead>
          <tbody>
            <tr><td>1週間</td><td>フィードバックが非常に速いが計画・レビューの頻度が高くオーバーヘッド大</td><td>変化が激しい立ち上げ期のプロダクト、実験的な機能開発</td></tr>
            <tr><td>2週間</td><td>最も一般的。フィードバック速度とオーバーヘッドのバランスが良い</td><td>多くのソフトウェア開発チーム</td></tr>
            <tr><td>3〜4週間</td><td>計画のまとまりは作りやすいが、フィードバックが遅くなる</td><td>ステークホルダーの関与頻度が低い、要求の変化が緩やかなプロジェクト</td></tr>
          </tbody>
        </table>
      </div>

      <h3>2.2 イテレーションのメリット・デメリット</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>メリット</th><th>デメリット</th></tr></thead>
          <tbody>
            <tr><td>フィードバック</td><td>短いサイクルで顧客の反応を得られ、早期に軌道修正できる</td><td>頻繁なレビューはステークホルダーの継続的な関与を要求する</td></tr>
            <tr><td>リスク管理</td><td>問題を早期(数週間単位)に発見できる</td><td>イテレーションをまたぐ大きな技術的依存関係の管理が難しくなる場合がある</td></tr>
            <tr><td>チームの学習</td><td>レトロスペクティブによって継続的にプロセスを改善できる</td><td>チームの成熟度が低いと形骸化し、効果が出にくい</td></tr>
            <tr><td>進捗の予測可能性</td><td>ベロシティの蓄積により将来の見積り精度が向上する</td><td>プロジェクト全体の完了日・総コストは初期段階では正確に見積りにくい</td></tr>
          </tbody>
        </table>
      </div>

      <h3>2.3 WBSをアダプティブなイテレーションへ変換する</h3>

      <p>予測型プロジェクトでは、スコープをWBS(Work Breakdown Structure、作業分解構成図)によって成果物ベースで階層的に分解します。アダプティブプロジェクトでは、これに相当するスコープの分解を「プロダクトバックログ」という一段階柔軟な形式で行います。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_WBS_TO_BACKLOG" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">WBSからプロダクトバックログアイテムへの分解と引き込みの流れ</div>
      </div>

      <p>WBSとの決定的な違いは、<strong>アダプティブでは全体を最初から詳細に分解しない</strong>という点です。直近のイテレーションで着手するアイテムだけを詳細なタスクレベルまで分解し(プログレッシブ・エラボレーション、漸進的詳細化)、遠い将来のアイテムは大きな粒度(エピック)のまま残しておきます。</p>

      <h3>2.4 スコープのインプット</h3>

      <p>アダプティブなスコープ計画のインプットとなる主な情報源は次のとおりです。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>インプット</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>プロダクトビジョン</td><td>プロダクトが目指す最終的な価値・目的を示す短い声明文</td></tr>
            <tr><td>プロダクトロードマップ</td><td>ビジョンを実現するための大まかな時間軸上のマイルストーン</td></tr>
            <tr><td>ユーザーストーリー</td><td>「〈ユーザー〉として、〈目的〉のために、〈機能〉をしたい」という形式で書かれる要求</td></tr>
            <tr><td>受け入れ基準(Acceptance Criteria)</td><td>各ユーザーストーリーが完成したと判断するための具体的な条件</td></tr>
            <tr><td>ステークホルダーからのフィードバック</td><td>過去のスプリントレビューで得られた意見や市場の変化</td></tr>
          </tbody>
        </table>
      </div>

      <p>ユーザーストーリーの質を評価する際は、<strong>INVEST基準</strong>(Independent独立、Negotiable交渉可能、Valuable価値がある、Estimable見積り可能、Small小さい、Testableテスト可能)がよく使われます。</p>

      <h3>2.5 アダプティブ追跡 vs 予測型追跡</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>予測型の追跡</th><th>アダプティブの追跡</th></tr></thead>
          <tbody>
            <tr><td>主な指標</td><td>EVM(PV・EV・AC、CPI・SPI)、クリティカルパス</td><td>ベロシティ、バーンダウン/バーンアップチャート、累積フロー図(Cumulative Flow Diagram)</td></tr>
            <tr><td>追跡の頻度</td><td>フェーズゲートごと、週次・月次報告</td><td>毎日(デイリースクラム)、スプリントごと</td></tr>
            <tr><td>何を測るか</td><td>計画に対する予算・スケジュールの乖離</td><td>チームが実際にどれだけの価値(完了したPBI)を届けたか</td></tr>
            <tr><td>変更の扱い</td><td>変更はベースラインからの逸脱として管理</td><td>変更はバックログの再優先順位付けとして日常的に発生</td></tr>
            <tr><td>重要性の違い</td><td>「計画どおりに進んでいるか」を厳密に統制することが目的</td><td>「顧客にとって価値のあるものを、変化に対応しながら届けられているか」を継続的に検査・適応することが目的</td></tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ITERATION_PLANNING" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">プロダクトビジョンからスプリントバックログ確定までの計画の流れ</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>イテレーション期間はプロジェクト途中で頻繁に変えない。</strong>まず2週間で開始し、レトロスペクティブを重ねてからチームに合った期間へ調整する。</li>
          <li><strong>WBSからバックログへの変換では、</strong>直近1〜2スプリント分だけを詳細タスクに分解する「ローリングウェーブ計画」の考え方を適用する。</li>
          <li><strong>進捗報告では、</strong>予測型の指標(EVM)とアダプティブの指標(ベロシティ)を無理に一致させようとせず、ステークホルダーにはそれぞれの指標が意味することを説明する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">PMI, CAPM Exam Content Outline, p.9(Domain 3 Task 2)</a></li>
          <li><a href="https://scrumguides.org/" target="_blank" rel="noopener">Scrum Guide(Ken Schwaber & Jeff Sutherland, 2020年11月版, 公式サイト)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 05. Task 3 ===================== -->
    <section id="task3-project-controls">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" />SECTION 05</div>
      <h2>第3章 Task 3: アダプティブプロジェクトのプロジェクトコントロールの文書化方法を決定する</h2>

      <p>ECOが示すイネーブラーは1つです。</p>
      <ul>
        <li>アダプティブプロジェクトで使用される成果物(アーティファクト)を特定する</li>
      </ul>

      <p>予測型プロジェクトが「プロジェクトマネジメント計画書」や「変更ログ」といった正式文書でコントロールされるのに対し、アダプティブプロジェクトでは、日々の可視化ツールそのものが管理文書としての役割を果たします。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>アーティファクト</th><th>目的</th><th>予測型における近い概念</th></tr></thead>
          <tbody>
            <tr><td>プロダクトバックログ(Product Backlog)</td><td>プロダクトに必要な作業を優先順位順に並べた唯一のソース。プロダクトゴールという「コミットメント」を持つ</td><td>要求事項文書、スコープベースライン</td></tr>
            <tr><td>スプリントバックログ(Sprint Backlog)</td><td>当該スプリントで開発チームが取り組むPBIと実行計画。スプリントゴールという「コミットメント」を持つ</td><td>短期の作業計画・スケジュール</td></tr>
            <tr><td>インクリメント(Increment)</td><td>スプリントで完成した、利用可能な成果物の積み上げ。Definition of Doneという「コミットメント」を持つ</td><td>検証済み成果物、マイルストーン成果物</td></tr>
            <tr><td>Definition of Done(DoD、完了の定義)</td><td>「完成」とみなすための共通の品質基準</td><td>品質マネジメント計画・受入基準</td></tr>
            <tr><td>バーンダウン/バーンアップチャート</td><td>残作業量または完了作業量の推移を可視化するグラフ</td><td>スケジュール差異(SV)、コスト差異(CV)のグラフ</td></tr>
            <tr><td>カンバンボード(Kanban Board)</td><td>作業の状態(未着手・進行中・完了)を可視化するボード</td><td>ガントチャート、進捗報告書</td></tr>
            <tr><td>インフォメーションラジエーター(Information Radiator)</td><td>チームやステークホルダーが常に閲覧できる情報の可視化装置全般(タスクボード、バーンダウンチャート等の総称)</td><td>ステータスレポート、ダッシュボード</td></tr>
            <tr><td>レトロスペクティブログ</td><td>各スプリント後に得られた改善アクションの記録</td><td>教訓事項(Lessons Learned)登録簿</td></tr>
            <tr><td>リスクバーンダウンチャート</td><td>アダプティブプロジェクトにおけるリスクの残存量を追跡するチャート</td><td>リスク登録簿(Risk Register)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>アーティファクトは「作ること」自体が目的化しないよう注意する。</strong>バーンダウンチャートやカンバンボードは、あくまでチームの会話を促すための道具であり、報告のためだけの飾りにしない。</li>
          <li><strong>Definition of Doneはプロジェクト開始時にチーム全員で合意し、</strong>途中で安易に緩めない。品質基準の一貫性を保つことが、アダプティブプロジェクトの信頼性を支える。</li>
          <li><strong>複数チームが関わる場合は、</strong>チームごとにDefinition of Doneやアーティファクトのフォーマットがばらつかないよう、テンプレートを組織のOPAとして整備する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">PMI, CAPM Exam Content Outline, p.9(Domain 3 Task 3)</a></li>
          <li><a href="https://scrumguides.org/" target="_blank" rel="noopener">Scrum Guide, 2020</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 06. Task 4 ===================== -->
    <section id="task4-adaptive-components">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 06</div>
      <h2>第4章 Task 4: アダプティブ計画の構成要素を説明する</h2>

      <p>ECOが示すイネーブラーは1つです。</p>
      <ul>
        <li>Scrum、エクストリーム・プログラミング(XP)、SAFe®、Kanbanなど、異なるアダプティブ方法論の構成要素を区別する</li>
      </ul>

      <p>ECOのドメイン3は、これら複数のアダプティブ方法論を対象範囲に含みます。それぞれのフレームワークの「単位」「ロール」「ルール」の違いを正確に押さえましょう。</p>

      <h3>4.1 Scrum</h3>

      <p>Scrumは、複雑な問題に対応するためのシンプルな<strong>フレームワーク</strong>(方法論そのものではなく、その上に実践を積み重ねる土台)です。3つのアカウンタビリティ、5つのイベント、3つの成果物から構成されます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>構成要素</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>アカウンタビリティ(Accountabilities)</td><td>プロダクトオーナー(価値を最大化する責任)、スクラムマスター(Scrumの理解と実践を促進する責任)、開発者(Developers、増分を作成する責任)</td></tr>
            <tr><td>イベント(Events)</td><td>スプリント(全体を包む器)、スプリントプランニング、デイリースクラム、スプリントレビュー、スプリントレトロスペクティブ</td></tr>
            <tr><td>成果物(Artifacts)</td><td>プロダクトバックログ(コミットメント: プロダクトゴール)、スプリントバックログ(コミットメント: スプリントゴール)、インクリメント(コミットメント: Definition of Done)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SCRUM_SPRINT_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">プロダクトバックログからインクリメント完成までのスプリントサイクル</div>
      </div>

      <p>2020年版Scrum Guideでは、開発チームを含む「スクラムチーム」全体が自己管理型(self-managing)であることが強調され、旧版にあった「開発チームは自己組織化する」という記述から一歩進んだ表現になっています。</p>

      <h3>4.2 エクストリーム・プログラミング(Extreme Programming, XP)</h3>

      <p>XPはKent Beckが提唱した、<strong>技術的なプラクティス</strong>に強みを持つアダプティブ方法論です。Scrumが「マネジメントの型」を提供するのに対し、XPは「開発現場の具体的なやり方」を規定する点が特徴です。両者は排他的ではなく、Scrum + XPプラクティスという組み合わせもよく使われます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>分類</th><th>主なプラクティス</th></tr></thead>
          <tbody>
            <tr><td>チームプラクティス</td><td>計画ゲーム(Planning Game)、共同のコード所有(Collective Code Ownership)、持続可能なペース(週40時間)</td></tr>
            <tr><td>対になるプラクティス</td><td>ペアプログラミング(Pair Programming)、継続的インテグレーション(Continuous Integration)</td></tr>
            <tr><td>ソリューションプラクティス</td><td>シンプルな設計(Simple Design)、テスト駆動開発(Test-Driven Development, TDD)、リファクタリング(Refactoring)、小さなリリース(Small Releases)、コーディング規約(Coding Standard)</td></tr>
            <tr><td>チームメンバーとの関係</td><td>オンサイト顧客(On-site Customer)、メタファー(Metaphor)</td></tr>
          </tbody>
        </table>
      </div>

      <p>XPの4つの価値観は「コミュニケーション」「シンプルさ」「フィードバック」「勇気」(第2版では「尊重」が追加され5つ)です。</p>

      <h3>4.3 Kanban(カンバン)</h3>

      <p>Kanbanはトヨタ生産方式に由来するリーンの考え方をナレッジワークに応用した方法論で、David J. Andersonによって体系化されました。Scrumのような固定のロールやタイムボックスのイテレーションを必須としない点が最大の特徴で、「今のプロセスから始め、漸進的に改善する」という進化的変革を志向します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>区分</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>4つの変革の原則</td><td>今のやり方から始める、漸進的で進化的な変化に同意する、既存の役割・責任・肩書きを尊重する、あらゆる階層でのリーダーシップの発揮を奨励する</td></tr>
            <tr><td>6つの一般プラクティス</td><td>可視化する(Visualize)、仕掛り作業(WIP)を制限する、フローを管理する、プロセスを明示的にする、フィードバックループを実装する、協働で改善し実験を通じて進化する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_KANBAN_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">WIP制限を伴うカンバンボードのフロー</div>
      </div>

      <p>WIP(Work In Progress、仕掛り作業)制限は、各工程で同時に処理できるアイテム数の上限を明示的に定めるルールです。上限に達すると新しいアイテムを引き込めなくなり(プル方式)、ボトルネックがどこにあるかがチームの目に見える形で浮かび上がります。</p>

      <h3>4.4 Scaled Agile Framework(SAFe®)</h3>

      <p>SAFeは、複数のアジャイルチームが関わる<strong>大規模・エンタープライズ規模</strong>のアジャイル導入を支援するために設計されたフレームワークです。Scrumやカンバンが「1チームの働き方」を扱うのに対し、SAFeは「複数チーム・複数部門をどう束ねるか」を扱います。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SAFE_LAYER_STRUCTURE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">SAFeのポートフォリオ・プログラム・チームの3層構造</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>構成要素</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>チームレベル</td><td>個々のScrum/Kanbanチームがイテレーションを実行する</td></tr>
            <tr><td>プログラムレベル</td><td>複数チームが「アジャイルリリーストレイン(ART)」としてまとまり、「PIプランニング(Program Increment Planning)」で8〜12週間単位の計画を同期する</td></tr>
            <tr><td>ポートフォリオレベル</td><td>戦略テーマとリーン予算配分によって、投資の方向性を組織全体で統制する</td></tr>
            <tr><td>4つのコアバリュー</td><td>アラインメント(整合)、組み込みの品質、透明性、プログラム実行</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
        <p>SAFeは2011年の初版以降、継続的にアップデートされており、現行の中核バージョンは「SAFe 6.0」です。2026年にはAI活用を前提とした運用モデルとして「AI-Native SAFe」が追加発表されていますが、CAPM試験で問われるのはあくまでSAFeの基本構造(チーム/プログラム/ポートフォリオの階層とART、PIプランニングの概念)です。最新動向は公式サイトで確認してください。</p>
      </div>

      <h3>4.5 その他のアダプティブ方法論(概要)</h3>

      <p>ECOの「etc.」に含まれうる、その他の代表的な軽量アジャイル方法論も押さえておくと安心です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>方法論</th><th>特徴</th></tr></thead>
          <tbody>
            <tr><td>Lean(リーン)</td><td>無駄の排除、価値の最大化を重視するトヨタ生産方式由来の思想。Kanbanの理論的基盤の一つ</td></tr>
            <tr><td>Crystal(クリスタル)</td><td>Alistair Cockburnが提唱。プロジェクトの規模と重要度に応じて手法の重さを変える(Crystal Clear、Crystal Orangeなど)</td></tr>
            <tr><td>FDD(Feature-Driven Development)</td><td>「機能(Feature)」を単位に設計と実装を進める、大規模チーム向けの方法論</td></tr>
            <tr><td>DSDM(Dynamic Systems Development Method)</td><td>タイムボックスと固定コスト・品質を重視する、英国発のアジャイル方法論</td></tr>
          </tbody>
        </table>
      </div>

      <h3>4.6 4大フレームワークの比較表</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>Scrum</th><th>XP</th><th>Kanban</th><th>SAFe</th></tr></thead>
          <tbody>
            <tr><td>主な適用範囲</td><td>単一チーム</td><td>単一チーム(技術面が中心)</td><td>単一チーム/部門横断のフロー</td><td>複数チーム・大規模組織</td></tr>
            <tr><td>作業の単位</td><td>スプリント(タイムボックス)</td><td>イテレーション(短いリリース)</td><td>継続的フロー(WIP制限で統制)</td><td>PI(Program Increment、複数スプリント)</td></tr>
            <tr><td>主なロール</td><td>プロダクトオーナー、スクラムマスター、開発者</td><td>顧客、コーチ、トラッカー、プログラマー(役割は緩やか)</td><td>既存の役割を尊重(新しい役割を必須としない)</td><td>プロダクトマネージャー、リリーストレインエンジニア(RTE)、Scrumチーム等</td></tr>
            <tr><td>変更管理の考え方</td><td>スプリント内は変更を凍結し、スプリントの区切りで再優先順位付け</td><td>変更を歓迎し、シンプルな設計とリファクタリングで柔軟に対応</td><td>いつでもバックログの優先順位を変更可能(WIP制限が変更の入り口を制御)</td><td>PIの区切りで大きな方向転換、PI内は計画に従う</td></tr>
            <tr><td>重視するもの</td><td>プロセスの型(検査・適応のリズム)</td><td>技術的卓越性(コード品質)</td><td>フローの効率と可視化</td><td>組織全体の整合性とスケール</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>試験対策としては「どのフレームワークが、何を単位に、何を管理するか」をセットで覚える</strong>(例: Scrum=スプリント+3アカウンタビリティ、Kanban=WIP制限+プル方式、SAFe=PI+ART)。</li>
          <li><strong>実務でフレームワークを選ぶ際は、</strong>「1チームか複数チームか」「変更の頻度は高いか」「技術的負債の解消を重視するか」という軸で使い分ける。</li>
          <li><strong>Scrum・XP・Kanbanは互いに排他的ではなく、</strong>「Scrumban(Scrum+Kanban)」のようにプラクティスを組み合わせて使う組織も多い。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">PMI, CAPM Exam Content Outline, p.9(Domain 3 Task 4)</a></li>
          <li><a href="https://scrumguides.org/" target="_blank" rel="noopener">Scrum Guide(公式)</a></li>
          <li><a href="https://kanban.university/kanban-guide/" target="_blank" rel="noopener">The Kanban Method(Kanban University公式ガイド)</a></li>
          <li><a href="https://djaa.com/the-principles-and-general-practices-of-the-kanban-method/" target="_blank" rel="noopener">Kanbanの原則とプラクティス(David J. Anderson School of Management)</a></li>
          <!-- extremeprogramming.org は HTTPS 未対応(証明書のホスト名不一致で接続不可)。
               XP プラクティス一覧の一次ソースはここしかないため HTTP のまま保持する。 -->
          <li><a href="http://www.extremeprogramming.org/rules.html" target="_blank" rel="noopener">Extreme Programmingのルールとプラクティス(公式)</a></li>
          <li><a href="https://framework.scaledagile.com/" target="_blank" rel="noopener">Scaled Agile Framework(公式)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 07. Task 5 ===================== -->
    <section id="task5-task-management">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 07</div>
      <h2>第5章 Task 5: タスク管理ステップの準備・実行方法を決定する</h2>

      <p>ECOが示すイネーブラーは次の2つです。</p>
      <ul>
        <li>アダプティブなプロジェクトマネジメントタスクの成功基準を解釈する</li>
        <li>アダプティブなプロジェクトマネジメントにおけるタスクの優先順位付けを行う</li>
      </ul>

      <h3>5.1 成功基準の解釈</h3>

      <p>アダプティブプロジェクトでは、「いつ着手できるか」「いつ完了とみなせるか」「顧客の期待を満たしているか」を判断するために、3つの基準を区別します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>基準</th><th>英語</th><th>目的</th><th>誰が確認するか</th></tr></thead>
          <tbody>
            <tr><td>準備完了の定義</td><td>Definition of Ready(DoR)</td><td>プロダクトバックログアイテムがスプリントに着手できる状態かを判断する基準(要求が十分に明確か、見積り済みかなど)</td><td>開発チーム、プロダクトオーナー</td></tr>
            <tr><td>完了の定義</td><td>Definition of Done(DoD)</td><td>作成した増分(インクリメント)がリリース可能な品質に達しているかを判断する、チーム共通の基準</td><td>開発チーム</td></tr>
            <tr><td>受け入れ基準</td><td>Acceptance Criteria</td><td>個々のユーザーストーリーが「顧客の要求どおりに」実装されているかを判断する、ストーリー固有の条件</td><td>プロダクトオーナー、顧客</td></tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DOR_DOD_AC" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">着手可能基準から完了・受け入れ承認までのタスク管理フロー</div>
      </div>

      <p>DoDとAcceptance Criteriaを混同しないことが重要です。<strong>DoDはすべてのアイテムに共通する品質基準</strong>(例: 単体テストが通っている、コードレビュー済みである)であるのに対し、<strong>Acceptance Criteriaは個々のストーリーごとに異なる機能要件</strong>(例: 「パスワードは8文字以上でなければならない」)を指します。</p>

      <h3>5.2 タスクの優先順位付け</h3>

      <p>アダプティブプロジェクトでは、限られたイテレーションの中で最も価値の高い作業から着手するため、優先順位付けの技法が重要になります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th><th>向いている場面</th></tr></thead>
          <tbody>
            <tr><td>MoSCoW分析</td><td>Must have(必須)、Should have(あるべき)、Could have(あってもよい)、Won't have(今回は含めない)の4段階で分類する</td><td>ステークホルダーとの合意形成をシンプルに行いたい場合</td></tr>
            <tr><td>WSJF(Weighted Shortest Job First)</td><td>「(ビジネス価値+時間の緊急性+リスク低減/機会創出の価値)÷ジョブの規模」で算出し、値が大きい順に着手する</td><td>SAFeで使われる、複数の投資対象を定量的に比較したい場合</td></tr>
            <tr><td>Kano分析</td><td>機能を「当たり前品質」「一元的品質」「魅力的品質」などに分類し、顧客満足度への影響で優先順位を判断する</td><td>顧客体験・満足度を重視したプロダクト設計</td></tr>
            <tr><td>価値と労力のマトリクス(Value vs Effort)</td><td>縦軸に価値、横軸に労力を取り、「価値が高く労力が低い」アイテムを最優先にする</td><td>シンプルに優先順位の全体像を可視化したい場合</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>Definition of Ready・Definition of Done・Acceptance Criteriaは、</strong>チーム発足時にまとめて文書化し、スプリントごとに見直す。3つを混同すると「完了」の合意が崩れ、手戻りの原因になる。</li>
          <li><strong>優先順位付けは一度決めて終わりにせず、</strong>バックログリファインメントのたびに見直す。市場やステークホルダーの状況変化を反映することが、アダプティブアプローチの本質。</li>
          <li><strong>WSJFのような定量的手法を使う場合も、</strong>最終的な優先順位はプロダクトオーナーの意思決定であることを忘れない。数値は判断材料であって、機械的な自動決定のためのものではない。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">PMI, CAPM Exam Content Outline, p.9(Domain 3 Task 5)</a></li>
          <li><a href="https://scrumguides.org/" target="_blank" rel="noopener">Scrum Guide, 2020</a></li>
          <li><a href="https://framework.scaledagile.com/" target="_blank" rel="noopener">Scaled Agile Framework(WSJFの解説を含む)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 08. Glossary ===================== -->
    <section id="glossary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" />SECTION 08</div>
      <h2>第6章 よくある混同ポイント・用語集</h2>

      <p>CAPM受験者が特に混同しやすい用語をまとめました。</p>

      <div class="glossary-grid">
        <div class="glossary-item"><div class="g-term">Iteration(イテレーション)</div><div class="g-def">計画・実行・レビュー・振り返りを繰り返す固定期間の作業サイクル(Scrumではスプリント)</div></div>
        <div class="glossary-item"><div class="g-term">Timebox(タイムボックス)</div><div class="g-def">あらかじめ決められた固定の作業期間。期間内に終わらなくても延長しない</div></div>
        <div class="glossary-item"><div class="g-term">Increment(インクリメント)</div><div class="g-def">スプリントで完成し、リリース可能な状態にある成果物の積み上げ</div></div>
        <div class="glossary-item"><div class="g-term">Velocity(ベロシティ)</div><div class="g-def">1イテレーションあたりにチームが完了できる作業量の実績値(将来の見積りに使う)</div></div>
        <div class="glossary-item"><div class="g-term">Burndown Chart(バーンダウンチャート)</div><div class="g-def">残作業量が時間とともに減っていく様子を示すグラフ</div></div>
        <div class="glossary-item"><div class="g-term">Burnup Chart(バーンアップチャート)</div><div class="g-def">完了した作業量とスコープ全体の変化を同時に示すグラフ</div></div>
        <div class="glossary-item"><div class="g-term">WIP Limit(WIP制限)</div><div class="g-def">各工程で同時に処理できる仕掛り作業の上限数</div></div>
        <div class="glossary-item"><div class="g-term">Product Backlog(プロダクトバックログ)</div><div class="g-def">プロダクトに必要な作業を優先順位順に並べた唯一の一覧</div></div>
        <div class="glossary-item"><div class="g-term">Sprint Backlog(スプリントバックログ)</div><div class="g-def">当該スプリントで着手すると決めたPBIと実行計画</div></div>
        <div class="glossary-item"><div class="g-term">Definition of Done(完了の定義、DoD)</div><div class="g-def">チーム共通の「完成」とみなす品質基準</div></div>
        <div class="glossary-item"><div class="g-term">Servant Leadership(サーバントリーダーシップ)</div><div class="g-def">チームを支え、障害物を取り除くことに徹するリーダーシップスタイル(スクラムマスターに求められる姿勢)</div></div>
        <div class="glossary-item"><div class="g-term">Self-managing Team(自己管理型チーム)</div><div class="g-def">誰が・どのように・何に取り組むかをチーム自身で決定するチーム(2020年版Scrum Guideの用語)</div></div>
      </div>
    </section>

    <!-- ===================== 09. Checklist ===================== -->
    <section id="checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" />SECTION 09</div>
      <h2>第7章 ドメイン3 学習チェックリスト</h2>

      <p>学習の総仕上げとして、ECOのイネーブラーに沿ったチェックリストを用意しました。すべて「はい」と言えるようになれば準備完了です。</p>

      <ul>
        <li>予測型とアダプティブの違いを、要求の安定性・変更コスト・フィードバック頻度の観点で説明できる</li>
        <li>組織構造(仮想・コロケーション・マトリックス・階層型)ごとに、アダプティブの適合度が異なる理由を説明できる</li>
        <li>OPAとEEFの違いを説明し、それぞれアダプティブ採用を促進する具体例を挙げられる</li>
        <li>WBSとプロダクトバックログの違い、及び前者から後者への変換の考え方を説明できる</li>
        <li>イテレーション期間を決める際のトレードオフ(フィードバック速度 vs オーバーヘッド)を説明できる</li>
        <li>アダプティブなスコープ計画のインプット(ビジョン、ロードマップ、ユーザーストーリー)を挙げられる</li>
        <li>EVMとベロシティ/バーンダウンチャートの違いを説明できる</li>
        <li>アダプティブプロジェクトで使われる主要なアーティファクト(プロダクトバックログ、スプリントバックログ、インクリメント、DoD、カンバンボード等)を挙げられる</li>
        <li>Scrumの3アカウンタビリティ・5イベント・3成果物を暗唱できる</li>
        <li>XPの主なプラクティス(TDD、ペアプログラミング、継続的インテグレーション等)を挙げられる</li>
        <li>Kanbanの4原則・6プラクティス、特にWIP制限の意味を説明できる</li>
        <li>SAFeのチーム/プログラム/ポートフォリオという3層構造とARTの役割を説明できる</li>
        <li>Definition of Ready・Definition of Done・Acceptance Criteriaの違いを説明できる</li>
        <li>MoSCoW、WSJF、Kano分析など優先順位付け技法の使い分けを説明できる</li>
      </ul>
    </section>

    <!-- ===================== 10. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 10</div>
      <h2>第8章 参考文献・ソース一覧</h2>

      <p>本ガイドの作成にあたり、以下の一次資料を直接参照しました。</p>

      <div class="ref-group">
        <h3>一次ソース一覧</h3>
        <ul class="ref-list">
          <li><span class="ref-name">PMI, Certified Associate in Project Management (CAPM)® Exam Content Outline(2023 Exam Update) — ドメイン3の5つのタスクとイネーブラーの一次ソース</span><a class="ref-url" href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf</a></li>
          <li><span class="ref-name">PMI, Certified Associate in Project Management (CAPM)® Certification(公式認定ページ) — 試験構成(150問、180分、8言語対応)、出題比率の一次ソース</span><a class="ref-url" href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">https://www.pmi.org/certifications/certified-associate-capm</a></li>
          <li><span class="ref-name">PMI, Agile学習リソースページ(Agile Practice Guideの紹介を含む、PMIとAgile Allianceの共同刊行物)</span><a class="ref-url" href="https://www.pmi.org/learning/agile" target="_blank" rel="noopener">https://www.pmi.org/learning/agile</a></li>
          <li><span class="ref-name">Ken Schwaber & Jeff Sutherland, The Scrum Guide(2020年11月版、公式サイト) — Scrumのロール・イベント・成果物の一次ソース</span><a class="ref-url" href="https://scrumguides.org/" target="_blank" rel="noopener">https://scrumguides.org/</a></li>
          <li><span class="ref-name">Scrum.org, The 2020 Scrum Guide: What You Need to Know — 2017年版から2020年版への変更点の解説</span><a class="ref-url" href="https://www.scrum.org/scrum-guide-2020" target="_blank" rel="noopener">https://www.scrum.org/scrum-guide-2020</a></li>
          <li><span class="ref-name">Kanban University, The Official Guide to The Kanban Method — Kanbanの4原則・6プラクティスの一次ソース</span><a class="ref-url" href="https://kanban.university/kanban-guide/" target="_blank" rel="noopener">https://kanban.university/kanban-guide/</a></li>
          <li><span class="ref-name">David J. Anderson School of Management, The Principles and General Practices of the Kanban Method</span><a class="ref-url" href="https://djaa.com/the-principles-and-general-practices-of-the-kanban-method/" target="_blank" rel="noopener">https://djaa.com/the-principles-and-general-practices-of-the-kanban-method/</a></li>
          <!-- 上記と同じ理由で HTTP のまま(サイトが HTTPS 未対応) -->
          <li><span class="ref-name">ExtremeProgramming.org, The Rules and Practices of Extreme Programming — XPのプラクティス一覧の一次ソース</span><a class="ref-url" href="http://www.extremeprogramming.org/rules.html" target="_blank" rel="noopener">http://www.extremeprogramming.org/rules.html</a></li>
          <li><span class="ref-name">Scaled Agile, Inc., Scaled Agile Framework(SAFe®)公式サイト — SAFeの階層構造、PIプランニング、WSJFの一次ソース</span><a class="ref-url" href="https://framework.scaledagile.com/" target="_blank" rel="noopener">https://framework.scaledagile.com/</a></li>
          <li><span class="ref-name">Agile Manifesto(アジャイルソフトウェア開発宣言、公式サイト) — アダプティブアプローチ全般の思想的な源流</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
        </ul>
      </div>
    </section>

    <footer>
      SAFe®はScaled Agile, Inc.の登録商標です。
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
  
    text-decoration: none;}

  .sidebar-nav a :deep(.iconify), .sidebar-nav a i { font-size: 17px; color: var(--color-ink-faint); flex: none; }

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

  .sidebar-nav a.active :deep(.iconify), .sidebar-nav a.active i { color: var(--color-indigo); }

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

  .hero-eyebrow :deep(.iconify), .hero-eyebrow i { font-size: 17px; }

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
    scroll-margin-top: calc(var(--global-nav-height) + 32px);
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

  .mermaid-wrap {
    width: 100%;
  }

  .diagram-loading {
    color: var(--color-ink-faint);
    font-size: 16px;
    padding: 20px 0;
  }

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
  .ref-group h3 { margin-top: 0; }
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
      /* 画面外のリンクがキーボードフォーカスを受け取らないよう visibility も落とす */
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

    .sidebar { transition: none; }
  }
</style>
