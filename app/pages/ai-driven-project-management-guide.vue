<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "introduction",
  "what-is-ai-pm",
  "roadmap-overview",
  "step0-assessment",
  "step1-use-cases",
  "step2-tool-selection",
  "step3-governance",
  "step4-prompt-engineering",
  "step5-agentic-workflow",
  "step6-risk-ethics",
  "step7-measure-scale",
  "anti-patterns",
  "roadmap-30-60-90",
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
  title: "AI駆動プロジェクトマネジメント実践ガイド | 初学者のためのステップバイステップ・ベストプラクティス",
  description:
    "PMI AI標準・McKinsey調査・GitHub公式ブログなど一次情報に基づく、AI駆動プロジェクトマネジメント(AI-PM)の初学者向け実践ガイド。導入ロードマップからガバナンス設計、エージェント活用まで解説。",
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

const DIAGRAM_ROADMAP = `flowchart TB
    A["Step 0 現状診断 ワークフローとデータ品質を棚卸し"] --> B["Step 1 ユースケース選定 痛みが大きい業務から着手"]
    B --> C["Step 2 ツールまたはエージェント選定"]
    C --> D["Step 3 ガバナンス設計 人間の関与ポイントを定義"]
    D --> E["Step 4 小規模パイロット運用"]
    E --> F{"成果は出ているか"}
    F -- "Yes" --> G["Step 5 チーム標準へ展開"]
    F -- "No" --> H["Step 6 ワークフローを再設計"]
    H --> E
    G --> I["Step 7 全社スケールと継続計測"]
    I --> D

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,G,H box;
    class F hub;
    class I done;`;

const DIAGRAM_GOVERNANCE = `flowchart TB
    Hub1["8つの指導原則"] --> P1["戦略的価値"]
    P1 ~~~ P2["リスク管理"]
    P2 ~~~ P3["ガバナンスとコンプライアンス"]
    P3 ~~~ P4["人材と組織文化"]
    P4 ~~~ P5["倫理と専門的責任"]
    P5 ~~~ P6["ステークホルダーエンゲージメント"]
    P6 ~~~ P7["最適化とイノベーション"]
    P7 ~~~ P8["データ品質"]
    P8 --> Hub2["5つのパフォーマンス領域"]
    Hub2 --> D1["ステークホルダー期待値の管理"]
    D1 ~~~ D2["AI適用範囲の定義"]
    D2 ~~~ D3["品質と信頼性の設計"]
    D3 ~~~ D4["戦略目標の実行"]
    D4 ~~~ D5["リスクと不確実性の管理"]
    D5 --> H["人間による判断 Human-in-the-Loop"]
    H -- "承認・修正" --> R["説明責任のある成果"]
    H -- "フィードバック" --> Hub1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class P1,P2,P3,P4,P5,P6,P7,P8,D1,D2,D3,D4,D5 box;
    class Hub1,Hub2,H hub;
    class R done;`;

const DIAGRAM_ESCALATION = `flowchart TB
    A["AIがタスクを実行または提案を生成"] --> B{"影響度はどの程度か"}
    B -- "低リスク 定型作業" --> C["自動実行し事後サンプリング確認 例 議事録要約"]
    B -- "中リスク 判断を含む提案" --> D["担当PMが確認・調整 例 タスク優先度提案"]
    B -- "高リスク 予算またはスコープ変更" --> E["ステアリング委員会の承認が必須 例 予算5%超の再配分"]
    C --> F["ログと根拠を記録"]
    D --> F
    E --> F
    F --> G["フィードバックをモデル改善へ反映"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,C,D,E,F box;
    class B hub;
    class G done;`;

const DIAGRAM_AGENTIC = `flowchart TB
    A["Issueまたはチケット作成 要件を自然言語で記述"] --> B["AIエージェントに割り当て 例 コーディングエージェント"]
    B --> C["エージェントが計画を立案 Plan Mode"]
    C --> D["コード変更を実行"]
    D --> E["自動テスト・静的解析"]
    E --> F{"検証に合格したか"}
    F -- "No" --> D
    F -- "Yes" --> G["セキュリティスキャン CodeQL等"]
    G --> H["Pull Request作成"]
    H --> I["人間によるレビュー Human-in-the-Loop"]
    I -- "差し戻し" --> D
    I -- "承認" --> J["マージしてCI CDパイプラインへ"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C,D,E,G,H box;
    class F,I hub;
    class J done;`;
</script>

<template>
  <div class="guide-container">
    <div class="layout">
      <!-- Mobile sidebar toggle -->
      <button
        ref="sidebarToggle"
        class="sidebar-toggle"
        :aria-expanded="sidebarOpen"
        aria-controls="guide-sidebar"
        aria-label="目次メニューを開閉"
        @click="sidebarOpen = !sidebarOpen"
      >
        <Icon name="tabler:menu-2" aria-hidden="true" />
      </button>

      <!-- Sidebar -->
      <nav id="guide-sidebar" class="sidebar" :class="{ open: sidebarOpen }">
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="brand-text">
            <div class="brand-title">AI駆動PM実践ガイド</div>
            <div class="brand-subtitle">初学者向けステップバイステップ</div>
          </div>
        </div>

        <ul class="sidebar-nav">

      <li><a href="#introduction" :class="{ active: activeId === 'introduction' }" :aria-current="activeId === 'introduction' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:book" aria-hidden="true" />はじめに</a></li>
      <li><a href="#what-is-ai-pm" :class="{ active: activeId === 'what-is-ai-pm' }" :aria-current="activeId === 'what-is-ai-pm' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:brain" aria-hidden="true" />AI駆動PMとは何か</a></li>
      <li><a href="#roadmap-overview" :class="{ active: activeId === 'roadmap-overview' }" :aria-current="activeId === 'roadmap-overview' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />導入までのロードマップ</a></li>
      <li><a href="#step0-assessment" :class="{ active: activeId === 'step0-assessment' }" :aria-current="activeId === 'step0-assessment' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />ステップ0 現状棚卸し</a></li>
      <li><a href="#step1-use-cases" :class="{ active: activeId === 'step1-use-cases' }" :aria-current="activeId === 'step1-use-cases' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:target" aria-hidden="true" />ステップ1 ユースケース選定</a></li>
      <li><a href="#step2-tool-selection" :class="{ active: activeId === 'step2-tool-selection' }" :aria-current="activeId === 'step2-tool-selection' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:tools" aria-hidden="true" />ステップ2 ツール選定</a></li>
      <li><a href="#step3-governance" :class="{ active: activeId === 'step3-governance' }" :aria-current="activeId === 'step3-governance' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:shield-check" aria-hidden="true" />ステップ3 ガバナンス設計</a></li>
      <li><a href="#step4-prompt-engineering" :class="{ active: activeId === 'step4-prompt-engineering' }" :aria-current="activeId === 'step4-prompt-engineering' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:message-2" aria-hidden="true" />ステップ4 プロンプト基礎</a></li>
      <li><a href="#step5-agentic-workflow" :class="{ active: activeId === 'step5-agentic-workflow' }" :aria-current="activeId === 'step5-agentic-workflow' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />ステップ5 エージェント活用</a></li>
      <li><a href="#step6-risk-ethics" :class="{ active: activeId === 'step6-risk-ethics' }" :aria-current="activeId === 'step6-risk-ethics' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />ステップ6 リスクと倫理</a></li>
      <li><a href="#step7-measure-scale" :class="{ active: activeId === 'step7-measure-scale' }" :aria-current="activeId === 'step7-measure-scale' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:trending-up" aria-hidden="true" />ステップ7 計測とスケール</a></li>
      <li><a href="#anti-patterns" :class="{ active: activeId === 'anti-patterns' }" :aria-current="activeId === 'anti-patterns' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:bug" aria-hidden="true" />よくある失敗パターン</a></li>
      <li><a href="#roadmap-30-60-90" :class="{ active: activeId === 'roadmap-30-60-90' }" :aria-current="activeId === 'roadmap-30-60-90' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:calendar-event" aria-hidden="true" />30・60・90日ロードマップ</a></li>
      <li><a href="#summary" :class="{ active: activeId === 'summary' }" :aria-current="activeId === 'summary' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />まとめ</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" :aria-current="activeId === 'references' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・出典</a></li>
    
        </ul>
      </nav>

      <!-- Main content -->
      <main id="main-content" class="main-content" tabindex="-1">


    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:sparkles" aria-hidden="true" />AI-Driven Project Management</div>
      <h1>AI駆動プロジェクトマネジメント実践ガイド</h1>
      <p class="hero-lede">
        初学者のためのステップバイステップ・ベストプラクティス
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">8ステップ</div><div class="stat-label">現状診断から全社スケールまでの導入プロセス</div></div>
        <div class="stat-card"><div class="stat-number">4図解</div><div class="stat-label">Mermaidによる意思決定フローの可視化</div></div>
        <div class="stat-card"><div class="stat-number">16件</div><div class="stat-label">PMI・McKinsey・GitHub等の一次情報ソース</div></div>
        <div class="stat-card"><div class="stat-number">8原則5領域</div><div class="stat-label">PMI AI標準が定めるガバナンス構造</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは2026年8月時点でウェブ上に公開されている一次情報・業界レポート・著名なソフトウェアエンジニアやエンジニアリングリーダーの発信内容をもとに作成しています。出典はすべて末尾の「参考文献・出典」にURLとして明記しています。AIツールやサービス仕様は更新が速い領域のため、実際に導入する際は各ベンダーの公式ドキュメントで最新情報を確認してください。</span>
      </div>
    </div>

    <!-- ===================== 1. Introduction ===================== -->
    <section id="introduction">
      <div class="section-eyebrow"><Icon name="tabler:book" aria-hidden="true" />SECTION 01</div>
      <h2>はじめに</h2>

      <p>「AI駆動プロジェクトマネジメント(AI-Driven Project Management、以下 AI-PM)」という言葉を聞くと、多くの初学者は「AIがプロジェクトマネージャーの仕事を奪うのではないか」という不安を抱きがちです。しかし2026年時点で業界の実務家やアナリストが繰り返し指摘しているのは、AIは意思決定を「支援」できても、その意思決定に対する「説明責任」を負うことはできないという点です。Project Management Institute(PMI)が2026年6月に発表した業界初のAI標準でも、この考え方が中核に据えられています。</p>

      <p>本ガイドは、PM未経験者やAIツールを触ったことがない初学者でも迷わず実践できるよう、以下の3点を重視して構成しています。</p>

      <ul>
        <li><strong>ステップバイステップ。</strong>現状診断から全社スケールまで、順番に進められる構成</li>
        <li><strong>一次情報に基づく根拠。</strong>GitHub・Atlassian・PMI・McKinsey・The Pragmatic Engineer(Gergely Orosz氏)など、著名な開発者・組織の発信を参照</li>
        <li><strong>すぐ使えるフォーマット。</strong>図表・チェックリスト・比較表を中心に、読んですぐ行動に移せる形式</li>
      </ul>

      <p>対象読者は、AIツールを使い始めたばかりのプロジェクトマネージャー、エンジニアリングマネージャー、またはPMOメンバーです。</p>
    </section>

    <!-- ===================== 2. What is AI-PM ===================== -->
    <section id="what-is-ai-pm">
      <div class="section-eyebrow"><Icon name="tabler:brain" aria-hidden="true" />SECTION 02</div>
      <h2>AI駆動プロジェクトマネジメント(AI-PM)とは何か</h2>

      <h3>定義</h3>
      <p>AI駆動プロジェクトマネジメントとは、機械学習・自然言語処理・生成AI・AIエージェントといった技術を、計画立案・タスク管理・リスク予測・進捗報告・意思決定支援など、プロジェクトマネジメントの各プロセスに組み込み、人間の判断とAIの処理能力を組み合わせて成果を高めるアプローチです。O'Reillyから出版されている書籍『AI-Driven Project Management』(Kristian Bainey著)では、AIとChatGPTの活用によって「サプライズを最小化し、バイアスを減らし、基準を高め、意思決定を加速する」という4つの価値領域が整理されています。</p>

      <h3>なぜ今重要なのか</h3>
      <ul>
        <li>PMIの調査によれば、AIを活用しているプロジェクトの成功率(納期・予算内・目標達成の観点)は、活用していない組織と比べて明確に高く、オンタイム納品率にも大きな差が見られると報告されています。</li>
        <li>Gartnerは、2030年までにプロジェクトマネージャーの業務の約8割がAI・ビッグデータ・機械学習・自然言語処理によって遂行されるようになると予測しています。</li>
        <li>一方でMcKinseyの「State of AI」調査(2025年11月公開)は、組織の約9割が何らかの業務でAIを利用している一方、全社的にAIをスケールできている組織は依然として約3分の1にとどまり、EBIT(利益)への実質的な効果を報告できているのはごく一部であると指摘しています。つまり「導入」と「成果創出」の間には大きなギャップが存在します。</li>
      </ul>

      <h3>従来型PMとAI駆動PMの違い</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>観点</th><th>従来型プロジェクトマネジメント</th><th>AI駆動プロジェクトマネジメント</th></tr>
          </thead>
          <tbody>
            <tr><td>進捗把握</td><td>手動でのステータス収集・週次報告会</td><td>チケット・チャット・コミットログを自動集約し常時可視化</td></tr>
            <tr><td>リスク識別</td><td>PMの経験と勘、定例のリスクレビュー</td><td>過去データからのパターン認識による早期シグナル検出</td></tr>
            <tr><td>リソース配分</td><td>スプレッドシートによる手動調整</td><td>稼働率・スキルマッチングをAIが提案し人間が確定</td></tr>
            <tr><td>意思決定</td><td>会議とドキュメントベースの合意形成</td><td>AIが選択肢とシナリオを提示し、人間が最終判断</td></tr>
            <tr><td>報告作成</td><td>手作業でのレポート編集(月に半日〜1日を要するとの調査結果あり)</td><td>進捗データから自動生成し、人間がレビュー・調整</td></tr>
            <tr><td>求められるPMスキル</td><td>スケジューリング・調整力中心</td><td>上記に加えてプロンプト設計・AI出力の検証・ガバナンス設計力</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 3. Roadmap overview ===================== -->
    <section id="roadmap-overview">
      <div class="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 03</div>
      <h2>全体像:導入までのロードマップ</h2>

      <p>AI-PMの導入は「ツールを入れて終わり」ではなく、継続的な改善サイクルです。以下は、現状診断からスケール展開までの全体フローです。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ROADMAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">現状診断からスケール展開までのAI-PM導入ロードマップ</div>
      </div>

      <p>ポイントは、矢印が最後で「ガバナンス設計」に戻ってくることです。McKinseyの調査でも、ワークフローの再設計を継続的に行っている「ハイパフォーマー」企業ほどAIから実質的な価値を得られていると報告されており、AI-PMは一度導入して終わりではなく反復的なプロセスとして捉える必要があります。</p>
    </section>

    <!-- ===================== 4. Step 0 ===================== -->
    <section id="step0-assessment">
      <div class="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 04</div>
      <h2>ステップ0:現状を棚卸しする</h2>

      <p>AIツールを導入する前に、まず自分たちのプロジェクト運営の「現在地」を把握します。Airtableの実務ガイドでは、AIプロジェクト管理ツールは導入するだけでは価値を生まず、現場のPMを早期に巻き込み、どこに時間を取られているかを特定してから高インパクトな箇所を選ぶことが推奨されています。</p>

      <h3>チェックリスト</h3>
      <ul>
        <li>現在使用しているプロジェクト管理ツール(Jira、Asana、Notion、Excelなど)を洗い出したか</li>
        <li>タスクのステータス・担当者・期限などのデータが一貫した形式で入力されているか</li>
        <li>過去プロジェクトの実績データ(工数・遅延理由・予算差異)が参照可能な形で残っているか</li>
        <li>チームメンバーが「時間を取られていると感じる作業」をヒアリングしたか(ステータス報告、議事録作成、リスク洗い出しなど)</li>
        <li>機密情報・個人情報を含むデータをAIに渡してよいかの社内ルールを確認したか</li>
      </ul>

      <p>データ品質がAI-PMの土台になる理由は明確です。Wellingtoneの調査を引用する複数の分析記事では、多くの組織が毎月半日〜1日をステータスレポートの手動集約に費やしていると報告されています。この作業はAIによる自動化の効果が最も出やすい領域である一方、入力データが不揃いだとAIの要約や予測も不正確になります。「AIを入れれば直る」のではなく、「クリーンなデータがあるチームほどAIの効果が出る」という順序を意識してください。</p>
    </section>
    <!-- ===================== 5. Step 1 ===================== -->
    <section id="step1-use-cases">
      <div class="section-eyebrow"><Icon name="tabler:target" aria-hidden="true" />SECTION 05</div>
      <h2>ステップ1:ユースケースを選ぶ</h2>

      <p>すべてのプロジェクトマネジメント業務を一度にAI化しようとすると失敗します。PMBOK(Project Management Body of Knowledge)が定義する知識エリアとAIの得意分野を掛け合わせ、投資対効果の高い領域から着手するのが定石です。</p>

      <h3>PM知識エリア × AI活用の相性表</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>PMBOK 知識エリア</th><th>AIが得意なこと</th><th>人間の判断が引き続き必要なこと</th></tr>
          </thead>
          <tbody>
            <tr><td>スコープ管理</td><td>要件文書からのタスク分解・サブタスク自動生成</td><td>ステークホルダー間の優先順位の政治的調整</td></tr>
            <tr><td>スケジュール管理</td><td>過去実績からの所要期間予測、遅延の早期検知</td><td>クリティカルパス変更時の関係者合意形成</td></tr>
            <tr><td>コスト管理</td><td>バーンレートのリアルタイム監視、予算超過アラート</td><td>予算再配分の最終承認、契約交渉</td></tr>
            <tr><td>リスク管理</td><td>類似プロジェクトのパターンからリスク候補を洗い出し</td><td>発生確率・影響度の重み付けと対応方針の決定</td></tr>
            <tr><td>コミュニケーション管理</td><td>会議要約、ステータスレポート自動生成、多言語翻訳</td><td>対立するステークホルダーの調整、信頼関係構築</td></tr>
            <tr><td>品質管理</td><td>成果物のコンプライアンスチェック、規格との照合</td><td>品質基準そのものの設定、例外対応の判断</td></tr>
            <tr><td>資源管理</td><td>スキルマッチングに基づく稼働配分の提案</td><td>人事評価に関わる配置判断、組織文化への配慮</td></tr>
            <tr><td>調達管理</td><td>サプライヤー選定のためのリサーチ・比較資料作成</td><td>契約条件の最終交渉、法務判断</td></tr>
            <tr><td>ステークホルダー管理</td><td>関係者の関心・影響度マップの下書き作成</td><td>個別の関係構築、機微な交渉</td></tr>
            <tr><td>統合管理</td><td>複数ツールに散在する情報の横断的な要約</td><td>プロジェクト全体としての戦略的意思決定</td></tr>
          </tbody>
        </table>
      </div>

      <p>ScienceDirect誌に2026年に掲載された系統的文献レビューでも、AIの活用事例は「予測」「モニタリング」領域に集中する一方、コミュニケーションやステークホルダー領域への適用はまだ手薄であることが指摘されています。つまり、定型的でデータドリブンな業務から着手し、対人折衝が中心の業務は当面「人間主導・AI補助」の位置づけに留めるのが安全です。</p>

      <h3>選定の優先順位づけの目安</h3>
      <ol>
        <li><strong>発生頻度が高く、定型的。</strong>例:週次ステータスレポート作成</li>
        <li><strong>既存データが揃っている。</strong>例:チケット管理ツールに履歴がある</li>
        <li><strong>誤りが出ても実害が小さい。</strong>例:下書き作成であり最終承認は人間</li>
      </ol>

      <p>この3条件を満たすユースケースから着手すると、パイロット段階での失敗リスクを抑えられます。</p>
    </section>

    <!-- ===================== 6. Step 2 ===================== -->
    <section id="step2-tool-selection">
      <div class="section-eyebrow"><Icon name="tabler:tools" aria-hidden="true" />SECTION 06</div>
      <h2>ステップ2:適切なツール・AIエージェントを選定する</h2>

      <p>2026年時点で、主要なプロジェクト管理プラットフォームのほとんどがAI機能を組み込んでいます。GitHubの発信やAtlassianの公式ブログ、業界メディアの比較記事をもとに、代表的なカテゴリを整理します。</p>

      <h3>代表的なツール・エージェントの比較</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>ツール・エージェント</th><th>主な提供元</th><th>得意領域</th><th>2026年時点の特徴</th></tr>
          </thead>
          <tbody>
            <tr><td>Jira + Atlassian Rovo / Agents in Jira</td><td>Atlassian</td><td>ソフトウェア開発とプロジェクト管理の統合</td><td>Jira上でClaude Code・Cursor・GitHub Copilotなど複数のコーディングエージェントをオーケストレーションできる仕組みを提供</td></tr>
            <tr><td>GitHub Copilot(coding agent・CLI・Copilotアプリ)</td><td>GitHub(Microsoft)</td><td>Issue起票からPR作成までのソフトウェア開発ワークフロー自動化</td><td>2026年6月にデスクトップの「エージェント管理コントロールセンター」が一般提供開始され、複数エージェントの並行実行と監査性を強化</td></tr>
            <tr><td>Microsoft Copilot for Project</td><td>Microsoft</td><td>スケジュール生成、タスク配分、進捗照会への自然言語応答</td><td>Project Onlineと連携し、リソース競合の自動検出などを提供</td></tr>
            <tr><td>ChatGPT / Claude 等の汎用LLMアシスタント</td><td>OpenAI・Anthropic 等</td><td>プロンプトベースの文書作成、リスクブレインストーミング、意思決定支援</td><td>O'Reilly『AI-Driven Project Management』でもChatGPT活用のユースケースが体系的に解説されている</td></tr>
            <tr><td>Asana Intelligence / monday.com AI / ClickUp Brain / Wrike Work Intelligence</td><td>各社</td><td>タスク管理SaaS上でのワークフロー自動化・リスクフラグ</td><td>汎用のPMツールにAIレイヤーを統合したタイプ</td></tr>
          </tbody>
        </table>
      </div>

      <h3>選定時に確認すべき観点</h3>
      <ul>
        <li><strong>データガバナンス。</strong>AIアシスタントが社内メール・文書にアクセスする前に、何を参照できるかを確認する(Airtableの実務ガイドでも強調されているポイント)</li>
        <li><strong>人間による最終レビューの組み込みやすさ。</strong>AIが生成した内容をそのままステークホルダーに送らず、レビューできる導線があるか</li>
        <li><strong>既存ツールとの統合。</strong>Jira・Slack・GitHub・Teamsなど、すでに使っているツールと接続できるか(GitHubのコーディングエージェントはJira・Linear・Slack・Teams等と統合可能)</li>
        <li><strong>セキュリティ認証。</strong>SOC 2 Type IIやGDPR準拠などの認証状況</li>
      </ul>

      <p>ツールは頻繁にアップデートされるため、最終的な機能詳細は必ず各社の公式ドキュメントで確認してください。</p>
    </section>

    <!-- ===================== 7. Step 3 ===================== -->
    <section id="step3-governance">
      <div class="section-eyebrow"><Icon name="tabler:shield-check" aria-hidden="true" />SECTION 07</div>
      <h2>ステップ3:Human-in-the-Loopガバナンスを設計する</h2>

      <p>AI-PMで最も見落とされがちなのが「誰が、どの意思決定に、どこまで関与するか」というガバナンス設計です。PMIは2026年6月、業界として初めてANSI承認を受けたAI標準「The Standard for Artificial Intelligence in Portfolio, Program, and Project Management」を発表しました。この標準は、AIが意思決定を支援できても、その結果に対する説明責任は人間が負い続けるという考え方(Human-in-the-Loop)を中核原則としています。</p>

      <p>標準は「8つの指導原則」と、それを実務に落とし込む「5つのパフォーマンス領域」で構成されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_GOVERNANCE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">PMI AI標準の8原則・5パフォーマンス領域とHuman-in-the-Loopの関係</div>
      </div>

      <p>PMIのブログ記事(2026年7月14日公開、Kathleen Walch氏執筆)では、効果的な人間による監督とは「出力を事後にチェックする」という受け身の姿勢ではなく、以下をあらかじめ設計しておくことだと説明されています。</p>

      <ul>
        <li>AIの判断が確定する<strong>前に</strong>人間の承認を必須とするポイントを明確化する</li>
        <li>出力が不確実・不完全な場合の<strong>エスカレーション経路</strong>を定義する</li>
        <li>AIが支援した意思決定について<strong>誰が最終的な説明責任を負うか</strong>を明文化する</li>
        <li>AI支援ワークフローが時間とともに改善されるよう<strong>フィードバックループ</strong>を組み込む</li>
      </ul>

      <h3>リスクの大きさに応じたエスカレーション設計例</h3>
      <p>すべての意思決定に同じ厳格さで人間の承認を求めると、AIの効率化メリットが失われます。実務では、影響度に応じて関与レベルを変える「リスク階層型」の設計が有効です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ESCALATION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">影響度に応じたリスク階層型エスカレーション設計の例</div>
      </div>

      <p>この設計思想は、GitHubのエージェント運用にも表れています。GitHub Copilot coding agentは既定では書き込み操作の前に許可を求める設定になっており、信頼が積み上がった段階でチームが自律実行(オートパイロット)へ移行するという段階的な運用が推奨されています。「最初から全自動」ではなく「小さく任せて、実績を見ながら権限を広げる」という順序が、業界標準的なアプローチになりつつあります。</p>
    </section>

    <!-- ===================== 8. Step 4 ===================== -->
    <section id="step4-prompt-engineering">
      <div class="section-eyebrow"><Icon name="tabler:message-2" aria-hidden="true" />SECTION 08</div>
      <h2>ステップ4:プロンプトエンジニアリングの基礎</h2>

      <p>AIアシスタントの出力品質は、指示(プロンプト)の質に大きく左右されます。O'Reillyの書籍でも「プロジェクトマネージャーのためのプロンプトエンジニアリング」が独立した章として扱われているほど、PM実務における必須スキルになっています。</p>

      <h3>良いプロンプトの構成要素</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>要素</th><th>説明</th><th>悪い例 → 良い例</th></tr>
          </thead>
          <tbody>
            <tr><td>役割の明示</td><td>AIにどの立場で回答してほしいかを伝える</td><td>「リスクを教えて」→「あなたは建設プロジェクトのリスクマネージャーです。以下の状況からリスクを洗い出してください」</td></tr>
            <tr><td>具体的な文脈</td><td>プロジェクトの背景・制約条件を含める</td><td>「スケジュールを作って」→「予算◯◯万円、期間3ヶ月、メンバー5名のWebサイト刷新プロジェクトのスケジュール案を作成してください」</td></tr>
            <tr><td>出力形式の指定</td><td>表・箇条書き・優先順位付きリストなど形式を指定する</td><td>「まとめて」→「重要度High/Medium/Lowで分類した表形式で出力してください」</td></tr>
            <tr><td>検証観点の明示</td><td>AIに前提や不確実性を明示させる</td><td>「これで合ってる?」→「この見積りの根拠となった前提条件を3つ挙げてください」</td></tr>
          </tbody>
        </table>
      </div>

      <h3>実践例</h3>

      <h4>リスクブレインストーミング</h4>
      <p>プロジェクトのスコープ・期間・依存関係・チーム構成・ベンダー状況を伝えたうえで「見落としがちなリスクを20件挙げてほしい」と依頼する使い方は、実務者コミュニティでも高い再現性がある活用法として紹介されています。AIが提示するリスクの多くは目新しいものではなくても、担当者が気づいていなかった3〜5件が見つかるケースが多く、その後の確率・影響度評価は引き続き人間が行うという役割分担が推奨されています。</p>

      <h4>ステータスレポートの下書き</h4>
      <p>チケット管理ツールから抽出した進捗データを渡し、「経営層向けに3行で要約してください。数値の変化には理由を添えてください」のように、読み手と分量を指定することで、AI生成物をそのまま送るのではなく、レビューしやすい下書きとして活用できます。</p>

      <h4>議事録からのアクションアイテム抽出</h4>
      <p>会議の文字起こしを渡し、「担当者・期限・優先度を含めたアクションアイテムの一覧を表形式で作成してください」と依頼すると、手作業での議事録整理にかかる時間を削減できます。ただし、担当者名や期限の解釈が誤っている可能性があるため、必ず人間が確認してから展開する運用が推奨されます。</p>
    </section>
    <!-- ===================== 9. Step 5 ===================== -->
    <section id="step5-agentic-workflow">
      <div class="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 09</div>
      <h2>ステップ5:エージェント型ワークフローを実践する</h2>

      <p>2026年の大きな変化は、AIが「質問に答えるアシスタント」から「タスクを自律的に遂行するエージェント」へと役割を広げていることです。特にソフトウェア開発を含むプロジェクトでは、GitHub Copilot coding agentのような「Issueに割り当てるとPRが返ってくる」ワークフローが一般化しつつあります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_AGENTIC" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Issue作成からマージまでのエージェント型ワークフローと人間レビューの位置づけ</div>
      </div>

      <p>GitHub公式ブログでは、この一連の流れを「アイデアからPRまで(idea to PR)」と表現し、エージェントに任せられるのは定型的な下準備作業であり、最終的なレビュー・調整・マージ判断は引き続き開発者が担うと明確に位置づけています。</p>

      <h3>実務者コミュニティからの知見</h3>
      <p>ソフトウェアエンジニアリング領域で最も購読者数の多いニュースレターのひとつ「The Pragmatic Engineer」(著者:Gergely Orosz氏、元Uber・Microsoft/Skypeのエンジニア)は、2026年に実施した900名超のエンジニア・エンジニアリングリーダー向け調査の分析記事の中で、AIツールがもたらす効果は「明確な目標を持って使っているときは強力な武器になるが、目標が曖昧なままだと『まあまあ』の結果に終わる」という利用者の声を紹介しています。またAIが生成したコードの半数近くがそのままレビューなしで採用されているという調査結果を報告する一方、コードベースの品質低下を懸念する声が上がっていることにも触れており、「エージェントに任せる範囲を広げるほど、レビュー体制の質がボトルネックになる」という示唆を与えています。</p>

      <p>この知見はプロジェクトマネジメント全般にも応用できます。エージェント型ワークフローを導入する際は、次の3点を明確にしてから進めるのが安全です。</p>

      <ol>
        <li><strong>エージェントが触れてよい範囲(ブランチ・権限・ツール呼び出し)を限定する</strong></li>
        <li><strong>エージェントの提案に対する検証ステップ(テスト・スキャン・人間レビュー)を省略しない</strong></li>
        <li><strong>エージェントが判断に迷った場合や失敗した場合のフォールバック手順を用意する</strong></li>
      </ol>

      <p>Microsoft ResearchがGitHub Copilotの実運用データ(2026年6月、320万ユーザー・1,300万セッション規模)を分析した論文でも、エージェント型のコーディングワークフローは、まとまった処理を自律的に行う「エージェントループ」と、その合間に発生する数分単位の「人間の待ち時間」という特徴的なパターンを持つことが報告されています。つまりエージェントに仕事を任せている間も、人間側のタスク設計(次に何をレビューし、何を並行して進めるか)が生産性を左右します。</p>
    </section>

    <!-- ===================== 10. Step 6 ===================== -->
    <section id="step6-risk-ethics">
      <div class="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 10</div>
      <h2>ステップ6:リスク管理と倫理的配慮</h2>

      <p>PMIのAI標準における8原則のうち、特にプロジェクトマネージャーが日常的に意識すべきなのが「倫理と専門的責任」「データ品質」「ガバナンスとコンプライアンス」の3つです。</p>

      <h3>主なリスクと対策</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>リスク領域</th><th>具体的な懸念</th><th>対策の方向性</th></tr>
          </thead>
          <tbody>
            <tr><td>ハルシネーション(誤った出力)</td><td>AIが存在しない事実やもっともらしい誤情報を生成する</td><td>重要な数値・事実は一次情報で必ず裏取りする。AI出力を最終成果物としてそのまま流用しない</td></tr>
            <tr><td>データプライバシー</td><td>機密情報・個人情報が外部のAIサービスに送信される</td><td>企業向けの専用インスタンスやゼロデータ保持オプションを選定し、公開LLMに機密情報を入力しない</td></tr>
            <tr><td>バイアスの増幅</td><td>過去データに含まれる偏りをAIがそのまま再生産する</td><td>モデルが参照するデータの偏りを定期的に点検し、人事評価等のセンシティブな判断には慎重に適用する</td></tr>
            <tr><td>説明責任の空白化</td><td>「AIが決めたので」と人間が判断を放棄してしまう</td><td>意思決定の最終承認者を必ず個人名で明確化し、AIの提案理由を記録に残す</td></tr>
            <tr><td>過信によるスキル低下</td><td>AIの予測を無批判に受け入れ、PM自身の判断力が育たない</td><td>AI予測はあくまで「入力」として扱い、PMが妥当性を検証するプロセスを制度化する</td></tr>
          </tbody>
        </table>
      </div>

      <p>TechTargetの記事で引用されているアナリストのコメントでも、AIによる予測は不確実な状況下での意思決定を支援するものであり、AIがプロジェクトの継続・中止といった重い判断を単独で下す段階には至っていないと指摘されています。むしろAIは「判断のためのデータ」を充実させる役割であり、最終的な意思決定の重みは人間に残り続けると理解しておくことが重要です。</p>
    </section>

    <!-- ===================== 11. Step 7 ===================== -->
    <section id="step7-measure-scale">
      <div class="section-eyebrow"><Icon name="tabler:trending-up" aria-hidden="true" />SECTION 11</div>
      <h2>ステップ7:効果を計測し、スケールする</h2>

      <p>パイロットで成果が出たら、チーム全体・組織全体への展開を検討します。ただしMcKinseyの調査が示す通り、多くの組織は「導入はしたが、スケールできない」という壁にぶつかります。</p>

      <h3>スケール時につまずきやすいポイント</h3>
      <ul>
        <li><strong>データ・アーキテクチャ。</strong>部門ごとにデータがサイロ化していると、AIがプロジェクト横断の文脈を把握できない</li>
        <li><strong>ワークフローの硬直性。</strong>既存の業務プロセスを変えずにAIを「後付け」しても、効果は限定的(McKinseyは、ワークフローを根本的に再設計した組織ほどEBIT効果との相関が高いと報告)</li>
        <li><strong>測定指標の欠如。</strong>明確なKPIがないまま「なんとなく便利」で終わり、投資判断ができない</li>
      </ul>

      <h3>KPIの設計例</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>カテゴリ</th><th>指標例</th></tr>
          </thead>
          <tbody>
            <tr><td>効率性</td><td>ステータスレポート作成にかかる時間の削減率</td></tr>
            <tr><td>予測精度</td><td>AIによる納期予測と実績の乖離幅</td></tr>
            <tr><td>品質</td><td>AIが検出したリスクのうち、実際に顕在化した割合(適合率)</td></tr>
            <tr><td>採用度</td><td>チームメンバーのうちAIツールを週次で利用している割合</td></tr>
            <tr><td>ガバナンス</td><td>人間レビューを経ずに実行されたAI提案の割合(低いほど良いとは限らず、リスク階層設計との整合性を見る)</td></tr>
          </tbody>
        </table>
      </div>

      <p>Atlassianが2025年に実施した1,000名以上のFortune 1000幹部・知識労働者への調査(State of Teams)では、幹部の多くが「チームの働きが会社全体の目標にどう貢献しているか自信を持てていない」と回答しており、AI導入の効果を測る際は個別タスクの効率化だけでなく、組織全体の目標との接続を可視化する指標も重要になると示唆されています。</p>
    </section>
    <!-- ===================== 12. Anti-patterns ===================== -->
    <section id="anti-patterns">
      <div class="section-eyebrow"><Icon name="tabler:bug" aria-hidden="true" />SECTION 12</div>
      <h2>よくある失敗パターンと回避策</h2>

      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>アンチパターン</th><th>何が起きるか</th><th>回避策</th></tr>
          </thead>
          <tbody>
            <tr><td>AI出力を無編集でそのまま関係者に送る</td><td>誤りや不適切な表現がそのまま外部に出てしまう</td><td>必ず人間によるレビューパスを挟むルールを明文化する</td></tr>
            <tr><td>機能リストだけでツールを選定する</td><td>チームの実際のワークフローに合わず定着しない</td><td>現場のPMを選定プロセスに巻き込み、実際の業務で試用してから決める</td></tr>
            <tr><td>データガバナンスを確認せずに導入する</td><td>機密情報が意図せず外部サービスに送信される</td><td>AIアシスタントが何にアクセスできるかを接続前に必ず確認する</td></tr>
            <tr><td>AIの予測を確実な事実として扱う</td><td>曖昧なリスクについても機械的に判断してしまう</td><td>AIは見積りの精度を高める道具であり、曖昧なリスクに対する最終判断はPMの役割であると理解する</td></tr>
            <tr><td>全社一斉展開から始める</td><td>現場が混乱し、失敗の原因切り分けが困難になる</td><td>小規模なパイロットで検証してから段階的に展開する</td></tr>
            <tr><td>導入後の効果測定を怠る</td><td>投資対効果を説明できず、次の予算確保に失敗する</td><td>導入前にKPIを定義し、パイロット段階から継続的に計測する</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 13. 30-60-90 roadmap ===================== -->
    <section id="roadmap-30-60-90">
      <div class="section-eyebrow"><Icon name="tabler:calendar-event" aria-hidden="true" />SECTION 13</div>
      <h2>30・60・90日 導入ロードマップ</h2>

      <p>初学者チームが最初の3ヶ月でAI-PMに着手する場合の目安です。組織の規模やツール事情によって調整してください。</p>

      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>期間</th><th>主な取り組み</th></tr>
          </thead>
          <tbody>
            <tr><td>最初の30日</td><td>現状のワークフローとデータ品質を棚卸し。痛みの大きい業務(ステータス報告、リスク洗い出しなど)を1〜2件特定。ガバナンス方針(AIに任せてよい範囲)を暫定的に定義</td></tr>
            <tr><td>31〜60日目</td><td>特定したユースケースで小規模パイロットを開始。プロンプトのテンプレート化と人間レビュー体制の整備。初期KPI(時間削減率など)の計測開始</td></tr>
            <tr><td>61〜90日目</td><td>パイロット結果を評価し、成功したユースケースをチーム標準として展開。エスカレーションルールを正式なガバナンス文書として整備。次の90日で拡張するユースケースを選定</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 14. Summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 14</div>
      <h2>まとめ</h2>

      <p>AI駆動プロジェクトマネジメントは、単なるツール導入ではなく、「どこにAIを任せ、どこに人間の判断を残すか」を設計する継続的なプロセスです。本ガイドで紹介した内容を要約すると、次の3点に集約されます。</p>

      <ol>
        <li><strong>データとワークフローの土台がなければAIは機能しない。</strong>まず現状を棚卸しし、痛みが大きく検証しやすいユースケースから着手する。</li>
        <li><strong>人間の関与ポイントをあらかじめ設計する(Human-in-the-Loop)。</strong>PMIのAI標準が示す通り、AIは意思決定を支援できても説明責任を代わりに負うことはできない。</li>
        <li><strong>小さく始めて、計測しながらスケールする。</strong>McKinseyの調査が示すように、多くの組織は「導入」で止まってしまう。ワークフローの再設計と継続的な効果測定こそが、AI-PMを一過性の流行で終わらせないための鍵になる。</li>
      </ol>

      <p>AIツールやモデルは今後も急速に進化していきます。だからこそ、特定のツールの使い方を覚えることよりも、本ガイドで紹介したような「原則」——ガバナンス設計、段階的な権限委譲、効果測定の習慣——を身につけることが、長期的に通用するAI-PMスキルになります。</p>
    </section>

    <!-- ===================== 15. References ===================== -->
    <section id="references">
      <div class="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 15</div>
      <h2>参考文献・出典</h2>

      <p>本ガイドの作成にあたり、以下の情報源を参照しました(2026年8月時点でアクセス可能な情報)。</p>

      <div class="ref-group">
        <h3>書籍</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Kristian Bainey, AI-Driven Project Management: Harnessing the Power of Artificial Intelligence and ChatGPT to Achieve Peak Productivity and Success, Wiley(O'Reilly掲載ページ)</span><a class="ref-url" href="https://www.oreilly.com/library/view/ai-driven-project-management/9781394232215/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/ai-driven-project-management/9781394232215/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>業界標準・専門機関</h3>
        <ul class="ref-list">
          <li><span class="ref-name">PMI「The Standard for Artificial Intelligence in Portfolio, Program, and Project Management」紹介ページ</span><a class="ref-url" href="https://www.pmi.org/standards/artificial-intelligence" target="_blank" rel="noopener">https://www.pmi.org/standards/artificial-intelligence</a></li>
          <li><span class="ref-name">PMIブログ「The New AI Standard: A Shared Foundation for Responsible Adoption」(Kathleen Walch, 2026年7月14日)</span><a class="ref-url" href="https://www.pmi.org/blog/pmi-ai-standard-project-management" target="_blank" rel="noopener">https://www.pmi.org/blog/pmi-ai-standard-project-management</a></li>
          <li><span class="ref-name">PMI プレスリリース「PMI Publishes World's First Global Standard for AI in Project Work」(2026年6月9日)</span><a class="ref-url" href="https://www.pmi.org/about/press-media/2026/pmi-publishes-worlds-first-global-standard-for-ai-in-project-work" target="_blank" rel="noopener">https://www.pmi.org/about/press-media/2026/pmi-publishes-worlds-first-global-standard-for-ai-in-project-work</a></li>
          <li><span class="ref-name">PMI「Artificial Intelligence in Project Management」学習ポータル</span><a class="ref-url" href="https://www.pmi.org/learning/ai-in-project-management" target="_blank" rel="noopener">https://www.pmi.org/learning/ai-in-project-management</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>エンジニアリング・開発者コミュニティ(著名な発信者)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">The Pragmatic Engineer(Gergely Orosz氏)「AI's impact on software engineers in 2026: key trends, Part 2」</span><a class="ref-url" href="https://newsletter.pragmaticengineer.com/p/ai-impact-on-software-engineers-part-2" target="_blank" rel="noopener">https://newsletter.pragmaticengineer.com/p/ai-impact-on-software-engineers-part-2</a></li>
          <li><span class="ref-name">GitHub Blog「From idea to PR: A guide to GitHub Copilot's agentic workflows」</span><a class="ref-url" href="https://github.blog/ai-and-ml/github-copilot/from-idea-to-pr-a-guide-to-github-copilots-agentic-workflows/" target="_blank" rel="noopener">https://github.blog/ai-and-ml/github-copilot/from-idea-to-pr-a-guide-to-github-copilots-agentic-workflows/</a></li>
          <li><span class="ref-name">GitHub Blog「How to maximize GitHub Copilot's agentic capabilities」</span><a class="ref-url" href="https://github.blog/ai-and-ml/github-copilot/how-to-maximize-github-copilots-agentic-capabilities/" target="_blank" rel="noopener">https://github.blog/ai-and-ml/github-copilot/how-to-maximize-github-copilots-agentic-capabilities/</a></li>
          <li><span class="ref-name">GitHub Blog「GitHub Copilot app: The agent-native desktop experience」</span><a class="ref-url" href="https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/" target="_blank" rel="noopener">https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/</a></li>
          <li><span class="ref-name">Microsoft Research「Agentic Coding in the Wild: Characterizing GitHub Copilot at Production Scale」</span><a class="ref-url" href="https://www.microsoft.com/en-us/research/publication/agentic-coding-in-the-wild-characterizing-github-copilot-at-production-scale/" target="_blank" rel="noopener">https://www.microsoft.com/en-us/research/publication/agentic-coding-in-the-wild-characterizing-github-copilot-at-production-scale/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>調査レポート・市場分析</h3>
        <ul class="ref-list">
          <li><span class="ref-name">McKinsey & Company「The state of AI in 2025: Agents, innovation, and transformation」</span><a class="ref-url" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noopener">https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai</a></li>
          <li><span class="ref-name">Atlassian「State of AI in Service Management Report 2025」</span><a class="ref-url" href="https://www.atlassian.com/whitepapers/state-of-ai" target="_blank" rel="noopener">https://www.atlassian.com/whitepapers/state-of-ai</a></li>
          <li><span class="ref-name">Deviniti「35 Atlassian's System of Work statistics you need to know in 2026」(Atlassian State of Teams 2025データの引用元)</span><a class="ref-url" href="https://deviniti.com/blog/leadership-teamwork/35-system-of-work-statistics/" target="_blank" rel="noopener">https://deviniti.com/blog/leadership-teamwork/35-system-of-work-statistics/</a></li>
          <li><span class="ref-name">TechTarget「How AI is transforming project management in 2026」</span><a class="ref-url" href="https://www.techtarget.com/searchenterpriseai/feature/How-AI-is-transforming-project-management" target="_blank" rel="noopener">https://www.techtarget.com/searchenterpriseai/feature/How-AI-is-transforming-project-management</a></li>
          <li><span class="ref-name">ScienceDirect「AI-driven project management: Identifying use cases」(Procedia Computer Science, 2026)</span><a class="ref-url" href="https://www.sciencedirect.com/science/article/pii/S1877050926007301" target="_blank" rel="noopener">https://www.sciencedirect.com/science/article/pii/S1877050926007301</a></li>
          <li><span class="ref-name">Airtable「AI for project management: Tools, best practices, and use cases 2026」</span><a class="ref-url" href="https://www.airtable.com/articles/ai-project-management" target="_blank" rel="noopener">https://www.airtable.com/articles/ai-project-management</a></li>
        </ul>
      </div>
    </section>

    <footer>
      本ガイドは特定ベンダーの製品を推奨するものではありません。ツール名・機能・料金体系は変更される可能性があるため、導入検討時は必ず各社公式サイトの最新情報をご確認ください。
    </footer>

  
      </main>
    </div>
  </div>
</template>

<style scoped>
.guide-container {
  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.75;
}

a {
  color: var(--color-indigo);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-indigo);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -48px;
  left: 0;
  z-index: 40;
  background: var(--color-paper-raised);
  color: var(--color-indigo);
  padding: 12px 20px;
  border: 1px solid var(--color-border);
  border-radius: 0 0 8px 0;
  transition: top 0.15s ease;
}
.skip-link:focus {
  top: 0;
}

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
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  border-radius: 8px;
  font-size: 20px;
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
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 40px;
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.hero-eyebrow :deep(.iconify),
.hero-eyebrow :deep(svg) {
  font-size: 16px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: 36px;
  line-height: 1.3;
  margin: 0 0 16px;
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

.hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft);
  line-height: 1.7;
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 28px 0;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px 20px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 4px;
  line-height: 1.4;
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

/* ===================== Sections ===================== */
section {
  margin-bottom: 56px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-indigo);
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 16px;
}

h2 {
  font-family: var(--font-display);
  font-size: 26px;
  line-height: 1.35;
  color: var(--color-ink);
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-size: 19px;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 28px 0 12px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h4 {
  font-size: 17px;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 20px 0 8px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p {
  margin: 0 0 16px;
  color: var(--color-ink);
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
}

li {
  margin: 6px 0;
}

/* ===================== Tables ===================== */
.table-wrap {
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
  text-align: left;
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border-strong);
}

td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background: var(--color-indigo-tint);
}

/* ===================== Diagrams ===================== */
.diagram-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 24px;
  margin: 24px 0;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 12px;
}

.diagram-loading {
  text-align: center;
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 24px 0;
}

/* ===================== Code & Examples ===================== */
pre {
  background: var(--color-paper-sunken);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  margin: 16px 0;
}

code {
  font-family: var(--font-mono);
  font-size: 14px;
  background: var(--color-paper-sunken);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

pre code {
  background: none;
  padding: 0;
  border: none;
}

/* ===================== Checklists & Steps ===================== */
.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 8px 0;
}

.checklist-item :deep(.iconify),
.checklist-item :deep(svg) {
  color: var(--color-forest);
  font-size: 18px;
  flex: none;
  margin-top: 3px;
}

/* ===================== References ===================== */
.ref-group {
  margin: 24px 0;
}

.ref-group h3 {
  margin-bottom: 12px;
}

.ref-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ref-list li {
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ref-list li:last-child {
  border-bottom: none;
}

.ref-name {
  font-weight: 600;
  color: var(--color-ink);
}

.ref-desc {
  font-size: 16px;
  color: var(--color-ink-soft);
}

.ref-url {
  font-size: 16px;
  color: var(--color-indigo);
  word-break: break-all;
}

/* ===================== Responsive ===================== */
@media (max-width: 960px) {
  .sidebar-toggle {
    display: flex;
  }

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    padding: 40px 24px 80px;
  }

  .stat-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stat-row {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 28px;
  }
}
</style>
