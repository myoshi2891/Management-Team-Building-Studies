<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "introduction",
  "roadmap",
  "foundations",
  "phase0-prep",
  "phase1-first-10-days",
  "phase2-cohesion",
  "phase3-agenda",
  "one-on-ones",
  "psychological-safety",
  "ai-thought-partner",
  "common-mistakes",
  "checklist",
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
  title: "リーダーとしての最初の60日間 完全ガイド | エンジニアリングリーダーのための実践ステップ",
  description: "新任エンジニアリングリーダーのための、就任前準備から60日目までの実践ステップバイステップガイド。STARSモデル、1on1、心理的安全性などを解説。",
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

const DIAGRAM_ROADMAP_OVERVIEW = `flowchart TB
Start["リーダー就任が決定"] --> H0["フェーズ0 就任前の準備 Day -14〜0"]
H0 --> P0A["現状把握のための情報収集"]
P0A --> P0B["前任者・上司との対話"]
P0B --> P0C["初日メッセージの準備"]
P0C --> H1["フェーズ1 最初の10日間"]
H1 --> P1A["チーム全員との1on1"]
P1A --> P1B["上司との期待値のすり合わせ"]
P1B --> P1C["主要ステークホルダーとの対話"]
P1C --> H2["フェーズ2 11日目〜30日目"]
H2 --> P2A["チーム全体の現状診断"]
P2A --> P2B["共通の目的・価値観の言語化"]
P2B --> P2C["初期の改善アクション着手"]
P2C --> H3["フェーズ3 31日目〜60日目"]
H3 --> P3A["中長期の優先事項を確定"]
P3A --> P3B["早期の成果を可視化"]
P3B --> P3C["60日振り返りと次の90日計画"]
P3C --> End["継続的なリーダーシップへ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Start,P0A,P0B,P0C,P1A,P1B,P1C,P2A,P2B,P2C,P3A,P3B,P3C box;
class H0,H1,H2,H3 hub;
class End done;`;

const DIAGRAM_PREP_TIMELINE = `flowchart TB
A["現職の引き継ぎ計画を立てる"] --> B["組織図・チーム構成を調べる"]
B --> C["直近の成果物・ドキュメントに目を通す"]
C --> D["前任者・現上司と1対1で対話する"]
D --> E["初日に伝えるメッセージを準備する"]
E --> F["Day 0 正式に就任"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F done;`;

const DIAGRAM_FIRST_TEN_DAYS = `flowchart TB
A["Day 1 顔合わせと就任メッセージの発信"] --> B["上司との期待値のすり合わせ"]
B --> C["チームメンバー全員との1on1を開始"]
C --> D["主要ステークホルダーとの対話"]
D --> E["チームの共通の利害・課題を発見する"]
E --> F["初期の合意事項を言語化して共有する"]
F --> G["Day 10 最初の振り返り"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class B,C,D,E,F box;
class A hub;
class G done;`;

const DIAGRAM_DAY31_TO_60_FLOW = `flowchart TB
A["優先事項を3〜5個に絞る"] --> B["各優先事項にオーナーと期限を設定"]
B --> C["クイックウィンを1つ以上実行"]
C --> D["進捗を上司・チームに可視化"]
D --> E["60日振り返りミーティングを実施"]
E --> F["次の90日計画を策定"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class B,C,D,E box;
class A hub;
class F done;`;
</script>

<template>
  <div class="layout">
    <button
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
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">最初の60日間 完全ガイド</div>
          <div class="brand-subtitle">エンジニアリングリーダーのための実践ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a href="#introduction" :class="{ active: activeId === 'introduction' }" @click="closeSidebar"><Icon name="tabler:target" />はじめに</a></li>
        <li><a href="#roadmap" :class="{ active: activeId === 'roadmap' }" @click="closeSidebar"><Icon name="tabler:route" />全体像:60日間のロードマップ</a></li>
        <li><a href="#foundations" :class="{ active: activeId === 'foundations' }" @click="closeSidebar"><Icon name="tabler:building-bank" />土台となる考え方</a></li>
        <li><a href="#phase0-prep" :class="{ active: activeId === 'phase0-prep' }" @click="closeSidebar"><Icon name="tabler:calendar-event" />フェーズ0:就任前の準備</a></li>
        <li><a href="#phase1-first-10-days" :class="{ active: activeId === 'phase1-first-10-days' }" @click="closeSidebar"><Icon name="tabler:users" />フェーズ1:最初の10日間</a></li>
        <li><a href="#phase2-cohesion" :class="{ active: activeId === 'phase2-cohesion' }" @click="closeSidebar"><Icon name="tabler:adjustments" />フェーズ2:11日目〜30日目</a></li>
        <li><a href="#phase3-agenda" :class="{ active: activeId === 'phase3-agenda' }" @click="closeSidebar"><Icon name="tabler:rocket" />フェーズ3:31日目〜60日目</a></li>
        <li><a href="#one-on-ones" :class="{ active: activeId === 'one-on-ones' }" @click="closeSidebar"><Icon name="tabler:message-circle" />1on1のベストプラクティス</a></li>
        <li><a href="#psychological-safety" :class="{ active: activeId === 'psychological-safety' }" @click="closeSidebar"><Icon name="tabler:shield-check" />心理的安全性</a></li>
        <li><a href="#ai-thought-partner" :class="{ active: activeId === 'ai-thought-partner' }" @click="closeSidebar"><Icon name="tabler:robot" />AIを思考パートナーに</a></li>
        <li><a href="#common-mistakes" :class="{ active: activeId === 'common-mistakes' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" />よくある失敗と回避策</a></li>
        <li><a href="#checklist" :class="{ active: activeId === 'checklist' }" @click="closeSidebar"><Icon name="tabler:list-check" />60日間チェックリスト</a></li>
        <li><a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar"><Icon name="tabler:flag-3" />まとめ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" />参考文献・出典</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" />LEADERSHIP TRANSITION GUIDE</div>
        <h1>リーダーとしての最初の60日間</h1>
        <p class="hero-lede">
          エンジニアリングチームのリーダー(テックリード・エンジニアリングマネージャー・スクラムマスターなど)に初めて就任する人のための実践ガイドです。世界的に評価の高いリーダーシップ論と、著名なエンジニアリングリーダーたちの実体験に基づくベストプラクティスを、ステップバイステップで解説します。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">60日間</div><div class="stat-label">新任リーダーの重要な移行期間</div></div>
          <div class="stat-card"><div class="stat-number">4フェーズ</div><div class="stat-label">就任前準備からDay60までの構成</div></div>
          <div class="stat-card"><div class="stat-number">5つの対話</div><div class="stat-label">上司との期待値すり合わせフレームワーク</div></div>
          <div class="stat-card"><div class="stat-number">12件</div><div class="stat-label">国際的なリーダーシップ情報源</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          本ガイドは、公開されている書籍情報や記事、研究成果をもとにまとめた教育目的の非公式解説資料です。<a href="https://www.oreilly.com/library/view/your-first-60/0642572367008/" target="_blank" rel="noopener">Eric J. McNulty著『Your First 60 Days as a Leader』(O'Reilly)</a>の概要ページを参考にしていますが、会員限定の本文は含んでいません。詳細は参考文献・出典の各リンク先をご確認ください。
        </div>
      </div>

      <!-- ===================== 1. Introduction ===================== -->
      <section id="introduction">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target" />SECTION 01</div>
        <h2>はじめに:なぜ「最初の60日間」が重要なのか</h2>

        <p>エンジニアからテックリードへ、シニアエンジニアからエンジニアリングマネージャーへ ── 個人としての成果を出す立場から、他者を通じて成果を出す立場への移行は、キャリアの中でも最も大きな転換点の一つです。</p>

        <p>Harvard大学の教育者であるEric McNulty氏は、著書<em>Your First 60 Days as a Leader</em>(O'Reilly, 2026年8月刊)の中で、新任リーダーが直面するあらゆるやり取り(上司・チーム・主要ステークホルダーとの対話)を「重要な交渉(critical negotiations)」として捉え、就任前の準備から最初の10日間・30日間・60日間へと段階的に進む「利害に基づく交渉(interest-based negotiation)」のアプローチを提示しています。</p>

        <p>同様に、リーダーシップ移行研究の第一人者であるMichael Watkins氏は、ベストセラー<em>The First 90 Days</em>の中で、「新しい役職に就いてからの数か月間の行動が、その後の成功・失敗を大きく左右する」と述べ、体系的な移行戦略の必要性を説いています。</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
          <p><strong>ポイント</strong>: 最初の60〜90日間は「猶予期間」ではなく「土台工事の期間」です。この期間にチームとの信頼関係・情報・期待値のすり合わせを怠ると、後から取り戻すコストは何倍にも膨れ上がります。</p>
        </div>

        <p>このガイドでは、これらの考え方をエンジニアリングチームの現場(スプリント、コードレビュー、オンコール、技術的負債など)に落とし込み、初学者でも迷わず実践できるステップバイステップの手順として整理します。</p>
      </section>

      <!-- ===================== 2. Roadmap ===================== -->
      <section id="roadmap">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 02</div>
        <h2>全体像:60日間のロードマップ</h2>

        <p>まず全体像を掴みましょう。このロードマップは、<strong>就任前の準備期間(フェーズ0、Day -14〜0)</strong>と<strong>就任後の60日間(フェーズ1〜3、Day 1〜60)</strong>の2部構成です。
        つまり全体としては「就任前14日 + 就任後60日間」を扱います。60日間そのものが4つに分かれるわけではなく、Day 1 より前にフェーズ0の準備期間が置かれている点に注意してください。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ROADMAP_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">就任前の準備(フェーズ0)から60日目(フェーズ3)までの全体ロードマップ</div>
        </div>

        <p>各フェーズの目的を一言でまとめると、次のようになります。</p>

        <div class="table-wrap" tabindex="0" role="region" aria-label="最初の60日間の各フェーズの目的と主な問い">
          <table>
            <thead><tr><th>フェーズ</th><th>期間</th><th>一言でいうと</th><th>主な問い</th></tr></thead>
            <tbody>
              <tr><td>フェーズ0</td><td>就任前(〜Day 0)</td><td>助走をつける</td><td>何を知っておくべきか?</td></tr>
              <tr><td>フェーズ1</td><td>Day 1〜10</td><td>聴く・つながる</td><td>このチーム・組織は何を大事にしているか?</td></tr>
              <tr><td>フェーズ2</td><td>Day 11〜30</td><td>診断し、揃える</td><td>チームの現状と目指す姿のギャップは?</td></tr>
              <tr><td>フェーズ3</td><td>Day 31〜60</td><td>動かし、示す</td><td>何から着手し、何を示すべきか?</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 3. Foundations ===================== -->
      <section id="foundations">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 03</div>
        <h2>土台となる考え方</h2>

        <p>具体的なアクションに入る前に、共通して使われる3つの基礎フレームワークを押さえておきましょう。</p>

        <h3>3-1. リードすることとマネジメントすることの違い</h3>

        <p>新任リーダーがまず理解すべきなのは、「マネジメント(管理)」と「リーダーシップ(先導)」は似て非なるものだという点です。</p>

        <div class="table-wrap" tabindex="0" role="region" aria-label="マネジメントとリーダーシップの違いの比較">
          <table>
            <thead><tr><th>観点</th><th>マネジメント</th><th>リーダーシップ</th></tr></thead>
            <tbody>
              <tr><td>焦点</td><td>既存の仕組みを回す(計画・予算・進捗管理)</td><td>方向性を示し、変化を起こす</td></tr>
              <tr><td>時間軸</td><td>短期〜中期(スプリント、四半期)</td><td>中期〜長期(チームのビジョン)</td></tr>
              <tr><td>典型的な行為</td><td>タスク割り当て、進捗確認、リスク管理</td><td>ビジョンの言語化、動機づけ、信頼構築</td></tr>
              <tr><td>エンジニアリングでの例</td><td>スプリント計画、バグトリアージ</td><td>技術戦略の策定、チーム文化の醸成</td></tr>
            </tbody>
          </table>
        </div>

        <p>新任リーダーの多くは「マネジメントの技術」(1on1のやり方、スプリント運営など)から入りますが、<strong>最初の60日間で「リーダーシップの土台」(信頼・方向性・共通理解)を築けるかどうかが、その後の成否を分けます。</strong></p>

        <h3>3-2. STARSモデルで「自分が置かれた状況」を診断する</h3>

        <p>Michael Watkinsが提唱する<strong>STARSモデル</strong>は、新しい役割で最初に行うべき「状況診断」のためのフレームワークです。自分のチームが今どの状態にあるかを見極めることで、取るべきアプローチが変わります。</p>

        <div class="table-wrap" tabindex="0" role="region" aria-label="STARSモデルの各状況と求められるリーダーの姿勢">
          <table>
            <thead><tr><th>状況</th><th>特徴</th><th>エンジニアリングチームでの例</th><th>求められるリーダーの姿勢</th></tr></thead>
            <tbody>
              <tr><td><strong>S</strong>tart-up(立ち上げ)</td><td>何もないところから作る</td><td>新規プロダクトのチーム組成</td><td>ゼロから仕組みと文化を設計する</td></tr>
              <tr><td><strong>T</strong>urnaround(立て直し)</td><td>深刻な問題を抱えている</td><td>障害多発・納期遅延が続くチーム</td><td>迅速な診断と痛みを伴う意思決定</td></tr>
              <tr><td><strong>A</strong>ccelerated growth(急成長)</td><td>順調だが急拡大中</td><td>ユーザー急増でスケールが必要なチーム</td><td>採用・プロセス整備を並行して進める</td></tr>
              <tr><td><strong>R</strong>ealignment(再調整)</td><td>健全だが方向性がズレている</td><td>技術的には強いが優先順位が噛み合わないチーム</td><td>目的の再言語化とすり合わせ</td></tr>
              <tr><td><strong>S</strong>ustaining success(成功の維持)</td><td>すでに高成果を出している</td><td>安定運用中の成熟したプロダクトチーム</td><td>現状維持に安住せず次の課題を見つける</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
          <p>実務上のコツ: 担当するチームやプロジェクトが必ずしも1つの状況に綺麗に当てはまるとは限りません。「このプロジェクトはTurnaroundだが、あのプロジェクトはSustaining successだ」というように、<strong>担当領域ごとにSTARSを当てはめて優先順位をつける</strong>のが実践的です。</p>
        </div>

        <h3>3-3. 利害に基づく交渉のマインドセット</h3>

        <p>McNulty氏が提示する枠組みの核心は、リーダーとしての対話を「指示を出す/従わせる」関係ではなく、<strong>「共有された利害(shared interests)から出発し、合意された方向性・成果・マイルストーンへ向かう交渉」</strong>として捉え直すことです。</p>

        <p>具体的には、上司・チームメンバー・他部門のステークホルダーそれぞれと対話する際に、次の順序で考えます。</p>

        <ol>
          <li><strong>相手の利害を理解する</strong> ― 相手は何を達成したいのか、何を恐れているのか</li>
          <li><strong>自分の利害を明確にする</strong> ― 自分がこの役割で成し遂げたいことは何か</li>
          <li><strong>共通の土台を見つける</strong> ― 双方にとって価値のある着地点はどこか</li>
          <li><strong>具体的な合意に落とす</strong> ― 方向性・期待される成果・確認のタイミング(マイルストーン)を明文化する</li>
        </ol>

        <p>この考え方は、上司との期待値合わせ(フェーズ1)からチーム全体のビジョン策定(フェーズ2)まで、このガイド全体を貫く基本姿勢です。</p>
      </section>

      <!-- ===================== 4. Phase 0 Prep ===================== -->
      <section id="phase0-prep">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:calendar-event" />SECTION 04</div>
        <h2>フェーズ0:就任前の準備(Day -14〜0)</h2>

        <p>「Start Before You Begin(始める前に始めよ)」という言葉が示すとおり、正式な就任日より前にできる準備は数多くあります。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PREP_TIMELINE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">フェーズ0:就任前準備の流れ</div>
        </div>

        <h3>やるべきこと</h3>
        <ul>
          <li><strong>クリーンブレイクを意識する</strong>: 前の役割の業務を計画的に引き継ぎ、新しい役割に集中できる状態を作る</li>
          <li><strong>公開情報を読み込む</strong>: 直近のスプリントレビュー資料、アーキテクチャドキュメント、障害post-mortem、OKR/ロードマップなど</li>
          <li><strong>前任者・現在の上司と対話する</strong>: なぜこの役割が必要とされているのか、チームが抱える既知の課題は何か</li>
          <li><strong>自分の強み・弱みを棚卸しする</strong>: 新しい役割で伸ばすべきスキルと、意識的に手放すべき「元の役割の癖」(例:コードを書くことに逃げ込まない)を整理する</li>
          <li><strong>学習アジェンダを作る</strong>: 「最初の30日間で何を理解しておきたいか」を箇条書きにしておく</li>
        </ul>

        <h3>避けるべきこと</h3>
        <ul>
          <li>前の役割の未完了タスクを引きずったまま新しい役割に入る</li>
          <li>「自分は技術に詳しいから大丈夫」という思い込みだけで、組織や人間関係の学習を後回しにする</li>
        </ul>
      </section>

      <!-- ===================== 5. Phase 1 First 10 Days ===================== -->
      <section id="phase1-first-10-days">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" />SECTION 05</div>
        <h2>フェーズ1:最初の10日間 ― オープニング・ギャンビット</h2>

        <p>最初の10日間は「聴くこと」に徹する期間です。この時期の目標は、<strong>信頼の土台を作ること</strong>と<strong>期待値をすり合わせること</strong>の2つに集約されます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FIRST_TEN_DAYS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">フェーズ1:最初の10日間(オープニング・ギャンビット)の流れ</div>
        </div>

        <h3>ステップ1: 上司との「5つの対話」を行う</h3>

        <p>Michael Watkinsが提唱する「5つの重要な対話」は、上司との関係構築における実践的なチェックリストです。</p>

        <div class="table-wrap" tabindex="0" role="region" aria-label="上司との5つの対話のテーマと確認すべきこと">
          <table>
            <thead><tr><th>対話のテーマ</th><th>確認すべきこと</th></tr></thead>
            <tbody>
              <tr><td>① 状況の診断</td><td>このチーム・プロジェクトの現状について、上司と自分の見立てが一致しているか</td></tr>
              <tr><td>② 期待値</td><td>30日・60日・90日それぞれで何を達成すれば「成功」とみなされるか</td></tr>
              <tr><td>③ スタイル</td><td>上司はどのくらいの頻度・粒度で報告を求めるか。意思決定にどこまで関与したいか</td></tr>
              <tr><td>④ リソース</td><td>予算・人員・ツールなど、成果を出すために何が必要で、何が不足しているか</td></tr>
              <tr><td>⑤ 個人の成長</td><td>自分自身の弱みや伸ばしたい部分について、率直にフィードバックをもらえる関係を作れているか</td></tr>
            </tbody>
          </table>
        </div>

        <h3>ステップ2: チームメンバー全員と1対1で対話する</h3>

        <p>エンジニアリングリーダーとして最初にやるべき最も重要なアクションの一つが、<strong>チームメンバー全員との個別対話</strong>です。目的は評価ではなく「知ること」です。</p>

        <p>代表的な質問例:</p>

        <ul>
          <li>今、あなたが最も誇りに思っている仕事は何ですか?</li>
          <li>チームがもっとうまくいくために、変えたほうがいいと思うことは何ですか?</li>
          <li>私(新任リーダー)に、最初に知っておいてほしいことは何ですか?</li>
          <li>あなたのキャリアで、次に挑戦したいことは何ですか?</li>
        </ul>

        <h3>ステップ3: 主要ステークホルダーとの対話</h3>

        <p>プロダクトマネージャー、隣接チームのリード、QA、SRE/インフラチームなど、日常的に連携する相手とも早期に接点を持ちます。ここでも「利害に基づく交渉」の考え方(3-3節)を使い、相手が何を期待しているかを丁寧に聞き取ります。</p>

        <h3>この時期の心得</h3>
        <ul>
          <li><strong>早すぎる変更は避ける</strong>: 就任1週間で大きな方針転換を打ち出すと、チームの信頼を得る前に反発を招きやすい</li>
          <li><strong>傾聴と観察を優先する</strong>: 「答えを持ち込む人」ではなく「問いを持ち込む人」として現れる</li>
          <li><strong>小さな約束を守る</strong>: 「確認して明日までに返します」と言ったら必ず守る。信頼は小さな一貫性の積み重ねから生まれる</li>
        </ul>
      </section>

      <!-- ===================== 6. Phase 2 Cohesion ===================== -->
      <section id="phase2-cohesion">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:adjustments" />SECTION 06</div>
        <h2>フェーズ2:11日目〜30日目 ― 一体感と一貫性をつくる</h2>

        <p>最初の10日間の対話で得た情報をもとに、チーム全体としての一体感(cohesion)と一貫性(coherence)を作っていく段階です。</p>

        <h3>ステップ1: チームの現状を「構造化して」診断する</h3>

        <p>個別の1on1で聞いた声を、パターンとして整理します。エンジニアリングチームであれば、次のような軸で整理すると実務に落とし込みやすくなります。</p>

        <div class="table-wrap" tabindex="0" role="region" aria-label="チームの現状を診断する軸と確認するポイント">
          <table>
            <thead><tr><th>診断軸</th><th>確認するポイント</th></tr></thead>
            <tbody>
              <tr><td>技術的な健全性</td><td>技術的負債の量、テストカバレッジ、デプロイ頻度、障害対応の仕組み</td></tr>
              <tr><td>プロセスの健全性</td><td>スプリント運営、見積もりの精度、レビューのボトルネック</td></tr>
              <tr><td>人・関係性の健全性</td><td>チーム内の信頼関係、燃え尽きの兆候、キャリアへの不満</td></tr>
              <tr><td>組織との整合性</td><td>チームの目標が会社全体の目標とどれだけ揃っているか</td></tr>
            </tbody>
          </table>
        </div>

        <h3>ステップ2: 共通の目的・価値観を言語化する</h3>

        <p>個々のメンバーの声を集約し、「このチームは何のために存在し、何を大切にするのか」をチームと一緒に言語化します。トップダウンで押し付けるのではなく、チームディスカッション(例: ワーキングアグリーメントの策定ワークショップ)を通じて合意形成することが重要です。</p>

        <h3>ステップ3: 小さな改善アクションに着手する</h3>

        <p>いきなり大きな変革を狙うのではなく、<strong>チームが「変化は前向きなものだ」と実感できる小さな改善</strong>から始めます。</p>

        <ul>
          <li>例: 形骸化していた定例会議を1つ廃止する</li>
          <li>例: コードレビューのSLA(何時間以内に一次レスポンスをするか)を明文化する</li>
          <li>例: オンコール対応後に必ず休息を取れるようローテーションを見直す</li>
        </ul>

        <h3>この時期の心得</h3>
        <ul>
          <li>チームの声を「聞きっぱなし」にしない。何を聞いて、何を変え、何を変えないのかを必ずフィードバックする</li>
          <li>一貫したメッセージを、チーム内・チーム外の両方に発信し続ける</li>
        </ul>
      </section>

      <!-- ===================== 7. Phase 3 Agenda ===================== -->
      <section id="phase3-agenda">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:rocket" />SECTION 07</div>
        <h2>フェーズ3:31日目〜60日目 ― アジェンダを始動する</h2>

        <p>信頼と共通理解の土台ができたところで、いよいよ自分自身のアジェンダ(中長期の優先事項)を動かし始める段階です。</p>

        <h3>ステップ1: 優先事項を絞り込む</h3>

        <p>フェーズ2までに集めた情報をもとに、次の90日〜半年で取り組むべき優先事項を3〜5個程度に絞り込みます。多くを同時に狙いすぎないことが重要です。</p>

        <h3>ステップ2: 早期の成果(クイックウィン)を可視化する</h3>

        <p>早い段階で目に見える成果を出すことは、リーダーとしての信頼を積み上げるうえで非常に効果的です。ただし、クイックウィンは<strong>チームが大切にしている課題</strong>と結びついている必要があります。単なる「見栄えのいい実績作り」は逆効果です。</p>

        <h3>ステップ3: 60日間を振り返り、次の90日計画に接続する</h3>

        <p>60日目のタイミングで、次のような振り返りを行います。</p>

        <ul>
          <li>上司との期待値は当初の合意と比べてどう変化したか</li>
          <li>チームからのフィードバックはどう変わったか(1on1やアンケートで確認)</li>
          <li>診断した課題のうち、着手できたもの・できなかったものは何か</li>
          <li>次の30日間(=90日目まで)で焦点を当てるべきことは何か</li>
        </ul>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DAY31_TO_60_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">フェーズ3:31日目〜60日目の実行フロー</div>
        </div>
      </section>

      <!-- ===================== 8. One-on-Ones ===================== -->
      <section id="one-on-ones">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:message-circle" />SECTION 08</div>
        <h2>1on1ミーティングのベストプラクティス</h2>

        <p>1on1は、このガイド全体を通じて最も重要な「道具」です。Camille Fournierが著書<em>The Manager's Path</em>の中で紹介している、あるエンジニアリングリーダーの言葉が象徴的です。定期的な1on1を怠ることは、オイル交換を怠って車を走らせ続けるようなものであり、最悪のタイミングで問題が表面化するリスクを高めます。</p>

        <h3>実践のポイント</h3>

        <div class="table-wrap" tabindex="0" role="region" aria-label="1on1の実践のポイントと推奨プラクティス">
          <table>
            <thead><tr><th>項目</th><th>推奨プラクティス</th></tr></thead>
            <tbody>
              <tr><td>頻度</td><td>最低でも週1回、30分程度</td></tr>
              <tr><td>主導権</td><td>メンバー側が話したいことを話す時間にする(進捗報告の場にしない)</td></tr>
              <tr><td>進め方</td><td>メンバーに答えを与えるのではなく、問いかけて本人に考えさせる</td></tr>
              <tr><td>記録</td><td>話した内容と次のアクションを<strong>必要最小限</strong>だけメモし、次回参照できるようにする(共有範囲・保存場所・保存期間・アクセス権をあらかじめ決めて明示する)</td></tr>
              <tr><td>頻度の調整</td><td>慣れてきたら、メンバーの状況に応じて頻度・スタイルを調整する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
          <p><strong>1on1記録の取り扱いルール</strong>: 1on1のメモは、メンバーが安心して話せることを前提に成り立っています。記録を残す場合は、(1)何を書き何を書かないか、(2)誰が読めるか(共有範囲)、(3)どこに保存するか、(4)いつまで保存し、いつ削除するか、(5)アクセス権を誰が管理するか、をチームに対して明示してください。評価・人事・健康に関わる内容や、本人の同意なく共有できない事柄は、個人メモではなく所定の人事プロセスと保管先で扱います。</p>
        </div>

        <h3>質問のフレームワーク例</h3>
        <ol>
          <li><strong>今、何が一番気になっていますか?</strong>(Identify)</li>
          <li><strong>理想の状態はどんなものですか? 何が障害になっていますか?</strong>(Understand)</li>
          <li><strong>私にできるサポートは何ですか?</strong>(Support)</li>
        </ol>
      </section>

      <!-- ===================== 9. Psychological Safety ===================== -->
      <section id="psychological-safety">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:shield-check" />SECTION 09</div>
        <h2>心理的安全性:チームの土台をつくる</h2>

        <p>Googleが2012年から実施した大規模調査「Project Aristotle」は、180のチームを対象に、250以上の調査項目(チームの属性)を分析しました。その結果、<strong>チームの効果性と最も強く関連していたのは「心理的安全性」であり、それは「誰がチームにいるか」というチーム構成よりも「チームがどのように協働しているか」に関わる要因だった</strong>と報告されています(相関として報告されたものであり、因果を断定したものではありません)。心理的安全性とは、Harvard Business SchoolのAmy Edmondson教授が定義した「対人関係においてリスクを取っても安全だとチームメンバーが共有して信じている状態」を指します。</p>

        <p>この調査では、心理的安全性に加えて次の4つの要因も、効果的なチームに共通する特徴として挙げられています。</p>

        <div class="table-wrap" tabindex="0" role="region" aria-label="Project Aristotleが特定したチームの効果性の要因">
          <table>
            <thead><tr><th>要因</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>心理的安全性</td><td>失敗や質問をしても、恥をかいたり罰せられたりしないと感じられること</td></tr>
              <tr><td>相互信頼性</td><td>メンバーが期限内に質の高い仕事を仕上げると信頼できること</td></tr>
              <tr><td>構造と明確さ</td><td>役割・計画・目標が明確であること</td></tr>
              <tr><td>仕事の意味</td><td>個々人にとって仕事に意味を見出せること</td></tr>
              <tr><td>インパクト</td><td>自分の仕事が組織やチームに与える影響を実感できること</td></tr>
            </tbody>
          </table>
        </div>

        <h3>新任リーダーが最初の60日間でできること</h3>
        <ul>
          <li>自分自身が率先して「わからないことはわからない」と言う</li>
          <li>失敗を個人の責任追及ではなく、学習の機会として扱う(post-mortemを「誰が悪いか」ではなく「何が起きたか」で進める)</li>
          <li>チームメンバー全員が発言できるよう、会議のファシリテーションを工夫する(発言の偏りに気を配る)</li>
        </ul>
      </section>

      <!-- ===================== 10. AI Thought Partner ===================== -->
      <section id="ai-thought-partner">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:robot" />SECTION 10</div>
        <h2>AIを思考パートナーとして活用する</h2>

        <p>近年のリーダーシップ論(McNulty氏の著書でも1章が割かれています)では、AIを「意思決定を代行させる道具」としてではなく、<strong>難しい対話や意思決定に備えるための壁打ち相手(thought partner)</strong>として活用することが提案されています。</p>

        <h3>具体的な活用例</h3>
        <ul>
          <li><strong>難しい対話のロールプレイ</strong>: 「パフォーマンスが低下しているメンバーへのフィードバック」を伝える前に、想定される反応をシミュレーションする</li>
          <li><strong>コンティンジェンシープランの作成</strong>: ある意思決定がうまくいかなかった場合の代替シナリオを一緒に洗い出す</li>
          <li><strong>1on1の準備</strong>: メンバーごとの背景情報を整理し、聞くべき質問の候補をブレインストーミングする</li>
          <li><strong>文章のドラフト作成</strong>: チーム向けのビジョンステートメントやワーキングアグリーメントの草案を作り、自分の言葉で磨き上げる土台にする</li>
        </ul>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
          <p>注意点: AIはあくまで「準備」のための壁打ち相手であり、最終的な判断や、メンバーとの関係構築そのものを代替するものではありません。</p>
        </div>

        <h3>AIに情報を渡すときのルール</h3>

        <p>上記の活用例のうち「難しい対話のロールプレイ」と「1on1の準備」は、本人の同意なく共有できない情報を扱いがちです。次のルールを守ってください。</p>

        <ul>
          <li><strong>承認されていない外部AIサービスに入力しない情報</strong>: 個人を特定できる情報(氏名・所属・役職の組み合わせなど)、その他の個人情報、評価・人事に関する情報、健康に関する情報、会社の機密情報</li>
          <li><strong>匿名化してから使う</strong>: 相談したい状況は「シニアエンジニア1名」のように役割と事象だけに抽象化し、個人が特定できる要素を落としてから入力する</li>
          <li><strong>利用するサービスを確認する</strong>: 会社が承認したAIサービスかどうか、入力データが保存されるか、モデルの学習に利用されるかを事前に確認し、学習利用をオフにできる場合はオフにする</li>
          <li><strong>残さない</strong>: 準備が終わったら、AIサービス側に残った会話履歴は削除する</li>
        </ul>
      </section>

      <!-- ===================== 11. Common Mistakes ===================== -->
      <section id="common-mistakes">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" />SECTION 11</div>
        <h2>よくある失敗とその回避策</h2>

        <p>複数の著名なエンジニアリングリーダーの発信(LeadDevに寄稿された新任マネージャーの体験談など)に共通して挙げられる失敗パターンを整理しました。</p>

        <div class="table-wrap" tabindex="0" role="region" aria-label="新任リーダーのよくある失敗と回避策">
          <table>
            <thead><tr><th>よくある失敗</th><th>なぜ起きるか</th><th>回避策</th></tr></thead>
            <tbody>
              <tr><td>期待値のすり合わせ不足</td><td>「言わなくても伝わっているはず」という思い込み</td><td>期待値は暗黙のうちに存在してしまうものと理解し、明示的に会話する</td></tr>
              <tr><td>技術的な仕事に逃げ込む</td><td>マネジメントの不確実性より、コードを書く方が「得意で安心」だから</td><td>自分の役割の変化を受け入れ、意図的に委譲する</td></tr>
              <tr><td>早すぎる大改革</td><td>早く成果を出したい焦り</td><td>信頼構築(フェーズ1・2)を先に済ませる</td></tr>
              <tr><td>1on1の形骸化</td><td>忙しさを理由に後回しにする</td><td>1on1を「削減可能な会議」ではなく「最優先の投資」と位置づける</td></tr>
              <tr><td>フィードバックを聞きっぱなしにする</td><td>拾った声にどう対応したか報告し忘れる</td><td>「聞いたこと」「変えたこと」「変えない理由」を必ず可視化する</td></tr>
              <tr><td>自分がすべての決定をしようとする</td><td>マイクロマネジメントに陥りやすい</td><td>チームの目標を明確にし、詳細な意思決定は委譲する</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 12. Checklist ===================== -->
      <section id="checklist">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 12</div>
        <h2>60日間チェックリスト</h2>

        <div class="table-wrap" tabindex="0" role="region" aria-label="60日間チェックリスト(フェーズ別チェック項目)">
          <table>
            <thead><tr><th>フェーズ</th><th>チェック項目</th></tr></thead>
            <tbody>
              <tr><td>フェーズ0(就任前)</td><td>☐ 組織図・直近ドキュメントを読み込んだ</td></tr>
              <tr><td>フェーズ0(就任前)</td><td>☐ 前任者・現上司と対話した</td></tr>
              <tr><td>フェーズ0(就任前)</td><td>☐ 初日メッセージを準備した</td></tr>
              <tr><td>フェーズ1(Day 1-10)</td><td>☐ 上司との「5つの対話」を実施した</td></tr>
              <tr><td>フェーズ1(Day 1-10)</td><td>☐ チーム全員と1対1の対話を実施した</td></tr>
              <tr><td>フェーズ1(Day 1-10)</td><td>☐ 主要ステークホルダーと接点を持った</td></tr>
              <tr><td>フェーズ2(Day 11-30)</td><td>☐ チームの現状を構造化して診断した</td></tr>
              <tr><td>フェーズ2(Day 11-30)</td><td>☐ チームの目的・価値観を言語化した</td></tr>
              <tr><td>フェーズ2(Day 11-30)</td><td>☐ 小さな改善アクションに着手した</td></tr>
              <tr><td>フェーズ3(Day 31-60)</td><td>☐ 中長期の優先事項を3〜5個に絞った</td></tr>
              <tr><td>フェーズ3(Day 31-60)</td><td>☐ クイックウィンを1つ以上実行した</td></tr>
              <tr><td>フェーズ3(Day 31-60)</td><td>☐ 60日振り返りを実施し、次の90日計画を立てた</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 13. Summary ===================== -->
      <section id="summary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 13</div>
        <h2>まとめ</h2>

        <p>新任リーダーとしての最初の60日間は、<strong>「聴く」→「診断し、揃える」→「動かし、示す」</strong>という3段階のプロセスとして捉えることができます。この流れの根底にあるのは、指示や管理ではなく、<strong>利害に基づく対話を通じて信頼と共通理解を築く</strong>という姿勢です。</p>

        <p>技術力に加えて、STARSモデルによる状況診断、丁寧な1on1、心理的安全性の醸成といった「人と組織を動かす技術」を身につけることが、エンジニアからリーダーへの移行を成功させる鍵となります。焦らず、しかし意図を持って、この60日間を過ごしてください。</p>
      </section>

      <!-- ===================== 14. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 14</div>
        <h2>参考文献・出典</h2>

        <p>本ガイドは以下の情報源を基に作成しています(2026年8月19日時点でアクセス確認済み)。特に国際的に著名なエンジニアリングリーダー・研究者の発信を優先的に参照しました。</p>

        <div class="ref-group">
          <h3>出典一覧</h3>
          <ul class="ref-list">
            <li><span class="ref-name">1. Eric J. McNulty, <em>Your First 60 Days as a Leader</em>, O'Reilly Media (2026年8月刊・概要ページ)</span><a class="ref-url" href="https://www.oreilly.com/library/view/your-first-60/0642572367008/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/your-first-60/0642572367008/</a></li>
            <li><span class="ref-name">2. LeadDev, "Your 30-60-90-day plan as a new manager"</span><a class="ref-url" href="https://leaddev.com/career-development/your-30-60-90-day-plan-new-manager" target="_blank" rel="noopener">https://leaddev.com/career-development/your-30-60-90-day-plan-new-manager</a></li>
            <li><span class="ref-name">3. LeadDev, "Learnings from my first 90 days as an engineering manager"</span><a class="ref-url" href="https://leaddev.com/leadership/learnings-my-first-90-days-engineering-manager" target="_blank" rel="noopener">https://leaddev.com/leadership/learnings-my-first-90-days-engineering-manager</a></li>
            <li><span class="ref-name">4. LeadDev, "Four mistakes I made as a new manager"</span><a class="ref-url" href="https://leaddev.com/hiring/four-mistakes-i-made-new-manager" target="_blank" rel="noopener">https://leaddev.com/hiring/four-mistakes-i-made-new-manager</a></li>
            <li><span class="ref-name">5. Camille Fournier(元Rent the Runway CTO、『The Manager's Path』著者)に関する要約記事</span><a class="ref-url" href="https://getlighthouse.com/blog/camille-fournier-lessons-managers-path/" target="_blank" rel="noopener">https://getlighthouse.com/blog/camille-fournier-lessons-managers-path/</a></li>
            <li><span class="ref-name">6. Camille Fournier, "Following The Manager's Path"(著者本人によるMedium投稿)</span><a class="ref-url" href="https://skamille.medium.com/following-the-managers-path-50e184cde1ff" target="_blank" rel="noopener">https://skamille.medium.com/following-the-managers-path-50e184cde1ff</a></li>
            <li><span class="ref-name">7. Julie Zhuo(元Facebook VP of Product Design), <em>The Making of a Manager</em> 公式ページ</span><a class="ref-url" href="https://www.juliezhuo.com/book/manager.html" target="_blank" rel="noopener">https://www.juliezhuo.com/book/manager.html</a></li>
            <li><span class="ref-name">8. Julie Zhuoへのインタビューに基づく要約記事, "Becoming a Manager: What to do When Everyone Looks to You"</span><a class="ref-url" href="https://thefutureorganization.com/becoming-a-manager-what-to-do-when-everyone-looks-to-you/" target="_blank" rel="noopener">https://thefutureorganization.com/becoming-a-manager-what-to-do-when-everyone-looks-to-you/</a></li>
            <li><span class="ref-name">9. Michael Watkins, <em>The First 90 Days</em> 要約(STARSモデル・5つの対話の解説)</span><a class="ref-url" href="https://readingraphics.com/book-summary-the-first-90-days/" target="_blank" rel="noopener">https://readingraphics.com/book-summary-the-first-90-days/</a></li>
            <li><span class="ref-name">10. Google re:Work, "Understand team effectiveness"(Project Aristotle公式ガイド)</span><a class="ref-url" href="https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness" target="_blank" rel="noopener">https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness</a></li>
            <li><span class="ref-name">11. Pat Kua(元ThoughtWorks Chief Scientist、国際的なエンジニアリングリーダーシップコンサルタント), "Using Project Aristotle To Build Highly Effective Teams"</span><a class="ref-url" href="https://www.patkua.com/blog/project-aristotle/" target="_blank" rel="noopener">https://www.patkua.com/blog/project-aristotle/</a></li>
            <li><span class="ref-name">12. Sai Emani, "Your first 90 days as an engineering manager"</span><a class="ref-url" href="https://www.crackingtheeminterview.com/p/your-first-90-days-as-an-engineering" target="_blank" rel="noopener">https://www.crackingtheeminterview.com/p/your-first-90-days-as-an-engineering</a></li>
          </ul>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
          <p>注記: 出典1(O'Reilly掲載ページ)は書籍の概要・目次情報のみを参照しており、本文の詳細(会員限定コンテンツ)は含んでいません。各出典の詳細な内容については、リンク先を直接ご確認ください。</p>
        </div>
      </section>

      <footer>
        本ガイドは教育・学習支援を目的とした非公式の解説資料です。内容は複数の公開情報源をもとに作成しており、原典の著作権はそれぞれの著者・出版社に帰属します。
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* ===================== Layout & Structure ===================== */
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

.sidebar-nav a :deep(svg),
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

.sidebar-nav a.active :deep(svg),
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

/* ===================== Main Content ===================== */
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

.disclaimer-box a {
  color: var(--color-indigo);
  text-decoration: none;
}

.disclaimer-box a:hover {
  text-decoration: underline;
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

.callout.note {
  border-left-color: var(--color-plum);
}

.callout.note .callout-title {
  color: var(--color-plum);
}

/* ===================== Diagram Card (Mermaid Frame) ===================== */
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
  html {
    scroll-behavior: auto;
  }

  .sidebar {
    transition: none;
  }
}
</style>
