<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "how-to-use",
  "ppdv-overview",
  "double-diamond",
  "problem-vs-solution",
  "discovery-techniques",
  "validation-techniques",
  "scrum-integration",
  "myths-antipatterns",
  "exam-prep",
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

function closeSidebarForSkipLink(): void {
  sidebarOpen.value = false;
}

useSeoMeta({
  title:
    "Professional Product Discovery and Validation(PPDV)認定試験 学習ガイド | Scrum.org公式アセスメント",
  description:
    "Scrum.org Professional Product Discovery and Validation(PPDV)認定試験の初学者向け学習ガイド。ダブルダイヤモンド、Discovery/Validation技法、EBM、ベストプラクティスと一次情報源のURLを解説。",
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

const DIAGRAM_DOUBLE_DIAMOND = `flowchart LR
subgraph DD1["第1のダイヤモンド: 問題空間"]
direction LR
A["Discover 発散: 広く探索する"] --> B["Define 収束: 問題を定義する"]
end
subgraph DD2["第2のダイヤモンド: 解決空間"]
direction LR
C["Develop 発散: 解決策を発想する"] --> E["Deliver 収束: テストし届ける"]
end
B --> C
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,E box;`;

const DIAGRAM_JOURNEY_MAP = `journey
title 新規ユーザーのオンボーディング体験の例
section 認知
広告を見る: 3: ユーザー
製品ページを訪問: 4: ユーザー
section 検討
価格を比較する: 2: ユーザー
レビューを読む: 3: ユーザー
section 利用開始
サインアップする: 4: ユーザー
初期設定を行う: 2: ユーザー
section 定着
主要機能を使う: 5: ユーザー`;

const DIAGRAM_IMPACT_MAP = `flowchart TB
Why["Why: ビジネスゴール"] --> Who1["Who: アクターA"]
Why --> Who2["Who: アクターB"]
Who1 --> How1["How: 望む行動変化1"]
Who2 --> How2["How: 望む行動変化2"]
How1 --> What1["What: 施策候補1"]
How1 --> What2["What: 施策候補2"]
How2 --> What3["What: 施策候補3"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Who1,Who2,How1,How2,What1,What2,What3 box;
class Why hub;`;

const DIAGRAM_TRUTH_CURVE = `flowchart LR
A["インタビュー"] --> B["ペーパープロトタイプ"]
B --> C["広告出稿 クリック計測"]
C --> D["ランディングページ テスト"]
D --> E["タスク完了テスト ユーザビリティテスト"]
E --> F["プロトタイプ"]
F --> G["事前販売 Pre-selling"]
G --> H["コンシェルジュMVP"]
H --> I["Wizard of Oz"]
I --> J["実製品 / 実事業"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F,G,H,I box;
class J done;`;

const DIAGRAM_BUILD_MEASURE_LEARN = `flowchart LR
Idea["アイデア / 仮説"] --> Build["Build 最小の実験を構築する"]
Build --> Measure["Measure データを計測する"]
Measure --> Learn["Learn 学びを得る"]
Learn -->|"仮説を更新"| Idea
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class Idea,Build,Measure,Learn box;`;

const DIAGRAM_TEST_LEARNING_CYCLE = `flowchart LR
TC["Test Card 仮説とテスト方法を設計"] --> EXP["実験を実施する"]
EXP --> LC["Learning Card 観察と学びを記録"]
LC -->|"意思決定"| NEXT["次のアクション: 継続 / ピボット / 中止"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class TC,EXP,LC box;
class NEXT done;`;

const DIAGRAM_EBM_KVA = `flowchart TB
subgraph Market["市場に対する価値(何を届けているか)"]
CV["Current Value 現在の価値"]
UV["Unrealized Value 未実現の価値"]
end
subgraph Org["価値を届ける組織能力(どう届けているか)"]
T2M["Time-to-Market 市場投入までの時間"]
A2I["Ability to Innovate 革新する能力"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class CV,UV box;
class T2M,A2I hub;`;

const DIAGRAM_FIT_PROGRESSION = `flowchart LR
A["課題の発見 Problem"] --> B{"Problem-Solution Fit 課題と解決策が噛み合っているか"}
B -->|"検証できた"| C["Product-Market Fit 製品と市場が噛み合っているか"]
C --> D["スケール・成長"]
B -->|"検証できない"| A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A box;
class B hub;
class C box;
class D done;`;

const DIAGRAM_DUAL_TRACK_SPRINTS = `flowchart TB
subgraph S1["Sprint 1"]
Dis1["Discovery活動"]
Del1["Delivery活動"]
end
subgraph S2["Sprint 2"]
Dis2["Discovery活動"]
Del2["Delivery活動"]
end
subgraph S3["Sprint 3"]
Dis3["Discovery活動"]
Del3["Delivery活動"]
end
Dis1 -.->|"検証済みの気づき"| Del2
Dis2 -.->|"検証済みの気づき"| Del3
Del1 --> Del2
Del2 --> Del3
Dis1 --> Dis2
Dis2 --> Dis3
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Dis1,Dis2,Dis3 hub;
class Del1,Del2,Del3 box;`;
</script>

<template>
  <div class="layout">
    <a href="#main-content" class="skip-link" @click="closeSidebarForSkipLink">本文へスキップ</a>

    <button
      ref="sidebarToggle"
      class="sidebar-toggle"
      type="button"
      aria-label="目次を開閉"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div
      class="sidebar-overlay"
      :class="{ open: sidebarOpen }"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <nav class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M20 6 L23 15 L32 15 L25 21 L27 30 L20 25 L13 30 L15 21 L8 15 L17 15 Z" fill="currentColor" opacity="0.8" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">PPDV™ 学習ガイド</div>
          <div class="brand-subtitle">Product Discovery and Validation</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li>
          <a href="#how-to-use" :class="{ active: activeId === 'how-to-use' }" @click="closeSidebar">
            <Icon name="tabler:map-2" aria-hidden="true" />このガイドの読み方
          </a>
        </li>
        <li>
          <a href="#ppdv-overview" :class="{ active: activeId === 'ppdv-overview' }" @click="closeSidebar">
            <Icon name="tabler:certificate" aria-hidden="true" />第1章: 試験の概要
          </a>
        </li>
        <li>
          <a href="#double-diamond" :class="{ active: activeId === 'double-diamond' }" @click="closeSidebar">
            <Icon name="tabler:route" aria-hidden="true" />第2章: ダブルダイヤモンド
          </a>
        </li>
        <li>
          <a href="#problem-vs-solution" :class="{ active: activeId === 'problem-vs-solution' }" @click="closeSidebar">
            <Icon name="tabler:clipboard-text" aria-hidden="true" />第3章: 問題vsソリューション
          </a>
        </li>
        <li>
          <a href="#discovery-techniques" :class="{ active: activeId === 'discovery-techniques' }" @click="closeSidebar">
            <Icon name="tabler:search" aria-hidden="true" />第4章: Discovery技法
          </a>
        </li>
        <li>
          <a href="#validation-techniques" :class="{ active: activeId === 'validation-techniques' }" @click="closeSidebar">
            <Icon name="tabler:flask" aria-hidden="true" />第5章: Validation技法
          </a>
        </li>
        <li>
          <a href="#scrum-integration" :class="{ active: activeId === 'scrum-integration' }" @click="closeSidebar">
            <Icon name="tabler:git-branch" aria-hidden="true" />第6章: Scrum統合
          </a>
        </li>
        <li>
          <a href="#myths-antipatterns" :class="{ active: activeId === 'myths-antipatterns' }" @click="closeSidebar">
            <Icon name="tabler:alert-triangle" aria-hidden="true" />第7章: 誤解・アンチパターン
          </a>
        </li>
        <li>
          <a href="#exam-prep" :class="{ active: activeId === 'exam-prep' }" @click="closeSidebar">
            <Icon name="tabler:clipboard-check" aria-hidden="true" />第8章: 試験対策
          </a>
        </li>
        <li>
          <a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar">
            <Icon name="tabler:link" aria-hidden="true" />参考文献・ソース一覧
          </a>
        </li>
      </ul>
    </nav>

    <main id="main-content" class="main-content" tabindex="-1">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />SCRUM.ORG 公式アセスメント
        </div>
        <h1>Professional Product Discovery and Validation™ 認定試験 学習ガイド</h1>
        <p class="hero-lede">
          初学者向け・ステップバイステップ解説版。対象試験:
          <a
            href="https://www.scrum.org/assessments/professional-product-discovery-and-validation-certification"
            target="_blank"
            rel="noopener"
          >Professional Product Discovery and Validation™ Certification</a>(Scrum.org)
        </p>

        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">20問</div>
            <div class="stat-label">出題数</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">30分</div>
            <div class="stat-label">制限時間</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">85%以上</div>
            <div class="stat-label">合格ライン</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">生涯有効</div>
            <div class="stat-label">資格の有効期限(失効なし)</div>
          </div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドはPPDV認定試験の学習補助を目的として作成した二次資料です。最新の出題範囲・試験形式は必ず<a href="https://www.scrum.org/assessments/professional-product-discovery-and-validation-certification" target="_blank" rel="noopener">Scrum.org公式ページ</a>で確認してください。</span>
        </div>
      </div>

      <!-- SECTION 01: How to Use This Guide -->
      <section id="how-to-use">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:map-2" aria-hidden="true" />SECTION 01
        </div>
        <h2>このガイドの読み方</h2>

        <p>PPDV認定試験は、プロダクトの「発見(Discovery)」と「検証(Validation)」に関する知識と、それをいつ・どのように使うべきかの判断力を問う試験です。単なる用語暗記ではなく、「この状況ではどの手法を選ぶべきか」を問われる問題が中心になります。</p>

        <p>このガイドは以下の構成で進みます。</p>

        <ol>
          <li>第1章: 試験の全体像(形式・対象者・学習目標)</li>
          <li>第2章: PPDVの土台となる考え方「ダブルダイヤモンド」</li>
          <li>第3章: 問題 vs ソリューション(課題の定式化)</li>
          <li>第4章: Discovery(発見)技法群</li>
          <li>第5章: Validation(検証)技法群</li>
          <li>第6章: Scrumチームでの実践への統合</li>
          <li>第7章: よくある誤解・アンチパターン</li>
          <li>第8章: 試験対策の進め方</li>
          <li>参考文献・ソース一覧</li>
        </ol>

        <p>各章の末尾に<strong>ベストプラクティス</strong>と<strong>ソース</strong>を明記しているので、根拠を辿りながら学習してください。</p>
      </section>

      <!-- SECTION 02: Chapter 1 Overview -->
      <section id="ppdv-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:certificate" aria-hidden="true" />SECTION 02
        </div>
        <h2>第1章: PPDV認定試験の概要</h2>

        <h3>1.1 PPDVとは何か</h3>
        <p>PPDV(Professional Product Discovery and Validation)は、Scrum.orgが提供する認定資格です。プロダクトオーナーやプロダクトマネージャー、ビジネスアナリスト、プロダクトチームのメンバーが、ユーザーや顧客から学びながら「市場に届けるべき正しいプロダクト機能」を見極める力を証明するための試験です。</p>
        <p>Scrum.orgの公式ページでは、この認定は「発見・検証技法をどう使うか、いつ使うかについての知識」を検証し、さらに「発見・検証スキルを適用して価値創出を高める能力」もテストすると説明されています。受講は必須ではありませんが、公式トレーニングクラスの受講が強く推奨されています。</p>

        <h3>1.2 試験の基本情報</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>出題数</td><td>20問</td></tr>
              <tr><td>制限時間</td><td>30分</td></tr>
              <tr><td>合格ライン</td><td>85%以上</td></tr>
              <tr><td>資格の有効期限</td><td>生涯有効(失効なし)</td></tr>
              <tr><td>受験の前提条件</td><td>明確な必須要件はないが、Professional Scrum Product Owner I(PSPO I)や同等のトレーニング受講が推奨される</td></tr>
              <tr><td>フィードバック形式</td><td>正誤の詳細は開示されないが、「Professional Scrum Competencies(プロフェッショナル・スクラム・コンピテンシー)」の観点別に成績のブレークダウンが提供される</td></tr>
              <tr><td>受験資格の入手方法</td><td>公式PPDVトレーニング受講者には無料の受験権が付与される。受講なしでも購入して受験可能</td></tr>
            </tbody>
          </table>
        </div>

        <h3>1.3 対象者</h3>
        <p>この試験・研修は主に以下の役割の人を対象に設計されています。</p>
        <ul>
          <li>プロダクトオーナー(Product Owner)</li>
          <li>プロダクトマネージャー</li>
          <li>ビジネスアナリスト</li>
          <li>発見・検証プロセスに関わるプロダクトチーム全体</li>
        </ul>
        <p>新規プロダクト開発(グリーンフィールド)だけでなく、既存プロダクトの機能拡張・改善にも適用できる内容として設計されています。</p>

        <h3>1.4 公式の学習目標(Course Learning Objectives)</h3>
        <p>Scrum.org公式コースページに掲載されている学習目標は次の4点です。</p>
        <ol>
          <li>ユーザーのニーズ・欲求に関する仮説を検証する実験を意図的に設計することで、ユーザー価値の創出を高める</li>
          <li>検証によって得られたエビデンスに基づいてのみ投資判断を行うことで、無駄を減らしROIを改善する</li>
          <li>意見ではなくデータを用いて主要なステークホルダーと関わることで、組織のコラボレーションと連携を改善する</li>
          <li>「実行すべきタスク」ではなく「解決すべき問題」として仕事を再定義することで、創造性を引き出す</li>
        </ol>
        <p>試験の出題は、この4つのコース学習目標そのものではなく、Professional Product Ownership™のCapabilities and Skillsに基づいています。公式アセスメントのブループリントは「Engage with Vision(ビジョンへの関与)」「Evolve with Validation(検証による進化)」「Lead to Value(価値へ導く)」の3カテゴリで構成されており、本ガイドの各章もこのブループリントに沿って対応づけています。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス
          </div>
          <ul>
            <li>「手法を知っている」ことと「状況に応じて適切な手法を選べる」ことは別スキルと捉え、各技法を学ぶ際は必ず<strong>「どんな状況でこれを使うか / 使わないか」</strong>をセットで整理する</li>
            <li>前提知識としてProfessional Scrum(Scrumの基本イベント・作成物・価値基準)とProduct Ownership(PSPO Iレベル)を先に固めておくと、Discovery/Validationの技法がスムーズに理解できる</li>
            <li>学習中は「タスクではなく問題を解く」という学習目標4を常に意識し、機能一覧ではなく「解くべき課題」を起点に技法を整理する</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />ソース
          </div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-product-discovery-and-validation-certification" target="_blank" rel="noopener">Professional Product Discovery and Validation™ Certification(Scrum.org 公式試験ページ)</a></li>
            <li><a href="https://www.scrum.org/courses/professional-product-discovery-and-validation-training" target="_blank" rel="noopener">Professional Product Discovery and Validation™ Training(Scrum.org 公式コースページ・学習目標記載)</a></li>
            <li><a href="https://www.credly.com/org/scrum-org/badge/professional-product-discovery-and-validation" target="_blank" rel="noopener">Professional Product Discovery and Validation™(Credly バッジ説明)</a></li>
            <li><a href="https://scrumdojo.cz/en/courses/professional-product-discovery-and-validation" target="_blank" rel="noopener">PPDV認定・試験形式(20問/30分/85%/生涯有効)の記載(ScrumDojo.cz、Scrum.org Professional Training Networkパートナー)</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 03: Chapter 2 Double Diamond -->
      <section id="double-diamond">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:route" aria-hidden="true" />SECTION 03
        </div>
        <h2>第2章: PPDVの土台となる考え方 — ダブルダイヤモンド</h2>

        <h3>2.1 ダブルダイヤモンドとは</h3>
        <p>PPDVのコース構成は、イギリスのDesign Councilが2004〜2005年にかけて11のグローバル企業(LEGO、Sony、Microsoftなど)の実際のデザインプロセスを調査してまとめた<strong>ダブルダイヤモンドモデル</strong>に沿っています。このモデルは「発散(Divergent Thinking)」と「収束(Convergent Thinking)」を2回繰り返す構造を持ち、4つのフェーズで構成されます。</p>

        <ul>
          <li><strong>Discover(発見)</strong>: 課題領域を幅広く探索する(発散)</li>
          <li><strong>Define(定義)</strong>: 探索した情報から解くべき問題を絞り込む(収束)</li>
          <li><strong>Develop(開発)</strong>: 解決策の選択肢を幅広く発想・試作する(発散)</li>
          <li><strong>Deliver(提供)</strong>: 有望な解決策に絞り込み、テスト・実装・提供する(収束)</li>
        </ul>

        <p>最初のダイヤモンドは「正しい問題」を見つけるための問題空間、2つ目のダイヤモンドは「正しい解決策」を見つけるための解決空間を表します。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DOUBLE_DIAMOND" theme="base" :theme-variables="LIGHT_THEME_VARS" />
          </ClientOnly>
          <div class="diagram-caption">ダブルダイヤモンド: 問題空間(Discover→Define)と解決空間(Develop→Deliver)</div>
        </div>

        <p>PPDVコースの構成(ScrumDojo.czの公式パートナーによる解説)は、このダブルダイヤモンドの4フェーズすべてを、顧客ニーズの探索から優先順位付け、実験の定式化、検証までひと通り扱う設計になっています。</p>

        <h3>2.2 Discovery(発見)とは何か</h3>
        <p>Scrum.org CEOのDave Westは公式ブログで、Product Discoveryを次のように定義しています。</p>
        <p>プロダクトディスカバリーとは、解く価値のある問題と、作る価値のある解決策を見つけるために不確実性を減らしていく、エビデンスに基づいた(evidence-informed)プロセスであり、非線形な一連の活動として、機能横断チームによって行われるものである。</p>
        <p>この定義には3つの重要な要素があります。</p>
        <ol>
          <li><strong>エビデンス・インフォームド(evidence-informed)であり、エビデンス・ベースド(evidence-based)ではない</strong> — エビデンスは意思決定の材料にはなるが、最終的に決めるのは人であるという考え方</li>
          <li><strong>活動は非線形</strong> — 1980年代のウォーターフォール的な「理解フェーズ→実現フェーズ」という一直線の流れではなく、様々な活動が並行・反復しながらチームの理解を深めていく</li>
          <li><strong>機能横断チームが担う</strong> — 専門家が要件を調査して開発チームに引き渡す分業モデルではなく、デジタル時代には多様なスキルを持つチームが一体となって進める必要がある</li>
        </ol>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス
          </div>
          <ul>
            <li>Discoveryを「開発の前工程」として切り離さず、ダブルダイヤモンドの4フェーズを反復的に回す発想を持つ</li>
            <li>「エビデンスに基づいて決める」のではなく「エビデンスを判断材料の一つとして人が決める」というスタンスを意識し、データ至上主義に陥らない</li>
            <li>Discovery活動を特定の役割(POだけ等)に閉じ込めず、機能横断チーム全体の共同責任として設計する</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />ソース
          </div>
          <ul>
            <li><a href="https://www.designcouncil.org.uk/resources/framework-for-innovation/" target="_blank" rel="noopener">Framework for Innovation: Design Council's evolved Double Diamond(Design Council 公式)</a></li>
            <li><a href="https://www.scrum.org/resources/blog/product-discovery-and-validation-scrum" target="_blank" rel="noopener">Product Discovery and Validation in Scrum(Dave West, Scrum.org 公式ブログ)</a></li>
            <li><a href="https://scrumdojo.cz/en/courses/professional-product-discovery-and-validation" target="_blank" rel="noopener">ダブルダイヤモンドを用いたPPDVコース構成の解説(ScrumDojo.cz)</a></li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: block;
}

/* スキップリンク */
.skip-link {
  position: absolute;
  top: -40px;
  left: 20px;
  background: var(--color-indigo);
  color: var(--color-paper-raised);
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 1000;
  text-decoration: none;
  font-weight: 600;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 16px;
}

/* サイドバー */
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
  color: var(--color-indigo);
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
  border-left: 2px solid transparent;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) {
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
.sidebar-nav a.active :deep(svg) {
  color: var(--color-indigo);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: calc(var(--global-nav-height) + 16px);
  left: 16px;
  z-index: 30;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  color: var(--color-ink);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.sidebar-toggle :deep(.iconify),
.sidebar-toggle :deep(svg) {
  font-size: 24px;
}

.sidebar-overlay {
  display: none;
}

/* メインコンテンツ */
.main-content {
  margin-left: var(--sidebar-width);
  max-width: 860px;
  padding: 48px 48px 96px;
  outline: none;
}

/* ヒーロー */
.hero {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 40px;
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-indigo);
  background: var(--color-indigo-tint);
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.hero-eyebrow :deep(.iconify),
.hero-eyebrow :deep(svg) {
  font-size: 15px;
}

h1 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-ink);
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}

.hero-lede {
  font-size: 17px;
  color: var(--color-ink-soft);
  line-height: 1.7;
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
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

/* セクション */
section {
  margin-bottom: 64px;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-forest);
  background: var(--color-forest-tint);
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 14px;
}

h2 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 20px;
  line-height: 1.35;
  border-bottom: 2px solid var(--color-paper-sunken);
  padding-bottom: 8px;
}

h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-indigo);
  margin: 32px 0 12px;
  line-height: 1.4;
}

h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 24px 0 8px;
  line-height: 1.4;
}

p {
  margin: 14px 0;
  line-height: 1.75;
}

ol {
  list-style: decimal;
  padding-left: 24px;
  margin: 16px 0;
}

ul {
  list-style: disc;
  padding-left: 24px;
  margin: 16px 0;
}

li {
  margin: 8px 0;
  line-height: 1.7;
}

/* テーブル */
.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  text-align: left;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

th {
  background: var(--color-paper-sunken);
  font-weight: 600;
  color: var(--color-ink);
  white-space: nowrap;
}

tr:last-child td {
  border-bottom: none;
}

/* コールアウト */
.callout {
  border-radius: 8px;
  padding: 18px 20px;
  margin: 24px 0;
  border-left: 4px solid;
}

.callout.practice {
  background: var(--color-gold-tint);
  border-left-color: var(--color-gold);
}

.callout.source {
  background: var(--color-forest-tint);
  border-left-color: var(--color-forest);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 10px;
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.source .callout-title {
  color: var(--color-forest);
}

.callout-title :deep(.iconify),
.callout-title :deep(svg) {
  font-size: 18px;
}

.callout ul, .callout ol {
  margin: 0;
  padding-left: 20px;
}

.callout li {
  margin: 6px 0;
  font-size: 14.5px;
}

/* Mermaid */
.mermaid-wrap {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
  margin: 24px 0;
}

.diagram-caption {
  font-size: 13px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 10px;
}

/* ステップリスト */
.step-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

.step-item {
  display: flex;
  gap: 16px;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 18px;
}

.step-num {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: var(--color-paper-raised);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
}

.step-body {
  flex: 1;
}

.step-title {
  font-weight: 700;
  font-size: 16px;
  color: var(--color-ink);
  margin-bottom: 6px;
}

.step-desc {
  font-size: 14.5px;
  color: var(--color-ink-soft);
  line-height: 1.6;
}

/* 参考文献 */
.ref-group {
  margin: 24px 0;
}

.ref-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
}

.ref-list li {
  margin: 10px 0;
  font-size: 15px;
}

.ref-name {
  font-weight: 600;
  color: var(--color-ink);
}

.ref-url {
  font-size: 13.5px;
  color: var(--color-ink-faint);
  word-break: break-all;
}

/* レスポンシブ */
@media (max-width: 980px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-toggle {
    display: flex;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  .sidebar-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .main-content {
    margin-left: 0;
    padding: 32px 20px 64px;
  }
}
</style>
