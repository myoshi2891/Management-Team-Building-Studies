<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "what-is-peopleware",
  "core-thesis",
  "book-structure",
  "part1-human-resource",
  "part2-office-environment",
  "part3-right-people",
  "part4-productive-teams",
  "part5-fertile-soil",
  "part6-fun-to-work-here",
  "action-roadmap",
  "developer-voices",
  "critiques-and-limits",
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
  title: "『Peopleware』完全ガイド | ソフトウェア開発チームのための実践知",
  description:
    "Tom DeMarcoとTim Listerの名著『Peopleware Productive Projects and Teams』を初学者向けにステップバイステップで解説。核心テーゼ、6部構成、チーミサイド、Coding War Gamesのデータ、著名開発者の言及までを図解と表で整理した実践ガイド。",
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
  pie1: "#C7D1EA",
  pie2: "#AEDBD6",
  pie3: "#F0D9A6",
  pie4: "#E7C0D0",
  pieOpacity: "1",
  pieStrokeColor: "#FFFFFF",
  pieStrokeWidth: "2px",
  pieOuterStrokeWidth: "1px",
  pieOuterStrokeColor: "#DFE3EA",
  pieSectionTextColor: "#161B26",
  pieLegendTextColor: "#161B26",
  pieTitleTextColor: "#161B26",
};

const DIAGRAM_CORE_THESIS = `flowchart TB
    A["ソフトウェアプロジェクトが失敗する"]:::hub --> B{"原因をどこに求めるか"}
    B -->|"従来型の思い込み"| C["技術的要因を疑う 新しい言語・ツール・手法の導入"]
    B -->|"Peoplewareの主張"| D["社会学的要因を疑う 人間関係・職場環境・組織文化"]:::hub
    C --> E["効果は限定的 問題は再発しやすい"]
    D --> F["生産性・品質・定着率が 大きく改善しやすい"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class B,C,E box;`;

const DIAGRAM_BOOK_PARTS_OVERVIEW = `flowchart TB
    P1["Part I 人的資源のマネジメント 失敗の社会学的原因を診断する"]:::hub --> P2["Part II オフィス環境 フローを守る空間を設計する"]
    P2 --> P3["Part III 適切な人材 採用 リーダーシップ 定着"]
    P3 --> P4["Part IV 生産的なチームを育てる ジェリングとチーミサイド"]
    P4 --> P5["Part V 肥沃な土壌 会議 変化 組織学習"]
    P5 --> P6["Part VI ここで働くのは楽しいはず 秩序と自由裁量の両立"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class P2,P3,P4,P5 box;`;

const DIAGRAM_FLOW_INTERRUPTION = `flowchart TB
    A1["作業に没入し始める"] --> A2["電話 チャットや声かけで割り込まれる"]
    A2 --> A3["集中状態フローが中断する"]
    A3 --> A4["再没入まで平均15分前後を要する"]
    A4 --> A5["エラーが増え生産性が下がる"]
    A5 --> H1["環境を見直す"]:::hub
    H1 --> B1["静かで区切られた作業環境を用意する"]
    B1 --> B2["個室や高いパーティション 在席サインを設ける"]
    B2 --> B3["まとまった無割り込み時間を確保する"]
    B3 --> B4["フロー状態を維持できる"]
    B4 --> B5["高品質 高生産性 低いエラー率を実現する"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A1,A2,A3,A4,A5,B1,B2,B3,B4 box;`;

const DIAGRAM_TEAMICIDE_VS_JELLING = `flowchart TB
    T0["マネージャーが陥りがちな行動"]:::hub --> T1["防衛的マネジメント 不信からの過干渉"]
    T1 --> T2["官僚主義 過剰な書類仕事"]
    T2 --> T3["物理的な分断 座席や拠点をバラバラに"]
    T3 --> T4["品質の妥協や見せかけの締切"]
    T4 --> T5["結果 チームは決してジェルしない"]
    T5 ~~~ J0["マネージャーが意識したい行動"]:::hub
    J0 --> J1["小さな成功体験を共有する"]
    J1 --> J2["適切な人選と裁量を与える"]
    J2 --> J3["結果に対する共同オーナーシップを育てる"]
    J3 --> J4["サーバントとしてチームを支援する"]
    J4 --> J5["結果 チームがジェルする"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1,T2,T3,T4,T5,J1,J2,J3,J4 box;`;

const DIAGRAM_ACTION_ROADMAP = `flowchart TB
    S1["ステップ1 失敗要因を人間面から棚卸しする"] --> S2["ステップ2 静かな作業環境とまとまった集中時間を確保する"]
    S2 --> S3["ステップ3 採用と配置を適性重視で行う"]
    S3 --> S4["ステップ4 会議とメールを最小化しフローの中断を減らす"]
    S4 --> S5["ステップ5 小さな成功体験でチームの化学反応を育てる"]
    S5 --> S6["ステップ6 チーミサイドの芽を早期に摘む"]
    S6 --> S7["ステップ7 継続的な振り返りで学習する組織文化を育てる"]
    S7 --> S8["生産的なプロジェクトとチーム"]:::done

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1,S2,S3,S4,S5,S6,S7 box;`;
</script>

<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">本文へスキップ</a>
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

    <!-- ===================== Sidebar ===================== -->
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">Peopleware 完全ガイド</div>
          <div class="brand-subtitle">DeMarco & Lister</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li>
          <a href="#what-is-peopleware" :class="{ active: activeId === 'what-is-peopleware' }" :aria-current="activeId === 'what-is-peopleware' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:book-2" aria-hidden="true" />Peoplewareとは
          </a>
        </li>
        <li>
          <a href="#core-thesis" :class="{ active: activeId === 'core-thesis' }" :aria-current="activeId === 'core-thesis' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:brain" aria-hidden="true" />核心テーゼ
          </a>
        </li>
        <li>
          <a href="#book-structure" :class="{ active: activeId === 'book-structure' }" :aria-current="activeId === 'book-structure' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:list-check" aria-hidden="true" />書籍全体の構成
          </a>
        </li>
        <li>
          <a href="#part1-human-resource" :class="{ active: activeId === 'part1-human-resource' }" :aria-current="activeId === 'part1-human-resource' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:users" aria-hidden="true" />Part I 人的資源
          </a>
        </li>
        <li>
          <a href="#part2-office-environment" :class="{ active: activeId === 'part2-office-environment' }" :aria-current="activeId === 'part2-office-environment' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:building" aria-hidden="true" />Part II オフィス環境
          </a>
        </li>
        <li>
          <a href="#part3-right-people" :class="{ active: activeId === 'part3-right-people' }" :aria-current="activeId === 'part3-right-people' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:user-check" aria-hidden="true" />Part III 適切な人材
          </a>
        </li>
        <li>
          <a href="#part4-productive-teams" :class="{ active: activeId === 'part4-productive-teams' }" :aria-current="activeId === 'part4-productive-teams' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:heart-handshake" aria-hidden="true" />Part IV チーム形成
          </a>
        </li>
        <li>
          <a href="#part5-fertile-soil" :class="{ active: activeId === 'part5-fertile-soil' }" :aria-current="activeId === 'part5-fertile-soil' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:leaf" aria-hidden="true" />Part V 肥沃な土壌
          </a>
        </li>
        <li>
          <a href="#part6-fun-to-work-here" :class="{ active: activeId === 'part6-fun-to-work-here' }" :aria-current="activeId === 'part6-fun-to-work-here' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:mood-smile" aria-hidden="true" />Part VI 楽しい職場
          </a>
        </li>
        <li>
          <a href="#action-roadmap" :class="{ active: activeId === 'action-roadmap' }" :aria-current="activeId === 'action-roadmap' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:route" aria-hidden="true" />実践ロードマップ
          </a>
        </li>
        <li>
          <a href="#developer-voices" :class="{ active: activeId === 'developer-voices' }" :aria-current="activeId === 'developer-voices' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:quote" aria-hidden="true" />開発者たちの声
          </a>
        </li>
        <li>
          <a href="#critiques-and-limits" :class="{ active: activeId === 'critiques-and-limits' }" :aria-current="activeId === 'critiques-and-limits' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:alert-triangle" aria-hidden="true" />批判的な視点
          </a>
        </li>
        <li>
          <a href="#summary" :class="{ active: activeId === 'summary' }" :aria-current="activeId === 'summary' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:flag-3" aria-hidden="true" />まとめ
          </a>
        </li>
        <li>
          <a href="#references" :class="{ active: activeId === 'references' }" :aria-current="activeId === 'references' ? 'location' : undefined" @click="closeSidebar">
            <Icon name="tabler:link" aria-hidden="true" />参考ソース
          </a>
        </li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main id="main-content" class="main-content" tabindex="-1">
      <header class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />ソフトウェア工学の名著</div>
        <h1>『Peopleware: Productive Projects and Teams』完全ガイド</h1>
        <p class="hero-lede">
          ソフトウェア開発が「人間」の問題であることを理解し、実践するためのステップバイステップ解説
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">6部</div><div class="stat-label">全39章で構成</div></div>
          <div class="stat-card"><div class="stat-number">1987年</div><div class="stat-label">初版刊行</div></div>
          <div class="stat-card"><div class="stat-number">2013年</div><div class="stat-label">第3版 最新版刊行</div></div>
          <div class="stat-card"><div class="stat-number">600人+</div><div class="stat-label">Coding War Games参加者</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          本ページは教育・学習支援を目的とした非公式の解説ログです。正確な内容は必ず<a href="https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/" target="_blank" rel="noopener">原著 Peopleware Productive Projects and Teams, Third Edition</a>をご参照ください。
        </div>
      </header>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>原著情報</strong> 原著: Peopleware Productive Projects and Teams, Third Edition / 著者: Tom DeMarco, Tim Lister (Addison-Wesley Professional, 2013年) / 参照: <a href="https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/" target="_blank" rel="noopener">O'Reilly掲載ページ</a></p>
        <p><strong>この記事について</strong> 本ページは学習支援を目的とした非公式の解説ログです。原著の内容・結論を正しく把握するには必ず原著をお読みください。</p>
        <ul>
          <li>各セクションの末尾に「実践のポイント」を置き、明日から使えるチェックリストにしています。</li>
          <li>巻末に、著名な開発者・著者による言及を含む参考ソースのURLをまとめています。</li>
        </ul>
      </div>

      <!-- ===================== 1. What is Peopleware ===================== -->
      <section id="what-is-peopleware">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 01</div>
        <h2>Peoplewareとは何か</h2>

        <p><strong>Peopleware</strong>(ピープルウェア)は、1987年にTom DeMarcoとTim Listerが著したソフトウェアマネジメントの古典です。その後1999年(第2版)、2013年(第3版)と改訂が重ねられ、第3版では「リーダーシップの新たな病理」「会議文化の変化」「世代の異なるメンバーが混在するハイブリッドチーム」「便利なはずのツールが逆に足かせになる現象」などを扱う章が追加されました。</p>

        <p>著者2人は、システム構築とその人間的側面に関するコンサルティング会社<strong>Atlantic Systems Guild</strong>の共同経営者であり、1979年から国際的にマネジメント・見積もり・生産性・企業文化について講演・執筆・コンサルティングを行ってきました。</p>

        <p>書籍全体を通じて、著者は「ソフトウェア開発における最大の課題は技術的なものではなく社会学的なものである」という立場を、実際のプロジェクト経験や独自の調査データに基づくエピソードを交えながら説明しています。</p>

        <p><em>ソフトウェア工学分野で最も影響力のある管理書の一つ</em>として、The Mythical Man-Month(人月の神話)の著者であるFrederick P. Brooks Jr.や、Stack Overflow共同創業者のJoel Spolskyら著名な開発者・研究者からも高く評価されてきました(詳細は<a href="#developer-voices">開発者たちの声</a>を参照)。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>はじめてマネジメントに関わる人は、まず「技術で解決しようとしていないか」を自問する習慣をつけましょう。</li>
            <li>本書は短いエッセイの集合体なので、通読よりも「気になる章から拾い読み」でも十分に効果があります。</li>
          </ul>
        </div>
      </section>

      <!-- ===================== 2. Core Thesis ===================== -->
      <section id="core-thesis">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:brain" aria-hidden="true" />SECTION 02</div>
          <h2>核心テーゼ: プロジェクトの問題は技術ではなく社会学である</h2>

          <p>Peopleware第1章「Somewhere Today, a Project Is Failing(どこかで今日もプロジェクトが失敗している)」は、著者たちが数百のプロジェクトを調査した結果として、失敗の主要因が特定の技術的欠陥に集約されないことを明らかにしたところから始まります。よく挙げられる失敗理由は「政治」でしたが、著者たちはこれをより正確に「プロジェクトの社会学(project sociology)」と呼び直しています。</p>

          <p>多くのマネージャー(特に元エンジニア出身者)は、人をあたかも交換可能な部品(モジュール)であるかのように扱う傾向があります。著者たちはこれを、効率と均一性ばかりを追求するファストフード店の管理手法になぞらえ、<strong>「チーズバーガー・マネジメント」</strong>と呼んで批判しています。知的で創造的な仕事であるソフトウェア開発を、規格化された組立ラインのように扱うと、人々の意欲は削がれ、本来向き合うべき課題からも目がそれてしまう、というわけです。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CORE_THESIS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">プロジェクトが失敗したとき 技術的要因と社会学的要因のどちらを疑うか</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>プロジェクトの振り返り(レトロスペクティブ)で不具合が出たとき、真っ先に「ツールを変えよう」と結論づけず、コミュニケーションや環境の要因も同じ重みで検討しましょう。</li>
              <li>「人は部品ではない」という前提を、評価制度・配置転換・進捗管理の設計に反映させましょう。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 3. Book Structure ===================== -->
        <section id="book-structure">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 03</div>
          <h2>書籍全体の構成(6部39章)</h2>

          <p>原著(第3版)は以下の6部構成になっています。各Partにどんな問いが置かれているかを把握しておくと、拾い読みの効率が上がります。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_BOOK_PARTS_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">Peopleware第3版 6部構成の全体像</div>
          </div>

          <h3>各Partの主な章(第3版の目次より抜粋)</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>Part</th><th>テーマ</th><th>代表的な章</th></tr></thead>
              <tbody>
                <tr><td>I. Managing the Human Resource</td><td>人的資源のマネジメント</td><td>1. Somewhere Today, a Project Is Failing / 2. Make a Cheeseburger, Sell a Cheeseburger / 4. Quality—If Time Permits / 5. Parkinson's Law Revisited / 6. Laetrile</td></tr>
                <tr><td>II. The Office Environment</td><td>オフィス環境</td><td>7. The Furniture Police / 9. Saving Money on Space / 10. Brain Time versus Body Time / 11. The Telephone / 12. Bring Back the Door</td></tr>
                <tr><td>III. The Right People</td><td>適切な人材</td><td>14. The Hornblower Factor / 15. Let's Talk about Leadership / 16. Hiring a Juggler / 19. Happy to Be Here (離職コスト) / 20. Human Capital</td></tr>
                <tr><td>IV. Growing Productive Teams</td><td>生産的なチームを育てる</td><td>21. The Whole Is Greater Than the Sum of the Parts / 22. The Black Team / 23–24. Teamicide / 26. A Spaghetti Dinner / 28. Chemistry for Team Formation</td></tr>
                <tr><td>V. Fertile Soil</td><td>肥沃な土壌</td><td>29. The Self-Healing System / 30. Dancing with Risk / 31. Meetings, Monologues, and Conversations / 33. E(vil) Mail / 35. Organizational Learning</td></tr>
                <tr><td>VI. It's Supposed to Be Fun to Work Here</td><td>ここで働くのは楽しいはず</td><td>37. Chaos and Order / 38. Free Electrons / 39. Holgar Dansk</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/" target="_blank" rel="noopener">O'Reilly掲載の目次</a></li>
            </ul>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>新任マネージャーには、まずPart II(オフィス環境)とPart IV(チーム形成)から読ませると、すぐに現場で応用しやすい概念に出会えます。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 4. Part I Human Resource ===================== -->
        <section id="part1-human-resource">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 04</div>
          <h2>Part I: 人的資源のマネジメント</h2>

          <h3>チーズバーガー・マネジメントを避ける</h3>
          <p>前述のとおり、人を規格化された部品として扱う発想は、創造的な知的労働には向いていません。著者たちは、プログラマーやアーティストにとって「仕事の質」自体が重要な内発的動機であると論じています。</p>

          <h3>「時間さえあれば品質は上がる」という誤解 (Quality—If Time Permits)</h3>
          <p>多くの現場では、締切が近づくと真っ先に品質基準が犠牲になります。しかし著者たちは、優れた作り手にとって品質への妥協は強い意欲喪失(デモチベーション)を招くと指摘しています。品質を後回しにする文化そのものが、後述する「チーミサイド(チーム崩壊)」の一因にもなります。</p>

          <h3>Parkinson's Law (パーキンソンの法則) は必ずしも成り立たない</h3>
          <p>「仕事は与えられた時間をすべて満たすまで膨張する」というパーキンソンの法則は広く知られていますが、著者たちは、優秀なソフトウェア技術者に対してはこの法則が当てはまるとは限らないと論じ、締切を人為的に厳しくすることの弊害を指摘しています。</p>

          <h3>Laetrile (レートリル) — 効かない万能薬に注意</h3>
          <p>「レートリル」とは、かつて効果が証明されないまま流行したがん治療薬の名前です。著者たちはこれを比喩に用い、生産性向上を謳う流行の方法論やツールを鵜呑みにする危うさを警告しています。<strong>特効薬のように見える解決策ほど、実際には検証が必要</strong>、というメッセージです。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>締切のプレッシャーがかかったとき、削るべきはスコープであって品質基準ではないか、を確認する。</li>
              <li>新しい開発手法やツールを導入する際は、「なぜ効くのか」の根拠を確認してから展開する。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 5. Part II Office Environment ===================== -->
        <section id="part2-office-environment">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building" aria-hidden="true" />SECTION 05</div>
          <h2>Part II: オフィス環境とフロー状態</h2>

          <p>Peoplewareの中でも特に有名で、今なお引用され続けているのがこのPartです。</p>

          <h3>フロー (Flow) とは何か</h3>
          <p>心理学者が定義する「フロー」とは、深い没入状態のことです。DeMarcoとListerは、ソフトウェア開発のような思考集約型の仕事では、フロー状態に入るまでに時間がかかり、いったん中断されると<strong>再没入までにまとまった時間を要する</strong>ことを説明しています。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FLOW_INTERRUPTION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">壊れるパターンと守るパターン フロー状態への影響</div>
          </div>

          <h3>「ファニチャー・ポリス (Furniture Police)」— 均一性という名の牢獄</h3>
          <p>著者たちは、オフィス空間を「均一性」と「最小コストでの収容」だけを基準に管理する人々を皮肉を込めて<strong>ファニチャー・ポリス</strong>と呼びます。夜間はデスクに家族写真以外を置くことを禁じるといった極端な逸話も紹介されており、こうした管理は生産性を無視した「見た目のきれいさ」だけを優先する典型例として描かれています。日当たりの悪い地下オフィスが「均一だから公平」として好まれてしまう、という笑えない実例も紹介されています。</p>

          <h3>実証データ: Coding War Games</h3>
          <p>著者たちは1984〜1986年にかけて、92社・600人以上のプログラマーを対象に<strong>Coding War Games</strong>という実証実験を行いました。参加者は自分の職場で、通常の業務時間内に同一の課題を設計・実装・テストし、結果が比較されました。</p>

          <p>主な発見は次のとおりです。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>指標</th><th>結果</th></tr></thead>
              <tbody>
                <tr><td>最上位群と最下位群の生産性の差</td><td>約10倍</td></tr>
                <tr><td>最上位群と中央値の差</td><td>約2〜2.5倍</td></tr>
                <tr><td>経験年数・給与との相関</td><td>ほとんど相関なし</td></tr>
                <tr><td>個室または6フィート以上のパーティションを持つ参加者の割合</td><td>全体の約11%</td></tr>
                <tr><td>100平方フィート以上の専有スペースを持つ参加者の割合</td><td>全体の約16%</td></tr>
                <tr><td>同一企業内のペア間の成績</td><td>ほぼ同水準 (企業文化の影響が示唆される)</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.usnews.com/opinion/blogs/economic-intelligence/2013/04/19/how-office-space-affects-company-productivity" target="_blank" rel="noopener">Coding War Gamesの分析記事 (U.S. News)</a></li>
              <li><a href="https://fs.blog/increasing-the-productivity-of-computer-programmers-and-engineers/" target="_blank" rel="noopener">Far From Random / fs.blog</a></li>
            </ul>
          </div>

          <p>この結果から著者たちは、<strong>静かさとプライバシーの度合いが、生産性のばらつきを説明する最も強い要因の一つ</strong>であると結論づけました。一方で経験年数や給与といった「わかりやすい」要因はほとんど説明力を持ちませんでした。</p>

          <p>なお、この実験は「騒音レベルを客観的に測定したわけではなく、本人が許容できるかどうかを尋ねた主観的評価である」という限界も著者ら自身が明言しています (<a href="https://www.usnews.com/opinion/blogs/economic-intelligence/2013/04/19/how-office-space-affects-company-productivity" target="_blank" rel="noopener">U.S. Newsの解説記事</a>より)。</p>

          <h3>必要な物理スペースの目安</h3>
          <p>IBMサンタテレサ研究所での調査 (建築家Gerald McCue主導) を根拠に、著者たちは以下の目安を提示しています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>推奨値</th></tr></thead>
              <tbody>
                <tr><td>一人あたりの専有スペース</td><td>約100平方フィート (約9平方メートル)</td></tr>
                <tr><td>一人あたりの作業台スペース</td><td>約30平方フィート (約3平方メートル)</td></tr>
                <tr><td>遮音対策</td><td>個室、または高さ6フィート (約2メートル) 以上のパーティション</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Bring Back the Door (ドアを取り戻せ)</h3>
          <p>「電話 (The Telephone)」の章では、鳴った電話に反射的に応答してしまう心理的圧力と、それによる作業中断のコストが論じられています。「ドアを取り戻せ」の章では、開放的なオフィスの象徴であった「ドアを取り払う」流行に対し、著者たちは集中を守るための物理的な区切りの重要性を再主張しています。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>「集中タイム」をカレンダー上に確保し、チャット通知をオフにできる文化を作る。</li>
              <li>オフィスレイアウトを決める際、コスト最適化だけでなく「静けさ」「区切り」「日照」を評価基準に含める。</li>
              <li>リモート / ハイブリッド環境でも、同期コミュニケーション (通話・チャット即レス期待) を必要最小限に絞る。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 6. Part III Right People ===================== -->
        <section id="part3-right-people">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:user-check" aria-hidden="true" />SECTION 06</div>
          <h2>Part III: 適切な人材</h2>

          <h3>Hiring a Juggler (ジャグラーを雇う)</h3>
          <p>著者たちは、面接で候補者の実際のスキルを見極める難しさを、実際にジャグリングができるかを確かめずに「ジャグラー」を採用してしまう例えで説明しています。これは、履歴書や口頭でのアピールだけで人材を評価することの危うさを示す比喩です。</p>

          <h3>リーダーシップの語り方</h3>
          <p>Part IIIでは、リーダーシップを「役職に付随する権限」ではなく、状況に応じてチームメンバーの間を移動する機能として捉える視点が示されます (この考え方はPart IVの「ジェルしたチーム」概念とも接続しています)。</p>

          <h3>離職の隠れたコスト (Happy to Be Here / Human Capital)</h3>
          <p>離職には採用コストのような「見えるコスト」だけでなく、引き継ぎロス・チームの再編成・知識の喪失といった「見えないコスト」が伴います。著者たちは、経験者の立ち上がり (ランプアップ) にかかる時間を軽視する組織文化にも警鐘を鳴らしています。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>採用面接では、実際の作業に近いタスクで評価する (ペアプログラミングや設計ディスカッションなど)。</li>
              <li>離職率を「コスト」として経営層に説明する際は、採用コストだけでなく再教育・引き継ぎのコストも含めて試算する。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 7. Part IV Productive Teams ===================== -->
        <section id="part4-productive-teams">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:heart-handshake" aria-hidden="true" />SECTION 07</div>
          <h2>Part IV: 生産的なチームを育てる</h2>

          <p>このPartはPeoplewareの中でも中心的なテーマである「チーム形成」を扱います。</p>

          <h3>ジェルしたチーム (Jelled Team) とは</h3>
          <p>著者たちは、メンバーの総和以上の成果を出す一体化したチームを<strong>ジェルしたチーム (jelled team)</strong>と呼びます。特徴は次のとおりです。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>ジェルしたチームの兆候</th><th>説明</th></tr></thead>
              <tbody>
                <tr><td>低い離職率</td><td>メンバーがチームを離れたがらない</td></tr>
                <tr><td>強い当事者意識</td><td>成果物を「自分たちのもの」として捉える</td></tr>
                <tr><td>独自のアイデンティティ</td><td>「自分たちは特別だ」という一体感 (エリート意識)</td></tr>
                <tr><td>自然な相互コーチング</td><td>リーダーシップが知識や状況に応じてメンバー間を移動する</td></tr>
                <tr><td>仕事そのものを楽しんでいる</td><td>単なる成果以上に、プロセス自体への満足感がある</td></tr>
              </tbody>
            </table>
          </div>

          <p>重要なのは、著者たち自身が「チームを確実にジェルさせる万能の手順書は存在しない」と率直に認めている点です。その代わりに本書は、チームが自然にジェルする土壌を整えること、そして次に説明する「チーミサイド (チーム崩壊行為)」を避けることに焦点を当てています。</p>

          <h3>The Black Team (ブラックチーム) の逸話</h3>
          <p>著者たちが紹介する伝説的な逸話の一つが、IBM社内で結成された「ブラックチーム」です。あえて他人のバグを執念深く見つけ出すことに誇りを持つ、独自の文化とアイデンティティを持ったレビューチームとして描かれ、強いチームアイデンティティが持つ力を象徴する例として語られています。</p>

          <h3>チーミサイド (Teamicide) — チームを殺す7つ (+2つ) の方法</h3>
          <p><strong>チーミサイド</strong>とは、著者たちが作った造語で、意図せずジェルしたチームを破壊してしまう経営行動を指します。第2版・第3版では当初の7項目に加えて2項目が追加されています。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_TEAMICIDE_VS_JELLING" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">チームを壊す力 チーミサイドとチームを育てる力 ジェリングの対比</div>
          </div>

          <div class="table-wrap">
            <table>
              <thead><tr><th>#</th><th>チーミサイドの種類</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>防衛的マネジメント (Defensive Management)</td><td>部下を信頼せず、逐一介入・監視する</td></tr>
                <tr><td>2</td><td>官僚主義 (Bureaucracy)</td><td>本質的価値のない書類仕事を強いる</td></tr>
                <tr><td>3</td><td>物理的な分断 (Physical Separation)</td><td>座席や拠点をバラバラにし、雑談すら生まれない状態にする</td></tr>
                <tr><td>4</td><td>時間の断片化 (Fragmentation of Time)</td><td>一人のメンバーを複数プロジェクトに同時アサインする</td></tr>
                <tr><td>5</td><td>品質基準の切り下げ (The Quality-Reduced Product)</td><td>締切優先で品質へのこだわりを奪う</td></tr>
                <tr><td>6</td><td>見せかけの締切 (Phony Deadlines)</td><td>根拠のない締切設定でチームの信頼を損なう</td></tr>
                <tr><td>7</td><td>クリークの排除 (Clique Control)</td><td>自然発生した非公式な結束を上から統制しようとする</td></tr>
                <tr><td>8</td><td>やる気を削るポスターやスローガン (Teamicide Revisited)</td><td>表面的なモチベーション施策で本質的な課題を覆い隠す</td></tr>
                <tr><td>9</td><td>不公平な残業運用 (Overtime)</td><td>ジェルしたチームに一律に適用しにくい残業慣行が結束を損なう</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://appliedframeworks.com/what-is-teamicide/" target="_blank" rel="noopener">Applied Frameworks「What is Teamicide?」</a></li>
              <li><a href="https://thescrumacademy.com/2015/03/16/peopleware-productive-teams-and-projects-3rd-edition/" target="_blank" rel="noopener">The Scrum Academyによる要約</a></li>
              <li><a href="https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/ch23.xhtml" target="_blank" rel="noopener">O'Reilly Chapter 23: Teamicide</a></li>
            </ul>
          </div>

          <h3>Competition (内部競争の弊害)</h3>
          <p>個人を競わせる報奨制度や、いわゆる成果主義的なランキングは、短期的にはやる気を引き出すように見えても、チームの結束を破壊するリスクがあると著者たちは指摘します。人事評価そのものにも、チーミサイドの側面があることを直視すべきだ、という論点です。</p>

          <h3>A Spaghetti Dinner (スパゲッティ・ディナー)</h3>
          <p>新しく結成されたチームを自宅の夕食に招き、買い出しから調理まで全員で分担させるという、著者たちが紹介する象徴的な逸話です。全員が自然に役割分担を見出し、最初の「小さな成功体験」を共有することが、チーム結成初期の一体感につながることを示しています。</p>

          <h3>Chemistry for Team Formation (チーム形成の化学反応)</h3>
          <p>チームが「化学反応」を起こすためのいくつかの要因 (質へのこだわりの共有、多様な専門性を持つメンバー、成功しているチームを不用意に解体しないこと、など) が論じられます。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>新規チーム結成時には、意図的に「小さくても分かりやすい成功体験」を早期に設計する。</li>
              <li>個人ランキングや強制分布の評価制度が、チームの信頼関係にどう影響しているかを定期的に点検する。</li>
              <li>ジェルしているチームを安易に解体・再編成しない。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 8. Part V Fertile Soil ===================== -->
        <section id="part5-fertile-soil">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:leaf" aria-hidden="true" />SECTION 08</div>
          <h2>Part V: 肥沃な土壌 (組織文化)</h2>

          <h3>The Self-Healing System (自己修復するシステム)</h3>
          <p>組織やプロセスにおいて、あらゆる例外を事前に規定しようとする「決定論的」なやり方には限界があります。著者たちは、変化に応じて自律的に調整できる「非決定論的」な仕組みづくりの重要性を論じています。</p>

          <h3>Dancing with Risk (リスクと共に踊る)</h3>
          <p>リスクを隠したり過度に恐れたりするのではなく、リスクを可視化し、チームで共有しながら向き合う姿勢が推奨されています。</p>

          <h3>Meetings, Monologues, and Conversations (会議・独白・対話)</h3>
          <p>会議文化そのものが生産性を左右する要因として扱われます。特に第3版では「進化する会議文化」を扱う新章が追加され、目的のあいまいな会議が時間泥棒になりがちである点が改めて論じられています。</p>

          <h3>E(vil) Mail (メールという名の悪魔)</h3>
          <p>メールや非同期コミュニケーションが、本来集中すべき時間を細切れにしてしまう問題が扱われます。著者たちは、時間の断片化がチームにも個人にも有害であると繰り返し強調しています。</p>

          <h3>The Ultimate Management Sin (究極のマネジメントの罪)</h3>
          <p>著者たちは、部下の時間を無為に浪費させることこそが最大の経営上の罪であると位置づけています。会議・メール・過剰な報告を求める文化は、この観点から見直す価値があります。</p>

          <h3>Organizational Learning (組織学習)</h3>
          <p>失敗から学ぶ文化、知識を組織内で共有し続ける仕組みづくりが、持続的に生産性を高めるための土台として論じられます。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>会議のたびに「目的」「終了条件」「必要な参加者」を明文化する。</li>
              <li>非同期で済むやり取りは、チャットの即レス期待から切り離す。</li>
              <li>失敗を罰するのではなく、学習の材料として扱うふりかえり文化を制度化する。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 9. Part VI Fun to Work Here ===================== -->
        <section id="part6-fun-to-work-here">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:mood-smile" aria-hidden="true" />SECTION 09</div>
          <h2>Part VI: ここで働くのは楽しいはず</h2>

          <h3>Chaos and Order (混沌と秩序)</h3>
          <p>過度な統制 (秩序) は創造性を殺し、過度な自由放任 (混沌) はチームを迷走させます。著者たちは、この2つのバランスを取ることの重要性を論じています。</p>

          <h3>Free Electrons (自由電子)</h3>
          <p>組織の規範に縛られず、自発的に動いて価値を生み出す人材を「自由電子」と呼び、こうした人材が活躍できる余白を組織が残しておくことの価値が語られます。</p>

          <h3>Holgar Dansk (伝説の戦士ホルガー・ダンスク)</h3>
          <p>最終章は、デンマークの伝説の英雄になぞらえた寓話で締めくくられ、必要なときに立ち上がる「潜在的な力」としてのチームや個人の可能性を象徴的に描いています。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>ルールや標準化を強めすぎていないか、定期的に点検する。</li>
              <li>規範の外側で自発的に動く人の動きを、罰するのではなく歓迎する仕組みを作る。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 10. Action Roadmap ===================== -->
        <section id="action-roadmap">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 10</div>
          <h2>実践ロードマップ: 7ステップで始めるPeopleware</h2>

          <p>ここまでの内容を、明日からのアクションに落とし込むと、次のようなロードマップになります。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ACTION_ROADMAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">7ステップで始めるPeopleware実践ロードマップ</div>
          </div>

          <div class="table-wrap">
            <table>
              <thead><tr><th>ステップ</th><th>該当するPart</th><th>具体的なアクション例</th></tr></thead>
              <tbody>
                <tr><td>1. 現状診断</td><td>Part I</td><td>直近の失敗事例を「技術要因」「人間要因」に分けて棚卸しする</td></tr>
                <tr><td>2. 環境整備</td><td>Part II</td><td>集中時間の確保、通知設計、座席レイアウトの見直し</td></tr>
                <tr><td>3. 採用と配置</td><td>Part III</td><td>実務に近い評価方法への切り替え、離職コストの可視化</td></tr>
                <tr><td>4. コミュニケーション設計</td><td>Part V</td><td>会議の棚卸し、非同期コミュニケーションの活用</td></tr>
                <tr><td>5. チーム形成</td><td>Part IV</td><td>新チーム結成時の「小さな成功体験」の設計</td></tr>
                <tr><td>6. チーミサイド対策</td><td>Part IV</td><td>評価制度・座席配置・締切設定にチーミサイドの兆候がないか点検</td></tr>
                <tr><td>7. 組織学習</td><td>Part V・VI</td><td>失敗を学びに変えるふりかえりの制度化、自由裁量の余白づくり</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ===================== 11. Developer Voices ===================== -->
        <section id="developer-voices">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:quote" aria-hidden="true" />SECTION 11</div>
          <h2>著名な開発者たちはどう語っているか</h2>

          <p>Peoplewareは出版から30年以上を経た今も、著名な開発者やソフトウェア工学の権威によって繰り返し言及されています。</p>

          <ul>
            <li><strong>Frederick P. Brooks Jr.</strong> (The Mythical Man-Month〈人月の神話〉の著者) は、第3版の推薦文の中で、本書が長年自身のお気に入りの2冊のうちの1冊であり続けていること、そして「チームの一体化」と「職場環境」に関する洞察が自身の考え方や教え方を変えたことを述べています。(<a href="https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/" target="_blank" rel="noopener">O'Reilly掲載ページ</a>より)</li>
            <li><strong>Joel Spolsky</strong> (Stack Overflow共同創業者、Fog Creek Software創業者) は、Peoplewareをソフトウェアチームを率いるすべての人が毎年読み返すべき一冊として推薦し続けています。自身の会社Fog Creekでは、この本の思想に触発されて、窓付き個室オフィス群「<strong>Bionic Office (バイオニック・オフィス)</strong>」を設計しました。プログラマーには「ドアを閉められる個室」が絶対条件だったとブログで説明しています。(<a href="https://www.joelonsoftware.com/2003/09/24/bionic-office/" target="_blank" rel="noopener">Bionic Office原文</a>) SpolskyはDeMarco本人と直接、個室環境とペアプログラミングの両立について意見交換したことも記しています。(<a href="https://www.joelonsoftware.com/2002/04/30/20020430/" target="_blank" rel="noopener">Joel on Software 2002年4月30日</a>)</li>
            <li>Stack Overflow社の公式ブログも、開放型オフィスが従業員満足度や生産性を損なうという研究結果があるにもかかわらず、業界全体がむしろ「壁のないオープンオフィス」へと向かっている状況を批判し、Peopleware由来の「個室文化」を維持し続ける理由を説明しています。(<a href="https://stackoverflow.blog/2015/01/16/why-we-still-believe-in-private-offices/" target="_blank" rel="noopener">Why We (Still) Believe in Private Offices</a>)</li>
            <li><strong>Cal Newport</strong> (『Deep Work』著者、ジョージタウン大学准教授) は、SpolskyによるFacebookの大規模オープンオフィス批判を取り上げ、個室と中断のない集中時間を提供することが、現代の「つながりすぎた時代」において開発者に提供できる最も価値のある福利厚生の一つだという趣旨のSpolskyの主張を紹介しています。(<a href="https://calnewport.com/is-facebooks-massive-open-office-scaring-away-developers/" target="_blank" rel="noopener">Cal Newportのブログ記事</a>)</li>
            <li>ソフトウェア工学の学術コミュニティでも、Coding War Gamesのデータは長年引用され続けており、Tim Lister自身の経歴ページでは、発表から25年以上経った後も職場設計に関する論考で参照され続けていると説明されています。(<a href="https://en.wikipedia.org/wiki/Tim_Lister" target="_blank" rel="noopener">Tim Lister — Wikipedia</a>)</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>「個室か、オープンオフィスか」は今も議論が分かれるテーマです。次章の批判的視点もあわせて確認し、自分たちのチームの働き方に合わせて判断しましょう。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 12. Critiques and Limits ===================== -->
        <section id="critiques-and-limits">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 12</div>
          <h2>批判的な視点・限界</h2>

          <p>Peoplewareは高く評価される一方で、いくつかの限界も指摘されています。バランスの取れた理解のために、以下の点も押さえておきましょう。</p>

          <ul>
            <li><strong>提言の受容には差がある:</strong> Tim Listerの経歴ページによれば、静けさや割り込み防止といった環境要因への提言は広く受け入れられた一方で、「オープンプランよりも囲われた個室空間を」という提言は、実際の業界では十分に採用されてこなかったと指摘されています。(<a href="https://en.wikipedia.org/wiki/Tim_Lister" target="_blank" rel="noopener">Tim Lister — Wikipedia</a>)</li>
            <li><strong>データの性質:</strong> Coding War Gamesの騒音評価は客観的な計測ではなく主観的な自己申告に基づくものであると著者ら自身が明言しており、環境要因と生産性の間の因果関係の解釈には注意が必要です。(<a href="https://www.usnews.com/opinion/blogs/economic-intelligence/2013/04/19/how-office-space-affects-company-productivity" target="_blank" rel="noopener">U.S. News掲載の解説</a>)</li>
            <li><strong>エピソード中心の構成:</strong> 読者レビューの中には、本書の主張の多くが逸話ベースであり、体系的な実証研究というよりは説得力のある経験則として受け止めるべきだ、という指摘も見られます。(<a href="https://www.goodreads.com/book/show/67825.Peopleware" target="_blank" rel="noopener">Goodreadsのレビュー欄</a>)</li>
            <li><strong>時代背景の違い:</strong> 初版は1987年に書かれており、リモートワークやクラウドベースのコラボレーションツールが一般化した現在の働き方とは前提が異なる部分があります。第3版ではハイブリッドチームや会議文化の変化を扱う章が追加されていますが、リモートファーストの組織にそのまま当てはめる際は、自組織の状況に応じた読み替えが必要です。</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>本書の提言を「絶対的な正解」としてではなく、「検証すべき仮説」として自組織に適用し、実際の効果を観察しながら調整しましょう。</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 13. Summary ===================== -->
        <section id="summary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 13</div>
          <h2>まとめ</h2>

          <p>Peoplewareが一貫して伝えているメッセージは、次の一文に集約できます。</p>

          <div class="callout note" data-variant="note" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p><strong>ソフトウェア開発プロジェクトの成否を分けるのは、多くの場合、技術そのものではなく、人・環境・組織文化である。</strong></p>
          </div>

          <p>この前提に立つと、マネージャーの役割は「人を働かせること」ではなく「人が働きやすい状況を作ること」に変わります。フローを守る環境づくり、適切な人材配置、チーミサイドを避けたチーム形成、そして時間を尊重する組織文化 — これらはどれも特別なツールを必要としない、明日からでも着手できる実践です。</p>
        </section>

        <!-- ===================== 14. References ===================== -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 14</div>
          <h2>参考ソース (URL一覧)</h2>

          <p>本ガイドの作成にあたり、2026年8月19日時点で以下の情報源を参照しました。</p>

          <div class="ref-group">
            <ul class="ref-list">
              <li><span class="ref-name">1. O'Reilly公式書籍ページ (原著目次・出版情報)</span><a class="ref-url" href="https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/</a></li>
              <li><span class="ref-name">2. O'Reilly Chapter 23: Teamicide (本文抜粋)</span><a class="ref-url" href="https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/ch23.xhtml" target="_blank" rel="noopener">https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/ch23.xhtml</a></li>
              <li><span class="ref-name">3. Wikipedia「Peopleware: Productive Projects and Teams」</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Peopleware:_Productive_Projects_and_Teams" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Peopleware:_Productive_Projects_and_Teams</a></li>
              <li><span class="ref-name">4. Wikipedia「Tim Lister」(Coding War Gamesの評価・受容の記述)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Tim_Lister" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Tim_Lister</a></li>
              <li><span class="ref-name">5. Wikipedia「Peopleware (用語)」</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Peopleware" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Peopleware</a></li>
              <li><span class="ref-name">6. Joel Spolsky「Bionic Office」(Joel on Software)</span><a class="ref-url" href="https://www.joelonsoftware.com/2003/09/24/bionic-office/" target="_blank" rel="noopener">https://www.joelonsoftware.com/2003/09/24/bionic-office/</a></li>
              <li><span class="ref-name">7. Joel Spolsky「2002/04/30」(DeMarco本人との対話)</span><a class="ref-url" href="https://www.joelonsoftware.com/2002/04/30/20020430/" target="_blank" rel="noopener">https://www.joelonsoftware.com/2002/04/30/20020430/</a></li>
              <li><span class="ref-name">8. Joel Spolsky「A Field Guide to Developers」</span><a class="ref-url" href="https://www.joelonsoftware.com/2006/09/07/a-field-guide-to-developers-2/" target="_blank" rel="noopener">https://www.joelonsoftware.com/2006/09/07/a-field-guide-to-developers-2/</a></li>
              <li><span class="ref-name">9. Stack Overflow Blog「Why We (Still) Believe in Private Offices」</span><a class="ref-url" href="https://stackoverflow.blog/2015/01/16/why-we-still-believe-in-private-offices/" target="_blank" rel="noopener">https://stackoverflow.blog/2015/01/16/why-we-still-believe-in-private-offices/</a></li>
              <li><span class="ref-name">10. Cal Newport「Is Facebook's Massive Open Office Scaring Away Developers?」</span><a class="ref-url" href="https://calnewport.com/is-facebooks-massive-open-office-scaring-away-developers/" target="_blank" rel="noopener">https://calnewport.com/is-facebooks-massive-open-office-scaring-away-developers/</a></li>
              <li><span class="ref-name">11. U.S. News「How Office Space Affects Company Productivity」(Coding War Games統計)</span><a class="ref-url" href="https://www.usnews.com/opinion/blogs/economic-intelligence/2013/04/19/how-office-space-affects-company-productivity" target="_blank" rel="noopener">https://www.usnews.com/opinion/blogs/economic-intelligence/2013/04/19/how-office-space-affects-company-productivity</a></li>
              <li><span class="ref-name">12. fs.blog「Increasing the Productivity of Computer Programmers and Engineers」</span><a class="ref-url" href="https://fs.blog/increasing-the-productivity-of-computer-programmers-and-engineers/" target="_blank" rel="noopener">https://fs.blog/increasing-the-productivity-of-computer-programmers-and-engineers/</a></li>
              <li><span class="ref-name">13. Applied Frameworks「What is Teamicide?」</span><a class="ref-url" href="https://appliedframeworks.com/what-is-teamicide/" target="_blank" rel="noopener">https://appliedframeworks.com/what-is-teamicide/</a></li>
              <li><span class="ref-name">14. The Scrum Academy「Peopleware: Productive Teams and Projects」要約</span><a class="ref-url" href="https://thescrumacademy.com/2015/03/16/peopleware-productive-teams-and-projects-3rd-edition/" target="_blank" rel="noopener">https://thescrumacademy.com/2015/03/16/peopleware-productive-teams-and-projects-3rd-edition/</a></li>
              <li><span class="ref-name">15. Goodreads「Peopleware」読者レビュー</span><a class="ref-url" href="https://www.goodreads.com/book/show/67825.Peopleware" target="_blank" rel="noopener">https://www.goodreads.com/book/show/67825.Peopleware</a></li>
            </ul>
          </div>
        </section>

        <footer>
          <p>本ガイドは上記ソースの内容を要約・翻訳・図解したものであり、原著の文章をそのまま転載したものではありません。詳細な内容は、必ず原著(第3版)をご参照ください。</p>
          <p>Peopleware および Productive Projects and Teams は Tom DeMarco および Tim Lister の著作物です。本ページはその内容を学習目的で紹介する非公式ガイドです。</p>
        </footer>
      </main>
    </div>
</template>

<style scoped>
/* ===================== Layout & Base ===================== */
.layout {
  display: block;
}

/*
 * キーボード操作でサイドバー TOC を飛ばして本文へ移動するための導線。
 * 通常は画面外へ退避し、フォーカス時のみ表示する。
 * 固定グローバルナビ（z-index:100 / --global-nav-height）の直下に出す。
 */
.skip-link {
  position: fixed;
  top: -48px;
  left: 0;
  z-index: 110;
  background: var(--color-paper-raised);
  color: var(--color-indigo);
  padding: 12px 20px;
  border: 1px solid var(--color-border);
  border-radius: 0 0 8px 0;
  transition: top 0.15s ease;
}

.skip-link:focus {
  top: var(--global-nav-height);
}

.main-content:focus {
  outline: none;
}

img, svg { max-width: 100%; }

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

.sidebar-nav a :deep(.iconify),
.sidebar-nav a i {
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
.sidebar-nav a.active i {
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
.hero-eyebrow i {
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
  font-size: 17px;
  flex-shrink: 0;
  margin-right: 6px;
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

.section-eyebrow :deep(.iconify) {
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

p { margin: 0 0 18px; }

ul, ol { margin: 0 0 18px; padding-left: 24px; }
li { margin-bottom: 8px; }

strong { font-weight: 600; color: var(--color-ink); }

em { color: var(--color-ink-soft); }

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
  font-size: 16px;
  line-height: 1.75;
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

.callout-title :deep(.iconify) {
  font-size: 17px;
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
.diagram-card,
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

/* ===================== Reference list ===================== */
.ref-group { margin-bottom: 28px; }
.ref-group h4 { margin-top: 0; }
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
  .sidebar { transition: none; }
}
</style>
