<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL Experience (Version 5)® 認定資格 完全ガイド | PeopleCert Managing Professional",
  description: "PeopleCert ITIL Experience (Version 5) の出題範囲を、定義・理由・具体例・図解の順で初学者向けに解説する学習ガイド。",
});

const TOC_SECTIONS = [
  { id: "overview", label: "資格概要" },
  { id: "exam-overview", label: "試験概要" },
  { id: "foundations-refresh", label: "基礎概念の復習" },
  { id: "key-concepts", label: "Experienceの主要概念" },
  { id: "experience-framework", label: "体験のフレームワーク" },
  { id: "capturing-experience", label: "体験の捕捉" },
  { id: "service-journey", label: "サービスジャーニー" },
  { id: "itil-and-ai", label: "ITILとAI" },
  { id: "related-frameworks", label: "他フレームワークとの連携" },
  { id: "best-practices-summary", label: "ベストプラクティス総まとめ" },
  { id: "exam-tips", label: "試験対策のポイント" },
  { id: "glossary", label: "用語集" },
  { id: "references", label: "参考文献・ソース" },
] as const;

const activeId = useActiveHeading(TOC_SECTIONS.map((s) => s.id));
</script>

<template>
  <div class="layout">
    <nav class="sidebar" id="sidebar" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">ITIL Experience® 完全ガイド</div>
          <div class="brand-subtitle">PeopleCert Version 5</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li v-for="item in TOC_SECTIONS" :key="item.id">
          <a
            :href="`#${item.id}`"
            :class="{ active: activeId === item.id }"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          <span>PeopleCert ITIL (Version 5) &middot; Managing Professional</span>
        </div>
        <h1>ITIL® Experience (Version 5) 学習ガイド</h1>
        <p class="hero-lede">
          世界トップクラスのソフトウェアエンジニア兼スクラムマスターの視点から、初学者にもわかりやすいステップバイステップ形式で ITIL® Experience (Version 5) の出題範囲を解説します。各トピックは定義 → 理由 → 具体例 → 図解/表の順で構成し、実務で使えるベストプラクティスと根拠ソースを付記しています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">40問</div><div class="stat-label">出題数(各1点、減点方式なし)</div></div>
          <div class="stat-card"><div class="stat-number">90分</div><div class="stat-label">試験時間(非母国語は113分)</div></div>
          <div class="stat-card"><div class="stat-number">70%</div><div class="stat-label">合格基準(28/40問)</div></div>
          <div class="stat-card"><div class="stat-number">オープンブック</div><div class="stat-label">Official Book のみ持ち込み可</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは公開情報をもとに作成した非公式の学習補助資料です。PeopleCert International Limited の公式教材の代替にはなりません。最新の試験情報は必ず<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-experience-version-5-4177" target="_blank" rel="noopener">PeopleCert公式ページ</a>でご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 00. Overview ===================== -->
      <section id="overview" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 00</div>
        <h2>この試験は何か ── 全体像をつかむ</h2>

        <h3>0.1 定義</h3>
        <p><strong>ITIL® Experience (Version 5)</strong> は、PeopleCert が認定する ITIL (Version 5) 資格体系の中の <strong>Managing Professional (MP) ストリーム</strong> を構成するモジュール資格の1つです。公式ページの説明では、次のように位置づけられています。</p>
        <p><em>"ITIL Experience (Version 5) offers you the expertise you need to embed human-centered and AI-aware design across digital products and services."</em>(人間中心かつ AI を意識した設計を、デジタル製品・サービス全体に組み込む専門知識を提供する)</p>
        <p>つまりこの資格は、「サービスが機能的に正しく動くこと」だけでなく、<strong>「そのサービスを使う人がどう感じ、どう信頼し、どう価値を認識するか」</strong> をマネジメントする専門知識を認定するものです。</p>

        <h3>0.2 なぜこの資格が必要なのか(理由)</h3>
        <ul>
          <li>ITIL 4 までの ITSM フレームワークは「プロセスが正しく回っているか」に重点がありました。</li>
          <li>ITIL (Version 5) は <strong>Digital Product and Service Management (DPSM)</strong> へと軸足を移し、AI ネイティブ化・プロダクト中心思考とあわせて、<strong>Experience(体験)を独立した管理対象</strong> として初めて体系化しました。</li>
          <li>現代の SaaS・デジタルプロダクトでは、SLA を満たしていても「使いにくい」「信頼できない」と感じられれば解約・離反(チャーン)につながります。Experience を測定・改善できる人材が、Product Owner・Solutions Architect・Service Delivery Manager などの役割で高く評価されます。</li>
        </ul>

        <h3>0.3 対象者・前提資格・キャリアパス</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>対象者</td><td>デジタル製品・サービスを <strong>指揮・開発・提供</strong> する専門家。「機能的な成功だけでは不十分」と認識している人</td></tr>
              <tr><td>前提資格(必須)</td><td>次のいずれか1つ:(1)任意の ITIL 4 資格(Foundation 以上) / (2) ITIL Foundation (Version 5) / (3) ITIL Foundation Bridge (Version 5)</td></tr>
              <tr><td>学習形態要件</td><td>認定トレーニング機関(ATO)経由の研修、または ITIL Official eLearning の修了が必要(<strong>修了証明がないと結果が発表されない</strong>)</td></tr>
              <tr><td>代表的なキャリアパス</td><td>Experience Lead / Solutions Architect / Product Owner / Business Relationship Manager / Digital Transformation Manager / AI Governance Manager / Integration Manager / IT Director / Chief Digital Officer</td></tr>
              <tr><td>MP ストリームでの位置づけ</td><td>ITIL Experience / ITIL Product / ITIL Service / ITIL Transformation の4モジュールを揃えると ITIL Managing Professional の称号を取得できる</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>基礎を先に固める。</strong>ITIL Foundation (Version 5) をまだ取得していない場合は、先に ITIL VS・Four Dimensions・Guiding Principles・Product and Service Lifecycle などの基礎を固めてから本ガイドに進むこと。Experience の syllabus は Foundation の用語を前提に進みます。</li>
          </ul>
        </div>

        <div class="callout source">
          <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-experience-version-5-4177" target="_blank" rel="noopener">PeopleCert 公式製品ページ</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/itil-version-5/itil-experience-version-5/" target="_blank" rel="noopener">前提資格の詳細(Oxford College of Technology)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 01. Exam Overview ===================== -->
      <section id="exam-overview" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 01</div>
        <h2>試験概要(Exam Overview)</h2>

        <h3>1.1 試験形式</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>出題数</td><td>40問(各1点、減点方式なし)</td></tr>
              <tr><td>試験時間</td><td>90分(母国語・業務言語以外で受験する場合は25%延長=113分)</td></tr>
              <tr><td>出題形式</td><td>選択式(Objective Test Questions)</td></tr>
              <tr><td>合格基準</td><td>70%(28/40 問)※後述の注記を参照</td></tr>
              <tr><td>教材持ち込み</td><td><strong>オープンブック</strong>:ITIL® Experience (Version 5) Official Book のみ持ち込み可(書き込み可)。それ以外の教材は不可</td></tr>
              <tr><td>シナリオ</td><td><strong>ITIL Car Rental Scenario</strong>(レンタカー事業)を題材とする。最低1問は Scenario の "Experience" パートを参照する必要がある</td></tr>
              <tr><td>言語</td><td>英語・中国語・フランス語・イタリア語・ポーランド語・ポルトガル語(ブラジル)・スペイン語 など8言語</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note">
          <div class="callout-title"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p><strong>重要な注記(一次資料の透明性):</strong>2026年2月発行の公式シラバス(Version 5.0 PL=パイロット版)には、合格点・カテゴリ配点・Bloom's Level 配分がいずれも「TBC(To Be Confirmed)」と明記されています。一方で、現行の PeopleCert 公式製品ページでは合格ラインが 70% と明示されています。本ガイドは現行の製品ページの数値を採用しつつ、ベータ版シラバスの段階では数値が確定していなかった経緯を透明性のために残しています。受験直前は必ず PeopleCert 公式ページで最新の合格基準を確認してください。</p>
        </div>

        <h3>1.2 Bloom's Level(BL) ── 出題の「思考レベル」</h3>
        <p>ITIL (Version 5) の試験は、単純暗記だけでなく「理解」「応用」「分析」まで問う設計になっています。各設問には次の4段階の Bloom's Level(BL)が割り当てられます。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>BL</th><th>動詞の例</th><th>求められる思考</th></tr></thead>
            <tbody>
              <tr><td>BL1</td><td>Define / Identify</td><td>用語や概念を <strong>思い出す</strong>(再認・再生)</td></tr>
              <tr><td>BL2</td><td>Describe / Explain / Understand</td><td>概念を <strong>理解し説明できる</strong></td></tr>
              <tr><td>BL3</td><td>Apply</td><td>実際のシナリオに概念を <strong>適用できる</strong></td></tr>
              <tr><td>BL4</td><td>Analyse / Distinguish / Differentiate</td><td>情報を <strong>分析し、行動の妥当性を判断できる</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p>ITIL Experience の syllabus では BL1〜BL4 すべてが使用され、多くの Assessment Criteria が <strong>BL2(理解)</strong> を基礎として設計されています。BL3(適用)と BL4(分析)は「Stakeholder role mapping」「経験の摩擦点の分析」「継続的改善ループの適用」などピンポイントで登場します。</p>

        <h3>1.3 設問タイプ(4種類)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>タイプ</th><th>特徴</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td>設問文+選択肢4つから1つ選ぶ、最も一般的な形式</td></tr>
              <tr><td>Negative</td><td>Standard 問題の設問文が否定形("NOT" など)になったもの。<strong>「やってはいけないこと」を問う学習目標がある場合のみ</strong> 例外的に使用</td></tr>
              <tr><td>Missing word(s)</td><td>文中の空欄に当てはまる語句を4択から選ぶ</td></tr>
              <tr><td>List</td><td>4つの記述のうち <strong>正しいものを2つ</strong> 選ぶ(例:「1と2」「2と3」など組み合わせで解答)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>試験対策:</strong>List 形式は「2つとも正しい組み合わせ」を選ぶため、消去法よりも各記述を個別に○×判定してから組み合わせを絞り込む方が正答率が上がる。Negative 形式は問題文をよく読み、「NOT」「除く」などの否定語を見落とさないこと。</li>
          </ul>
        </div>

        <div class="callout source">
          <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Experience-Syllabus.pdf" target="_blank" rel="noopener">公式シラバス PDF(Version 5.0 PL, February 2026)</a></li>
            <li><a href="https://torque-it.com/product/itil-experience-version-5-including-exam/" target="_blank" rel="noopener">合格ライン・受講対象者(Torque IT)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 02. Foundations Refresh ===================== -->
      <section id="foundations-refresh">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
        <h2>前提となる基礎概念のリフレッシュ(Syllabus Category 1.1)</h2>
      </section>

      <!-- ===================== 03. Key Concepts ===================== -->
      <section id="key-concepts">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:brain" aria-hidden="true" />SECTION 03</div>
        <h2>Experience の主要概念(Syllabus Category 1.2) ── BL2</h2>
      </section>

      <!-- ===================== 04. Experience Framework ===================== -->
      <section id="experience-framework">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 04</div>
        <h2>ITIL Experience(Syllabus Category 2) ── 体験のフレームワーク全体像</h2>
      </section>

      <!-- ===================== 05. Capturing Experience ===================== -->
      <section id="capturing-experience">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 05</div>
        <h2>Experience の捕捉(Capturing Experience)(Syllabus Category 3)</h2>
      </section>

      <!-- ===================== 06. Service Journey ===================== -->
      <section id="service-journey">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 06</div>
        <h2>サービスジャーニー(Service Journey)(Syllabus Category 4)</h2>
      </section>

      <!-- ===================== 07. ITIL and AI ===================== -->
      <section id="itil-and-ai">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:robot" aria-hidden="true" />SECTION 07</div>
        <h2>ITIL と AI(Syllabus Category 5)</h2>
      </section>

      <!-- ===================== 08. Related Frameworks ===================== -->
      <section id="related-frameworks">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 08</div>
        <h2>ITIL と他のフレームワーク(Syllabus Category 6)</h2>
      </section>

      <!-- ===================== 09. Best Practices Summary ===================== -->
      <section id="best-practices-summary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:table" aria-hidden="true" />SECTION 09</div>
        <h2>ベストプラクティス総まとめ表</h2>
      </section>

      <!-- ===================== 10. Exam Tips ===================== -->
      <section id="exam-tips">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 10</div>
        <h2>試験対策のポイント(まとめ)</h2>
      </section>

      <!-- ===================== 11. Glossary ===================== -->
      <section id="glossary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 11</div>
        <h2>用語集(Glossary)</h2>
      </section>

      <!-- ===================== 12. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 12</div>
        <h2>参考文献・ソース一覧</h2>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height, 0px));
  background: var(--color-paper, #F6F7F9);
  color: var(--color-ink, #161B26);
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: var(--global-nav-height, 0px);
  height: calc(100vh - var(--global-nav-height, 0px));
  overflow-y: auto;
  border-right: 1px solid var(--color-border, #DFE3EA);
  background: var(--color-paper-raised, #FFFFFF);
  padding: 24px 16px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border, #DFE3EA);
}

.seal {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-weight: 700;
  font-size: 15px;
  color: var(--color-ink, #161B26);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 12px;
  color: var(--color-ink-faint, #8A93A3);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-nav a {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-ink-soft, #4B5566);
  text-decoration: none;
  transition: all 0.15s ease;
  line-height: 1.4;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken, #EEF0F4);
  color: var(--color-ink, #161B26);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint, #EEF1F8);
  color: var(--color-indigo, #2E3F72);
  font-weight: 600;
}

.main-content {
  flex: 1;
  min-width: 0;
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border, #DFE3EA);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-gold, #B8802A);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

h1 {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-size: 32px;
  font-weight: 700;
  color: var(--color-ink, #161B26);
  line-height: 1.3;
  margin: 0 0 16px;
}

.hero-lede {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-ink-soft, #4B5566);
  margin-bottom: 24px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--color-paper-raised, #FFFFFF);
  border: 1px solid var(--color-border, #DFE3EA);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.stat-number {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-indigo, #2E3F72);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--color-ink-soft, #4B5566);
  line-height: 1.4;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--color-info-bg, #EEF1F8);
  border: 1px solid var(--color-info-border, #C7D1EA);
  color: var(--color-info-text, #2E3F72);
  border-radius: 8px;
  padding: 14px 18px;
  font-size: 13px;
  line-height: 1.6;
}

.disclaimer-box :deep(.iconify),
.disclaimer-box :deep(svg) {
  flex: none;
  font-size: 18px;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}

.disclaimer-box a {
  color: var(--color-indigo, #2E3F72);
  font-weight: 600;
  text-decoration: underline;
}

section {
  margin-bottom: 48px;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 24px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-gold, #B8802A);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink, #161B26);
  line-height: 1.4;
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border, #DFE3EA);
}

@media (max-width: 980px) {
  .layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid var(--color-border, #DFE3EA);
  }
}
</style>
