<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useActiveHeading } from "~/composables/useActiveHeading";

const LIGHT_THEME_VARS = {
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
        pieTitleTextColor: "#161B26"
      };

const DIAGRAM_examWeightingPie = `pie showData
title Practitioner試験の出題配点
"LO3: 7つのPractices" : 51
"LO4: 7つのProcesses" : 30
"LO1: 7つのPrinciples" : 10
"LO2: 人(People)の管理" : 9`;

const DIAGRAM_principlesRelation = `flowchart TD
P1["1. 継続的な ビジネス正当性の維持"]
P2["2. 経験からの学習"]
P3["3. 役割・責任・関係性の定義"]
P4["4. 段階(ステージ)による管理"]
P5["5. 例外による管理"]
P6["6. プロダクトへのフォーカス"]
P7["7. プロジェクトに合わせた テーラリング"]
P1 --> P4
P3 --> P4
P4 --> P5
P6 --> P4
P2 -.-> P1
P2 -.-> P5
P7 -.-> P1
P7 -.-> P2
P7 -.-> P3
P7 -.-> P4
P7 -.-> P5
P7 -.-> P6`;

const DIAGRAM_peopleCentral = `flowchart LR
A["人(People)が 方法論の中心"] --> B["リーダーシップと チームの成功"]
A --> C["変革の成功と 変革管理アプローチ"]
A --> D["コミュニケーションと コミュニケーション管理アプローチ"]
B --> E["プロジェクトの成果"]
C --> E
D --> E`;

const DIAGRAM_practicesOverview = `flowchart TB
subgraph "7つのPractices"
BC["Business Case なぜやるのか"]
OR["Organizing 誰が担うのか"]
PL["Plans どう実現するのか"]
QU["Quality 何を満たすべきか"]
RI["Risk 何が不確実か"]
IS["Issues 何が起きたか"]
PR["Progress どこまで進んだか"]
end
BC -->|正当化する| PL
OR -->|体制を提供| PL
PL -->|基準を与える| QU
RI -->|脅威と好機を管理| BC
IS -->|逸脱を捕捉| PR
PR -->|例外を報告| BC`;

const DIAGRAM_productBasedPlanning = `flowchart LR
A["Project Product Description作成"] --> B["Product Breakdown Structure作成"]
B --> C["各Product Description作成"]
C --> D["Product Flow Diagram作成 (依存関係の可視化)"]
D --> E["アクティビティと リソースの計画"]`;

const DIAGRAM_riskCycle = `flowchart LR
A["Identify 識別"] --> B["Assess 評価"]
B --> C["Plan 対応計画"]
C --> D["Implement 実行"]
D --> E["Communicate 伝達"]
E -.->|継続的に反復| A`;

const DIAGRAM_issueHandling = `flowchart TD
A["課題を捕捉 (Capture)"] --> B["評価 (Examine): インパクト分析"]
B --> C{"対応可能な 許容範囲内か?"}
C -->|Yes| D["Project Managerが 対応を決定(Propose/Decide)"]
C -->|No| E["Project Board / Change Authorityへ エスカレーション"]
D --> F["実施 (Implement)"]
E --> F
F --> G["クローズ (Close)"]`;

const DIAGRAM_progressReporting = `flowchart LR
TM["Team Manager"] -->|"Checkpoint Report (時間駆動)"| PM["Project Manager"]
PM -->|"Highlight Report (時間駆動)"| PB["Project Board"]
PM -->|"Exception Report (イベント駆動: トレランス逸脱時)"| PB
PB -->|"Exception Plan承認"| PM`;

const DIAGRAM_processModel = `flowchart TB
subgraph PRE["プレプロジェクト"]
SU["SU: Starting up a Project (プロジェクトの立ち上げ)"]
end
subgraph INIT["初期ステージ"]
IP["IP: Initiating a Project (プロジェクトの開始)"]
end
subgraph DELIVERY["各デリバリーステージ(繰り返し)"]
CS["CS: Controlling a Stage (ステージの統制)"]
MP["MP: Managing Product Delivery (プロダクトデリバリーの管理)"]
SB["SB: Managing a Stage Boundary (ステージ境界の管理)"]
CS <--> MP
CS --> SB
end
subgraph FINAL["最終ステージ"]
CP["CP: Closing a Project (プロジェクトのクロージング)"]
end
DP["DP: Directing a Project (プロジェクトの指揮) ※全期間を通じてProject Boardが実施"]
SU --> IP
IP --> CS
SB -.->|次ステージへ| CS
CS --> CP
DP -.->|承認・指示| SU
DP -.->|承認・指示| IP
DP -.->|承認・指示| SB
DP -.->|承認・指示| CP`;

const DIAGRAM_ipApproaches = `flowchart TD
A["Quality Management Approach"] --> F["Communication Management Approach (最後に確定)"]
B["Risk Management Approach"] --> F
C["Issue Management Approach"] --> F
D["Change Management Approach"] --> F
E["Sustainability/Commercial/ Digital & Data Approach"] --> F`;

const DIAGRAM_csControlFlow = `flowchart LR
A["ワークパッケージ承認"] --> B["Team Managerが実行"]
B --> C["Checkpoint Reportで報告"]
C --> D["進捗・課題・リスクを レビュー"]
D --> E{"トレランス内か?"}
E -->|Yes| F["Highlight Reportで Project Boardへ報告"]
E -->|No/予測される| G["Exception Reportを作成"]
F --> A
G --> H["Project Boardの 判断を待つ"]`;

const DIAGRAM_rolesHierarchy = `flowchart TB
subgraph Corporate["Corporate / Programme Management(顧客)"]
COR["プロジェクトマンデートの発行 最上位の意思決定"]
end
subgraph Board["Project Board(指揮レベル)"]
EX["Executive ビジネスケースの所有者"]
SU_["Senior User 便益とユーザー要求の代表"]
SS["Senior Supplier 技術的実現可能性の代表"]
end
subgraph Assurance["独立確認"]
PA["Project Assurance 独立した監督・助言"]
CA["Change Authority (委任時)変更の意思決定"]
end
subgraph Management["管理レベル"]
PM["Project Manager 日々のマネジメント"]
PS["Project Support 事務・専門支援"]
end
subgraph Delivery["デリバリーレベル"]
TM["Team Manager プロダクトの実行"]
end
COR --> EX
EX --> PM
SU_ -.協働.- EX
SS -.協働.- EX
PA -.独立して監督.- Board
PA -.独立して監督.- PM
PM --> TM
PM -.支援.- PS`;

const TOC_IDS = ["exam-overview","what-is-prince2-7","principles","people","practices","processes","roles-responsibilities","v7-new-elements","tailoring","exam-technique","references"] as const;
const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);
const activeId = useActiveHeading(TOC_IDS);
function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}
useSeoMeta({
  "title": "PRINCE2® 7 Practitioner 完全ガイド | プロジェクトマネジメント実践資格",
  "description": "PeopleCert PRINCE2 Project Management Practitioner (Version 7)の出題範囲を、7原則・People・7プラクティス・7プロセスの配点順に整理した学習ガイド。"
});
</script>

<template>
  <div>
    <button ref="sidebarToggle" type="button" class="sidebar-toggle" aria-label="目次を開閉する" aria-controls="sidebar" :aria-expanded="sidebarOpen" @click="sidebarOpen = !sidebarOpen"><Icon name="tabler:menu-2" aria-hidden="true" /></button>
    <div class="layout">
<aside class="sidebar" :class="{ open: sidebarOpen }" id="sidebar" aria-label="目次">
    <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"></circle>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"></circle>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      <div class="brand-text">
        <div class="brand-title">PRINCE2® 7 Practitioner 完全ガイド</div>
        <div class="brand-subtitle">Project Management Practitioner (V7)</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">概要</li>
      <li><a href="#exam-overview" :class="{ active: activeId === 'exam-overview' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />試験の全体像</a></li>
      <li><a href="#what-is-prince2-7" :class="{ active: activeId === 'what-is-prince2-7' }" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />PRINCE2 7とは</a></li>

      <li class="nav-group-label">コア理論</li>
      <li><a href="#principles" :class="{ active: activeId === 'principles' }" @click="closeSidebar"><Icon name="tabler:compass" aria-hidden="true" />Part1: 7つの原則</a></li>
      <li><a href="#people" :class="{ active: activeId === 'people' }" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />Part2: 人(People)</a></li>

      <li class="nav-group-label">実践知識(配点81%)</li>
      <li><a href="#practices" :class="{ active: activeId === 'practices' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />Part3: 7つのプラクティス</a></li>
      <li><a href="#processes" :class="{ active: activeId === 'processes' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />Part4: 7つのプロセス</a></li>
      <li><a href="#roles-responsibilities" :class="{ active: activeId === 'roles-responsibilities' }" @click="closeSidebar"><Icon name="tabler:users-group" aria-hidden="true" />役割と責任の総括</a></li>
      <li><a href="#v7-new-elements" :class="{ active: activeId === 'v7-new-elements' }" @click="closeSidebar"><Icon name="tabler:leaf" aria-hidden="true" />V7の新要素</a></li>

      <li class="nav-group-label">総仕上げ</li>
      <li><a href="#tailoring" :class="{ active: activeId === 'tailoring' }" @click="closeSidebar"><Icon name="tabler:adjustments" aria-hidden="true" />テーラリング</a></li>
      <li><a href="#exam-technique" :class="{ active: activeId === 'exam-technique' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />試験対策</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・ソース</a></li>
    </ul>
  </aside>
      <main id="main-content" class="main-content">
<div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />PeopleCert公式シラバス準拠</div>
      <h1>PRINCE2® Project Management Practitioner (Version 7) 学習ガイド</h1>
      <p class="hero-lede">
        対象試験: PeopleCert PRINCE2® 7 Practitioner。本ガイドは、PeopleCertが公開している公式シラバス、公式製品ページ、および複数の信頼できる二次情報源をもとに作成した、初学者向けの詳細な学習ガイドです。実際の受験にあたっては、必ず公式教本「PRINCE2 7 Managing Successful Projects」を精読してください。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">150分</div><div class="stat-label">試験時間(非母語者は187.5分)</div></div>
        <div class="stat-card"><div class="stat-number">56問/70点</div><div class="stat-label">問題数(部分問題含む)/配点</div></div>
        <div class="stat-card"><div class="stat-number">42点</div><div class="stat-label">合格ライン(60%)</div></div>
        <div class="stat-card"><div class="stat-number">81%</div><div class="stat-label">Practices+Processesの配点比率</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" /><span>
        本ガイドはPeopleCert社の公式教材そのものではなく、公式シラバスおよび公開情報をもとに独自に作成した非公式の学習補助資料です。PRINCE2®はPeopleCertグループの登録商標です。実際の試験範囲・出題傾向は、必ず最新の公式シラバスおよび公式教本(PRINCE2 7 Managing Successful Projects)、および<a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-2/PRINCE2-7-practitioner-3581" target="_blank" rel="noopener">PeopleCert公式サイト</a>でご確認ください。
      </span></div>
    </div>
<section id="exam-overview">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      
      <h2 id="heading-0">このガイドについて / 試験の全体像</h2>
      <h3 id="heading-1">誰のための資格か</h3><p>PRINCE2 7 Practitionerは、プロジェクトマネージャーおよびプロジェクトマネージャーを目指す人を主な対象とした資格です。それに加えて、プロジェクトの設計・開発・提供に関わる以下のような役割の人にも関連します。</p><ul><li>プロジェクトボードメンバー(例: Senior Responsible Owner)</li><li>チームマネージャー(例: Product Delivery Manager)</li><li>プロジェクトアシュアランス(例: Business Change Analyst)</li><li>プロジェクトサポート(例: PMO要員)</li><li>業務側のラインマネージャー・スタッフ</li></ul><p>Practitioner試験の目的は、<strong>PRINCE2の手法を実際のプロジェクトに適用し、テーラリング(状況に応じた調整)できるか</strong>を評価することです。合格者は、適切な指導のもとで実プロジェクトへの適用を開始できるレベルとされていますが、あらゆる状況に対応できる熟練度までは求められません。</p><h3 id="heading-2">試験の基本情報</h3><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>試験時間</td><td>150分(英語を母語・業務言語としない受験者は+25%の187.5分)</td></tr><tr><td>出題形式</td><td>オープンブック(公式教本のみ持ち込み可、書き込み可)</td></tr><tr><td>問題数</td><td>56問(部分問題を含む)、配点70点</td></tr><tr><td>合格ライン</td><td>42点/70点(60%)</td></tr><tr><td>出題形式</td><td>客観式(Classic: 1問1点の4択、Matching: 1問3点のマッチング式)</td></tr><tr><td>思考レベル</td><td>Bloom's Taxonomy レベル3(適用: Apply)とレベル4(分析: Analyse)</td></tr><tr><td>出題構成</td><td>プロジェクトシナリオ + 追加情報(登場人物のプロフィール) + 設問</td></tr></tbody></table></div><p>出典: PeopleCert公式シラバス「Syllabus PRINCE2 7 Practitioner Official Training Materials」</p><h3 id="heading-3">出題範囲と配点(Learning Outcome Weighting)</h3><div class="domain-grid"><div class="domain-card d1"><div class="domain-pct">10%</div><div class="domain-name">LO1: 7つのPrinciples</div></div><div class="domain-card d2"><div class="domain-pct">9%</div><div class="domain-name">LO2: 人(People)の管理</div></div><div class="domain-card d3"><div class="domain-pct">51%</div><div class="domain-name">LO3: 7つのPractices</div></div><div class="domain-card d4"><div class="domain-pct">30%</div><div class="domain-name">LO4: 7つのProcesses</div></div></div><p>Practitioner試験は4つのLearning Outcome(学習成果)から構成されます。この配点比率が<strong>学習の優先順位</strong>を決める最重要情報です。</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_examWeightingPie" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">Learning Outcome別の出題配点比率</div></div><div class="table-wrap"><table><thead><tr><th>Learning Outcome</th><th>内容</th><th>配点比率</th><th>Bloom's Level</th></tr></thead><tbody><tr><td>LO1</td><td>状況に応じてPRINCE2の7原則を適用する方法を理解する</td><td>10%</td><td>BL4(分析)</td></tr><tr><td>LO2</td><td>プロジェクトを成功させるための効果的な人の管理を適用する方法を理解する</td><td>9%</td><td>BL3/BL4</td></tr><tr><td>LO3</td><td>PRINCE2の7プラクティスの関連する側面を、状況に応じて適用・テーラリングする方法を理解する</td><td><strong>51%</strong></td><td>BL3/BL4</td></tr><tr><td>LO4</td><td>PRINCE2の7プロセスの関連する側面を、状況に応じて適用(・テーラリング)する方法を理解する</td><td><strong>30%</strong></td><td>BL3/BL4</td></tr></tbody></table></div><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>学習の最優先事項</strong>: LO3(プラクティス)とLO4(プロセス)だけで出題の81%を占めます。本ガイドもこの2つのセクション(Part 3、Part 4)にもっとも多くの紙幅を割いています。</p></div>
    </section>

<section id="what-is-prince2-7">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
      
      <h2 id="heading-4">PRINCE2 7とは何か? Foundationとの違い、V6からの主な変更点</h2>
      <h3 id="heading-5">FoundationとPractitionerの違い</h3><div class="table-wrap"><table><thead><tr><th>観点</th><th>Foundation</th><th>Practitioner</th></tr></thead><tbody><tr><td>求められる能力</td><td>用語・構造の<strong>理解(Recall/Understand)</strong></td><td>実際のシナリオへの<strong>適用・分析(Apply/Analyse)</strong></td></tr><tr><td>Bloom's Level</td><td>BL1・BL2が中心</td><td>BL3・BL4のみ</td></tr><tr><td>出題形式</td><td>単純な知識確認問題</td><td>プロジェクトシナリオに基づく応用問題</td></tr><tr><td>前提資格</td><td>なし</td><td>Foundation合格(またはPRINCE2 5th/6th版、PMP、CAPMなど同等資格)</td></tr></tbody></table></div><p>Practitionerでは「〇〇という状況で、プロジェクトマネージャーが××をしたことは適切だったか、その理由は?」という形式で問われるため、<strong>各要素の定義を暗記するだけでは不十分</strong>で、「なぜその行動が原則・プラクティス・プロセスの目的に沿っている(または沿っていない)のか」を説明できる理解が必要です。</p><h3 id="heading-6">PRINCE2 7(Version 7)でのV6からの主な変更点</h3><p>PRINCE2は2023年9月にVersion 7として刷新されました。Practitioner試験でも、この変更点そのものが出題の前提知識になります。</p><div class="table-wrap"><table><thead><tr><th>変更点</th><th>V6(第6版)</th><th>V7(第7版)</th></tr></thead><tbody><tr><td>「テーマ」の名称</td><td>Themes(7つ)</td><td><strong>Practices</strong>(7つ、名称変更・内容拡充)</td></tr><tr><td>人に関する章</td><td>独立した章なし</td><td><strong>新設「People」章</strong>(リーダーシップ、変革管理、コミュニケーション)</td></tr><tr><td>サステナビリティ</td><td>明示的な言及は限定的</td><td><strong>7番目のパフォーマンスターゲット</strong>として正式に位置づけ、Sustainability Management Approachを新設</td></tr><tr><td>デジタル・データ</td><td>明示的な言及は限定的</td><td><strong>Digital and Data Management Approach</strong>を新設(Progressプラクティスの管理プロダクトの一部)</td></tr><tr><td>商用・調達</td><td>Organization(組織)テーマの一部</td><td><strong>Commercial Management Approach</strong>として明確化(Organizingプラクティスの管理プロダクト)</td></tr><tr><td>Issues(旧Change)</td><td>"Change"テーマ</td><td><strong>"Issues"プラクティス</strong>に改称</td></tr><tr><td>管理プロダクト</td><td>ログ・レジスタが多数分散</td><td>統合・簡素化(文書オーバーヘッドの削減)</td></tr><tr><td>テーラリングの扱い</td><td>原則の1つとして記載</td><td>原則に加え、<strong>適用の考え方全体を貫く指針</strong>としてより強調</td></tr></tbody></table></div><p>出典: PeopleCert PRINCE2 7 ローンチ情報、Knowledge Train「PRINCE2 7th Edition – What's different?」</p><h3 id="heading-7">PRINCE2プロジェクトの7つのパフォーマンスターゲット</h3><p>V7では、プロジェクトが管理すべき対象(旧「6つの側面」)に<strong>サステナビリティ</strong>が加わり、7つになりました。</p><div class="table-wrap"><table><thead><tr><th>No.</th><th>パフォーマンスターゲット</th><th>説明</th></tr></thead><tbody><tr><td>1</td><td>Time(時間)</td><td>計画されたスケジュール通りに完了するか</td></tr><tr><td>2</td><td>Cost(コスト)</td><td>承認された予算内に収まるか</td></tr><tr><td>3</td><td>Quality(品質)</td><td>要求された品質基準を満たすか</td></tr><tr><td>4</td><td>Scope(スコープ)</td><td>合意された範囲の成果物を提供するか</td></tr><tr><td>5</td><td>Risk(リスク)</td><td>リスクが許容範囲内に管理されているか</td></tr><tr><td>6</td><td>Benefits(ベネフィット)</td><td>期待された便益が実現されるか</td></tr><tr><td>7</td><td><strong>Sustainability(サステナビリティ)</strong></td><td>環境・社会・ガバナンス(ESG)目標に整合しているか(V7新規)</td></tr></tbody></table></div><p>これらのターゲットには「許容範囲(Tolerance)」が設定され、逸脱が予測される場合は上位レベルへエスカレーションされます。これは後述する「Manage by exception」原則と直結します。</p>
    </section>

<section id="principles">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:compass" aria-hidden="true" />SECTION 03</div>
      <span class="domain-tag d1">LO1 · 10%</span>
      <h2 id="heading-8">Part 1: 7つの原則 (Principles) の適用と分析</h2>
      <p>原則はPRINCE2プロジェクトである以上、<strong>例外なくすべて適用しなければならない</strong>普遍的なガイドラインです(適用の「仕方」はテーラリング可能ですが、原則そのものを無視することはできません)。Practitioner試験(LO1, 10%)では、「あるプロジェクトマネージャーの行動が、どの原則に沿っている/反しているか」を分析させる問題が出ます。</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_principlesRelation" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">7つの原則の相互関係</div></div><h3 id="heading-9">継続的なビジネス正当性の維持 (Ensure continued business justification)</h3><p><strong>要点</strong>: プロジェクトは開始時だけでなく、<strong>プロジェクト期間を通じて常に</strong>「やる価値がある」ことを証明し続けなければなりません。ビジネスケースが正当化されなくなった時点で、プロジェクトは中止(または方向転換)されるべきです。</p><ul><li><strong>適用の仕方</strong>: ビジネスケースをステージ境界ごとに見直す、リスクや外部環境の変化を継続的にビジネスケースへ反映する。</li><li><strong>Practitioner的な視点</strong>: シナリオ問題で「市場環境が変わったのにビジネスケースを更新しなかった」「便益が実現しなくなったのにプロジェクトを継続した」という記述があれば、この原則への違反を示唆しています。</li><li><strong>関連プラクティス</strong>: Business Case</li></ul><h3 id="heading-10">経験からの学習 (Learn from experience)</h3><p><strong>要点</strong>: プロジェクトチームは、過去のプロジェクトや自プロジェクトの経験から常に学び、その教訓を将来に活かさなければなりません。「初めてだから仕方ない」は理由になりません。</p><ul><li><strong>適用の仕方</strong>: プロジェクト開始時に類似プロジェクトの教訓を調査する、Lessons Log(教訓ログ)を継続的に記録する、各ステージ・プロジェクト終了時にLessons Report(教訓報告)を作成する。</li><li><strong>Practitioner的な視点</strong>: 「新しいプロジェクトマネージャーが過去の教訓ログを確認しなかった」というシナリオは、この原則への違反の典型例です。</li></ul><h3 id="heading-11">役割・責任・関係性の定義 (Define roles, responsibilities and relationships)</h3><p><strong>要点</strong>: プロジェクトに関わる全員が、自分の役割・責任・権限、そして他者との関係性を明確に理解していなければなりません。</p><ul><li><strong>適用の仕方</strong>: プロジェクトマネジメントチーム構造を明文化する(PID: Project Management Team Structure)、役割記述書(Role Description)を作成する。</li><li><strong>Practitioner的な視点</strong>: Executive(責任者)とProject Manager(プロジェクトマネージャー)を同一人物が兼任している、Senior UserとSenior Supplierが利害相反を起こしうる立場で兼任している、といったシナリオは、この原則違反として問われやすいポイントです。</li></ul><h3 id="heading-12">段階(ステージ)による管理 (Manage by stages)</h3><p><strong>要点</strong>: プロジェクトは、いくつかの管理ステージに分割して計画・監視・制御されます。プロジェクトボードは、次のステージが始まる前にそのステージの計画を承認します。</p><ul><li><strong>適用の仕方</strong>: 小規模・低リスクなプロジェクトはステージ数を少なく、大規模・高リスクなプロジェクトはステージを細かく区切る。</li><li><strong>Practitioner的な視点</strong>: 「プロジェクトマネージャーが次のステージの計画をプロジェクトボードの承認なしに開始した」は典型的な違反シナリオです。</li></ul><h3 id="heading-13">例外による管理 (Manage by exception)</h3><p><strong>要点</strong>: 各管理レベルに、時間・コスト・品質・スコープ・リスク・便益・サステナビリティの各パフォーマンスターゲットについて「許容範囲(Tolerance)」が設定されます。許容範囲内であれば下位レベルは上位レベルの承認を待たずに業務を進められ、逸脱が予測される場合のみエスカレーションします。</p><ul><li><strong>適用の仕方</strong>: プロジェクトボードはプロジェクトマネージャーへステージトレランスを設定、プロジェクトマネージャーはチームマネージャーへワークパッケージトレランスを設定。</li><li><strong>Practitioner的な視点</strong>: 「許容範囲を超えそうなのに、プロジェクトマネージャーが独断で対応し、プロジェクトボードに報告しなかった」は明確な違反です。逆に「許容範囲内の軽微な遅延についてまでプロジェクトボードへ逐一報告を求める」のは、この原則の過剰適用(マイクロマネジメント)として問題視されます。</li></ul><h3 id="heading-14">プロダクトへのフォーカス (Focus on products)</h3><p><strong>要点</strong>: プロジェクトは「何を作るか(プロダクト)」を明確に定義し、それを基準に計画・品質確認・進捗管理を行います。活動(タスク)ベースではなく、成果物(プロダクト)ベースで考えることが重要です。</p><ul><li><strong>適用の仕方</strong>: プロダクトベースプランニング技法を用いる(後述)、Project Product Description(プロジェクトプロダクト記述書)とProduct Description(プロダクト記述書)を作成する。</li><li><strong>Practitioner的な視点</strong>: 品質基準やスコープの合意がプロダクト記述書に明記されないまま作業が進められている、というシナリオはこの原則違反を示します。</li></ul><h3 id="heading-15">プロジェクトに合わせたテーラリング (Tailor to suit the project)</h3><p><strong>要点</strong>: PRINCE2は「そのまま」使うものではなく、プロジェクトの規模・複雑さ・重要性・組織文化・リスクレベルなどに応じて<strong>調整して</strong>使うべきものです。ただし、原則そのものは調整できず、プラクティス・プロセス・役割・管理プロダクトの「適用の度合い・形式」を調整します。</p><ul><li><strong>Practitioner的な視点</strong>: この原則は試験全体を貫く最重要概念であり、独立したPart 7でも詳述します。</li></ul>
    </section>

<section id="people">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 04</div>
      <span class="domain-tag d2">LO2 · 9%</span>
      <h2 id="heading-16">Part 2: 人 (People) — リーダーシップ・変革管理・コミュニケーション</h2>
      <p>PRINCE2 7で新設された「People」の章は、Practitioner試験のLearning Outcome 2(配点9%)に対応します。配点比率は小さいものの、PRINCE2 7の最大の思想的変更点であり、他のプラクティス・プロセスの理解にも影響します。</p><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p>公式教本は「プロジェクトの成功は、関わる人々の能力・動機・関係性の理解にかかっている」という考え方を明確に打ち出しています(出典: QA社 PRINCE2 7 Foundation-Practitionerコースガイド)。</p></div><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_peopleCentral" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">Peopleを中心とした3つの柱の関係</div></div><h3 id="heading-17">チームを成功に導くリーダーシップ (Leading successful teams)</h3><p>LO2.1では「チームのリーダーシップとマネジメントへのアプローチが適切かどうかを評価する」ことが求められます(Bloom's Level 4=分析)。</p><ul><li><strong>リーダーシップの要点</strong>: 明確なビジョンの提示、状況に応じたリーダーシップスタイルの使い分け、心理的安全性の確保、チームメンバーの権限委譲(エンパワーメント)。</li><li><strong>マネジメントとの違い</strong>: マネジメントは計画・統制・プロセスの実行、リーダーシップは動機づけ・方向づけ・関係構築。PRINCE2 7ではこの両方をプロジェクトマネージャーに求めます。</li></ul><div class="callout practice" data-testid="callout" data-variant="practice"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div><ul><li>チームの構成(スキル、経験、文化的背景)に応じてコミュニケーションとタスクの割り当て方法を調整する</li><li>リモート・分散チームでは、対面よりも意図的な関係構築の機会を設計する</li><li>チームマネージャーへの権限委譲を、トレランス(許容範囲)の設定を通じて明確に行う(Manage by exceptionとの連携)</li></ul></div><h3 id="heading-18">変革を成功に導くこと (Leading successful change) と変革管理アプローチ</h3><p>LO2.2では「プロジェクト内の変革、およびプロジェクトの影響を受ける人々への変革管理・リーダーシップのアプローチが適切かどうか」を評価します。</p><p>PRINCE2 7では、プロジェクトの<strong>成果物を作ること(アウトプット)</strong>と、<strong>組織・人がそれを実際に使いこなし便益を得ること(アウトカム)</strong>を明確に区別し、後者を実現するための「変革管理アプローチ(Change Management Approach)」という管理プロダクトを新設しました。</p><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>注意(用語の混同に注意)</strong>: PRINCE2における"Change"には2つの意味があります。</p><ol><li><strong>Issue/Change Control(変更管理)</strong>: Issuesプラクティスにおける、スコープ変更要求や不具合などへの対応手続き。</li><li><strong>Organizational Change Management(組織的変革管理)</strong>: People章における、人々が新しい働き方を受け入れ・適応するための働きかけ。</li></ol><p>シナリオ問題で「変更(Change)」という語が出てきたら、<strong>どちらの文脈か</strong>を必ず見極めてください。「課題の捕捉・評価の手続き」を問われていればIssue Control、「抵抗感の低減」「新しい働き方への適応」「トレーニング」「周知」を問われていればOrganizational Change Managementです。</p></div><ul><li><strong>変革管理アプローチに含まれる典型的な要素</strong>:<ul><li>変革戦略(ステークホルダーをどう巻き込み、変革を受け入れてもらうか)</li><li>インパクト分析(誰が何を失い、誰が何を得るか)</li><li>抵抗管理・トレーニング計画・コミュニケーション計画</li></ul></li><li><strong>代表的なフレームワーク</strong>: PRINCE2公式教本自体は特定の変革管理モデルを義務づけませんが、実務ではProsciのADKARモデル(Awareness、Desire、Knowledge、Ability、Reinforcement)などの外部フレームワークと組み合わせて使われることが一般的です。</li></ul><div class="callout practice" data-testid="callout" data-variant="practice"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div><ul><li>変革の「なぜ」を、対象者ごとにセグメント化して伝える</li><li>プロジェクトマネージャーが一方的に変革を指示するのではなく、Senior Userなど適切なステークホルダーが変革を主導する形を整える(Practitioner試験では「PMが独断で変革を強制する」選択肢は誤りであることが多い)</li><li>人員削減への不安がある場合は、雇用の安定性やスキル移行についての明確なコミュニケーションを組み込む</li></ul></div><h3 id="heading-19">コミュニケーション (Communication) とコミュニケーション管理アプローチ</h3><p>LO2.3・LO2.4では、コミュニケーションへのアプローチの適用と、それを支えるコミュニケーション管理アプローチ(Communication Management Approach)という管理プロダクトの理解が問われます。</p><ul><li><strong>コミュニケーション管理アプローチの役割</strong>: ステークホルダー分析、各ステークホルダーへの情報の内容・頻度・手段・責任者を定義する。プロジェクト・イニシエーション・ドキュメンテーション(PID)の一部として作成されます。</li><li><strong>設計上の注意点</strong>: 他の管理アプローチ(リスク・品質・変革管理アプローチなど)が要求するコミュニケーションを取り込む必要があるため、実務上は<strong>他の管理アプローチを先にまとめ、コミュニケーション管理アプローチを最後に確定させる</strong>ことが推奨されます。</li></ul><div class="callout practice" data-testid="callout" data-variant="practice"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div><ul><li>プッシュ型(能動的に発信する報告書)とプル型(必要な人が能動的に参照するダッシュボードなど)を使い分ける</li><li>ハイライトレポートの頻度・粒度をステークホルダーの関与度に応じて調整する</li><li>デジタルツール(ダッシュボード、チャットツール)を活用しつつ、重要な意思決定は明文化して記録に残す(Digital and Data Management Approachとの連携)</li></ul></div>
    </section>

<section id="practices">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 05</div>
      <span class="domain-tag d3">LO3 · 51%</span>
      <h2 id="heading-20">Part 3: 7つのプラクティス (Practices) のテーラリングと適用</h2>
      <p><strong>配点51%、試験の合否を左右する最重要セクションです。</strong> 各プラクティスについて、シラバスの構成に沿って「①主要な管理プロダクト」「②関連する役割の関心事」「③効果的なマネジメントと関連技法」「④テーラリングの考慮点」の4点を整理します。</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_practicesOverview" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">7つのPracticesの相互関係</div></div><h3 id="heading-21">Business Case(ビジネスケース)</h3><p><strong>目的</strong>: プロジェクトが「望ましく(Desirable)」「実行可能で(Viable)」「達成可能(Achievable)」であり続けることを保証し、意思決定を支える。</p><h4 id="heading-22">主要な管理プロダクト</h4><div class="table-wrap"><table><thead><tr><th>管理プロダクト</th><th>役割</th></tr></thead><tbody><tr><td>Business Case(ビジネスケース)</td><td>投資判断の根拠。便益・コスト・タイムスケール・主要リスクをまとめた文書。ステージ境界ごとに見直される</td></tr><tr><td>PID: Benefits Management Approach(便益管理アプローチ)</td><td>便益をどう定義・測定・実現するかを定める。プロジェクト終了後の便益実現レビューの計画も含む</td></tr><tr><td>PID: Sustainability Management Approach(サステナビリティ管理アプローチ)</td><td>サステナビリティのパフォーマンスターゲットをどう達成・測定・報告するかを定める(V7新規)</td></tr><tr><td>Project Brief(プロジェクトブリーフ)</td><td>Starting up a Projectで作成される、プロジェクトの概要と初期ビジネスケースの土台</td></tr></tbody></table></div><h4 id="heading-23">主要な役割の関心事</h4><ul><li><strong>Executive</strong>: ビジネスケースの「所有者(Owner)」。投資対効果を継続的に確認し、ビジネス・ユーザー・サプライヤーの利害バランスを取る。</li><li><strong>Senior User</strong>: 便益が実際に実現されるかを確認。プロジェクト終了後の便益実現レビューにも責任を持つことが多い。</li><li><strong>Project Manager</strong>: ビジネスケースの起草・維持を支援し、各ステージでの見直しを促進する。</li></ul><h4 id="heading-24">効果的な管理と技法</h4><ul><li>5種類のケースタイプ(戦略的適合性、経済性、商業性、財務、管理面)から複数の観点でビジネスケースを検証する考え方</li><li>便益は「定性的/定量的」「金銭的/非金銭的」に分類して管理する</li><li>コスト・便益・リスクのバランスを定期的(ステージ境界ごと)に再評価する</li></ul><h4 id="heading-25">テーラリングの考慮点</h4><ul><li>小規模プロジェクトでは、ビジネスケースを簡潔な1ページ文書に凝縮してもよい</li><li>プログラムの一部であるプロジェクトでは、ビジネスケースの一部(便益の定義など)を上位のプログラムから継承できる</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「便益が実現しなくなったにもかかわらず、ビジネスケースが更新されないままプロジェクトが継続された」→原則違反(継続的なビジネス正当性)とBusiness Case実務の不備の両方が問われる複合問題になりやすい。</p></div><h3 id="heading-26">Organizing(組織化)</h3><p><strong>目的</strong>: プロジェクトの説明責任(Accountability)の構造を定義・確立し、「誰が何に責任を持つか」を明確にする。</p><h4 id="heading-22">主要な管理プロダクト</h4><div class="table-wrap"><table><thead><tr><th>管理プロダクト</th><th>役割</th></tr></thead><tbody><tr><td>PID: Project Management Team Structure(プロジェクトマネジメントチーム構造)</td><td>役割の階層・報告ラインを図示</td></tr><tr><td>PID: Role Descriptions(役割記述書)</td><td>各役割の責任・権限・必要スキルを明文化</td></tr><tr><td>PID: Commercial Management Approach(商用管理アプローチ)</td><td>サプライヤーとの契約・調達関係の管理方法を定義(V7で明確化)</td></tr></tbody></table></div><h4 id="heading-23">主要な役割の関心事</h4><ul><li><strong>Executive</strong>: 単一の説明責任者としてプロジェクト全体の成功に責任を持つ。プロジェクトマネジメントチームを任命する。</li><li><strong>Senior Supplier</strong>: 専門チームの技術的実現可能性とリソース確保に責任を持つ。</li><li><strong>Project Manager</strong>: 日々のマネジメントを委任される。ExecutiveやSenior User/Senior Supplierと兼任してはならない。</li></ul><h4 id="heading-24">効果的な管理と技法</h4><ul><li>4つの管理レベル(Corporate/Programme、Directing、Managing、Delivering)に沿って役割を配置する</li><li>役割は「人」ではなく「機能」として定義し、1人が複数役割を兼任することも、1つの役割を複数人で分担することも可能(ただし利害相反に注意)</li><li>Project Assurance(プロジェクトアシュアランス)はProject Manager配下ではなく、Project Boardから独立した形で運用する</li></ul><h4 id="heading-25">テーラリングの考慮点</h4><ul><li>小規模組織ではExecutiveがSenior Userを兼任することもあるが、Executive/Project ManagerとSenior Supplierの兼任は利害相反リスクが高いため推奨されない</li><li>商用契約が存在しない内部プロジェクトでは、Commercial Management Approachを簡略化・省略できる</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「Executiveがプロジェクトマネージャーを兼任している」「Senior UserとSenior Supplierが同一人物」といった役割の兼任シナリオで、利害相反リスクを見抜けるかが問われます。</p></div><h3 id="heading-31">Plans(計画)</h3><p><strong>目的</strong>: プロジェクトの「誰が、何を、いつ、どこで、どのように、いくらで」実現するかを定義する。</p><h4 id="heading-22">主要な管理プロダクト</h4><div class="table-wrap"><table><thead><tr><th>管理プロダクト</th><th>役割</th></tr></thead><tbody><tr><td>Plan(Project/Stage/Team/Exception Plan)</td><td>階層構造を持つ4種類の計画(プロジェクト計画、ステージ計画、チーム計画、例外計画)</td></tr><tr><td>Project Product Description(プロジェクトプロダクト記述書)</td><td>プロジェクト全体の最終成果物の記述。品質期待・受入基準・サステナビリティ要件を含む</td></tr><tr><td>Work Package Description(ワークパッケージ記述書)</td><td>チームマネージャーに委任される作業単位の記述</td></tr></tbody></table></div><h4 id="heading-23">主要な役割の関心事</h4><ul><li><strong>Senior Supplier</strong>: 計画がリソース面・技術面で実現可能かを確認。</li><li><strong>Project Manager</strong>: プロジェクト計画・ステージ計画を作成し、Project Boardの承認を得る。</li><li><strong>Team Manager</strong>: チーム計画を作成し、ワークパッケージを実行する。</li></ul><h4 id="heading-24">効果的な管理と技法</h4><ul><li><strong>プロダクトベースプランニング(Product-based Planning)</strong>: 「アクティビティ」ではなく「プロダクト」を起点に計画する技法。手順は概ね次の通り。<ol><li>Project Product Description(最終成果物記述)の作成</li><li>Product Breakdown Structure(プロダクト分解構造)の作成</li><li>各プロダクトのProduct Description(記述書)の作成</li><li>Product Flow Diagram(プロダクトフロー図、依存関係)の作成</li></ol></li><li>スコープの取りこぼしを防ぎ、成果物の依存関係を可視化できるのが最大の利点</li><li>計画は階層化されており、上位計画ほど粗く、下位計画(チーム計画)ほど詳細になる</li></ul><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_productBasedPlanning" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">プロダクトベースプランニングの手順</div></div><h4 id="heading-25">テーラリングの考慮点</h4><ul><li>アジャイル的な delivery approach(反復・インクリメンタル型)を採用する場合、チーム計画をより短いサイクル(スプリント等)で回し、ステージ計画と整合させる</li><li>ローリングウェーブプランニング(直近ステージは詳細に、将来ステージは概略のみ)を採用することで、不確実性の高いプロジェクトに対応できる</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「プロジェクトマネージャーがアクティビティベースでいきなり計画を立て、成果物の定義や依存関係を明確にしなかった」→プロダクトベースプランニングの不備、および「プロダクトへのフォーカス」原則違反。</p></div><h3 id="heading-36">Quality(品質)</h3><p><strong>目的</strong>: ユーザーの要求事項と期待が満たされることを保証する。</p><h4 id="heading-22">主要な管理プロダクト</h4><div class="table-wrap"><table><thead><tr><th>管理プロダクト</th><th>役割</th></tr></thead><tbody><tr><td>Product Description(プロダクト記述書)</td><td>個々のプロダクトの品質基準・受入基準を定義</td></tr><tr><td>Project log: Product Register(プロダクトレジスタ)</td><td>全プロダクトの状態を一覧管理</td></tr><tr><td>PID: Quality Management Approach(品質管理アプローチ)</td><td>品質基準、品質責任、品質保証・品質統制の方法を定義</td></tr><tr><td>Project log: Quality Register(品質レジスタ)</td><td>実施された品質検証活動の記録</td></tr></tbody></table></div><h4 id="heading-23">主要な役割の関心事</h4><ul><li><strong>Senior User</strong>: 品質期待(Quality Expectations)と受入基準(Acceptance Criteria)を定義する主要な責任者。</li><li><strong>Senior Supplier</strong>: 定義された品質基準を満たす技術的な実現可能性を保証。</li><li><strong>Project Assurance</strong>: 品質マネジメント活動が独立した視点から適切に行われているかを確認。</li></ul><h4 id="heading-24">効果的な管理と技法</h4><ul><li><strong>品質計画(Quality Planning)</strong>: 品質期待の捕捉 → 受入基準の定義 → Project Product Descriptionへの記載 → 各プロダクトのQuality Criteria(品質基準)への展開、という流れ。</li><li><strong>品質統制(Quality Control)</strong>: 品質基準に対して実際にプロダクトを検証する活動。代表的技法が<strong>Quality Review Technique(品質レビュー技法)</strong>で、通常はレビュー準備 → レビューミーティング(誤りの特定、修正の合意) → フォローアップ、というステップで進む。</li><li>品質保証(Quality Assurance、組織横断的な独立確認)と、プロジェクト内のQuality Control(品質統制)を区別する。</li></ul><h4 id="heading-25">テーラリングの考慮点</h4><ul><li>ソフトウェア開発など反復型のデリバリーでは、品質レビューを各スプリント/イテレーションの終わりに組み込む</li><li>規制の厳しい業界(医薬品、金融など)では、外部の品質保証機関によるレビューを品質管理アプローチに明記する</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「受入基準が曖昧なまま開発が進み、納品後にユーザーから『期待していたものと違う』と指摘された」→品質期待の捕捉不足、Project Product Descriptionの記述不備。</p></div><h3 id="heading-41">Risk(リスク)</h3><p><strong>目的</strong>: プロジェクト期間中に発生しうる不確実な事象(脅威と好機の両方)を識別・評価・コントロールする。</p><h4 id="heading-22">主要な管理プロダクト</h4><div class="table-wrap"><table><thead><tr><th>管理プロダクト</th><th>役割</th></tr></thead><tbody><tr><td>PID: Risk Management Approach(リスク管理アプローチ)</td><td>リスク管理の手続き、役割、許容範囲(Risk Tolerance)を定義</td></tr><tr><td>Project log: Risk Register(リスクレジスタ)</td><td>識別された全リスクの記録(内容、確率、影響、対応、ステータス)</td></tr></tbody></table></div><h4 id="heading-23">主要な役割の関心事</h4><ul><li><strong>Executive</strong>: ビジネスケースに関連する戦略的リスクの識別・評価・統制に責任。</li><li><strong>Project Manager</strong>: 日々のリスク管理活動を実施し、リスクレジスタを維持する。</li><li><strong>すべての役割</strong>: リスクの識別はプロジェクト関係者全員の責務。</li></ul><h4 id="heading-24">効果的な管理と技法</h4><p>PRINCE2のリスクマネジメント手続きは、概ね以下のサイクルで構成されます。</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_riskCycle" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">リスクマネジメント手続きのサイクル</div></div><ul><li><strong>脅威(Threat)への対応戦略の例</strong>: 回避(Avoid)、低減(Reduce)、転嫁(Transfer)、受容(Accept)、コンティンジェンシー確保(Fallback/Share)</li><li><strong>好機(Opportunity)への対応戦略の例</strong>: 活用(Exploit)、強化(Enhance)、共有(Share)、受容(Reject/Accept)</li><li>PRINCE2の大きな特徴は、<strong>脅威だけでなく「好機」も積極的に管理対象とする</strong>点です。多くの現場ではリスク=脅威と捉えがちですが、Practitioner試験では好機を見落としているシナリオが誤りとして問われます。</li></ul><h4 id="heading-25">テーラリングの考慮点</h4><ul><li>高リスクプロジェクトでは、Risk Registerの更新頻度を上げ、定量的リスク分析(期待金銭価値=EMVなど)を導入する</li><li>小規模プロジェクトでは、リスク管理アプローチを簡潔にし、組織の標準リスク許容度をそのまま援用してもよい</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「あるリスクが顕在化した際に、それが『課題(Issue)』として扱われず放置された」→Risk PracticeとIssues Practiceの接続不備(リスクが顕在化したら課題管理プロセスに引き継ぐ必要がある)。</p></div><h3 id="heading-46">Issues(課題)</h3><p><strong>目的</strong>: すでに発生した課題に対応し、プロジェクトのベースライン(合意済みの計画・仕様)への変更をコントロールする。V6の「Change(変更)」テーマから改称。</p><h4 id="heading-22">主要な管理プロダクト</h4><div class="table-wrap"><table><thead><tr><th>管理プロダクト</th><th>役割</th></tr></thead><tbody><tr><td>PID: Issue Management Approach(課題管理アプローチ)</td><td>課題の捕捉・評価・意思決定・記録の手続きを定義</td></tr><tr><td>Issue Register(課題レジスタ)</td><td>すべての正式な課題の一覧(種類、説明、優先度、深刻度、ステータス)</td></tr><tr><td>Issue Report(課題報告書)</td><td>個々の課題の詳細な検討結果</td></tr></tbody></table></div><h4 id="heading-23">主要な役割の関心事</h4><ul><li><strong>Change Authority(変更権限者)</strong>: Project Boardから権限委譲を受け、一定範囲の変更要求について意思決定を行う役割(必要に応じて設置)。</li><li><strong>Project Manager</strong>: 日々の課題を捕捉・評価し、許容範囲内であれば自ら対応、範囲を超える場合はエスカレーションする。</li><li><strong>Project Assurance</strong>: 課題管理手続きが適切に運用されているかを確認。</li></ul><h4 id="heading-24">効果的な管理と技法</h4><p>課題は大きく3種類に分類されます。</p><div class="table-wrap"><table><thead><tr><th>課題の種類</th><th>内容</th></tr></thead><tbody><tr><td>Request for Change(変更要求)</td><td>スコープ・仕様の変更を求めるもの</td></tr><tr><td>Off-specification(仕様不適合)</td><td>合意された仕様を満たせない、または満たせなくなったプロダクト</td></tr><tr><td>Problem/Concern(問題・懸念)</td><td>上記以外の、対応が必要な事項全般</td></tr></tbody></table></div><p>課題対応の標準的な手続き:</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_issueHandling" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">課題対応の標準的な手続き</div></div><h4 id="heading-25">テーラリングの考慮点</h4><ul><li>変更頻度が高いプロジェクト(アジャイル型など)では、Change Authorityを設置してProject Boardの負荷を軽減する</li><li>変更管理の厳格さは、規制要件・契約形態(固定価格契約か、タイム&amp;マテリアル契約か)に応じて調整する</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「軽微な変更要求についてまでProject Boardの承認を毎回求め、プロジェクトの停滞を招いた」→Change Authorityの未活用、または許容範囲設定の不備。</p></div><h3 id="heading-51">Progress(進捗)</h3><p><strong>目的</strong>: プロジェクトの実績を計画と比較して追跡・監視し、意思決定を支える情報を提供する。</p><h4 id="heading-22">主要な管理プロダクト</h4><div class="table-wrap"><table><thead><tr><th>管理プロダクト</th><th>役割</th></tr></thead><tbody><tr><td>Project log: Daily Log(デイリーログ)</td><td>正式な記録を要しない軽微な事項の記録</td></tr><tr><td>Project log: Lessons Log(教訓ログ)</td><td>プロジェクト期間中に得られた教訓の継続的な記録</td></tr><tr><td>Lessons Report(教訓報告書)</td><td>ステージ・プロジェクト終了時にまとめられる教訓</td></tr><tr><td>End Stage Report(ステージ終了報告書)</td><td>ステージ完了時の実績報告</td></tr><tr><td>End Project Report(プロジェクト終了報告書)</td><td>プロジェクト全体の実績報告</td></tr><tr><td>Checkpoint Report(チェックポイント報告書)</td><td>Team ManagerからProject Managerへの定期報告</td></tr><tr><td>Highlight Report(ハイライト報告書)</td><td>Project ManagerからProject Boardへの定期報告</td></tr><tr><td>Exception Report(例外報告書)</td><td>許容範囲逸脱が予測される際にProject Boardへ提出される報告書</td></tr><tr><td>PID: Digital and Data Management Approach(デジタル・データ管理アプローチ)</td><td>プロジェクトデータ・情報をどう収集・管理・活用するか(V7新規)</td></tr></tbody></table></div><h4 id="heading-23">主要な役割の関心事</h4><ul><li><strong>Project Board</strong>: ステージ境界ごとに進捗を確認し、次ステージへの継続可否を判断。</li><li><strong>Project Manager</strong>: 日々の進捗をトレランスと照合し、ハイライトレポートを通じて報告。</li><li><strong>Team Manager</strong>: チェックポイントレポートを通じてワークパッケージの進捗を報告。</li></ul><h4 id="heading-24">効果的な管理と技法</h4><ul><li><strong>イベント駆動型コントロール(Event-driven controls)</strong>: 特定の出来事(ステージ終了、例外の発生、課題の発生など)をトリガーに実施される管理活動。</li><li><strong>時間駆動型コントロール(Time-driven controls)</strong>: 一定の周期(週次・月次など)で実施される定期報告。</li><li><strong>トレランスと例外</strong>: 各レベルで設定されたトレランスを超える(または超えると予測される)場合、Exception Reportを通じて上位レベルへエスカレーションし、Exception Plan(例外計画)の承認を得る。</li></ul><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_progressReporting" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">報告のエスカレーション経路</div></div><h4 id="heading-25">テーラリングの考慮点</h4><ul><li>報告の頻度・詳細度は、ステークホルダーの関与度とプロジェクトのリスクレベルに応じて調整する</li><li>V7ではデジタルダッシュボードによるリアルタイムな進捗可視化が、従来の書面報告を補完する手段として明示的に位置づけられている</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「トレランス逸脱が予測されたにもかかわらず、Project ManagerがException Reportを提出せず自己判断で進めた」→Manage by exception原則とProgress Practiceの重大な違反。</p></div>
    </section>

<section id="processes">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 06</div>
      <span class="domain-tag d4">LO4 · 30%</span>
      <h2 id="heading-56">Part 4: 7つのプロセス (Processes) の適用と分析</h2>
      <p><strong>配点30%。</strong> プロセスは「誰が・いつ・何を行うか」という活動の連鎖です。Practitioner試験では、各プロセスの「①活動・インプット・アウトプット」「②推奨される役割と責任(RACI)」「③プラクティスがどう適用されるか」を、シナリオに即して分析することが求められます。</p><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p>以下のRACI表は、PRINCE2の一般的な役割配置の考え方に基づく目安であり、実際の配分はプロジェクトごとにテーラリングされます(R=実行責任者/Responsible, A=説明責任者/Accountable, C=協議先/Consulted, I=報告先/Informed)。</p></div><h3 id="heading-57">全体像: プロセスモデル</h3><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_processModel" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">PRINCE2 7プロセスモデルの全体像</div></div><p>重要なポイント:</p><ul><li><strong>Directing a Project(DP)はプロジェクト全期間を通じてProject Boardが行う</strong>プロセスであり、他のプロセスと並行して常に存在します。</li><li><strong>Controlling a Stage(CS)とManaging Product Delivery(MP)は、各デリバリーステージ内で並行して繰り返される</strong>プロセスです(CS=Project Managerの視点、MP=Team Managerの視点)。</li><li><strong>Managing a Stage Boundary(SB)は、最終ステージの直前では実施されません</strong>。最終ステージの終わりはSBではなくClosing a Project(CP)に置き換わります。</li></ul><h3 id="heading-58">Starting up a Project(SU) — プロジェクトの立ち上げ</h3><p><strong>目的</strong>: プロジェクトを開始する価値があるかどうかを、最小限のコストと時間で確認する「プレプロジェクト」の活動。</p><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>主なインプット</td><td>Project Mandate(プロジェクトマンデート、上位組織からの指示)</td></tr><tr><td>主な活動</td><td>Executiveおよびプロジェクトマネジメントチームの任命、過去の教訓の確認、Project Approach(プロジェクトアプローチ)の決定、各種管理アプローチの概要合意、Project Brief作成、Initiation Stage Plan(初期ステージ計画)作成</td></tr><tr><td>主なアウトプット</td><td>Project Brief、Initiation Stage Plan、プロジェクト定義文書一式</td></tr></tbody></table></div><h4 id="heading-59">RACI(目安)</h4><div class="table-wrap"><table><thead><tr><th>活動</th><th>Corporate/Programme</th><th>Executive</th><th>Project Manager</th><th>Project Assurance</th></tr></thead><tbody><tr><td>Project Mandateの発行</td><td>A/R</td><td>I</td><td>I</td><td>-</td></tr><tr><td>Executiveの任命</td><td>A</td><td>-</td><td>-</td><td>-</td></tr><tr><td>Project Managerの任命</td><td>I</td><td>A/R</td><td>-</td><td>-</td></tr><tr><td>Project Brief作成</td><td>I</td><td>A</td><td>R</td><td>C</td></tr><tr><td>Initiation Stage Plan作成</td><td>I</td><td>A</td><td>R</td><td>C</td></tr></tbody></table></div><h4 id="heading-60">プラクティスの適用</h4><ul><li><strong>Business Case</strong>: アウトラインビジネスケースを作成(詳細版はIPで完成)</li><li><strong>Organizing</strong>: プロジェクトマネジメントチームの初期構成を決定</li><li><strong>Plans</strong>: Initiation Stage Planのみを作成(プロジェクト全体計画はまだ作らない)</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「Project Brief作成前に、詳細なプロジェクト計画をいきなり作り始めた」→SUの目的(最小コストでの実行可否判断)を逸脱している。</p></div><h3 id="heading-61">Directing a Project(DP) — プロジェクトの指揮</h3><p><strong>目的</strong>: Project Boardが、プロジェクトの主要な意思決定ポイント(開始・各ステージの承認・重大な課題への対応・終了)で方向性を示す。日々のマネジメントには関与しない。</p><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>主な活動</td><td>立ち上げの承認、プロジェクトの開始承認、ステージ/例外計画の承認、アドホックな指示の提供、プロジェクト終了の承認</td></tr><tr><td>特徴</td><td>プロジェクト全体を通じて継続する唯一のプロセス。Project Boardが主体で、Project Managerが情報を提供する形で連携</td></tr></tbody></table></div><h4 id="heading-59">RACI(目安)</h4><div class="table-wrap"><table><thead><tr><th>活動</th><th>Project Board(Executive/SU/SS)</th><th>Project Manager</th></tr></thead><tbody><tr><td>立ち上げの許可</td><td>A/R</td><td>C(Project Brief提出)</td></tr><tr><td>プロジェクト開始の承認</td><td>A/R</td><td>C(PID提出)</td></tr><tr><td>ステージ承認</td><td>A/R</td><td>C(End Stage Report/次Stage Plan提出)</td></tr><tr><td>例外への対応</td><td>A/R</td><td>C(Exception Report提出)</td></tr><tr><td>プロジェクト終了の承認</td><td>A/R</td><td>C(End Project Report提出)</td></tr></tbody></table></div><h4 id="heading-60">プラクティスの適用</h4><ul><li><strong>Progress</strong>: Highlight ReportやExceptionReportを通じてProject Boardが状況を把握する中心的な接点</li><li><strong>Business Case</strong>: 各承認ポイントで、Executiveがビジネスケースの妥当性を再確認する</li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「Project Boardが日々の業務判断にまで介入し、マイクロマネジメントを行った」→DPの目的(戦略的な方向づけに徹する)からの逸脱。逆に「重大な例外が発生したのにProject Boardが関与しなかった」も同様に問題。</p></div><h3 id="heading-64">Initiating a Project(IP) — プロジェクトの開始</h3><p><strong>目的</strong>: プロジェクトを適切にコントロールするための強固な基盤を確立する。プロジェクトの「何を・なぜ・どのように」を全ステークホルダーが共有できる状態にする。</p><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>主な活動</td><td>各種管理アプローチ(品質・リスク・課題・変革・コミュニケーション・商用・サステナビリティ・デジタル&amp;データ)の合意、プロジェクト統制の確立、プロジェクト計画の作成、詳細ビジネスケースの作成、PID(Project Initiation Documentation)の組み立て</td></tr><tr><td>主なアウトプット</td><td>PID一式、Project Plan、Benefits Management Approach</td></tr></tbody></table></div><p>管理アプローチは並行して作成できますが、他のアプローチが要求するコミュニケーションを取り込む必要があるため、<strong>Communication Management Approachは最後に確定させる</strong>ことが推奨されます。</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_ipApproaches" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">管理アプローチの合意順序(IP)</div></div><h4 id="heading-59">RACI(目安)</h4><div class="table-wrap"><table><thead><tr><th>活動</th><th>Project Board</th><th>Project Manager</th><th>Project Assurance</th></tr></thead><tbody><tr><td>管理アプローチの合意</td><td>A</td><td>R</td><td>C</td></tr><tr><td>Project Planの作成</td><td>A</td><td>R</td><td>C</td></tr><tr><td>詳細Business Caseの作成</td><td>A(Executive)</td><td>R</td><td>C</td></tr><tr><td>PIDの承認</td><td>A/R</td><td>C(提出)</td><td>C</td></tr></tbody></table></div><h4 id="heading-60">プラクティスの適用</h4><p>7つのプラクティスすべてがIPで本格的に立ち上がります。特にBusiness Case(詳細版の完成)、Plans(プロジェクト計画)、Organizing(役割記述書の確定)が中心的です。</p><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「PIDが完成する前に本格的な作業(デリバリーステージの実作業)が始まってしまった」→統制基盤が整う前の作業着手というガバナンス上の問題。</p></div><h3 id="heading-67">Controlling a Stage(CS) — ステージの統制</h3><p><strong>目的</strong>: 各管理ステージにおいて、Project Managerが日々の作業を割り当て、進捗を監視し、トレランス内でプロジェクトを運営する。Project Managerが最も多くの時間を費やすプロセス。</p><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>主な活動</td><td>ワークパッケージの承認(Authorize a Work Package)、進捗のレビュー、課題・リスクの捕捉と評価、Highlight Reportの作成、必要に応じたException Reportの作成、是正措置の実施</td></tr><tr><td>トリガー</td><td>ステージの開始(SBまたはIPで承認された後)</td></tr></tbody></table></div><h4 id="heading-59">RACI(目安)</h4><div class="table-wrap"><table><thead><tr><th>活動</th><th>Project Manager</th><th>Team Manager</th><th>Project Board</th></tr></thead><tbody><tr><td>ワークパッケージの承認</td><td>A/R</td><td>I</td><td>I</td></tr><tr><td>進捗の監視</td><td>A/R</td><td>R(報告)</td><td>I</td></tr><tr><td>Highlight Report作成</td><td>A/R</td><td>C</td><td>I</td></tr><tr><td>Exception Report作成</td><td>A/R</td><td>C</td><td>I(→対応判断)</td></tr><tr><td>課題・リスクの捕捉</td><td>A</td><td>R</td><td>C</td></tr></tbody></table></div><h4 id="heading-60">プラクティスの適用</h4><p>Issues・Risk・Progressの3プラクティスが最も活発に動くプロセスです。Business CaseやSustainability Management Approachで設定されたトレランスとの照合が継続的に行われます。</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_csControlFlow" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">ステージ統制のサイクル(CS)</div></div><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「Project ManagerがTeam Managerに正式なワークパッケージの承認をせず、口頭で作業を依頼した」→統制の欠如。試験ではこの種の「手続きの省略」がしばしば問題として扱われます。</p></div><h3 id="heading-70">Managing Product Delivery(MP) — プロダクトデリバリーの管理</h3><p><strong>目的</strong>: Team Managerが、合意された品質基準・タイムスケール・コストの範囲内でプロダクトを実際に生み出すことを保証する。Project ManagerとTeam Managerの接点となるプロセス。</p><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>主な活動</td><td>ワークパッケージの受諾(Accept a Work Package)、ワークパッケージの実行、ワークパッケージの納品(Deliver a Work Package)</td></tr><tr><td>特徴</td><td>Project Managerの管理レベルとTeam Managerのデリバリーレベルの境界に位置するプロセス。外部サプライヤーが担う場合、契約(Commercial Management Approach)を通じて統制される</td></tr></tbody></table></div><h4 id="heading-59">RACI(目安)</h4><div class="table-wrap"><table><thead><tr><th>活動</th><th>Team Manager</th><th>Project Manager</th><th>チームメンバー</th></tr></thead><tbody><tr><td>ワークパッケージの受諾</td><td>A/R</td><td>C</td><td>I</td></tr><tr><td>実行と品質検証</td><td>A/R</td><td>I(Checkpoint経由)</td><td>R</td></tr><tr><td>完成プロダクトの納品</td><td>A/R</td><td>C(承認)</td><td>R</td></tr></tbody></table></div><h4 id="heading-60">プラクティスの適用</h4><p>Quality Practice(プロダクトが品質基準を満たすかの検証)とProgress Practice(Checkpoint Reportによる報告)が中心です。</p><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「Team Managerがワークパッケージの受諾時に、実現可能性・必要なリソース・品質基準を十分確認せず引き受けた」→MPの目的(合意された範囲内での確実な実行)を損なう。</p></div><h3 id="heading-73">Managing a Stage Boundary(SB) — ステージ境界の管理</h3><p><strong>目的</strong>: 現在のステージの実績を評価し、次のステージ計画を作成し、プロジェクト継続の妥当性をProject Boardが判断できるようにする。</p><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>トリガー</td><td>ステージ終了が近づいたとき、または例外計画が必要になったとき</td></tr><tr><td>主な活動</td><td>次ステージ計画(Next Stage Plan)の作成、Business Caseの更新、リスク・課題状況の更新、End Stage Reportの作成、(必要時)Exception Planの作成</td></tr><tr><td>主なアウトプット</td><td>End Stage Report、Next Stage Plan、更新されたBusiness Case</td></tr></tbody></table></div><h4 id="heading-59">RACI(目安)</h4><div class="table-wrap"><table><thead><tr><th>活動</th><th>Project Manager</th><th>Project Board</th><th>Project Assurance</th></tr></thead><tbody><tr><td>End Stage Report作成</td><td>A/R</td><td>I</td><td>C</td></tr><tr><td>Next Stage Plan作成</td><td>A/R</td><td>I</td><td>C</td></tr><tr><td>Business Case更新</td><td>R</td><td>A(Executive)</td><td>C</td></tr><tr><td>ステージ完了・次ステージ承認</td><td>I(提出)</td><td>A/R</td><td>C</td></tr></tbody></table></div><h4 id="heading-60">プラクティスの適用</h4><p>Business Case(継続的正当性の再確認)とProgress(実績評価)が中心。Sustainability Management Approachで設定されたサステナビリティトレランスの見直しもこのプロセスで行われます。</p><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>重要な例外</strong>: 最終ステージの終わりでは、SBではなく<strong>Closing a Project(CP)</strong>が実施されます(次ステージが存在しないため)。</p></div><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「ステージが完了する前に、Project Boardの承認なしにProject Managerが次ステージの作業を開始した」→「段階による管理」原則とSBプロセスの重大な違反。</p></div><h3 id="heading-76">Closing a Project(CP) — プロジェクトのクロージング</h3><p><strong>目的</strong>: プロジェクトの終了(計画通りの終了、または早期終了)を適切に管理し、成果物の引き渡しと評価を確実に行う。</p><div class="table-wrap"><table><thead><tr><th>項目</th><th>内容</th></tr></thead><tbody><tr><td>主な活動</td><td>計画された終結の準備、早期終結の準備(該当する場合)、プロダクトのハンドオーバー、プロジェクトの評価、Project Boardへの終結の推奨</td></tr><tr><td>主なアウトプット</td><td>End Project Report、Lessons Report、Follow-on Action Recommendations(フォローオンアクション勧告)、Benefits Management Approachの更新</td></tr></tbody></table></div><h4 id="heading-59">RACI(目安)</h4><div class="table-wrap"><table><thead><tr><th>活動</th><th>Project Manager</th><th>Project Board</th><th>Senior User</th></tr></thead><tbody><tr><td>プロダクトのハンドオーバー</td><td>A/R</td><td>I</td><td>C(受入確認)</td></tr><tr><td>End Project Report作成</td><td>A/R</td><td>I</td><td>C</td></tr><tr><td>終結の推奨</td><td>R(推奨)</td><td>A(承認)</td><td>C</td></tr><tr><td>便益実現レビュー計画の更新</td><td>R</td><td>A</td><td>C</td></tr></tbody></table></div><h4 id="heading-60">プラクティスの適用</h4><ul><li><strong>Business Case</strong>: 実績(実コスト・実便益)を記録し、将来の便益実現レビュー計画に反映</li><li><strong>Progress</strong>: 教訓(Lessons)を最終的に取りまとめる</li><li><strong>Sustainability</strong>: プロジェクトのサステナビリティ実績を評価し報告する(V7で明確化)</li></ul><p>早期終結(Premature Closure)の場合も、通常の終結と同様に、実施済み作業の評価・成果物の引き渡し・教訓の記録は省略せずに行う必要がある点に注意してください。</p><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner頻出パターン</strong>: 「プロジェクトが早期終結される際、教訓の記録や成果物の適切な引き渡しが省略された」→CPの目的(どのような終了であっても適切な評価と引き渡しを行う)の逸脱。</p></div>
    </section>

<section id="roles-responsibilities">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 07</div>
      
      <h2 id="heading-79">Part 5: 役割と責任 (Roles &amp; Responsibilities) の総括</h2>
      <p>Practitioner試験のMatching形式問題(3点問題)では、「この活動の責任者は誰か」を問う出題が頻出します。以下は役割ごとの中心的な責任の総括です。</p><div class="diagram-card mermaid-wrap"><ClientOnly><MermaidDiagram :chart="DIAGRAM_rolesHierarchy" theme="base" :theme-variables="LIGHT_THEME_VARS" /><template #fallback><div class="diagram-loading">図を読み込み中...</div></template></ClientOnly><div class="diagram-caption">役割の階層構造</div></div><h3 id="heading-80">役割別・責任サマリー</h3><div class="table-wrap"><table><thead><tr><th>役割</th><th>階層</th><th>中心的な責任</th><th>兼任時の注意</th></tr></thead><tbody><tr><td><strong>Executive</strong></td><td>Project Board(指揮)</td><td>Business Caseの所有、投資対効果の維持、ビジネス・ユーザー・サプライヤー利害のバランス、プロジェクトマネジメントチームの任命</td><td>Project Managerとの兼任は不可</td></tr><tr><td><strong>Senior User</strong></td><td>Project Board(指揮)</td><td>ユーザー要求・品質期待・受入基準の定義、便益実現への責任</td><td>Senior Supplierとの兼任は利害相反リスクが高い</td></tr><tr><td><strong>Senior Supplier</strong></td><td>Project Board(指揮)</td><td>専門プロダクトの技術的実現可能性、リソースの確保、供給側の品質責任</td><td>Senior Userとの兼任は利害相反リスクが高い</td></tr><tr><td><strong>Project Manager</strong></td><td>管理</td><td>日々のマネジメント、計画作成、進捗・リスク・課題の管理、Project Boardへの報告</td><td>Executiveとの兼任は不可</td></tr><tr><td><strong>Team Manager</strong></td><td>デリバリー</td><td>ワークパッケージの受諾・実行・納品、チームメンバーの管理</td><td>小規模プロジェクトではProject Managerが兼任することもある</td></tr><tr><td><strong>Project Assurance</strong></td><td>独立確認</td><td>Project Boardに代わり、独立した立場でプロジェクトが正しく管理されているかを監督・助言。Business/User/Supplierの3つの視点に分解可能</td><td>Project Managerが兼任することはできない(独立性の原則)</td></tr><tr><td><strong>Project Support</strong></td><td>支援</td><td>事務支援、専門ツール(計画技法など)の提供、記録・レジスタの維持、変更管理手続きの運営補助</td><td>Project Managerが兼任することもある(小規模プロジェクト)</td></tr><tr><td><strong>Change Authority</strong></td><td>独立確認(委任時)</td><td>Project Boardから権限委譲を受け、一定範囲の変更要求の意思決定を行う</td><td>必須ではなく、必要に応じて設置される役割</td></tr></tbody></table></div><h3 id="heading-81">兼任(コンバイン)の可否早見表</h3><div class="table-wrap"><table><thead><tr><th>組み合わせ</th><th>可否</th><th>理由</th></tr></thead><tbody><tr><td>Executive + Project Manager</td><td><strong>不可</strong></td><td>説明責任と実行責任の分離が崩れる</td></tr><tr><td>Senior User + Senior Supplier</td><td><strong>推奨されない</strong></td><td>利害相反(要求側と供給側)のリスクが高い</td></tr><tr><td>Project Manager + Project Assurance</td><td><strong>不可</strong></td><td>独立した監督機能が損なわれる</td></tr><tr><td>Project Manager + Team Manager</td><td>可(小規模プロジェクト)</td><td>規模が小さい場合は現実的な選択肢</td></tr><tr><td>Project Manager + Project Support</td><td>可(小規模プロジェクト)</td><td>同上</td></tr><tr><td>Senior User(複数人)</td><td>可</td><td>大規模・複数部門にまたがる場合に分担可能</td></tr></tbody></table></div>
    </section>

<section id="v7-new-elements">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:leaf" aria-hidden="true" />SECTION 08</div>
      
      <h2 id="heading-82">Part 6: V7の新要素 — Sustainability/ESG、Digital &amp; Data、Commercial</h2>
      <p>これらはPart 3のプラクティス(主にBusiness Case、Progress、Organizing)の管理プロダクトとして組み込まれていますが、V7の思想的な柱であるためPractitioner試験でも独立した理解が問われやすく、ここで横断的に整理します。</p><h3 id="heading-83">Sustainability Management Approach(サステナビリティ管理アプローチ)</h3><ul><li>サステナビリティはV7で<strong>7番目のパフォーマンスターゲット</strong>として正式に位置づけられました(第2章参照)。</li><li>国連の持続可能な開発目標(UN SDGs、17のゴール)やESG(環境・社会・ガバナンス)の観点との整合が推奨されています。</li><li><strong>サステナビリティトレランス(Sustainability Tolerance)</strong>: 他のパフォーマンスターゲットと同様に許容範囲が設定され、Business Caseに記載されます。逸脱が予測される場合は他のトレランス逸脱と同様にエスカレーションされます。</li><li><strong>プロセスへの組み込み例</strong>:<ul><li>DP: Project Boardがサステナビリティ管理アプローチとトレランスを承認</li><li>MP: サステナビリティ要件を踏まえてワークパッケージが実行される</li><li>SB: Business Caseとともにサステナビリティ実績を見直す</li><li>CP: プロジェクトのサステナビリティ実績を評価・報告</li></ul></li></ul><div class="callout note" data-testid="callout" data-variant="note"><div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div><p><strong>Practitioner的な視点</strong>: シナリオで「コスト削減のために環境配慮を後回しにした」といった記述があれば、サステナビリティトレランスの軽視として問題視される可能性があります。</p></div><h3 id="heading-84">Digital and Data Management Approach(デジタル・データ管理アプローチ)</h3><ul><li>Progressプラクティスの管理プロダクトの1つとして新設されました。</li><li>プロジェクトが生成・利用するデータや情報を、<strong>どのツールで、誰が、どのように管理・保護・活用するか</strong>を定義します。</li><li>ダッシュボードやコラボレーションツールによるリアルタイムな進捗可視化を、従来の書面ベースの報告(Highlight Reportなど)と組み合わせる考え方が示されています。</li><li>データのセキュリティ・プライバシー・品質(正確性)も対象範囲に含まれます。</li></ul><h3 id="heading-85">Commercial Management Approach(商用管理アプローチ)</h3><ul><li>Organizingプラクティスの管理プロダクトの1つとして明確化されました。</li><li>外部サプライヤーとの契約関係、調達方法、契約タイプ(固定価格、タイム&amp;マテリアルなど)ごとのリスク配分の考え方を定義します。</li><li>内部リソースのみで完結するプロジェクトでは、この管理アプローチを大幅に簡略化・省略できます(テーラリングの好例)。</li></ul>
    </section>

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
    grid-template-columns: repeat(auto-fit, minmax(min(140px, 100%), 1fr));
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
    scroll-margin-top: calc(var(--global-nav-height) + 32px);
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
    grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr));
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

  ul { list-style-type: disc; }
  ol { list-style-type: decimal; }
  .main-content { min-width: 0; max-width: 1440px; }
  :is(h2, h3, h4) { scroll-margin-top: calc(var(--global-nav-height) + 32px); }
  .disclaimer-box { display: flex; align-items: flex-start; gap: 10px; }
  .disclaimer-box > span { flex: 1; min-width: 0; }
  .disclaimer-box > :deep(.iconify) { flex: none; margin-top: 4px; }
  .sidebar-nav :deep(.iconify) { flex: none; font-size: 17px; color: var(--color-ink-faint); }
  .sidebar-nav a.active :deep(.iconify) { color: var(--color-indigo); }

</style>
