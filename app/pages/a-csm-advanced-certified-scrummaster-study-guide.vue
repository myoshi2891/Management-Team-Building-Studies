<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "what-is-acsm",
  "blooms-taxonomy",
  "lean-agile-scrum",
  "facilitation",
  "coaching-training",
  "self-management-team-dynamics",
  "definition-of-done",
  "service-to-product-owner",
  "organizational-impediments",
  "scaling-scrum",
  "organizational-change",
  "personal-development",
  "scrum-master-as-leader",
  "best-practices-checklist",
  "misconceptions-antipatterns",
  "career-path",
  "summary",
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
  title: "Advanced Certified ScrumMaster (A-CSM) 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description: "Scrum Alliance公式のA-CSM Learning Objectivesに基づき、全42のラーニングオブジェクティブを初学者向けに解説する完全ガイド。ファシリテーション・コーチング・スケーリングのベストプラクティスと一次情報源リンク付き。",
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

const DIAGRAM_CAREER_PATH_OVERVIEW = `flowchart LR
    A["CSM Certified ScrumMaster (Scrum Alliance / エントリーレベル)"] -->|"前提資格"| B["A-CSM Advanced Certified ScrumMaster (中級レベル)"]
    P["PSM I / PSM II Professional Scrum Master (Scrum.org)"] -.->|"前提資格 代替"| B
    B --> C["CSP-SM Certified Scrum Professional ScrumMaster (上級レベル)"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,P box;
    class B hub;
    class C done;`;

const DIAGRAM_ACSM_REQUIREMENTS_FLOW = `flowchart TD
    R1["Scrum Alliance CSM 認定 または Scrum.org PSM I / PSM II を保有 (CSMは有効期限切れでも可)"] --> R2["過去5年以内に Scrum Master実務経験12ヶ月"]
    R1 --> R3["承認されたA-CSMコース(最低16時間)を修了 (課題は受講前/受講後どちらでも可)"]
    R2 --> R4["A-CSMライセンス受諾+ メンバープロフィール完成"]
    R3 --> R4
    R4 --> R5["A-CSM認定取得"]
    R5 --> R6["2年ごとに30 SEU取得+ 175米ドルの更新料で更新(標準ルート) 別の認定コース修了なら SEU・更新料なしで更新"]`;

const DIAGRAM_BLOOMS_PYRAMID = `flowchart TB
    K["1. Knowledge (知識)"] --> C["2. Comprehension (理解)"]
    C --> A["3. Application (応用)"]
    A --> An["4. Analysis (分析)"]
    An --> S["5. Synthesis (統合)"]
    S --> E["6. Evaluation (評価)"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class K,C box;
    class A,An hub;
    class S,E done;`;

const DIAGRAM_SCRUM_HISTORY_TIMELINE = `flowchart LR
    A["1986年 Takeuchi & Nonaka 'The New New Product Development Game'"] --> B["1993-95年 Sutherland & Schwaber Scrumの定式化"]
    B --> C["2001年 アジャイルマニフェスト策定 Scrum Alliance設立"]
    C --> D["2010年〜 Scrum Guide発行 (Schwaber & Sutherland)"]
    D --> E["2020年 Scrum Guide最新版"]`;

const DIAGRAM_THREE_PILLARS_CYCLE = `flowchart TD
    T["透明性 Transparency"] --> I["検査 Inspection"]
    I --> Ad["適応 Adaptation"]
    Ad -->|"検査結果を反映"| T

    T2["透明性が崩れると..."] -.->|"不正確な情報に基づく検査"| I2["誤った検査"]
    I2 -.->|"誤った判断に基づく適応"| Ad2["誤った適応"]`;

const DIAGRAM_DOUBLE_DIAMOND = `flowchart LR
    P["課題の定義 Problem"] --> D1["発散1 Discover (多様な視点を集める)"]
    D1 --> C1["収束1 Define (課題を絞り込む)"]
    C1 --> D2["発散2 Develop (解決策を広げる)"]
    D2 --> C2["収束2 Deliver (解決策を選ぶ)"]`;

const DIAGRAM_ONE_TWO_FOUR_ALL = `flowchart TD
    S1["個人 (1) 1分間で自分の考えを書く"] --> S2["ペア (2) 2分間でペアと共有"]
    S2 --> S4["4人グループ (4) 4分間で統合"]
    S4 --> SA["全体 (All) グループごとに発表"]`;

const DIAGRAM_WORKING_AGREEMENT_CYCLE = `flowchart TD
    A["チームでブレインストーミング (困った経験・理想の働き方を出し合う)"] --> B["グルーピングと優先順位付け (Dot Voting等)"]
    B --> C["合意文書として明文化"]
    C --> D["チームの見える場所に掲示"]
    D --> E["レトロスペクティブで 定期的に見直す"]
    E --> B`;

const DIAGRAM_COACHING_COMPETENCY_PYRAMID = `flowchart TB
    Found["土台: 倫理的実践 + コーチングマインドセット"] --> Rel["関係構築: 合意形成 + 信頼と安全"]
    Rel --> Comm["効果的なコミュニケーション: プレゼンス + 積極的傾聴"]
    Comm --> Growth["学びと成長の促進: 気づきの喚起 + 成長支援"]`;

const DIAGRAM_GROW_MODEL = `flowchart LR
    G["Goal 目標を明確にする"] --> R["Reality 現状を把握する"]
    R --> O["Options 選択肢を洗い出す"]
    O --> W["Will 意志・行動計画を決める"]`;

const DIAGRAM_DELEGATION_POKER = `flowchart LR
    L1["1. Tell 指示する"] --> L2["2. Sell 説得する"]
    L2 --> L3["3. Consult 相談する"]
    L3 --> L4["4. Agree 合意する"]
    L4 --> L5["5. Advise 助言する"]
    L5 --> L6["6. Inquire 尋ねる"]
    L6 --> L7["7. Delegate 委任する"]`;

const DIAGRAM_TUCKMAN_MODEL = `flowchart LR
    F["Forming 形成期"] --> S["Storming 混乱期"]
    S --> N["Norming 統一期"]
    N --> P["Performing 機能期"]
    P --> Ad["Adjourning 解散期"]`;

const DIAGRAM_DOD_FACILITATION_FLOW = `flowchart TD
    A["現状のDoDを可視化する (暗黙的なものも含めて洗い出す)"] --> B["'完成'にまつわる 過去のトラブル事例を出し合う"]
    B --> C["組織全体の品質基準 (あれば)を確認する"]
    C --> D["チームでDoDを 具体的な項目として明文化する"]
    D --> E["Sprint Reviewの場で ステークホルダーに共有する"]
    E --> F["レトロスペクティブで 継続的に見直し・強化する"]
    F --> D`;

const DIAGRAM_VISION_GOAL_HIERARCHY = `flowchart TD
    V["Product Vision (長期的な目指す姿・数年単位)"] --> G1["Product Goal 1 (数ヶ月単位のマイルストーン)"]
    G1 --> G2["Product Goal 2 (次のマイルストーン)"]
    G2 --> G3["Product Goal 3 ..."]
    G1 --> SG1["Sprint Goal (1スプリント単位)"]`;

const DIAGRAM_PRODUCT_GOAL_FACILITATION_FLOW = `flowchart LR
    A["現状のProduct Goal候補を提示"] --> B["ステークホルダーからの 市場・顧客インサイトを収集"]
    B --> C["Scrum Teamからの 技術的実現可能性の意見を収集"]
    C --> D["インパクトマッピング等で 選択肢を可視化"]
    D --> E["Product Ownerが 最終判断を下す"]`;

const DIAGRAM_FIVE_WHYS_ANALYSIS = `flowchart TD
    P["問題: リリースまでに 常に3週間の承認待ちが発生する"] --> W1["なぜ？ 複数部署の承認印が必要だから"]
    W1 --> W2["なぜ？ 過去にセキュリティ事故があり 承認プロセスが追加されたから"]
    W2 --> W3["なぜ？ その事故の再発防止策が プロセスの追加以外検討されなかったから"]
    W3 --> W4["なぜ？ 自動化されたセキュリティチェックの 仕組みが組織に存在しないから"]
    W4 --> R["根本原因: 自動セキュリティチェック基盤の不在"]`;

const DIAGRAM_SCALING_FRAMEWORKS_COMPARISON = `flowchart TB
    subgraph Nexus["Nexus (Scrum.org)"]
        N1["単一Product Backlog"]
        N2["Nexus Integration Team"]
        N3["3〜9チーム規模を想定"]
    end
    subgraph LeSS["LeSS (Larman & Vodde)"]
        L1["単一Product Backlog"]
        L2["単一Product Owner"]
        L3["2〜8チーム(Basic)/8チーム以上(Huge)"]
    end
    subgraph SAFe["SAFe (Scaled Agile)"]
        SA1["Agile Release Train"]
        SA2["ポートフォリオ〜チームまでの 複数レベルの階層"]
        SA3["大規模組織全体を想定"]
    end`;

const DIAGRAM_FEATURE_VS_COMPONENT_TEAMS = `flowchart LR
    subgraph FT["フィーチャーチーム (Feature Team)"]
        F1["機能・顧客価値単位で編成"]
        F2["エンドツーエンドで 1つの機能を完成させる"]
    end
    subgraph CT["コンポーネントチーム (Component Team)"]
        C1["技術コンポーネント単位で編成 (例: フロントエンド/バックエンド/DB)"]
        C2["特定レイヤーの専門性に特化"]
    end`;

const DIAGRAM_CYNEFIN_DOMAINS = `flowchart TB
    subgraph Clear["明白 (Clear/Obvious)"]
        C1["因果関係が明確"]
        C2["対応: ベストプラクティスに従う"]
    end
    subgraph Complicated["煩雑 (Complicated)"]
        Co1["因果関係はあるが専門知識が必要"]
        Co2["対応: グッドプラクティス/専門家分析"]
    end
    subgraph Complex["複雑 (Complex)"]
        Cx1["因果関係は事後的にしか分からない"]
        Cx2["対応: 安全に失敗できる実験 (Probe-Sense-Respond)"]
    end
    subgraph Chaotic["カオス的 (Chaotic)"]
        Ch1["因果関係が存在しないように見える"]
        Ch2["対応: まず行動して安定化させる (Act-Sense-Respond)"]
    end`;

const DIAGRAM_KOTTER8_STEPS = `flowchart TD
    S1["1. 危機意識を高める"] --> S2["2. 変革推進チームを作る"]
    S2 --> S3["3. ビジョンと戦略を立てる"]
    S3 --> S4["4. 変革のビジョンを周知徹底する"]
    S4 --> S5["5. 従業員の自発を促す (障害物の除去)"]
    S5 --> S6["6. 短期的な成果を生み出す"]
    S6 --> S7["7. 成果を活かして さらなる変革を推進する"]
    S7 --> S8["8. 新しい方法を 組織文化に定着させる"]`;

const DIAGRAM_TKI_CONFLICT_MODES = `flowchart TB
    Conflict["対立が発生"] --> Comp["競合 (Competing) 自己主張:高 協調性:低"]
    Conflict --> Collab["協働 (Collaborating) 自己主張:高 協調性:高"]
    Conflict --> Comprom["妥協 (Compromising) 自己主張:中 協調性:中"]
    Conflict --> Avoid["回避 (Avoiding) 自己主張:低 協調性:低"]
    Conflict --> Accom["受容 (Accommodating) 自己主張:低 協調性:高"]`;

const DIAGRAM_SERVANT_LEADERSHIP_ATTRIBUTES = `flowchart TB
    Center["真のリーダーとしての Scrum Master"] --> A1["奉仕への意志 (Servant First)"]
    Center --> A2["他者の成長への コミットメント"]
    Center --> A3["先見性 (Foresight)"]
    Center --> A4["説得力 (Persuasion, 権威ではなく)"]
    Center --> A5["コミュニティ意識の 醸成"]`;

const DIAGRAM_CAREER_PATH_TO_CSP_SM = `flowchart LR
    A["A-CSM取得"] --> B["実務経験の蓄積+ SEU(Scrum Education Units)の取得"]
    B --> C["CSP-SM Certified Scrum Professional ScrumMaster"]
    C --> D["トレーナー/コーチとしての道 (CTC, CEC等)"]`;
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
      data-testid="sidebar-toggle"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">A-CSM® 完全ガイド</div>
        <div class="brand-subtitle">Advanced Certified ScrumMaster</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">はじめに</li>
      <li><a href="#what-is-acsm" :class="{ active: activeId === 'what-is-acsm' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />A-CSM とは何か</a></li>
      <li><a href="#blooms-taxonomy" :class="{ active: activeId === 'blooms-taxonomy' }" @click="closeSidebar"><Icon name="tabler:stairs" aria-hidden="true" />LOの読み方(Bloom&#x27;s Taxonomy)</a></li>
      <li class="nav-group-label">カテゴリー1-2: 基礎とコアコンピテンシー</li>
      <li><a href="#lean-agile-scrum" :class="{ active: activeId === 'lean-agile-scrum' }" @click="closeSidebar"><Icon name="tabler:history" aria-hidden="true" />Lean, Agile, and Scrum</a></li>
      <li><a href="#facilitation" :class="{ active: activeId === 'facilitation' }" @click="closeSidebar"><Icon name="tabler:users-group" aria-hidden="true" />コアコンピテンシー: Facilitation</a></li>
      <li><a href="#coaching-training" :class="{ active: activeId === 'coaching-training' }" @click="closeSidebar"><Icon name="tabler:school" aria-hidden="true" />コアコンピテンシー: Coaching and Training</a></li>
      <li class="nav-group-label">カテゴリー3-4: チームとPOへの奉仕</li>
      <li><a href="#self-management-team-dynamics" :class="{ active: activeId === 'self-management-team-dynamics' }" @click="closeSidebar"><Icon name="tabler:affiliate" aria-hidden="true" />自己管理とチームダイナミクス</a></li>
      <li><a href="#definition-of-done" :class="{ active: activeId === 'definition-of-done' }" @click="closeSidebar"><Icon name="tabler:checklist" aria-hidden="true" />Definition of Doneと開発プラクティス</a></li>
      <li><a href="#service-to-product-owner" :class="{ active: activeId === 'service-to-product-owner' }" @click="closeSidebar"><Icon name="tabler:target-arrow" aria-hidden="true" />Product Ownerへの奉仕</a></li>
      <li class="nav-group-label">カテゴリー5-6: 組織とマスタリー</li>
      <li><a href="#organizational-impediments" :class="{ active: activeId === 'organizational-impediments' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />組織的障害</a></li>
      <li><a href="#scaling-scrum" :class="{ active: activeId === 'scaling-scrum' }" @click="closeSidebar"><Icon name="tabler:network" aria-hidden="true" />Scaling Scrum</a></li>
      <li><a href="#organizational-change" :class="{ active: activeId === 'organizational-change' }" @click="closeSidebar"><Icon name="tabler:arrows-right-left" aria-hidden="true" />組織変革と複雑系</a></li>
      <li><a href="#personal-development" :class="{ active: activeId === 'personal-development' }" @click="closeSidebar"><Icon name="tabler:seedling" aria-hidden="true" />Scrum Mastery: 自己研鑽</a></li>
      <li><a href="#scrum-master-as-leader" :class="{ active: activeId === 'scrum-master-as-leader' }" @click="closeSidebar"><Icon name="tabler:crown" aria-hidden="true" />真のリーダーとしてのSM</a></li>
      <li class="nav-group-label">実践とキャリア</li>
      <li><a href="#best-practices-checklist" :class="{ active: activeId === 'best-practices-checklist' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />ベストプラクティス総合チェックリスト</a></li>
      <li><a href="#misconceptions-antipatterns" :class="{ active: activeId === 'misconceptions-antipatterns' }" @click="closeSidebar"><Icon name="tabler:alert-circle" aria-hidden="true" />よくある誤解とアンチパターン</a></li>
      <li><a href="#career-path" :class="{ active: activeId === 'career-path' }" @click="closeSidebar"><Icon name="tabler:refresh" aria-hidden="true" />認定取得後のキャリアパス</a></li>
      <li><a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />まとめ</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・ソース一覧</a></li>
    </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance公式 Learning Objectives 準拠</div>
      <h1>Advanced Certified ScrumMaster (A-CSM) 学習ガイド</h1>
      <p class="hero-lede">
        初学者のためのステップバイステップ解説 — 全ラーニングオブジェクティブ対応版
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">42</div><div class="stat-label">ラーニングオブジェクティブ(全6カテゴリー)</div></div>
        <div class="stat-card"><div class="stat-number">16h+</div><div class="stat-label">承認コースの最低受講時間</div></div>
        <div class="stat-card"><div class="stat-number">12ヶ月</div><div class="stat-label">必要な Scrum Master 実務経験(過去5年以内)</div></div>
        <div class="stat-card"><div class="stat-number">30 SEU</div><div class="stat-label">2年ごとの資格更新に必要な単位</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは Scrum Alliance が公開する <strong>A-CSM Learning Objectives (2022年1月版)</strong> に基づき、6つの学習カテゴリー・全42のラーニングオブジェクティブ(LO)を、初学者でも理解できるようステップバイステップで解説した、教育・学習支援を目的とした非公式の解説資料です。各項目には「初学者向け解説」「ベストプラクティス」「参考ソース」を併記しています。認定要件やラーニングオブジェクティブは変更される場合があるため、必ず<a href="https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>で最新情報をご確認ください。</span>
      </div>
    </div>

    <!-- ===================== SECTION 01. A-CSM とは何か — 資格の位置づけと要件 ===================== -->
    <section id="what-is-acsm">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      <h2>A-CSM とは何か — 資格の位置づけと要件</h2>

<h3>1.1 初学者向け解説</h3>
<p><strong>Advanced Certified ScrumMaster (A-CSM®)</strong> は、Scrum Alliance が提供する ScrumMaster トラックの中級認定資格です。エントリーレベルの <strong>Certified ScrumMaster (CSM®)</strong> で学んだ Scrum の基礎知識と、実務経験を土台として、以下のような「一段上」のスキルを習得することを目的としています。</p>
<ul>
  <li>Product Owner・Scrum Team・顧客・ステークホルダー・経営層の間のディスカッションを <strong>ファシリテート (facilitate)</strong> する力</li>
  <li>チームや組織全体に対して Scrum を <strong>コーチ・指導・メンタリング</strong> する力</li>
  <li>変化への抵抗、モチベーション低下、エンゲージメント不足といった「よくある課題」に対応する力</li>
  <li>チームの当事者意識・関与・責任感を高める力</li>
  <li>単一チームを超えて <strong>Scrum/Agile をスケールする</strong> ための基礎技術</li>
</ul>
<p>CSM が「Scrum とは何か」を学ぶ場であるのに対し、A-CSM は「Scrum Master として組織の中でどう機能するか」を深く掘り下げる場だと理解すると分かりやすいでしょう。</p>
<h3>1.2 CSM → A-CSM → CSP-SM のキャリアパス</h3>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CAREER_PATH_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">CSM から A-CSM を経て CSP-SM に至るキャリアパス(PSM I/II も代替前提資格として利用可能)</div>
</div>
<p>A-CSM の前提資格は CSM だけではなく、Scrum.org の PSM I / PSM II も代替として認められます(詳細と自己申告の手順は 1.3 を参照)。</p>
<p>Scrum Alliance の FAQ によれば、Scrum Master トラックにおける最高位の資格は <strong>Certified Scrum Professional® - ScrumMaster (CSP®-SM)</strong> であり、A-CSM はその一歩手前に位置づけられます。</p>
<h3>1.3 認定取得の要件</h3>
<p>A-CSM を取得・維持するためには、以下の要件を満たす必要があります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>#</th><th>要件</th><th>詳細</th></tr></thead>
<tbody>
<tr><td>1</td><td>前提資格の保有</td><td>Scrum Alliance の CSM 認定、または Scrum.org の PSM I / PSM II のいずれかを保有していること(CSM は有効期限切れでも可。A-CSM 取得時に自動更新される)。PSM I / PSM II を前提資格として使う場合は、A-CSM コースへ申し込む前に、その資格情報を Scrum Alliance のアカウント(メンバープロフィール)へ SEU として自己申告・登録しておく必要がある。登録内容は受講者登録の際に確認されるため、未登録だとコースの受講者登録に進めない</td></tr>
<tr><td>2</td><td>実務経験</td><td>過去5年以内に Scrum Master としての実務経験12ヶ月以上を Scrum Alliance のプロフィールに記録していること</td></tr>
<tr><td>3</td><td>コース修了</td><td>承認された A-CSM コース(最低16時間)を修了すること。講師が指定する課題・実務は、コース受講前・受講後のいずれかで実施すればよい</td></tr>
<tr><td>4</td><td>ライセンス受諾</td><td>A-CSM ライセンスへの同意とメンバープロフィールの完成</td></tr>
<tr><td>5</td><td>資格更新</td><td>標準の更新ルートでは、2年ごとに <strong>30 SEU (Scrum Education Units) の取得</strong> と <strong>175 米ドルの更新料の支払い</strong> の両方を行うこと。適用される更新区分は、保有している資格のうち最上位のものによって決まる。なお、別の Scrum Alliance 認定コースを修了した場合は、SEU の提出と更新料の支払いなしで既存の認定が更新される</td></tr>
</tbody></table></div>
<div class="callout note" data-testid="callout" data-variant="note">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
  <p>実務経験12ヶ月に満たない状態でも A-CSM コース自体は受講可能です。ただし、認定ライセンスを受け取るまでに、過去5年以内の Scrum Master 実務経験12ヶ月以上という要件を満たす必要があります。この12ヶ月はコース受講後の経験に限られず、受講前の経験と受講後の経験を通算して数えられます。また、承認コースは最低16時間で構成され、講師が指定する課題・実務はコース受講前・受講後のどちらで行っても要件を満たします。</p>
</div>
<h3>1.4 CSM と A-CSM の違い</h3>
<div class="table-wrap">
<table>
<thead><tr><th>観点</th><th>CSM</th><th>A-CSM</th></tr></thead>
<tbody>
<tr><td>位置づけ</td><td>Scrum 実践者としての入門資格</td><td>より複雑な課題・組織的な取り組みに対応するための次のレベル</td></tr>
<tr><td>前提条件</td><td>なし(Scrum の基礎学習)</td><td>CSM(または Scrum.org の PSM I / PSM II)保有 + Scrum Master 実務経験12ヶ月</td></tr>
<tr><td>学習の焦点</td><td>Scrum フレームワークの理解</td><td>ファシリテーション・コーチング・スケーリングの実践</td></tr>
<tr><td>コース形式</td><td>基礎コース</td><td>最低16時間の応用コース(講師指定の課題・実務は受講前・受講後のいずれでも可)</td></tr>
</tbody></table></div>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ACSM_REQUIREMENTS_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">A-CSM 認定取得までの要件フロー</div>
</div>
<p><strong>補足:</strong> 実務経験12ヶ月(R2)とA-CSMコース修了(R3)に順序の指定はありません。コースを先に修了し、後から実務経験の要件を満たしても構いません(両方を満たした時点でR4へ進めます)。</p>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance — Advanced Certified ScrumMaster</a></li>
    <li><a href="https://support.scrumalliance.org/hc/en-us/articles/115001680252-How-do-I-earn-the-Advanced-Certified-ScrumMaster-A-CSM-or-Advanced-Certified-Scrum-Product-Owner-A-CSPO-certification" target="_blank" rel="noopener">Scrum Alliance Help Center — How do I earn the A-CSM or A-CSPO certification?</a></li>
  </ul>
</div>
    </section>

    <!-- ===================== SECTION 02. Bloom's Taxonomy とラーニングオブジェクティブの読み方 ===================== -->
    <section id="blooms-taxonomy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:stairs" aria-hidden="true" />SECTION 02</div>
      <h2>Bloom's Taxonomy とラーニングオブジェクティブの読み方</h2>

<h3>2.1 初学者向け解説</h3>
<p>A-CSM の公式ラーニングオブジェクティブ (LO) は <strong>Bloom's Taxonomy (ブルームの教育目標分類)</strong> というフレームワークに基づいて記述されています。これは学習到達度を6段階の「動詞」で表現する手法で、各 LO の文頭には「Upon successful validation of the A-CSM Learning Objectives, the learner will be able to …」(A-CSM学習目標の達成検証後、学習者は…できるようになる)という前提が暗黙的に付与されています。</p>
<div class="table-wrap">
<table>
<thead><tr><th>レベル</th><th>英語動詞の例</th><th>意味</th></tr></thead>
<tbody>
<tr><td>1. Knowledge (知識)</td><td>identify, recognize, describe</td><td>事実や概念を思い出せる</td></tr>
<tr><td>2. Comprehension (理解)</td><td>explain, discuss, outline</td><td>意味を自分の言葉で説明できる</td></tr>
<tr><td>3. Application (応用)</td><td>apply, demonstrate, practice</td><td>知識を実際の状況で使える</td></tr>
<tr><td>4. Analysis (分析)</td><td>analyze, examine, compare</td><td>要素に分解し関係性を見出せる</td></tr>
<tr><td>5. Synthesis (統合)</td><td>design, create, facilitate</td><td>新しいものを組み立てられる</td></tr>
<tr><td>6. Evaluation (評価)</td><td>evaluate, rank, select</td><td>基準に基づいて判断・選択できる</td></tr>
</tbody></table></div>
<p>レベルは下から上に向かって「より高次の思考スキル」を要求します。A-CSM の LO には低次(identify など)から高次(evaluate, design など)まで幅広く含まれており、単なる知識の暗記ではなく <strong>実践できる力</strong> が問われる点が CSM との大きな違いです。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_BLOOMS_PYRAMID" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Bloom&#x27;s Taxonomy の6段階</div>
</div>
<h3>2.2 LO 全体構成マップ</h3>
<p>A-CSM の LO は以下の6カテゴリーに分類されます。Scrum Alliance が承認した Individual Path to CSP-SM Educators はこれに加えて補助トピックを含めることができますが、その場合は明示的に「補助トピックである」と示す必要があります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>カテゴリー</th><th>番号帯</th><th>サブトピック</th></tr></thead>
<tbody>
<tr><td>1. Lean, Agile, and Scrum</td><td>1.1–1.5</td><td>なし</td></tr>
<tr><td>2. Scrum Master Core Competencies</td><td>2.1–2.12</td><td>Facilitation (2.1–2.8) / Coaching and Training (2.9–2.12)</td></tr>
<tr><td>3. Service to the Scrum Team</td><td>3.1–3.8</td><td>Self-Management and Team Dynamics (3.1–3.4) / Definition of Done and Development Practices (3.5–3.8)</td></tr>
<tr><td>4. Service to the Product Owner</td><td>4.1–4.4</td><td>なし</td></tr>
<tr><td>5. Service to the Organization</td><td>5.1–5.8</td><td>組織的障害 (5.1–5.2) / Scaling Scrum (5.3–5.6) / Organizational Change (5.7–5.8)</td></tr>
<tr><td>6. Scrum Mastery</td><td>6.1–6.5</td><td>Personal Development (6.1–6.3) / Scrum Master as a True Leader (6.4–6.5)</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://www.scrumalliance.org/media/certifications/los/adv_csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance — A-CSM Learning Objectives (January 2022, PDF)</a></p>
</div>
    </section>

    <!-- ===================== SECTION 03. カテゴリー1 — Lean, Agile, and Scrum (LO 1.1–1.5) ===================== -->
    <section id="lean-agile-scrum">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:history" aria-hidden="true" />SECTION 03</div>
      <h2>カテゴリー1 — Lean, Agile, and Scrum (LO 1.1–1.5)</h2>

<h3>LO 1.1: Scrum とアジャイルマニフェストの整合性を示す</h3>
<p><strong>初学者向け解説:</strong> Scrum Guide (2020) が定めるとおり、Scrum は <strong>経験主義 (empiricism) とリーン思考 (lean thinking) に基づいたフレームワーク</strong>です。経験主義は「知識は経験から得られ、意思決定は観察されたものに基づく」という考え方であり、リーン思考は「ムダを省き本質に集中する」という考え方です。Scrum の3本柱(透明性・検査・適応)はこの経験主義を、5つの価値基準(確約・勇気・集中・公開・尊敬)はチームが働く際の行動規範を、それぞれ具体化したものです。</p>
<p>これとは別に、A-CSM の学習目標 LO 1.1 は「Scrum とアジャイルマニフェストの整合性を示すこと」を求めます。つまりアジャイルマニフェストは Scrum の理論的基盤そのものではなく、<strong>Scrum の実践がどのようにアジャイルの価値観・原則と噛み合うかを説明するための参照枠</strong>として扱います。両者は歴史的にも別系統で(Scrum の原型は1995年、マニフェストは2001年)、Scrum はマニフェストから導出されたフレームワークではありません。以下の対応表は、この「整合性」を説明するためのものです。</p>
<div class="table-wrap">
<table>
<thead><tr><th>アジャイルマニフェストの価値観</th><th>整合する Scrum の実践</th></tr></thead>
<tbody>
<tr><td>プロセスやツールよりも個人と対話を</td><td>デイリースクラムでの対面コミュニケーション、自己管理型チーム</td></tr>
<tr><td>包括的なドキュメントよりも動くソフトウェアを</td><td>Sprint ごとの「完成した (Done)」インクリメント</td></tr>
<tr><td>契約交渉よりも顧客との協調を</td><td>Product Owner とステークホルダーの継続的な関与、Sprint Review</td></tr>
<tr><td>計画に従うことよりも変化への対応を</td><td>Sprint ごとの検査と適応、Product Backlog のリファインメント</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>A-CSM レベルの Scrum Master は、単に「Scrum のルール」を教えるのではなく、なぜそのルールがアジャイルマニフェストの価値観に基づいているのかをチームや経営層に説明できる必要があります。ルールの背景にある「なぜ」を語れることが、抵抗を減らし、形骸化した Scrum (いわゆる "Zombie Scrum") を防ぐ鍵になります。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">Manifesto for Agile Software Development</a></li>
    <li><a href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">12 Principles behind the Agile Manifesto</a></li>
    <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></li>
  </ul>
</div>
<h3>LO 1.2: Scrum とアジャイルの歴史的発展を概説する</h3>
<p><strong>初学者向け解説:</strong> Scrum は1990年代前半に Jeff Sutherland と Ken Schwaber によって定式化され、1995年の OOPSLA カンファレンスで発表されました。2001年にはアジャイルマニフェストが17名の実務家によって策定され、Scrum はその中核的なフレームワークの一つとして急速に普及しました。Scrum Alliance 自体も2001年に設立された組織です。歴史を理解することで、Scrum が「軽量ソフトウェア開発プロセスへの反動」として生まれた文脈や、リーン生産方式(トヨタ生産方式)からの影響を把握できます。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SCRUM_HISTORY_TIMELINE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Scrum とアジャイルの歴史的発展</div>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></li>
    <li><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">Manifesto for Agile Software Development</a></li>
  </ul>
</div>
<h3>LO 1.3: Scrum 以外の Lean/Agile 開発アプローチの価値を説明する(最低2つ)</h3>
<p><strong>初学者向け解説:</strong> A-CSM の Scrum Master は「Scrum しか知らない」状態を脱し、他の Lean/Agile アプローチの強みを理解して使い分けられる必要があります。代表的な例を2つ挙げます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>アプローチ</th><th>概要</th><th>Scrum との違い・価値</th></tr></thead>
<tbody>
<tr><td><strong>Kanban</strong></td><td>作業の可視化・WIP制限・フローの最適化を重視する手法</td><td>Sprint のような時間ボックスを持たず、継続的フローを扱う。運用・保守チームなど、作業の到着が不規則な文脈で強みを発揮する</td></tr>
<tr><td><strong>Extreme Programming (XP)</strong></td><td>ペアプログラミング・TDD・継続的インテグレーションなど技術プラクティスを重視</td><td>Scrum が「What/When」(何を・いつ作るか)を扱うのに対し、XP は「How」(どう作るか)に強い。Scrum と組み合わせて使われることが多い</td></tr>
<tr><td><strong>Lean Startup</strong></td><td>仮説検証と Build-Measure-Learn サイクルによる製品開発</td><td>不確実性の高い新規事業・プロダクト立ち上げ時の意思決定フレームワークとして Scrum を補完する</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>チームの状況(フローが不規則、技術的負債が大きい、プロダクト検証フェーズにあるなど)に応じて、Scrum に Kanban のプラクティス(WIP制限、累積フロー図)や XP のプラクティス(TDD、ペアプログラミング)を組み合わせる「Scrumban」のような柔軟な運用を検討しましょう。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a> — Scrum は「意図的に不完全」であり、他のプラクティスとの併用を前提としている旨が明記されています。</p>
</div>
<h3>LO 1.4: 優れた Scrum Master の性格特性を最低5つ挙げてランク付けする</h3>
<p><strong>初学者向け解説:</strong> 優れた Scrum Master に共通する性格特性の代表例を紹介します。実際のランク付けはチームや組織の文脈によって変わるため、A-CSM コースでは自分自身の経験に基づいてランク付けを行うワークが含まれます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>特性</th><th>説明</th></tr></thead>
<tbody>
<tr><td>忍耐力 (Patience)</td><td>チームが自己組織化するまで、答えを与えずに待てる力</td></tr>
<tr><td>共感力 (Empathy)</td><td>チームメンバーやステークホルダーの立場に立って考えられる力</td></tr>
<tr><td>誠実さ (Honesty)</td><td>都合の悪い事実も含めて透明性を保てる力</td></tr>
<tr><td>謙虚さ (Humility)</td><td>自分が答えを持っていないことを認められる力</td></tr>
<tr><td>観察力 (Observation)</td><td>チームの言動やチームダイナミクスの微妙な変化に気づける力</td></tr>
<tr><td>協調性 (Collaboration)</td><td>対立する利害関係者の間を取り持てる力</td></tr>
<tr><td>勇気 (Courage)</td><td>難しい会話や現状への異議申し立てを避けない力</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>自己評価として「Scrum の5つの価値基準(確約・勇気・集中・公開・尊敬)」を性格特性のランク付けの土台として使うと、Scrum Alliance の価値観と一貫性のある振り返りができます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">Scrum Alliance — Scrum Values</a></p>
</div>
<h3>LO 1.5: 透明性・検査・適応が機能していない状況を3つ評価する</h3>
<p><strong>初学者向け解説:</strong> Scrum の経験主義(Empiricism)は「透明性 (Transparency)」「検査 (Inspection)」「適応 (Adaptation)」という3本柱に支えられています。A-CSM の Scrum Master は、これらが「形だけ」になっている状況を見抜き、評価できる必要があります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>柱が機能不全に陥っている兆候</th><th>具体例</th></tr></thead>
<tbody>
<tr><td><strong>透明性の欠如</strong></td><td>Sprint Backlog の状況が実態と乖離している / 「ほぼ完成」という曖昧な報告が横行している / Definition of Done が形骸化している</td></tr>
<tr><td><strong>検査の欠如</strong></td><td>デイリースクラムが単なる進捗報告会になり、実際の障害や品質への言及がない / Sprint Review がデモの発表会で終わり、フィードバックが反映されない</td></tr>
<tr><td><strong>適応の欠如</strong></td><td>レトロスペクティブで同じ問題が毎回挙がるが、アクションアイテムが実行されない / 計画に固執し、検査結果を無視して当初のスコープを変えない</td></tr>
</tbody></table></div>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_THREE_PILLARS_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">透明性・検査・適応の3本柱と、崩れた場合の連鎖</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>3本柱が機能しているかを定期的に自己診断するために、レトロスペクティブの冒頭で「今スプリント、私たちは何を隠していなかったか？(透明性)」「何を本当に検査したか？(検査)」「何を実際に変えたか？(適応)」という3つの問いを投げかける手法が有効です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020) — Scrum Pillars</a></p>
</div>
    </section>

    <!-- ===================== SECTION 04. カテゴリー2-A — Scrum Master Core Competencies: Facilitation (LO 2.1–2.8) ===================== -->
    <section id="facilitation">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 04</div>
      <h2>カテゴリー2-A — Scrum Master Core Competencies: Facilitation (LO 2.1–2.8)</h2>

<h3>LO 2.1: 発散的思考と収束的思考の兆候をそれぞれ最低3つ識別する</h3>
<p><strong>初学者向け解説:</strong> 優れたファシリテーションの土台となるのが「発散 (Divergent Thinking)」と「収束 (Convergent Thinking)」の違いを見極める力です。これはデザイン思考の「ダブルダイヤモンド (Double Diamond)」モデルにも通じる考え方です。</p>
<div class="table-wrap">
<table>
<thead><tr><th>局面</th><th>発散的思考の兆候</th><th>収束的思考の兆候</th></tr></thead>
<tbody>
<tr><td>発言の量</td><td>多様な意見・アイデアが次々と出る</td><td>意見が絞り込まれ、少数の選択肢に集中する</td></tr>
<tr><td>発言の性質</td><td>「もし〜だったら」「他には」といった探索的な発言が増える</td><td>「つまり」「優先すべきは」といった統合的な発言が増える</td></tr>
<tr><td>場の空気</td><td>発言に対する評価・批判が抑制される(ブレインストーミングの原則)</td><td>評価・比較・意思決定が積極的に行われる</td></tr>
<tr><td>ファシリテーターの役割</td><td>アイデアの量を増やす問いかけをする</td><td>選択肢を整理し、合意形成に導く</td></tr>
</tbody></table></div>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DOUBLE_DIAMOND" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">ダブルダイヤモンドによる発散と収束のサイクル</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>発散フェーズでは「ブレインストーミングのルール(批判しない、量を求める、突飛な意見を歓迎する)」を明示し、収束フェーズでは「ドット投票 (dot voting)」や「Fist of Five(5本指投票)」のような軽量な意思決定手法を使うことで、両フェーズの切り替えをチームに明確に伝えることができます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://www.designcouncil.org.uk/our-resources/the-double-diamond/" target="_blank" rel="noopener">Design Council (UK) — Double Diamond</a></p>
</div>
<h3>LO 2.2: 複数の視点を統合する際の課題を最低3つ識別する</h3>
<p><strong>初学者向け解説:</strong> Scrum Team、Product Owner、ステークホルダー、経営層など、複数の視点を1つの会議やディスカッションでまとめる際には、以下のような課題が生じやすくなります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>課題</th><th>内容</th><th>対処のヒント</th></tr></thead>
<tbody>
<tr><td>力関係の非対称性</td><td>経営層や声の大きいメンバーの意見が優先されやすい</td><td>ラウンドロビン方式や匿名投票で発言機会を平等にする</td></tr>
<tr><td>専門用語のギャップ</td><td>技術者とビジネス側で使う言葉の意味が異なる</td><td>共通言語(ユビキタス言語)を確立し、都度言い換えを行う</td></tr>
<tr><td>隠れた対立</td><td>表面化していない利害の対立がある</td><td>1on1で事前ヒアリングを行い、会議前に温度感を把握する</td></tr>
<tr><td>情報の非対称性</td><td>参加者ごとに持っている情報量が異なる</td><td>会議前に事前資料を共有し、開始時に前提をそろえる</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://iaf-world.org/the-iaf-core-competencies/" target="_blank" rel="noopener">IAF Core Competencies</a></p>
</div>
<h3>LO 2.3: 効果的な会議・イベントのためのファシリテーティブ・リスニング技法を最低2つ適用する</h3>
<p><strong>初学者向け解説:</strong> 「ファシリテーティブ・リスニング (Facilitative Listening)」とは、単に話を聞くだけでなく、グループの合意形成やアイデアの深掘りを助けるための能動的な傾聴技法です。</p>
<div class="table-wrap">
<table>
<thead><tr><th>技法</th><th>内容</th></tr></thead>
<tbody>
<tr><td><strong>パラフレーズ (Paraphrasing)</strong></td><td>発言者の言葉を自分の言葉で言い換えて確認し、全員の理解を揃える</td></tr>
<tr><td><strong>要約 (Summarizing)</strong></td><td>複数の発言をまとめて、議論の現在地を可視化する</td></tr>
<tr><td><strong>明確化のための質問 (Clarifying Questions)</strong></td><td>曖昧な発言に対して「具体的にはどういうことですか？」と深掘りする</td></tr>
<tr><td><strong>感情の反映 (Reflecting Feelings)</strong></td><td>発言の背後にある感情(不安・懸念など)を言語化して場に出す</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>ファシリテーターは「自分の意見を言わない」ことに徹し、グループ自身が答えにたどり着けるよう質問と要約に徹することが重要です。これは中立性 (Neutrality) の原則とも呼ばれます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://iaf-world.org/the-iaf-core-competencies/" target="_blank" rel="noopener">IAF Core Competencies</a></p>
</div>
<h3>LO 2.4: オープンディスカッションの代替手法を最低2つ実演する</h3>
<p><strong>初学者向け解説:</strong> 「自由に発言してください」というオープンディスカッションは、声の大きい人だけが発言し、内向的なメンバーの意見が埋もれるリスクがあります。<strong>Liberating Structures</strong> はこの問題を解決するための代替手法(マイクロストラクチャー)を数多く提供しています。</p>
<div class="table-wrap">
<table>
<thead><tr><th>手法</th><th>概要</th></tr></thead>
<tbody>
<tr><td><strong>1-2-4-All</strong></td><td>個人で考える(1)→ペアで話す(2)→4人グループで統合する(4)→全体で共有する(All)というステップで、全員の意見を漏れなく引き出す</td></tr>
<tr><td><strong>Silent Writing (無言のブレインストーミング)</strong></td><td>発言の前に付箋やドキュメントに個人で書き出す時間を設け、同調圧力を減らす</td></tr>
<tr><td><strong>World Café</strong></td><td>小グループでのテーブルディスカッションを何ラウンドかローテーションしながら知見を混ぜ合わせる</td></tr>
<tr><td><strong>Fishbowl</strong></td><td>内側の少人数が議論し、外側のメンバーは観察する形式を交代しながら進める</td></tr>
</tbody></table></div>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ONE_TWO_FOUR_ALL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Liberating Structures「1-2-4-All」の流れ</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>オープンディスカッションが停滞している、あるいは一部の声だけが支配的だと感じたら、まず 1-2-4-All に切り替えてみましょう。ファシリテーション経験がなくても実施できるシンプルさが特徴です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://www.liberatingstructures.com/" target="_blank" rel="noopener">Liberating Structures</a></li>
    <li><a href="https://www.liberatingstructures.com/design-elements/" target="_blank" rel="noopener">Liberating Structures — Design Elements</a></li>
  </ul>
</div>
<h3>LO 2.5: Scrum Master がファシリテーターとして振る舞うべきでない例を2つ説明する</h3>
<p><strong>初学者向け解説:</strong> Scrum Master は「常にファシリテーターであるべき」わけではありません。以下のような状況では、あえてファシリテーター役を降りる、あるいは他者に委ねることが望ましいとされます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>状況</th><th>理由</th></tr></thead>
<tbody>
<tr><td>Scrum Master 自身が議論の当事者・利害関係者である場合(例: 自分が提案した変更についての合意形成)</td><td>中立性を保てず、無意識に議論を誘導してしまうリスクがあるため</td></tr>
<tr><td>チームが既に高い自己組織化能力を持ち、自分たちでファシリテートできる状態にある場合</td><td>Scrum Master が介入し続けると、チームの自律的な成長を妨げる(過保護になる)ため</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>自分が当事者になる議論では、外部のファシリテーター(他チームの Scrum Master など)に依頼する「ファシリテーターの互助」の仕組みを組織内に作ることが有効です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a> — Scrum Master の役割は「サーバントリーダー」であり、常に議論の中心に立つことを意味しない旨が示されています。</p>
</div>
<h3>LO 2.6: 最低2つの協働イベントを設計・ファシリテートする</h3>
<p><strong>初学者向け解説:</strong> 「協働イベント (Collaborative Event)」とは、Sprint Planning や Retrospective のような定例イベントだけでなく、リスク特定ワークショップ、ユーザーストーリーマッピング、インセプションデッキ作成会など、目的に応じて設計するセッション全般を指します。設計時には以下の要素を明確にすることが重要です。</p>
<div class="table-wrap">
<table>
<thead><tr><th>設計要素</th><th>問い</th></tr></thead>
<tbody>
<tr><td>目的 (Purpose)</td><td>このセッションで何を達成したいか？</td></tr>
<tr><td>参加者 (Who)</td><td>誰の視点が必要か？</td></tr>
<tr><td>プロセス (How)</td><td>発散→収束のどの手法を使うか？</td></tr>
<tr><td>成果物 (Output)</td><td>セッション終了時に何が手元に残るべきか？</td></tr>
<tr><td>タイムボックス (When)</td><td>各アクティビティに何分割り当てるか？</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>セッション設計時には「アジェンダ」ではなく、Liberating Structures の <strong>Design Storyboards</strong>(複数のマイクロストラクチャーをつなげた一連の流れ= <strong>string</strong> を、設計図として時系列に描き起こしたもの)を作り、各アクティビティの目的と所要時間を明示しておくと、当日の進行がぶれません。単なる議題の羅列ではなく、「どの活動で何を引き出すか」を設計するための流れ図である点が違いです。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://iaf-world.org/the-iaf-core-competencies/" target="_blank" rel="noopener">IAF Core Competencies</a></p>
</div>
<h3>LO 2.7: 明確なコミュニケーションの障害を解決する戦略を最低1つ選択する</h3>
<p><strong>初学者向け解説:</strong> チーム内のコミュニケーション障害の代表的な原因と、それに対応する戦略の例です。</p>
<div class="table-wrap">
<table>
<thead><tr><th>障害の原因</th><th>戦略</th></tr></thead>
<tbody>
<tr><td>リモート/分散環境での非言語情報の欠如</td><td>カメラオンの原則、バーチャルホワイトボードの活用</td></tr>
<tr><td>専門用語・部門文化の違い</td><td>用語集(Glossary)の共同作成、ユビキタス言語の確立</td></tr>
<tr><td>心理的安全性の欠如</td><td>Working Agreement(作業合意)にコミュニケーションのグラウンドルールを明記する</td></tr>
<tr><td>情報の一方向的な流れ</td><td>デイリースクラムの目的を「報告会」から「同期と計画の場」へ再定義する</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></p>
</div>
<h3>LO 2.8: 明確なコミュニケーションとチームワークを促進する作業合意 (Working Agreement) を作成する</h3>
<p><strong>初学者向け解説:</strong> <strong>Working Agreement(作業合意 / チーム規範)</strong> とは、チームが自分たちで決める「一緒に働く上でのルール」です。Scrum Guide には明記されていませんが、実務上は Definition of Done と並んで自己組織化を支える重要な成果物とされています。</p>
<p><strong>Working Agreement に含まれる代表的な項目:</strong></p>
<ul>
  <li>コアタイム・稼働時間帯の合意</li>
  <li>会議への遅刻・欠席時のルール</li>
  <li>Pull Request のレビュー担当・タイムアウト</li>
  <li>「完了」の共通認識(Definition of Done とは別に、日々のタスクレベルでの合意)</li>
  <li>対立が起きた際のエスカレーションルール</li>
</ul>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_WORKING_AGREEMENT_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Working Agreement 作成とレトロスペクティブでの見直しサイクル</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>Working Agreement は一度作って終わりではなく、レトロスペクティブのたびに「今も機能しているか」を確認し、必要に応じて更新する「生きたドキュメント」として扱いましょう。押し付けではなく、チーム自身が作成・改訂することが自己組織化の観点で重要です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></li>
    <li><a href="https://www.liberatingstructures.com/" target="_blank" rel="noopener">Liberating Structures</a></li>
  </ul>
</div>
    </section>

    <!-- ===================== SECTION 05. カテゴリー2-B — Scrum Master Core Competencies: Coaching and Training (LO 2.9–2.12) ===================== -->
    <section id="coaching-training">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:school" aria-hidden="true" />SECTION 05</div>
      <h2>カテゴリー2-B — Scrum Master Core Competencies: Coaching and Training (LO 2.9–2.12)</h2>

<h3>LO 2.9: コーチング・スタンスの要素を最低3つ説明する</h3>
<p><strong>初学者向け解説:</strong> 「コーチング・スタンス (Coaching Stance)」とは、コーチが相手と向き合う際の基本姿勢のことです。International Coaching Federation (ICF) の Core Competencies を参考にすると、以下のような要素が挙げられます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>要素</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>答えを与えない (Not providing the answer)</strong></td><td>相手が自分自身で答えを見つけられるよう、質問を通じて導く</td></tr>
<tr><td><strong>信頼と安全の醸成 (Cultivates Trust and Safety)</strong></td><td>相手が安心して本音を話せる関係を築く</td></tr>
<tr><td><strong>積極的傾聴 (Listens Actively)</strong></td><td>言葉だけでなく、感情・エネルギーの変化にも注意を払う</td></tr>
<tr><td><strong>気づきの喚起 (Evokes Awareness)</strong></td><td>相手が自ら新しい視点に気づけるような問いを投げかける</td></tr>
<tr><td><strong>クライアントの成長を促進する (Facilitates Client Growth)</strong></td><td>学びを行動に変換する支援をする</td></tr>
</tbody></table></div>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_COACHING_COMPETENCY_PYRAMID" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">ICF Core Competencies に基づくコーチング・スタンスの構造</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>コーチング・スタンスは「ティーチング(教える)」「メンタリング(経験を伝える)」とは明確に異なります。A-CSM の Scrum Master は、状況に応じてこの3つのモード(コーチング・メンタリング・ティーチング)を意図的に使い分ける必要があります。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/" target="_blank" rel="noopener">ICF Core Competencies</a></p>
</div>
<h3>LO 2.10: 2つの介入 (Intervention) に対して適切なコーチング技法を適用する</h3>
<p><strong>初学者向け解説:</strong> 「介入」とは、チームやメンバーが困難に直面している場面で Scrum Master が働きかける行為全般を指します。介入の技法は状況によって使い分けます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>介入の場面</th><th>適したコーチング技法</th></tr></thead>
<tbody>
<tr><td>チームが対立を避けて表面的な合意に流れている</td><td>パワフルクエスチョン(例:「本当に懸念していることは何ですか？」)を投げかけ、対立を安全に表面化させる</td></tr>
<tr><td>メンバーが自信を失い、意思決定を Scrum Master に委ねようとする</td><td>GROWモデル(Goal・Reality・Options・Will)に沿って本人に選択肢を出させ、決定は本人に委ねる</td></tr>
</tbody></table></div>
<p><strong>GROW モデルの流れ:</strong></p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_GROW_MODEL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">GROW モデルの4ステップ</div>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/" target="_blank" rel="noopener">ICF Core Competencies</a></p>
</div>
<h3>LO 2.11: 介入を分析し、最低2つの改善点を特定する</h3>
<p><strong>初学者向け解説:</strong> コーチングの介入は一度きりで終わらせず、振り返りを行うことでスキルを磨いていきます。振り返りの観点の例:</p>
<div class="table-wrap">
<table>
<thead><tr><th>振り返りの観点</th><th>問い</th></tr></thead>
<tbody>
<tr><td>質問の質</td><td>誘導的な質問(Yes/Noで答えられる質問)になっていなかったか？ オープンクエスチョンだったか？</td></tr>
<tr><td>沈黙の扱い</td><td>相手が考えている沈黙を、焦って埋めてしまわなかったか？</td></tr>
<tr><td>中立性</td><td>自分の意見やアドバイスを無意識に押し付けていなかったか？</td></tr>
<tr><td>フォローアップ</td><td>介入後にその後の変化を確認するフォローアップを行ったか？</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>コーチング仲間同士で「ピアコーチング」を行い、お互いの介入を観察してフィードバックし合う「コーチングクラブ」を組織内に作ることで、継続的にスキルを向上させることができます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/" target="_blank" rel="noopener">ICF Core Competencies</a></p>
</div>
<h3>LO 2.12: ビジネスステークホルダーに Scrum とそのメリットを説明する</h3>
<p><strong>初学者向け解説:</strong> 技術的な背景を持たないビジネスステークホルダーに Scrum を説明する際は、専門用語(Sprint、Backlog など)をそのまま使うのではなく、ビジネス上の価値に翻訳して伝えることが重要です。</p>
<div class="table-wrap">
<table>
<thead><tr><th>Scrum の要素</th><th>ビジネス視点での説明</th></tr></thead>
<tbody>
<tr><td>Sprint(短い開発サイクル)</td><td>「最大でも数週間ごとに、動く成果物を確認できるので、方向性のズレを早期に修正できます」</td></tr>
<tr><td>Product Backlog の優先順位付け</td><td>「限られたリソースを、最もビジネス価値の高い項目から投資できます」</td></tr>
<tr><td>Sprint Review</td><td>「完成前の段階で頻繁にフィードバックを得られるため、手戻りのリスクを減らせます」</td></tr>
<tr><td>透明性</td><td>「進捗状況が常に可視化されているため、意思決定のための正確な情報が得られます」</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>抽象的な説明よりも「もし今のやり方(ウォーターフォール型)なら〜だったが、Scrum ならこう変わる」という Before/After の対比で語ると、ビジネスステークホルダーの腹落ち感が高まります。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">Manifesto for Agile Software Development</a></li>
    <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></li>
  </ul>
</div>
    </section>

    <!-- ===================== SECTION 06. カテゴリー3-A — Service to the Scrum Team: Self-Management and Team Dynamics (LO 3.1–3.4) ===================== -->
    <section id="self-management-team-dynamics">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:affiliate" aria-hidden="true" />SECTION 06</div>
      <h2>カテゴリー3-A — Service to the Scrum Team: Self-Management and Team Dynamics (LO 3.1–3.4)</h2>

<h3>LO 3.1: 効果的な自己管理型チームの属性を最低3つ説明する</h3>
<p><strong>初学者向け解説:</strong> 2020年版 Scrum Guide では、それまでの「自己組織化 (Self-Organizing)」という表現が「自己管理 (Self-Managing)」に置き換えられました。自己管理型チームとは、「誰が」「何を」「どのように」行うかを、チーム自身が内部で選択できるチームを指します。</p>
<div class="table-wrap">
<table>
<thead><tr><th>属性</th><th>説明</th></tr></thead>
<tbody>
<tr><td>明確な目的意識</td><td>Product Goal や Sprint Goal に対する当事者意識を持っている</td></tr>
<tr><td>相互信頼</td><td>メンバー同士が互いのスキルと判断を信頼している</td></tr>
<tr><td>心理的安全性</td><td>失敗や懸念を率直に話せる雰囲気がある</td></tr>
<tr><td>説明責任の共有</td><td>結果に対する責任を個人ではなくチーム全体で引き受ける</td></tr>
<tr><td>継続的な学習意欲</td><td>レトロスペクティブでの改善提案を自ら実行する</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></p>
</div>
<h3>LO 3.2: チームの自己管理能力を向上させる技法を適用する</h3>
<p><strong>初学者向け解説:</strong> 自己管理能力は自然に育つものではなく、意図的な働きかけによって育成されます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>技法</th><th>内容</th></tr></thead>
<tbody>
<tr><td><strong>意思決定の権限移譲</strong></td><td>Scrum Master が決めていたこと(例: タスクの割り振り)を段階的にチームに委ねる</td></tr>
<tr><td><strong>デリゲーションポーカー</strong></td><td>意思決定の権限レベル(指示する〜委任する、の7段階)をチームと合意する軽量な手法</td></tr>
<tr><td><strong>障害物の可視化と自己解決の促進</strong></td><td>Scrum Master がすべての障害物を代わりに解決するのではなく、まずチーム自身で解決を試みるよう促す</td></tr>
</tbody></table></div>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DELEGATION_POKER" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">デリゲーションポーカーの7段階</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>デリゲーションポーカーの7段階を使い、意思決定の種類ごと(例: 技術選定、採用面接への参加、休暇の調整)に現在のレベルと目指すべきレベルをチームで話し合うワークショップを定期的に実施すると、権限移譲が段階的かつ透明に進みます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></p>
</div>
<h3>LO 3.3: チームとワーキンググループの違いを説明する</h3>
<p><strong>初学者向け解説:</strong> 「チーム (Team)」と「ワーキンググループ (Working Group)」は似ているようで本質的に異なります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>観点</th><th>ワーキンググループ</th><th>チーム</th></tr></thead>
<tbody>
<tr><td>目標</td><td>個人ごとの目標の集合</td><td>共有された1つの目標</td></tr>
<tr><td>成果責任</td><td>個人が自分の担当分に責任を持つ</td><td>チーム全体で成果に責任を持つ</td></tr>
<tr><td>相互依存性</td><td>低い(各自が独立して作業)</td><td>高い(協働しないと成果が出ない)</td></tr>
<tr><td>コミュニケーション</td><td>情報共有が中心</td><td>共同での問題解決が中心</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>Scrum Team が「ワーキンググループ」の状態(各自がタスクを個別にこなすだけ)に陥っていないかを見極めるために、「もし1人が抜けたら、他のメンバーはその作業を引き継げるか？」という問いをチェックポイントとして使うとよいでしょう。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></p>
</div>
<h3>LO 3.4: チーム形成・発展のための多段階モデルを最低1つ説明する</h3>
<p><strong>初学者向け解説:</strong> チームの成長段階を説明する代表的なモデルが、心理学者 Bruce Tuckman が1965年に提唱した <strong>Forming - Storming - Norming - Performing(+ 1977年追加の Adjourning)</strong> モデルです。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TUCKMAN_MODEL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Tuckman モデルによるチーム発展の5段階</div>
</div>
<div class="table-wrap">
<table>
<thead><tr><th>段階</th><th>特徴</th><th>Scrum Master の関わり方</th></tr></thead>
<tbody>
<tr><td>Forming(形成期)</td><td>メンバーは礼儀正しく、様子見の状態。役割や目的への不安がある</td><td>明確な目的・役割・グラウンドルールを提示する</td></tr>
<tr><td>Storming(混乱期)</td><td>意見の対立や、リーダーへの疑問が表面化する</td><td>対立を無理に鎮めず、安全に議論できる場を作る(LO 6.2 参照)</td></tr>
<tr><td>Norming(統一期)</td><td>役割分担が定まり、協力関係が生まれる</td><td>チームが決めたルール・合意を尊重し、後押しする</td></tr>
<tr><td>Performing(機能期)</td><td>チームが自律的に高いパフォーマンスを発揮する</td><td>介入を最小限にし、障害物の除去に徹する</td></tr>
<tr><td>Adjourning(解散期)</td><td>プロジェクト終了やメンバー入れ替えでチームが解散する</td><td>振り返りと労いの場を設ける</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>新しいメンバーが加入するたびに、チームは実質的に Forming に戻ることを理解しておきましょう。焦って Performing の状態を維持しようとせず、段階を経ることを許容する姿勢が重要です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://infed.org/dir/welcome/bruce-w-tuckman-forming-storming-norming-and-performing-in-groups/" target="_blank" rel="noopener">Tuckman's stages of group development — infed.org (原論文の解説)</a></p>
</div>
    </section>

    <!-- ===================== SECTION 07. カテゴリー3-B — Service to the Scrum Team: Definition of Done and Development Practices (LO 3.5–3.8) ===================== -->
    <section id="definition-of-done">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checklist" aria-hidden="true" />SECTION 07</div>
      <h2>カテゴリー3-B — Service to the Scrum Team: Definition of Done and Development Practices (LO 3.5–3.8)</h2>

<h3>LO 3.5: 強力な Definition of Done (DoD) の作成・改善をファシリテートする</h3>
<p><strong>初学者向け解説:</strong> <strong>Definition of Done (完成の定義)</strong> は、Increment(インクリメント)が「完成した」と言えるための品質基準を定めた正式な記述です。Scrum Guide (2020) では、DoD は Scrum Team 全体で作成・共有される「コミットメント」の1つと位置づけられています。</p>
<p><strong>DoD 作成・改善のファシリテーションステップ:</strong></p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DOD_FACILITATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">強力な Definition of Done を作成・改善するファシリテーションの流れ</div>
</div>
<div class="table-wrap">
<table>
<thead><tr><th>DoD に含まれる代表的な項目例(ソフトウェアの場合)</th></tr></thead>
<tbody>
<tr><td>コードレビューが完了している</td></tr>
<tr><td>単体テスト・自動テストが通過している</td></tr>
<tr><td>ドキュメントが更新されている</td></tr>
<tr><td>(任意・文脈依存)プロダクトオーナーによる受け入れ確認が完了している — Scrum が定める DoD の要件ではなく、組織やプロダクトの事情に応じて加える運用上のコントロール</td></tr>
<tr><td>本番相当の環境にデプロイ可能な状態である</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>DoD は一度作ったら固定するのではなく、チームの技術力や組織の期待水準が上がるにつれて、より厳格な基準へと「強化」していくべきものです。逆に緩めることは品質の後退を意味するため慎重に扱いましょう。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020) — Definition of Done</a></p>
</div>
<h3>LO 3.6: 非ソフトウェア製品における Definition of Done の定式化方法を説明する</h3>
<p><strong>初学者向け解説:</strong> Scrum はソフトウェア開発以外の領域(マーケティング、人事、教育、ハードウェア開発など)でも活用されています。非ソフトウェア製品における DoD の考え方の例:</p>
<div class="table-wrap">
<table>
<thead><tr><th>領域</th><th>DoD の例</th></tr></thead>
<tbody>
<tr><td>マーケティングキャンペーン</td><td>クリエイティブが法務レビューを通過している / 効果測定用のトラッキングが設定されている / 関係部署の承認が得られている</td></tr>
<tr><td>研修コンテンツ制作</td><td>教材が実際の受講者グループでパイロットテストされている / 講師用のファシリテーションガイドが完成している</td></tr>
<tr><td>ハードウェアプロトタイプ</td><td>安全基準テストに合格している / 必要な認証プロセスの初期審査を通過している</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>非ソフトウェア領域では「完成」の基準があいまいになりがちです。DoD 作成時に「これが完成していないのに次の工程に進んだ場合、過去にどんな問題が起きたか」を洗い出すことで、抜け漏れのない DoD を作りやすくなります。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a> — Scrum は「あらゆる複雑な仕事」に適用可能なフレームワークとして記述されています。</p>
</div>
<h3>LO 3.7: 開発プラクティスが Scrum Team の価値あるインクリメント提供能力に与える影響を最低2つ説明する</h3>
<p><strong>初学者向け解説:</strong> Scrum はプロセスの「What/When」を規定しますが、「How(技術的にどう作るか)」までは規定していません。しかし、技術的なプラクティスの質は、Scrum Team が毎スプリント価値あるインクリメントを届けられるかどうかに直結します。</p>
<div class="table-wrap">
<table>
<thead><tr><th>開発プラクティス</th><th>インクリメント提供能力への影響</th></tr></thead>
<tbody>
<tr><td>継続的インテグレーション/継続的デリバリー (CI/CD)</td><td>統合の手戻りを減らし、毎スプリントのリリース可能な状態を維持しやすくする</td></tr>
<tr><td>テスト駆動開発 (TDD) / 自動テスト</td><td>品質の作り込みにより「一見完成しているが実は壊れている」インクリメントを防ぐ</td></tr>
<tr><td>リファクタリングとクリーンコード</td><td>技術的負債の蓄積を防ぎ、将来のスプリントでの開発速度低下を防ぐ</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a> — 開発プラクティスの重要性は Scrum Guide 自体には詳述されていませんが、"Scrum Team の Done の定義を支える" 文脈で言及されています。</p>
</div>
<h3>LO 3.8: 複数チーム環境における開発プラクティスの有用性を説明する</h3>
<p><strong>初学者向け解説:</strong> 複数の Scrum Team が1つのプロダクトに関わる環境(スケーリングされた環境)では、開発プラクティスの重要性がさらに増します。</p>
<div class="table-wrap">
<table>
<thead><tr><th>状況</th><th>開発プラクティスがもたらす価値</th></tr></thead>
<tbody>
<tr><td>複数チームが同じコードベースを触る</td><td>継続的インテグレーションがないと、統合時のコンフリクトやデグレードが頻発する</td></tr>
<tr><td>各チームが異なる Definition of Done を持つ</td><td>統一されたコーディング規約・自動テスト基盤がないと、「Done」の意味がチーム間でバラバラになる</td></tr>
<tr><td>リリースの同期が必要</td><td>自動化されたデプロイパイプラインがないと、複数チームの成果物を1つの Integrated Increment としてまとめるコストが跳ね上がる</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>複数チーム環境では、共通の DoD(Nexus における "Definition of Done" の統一)と、共有の CI/CD 基盤への投資を早期に行うことが、スケーリングの成否を分けます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://www.scrum.org/resources/nexus-guide" target="_blank" rel="noopener">The Nexus Guide</a></p>
</div>
    </section>

    <!-- ===================== SECTION 08. カテゴリー4 — Service to the Product Owner (LO 4.1–4.4) ===================== -->
    <section id="service-to-product-owner">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target-arrow" aria-hidden="true" />SECTION 08</div>
      <h2>カテゴリー4 — Service to the Product Owner (LO 4.1–4.4)</h2>

<h3>LO 4.1: プロダクトビジョンと Product Goal の関係を説明する</h3>
<p><strong>初学者向け解説:</strong> <strong>Product Vision(プロダクトビジョン)</strong> は、プロダクトが最終的に目指す長期的な姿を表す、いわば「北極星」です。<strong>Product Goal(プロダクトゴール)</strong> は、2020年版 Scrum Guide で新たに Product Backlog のコミットメントとして追加された概念で、ビジョンに向かう途中の「次のマイルストーン」にあたります。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_VISION_GOAL_HIERARCHY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Product Vision から Sprint Goal までの階層構造</div>
</div>
<div class="table-wrap">
<table>
<thead><tr><th>要素</th><th>時間軸</th><th>例</th></tr></thead>
<tbody>
<tr><td>Product Vision</td><td>数年</td><td>「あらゆる中小企業が専門知識なしに経理を自動化できる世界」</td></tr>
<tr><td>Product Goal</td><td>数ヶ月</td><td>「フリーランス向け請求書機能をリリースし、有料転換率10%を達成する」</td></tr>
<tr><td>Sprint Goal</td><td>1スプリント</td><td>「請求書テンプレートのカスタマイズ機能を完成させる」</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020) — Product Goal</a></p>
</div>
<h3>LO 4.2: Scrum Team とステークホルダーとともに Product Goal を検討・改良する</h3>
<p><strong>初学者向け解説:</strong> Product Goal を定めることに説明責任を持つのは Product Owner ですが、その内容は Scrum Team やステークホルダーとの対話を通じて磨かれていくべきものです。決定の責任者は Product Owner であり、対話はその判断の質を高めるためのものである、という関係を取り違えないことが重要です。A-CSM の Scrum Master は、この対話をファシリテートする役割を担います。</p>
<p><strong>ファシリテーションの流れの例:</strong></p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_PRODUCT_GOAL_FACILITATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Product Goal をステークホルダーと検討するファシリテーションの流れ</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>「インパクトマッピング (Impact Mapping)」のような手法を使うと、「なぜ (Why)」「誰に (Who)」「どう変化してほしいか (How)」「何を作るか (What)」の階層構造で Product Goal をステークホルダーと一緒に検討でき、独りよがりなゴール設定を防げます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></p>
</div>
<h3>LO 4.3: Product Goal の達成を支える Product Backlog を作成する</h3>
<p><strong>初学者向け解説:</strong> Product Backlog は単なる「やることリスト」ではなく、Product Goal を達成するための「計画」として機能する必要があります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>良い Product Backlog の特徴(DEEP の原則)</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>D</strong>etailed appropriately(適切な詳細度)</td><td>直近の項目は詳細に、将来の項目は粗く記述する</td></tr>
<tr><td><strong>E</strong>stimated(見積もられている)</td><td>相対的な規模感が見積もられている</td></tr>
<tr><td><strong>E</strong>mergent(創発的)</td><td>学びに応じて常に変化・進化する</td></tr>
<tr><td><strong>P</strong>rioritized(優先順位付けされている)</td><td>Product Goal への貢献度に基づいて並び替えられている</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020) — Product Backlog</a></p>
</div>
<h3>LO 4.4: Product Backlog のリファインメント (Refinement) の手法を最低1つ実践する</h3>
<p><strong>初学者向け解説:</strong> <strong>リファインメント (Refinement)</strong> とは、Product Backlog の項目に詳細・見積もり・順序を追加していく継続的な活動です。2020年版 Scrum Guide では正式なイベントではなく「継続的な活動」として位置づけられています。</p>
<div class="table-wrap">
<table>
<thead><tr><th>手法</th><th>概要</th></tr></thead>
<tbody>
<tr><td><strong>ユーザーストーリーマッピング (Story Mapping)</strong></td><td>ユーザーの行動フローに沿って機能を並べ、優先順位とリリース単位を可視化する</td></tr>
<tr><td><strong>プランニングポーカー (Planning Poker)</strong></td><td>チーム全員で相対見積もりを行い、認識のズレを対話で解消する</td></tr>
<tr><td><strong>INVEST 基準によるレビュー</strong></td><td>ストーリーが独立している (Independent)・交渉可能 (Negotiable)・価値がある (Valuable)・見積もり可能 (Estimable)・小さい (Small)・テスト可能 (Testable) かをチェックする</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>リファインメントを「Sprint 終盤のイベント」として一括で行うのではなく、Sprint 期間を通じて少しずつ(例: 週に数十分)継続的に実施することで、Sprint Planning がスムーズになります。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020) — Product Backlog Refinement</a> / Jeff Patton, <em>User Story Mapping</em> の概念</p>
</div>
    </section>

    <!-- ===================== SECTION 09. カテゴリー5-A — Service to the Organization: 組織的障害 (LO 5.1–5.2) ===================== -->
    <section id="organizational-impediments">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 09</div>
      <h2>カテゴリー5-A — Service to the Organization: 組織的障害 (LO 5.1–5.2)</h2>

<h3>LO 5.1: 組織的障害の根本原因を解決する実践を行う</h3>
<p><strong>初学者向け解説:</strong> チームレベルの障害(例: テスト環境が遅い)は Scrum Master がその場で対処できることが多い一方、<strong>組織的障害 (Organizational Impediment)</strong> は組織の構造・ポリシー・文化に根ざしており、根本原因の特定が不可欠です。代表的な手法が「なぜなぜ分析 (5 Whys)」です。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FIVE_WHYS_ANALYSIS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">なぜなぜ分析(5 Whys)による根本原因の特定</div>
</div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>「なぜなぜ分析」を1人で行うのではなく、関係する複数部署の担当者を巻き込んで行うことで、部署ごとの思い込みや責任転嫁を防ぎ、真の根本原因にたどり着きやすくなります。また、根本原因への対処には時間がかかることが多いため、短期的な緩和策と長期的な根本対策を分けて計画することが重要です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a> — Scrum Master の組織へのサービスとして「組織的な障害の除去」が明記されています。</p>
</div>
<h3>LO 5.2: 最新の Scrum の定義を採用した場合の影響を最低3つ議論する</h3>
<p><strong>初学者向け解説:</strong> Scrum Guide は定期的に改訂されており(直近は2020年)、最新の定義には過去との重要な違いがあります。組織やチームが最新版を採用する際、以下のような影響が考えられます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>変更点(2017年版→2020年版の例)</th><th>想定される影響</th></tr></thead>
<tbody>
<tr><td>Development Team という区分の廃止(全員が Scrum Team のメンバー)</td><td>「開発者」と「その他」という上下関係的な認識が薄れ、フラットなチーム文化が促進される可能性がある</td></tr>
<tr><td>Product Goal の新設</td><td>Sprint Goal だけでは見えなかった中期的な方向性が明確になり、Product Backlog の優先順位判断がしやすくなる</td></tr>
<tr><td>自己組織化 (Self-Organizing) → 自己管理 (Self-Managing) への変更</td><td>チームが「誰が何を担当するか」だけでなく「どのように仕事をするか」まで裁量を持つべきという期待が強まる</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>新しい定義を採用する際は、いきなり全社的なルール変更として展開するのではなく、まず1〜2チームで試験的に適用し、実際の影響(LO 5.2 で問われる「影響の議論」)を観察してから展開範囲を広げるアプローチが安全です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide (2020)</a></p>
</div>
    </section>

    <!-- ===================== SECTION 10. カテゴリー5-B — Service to the Organization: Scaling Scrum (LO 5.3–5.6) ===================== -->
    <section id="scaling-scrum">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:network" aria-hidden="true" />SECTION 10</div>
      <h2>カテゴリー5-B — Service to the Organization: Scaling Scrum (LO 5.3–5.6)</h2>

<h3>LO 5.3: Scrum をスケールするアプローチを最低2つ認識する</h3>
<p><strong>初学者向け解説:</strong> 複数の Scrum Team が1つのプロダクトに関わる必要が出てきたとき、いくつかのスケーリングフレームワークが選択肢になります。代表的な3つを紹介します。</p>
<div class="table-wrap">
<table>
<thead><tr><th>フレームワーク</th><th>提供元</th><th>特徴</th></tr></thead>
<tbody>
<tr><td><strong>Nexus</strong></td><td>Scrum.org (Ken Schwaber)</td><td>Scrum を「最小限」拡張。3〜9チーム程度を想定し、Nexus Integration Team が統合を担う</td></tr>
<tr><td><strong>LeSS (Large-Scale Scrum)</strong></td><td>Craig Larman & Bas Vodde</td><td>「より少なく、より多くを (more with LeSS)」という思想で、単一の Product Backlog・単一の Product Owner・単一の Sprint に多数のチームを乗せる</td></tr>
<tr><td><strong>SAFe (Scaled Agile Framework)</strong></td><td>Scaled Agile, Inc.</td><td>企業全体(ポートフォリオ〜チームレベル)を対象とした、より包括的で規範的なフレームワーク</td></tr>
</tbody></table></div>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SCALING_FRAMEWORKS_COMPARISON" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Nexus・LeSS・SAFe のスケーリングアプローチ比較</div>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://www.scrum.org/resources/nexus-guide" target="_blank" rel="noopener">The Nexus Guide</a></li>
    <li><a href="https://less.works/less/framework" target="_blank" rel="noopener">LeSS — Introduction</a></li>
    <li><a href="https://scaledagileframework.com/" target="_blank" rel="noopener">Scaled Agile Framework</a></li>
  </ul>
</div>
<h3>LO 5.4: 組織がスケールしないことを選択する理由を最低2つ説明する</h3>
<p><strong>初学者向け解説:</strong> スケーリングフレームワークの導入が常に正解とは限りません。以下のような理由で「あえてスケールしない」選択が合理的な場合があります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>理由</th><th>説明</th></tr></thead>
<tbody>
<tr><td>チーム分割前にプロダクトの複雑さの削減余地がある</td><td>アーキテクチャや機能自体を見直し、単一チームで扱える規模に縮小できる可能性がある</td></tr>
<tr><td>スケーリングの導入・運用コストがプロダクト価値を上回る</td><td>フレームワーク導入には教育・調整コストがかかるため、小規模プロダクトでは投資対効果が見合わないことがある</td></tr>
<tr><td>組織文化・成熟度が追いついていない</td><td>LeSS や Nexus は高い自己管理能力を前提とするため、土台が整う前に導入すると形骸化するリスクがある</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>「本当にスケールが必要か？」を問う前に、まず「1つのチームでできる範囲を最大化できないか(コンポーネントの削減、依存関係の解消)」を検討するのが LeSS の思想である「より少なく (More with LeSS)」の精神です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://less.works/less/principles" target="_blank" rel="noopener">LeSS — Principles Overview</a> — 「まず1つのチームでうまくいく仕組みを作り、そこからスケールする」という原則</p>
</div>
<h3>LO 5.5: 依存関係を可視化・管理・削減する技法を最低2つ識別する</h3>
<p><strong>初学者向け解説:</strong> 複数チーム環境における最大の課題の一つが「依存関係」です。以下のような技法で対処します。</p>
<div class="table-wrap">
<table>
<thead><tr><th>技法</th><th>概要</th></tr></thead>
<tbody>
<tr><td><strong>依存関係ボード / Dependency Board</strong></td><td>チーム間の依存関係を可視化するボードを作成し、Nexus の Cross-Team Refinement などで定期的に更新する</td></tr>
<tr><td><strong>Feature Team 化</strong></td><td>コンポーネント単位ではなく機能(フィーチャー)単位でチームを構成し、そもそも依存関係が生まれない構造にする</td></tr>
<tr><td><strong>Thin Slicing(薄いスライス化)</strong></td><td>Product Backlog Item をできるだけ小さく分割し、依存の影響範囲を最小化する</td></tr>
<tr><td><strong>X-as-a-Service インタラクション</strong></td><td>Team Topologies が提唱する、チーム間のやり取りを「サービス提供者と利用者」の関係に定義し、依存を明示的・非同期的に管理する</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>依存関係は「なくす」ことが理想ですが、完全になくせない場合は「見える化」するだけでも大きな効果があります。依存を暗黙のまま放置することが、複数チーム環境で最も危険な状態です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://www.scrum.org/resources/nexus-guide" target="_blank" rel="noopener">The Nexus Guide</a></li>
    <li><a href="https://teamtopologies.com/key-concepts" target="_blank" rel="noopener">Team Topologies — Key Concepts</a></li>
  </ul>
</div>
<h3>LO 5.6: フィーチャーチームとコンポーネントチームの利点・欠点を最低3つずつ説明する</h3>
<p><strong>初学者向け解説:</strong> チーム編成の代表的な2つのアプローチを比較します。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FEATURE_VS_COMPONENT_TEAMS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">フィーチャーチームとコンポーネントチームの構造比較</div>
</div>
<div class="table-wrap">
<table>
<thead><tr><th>観点</th><th>フィーチャーチーム</th><th>コンポーネントチーム</th></tr></thead>
<tbody>
<tr><td><strong>利点</strong></td><td>エンドツーエンドの価値提供が速い / チーム間の依存が少ない / 顧客価値への当事者意識が高い</td><td>技術的専門性を深められる / 同一技術領域内での一貫性を保ちやすい / 大規模基盤への投資がしやすい</td></tr>
<tr><td><strong>欠点</strong></td><td>幅広い技術スキルが要求される(T字型人材が必要) / 技術的一貫性の維持が難しい場合がある</td><td>機能完成のために複数チームの調整・依存が必要になる / 顧客価値への当事者意識が薄れがち / 統合のオーバーヘッドが大きい</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>一般的にはフィーチャーチームがフロー効率とスケーラビリティの観点で推奨されますが、真に複雑で専門性の高いサブシステム(例: 決済基盤、暗号化ライブラリ)は Team Topologies の「Complicated Subsystem Team(複雑なサブシステムチーム)」として独立させ、他のフィーチャーチームの認知負荷を下げるという併用パターンも実践的です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://teamtopologies.com/key-concepts" target="_blank" rel="noopener">Team Topologies — Key Concepts</a></li>
    <li><a href="https://www.scrum.org/resources/nexus-framework-scaling-scrum" target="_blank" rel="noopener">The Nexus Framework for Scaling Scrum</a></li>
  </ul>
</div>
    </section>

    <!-- ===================== SECTION 11. カテゴリー5-C — Service to the Organization: Organizational Change (LO 5.7–5.8) ===================== -->
    <section id="organizational-change">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:arrows-right-left" aria-hidden="true" />SECTION 11</div>
      <h2>カテゴリー5-C — Service to the Organization: Organizational Change (LO 5.7–5.8)</h2>

<h3>LO 5.7: 複雑系の性質を説明する</h3>
<p><strong>初学者向け解説:</strong> 組織変革を成功させるには、まず「自分たちが扱っている問題がどんな種類の問題か」を見極める必要があります。<strong>Cynefin フレームワーク</strong>(Dave Snowden、1999年)は、問題を4つの領域(+ 無秩序)に分類する思考ツールです。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CYNEFIN_DOMAINS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Cynefin フレームワークの4領域</div>
</div>
<div class="table-wrap">
<table>
<thead><tr><th>領域</th><th>組織における例</th></tr></thead>
<tbody>
<tr><td>明白 (Clear)</td><td>定型的な経費精算プロセス</td></tr>
<tr><td>煩雑 (Complicated)</td><td>大規模システムの移行計画(専門家の分析が有効)</td></tr>
<tr><td>複雑 (Complex)</td><td>組織文化の変革、新規プロダクトの市場適応(正解が事前にわからない)</td></tr>
<tr><td>カオス的 (Chaotic)</td><td>重大インシデント発生直後の初動対応</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>組織変革の多くは「複雑 (Complex)」領域に属します。この領域では、詳細な計画を立てて一気に実行するのではなく、小さな「安全に失敗できる実験 (Safe-to-Fail Probe)」を行い、結果を観察しながら次の一手を決める <strong>Probe → Sense → Respond</strong> のサイクルが有効です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://thecynefin.co/about-us/about-cynefin-framework/" target="_blank" rel="noopener">The Cynefin Company — About the Cynefin Framework</a> / Snowden, D. & Boone, M. "A Leader's Framework for Decision Making," <em>Harvard Business Review</em>, Nov 2007.</p>
</div>
<h3>LO 5.8: 組織変革を促進するアプローチを最低2つ説明する</h3>
<p><strong>初学者向け解説:</strong> 組織変革のアプローチとして、体系立ったモデルを1つ知っておくと、複雑な変革プロセスを構造的に説明・推進できます。ここでは John Kotter の <strong>8段階の変革モデル</strong> を紹介します。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_KOTTER8_STEPS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Kotter の8段階の変革モデル</div>
</div>
<p><strong>もう1つのアプローチ: ボトムアップの実験的アプローチ(Cynefin の Probe-Sense-Respond に基づく)</strong></p>
<div class="table-wrap">
<table>
<thead><tr><th>Kotter型(トップダウン計画的)</th><th>ボトムアップ実験型</th></tr></thead>
<tbody>
<tr><td>経営層主導で全社的な変革プログラムを設計する</td><td>現場チームでの小さな実験(1チームでの Scrum 導入など)から始め、成功例を横展開する</td></tr>
<tr><td>明確なビジョンと段階的な計画に基づいて進める</td><td>「Safe-to-Fail Probe」を繰り返し、うまくいったパターンを増幅(amplify)し、うまくいかないパターンを減衰(dampen)させる</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>A-CSM の Scrum Master は、組織変革を「一度きりのプロジェクト」ではなく「継続的なプロセス」として捉えるべきです。Kotter の8段階モデルもステップ7・8が示す通り、変革の定着には長い時間がかかることを組織に事前に伝えておくことが重要です。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://www.kotterinc.com/methodology/8-steps/" target="_blank" rel="noopener">Kotter Inc. — The 8-Step Process for Leading Change</a></li>
    <li><a href="https://thecynefin.co/about-us/about-cynefin-framework/" target="_blank" rel="noopener">The Cynefin Company</a></li>
  </ul>
</div>
    </section>

    <!-- ===================== SECTION 12. カテゴリー6-A — Scrum Mastery: Personal Development (LO 6.1–6.3) ===================== -->
    <section id="personal-development">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:seedling" aria-hidden="true" />SECTION 12</div>
      <h2>カテゴリー6-A — Scrum Mastery: Personal Development (LO 6.1–6.3)</h2>

<h3>LO 6.1: 自身の Scrum 価値基準の実践度を分析し、改善方法を検討する</h3>
<p><strong>初学者向け解説:</strong> Scrum の5つの価値基準(確約 Commitment・勇気 Courage・集中 Focus・公開 Openness・尊敬 Respect)は、Scrum Team のメンバーだけでなく、Scrum Master 自身の内省の対象でもあります。</p>
<div class="table-wrap">
<table>
<thead><tr><th>価値基準</th><th>自己内省の問い</th></tr></thead>
<tbody>
<tr><td>確約 (Commitment)</td><td>自分は Sprint Goal の達成にどれだけ当事者意識を持って関わっているか？</td></tr>
<tr><td>勇気 (Courage)</td><td>難しいフィードバックを、恐れずに伝えられているか？</td></tr>
<tr><td>集中 (Focus)</td><td>複数のチームやタスクに気を取られ、目の前のチームへの集中を欠いていないか？</td></tr>
<tr><td>公開 (Openness)</td><td>自分自身の失敗や弱みをチームに開示できているか？</td></tr>
<tr><td>尊敬 (Respect)</td><td>意見の異なるメンバーの視点を、本当に尊重できているか？</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>定期的に(例えば四半期ごとに)この5つの価値基準について自己採点し、信頼できる同僚やコーチにフィードバックを求める「360度的な自己評価」を行うと、盲点に気づきやすくなります。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">Scrum Alliance — Scrum Values</a></p>
</div>
<h3>LO 6.2: 建設的な相互作用が破壊的な対立に転じる瞬間を認識する</h3>
<p><strong>初学者向け解説:</strong> 対立(Conflict)そのものは悪いものではなく、むしろ健全なチームには必要な要素です(Tuckman の Storming 期を思い出してください)。問題は、それが「建設的」な段階から「破壊的」な段階へと転じる瞬間を見逃すことです。</p>
<div class="table-wrap">
<table>
<thead><tr><th>建設的な対立の兆候</th><th>破壊的な対立に転じた兆候</th></tr></thead>
<tbody>
<tr><td>意見(アイデア・アプローチ)についての対立</td><td>人格や個人攻撃に対する対立にすり替わる</td></tr>
<tr><td>「もっと良い方法があるはず」という探求的な姿勢</td><td>「あなたが間違っている」という断定的な姿勢</td></tr>
<tr><td>対立後も関係性が保たれている</td><td>対立が禍根を残し、その後のコミュニケーションを阻害する</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>対立が「人 vs 人」の構図になっていると感じたら、すぐに「課題 vs 私たち」の構図に引き戻すファシリテーションが有効です(例:「一度、意見ではなくホワイトボードに書かれた選択肢そのものに焦点を当てましょう」)。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://infed.org/dir/welcome/bruce-w-tuckman-forming-storming-norming-and-performing-in-groups/" target="_blank" rel="noopener">Tuckman's stages of group development</a></p>
</div>
<h3>LO 6.3: 自分のデフォルトの対立対応パターンを他の選択肢と比較する</h3>
<p><strong>初学者向け解説:</strong> <strong>Thomas-Kilmann Conflict Mode Instrument (TKI)</strong> は、対立への対応スタイルを「自己主張の強さ (Assertiveness)」と「協調性 (Cooperativeness)」という2軸で5つのモードに分類するフレームワークです。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TKI_CONFLICT_MODES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">Thomas-Kilmann Conflict Mode Instrument の5つの対立対応モード</div>
</div>
<div class="table-wrap">
<table>
<thead><tr><th>モード</th><th>適した状況</th></tr></thead>
<tbody>
<tr><td>競合 (Competing)</td><td>迅速な決断が必要な緊急事態、譲れない原則に関わる場合</td></tr>
<tr><td>協働 (Collaborating)</td><td>双方の利害を最大限満たす解決策を模索できる時間がある場合</td></tr>
<tr><td>妥協 (Compromising)</td><td>双方が同等の力を持ち、時間的制約がある場合</td></tr>
<tr><td>回避 (Avoiding)</td><td>問題が些細である、あるいは感情が高ぶりすぎている場合に一旦距離を置く</td></tr>
<tr><td>受容 (Accommodating)</td><td>関係性の維持が結果よりも重要な場合、自分が間違っていると分かった場合</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>多くの人には「デフォルトのモード」(例えば常に回避する、あるいは常に競合する)がありますが、TKI の価値は「どのモードが優れているか」ではなく「状況に応じてモードを切り替えられるか」にあります。自分のデフォルトパターンを自覚した上で、意図的に別のモードを試す練習をしましょう。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://kilmanndiagnostics.com/brief-overview-of-the-tki-assessment/" target="_blank" rel="noopener">Kilmann Diagnostics — Overview of the TKI Assessment</a></p>
</div>
    </section>

    <!-- ===================== SECTION 13. カテゴリー6-B — Scrum Mastery: Scrum Master as a True Leader (LO 6.4–6.5) ===================== -->
    <section id="scrum-master-as-leader">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:crown" aria-hidden="true" />SECTION 13</div>
      <h2>カテゴリー6-B — Scrum Mastery: Scrum Master as a True Leader (LO 6.4–6.5)</h2>

<h3>LO 6.4: 効果的なリーダーの属性を最低3つ述べる</h3>
<p><strong>初学者向け解説:</strong> A-CSM における「リーダーシップ」は、指示命令型のマネジメントとは異なる <strong>サーバントリーダーシップ (Servant Leadership)</strong> の概念に強く根ざしています。Robert K. Greenleaf が1970年のエッセイ「The Servant as Leader」で提唱したこの概念では、リーダーはまず「奉仕したい」という自然な欲求から始まり、その結果として導く立場に至るとされます。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SERVANT_LEADERSHIP_ATTRIBUTES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">サーバントリーダーとしての Scrum Master の5つの属性</div>
</div>
<div class="table-wrap">
<table>
<thead><tr><th>属性</th><th>説明</th></tr></thead>
<tbody>
<tr><td>奉仕への意志 (Servant First)</td><td>権力や地位を求めるのではなく、まず他者に奉仕したいという動機から始まる</td></tr>
<tr><td>他者の成長へのコミットメント</td><td>チームメンバー個人の成長・自律を優先する</td></tr>
<tr><td>先見性 (Foresight)</td><td>現在の決定が将来にどう影響するかを見通す力</td></tr>
<tr><td>説得力(権威ではなく)</td><td>地位による強制ではなく、対話と説得によって人を動かす</td></tr>
<tr><td>コミュニティ意識の醸成</td><td>個人の集合ではなく、真のコミュニティとしてのチームを育てる</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <p><a href="https://greenleaf.org/what-is-servant-leadership/" target="_blank" rel="noopener">Greenleaf Center for Servant Leadership — What is Servant Leadership?</a></p>
</div>
<h3>LO 6.5: リーダーの属性を最低1つ以上実演する</h3>
<p><strong>初学者向け解説:</strong> LO 6.4 で挙げた属性は「知っている」だけでは不十分で、A-CSM コースでは実際に「実演 (demonstrate)」することが求められます。実演の具体例:</p>
<div class="table-wrap">
<table>
<thead><tr><th>属性</th><th>実演の例</th></tr></thead>
<tbody>
<tr><td>奉仕への意志</td><td>チームの障害物リストを自らの最優先タスクとして扱い、進捗を可視化して共有する</td></tr>
<tr><td>他者の成長へのコミットメント</td><td>メンバーが「本来自分がやった方が早い」タスクでも、あえて権限委譲し、成長の機会として提供する</td></tr>
<tr><td>先見性</td><td>現在の技術的負債が半年後にどう開発速度へ影響するかをデータや具体例で経営層に説明する</td></tr>
</tbody></table></div>
<div class="callout practice" data-testid="callout" data-variant="practice">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
  <p>サーバントリーダーシップは「優しいだけのリーダーシップ」ではありません。時にはチームや組織にとって耳の痛いフィードバックを、勇気(Scrum の価値基準)を持って伝えることも、真のリーダーシップの実演に含まれます。</p>
</div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://greenleaf.org/what-is-servant-leadership/" target="_blank" rel="noopener">Greenleaf Center for Servant Leadership</a></li>
    <li><a href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">Scrum Alliance — Scrum Values</a></li>
  </ul>
</div>
    </section>

    <!-- ===================== SECTION 14. ベストプラクティス総合チェックリスト ===================== -->
    <section id="best-practices-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 14</div>
      <h2>ベストプラクティス総合チェックリスト</h2>

<p>全42のラーニングオブジェクティブを横断して実践する際の総合チェックリストです。日々の業務や1on1、レトロスペクティブの準備時に参照してください。</p>
<h3>ファシリテーション</h3>
<ul>
  <li>会議のたびに「今は発散フェーズか、収束フェーズか」を意識し、参加者にも明示している</li>
  <li>オープンディスカッションが停滞したら、1-2-4-All などの代替手法に切り替えられる</li>
  <li>自分が当事者になる議論では、他者にファシリテーターを依頼している</li>
  <li>Working Agreement をチーム自身に作らせ、定期的に見直している</li>
</ul>
<h3>コーチングとトレーニング</h3>
<ul>
  <li>「教える (Teaching)」「経験を伝える (Mentoring)」「問いで導く (Coaching)」を意識的に使い分けている</li>
  <li>介入後に振り返りを行い、次回への改善点を最低2つ言語化している</li>
  <li>ビジネスステークホルダーに対して、Scrum の専門用語をビジネス価値に翻訳して説明できる</li>
</ul>
<h3>チームへの奉仕</h3>
<ul>
  <li>チームの自己管理レベルに応じて、意思決定の権限移譲を段階的に進めている(デリゲーションポーカー等)</li>
  <li>チームが Tuckman モデルのどの段階にいるかを把握し、適切な関わり方を選んでいる</li>
  <li>Definition of Done を「一度作って終わり」にせず、継続的に強化している</li>
</ul>
<h3>プロダクトオーナーへの奉仕</h3>
<ul>
  <li>Product Vision → Product Goal → Product Backlog の一貫性をチェックしている</li>
  <li>リファインメントを Sprint 全体を通じた継続的な活動として支援している</li>
</ul>
<h3>組織への奉仕</h3>
<ul>
  <li>組織的障害に対しては「なぜなぜ分析」等で根本原因を特定してから対処している</li>
  <li>スケーリングフレームワーク導入前に「本当にスケールが必要か」を問うている</li>
  <li>依存関係を可視化し、フィーチャーチーム化などで構造的に削減する努力をしている</li>
  <li>組織変革を「複雑系」の問題として捉え、Safe-to-Fail Probe のような実験的アプローチを取り入れている</li>
</ul>
<h3>自己研鑽とリーダーシップ</h3>
<ul>
  <li>定期的に Scrum の5つの価値基準について自己内省している</li>
  <li>自分の対立対応のデフォルトパターンを自覚し、意図的に他のモードも試している</li>
  <li>サーバントリーダーシップの属性を、日々の具体的な行動として実演している</li>
</ul>
    </section>

    <!-- ===================== SECTION 15. よくある誤解とアンチパターン ===================== -->
    <section id="misconceptions-antipatterns">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-circle" aria-hidden="true" />SECTION 15</div>
      <h2>よくある誤解とアンチパターン</h2>

<div class="table-wrap">
<table>
<thead><tr><th>誤解・アンチパターン</th><th>実際には</th></tr></thead>
<tbody>
<tr><td>A-CSM は CSM の「上位互換のルール暗記コース」である</td><td>A-CSM はルールの暗記ではなく、ファシリテーション・コーチング・スケーリングという「実践スキル」を問う。座学よりワークショップ中心である</td></tr>
<tr><td>Scrum Master は常にすべての会議をファシリテートすべきだ</td><td>LO 2.5 の通り、Scrum Master が当事者になる場面や、チームが自律的にファシリテートできる場面では、あえて役割を降りることが望ましい</td></tr>
<tr><td>チームの対立は Scrum Master が早期に鎮めるべきだ</td><td>LO 6.2 の通り、建設的な対立(Storming期)は成長に必要なプロセスであり、鎮圧ではなく安全な表出の支援が求められる</td></tr>
<tr><td>スケーリングフレームワーク(SAFe/LeSS/Nexus)はどれも同じで、好みで選べばよい</td><td>LO 5.3–5.6 の通り、各フレームワークは前提とする組織規模・成熟度・思想が大きく異なり、安易な導入は形骸化を招く</td></tr>
<tr><td>コーチングとは「良いアドバイスをすること」だ</td><td>LO 2.9 の通り、コーチングの本質は「答えを与えないこと」であり、アドバイスはむしろメンタリング・コンサルティングの領域である</td></tr>
<tr><td>Definition of Done は一度決めたら変えるべきではない</td><td>LO 3.5 の通り、DoD はチームの成熟に応じて継続的に「強化」されるべき生きた基準である</td></tr>
<tr><td>組織変革は詳細な計画を立てて一気に実行すべきだ</td><td>LO 5.7–5.8 の通り、組織変革の多くは Cynefin の「複雑」領域に属し、Safe-to-Fail Probe による実験的アプローチの方が適していることが多い</td></tr>
<tr><td>フィーチャーチームは常にコンポーネントチームより優れている</td><td>LO 5.6 の通り、どちらにも利点・欠点があり、真に複雑な専門的サブシステムはコンポーネント的なチーム編成(Complicated Subsystem Team)が有効な場合もある</td></tr>
</tbody></table></div>
    </section>

    <!-- ===================== SECTION 16. 認定取得後のキャリアパス ===================== -->
    <section id="career-path">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 16</div>
      <h2>認定取得後のキャリアパス</h2>

<h3>16.1 CSP-SM への道</h3>
<p>A-CSM 取得後の次のステップとして、Scrum Alliance の FAQ では <strong>CSP-SM (Certified Scrum Professional® - ScrumMaster)</strong> が Scrum Master トラックにおける最高位の資格として位置づけられています。A-CSM は「CSP への個別パス (Individual Path to CSP)」の一部としても機能しており、教育実施団体はこのパス向けの補助トピックを A-CSM コースに含めることができます。</p>
<div class="diagram-card">
  <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CAREER_PATH_TO_CSP_SM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
  <div class="diagram-caption">A-CSM 取得後のキャリアパス(CSP-SM へ)</div>
</div>
<h3>16.2 資格の維持: Scrum Education Units (SEU)</h3>
<p>A-CSM は取得して終わりではなく、2年ごとに <strong>Scrum Education Units (SEU)</strong> を取得して更新する必要があります。SEU は以下のような活動を通じて取得できます。</p>
<div class="table-wrap">
<table>
<thead><tr><th>活動</th><th>内容</th></tr></thead>
<tbody>
<tr><td>カンファレンス参加</td><td>Global/Regional Scrum Gathering への参加</td></tr>
<tr><td>ウェビナー受講</td><td>Scrum Alliance が提供する無料/有料ウェビナー</td></tr>
<tr><td>記事・書籍の学習</td><td>公式リソースライブラリの記事や関連書籍の学習</td></tr>
<tr><td>コミュニティ活動</td><td>ユーザーグループでの登壇・運営</td></tr>
</tbody></table></div>
<div class="callout source" data-testid="callout" data-variant="source">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
  <ul>
    <li><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">Scrum Alliance — Scrum Education Units</a></li>
    <li><a href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">Scrum Alliance — Renewing Certifications</a></li>
  </ul>
</div>
    </section>

    <!-- ===================== SECTION 17. まとめ ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 17</div>
      <h2>まとめ</h2>

<p>A-CSM は、CSM で得た Scrum の基礎知識を土台に、以下の3つの軸で Scrum Master としての実践力を深める資格です。</p>
<p>1. <strong>ファシリテーションとコーチング</strong> — チーム・ステークホルダー・組織の間の対話を導く技術 2. <strong>チームとプロダクトオーナーへのサービス</strong> — 自己管理型チームの育成と、価値あるプロダクト開発の支援 3. <strong>組織とリーダーシップ</strong> — 組織的障害の解決、スケーリング、変革の推進、そして自分自身のリーダーとしての成長</p>
<p>これらはいずれも「知識として知っている」だけでなく、「実際にやってみて、振り返り、改善する」という経験主義(Empiricism)のサイクルを、Scrum Master 自身のスキル開発にも適用することが求められている点が、A-CSM の学習の本質だと言えます。</p>
    </section>

    <!-- ===================== SECTION 18. 参考文献・ソース一覧 ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 18</div>
      <h2>参考文献・ソース一覧</h2>

<p>本ガイドの作成にあたり参照した一次・二次情報源です。</p>
<ul class="ref-list">
  <li><span class="ref-name">Scrum Alliance. "Advanced Certified ScrumMaster (A-CSM) Learning Objectives" (January 2022, PDF).</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/adv_csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/adv_csm_learning_objectives_2022.pdf</a></li>
  <li><span class="ref-name">Scrum Alliance. "Advanced Certified ScrumMaster®" (認定ページ).</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster</a></li>
  <li><span class="ref-name">Scrum Alliance. "Certified ScrumMaster® (CSM®)" (認定ページ).</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster</a></li>
  <li><span class="ref-name">Scrum Alliance. "Scrum Master Track" (トラック概要).</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-master-track" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-master-track</a></li>
  <li><span class="ref-name">Scrum Alliance. "Scrum Values."</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
  <li><span class="ref-name">Scrum Alliance. "Scrum Education Units (SEU)."</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
  <li><span class="ref-name">Scrum Alliance. "Renewing Certifications."</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/renewing-certifications</a></li>
  <li><span class="ref-name">Schwaber, K. & Sutherland, J. "The Scrum Guide" (2020).</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
  <li><span class="ref-name">Beck, K. et al. "Manifesto for Agile Software Development" (2001).</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
  <li><span class="ref-name">Beck, K. et al. "Principles behind the Agile Manifesto."</span><a class="ref-url" href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/principles.html</a></li>
  <li><span class="ref-name">Design Council (UK). "The Double Diamond."</span><a class="ref-url" href="https://www.designcouncil.org.uk/our-resources/the-double-diamond/" target="_blank" rel="noopener">https://www.designcouncil.org.uk/our-resources/the-double-diamond/</a></li>
  <li><span class="ref-name">International Association of Facilitators (IAF). "The IAF Core Competencies."</span><a class="ref-url" href="https://iaf-world.org/the-iaf-core-competencies/" target="_blank" rel="noopener">https://iaf-world.org/the-iaf-core-competencies/</a></li>
  <li><span class="ref-name">Lipmanowicz, H. & McCandless, K. "Liberating Structures."</span><a class="ref-url" href="https://www.liberatingstructures.com/" target="_blank" rel="noopener">https://www.liberatingstructures.com/</a></li>
  <li><span class="ref-name">Liberating Structures. "Design Elements."</span><a class="ref-url" href="https://www.liberatingstructures.com/design-elements/" target="_blank" rel="noopener">https://www.liberatingstructures.com/design-elements/</a></li>
  <li><span class="ref-name">International Coaching Federation (ICF). "ICF Core Competencies."</span><a class="ref-url" href="https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/" target="_blank" rel="noopener">https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/</a></li>
  <li><span class="ref-name">Tuckman, B. (1965), as reviewed in: "Bruce W. Tuckman - forming, storming norming and performing in groups," infed.org.</span><a class="ref-url" href="https://infed.org/dir/welcome/bruce-w-tuckman-forming-storming-norming-and-performing-in-groups/" target="_blank" rel="noopener">https://infed.org/dir/welcome/bruce-w-tuckman-forming-storming-norming-and-performing-in-groups/</a></li>
  <li><span class="ref-name">Kilmann Diagnostics. "An Overview of the TKI Assessment Tool."</span><a class="ref-url" href="https://kilmanndiagnostics.com/brief-overview-of-the-tki-assessment/" target="_blank" rel="noopener">https://kilmanndiagnostics.com/brief-overview-of-the-tki-assessment/</a></li>
  <li><span class="ref-name">Scrum.org. "The Nexus™ Guide."</span><a class="ref-url" href="https://www.scrum.org/resources/nexus-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/nexus-guide</a></li>
  <li><span class="ref-name">Scrum.org. "The Nexus™ Framework for Scaling Scrum."</span><a class="ref-url" href="https://www.scrum.org/resources/nexus-framework-scaling-scrum" target="_blank" rel="noopener">https://www.scrum.org/resources/nexus-framework-scaling-scrum</a></li>
  <li><span class="ref-name">Larman, C. & Vodde, B. "Introduction to LeSS."</span><a class="ref-url" href="https://less.works/less/framework" target="_blank" rel="noopener">https://less.works/less/framework</a></li>
  <li><span class="ref-name">LeSS. "Principles Overview."</span><a class="ref-url" href="https://less.works/less/principles" target="_blank" rel="noopener">https://less.works/less/principles</a></li>
  <li><span class="ref-name">Scaled Agile, Inc. "Scaled Agile Framework (SAFe)."</span><a class="ref-url" href="https://scaledagileframework.com/" target="_blank" rel="noopener">https://scaledagileframework.com/</a></li>
  <li><span class="ref-name">Skelton, M. & Pais, M. "Team Topologies — Key Concepts."</span><a class="ref-url" href="https://teamtopologies.com/key-concepts" target="_blank" rel="noopener">https://teamtopologies.com/key-concepts</a></li>
  <li><span class="ref-name">Snowden, D. & Boone, M. "A Leader's Framework for Decision Making," Harvard Business Review, Nov 2007; framework overview at The Cynefin Company.</span><a class="ref-url" href="https://thecynefin.co/about-us/about-cynefin-framework/" target="_blank" rel="noopener">https://thecynefin.co/about-us/about-cynefin-framework/</a></li>
  <li><span class="ref-name">Kotter, J. / Kotter Inc. "The 8-Step Process for Leading Change."</span><a class="ref-url" href="https://www.kotterinc.com/methodology/8-steps/" target="_blank" rel="noopener">https://www.kotterinc.com/methodology/8-steps/</a></li>
  <li><span class="ref-name">Greenleaf, R. K. / Greenleaf Center for Servant Leadership. "What is Servant Leadership?"</span><a class="ref-url" href="https://greenleaf.org/what-is-servant-leadership/" target="_blank" rel="noopener">https://greenleaf.org/what-is-servant-leadership/</a></li>
</ul>
<div class="callout note" data-testid="callout" data-variant="note">
  <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
  <p>本ガイドは教育目的で作成された二次資料です。認定試験の公式基準は必ず <a href="https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance 公式サイト</a> および承認された A-CSM コースでご確認ください。</p>
</div>
    </section>

    <footer>
      Scrum Alliance®, Certified ScrumMaster®, CSM®, Advanced Certified ScrumMaster®, A-CSM®, Certified Scrum Professional®, CSP® は Scrum Alliance, Inc. の登録商標です。Professional Scrum Master™, PSM™ は Scrum.org の商標です。本ページは Scrum Alliance の公式資料ではなく、教育目的で作成された非公式の二次資料です。
    </footer>
    </main>
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

  

  

  

  a { color: var(--color-indigo); text-decoration: none; }
  a:hover { text-decoration: underline; }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--color-indigo); outline-offset: 2px; }

  img, 

  .layout { display: block; }

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

  .seal { flex: none; width: 36px; height: 36px; }

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

  .sidebar-nav { list-style: none; margin: 0; padding: 0; }

  .sidebar-nav .nav-group-label {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-ink-faint);
    letter-spacing: 0.06em;
    margin: 22px 0 8px;
    padding-left: 12px;
  }

  .sidebar-nav .nav-group-label:first-child { margin-top: var(--global-nav-height); }

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
    top: calc(var(--global-nav-height) + 16px); left: 16px;
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

  .main-content { margin-left: var(--sidebar-width); padding: 56px 72px 120px; }

  .hero { margin-bottom: 56px; }

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

  .hero .hero-lede { font-size: 18px; color: var(--color-ink-soft); margin: 0 0 28px; }

  .stat-row { display: grid; grid-template-columns: repeat(4, minmax(140px, 1fr)); gap: 16px; }

  .stat-card { border: 1px solid var(--color-border); background: var(--color-paper-raised); border-radius: 10px; padding: 18px 20px; }

  .stat-card .stat-number { font-family: var(--font-display); font-weight: 700; font-size: 28px; color: var(--color-indigo); line-height: 1.1; }

  .stat-card .stat-label { font-size: 16px; color: var(--color-ink-soft); margin-top: 6px; }

  .disclaimer-box {
    border: 1px solid var(--color-info-border);
    background: var(--color-info-bg);
    color: var(--color-info-text);
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 16px;
    margin-top: 28px;
  }

  section { margin: 72px 0; scroll-margin-top: calc(var(--global-nav-height) + 32px); }
  section:first-of-type { margin-top: var(--global-nav-height); }

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

  h3 { font-family: var(--font-display); font-weight: 600; font-size: 21px; color: var(--color-ink); margin: 40px 0 16px; }

  h4 { font-family: var(--font-sans); font-weight: 600; font-size: 17px; color: var(--color-ink); margin: 28px 0 12px; }

  p { margin: 0 0 18px; }

  ul, ol { margin: 0 0 18px; padding-left: 24px; }
  li { margin-bottom: 8px; }

  strong { font-weight: 600; color: var(--color-ink); }
  em { color: var(--color-ink-soft); }

  .domain-grid { display: grid; grid-template-columns: repeat(4, minmax(160px, 1fr)); gap: 16px; margin: 28px 0 8px; }

  .domain-card { border: 1px solid var(--color-border); background: var(--color-paper-raised); border-radius: 10px; padding: 20px; border-top: 3px solid var(--d-color); }
  .domain-card .domain-pct { font-family: var(--font-display); font-weight: 700; font-size: 30px; color: var(--d-color); }
  .domain-card .domain-name { font-size: 16px; color: var(--color-ink-soft); margin-top: 6px; }
  .domain-card.d1 { --d-color: var(--color-indigo); }
  .domain-card.d2 { --d-color: var(--color-forest); }
  .domain-card.d3 { --d-color: var(--color-gold); }
  .domain-card.d4 { --d-color: var(--color-plum); }

  .domain-tag { display: inline-block; font-size: 16px; font-weight: 600; padding: 3px 12px; border-radius: 999px; margin-bottom: 14px; }
  .domain-tag.d1 { background: var(--color-indigo-tint); color: var(--color-indigo); }
  .domain-tag.d2 { background: var(--color-forest-tint); color: var(--color-forest); }
  .domain-tag.d3 { background: var(--color-gold-tint); color: var(--color-gold); }
  .domain-tag.d4 { background: var(--color-plum-tint); color: var(--color-plum); }

  .table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: 10px; margin: 0 0 24px; max-width: 100%; }

  table { border-collapse: collapse; width: 100%; font-size: 16px; }

  thead th { background: var(--color-paper-sunken); text-align: left; font-weight: 600; color: var(--color-ink); padding: 12px 16px; border-bottom: 1px solid var(--color-border-strong); white-space: nowrap; }

  tbody td { padding: 12px 16px; border-bottom: 1px solid var(--color-border); color: var(--color-ink-soft); vertical-align: top; }

  tbody tr:last-child td { border-bottom: none; }
  tbody tr:nth-child(even) { background: var(--color-paper); }

  td strong, th strong { color: var(--color-ink); }

  .callout { border: 1px solid var(--color-border); border-left: 4px solid var(--color-indigo); background: var(--color-paper-raised); border-radius: 10px; padding: 20px 24px; margin: 28px 0; }
  .callout-title { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 16px; color: var(--color-indigo); margin-bottom: 10px; }
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

  .diagram-card { border: 1px solid var(--color-border); background: var(--color-paper-raised); border-radius: 12px; padding: 28px; margin: 28px 0; }
  .diagram-card .diagram-caption { font-size: 16px; color: var(--color-ink-faint); margin-top: 14px; text-align: center; }
  .diagram-container { display: flex; justify-content: center; width: 100%; min-height: 60px; }
  .diagram-loading { color: var(--color-ink-faint); font-size: 16px; padding: 20px 0; }
  .diagram-error { color: var(--color-plum); font-size: 16px; }

  .step-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
  .step-list li { display: flex; gap: 16px; margin-bottom: 0; }
  .step-num { flex: none; width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--color-indigo); color: var(--color-indigo); font-family: var(--font-display); font-weight: 700; font-size: 16px; display: flex; align-items: center; justify-content: center; }
  .step-body .step-title { font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
  .step-body .step-desc { color: var(--color-ink-soft); font-size: 16px; }

  .glossary-grid { display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 16px; }
  .glossary-item { border: 1px solid var(--color-border); background: var(--color-paper-raised); border-radius: 10px; padding: 16px 20px; }
  .glossary-item .g-term { font-weight: 600; color: var(--color-indigo); margin-bottom: 4px; }
  .glossary-item .g-def { color: var(--color-ink-soft); font-size: 16px; }

  .ref-group { margin-bottom: 28px; }
  .ref-group h4 { margin-top: var(--global-nav-height); }
  .ref-list { list-style: none; margin: 0; padding: 0; }
  .ref-list li { padding: 12px 0; border-bottom: 1px solid var(--color-border); font-size: 16px; }
  .ref-list li:last-child { border-bottom: none; }
  .ref-list .ref-name { color: var(--color-ink); font-weight: 500; display: block; margin-bottom: 2px; }
  .ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; }

  footer { margin-top: 96px; padding-top: 32px; border-top: 1px solid var(--color-border); color: var(--color-ink-faint); font-size: 16px; }

  code { font-family: var(--font-mono); background: var(--color-paper-sunken); padding: 2px 6px; border-radius: 4px; font-size: 16px; color: var(--color-ink); }

  @media (max-width: 980px) {
    .sidebar-toggle { display: flex; }
    .sidebar { transform: translateX(-100%); visibility: hidden; transition: transform 0.2s ease, visibility 0.2s ease; box-shadow: none; }
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
    
    .sidebar { transition: none; }
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
  font-size: 16px;
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

</style>
