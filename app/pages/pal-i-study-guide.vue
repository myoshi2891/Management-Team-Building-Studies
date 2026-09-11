<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "what-is-pal1",
  "developing-teams",
  "managing-organization",
  "evidence-based-management",
  "exam-strategy",
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
  title: "PAL I(Professional Agile Leadership I)認定資格 完全ガイド | サーバントリーダーシップと組織アジリティの実践",
  description:
    "Scrum.org 公式 Professional Agile Leadership I(PAL I)認定試験の学習ガイド。サーバントリーダーシップ、自己管理型チームの育成、組織的障害の除去、Evidence-Based Management を初学者向けに解説します。",
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
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
  fontSize: "16px",
};

const DIAGRAM_DELEGATION_CYCLE = `flowchart TB
    A["リーダー: ビジョン・予算・制約などのガードレールを設定する"] --> B["チーム: ガードレールの範囲内で意思決定する"]
    B --> C["チーム: スプリントで実行し、成果物を検査する"]
    C --> D["チームとリーダー: スプリントレビュー・レトロスペクティブで振り返る"]
    D --> E["学習: 何がうまくいき、何が障害だったかを可視化する"]
    E --> F{"ガードレール自体の見直しが必要か"}
    F -->|"はい"| A
    F -->|"いいえ"| B

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;`;

const DIAGRAM_ESCALATION_FLOW = `flowchart TB
    A["チーム: 日々の作業で障害を経験する"] --> B["スクラムマスター: 障害を観察し、チーム内で解決可能かを判断する"]
    B --> C{"チーム内で解決可能か"}
    C -->|"はい"| D["スクラムマスターとチームで解決する"]
    C -->|"いいえ: 組織的な障害"| E["スクラムマスター: 組織的障害としてアジャイルリーダーにエスカレーションする"]
    E --> F["アジャイルリーダー: 組織的な意思決定権限を用いて障害の除去に取り組む"]
    F --> G["経営層・他部門: 制度変更や部門間調整を実施する"]
    G --> H["チーム: 障害が解消された環境で作業を継続する"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,E,F,G box;
    class D,H done;`;
</script>

<template>
  <div class="layout">
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      aria-controls="sidebar"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">PAL I 完全ガイド</div>
          <div class="brand-subtitle">Professional Agile Leadership I</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a :class="{ active: activeId === 'what-is-pal1' }" href="#what-is-pal1" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />試験概要と基本理念</a></li>
        <li><a :class="{ active: activeId === 'developing-teams' }" href="#developing-teams" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />チームの育成</a></li>
        <li><a :class="{ active: activeId === 'managing-organization' }" href="#managing-organization" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />組織的障害の排除</a></li>
        <li><a :class="{ active: activeId === 'evidence-based-management' }" href="#evidence-based-management" @click="closeSidebar"><Icon name="tabler:chart-pie" aria-hidden="true" />EBMによる測定と改善</a></li>
        <li><a :class="{ active: activeId === 'exam-strategy' }" href="#exam-strategy" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />試験対策</a></li>
        <li><a :class="{ active: activeId === 'references' }" href="#references" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考リソース</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main id="main-content" class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org 公認資格ガイド</div>
        <h1>Professional Agile Leadership&trade; I(PAL I)認定試験 学習ガイド</h1>
        <p class="hero-lede">
          サーバントリーダーシップと組織的アジリティの本質を、初学者でも体系的に理解できるように解説する実践ガイドです。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">試験の制限時間</div></div>
          <div class="stat-card"><div class="stat-number">36問</div><div class="stat-label">出題数(多肢選択・複数選択・True/False)</div></div>
          <div class="stat-card"><div class="stat-number">85%</div><div class="stat-label">合格ライン(目安31問以上)</div></div>
          <div class="stat-card"><div class="stat-number">無期限</div><div class="stat-label">認定の有効期限(再認定不要)</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは学習支援を目的とした非公式の解説資料です。試験の出題数・合格ライン・出題領域などの詳細は変更される可能性があるため、受験前に必ず<a href="https://www.scrum.org/assessments/professional-agile-leadership-certification" target="_blank" rel="noopener">Scrum.org 公式サイト</a>で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 1. Overview & Philosophy ===================== -->
      <section id="what-is-pal1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>PAL I 認定試験概要と「アジャイルリーダーシップ」の基本理念</h2>

        <h3>1.1 PAL I 試験の目的と試験形式</h3>

        <p>PAL I(Professional Agile Leadership I)は、Scrum.org が提供する、マネージャーやエグゼクティブなど「チームの外側」からアジャイルな組織づくりを支える立場の人材向けの認定です。PSM(Professional Scrum Master)がチーム内のスクラム実践に焦点を当てるのに対し、PAL I は「組織がアジャイルチームを機能させるために、リーダーは何をすべきか」という一段上のレイヤーを扱います。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>試験時間</td><td>60分</td></tr>
              <tr><td>出題数</td><td>36問(多肢選択・複数選択・True/False混在)</td></tr>
              <tr><td>合格ライン</td><td>85%(36問中31問以上の正答が目安)</td></tr>
              <tr><td>出題言語</td><td>英語のみ</td></tr>
              <tr><td>受験前提コース</td><td>必須ではないが「Professional Agile Leadership Essentials(PAL-E)」受講が推奨</td></tr>
              <tr><td>有効期限</td><td>なし(再認定不要の永続資格)</td></tr>
              <tr><td>出題領域</td><td>Facilitation、Self-Managing Teams、Empiricism、Product Value、Leadership Styles、Events、Forecasting &amp; Release Planning、Scrum Team、Stakeholders &amp; Customers、Scrum Values、Organizational Design &amp; Culture、Evidence-Based Management、Emergent Software Development など Professional Scrum Competencies 全域</td></tr>
            </tbody>
          </table>
        </div>

        <p>これらの数値・出題領域は今後変更される可能性があるため、受験前に必ず公式ページで最新情報を確認してください。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-agile-leadership-certification" target="_blank" rel="noopener">PAL I Certification 公式ページ</a></li>
          </ul>
        </div>

        <h3>1.2 なぜアジャイル組織に新しいリーダーシップが求められるのか</h3>

        <p>従来の管理手法は、環境が比較的安定していて「計画を立てれば予測どおりに進む」ことを前提にしていました。しかし現代のビジネス環境は VUCA(Volatility=変動性、Uncertainty=不確実性、Complexity=複雑性、Ambiguity=曖昧性)と呼ばれる状態にあり、次のような変化が起きています。</p>

        <ul>
          <li>顧客ニーズが高速に変化し、最初の計画どおりに作っても市場に受け入れられるとは限らない</li>
          <li>ソフトウェアや市場そのものが複雑系であり、事前にすべてを分析しきることができない</li>
          <li>現場(チーム)の方が、経営層よりも「実際に何が機能しているか」の一次情報を多く持っている</li>
        </ul>

        <p>このような環境では、「詳細な計画を立て、それを厳密に管理・統制する」という伝統的マネジメントは機能しにくくなります。Scrum が採用する経験主義(Empiricism)は、計画に固執するのではなく、実際に得られた成果(Evidence)に基づいて意思決定を継続的に調整していく考え方です。PAL I が問うアジャイルリーダーシップとは、この経験主義を組織レベルで実践できるように、リーダー自身の振る舞いと組織の仕組みを変えていくことを指します。</p>

        <h3>1.3 伝統的マネジメントとアジャイルリーダーシップの根本的な違い</h3>

        <p>重要なのは、アジャイルリーダーシップは「役職としてのマネージャーが不要になる」という話ではなく、<strong>リーダーの関わり方そのものが指示命令型からサーバントリーダーシップへとパラダイムシフトする</strong>という点です。サーバントリーダーとは「まず奉仕し、その後に導く」リーダー像であり、チームの上に立って統制するのではなく、チームの前に立って障害を取り除き、後ろから支える存在です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>伝統的マネージャー(Command &amp; Control)</th><th>アジャイルリーダー(Servant Leadership)</th></tr></thead>
            <tbody>
              <tr><td>意思決定の所在</td><td>リーダーが詳細タスクレベルまで意思決定する</td><td>実行方法の意思決定はチームに委ね、リーダーは方向性と制約を示す</td></tr>
              <tr><td>情報の流れ</td><td>トップダウンの指示伝達が中心</td><td>チームからの一次情報を吸い上げ、組織的な障害除去に使う</td></tr>
              <tr><td>評価指標</td><td>個人の稼働率、計画遵守率、進捗の「報告」内容</td><td>チームが生み出す顧客・事業価値、学習の速度、心理的安全性</td></tr>
              <tr><td>失敗への態度</td><td>失敗は罰の対象、犯人探しが起きやすい</td><td>失敗は学習の機会として扱い、実験を奨励する</td></tr>
              <tr><td>チームへの関わり方</td><td>指示を出し、進捗を管理・監督する</td><td>障害を取り除き、ガードレールを設け、権限を委譲する</td></tr>
              <tr><td>組織構造への働きかけ</td><td>既存の階層・承認プロセスを維持・運用する</td><td>アジリティを阻害する評価制度・予算プロセス自体を見直す対象とする</td></tr>
              <tr><td>求められるスキル</td><td>専門知識に基づく指揮命令能力</td><td>ファシリテーション、コーチング、対人関係構築、システム思考</td></tr>
            </tbody>
          </table>
        </div>

        <p>このシフトの根底にあるのは、「複雑な問題の最適な解決策は、現場に最も近い人々が経験主義を通じて発見する」という信頼です。リーダーの役割は答えを与えることではなく、チームが自ら答えを見つけられる環境(心理的安全性、明確な境界線、必要なリソースへのアクセス)を整えることにシフトします。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrumguides.org/" target="_blank" rel="noopener">The Scrum Guide</a>(経験主義・自己管理の定義)</li>
            <li><a href="https://www.scrum.org/pathway/agile-leader-learning-series" target="_blank" rel="noopener">Agile Leadership Learning Series</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 2. Developing People & Teams ===================== -->
      <section id="developing-teams">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 02</div>
        <h2>高業績・自己管理型チームの育成(Developing People &amp; Teams)</h2>

        <h3>2.1 自己管理型(Self-Managing)チームへの成熟度ステージ</h3>

        <p>2020年版 Scrum Guide 以降、「自己組織化(Self-Organizing)」という言葉は「自己管理(Self-Managing)」に置き換えられました。自己管理型チームとは、「誰が」「何を」「どのように」行うかを、チーム内部で選択できるチームを指します。ただし、チームは最初から自己管理できるわけではなく、段階的に成熟していきます。</p>

        <ul>
          <li><strong>依存段階:</strong>チームはリーダーからの指示がないと動けない。タスクの割り振りも意思決定もリーダー主導。</li>
          <li><strong>自己組織化の芽生え段階:</strong>チームがタスクの進め方について意見を出し始めるが、重要な意思決定はまだリーダーに確認を求める。</li>
          <li><strong>自己管理の実践段階:</strong>チームが「何を」「どのように」作るかを自ら決定し、リーダーは境界線(プロダクトの方向性、予算、コンプライアンス等)のみを示す。</li>
          <li><strong>高業績段階:</strong>チーム自身がさらに広い権限(採用への関与、技術選定、プロセス改善)を持ち、組織的な意思決定にも影響を与える。</li>
        </ul>

        <p>リーダーの役割は、この成熟度ステージに応じて関わり方を変えていくこと(状況対応型リーダーシップ)です。未成熟な段階でいきなり権限を丸投げすると混乱を招き、逆に成熟したチームに対して細かく指示を出し続けるとチームのモチベーションと自律性を損ないます。</p>

        <h3>2.2 権限委譲(Delegation &amp; Empowerment)の実践</h3>

        <p>アジャイルリーダーシップにおける委譲は、「丸投げ(Abdication)」でも「マイクロマネジメント」でもありません。両極端の中間にある、<strong>段階的なコントロールの委譲</strong>という考え方が重要です。これを可視化する代表的なツールが「7 段階の委譲(7 Levels of Delegation、Management 3.0)」や、それを議論するための「Delegation Board」です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>レベル</th><th>呼称</th><th>リーダーとチームの関係</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Tell(指示する)</td><td>リーダーが決定し、チームに伝える</td></tr>
              <tr><td>2</td><td>Sell(説得する)</td><td>リーダーが決定し、その理由をチームに説明して納得を得る</td></tr>
              <tr><td>3</td><td>Consult(相談する)</td><td>チームの意見を聞いた上で、最終的にリーダーが決定する</td></tr>
              <tr><td>4</td><td>Agree(合意する)</td><td>リーダーとチームが議論し、合意の上で決定する</td></tr>
              <tr><td>5</td><td>Advise(助言する)</td><td>リーダーは助言のみ行い、決定はチームが行う</td></tr>
              <tr><td>6</td><td>Inquire(尋ねる)</td><td>チームが決定した後、リーダーはその理由を尋ねて学ぶ</td></tr>
              <tr><td>7</td><td>Delegate(委任する)</td><td>チームが完全に決定し、リーダーは関与しない</td></tr>
            </tbody>
          </table>
        </div>

        <p>すべての意思決定を一律にレベル7へ引き上げる必要はありません。「技術的な実装方法」はレベル6〜7、「予算やコンプライアンスに関わる意思決定」はレベル2〜4というように、<strong>意思決定の種類ごとに委譲レベルを明示すること</strong>が実践上のポイントです。この一覧表自体をチームと共有し、認識をすり合わせるプロセスが Delegation Board の使い方です。</p>

        <h3>2.3 ガードレール(境界線・制約条件)の設定</h3>

        <p>権限を委譲する際、リーダーが完全に手を離してよいわけではありません。リーダーが担うべき責任は、「チームが安全に自律的な意思決定を行える範囲(ガードレール)」を明確にすることです。ガードレールの例としては、プロダクトのビジョンやゴール、予算の上限、法令・コンプライアンス要件、組織全体で合意されたアーキテクチャ原則などが挙げられます。ガードレールが明確であればあるほど、チームは安心してその内側で自由に意思決定できます。</p>

        <p>次の図は、リーダーがガードレールを設定し、チームが自律的に意思決定・実行し、その結果を振り返って学習し、次のガードレール調整につなげていく自律サイクルを示しています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DELEGATION_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">ガードレール設定から振り返り・学習へとつながる自律サイクル</div>
        </div>

        <p>このサイクルが回り続けることで、チームは経験主義に基づいて自己管理能力を高め、リーダーは「細部への介入」から「システムの調整」へと役割をシフトさせていくことができます。</p>

        <h3>2.4 心理的安全性の担保と失敗を学習に変える文化</h3>

        <p>自己管理とガードレールの仕組みがあっても、チームメンバーが「間違いを指摘したら評価が下がる」「新しい提案をして失敗したら責められる」と感じていれば、実験も率直な発言も起きません。心理的安全性とは、対人関係のリスクを取っても罰せられないとチームメンバーが確信できる状態を指し、高業績チームの土台となる要素です。</p>

        <p>リーダーが心理的安全性を醸成するための具体的な実践には、次のようなものがあります。</p>

        <ul>
          <li>失敗が起きた際に「誰が悪いか」ではなく「システムのどこに学習の機会があるか」を問うブレームレス・ポストモーテムを行う</li>
          <li>リーダー自身が自分の失敗や不確実性を率直に語り、弱さを見せることを許容する雰囲気を作る</li>
          <li>スプリントレトロスペクティブなどの「安全な場」を、経営層からの評価の場にしないことを明言し、実際にそう運用する</li>
          <li>実験を「失敗」ではなく「仮説検証」として扱い、小さく速く試すことを奨励する予算・時間の余白を用意する</li>
        </ul>

        <p>心理的安全性は一度作れば終わりではなく、リーダーの日々の反応(特に悪いニュースを受け取ったときの反応)によって継続的に強化・毀損されるものであるという理解が重要です。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/pathway/agile-leader-learning-series" target="_blank" rel="noopener">Agile Leadership Learning Series</a></li>
            <li><a href="https://www.scrumguides.org/" target="_blank" rel="noopener">The Scrum Guide</a>(自己管理型チームの定義)</li>
          </ul>
        </div>
      </section>

      <!-- ===================== 3. Managing the Organization ===================== -->
      <section id="managing-organization">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 03</div>
        <h2>組織的な障害の排除とカルチャー変革(Managing the Organization)</h2>

        <h3>3.1 チーム内の課題(Team Impediments)と組織全体の課題(Organizational Impediments)の切り分け</h3>

        <p>スクラムチームが直面する障害には、大きく分けて2種類があります。</p>

        <ul>
          <li><strong>チーム内の障害(Team Impediments):</strong>チームのプロセスやコミュニケーションの中で発生し、チーム自身とスクラムマスターの支援によって解決可能なもの。例: スプリント計画の進め方が非効率、チーム内のコミュニケーション不足など。</li>
          <li><strong>組織的な障害(Organizational Impediments):</strong>チームの権限の外側にあり、組織構造・制度・他部門との関係に起因するもの。例: 予算承認に数ヶ月かかる、部門間のサイロで必要な情報や協力が得られない、人事評価制度が個人の成果のみを評価しチームワークを評価しない、など。</li>
        </ul>

        <p>チーム内の障害はスクラムマスターとチームが自力で解決できることが多い一方、組織的な障害はチーム単独では解決できません。ここでアジャイルリーダーの出番が生まれます。<strong>組織的な障害を特定し、それを取り除くことは、アジャイルリーダーの中核的な責務</strong>です。</p>

        <h3>3.2 スクラムマスターとアジャイルリーダーの協調関係</h3>

        <p>スクラムマスターは日々チームに最も近い立場から障害を観察・特定できますが、組織的な障害を解決する権限(予算の変更、人事制度の改定、他部門への働きかけなど)を持っていないことがほとんどです。一方でアジャイルリーダーは、その権限を持つ立場にいながら、現場で何が起きているかの一次情報を持っていません。したがって、両者が協調することで初めて組織的な障害は解消に向かいます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ESCALATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">チーム内の障害と組織的な障害を切り分け、アジャイルリーダーへエスカレーションする流れ</div>
        </div>

        <p>このエスカレーションの流れが機能するためには、リーダーが「スクラムマスターから上がってきた課題を真剣に受け止め、実際に行動する」という信頼関係を築いていることが前提になります。エスカレーションしても何も変わらない経験が続くと、スクラムマスターとチームは声を上げなくなり、組織的な障害は放置されたままになります。</p>

        <h3>3.3 サイロの打破と部門横断的なコラボレーションの促進</h3>

        <p>多くの伝統的組織は、機能別(開発、QA、インフラ、マーケティングなど)に部門が分かれた「サイロ構造」を持っています。サイロは専門性を高める一方で、プロダクトを顧客に届けるために必要な部門間の連携を妨げ、待ち時間(Time to Market の悪化)を生み出します。アジャイルリーダーは、次のような働きかけによってサイロを打破し、部門横断的な協働を促進します。</p>

        <ul>
          <li>機能別チームではなく、顧客価値の単位でエンドツーエンドの責任を持つプロダクト志向のチーム編成へ再構成する</li>
          <li>部門間の引き継ぎ(ハンドオフ)をなくし、必要な専門性をチーム内に内包する、または必要なタイミングで柔軟にアクセスできるようにする</li>
          <li>部門ごとの個別最適化された目標(KPI)ではなく、組織全体・プロダクト全体で共有される成果指標を設定する</li>
          <li>部門を横断した「コミュニティ・オブ・プラクティス」など、専門性を共有しながらもチームの自律性を損なわない仕組みを支援する</li>
        </ul>

        <h3>3.4 アジリティを阻害する既存システム(人事評価、予算配分、承認プロセス)の刷新</h3>

        <p>組織的な障害の多くは、意図せずアジリティを阻害してしまっている既存の制度に起因します。アジャイルリーダーが見直しの対象とすべき代表的な制度には、次のようなものがあります。</p>

        <ul>
          <li><strong>人事評価制度:</strong>個人の成果やベロシティ比較に基づく評価は、チームワークやチーム全体の価値創出よりも個人の見栄えを優先する行動を誘発します。チーム単位の成果や協働行動を評価する仕組みへの移行が求められます。</li>
          <li><strong>予算配分プロセス:</strong>年次の固定予算に基づくプロジェクト単位の予算承認は、市場の変化に応じた優先順位の見直しを妨げます。プロダクト単位での継続的な予算配分(インクリメンタル・ファンディング)への移行が有効です。</li>
          <li><strong>承認プロセス:</strong>多段階の稟議や承認が必要な意思決定フローは、意思決定のリードタイムを長期化させます。権限委譲の考え方を組織の意思決定プロセスにも適用し、現場に近いレベルで判断できる範囲を広げることが求められます。</li>
        </ul>

        <p>これらの制度変更は一朝一夕には実現できず、経営層を巻き込んだ長期的なカルチャー変革の取り組みとなります。PAL I ではこうした変革を「一度に完璧に実施する」のではなく、スクラム自体が経験主義に基づくのと同様に、<strong>小さな変更を試し、効果を検証しながら段階的に進める</strong>アプローチが期待されます。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/pathway/agile-leader-learning-series" target="_blank" rel="noopener">Agile Leadership Learning Series</a></li>
            <li><a href="https://www.scrumguides.org/" target="_blank" rel="noopener">The Scrum Guide</a>(スクラムマスターの組織への説明責任)</li>
          </ul>
        </div>
      </section>

      <!-- ===================== 4. Evidence-Based Management ===================== -->
      <section id="evidence-based-management">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 04</div>
        <h2>価値とエビデンスに基づく測定と改善(EBM: Evidence-Based Management)</h2>

        <h3>4.1 EBM フレームワークとは</h3>

        <p>Evidence-Based Management(EBM)は、組織がアジャイルへの投資から実際にどれだけの価値を得ているかを測定し、意思決定を継続的に改善していくための Scrum.org 公式フレームワークです。EBM の目的は、「忙しく見えるかどうか」や「計画どおりに進んだかどうか」ではなく、<strong>実際に顧客と組織にもたらされた成果(アウトカム)</strong>に焦点を当てることにあります。リーダーにとって EBM が重要なのは、組織的な意思決定(どこに投資すべきか、どの取り組みを止めるべきか)を、憶測ではなくエビデンスに基づいて行えるようになるためです。</p>

        <h3>4.2 4つの主要価値領域(Key Value Areas, KVA)</h3>

        <p>EBM は次の4つの Key Value Areas(KVA)で構成されます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>KVA</th><th>リーダー視点での意味</th><th>有効なメトリクスの例</th><th>避けるべきアンチパターン指標</th></tr></thead>
            <tbody>
              <tr><td><strong>Current Value(CV): 現在の価値</strong></td><td>現時点でプロダクトが顧客・事業にもたらしている実際の成果を可視化する</td><td>顧客満足度、実際の利用率・アクティブユーザー数、顧客あたりの収益</td><td>出荷した機能数(アウトプット量そのもの)</td></tr>
              <tr><td><strong>Unrealized Value(UV): 未実現の価値</strong></td><td>将来的に獲得できる可能性のある市場機会・投資余地を把握する</td><td>市場シェアの伸びしろ、顧客からの未対応の要望、潜在市場規模</td><td>「バックログの行数」など、価値と無関係な量的指標</td></tr>
              <tr><td><strong>Time to Market(T2M): 市場投入までの時間</strong></td><td>アイデアが意思決定されてから顧客に届くまでのリードタイムを短縮する</td><td>リリース頻度、アイデアから本番リリースまでのリードタイム</td><td>チームの稼働率100%(キャパシティの余白がないとリードタイムはむしろ悪化する)</td></tr>
              <tr><td><strong>Ability to Innovate(A2I): 革新への能力</strong></td><td>新しい価値創出にどれだけのキャパシティを割けるか(技術的負債や運用負荷にどれだけ圧迫されているか)</td><td>技術的負債への対応に充てられる時間の割合、デプロイの自動化率、変更障害率</td><td>個人間のベロシティ比較(チームごとに前提が異なり比較不可能)</td></tr>
            </tbody>
          </table>
        </div>

        <h3>4.3 誤ったメトリクスとアンチパターンの危険性</h3>

        <p>EBM を正しく実践する上でリーダーが特に注意すべきなのが、測定行為そのものが組織の行動を歪めてしまうリスクです。代表的なアンチパターンには次のようなものがあります。</p>

        <ul>
          <li><strong>ベロシティの個人・チーム間比較:</strong>ベロシティはチームごとに見積もりの基準が異なるため、チーム間の比較や個人評価に使うと、見積もりのインフレ(数字を大きく見せる行動)を誘発します。ベロシティはあくまで単一チームの計画補助ツールとして扱うべきです。</li>
          <li><strong>稼働率100%信仰:</strong>チームを常にフル稼働させることは、一見効率的に見えますが、突発的な割り込みや学習・改善のための余白がなくなり、結果としてリードタイム(T2M)を悪化させます。理論上も、キューイング理論の観点から、稼働率が高くなるほど待ち時間は急激に増加することが知られています。</li>
          <li><strong>アウトプット指標への固執:</strong>「何行のコードを書いたか」「何個の機能をリリースしたか」といったアウトプット量の指標は、それが顧客価値(CV)に結びついているかを保証しません。EBM は常にアウトプットではなくアウトカム(成果)を問います。</li>
        </ul>

        <p>リーダーの役割は、こうした歪んだ指標をチームに課さないようにすると同時に、組織全体の意思決定(どのプロダクトに投資を続けるか、どの取り組みを終了するか)を、4つの KVA に基づくエビデンスによって行うよう働きかけることです。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/resources/evidence-based-management-guide" target="_blank" rel="noopener">Evidence-Based Management Guide</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 5. Exam Strategy ===================== -->
      <section id="exam-strategy">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 05</div>
        <h2>試験対策・頻出シチュエーション問題の解法パターン</h2>

        <p>PAL I の試験は知識の暗記だけでなく、状況判断(シチュエーション)問題が多く出題される点が特徴です。以下は典型的なジレンマのパターンと、判断の軸です。</p>

        <h3>5.1 典型的なジレンマ・状況判断シナリオ</h3>

        <ul>
          <li><strong>スプリントゴール未達が見込まれる場面:</strong>「リーダーが介入して残業を指示する」のではなく、「チームに検査・適応を委ね、なぜ未達になりそうなのかという根本原因(見積もりの精度、割り込みの多さ、技術的負債など)に焦点を当てる」ことが望ましい振る舞いです。残業の強制は短期的な帳尻合わせにしかならず、根本原因を隠蔽してしまいます。</li>
          <li><strong>ステークホルダーからの割り込み要請:</strong>リーダーは、ステークホルダーの要求そのものを拒否するのではなく、「進行中のスプリントの計画・コミットメントを保護しつつ、正式なプロセスを通じて扱う」という形でチームを守ります。ここで言う正式なプロセスは、次のスプリントプランニングへの送りだけを意味しません。進行中のスプリントゴールを危険にさらさない範囲であれば、プロダクトオーナーとデベロッパーがスプリントバックログのスコープを明確化・再交渉でき、現在のスプリントで扱える要望もあります。すべてを一律に次のスプリントへ延期する対応は、スクラムの想定ではありません。プロダクトオーナーとステークホルダーの間の優先順位付けの透明性を高めることが、割り込みの根本的な予防策になります。</li>
          <li><strong>チーム間の対立:</strong>対立の内容が技術的な意見の相違なのか、目標や評価制度の不一致に起因するものなのかを見極めます。前者はチーム内のファシリテーションで解決を促し、後者(組織の評価制度がチーム間の協力を阻害しているケース)は組織的障害として、リーダー自身が制度側に働きかけるべき対象として扱います。</li>
          <li><strong>評価制度とアジャイルな働き方のギャップ:</strong>個人単位の目標設定がチームでの協働を阻害している場合、リーダーは現場のプロセスを変えるのではなく、評価制度そのものを見直す責任を負います。</li>
        </ul>

        <p>これらのシナリオに共通する判断軸は、「<strong>この状況で、チームの自律性を尊重しつつ、リーダーとしてしか解決できない障害(組織的な制約)に自分は取り組めているか</strong>」という問いです。</p>

        <h3>5.2 合格に向けた推奨学習ステップ</h3>

        <ul>
          <li>The Scrum Guide を読み込み、経験主義・自己管理・スクラムの価値基準を確実に理解する</li>
          <li>Evidence-Based Management Guide を読み、4つの KVA とそれぞれの目的を説明できるようにする</li>
          <li>公式の Agile Leadership Open Assessment を、安定して高得点が取れるようになるまで繰り返し受験する</li>
          <li>Scrum Open Assessment も合わせて受験し、スクラムの基礎知識に抜け漏れがないかを確認する</li>
          <li>各シナリオ問題に対して、「なぜその選択肢が正しいか」だけでなく「なぜ他の選択肢が誤りか(マイクロマネジメントに寄りすぎている、丸投げになっている、等)」を説明できるようにしておく</li>
          <li>試験本番では、迷った問題に時間をかけすぎず、一旦マークして先に進み、時間内に全問へ目を通すことを優先する</li>
        </ul>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-agile-leadership-certification" target="_blank" rel="noopener">PAL I Certification 公式ページ</a>(Practice assessments: Agile Leadership Open, Scrum Open)</li>
          </ul>
        </div>
      </section>

      <!-- ===================== 6. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 06</div>
        <h2>参考リソース・公式リンク集</h2>

        <div class="ref-group">
          <ul class="ref-list">
            <li><span class="ref-name">Professional Agile Leadership Certification(公式試験概要)</span><a class="ref-url" href="https://www.scrum.org/assessments/professional-agile-leadership-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/professional-agile-leadership-certification</a></li>
            <li><span class="ref-name">The Scrum Guide(スクラムガイド最新版)</span><a class="ref-url" href="https://www.scrumguides.org/" target="_blank" rel="noopener">https://www.scrumguides.org/</a></li>
            <li><span class="ref-name">Evidence-Based Management Guide(EBM ガイド)</span><a class="ref-url" href="https://www.scrum.org/resources/evidence-based-management-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/evidence-based-management-guide</a></li>
            <li><span class="ref-name">Agile Leadership Learning Series</span><a class="ref-url" href="https://www.scrum.org/pathway/agile-leader-learning-series" target="_blank" rel="noopener">https://www.scrum.org/pathway/agile-leader-learning-series</a></li>
          </ul>
        </div>
      </section>

      <footer>
        Professional Agile Leadership™ および PAL I™ は Scrum.org の商標です。本ガイドは Scrum.org による公式資料ではありません。内容の正確性には配慮していますが、最終的な判断は必ず公式情報をご確認の上、行ってください。
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
  font-size: 14px;
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
  font-size: 15px;
  line-height: 1.4;
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  text-decoration: none;
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #fff;
  border: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  z-index: 30;
}

.sidebar-overlay {
  display: none;
}

/* ===================== Main content ===================== */
.main-content {
  margin-left: var(--sidebar-width);
  max-width: 900px;
  padding: 48px 48px 120px;
}

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
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
  background: var(--color-gold-tint);
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: 38px;
  line-height: 1.25;
  color: var(--color-ink);
  margin: 0 0 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.hero-lede {
  font-size: 18px;
  line-height: 1.65;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
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
  border-radius: 10px;
  padding: 16px 18px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.1;
}

.stat-label {
  font-size: 13px;
  color: var(--color-ink-faint);
  margin-top: 4px;
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
  font-size: 15px;
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

.disclaimer-box a {
  color: var(--color-indigo);
  font-weight: 600;
  text-decoration: underline;
}

/* ===================== Section content ===================== */
section {
  margin-bottom: 64px;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h2 {
  font-family: var(--font-display);
  font-size: 26px;
  line-height: 1.35;
  color: var(--color-ink);
  margin: 0 0 20px;
  font-weight: 700;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-border);
}

h3 {
  font-size: 19px;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 32px 0 12px;
  font-weight: 600;
}

p {
  margin: 0 0 16px;
  color: var(--color-ink-soft);
  line-height: 1.75;
}

ul {
  margin: 0 0 20px;
  padding-left: 24px;
  color: var(--color-ink-soft);
}

li {
  margin-bottom: 6px;
  line-height: 1.65;
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
  font-size: 15px;
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
  font-size: 15px;
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
  font-size: 15px;
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
  font-size: 14px;
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

/* ===================== Reference list ===================== */
.ref-group {
  margin-bottom: 28px;
}

.ref-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 15px;
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
  font-size: 14px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }

  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    bottom: 0;
    height: calc(100vh - var(--global-nav-height));
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.25s ease, visibility 0s linear 0.25s;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }

  .sidebar.open {
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.25s ease, visibility 0s;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
  }

  .main-content {
    margin-left: 0;
    padding: 32px 24px 80px;
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
