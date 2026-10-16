<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL® Managing Professional Transition (Version 5) 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description: "ITIL Managing Professional Transition (Version 5) を初学者向けにステップバイステップで解説。Transformation Model、PSLM 8活動、ITIL Experience Model、AI Capability Model、各項目のベストプラクティスと出典URLを網羅。",
});

const TOC_SECTIONS = [
  { id: "about-mpt", label: "この資格について", icon: "tabler:certificate" },
  { id: "itil-v5-evolution", label: "ITIL(V5)全体像", icon: "tabler:timeline" },
  { id: "foundational-concepts", label: "共通基盤概念", icon: "tabler:building-bank" },
  { id: "exam1-transformation", label: "試験1: Transformation", icon: "tabler:git-branch" },
  { id: "exam2-product-service-experience", label: "試験2: Product/Service/Experience", icon: "tabler:route" },
  { id: "ai-capability-model", label: "ITIL and AI", icon: "tabler:file-text" },
  { id: "itil-other-frameworks", label: "他フレームワークとの関係", icon: "tabler:clipboard-text" },
  { id: "exam-strategy", label: "試験対策のポイント", icon: "tabler:map-2" },
  { id: "study-checklist", label: "学習チェックリスト", icon: "tabler:clipboard-check" },
  { id: "references", label: "参考文献", icon: "tabler:link" },
] as const;

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

const activeId = useActiveHeading(TOC_SECTIONS.map((s) => s.id));

const DIAGRAM_CERTIFICATION_PATHWAY = `flowchart TB
subgraph RouteGeneral["ルート1: 一般的なFoundationルート(前提資格なし)"]
direction TB
FG["ITIL Foundation Version 5"] --> FG2["Product/Service/Experience/ Transformationを個別取得"]
FG2 --> FG3["Managing Professional Version 5"]
FG --> FG4["Strategy/Transformationを個別取得"]
FG4 --> FG5["Strategic Leader Version 5"]
FG --> FG6["Practice Managerモジュールを個別取得"]
FG6 --> FG7["Practice Manager Version 5"]
FG3 --> FG8["ITIL Master Version 5"]
FG5 --> FG8
FG7 --> FG8
end
subgraph Route4MP["ルート2: ITIL 4 Managing Professionalからの移行"]
direction TB
MP4["ITIL 4 Managing Professional 保有"] --> MPT4MP["MPT研修 + Exam1/Exam2 合格"]
MPT4MP --> MP4R["Managing Professional Version 5 認定 (Transformationも認定済み)"]
MP4R --> MP4S["残る Practice Manager・Strategic Leaderを 別途個別取得"]
MP4S --> MP4M["ITIL Master Version 5"]
end
subgraph Route4["ルート3: ITIL 4 Masterからの移行"]
direction TB
M4["ITIL 4 Master 保有"] --> MPT4["MPT研修 + Exam1/Exam2 合格"]
MPT4 --> M4R["Managing Professional・Practice Manager・ Strategic Leaderを一括認定"]
M4R --> M4M["ITIL Master Version 5"]
end
subgraph RouteV3["ルート4: ITIL v3 Masterからの移行"]
direction TB
M3["ITIL v3 Master 保有 (v3 Expertも同様にMPまで)"] --> MPT3["MPT研修 + Exam1/Exam2 合格"]
MPT3 --> M3R["Managing Professional Version 5 認定 (Transformationも認定済み)"]
M3R --> M3S["Practice Manager・Strategic Leaderを 別途個別取得"]
M3S --> M3M["ITIL Master Version 5"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class FG,FG2,FG4,FG6,MP4,M4,M3 box;
class MPT4MP,MP4R,MP4S,MPT4,MPT3,M3R,M3S hub;
class FG3,FG5,FG7,FG8,MP4M,M4R,M4M,M3M done;`;
</script>

<template>
  <div class="guide-layout">
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <div
      v-if="sidebarOpen"
      class="sidebar-backdrop"
      @click="closeSidebar"
    />

    <nav
      class="sidebar"
      :class="{ 'is-open': sidebarOpen }"
      aria-label="目次"
    >
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">ITIL® MPT (V5) 完全ガイド</div>
          <div class="brand-subtitle">Managing Professional Transition</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li v-for="item in TOC_SECTIONS" :key="item.id">
          <a
            :href="`#${item.id}`"
            :class="{ active: activeId === item.id }"
            @click="closeSidebar"
          >
            <Icon :name="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" />PeopleCert公式認定資格ガイド
        </div>
        <h1>ITIL® Managing Professional Transition (Version 5)</h1>
        <p class="hero-lede">
          初学者向け ステップバイステップ解説 + ベストプラクティス
        </p>

        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">2試験</div>
            <div class="stat-label">Transformation + Product/Service/Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100問</div>
            <div class="stat-label">Exam1: 40問 / Exam2: 60問</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">70%</div>
            <div class="stat-label">各試験の合格基準(オープンブック)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">3年</div>
            <div class="stat-label">資格更新サイクル(60 CPD)</div>
          </div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          <span>本ガイドは教育・学習支援を目的とした非公式の解説資料です。ITIL Transformation Model の12ステージの正式名称、各PSLM活動のCSF・メトリクスの正確な文言、試験の最新の出題傾向については、必ず公式eBookおよび<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-managing-professional-transition-version-5-4227" target="_blank" rel="noopener">PeopleCert公式サイト</a>で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 1. About MPT ===================== -->
      <section id="about-mpt">
        <div class="section-eyebrow">
          <Icon name="tabler:certificate" />SECTION 01
        </div>
        <h2>この資格について</h2>

        <h3>ITIL Managing Professional Transition (Version 5) とは何か</h3>
        <p><strong>ITIL® Managing Professional Transition (Version 5)</strong>(以下 MPT)は、すでに ITIL の上級資格を保有している経験豊富なプロフェッショナルが、個別モジュールを一つずつ受講し直すことなく、最新の <strong>ITIL (Version 5)</strong> へ迅速かつ低コストでアップグレードするための「橋渡し(ブリッジ)モジュール」です。</p>

        <p>対象となるのは以下のいずれかの既存資格保持者のみです。</p>
        <ul>
          <li>ITIL 4 Managing Professional</li>
          <li>ITIL 4 Master</li>
          <li>ITIL v3 Expert</li>
          <li>ITIL v3 Master</li>
        </ul>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>上記いずれの前提資格も持たない場合は MPT を受験できません。その場合は ITIL Foundation (Version 5) から開始し、ITIL Product / ITIL Service / ITIL Experience / ITIL Transformation の各モジュールを個別に取得するルートを選びます。</p>
        </div>

        <h3>認定の位置づけ</h3>
        <p>MPT は「研修1本 + 試験2本」で構成されるパッケージです。両方の試験に合格すると <strong>ITIL Managing Professional (Version 5)</strong> の資格が得られます。ITIL 最高位資格 <strong>ITIL Master (Version 5)</strong> に到達するには、これに加えて <strong>ITIL Practice Manager (Version 5)</strong> と <strong>ITIL Strategic Leader (Version 5)</strong> の2資格も必要です(3資格必須)。ただし、保有していた前提資格によってMPT経由での到達範囲が異なります。</p>
        <ul>
          <li><strong>ITIL 4 Managing Professional 保有者:</strong> MPTの2試験合格により、Managing Professional (Version 5) と、中核モジュール <strong>Transformation (Version 5)</strong> の2つが認定されます(Exam 1 が Transformation の試験そのものであるため)。Master に到達するために残るのは Practice Manager と Strategic Leader の2資格で、これらは<strong>別途個別に取得</strong>する必要があります。</li>
          <li><strong>ITIL 4 Master 保有者:</strong> MPTの2試験合格により、Managing Professional に加えて Practice Manager・Strategic Leader も同時に認定され、<strong>ITIL Master (Version 5) まで一括で到達</strong>します。</li>
          <li><strong>ITIL v3 Master 保有者:</strong> MPTの2試験合格で得られるのは Managing Professional(および中核モジュール Transformation の認定)までです。Master に到達するには、Practice Manager と Strategic Leader を<strong>別途個別に取得</strong>する必要があります。</li>
        </ul>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CERTIFICATION_PATHWAY" />
          </ClientOnly>
          <div class="diagram-caption">ITIL Master (Version 5) までの3つの到達ルート(一般的なFoundationルート / ITIL 4 Masterからの移行 / ITIL v3 Masterからの移行)</div>
        </div>

        <h3>試験構成の全体比較</h3>
        <p>MPT は2つの独立した試験から構成され、<strong>どちらから先に受験しても構いません</strong>(別日程での受験も可)。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>項目</th>
                <th>Exam 1: ITIL Transformation (Version 5)</th>
                <th>Exam 2: MPT – Product, Service, Experience (Version 5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>出題数</td>
                <td>40問</td>
                <td>60問</td>
              </tr>
              <tr>
                <td>形式</td>
                <td>多肢選択式(Multiple choice)</td>
                <td>多肢選択式(Multiple choice)</td>
              </tr>
              <tr>
                <td>試験時間</td>
                <td>90分(非母語話者は+25%で約113分)</td>
                <td>120分(非母語話者は+25%で約150分)</td>
              </tr>
              <tr>
                <td>参照可否</td>
                <td>オープンブック(公式 Transformation eBook + シナリオ冊子)</td>
                <td>オープンブック(公式 Product / Service / Experience eBook)</td>
              </tr>
              <tr>
                <td>合格基準</td>
                <td>70%</td>
                <td>70%</td>
              </tr>
              <tr>
                <td>出題スタイル</td>
                <td>シナリオベース(ケーススタディ形式)</td>
                <td>シナリオベース(例: レンタカー会社ケース) + Experience セクション</td>
              </tr>
              <tr>
                <td>受験方式</td>
                <td>オンライン監督下試験(PeopleCert経由)</td>
                <td>オンライン監督下試験(PeopleCert経由)</td>
              </tr>
              <tr>
                <td>主な学習範囲</td>
                <td>Transformation Model の4 Layer(Governance / Positioning / Execution / Learning)、変革パターン</td>
                <td>PSLM 8活動、バリューストリーム、Experience Model、サービスジャーニー</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>2試験は独立採点のため、得意分野から着手する戦略が有効です。「変革・組織改革」の経験が長い方は Transformation から、「プロダクト/サービス運用」の実務経験が長い方は PSE から始めると学習の立ち上がりが早くなります。</p>
        </div>

        <h3>公式教材</h3>
        <p>この認定コースには以下4冊の公式eBookと公式Learner Workbookが含まれます。</p>
        <ul>
          <li>ITIL Product (Version 5) 公式eBook</li>
          <li>ITIL Service (Version 5) 公式eBook</li>
          <li>ITIL Experience (Version 5) 公式eBook</li>
          <li>ITIL Transformation (Version 5) 公式eBook</li>
        </ul>

        <div class="callout note" data-variant="note">
          <div class="callout-title">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p>本ガイドは上記の公式教材および PeopleCert・各アクレディテッド・トレーニング・オーガナイゼーション(ATO)が公開している情報をもとに、初学者向けに再構成した学習補助資料です。公式eBookの正式な記述(成功要因・メトリクスの正確な文言など)については、必ず公式教材を最終参照源としてください。</p>
        </div>

        <h3>資格の更新</h3>
        <ul>
          <li>更新サイクル: <strong>3年ごと</strong></li>
          <li>更新方法: PeopleCert Plus 会員として <strong>60 CPD ポイント</strong> を蓄積するか、同一 Product Suite 内の別モジュールを再受験する</li>
        </ul>
      </section>

      <!-- ===================== 2. ITIL Version 5 Evolution ===================== -->
      <section id="itil-v5-evolution">
        <div class="section-eyebrow">
          <Icon name="tabler:timeline" />SECTION 02
        </div>
        <h2>ITIL (Version 5) 全体像 — v3 / v4 からの進化</h2>

        <p>MPT を学ぶ前提として、ITIL がどのように進化してきたかを理解しておくと、Transformation・PSE いずれの試験でも問われる「なぜこの変更が行われたか」という視点が持てます。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>観点</th>
                <th>ITIL v3(2007)</th>
                <th>ITIL 4(2019)</th>
                <th>ITIL (Version 5)(2026)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>中核モデル</td>
                <td>Service Lifecycle(5段階: Strategy/Design/Transition/Operation/CSI)</td>
                <td>Service Value System + Service Value Chain(6活動)</td>
                <td>ITIL Value System (ITIL VS) + Product and Service Lifecycle Model / PSLM(8活動)</td>
              </tr>
              <tr>
                <td>対象範囲</td>
                <td>ITサービスマネジメント</td>
                <td>ITサービスマネジメント(原則・プラクティス体系)</td>
                <td>デジタル<strong>プロダクト</strong>とサービスの統合マネジメント</td>
              </tr>
              <tr>
                <td>AIの扱い</td>
                <td>想定なし</td>
                <td>言及なし</td>
                <td>Four Dimensionsの「情報と技術」にAI Capability Model(6Cモデル)を新設、「組織と人材」には人とAIの協働を明示的に統合、専用のAI Governanceモジュールも新設</td>
              </tr>
              <tr>
                <td>Guiding Principles</td>
                <td>なし(v3独自の原則)</td>
                <td>7原則</td>
                <td>7原則を<strong>そのまま継承</strong>(変更なし)</td>
              </tr>
              <tr>
                <td>管理プラクティス</td>
                <td>26プロセス+機能</td>
                <td>34プラクティス</td>
                <td>34プラクティス名を<strong>そのまま継承</strong></td>
              </tr>
              <tr>
                <td>認定体系</td>
                <td>Foundation→Practitioner→Intermediate→Expert→Master</td>
                <td>Foundation→Specialist/Strategist/Leader→Master</td>
                <td>Foundation→Practice Manager / Product・Service・Experience・Transformation(Managing Professional) / Strategy・Transformation(Strategic Leader)→Master(Practice Manager+Managing Professional+Strategic Leaderの3資格が必須)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>試験対策としては「何が変わったか」だけでなく「何が変わっていないか」を明確に区別して覚えることが得点に直結します。Guiding Principlesと34プラクティス名は据え置きのため、既存のITIL 4知識はそのまま活用できます。</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.guide-layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height));
  background: var(--color-paper);
}

.sidebar-toggle {
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
  padding: 32px 20px 40px;
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 0 8px;
}

.seal {
  flex: none;
  width: 36px;
  height: 36px;
}

.brand-text .brand-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  color: var(--color-ink);
  line-height: 1.3;
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
  font-size: 15px;
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
  flex: 1;
  min-width: 0;
  padding: 48px 48px 80px;
  max-width: 900px;
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-indigo);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.3;
  margin: 0 0 16px;
}

.hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
  line-height: 1.6;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
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
  font-size: 13px;
  color: var(--color-ink-soft);
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
  border-radius: 8px;
  padding: 14px 18px;
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
  margin-bottom: 56px;
  scroll-margin-top: calc(var(--global-nav-height) + 24px);
}

:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 24px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-indigo);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

h3 {
  font-size: 19px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 28px 0 12px;
}

h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 20px 0 8px;
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

li {
  margin-bottom: 6px;
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
}

.callout.note {
  background: var(--color-indigo-tint);
  border-color: var(--color-indigo);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 8px;
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.note .callout-title {
  color: var(--color-indigo);
}

.callout p:last-child {
  margin-bottom: 0;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
}

tr:last-child td {
  border-bottom: none;
}

.mermaid-wrap {
  margin: 28px 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
}

.diagram-caption {
  font-size: 13px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 12px;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-indigo);
    color: #fff;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    cursor: pointer;
    font-size: 24px;
  }

  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    width: 280px;
    height: calc(100vh - var(--global-nav-height));
    z-index: 90;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 80;
  }

  .main-content {
    padding: 32px 20px 60px;
  }
}
</style>
