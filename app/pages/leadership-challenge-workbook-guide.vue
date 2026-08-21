<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "before-you-begin",
  "five-practices",
  "ten-commitments",
  "lpi-assessment",
  "workbook-workflow",
  "step-by-step-guide",
  "scrum-agile-mapping",
  "tech-leadership-connection",
  "other-leadership-theories",
  "common-antipatterns",
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
  title: "The Leadership Challenge Workbook 完全ガイド | ソフトウェアエンジニア・スクラムマスターのためのリーダーシップ実践入門",
  description: "Kouzes & Posnerの「The Leadership Challenge Workbook」を、ソフトウェアエンジニアとスクラムマスター向けにステップバイステップで解説する非公式ガイド。Five PracticesとTen Commitmentsをスクラムの現場に落とし込みます。",
});

const DIAGRAM_WORKBOOK_WORKFLOW = `flowchart TB
    A["Chapter 1 ワークブックの使い方を理解する"] --> B["Chapter 2 The Five Practices を学ぶ"]
    B --> C["Chapter 3 Personal-Best Leadership Project を選ぶ"]
    C --> D1["Chapter 4 Model the Way"]
    D1 --> D2["Chapter 5 Inspire a Shared Vision"]
    D2 --> D3["Chapter 6 Challenge the Process"]
    D3 --> D4["Chapter 7 Enable Others to Act"]
    D4 --> D5["Chapter 8 Encourage the Heart"]
    D5 --> E["Chapter 9 プロジェクトを振り返る"]
    E --> F["Chapter 10 The Challenge Continues"]
    F -.->|"次のプロジェクトへ"| C

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,D1,D2,D3,D4,D5,E,F box;
    class C hub;`;
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
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <!-- ===================== Sidebar ===================== -->
    <nav id="sidebar" class="sidebar" aria-label="目次" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">Leadership Challenge ガイド</div>
          <div class="brand-subtitle">実践ワークブック解説</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li class="nav-group-label">基礎知識</li>
        <li><a href="#before-you-begin" :class="{ active: activeId === 'before-you-begin' }" @click="closeSidebar"><Icon name="tabler:book" />この本を読む前に</a></li>
        <li><a href="#five-practices" :class="{ active: activeId === 'five-practices' }" @click="closeSidebar"><Icon name="tabler:list-numbers" />Five Practices</a></li>
        <li><a href="#ten-commitments" :class="{ active: activeId === 'ten-commitments' }" @click="closeSidebar"><Icon name="tabler:checklist" />Ten Commitments</a></li>
        <li><a href="#lpi-assessment" :class="{ active: activeId === 'lpi-assessment' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" />LPIとは</a></li>
        <li class="nav-group-label">実践ガイド</li>
        <li><a href="#workbook-workflow" :class="{ active: activeId === 'workbook-workflow' }" @click="closeSidebar"><Icon name="tabler:route" />全体構成とワークフロー</a></li>
        <li><a href="#step-by-step-guide" :class="{ active: activeId === 'step-by-step-guide' }" @click="closeSidebar"><Icon name="tabler:map-2" />ステップバイステップ実践</a></li>
        <li><a href="#scrum-agile-mapping" :class="{ active: activeId === 'scrum-agile-mapping' }" @click="closeSidebar"><Icon name="tabler:git-branch" />スクラムへの適用マップ</a></li>
        <li class="nav-group-label">発展</li>
        <li><a href="#tech-leadership-connection" :class="{ active: activeId === 'tech-leadership-connection' }" @click="closeSidebar"><Icon name="tabler:external-link" />海外テックリーダー論</a></li>
        <li><a href="#other-leadership-theories" :class="{ active: activeId === 'other-leadership-theories' }" @click="closeSidebar"><Icon name="tabler:building-bank" />他理論との位置づけ</a></li>
        <li><a href="#common-antipatterns" :class="{ active: activeId === 'common-antipatterns' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" />アンチパターン</a></li>
        <li class="nav-group-label">まとめ</li>
        <li><a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar"><Icon name="tabler:flag-3" />まとめ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" />参考文献・出典</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" />The Leadership Challenge Workbook</div>
        <h1>The Leadership Challenge Workbook 完全ガイド</h1>
        <p class="hero-lede">
          ソフトウェアエンジニア / スクラムマスターのためのリーダーシップ実践入門
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">The Five Practices(模範的リーダーシップの5つの実践)</div></div>
          <div class="stat-card"><div class="stat-number">10</div><div class="stat-label">Ten Commitments(リーダーシップの10の誓約)</div></div>
          <div class="stat-card"><div class="stat-number">160ページ</div><div class="stat-label">Wiley刊 第4版 / 2023年4月</div></div>
          <div class="stat-card"><div class="stat-number">40年+</div><div class="stat-label">の実証研究に基づくLPI理論</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          対象書籍: <em>The Leadership Challenge Workbook, 4th Edition</em>(James M. Kouzes, Barry Z. Posner 著 / Wiley / 2023年4月刊 / 全160ページ)。本ガイドは、同ワークブックの構成に沿いながら、初学者のソフトウェアエンジニアやスクラムマスターが「今日から実践できる」形に翻訳したステップバイステップ解説です。
        </div>
      </div>

      <!-- ===================== 01. Before You Begin ===================== -->
      <section id="before-you-begin">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book" />SECTION 01</div>
        <h2>この本を読む前に知っておきたいこと</h2>

        <h3>書籍としての位置づけ</h3>
        <p><em>The Leadership Challenge</em> は、James Kouzes と Barry Posner が1983年に開始した調査研究に基づくリーダーシップ論で、初版は1987年に刊行され、2023年に第7版が発行されているロングセラーです。研究の出発点は非常にシンプルな問いでした――「あなたが&ldquo;自己最高(personal best)&rdquo;のリーダーシップを発揮したとき、何をしていたか？」。この問いへの数百〜数千件規模のインタビューとアンケートの分析から、5つの共通パターン(The Five Practices of Exemplary Leadership)が抽出されました。</p>
        <p><em>The Leadership Challenge Workbook</em> は、この理論書の内容を、読者自身の実際のプロジェクト(Personal-Best Leadership Project)に当てはめて演習形式で身につけるための「実践ドリル」です。単なる知識のインプットではなく、リフレクション(内省)とアプリケーション(実践課題)を交互に繰り返す構成になっている点が特徴です。</p>

        <h3>なぜソフトウェアエンジニア・スクラムマスターに関係するのか</h3>
        <p>ソフトウェア開発の現場でリーダーシップが求められるのは、必ずしも「マネージャー」という肩書を持つ人だけではありません。スクラムマスター、テックリード、シニアエンジニアなど、権限(authority)ではなく信頼関係(relationship)でチームを動かす立場の人ほど、Kouzes & Posner の枠組みが有効に機能します。彼らの中心的な主張は「リーダーシップは特別な人物の資質ではなく、観察可能で学習可能な&ldquo;ふるまい(behavior)&rdquo;の集合である」という点にあり、これはアジャイル文脈における「サーバントリーダーシップ」や「権限によらない影響力」の考え方と非常に相性が良い理論です。</p>
      </section>

      <!-- ===================== 02. Five Practices ===================== -->
      <section id="five-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-numbers" />SECTION 02</div>
        <h2>The Five Practices of Exemplary Leadership(模範的リーダーシップの5つの実践)</h2>

        <p>書籍の核となる5つの実践を、一般的な定義とソフトウェア開発現場での具体例に対応させると次のようになります。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Practice(原語)</th><th>日本語訳</th><th>一言でいうと</th><th>ソフトウェア開発現場での具体例</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Model the Way</td><td>模範を示す</td><td>有言実行</td><td>コーディング規約やレビュー基準を、自分が最初に守る</td></tr>
              <tr><td>2</td><td>Inspire a Shared Vision</td><td>共有ビジョンを鼓舞する</td><td>未来を描き、巻き込む</td><td>「なぜこのリファクタリングが必要か」を数字とストーリーで語る</td></tr>
              <tr><td>3</td><td>Challenge the Process</td><td>プロセスに挑戦する</td><td>現状を疑い、小さく実験する</td><td>レトロスペクティブで得た改善案をまず1スプリントだけ試す</td></tr>
              <tr><td>4</td><td>Enable Others to Act</td><td>人を励まし行動を促す</td><td>権限委譲と信頼構築</td><td>ペアプロ・モブプロで知識と裁量を共有し、心理的安全性を作る</td></tr>
              <tr><td>5</td><td>Encourage the Heart</td><td>心に働きかけ励ます</td><td>承認と称賛の文化</td><td>デモDayやSlackで、小さな成果でも具体的に称賛する</td></tr>
            </tbody>
          </table>
        </div>

        <p>各実践は独立した「テクニック集」ではなく、互いに補強し合うサイクルとして機能する点が重要です。たとえば「模範を示す」ことなしに「共有ビジョンを鼓舞」しても説得力は生まれず、「人を励まし行動を促す」ことなしに「プロセスへの挑戦」を求めても、心理的安全性がなければ誰も新しい実験に手を挙げません。</p>
      </section>

      <!-- ===================== 03. Ten Commitments ===================== -->
      <section id="ten-commitments">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checklist" />SECTION 03</div>
        <h2>Ten Commitments of Leadership(リーダーシップの10の誓約)</h2>

        <p>各実践は、さらに2つずつの具体的な「誓約(Commitment)」に分解されています。これがワークブックの各章(Chapter 4〜8)で内省・実践課題として扱われる単位です。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>実践</th><th>誓約1</th><th>誓約2</th></tr>
            </thead>
            <tbody>
              <tr><td>Model the Way</td><td>自分の声(価値観)を明確にし、共有された価値観を確認する</td><td>共有された価値観に沿って行動し、模範を示す</td></tr>
              <tr><td>Inspire a Shared Vision</td><td>ワクワクする可能性を思い描き、未来を構想する</td><td>共有された願望に訴えかけ、他者を巻き込む</td></tr>
              <tr><td>Challenge the Process</td><td>主体的に機会を探し、外部からも改善のヒントを求める</td><td>小さな成功を積み重ねる実験を行い、失敗からも学ぶ</td></tr>
              <tr><td>Enable Others to Act</td><td>信頼を築き、協働関係を促進する</td><td>自己決定力を高め、他者の能力開発を支援する</td></tr>
              <tr><td>Encourage the Heart</td><td>個人の卓越性に感謝を示し、貢献を認める</td><td>価値観と勝利を祝い、共同体の精神を作る</td></tr>
            </tbody>
          </table>
        </div>

        <p>初学者向けのポイントは、「誓約」は抽象的なスローガンではなく、<strong>観察可能な行動</strong>として書かれている点です。ワークブックでは、この行動を「自分はどのくらいの頻度で実践できているか」をLPIという診断ツールで測定し、ギャップを可視化するアプローチを取ります。</p>
      </section>

      <!-- ===================== 04. LPI Assessment ===================== -->
      <section id="lpi-assessment">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" />SECTION 04</div>
        <h2>LPI(Leadership Practices Inventory)とは</h2>

        <p>LPIは、Kouzes & Posner が開発した30項目の行動アンケートで、5つの実践それぞれに対応する6つの行動の実践頻度を測定します。周囲(上司・同僚・部下など)の観察者による評価を集める「LPI 360」と、自己評価のみで完結する自己診断版がそれぞれ提供されており、両者は別のものです。自己評価と観察者評価を突き合わせたギャップの分析は、観察者評価を伴う LPI 360 で行います。公式サイトによれば、このモデルとLPIは40年以上の実証研究、5,000件以上のケーススタディ、750件以上の独立研究(independent research studies)に裏付けられており、70カ国以上で用いられ、開発以来800万人超の回答者(LPI利用者)のデータが蓄積されています。</p>
        <p>ワークブック自体にはLPIの実施が必須ではありませんが、多くのユーザーはLPI診断結果を持ち込んだうえでワークブックの演習に取り組みます。エンジニアリング組織であれば、1on1やチームのふりかえりの中で「自分は&ldquo;Enable Others to Act&rdquo;をどのくらい体現できているか」をチームメンバーからフィードバックしてもらう、という簡易版の運用も可能です。</p>
      </section>

      <!-- ===================== 05. Workbook Workflow ===================== -->
      <section id="workbook-workflow">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 05</div>
        <h2>ワークブックの全体構成とワークフロー</h2>

        <p><em>The Leadership Challenge Workbook, 4th Edition</em> の実際の章構成(目次)は以下の通りです。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Chapter</th><th>タイトル</th><th>内容の要旨</th></tr>
            </thead>
            <tbody>
              <tr><td>Introduction</td><td>はじめに</td><td>自己最高のリーダーシップとは何かを問いかける</td></tr>
              <tr><td>Chapter 1</td><td>How to Use This Workbook</td><td>ワークブックの構成とガイドライン</td></tr>
              <tr><td>Chapter 2</td><td>The Five Practices of Exemplary Leadership</td><td>5つの実践の理論的な全体像</td></tr>
              <tr><td>Chapter 3</td><td>Selecting Your Personal-Best Leadership Project</td><td>実践対象となる自分のプロジェクトを選ぶ</td></tr>
              <tr><td>Chapter 4</td><td>Model the Way</td><td>模範を示す: リフレクション&アプリケーション演習</td></tr>
              <tr><td>Chapter 5</td><td>Inspire a Shared Vision</td><td>共有ビジョンを鼓舞する: ビジョンステートメント作成演習</td></tr>
              <tr><td>Chapter 6</td><td>Challenge the Process</td><td>プロセスに挑戦する: 小さな実験の設計演習</td></tr>
              <tr><td>Chapter 7</td><td>Enable Others to Act</td><td>人を励まし行動を促す: パワープロファイル演習</td></tr>
              <tr><td>Chapter 8</td><td>Encourage the Heart</td><td>心に働きかけ励ます: 同僚への称賛(Kudos)演習</td></tr>
              <tr><td>Chapter 9</td><td>Reflecting on Your Personal-Best Leadership Project</td><td>プロジェクト全体の振り返り</td></tr>
              <tr><td>Chapter 10</td><td>The Challenge Continues</td><td>継続的な成長へのつなぎ</td></tr>
            </tbody>
          </table>
        </div>

        <p>この構成をフローチャートにすると、次のような一連のサイクルとして理解できます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_WORKBOOK_WORKFLOW" theme="base" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">ワークブック全体のワークフロー(Chapter 4-8はFive Practices実践サイクル)</div>
        </div>

        <p>ポイントは、Chapter 10 が「終わり」ではなく Chapter 3 の「次のプロジェクト選定」へループする設計になっていることです。つまりこのワークブックは、一度きりの研修教材ではなく、<strong>継続的なリーダーシップ改善のPDCAサイクル</strong>として設計されています。</p>
      </section>

      <!-- ===================== 06. Step by Step Guide ===================== -->
      <section id="step-by-step-guide">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" />SECTION 06</div>
        <h2>ステップバイステップ実践ガイド</h2>

        <p>以下は、各章を初学者エンジニアが実務でそのまま使えるように分解した手順です。</p>

        <h3>Step 1: 使い方を理解する(Chapter 1 相当)</h3>
        <ul>
          <li>ワークブックは「読む」ものではなく「書き込む」ものだと理解する。</li>
          <li>一人で完結させず、信頼できる同僚やメンターとの対話を前提に進める(1on1やメンタリングの題材にすると効果的)。</li>
        </ul>

        <h3>Step 2: Personal-Best Leadership Project を選ぶ(Chapter 3 相当)</h3>
        <p>エンジニアであれば、以下のような「実プロジェクト」を題材にするのが現実的です。</p>
        <ul>
          <li>レガシーシステムのリファクタリングをチームに提案し、実行し切った経験</li>
          <li>新しいスクラムイベント(例: モブプロ導入)をチームに定着させた経験</li>
          <li>インシデント対応チームを率いて障害を収束させた経験</li>
        </ul>
        <p>選定の基準は「規模の大きさ」ではなく、「自分がリーダーとして最も強く関与し、何かを動かした実感がある経験」であることです。</p>

        <h3>Step 3〜7: 5つの実践を一つずつ深める(Chapter 4〜8 相当)</h3>
        <p>各章は共通して「Reflection(内省の問い)→ Application(具体的な実践課題)→ Implications(次への示唆)」という3段構成になっています。ソフトウェアチームでの適用例を含めて整理すると以下の通りです。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Chapter</th><th>内省の問いの例</th><th>エンジニアリングチームでの実践課題例</th></tr>
            </thead>
            <tbody>
              <tr><td>4: Model the Way</td><td>自分がコードレビューで本当に大事にしている価値観は何か？</td><td>チームの「Definition of Done」を自分自身が一番厳格に守っているか点検する</td></tr>
              <tr><td>5: Inspire a Shared Vision</td><td>半年後、このシステムがどうなっていてほしいか？</td><td>技術ビジョンを1枚のスライドやREADMEにまとめ、チームに共有する</td></tr>
              <tr><td>6: Challenge the Process</td><td>「昔からそうだから」で続けている開発プロセスはないか？</td><td>1つのプラクティス(例: 手動デプロイ)を1スプリントだけ自動化実験する</td></tr>
              <tr><td>7: Enable Others to Act</td><td>チームメンバーの裁量を制限してしまっている場面はどこか？</td><td>オンコール対応の権限を若手にも段階的に委譲する</td></tr>
              <tr><td>8: Encourage the Heart</td><td>直近1か月で、誰かの貢献に具体的な感謝を伝えたか？</td><td>スプリントレビューの最後に「Kudos」の時間を設ける</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Step 8: プロジェクトを振り返る(Chapter 9 相当)</h3>
        <p>5つの実践を一通り経験したあと、「どの実践が最も自然にできたか」「どの実践が最も苦手だったか」を言語化します。ここで重要なのは、苦手な実践を無理に克服しようとするのではなく、<strong>チーム内で補完し合う体制を作る</strong>という発想です。たとえばビジョンを語るのが苦手なテックリードは、その部分をプロダクトマネージャーやスクラムマスターと分担してもよいでしょう。</p>

        <h3>Step 9: 継続する(Chapter 10 相当)</h3>
        <p>ワークブックは、この振り返りを一度で終わらせず、次のプロジェクトでもう一度 Step 2 に戻ることを推奨しています。四半期ごとの目標設定(OKRなど)と連動させ、「今期の Personal-Best Leadership Project は何か」を定期的に問い直す運用にすると、実務に組み込みやすくなります。</p>
      </section>

      <!-- ===================== 07. Scrum Agile Mapping ===================== -->
      <section id="scrum-agile-mapping">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 07</div>
        <h2>スクラム / アジャイル現場への適用マップ</h2>

        <p>5つの実践を、スクラムの代表的なイベントやロールに対応させると、次のような役割マップになります。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>実践</th><th>対応しやすいスクラムイベント / ロール</th><th>スクラムマスターが取れる具体的アクション</th></tr>
            </thead>
            <tbody>
              <tr><td>Model the Way</td><td>デイリースクラム、チームの規範(Working Agreement)</td><td>タイムボックスやふりかえりのルールを率先して守る</td></tr>
              <tr><td>Inspire a Shared Vision</td><td>スプリントプランニング、プロダクトゴール共有</td><td>「なぜこのスプリントゴールなのか」を毎回言語化して伝える</td></tr>
              <tr><td>Challenge the Process</td><td>レトロスペクティブ</td><td>改善アクションを「実験」として小さく試し、次のレトロで結果を検証する</td></tr>
              <tr><td>Enable Others to Act</td><td>スプリントバックログの自己組織化</td><td>タスクの割り当てをチーム自身に委ね、ファシリテーションに徹する</td></tr>
              <tr><td>Encourage the Heart</td><td>スプリントレビュー、デモ</td><td>完成した機能だけでなく、そこに至るまでの工夫や失敗からの学びも称賛する</td></tr>
            </tbody>
          </table>
        </div>

        <p>スクラムマスターは「サーバントリーダー」として権限を持たずにチームを導く立場であるため、Kouzes & Posner が強調する「信頼関係に基づく影響力」という考え方は、役職ベースのリーダーシップ論よりも直接的に適用できます。</p>
      </section>

      <!-- ===================== 08. Tech Leadership Connection ===================== -->
      <section id="tech-leadership-connection">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:external-link" />SECTION 08</div>
        <h2>海外テックリーダーシップ論との接続</h2>

        <p><em>The Leadership Challenge</em> は一般的な組織論の古典ですが、ソフトウェアエンジニアリング業界の著名なリーダーたちの推薦図書リストの中でも繰り返し取り上げられています。</p>

        <ul>
          <li>海外のエンジニアリングマネジメント系メディアがまとめた「目指すべきテックリーダーのための必読書リスト」では、<em>The Leadership Challenge</em> が Will Larson(元Calm CTO)の <em>Staff Engineer: Leadership Beyond the Management Track</em>(同リストでは技術リーダーシップ / キャリア成長の分野で紹介)や <em>An Elegant Puzzle: Systems of Engineering Management</em>(同リストのFAQで「すべてのエンジニアリングマネージャーへの推薦書」として紹介)と同じリストに並んでいます。Larson の実務書群と Kouzes & Posner は、「システム思考に基づく実務書」と「行動科学に基づく理論書」という補完関係にあります。</li>
          <li>Camille Fournier(元 Rent the Runway CTO、現 CoreWeave VP Engineering)は著書 <em>The Manager's Path</em>(O'Reilly, 2017)で、エンジニアからマネージャーへのキャリアパスにおけるコミュニケーションと信頼構築の重要性を論じており、InfoQ のインタビューでもこのテーマについて詳しく語っています。これは Kouzes & Posner の「Enable Others to Act」「Model the Way」と直接重なる主張です。</li>
          <li>James Stanier の <em>Become an Effective Software Engineering Manager</em> も同様に、実務寄りのマネジメント書として <em>The Leadership Challenge</em> と並んで紹介されることが多く、理論(Kouzes & Posner)と実務(Fournier, Larson, Stanier)を組み合わせて読むことが、海外のテックリーダーシップ教育では一般的なアプローチとなっています。</li>
        </ul>

        <p>初学者への実践的な示唆としては、<strong>「5つの実践」を理論的な地図として持ちながら、Fournier や Larson が語る具体的な現場エピソードで肉付けする</strong>という読み方が効果的です。</p>
      </section>

      <!-- ===================== 09. Other Leadership Theories ===================== -->
      <section id="other-leadership-theories">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 09</div>
        <h2>他のリーダーシップ理論との位置づけ</h2>

        <p>Kouzes & Posner のモデルは唯一絶対の正解ではなく、他の主要なリーダーシップ理論と組み合わせて理解すると、より実践的になります。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>関連理論</th><th>Five Practices との関係</th></tr>
            </thead>
            <tbody>
              <tr><td>Goleman の6つのリーダーシップスタイル</td><td>「どんな行動(What)」をFive Practicesが定義し、「どんなトーン(How)」でそれを届けるかをGolemanのスタイル論が補完する</td></tr>
              <tr><td>Situational Leadership II(SLII)</td><td>Five Practicesが行動レパートリーの幅を定義し、SLIIはタスクの習熟度に応じて指示と支援の配分を調整する</td></tr>
              <tr><td>Path-Goal Theory</td><td>「Challenge the Process」は障害物の除去、「Enable Others to Act」は道筋の明確化と重なる</td></tr>
              <tr><td>Level 5 Leadership / サーバントリーダーシップ</td><td>「Model the Way」「Enable Others to Act」の謙虚さ・奉仕の精神と親和性が高い</td></tr>
              <tr><td>Kotter の8段階の変革プロセス</td><td>「Inspire a Shared Vision」はビジョン策定段階、「Challenge the Process」は短期的成果の創出段階と対応する</td></tr>
            </tbody>
          </table>
        </div>

        <p>これらはあくまで補完関係であり、実務では「Five Practicesを土台に、状況に応じて他の理論のレンズを重ねる」使い方が推奨されます。</p>
      </section>

      <!-- ===================== 10. Common Antipatterns ===================== -->
      <section id="common-antipatterns">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" />SECTION 10</div>
        <h2>よくあるアンチパターン</h2>

        <p>初学者がワークブックを実践する際に陥りやすい失敗パターンを整理しました。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>アンチパターン</th><th>何が問題か</th><th>改善のヒント</th></tr>
            </thead>
            <tbody>
              <tr><td>ビジョンだけを語り、模範を示さない</td><td>「有言実行」が伴わないと信頼を失う</td><td>まず自分自身の行動を1つ変えてから語る</td></tr>
              <tr><td>5つの実践を順番にこなす「チェックリスト化」</td><td>実践は相互補強的であり、機械的な消化作業ではない</td><td>1つの実践を深めながら、他の実践との関連を都度振り返る</td></tr>
              <tr><td>フィードバックをLPIやアンケートだけに頼る</td><td>定量データだけでは行動の背景にある文脈が見えない</td><td>1on1などの定性的な対話と組み合わせる</td></tr>
              <tr><td>称賛(Encourage the Heart)を成果が出たときだけ行う</td><td>挑戦した過程そのものへの承認がないと、次の挑戦が生まれにくくなる</td><td>失敗から学んだプロセスそのものを称賛の対象にする</td></tr>
              <tr><td>Personal-Best Leadership Project を一度きりで終わらせる</td><td>継続的なサイクルでなければ行動は定着しない</td><td>四半期ごとなど、定期的に振り返りのタイミングを設ける</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 11. Summary ===================== -->
      <section id="summary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 11</div>
        <h2>まとめ</h2>

        <p><em>The Leadership Challenge Workbook</em> は、リーダーシップを「才能」ではなく「練習によって上達するスキル」として扱う実践的なドリルです。ソフトウェアエンジニアやスクラムマスターにとっての価値は、権限に頼らずチームを動かすための具体的な行動指針――模範を示す、ビジョンを語る、プロセスに挑戦する、人を励まし行動を促す、心に働きかけ励ます――を、抽象論ではなく自分自身の実プロジェクトに落とし込んで練習できる点にあります。理論書としての本編(<em>The Leadership Challenge</em>)と、実践ドリルとしての本ワークブックをセットで使うことで、エンジニアリング組織における日々のふるまいの変化に直結させることができます。</p>
      </section>

      <!-- ===================== 12. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 12</div>
        <h2>参考文献・出典(Sources)</h2>

        <p>本ガイドは2026年8月19日時点でのウェブ検索により収集した以下の一次情報・解説記事に基づいて作成しています。</p>

        <div class="ref-group">
          <h3>公式・出版社情報</h3>
          <ul class="ref-list">
            <li><span class="ref-name">The Leadership Challenge Workbook, 4th Edition(O'Reilly掲載・目次含む)</span><a class="ref-url" href="https://www.oreilly.com/library/view/the-leadership-challenge/9781394152223/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/the-leadership-challenge/9781394152223/</a></li>
            <li><span class="ref-name">The Five Practices of Exemplary Leadership(公式サイト)</span><a class="ref-url" href="https://www.leadershipchallenge.com/five-practices" target="_blank" rel="noopener">https://www.leadershipchallenge.com/five-practices</a></li>
            <li><span class="ref-name">The Leadership Challenge ホーム(LPI・実績データ)</span><a class="ref-url" href="https://www.leadershipchallenge.com/home" target="_blank" rel="noopener">https://www.leadershipchallenge.com/home</a></li>
            <li><span class="ref-name">Meet the Authors(Kouzes & Posner 経歴)</span><a class="ref-url" href="https://www.leadershipchallenge.com/five-practices/about-the-authors" target="_blank" rel="noopener">https://www.leadershipchallenge.com/five-practices/about-the-authors</a></li>
            <li><span class="ref-name">The Leadership Challenge, 7th Edition(Wiley)</span><a class="ref-url" href="https://www.wiley.com/en-us/The+Leadership+Challenge:+How+to+Make+Extraordinary+Things+Happen+in+Organizations,+7th+Edition-p-9781119736127" target="_blank" rel="noopener">https://www.wiley.com/en-us/The+Leadership+Challenge:+How+to+Make+Extraordinary+Things+Happen+in+Organizations,+7th+Edition-p-9781119736127</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>学術・解説記事</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Kouzes & Posner, "The Five Practices of Exemplary Leadership"(Encyclopedia of Management Theory 収録原稿)</span><a class="ref-url" href="https://scholarcommons.scu.edu/mgmt/30/" target="_blank" rel="noopener">https://scholarcommons.scu.edu/mgmt/30/</a></li>
            <li><span class="ref-name">Kouzes-Posner Five Practices of Exemplary Leadership(他理論との比較解説)</span><a class="ref-url" href="https://umbrex.com/resources/frameworks/organization-frameworks/kouzes-posner-five-practices-of-exemplary-leadership/" target="_blank" rel="noopener">https://umbrex.com/resources/frameworks/organization-frameworks/kouzes-posner-five-practices-of-exemplary-leadership/</a></li>
            <li><span class="ref-name">The 5 Practices of Exemplary Leadership(Boise State University による解説・教育リソース)</span><a class="ref-url" href="https://www.boisestate.edu/academics-deptchairs/home/resources-for-academic-leaders/new-academic-leaders-program/the-5-practices-of-exemplary-leadership/" target="_blank" rel="noopener">https://www.boisestate.edu/academics-deptchairs/home/resources-for-academic-leaders/new-academic-leaders-program/the-5-practices-of-exemplary-leadership/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>ソフトウェアエンジニアリング / テックリーダーシップの文脈</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Essential Engineering Management Books for Aspiring Tech Leaders(Will Larson『Staff Engineer』『An Elegant Puzzle』等との併記)</span><a class="ref-url" href="https://engineeringmanagement.org/essential-em-books/" target="_blank" rel="noopener">https://engineeringmanagement.org/essential-em-books/</a></li>
            <li><span class="ref-name">Camille Fournier(CoreWeave 公式・現職「VP of Engineering at CoreWeave」を確認できる一次情報)</span><a class="ref-url" href="https://www.coreweave.com/resources/videos/empowering-development-teams" target="_blank" rel="noopener">https://www.coreweave.com/resources/videos/empowering-development-teams</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>二次情報・歴史的資料</h3>
          <ul class="ref-list">
            <li><span class="ref-name">The Leadership Challenge(Wikipedia、書誌情報)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/The_Leadership_Challenge" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/The_Leadership_Challenge</a></li>
            <li><span class="ref-name">Camille Fournier(Wikipedia、経歴・著書情報)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Camille_Fournier" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Camille_Fournier</a></li>
            <li><span class="ref-name">Q&A on The Manager's Path with Camille Fournier(InfoQ / 執筆当時の所属に基づく記事)</span><a class="ref-url" href="https://www.infoq.com/articles/book-review-managers-path" target="_blank" rel="noopener">https://www.infoq.com/articles/book-review-managers-path</a></li>
            <li><span class="ref-name">Camille Fournier on Platform Engineering, Engineering Ladders, and Her Book "The Manager's Path"(InfoQ Podcast / 公開当時の所属に基づく)</span><a class="ref-url" href="https://www.infoq.com/culture-methods/podcasts/9" target="_blank" rel="noopener">https://www.infoq.com/culture-methods/podcasts/9</a></li>
          </ul>
        </div>
      </section>

      <footer>
        <p>本ページは<em>The Leadership Challenge Workbook, 4th Edition</em>(James M. Kouzes, Barry Z. Posner 著 / Wiley)を題材にした非公式の学習用解説ガイドです。著作権保護されたテキストの引用を避け、公開情報を要約・翻案する形で作成しています。原著の詳細な演習内容を確認したい場合は、上記の出典、または書籍本体(Wiley刊)をご参照ください。</p>
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

.sidebar-nav a :deep(.iconify) { font-size: 17px; color: var(--color-ink-faint); flex: none; }

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

.sidebar-nav a.active :deep(.iconify) { color: var(--color-indigo); }

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

.hero-eyebrow :deep(.iconify) { font-size: 17px; }

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
  align-items: flex-start;
  gap: 10px;
}

.disclaimer-box :deep(.iconify) {
  font-size: 20px;
  flex: none;
  margin-top: 3px;
}

section {
  margin: 72px 0;
  scroll-margin-top: calc(var(--global-nav-height) + var(--heading-anchor-gap));
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

.section-eyebrow :deep(.iconify) { font-size: 16px; }

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 29px;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + var(--heading-anchor-gap));
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  color: var(--color-ink);
  margin: 40px 0 16px;
  scroll-margin-top: calc(var(--global-nav-height) + var(--heading-anchor-gap));
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

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 20px 0;
  text-align: center;
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
.ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; text-decoration: none; }
.ref-list .ref-url:hover { text-decoration: underline; }

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
