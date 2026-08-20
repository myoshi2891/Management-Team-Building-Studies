<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { MERMAID_THEME_VARIABLES } from "~/utils/mermaid-theme";

const TOC_IDS = [
  "about-this-guide",
  "exam-overview",
  "eco-2026-update",
  "what-is-domain-people",
  "task-1-common-vision",
  "task-2-manage-conflicts",
  "task-3-lead-team",
  "task-4-engage-stakeholders",
  "task-5-align-expectations",
  "task-6-manage-expectations",
  "task-7-knowledge-transfer",
  "task-8-plan-communication",
  "cross-task-summary",
  "exam-tips",
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
  title: "PMP® Domain I: People 完全攻略ガイド | 初学者向けステップバイステップ解説",
  description: "PMI公式Examination Content Outline(ECO)2026年7月改定版に基づき、PMP試験Domain I: Peopleの8Taskを初学者向けに解説する学習ガイドです。",
});

const DIAGRAM_DOMAIN_OVERVIEW = `flowchart TD
D["Domain I: People (33%)"] --> T1["Task 1 共通ビジョンの醸成"]
D --> T2["Task 2 コンフリクトのマネジメント"]
D --> T3["Task 3 プロジェクトチームのリード"]
D --> T4["Task 4 ステークホルダーのエンゲージメント"]
D --> T5["Task 5 期待値の整合"]
D --> T6["Task 6 期待値のマネジメント"]
D --> T7["Task 7 知識移転の推進"]
D --> T8["Task 8 コミュニケーションの計画"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class D hub;
class T1,T2,T3,T4,T5,T6,T7,T8 box;`;

const DIAGRAM_CONFLICT_FLOW = `flowchart LR
P["原則の周知徹底(発生前に実施)"] --> A["コンフリクトの発生"]
G["グラウンドルールの維持・是正(継続)"] --> A
A --> B["発生源の特定"]
B --> C["背景・状況の分析"]
C --> D["解決戦略の選択"]
D --> E["合意した解決策の実行"]
E --> F["フォローアップ"]
F --> H["再発防止"]
H -.->|"グラウンドルールへ反映"| G

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P,G hub;
class A,B,C,D,E,F box;
class H done;`;

const DIAGRAM_STAKEHOLDER_CYCLE = `flowchart TD
A["ステークホルダーの特定"] --> B["分析(影響力・関心度)"]
B --> C["エンゲージメント戦略の立案"]
C --> D["コミュニケーションの実行"]
D --> E["期待値のモニタリング"]
E --> F["満足度の確認・対応"]
F --> B

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;`;

const DIAGRAM_KNOWLEDGE_FLOW = `flowchart LR
A["プロジェクトに重要な知識の特定"] --> B["知識の収集"]
B --> C["形式知への変換"]
C --> D["知識移転を促す環境づくり"]
D --> E["組織のナレッジベースへ格納"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D box;
class E done;`;

const DIAGRAM_COMMS_FLOW = `flowchart TD
A["コミュニケーション戦略の定義"] --> B["伝達方法の選択"]
B --> C["Push型"]
B --> D["Pull型"]
B --> E["Interactive型"]
C --> F["フィードバックループの確立"]
D --> F
E --> F
F --> G["レポーティング・ガバナンスへの反映"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;
class G done;`;
</script>

<template>
  <div class="layout">
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
      <Icon name="tabler:menu-2" />
    </button>

    <aside id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">PMP® Domain I: People</div>
          <div class="brand-subtitle">完全攻略ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li class="nav-group-label">はじめに</li>
        <li>
          <a href="#about-this-guide" :class="{ active: activeId === 'about-this-guide' }" :aria-current="activeId === 'about-this-guide' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:info-circle" />このガイドについて
          </a>
        </li>
        <li>
          <a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" :aria-current="activeId === 'exam-overview' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:list-check" />試験の全体像
          </a>
        </li>
        <li>
          <a href="#eco-2026-update" :class="{ active: activeId === 'eco-2026-update' }" :aria-current="activeId === 'eco-2026-update' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:refresh" />2026年改定のポイント
          </a>
        </li>
        <li>
          <a href="#what-is-domain-people" :class="{ active: activeId === 'what-is-domain-people' }" :aria-current="activeId === 'what-is-domain-people' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:users" />Domain Iとは何か
          </a>
        </li>

        <li class="nav-group-label">Task別解説</li>
        <li>
          <a href="#task-1-common-vision" :class="{ active: activeId === 'task-1-common-vision' }" :aria-current="activeId === 'task-1-common-vision' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:flag-3" />Task 1: 共通ビジョン
          </a>
        </li>
        <li>
          <a href="#task-2-manage-conflicts" :class="{ active: activeId === 'task-2-manage-conflicts' }" :aria-current="activeId === 'task-2-manage-conflicts' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:swords" />Task 2: コンフリクト
          </a>
        </li>
        <li>
          <a href="#task-3-lead-team" :class="{ active: activeId === 'task-3-lead-team' }" :aria-current="activeId === 'task-3-lead-team' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:crown" />Task 3: チームのリード
          </a>
        </li>
        <li>
          <a href="#task-4-engage-stakeholders" :class="{ active: activeId === 'task-4-engage-stakeholders' }" :aria-current="activeId === 'task-4-engage-stakeholders' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:affiliate" />Task 4: エンゲージメント
          </a>
        </li>
        <li>
          <a href="#task-5-align-expectations" :class="{ active: activeId === 'task-5-align-expectations' }" :aria-current="activeId === 'task-5-align-expectations' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:arrows-join" />Task 5: 期待値の整合
          </a>
        </li>
        <li>
          <a href="#task-6-manage-expectations" :class="{ active: activeId === 'task-6-manage-expectations' }" :aria-current="activeId === 'task-6-manage-expectations' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:target-arrow" />Task 6: 期待値のマネジメント
          </a>
        </li>
        <li>
          <a href="#task-7-knowledge-transfer" :class="{ active: activeId === 'task-7-knowledge-transfer' }" :aria-current="activeId === 'task-7-knowledge-transfer' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:bulb" />Task 7: 知識移転
          </a>
        </li>
        <li>
          <a href="#task-8-plan-communication" :class="{ active: activeId === 'task-8-plan-communication' }" :aria-current="activeId === 'task-8-plan-communication' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:message-circle" />Task 8: コミュニケーション
          </a>
        </li>

        <li class="nav-group-label">まとめ</li>
        <li>
          <a href="#cross-task-summary" :class="{ active: activeId === 'cross-task-summary' }" :aria-current="activeId === 'cross-task-summary' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:table" />横断ベストプラクティス
          </a>
        </li>
        <li>
          <a href="#exam-tips" :class="{ active: activeId === 'exam-tips' }" :aria-current="activeId === 'exam-tips' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:checklist" />試験対策のコツ
          </a>
        </li>
        <li>
          <a href="#references" :class="{ active: activeId === 'references' }" :aria-current="activeId === 'references' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:link" />参考文献・出典
          </a>
        </li>
      </ul>
    </aside>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:certificate" />PMI公式 ECO 2026年7月改定版 準拠</div>
        <h1>PMP® Domain I: People 完全攻略ガイド</h1>
        <p class="hero-lede">
          本ガイドは、PMI(Project Management Institute)が公開する<strong>PMP® Certification Exam Content Outline(ECO)2026年7月改定版</strong>を一次情報源として、Domain I: People(第I領域:人)を初学者向けに体系化した学習資料です。各Task(タスク)・Enabler(実務行動例)の内容を丁寧に解説し、実務およびPMP試験対策の両面で使えるベストプラクティスを、根拠となる出典URLとともに整理しています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">33%</div><div class="stat-label">Domain I: Peopleの出題比率</div></div>
          <div class="stat-card"><div class="stat-number">8</div><div class="stat-label">Domain I: Peopleを構成するTask数</div></div>
          <div class="stat-card"><div class="stat-number">180問</div><div class="stat-label">総問題数(240分)</div></div>
          <div class="stat-card"><div class="stat-number">2026年7月</div><div class="stat-label">ECO最新改定</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          本ガイドはPMI公式のECO(2026年7月改定版)を主要な一次情報源とし、周辺分野についてはPMI公式ライブラリおよび信頼性の高い二次情報源を参照して作成した学習補助資料です。PMIは特定の学習教材・参考書を公式に推奨・保証しておらず、本ガイドも合格を保証するものではありません。最新かつ正確な情報は、必ずPMI公式サイト(<a href="https://www.pmi.org/" target="_blank" rel="noopener">pmi.org</a>)でご確認ください。
        </div>
      </div>

      <!-- ===================== 01. About This Guide ===================== -->
      <section id="about-this-guide">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:info-circle" />SECTION 01</div>
        <h2>このガイドについて</h2>

        <ul>
          <li><strong>対象読者:</strong> PMP資格取得を目指す初学者、プロジェクトマネジメント未経験〜浅い経験者</li>
          <li><strong>前提知識:</strong> 不要(専門用語は初出時に説明を付与)</li>
          <li><strong>表記方針:</strong> 日本語を主体としつつ、PMI公式の英語術語(Task名・Enabler名・フレームワーク名など)はそのまま残しています。PMP試験は受験時に選択した言語で表示され、必要に応じて英語の原文も併せて確認できるため、英語術語に慣れておくと訳語の揺れに戸惑わずに済みます。</li>
          <li><strong>図解方針:</strong> ASCIIアートは使用せず、フローチャートはすべて Mermaid 記法、比較・整理情報はすべて Markdown表 で表現しています。</li>
        </ul>
      </section>

      <!-- ===================== 02. PMP Exam Overview ===================== -->
      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 02</div>
        <h2>PMP試験の全体像</h2>

        <p>PMP試験は、PMIが実施するグローバル資格試験で、ジョブタスク分析(Job Task Analysis, JTA)に基づいて実際のプロジェクトマネージャーの業務内容から出題内容が設計されています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>総問題数</td><td>180問(うち採点対象外のプリテスト問題10問を含む)</td></tr>
              <tr><td>採点対象問題数</td><td>170問</td></tr>
              <tr><td>試験時間</td><td>240分(4時間)</td></tr>
              <tr><td>休憩</td><td>10分間の休憩が2回(ケーススタディ区間の後、独立設問区間の中間)</td></tr>
              <tr><td>受験形式</td><td>テストセンター(CBT)またはオンライン監督試験(OPT)</td></tr>
              <tr><td>再受験</td><td>1年間の受験資格期間内に最大3回まで受験可能</td></tr>
              <tr><td>認定維持</td><td>3年ごとに60 PDU(専門能力開発ユニット)の取得と更新料の支払いが必要</td></tr>
            </tbody>
          </table>
        </div>

        <p>出題領域(ドメイン)は3つに分かれており、それぞれの出題比率が明確に定められています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>ドメイン</th><th>出題比率</th></tr></thead>
            <tbody>
              <tr><td>I. People(人)</td><td>33%</td></tr>
              <tr><td>II. Process(プロセス)</td><td>41%</td></tr>
              <tr><td>III. Business Environment(ビジネス環境)</td><td>26%</td></tr>
            </tbody>
          </table>
        </div>

        <p>また、開発アプローチの観点では、予測型(ウォーターフォール型)アプローチに関する設問がおよそ40%、残りの60%がアジャイル型・ハイブリッド型アプローチに関する設問という構成になっており、特定のドメインが特定のアプローチに偏っているわけではない点に注意が必要です。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
            <li><a href="https://www.pmi.org/certifications/project-management-pmp" target="_blank" rel="noopener">PMP Certification | PMI</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 03. 2026 ECO Revision ===================== -->
      <section id="eco-2026-update">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" />SECTION 03</div>
        <h2>2026年7月改定のポイント</h2>

        <p>PMP試験のExamination Content Outline(ECO)は2026年7月に大幅改定されました。旧版(2021年版)を学習した経験がある方、または他の教材で学習中の方は、以下の変更点に注意してください。</p>

        <ul>
          <li><strong>ドメイン比率の変更:</strong> People 42%→<strong>33%</strong>、Process 50%→<strong>41%</strong>、Business Environment 8%→<strong>26%</strong>(Business Environmentの比重が大幅増加)</li>
          <li><strong>Taskの再構成:</strong> Domain I: Peopleは旧版の14Taskから<strong>8Task</strong>へ再編。「Plan and manage communication(コミュニケーションの計画とマネジメント)」がProcessドメインからPeopleドメインへ移動し、統合された</li>
          <li><strong>新しい出題形式の追加:</strong> Case or Scenario(詳細なシナリオ・図表を提示し複数設問に答える形式)、Enhanced Matching(画像・図表を用いたマッチング)、Graphic-Based Questions(図表を読み解く形式)が新設</li>
          <li><strong>AIとサステナビリティの反映:</strong> JTAの入力として、AI(人工知能)やサステナビリティといった近年の業界トレンドが明示的に反映されている</li>
          <li><strong>PMBOK® Guideとの関係の明確化:</strong> ECOはPMBOK® Guideとは別物であり、特定の教材・単一の参考書に基づいて出題されるものではないことが明記されている。ECOは「実際にプロジェクトを率いる人材が行う重要な業務(Task)」を定義したものであり、PMBOK® Guideは「原則・パフォーマンスドメイン・プロセス」を体系化した知識体系である</li>
        </ul>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 04. What Is Domain I: People ===================== -->
      <section id="what-is-domain-people">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" />SECTION 04</div>
        <h2>Domain I: Peopleとは何か</h2>

        <p>ECOでは、試験の構造を <strong>Domain(領域)→ Task(タスク)→ Enabler(実務行動例)</strong> の3階層で定義しています。</p>

        <ul>
          <li><strong>Domain:</strong> プロジェクトマネジメントの実践に不可欠な、ハイレベルな知識領域</li>
          <li><strong>Task:</strong> そのドメイン内でプロジェクトマネージャーが担う基本的な責任</li>
          <li><strong>Enabler:</strong> そのTaskに含まれる業務内容を示す具体例(網羅的リストではなく代表例)</li>
        </ul>

        <p>Domain I: Peopleは、試験全体の33%を占める領域であり、「人・チーム・ステークホルダーとどう向き合うか」という、プロジェクトマネージャーのリーダーシップとソフトスキルを問う領域です。8つのTaskで構成されています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DOMAIN_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">Domain I: Peopleを構成する8つのTask</div>
        </div>

        <p>Task 1〜3は主に「チーム内部」への働きかけ、Task 4〜6は「ステークホルダーとの関係性」、Task 7〜8は「情報・知識の流通」に関わるTaskとして整理すると理解しやすくなります。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 05. Task 1: Develop a Common Vision ===================== -->
      <section id="task-1-common-vision">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 05</div>
        <h2>Task 1: 共通ビジョンの醸成 (Develop a common vision)</h2>

        <h3>概要</h3>
        <p>プロジェクトの目的・目指す姿について、主要なステークホルダーの間で共通認識を作り、それを維持し続けるTaskです。ビジョンが共有されていないプロジェクトでは、チームメンバーがそれぞれ異なる方向に努力してしまい、手戻りや対立の温床になります。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>主要ステークホルダーとの共有ビジョンの醸成</td><td>キックオフ等でビジョンを共同構築し、全員が「自分ごと」として捉えられるようにする</td></tr>
              <tr><td>共有ビジョンの浸透</td><td>会議・レポート・日々のコミュニケーションを通じてビジョンを繰り返し伝える</td></tr>
              <tr><td>ビジョンの鮮度維持</td><td>環境変化に応じてビジョンを見直し、陳腐化させない</td></tr>
              <tr><td>ビジョン誤解の根本原因分析</td><td>認識のズレが生じた際に、状況を分解して根本原因を突き止める</td></tr>
            </tbody>
          </table>
        </div>

        <h3>ステップバイステップ解説</h3>
        <ol class="step-list">
          <li>
            <div class="step-num">1</div>
            <div class="step-body">
              <div class="step-title" data-testid="step-tag">ビジョンを言語化する</div>
              <div class="step-desc">プロジェクト憲章(Project Charter)やビジネスケースをもとに、「なぜこのプロジェクトを行うのか」「成功した状態はどのようなものか」を短い言葉で表現する</div>
            </div>
          </li>
          <li>
            <div class="step-num">2</div>
            <div class="step-body">
              <div class="step-title" data-testid="step-tag">主要ステークホルダーと共同構築する</div>
              <div class="step-desc">一方的に伝えるのではなく、キックオフミーティングやワークショップでステークホルダーの意見を取り入れながらビジョンを練り上げる</div>
            </div>
          </li>
          <li>
            <div class="step-num">3</div>
            <div class="step-body">
              <div class="step-title" data-testid="step-tag">反復的に発信する</div>
              <div class="step-desc">一度伝えただけでは浸透しない。定例会議、ニュースレター、ダッシュボードなど複数のチャネルで繰り返し伝える</div>
            </div>
          </li>
          <li>
            <div class="step-num">4</div>
            <div class="step-body">
              <div class="step-title" data-testid="step-tag">定点観測する</div>
              <div class="step-desc">プロジェクトの状況やスコープが変化した際、ビジョンが現実と乖離していないか定期的に確認する</div>
            </div>
          </li>
          <li>
            <div class="step-num">5</div>
            <div class="step-body">
              <div class="step-title" data-testid="step-tag">ズレが起きたら分解して原因分析する</div>
              <div class="step-desc">チームやステークホルダーの言動にビジョンとの不一致が見られた場合、感情的に対応せず、状況を要素分解して根本原因(情報不足か、優先順位の対立か、単なる誤解か)を特定する</div>
            </div>
          </li>
        </ol>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li>ビジョンは「何を作るか」だけでなく「なぜそれに価値があるか」を含めて言語化する。PMIの調査では、プロジェクトの成功を測る指標が、従来のスコープ・予算・スケジュールという伝統的な物差しから、ステークホルダーにとっての価値創出やアウトカムの達成という、より広い視点へ再定義されつつあることが示されている</li>
            <li>ビジョンの共有は一度きりのイベントではなく、プロジェクトライフサイクル全体を通じた継続的な活動として計画する</li>
            <li>ビジョンのズレを検知したら、誰が悪いかではなく「なぜそのズレが生じたか」という構造的な原因に焦点を当てる</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 06. Task 2: Manage Conflicts ===================== -->
      <section id="task-2-manage-conflicts">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:swords" />SECTION 06</div>
        <h2>Task 2: コンフリクトのマネジメント (Manage conflicts)</h2>

        <h3>概要</h3>
        <p>プロジェクトチームやステークホルダー間で発生する意見の対立(コンフリクト)を、発生源の特定から解決、再発防止までマネジメントするTaskです。コンフリクトそのものは悪ではなく、放置・不適切な対処が問題であるという前提に立って学習することが重要です。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>コンフリクトの発生源の特定</td><td>何が対立の火種になっているかを把握する</td></tr>
              <tr><td>コンフリクトの背景・状況分析</td><td>表面的な言い争いの奥にある利害関係を分析する</td></tr>
              <tr><td>合意した解決戦略の実行</td><td>状況に応じた解決アプローチを選び、実行する</td></tr>
              <tr><td>チーム・外部ステークホルダーへの原則周知</td><td>コンフリクトマネジメントの考え方をあらかじめ共有しておく</td></tr>
              <tr><td>グラウンドルール遵守環境の整備</td><td>チームの行動規範(グラウンドルール)が守られる土壌を作る</td></tr>
              <tr><td>グラウンドルール違反の是正</td><td>違反が起きた際に適切に対処し、修正する</td></tr>
            </tbody>
          </table>
        </div>

        <h3>コンフリクトマネジメントのプロセスフロー</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CONFLICT_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">発生前の備えから解決・再発防止までの一連の流れ</div>
        </div>

        <h3>ベストプラクティス: Thomas-Kilmann Conflict Mode Instrument(TKI)</h3>
        <p>コンフリクト解決戦略の選択にあたっては、心理学者Kenneth ThomasとRalph Kilmannが1970年代に提唱した「Thomas-Kilmann Conflict Mode Instrument」が広く参照されています。これは「自己主張の強さ(Assertiveness)」と「協調性(Cooperativeness)」という2軸で、5つの対応モードを整理したフレームワークです。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>モード</th><th>自己主張</th><th>協調性</th><th>適したシーン</th></tr></thead>
            <tbody>
              <tr><td>Competing(強制/直接対応)</td><td>高</td><td>低</td><td>緊急性が高く迅速な意思決定が必要な場面、譲れない安全・コンプライアンス事項</td></tr>
              <tr><td>Collaborating(協調/問題解決)</td><td>高</td><td>高</td><td>長期的な関係性が重要で、双方の全面的な合意が必要な複雑な課題</td></tr>
              <tr><td>Compromising(妥協)</td><td>中</td><td>中</td><td>双方にとってある程度重要だが、時間をかけてまで対立を続ける価値がない場合の暫定合意</td></tr>
              <tr><td>Avoiding(回避/撤退)</td><td>低</td><td>低</td><td>影響力の小さい低次元の対立、当事者のクールダウンが先に必要な場合</td></tr>
              <tr><td>Accommodating(適応/融和)</td><td>低</td><td>高</td><td>自分にとっての重要度が低く、相手との関係維持を優先すべき場合</td></tr>
            </tbody>
          </table>
        </div>

        <p>5つのモードに一律の優劣はなく、適切なモードはコンフリクトの発生源と状況(緊急度、関係性の重要度、影響範囲、譲れない制約の有無)を分析したうえで選択します。試験対策としては「どのモードが常に正しいか」ではなく「この状況ではなぜこのモードが適切か」を状況ごとに判断できるようにしておくことが重要です。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />その他のベストプラクティス</div>
          <ul>
            <li>グラウンドルールはチーム結成の初期段階(Storming期に入る前)に、チーム自身が主体的に策定することで遵守率が高まる</li>
            <li>コンフリクトの解決は「勝ち負け」ではなく「プロジェクトの目的達成」を基準に判断する</li>
            <li>コンフリクトマネジメントの原則は、対立が起きてから伝えるのではなく、あらかじめチーム・外部ステークホルダーに周知しておくことで、いざという時の対応がスムーズになる</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://en.wikipedia.org/wiki/Ralph_H._Kilmann" target="_blank" rel="noopener">Ralph H. Kilmann(Wikipedia)</a></li>
            <li><a href="https://www.pmi.org/learning/library/leadership-conflict-advance-project-teams-6711" target="_blank" rel="noopener">Leadership Through Conflict: Grow and Advance Project Teams | PMI</a></li>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 07. Task 3: Lead the Project Team ===================== -->
      <section id="task-3-lead-team">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:crown" />SECTION 07</div>
        <h2>Task 3: プロジェクトチームのリード (Lead the project team)</h2>

        <h3>概要</h3>
        <p>チームレベルでの期待値設定から、権限移譲(エンパワーメント)、問題解決、チームの声の代弁、多様性の尊重、リーダーシップスタイルの選択、役割と責任の明確化まで、チームを率いる上での中核的な行動を扱うTaskです。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>チームレベルでの期待値設定</td><td>働き方・品質基準・コミュニケーション頻度などを明文化する</td></tr>
              <tr><td>チームのエンパワーメント</td><td>意思決定権限を適切に委譲し、主体性を引き出す</td></tr>
              <tr><td>問題解決</td><td>チームが直面する課題に対して解決策を導く</td></tr>
              <tr><td>チームの声の代弁</td><td>経営層やスポンサーに対してチームの状況・懸念を正確に伝える</td></tr>
              <tr><td>多様な経験・スキル・視点の支援</td><td>チームメンバーの背景の違いを尊重し、強みとして活かす</td></tr>
              <tr><td>適切なリーダーシップスタイルの決定</td><td>状況やチームの成熟度に応じてスタイルを使い分ける</td></tr>
              <tr><td>役割と責任の明確化</td><td>誰が何を担当するのかをチーム内で明確にする</td></tr>
            </tbody>
          </table>
        </div>

        <h3>ベストプラクティス: リーダーシップスタイルの使い分け</h3>
        <p>PMIの複数の学習ライブラリ記事では、プロジェクトマネージャーのリーダーシップは「サーバントリーダーシップ(Servant Leadership)」と「状況対応型リーダーシップ(Situational Leadership)」を組み合わせたパターンが効果的であるとされています。特に、正式な権限が限られる中でチームやステークホルダーを動かす必要があるプロジェクトマネージャーにとって、サーバントリーダーシップは実務上の有効性が高いとされています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>リーダーシップスタイル</th><th>特徴</th><th>適したシーン</th></tr></thead>
            <tbody>
              <tr><td>Servant(サーバント)</td><td>チームの成長・自律性・ウェルビーイングを最優先し、障害を取り除く役割に徹する</td><td>自己組織化されたアジャイルチーム、成熟度の高いチーム</td></tr>
              <tr><td>Situational(状況対応型)</td><td>チームの成熟度や状況に応じて指示型〜委任型までスタイルを可変させる</td><td>チームの発達段階(Tuckmanモデルのforming〜performing)が混在するプロジェクト</td></tr>
              <tr><td>Transformational(変革型)</td><td>ビジョンを掲げ、内発的動機付けによってチームを鼓舞する</td><td>大規模な変革プロジェクト、イノベーションが求められる場面</td></tr>
              <tr><td>Directive(指示型)</td><td>明確な指示と綿密な監督を行う</td><td>危機対応、経験の浅いチーム、精度が最優先される場面</td></tr>
              <tr><td>Laissez-faire(自由放任型)</td><td>チームに意思決定を委ね、必要最小限の介入にとどめる</td><td>高度に自律的で経験豊富なチーム</td></tr>
            </tbody>
          </table>
        </div>

        <p>チームの発達段階は、心理学者Bruce Tuckmanが提唱した「Forming(形成期)→ Storming(混乱期)→ Norming(統一期)→ Performing(機能期)」というモデルで捉えられることが多く、この発達段階に応じてリーダーシップスタイルを切り替えていくアプローチ(状況対応型リーダーシップ)が、PMBOK® Guideの関連文献でも紹介されています。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />その他のベストプラクティス</div>
          <ul>
            <li>役割と責任は、RACIチャート(Responsible/Accountable/Consulted/Informed)のような可視化ツールを用いてチーム全員が同じ認識を持てるようにする</li>
            <li>エンパワーメントは「丸投げ」ではなく、意思決定に必要な情報・権限・スキルをセットで委譲することが前提になる</li>
            <li>チームの多様な視点を活かすには、心理的安全性(Psychological Safety)、すなわち「発言してもリスクがない」と感じられる環境づくりが土台になる</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/learning/library/leadership-essentials-project-management-professionals-6226" target="_blank" rel="noopener">Leadership essentials for project management professionals (PMPs) | PMI</a></li>
            <li><a href="https://www.pmi.org/learning/library/great-project-leadership-five-essentials-5915" target="_blank" rel="noopener">Great project leadership | PMI</a></li>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 08. Task 4: Engage Stakeholders ===================== -->
      <section id="task-4-engage-stakeholders">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:affiliate" />SECTION 08</div>
        <h2>Task 4: ステークホルダーのエンゲージメント (Engage stakeholders)</h2>

        <h3>概要</h3>
        <p>ステークホルダーの特定から分析、コミュニケーションの調整、エンゲージメント計画の実行、期待値とプロジェクト目標の整合、信頼構築までを扱う、ステークホルダーマネジメントの中核Taskです。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>ステークホルダーの特定</td><td>プロジェクトに影響を与える・受ける関係者を洗い出す</td></tr>
              <tr><td>ステークホルダーの分析</td><td>影響力・関心度・態度などの観点で分析する</td></tr>
              <tr><td>コミュニケーションの分析と調整</td><td>ステークホルダーごとにニーズに合わせて伝え方を変える</td></tr>
              <tr><td>エンゲージメント計画の実行</td><td>計画したアプローチを実際の行動に移す</td></tr>
              <tr><td>ニーズ・期待値・プロジェクト目標の整合最適化</td><td>三者間のギャップを埋める</td></tr>
              <tr><td>信頼構築と影響力の行使</td><td>信頼関係を土台に、目標達成へ向けてステークホルダーを動かす</td></tr>
            </tbody>
          </table>
        </div>

        <h3>ステークホルダーエンゲージメントのサイクル</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_STAKEHOLDER_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">特定から満足度確認までを繰り返す循環プロセス</div>
        </div>

        <h3>ベストプラクティス: ステークホルダー分析ツール</h3>
        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス: ステークホルダー分析ツール</div>
          <ul>
            <li><strong>Power/Interest Grid(権力・関心度グリッド):</strong> 「影響力の大小」と「関心度の高低」の2軸でステークホルダーを4象限に分類し、対応の優先順位を決める代表的なツール</li>
            <li><strong>Stakeholder Engagement Assessment Matrix(ステークホルダーエンゲージメント評価マトリクス):</strong> 各ステークホルダーについて「現在の関与レベル(Current)」と「望ましい関与レベル(Desired)」を比較し、そのギャップを埋めるための具体的なコミュニケーション施策を計画するツール(詳細はTask 5・6で解説)</li>
          </ul>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />その他のベストプラクティス</div>
          <ul>
            <li>ステークホルダー分析は一度実施して終わりではなく、プロジェクトの進行やフェーズ移行に応じて定期的に見直す</li>
            <li>「信頼構築」は一朝一夕には成立しない。約束を守る・透明性を保つ・小さな成功体験を積み重ねるといった地道な行動の積み重ねが土台になる</li>
            <li>影響力の行使は職位上の権限(Positional Power)だけに頼らず、専門性・人間関係・実績に基づく影響力(Referent Power/Expert Power)も活用する</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 09. Task 5: Align Stakeholder Expectations ===================== -->
      <section id="task-5-align-expectations">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:arrows-join" />SECTION 09</div>
        <h2>Task 5: ステークホルダーの期待値の整合 (Align stakeholder expectations)</h2>

        <h3>概要</h3>
        <p>ステークホルダーを分類し、それぞれが何を期待しているかを把握したうえで、期待値のズレを話し合いによって整合させ、さらにメンタリングの機会を通じて関係性を深めるTaskです。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>ステークホルダーの分類</td><td>属性・立場・利害関係などでグルーピングする</td></tr>
              <tr><td>ステークホルダーの期待値の特定</td><td>明示的・暗黙的な期待を洗い出す</td></tr>
              <tr><td>期待値整合のためのディスカッション促進</td><td>ズレがある場合、対話の場を設けて合意形成する</td></tr>
              <tr><td>メンタリング機会の組織化と実行</td><td>経験の浅いメンバーやステークホルダーの育成機会を活かす</td></tr>
            </tbody>
          </table>
        </div>

        <h3>ベストプラクティス: Stakeholder Engagement Assessment Matrix</h3>
        <p>ステークホルダーの現在の関与レベルと、プロジェクト成功のために必要な望ましい関与レベルを比較するツールとして、5段階の分類が広く使われています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>レベル</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>Unaware(無自覚)</td><td>プロジェクトの存在やその影響について認識していない</td></tr>
              <tr><td>Resistant(抵抗)</td><td>プロジェクトの存在は認識しているが、変化に対して抵抗を示す</td></tr>
              <tr><td>Neutral(中立)</td><td>プロジェクトを認識しているが、支持も反対もしていない</td></tr>
              <tr><td>Supportive(支持)</td><td>プロジェクトを認識し、その成果を支持している</td></tr>
              <tr><td>Leading(主導)</td><td>プロジェクトの成功に向けて能動的に関与し、推進している</td></tr>
            </tbody>
          </table>
        </div>

        <p>各ステークホルダーについて「現在地(C: Current)」と「目標地点(D: Desired)」をマトリクス上にマッピングし、そのギャップの大きさに応じて対話・メンタリング・情報提供などの施策を計画します。例えば、スポンサーの現在地が「Supportive」で目標地点が「Leading」であれば、意思決定への巻き込みや推進役としての役割付与といった、ワンランク引き上げる施策を検討します。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />その他のベストプラクティス</div>
          <ul>
            <li>期待値のズレは「誰が正しいか」ではなく「何が事実で、何が解釈の違いか」を切り分けて話し合う</li>
            <li>メンタリングは一方的な指導ではなく、経験の浅いステークホルダーやチームメンバーが自ら気づきを得られるよう、対話を通じて支援する</li>
            <li>ステークホルダーの分類は固定的なものではなく、プロジェクトの局面によって重要度・関与度が変化することを前提に、継続的に更新する</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://pmstudycircle.com/stakeholder-engagement-assessment-matrix/" target="_blank" rel="noopener">What is the Stakeholder Engagement Assessment Matrix? | PM Study Circle</a></li>
            <li><a href="https://www.projectengineer.net/3-types-of-stakeholder-matrix/" target="_blank" rel="noopener">3 Types of Stakeholder Matrix</a></li>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 10. Task 6: Manage Stakeholder Expectations ===================== -->
      <section id="task-6-manage-expectations">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target-arrow" />SECTION 10</div>
        <h2>Task 6: ステークホルダーの期待値のマネジメント (Manage stakeholder expectations)</h2>

        <h3>概要</h3>
        <p>Task 5が「期待値を整合させる」という一時的な合意形成の活動であるのに対し、Task 6は社内外の顧客の期待値を継続的に維持・監視し、必要に応じて対応するという、より継続的・運用的な性質のTaskです。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>社内外の顧客期待値の特定</td><td>誰が顧客であり、何を期待しているかを把握する</td></tr>
              <tr><td>成果物と期待値の整合維持</td><td>プロジェクトの成果が期待とズレないよう継続的に調整する</td></tr>
              <tr><td>満足度・期待値のモニタリングと対応</td><td>定点観測を行い、変化があれば適切に対処する</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Task 5とTask 6の違いを理解する</h3>
        <p>初学者がつまずきやすいポイントとして、Task 5「Align」とTask 6「Manage」の違いがあります。以下のように整理すると理解しやすくなります。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>Task 5: Align(整合)</th><th>Task 6: Manage(マネジメント)</th></tr></thead>
            <tbody>
              <tr><td>時間軸</td><td>特定時点でのズレを解消する、一時的な活動</td><td>プロジェクト期間を通じた継続的な活動</td></tr>
              <tr><td>主なアクション</td><td>ディスカッションによる合意形成、メンタリング</td><td>モニタリング、満足度確認、継続的対応</td></tr>
              <tr><td>焦点</td><td>期待値そのものを揃えること</td><td>揃えた期待値を維持し、満足度を保つこと</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li>顧客満足度は、正式なアンケートだけでなく、定例会議での発言・トーン、成果物へのフィードバック速度といった定性的なシグナルからも把握する</li>
            <li>期待値と実際の成果に乖離が生じそうな兆候を早期に検知し、サプライズを避けるための先手のコミュニケーションを行う(いわゆる「Bad news early」の原則)</li>
            <li>モニタリングの結果は一過性の報告で終わらせず、次のエンゲージメント施策の入力情報として活用する</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 11. Task 7: Help Ensure Knowledge Transfer ===================== -->
      <section id="task-7-knowledge-transfer">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:bulb" />SECTION 11</div>
        <h2>Task 7: 知識移転の推進 (Help ensure knowledge transfer)</h2>

        <h3>概要</h3>
        <p>プロジェクトを通じて蓄積される知識が、個人の頭の中に留まらず組織の資産として継承されるよう促進するTaskです。ECO本文では、Domain / Task / Enablerという3階層の構造を説明する例としてこのTaskが挙げられています。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>プロジェクトに重要な知識の特定</td><td>何が失われると困る知識かを見極める</td></tr>
              <tr><td>知識の収集</td><td>インタビュー・レビュー・ドキュメント化などを通じて集める</td></tr>
              <tr><td>知識移転を促す環境づくり</td><td>心理的安全性やインセンティブを含めた土壌を整える</td></tr>
            </tbody>
          </table>
        </div>

        <h3>知識移転のプロセスフロー</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_KNOWLEDGE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">重要な知識の特定から組織のナレッジベース格納まで</div>
        </div>

        <h3>ベストプラクティス: 暗黙知(Tacit Knowledge)と形式知(Explicit Knowledge)</h3>
        <p>PMIの複数のライブラリ記事では、知識を「Explicit Knowledge(形式知)」と「Tacit Knowledge(暗黙知)」の2種類に区分して捉えることが推奨されています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>種類</th><th>説明</th><th>移転の難易度</th></tr></thead>
            <tbody>
              <tr><td>Explicit Knowledge(形式知)</td><td>マニュアル・手順書・テンプレートなど、言語化・文書化されている知識</td><td>比較的容易(文書共有・研修などで移転可能)</td></tr>
              <tr><td>Tacit Knowledge(暗黙知)</td><td>個人の経験・勘・判断力に基づく、言語化しにくい知識</td><td>困難(対話・共同作業・メンタリングを通じてしか移転しにくい)</td></tr>
            </tbody>
          </table>
        </div>

        <p>伝統的なプロジェクトマネジメントの手法は形式知の管理に重心が置かれがちである一方、実際にプロジェクトの成否を分けるのは暗黙知であることが多いとされています。暗黙知の移転には、以下のような具体的な手法が有効とされています。</p>

        <ul>
          <li><strong>レッスンズラーンド(Lessons Learned)セッションの構造化:</strong> プロジェクト終了後だけでなく、フェーズの節目ごとに実施する。参加者は成果物に直接関わった実務担当者を中心に選定し、「何が起きたか」を経験ベースで語ってもらうことから始める</li>
          <li><strong>メンタリング・コーチング:</strong> 経験豊富なメンバーと若手メンバーを組ませ、日常業務を通じた暗黙知の伝承を促す</li>
          <li><strong>コミュニティ・オブ・プラクティス(実践共同体):</strong> 同じ専門性を持つメンバー同士が定期的に知見を交換する場を設ける</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />その他のベストプラクティス</div>
          <ul>
            <li>「重要な知識」を特定する際は、失われた場合の影響度(インパクト)と、その知識を持つ人材の代替可能性(希少性)の両面で優先順位をつける</li>
            <li>知識移転を促す環境づくりには、心理的安全性(失敗や疑問を共有しても咎められない文化)、情報共有のインセンティブ設計、離職・異動のタイミングを見越した早期の引き継ぎ計画が含まれる</li>
            <li>収集した知識はドキュメント化するだけでなく、次のプロジェクトで実際に参照・活用される仕組み(検索性の高いナレッジベースなど)とセットで設計する</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/learning/library/turning-experience-into-knowledge-3828" target="_blank" rel="noopener">Being in the know | PMI</a></li>
            <li><a href="https://www.pmi.org/learning/library/tapping-tacit-knowledge-across-enterprise-7747" target="_blank" rel="noopener">Tapping tacit knowledge | PMI</a></li>
            <li><a href="https://www.pmi.org/learning/library/support-knowledge-transfer-pmos-10206" target="_blank" rel="noopener">How To Support Knowledge Transfer Through PMOs | PMI</a></li>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 12. Task 8: Plan and Manage Communication ===================== -->
      <section id="task-8-plan-communication">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:message-circle" />SECTION 12</div>
        <h2>Task 8: コミュニケーションの計画とマネジメント (Plan and manage communication)</h2>

        <h3>概要</h3>
        <p>2026年改定でProcessドメインからPeopleドメインへ統合されたTaskです。コミュニケーション戦略の策定、透明性・協働の促進、フィードバックループの確立、レポーティング要件の理解、ガバナンスプロセスへの対応までを扱います。</p>

        <h3>Enabler(実務行動例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Enabler</th><th>説明</th></tr></thead>
            <tbody>
              <tr><td>コミュニケーション戦略の定義</td><td>誰に・何を・いつ・どう伝えるかを設計する</td></tr>
              <tr><td>透明性と協働の促進</td><td>情報の隠蔽をなくし、オープンな協力関係を築く</td></tr>
              <tr><td>フィードバックループの確立</td><td>一方通行ではなく、双方向の情報流通を仕組み化する</td></tr>
              <tr><td>レポーティング要件の理解</td><td>誰がどのような報告を必要としているかを把握する</td></tr>
              <tr><td>スポンサー・ステークホルダー期待に沿ったレポート作成</td><td>相手のニーズに合わせた粒度・形式で報告する</td></tr>
              <tr><td>レポーティング・ガバナンスプロセスの支援</td><td>組織のガバナンス体制に沿った報告の仕組みを支える</td></tr>
            </tbody>
          </table>
        </div>

        <h3>コミュニケーション計画のフロー</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_COMMS_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">戦略定義から3方式の選択、フィードバック、報告までの流れ</div>
        </div>

        <h3>ベストプラクティス: 3つのコミュニケーション方式</h3>
        <p>PMBOK® Guideの伝統的な整理では、コミュニケーション手法は方向性の観点から3種類に分類されます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>方式</th><th>特徴</th><th>具体例</th></tr></thead>
            <tbody>
              <tr><td>Push型(プッシュ型)</td><td>受信確認や即時のフィードバックを前提とせず、送り手から一方的に情報を届ける</td><td>メール、レポート、社内報</td></tr>
              <tr><td>Pull型(プル型)</td><td>受け手が必要なタイミングで自発的に情報にアクセスする</td><td>社内ポータル、共有ドライブ、ナレッジベース</td></tr>
              <tr><td>Interactive型(双方向型)</td><td>リアルタイムでの多方向のやり取りが発生する</td><td>会議、電話、ビデオ会議、対面での立ち話</td></tr>
            </tbody>
          </table>
        </div>

        <p>複雑な意思決定やセンシティブな話題にはInteractive型、定型的な進捗報告にはPush型、必要なときに参照される情報にはPull型、というように使い分けることが基本原則とされています。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />その他のベストプラクティス</div>
          <ul>
            <li>コミュニケーションチャネルの数は、ステークホルダーの人数が増えるほど組み合わせの数として急激に増加する(n人であれば <code>n × (n − 1) ÷ 2</code> 通りの経路が存在する)。ステークホルダーが増えるほど、構造化されたコミュニケーション計画の重要性が高まる</li>
            <li>フィードバックループは「報告して終わり」にせず、受け手からの反応・疑問・懸念を次のアクションに反映する仕組みとして設計する</li>
            <li>レポートの粒度・頻度・形式はステークホルダーごとに異なる。経営層には要約されたダッシュボード、実務チームには詳細なバックログというように、受け手に応じてテーラリングする</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/learning/library/communication-strategy-stakeholder-generating-reports-6887" target="_blank" rel="noopener">Beyond reporting--the communication strategy | PMI</a></li>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 13. Cross-Task Best-Practice Summary ===================== -->
      <section id="cross-task-summary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:table" />SECTION 13</div>
        <h2>タスク横断ベストプラクティス総まとめ表</h2>

        <div class="table-wrap">
          <table>
            <thead><tr><th>Task</th><th>キーとなるフレームワーク・概念</th><th>一言でいうと</th></tr></thead>
            <tbody>
              <tr><td>Task 1: 共通ビジョンの醸成</td><td>ビジョンステートメント、根本原因分析</td><td>「なぜやるのか」を全員で共有し続ける</td></tr>
              <tr><td>Task 2: コンフリクトのマネジメント</td><td>Thomas-Kilmann Conflict Mode Instrument</td><td>状況に応じて解決モードを使い分ける</td></tr>
              <tr><td>Task 3: プロジェクトチームのリード</td><td>サーバントリーダーシップ、状況対応型リーダーシップ、Tuckmanモデル</td><td>チームの成熟度に合わせてスタイルを変える</td></tr>
              <tr><td>Task 4: ステークホルダーのエンゲージメント</td><td>Power/Interest Grid</td><td>影響力と関心度でステークホルダーを整理する</td></tr>
              <tr><td>Task 5: ステークホルダーの期待値の整合</td><td>Stakeholder Engagement Assessment Matrix</td><td>現在地と目標地点のギャップを埋める</td></tr>
              <tr><td>Task 6: ステークホルダーの期待値のマネジメント</td><td>満足度モニタリング、Bad news early原則</td><td>揃えた期待値を継続的に維持する</td></tr>
              <tr><td>Task 7: 知識移転の推進</td><td>形式知/暗黙知、レッスンズラーンド</td><td>個人の知識を組織の資産に変える</td></tr>
              <tr><td>Task 8: コミュニケーションの計画とマネジメント</td><td>Push/Pull/Interactive型コミュニケーション</td><td>相手と目的に応じて伝達手段を選ぶ</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 14. Exam Tips for the People Domain ===================== -->
      <section id="exam-tips">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checklist" />SECTION 14</div>
        <h2>People領域の試験対策のコツ</h2>

        <p>PMP試験は知識の暗記だけでなく、シナリオに対する状況判断力を問う設問が中心です。People領域では特に以下の思考パターンを意識すると得点力が向上します。</p>

        <ul>
          <li><strong>プロアクティブ(能動的)な選択肢を優先する:</strong> 問題が発生してから対応する受動的な選択肢よりも、事前にリスクや対立を予見して行動する選択肢が正解になりやすい</li>
          <li><strong>まず状況を評価してから行動する:</strong> 「即座にエスカレーションする」「即座に変更を実施する」といった、状況把握を飛ばして行動に飛びつく選択肢は、多くの場合誤りである。PMI公式サイトのサンプル設問でも、変更要求に対しては影響評価と正式な変更管理プロセスに従うこと、チームへの指示が競合する場合はまず該当ステークホルダーと役割・権限・影響を確認する話し合いを行うことが、望ましい対応として示されている</li>
          <li><strong>チームを主語にする:</strong> 「マネージャーが一方的に決める」よりも「チームと協働して解決する」「チームの声を代弁する」という選択肢が好まれる傾向がある</li>
          <li><strong>開発アプローチを問わない原則を意識する:</strong> People領域の設問は predictive/agile/hybrid のいずれのアプローチでも成立する内容が多い。特定の手法名に引きずられず、「人と人との関係性」という観点で設問の本質を捉える</li>
          <li><strong>Case or Scenario形式・Graphic-Based Questions形式に慣れる:</strong> 2026年改定で追加された新形式では、シナリオや図表を読み解いたうえで複数の設問に答える必要がある。単文の記憶問題ではなく、まとまった情報から必要な要素を抽出する練習をしておくとよい</li>
        </ul>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
          <ul>
            <li><a href="https://www.pmi.org/certifications/project-management-pmp" target="_blank" rel="noopener">PMP Certification | PMI</a></li>
            <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">PMP Examination Content Outline 2026(PMI公式PDF)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 15. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 15</div>
        <h2>参考文献・出典</h2>

        <p>本ガイドの作成にあたり、以下の一次情報源・PMI公式ライブラリ記事を参照しました。</p>

        <div class="ref-group">
          <h3>PMI公式・一次情報源</h3>
          <ul class="ref-list">
            <li><span class="ref-name">PMP® Certification Exam Content Outline 2026(2026年7月改定版・PMI公式PDF)</span><a class="ref-url" href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf</a></li>
            <li><span class="ref-name">Project Management Professional (PMP)® Certification | PMI</span><a class="ref-url" href="https://www.pmi.org/certifications/project-management-pmp" target="_blank" rel="noopener">https://www.pmi.org/certifications/project-management-pmp</a></li>
            <li><span class="ref-name">PMBOK® Guide | PMI</span><a class="ref-url" href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">https://www.pmi.org/standards/pmbok</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>コンフリクトマネジメント関連</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Leadership Through Conflict: Grow and Advance Project Teams | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/leadership-conflict-advance-project-teams-6711" target="_blank" rel="noopener">https://www.pmi.org/learning/library/leadership-conflict-advance-project-teams-6711</a></li>
            <li><span class="ref-name">Ralph H. Kilmann(Wikipedia)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Ralph_H._Kilmann" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Ralph_H._Kilmann</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>リーダーシップ関連</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Leadership essentials for project management professionals (PMPs)® | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/leadership-essentials-project-management-professionals-6226" target="_blank" rel="noopener">https://www.pmi.org/learning/library/leadership-essentials-project-management-professionals-6226</a></li>
            <li><span class="ref-name">Great project leadership | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/great-project-leadership-five-essentials-5915" target="_blank" rel="noopener">https://www.pmi.org/learning/library/great-project-leadership-five-essentials-5915</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>ステークホルダーマネジメント関連</h3>
          <ul class="ref-list">
            <li><span class="ref-name">What is the Stakeholder Engagement Assessment Matrix? | PM Study Circle</span><a class="ref-url" href="https://pmstudycircle.com/stakeholder-engagement-assessment-matrix/" target="_blank" rel="noopener">https://pmstudycircle.com/stakeholder-engagement-assessment-matrix/</a></li>
            <li><span class="ref-name">3 Types of Stakeholder Matrix | ProjectEngineer</span><a class="ref-url" href="https://www.projectengineer.net/3-types-of-stakeholder-matrix/" target="_blank" rel="noopener">https://www.projectengineer.net/3-types-of-stakeholder-matrix/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>知識移転関連</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Being in the know | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/turning-experience-into-knowledge-3828" target="_blank" rel="noopener">https://www.pmi.org/learning/library/turning-experience-into-knowledge-3828</a></li>
            <li><span class="ref-name">Tapping tacit knowledge | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/tapping-tacit-knowledge-across-enterprise-7747" target="_blank" rel="noopener">https://www.pmi.org/learning/library/tapping-tacit-knowledge-across-enterprise-7747</a></li>
            <li><span class="ref-name">How To Support Knowledge Transfer Through PMOs | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/support-knowledge-transfer-pmos-10206" target="_blank" rel="noopener">https://www.pmi.org/learning/library/support-knowledge-transfer-pmos-10206</a></li>
            <li><span class="ref-name">Uncovering tacit knowledge in projects | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/uncovering-tacit-knowledge-projects-7378" target="_blank" rel="noopener">https://www.pmi.org/learning/library/uncovering-tacit-knowledge-projects-7378</a></li>
            <li><span class="ref-name">PMP Examination Content Outline 2026(PMI公式PDF)</span><a class="ref-url" href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>コミュニケーション管理関連</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Beyond reporting--the communication strategy | PMI</span><a class="ref-url" href="https://www.pmi.org/learning/library/communication-strategy-stakeholder-generating-reports-6887" target="_blank" rel="noopener">https://www.pmi.org/learning/library/communication-strategy-stakeholder-generating-reports-6887</a></li>
          </ul>
        </div>
      </section>

      <footer>
        <p>PMP®・PMBOK® は Project Management Institute, Inc. の登録商標です。本ページはPMI公式教材ではなく、PMI公式のExamination Content Outline(ECO)2026年7月改定版などの一次情報源をもとに作成した非公式の学習補助資料です。最新情報は必ず<a href="https://www.pmi.org/" target="_blank" rel="noopener">PMI公式サイト(pmi.org)</a>でご確認ください。</p>
      </footer>
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

.disclaimer-box :deep(.iconify) {
  margin-right: 6px;
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

em {
  color: var(--color-ink-soft);
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

/* ===================== Step list ===================== */
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

/* ===================== Reference list ===================== */
.ref-group {
  margin-bottom: 28px;
}

.ref-group h3 {
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
