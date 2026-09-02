<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-guide",
  "what-is-cspo",
  "blooms-taxonomy",
  "scrum-foundations",
  "po-core-competencies",
  "goal-setting-planning",
  "understanding-customers-users",
  "validating-product-assumptions",
  "working-with-product-backlog",
  "best-practices-checklist",
  "career-path-renewal",
  "misconceptions-antipatterns",
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
  title: "CSPO® 認定資格 完全ガイド | Certified Scrum Product Owner 学習目標&ベストプラクティス",
  description: "Scrum Alliance公式のCSPO Learning ObjectivesとScrum Foundations Learning Objectivesを完全網羅した、Certified Scrum Product Owner(CSPO)学習ガイド。5つの学習目標カテゴリ、ベストプラクティス、認定後のキャリアパスをMermaid図解付きで解説。",
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

const DIAGRAM_PO_TRACK_PATH = `flowchart LR
    A["Scrum Foundations 推奨される共通の基礎知識"] -.->|"受講前または受講中にカバーが期待される"| B["CSPO Certified Scrum Product Owner"]
    B --> C["A-CSPO Advanced Certified Scrum Product Owner"]
    C --> D["CSP-PO Certified Scrum Professional - Product Owner"]
    B -.->|"A-CSPOを取得・更新するとCSPOも自動更新"| C
    C -.->|"CSP-POを取得・更新するとCSPO・A-CSPOも自動更新"| D

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A box;
    class B hub;
    class C hub;
    class D done;`;

const DIAGRAM_BLOOMS_TAXONOMY = `flowchart TD
    K["Knowledge 知識 Define / Name / List"] --> CO["Comprehension 理解 Describe / Discuss / Recognize"]
    CO --> AP["Application 応用 Apply / Demonstrate / Illustrate"]
    AP --> AN["Analysis 分析 Compare / Contrast / Distinguish"]
    AN --> SY["Synthesis 統合 Create / Prepare / Organize"]
    SY --> EV["Evaluation 評価 Measure / Assess / Evaluate"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class K,CO box;
    class AP,AN hub;
    class SY,EV done;`;

const DIAGRAM_EMPIRICISM_PILLARS = `flowchart LR
    T["Transparency 透明性"] --> I["Inspection 検査"]
    I --> AD["Adaptation 適応"]
    AD -.->|"フィードバックを反映"| T

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class T,I,AD box;`;

const DIAGRAM_SCRUM_TEAM_ROLES = `flowchart TD
    PO["Product Owner 価値の最大化に責任"] --> PB["Product Backlog を管理"]
    SM["Scrum Master Scrumの実践を確立"] --> Team["Scrum Team全体を支援"]
    DEV["Developers Incrementの作成に責任"] --> INC["Sprintごとにusableな Incrementを作成"]
    PB --> DEV
    Team --> PO
    Team --> DEV

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PO,SM,DEV box;`;

const DIAGRAM_SPRINT_EVENTS_TIMELINE = `flowchart LR
    SP["Sprint Planning 最大8時間 / 1か月Sprint"] --> DS["Daily Scrum 15分 / 毎日"]
    DS --> DS
    DS --> SR["Sprint Review 最大4時間 / 1か月Sprint"]
    SR --> RETRO["Sprint Retrospective 最大3時間 / 1か月Sprint"]
    RETRO -.->|"次のSprintへ"| SP

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class SP,DS,SR,RETRO box;`;

const DIAGRAM_SCRUM_ARTIFACTS_COMMITMENTS = `flowchart TD
    PG["Product Goal Product Backlogのコミットメント"] --> PB["Product Backlog"]
    SG["Sprint Goal Sprint Backlogのコミットメント"] --> SB["Sprint Backlog"]
    DOD["Definition of Done Incrementのコミットメント"] --> INC["Increment"]
    PB -->|"Sprint Planningで選択"| SB
    SB -->|"Developersが作業"| INC
    INC -->|"検査結果を反映"| PB

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PG,SG,DOD hub;
    class PB,SB,INC box;`;

const DIAGRAM_PO_ORG_DESIGNS = `flowchart TB
    subgraph D1["設計1 - 単一チーム専属PO"]
        PO1["Product Owner"] --> Team1["1つのScrum Team"]
    end
    subgraph D2["設計2 - 複数チームを担当するPO"]
        PO2["Product Owner"] --> TeamA["Scrum Team A"]
        PO2 --> TeamB["Scrum Team B"]
        PO2 --> TeamC["Scrum Team C"]
    end
    subgraph D3["設計3 - 階層型 Chief PO配下"]
        CPO["Chief Product Owner / Product Manager"] --> APO1["Area PO 1"]
        CPO --> APO2["Area PO 2"]
        APO1 --> TeamX["Scrum Team X"]
        APO2 --> TeamY["Scrum Team Y"]
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PO1,PO2,CPO,APO1,APO2 box;`;

const DIAGRAM_VISION_GOAL_HIERARCHY = `flowchart TD
    V["Product Vision 長期的・野心的な「なぜ」 非公式・戦略レイヤー"] --> G1["Product Goal #1 測定可能な中期目標"]
    G1 --> G2["Product Goal #2 達成後に更新される次の目標"]
    G2 --> G3["Product Goal #3"]
    G1 -.->|"支える"| PB1["Product Backlog の内容・順序"]
    G2 -.->|"支える"| PB2["Product Backlog の内容・順序"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class V hub;
    class G1,G2,G3 box;`;

const DIAGRAM_SPIDR_STORY_MAPPING = `flowchart LR
    subgraph A1["アプローチ1 - ストーリー分割 SPIDR"]
        S["Spike"] --> P["Path"]
        P --> IF["Interface"]
        IF --> DA["Data"]
        DA --> R["Rules"]
    end
    subgraph A2["アプローチ2 - Story Mapping / Walking Skeleton"]
        Map["ユーザーの旅を 横軸に並べる"] --> Slice["各工程を薄く 垂直にスライス"]
        Slice --> Walk["エンドツーエンドで 動く最小構成"]
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class S,P,IF,DA,R,Map,Slice,Walk box;`;

const DIAGRAM_DUAL_TRACK_DISCOVERY = `flowchart LR
    subgraph Discovery["Discoveryトラック 継続的"]
        Idea["仮説・機会"] --> Interview["顧客インタビュー"]
        Interview --> Prototype["プロトタイプ検証"]
        Prototype --> Validated["検証済みの解決策"]
    end
    subgraph Delivery["Deliveryトラック Sprintベース"]
        Backlog["Product Backlog"] --> Build["Sprintで構築"]
        Build --> Increment["Increment"]
    end
    Validated -->|"裏付けのあるItemとして投入"| Backlog
    Increment -->|"利用データ・フィードバック"| Idea

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Idea,Interview,Prototype,Validated hub;
    class Backlog,Build,Increment box;`;

const DIAGRAM_HYPOTHESIS_VALIDATION_LOOP = `flowchart LR
    H["仮説を立てる Product Goalの前提"] --> SP["短いSprintで 検証可能な増分を作る"]
    SP --> RV["Sprint Reviewで 検査 Inspection"]
    RV --> LN["学びをProduct Backlogに 適応 Adaptation"]
    LN -.->|"次の仮説へ"| H

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class H,SP,RV,LN box;`;

const DIAGRAM_OUTPUT_OUTCOME_IMPACT = `flowchart LR
    Output["Output アウトプット 作った機能・出荷したIncrement"] --> Outcome["Outcome アウトカム 顧客・事業の行動や 状態の変化"]
    Outcome --> Impact["Impact インパクト 長期的な事業・社会への効果"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Output box;
    class Outcome hub;
    class Impact done;`;

const DIAGRAM_BACKLOG_REFINEMENT_CYCLE = `flowchart LR
    Raw["粗いアイデア・要望"] --> Split["大きなItemを分割"]
    Split --> Detail["受け入れ基準・詳細を追加"]
    Detail --> Estimate["相対見積り"]
    Estimate --> Order["価値・リスクに基づき 順序を見直す"]
    Order -.->|"継続的に繰り返す"| Raw

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Raw,Split,Detail,Estimate,Order box;`;

const DIAGRAM_CERT_RENEWAL_PATH = `flowchart TD
    CSPO["CSPO取得 2年ごとにSEU提出と 更新料の支払いで更新"] --> Path1["A-CSPOに進む"]
    CSPO --> Path2["CSPOのまま更新し続ける"]
    Path1 --> ACSPO["A-CSPO取得 CSPOも自動更新"]
    ACSPO --> Path3["CSP-PO® に進む"]
    Path3 --> CSPPO["CSP-PO取得 CSPO・A-CSPOも自動更新"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class CSPO,ACSPO box;
    class Path1,Path2,Path3 hub;
    class CSPPO done;`;

const DIAGRAM_CATEGORY_SUMMARY = `flowchart TD
    F["Scrum Foundations 理論・チーム・イベント・作成物"] --> C1["Category 1 PO Core Competencies"]
    F --> C2["Category 2 Goal Setting and Planning"]
    F --> C3["Category 3 Understanding Customers and Users"]
    F --> C4["Category 4 Validating Product Assumptions"]
    F --> C5["Category 5 Working with the Product Backlog"]
    C1 --> Goal["価値を最大化する Product Owner"]
    C2 --> Goal
    C3 --> Goal
    C4 --> Goal
    C5 --> Goal

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class F box;
    class C1,C2,C3,C4,C5 hub;
    class Goal done;`;

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
      <Icon :name="sidebarOpen ? 'tabler:x' : 'tabler:menu-2'" aria-hidden="true" />
    </button>
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <aside id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
    <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">CSPO® 完全ガイド</div>
        <div class="brand-subtitle">Certified Scrum Product Owner</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">基礎知識</li>
      <li><a href="#about-guide" :class="{ active: activeId === 'about-guide' }" @click="closeSidebar"><Icon name="tabler:file-text" aria-hidden="true" />本ガイドについて</a></li>
      <li><a href="#what-is-cspo" :class="{ active: activeId === 'what-is-cspo' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />CSPOとは</a></li>
      <li><a href="#blooms-taxonomy" :class="{ active: activeId === 'blooms-taxonomy' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />Bloom's Taxonomy</a></li>
      <li><a href="#scrum-foundations" :class="{ active: activeId === 'scrum-foundations' }" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />Scrum Foundations復習</a></li>
      <li class="nav-group-label">学習目標カテゴリ</li>
      <li><a href="#po-core-competencies" :class="{ active: activeId === 'po-core-competencies' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />PO中核能力</a></li>
      <li><a href="#goal-setting-planning" :class="{ active: activeId === 'goal-setting-planning' }" @click="closeSidebar"><Icon name="tabler:timeline" aria-hidden="true" />ゴール設定と計画</a></li>
      <li><a href="#understanding-customers-users" :class="{ active: activeId === 'understanding-customers-users' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />顧客とユーザーの理解</a></li>
      <li><a href="#validating-product-assumptions" :class="{ active: activeId === 'validating-product-assumptions' }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />プロダクト仮説の検証</a></li>
      <li><a href="#working-with-product-backlog" :class="{ active: activeId === 'working-with-product-backlog' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" aria-hidden="true" />プロダクトバックログ運用</a></li>
      <li class="nav-group-label">実践とキャリア</li>
      <li><a href="#best-practices-checklist" :class="{ active: activeId === 'best-practices-checklist' }" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />ベストプラクティス集</a></li>
      <li><a href="#career-path-renewal" :class="{ active: activeId === 'career-path-renewal' }" @click="closeSidebar"><Icon name="tabler:refresh" aria-hidden="true" />キャリアパスと更新</a></li>
      <li><a href="#misconceptions-antipatterns" :class="{ active: activeId === 'misconceptions-antipatterns' }" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />誤解とアンチパターン</a></li>
      <li class="nav-group-label">資料</li>
      <li><a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />まとめ</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献</a></li>
    </ul>
  </aside>

    <main id="main-content" class="main-content">
      <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance公式Learning Objectives準拠</div>
      <h1>Certified Scrum Product Owner®(CSPO®) 完全学習ガイド</h1>
      <p class="hero-lede">
        初学者から実務者まで対応。出題範囲となる公式Learning Objectivesを100%カバーし、各項目の詳細解説・ベストプラクティス・根拠ソースURLを付記した保存版ドキュメントです。対象読者：これからCSPOを受講する方、Product Owner役割に就いたばかりの方、Scrum Master/開発者としてPOと協働する方。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">公式CSPO学習目標カテゴリ数</div></div>
        <div class="stat-card"><div class="stat-number">28</div><div class="stat-label">CSPO Learning Objectivesの総数</div></div>
        <div class="stat-card"><div class="stat-number">52</div><div class="stat-label">Scrum Foundations込みの学習目標合計</div></div>
        <div class="stat-card"><div class="stat-number">2年</div><div class="stat-label">Scrum Alliance認定の更新サイクル</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは学習支援を目的とした非公式の解説資料です。実際の受験・受講にあたっては、必ず<a href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>および担当トレーナーが提供する最新情報をご確認ください。</span>
      </div>
    </div>

    <!-- ===================== 01. about-guide ===================== -->
    <section id="about-guide">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:file-text" aria-hidden="true" />SECTION 01</div>
      <h2>本ガイドの前提と情報源</h2>

      <p>本ガイドは、Scrum Allianceが公開する以下の一次情報を基に構成しています(詳細は末尾「参考文献・ソース一覧」参照)。</p>

      <ul>
        <li>Scrum Alliance公式CSPO紹介ページ</li>
        <li><strong>CSPO Learning Objectives(2022年1月改訂、2024年2月フォーマット更新版)</strong> — CSPOオファリングで必ずカバーされるべき学習目標を定義する公式文書</li>
        <li><strong>Scrum Foundations® Learning Objectives(2022年1月改訂)</strong> — CSM/CSPO/CSD共通で前提となる基礎学習目標</li>
        <li>The Scrum Guide(Ken Schwaber &amp; Jeff Sutherland, 2020年11月版)</li>
        <li>Manifesto for Agile Software Development(4つの価値・12の原則)</li>
        <li>Scrum Allianceが定めるScrum価値観ページ</li>
      </ul>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>表記方針:</strong> 本ガイドは日本語を主体としつつ、Product Owner、Product Backlog、Sprint Goal、Product Goalなど公式Scrum用語は英語表記を維持します(誤訳・意味のズレを防ぐため)。</p>
      </div>
    </section>

    <!-- ===================== 02. what-is-cspo ===================== -->
    <section id="what-is-cspo">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 02</div>
      <h2>CSPOとは何か － Product Owner Trackにおける位置づけ</h2>

      <h3>1.1 CSPOの概要</h3>

      <p>Certified Scrum Product Owner®(CSPO®)は、Scrum Allianceが提供するProduct Owner Trackの入門資格です。認定コースは、Certified Scrum Trainer®(CST®)または認定を受けたトレーナーによる対面/ライブオンライン形式で実施されます。</p>

      <p>認定はコース修了だけで自動的に付与されるわけではありません。<strong>コースを修了した後、ライセンス契約(License Agreement)に同意し、Scrum Allianceの会員プロフィールを完成させる</strong>ことで、はじめてCSPO認定と2年間のScrum Alliance会員資格が付与されます。この最後の手続きを行わないと認定は有効になりません。</p>

      <p>Scrum Alliance公式サイトでは、CSPOコースの狙いを次のように説明しています。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>「CSPOコースは、顧客価値と投資対効果(ROI)へのあくなき集中をもって、アジャイルなプロダクトデリバリーに備えるためのコースである」(Scrum Alliance公式ページの要旨)</p>
      </div>

      <p>つまりCSPOは、単なる「バックログを書く人」の資格ではなく、<strong>マーケットを理解し、顧客が何を必要としているかを先読みし、組織を成功に導く</strong>ためのプロダクトオーナーシップ全般を扱う資格です。</p>

      <h3>1.2 Product Ownerというロールの基本像</h3>

      <p>Scrum Guideにおいて、Product Ownerはスクラムチーム(Product Owner・Scrum Master・Developersの3者で構成される単一のチーム)の一員であり、次の点にアカウンタビリティ(結果責任)を持ちます。</p>

      <ul>
        <li>スクラムチームの作業から生まれる<strong>プロダクトの価値の最大化</strong></li>
        <li>Product Backlogの管理(Product Goalの策定・伝達、Product Backlog Itemの作成・伝達、優先順位付け=ordering、透明性・可視性・理解可能性の確保)</li>
      </ul>

      <p>公式ページでは、Product Ownerの職務を以下のように整理しています。</p>

      <ul>
        <li>プロダクトビジョンを定義する</li>
        <li>Product Backlogを管理する</li>
        <li>ステークホルダーと開発者の橋渡しをする</li>
        <li>トレードオフに関する意思決定を行う</li>
        <li>順序と範囲(スコープ)に関する意思決定を行う</li>
        <li>プロダクトの価値を最大化する</li>
        <li>常に顧客を中心に置き続ける</li>
      </ul>

      <p>これらを支えるのは、強いリーダーシップ、卓越したコミュニケーション能力、共感力、そして変化し続ける市場・顧客ニーズに適応する柔軟性です。</p>

      <h3>1.3 Product Owner TrackにおけるCSPOの位置づけ</h3>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_PO_TRACK_PATH"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Product Owner Trackの認定パス(Foundations→CSPO→A-CSPO→CSP-PO)</div>
      </div>

      <p>CSPOはProduct Owner Trackの起点です。CSPOを取得すると、その上位資格であるA-CSPO(Advanced Certified Scrum Product Owner)、さらにCSP®-PO(Certified Scrum Professional® - Product Owner)へと進む道が開かれます。上位資格を更新すると、CSPO自体も自動的に更新される仕組みになっている点も実務上重要です(詳細は第10章)。</p>

      <h3>1.4 CSMとCSPO、どちらを選ぶべきか</h3>

      <p>Scrum Alliance公式FAQでは、CSM(Certified ScrumMaster)とCSPOの選び方について次のように案内しています。</p>

      <ul>
        <li><strong>CSM</strong>：スクラムマスターのスキルセット(チームにスクラムを実践させるコーチング、チーム・個人としての継続的改善)にフォーカス</li>
        <li><strong>CSPO</strong>：Product Backlogの管理方法、ロードマップの作成方法、次に作るべき機能をチームと共に判断する方法の学習にフォーカス</li>
      </ul>

      <p>どちらもアジャイルチームで価値がありますが、「チームをコーチングしたいか」「卓越したプロダクトを届けたいか」という志向性で選択します。</p>

      <h3>1.5 受講対象者</h3>

      <p>CSPOコースは以下のような職種の方に適しています。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>対象</th><th>想定される動機</th></tr></thead>
          <tbody>
            <tr><td>プロダクトマネージャー</td><td>アジャイルな運用にプロダクト戦略を接続したい</td></tr>
            <tr><td>ビジネスアナリスト</td><td>要件定義からバックログ管理へスキルを拡張したい</td></tr>
            <tr><td>プロジェクトマネージャー</td><td>アジャイルなスコープ・優先順位管理を学びたい</td></tr>
            <tr><td>データアナリスト</td><td>定量的な意思決定をプロダクト開発に組み込みたい</td></tr>
            <tr><td>スクラムチームメンバー</td><td>POの視点を理解しコラボレーションを高めたい</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>CSPOは「肩書がプロダクトオーナーの人だけ」のものではなく、価値の優先順位付けに関わる全職種にとって有用な基礎教養と捉える。</li>
          <li>受講前にScrum Foundations学習目標(第3章)に目を通しておくと、コース内での理解度が大きく上がる。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 03. blooms-taxonomy ===================== -->
    <section id="blooms-taxonomy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 03</div>
      <h2>Bloom's Taxonomy － 学習目標の読み方</h2>

      <p>CSPO Learning Objectivesの各項目は、すべて「このコースを無事に修了した学習者は、～できるようになる」という文の後に続く<strong>動詞</strong>から始まります。この動詞は、Bloom's Taxonomy(ブルームの教育目標分類学)の6段階に対応しており、どのレベルの理解を求められているかを示します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_BLOOMS_TAXONOMY"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Bloom's Taxonomyの6段階と代表的な動詞</div>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>レベル</th><th>説明</th><th>代表的な動詞</th></tr></thead>
          <tbody>
            <tr><td>Knowledge(知識)</td><td>情報・プロセス・事実・概念の記憶</td><td>Define, Name, List</td></tr>
            <tr><td>Comprehension(理解)</td><td>情報を解釈し重要性を判断する</td><td>Describe, Discuss, Recognize</td></tr>
            <tr><td>Application(応用)</td><td>習得した知識・概念を実際の場面に適用する</td><td>Apply, Demonstrate, Illustrate</td></tr>
            <tr><td>Analysis(分析)</td><td>批判的思考で情報を分解・整理する</td><td>Compare, Contrast, Distinguish</td></tr>
            <tr><td>Synthesis(統合)</td><td>知識を用いて新しい成果物やプロセスを創出する</td><td>Create, Prepare, Organize</td></tr>
            <tr><td>Evaluation(評価)</td><td>判断力を用いて意思決定・問題解決を行う</td><td>Measure, Assess, Evaluate</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <p>例えば、CSPO学習目標「5.6 create a product backlog that supports the achievement of a product goal」は動詞が"create"のため、Synthesis(統合)レベル=単なる知識の暗記ではなく、実際に手を動かしてバックログを作れることが求められます。一方「5.3 define at least three terms related to product economics」は"define"なのでKnowledgeレベルであり、用語を正しく説明できれば十分です。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>学習目標を読むときは、まず動詞に注目し、「知識として知っていればよいのか」「実際に作れる・評価できる必要があるのか」を区別する。</li>
          <li>トレーナーによる練習(ワーク)は、Application以上の動詞(practice, create, illustrate等)を持つ学習目標に対応していることが多いため、コース中は積極的に手を動かす。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 04. scrum-foundations ===================== -->
    <section id="scrum-foundations">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 04</div>
      <h2>Scrum Foundations® 復習</h2>

      <p>Scrum Alliance公式のScrum Foundations Learning Objectivesは、CSM・CSPO・CSDの3つの基礎資格すべてに共通する前提知識です。CSPOオファリングでは、コース前またはコース中にこれらがカバーされていることが期待されます。ここではCSPO学習に必要な範囲で要点を整理します。</p>

      <h3>3.1 Scrum Theory(Scrum理論)</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>対応する公式学習目標:</strong> 1.1 define scrum / 1.2 list the five scrum values / 1.3 define empiricism / 1.4 list the three empirical scrum pillars / 1.5 list at least three benefits of an iterative and incremental approach / 1.6 describe at least two disadvantages that could occur if scrum is only partially implemented / 1.7 describe how scrum is aligned with the values and principles of the Manifesto for Agile Software Development</p>
      </div>

      <p>Scrum Guideの定義によれば、Scrumとは「複雑な問題に対応するための軽量級フレームワークであり、人々やチーム・組織が、複雑な問題に対する適応的な解決策を通じて価値を生み出せるようにするもの」です。Scrumはプロセスや技法の集合ではなく、<strong>フレームワーク</strong>である点が重要で、その中でさまざまなプロセスや技法を適用できます。</p>

      <p>Scrumは<strong>経験主義(Empiricism)</strong>とリーン思考に基づいています。経験主義とは「知識は経験から生まれ、意思決定は観察されたものに基づく」という考え方です。この経験主義を支えるのが3つの柱です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_EMPIRICISM_PILLARS"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">経験主義を支える3つの柱(透明性・検査・適応)</div>
      </div>

      <ul>
        <li><strong>Transparency(透明性)</strong>：プロセスと成果物が、それを検査する人たちに見える状態であること。共通言語・共通の「完成」の定義が前提。</li>
        <li><strong>Inspection(検査)</strong>：進捗を頻繁かつ注意深く検査し、望ましくない差異を検出すること。</li>
        <li><strong>Adaptation(適応)</strong>：検査の結果、プロセスや素材が許容範囲を逸脱していると判断されたら、できる限り早く調整すること。</li>
      </ul>

      <p>またScrumは5つの価値観(<strong>Scrum Values</strong>)に支えられています。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>価値観</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>Commitment(確約)</td><td>ゴール達成とチームの支援に向けて全力を尽くす</td></tr>
            <tr><td>Focus(集中)</td><td>Sprintの作業とスクラムチームのゴールに集中する</td></tr>
            <tr><td>Openness(公開)</td><td>作業や課題をオープンにする</td></tr>
            <tr><td>Respect(尊敬)</td><td>チームメンバーが互いを能力ある独立した人として尊重する</td></tr>
            <tr><td>Courage(勇気)</td><td>正しいことを行い困難な問題に取り組む勇気を持つ</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <p>反復的(iterative)かつ漸進的(incremental)なアプローチには、少なくとも次のような利点があります。</p>

      <ol>
        <li>早期かつ頻繁にフィードバックを得られ、方向修正のコストを下げられる</li>
        <li>リスク(技術的リスク・市場リスク)を小さい単位で検証できる</li>
        <li>価値のある成果物を早期に市場・顧客に届けられる</li>
      </ol>

      <p>一方、Scrumが部分的にしか実装されていない場合には、次のような弊害が生じます。</p>

      <ul>
        <li>透明性が欠如し、問題が検知されないまま埋もれる(例：Sprint Reviewを形式的に省略する)</li>
        <li>経験主義が機能せず、計画重視の思い込みに逆戻りし、変化への適応力を失う</li>
      </ul>

      <p>Scrumは、Manifesto for Agile Software Developmentの4つの価値・12の原則と整合しています。例えば「動くソフトウェアを最も重要な進捗の尺度とする」という原則は、Sprintごとに検査可能なIncrementを作るというScrumの仕組みと直接対応しています。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>PO自身がまず経験主義(透明性・検査・適応)の体現者になる。Product Backlogを常に最新かつ本音で保つことが透明性の第一歩。</li>
          <li>「なぜこの順序なのか」を問われたら、意見ではなく観察された事実(利用データ、顧客の声、実験結果)で語れるようにしておく。</li>
        </ul>
      </div>

      <h3>3.2 The Scrum Team(スクラムチーム)</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>対応する公式学習目標:</strong> 2.1 illustrate how the product owner, developers and scrum master interact to deliver increments within a sprint / 2.2 identify at least three benefits of a cross-functional, self-managing scrum team</p>
      </div>

      <p>Scrum Team(スクラムチーム)は、1人のScrum Master、1人のProduct Owner、そしてDevelopersで構成される単一のチームです。かつての「Development Team」という下位チームの概念はScrum Guide 2020で廃止され、Product Owner・Scrum Master・Developersの全員が1つのScrum Teamを構成します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_SCRUM_TEAM_ROLES"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Scrum Teamを構成する3つの役割の関係</div>
      </div>

      <p>Scrum Teamは以下の特性を持ちます。</p>

      <ul>
        <li><strong>Cross-functional(機能横断的)</strong>：チーム自身がSprintごとに価値あるIncrementを作るために必要なすべてのスキルを保有している</li>
        <li><strong>Self-managing(自己管理型)</strong>：誰が・どのように・何に取り組むかをチーム内部で決定する</li>
      </ul>

      <p>自己管理・機能横断的なチームの利点は少なくとも次の3つです。</p>

      <ol>
        <li>外部への依存が減り、Sprint内で完結して価値を届けられる</li>
        <li>チームが状況に応じて最適な作業分担を柔軟に決められる</li>
        <li>オーナーシップが高まり、品質・改善への当事者意識が強くなる</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>POはDevelopersの「どう作るか(How)」には介入せず、「何を・なぜ(What/Why)」の意思決定に集中する。</li>
          <li>Scrum Masterと連携し、チームが自己管理を発揮できる環境(心理的安全性・十分な情報)を整える。</li>
        </ul>
      </div>

      <h3>3.3 Scrum Events and Activities(スクラムイベントと活動)</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>対応する公式学習目標:</strong> 3.1 explain at least three benefits of using a timebox / 3.2 define the purpose and maximum duration of a sprint / 3.3 explain how to determine a suitable duration of a sprint / 3.4 define sprint planning, daily scrum, sprint review and sprint retrospective, including their purpose, participants, sequence, and maximum recommended timebox / 3.5 list at least three activities that may occur as part of product backlog refinement / 3.6 repeat at least two reasons why the scrum team dedicates time for product backlog refinement</p>
      </div>

      <p>Sprintは、他のすべてのスクラムイベントを包含する「コンテナ」であり、最大1か月です。Sprint中はSprint Goalを危険にさらす変更は行わず、学習が進むにつれてスコープはPOとの合意のもと明確化・再交渉されます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_SPRINT_EVENTS_TIMELINE"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Sprint内のイベントとタイムボックスの流れ</div>
      </div>

      <p>タイムボックス(時間枠)を用いる利点は少なくとも次の3つです。</p>

      <ol>
        <li>意思決定・議論に上限が設けられ、完璧主義による停滞を防ぐ</li>
        <li>すべてのイベントの長さが予測可能になり、計画が立てやすくなる</li>
        <li>頻度が保証されるため、検査と適応の機会が定期的に確保される</li>
      </ol>

      <p>各イベントの目的・参加者・タイムボックスは次の通りです。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>イベント</th><th>目的</th><th>参加者</th><th>最大タイムボックス(1か月Sprintの場合)</th></tr></thead>
          <tbody>
            <tr><td>Sprint Planning</td><td>Sprintで何を・なぜ・どのように行うかを計画する</td><td>Scrum Team全員</td><td>8時間</td></tr>
            <tr><td>Daily Scrum</td><td>Sprint Goalへの進捗を検査し、Sprint Backlogを適応させる</td><td>Developers(他は任意参加)</td><td>15分</td></tr>
            <tr><td>Sprint Review</td><td>Sprintの成果を検査し、今後の適応を判断する</td><td>Scrum Team +主要ステークホルダー</td><td>4時間</td></tr>
            <tr><td>Sprint Retrospective</td><td>個人・関係性・プロセス・ツールの観点でSprintを振り返る</td><td>Scrum Team全員</td><td>3時間</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <p>Sprintの適切な長さを決める際は、変化の速さ(市場・技術の不確実性が高いほど短く)、フィードバックを得るまでに許容できる期間、リリースサイクルとの整合性などを考慮します。短すぎるとオーバーヘッドが増え、長すぎるとリスクの検知が遅れます。</p>

      <p>Product Backlog Refinement(バックログリファインメント)は正式なScrumイベントではありませんが、継続的に行われる活動です。活動例：</p>

      <ul>
        <li>Product Backlog Itemの詳細化(受け入れ基準の追加など)</li>
        <li>大きすぎるItemの分割</li>
        <li>見積り(相対サイズ見積りなど)</li>
        <li>優先順位(ordering)の見直し</li>
      </ul>

      <p>チームがリファインメントに時間を割く理由は少なくとも2つあります。</p>

      <ol>
        <li>Sprint Planningを迅速かつ効果的に進めるため、事前に「準備が整った」Itemを用意する</li>
        <li>新しい学び(顧客フィードバック、技術的発見)を反映し、Product Backlogを常に最新かつ価値順に保つため</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>リファインメントは正式イベントではないため、チームごとに頻度・時間を決めてカレンダー化する(例：Sprint中盤に1〜2回、Sprint期間の10%目安)。</li>
          <li>直近1〜2 Sprint分のみを詳細にリファインメントし、遠い将来のItemは粗いままにしておく(Just-In-Time refinement)。</li>
        </ul>
      </div>

      <h3>3.4 Scrum Artifacts and Commitments(スクラム作成物とコミットメント)</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>対応する公式学習目標:</strong> 4.1 define the purpose of and at least three attributes of the product backlog, sprint backlog, and increment / 4.2 explain why the product backlog is an emergent list of what is needed to improve the product / 4.3 list at least three attributes of a product backlog item / 4.4 discuss how the sprint backlog can be changed without endangering the sprint goal / 4.5 explain how multiple increments may be created during a sprint / 4.6 describe how the product goal, sprint goal and definition of done represent the commitments for the three artifacts of scrum / 4.7 describe why the sprint goal does not change during a sprint / 4.8 explain how the definition of done evolves over time / 4.9 identify at least two reasons why multiple teams working on the same product backlog have a shared and consistent definition of done</p>
      </div>

      <p>Scrumには3つの作成物(Artifact)があり、それぞれに「コミットメント」と呼ばれる目印が対応します。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>Artifact</th><th>目的</th><th>コミットメント</th><th>主な属性</th></tr></thead>
          <tbody>
            <tr><td>Product Backlog</td><td>プロダクトを改善するために必要なものの、創発的(emergent)で順序付けられたリスト</td><td>Product Goal</td><td>単一のソース・オブ・トゥルース、常に変化しうる、透明・可視・理解可能</td></tr>
            <tr><td>Sprint Backlog</td><td>Sprintで達成すべきことの計画</td><td>Sprint Goal</td><td>Sprint Goal(なぜ)・選択したProduct Backlog Item(何を)・Incrementを届けるための実行可能な計画(どうやって)で構成される、Developersが所有、Sprint中にリアルタイムで更新される</td></tr>
            <tr><td>Increment</td><td>Product Goalへの具体的な足がかり</td><td>Definition of Done</td><td>追加的(additive)、検証済み、使用可能(usable)</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_SCRUM_ARTIFACTS_COMMITMENTS"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">3つの作成物とそれぞれのコミットメントの関係</div>
      </div>

      <p>Product Backlogが「創発的(emergent)」と言われるのは、プロダクト・環境・市場について学べば学ぶほど、その内容が変化し続けるためです。固定された要件一覧ではなく、常に「今わかっている最善の理解」を反映する生きたリストです。</p>

      <p>Product Backlog Itemの属性には少なくとも次のようなものがあります：説明(Description)、順序(Order)、見積り(Estimate)、価値(Value)。</p>

      <p>Sprint Backlogは、Sprint Goalを危険にさらさない範囲であれば、Sprint中でもDevelopersによって自由に更新できます(例：新たに判明した必要タスクの追加、不要になったタスクの削除、計画の見直し)。これは、Sprint Backlogのコミットメントが個々のタスクではなく<strong>Sprint Goal</strong>だからです。</p>

      <p>1つのSprint内でも、Product Backlog Itemが完成するたびに複数のIncrementが生まれることがあります。Sprint Review時点でこれらを合算したものが検査対象のIncrementとなります。</p>

      <p>Sprint Goalは、Sprint Planningで設定される「なぜこのSprintが価値あるのか」という単一の目的であり、Sprint中は変更されません。これは、Sprint Goalこそがチームの一貫性・焦点・柔軟性のよりどころであり、途中で目的そのものを変えてしまうとその意義が失われるためです(達成に向けたスコープの調整は許容されます)。</p>

      <p>Definition of Done(DoD)は、Incrementの品質基準を定義する公式な記述であり、組織標準がある場合はそれを最低ラインとして踏襲し、時間の経過とともに新たな品質要求(例：新しいテスト基準)を反映して<strong>進化</strong>します。複数のScrumチームが同じプロダクトのProduct Backlogを共有して作業する場合、DoDを共有・統一しておく理由は少なくとも2つあります。</p>

      <ol>
        <li>どのチームが作ったIncrementでも、統合後に同じ品質水準を満たしていることを保証するため</li>
        <li>「完成」の定義がチームごとにバラバラだと、統合されたIncrement全体の透明性・信頼性が損なわれるため</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>PO自身がSprint Goalの言語化に主体的に関わる。Sprint GoalはPBIのリストの寄せ集めではなく「なぜ」を一文で語れる形にする。</li>
          <li>複数チームで1つのProduct Backlogを扱う場合、DoDは最初にチーム横断で合意し、変更時は必ず関係チーム全員に共有する。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 05. po-core-competencies ===================== -->
    <section id="po-core-competencies">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 05</div>
      <h2>カテゴリ1 － Product Owner Core Competencies(プロダクトオーナーの中核能力)</h2>

      <p>ここからは、CSPO Learning Objectives本体の5カテゴリを順に解説します。第1カテゴリは、Product Ownerというロールそのものの基盤となる能力群です。</p>

      <h3>4.1(LO 1.1)組織設計とPOアカウンタビリティの関係</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> POのアカウンタビリティの果たし方に影響する、少なくとも3つの異なる組織設計について議論する。</p>
      </div>

      <p>Scrum GuideはPOの「何を(What)」に対するアカウンタビリティを定義しますが、「どのように組織内で実現するか」は組織ごとに大きく異なります。代表的な3つの組織設計パターンを比較します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_PO_ORG_DESIGNS"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">POアカウンタビリティに影響する3つの組織設計パターン</div>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>組織設計</th><th>特徴</th><th>POアカウンタビリティへの影響</th></tr></thead>
          <tbody>
            <tr><td>単一チーム専属PO</td><td>Scrum Guideが想定する基本形。1人のPOが1つのScrum Teamと密接に協働</td><td>意思決定が最速。ただし複数プロダクトラインを持つ組織ではスケールしにくい</td></tr>
            <tr><td>複数チームを担当するPO</td><td>1つのプロダクトを複数のScrum Teamで開発する場合に、単一のProduct Backlogを1人のPOが管理</td><td>ステークホルダー対応・詳細化の負荷が増大し、委任(delegation)が不可欠になる</td></tr>
            <tr><td>階層型(Chief PO / Product Manager配下にArea PO)</td><td>大規模組織で、戦略レベルのPOと現場レベルのPOを分離</td><td>現場のArea POの権限が限定され、Scrum Guideが求める「単一の意思決定者」が曖昧になりやすいリスクがある</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>階層型を採用する場合でも、各Scrum TeamにとってのProduct Backlogの最終決定者が「常に1人」であることを明確にする(曖昧な二重権限を避ける)。</li>
          <li>組織設計を変える前に、現行設計でPOのアカウンタビリティ(価値最大化)がどこで阻害されているかを可視化する。</li>
        </ul>
      </div>

      <h3>4.2(LO 1.2)ステークホルダーへの進捗の透明性確保</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> ゴールに向けた進捗についてステークホルダーに透明性を提供する技法を少なくとも1つ使う。</p>
      </div>

      <p>技法の例：</p>

      <ul>
        <li><strong>Sprint Reviewへの招待</strong>：完成したIncrementを実際に見せ、Product Goalへの進捗を議論する最も強力な透明性確保の場</li>
        <li><strong>プロダクトロードマップ(Now-Next-Later形式)</strong>：確定度に応じてテーマを整理し、「確約ではなく方向性」であることを明示して共有</li>
        <li><strong>バーンアップチャート</strong>：Product Goal達成に向けた進捗をスコープの変化とともに可視化</li>
        <li><strong>公開されたProduct Backlogの順序</strong>：誰でも「次に何が来るか」を確認できる状態にする</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>ロードマップは「日付のコミットメント」ではなく「確信度付きの方向性」として提示し、期待値のズレを防ぐ。</li>
          <li>Sprint Reviewを単なる報告会にせず、双方向のフィードバック収集の場として設計する。</li>
        </ul>
      </div>

      <h3>4.3(LO 1.3)ステークホルダーから情報・洞察を得る技法</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> ステークホルダーから情報や洞察を集める技法を少なくとも3つ挙げる。</p>
      </div>

      <ol>
        <li><strong>1対1インタビュー</strong>：深い文脈・感情・優先度の背景を理解する</li>
        <li><strong>ステークホルダーマッピング(Power/Interestグリッド)</strong>：関与度・影響力に応じてコミュニケーション頻度を設計する</li>
        <li><strong>ワークショップ(Impact Mapping / Story Mapping)</strong>：複数ステークホルダーの視点を1枚の地図に統合する</li>
        <li><strong>Sprint Reviewでのフィードバック収集</strong>：実際のIncrementに対する反応を定量・定性の両面で収集する</li>
        <li><strong>利用データ・アナリティクスの分析</strong>：発言ではなく実際の行動から洞察を得る</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「声の大きいステークホルダー」の意見に引っ張られないよう、複数の技法を組み合わせて三角測量(トライアンギュレーション)する。</li>
        </ul>
      </div>

      <h3>4.4(LO 1.4)スクラムイベント・Sprintを通じたPOの関わり方</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> スクラムイベント中およびSprintを通じて、POが他のスクラムチームメンバーとどのように関わるかを説明する。</p>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>場面</th><th>POの関わり方</th></tr></thead>
          <tbody>
            <tr><td>Sprint Planning</td><td>Product Goalと優先順位の背景を説明し、「なぜこのSprintが価値あるのか」の議論をリードする</td></tr>
            <tr><td>Backlog Refinement</td><td>Developersと共同でItemを詳細化し、受け入れ基準や期待するアウトカムをすり合わせる</td></tr>
            <tr><td>Daily Scrum</td><td>出席は必須ではないが、Developersが必要とする即時の意思決定に応じられる状態でいる</td></tr>
            <tr><td>Sprint中の随時対応</td><td>Sprint Goalを危険にさらさない範囲で、要件の疑問点にタイムリーに答える</td></tr>
            <tr><td>Sprint Review</td><td>進捗と学びをステークホルダーに共有し、フィードバックをProduct Backlogに反映する</td></tr>
            <tr><td>Sprint Retrospective</td><td>1人のScrum Teamメンバーとして、プロセス改善に対等な立場で参加する</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>POは「発注者」ではなく「Scrum Teamの一員」として振る舞う。Developersへの一方的な指示ではなく、対話を通じた合意形成を優先する。</li>
        </ul>
      </div>

      <h3>4.5(LO 1.5)複数チームを担当するPOの課題克服</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 複数のスクラムチームのPOであることの課題を克服する方法を少なくとも2つ特定する。</p>
      </div>

      <ol>
        <li><strong>詳細化の委任</strong>：Developersやプロキシ的役割(Business Analystなど)に日々のリファインメントの一部を委任しつつ、最終的な優先順位決定の権限はPOが保持する</li>
        <li><strong>単一で共有されたProduct Backlog</strong>：チームごとに別のバックログを作らず、1つのバックログをすべてのチームが参照する構造にすることで矛盾した優先順位付けを防ぐ</li>
        <li><strong>チーム間の同期の場を設ける</strong>：合同リファインメントや「PO for POs」的な場を設け、依存関係や優先順位の衝突を早期に発見する</li>
        <li><strong>ツールによる可視化</strong>：ダッシュボード等でどのチームが何を進めているかを一望できるようにし、認知負荷を下げる</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>委任するのは「作業」であって「アカウンタビリティ」ではないことをチームに明示する。最終判断が必要な場面は必ずPOにエスカレーションされる経路を作る。</li>
        </ul>
      </div>

      <h3>4.6(LO 1.6)POが単一人物である理由</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> POがグループでも委員会でもなく単一の人物である理由を少なくとも2つ議論する。</p>
      </div>

      <ol>
        <li><strong>意思決定の速さと一貫性</strong>：複数人の合議制では優先順位の変更のたびに合意形成のコストが発生し、Scrumが前提とする素早い適応が阻害される</li>
        <li><strong>アカウンタビリティの明確化</strong>：Scrum Guideは「Product Backlogを変更したい人は、Product Ownerを説得しなければならない」と定めており、責任の所在が1人に集約されることで、意思決定に対する説明責任が明確になる</li>
        <li>(補足)委員会制では政治的な駆け引きにより、声の大きいステークホルダーの意見がバックログに反映されやすくなるリスクがある</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>PO自身が多くのステークホルダーの声を「代弁」する存在であると自覚し、独断ではなく十分な情報収集の上での単独決定を行う。</li>
        </ul>
      </div>

      <h3>4.7(LO 1.7)Product Backlogに対するPOの権限と協働のバランス</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> POが開発者やステークホルダーと協働しながら、Product Backlogに対する権限をどのように・なぜ維持するのかを議論する。</p>
      </div>

      <p>POの権限(Authority)はScrum Guideに明記された「アカウンタビリティ」に由来します。しかし権限は独裁を意味しません。</p>

      <ul>
        <li><strong>Developersからの入力</strong>：実現可能性、技術的な複雑性、依存関係についての情報を提供してもらい、順序判断の精度を高める</li>
        <li><strong>ステークホルダーからの入力</strong>：ビジネス上の背景、市場機会、リスクの情報を提供してもらう</li>
        <li><strong>POの最終判断</strong>：これらの情報を統合し、最終的な内容・順序を決定する。これは「独裁」ではなく「情報を集約した上での意思決定の一元化」</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「決めるのはPOだが、決める材料は皆で作る」という姿勢を明示的にチームに伝え、協働と権限のバランスに対する誤解を防ぐ。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 06. goal-setting-planning ===================== -->
    <section id="goal-setting-planning">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 06</div>
      <h2>カテゴリ2 － Goal Setting and Planning(ゴール設定と計画)</h2>

      <h3>5.1(LO 2.1)Product VisionとProduct Goalの関係</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクトビジョンとプロダクトゴールの関係を説明する。</p>
      </div>

      <p><strong>Product Vision(プロダクトビジョン)</strong>はScrum Guideの正式な用語ではありませんが、実務上のPOにとって不可欠な「なぜこのプロダクトが存在するのか」という長期的・野心的な方向性です。一方<strong>Product Goal</strong>は、Scrum Guide 2020で正式に定義された、Product Backlogのコミットメントであり、「Scrum Teamが計画のよりどころにできる、プロダクトの将来状態」を指します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_VISION_GOAL_HIERARCHY"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Product VisionとProduct Goalの階層関係</div>
      </div>

      <p>Visionが「北極星」だとすれば、Product Goalはその方向に向かって設定される「次に到達すべき具体的な中間地点」です。1つのProduct Goalが達成される(または陳腐化して破棄される)と、Scrum Teamはビジョンに向けて次のProduct Goalに着手します。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Visionは変わりにくく、Product Goalは学びに応じて数か月単位で更新される、という時間軸の違いをチームと共有しておく。</li>
          <li>Product GoalはProduct Backlogの中に明示的に記載し、常に参照できるようにする。</li>
        </ul>
      </div>

      <h3>5.2(LO 2.2)Product Goalの作成を実践する</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクトゴールの作成を練習する。</p>
      </div>

      <p>実践的な作り方の一例：</p>

      <ol>
        <li>Visionから逆算し、「次の3〜6か月で何が達成されれば前進と言えるか」を書き出す</li>
        <li>「対象(誰のために)」「達成状態(何がどう変わるか)」「測定可能な基準(どう検証するか)」の3要素をテンプレート化する(例：「〇〇という顧客層に対し、△△という成果を実現する。成功は□□で測る」)</li>
        <li>単一の焦点になっているか(複数の無関係な目標を混ぜていないか)を確認する</li>
        <li>ステークホルダー・Developers双方が「腹落ち」する言葉になっているか対話で確認する</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Product Goalは「機能のリスト」ではなく「状態・成果」で書く。「〇〇機能を実装する」ではなく「〇〇によって顧客の△△という課題が解消された状態にする」という書き方にする。</li>
        </ul>
      </div>

      <h3>5.3(LO 2.3)Sprint Goalの作成をScrum Teamと実践する</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> スクラムチームとスプリントゴールの作成を練習する。</p>
      </div>

      <p>Sprint GoalはSprint Planningの中で、Scrum Team全員の対話を通じて作られます。</p>

      <ol>
        <li>POがProduct Goalと現在の優先順位の背景(なぜこのタイミングでこのItem群なのか)を共有する</li>
        <li>チーム全員で「このSprintが終わったとき、何が達成されていれば価値があると言えるか」を1文で言語化する</li>
        <li>選定したProduct Backlog Itemsが、そのSprint Goalに対してどう貢献するかを確認する</li>
        <li>Sprint Goalが単なる「タスクの寄せ集めの言い換え」になっていないかをレビューする</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Sprint Goalの草案が出たら「これが達成できなかったとき、Sprintは失敗だったと言えるか？」を自問し、真に本質的な目的になっているか検証する。</li>
        </ul>
      </div>

      <h3>5.4(LO 2.4)ステークホルダーとのプロダクト計画・予測の構成要素</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> ステークホルダーとのプロダクト計画または予測の構成要素を挙げる。</p>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>構成要素</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>Product Goal</td><td>今、Scrum Teamが目指している中期的な到達点</td></tr>
            <tr><td>ロードマップ上のテーマ / マイルストーン</td><td>Now-Next-Laterなどで表現される大まかな方向性</td></tr>
            <tr><td>前提・リスク</td><td>計画が依拠している仮説と、それが崩れた場合の影響</td></tr>
            <tr><td>対象市場・顧客セグメント</td><td>誰に向けた計画か</td></tr>
            <tr><td>成功指標</td><td>何をもって成功と判断するか(アウトカム指標)</td></tr>
            <tr><td>予測レンジ(幅を持たせた見積り)</td><td>過去の実績(ベロシティ・スループット)に基づく確率的な幅のある予測</td></tr>
            <tr><td>依存関係</td><td>他チーム・他システム・外部要因への依存</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>予測は単一の日付ではなく「幅(レンジ)」で提示し、不確実性を隠さない。</li>
        </ul>
      </div>

      <h3>5.5(LO 2.5)プロダクトリリースの計画方法</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクトリリースの計画方法を説明する。</p>
      </div>

      <ol>
        <li>リリースの目的(Product Goalとの関係)を明確にする</li>
        <li>リリースに必要な最小限の価値ある機能群(Minimum Viable/Valuable増分)をProduct Backlogの上位に配置する</li>
        <li>過去の実績データ(スループット・ベロシティ)を用いた経験的予測(例：モンテカルロ法によるレンジ予測)でリリース時期を見立てる</li>
        <li>Sprint Reviewのたびにリリース計画を見直し、学びに応じて再調整する</li>
        <li>技術的な準備状況(Definition of Doneの充足)や、規制・市場投入のタイミングといった外部制約を考慮する</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「いつ全部終わるか」ではなく「いつ最初の価値を届けられるか」を起点に計画する。</li>
        </ul>
      </div>

      <h3>5.6(LO 2.6)小さく価値があり利用可能な増分を見極めるアプローチ</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 小さく、価値があり、利用可能な増分を特定するアプローチを少なくとも2つ説明する。</p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_SPIDR_STORY_MAPPING"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">小さく価値ある増分を見極める2つのアプローチ</div>
      </div>

      <ol>
        <li><strong>ストーリー分割技法(例：SPIDRパターン)</strong>：Spike(調査)・Path(分岐の単純化)・Interface(画面/操作の単純化)・Data(データ範囲の縮小)・Rules(ビジネスルールの単純化)の切り口で、大きなItemを小さく分割する</li>
        <li><strong>Story MappingとWalking Skeleton</strong>：ユーザーの利用の流れを横軸に、機能の厚みを縦軸に配置し、まずはエンドツーエンドで細く動く「歩く骨格」を作ってから厚みを増していく</li>
      </ol>

      <p>いずれも、早期にフィードバックを得ながら、各増分が単体で「利用可能(usable)」であることを重視します。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「小さいが無意味な増分」にならないよう、分割後も各Itemが独立した価値仮説を持っているかを確認する。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 07. understanding-customers-users ===================== -->
    <section id="understanding-customers-users">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 07</div>
      <h2>カテゴリ3 － Understanding Customers and Users(顧客とユーザーの理解)</h2>

      <h3>6.1(LO 3.1)POのプロダクトディスカバリーと検証への組み込み方</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> POがどのようにプロダクトディスカバリーと検証を自身の仕事に組み込むかを説明する。</p>
      </div>

      <p>現代のプロダクトオーナーシップでは、「作る(Delivery)」と並行して「何を作るべきかを探る(Discovery)」を継続的に行う、いわゆる<strong>デュアルトラック(Dual-Track)</strong>の考え方が広く実務で採用されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_DUAL_TRACK_DISCOVERY"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">DiscoveryトラックとDeliveryトラックのデュアルトラック</div>
      </div>

      <p>POはSprintの計画・レビューといった「配送」の仕事に加え、日常的に顧客インタビュー、利用データの分析、プロトタイプでの反応確認などの「探索」の仕事を並行して行い、その結果を継続的にProduct Backlogへ反映します。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>ディスカバリーを「バックログが空になったときにまとめてやる特別イベント」にせず、毎週一定時間を確保する習慣にする。</li>
        </ul>
      </div>

      <h3>6.2(LO 3.2)顧客・ユーザーのセグメンテーション手法</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 顧客またはユーザーをセグメント化するアプローチを少なくとも1つ図解する。</p>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>セグメンテーション手法</th><th>切り口</th><th>適する場面</th></tr></thead>
          <tbody>
            <tr><td>デモグラフィック / ファームグラフィック</td><td>年齢・地域・業種・企業規模など</td><td>マーケティング的な大枠の分類</td></tr>
            <tr><td>行動ベース(Behavioral)</td><td>利用頻度・利用機能・購買パターン</td><td>プロダクト内の行動データが豊富な場合</td></tr>
            <tr><td>ニーズベース / Jobs-to-be-Done</td><td>「片付けたい用事(Job)」単位</td><td>表面的な属性より本質的な動機を掴みたい場合</td></tr>
            <tr><td>ペルソナ</td><td>上記を統合した架空の代表人物像</td><td>チーム全体での共通認識・共感の醸成</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>セグメントは「作って終わり」にせず、Product Backlogの優先順位判断に実際に使う(例：「このItemはどのセグメントに効くか」を常に自問する)。</li>
        </ul>
      </div>

      <h3>6.3(LO 3.3)相反する顧客・ユーザーニーズへの対処技法</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 相反する顧客(またはユーザー)ニーズに対処する技法を少なくとも1つ練習する。</p>
      </div>

      <ul>
        <li><strong>Kanoモデル</strong>：機能を「当たり前品質」「一元的品質(性能)」「魅力的品質(感動)」に分類し、相反するニーズがどの品質次元に属するかで優先度を判断する</li>
        <li><strong>Impact/Effortマトリクス</strong>：それぞれのニーズが持つインパクトと実現コストを2軸で可視化し、対話の土台にする</li>
        <li><strong>Product Goalを判断基準にした対話</strong>：個別の要望の是非ではなく、「どちらがProduct Goalへの貢献が大きいか」という共通の物差しで議論する</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>対立するステークホルダー双方に「なぜその機能が必要か(Why)」を語ってもらい、表面的な要求(What)の奥にある本当のニーズを探ってから優先順位を判断する。</li>
        </ul>
      </div>

      <h3>6.4(LO 3.4)プロダクトディスカバリーが成功に貢献する側面</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクトディスカバリーの少なくとも3つの側面が、どのようにプロダクトの成功に貢献するかを特定する。</p>
      </div>

      <ol>
        <li><strong>リスクの低減</strong>：望ましさ(Desirability)・実現可能性(Feasibility)・事業性(Viability)を作る前に検証することで、無駄な開発を防ぐ</li>
        <li><strong>チームの共感の醸成</strong>：Developers自身が顧客の課題を直接理解することで、当事者意識と提案の質が上がる</li>
        <li><strong>意思決定の根拠形成</strong>：意見ではなく証拠に基づいてProduct Backlogの優先順位を語れるようになる</li>
        <li>(補足)Product Goal設定の現実性向上：市場の実態に基づいた、達成可能な目標設定につながる</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>ディスカバリーの成果(インタビューメモ、実験結果)をチームで共有可能な形(wiki、共有ボードなど)で蓄積し、属人化させない。</li>
        </ul>
      </div>

      <h3>6.5(LO 3.5)開発者を顧客・ユーザーに直接つなげるアプローチ</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 開発者を顧客やユーザーに直接つなげるアプローチを少なくとも3つ挙げる。</p>
      </div>

      <ol>
        <li>Developersを顧客インタビュー・ユーザビリティテストに同席させる</li>
        <li>実際の顧客・ステークホルダーをSprint Reviewに招待し、Developers自身が直接フィードバックを受け取る場を作る</li>
        <li>サポート窓口に寄せられた顧客の声・チケットをDevelopersが直接閲覧できるチャネルを用意する</li>
        <li>利用状況のアナリティクスダッシュボードをチーム全員がアクセス可能にする</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「PO経由で伝聞のフィードバックを受け取る」のではなく、Developersが一次情報に触れる頻度を意図的に増やす設計にする。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 08. validating-product-assumptions ===================== -->
    <section id="validating-product-assumptions">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 08</div>
      <h2>カテゴリ4 － Validating Product Assumptions(プロダクト仮説の検証)</h2>

      <h3>7.1(LO 4.1)Scrumがプロダクト仮説の検証をどう支えるか</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> Scrumがプロダクトの仮説検証をどのようにサポートするかを説明する。</p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_HYPOTHESIS_VALIDATION_LOOP"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Scrumが支える仮説検証のループ</div>
      </div>

      <p>経験主義の三本柱(透明性・検査・適応)と短いSprintの組み合わせにより、Scrumは「仮説を立てる→小さく検証する→学びを反映する」というループを高速に回すための土台になります。Product Backlogが創発的であることも、検証結果に応じて計画を柔軟に組み替えることを可能にします。POはこの仕組みを活用し、最もリスクの高い(不確実性の高い)仮説から優先的に検証するようProduct Backlogを組み立てます。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「一番怖い前提は何か」をチームで棚卸しし、それを検証するItemを意図的にProduct Backlogの上位に置く。</li>
        </ul>
      </div>

      <h3>7.2(LO 4.2)プロダクト仮説の検証アプローチをコストと学習の質で比較する</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクトの仮説を検証するアプローチを、コストと学習の質という観点で少なくとも3つ比較する。</p>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>検証アプローチ</th><th>コスト</th><th>学習の質(信頼性)</th><th>得られるもの</th></tr></thead>
          <tbody>
            <tr><td>顧客インタビュー・アンケート</td><td>低い</td><td>発言ベースのため中〜低(言行不一致のリスク)</td><td>課題の背景・言語化された動機</td></tr>
            <tr><td>プロトタイプ / ユーザビリティテスト</td><td>中程度</td><td>行動観察が入るため中〜高</td><td>操作上の問題、意図の実際の理解度</td></tr>
            <tr><td>ランディングページ / フェイクドア / コンシェルジュMVP</td><td>低〜中程度</td><td>実際の申込・クリックという行動データのため高</td><td>需要の実在性、価格受容性の兆候</td></tr>
            <tr><td>実装したIncrementでのA/Bテスト</td><td>高い(実装コストが必要)</td><td>最も高い(実際の利用行動そのもの)</td><td>定量的な因果関係に近いエビデンス</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>コストが低い検証から着手し、仮説の確度が上がるにつれて段階的にコストの高い検証へ進める「検証のはしご」を意識する。</li>
          <li>「作ってみないとわからない」という思い込みを疑い、実装前に検証できる方法がないか常に探す。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 09. working-with-product-backlog ===================== -->
    <section id="working-with-product-backlog">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 09</div>
      <h2>カテゴリ5 － Working with the Product Backlog(プロダクトバックログの運用)</h2>

      <h3>8.1(LO 5.1)アウトカムとアウトプットの関係</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> アウトカムとアウトプットの関係を説明する。</p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_OUTPUT_OUTCOME_IMPACT"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Output・Outcome・Impactの関係</div>
      </div>

      <p><strong>Output(アウトプット)</strong>は「作ったもの」(機能、Increment、リリース数)であり、<strong>Outcome(アウトカム)</strong>は「その結果として実際に生まれた顧客行動や事業指標の変化」です。多くのアウトプットを出しても、顧客の行動が変わらなければアウトカムはゼロです。POの本質的な仕事は、アウトプットの量を最大化することではなく、<strong>最小のアウトプットで最大のアウトカムを生む</strong>ことにあります。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Sprint Reviewでは「何を作ったか」だけでなく「それによって何が変わったか(変わりそうか)」を必ず議論する。</li>
        </ul>
      </div>

      <h3>8.2(LO 5.2)アウトカム・インパクトを最大化しアウトプットを最小化する行動</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> アウトカム・インパクトを最大化し、アウトプットを最小化するために、POが取り得る行動を少なくとも3つ挙げる。</p>
      </div>

      <ol>
        <li>価値の低いItemをProduct Backlogから積極的に取り除く(「やらないことを決める」)</li>
        <li>実装前にディスカバリーで仮説を検証し、無駄な構築を未然に防ぐ</li>
        <li>利用されていない既存機能を削除・簡素化し、保守コストを下げる(「引き算」で価値を生む)</li>
        <li>Impact/EffortやWSJFのような手法で、労力対効果の高いItemを優先する</li>
        <li>出力指標(完了したItem数など)ではなく、成果指標(利用率、満足度など)でチームの成功を評価する</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>スプリントレビューやロードマップの評価軸に、意図的に「アウトカム指標」を組み込み、アウトプット偏重の評価文化を避ける。</li>
        </ul>
      </div>

      <h3>8.3(LO 5.3)プロダクト経済性に関する用語</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクト経済性に関連する用語を少なくとも3つ定義する。</p>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>用語</th><th>定義</th></tr></thead>
          <tbody>
            <tr><td>Cost of Delay(遅延コスト)</td><td>ある機能の提供が遅れることによって失われる価値(時間の経過に対する価値損失)</td></tr>
            <tr><td>WSJF(Weighted Shortest Job First)</td><td>Cost of Delayを実現に要する期間(Job Size)で割り、優先順位を数値化する手法</td></tr>
            <tr><td>ROI(投資対効果)</td><td>投じたコストに対して得られたリターンの比率</td></tr>
            <tr><td>Opportunity Cost(機会費用)</td><td>あるItemに取り組むことで、代わりに実行できなかった他の選択肢の価値</td></tr>
            <tr><td>Sunk Cost(埋没費用)</td><td>すでに投じてしまい、今後の意思決定に影響を与えるべきではないコスト</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>優先順位付けの議論で「もう投資したから」(サンクコスト)という理由が出てきたら、それが将来価値の判断を歪めていないか確認する。</li>
        </ul>
      </div>

      <h3>8.4(LO 5.4)異なるステークホルダー群から見た「価値」</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 少なくとも3つの異なるステークホルダー群の視点から「価値」を説明する。</p>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>ステークホルダー群</th><th>価値の捉え方</th></tr></thead>
          <tbody>
            <tr><td>エンドユーザー・顧客</td><td>課題が解決されること、使いやすさ、体験の満足度</td></tr>
            <tr><td>事業・経営層</td><td>売上・市場シェア・戦略との整合性、投資対効果</td></tr>
            <tr><td>Developers・技術組織</td><td>保守性、技術的負債の軽減、持続可能な開発ペース</td></tr>
            <tr><td>サポート・運用部門</td><td>インシデントの減少、運用負荷の軽減</td></tr>
            <tr><td>規制・コンプライアンス部門</td><td>リスクの低減、法令遵守</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Product Backlog Itemの優先順位を議論する際、暗黙のうちにどのステークホルダー群の「価値」を優先しているかを明示的に言語化する。</li>
        </ul>
      </div>

      <h3>8.5(LO 5.5)価値を測定する技法</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 価値を測定する技法を少なくとも3つ挙げる。</p>
      </div>

      <ol>
        <li><strong>OKR(Objectives and Key Results)</strong>：目標とその達成度を測る主要な結果指標を組み合わせる</li>
        <li><strong>利用・定着率などのプロダクトアナリティクス</strong>：実際の行動データに基づく測定</li>
        <li><strong>NPS(Net Promoter Score)・CSAT(顧客満足度)</strong>：顧客の主観的評価を定量化する</li>
        <li><strong>Cost of Delayの定量化</strong>：遅延によって失われる価値を金額や時間で見積もる</li>
        <li><strong>A/Bテストによるリフト測定</strong>：変更前後の指標差分を統計的に評価する</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>単一の指標に依存せず、行動指標(アナリティクス)と態度指標(NPS/CSAT)を組み合わせて多面的に価値を把握する。</li>
        </ul>
      </div>

      <h3>8.6(LO 5.6)Product Goal達成を支えるProduct Backlogの作成</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクトゴールの達成を支えるプロダクトバックログを作成する。</p>
      </div>

      <p>Roman Pichlerが提唱する<strong>DEEP</strong>属性は、健全なProduct Backlogの特徴を端的に表す実務上よく使われるフレームワークです。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>属性</th><th>意味</th></tr></thead>
          <tbody>
            <tr><td>Detailed appropriately</td><td>上位のItemほど詳細に、下位ほど粗く(適切な詳細度の階調)</td></tr>
            <tr><td>Emergent</td><td>学びに応じて常に変化し続ける</td></tr>
            <tr><td>Estimated</td><td>相対的にでも見積りがされている</td></tr>
            <tr><td>Prioritized(Ordered)</td><td>価値・リスク・依存関係に基づいて順序付けられている</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <p>すべてのItemがProduct Goalに紐づいているかを定期的に確認し、Goalに貢献しないItemが紛れ込んでいないかをレビューすることが、Goal達成を支えるバックログ運用の要となります。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Product Backlogの先頭付近(次の1〜2 Sprint分)は「準備完了(Ready)」の水準まで詳細化し、下位は意図的に粗いままにしておく。</li>
        </ul>
      </div>

      <h3>8.7(LO 5.7)望ましいアウトカムと価値を含むProduct Backlog Itemの作成</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> 望ましいアウトカムと価値の説明を含む、少なくとも1つのプロダクトバックログアイテムを作成する。</p>
      </div>

      <p>代表的なフォーマット(User Story形式)：</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>As a〈利用者〉, I want〈実現したいこと〉, so that〈得られる価値・アウトカム〉</p>
      </div>

      <p>これに加えて、実務では次の要素を補うことが推奨されます。</p>

      <ul>
        <li><strong>受け入れ基準(Acceptance Criteria)</strong>：完成の判断基準を明確化</li>
        <li><strong>アウトカム仮説</strong>：「このItemが完成すれば、〇〇という指標が△△に変化するはずだ」という検証可能な仮説</li>
        <li><strong>サイズ / 見積り</strong>：相対サイズなど</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>"so that"の部分(価値・アウトカム)を空欄のまま次に進めない。ここが書けないItemは、そもそも作るべきかを疑う。</li>
        </ul>
      </div>

      <h3>8.8(LO 5.8)Product Backlogのリファインメントを実践する</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>学習目標原文の要旨:</strong> プロダクトバックログをリファインメントするアプローチを少なくとも1つ練習する。</p>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_BACKLOG_REFINEMENT_CYCLE"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">Product Backlogリファインメントのサイクル</div>
      </div>

      <p>実践的な進め方の一例：</p>

      <ol>
        <li>直近1〜2 Sprint分のItemに絞って詳細化する(Just-In-Time)</li>
        <li>Story Mapping等を使い、Product Goal全体像の中でのItemの位置づけを確認しながら詳細化する</li>
        <li>Planning Poker等の相対見積り手法でチーム全体の認識を揃える</li>
        <li>新しい学び(顧客フィードバック・技術的発見)を反映して順序を継続的に見直す</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>リファインメントをPOだけの作業にせず、Developersと共同で行う。技術的な実現可能性の議論をこの場で済ませておくことで、Sprint Planningがスムーズになる。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. best-practices-checklist ===================== -->
    <section id="best-practices-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 10</div>
      <h2>ベストプラクティス総合チェックリスト</h2>

      <p>これまでの章で紹介したベストプラクティスを、日々の実務で使えるチェックリストとして再構成しました。</p>

      <h3>プロダクトオーナーとしての基本姿勢</h3>

      <ul>
        <li>☐ Product Backlogに対する最終決定権は自分にあることを自覚しつつ、独断ではなく十分な情報収集の上で判断している</li>
        <li>☐ Developersの「どう作るか」には介入せず、「何を・なぜ」の意思決定に集中している</li>
        <li>☐ 経験主義(透明性・検査・適応)を自ら体現し、Product Backlogを常に最新に保っている</li>
        <li>☐ 複数チームを担当する場合、委任と権限保持の境界を明確にしている</li>
      </ul>

      <h3>ゴール設定と計画</h3>

      <ul>
        <li>☐ Product Visionと現在のProduct Goalの違いをチームに説明できる</li>
        <li>☐ Product Goalを「機能」ではなく「状態・成果」で言語化している</li>
        <li>☐ Sprint Goalが単なるItemの寄せ集めになっていないか、毎回検証している</li>
        <li>☐ リリース計画を単一日付ではなく確率的なレンジで提示している</li>
        <li>☐ 大きなItemを小さく価値ある増分に分割する技法(SPIDR、Story Mapping等)を使いこなせる</li>
      </ul>

      <h3>顧客とユーザーの理解</h3>

      <ul>
        <li>☐ Discovery(探索)とDelivery(構築)を並行して継続的に行っている</li>
        <li>☐ セグメンテーションを実際の優先順位判断に活用している</li>
        <li>☐ 対立するニーズをKanoモデルやImpact/Effortマトリクスで構造的に整理している</li>
        <li>☐ Developersが顧客と直接接する機会を意図的に設計している</li>
      </ul>

      <h3>プロダクト仮説の検証</h3>

      <ul>
        <li>☐ 最もリスクの高い仮説から検証する順序でProduct Backlogを組んでいる</li>
        <li>☐ 実装前に検証できる方法(インタビュー、プロトタイプ、フェイクドア等)を優先的に検討している</li>
      </ul>

      <h3>プロダクトバックログの運用</h3>

      <ul>
        <li>☐ アウトプットではなくアウトカムでチームの成功を測っている</li>
        <li>☐ Product Backlogの各Itemが明確にProduct Goalへ紐づいている(DEEP属性を満たしている)</li>
        <li>☐ Item作成時に"so that"(価値・アウトカム)を明確に書いている</li>
        <li>☐ リファインメントをDevelopersと共同で継続的に実施している</li>
      </ul>
    </section>

    <!-- ===================== 11. career-path-renewal ===================== -->
    <section id="career-path-renewal">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 11</div>
      <h2>認定後のキャリアパスと資格更新(A-CSPO / CSP-PO / SEU)</h2>

      <h3>10.1 資格更新の基本ルール</h3>

      <p>CSPOをはじめとするScrum Alliance認定は「一度取得したら終わり」の終身資格ではなく、<strong>2年ごとの更新</strong>が必要です。更新には、更新料の支払いと、規定数の<strong>Scrum Education Units(SEU)</strong>の提出が必要です。</p>

      <p>SEUは、書籍を読む、ウェビナーを視聴する、イベントに参加するなど、継続的な学習活動によって獲得できる「学びのクレジット」です。SEUを更新要件に組み込むことで、Scrum Alliance認定は「知識が更新され続けていること」を雇用主に示す仕組みになっています。</p>

      <h3>10.2 上位資格による自動更新</h3>

      <p>CSPOを取得した後、上位資格である<strong>A-CSPO(Advanced Certified Scrum Product Owner)</strong>や<strong>CSP®-PO(Certified Scrum Professional® - Product Owner)</strong>を取得・更新すると、CSPO自体も自動的に更新されます。つまり、実務でプロダクトオーナーシップを深めながらキャリアアップすることが、そのまま基礎資格の維持にもつながる設計です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_CERT_RENEWAL_PATH"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSPO認定の更新と上位資格へのキャリアパス</div>
      </div>

      <h3>10.3 A-CSPO(Advanced Certified Scrum Product Owner)</h3>

      <p>A-CSPOは、CSPO取得者が実務経験を積んだ後に目指す上位資格です。Scrum Alliance公式ページが定める認定要件は次のとおりで、いずれも必須です。</p>

      <ol>
        <li><strong>CSPO認定を保有していること</strong>(有効・失効いずれでも可。A-CSPO取得時にCSPOも自動更新される)</li>
        <li><strong>直近5年以内に、Product Ownerアカウンタビリティに固有の実務経験を12か月以上</strong>保有していることの証明</li>
        <li><strong>Scrum Alliance承認の教育提供者によるA-CSPOコースを受講</strong>すること</li>
        <li>事前・事後課題を含む<strong>コースの全構成要素を修了</strong>すること</li>
        <li><strong>A-CSPOライセンス契約に同意し、Scrum Allianceのメンバープロフィールを完成</strong>させること</li>
      </ol>

      <p>取得後は、SEUの獲得と2年ごとの更新によって認定を維持します。学習内容は、ステークホルダーコラボレーションのスケーリング、プロダクト戦略・計画の高度化、仮説検証の高度な手法、Product Backlogの高度な優先順位付け・リファインメント技法などが含まれます。</p>

      <h3>10.4 CSP®-PO(Certified Scrum Professional® - Product Owner)</h3>

      <p>CSP-POは、Product Ownerとしての専門性をさらに高めた上位資格で、アジャイルコーチやトレーナーを目指す人にとっても足がかりとなる資格です。Scrum Alliance公式ページが定める認定要件は次のとおりで、いずれも必須です。</p>

      <ol>
        <li><strong>A-CSPO認定を保有していること</strong>(有効・失効いずれでも可。CSP-PO取得時にA-CSPOとCSPOも自動更新される)</li>
        <li><strong>Scrum Alliance承認のCSP-PO教育プログラムを受講</strong>すること</li>
        <li>事前・事後課題を含む<strong>全構成要素を修了</strong>すること</li>
        <li><strong>CSP-POライセンス契約に同意し、Scrum Allianceのメンバープロフィールを完成</strong>させること</li>
        <li><strong>直近5年以内に、Product Ownerのロールに固有の実務経験を24か月以上</strong>保有していることの証明</li>
      </ol>

      <p>SEUは認定の<strong>維持(2年ごとの更新)</strong>のための仕組みであり、上記の必須要件を代替するものではありません。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>CSPO取得後すぐにA-CSPOを目指すのではなく、まず実務でProduct Backlog運用・ステークホルダー折衝の経験を積み、そこで直面した課題を言語化してからA-CSPOの学習に臨むと定着が良い。</li>
          <li>SEUは更新直前にまとめて集めるのではなく、日常的な学習(記事・ウェビナー視聴など)を通じて継続的に積み上げる。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 12. misconceptions-antipatterns ===================== -->
    <section id="misconceptions-antipatterns">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 12</div>
      <h2>よくある誤解とアンチパターン</h2>

      <p>CSPO学習者・現場の新任Product Ownerが陥りやすい誤解を整理します。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>誤解・アンチパターン</th><th>実際には</th></tr></thead>
          <tbody>
            <tr><td>POは「要求を右から左に流すだけの窓口」である</td><td>POはプロダクトの価値最大化にアカウンタビリティを持つ、能動的な意思決定者である</td></tr>
            <tr><td>Product Backlogは一度作れば完成する</td><td>Product Backlogは創発的(emergent)であり、常に変化し続けるのが正常な状態である</td></tr>
            <tr><td>Sprint Goalは「今スプリントでやるタスクの一覧」である</td><td>Sprint Goalは単一の目的・理由(Why)であり、タスクの寄せ集めではない</td></tr>
            <tr><td>POが忙しいのでバックログの詳細化は開発チームに全部任せて口を出さない</td><td>詳細化はDevelopersとの協働であり、POは価値・優先順位の観点で継続的に関与する必要がある</td></tr>
            <tr><td>ベロシティ(アウトプット量)が高いほど良いPOである</td><td>本質的な評価軸はアウトカム(顧客・事業への実際の効果)である</td></tr>
            <tr><td>複数のPOで1つのProduct Backlogを分担管理する</td><td>Product Backlogの最終決定者は常に1人であるべきで、分担管理は優先順位の矛盾を招きやすい</td></tr>
            <tr><td>ディスカバリー(顧客調査)は最初の一度だけ行えばよい</td><td>ディスカバリーはDeliveryと並行して継続的に行う活動である</td></tr>
            <tr><td>ロードマップ上の日付は約束(コミットメント)である</td><td>ロードマップは方向性の提示であり、Sprintのコミットメントとは性質が異なる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>チーム内でこの表を共有し、「自分たちの現状はどのアンチパターンに近いか」を定期的に振り返る(Sprint Retrospectiveの題材にするのも有効)。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 13. summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 13</div>
      <h2>まとめ</h2>

      <p>CSPO学習目標は、大きく5つのカテゴリ(Product Owner Core Competencies / Goal Setting and Planning / Understanding Customers and Users / Validating Product Assumptions / Working with the Product Backlog)に整理されており、その土台にはScrum Foundationsで扱われるScrum理論・チーム構造・イベント・作成物の理解があります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram
            :chart="DIAGRAM_CATEGORY_SUMMARY"
            theme="base"
            :theme-variables="MERMAID_THEME_VARIABLES"
          />
          <template #fallback>
            <div class="diagram-loading">図を読み込み中...</div>
          </template>
        </ClientOnly>
      </div>
        <div class="diagram-caption">CSPO学習目標5カテゴリと土台となるScrum Foundationsの全体像</div>
      </div>

      <p>一貫して通底するテーマは、「Product Ownerは単一の意思決定者として、経験主義に基づき、顧客・ステークホルダー・Developersと協働しながら、アウトプットではなくアウトカム / インパクトを最大化する」という点です。CSPOの学習は知識の暗記にとどまらず、Product Goalの作成、Sprint Goalの作成、Product Backlog Itemの作成、リファインメントの実践など、多くの学習目標がApplication以上(Bloom's Taxonomy)を求めていることからもわかるように、<strong>実践を通じて体得すること</strong>を重視しています。</p>

      <p>CSPO取得はゴールではなく、A-CSPO・CSP-POへと続くProduct Owner Trackの出発点です。日々の実務でここに整理したベストプラクティスを反復しながら、SEUを積み上げて資格を更新し続けることが、プロダクトオーナーとしての継続的な成長につながります。</p>
    </section>

    <!-- ===================== 14. references ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 14</div>
      <h2>参考文献・ソース一覧</h2>

      <p>本ガイドの内容は、以下の一次情報源に基づいています。学習を深める際は、必ず一次情報源(特にScrum Guideと公式Learning Objectives)を直接参照してください。</p>

      <div class="ref-group">
        <h3>Scrum Alliance公式情報</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Certified Scrum Product Owner®(CSPO®)公式紹介ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner</a></li>
          <li><span class="ref-name">CSPO Learning Objectives(2022年1月改訂 / PDF、本ガイドの中核ソース)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/cspo_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/cspo_learning_objectives_2022.pdf</a></li>
          <li><span class="ref-name">Scrum Foundations® Learning Objectives(2022年1月改訂 / PDF)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf</a></li>
          <li><span class="ref-name">Product Owner Track 全体像</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/product-owner-track" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track</a></li>
          <li><span class="ref-name">Advanced Certified Scrum Product Owner(A-CSPO)</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner</a></li>
          <li><span class="ref-name">Certified Scrum Professional® - Product Owner(CSP®-PO)</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner</a></li>
          <li><span class="ref-name">Scrum Education Units(SEU)について</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
          <li><span class="ref-name">資格更新(Renewing Certifications)</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/renewing-certifications</a></li>
          <li><span class="ref-name">Scrum Alliance「About Scrum」(Scrumの基礎解説)</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum</a></li>
          <li><span class="ref-name">Scrum Alliance Scrum価値観ページ</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
          <li><span class="ref-name">Certified ScrumMaster®(CSM®)公式紹介ページ(CSM/CSPO比較の参照先)</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster</a></li>
          <li><span class="ref-name">Scrum Master とは(What is a Scrum Master)</span><a class="ref-url" href="https://www.scrumalliance.org/what-is-a-scrum-master" target="_blank" rel="noopener">https://www.scrumalliance.org/what-is-a-scrum-master</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>フレームワークの一次情報源</h3>
        <ul class="ref-list">
          <li><span class="ref-name">The Scrum Guide(Ken Schwaber &amp; Jeff Sutherland, 2020年11月版)</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
          <li><span class="ref-name">Manifesto for Agile Software Development(4つの価値)</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          <li><span class="ref-name">Manifesto for Agile Software Development(12の原則)</span><a class="ref-url" href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/principles.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>関連リソース(Scrum Alliance Resource Library)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">What Are Product Goals in Scrum?(Product Goal解説記事)</span><a class="ref-url" href="https://resources.scrumalliance.org/article/product-goals-scrum" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/product-goals-scrum</a></li>
          <li><span class="ref-name">Are Features a Part of Scrum?(フィーチャーとScrumの関係)</span><a class="ref-url" href="https://resources.scrumalliance.org/article/features-scrum" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/features-scrum</a></li>
          <li><span class="ref-name">What's a Typical Day for a Product Owner?(POの典型的な1日)</span><a class="ref-url" href="https://resources.scrumalliance.org/article/whats-typical-day-product-owner" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/whats-typical-day-product-owner</a></li>
          <li><span class="ref-name">Everything You Need to Know About Acceptance Criteria(受け入れ基準の解説)</span><a class="ref-url" href="https://resources.scrumalliance.org/article/need-know-acceptance-criteria" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/need-know-acceptance-criteria</a></li>
        </ul>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p><strong>著作権に関する注記:</strong> The Scrum Guideは© 2020 Ken Schwaber and Jeff Sutherlandに帰属し、Creative Commons Attribution Share-Alike License v4.0のもとで利用されています(詳細：<a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" target="_blank" rel="noopener">https://creativecommons.org/licenses/by-sa/4.0/legalcode</a>)。本ガイドはScrum Guideの内容を要約・解説したものであり、原文の引用ではありません。正確な定義・文言は必ず原典(scrumguides.org)を参照してください。</p>
      </div>
    </section>

    <footer>
      本ガイドは学習支援を目的とした二次資料です。実際の受験・受講にあたっては、必ずScrum Alliance公式サイトおよび担当トレーナーが提供する最新情報を確認してください。CSPO®、Certified Scrum Product Owner®、Scrum Alliance®は、Scrum Allianceの登録商標です。
    </footer>
      
    </main>
  </div>
</template>

<style scoped>

/* Layout & Nuxt integration */
.sidebar {
  top: var(--global-nav-height);
  height: calc(100vh - var(--global-nav-height));
}

.sidebar-overlay {
  display: none;
}

@media (max-width: 980px) {
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(2px);
    z-index: 25;
  }
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 16px 0;
  -webkit-overflow-scrolling: touch;
}

.table-wrap table {
  width: 100%;
  margin: 0;
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
  margin-top: 24px;
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

.mermaid-wrap {
  margin: 24px 0;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 20px;
}

.diagram-loading {
  text-align: center;
  color: var(--color-ink-faint);
  font-size: 14px;
  padding: 24px 0;
}

a { color: var(--color-indigo); text-decoration: none; }
  a:hover { text-decoration: underline; }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--color-indigo); outline-offset: 2px; }

  img, svg { max-width: 100%; }

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
      /* 画面外のリンクがキーボードフォーカスを受け取らないよう visibility も落とす */
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
</style>
