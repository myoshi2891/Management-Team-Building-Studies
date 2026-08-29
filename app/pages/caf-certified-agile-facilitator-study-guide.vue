<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-this-guide",
  "what-is-caf",
  "facilitation-definition",
  "who-should-take-caf",
  "five-learning-objectives",
  "neutrality-principle",
  "tuckman-model",
  "psychological-safety",
  "diamond-of-participation",
  "facilitating-through-conflict",
  "remote-facilitation",
  "before-during-after",
  "facilitation-toolbox",
  "facilitator-vs-adjacent-roles",
  "best-practices-summary",
  "certification-path-resources",
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
  title: "Certified Agile Facilitator(CAF)認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description:
    "Scrum Alliance Certified Agile Facilitator(CAF)を初学者向けに解説する非公式学習ガイド。5つの学習目標、中立性の原則、Tuckmanモデル、心理的安全性、Diamond of Participationなどを図解とベストプラクティスつきで詳しく解説します。",
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

const DIAGRAM_SCHWARZ_CONDITIONS = `flowchart TB
    A["ファシリテーターの3条件 Schwarz 1994"] --> B["1 中立である substantively neutral"]
    A --> C["2 意思決定権を持たない no decision-making authority"]
    A --> D["3 全メンバーに受け入れられている acceptable to all members"]
    B --> E["結果ではなくプロセスに責任を持つ"]
    C --> E
    D --> E`;

const DIAGRAM_CAF_ROLES = `flowchart LR
    subgraph ROLE["CAFが役立つロール"]
        direction TB
        SM["スクラムマスター"]
        PO["プロダクトオーナー"]
        DEV["開発チームメンバー"]
        LEAD["チームリーダー"]
        COACH["アジャイルコーチ 現役 志望"]
        CONS["アジャイルコンサルタント"]
        PF["プロフェッショナルファシリテーター"]
    end
    ROLE --> OUT["共通のゴール 会議 ワークショップ 意思決定の場を機能させる"]`;

const DIAGRAM_FIVE_OBJECTIVES_CYCLE = `flowchart LR
    A["1 ファシリテーターとは何かを知る"] --> B["2 中立なマインドセットを実践"]
    B --> C["3 対立を通してチームを導く"]
    C --> D["4 チームごとのニーズを理解する"]
    D --> E["5 前 中 後でスキルセットを適用"]
    E -.->|"継続的改善"| A`;

const DIAGRAM_CONTENT_PROCESS_SPLIT = `flowchart TB
    subgraph CONTENT["コンテンツ 中身"]
        C1["議題そのもの"]
        C2["提案される解決策"]
        C3["最終的な意思決定の内容"]
    end
    subgraph PROCESS["プロセス 進め方"]
        P1["議論の順番と構造"]
        P2["発言機会の分配"]
        P3["対立の扱い方"]
        P4["合意形成の手法"]
    end
    TEAM["チーム 参加者"] -->|"専門家として責任を持つ"| CONTENT
    FAC["ファシリテーター"] -->|"専門家として責任を持つ"| PROCESS
    FAC -.->|"介入しない 中立"| CONTENT`;

const DIAGRAM_TUCKMAN_STAGES = `flowchart LR
    F["1 Forming 形成期"] --> S["2 Storming 混乱期"]
    S --> N["3 Norming 統一期"]
    N --> P["4 Performing 機能期"]
    P --> A["5 Adjourning 散会期"]
    S -.->|"新メンバー参加や大きな変化で逆戻り"| F`;

const DIAGRAM_PSYCH_SAFETY_OUTCOMES = `flowchart TB
    PS["心理的安全性が高い場"] --> Q1["質問できる"]
    PS --> Q2["懸念を言える"]
    PS --> Q3["ミスを認められる"]
    PS --> Q4["新しいアイデアを出せる"]
    Q1 --> OUT["学習 イノベーション 率直な意思決定"]
    Q2 --> OUT
    Q3 --> OUT
    Q4 --> OUT`;

const DIAGRAM_DIAMOND_OF_PARTICIPATION = `flowchart TB
    T["トピック提示"] --> D["Divergent Zone 発散ゾーン アイデアと視点を広げる"]
    D --> G["Groan Zone うめきゾーン 混乱と対立が最も高まる"]
    G --> C["Convergent Zone 収束ゾーン 選択肢を絞り込む"]
    C --> DP["Decision Point 意思決定"]
    DP --> CL["Closure 合意事項の実行"]`;

const DIAGRAM_CONFLICT_OUTCOMES = `flowchart LR
    CONF["対立の発生"] --> BAD["ファシリテーターが介入しない 避ける"]
    CONF --> GOOD["ファシリテーターがプロセスで受け止める"]
    BAD --> IMP["Impasse 行き詰まり"]
    GOOD --> WELL["Well-considered decision よく検討された意思決定"]`;

const DIAGRAM_REMOTE_FACILITATION_FLOW = `flowchart TB
    subgraph BEFORE["事前"]
        B1["少人数に分割設計"]
        B2["技術トラブルのPlan B"]
        B3["期待値 マナー の共有"]
    end
    subgraph DURING["実施中"]
        D1["ブレイクアウト活用"]
        D2["NOSTUESOで発言を分配"]
        D3["45分ごとに休憩"]
        D4["最初の5分で発言を促す"]
    end
    subgraph AFTER["事後"]
        A1["パラフレーズで理解を確認"]
        A2["心理的安全な作業合意を更新"]
    end
    BEFORE --> DURING --> AFTER`;

const DIAGRAM_EVENT_WORKFLOW = `flowchart LR
    subgraph PRE["Before 事前設計"]
        P1["目的とゴールの明確化"]
        P2["参加者と人数の設計"]
        P3["アジェンダとタイムボックス"]
        P4["ツールと場の準備"]
        P5["グラウンドルールの下書き"]
    end
    subgraph LIVE["During 実施"]
        L1["目的とグラウンドルールの共有"]
        L2["発散からうめきを経て収束へ誘導"]
        L3["中立性の維持"]
        L4["対立をプロセスで受け止める"]
        L5["時間管理"]
    end
    subgraph POST["After 事後"]
        A1["決定事項とアクションの確認"]
        A2["参加者からのフィードバック収集"]
        A3["自己の振り返り 何を改善するか"]
        A4["次回への申し送り"]
    end
    PRE --> LIVE --> POST
    POST -.->|"継続的改善"| PRE`;

const DIAGRAM_TOOLBOX_BY_PHASE = `flowchart TB
    subgraph TOOLBOX["ファシリテーション技法ツールボックス"]
        direction LR
        ORID["ORID 振り返り"]
        LS["Liberating Structures 発言の分配"]
        DIA["Diamond of Participation 意思決定"]
        GR["Ground Rules 対立予防"]
    end
    PHASE1["発散フェーズ"] --> LS
    PHASE1 --> ORID
    PHASE2["うめき 対立フェーズ"] --> GR
    PHASE2 --> DIA
    PHASE3["収束フェーズ"] --> DIA`;

const DIAGRAM_COACHING_STANCES = `flowchart TB
    subgraph STANCE["アジャイルコーチの4つのスタンス Adkins and Spayd Agile Coaching Institute"]
        FAC["Facilitating ファシリテーション プロセスを支援 中立"]
        TEACH["Teaching ティーチング 知識を教える"]
        MENT["Mentoring メンタリング 経験を伝える"]
        COACH["Coaching コーチング 本人の気づきを引き出す"]
    end
    FAC -->|"意思決定権 持たない"| N1["中立"]
    TEACH -->|"専門知識を提供"| N2["答えを教える"]
    MENT -->|"助言を提供"| N3["経験を共有"]
    COACH -->|"問いを投げる"| N4["本人に気づかせる"]`;
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
        <div class="brand-title">CAF 完全ガイド</div>
        <div class="brand-subtitle">初学者向け学習ガイド</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">はじめに</li>
      <li><a href="#about-this-guide" :class="{ active: activeId === 'about-this-guide' }" @click="closeSidebar"><Icon name="tabler:notebook" aria-hidden="true" />このガイドについて</a></li>
      <li><a href="#what-is-caf" :class="{ active: activeId === 'what-is-caf' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />1. CAFとは何か</a></li>
      <li><a href="#facilitation-definition" :class="{ active: activeId === 'facilitation-definition' }" @click="closeSidebar"><Icon name="tabler:quote" aria-hidden="true" />2. ファシリテーションの定義</a></li>
      <li><a href="#who-should-take-caf" :class="{ active: activeId === 'who-should-take-caf' }" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />3. 誰が学ぶべきか</a></li>

      <li class="nav-group-label">学習目標とマインドセット</li>
      <li><a href="#five-learning-objectives" :class="{ active: activeId === 'five-learning-objectives' }" @click="closeSidebar"><Icon name="tabler:target" aria-hidden="true" />4. 5つの学習目標</a></li>
      <li><a href="#neutrality-principle" :class="{ active: activeId === 'neutrality-principle' }" @click="closeSidebar"><Icon name="tabler:scale" aria-hidden="true" />5. 中立性の原則</a></li>

      <li class="nav-group-label">理論的基盤</li>
      <li><a href="#tuckman-model" :class="{ active: activeId === 'tuckman-model' }" @click="closeSidebar"><Icon name="tabler:stairs" aria-hidden="true" />6. Tuckmanの5段階</a></li>
      <li><a href="#psychological-safety" :class="{ active: activeId === 'psychological-safety' }" @click="closeSidebar"><Icon name="tabler:shield-check" aria-hidden="true" />7. 心理的安全性</a></li>
      <li><a href="#diamond-of-participation" :class="{ active: activeId === 'diamond-of-participation' }" @click="closeSidebar"><Icon name="tabler:diamond" aria-hidden="true" />8. Diamond of Participation</a></li>

      <li class="nav-group-label">実践スキル</li>
      <li><a href="#facilitating-through-conflict" :class="{ active: activeId === 'facilitating-through-conflict' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />9. 対立への対応</a></li>
      <li><a href="#remote-facilitation" :class="{ active: activeId === 'remote-facilitation' }" @click="closeSidebar"><Icon name="tabler:video" aria-hidden="true" />10. リモートファシリテーション</a></li>
      <li><a href="#before-during-after" :class="{ active: activeId === 'before-during-after' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />11. 前・最中・後の実務フロー</a></li>
      <li><a href="#facilitation-toolbox" :class="{ active: activeId === 'facilitation-toolbox' }" @click="closeSidebar"><Icon name="tabler:tools" aria-hidden="true" />12. 技法ツールボックス</a></li>

      <li class="nav-group-label">応用とまとめ</li>
      <li><a href="#facilitator-vs-adjacent-roles" :class="{ active: activeId === 'facilitator-vs-adjacent-roles' }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />13. 隣接ロールとの違い</a></li>
      <li><a href="#best-practices-summary" :class="{ active: activeId === 'best-practices-summary' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />14. ベストプラクティス総まとめ</a></li>
      <li><a href="#certification-path-resources" :class="{ active: activeId === 'certification-path-resources' }" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />15. 認定パスと関連リソース</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />16. 参考文献・出典一覧</a></li>
    </ul>
      </aside>

      <div
        v-if="sidebarOpen"
        class="sidebar-backdrop"
        aria-hidden="true"
        @click="closeSidebar"
      />

      <main class="main-content">
        <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance 公式ページ準拠の非公式学習ガイド</div>
      <h1>Certified Agile Facilitator(CAF)学習ガイド</h1>
      <p class="hero-lede">
        初学者向け ステップバイステップ解説 + ベストプラクティス集
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">5つ</div><div class="stat-label">公式学習目標の数</div></div>
        <div class="stat-card"><div class="stat-number">5段階</div><div class="stat-label">Tuckmanのグループ発達モデル</div></div>
        <div class="stat-card"><div class="stat-number">4つ</div><div class="stat-label">アジャイルコーチの基本スタンス</div></div>
        <div class="stat-card"><div class="stat-number">10選</div><div class="stat-label">リモートファシリテーションのヒント</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドはScrum Alliance公式のCAF学習教材ではなく、公開情報をもとに作成した非公式の学習補助資料です。公式のCAF学習目標PDFはサインインが必要なため未検証です。正式な認定取得にあたっては、必ず<a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>および認定トレーナーが提供する公式カリキュラムをご確認ください。</span>
      </div>
    </div>

    <!-- ===================== 0. About this guide ===================== -->
    <section id="about-this-guide">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:notebook" aria-hidden="true" />SECTION 01</div>
      <h2>このガイドについて</h2>

      <p>本ガイドは Scrum Alliance が提供する <strong>Certified Agile Facilitator(CAF)</strong> 認定コースの公式ページおよび公式リソースライブラリの記事、そしてファシリテーション分野で世界的に参照されている一次資料(IAF、Sam Kaner、Roger Schwarz、Bruce Tuckman、Amy Edmondson、Liberating Structures、Agile Coaching Institute 等)をもとに、初学者が体系的に学べるよう構成した非公式の学習補助資料です。各章末に「ベストプラクティス」と「ソース」を明記していますので、一次情報に当たりたい場合はリンク先を参照してください。</p>
    </section>

    <!-- ===================== 1. What is CAF ===================== -->
    <section id="what-is-caf">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 02</div>
      <h2>1. CAFとは何か(資格概要)</h2>

      <p><strong>Certified Agile Facilitator(CAF)</strong> は、Scrum Alliance が提供するファシリテーション専門の認定コースです。公式ページでは次のように紹介されています。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"Guide people through any type of interaction at work, fostering collaboration, effective communication, and dynamic problem-solving."<br>(職場のあらゆる種類の相互作用を通じて人々を導き、コラボレーション、効果的なコミュニケーション、ダイナミックな問題解決を促進する)</p>
      </div>

      <p>CAFは「会議の進め方」のようなテクニックだけを教えるコースではありません。公式サイトが強調しているのは、<strong>ファシリテーターとしてのマインドセット</strong>を身につけることです。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"Facilitation supports groups of people as they collaborate, create, and make decisions. The Certified Agile Facilitator course provides training for anyone interested in developing their facilitation mindset and knowledge while learning from experienced agile practitioners."</p>
      </div>

      <h3>1.1 コースの特徴(公式FAQより)</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>特徴</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>深いスキル探求</td><td>テクニックだけでなくファシリテーターのマインドセットまで踏み込む</td></tr>
            <tr><td>ライブ実践</td><td>クラス内で実際にファシリテーションを練習する機会がある</td></tr>
            <tr><td>認定トレーナー</td><td>Scrum Alliance承認のアジャイルトレーナーが指導</td></tr>
            <tr><td>グローバル会員資格</td><td>修了するとScrum Allianceのメンバーシップが付与される</td></tr>
            <tr><td>実務への接続</td><td>受講後、自分の実際のファシリテーション計画をどう改善するか検討する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>CAFを「メソッドのカタログ」として消費しようとしないこと。公式ページが繰り返し使っている単語は "mindset"(マインドセット)です。技法を覚える前に、まず「自分はプロセスの支援者であり、結果の当事者ではない」という立ち位置を内面化することが、学習効果を最大化します。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Certified Agile Facilitator(CAF) - Scrum Alliance 公式ページ</a></li>
        </ul>
      </div>

      <h3>1.2 名称に関する補足(重要)</h3>

      <p>Scrum AllianceのResource Library記事(後述)には、CAFの<strong>旧名称</strong>である <strong>Agile Coaching Skills - Certified Facilitator(ACS-CF)</strong>(Agile Coaching Essentials トラックの一部)への言及が残っています。ACS-CFはCAFの後継コースではなく、コース内容・学習目標・受講要件を維持したまま名称が改称されたものです(公式のコース検索でもCAFのコースは <code>ctyp=AcsCf</code> というコードで絞り込まれます)。CASP(Certified Agile Scaling Practitioner)が旧称・旧コース案内では "Certified Agile Skills - Scaling 1(CAS-S1)" と表記されているのと同様、認定ラインナップの名称は継続的に見直されています。受講を検討する際は、必ず公式ページで最新のコース名称とバッジ名を確認してください。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://resources.scrumalliance.org/article/facilitation-skills-important" target="_blank" rel="noopener">Why Facilitation Skills Are Important - Scrum Alliance Resource Library</a>(ACS-CFへの言及あり)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 2. Definition of facilitation ===================== -->
    <section id="facilitation-definition">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:quote" aria-hidden="true" />SECTION 03</div>
      <h2>2. ファシリテーションの定義</h2>

      <p>「ファシリテーション」という言葉は多義的に使われますが、本ガイドでは以下の2つの定義を軸にします。</p>

      <h3>2.1 Scrum Allianceの定義</h3>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"Facilitation supports groups of people as they collaborate, create, and make decisions."<br>(ファシリテーションとは、人々のグループが協働し、創造し、意思決定を行う過程を支援すること)</p>
      </div>

      <h3>2.2 Roger Schwarzの定義(学術的に最も引用される定義の一つ)</h3>

      <p>ファシリテーション研究の古典である Roger Schwarz "The Skilled Facilitator"(1994年初版)では、ファシリテーションを次のように定義しています。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"a process in which a person who is acceptable to all members of the group, substantively neutral and has no decision-making authority intervenes to help a group improve the way it identifies and solves problems and makes decisions, in order to increase the group's effectiveness"<br>(グループの全メンバーに受け入れられ、実質的に中立であり、意思決定権を持たない人物が、グループの効果性を高めるために、問題の特定・解決・意思決定の方法を改善する手助けをする介入プロセス)</p>
      </div>

      <p>この定義から、ファシリテーターの3条件が導かれます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SCHWARZ_CONDITIONS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Schwarz(1994)によるファシリテーターの3条件</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>自分が「意思決定に利害関係を持つ立場」(例:その会議の結果次第で自分の評価やプロジェクトの行方が変わる)にある場合、自分自身がファシリテーターを兼務することは避け、可能であれば別の人にファシリテーターを依頼しましょう。CAFが繰り返し強調する「中立性」は、単なる態度の問題ではなく、構造的な利益相反の回避でもあります。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Certified Agile Facilitator(CAF) - Scrum Alliance 公式ページ</a></li>
          <li>Schwarz, R.(1994). <em>The Skilled Facilitator</em>. Jossey-Bass. 全文プレビュー: <a href="https://digitalcommons.usu.edu/advance/257" target="_blank" rel="noopener">digitalcommons.usu.edu/advance/257</a></li>
          <li>White, N.(2005). "Online Group Facilitation Skills" in <em>Encyclopedia of Virtual Communities and Technologies</em>(Schwarzの定義の引用元の一つ)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 3. Who should take CAF ===================== -->
    <section id="who-should-take-caf">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 04</div>
      <h2>3. 誰がCAFを学ぶべきか</h2>

      <p>公式ページでは、CAFの対象者を次のように挙げています。</p>

      <ul>
        <li>職場でのより効果的な会話・会議・相互作用のために、実践的なファシリテーションスキルを身につけたい人</li>
        <li>スクラムマスター、プロダクトオーナー、スクラムチームメンバー</li>
        <li>チームを率いる立場の人</li>
        <li>プロフェッショナルファシリテーター</li>
        <li>現役/志望のアジャイルコーチ</li>
        <li>アジャイルコンサルタント</li>
        <li>アジャイルチームメンバー</li>
        <li>CSP-SM、CSP-PO、CSP-D(Certified Scrum Professional)保持者で、特にCertified Agile Coachへの道を検証したい人</li>
      </ul>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CAF_ROLES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">CAFが役立つロールと共通のゴール</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>スクラムマスターは「ファシリテーションはスクラムマスターの仕事の一部」と思われがちですが、公式リソース記事は「ファシリテーションはスクラムマスターに限らず、あらゆるアジャイルロールが磨くべきスキルである」と明言しています。プロダクトオーナーや開発者であっても、レビューやレトロスペクティブを主導する場面ではファシリテーションスキルが直接活きます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Certified Agile Facilitator(CAF) - Scrum Alliance 公式ページ</a></li>
          <li><a href="https://resources.scrumalliance.org/article/facilitation-skills-important" target="_blank" rel="noopener">Why Facilitation Skills Are Important</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 4. Five learning objectives ===================== -->
    <section id="five-learning-objectives">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target" aria-hidden="true" />SECTION 05</div>
      <h2>4. CAFの5つの学習目標を深掘りする</h2>

      <p>公式ページに掲載されている学習目標(Learning Objectives)は次の5つです。</p>

      <ol>
        <li>Discover what a facilitator is and what they do</li>
        <li>Practice the mindset of a neutral facilitator</li>
        <li>Learn how to facilitate teams through conflict</li>
        <li>Understand the needs of different teams</li>
        <li>Apply the skillset before, during, and after a facilitation event</li>
      </ol>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>詳細な公式学習目標PDF(<a href="https://drive.google.com/file/d/1sOGykvoYGYJIxtuV6WwHGUW8CRe6RUH0/view" target="_blank" rel="noopener">CAF Learning Objectives</a>)はGoogle Driveでホストされておりサインインが必要なため、本ガイド作成時点では内容を検証できませんでした。以下の解説は、公式ページ本文とScrum Alliance公式リソース記事、および一般的なファシリテーション理論に基づき、5つの学習目標それぞれを掘り下げたものです。受講前に必ずご自身でPDFにアクセスし、一次情報を確認してください。</p>
      </div>

      <p>以下、5つを順番に解説します。</p>

      <h3>4.1 学習目標1:ファシリテーターとは何か、何をするかを知る</h3>

      <p>Scrum Alliance公式記事「Why Facilitation Skills Are Important」は、ファシリテーターの働きを次の5つの行動で説明しています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>ファシリテーターの行動</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>プロセスの発見と定義を助ける</td><td>グループが「どう進めるか」を一緒に見つける</td></tr>
            <tr><td>プロセスを維持しつつ必要なら方向転換する</td><td>決めた進め方に固執しすぎない</td></tr>
            <tr><td>結果に対して中立を保つ</td><td>特定の結論に誘導しない</td></tr>
            <tr><td>全員の声が届く環境を作る</td><td>特に普段発言しない人の声を拾う</td></tr>
            <tr><td>脱線を本題に戻す</td><td>関係ない会話や横道を修正する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>「グループはコンテンツ(議題の中身)の専門家であり、ファシリテーターはプロセス(進め方)の専門家である」という役割分担を、会議の冒頭で参加者に明示的に伝えましょう。これにより、ファシリテーターが議論の内容に口を出さないことへの参加者の違和感を事前に解消できます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://resources.scrumalliance.org/article/facilitation-skills-important" target="_blank" rel="noopener">Why Facilitation Skills Are Important</a></li>
        </ul>
      </div>

      <h3>4.2 学習目標2:中立なファシリテーターのマインドセットを実践する</h3>

      <p>中立性は「意見を持たない」ことではなく、「結果への執着を手放し、プロセスの質に責任を持つ」という態度です。第5章で詳しく扱います。</p>

      <h3>4.3 学習目標3:対立を通してチームをファシリテートする方法を学ぶ</h3>

      <p>公式記事は次のように述べています。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"A facilitator also helps with conflict when it arises. It's normal and expected for disagreement to arise when a group of passionate people gets together on a topic. Without an effective facilitator, conflict may lead to an impasse, while a skilled facilitator knows how to support the group through disagreement and how to show the group to use conflict to come to a well-considered decision."</p>
      </div>

      <p>つまり、対立(コンフリクト)は異常事態ではなく、情熱を持った人々が集まれば自然に起こるものであり、ファシリテーターの仕事は対立を消すことではなく、対立を「行き詰まり(impasse)」ではなく「よく検討された意思決定」に変換することです。詳細は第9章。</p>

      <h3>4.4 学習目標4:異なるチームのニーズを理解する</h3>

      <p>チームは発達段階(第6章のTuckmanモデル参照)や文化、リモート/対面といった条件によって必要とする支援が異なります。CAFはこの「一律のテンプレートを当てはめない」姿勢を学習目標として明示しています。</p>

      <h3>4.5 学習目標5:イベントの前・最中・後にスキルセットを適用する</h3>

      <p>ファシリテーションは「その場の進行技術」ではなく、準備(Before)・実施(During)・振り返り(After)の3フェーズを持つ一連のプロセスです。詳細は第11章で実務フローとして解説します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FIVE_OBJECTIVES_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">CAF 5つの学習目標の学習ステップ</div>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Certified Agile Facilitator(CAF) - Scrum Alliance 公式ページ</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 5. Neutrality principle ===================== -->
    <section id="neutrality-principle">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:scale" aria-hidden="true" />SECTION 06</div>
      <h2>5. 中立性の原則:コンテンツとプロセスの分離</h2>

      <p>CAF学習目標の核である「中立性」を、もう一段深く構造化します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CONTENT_PROCESS_SPLIT" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">コンテンツとプロセスの役割分担</div>
      </div>

      <p>公式記事はこの分離の理由を次のように説明します。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"The group needs this neutral support because it allows them to focus on their expertise: the content of the meeting/event. The team is the expert on the content and the facilitator provides the process support."</p>
      </div>

      <h3>5.1 中立性がないとどうなるか</h3>

      <p>公式記事は、効果的なファシリテーションが「無い」場合に起こることも列挙しています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>ファシリテーション不在の兆候</th><th>結果</th></tr></thead>
          <tbody>
            <tr><td>合意されたプロセス・構造がない</td><td>進捗が停滞する</td></tr>
            <tr><td>声が大きい人だけが発言する</td><td>内向的な人の意見が失われる</td></tr>
            <tr><td>発言しない人が増える</td><td>心理的安全性が低いまま</td></tr>
            <tr><td>全員が発言する機会がない</td><td>合意への納得感(buy-in)が下がる</td></tr>
            <tr><td>コラボレーション・コミュニケーションが起きない</td><td>エンゲージメントが下がる</td></tr>
            <tr><td>目的の共通理解がない</td><td>チームがバラバラの方向を向く</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>ファシリテーター自身がその議題に強い意見を持っている場合、「今日は私はファシリテーター役に徹し、内容についての意見は別の機会(または別の参加者として)に述べます」と冒頭で宣言しましょう。役割の切り替えを明示することで、無意識の誘導(結果への肩入れ)を防げます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://resources.scrumalliance.org/article/facilitation-skills-important" target="_blank" rel="noopener">Why Facilitation Skills Are Important</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 6. Tuckman model ===================== -->
    <section id="tuckman-model">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:stairs" aria-hidden="true" />SECTION 07</div>
      <h2>6. グループ発達モデル:Tuckmanの5段階</h2>

      <p>CAFの学習目標4「異なるチームのニーズを理解する」を実践するための代表的な理論が、心理学者 <strong>Bruce Tuckman</strong> が1965年に発表したグループ発達モデルです(1977年にMary Ann Jensenとの共著で "Adjourning" が追加され5段階に)。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TUCKMAN_STAGES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Tuckmanのグループ発達5段階モデル</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>段階</th><th>特徴</th><th>ファシリテーターの役割</th></tr></thead>
          <tbody>
            <tr><td>Forming(形成期)</td><td>メンバーは様子見。対立を避け、リーダーに依存する</td><td>明確な目的・構造を提示し、心理的な足場を作る</td></tr>
            <tr><td>Storming(混乱期)</td><td>意見の衝突、リーダーシップへの疑問が表面化</td><td>対立を安全に表出させ、プロセスで受け止める(第9章)</td></tr>
            <tr><td>Norming(統一期)</td><td>対立が解消され、協力関係と規範が生まれる</td><td>チームが自ら決めた作業合意(Working Agreement)を尊重する</td></tr>
            <tr><td>Performing(機能期)</td><td>高い自律性で成果を出す</td><td>介入を最小化し、必要な時だけ支援する</td></tr>
            <tr><td>Adjourning(散会期)</td><td>チーム解散・目的達成後の区切り</td><td>振り返りと功績の承認の場を作る</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>チームが「Storming」段階にいるのに、ファシリテーターが「Performing」段階向けの軽いファシリテーション(口出しを最小限にするなど)をしてしまうと、対立が未処理のまま放置され、チームが同じ問題を繰り返します。逆に「Performing」段階のチームに「Forming」段階向けの過度に構造化されたプロセスを持ち込むと、チームの自律性を阻害し不満を招きます。ファシリテーションの手法は、今チームがどの段階にいるかに合わせて調整する必要があります。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>Tuckman, B. W.(1965). "Developmental sequence in small groups." <em>Psychological Bulletin</em>, 63(6), 384-399.</li>
          <li>Tuckman, B. W., &amp; Jensen, M. A. C.(1977). "Stages of small-group development revisited." <em>Group &amp; Organization Studies</em>, 2(4), 419-427.</li>
          <li>概説: <a href="https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development" target="_blank" rel="noopener">Tuckman's stages of group development - Wikipedia</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 7. Psychological safety ===================== -->
    <section id="psychological-safety">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:shield-check" aria-hidden="true" />SECTION 08</div>
      <h2>7. 心理的安全性:ファシリテーションの土台</h2>

      <p>CAFの「対立を通してチームを導く」「異なるチームのニーズを理解する」という学習目標を支える最重要概念が <strong>心理的安全性(Psychological Safety)</strong> です。ハーバード・ビジネス・スクール教授 Amy C. Edmondson が1999年の論文で提唱した概念で、次のように定義されます。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>"a shared belief that the team is safe for interpersonal risk taking"<br>(チームが対人リスクを取っても安全だという、チーム内で共有された信念)</p>
      </div>

      <p>Edmondsonは、心理的安全性は「仲が良いこと(group cohesiveness)」とは異なり、むしろ厳しいフィードバックや率直な意見対立を可能にするものだと強調しています(心理的安全性が高いチームほど、ミスの「報告」が多く見える、というよく知られた逆説的な発見もこの研究に基づきます)。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_PSYCH_SAFETY_OUTCOMES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">心理的安全性が生み出す行動と成果</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>心理的安全性は「一度作れば終わり」の状態ではなく、ファシリテーターが毎回のセッションで再構築する必要がある一時的な状態です。具体的な手法として、Scrum Alliance公式記事は「参加者に発言者の言葉をパラフレーズ(言い換えて反復)させる」ことを提案しています。これにより、発言が正しく届いたことを話し手が確認でき、聞き手側も注意深く聞く姿勢が強化されます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>Edmondson, A. C.(1999). "Psychological Safety and Learning Behavior in Work Teams." <em>Administrative Science Quarterly</em>, 44(2), 350-383.</li>
          <li><a href="https://www.hbs.edu/faculty/Pages/profile.aspx?facId=6451" target="_blank" rel="noopener">Amy C. Edmondson - Harvard Business School 教員ページ</a></li>
          <li><a href="https://resources.scrumalliance.org/article/10-tips-for-hosting-fun-effective-virtual-meetings" target="_blank" rel="noopener">10 Tips for Hosting Fun, Effective Virtual Meetings - Scrum Alliance</a>(パラフレーズ手法の出典)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 8. Diamond of Participation ===================== -->
    <section id="diamond-of-participation">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:diamond" aria-hidden="true" />SECTION 09</div>
      <h2>8. 参加型意思決定モデル:Diamond of Participation</h2>

      <p>ファシリテーションの現場で頻出する「話し合いが煮詰まって進まない」状態を理論化したのが、Sam Kaner らによる <strong>Facilitator's Guide to Participatory Decision-Making</strong>(初版1996年、Community At Work発)の中核モデル、通称 <strong>Diamond of Participation(参加のダイヤモンド)</strong> です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DIAMOND_OF_PARTICIPATION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Diamond of Participationの流れ</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>ゾーン</th><th>何が起きるか</th><th>ファシリテーターがすべきこと</th></tr></thead>
          <tbody>
            <tr><td>Divergent Zone(発散)</td><td>自由な発言、多様な視点、ブレインストーミング</td><td>できるだけ多くの視点を歓迎し、早期の評価・却下を止める</td></tr>
            <tr><td>Groan Zone(うめき)</td><td>情報過多、混乱、意見対立が最高潮になる(これは意思決定プロセスにおける一局面であり、チーム発達段階を示すTuckmanの"Storming"とは別のモデル。時期が重なることはあるが同一視しない)</td><td>ここで諦めて元の「無難な結論」に戻らせない。むしろこのゾーンを通過することが質の高い合意への近道だと伝える</td></tr>
            <tr><td>Convergent Zone(収束)</td><td>選択肢の評価・整理・絞り込み</td><td>基準を明確にし、比較を助ける</td></tr>
          </tbody>
        </table>
      </div>

      <p>「Groan Zone」を安全に通過するための実務ツールが <strong>Gradients of Agreement(合意の勾配)</strong> スケールです(Sam Kaner, Duane Berger, Community At Work, 1987年開発)。賛成/反対の二択ではなく、段階的な合意度を可視化する投票ツールです。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>合意の勾配(例:5〜7段階)</th><th>意味</th></tr></thead>
          <tbody>
            <tr><td>全面的な支持</td><td>積極的に推進したい</td></tr>
            <tr><td>合意できる</td><td>賛成する</td></tr>
            <tr><td>懸念はあるが支持する</td><td>一部気になるが反対はしない</td></tr>
            <tr><td>保留・中立</td><td>どちらとも言えない</td></tr>
            <tr><td>支持できないが、従う</td><td>反対だが決定には従う</td></tr>
            <tr><td>拒否権を行使する</td><td>この提案には賛成できない、進めさせない</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>Groan Zone(うめきゾーン)は「ファシリテーションが失敗している兆候」ではなく、「質の高い合意に向かうために通過が必要な正常なプロセス」です。チームがここで沈黙したり苛立ったりしても、ファシリテーターが焦って早期に多数決へ持ち込むと、表面的な合意(false consensus)に終わり、後で同じ対立が再燃します。Gradients of Agreementのようなツールで「どこにギャップがあるか」を可視化し、うめきゾーンを意図的に通過させましょう。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>Kaner, S., Lind, L., Toldi, C., Fisk, S., &amp; Berger, D. <em>Facilitator's Guide to Participatory Decision-Making</em>(3rd ed.). Jossey-Bass/Wiley.</li>
          <li>書評(モデルの図解あり): <a href="https://www.infoq.com/articles/facilitators-guide-book-review/" target="_blank" rel="noopener">Book Review: Facilitator's Guide to Participatory Decision Making - InfoQ</a></li>
          <li>Gradients of Agreementの解説: <a href="https://en.wikipedia.org/wiki/Gradients_of_agreement_scale" target="_blank" rel="noopener">Gradients of agreement scale - Wikipedia</a>、<a href="https://www.canr.msu.edu/news/gradients_of_agreement_can_help_move_groups_forward" target="_blank" rel="noopener">Michigan State University Extension</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 9. Facilitating through conflict ===================== -->
    <section id="facilitating-through-conflict">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 10</div>
      <h2>9. 対立(コンフリクト)を通したファシリテーション</h2>

      <p>CAFの学習目標3に直接対応する章です。「対立を消す」のではなく「対立を意思決定の材料に変える」ための考え方を整理します。</p>

      <h3>9.1 対立を「行き詰まり」で終わらせないための基本姿勢</h3>

      <p>公式記事の主張を実務的な原則に翻訳すると以下のようになります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CONFLICT_OUTCOMES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">対立への介入の有無が結果を分ける</div>
      </div>

      <h3>9.2 対立を扱うための具体的な足場(Roger Schwarzのグラウンドルール的アプローチ)</h3>

      <p>facilitation実務でよく使われるグラウンドルール(Ground Rules)の考え方は、対立時にこそ効果を発揮します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>グラウンドルール</th><th>対立時の効果</th></tr></thead>
          <tbody>
            <tr><td>具体例を使って話す</td><td>抽象的な人格攻撃ではなく、事実ベースの議論に戻せる</td></tr>
            <tr><td>重要な言葉の意味をすり合わせる</td><td>「品質」「完了」など、実は定義がズレている対立を解消できる</td></tr>
            <tr><td>関連する情報をすべて共有する</td><td>隠れた前提や情報格差による誤解を防ぐ</td></tr>
            <tr><td>推論の道筋を説明する</td><td>「なぜそう思うか」を可視化し、批判ではなく理解を促す</td></tr>
            <tr><td>立場ではなく利害・関心に焦点を当てる</td><td>「Aがいい/Bがいい」ではなく「なぜAがいいのか」を掘り下げ、共通の関心を見つける</td></tr>
            <tr><td>次のステップを一緒に設計する</td><td>対立の解消を「勝ち負け」ではなく「共同作業」にする</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>グラウンドルールは対立が起きてから提示するのではなく、セッションの冒頭で「もし意見が割れたら、私たちはこのルールで話し合います」と事前に合意しておきましょう。対立の渦中で新しいルールを持ち出すと、特定の立場を有利にするための恣意的な介入だと受け取られるリスクがあります。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>公式記事の対立に関する記述: <a href="https://resources.scrumalliance.org/article/facilitation-skills-important" target="_blank" rel="noopener">Why Facilitation Skills Are Important</a></li>
          <li>グラウンドルールの一覧: Schwarz, R.(1994). <em>The Skilled Facilitator</em>. Jossey-Bass.(要約: <a href="https://aese.psu.edu/research/centers/cecd/engagement-toolbox/facilitation/facilitation-tools/tools-and-strategies" target="_blank" rel="noopener">Penn State Extension - Facilitation Tools and Strategies</a>)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Remote facilitation ===================== -->
    <section id="remote-facilitation">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:video" aria-hidden="true" />SECTION 11</div>
      <h2>10. リモート/バーチャルファシリテーション</h2>

      <p>Scrum Alliance公式リソース記事「10 Tips for Hosting Fun, Effective Virtual Meetings」(Ram Srinivasan, Organizational Effectiveness Coach)は、CAFの学習目標4(チームごとのニーズを理解する)をリモート環境に適用した実践的な10のヒントを提示しています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>ヒント</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>プロ流にピボットする</td><td>対面で効果的な手法を分解し、Zoom等の投票・ブレイクアウト機能で再構築する</td></tr>
            <tr><td>2</td><td>進行役を分業する</td><td>「進行」と「技術サポート/チャット監視」の2人体制にする</td></tr>
            <tr><td>3</td><td>会議を小さくする</td><td>バーチャル会議は12人が限界。初心者はまず6人単位から</td></tr>
            <tr><td>4</td><td>スライドショーを避ける</td><td>一方的な説明よりブレイクアウトルームなど参加型手法を使う</td></tr>
            <tr><td>5</td><td>不快感に注意する</td><td>45分ごとに10〜15分休憩。長引く議論には「ローマ投票」で継続可否を確認</td></tr>
            <tr><td>6</td><td>練習と準備をする</td><td>「ぶっつけ本番」はNG。通信障害等のプランBを用意する</td></tr>
            <tr><td>7</td><td>期待値を事前に伝える</td><td>静かな場所からの参加を約束事にし、破った場合はミュートすると事前告知する</td></tr>
            <tr><td>8</td><td>包摂的な文化を作る</td><td><strong>NOSTUESOルール</strong>(全員が1回発言するまで誰も2回目の発言をしない)を使う</td></tr>
            <tr><td>9</td><td>早い段階で全員を巻き込む</td><td>最初の5分で発言した人はその後も発言しやすくなる。Mentimeter/Kahoot!等を活用</td></tr>
            <tr><td>10</td><td>心理的に安全な作業合意を推奨する</td><td>参加者に発言をパラフレーズ(言い換え)させ、心理的安全性を育てる</td></tr>
          </tbody>
        </table>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_REMOTE_FACILITATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">リモートファシリテーションの事前・実施中・事後</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス(NOSTUESOルールの詳細)</div>
        <p>誰かが発言した後、次に自然発生的に発言者が現れない場合は、発言者自身に「次に話してほしい人を指名してもらう」運用にします。ただし各参加者には「パスする権利」も保証します。この2つのルールの組み合わせにより、発言力の偏りを構造的に是正しつつ、強制的な発言を避けられます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://resources.scrumalliance.org/article/10-tips-for-hosting-fun-effective-virtual-meetings" target="_blank" rel="noopener">10 Tips for Hosting Fun, Effective Virtual Meetings - Scrum Alliance Resource Library</a>(著者: Ram Srinivasan / Innovagility.com、寄稿: Gene Gendel)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 11. Before / during / after workflow ===================== -->
    <section id="before-during-after">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 12</div>
      <h2>11. イベントの前・最中・後:ファシリテーターの実務フロー</h2>

      <p>学習目標5「Apply the skillset before, during, and after a facilitation event」を、実務チェックリストの形に落とし込みます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EVENT_WORKFLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">ファシリテーションイベントの前・最中・後のフロー</div>
      </div>

      <h3>11.1 各フェーズのチェックリスト</h3>

      <h4>Before(事前)</h4>
      <ul>
        <li>このセッションのゴールは何か、参加者と事前に共有できているか</li>
        <li>参加人数はゴールに対して適切か(多すぎないか)</li>
        <li>アジェンダに発散・収束それぞれの時間が確保されているか</li>
        <li>グラウンドルールを事前に用意し、必要なら参加者と合意したか</li>
        <li>リモートの場合、技術トラブル時のプランBがあるか</li>
      </ul>

      <h4>During(実施中)</h4>
      <ul>
        <li>冒頭でゴール・進め方・グラウンドルールを共有したか</li>
        <li>自分がコンテンツに口を出しそうになっていないか、常に自己チェックしているか</li>
        <li>発言が偏っていないか(NOSTUESOなどで分配できているか)</li>
        <li>対立が起きたとき、感情ではなく事実・利害に焦点を戻せているか</li>
        <li>タイムボックスを守りつつ、必要な議論の深さを確保できているか</li>
      </ul>

      <h4>After(事後)</h4>
      <ul>
        <li>決定事項とネクストアクションが全員に明確か</li>
        <li>参加者に率直なフィードバックを求めたか</li>
        <li>自分自身のファシリテーションの何が良く、何を改善すべきか振り返ったか</li>
        <li>次回のセッション設計にその学びを反映する仕組みがあるか</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>CAFの公式FAQは「受講後、実際のファシリテーション計画をどう改善するか判断する機会がある」と述べています。これは、ファシリテーションが座学で完結するスキルではなく、実際のセッションでの実践と振り返りのサイクルを回すことで熟達するスキルであることを示しています。1回のセッションごとに簡単な自己レビュー(うまくいったこと1つ、次に変えること1つ)を記録する習慣が効果的です。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Certified Agile Facilitator(CAF) - Scrum Alliance 公式ページ</a>(FAQ: "Will I get a chance to practice facilitation?")</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 12. Facilitation technique toolbox ===================== -->
    <section id="facilitation-toolbox">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:tools" aria-hidden="true" />SECTION 13</div>
      <h2>12. ファシリテーション技法ツールボックス</h2>

      <p>CAFはマインドセットを重視する一方、実際のセッションを設計するには具体的な「技法」も必要です。世界的に広く使われている代表的な技法を比較します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>開発者/出典</th><th>何に使うか</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>ORID(Focused Conversation)</td><td>Institute of Cultural Affairs(ICA)Technology of Participation</td><td>振り返り、レトロスペクティブ、経験の意味づけ</td><td>Objective(事実)からReflective(感情反応)、Interpretive(解釈・意味)、Decisional(次の行動)の4段階で問いを設計する</td></tr>
            <tr><td>Liberating Structures</td><td>Henri Lipmanowicz &amp; Keith McCandless</td><td>大人数の会議、アイデア創出、権力の偏りの是正</td><td>43種類の「マイクロストラクチャー」(うち33種類が原典のレパートリー、残りは後年の追加。例: 1-2-4-All、TRIZ等)で、少数の声だけが支配する会議を構造的に変える。最新の一覧は公式カタログで確認する</td></tr>
            <tr><td>Diamond of Participation / Gradients of Agreement</td><td>Sam Kaner ほか</td><td>意思決定、合意形成</td><td>第8章参照。発散からうめきを経て収束するプロセスを可視化する</td></tr>
            <tr><td>Ground Rules(グラウンドルール)</td><td>Roger Schwarz</td><td>対立予防、議論の質向上</td><td>第9章参照。具体例で話す、利害に焦点を当てる等</td></tr>
            <tr><td>NOSTUESO</td><td>Scrum Alliance(記事内で紹介)</td><td>発言機会の公平な分配</td><td>第10章参照。全員が1回話すまで誰も2回目を話さない</td></tr>
          </tbody>
        </table>
      </div>

      <h3>12.1 Liberating Structuresの10原則</h3>

      <p>Liberating Structuresの公式サイトは、手法を貫く10の原則を掲げています。</p>

      <ol>
        <li>Include and unleash everyone.(全員を含め、解き放つ)</li>
        <li>Practice deep respect for people and local solutions.(人と現場の解決策への深い敬意)</li>
        <li>Never start without a clear purpose.(明確な目的なしに始めない)</li>
        <li>Build trust as you go.(進めながら信頼を築く)</li>
        <li>Learn by failing forward.(前向きな失敗から学ぶ)</li>
        <li>Practice self-discovery within a group.(グループの中での自己発見を実践する)</li>
        <li>Amplify freedom and responsibility.(自由と責任を増幅する)</li>
        <li>Emphasize possibilities: believe before you see.(可能性を強調する:見る前に信じる)</li>
        <li>Invite creative destruction to make space for innovation.(創造的破壊を招き入れる)</li>
        <li>Engage in seriously playful curiosity.(真剣に遊び心のある好奇心を持つ)</li>
      </ol>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TOOLBOX_BY_PHASE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">フェーズ別のファシリテーション技法ツールボックス</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>技法は「知っている数」で評価されるものではありません。CAFの学習目標が「マインドセット」を先に置いているのはこのためです。1つの技法(例えばORID)を深く使いこなせる方が、10個の技法を表面的に知っているより実務では役立ちます。まずは自分のチームでよく使う場面(レトロスペクティブなら ORID、大人数会議なら Liberating Structures)に1つずつ技法を定着させましょう。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>ORID: Stanfield, R. B.(2000). <em>The Art of Focused Conversation</em>. Institute of Cultural Affairs. 概説: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6518626/" target="_blank" rel="noopener">PMC論文 - Utilizing the focused conversation method</a></li>
          <li>Liberating Structures: <a href="https://www.liberatingstructures.com/" target="_blank" rel="noopener">公式サイト liberatingstructures.com</a>、Lipmanowicz, H., &amp; McCandless, K. <em>The Surprising Power of Liberating Structures</em>.</li>
          <li>国際的なファシリテーター専門団体: <a href="https://www.iaf-world.org/" target="_blank" rel="noopener">International Association of Facilitators(IAF)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 13. Facilitator vs adjacent roles ===================== -->
    <section id="facilitator-vs-adjacent-roles">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 14</div>
      <h2>13. アジャイルにおけるファシリテーター:隣接ロールとの違い</h2>

      <p>CAFの対象者には「アジャイルコーチ」も含まれますが、ファシリテーターとアジャイルコーチは同じではありません。Agile Coaching Institute共同創設者の Lyssa Adkins と Michael Spayd は、優れたアジャイルコーチに必要な能力を <strong>4つのコンピテンシー(Facilitating/Teaching/Mentoring/Coaching)</strong> として整理しています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_COACHING_STANCES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">アジャイルコーチの4つのスタンス</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>スタンス</th><th>目的</th><th>ファシリテーションとの違い</th></tr></thead>
          <tbody>
            <tr><td>Facilitating</td><td>グループがプロセスを通じて自ら結論に達するのを助ける</td><td>中立・無権限が絶対条件(第2章の定義そのもの)</td></tr>
            <tr><td>Teaching</td><td>知識・フレームワークを教える</td><td>教える内容について「答え」を持っている点が中立性と相反する</td></tr>
            <tr><td>Mentoring</td><td>自分の経験に基づき助言する</td><td>自分の経験を基準に語るため、中立ではない</td></tr>
            <tr><td>Coaching(プロフェッショナルコーチング)</td><td>相手自身の気づき・答えを引き出す</td><td>中立に近いが、対象は個人であり「グループのプロセス」ではなく「個人の思考」に向く</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>1つのセッションの中で無自覚にスタンスを切り替えてしまうと、参加者は混乱します(例:ファシリテーターのはずが急に「私はこう思う」とTeachingモードに入る)。スタンスを切り替える必要がある場合は、「ここからは少し私の意見も共有していいですか?(Teachingモードに入ります)」のように明示的に宣言し、終わったら再び中立なFacilitatingモードに戻ることを伝えましょう。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/agile_techniques/interviews/72" target="_blank" rel="noopener">Lyssa Adkins and Michael Spayd on the Role of the Agile Coach - InfoQ</a></li>
          <li>Adkins, L.(2010). <em>Coaching Agile Teams</em>. Addison-Wesley.</li>
          <li><a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Certified Agile Facilitator(CAF) - Scrum Alliance 公式ページ</a>("Current and aspiring agile coaches" が対象者に含まれる旨の記載)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 14. Best practices summary ===================== -->
    <section id="best-practices-summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 15</div>
      <h2>14. ベストプラクティス総まとめ表</h2>

      <div class="table-wrap">
        <table>
          <thead><tr><th>章</th><th>テーマ</th><th>最重要ベストプラクティス</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>CAF概要</td><td>技法より先に「マインドセット」を内面化する</td></tr>
            <tr><td>2</td><td>定義</td><td>利害関係がある議題では自分がファシリテーターを兼務しない</td></tr>
            <tr><td>3</td><td>対象者</td><td>ファシリテーションはスクラムマスター専用スキルではないと認識する</td></tr>
            <tr><td>4</td><td>5つの学習目標</td><td>5つを順番の学習ステップとして捉え、1から5へ進む</td></tr>
            <tr><td>5</td><td>中立性</td><td>コンテンツとプロセスの役割分担を冒頭で明示する</td></tr>
            <tr><td>6</td><td>Tuckmanモデル</td><td>チームの発達段階に応じてファシリテーションの強度を調整する</td></tr>
            <tr><td>7</td><td>心理的安全性</td><td>パラフレーズ(言い換え)を使い、毎回のセッションで安全性を再構築する</td></tr>
            <tr><td>8</td><td>Diamond of Participation</td><td>うめきゾーンを失敗と誤解せず、意図的に通過させる</td></tr>
            <tr><td>9</td><td>対立への対応</td><td>グラウンドルールは対立前に合意しておく</td></tr>
            <tr><td>10</td><td>リモートファシリテーション</td><td>NOSTUESOルールで発言機会を構造的に分配する</td></tr>
            <tr><td>11</td><td>前・最中・後フロー</td><td>セッションごとに簡単な自己振り返りを記録する</td></tr>
            <tr><td>12</td><td>技法ツールボックス</td><td>技法は広く浅くより、1つを深く定着させる</td></tr>
            <tr><td>13</td><td>隣接ロールとの違い</td><td>スタンスの切り替えは参加者に明示的に宣言する</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 15. Certification path and resources ===================== -->
    <section id="certification-path-resources">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 16</div>
      <h2>15. 認定パスと関連リソース</h2>

      <ul>
        <li>公式コース検索: <a href="https://www.scrumalliance.org/courses-events/search?ctyp=AcsCf" target="_blank" rel="noopener">Find a course - Scrum Alliance</a></li>
        <li>公式学習目標PDF(要サインイン): <a href="https://drive.google.com/file/d/1sOGykvoYGYJIxtuV6WwHGUW8CRe6RUH0/view" target="_blank" rel="noopener">CAF Learning Objectives</a></li>
        <li>Scrum Education Units(SEU)制度の説明: <a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">Scrum Education Units - Scrum Alliance</a></li>
        <li>旧名称: Agile Coaching Skills - Certified Facilitator(ACS-CF)(Agile Coaching Essentials トラックの一部。コース内容・学習目標・要件はCAFに引き継がれている)</li>
        <li>関連リソース記事(公式ページから直接リンクされているもの):
          <ul>
            <li><a href="https://resources.scrumalliance.org/article/facilitation-skills-important" target="_blank" rel="noopener">Why Facilitation Skills Are Important</a></li>
            <li><a href="https://resources.scrumalliance.org/video/remote-facilitation" target="_blank" rel="noopener">Remote Facilitation(動画)</a></li>
            <li><a href="https://resources.scrumalliance.org/webinar/webinar-stop-facilitating-worlds-boring-meetings" target="_blank" rel="noopener">Webinar: Stop Facilitating the World's Most Boring Meetings</a></li>
            <li><a href="https://resources.scrumalliance.org/article/10-tips-for-hosting-fun-effective-virtual-meetings" target="_blank" rel="noopener">10 Tips for Hosting Fun, Effective Virtual Meetings</a></li>
          </ul>
        </li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>CAF受講前に、上記の無料公開記事・動画に一通り目を通しておくと、コース内で扱われる「マインドセット」の議論に、より深く参加できます。特に「Why Facilitation Skills Are Important」はCAFの思想的な土台をそのまま解説しているため、必読です。</p>
      </div>
    </section>

    <!-- ===================== 16. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 17</div>
      <h2>16. 参考文献・出典一覧</h2>

      <div class="ref-group">
        <h3>Scrum Alliance 公式ソース</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Certified Agile Facilitator(CAF) - Scrum Alliance 公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-facilitator</a></li>
          <li><span class="ref-name">CAF Learning Objectives(PDF、要サインイン)</span><a class="ref-url" href="https://drive.google.com/file/d/1sOGykvoYGYJIxtuV6WwHGUW8CRe6RUH0/view" target="_blank" rel="noopener">https://drive.google.com/file/d/1sOGykvoYGYJIxtuV6WwHGUW8CRe6RUH0/view</a></li>
          <li><span class="ref-name">Why Facilitation Skills Are Important</span><a class="ref-url" href="https://resources.scrumalliance.org/article/facilitation-skills-important" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/facilitation-skills-important</a></li>
          <li><span class="ref-name">10 Tips for Hosting Fun, Effective Virtual Meetings</span><a class="ref-url" href="https://resources.scrumalliance.org/article/10-tips-for-hosting-fun-effective-virtual-meetings" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/10-tips-for-hosting-fun-effective-virtual-meetings</a></li>
          <li><span class="ref-name">Remote Facilitation(動画)</span><a class="ref-url" href="https://resources.scrumalliance.org/video/remote-facilitation" target="_blank" rel="noopener">https://resources.scrumalliance.org/video/remote-facilitation</a></li>
          <li><span class="ref-name">Webinar: Stop Facilitating the World's Most Boring Meetings</span><a class="ref-url" href="https://resources.scrumalliance.org/webinar/webinar-stop-facilitating-worlds-boring-meetings" target="_blank" rel="noopener">https://resources.scrumalliance.org/webinar/webinar-stop-facilitating-worlds-boring-meetings</a></li>
          <li><span class="ref-name">Scrum Education Units(SEU)</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>学術・専門文献</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Schwarz, R.(1994). The Skilled Facilitator: A Comprehensive Resource for Consultants, Facilitators, Managers, Trainers, and Coaches. Jossey-Bass.(全文プレビュー)</span><a class="ref-url" href="https://digitalcommons.usu.edu/advance/257" target="_blank" rel="noopener">https://digitalcommons.usu.edu/advance/257</a></li>
          <li><span class="ref-name">Tuckman, B. W.(1965). "Developmental sequence in small groups." Psychological Bulletin, 63(6), 384-399.</span></li>
          <li><span class="ref-name">Tuckman, B. W., &amp; Jensen, M. A. C.(1977). "Stages of small-group development revisited." Group &amp; Organization Studies, 2(4), 419-427.</span></li>
          <li><span class="ref-name">Edmondson, A. C.(1999). "Psychological Safety and Learning Behavior in Work Teams." Administrative Science Quarterly, 44(2), 350-383.</span></li>
          <li><span class="ref-name">Kaner, S., Lind, L., Toldi, C., Fisk, S., &amp; Berger, D. Facilitator's Guide to Participatory Decision-Making(3rd ed.). Jossey-Bass/Wiley.</span></li>
          <li><span class="ref-name">Lipmanowicz, H., &amp; McCandless, K. The Surprising Power of Liberating Structures: Simple Rules to Unleash a Culture of Innovation.</span></li>
          <li><span class="ref-name">Stanfield, R. B.(2000). The Art of Focused Conversation: 100 Ways to Access Group Wisdom in the Workplace. Institute of Cultural Affairs.</span></li>
          <li><span class="ref-name">Adkins, L.(2010). Coaching Agile Teams: A Companion for ScrumMasters, Agile Coaches, and Project Managers in Transition. Addison-Wesley.</span></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>専門機関・団体</h3>
        <ul class="ref-list">
          <li><span class="ref-name">International Association of Facilitators(IAF) - ファシリテーターの国際的な専門団体。Certified Professional Facilitator(CPF)認定制度を提供・運営している。</span><a class="ref-url" href="https://www.iaf-world.org/" target="_blank" rel="noopener">https://www.iaf-world.org/</a></li>
          <li><span class="ref-name">Liberating Structures 公式サイト</span><a class="ref-url" href="https://www.liberatingstructures.com/" target="_blank" rel="noopener">https://www.liberatingstructures.com/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>二次的な解説記事(一次資料の裏付けとして)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Book Review: Facilitator's Guide to Participatory Decision Making - InfoQ</span><a class="ref-url" href="https://www.infoq.com/articles/facilitators-guide-book-review/" target="_blank" rel="noopener">https://www.infoq.com/articles/facilitators-guide-book-review/</a></li>
          <li><span class="ref-name">Gradients of agreement scale - Wikipedia</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Gradients_of_agreement_scale" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Gradients_of_agreement_scale</a></li>
          <li><span class="ref-name">Tuckman's stages of group development - Wikipedia</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development</a></li>
          <li><span class="ref-name">Lyssa Adkins and Michael Spayd on the Role of the Agile Coach - InfoQ</span><a class="ref-url" href="https://www.infoq.com/agile_techniques/interviews/72" target="_blank" rel="noopener">https://www.infoq.com/agile_techniques/interviews/72</a></li>
          <li><span class="ref-name">Utilizing the focused conversation method in qualitative public health research - PMC</span><a class="ref-url" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6518626/" target="_blank" rel="noopener">https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6518626/</a></li>
        </ul>
      </div>
    </section>

    <footer>
      <p>Certified Agile Facilitator、CAF、Scrum Alliance は Scrum Alliance, Inc. の商標です。本ページは Scrum Alliance による公式資料ではなく、公開情報をもとに作成した非公式の学習補助資料です。最新かつ正確な情報は必ず <a href="https://www.scrumalliance.org/get-certified/certified-agile-facilitator" target="_blank" rel="noopener">Scrum Alliance 公式サイト</a> をご確認ください。</p>
    </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>

.layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height));
  background: var(--color-paper);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #fff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.sidebar-backdrop {
  display: none;
}

.sidebar {
  position: sticky;
  top: var(--global-nav-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--global-nav-height));
  overflow-y: auto;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-border);
  padding: 32px 24px 40px;
  flex-shrink: 0;
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
  font-size: 16px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
}
.brand-text .brand-subtitle {
  font-size: 11px;
  color: var(--color-ink-faint);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sidebar-nav { list-style: none; margin: 0; padding: 0; }
.sidebar-nav li { margin-bottom: 4px; }
.sidebar-nav .nav-group-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-ink-faint);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 20px 0 6px;
  padding: 0 8px;
}
.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  color: var(--color-ink-soft);
  font-size: 13px;
  line-height: 1.4;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.sidebar-nav a:hover {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
}
.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.main-content {
  flex: 1;
  min-width: 0;
  padding: 48px 48px 80px;
  max-width: 100%;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--color-border);
}
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.badge-gold { background: var(--color-gold-tint); color: var(--color-gold); border: 1px solid #E8D3B0; }
.badge-indigo { background: var(--color-indigo-tint); color: var(--color-indigo); border: 1px solid #C7D1EA; }
.badge-forest { background: var(--color-forest-tint); color: var(--color-forest); border: 1px solid #B6DAD8; }

.hero h1 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-indigo-dark);
  margin: 0 0 16px;
}

.hero .lead {
  font-size: 17px;
  color: var(--color-ink-soft);
  line-height: 1.7;
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

section {
  margin-bottom: 56px;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-indigo-dark);
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--color-border);
}

h3 {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-indigo);
  margin: 28px 0 12px;
}

h4 {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink);
  margin: 20px 0 8px;
}

p { margin: 0 0 16px; }

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
}
li { margin-bottom: 6px; }

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: var(--color-paper-raised);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}
th, td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}
th {
  background: var(--color-indigo-tint);
  color: var(--color-indigo-dark);
  font-weight: 600;
}
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--color-paper-sunken); }

.callout {
  border-left: 4px solid var(--color-border-strong);
  background: var(--color-paper-raised);
  padding: 18px 20px;
  border-radius: 0 8px 8px 0;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.callout.practice {
  border-left-color: var(--color-forest);
  background: var(--color-forest-tint);
}
.callout.source {
  border-left-color: var(--color-gold);
  background: var(--color-gold-tint);
}
.callout.note {
  border-left-color: var(--color-indigo);
  background: var(--color-indigo-tint);
}
.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--color-ink);
}
.callout.practice .callout-title { color: var(--color-forest); }
.callout.source .callout-title { color: var(--color-gold); }
.callout.note .callout-title { color: var(--color-indigo); }
.callout p:last-child { margin-bottom: 0; }

.diagram-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 12px;
  padding: 24px;
  margin: 28px 0;
}

.diagram-card .diagram-caption {
  font-size: 14px;
  color: var(--color-ink-faint);
  margin-top: 14px;
  text-align: center;
}

.mermaid-wrap {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 13px;
  text-align: center;
  padding: 24px 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
.card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 15px;
  color: var(--color-indigo);
}
.card p:last-child { margin-bottom: 0; }

.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin: 20px 0;
}
.glossary-item {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 12px 14px;
}
.glossary-item .g-term { font-weight: 700; color: var(--color-indigo); margin-bottom: 4px; }
.glossary-item .g-def { color: var(--color-ink-soft); font-size: 14px; }

.ref-group { margin-bottom: 28px; }
.ref-group :is(h3, h4) { margin-top: 0; }
.ref-list { list-style: none; margin: 0; padding: 0; }
.ref-list li { padding: 12px 0; border-bottom: 1px solid var(--color-border); font-size: 14px; }
.ref-list li:last-child { border-bottom: none; }
.ref-name { display: block; font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
.ref-url { font-size: 12px; word-break: break-all; }

footer {
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .sidebar-toggle { display: flex; }
  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    bottom: 0;
    z-index: 40;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: var(--global-nav-height) 0 0 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 35;
  }
  .main-content { padding: 32px 20px 64px; }
}

</style>
