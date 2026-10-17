<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { nextTick, ref } from "vue";
import { useActiveHeading } from "~/composables/useActiveHeading";

const LIGHT_THEME_VARS = {
  fontSize: "16px",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#4B5566",
  secondaryColor: "#EAF4EC",
  tertiaryColor: "#FAF1DF",
};

const DIAGRAM_PORTFOLIO_HIERARCHY = `flowchart TB
A["組織の戦略目標"] --> B["ポートフォリオ 複数のプログラム・プロジェクトの集合"]
B --> C["プログラム1 アウトカムとベネフィットの実現"]
B --> D["プログラム2 アウトカムとベネフィットの実現"]
C --> E["プロジェクトA アウトプットの提供"]
C --> F["プロジェクトB アウトプットの提供"]
C --> G["その他の活動 BAUへの移行支援など"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B box;
class C,D box;
class E,F,G done;`;

const DIAGRAM_FRAMEWORK_LAYERS = `flowchart TB
subgraph P["原則 Principles ― 常に守るべき指針"]
direction LR
P1["Lead with purpose"]
P2["Collaborate across boundaries"]
P3["Deal with ambiguity"]
P4["Align with priorities"]
P5["Deploy diverse skills"]
P6["Realize measurable benefits"]
P7["Bring pace and value"]
end
subgraph T["テーマ Themes ― ガバナンスの仕組み"]
direction LR
T1["Organization"]
T2["Design"]
T3["Justification"]
T4["Structure"]
T5["Knowledge"]
T6["Assurance"]
T7["Decisions"]
end
subgraph PR["プロセス Processes ― ライフサイクルの経路"]
direction LR
PR1["Identify"]
PR2["Design"]
PR3["Plan"]
PR4["Deliver"]
PR5["Embed"]
PR6["Evaluate"]
PR7["Close"]
end
P -->|"ガバナンスに落とし込む"| T
T -->|"実践に移す"| PR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P1,P2,P3,P4,P5,P6,P7,T1,T2,T3,T4,T5,T6,T7,PR1,PR2,PR3,PR4,PR5,PR6,PR7 box;`;

const DIAGRAM_THEMES_OVERVIEW = `flowchart TB
TH["7つのテーマ ライフサイクル全体を通じて並行・継続的に適用 適用の順序はない"]
TH --- O["Organization 誰が意思決定するか"]
TH --- D["Design どんな未来を目指すか"]
TH --- J["Justification 投資として妥当か"]
TH --- S["Structure どう計画・実行するか"]
TH --- K["Knowledge 何を学び蓄積するか"]
TH --- A["Assurance 本当に正しく進んでいるか"]
TH --- DE["Decisions どう意思決定するか"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class O,D,J,S,K,A,DE box;
class TH hub;`;

const DIAGRAM_ORG_STRUCTURE = `flowchart TB
SG["Sponsoring Group スポンサリンググループ"] --> PB["Programme Board プログラムボード"]
PB --> SRO["SRO Senior Responsible Owner"]
PB --> PM["Programme Manager"]
PB --> BCM["Business Change Manager"]
PB --> POL["Programme Office Lead"]
PM --> PO["Programme Office 情報のハブ"]
PM --> PR1["プロジェクト1"]
PM --> PR2["プロジェクト2"]
BCM --> BAU["ビジネス部門 BAUへの定着"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SG,PB,PM,BCM,POL,PR1,PR2,BAU box;
class SRO,PO hub;`;

const DIAGRAM_DESIGN_CHAIN = `flowchart LR
V["Vision 望ましい未来の姿"] --> TOM["Target Operating Model 役割・文化・プロセス・技術・ 情報とデータ・知識と学習"]
TOM --> BM["Benefits Map アウトプット→アウトカム→ベネフィット"]
BM --> R["初期リスクの識別と優先順位づけ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class V,TOM,BM,R box;`;

const DIAGRAM_DECISION_FLOW = `flowchart TB
E["事象の発生"] --> Q{"種類は？"}
Q -->|"将来のリスク"| RR["Risk Register に登録"]
Q -->|"既に発生した課題"| IR["Issue Register に登録"]
RR --> DA["Decision-Making Approach に基づき対応レベルを判断"]
IR --> DA
DA -->|"プロジェクトレベルで対応可能"| PJ["プロジェクトチームで解決"]
DA -->|"プログラムへの影響が大きい"| PB2["Programme Boardへエスカレーション"]
PJ --> DR["Decision Register に記録"]
PB2 --> DR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class E,RR,IR,PJ,DR box;
class Q,DA,PB2 hub;`;

const DIAGRAM_LIFECYCLE_FLOW = `flowchart TB
M["プログラムマンデート"] --> P1["1. Identify the Programme プログラムを識別する"]
P1 --> GATE1{"認可の判断"}
GATE1 -->|"Go"| P2
GATE1 -->|"No-Go 認可されず"| P7
subgraph CYCLE["トランシェごとに繰り返すサイクル"]
direction TB
P2["2. Design the Outcomes アウトカムをデザインする"]
P3["3. Plan Progressive Delivery 段階的デリバリーを計画する"]
P4["4. Deliver the Capabilities ケイパビリティを届ける"]
P5["5. Embed the Outcomes アウトカムを定着させる"]
P6["6. Evaluate New Information 新しい情報を評価する"]
P2 --> P3 --> P4 --> P5 --> P6
end
P6 --> GATE2{"継続判断 Go・No-Go"}
GATE2 -->|"Go 次のトランシェへ"| P2
GATE2 -->|"No-Go 目標達成 または これ以上の投資価値なし"| P7["7. Close the Programme プログラムをクローズする"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class M,P1,P2,P3,P4,P5,P6 box;
class GATE1,GATE2 hub;
class P7 done;`;

const DIAGRAM_GOVERNANCE_STRUCTURE = `flowchart TB
CG["Corporate Governing Body and Audit Committee 企業の統治機関"] --> SG["Sponsoring Group スポンサリンググループ"]
SG --> PB["Programme Board プログラムボード"]
PB --> DEL["Deliver the Capabilities プロジェクト群によるアウトプット提供"]
PB --> BO["Business Operations BCMを通じたビジネス運用への定着"]
BO -.->|"実績・課題のフィードバック"| CG

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SG,PB,DEL,BO box;
class CG hub;`;

const DIAGRAM_BENEFITS_FLOW = `flowchart LR
OUT["アウトプット プロジェクトの成果物"] --> OC["アウトカム 業務・行動の変化"]
OC --> BEN["ベネフィット 測定可能な改善"]
BEN --> OBJ["組織目標への貢献"]
OC -.->|"意図しない場合"| DIS["ディスベネフィット 測定可能な悪化"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class OUT,OC,BEN,OBJ box;
class DIS hub;`;

const DIAGRAM_THREE_LINES = `flowchart TB
L1["第1線 現場のマネジメント プロジェクト・プログラムの 日常的なマネジメントコントロール"]
L2["第2線 監視機能 リスク管理・品質管理・ コンプライアンス機能による監督"]
L3["第3線 独立監査 内部監査など、 第1線・第2線から独立した保証"]
L1 --> L2 --> L3
L3 -.->|"経営層・監査委員会への報告"| GOV["Corporate Governing Body"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class L1,L2,L3 box;
class GOV hub;`;

const TOC_IDS = [
  "what-is-msp",
  "exam-overview",
  "programme-project-portfolio",
  "framework-structure",
  "principles",
  "themes",
  "lifecycle",
  "governance",
  "benefits",
  "risk-decisions",
  "assurance",
  "tailoring",
  "checklist",
  "anti-patterns",
  "glossary",
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
  title: "MSP® Foundation 5th edition 完全学習ガイド | Managing Successful Programmes",
  description: "PeopleCert MSP Foundation, 5th edition の出題範囲を、初学者向けにステップバイステップで解説した日本語の学習ガイド。",
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
          <svg class="seal" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="36" height="36" rx="8" fill="#EEF1F8"/>
            <path d="M10 24L18 10L26 24H10Z" stroke="#2E3F72" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="18" cy="19" r="2" fill="#B8802A"/>
          </svg>
          <div class="brand-text">
            <div class="brand-title">MSP 5th Guide</div>
            <div class="brand-subtitle">Foundation 学習ガイド</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li class="nav-group-label">導入・概要</li>
          <li><a href="#what-is-msp" :class="{ active: activeId === 'what-is-msp' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />MSPとは何か</a></li>
          <li><a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />試験の全体像</a></li>
          <li><a href="#programme-project-portfolio" :class="{ active: activeId === 'programme-project-portfolio' }" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />プログラムとプロジェクトの違い</a></li>
          <li><a href="#framework-structure" :class="{ active: activeId === 'framework-structure' }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />フレームワーク全体構造</a></li>

          <li class="nav-group-label">中核概念</li>
          <li><a href="#principles" :class="{ active: activeId === 'principles' }" @click="closeSidebar"><Icon name="tabler:target-arrow" aria-hidden="true" />7つの原則</a></li>
          <li><a href="#themes" :class="{ active: activeId === 'themes' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" aria-hidden="true" />7つのテーマ</a></li>
          <li><a href="#lifecycle" :class="{ active: activeId === 'lifecycle' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />7つのプロセス</a></li>

          <li class="nav-group-label">実践と管理</li>
          <li><a href="#governance" :class="{ active: activeId === 'governance' }" @click="closeSidebar"><Icon name="tabler:shield-check" aria-hidden="true" />ガバナンスと組織構造</a></li>
          <li><a href="#benefits" :class="{ active: activeId === 'benefits' }" @click="closeSidebar"><Icon name="tabler:chart-pie" aria-hidden="true" />ベネフィット管理</a></li>
          <li><a href="#risk-decisions" :class="{ active: activeId === 'risk-decisions' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />リスク・意思決定管理</a></li>
          <li><a href="#assurance" :class="{ active: activeId === 'assurance' }" @click="closeSidebar"><Icon name="tabler:scale" aria-hidden="true" />アシュアランス</a></li>
          <li><a href="#tailoring" :class="{ active: activeId === 'tailoring' }" @click="closeSidebar"><Icon name="tabler:refresh" aria-hidden="true" />テーラリング</a></li>

          <li class="nav-group-label">試験対策・参考</li>
          <li><a href="#checklist" :class="{ active: activeId === 'checklist' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />チェックリスト</a></li>
          <li><a href="#anti-patterns" :class="{ active: activeId === 'anti-patterns' }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />アンチパターン</a></li>
          <li><a href="#glossary" :class="{ active: activeId === 'glossary' }" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />用語集</a></li>
          <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献</a></li>
        </ul>
      </aside>

      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />PeopleCert MSP Foundation 5th edition</div>
          <h1>MSP Foundation, 5th edition 完全学習ガイド</h1>
          <p class="hero-lede">
            Managing Successful Programmes(プログラムマネジメント)― 初学者向け・出題範囲対応版
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">7</div><div class="stat-label">原則(Principles)</div></div>
            <div class="stat-card"><div class="stat-number">7</div><div class="stat-label">テーマ(Themes)</div></div>
            <div class="stat-card"><div class="stat-number">7</div><div class="stat-label">プロセス(Processes)</div></div>
            <div class="stat-card"><div class="stat-number">60問</div><div class="stat-label">60分・合格基準60%</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>本ガイドは <a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-foundation-5th-edition-2930" target="_blank" rel="noopener">PeopleCert</a>(旧 AXELOS)が提供する <strong>MSP Foundation, 5th edition</strong> 試験の出題範囲をベースに、初学者でも理解できるようステップバイステップで解説したものです。PeopleCert は MSP を「<strong>PRINCE2 Programme Management(Version 5)</strong>」へリブランディングすることを発表しており、パートナー向けの準備は2025年9月22日の週、一部教材の更新は同年10月20日の週、商用ローンチは同年11月17日の週に実施されました。ガイダンスの内容自体に変更はなく、資格名・教材名は引き続き「MSP」「MSP 5th edition」が広く使われています。本ガイドでも従来通り「MSP」の呼称を用います。</span>
          </div>
        </div>

        <!-- Section 1 -->
        <section id="what-is-msp">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
          <h2>はじめに ― MSPとは何か</h2>

          <p><strong>MSP(Managing Successful Programmes)</strong> は、複数のプロジェクトや関連活動を束ねて組織の戦略的な目標を達成するための「プログラムマネジメント」のベストプラクティス・フレームワークです。PeopleCert(2021年に AXELOS を買収)が提供しており、PRINCE2 や MoP(Management of Portfolios)と同じファミリーに属する資格体系の一つです。</p>

          <p>MSPが解決しようとしている課題は明確です。多くの組織変革プログラムは、次のような理由で失敗します。</p>

          <ul>
            <li>個々のプロジェクトは順調に進んでいても、組織全体として期待した便益(ベネフィット)が得られない</li>
            <li>プロジェクト間の依存関係や優先順位の調整ができていない</li>
            <li>経営層のスポンサーシップが弱く、変化への抵抗に対処できない</li>
            <li>環境変化(市場・規制・技術)にプログラムが追従できない</li>
          </ul>

          <p>MSP 5th edition(2020年公開)は、こうした失敗パターンに関する調査結果を踏まえ、デジタル変革の加速、アジャイルワークの普及、不確実性の増大に対応できるよう、2011年版から大幅に構造を見直したものです。</p>

          <h3>5th edition での主な変更点</h3>

          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>4th edition(2011年版)</th><th>5th edition(2020年版)</th></tr></thead>
              <tbody>
                <tr><td>テーマ数</td><td>9つの「ガバナンステーマ」</td><td>7つの「テーマ」(各テーマ名は単語1つで表現)</td></tr>
                <tr><td>原則数</td><td>7原則(一部異なる表現)</td><td>7原則(新規に「境界を越えた協働」「曖昧さへの対処」を追加)</td></tr>
                <tr><td>ブループリント</td><td>Blueprint</td><td><strong>Target Operating Model(TOM)</strong> に改称し、内容を拡充</td></tr>
                <tr><td>プロセス数</td><td>6つのトランスフォーメーショナルフロー</td><td><strong>7つのプロセス</strong>(Evaluate New Information が新設)</td></tr>
                <tr><td>適用の柔軟性</td><td>比較的固定的</td><td>4つの「プログラムの動機(ドライバー)」シナリオに基づくテーラリングを明示</td></tr>
                <tr><td>デリバリー方式</td><td>ウォーターフォール前提が強い</td><td>アジャイル / ウォーターフォール / ハイブリッドを問わず適用可能な設計</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>PeopleCert公式製品ページ(後掲)、Henny Portman氏によるMSP 5th/2011版比較記事、PM Today誌の解説記事を基に構成。</li>
            </ul>
          </div>
        </section>

        <!-- Section 2 -->
        <section id="exam-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 02</div>
          <h2>試験の全体像</h2>

          <p>MSP Foundation, 5th edition の試験概要は以下の通りです(2026年9月時点、PeopleCert公式サイトの記載に基づく)。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>問題数</td><td>60問</td></tr>
                <tr><td>出題形式</td><td>四肢択一(Multiple choice)</td></tr>
                <tr><td>試験時間</td><td>60分</td></tr>
                <tr><td>教材持ち込み</td><td>不可(Closed book)</td></tr>
                <tr><td>合格基準</td><td>60%以上(60問中36問以上の正答)</td></tr>
                <tr><td>対応言語</td><td>英語・中国語</td></tr>
                <tr><td>資格更新</td><td>3年ごと(PeopleCert Plus で CPDポイント 60点を記録するか、更新期限までにプロダクトスイート内の別資格を取得することで更新可能)</td></tr>
                <tr><td>前提資格</td><td>なし(Foundationは誰でも受験可能)</td></tr>
                <tr><td>主な対象者</td><td>プロジェクトマネージャー、シニアプロジェクトマネージャー、プログラムマネージャー、ポートフォリオマネージャー、ビジネスチェンジマネージャー、ベネフィットマネージャー、SRO、ビジネスアナリストなど</td></tr>
              </tbody>
            </table>
          </div>

          <p>出題の柱は次の3点に整理されます。</p>

          <ol>
            <li><strong>原則(Principles)を状況に照らして理解しているか</strong></li>
            <li><strong>テーマ(Themes)とその主要概念・関連文書を理解しているか</strong></li>
            <li><strong>プロセス(Processes)=プログラムライフサイクルの流れを理解しているか</strong></li>
          </ol>

          <p>上位資格である MSP Practitioner では、これらを「実際の状況に適用・テーラリングできるか」まで問われますが、Foundationはあくまで知識理解が中心です。</p>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-foundation-5th-edition-2930" target="_blank" rel="noopener">https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-foundation-5th-edition-2930</a></li>
            </ul>
          </div>
        </section>

        <!-- Section 3 -->
        <section id="programme-project-portfolio">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 03</div>
          <h2>プログラム・プロジェクト・ポートフォリオの違い</h2>

          <p>MSPを学ぶ最初のステップは、「プログラム」という言葉の定義を正確に理解することです。</p>

          <ul>
            <li><strong>プロジェクト(Project)</strong>: 合意されたビジネスケースに従って、1つまたは複数の「アウトプット(成果物)」を生み出すための一時的な組織。比較的短期間で完結する。</li>
            <li><strong>プログラム(Programme)</strong>: 関連する複数のプロジェクトやその他の活動を調整・指揮・監督するために作られた、一時的で柔軟な組織。組織の戦略目標に関連する「<strong>アウトカム(結果)</strong>」と「<strong>ベネフィット(便益)</strong>」を届けることを目的とし、多くの場合、数年にわたって存続する。</li>
            <li><strong>ポートフォリオ(Portfolio)</strong>: 組織(またはその一部)が投資対効果を最大化するために管理する、プログラムとプロジェクトの全体集合。</li>
          </ul>

          <p>重要な違いは、<strong>プロジェクトは「アウトプット」を扱い、プログラムは「アウトカムとベネフィット」を扱う</strong>という点です。プログラムマネジメントとプロジェクトマネジメントは対立する概念ではなく、補完関係にあります。プログラムのライフサイクルの中で、複数のプロジェクトが立ち上げられ、実行され、クローズされていきます。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PORTFOLIO_HIERARCHY" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">プログラム・プロジェクト・ポートフォリオの違い</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <p>組織でプログラムマネジメントを導入する際は、まず「これはプログラムとして扱うべき取り組みなのか、それとも単一の大規模プロジェクトで十分なのか」を見極めることが重要です。目安として、①複数のプロジェクトの調整が必要、②組織横断的な変革を伴う、③ベネフィットの実現に組織の業務プロセスや文化そのものの変化が必要、のいずれかに該当する場合はプログラムとして扱うべきとされています。</p>
          </div>
        </section>

        <!-- Section 4 -->
        <section id="framework-structure">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 04</div>
          <h2>MSPフレームワークの全体構造</h2>

          <p>MSP 5th edition は、<strong>7つの原則(Principles)・7つのテーマ(Themes)・7つのプロセス(Processes)</strong> という3層構造で構成されています。</p>

          <ul>
            <li><strong>原則(Principles)</strong>: プログラムマネジメントから価値を得るために、常に守り続けるべき「指針となる要請事項」。プログラムの識別からクローズまで一貫して適用される、最も普遍的なレイヤー。</li>
            <li><strong>テーマ(Themes)</strong>: 原則をガバナンスに落とし込む「本質的な側面」。組織構造・文書・役割など、統制のための仕組みを定義する。</li>
            <li><strong>プロセス(Processes)</strong>: テーマを通じて原則を実践に移す「プログラムライフサイクルの経路」。時系列で具体的にどう進めるかを示す。</li>
          </ul>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FRAMEWORK_LAYERS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">MSPフレームワークの全体構造</div>
          </div>

          <p><strong>関係性のポイント(試験頻出)</strong></p>

          <ul>
            <li>原則は「なぜ」を示し、テーマは「何を」統制すべきかを示し、プロセスは「いつ・どう」実行するかを示す。</li>
            <li>7つのテーマは、プログラムライフサイクルの各プロセスの中で<strong>繰り返し適用</strong>される(一度定義して終わりではない)。</li>
            <li>「7・7・7」という数字の組み合わせは頻出の記憶ポイントである。</li>
          </ul>
        </section>

        <!-- Section 5 -->
        <section id="principles">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target-arrow" aria-hidden="true" />SECTION 05</div>
          <h2>7つの原則(Principles)</h2>

          <p>原則は、プログラムマネジメントの成功のために継続的に守られるべき「指針となる要請事項」です。原則自体は証明を必要とせず(self-validating)、経験的に正しいと認められているという特徴を持ちます。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>#</th><th>原則(英語)</th><th>日本語での意味合い</th><th>要点</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Lead with purpose</td><td>目的を持ってリードする</td><td>SROを中心に、明確な意図とビジョンを持ってプログラムを主導し、変化への抵抗を乗り越える強いリーダーシップを発揮する</td></tr>
                <tr><td>2</td><td>Collaborate across boundaries</td><td>境界を越えて協働する</td><td>組織・部門・サプライヤーなど複数の境界をまたぐ関係者の間で、効果的な横断的ガバナンスを築く</td></tr>
                <tr><td>3</td><td>Deal with ambiguity</td><td>曖昧さに対処する</td><td>プログラムに内在するVUCA(変動性・不確実性・複雑性・曖昧性)を受け入れ、目を開いた(eyes-open)意思決定を行う</td></tr>
                <tr><td>4</td><td>Align with priorities</td><td>優先順位に整合させる</td><td>プログラムを組織の戦略的優先事項と継続的に整合させ、環境変化に応じて見直す</td></tr>
                <tr><td>5</td><td>Deploy diverse skills</td><td>多様なスキルを投入する</td><td>プログラムの成功に必要な、幅広く多様な専門性・経験を持つ人材を確保し活用する</td></tr>
                <tr><td>6</td><td>Realize measurable benefits</td><td>測定可能なベネフィットを実現する</td><td>ベネフィットを定義し、追跡し、実際に実現することにプログラムの焦点を当て続ける</td></tr>
                <tr><td>7</td><td>Bring pace and value</td><td>ペースと価値をもたらす</td><td>早期かつ継続的に価値を届けるペース配分を行い、学びを次のトランシェ(段階)に活かす</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>原則は「チェックリスト」ではなく「判断基準」として使う。個々の意思決定の場面で「この選択はどの原則に沿っているか / 反しているか」を問い直す習慣を持つ。</li>
              <li>7原則すべてを一度に完璧に満たそうとするのではなく、プログラムの置かれた状況(後述のテーラリングのドライバー)に応じて、どの原則が特に重要かの優先順位を意識する。</li>
              <li>「Deal with ambiguity」は2011年版になかった新原則であり、不確実性の高い変革プログラムほど重視される。曖昧さを排除しようとするのではなく、リスクを可視化した上で前進する判断力が問われる。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>Henny Portman氏によるMSP 5th/2011版比較(原則対応表)、PeopleCert公式製品ページ</li>
            </ul>
          </div>
        </section>

        <!-- Section 6 -->
        <section id="themes">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 06</div>
          <h2>7つのテーマ(Themes)</h2>

          <p>テーマは、原則をプログラムのガバナンスに落とし込むための「本質的な側面」であり、各テーマは単語1語で名付けられています(2011年版の「ガバナンステーマ」から名称変更)。各テーマ章には、後述する4つの「プログラムの動機(ドライバー)」別のシナリオが用意されており、状況に応じたテーラリングの学習材料となっています。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_THEMES_OVERVIEW" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">7つのテーマ(Themes)</div>
          </div>

          <h3>Organization テーマ(組織)</h3>

          <p><strong>目的</strong>: プログラムの定義・実行をコントロールするために必要な、ガバナンスボードと支援オフィスの構造を定義すること。誰が何を決め、誰が何に責任を持つのかを明確にする。</p>

          <p><strong>主要な役割</strong></p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>役割</th><th>説明</th></tr></thead>
              <tbody>
                <tr><td>Sponsoring Group(スポンサリンググループ)</td><td>プログラムの方向性と資金について戦略的意思決定を行う、同格の経営層メンバーによるグループ</td></tr>
                <tr><td>Programme Board(プログラムボード)</td><td>ベネフィットの実現を、定められた制約の中で推進する権限を持つガバナンスボード。最低限、SRO・プログラムマネージャー・BCM・プログラムオフィスのリーダーで構成される</td></tr>
                <tr><td>Senior Responsible Owner(SRO)</td><td>プログラムのアウトカム実現について、全体的かつ継続的な説明責任(accountability)を負う。スポンサリンググループの代表として日常的に活動する</td></tr>
                <tr><td>Programme Manager(プログラムマネージャー)</td><td>プログラムボードに対して責任を負い、SROを補佐しながらプログラムの日々のリーダーシップを担う。プロジェクト群の調整・実行に責任を持つ</td></tr>
                <tr><td>Business Change Manager(BCM)</td><td>事業側の人材が担うことが望ましいとされる役割。プログラムマネージャーが届けるアウトプットを実際の業務に定着させ、ベネフィットの実現を確実にする</td></tr>
                <tr><td>Programme Office(プログラムオフィス)</td><td>プロジェクトと事業の双方から情報を集約する「情報のハブ」。プログラムマネージャーに報告しつつ、各種の助言も行う</td></tr>
              </tbody>
            </table>
          </div>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ORG_STRUCTURE" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">Organization テーマ(組織)</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>SROは「兼任の名ばかりスポンサー」にしない。プログラムの成否に対する説明責任を実質的に負える、十分な権限と組織内影響力を持つ人物を選ぶ。</li>
              <li>BCMは通常、事業側(プログラムを実行する側ではなく、変化を受け取り実際に運用する側)から選任する。プログラムマネージャーとBCMを同一人物が兼務すると、アウトプット提供とベネフィット実現の両方に対する客観的なチェックが働かなくなるリスクがある。</li>
              <li>プログラムオフィスを単なる事務局ではなく、進捗・リスク・ベネフィットの状況を横断的に可視化する「情報のハブ」として機能させる。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>QA社MSP Practitionerコースウェア、Know-How-What.com「Key Roles in MSP 5th Edition」、PDCAコンサルティング MSPサマリー資料</li>
            </ul>
          </div>

          <h3>Design テーマ(デザイン)</h3>

          <p><strong>目的</strong>: プログラムが目指す未来像を明確にし、リスク・ベネフィット・望ましい「終着点(end state)」を関係者に分かりやすく示すこと。</p>

          <p><strong>主要な構成要素</strong></p>

          <ul>
            <li><strong>Vision(ビジョン)</strong>: プログラム完了後、投資組織が到達している「望ましい未来の姿」。ビジョンステートメントは、①対外的に理解しやすい表現である、②誰にでも理解できる、③関与とコミットメントを引き出す、④現状維持がなぜ選択肢たり得ないかを示唆する、⑤具体的な期日や詳細な数値目標は避ける、という特徴を持つべきとされる。</li>
            <li><strong>Target Operating Model(TOM / 目標運用モデル)</strong>: 2011年版の「ブループリント」を改称・拡充した概念。プログラム完了後の組織の将来状態を、役割と責任・文化・プロセス・技術・インフラ・情報とデータ・知識と学習といった観点で詳細に記述したもの。現状(as-is)と将来状態(to-be)をつなぐ「地図」の役割を果たす。</li>
            <li><strong>Benefits Map(ベネフィットマップ)</strong>: アウトプット → アウトカム → ベネフィットへの因果関係を可視化した図。</li>
            <li><strong>初期リスクの識別</strong>: デザイン段階から、ベネフィット実現を阻害しうるリスクを洗い出し、優先順位づけを始める。</li>
          </ul>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DESIGN_CHAIN" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">Design テーマ(デザイン)</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>ビジョンステートメントは「短く、印象的で、具体的な期日を含まない」ものにする。詳細な数値目標を盛り込みすぎると、環境変化のたびに陳腐化してしまう。</li>
              <li>TOMは一度作って終わりではなく、プログラムの進行とともに継続的に更新される「生きたモデル」として扱う。</li>
              <li>ビジョンとTOMを必ず紐づけて管理する。ビジョンが「なぜ」を語り、TOMが「具体的に何が変わるのか」を語るという役割分担を崩さない。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>Umbrex「MSP for Core Project & Program Management」、TheKnowledgeAcademy「MSP Blueprint」解説記事、SlideShare「The 4 key elements of best practice」</li>
            </ul>
          </div>

          <h3>Justification テーマ(正当化)</h3>

          <p><strong>目的</strong>: 投資(時間・資金・資源)に見合うだけのベネフィットが見込めることを継続的に証明し、プログラムを進める / 止めるの判断を支えること。</p>

          <p><strong>主要な構成要素</strong></p>

          <ul>
            <li><strong>Business Case(ビジネスケース)</strong>: プログラムへの投資が正当化される理由を示す、生きた文書。一度作成して終わりではなく、環境の変化や新たな知見に応じて継続的に更新される。</li>
            <li><strong>ベネフィット管理アプローチ</strong>: ベネフィットをどのように識別・定量化・追跡・実現するかの方針。</li>
            <li><strong>キャッシュフロー管理・予算編成</strong>: 投資の時期と規模を管理し、資金面からプログラムの実行可能性を裏づける。</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>ビジネスケースを「プログラム開始時に一度作成する承認文書」として扱わない。各トランシェレビューのたびに見直し、「このまま投資を継続する正当性があるか」を問い直す運用にする。</li>
              <li>ベネフィットの金銭価値だけでなく、非金銭的なベネフィット(顧客満足度、従業員エンゲージメントなど)も定義し、測定方法をあらかじめ決めておく。</li>
              <li>「Dis-benefit(負の便益)」、つまりプログラムによって生じうる望ましくない影響も明示的に洗い出し、ビジネスケースに反映する。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>Henny Portman氏比較記事、Umbrex「MSP for Core Project & Program Management」</li>
            </ul>
          </div>

          <h3>Structure テーマ(構造)</h3>

          <p><strong>目的</strong>: ベネフィットを段階的に実現するために、プロジェクトやその他の活動をどう編成し、どのペースで届けるかを計画すること。</p>

          <p><strong>主要な構成要素</strong></p>

          <ul>
            <li><strong>プログラムプラン(Programme Plan)</strong>: プログラム全体のスケジュール・マイルストーン・依存関係を示す計画。</li>
            <li><strong>プロジェクトドシエ(Projects Dossier)</strong>: プログラムを構成するプロジェクトや活動の一覧・管理情報の集合。</li>
            <li><strong>トランシェ(Tranche)</strong>: ケイパビリティの段階的な変化とベネフィットの実現を軸に編成された、一連のプロジェクトと活動のまとまり。プログラムは複数のトランシェに分割して進めることで、一度にすべてを届けようとするリスクを避け、早期に価値を出しながら学習を反映できる。</li>
            <li><strong>各種マネジメント戦略(Management Strategies)</strong>: ベネフィット管理戦略、リスク管理戦略、ステークホルダー関与戦略、品質管理戦略、情報管理戦略など、プログラム運営の各側面をどう統制するかの方針集。</li>
            <li><strong>資源(人材・設備・施設)の計画と最適配分</strong>。</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>トランシェの区切りは、プロジェクトの完了タイミングではなく「ベネフィットが実現できる段階」を基準に設計する。</li>
              <li>各トランシェの終わりに正式な「トランシェレビュー」を設け、ベネフィットの実現状況・ビジネスケースの妥当性・戦略との整合性を確認した上で、継続・調整・一時停止・早期クローズを判断するゲートとして機能させる。</li>
              <li>プロジェクトドシエは静的な一覧表ではなく、依存関係やリソース競合を可視化できる管理情報として運用する。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>Open Exam Prep「Free MSP Foundation Practice Exam」解説、TrustedInstitute「MSP Processes and Programme Lifecycle Flashcards」</li>
            </ul>
          </div>

          <h3>Knowledge テーマ(知識)</h3>

          <p><strong>目的</strong>: プログラムに関わる情報と知識を、正確に、適切なアクセス権限のもとで、確実に活用できる状態に保つこと。また、経験から学び、継続的改善の文化を醸成すること。</p>

          <p><strong>主要な構成要素</strong></p>

          <ul>
            <li><strong>情報管理戦略(Information Management Strategy)</strong>: 情報の取得・利用・評価・保護・配布の方針。データプライバシーやバージョン管理(構成管理 / Configuration Management)も含む。</li>
            <li><strong>教訓(Lessons)の収集と活用</strong>: プログラム内・プログラム間で得られた学びを体系的に記録し、以降のトランシェや将来のプログラムに反映する仕組み。</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>「教訓管理」を、プロジェクト終了時に一度だけ実施する形式的な儀式にしない。トランシェレビューのたびに教訓を振り返り、次のトランシェの計画に実際に反映するサイクルを作る。</li>
              <li>情報の「正確性」だけでなく「誰がどのバージョンにアクセスできるか」というガバナンスの観点も、情報管理戦略に明記する。</li>
              <li>Knowledgeテーマは他のすべてのテーマを下支えする性質を持つ。組織・デザイン・正当化・構造・アシュアランス・意思決定のいずれの判断も、正確でタイムリーな情報があって初めて成立することを意識する。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>Good e-Learning「MSP 5th Edition Foundation & Practitioner」コース概要、Open Exam Prep解説記事</li>
            </ul>
          </div>

          <h3>Assurance テーマ(アシュアランス)</h3>

          <p><strong>目的</strong>: プログラムが軌道に乗り、原則に沿って進んでいることについて、客観的な確信(confidence)を経営層に提供すること。</p>

          <p><strong>主要な構成要素</strong></p>

          <ul>
            <li><strong>役割と責任の明確化</strong>: 誰が何を保証する立場にあるかを定義する。</li>
            <li><strong>三線防御モデル(Three Lines of Defence)</strong>: アシュアランス活動を体系的に整理するためのモデル(詳細は第11章)。</li>
            <li><strong>アシュアランス・アプローチ(Assurance Approach)文書</strong>: 三線防御それぞれについて、どのような監視活動を実施するかを定義する文書。試験でも問われる重要文書。</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>アシュアランスを「監査=チェックする側とされる側の対立」と捉えず、プログラムの成功確率を高めるための建設的な仕組みとして位置づける。</li>
              <li>第1線(現場のマネジメント)・第2線(監視機能)・第3線(独立監査)の役割を混同しない。同じ人が複数の線を兼務すると、独立した保証が得られなくなる。</li>
              <li>アシュアランス活動は計画段階から組み込み、プログラムの終盤に慌てて実施しない。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>Actual4Test「MSP Foundation Free Exam Questions」、Good Governance Institute「Three lines of defence for assurance and reassurance」</li>
            </ul>
          </div>

          <h3>Decisions テーマ(意思決定)</h3>

          <p><strong>目的</strong>: プログラムのライフサイクル全体を通じて発生する多様な意思決定(リスクへの対応、課題の解決、その他あらゆる選択)を、適切なガバナンスのもとで行うための前提条件を整えること。2011年版にはなかった、5th editionで独立したテーマとして新設された領域。</p>

          <p><strong>主要な構成要素</strong></p>

          <ul>
            <li><strong>意思決定アプローチ(Decision-Making Approach)</strong>: 誰が、どのレベルの意思決定を、どのように行うかを定める方針。</li>
            <li><strong>リスクレジスター(Risk Register)</strong>: 識別されたリスクとその対応状況を記録する台帳。</li>
            <li><strong>課題レジスター(Issue Register)</strong>: 発生した課題とその解決状況を記録する台帳。</li>
            <li><strong>意思決定レジスター(Decision Register)</strong>: 5th editionで新たに明示された、重要な意思決定の履歴を記録する台帳。</li>
          </ul>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>「リスク」(将来起こりうる不確実な事象)と「課題」(既に発生した対処が必要な事象)を明確に区別し、それぞれに応じたエスカレーションの経路を定義する。</li>
              <li>どのレベルの意思決定を誰が行えるか(プロジェクトレベル、プログラムマネージャーレベル、プログラムボードレベル、スポンサリンググループレベル)をあらかじめ明文化し、意思決定の停滞を防ぐ。</li>
              <li>意思決定の履歴を記録することで、「なぜその判断をしたのか」を後から追跡できるようにし、説明責任と教訓の蓄積の両方に役立てる。</li>
            </ul>
          </div>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DECISION_FLOW" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
            <div class="diagram-caption">Decisions テーマ(意思決定)</div>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li>Passitexams「MSP Practitioner 5th Ed Study Guide」、Open Exam Prep解説記事</li>
            </ul>
          </div>
        </section>

        <!-- Section 7 -->
        <section id="lifecycle">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 07</div>
          <h2>プログラムライフサイクル: 7つのプロセス</h2>
        </section>

        <!-- Section 8 -->
        <section id="governance">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:shield-check" aria-hidden="true" />SECTION 08</div>
          <h2>ガバナンスと組織構造</h2>
        </section>

        <!-- Section 9 -->
        <section id="benefits">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 09</div>
          <h2>ベネフィット管理の実践</h2>
        </section>

        <!-- Section 10 -->
        <section id="risk-decisions">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 10</div>
          <h2>リスク・課題・意思決定管理</h2>
        </section>

        <!-- Section 11 -->
        <section id="assurance">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:scale" aria-hidden="true" />SECTION 11</div>
          <h2>アシュアランスと三線防御モデル</h2>
        </section>

        <!-- Section 12 -->
        <section id="tailoring">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 12</div>
          <h2>テーラリング ― 組織・状況への適応</h2>
        </section>

        <!-- Section 13 -->
        <section id="checklist">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 13</div>
          <h2>テーマ・プロセス別ベストプラクティスチェックリスト</h2>
        </section>

        <!-- Section 14 -->
        <section id="anti-patterns">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 14</div>
          <h2>よくある落とし穴(アンチパターン)</h2>
        </section>

        <!-- Section 15 -->
        <section id="glossary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 15</div>
          <h2>用語集</h2>
        </section>

        <!-- Section 16 -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 16</div>
          <h2>参考文献・ソース一覧</h2>
        </section>

        <footer>
          MSP®、PRINCE2®、および MoP® は PeopleCert groupの登録商標です。
        </footer>
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
  max-width: 900px;
  padding: 48px 48px 96px;
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
  border-collapse: collapse;
  width: 100%;
  font-size: 15px;
}

thead th {
  background: var(--color-paper-sunken, #eef0f4);
  text-align: left;
  font-weight: 600;
  color: var(--color-ink, #161b26);
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-strong, #c7cdd9);
  white-space: nowrap;
}

tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-soft, #4b5566);
  vertical-align: top;
}

tbody tr:nth-child(even) {
  background: var(--color-paper, #f6f7f9);
}

.mermaid-wrap {
  border: 1px solid var(--color-border, #dfe3ea);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 10px;
  padding: 24px;
  margin: 28px 0;
}

.callout {
  border-left: 4px solid var(--color-indigo, #2e3f72);
  background: var(--color-indigo-tint, #eef1f8);
  border-radius: 0 8px 8px 0;
  padding: 16px 20px;
  margin: 24px 0;
}

.callout.source {
  border-left-color: var(--color-forest, #1b6e6a);
  background: var(--color-forest-tint, #e7f3f2);
}

.callout.practice {
  border-left-color: var(--color-gold, #b8802a);
  background: var(--color-gold-tint, #faf1df);
}

.callout.note {
  border-left-color: var(--color-plum, #8c3a5c);
  background: var(--color-plum-tint, #f6eaef);
}

.callout-title {
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.callout.source .callout-title {
  color: var(--color-forest, #1b6e6a);
}

.callout.practice .callout-title {
  color: var(--color-gold, #b8802a);
}

.callout.note .callout-title {
  color: var(--color-plum, #8c3a5c);
}

.callout p:last-child {
  margin-bottom: 0;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-faint, #8a93a3);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .sidebar {
    display: none;
  }
  .sidebar.is-open {
    display: block;
    top: var(--global-nav-height, 0px);
    width: 280px;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }
  .sidebar-toggle {
    display: flex;
  }
  .main-content {
    margin-left: 0;
    padding: 32px 24px 80px;
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
</style>
