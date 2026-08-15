<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "introduction",
  "career-path-overview",
  "role-descriptions",
  "self-assessment",
  "tech-lead-preparation",
  "first-90-days",
  "core-practices",
  "project-oxygen",
  "common-pitfalls",
  "engineer-manager-pendulum",
  "skill-roadmap",
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
  title: "エンジニアのためのマネジメントキャリアパス 完全ガイド | 初学者向けベストプラクティス",
  description: "ソフトウェアエンジニアがエンジニアリングマネージャーへ転身するためのキャリアパス、判断基準、最初の90日、日々の実務を、国際的に著名なエンジニアリングリーダーの知見に基づいて解説する初学者向けガイド。",
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
    A["ソフトウェアエンジニア"] --> B["シニアソフトウェアエンジニア"]
    B --> C{"キャリアの分岐点"}
    C -->|"技術を極める"| D1["スタッフエンジニア"]
    D1 --> D2["シニアスタッフ・プリンシパルエンジニア"]
    D2 --> D3["ディスティングイッシュトエンジニア・フェロー"]
    C -->|"人と組織を率いる"| E1["テックリード"]
    E1 --> E2["エンジニアリングマネージャー"]
    E2 --> E3["シニアEM・マネージャーオブマネージャーズ"]
    E3 --> E4["ディレクター"]
    E4 --> E5["VPオブエンジニアリング"]
    E5 --> E6["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,D1,D2,E1,E2,E3,E4,E5 box;
    class C hub;
    class D3,E6 done;`;

const DIAGRAM_FIRST_90_DAYS = `flowchart TB
    S1["1週目 傾聴に徹する 1on1で期待値とチームの状況をヒアリング"] --> S2["2〜4週目 シグナル収集 コード・プロセス・人間関係を観察する"]
    S2 --> S3["30日目 30-60-90日プランを作成しチームと共有する"]
    S3 --> S4["60日目 小さな成功体験を積み重ね信頼を構築する"]
    S4 --> S5["90日目 マネジメントスタイルを確立しフィードバックの循環をつくる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4 box;
    class S5 done;`;

const DIAGRAM_PENDULUM = `flowchart LR
    A["個人貢献者ICとして技術力を磨く期間"] --> B["テックリードとして技術と組織の橋渡しをする期間"]
    B --> C["エンジニアリングマネージャーとして人と組織を育てる期間"]
    C -.->|"スキルの陳腐化を避けるため一定期間で技術側へ戻る"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,C box;
    class B hub;`;
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
      <Icon class="ti" name="tabler:menu-2" />
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
          <div class="brand-title">エンジニアリング・マネジメント ガイド</div>
          <div class="brand-subtitle">初学者向け完全ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a href="#introduction" :class="{ active: activeId === 'introduction' }" @click="closeSidebar"><Icon class="ti" name="tabler:rocket" />1. はじめに</a></li>
        <li><a href="#career-path-overview" :class="{ active: activeId === 'career-path-overview' }" @click="closeSidebar"><Icon class="ti" name="tabler:git-branch" />2. キャリアの全体像</a></li>
        <li><a href="#role-descriptions" :class="{ active: activeId === 'role-descriptions' }" @click="closeSidebar"><Icon class="ti" name="tabler:users" />3. 各役職の詳細解説</a></li>
        <li><a href="#self-assessment" :class="{ active: activeId === 'self-assessment' }" @click="closeSidebar"><Icon class="ti" name="tabler:list-check" />4. 向いているか判断する</a></li>
        <li><a href="#tech-lead-preparation" :class="{ active: activeId === 'tech-lead-preparation' }" @click="closeSidebar"><Icon class="ti" name="tabler:stairs" />5. なる前の準備</a></li>
        <li><a href="#first-90-days" :class="{ active: activeId === 'first-90-days' }" @click="closeSidebar"><Icon class="ti" name="tabler:calendar-event" />6. 最初の90日</a></li>
        <li><a href="#core-practices" :class="{ active: activeId === 'core-practices' }" @click="closeSidebar"><Icon class="ti" name="tabler:tools" />7. コアプラクティス</a></li>
        <li><a href="#project-oxygen" :class="{ active: activeId === 'project-oxygen' }" @click="closeSidebar"><Icon class="ti" name="tabler:star" />8. Project Oxygen</a></li>
        <li><a href="#common-pitfalls" :class="{ active: activeId === 'common-pitfalls' }" @click="closeSidebar"><Icon class="ti" name="tabler:alert-triangle" />9. よくある失敗</a></li>
        <li><a href="#engineer-manager-pendulum" :class="{ active: activeId === 'engineer-manager-pendulum' }" @click="closeSidebar"><Icon class="ti" name="tabler:arrows-shuffle" />10. 振り子戦略</a></li>
        <li><a href="#skill-roadmap" :class="{ active: activeId === 'skill-roadmap' }" @click="closeSidebar"><Icon class="ti" name="tabler:map-2" />11. スキルロードマップ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon class="ti" name="tabler:link" />12. 参考文献・情報源</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon class="ti" name="tabler:route" />エンジニアリング・マネジメント キャリアガイド</div>
        <h1>エンジニアのためのマネジメントキャリアパス</h1>
        <p class="hero-lede">
          「そろそろマネージャーにならないか」——多くのソフトウェアエンジニアはキャリアのどこかでこの問いに向き合います。本ガイドは、Camille Fournier著『The Manager's Path』を軸に、国際的に著名なエンジニアリングリーダーの知見を参照しながら、マネジメントキャリアの全体像から日々の実務までをステップ・バイ・ステップで解説する初学者向けガイドです。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">6段階</div><div class="stat-label">マネジメントキャリアの主要ステージ</div></div>
          <div class="stat-card"><div class="stat-number">90日</div><div class="stat-label">新任マネージャーの適応ロードマップ</div></div>
          <div class="stat-card"><div class="stat-number">10項目</div><div class="stat-label">Project Oxygenが示す優れたマネージャーの行動特性</div></div>
          <div class="stat-card"><div class="stat-number">10+</div><div class="stat-label">参照した国際的な情報源</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon class="ti" name="tabler:info-circle" />
          最終更新: 2026年8月14日。本ガイドは Camille Fournier著<a href="https://www.oreilly.com/library/view/the-managers-path/9781491973882/" target="_blank" rel="noopener">『The Manager's Path』(O'Reilly)</a>を軸に、Will Larson・Charity Majors・Julie Zhuo・Gergely Orosz・Lara Hoganなど国際的に著名なエンジニアリングリーダーの発信内容を参照して作成した教育・学習支援目的の非公式解説記事です。各出典のURLは「参考文献・情報源」セクションにまとめています。
        </div>
      </div>

      <!-- ===================== 1. Introduction ===================== -->
      <section id="introduction">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:rocket" />SECTION 01</div>
        <h2>はじめに</h2>

        <p>「そろそろマネージャーにならないか」——多くのソフトウェアエンジニアは、キャリアのどこかでこの問いに向き合うことになります。しかし、エンジニアリング組織におけるマネジメントは、営業やマーケティングのマネジメントとは性質が異なります。エンジニアリング・マネージャー(EM)は技術的な意思決定にも一定の責任を持ちながら、同時に「人」というプログラミング言語のドキュメントが存在しない対象をマネジメントしなければなりません。</p>

        <p>『The Manager's Path』の著者であり、Rent the RunwayのCTOやTwo Sigmaのプラットフォームエンジニアリング責任者を歴任した Camille Fournier は、テック業界のマネジメントを「学習曲線が非常に厳しい」領域だと表現しています。参考にできる体系だったガイドが少ないまま、多くのエンジニアが手探りでマネージャーになっているのが実情です。</p>

        <p>本ガイドは、そうした手探りを減らすために、以下の内容をステップ・バイ・ステップで解説します。</p>

        <ul>
          <li>マネジメントキャリアの全体像(どんな役職があり、どうつながっているか)</li>
          <li>「自分はマネージャー向きか」を考えるための判断材料</li>
          <li>新任マネージャーが最初の90日で何をすべきか</li>
          <li>日々のマネジメント実務(1on1・委任・評価・採用)の基本</li>
          <li>よくある失敗パターン</li>
        </ul>

        <p>対象読者は、マネジメントへの転身をこれから考える中堅エンジニア、または就任して間もない新任EMです。</p>
      </section>

      <!-- ===================== 2. Career Path Overview ===================== -->
      <section id="career-path-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:git-branch" />SECTION 02</div>
        <h2>マネジメントキャリアの全体像(デュアルキャリアラダー)</h2>

        <p>現代の多くのテック企業では、キャリアパスが「個人貢献者(Individual Contributor, IC)トラック」と「マネジメントトラック」の2本立てで設計されています。これを<strong>デュアルキャリアラダー(dual career ladder)</strong>と呼びます。</p>

        <p>重要な前提として、<strong>マネジメントは「昇進の上位互換」ではありません</strong>。ICトラックの上位職(スタッフエンジニア、プリンシパルエンジニアなど)は、マネジメントトラックの管理職と並行した、対等な格付けとして設計されている企業がほとんどです。実際、2020年代以降は Staff / Principal クラスの IC が、同格の管理職(マネージャーやディレクター)と同等かそれ以上の報酬を得るケースも一般的になっています。</p>

        <p>Will Larson(『Staff Engineer: Leadership Beyond the Management Track』著者、Calm 元CTO)が指摘するように、マネジメント側のキャリアラダーは書籍やフレームワークが充実してきた一方、技術で上を目指す「Staff+」の道筋は長らく言語化されにくい領域でした。近年はその両方が体系化されつつあります。</p>

        <h3 id="subheading-2-1">2.1 全体のキャリアフロー図</h3>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CAREER_LADDER" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">ICトラックとマネジメントトラックのデュアルキャリアラダー</div>
        </div>

        <h3 id="subheading-2-2">2.2 ICトラックとマネジメントトラックの対応関係(目安)</h3>

        <p>企業によって呼称や境界は異なりますが、経験則としておおむね次のような対応関係になることが多いとされています。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>レベル感</th><th>ICトラック</th><th>マネジメントトラック</th><th>主な評価軸</th></tr>
            </thead>
            <tbody>
              <tr><td>中堅</td><td>シニアエンジニア</td><td>テックリード</td><td>個人の技術的アウトプット / 小規模チームの技術的方向づけ</td></tr>
              <tr><td>上級(1)</td><td>スタッフエンジニア</td><td>エンジニアリングマネージャー(EM)</td><td>複数チームに影響する技術判断 / 1チームの人材育成と実行</td></tr>
              <tr><td>上級(2)</td><td>シニアスタッフ / プリンシパルエンジニア</td><td>シニアEM・マネージャーオブマネージャーズ</td><td>組織横断の技術戦略 / 複数チーム・複数マネージャーの統括</td></tr>
              <tr><td>上級(3)</td><td>ディスティングイッシュトエンジニア</td><td>ディレクター</td><td>全社レベルの技術方針への関与 / 部門の予算・ロードマップ責任</td></tr>
              <tr><td>エグゼクティブ</td><td>フェロー</td><td>VPオブエンジニアリング / CTO</td><td>業界レベルの技術貢献 / 全社の技術組織戦略</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:info-circle" />補足</div>
          <p>「スタッフエンジニアはマネージャーと同格」「プリンシパルエンジニアはディレクターと同格」という対応づけは業界で広く語られる目安であり、絶対的な基準ではありません。企業ごとのレベリング定義(career ladder)を必ず確認してください。</p>
        </div>
      </section>

      <!-- ===================== 3. Role Descriptions ===================== -->
      <section id="role-descriptions">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:users" />SECTION 03</div>
        <h2>各役職の詳細解説</h2>

        <h3 id="subheading-3-1">3.1 テックリード(Tech Lead)</h3>

        <p>テックリードは、多くの場合「マネジメントの入り口」ではなく「技術とマネジメントの中間地点」に位置する役割です。Fournier は著書の中で、テックリードの役割を大きく4つに整理しています。</p>

        <ul>
          <li><strong>アーキテクチャの理解:</strong> チームが担当するシステムの全体構造を把握し、技術的な一貫性を保つ</li>
          <li><strong>チームプレイヤーであること:</strong> 自分だけが動くのではなく、チームの生産性を最大化する動き方をする</li>
          <li><strong>技術的意思決定をリードすること:</strong> 設計レビューやトレードオフの判断を主導する</li>
          <li><strong>コミュニケーション:</strong> プロジェクトの状況を、エンジニア以外の関係者にもわかる言葉で伝える</li>
        </ul>

        <p>テックリードは「コードを書く時間」と「プロジェクトをマネジメントする時間」の両方を担う、いわばハイブリッドな役職です。Charity Majors(Honeycomb共同創業者・CTO)は、この二重の役割について「技術は簡単な部分で、人間を導くことのほうが難しい」と表現しており、テックリードの仕事の多くは実際には管理業務であると指摘しています。</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:info-circle" />重要な示唆</div>
          <p>テックリードの経験は、「自分はマネジメントに向いているか」を低リスクで試すための、事実上の適性検査として機能します。</p>
        </div>

        <h3 id="subheading-3-2">3.2 エンジニアリングマネージャー(EM)</h3>

        <p>EM は通常、1つのチーム(5〜10名程度)に対して、次の責任を持ちます。</p>

        <ul>
          <li>採用・オンボーディング・評価などの人事プロセス</li>
          <li>定期的な1on1によるメンバーの育成とキャリア支援</li>
          <li>チームの実行力(デリバリー)の管理</li>
          <li>プロダクトマネージャーなど他職種との連携</li>
          <li>チームの技術的な健全性(技術的負債、開発プロセスなど)の監督</li>
        </ul>

        <p>Julie Zhuo(元Facebook VP of Product Design、『The Making of a Manager』著者)は、マネージャーの仕事の本質を「自分ひとりの成果ではなく、チーム全体の望ましい成果を、人々を鼓舞し協調させることで実現すること」と定義しています。コードを書く量は大きく減り、コミュニケーションと意思決定に時間の大半を使うようになります。</p>

        <h3 id="subheading-3-3">3.3 シニアEM / マネージャーオブマネージャーズ</h3>

        <p>チームが複数に増えると、EMは「マネージャーを管理するマネージャー」になります。Fournier はこの段階を「Managing Multiple Teams」「Managing Managers」として整理しており、求められるスキルが質的に変わることを強調しています。</p>

        <ul>
          <li>自分の時間配分そのものをマネジメントする必要が生じる(何に自分の時間を使うべきかの取捨選択)</li>
          <li>部下であるマネージャーたちの育成・評価を行う(スキップレベル1on1の実施を含む)</li>
          <li>複数チーム間の優先順位づけや、リソース配分の調整</li>
          <li>技術との距離が広がるため、「技術的な関連性」を保つための意識的な工夫が必要になる</li>
        </ul>

        <h3 id="subheading-3-4">3.4 ディレクター</h3>

        <p>ディレクターは、複数のチーム群(プロダクトライン単位や部門単位)を統括し、より長期的な技術戦略・組織戦略に関与します。Fournier はこの段階から「組織の機能不全をデバッグする」スキル——データを確認し、チームを観察し、仮説を立てて検証する——が本格的に必要になるとしています。</p>

        <h3 id="subheading-3-5">3.5 VPオブエンジニアリング / CTO</h3>

        <p>エンジニアリング組織全体、あるいは会社全体の技術戦略に責任を持つ、いわゆる「ビッグリーグ」の役職です。Fournier は VP of Engineering と CTO の違いについて、前者が「社内向けの実行責任者」であるのに対し、後者は「対外的な技術の顔」としての側面が強くなる傾向があると整理しています(ただし企業ごとに定義は大きく異なります)。この段階では、技術戦略の立案、経営陣・取締役会とのコミュニケーション、組織文化の醸成が主要な仕事になります。</p>
      </section>

      <!-- ===================== 4. Self Assessment ===================== -->
      <section id="self-assessment">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:list-check" />SECTION 04</div>
        <h2>自分はマネジメントに向いているか(判断チェックリスト)</h2>

        <p>マネジメントは「優秀なエンジニアへのご褒美」ではありません。Gergely Orosz(The Pragmatic Engineer、元Uber / Microsoft / Skype)は、マネージャーへの転身直後について、最初は輪の外に置かれたような<strong>孤独感</strong>を伴う経験になりやすいと述べています。前日まで同僚だったチームメンバーとの間に見えない壁ができ、気軽に本音を話せる「本当のチーム」を新たに見つけ直す必要が生じる、という変化です。</p>

        <p>以下の問いを、自分自身に率直に投げかけてみてください。</p>

        <ul>
          <li>コードを書く時間が大きく減っても(多くの場合ゼロに近づいても)納得できるか</li>
          <li>自分の成果ではなく「他人の成果」で評価されることに前向きになれるか</li>
          <li>1日の大半を会議と1on1で過ごすことに、意義を感じられるか</li>
          <li>曖昧で答えのない「人の問題」(対立、モチベーション低下、パフォーマンス不振など)に、興味を持って向き合えるか</li>
          <li>自分の時間を他者に「所有」されること(頻繁な割り込み、突発的な相談)を許容できるか</li>
        </ul>

        <p>Camille Fournier は、マネージャーを目指す前に「想像上のシニアIC生活」と「想像上のマネージャー生活」を比較するのではなく、それぞれの<strong>現実の生活</strong>を具体的にイメージすることを勧めています。マネジメントは技術力の証明ではなく、まったく別のキャリアの選択だと捉えることが、最初の判断における最重要ポイントです。</p>
      </section>

      <!-- ===================== 5. Tech Lead Preparation ===================== -->
      <section id="tech-lead-preparation">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:stairs" />SECTION 05</div>
        <h2>マネージャーになる前の準備: テックリードという助走路</h2>

        <p>いきなりEMになるのではなく、テックリードやプロジェクトの技術的な取りまとめ役を経験することで、マネジメントの一部を疑似体験できます。準備段階として取り組みやすいのは次のようなアクションです。</p>

        <ul>
          <li>後輩やインターンの<strong>メンタリング</strong>を積極的に引き受ける(Fournier はメンタリングを「マネジメントの入り口」として重視しています)</li>
          <li>小規模なプロジェクトのタスク分解・進行管理を担当する</li>
          <li>コードレビューやアーキテクチャレビューの場で、技術的な意思決定を主導する</li>
          <li>自分の直属の上司に「マネジメントに関心がある」と明示的に伝え、フィードバックをもらう</li>
          <li>採用面接官として、候補者評価のプロセスに関わってみる</li>
        </ul>

        <p>これらは、正式にマネージャーへ昇進する前に「管理の感触」を確かめるための、リスクの低い実験です。</p>
      </section>

      <!-- ===================== 6. First 90 Days ===================== -->
      <section id="first-90-days">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:calendar-event" />SECTION 06</div>
        <h2>新任マネージャーの最初の90日</h2>

        <p>Julie Zhuo は著書の中で、新任マネージャーの最初の3か月を重要な適応期間として詳しく扱っています。以下は、その考え方と一般的なベストプラクティスを踏まえた、90日間のロードマップです。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FIRST_90_DAYS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">新任マネージャーが最初の90日で踏む5つのフェーズ</div>
        </div>

        <ol class="step-list">
          <li>
            <div class="step-num" data-testid="step-tag">1</div>
            <div class="step-body">
              <div class="step-title">1週目: 傾聴(信頼関係の土台を作る)</div>
              <div class="step-desc">全メンバーと初回1on1を実施し、期待値とスタイルをすり合わせる。</div>
            </div>
          </li>
          <li>
            <div class="step-num" data-testid="step-tag">2</div>
            <div class="step-body">
              <div class="step-title">2〜4週目: シグナル収集(チームの現状を客観的に把握する)</div>
              <div class="step-desc">コードベース・障害対応履歴・過去のプロセスを確認し、人だけでなく「システムからも」情報を集める。</div>
            </div>
          </li>
          <li>
            <div class="step-num" data-testid="step-tag">3</div>
            <div class="step-body">
              <div class="step-title">30日目: 計画(方向性の合意形成)</div>
              <div class="step-desc">30/60/90日プランを文書化し、チーム・上司と共有する。</div>
            </div>
          </li>
          <li>
            <div class="step-num" data-testid="step-tag">4</div>
            <div class="step-body">
              <div class="step-title">60日目: 信頼構築(小さな実績を積む)</div>
              <div class="step-desc">明確で達成可能な改善(例: レビュー待ち時間の短縮)を1つ実行する。</div>
            </div>
          </li>
          <li>
            <div class="step-num" data-testid="step-tag">5</div>
            <div class="step-body">
              <div class="step-title">90日目: 定着(自分のスタイルを確立する)</div>
              <div class="step-desc">定期的な1on1・フィードバックのリズムを固定化する。</div>
            </div>
          </li>
        </ol>

        <p>Fournier も同様に、新しい報告関係の立ち上げにおいて「信頼とラポールの構築」「30/60/90日プランの作成」「新しいメンバー向けドキュメントの整備」を初期の重要タスクとして挙げています。</p>
      </section>

      <!-- ===================== 7. Core Practices ===================== -->
      <section id="core-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:tools" />SECTION 07</div>
        <h2>マネージャーのコアプラクティス</h2>

        <h3 id="subheading-7-1">7.1 1on1ミーティング</h3>

        <p>1on1は、EMの最も基本的かつ重要な習慣です。Fournier は1on1を「マネージャーの仕事の中で最も重要な単一の習慣」と位置づけ、頻度・進め方を状況に応じて調整することを勧めています。</p>

        <ul>
          <li><strong>頻度の目安:</strong> 週次〜隔週。新任メンバーや不安定な状況では頻度を上げる</li>
          <li><strong>主導権:</strong> 基本的にはメンバー側にアジェンダの主導権を持たせる(マネージャーの進捗確認の場にしない)</li>
          <li><strong>記録:</strong> 話した内容・アクションアイテムを継続的にメモし、次回に引き継ぐ</li>
          <li><strong>バリエーション:</strong> ToDo確認型、雑談型(キャッチアップ)、フィードバック集中型など、目的に応じて型を使い分ける</li>
        </ul>

        <h3 id="subheading-7-2">7.2 委任(デリゲーション)</h3>

        <p>Fournier は、タスクを「頻度」と「複雑さ」の2軸で捉え、委任の判断基準とすることを提案しています。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th /><th>頻度が低い</th><th>頻度が高い</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>複雑さが低い</strong></td><td>自分でやる(都度対応で十分)</td><td>部下に委任する(ルーティン化して育成につなげる)</td></tr>
              <tr><td><strong>複雑さが高い</strong></td><td>台頭してきたリーダーの育成機会として使う</td><td>部下に委任し、継続的な成長の場として活用する</td></tr>
            </tbody>
          </table>
        </div>

        <p>マネージャーが陥りやすい失敗の1つが<strong>マイクロマネジメント</strong>です。Fournier はこれを「Good Manager, Bad Manager」という対比の中で、マイクロマネージャーとデリゲーター(委任者)という2つの極端な例として描いています。委任を成功させる鍵は、「チームの目標に照らして、どの詳細に自分が踏み込むべきかを見極める」ことです。</p>

        <h3 id="subheading-7-3">7.3 フィードバックと評価</h3>

        <ul>
          <li>継続的なフィードバック文化を作り、評価面談を「サプライズの場」にしない</li>
          <li>ポジティブ・ネガティブ両方のフィードバックを、具体的な事実に基づいて伝える</li>
          <li>パフォーマンスレビューは「書く」段階と「伝える」段階の両方に丁寧さが必要</li>
          <li>低パフォーマンスへの対応(Fournier の言う"Challenging Situations: Firing Underperformers")は避けて通れない、マネジメントの中でも特に難易度の高い仕事の1つ</li>
        </ul>

        <h3 id="subheading-7-4">7.4 採用</h3>

        <p>Zhuo は、採用を「一度の意思決定が何年にもわたってチームと会社に影響を与える」重要な仕事だと位置づけています。</p>

        <ul>
          <li>求人票は採用担当任せにせず、マネージャー自身が「理想の候補者像」を言語化して関わる</li>
          <li>多様なバックグラウンドの候補者を意識的に評価プロセスに含める</li>
          <li>リーダー層の採用ほど、時間をかけた見極めが必要</li>
        </ul>
      </section>

      <!-- ===================== 8. Project Oxygen ===================== -->
      <section id="project-oxygen">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:star" />SECTION 08</div>
        <h2>優れたマネージャーの共通点(Google Project Oxygen)</h2>

        <p>Google の人事研究プロジェクト「Project Oxygen」は、社内の大量の人事データ・従業員調査・インタビューを分析し、優れたマネージャーに共通する行動特性を特定した、業界でも広く参照される研究です。Google re:Work が公開している最新版では、当初8項目だったリストが拡張され、現在は次のような行動が重視されています。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>行動特性</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>良いコーチであること(答えを与えるのではなく、考える力を引き出す)</td></tr>
              <tr><td>2</td><td>チームに権限を委譲し、マイクロマネジメントをしない</td></tr>
              <tr><td>3</td><td>チームメンバーの成功や個人としての幸福に関心を示す</td></tr>
              <tr><td>4</td><td>生産的・結果志向である</td></tr>
              <tr><td>5</td><td>優れたコミュニケーターである(聞く力と伝える力の両方)</td></tr>
              <tr><td>6</td><td>メンバーのキャリア開発を支援する</td></tr>
              <tr><td>7</td><td>チームに対する明確なビジョン・戦略を持つ</td></tr>
              <tr><td>8</td><td>チームにアドバイスできる重要な技術的スキルを持つ</td></tr>
              <tr><td>9</td><td>Google全体で協力すること</td></tr>
              <tr><td>10</td><td>強い意思決定者であること</td></tr>
            </tbody>
          </table>
        </div>

        <p>興味深いことに、この研究では「技術的スキル」の重要度は他の対人的な行動特性に比べて相対的に低い結果となりました。これは「優れたエンジニアが自動的に優れたマネージャーになるわけではない」という、業界で繰り返し語られる教訓と一致します。</p>
      </section>

      <!-- ===================== 9. Common Pitfalls ===================== -->
      <section id="common-pitfalls">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:alert-triangle" />SECTION 09</div>
        <h2>よくある失敗と対処法</h2>

        <p>新任マネージャーが陥りやすい失敗パターンと、その対処法を整理します。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>失敗パターン</th><th>症状</th><th>対処法</th></tr>
            </thead>
            <tbody>
              <tr><td>マイクロマネジメント</td><td>部下の作業に細かく口を出しすぎ、信頼を損なう</td><td>「頻度×複雑さ」の委任マトリクスを使い、任せる基準を明文化する</td></tr>
              <tr><td>技術から離れすぎる</td><td>チームの技術的な意思決定に口を出せなくなる</td><td>コードレビューへの参加、アーキテクチャレビューへの出席など、意図的に技術との接点を残す</td></tr>
              <tr><td>逆に技術に固執しすぎる</td><td>マネジメント本来の仕事(人・プロセス)が疎かになる</td><td>「管理者の仕事は管理をうまくやることだ」と自覚し、コーディングへの逃避を意識的に避ける</td></tr>
              <tr><td>コンフリクト回避</td><td>チーム内の対立を放置し、問題が悪化する</td><td>Fournier の言う「コンフリクト・テイマー」を目指し、早期かつ直接的に対話する</td></tr>
              <tr><td>孤独感を放置する</td><td>相談相手がおらず、孤立して燃え尽きる</td><td>他部門のマネージャー仲間、メンター、自分の上司との定期的な対話の場を作る</td></tr>
              <tr><td>フィードバックの先送り</td><td>評価面談まで問題点を伝えない</td><td>継続的フィードバックの文化を作り、驚きのない評価にする</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 10. Engineer/Manager Pendulum ===================== -->
      <section id="engineer-manager-pendulum">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:arrows-shuffle" />SECTION 10</div>
        <h2>ICとマネジメントを行き来する「振り子」というキャリア戦略</h2>

        <p>マネジメントは「一度就いたら戻れない一方通行の道」ではありません。Charity Majors は、有名なブログ記事「The Engineer/Manager Pendulum」の中で、優れたエンジニアリングリーダーの多くが、ICとマネジメントの間を<strong>意図的に行き来する</strong>キャリアを歩んでいると論じています。</p>

        <p>彼女の主張の要点は次の通りです。</p>

        <ul>
          <li>技術力とマネジメント力は、どちらも「同時に伸ばすことが難しい」性質を持つ。マネジメントは割り込みの多い仕事であり、深い技術的学習には逆に、割り込みを遮断できる集中時間が必要になる</li>
          <li>優れたマネージャーの多くは、開発者としての実務経験を持っている。逆に、優れた開発者の多くはマネジメント経験を持っている</li>
          <li>どちらか一方に長く留まりすぎると、もう一方のスキルが徐々に陳腐化していく。だからこそ、キャリアの中で意図的に「揺り戻す」ことに価値がある</li>
        </ul>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PENDULUM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Charity Majorsが提唱する「エンジニア・マネージャーの振り子」</div>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:info-circle" />補足</div>
          <p>一方で、Will Larson は「技術トラックから離れるタイミングは、そのトラックでやりたいことをやり切ってからにすべきだ」とも述べており、キャリアが深くなるほど、トラックを切り替えるコストも高くなる点には注意が必要です。振り子戦略は万能薬ではなく、自分自身のキャリアステージに応じて判断すべき選択肢の1つとして理解してください。</p>
        </div>
      </section>

      <!-- ===================== 11. Skill Roadmap ===================== -->
      <section id="skill-roadmap">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:map-2" />SECTION 11</div>
        <h2>スキルロードマップまとめ表</h2>

        <p>最後に、マネジメントトラックの各段階で重視されるスキルを一覧化します。初学者は、まず「テックリード」と「EM」の行の内容を意識することから始めてください。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>段階</th><th>コアスキル</th><th>主な情報源</th></tr>
            </thead>
            <tbody>
              <tr><td>テックリード</td><td>アーキテクチャ理解、技術的意思決定、チームプレイ、コミュニケーション</td><td>Fournier『The Manager's Path』第3章</td></tr>
              <tr><td>エンジニアリングマネージャー</td><td>1on1、委任、フィードバック文化、採用、パフォーマンスレビュー</td><td>Fournier 第4章、Zhuo『The Making of a Manager』</td></tr>
              <tr><td>マネージャーを管理するマネージャー</td><td>時間配分の管理、マネージャー育成、複数チームの優先順位づけ</td><td>Fournier 第6・7章</td></tr>
              <tr><td>ディレクター</td><td>組織の機能不全のデバッグ、ロードマップの不確実性への対応、技術的関連性の維持</td><td>Fournier 第7章</td></tr>
              <tr><td>VP / CTO</td><td>技術戦略の立案、経営層とのコミュニケーション、組織文化の醸成</td><td>Fournier 第8・9章</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 12. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:link" />SECTION 12</div>
        <h2>参考文献・情報源</h2>

        <p>本ガイドの作成にあたり、以下の情報源を参照しました(2026年8月14日時点でアクセス可能なものを確認しています)。いずれも国際的に広く読まれているエンジニアリングリーダーシップの著者・実務家による発信です。本ガイドは上記情報源の内容を要約・再構成したものであり、各書籍・記事からの逐語的な引用は最小限に留めています。より詳しい内容を知りたい場合は、必ず一次情報源(原著書籍・原文記事)を直接ご参照ください。</p>

        <div class="ref-group">
          <h3 id="subheading-ref-books">書籍</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Camille Fournier, The Manager's Path (O'Reilly Media)</span><a class="ref-url" href="https://www.oreilly.com/library/view/the-managers-path/9781491973882/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/the-managers-path/9781491973882/</a></li>
            <li><span class="ref-name">Julie Zhuo, The Making of a Manager 公式ページ</span><a class="ref-url" href="https://www.juliezhuo.com/book/manager.html" target="_blank" rel="noopener">https://www.juliezhuo.com/book/manager.html</a></li>
            <li><span class="ref-name">Will Larson ほか, Staff Engineer: Leadership Beyond the Management Track 関連情報</span><a class="ref-url" href="https://www.amazon.com/Staff-Engineer-Leadership-beyond-management/dp/1736417916" target="_blank" rel="noopener">https://www.amazon.com/Staff-Engineer-Leadership-beyond-management/dp/1736417916</a></li>
            <li><span class="ref-name">Lara Hogan, Resilient Management 公式サイト</span><a class="ref-url" href="https://resilient-management.com/" target="_blank" rel="noopener">https://resilient-management.com/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3 id="subheading-ref-blogs">ブログ・記事</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Camille Fournier, ブログ「Elided Branches」</span><a class="ref-url" href="https://skamille.spicytakes.org/" target="_blank" rel="noopener">https://skamille.spicytakes.org/</a></li>
            <li><span class="ref-name">Will Larson, "Path to engineering manager of managers" (Irrational Exuberance / lethain.com)</span><a class="ref-url" href="https://lethain.com/path-to-eng-manager-of-managers/" target="_blank" rel="noopener">https://lethain.com/path-to-eng-manager-of-managers/</a></li>
            <li><span class="ref-name">Charity Majors, "The Engineer/Manager Pendulum"</span><a class="ref-url" href="https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/" target="_blank" rel="noopener">https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/</a></li>
            <li><span class="ref-name">Gergely Orosz, "What Becoming an Engineering Manager Feels Like" (The Pragmatic Engineer)</span><a class="ref-url" href="https://blog.pragmaticengineer.com/what-becoming-an-engineering-manager-is-like/" target="_blank" rel="noopener">https://blog.pragmaticengineer.com/what-becoming-an-engineering-manager-is-like/</a></li>
            <li><span class="ref-name">Gergely Orosz, "Staying technical as an engineering manager" (The Pragmatic Engineer Newsletter)</span><a class="ref-url" href="https://newsletter.pragmaticengineer.com/p/staying-technical" target="_blank" rel="noopener">https://newsletter.pragmaticengineer.com/p/staying-technical</a></li>
            <li><span class="ref-name">Lara Hogan, ブログ「Management」カテゴリ</span><a class="ref-url" href="https://larahogan.me/management/" target="_blank" rel="noopener">https://larahogan.me/management/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3 id="subheading-ref-reports">企業・調査レポート</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Google re:Work, "Following the data: The research behind great managers" (Project Oxygen)</span><a class="ref-url" href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener">https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3 id="subheading-ref-others">その他リソース</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Gergely Orosz / Tanya Reilly, The Software Engineer's Guidebook</span><a class="ref-url" href="https://www.engguidebook.com/" target="_blank" rel="noopener">https://www.engguidebook.com/</a></li>
            <li><span class="ref-name">Nicolas Dupont, "30+ Engineering Career Ladders"(複数企業のキャリアラダー事例集)</span><a class="ref-url" href="https://www.nidup.io/garden/engineering-career-ladders/" target="_blank" rel="noopener">https://www.nidup.io/garden/engineering-career-ladders/</a></li>
          </ul>
        </div>
      </section>

      <footer>
        本ガイドは教育・学習支援を目的とした非公式の解説記事です。内容は執筆時点の情報に基づいており、各社・各著者の見解を正確に反映するよう努めていますが、詳細は必ず一次情報源をご確認ください。最終更新: 2026年8月14日。
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
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
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

.sidebar-nav a .ti { font-size: 17px; color: var(--color-ink-faint); flex: none; }

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

.sidebar-nav a.active .ti { color: var(--color-indigo); }

.sidebar-toggle {
  display: none;
  position: fixed;
  top: 16px;
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

.hero-eyebrow .ti { font-size: 17px; }

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

section {
  margin: 72px 0;
  scroll-margin-top: 32px;
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

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 20px 0;
  text-align: center;
}

.mermaid-wrap {
  margin: 0;
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
.ref-group h3 { margin-top: 0; font-size: 17px; font-weight: 600; }
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
    pointer-events: none;
    transition: transform 0.2s ease, visibility 0s linear 0.2s;
    box-shadow: none;
  }
  .sidebar.open {
    transform: translateX(0);
    visibility: visible;
    pointer-events: auto;
    transition-delay: 0s;
  }
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
