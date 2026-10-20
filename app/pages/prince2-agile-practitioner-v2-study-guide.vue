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

const DIAGRAM_EXAM_MINDMAP = `mindmap
  root((PRINCE2 Agile Practitioner v2))
    カテゴリ1 Key concepts 20 percent
      Agile と mindset
      Agile Onion
      7 aspects of project performance
      Agile transformation
      People と OCM
      Team leadership と communication
    カテゴリ2 Practices と Roles 44 percent
      Business case
      Organization
      Plans
      Quality
      Risk
      Issues
      Progress
      11 roles
    カテゴリ3 Processes 30 percent
      Starting up
      Directing
      Initiating
      Controlling a stage
      Managing product delivery
      Managing a stage boundary
      Closing
    カテゴリ4 Wider context 6 percent
      Agile product management
      Transition to operations
      Continuous development and operations
      AI support`;

const DIAGRAM_STUDY_ROADMAP = `flowchart LR
A["Step 1 試験の型と 配点を知る"] --> B["Step 2 Key concepts Onion と 7 aspects"]
B --> C["Step 3 7 Practices と 11 Roles"]
C --> D["Step 4 7 Processes と Workshops"]
D --> E["Step 5 Wider context と AI"]
E --> F["Step 6 演習 と ブック索引作り"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F box;`;

const DIAGRAM_AGILE_ONION_LAYERS = `flowchart LR
M["Mindset 考え方"] --> V["Values 価値観"]
V --> PR["Principles 原則"]
PR --> PA["Practices 実践"]
PA --> PO["Processes プロセス"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class M,V,PR,PA,PO box;`;

const DIAGRAM_PRINCE2_ELEMENTS = `flowchart TB
P["PRINCE2 Project Management"] --> A["Principles 原則"]
P --> B["People 人"]
P --> C["Practices 実践"]
P --> D["Processes プロセス"]
P --> E["Project context プロジェクトの文脈"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class P hub;`;

const DIAGRAM_TOLERANCE_LEVELS = `flowchart TB
CORP["Corporate / Programme Project tolerance を設定"] --> BOARD["Project Board Stage tolerance を設定"]
BOARD --> PM["Project Manager Work package tolerance を設定"]
PM --> TEAM["Team Timebox 内で自己管理"]
TEAM -.->|"tolerance 超過の恐れ"| PM
PM -.->|"exception report"| BOARD
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class CORP,BOARD,PM,TEAM box;`;

const DIAGRAM_TRANSFORMATION_CONCEPTS = `flowchart LR
A["Agile transformation plan 2.7.1"] --> B["Agile maturity 2.7.3"]
B --> C["Psychological safety 2.7.4"]
C --> D["Agile sustainability 2.7.5"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;`;

const DIAGRAM_TRANSFORMATION_LOOP = `flowchart LR
V["ビジョンと目的 を明確化"] --> AS["現状と成熟度 を評価"]
AS --> PL["変革計画を 作成"]
PL --> PI["小さく試行 パイロット"]
PI --> LE["学びを 振り返る"]
LE --> SC["範囲を 拡大"]
SC --> SU["定着 持続化"]
SU -.->|"再評価"| AS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class V,AS,PL,PI,LE,SC,SU box;`;

const DIAGRAM_TEAM_COLLABORATION = `flowchart TB
L["Leaders 環境づくりと障害除去"] --> T1["Team A"]
L --> T2["Team B"]
L --> T3["Team C"]
T1 <-->|"依存関係の同期"| T2
T2 <-->|"依存関係の同期"| T3
T1 --> G["共通のゴールと product vision"]
T2 --> G
T3 --> G
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class L,T1,T2,T3,G box;`;

const DIAGRAM_FIT_FOR_PURPOSE_FLOW = `flowchart TD
S["シナリオの状況を把握 制約 成熟度 契約 規制"] --> Q1{"目的 purpose を果たしているか"}
Q1 -- "No" --> X1["不適切 目的を損なう tailoring"]
Q1 -- "Yes" --> Q2{"PRINCE2 Agile の guidance に沿うか"}
Q2 -- "No" --> X2["不適切 guidance と矛盾"]
Q2 -- "Yes" --> Q3{"必要な management products が機能するか"}
Q3 -- "No" --> X3["不足 統制や記録が欠落"]
Q3 -- "Yes" --> Q4{"文脈に合っているか 過剰 過少でない"}
Q4 -- "No" --> X4["不適合 軽すぎる または 重すぎる"]
Q4 -- "Yes" --> OK["有効 fit for purpose"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S,Q1,X1,Q2,X2,Q3,X3,Q4,X4 box;
class OK done;`;

const DIAGRAM_ORGANIZATION_STRUCTURE = `flowchart TB
PB["Project Board Executive CPO Senior supplier"] --> PMGR["Project Manager"]
PB -.-> PA["Project Assurance"]
PMGR --> PS["Project Support"]
AC["Agile coach"] -.-> PMGR
PMGR --> TEAMA["Team A PO Team coach Developers Testers"]
PMGR --> TEAMB["Team B PO Team coach Developers Testers"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PB,PMGR,PA,PS,AC,TEAMA,TEAMB box;`;

const DIAGRAM_PLAN_HIERARCHY = `flowchart TB
A["Project plan / Release map 全体の見通し 粗い"] --> B["Stage plan stage 内の見通し"]
B --> C["Team plan iteration ごとの計画 詳細"]
C --> D["Work package description チームへの委任内容"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;`;

const DIAGRAM_DOR_DOD_FLOW = `flowchart LR
BL["Product backlog の項目"] --> DR{"Definition of Ready 着手できる状態か"}
DR -- "Yes" --> WK["チームが作業"]
DR -- "No" --> RF["Refinement で明確化"]
RF --> DR
WK --> DD{"Definition of Done 完成の条件を満たすか"}
DD -- "Yes" --> INC["完成 リリース可能な増分"]
DD -- "No" --> WK
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class BL,DR,WK,RF,DD box;
class INC done;`;

const DIAGRAM_AGILOMETER_CYCLE = `flowchart LR
A["Agilometer で 現状を評価"] --> B["リスクが高い 領域を特定"]
B --> C["対応策を検討 tailoring や risk register へ"]
C --> D["定期的に再評価 stage 境界など"]
D -.->|"状況の変化"| A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;`;

const DIAGRAM_ISSUE_HANDLING_FLOW = `flowchart TD
I["Issue が発生 変更要求 問題 懸念"] --> R["Issue register に記録"]
R --> E{"Tolerance の 範囲内か"}
E -- "範囲内" --> L["チーム 現場で解決 例 backlog の優先順位調整"]
E -- "範囲を超える" --> P["Issue report を作成 PM に escalate"]
P --> B["Project Board が判断"]
L --> LL["Lessons log に学びを記録"]
B --> LL
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class I,R,E,L,P,B,LL box;`;

const DIAGRAM_ROLES_RELATIONSHIP = `flowchart TB
subgraph DIR["Direction Project Board"]
PE["Project executive"]
CPO["Chief product owner"]
SS["Senior supplier"]
end
subgraph MGT["Management"]
PM["Project manager"]
PSUP["Project support"]
end
subgraph DEL["Delivery Team"]
PO["Product owner"]
TC["Team coach"]
DEV["Developer"]
TST["Tester"]
end
PA["Project assurance"]
AC["Agile coach"]
DIR --> PM
PM --> PSUP
PM --> DEL
PA -.-> DIR
AC -.-> PM
AC -.-> TC
CPO --- PO
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PE,CPO,SS,PM,PSUP,PO,TC,DEV,TST,PA,AC box;`;

const DIAGRAM_PROCESS_OVERVIEW = `flowchart TB
SU["Starting up a project SU"] --> IP["Initiating a project IP"]
IP --> CS["Controlling a stage CS"]
CS <--> MP["Managing product delivery MP"]
CS --> SB["Managing a stage boundary SB"]
SB --> CS
CS --> CP["Closing a project CP"]
DP["Directing a project DP 全体を通じた Board の判断"] -.-> SU
DP -.-> IP
DP -.-> CS
DP -.-> SB
DP -.-> CP
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class SU,IP,CS,MP,SB,CP,DP box;`;

const DIAGRAM_STAGE_TIMEBOX = `flowchart TB
PRJ["Project"] --> ST1["Stage 1 管理上の判断単位"]
PRJ --> ST2["Stage 2"]
ST1 --> R1["Release 1"]
ST1 --> R2["Release 2"]
R1 --> IT1["Iteration 1 timebox"]
R1 --> IT2["Iteration 2 timebox"]
R2 --> IT3["Iteration 3 timebox"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PRJ,ST1,ST2,R1,R2,IT1,IT2,IT3 box;`;

const DIAGRAM_OPS_TRANSITION = `flowchart LR
P["Project 増分を開発"] --> R["Release 段階的な引き渡し"]
R --> O["Operations 運用 サポート 保守"]
O -.->|"利用データ 障害 要望"| B["Product backlog へフィードバック"]
B --> P
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P,R,O,B box;`;

const DIAGRAM_AI_REVIEW_FLOW = `flowchart LR
A["AI が案を生成"] --> B["人がレビュー 正確性 偏り 機密"]
B --> C{"DoD と 受入基準を満たすか"}
C -- "Yes" --> D["採用 記録"]
C -- "No" --> E["修正 または 却下"]
E --> A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,E box;
class D done;`;

const DIAGRAM_SCENARIO_READING_FLOW = `flowchart TD
A["シナリオを通読 制約 契約 期限 体制 成熟度"] --> B["設問を読む 何を問われているか BL2 BL3 BL4"]
B --> C["追加情報が必要か 人物の役割と発言"]
C --> D["該当する practice または process を特定"]
D --> E["公式ブックで guidance を確認"]
E --> F["選択肢を消去 目的 guidance 文脈に反するものを除外"]
F --> G["最適な 1 つを選ぶ"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F box;
class G done;`;

const TOC_IDS = [
  "how-to-use",
  "exam-overview",
  "study-roadmap",
  "key-concepts",
  "practices-roles",
  "processes",
  "wider-context",
  "exam-strategy",
  "practice-questions",
  "glossary",
  "references",
  "appendix-a",
  "appendix-b",
  "appendix-c",
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
  title: "PRINCE2® Agile Practitioner (Version 2) 認定資格 完全ガイド | 初学者向け学習ガイド",
  description: "PeopleCert PRINCE2 Agile Practitioner (Version 2) の出題範囲を、初学者向けにステップバイステップで解説し、ベストプラクティス・演習・根拠ソース URL をまとめた学習ガイド。",
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
            <div class="brand-title">PRINCE2® Agile</div>
            <div class="brand-subtitle">Practitioner (Version 2)</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li class="nav-group-label">はじめに</li>
          <li><a href="#how-to-use" :class="{ active: activeId === how-to-use }" @click="closeSidebar"><Icon name="tabler:compass" aria-hidden="true" />0. 使い方</a></li>
          <li><a href="#exam-overview" :class="{ active: activeId === exam-overview }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />1. 試験の全体像</a></li>
          <li><a href="#study-roadmap" :class="{ active: activeId === study-roadmap }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />2. 学習ロードマップ</a></li>

          <li class="nav-group-label">試験カテゴリ</li>
          <li><a href="#key-concepts" :class="{ active: activeId === key-concepts }" @click="closeSidebar"><Icon name="tabler:brain" aria-hidden="true" />3. Key concepts</a></li>
          <li><a href="#practices-roles" :class="{ active: activeId === practices-roles }" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />4. Practices と roles</a></li>
          <li><a href="#processes" :class="{ active: activeId === processes }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />5. Processes</a></li>
          <li><a href="#wider-context" :class="{ active: activeId === wider-context }" @click="closeSidebar"><Icon name="tabler:rocket" aria-hidden="true" />6. Wider context と AI</a></li>

          <li class="nav-group-label">対策・資料</li>
          <li><a href="#exam-strategy" :class="{ active: activeId === exam-strategy }" @click="closeSidebar"><Icon name="tabler:target" aria-hidden="true" />7. 試験対策</a></li>
          <li><a href="#practice-questions" :class="{ active: activeId === practice-questions }" @click="closeSidebar"><Icon name="tabler:pencil" aria-hidden="true" />8. 演習</a></li>
          <li><a href="#glossary" :class="{ active: activeId === glossary }" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />9. 用語集</a></li>
          <li><a href="#references" :class="{ active: activeId === references }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />10. 参考資料</a></li>

          <li class="nav-group-label">付録</li>
          <li><a href="#appendix-a" :class="{ active: activeId === appendix-a }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />付録 A 対応表</a></li>
          <li><a href="#appendix-b" :class="{ active: activeId === appendix-b }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />付録 B 要照合</a></li>
          <li><a href="#appendix-c" :class="{ active: activeId === appendix-c }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />付録 C 最終確認</a></li>
        </ul>
      </aside>

      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />PeopleCert 公式シラバス v2.0 に沿った学習ガイド</div>
          <h1>PRINCE2 Agile Practitioner (Version 2) 初学者向け完全学習ガイド</h1>
          <p class="hero-lede">
            <strong>対象試験</strong>: PeopleCert <strong>PRINCE2® Agile Practitioner (Version 2)</strong><br>
            <strong>想定読者</strong>: プロジェクト管理・アジャイル開発の初学者〜中級者(PRINCE2 Agile Foundation (Version 2) 合格者、または合格を目指す方)<br>
            <strong>作成日</strong>: 2026-09-20<br>
            <strong>形式</strong>: 日本語解説(英語の公式用語は原語のまま保持) / 図解は Mermaid と Markdown 表のみ(ASCII 図解は不使用)
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">50問</div><div class="stat-label">各 1 点・誤答による減点なし</div></div>
            <div class="stat-card"><div class="stat-number">30点</div><div class="stat-label">合格点(60%)</div></div>
            <div class="stat-card"><div class="stat-number">150分</div><div class="stat-label">オープンブック(公式ブックのみ持ち込み可)</div></div>
            <div class="stat-card"><div class="stat-number">44%</div><div class="stat-label">practices と roles の配点(最重要カテゴリ)</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span><strong>免責</strong>: 本ガイドは学習支援を目的とした独自の解説です。PRINCE2® および PRINCE2 Agile® は PeopleCert の登録商標です。試験の最終的な出題範囲・用語・定義は、<a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-practitioner-4076" target="_blank" rel="noopener">PeopleCert の公式資料</a>(シラバス・公式ブック・サンプルペーパー)に従ってください。</span>
          </div>
        </div>

        <!-- 0. how-to-use -->
        <section id="how-to-use">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon  name="tabler:compass" aria-hidden="true" />SECTION 01</div>
      <h2>0. このガイドの使い方(最初に必ず読む)</h2>

      <h3>0.1 このガイドの位置づけ</h3>
      <ul>
        <li>本ガイドは、公式シラバス(Version 2.0, 2025 年 5 月)の <strong>学習カテゴリ・評価基準の順</strong> に沿って、初学者が「なぜそうなるのか」から理解できるよう <strong>独自の言葉で</strong> 解説した学習ノートです。</li>
        <li>PRINCE2 Agile Practitioner は <strong>オープンブック試験</strong>(公式ブックの持ち込み可)です。したがって「全暗記」ではなく、<strong>概念の理解 + 公式ブックのどこに書いてあるかを即座に引ける索引力</strong> が合否を分けます。本ガイドでは、シラバスに記載された <strong>公式ブックの章番号</strong> を各所に併記しています。</li>
        <li>公式ブック(PRINCE2® Agile Version 2 Official Book)の本文は著作物のため、本ガイドは <strong>転載・逐語引用をしていません</strong>。最終的な用語・定義・一覧の正確な文言は、必ず手元の公式ブックで照合してください。</li>
      </ul>
      <h3>0.2 情報の確度を示す凡例</h3>
      <p>各節の情報には、出所の確度を次の記号で示します。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>記号</th><th>意味</th><th>使い方</th></tr></thead>
          <tbody>
            <tr><td>【シラバス】</td><td>PeopleCert 公式シラバス(v2.0)に明記されている項目</td><td>試験範囲そのもの。優先して学習する</td></tr>
            <tr><td>【一般知識】</td><td>PRINCE2 7 やアジャイル一般(Scrum / Kanban / Lean 等)で広く知られている内容による補足</td><td>理解を助ける補足。<strong>試験での正確な表現は公式ブックで確認</strong></td></tr>
            <tr><td>【要照合】</td><td>章立てや一覧の細部(例: 軸の名称・数、役割の位置づけ)で、本ガイド作成時に一次資料の本文で直接確認できていないもの</td><td><strong>必ず公式ブックの該当章で確認</strong> し、ブックの余白にメモする</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>正直な注意</strong>: 公式ブック本文は本ガイド作成時に参照できていません。シラバス(一次資料)で確認できた範囲は【シラバス】、それ以外は【一般知識】または【要照合】と明示しています。試験ではブックの記述が正解の根拠になるため、【要照合】は特に優先して確認してください。</p>
      </div>
      <h3>0.3 各項目の解説フォーマット</h3>
      <p>各項目は次の順で書かれています。</p>
      <ol>
        <li><strong>一言でいうと</strong>(初学者向けの要約)</li>
        <li><strong>ステップバイステップ解説</strong></li>
        <li><strong>ベストプラクティス</strong></li>
        <li><strong>よくある落とし穴(アンチパターン)</strong></li>
        <li><strong>試験ポイント</strong>(Bloom's level: BL2 理解 / BL3 適用 / BL4 分析)</li>
      </ol>
    </section>

        <!-- 1. exam-overview -->
        <section id="exam-overview">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon  name="tabler:certificate" aria-hidden="true" />SECTION 02</div>
      <h2>1. 試験の全体像</h2>

      <h3>1.1 試験概要 【シラバス】</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>認定名</td><td>PRINCE2 Agile Practitioner (Version 2)</td></tr>
            <tr><td>問題数 / 配点</td><td>50 問 / 各 1 点(<strong>誤答による減点なし</strong>)</td></tr>
            <tr><td>合格点</td><td><strong>30 点(60%)</strong></td></tr>
            <tr><td>試験時間</td><td><strong>150 分</strong>(母語・業務言語以外で受験する場合は 25% 延長で 188 分)</td></tr>
            <tr><td>持ち込み</td><td><strong>オープンブック</strong>: 公式ブックのみ可(ブック内への書き込みメモも可)。他の資料は不可</td></tr>
            <tr><td>思考レベル</td><td>Bloom's level <strong>2(理解)/ 3(適用)/ 4(分析)</strong></td></tr>
            <tr><td>出題形式</td><td><strong>シナリオ + 追加情報 + 設問</strong>(少なくとも 1 問は「追加情報」=人物情報を使う)</td></tr>
            <tr><td>設問タイプ</td><td>Standard / Missing word / List(正しいもの 2 つを選ぶ)/ Negative(例外的)</td></tr>
            <tr><td>前提資格</td><td>PRINCE2 Agile Foundation (Version 2)、または PRINCE2 Agile (Version 1) の Foundation / Practitioner など(公式ページの記載)</td></tr>
            <tr><td>資格更新</td><td>3 年ごと(CPD 20 ポイント等。詳細は公式ページ)</td></tr>
          </tbody>
        </table>
      </div>
      <h3>1.2 出題配分 【シラバス】</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>学習カテゴリ</th><th>配点比率</th><th>目安問数(50 問換算)</th></tr></thead>
          <tbody>
            <tr><td>1. アジャイルマインドセット・People(OCM を含む)・プロジェクトマネジメントの主要概念</td><td>20%</td><td>約 10 問</td></tr>
            <tr><td>2. PRINCE2 Agile の <strong>practices</strong> とその適用、および <strong>roles</strong></td><td><strong>44%</strong></td><td>約 22 問</td></tr>
            <tr><td>3. PRINCE2 Agile の <strong>processes</strong> とその適用(workshops を含む)</td><td>30%</td><td>約 15 問</td></tr>
            <tr><td>4. より広い文脈での適用(プロダクト管理・運用移行・AI)</td><td>6%</td><td>約 3 問</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>読み方</strong>: 合格には 30 問が必要です。<strong>カテゴリ 2 と 3 で全体の 74%</strong> を占めます。ここ(practices と processes)を最優先で固めるのが最短ルートです。</p>
      </div>
      <h3>1.3 Foundation との違い(何が「上がる」のか)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>Foundation (v2)</th><th>Practitioner (v2)</th></tr></thead>
          <tbody>
            <tr><td>目的</td><td>概念・用語を <strong>想起(BL1)・理解(BL2)</strong> できる</td><td>概念を <strong>現実の状況に適用(BL3)・評価(BL4)</strong> できる</td></tr>
            <tr><td>試験時間 / 問題数</td><td>60 分 / 40 問(合格 24 点)</td><td>150 分 / 50 問(合格 30 点)</td></tr>
            <tr><td>持ち込み</td><td>不可(クローズドブック)</td><td>公式ブック可(オープンブック)</td></tr>
            <tr><td>問題の姿</td><td>単発の知識問題</td><td><strong>シナリオ</strong> に基づく問題</td></tr>
            <tr><td>典型的な問い</td><td>「〜とは何か」</td><td>「このシナリオで、この tailoring は <strong>有効か(fit for purpose)</strong>」</td></tr>
          </tbody>
        </table>
      </div>
      <h3>1.4 試験構造のマインドマップ</h3>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_EXAM_MINDMAP" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">試験構造のマインドマップ</div>
      </div>
    </section>

        <!-- 2. study-roadmap -->
        <section id="study-roadmap">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon  name="tabler:route" aria-hidden="true" />SECTION 03</div>
      <h2>2. 学習ロードマップ</h2>

      <h3>2.1 推奨ステップ</h3>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_STUDY_ROADMAP" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">推奨ステップ</div>
      </div>
      <h3>2.2 4 週間学習プラン(例)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>週</th><th>学習内容</th><th>ゴール</th><th>本ガイドの章</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>試験の型、Key concepts(Agile / mindset / Onion / 7 aspects / transformation / People)</td><td>カテゴリ 1(20%)を説明できる</td><td>第 3 章</td></tr>
            <tr><td>2</td><td>7 practices の目的・管理プロダクト・agile guidance・techniques、11 roles</td><td>カテゴリ 2(44%)の前半</td><td>第 4 章</td></tr>
            <tr><td>3</td><td>7 processes と workshops、tailoring 評価の型</td><td>カテゴリ 3(30%)を説明・評価できる</td><td>第 5 章</td></tr>
            <tr><td>4</td><td>Wider context・AI、演習、ブックにタブと付箋を付ける、模擬試験</td><td>時間内に 30 点以上を安定して取れる</td><td>第 6〜8 章</td></tr>
          </tbody>
        </table>
      </div>
      <h3>2.3 前提知識チェック(自己診断)</h3>
      <p>次に <strong>説明できる</strong> なら、本ガイドをスムーズに進められます。</p>
      <ul class="checklist">
        <li><label class="check-item"><input type="checkbox" class="check-box"><span class="check-text">PRINCE2 の <strong>7 principles / 7 practices / 7 processes</strong> を列挙できる</span></label></li>
        <li><label class="check-item"><input type="checkbox" class="check-box"><span class="check-text"><strong>tolerance</strong> と <strong>management by exception</strong> の関係を説明できる</span></label></li>
        <li><label class="check-item"><input type="checkbox" class="check-box"><span class="check-text"><strong>Agile Manifesto の 4 つの価値</strong> を言える</span></label></li>
        <li><label class="check-item"><input type="checkbox" class="check-box"><span class="check-text"><strong>Scrum</strong> の主要な roles・events・artifacts を言える</span></label></li>
        <li><label class="check-item"><input type="checkbox" class="check-box"><span class="check-text"><strong>product backlog / user story / MoSCoW / burn chart</strong> が何かを説明できる</span></label></li>
      </ul>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p>1 つでも不安な場合は、まず第 3 章の 3.1〜3.4 から読み進めてください(必要な前提を初学者向けに補っています)。</p>
      </div>
    </section>

        <!-- 3. key-concepts -->
        <section id="key-concepts">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:brain" aria-hidden="true" />SECTION 04</div>
          <h2>3. Key concepts</h2>
        </section>

        <!-- 4. practices-roles -->
        <section id="practices-roles">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 05</div>
          <h2>4. PRINCE2 Agile の practices と roles</h2>
        </section>

        <!-- 5. processes -->
        <section id="processes">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 06</div>
          <h2>5. PRINCE2 Agile の processes と workshops</h2>
        </section>

        <!-- 6. wider-context -->
        <section id="wider-context">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:rocket" aria-hidden="true" />SECTION 07</div>
          <h2>6. より広い文脈での適用</h2>
        </section>

        <!-- 7. exam-strategy -->
        <section id="exam-strategy">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target" aria-hidden="true" />SECTION 08</div>
          <h2>7. 試験対策: オープンブックを最大限に活かす</h2>
        </section>

        <!-- 8. practice-questions -->
        <section id="practice-questions">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:pencil" aria-hidden="true" />SECTION 09</div>
          <h2>8. 演習: シナリオ形式の練習問題(オリジナル)</h2>
        </section>

        <!-- 9. glossary -->
        <section id="glossary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 10</div>
          <h2>9. 用語集(英日対訳)</h2>
        </section>

        <!-- 10. references -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 11</div>
          <h2>10. 参考資料・根拠ソース(URL)</h2>
        </section>

        <!-- 付録 A -->
        <section id="appendix-a">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 12</div>
          <h2>付録 A: シラバス対応表(学習成果 → 本ガイド → 公式ブック)</h2>
        </section>

        <!-- 付録 B -->
        <section id="appendix-b">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 13</div>
          <h2>付録 B: 【要照合】項目チェックリスト(公式ブックで必ず確認)</h2>
        </section>

        <!-- 付録 C -->
        <section id="appendix-c">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 14</div>
          <h2>付録 C: 最終チェックリスト(試験前日)</h2>
        </section>

        <footer>
          <p>PRINCE2® および PRINCE2 Agile® は PeopleCert の登録商標です。</p>
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

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 17px;
}

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 29px;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  color: var(--color-ink);
  margin: 40px 0 16px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
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

ul:not(.sidebar-nav):not(.checklist) {
  list-style-type: disc;
  margin: 0 0 18px;
  padding-left: 24px;
}

ol {
  list-style-type: decimal;
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

/* ===================== Domain badge cards ===================== */
.domain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:nth-child(even) {
  background: var(--color-paper);
}

td strong,
th strong {
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

.callout-title :deep(.iconify),
.callout-title :deep(svg) {
  font-size: 18px;
  flex: none;
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
.mermaid-wrap {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 12px;
  padding: 28px;
  margin: 28px 0;
}

.diagram-caption {
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

/* ===================== Glossary ===================== */

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

.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

/* ===================== Checklist (interactive) ===================== */
.checklist {
  list-style: none;
  margin: 0 0 18px;
  padding-left: 0;
}

.checklist li {
  margin-bottom: 10px;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.check-box {
  flex: none;
  width: 18px;
  height: 18px;
  margin: 5px 0 0;
  accent-color: var(--color-indigo);
  cursor: pointer;
}

.check-item .check-box:checked + .check-text {
  color: var(--color-ink-faint);
  text-decoration: line-through;
}

.check-item .check-box:checked + .check-text strong {
  color: inherit;
}

td.check-cell {
  text-align: center;
}

td.check-cell .check-box {
  margin: 0;
  vertical-align: middle;
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

  .sidebar.is-open {
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

  .domain-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .glossary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .stat-row {
    grid-template-columns: 1fr;
  }

  .domain-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar {
    transition: none;
  }
}
</style>
