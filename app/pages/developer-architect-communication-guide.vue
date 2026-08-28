<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { MERMAID_THEME_VARIABLES } from "~/utils/mermaid-theme";

const TOC_IDS = [
  "introduction",
  "step-1-team-phase",
  "step-2-architect-elevator",
  "step-3-adr",
  "step-4-design-docs",
  "step-5-c4-model",
  "step-6-code-review",
  "step-7-async-communication",
  "step-8-tech-debt",
  "step-9-sqca",
  "summary-checklist",
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
  title: "開発者とアーキテクトのためのコミュニケーションガイド | ステップバイステップ実践ガイド",
  description: "Elastic Leadership、Architect Elevator、ADR、C4モデルなど、世界的に知られる開発者が実践するコミュニケーション手法を初学者向けに9つのステップで解説する実践ガイド。",
});

const DIAGRAM_ELASTIC_LEADERSHIP_PHASES = `flowchart TB
    OBS["チームの状態を観察する"] --> Q{"チームは今どのフェーズか"}
    Q -->|"常に火消しに追われている"| SURV["サバイバルモード"]
    Q -->|"新しいスキルを習得している最中"| LEARN["ラーニングモード"]
    Q -->|"自分たちで判断し前進できる"| SELF["自己組織化モード"]
    SURV --> SURV1["具体的な指示を出し短期の生存を優先する"]
    LEARN --> LEARN1["問いかけて学習の時間を確保する"]
    SELF --> SELF1["権限を移譲し意思決定を任せる"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q hub;
    class SELF1 done;`;

const DIAGRAM_ARCHITECT_ELEVATOR = `flowchart TB
    P["ペントハウス 経営 事業戦略が決まる場所"]
    M["中間階 予算とロードマップが決まる場所"]
    E["エンジンルーム 実装と技術的詳細が決まる場所"]
    P --> M --> E
    A(("架け橋になる人"))
    A -.-> P
    A -.-> M
    A -.-> E

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A hub;`;

const DIAGRAM_ADR_LIFECYCLE = `flowchart LR
    D["課題に気づく"] --> PR["ドラフトを書く Proposed"]
    PR --> AC["チームで合意する Accepted"]
    AC --> USE["設計 実装に反映する"]
    AC -.-> DEP["状況が変わり非推奨になる Deprecated"]
    AC -.-> SUP["新しい決定で置き換わる Superseded"]
    SUP --> NEW["新しいADRを書く"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class AC hub;
    class USE done;`;

const DIAGRAM_DESIGN_DOC_FLOW = `flowchart TB
    ISSUE["解決したい課題を1行で書く"] --> DRAFT["一人でドラフトを書く"]
    DRAFT --> SHARE["関係者に事前共有する"]
    SHARE --> REVIEW["非同期でコメントを集める"]
    REVIEW --> SYNC{"意見が大きく割れているか"}
    SYNC -->|"はい"| MEET["短い同期ミーティングで論点を絞る"]
    SYNC -->|"いいえ"| CONSENSUS["合意形成"]
    MEET --> CONSENSUS
    CONSENSUS --> IMPL["実装を開始する"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class SYNC hub;
    class IMPL done;`;

const DIAGRAM_C4_MODEL_LEVELS = `flowchart TB
    L1["レベル1 システムコンテキスト 誰が使いどのシステムと連携するか"]
    L2["レベル2 コンテナ どのアプリやデータストアで構成されるか"]
    L3["レベル3 コンポーネント コンテナ内部のモジュール構成"]
    L4["レベル4 コード クラスや関数レベルの実装"]
    L1 --> L2 --> L3 --> L4

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class L1 hub;
    class L4 done;`;

const DIAGRAM_CODE_REVIEW_DECISION = `flowchart TB
    START["レビューコメントを書く前に"] --> Q1{"技術的な根拠にもとづいているか"}
    Q1 -->|"いいえ 個人の好みだけ"| STYLE["スタイルガイドを確認し無ければ著者の判断を尊重する"]
    Q1 -->|"はい"| Q2{"必須の修正か 任意の提案か"}
    Q2 -->|"必須"| BLOCK["理由を添えて明確に指摘する"]
    Q2 -->|"任意"| NIT["Nit と明記し任意であることを伝える"]
    BLOCK --> WHY["コードについて語り人について語らない"]
    NIT --> WHY

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q1,Q2 hub;
    class WHY done;`;

const DIAGRAM_ASYNC_SYNC_DECISION = `flowchart TB
    NEED["伝えたいことがある"] --> Q{"緊急かつ結論が曖昧で議論が必要か"}
    Q -->|"はい"| SYNCC["同期 短い通話やミーティングを設定する"]
    Q -->|"いいえ"| ASYNCC["非同期 イシューやドキュメントに書く"]
    SYNCC --> WRITE1["結論は必ず書き残す"]
    ASYNCC --> WRITE2["検索可能な場所に残す"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q hub;
    class WRITE1,WRITE2 done;`;

const DIAGRAM_SQCA_STRUCTURE = `flowchart TB
    S["S 状況 前提となる背景を定義する"] --> C["C 複雑化要因 なぜ今それが問題なのか"]
    C --> Q["Q 問い 何を意思決定すべきかを一文で示す"]
    Q --> A["A 答え 推奨する結論を先に述べる"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q hub;
    class A done;`;
</script>

<template>
  <div>
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
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">Dev &amp; Architect Comms</div>
        <div class="brand-subtitle">コミュニケーション実践ガイド</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">はじめに</li>
      <li><a href="#introduction" :class="{ active: activeId === 'introduction' }" :aria-current="activeId === 'introduction' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:info-circle" aria-hidden="true" />はじめに</a></li>

      <li class="nav-group-label">9つの実践ステップ</li>
      <li><a href="#step-1-team-phase" :class="{ active: activeId === 'step-1-team-phase' }" :aria-current="activeId === 'step-1-team-phase' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />ステップ1 チームのフェーズ</a></li>
      <li><a href="#step-2-architect-elevator" :class="{ active: activeId === 'step-2-architect-elevator' }" :aria-current="activeId === 'step-2-architect-elevator' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:building-skyscraper" aria-hidden="true" />ステップ2 アーキテクト・エレベーター</a></li>
      <li><a href="#step-3-adr" :class="{ active: activeId === 'step-3-adr' }" :aria-current="activeId === 'step-3-adr' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:file-text" aria-hidden="true" />ステップ3 ADRで決定を残す</a></li>
      <li><a href="#step-4-design-docs" :class="{ active: activeId === 'step-4-design-docs' }" :aria-current="activeId === 'step-4-design-docs' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:notes" aria-hidden="true" />ステップ4 Design Doc / RFC</a></li>
      <li><a href="#step-5-c4-model" :class="{ active: activeId === 'step-5-c4-model' }" :aria-current="activeId === 'step-5-c4-model' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:sitemap" aria-hidden="true" />ステップ5 C4モデル</a></li>
      <li><a href="#step-6-code-review" :class="{ active: activeId === 'step-6-code-review' }" :aria-current="activeId === 'step-6-code-review' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:git-pull-request" aria-hidden="true" />ステップ6 コードレビュー</a></li>
      <li><a href="#step-7-async-communication" :class="{ active: activeId === 'step-7-async-communication' }" :aria-current="activeId === 'step-7-async-communication' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:clock-hour-4" aria-hidden="true" />ステップ7 非同期コミュニケーション</a></li>
      <li><a href="#step-8-tech-debt" :class="{ active: activeId === 'step-8-tech-debt' }" :aria-current="activeId === 'step-8-tech-debt' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:scale" aria-hidden="true" />ステップ8 技術的負債の翻訳</a></li>
      <li><a href="#step-9-sqca" :class="{ active: activeId === 'step-9-sqca' }" :aria-current="activeId === 'step-9-sqca' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:presentation" aria-hidden="true" />ステップ9 SQCAで伝える</a></li>

      <li class="nav-group-label">まとめ</li>
      <li><a href="#summary-checklist" :class="{ active: activeId === 'summary-checklist' }" :aria-current="activeId === 'summary-checklist' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />実践チェックリスト</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" :aria-current="activeId === 'references' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・出典</a></li>
    </ul>
  </nav>

  <!-- ===================== Main content ===================== -->
  <main class="main-content">

    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:message-2" aria-hidden="true" />COMMUNICATION GUIDE</div>
      <h1>開発者とアーキテクトのためのコミュニケーションガイド</h1>
      <p class="hero-lede">
        初学者向けベストプラクティス ステップバイステップ解説
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">9</div><div class="stat-label">実践ステップ数</div></div>
        <div class="stat-card"><div class="stat-number">8</div><div class="stat-label">Mermaid図解</div></div>
        <div class="stat-card"><div class="stat-number">23</div><div class="stat-label">参照した出典</div></div>
        <div class="stat-card"><div class="stat-number">2026.08.17</div><div class="stat-label">情報基準日</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは2026年8月17日時点の公開情報にもとづく教育目的の非公式解説記事です。各引用の正確性については、<a href="#references">参考文献・出典</a>に掲載した原文リンクを必ずご確認ください。</span>
      </div>
    </div>

    <!-- ===================== 01. Introduction ===================== -->
    <section id="introduction">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:info-circle" aria-hidden="true" />SECTION 01</div>
      <h2>はじめに — なぜ「技術力」と同じくらいコミュニケーションが重要なのか</h2>

      <p>ソフトウェアの世界では「良いコードを書ければ評価される」と考えがちですが、実際にはチームが大きくなるほど、また役職が上がるほど、<strong>書いたコードそのものよりも「考えを人に伝え、合意を作る力」が成果を左右する</strong>ようになります。</p>

      <p>Staff Engineer や Software Architect と呼ばれる人たちのキャリアを分析した Will Larson は、著書『Staff Engineer』の中で、シニアなエンジニアは実際にコードを書く時間が減り、代わりに技術戦略を書き、他者の成長を支援し、組織横断で影響力を発揮することに時間を使うようになると述べています。つまり、上流の役割に進むほど「書く力」「伝える力」がそのままアウトプットの質になるのです。</p>

      <p>このガイドでは、世界的に知られる開発者・アーキテクトたちが実践してきたコミュニケーションの型を、初学者でも今日から使えるステップに分解して解説します。土台として、Roy Osherove の著書『Elastic Leadership』(Manning, 2016) — <a href="https://www.manning.com/books/elastic-leadership" target="_blank" rel="noopener">https://www.manning.com/books/elastic-leadership</a> — が提示する「チームの状態に合わせてリーダーシップを変える」という考え方を軸に据えます。</p>

      <h3>この記事で扱うステップ</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>ステップ</th><th>テーマ</th><th>主な参照元</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>相手のフェーズを見極める</td><td>Roy Osherove『Elastic Leadership』</td></tr>
            <tr><td>2</td><td>自分の立ち位置を自覚する</td><td>Gregor Hohpe『The Software Architect Elevator』</td></tr>
            <tr><td>3</td><td>意思決定を書き残す</td><td>Michael Nygard の ADR</td></tr>
            <tr><td>4</td><td>設計を伝える前に合意を作る</td><td>Google の Design Doc 文化、Amazon の 6ページ・メモ</td></tr>
            <tr><td>5</td><td>構造を「見える化」する</td><td>Simon Brown の C4モデル</td></tr>
            <tr><td>6</td><td>コードレビューで人間関係を壊さない</td><td>Google Engineering Practices</td></tr>
            <tr><td>7</td><td>非同期コミュニケーションを設計する</td><td>GitLab Handbook</td></tr>
            <tr><td>8</td><td>技術的負債をビジネス言語に翻訳する</td><td>Martin Fowler の Technical Debt Quadrant</td></tr>
            <tr><td>9</td><td>非技術者・経営層に伝える</td><td>Will Larson の SQCA フレームワーク</td></tr>
          </tbody>
        </table>
      </div>

      <p>それでは、順番に見ていきましょう。</p>
    </section>

    <!-- ===================== 02. Step 1 ===================== -->
    <section id="step-1-team-phase">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 02</div>
      <h2>相手(チーム)が今どのフェーズにいるかを見極める</h2>

      <h3>Elastic Leadership の3フェーズモデル</h3>

      <p>Roy Osherove は、20年以上にわたり開発者・チームリード・アーキテクト・CTO を歴任した経験から、チームには「サバイバルモード」「ラーニングモード」「自己組織化モード」という3つのフェーズがあり、リーダーシップのスタイルはそのフェーズに合わせて変化させるべきだと説きます。</p>

      <p>これはコミュニケーションにもそのまま当てはまります。同じ「進捗どうですか」という一言でも、火消しに追われているチームに聞くのと、自律的に動けるチームに聞くのとでは、相手が受け取る意味も、返ってくる情報の質もまったく違います。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ELASTIC_LEADERSHIP_PHASES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">チームの状態に応じてリーダーシップのスタイルを切り替える</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>サバイバルモードのチームに「なぜこうなったと思う？」と抽象的な問いを投げても、余裕がなく苛立ちを生むだけです。まずは具体的で実行可能な指示や情報を渡しましょう。</li>
          <li>ラーニングモードでは、答えを教えるのではなく問いかけることで、相手が自分で答えにたどり着けるように導きます。</li>
          <li>自己組織化モードのチームに逐一指示を出すのは、逆に信頼を損ないます。判断材料だけを渡し、結論は任せましょう。</li>
        </ul>
      </div>

      <p>この考え方は、Osherove がブログに書き溜めた実践知をまとめたものが原型になっています。『Elastic Leadership』はもともとチームリードになりたての頃に書き始めたブログが元になっていると、彼自身がインタビューで語っています。</p>
    </section>

    <!-- ===================== 03. Step 2 ===================== -->
    <section id="step-2-architect-elevator">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-skyscraper" aria-hidden="true" />SECTION 03</div>
      <h2>自分がどの「階」でコミュニケーションしているかを自覚する</h2>

      <h3>Gregor Hohpe の「アーキテクト・エレベーター」</h3>

      <p>Enterprise Integration Patterns の共著者としても知られる Gregor Hohpe は、著書『The Software Architect Elevator』の中で、大企業のアーキテクトを「エレベーターに乗る人」に例えています。事業戦略が決まる最上階(ペントハウス)と、実際にシステムが作られる最下層(エンジンルーム)を、直接つなぐ役割を担うのがアーキテクトだという考え方です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ARCHITECT_ELEVATOR" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">経営層と実装チームをつなぐアーキテクトの役割</div>
      </div>

      <p>Hohpe は、老朽化した蒸気船の例えを使い、艦橋が針路を変える指示を出しても、機関室が全速前進のままなら大惨事になる。だからこそ、艦橋の命令を機関室へ直接伝える伝声管が必要だったと説明します。現代の組織で、この「伝声管」の役を果たすのがアーキテクトであり、シニアエンジニアです。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>自分がいま「どの階」の人に話しているかを常に意識しましょう。エンジンルームの言葉(実装の詳細)をそのままペントハウスに持ち込んでも伝わりません。</li>
          <li>逆にペントハウスの言葉(抽象的な戦略)をそのままエンジンルームに落としても、実装チームは「で、何をすればいいのか」が分かりません。</li>
          <li>会話を始める前に「相手は今どの階にいるか」を1秒だけ自問する習慣をつけると、説明の粒度が自然と最適化されます。</li>
        </ul>
      </div>

      <p>このレビュー記事でも、アーキテクトが効果的なリーダーであるためには優れたコミュニケーターでなければならず、Hohpe は長年の経験から得たコミュニケーション改善のヒントを共有していると評されています。</p>
    </section>

    <!-- ===================== 04. Step 3 ===================== -->
    <section id="step-3-adr">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:file-text" aria-hidden="true" />SECTION 04</div>
      <h2>意思決定を書き残す — Architecture Decision Record (ADR)</h2>

      <h3>なぜ「決定の理由」を記録する必要があるのか</h3>

      <p>Michael Nygard は2011年のブログ記事「Documenting Architecture Decisions」の中で、アジャイルなプロジェクトのアーキテクチャは従来と違う形で記述・定義する必要がある。すべての決定が一度に、あるいはプロジェクト開始時にまとめて行われるわけではないと述べ、巨大な仕様書ではなく「小さく、更新され続けるドキュメント」の重要性を説きました。さらに大きなドキュメントは誰も読まないし、誰も更新しない。一口サイズのドキュメントの方が、更新される可能性が高いとも指摘しています。</p>

      <p>この考え方から生まれたのが ADR(Architecture Decision Record)です。1つの意思決定につき1つの短いドキュメントを残すことで、「なぜそう決めたのか」を未来のチームメンバーに伝えます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ADR_LIFECYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Architecture Decision Record のライフサイクル</div>
      </div>

      <h3>Nygard 式 ADR テンプレート(初学者向け最小構成)</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>書く内容</th></tr></thead>
          <tbody>
            <tr><td>タイトル</td><td>連番 + 決定内容を表す短い名詞句(例: ADR-0007 注文サービスのデータストアに PostgreSQL を採用)</td></tr>
            <tr><td>ステータス</td><td>Proposed / Accepted / Deprecated / Superseded by ADR-xxxx のいずれか</td></tr>
            <tr><td>コンテキスト</td><td>なぜこの決定が必要になったか、当時の制約や前提を中立的な言葉で書く</td></tr>
            <tr><td>決定</td><td>実際に何を決めたかを明確に書く</td></tr>
            <tr><td>結果(トレードオフ)</td><td>この決定によって得られるものと、犠牲になるものの両方を書く</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>ADR は「議事録」ではありません。書くのは重要な決定だけです。ライブラリの選定のような些細な決定にまで ADR を書くと、本当に重要な決定が埋もれてしまいます。ある実務家は、些細な決定と壮大な決定ばかりが積み上がり、本当に負荷の高い決定(例えばセッション状態をメモリではなくデータベースに置くといった選択)が記録されないままだと、ADR の集合はノイズになりチームから信頼されなくなると警告しています。</li>
          <li>一度 Accepted になった ADR は編集しません。結論が変わったら、新しい ADR を書いて古い ADR を「Superseded」にします。これにより意思決定の履歴がそのまま残ります。</li>
          <li>ADR は Markdown で書き、ソースコードと同じリポジトリでバージョン管理するのが一般的です。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 05. Step 4 ===================== -->
    <section id="step-4-design-docs">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:notes" aria-hidden="true" />SECTION 05</div>
      <h2>設計を伝える前に合意を作る — Design Doc と RFC 文化</h2>

      <h3>Google の Design Doc</h3>

      <p>Google の Malte Ubl は、Design Doc は、ソフトウェアシステムやアプリケーションの主著者がコーディングに着手する前に作成する、比較的インフォーマルなドキュメントであり、高レベルの実装戦略と、検討されたトレードオフを重視した主要な設計上の意思決定を記録するものだと説明しています。</p>

      <p>Design Doc(会社によっては RFC や ERD とも呼ばれます)を書く目的は、コードを書き始める前に「間違った方向に走り出すリスク」を減らすことです。実際、Uber では以前 RFC と呼んでいた仕組みを、現在は ERD(Engineering Review Docs)と呼んでいるなど、呼び方は会社によって異なりますが、考え方は共通しています。</p>

      <h3>Amazon の「6ページ・メモ」文化</h3>

      <p>対照的なアプローチとして知られるのが Amazon です。創業者 Jeff Bezos は2004年、Amazon の役員たちはパワーポイントやその他のスライド形式のプレゼンテーションを一切使わないと宣言し、代わりに会議の冒頭で全員が黙って6ページの物語形式のメモを読む「勉強会」のようなスタイルを導入しました。</p>

      <p>Bezos はその理由を、良い4ページのメモを書くことが20ページのパワーポイントを「書く」ことより難しいのは、物語構造を持つメモがより良い思考と、何がより重要かの理解、物事の関連性の理解を強制するからだ。パワーポイント形式のプレゼンは、アイデアを飛ばし、重要度を均一化し、アイデア同士のつながりを無視することを、いつの間にか許してしまうと説明しています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DESIGN_DOC_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Design Doc を軸にした合意形成のプロセス</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>会議の前にスライドで説明しようとするのではなく、まず「文章」で自分の考えを書き出してみましょう。文章にまとめる過程そのものが、思考の穴を見つける最良の手段です。</li>
          <li>レビューはできる限り非同期(コメント機能付きの文書やプルリクエスト)で行い、意見が割れた論点だけを同期ミーティングに持ち込みましょう。全部を会議で決めようとすると時間がいくらあっても足りません。</li>
          <li>Design Doc も RFC も「完璧に書く」必要はありません。Will Larson が薦めるように、まず問題から書き始め、テンプレートはシンプルに保ち、レビューはみんなで集まって行い、執筆は一人で行い、完璧より「良い」を優先するという原則が役立ちます。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 06. Step 5 ===================== -->
    <section id="step-5-c4-model">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:sitemap" aria-hidden="true" />SECTION 06</div>
      <h2>複雑な構造を「見える化」する — C4モデル</h2>

      <h3>なぜ図が必要なのか</h3>

      <p>文章だけでは、システム全体の構造や、コンポーネント同士の関係を素早く共有するのが困難です。ここで役立つのが、Simon Brown が考案した C4モデルです。C4モデルの目的は、ソフトウェアアーキテクチャを、異なる抽象度のレベルで伝えるためのシンプルな方法を提供し、異なる相手には異なるレベルの物語を語れるようにすることにあります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_C4_MODEL_LEVELS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">C4モデルの4つの抽象度レベル</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>レベル</th><th>主な対象読者</th><th>説明する内容</th></tr></thead>
          <tbody>
            <tr><td>コンテキスト</td><td>経営層・非技術者を含む全員</td><td>システムが何をするか、誰が使うか、外部のどのシステムと連携するか</td></tr>
            <tr><td>コンテナ</td><td>アーキテクト・シニアエンジニア</td><td>アプリケーション、API、データストアなど、システムを構成する実行単位</td></tr>
            <tr><td>コンポーネント</td><td>実装を担当するエンジニア</td><td>コンテナ内部がどんなモジュールで構成されているか</td></tr>
            <tr><td>コード</td><td>実装するエンジニア本人</td><td>クラスや関数レベルの実装詳細</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>いきなり詳細な図(コードレベル)を描こうとせず、まずコンテキストレベルの図から始めましょう。C4モデルの導入におけるベストプラクティスは、コンテキストレベルから始めて徐々に深いレベルへ進むこと、図をシンプルに保つこと、一貫した記法を使うこと、フィードバックを得ながら反復すること、図と一緒に前提を文書化することだとされています。</li>
          <li>相手が経営層なら、コンテキストレベルの図だけで十分なことが多いです。詳細なコンポーネント図を見せても、かえって話が伝わりにくくなります。</li>
          <li>ツールは Structurizr、PlantUML、あるいは手描きのホワイトボードでも構いません。C4モデルは記法やツールに依存しない考え方だからです。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 07. Step 6 ===================== -->
    <section id="step-6-code-review">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-pull-request" aria-hidden="true" />SECTION 07</div>
      <h2>コードレビューで人間関係を壊さない伝え方</h2>

      <p>コードレビューは、開発者同士のコミュニケーションが最も摩擦を生みやすい場面の一つです。Google の Engineering Practices ドキュメントは、この摩擦を減らすための具体的な言い回しを提示しています。</p>

      <h3>コードについて語り、人について語らない</h3>

      <p>Google のガイドラインは、常にコードについてコメントし、開発者についてコメントしないようにすることが重要であり、これは特に、そのままでは相手を動揺させたり議論を呼んだりしかねない内容を伝えるときに徹底すべきだと述べています。具体例として、次のような対比が示されています。</p>

      <ul>
        <li>悪い例: 「なぜここでスレッドを使ったのですか。並行処理の恩恵が明らかに何もないのに」</li>
        <li>良い例: 「この並行処理モデルは、目に見える性能上の利点がないままシステムに複雑さを加えています。性能上の利点がない以上、このコードはシングルスレッドの方が良いと思います」</li>
      </ul>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CODE_REVIEW_DECISION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">コードレビューコメントを書く前の判断フロー</div>
      </div>

      <h3>レビューを受け取る側の心構え</h3>

      <p>コメントするだけでなく、コメントを「受け取る」側の作法も同じくらい重要です。Google のドキュメントは、レビュアーからの指摘に納得できないときの対応として、対立的にではなく協働的に考えることが大切だとし、「私はこういうトレードオフを考えてXを選びました。Yの方が良いというのは、これらの前提が違うからでしょうか、それとも別の理由でしょうか？」というように、明確化を求める書き方を推奨しています。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>技術的な事実やデータに基づく指摘と、単なる好みを区別しましょう。技術的な事実やデータは意見や個人的な好みに優先する。スタイルの問題についてはスタイルガイドが絶対的な権威であり、スタイルガイドに載っていない純粋なスタイルの好み(空白の使い方など)は個人の好みの問題にすぎないという原則を覚えておくと、無用な論争を避けられます。</li>
          <li>必須ではない指摘には「Nit:」と明記しましょう。相手に「これは直さなくてもマージできる」ということが伝わり、コミュニケーションコストが下がります。</li>
          <li>感情的な言い回しを見つけたら、一度下書きを寝かせてから送りましょう。怒りに任せてレビューコメントに返信してはならない。それはコードレビューツールに永遠に残る、深刻なマナー違反になるとまで表現されています。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 08. Step 7 ===================== -->
    <section id="step-7-async-communication">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clock-hour-4" aria-hidden="true" />SECTION 08</div>
      <h2>非同期コミュニケーションを設計する</h2>

      <h3>GitLab の「Handbook-First」文化</h3>

      <p>世界最大級のオールリモート企業として知られる GitLab は、全世界からほぼどこからでも働ける完全リモート企業であるため、つながりを保ちながら効率的に働くために明確なコミュニケーションを実践することが重要だ。そのために非同期コミュニケーションを出発点とし、公開されたイシューやマージリクエスト、Slack チャンネルを通じてできる限りオープンで透明性のあるやり取りを心がけていると説明しています。</p>

      <p>GitLab のこの考え方の中核にあるのが「Handbook-First」という原則です。GitLab は単一の情報源(Single Source of Truth)を作ることに意識的に取り組んでおり、Handbook-First な運営をし、透明性を重視するあまりハンドブックを全世界に公開しているとしています。さらに、「ドキュメンテーション」という言葉は変更が伝えられた後にドキュメントを作る作業を指すことが多いが、GitLab ではまず書いてから、それを伝えるという順序が徹底されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ASYNC_SYNC_DECISION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">同期コミュニケーションと非同期コミュニケーションの使い分け</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>「とりあえず会議を入れる」のではなく、「まず書けないか」を先に考える習慣をつけましょう。書けるものは書き、書けない(＝結論が曖昧で議論そのものが必要な)ものだけを会議にします。</li>
          <li>口頭で決まったことは、必ずどこかに書き残しましょう。書かれていない決定は、時間とともに「言った・言わない」の水掛け論になります。</li>
          <li>タイムゾーンをまたぐチームでは特に、非同期を前提にすると全員が自分のペースで質の高い回答ができます。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 09. Step 8 ===================== -->
    <section id="step-8-tech-debt">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:scale" aria-hidden="true" />SECTION 09</div>
      <h2>技術的負債をビジネス言語に翻訳する</h2>

      <h3>Martin Fowler の Technical Debt Quadrant</h3>

      <p>「技術的負債がある」と言われても、非エンジニアには何のことか伝わりません。ここで役立つのが、Martin Fowler が提唱した Technical Debt Quadrant(技術的負債の4象限)です。この分類は、意図的か非意図的か(チームは負債を負っていると知っていたか)、慎重か無謀か(その判断は思慮深く行われたか、それとも不注意だったか)という2つの軸で技術的負債を分類するものです。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th/><th>慎重 (Prudent)</th><th>無謀 (Reckless)</th></tr></thead>
          <tbody>
            <tr><td><strong>意図的 (Deliberate)</strong></td><td>「今は出荷を優先し、後で結果に対処する」</td><td>「設計する時間がない」</td></tr>
            <tr><td><strong>非意図的 (Inadvertent)</strong></td><td>「今ならこうすべきだったと分かった」</td><td>「レイヤリングって何？」</td></tr>
          </tbody>
        </table>
      </div>

      <p>非技術者に説明するときは、金融の比喩が有効です。慎重かつ意図的な負債は、計画された事業融資のようなもので、チャンスを掴むために戦略的に借り入れる。無謀かつ意図的な負債は、返済計画のないクレジットカードの浪費のようなもの。無謀かつ非意図的な負債は、税制を知らない従業員が誤って負債を作ってしまうようなもの。慎重かつ非意図的な負債は、当時は健全だった事業判断が、その後の市況変化によって変わってしまったようなものと説明すれば、経営層も直感的に理解できます。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>「技術的負債を返済したい」だけでは予算は取れません。「この負債はどの象限に属するか」「放置すると何がどれだけ遅くなるか(＝利子)」まで言語化しましょう。</li>
          <li>技術的負債の議論をコード品質のスコアではなく、顧客の離脱率やチームの生産性といった事業指標を軸に組み立てると、非技術者にも伝わりやすくなります。</li>
          <li>すべての負債が悪いわけではありません。慎重かつ意図的な負債は、むしろ正しい経営判断であることも多いという前提を共有しておきましょう。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Step 9 ===================== -->
    <section id="step-9-sqca">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:presentation" aria-hidden="true" />SECTION 10</div>
      <h2>非技術者・経営層に伝える — SQCA フレームワーク</h2>

      <h3>Will Larson の SQCA</h3>

      <p>役職が上がるほど、技術的な背景を持たない人たちに、限られた時間で説明する機会が増えます。Will Larson は著書『Staff Engineer』の中で、エグゼクティブとのコミュニケーションが難しいのは、彼らがあなたの専門領域に詳しくない上に、その話題に割ける時間も限られているからだ。目標はエグゼクティブからできる限り多くの視点を引き出すことであり、そのための最良の方法が構造化されたドキュメントを書くことだと述べ、SQCA という型を提案しています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SQCA_STRUCTURE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">経営層向け文書の型 SQCA フレームワーク</div>
      </div>

      <p>すべてのドキュメントの冒頭の段落は、SQCA フォーマットに従うべきである。Situation(状況)は関連する背景を定義し、Complication(複雑化要因)はなぜ現状の状況が問題なのかを説明し、Question(問い)は取り組むべき核心の問いを述べ、Answer(答え)は最善の答えを述べるという構成です。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />初学者向けの実践ポイント</div>
        <ul>
          <li>結論を最初に書きましょう。技術的な説明では「経緯→結論」の順で語りがちですが、経営層向けの文書では「結論→根拠」の順が基本です。</li>
          <li>専門用語はできる限り削り、削れない用語には一言だけ補足を添えましょう。</li>
          <li>SQCA の4行を書き終えるまでは、詳細な実装の話には進まないようにしましょう。冒頭で相手の頭の中に「地図」を渡すことが目的です。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 11. Summary ===================== -->
    <section id="summary-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 11</div>
      <h2>まとめ: 実践チェックリスト</h2>

      <div class="table-wrap">
        <table>
          <thead><tr><th>ステップ</th><th>今日から始められること</th></tr></thead>
          <tbody>
            <tr><td>1. フェーズを見極める</td><td>話す前に「相手のチームは今どのフェーズか」を1秒だけ自問する</td></tr>
            <tr><td>2. 階を自覚する</td><td>説明の粒度を、相手が「エンジンルーム」か「ペントハウス」かで変える</td></tr>
            <tr><td>3. 決定を書き残す</td><td>重要な決定だけ、Nygard 式の5項目で ADR を書く</td></tr>
            <tr><td>4. 合意を作る</td><td>コードを書く前に、短い Design Doc を一人で書いてから共有する</td></tr>
            <tr><td>5. 見える化する</td><td>まずコンテキストレベルの図から描き、必要な相手にだけ深いレベルを見せる</td></tr>
            <tr><td>6. レビューで語る</td><td>コードについて語り、人について語らない。任意の指摘には Nit と書く</td></tr>
            <tr><td>7. 非同期を設計する</td><td>会議を入れる前に「まず書けないか」を考える</td></tr>
            <tr><td>8. 負債を翻訳する</td><td>技術的負債を4象限のどれかに分類し、金融の比喩で説明する</td></tr>
            <tr><td>9. 経営層に伝える</td><td>結論から始まる SQCA の4行で書き出す</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 12. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 12</div>
      <h2>参考文献・出典</h2>

      <p>このガイドの内容は、以下の一次情報・著名な開発者による公開情報をもとに作成しています(2026年8月17日時点でアクセス確認済み)。</p>

      <div class="ref-group">
        <h3>情報源一覧</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Roy Osherove, Elastic Leadership: Growing Self-Organizing Teams (Manning, 2016)</span><a class="ref-url" href="https://www.manning.com/books/elastic-leadership" target="_blank" rel="noopener">https://www.manning.com/books/elastic-leadership</a></li>
          <li><span class="ref-name">Roy Osherove interview, Tech Lead Journal</span><a class="ref-url" href="https://techleadjournal.dev/episodes/110/" target="_blank" rel="noopener">https://techleadjournal.dev/episodes/110/</a></li>
          <li><span class="ref-name">Gregor Hohpe, The Software Architect Elevator (O'Reilly)</span><a class="ref-url" href="https://www.oreilly.com/library/view/the-software-architect/9781492077534/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/the-software-architect/9781492077534/</a></li>
          <li><span class="ref-name">Gregor Hohpe, "The Architect Elevator," Enterprise Integration Patterns blog</span><a class="ref-url" href="https://www.enterpriseintegrationpatterns.com/ramblings/79_elevator.html" target="_blank" rel="noopener">https://www.enterpriseintegrationpatterns.com/ramblings/79_elevator.html</a></li>
          <li><span class="ref-name">Michael Nygard, "Documenting Architecture Decisions" (Cognitect, 2011)</span><a class="ref-url" href="https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions" target="_blank" rel="noopener">https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions</a></li>
          <li><span class="ref-name">ADR templates collection (Nygard format)</span><a class="ref-url" href="https://github.com/joelparkerhenderson/architecture-decision-record" target="_blank" rel="noopener">https://github.com/joelparkerhenderson/architecture-decision-record</a></li>
          <li><span class="ref-name">Malte Ubl, "Design Docs at Google"</span><a class="ref-url" href="https://www.industrialempathy.com/posts/design-docs-at-google/" target="_blank" rel="noopener">https://www.industrialempathy.com/posts/design-docs-at-google/</a></li>
          <li><span class="ref-name">Gergely Orosz, "Companies Using RFCs or Design Docs," The Pragmatic Engineer</span><a class="ref-url" href="https://blog.pragmaticengineer.com/rfcs-and-design-docs/" target="_blank" rel="noopener">https://blog.pragmaticengineer.com/rfcs-and-design-docs/</a></li>
          <li><span class="ref-name">"Why Jeff Bezos makes Amazon execs read 6-page memos," CNBC (2018)</span><a class="ref-url" href="https://www.cnbc.com/2018/04/23/what-jeff-bezos-learned-from-requiring-6-page-memos-at-amazon.html" target="_blank" rel="noopener">https://www.cnbc.com/2018/04/23/what-jeff-bezos-learned-from-requiring-6-page-memos-at-amazon.html</a></li>
          <li><span class="ref-name">"Welcome to the jungle: Jeff Bezos banned slide decks in favor of narratives," Medium</span><a class="ref-url" href="https://medium.com/@nathan.baugh/welcome-to-the-jungle-38fdde285b6f" target="_blank" rel="noopener">https://medium.com/@nathan.baugh/welcome-to-the-jungle-38fdde285b6f</a></li>
          <li><span class="ref-name">Will Larson, Staff Engineer: Leadership Beyond the Management Track — book notes</span><a class="ref-url" href="https://ivanahuckova.medium.com/book-notes-staff-engineer-leadership-beyond-the-management-track-by-will-larson-41248b1ca1c6" target="_blank" rel="noopener">https://ivanahuckova.medium.com/book-notes-staff-engineer-leadership-beyond-the-management-track-by-will-larson-41248b1ca1c6</a></li>
          <li><span class="ref-name">"StaffEng - How to write a design doc," summarizing Will Larson's guidance</span><a class="ref-url" href="https://medium.com/@liamchzh/staffeng-how-to-write-a-design-doc-and-how-google-does-it-19c495c53fcf" target="_blank" rel="noopener">https://medium.com/@liamchzh/staffeng-how-to-write-a-design-doc-and-how-google-does-it-19c495c53fcf</a></li>
          <li><span class="ref-name">Martin Fowler, "TechnicalDebtQuadrant"</span><a class="ref-url" href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TechnicalDebtQuadrant.html</a></li>
          <li><span class="ref-name">"Martin Fowler's Tech Debt Quadrant Explained for 2026"</span><a class="ref-url" href="https://techdebt.guru/tech-debt-quadrant/" target="_blank" rel="noopener">https://techdebt.guru/tech-debt-quadrant/</a></li>
          <li><span class="ref-name">Google, "How to write code review comments," Engineering Practices</span><a class="ref-url" href="https://google.github.io/eng-practices/review/reviewer/comments.html" target="_blank" rel="noopener">https://google.github.io/eng-practices/review/reviewer/comments.html</a></li>
          <li><span class="ref-name">Google, "The Standard of Code Review," Engineering Practices</span><a class="ref-url" href="https://google.github.io/eng-practices/review/reviewer/standard.html" target="_blank" rel="noopener">https://google.github.io/eng-practices/review/reviewer/standard.html</a></li>
          <li><span class="ref-name">Google, "Handling reviewer comments," Engineering Practices</span><a class="ref-url" href="https://github.com/google/eng-practices/blob/master/review/developer/handling-comments.md" target="_blank" rel="noopener">https://github.com/google/eng-practices/blob/master/review/developer/handling-comments.md</a></li>
          <li><span class="ref-name">Software Engineering at Google, Code Review chapter</span><a class="ref-url" href="https://abseil.io/resources/swe-book/html/ch09.html" target="_blank" rel="noopener">https://abseil.io/resources/swe-book/html/ch09.html</a></li>
          <li><span class="ref-name">GitLab Handbook, "GitLab Communication"</span><a class="ref-url" href="https://gitlab.com/gitlab-com/content-sites/handbook/-/tree/main/content/handbook/communication" target="_blank" rel="noopener">https://gitlab.com/gitlab-com/content-sites/handbook/-/tree/main/content/handbook/communication</a></li>
          <li><span class="ref-name">GitLab Handbook, "The importance of a handbook-first approach to communication"</span><a class="ref-url" href="https://handbook.gitlab.com/handbook/company/culture/all-remote/handbook-first/" target="_blank" rel="noopener">https://handbook.gitlab.com/handbook/company/culture/all-remote/handbook-first/</a></li>
          <li><span class="ref-name">Simon Brown, C4 model official site</span><a class="ref-url" href="https://c4model.com/" target="_blank" rel="noopener">https://c4model.com/</a></li>
          <li><span class="ref-name">Simon Brown, The C4 Model: Visualizing Software Architecture (O'Reilly)</span><a class="ref-url" href="https://www.oreilly.com/library/view/the-c4-model/9798341660113/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/the-c4-model/9798341660113/</a></li>
          <li><span class="ref-name">Victor Leung, "The C4 Model for Visualising Software Architecture"</span><a class="ref-url" href="https://dev.to/victorleungtw/the-c4-model-for-visualising-software-architecture-1g5p" target="_blank" rel="noopener">https://dev.to/victorleungtw/the-c4-model-for-visualising-software-architecture-1g5p</a></li>
        </ul>
      </div>
    </section>

    <footer>
      本ガイドは独自の一次情報調査に基づく教育目的の非公式解説記事です。各引用の正確性については、参考文献セクションのリンク先原文を必ずご確認ください。最終更新: 2026年8月17日。
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
  }

  .sidebar-nav a :deep(svg),
  .sidebar-nav a i { font-size: 17px; color: var(--color-ink-faint); flex: none; }

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
  .sidebar-nav a.active i { color: var(--color-indigo); }

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
  .hero-eyebrow i { font-size: 17px; }

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
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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

  /* ===================== Table ===================== */
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
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 60px;
  }

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

  .step-body .step-title { font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
  .step-body .step-desc { color: var(--color-ink-soft); font-size: 16px; }

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
      visibility: hidden;
      transition: transform 0.2s ease, visibility 0.2s ease;
      box-shadow: none;
    }
    .sidebar.open { transform: translateX(0); visibility: visible; }
    .main-content { margin-left: 0; padding: 88px 24px 100px; }
    .hero h1 { font-size: 32px; }
    .stat-row { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 560px) {
    .stat-row { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    /*
     * `html { scroll-behavior: auto }` はここには置かない。
     * scoped CSS は `html[data-v-xxxx]` にコンパイルされ <html> には決して一致しないため、
     * スクロール挙動は app/assets/css/main.css のグローバル定義が担う。
     */
    .sidebar { transition: none; }
  }

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}
</style>
