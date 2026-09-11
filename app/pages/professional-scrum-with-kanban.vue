<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "exam-overview",
  "kanban-practices",
  "flow-metrics",
  "kanban-in-scrum-events",
  "engineering-practices",
  "exam-pitfalls",
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
  title: "Professional Scrum with Kanban(PSK I)認定資格 完全ガイド | フローで読み解くスクラムとカンバン",
  description:
    "Scrum.org公式のThe Kanban Guide for Scrum Teamsに基づき、PSK I認定試験に必要なフローメトリクスとカンバンプラクティスを体系的に解説する非公式学習ガイドです。",
});

const LIGHT_THEME_VARS = {
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

const DIAGRAM_SCRUM_KANBAN_CONTAINER = `flowchart TB
    subgraph SCRUM["スクラムフレームワーク 変更されない部分"]
        direction TB
        A["Scrum Team 役割 PO SM Developers"]
        B["Scrum Events Sprint Planning Daily Scrum Review Retrospective"]
        C["Scrum Artifacts Product Backlog Sprint Backlog Increment"]
        subgraph KANBAN["カンバンプラクティス フローを強化する部分"]
            direction TB
            D["ワークフローの可視化"]
            E["WIP制限"]
            F["アクティブな管理"]
            G["継続的な改善"]
        end
    end
    A --> B --> C
    C -.->|"フローの可視化と計測で強化"| KANBAN

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,F,G box;
    class KANBAN hub;`;

const DIAGRAM_KANBAN_BOARD_FLOW = `flowchart TB
    PB["Product Backlog"] --> RD["Ready リファインメント済み"]
    RD -->|"プル 開始点"| IP["In Progress WIP制限あり"]
    IP -->|"Work Item Ageを監視"| RV["Review ブロック時は直ちに可視化"]
    RV -->|"完了基準を満たす"| DN["Done 終了点"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class PB,RD box;
    class IP,RV hub;
    class DN done;`;

const DIAGRAM_FLOW_HEALTH_CFD = `flowchart LR
    subgraph healthy["健全なフロー"]
        direction LR
        A1["流入線と完了線がほぼ平行"] --> A2["WIPが安定"]
    end
    subgraph risky["危険なフロー"]
        direction LR
        B1["流入線と完了線の間隔が拡大"] --> B2["WIPが増加 ボトルネックの兆候"]
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A1,A2 done;
    class B1,B2 hub;`;

const DIAGRAM_SCRUM_EVENTS_FLOW_CYCLE = `flowchart TD
    SP["Sprint Planning Throughputに基づく確率的予測"] --> DS["Daily Scrum ボードを右から左へ Work Item Ageに注目"]
    DS --> SR["Sprint Review フロー実績データを共有"]
    SR --> RETRO["Sprint Retrospective CFD 散布図で振り返り"]
    RETRO --> REF["Refinement アイテムのRight-sizing"]
    REF -.->|"次のスプリントへ反映"| SP

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class DS,SR,RETRO,REF box;
    class SP hub;`;

const DIAGRAM_EXPEDITE_LANE = `flowchart LR
    subgraph normal["通常レーン"]
        direction LR
        N1["Ready"] --> N2["In Progress WIP制限あり"] --> N3["Review"] --> N4["Done"]
    end
    subgraph express["特急レーン"]
        direction LR
        E1["緊急発生"] --> E2["Expedite 上限はチームが定める(例: 常に1件まで)"]
    end
    E2 --> N3

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class N1,N2,N3 box;
    class E1,E2 hub;
    class N4 done;`;
</script>

<template>
  <div class="layout">
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">PSK I 完全ガイド</div>
          <div class="brand-subtitle">Professional Scrum with Kanban</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li class="nav-group-label">目次</li>
        <li><a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />1. 試験概要と基本思想</a></li>
        <li><a href="#kanban-practices" :class="{ active: activeId === 'kanban-practices' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />2. カンバンの4つの基本プラクティス</a></li>
        <li><a href="#flow-metrics" :class="{ active: activeId === 'flow-metrics' }" @click="closeSidebar"><Icon name="tabler:chart-pie" aria-hidden="true" />3. フローを測る4つのメトリクス</a></li>
        <li><a href="#kanban-in-scrum-events" :class="{ active: activeId === 'kanban-in-scrum-events' }" @click="closeSidebar"><Icon name="tabler:timeline" aria-hidden="true" />4. スクラムイベントへの適用</a></li>
        <li><a href="#engineering-practices" :class="{ active: activeId === 'engineering-practices' }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />5. 実践テクニック</a></li>
        <li><a href="#exam-pitfalls" :class="{ active: activeId === 'exam-pitfalls' }" @click="closeSidebar"><Icon name="tabler:file-text" aria-hidden="true" />6. 落とし穴とアンチパターン</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />7. 参考リソース・公式リンク集</a></li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org公式リソース準拠</div>
        <h1>Professional Scrum with Kanban(PSK I)認定資格 完全ガイド</h1>
        <p class="hero-lede">
          スクラムとカンバンの初学者でも体系的に理解できるよう、Scrum.org公式リソースに基づいて構成した学習ガイドです。すべての図解はMermaid構文で表現し、比較・整理が必要な箇所はテーブルで構造化しています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">45問</div><div class="stat-label">出題数</div></div>
          <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">制限時間</div></div>
          <div class="stat-card"><div class="stat-number">85%</div><div class="stat-label">合格ライン</div></div>
          <div class="stat-card"><div class="stat-number">4つ</div><div class="stat-label">主要フローメトリクス</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドはScrum.org公式リソースの内容をもとに、PSK I認定試験の学習用に体系立てて再構成した非公式の解説資料です。試験内容・出題形式・受験料は変更される可能性があるため、受験前に必ず<a href="https://www.scrum.org/assessments/professional-scrum-with-kanban-certification" target="_blank" rel="noopener">公式サイト</a>で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 1. Exam Overview ===================== -->
      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>PSK(Professional Scrum with Kanban)試験概要と基本思想</h2>

        <h3>PSK認定の目的と試験形式</h3>
        <p>Professional Scrum with Kanban(PSK I)は、Scrum.orgが提供する認定資格の一つで、<strong>スクラムチームがカンバンのプラクティスとフローメトリクスをどのように活用して、透明性・予測可能性・価値提供のスピードを高めるか</strong>を検証するものです。PSM(Professional Scrum Master)のように「スクラムの理解」そのものを問うのではなく、<strong>「すでにスクラムを実践しているチームが、フロー最適化の観点でどう改善できるか」</strong>に焦点が当てられている点が特徴です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>試験名</td><td>Professional Scrum with Kanban I(PSK I)</td></tr>
              <tr><td>出題形式</td><td>Multiple Choice(単一選択) / Multiple Answer(複数選択) / True or False</td></tr>
              <tr><td>問題数</td><td>45問</td></tr>
              <tr><td>制限時間</td><td>60分</td></tr>
              <tr><td>合格ライン</td><td>85%(45問中およそ39問以上の正解)</td></tr>
              <tr><td>試験言語</td><td>英語のみ</td></tr>
              <tr><td>受験資格</td><td>公式コース受講は必須ではなく、単独でオンライン受験可能(PSM I相当のスクラム理解とカンバンの基礎知識が前提)</td></tr>
              <tr><td>出題の中心テーマ</td><td>(1)フローメトリクス(Cycle Time・WIPなど)とカンバンプラクティスの理解 / (2)既存のスクラム環境にカンバンのプラクティス・メトリクスを適用した場合の効果の理解</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>受験料や出題形式は改定される可能性があるため、受験前に必ず公式ページで最新情報を確認してください。また試験自体は英語でのみ提供されているため、英語の専門用語(Cycle Time、Work Item Age、Throughput、Service Level Expectationなど)はそのまま英語表記で覚えておくことを強く推奨します。</p>
        </div>

        <h3>なぜスクラムチームにカンバンが必要なのか</h3>
        <p>スクラムガイドは意図的に「不完全(purposefully incomplete)」に設計されたフレームワークであり、ワークフローをどう可視化し、どう改善していくかという具体的な実践方法までは規定していません。ここにカンバンのプラクティスを組み合わせることで、スクラムチームは以下を得られます。</p>
        <ul>
          <li><strong>透明性の向上。</strong>ワークフローの各状態(列)が明確になり、どこに仕事が滞留しているかが一目でわかる。</li>
          <li><strong>予測可能性の向上。</strong>ベロシティ(相対見積もりの合計)だけでなく、実測されたフローメトリクスに基づく確率的な予測(Sprint Planningでの確率的フォーキャストなど)が可能になる。</li>
          <li><strong>フロー効率への意識転換。</strong>リソース効率(人やチームの稼働率を最大化する発想)ではなく、フロー効率(一つひとつの作業アイテムが最短で完了に向かうこと)を重視する発想へのシフトを促す。</li>
        </ul>

        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>リソース効率(Resource Efficiency)</th><th>フロー効率(Flow Efficiency)</th></tr></thead>
            <tbody>
              <tr><td>最適化の対象</td><td>人・チームの稼働率</td><td>作業アイテムの流れる速さ</td></tr>
              <tr><td>典型的な行動</td><td>手が空かないよう常に新しい仕事を割り当てる</td><td>仕掛かり中のアイテムを完了させることを優先する</td></tr>
              <tr><td>WIPへの影響</td><td>高止まりしやすい</td><td>意図的に制限される</td></tr>
              <tr><td>結果として起こりやすいこと</td><td>多くのタスクが同時並行になり、個々のCycle Timeが伸びる(コンテキストスイッチの増加)</td><td>個々のアイテムが早く完了し、リードタイムが安定する</td></tr>
            </tbody>
          </table>
        </div>

        <h3>カンバンの基本原則とスクラムとの補完関係</h3>
        <p>PSK学習で最初に押さえるべき思想は、<strong>「スクラムというコンテナ(container)の中で、カンバンがフローを加速させるターボチャージャー(turbocharger)として働く」</strong>という関係性です。カンバンはスクラムのイベント・作成物・役割を一切置き換えません。むしろ、それらが機能する「土台」の中で、作業がどのように流れているかを可視化し、経験主義(Empiricism)による検査と適応をより高い解像度で行うための補完的なプラクティス群です。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCRUM_KANBAN_CONTAINER" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback><p class="diagram-loading">図を読み込み中...</p></template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">スクラムという容器の中でカンバンがフローを強化する関係</div>
        </div>

        <p>この図が示す通り、カンバンはスクラムという「容器」の外側に存在するものではなく、内側でフローを加速させる装置です。試験では「カンバンを導入するとスプリントが不要になる」「カンバンはスクラムのイベントを置き換える」といった誤った選択肢が頻出しますが、これらはすべて誤りです(詳細は<a href="#exam-pitfalls">6章</a>を参照)。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-with-kanban-certification" target="_blank" rel="noopener">PSK 公式試験概要(Scrum.org)</a></li>
            <li><a href="https://www.scrum.org/resources/kanban-guide-scrum-teams" target="_blank" rel="noopener">The Kanban Guide for Scrum Teams</a></li>
            <li><a href="https://www.scrum.org/resources/professional-scrum-with-kanban" target="_blank" rel="noopener">Scrum with Kanban リソースハブ</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 2. Kanban Practices ===================== -->
      <section id="kanban-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 02</div>
        <h2>スクラムチーム向けカンバンの4つの基本プラクティス</h2>

        <p>Kanban Guide for Scrum Teamsでは、スクラムチームがフロー最適化を実現するための基本プラクティスが定義されています。歴史的には4つの基本プラクティスとして整理されていますが、最新版のガイドでは「Service Level Expectation(SLE)」という考え方が「アクティブな管理」の中に明示的に組み込まれています。本ガイドでも、実践上の位置づけがわかるように、4つの基本プラクティスの枠組みの中でSLEに触れます。</p>

        <h3>2-1. ワークフローの定義と可視化(Definition of Workflow)</h3>
        <p>まず最初に行うべきことは、<strong>「開始点(Started)」と「終了点(Finished)」を明確に定義すること</strong>です。この2点の間にある作業状態(列)をボード上に可視化し、各列に「そのアイテムがどの状態にあれば次の列に進めるか」という<strong>完了基準(Policies)</strong>を明文化します。</p>
        <ul>
          <li>開始点: バックログから最初に着手された瞬間(多くの場合「進行中(Doing)」に入った時点)</li>
          <li>終了点: ステークホルダーに価値が届く、または「完了の定義(Definition of Done)」を満たした瞬間</li>
          <li>各列のPolicies: 例えば「レビュー列に入るには、コードレビューのリクエストが出ていること」など</li>
        </ul>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>ワークフローの列は「To Do / Doing / Done」のような単純なタスク状態ではなく、<strong>価値創出の過程を反映した状態遷移</strong>である必要があります。列を増やしすぎると可視化の意味が薄れ、少なすぎるとボトルネックの検出ができなくなります。</p>
        </div>

        <h3>2-2. 仕掛品制限(Limiting Work in Progress)</h3>
        <p>WIP制限を設ける最大の目的は、<strong>同時に進行させる作業の数を意図的に絞ることで、個々のアイテムのCycle Timeを短縮し、ボトルネックを可視化すること</strong>です。これはリトルの法則(<a href="#flow-metrics">3章</a>参照)に基づく数学的な帰結でもあります。</p>
        <ul>
          <li>WIP制限を超えそうな場合、新しい作業を「開始」するのではなく、既存の仕掛かり中アイテムを完了させることが優先される</li>
          <li>WIP制限が頻繁に超過する列は、ボトルネックの兆候であり、チームの改善対象になる</li>
          <li>WIP制限は列ごとに設定することも、チーム全体で設定することも可能</li>
        </ul>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p><strong>WIP「メトリクス」</strong>(実際に仕掛かっている数)と、<strong>WIP「制限(ポリシー)」</strong>は別概念です。試験では「WIPメトリクスとWIP制限ポリシーの違いを理解しているか」を問う設問が出やすいポイントです。</p>
        </div>

        <h3>2-3. アクティブなアイテムの管理(Actively Managing Work Items in Progress)</h3>
        <p>WIP制限を設けるだけでは不十分で、<strong>進行中のアイテムに積極的に介入し続けること</strong>が求められます。具体的には次の3点です。</p>
        <ol>
          <li><strong>プル型システムの徹底。</strong>アイテムは、次の工程に空きが出たときに「引っ張られる(pull)」形で進む。決して押し込む(push)ことはしない。</li>
          <li><strong>停滞アイテムへの介入。</strong>不必要に長く同じ状態に留まっているアイテム(Work Item Ageが高いアイテム)に対して早期に手を打つ。</li>
          <li><strong>ブロックへの迅速な対応。</strong>ブロックされたアイテムをすぐに可視化し(ボード上にブロッカーの目印を付けるなど)、解消を最優先する。</li>
        </ol>
        <p>この「積極的な管理」を支える仕組みが<strong>Service Level Expectation(SLE)</strong>です。SLEとは、<strong>「あるアイテムが開始してから完了するまでにかかる時間の見込みを、期間と確率の組み合わせで表したもの」</strong>です(例: 「85%の確率で8日以内に完了する」)。これは固定的な約束(Service Level Agreement)ではなく、あくまで過去のCycle Timeの実績データに基づく統計的な期待値であり、チーム自身がフローの異常を早期発見するための道具として使われます。</p>

        <h3>2-4. ワークフローの継続的改善(Inspecting and Adapting the Definition of Workflow)</h3>
        <p>ワークフローの定義(列構成、Policies、WIP制限)自体も固定的なものではなく、<strong>継続的に検査され適応される対象</strong>です。スプリントレトロスペクティブでフローメトリクスのデータ(CFD、Cycle Timeの散布図など)を用いて振り返り、必要であれば列の追加・統合、Policiesの見直し、WIP制限値の調整を行います。</p>

        <p>以下は、スクラムチームにおける典型的なカンバンボードのフローを表したものです。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_KANBAN_BOARD_FLOW" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback><p class="diagram-loading">図を読み込み中...</p></template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">スクラムチームにおける典型的なカンバンボードのフロー</div>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/kanban-guide-scrum-teams" target="_blank" rel="noopener">The Kanban Guide for Scrum Teams</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 3. Flow Metrics ===================== -->
      <section id="flow-metrics">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 03</div>
        <h2>フローを測る4つの主要メトリクス</h2>

        <p>Kanban Guide for Scrum Teamsは、フローの状態を客観的に把握するための4つの基本メトリクスを定義しています。これらはすべて「作業アイテムの個数」または「経過時間(elapsed time、休日や夜間も含む)」で計測される点が共通しており、ストーリーポイントのような相対見積もり単位とは異なります。</p>

        <h3>3-1. Work in Progress(WIP: 仕掛中の作業量)</h3>
        <ul>
          <li><strong>定義。</strong>開始されたが、まだ完了していない作業アイテムの数</li>
          <li><strong>計測単位。</strong>アイテム数(個数)</li>
          <li><strong>活用法。</strong>WIPを減らす取り組みの進捗を可視化する。WIPの推移はCFD(累積フロー図)の帯の幅として視覚化できる。</li>
          <li><strong>アンチパターン。</strong>緊急対応やステークホルダーからの圧力で、WIP制限を無視して新しい作業を次々と開始してしまう。これはリトルの法則に反し、結果的に全体のCycle Timeを悪化させる。</li>
        </ul>

        <h3>3-2. Cycle Time(サイクルタイム: 作業開始から完了までの実経過時間)</h3>
        <ul>
          <li><strong>定義。</strong>あるアイテムが「開始」されてから「完了」するまでの経過時間</li>
          <li><strong>計測単位。</strong>日数(休日・夜間を含む経過時間。営業日ベースではない)</li>
          <li><strong>活用法。</strong>過去のCycle Timeの分布を使って、将来のアイテムの完了時期を確率的に予測する(SLEの根拠データになる)。</li>
          <li><strong>アンチパターン。</strong>平均値だけを見て「平均Cycle Timeが3日だから大丈夫」と判断してしまう。実際には分布のばらつき(85パーセンタイルや95パーセンタイルなど)を見なければ、外れ値のリスクを見逃す。</li>
        </ul>

        <h3>3-3. Work Item Age(未完了アイテムの経過時間: 最も重要な先行指標)</h3>
        <ul>
          <li><strong>定義。</strong>まだ完了していない(進行中の)アイテムが、開始されてから現在までに経過した時間</li>
          <li><strong>計測単位。</strong>日数</li>
          <li><strong>活用法。</strong>Cycle Timeが「終わったアイテムにしか使えない遅行指標(lagging indicator)」であるのに対し、Work Item Ageは「今まさに進行中のアイテムに使える先行指標(leading indicator)」です。日々のスタンドアップで「どのアイテムが停滞しているか」を判断する最重要指標。</li>
          <li><strong>アンチパターン。</strong>アイテムが「完了した後」にしかCycle Timeを振り返らず、進行中の停滞アイテムを放置してしまう。Work Item Ageを日次で監視しないと、問題が手遅れになるまで気づけない。</li>
        </ul>

        <h3>3-4. Throughput(単位時間あたりの完了アイテム数)</h3>
        <ul>
          <li><strong>定義。</strong>単位時間(1日、1週間、1スプリントなど)あたりに完了したアイテムの数</li>
          <li><strong>計測単位。</strong>アイテム数 / 単位時間</li>
          <li><strong>活用法。</strong>スプリントプランニングにおける確率的な予測(モンテカルロシミュレーションなど)の基礎データとして使う。</li>
          <li><strong>アンチパターン。</strong>Throughputの数値そのものを目標化し、アイテムを不必要に細分化して「完了数」を水増しする(メトリクスのゲーミング)。また、Throughputを個人の生産性評価に転用することも、心理的安全性を損なうアンチパターンとして試験で問われやすい。</li>
        </ul>

        <h3>4つのメトリクス比較表</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>メトリクス</th><th>定義</th><th>単位</th><th>何がわかるか</th><th>典型的なアンチパターン</th></tr></thead>
            <tbody>
              <tr><td>WIP</td><td>開始済み・未完了のアイテム数</td><td>個数</td><td>現在の仕掛かり量、ボトルネックの兆候</td><td>WIP制限を無視して仕事を積み増す</td></tr>
              <tr><td>Cycle Time</td><td>開始から完了までの経過時間</td><td>日数</td><td>完了までにかかる実績時間</td><td>平均値のみで判断し、ばらつきを見ない</td></tr>
              <tr><td>Work Item Age</td><td>進行中アイテムの経過時間(現在時点)</td><td>日数</td><td>今、何が停滞しているか(先行指標)</td><td>完了後の振り返りだけに頼り、日次監視しない</td></tr>
              <tr><td>Throughput</td><td>単位時間あたりの完了アイテム数</td><td>個数 / 単位時間</td><td>チームの実測ペース、予測の基礎データ</td><td>数値目標化によるアイテムの不自然な細分化</td></tr>
            </tbody>
          </table>
        </div>

        <h3>3-5. リトルの法則(Little's Law)</h3>
        <p>リトルの法則は、WIP・Cycle Time・Throughputの3つのメトリクスを結びつける数学的関係です。Kanban Guide for Scrum Teamsにおける表現は次の通りです。</p>
        <p><code>平均 Cycle Time = 平均 WIP / 平均 Throughput</code></p>
        <p><strong>計算例。</strong>あるチームの平均WIPが10アイテム、平均Throughputが1日あたり2アイテムだとすると、<code>平均 Cycle Time = 10 / 2 = 5日</code>となります。つまり、このチームでは1つのアイテムが完了するまでに平均5日かかっていることになります。もしチームがCycle Timeを短縮したい場合、リトルの法則が示す打ち手は基本的に2つしかありません。</p>
        <ol>
          <li><strong>WIPを減らす。</strong>同時に手を付ける数を絞る</li>
          <li><strong>Throughputを増やす。</strong>自動化やボトルネック解消などでチームの完了ペースを上げる</li>
        </ol>
        <p>多くのマネージャーが陥る失敗は、「Cycle Timeが長すぎる」と感じたときに、<strong>逆効果となる「WIPを増やす」対応</strong>(焦って新しい作業をどんどん着手させる)をしてしまうことです。リトルの法則を理解していれば、これが誤りであることは明白です。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>リトルの法則が成立する前提条件を常に意識する。</strong>定常状態(steady state)であること、つまりアイテムの流入率(Arrival Rate)と流出率(Departure Rate)が長期的にほぼ釣り合っていること。</li>
            <li><strong>単位系を揃える。</strong>WIP・Cycle Time・Throughputが同じ単位系(同じ種類のアイテム、同じ計測期間)で測定されていることを確認する。</li>
            <li><strong>外れ値の影響を点検する。</strong>極端な外れ値(非常に長期間放置されたアイテムなど)が平均値を大きく歪めていないかを確認する。</li>
          </ul>
        </div>

        <h3>3-6. フローチャート・散布図の読み解き方</h3>
        <p><strong>累積フロー図(CFD: Cumulative Flow Diagram)。</strong>CFDは、各ワークフロー状態(列)にあるアイテム数の累積を時系列で積み上げて表示したグラフです。読み解きの基本は以下の通りです。</p>
        <ul>
          <li>ある時点での<strong>帯(バンド)の垂直方向の幅</strong>: その状態のWIP</li>
          <li>ある時点での<strong>帯の水平方向の距離</strong>: その状態を通過するのにかかったおおよそのCycle Time</li>
          <li><strong>一番上の線(総流入)の傾き</strong>: Arrival Rate(流入速度)</li>
          <li><strong>一番下の線(完了)の傾き</strong>: Throughput(流出速度)</li>
          <li>流入の線と完了の線の<strong>間隔が時間とともに広がっている場合</strong>: WIPが増加している、すなわちボトルネックの兆候</li>
        </ul>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FLOW_HEALTH_CFD" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback><p class="diagram-loading">図を読み込み中...</p></template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">CFDにおける健全なフローと危険なフローの見分け方</div>
        </div>

        <p><strong>サイクルタイム散布図(Cycle Time Scatterplot)。</strong>完了したアイテムを1つの点として、横軸に完了日、縦軸にそのアイテムのCycle Timeをプロットしたグラフです。</p>
        <ul>
          <li>点が全体的に低い位置に集まっている: Cycle Timeが短く安定している</li>
          <li>上方向に外れた点が多い: 特定のアイテムが異常に長くかかっている(原因調査の対象)</li>
          <li>50パーセンタイル・85パーセンタイル・95パーセンタイルの水平線を引くことで、「〇〇%の確率でN日以内に完了する」というSLEの根拠データになる</li>
        </ul>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/kanban-guide-scrum-teams" target="_blank" rel="noopener">The Kanban Guide for Scrum Teams</a></li>
            <li><a href="https://www.scrum.org/resources/littles-law-professional-scrum-kanban" target="_blank" rel="noopener">Little's Law for Professional Scrum with Kanban</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 4. Kanban in Scrum Events ===================== -->
      <section id="kanban-in-scrum-events">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 04</div>
        <h2>スクラムイベントにおけるカンバンの適用(実践ベストプラクティス)</h2>

        <p>カンバンはスクラムのイベントを置き換えるのではなく、<strong>それぞれのイベントに「フロー視点のデータ」を持ち込むことで、質を高める</strong>という形で統合されます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCRUM_EVENTS_FLOW_CYCLE" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback><p class="diagram-loading">図を読み込み中...</p></template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">フロー視点を組み込んだスプリントの循環サイクル</div>
        </div>

        <h3>4-1. Sprint Planning: 確率的予測に基づくバックログ選定</h3>
        <p>従来のストーリーポイントの合計(ベロシティ)だけに頼るのではなく、<strong>過去のThroughputの実績分布</strong>を使った確率的な予測(モンテカルロシミュレーションなど)を組み合わせることで、「今回のスプリントでどれだけの量が完了できそうか」をより現実的に見積もることができます。ベロシティが「見積もりの正確さ」に依存するのに対し、Throughputベースの予測は「実測された完了数」に基づくため、見積もりのブレに影響されにくいという特徴があります。</p>

        <h3>4-2. Daily Scrum: 「ボードを右から左へ見る(Walk the Board)」</h3>
        <p>伝統的な「昨日やったこと・今日やること・障害」という進捗報告型のフォーマットではなく、<strong>ボードを完了に近い列(右側)から着手側の列(左側)へと順に見ていく</strong>進め方が推奨されます。これにより、チームの意識が「新しい仕事を始めること」ではなく「今ある仕事を完了に近づけること」に自然と向きます。</p>
        <ul>
          <li>Work Item Ageが高いアイテム(停滞しているもの)を最初に特定する</li>
          <li>SLEを超えそうなアイテムがあれば、その日のうちに障害排除の対象にする</li>
          <li>WIP制限を超過している列があれば、なぜ超過しているのかをその場で確認する</li>
        </ul>

        <h3>4-3. Sprint Review: フロー実績データの共有</h3>
        <p>インクリメントとスプリントゴールの達成度に加えて、<strong>Throughputの推移、Cycle Timeの傾向、CFDの状態</strong>といったフローの実績データをステークホルダーと共有することで、「なぜこのペースで進んでいるのか」「次のリリースがいつ頃見込めるのか」について、より透明性の高い対話が可能になります。</p>

        <h3>4-4. Sprint Retrospective: 定量的なフローデータに基づく振り返り</h3>
        <p>CFDやCycle Timeの散布図を持ち込むことで、「なんとなく忙しかった」という定性的な振り返りから、「どの状態でアイテムが滞留していたか」「WIP制限は適切だったか」という<strong>データドリブンな振り返り</strong>に発展させます。ここでの気づきは、ワークフロー定義自体の見直しにつながります。</p>

        <h3>4-5. Refinement(リファインメント): アイテムサイズの均一化(Right-sizing)</h3>
        <p>大きさのばらつきが大きいアイテムが混在していると、Cycle Timeの予測可能性が下がります。リファインメントの場で<strong>アイテムを可能な限り小さく、かつサイズを揃える(Right-sizing)</strong>ことで、フローの予測可能性が向上します。これはリトルの法則の観点からも合理的です。アイテムが小さく均一であるほど、WIPの数え方やCycle Timeの分布が安定し、SLEの精度も高まります。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/kanban-guide-scrum-teams" target="_blank" rel="noopener">The Kanban Guide for Scrum Teams</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 5. Engineering Practices ===================== -->
      <section id="engineering-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 05</div>
        <h2>ソフトウェアエンジニアリングにおける実践テクニック</h2>

        <p>PSK試験はカンバンの概念理解が中心ですが、実務でソフトウェア開発チームがフローを最適化する際に押さえておくべき技術的なプラクティスも併せて理解しておくと、現場適用の解像度が高まります。</p>

        <h3>5-1. バッチサイズの極小化</h3>
        <ul>
          <li><strong>単一責任の原則(Single Responsibility Principle)とプルリクエストの分割。</strong>1つのプルリクエストが複数の関心事を混在させていると、レビューに時間がかかり、Cycle Timeが伸びる要因になる。変更を小さな単位に分割することで、レビューの負荷が下がり、フローが安定する。</li>
          <li>小さいバッチサイズは、アイテムサイズの均一化(4-5節)と同じ思想であり、リトルの法則が示す「予測可能性の向上」に直結する。</li>
        </ul>

        <h3>5-2. CI/CDパイプラインとの統合</h3>
        <ul>
          <li>デプロイ頻度の向上とCycle Timeの短縮は相乗効果を持つ。手動のリリース作業や承認待ちの工程が長いほど、コードが完成してから実際に価値が届くまでの経過時間(広義のCycle Time)が伸びる。</li>
          <li>自動化されたテスト・ビルド・デプロイパイプラインは、ワークフローの「完了」に近い列における滞留時間を削減し、結果としてThroughputの向上にも寄与する。</li>
        </ul>

        <h3>5-3. 緊急対応(Fast Track / Expediteレーン)の運用ルール</h3>
        <p>緊急性の高い作業のために「特急レーン(Expedite Lane)」を設けるチームは多いですが、運用ルールを誤るとWIP制限の意味そのものを壊してしまいます。以下は The Kanban Guide for Scrum Teams が定める規則ではなく、チームが自分たちのワークフローの定義(DoW)として採用できる<strong>ポリシーの例</strong>です。実際の上限や基準はチームが自ら決め、検査と適応の対象とします。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>ポリシー例1。</strong>Expediteレーンに入れられるアイテムの上限を定める(「常に1件まで」とするチームが多い。同時に複数の「緊急」は存在しえない、という合意を明文化する)</li>
            <li><strong>ポリシー例2。</strong>Expediteレーンに入れる基準を明文化し、安易に使われないようにする(例: 本番障害のみ、など)</li>
            <li><strong>ポリシー例3。</strong>Expediteレーンのアイテムも、システム全体のWIPの一部としてカウントする。「特急だから制限外」という扱いにしない</li>
            <li><strong>ポリシー例4。</strong>Expediteレーンの使用頻度をレトロスペクティブで振り返り、頻発するようであれば根本原因(プロセスの欠陥や品質問題)に対処する</li>
          </ul>
        </div>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_EXPEDITE_LANE" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback><p class="diagram-loading">図を読み込み中...</p></template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">通常レーンと特急レーン(Expedite)の構成</div>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/professional-scrum-with-kanban" target="_blank" rel="noopener">Scrum with Kanban リソースハブ</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 6. Exam Pitfalls ===================== -->
      <section id="exam-pitfalls">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:file-text" aria-hidden="true" />SECTION 06</div>
        <h2>試験対策: 頻出の落とし穴とアンチパターン</h2>

        <h3>6-1. 試験でよく出る誤解</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>誤解・アンチパターン</th><th>なぜ誤りか</th></tr></thead>
            <tbody>
              <tr><td>カンバンを導入するとスプリントが不要になる、あるいはスクラムイベントを廃止してよい</td><td>カンバンはスクラムのイベント・役割・作成物を置き換えない。あくまでフローを可視化・改善するための補完的プラクティスである</td></tr>
              <tr><td>ベロシティ(相対見積もり)の代わりに、時間による見積もりを義務付けるべきだ</td><td>Kanban Guideはストーリーポイントや時間見積もりを義務付けても禁止してもいない。重要なのは実測されたフローメトリクスを活用することであり、見積もり手法そのものを強制するものではない</td></tr>
              <tr><td>WIP制限を超えて、緊急タスクは無制限にレーンへ入れてよい</td><td>Expediteレーンの扱いは、チームがワークフローの定義(DoW)で定めるポリシーに依存する。多くのチームは「Expediteアイテムもシステム全体のWIPに算入する」「同時1件まで」といった上限をポリシーとして明示しており、無制限の許容を自チームのポリシーとして選ぶとWIP制限の目的(Cycle Timeの短縮)が崩れる</td></tr>
              <tr><td>Cycle Timeは平均値だけを見ればよい</td><td>平均値だけでは分布のばらつき(外れ値やロングテール)を見逃す。パーセンタイル(50th / 85th / 95thなど)に基づく分析がSLEの基礎になる</td></tr>
              <tr><td>Throughputを上げることそのものが目的である</td><td>Throughputはあくまで実測データであり、目標化するとアイテムの不自然な細分化などのゲーミングを招く。目的はあくまで価値のある成果物を継続的に届けることである</td></tr>
              <tr><td>スクラムマスターがWIP制限を一方的に決定する</td><td>ワークフローの定義(DoW)全体に対するアカウンタビリティはScrum Teamにある。Developersは、自分たちの活動に関わる部分を定義し、継続的に検査・適応する</td></tr>
              <tr><td>WIP制限は「価値を生む作業アイテム」単位ではなく、サブタスク単位で設定すべきだ</td><td>WIP制限は、価値を生成する作業アイテム(Product Backlog Item相当)に対して適用されるべきであり、個々のサブタスク単位ではない</td></tr>
            </tbody>
          </table>
        </div>

        <h3>6-2. 合格に向けた推奨学習ステップ</h3>
        <ol class="step-list">
          <li>
            <div class="step-num">1</div>
            <div class="step-body">
              <div class="step-title">The Kanban Guide for Scrum TeamsとScrum Guideを繰り返し精読する</div>
              <div class="step-desc">PSK Iの設問は The Kanban Guide for Scrum Teams に加えて Scrum Guide の内容も根拠としているため、一字一句の定義(特に4つのフローメトリクスとカンバンプラクティスの名称・定義)を正確に覚えたうえで、それらをスクラムの文脈の具体的なシナリオに当てはめて判断できるようにしておくことが最優先です。定義の暗記だけでは、状況に対する最善の対応を選ぶ設問に対応できません。</div>
            </div>
          </li>
          <li>
            <div class="step-num">2</div>
            <div class="step-body">
              <div class="step-title">「Little's Law for Professional Scrum with Kanban」を読み込む</div>
              <div class="step-desc">リトルの法則の前提条件や、WIPを増やすことがなぜ逆効果なのかという因果関係を、具体例とともに説明できるレベルまで理解する。</div>
            </div>
          </li>
          <li>
            <div class="step-num">3</div>
            <div class="step-body">
              <div class="step-title">無料のScrum with Kanban Open Assessmentを繰り返し受験する</div>
              <div class="step-desc">出題形式や問われ方に慣れるため、満点近いスコアを安定して取れるまで繰り返すことが推奨されています。</div>
            </div>
          </li>
          <li>
            <div class="step-num">4</div>
            <div class="step-body">
              <div class="step-title">CFDとCycle Timeの散布図を実際に描いて読む練習をする</div>
              <div class="step-desc">グラフから「WIPが増加しているか」「どのパーセンタイルで何日かかるか」を素早く判断できるようにしておく。</div>
            </div>
          </li>
          <li>
            <div class="step-num">5</div>
            <div class="step-body">
              <div class="step-title">確率的予測(モンテカルロシミュレーション)の考え方に慣れる</div>
              <div class="step-desc">ベロシティによる単純な見積もりではなく、実績データに基づく確率分布での予測という考え方の違いを説明できるようにしておく。</div>
            </div>
          </li>
        </ol>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-with-kanban-certification" target="_blank" rel="noopener">PSK 公式試験概要(Scrum.org)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 7. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 07</div>
        <h2>参考リソース・公式リンク集</h2>

        <p>本ガイドの解説根拠として参照した公式リソースは以下の通りです。学習の際は、必ず一次情報である公式ガイドおよび公式ページを直接確認してください。</p>

        <div class="ref-group">
          <h3>Scrum.org 公式リソース</h3>
          <ul class="ref-list">
            <li><span class="ref-name">PSK 公式試験概要(Scrum.org)</span><a class="ref-url" href="https://www.scrum.org/assessments/professional-scrum-with-kanban-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/professional-scrum-with-kanban-certification</a></li>
            <li><span class="ref-name">The Kanban Guide for Scrum Teams(公式ガイド最新版)</span><a class="ref-url" href="https://www.scrum.org/resources/kanban-guide-scrum-teams" target="_blank" rel="noopener">https://www.scrum.org/resources/kanban-guide-scrum-teams</a></li>
            <li><span class="ref-name">Scrum with Kanban リソースハブ</span><a class="ref-url" href="https://www.scrum.org/resources/professional-scrum-with-kanban" target="_blank" rel="noopener">https://www.scrum.org/resources/professional-scrum-with-kanban</a></li>
            <li><span class="ref-name">Little's Law for Professional Scrum with Kanban(Daniel Vacantiによるホワイトペーパー)</span><a class="ref-url" href="https://www.scrum.org/resources/littles-law-professional-scrum-kanban" target="_blank" rel="noopener">https://www.scrum.org/resources/littles-law-professional-scrum-kanban</a></li>
          </ul>
        </div>
      </section>

      <footer>
        Professional Scrum™、Scrum.org® はScrum.orgの登録商標です。本ガイドはScrum.orgとは無関係な非公式の学習資料であり、内容の正確性について保証するものではありません。最新情報は必ず<a href="https://www.scrum.org/resources/professional-scrum-with-kanban" target="_blank" rel="noopener">Scrum with Kanban リソースハブ</a>でご確認ください。
      </footer>
    </main>
  </div>
</template>

<style scoped>
  /* ===================== Typography ===================== */
  h1, h2, h3, h4 {
    font-family: var(--font-display);
    color: var(--color-ink);
    line-height: 1.3;
    font-feature-settings: "palt" 1;
  }

  h1 {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 16px;
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    margin: 56px 0 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--color-indigo);
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 36px 0 14px;
    color: var(--color-indigo-dark);
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 24px 0 10px;
    color: var(--color-ink);
  }

  p {
    margin: 0 0 16px;
    color: var(--color-ink);
  }

  strong {
    font-weight: 600;
    color: var(--color-ink);
  }

  ul, ol {
    margin: 0 0 20px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
  }

  hr {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 48px 0;
  }

  /* ===================== Sidebar ===================== */
  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
  }

  .sidebar-brand .seal {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }

  .brand-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 16px;
    color: var(--color-ink);
    line-height: 1.2;
  }

  .brand-subtitle {
    font-size: 12px;
    color: var(--color-ink-faint);
    margin-top: 2px;
    letter-spacing: 0.04em;
  }

  .sidebar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar-nav .nav-group-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-ink-faint);
    margin: 20px 0 8px;
    padding: 0 8px;
  }

  .sidebar-nav li:first-child .nav-group-label {
    margin-top: 0;
  }

  .sidebar-nav a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 14px;
    color: var(--color-ink-soft);
    line-height: 1.4;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .sidebar-nav a:hover {
    background: var(--color-paper-sunken);
    color: var(--color-indigo);
    text-decoration: none;
  }

  .sidebar-nav a :deep(.iconify),
  .sidebar-nav a :deep(svg) {
    font-size: 17px;
    flex-shrink: 0;
    color: var(--color-ink-faint);
  }

  .sidebar-nav a:hover :deep(.iconify),
  .sidebar-nav a:hover :deep(svg) {
    color: var(--color-indigo);
  }

  /* ===================== Main Content ===================== */
  .main-content {
    margin-left: var(--sidebar-width);
    padding: 48px 48px 120px;
  }

  /* ===================== Hero ===================== */
  .hero {
    margin-bottom: 48px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--color-border);
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-indigo);
    background: var(--color-indigo-tint);
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .hero-lede {
    font-size: 18px;
    line-height: 1.7;
    color: var(--color-ink-soft);
    margin-bottom: 28px;
  }

  .stat-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 24px;
  }

  .stat-card {
    background: var(--color-paper-raised);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 16px 20px;
    text-align: center;
  }

  .stat-number {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 700;
    color: var(--color-indigo);
    line-height: 1.1;
  }

  .stat-label {
    font-size: 12px;
    color: var(--color-ink-faint);
    margin-top: 4px;
    font-weight: 500;
  }

  /* ===================== Section Eyebrow ===================== */
  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--color-gold);
    margin-bottom: 4px;
  }

  /* ===================== Callouts ===================== */
  .callout {
    background: var(--color-paper-raised);
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--color-indigo);
    border-radius: 6px;
    padding: 18px 20px;
    margin: 24px 0;
  }

  .callout-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 8px;
    color: var(--color-indigo);
  }

  .callout-title :deep(.iconify),
  .callout-title :deep(svg) {
    font-size: 18px;
  }

  .callout p:last-child,
  .callout ul:last-child,
  .callout ol:last-child {
    margin-bottom: 0;
  }

  .callout.source {
    border-left-color: var(--color-gold);
    background: #FFFCF7;
  }
  .callout.source .callout-title { color: var(--color-gold); }

  .callout.practice {
    border-left-color: var(--color-forest);
    background: #F7FBFA;
  }
  .callout.practice .callout-title { color: var(--color-forest); }

  .callout.note {
    border-left-color: var(--color-indigo);
    background: #F9FAFD;
  }
  .callout.note .callout-title { color: var(--color-indigo); }

  /* ===================== Tables ===================== */
  table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-paper-raised);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    font-size: 15px;
  }

  th, td {
    padding: 12px 16px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--color-border);
    line-height: 1.6;
  }

  th {
    background: var(--color-paper-sunken);
    font-weight: 600;
    color: var(--color-indigo-dark);
    font-size: 14px;
    letter-spacing: 0.02em;
    border-bottom: 2px solid var(--color-border-strong);
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(238, 241, 248, 0.4); }

  /* ===================== Diagram Card ===================== */
  .diagram-card {
    background: var(--color-paper-raised);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 24px;
    margin: 28px 0;
  }

  .diagram-caption {
    font-size: 13px;
    color: var(--color-ink-faint);
    text-align: center;
    margin-top: 14px;
    font-style: italic;
  }

  /* ===================== Step List ===================== */
  .step-list {
    list-style: none;
    padding: 0;
    margin: 24px 0;
    counter-reset: step-counter;
  }

  .step-list li {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    align-items: flex-start;
  }

  .step-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-indigo);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
    font-family: var(--font-display);
  }

  .step-body {
    flex: 1;
    padding-top: 2px;
  }

  .step-title {
    font-weight: 600;
    font-size: 16px;
    color: var(--color-ink);
    margin-bottom: 4px;
  }

  .step-desc {
    font-size: 15px;
    color: var(--color-ink-soft);
    line-height: 1.65;
  }

  /* ===================== References ===================== */
  .ref-group {
    background: var(--color-paper-raised);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 24px;
    margin: 20px 0;
  }

  .ref-group :is(h3, h4) { margin-top: 0; }
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

  .layout {
    display: block;
  }

  .sidebar-overlay {
    display: none;
  }

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

  /* サイドバーのハッシュリンクは <section id> を指すため、見出しと同じ退避量を
     セクションにも与える（固定ヘッダーの下に潜り込ませない）。 */
  :is(section, h2, h3, h4) {
    scroll-margin-top: calc(var(--global-nav-height) + 32px);
  }

  .sidebar-nav a.active {
    background: var(--color-indigo-tint);
    color: var(--color-indigo);
    font-weight: 600;
  }

  .sidebar-toggle {
    display: none;
  }

  .mermaid-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 60px;
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

  .table-wrap {
    overflow-x: auto;
    max-width: 100%;
    margin: 24px 0;
  }

  @media (max-width: 980px) {
    .sidebar-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--color-indigo);
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      z-index: 30;
    }

    .sidebar-overlay {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 25;
    }

    .sidebar {
      transform: translateX(-100%);
      /* 画面外のリンクがキーボードフォーカスを受け取らないよう visibility も落とす */
      visibility: hidden;
      transition: transform 0.25s ease, visibility 0.25s ease;
      z-index: 30;
    }

    .sidebar.open {
      transform: translateX(0);
      visibility: visible;
    }

    .main-content {
      margin-left: 0;
      max-width: 100%;
      padding: 32px 20px 80px;
    }

    .hero h1 { font-size: 32px; }
    .stat-row { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 560px) {
    .stat-row { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sidebar { transition: none; }
  }
</style>
