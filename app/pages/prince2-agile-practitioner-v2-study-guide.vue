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
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon  name="tabler:brain" aria-hidden="true" />SECTION 04</div>
      <span class="domain-tag d1">カテゴリ 1 · 配点 20%</span>
      <h2>3. Key concepts</h2>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>カテゴリ 1 の学習ゴール</strong> 【シラバス】<br>
        アジャイルの必要性と「being / doing agile」の違いを説明し(BL2)、Agile Onion と mindset の特徴を適用し(BL3)、7 aspects of project performance と agile transformation の概念を適用し(BL3)、OCM・チームリーダーシップ・コミュニケーションを説明・適用できる。</p>
      </div>
      <h3>3.1 Agile とアジャイルマインドセット(シラバス 1.1)</h3>
      <h4>3.1.1 一言でいうと</h4>
      <p>PRINCE2 は「<strong>統制(ガバナンス)の骨格</strong>」、Agile は「<strong>変化に強い動き方</strong>」です。サッカーにたとえると、PRINCE2 が「ルールとフォーメーション」、Agile が「状況に応じて動くプレースタイル」にあたります。PRINCE2 Agile はこの 2 つを <strong>矛盾させずに 1 つのチームで使う</strong> ための指針です。</p>
      <h4>3.1.2 ステップバイステップ解説</h4>
      <p><strong>Step 1: なぜ Agile が必要か(1.1.1 / 公式ブック 2.4)</strong> 【シラバス】</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>従来型(計画駆動)の課題</th><th>Agile が狙う改善</th></tr></thead>
          <tbody>
            <tr><td>要求が最初に固定され、後から変化に弱い</td><td>変化を前提にし、<strong>優先順位を継続的に見直す</strong></td></tr>
            <tr><td>最後にまとめて納品し、価値が出るのが遅い</td><td><strong>小さな増分(increment)を頻繁に届け</strong>、早く価値と学びを得る</td></tr>
            <tr><td>顧客との対話が最初と最後に偏る</td><td><strong>顧客・ステークホルダーが継続的に関与</strong> する</td></tr>
            <tr><td>問題の発覚が遅い</td><td>短いサイクルで <strong>早期にフィードバック</strong> を得る</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Step 2: Agile Manifesto の 4 つの価値(Foundation 範囲・復習)</strong> 【シラバス(Foundation 1.1.9)】</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>価値(左を重視。右も価値はあるが優先度は左)</th><th>意味(初学者向け)</th></tr></thead>
          <tbody>
            <tr><td>Individuals and interactions <strong>over</strong> processes and tools</td><td>人同士の対話が、ツールや手順に優先する</td></tr>
            <tr><td>Working software <strong>over</strong> comprehensive documentation</td><td>動く成果物が、網羅的な文書に優先する</td></tr>
            <tr><td>Customer collaboration <strong>over</strong> contract negotiation</td><td>顧客との協働が、契約交渉に優先する</td></tr>
            <tr><td>Responding to change <strong>over</strong> following a plan</td><td>変化への対応が、計画への固執に優先する</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Step 3: 「being agile」と「doing agile」(1.1.2 / 公式ブック 2.3.1)</strong> 【シラバス】</p>
      <p>これは Version 2 の <strong>最重要テーマの 1 つ</strong> です。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>doing agile(やり方)</th><th>being agile(あり方)</th></tr></thead>
          <tbody>
            <tr><td>中身</td><td>practices(実践)と techniques(技法)を使う</td><td>mindset(考え方)と behaviours(振る舞い)を体現する</td></tr>
            <tr><td>例</td><td>daily stand-up、backlog、burn chart、retrospective を行う</td><td>透明性・信頼・協働・学習を日常の判断で実践する</td></tr>
            <tr><td>単独の限界</td><td>形だけ(「アジャイルごっこ」)になりやすい</td><td>実践がないと成果に結びつきにくい</td></tr>
            <tr><td>目指す姿</td><td><strong>両方を組み合わせる</strong> ことで持続的な成果を得る</td><td></td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>試験ポイント(BL2)</strong>: 「stand-up や backlog を導入したのに、チームが指示待ちで隠し事が多い」→ <strong>doing はできているが being が不足</strong> している、と説明できること。</p>
      </div>
      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
      <ul>
        <li>「導入する practice の数」ではなく、「<strong>どんな振る舞いを増やしたいか</strong>」から始める。</li>
        <li>リーダーが <strong>自ら振る舞いで示す</strong>(失敗の共有、意思決定の透明化)。</li>
        <li>retrospective で「practice が behaviour を支えているか」を定期的に点検する。</li>
      </ul>
      </div>
      <h4>3.1.4 よくある落とし穴</h4>
      <ul>
        <li>ツール導入(Jira や Kanban ボード)だけで「アジャイルになった」と考える。</li>
        <li>「Agile = ドキュメント不要 / 計画不要」と誤解する(PRINCE2 Agile は <strong>統制を維持したまま</strong> 柔軟性を得る考え方)。</li>
      </ul>
      <h3>3.2 Agile mindset と Agile Onion(シラバス 1.1.3 / 公式ブック 2.6, 2.6.1, 2.6.2)</h3>
      <h4>3.2.1 一言でいうと</h4>
      <p>Agile Onion は、アジャイルを <strong>玉ねぎのような層構造</strong> で捉えるモデルです。外から見える「手順」だけでなく、その根っこにある「考え方」まで含めて理解するための図です。</p>
      <h4>3.2.2 5 つの層 【シラバス(Foundation 1.1.7)】</h4>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_AGILE_ONION_LAYERS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">5 つの層 【シラバス(Foundation 1.1.7)】</div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>層</th><th>内容(初学者向け)</th><th>例</th></tr></thead>
          <tbody>
            <tr><td><strong>Mindset</strong></td><td>物事の捉え方・前提となる考え方</td><td>変化を歓迎する、学習を重視する</td></tr>
            <tr><td><strong>Values</strong></td><td>大切にする価値観</td><td>Agile Manifesto の 4 つの価値</td></tr>
            <tr><td><strong>Principles</strong></td><td>価値観から導かれる行動指針</td><td>顧客価値の早期・継続的な提供</td></tr>
            <tr><td><strong>Practices</strong></td><td>具体的な実践</td><td>stand-up、retrospective、timeboxing</td></tr>
            <tr><td><strong>Processes</strong></td><td>手順としての流れ</td><td>PRINCE2 の 7 processes、Scrum の events の流れ</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>【要照合】</strong> 上の図は「Mindset を最も内側の核、Processes を最も外側」と捉える一般的な玉ねぎの読み方で並べています。試験では <strong>5 つの層の名前</strong> が問われます(Foundation のシラバスで明記)。層の並び方向・図のキャプションは、公式ブック 2.6.1 の図で照合してください。</p>
      </div>
      <h4>3.2.3 Agile mindset の主要な特徴(1.1.3 b / 公式ブック 2.6.2)</h4>
      <p>シラバスは「key characteristics of the agile mindset」の適用を求めています。<strong>一覧の正確な項目名は公式ブック 2.6.2 で照合</strong> してください【要照合】。一般に、アジャイルマインドセットは次のような姿勢で表されます【一般知識】。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>特徴(一般的な表現)</th><th>職場での見え方</th></tr></thead>
          <tbody>
            <tr><td>変化に対してオープン</td><td>要求変更を「問題」ではなく「学びの機会」として扱う</td></tr>
            <tr><td>顧客・ユーザー価値への集中</td><td>「作ること」より「価値が出ること」を優先する</td></tr>
            <tr><td>協働・透明性</td><td>進捗や問題を隠さず共有する</td></tr>
            <tr><td>自己組織化・エンパワーメント</td><td>チームが自ら作業の進め方を決める</td></tr>
            <tr><td>継続的な学習・改善</td><td>retrospective の学びを次の timebox に反映する</td></tr>
            <tr><td>反復・増分での価値提供</td><td>小さく作り、早く見せ、フィードバックを得る</td></tr>
          </tbody>
        </table>
      </div>
      <h4>3.2.4 ステップバイステップ: Onion を実務で使う(BL3 の練習)</h4>
      <ol>
        <li><strong>現状の観察</strong>: いま行っている practice(stand-up など)を書き出す(Practices 層)。</li>
        <li><strong>1 層内側へ</strong>: それらは、どの Principles を体現しているか？ どの Values に基づくか？</li>
        <li><strong>ギャップの発見</strong>: 「practice はあるが、その根っこの values や mindset が伴っていない」箇所を探す。</li>
        <li><strong>打ち手</strong>: practice を増やすのではなく、<strong>対話・意思決定・リーダーの行動</strong> を変える。</li>
      </ol>
      <h4>3.2.5 ベストプラクティス / 落とし穴 / 試験ポイント</h4>
      <ul>
        <li><strong>ベストプラクティス</strong>: 導入初期は外側(processes)ではなく内側(mindset / values)の対話から始める。</li>
        <li><strong>落とし穴</strong>: 外側の層(フレームワーク)を先に固定し、内側の層を放置する。</li>
        <li><strong>試験ポイント</strong>: BL2「being と doing の違い」、BL3「シナリオの問題点を Onion のどの層の欠落として説明するか」。</li>
      </ul>
      <h3>3.3 Agile の主要アプローチ(Foundation 1.1.10 の復習)</h3>
      <p>【シラバス(Foundation)】Scrum / Kanban / Lean / Lean Startup が例示されています。PRINCE2 Agile は <strong>特定の 1 つに固定せず</strong>、これらと組み合わせて使えます。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>アプローチ</th><th>一言</th><th>主なキーワード【一般知識】</th></tr></thead>
          <tbody>
            <tr><td><strong>Scrum</strong></td><td>固定長の timebox で反復するフレームワーク</td><td>Product Owner / Scrum Master / Developers、Sprint、Sprint Planning、Daily Scrum、Sprint Review、Sprint Retrospective、Product Backlog、Increment</td></tr>
            <tr><td><strong>Kanban</strong></td><td>仕事の流れを可視化し、同時進行数を制限する</td><td>ボード、WIP 制限、フロー、継続的デリバリー</td></tr>
            <tr><td><strong>Lean</strong></td><td>ムダを排除し価値の流れを最適化する</td><td>ムダの排除、フロー、継続的改善</td></tr>
            <tr><td><strong>Lean Startup</strong></td><td>仮説検証で学びを最大化する</td><td>Build-Measure-Learn、<strong>MVP</strong>(Minimum Viable Product)</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>PRINCE2 Agile での対応関係(初学者向け)</strong>: PRINCE2 Agile の <strong>team roles(Product Owner / Team coach)や timebox(iteration)</strong> は Scrum 用語と対応づけて理解すると覚えやすくなります。ただし試験は <strong>PRINCE2 Agile の用語</strong> で答える必要があるため、Scrum 用語をそのまま使わず、公式ブックの用語で整理してください。</p>
      </div>
      <h3>3.4 PRINCE2 Project Management の基礎(シラバス 1.4.1 / 公式ブック 5.2〜5.4)</h3>
      <h4>3.4.1 5 つの統合要素 【シラバス(Foundation 1.2.3)】</h4>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_PRINCE2_ELEMENTS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">5 つの統合要素 【シラバス(Foundation 1.2.3)】</div>
      </div>
      <h4>3.4.2 7 principles と Agile 文脈での読み替え(1.2.1 / 公式ブック 5.6.1)</h4>
      <p>PRINCE2 の 7 principles は <strong>Agile でもそのまま適用</strong> します。Agile では「どう表れるか」が変わります。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Principle 【シラバス】</th><th>Agile 文脈での表れ方【一般知識 + 【要照合】5.6.1】</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Ensure continued business justification</td><td><strong>MVP</strong> と頻繁なリリースで価値を早く確認し、business case を継続的に見直す</td></tr>
            <tr><td>2</td><td>Learn from experience</td><td><strong>retrospective</strong> と lessons log を各 timebox で回し、学びを即座に反映</td></tr>
            <tr><td>3</td><td>Define roles, responsibilities, and relationships</td><td>Product Owner / Team coach など <strong>アジャイルの役割</strong> を PRINCE2 の役割と整合させる</td></tr>
            <tr><td>4</td><td>Manage by stages</td><td>stage を <strong>複数の timebox(iteration / release)を含む単位</strong> として計画し、ボードの判断点にする</td></tr>
            <tr><td>5</td><td>Manage by exception</td><td><strong>tolerance の範囲内はチームに委譲</strong>。範囲を超える兆候だけを上位へ escalate</td></tr>
            <tr><td>6</td><td>Focus on products</td><td><strong>product backlog / user story / DoD</strong> で「何を作るか・完成とは何か」を明確化</td></tr>
            <tr><td>7</td><td>Tailor to suit the project</td><td>Agilometer・プロジェクトの文脈に合わせ、PRINCE2 と agile の <strong>組み合わせ方を調整</strong> する</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>試験ポイント(BL3)</strong>: シナリオの状況(例: 「ボードが毎週詳細な承認を求めている」)を見て、<strong>どの principle に反しているか</strong> を特定し、改善案を選ぶ。</p>
      </div>
      <h4>3.4.3 7 practices(一覧) 【シラバス】</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Practice</th><th>目的(1 行)</th><th>本ガイドの節</th></tr></thead>
          <tbody>
            <tr><td><strong>Business case</strong></td><td>プロジェクトが「望ましく・実行可能で・達成可能」か判断する</td><td>4.2</td></tr>
            <tr><td><strong>Organization</strong></td><td>責任体制を定義し、ステークホルダーを関与させる</td><td>4.3</td></tr>
            <tr><td><strong>Plans</strong></td><td>どう成果物を届けるかを示し、コミュニケーションと統制を促す</td><td>4.4</td></tr>
            <tr><td><strong>Quality</strong></td><td>成果物が目的に適う(fit for purpose)ことを作り込み・検証する</td><td>4.5</td></tr>
            <tr><td><strong>Risk</strong></td><td>不確実性(脅威・好機)を識別・評価・対応する</td><td>4.6</td></tr>
            <tr><td><strong>Issues</strong></td><td>計画外の事象を捕捉・評価・対応する</td><td>4.7</td></tr>
            <tr><td><strong>Progress</strong></td><td>計画と実績を比較し、逸脱を統制する</td><td>4.8</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p>目的の文言は【一般知識(PRINCE2 7 の考え方の要約)】です。シラバスのサンプル問題にも「逸脱を統制する目的の practice は？(答えは progress)」という形式が例示されています。<strong>各 practice の "purpose" は公式ブックの 6.1 / 7.1 / 8.1 / 9.1 / 10.1 / 11.1 / 12.1 で必ず照合</strong> してください。</p>
      </div>
      <h4>3.4.4 7 processes(一覧)</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Process</th><th>略称</th><th>主体(一般)</th><th>節</th></tr></thead>
          <tbody>
            <tr><td>Starting up a project</td><td>SU</td><td>Project Board / PM</td><td>5.2</td></tr>
            <tr><td>Directing a project</td><td>DP</td><td>Project Board</td><td>5.3</td></tr>
            <tr><td>Initiating a project</td><td>IP</td><td>PM</td><td>5.4</td></tr>
            <tr><td>Controlling a stage</td><td>CS</td><td>PM</td><td>5.5</td></tr>
            <tr><td>Managing product delivery</td><td>MP</td><td>Team</td><td>5.6</td></tr>
            <tr><td>Managing a stage boundary</td><td>SB</td><td>PM</td><td>5.7</td></tr>
            <tr><td>Closing a project</td><td>CP</td><td>PM / Board</td><td>5.8</td></tr>
          </tbody>
        </table>
      </div>
      <h3>3.5 7 aspects of project performance と "fix and flex"(シラバス 1.2.2 / 公式ブック 3.3)</h3>
      <h4>3.5.1 一言でいうと</h4>
      <p>プロジェクトの成果は <strong>7 つの側面(aspects)</strong> で測ります。どれを「固定(fix)」し、どれを「柔軟(flex)」にするかを、ボードと合意しておくことが Agile 統制の核心です。</p>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>バージョンに関する注意</strong>: Version 1 の教材では「6 つの aspects(hexagon)」と説明されていました。Version 2 のシラバスは <strong>「seven aspects of project performance」</strong> と明記しています(【シラバス】)。旧版(6 つ)の資料と混同しないよう注意してください。</p>
      </div>
      <h4>3.5.2 7 aspects と Agile での典型的な扱い</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Aspect</th><th>意味</th><th>Agile での典型的な扱い【一般知識 + 【要照合】3.3】</th></tr></thead>
          <tbody>
            <tr><td><strong>Benefits</strong></td><td>得られる成果・便益</td><td>早期・継続的なリリースで便益実現を前倒しし、実測する</td></tr>
            <tr><td><strong>Risk</strong></td><td>不確実性</td><td>短いサイクルで検証し、Agilometer で状況を可視化する</td></tr>
            <tr><td><strong>Time</strong></td><td>期間・納期</td><td><strong>固定寄り</strong>(timebox を守る)</td></tr>
            <tr><td><strong>Cost</strong></td><td>予算・コスト</td><td><strong>固定寄り</strong>(安定したチーム構成で予測可能にする)</td></tr>
            <tr><td><strong>Scope</strong></td><td>提供する機能範囲</td><td><strong>柔軟(flex)</strong>: MoSCoW で優先順位を付け、Should / Could を調整弁にする</td></tr>
            <tr><td><strong>Quality</strong></td><td>目的適合性</td><td><strong>妥協しない</strong>(DoD で基準を明確化し、品質を犠牲にしない)</td></tr>
            <tr><td><strong>Sustainability</strong></td><td>環境・社会・経済面の持続可能性</td><td>成果物・チーム・運用の持続性を計画に織り込む</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p>「どれを fix / flex にするか」は <strong>プロジェクトの文脈(規制、契約、納期の硬さ)で変わります</strong>。上表は典型例であり、試験ではシナリオの制約(例: 法規制対応の期限は動かせない)から判断してください。</p>
      </div>
      <h4>3.5.3 tolerance を階層で考える</h4>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TOLERANCE_LEVELS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">tolerance を階層で考える</div>
      </div>
      <p><strong>ステップバイステップ(fix &amp; flex の合意手順)</strong></p>
      <ol>
        <li>各 aspect の <strong>優先順位</strong> を関係者で議論する(何を守り、何を動かせるか)。</li>
        <li><strong>fix する aspect</strong> と <strong>flex する aspect</strong> を決め、<strong>tolerance</strong> を数値・範囲で表す。</li>
        <li>flex する aspect(例: scope)は <strong>MoSCoW</strong> で具体化し、動かせる範囲を見える化する。</li>
        <li>tolerance の <strong>超過の兆候</strong> を早期に検知したら、上位へ escalate(exception)。</li>
        <li>各 stage の境界で見直す。</li>
      </ol>
      <h4>3.5.4 ベストプラクティス / 落とし穴 / 試験ポイント</h4>
      <ul>
        <li><strong>ベストプラクティス</strong>: 「全部固定」は Agile と両立しない。<strong>1〜2 つを flex 対象に明確化</strong> する。</li>
        <li><strong>落とし穴</strong>: scope を flex にしつつ、Must の定義が曖昧で、結局すべてが必須になる。</li>
        <li><strong>試験ポイント(BL3)</strong>: シナリオの制約から「fix / flex の組み合わせ」を選ぶ。<strong>quality を犠牲にして納期を守る</strong> 選択肢は原則として誤り。</li>
      </ul>
      <h3>3.6 Agile transformation の主要概念(シラバス 1.2.3 / 公式ブック 2.7)</h3>
      <p>シラバスは次の 4 つの適用(BL3)を求めています。</p>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TRANSFORMATION_CONCEPTS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">Agile transformation の主要概念(シラバス 1.2.3 / 公式ブック 2.7)</div>
      </div>
      <h4>3.6.1 Agile transformation plan(2.7.1)</h4>
      <p><strong>一言でいうと</strong>: 組織がアジャイルに変わっていくための「道筋の計画」です。</p>
      <p><strong>ステップバイステップ【一般知識】</strong></p>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TRANSFORMATION_LOOP" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">Agile transformation plan(2.7.1)</div>
      </div>
      <ul>
        <li><strong>ベストプラクティス</strong>: 全社一斉ではなく <strong>小さく始めて学び、広げる</strong>。リーダーシップの関与と、成功基準(測る指標)を最初に決める。</li>
        <li><strong>落とし穴</strong>: 計画を「一度作って終わり」にする。トランスフォーメーション自体を <strong>アジャイルに(反復的に)</strong> 進めることが必要。</li>
      </ul>
      <h4>3.6.2 Agile maturity(2.7.3)</h4>
      <p><strong>一言でいうと</strong>: 組織・チームの「アジャイルの成熟度合い」を段階で捉えて、次の打ち手を決めるための物差しです。</p>
      <ul>
        <li><strong>使い方</strong>: 現状を評価 → 目指す状態を設定 → ギャップに対する改善を計画。</li>
        <li><strong>ベストプラクティス</strong>: 成熟度は <strong>目的ではなく手段</strong>。高い点数を取ること自体を目標にしない。</li>
        <li><strong>落とし穴</strong>: 他社のスコアとの比較に終始し、自社の文脈に合わない打ち手を導入する。</li>
        <li><strong>試験ポイント</strong>: 成熟度は、tailoring(例: 委譲の程度、統制の粒度)を <strong>決める材料</strong> になる。</li>
      </ul>
      <h4>3.6.3 Psychological safety(2.7.4)</h4>
      <p><strong>一言でいうと</strong>: 「間違いや懸念、質問を口にしても、責められたり恥をかいたりしない」と感じられる状態です。アジャイルの <strong>透明性・早期フィードバック・学習</strong> の土台になります。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>心理的安全性が <strong>高い</strong> チーム</th><th><strong>低い</strong> チーム</th></tr></thead>
          <tbody>
            <tr><td>問題や遅延を早めに共有する</td><td>悪い知らせを隠し、発覚が遅れる</td></tr>
            <tr><td>質問・反対意見が出る</td><td>沈黙・忖度が多い</td></tr>
            <tr><td>失敗を学習として扱う</td><td>失敗の責任追及が中心になる</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>ベストプラクティス【一般知識】</strong></p>
      <ul>
        <li>リーダーが <strong>自分の不確実性や失敗を先に開示</strong> する。</li>
        <li>retrospective の <strong>ルールを合意</strong>(人ではなくプロセスに焦点)。</li>
        <li>懸念を出した人を <strong>感謝で受け止める</strong>。</li>
        <li>参考: Google の re:Work でも、心理的安全性がチームの有効性で重要な要素として整理されています(参照 URL は第 10 章)。</li>
      </ul>
      <p><strong>試験ポイント(BL3)</strong>: 「stand-up で誰も遅れを報告しない」ような状況で、<strong>心理的安全性を高める施策</strong> を選ぶ。</p>
      <h4>3.6.4 Agile sustainability(2.7.5)</h4>
      <p><strong>一言でいうと</strong>: アジャイルな働き方を <strong>一過性で終わらせず、長期的に続けられる</strong> 状態にすることです。</p>
      <ul>
        <li><strong>人の持続可能性</strong>: 無理のない持続可能なペース、燃え尽き防止、チームの安定。</li>
        <li><strong>仕組みの持続可能性</strong>: 継続的改善の習慣、リーダーの後押し、知見の共有。</li>
        <li><strong>成果の持続可能性</strong>: 運用に耐える品質、技術的負債の管理(7 aspects の Sustainability とも連動)。</li>
      </ul>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p><strong>【要照合】</strong> 公式ブック 2.7.5 が Agile sustainability を上記のどの側面に重心を置いて定義しているかは、本文で確認してください。</p>
      </div>
      <h3>3.7 People と Organizational Change Management(OCM)(シラバス 1.3.1〜1.3.5 / 公式ブック 第 4 章)</h3>
      <h4>3.7.1 OCM の全体像</h4>
      <p><strong>一言でいうと</strong>: アジャイルの導入は <strong>人と文化の変化</strong> を伴います。OCM は、その変化を計画的に進める考え方です。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>シラバス項目</th><th>内容</th><th>公式ブック</th></tr></thead>
          <tbody>
            <tr><td>1.3.1</td><td><strong>OCM の重要性</strong>を説明(BL2)</td><td>4.2.1</td></tr>
            <tr><td>1.3.2</td><td><strong>OCM・ステークホルダー・文化</strong> の主要概念を適用(BL3)</td><td>4.2</td></tr>
            <tr><td>1.3.3</td><td><strong>組織横断で成功するチーム</strong> を導くための概念を適用(BL3)</td><td>4.3</td></tr>
            <tr><td>1.3.4</td><td><strong>チーム内コミュニケーション</strong>の重要性を説明(co-located / remote / hybrid)(BL2)</td><td>4.4</td></tr>
            <tr><td>1.3.5</td><td><strong>アジャイルチームの構築とリード</strong> の考慮事項を適用(BL3)</td><td>4.5</td></tr>
          </tbody>
        </table>
      </div>
      <h4>3.7.2 OCM ステップバイステップ【一般知識】</h4>
      <ol>
        <li><strong>なぜ変わるのか(目的)を共有</strong> する。</li>
        <li><strong>ステークホルダーを特定</strong> し、影響度・関心度・現在の態度を把握する(Foundation 1.4.2: OCM stakeholders)。</li>
        <li><strong>文化を理解する</strong>(4.2.3): 目に見える行動の背後にある前提を捉える。</li>
        <li><strong>小さな成功を作り、見える化</strong> する(アジャイルの増分提供は OCM を支援する: 4.2.4)。</li>
        <li><strong>継続的に対話・フィードバック</strong> し、抵抗を学びとして扱う。</li>
      </ol>
      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon  name="tabler:info-circle" aria-hidden="true" />補足</div>
      <p>補足: OCM の代表的なモデルに <strong>Kotter の 8 ステップ</strong> や <strong>ADKAR</strong> があります(参照 URL は第 10 章)。<strong>シラバスは特定モデルの暗記を求めていません</strong>。あくまで理解の補助として使ってください。</p>
      </div>
      <h4>3.7.3 文化とアジャイル(4.2.3)</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>統制重視の文化</th><th>アジャイルを支える文化</th></tr></thead>
          <tbody>
            <tr><td>意思決定</td><td>上位に集中</td><td><strong>権限委譲</strong>(tolerance の範囲内)</td></tr>
            <tr><td>失敗</td><td>責任追及</td><td>学習の機会</td></tr>
            <tr><td>情報</td><td>必要最小限を報告</td><td><strong>透明性</strong></td></tr>
            <tr><td>顧客</td><td>契約・仕様で線引き</td><td><strong>継続的な協働</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>ベストプラクティス</strong>: 文化を「一気に変える」のではなく、<strong>目に見える成功体験(小さな勝ち)</strong> を積み上げる。</p>
      <h4>3.7.4 組織横断のチームを導く(4.3)とチーム構築(4.5)【一般知識 + 【要照合】】</h4>
      <ul>
        <li><strong>チーム構成</strong>: cross-functional(企画〜開発〜テストを含む)で、<strong>できるだけ安定した少人数</strong>。一般に 1 チーム 10 人以内が目安として知られます。</li>
        <li><strong>合意事項</strong>: working agreement(チームの約束事)を明文化。</li>
        <li><strong>リーダーシップ</strong>: 指示命令型ではなく <strong>サーバントリーダーシップ</strong>(障害除去・環境づくり)。</li>
        <li><strong>意思決定の所在</strong>: 誰がどの範囲で決められるか(decision rights)を明確化。</li>
        <li><strong>複数チーム</strong>: 共通のゴール、依存関係の可視化、<strong>チーム間の定期的な同期(sync)</strong>。</li>
      </ul>
      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_TEAM_COLLABORATION" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中…</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">組織横断のチームを導く(4.3)とチーム構築(4.5)【一般知識 + 【要照合】】</div>
      </div>
      <h4>3.7.5 チーム内コミュニケーション(4.4)</h4>
      <p>アジャイルは <strong>rich communication(豊かなコミュニケーション)</strong> を重視します。対面が最も情報量が豊かで、次にビデオ、電話、チャット、文書の順に情報が細るという考え方が一般的です【一般知識】。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>形態</th><th>特徴</th><th>ベストプラクティス</th></tr></thead>
          <tbody>
            <tr><td><strong>Co-located</strong>(同一拠点)</td><td>自然な対話、情報ラジエーター(壁のボード)を使える</td><td>物理ボード、短い対面のやり取りを活用。<strong>それでも決定事項は記録</strong> する</td></tr>
            <tr><td><strong>Remote</strong>(全員遠隔)</td><td>非同期になりやすく、孤立や誤解が起きやすい</td><td>ビデオ ON の習慣、<strong>共有デジタルボード</strong>、明確な非同期ルール、意図的な雑談の時間</td></tr>
            <tr><td><strong>Hybrid</strong>(混在)</td><td><strong>会議室組と遠隔組で情報格差</strong> が生じやすい</td><td>会議は <strong>全員が個別に接続する</strong> 前提で設計。決定はテキストで残す。重要な場面を対面に偏らせない</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>落とし穴</strong>: hybrid で、会議室の議論が遠隔メンバーに届かず、<strong>二層構造のチーム</strong> になる。</p>
      <h4>3.7.6 試験ポイント(カテゴリ 1 全体)</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>出やすい問い</th><th>考え方</th></tr></thead>
          <tbody>
            <tr><td>being と doing の区別(BL2)</td><td>「形」か「あり方」か</td></tr>
            <tr><td>Onion の層(BL2/3)</td><td>5 層(Mindset / Values / Principles / Practices / Processes)の名前と、シナリオの問題の層</td></tr>
            <tr><td>7 aspects の fix / flex(BL3)</td><td>シナリオの制約から決める。quality は妥協しない</td></tr>
            <tr><td>心理的安全性・成熟度・持続可能性(BL3)</td><td>シナリオの症状に対する適切な施策を選ぶ</td></tr>
            <tr><td>hybrid 環境(BL2/3)</td><td>情報格差を作らない工夫を選ぶ</td></tr>
          </tbody>
        </table>
      </div>
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
