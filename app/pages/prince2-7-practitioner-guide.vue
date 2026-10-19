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
