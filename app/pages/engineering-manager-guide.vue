<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "what-is-em",
  "first-90-days",
  "self-management",
  "one-on-ones",
  "feedback-coaching",
  "delegation",
  "psychological-safety",
  "performance-review",
  "hiring-interviews",
  "measuring-productivity",
  "ai-era-management",
  "remote-hybrid",
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
  title: "エンジニアリングマネージャー入門完全ガイド | 初学者向けステップバイステップ・ベストプラクティス",
  description: "James Stanier著『Become an Effective Software Engineering Manager』を主軸に、Camille Fournier、Lara Hogan、Kim Scott、Google re:Workなど国際的な一次情報に基づき、エンジニアリングマネージャーの仕事をステップバイステップで解説する初学者向け完全ガイド。",
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

const DIAGRAM_CAREER_LADDER = `flowchart TB
    A["ソフトウェアエンジニア"] --> B["テックリード"]
    B --> C["エンジニアリングマネージャー"]
    C --> D["シニアマネージャー"]
    D --> E["ディレクター"]
    E --> F["VPエンジニアリング"]
    F --> G["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,D,E,F,G box;
    class C hub;`;

const DIAGRAM_FIRST_90_DAYS = `flowchart TB
    W1["第1週 傾聴とスナップショット作成"] --> W2["〜30日 信頼構築と1on1の開始"]
    W2 --> W3["〜60日 チーム構造とプロセスの見直し"]
    W3 --> W4["〜90日 最初のビジョンとアクションプランの提示"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class W1,W2,W3 box;
    class W4 done;`;

const DIAGRAM_ONE_ON_ONE_TRIAGE = `flowchart TB
    Q["「調子はどう？」と尋ねる"] --> A{回答の性質を見極める}
    A -->|淡々とした状況報告| U["Update 更新 手短に確認して次へ"]
    A -->|不満や苛立ちの表出| V["Vent 発散 解決しようとせず ただ聴き切る"]
    A -->|重く沈黙がちな様子| D["Disaster 危機 最優先で向き合い 感情に寄り添う"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Q,U,V,D box;
    class A hub;`;

const DIAGRAM_FEEDBACK_FORMULA = `flowchart LR
    O["Observation 観察した具体的な事実"] --> I["Impact それがもたらした影響"]
    I --> R["Request 次に期待する具体的な行動"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class O,I box;
    class R done;`;

const DIAGRAM_DELEGATION_LADDER = `flowchart TB
    L1["Lv1 指示する Tell マネージャーがすべて決めて伝える"] --> L2["Lv2 説得する Sell 理由を説明したうえで指示する"]
    L2 --> L3["Lv3 相談する Consult 意見を聞いたうえでマネージャーが決める"]
    L3 --> L4["Lv4 合意する Agree 話し合いのうえ全員で合意して決める"]
    L4 --> L5["Lv5 助言する Advise 助言はするが決定権は相手に渡す"]
    L5 --> L6["Lv6 尋ねる Inquire 相手が決めて実行し 事後に報告を受ける"]
    L6 --> L7["Lv7 完全委任 Delegate 相手にすべてを委ね 報告も求めない"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class L1,L2,L3,L4,L5,L6 box;
    class L7 done;`;

const DIAGRAM_PSYCH_SAFETY = `flowchart TB
    PS["心理的安全性 Psychological Safety"] --> D1["相互信頼 Dependability"]
    PS --> D2["構造と明確さ Structure and Clarity"]
    PS --> D3["仕事の意味 Meaning"]
    PS --> D4["インパクト Impact"]
    D1 --> R["チームの効果性"]
    D2 --> R
    D3 --> R
    D4 --> R

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class D1,D2,D3,D4 box;
    class PS hub;
    class R done;`;

const DIAGRAM_REVIEW_PROCESS = `flowchart TB
    A["自己評価の記入"] --> B["マネージャーによる一次評価の作成"]
    B --> C["エビデンス収集 プロジェクト実績 ピアフィードバック"]
    C --> D["キャリブレーション会議 他のマネージャーと評価基準をすり合わせる"]
    D --> E["評価の確定"]
    E --> F["本人へのフィードバック面談"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,E box;
    class D hub;
    class F done;`;

const DIAGRAM_DORA_SPACE = `flowchart LR
    DORA["DORAメトリクス シグナル 今どうなっているか"] --> SPACE["SPACEフレームワーク 診断 なぜ 何を改善すべきか"]
    SPACE --> ACTION["具体的な改善アクション"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class DORA,SPACE box;
    class ACTION done;`;

const DIAGRAM_AI_ERA_ROLE = `flowchart TB
    Old["これまでのEM像 コードから離れマネジメントに専念"] --> New["2026年のEM像 プレイヤーコーチ型"]
    New --> C1["週に数時間のハンズオン開発"]
    New --> C2["アーキテクチャ判断への直接関与"]
    New --> C3["AIエージェントの成果物のレビューと監督"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Old box;
    class New hub;
    class C1,C2,C3 box;`;
</script>

<template>
  <div class="page-shell">
    <button
      id="sidebarToggle"
      ref="sidebarToggle"
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
            <div class="brand-title">EM実践ガイド</div>
            <div class="brand-subtitle">初学者のためのステップバイステップ</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li>
            <a href="#what-is-em" :class="{ active: activeId === 'what-is-em' }" @click="closeSidebar">
              <Icon name="tabler:certificate" aria-hidden="true" />
              <span>第1章 EMとは何か</span>
            </a>
          </li>
          <li>
            <a href="#first-90-days" :class="{ active: activeId === 'first-90-days' }" @click="closeSidebar">
              <Icon name="tabler:route" aria-hidden="true" />
              <span>第2章 最初の90日間</span>
            </a>
          </li>
          <li>
            <a href="#self-management" :class="{ active: activeId === 'self-management' }" @click="closeSidebar">
              <Icon name="tabler:adjustments" aria-hidden="true" />
              <span>第3章 自己管理</span>
            </a>
          </li>
          <li>
            <a href="#one-on-ones" :class="{ active: activeId === 'one-on-ones' }" @click="closeSidebar">
              <Icon name="tabler:message-circle" aria-hidden="true" />
              <span>第4章 1on1の技術</span>
            </a>
          </li>
          <li>
            <a href="#feedback-coaching" :class="{ active: activeId === 'feedback-coaching' }" @click="closeSidebar">
              <Icon name="tabler:messages" aria-hidden="true" />
              <span>第5章 フィードバックとコーチング</span>
            </a>
          </li>
          <li>
            <a href="#delegation" :class="{ active: activeId === 'delegation' }" @click="closeSidebar">
              <Icon name="tabler:git-branch" aria-hidden="true" />
              <span>第6章 委任の技術</span>
            </a>
          </li>
          <li>
            <a href="#psychological-safety" :class="{ active: activeId === 'psychological-safety' }" @click="closeSidebar">
              <Icon name="tabler:shield-check" aria-hidden="true" />
              <span>第7章 心理的安全性</span>
            </a>
          </li>
          <li>
            <a href="#performance-review" :class="{ active: activeId === 'performance-review' }" @click="closeSidebar">
              <Icon name="tabler:chart-bar" aria-hidden="true" />
              <span>第8章 評価とキャリアラダー</span>
            </a>
          </li>
          <li>
            <a href="#hiring-interviews" :class="{ active: activeId === 'hiring-interviews' }" @click="closeSidebar">
              <Icon name="tabler:user-search" aria-hidden="true" />
              <span>第9章 採用と面接</span>
            </a>
          </li>
          <li>
            <a href="#measuring-productivity" :class="{ active: activeId === 'measuring-productivity' }" @click="closeSidebar">
              <Icon name="tabler:chart-dots" aria-hidden="true" />
              <span>第10章 DORA & SPACE</span>
            </a>
          </li>
          <li>
            <a href="#ai-era-management" :class="{ active: activeId === 'ai-era-management' }" @click="closeSidebar">
              <Icon name="tabler:robot" aria-hidden="true" />
              <span>第11章 AI時代のEM</span>
            </a>
          </li>
          <li>
            <a href="#remote-hybrid" :class="{ active: activeId === 'remote-hybrid' }" @click="closeSidebar">
              <Icon name="tabler:home-2" aria-hidden="true" />
              <span>第12章 リモート/ハイブリッド</span>
            </a>
          </li>
          <li>
            <a href="#summary-checklist" :class="{ active: activeId === 'summary-checklist' }" @click="closeSidebar">
              <Icon name="tabler:flag-3" aria-hidden="true" />
              <span>まとめ・チェックリスト</span>
            </a>
          </li>
          <li>
            <a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar">
              <Icon name="tabler:link" aria-hidden="true" />
              <span>参考文献・情報源</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />海外の一次情報・二次情報に基づく実践ガイド</div>
          <h1>エンジニアリングマネージャー入門完全ガイド</h1>
          <p class="hero-lede">
            本ガイドは、James Stanier著『Become an Effective Software Engineering Manager』(Pragmatic Bookshelf)を主要な参照軸としつつ、Camille Fournier、Will Larson、Lara Hogan、Kim Scott、Michael Lopp(Rands)、Gergely Orosz、Google re:Work、LeadDevなど、国際的に著名なソフトウェアエンジニアリング/マネジメント分野の実践者・研究者の知見を2026年8月14日時点の情報に基づいて調査し、まとめたものです。各章末および巻末に一次情報・二次情報のURLを掲載しています。
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">12</div><div class="stat-label">章立てのステップガイド</div></div>
            <div class="stat-card"><div class="stat-number">9</div><div class="stat-label">Mermaid図解</div></div>
            <div class="stat-card"><div class="stat-number">21</div><div class="stat-label">参照した一次情報URL</div></div>
            <div class="stat-card"><div class="stat-number">2026.8</div><div class="stat-label">最終調査月</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            本ガイドは公開されている書籍・記事・研究発表等の情報を基にした非公式の学習支援資料です。より深い内容や原典については、各セクション末の出典、および書籍<a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">『Become an Effective Software Engineering Manager』(James Stanier著)</a>をご参照ください。
          </div>
        </div>

        <section id="what-is-em">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
          <h2>エンジニアリングマネージャーとは何か</h2>

          <h3>なぜ「優れたエンジニア」がそのまま「優れたマネージャー」にはならないのか</h3>
          <p>多くのエンジニアリングマネージャー(EM)は、優秀なソフトウェアエンジニアとしての実績を評価されて昇進します。しかしGergely Orosz(The Pragmatic Engineer)が指摘するように、マネージャーになった瞬間、それまで当たり前に得られていた「フィードバックの多さ」が突然消えます。エンジニア時代はコードレビュー、設計ドキュメントへのコメント、プロジェクトの進捗確認など、常に他者からの評価やシグナルがありました。マネージャーになると、そうした具体的なフィードバックのループが失われ、多くの新任マネージャーが「自分は何をすべきなのか」「今のやり方は正しいのか」が分からず孤独感を覚えます。</p>
          <p>James Stanierも自著の中で、マネジメントへの移行を「未知の領域(uncharted territory)」と表現し、エンジニアとして優れていたスキルセットが、そのままではチームを率いるには不十分であると述べています。つまりエンジニアリングマネジメントは、コーディングとは別の専門技能として、意図的に学習する必要がある領域です。</p>

          <h3>エンジニアリングマネージャーの役割の全体像</h3>
          <p>Camille Fournierは著書『The Manager's Path』の中で、エンジニアリングキャリアには「個人貢献者(IC)トラック」と「マネジメントトラック」という2つの道があり、マネジメントトラックは段階ごとに「主要な人間関係」「仕事の単位」「陥りやすい失敗パターン」が異なると説明しています。多くのマネージャーが陥る典型的な失敗は、「一つ前の役職の仕事をやり続けてしまう」ことです。つまりチームリードになった人がまだ個人としてコードを書き続けすぎたり、マネージャーになった人がまだ一人のテックリードのように振る舞い続けたりすることです。</p>

          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_CAREER_LADDER" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">Camille Fournierが示すエンジニアリングマネジメントの代表的なキャリアラダー(Manager's Pathの概念を単純化したもの)</div>
          </div>

          <h3>マネージャーの仕事を5つの領域で捉える</h3>
          <p>Gergely Oroszは、Uber在籍時に作成した新任マネージャー向けチェックリストの中で、マネージャーの職務期待を次の5領域に整理しています。この分類は初学者が「マネージャーとして何をすべきか」を把握するうえで非常に実用的です。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>領域</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>チームビルディングと育成</td><td>チーム内の信頼構築、採用(採用枠がある場合)、メンバーの育成</td></tr>
                <tr><td>成果を出す</td><td>チームが実行できる構造を整え、仕事を完遂させ、品質基準を保つ</td></tr>
                <tr><td>連携とコラボレーション</td><td>チーム内外とのオープンなコミュニケーション、人と人・チームとチームをつなぐ、良い会議を運営する</td></tr>
                <tr><td>ビジョン</td><td>チームの存在意義を明確にし、チームの価値観を集約し、計画にチームを巻き込む</td></tr>
                <tr><td>専門的な成長</td><td>自分自身も成長し続ける:自分の目標設定、メンターを持つ、ピアとのネットワーキング、還元する</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p>このチェックリストは「how(どうやるか)」をマネージャー個人に委ね、「what(何を達成すべきか)」だけを定義する設計になっている点が重要です。Oroszは、手段まで細かく指定することは「マイクロマネジメント」であり、避けるべきだと強調しています。</p>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">James Stanier, Become an Effective Software Engineering Manager</a></li>
              <li><a href="https://blog.pragmaticengineer.com/checklist-for-first-time-managers/" target="_blank" rel="noopener">Gergely Orosz, A Checklist For First-Time Engineering Managers</a></li>
              <li><a href="https://www.runn.io/blog/the-managers-path-summary" target="_blank" rel="noopener">Camille Fournier, The Manager's Path(要約記事)</a></li>
            </ul>
          </div>
        </section>

        <section id="first-90-days">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 02</div>
          <h2>最初の90日間 — 新任マネージャーのスタートダッシュ</h2>

          <p>James Stanierは、マネージャーとしての最初の1週間を「観察してスナップショット(現状の見取り図)を作る期間」と位置づけています。焦って何かを変えようとするのではなく、まずチームの現状、力学、課題を正確に把握することが最優先です。</p>

          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_FIRST_90_DAYS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">新任エンジニアリングマネージャーの最初の90日間の典型的な流れ</div>
          </div>

          <ol class="step-list">
            <li>
              <div class="step-num" data-testid="step-tag">1</div>
              <div class="step-body">
                <div class="step-title">第1週 — 観察と傾聴</div>
                <div class="step-desc">チームメンバー一人ひとりと最初の顔合わせを行い、経歴・強み・不安を聞きます。既存のドキュメント、アーキテクチャ、バックログ、直近のインシデントに目を通し、「何が機能していて、何が機能していないか」の仮説(スナップショット)を作ります。この段階ではまだ大きな意思決定はしません。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">2</div>
              <div class="step-body">
                <div class="step-title">〜30日 — 信頼構築と1on1の確立</div>
                <div class="step-desc">チームメンバー全員との定期1on1を開始します(詳細は第4章)。自分の管理スタイルや期待値を明示的に伝える「コントラクティング(契約づくり)」を行い、自分の上司(あなたのマネージャー)とも期待値のすり合わせを行います。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">3</div>
              <div class="step-body">
                <div class="step-title">〜60日 — チーム構造とプロセスの見直し</div>
                <div class="step-desc">チームの意思決定プロセス、スプリント運用、コードレビュー文化などを評価します。小さな改善を少しずつ試し、チームの反応を見ながら調整します。明らかなボトルネックや不公平を放置しないことが重要です。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">4</div>
              <div class="step-body">
                <div class="step-title">〜90日 — 最初のビジョンとアクションプランの提示</div>
                <div class="step-desc">チームの目的(なぜこのチームは存在するのか)を言語化し、共有します。今後半期〜1年の優先順位について、チームを巻き込みながら計画を立て、ここまでの学びを自分の上司にも共有してフィードバックをもらいます。</div>
              </div>
            </li>
          </ol>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">James Stanier, Become an Effective Software Engineering Manager</a></li>
            </ul>
          </div>
        </section>

        <section id="self-management">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:adjustments" aria-hidden="true" />SECTION 03</div>
          <h2>自己管理 — マネージャーとしての自分を整える</h2>

          <h3>「忙しい」と「生産的」は別物</h3>
          <p>Stanierは、マネージャーになると仕事の性質が「タスクを完了させること」から「他者の仕事を通じて成果を出すこと」へ変わるため、自分の生産性の実感の仕方も変える必要があると述べています。Michael Lopp(Rands)も、マネージャーは「忙しさ(Busy)」に逃げ込みがちであり、忙しさは「戦術的」であって「戦略的」ではないと警告しています。</p>

          <h3>自己管理の実践ポイント</h3>
          <ul>
            <li><strong>情報を整理する仕組みを持つ。</strong>1on1のメモ、チームの状況、意思決定の記録を一元管理します。</li>
            <li><strong>自分の活動を「反応的(reactive)」と「主体的(proactive)」に分類する。</strong>後者の時間を意図的に確保します。</li>
            <li><strong>自分の成果指標を再定義する。</strong>コードの行数やチケット消化数ではなく、チームの成果・成長・健全性で自分の仕事を測ります。</li>
            <li><strong>メンターやピアネットワークを持つ。</strong>孤独になりやすいマネージャー職において、他のマネージャーとの横のつながりは極めて重要です。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">James Stanier, Become an Effective Software Engineering Manager</a></li>
              <li><a href="https://randsinrepose.com/archives/the-update-the-vent-and-the-disaster/" target="_blank" rel="noopener">Michael Lopp(Rands), The Update, The Vent, and The Disaster</a></li>
            </ul>
          </div>
        </section>

        <section id="one-on-ones">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:message-circle" aria-hidden="true" />SECTION 04</div>
          <h2>1on1ミーティングの技術</h2>

          <h3>1on1は「ステータス報告」ではない</h3>
          <p>Michael Loppは著書『Managing Humans』の中で、1on1でチームメンバーに投げかける最初の質問を「調子はどう?(How are you?)」とし、その答えを聞きながらマネージャーは無意識に3つのバケツのどれに当てはまるかを判断していると説明しています。</p>

          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_ONE_ON_ONE_TRIAGE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">Rands(Michael Lopp)の「The Update, The Vent, and The Disaster」に基づく1on1トリアージ</div>
          </div>

          <p>Loppが強調する重要な点は、<strong>1on1が単なる状況報告(Update)で終わってしまうことこそが「失敗」</strong>だということです。多くのマネージャーは状況報告で終わる1on1を成功だと誤解しますが、それはメンバーがマネージャーに対して心理的に安全を感じておらず、本音を語っていないサインである可能性があります。Vent(発散)が出てきたときは、解決策を急いで提示せず、ひたすら聴くことが求められます。</p>

          <h3>1on1の準備と運営</h3>
          <p>Stanierは、1on1の最初の回を「コントラクティング(contracting)」と呼び、以下を明確にすることを勧めています。</p>
          <ul>
            <li>どのくらいの頻度・長さで行うか</li>
            <li>どちらが主にアジェンダを作るか(多くの場合はレポート側が主導すべき)</li>
            <li>何をこの場で話し、何を話さないか(例:日常のタスク管理は別の場で)</li>
            <li>ノートの取り方とアクションアイテムの管理方法</li>
          </ul>

          <h3>なぜ1on1が「予防保全」なのか</h3>
          <p>Loppは1on1を「週次の予防保全(preventive maintenance)」と位置づけています。健全な1on1が積み重なったチームの特徴は、<strong>ドラマが少ないこと</strong>です。つまり、プロジェクトへの興味が薄れ始めた兆候、メンバー間の緊張、離職の予兆などを、大きな問題になる前に察知できるようになります。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li><strong>最初の質問はオープンに。</strong>「調子はどう?」のような開かれた質問から始め、相手の反応の種類(Update/Vent/Disaster)を見極めます。</li>
              <li><strong>Ventには解決策を急がない。</strong>相手が求めているのは傾聴であり、問題解決ではないことが多いです。</li>
              <li><strong>1on1をキャンセルしない。</strong>頻繁なキャンセルは「あなたの話は優先度が低い」というメッセージになりかねません。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://randsinrepose.com/archives/the-update-the-vent-and-the-disaster/" target="_blank" rel="noopener">Michael Lopp(Rands), The Update, The Vent, and The Disaster</a></li>
              <li><a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">James Stanier, Become an Effective Software Engineering Manager</a></li>
            </ul>
          </div>
        </section>

        <section id="feedback-coaching">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:messages" aria-hidden="true" />SECTION 05</div>
          <h2>フィードバックとコーチング</h2>

          <h3>フィードバックの黄金式:Observation → Impact → Request</h3>
          <p>Lara Hogan(元Etsy Engineering Director、元Kickstarter VP of Engineering)は著書『Resilient Management』の中で、良いフィードバックを「観察(Observation)+影響(Impact)+要望(Request)」という式で構造化することを提案しています。</p>

          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_FEEDBACK_FORMULA" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">Lara Hoganのフィードバックの公式(観察+影響+要望=良いフィードバック)</div>
          </div>

          <p>主観的な評価(「もっと積極的になって」など)ではなく、具体的な事実の観察から始め、それがチームやプロジェクトに与えた影響を説明し、最後に次に期待する行動を明確にする、という順序が重要です。</p>

          <h3>マネジメントの4つの帽子:メンタリング/コーチング/スポンサリング/フィードバック</h3>
          <p>Hoganは、マネージャーがメンバーの成長を支える方法を4つに分類しています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>モード</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>メンタリング(Mentoring)</td><td>自分の経験に基づき助言し、一緒に問題解決する</td></tr>
                <tr><td>コーチング(Coaching)</td><td>答えを与えず、開かれた質問で本人の内省を促す</td></tr>
                <tr><td>スポンサリング(Sponsoring)</td><td>本人が成長・昇進できる機会を見つけ、周囲に働きかける</td></tr>
                <tr><td>フィードバック(Delivering feedback)</td><td>行動を観察し、称賛または改善提案として率直に伝える</td></tr>
              </tbody>
            </table>
          </div>

          <p>多くの新任マネージャーはメンタリング(自分の答えを教える)に偏りがちですが、Hoganはコーチング(本人に考えさせる)の方が、長期的にはメンバーの自律性を育てるうえではるかに効果的だと述べています。</p>

          <h3>Radical Candor(徹底したフィードバック)</h3>
          <p>Google・Appleで幹部を務めたKim Scottは、著書『Radical Candor』の中で、フィードバックを「個人的な配慮(Care Personally)」と「率直な指摘(Challenge Directly)」の2軸で捉えるフレームワークを提示しています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th /><th>Challenge Directly(率直に指摘する)</th><th>Challenge Directlyしない</th></tr></thead>
              <tbody>
                <tr><td><strong>Care Personally(個人的に配慮する)</strong></td><td><strong>Radical Candor(理想形)</strong>:配慮と率直さが両立</td><td>Ruinous Empathy(破壊的な思いやり):優しさのあまり必要な指摘ができない</td></tr>
                <tr><td><strong>Care Personallyしない</strong></td><td>Obnoxious Aggression(不快な攻撃性):配慮なく率直さだけをぶつける</td><td>Manipulative Insincerity(操作的な不誠実さ):どちらも欠如した最悪の状態</td></tr>
              </tbody>
            </table>
          </div>

          <p>Scottは「率直さは、相手を大切に思っているからこそのギフトである」と述べ、多くの人がRadical Candorを「まず配慮を示してから、ようやく指摘する」と誤解しがちだが、実際には<strong>指摘そのものが配慮の表現になり得る</strong>と強調しています。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://larahogan.me/management/" target="_blank" rel="noopener">Lara Hogan, Management(ブログ)</a></li>
              <li><a href="https://resilient-management.com/" target="_blank" rel="noopener">Lara Hogan, Resilient Management(書籍公式サイト)</a></li>
              <li><a href="https://www.radicalcandor.com/our-approach" target="_blank" rel="noopener">Kim Scott, Radical Candor 公式フレームワーク解説</a></li>
            </ul>
          </div>
        </section>

        <section id="delegation">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 06</div>
          <h2>委任(デリゲーション)の技術</h2>

          <h3>なぜ委任が必要なのか</h3>
          <p>マネージャーが意思決定・レビュー・会議のすべてに関与し続けると、やがて自分自身がチームのアウトプットのボトルネックになります。委任はメンバーの成長機会を生むと同時に、マネージャー自身が戦略的な仕事に時間を使えるようにするための必須スキルです。</p>

          <h3>状況的リーダーシップと委任の7段階</h3>
          <p>HerseyとBlanchardの状況的リーダーシップ(Situational Leadership)モデルは、メンバーの習熟度・意欲に応じてリーダーシップスタイルを変える必要があると説きます。この考え方を実務レベルまで具体化したものが、Jurgen Appelo(Management 3.0)の「委任の7段階」です。</p>

          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_DELEGATION_LADDER" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">Management 3.0(Jurgen Appelo)の「委任の7段階」</div>
          </div>

          <p>新任マネージャーが陥りやすい失敗は、委任のレベルを曖昧にしたまま「任せたつもり」になることです。タスクごとに「今回はどのレベルで任せるのか」をメンバーと明示的にすり合わせることが、委任を成功させる鍵になります。</p>

          <h3>委任のステップ</h3>
          <ol>
            <li><strong>委任するタスクを選ぶ。</strong>緊急性が低く、育成効果が高いタスクから始めます。</li>
            <li><strong>委任のレベルを明示する。</strong>上記7段階のどこに位置するかを本人と合意します。</li>
            <li><strong>期待するアウトプット(結果)を伝える。</strong>手段(How)ではなく結果(What)を定義します。</li>
            <li><strong>フィードバックループを設計する。</strong>いつ、どのように進捗を確認するかを事前に決めます。</li>
            <li><strong>やり方の違いを許容する。</strong>結果が明らかに問題でない限り、自分と違うやり方に介入しません。</li>
          </ol>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://management30.com/empower-teams/delegation-empowerment/" target="_blank" rel="noopener">Jurgen Appelo, Management 3.0, Delegation Skills &amp; Empowerment</a></li>
            </ul>
          </div>
        </section>

        <section id="psychological-safety">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:shield-check" aria-hidden="true" />SECTION 07</div>
          <h2>心理的安全性とチームビルディング</h2>

          <h3>Googleの「Project Oxygen」と「Project Aristotle」</h3>
          <p>Googleの人事分析チームは2008年、「マネージャーは本当に必要か」を検証するために大規模調査「Project Oxygen」を開始しました。結果はマネージャーの存在がチームの成果、満足度、離職率に大きな影響を与えることを明確に示し、優れたマネージャーに共通する10の行動(2018年に8項目から拡張)を特定しました。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>#</th><th>優れたマネージャーの行動</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>良いコーチである</td></tr>
                <tr><td>2</td><td>チームを勢力づけ、マイクロマネジメントしない</td></tr>
                <tr><td>3</td><td>インクルーシブであり、メンバーのウェルビーイングに関心を持つ</td></tr>
                <tr><td>4</td><td>生産的で結果志向である</td></tr>
                <tr><td>5</td><td>良いコミュニケーターであり、傾聴する</td></tr>
                <tr><td>6</td><td>メンバーのキャリア開発を支援する</td></tr>
                <tr><td>7</td><td>明確なビジョンと戦略を持つ</td></tr>
                <tr><td>8</td><td>チームをアドバイスできる技術スキルを持つ</td></tr>
                <tr><td>9</td><td>組織横断でのコラボレーションができる</td></tr>
                <tr><td>10</td><td>優れた意思決定者である</td></tr>
              </tbody>
            </table>
          </div>

          <p>続く「Project Aristotle」では、Googleは「チームに誰がいるかより、チームがどう機能しているかの方が重要」という結論に至り、効果的なチームを支える要素を特定しました。その中でも<strong>心理的安全性が他のすべての土台となる最重要要素</strong>とされています。</p>

          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_PSYCH_SAFETY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">Google「Project Aristotle」が特定したチーム効果性の要素と心理的安全性の位置づけ</div>
          </div>

          <h3>心理的安全性とは何か(Amy Edmondson)</h3>
          <p>ハーバード・ビジネス・スクールのAmy Edmondson教授は、心理的安全性を「チームが対人リスクを取っても安全だとメンバーが共有している信念」と定義しています。Edmondsonの研究で興味深いのは、病院のチームを対象にした調査で、<strong>パフォーマンスの高いチームほどミスの報告件数が多かった</strong>という点です。これは、優れたチームほどミスを隠さず報告できる安全な環境があるためだと解釈されています。</p>
          <p>Edmondsonは、心理的安全性は「仲良しであること」や「基準を下げること」ではなく、むしろ<strong>困難な学習と改善を可能にする土台</strong>であると強調しています。</p>

          <h3>BICEPS:人が仕事で持つ6つの核心的ニーズ</h3>
          <p>Lara Hoganは、Paloma Medinaが提唱した「BICEPS」というフレームワークを紹介し、人が予想外に強い感情的反応を示すときは、以下の6つの核心的ニーズのいずれかが脅かされている可能性が高いと説明しています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>ニーズ</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>Belonging(帰属)</td><td>コミュニティやグループへのつながりの感覚</td></tr>
                <tr><td>Improvement/Progress(向上・進捗)</td><td>学び、前進している実感</td></tr>
                <tr><td>Choice(選択)</td><td>自分の仕事や環境について自分で決められる感覚</td></tr>
                <tr><td>Equality/Fairness(公平性)</td><td>リソースや情報への公平なアクセス</td></tr>
                <tr><td>Predictability(予測可能性)</td><td>適度な一貫性と変化のバランス</td></tr>
                <tr><td>Significance(重要性)</td><td>自分の存在や貢献が認められている実感</td></tr>
              </tbody>
            </table>
          </div>

          <p>例えば、些細に見える「席替え」がチームに強い反発を生むことがありますが、それはBelonging(グループから離される不安)やPredictability(急な変化)が脅かされているためだと理解できます。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener">Google re:Work, Following the data: The research behind great managers</a></li>
              <li><a href="https://hbr.org/2013/12/how-google-sold-its-engineers-on-management" target="_blank" rel="noopener">Harvard Business Review, How Google Sold Its Engineers on Management</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Amy_Edmondson" target="_blank" rel="noopener">Amy Edmondson(心理的安全性の提唱者)</a></li>
              <li><a href="https://larahogan.me/blog/predictability-stability-terrible-times/" target="_blank" rel="noopener">Lara Hogan, Creating predictability and stability in times of rapid change</a></li>
            </ul>
          </div>
        </section>

        <section id="performance-review">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-bar" aria-hidden="true" />SECTION 08</div>
          <h2>パフォーマンス評価とキャリアラダー</h2>

          <h3>デュアルラダー(Dual Ladder)という考え方</h3>
          <p>Stanierは著書の中で、「個人貢献者(IC)トラック」と「マネジメントトラック」という2つの並行したキャリアパスを整備する重要性を説いています。すべての優秀なエンジニアがマネージャーになるべきというわけではなく、高度な技術力で組織に貢献する道(スタッフエンジニア、プリンシパルエンジニアなど)も同様に評価される必要があります。Will Larsonの著書『Staff Engineer』はまさにこのICトラックの上位層を体系的に扱ったものとして知られています。</p>

          <h3>パフォーマンスレビューのプロセス</h3>
          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_REVIEW_PROCESS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">一般的なエンジニア向けパフォーマンスレビューのプロセス</div>
          </div>

          <h3>キャリブレーション(評価の目線合わせ)がなぜ重要か</h3>
          <p>キャリブレーションとは、複数のマネージャーが集まり、自分のチームメンバーへの評価案を持ち寄って比較し、評価基準の目線を揃えるプロセスです。これがないと、同じ「期待を超える成果」という評価でも、マネージャーによって基準がバラバラになり、不公平感の原因になります。</p>

          <p>キャリブレーションの実務上のポイント:</p>
          <ul>
            <li>全マネージャーが同じ評価基準・尺度を使うことを事前に徹底する</li>
            <li>「寛大化傾向」「厳格化傾向」「ハロー効果」など評価バイアスへの意識を持つ</li>
            <li>評価が会議で調整された場合でも、本人へのフィードバックは担当マネージャーが責任を持って伝える</li>
            <li>評価の根拠を具体的なエビデンス(成果物・フィードバック)に基づかせる</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">James Stanier, Become an Effective Software Engineering Manager</a></li>
              <li><a href="https://www.cultureamp.com/blog/performance-review-calibrations" target="_blank" rel="noopener">Culture Amp, Performance review calibrations: What you need to know</a></li>
            </ul>
          </div>
        </section>

        <section id="hiring-interviews">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:user-search" aria-hidden="true" />SECTION 09</div>
          <h2>採用と面接</h2>

          <h3>構造化面接(Structured Interviewing)</h3>
          <p>Googleの人事分析チームは、構造化面接(あらかじめ決めた質問セットと評価基準〈ルーブリック〉を全候補者に一貫して適用する面接手法)が、非構造化面接(自由な雑談形式の面接)よりも著しく高い予測妥当性を持つことを社内データで確認しています。人は初対面の相手を無意識のバイアスに基づいて瞬時に判断してしまう傾向(確証バイアス)があり、構造化面接はこれを是正する仕組みとして機能します。</p>

          <h3>構造化面接を実践するステップ</h3>
          <ol>
            <li><strong>職務分析を行う。</strong>その役割で成功するために本当に必要なスキル・行動を洗い出します。</li>
            <li><strong>質問セットを作る。</strong>全候補者に同じ質問をします(行動面接・状況面接の質問が有効)。</li>
            <li><strong>評価ルーブリックを作る。</strong>「不十分」から「優秀」までの尺度と、それぞれの具体例を明文化します。</li>
            <li><strong>面接官を訓練する。</strong>ルーブリックに沿って独立に採点し、他の面接官の評価を見る前に自分の評価を確定します。</li>
            <li><strong>候補者ごとに評価を統合する。</strong>個々の面接官の評価を集約し、根拠に基づいて合否を判断します。</li>
          </ol>

          <h3>James Stanierが挙げる採用の基本姿勢</h3>
          <p>Stanierは著書『Join Us!』の章で、「誰を採用するかを選ぶ」「優れた職務記述書を書く」「面接プロセスを設計する」という一連の流れの重要性を説いています。特に、採用は「欠員を埋める作業」ではなく「チームの将来を形作る意思決定」であるという姿勢が強調されています。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices" target="_blank" rel="noopener">Google re:Work, A guide to structured interviewing for better hiring practices</a></li>
              <li><a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">James Stanier, Become an Effective Software Engineering Manager</a></li>
            </ul>
          </div>
        </section>

        <section id="measuring-productivity">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-dots" aria-hidden="true" />SECTION 10</div>
          <h2>チームの生産性を測る(DORA &amp; SPACE)</h2>

          <h3>DORAメトリクス</h3>
          <p>DORA(DevOps Research and Assessment)は、Nicole Forsgren、Jez Humble、Gene Kimによる数年間にわたる調査から生まれたフレームワークで、ソフトウェアデリバリーのパフォーマンスを4つの指標で捉えます。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>メトリクス</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>デプロイ頻度(Deployment Frequency)</td><td>どれくらいの頻度で本番環境にリリースできているか</td></tr>
                <tr><td>変更のリードタイム(Lead Time for Changes)</td><td>コミットから本番稼働までの所要時間</td></tr>
                <tr><td>変更失敗率(Change Failure Rate)</td><td>リリースが障害・ロールバックにつながる割合</td></tr>
                <tr><td>平均修復時間(MTTR: Mean Time to Recovery)</td><td>障害発生から復旧までの平均時間</td></tr>
              </tbody>
            </table>
          </div>

          <h3>SPACEフレームワーク</h3>
          <p>DORAの共同開発者でもあるNicole Forsgrenは、Microsoft Research・GitHub・University of Victoriaの研究者らとともに、開発者の生産性を単一の指標(コード行数やコミット数など)で捉えることの危険性を指摘し、2021年に「SPACE」フレームワークを発表しました。SPACEは、個人・チーム・システムの3つのレベルで、以下の5つの側面を組み合わせて生産性を捉えることを提唱しています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>次元</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>Satisfaction and well-being(満足度とウェルビーイング)</td><td>開発者が仕事にどれだけ満たされているか</td></tr>
                <tr><td>Performance(パフォーマンス)</td><td>期待した成果を実際に達成できているか</td></tr>
                <tr><td>Activity(活動量)</td><td>可視化できるエンジニアリング活動の量</td></tr>
                <tr><td>Communication and collaboration(コミュニケーションと協働)</td><td>チームがどれだけ効果的に連携できているか</td></tr>
                <tr><td>Efficiency and flow(効率とフロー)</td><td>中断されずに前進できる度合い</td></tr>
              </tbody>
            </table>
          </div>

          <h3>DORAとSPACEをどう組み合わせるか</h3>
          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_DORA_SPACE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">DORAとSPACEの関係性(Nicole Forsgrenの説明に基づく)</div>
          </div>

          <p>Forsgren自身が説明するように、DORAは「今どういう状態か」を示す<strong>シグナル</strong>であり、SPACEはその背景にある「なぜそうなっているのか、何を改善すべきか」を理解するための<strong>診断ツール</strong>です。両者は対立するものではなく、補完し合う関係にあります。マネージャーは単一の活動指標(例:コミット数)を個人の評価に直結させることを避け、これらのフレームワークを健全性の診断・改善のための対話の材料として使うべきです。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://newsletter.pragmaticengineer.com/p/developer-productivity-a-new-framework" target="_blank" rel="noopener">Nicole Forsgren ほか, SPACEフレームワーク解説(The Pragmatic Engineer Newsletter)</a></li>
              <li><a href="https://space-framework.com/" target="_blank" rel="noopener">SPACE Framework 公式解説サイト</a></li>
            </ul>
          </div>
        </section>

        <section id="ai-era-management">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:robot" aria-hidden="true" />SECTION 11</div>
          <h2>AI時代のエンジニアリングマネジメント(2026年最新動向)</h2>

          <h3>「プレイヤーコーチ」モデルへの回帰</h3>
          <p>2026年、AIコーディングエージェントの普及により、エンジニアリングマネジメントの実態にも明確な変化が起きています。LeadDevの「Engineering Leadership Report 2026」によれば、より多くのエンジニアリングリーダーが技術的な作業に直接関わるようになっており、マネージャー層でハンズオンの技術作業を行う割合は2025年の20%から2026年には35%へ増加しました。Gergely Oroszが2024年に予測した「プレイヤーコーチ」モデル(マネジメントと実務の両方を担うマネージャー像)が、現実のものになりつつあります。</p>

          <div class="diagram-card mermaid-wrap">
            <div class="diagram-container">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_AI_ERA_ROLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                <template #fallback>
                  <div class="diagram-loading">図を読み込み中...</div>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">AIエージェントの普及に伴うエンジニアリングマネージャーの役割変化(2026年時点の動向)</div>
          </div>

          <h3>なぜこの変化が起きているのか</h3>
          <p>AIコーディングエージェントの登場によって、アイデアを動くソフトウェアに変換するまでの障壁が大幅に下がったことが背景にあります。LeadDevの取材に対し、SpotifyのエンジニアリングマネージャーであるEmma Bostianは、AIがリーダー層にとってもコードへの直接的な貢献をしやすくしていると述べています。同時に、エンジニア側はAIが生成したコードのレビューに費やす時間が増えているとも指摘されており、エンジニアとマネージャーの役割の境界線が従来よりも曖昧になりつつあります。</p>
          <p>ただし、専門家は「マネージャーの目標がもう一人のエンジニアになることではない」という点を強調しています。技術的に手を動かせることと、チームを率いること・優先順位を決めること・メンバーを育てることは、依然として別のスキルセットです。AI時代のEMに求められるのは、<strong>技術的な勘を失わずに保ちながら、あくまでマネジメントの本分(人・優先順位・組織)に軸足を置き続けるバランス感覚</strong>だと言えます。</p>

          <h3>マネージャーが押さえておくべき実務上の変化</h3>
          <ul>
            <li><strong>委任の対象が「人だけでなくAIエージェントにも広がる」。</strong>どのエージェントにどの権限(リポジトリへの書き込み、シークレットへのアクセスなど)を与えるかというガバナンスの意識が必要になります。</li>
            <li><strong>レビューの重要性が一段と増す。</strong>AIが生成した成果物は「ジュニアエンジニアが書いたプルリクエスト」のように、差分の確認・テストの実行・エッジケースの検証・セキュリティと保守性の評価を経る必要があります。</li>
            <li><strong>技術戦略とアーキテクチャ判断への関与時間が増える傾向にある。</strong>定型的な実装作業がAIに移る分、人間の判断が必要な領域(設計判断・トレードオフの意思決定)にマネージャーの時間配分がシフトしています。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://leaddev.com/management/engineering-managers-are-back-in-the-codebase" target="_blank" rel="noopener">LeadDev, Engineering managers are back in the codebase</a></li>
            </ul>
          </div>
        </section>

        <section id="remote-hybrid">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:home-2" aria-hidden="true" />SECTION 12</div>
          <h2>リモート/ハイブリッドチームのマネジメント</h2>

          <p>Stanierは著書『Become an Effective Software Engineering Manager』の中で「現代の職場(The Modern Workplace)」という章を設け、リモートワークへのシフト、ダイバーシティとインクルージョン、ワークライフバランスを、現代のエンジニアリングマネジメントに欠かせないテーマとして扱っています。</p>

          <h3>リモート/ハイブリッドチームで意識すべきポイント</h3>
          <ul>
            <li><strong>1on1と非公式なコミュニケーションの意図的な設計。</strong>オフィスでの雑談的な接点が失われる分、1on1やチームの交流機会を意図的に設計する必要があります。</li>
            <li><strong>書き言葉での明確さ。</strong>対面での補足ができない分、非同期のドキュメントやメッセージの明確さがより重要になります。</li>
            <li><strong>タイムゾーンをまたぐ配慮。</strong>会議時間の公平な分散、非同期での意思決定プロセスの整備が求められます。</li>
            <li><strong>成果ベースでの評価。</strong>勤務時間や「見えている時間」ではなく、成果とアウトプットで評価する姿勢を徹底します。</li>
            <li><strong>BICEPSの視点を持つ。</strong>リモート環境では特にBelonging(帰属)とPredictability(予測可能性)が脅かされやすいため、意識的なケアが必要です。</li>
          </ul>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">James Stanier, Become an Effective Software Engineering Manager</a></li>
              <li><a href="https://larahogan.me/blog/predictability-stability-terrible-times/" target="_blank" rel="noopener">Lara Hogan, Creating predictability and stability in times of rapid change</a></li>
            </ul>
          </div>
        </section>

        <section id="summary-checklist">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 13</div>
          <h2>まとめ:ベストプラクティス・チェックリスト</h2>

          <p>ここまで解説してきた内容を、日々の実践で振り返るためのチェックリストとしてまとめます。</p>

          <ul>
            <li>最初の90日間は「変える」より先に「観察して理解する」ことを優先したか</li>
            <li>全メンバーと定期的な1on1を設定し、コントラクティングを行ったか</li>
            <li>1on1でUpdate(状況報告)だけで終わっていないか意識しているか</li>
            <li>フィードバックは「観察+影響+要望」の型で具体的に伝えているか</li>
            <li>メンタリング・コーチング・スポンサリング・フィードバックの4モードを使い分けているか</li>
            <li>タスクの委任レベルを本人と明示的にすり合わせているか</li>
            <li>チームの心理的安全性を意識的に育てているか</li>
            <li>パフォーマンス評価はエビデンスに基づき、キャリブレーションを経ているか</li>
            <li>採用面接は構造化され、評価ルーブリックに基づいているか</li>
            <li>生産性を単一の活動指標ではなく、DORA/SPACEのような多面的な視点で捉えているか</li>
            <li>AI時代における自分自身の技術的関与とマネジメントの本分のバランスを意識しているか</li>
            <li>リモート/ハイブリッド環境ではBICEPS(特に帰属と予測可能性)に配慮しているか</li>
          </ul>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <p>このチェックリストは一度に全て満たす必要はありません。まずは1on1とフィードバックの2領域から着手し、習慣として定着してから次の領域に取り組むことをお勧めします。マネジメントはスプリントではなくマラソンです。</p>
          </div>
        </section>

        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 14</div>
          <h2>参考文献・情報源一覧</h2>

          <p>本ガイドの作成にあたり、以下の一次情報・著名な実践者の発信を参照しました(2026年8月14日時点で確認)。</p>

          <div class="ref-group">
            <h3>書籍</h3>
            <ul class="ref-list">
              <li><span class="ref-name">James Stanier, Become an Effective Software Engineering Manager(Pragmatic Bookshelf)</span><a class="ref-url" href="https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/" target="_blank" rel="noopener">https://pragprog.com/titles/jsengman/become-an-effective-software-engineering-manager/</a></li>
              <li><span class="ref-name">Camille Fournier, The Manager's Path — 要約記事</span><a class="ref-url" href="https://www.runn.io/blog/the-managers-path-summary" target="_blank" rel="noopener">https://www.runn.io/blog/the-managers-path-summary</a></li>
              <li><span class="ref-name">Lara Hogan, Resilient Management(書籍公式サイト)</span><a class="ref-url" href="https://resilient-management.com/" target="_blank" rel="noopener">https://resilient-management.com/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>著名な実践者のブログ・ニュースレター</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Camille Fournier インタビュー(Lenny's Newsletter)</span><a class="ref-url" href="https://www.lennysnewsletter.com/p/engineering-leadership-camille-fournier" target="_blank" rel="noopener">https://www.lennysnewsletter.com/p/engineering-leadership-camille-fournier</a></li>
              <li><span class="ref-name">Will Larson, Irrational Exuberance(ブログ本体)</span><a class="ref-url" href="https://lethain.com/" target="_blank" rel="noopener">https://lethain.com/</a></li>
              <li><span class="ref-name">Will Larson, "Good engineering management is a fad"</span><a class="ref-url" href="https://lethain.com/good-eng-mgmt-is-a-fad/" target="_blank" rel="noopener">https://lethain.com/good-eng-mgmt-is-a-fad/</a></li>
              <li><span class="ref-name">Will Larson, "Managing Staff-plus engineers"</span><a class="ref-url" href="https://lethain.com/managing-staff-plus-engineers/" target="_blank" rel="noopener">https://lethain.com/managing-staff-plus-engineers/</a></li>
              <li><span class="ref-name">Gergely Orosz, "A Checklist For First-Time Engineering Managers"(The Pragmatic Engineer)</span><a class="ref-url" href="https://blog.pragmaticengineer.com/checklist-for-first-time-managers/" target="_blank" rel="noopener">https://blog.pragmaticengineer.com/checklist-for-first-time-managers/</a></li>
              <li><span class="ref-name">Nicole Forsgrenほか, SPACEフレームワーク解説(The Pragmatic Engineer Newsletter)</span><a class="ref-url" href="https://newsletter.pragmaticengineer.com/p/developer-productivity-a-new-framework" target="_blank" rel="noopener">https://newsletter.pragmaticengineer.com/p/developer-productivity-a-new-framework</a></li>
              <li><span class="ref-name">Lara Hogan, Management(ブログ)</span><a class="ref-url" href="https://larahogan.me/management/" target="_blank" rel="noopener">https://larahogan.me/management/</a></li>
              <li><span class="ref-name">Lara Hogan, "Creating predictability and stability in times of rapid change"(BICEPSの解説)</span><a class="ref-url" href="https://larahogan.me/blog/predictability-stability-terrible-times/" target="_blank" rel="noopener">https://larahogan.me/blog/predictability-stability-terrible-times/</a></li>
              <li><span class="ref-name">Michael Lopp(Rands), "The Update, The Vent, and The Disaster"</span><a class="ref-url" href="https://randsinrepose.com/archives/the-update-the-vent-and-the-disaster/" target="_blank" rel="noopener">https://randsinrepose.com/archives/the-update-the-vent-and-the-disaster/</a></li>
              <li><span class="ref-name">Kim Scott, Radical Candor — 公式フレームワーク解説</span><a class="ref-url" href="https://www.radicalcandor.com/our-approach" target="_blank" rel="noopener">https://www.radicalcandor.com/our-approach</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>企業・研究機関の一次情報</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Google re:Work, "Following the data: The research behind great managers"(Project Oxygen)</span><a class="ref-url" href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener">https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers</a></li>
              <li><span class="ref-name">Harvard Business Review, "How Google Sold Its Engineers on Management"</span><a class="ref-url" href="https://hbr.org/2013/12/how-google-sold-its-engineers-on-management" target="_blank" rel="noopener">https://hbr.org/2013/12/how-google-sold-its-engineers-on-management</a></li>
              <li><span class="ref-name">Google re:Work, "A guide to structured interviewing for better hiring practices"</span><a class="ref-url" href="https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices" target="_blank" rel="noopener">https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices</a></li>
              <li><span class="ref-name">Amy Edmondson(心理的安全性の提唱者) — 経歴・研究概要</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Amy_Edmondson" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Amy_Edmondson</a></li>
              <li><span class="ref-name">SPACE Framework 公式解説サイト</span><a class="ref-url" href="https://space-framework.com/" target="_blank" rel="noopener">https://space-framework.com/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>実務ガイド・2026年動向</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Jurgen Appelo, Management 3.0, "Delegation Skills &amp; Empowerment"(委任の7段階)</span><a class="ref-url" href="https://management30.com/empower-teams/delegation-empowerment/" target="_blank" rel="noopener">https://management30.com/empower-teams/delegation-empowerment/</a></li>
              <li><span class="ref-name">Culture Amp, "Performance review calibrations: What you need to know"</span><a class="ref-url" href="https://www.cultureamp.com/blog/performance-review-calibrations" target="_blank" rel="noopener">https://www.cultureamp.com/blog/performance-review-calibrations</a></li>
              <li><span class="ref-name">LeadDev, "Engineering managers are back in the codebase"(2026年AI時代のEM動向)</span><a class="ref-url" href="https://leaddev.com/management/engineering-managers-are-back-in-the-codebase" target="_blank" rel="noopener">https://leaddev.com/management/engineering-managers-are-back-in-the-codebase</a></li>
            </ul>
          </div>
        </section>

        <footer>
          本ページは教育・学習支援を目的として作成された非公式のまとめ資料です。各章の内容は出典元の一次情報に基づいていますが、詳細や最新情報は必ず原典（書籍・公式サイト・各記事）をご確認ください。最終更新: 2026年8月14日。
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.75;
}

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

.sidebar-nav a :deep(svg) {
  font-size: 17px;
  width: 17px;
  height: 17px;
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

.sidebar-toggle :deep(svg) {
  width: 22px;
  height: 22px;
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
  color: var(--color-gold);
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

.hero-eyebrow :deep(svg) {
  width: 18px;
  height: 18px;
}

h1 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-ink);
  margin: 0 0 20px;
  letter-spacing: -0.01em;
}

.hero-lede {
  font-size: 17px;
  line-height: 1.8;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 32px 0 36px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 20px 24px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-soft);
}

.disclaimer-box {
  background: var(--color-paper-sunken);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px 20px;
  font-size: 16px;
  color: var(--color-ink-soft);
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.6;
}

.disclaimer-box :deep(svg) {
  width: 18px;
  height: 18px;
  color: var(--color-ink-faint);
  flex: none;
  margin-top: 3px;
}

/* ===================== Sections ===================== */
section {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 40px 44px 48px;
  margin-bottom: 40px;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-indigo);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.section-eyebrow :deep(svg) {
  width: 16px;
  height: 16px;
}

h2 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 20px;
  line-height: 1.35;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 14px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 32px 0 12px;
  line-height: 1.4;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p {
  margin: 0 0 16px;
  color: var(--color-ink-soft);
}

p:last-child {
  margin-bottom: 0;
}

p strong, li strong {
  color: var(--color-ink);
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
  color: var(--color-ink-soft);
}

li {
  margin-bottom: 8px;
}

li:last-child {
  margin-bottom: 0;
}

/* ===================== Step List ===================== */
.step-list {
  list-style: none;
  padding: 0;
  margin: 24px 0 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-list li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--color-paper);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px 20px;
}

.step-num {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-body {
  flex: 1;
}

.step-title {
  font-weight: 700;
  color: var(--color-ink);
  font-size: 16px;
  margin-bottom: 4px;
}

.step-desc {
  font-size: 16px;
  color: var(--color-ink-soft);
  line-height: 1.6;
}

/* ===================== Tables ===================== */
.table-wrap {
  overflow-x: auto;
  margin: 24px 0 28px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  background: var(--color-paper-raised);
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.02em;
}

tr:last-child td {
  border-bottom: none;
}

td:first-child {
  font-weight: 500;
  color: var(--color-ink);
}

/* ===================== Diagrams ===================== */
.diagram-card {
  background: var(--color-paper-sunken);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  margin: 28px 0;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 14px;
}

.diagram-loading {
  text-align: center;
  color: var(--color-ink-faint);
  padding: 24px 0;
}

/* ===================== Callouts ===================== */
.callout {
  border-radius: 8px;
  padding: 18px 22px;
  margin: 24px 0;
  border-left: 4px solid;
}

.callout p {
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
}

.callout ul {
  margin: 0;
  padding-left: 20px;
  font-size: 16px;
}

.callout li {
  margin-bottom: 4px;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}

.callout-title :deep(svg) {
  width: 17px;
  height: 17px;
}

.callout.note {
  background: var(--color-indigo-tint);
  border-left-color: var(--color-indigo);
  color: var(--color-ink);
}

.callout.note .callout-title {
  color: var(--color-indigo);
}

.callout.practice {
  background: var(--color-gold-tint);
  border-left-color: var(--color-gold);
  color: var(--color-ink);
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.source {
  background: var(--color-paper-sunken);
  border-left-color: var(--color-border-strong);
  color: var(--color-ink-soft);
  font-size: 16px;
}

.callout.source .callout-title {
  color: var(--color-ink-soft);
}

.callout.source a {
  color: var(--color-indigo);
  word-break: break-all;
}

/* ===================== References ===================== */
.ref-group {
  margin-top: 24px;
}

.ref-group:first-of-type {
  margin-top: 16px;
}

.ref-group h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--color-border);
}

.ref-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ref-list li {
  padding: 10px 0;
  border-bottom: 1px solid var(--color-paper-sunken);
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
  text-decoration: none;
}

.ref-list .ref-url:hover {
  color: var(--color-indigo);
  text-decoration: underline;
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
    transition: transform 0.2s ease;
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
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
