<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "leadership-foundations",
  "team-effectiveness-science",
  "leadership-roles",
  "first-90-days",
  "one-on-ones-feedback",
  "systems-thinking",
  "code-review-culture",
  "antipatterns",
  "continuous-growth",
  "summary",
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
  title: "エンジニアリングチームのリード術 完全ガイド | 初学者のための実践ベストプラクティス",
  description: "Addy Osmani著『Leading Effective Engineering Teams』、GoogleのProject Oxygen/Aristotle、Camille Fournier、Will Larson、Gergely Orosz、Michael Lopp、Kim Scottらの知見に基づく、初学者向けエンジニアリングリード術の実践ガイド",
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

const DIAGRAM_THREE_E_MODEL = `flowchart TB
    A["Enable 土台を整える"] --> B["Empower 力を引き出す"]
    B --> C["Expand 範囲を広げる"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C box;`;

const DIAGRAM_TEAM_DYNAMICS = `flowchart TB
    PS["心理的安全性 Psychological Safety"] --> D["相互信頼性 Dependability"]
    PS --> S["構造と明確さ Structure and Clarity"]
    PS --> M["仕事の意味 Meaning"]
    PS --> I["インパクト Impact"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PS hub;
    class D,S,M,I box;`;

const DIAGRAM_CAREER_LADDER = `flowchart TB
    IC["ソフトウェアエンジニア"] --> TL["テックリード"]
    TL --> EM["エンジニアリングリード 初めての管理職"]
    EM --> SM["シニアマネージャー マネージャーのマネージャー"]
    SM --> DIR["ディレクター"]
    DIR --> VP["VPエンジニアリング"]
    VP --> CTO["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class IC,TL,EM,SM,DIR,VP box;
    class CTO done;`;

const DIAGRAM_FIRST_90_DAYS = `flowchart TB
    Start["新任エンジニアリングマネージャー"] --> A["チームビルディングと育成"]
    Start --> B["成果を出す仕組みづくり"]
    Start --> C["コラボレーションと連携"]
    Start --> D["ビジョンの共有"]
    Start --> E["自己成長"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Start hub;
    class A,B,C,D,E box;`;

const DIAGRAM_DELEGATION_DECISION = `flowchart TB
    Task["タスクが発生"] --> Q1{"発生頻度は高いか"}
    Q1 -- はい --> Q2{"複雑さは高いか"}
    Q1 -- いいえ --> Q3{"複雑さは高いか"}
    Q2 -- はい --> R1["人材育成の機会として委譲する"]
    Q2 -- いいえ --> R2["すぐに手放し 仕組み化する"]
    Q3 -- はい --> R3["自分で対応しつつ知見を共有する"]
    Q3 -- いいえ --> R4["まとめて処理するか委譲する"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Task hub;
    class Q1,Q2,Q3 box;
    class R1,R2,R3,R4 done;`;

const DIAGRAM_CODE_REVIEW_FLOW = `flowchart TB
    A["変更 CL PRを作成する"] --> B["小さく自己完結した変更に分割する"]
    B --> C["レビューを依頼する"]
    C --> D{"コードの健全性は向上するか"}
    D -- はい --> E["LGTM Looks Good To Me で承認"]
    D -- いいえ --> F["建設的なコメントで改善を依頼する"]
    F --> B
    E --> G["マージして次の変更へ"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,F box;
    class E,G done;`;

const DIAGRAM_ANTIPATTERN_LEVELS = `flowchart TB
    AP["効果性を損なうアンチパターン"] --> IND["個人レベル"]
    AP --> PRA["プラクティスレベル"]
    AP --> STR["構造レベル"]
    AP --> LEAD["リーダーシップレベル"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class AP hub;
    class IND,PRA,STR,LEAD box;`;
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
            <div class="brand-title">エンジニアリングリード ガイド</div>
            <div class="brand-subtitle">初学者のための実践ベストプラクティス</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li>
            <a href="#leadership-foundations" :class="{ active: activeId === 'leadership-foundations' }" @click="closeSidebar">
              <Icon name="tabler:building-bank" aria-hidden="true" />
              <span>リーダーシップの土台</span>
            </a>
          </li>
          <li>
            <a href="#team-effectiveness-science" :class="{ active: activeId === 'team-effectiveness-science' }" @click="closeSidebar">
              <Icon name="tabler:chart-pie" aria-hidden="true" />
              <span>効果的なチームの科学</span>
            </a>
          </li>
          <li>
            <a href="#leadership-roles" :class="{ active: activeId === 'leadership-roles' }" @click="closeSidebar">
              <Icon name="tabler:route" aria-hidden="true" />
              <span>リーダーの役割とキャリア</span>
            </a>
          </li>
          <li>
            <a href="#first-90-days" :class="{ active: activeId === 'first-90-days' }" @click="closeSidebar">
              <Icon name="tabler:clipboard-check" aria-hidden="true" />
              <span>新任リーダーの最初の一歩</span>
            </a>
          </li>
          <li>
            <a href="#one-on-ones-feedback" :class="{ active: activeId === 'one-on-ones-feedback' }" @click="closeSidebar">
              <Icon name="tabler:message-2" aria-hidden="true" />
              <span>1on1とフィードバック</span>
            </a>
          </li>
          <li>
            <a href="#systems-thinking" :class="{ active: activeId === 'systems-thinking' }" @click="closeSidebar">
              <Icon name="tabler:git-branch" aria-hidden="true" />
              <span>実行力を高めるシステム思考</span>
            </a>
          </li>
          <li>
            <a href="#code-review-culture" :class="{ active: activeId === 'code-review-culture' }" @click="closeSidebar">
              <Icon name="tabler:code" aria-hidden="true" />
              <span>コードレビュー文化</span>
            </a>
          </li>
          <li>
            <a href="#antipatterns" :class="{ active: activeId === 'antipatterns' }" @click="closeSidebar">
              <Icon name="tabler:alert-triangle" aria-hidden="true" />
              <span>よくあるアンチパターン</span>
            </a>
          </li>
          <li>
            <a href="#continuous-growth" :class="{ active: activeId === 'continuous-growth' }" @click="closeSidebar">
              <Icon name="tabler:trending-up" aria-hidden="true" />
              <span>継続的な成長</span>
            </a>
          </li>
          <li>
            <a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar">
              <Icon name="tabler:flag-3" aria-hidden="true" />
              <span>まとめ</span>
            </a>
          </li>
          <li>
            <a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar">
              <Icon name="tabler:link" aria-hidden="true" />
              <span>参考文献・出典</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">

    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />書籍・Google研究・海外リーダーの知見に基づく実践ガイド</div>
      <h1>エンジニアリングチームのリード術</h1>
      <p class="hero-lede">
        初めてチームをリードするエンジニアのために、効果的なチーム作りの科学的根拠から、1on1、コードレビュー文化、アンチパターンの回避まで、ステップバイステップで実践できるベストプラクティスをまとめました。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">11</div><div class="stat-label">セクション構成</div></div>
        <div class="stat-card"><div class="stat-number">10</div><div class="stat-label">参照した情報源</div></div>
        <div class="stat-card"><div class="stat-number">7</div><div class="stat-label">Mermaid図解</div></div>
        <div class="stat-card"><div class="stat-number">2026.08</div><div class="stat-label">最終調査時点</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        本ガイドは、書籍・Google社の公開研究・著名なエンジニアリングリーダーのブログ記事などの公開情報を基に構成した、教育・学習支援を目的とした非公式の解説資料です。各テーマの詳細は、必ず<a href="#references">参考文献・出典</a>および原典をご確認ください。
      </div>
    </div>

    <!-- ===================== 01. Leadership Foundations ===================== -->
    <section id="leadership-foundations">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 01</div>
      <h2>リーダーシップの土台を理解する</h2>

      <h3>Efficiency・Effectiveness・Productivityの違い</h3>
      <p>
        優秀なエンジニアが必ずしも優秀なリーダーになれるとは限りません。コードを書く能力と、人・チーム・プロジェクトを導く能力はまったく別のスキルセットです。Googleの元Chromeチームで10年以上のリーダー経験を持つAddy Osmaniは、著書『Leading Effective Engineering Teams』の中で、まず「効率性(Efficiency)」「効果性(Effectiveness)」「生産性(Productivity)」という3つの言葉を明確に区別することが、リーダーシップの出発点だとしています。
      </p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>概念</th><th>問いかけ</th><th>焦点</th><th>陥りやすい罠</th></tr></thead>
          <tbody>
            <tr><td><strong>Efficiency</strong><br>効率性</td><td>同じ成果をより少ない資源で出せているか</td><td>投入(インプット)の最小化</td><td>「速く作ること」自体が目的化する</td></tr>
            <tr><td><strong>Effectiveness</strong><br>効果性</td><td>正しいことをやれているか</td><td>アウトカム(成果)への到達</td><td>効率だけを追い、方向性を見失う</td></tr>
            <tr><td><strong>Productivity</strong><br>生産性</td><td>単位時間あたりどれだけ出力したか</td><td>アウトプット量</td><td>出力の量を測るあまり質や成果を軽視する</td></tr>
          </tbody>
        </table>
      </div>

      <p>初学者リーダーがまず意識すべきは、「アウトプット(作った量)」ではなく「アウトカム(生み出した価値)」に焦点を当てることです。</p>

      <h3>3つのEモデル: Enable → Empower → Expand</h3>
      <p>Osmaniは、効果的なエンジニアリングを実現する枠組みとして「3つのEモデル」を提示しています。これはリーダーが段階的に取り組むべき順序でもあります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_THREE_E_MODEL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Enable(土台を整える) → Empower(力を引き出す) → Expand(範囲を広げる)</div>
      </div>

      <ul>
        <li><strong>Enable(土台を整える)。</strong>自組織・チーム規模に合った「効果性とは何か」を定義し、初期状態を整える段階。</li>
        <li><strong>Empower(力を引き出す)。</strong>個人の効果性を高め、機会を与えて問題を減らし、レバレッジの高い活動を特定する段階。</li>
        <li><strong>Expand(範囲を広げる)。</strong>リーダーとしての課題に向き合い、影響力を組織全体へと広げていく段階。</li>
      </ul>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>この順序を飛ばして「まず組織全体を変えよう」とすると失敗しやすい、というのが実務上の教訓です。まずは自分のチームの土台(Enable)から着手しましょう。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.oreilly.com/library/view/leading-effective-engineering/9781098148232/" target="_blank" rel="noopener">Addy Osmani, Leading Effective Engineering Teams (O'Reilly)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 02. Team Effectiveness Science ===================== -->
    <section id="team-effectiveness-science">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 02</div>
      <h2>効果的なチームを支える科学的根拠</h2>

      <p>エンジニアリングリーダーシップは「センス」だけの話ではありません。Googleは10年以上にわたり、大規模な社内データを用いて「何が優れたマネージャー・優れたチームを作るか」を検証してきました。</p>

      <h3>Project Oxygen: 優れたマネージャーの10の行動</h3>
      <p>2011年に始まったProject Oxygenは、1万件以上のマネージャーに関するデータポイントを分析し、優れたマネージャーに共通する行動を特定しました。当初8項目だったものが、2018年の再検証で10項目に拡張されています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>行動</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>良いコーチであること</td></tr>
            <tr><td>2</td><td>マイクロマネジメントせず、チームに権限を委譲すること</td></tr>
            <tr><td>3</td><td>全員を尊重する、インクルーシブなチーム環境を作ること</td></tr>
            <tr><td>4</td><td>生産性と成果に焦点を当てること</td></tr>
            <tr><td>5</td><td>効果的にコミュニケーションすること(聞く・伝える)</td></tr>
            <tr><td>6</td><td>キャリア開発を支援し、パフォーマンスについて話し合うこと</td></tr>
            <tr><td>7</td><td>明確なビジョンと戦略を示すこと</td></tr>
            <tr><td>8</td><td>チームにアドバイスできる技術力を持つこと</td></tr>
            <tr><td>9</td><td>組織を横断して協働すること</td></tr>
            <tr><td>10</td><td>強い意思決定力を持つこと</td></tr>
          </tbody>
        </table>
      </div>

      <p>Googleは現在、この10行動を土台にした「Deliver Results(成果を出す)」「Develop People(人を育てる)」「Build Community(コミュニティを築く)」という3つのマネージャー責任フレームワークへと発展させています。</p>

      <h3>Project Aristotle: 効果的なチームの5つの力学</h3>
      <p>Project Oxygenがマネージャー個人に焦点を当てたのに対し、2016年に発表されたProject Aristotleは「何がチームを効果的にするか」を180チーム規模で調査しました。結論は明快で、<strong>「誰がチームにいるか」よりも「チームがどう働いているか」の方が重要</strong>というものでした。重要度の高い順に5つの力学が特定されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TEAM_DYNAMICS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">心理的安全性は、他の4つの力学を支える土台となる</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>力学</th><th>内容</th><th>チェック用の問い</th></tr></thead>
          <tbody>
            <tr><td><strong>心理的安全性</strong></td><td>対人リスクを取っても否定・罰せられないという安心感</td><td>ミスをしても、それが自分に不利に働かないと感じるか</td></tr>
            <tr><td><strong>相互信頼性</strong></td><td>メンバーが質の高い仕事を期限通りに完了させられるか</td><td>チームメンバーは、やると言ったことを実行してくれるか</td></tr>
            <tr><td><strong>構造と明確さ</strong></td><td>目標・役割・実行計画が明確か</td><td>チームには効果的な意思決定プロセスがあるか</td></tr>
            <tr><td><strong>仕事の意味</strong></td><td>仕事そのもの、またはその成果に個人的な意義を感じられるか</td><td>自分の仕事はチームにとって意味があると感じるか</td></tr>
            <tr><td><strong>インパクト</strong></td><td>自分の仕事が組織やユーザーに変化をもたらすと信じられるか</td><td>自分の仕事が組織の目標にどう貢献しているか理解しているか</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>心理的安全性は他の4つの力学の「土台」です。ミスを報告できなければ相互信頼性は崩れ、疑問を口にできなければ構造の不明確さも解消されません。まずここに投資することが、リーダーとして最もレバレッジの高い一手です。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener">Google re:Work, Following the data: The research behind great managers</a></li>
          <li><a href="https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness" target="_blank" rel="noopener">Google re:Work, Understand team effectiveness</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 03. Leadership Roles ===================== -->
    <section id="leadership-roles">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 03</div>
      <h2>エンジニアリングリーダーの役割を理解する</h2>

      <h3>テックリード・エンジニアリングマネージャー・TLMの違い</h3>
      <p>Osmaniの著書では、リーダーシップの役割を大きく3種類に整理しています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>役割</th><th>主な責任</th><th>向いている人</th></tr></thead>
          <tbody>
            <tr><td><strong>テックリード</strong><br>Tech Lead</td><td>技術的な方向性の決定、アーキテクチャ判断、プロジェクトの橋渡し役</td><td>技術に深く関わり続けたい人</td></tr>
            <tr><td><strong>エンジニアリングマネージャー</strong><br>EM</td><td>人材育成、採用、パフォーマンス評価、チームの運営</td><td>人のマネジメントに関心がある人</td></tr>
            <tr><td><strong>テックリードマネージャー</strong><br>TLM</td><td>技術リードと人のマネジメントを兼務</td><td>小規模チームや初期段階の組織で多い形態</td></tr>
          </tbody>
        </table>
      </div>

      <h3>キャリアラダーとしての管理職パス</h3>
      <p>『The Manager's Path』の著者であり、Rent the RunwayのCTOを務めたCamille Fournierは、エンジニアリング管理職のキャリアを段階的なラダーとして描いています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CAREER_LADDER" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">ソフトウェアエンジニアからCTOに至るキャリアラダー</div>
      </div>

      <p>Fournierは、シニアマネージャー以上になって陥りやすい失敗として、次の3つの「マネジメント不全」を挙げています。</p>
      <ul>
        <li><strong>下方向のマネジメント不全。</strong>委譲できない、後継者を育てない、無理な業務を断れない。</li>
        <li><strong>上方向のマネジメント不全。</strong>経営層への効果的な報告ができない、解決策のない不満だけを述べる。</li>
        <li><strong>横方向のマネジメント不全。</strong>他部門との関係構築や、説得力のあるビジョン作りができない。</li>
      </ul>
      <p>これは新任マネージャーだけでなく、シニアなIC(Individual Contributor)にも共通する課題です。</p>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.shortform.com/blog/the-managers-path-camille-fournier/" target="_blank" rel="noopener">Camille Fournier, The Manager's Path 要約 (Shortform)</a></li>
          <li><a href="https://www.welcometothejungle.com/en/articles/btc-manager-path-camille-fournier" target="_blank" rel="noopener">The Manager's Path 解説記事 (Welcome to the Jungle)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 04. First 90 Days ===================== -->
    <section id="first-90-days">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 04</div>
      <h2>新任リーダーの最初のステップ</h2>

      <p>『The Pragmatic Engineer』の著者でUber出身のGergely Oroszは、初めてマネージャーになる人向けに実践的なチェックリストを公開しています。特徴的なのは、「何をすべきか(What)」だけを定義し、「どうやるか(How)」は本人の裁量に委ねている点です。これはそのままマイクロマネジメントを避けるための工夫でもあります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FIRST_90_DAYS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">新任エンジニアリングマネージャーが focus すべき5つの領域</div>
      </div>

      <ol class="step-list">
        <li>
          <div class="step-num" data-testid="step-tag">1</div>
          <div class="step-body">
            <div class="step-title">チームビルディングと育成</div>
            <div class="step-desc">チーム内の信頼を築き、必要であれば採用を進め、メンバーの成長を支援する。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">2</div>
          <div class="step-body">
            <div class="step-title">成果を出す仕組みづくり</div>
            <div class="step-desc">チームが実行できる体制を整え、高い品質基準を維持しながら物事を前に進める。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">3</div>
          <div class="step-body">
            <div class="step-title">コラボレーションと連携</div>
            <div class="step-desc">オープンなコミュニケーションチャネルを維持し、他チームとの橋渡し役になり、意味のあるミーティングを運営する。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">4</div>
          <div class="step-body">
            <div class="step-title">ビジョンの共有</div>
            <div class="step-desc">チームの存在目的と価値観を言語化し、計画づくりにメンバーを巻き込む。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">5</div>
          <div class="step-body">
            <div class="step-title">自己成長</div>
            <div class="step-desc">自分自身の目標を設定し、メンターを持ち、社内外のネットワークを築く。</div>
          </div>
        </li>
      </ol>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>チェックリストをそのままコピーしない。</strong>自組織における「有能なマネージャー像」を先に定義し、そこから逆算して5領域をカスタマイズする。</li>
          <li><strong>新任マネージャーへの支援を惜しまない。</strong>新任エンジニアや新任プロジェクトリードと同じくらいの支援が必要であり、それを支えることはマネージャー自身にとっても最もレバレッジの高い活動である。</li>
        </ul>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://blog.pragmaticengineer.com/checklist-for-first-time-managers/" target="_blank" rel="noopener">Gergely Orosz, A Checklist For First-Time Engineering Managers (The Pragmatic Engineer)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 05. One-on-Ones & Feedback ===================== -->
    <section id="one-on-ones-feedback">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:message-2" aria-hidden="true" />SECTION 05</div>
      <h2>1on1とフィードバックの技術</h2>

      <h3>週次1on1という「揺るがない予定」</h3>
      <p>Netscape、Apple、Pinterest、Slackなどでエンジニアリング組織を率いてきたMichael Lopp(ブログ「Rands in Repose」の著者)は、マネジメントで最も重要な習慣として「毎週30分、何があっても行う1on1」を挙げています。彼はこの時間を、進捗報告の場ではなく、目の前の緊急事態から一歩引いて戦略的・個人的な対話をする場と位置づけています。多忙になるほど1on1が真っ先に削られがちですが、実際にはチームが動揺している時ほどこの時間の価値が高まる、というのが彼の一貫した主張です。</p>

      <h3>Radical Candor: ケア・パーソナリーとチャレンジ・ダイレクトリー</h3>
      <p>GoogleとAppleでエグゼクティブを務めたKim Scottが提唱する「Radical Candor(徹底した率直さ)」は、フィードバックを2つの軸で整理するフレームワークです。「個人として相手を気にかけているか(Care Personally)」と「率直に課題を指摘しているか(Challenge Directly)」の組み合わせで、フィードバックのスタイルを4象限に分類します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th></th><th>Challenge Directly する</th><th>Challenge Directly しない</th></tr></thead>
          <tbody>
            <tr><td><strong>Care Personally する</strong></td><td><strong>Radical Candor</strong><br>思いやりを持ちながら率直に伝える理想形</td><td><strong>Ruinous Empathy</strong>(破滅的共感)<br>優しさ優先で本当の課題を伝えられない</td></tr>
            <tr><td><strong>Care Personally しない</strong></td><td><strong>Obnoxious Aggression</strong>(傲慢な攻撃性)<br>正しいことを言うが配慮がない</td><td><strong>Manipulative Insincerity</strong>(操作的不誠実)<br>どちらも欠如した最悪の状態</td></tr>
          </tbody>
        </table>
      </div>

      <p>初学者リーダーが最初に陥りやすいのは、対立を避けるための「Ruinous Empathy」です。</p>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>自分からフィードバックを求める。</strong>「私のどんな行動が、あなたと仕事をしやすくしていますか、あるいはしにくくしていますか」と尋ねることから始めると、相手にフィードバックを与えやすい信頼関係を築きやすい。</li>
        </ul>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.welcometothejungle.com/en/articles/btc-michael-lopp-interview-management" target="_blank" rel="noopener">Michael Lopp インタビュー (Welcome to the Jungle)</a></li>
          <li><a href="https://www.radicalcandor.com/our-approach" target="_blank" rel="noopener">Kim Scott, Our Approach (Radical Candor 公式サイト)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 06. Systems Thinking ===================== -->
    <section id="systems-thinking">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 06</div>
      <h2>チームの実行力を高めるシステム思考</h2>

      <p>Yahoo、Digg、Uber、Stripeでエンジニアリングリーダーを務めたWill Larsonは、著書『An Elegant Puzzle』の中で、エンジニアリングマネジメントを「システム思考」で捉えることを提案しています。チームサイズの決定、技術的負債への対応、大規模マイグレーションの進め方など、個別の判断を場当たり的に行うのではなく、繰り返し使える意思決定の型を持つことが重要だとされています。</p>

      <h3>委譲の判断フレームワーク</h3>
      <p>タスクを「頻度」と「複雑さ」の2軸で捉え、委譲すべきか自分で対応すべきかを判断する考え方は、システム思考に基づくマネジメントの代表的な実践例です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DELEGATION_DECISION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">頻度と複雑さの2軸で委譲を判断するフロー</div>
      </div>

      <ul>
        <li><strong>頻度が高く、複雑さが低いタスク。</strong>早く手放し、標準化・自動化する対象にする。</li>
        <li><strong>頻度が高く、複雑さが高いタスク。</strong>メンバーの成長機会として計画的に委譲する。</li>
        <li><strong>頻度が低く、複雑さが高いタスク。</strong>自分自身が対応しつつ、得られた知見をチームに共有する。</li>
      </ul>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>このように「自分がやるべきこと」と「任せるべきこと」を体系的に判断することが、第2章で紹介した「構造と明確さ」の力学をチームにもたらします。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://press.stripe.com/an-elegant-puzzle" target="_blank" rel="noopener">Will Larson, An Elegant Puzzle: Systems of Engineering Management (Stripe Press)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 07. Code Review Culture ===================== -->
    <section id="code-review-culture">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:code" aria-hidden="true" />SECTION 07</div>
      <h2>コードレビュー文化を築く</h2>

      <p>Googleが公開している"Engineering Practices"ドキュメントは、社内で長年運用されてきたコードレビュー原則をCC-BY 3.0ライセンスの下で公開したものです。ここで示されている中心的な考え方はシンプルで、レビューの目的は「完璧なコード」を求めることではなく、コードベースの健全性を時間とともに改善し続けることにあります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CODE_REVIEW_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">コードレビューの基本ワークフロー</div>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>「改善」で十分、「完璧」を求めない。</strong>現状より良くなっていれば承認し、さらなる改善点はコメントとして残す。</li>
          <li><strong>レビュー速度を重視する。</strong>レビューの遅延はチーム全体の生産性を大きく損なう。</li>
          <li><strong>技術的根拠に基づいて議論する。</strong>個人の好みではなく、原則に基づいてフィードバックする。オーバーエンジニアリング(今必要ない機能まで作り込むこと)にも注意を促す。</li>
        </ul>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://google.github.io/eng-practices/review/reviewer/standard.html" target="_blank" rel="noopener">Google, The Standard of Code Review (Google Engineering Practices)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 08. Antipatterns ===================== -->
    <section id="antipatterns">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 08</div>
      <h2>よくあるアンチパターンと回避策</h2>

      <p>Osmaniの著書では、エンジニアリングの効果性を損なう「アンチパターン」を4つのレベルに分類しています。初学者リーダーは、自分のチームがどのレベルの問題を抱えているかを見極めることから始めましょう。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ANTIPATTERN_LEVELS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">効果性を損なうアンチパターンの4つのレベル</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>レベル</th><th>代表例</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td><strong>個人レベル</strong></td><td>スペシャリスト依存、ゼネラリスト過多、知識の抱え込み</td><td>特定の人にしかできない状態や、逆に広く浅くなりすぎる状態</td></tr>
            <tr><td><strong>プラクティスレベル</strong></td><td>締切間際の英雄的対応、PRプロセスの乱れ、終わらないリファクタリング</td><td>開発プロセス自体が習慣的に破綻している状態</td></tr>
            <tr><td><strong>構造レベル</strong></td><td>チームの孤立、知識のボトルネック</td><td>組織構造がコラボレーションを妨げている状態</td></tr>
            <tr><td><strong>リーダーシップレベル</strong></td><td>マイクロマネジメント、スコープ管理の失敗、過剰な計画、懐疑的・受け身なリーダーシップ、正当な評価の欠如</td><td>リーダー自身の振る舞いがチームの効果性を下げている状態</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>特にリーダーシップレベルのアンチパターンは、第2章で紹介した心理的安全性を直接損ないます。マイクロマネジメントは「権限委譲」の欠如そのものであり、正当な評価の欠如は「仕事の意味」の力学を弱めます。アンチパターンへの対処は、常に本ガイドの前半で扱った基礎概念に立ち返ることが近道です。</p>
      </div>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.oreilly.com/library/view/leading-effective-engineering/9781098148232/" target="_blank" rel="noopener">Addy Osmani, Leading Effective Engineering Teams (O'Reilly)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 09. Continuous Growth ===================== -->
    <section id="continuous-growth">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:trending-up" aria-hidden="true" />SECTION 09</div>
      <h2>継続的な成長とネクストステップ</h2>

      <p>リーダーシップは一度身につけたら終わりというスキルではありません。Osmaniは「Sustain Effectiveness(効果性を持続させる)」ために、成長文化(Growth Culture)を組織に根付かせることの重要性を説いています。実践のポイントは次の通りです。</p>

      <ul>
        <li><strong>ダウンタイムを成長の機会に変える。</strong>業務に余裕がある時期こそ、学習やメンタリングに時間を投資する。</li>
        <li><strong>高負荷期でも成長機会を確保する。</strong>忙しい時期でも、小さな挑戦や新しい責任を与える工夫をする。</li>
        <li><strong>ネットワーキングを怠らない。</strong>社内外の同じ立場のリーダーとのつながりは、孤独になりがちなリーダー業務を支える重要な資産になる。</li>
      </ul>

      <p>新任リーダーは、まず第4章のチェックリストに沿って最初の90日を過ごし、第5章の週次1on1を定着させ、第2章の心理的安全性を土台としてチームを観察する、という順序で取り組むと、迷いが少なくなります。</p>

      <div class="callout source" data-variant="source" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.oreilly.com/library/view/leading-effective-engineering/9781098148232/" target="_blank" rel="noopener">Addy Osmani, Leading Effective Engineering Teams (O'Reilly)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 10</div>
      <h2>まとめ</h2>

      <p>エンジニアリングチームのリード術は、才能ではなく学習可能なスキルの集合です。本ガイドで紹介した考え方を要約すると次の通りです。</p>

      <ol class="step-list">
        <li><div class="step-num" data-testid="step-tag">1</div><div class="step-body"><div class="step-title">アウトカムに焦点を当てる</div><div class="step-desc">Efficiency・Effectiveness・Productivityを区別する。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">2</div><div class="step-body"><div class="step-title">心理的安全性を土台にする</div><div class="step-desc">相互信頼性・構造と明確さ・仕事の意味・インパクトを積み上げる。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">3</div><div class="step-body"><div class="step-title">自分の役割とキャリアラダーを理解する</div><div class="step-desc">テックリード・EM・TLMの違いを把握する。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">4</div><div class="step-body"><div class="step-title">新任期は「何を」を定義する</div><div class="step-desc">「どうやるか」はメンバーに任せる。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">5</div><div class="step-body"><div class="step-title">週次1on1とRadical Candorを実践する</div><div class="step-desc">フィードバック文化を築く。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">6</div><div class="step-body"><div class="step-title">委譲の判断軸を持つ</div><div class="step-desc">システム思考でチームの実行力を高める。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">7</div><div class="step-body"><div class="step-title">コードレビューは「改善」を基準にする</div><div class="step-desc">「完璧」を求めない。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">8</div><div class="step-body"><div class="step-title">アンチパターンを早期に見極める</div><div class="step-desc">基礎概念に立ち返って対処する。</div></div></li>
        <li><div class="step-num" data-testid="step-tag">9</div><div class="step-body"><div class="step-title">成長文化を根付かせる</div><div class="step-desc">リーダー自身も学び続ける。</div></div></li>
      </ol>
    </section>

    <!-- ===================== 11. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 11</div>
      <h2>参考文献・出典</h2>

      <p>本ガイドは以下の公開情報を要約・再構成したものであり、原文からの引用は最小限にとどめています。各テーマの詳細は、必ず原典(書籍・公式サイト)をご確認ください。</p>

      <div class="ref-group">
        <h3>書籍・出版社</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Addy Osmani, Leading Effective Engineering Teams (O'Reilly, 2024)</span><a class="ref-url" href="https://www.oreilly.com/library/view/leading-effective-engineering/9781098148232/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/leading-effective-engineering/9781098148232/</a></li>
          <li><span class="ref-name">Will Larson, An Elegant Puzzle: Systems of Engineering Management (Stripe Press)</span><a class="ref-url" href="https://press.stripe.com/an-elegant-puzzle" target="_blank" rel="noopener">https://press.stripe.com/an-elegant-puzzle</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>Google re:Work / Engineering Practices</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Understand team effectiveness (Project Aristotle)</span><a class="ref-url" href="https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness" target="_blank" rel="noopener">https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness</a></li>
          <li><span class="ref-name">Following the data: The research behind great managers (Project Oxygen)</span><a class="ref-url" href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener">https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers</a></li>
          <li><span class="ref-name">The Standard of Code Review (Google Engineering Practices)</span><a class="ref-url" href="https://google.github.io/eng-practices/review/reviewer/standard.html" target="_blank" rel="noopener">https://google.github.io/eng-practices/review/reviewer/standard.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>著名なエンジニアリングリーダーの記事・インタビュー</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Camille Fournier, The Manager's Path 要約 (Shortform)</span><a class="ref-url" href="https://www.shortform.com/blog/the-managers-path-camille-fournier/" target="_blank" rel="noopener">https://www.shortform.com/blog/the-managers-path-camille-fournier/</a></li>
          <li><span class="ref-name">The Manager's Path 解説記事 (Welcome to the Jungle)</span><a class="ref-url" href="https://www.welcometothejungle.com/en/articles/btc-manager-path-camille-fournier" target="_blank" rel="noopener">https://www.welcometothejungle.com/en/articles/btc-manager-path-camille-fournier</a></li>
          <li><span class="ref-name">Gergely Orosz, A Checklist For First-Time Engineering Managers (The Pragmatic Engineer)</span><a class="ref-url" href="https://blog.pragmaticengineer.com/checklist-for-first-time-managers/" target="_blank" rel="noopener">https://blog.pragmaticengineer.com/checklist-for-first-time-managers/</a></li>
          <li><span class="ref-name">Michael Lopp インタビュー (Welcome to the Jungle)</span><a class="ref-url" href="https://www.welcometothejungle.com/en/articles/btc-michael-lopp-interview-management" target="_blank" rel="noopener">https://www.welcometothejungle.com/en/articles/btc-michael-lopp-interview-management</a></li>
          <li><span class="ref-name">Kim Scott, Our Approach: Kim Scott's Feedback Framework (Radical Candor 公式サイト)</span><a class="ref-url" href="https://www.radicalcandor.com/our-approach" target="_blank" rel="noopener">https://www.radicalcandor.com/our-approach</a></li>
        </ul>
      </div>
    </section>

    <footer>
      本ページは公開情報の要約・再構成であり、引用は最小限にとどめています。各出典の詳細は本文および参考文献セクションをご確認ください。 &copy; 2026
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
  -webkit-font-smoothing: antialiased;
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

.sidebar-nav a svg { font-size: 17px; width: 17px; height: 17px; color: var(--color-ink-faint); flex: none; }

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

.sidebar-nav a.active svg { color: var(--color-indigo); }

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

.sidebar-toggle svg { width: 20px; height: 20px; }

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

.hero-eyebrow svg { font-size: 17px; width: 17px; height: 17px; }

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

.disclaimer-box svg { width: 16px; height: 16px; margin-right: 4px; vertical-align: -2px; }

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

.section-eyebrow svg { width: 16px; height: 16px; }

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

.callout-title svg { width: 18px; height: 18px; flex: none; }

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
  min-height: 4rem;
}

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 14px;
  text-align: center;
  padding: 24px;
}

/* ===================== Step lists ===================== */
.step-list {
  list-style: none;
  padding: 0;
  margin: 28px 0;
}

.step-list li {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.step-num {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-body { flex: 1; }
.step-body .step-title { font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
.step-body .step-desc { color: var(--color-ink-soft); font-size: 16px; }

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
    transition: transform 0.2s ease;
    box-shadow: none;
  }
  .sidebar.open { transform: translateX(0); }
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
