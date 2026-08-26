<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "what-is-cal1",
  "track-position",
  "certification-steps",
  "learning-objectives",
  "course-structure",
  "who-should-attend",
  "cal1-vs-cal2",
  "trainer-quality",
  "renewal-seu",
  "learning-roadmap",
  "faq",
  "best-practices-summary",
  "references"
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
  title: "CAL 1® 認定資格 完全ガイド | Certified Agile Leader 1 とは",
  description: "Scrum Alliance Certified Agile Leader 1 (CAL 1) の公式情報にもとづく、初学者向けの学習ガイド。4つの学習目標領域、認定取得の流れ、資格更新(SEU)の仕組みをMermaid図解と出典付きで解説。",
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

const DIAGRAM_TRACK_POSITION = `flowchart LR
    M["事前推奨知識(Agile Manifestoの理解)"] --> C1["CAL 1(前提条件なし)"]
    C1 --> C2["CAL 2(CAL1取得が前提条件)"]
    C1 --> R1["資格更新(2年ごとにSEU取得)"]
    C2 --> R2["資格更新(2年ごとにSEU取得)"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class M,R1,R2 box;
class C1,C2 hub;`;

const DIAGRAM_CERT_STEPS = `flowchart TD
    S1["Step1: コースを探す(認定トレーナーによるCAL1講座を検索)"] --> S2["Step2: 受講する(対面 または ライブオンラインで参加)"]
    S2 --> S3["Step3: コース要件を満たす(出席・積極的参加)"]
    S3 --> S4["Step4: 認定を取得(デジタルバッジが発行される)"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3 box;
class S4 done;`;

const DIAGRAM_OBJECTIVES_FLOW = `flowchart TD
    P1["1.The Case for Agile Leadership(アジャイルリーダーシップの必要性)"] --> P2["2.Agile Leadership in Action(実践におけるリーダーシップ)"]
    P2 --> P3["3.Leading Agile Teams(アジャイルチームのリード)"]
    P3 --> P4["4.Leading Agile Organizations(アジャイル組織のリード)"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P1,P2,P3,P4 box;`;

const DIAGRAM_DAY_STRUCTURE = `flowchart LR
    subgraph Day1["Day1: 自己内省とリーダーとしての在り方"]
        D1a["価値観・信念の探求"] --> D1b["自分のリーダーシップスタイルの認識"]
        D1b --> D1c["チームをエンパワーするスキルの習得"]
    end
    subgraph Day2["Day2: チームと組織のリード"]
        D2a["ハイパフォーマンスチームの構築"] --> D2b["アジャイルに適合する文化の探求"]
        D2b --> D2c["組織のプロセス・ガバナンスの適応"]
        D2c --> D2d["チェンジモデルとアジャイル変革"]
    end
    Day1 --> Day2

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class D1a,D1b,D1c,D2a,D2b,D2c,D2d box;`;

const DIAGRAM_CAL1_VS_CAL2 = `flowchart LR
    C1["CAL 1: 基礎・必要性の理解"] -->|"前提資格として取得"| C2["CAL 2: 実践・組織戦略への応用"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class C1 box;
class C2 hub;`;

const DIAGRAM_RENEWAL_CYCLE = `flowchart TD
    A["CAL1取得"] --> B["2年間の有効期間"]
    B --> C["経路1(通常更新): 学習活動を通じてSEUを蓄積"]
    C --> D["会員ダッシュボードでSEUを記録"]
    D --> E["更新申請 + 更新手数料の支払い"]
    E --> F["資格更新完了(再び2年間有効)"]
    B --> G["経路2: 別のScrum Alliance認定コースを修了"]
    G --> H["SEU提出・更新手数料なしで自動更新"]
    H --> F

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,G,H box;
class F done;`;

const DIAGRAM_ROADMAP = `flowchart TD
    Pre["受講前準備"] --> Pre1["Agile Manifestoを読む"]
    Pre --> Pre2["自組織のリーダーシップ課題を言語化しておく"]
    Pre1 --> During["受講中(Day1-Day2, 合計16時間)"]
    Pre2 --> During
    During --> Post["受講後の実践"]
    Post --> Post1["職場で新しいリーダーシップスタイルを小さく試す"]
    Post --> Post2["学習活動を記録しSEUとして蓄積する"]
    Post --> Post3["準備が整えばCAL2でさらに深化させる"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class Pre,Pre1,Pre2,During,Post,Post1,Post2,Post3 box;`;
</script>

<template>
  <div class="guide-page">
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
      <i class="ti ti-menu-2" aria-hidden="true" />
    </button>

    <div class="layout">
      <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
        <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">CAL 1® 完全ガイド</div>
        <div class="brand-subtitle">Certified Agile Leader 1</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li><a href="#what-is-cal1" :class="{ active: activeId === 'what-is-cal1' }" @click="closeSidebar" ><i class="ti ti-certificate" aria-hidden="true"/>CAL 1とは</a></li>
      <li><a href="#track-position" :class="{ active: activeId === 'track-position' }" @click="closeSidebar"><i class="ti ti-git-branch" aria-hidden="true"/>資格制度上の位置づけ</a></li>
      <li><a href="#certification-steps" :class="{ active: activeId === 'certification-steps' }" @click="closeSidebar"><i class="ti ti-route" aria-hidden="true"/>認定取得までの流れ</a></li>
      <li><a href="#learning-objectives" :class="{ active: activeId === 'learning-objectives' }" @click="closeSidebar"><i class="ti ti-list-check" aria-hidden="true"/>4つの学習目標領域</a></li>
      <li><a href="#course-structure" :class="{ active: activeId === 'course-structure' }" @click="closeSidebar"><i class="ti ti-calendar-event" aria-hidden="true"/>コース構成(Day1/Day2)</a></li>
      <li><a href="#who-should-attend" :class="{ active: activeId === 'who-should-attend' }" @click="closeSidebar"><i class="ti ti-clipboard-check" aria-hidden="true"/>受講対象者</a></li>
      <li><a href="#cal1-vs-cal2" :class="{ active: activeId === 'cal1-vs-cal2' }" @click="closeSidebar"><i class="ti ti-timeline" aria-hidden="true"/>CAL1とCAL2の比較</a></li>
      <li><a href="#trainer-quality" :class="{ active: activeId === 'trainer-quality' }" @click="closeSidebar"><i class="ti ti-building-bank" aria-hidden="true"/>講師の品質基準</a></li>
      <li><a href="#renewal-seu" :class="{ active: activeId === 'renewal-seu' }" @click="closeSidebar"><i class="ti ti-refresh" aria-hidden="true"/>資格更新とSEU</a></li>
      <li><a href="#learning-roadmap" :class="{ active: activeId === 'learning-roadmap' }" @click="closeSidebar"><i class="ti ti-map-2" aria-hidden="true"/>学習ロードマップ</a></li>
      <li><a href="#faq" :class="{ active: activeId === 'faq' }" @click="closeSidebar"><i class="ti ti-clipboard-text" aria-hidden="true"/>よくある誤解(FAQ)</a></li>
      <li><a href="#best-practices-summary" :class="{ active: activeId === 'best-practices-summary' }" @click="closeSidebar"><i class="ti ti-flag-3" aria-hidden="true"/>ベストプラクティスまとめ</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><i class="ti ti-link" aria-hidden="true"/>参考文献・ソース</a></li>
    </ul>
      </nav>

      <main id="main-content" class="main-content" tabindex="-1">
        <div class="hero">
      <div class="hero-eyebrow"><i class="ti ti-award" aria-hidden="true"/>Scrum Alliance® 公式情報にもとづく非公式ガイド</div>
      <h1>Certified Agile Leader® 1 (CAL 1™) 完全ガイド</h1>
      <p class="hero-lede">
        初学者向けステップバイステップ解説
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">16時間</div><div class="stat-label">ライブ講座(2〜3日間)</div></div>
        <div class="stat-card"><div class="stat-number">試験なし</div><div class="stat-label">出席と積極的な参加で認定</div></div>
        <div class="stat-card"><div class="stat-number">4領域</div><div class="stat-label">学習目標(Learning Objectives)の整理例 [7]</div></div>
        <div class="stat-card"><div class="stat-number">2年</div><div class="stat-label">資格の有効期間(SEU更新)</div></div>
      </div>

      <div class="disclaimer-box">
        <i class="ti ti-info-circle" aria-hidden="true"/>
        <p style="margin-bottom:10px;"><strong>対象読者:</strong> これから CAL 1 の受講を検討している方、アジャイルリーダーシップという概念に初めて触れる方</p><p style="margin-bottom:0;"><strong>本ガイドの立ち位置:</strong> 第1〜3章は Scrum Alliance 公式サイトおよびトレーニング提供元の公開情報に基づく事実整理です。第4章の「ベストプラクティス」は、公式に明記されている4つの学習領域(Learning Objectives)の名称・範囲を土台にしつつ、アジャイルリーダーシップ領域で一般的に参照される実践知(コーチング、チェンジマネジメント、組織文化論など)を組み合わせた実務解説です。両者を混同しないよう、事実部分には出典番号 <code>[n]</code> を付けています。巻末の<a href="#references">「参考文献・ソース一覧」</a>で確認できます。</p>
      </div>
    </div>

    <!-- ===================== 01. What is CAL 1 ===================== -->
    <section id="what-is-cal1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-certificate" aria-hidden="true"/>SECTION 01</div>
      <h2>CAL 1とは何か(概要)</h2>

      <p>Certified Agile Leader® 1 (CAL 1™) は、Scrum Alliance® が提供する「アジャイルリーダーシップ」領域の入門資格です [1]。重要な前提として、<strong>CAL 1には筆記試験・選択式試験が存在しません</strong>。認定は、<strong>16時間のライブ講座への出席と積極的な参加</strong>によって付与されます [1] [7]。これが全コースに共通する要件です。なお、トレーナーによっては事前課題・事後課題が別途課される場合がありますが、これはトレーナーごとの運用であり、Scrum Alliance が全 CAL 1 に共通して定める認定条件ではありません [7]。したがって、いわゆる「出題内容」に該当するものは存在せず、代わりに<strong>Scrum Alliance が公式に定める学習目標(Learning Objectives)</strong>が、コースで扱われる内容の枠組みになります [1]。この学習目標を、トレーニング提供元の一つである PM-Partners のコースページでは4つの領域に整理して紹介しています [7]。本ガイドではこの4領域の整理を軸に、初学者にもわかりやすく解説していきます。</p>

      <h3>基本情報一覧</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th><th>出典</th></tr></thead>
          <tbody>
            <tr><td>正式名称</td><td>Certified Agile Leader® 1 (CAL 1™)</td><td>[1]</td></tr>
            <tr><td>認定団体</td><td>Scrum Alliance®(2001年設立の非営利団体)</td><td>[1] [19]</td></tr>
            <tr><td>前提条件</td><td>なし(アジャイル/Scrumの基礎知識があると望ましい)</td><td>[1]</td></tr>
            <tr><td>受講形式</td><td>対面 または ライブオンライン(同期型)</td><td>[1]</td></tr>
            <tr><td>受講時間</td><td>16時間(多くは2〜3日間に分けて実施)</td><td>[1]</td></tr>
            <tr><td>試験の有無</td><td>なし(筆記・選択式試験は実施されない)</td><td>[7]</td></tr>
            <tr><td>認定条件</td><td>16時間の講座へのフルタイム出席と積極的な参加(トレーナーが指定する場合は事前/事後課題も)</td><td>[1] [7]</td></tr>
            <tr><td>取得できるもの</td><td>デジタル認定バッジ + Scrum Alliance 2年間の専門会員資格</td><td>[17]</td></tr>
            <tr><td>有効期間</td><td>2年間(SEU取得により更新可能)</td><td>[17]</td></tr>
            <tr><td>資格トラック上の位置</td><td>Agile Leaderトラックの第1階層(CAL 2の前提資格)</td><td>[17]</td></tr>
            <tr><td>費用目安</td><td>トレーナー・地域・通貨により変動する。受講料は各トレーナーのコースページで確認する(税の内外表記もトレーナーごとに異なる)</td><td>[7]</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><i class="ti ti-info-circle" aria-hidden="true"/>補足</div>
        <p><strong>初学者向けポイント</strong>: 「資格試験に合格する」のではなく「講座に参加してワークを通じて自分のリーダーシップを見つめ直す」タイプの資格です。この点は CSM(Certified ScrumMaster)などの知識試験型資格とは大きく性質が異なります。</p>
      </div>
    </section>

    <!-- ===================== 02. Track position ===================== -->
    <section id="track-position">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-git-branch" aria-hidden="true"/>SECTION 02</div>
      <h2>資格制度における位置づけ</h2>

      <p>CAL 1 は、Scrum Alliance の「Agile Leader トラック」の入口にあたる資格です。2024年、Scrum Alliance は旧来の3階層プログラム(CAL-Essentials / CAL-Teams / CAL-Organizations)を、CAL 1・CAL 2 の2階層に再編しました [8] [9]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_TRACK_POSITION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" /><template #fallback><p class="diagram-loading">図を読み込み中…</p></template></ClientOnly></div>
        <div class="diagram-caption">資格制度における CAL 1 の位置づけ</div>
      </div>

      <h3>旧プログラムとの対応関係</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>旧プログラム(〜2024年)</th><th>新プログラム(2024年〜)</th><th>補足</th></tr></thead>
          <tbody>
            <tr><td>CAL-Essentials (CAL-E)</td><td>CAL 1 に統合</td><td>学習目標はCAL1に引き継がれた</td></tr>
            <tr><td>CAL-Teams (CAL-T)</td><td>CAL 1 に統合</td><td>同上</td></tr>
            <tr><td>CAL-Organizations (CAL-O)</td><td>CAL 1 および CAL 2 に再編</td><td>内容がより高度なCAL2にも分散</td></tr>
            <tr><td>(新設)</td><td>CAL 2</td><td>CAL1取得後に受講可能な発展課程</td></tr>
          </tbody>
        </table>
      </div>

      <p>出典: [9]。この再編について Scrum Alliance は公式発表で、市場調査およびトレーナー・受講生からのフィードバックを踏まえ、より一貫性のある学習パスを提供する目的で実施したと説明しています [15] [17]。</p>
    </section>

    <!-- ===================== 03. Certification steps ===================== -->
    <section id="certification-steps">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-route" aria-hidden="true"/>SECTION 03</div>
      <h2>認定取得までの4ステップ</h2>

      <p>Scrum Alliance の公式ページでは、認定取得までの流れを次の4ステップとして案内しています [18]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_CERT_STEPS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" /><template #fallback><p class="diagram-loading">図を読み込み中…</p></template></ClientOnly></div>
        <div class="diagram-caption">認定取得までの4ステップ</div>
      </div>

      <h3>各ステップの詳細</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ステップ</th><th>やること</th><th>初学者向けの補足</th></tr></thead>
          <tbody>
            <tr><td>Step 1: コースを探す</td><td>Scrum Alliance の Course Search で「CAL 1」を絞り込み検索する [1]</td><td>CAL トレーナーは個々に独立した事業として運営されており、Scrum Alliance が認定団体としてその品質を担保している [1]</td></tr>
            <tr><td>Step 2: 受講する</td><td>16時間のライブ講座(対面/オンライン)に参加する [1]</td><td>どのトレーナーのコースを選んでも、修了すれば同一の「Scrum Alliance公認資格」を取得できる [1]</td></tr>
            <tr><td>Step 3: コース要件を満たす</td><td>16時間の講座に出席し、演習に積極的に参加する [1] [7]</td><td>一部のトレーナーは受講2週間前に事前課題(自己診断アンケートなど)を送付する。課題の有無はトレーナーごとに異なる [7]</td></tr>
            <tr><td>Step 4: 認定を取得</td><td>ライセンス契約に同意し、デジタルバッジをダウンロードする [9]</td><td>バッジはLinkedInなどの職務経歴に添付し、対外的に資格を証明する材料として使える</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 04. Learning objectives ===================== -->
    <section id="learning-objectives">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-list-check" aria-hidden="true"/>SECTION 04</div>
      <h2>学習内容: 4つの学習目標領域</h2>

      <p>CAL 1 の学習目標(Learning Objectives)は Scrum Alliance が公式に定めていますが [1]、公式サイトでは箇条書きで提示されており、領域としての区分は明記されていません。トレーニング提供元の一つである PM-Partners のコースページでは、この学習目標を<strong>4つの領域</strong>に整理して紹介しています [7]。この4領域は、「個人の内省 → 個人の実践 → チームへの適用 → 組織への適用」という流れで構成されています [7]。なお、この4領域を Day 1 に前半2領域(個人にフォーカス)、Day 2 に後半2領域(チーム・組織にフォーカス)として割り当てる進め方は、トレーニング提供元の一つである PM-Partners が公開しているコース例です [7] [13]。日程配分は Scrum Alliance が全 CAL 1 に共通で定めるものではなく、トレーナーごとに異なります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_OBJECTIVES_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" /><template #fallback><p class="diagram-loading">図を読み込み中…</p></template></ClientOnly></div>
        <div class="diagram-caption">4つの学習目標領域の関係</div>
      </div>

      <p>以下、各領域を初学者向けに詳しく解説します。<strong>「学習目標の範囲」は出典[7](PM-Partnersのコースページ)に基づく事実、「ベストプラクティス」は一般的なアジャイルリーダーシップ実践知に基づく補足解説</strong>として区別しています。</p>

      <h3>4.1 The Case for Agile Leadership(アジャイルリーダーシップの必要性を理解する)</h3>

      <p><strong>学習目標の範囲</strong> [7]: 効果的なアジャイルリーダーシップに必要なメリットとマインドセットの転換を理解する。アジャイルリーダーシップが従来型のリーダーシップとどう違うのか、また現代的な課題にどう対応するのかを探求する。</p>

      <p><strong>初学者向け解説</strong>: 従来型のリーダーシップは「上位者が計画し、下位者がその通りに実行する(指揮統制型)」という前提に立っていることが多いですが、変化の速いビジネス環境ではこのモデルが機能しにくくなっています。CAL 1 のこの領域では、なぜ「権限を委譲し、チームの自律性を引き出す」スタイルへの転換が必要なのかを、リーダー自身の価値観・信念の棚卸しから出発して学びます [7]。</p>

      <p><strong>ベストプラクティス(実務での取り組み方の例)</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>プラクティス</th><th>具体的な進め方</th></tr></thead>
          <tbody>
            <tr><td>自分のリーダーシップの前提を言語化する</td><td>「メンバーが自律的に動けない理由」を環境要因とメンバー要因に分けて棚卸しする</td></tr>
            <tr><td>VUCA環境を前提にした意思決定に慣れる</td><td>全てを事前に計画するのではなく、小さく試して学ぶサイクル(検査と適応)を業務プロセスに組み込む</td></tr>
            <tr><td>心理的安全性を優先事項として扱う</td><td>1on1やチーム会議で「反対意見を歓迎する」姿勢を明示的に伝える</td></tr>
            <tr><td>変化への抵抗を個人攻撃と捉えない</td><td>抵抗は「変化がもたらす不確実性への自然な反応」と捉え、対話の入り口にする</td></tr>
          </tbody>
        </table>
      </div>

      <h3>4.2 Agile Leadership in Action(実践におけるアジャイルリーダーシップ)</h3>

      <p><strong>学習目標の範囲</strong> [7]: リーダーシップフレームワークを学び、個人としての有効性を高める。チームの能力を伸ばすための重要なリーダーシップスキルを開発する。</p>

      <p><strong>初学者向け解説</strong>: 「わかる」を「できる」に変える領域です。前半で得た気づきを、実際の行動パターンに落とし込みます。具体的には、自分の言動が周囲にどう影響しているかへの自己認識を高め、フィードバックの与え方・受け取り方、目標設定の仕方など、日々のマネジメント行動に反映できるスキルを養います。</p>

      <p><strong>ベストプラクティス</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>プラクティス</th><th>具体的な進め方</th></tr></thead>
          <tbody>
            <tr><td>フィードバックを「評価」ではなく「観察+影響+依頼」で伝える</td><td>例: 「(観察)昨日の会議で発言が少なかった → (影響)議論の幅が狭くなった → (依頼)次回は一言でも意見をもらえると助かる」という順で伝える</td></tr>
            <tr><td>自分の権限委譲レベルを可視化する</td><td>タスクごとに「指示する / 説得する / 相談する / 合意する / 助言する / 委任する」のどのレベルで任せているかを明示する(Management 3.0 の Delegation Poker などが実務でよく参照される)</td></tr>
            <tr><td>1on1を「進捗確認」から「成長支援」へ転換する</td><td>質問を「何が終わった?」ではなく「何を学んだ?次に何を試したい?」に変える</td></tr>
            <tr><td>自分のリーダーシップスタイルをメンバーの成熟度に合わせて可変にする</td><td>経験の浅いメンバーには具体的な指示を、経験豊富なメンバーには権限委譲を、状況に応じて使い分ける(状況対応リーダーシップの考え方)</td></tr>
          </tbody>
        </table>
      </div>

      <h3>4.3 Leading Agile Teams(アジャイルチームをリードする)</h3>

      <p><strong>学習目標の範囲</strong> [7]: 高パフォーマンスなチームを構築・維持するためのツールと手法を学ぶ。チームが直面する課題への対処法や、機能横断的なコラボレーションの促進方法を学ぶ。</p>

      <p><strong>初学者向け解説</strong>: 個人からチームへスコープが広がる領域です。チームは自然に高パフォーマンスになるわけではなく、心理的安全性、共通の目的、健全な対立、相互の説明責任といった要素が意図的に育成される必要があります。CAL 1 ではこうしたチームビルディングの視点と、機能横断チーム特有の課題(職能の壁、優先順位の対立など)への対処法を扱います。</p>

      <p><strong>ベストプラクティス</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>プラクティス</th><th>具体的な進め方</th></tr></thead>
          <tbody>
            <tr><td>チームの目的(Why)を繰り返し言語化する機会を作る</td><td>スプリントレビューやふりかえりの冒頭で「何のためにこの仕事をしているか」を再確認する</td></tr>
            <tr><td>対立を「悪いもの」として避けない</td><td>タスク(業務上)の対立と人間関係の対立を切り分け、前者は歓迎する文化を作る</td></tr>
            <tr><td>チームの自律性の範囲を明確にする</td><td>「チームが自分たちで決められること」と「エスカレーションが必要なこと」の境界線を最初に合意しておく</td></tr>
            <tr><td>クロスファンクショナルな協働を阻む構造要因を取り除く</td><td>職能別の評価制度やレポートラインがチームの一体感を阻害していないか点検する</td></tr>
            <tr><td>心理的安全性を継続的に測定する</td><td>定期的な匿名アンケートやふりかえりで、発言のしやすさをチェックする</td></tr>
          </tbody>
        </table>
      </div>

      <h3>4.4 Leading Agile Organizations(アジャイル組織をリードする)</h3>

      <p><strong>学習目標の範囲</strong> [7]: 組織の俊敏性を高め、変化を効果的に導く上での「文化」「組織構造」「リーダーシップ」の相互作用を検討する。</p>

      <p><strong>初学者向け解説</strong>: スコープがチームから組織全体へと広がる、CAL 1 の総仕上げにあたる領域です。個々のチームがどれだけ俊敏でも、組織のプロセス・ポリシー・ガバナンス・評価制度がそれに追いついていなければ、俊敏性は頭打ちになります。ここでは組織文化がどのように形成され、どうすればより適応的な方向へ変化させられるか、また変革(トランスフォーメーション)を進める際のモデルや、変化への抵抗にどう向き合うかを扱います。</p>

      <p><strong>ベストプラクティス</strong>:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>プラクティス</th><th>具体的な進め方</th></tr></thead>
          <tbody>
            <tr><td>「見える文化」と「見えない前提」を切り分けて観察する</td><td>制度や儀式(見える部分)だけでなく、「本当は何が評価されているか」という暗黙の前提(見えない部分)を観察する(組織文化の氷山モデルの考え方)</td></tr>
            <tr><td>変革を一度きりのプロジェクトではなく継続的な旅として設計する</td><td>短期的な成功体験(クイックウィン)を積み重ね、その都度組織に周知して勢いを維持する(コッターの変革8段階プロセスなどが実務でよく参照される)</td></tr>
            <tr><td>制度面の障害を早期に洗い出す</td><td>評価制度、予算編成サイクル、承認プロセスなど、アジャイルな働き方と矛盾する既存制度を棚卸しする</td></tr>
            <tr><td>抵抗勢力ではなく抵抗の「理由」に注目する</td><td>抵抗する人が失うと感じているもの(役割、専門性、安定)を具体的に把握し、そこに向き合う対話を設計する</td></tr>
            <tr><td>データに基づく政策転換の仕組みを作る</td><td>意思決定の根拠を「役職の権限」から「チームの成果指標や顧客フィードバック」へ徐々にシフトさせる</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 05. Course structure ===================== -->
    <section id="course-structure">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-calendar-event" aria-hidden="true"/>SECTION 05</div>
      <h2>コース構成: Day1 / Day2 の流れ</h2>

      <p>以下は、トレーニング提供元の一つである PM-Partners が公開している2日間構成の例です [13]。16時間という総時間と、最新版の CAL 1 学習目標(Learning Objectives)への対応は全コース共通ですが、日程への割り振り方はトレーナーごとに異なります [1] [6]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_DAY_STRUCTURE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" /><template #fallback><p class="diagram-loading">図を読み込み中…</p></template></ClientOnly></div>
        <div class="diagram-caption">Day1 / Day2 の構成例</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>Day</th><th>フォーカス</th><th>主な内容</th></tr></thead>
          <tbody>
            <tr><td>Day 1</td><td>自己内省(Self)</td><td>自分の価値観・信念の探求、「アジャイルリーダーとしての自分」の自己認識、チームをエンパワーし支援するための基本スキルの習得 [13]</td></tr>
            <tr><td>Day 2</td><td>チーム・組織(Team / Org)</td><td>高パフォーマンスチームの構築と維持、アジャイルと親和性の高い文化的基盤の探求、適応が必要な組織のプロセス・ポリシー・ガバナンスモデルの検討、変革モデルとアジャイルトランスフォーメーションの課題への取り組み [13]</td></tr>
          </tbody>
        </table>
      </div>

      <p>なお、PM-Partners のコース例では受講開始の約2週間前に事前課題(所要時間の目安は約1時間)が送付され、完了しておくことが推奨されています [13]。事前課題の有無・内容はトレーナーごとの運用であり、Scrum Alliance が全 CAL 1 に共通して定める認定条件ではありません [1] [7]。</p>
    </section>

    <!-- ===================== 06. Who should attend ===================== -->
    <section id="who-should-attend">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-clipboard-check" aria-hidden="true"/>SECTION 06</div>
      <h2>受講対象者とレディネスチェック</h2>

      <h3>想定される受講対象者 [1]</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>対象者カテゴリ</th><th>具体例</th></tr></thead>
          <tbody>
            <tr><td>ロールベース</td><td>スクラムマスター、マネージャー、シニアディレクター、経営層(C-suite)</td></tr>
            <tr><td>支援職</td><td>アジャイルコーチ、コンサルタント</td></tr>
            <tr><td>その他</td><td>業種を問わず、人をリードしている、またはこれからリードしたいと考えているすべての人</td></tr>
          </tbody>
        </table>
      </div>

      <h3>受講前レディネスチェック</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>チェック項目</th><th>補足</th></tr></thead>
          <tbody>
            <tr><td>Agile Manifesto(アジャイルソフトウェア開発宣言)の4つの価値観・12の原則に目を通したか</td><td>前提条件ではないが、Scrum Allianceが受講前の一読を推奨している [1]</td></tr>
            <tr><td>自組織で直面しているリーダーシップ課題を1〜2文で言語化できるか</td><td>ワークショップ形式のため、具体的な課題を持ち込むと学びが深まる</td></tr>
            <tr><td>16時間(2〜3日)のライブセッションにフルタイムで参加できるスケジュールを確保できるか</td><td>認定条件が「出席と積極的な参加」であるため、部分参加では要件を満たせない可能性がある [7]</td></tr>
            <tr><td>事前課題(送付された場合)に取り組む時間(目安1時間程度)を確保できるか</td><td>[13]</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 07. CAL1 vs CAL2 ===================== -->
    <section id="cal1-vs-cal2">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-timeline" aria-hidden="true"/>SECTION 07</div>
      <h2>CAL 1 と CAL 2 の比較</h2>

      <div class="diagram-card">
        <div class="mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_CAL1_VS_CAL2" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" /><template #fallback><p class="diagram-loading">図を読み込み中…</p></template></ClientOnly></div>
        <div class="diagram-caption">CAL 1 から CAL 2 への発展</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>比較項目</th><th>CAL 1</th><th>CAL 2</th></tr></thead>
          <tbody>
            <tr><td>焦点</td><td>アジャイルリーダーシップの基礎・必要性の理解 [1]</td><td>CAL1の学びを組織戦略・提供価値・自身の成長へ応用する [10]</td></tr>
            <tr><td>前提条件</td><td>なし [1]</td><td>CAL 1 取得済みであること [10] [17]</td></tr>
            <tr><td>主な学習領域の例</td><td>4つの学習領域(第4章参照) [7]</td><td>戦略と実行の連携、知識労働者のリード、組織設計とガバナンス、文化変容、変革への抵抗克服、自己マネジメント、意思決定と権限委譲、対立解決 等(トレーナーが提供するコース例より) [14]</td></tr>
            <tr><td>試験の有無</td><td>なし [7]</td><td>なし(トレーナー提供コース例より) [14]</td></tr>
            <tr><td>取得できるもの</td><td>デジタルバッジ + 2年間の専門会員資格 [17]</td><td>同様にデジタルバッジ + 専門会員資格 [14]</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><i class="ti ti-info-circle" aria-hidden="true"/>補足</div>
        <p>出典[14]はCAL 2の一トレーナー(認定トレーニングパートナー)が提供するコースの具体例であり、Scrum Alliance公式の学習目標そのものではない点に留意してください。トレーナーごとに扱う演習や深掘りの角度は異なります。</p>
      </div>
    </section>

    <!-- ===================== 08. Trainer quality ===================== -->
    <section id="trainer-quality">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-building-bank" aria-hidden="true"/>SECTION 08</div>
      <h2>講師・トレーニングパートナーの品質基準</h2>

      <p>CAL 1 を教える資格を持つのは、Scrum Alliance が認定した<strong>CAL トレーナー(CAL-T)</strong>のみです。Scrum Alliance の公式申請要件によると、CAL トレーナーになるには以下のような条件を満たす必要があります [6]。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>品質基準項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>リーダーシップ講座の共同ファシリテーション実績</td><td>過去60ヶ月以内に少なくとも8回のリーダーシップ講座を(共同)ファシリテートしていること(現役のCSTまたはCSATは免除) [6]</td></tr>
            <tr><td>既存トレーナーとの協働実績</td><td>全候補者について、少なくとも1回は既存の認定CALトレーナー(CSTまたはCSAT出身)と共同開催した講座があること [6]</td></tr>
            <tr><td>学習目標へのマッピング</td><td>提出するCAL1教材が、最新版のCAL1学習目標に対応付けられていること [6]</td></tr>
            <tr><td>最低受講時間の担保</td><td>提出する各コースが最低16時間の指導時間を含んでいること [6]</td></tr>
            <tr><td>独自性の提示</td><td>トレーナー自身の個性的なアプローチが伝わる教材・実施概要を提出すること [6]</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><i class="ti ti-info-circle" aria-hidden="true"/>補足</div>
        <p><strong>初学者向けポイント</strong>: どのトレーナーの講座を選んでも「最低16時間」「最新版の CAL 1 学習目標(Learning Objectives)への対応」という共通の品質基準は担保されています [1] [6]。一方で、具体的な演習内容やケーススタディはトレーナーごとに個性があるため、トレーナーのバックグラウンド(業界経験、コーチング資格など)を確認して選ぶとよいでしょう [1]。</p>
      </div>
    </section>

    <!-- ===================== 09. Renewal and SEU ===================== -->
    <section id="renewal-seu">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-refresh" aria-hidden="true"/>SECTION 09</div>
      <h2>資格更新(Renewal)とSEU</h2>

      <p>Scrum Alliance の認定資格は、取得後も学び続けることを前提とした「更新制」です。CAL 1 も例外ではなく、<strong>2年ごとに更新が必要</strong>になります [17]。更新の仕組みは<strong>SEU(Scrum Education Unit、Scrum教育単位)</strong>の取得によって成り立っています [27]。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_RENEWAL_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" /><template #fallback><p class="diagram-loading">図を読み込み中…</p></template></ClientOnly></div>
        <div class="diagram-caption">資格更新の2つの経路</div>
      </div>

      <h3>SEUの基本的な考え方 [27]</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>定義</td><td>継続的な学習活動(Scrum Alliance 認定コース以外の講座・研修の受講、記事講読、イベント参加、ボランティアなど)1時間 = 1 SEU</td></tr>
            <tr><td>記録方法</td><td>Scrum Alliance の会員ダッシュボードに活動内容を自己申告で登録する</td></tr>
            <tr><td>目的</td><td>資格保有者が常に最新の知見を持ち続けていることを担保し、資格の信頼性を維持する</td></tr>
            <tr><td>算入対象外</td><td>Scrum Alliance の認定コース(CAL 2・A-CSM など)そのものは SEU としては算入されない。代わりに、修了時点で保有資格が自動更新される経路が用意されている [17] [27]</td></tr>
          </tbody>
        </table>
      </div>

      <h3>CAL 1 の更新要件</h3>
      <p>CAL 1 は Scrum Alliance の認定レベル区分では<strong>Foundational(基礎)レベル</strong>(CSM / CSPO / CSD / CASP / CAF と同区分)に位置づけられ、更新要件も同レベルの他資格と共通です [17] [27]。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>CAL 1(Foundational レベル)の要件</th></tr></thead>
          <tbody>
            <tr><td>必要SEU数</td><td><strong>2年間で20 SEU</strong></td></tr>
            <tr><td>更新手数料</td><td><strong>100米ドル(2年間)</strong></td></tr>
            <tr><td>更新の条件</td><td>SEU と更新手数料の<strong>両方</strong>が必須(どちらか一方だけでは更新できない)</td></tr>
          </tbody>
        </table>
      </div>

      <p>参考として、上位レベルの要件は Advanced(A-CSM / A-CSPO / A-CSD / <strong>CAL 2</strong>)が2年間で30 SEU・175米ドル、Professional(CSP-SM / CSP-PO / CSP-D)が2年間で40 SEU・250米ドルです [17] [27]。</p>

      <h3>更新の2つの経路</h3>
      <p>更新には、SEU を積み上げる通常更新のほかに、<strong>別の Scrum Alliance 認定コースを修了する</strong>経路があります [17] [27]。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>経路</th><th>条件</th><th>SEUの提出</th><th>更新手数料</th></tr></thead>
          <tbody>
            <tr><td>経路1: 通常更新</td><td>2年間で規定数の SEU を記録し、更新申請する</td><td>必要(CAL 1 は20 SEU)</td><td>必要(CAL 1 は100米ドル)</td></tr>
            <tr><td>経路2: 認定コース修了による更新</td><td>別の Scrum Alliance 認定コース(CAL 2・A-CSM など)を修了する</td><td>不要</td><td>不要</td></tr>
          </tbody>
        </table>
      </div>

      <p>経路2では、コース修了時点で<strong>既に保有している資格が自動的に更新</strong>されます。ただし注意点として、<strong>認定コースの受講時間そのものは SEU には算入されません</strong> [27]。つまり「コースを受けて SEU も稼ぐ」という二重取りはできず、経路1と経路2はどちらか一方が適用される関係になります。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><i class="ti ti-info-circle" aria-hidden="true"/>補足</div>
        <p><strong>注記(旧制度の参考情報)</strong>: 2024年の CAL トラック再編<strong>前</strong>の「Leadership level」区分(CAL-E / CAL-O / CAL-T)では、2年ごとに10 SEU とされていました(第三者情報源より) [25] [28]。これは<strong>現行の CAL 1 には適用されない過去の値</strong>であり、履歴情報としてのみ記載しています。現行の要件は上表のとおりです。</p>
        <p><strong>初学者向けポイント</strong>: 複数の Scrum Alliance 認定を保有している場合、最高位の認定を SEU と更新手数料で更新すると、<strong>それ以外の認定(2つ目以降の認定)</strong>は半分の SEU(かつ追加費用なし)で更新されます [17]。これは上位・下位の関係に限られず、CAL 1 と CSM のように<strong>同じ Foundational レベルの追加資格</strong>も対象になります。更新タイミングをまとめると手続きコストを抑えられます。</p>
      </div>
    </section>

    <!-- ===================== 10. Learning roadmap ===================== -->
    <section id="learning-roadmap">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-map-2" aria-hidden="true"/>SECTION 10</div>
      <h2>初学者向け学習ロードマップ</h2>

      <div class="diagram-card">
        <div class="mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_ROADMAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" /><template #fallback><p class="diagram-loading">図を読み込み中…</p></template></ClientOnly></div>
        <div class="diagram-caption">受講前・受講中・受講後のロードマップ</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>フェーズ</th><th>やること</th><th>目的</th></tr></thead>
          <tbody>
            <tr><td>受講前</td><td>Agile Manifesto を読む [1]、自組織の課題を言語化する</td><td>講座での議論・演習を自分ごととして捉えられるようにする</td></tr>
            <tr><td>受講中</td><td>Day1(自己内省)→ Day2(チーム・組織)の流れに沿って参加する [13]</td><td>4つの学習領域を、個人→チーム→組織という順で体系的に習得する</td></tr>
            <tr><td>受講後</td><td>学んだ手法を小さく実践し、SEUを記録し続ける [27]</td><td>資格を「取得して終わり」にせず、2年間の更新サイクルの中で学びを継続する</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 11. FAQ ===================== -->
    <section id="faq">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-clipboard-text" aria-hidden="true"/>SECTION 11</div>
      <h2>よくある誤解(FAQ)</h2>

      <div class="table-wrap">
        <table>
          <thead><tr><th>よくある誤解</th><th>実際</th><th>出典</th></tr></thead>
          <tbody>
            <tr><td>CAL 1 には筆記試験・選択式試験がある</td><td>試験は実施されない。16時間の講座への出席と積極的な参加が共通の認定条件(事前・事後課題はトレーナーが課す場合のみ)</td><td>[1] [7]</td></tr>
            <tr><td>CAL 1 はスクラムマスターなど特定の役職の人専用の資格である</td><td>業種・役職を問わず「人をリードしている、またはこれからリードしたい人」が対象</td><td>[1]</td></tr>
            <tr><td>CAL 1 を取得すればCAL 2の内容も自動的に含まれる</td><td>CAL 2 は別課程であり、CAL1取得を前提条件として追加で16時間の受講が必要</td><td>[10] [17]</td></tr>
            <tr><td>資格は一度取得すれば永続的に有効である</td><td>2年ごとにSEUを取得して更新する必要がある</td><td>[17] [27]</td></tr>
            <tr><td>更新には必ずSEUの提出と更新手数料の支払いが必要である</td><td>通常更新では両方が必要だが、別の Scrum Alliance 認定コースを修了した場合は SEU 提出・更新手数料なしで保有資格が自動更新される</td><td>[17] [27]</td></tr>
            <tr><td>Scrum Alliance の認定コースを受講すればSEUとしても加算できる</td><td>認定コース自体はSEUに算入されない。代わりに修了時点で保有資格が自動更新される</td><td>[27]</td></tr>
            <tr><td>CAL-Essentials・CAL-Teams・CAL-Organizationsが今も個別に提供されている</td><td>2024年の刷新により CAL 1 / CAL 2 の2階層に再編済み</td><td>[8] [9]</td></tr>
            <tr><td>どのトレーナーの講座を選ぶかで取得できる資格の重みが変わる</td><td>どのトレーナーの講座を修了しても同一の、Scrum Alliance公認資格が得られる</td><td>[1]</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 12. Best practices summary ===================== -->
    <section id="best-practices-summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-flag-3" aria-hidden="true"/>SECTION 12</div>
      <h2>全体ベストプラクティスまとめ表</h2>

      <p>第4章で学習領域ごとに紹介した実務のポイントを、横断的に整理した一覧です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>学習領域</th><th>中心となる問い</th><th>実務でのベストプラクティス(代表例)</th><th>期待される効果</th></tr></thead>
          <tbody>
            <tr><td>1. The Case for Agile Leadership</td><td>なぜ今、リーダーシップの転換が必要なのか</td><td>自分のリーダーシップの前提を言語化する / VUCA環境を前提にした意思決定に慣れる</td><td>変化への心理的な抵抗が減り、意思決定のスピードが上がる</td></tr>
            <tr><td>2. Agile Leadership in Action</td><td>どうすれば「わかる」を「できる」に変えられるか</td><td>フィードバックを「観察+影響+依頼」で伝える / 権限委譲レベルを可視化する</td><td>個人としての影響力とチームからの信頼が高まる</td></tr>
            <tr><td>3. Leading Agile Teams</td><td>どうすれば高パフォーマンスなチームを育てられるか</td><td>チームの目的を繰り返し言語化する機会を作る / 対立を歓迎する文化を作る</td><td>心理的安全性が高まり、機能横断的な協働がスムーズになる</td></tr>
            <tr><td>4. Leading Agile Organizations</td><td>どうすれば組織全体の俊敏性を高められるか</td><td>見えない前提(暗黙の評価基準)を観察する / クイックウィンを積み重ねて変革の勢いを維持する</td><td>制度面の障害が早期に発見され、変革が持続しやすくなる</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 13. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><i class="ti ti-link" aria-hidden="true"/>SECTION 13</div>
      <h2>参考文献・ソース一覧</h2>

      <div class="ref-group">
        <h3>公式(Scrum Alliance)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">[1] Certified Agile Leader® 1 (CAL 1™) Certification ― Scrum Alliance公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/agile-leader/cal-1" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/agile-leader/cal-1</a></li>
          <li><span class="ref-name">[17] Certified Agile Leader ― CAL認定に関するFAQページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/agile-leadership/cal-certification" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/agile-leadership/cal-certification</a></li>
          <li><span class="ref-name">[18] Agile Leader Track(認定取得までの流れ)</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/agile-leader-track" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/agile-leader-track</a></li>
          <li><span class="ref-name">[8] Certified Agile Leader® 2 (CAL 2™) 公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/agile-leader-track/cal-2" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/agile-leader-track/cal-2</a></li>
          <li><span class="ref-name">[27] Scrum Education Units (SEUs) 公式解説ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
          <li><span class="ref-name">[6] CAL トレーナー申請要件(Scrum Alliance Applications)</span><a class="ref-url" href="https://scrumalliance.smapply.io/prog/certified_agile_leader_cal_trainer/" target="_blank" rel="noopener">https://scrumalliance.smapply.io/prog/certified_agile_leader_cal_trainer/</a></li>
          <li><span class="ref-name">[19] About Scrum Alliance(団体概要)</span><a class="ref-url" href="https://www.scrumalliance.org/about/we-are-scrum-alliance" target="_blank" rel="noopener">https://www.scrumalliance.org/about/we-are-scrum-alliance</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>認定トレーニングパートナー・報道発表</h3>
        <ul class="ref-list">
          <li><span class="ref-name">[7][13] Certified Agile Leader® 1 (CAL 1) コース詳細(学習目標4領域・Day1/Day2構成・試験の有無を明記) ― PM-Partners のトレーナー独自コース例</span><a class="ref-url" href="https://www.pm-partners.com.au/course/certified-agile-leader/" target="_blank" rel="noopener">https://www.pm-partners.com.au/course/certified-agile-leader/</a></li>
          <li><span class="ref-name">[9] Certified Agile Leadership Certification ― CAL1/CAL2再編の経緯解説 ― tryscrum.com</span><a class="ref-url" href="https://tryscrum.com/certifications/agile/scrum/leadership/certified-agile-leadership-i/" target="_blank" rel="noopener">https://tryscrum.com/certifications/agile/scrum/leadership/certified-agile-leadership-i/</a></li>
          <li><span class="ref-name">[10] Certified Agile Leadership I (CAL-1) Certification Training ― KnowledgeHut</span><a class="ref-url" href="https://www.knowledgehut.com/agile-management/certified-agile-leadership-cal-1-training" target="_blank" rel="noopener">https://www.knowledgehut.com/agile-management/certified-agile-leadership-cal-1-training</a></li>
          <li><span class="ref-name">[14] Certified Agile Leader® 2 コース詳細例 ― Evolve Agility(Scrum Alliance認定トレーニングパートナー、Scrum Alliance公式コース検索経由)</span><a class="ref-url" href="https://www.evolveagility.com/services-agile-training/certified-agile-leader-2/" target="_blank" rel="noopener">https://www.evolveagility.com/services-agile-training/certified-agile-leader-2/</a></li>
          <li><span class="ref-name">[15][16] Scrum Alliance Launches Updated Certified Agile Leader Track to Elevate Leadership Skills(公式プレスリリース、2024年)</span><a class="ref-url" href="https://www.prnewswire.com/news-releases/scrum-alliance-launches-updated-certified-agile-leader-track-to-elevate-leadership-skills-302212940.html" target="_blank" rel="noopener">https://www.prnewswire.com/news-releases/scrum-alliance-launches-updated-certified-agile-leader-track-to-elevate-leadership-skills-302212940.html</a></li>
          <li><span class="ref-name">[25][28] Scrum Alliance SEU Program 解説(旧Leadership level区分のSEU要件。再編前の履歴情報としてのみ参照)</span><a class="ref-url" href="https://sanfranciscobs.com/p/40-scrum-alliance-seu-program" target="_blank" rel="noopener">https://sanfranciscobs.com/p/40-scrum-alliance-seu-program</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>基礎資料(受講前に読むことが推奨される一次資料)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">The Agile Manifesto(アジャイルソフトウェア開発宣言)</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          <li><span class="ref-name">The Scrum Guide(Scrumガイド、公式)</span><a class="ref-url" href="https://scrumguides.org/" target="_blank" rel="noopener">https://scrumguides.org/</a></li>
        </ul>
      </div>

      <h3>このガイドの取り扱いに関する注記</h3>
      <ul>
        <li>CAL 1 は Scrum Alliance® の登録商標です。本ガイドは同団体が公開している情報および認定トレーニングパートナーの公開情報を独自に要約・翻訳・整理した非公式の学習補助資料であり、Scrum Alliance による公認資料ではありません。</li>
        <li>受講料などトレーナーごとに設定される費用は変動します。また SEU 要件・更新手数料も改定される可能性があるため、実際の申し込み・更新の際は必ず出典[1] [17] [27]の最新ページを確認してください。</li>
        <li>第4章・第12章の「ベストプラクティス」列は、公式の学習領域の名称・範囲(出典[7])を土台にした実務解説であり、Scrum Alliance公式教材からの引用ではありません。</li>
      </ul>
    </section>

    <footer>
      CAL 1™, CAL 2™, Certified Agile Leader® は Scrum Alliance® の登録商標です。本ページは公開情報にもとづく非公式の学習支援資料であり、Scrum Alliance による公認資料ではありません。最新情報は<a href="https://www.scrumalliance.org/get-certified/agile-leader/cal-1" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>でご確認ください。
    </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>

  :root {
    --color-paper:        #F6F7F9;
    --color-paper-raised: #FFFFFF;
    --color-paper-sunken: #EEF0F4;

    --color-ink:          #161B26;
    --color-ink-soft:     #4B5566;
    --color-ink-faint:    #8A93A3;

    --color-border:       #DFE3EA;
    --color-border-strong:#C7CDD9;

    --color-indigo:       #2E3F72;
    --color-indigo-dark:  #1F2C57;
    --color-indigo-tint:  #EEF1F8;

    --color-gold:         #B8802A;
    --color-gold-tint:    #FAF1DF;

    --color-forest:       #1B6E6A;
    --color-forest-tint:  #E7F3F2;

    --color-plum:         #8C3A5C;
    --color-plum-tint:    #F6EAEF;

    --color-success-bg:    #EAF4EC;
    --color-success-text:  #2F6B3D;
    --color-success-border:#BFE0C6;

    --color-info-bg:       #EEF1F8;
    --color-info-text:     #2E3F72;
    --color-info-border:   #C7D1EA;

    --font-display: "Source Serif 4", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif;
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif;
    --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;

    --sidebar-width: 288px;
  }

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--color-indigo); text-decoration: none; }
  a:hover { text-decoration: underline; }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--color-indigo); outline-offset: 2px; }

  .skip-link {
    position: absolute; top: -48px; left: 0; z-index: 40;
    background: var(--color-paper-raised); color: var(--color-indigo);
    padding: 12px 20px; border: 1px solid var(--color-border); border-radius: 0 0 8px 0;
    transition: top 0.15s ease;
  }
  .skip-link:focus { top: 0; }
  img, svg { max-width: 100%; }

  .layout {
    display: block;
  }

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

  .sidebar-nav a.active i { color: var(--color-indigo); }

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

  .diagram-container {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 60px;
  }

  .diagram-loading {
    color: var(--color-ink-faint);
    font-size: 16px;
    padding: 20px 0;
  }

  .diagram-error {
    color: var(--color-plum);
    font-size: 16px;
  }

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
    .domain-grid { grid-template-columns: repeat(2, 1fr); }
    .glossary-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 560px) {
    .stat-row { grid-template-columns: 1fr; }
    .domain-grid { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .sidebar { transition: none; }
  }


/* Fixed global header offset */
.sidebar {
  top: var(--global-nav-height, 0px);
  height: calc(100vh - var(--global-nav-height, 0px));
}

.main-content {
  margin-top: 0;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

.mermaid-wrap {
  margin: 24px 0;
  padding: 16px;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.diagram-loading {
  text-align: center;
  color: var(--color-ink-faint);
  font-size: 14px;
  padding: 24px 0;
}
</style>
