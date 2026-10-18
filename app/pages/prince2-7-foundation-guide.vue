<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { nextTick, ref } from "vue";
import { useActiveHeading } from "~/composables/useActiveHeading";

const LIGHT_THEME_VARS = {
  fontSize: "16px",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#2E3F72",
  secondaryColor: "#FAF1DF",
  secondaryBorderColor: "#B8802A",
  tertiaryColor: "#FFFFFF",
};

const DIAGRAM_INTEGRATED_STRUCTURE = `flowchart TB
accTitle: PRINCE2の統合構造
accDescr: 7つの原則・人・7つのプラクティス・7つのプロセスがPRINCE2の統合構造を構成し、テーラリングによって各プロジェクトに適応させる関係を示す図
A["7つの原則 Principles"] --> D["PRINCE2の統合構造"]
B["人 People"] --> D
C["7つのプラクティス Practices"] --> D
E["7つのプロセス Processes"] --> D
D --> F["テーラリング Tailoring"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,E box;
class D hub;
class F done;`;

const DIAGRAM_TOLERANCE_ESCALATION = `flowchart LR
accTitle: トレランスとエスカレーションの経路
accDescr: コーポレート/プログラムマネジメントがプロジェクトトレランス、プロジェクトボードがステージトレランス、プロジェクトマネージャーがワークパッケージトレランスを設定し、逸脱予測時は下位から上位へ例外報告としてエスカレーションされる関係を示す図
Corp["コーポレート/プログラムマネジメント"] -->|"プロジェクトトレランスを設定"| Board["プロジェクトボード"]
Board -->|"ステージトレランスを設定"| PM["プロジェクトマネージャー"]
PM -->|"ワークパッケージトレランスを設定"| TM["チームマネージャー"]
TM -->|"トレランス逸脱の予測"| PM
PM -->|"例外報告"| Board
Board -->|"トレランス逸脱の予測(プロジェクトレベル)"| Corp
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Corp,PM,TM box;
class Board hub;`;

const TOC_IDS = [
  "exam-overview",
  "what-is-prince2",
  "principles",
  "people",
  "practices",
  "management-products",
  "roles-responsibilities",
  "processes",
  "tailoring",
  "digital-data-management",
  "sustainability",
  "cross-mapping",
  "exam-tips",
  "references",
] as const;

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);
const activeId = useActiveHeading(TOC_IDS);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

useSeoMeta({
  title: "PRINCE2® Project Management Foundation (Version 7) 完全ガイド | PeopleCert公式資格対応",
  description: "PeopleCert PRINCE2 Project Management Foundation (Version 7) の出題範囲を、7つの原則・7つのプラクティス・7つのプロセス・役割と責任・People・デジタル&データマネジメント・サステナビリティまで初学者向けに解説する学習ガイド。",
});
</script>

<template>
  <div>
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      :aria-expanded="sidebarOpen"
      aria-controls="sidebar"
      aria-label="目次を開閉する"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div class="layout">
      <aside id="sidebar" class="sidebar" :class="{ 'is-open': sidebarOpen }" aria-label="目次">
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="brand-text">
            <div class="brand-title">PRINCE2® 完全ガイド</div>
            <div class="brand-subtitle">Foundation Version 7</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li class="nav-group-label">概要</li>
          <li><a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />試験の全体像</a></li>
          <li><a href="#what-is-prince2" :class="{ active: activeId === 'what-is-prince2' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />PRINCE2とは何か</a></li>

          <li class="nav-group-label">中核構造</li>
          <li><a href="#principles" :class="{ active: activeId === 'principles' }" @click="closeSidebar"><Icon name="tabler:target-arrow" aria-hidden="true" />7つの原則</a></li>
          <li><a href="#people" :class="{ active: activeId === 'people' }" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />People(人)</a></li>
          <li><a href="#practices" :class="{ active: activeId === 'practices' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" aria-hidden="true" />7つのプラクティス</a></li>
          <li><a href="#management-products" :class="{ active: activeId === 'management-products' }" @click="closeSidebar"><Icon name="tabler:box" aria-hidden="true" />マネジメント製品</a></li>
          <li><a href="#roles-responsibilities" :class="{ active: activeId === 'roles-responsibilities' }" @click="closeSidebar"><Icon name="tabler:id-badge" aria-hidden="true" />役割と責任</a></li>
          <li><a href="#processes" :class="{ active: activeId === 'processes' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />7つのプロセス</a></li>

          <li class="nav-group-label">実践と横断視点</li>
          <li><a href="#tailoring" :class="{ active: activeId === 'tailoring' }" @click="closeSidebar"><Icon name="tabler:adjustments" aria-hidden="true" />テーラリング</a></li>
          <li><a href="#digital-data-management" :class="{ active: activeId === 'digital-data-management' }" @click="closeSidebar"><Icon name="tabler:database" aria-hidden="true" />デジタル&amp;データマネジメント</a></li>
          <li><a href="#sustainability" :class="{ active: activeId === 'sustainability' }" @click="closeSidebar"><Icon name="tabler:leaf" aria-hidden="true" />サステナビリティの統合</a></li>
          <li><a href="#cross-mapping" :class="{ active: activeId === 'cross-mapping' }" @click="closeSidebar"><Icon name="tabler:arrows-split-2" aria-hidden="true" />原則×プラクティス×プロセスの関係</a></li>
          <li><a href="#exam-tips" :class="{ active: activeId === 'exam-tips' }" @click="closeSidebar"><Icon name="tabler:bulb" aria-hidden="true" />試験対策のポイント</a></li>
          <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・出典</a></li>
        </ul>
      </aside>

      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />PeopleCert公式資格 準拠ガイド</div>
          <h1>PRINCE2® Project Management Foundation (Version 7) 学習ガイド</h1>
          <p class="hero-lede">
            本ガイドは初学者が「なぜそうするのか」を理解しながら、出題範囲の各項目を体系的に押さえられるように構成しています。ASCII図は使用せず、フローチャートは Mermaid、比較・一覧情報は表を使用しています。
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">60問</div><div class="stat-label">選択式(Multiple Choice)</div></div>
            <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">試験時間・Closed book</div></div>
            <div class="stat-card"><div class="stat-number">60%</div><div class="stat-label">合格基準(36/60問正解)</div></div>
            <div class="stat-card"><div class="stat-number">14言語</div><div class="stat-label">対応言語(日本語を含む)</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>本ガイドは教育・学習支援を目的とした非公式の解説資料です。PRINCE2&reg;はAXELOS Limitedの登録商標です。正式な出題範囲・試験要項は必ず<a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-2/PRINCE2-7-foundation-3579" target="_blank" rel="noopener">PeopleCert公式サイト</a>でご確認ください。</span>
          </div>
        </div>

        <!-- ===================== 0. Exam Overview ===================== -->
        <section id="exam-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 00</div>
          <h2>試験の全体像(まずここを把握する)</h2>

          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>出題形式</td><td>選択式 (Multiple Choice) 60問</td></tr>
                <tr><td>試験時間</td><td>60分</td></tr>
                <tr><td>方式</td><td>Closed book(参考資料の持ち込み不可)</td></tr>
                <tr><td>合格基準</td><td>60% 以上(60問中36問以上正解)</td></tr>
                <tr><td>対応言語</td><td>英語・日本語を含む14言語</td></tr>
                <tr><td>認定更新</td><td>3年ごと。更新方法は次のいずれか: ①CPDルート = PeopleCert Plus の会員資格を3年間継続し、毎年20 CPD(継続的専門能力開発)ポイント(うち Professional Experience を5ポイント以上)を登録する、②更新期限までに同じProduct Suite内の別コースの試験に合格する、③更新期限までに元の試験に再合格する</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout note" data-variant="note" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足(V6→V7での構造変化)</div>
            <p>PRINCE2 7版では、旧版の「7つのテーマ(Themes)」が<strong>「7つのプラクティス(Practices)」</strong>に名称変更され、そのうち旧「Change」テーマが<strong>「Issues」プラクティス</strong>に改称されました。さらに新章として<strong>「People(人)」</strong>が追加され、<strong>サステナビリティ(持続可能性)</strong>がProgress/Business Case等の既存プラクティスに統合され、<strong>デジタル&amp;データマネジメント(Digital and Data)</strong>の視点が全体に組み込まれています。原則(Principles)7つ・プロセス(Processes)7つの<strong>数</strong>は旧版と同じですが、原則の名称は一部改められました(例:「Defined roles and responsibilities」→「Define roles, responsibilities and relationships」、「Tailor to suit the project environment」→「Tailor to suit the project」)。</p>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-2/PRINCE2-7-foundation-3579" target="_blank" rel="noopener">PeopleCert公式ページ</a></li>
              <li><a href="https://onlinepmcourses.com/prince2-7th-edition-the-top-10-changes-you-need-to-know/" target="_blank" rel="noopener">onlinepmcourses.com「Top 10 Changes」</a></li>
            </ul>
          </div>

          <h3>出題される知識領域(PeopleCert公式「学習内容」より)</h3>
          <ol>
            <li>Project Management Principles(7つの原則)</li>
            <li>Project Management Practices(7つのプラクティス)</li>
            <li>Project Management Processes(7つのプロセス)</li>
            <li>Roles and Responsibilities(役割と責任)</li>
            <li>People Management(人のマネジメント)</li>
            <li>Project Performance(サステナビリティ統合を含む)</li>
            <li>Digital and Data Management(デジタル&amp;データマネジメント)</li>
            <li>Communication(コミュニケーション)</li>
            <li>Tailoring(テーラリング)</li>
          </ol>
        </section>

        <!-- ===================== 1. What is PRINCE2 ===================== -->
        <section id="what-is-prince2">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
          <h2>PRINCE2とは何か / プロジェクトの文脈</h2>

          <p>PRINCE2(<strong>PR</strong>ojects <strong>IN</strong> <strong>C</strong>ontrolled <strong>E</strong>nvironments)は、英国発祥で世界的に採用されているプロジェクトマネジメント手法です。業種・規模を問わず適用できる「汎用フレームワーク」であり、公式マニュアル『Managing Successful Projects with PRINCE2』第7版が拠り所となります。</p>

          <ul>
            <li>プロジェクトの定義:「ビジネス上の成果物(プロダクト)を、合意されたビジネスケースにもとづいて創出するために編成された、一時的な組織」</li>
            <li><strong>プロジェクトは"一時的"</strong>であり、日常業務(BAU: Business As Usual)とは異なる。</li>
            <li>PRINCE2は<strong>プロセスベース</strong>の手法であり、原則・プラクティス・プロセスが相互に関係し合う構造を持つ。</li>
          </ul>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_INTEGRATED_STRUCTURE" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">PRINCE2の統合構造(原則・People・プラクティス・プロセス・テーラリング)</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <p>原則は「守るべき絶対条件」、プラクティスは「継続的に扱うべき観点」、プロセスは「実行の手順」と整理して覚えると混同しにくい。試験でも「これは原則か、プラクティスか」を問う設問が頻出する。</p>
          </div>
        </section>

        <!-- ===================== 2. Principles ===================== -->
        <section id="principles">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
          <h2>7つの原則(Principles)</h2>

          <p>原則はPRINCE2プロジェクトであるための<strong>必須条件</strong>です。7つすべてを満たさないプロジェクトは「PRINCE2ベース」を名乗れません。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>#</th><th>原則(英語)</th><th>原則(日本語)</th><th>要点</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Ensure Continued Business Justification</td><td>継続的なビジネス上の正当化</td><td>プロジェクトは常に「望ましさ(Desirability)」「実現可能性(Viability)」「達成可能性(Achievability)」を満たす必要がある</td></tr>
                <tr><td>2</td><td>Learn from Experience</td><td>経験からの学習</td><td>過去の教訓を取り入れ、自らの教訓も記録し継承する</td></tr>
                <tr><td>3</td><td>Define Roles, Responsibilities and Relationships</td><td>役割・責任・関係性の定義</td><td>ビジネス・ユーザー・サプライヤーの3つの利害関係者の視点を明示的に代表する体制を作る</td></tr>
                <tr><td>4</td><td>Manage by Stages</td><td>段階(ステージ)による管理</td><td>プロジェクトを管理可能な単位(マネジメントステージ)に分割し、段階ごとに計画・監視・統制する</td></tr>
                <tr><td>5</td><td>Manage by Exception</td><td>例外による管理</td><td>各レベルに許容範囲(トレランス)を委譲し、逸脱が予測される場合のみ上位へエスカレーションする</td></tr>
                <tr><td>6</td><td>Focus on Products</td><td>プロダクトへの焦点</td><td>「何を作るか」を起点に計画し、要求事項・品質基準を明確化する</td></tr>
                <tr><td>7</td><td>Tailor to Suit the Project</td><td>プロジェクトに合わせたテーラリング</td><td>規模・複雑さ・重要性・リスク等に応じて手法を調整する(方法自体は削らないが適用度合いを変える)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>原則の詳細解説</h3>

          <p><strong>① 継続的なビジネス上の正当化</strong></p>
          <ul>
            <li>「望ましさ」= コスト・便益・リスクのバランスが取れているか</li>
            <li>「実現可能性」= プロダクトを実際に提供できるか</li>
            <li>「達成可能性」= 提供後に期待した便益(ベネフィット)が実現できるか</li>
            <li>この正当化はビジネスケース(Business Case)practiceによって文書化・継続検証される。</li>
          </ul>
          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <p>ビジネスケースは「一度作って終わり」ではなく、各マネジメントステージ境界(Stage Boundary)で必ず見直す。正当化が崩れた時点でプロジェクトは中止すべきであり、これは失敗ではなく正しいガバナンスの証拠と理解する。</p>
          </div>

          <p><strong>② 経験からの学習</strong></p>
          <ul>
            <li>プロジェクト開始時:類似プロジェクトの教訓を探す</li>
            <li>実行中:教訓ログ(Lessons Log)に継続記録</li>
            <li>終結時:教訓報告(Lessons Report)として組織に還元</li>
          </ul>

          <p><strong>③ 明確な役割と責任</strong></p>
          <ul>
            <li>PRINCE2は「ビジネス」「ユーザー」「サプライヤー」の3視点を常に代表させることを要求する。</li>
            <li>詳細は本ガイド「6. 役割と責任」を参照。</li>
          </ul>

          <p><strong>④ 段階による管理</strong></p>
          <ul>
            <li>最低2つのマネジメントステージ(初期化ステージ+提供ステージ)が必要。</li>
            <li>ステージ数はリスク・不確実性の高さに応じて増減する(不確実性が高いほど、ステージを短く刻む)。</li>
          </ul>

          <p><strong>⑤ 例外による管理</strong></p>
          <ul>
            <li>トレランス(Tolerance)は7つの目標領域で設定される:<strong>時間(Time)・コスト(Cost)・品質(Quality)・スコープ(Scope)・リスク(Risk)・便益(Benefit)・サステナビリティ(Sustainability)</strong></li>
            <li>トレランスを超える(または超えると予測される)場合のみ、例外報告(Exception Report)により上位層へエスカレーションする。</li>
            <li>これにより、上位マネジメントは日常業務ではなく戦略的意思決定に集中できる。</li>
          </ul>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_TOLERANCE_ESCALATION" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">トレランスの委譲とエスカレーションの流れ</div>
          </div>

          <p><strong>⑥ プロダクトへの焦点</strong></p>
          <ul>
            <li>プロジェクト・プロダクト・ディスクリプション(Project Product Description)で最終成果物の要求事項・品質基準・受け入れ基準を定義する。</li>
            <li>ここから個々のプロダクト・ディスクリプション(Product Description)へブレイクダウンする「プロダクトベース・プランニング」につながる(詳細は「4.3 Plans」)。</li>
          </ul>

          <p><strong>⑦ テーラリング</strong></p>
          <ul>
            <li>テーラリングは「原則を省略すること」ではない。プラクティスの<strong>適用の厚み</strong>やプロセスの<strong>形式度</strong>を調整することを指す。</li>
            <li>小規模プロジェクトでは、複数の役割を1人が兼務したり、報告書を簡略化したりできる(ただし兼務不可の組み合わせがある。「6. 役割と責任」参照)。</li>
          </ul>
        </section>

        <!-- ===================== 3. People ===================== -->
        <section id="people">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 03</div>
          <h2>People(人) — V7で新設された章</h2>

          <p>PRINCE2 7版最大の変更点の一つが、この「People」章の新設です。従来版は手法・統制プロセスに重点を置いていましたが、V7では「プロジェクトを成功させるのは結局は人である」という前提を明示しました。</p>

          <h3>Peopleに関する3つの活動</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>活動</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>Leading Successful Change(効果的な変革のリード)</td><td>プロジェクトはアウトプット提供だけでなく、組織における行動・文化の変化を伴う。変革管理の観点(ステークホルダーの受容度、抵抗への対処)を統合する</td></tr>
                <tr><td>Leading Successful Teams(効果的なチームのリード)</td><td>チーム形成、動機づけ、心理的安全性、分散/バーチャルチームのマネジメントなど</td></tr>
                <tr><td>Communication(コミュニケーション)</td><td>ステークホルダーとの双方向コミュニケーションの計画と実践</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <p>「People」は独立した1プラクティスとしてではなく、7原則・7プラクティス・7プロセス<strong>すべてに横断的に関わる基盤</strong>として位置づけられている。試験では「Peopleはどのプラクティスに属するか」ではなく「プロジェクト全体にどう統合されるか」という視点で出題されやすい。</p>
          </div>

          <h3>コミュニケーション・マネジメント・アプローチ</h3>
          <ul>
            <li>ステークホルダーとの情報共有方法を定める文書 <strong>Communication Management Approach(コミュニケーション・マネジメント・アプローチ)</strong> はV6で導入された用語で、V7でもそのまま引き継がれている(V5では「Communication Management Strategy」と呼ばれていた)。</li>
            <li>内容:誰に・何を・いつ・どの手段で・誰が責任を持つか、を定義する。</li>
          </ul>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.scribd.com/document/799374849/Managing-Successful-Projects-With-PRINCE2-7-Watermarked" target="_blank" rel="noopener">Managing Successful Projects with PRINCE2 7th Edition 目次(scribd)</a></li>
              <li><a href="https://www.knowledgetrain.co.uk/project-management/prince2/prince2-manual-managing-successful-projects-with-prince2" target="_blank" rel="noopener">knowledgetrain.co.uk PRINCE2マニュアル解説</a></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: block;
}

.sidebar {
  position: fixed;
  top: var(--global-nav-height, 0px);
  left: 0;
  width: 288px;
  height: calc(100vh - var(--global-nav-height, 0px));
  overflow-y: auto;
  background: var(--color-paper-raised, #ffffff);
  border-right: 1px solid var(--color-border, #dfe3ea);
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
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 19px;
  color: var(--color-ink, #161b26);
  letter-spacing: 0.02em;
}

.brand-text .brand-subtitle {
  font-size: 14px;
  color: var(--color-ink-faint, #8a93a3);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav .nav-group-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-faint, #8a93a3);
  letter-spacing: 0.06em;
  margin: 22px 0 8px;
  padding-left: 12px;
  text-transform: uppercase;
}

.sidebar-nav .nav-group-label:first-child {
  margin-top: 0;
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
  color: var(--color-ink-soft, #4b5566);
  font-size: 14px;
  line-height: 1.4;
  text-decoration: none;
  transition: all 0.15s ease;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken, #eef0f4);
  color: var(--color-ink, #161b26);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint, #eef1f8);
  color: var(--color-indigo, #2e3f72);
  font-weight: 600;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-indigo, #2e3f72);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 30;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.main-content {
  margin-left: 288px;
  padding: 56px 72px 120px;
  max-width: 980px;
}

.hero {
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  padding-bottom: 40px;
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-indigo, #2e3f72);
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

h1 {
  font-family: var(--font-display, serif);
  font-size: 38px;
  line-height: 1.25;
  color: var(--color-ink, #161b26);
  margin: 0 0 16px;
  font-weight: 700;
}

.hero-lede {
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-ink-soft, #4b5566);
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  border: 1px solid var(--color-border, #dfe3ea);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 10px;
  padding: 18px 20px;
}

.stat-card .stat-number {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 28px;
  color: var(--color-indigo, #2e3f72);
  line-height: 1.1;
}

.stat-card .stat-label {
  font-size: 14px;
  color: var(--color-ink-soft, #4b5566);
  margin-top: 6px;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--color-info-border, #c7d1ea);
  background: var(--color-info-bg, #eef1f8);
  color: var(--color-info-text, #2e3f72);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 14px;
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

section {
  margin-top: 64px;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-indigo, #2e3f72);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-display, serif);
  font-size: 26px;
  line-height: 1.35;
  color: var(--color-ink, #161b26);
  margin: 0 0 20px;
  font-weight: 700;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  padding-bottom: 12px;
}

h3 {
  font-size: 19px;
  line-height: 1.4;
  color: var(--color-ink, #161b26);
  margin: 32px 0 14px;
  font-weight: 600;
}

p {
  margin: 0 0 18px;
  line-height: 1.75;
  color: var(--color-ink, #161b26);
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 10px;
  margin: 0 0 24px;
  max-width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  line-height: 1.6;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  vertical-align: top;
}

th {
  background: var(--color-paper-sunken, #eef0f4);
  color: var(--color-ink, #161b26);
  font-weight: 600;
  white-space: nowrap;
}

tr:last-child td {
  border-bottom: none;
}

.callout {
  border-left: 4px solid var(--color-indigo, #2e3f72);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 0 8px 8px 0;
  padding: 16px 20px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.callout.practice {
  border-left-color: var(--color-forest, #1b6e6a);
  background: var(--color-forest-tint, #e7f3f2);
}

.callout.source {
  border-left-color: var(--color-gold, #8a5b10);
  background: var(--color-gold-tint, #faf1df);
}

.callout.note {
  border-left-color: var(--color-plum, #8c3a5c);
  background: var(--color-plum-tint, #f6eaef);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.callout.practice .callout-title { color: var(--color-forest, #1b6e6a); }
.callout.source .callout-title { color: var(--color-gold, #8a5b10); }
.callout.note .callout-title { color: var(--color-plum, #8c3a5c); }

.callout p:last-child {
  margin-bottom: 0;
}

.callout ul {
  margin: 0;
  padding-left: 20px;
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

.mermaid-wrap {
  margin: 28px 0;
  padding: 20px;
  background: var(--color-paper-raised, #ffffff);
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.diagram-caption {
  font-size: 13px;
  color: var(--color-ink-faint, #8a93a3);
  text-align: center;
  margin-top: 12px;
}

@media (max-width: 980px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-toggle {
    display: flex;
  }

  .main-content {
    margin-left: 0;
    padding: 36px 20px 80px;
  }

  .stat-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
