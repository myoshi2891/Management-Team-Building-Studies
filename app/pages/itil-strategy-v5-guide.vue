<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL Strategy (Version 5) 完全学習ガイド | Strategic Leaderパス試験対策",
  description: "PeopleCert ITIL Strategy (Version 5)資格試験の全体像を、8モジュールの学習目標・Strategy Management Model・ベストプラクティスとともに解説する非公式学習ガイド。",
});

const TOC_SECTIONS = [
  { id: "about-this-guide", label: "本ガイドについて", icon: "tabler:certificate" },
  { id: "exam-overview", label: "1. 試験概要", icon: "tabler:clipboard-check" },
  { id: "itil-v5-context", label: "2. ITIL v5全体像の位置づけ", icon: "tabler:building-bank" },
  { id: "foundation-review", label: "3. Module 1: 復習と価値創出", icon: "tabler:stack-2" },
  { id: "key-concepts", label: "4. Module 2: 主要概念", icon: "tabler:target" },
  { id: "four-dimensions", label: "5. Module 3: 4つの側面", icon: "tabler:layout-grid" },
  { id: "strategy-management-model", label: "6. Module 4: Strategy Management Model", icon: "tabler:infinity" },
  { id: "strategy-development-cycle", label: "7. Module 5: 戦略策定サイクル", icon: "tabler:compass" },
  { id: "strategy-implementation-cycle", label: "8. Module 6: 戦略実装サイクル", icon: "tabler:rocket" },
  { id: "strategic-capabilities", label: "9. Module 7: 戦略的能力", icon: "tabler:shield-check" },
  { id: "framework-integration", label: "10. Module 8: 他フレームワーク統合", icon: "tabler:git-merge" },
  { id: "best-practices-summary", label: "11. ベストプラクティス総括", icon: "tabler:list-check" },
  { id: "exam-tips", label: "12. 試験対策のポイント", icon: "tabler:map-2" },
  { id: "references", label: "13. 参考文献・出典", icon: "tabler:link" },
] as const;

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

const activeId = useActiveHeading(TOC_SECTIONS.map((s) => s.id));

const LIGHT_THEME_VARS = {
  background: "transparent",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#2E3F72",
  secondaryColor: "#FAF1DF",
  secondaryBorderColor: "#B8802A",
  tertiaryColor: "#FFFFFF",
  fontSize: "16px",
};

const DIAGRAM_PRODUCT_SERVICE_LIFECYCLE = `flowchart LR
D1["Discover 機会発見・需要理解"]
D2["Design 解決策の設計"]
D3["Acquire 資源の調達"]
D4["Build 構築・実装"]
D5["Transition 本番移行"]
D6["Operate 基盤の稼働維持"]
D7["Deliver 利用者への価値提供"]
D8["Support インシデント対応"]
D1 --> D2 --> D3 --> D4 --> D5 --> D6 --> D7 --> D8
D8 -.->|"フィードバック"| D1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1,D2,D3,D4 box;
class D5,D6 hub;
class D7,D8 done;`;
</script>

<template>
  <div class="guide-page">
    <a href="#main-content" class="skip-link">本文へスキップ</a>
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      :aria-expanded="sidebarOpen"
      aria-controls="guide-sidebar"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div class="layout">
      <nav
        id="guide-sidebar"
        class="sidebar"
        :class="{ open: sidebarOpen }"
        aria-label="目次"
      >
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="brand-text">
            <div class="brand-title">ITIL Strategy</div>
            <div class="brand-subtitle">Strategic Leader (V5)</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li v-for="item in TOC_SECTIONS" :key="item.id">
            <a
              :href="'#' + item.id"
              :class="{ active: activeId === item.id }"
              @click="closeSidebar"
            >
              <Icon :name="item.icon" aria-hidden="true" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div
        v-if="sidebarOpen"
        class="sidebar-backdrop"
        aria-hidden="true"
        @click="closeSidebar"
      />

      <main id="main-content" class="main-content" tabindex="-1">
        <div class="hero">
          <div class="hero-eyebrow">
            <Icon name="tabler:award" aria-hidden="true" />
            <span>PeopleCert ITIL Strategic Leader Pathway</span>
          </div>
          <h1>ITIL Strategy (Version 5) 完全学習ガイド</h1>
          <p class="hero-lede">
            初学者向けステップバイステップ解説。定義から理由、具体例、図解の順で、出題範囲の各項目とベストプラクティスを詳細に扱う。
          </p>

          <div class="stat-row">
            <div class="stat-card">
              <div class="stat-number">40問</div>
              <div class="stat-label">多肢選択式・制限時間90分</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">70%</div>
              <div class="stat-label">合格ライン(28問以上正解)</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">オープンブック</div>
              <div class="stat-label">公式ITIL Strategy出版物の持ち込み可</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">3年更新</div>
              <div class="stat-label">毎年20CPDポイント(5pt以上はProfessional Experience)×3年/再受験/同Suite内別認定のいずれか</div>
            </div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>PeopleCertの公式シラバスPDF(Learner Workbook・Quick Reference Guide)は購入者限定コンテンツのため、本ガイドは公式認定ページと複数の認定トレーニングパートナーの公開コースアウトラインを一次情報として構成した非公式の学習補助資料です。試験直前の最終確認は、必ず<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-strategy-version-5-4175" target="_blank" rel="noopener">PeopleCert公式認定ページ</a>および公式eBook・Learner Workbookでお願いします。</span>
          </div>
        </div>

        <!-- ===================== 01. About This Guide ===================== -->
        <section id="about-this-guide" tabindex="-1">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:certificate" aria-hidden="true" />
            <span>SECTION 01</span>
          </div>
          <h2>本ガイドについて</h2>

          <p><strong>対象読者</strong>: ITIL 4 Foundation または ITIL Foundation (Version 5) を取得済みで、ITIL Strategy (Version 5) の受験を検討している方。ソフトウェアエンジニア・QAエンジニア・スクラムマスターなど、非IT運用畑からITサービス戦略を学ぶ人にもわかりやすい構成にしている。</p>

          <p><strong>本モジュールの位置づけ</strong>: ITIL Strategy (Version 5) は、ITIL (Version 5) の<strong>Strategic Leaderパス</strong>に属する上位資格である。PeopleCertの認定パートナーであるQAの解説によれば、この3日間のコースはITIL Strategyが動的なデジタル環境において組織が価値創造をどう定義し、方向づけ、持続させるかを扱い、戦略的意図を実行可能な変化へと転換すること、複雑性の中でのエビデンスに基づく意思決定、継続的な学習と適応による長期的な戦略的妥当性の維持に焦点を当てている。</p>

          <p><strong>情報源についての透明性(重要)</strong>: PeopleCertの公式シラバスPDF(Learner Workbook・Quick Reference Guide)は購入者限定コンテンツであり、本ガイド執筆時点でWeb上に無償公開された全文は確認できなかった。そのため本ガイドは以下を一次情報として構成している。</p>

          <ul>
            <li>PeopleCert公式認定ページ(試験概要・学習目標の要約)</li>
            <li>PeopleCertプラチナパートナー各社(QA、Asseco Academy、Tieturi、ib-formation、itil.org.uk等)が公開する詳細コースアウトライン(モジュール構成・学習目標の粒度が最も詳しい)</li>
            <li>AXELOS・PeopleCertのITSMポートフォリオ開発マネージャーによる公式解説記事(ITSM.tools)</li>
          </ul>

          <p>厳密な用語の言い回しや出題の重み付けは、必ず<strong>公式eBook・Learner Workbook</strong>で最終確認してほしい。本ガイドは試験の全体像と実務での使い方を掴むための学習補助であり、公式教材の代替ではない。</p>
        </section>

        <!-- ===================== 02. Exam Overview ===================== -->
        <section id="exam-overview" tabindex="-1">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:clipboard-check" aria-hidden="true" />
            <span>SECTION 02</span>
          </div>
          <h2>1. 試験概要</h2>

          <p><em>K1(想起レベル)</em>: 試験の形式・前提条件を暗記する。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>出題数</td><td>40問</td></tr>
                <tr><td>形式</td><td>多肢選択式(Multiple Choice)</td></tr>
                <tr><td>制限時間</td><td>90分</td></tr>
                <tr><td>参照資料</td><td>オープンブック(公式ITIL Strategy出版物の持ち込み可、注釈・タブ付け可(粘着付箋・ルーズリーフ不可))</td></tr>
                <tr><td>合格ライン</td><td>70%(40問中28問以上)</td></tr>
                <tr><td>受験言語</td><td>英語</td></tr>
                <tr><td>認定更新</td><td>3年ごと。次のいずれかのルートで更新: 3年間連続で毎年20 CPDポイントを取得する(うち5ポイント以上はProfessional Experienceカテゴリから取得する必要がある)、同じ認定を再受験する、同じProduct Suite内の別認定に合格する</td></tr>
                <tr><td>受験前提条件</td><td>ITIL 4のいずれかの認定、または ITIL Foundation (Version 5)、または ITIL Foundation Bridge (Version 5) の取得</td></tr>
              </tbody>
            </table>
          </div>

          <p>この試験はオープンブックであり、公式のITIL Strategy出版物(本文中への書き込みを含む)の使用が認められているが、それ以外の参考資料の持ち込みは許可されない。受験には、いずれかのITIL 4認定、ITIL Foundation (Version 5)、またはITIL Foundation Bridge (Version 5) の取得に加えて、認定トレーニング機関または公式eラーニングでのトレーニング修了が必要である。</p>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label">
              <Icon name="tabler:info-circle" aria-hidden="true" />
              <span>補足</span>
            </div>
            <p><strong>オープンブック試験の落とし穴</strong>: 「本を持ち込めるから覚えなくていい」という誤解は禁物。90分で40問(1問あたり約2分15秒)のペースでは、公式出版物内の該当箇所を探す時間はほとんど残らない。オープンブックは「知識の代替」ではなく「用語の正確な言い回しを確認する保険」として使うのが実務的なベストプラクティス。</p>
          </div>

          <h3>学習内容の全体像</h3>
          <p>ITIL Strategy (Version 5) は、価値創造のための戦略を策定・実行・最適化する実践的なガイダンスを提供し、複雑でAI主導の環境において明確さと自信を持って行動できるよう、テクノロジー・投資・実行をビジネス成果と整合させることを支援する。</p>
          <p>習得スキルとして、ITIL Strategy Management Modelを継続的に適用して戦略的な整合・方向性・行動をビジネス目標と結びつけ測定可能な成果を導く「戦略的整合と方向性」、変動的・複雑・不確実・曖昧(VUCA)な環境で情報に基づいたバランスの取れた意思決定を行う専門性、そして高速でAI対応の環境において戦略的意図を実行可能な取り組みに変換し持続的な価値を実現する「効果的な実行と価値実現」の3つが公式ページで明示されている。</p>
        </section>

        <!-- ===================== 03. ITIL v5 Context ===================== -->
        <section id="itil-v5-context" tabindex="-1">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:building-bank" aria-hidden="true" />
            <span>SECTION 03</span>
          </div>
          <h2>2. ITIL (Version 5) 全体像の中での位置づけ</h2>

          <p><em>K2(理解レベル)</em>: なぜITIL (Version 5) が生まれ、Strategyモジュールがどこに位置するかを理解する。</p>

          <h3>2.1 ITIL (Version 5) が作られた理由</h3>
          <p>ITIL (Version 5) はITIL 4以来初めてのメジャーアップデートであり、単なる改訂ではなく、AIの急速な台頭、組織の複雑性の増大、そして戦略的フレームワークと日々の実務との間の根強いギャップという、約7年間の環境変化に対する実質的な回答である。</p>
          <p>具体的には、急成長する複雑性に対しては「複雑性ネイティブなフレームワーク」を、AIの急速な普及に対しては「AIネイティブなガイダンス」を、戦略的方向性と実務性のバランスに対してはリーダー・マネージャー・実務者それぞれに明確な位置づけを、テクノロジー業界に根強く残るサイロ化に対しては統合されたフレームワークを、そしてテクノロジーの人間的側面への関心の高まりに対しては経験改善のための包括的で実践的なガイダンスを、それぞれ提供する形でITILは刷新された。</p>

          <h3>2.2 ITIL (Version 5) の主要な変更点</h3>
          <p>ITIL (Version 5) の主な変更点は、デジタル製品とサービス管理を1つのモデルに統合する新しいITIL Product and Service Lifecycle、より明確でモジュール化されたバリューチェーンモデルによって強化されたITIL Value System、価値がどのように創出されるかについてのより優れたエンドツーエンドで経験駆動の理解、持続可能な組織変革を実現するための新しいTransformationモデル(専用書籍付き)、Experienceと経験最適化に関する専用出版物、そしてVUCAな世界でデジタル戦略を策定・実装するための新しいStrategy Managementモデルである。</p>

          <h3>2.3 ITIL Product and Service Lifecycle(8段階)</h3>
          <p>Strategyモジュールの土台として、まずFoundationで学ぶこのライフサイクルモデルを押さえておく。Discover、Design、Acquire、Build、Transition、Operate、Deliver、Supportの8段階で構成され、前半(Discover・Design・Acquire・Build)はよりProduct寄り、後半(Deliver・Support)はよりService寄りで、中間のTransition・Operateが両者を橋渡しする。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PRODUCT_SERVICE_LIFECYCLE" theme="base" :theme-variables="LIGHT_THEME_VARS" />
            </ClientOnly>
            <div class="diagram-caption">ITIL Product and Service Lifecycle の8段階</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label">
              <Icon name="tabler:bulb" aria-hidden="true" />
              <span>ベストプラクティス</span>
            </div>
            <p>この8段階は厳密な一方向フローではなく、反復的に行き来する。実務ではDiscover・Design・Build・Transition・Operateを繰り返し行き来しながら進めるのが一般的で、各フェーズには明確な活動とハンドオフが定義されている。Strategy試験では「ライフサイクルのどの段階が戦略のインプットになるか」ではなく、「戦略がライフサイクル全体にどう方向性を与えるか」という上位視点が問われる点に注意。</p>
          </div>

          <h3>2.4 Strategic Leaderパスにおける位置づけ</h3>
          <p>ITIL Strategyは、組織の方向性そのものを扱う<strong>Strategic Leader</strong>パスに属するモジュールである。Strategic Leaderの称号は、前提資格である<strong>ITIL Foundation</strong>を基盤に、<strong>ITIL Strategy</strong>と全designation共通の中核モジュールである<strong>ITIL Transformation</strong>の2つを取得することで得られる。ITIL Product・ITIL Service・ITIL Experience・ITIL Transformationの4モジュールで構成される Managing Professional パスとは上下関係ではなく、並列の別個の認定ストリームである。対象者は組織のあらゆる階層で戦略的責任を持つリーダー、戦略実行に戦術的責任を持つ専門家、戦略目標の支援に運用的責任を持つ専門家である。</p>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  --sidebar-width: 288px;
  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 16px;
  background: var(--color-indigo);
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 1000;
  text-decoration: none;
  font-weight: 600;
}
.skip-link:focus {
  top: 16px;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
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
  font-size: 24px;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: fixed;
  top: var(--global-nav-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--global-nav-height));
  overflow-y: auto;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-border);
  padding: 24px 16px 40px;
  z-index: 20;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-left: 8px;
}

.seal {
  flex: none;
  width: 36px;
  height: 36px;
}

.brand-text .brand-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--color-ink);
  letter-spacing: 0.02em;
}

.brand-text .brand-subtitle {
  font-size: 13px;
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
  font-size: 14px;
  line-height: 1.4;
  text-decoration: none;
  transition: all 0.15s ease;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken);
  color: var(--color-indigo);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.main-content {
  margin-left: var(--sidebar-width);
  flex: 1;
  max-width: 900px;
  padding: 40px 48px 80px;
  min-width: 0;
}

.hero {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 40px;
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-indigo);
  background: var(--color-indigo-tint);
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 16px;
}

h1 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-ink);
  margin: 0 0 16px;
}

.hero-lede {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-ink-soft);
  margin: 0 0 32px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 20px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-indigo);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: var(--color-ink-faint);
  line-height: 1.4;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--color-info-bg);
  border: 1px solid var(--color-info-border);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-info-text);
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
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 20px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 32px 0 14px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p {
  margin: 0 0 16px;
  line-height: 1.75;
}

ul {
  margin: 0 0 20px 24px;
  padding: 0;
  line-height: 1.75;
}

li {
  margin-bottom: 8px;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.6;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

th {
  background: var(--color-paper-sunken);
  font-weight: 600;
  color: var(--color-ink);
}

tr:last-child td {
  border-bottom: none;
}

.callout {
  border-left: 4px solid var(--color-indigo);
  background: var(--color-paper-raised);
  border-radius: 0 8px 8px 0;
  padding: 16px 20px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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

.callout p:last-child {
  margin-bottom: 0;
}

.mermaid-wrap {
  margin: 28px 0;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 24px;
}

.diagram-caption {
  font-size: 13px;
  text-align: center;
  color: var(--color-ink-faint);
  margin-top: 12px;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
  }
  .main-content {
    margin-left: 0;
    padding: 32px 24px 80px;
  }
}
</style>
