<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "overview",
  "what-is-business-analysis",
  "task1-ba-roles-responsibilities",
  "task2-stakeholder-communication",
  "task3-requirements-gathering",
  "task4-product-roadmap",
  "task5-methodology-influence",
  "task6-validate-requirements",
  "domain4-summary",
  "study-checklist",
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
  title: "CAPM® ドメイン4：ビジネス分析フレームワーク 完全ガイド | 初学者向け解説",
  description: "PMI CAPM(R)試験ドメイン4「ビジネス分析フレームワーク」(出題比率27%)を初学者向けに解説。BAの役割、ステークホルダー・コミュニケーション、要求収集、プロダクトロードマップ、要求検証までを図解とベストプラクティスで整理。",
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

const DIAGRAM_BA_PROCESS_OVERVIEW = `flowchart LR
    A["経営課題/ビジネスニーズ"] --> B["ステークホルダー特定"]
    B --> C["要求事項の収集(Elicitation)"]
    C --> D["要求事項の分析/文書化"]
    D --> E["ソリューション設計への橋渡し"]
    E --> F["プロダクト提供/検証"]
    F --> G["ビジネス価値の実現"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`;

const DIAGRAM_STAKEHOLDER_ROLE_MAP = `flowchart TB
    subgraph INT["内部ステークホルダー"]
        I1["プロジェクトスポンサー"]
        I2["部門マネージャー"]
        I3["開発チーム"]
    end
    subgraph EXT["外部ステークホルダー"]
        E1["顧客"]
        E2["規制当局"]
        E3["サプライヤー"]
    end
    BA["ビジネスアナリスト"] --> INT
    BA --> EXT

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class BA hub;
    class I1,I2,I3,E1,E2,E3 box;`;

const DIAGRAM_BA_COMMUNICATION_FLOW = `flowchart LR
    BIZ["ビジネス側(経営層/現場部門)"] -->|"業務要求"| BA["ビジネスアナリスト"]
    BA -->|"要求仕様/ユーザーストーリー"| DEV["開発チーム"]
    DEV -->|"実現可能性/技術的制約"| BA
    BA -->|"進捗/合意結果"| BIZ

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class BIZ,DEV box;
    class BA hub;`;

const DIAGRAM_ELICITATION_DECISION_FLOW = `flowchart TB
    START["要求収集の開始"] --> Q{"ステークホルダー数は?"}
    Q -->|"少人数/キーパーソン"| INT["インタビュー"]
    Q -->|"多人数/分散"| SUR["サーベイ"]
    Q -->|"利害調整が必要"| WS["ワークショップ"]
    INT --> DOC["要求事項の文書化"]
    SUR --> DOC
    WS --> DOC
    DOC --> RTM["トレーサビリティマトリクスへ登録"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class START,INT,SUR,WS,DOC box;
    class Q hub;
    class RTM done;`;

const DIAGRAM_RTM_VS_BACKLOG_FLOW = `flowchart LR
    subgraph PRE["予測型プロジェクト"]
        R1["要求事項"] --> R2["RTM(要求トレーサビリティマトリクス)"]
        R2 --> R3["設計/テストケースへの追跡"]
    end
    subgraph AGL["アジャイルプロジェクト"]
        A1["要求事項"] --> A2["プロダクトバックログ"]
        A2 --> A3["スプリントごとの優先順位見直し"]
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class R1,R2,R3,A1,A2,A3 box;`;

const DIAGRAM_ROADMAP_NOW_NEXT_LATER = `flowchart LR
    subgraph NOW["Now(現在着手中)"]
        N1["確定仕様/開発中の機能"]
    end
    subgraph NEXT["Next(次に着手予定)"]
        X1["優先度の高いテーマ"]
    end
    subgraph LATER["Later(将来の検討事項)"]
        L1["長期的な戦略アイデア"]
    end
    NOW --> NEXT --> LATER

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class N1,X1,L1 box;`;

const DIAGRAM_METHODOLOGY_DECISION_FLOW = `flowchart TB
    METHOD{"プロジェクトの進め方"}
    METHOD -->|"予測型/計画駆動型"| PRE["要求を早期に確定/RTMで追跡/変更管理プロセスで統制"]
    METHOD -->|"アジャイル型"| AGL["要求を継続的に発見/バックログで管理/優先順位を都度調整"]
    METHOD -->|"ハイブリッド型"| HYB["フェーズごとに両者を組み合わせる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class METHOD hub;
    class PRE,AGL,HYB box;`;

const DIAGRAM_ACCEPTANCE_VALIDATION_FLOW = `flowchart TB
    ITEM["要求事項/ユーザーストーリー"] --> DOD{"DoD(完了の定義)を満たすか?"}
    DOD -->|"No"| REWORK1["品質基準を満たすまで修正"]
    DOD -->|"Yes"| AC{"受け入れ基準(AC)を満たすか?"}
    AC -->|"No"| REWORK2["要求事項に合わせて修正"]
    AC -->|"Yes"| DONE["提供可能(Ready for Delivery)"]
    REWORK1 --> DOD
    REWORK2 --> AC

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class ITEM,REWORK1,REWORK2 box;
    class DOD,AC hub;
    class DONE done;`;

const DIAGRAM_DOMAIN4_TASK_CYCLE = `flowchart TB
    T1["Task1: BAの役割と責任を理解する"] --> T2["Task2: ステークホルダーコミュニケーションを設計する"]
    T2 --> T3["Task3: 要求事項を収集する"]
    T3 --> T4["Task4: プロダクトロードマップを構築する"]
    T4 --> T5["Task5: プロジェクト手法に応じてBAプロセスを適応させる"]
    T5 --> T6["Task6: 要求事項をデリバリーを通じて検証する"]
    T6 -.->|"継続的なフィードバック"| T3

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1,T2,T3,T4,T5 box;
    class T6 done;`;
</script>

<template>
  <div>
    <button
      id="sidebarToggle"
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <div class="layout">
      <!-- ===================== Sidebar ===================== -->
      <nav
        id="sidebar"
        class="sidebar"
        aria-label="目次"
        :class="{ open: sidebarOpen }"
      >
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="brand-text">
            <div class="brand-title">CAPM® ドメイン4ガイド</div>
            <div class="brand-subtitle">ビジネス分析フレームワーク</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li><a href="#overview" :class="{ active: activeId === 'overview' }" @click="closeSidebar"><Icon name="tabler:chart-pie" />全体像</a></li>
          <li><a href="#what-is-business-analysis" :class="{ active: activeId === 'what-is-business-analysis' }" @click="closeSidebar"><Icon name="tabler:building-bank" />ビジネス分析とは</a></li>
          <li><a href="#task1-ba-roles-responsibilities" :class="{ active: activeId === 'task1-ba-roles-responsibilities' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" />Task 1: BAの役割</a></li>
          <li><a href="#task2-stakeholder-communication" :class="{ active: activeId === 'task2-stakeholder-communication' }" @click="closeSidebar"><Icon name="tabler:file-text" />Task 2: コミュニケーション</a></li>
          <li><a href="#task3-requirements-gathering" :class="{ active: activeId === 'task3-requirements-gathering' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" />Task 3: 要求収集</a></li>
          <li><a href="#task4-product-roadmap" :class="{ active: activeId === 'task4-product-roadmap' }" @click="closeSidebar"><Icon name="tabler:route" />Task 4: ロードマップ</a></li>
          <li><a href="#task5-methodology-influence" :class="{ active: activeId === 'task5-methodology-influence' }" @click="closeSidebar"><Icon name="tabler:git-branch" />Task 5: 手法とBA</a></li>
          <li><a href="#task6-validate-requirements" :class="{ active: activeId === 'task6-validate-requirements' }" @click="closeSidebar"><Icon name="tabler:list-check" />Task 6: 要求検証</a></li>
          <li><a href="#domain4-summary" :class="{ active: activeId === 'domain4-summary' }" @click="closeSidebar"><Icon name="tabler:map-2" />ドメイン4の全体フロー</a></li>
          <li><a href="#study-checklist" :class="{ active: activeId === 'study-checklist' }" @click="closeSidebar"><Icon name="tabler:flag-3" />学習チェックリスト</a></li>
          <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" />参考文献</a></li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" />PMI CAPM® Exam Content Outline準拠</div>
          <h1>ドメイン4: ビジネス分析フレームワーク(Business Analysis Frameworks)</h1>
          <p class="hero-lede">
            対象試験: PMI Certified Associate in Project Management(CAPM)® / 対象範囲: Exam Content Outline(ECO) 2023年改訂版 ドメイン4(出題比率27%) / 想定読者: CAPM初学者・ビジネスアナリスト初心者・プロジェクトチームメンバー
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">27%</div><div class="stat-label">ドメイン4の出題比率(全4ドメイン中2番目)</div></div>
            <div class="stat-card"><div class="stat-number">6</div><div class="stat-label">ドメイン4を構成するTask数</div></div>
            <div class="stat-card"><div class="stat-number">150問</div><div class="stat-label">試験全体の問題数(135問が採点対象)</div></div>
            <div class="stat-card"><div class="stat-number">180分</div><div class="stat-label">試験時間(10分の休憩を含む)</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" />
            <span>本ガイドは教育・学習支援を目的とした非公式の解説資料です。出題比率・受験要件・試験形式などの最新情報は、必ず<a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI公式サイト</a>および<a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf?rev=583ca4688c844ea59a5f84258c106146" target="_blank" rel="noopener">CAPM Exam Content Outline(公式PDF)</a>でご確認ください。</span>
          </div>
        </div>

        <!-- ===================== 01. Overview ===================== -->
        <section id="overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" />SECTION 01</div>
          <h2>ドメイン4の全体像</h2>

          <p>CAPM試験は2023年の改訂で、出題領域が次の4つのドメインに再編されました。</p>

          <div class="domain-grid">
            <div class="domain-card d1"><div class="domain-pct">36%</div><div class="domain-name">ドメイン1: プロジェクトマネジメントの基礎と中核概念</div></div>
            <div class="domain-card d2"><div class="domain-pct">17%</div><div class="domain-name">ドメイン2: 予測型・計画駆動型手法</div></div>
            <div class="domain-card d3"><div class="domain-pct">20%</div><div class="domain-name">ドメイン3: アジャイルフレームワーク / 手法</div></div>
            <div class="domain-card d4"><div class="domain-pct">27%</div><div class="domain-name">ドメイン4: ビジネス分析フレームワーク</div></div>
          </div>

          <p>ドメイン4は出題比率27%と、単独ドメインとしてはドメイン1に次いで2番目に大きい配点です。合格のためにはドメイン1と並んで最重要領域と言えます。PMIはこのECOを策定するにあたり、グローバル実務調査(GPA: Global Practice Analysis)と職務タスク分析(JTA: Job Task Analysis)を実施し、現代のプロジェクトチームメンバーが予測型・アジャイル型・ビジネス分析的アプローチを横断的に活用している実態を反映させました。</p>

          <p>ドメイン4は次の6つのタスク(Task)で構成されています。本ガイドはこの6タスクを、初学者にもわかるように1つずつ丁寧に解説し、各項目のベストプラクティスと出典を付記します。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>Task番号</th><th>タスク名</th></tr></thead>
              <tbody>
                <tr><td>Task 1</td><td>ビジネス分析(BA)の役割と責任を理解する</td></tr>
                <tr><td>Task 2</td><td>ステークホルダーとのコミュニケーション方法を決定する</td></tr>
                <tr><td>Task 3</td><td>要求事項(requirements)の収集方法を決定する</td></tr>
                <tr><td>Task 4</td><td>プロダクトロードマップを理解する</td></tr>
                <tr><td>Task 5</td><td>プロジェクト手法がビジネス分析プロセスに与える影響を判断する</td></tr>
                <tr><td>Task 6</td><td>プロダクトデリバリーを通じて要求事項を検証する</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ===================== 02. What is Business Analysis ===================== -->
        <section id="what-is-business-analysis">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 02</div>
          <h2>そもそも「ビジネス分析」とは何か</h2>

          <p>CAPM ECOにおけるビジネス分析(Business Analysis, BA)とは、組織の課題やニーズを特定し、ビジネス価値を実現するソリューションを定義・検証していく一連の活動を指します。プロジェクトマネジメント(「どうやってプロジェクトを進めるか」)に対して、ビジネス分析は「そもそも何を作るべきか・なぜそれが必要か」を明確にする活動という位置づけです。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_BA_PROCESS_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">ビジネスニーズからビジネス価値実現までの一連の流れ</div>
          </div>

          <p>CAPM ECOの参考文献リストには、<em>A Guide to the Project Management Body of Knowledge(PMBOK® Guide) - 第7版</em>に加え、<em>The PMI Guide to Business Analysis</em>(2017年)や<em>Business Analysis for Practitioners: A Practice Guide - 第2版</em>(2024年)が明記されています。これはドメイン4がPMBOK単体ではなく、ビジネス分析の専門知識体系(業界慣行を含む)を踏まえて出題されることを意味します。</p>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>CAPM ECOの巻頭には「これらの書籍を全て読むことは必須ではないが、参考にすると役立つ」と明記されています。CAPM自体はPMBOK第7版に完全準拠したものではなく、独自のJTA(職務タスク分析)に基づいて作成されています。</p>
          </div>
        </section>

        <!-- ===================== 03. Task 1 ===================== -->
        <section id="task1-ba-roles-responsibilities">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" />SECTION 03</div>
          <h2>Task 1: ビジネス分析(BA)の役割と責任を理解する</h2>

          <h3>出題内容(Enablers)</h3>
          <p>ECO原文では、Task 1は次の3つの学習項目(Enablers)で構成されています。</p>
          <ol>
            <li>ステークホルダーの役割を区別する(例: プロセスオーナー、プロセスマネージャー、プロダクトマネージャー、プロダクトオーナーなど)</li>
            <li>役割と責任がなぜ必要なのかを説明する(そもそもなぜステークホルダーを特定する必要があるのか)</li>
            <li>内部の役割と外部の役割を区別する</li>
          </ol>

          <h3>詳細解説</h3>
          <p>CAPM試験では、似た名前の役割を正確に区別できるかが頻出論点です。特に「プロダクトマネージャー」と「プロダクトオーナー」、「プロセスオーナー」と「プロセスマネージャー」の違いは混同しやすいため、以下の表で整理します。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>役割</th><th>主な責任範囲</th><th>時間軸</th><th>典型的な文脈</th></tr></thead>
              <tbody>
                <tr><td>プロセスオーナー(Process Owner)</td><td>特定の業務プロセス全体の成果に説明責任を負う</td><td>恒常的(プロセスが存在する限り継続)</td><td>業務改善 / BPM(業務プロセス管理)</td></tr>
                <tr><td>プロセスマネージャー(Process Manager)</td><td>プロセスの日々の運用・実行を管理する</td><td>日常運用ベース</td><td>業務改善 / BPM</td></tr>
                <tr><td>プロダクトマネージャー(Product Manager)</td><td>プロダクト全体のビジョン・戦略・市場適合性に責任を持つ</td><td>中長期(複数リリースにまたがる)</td><td>予測型・アジャイル型どちらでも存在しうる</td></tr>
                <tr><td>プロダクトオーナー(Product Owner)</td><td>プロダクトバックログの優先順位付けと開発チームへの要求事項伝達に責任を持つ</td><td>短期(スプリント / イテレーション単位)</td><td>Scrumなどアジャイルフレームワーク固有の役割</td></tr>
              </tbody>
            </table>
          </div>

          <p>これらの役割は、なぜ明確化する必要があるのでしょうか。ECOのEnablerが問うている「そもそもなぜステークホルダーを特定する必要があるのか」という問いに対する答えは、次の3点に整理できます。</p>
          <ul>
            <li><strong>意思決定の所在を明確にするため:</strong>誰が要求事項を承認できるのか、誰が優先順位を最終決定できるのかが曖昧だと、要求事項の手戻りや対立が発生する</li>
            <li><strong>コミュニケーション設計の起点にするため:</strong>Task 2で扱う「誰に・何を・どう伝えるか」は、まず役割を正しく把握していないと設計できない</li>
            <li><strong>説明責任(Accountability)を分散させないため:</strong>役割が重複・空白になっている箇所はプロジェクトのリスク要因になる</li>
          </ul>

          <h3>内部の役割 vs 外部の役割</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>分類</th><th>定義</th><th>具体例</th></tr></thead>
              <tbody>
                <tr><td>内部の役割(Internal Roles)</td><td>実施組織の内部に所属し、プロジェクトに関与するステークホルダー</td><td>プロジェクトスポンサー、部門マネージャー、開発チーム、社内エンドユーザー</td></tr>
                <tr><td>外部の役割(External Roles)</td><td>実施組織の外部に存在し、プロジェクトの成果に利害関係を持つステークホルダー</td><td>顧客、規制当局、サプライヤー、外部の最終利用者、パートナー企業</td></tr>
              </tbody>
            </table>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_STAKEHOLDER_ROLE_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">内部ステークホルダーと外部ステークホルダーの分類</div>
          </div>

          <p>内部/外部の区別が重要な理由は、要求事項の優先順位付けやコミュニケーション頻度の設計に直結するためです。一般に外部ステークホルダー(特に顧客や規制当局)は、内部よりも接触機会が限られるため、より計画的なコミュニケーション設計が必要になります。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>ステークホルダー特定はプロジェクト初期に一度で終わらせない。</strong>プロジェクトのライフサイクルを通じて定期的に見直す(新しい利害関係者の出現や、関心度・影響力の変化に対応するため)</li>
              <li><strong>役割名だけで判断せず、実際の権限を確認する。</strong>同じ「プロダクトオーナー」という肩書きでも、組織によって権限範囲が異なることがある</li>
              <li><strong>関心度と影響力のマトリクスを用いる。</strong>内部・外部それぞれについて関心度(Interest)と影響力(Power / Influence)で分類し、関与レベルを調整する</li>
              <li><strong>役割の重複・空白を可視化する。</strong>プロジェクト憲章やRACIチャートなどで明文化する</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 04. Task 2 ===================== -->
        <section id="task2-stakeholder-communication">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:file-text" />SECTION 04</div>
          <h2>Task 2: ステークホルダーとのコミュニケーション方法を決定する</h2>

          <h3>出題内容(Enablers)</h3>
          <ol>
            <li>最も適切なコミュニケーションチャネル / ツールを推奨する(例: レポーティング、プレゼンテーションなど)</li>
            <li>ビジネスアナリストにとって、様々なチーム間(機能、要求事項など)でコミュニケーションがなぜ重要かを説明する</li>
          </ol>

          <h3>詳細解説</h3>
          <p>ビジネスアナリストは、ビジネス側(経営層・現場部門)と開発側(エンジニアリングチーム)の「翻訳者」としての役割を担います。この橋渡しが機能しないと、要求事項が正しく伝わらず、完成したプロダクトがビジネスニーズと乖離するリスクが高まります。</p>

          <p>コミュニケーションチャネルの選定は、伝える内容の性質・受け手の役割・意思決定の緊急度によって変わります。代表的なチャネルと適した用途を以下に整理します。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>コミュニケーションチャネル</th><th>適した場面</th><th>向いていない場面</th></tr></thead>
              <tbody>
                <tr><td>レポート(定期報告書)</td><td>進捗・ステータスの記録、経営層への定期報告、監査証跡</td><td>即時の合意形成が必要な議論</td></tr>
                <tr><td>プレゼンテーション</td><td>経営層への意思決定依頼、ロードマップ共有、大人数への説明</td><td>詳細な仕様のすり合わせ</td></tr>
                <tr><td>ワークショップ / 会議</td><td>要求事項の合意形成、複雑な論点の調整</td><td>単純な進捗共有(時間コストが高い)</td></tr>
                <tr><td>チャットツール / 非同期メッセージ</td><td>開発チームとの日常的な質疑応答</td><td>フォーマルな承認記録が必要な意思決定</td></tr>
                <tr><td>ダッシュボード(可視化ツール)</td><td>リアルタイムの状況把握、複数ステークホルダーへの同時共有</td><td>背景説明や文脈を伴う複雑な情報伝達</td></tr>
              </tbody>
            </table>
          </div>

          <h3>コミュニケーションが重要な理由</h3>
          <p>ECOのEnablerが求める「なぜチーム間コミュニケーションが重要か」を説明する際は、以下の観点が有効です。</p>
          <ul>
            <li><strong>要求事項の解釈のズレを防ぐ:</strong>ビジネス側の言葉(業務用語)と開発側の言葉(技術用語)は異なるため、翻訳を怠ると仕様の誤解が生じる</li>
            <li><strong>変更の影響範囲を全員が把握する:</strong>要求事項が変わった際、関係する全チームに正しく伝わらないと手戻りが発生する</li>
            <li><strong>意思決定のスピードを保つ:</strong>適切なチャネルが選ばれていないと、承認や合意形成に不要な時間がかかる</li>
          </ul>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_BA_COMMUNICATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">ビジネス側と開発側をつなぐBAのコミュニケーション経路</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>コミュニケーション計画を明文化する。</strong>ステークホルダーごとに「誰に・何を・いつ・どのチャネルで」を明文化し、都度その場の判断に頼らない</li>
              <li><strong>受け手に応じて情報の粒度を変える。</strong>経営層向けには「結論から」「ビジネスインパクト中心」、開発チーム向けには「詳細仕様・制約条件中心」というように調整する</li>
              <li><strong>フォーマルな合意事項は記録として残す。</strong>チャットのような非同期の記録が流れやすい手段だけに頼らず、議事録やレポートとして残す</li>
              <li><strong>双方向性を意識する。</strong>開発側からの技術的フィードバック(実現可能性、工数見積もりなど)をビジネス側に正しく返す経路も設計する</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 05. Task 3 ===================== -->
        <section id="task3-requirements-gathering">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" />SECTION 05</div>
          <h2>Task 3: 要求事項の収集方法を決定する</h2>

          <h3>出題内容(Enablers)</h3>
          <ol>
            <li>ツールをシナリオに適合させる(例: ユーザーストーリー、ユースケースなど)</li>
            <li>状況に応じた要求収集アプローチを特定する(例: ステークホルダーインタビュー、サーベイ、ワークショップ、教訓収集など)</li>
            <li>要求トレーサビリティマトリクス / プロダクトバックログを説明する</li>
          </ol>
          <p>このTaskはドメイン4の中でも実務的な比重が最も大きく、CAPM試験でも頻出です。3つの論点(1. ツール選定 2. 手法選定 3. トレーサビリティ)に分けて解説します。</p>

          <h3>3-1. 要求収集(エリシテーション)の代表的な手法</h3>
          <p>要求事項を集める活動は「エリシテーション(Elicitation)」と呼ばれます。代表的な手法と、それぞれの向き・不向きを整理します。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>手法</th><th>概要</th><th>向いている場面</th><th>注意点</th></tr></thead>
              <tbody>
                <tr><td>インタビュー</td><td>1対1(または少人数)でステークホルダーに深く聞き取る</td><td>詳細な業務知識を持つキーパーソンからの深掘り</td><td>対象者が多いとスケールしない</td></tr>
                <tr><td>ワークショップ</td><td>複数ステークホルダーを集めた合意形成型のセッション</td><td>部門間で利害が対立する要求の調整、優先順位付け</td><td>準備(アジェンダ、参加者選定、会場)の負荷が高い</td></tr>
                <tr><td>サーベイ / アンケート</td><td>定型の質問票を多数の対象者に配布する</td><td>広い母集団から定量的な傾向をつかみたい場合</td><td>深掘りには不向き、設問設計の質に結果が左右される</td></tr>
                <tr><td>観察(Observation)</td><td>実際の業務やユーザー行動を直接観察する</td><td>利用者自身が言語化できていない業務プロセスの発見</td><td>時間がかかる、観察対象者の行動が変化する可能性がある</td></tr>
                <tr><td>ドキュメント分析</td><td>既存の業務マニュアル・過去の仕様書などを分析する</td><td>既存システムの現状把握、過去の意思決定の経緯確認</td><td>現行の実態と乖離している場合がある</td></tr>
                <tr><td>教訓収集(Lessons Learned)</td><td>過去の類似プロジェクトの振り返り記録を参照する</td><td>過去の失敗・成功パターンを要求定義に反映したい場合</td><td>記録が体系的に整備されていないと活用しづらい</td></tr>
              </tbody>
            </table>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_ELICITATION_DECISION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">ステークホルダー構成に応じた要求収集手法の選び方</div>
          </div>

          <h3>3-2. ユーザーストーリー vs ユースケース</h3>
          <p>CAPM ECOが明示的に例示している「ツールをシナリオに適合させる」の代表例が、ユーザーストーリーとユースケースの使い分けです。両者は似て非なるものであり、試験でも区別が問われます。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>ユーザーストーリー</th><th>ユースケース</th></tr></thead>
              <tbody>
                <tr><td>起源</td><td>アジャイル開発(Scrumなど)で発展</td><td>従来型のシステム分析・要求工学で発展</td></tr>
                <tr><td>記述の焦点</td><td>ユーザーの「何を・なぜ」欲しいか(価値中心)</td><td>システムが「どのように」振る舞うか(挙動中心)</td></tr>
                <tr><td>典型フォーマット</td><td>「〜として、〜したい。なぜなら〜だから」の短い一文</td><td>アクター、事前条件、基本フロー、代替フロー、例外フロー、事後条件を含む構造化文書</td></tr>
                <tr><td>詳細度</td><td>意図的に簡潔(詳細は会話で補う)</td><td>網羅的・厳密(例外ケースまで記述)</td></tr>
                <tr><td>適した手法</td><td>アジャイル / 要求が変化しやすいプロジェクト</td><td>予測型(ウォーターフォール) / 要求が早期に固まる複雑なシステム</td></tr>
                <tr><td>作成コストと効果</td><td>短時間で書けるが、曖昧さを会話で補う前提</td><td>作成に時間がかかるが、抜け漏れのリスクを下げられる</td></tr>
              </tbody>
            </table>
          </div>

          <p>両者は対立概念ではなく、補完的に使うことも実務上多くあります。たとえば、まずユーザーストーリーで要求の方向性を素早く合意し、複雑な業務フローや例外処理が絡む部分だけユースケースで詳細化する、という組み合わせ方です。</p>

          <h3>3-3. 要求トレーサビリティマトリクス(RTM)とプロダクトバックログ</h3>
          <p><strong>要求トレーサビリティマトリクス(Requirements Traceability Matrix, RTM)</strong>は、要求事項の出所(ステークホルダーの要望やビジネスニーズ)から、それを実現する成果物(設計・テストケースなど)までを一意に紐づけて管理する表形式のツールです。予測型プロジェクトで特によく使われます。</p>

          <p>RTMには一般的に次のような列が含まれます。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>要求ID</td><td>各要求事項を一意に識別する番号</td></tr>
                <tr><td>要求内容の説明</td><td>何を求めているかの簡潔な記述</td></tr>
                <tr><td>出所(Source)</td><td>誰が、どの文書・会議で要求したか</td></tr>
                <tr><td>優先度</td><td>ビジネス上の重要度</td></tr>
                <tr><td>対応する成果物</td><td>設計書、テストケースなど紐づく下流成果物</td></tr>
                <tr><td>ステータス</td><td>未着手 / 対応中 / 完了 / 却下などの現在状態</td></tr>
              </tbody>
            </table>
          </div>

          <p>一方、<strong>アジャイルプロジェクトにおけるプロダクトバックログ</strong>は、RTMと類似の機能(要求事項の一覧管理と優先順位付け)を果たしますが、常に変化することを前提とした「生きたリスト」である点が異なります。RTMが「網羅性と追跡可能性」を重視するのに対し、プロダクトバックログは「柔軟性と優先順位の継続的な見直し」を重視します。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_RTM_VS_BACKLOG_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">予測型プロジェクトのRTMとアジャイルプロジェクトのバックログの違い</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>要求収集の手法は単一に頼らず組み合わせる。</strong>例: ドキュメント分析で現状把握 → インタビューで深掘り → ワークショップで合意形成</li>
              <li><strong>サーベイの設問数は簡潔に保つ。</strong>一般に10問前後を目安とし、誘導的・複雑すぎる設問を避ける</li>
              <li><strong>ワークショップは事前準備を徹底する。</strong>アジェンダを共有し、適切な参加者(意思決定できる人)を招集する</li>
              <li><strong>RTMやバックログは責任者を明確にし定期的に更新する。</strong>放置すると形骸化しやすい</li>
              <li><strong>ユーザーストーリーとユースケースはプロジェクトの性質で選ぶ。</strong>予測型かアジャイルか、要求の複雑さに応じて選択する</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.bridging-the-gap.com/elicitation-techniques-business-analysts/" target="_blank" rel="noopener">Bridging the Gap - The Top 5 Elicitation Techniques Used By Business Analysts</a></li>
              <li><a href="https://sites.nd.edu/businessanalysis/?page_id=321" target="_blank" rel="noopener">Notre Dame University - Elicitation Techniques(Business Analysis)</a></li>
              <li><a href="https://craft.io/blog/use-case-vs-user-story-the-final-showdown/" target="_blank" rel="noopener">craft.io - Use Case vs. User Story: Why You'd Better Know the Difference</a></li>
              <li><a href="https://www.testrail.com/blog/requirements-traceability-matrix/" target="_blank" rel="noopener">TestRail - Requirements Traceability Matrix(RTM): A How-To Guide</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 06. Task 4 ===================== -->
        <section id="task4-product-roadmap">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 06</div>
          <h2>Task 4: プロダクトロードマップを理解する</h2>

          <h3>出題内容(Enablers)</h3>
          <ol>
            <li>プロダクトロードマップの適用方法を説明する</li>
            <li>どの構成要素がどのリリースに含まれるかを判断する</li>
          </ol>

          <h3>詳細解説</h3>
          <p><strong>プロダクトロードマップ(Product Roadmap)</strong>とは、プロダクトの方向性・優先順位・時間軸を、ステークホルダーに向けて可視化した戦略的な計画資料です。個別の機能仕様書ではなく、「なぜ・何を・いつ頃」実現するのかを俯瞰的に示すことが目的です。</p>

          <p>ロードマップにはいくつかの構成スタイルがあり、CAPM試験対策としては以下の違いを理解しておくと役立ちます。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>ロードマップの型</th><th>特徴</th><th>メリット</th><th>注意点</th></tr></thead>
              <tbody>
                <tr><td>機能ベース(Feature-based)</td><td>個別機能とリリース時期を一覧化</td><td>開発チームには分かりやすい</td><td>「なぜ作るか」が伝わりにくく、非技術系ステークホルダーには響きにくい</td></tr>
                <tr><td>テーマベース(Theme-based)</td><td>戦略的なテーマ(例: パフォーマンス改善、エンタープライズ対応)ごとに施策をグルーピング</td><td>経営層に戦略との整合性を伝えやすい</td><td>テーマの粒度が曖昧だと具体性を欠く</td></tr>
                <tr><td>アウトカムベース(Outcome-based)</td><td>達成したい成果指標(例: 解約率を10%改善)を軸に構成</td><td>「作ること」ではなく「価値を届けること」に焦点を当てられる</td><td>現場が何を作ればよいか分かりにくくなる場合がある</td></tr>
                <tr><td>Now-Next-Laterロードマップ</td><td>時間軸を厳密な日付ではなく「今 / 次 / 将来」の3段階で表現</td><td>不確実性の高いプロジェクトでも柔軟に運用できる</td><td>具体的な納期が必要なステークホルダーには物足りない</td></tr>
              </tbody>
            </table>
          </div>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_ROADMAP_NOW_NEXT_LATER" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">Now-Next-Laterロードマップの構成イメージ</div>
          </div>

          <h3>どの構成要素をどのリリースに含めるか</h3>
          <p>ECOのEnabler「どの構成要素がどのリリースに含まれるかを判断する」は、優先順位付けの実務力を問うています。判断の際に考慮すべき代表的な観点は以下の通りです。</p>
          <ul>
            <li><strong>ビジネス価値:</strong>そのリリースがもたらすインパクトの大きさ</li>
            <li><strong>依存関係:</strong>他の機能や外部要因(規制対応期限など)への依存があるか</li>
            <li><strong>技術的な実現可能性:</strong>現時点でのチームの能力やアーキテクチャで対応可能か</li>
            <li><strong>リスク:</strong>後回しにした場合の機会損失、または先に着手した場合の不確実性</li>
          </ul>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>「機能の一覧」ではなく「なぜそれをやるのか」を語る資料として設計する。</strong></li>
              <li><strong>ステークホルダーの役割に応じて表示する粒度を変える。</strong>経営層にはテーマ単位の高レベルビュー、開発チームにはリリース単位の詳細ビュー</li>
              <li><strong>厳密な日付を約束しにくい場合はNow-Next-Later形式を検討する。</strong>時間軸の曖昧さを許容できる</li>
              <li><strong>定期的なレビューサイクルを設ける。</strong>四半期ごとなど、一度作って終わりにしない</li>
              <li><strong>関連部門を含めた共同作業として維持する。</strong>営業・マーケティング・サポートなどを含め「秘密の計画書」にしない</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://dovetail.com/product-development/guide-to-outcome-based-roadmaps/" target="_blank" rel="noopener">Dovetail - Outcome-Based Roadmap Guide: Features and Best Practices</a></li>
              <li><a href="https://www.producttalk.org/product-roadmaps/" target="_blank" rel="noopener">ProductTalk - Product Roadmaps: How the Best Product Teams Plan for Uncertainty</a></li>
              <li><a href="https://www.aakashg.com/product-roadmap-best-practices/" target="_blank" rel="noopener">aakashg.com - 8 Product Roadmap Best Practices for PMs</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 07. Task 5 ===================== -->
        <section id="task5-methodology-influence">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 07</div>
          <h2>Task 5: プロジェクト手法がビジネス分析プロセスに与える影響を判断する</h2>

          <h3>出題内容(Enablers)</h3>
          <ol>
            <li>適応型(アジャイル)および / または予測型・計画駆動型アプローチにおけるビジネスアナリストの役割を判断する</li>
          </ol>

          <h3>詳細解説</h3>
          <p>このTaskはドメイン4の中で最も「統合的」な論点です。ドメイン2(予測型)とドメイン3(アジャイル型)の知識を踏まえたうえで、「その手法においてビジネスアナリストは具体的に何をするのか」を問うています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>予測型・計画駆動型プロジェクトでのBAの役割</th><th>アジャイルプロジェクトでのBAの役割</th></tr></thead>
              <tbody>
                <tr><td>要求事項の確定タイミング</td><td>プロジェクト初期にできる限り網羅的に確定させる</td><td>継続的に発見・洗練させる(バックログリファインメント)</td></tr>
                <tr><td>主な成果物</td><td>要求仕様書、RTM</td><td>ユーザーストーリー、プロダクトバックログ</td></tr>
                <tr><td>変更への向き合い方</td><td>変更管理プロセスを通じて統制する</td><td>変更を前提とし、優先順位の入れ替えで柔軟に対応する</td></tr>
                <tr><td>ステークホルダーとの関わり方</td><td>フェーズの節目(マイルストーン)で承認を得る</td><td>スプリントレビューなど頻繁な接点で継続的にフィードバックを得る</td></tr>
                <tr><td>典型的な役割名</td><td>ビジネスアナリスト、要求アナリスト</td><td>プロダクトオーナー支援、プロキシプロダクトオーナーなど</td></tr>
              </tbody>
            </table>
          </div>

          <p>ハイブリッド型(予測型とアジャイル型を組み合わせる)プロジェクトも実務では一般的であり、BAはその組み合わせ方に応じて、上記2つの役割を状況に応じて使い分けることになります。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_METHODOLOGY_DECISION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">プロジェクトの進め方によるBAアプローチの違い</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>プロジェクト開始前に手法を明確に理解する。</strong>予測型・アジャイル・ハイブリッドのいずれで進むかをBA自身が把握する</li>
              <li><strong>予測型では変更管理プロセスを厳格に運用する。</strong>変更要求の提出・影響分析・承認を通じてスコープクリープを防ぐ</li>
              <li><strong>アジャイル型ではバックログの優先順位を継続的に調整する。</strong>ステークホルダーと対話しながら見直し、固定化させない</li>
              <li><strong>ハイブリッド環境では「唯一の正」を事前に合意する。</strong>RTMかバックログか、どちらが正なのかをチームで合意し二重管理による矛盾を防ぐ</li>
            </ul>
          </div>
        </section>

        <!-- ===================== 08. Task 6 ===================== -->
        <section id="task6-validate-requirements">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 08</div>
          <h2>Task 6: プロダクトデリバリーを通じて要求事項を検証する</h2>

          <h3>出題内容(Enablers)</h3>
          <ol>
            <li>受け入れ基準(Acceptance Criteria)を定義する(状況に応じた変更を定義する行為)</li>
            <li>要求トレーサビリティマトリクス / プロダクトバックログに基づき、プロジェクト / プロダクトが提供可能な状態かを判断する</li>
          </ol>

          <h3>詳細解説</h3>
          <p><strong>受け入れ基準(Acceptance Criteria)</strong>とは、ある要求事項(ユーザーストーリーや機能)が「完成した」と認められるために満たすべき、具体的で検証可能な条件のことです。「動くかどうか」ではなく「合意した基準を満たしているかどうか」を判定する点が重要です。</p>

          <p>受け入れ基準と混同されやすい概念に<strong>完了の定義(Definition of Done, DoD)</strong>があります。両者の違いを整理します。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>受け入れ基準(Acceptance Criteria)</th><th>完了の定義(Definition of Done)</th></tr></thead>
              <tbody>
                <tr><td>適用範囲</td><td>個々の要求事項(ユーザーストーリーなど)ごとに固有</td><td>チーム全体・プロジェクト全体に共通する普遍的な基準</td></tr>
                <tr><td>内容の例</td><td>「検索語を3文字以上入力すると部分一致検索が行われる」</td><td>「コードレビュー完了」「単体テスト合格」「ドキュメント更新済み」</td></tr>
                <tr><td>主な作成者</td><td>プロダクトオーナー / ステークホルダーが主導し、チームと合意</td><td>チーム全体で協議して定義</td></tr>
                <tr><td>目的</td><td>その要求事項固有の合格ラインを示す</td><td>品質のばらつきをなくし、常に一定水準の完成度を担保する</td></tr>
              </tbody>
            </table>
          </div>

          <p>両者は対立するものではなく、<strong>「DoD(チーム共通の品質基準)を満たした上で、さらに個別の受け入れ基準(その要求固有の条件)も満たす」</strong>という二重のチェックとして機能します。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_ACCEPTANCE_VALIDATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">DoDと受け入れ基準による二段階の検証フロー</div>
          </div>

          <h3>RTM / プロダクトバックログを用いた提供可否の判断</h3>
          <p>Task 3で扱ったRTM・プロダクトバックログは、Task 6では「検証のためのチェックリスト」として再利用されます。具体的には次のように活用します。</p>
          <ul>
            <li><strong>予測型プロジェクト:</strong>RTM上ですべての要求事項が「テスト完了」「承認済み」ステータスになっているかを確認し、未完了・未承認の項目が残っていないかを精査する</li>
            <li><strong>アジャイルプロジェクト:</strong>プロダクトバックログ上で、当該リリースに含める予定だった項目がすべて受け入れ基準を満たし「完了」状態になっているかを確認する</li>
          </ul>
          <p>いずれの場合も、<strong>トレーサビリティ(要求の出所から成果物までの追跡可能性)が確保されていること自体が、検証プロセスの土台</strong>になります。追跡が取れていない要求事項は、そもそも「満たされたかどうか」を客観的に判定できません。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>受け入れ基準は要求事項を書く段階で同時に定義する。</strong>後回しにすると、開発側の解釈と食い違うリスクが高まる</li>
              <li><strong>受け入れ基準は共同で作成する。</strong>開発チーム・テスト担当・ステークホルダーが共同で作成し、プロダクトオーナーだけが一方的に決めない</li>
              <li><strong>検証可能な言葉で書く。</strong>「使いやすいこと」などの曖昧な表現を避け、具体的な数値・条件で書く</li>
              <li><strong>DoDは定期的に見直す。</strong>一度決めたら固定せず、チームの成熟度やプロジェクトの状況に応じて見直す</li>
              <li><strong>提供可否は客観的な根拠に基づいて判断する。</strong>RTM / バックログ上のステータスを根拠にし、感覚的な「終わった気がする」で判断しない</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.atlassian.com/work-management/project-management/acceptance-criteria" target="_blank" rel="noopener">Atlassian - What is Acceptance Criteria? Definition, Examples, &amp; Tips</a></li>
              <li><a href="https://www.altexsoft.com/blog/acceptance-criteria-purposes-formats-and-best-practices/" target="_blank" rel="noopener">AltexSoft - Acceptance Criteria: Purposes, Types, Examples and Best Practices</a></li>
              <li><a href="https://nulab.com/learn/software-development/definition-of-done-vs-acceptance-criteria/" target="_blank" rel="noopener">Nulab - Definition of Done vs. Acceptance Criteria: A complete guide</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 09. Domain4 Summary ===================== -->
        <section id="domain4-summary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" />SECTION 09</div>
          <h2>ドメイン4 全体像の整理</h2>

          <p>最後に、6つのTaskがどのように連動しているかを1枚のフローで俯瞰します。ビジネス分析は「役割の特定」から始まり、「コミュニケーション」「要求収集」「ロードマップ」「手法適応」を経て、「検証」に至る循環的なプロセスであることを意識してください。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram :chart="DIAGRAM_DOMAIN4_TASK_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              </ClientOnly>
            </div>
            <div class="diagram-caption">Task1からTask6までの連動関係と継続的フィードバック</div>
          </div>
        </section>

        <!-- ===================== 10. Study Checklist ===================== -->
        <section id="study-checklist">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 10</div>
          <h2>学習チェックリスト</h2>

          <p>CAPM本試験に臨む前に、以下の項目を自己確認してください。</p>
          <ul>
            <li>プロセスオーナー / プロセスマネージャー / プロダクトマネージャー / プロダクトオーナーの違いを、それぞれ一言で説明できる</li>
            <li>内部ステークホルダーと外部ステークホルダーの具体例を、それぞれ3つ以上挙げられる</li>
            <li>コミュニケーションチャネル(レポート・プレゼン・ワークショップなど)を、目的に応じて使い分けられる</li>
            <li>インタビュー・ワークショップ・サーベイ・観察・ドキュメント分析の使い分けを説明できる</li>
            <li>ユーザーストーリーとユースケースの違いを、フォーマットと適用場面の両面から説明できる</li>
            <li>RTM(要求トレーサビリティマトリクス)とプロダクトバックログの違いと共通点を説明できる</li>
            <li>プロダクトロードマップの型(機能ベース / テーマベース / アウトカムベース / Now-Next-Later)を区別できる</li>
            <li>予測型プロジェクトとアジャイルプロジェクトで、BAの役割がどう変わるかを説明できる</li>
            <li>受け入れ基準(Acceptance Criteria)と完了の定義(DoD)の違いを説明できる</li>
            <li>RTM / バックログのステータスに基づいてプロダクトの提供可否を判断する手順を説明できる</li>
          </ul>
        </section>

        <!-- ===================== 11. References ===================== -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 11</div>
          <h2>参考文献・出典(Sources)</h2>

          <p>本ガイドの一次情報源および各項目の根拠として参照した情報源を以下に示します。</p>

          <div class="ref-group">
            <h3>PMI公式資料</h3>
            <ul class="ref-list">
              <li><span class="ref-name">PMI - Certified Associate in Project Management(CAPM)® Certification(公式認定ページ)</span><a class="ref-url" href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">https://www.pmi.org/certifications/certified-associate-capm</a></li>
              <li><span class="ref-name">PMI - CAPM Exam Content Outline(2023年改訂版・公式PDF)</span><a class="ref-url" href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf?rev=583ca4688c844ea59a5f84258c106146" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>要求収集・トレーサビリティ関連</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Bridging the Gap - The Top 5 Elicitation Techniques Used By Business Analysts</span><a class="ref-url" href="https://www.bridging-the-gap.com/elicitation-techniques-business-analysts/" target="_blank" rel="noopener">https://www.bridging-the-gap.com/elicitation-techniques-business-analysts/</a></li>
              <li><span class="ref-name">Notre Dame University - Elicitation Techniques(Business Analysis)</span><a class="ref-url" href="https://sites.nd.edu/businessanalysis/?page_id=321" target="_blank" rel="noopener">https://sites.nd.edu/businessanalysis/?page_id=321</a></li>
              <li><span class="ref-name">Business Analyst's Toolkit - Elicitation Techniques to Gather Business Requirements</span><a class="ref-url" href="https://businessanalyststoolkit.com/ba-essentials-elicitation-techniques/" target="_blank" rel="noopener">https://businessanalyststoolkit.com/ba-essentials-elicitation-techniques/</a></li>
              <li><span class="ref-name">TestRail - Requirements Traceability Matrix(RTM): A How-To Guide</span><a class="ref-url" href="https://www.testrail.com/blog/requirements-traceability-matrix/" target="_blank" rel="noopener">https://www.testrail.com/blog/requirements-traceability-matrix/</a></li>
              <li><span class="ref-name">CIO.com - Business requirements: Tracing project deliverables to business goals</span><a class="ref-url" href="https://www.cio.com/article/220411/business-requirements-tracing-project-deliverables-to-business-goals.html" target="_blank" rel="noopener">https://www.cio.com/article/220411/business-requirements-tracing-project-deliverables-to-business-goals.html</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>ユーザーストーリー・ユースケース関連</h3>
            <ul class="ref-list">
              <li><span class="ref-name">craft.io - Use Case vs. User Story: Why You'd Better Know the Difference</span><a class="ref-url" href="https://craft.io/blog/use-case-vs-user-story-the-final-showdown/" target="_blank" rel="noopener">https://craft.io/blog/use-case-vs-user-story-the-final-showdown/</a></li>
              <li><span class="ref-name">UXtweak - Use Case VS User Story: Difference Explained with Examples</span><a class="ref-url" href="https://blog.uxtweak.com/use-case-vs-user-stories/" target="_blank" rel="noopener">https://blog.uxtweak.com/use-case-vs-user-stories/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>プロダクトロードマップ関連</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Dovetail - Outcome-Based Roadmap Guide: Features and Best Practices</span><a class="ref-url" href="https://dovetail.com/product-development/guide-to-outcome-based-roadmaps/" target="_blank" rel="noopener">https://dovetail.com/product-development/guide-to-outcome-based-roadmaps/</a></li>
              <li><span class="ref-name">ProductTalk - Product Roadmaps: How the Best Product Teams Plan for Uncertainty</span><a class="ref-url" href="https://www.producttalk.org/product-roadmaps/" target="_blank" rel="noopener">https://www.producttalk.org/product-roadmaps/</a></li>
              <li><span class="ref-name">aakashg.com - 8 Product Roadmap Best Practices for PMs</span><a class="ref-url" href="https://www.aakashg.com/product-roadmap-best-practices/" target="_blank" rel="noopener">https://www.aakashg.com/product-roadmap-best-practices/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>受け入れ基準・完了の定義関連</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Atlassian - What is Acceptance Criteria? Definition, Examples, &amp; Tips</span><a class="ref-url" href="https://www.atlassian.com/work-management/project-management/acceptance-criteria" target="_blank" rel="noopener">https://www.atlassian.com/work-management/project-management/acceptance-criteria</a></li>
              <li><span class="ref-name">AltexSoft - Acceptance Criteria: Purposes, Types, Examples and Best Practices</span><a class="ref-url" href="https://www.altexsoft.com/blog/acceptance-criteria-purposes-formats-and-best-practices/" target="_blank" rel="noopener">https://www.altexsoft.com/blog/acceptance-criteria-purposes-formats-and-best-practices/</a></li>
              <li><span class="ref-name">Nulab - Definition of Done vs. Acceptance Criteria: A complete guide</span><a class="ref-url" href="https://nulab.com/learn/software-development/definition-of-done-vs-acceptance-criteria/" target="_blank" rel="noopener">https://nulab.com/learn/software-development/definition-of-done-vs-acceptance-criteria/</a></li>
            </ul>
          </div>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>本ガイドはCAPM Exam Content Outline(2023年改訂版)を一次情報源として作成していますが、非公式の学習補助資料であり、PMIによる公認・保証を受けたものではありません。最新の出題範囲・登録要件は必ずPMI公式サイトでご確認ください。</p>
          </div>
        </section>

        <footer>
          CAPM®、PMBOK®、PMIはProject Management Institute, Inc.の登録商標です。本ページはPMIとは独立して作成された非公式の学習補助資料であり、PMIによる公認・提携関係はありません。
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
  line-height: 1.6;
}

.disclaimer-box :deep(.iconify) {
  font-size: 18px;
  color: var(--color-info-text);
  flex: none;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}

/* ===================== Sections ===================== */
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

.section-eyebrow :deep(.iconify) {
  font-size: 17px;
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

.mermaid-wrap {
  width: 100%;
}

.diagram-card .diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 14px;
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
.ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; }

/* ===================== Footer ===================== */
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
  .domain-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .stat-row { grid-template-columns: 1fr; }
  .domain-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar { transition: none; }
}
</style>
