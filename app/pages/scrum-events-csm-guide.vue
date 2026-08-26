<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-this-guide",
  "why-five-events",
  "the-sprint",
  "sprint-planning",
  "daily-scrum",
  "sprint-review",
  "sprint-retrospective",
  "event-relationships",
  "timebox-comparison",
  "definition-of-done",
  "lo-mapping",
  "exam-overview",
  "faq",
  "checklist",
  "references",
];

const activeId = useActiveHeading(TOC_IDS);
const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

const DIAGRAM_WHY_FIVE_EVENTS = `flowchart TB
    subgraph SPRINT["Sprint 1か月以内の固定長 コンテナイベント"]
        direction TB
        SP["Sprint Planning 最大8時間 Sprintの開始"]
        DS["Daily Scrum 15分 作業日ごとに毎日実施"]
        SR["Sprint Review 最大4時間 最後から2番目のイベント"]
        RETRO["Sprint Retrospective 最大3時間 Sprintを締めくくる"]
        SP --> DS --> SR --> RETRO
    end
    RETRO --> NEXT["次のSprintが即座に開始"]
    NEXT -.-> SP

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class SP,DS,SR,RETRO box;
    class NEXT hub;`;

const DIAGRAM_SPRINT_PLANNING_TOPICS = `flowchart TD
    T1["Topic1 Why 価値と有用性を提案しSprint Goalを定義"] --> SG["Sprint Goal を確定"]
    T2["Topic2 What Product Backlogから今回のSprintに含める項目を選択"] --> ITEMS["Product Backlog Item を選択"]
    T3["Topic3 How 選択した項目をDoneにする作業計画を立てる"] --> PLAN["実行計画 1日以下の作業に分解"]
    SG --> SB["Sprint Backlog Goal 選択したItem 計画"]
    ITEMS --> SB
    PLAN --> SB

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1,T2,T3,SG,ITEMS,PLAN box;
    class SB done;`;

const DIAGRAM_DAILY_SCRUM_LOOP = `flowchart LR
    A["Sprint Goalへの進捗を検査"] --> B["気づいたことを共有"]
    B --> C["翌日の作業計画を調整 Sprint Backlogを適応"]
    C -.->|"15分で完結"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`;

const DIAGRAM_SPRINT_REVIEW_FLOW = `flowchart TD
    A["Scrum TeamがIncrementを提示"] --> B["Sprintで達成したこと 環境変化を確認"]
    B --> C["次に何をすべきか協働で決める"]
    C --> D["必要に応じてProduct Backlogを更新"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D box;`;

const DIAGRAM_RETROSPECTIVE_FLOW = `flowchart TD
    A["個々人 相互作用 プロセス ツール Definition of Doneを検査"] --> B["うまくいったこと 問題になったことを洗い出す"]
    B --> C["問題がどう対処されたかを議論"]
    C --> D["最も効果が見込める改善策を特定"]
    D --> E["影響の大きい改善から早く着手"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D box;
    class E done;`;

const DIAGRAM_SPRINT_TIMELINE = `flowchart LR
    D1["Sprint Planning Sprintの開始"] --> D2["Daily Scrum 作業日ごとに毎日実施"]
    D2 --> D3["Sprint Review 最後から2番目"]
    D3 --> D4["Sprint Retrospective Sprintを締めくくる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class D1,D2,D3,D4 box;`;

useSeoMeta({
  title: "Scrum Events 完全ガイド | Certified ScrumMaster(CSM)対策",
  description: "Scrum Alliance CSM認定試験対策として、Scrumの5つのイベント(Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective)を初学者向けにステップバイステップで解説する完全ガイド。",
});
</script>

<template>
  <div class="guide-container">
    <button
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
      <nav
        id="sidebar"
        class="sidebar"
        aria-label="目次"
        :class="{ open: sidebarOpen }"
        @keydown.escape="closeSidebar"
      >
        <ul class="sidebar-nav">
          <li>
            <a
              href="#about-this-guide"
              :class="{ active: activeId === 'about-this-guide' }"
              :aria-current="activeId === 'about-this-guide' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:book" aria-hidden="true" />このガイドについて
            </a>
          </li>
          <li>
            <a
              href="#why-five-events"
              :class="{ active: activeId === 'why-five-events' }"
              :aria-current="activeId === 'why-five-events' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:sitemap" aria-hidden="true" />なぜ5つのイベントか
            </a>
          </li>
          <li>
            <a
              href="#the-sprint"
              :class="{ active: activeId === 'the-sprint' }"
              :aria-current="activeId === 'the-sprint' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:refresh" aria-hidden="true" />The Sprint
            </a>
          </li>
          <li>
            <a
              href="#sprint-planning"
              :class="{ active: activeId === 'sprint-planning' }"
              :aria-current="activeId === 'sprint-planning' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-list" aria-hidden="true" />Sprint Planning
            </a>
          </li>
          <li>
            <a
              href="#daily-scrum"
              :class="{ active: activeId === 'daily-scrum' }"
              :aria-current="activeId === 'daily-scrum' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:users-group" aria-hidden="true" />Daily Scrum
            </a>
          </li>
          <li>
            <a
              href="#sprint-review"
              :class="{ active: activeId === 'sprint-review' }"
              :aria-current="activeId === 'sprint-review' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:presentation" aria-hidden="true" />Sprint Review
            </a>
          </li>
          <li>
            <a
              href="#sprint-retrospective"
              :class="{ active: activeId === 'sprint-retrospective' }"
              :aria-current="activeId === 'sprint-retrospective' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:repeat" aria-hidden="true" />Sprint Retrospective
            </a>
          </li>
          <li>
            <a
              href="#event-relationships"
              :class="{ active: activeId === 'event-relationships' }"
              :aria-current="activeId === 'event-relationships' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:git-branch" aria-hidden="true" />イベントの相互関係
            </a>
          </li>
          <li>
            <a
              href="#timebox-comparison"
              :class="{ active: activeId === 'timebox-comparison' }"
              :aria-current="activeId === 'timebox-comparison' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:clock" aria-hidden="true" />タイムボックス比較表
            </a>
          </li>
          <li>
            <a
              href="#definition-of-done"
              :class="{ active: activeId === 'definition-of-done' }"
              :aria-current="activeId === 'definition-of-done' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:shield-check" aria-hidden="true" />Definition of Done
            </a>
          </li>
          <li>
            <a
              href="#lo-mapping"
              :class="{ active: activeId === 'lo-mapping' }"
              :aria-current="activeId === 'lo-mapping' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:map-2" aria-hidden="true" />学習目標対応表
            </a>
          </li>
          <li>
            <a
              href="#exam-overview"
              :class="{ active: activeId === 'exam-overview' }"
              :aria-current="activeId === 'exam-overview' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:calendar-event" aria-hidden="true" />CSM試験の概要
            </a>
          </li>
          <li>
            <a
              href="#faq"
              :class="{ active: activeId === 'faq' }"
              :aria-current="activeId === 'faq' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:help-circle" aria-hidden="true" />よくある誤解
            </a>
          </li>
          <li>
            <a
              href="#checklist"
              :class="{ active: activeId === 'checklist' }"
              :aria-current="activeId === 'checklist' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:list-check" aria-hidden="true" />学習チェックリスト
            </a>
          </li>
          <li>
            <a
              href="#references"
              :class="{ active: activeId === 'references' }"
              :aria-current="activeId === 'references' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:link" aria-hidden="true" />参考文献・出典
            </a>
          </li>
        </ul>
      </nav>

      <main id="main-content" class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance(R) CSM(R) 対応</div>
          <h1>Scrum Events 完全ガイド</h1>
          <p class="hero-lede">
            本ガイドは、Scrum Alliance&reg; の Certified ScrumMaster&reg;(CSM&reg;) 認定における出題範囲のうち、Scrum Events(スクラムイベント／スクラムの5つのイベント)について、初学者が体系的に理解できるようステップバイステップでまとめたものです。
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">Scrum Events(5つのイベント)</div></div>
            <div class="stat-card"><div class="stat-number">8時間</div><div class="stat-label">Sprint Planningの上限(1か月Sprint)</div></div>
            <div class="stat-card"><div class="stat-number">15分</div><div class="stat-label">Daily Scrumのタイムボックス</div></div>
            <div class="stat-card"><div class="stat-number">37/50問</div><div class="stat-label">CSM試験の合格ライン</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            このページは学習支援を目的とした非公式の解説資料です。Scrum GuideおよびScrum Allianceの一次情報を要約・解説したものであり、公式教材ではありません。正確な定義・最新の試験情報は必ず<a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>でご確認ください。
          </div>
        </div>

        <section id="about-this-guide">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book" aria-hidden="true" />SECTION 01</div>
          <h2>このガイドについて</h2>

          <ul>
            <li>一次情報源として<strong>The 2020 Scrum Guide(TM)</strong>(Ken Schwaber &amp; Jeff Sutherland 著)と、Scrum Allianceが公開する<strong>CSM Learning Objectives(2022年1月版)</strong>を用いています。</li>
            <li>各セクションには「進め方」「ベストプラクティス」「CSM試験ポイント」「アンチパターン」「出典」を設け、学習と実務の両方に使える構成にしています。</li>
            <li>図解はすべてMermaidで作成しており、ASCIIアートは使用していません。</li>
            <li>用語はScrum Guide日本語版の翻訳方針(Scrum, Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective, Product Owner, Scrum Master, Developers, Increment, Definition of Doneは翻訳しない)に準拠し、英語表記を保持しています。</li>
          </ul>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p>Scrum Guideは著作権(&copy; 2020 Ken Schwaber and Jeff Sutherland)のもとCC BY-SA 4.0ライセンスで提供されています。本ガイドは同ガイドの要約・解説であり、原文の再配布ではありません。正確な定義は必ず一次情報源をご確認ください。</p>
          </div>
        </section>

        <section id="why-five-events">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:sitemap" aria-hidden="true" />SECTION 02</div>
          <h2>なぜ「5つのイベント」なのか</h2>

          <p>Scrum Guideは次のように説明しています。</p>
          <p><em>Scrum combines four formal events for inspection and adaptation within a containing event, the Sprint.</em>(Scrumは、検査と適応のための4つの正式なイベントを、それらを包含するイベントであるSprintの中で組み合わせる)</p>
          <p>つまり「5つのイベント」とは、次の5つを指します。</p>
          <ol>
            <li><strong>Sprint</strong>(すべてを包含するコンテナイベント)</li>
            <li><strong>Sprint Planning</strong></li>
            <li><strong>Daily Scrum</strong></li>
            <li><strong>Sprint Review</strong></li>
            <li><strong>Sprint Retrospective</strong></li>
          </ol>
          <p>2〜5の4イベントは、1のSprintという入れ物の中で実施されます。これらのイベントはScrumの経験主義(empiricism)を支える3本柱 ―― <strong>透明性(Transparency)・検査(Inspection)・適応(Adaptation)</strong> ―― を実現するための「検査と適応の定例の場」として設計されています。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_WHY_FIVE_EVENTS" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">Sprintという入れ物の中で4つのイベントが繰り返される構造</div>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;Scrum Theory&quot; / &quot;Scrum Events&quot; 節</a></li>
            </ul>
          </div>
        </section>

        <section id="the-sprint">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 03</div>
          <h2>The Sprint(スプリント)― すべてを包含するコンテナイベント</h2>

          <h3>目的</h3>
          <p>Sprintは「アイデアを価値に変換する心臓の鼓動(heartbeat)」と表現されます。Product Goalの達成に必要なすべての作業(Sprint Planning、Daily Scrum、Sprint Review、Sprint Retrospective)はSprintの中で行われます。</p>

          <h3>基本ルール</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>長さ</td><td>1か月以内の固定長。短いほど学習サイクルが増え、コストとリスクの範囲を限定できる</td></tr>
                <tr><td>開始</td><td>直前のSprintが終了した直後に、新しいSprintが即座に開始する(空白期間を作らない)</td></tr>
                <tr><td>Sprint中の禁止事項</td><td>Sprint Goalを危うくするような変更を行わない</td></tr>
                <tr><td>品質</td><td>品質を低下させない</td></tr>
                <tr><td>Product Backlog</td><td>必要に応じてリファインメント(refinement)を続ける</td></tr>
                <tr><td>スコープ</td><td>学習が進むにつれ、Product Ownerと共にスコープを明確化・再交渉してよい</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Sprintの中止(Sprint Cancellation)</h3>
          <ul>
            <li>Sprint Goalが陳腐化した場合、Sprintを中止できます。</li>
            <li>中止できるのは<strong>Product Ownerのみ</strong>です(CSM試験で頻出の論点)。</li>
          </ul>

          <h3>進め方(ステップバイステップの捉え方)</h3>
          <ol>
            <li>前のSprintのSprint Retrospectiveが終わった瞬間に、新しいSprintが始まる。</li>
            <li>Sprint PlanningでこのSprintのSprint Goalを定め、それを達成するための計画(Sprint Backlog)を立てる。Sprint BacklogはDevelopersの計画であり、Sprint中も学びに応じて更新され続ける。</li>
            <li>Sprint期間中、Developersは毎日Daily Scrumで進捗を検査し、計画を調整する。</li>
            <li>Sprint終了直前にSprint Reviewで成果物(Increment)を検査し、今後の方向性を適応する。</li>
            <li>Sprintの最後にSprint Retrospectiveでチームの働き方そのものを検査し、改善策を計画する。</li>
            <li>Retrospective終了と同時に次のSprintが始まる(1に戻る)。</li>
          </ol>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>Sprintの長さはチームの学習サイクルとリスク許容度に応じて決める。不確実性が高いほど短く(1〜2週間)する。</li>
              <li>すべてのイベントを毎回同じ曜日・時間・場所で開催し、認知負荷とスケジューリングコストを下げる。</li>
              <li>Sprint中に新しい緊急要求が来た場合は、Sprint Goalを壊さない範囲でのみ受け入れ、原則は次のSprintのProduct Backlogに積む。</li>
            </ul>
          </div>

          <h4>CSM試験ポイント</h4>
          <ul>
            <li>LO1.14「Sprintが早期に終了しうる条件」に対応:Sprint Goalの陳腐化のみが正当な中止理由であり、権限はProduct Ownerに限定される。</li>
            <li>Sprintは「他の4つのイベントを包含するコンテナ」であるという位置づけが、5イベント構造を理解する鍵になる。</li>
          </ul>

          <h4>アンチパターン</h4>
          <ul>
            <li>Sprintの長さを毎回バラバラに変える(予測可能性が失われる)。</li>
            <li>Scrum Master・開発者がSprintを中止する、または「なんとなく」延長する。</li>
            <li>Sprintとリリースを同一視し、「Sprint Review=リリース判定ゲート」だと誤解する。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;The Sprint&quot; 節</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">CSM Learning Objectives 2022, LO1.14</a></li>
            </ul>
          </div>
        </section>

        <section id="sprint-planning">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-list" aria-hidden="true" />SECTION 04</div>
          <h2>Sprint Planning(スプリントプランニング)</h2>

          <h3>目的</h3>
          <p>Sprint Planningは Sprintを開始させる イベントで、Sprintで行う作業を洗い出します。この計画はScrum Team全体の協働作業によって作られます。</p>

          <h3>参加者</h3>
          <ul>
            <li>Scrum Team全体(Product Owner・Scrum Master・Developers)</li>
            <li>必要に応じて助言のために他者を招待してもよい</li>
          </ul>

          <h3>タイムボックス</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Sprint長</th><th>Sprint Planningの最大時間</th></tr></thead>
              <tbody>
                <tr><td>1か月</td><td>8時間</td></tr>
                <tr><td>それより短いSprint</td><td>通常はより短い(目安として比例配分で考えるとよい)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>3つのトピック(Why・What・How)</h3>
          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_SPRINT_PLANNING_TOPICS" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">Sprint Planningの3トピックとSprint Backlogの関係</div>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>トピック</th><th>主導する人</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>Why(なぜ)</td><td>Product Ownerが提案し、Scrum Team全体で協働</td><td>プロダクトの価値・有用性をどう高めるかを提案し、Sprint Goalを定義する</td></tr>
                <tr><td>What(何を)</td><td>Product OwnerとDevelopersの対話</td><td>Product Backlogから今回のSprintに含める項目を選択する(必要に応じてリファインメントも行う)</td></tr>
                <tr><td>How(どうやって)</td><td>Developersのみが決定</td><td>選択した項目をDoneにするための作業計画を立てる。1日以下の作業に分解することが多い。進め方はDevelopers以外が指図しない</td></tr>
              </tbody>
            </table>
          </div>
          <p>Sprint Goal・選択したProduct Backlog Item・その実行計画をあわせて<strong>Sprint Backlog</strong>と呼びます。</p>

          <h3>進め方(ステップバイステップ)</h3>
          <ol>
            <li>Product Ownerが、価値の高いProduct Backlog Itemとその狙い(Why)を提示する。</li>
            <li>Scrum Team全体でSprint Goalを議論し、Planning終了までに確定させる。</li>
            <li>Developersが過去の実績・今後のキャパシティ・Definition of Doneを踏まえ、今回Doneにできる項目(What)を選ぶ。</li>
            <li>Developersが選択した項目を1日以下のタスクに分解し、実行計画(How)を作る。</li>
            <li>Sprint Goal・選択項目・計画をまとめてSprint Backlogとして可視化する。</li>
          </ol>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>Sprint Goalを1文で言語化し、チーム外の人にも説明できる状態にする。</li>
              <li>What(選択量)の見積もりは、ベロシティなど過去の実績データを参照しつつも、それに固執しすぎない。</li>
              <li>Howの計画はDevelopers自身が作る。Scrum MasterやProduct Ownerが「どう作業すべきか」を指図しない。</li>
              <li>Product Backlogのリファインメントを普段から行っておくと、Planning当日の議論が速くなる。</li>
            </ul>
          </div>

          <h4>CSM試験ポイント</h4>
          <ul>
            <li>LO1.8「Sprint Planningを実施する」に対応。3トピック(Why/What/How)の順序と役割分担を正しく説明できるようにする。</li>
            <li>「Sprint Goalは誰が最終確定するか」→ Scrum Team全体の協働。</li>
            <li>「作業計画(How)を誰が決めるか」→ Developersのみ。</li>
          </ul>

          <h4>アンチパターン</h4>
          <ul>
            <li>Product OwnerやScrum Masterが、Developersのタスク分解方法にまで介入する。</li>
            <li>Sprint Goalを作らず、Product Backlog Itemの寄せ集めをそのまま「計画」と呼ぶ。</li>
            <li>キャパシティを無視して「積めるだけ積む」計画にし、Sprintの途中で破綻する。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;Sprint Planning&quot; 節</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">CSM Learning Objectives 2022, LO1.8</a></li>
            </ul>
          </div>
        </section>

        <section id="daily-scrum">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 05</div>
          <h2>Daily Scrum(デイリースクラム)</h2>

          <h3>目的</h3>
          <p>Daily Scrumの目的は、<strong>Sprint Goalへの進捗を検査し、必要に応じてSprint Backlogを適応させる</strong>ことです。</p>

          <h3>参加者とタイムボックス</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>対象者</td><td>Developers(Product OwnerやScrum MasterがSprint Backlogの作業に実際に取り組んでいる場合はDevelopersとして参加)</td></tr>
                <tr><td>時間</td><td>15分</td></tr>
                <tr><td>頻度・場所</td><td>複雑さを減らすため、Sprintの作業日ごとに同じ時間・同じ場所で開催する</td></tr>
              </tbody>
            </table>
          </div>

          <h3>進め方</h3>
          <p>構成や手法(いわゆる「昨日やったこと・今日やること・障害」の3問形式など)はDevelopersが自由に選んでよい。唯一の必須条件は、Sprint Goalへの進捗にフォーカスし、翌日の作業について実行可能な計画を生み出すことです。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_DAILY_SCRUM_LOOP" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">Daily Scrumで繰り返される検査から計画調整までの流れ</div>
          </div>

          <p>Daily Scrumは、Developersが計画を調整できる唯一の機会ではありません。より詳細な再計画のために、Developersは1日の中で他にも随時集まることがあります。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>「進捗報告会」ではなく「明日の計画を作る場」と位置づける。</li>
              <li>タイムボックス(15分)を厳守する。</li>
              <li>フォーマットはチームに委ねる。</li>
            </ul>
          </div>

          <h4>CSM試験ポイント</h4>
          <ul>
            <li>LO1.12「DevelopersがどのようにDaily Scrumを行うか説明する」/ LO1.13「Daily ScrumがStatus Meetingと異なる点を3つ以上」に対応。</li>
            <li>Daily Scrumがstatus meetingと異なる代表的な点は、対象が自己管理のための調整であること、アウトプットが翌日の実行可能な計画であること、主催者・参加必須者がDevelopersであること、時間制約が自己管理を支えるために存在することの4点である。</li>
            <li>Product OwnerやScrum Masterも、作業に実際に取り組んでいる場合のみDevelopersとして参加できる。</li>
          </ul>

          <h4>アンチパターン</h4>
          <ul>
            <li>Scrum Masterが一人ひとりに順番に質問し、進捗を「聞き取る」形式にしてしまう。</li>
            <li>15分を大幅に超えて技術的な議論を続けてしまう。</li>
            <li>Product OwnerやマネージャーへのアップデートとしてDaily Scrumを使う。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;Daily Scrum&quot; 節</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">CSM Learning Objectives 2022, LO1.12 / LO1.13</a></li>
            </ul>
          </div>
        </section>

        <section id="sprint-review">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:presentation" aria-hidden="true" />SECTION 06</div>
          <h2>Sprint Review(スプリントレビュー)</h2>

          <h3>目的</h3>
          <p>Sprint Reviewの目的は、Sprintの成果(Increment)を検査し、今後の適応を決定することです。</p>

          <h3>参加者とタイムボックス</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>参加者</td><td>Scrum Team + 主要なステークホルダー</td></tr>
                <tr><td>Sprint内の位置づけ</td><td>Sprintの最後から2番目のイベント</td></tr>
                <tr><td>時間</td><td>1か月Sprintで最大4時間(短いSprintでは比例して短くなる)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>内容と性質</h3>
          <ul>
            <li>Scrum Teamとステークホルダーは、Sprintで達成したことと、周囲の環境変化を確認する。</li>
            <li>そのうえで参加者全員で「次に何をすべきか」を協働で決める。</li>
            <li>結果としてProduct Backlogが更新されることもある。</li>
            <li>Sprint Reviewは「作業セッション」であり、単なる「発表(プレゼンテーション)」に終始してはいけません。</li>
            <li>Sprint Reviewはリリースの関門(ゲート)ではありません。Increment は Sprint終了前でもステークホルダーに届けてよいとされています。</li>
          </ul>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_SPRINT_REVIEW_FLOW" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">Sprint Reviewで成果を検査し次の方向性を適応する流れ</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>事前に作り込んだスライドでの一方的な発表にせず、実際に動くIncrementをその場で操作しながら対話する。</li>
              <li>ステークホルダーからのフィードバックをその場でProduct Backlogに反映することを前提に設計する。</li>
              <li>「今回できたこと」だけでなく「環境の変化」も議題に含める。</li>
            </ul>
          </div>

          <h4>CSM試験ポイント</h4>
          <ul>
            <li>LO1.9「Sprint Reviewを実施する」に対応。</li>
            <li>Sprint Reviewはリリース判定会議ではなく、Incrementのリリースはいつでも可能。</li>
            <li>Sprint Reviewは「発表」ではなく「作業セッション(working session)」である。</li>
          </ul>

          <h4>アンチパターン</h4>
          <ul>
            <li>デモを完璧に見せるための「作り込み」に時間を使いすぎる。</li>
            <li>ステークホルダーを呼ばず、チーム内だけで完結させてしまう。</li>
            <li>Sprint Reviewを「合否判定」の場として恐れの対象にしてしまう。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;Sprint Review&quot; 節</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">CSM Learning Objectives 2022, LO1.9</a></li>
            </ul>
          </div>
        </section>

        <section id="sprint-retrospective">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:repeat" aria-hidden="true" />SECTION 07</div>
          <h2>Sprint Retrospective(スプリントレトロスペクティブ)</h2>

          <h3>目的</h3>
          <p>Sprint Retrospectiveの目的は、品質と効果を高める方法を計画することです。</p>

          <h3>参加者とタイムボックス</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>参加者</td><td>Scrum Team全体</td></tr>
                <tr><td>Sprint内の位置づけ</td><td>Sprintを締めくくる(Sprintの最後のイベント)</td></tr>
                <tr><td>時間</td><td>1か月Sprintで最大3時間(短いSprintでは比例して短くなる)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>検査する対象</h3>
          <p>Scrum Teamは、直前のSprintがどうだったかを個々人・相互作用・プロセス・ツール・Definition of Doneの観点から検査します。検査する要素は仕事のドメインによって異なることがあります。チームは、うまくいったこと・直面した問題・その問題が解決できたかを議論し、誤った前提があればその原因を掘り下げます。</p>

          <h3>進め方(ステップバイステップ)</h3>
          <ol>
            <li>直前のSprintで「うまくいったこと」を洗い出す。</li>
            <li>直前のSprintで「問題になったこと」を洗い出す。</li>
            <li>それらの問題がどう対処されたかを議論する。</li>
            <li>最も効果が見込める改善策を特定する。</li>
            <li>影響の大きい改善策から順に、できるだけ早く着手する。</li>
          </ol>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_RETROSPECTIVE_FLOW" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">Sprint Retrospectiveで検査から改善着手までを進める流れ</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>「誰が悪かったか」ではなく「プロセス・仕組みとして何を変えられるか」に焦点を当てる。</li>
              <li>改善策は絞り込む。</li>
              <li>定期的にフォーマット(KPT、Start-Stop-Continueなど)を変え、マンネリ化を防ぐ。</li>
              <li>改善策は「誰が」「いつまでに」実行するかまで具体化する。</li>
            </ul>
          </div>

          <h4>CSM試験ポイント</h4>
          <ul>
            <li>LO1.10「Sprint Retrospectiveを実施する」、LO1.11「Sprint Retrospectiveを省略した場合の影響を3つ以上説明する」に対応。</li>
            <li>Retrospectiveを省略した場合の代表的な影響は、プロセス上の問題が可視化・改善されないまま蓄積すること、検査が行われないため適応も起きず経験主義のサイクルが機能しなくなること、同じ問題が繰り返し発生しチームの士気やベロシティの安定性が損なわれることの3点である。</li>
            <li>Sprint RetrospectiveはSprintを「締めくくる」イベントである。</li>
          </ul>

          <h4>アンチパターン</h4>
          <ul>
            <li>忙しさを理由にRetrospectiveを省略・短縮し続ける。</li>
            <li>個人への批判や犯人探しの場になってしまう。</li>
            <li>改善アクションを洗い出すだけで、実際には誰も実行しない。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;Sprint Retrospective&quot; 節</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">CSM Learning Objectives 2022, LO1.10 / LO1.11</a></li>
            </ul>
          </div>
        </section>

        <section id="event-relationships">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 08</div>
          <h2>5つのイベントの相互関係</h2>

          <h3>1つのSprintの中での時系列イメージ(2週間Sprintの例)</h3>
          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_SPRINT_TIMELINE" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">2週間Sprintにおけるイベントの実施順序の例</div>
          </div>

          <h3>経験主義の3本柱とイベントの対応</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Scrumの柱</th><th>意味</th><th>主に対応するイベント</th></tr></thead>
              <tbody>
                <tr><td>透明性(Transparency)</td><td>作業とその状況が、行う人にも受け取る人にも見える状態であること</td><td>すべてのイベントの前提条件</td></tr>
                <tr><td>検査(Inspection)</td><td>成果物や進捗を頻繁かつ注意深く検査し、望ましくない変化を検出すること</td><td>Daily Scrum(進捗)、Sprint Review(成果物)、Sprint Retrospective(プロセス)</td></tr>
                <tr><td>適応(Adaptation)</td><td>逸脱を検出したら、できるだけ早く調整すること</td><td>Daily Scrum(翌日の計画)、Sprint Review(Product Backlog更新)、Sprint Retrospective(改善策)</td></tr>
              </tbody>
            </table>
          </div>
          <p>Sprint Planningは、このサイクル全体の起点として「今回何を検査・適応の対象にするか(Sprint Goal)」を定義する役割を担います。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;Scrum Theory&quot; 節</a></li>
            </ul>
          </div>
        </section>

        <section id="timebox-comparison">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clock" aria-hidden="true" />SECTION 09</div>
          <h2>タイムボックス比較表(1か月Sprintを基準)</h2>

          <div class="table-wrap">
            <table>
              <thead><tr><th>イベント</th><th>目的(一言)</th><th>主な参加者</th><th>タイムボックス</th><th>Sprint内の位置</th><th>主なアウトプット</th></tr></thead>
              <tbody>
                <tr><td>Sprint</td><td>他の4イベントを包含するコンテナ</td><td>Scrum Team全体</td><td>1か月以内(固定長)</td><td>最初から最後まで</td><td>Increment(累積)</td></tr>
                <tr><td>Sprint Planning</td><td>今回のSprintで行う作業を計画する</td><td>Scrum Team全体(+任意参加者)</td><td>最大8時間</td><td>Sprintの開始</td><td>Sprint Backlog(Goal・選択Item・計画)</td></tr>
                <tr><td>Daily Scrum</td><td>Sprint Goalへの進捗を検査し計画を調整する</td><td>Developers</td><td>15分</td><td>毎作業日</td><td>翌日の実行可能な計画</td></tr>
                <tr><td>Sprint Review</td><td>Sprintの成果を検査し今後を適応する</td><td>Scrum Team + ステークホルダー</td><td>最大4時間</td><td>最後から2番目</td><td>更新されたProduct Backlog、フィードバック</td></tr>
                <tr><td>Sprint Retrospective</td><td>品質と効果を高める方法を計画する</td><td>Scrum Team全体</td><td>最大3時間</td><td>Sprintを締めくくる</td><td>優先度づけられた改善アクション</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p>短いSprintの場合、各イベントのタイムボックスは上表の値を上限として比例的に短くなるのが一般的な運用です。</p>
          </div>
        </section>

        <section id="definition-of-done">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:shield-check" aria-hidden="true" />SECTION 10</div>
          <h2>Definition of Done とイベントの関係</h2>

          <p>Definition of Done(DoD)はイベントそのものではなくIncrement(成果物)の完成の合意ですが、CSMの学習目標ではScrum Eventsと併せて扱われるため、ここで簡潔に補足します。</p>

          <ul>
            <li>DoDを満たした瞬間にProduct Backlog ItemはIncrementになる。</li>
            <li>DoDを満たさない項目はリリースできず、Sprint Reviewで提示することもできない。</li>
            <li>強固なDoDの利点は、次の3点である。
              <ol>
                <li>完成の基準がチーム内外で共通認識になり、Sprint Reviewでの手戻りを防ぐ</li>
                <li>技術的負債の蓄積を抑え、Increment間の整合性を保ちやすくする</li>
                <li>Sprint Planningでの見積もりの精度が上がる</li>
              </ol>
            </li>
            <li>DoDの作成方法の一例:組織標準のDoDがあればそれを最低限として採用し、なければScrum Teamがプロダクトに適した基準を協働で作成する。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">The 2020 Scrum Guide, &quot;Increment&quot; 節</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">CSM Learning Objectives 2022, LO1.15 / LO1.16</a></li>
            </ul>
          </div>
        </section>

        <section id="lo-mapping">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 11</div>
          <h2>CSM Learning Objectives 対応表(Scrum Events関連: LO1.7〜1.16)</h2>

          <div class="table-wrap">
            <table>
              <thead><tr><th>LO番号</th><th>学習目標の要約</th><th>本ガイドの対応セクション</th></tr></thead>
              <tbody>
                <tr><td>1.7</td><td>各Scrum eventで透明性を高めるためのinspect and adaptの例を挙げる</td><td>8. イベントの相互関係</td></tr>
                <tr><td>1.8</td><td>Sprint Planningを実施する</td><td>4. Sprint Planning</td></tr>
                <tr><td>1.9</td><td>Sprint Reviewを実施する</td><td>6. Sprint Review</td></tr>
                <tr><td>1.10</td><td>Sprint Retrospectiveを実施する</td><td>7. Sprint Retrospective</td></tr>
                <tr><td>1.11</td><td>Sprint Retrospectiveを省略した場合の影響を3つ以上説明する</td><td>7. Sprint RetrospectiveのCSM試験ポイント</td></tr>
                <tr><td>1.12</td><td>DevelopersがどのようにDaily Scrumを行うか説明する</td><td>5. Daily Scrum</td></tr>
                <tr><td>1.13</td><td>Daily Scrumがstatus meetingと異なる点を3つ以上、制約の理由を議論する</td><td>5. Daily Scrumの進め方</td></tr>
                <tr><td>1.14</td><td>Sprintが早期終了しうる条件を説明する</td><td>3. Sprintの中止</td></tr>
                <tr><td>1.15</td><td>強固なDefinition of Doneの利点を3つ以上説明する</td><td>10. Definition of Done</td></tr>
                <tr><td>1.16</td><td>Definition of Doneを作成する方法を示す</td><td>10. Definition of Done</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance, CSM Learning Objectives(Last Updated: January 2022)</a></li>
            </ul>
          </div>
        </section>

        <section id="exam-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:calendar-event" aria-hidden="true" />SECTION 12</div>
          <h2>CSM試験の概要(参考情報)</h2>

          <p>Scrum Alliance公式ページに基づく、CSM認定試験の概要は以下の通りです。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>トレーニング時間</td><td>16時間(2〜3日間で実施されることが多い)</td></tr>
                <tr><td>試験形式</td><td>オンライン多肢選択式(50問)</td></tr>
                <tr><td>合格基準</td><td>50問中37問正解</td></tr>
                <tr><td>制限時間</td><td>1時間</td></tr>
                <tr><td>受験機会</td><td>最初のウェルカムメール受信日から90日以内は、受験費用込みで最大2回まで受験できる。90日を過ぎた場合や2回とも不合格だった場合も受験は可能だが、1回につき25米ドルの受験料が別途必要になる</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p>価格や運用ルールはトレーナー・地域・時期により変動するため、最新情報は必ずScrum Alliance公式ページで確認してください。</p>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance, &quot;Certified ScrumMaster (CSM) Certification&quot;</a></li>
              <li><a href="https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test" target="_blank" rel="noopener">Scrum Alliance Support, &quot;How do I take the CSM test?&quot;</a></li>
            </ul>
          </div>
        </section>

        <section id="faq">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:help-circle" aria-hidden="true" />SECTION 13</div>
          <h2>よくある誤解(FAQ形式)</h2>

          <h3>Q1. Daily Scrumは進捗をScrum Masterに報告する場ですか?</h3>
          <p>A. いいえ。目的はSprint Goalへの進捗を検査し、Developers自身が翌日の計画を調整することです。</p>

          <h3>Q2. Sprint Reviewでデモが失敗したら不合格・失敗ということですか?</h3>
          <p>A. いいえ。Sprint Reviewはリリース判定の関門ではなく、成果を検査し今後を適応するための作業セッションです。</p>

          <h3>Q3. Sprintの作業計画(How)はScrum Masterが決めるのですか?</h3>
          <p>A. いいえ。Howを決めるのはDevelopersのみです。</p>

          <h3>Q4. Sprint Retrospectiveは忙しいときは省略してよいですか?</h3>
          <p>A. 推奨されません。省略するとプロセス上の問題が可視化・改善されないまま蓄積します。</p>

          <h3>Q5. すべてのイベントは必ず対面で同じ場所で行う必要がありますか?</h3>
          <p>A. Scrum Guideは「最適には同じ時間・場所で開催する」としており、絶対的な必須ルールではありません。</p>
        </section>

        <section id="checklist">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 14</div>
          <h2>学習チェックリスト</h2>

          <ul>
            <li>5つのイベントの名称と、Sprintが他4イベントを包含するコンテナであることを説明できる</li>
            <li>各イベントの目的を、Scrum Guideの言葉に近い形で1文で言える</li>
            <li>各イベントの参加者とタイムボックスを暗記している</li>
            <li>Sprint Planningの3トピック(Why/What/How)と、それぞれの意思決定者を説明できる</li>
            <li>Daily Scrumがstatus meetingと異なる点を3つ以上説明できる</li>
            <li>Sprint Reviewが「リリースの関門ではない」ことと「作業セッションである」ことを説明できる</li>
            <li>Sprint Retrospectiveで検査する5つの観点を挙げられる</li>
            <li>Sprint Retrospectiveを省略した場合の影響を3つ以上説明できる</li>
            <li>Sprintを中止できるのはProduct Ownerのみであることを説明できる</li>
            <li>強固なDefinition of Doneの利点を3つ以上説明できる</li>
          </ul>
        </section>

        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 15</div>
          <h2>参考文献・出典一覧</h2>

          <div class="ref-group">
            <h3>出典一覧</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Ken Schwaber &amp; Jeff Sutherland, The 2020 Scrum Guide(HTML版)</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
              <li><span class="ref-name">Ken Schwaber &amp; Jeff Sutherland, 2020 Scrum Guide(英語版PDF)</span><a class="ref-url" href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf</a></li>
              <li><span class="ref-name">Ken Schwaber &amp; Jeff Sutherland, スクラムガイド(日本語版PDF)</span><a class="ref-url" href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Japanese.pdf" target="_blank" rel="noopener">https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Japanese.pdf</a></li>
              <li><span class="ref-name">Scrum Alliance, Certified ScrumMaster (CSM) Certification</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster</a></li>
              <li><span class="ref-name">Scrum Alliance, CSM Learning Objectives</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf</a></li>
              <li><span class="ref-name">Scrum Alliance, Scrum Foundations Learning Objectives</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf</a></li>
              <li><span class="ref-name">Scrum Alliance, Scrum Values</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
              <li><span class="ref-name">Scrum Alliance Support, How do I take the CSM test?</span><a class="ref-url" href="https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test" target="_blank" rel="noopener">https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test</a></li>
              <li><span class="ref-name">Manifesto for Agile Software Development</span><a class="ref-url" href="https://agilemanifesto.org" target="_blank" rel="noopener">https://agilemanifesto.org</a></li>
            </ul>
          </div>
        </section>

        <footer>
          Scrum, Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective はScrum Guideで定義される用語です。Certified ScrumMaster(R) および CSM(R) はScrum Alliance(R)の登録商標です。本ページはScrum Allianceによる公式認定教材ではありません。 The Scrum Guide is &copy; 2020 Ken Schwaber and Jeff Sutherland, and is made available under the Creative Commons Attribution-ShareAlike 4.0 International License(CC BY-SA 4.0) &mdash; <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" target="_blank" rel="noopener">creativecommons.org/licenses/by-sa/4.0/legalcode</a>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.guide-container {
  min-height: 100vh;
  background: var(--color-paper);
}

.layout {
  display: block;
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

.sidebar-nav a :deep(svg) {
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
  border-left: 2px solid var(--color-indigo);
}

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
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 16px;
  margin-top: 28px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.disclaimer-box :deep(svg) {
  flex: none;
  margin-top: 4px;
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
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
  margin: 24px 0;
}

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
