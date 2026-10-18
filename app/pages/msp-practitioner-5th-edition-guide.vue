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
  tertiaryColor: "#FFFFFF",
};

const DIAGRAM_THREE_LENSES = `flowchart TB
accTitle: MSP の 3 つのレンズの関係
accDescr: 原則はテーマに方向性を与え、テーマはプロセスの各工程で適用され、プロセスは実践を通じて原則の実現度を検証する循環構造を示す。
subgraph L1["レンズ1: 原則 Principles"]
P["7つの普遍的な指針 プログラム全体を貫く価値観"]
end
subgraph L2["レンズ2: テーマ Themes"]
T["7つの統治領域 継続的に対処し続ける管理側面"]
end
subgraph L3["レンズ3: プロセス Processes"]
PR["7つのライフサイクル工程 段階的・循環的な進め方"]
end

P -->|"方向性を与える"| T
T -->|"各工程で適用される"| PR
PR -->|"実践を通じて 原則の実現度を検証"| P

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class P box
class T hub
class PR done`;

const DIAGRAM_ORG_STRUCTURE = `flowchart TB
accTitle: MSP プログラムの組織構造
accDescr: スポンサリンググループが SRO を任命し、SRO の下にプログラムボードが置かれる。ボードの下にプログラムマネージャーとビジネスチェンジマネージャーが並び、プログラムマネージャーはプログラムオフィスと構成プロジェクト群を統括する。ビジネスチェンジマネージャーはベネフィット実現の説明責任をボードへ負う。
SG["Sponsoring Group スポンサリンググループ  戦略的な投資判断・SROの任命"]
SRO["Senior Responsible Owner  SRO プログラム全体の説明責任を負う 単一の説明責任者 Accountable Owner"]
PB["Programme Board プログラムボード  SROの意思決定を支援"]
PM["Programme Manager プログラムマネージャー  日常運営・プロジェクト群の統合"]
BCM["Business Change Manager(s) ビジネスチェンジマネージャー  ベネフィット実現・業務側の変革"]
PO["Programme Office プログラムオフィス  情報管理・支援機能"]
PROJ["構成プロジェクト群 Constituent Projects"]

SG --> SRO
SRO --> PB
PB --> PM
PB --> BCM
PM --> PO
PM --> PROJ
BCM -.->|"ベネフィット実現の 説明責任"| PB

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
class SG,SRO box
class PB,PM,BCM,PO,PROJ hub`;

const DIAGRAM_THEMES_MAP = `flowchart LR
accTitle: MSP の 7 つのテーマ
accDescr: 組織、設計、正当化、構造、知識、保証、意思決定の 7 テーマを順に並べ、意思決定から組織へ戻る点線で、すべてのテーマが並行して継続的に機能することを示す。
O["Organization 組織"] --> D["Design 設計"]
D --> J["Justification 正当化"]
J --> S["Structure 構造"]
S --> K["Knowledge 知識"]
K --> A["Assurance 保証"]
A --> DE["Decisions 意思決定"]
DE -.->|"すべてのテーマは 並行して継続的に機能する"| O

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
class O,D,J,S,K,A,DE box`;

const DIAGRAM_LIFECYCLE = `flowchart TB
accTitle: MSP プログラムのライフサイクル
accDescr: プログラムの着想から①特定、②成果の設計、③段階的デリバリーの計画、④ケイパビリティの提供、⑤成果の定着、⑥新しい情報の評価へ進む。⑥で継続なら次のトランシェとして②へ戻り、完了または中止と判断すれば⑦終結を経て運用へ完全移行する。
START(["プログラムの着想"]) --> P1["① Identify the Programme プログラムを特定する"]
P1 --> P2["② Design the Outcomes 成果を設計する"]
P2 --> P3["③ Plan Progressive Delivery 段階的デリバリーを計画する"]
P3 --> P4["④ Deliver the Capabilities ケイパビリティを提供する"]
P4 --> P5["⑤ Embed the Outcomes 成果を定着させる"]
P5 --> P6["⑥ Evaluate New Information 新しい情報を評価する"]
P6 -->|"継続: 次のトランシェへ"| P2
P6 -->|"完了/中止判断"| P7["⑦ Close the Programme プログラムを終結する"]
P7 --> END(["プログラム終了 運用への完全移行"])

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class P1,P2 box
class P3,P4,P5,P6 hub
class P7 done`;

useSeoMeta({
  title: "MSP® Practitioner 第5版 完全ガイド | 実践適用ステップバイステップ解説",
  description:
    "MSP Practitioner 5th edition の原則・テーマ・プロセスを、シナリオ適用とテーラリングの視点で学ぶ初学者向けガイド",
});

const TOC_ITEMS = [
  { id: "what-is-msp-practitioner", label: "MSPプラクティショナーとは", icon: "tabler:certificate" },
  { id: "exam-overview", label: "試験概要", icon: "tabler:list-check" },
  { id: "three-lenses", label: "3つのレンズ", icon: "tabler:git-branch" },
  { id: "principles", label: "7つの原則", icon: "tabler:clipboard-check" },
  { id: "governance-structure", label: "組織とガバナンス", icon: "tabler:building-bank" },
  { id: "themes", label: "7つのテーマ", icon: "tabler:clipboard-text" },
  { id: "lifecycle", label: "7つのプロセス", icon: "tabler:route" },
  { id: "tailoring", label: "テーラリング", icon: "tabler:refresh" },
  { id: "exam-tips", label: "試験対策のコツ", icon: "tabler:map-2" },
  { id: "best-practices", label: "ベストプラクティス総まとめ", icon: "tabler:flag-3" },
  { id: "references", label: "参考文献・出典", icon: "tabler:link" },
] as const;

const activeId = useActiveHeading(TOC_ITEMS.map((item) => item.id));
const isSidebarOpen = ref(false);
const sidebarToggleRef = ref<HTMLButtonElement | null>(null);

function closeSidebarAndFocusToggle() {
  isSidebarOpen.value = false;
  nextTick(() => {
    sidebarToggleRef.value?.focus();
  });
}
</script>

<template>
  <div class="doc-layout">
    <button
      ref="sidebarToggleRef"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      :aria-expanded="isSidebarOpen"
      @click="isSidebarOpen = !isSidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav class="sidebar" :class="{ 'is-open': isSidebarOpen }" aria-label="目次">
      <div class="brand-title">MSP® Practitioner 完全ガイド</div>
      <div class="brand-subtitle">第5版・実践適用解説</div>
      <ul class="sidebar-nav">
        <li v-for="item in TOC_ITEMS" :key="item.id">
          <a
            :href="`#${item.id}`"
            :class="{ active: activeId === item.id }"
            @click="closeSidebarAndFocusToggle"
          >
            <Icon :name="item.icon" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          <span>PeopleCert 公式情報に基づく学習ガイド</span>
        </div>
        <h1>
          MSP® プラクティショナー(第5版)学習ガイド ― 初学者のための実践適用ステップバイステップ解説
        </h1>
        <p class="hero-lede">
          対象試験: <strong>MSP® Practitioner, 5th edition</strong>(PeopleCert / 旧AXELOS)<br />公式製品ページ:
          <a
            href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932"
            target="_blank"
            rel="noopener"
            >https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932</a
          >
        </p>
        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">58問 / 70点</div>
            <div class="stat-label">オープンブックのオブジェクティブテスト</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">150分</div>
            <div class="stat-label">試験時間</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">60%</div>
            <div class="stat-label">合格基準</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">7 / 7 / 7</div>
            <div class="stat-label">原則・テーマ・プロセス</div>
          </div>
        </div>
        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは非公式の学習支援資料です。受験にあたっては、必ず<a
            href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932"
            target="_blank"
            rel="noopener"
            >PeopleCert公式サイト</a
          >で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- プレースホルダーセクション（Step 1 以降で順次実装） -->
      <section id="what-is-msp-practitioner">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:certificate" aria-hidden="true" />
          <span>SECTION 01</span>
        </div>
        <h2>はじめに:MSPプラクティショナーとは何か</h2>
      </section>

      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:list-check" aria-hidden="true" />
          <span>SECTION 02</span>
        </div>
        <h2>試験概要</h2>
      </section>

      <section id="three-lenses">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:git-branch" aria-hidden="true" />
          <span>SECTION 03</span>
        </div>
        <h2>MSPの全体構造:3つのレンズ</h2>
      </section>

      <section id="principles">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:clipboard-check" aria-hidden="true" />
          <span>SECTION 04</span>
        </div>
        <h2>7つの原則(Principles)とその実践適用</h2>
      </section>

      <section id="governance-structure">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:building-bank" aria-hidden="true" />
          <span>SECTION 05</span>
        </div>
        <h2>プログラム組織とガバナンス構造</h2>
      </section>

      <section id="themes">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:clipboard-text" aria-hidden="true" />
          <span>SECTION 06</span>
        </div>
        <h2>7つのテーマ(Themes)詳細解説</h2>
      </section>

      <section id="lifecycle">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:route" aria-hidden="true" />
          <span>SECTION 07</span>
        </div>
        <h2>7つのプロセス(プログラムライフサイクル)</h2>
      </section>

      <section id="tailoring">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:refresh" aria-hidden="true" />
          <span>SECTION 08</span>
        </div>
        <h2>テーラリング(Tailoring):MSPを現場に合わせる</h2>
      </section>

      <section id="exam-tips">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:map-2" aria-hidden="true" />
          <span>SECTION 09</span>
        </div>
        <h2>プラクティショナー試験対策:シナリオ適用のコツ</h2>
      </section>

      <section id="best-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:flag-3" aria-hidden="true" />
          <span>SECTION 10</span>
        </div>
        <h2>ベストプラクティス総まとめ表</h2>
      </section>

      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:link" aria-hidden="true" />
          <span>SECTION 11</span>
        </div>
        <h2>参考文献・出典(ソースURL)</h2>
      </section>

      <footer>
        MSP® is a registered trademark of PeopleCert International Limited.
        本ページは非公式の学習資料です。
      </footer>
    </main>
  </div>
</template>

<style scoped>
.doc-layout {
  position: relative;
  min-height: calc(100vh - var(--global-nav-height, 0px));
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: calc(var(--global-nav-height, 0px) + 16px);
  left: 16px;
  z-index: 30;
  width: 42px;
  height: 42px;
  background: var(--color-paper-raised, #ffffff);
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--color-ink, #161b26);
  cursor: pointer;
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
  padding: 32px 24px;
  z-index: 20;
}

.brand-title {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 19px;
  color: var(--color-ink, #161b26);
}

.brand-subtitle {
  color: var(--color-ink-faint, #646d7d);
  font-size: 14px;
  margin: 2px 0 24px;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav a {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--color-ink-soft, #4b5566);
  text-decoration: none;
  font-size: 14px;
  border-left: 2px solid transparent;
  transition: all 0.15s ease;
}

.sidebar-nav a:hover,
.sidebar-nav a.active {
  background: var(--color-indigo-tint, #eef1f8);
  color: var(--color-indigo, #2e3f72);
}

.sidebar-nav a.active {
  border-left-color: var(--color-indigo, #2e3f72);
  font-weight: 600;
}

.main-content {
  margin-left: 288px;
  padding: 56px 72px 120px;
  max-width: none;
}

.hero {
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-gold, #b8802a);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

h1 {
  font-family: var(--font-display, serif);
  font-size: 38px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 16px;
  color: var(--color-ink, #161b26);
}

.hero-lede {
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-ink-soft, #4b5566);
  margin-bottom: 24px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.stat-card {
  background: var(--color-paper-raised, #ffffff);
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 10px;
  padding: 18px 20px;
}

.stat-number {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 24px;
  color: var(--color-indigo, #2e3f72);
}

.stat-label {
  color: var(--color-ink-soft, #4b5566);
  font-size: 13px;
  margin-top: 6px;
  line-height: 1.4;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--color-indigo-tint, #eef1f8);
  border: 1px solid #c7d1ea;
  color: var(--color-indigo, #2e3f72);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.6;
  margin-top: 24px;
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
  margin: 72px 0;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

.section-eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-ink-faint, #646d7d);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

h2 {
  font-family: var(--font-display, serif);
  font-size: 29px;
  font-weight: 700;
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink, #161b26);
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

h3 {
  font-family: var(--font-display, serif);
  font-size: 21px;
  font-weight: 600;
  margin: 40px 0 16px;
  color: var(--color-ink, #161b26);
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

p {
  margin: 0 0 18px;
  line-height: 1.75;
}

ul,
ol {
  margin: 0 0 18px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 10px;
  margin: 0 0 24px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  background: var(--color-paper-sunk, #eef0f4);
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-strong, #c7cdd9);
  font-weight: 600;
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-soft, #4b5566);
  vertical-align: top;
  line-height: 1.6;
}

tr:last-child td {
  border-bottom: 0;
}

tbody tr:nth-child(even) {
  background: var(--color-paper, #f6f7f9);
}

.callout {
  border: 1px solid var(--color-border, #dfe3ea);
  border-left: 4px solid var(--color-indigo, #2e3f72);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 10px;
  padding: 18px 24px;
  margin: 24px 0;
}

.callout p {
  margin: 0;
}

.callout-title {
  font-weight: 600;
  color: var(--color-indigo, #2e3f72);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.callout.practice {
  border-left-color: var(--color-gold, #b8802a);
}

.callout.practice .callout-title {
  color: var(--color-gold, #b8802a);
}

.callout.source {
  border-left-color: var(--color-forest, #1b6e6a);
  background: var(--color-forest-tint, #e7f3f2);
}

.callout.source .callout-title,
.callout.source a {
  color: var(--color-forest, #1b6e6a);
}

.callout.note {
  border-left-color: var(--color-plum, #8c3a5c);
}

.callout.note .callout-title {
  color: var(--color-plum, #8c3a5c);
}

.mermaid-wrap {
  background: var(--color-paper-raised, #ffffff);
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 12px;
  padding: 28px;
  margin: 24px 0;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-faint, #646d7d);
  font-size: 14px;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }
  .sidebar {
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.2s, visibility 0.2s;
  }
  .sidebar.is-open {
    transform: none;
    visibility: visible;
  }
  .main-content {
    margin-left: 0;
    padding: 88px 24px 100px;
  }
  h1 {
    font-size: 30px;
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
