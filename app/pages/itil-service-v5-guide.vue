<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL® Service (Version 5) 認定資格 完全ガイド ｜ 初学者向けステップバイステップ解説",
  description: "PeopleCert ITIL Service (Version 5) 認定資格の学習ガイド。PSLM 8段階(Discover-Support)の目的・有効化プラクティス・CSFとベストプラクティスを初学者向けに解説。",
});

const TOC_SECTIONS = [
  { id: "about-guide", label: "このガイドについて", icon: "tabler:list-details" },
  { id: "exam-overview", label: "試験の全体像", icon: "tabler:certificate" },
  { id: "foundation-review", label: "ITIL v5 全体構造", icon: "tabler:building-bank" },
  { id: "module1-key-concepts", label: "主要概念", icon: "tabler:route" },
  { id: "module2-discover", label: "Discover(発見)", icon: "tabler:search" },
  { id: "module3-design", label: "Design(設計)", icon: "tabler:pencil" },
  { id: "module4-acquire", label: "Acquire(獲得)", icon: "tabler:shopping-cart" },
  { id: "module5-build", label: "Build(構築)", icon: "tabler:hammer" },
  { id: "module6-transition", label: "Transition(移行)", icon: "tabler:transfer" },
  { id: "module7-operate", label: "Operate(運用)", icon: "tabler:activity" },
  { id: "module8-deliver", label: "Deliver(提供)", icon: "tabler:truck-delivery" },
  { id: "module9-support", label: "Support(サポート)", icon: "tabler:headset" },
  { id: "module10-lifecycle-ai", label: "ライフサイクル・AI統合", icon: "tabler:robot" },
  { id: "best-practices-summary", label: "ベストプラクティス", icon: "tabler:bulb" },
  { id: "exam-tips", label: "試験対策のポイント", icon: "tabler:checklist" },
  { id: "glossary", label: "付録: 用語集", icon: "tabler:book" },
  { id: "references", label: "参考文献・ソース URL", icon: "tabler:link" },
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

const DIAGRAM_EXAM_OVERVIEW = `flowchart TB
F["ITIL Foundation Version 5 または ITIL 4 Foundation Bridge"]
F --> PM["ITIL Practice Manager MSF PIC CAI"]
F --> MP1["ITIL Product Version 5"]
F --> MP2["ITIL Service Version 5"]
F --> MP3["ITIL Experience Version 5"]
F --> SL1["ITIL Strategy Version 5"]
F --> SL2["ITIL Transformation Version 5"]
F --> AIG["ITIL AI Governance 拡張モジュール"]
MP1 --> MP["ITIL Managing Professional Version 5"]
MP2 --> MP
MP3 --> MP
SL1 --> SLD["ITIL Strategic Leader Version 5"]
SL2 --> SLD
MP --> MST["ITIL Master Version 5"]
SLD --> MST
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px
class F box
class PM,MP1,MP3,SL1,SL2,AIG box
class MP2 hub
class MP,SLD done
class MST done`;
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
            <div class="brand-title">ITIL Service (V5)</div>
            <div class="brand-subtitle">認定資格 学習ガイド</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li v-for="item in TOC_SECTIONS" :key="item.id">
            <a
              :href="'#' + item.id"
              :class="{ active: activeId === item.id }"
              data-testid="toc-link"
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
            <Icon name="tabler:certificate" aria-hidden="true" />
            <span>PeopleCert ITIL (Version 5) - Managing Professional ストリーム</span>
          </div>
          <h1>ITIL Service (Version 5) 学習ガイド</h1>
          <p class="hero-lede">
            初学者のためのステップバイステップ解説 — 出題範囲の詳細解説とベストプラクティス集
          </p>

          <div class="stat-row">
            <div class="stat-card">
              <div class="stat-number">40問</div>
              <div class="stat-label">選択式(Multiple Choice)</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">90分</div>
              <div class="stat-label">試験時間</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">70%以上</div>
              <div class="stat-label">合格基準</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">オープンブック</div>
              <div class="stat-label">公式刊行物の参照可</div>
            </div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>ITIL (Version 5) は 2026年に公開されたばかりの新しいスキームであり、PeopleCert は ITIL 4 の時代のように詳細なシラバス PDF を無償公開していません。そのため本ガイドは、PeopleCert 公式サイト(peoplecert.org / itil.com)の公開情報と、PeopleCert 認定トレーニング機関(Accredited Training Organization, ATO)が公開しているコースアウトラインを一次情報として、そこに ITIL の標準的な「目的 → CSF(重要成功要因)→ 指標」という記述方法を適用して構成しています。各項目の CSF・指標例は、公式試験問題そのものではなく、学習用に体系化した例示である点にご留意ください。最終的な試験対策には、必ず公式 eBook・Learner Workbook(Official Training Materials)を参照してください。</span>
          </div>
        </div>

        <!-- SECTION 00: about-guide -->
        <section id="about-guide" class="guide-section" tabindex="-1">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:list-details" aria-hidden="true" />
            <span>SECTION 00</span>
          </div>
          <h2>このガイドについて</h2>

          <p>本ガイドは、PeopleCert が認定する <strong>ITIL Service (Version 5)</strong> 資格試験の学習を目的として作成した、初学者向けの詳細解説書です。ITIL (Version 5) の "Managing Professional" ストリームに属するこのモジュールは、デジタルサービスをライフサイクル全体にわたって設計・提供・運用・改善するための実践的な知識を問うものです。</p>

          <p>本ガイドの特徴は次のとおりです。</p>

          <ul>
            <li>公式シラバスに準拠したコース構成(Module 1〜10)に沿って、各項目をステップバイステップで解説</li>
            <li>各章に <strong>ベストプラクティス</strong> のコールアウトを配置し、実務にそのまま応用できる形で整理</li>
            <li>章末および巻末に、根拠となる一次情報・解説記事の <strong>URL</strong> を明記</li>
          </ul>
        </section>

        <!-- SECTION 01: exam-overview -->
        <section id="exam-overview" class="guide-section" tabindex="-1">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:certificate" aria-hidden="true" />
            <span>SECTION 01</span>
          </div>
          <h2>ITIL Service (Version 5) 試験の全体像</h2>

          <h3>0.1 このモジュールは何を証明する資格か</h3>

          <p>ITIL Service (Version 5) は、<strong>デジタルサービスをライフサイクル全体で設計・提供・サポートし、継続的に改善する能力</strong> を証明する資格です。PeopleCert 公式ページでは、次のように紹介されています。</p>

          <ul>
            <li>サービスの関係性(service relationships)、サービスレベル(SLA)、運用の信頼性(operational reliability)、継続的改善(continual improvement)についての深い理解を養う</li>
            <li>レジリエントで高パフォーマンスなデジタルサービスをライフサイクル全体で提供する能力を身につける</li>
          </ul>

          <p>「Product」モジュール(ITIL Product (Version 5))が製品管理者・プロダクトオーナー視点でバリューストリームを扱うのに対し、<strong>Service モジュールは「サービスプロバイダーの視点」から同じ ITIL Product and Service Lifecycle Model(PSLM)を扱う</strong> という対比構造になっている点が最大のポイントです。同じ8段階のライフサイクルモデルを、片方は「作る側(Product)」、もう片方は「届けて支える側(Service)」の視点で学ぶ、と理解すると全体像がつかみやすくなります。</p>

          <h3>0.2 試験概要</h3>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>項目</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>出題形式</td>
                  <td>選択式(Multiple Choice)</td>
                </tr>
                <tr>
                  <td>問題数</td>
                  <td>40問</td>
                </tr>
                <tr>
                  <td>試験時間</td>
                  <td>90分</td>
                </tr>
                <tr>
                  <td>合格基準</td>
                  <td>70%以上の正答</td>
                </tr>
                <tr>
                  <td>参照可否</td>
                  <td>オープンブック(公式刊行物の参照が可能)</td>
                </tr>
                <tr>
                  <td>出題言語</td>
                  <td>英語、中国語、フランス語、ドイツ語、イタリア語、ポーランド語、ポルトガル語(ブラジル)、スペイン語</td>
                </tr>
                <tr>
                  <td>認定の更新</td>
                  <td>3年ごと、CPD(継続的専門能力開発)ポイント 60点が必要</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>0.3 受験前提条件(Prerequisites)</h3>

          <p>以下のいずれかを保有していることが必須です。</p>

          <ul>
            <li>ITIL 4 の任意の認定資格(ITIL 4 Foundation を含む)</li>
            <li>ITIL Foundation (Version 5)</li>
            <li>ITIL Foundation Bridge (Version 5)(ITIL 4 保有者が Version 5 に移行するための橋渡し資格)</li>
          </ul>

          <p>さらに、PeopleCert の認定トレーニング機関(ATO)または ITIL 公式 eLearning を通じたトレーニング受講が必須とされています(トレーニング修了の証明がないと、たとえ受験・合格しても結果が発行されません)。</p>

          <h3>0.4 対象者とキャリアパス</h3>

          <p><strong>想定される受講者像</strong>: サービスの提供・運用に責任を持つ実務者。社内IT組織またはマネージドサービスプロバイダーで、デジタル製品・サービスをエンドツーエンドで管理する必要がある人。</p>

          <p><strong>関連する職種例</strong>: </p>

          <ul>
            <li>Service Manager / Service Owner / Service Delivery Manager</li>
            <li>Site Reliability Engineer(SRE) / Incident Commander</li>
            <li>Knowledge Curator / Support Manager</li>
            <li>IT Operations Manager / Process Owner / IT Analyst</li>
            <li>Product Owner / IT Project Manager / Digital Transformation Manager</li>
          </ul>

          <h3>0.5 ITIL (Version 5) 資格体系におけるこのモジュールの位置づけ</h3>

          <p>ITIL (Version 5) は、Foundation を土台に、複数の上位モジュールへ分岐する構造になっています。Service はそのうち「Managing Professional」ストリームを構成する中核モジュールの一つです。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_EXAM_OVERVIEW" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

          <p><strong>読み方のポイント</strong>: Product・Service・Experience の3モジュールをすべて取得すると「ITIL Managing Professional」称号が得られます。同様に Strategy・Transformation を取得すると「ITIL Strategic Leader」となり、両方を揃えると最上位の「ITIL Master」に到達します。Service モジュール単体でも実務知識として十分に価値がありますが、資格戦略上は Product・Experience とセットで捉えると学習効率が上がります。</p>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.7;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-indigo);
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
  transition: top 0.2s ease;
}
.skip-link:focus {
  top: 0;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 90;
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
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
}

.sidebar {
  width: 288px;
  flex-shrink: 0;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-border);
  position: sticky;
  top: var(--global-nav-height, 0px);
  height: calc(100vh - var(--global-nav-height, 0px));
  overflow-y: auto;
  padding: 24px 16px;
  z-index: 10;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 20px;
}
.sidebar-brand .seal {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}
.brand-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
}
.brand-subtitle {
  font-size: 12px;
  color: var(--color-ink-faint);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-nav li {
  margin-bottom: 4px;
}
.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--color-ink-soft);
  text-decoration: none;
  font-size: 13.5px;
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
  flex: 1;
  min-width: 0;
  padding: 40px 48px 80px;
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-indigo);
  background: var(--color-indigo-tint);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
}

h1 {
  font-size: 32px;
  font-weight: 800;
  color: var(--color-indigo-dark);
  line-height: 1.3;
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}

.hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
  line-height: 1.6;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}
.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}
.stat-number {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-indigo);
  margin-bottom: 4px;
}
.stat-label {
  font-size: 12px;
  color: var(--color-ink-faint);
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
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

.guide-section {
  margin-bottom: 64px;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-indigo-dark);
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-indigo);
  margin: 32px 0 16px;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink);
  margin: 24px 0 12px;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

p {
  margin: 0 0 16px;
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
}
li {
  margin-bottom: 8px;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 20px 0 28px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14.5px;
  text-align: left;
}
th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
}
th {
  background: var(--color-paper-sunken);
  color: var(--color-indigo);
  font-weight: 600;
}
tr:last-child td {
  border-bottom: none;
}

.callout {
  border-radius: 8px;
  padding: 16px 20px;
  margin: 24px 0;
  border-left: 4px solid;
}
.callout.practice {
  background: var(--color-gold-tint);
  border-color: var(--color-gold);
  color: #5c3e0a;
}
.callout.note {
  background: var(--color-info-bg);
  border-color: var(--color-indigo);
  color: var(--color-info-text);
}
.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14.5px;
  margin-bottom: 8px;
}

.mermaid-wrap {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
  margin: 24px 0;
}
.diagram-loading {
  text-align: center;
  color: var(--color-ink-faint);
  font-size: 14px;
  padding: 20px;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: -288px;
    height: 100vh;
    z-index: 100;
    transition: left 0.3s ease;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
  }
  .sidebar.open {
    left: 0;
  }
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
  .main-content {
    padding: 24px 20px 60px;
  }
}
</style>
