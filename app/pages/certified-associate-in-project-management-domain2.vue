<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "how-to-use-this-guide",
  "domain-2-overview",
  "task-1-when-predictive-fits",
  "task-2-schedule-and-plan",
  "task-3-project-controls",
  "domain-2-best-practices",
  "study-checklist",
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
  title: "CAPM(R) ドメイン2 完全学習ガイド | 予測型・計画重視の手法(Predictive, Plan-Based Methodologies)",
  description: "CAPM(R)試験ドメイン2「予測型・計画重視の手法」を、組織構造、プロセス群、WBS、クリティカルパス法、EVM、品質・統合管理まで初学者向けに図解付きで解説する学習ガイド。",
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
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
  fontSize: "16px",
};

const DIAGRAM_DOMAIN_TWO_TASKS = `flowchart TD
D2["ドメイン2: 予測型・計画重視の手法 (17%)"]
D2 --> T1["Task 1\\n予測型アプローチが適切な場面を説明する"]
D2 --> T2["Task 2\\nプロジェクトマネジメント計画の\\nスケジュールを理解する"]
D2 --> T3["Task 3\\n予測型プロジェクトの\\nプロジェクトコントロールを文書化する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class D2,T1,T2,T3 box;`;

const DIAGRAM_ORG_STRUCTURE_CONTINUUM = `flowchart LR
F["ファンクショナル型\\nFunctional\\nPM権限: なし〜非常に低い"] --> WM["ウィークマトリックス\\nWeak Matrix\\nPM権限: 低い"]
WM --> BM["バランスマトリックス\\nBalanced Matrix\\nPM権限: 低〜中程度"]
BM --> SM["ストロングマトリックス\\nStrong Matrix\\nPM権限: 中〜高い"]
SM --> PZ["プロジェクタイズド型\\nProjectized\\nPM権限: 高い〜ほぼ全権"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class F,WM,BM box;
class SM,PZ hub;`;

const DIAGRAM_PROCESS_GROUPS_FLOW = `flowchart LR
I["立ち上げ\\nInitiating"] --> P["計画\\nPlanning"]
P --> E["実行\\nExecuting"]
E <--> M["監視・コントロール\\nMonitoring & Controlling"]
M --> P
E --> C["終結\\nClosing"]
M --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class I,P,E,M box;
class C done;`;

const DIAGRAM_PROJECT_COMPONENTS_TREE = `flowchart TD
CH["プロジェクト憲章\\nProject Charter"] --> PMP["プロジェクトマネジメント計画\\nProject Management Plan"]
PMP --> BL["ベースライン\\nBaselines"]
PMP --> DOC["プロジェクト文書\\nProject Documents"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class CH,PMP,BL,DOC box;`;

const DIAGRAM_WBS_HIERARCHY_TREE = `flowchart TD
ROOT["1.0 社内タスク管理ツール導入プロジェクト"]
ROOT --> D1["1.1 要件定義成果物"]
ROOT --> D2["1.2 設計成果物"]
ROOT --> D3["1.3 実装済みソフトウェア"]
ROOT --> D4["1.4 テスト成果物"]
ROOT --> D5["1.5 導入・移行成果物"]

D1 --> W1["1.1.1 業務要件一覧"]
D1 --> W2["1.1.2 要件定義書"]

D2 --> W3["1.2.1 画面設計書"]
D2 --> W4["1.2.2 DB設計書"]
D2 --> W5["1.2.3 API設計書"]

D3 --> W6["1.3.1 画面モジュール"]
D3 --> W7["1.3.2 データベース"]
D3 --> W8["1.3.3 APIモジュール"]

D4 --> W9["1.4.1 結合テスト報告書"]
D4 --> W10["1.4.2 受入テスト報告書"]

D5 --> W11["1.5.1 移行済みデータ"]
D5 --> W12["1.5.2 本番稼働システム"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class ROOT,D1,D2,D3,D4,D5 box;
class W1,W2,W3,W4,W5,W6,W7,W8,W9,W10,W11,W12 done;`;

const DIAGRAM_CPM_NETWORK_DIAGRAM = `flowchart LR
A["A: 要件定義\\n5日"] --> B["B: 設計\\n7日"]
B --> C["C: DB構築\\n4日"]
B --> D["D: 画面開発\\n10日"]
B --> E["E: API開発\\n8日"]
C --> F["F: 結合テスト\\n5日"]
D --> F
E --> F
F --> G["G: 受入テスト\\n3日"]
G --> H["H: 本番移行\\n2日"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,D,F,G,H hub;
class C,E box;`;

const DIAGRAM_QUALITY_MANAGEMENT_PLAN = `flowchart LR
QMP["品質管理計画\\nQuality Management Plan"] --> QP["品質計画\\nQuality Planning\\n基準・指標の定義"]
QMP --> QA["品質保証\\nQuality Assurance\\nプロセスが正しく守られているかの確認"]
QMP --> QC["品質コントロール\\nQuality Control\\n成果物が基準を満たしているかの検査"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class QMP,QP,QA,QC box;`;

const DIAGRAM_INTEGRATION_MANAGEMENT_PLAN = `flowchart TD
PMP["プロジェクトマネジメント計画\\n(統合された全体計画)"]
PMP --> SC["スコープ管理計画"]
PMP --> SCH["スケジュール管理計画"]
PMP --> CO["コスト管理計画"]
PMP --> QM["品質管理計画"]
PMP --> RE["リソース管理計画"]
PMP --> COM["コミュニケーション管理計画"]
PMP --> RI["リスク管理計画"]
PMP --> PR["調達管理計画"]
PMP --> ST["ステークホルダー管理計画"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PMP hub;
class SC,SCH,CO,QM,RE,COM,RI,PR,ST box;`;

const DIAGRAM_EVM_RELATIONSHIP_DIAGRAM = `flowchart TD
PV["PV: Planned Value\\n計画時点までの予算価値"]
EV["EV: Earned Value\\n完了した作業の予算価値(出来高)"]
AC["AC: Actual Cost\\n実際に発生したコスト"]

PV --> SV["SV = EV - PV\\nスケジュール差異"]
EV --> SV
EV --> CV["CV = EV - AC\\nコスト差異"]
AC --> CV
PV --> SPI["SPI = EV / PV\\nスケジュール効率指数"]
EV --> SPI
EV --> CPI["CPI = EV / AC\\nコスト効率指数"]
AC --> CPI
CPI --> EAC["EAC\\n完成時総コスト予測"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PV,EV,AC box;
class SV,CV,SPI,CPI,EAC hub;`;

const DIAGRAM_CHANGE_CONTROL_FLOW = `flowchart LR
IS["課題・逸脱の発見\\n(Issue Logに登録)"] --> CR["変更要求の起票\\nChange Request"]
CR --> CCB["統合変更管理\\n(変更管理委員会 CCBによる審査)"]
CCB -->|"承認"| BU["ベースラインの更新\\n(スコープ/スケジュール/コスト)"]
CCB -->|"却下"| LG["却下理由をChange Logに記録"]
BU --> SR["ステータスレポートへ反映"]
LG --> SR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class IS,CR,CCB,LG box;
class BU,SR done;`;
</script>

<template>
  <div class="capm-domain2-page">
    <button
      id="sidebarToggle"
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div class="layout">
    <!-- ===================== Sidebar ===================== -->
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">CAPM(R) ドメイン2 ガイド</div>
          <div class="brand-subtitle">予測型・計画重視の手法</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li>
          <a href="#how-to-use-this-guide" :class="{ active: activeId === 'how-to-use-this-guide' }" @click="closeSidebar">
            <Icon name="tabler:route" aria-hidden="true" />このガイドの使い方
          </a>
        </li>
        <li>
          <a href="#domain-2-overview" :class="{ active: activeId === 'domain-2-overview' }" @click="closeSidebar">
            <Icon name="tabler:chart-pie" aria-hidden="true" />ドメイン2の全体像
          </a>
        </li>
        <li>
          <a href="#task-1-when-predictive-fits" :class="{ active: activeId === 'task-1-when-predictive-fits' }" @click="closeSidebar">
            <Icon name="tabler:building-bank" aria-hidden="true" />Task 1: 予測型・計画重視アプローチが適切な場面の説明
          </a>
        </li>
        <li>
          <a href="#task-2-schedule-and-plan" :class="{ active: activeId === 'task-2-schedule-and-plan' }" @click="closeSidebar">
            <Icon name="tabler:timeline" aria-hidden="true" />Task 2: プロジェクトマネジメント計画とスケジュールの理解
          </a>
        </li>
        <li>
          <a href="#task-3-project-controls" :class="{ active: activeId === 'task-3-project-controls' }" @click="closeSidebar">
            <Icon name="tabler:clipboard-text" aria-hidden="true" />Task 3: 予測型プロジェクトのプロジェクトコントロールの文書化
          </a>
        </li>
        <li>
          <a href="#domain-2-best-practices" :class="{ active: activeId === 'domain-2-best-practices' }" @click="closeSidebar">
            <Icon name="tabler:flag-3" aria-hidden="true" />ドメイン2 ベストプラクティス総まとめ
          </a>
        </li>
        <li>
          <a href="#study-checklist" :class="{ active: activeId === 'study-checklist' }" @click="closeSidebar">
            <Icon name="tabler:list-check" aria-hidden="true" />学習チェックリスト
          </a>
        </li>
        <li>
          <a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar">
            <Icon name="tabler:link" aria-hidden="true" />参考文献・出典
          </a>
        </li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />準拠: PMI公式 CAPM Examination Content Outline(ECO)2023 Exam Update</div>
        <h1>CAPM(R) ドメイン2: 予測型・計画重視の手法(Predictive, Plan-Based Methodologies) 完全学習ガイド</h1>
        <p class="hero-lede">
          対象読者: これからCAPM(R)(Certified Associate in Project Management)受験を目指す初学者。出題比率: 全体の<strong>17%</strong>(4ドメイン中もっとも比率は低いが、他ドメインの土台となる重要領域)。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">17%</div><div class="stat-label">ドメイン2の出題比率</div></div>
          <div class="stat-card"><div class="stat-number">3</div><div class="stat-label">Task数(この章の構成)</div></div>
          <div class="stat-card"><div class="stat-number">10</div><div class="stat-label">Mermaid図解</div></div>
          <div class="stat-card"><div class="stat-number">20</div><div class="stat-label">参考ソースURL数</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          本ガイドはCAPM Exam Content Outline(2023 Exam Update)の内容に基づいて作成された、学習支援を目的とした非公式の解説資料です。PMIは試験内容を定期的に見直すため、受験前には必ず<a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">公式サイト</a>および<a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">最新版のExamination Content Outline</a>で内容の変更がないかご確認ください。
        </div>
      </div>

      <section id="how-to-use-this-guide">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 01</div>
        <h2>このガイドの使い方</h2>

        <p>このガイドは、CAPM試験の出題範囲を定義する公式文書「Examination Content Outline(ECO)」のドメイン2に完全準拠し、Task単位・Enabler単位で初学者にもわかる言葉に噛み砕いて解説したものです。各セクションは次の3種類の補足ボックスを使って構成されています。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>実務およびCAPM試験の両方で役立つ、押さえておくべき実践的なポイントです。</p>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <p>その項目の根拠となる一次情報源(PMI公式)へのリンクです。</p>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>初学者がつまずきやすいポイントや、用語の日英対応を補足します。</p>
        </div>

        <p>図解はすべてMermaid形式のフローチャート/ツリー図で表現し、ASCIIアートは使用していません。</p>
      </section>

      <section id="domain-2-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 02</div>
        <h2>ドメイン2の全体像</h2>

        <h3>CAPM試験全体におけるドメイン2の位置づけ</h3>

        <p>CAPM試験(2023年改訂版ECO)は4つのドメインで構成されており、ドメイン2「予測型・計画重視の手法」はそのうちの17%を占めます。</p>

        <div class="domain-grid">
          <div class="domain-card d1"><div class="domain-pct">36%</div><div class="domain-name">ドメイン1: Project Management Fundamentals and Core Concepts(プロジェクトマネジメントの基礎と中核概念)</div></div>
          <div class="domain-card d2"><div class="domain-pct">17%</div><div class="domain-name">ドメイン2: Predictive, Plan-Based Methodologies(予測型・計画重視の手法)</div></div>
          <div class="domain-card d3"><div class="domain-pct">20%</div><div class="domain-name">ドメイン3: Agile Frameworks/Methodologies(アジャイルのフレームワーク・手法)</div></div>
          <div class="domain-card d4"><div class="domain-pct">27%</div><div class="domain-name">ドメイン4: Business Analysis Frameworks(ビジネス分析のフレームワーク)</div></div>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>ECOの序文では、予測型・適応型(アジャイル)・ビジネス分析の各アプローチは特定のドメインだけに閉じたものではなく、4ドメイン全体を横断して出題され得ると明記されています。ドメイン2はあくまで「予測型アプローチそのものの知識」が集中的に問われる領域ですが、他ドメインの設問文中にも予測型の考え方が前提として登場する点に注意してください。</p>
        </div>

        <h3>ドメイン2を構成する3つのTask</h3>

        <p>ECOはドメインをさらに「Task(責任範囲)」と「Enabler(そのTaskに含まれる具体的な作業例)」に分解しています。ドメイン2は次の3つのTaskで構成されます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DOMAIN_TWO_TASKS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">ドメイン2を構成する3つのTaskの関係</div>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">Domain 2の正式なTask/Enabler一覧は、PMI公式のCAPM Exam Content Outlineに掲載されています。</a></li>
          </ul>
        </div>

        <h3>予測型(Predictive)アプローチとは何か</h3>

        <p>予測型アプローチとは、プロジェクトの開始時点でスコープ・スケジュール・コストをできるだけ詳細に計画し、その計画(ベースライン)に沿って実行・コントロールしていく、いわゆる「ウォーターフォール型」の進め方です。要件が早い段階で明確になり、変更が少ないことが前提となります。</p>

        <p>これに対して、ドメイン3で扱う適応型(Adaptive/Agile)アプローチは、短いイテレーションを繰り返しながら要件を段階的に明らかにしていく進め方です。CAPM試験では、この両者の違いを正しく区別できるかが繰り返し問われます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>比較項目</th><th>予測型(Predictive)</th><th>適応型(Adaptive/Agile)</th></tr></thead>
            <tbody>
              <tr><td>計画のタイミング</td><td>プロジェクト初期にまとめて詳細計画</td><td>反復ごとに都度詳細化(Progressive Elaboration)</td></tr>
              <tr><td>要件の確定度</td><td>早期に確定していることが前提</td><td>変化を前提とし、継続的に見直す</td></tr>
              <tr><td>進捗管理の単位</td><td>WBS・スケジュール・コストベースラインとの差異</td><td>ベロシティ、バーンダウン、インクリメント</td></tr>
              <tr><td>変更の扱い方</td><td>正式な変更管理プロセス(CCB等)を通す</td><td>変更を歓迎し、バックログで柔軟に取り込む</td></tr>
              <tr><td>適したプロジェクト特性</td><td>スコープが明確、規制が厳しい、大規模インフラ・建設等</td><td>不確実性が高い、顧客と頻繁に協働できるソフトウェア開発等</td></tr>
              <tr><td>代表的な成果物</td><td>WBS、ガントチャート、リスクレジスター、変更ログ</td><td>プロダクトバックログ、スプリントバックログ、カンバンボード</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>試験対策としては「どちらが優れているか」ではなく「どちらがこの状況に適しているか」という判断軸で問題文を読むことが重要です。実務でも、1つのプロジェクトの中でハイブリッド(予測型+適応型)を採用するケースが増えています。</p>
        </div>
      </section>

      <section id="task-1-when-predictive-fits">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 03</div>
        <h2>Task 1: 予測型・計画重視アプローチが適切な場面の説明</h2>

        <p>Task 1のEnablerは以下の4つです。</p>

        <ul>
          <li>組織構造(バーチャル、コロケーション、マトリックス構造、階層構造など)に対する予測型アプローチの適合性を識別する</li>
          <li>各プロセス内の活動を判断する</li>
          <li>各プロセス内の典型的な活動の例を挙げる</li>
          <li>さまざまなプロジェクト構成要素の違いを区別する</li>
        </ul>

        <h3>組織構造と予測型アプローチの適合性</h3>

        <p>プロジェクトがどの組織構造の中で実施されるかによって、プロジェクトマネージャー(PM)がどれだけの権限を持てるかが大きく変わります。CAPM試験では、組織構造の種類とPMの権限レベルの対応関係を問う問題が頻出します。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ORG_STRUCTURE_CONTINUUM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">組織構造とPM権限レベルの連続的な変化</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>組織構造</th><th>特徴</th><th>PMの権限</th><th>PMの役割呼称の例</th><th>予測型との相性</th></tr></thead>
            <tbody>
              <tr><td>ファンクショナル型(機能別組織)</td><td>部門ごとに縦割り。プロジェクトは各機能部門の業務の一部として扱われる</td><td>ほぼなし</td><td>プロジェクト調整役、パートタイムの担当者</td><td>小規模・単一部門で完結する予測型プロジェクトには機能するが、大規模な予測型プロジェクトには不向き</td></tr>
              <tr><td>ウィークマトリックス</td><td>機能別組織をベースにしつつ、プロジェクト横断の連携が生まれる</td><td>低い(調整者に近い)</td><td>プロジェクトコーディネーター、プロジェクトスケジューラー</td><td>予測型の統制(WBS・スケジュール管理)がやりづらく、権限不足が課題になりやすい</td></tr>
              <tr><td>バランスマトリックス</td><td>機能部門とプロジェクトの権限がおおむね対等</td><td>中程度</td><td>プロジェクトマネージャー</td><td>部門横断のリソースを要する予測型プロジェクトに適合しやすい</td></tr>
              <tr><td>ストロングマトリックス</td><td>専任PMが機能部門長と同格の権限を持つ</td><td>高い</td><td>プロジェクトマネージャー(専任)</td><td>大規模で厳密なベースライン管理が必要な予測型プロジェクトに適合</td></tr>
              <tr><td>プロジェクタイズド型(プロジェクト型組織)</td><td>プロジェクトのために組織全体が編成される。プロジェクト終了後にチームは解散</td><td>非常に高い(ほぼ全権)</td><td>プロジェクトマネージャー(全権)</td><td>建設・大規模インフラなど、伝統的な予測型プロジェクトの典型的な受け皿</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>試験では「PMがリソースの割り当てに関して最終決定権を持たない」「機能部門長の承認が必要」といった記述が出てきたら、それはウィーク〜バランスマトリックスを示すヒントです。逆に「PMがチームメンバーの人事評価まで行う」とあればプロジェクタイズド型を示しています。</p>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <p>組織構造とプロジェクトマネジメントの関係についてはPMI公式ライブラリの以下の論文が詳しく解説しています。</p>
          <ul>
            <li><a href="https://www.pmi.org/learning/library/pm-matrix-organizations-10000" target="_blank" rel="noopener">Project Managers Are Gaining Power within Matrix Organizations</a></li>
            <li><a href="https://www.pmi.org/learning/library/strategic-alignment-project-management-organizational-structure-10956" target="_blank" rel="noopener">Strategic Alignment of Project Management Organizational Structure</a></li>
          </ul>
        </div>

        <p>さらに、近年はチームの働き方(バーチャル型/コロケーション型)も出題論点になっています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>働き方の形態</th><th>特徴</th><th>予測型プロジェクトでの留意点</th></tr></thead>
            <tbody>
              <tr><td>コロケーション(Co-location)</td><td>チームメンバーが同一の物理的空間で作業する</td><td>コミュニケーションコストが低く、進捗の可視化やベースライン管理の合意形成がしやすい</td></tr>
              <tr><td>バーチャル(Virtual)チーム</td><td>メンバーが地理的に分散し、主にオンラインで協働する</td><td>タイムゾーン差・言語差を考慮した会議設計、ドキュメントによる正式な合意形成(変更管理・ステータス報告)がより重要になる</td></tr>
            </tbody>
          </table>
        </div>

        <h3>プロセス群とプロセス内の典型的な活動</h3>

        <p>予測型アプローチでは、プロジェクトのライフサイクルを5つの「プロセス群」として捉えます。これはPMI発行の「Process Groups: A Practice Guide」に基づく整理であり、CAPM ECOの参考文献リストにも明記されています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PROCESS_GROUPS_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">5つのプロセス群の反復的な関係</div>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>「計画」「実行」「監視・コントロール」の3つは、図のように行ったり来たりを繰り返す反復的な関係にあります。これは予測型プロジェクトであっても、計画が一度作られたら二度と変更されないという意味ではなく、変更管理プロセスを通じて継続的に見直されることを表しています。</p>
        </div>

        <p>各プロセス群の典型的な活動(Enablerが求める「activities within each process」の具体例)を整理すると次のとおりです。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>プロセス群</th><th>目的</th><th>典型的な活動の例</th></tr></thead>
            <tbody>
              <tr><td>立ち上げ(Initiating)</td><td>プロジェクトまたはフェーズを正式に承認する</td><td>プロジェクト憲章(Project Charter)の作成、ステークホルダーの特定、ステークホルダーレジスターの作成</td></tr>
              <tr><td>計画(Planning)</td><td>ゴール達成のための道筋を確定する</td><td>プロジェクトマネジメント計画の作成、スコープ定義、WBS作成、スケジュール策定、コスト見積り、品質計画、リスク計画、調達計画、コミュニケーション計画</td></tr>
              <tr><td>実行(Executing)</td><td>計画に基づき実際の作業を遂行する</td><td>プロジェクト作業の指揮・マネジメント、品質のマネジメント、チームの編成・育成、コミュニケーションの実施、ステークホルダーエンゲージメントの管理、調達の実施</td></tr>
              <tr><td>監視・コントロール(Monitoring &amp; Controlling)</td><td>進捗と計画のズレを把握し是正する</td><td>プロジェクト作業の監視、統合変更管理の実施、スコープの妥当性確認とコントロール、スケジュールのコントロール、コストのコントロール、品質のコントロール、リスクの監視</td></tr>
              <tr><td>終結(Closing)</td><td>プロジェクトまたはフェーズを正式にクローズする</td><td>契約・調達の終結、成果物の正式な引き渡し、教訓(Lessons Learned)の記録、リソースの解放</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>「立ち上げ」と「計画」を混同しやすい初学者が多いですが、判断基準はシンプルです。「プロジェクトを始めてよいという公式な承認」に関わるものは立ち上げ、「承認されたプロジェクトをどう進めるかの詳細」に関わるものは計画、と覚えると区別しやすくなります。</p>
        </div>

        <h3>さまざまなプロジェクト構成要素の違い</h3>

        <p>Task 1最後のEnablerは「プロジェクトのさまざまな構成要素(コンポーネント)の違いを区別する」ことです。初学者が特に混同しやすい4つの構成要素を整理します。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PROJECT_COMPONENTS_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">プロジェクト構成要素(憲章・計画・ベースライン・文書)の階層関係</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>構成要素</th><th>役割</th><th>具体例</th><th>承認・変更の性質</th></tr></thead>
            <tbody>
              <tr><td>プロジェクト憲章(Project Charter)</td><td>プロジェクトの存在を正式に認可する文書。PMに権限を与える</td><td>プロジェクトの目的、ハイレベルな成功基準、PMの任命</td><td>プロジェクト開始時に一度承認される。基本的に大きくは変更されない</td></tr>
              <tr><td>プロジェクトマネジメント計画(Project Management Plan)</td><td>プロジェクトをどのように実行・監視・終結するかを定義する統合文書</td><td>スコープ管理計画、スケジュール管理計画、コスト管理計画、品質管理計画などの補助計画の集合体</td><td>正式な変更管理プロセスを経て更新される</td></tr>
              <tr><td>ベースライン(Baselines)</td><td>承認された基準線。実績との比較対象となる</td><td>スコープベースライン(スコープ記述書+WBS+WBS辞書)、スケジュールベースライン、コストベースライン</td><td>承認された変更要求によってのみ更新される</td></tr>
              <tr><td>プロジェクト文書(Project Documents)</td><td>計画やベースラインには含まれないが、プロジェクト運営に必要な文書群</td><td>リスクレジスター、課題ログ(Issue Log)、ステークホルダーレジスター、変更ログ</td><td>ベースラインほど厳格な変更管理を経ずに、必要に応じて更新される</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>「プロジェクトマネジメント計画」と「プロダクト管理計画(Product Management Plan)」の違いもECOで明示的に問われる論点です。前者は「プロジェクトをどう進めるか」、後者は「完成した製品/成果物をどう管理・維持するか」を扱う点が異なります。</p>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>試験問題で「これは承認された変更管理を経ないと更新できないか?」を自問すると、ベースラインかどうかを見分けやすくなります。ベースラインはYes、プロジェクト文書は基本的にNo(比較的柔軟に更新可能)です。</p>
        </div>
      </section>

      <section id="task-2-schedule-and-plan">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 04</div>
        <h2>Task 2: プロジェクトマネジメント計画とスケジュールの理解</h2>

        <p>Task 2のEnablerは以下の6つです。</p>

        <ul>
          <li>クリティカルパス法(Critical Path Method)を適用する</li>
          <li>スケジュール差異(Schedule Variance)を計算する</li>
          <li>work breakdown structure(WBS)を説明する</li>
          <li>ワークパッケージ(Work Package)を説明する</li>
          <li>品質管理計画(Quality Management Plan)を適用する</li>
          <li>統合管理計画(Integration Management Plan)を適用する</li>
        </ul>

        <p>このセクションでは、以下の共通サンプルプロジェクトを使って一貫した具体例で解説します。</p>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p><strong>サンプルプロジェクト:</strong> 「社内タスク管理ツール導入プロジェクト」 — 社内向けタスク管理ツールを要件定義から本番リリースまで導入する、比較的小規模な予測型プロジェクト。</p>
        </div>

        <h3>Work Breakdown Structure(WBS)</h3>

        <p>WBSとは、プロジェクトのスコープ全体を、成果物(デリバラブル)を基準に階層的に分解した図です。タスクの一覧ではなく、あくまで「作成すべき成果物」を分解する点がポイントです。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_WBS_HIERARCHY_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">社内タスク管理ツール導入プロジェクトのWBS階層構造</div>
        </div>

        <h4>100%ルール</h4>

        <p>WBSの中核をなす原則が「100%ルール」です。これはWBSがプロジェクトスコープに定義された作業の100%を含み、内部・外部・中間のすべての成果物(プロジェクトマネジメント作業を含む)を漏れなく捉えなければならない、という原則です。階層のどのレベルにおいても、子要素の合計は親要素の100%と一致しなければならず、逆にスコープ外の作業を含めてもいけません。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>WBS関連用語</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>WBS(Work Breakdown Structure)</td><td>成果物を基準にスコープ全体を階層的に分解した図。100%ルールに従う</td></tr>
              <tr><td>ワークパッケージ(Work Package)</td><td>WBSの最下層の要素。見積り・スケジューリング・監視・コントロールが可能な最小単位</td></tr>
              <tr><td>WBS辞書(WBS Dictionary)</td><td>各WBS要素の詳細な説明(担当、完了基準、必要リソース等)を記載した文書</td></tr>
              <tr><td>プランニングパッケージ(Planning Package)</td><td>詳細がまだ確定していないが、100%ルールを満たすために暫定的に置く要素。詳細が判明次第ワークパッケージに発展する</td></tr>
              <tr><td>コントロールアカウント(Control Account)</td><td>WBSの特定レベルに設置される、コストとスケジュールの統合的な管理ポイント</td></tr>
              <tr><td>デコンポジション(Decomposition)</td><td>成果物をより小さく管理しやすい要素に分解していく技法</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>WBS作成時は「これ以上分解すると管理しやすくなるか?」を自問し、Noであればそこがワークパッケージの適切な粒度です。過度に細かく分解しすぎると管理コストが増大し、逆に粗すぎると進捗の可視性が失われます。</p>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <p>WBSと100%ルールについてはPMI公式ライブラリの解説記事、およびPMI発行の「Practice Standard for Work Breakdown Structures」が一次情報源です。</p>
          <ul>
            <li><a href="https://www.pmi.org/learning/library/practice-standard-work-breakdown-structures-8063" target="_blank" rel="noopener">Practice Standard for Work Breakdown Structures(第2版)解説</a></li>
          </ul>
        </div>

        <h3>クリティカルパス法(Critical Path Method, CPM)</h3>

        <p>クリティカルパス法は、プロジェクトネットワーク図(アクティビティの依存関係図)から、プロジェクト全体の所要期間を決定する最も長い経路(クリティカルパス)を求める技法です。クリティカルパス上のアクティビティが1日でも遅延すると、プロジェクト全体の完了日が遅延します。</p>

        <h4>計算の基本用語</h4>

        <div class="table-wrap">
          <table>
            <thead><tr><th>用語</th><th>略称</th><th>意味</th></tr></thead>
            <tbody>
              <tr><td>Early Start</td><td>ES</td><td>そのアクティビティを最も早く開始できる時点(順行計算=フォワードパス)</td></tr>
              <tr><td>Early Finish</td><td>EF</td><td><code>ES + 所要期間</code>。最も早く終了できる時点</td></tr>
              <tr><td>Late Finish</td><td>LF</td><td>プロジェクト全体を遅延させずに、そのアクティビティを終了できる最も遅い時点(逆行計算=バックワードパス)</td></tr>
              <tr><td>Late Start</td><td>LS</td><td><code>LF − 所要期間</code></td></tr>
              <tr><td>Total Float(トータルフロート/スラック)</td><td>TF</td><td><code>LS − ES</code>(= <code>LF − EF</code>)。そのアクティビティが遅延してもプロジェクト全体に影響を与えない余裕日数</td></tr>
              <tr><td>クリティカルパス</td><td>-</td><td><code>Total Float = 0</code>(最小)となるアクティビティが連なる、ネットワーク上で最長の経路</td></tr>
            </tbody>
          </table>
        </div>

        <h4>サンプルプロジェクトのネットワーク図</h4>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CPM_NETWORK_DIAGRAM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">サンプルプロジェクトのアクティビティネットワーク図(ハイライトがクリティカルパス)</div>
        </div>

        <p>ハイライト表示されたA→B→D→F→G→Hがクリティカルパスです。C(DB構築)とE(API開発)には余裕(フロート)があり、クリティカルパス上にはありません。</p>

        <h4>フォワードパス/バックワードパスの計算結果</h4>

        <div class="table-wrap">
          <table>
            <thead><tr><th>アクティビティ</th><th>作業内容</th><th>所要期間(日)</th><th>先行作業</th><th>ES</th><th>EF</th><th>LS</th><th>LF</th><th>Total Float</th><th>クリティカル?</th></tr></thead>
            <tbody>
              <tr><td>A</td><td>要件定義</td><td>5</td><td>-</td><td>0</td><td>5</td><td>0</td><td>5</td><td>0</td><td>Yes</td></tr>
              <tr><td>B</td><td>設計</td><td>7</td><td>A</td><td>5</td><td>12</td><td>5</td><td>12</td><td>0</td><td>Yes</td></tr>
              <tr><td>C</td><td>DB構築</td><td>4</td><td>B</td><td>12</td><td>16</td><td>18</td><td>22</td><td>6</td><td>No</td></tr>
              <tr><td>D</td><td>画面開発</td><td>10</td><td>B</td><td>12</td><td>22</td><td>12</td><td>22</td><td>0</td><td>Yes</td></tr>
              <tr><td>E</td><td>API開発</td><td>8</td><td>B</td><td>12</td><td>20</td><td>14</td><td>22</td><td>2</td><td>No</td></tr>
              <tr><td>F</td><td>結合テスト</td><td>5</td><td>C, D, E</td><td>22</td><td>27</td><td>22</td><td>27</td><td>0</td><td>Yes</td></tr>
              <tr><td>G</td><td>受入テスト</td><td>3</td><td>F</td><td>27</td><td>30</td><td>27</td><td>30</td><td>0</td><td>Yes</td></tr>
              <tr><td>H</td><td>本番移行</td><td>2</td><td>G</td><td>30</td><td>32</td><td>30</td><td>32</td><td>0</td><td>Yes</td></tr>
            </tbody>
          </table>
        </div>

        <ul>
          <li><strong>フォワードパス</strong>: 複数の先行作業がある場合、ESは先行作業のEFの<strong>最大値</strong>を採用します(例: FのESは C・D・EのEFのうち最大の22)。</li>
          <li><strong>バックワードパス</strong>: 複数の後続作業がある場合、LFは後続作業のLSの<strong>最小値</strong>を採用します(例: BのLFは C・D・EのLSのうち最小の12)。</li>
          <li>プロジェクト全体の所要期間は32日、クリティカルパスは <strong>A → B → D → F → G → H</strong>(5+7+10+5+3+2=32日)です。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>CAPM試験のクリティカルパス問題では、「複数経路が合流する地点ではESは最大値、複数経路が分岐する地点から遡るときのLFは最小値」というルールを取り違えるミスが非常に多く発生します。計算前にこの2点を必ず確認してください。また、フロートが0のアクティビティがクリティカルパス上にあるという定義も合わせて覚えておくと、ネットワーク図が複雑でも迷わず判定できます。</p>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <p>クリティカルパス法とスケジュールネットワーク分析の考え方は、CAPM ECOの参考文献にも挙げられている「Process Groups: A Practice Guide」やPMBOK(R) Guideのスケジュールマネジメント領域で体系的に解説されています。</p>
          <ul>
            <li><a href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">PMBOK(R) Guide(PMI Standard)紹介ページ</a></li>
          </ul>
        </div>

        <h3>スケジュール差異(Schedule Variance, SV)</h3>

        <p>Task 2のEnablerには「スケジュール差異を計算する」ことが明示されています。スケジュール差異はアーンドバリューマネジメント(EVM)の基本指標の一つで、計画と実績のズレを金額(または工数)で表します。</p>

        <p><code>SV = EV − PV</code></p>

        <ul>
          <li><strong>PV(Planned Value)</strong>: ある時点までに完了しているべき作業の予算価値(計画値)</li>
          <li><strong>EV(Earned Value)</strong>: ある時点までに実際に完了した作業の予算価値(出来高)</li>
        </ul>

        <div class="table-wrap">
          <table>
            <thead><tr><th>SVの値</th><th>意味</th></tr></thead>
            <tbody>
              <tr><td><code>SV &gt; 0</code>(プラス)</td><td>計画より進捗が早い(スケジュールを先行)</td></tr>
              <tr><td><code>SV = 0</code></td><td>計画どおり</td></tr>
              <tr><td><code>SV &lt; 0</code>(マイナス)</td><td>計画より進捗が遅れている</td></tr>
            </tbody>
          </table>
        </div>

        <p>EVMの詳細な計算体系(CVやSPI・CPIとの関係)は、ドメイン2 Task 3(4.2節)でまとめて解説します。</p>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>SVは金額(または工数)の単位で表現される指標であり、「あと何日遅れているか」という時間の単位そのものではない点に注意してください。時間単位でのズレを知りたい場合は、Earned Schedule(ES法)などの発展的な手法が使われますが、CAPM試験の基本範囲では<code>SV = EV − PV</code>の計算ができれば十分です。</p>
        </div>

        <h3>品質管理計画(Quality Management Plan)の適用</h3>

        <p>品質管理計画は、プロジェクトマネジメント計画の構成要素の一つで、プロジェクトの成果物や作業がどのような品質基準を満たすべきか、そしてそれをどう保証・確認するかを定義します。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_QUALITY_MANAGEMENT_PLAN" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">品質管理計画を構成する3要素(品質計画・QA・QC)</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>要素</th><th>焦点</th><th>主な活動例</th></tr></thead>
            <tbody>
              <tr><td>品質計画(Quality Planning)</td><td>どの品質基準を適用するかを事前に定義する</td><td>品質基準の特定、品質指標(メトリクス)の設定、チェックリストの準備</td></tr>
              <tr><td>品質保証(QA: Quality Assurance)</td><td>プロセスが正しく実施されているかを確認する(予防中心)</td><td>プロセス監査、標準への準拠確認、継続的プロセス改善</td></tr>
              <tr><td>品質コントロール(QC: Quality Control)</td><td>実際の成果物・作業結果を検査する(検出中心)</td><td>テスト実施、検査、統計的サンプリング、欠陥の是正</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>QA(保証)とQC(コントロール)を混同しないことが試験の頻出ポイントです。QAは「プロセスに問題がないか」を見る予防的な活動、QCは「できあがった成果物に問題がないか」を見る検出的な活動、と対比させて覚えると区別しやすくなります。サンプルプロジェクトで言えば、開発標準の順守確認がQA、結合テスト・受入テストの実施がQCに該当します。</p>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <p>品質管理の3要素(全体方針・QA・QC)についてはPMI公式ライブラリで詳しく解説されています。</p>
          <ul>
            <li><a href="https://www.pmi.org/learning/library/quality-management-9107" target="_blank" rel="noopener">Quality Management(PMI初期タスクフォースレポート)</a></li>
            <li><a href="https://www.pmi.org/learning/library/practice-three-project-quality-management-7198" target="_blank" rel="noopener">Quality in Project Management: A Practical Look at Chapter 8 of the PMBOK(R) Guide</a></li>
          </ul>
        </div>

        <h3>統合管理計画(Integration Management Plan)の適用</h3>

        <p>統合マネジメントは、プロジェクトマネジメント計画を構成するすべての補助計画(スコープ・スケジュール・コスト・品質・リソース・コミュニケーション・リスク・調達・ステークホルダー管理計画)を一つの首尾一貫した全体としてまとめ上げる、いわば「PMの司令塔」となる領域です。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_INTEGRATION_MANAGEMENT_PLAN" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">統合管理計画が束ねる9つの補助管理計画</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>統合マネジメントの主要な活動</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>プロジェクト憲章の作成</td><td>プロジェクトを正式に認可し、PMに権限を与える</td></tr>
              <tr><td>プロジェクトマネジメント計画の作成</td><td>各補助計画を整合させ、一つの実行可能な計画にまとめる</td></tr>
              <tr><td>プロジェクト作業の指揮・マネジメント</td><td>計画に基づき実際の作業を進める</td></tr>
              <tr><td>プロジェクト知識のマネジメント</td><td>既存の知識を活用し、新たな教訓を組織に還元する</td></tr>
              <tr><td>プロジェクト作業の監視</td><td>計画と実績の差異を継続的に把握する</td></tr>
              <tr><td>統合変更管理の実施</td><td>すべての変更要求を一元的に評価・承認・却下する(4章で詳述)</td></tr>
              <tr><td>プロジェクト・フェーズの終結</td><td>正式にプロジェクトを完了させる</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>統合マネジメントは「他の知識領域をつなぎ合わせる接着剤」と捉えると理解しやすくなります。例えば、スコープ変更が発生した場合、それをスケジュール・コスト・品質・リスクの各計画にどう波及させるかを一元的に管理するのが統合管理計画の役割です。単独の知識領域だけを見て変更を承認すると、他領域への影響を見落とすリスクがあります。</p>
        </div>
      </section>

      <section id="task-3-project-controls">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 05</div>
        <h2>Task 3: 予測型プロジェクトのプロジェクトコントロールの文書化</h2>

        <p>Task 3のEnablerは以下の2つです。</p>

        <ul>
          <li>予測型プロジェクトで使用されるアーティファクト(成果物・文書)を識別する</li>
          <li>コストとスケジュールの差異を計算する</li>
        </ul>

        <h3>予測型プロジェクトで使用される主なアーティファクト</h3>

        <p>予測型プロジェクトのプロジェクトコントロールでは、以下のような文書群が体系的に整備・更新されます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>アーティファクト</th><th>主な目的</th><th>更新のタイミング</th></tr></thead>
            <tbody>
              <tr><td>プロジェクト憲章</td><td>プロジェクトの公式な認可</td><td>立ち上げ時に作成、以後基本的に不変</td></tr>
              <tr><td>プロジェクトマネジメント計画(と各補助計画)</td><td>プロジェクト全体の実行方針</td><td>承認された変更要求に基づき更新</td></tr>
              <tr><td>スコープ・スケジュール・コストベースライン</td><td>実績と比較する基準線</td><td>承認された変更要求に基づき更新</td></tr>
              <tr><td>WBS・WBS辞書</td><td>スコープの階層的分解と定義</td><td>スコープ変更時に更新</td></tr>
              <tr><td>スケジュール(ネットワーク図・ガントチャート)</td><td>作業順序と期間の可視化</td><td>進捗・変更に応じて随時更新</td></tr>
              <tr><td>リスクレジスター</td><td>識別されたリスクとその対応策の一覧</td><td>リスクの識別・再評価のたびに更新</td></tr>
              <tr><td>課題ログ(Issue Log)</td><td>発生した課題とその対応状況の記録</td><td>課題の発生・解決のたびに更新</td></tr>
              <tr><td>変更ログ(Change Log)</td><td>提出された変更要求とその審査結果の記録</td><td>変更要求のたびに更新</td></tr>
              <tr><td>ステークホルダーレジスター</td><td>関係者の識別・関心・影響度の記録</td><td>新規ステークホルダー識別時に更新</td></tr>
              <tr><td>RACI(責任分担マトリックス)</td><td>誰が何に対して責任・説明責任・相談・報告の役割を持つかの整理</td><td>体制変更時に更新</td></tr>
              <tr><td>ステータスレポート(進捗報告)</td><td>現在の進捗・課題・リスクの定期報告</td><td>定期(週次・月次等)に更新</td></tr>
              <tr><td>教訓登録簿(Lessons Learned Register)</td><td>プロジェクトを通じて得られた教訓の記録</td><td>プロジェクトを通じて継続的に、終結時に総括</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>試験では「ある状況でどのアーティファクトを参照・更新すべきか」を問う設問が多く出ます。判断のコツは「これは基準(比較対象)か、それとも記録(実績・状況)か」を見分けることです。ベースラインは基準、ログ・レジスターは記録、と整理すると迷いにくくなります。</p>
        </div>

        <h3>コストとスケジュールの差異計算(EVM: Earned Value Management)</h3>

        <p>Task 3では「コストとスケジュールの差異を計算する」ことが明示的に求められています。これはアーンドバリューマネジメント(EVM)の中核となる計算です。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_EVM_RELATIONSHIP_DIAGRAM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">PV・EV・ACから導かれるEVM指標の関係</div>
        </div>

        <h4>EVMの基本3指標と主要な派生指標</h4>

        <div class="table-wrap">
          <table>
            <thead><tr><th>指標</th><th>正式名称</th><th>計算式</th><th>解釈</th></tr></thead>
            <tbody>
              <tr><td>PV</td><td>Planned Value(計画価値)</td><td>(ベースラインから算出)</td><td>ある時点までに完了しているべき作業の予算</td></tr>
              <tr><td>EV</td><td>Earned Value(出来高)</td><td>(実績から算出)</td><td>ある時点までに実際に完了した作業の予算価値</td></tr>
              <tr><td>AC</td><td>Actual Cost(実コスト)</td><td>(実績から算出)</td><td>ある時点までに実際に発生したコスト</td></tr>
              <tr><td>SV</td><td>Schedule Variance(スケジュール差異)</td><td><code>EV − PV</code></td><td>プラスなら進捗が早い、マイナスなら遅れている</td></tr>
              <tr><td>CV</td><td>Cost Variance(コスト差異)</td><td><code>EV − AC</code></td><td>プラスなら予算内、マイナスなら予算超過</td></tr>
              <tr><td>SPI</td><td>Schedule Performance Index</td><td><code>EV / PV</code></td><td>1.0以上でスケジュール効率が良い</td></tr>
              <tr><td>CPI</td><td>Cost Performance Index</td><td><code>EV / AC</code></td><td>1.0以上でコスト効率が良い</td></tr>
              <tr><td>BAC</td><td>Budget at Completion(完成時総予算)</td><td>(承認済み総予算)</td><td>プロジェクト全体の当初予算</td></tr>
              <tr><td>EAC</td><td>Estimate at Completion(完成時総コスト見積り)</td><td><code>BAC / CPI</code>(現在の効率が今後も続くと仮定する場合)</td><td>現在の傾向が続いた場合の最終コスト予測</td></tr>
              <tr><td>ETC</td><td>Estimate to Complete(残作業のコスト見積り)</td><td><code>EAC − AC</code></td><td>完了までにあと必要なコスト</td></tr>
              <tr><td>VAC</td><td>Variance at Completion(完成時差異)</td><td><code>BAC − EAC</code></td><td>最終的な予算との差異見込み</td></tr>
              <tr><td>TCPI</td><td>To-Complete Performance Index</td><td><code>(BAC − EV) / (BAC − AC)</code></td><td>残予算内で完成させるために今後必要な効率</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>CAPM ECOのTask 2・Task 3で明示的に求められているのはSVとCVの計算です。SPI・CPI・EAC・TCPIはより発展的なEVM指標ですが、これらを理解しておくとSVとCVの意味をより深く把握でき、PMP(R)など上位資格の学習にもつながります。</p>
        </div>

        <h4>サンプルプロジェクトでの計算例</h4>

        <p>サンプルプロジェクト(社内タスク管理ツール導入、総予算 BAC = 1,200万円)について、開発フェーズ半ばのステータス日時点で以下の実績が得られたとします。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>指標</th><th>値</th></tr></thead>
            <tbody>
              <tr><td>BAC(総予算)</td><td>12,000,000円</td></tr>
              <tr><td>PV(計画価値)</td><td>7,200,000円</td></tr>
              <tr><td>EV(出来高)</td><td>6,300,000円</td></tr>
              <tr><td>AC(実コスト)</td><td>7,000,000円</td></tr>
            </tbody>
          </table>
        </div>

        <p>計算結果は以下のとおりです。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>指標</th><th>計算式</th><th>結果</th><th>解釈</th></tr></thead>
            <tbody>
              <tr><td>SV</td><td><code>6,300,000 − 7,200,000</code></td><td>-900,000円</td><td>計画よりも進捗が遅れている</td></tr>
              <tr><td>CV</td><td><code>6,300,000 − 7,000,000</code></td><td>-700,000円</td><td>予算を超過している</td></tr>
              <tr><td>SPI</td><td><code>6,300,000 / 7,200,000</code></td><td>約0.875</td><td>計画に対して87.5%の速度でしか進捗していない</td></tr>
              <tr><td>CPI</td><td><code>6,300,000 / 7,000,000</code></td><td>0.90</td><td>投じた予算1円あたり0.90円分の価値しか生み出せていない</td></tr>
              <tr><td>EAC</td><td><code>12,000,000 / 0.90</code></td><td>約13,333,333円</td><td>現在の効率が続くと、当初予算を約133万円超過する見込み</td></tr>
              <tr><td>TCPI</td><td><code>(12,000,000 − 6,300,000) / (12,000,000 − 7,000,000)</code></td><td>1.14</td><td>当初予算内に収めるには、残作業を現状より高い効率(114%)で進める必要がある</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>SVとCVはどちらも「マイナスは悪い兆候」という共通ルールで解釈できます。ただし、SVは「時間軸(進捗)」、CVは「コスト軸(予算)」のどちらの問題かを表しているため、両方がマイナスの場合はスケジュールとコストの両面で早急な是正措置(corrective action)が必要と判断します。試験では、SVとCVの符号だけを見て「スケジュールが遅れている」「予算内に収まっている」を素早く判定できるようにしておくことが重要です。</p>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <p>EVMの基本式と用語定義はPMI公式ライブラリの以下の解説記事が参考になります。</p>
          <ul>
            <li><a href="https://www.pmi.org/learning/library/earned-value-management-systems-analysis-8026" target="_blank" rel="noopener">Earned Value Management Systems (EVMS)</a></li>
            <li><a href="https://www.pmi.org/learning/library/evm-cpm-evaluate-project-performance-6355" target="_blank" rel="noopener">Using EVM and CPM to Evaluate Project Performance</a></li>
            <li><a href="https://www.pmi.org/learning/library/integrating-scheduling-evm-metrics-8516" target="_blank" rel="noopener">Integrating Scheduling and Earned Value Management (EVM) Metrics</a></li>
            <li><a href="https://www.pmi.org/learning/library/make-earned-value-work-project-6001" target="_blank" rel="noopener">How to Make Earned Value Work on Your Project</a></li>
          </ul>
        </div>

        <h3>変更管理とプロジェクトコントロールの流れ</h3>

        <p>プロジェクトコントロールのアーティファクトがどのように連動して更新されるかを、変更管理の一般的な流れとして図示します。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CHANGE_CONTROL_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">課題の発見から変更管理・ベースライン更新までの流れ</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p>ベースラインは「承認された変更要求」以外の理由で更新してはいけません。進捗の遅れをそのままベースラインの日付を書き換えることでごまかす、といった行為は予測型プロジェクトの統制上の重大な違反にあたります。差異が発生した場合は、まず原因を分析し、必要であれば正式な変更要求としてCCBに諮る、という手順を徹底することがベストプラクティスです。</p>
        </div>
      </section>

      <section id="domain-2-best-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 06</div>
        <h2>ドメイン2 ベストプラクティス総まとめ</h2>

        <div class="table-wrap">
          <table>
            <thead><tr><th>領域</th><th>ベストプラクティス</th></tr></thead>
            <tbody>
              <tr><td>アプローチ選定</td><td>スコープの確定度、変更頻度、規制要件、組織構造の権限分布を確認したうえで予測型/適応型/ハイブリッドを選ぶ</td></tr>
              <tr><td>組織構造の見極め</td><td>「PMがリソースについて最終決定権を持つか」を基準に、ファンクショナル〜プロジェクタイズドのどこに位置するかを判断する</td></tr>
              <tr><td>WBS作成</td><td>100%ルールを厳守し、成果物ベースで分解する。ワークパッケージの粒度は「これ以上分解すると管理しやすくなるか」で判断する</td></tr>
              <tr><td>スケジュール管理</td><td>クリティカルパス上のアクティビティを最優先で監視し、フロートのある非クリティカルパスのアクティビティに過剰な資源を割かない</td></tr>
              <tr><td>品質管理</td><td>QA(プロセスの予防的確認)とQC(成果物の検出的検査)を明確に区別し、両方を計画段階で設計しておく</td></tr>
              <tr><td>統合管理</td><td>すべての補助計画・変更要求を一元的に評価し、他知識領域への波及影響を必ず確認してから承認する</td></tr>
              <tr><td>コントロール文書</td><td>ベースライン(基準)とログ/レジスター(記録)を区別し、ベースラインは正式な変更管理を経てのみ更新する</td></tr>
              <tr><td>EVM分析</td><td>SV・CVの符号をまず確認し、必要であればSPI・CPI・EAC・TCPIまで踏み込んで是正措置の緊急度を評価する</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="study-checklist">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 07</div>
        <h2>学習チェックリスト</h2>

        <p>以下の項目にすべて自信を持って回答できれば、ドメイン2の学習は目標水準に達しています。</p>

        <ul>
          <li>予測型アプローチと適応型アプローチの違いを、少なくとも4つの観点で説明できる</li>
          <li>ファンクショナル型からプロジェクタイズド型までの5つの組織構造と、それぞれのPM権限レベルを順に説明できる</li>
          <li>5つのプロセス群(立ち上げ・計画・実行・監視コントロール・終結)それぞれの目的と代表的な活動を説明できる</li>
          <li>プロジェクト憲章・プロジェクトマネジメント計画・ベースライン・プロジェクト文書の違いを説明できる</li>
          <li>WBSの100%ルールを説明し、ワークパッケージ・WBS辞書との関係を図示できる</li>
          <li>与えられたネットワーク図からフォワードパス・バックワードパスを計算し、クリティカルパスとフロートを特定できる</li>
          <li><code>SV = EV − PV</code>、<code>CV = EV − AC</code> を暗算レベルで計算し、符号の意味を即座に解釈できる</li>
          <li>QA(品質保証)とQC(品質コントロール)の違いを具体例つきで説明できる</li>
          <li>統合管理計画がなぜ「すべての補助計画をつなぐ接着剤」と呼ばれるかを説明できる</li>
          <li>予測型プロジェクトの主要なアーティファクト(リスクレジスター、課題ログ、変更ログ等)の目的と更新タイミングを識別できる</li>
        </ul>
      </section>

      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 08</div>
        <h2>参考文献・出典</h2>

        <div class="ref-group">
          <h3>CAPM公式情報(PMI一次情報源)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">PMI Certified Associate in Project Management (CAPM)(R) Certification 公式ページ</span><a class="ref-url" href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">https://www.pmi.org/certifications/certified-associate-capm</a></li>
            <li><span class="ref-name">PMI Certified Associate in Project Management (CAPM)(R) Examination Content Outline(2023 Exam Update, PDF)</span><a class="ref-url" href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf</a></li>
            <li><span class="ref-name">PMBOK(R) Guide(PMI Standard)紹介ページ</span><a class="ref-url" href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">https://www.pmi.org/standards/pmbok</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>組織構造・プロジェクトマネジメント基礎(PMI公式ライブラリ)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Project Managers Are Gaining Power within Matrix Organizations</span><a class="ref-url" href="https://www.pmi.org/learning/library/pm-matrix-organizations-10000" target="_blank" rel="noopener">https://www.pmi.org/learning/library/pm-matrix-organizations-10000</a></li>
            <li><span class="ref-name">Strategic Alignment of Project Management Organizational Structure</span><a class="ref-url" href="https://www.pmi.org/learning/library/strategic-alignment-project-management-organizational-structure-10956" target="_blank" rel="noopener">https://www.pmi.org/learning/library/strategic-alignment-project-management-organizational-structure-10956</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>WBS・スケジュールマネジメント(PMI公式ライブラリ)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Practice Standard for Work Breakdown Structures(第2版)解説</span><a class="ref-url" href="https://www.pmi.org/learning/library/practice-standard-work-breakdown-structures-8063" target="_blank" rel="noopener">https://www.pmi.org/learning/library/practice-standard-work-breakdown-structures-8063</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>品質マネジメント(PMI公式ライブラリ)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Quality Management(PMI初期タスクフォースレポート)</span><a class="ref-url" href="https://www.pmi.org/learning/library/quality-management-9107" target="_blank" rel="noopener">https://www.pmi.org/learning/library/quality-management-9107</a></li>
            <li><span class="ref-name">Quality in Project Management: A Practical Look at Chapter 8 of the PMBOK(R) Guide</span><a class="ref-url" href="https://www.pmi.org/learning/library/practice-three-project-quality-management-7198" target="_blank" rel="noopener">https://www.pmi.org/learning/library/practice-three-project-quality-management-7198</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>アーンドバリューマネジメント(EVM)・コスト/スケジュール差異(PMI公式ライブラリ)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Earned Value Management Systems (EVMS)</span><a class="ref-url" href="https://www.pmi.org/learning/library/earned-value-management-systems-analysis-8026" target="_blank" rel="noopener">https://www.pmi.org/learning/library/earned-value-management-systems-analysis-8026</a></li>
            <li><span class="ref-name">Using EVM and CPM to Evaluate Project Performance</span><a class="ref-url" href="https://www.pmi.org/learning/library/evm-cpm-evaluate-project-performance-6355" target="_blank" rel="noopener">https://www.pmi.org/learning/library/evm-cpm-evaluate-project-performance-6355</a></li>
            <li><span class="ref-name">Integrating Scheduling and Earned Value Management (EVM) Metrics</span><a class="ref-url" href="https://www.pmi.org/learning/library/integrating-scheduling-evm-metrics-8516" target="_blank" rel="noopener">https://www.pmi.org/learning/library/integrating-scheduling-evm-metrics-8516</a></li>
            <li><span class="ref-name">How to Make Earned Value Work on Your Project</span><a class="ref-url" href="https://www.pmi.org/learning/library/make-earned-value-work-project-6001" target="_blank" rel="noopener">https://www.pmi.org/learning/library/make-earned-value-work-project-6001</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>補足情報源(第三者による解説記事・参考用)</h3>
          <p>以下は理解を補うための第三者解説記事です。一次情報源であるPMI公式資料と齟齬がある場合は、必ずPMI公式資料を優先してください。</p>
          <ul class="ref-list">
            <li><span class="ref-name">Organizational Structures(オープン教育リソース: Strategic Project Management)</span><a class="ref-url" href="https://ecampusontario.pressbooks.pub/hrstrategicprojectmanagement/chapter/2-2-structures/" target="_blank" rel="noopener">https://ecampusontario.pressbooks.pub/hrstrategicprojectmanagement/chapter/2-2-structures/</a></li>
            <li><span class="ref-name">Project Organizational Structure | Smartsheet</span><a class="ref-url" href="https://www.smartsheet.com/content/project-management-organization" target="_blank" rel="noopener">https://www.smartsheet.com/content/project-management-organization</a></li>
            <li><span class="ref-name">Project Management Organization: The Basics | Planview</span><a class="ref-url" href="https://blog.planview.com/project-management-organization-the-basics/" target="_blank" rel="noopener">https://blog.planview.com/project-management-organization-the-basics/</a></li>
            <li><span class="ref-name">What is a Work Breakdown Structure (WBS) | workbreakdownstructure.com</span><a class="ref-url" href="https://www.workbreakdownstructure.com/" target="_blank" rel="noopener">https://www.workbreakdownstructure.com/</a></li>
            <li><span class="ref-name">Schedule Variance: What Is It &amp; How Do I Calculate It? | ProjectManager.com</span><a class="ref-url" href="https://www.projectmanager.com/blog/schedule-variance-what-is-it-how-do-i-calculate-it" target="_blank" rel="noopener">https://www.projectmanager.com/blog/schedule-variance-what-is-it-how-do-i-calculate-it</a></li>
            <li><span class="ref-name">Project Quality Management According to the PMBOK | ProjectEngineer.net</span><a class="ref-url" href="https://www.projectengineer.net/project-quality-management-according-to-the-pmbok/" target="_blank" rel="noopener">https://www.projectengineer.net/project-quality-management-according-to-the-pmbok/</a></li>
            <li><span class="ref-name">Project Integration Management According to the PMBOK | ProjectEngineer.net</span><a class="ref-url" href="https://www.projectengineer.net/project-integration-management-according-to-the-pmbok/" target="_blank" rel="noopener">https://www.projectengineer.net/project-integration-management-according-to-the-pmbok/</a></li>
            <li><span class="ref-name">The PMBOK's Project Management Documents | ProjectEngineer.net</span><a class="ref-url" href="https://www.projectengineer.net/the-pmboks-project-management-documents/" target="_blank" rel="noopener">https://www.projectengineer.net/the-pmboks-project-management-documents/</a></li>
          </ul>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>本ガイドはCAPM Exam Content Outline(2023 Exam Update)の内容に基づいて作成されています。PMIは試験内容を定期的に見直すため、受験前には必ず上記URLから最新版のECOをダウンロードし、内容の変更がないか確認してください。</p>
        </div>
      </section>

      <footer>
        CAPM(R)およびPMI(R)は Project Management Institute, Inc. の登録商標です。本ガイドは学習支援を目的とした非公式の解説資料であり、PMIによる公式な認定・承認を受けたものではありません。
      </footer>
    </main>
  </div>
</div>
</template>

<style scoped>
/* ===================== Layout & Variables ===================== */
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
  text-decoration: none;
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
  line-height: 1.6;
}

.disclaimer-box :deep(.iconify) {
  margin-right: 6px;
  vertical-align: -2px;
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
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p {
  margin: 0 0 18px;
}

ul, ol {
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

td strong, th strong {
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

/* ===================== Reference list ===================== */
.ref-group {
  margin-bottom: 28px;
}

.ref-group h3,
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
  html {
    scroll-behavior: auto;
  }

  .sidebar {
    transition: none;
  }
}
</style>
