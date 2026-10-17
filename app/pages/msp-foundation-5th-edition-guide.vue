<script setup lang="ts">
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
        </section>

        <!-- Section 2 -->
        <section id="exam-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 02</div>
          <h2>試験の全体像</h2>
        </section>

        <!-- Section 3 -->
        <section id="programme-project-portfolio">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 03</div>
          <h2>プログラム・プロジェクト・ポートフォリオの違い</h2>
        </section>

        <!-- Section 4 -->
        <section id="framework-structure">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 04</div>
          <h2>MSPフレームワークの全体構造</h2>
        </section>

        <!-- Section 5 -->
        <section id="principles">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target-arrow" aria-hidden="true" />SECTION 05</div>
          <h2>7つの原則(Principles)</h2>
        </section>

        <!-- Section 6 -->
        <section id="themes">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 06</div>
          <h2>7つのテーマ(Themes)</h2>
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
