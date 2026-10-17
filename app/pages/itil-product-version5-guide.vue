<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL® Product (Version 5) 完全ガイド | デジタルプロダクトを統合バリューストリームでマネジメントする",
  description: "PeopleCert公式シラバス(Version 5.0 PL)に基づく、ITIL Product (Version 5)の初学者向け学習ガイド。8つのライフサイクル活動とAI Capability Modelを解説。",
});

const TOC_SECTIONS = [
  { id: "what-is-itil-product", label: "ITIL Productとは何か", icon: "tabler:certificate" },
  { id: "exam-format", label: "試験概要と出題形式", icon: "tabler:list-check" },
  { id: "basic-concepts", label: "基礎概念(Category 1)", icon: "tabler:building-bank" },
  { id: "lifecycle-overview", label: "PSLM全体像", icon: "tabler:route" },
  { id: "discover", label: "Discover(発見)活動", icon: "tabler:search" },
  { id: "design", label: "Design(設計)活動", icon: "tabler:pencil" },
  { id: "acquire", label: "Acquire(調達)活動", icon: "tabler:shopping-cart" },
  { id: "build", label: "Build(構築)活動", icon: "tabler:hammer" },
  { id: "transition", label: "Transition(移行)活動", icon: "tabler:transfer" },
  { id: "operate", label: "Operate(運用)活動", icon: "tabler:activity" },
  { id: "deliver", label: "Deliver(提供)活動", icon: "tabler:truck-delivery" },
  { id: "support", label: "Support(サポート)活動", icon: "tabler:headset" },
  { id: "lifecycle-management", label: "ライフサイクル全体のマネジメント", icon: "tabler:sitemap" },
  { id: "ai-and-frameworks", label: "ITIL・AI・他フレームワーク", icon: "tabler:robot" },
  { id: "study-checklist", label: "学習チェックリスト", icon: "tabler:checklist" },
  { id: "references", label: "参考文献・出典", icon: "tabler:link" },
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

const DIAGRAM_QUESTION_TYPES = `flowchart TB
Q["出題される設問"] --> S{"どの形式か"}
S -->|"通常の4択"| A["Standard: 設問+4択から1つ選択"]
S -->|"否定形の設問"| B["Negative: NOTを含む設問文で誤りでない選択肢を除外"]
S -->|"穴埋め"| C["Missing word: 文中の空欄に入る語句を選択"]
S -->|"正しい記述の組合せ"| D["List: 4項目中、正しい2項目の組合せを選択"]`;
</script>

<template>
  <div class="layout">
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
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">ITIL Product® 完全ガイド</div>
          <div class="brand-subtitle">Version 5 学習ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li v-for="sec in TOC_SECTIONS" :key="sec.id">
          <a
            :href="`#${sec.id}`"
            :class="{ active: activeId === sec.id }"
            @click="closeSidebar"
          >
            <Icon :name="sec.icon" aria-hidden="true" />
            <span>{{ sec.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <main id="main-content" class="main-content" tabindex="-1">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          <span>PeopleCert公式シラバス準拠</span>
        </div>
        <h1>ITIL® Product (Version 5) 学習ガイド</h1>
        <p class="hero-lede">
          デジタルプロダクトを「統合されたバリューストリーム」としてマネジメントする — 初学者向け徹底解説
        </p>

        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">40問</div>
            <div class="stat-label">試験問題数(各1点・減点方式なし)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">90分</div>
            <div class="stat-label">試験時間(非母語受験者は113分)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">8活動</div>
            <div class="stat-label">Product and Service Lifecycle Model</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">オープンブック</div>
            <div class="stat-label">Official Bookのみ持ち込み可</div>
          </div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは、PeopleCert International Limitedが公開している公式シラバス「<em>ITIL® Product | Syllabus, Version 5.0 PL (February 2026)</em>」の学習目標・評価基準・試験構成に基づき、独学者向けに作成した<strong>非公式の学習補助資料</strong>です。ITIL®、PeopleCert®は PeopleCert International Limited の登録商標です。公式教材(Official Book)の複製ではなく、公開情報をもとに著者独自の言葉で再構成した解説です。試験直前の一次情報としては、必ず<strong>ITIL® Product (Version 5) Official Book</strong>を参照してください。詳細は<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-product-version-5-4179" target="_blank" rel="noopener">PeopleCert公式ページ</a>をご確認ください。</span>
        </div>
      </div>

      <!-- SECTION 01 -->
      <section id="what-is-itil-product" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:certificate" aria-hidden="true" />
          <span>SECTION 01</span>
        </div>
        <h2>ITIL Product (Version 5)とは何か</h2>

        <h3>資格の位置づけ</h3>
        <p>ITIL Product (Version 5)は、2026年2月にPeopleCertがリリースした<strong>ITIL(Version 5)資格体系</strong>の中で、<strong>ITIL Managing Professional(MP)</strong>ストリームを構成する4つのモジュールのひとつです。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ITIL(Version 5)資格体系</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ITIL Foundation (Version 5)</strong></td>
                <td>全資格の前提となる入門資格。デジタルプロダクト・サービスマネジメントの基礎概念を学ぶ</td>
              </tr>
              <tr>
                <td><strong>ITIL Foundation Bridge (Version 5)</strong></td>
                <td>ITIL 4保持者がVersion 5の差分のみを学ぶための橋渡し資格</td>
              </tr>
              <tr>
                <td><strong>ITIL Managing Professional (MP)</strong></td>
                <td>実務レベルでプロダクト・サービスを運用する人向け。<strong>ITIL Product</strong>・ITIL Service・ITIL Experience・ITIL Transformationの4モジュールを全て取得するとMP称号が得られる</td>
              </tr>
              <tr>
                <td>ITIL Strategic Leader (SL)</td>
                <td>経営・戦略層向けの上位資格群</td>
              </tr>
              <tr>
                <td>ITIL AI Governance</td>
                <td>前提資格不要の独立した拡張モジュール(extension module)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>ITIL Productは、この中でも「<strong>デジタルプロダクトをその一生涯(discovery〜support)にわたってどうマネジメントするか</strong>」に焦点を当てたモジュールです。</p>

        <h3>対象者とキャリアパス</h3>
        <p>公式サイトによれば、本資格は以下のようなロールを目指す人に向けて設計されています。</p>
        <ul>
          <li>Product Manager / Digital Product Manager</li>
          <li>Product Owner</li>
          <li>Head of Product Development</li>
          <li>Enterprise Architect / Solutions Architect</li>
          <li>IT Delivery Manager / Service Delivery Manager</li>
          <li>IT Operations Manager</li>
          <li>Portfolio Manager / Chief Digital Officer</li>
        </ul>

        <h3>受験前提条件(Entry Requirements)</h3>
        <p>以下のいずれかを<strong>保持していること</strong>が受験の前提条件です。</p>
        <ul>
          <li>ITIL 4の任意の資格(Foundationを含む)、または</li>
          <li>ITIL Foundation (Version 5)、または</li>
          <li>ITIL Foundation Bridge (Version 5)</li>
        </ul>
        <p>さらに、Accredited Training Organization(ATO)経由の研修受講、またはITIL Official eLearningの修了が求められ、<strong>修了証明がないと試験結果が開示されない</strong>点に注意が必要です。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <p>ITIL Productの学習を始める前に、ITIL Foundation (Version 5)で学ぶ「ITIL Value System」「4つの側面(Four Dimensions)」「ガイディングプリンシプル」「Product and Service Lifecycle Model」の基礎用語を再確認しておくと、本モジュールの内容が格段に理解しやすくなります。本モジュールはFoundationの復習ではなく、それらを<strong>実務でどう適用するか(Apply)</strong>を問う、Bloom's Level 3寄りの内容だからです。</p>
        </div>

        <h3>なぜこのモジュールが生まれたのか(Why It Matters)</h3>
        <p>ITIL(Version 5)は、ITIL 4までの「プロダクト」と「サービス」を別々の管理対象として扱う発想から脱却し、両者を<strong>単一の統合された価値創出システム</strong>として捉え直しました。公式ページは次の4点を核心的な変化として挙げています。</p>
        <ul>
          <li>Discoveryからサポートまでのエンドツーエンドのライフサイクル可視性</li>
          <li>プロダクトマネジメントとサービスマネジメントの実践の統合</li>
          <li>バリューストリームとフローの最適化</li>
          <li>競合するステークホルダー要求の中での明確な優先順位付け</li>
        </ul>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-product-version-5-4179" target="_blank" rel="noopener">ITIL Product (Version 5) | peoplecert.org</a></li>
            <li><a href="https://www.itil.com/professionals/certifications/ITIL-Product-Version-5" target="_blank" rel="noopener">ITIL Product (Version 5) | itil.com</a></li>
            <li><a href="https://www.theknowledgeacademy.com/blog/itil-certification-path/" target="_blank" rel="noopener">ITIL® Version 5 Certification Pathway: Complete Guide</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 02 -->
      <section id="exam-format" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:list-check" aria-hidden="true" />
          <span>SECTION 02</span>
        </div>
        <h2>試験概要と出題形式</h2>

        <p>公式シラバス(Version 5.0 PL, February 2026)に基づく試験の仕様は以下のとおりです。</p>

        <h3>試験の基本仕様</h3>
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
                <td>問題数</td>
                <td>40問(各1点、減点方式なし)</td>
              </tr>
              <tr>
                <td>試験時間</td>
                <td>90分(非母語受験者は+25%の113分)</td>
              </tr>
              <tr>
                <td>出題形式</td>
                <td>オープンブック(<strong>ITIL® Product Official Book</strong>のみ持ち込み可、書き込み可)</td>
              </tr>
              <tr>
                <td>合格ライン</td>
                <td>執筆時点でTBC(Take2再受験制度あり)</td>
              </tr>
              <tr>
                <td>Bloom's Level</td>
                <td>BL2(理解)とBL3(適用)の混在</td>
              </tr>
              <tr>
                <td>シナリオ</td>
                <td>"ITIL Car Rental Scenario"を全問共通の背景情報として使用。加えて"ICR's Unified Mobile App: A Product Lifecycle Journey"シナリオも一部設問で使用</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Bloom's Levelの考え方</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>レベル</th>
                <th>意味</th>
                <th>出題動詞の例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BL2(理解)</td>
                <td>ITILフレームワークの概念を理解しているか</td>
                <td>Describe / Explain / Understand</td>
              </tr>
              <tr>
                <td>BL3(適用)</td>
                <td>概念を実際の状況に適用できるか</td>
                <td>Apply / Differentiate</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>ITIL Productのシラバスでは、各活動(Discover〜Support)の「ステップの適用(Apply the steps)」がBL3として位置づけられており、単なる用語暗記ではなく<strong>シナリオに基づいた実践的判断力</strong>が問われる設計になっています。</p>

        <h3>出題タイプ(Question Types)</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>タイプ</th>
                <th>説明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard</td>
                <td>設問(stem)+4択の標準的なMCQ</td>
              </tr>
              <tr>
                <td>Negative</td>
                <td>設問文が否定形("NOT"など)になっているStandard問題。「ある事象が本来起きない/行われない」ことを問う学習目標がある場合のみ、例外的に使用される</td>
              </tr>
              <tr>
                <td>Missing word(s)</td>
                <td>文中の空欄に当てはまる語句を4択から選ぶ形式</td>
              </tr>
              <tr>
                <td>List</td>
                <td>4つのステートメントのうち正しいもの<strong>2つ</strong>を選ぶ(1と2/2と3/3と4/1と4、のような組み合わせ選択肢)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_QUESTION_TYPES" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">4つの出題形式の判定フロー</div>
        </div>

        <h3>出題カテゴリ(Exam Specification)</h3>
        <p>シラバスの章立てそのものが出題カテゴリになっています。配点比率(Weighting)は執筆時点で <strong>TBC(Beta試験終了後に確定)</strong> とされています。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>カテゴリ</th>
                <th>トピック</th>
                <th>配点比率</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Digital Products and Services</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Discover</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Design</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Acquire</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Build</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Transition</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Operate</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Deliver</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Support</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>10</td>
                <td>Lifecycle Management</td>
                <td>TBC</td>
              </tr>
              <tr>
                <td><strong>合計</strong></td>
                <td></td>
                <td><strong>100%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <p>配点比率が未確定であっても、<strong>10カテゴリすべてが等しく出題対象</strong>である前提で網羅的に学習するのが安全です。特に「10. Lifecycle Management」はAI・DevOps・PRINCE2との関係という横断的な内容を含み、他カテゴリの理解を統合する位置づけのため、学習の最後に必ず時間を確保してください。</p>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus, Version 5.0 PL (February 2026), PeopleCert International Limited</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/itil-version-5/itil-product-version-5/" target="_blank" rel="noopener">ITIL® Product (Version 5)(Oxford College of Technology)</a></li>
          </ul>
        </div>
      </section>

      <footer>
        本ガイドは学習補助を目的とした独自の解説資料です。ITIL®はPeopleCert International Limitedの登録商標です。試験の正式な出題範囲・配点は必ず公式シラバスおよびOfficial Bookで確認してください。
      </footer>
    </main>
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

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) {
  font-size: 17px;
  color: var(--color-ink-faint);
  flex: none;
}

.sidebar-nav a:hover {
  background: var(--color-indigo-tint);
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
  max-width: 100%;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
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

.hero-eyebrow :deep(.iconify),
.hero-eyebrow :deep(svg) {
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
  line-height: 1.7;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(140px, 1fr));
  gap: 16px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px 20px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-faint);
  line-height: 1.35;
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
  margin-bottom: 64px;
  outline: none;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 14px;
}

h2 {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.35;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-ink);
}

h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 36px 0 14px;
  color: var(--color-ink);
}

p {
  margin: 0 0 16px;
  line-height: 1.75;
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
  line-height: 1.75;
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

li {
  margin-bottom: 6px;
}

/* ===================== Table wrap ===================== */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 20px 0 28px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
  line-height: 1.55;
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
}

tr:last-child td {
  border-bottom: none;
}

/* ===================== Callouts ===================== */
.callout {
  border-radius: 8px;
  padding: 16px 20px;
  margin: 24px 0;
  border-left: 4px solid var(--color-border);
  background: var(--color-paper-raised);
}

.callout.practice {
  border-left-color: var(--color-forest);
  background: var(--color-forest-tint);
}

.callout.source {
  border-left-color: var(--color-indigo);
  background: var(--color-indigo-tint);
}

.callout.note {
  border-left-color: var(--color-gold);
  background: var(--color-gold-tint);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 16px;
}

.callout.practice .callout-title { color: var(--color-forest); }
.callout.source .callout-title { color: var(--color-indigo); }
.callout.note .callout-title { color: var(--color-gold); }

.callout p:last-child,
.callout ul:last-child {
  margin-bottom: 0;
}

/* ===================== Diagram Card ===================== */
.diagram-card {
  margin: 28px 0;
}

.mermaid-wrap {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 24px;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 8px;
}

.diagram-loading {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  padding: 24px;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
  line-height: 1.6;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }
  .sidebar {
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.2s ease, visibility 0.2s ease;
  }
  .sidebar.open {
    transform: translateX(0);
    visibility: visible;
  }
  .main-content {
    margin-left: 0;
    padding: 88px 24px 100px;
  }
  .hero h1 {
    font-size: 32px;
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
