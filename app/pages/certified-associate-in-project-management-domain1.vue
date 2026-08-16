<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "exam-overview",
  "domain1-structure",
  "task1-lifecycle",
  "task2-planning",
  "task3-roles",
  "task4-strategy-execution",
  "task5-problem-solving",
  "study-best-practices",
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
  title: "CAPM® ドメイン1: PM基礎と主要概念 完全ガイド | Project Management Fundamentals and Core Concepts",
  description: "PMI公式CAPM Exam Content Outlineに基づく、ドメイン1(PM基礎と主要概念・配点36%)の初学者向け解説ガイド。",
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

const DIAGRAM_DOMAIN_WEIGHT = `flowchart LR
A["CAPM試験 135採点問題"] --> B["ドメイン1 PM基礎と主要概念 36%"]
A --> C["ドメイン2 予測型計画ベース手法 17%"]
A --> D["ドメイン3 アジャイルフレームワーク手法 20%"]
A --> E["ドメイン4 ビジネス分析フレームワーク 27%"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`;

const DIAGRAM_PPP_HIERARCHY = `flowchart TB
S["組織の戦略目標"] --> P["ポートフォリオ Portfolio"]
P --> PG1["プログラムA Program"]
P --> PJ1["単独プロジェクトX プログラムに属さない"]
PG1 --> PJ2["プロジェクトA-1"]
PG1 --> PJ3["プロジェクトA-2"]
PG1 --> OPS["関連する定常業務"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P hub;
class S,PG1,PJ1,PJ2,PJ3,OPS box;`;

const DIAGRAM_PREDICTIVE_ADAPTIVE = `flowchart LR
A["予測型 Predictive"] --- B["ハイブリッド型 Hybrid"] --- C["適応型 Adaptive"]
A2["要件が安定 明確"] -.- A
C2["要件が不確実 変化前提"] -.- C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,C box;
class B hub;
class A2,C2 box;`;

const DIAGRAM_ETHICS_VALUES = `flowchart TB
COE["PMI Code of Ethics and Professional Conduct"] --> R1["責任 Responsibility"]
COE --> R2["尊重 Respect"]
COE --> R3["公正 Fairness"]
COE --> R4["誠実 Honesty"]
R1 --> A1["向上目標基準"]
R1 --> M1["必須基準"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class COE hub;
class R1,R2,R3,R4,A1,M1 box;`;

const DIAGRAM_RISK_REGISTER_FLOW = `flowchart LR
A["リスクの特定"] --> B["定性的リスク分析 発生確率×影響度"]
B --> C["リスク対応計画の策定"]
C --> D["リスク登録簿への記録"]
D --> E["リスクの監視 コントロール"]
E -->|"新規リスク発見"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D,E done;`;

const DIAGRAM_CLOSURE_FLOW = `flowchart LR
A["最終成果物の検証 受入"] --> B["契約の終結 調達がある場合"]
B --> C["教訓レッスンズラーンドの収集"]
C --> D["資源の解放"]
D --> E["運用部門等への引き継ぎ 移行"]
E --> F["行政上の終結 文書のアーカイブ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F done;`;

const DIAGRAM_PM_ROLES = `flowchart TB
PM["プロジェクトマネージャー"] --- R1["開始者"]
PM --- R2["交渉者"]
PM --- R3["傾聴者"]
PM --- R4["コーチ"]
PM --- R5["実務メンバー"]
PM --- R6["ファシリテーター"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PM hub;
class R1,R2,R3,R4,R5,R6 box;`;

const DIAGRAM_INITIATION_FLOW = `flowchart LR
A["ビジネスケースの作成"] --> B["プロジェクト憲章の作成 承認"]
B --> C["ベネフィットマネジメント計画の策定"]
C --> D["プロジェクトのキックオフ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D done;`;
</script>

<template>
  <div class="capm-domain1-page">
    <button
      id="sidebarToggle"
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen"
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
            <div class="brand-title">CAPM® ドメイン1 完全ガイド</div>
            <div class="brand-subtitle">PM基礎と主要概念</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li>
            <a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" @click="closeSidebar">
              <Icon name="tabler:chart-pie" aria-hidden="true" />試験の全体像
            </a>
          </li>
          <li>
            <a href="#domain1-structure" :class="{ active: activeId === 'domain1-structure' }" @click="closeSidebar">
              <Icon name="tabler:building-bank" aria-hidden="true" />ドメイン1の構造
            </a>
          </li>
          <li>
            <a href="#task1-lifecycle" :class="{ active: activeId === 'task1-lifecycle' }" @click="closeSidebar">
              <Icon name="tabler:route" aria-hidden="true" />Task1: ライフサイクルとプロセス
            </a>
          </li>
          <li>
            <a href="#task2-planning" :class="{ active: activeId === 'task2-planning' }" @click="closeSidebar">
              <Icon name="tabler:timeline" aria-hidden="true" />Task2: PM計画の理解
            </a>
          </li>
          <li>
            <a href="#task3-roles" :class="{ active: activeId === 'task3-roles' }" @click="closeSidebar">
              <Icon name="tabler:users" aria-hidden="true" />Task3: 役割と責任
            </a>
          </li>
          <li>
            <a href="#task4-strategy-execution" :class="{ active: activeId === 'task4-strategy-execution' }" @click="closeSidebar">
              <Icon name="tabler:git-branch" aria-hidden="true" />Task4: 戦略の実行
            </a>
          </li>
          <li>
            <a href="#task5-problem-solving" :class="{ active: activeId === 'task5-problem-solving' }" @click="closeSidebar">
              <Icon name="tabler:puzzle" aria-hidden="true" />Task5: 問題解決の技法
            </a>
          </li>
          <li>
            <a href="#study-best-practices" :class="{ active: activeId === 'study-best-practices' }" @click="closeSidebar">
              <Icon name="tabler:map-2" aria-hidden="true" />学習・試験対策
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
          <div class="hero-eyebrow">
            <Icon name="tabler:award" aria-hidden="true" />PMI公式 CAPM Exam Content Outlineに基づく学習ガイド
          </div>
          <h1>CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念</h1>
          <p class="hero-lede">
            本ガイドは、PMI(Project Management Institute)が公開する CAPM® Exam Content Outline(ECO)に基づき、CAPM試験のドメイン1(配点36%・4ドメイン中最大)を初学者向けにステップバイステップで解説するものです。各項目には根拠となる出典URLを付記しています。
          </p>

          <div class="stat-row">
            <div class="stat-card" data-testid="stat-card"><div class="stat-number">150問</div><div class="stat-label">うち135問が採点対象(残り15問はプレテスト)</div></div>
            <div class="stat-card" data-testid="stat-card"><div class="stat-number">180分</div><div class="stat-label">75問終了時点で10分の休憩あり</div></div>
            <div class="stat-card" data-testid="stat-card"><div class="stat-number">11言語</div><div class="stat-label">日本語を含む受験言語数</div></div>
            <div class="stat-card" data-testid="stat-card"><div class="stat-number">36%</div><div class="stat-label">ドメイン1の配点(4ドメイン中最大)</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            本ガイドはPMI公式資料に基づき作成した学習補助教材であり、PMI公式の認定教材そのものではありません。最新の出題範囲・様式は必ず<a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI公式サイト</a>でご確認ください。
          </div>
        </div>

        <!-- ===================== 01. Exam Overview ===================== -->
        <section id="exam-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 01</div>
          <h2>CAPM試験の全体像</h2>

          <h3>0.1 試験概要</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>出題数</td><td>150問(採点対象135問 + プレテスト(非採点)15問)</td></tr>
                <tr><td>試験時間</td><td>180分(3時間)、75問終了時点で10分の休憩あり</td></tr>
                <tr><td>受験言語</td><td>英語・アラビア語・ブラジルポルトガル語・フランス語・ドイツ語・イタリア語・日本語・スペイン語・韓国語・中国語(簡体字)・中国語(繁体字)の11言語構成</td></tr>
                <tr><td>出題形式</td><td>多肢選択、Enhanced Matching(ドラッグ&amp;ドロップ)、Hot Spot/Hot Area、アニメーション動画、コミックストリップ</td></tr>
                <tr><td>受験資格</td><td>高校卒業相当の学歴(GEDまたはそれに準ずるもの) + 23時間以上のプロジェクトマネジメント教育</td></tr>
                <tr><td>有効期間</td><td>申請承認から1年以内に最大3回まで受験可能</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI公式 CAPM Certification ページ</a></li>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(公式PDF)</a></li>
            </ul>
          </div>

          <h3>0.2 4ドメインの配点</h3>

          <p>CAPM試験は以下の4ドメインから構成され、<strong>ドメイン1が全体の36%と最大の配点</strong>を占めます。試験全体(135採点問題)のうち、およそ48〜49問がドメイン1からの出題と見積もられます。</p>

          <div class="domain-grid">
            <div class="domain-card d1" data-testid="domain-card"><div class="domain-pct">36%</div><div class="domain-name">ドメイン1: PM基礎と主要概念</div></div>
            <div class="domain-card d2" data-testid="domain-card"><div class="domain-pct">17%</div><div class="domain-name">ドメイン2: 予測型・計画ベース手法</div></div>
            <div class="domain-card d3" data-testid="domain-card"><div class="domain-pct">20%</div><div class="domain-name">ドメイン3: アジャイルフレームワーク・手法</div></div>
            <div class="domain-card d4" data-testid="domain-card"><div class="domain-pct">27%</div><div class="domain-name">ドメイン4: ビジネス分析フレームワーク</div></div>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_DOMAIN_WEIGHT" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">CAPM試験の4ドメイン配点構成</div>
          </div>

          <div class="callout source" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI公式 CAPM Certification ページ「Associated exam content」</a></li>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.5</a></li>
            </ul>
          </div>

          <h3>0.3 公式参考文献リスト</h3>

          <p>PMIはCAPM ECOのすべての設問が、以下の書籍のうち最低2冊に根拠を持つとしています(全冊の通読は必須ではありませんが、レビューが推奨されています)。</p>

          <ul>
            <li><em>A Guide to the Project Management Body of Knowledge(PMBOK® Guide)– Seventh Edition</em></li>
            <li><em>Process Groups: A Practice Guide</em>(2022)</li>
            <li><em>The PMI Guide to Business Analysis</em>(2017)</li>
            <li><em>Business Analysis for Practitioners: A Practice Guide – Second Edition</em>(2024)</li>
            <li><em>Agile Practice Guide</em>(2017)</li>
            <li><em>The Project Management Answer Book</em>(Second Edition)</li>
            <li><em>Effective Project Management: Traditional, Agile, Extreme, Hybrid</em>(8th Edition)</li>
          </ul>

          <div class="callout source" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.4</a></li>
              <li><a href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">PMBOK® Guide 公式標準ページ</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 02. Domain 1 Structure ===================== -->
        <section id="domain1-structure">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
          <h2>ドメイン1の構造</h2>

          <p>ECOでは、各ドメインは「Task(責任)」と「Enabler(具体的な作業例)」という2階層で構成されています。ドメイン1には以下の5つのTaskが定義されています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>Task</th><th>概要</th></tr></thead>
              <tbody>
                <tr><td>Task 1</td><td>プロジェクトのさまざまなライフサイクルとプロセスの理解を証明する</td></tr>
                <tr><td>Task 2</td><td>プロジェクトマネジメント計画の理解を証明する</td></tr>
                <tr><td>Task 3</td><td>プロジェクトの役割と責任の理解を証明する</td></tr>
                <tr><td>Task 4</td><td>計画された戦略・フレームワーク(コミュニケーション、リスク等)の実行方法を決定する</td></tr>
                <tr><td>Task 5</td><td>一般的な問題解決のツールと技法の理解を証明する</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <p>以下、各Taskをそれぞれの Enabler(具体的出題ポイント)ごとに詳細解説します。</p>
        </section>

        <!-- ===================== 03. Task 1: Lifecycle and Processes ===================== -->
        <section id="task1-lifecycle">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 03</div>
          <h2>Task 1: プロジェクトのライフサイクルとプロセスの理解</h2>

          <h3>1.1 プロジェクト・プログラム・ポートフォリオの違い</h3>

          <p>初学者がまず押さえるべきなのが、この3つの階層構造です。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>用語</th><th>定義</th><th>スコープ</th><th>成功の基準</th><th>期間</th></tr></thead>
              <tbody>
                <tr><td><strong>プロジェクト(Project)</strong></td><td>独自のプロダクト・サービス・所産を生み出すために実施される有期的な業務</td><td>段階的詳細化されるプロジェクトスコープ</td><td>スコープ・スケジュール・コストどおりに完了したか(成果物ベース)</td><td>有期的(明確な開始と終了)</td></tr>
                <tr><td><strong>プログラム(Program)</strong></td><td>個別に管理しては得られない便益を得るために、相互に関連する複数のプロジェクト・サブプログラム・プログラム活動を協調的にマネジメントすること</td><td>構成要素であるプロジェクト群のスコープを包含</td><td>便益(ベネフィット)が実現されたか</td><td>プロジェクトより長期になりやすい</td></tr>
                <tr><td><strong>ポートフォリオ(Portfolio)</strong></td><td>戦略的目標を達成するために、プロジェクト・プログラム・サブポートフォリオ・定常業務をグループとしてまとめ一元的にマネジメントする集合体</td><td>組織の戦略目標に応じて変化する組織的スコープ</td><td>組織戦略とどれだけ整合しているか</td><td>組織戦略のサイクルに連動、継続的</td></tr>
              </tbody>
            </table>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_PPP_HIERARCHY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">組織戦略からプロジェクトへの階層構造(ポートフォリオ・プログラム・プロジェクト)</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>「ポートフォリオ内のプロジェクトやプログラムは、互いに依存関係がなくてもよい」という点を誤解しないこと。</strong>ポートフォリオは戦略上の「まとまり」であって、プロジェクト間の技術的関連は前提としない。</li>
              <li><strong>試験では「複数の関連プロジェクトを束ねて便益を得たい」という記述が出たらプログラム、「組織全体の投資判断・優先順位付け」の話が出たらポートフォリオと読み替える練習をする。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>1.2 プロジェクトと定常業務(オペレーション)の違い</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>プロジェクト</th><th>定常業務(オペレーション)</th></tr></thead>
              <tbody>
                <tr><td>期間</td><td>有期的(開始と終了が明確)</td><td>継続的・反復的</td></tr>
                <tr><td>アウトプット</td><td>独自の(一意の)成果物・サービス・所産</td><td>反復可能な同一の成果物・サービス</td></tr>
                <tr><td>目的</td><td>変化を生み出し、新たな価値を創出する</td><td>既存の価値をくり返し提供・維持する</td></tr>
                <tr><td>例</td><td>新製品の開発、社内システムの刷新</td><td>完成した製品の量産ライン運用、日常の顧客サポート業務</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>「毎日/毎週くり返される」「同じ手順の反復」というキーワードが出たら定常業務、「一度きり」「独自の成果物」というキーワードが出たらプロジェクトと判断する。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>1.3 予測型(Predictive)と適応型(Adaptive)アプローチの違い</h3>

          <p>PMI公式サイトでは、プロジェクトマネジメントのアプローチを予測型・適応型・ハイブリッド型の3つに整理しています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>アプローチ</th><th>特徴</th><th>適した状況</th></tr></thead>
              <tbody>
                <tr><td><strong>予測型(Predictive)</strong></td><td>初期段階で要件を詳細に計画し、フェーズを順に完了させていく伝統的モデル</td><td>プロジェクトおよびプロダクトの要件が明確かつ安定している場合</td></tr>
                <tr><td><strong>適応型(Adaptive)</strong></td><td>反復的・漸進的アプローチを採用し、変化を前提として柔軟に対応する</td><td>要件の不確実性・変動性が高く、進行中に変化が見込まれる場合</td></tr>
                <tr><td><strong>ハイブリッド型(Hybrid)</strong></td><td>予測型と適応型の要素を組み合わせる</td><td>プロジェクトの一部要素は確定的、一部要素は変化しやすいなど、確実性の度合いが混在する場合</td></tr>
              </tbody>
            </table>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_PREDICTIVE_ADAPTIVE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">予測型・ハイブリッド型・適応型アプローチの連続体</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>PMIはこの3分類を「二者択一」ではなく「連続体(スペクトラム)」として説明している点に注意。</strong>どちらかに完全に振り切れるプロジェクトは少なく、多くは中間(ハイブリッド)に位置する。</li>
              <li><strong>試験では、組織構造(バーチャル/コロケーション/マトリクス/階層型)がどのアプローチに適しているかを判断させる設問が出る(ドメイン2・3にも関連)。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/about/what-is-project-management" target="_blank" rel="noopener">PMI公式「What Is Project Management」ページ</a></li>
            </ul>
          </div>

          <h3>1.4 課題・リスク・前提条件・制約条件の違い(通称IRAC)</h3>

          <p>初学者が混同しやすい4つの概念です。「すでに起きているか、これから起きるかもしれないか」という時間軸で区別すると理解しやすくなります。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>用語</th><th>定義</th><th>発生タイミング</th><th>記録する文書</th><th>具体例</th></tr></thead>
              <tbody>
                <tr><td><strong>課題(Issue)</strong></td><td>現在すでに発生しており、対応が必要な事象や状況</td><td>発生済み</td><td>課題ログ(Issue Log)</td><td>主要メンバーが急に離脱した</td></tr>
                <tr><td><strong>リスク(Risk)</strong></td><td>発生すればプラスまたはマイナスの影響を与える、不確実な事象や状態</td><td>未発生(不確実)</td><td>リスク登録簿(Risk Register)</td><td>為替変動により調達コストが増加するかもしれない</td></tr>
                <tr><td><strong>前提条件(Assumption)</strong></td><td>証明せずに真実・現実的・確実であるとみなす要因</td><td>計画時に仮定</td><td>前提条件ログ/スコープ記述書</td><td>主要ベンダーが契約どおり資材を納品すると仮定する</td></tr>
                <tr><td><strong>制約条件(Constraint)</strong></td><td>プロジェクトの実行方法を制限する要因</td><td>計画時に既知</td><td>スコープ記述書、プロジェクト憲章</td><td>予算上限、法規制、納期</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>前提条件は「検証されていない仮説」であり、誤っていた場合はリスクに転化しうる点を理解しておく。</strong>前提条件の妥当性確認はリスクマネジメントの入力の一つ。</li>
              <li><strong>試験のシナリオ問題では、「まだ起きていない・確率的」→リスク、「もう起きた・対応が必要」→課題、と機械的に切り分けると得点しやすい。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>1.5 プロジェクトスコープのレビュー/批評</h3>

          <p>スコープ記述書(Scope Statement)やWBS(作業分解構成図)をレビューする際に確認すべき観点です。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>チェック観点</th><th>確認内容</th></tr></thead>
              <tbody>
                <tr><td>完全性</td><td>必要な成果物・作業がすべて含まれているか</td></tr>
                <tr><td>明確性</td><td>除外事項(スコープ外)が明記されているか</td></tr>
                <tr><td>整合性</td><td>プロジェクト目標・ビジネスケースと整合しているか</td></tr>
                <tr><td>測定可能性</td><td>受入基準が具体的で検証可能か</td></tr>
                <tr><td>スコープ・クリープの兆候</td><td>変更管理プロセスを経ずに要求が追加されていないか</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>「ゴールドプレーティング(Gold Plating)」— 顧客が求めていない過剰な機能を無償で追加する行為 — はスコープ管理上の典型的なアンチパターンとして試験で問われやすい。</strong></li>
              <li><strong>スコープの批評的レビューは、PMだけでなくスポンサーやステークホルダーを交えて行うことが望ましい。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>1.6 PMIの倫理・職業行動規範(Code of Ethics and Professional Conduct)の適用</h3>

          <p>CAPM/PMP等のPMI認定資格保持者は、PMI Code of Ethics and Professional Conduct の遵守を求められます。規範は4つの中核的価値観で構成されています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>価値観</th><th>内容の要旨</th></tr></thead>
              <tbody>
                <tr><td><strong>責任(Responsibility)</strong></td><td>自らの決定・行動・結果に対して当事者意識を持つこと</td></tr>
                <tr><td><strong>尊重(Respect)</strong></td><td>自分自身、他者、および割り当てられた資源に対して高い評価を示すこと</td></tr>
                <tr><td><strong>公正(Fairness)</strong></td><td>私心のない、客観的な意思決定を行い、利益相反を適切に扱うこと</td></tr>
                <tr><td><strong>誠実(Honesty)</strong></td><td>真実を語り、誠実に行動すること</td></tr>
              </tbody>
            </table>
          </div>

          <p>規範はさらに「向上目標基準(Aspirational Standards)」と「必須基準(Mandatory Standards)」の2層に分かれます。向上目標基準は測定が難しくても専門家として努めるべき行動、必須基準は違反すると倫理審査の対象となる明確な要求事項です。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_ETHICS_VALUES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">PMI Code of Ethics and Professional Conductの4つの中核的価値観</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>試験ではシナリオ形式で「あなたならどう行動するか」を問う設問が頻出する。</strong>判断の基準は「個人的な利害」ではなく「4つの価値観、特に公正・誠実」に照らして最も倫理的な行動を選ぶこと。</li>
              <li><strong>利益相反(Conflict of Interest)が疑われる場合は、まず開示(disclose)することが原則。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf" target="_blank" rel="noopener">PMI Code of Ethics and Professional Conduct(公式PDF)</a></li>
              <li><a href="https://www.pmi.org/about/ethics/guidelines" target="_blank" rel="noopener">PMI Ethics Guidelines</a></li>
            </ul>
          </div>

          <h3>1.7 プロジェクトが変化の手段であること</h3>

          <p>プロジェクトは単なるタスクの集合ではなく、組織が現状(As-Is)から将来の望ましい状態(To-Be)へ移行するための「変化の手段(vehicle for change)」であるという考え方です。プロジェクトの成果物は、それ自体が目的ではなく、ビジネス価値(ベネフィット)を実現するための手段として位置づけられます。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>プロジェクトの成功を「成果物の完成」だけで判断せず、「意図したビジネス価値・便益が実現されたか」まで含めて捉える視点は、ドメイン1全体を通じて繰り返し問われる考え方。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 04. Task 2: PM Planning ===================== -->
        <section id="task2-planning">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 04</div>
          <h2>Task 2: プロジェクトマネジメント計画の理解</h2>

          <h3>2.1 コスト・品質・リスク・スケジュール等の目的と重要性</h3>

          <p>プロジェクトマネジメント計画は複数のサブ計画・ベースラインで構成されます。それぞれの目的を理解することが重要です。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>構成要素</th><th>目的</th></tr></thead>
              <tbody>
                <tr><td>スケジュールベースライン</td><td>承認されたスケジュールの基準線を定め、進捗の差異分析(スケジュール差異)を可能にする</td></tr>
                <tr><td>コストベースライン</td><td>承認された予算の時系列配分を定め、コスト差異分析・EVM(アーンドバリューマネジメント)の基礎とする</td></tr>
                <tr><td>品質マネジメント計画</td><td>品質基準・品質保証活動・品質管理活動を定義し、成果物が要求を満たすことを保証する</td></tr>
                <tr><td>リスクマネジメント計画</td><td>リスクの特定・分析・対応・監視の方法とプロセスを定義する</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>ベースラインは「変更管理プロセスを経なければ変更できない基準」であり、実績との比較(差異分析)の土台になるという性質を理解しておく。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>2.2 プロジェクトマネジメント計画 vs プロダクトマネジメント計画</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>プロジェクトマネジメント計画</th><th>プロダクトマネジメント計画</th></tr></thead>
              <tbody>
                <tr><td>対象期間</td><td>プロジェクトの有期的な期間に限定</td><td>プロダクトのライフサイクル全体(プロジェクト終了後も継続)</td></tr>
                <tr><td>主な作成・所有者</td><td>プロジェクトマネージャー</td><td>プロダクトマネージャー/プロダクトオーナー</td></tr>
                <tr><td>内容</td><td>スコープ・スケジュール・コスト・品質・資源・コミュニケーション・リスク・調達・ステークホルダー等のマネジメント方法</td><td>プロダクトビジョン、ロードマップ、機能要件、リリース計画</td></tr>
                <tr><td>焦点</td><td>「どうやってこの成果物を作り上げるか」</td><td>「このプロダクトが市場・利用者にどう価値を提供し続けるか」</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>1つのプロダクトに対して複数のプロジェクト(バージョンアップ等)が連続的に実施されることがあるため、プロダクト管理計画はプロジェクト管理計画より長い時間軸を持つ、という関係性を押さえる。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>2.3 マイルストーンとタスク期間の違い</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>用語</th><th>定義</th><th>期間</th><th>例</th></tr></thead>
              <tbody>
                <tr><td><strong>マイルストーン(Milestone)</strong></td><td>プロジェクト上の重要な時点やイベントを示すもの</td><td>期間ゼロ(1時点)</td><td>「要件定義完了」「フェーズゲート承認」</td></tr>
                <tr><td><strong>タスク期間(Task Duration)</strong></td><td>アクティビティの開始から終了までに要する実働期間</td><td>一定の長さを持つ(例: 5日間)</td><td>「詳細設計:10営業日」</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>ガントチャート上でマイルストーンは通常「ひし形(◆)」、タスクは「バー」で表現される、という視覚表現の違いも実務・試験双方で頻出。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>2.4 プロジェクトにおけるリソースの数と種類の決定</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>リソース種別</th><th>内容</th><th>決定に使う技法</th></tr></thead>
              <tbody>
                <tr><td>人的資源</td><td>必要なスキル・役割・人数</td><td>資源分解構成図(RBS)、責任分担マトリクス(RAM)</td></tr>
                <tr><td>物的資源</td><td>設備、資材、施設、ソフトウェアライセンス等</td><td>ボトムアップ見積り、類推見積り</td></tr>
                <tr><td>資源カレンダー</td><td>各資源が利用可能な期間・稼働率</td><td>資源カレンダーの作成・可用性確認</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>資源の「数」だけでなく「専門性(種類)」の両方を、スコープ・WBSに基づき見積もることが求められる。</strong>過小見積りはスケジュール遅延、過大見積りはコスト超過のリスクを生む。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>2.5 リスク登録簿(Risk Register)の活用</h3>

          <p>リスク登録簿は、特定されたリスクとその対応状況を一元管理する文書です。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>Risk ID</th><th>リスクの説明</th><th>カテゴリ</th><th>発生確率</th><th>影響度</th><th>優先度</th><th>対応戦略</th><th>責任者</th><th>ステータス</th></tr></thead>
              <tbody>
                <tr><td>R-001</td><td>主要ベンダーの資材納品遅延</td><td>調達</td><td>中</td><td>高</td><td>高</td><td>軽減(代替ベンダーの事前選定)</td><td>調達責任者</td><td>監視中</td></tr>
                <tr><td>R-002</td><td>主要開発者の離脱</td><td>人的資源</td><td>低</td><td>高</td><td>中</td><td>転嫁/軽減(ナレッジ共有の徹底)</td><td>PM</td><td>監視中</td></tr>
                <tr><td>R-003</td><td>為替変動によるコスト増</td><td>外部環境</td><td>中</td><td>中</td><td>中</td><td>受容(予備費で対応)</td><td>スポンサー</td><td>オープン</td></tr>
              </tbody>
            </table>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_RISK_REGISTER_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">リスク登録簿を用いたリスクマネジメントの循環プロセス</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>リスク登録簿は一度作って終わりではなく、プロジェクトを通じて継続的に更新される「生きた文書(living document)」であることを理解する。</strong></li>
              <li><strong>リスク対応戦略の基本形(脅威に対して):回避・転嫁・軽減・受容/(好機に対して):活用・共有・強化・受容、という対応語彙を覚えておくと試験で有利。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>2.6 ステークホルダー登録簿(Stakeholder Register)の活用</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>ステークホルダー</th><th>役割</th><th>関心度</th><th>影響力</th><th>分類</th><th>エンゲージメント戦略</th></tr></thead>
              <tbody>
                <tr><td>プロジェクトスポンサー</td><td>資金提供・意思決定</td><td>高</td><td>高</td><td>主要な意思決定者</td><td>密接に管理する</td></tr>
                <tr><td>エンドユーザー部門長</td><td>業務要件の提供</td><td>高</td><td>中</td><td>満足させておく</td><td>定期的に情報提供・意見聴取</td></tr>
                <tr><td>法務部門</td><td>コンプライアンス確認</td><td>低</td><td>高</td><td>満足させておく</td><td>必要時に関与を依頼</td></tr>
                <tr><td>一般利用者</td><td>システムの利用</td><td>高</td><td>低</td><td>常に情報提供する</td><td>ニュースレター等で周知</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>「関心度(Interest)×影響力(Power)」のグリッド分析でステークホルダーを4象限に分類し、それぞれに適したコミュニケーション頻度・深さを設計する、という考え方はドメイン4(ビジネス分析)とも密接に関連する。</strong></li>
              <li><strong>ステークホルダー登録簿は機密情報(個人の政治的立場等)を含みうるため、配布範囲に注意する。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>2.7 プロジェクトの終結と移行</h3>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_CLOSURE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">プロジェクト終結から移行までの流れ</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>プロジェクト終結は「成果物ができたら自動的に終わる」ものではなく、正式な受入・契約終結・教訓の記録・引き継ぎという一連の手続きを伴う点を理解する。</strong></li>
              <li><strong>教訓(Lessons Learned)は終結時にまとめて実施するのではなく、プロジェクトを通じて継続的に収集し、組織のプロセス資産として蓄積することが望ましい。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 05. Task 3: Roles and Responsibilities ===================== -->
        <section id="task3-roles">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 05</div>
          <h2>Task 3: プロジェクトの役割と責任の理解</h2>

          <h3>3.1 プロジェクトマネージャーとプロジェクトスポンサーの役割比較</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>役割</th><th>プロジェクトマネージャー(PM)</th><th>プロジェクトスポンサー</th></tr></thead>
              <tbody>
                <tr><td>主な責任</td><td>日々の計画・実行・監視・終結のマネジメント</td><td>資金提供、意思決定権限の行使、プロジェクト憲章の承認</td></tr>
                <tr><td>権限の源泉</td><td>スポンサーから委任された権限</td><td>組織内の経営層としての権限</td></tr>
                <tr><td>焦点</td><td>プロジェクトの実行と成果物の完成</td><td>戦略との整合性、投資対効果、経営層とのブリッジ</td></tr>
                <tr><td>エスカレーション対応</td><td>一次対応(チーム内で解決を試みる)</td><td>PMの権限を超える意思決定・障害の解消</td></tr>
              </tbody>
            </table>
          </div>

          <h3>3.2 プロジェクトチームとプロジェクトスポンサーの役割比較</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>役割</th><th>プロジェクトチーム</th><th>プロジェクトスポンサー</th></tr></thead>
              <tbody>
                <tr><td>主な責任</td><td>成果物の作成、専門知識の提供、作業の実行</td><td>戦略的方向性の提示、プロジェクトの擁護(アドボケイト)</td></tr>
                <tr><td>関与の頻度</td><td>日常的・継続的</td><td>節目(マイルストーン、意思決定ポイント)ごと</td></tr>
                <tr><td>立場</td><td>実行者</td><td>後援者・意思決定者</td></tr>
              </tbody>
            </table>
          </div>

          <h3>3.3 プロジェクトマネージャーが担う多様な役割</h3>

          <p>CAPM ECOでは、PMが状況に応じて以下のような複数の役割を演じることが明示されています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>役割</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td><strong>開始者(Initiator)</strong></td><td>プロジェクトやフェーズの立ち上げを主導する</td></tr>
                <tr><td><strong>交渉者(Negotiator)</strong></td><td>資源配分やスコープ調整などで関係者間の合意形成を図る</td></tr>
                <tr><td><strong>傾聴者(Listener)</strong></td><td>チームやステークホルダーの懸念・意見を積極的に聴取する</td></tr>
                <tr><td><strong>コーチ(Coach)</strong></td><td>チームメンバーの成長・能力開発を支援する</td></tr>
                <tr><td><strong>実務メンバー(Working Member)</strong></td><td>状況によっては自らも作業タスクを実施する</td></tr>
                <tr><td><strong>ファシリテーター(Facilitator)</strong></td><td>会議や意思決定プロセスを円滑に進行させる</td></tr>
              </tbody>
            </table>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_PM_ROLES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">プロジェクトマネージャーが担う6つの役割</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>PMの役割は固定的な「管理者」だけではなく、状況に応じて柔軟に切り替える「マルチロール」であるという理解が試験でも重視される。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>3.4 リーダーシップとマネジメントの違い</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>リーダーシップ(Leadership)</th><th>マネジメント(Management)</th></tr></thead>
              <tbody>
                <tr><td>焦点</td><td>ビジョンの提示、動機づけ、変革の推進</td><td>計画、組織化、実行の統制、効率性の追求</td></tr>
                <tr><td>時間軸</td><td>中長期的な方向性</td><td>短期的・日常的な運用</td></tr>
                <tr><td>対人関係</td><td>人を鼓舞し、共感を得る</td><td>業務プロセスを管理・調整する</td></tr>
                <tr><td>典型的な問い</td><td>「なぜ・どこへ向かうのか」</td><td>「どのように・いつまでに実行するか」</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>両者は対立概念ではなく補完関係にある。</strong>優れたPMは状況に応じてリーダーシップとマネジメントのスタイルを使い分ける必要がある、という視点が問われる。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>3.5 感情知能(EQ: Emotional Intelligence)とプロジェクトマネジメントへの影響</h3>

          <p>感情知能とは、自分自身や他者の感情を認識し、適切に管理・活用する能力です。一般的に以下の5要素で構成されるとされます。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>要素</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>自己認識(Self-awareness)</td><td>自分の感情・強み・弱みを正確に把握する力</td></tr>
                <tr><td>自己統制(Self-regulation)</td><td>衝動的な感情をコントロールし、適切に対応する力</td></tr>
                <tr><td>動機づけ(Motivation)</td><td>目標達成に向けて内発的に努力し続ける力</td></tr>
                <tr><td>共感(Empathy)</td><td>他者の感情や立場を理解する力</td></tr>
                <tr><td>社会的スキル(Social Skill)</td><td>人間関係を構築・維持し、円滑なコミュニケーションを図る力</td></tr>
              </tbody>
            </table>
          </div>

          <h4>プロジェクトマネジメントへの影響</h4>
          <ul>
            <li>チーム内のコンフリクト(対立)を早期に察知し、感情的なこじれを防ぐ。</li>
            <li>ステークホルダーとの信頼関係構築、交渉における相手の立場理解に役立つ。</li>
            <li>ストレスの高い局面(納期逼迫、予算超過など)でも冷静な意思決定を維持しやすくする。</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>EQはIQ(知能指数)と対比されることが多いが、CAPM試験ではEQが対人関係マネジメント・コンフリクトマネジメントの土台として位置づけられている点を押さえておく。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 06. Task 4: Executing Planned Strategies ===================== -->
        <section id="task4-strategy-execution">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 06</div>
          <h2>Task 4: 計画された戦略・フレームワークの実行方法の決定</h2>

          <h3>4.1 計画された戦略・フレームワークへの適切な対応例</h3>

          <p>プロジェクトでは、コミュニケーションマネジメント計画やリスクマネジメント計画など、あらかじめ合意されたフレームワークに沿って対応することが基本です。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>状況</th><th>参照すべき計画・フレームワーク</th><th>対応例</th></tr></thead>
              <tbody>
                <tr><td>スケジュールが遅延し始めた</td><td>スケジュールマネジメント計画、変更管理プロセス</td><td>あらかじめ定義された差異許容範囲(スレッショルド)と照らして対応レベルを判断する</td></tr>
                <tr><td>リスクが顕在化した</td><td>リスクマネジメント計画、リスク登録簿</td><td>事前に策定した対応戦略(回避・転嫁・軽減・受容)を実行する</td></tr>
                <tr><td>ステークホルダー間で認識の齟齬が生じた</td><td>コミュニケーションマネジメント計画</td><td>定義済みの報告ライン・頻度・チャネルに従って情報共有する</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>「その場の思いつき」で対応するのではなく、事前に承認された計画・フレームワークに立ち返って行動することが、プロジェクトマネジメントにおける一貫性と説明責任(アカウンタビリティ)を担保する。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>4.2 プロジェクト立上げとベネフィットプランニング</h3>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_INITIATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中…</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">プロジェクト立上げからベネフィットプランニングまでの流れ</div>
          </div>

          <p>プロジェクト立上げ(Initiation)では、単に「何を作るか」だけでなく、「どのようなビジネス価値・便益(ベネフィット)を得るために実施するのか」を明確化することが重要です。ベネフィットマネジメント計画は、期待される便益・実現の測定方法・実現のタイミング(プロジェクト完了後になることも多い)を定義します。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>便益の実現はプロジェクト完了時点ではなく、成果物が実際に運用されて初めて確認できる場合が多い(例:新システム稼働後の業務効率向上は、稼働後数か月経ってから測定される)。</strong>この時間差を理解しておく。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 07. Task 5: Problem-Solving Tools ===================== -->
        <section id="task5-problem-solving">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:puzzle" aria-hidden="true" />SECTION 07</div>
          <h2>Task 5: 一般的な問題解決ツールと技法の理解</h2>

          <h3>5.1 会議の効果性の評価</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>良い会議の特徴</th><th>効果性の低い会議の特徴</th></tr></thead>
              <tbody>
                <tr><td>明確な目的・アジェンダが事前共有されている</td><td>目的が曖昧で、何のための会議か不明確</td></tr>
                <tr><td>必要な参加者のみが招集されている</td><td>無関係な参加者が多く、時間を浪費する</td></tr>
                <tr><td>決定事項・アクションアイテムが記録され担当者が明確</td><td>議論が発散し、結論やネクストアクションが残らない</td></tr>
                <tr><td>時間内に終了する(タイムボックス)</td><td>時間超過が常態化している</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>会議の目的を「情報共有」「意思決定」「問題解決」「ブレインストーミング」のいずれかに明確化してから招集すると、目的とアウトプットのずれを防げる。</strong></li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>

          <h3>5.2 フォーカスグループ、スタンドアップミーティング、ブレインストーミングの目的</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>技法</th><th>目的</th><th>形式</th><th>主な利用場面</th></tr></thead>
              <tbody>
                <tr><td><strong>フォーカスグループ(Focus Group)</strong></td><td>事前に選定した参加者から、製品・要件・サービスに関する定性的なフィードバックを収集する</td><td>モデレーターが進行する構造化された議論</td><td>要件収集、ユーザーニーズの深掘り(ドメイン4のビジネス分析とも関連)</td></tr>
                <tr><td><strong>スタンドアップミーティング(Standup Meeting)</strong></td><td>チームメンバー間で進捗・障害を短時間で同期する</td><td>「昨日やったこと・今日やること・障害」を簡潔に共有(多くはアジャイルの日次イベント)</td><td>アジャイル/適応型プロジェクトの日次同期</td></tr>
                <tr><td><strong>ブレインストーミング(Brainstorming)</strong></td><td>短時間で多様なアイデアを幅広く発散的に出し合う</td><td>批判を保留し、量を重視してアイデアを出す</td><td>リスクの特定、問題解決の初期段階でのアイデア創出</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>それぞれの技法は「発散(アイデアを広げる)」か「収束(合意形成・意思決定)」のどちらの局面に向いているかを意識して使い分ける。</strong>ブレインストーミングは発散、フォーカスグループは深掘り(収束寄りの定性分析)に近い。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline p.7</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 08. Study Best Practices ===================== -->
        <section id="study-best-practices">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 08</div>
          <h2>ドメイン1 学習・試験対策のベストプラクティス</h2>

          <div class="table-wrap">
            <table>
              <thead><tr><th>ポイント</th><th>解説</th></tr></thead>
              <tbody>
                <tr><td>配点比率を意識した学習配分</td><td>ドメイン1は全体の36%(4ドメイン中最大)を占めるため、学習初期にここへ最も多くの時間を割く価値がある</td></tr>
                <tr><td>用語の「対」で覚える</td><td>プロジェクトvs定常業務、リーダーシップvsマネジメント、課題vsリスクなど、CAPMは対比構造で出題されやすい。ペアで暗記すると得点効率が上がる</td></tr>
                <tr><td>PMI公式の定義を優先する</td><td>一般的な業界用語と、PMI公式定義(PMBOK® Guide、ECO)にニュアンスの差がある場合、試験ではPMI公式定義が正解になる</td></tr>
                <tr><td>シナリオ問題に慣れる</td><td>CAPMは単純暗記問題だけでなく、状況を読んで適切な行動を選ばせる設問(ドラッグ&amp;ドロップ、コミックストリップ、アニメーション動画を含む)が出題される。読解力を鍛える練習をする</td></tr>
                <tr><td>PMI倫理規範を丸暗記ではなく理解する</td><td>「責任・尊重・公正・誠実」の4価値観は、単語の暗記よりも「なぜその行動が正しいのか」を説明できるレベルまで理解しておくと応用が利く</td></tr>
                <tr><td>公式参考文献を辞書的に使う</td><td>全冊通読が難しい場合でも、PMBOK® Guide 第7版の「12の原則」と「8つのパフォーマンス領域」だけは目を通しておくと、ドメイン1の土台理解に直結する</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ===================== 09. References ===================== -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 09</div>
          <h2>参考文献・出典(References)</h2>

          <div class="table-wrap">
            <table>
              <thead><tr><th>No.</th><th>出典</th><th>URL</th></tr></thead>
              <tbody>
                <tr><td>[1]</td><td>PMI公式 CAPM® Certification ページ(試験概要・配点・受験パス)</td><td><a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">https://www.pmi.org/certifications/certified-associate-capm</a></td></tr>
                <tr><td>[2]</td><td>CAPM® Exam Content Outline(ECO, 2023 Exam Update, 公式PDF)</td><td><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf</a></td></tr>
                <tr><td>[3]</td><td>PMI Code of Ethics and Professional Conduct(公式PDF)</td><td><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf</a></td></tr>
                <tr><td>[4]</td><td>PMI Ethics Guidelines(倫理審査プロセス等)</td><td><a href="https://www.pmi.org/about/ethics/guidelines" target="_blank" rel="noopener">https://www.pmi.org/about/ethics/guidelines</a></td></tr>
                <tr><td>[5]</td><td>PMI公式「What Is Project Management」ページ(予測型・適応型・ハイブリッド型の定義)</td><td><a href="https://www.pmi.org/about/what-is-project-management" target="_blank" rel="noopener">https://www.pmi.org/about/what-is-project-management</a></td></tr>
                <tr><td>[6]</td><td>PMBOK® Guide 公式標準ページ</td><td><a href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">https://www.pmi.org/standards/pmbok</a></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          CAPM®、PMI®、PMBOK®は Project Management Institute, Inc. の登録商標です。本ガイドは学習支援を目的とした非公式資料であり、PMI公式の見解を代表するものではありません。
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

.sidebar-nav a :deep(svg),
.sidebar-nav a :deep(i) {
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

.sidebar-nav a.active :deep(svg),
.sidebar-nav a.active :deep(i) {
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

.hero-eyebrow :deep(svg),
.hero-eyebrow :deep(i) {
  font-size: 17px;
}

h1 {
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

section:first-of-type {
  margin-top: 0;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
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

.section-eyebrow :deep(svg),
.section-eyebrow :deep(i) {
  font-size: 16px;
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

p {
  margin: 0 0 18px;
}

ul,
ol {
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

.domain-card.d1 {
  --d-color: var(--color-indigo);
}

.domain-card.d2 {
  --d-color: var(--color-forest);
}

.domain-card.d3 {
  --d-color: var(--color-gold);
}

.domain-card.d4 {
  --d-color: var(--color-plum);
}

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

.callout-title :deep(svg),
.callout-title :deep(i) {
  font-size: 16px;
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

.mermaid-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
}

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 24px;
  text-align: center;
}

.diagram-card .diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 14px;
  text-align: center;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }

  .sidebar {
    transform: translateX(-100%);
    /* 画面外のリンクがキーボードフォーカスを受け取らないよう visibility も落とす */
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

  h1 {
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
  .sidebar {
    transition: none;
  }
}
</style>
