<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { MERMAID_THEME_VARIABLES } from "~/utils/mermaid-theme";

const TOC_IDS = [
  "what-is-csm",
  "certification-roadmap",
  "learning-objectives-overview",
  "scrum-theory",
  "scrum-team",
  "scrum-events",
  "scrum-artifacts",
  "scrum-master-competencies",
  "service-to-team-po-org",
  "exam-details",
  "study-best-practices",
  "renewal-career-path",
  "glossary",
  "summary",
  "references",
];

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);
const activeId = useActiveHeading(TOC_IDS);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

useSeoMeta({
  title: "Certified ScrumMaster®(CSM®)完全ガイド | 初学者向けステップバイステップ解説",
  description: "Scrum Alliance公式のLearning ObjectivesとScrum Guideに基づき、CSM資格の出題範囲・ベストプラクティス・試験対策を初学者向けに解説する完全ガイドです。",
});

const DIAGRAM_ROADMAP = `flowchart TD
A["Step 1 CST主催の公式CSMコースを受講 最低16時間"] --> B["Step 2 Welcomeメールを受信し認定アカウントを有効化"]
B --> C["Step 3 Dashboardから CSM Examを開始"]
C --> D["Step 4 50問中37問以上正解で合格 制限時間1時間"]
D -->|"不合格の場合"| E["90日以内かつ2回まで無料で再受験可能"]
E --> C
D -->|"合格"| F["Step 5 CSM認定取得 Scrum Alliance会員登録"]
F --> G["Step 6 2年ごとにSEU20単位と更新料で更新"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F,G done;`;

const DIAGRAM_EMPIRICISM_PILLARS = `flowchart LR
T["Transparency 透明性 作業とプロセスが見える状態"] --> I["Inspection 検査 作成物と進捗を頻繁かつ入念に確認"]
I --> A["Adaptation 適応 逸脱を検知したら速やかに調整"]
A -.->|"学びを得るたびに繰り返す"| T

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class T hub;
class I,A box;`;

const DIAGRAM_SPRINT_CYCLE = `flowchart TD
SP["Sprint Planning 1ヶ月Sprintで最大8時間"] --> DS["Daily Scrum 毎営業日15分"]
DS -->|"Sprint期間中は毎日繰り返す"| DS
DS --> SR["Sprint Review 1ヶ月Sprintで最大4時間"]
SR --> RETRO["Sprint Retrospective 1ヶ月Sprintで最大3時間"]
RETRO --> SP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SP hub;
class DS,SR,RETRO box;`;

const DIAGRAM_SCRUM_MASTER_SERVICE = `flowchart TD
SM["Scrum Master"] --> TEAM["Scrum Teamへの奉仕"]
SM --> PO["Product Ownerへの奉仕"]
SM --> ORG["組織への奉仕"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SM hub;
class TEAM,PO,ORG box;`;
</script>

<template>
  <div class="guide-page">
    <button
      id="sidebarToggle"
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <div class="layout">
      <!-- ===================== Sidebar ===================== -->
      <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="brand-text">
            <div class="brand-title">CSM® 完全ガイド</div>
            <div class="brand-subtitle">初学者のためのステップバイステップ解説</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li>
            <a
              href="#what-is-csm"
              :class="{ active: activeId === 'what-is-csm' }"
              :aria-current="activeId === 'what-is-csm' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:certificate" />CSM資格とは何か
            </a>
          </li>
          <li>
            <a
              href="#certification-roadmap"
              :class="{ active: activeId === 'certification-roadmap' }"
              :aria-current="activeId === 'certification-roadmap' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:route" />認定取得までのロードマップ
            </a>
          </li>
          <li>
            <a
              href="#learning-objectives-overview"
              :class="{ active: activeId === 'learning-objectives-overview' }"
              :aria-current="activeId === 'learning-objectives-overview' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:list-check" />出題範囲の全体像
            </a>
          </li>
          <li>
            <a
              href="#scrum-theory"
              :class="{ active: activeId === 'scrum-theory' }"
              :aria-current="activeId === 'scrum-theory' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:building-bank" />Scrum理論の基礎
            </a>
          </li>
          <li>
            <a
              href="#scrum-team"
              :class="{ active: activeId === 'scrum-team' }"
              :aria-current="activeId === 'scrum-team' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:git-branch" />Scrum Team
            </a>
          </li>
          <li>
            <a
              href="#scrum-events"
              :class="{ active: activeId === 'scrum-events' }"
              :aria-current="activeId === 'scrum-events' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:calendar-event" />Scrum Events
            </a>
          </li>
          <li>
            <a
              href="#scrum-artifacts"
              :class="{ active: activeId === 'scrum-artifacts' }"
              :aria-current="activeId === 'scrum-artifacts' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-text" />Scrum ArtifactsとCommitments
            </a>
          </li>
          <li>
            <a
              href="#scrum-master-competencies"
              :class="{ active: activeId === 'scrum-master-competencies' }"
              :aria-current="activeId === 'scrum-master-competencies' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:chart-pie" />Scrum Master Core Competencies
            </a>
          </li>
          <li>
            <a
              href="#service-to-team-po-org"
              :class="{ active: activeId === 'service-to-team-po-org' }"
              :aria-current="activeId === 'service-to-team-po-org' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:timeline" />Team・PO・組織への奉仕
            </a>
          </li>
          <li>
            <a
              href="#exam-details"
              :class="{ active: activeId === 'exam-details' }"
              :aria-current="activeId === 'exam-details' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-check" />CSM試験の詳細
            </a>
          </li>
          <li>
            <a
              href="#study-best-practices"
              :class="{ active: activeId === 'study-best-practices' }"
              :aria-current="activeId === 'study-best-practices' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:map-2" />学習・試験対策
            </a>
          </li>
          <li>
            <a
              href="#renewal-career-path"
              :class="{ active: activeId === 'renewal-career-path' }"
              :aria-current="activeId === 'renewal-career-path' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:refresh" />認定更新とキャリアパス
            </a>
          </li>
          <li>
            <a
              href="#glossary"
              :class="{ active: activeId === 'glossary' }"
              :aria-current="activeId === 'glossary' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:book-2" />用語対照表
            </a>
          </li>
          <li>
            <a
              href="#summary"
              :class="{ active: activeId === 'summary' }"
              :aria-current="activeId === 'summary' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:flag-3" />まとめ
            </a>
          </li>
          <li>
            <a
              href="#references"
              :class="{ active: activeId === 'references' }"
              :aria-current="activeId === 'references' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:link" />参考文献・ソース一覧
            </a>
          </li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" />Scrum Alliance公式 Learning Objectivesに基づく解説</div>
          <h1>Certified ScrumMaster®(CSM®)完全ガイド</h1>
          <p class="hero-lede">
            本ガイドは、Scrum Alliance®が提供するCertified ScrumMaster®(CSM®)資格について、公式情報源(Scrum Alliance公式サイト・公式Learning Objectives文書・Scrum Guide 2020年版)を根拠に、初学者でも理解できるようステップバイステップで解説したものです。各章末に該当するベストプラクティスと参考ソース(URL)を明記しています。
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">50問</div><div class="stat-label">出題数(4択多肢選択式)</div></div>
            <div class="stat-card"><div class="stat-number">37問以上</div><div class="stat-label">合格ライン(74%以上)</div></div>
            <div class="stat-card"><div class="stat-number">16時間以上</div><div class="stat-label">必須コース受講時間</div></div>
            <div class="stat-card"><div class="stat-number">2年ごと</div><div class="stat-label">認定更新サイクル</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" />
            本ガイドは執筆時点(2026年8月)で確認できた公式情報に基づいています。試験形式・料金・更新要件等はScrum Allianceにより変更される可能性があるため、受験前には必ず<a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">公式ページ</a>で最新情報をご確認ください。
          </div>
        </div>

        <!-- ===================== 01. What is CSM ===================== -->
        <section id="what-is-csm">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" />SECTION 01</div>
          <h2>CSM資格とは何か</h2>

          <h3>CSM資格の概要</h3>
          <p>Certified ScrumMaster®(CSM®)は、世界最大のアジャイル認定団体である<strong>Scrum Alliance®</strong>(2001年設立)が提供する、Scrumフレームワークの入門的な資格です。CSMコースはScrumのフレームワーク全体(チームのアカウンタビリティ、イベント、作成物)を扱う導入コースと位置づけられており、受講者はチームでScrumを実践するための具体的な方法と、その土台となるアジャイルの原則・価値観への理解を深めることができます。</p>

          <h3>Scrum Masterという役割</h3>
          <p>Scrum Alliance公式サイトでは、Scrum Masterはチームの中で「効果的で生産的な働き方の環境を育てる」役割であり、人志向で感情的知性(EQ)が高く、人の成長・学習を助けることに喜びを感じる人物像が典型例として挙げられています。日々の活動は組織によって異なりますが、共通するのは「対話のファシリテーション」「チームの進捗を妨げる障害物への対応」「Scrumの実践に関する個々のメンバーへのコーチング」です。</p>

          <h3>CSMを取得すべき人</h3>
          <p>Scrum Alliance公式サイトでは、以下のいずれかに当てはまる人にCSM受講を推奨しています。</p>
          <ul>
            <li>幅広い職務スキルを身につけたい</li>
            <li>求職者としての競争力を高めたい</li>
            <li>スキル向上への意欲を雇用主・採用担当者に示したい</li>
            <li>最も普及しているアジャイルフレームワークの使い方を知りたい</li>
            <li>決められた手順をなぞるのではなく、アジャイルなマインドセットを実践したい</li>
            <li>有能で効果的なScrum Masterとして働きたい</li>
            <li>Scrumの実践力を高めたい</li>
            <li>アジリティについてさらに学びたい</li>
          </ul>
          <p>なお、Scrumはソフトウェア開発発祥のフレームワークですが、現在ではマーケター・データサイエンティスト・人事担当者など、さまざまな職種の専門家がより良い方法で製品・サービスを生み出すために活用しています。</p>

          <h3>CSM取得のメリット</h3>
          <p>Scrum Alliance公式サイトは、Indeedの調査データを引用し、CSM取得者の95%が友人にこの資格を勧めると回答し、71%がキャリアアップを目的にコースを受講したと回答していることを紹介しています。また、Scrum Master系の資格は近年最も求人で要求される専門資格の上位(9位)に入るとされています。CSMコースを通じて身につく実務スキルとして、コミュニケーション、チームダイナミクス、対立解消、部門横断的なチームワーク、リーダーシップとコーチング、継続的改善が挙げられています。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>CSMは「知識試験」ではなく「学習確認試験」という位置づけであることを理解する。</strong>資格そのものをゴールにせず、その先にある「チームと組織のアジリティ向上」という目的意識を持って学習に臨む。</li>
              <li><strong>自分の職種・業界への適用をイメージしながら学ぶ。</strong>Scrumはソフトウェア開発に限らない汎用フレームワークであるため、具体的な適用場面を想像すると定着しやすい。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance「Certified ScrumMaster® (CSM®)」公式ページ</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 02. Certification Roadmap ===================== -->
        <section id="certification-roadmap">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 02</div>
          <h2>認定取得までのロードマップ(ステップバイステップ)</h2>

          <p>CSM認定の取得は、必ず「Certified Scrum Trainer®(CST®)」が主催する公式コースの受講から始まります。個人でテキストを学習して試験だけを受けることはできません。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ROADMAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">CSM認定取得までの6ステップ</div>
          </div>

          <h3>ステップ詳細</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>ステップ</th><th>内容</th><th>補足</th></tr></thead>
              <tbody>
                <tr><td>1. コース受講</td><td>CSTが主催する公式コース(合計16時間、多くは2〜3日間)を受講する。オンライン・対面いずれの形式もある</td><td>学習目標(Learning Objectives)は全コース共通で規定されている</td></tr>
                <tr><td>2. アカウント有効化</td><td>コース修了後に届くWelcomeメールから、Scrum Alliance認定アカウントを有効化する</td><td>メールが届かない場合はサポートへ問い合わせる</td></tr>
                <tr><td>3. 試験受験</td><td>ダッシュボードから「Take CSM Exam」を選択し、mytestcom.net上で受験する</td><td>使用ブラウザはSafari/Firefox/Chrome/Edgeのいずれか。Internet Explorerは非対応</td></tr>
                <tr><td>4. 合否判定</td><td>50問中37問(74%)以上の正解で合格。制限時間は1時間</td><td>試験はオープンブック形式(Scrum Guide等の参照が可能)</td></tr>
                <tr><td>5. 認定取得</td><td>合格するとCSM認定バッジとScrum Alliance会員資格を取得</td><td>コース費用に試験2回分の受験権が含まれる</td></tr>
                <tr><td>6. 継続更新</td><td>2年ごとにSEU(Scrum Education Units)20単位と更新料の納付で更新</td><td>詳細は本ガイド第12章を参照</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>トレーナー選びを慎重に行う。</strong>CST(認定トレーナー)の経歴・実務経験・レビューを確認する。トレーナーの質が学習の質を大きく左右する。</li>
              <li><strong>Welcomeメールの受信に備える。</strong>コース申込時に使用したメールアドレスを控えておき、届かない場合に備える。</li>
              <li><strong>受験環境を整える。</strong>受験当日はポップアップブロッカーを無効化し、ブラウザの「戻る」ボタンを使用しない(セッションが強制終了するリスクがあるため)。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance「Certified ScrumMaster® (CSM®)」公式ページ(FAQ含む)</a></li>
              <li><a href="https://support.scrumalliance.org/hc/en-us/articles/360002112772" target="_blank" rel="noopener">Scrum Alliance Help Center「How to take the Certified ScrumMaster® (CSM®) test」</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 03. Learning Objectives Overview ===================== -->
        <section id="learning-objectives-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 03</div>
          <h2>出題範囲(Learning Objectives)の全体像</h2>

          <p>CSM試験の出題内容は、Scrum Allianceが公式に定める<strong>Learning Objectives(学習目標)文書</strong>に基づいています。これは2種類に分かれており、CSMコースでは両方がカバーされます。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>文書</th><th>対象</th><th>カテゴリ数</th><th>主な内容</th></tr></thead>
              <tbody>
                <tr><td>Scrum Foundations Learning Objectives(2022年1月版)</td><td>CSM・CSPO共通の土台知識</td><td>4カテゴリ</td><td>Scrum Theory / The Scrum Team / Scrum Events and Activities / Scrum Artifacts and Commitments</td></tr>
                <tr><td>CSM Learning Objectives(2022年1月版)</td><td>CSMコース固有の知識</td><td>3カテゴリ</td><td>Scrum(Team・Events) / Scrum Master Core Competencies / Service to the Scrum Team, Product Owner, and Organization</td></tr>
              </tbody>
            </table>
          </div>

          <p>これらの学習目標は、以下の4つの一次情報源に基づいて策定されています。</p>
          <ol>
            <li>Manifesto for Agile Software Development(4つの価値観と12の原則)</li>
            <li>Scrum values(Scrum Allianceが定めるScrumの価値基準ページ)</li>
            <li>Scrum Guide(scrumguides.org、Ken Schwaber と Jeff Sutherlandによる公式定義書)</li>
            <li>Scrum Allianceの認定Guide(CST/CEC/CTC)コミュニティからのフィードバック</li>
          </ol>

          <p>また、各学習目標にはBloomのタキソノミー(知識→理解→応用→分析→統合→評価という6段階の学習到達度)に基づくレベルが付与されており、単なる暗記ではなく「実際に実演できる」レベルまで求められる項目(例:Sprint Planningを実演する、Sprint Retrospectiveを実演する)が含まれている点が特徴です。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>公式Learning Objectives文書そのものを読み込む。</strong>市販の非公式問題集より先に、この文書とScrum Guideに基づく試験問題の傾向を把握する。</li>
              <li><strong>各学習目標の動詞に注目する。</strong>describe / discuss / explain / perform などの指定に注目し、「perform(実演する)」と指定された項目は実務での運用イメージまで押さえる。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「CSM Learning Objectives」(PDF)</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「Scrum Foundations Learning Objectives」(PDF)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 04. Scrum Theory ===================== -->
        <section id="scrum-theory">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 04</div>
          <h2>Scrum理論の基礎(Scrum Theory)</h2>

          <h3>Scrumの定義</h3>
          <p>Scrum Guide(2020年11月版)は、Scrumを「複雑な問題に対して適応的な解決策を生み出すことを通じて、人・チーム・組織に価値をもたらす軽量級フレームワーク」と定義しています。Scrumの基本サイクルは次の4つの繰り返しです。</p>
          <ol>
            <li>Product Ownerが複雑な問題への取り組みをProduct Backlogに順序付けする</li>
            <li>Scrum TeamがSprintの中で作業の一部を価値のIncrementに変える</li>
            <li>Scrum Teamとステークホルダーが結果を検査し、次のSprintに向けて調整する</li>
            <li>上記を繰り返す</li>
          </ol>
          <p>Scrum Guideは、Scrumが意図的に「不完全」であること、すなわちScrum理論の実装に必要な部分だけを定義し、具体的な手順は利用者の集合知に委ねていることを強調しています。</p>

          <h3>Empiricism(経験主義)と3本柱</h3>
          <p>Scrumは<strong>Empiricism(経験主義)</strong>と<strong>Lean思考</strong>を土台としています。経験主義とは、知識は経験から得られ、意思決定は観察された事実に基づいて行われるべきだという考え方です。Lean思考は無駄を減らし、本質的なものに集中することを指します。</p>
          <p>経験主義の3本柱(Three Pillars)は以下の通りです。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_EMPIRICISM_PILLARS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">経験主義の3本柱 — 透明性・検査・適応の循環</div>
          </div>

          <ul>
            <li><strong>透明性(Transparency):</strong>作業とプロセスは、実行する人・成果を受け取る人の双方から見える状態でなければならない。透明性が低い作成物は、価値を損ない、リスクを高める意思決定につながる。</li>
            <li><strong>検査(Inspection):</strong>Scrumの作成物とゴールへの進捗は、望ましくない逸脱や問題を検知するために、頻繁かつ入念に検査されなければならない。検査を助けるため、Scrumは5つのイベントによるリズム(ケイデンス)を提供する。</li>
            <li><strong>適応(Adaptation):</strong>プロセスや成果物が許容範囲を逸脱した場合、できるだけ早く調整しなければならない。適応は、関係者が権限委譲され自己管理的であるほど機能しやすい。</li>
          </ul>
          <p>透明性が検査を可能にし、検査が適応を可能にする、という一方向の依存関係がある点も重要です(透明性のない検査は誤解を招き無駄であり、適応につながらない検査は無意味とされています)。</p>

          <h3>Scrumの5つの価値基準</h3>
          <p>Scrum Guideは、Scrumの成功はチームが以下5つの価値観に習熟することにかかっているとしています。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>価値基準(英語)</th><th>日本語</th><th>内容の要点</th></tr></thead>
              <tbody>
                <tr><td>Commitment</td><td>確約</td><td>ゴール達成とお互いを支え合うことへのコミットメント。達成できると信じられる範囲でのみ作業を引き受ける</td></tr>
                <tr><td>Focus</td><td>集中</td><td>Sprintの作業に集中し、ゴールに向けて最善の進捗を出す</td></tr>
                <tr><td>Openness</td><td>公開</td><td>作業や課題についてオープンであること</td></tr>
                <tr><td>Respect</td><td>尊敬</td><td>チームメンバーがお互いを能力ある独立した個人として尊重し合うこと</td></tr>
                <tr><td>Courage</td><td>勇気</td><td>正しいことを行い、困難な問題に取り組む勇気を持つこと</td></tr>
              </tbody>
            </table>
          </div>
          <p>これらの価値観がScrum Teamと関係者に体現されたとき、透明性・検査・適応という経験主義の3本柱が信頼のもとで機能するようになります。</p>

          <h3>アジャイルソフトウェア開発宣言との関係</h3>
          <p>CSM/Scrum Foundations Learning Objectivesは、Scrumが「アジャイルソフトウェア開発宣言(Manifesto for Agile Software Development)」の4つの価値観・12の原則とどのように整合しているかを説明できることを求めています。</p>
          <p>アジャイル宣言の4つの価値観(要約):</p>
          <ul>
            <li>プロセスやツールよりも「個人と対話」を重視する</li>
            <li>包括的なドキュメントよりも「動くソフトウェア」を重視する</li>
            <li>契約交渉よりも「顧客との協調」を重視する</li>
            <li>計画に従うことよりも「変化への対応」を重視する</li>
          </ul>
          <p>12の原則の中でも特にScrumと関連が深いものとして、短い間隔での継続的なソフトウェア提供、要件変化の歓迎、ビジネス側と開発側の日次協働、自己組織的(Scrum Guide 2020以降は「自己管理的」)なチームからこそ優れた設計が生まれるという考え方などが挙げられます。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>目的を経験主義の3本柱に立ち返って説明できるようにする。</strong>「なぜこのイベント・作成物が存在するのか」を透明性・検査・適応から説明できるようにしておく。試験ではしばしば「目的」を問う設問が出るため、手順の暗記より原理の理解を優先する。</li>
              <li><strong>5つの価値基準を具体的な行動指針として言語化する。</strong>「見積りを守れない約束はしない(Commitment)」「進捗が不透明なら自ら尋ねる(Openness)」のように具体化すると定着しやすい。</li>
              <li><strong>Scrumをアジャイルの実装フレームワークの一つと位置づける。</strong>アジャイルは価値観・原則の集合であり、Scrumはそれを実践するための具体的な枠組みである。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">Ken Schwaber & Jeff Sutherland「The Scrum Guide」(2020年11月版)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance「What is Scrum」</a></li>
              <li><a href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">Agile Alliance / Agile Manifesto「Principles behind the Agile Manifesto」</a></li>
              <li><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">「Manifesto for Agile Software Development」</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 05. Scrum Team ===================== -->
        <section id="scrum-team">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 05</div>
          <h2>Scrum Team(3つのアカウンタビリティ)</h2>

          <p>Scrum Teamは、1名のScrum Master、1名のProduct Owner、複数名のDevelopersで構成される小規模なチームです。サブチームや階層は存在せず、1つの目的(Product Goal)に集中する専門家集団として扱われます。チーム規模は一般的に10名以下が推奨され、これより大きくなる場合は、同じProduct Goal・Product Backlog・Product Ownerを共有する複数のScrum Teamへの再編が検討されます。</p>

          <p>チームは<strong>部門横断的(cross-functional)</strong>、すなわちSprintごとに価値を生み出すために必要なスキルをチーム内に備えていること、また<strong>自己管理的(self-managing)</strong>、すなわち「誰が」「いつ」「どのように」作業するかを内部で決定することが特徴です。Scrum Guide 2020年版では、従来の「self-organizing(自己組織的)」という表現よりも「self-managing(自己管理的)」という表現が明確に重視されるようになりました。</p>

          <p>Scrum Team全体が、Sprintごとに価値ある使えるIncrementを作成する責任を負いますが、その中で3つの個別のアカウンタビリティが定義されています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>アカウンタビリティ</th><th>主な責任</th></tr></thead>
              <tbody>
                <tr><td>Developers</td><td>Sprint Backlogの作成、Definition of Doneの遵守による品質の担保、Sprint Goalに向けた日々の計画調整、専門家としてのお互いへの説明責任</td></tr>
                <tr><td>Product Owner</td><td>Product Goalの策定と明確な伝達、Product Backlogアイテムの作成と伝達、Product Backlogアイテムの順序付け、Product Backlogの透明性・可視性・理解の確保</td></tr>
                <tr><td>Scrum Master</td><td>Scrum Teamの効果性への説明責任。Scrum理論と実践の理解促進、ハイバリューなIncrement創出への集中支援、障害物の除去、全イベントの開催と時間管理</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Developers</h3>
          <p>Developersは、Sprintごとに使えるIncrementのあらゆる側面を作り出すことにコミットする人々です。必要とされるスキルは職務領域によって幅広く異なりますが、常に上記4つの責任(計画作成・品質担保・日次の適応・相互の説明責任)を負います。</p>

          <h3>Product Owner</h3>
          <p>Product Ownerは、Scrum Teamの作業から生まれる製品の価値を最大化する責任を負います。実現方法は組織・チーム・個人によって大きく異なりますが、Product Backlogの実効的な管理(Product Goalの策定・伝達、アイテムの作成・順序付け・透明性確保)には常に説明責任を持ちます。作業自体を委任することはできますが、説明責任そのものは委任できません。</p>
          <p><strong>Product Ownerは委員会ではなく単独の1名です。</strong>CSM Learning Objectivesでは「Product Ownerがなぜ1名であり、グループでも委員会でもないのか、少なくとも2つの理由を議論できること」が明確に求められています。理由の一つは意思決定の迅速さと一貫性、もう一つはProduct Backlogに対する説明責任の所在を明確にするためです。Product Backlogを変更したいステークホルダーは、Product Ownerを説得することでそれを行います。</p>

          <h3>Scrum Master</h3>
          <p>Scrum Masterは、Scrum Guideで定義されるScrumを組織内に確立する責任を負います。これは「真のリーダーとして、Scrum Teamとより大きな組織の両方に奉仕する」ことによって実現されます。Scrum Masterの奉仕先は、Scrum Team自身・Product Owner・組織の3方向にわたります(詳細は第9章で扱います)。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>Product Ownerが1名でなければならない理由を自分の言葉で説明できるようにする。</strong>「意思決定の迅速性」「説明責任の所在の明確化」という2つの観点で理解しておく(CSM Learning Objective 1.5)。</li>
              <li><strong>Product Ownerの権限とバランス感覚を理解する。</strong>権限を持つが独裁者ではなく、Developersやステークホルダーと協働しながらもProduct Backlogへの最終的な権限を保持する(CSM Learning Objective 1.6)。</li>
              <li><strong>Scrum Masterを「管理者」ではなく「サーバントリーダー」として捉える。</strong>指示命令ではなく、チームが自律的に成果を出せる環境を整えることに徹する。</li>
              <li><strong>チームが10名を超えたら再編を検討する。</strong>単純に人を追加するのではなく、同じProduct Goalを共有する複数チームへの再編を検討する。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">Ken Schwaber & Jeff Sutherland「The Scrum Guide」(2020年11月版)</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「CSM Learning Objectives」(PDF)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance「What is Scrum」</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 06. Scrum Events ===================== -->
        <section id="scrum-events">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:calendar-event" />SECTION 06</div>
          <h2>Scrum Events(5つのイベント)</h2>

          <p>Sprintはすべての他のイベントを内包する「コンテナ」です。各イベントは検査と適応のための正式な機会であり、規定通りに開催しないと、検査・適応の機会が失われるとScrum Guideは明記しています。すべてのイベントは同じ時間・同じ場所で開催することで複雑さを減らすことが推奨されています。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SPRINT_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">Sprintを構成する5つのイベントの循環</div>
          </div>

          <h3>タイムボックス早見表(1ヶ月Sprintの場合の上限)</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>イベント</th><th>目的</th><th>参加者</th><th>タイムボックス上限</th></tr></thead>
              <tbody>
                <tr><td>Sprint</td><td>一貫性を生み出す1ヶ月以内の固定長イベント。他の全イベントを内包する</td><td>Scrum Team全員</td><td>1ヶ月以内</td></tr>
                <tr><td>Sprint Planning</td><td>Sprintで行う作業を計画し、Sprintを開始する</td><td>Scrum Team全員(必要に応じ助言者を招待)</td><td>8時間</td></tr>
                <tr><td>Daily Scrum</td><td>Sprint Goalへの進捗を検査し、Sprint Backlogを適応させる</td><td>Developers</td><td>15分</td></tr>
                <tr><td>Sprint Review</td><td>Sprintの成果を検査し、今後の適応を判断する</td><td>Scrum Teamと主要ステークホルダー</td><td>4時間</td></tr>
                <tr><td>Sprint Retrospective</td><td>品質と効果性を高める方法を計画する。Sprintの締めくくり</td><td>Scrum Team全員</td><td>3時間</td></tr>
              </tbody>
            </table>
          </div>
          <p>短いSprint(例:1〜2週間)の場合、各イベントのタイムボックスは通常これより短く設定されます。</p>

          <h3>Sprint</h3>
          <p>SprintはScrumの心臓部であり、アイデアを価値に変える器です。固定長で、前のSprintが終わった直後に次のSprintが始まります。Sprint中は以下のルールが適用されます。</p>
          <ul>
            <li>Sprint Goalを危険にさらすような変更は行わない</li>
            <li>品質を落とさない</li>
            <li>Product Backlogは必要に応じて詳細化(refinement)される</li>
            <li>学びが増えるにつれ、スコープはProduct Ownerと明確化・再交渉されうる</li>
          </ul>
          <p>Sprint GoalがSprintの途中で意味をなさなくなった場合、Sprintはキャンセルされることがありますが、<strong>Sprintをキャンセルする権限を持つのはProduct Ownerのみ</strong>です(CSM Learning Objective 1.14)。</p>

          <h3>Sprint Planning</h3>
          <p>Sprint PlanningはSprintを開始するイベントで、Scrum Team全員による協働作業です。以下の3つのトピックを扱います。</p>
          <ol>
            <li><strong>なぜこのSprintに価値があるのか:</strong>Product Ownerが製品価値・有用性を高める方法を提案し、チーム全体でSprint Goalを協働で定義する</li>
            <li><strong>このSprintで何ができるか:</strong>Product Ownerとの対話を通じてDevelopersがProduct Backlogから作業項目を選択する</li>
            <li><strong>選んだ作業をどのように実現するか:</strong>DevelopersがIncrementを作るために必要な作業を計画する。多くの場合、Product Backlogアイテムを1日以内の小さな作業単位に分解する。この分解の方法はDevelopersの完全な裁量に委ねられる</li>
          </ol>
          <p>Sprint Goal、選択されたProduct Backlogアイテム、それを届けるための計画を合わせたものが<strong>Sprint Backlog</strong>です。</p>

          <h3>Daily Scrum</h3>
          <p>Daily Scrumの目的は、Sprint Goalへの進捗を検査し、必要に応じてSprint Backlogを適応させることです。Developersのための15分のイベントで、複雑さを減らすため毎営業日同じ時間・同じ場所で開催されます。Product OwnerやScrum MasterがSprint Backlogの作業項目に実務として取り組んでいる場合は、Developersとして参加します。</p>
          <p>構造や手法はDevelopersが自由に選択できますが、常に「Sprint Goalへの進捗」に焦点を当て、「翌日に向けた実行可能な計画」を生み出すことが求められます。CSM Learning Objectivesでは、Daily Scrumが通常のステータス報告会と異なる点(進捗報告の場ではなく計画の適応の場であること等)を少なくとも3つ議論できることが求められています。</p>

          <h3>Sprint Review</h3>
          <p>Sprint Reviewの目的は、Sprintの成果(アウトカム)を検査し、今後の適応を判断することです。Scrum Teamは主要なステークホルダーに成果を提示し、Product Goalへの進捗を議論します。Scrum Guideは、Sprint Reviewが単なる「発表会」ではなく「作業セッション」であるべきだと明記しています。この議論を踏まえてProduct Backlogが調整されることもあります。</p>

          <h3>Sprint Retrospective</h3>
          <p>Sprint Retrospectiveの目的は、品質と効果性を高める方法を計画することです。Scrum Teamは、個人・相互作用・プロセス・ツール・Definition of Doneの観点から直近のSprintを振り返ります。何がうまくいき、何が問題となり、それがどう解決された(あるいはされなかった)かを議論し、最も効果的な改善を特定して可能な限り早く着手します(次のSprintのSprint Backlogに追加されることもあります)。</p>
          <p>CSM Learning Objectivesでは、Sprint Retrospectiveを省略した場合に起こりうる悪影響を少なくとも3つ説明できることが求められています(例:継続的改善サイクルの断絶、未解決の問題の蓄積、チームの心理的安全性やエンゲージメントの低下など)。</p>

          <h3>Product Backlog Refinement(詳細化)</h3>
          <p>Product Backlog Refinementはイベントではなく継続的な活動です。Product Backlogアイテムをより小さく正確な項目に分解し、説明・順序・サイズなどの詳細を追加していく作業を指します。Scrum Foundations Learning Objectivesでは、詳細化として行われうる活動を少なくとも3つ挙げられること、そしてチームがなぜ詳細化に時間を割くのかを少なくとも2つの理由で説明できることが求められています。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>Daily Scrumを「進捗報告会」にしない。</strong>「昨日やったこと/今日やること/障害」という定型フォーマットに固執せず、あくまで「Sprint Goal達成に向けて今日どう動くか」を主眼に置く。</li>
              <li><strong>Sprint Reviewを一方的なデモにしない。</strong>ステークホルダーからのフィードバックを引き出し、Product Backlogへの反映につなげる双方向の作業セッションとして設計する。</li>
              <li><strong>Sprint Retrospectiveを省略しない。</strong>忙しいSprintほど振り返りを飛ばしたくなるが、それが継続的改善のサイクルを止める最大の要因になる。</li>
              <li><strong>すべてのイベントを同じ曜日・時間帯に固定する。</strong>チームの認知負荷を下げ、イベント準備のオーバーヘッドを最小化する。</li>
              <li><strong>Sprintキャンセルの権限所在を周知する。</strong>SprintをキャンセルできるのはProduct Ownerのみであることを、Scrum MasterとDevelopers双方に周知しておく。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">Ken Schwaber & Jeff Sutherland「The Scrum Guide」(2020年11月版)</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「CSM Learning Objectives」(PDF)</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「Scrum Foundations Learning Objectives」(PDF)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 07. Scrum Artifacts ===================== -->
        <section id="scrum-artifacts">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" />SECTION 07</div>
          <h2>Scrum ArtifactsとCommitments</h2>

          <p>Scrumの作成物(Artifacts)は、作業や価値を表現するものであり、重要な情報の透明性を最大化するよう設計されています。各作成物には、透明性と焦点を強化するための<strong>Commitment(コミットメント)</strong>が結び付けられています。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>作成物(Artifact)</th><th>内容</th><th>対応するCommitment</th></tr></thead>
              <tbody>
                <tr><td>Product Backlog</td><td>製品を改善するために必要なものの創発的で順序付けされたリスト。Scrum Teamが取り組む作業の唯一の源泉</td><td>Product Goal(製品の将来の状態を示す長期目標)</td></tr>
                <tr><td>Sprint Backlog</td><td>Sprint Goal(なぜ)、選択されたProduct Backlogアイテム(何を)、Incrementを届けるための実行可能な計画(どのように)から成る</td><td>Sprint Goal(Sprintの単一の目的)</td></tr>
                <tr><td>Increment</td><td>Product Goalに向けた具体的な足がかり。それまでの全Incrementに追加され、徹底的に検証される</td><td>Definition of Done(Incrementが品質基準を満たした状態の正式な記述)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Product Backlogと Product Goal</h3>
          <p>Product Backlogは、Scrum Teamによって1Sprint以内に完了可能となったアイテムから、Sprint Planningでの選択対象として「準備ができた(ready)」状態になります。この透明性は通常、詳細化(refinement)活動を経て獲得されます。サイジング(見積り)の責任は、実際に作業を行うDevelopersにあります。<strong>Product Goal</strong>はProduct Backlogの中に含まれ、Scrum Teamが計画の対象とする将来の目標です。1つの目標を達成(または断念)してから次の目標に取り組むという、長期的な一点集中の考え方が特徴です。</p>

          <h3>Sprint Backlogと Sprint Goal</h3>
          <p>Sprint Backlogは、Developersによる・Developersのための計画であり、Sprint中を通じて学びに応じて更新される「高い可視性を持つリアルタイムの進捗図」です。<strong>Sprint Goal</strong>はDevelopersによるコミットメントですが、それを達成するための具体的な作業内容には柔軟性が残されています。作業が想定と異なることが分かった場合、DevelopersはSprint Goalに影響を与えない範囲でSprint Backlogのスコープについて Product Ownerと交渉します。<strong>Sprint Goalは、Sprintの途中で変更されません。</strong></p>

          <h3>Incrementと Definition of Done</h3>
          <p>Incrementは、Product Backlogアイテムが<strong>Definition of Done</strong>を満たした瞬間に生まれます。1つのSprintの中で複数のIncrementが作られることもあり、その総和がSprint Reviewで提示されますが、Sprint Reviewは価値をリリースするための「関門」と見なされるべきではなく、Sprint終了前にステークホルダーへ届けられることもあります。Definition of Doneが組織標準として存在する場合、すべてのScrum Teamは最低限それに従う必要があり、存在しない場合はScrum Teamが製品に適したDefinition of Doneを自ら作成しなければなりません。複数のScrum Teamが同一の製品に取り組む場合は、共通のDefinition of Doneに相互に準拠する必要があります。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>Definition of Doneを進化させる。</strong>一度作って終わりではなく、チームの成熟度やプロダクトの要求水準に応じて時間とともに進化させる(Scrum Foundations Learning Objective 4.8)。</li>
              <li><strong>複数チーム間でDefinition of Doneをすり合わせる。</strong>同じProduct Backlogに取り組む場合は必ずすり合わせる。怠ると統合時のトラブルを招く。</li>
              <li><strong>Sprint Backlogを「生きた計画」として扱う。</strong>「固定された契約書」ではなく、Sprint Goalさえ守られていれば日々の詳細タスクは柔軟に見直してよい。</li>
              <li><strong>Product Backlogリファインメントを軽視しない。</strong>Sprint Planningの品質は、事前にどれだけ詳細化が進んでいるかに大きく依存する。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">Ken Schwaber & Jeff Sutherland「The Scrum Guide」(2020年11月版)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance「What is Scrum」</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 08. Scrum Master Core Competencies ===================== -->
        <section id="scrum-master-competencies">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" />SECTION 08</div>
          <h2>Scrum Master Core Competencies</h2>

          <h3>ファシリテーションが求められる場面</h3>
          <p>CSM Learning Objectivesは、Scrum Master固有のコアコンピテンシーとして「ファシリテーション」と、それに関連する4つの支援スタイルの違いの理解を求めています。CSM Learning Objectiveでは、Scrum MasterがファシリテーションによってScrum Teamや組織のニーズに応える状況を少なくとも3つ説明できること、そしてグループでの意思決定を促す手法を少なくとも3つ実演できることが求められています。典型的な場面としては、意見が割れたSprint Planningでの優先順位付け、Sprint Retrospectiveでの改善アクションの合意形成、複数ステークホルダー間の利害調整などが挙げられます。</p>

          <h3>ファシリテーション・ティーチング・メンタリング・コーチングの違い</h3>
          <p>CSM Learning Objective 2.3は、これら4つの支援スタイルがどう異なるかを議論できることを求めています。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>支援スタイル</th><th>主眼</th><th>Scrum Masterの立ち位置</th></tr></thead>
              <tbody>
                <tr><td>ファシリテーション(Facilitating)</td><td>特定の話し合い・意思決定のプロセスを中立的に進行する</td><td>答えを出さず、場を設計・進行する</td></tr>
                <tr><td>ティーチング(Teaching)</td><td>知識・情報を伝達する</td><td>知っていることを教える立場</td></tr>
                <tr><td>メンタリング(Mentoring)</td><td>自身の経験に基づき助言し、成長を長期的に支援する</td><td>経験を共有するロールモデル</td></tr>
                <tr><td>コーチング(Coaching)</td><td>相手自身の中にある答えを引き出し、気づきと自己決定を促す</td><td>答えを与えず、問いによって内省を促す</td></tr>
              </tbody>
            </table>
          </div>
          <p>これら4つは互いに排他的ではなく、Scrum Masterは状況に応じて使い分ける必要があります。たとえば、チームがScrumのルールを知らない段階では「ティーチング」が有効ですが、チームが自律的に問題解決できる段階に近づくにつれて「コーチング」や「ファシリテーション」の比重を高めていくのが一般的です。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>「答えを与えたい衝動」を自覚する。</strong>特にScrum Masterが元開発者・元マネージャーである場合、つい答えを教えたくなるが、チームの自己管理性を育てるには、まずファシリテーションやコーチングで問いを投げかけることを優先する。</li>
              <li><strong>複数のファシリテーション技法を使い分ける。</strong>ドット投票、サイレントブレインストーミング、タイムボックス制の議論など、状況に応じて使い分けられるようにしておく。</li>
              <li><strong>立ち上げ期には遠慮せずティーチングの比重を上げる。</strong>Scrumのルール自体を知らないメンバーが多い段階で原則を教えないままファシリテーションだけを行うと、チームが表面的な儀式だけをなぞる「Zombie Scrum(形骸化したScrum)」に陥りやすい。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「CSM Learning Objectives」(PDF)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 09. Service to Team, PO, Organization ===================== -->
        <section id="service-to-team-po-org">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" />SECTION 09</div>
          <h2>Scrum Team・Product Owner・組織への奉仕(Service)</h2>

          <p>Scrum Guideは、Scrum Masterは「Scrum Teamとより大きな組織の両方に奉仕する真のリーダーである」と位置づけています。CSM Learning Objectivesでは、この奉仕を3方向(Scrum Team・Product Owner・組織)に分けて具体的に定義しています。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCRUM_MASTER_SERVICE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">Scrum Masterが奉仕する3つの方向</div>
          </div>

          <div class="table-wrap">
            <table>
              <thead><tr><th>奉仕の方向</th><th>主な活動内容</th></tr></thead>
              <tbody>
                <tr><td>Scrum Teamへの奉仕</td><td>自己管理と部門横断性のコーチング / ハイバリューなIncrement創出への集中支援 / 障害物の除去 / イベントの開催と時間管理</td></tr>
                <tr><td>Product Ownerへの奉仕</td><td>Product Goal定義手法の支援 / 明確なBacklogアイテム作成の支援 / 経験的なプロダクト計画の確立 / ステークホルダー協働の促進</td></tr>
                <tr><td>組織への奉仕</td><td>Scrum導入のリード・教育・コーチング / Scrum導入の計画と助言 / 経験的アプローチの理解促進 / 関係者とチームの間の障壁除去</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Scrum Teamに対するリーダーシップ</h3>
          <p>CSM Learning Objective 3.1は、Scrum MasterがScrum Teamのリーダーとして振る舞う場面を少なくとも3つ説明できることを求めています。たとえば、外部からの理不尽な納期圧力に対してチームを守る場面、チーム内の対立を健全に解消へ導く場面、Scrumの原則から逸脱しそうな決定に対して問いを投げかける場面などが該当します。</p>

          <h3>技術的負債(Technical Debt)</h3>
          <p>CSM Learning Objectivesは、技術的負債が蓄積した場合の影響を説明できること、そして高品質なIncrementを届け技術的負債を減らすための開発プラクティスを少なくとも3つ挙げられることを求めています。代表的なプラクティスには、テスト駆動開発(TDD)、継続的インテグレーション(CI)、ペアプログラミング/モブプログラミング、リファクタリングの習慣化、コードレビューなどが挙げられます。技術的負債は短期的には開発速度を上げるように見えても、放置すると将来の変更コストと不具合リスクを増大させ、結果的にSprintごとの予測可能性を損ないます。</p>

          <h3>組織的障害物への対応</h3>
          <p>CSM Learning Objectivesは、Scrum Teamに影響しうる組織的な障害物を少なくとも3つ説明でき、Scrum Masterがそれらの解消をどのように支援するかを少なくとも2つの方法で議論でき、さらに障害物解決の技法を少なくとも1つ実際に適用できることを求めています。組織的障害物の例としては、部門間のサイロ化による承認プロセスの遅延、他チームとの共有リソースの奪い合い、Scrum Team以外からの割り込みタスクの常態化などが挙げられます。</p>

          <h3>組織設計への影響</h3>
          <p>CSM Learning Objectivesは、Scrum導入によって生じる組織設計上の変化を少なくとも1つ要約できることを求めています。たとえば、機能別に分かれていた組織が部門横断的なプロダクトチーム単位に再編される、報告ラインが職能マネージャーとプロダクト側のリーダーシップに分化する、といった変化が典型例です。</p>

          <h3>なぜScrumにはプロジェクトマネージャーがいないのか</h3>
          <p>CSM Learning Objective 3.9は、「なぜScrumにはプロジェクトマネージャーが存在しないのか」を説明できることを求めています。Scrum Guideの記述に基づけば、従来プロジェクトマネージャーが担っていた責任(計画、進捗管理、障害対応、ステークホルダー調整など)は、Developers(計画と進捗の自己管理)、Product Owner(価値の最大化とスコープの意思決定)、Scrum Master(障害物の除去とプロセスの健全性維持)という3つのアカウンタビリティに分散・委譲されているためです。Scrum Teamは組織によって自らの作業を管理する権限を与えられた自己管理的な集団であり、中央集権的な単一の管理者を前提としません。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>障害物の根本原因を組織側にフィードバックする。</strong>Scrum Masterはトラブル対応の「窓口」であると同時に、同じ障害物が繰り返し発生する場合は個別対応で終わらせず、組織的な仕組みの変更を提案する。</li>
              <li><strong>技術的負債をDevelopersだけの問題にしない。</strong>Product Ownerやステークホルダーにもビジネスインパクト(将来の開発速度低下、品質リスク)として説明し、負債返済の時間を計画に組み込む合意を得る。</li>
              <li><strong>プロジェクトマネージャー不在の説明を正確に行う。</strong>「管理機能がなくなった」のではなく「管理責任が3つのアカウンタビリティに分散された」という説明を用いる。これは試験で問われやすい典型的な誤解のポイントである。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">Ken Schwaber & Jeff Sutherland「The Scrum Guide」(2020年11月版)</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance「CSM Learning Objectives」(PDF)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 10. Exam Details ===================== -->
        <section id="exam-details">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" />SECTION 10</div>
          <h2>CSM試験の詳細</h2>

          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>出題形式</td><td>4択の多肢選択式、全50問</td></tr>
                <tr><td>合格ライン</td><td>50問中37問以上正解(74%以上)</td></tr>
                <tr><td>制限時間</td><td>1時間</td></tr>
                <tr><td>受験前提条件</td><td>CSTが主催する公式CSMコースの修了が必須(コースをスキップして受験することは不可)</td></tr>
                <tr><td>受験期限</td><td>コース修了後、Welcomeメール受信から90日以内</td></tr>
                <tr><td>無料受験回数</td><td>90日以内であれば2回まで無料</td></tr>
                <tr><td>追加受験の費用</td><td>2回・90日を超えた場合、1回あたり25米ドル</td></tr>
                <tr><td>参照可否</td><td>オープンブック形式。Scrum Guideやコース資料の参照が可能</td></tr>
                <tr><td>再挑戦の可否</td><td>一度合格すると、より高いスコアを狙って再受験することはできない</td></tr>
                <tr><td>受験結果の可視性</td><td>スコアは本人のみ閲覧可能。トレーナーや他の会員には非公開</td></tr>
                <tr><td>コース費用</td><td>CSTや地域・開催形式・提供内容によって大きく異なり、Scrum Allianceは統一価格を定めていない。受講を検討しているコースの詳細ページで必ず最新の金額を確認すること(過去には2023年10月時点の公開価格で250〜2,495米ドルの幅が観測されているが、これは現在の案内ではなく歴史的な参考値)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>受験の流れ</h3>
          <p>Scrum Alliance公式ダッシュボードにログインし、初めての認定でなければライセンス同意画面で「Activate Now」を選択、ライセンス条項を確認・同意します。その後ダッシュボードで「Take CSM Exam」を選び、希望言語を確認して試験を開始すると、外部の試験プラットフォーム(mytestcom.net)にリダイレクトされ受験します。</p>

          <h3>再受験ポリシー</h3>
          <p>CSM試験は50問の多肢選択式で、合格ラインは74%です。Welcomeメール受信から90暦日以内であれば2回まで無料で受験できます。2回、または90日を超えた場合は、以降の受験ごとに25米ドルの追加費用が発生します。</p>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>オープンブック試験であることを過信しない。</strong>1時間で50問(1問あたり平均1.2分)を解く必要があるため、都度Scrum Guideを検索していては時間切れになる。参照は「確認」用と割り切り、基本知識は事前にしっかり定着させる。</li>
              <li><strong>受験環境を事前に確認する。</strong>対応ブラウザ(Safari/Firefox/Chrome/Edge)を用意し、1台のPC・1つのブラウザに固定して受験する。</li>
              <li><strong>90日という期限を意識する。</strong>コース受講直後の記憶が新しいうちに1回目の受験を計画する。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://support.scrumalliance.org/hc/en-us/articles/360002112772" target="_blank" rel="noopener">Scrum Alliance Help Center「How to take the Certified ScrumMaster® (CSM®) test」</a></li>
              <li><a href="https://support.scrumalliance.org/hc/en-us/articles/208753326" target="_blank" rel="noopener">Scrum Alliance Help Center「How to retake the Certified ScrumMaster (CSM®) test」</a></li>
              <li><a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance「Certified ScrumMaster® (CSM®)」公式ページ(FAQ)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 11. Study Best Practices ===================== -->
        <section id="study-best-practices">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" />SECTION 11</div>
          <h2>効果的な学習・試験対策のベストプラクティス</h2>

          <p>Scrum Alliance公式リソースライブラリに掲載された、認定トレーナーによる試験対策記事の要点を以下にまとめます。この記事は、CSM試験を「知識試験(body of knowledgeを幅広く問う試験)」ではなく「学習確認試験(直前に学んだ内容への注意力を問う試験)」と位置づけている点が特徴的です。PMPのような資格試験とは性質が異なり、コースを真剣に受講していれば十分に合格できる設計になっているとされています。</p>

          <h3>CSM試験に特化した対策</h3>
          <ul>
            <li>自分に合ったコース・トレーナーを事前にリサーチして選ぶ</li>
            <li>公式のCSM Learning Objectives文書を必ず見直す(非公式の模擬試験は、公式学習目標に基づいていないものも多く、有効性が保証されない)</li>
            <li>模擬試験を使う場合は、Scrum Allianceの認定トレーナーが作成したものに限定する</li>
            <li>試験はオープンブックだが、参照先はScrum Guideのオンライン版など信頼できる一次情報に絞り、解釈が割れやすい二次情報源への依存は避ける</li>
            <li>設問を検討する際は、その内容がScrum Guideに「明記されているのか」「暗示されているのか」「まったく触れられていないのか」を区別して考える</li>
            <li>試験対策のために追加費用を払う必要はない。コース受講と復習だけで十分な準備になる</li>
          </ul>

          <h3>多肢選択式試験全般に有効な一般的コツ</h3>
          <ul>
            <li>設問の最後の一文(実際に問われていること)を先に読み、要点を把握してから全文を読む</li>
            <li>選択肢を見る前に、まず自分なりの答えを考えてから選択肢を確認する</li>
            <li>すべての選択肢に目を通してから解答する(似た選択肢に惑わされないため)</li>
            <li>選択肢は下から上にも読み返し、思考の偏りを補正する</li>
            <li>迷ったら明らかに誤りとわかる選択肢から消去していく</li>
            <li>「すべて」「常に」「一切ない」「決して〜ない」といった断定的な語を含む選択肢は誤りであることが多いため注意する</li>
            <li>見直しの時間を必ず確保する</li>
            <li>難問に時間を使いすぎず、いったん保留して他の設問を先に解き、後で戻る</li>
          </ul>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>教材選びは公式Learning Objectivesとの整合性を最優先する。</strong>SNSやブログで拡散している非公式問題集を安易に使わない。</li>
              <li><strong>暗記ではなく原理原則からの導出を意識する。</strong>Scrum Guideは13ページ程度と非常に短いが、それは行間を読む力(なぜこのルールが存在するのか)が問われる設計になっているためである。</li>
              <li><strong>断定的な表現を含む選択肢は特に注意深く検証する。</strong>「すべて/常に/一切ない」などの語に注意する。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://resources.scrumalliance.org/Article/scrum-exam-study-guide" target="_blank" rel="noopener">Scrum Alliance Resource Library「Scrum Exam Study Guide」(著者:Joel Bancroft-Connors, Certified Agile Coach®)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 12. Renewal & Career Path ===================== -->
        <section id="renewal-career-path">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" />SECTION 12</div>
          <h2>認定更新(Renewal)とキャリアパス</h2>

          <p>Scrum Allianceの認定は「一度取得すれば終身有効」という設計ではなく、<strong>2年ごとの更新制</strong>です。これは、継続的な学習を証明する仕組みとして意図的に設計されています。</p>

          <h3>SEU(Scrum Education Units)とは</h3>
          <p>SEU(Scrum Education Units)は、継続学習の証明単位です。関連するScrum/アジャイル記事を読む、イベントに参加する、ボランティア活動を行うなど、学習活動1時間につき1 SEUが付与されます。SEUは購入することができず、実際の学習活動によってのみ獲得できます。</p>

          <h3>更新に必要なSEU数と更新料</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>認定レベル</th><th>対象資格の例</th><th>必要SEU数(2年間)</th><th>更新料(2年間)</th></tr></thead>
              <tbody>
                <tr><td>Professional</td><td>CSP-SM / CSP-PO / CSP-D</td><td>40</td><td>250米ドル</td></tr>
                <tr><td>Advanced</td><td>A-CSM / A-CSPO / A-CSD / CAL 2</td><td>30</td><td>175米ドル</td></tr>
                <tr><td>Foundational</td><td>CSM / CSPO / CSD / CASP / CAF / CAL 1</td><td>20</td><td>100米ドル</td></tr>
              </tbody>
            </table>
          </div>
          <p>更新は「SEU」と「更新料」の両方が必須であり、どちらか一方だけで更新することはできません。マイクロクレデンシャルは更新不要(無期限)です。</p>

          <h3>更新の3ステップ</h3>
          <ol>
            <li><strong>SEUを獲得する:</strong>イベント参加、ウェビナー視聴、読書、ボランティアなどの継続学習を通じてSEUを積み上げる</li>
            <li><strong>SEUを記録する:</strong>scrumalliance.orgのプロフィールから、認定の有効期限までの2年半の間に得たSEUを登録する(公式リソースライブラリでの学習は自動記録される)</li>
            <li><strong>更新料を支払う:</strong>認定レベルに応じた更新料を納付する</li>
          </ol>
          <p>認定期限が切れた後でも更新は可能で、更新した日から新たに2年間有効になります。ただし失効後、会員特典にアクセスできる猶予期間は90日間です。また、複数の認定を保有している場合、最上位の認定をSEUと更新料で更新すれば、他の認定は半分のSEU(かつ費用なし)で自動的に更新される仕組みや、新たに別の認定コースを受講することで保有する他の認定すべてが自動更新される仕組みもあります。</p>

          <h3>CSMの先にあるキャリアパス</h3>
          <p>Scrum Alliance公式サイトでは、CSM取得後のステップアップとして以下が案内されています。</p>
          <ul>
            <li><strong>Advanced Certified ScrumMaster®(A-CSM®):</strong>より実務経験を積んだScrum Master向けの上級資格</li>
            <li><strong>Certified Scrum Professional® - ScrumMaster(CSP®-SM):</strong>Scrum Masterとしての高度な習熟度と経験を証明する資格。トレーナーやアジャイルコーチを志す人にも適している</li>
          </ul>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>SEUは日常的に積み上げる。</strong>更新期限の直前にまとめて稼ごうとせず、記事購読、社内勉強会、コミュニティイベント参加を通じて継続的に積み上げる。</li>
              <li><strong>複数認定の更新タイミングをまとめる。</strong>最上位認定を更新すると他が自動更新される、または半分のSEUで済むため、手続きコストを削減できる。</li>
              <li><strong>CSM取得をゴールにしない。</strong>A-CSMやCSP-SMといった次のステップを見据えたキャリアプランを早期に描いておく。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">Scrum Alliance「Certification Renewal for Scrum Alliance CSM, CSPO, & CSD」</a></li>
              <li><a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance「Certified ScrumMaster® (CSM®)」公式ページ</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 13. Glossary ===================== -->
        <section id="glossary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" />SECTION 13</div>
          <h2>用語対照表(英日対訳)</h2>

          <div class="glossary-grid">
            <div class="glossary-item"><div class="g-term">Scrum Team</div><div class="g-def">スクラムチーム — Scrum Master・Product Owner・Developersで構成される小規模チーム</div></div>
            <div class="glossary-item"><div class="g-term">Developers</div><div class="g-def">デベロッパーズ — Incrementを作成する人々。職種名ではなくアカウンタビリティ名</div></div>
            <div class="glossary-item"><div class="g-term">Product Owner</div><div class="g-def">プロダクトオーナー — 製品価値の最大化とProduct Backlog管理に説明責任を持つ単独の1名</div></div>
            <div class="glossary-item"><div class="g-term">Scrum Master</div><div class="g-def">スクラムマスター — Scrumの確立とチームの効果性に説明責任を持つサーバントリーダー</div></div>
            <div class="glossary-item"><div class="g-term">Sprint</div><div class="g-def">スプリント — 1ヶ月以内の固定長の反復期間。全イベントを内包するコンテナ</div></div>
            <div class="glossary-item"><div class="g-term">Sprint Planning</div><div class="g-def">スプリントプランニング — Sprintを開始する計画イベント</div></div>
            <div class="glossary-item"><div class="g-term">Daily Scrum</div><div class="g-def">デイリースクラム — Developersが毎日行う15分の進捗検査イベント</div></div>
            <div class="glossary-item"><div class="g-term">Sprint Review</div><div class="g-def">スプリントレビュー — Sprintの成果をステークホルダーと検査するイベント</div></div>
            <div class="glossary-item"><div class="g-term">Sprint Retrospective</div><div class="g-def">スプリントレトロスペクティブ — Sprintを締めくくる振り返りイベント</div></div>
            <div class="glossary-item"><div class="g-term">Product Backlog</div><div class="g-def">プロダクトバックログ — 製品改善に必要な作業の創発的で順序付けされたリスト</div></div>
            <div class="glossary-item"><div class="g-term">Sprint Backlog</div><div class="g-def">スプリントバックログ — Sprint Goal・選択アイテム・実行計画から成る作成物</div></div>
            <div class="glossary-item"><div class="g-term">Increment</div><div class="g-def">インクリメント — Definition of Doneを満たした、使用可能な成果物の単位</div></div>
            <div class="glossary-item"><div class="g-term">Product Goal</div><div class="g-def">プロダクトゴール — Product Backlogに対するコミットメント。製品の長期目標</div></div>
            <div class="glossary-item"><div class="g-term">Sprint Goal</div><div class="g-def">スプリントゴール — Sprint Backlogに対するコミットメント。Sprintの単一目的</div></div>
            <div class="glossary-item"><div class="g-term">Definition of Done</div><div class="g-def">完成の定義 — Incrementに対するコミットメント。品質基準の正式な記述</div></div>
            <div class="glossary-item"><div class="g-term">Empiricism</div><div class="g-def">経験主義 — 知識は経験から得られるという、Scrumの理論的基盤</div></div>
            <div class="glossary-item"><div class="g-term">Transparency / Inspection / Adaptation</div><div class="g-def">透明性 / 検査 / 適応 — 経験主義の3本柱</div></div>
            <div class="glossary-item"><div class="g-term">Self-managing</div><div class="g-def">自己管理的 — チームが「誰が」「何を」「どのように」行うかを内部で決定する性質</div></div>
            <div class="glossary-item"><div class="g-term">Cross-functional</div><div class="g-def">部門横断的 — チーム内に必要なスキルがすべて備わっている性質</div></div>
            <div class="glossary-item"><div class="g-term">Technical Debt</div><div class="g-def">技術的負債 — 品質を犠牲にした結果、将来の開発コストとして蓄積する負債</div></div>
            <div class="glossary-item"><div class="g-term">SEU(Scrum Education Units)</div><div class="g-def">スクラム教育単位 — 認定更新に必要な継続学習の証明単位</div></div>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">Ken Schwaber & Jeff Sutherland「The Scrum Guide」(2020年11月版)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance「What is Scrum」</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 14. Summary ===================== -->
        <section id="summary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 14</div>
          <h2>まとめ</h2>

          <p>CSM資格は、単なる知識試験ではなく「Scrumというフレームワークを正しく理解し、チームと組織のアジリティ向上に活かせるか」を問う導入資格です。学習の中心は以下の3層構造で整理できます。</p>
          <ol>
            <li><strong>土台(Scrum Foundations):</strong>Empiricismと3本柱、5つの価値基準、3つのアカウンタビリティ、5つのイベント、3つの作成物とCommitment</li>
            <li><strong>CSM固有のコア領域:</strong>ファシリテーション・ティーチング・メンタリング・コーチングの使い分け</li>
            <li><strong>実務への応用(Service):</strong>リーダーシップ、技術的負債、組織的障害物への対応、組織設計への影響、プロジェクトマネージャー不在の理由</li>
          </ol>
          <p>これらはすべて、公式のLearning ObjectivesとScrum Guideという一次情報源から体系的に導かれています。試験対策としては、非公式教材への依存を避け、公式文書に立ち返って「なぜそのルールが存在するのか」を理解することが、最も確実な近道です。</p>
        </section>

        <!-- ===================== 15. References ===================== -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 15</div>
          <h2>参考文献・ソース一覧</h2>

          <p>本ガイドの内容は、以下の一次情報源(すべてScrum Alliance公式サイトおよびScrum Guide公式サイト)に基づいています。</p>

          <div class="ref-group">
            <h3>Scrum Alliance公式</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Scrum Alliance「Certified ScrumMaster® (CSM®)」公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster</a></li>
              <li><span class="ref-name">Scrum Alliance「CSM Learning Objectives」(2022年1月版, PDF)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf</a></li>
              <li><span class="ref-name">Scrum Alliance「Scrum Foundations Learning Objectives」(2022年1月版, PDF)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf</a></li>
              <li><span class="ref-name">Scrum Alliance「What is Scrum」(Scrumの概要・価値基準・イベント・作成物の解説)</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum</a></li>
              <li><span class="ref-name">Scrum Alliance Help Center「How to take the Certified ScrumMaster® (CSM®) test」</span><a class="ref-url" href="https://support.scrumalliance.org/hc/en-us/articles/360002112772" target="_blank" rel="noopener">https://support.scrumalliance.org/hc/en-us/articles/360002112772</a></li>
              <li><span class="ref-name">Scrum Alliance Help Center「How to retake the Certified ScrumMaster (CSM®) test」</span><a class="ref-url" href="https://support.scrumalliance.org/hc/en-us/articles/208753326" target="_blank" rel="noopener">https://support.scrumalliance.org/hc/en-us/articles/208753326</a></li>
              <li><span class="ref-name">Scrum Alliance Help Center「How to prepare for the Certified ScrumMaster® (CSM®) test」</span><a class="ref-url" href="https://support.scrumalliance.org/hc/en-us/articles/7372447688731" target="_blank" rel="noopener">https://support.scrumalliance.org/hc/en-us/articles/7372447688731</a></li>
              <li><span class="ref-name">Scrum Alliance「Certification Renewal for Scrum Alliance CSM, CSPO, & CSD」</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/renewing-certifications</a></li>
              <li><span class="ref-name">Scrum Alliance Resource Library「Scrum Exam Study Guide」(著者:Joel Bancroft-Connors, Certified Agile Coach®)</span><a class="ref-url" href="https://resources.scrumalliance.org/Article/scrum-exam-study-guide" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/scrum-exam-study-guide</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>Scrum Guide公式 / アジャイル宣言</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Ken Schwaber & Jeff Sutherland「The Scrum Guide: The Definitive Guide to Scrum: The Rules of the Game」(2020年11月版, PDF)</span><a class="ref-url" href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf</a></li>
              <li><span class="ref-name">Agile Alliance「12 Principles Behind the Agile Manifesto」</span><a class="ref-url" href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/principles.html</a></li>
              <li><span class="ref-name">「Manifesto for Agile Software Development」</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
            </ul>
          </div>

          <p>本ガイドは執筆時点(2026年8月)で確認できた公式情報に基づいています。試験形式・料金・更新要件等はScrum Allianceにより変更される可能性があるため、受験前には必ず上記の公式ページで最新情報をご確認ください。</p>
        </section>

        <footer>
          Certified ScrumMaster®、CSM®、Scrum Alliance®は、Scrum Alliance, Inc.の登録商標です。本ガイドはScrum Alliance公式の教材ではない、独自に作成した学習支援用の非公式資料です。最新の受験要件は必ず<a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>でご確認ください。
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  --sidebar-width: 288px;
  background: var(--color-paper);
  color: var(--color-ink);
  min-height: 100vh;
}

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
  text-decoration: none;
}

.sidebar-nav a :deep(svg),
.sidebar-nav a :deep(.iconify) {
  font-size: 17px;
  color: var(--color-ink-faint);
  flex: none;
}

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

.sidebar-nav a.active :deep(svg),
.sidebar-nav a.active :deep(.iconify) {
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
  grid-template-columns: repeat(4, minmax(140px, 1fr));
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
  color: var(--color-ink-faint);
  margin-top: 6px;
  line-height: 1.35;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--color-paper-sunken);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 14px 18px;
  margin-top: 24px;
  font-size: 16px;
  color: var(--color-ink-soft);
  line-height: 1.6;
}

.disclaimer-box :deep(svg),
.disclaimer-box :deep(.iconify) {
  font-size: 18px;
  color: var(--color-gold);
  flex: none;
  margin-top: 2px;
}

/* ===================== Sections ===================== */
section {
  padding-top: 48px;
  border-top: 1px solid var(--color-border);
  margin-top: 56px;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-indigo);
  margin-bottom: 10px;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 30px;
  line-height: 1.35;
  margin: 0 0 20px;
  color: var(--color-ink);
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  line-height: 1.4;
  margin: 32px 0 12px;
  color: var(--color-ink);
}

p {
  margin: 0 0 16px;
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
}

li {
  margin: 6px 0;
}

/* ===================== Tables ===================== */
.table-wrap {
  overflow-x: auto;
  margin: 24px 0;
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
}

th {
  background: var(--color-paper-sunken);
  font-weight: 600;
  color: var(--color-ink);
  font-size: 16px;
}

tr:last-child td { border-bottom: none; }

/* ===================== Callouts ===================== */
.callout {
  border-left: 4px solid;
  border-radius: 0 8px 8px 0;
  padding: 18px 22px;
  margin: 28px 0;
  background: var(--color-paper-raised);
  border-top: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
}

.callout.practice {
  border-left-color: var(--color-gold);
  background: var(--color-gold-tint);
}
.callout.practice .callout-title { color: var(--color-gold); }

.callout.source {
  border-left-color: var(--color-indigo);
  background: var(--color-indigo-tint);
}
.callout.source .callout-title { color: var(--color-indigo); }

.callout.note {
  border-left-color: var(--color-forest);
  background: var(--color-forest-tint);
}
.callout.note .callout-title { color: var(--color-forest); }

.callout ul, .callout ol { margin: 0; padding-left: 20px; }
.callout li { margin: 6px 0; }
.callout p { margin: 0 0 8px; }
.callout p:last-child { margin-bottom: 0; }

/* ===================== Diagram Card ===================== */
.diagram-card {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-paper-raised);
  padding: 24px;
  margin: 28px 0;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 14px;
}

.diagram-loading {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  padding: 40px 0;
}

/* ===================== Glossary ===================== */
.glossary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 14px;
  margin: 24px 0;
}

.glossary-item {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 8px;
  padding: 14px 18px;
}

.glossary-item .g-term {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 16px;
  color: var(--color-indigo);
  margin-bottom: 4px;
}

.glossary-item .g-def {
  color: var(--color-ink-soft);
  font-size: 16px;
}

/* ===================== References ===================== */
.ref-group { margin-bottom: 28px; }
.ref-group :is(h3, h4) { margin-top: 0; }
.ref-list { list-style: none; margin: 0; padding: 0; }
.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 16px;
}
.ref-list li:last-child { border-bottom: none; }
.ref-list .ref-name { color: var(--color-ink); font-weight: 500; display: block; margin-bottom: 2px; }
.ref-list .ref-url { font-family: var(--font-mono); font-size: 16px; word-break: break-all; }

/* ===================== Footer ===================== */
footer {
  margin-top: 80px;
  padding-top: 28px;
  border-top: 1px solid var(--color-border);
  font-size: 16px;
  color: var(--color-ink-faint);
  line-height: 1.6;
}

/* ===================== Responsive ===================== */
@media (max-width: 1080px) {
  .main-content { padding: 40px 36px 80px; }
  .stat-row { grid-template-columns: repeat(2, 1fr); }
  .glossary-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .sidebar-toggle { display: flex; }

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
  }

  .main-content {
    margin-left: 0;
    padding: 32px 20px 64px;
  }

  .hero h1 { font-size: 30px; }
  .stat-row { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar { transition: none; }
}
</style>
