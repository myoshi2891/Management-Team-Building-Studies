<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "what-is-capm", "roadmap", "eligibility", "exam-format", "eco-overview",
  "domain1", "domain2", "domain3", "domain4", "glossary", "exam-day",
  "ccr", "study-plan", "summary", "references",
];

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);
const activeId = useActiveHeading(TOC_IDS);

function closeSidebar(): void {
  sidebarOpen.value = false;
  nextTick(() => sidebarToggle.value?.focus());
}

const MERMAID_THEME_VARIABLES = {
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
  pieTitleTextColor: "#161B26",
};

const DIAGRAM_ROADMAP5 = `flowchart TB
A["ステップ1 受験資格の確認と学習準備"] --> B["ステップ2 申請書の作成と提出"]
B --> C["ステップ3 受験料の支払いと試験予約"]
C --> D["ステップ4 試験対策の学習"]
D --> E["ステップ5 試験本番"]

classDef step fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,D,E step;`;

const DIAGRAM_QUESTION_TYPES = `flowchart LR
Q["CAPM試験の出題形式"] --> Q1["多肢選択式"]
Q --> Q2["ドラッグアンドドロップ"]
Q --> Q3["ホットスポット"]
Q --> Q4["アニメーション動画"]
Q --> Q5["コミックストリップ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Q hub;
class Q1,Q2,Q3,Q4,Q5 box;`;

const DIAGRAM_DOMAIN_PIE = `pie showData
title CAPM試験 ドメイン別出題比率
"ドメイン1 PM基礎と主要概念" : 36
"ドメイン2 予測型計画重視の手法" : 17
"ドメイン3 アジャイルフレームワーク手法" : 20
"ドメイン4 ビジネス分析フレームワーク" : 27`;

const DIAGRAM_HIERARCHY = `flowchart TB
PF["ポートフォリオ 組織戦略に沿って管理される集合"] --> PG["プログラム 関連する複数プロジェクトの調整管理"]
PF --> PJ3["単独プロジェクトC"]
PG --> PJ1["プロジェクトA"]
PG --> PJ2["プロジェクトB"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PF,PG,PJ1,PJ2,PJ3 box;`;

const DIAGRAM_WBS = `flowchart TB
S["プロジェクトスコープ"] --> D1["デリバラブル1"]
S --> D2["デリバラブル2"]
D1 --> W1["ワークパッケージ1-1"]
D1 --> W2["ワークパッケージ1-2"]
D2 --> W3["ワークパッケージ2-1"]
D2 --> W4["ワークパッケージ2-2"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class S,D1,D2,W1,W2,W3,W4 box;`;

const DIAGRAM_SCRUM_CYCLE = `flowchart LR
PB["プロダクトバックログ"] --> SP["スプリントプランニング"]
SP --> SB["スプリントバックログ"]
SB --> DS["デイリースクラム"]
DS --> INC["インクリメント"]
INC --> SR["スプリントレビュー"]
SR --> RETRO["スプリントレトロスペクティブ"]
RETRO --> SP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PB,SP,SB,DS,INC,SR,RETRO box;`;

const DIAGRAM_KANBAN_FLOW = `flowchart LR
BL["バックログ"] --> TODO["To Do WIP制限あり"]
TODO --> DOING["進行中 WIP制限あり"]
DOING --> REVIEW["レビュー WIP制限あり"]
REVIEW --> DONE["完了"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class BL,TODO,DOING,REVIEW box;
class DONE done;`;

const DIAGRAM_BA_PROCESS = `flowchart LR
E["要求の引き出し"] --> A["分析"]
A --> DOC["文書化"]
DOC --> V["妥当性確認"]
V --> M["管理とトレーサビリティ"]
M -.->|"継続的なフィードバック"| E

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class E,A,DOC,V,M box;`;

const DIAGRAM_STUDY_PLAN6WEEK = `flowchart TB
W1["Week1 ドメイン1 PM基礎と主要概念"] --> W2["Week2 ドメイン1後半とドメイン2前半"]
W2 --> W3["Week3 ドメイン2 WBSとCPM"]
W3 --> W4["Week4 ドメイン3 アジャイル手法比較"]
W4 --> W5["Week5 ドメイン4 ビジネス分析"]
W5 --> W6["Week6 総復習と模擬試験"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class W1,W2,W3,W4,W5,W6 box;`;

useSeoMeta({
  title: "CAPM® 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description: "PMI公式サイトと公式Exam Content Outlineに基づくCAPM認定資格の初学者向け完全ガイド。",
});
</script>

<template>
  <div class="page-shell">


<button ref="sidebarToggle" type="button" class="sidebar-toggle" aria-label="目次を開閉する" aria-controls="sidebar" :aria-expanded="sidebarOpen" @click="sidebarOpen = !sidebarOpen"><Icon class="ti" name="tabler:menu-2" /></button>

<div class="layout">

  <!-- ===================== Sidebar ===================== -->
  <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
    <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">CAPM® 完全ガイド</div>
        <div class="brand-subtitle">初学者向けステップバイステップ解説</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">はじめに</li>
      <li><a href="#what-is-capm" :class="{ active: activeId === 'what-is-capm' }" @click="closeSidebar"><Icon class="ti" name="tabler:certificate" />CAPMとは何か</a></li>
      <li><a href="#roadmap" :class="{ active: activeId === 'roadmap' }" @click="closeSidebar"><Icon class="ti" name="tabler:route" />取得ロードマップ</a></li>
      <li><a href="#eligibility" :class="{ active: activeId === 'eligibility' }" @click="closeSidebar"><Icon class="ti" name="tabler:clipboard-check" />受験資格</a></li>
      <li><a href="#exam-format" :class="{ active: activeId === 'exam-format' }" @click="closeSidebar"><Icon class="ti" name="tabler:list-check" />試験の概要</a></li>
      <li><a href="#eco-overview" :class="{ active: activeId === 'eco-overview' }" @click="closeSidebar"><Icon class="ti" name="tabler:chart-pie" />出題領域と比率</a></li>

      <li class="nav-group-label">4つのドメイン</li>
      <li><a href="#domain1" :class="{ active: activeId === 'domain1' }" @click="closeSidebar"><Icon class="ti" name="tabler:building-bank" />ドメイン1: PM基礎</a></li>
      <li><a href="#domain2" :class="{ active: activeId === 'domain2' }" @click="closeSidebar"><Icon class="ti" name="tabler:timeline" />ドメイン2: 予測型手法</a></li>
      <li><a href="#domain3" :class="{ active: activeId === 'domain3' }" @click="closeSidebar"><Icon class="ti" name="tabler:git-branch" />ドメイン3: アジャイル手法</a></li>
      <li><a href="#domain4" :class="{ active: activeId === 'domain4' }" @click="closeSidebar"><Icon class="ti" name="tabler:clipboard-text" />ドメイン4: ビジネス分析</a></li>

      <li class="nav-group-label">試験対策</li>
      <li><a href="#glossary" :class="{ active: activeId === 'glossary' }" @click="closeSidebar"><Icon class="ti" name="tabler:book-2" />用語集</a></li>
      <li><a href="#exam-day" :class="{ active: activeId === 'exam-day' }" @click="closeSidebar"><Icon class="ti" name="tabler:calendar-event" />試験当日の心得</a></li>
      <li><a href="#ccr" :class="{ active: activeId === 'ccr' }" @click="closeSidebar"><Icon class="ti" name="tabler:refresh" />資格維持</a></li>
      <li><a href="#study-plan" :class="{ active: activeId === 'study-plan' }" @click="closeSidebar"><Icon class="ti" name="tabler:map-2" />学習プラン例</a></li>

      <li class="nav-group-label">まとめ</li>
      <li><a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar"><Icon class="ti" name="tabler:flag-3" />まとめ</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon class="ti" name="tabler:link" />参考文献・出典</a></li>
    </ul>
  </nav>

  <!-- ===================== Main content ===================== -->
  <main class="main-content">

    <div class="hero">
      <div class="hero-eyebrow"><Icon class="ti" name="tabler:award" />PMI公式ECOに基づく学習ガイド</div>
      <h1>CAPM® 認定資格 完全ガイド</h1>
      <p class="hero-lede">
        Certified Associate in Project Management(CAPM)® の出題範囲を、PMI公式サイトおよび公式 Exam Content Outline(ECO)に基づき、初学者向けにステップバイステップで解説します。各ドメインの詳細説明とベストプラクティス、根拠となる一次情報源のURLを合わせて掲載しています。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">150問</div><div class="stat-label">うち135問が採点対象</div></div>
        <div class="stat-card"><div class="stat-number">180分</div><div class="stat-label">10分間の休憩あり</div></div>
        <div class="stat-card"><div class="stat-number">4領域</div><div class="stat-label">ドメイン構成</div></div>
        <div class="stat-card"><div class="stat-number">経験不問</div><div class="stat-label">実務経験は不要</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon class="ti" name="tabler:info-circle" />
        本ガイドは教育・学習支援を目的とした非公式の解説資料です。試験制度・料金・出題比率は変更される可能性があるため、受験前に必ず<a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI公式サイト</a>で最新情報をご確認ください。CAPM®、PMI®、PMBOK®はProject Management Institute, Inc.の登録商標です。
      </div>
    </div>

    <!-- ===================== 1. What is CAPM ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:certificate" />SECTION 01</div>
      <h2 id="what-is-capm">CAPMとは何か</h2>

      <p>
        <strong>CAPM®(Certified Associate in Project Management)</strong>は、米国PMI(Project Management Institute)が提供する、プロジェクトマネジメントの入門・実務経験不問の国際資格です。実務経験がなくても取得でき、「これからプロジェクトマネジメントのキャリアを始めたい人」「プロジェクトチームの一員として基礎知識を証明したい人」を主な対象としています。
      </p>
      <p>
        PMI公式サイトでは、CAPMは経験不問(No experience required)の資格であり、予測型(ウォーターフォール型)のプロジェクトマネジメント、アジャイルの原則、ビジネス分析という3つの働き方(ways of working)にまたがる基礎知識と実務対応力を証明するものと説明されています。
      </p>

      <h3 id="subheading-1">CAPM取得で目指せるキャリアパス</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>キャリアパス</th><th>役割の概要</th></tr></thead>
          <tbody>
            <tr><td><strong>Assistant Project Manager</strong>(プロジェクトマネージャー補佐)</td><td>PMを補佐し、進捗管理やドキュメント整備を担当</td></tr>
            <tr><td><strong>Project Administrator</strong>(プロジェクト事務担当)</td><td>スケジュール・予算・議事録などプロジェクト運営の実務を担当</td></tr>
            <tr><td><strong>Project Analyst</strong>(プロジェクトアナリスト)</td><td>データ分析やレポーティングを通じてプロジェクトを支援</td></tr>
            <tr><td><strong>Project Coordinator</strong>(プロジェクトコーディネーター)</td><td>複数チーム間の調整・情報連携を担当</td></tr>
            <tr><td><strong>Project Manager</strong>(プロジェクトマネージャー)</td><td>プロジェクト全体の計画・実行・統制を担当</td></tr>
            <tr><td><strong>PMI Technical Project Manager</strong>(テクニカルPM)</td><td>技術領域に特化したプロジェクトマネジメントを担当</td></tr>
          </tbody>
        </table>
      </div>

      <h3 id="subheading-2">CAPMとPMBOK® Guideの関係</h3>
      <p>
        CAPMの出題内容は、PMIが実施したグローバル職務分析(Global Practice Analysis, GPA)とジョブタスク分析(Job Task Analysis, JTA)に基づいて設計されています。ECOはPMBOK® Guide 第7版の内容と重なる部分がありますが、完全に一致するものではありません。ECO策定に関わったタスクフォースはPMBOK® Guideに縛られず、エントリーレベル・アソシエイトレベルの実務者が実際に行う職務を基準にタスクを定義しています。
      </p>
      <p>
        出題の根拠として、PMIは最低でも以下の複数の参考文献に基づいて問題を作成・レビューしていると明記しています。
      </p>
      <ul>
        <li><em>A Guide to the Project Management Body of Knowledge(PMBOK® Guide)</em> 第7版</li>
        <li><em>Process Groups: A Practice Guide</em>(2022)</li>
        <li><em>The PMI Guide to Business Analysis</em>(2017)</li>
        <li><em>Business Analysis for Practitioners: A Practice Guide</em> 第2版(2024)</li>
        <li><em>Agile Practice Guide</em>(2017)</li>
        <li><em>The Project Management Answer Book</em> 第2版</li>
        <li><em>Effective Project Management: Traditional, Agile, Extreme, Hybrid</em> 第8版</li>
      </ul>
      <p>これらすべてを読むことは必須ではありませんが、PMIは学習の参考として一読を推奨しています。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI - CAPM Certification</a></li>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">PMI - CAPM Exam Content Outline(PDF)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 2. Roadmap ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:route" />SECTION 02</div>
      <h2 id="roadmap">認定資格取得までのロードマップ(5ステップ)</h2>
      <p>PMI公式サイトは、CAPM取得までのプロセスを5つのステップで示しています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ROADMAP5" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">CAPM取得までの5ステップ</div>
      </div>

      <ol class="step-list">
        <li>
          <div class="step-num" data-testid="step-tag">1</div>
          <div class="step-body">
            <div class="step-title">受験資格の確認と学習準備</div>
            <div class="step-desc">高校卒業相当の学歴と、23時間以上のプロジェクトマネジメント教育の受講が必要です(詳細は第3章)。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">2</div>
          <div class="step-body">
            <div class="step-title">申請書の作成と提出</div>
            <div class="step-desc">PMI.orgのユーザーアカウントを作成し、学歴とプロジェクトマネジメント教育(23時間分)の情報をオンライン申請フォームに入力します。申請はセーブ・アズ・ユー・ゴー方式のため、途中で中断して後から再開することが可能です。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">3</div>
          <div class="step-body">
            <div class="step-title">受験料の支払いと試験予約</div>
            <div class="step-desc">申請が承認されたら受験料を支払い、Pearson VUEのテストセンター(推奨)またはオンライン監督試験(オンラインプロクタリング)で試験日を予約します。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">4</div>
          <div class="step-body">
            <div class="step-title">試験対策の学習</div>
            <div class="step-desc">PMIのオンデマンド講座、インストラクター主導コース、模擬試験など、複数の教材で試験範囲全体を学習します。</div>
          </div>
        </li>
        <li>
          <div class="step-num" data-testid="step-tag">5</div>
          <div class="step-body">
            <div class="step-title">試験本番</div>
            <div class="step-desc">150問・180分(休憩含まず)の試験を受験します。詳細は第4章で解説します。</div>
          </div>
        </li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li>申請作業は「セーブ・アズ・ユー・ゴー」なので、教育履歴の証跡(受講証明書、修了証など)を事前にまとめておくと申請がスムーズです。</li>
          <li>PMIの監査(オーディット)プロセスに選ばれる場合があるため、23時間分の教育内容を記録した書類は保管しておくことが推奨されます。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul><li><a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI - CAPM Certification</a></li></ul>
      </div>
    </section>

    <!-- ===================== 3. Eligibility ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:clipboard-check" />SECTION 03</div>
      <h2 id="eligibility">受験資格(Eligibility Requirements)</h2>
      <p>CAPMの受験資格は非常にシンプルで、実務経験は不要です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>要件区分</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>学歴要件</td><td>高校卒業相当の学歴(高校卒業証書、GED、またはこれと同等のもの)</td></tr>
            <tr><td>プロジェクトマネジメント教育要件</td><td>受験前に23時間以上のプロジェクトマネジメント教育を修了していること</td></tr>
          </tbody>
        </table>
      </div>

      <h3 id="subheading-3">23時間の教育要件を満たす方法</h3>
      <p>以下のいずれかの教育提供者による研修・コースで満たすことができます。</p>
      <ul>
        <li>PMI認定トレーニングパートナー(Authorized Training Partners, ATP)</li>
        <li>PMIチャプター(ただし通常のチャプター会議自体は対象外。会議中に1時間以上の学習アクティビティが行われた場合のみ、その時間はカウント可)</li>
        <li>雇用主・企業が提供する研修プログラム</li>
        <li>研修会社・コンサルタントによるトレーニング</li>
        <li>通信教育(コース修了時の評価を含むもの)</li>
        <li>大学・カレッジの学部課程および継続教育プログラム</li>
      </ul>
      <p>学習内容には、プロジェクトの品質・スコープ・タイム・コスト・リソース・コミュニケーション・リスク・調達・統合マネジメント、アジャイル、ビジネス分析などが含まれます。</p>

      <p>PMIは以下のオンデマンド講座・インストラクター主導講座を教育要件充足の選択肢として案内しています。</p>
      <ul>
        <li><a href="https://www.pmi.org/dcpdp/sku/el068" target="_blank" rel="noopener">PMI on-demand CAPM Exam Prep Course</a></li>
        <li><a href="https://www.pmi.org/learning/authorized-training-partners" target="_blank" rel="noopener">Instructor-Led CAPM® course(Authorized Training Partners経由)</a></li>
      </ul>

      <h3 id="subheading-4">申請処理</h3>
      <p>申請は通常24時間以内に処理されます。ただしPMIの監査プロセスに選ばれた場合はこの限りではありません。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li>23時間分の教育は「受験時までに完了していればよい」ため、複数の短い研修を積み重ねて要件を満たすことも可能です。</li>
          <li>教育内容の記録は、いつ受講したかに関わらずすべて記録する必要があります。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul><li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.11)</a></li></ul>
      </div>
    </section>

    <!-- ===================== 4. Exam Format ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:list-check" />SECTION 04</div>
      <h2 id="exam-format">試験の概要(フォーマット・出題形式)</h2>

      <h3 id="subheading-5">試験の基本情報</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>問題数</td><td>150問(うち135問が採点対象、15問は無得点のプレテスト問題)</td></tr>
            <tr><td>試験時間</td><td>180分(3時間)</td></tr>
            <tr><td>休憩</td><td>75問終了後・全回答レビュー後に10分間の休憩あり(休憩開始後は前セクションの問題に戻れない)</td></tr>
            <tr><td>チュートリアル・アンケート</td><td>試験前後に任意(5〜15分、試験時間には含まれない)</td></tr>
            <tr><td>出題言語</td><td>英語、アラビア語、ブラジルポルトガル語、フランス語、ドイツ語、イタリア語、日本語、スペイン語、韓国語、簡体字中国語、繁体字中国語</td></tr>
            <tr><td>受験形式</td><td>Pearson VUEテストセンター(推奨)またはオンライン監督試験(OPT)</td></tr>
          </tbody>
        </table>
      </div>
      <p>プレテスト問題は採点対象外ですが、どの問題がプレテストかは受験者にはわからないため、全問に全力で取り組む必要があります。プレテスト問題は将来の試験問題の妥当性を検証する目的で無作為に配置されます。</p>

      <h3 id="subheading-6">出題形式(5種類)</h3>
      <p>CAPM試験は多肢選択式だけでなく、複数の出題形式で構成されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_QUESTION_TYPES" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">CAPM試験の5つの出題形式</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>出題形式</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td><strong>多肢選択式</strong>(Multiple Choice)</td><td>一般的な4択形式の問題</td></tr>
            <tr><td><strong>ドラッグアンドドロップ</strong>(Enhanced Matching)</td><td>左列と右列の2つのボックス群を、シナリオに基づいてマッチングさせる(アラビア語受験者は左右逆)</td></tr>
            <tr><td><strong>ホットスポット/ホットエリア</strong>(Point and Click)</td><td>提示された画像とシナリオに基づき、画像上の特定の領域をクリックして解答する</td></tr>
            <tr><td><strong>アニメーション動画</strong></td><td>音声・字幕付きの短い動画を視聴し、内容に基づく多肢選択問題に解答する(テストセンターではヘッドフォンが貸与される)</td></tr>
            <tr><td><strong>コミックストリップ</strong></td><td>シナリオが漫画形式で提示され、それに基づく多肢選択問題に解答する(オンライン監督試験ではコミックストリップ形式のみが出題される)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li>ドラッグアンドドロップやホットスポットは操作に慣れていないと時間を消費しやすいため、模擬試験で事前に操作感覚をつかんでおくことが有効です。</li>
          <li>オンライン受験を選ぶ場合、アニメーション動画形式は出題されないため、テストセンター受験とは体感的な出題構成がやや異なる点に留意してください。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul><li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.13-15)</a></li></ul>
      </div>
    </section>

    <!-- ===================== 5. ECO overview ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:chart-pie" />SECTION 05</div>
      <h2 id="eco-overview">試験内容概要(ECO)とドメイン別出題比率</h2>
      <p>
        CAPM試験の出題範囲は「ECO(Exam Content Outline)」と呼ばれる公式文書で定義されています。ECOは以下の3階層で構成されます。
      </p>
      <ul>
        <li><strong>ドメイン(Domain)</strong>: プロジェクトマネジメント実務に不可欠な、高レベルの知識領域</li>
        <li><strong>タスク(Task)</strong>: 各ドメイン内でプロジェクトチームメンバーが担う職務</li>
        <li><strong>イネーブラー(Enabler)</strong>: タスクに関連する具体的な作業の例示(網羅的リストではなく代表例)</li>
      </ul>

      <h3 id="subheading-7">ドメイン別出題比率</h3>
      <div class="domain-grid">
        <div class="domain-card d1"><div class="domain-pct">36%</div><div class="domain-name">ドメイン1: PM基礎と主要概念</div></div>
        <div class="domain-card d2"><div class="domain-pct">17%</div><div class="domain-name">ドメイン2: 予測型・計画重視の手法</div></div>
        <div class="domain-card d3"><div class="domain-pct">20%</div><div class="domain-name">ドメイン3: アジャイルフレームワーク・手法</div></div>
        <div class="domain-card d4"><div class="domain-pct">27%</div><div class="domain-name">ドメイン4: ビジネス分析フレームワーク</div></div>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DOMAIN_PIE" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">CAPM試験 ドメイン別出題比率(合計100%)</div>
      </div>

      <p>
        重要な注意点として、PMIはJTA(職務分析)の結果、今日のプロジェクトチームメンバーは様々なプロジェクト環境で、異なるアプローチ(予測型・適応型・ハイブリッド)を使い分けていると位置づけています。そのため、予測型・適応型・ビジネス分析の考え方は特定のドメインに閉じておらず、4つのドメイン全体を横断して出題される可能性があります。
      </p>

      <h3 id="subheading-8">ドメインとPMI標準文書の対応関係</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ドメイン</th><th>主に対応するPMI標準・実務ガイド</th></tr></thead>
          <tbody>
            <tr><td>ドメイン1: PM基礎と主要概念</td><td>PMBOK® Guide 第7版 / PMI Code of Ethics and Professional Conduct</td></tr>
            <tr><td>ドメイン2: 予測型・計画重視の手法</td><td>PMBOK® Guide 第7版 / Process Groups: A Practice Guide</td></tr>
            <tr><td>ドメイン3: アジャイルフレームワーク・手法</td><td>Agile Practice Guide / 各フレームワーク公式ガイド(Scrum Guide、Kanban Guideなど)</td></tr>
            <tr><td>ドメイン4: ビジネス分析フレームワーク</td><td>The PMI Guide to Business Analysis / Business Analysis for Practitioners: A Practice Guide</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.5-6)</a></li>
          <li><a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI - CAPM Certification</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 6. Domain 1 ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:building-bank" />SECTION 06</div>
      <span class="domain-tag d1" data-testid="domain-tag">ドメイン1 &middot; 36%</span>
      <h2 id="domain1">プロジェクトマネジメントの基礎と主要概念</h2>
      <p>
        最大の出題比率を占めるドメインです。プロジェクトの定義、計画の目的、役割分担、問題解決の基本手法など、他の3ドメインを理解するための土台となる知識が問われます。
      </p>

      <h3 id="subheading-9">タスク構成</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>タスク</th><th>主なイネーブラー(出題される知識・スキルの例)</th></tr></thead>
          <tbody>
            <tr><td>タスク1: プロジェクトのライフサイクルとプロセスの理解</td><td>プロジェクト・プログラム・ポートフォリオの区別 / プロジェクトと定常業務(オペレーション)の区別 / 予測型と適応型アプローチの区別 / 課題・リスク・前提・制約の区別 / プロジェクトスコープのレビューと検証 / PM倫理綱領のシナリオへの適用 / プロジェクトが変革の手段となる仕組みの説明</td></tr>
            <tr><td>タスク2: プロジェクトマネジメント計画の理解</td><td>コスト・品質・リスク・スケジュール等の目的と重要性 / プロジェクトマネジメント計画と製品マネジメント計画の違い / マイルストーンとタスク期間の違い / 必要なリソースの数と種類の判断 / リスクレジスターの活用 / ステークホルダーレジスターの活用 / プロジェクトクロージャーと移行の説明</td></tr>
            <tr><td>タスク3: プロジェクトの役割と責任の理解</td><td>プロジェクトマネージャーとスポンサーの役割比較 / プロジェクトチームとスポンサーの役割比較 / PMの役割(イニシエーター、交渉役、傾聴者、コーチ、実務メンバー、ファシリテーター)の重要性 / リーダーシップとマネジメントの違い / 感情的知性(EQ)とその影響</td></tr>
            <tr><td>タスク4: 計画された戦略・フレームワークの実行方法の決定</td><td>コミュニケーション計画やリスク計画などへの適切な対応例 / プロジェクトの立ち上げとベネフィット計画の説明</td></tr>
            <tr><td>タスク5: 一般的な問題解決ツール・技法の理解</td><td>会議の効果性評価 / フォーカスグループ・スタンドアップミーティング・ブレインストーミング等の目的の説明</td></tr>
          </tbody>
        </table>
      </div>

      <h3 id="subheading-10">主要概念の解説(初学者向け)</h3>

      <h4>プロジェクト・プログラム・ポートフォリオの違い</h4>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_HIERARCHY" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">ポートフォリオ・プログラム・プロジェクトの階層関係</div>
      </div>
      <ul>
        <li><strong>プロジェクト</strong>: 独自の成果物・サービス・結果を生み出すために実施される、開始日と終了日のある有期的な業務。</li>
        <li><strong>プログラム</strong>: 個別に管理するよりもまとめて管理したほうがメリットが大きい、関連する複数プロジェクト・サブプログラム・プログラム活動の集合。</li>
        <li><strong>ポートフォリオ</strong>: 組織の戦略目標を達成するためにグループとして管理される、プロジェクト・プログラム・サブポートフォリオ・定常業務の集合。</li>
      </ul>

      <h4>プロジェクトと定常業務(オペレーション)の違い</h4>
      <p>プロジェクトは独自性と有期性を持ちます(終わりがある)。一方、オペレーションは組織を継続的に維持するための、反復的・恒常的な活動です。</p>

      <h4>予測型アプローチと適応型アプローチの違い</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>予測型(Predictive)</th><th>適応型(Adaptive)</th></tr></thead>
          <tbody>
            <tr><td>計画の作り方</td><td>プロジェクト序盤で詳細な計画を確定</td><td>短いサイクルで計画を継続的に見直す</td></tr>
            <tr><td>変更への対応</td><td>変更管理プロセスを通じて統制</td><td>変更を前提とし、積極的に取り込む</td></tr>
            <tr><td>適した状況</td><td>要求が明確で変化が少ないプロジェクト</td><td>要求が不確実、または変化が速いプロジェクト</td></tr>
            <tr><td>進捗の測定</td><td>EVM(アーンドバリューマネジメント)等</td><td>ベロシティ、バーンダウン等</td></tr>
          </tbody>
        </table>
      </div>

      <h4>課題・リスク・前提・制約の違い</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>用語</th><th>定義</th></tr></thead>
          <tbody>
            <tr><td>課題(Issue)</td><td>現在すでに発生している問題で、対応が必要なもの</td></tr>
            <tr><td>リスク(Risk)</td><td>発生するかどうか不確実な、プロジェクトに影響を与えうる事象</td></tr>
            <tr><td>前提(Assumption)</td><td>証明せずに真実・事実として受け入れている事柄</td></tr>
            <tr><td>制約(Constraint)</td><td>プロジェクトの選択肢を制限する要因(予算上限、納期など)</td></tr>
          </tbody>
        </table>
      </div>

      <h4>PMI倫理綱領(Code of Ethics and Professional Conduct)</h4>
      <p>
        PMIの倫理綱領は、<strong>責任(Responsibility)</strong>・<strong>尊重(Respect)</strong>・<strong>公正(Fairness)</strong>・<strong>誠実(Honesty)</strong>という4つの価値観を中心に構成されており、PMI会員・資格保有者・資格申請者すべてに適用されます。綱領は「アスピレーショナル基準(努力目標としての基準)」と「マンダトリー基準(違反すると懲戒対象になりうる必須基準)」の2種類で構成されているのが特徴です。
      </p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:info-circle" />補足</div>
        <p>PMIの倫理綱領は2025年11月17日付で改訂版が発効しており、AI活用における責任あるリーダーシップやサステナビリティに関する期待が新たに明文化されています。CAPM学習時は、綱領の4つの核となる価値観(責任・尊重・公正・誠実)の理解を軸にしつつ、最新版の内容をPMI公式ページで確認することを推奨します。</p>
      </div>

      <h4>リーダーシップとマネジメントの違い</h4>
      <ul>
        <li><strong>マネジメント</strong>: 計画・組織化・統制など、既存のプロセスやリソースを効率的に運用する働き。</li>
        <li><strong>リーダーシップ</strong>: ビジョンを示し、人を動機づけ、変化に向けてチームを導く働き。</li>
      </ul>
      <p>優れたPMは両方の要素をバランスよく発揮する必要があるとされます。</p>

      <h4>感情的知性(EQ)</h4>
      <p>EQ(Emotional Intelligence)とは、自分自身や他者の感情を認識し、それを適切にマネジメントする能力です。ステークホルダーとの関係構築、コンフリクトマネジメント、チームのモチベーション維持において重要な役割を果たします。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>予測型・適応型・課題/リスク/前提/制約といった対概念は、必ずペアで、かつ具体例とセットで覚える。</strong>用語の定義だけを暗記するより、シナリオ問題への対応力が高まります。</li>
          <li><strong>PMBOK® Guide 第7版の「12の原則」を土台として理解する。</strong>第7版は従来の「プロセス群・知識エリア」中心の構成から、「スチュワードシップ」「協働的なチーム環境」「ステークホルダーとの関わり」「価値への焦点」など、行動原則を重視する構成に転換しています。これはドメイン1の「役割・責任」「問題解決」の出題と密接に関連します。</li>
          <li><strong>PMI倫理綱領の4つの価値観は、シナリオ問題で「この状況でPMがまずすべき行動は何か」を問う形式で頻出します。</strong>綱領の条文を丸暗記するより、「誠実な報告」「利益相反の開示」「多様性の尊重」といった行動原則を状況に当てはめる練習が有効です。</li>
          <li><strong>リスクレジスター・ステークホルダーレジスターは「何が記録されるか」だけでなく「なぜ・いつ使うか」を理解する。</strong>出題は定義よりも活用シナリオに寄っています。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.7)</a></li>
          <li><a href="https://www.pmi.org/about/ethics/guidelines" target="_blank" rel="noopener">PMI Code of Ethics and Professional Conduct(ガイドライン)</a></li>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf" target="_blank" rel="noopener">PMI Code of Ethics and Professional Conduct(PDF)</a></li>
          <li><a href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">PMBOK® Guide(PMI Standards)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 7. Domain 2 ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:timeline" />SECTION 07</div>
      <span class="domain-tag d2" data-testid="domain-tag">ドメイン2 &middot; 17%</span>
      <h2 id="domain2">予測型・計画重視の手法</h2>
      <p>「予測型(Predictive、いわゆるウォーターフォール型)」アプローチの適用判断と、スケジュール・コスト管理の基本ツールが問われるドメインです。</p>

      <h3 id="subheading-11">タスク構成</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>タスク</th><th>主なイネーブラー</th></tr></thead>
          <tbody>
            <tr><td>タスク1: 予測型・計画重視アプローチが適切な場面の説明</td><td>組織構造(バーチャル、コロケーション、マトリクス、階層型など)への適合性判断 / 各プロセス内の活動の特定 / 各プロセスにおける典型的な活動の例示 / プロジェクト構成要素間の違いの区別</td></tr>
            <tr><td>タスク2: プロジェクトマネジメント計画のスケジュールの理解</td><td>クリティカルパス法(CPM)の適用 / スケジュール差異の計算 / WBS(作業分解構成図)の説明 / ワークパッケージの説明 / 品質マネジメント計画の適用 / 統合マネジメント計画の適用</td></tr>
            <tr><td>タスク3: 予測型プロジェクトのプロジェクト統制の文書化方法の決定</td><td>予測型プロジェクトで使用されるアーティファクト(成果物・記録物)の特定 / コストおよびスケジュール差異の計算</td></tr>
          </tbody>
        </table>
      </div>

      <h3 id="subheading-12">主要概念の解説(初学者向け)</h3>

      <h4>組織構造と予測型アプローチの適合性</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>組織構造</th><th>特徴</th><th>予測型アプローチとの相性</th></tr></thead>
          <tbody>
            <tr><td>機能別組織(Functional)</td><td>専門機能ごとの部門に分かれ、機能部門マネジャーが管理する構造</td><td>PMの権限が弱く、予測型でも部門間の調整コストが高くなりやすい</td></tr>
            <tr><td>階層型組織(Hierarchical)</td><td>指揮命令系統と権限の階層が明確な構造。機能別組織などと併存し得る</td><td>承認経路は明確だが、階層が多い場合は意思決定に時間がかかりやすい</td></tr>
            <tr><td>マトリクス組織(Matrix)</td><td>機能部門とプロジェクトの両方に人員が所属</td><td>弱い・強いマトリクスの度合いによりPMの権限が変動</td></tr>
            <tr><td>プロジェクト型組織</td><td>プロジェクトのために編成された専任チーム</td><td>PMの権限が強く、計画重視のアプローチと親和性が高い</td></tr>
            <tr><td>バーチャル組織(Virtual)</td><td>地理的に分散したチームがオンラインで協働</td><td>コミュニケーション計画の比重が特に重要になる</td></tr>
            <tr><td>コロケーション(Colocation)</td><td>チームが同じ物理空間に集まって作業</td><td>対面コミュニケーションが取りやすく、意思決定が速い</td></tr>
          </tbody>
        </table>
      </div>

      <h4>WBS(Work Breakdown Structure: 作業分解構成図)</h4>
      <p>プロジェクトスコープをチームが管理しやすい単位(ワークパッケージ)まで階層的に分解したものです。</p>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_WBS" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">WBS(作業分解構成図)の階層イメージ</div>
      </div>
      <ul>
        <li><strong>デリバラブル</strong>: プロジェクトが生み出す成果物や中間成果物。</li>
        <li><strong>ワークパッケージ</strong>: WBSの最下層に位置する、スケジュールとコストの見積り・監視が可能な最小単位の作業。</li>
      </ul>

      <h4>クリティカルパス法(Critical Path Method, CPM)</h4>
      <p>
        プロジェクト全体の最短完了日数を決定する、最も長い一連のアクティビティ(クリティカルパス)を特定する技法です。クリティカルパス上のアクティビティが遅延すると、プロジェクト全体の完了日も遅延します。フロート(余裕時間)がゼロのアクティビティがクリティカルパス上に存在します。
      </p>

      <h4>スケジュール差異とコスト差異の計算(EVM基礎)</h4>
      <p>予測型プロジェクトの進捗管理でよく使われる、アーンドバリューマネジメント(EVM)の基本指標です。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>指標</th><th>計算式</th><th>意味</th></tr></thead>
          <tbody>
            <tr><td>スケジュール差異(SV: Schedule Variance)</td><td><code>SV = EV − PV</code></td><td>プラスなら予定より進んでいる、マイナスなら遅れている</td></tr>
            <tr><td>コスト差異(CV: Cost Variance)</td><td><code>CV = EV − AC</code></td><td>プラスなら予算内、マイナスなら予算超過</td></tr>
          </tbody>
        </table>
      </div>
      <p>(EV: Earned Value=出来高、PV: Planned Value=計画価値、AC: Actual Cost=実コスト)</p>

      <h4>品質マネジメント計画とプロジェクトマネジメント計画</h4>
      <ul>
        <li><strong>品質マネジメント計画</strong>: プロジェクトおよび成果物が満たすべき品質基準と、それを検証する方法を定義する計画。</li>
        <li><strong>プロジェクトマネジメント計画</strong>: スコープ・スケジュール・コスト・品質・リスクなどの各補助計画を統合する単一の計画であり、これとは別に「統合計画」を作成するものではありません。ECOにある「integration management plan」という表現は、プロジェクトマネジメント計画による統合的な管理を指す補足的な表現として捉えます。</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>WBSとワークパッケージは「分解の粒度」を問う問題が多い。</strong>ワークパッケージは「見積り・スケジューリング・監視が可能な最小単位」という定義を軸に、選択肢の中から適切な粒度を判断する練習をしましょう。</li>
          <li><strong>クリティカルパスの計算問題は、フォワードパス(最早開始・最早終了)とバックワードパス(最遅開始・最遅終了)の考え方を図で描いて解く習慣をつけると得点が安定します。</strong></li>
          <li><strong>SVとCVの符号(プラス/マイナス)の意味を混同しないこと。</strong>「マイナス=悪い状態」という理解を軸に、EV・PV・ACの3指標の関係を整理しましょう。</li>
          <li><strong>予測型が適さない状況(要求が流動的、頻繁なフィードバックが必要など)も合わせて理解しておくと、ドメイン3(アジャイル)との比較問題にも対応しやすくなります。</strong></li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.8)</a></li>
          <li><a href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">PMBOK® Guide(PMI Standards)</a></li>
          <li><a href="https://www.pmi.org/standards" target="_blank" rel="noopener">PMI Standards & Publications 一覧</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 8. Domain 3 ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:git-branch" />SECTION 08</div>
      <span class="domain-tag d3" data-testid="domain-tag">ドメイン3 &middot; 20%</span>
      <h2 id="domain3">アジャイルフレームワーク・手法</h2>
      <p>適応型(アジャイル)アプローチの適用判断、イテレーション計画、代表的なアジャイルフレームワークの特徴が問われるドメインです。</p>

      <h3 id="subheading-13">タスク構成</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>タスク</th><th>主なイネーブラー</th></tr></thead>
          <tbody>
            <tr><td>タスク1: 適応型アプローチが適切な場面の説明</td><td>適応型と予測型・計画重視プロジェクトのメリット・デメリットの比較 / 組織構造への適応型アプローチの適合性判断 / 適応型アプローチの採用を促進する組織のプロセス資産(OPA)と組織体の環境要因(EEF)の特定</td></tr>
            <tr><td>タスク2: プロジェクトイテレーションの計画方法の決定</td><td>イテレーションの論理的な単位の区別 / イテレーションのメリット・デメリットの解釈 / WBSを適応型イテレーションへ変換 / スコープのインプットの決定 / 適応型と予測型の進捗追跡の違いの説明</td></tr>
            <tr><td>タスク3: 適応型プロジェクトのプロジェクト統制の文書化方法の決定</td><td>適応型プロジェクトで使用されるアーティファクトの特定</td></tr>
            <tr><td>タスク4: 適応型計画の構成要素の説明</td><td>異なる適応型手法(Scrum、エクストリームプログラミング(XP)、Scaled Agile Framework(SAFe®)、Kanbanなど)の構成要素の区別</td></tr>
            <tr><td>タスク5: タスクマネジメントの準備・実行方法の決定</td><td>適応型プロジェクトマネジメントタスクの成功基準の解釈 / 適応型プロジェクトマネジメントにおけるタスクの優先順位付け</td></tr>
          </tbody>
        </table>
      </div>

      <h3 id="subheading-14">主要概念の解説(初学者向け)</h3>

      <h4>アジャイルの基本思想</h4>
      <p>
        アジャイルの考え方の土台は、2001年に策定された「アジャイルソフトウェア開発宣言(Agile Manifesto)」にあります。宣言は4つの価値観を示しています。
      </p>
      <ul>
        <li>プロセスやツールよりも、個人と対話を</li>
        <li>包括的なドキュメントよりも、動くソフトウェアを</li>
        <li>契約交渉よりも、顧客との協調を</li>
        <li>計画に従うことよりも、変化への対応を</li>
      </ul>
      <p>これを支える12の原則には、「顧客満足を最優先し、価値のあるソフトウェアを早く継続的に提供する」「要求の変化を歓迎する」「動くソフトウェアを主要な進捗の尺度とする」などが含まれます。</p>

      <h4>予測型 vs 適応型のメリット・デメリット比較</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>予測型のメリット</th><th>適応型のメリット</th></tr></thead>
          <tbody>
            <tr><td>計画の精度</td><td>序盤で全体像・予算が見えやすい</td><td>学びながら計画を継続的に精緻化できる</td></tr>
            <tr><td>変化への対応</td><td>変更管理プロセスで統制が効く</td><td>変化を前提に、頻繁なフィードバックで軌道修正できる</td></tr>
            <tr><td>顧客との関わり</td><td>序盤の要件定義が中心</td><td>各イテレーションで継続的にレビューを受けられる</td></tr>
            <tr><td>適したプロジェクト例</td><td>建設・規制対応など要求が固定的な案件</td><td>ソフトウェア開発・新規事業など不確実性が高い案件</td></tr>
          </tbody>
        </table>
      </div>

      <h4>イテレーション計画とWBSの変換</h4>
      <p>
        適応型アプローチでは、WBS的なスコープの分解を、プロダクトバックログという形で「価値のある単位(ユーザーストーリーなど)」に翻訳し、それを一定期間(スプリント/イテレーション)ごとに区切って計画します。予測型の進捗追跡がEVM(SV/CVなど)を用いるのに対し、適応型ではベロシティやバーンダウンチャートなど、完成した作業量を基準にした指標が使われます。
      </p>

      <h4>代表的な適応型(アジャイル)フレームワークの比較</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>フレームワーク</th><th>主な単位・ケイデンス</th><th>主な役割</th><th>主なアーティファクト</th><th>特徴</th></tr></thead>
          <tbody>
            <tr><td>Scrum</td><td>スプリント(通常1〜4週間の固定期間)</td><td>プロダクトオーナー、スクラムマスター、開発者</td><td>プロダクトバックログ、スプリントバックログ、インクリメント</td><td>役割・イベント・アーティファクトが明確に定義された軽量フレームワーク</td></tr>
            <tr><td>Kanban</td><td>継続的フロー(固定の期間区切りなし)</td><td>特定の必須役割は定義されない</td><td>カンバンボード、WIP(仕掛り作業)制限</td><td>既存のプロセスに追加する「改善の方法」であり、単独の開発フレームワークではない</td></tr>
            <tr><td>エクストリームプログラミング(XP)</td><td>短いイテレーション</td><td>開発者中心</td><td>ユーザーストーリー、テスト駆動開発の成果物</td><td>ペアプログラミングやテスト駆動開発など、技術プラクティスを重視</td></tr>
            <tr><td>SAFe®(Scaled Agile Framework)</td><td>イテレーション + PIプランニング(複数イテレーションの束)</td><td>チームレベル〜ポートフォリオレベルまで階層的な役割</td><td>プログラムバックログなど複数レベルのバックログ</td><td>複数のアジャイルチームを企業規模でスケールさせるためのフレームワーク</td></tr>
          </tbody>
        </table>
      </div>

      <h4>Scrumのサイクル</h4>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SCRUM_CYCLE" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Scrumのスプリントサイクル</div>
      </div>

      <h4>Kanbanのフロー</h4>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_KANBAN_FLOW" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Kanbanボードにおける作業の流れ(WIP制限つき)</div>
      </div>

      <h4>タスクの優先順位付け</h4>
      <p>適応型プロジェクトでは、価値・リスク・依存関係などをもとにバックログアイテムの優先順位を継続的に見直します。代表的な優先順位付けの考え方には、MoSCoW法(Must/Should/Could/Won't)や、価値とコストのバランスで判断するWSJF(Weighted Shortest Job First、SAFeで使用)などがあります。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>「Kanbanはフレームワークではなく方法(メソッド)である」という位置づけの違いを理解しておく。</strong>Kanban Universityの公式ガイドは、Kanbanを既存のプロセス・フレームワークに追加して改善するための方法と定義しており、Scrumのような役割やイベントを規定するフレームワークとは性質が異なります。</li>
          <li><strong>Scrum Guideの最新版(2020年版)では、開発チームは「自己組織化(self-organizing)」ではなく「自己管理(self-managing)」という表現が使われている点、スプリントゴールとDone(完成)の定義が必須要素として明確化された点を押さえておくと、細かい選択肢の判別に役立ちます。</strong></li>
          <li><strong>組織のプロセス資産(OPA)と組織体の環境要因(EEF)の違いを整理する。</strong>OPAは組織内部の方針・手順・過去の教訓など「組織がコントロールできるもの」、EEFは市場状況・規制・企業文化など「プロジェクトを取り巻く外部・内部の状況で、通常コントロールが難しいもの」を指します。</li>
          <li><strong>予測型と適応型を「対立」ではなく「使い分け」として捉える。</strong>ECOはハイブリッドアプローチ(両方の要素を組み合わせる手法)の存在を前提としているため、「常にどちらかが正しい」という二択的な理解は避けましょう。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.9)</a></li>
          <li><a href="https://www.pmi.org/standards/agile" target="_blank" rel="noopener">Agile Practice Guide(PMI Standards)</a></li>
          <li><a href="https://scrumguides.org/" target="_blank" rel="noopener">The Scrum Guide(公式)</a></li>
          <li><a href="https://kanban.university/kanban-guide/" target="_blank" rel="noopener">The Official Guide to the Kanban Method(Kanban University公式)</a></li>
          <li><a href="https://framework.scaledagile.com/" target="_blank" rel="noopener">Scaled Agile Framework(SAFe公式)</a></li>
          <li><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">Agile Manifesto(公式)</a> / <a href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">12 Principles</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 9. Domain 4 ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:clipboard-text" />SECTION 09</div>
      <span class="domain-tag d4" data-testid="domain-tag">ドメイン4 &middot; 27%</span>
      <h2 id="domain4">ビジネス分析フレームワーク</h2>
      <p>
        出題比率2位の重要ドメインです。ステークホルダーの役割理解、要求の収集・文書化・トレーサビリティ管理、プロダクトロードマップ、要求の妥当性確認といった、ビジネス分析(Business Analysis, BA)の基本プロセスが問われます。
      </p>

      <h3 id="subheading-15">タスク構成</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>タスク</th><th>主なイネーブラー</th></tr></thead>
          <tbody>
            <tr><td>タスク1: BAの役割と責任の理解</td><td>ステークホルダーの役割(プロセスオーナー、プロセスマネージャー、プロダクトマネージャー、プロダクトオーナーなど)の区別 / 役割・責任を定義する必要性の説明 / 内部・外部の役割の区別</td></tr>
            <tr><td>タスク2: ステークホルダーコミュニケーションの実施方法の決定</td><td>最適なコミュニケーションチャネル・ツール(レポーティング、プレゼンテーションなど)の推奨 / BAにとってチーム間コミュニケーションが重要である理由の説明</td></tr>
            <tr><td>タスク3: 要求収集の方法の決定</td><td>ツールとシナリオのマッチング(ユーザーストーリー、ユースケースなど) / 状況に応じた要求収集アプローチの特定(ステークホルダーインタビュー、アンケート、ワークショップ、レッスンズラーンドなど) / 要求トレーサビリティマトリクス(RTM)・プロダクトバックログの説明</td></tr>
            <tr><td>タスク4: プロダクトロードマップの理解</td><td>プロダクトロードマップの適用方法の説明 / どの構成要素がどのリリースに含まれるかの判断</td></tr>
            <tr><td>タスク5: プロジェクト手法がBAプロセスに与える影響の判断</td><td>適応型・予測型アプローチにおけるBAの役割の判断</td></tr>
            <tr><td>タスク6: プロダクトデリバリーを通じた要求の妥当性確認</td><td>受け入れ基準(アクセプタンスクライテリア)の定義 / RTM・プロダクトバックログに基づくプロジェクト/プロダクトの提供準備の判断</td></tr>
          </tbody>
        </table>
      </div>

      <h3 id="subheading-16">ビジネス分析の基本プロセスフロー</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_BA_PROCESS" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">要求の引き出しから管理・トレーサビリティまでの循環プロセス</div>
      </div>

      <h3 id="subheading-17">主要概念の解説(初学者向け)</h3>

      <h4>ステークホルダーの役割の違い</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>役割</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>プロセスオーナー(Process Owner)</td><td>特定の業務プロセス全体に対する説明責任を持つ人</td></tr>
            <tr><td>プロセスマネージャー(Process Manager)</td><td>日常的なプロセス運用を管理する人</td></tr>
            <tr><td>プロダクトマネージャー(Product Manager)</td><td>プロダクト全体の戦略・ビジョン・ロードマップに責任を持つ人</td></tr>
            <tr><td>プロダクトオーナー(Product Owner)</td><td>(主にScrumにおいて)プロダクトバックログの優先順位付けと価値最大化に責任を持つ人</td></tr>
          </tbody>
        </table>
      </div>
      <p>内部ステークホルダー(組織内のチームメンバーや経営層など)と、外部ステークホルダー(顧客、規制当局、サプライヤーなど)を区別できることも問われます。</p>

      <h4>要求収集の技法とシナリオのマッチング</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>適したシナリオの例</th></tr></thead>
          <tbody>
            <tr><td>ステークホルダーインタビュー</td><td>少数の重要ステークホルダーから深い知見を得たい場合</td></tr>
            <tr><td>アンケート・サーベイ</td><td>多数の関係者から効率的に定量データを集めたい場合</td></tr>
            <tr><td>ワークショップ</td><td>複数の部門・利害関係者間で合意形成をしながら要求を洗い出したい場合</td></tr>
            <tr><td>レッスンズラーンド(過去の教訓)</td><td>類似プロジェクトの経験を活かして要求の抜け漏れを防ぎたい場合</td></tr>
            <tr><td>ユーザーストーリー</td><td>アジャイル環境で、ユーザー視点の小さな要求単位を表現したい場合</td></tr>
            <tr><td>ユースケース</td><td>システムとアクター(利用者・外部システム)間のやり取りを段階的に記述したい場合</td></tr>
          </tbody>
        </table>
      </div>

      <h4>要求トレーサビリティマトリクス(RTM: Requirements Traceability Matrix)</h4>
      <p>要求を出所(ビジネスニーズ)から成果物・テストケースまで一貫して追跡できるようにする表形式のツールです。予測型プロジェクトでよく使われます。プロダクトバックログとは、要求や作業項目を優先順位付きで管理する別個の手段であり、要求を可視化して管理するという目的の一部を共有します。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>要求ID</th><th>要求内容</th><th>ビジネスニーズとの紐付け</th><th>対応する成果物</th><th>テスト状況</th><th>ステータス</th></tr></thead>
          <tbody>
            <tr><td>REQ-001</td><td>ログイン機能の実装</td><td>セキュリティ強化</td><td>認証モジュール</td><td>テスト完了</td><td>完了</td></tr>
            <tr><td>REQ-002</td><td>多言語対応</td><td>海外展開</td><td>言語切替UI</td><td>テスト未着手</td><td>進行中</td></tr>
          </tbody>
        </table>
      </div>
      <p>適応型アプローチでは、プロダクトバックログと各アイテムの受け入れ基準を要求管理に用います。ただし、プロダクトバックログだけでRTMを自動的に代替できるわけではなく、要求の出所から成果物・テストまでの完全な追跡性が保証されるわけでもありません。必要な追跡性に応じて、リンクや識別子などを別途整備します。</p>

      <h4>プロダクトロードマップとリリース計画</h4>
      <p>プロダクトロードマップは、プロダクトの方向性・優先順位・大まかな時間軸を関係者に示す高レベルの計画です。個々の機能や要求を「どのリリースに含めるか」を判断する際の指針として使われます。予測型プロジェクトでは詳細なマスタースケジュールに近い形で扱われることもあれば、アジャイル環境ではテーマ・エピック単位の大まかな見通しとして扱われることもあります。</p>

      <h4>受け入れ基準とプロダクト/プロジェクトの提供準備の判断</h4>
      <p><strong>受け入れ基準(Acceptance Criteria)</strong>とは、成果物が「完了した」「顧客の要求を満たした」と判断するための具体的な条件です。要求の妥当性確認では、RTMやプロダクトバックログのステータスを確認し、受け入れ基準を満たしているかどうかに基づいて提供可否を判断します。</p>

      <h3 id="subheading-18">予測型・適応型アプローチにおけるBAの役割の違い</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>予測型プロジェクトでのBAの役割</th><th>適応型プロジェクトでのBAの役割</th></tr></thead>
          <tbody>
            <tr><td>要求定義のタイミング</td><td>プロジェクト序盤に詳細な要求を確定</td><td>各イテレーションで継続的に要求を精緻化</td></tr>
            <tr><td>主な成果物</td><td>要求仕様書、RTM</td><td>プロダクトバックログ、ユーザーストーリー</td></tr>
            <tr><td>変更への向き合い方</td><td>変更管理プロセスを通じて統制</td><td>変更を前提に、優先順位の見直しで対応</td></tr>
            <tr><td>ステークホルダーとの関わり方</td><td>主に序盤・要所でのレビュー</td><td>スプリントレビューなどで継続的に関与</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>「役割の名前」ではなく「責任範囲」で判断する。</strong>プロダクトマネージャーとプロダクトオーナーのように似た名称の役割は、責任範囲(戦略レベルか、日々のバックログ管理レベルか)で区別する練習をしましょう。</li>
          <li><strong>要求収集技法は「なぜその技法が最適か」を状況とセットで覚える。</strong>単なる技法の定義暗記ではなく、「多数の意見を効率よく集めたいときはアンケート」「合意形成が必要なときはワークショップ」のように、シナリオとペアで整理すると得点しやすくなります。</li>
          <li><strong>RTMとプロダクトバックログは、目的の一部を共有する別個の管理手段として理解する。</strong>RTMは要求の出所から成果物・テストまでの追跡、プロダクトバックログは要求・作業項目の優先順位付けと管理に重点があります。</li>
          <li><strong>受け入れ基準の定義は、要求そのものではなく「完了/合格の判定条件」であることを混同しないようにしましょう。</strong></li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.10)</a></li>
          <li><a href="https://www.pmi.org/standards/business-analysis" target="_blank" rel="noopener">The PMI Guide to Business Analysis(PMI Standards)</a></li>
          <li><a href="https://www.pmi.org/standards/business-analysis-second-edition" target="_blank" rel="noopener">Business Analysis for Practitioners: A Practice Guide 第2版(PMI Standards)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Glossary ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:book-2" />SECTION 10</div>
      <h2 id="glossary">用語集(初学者向けグロッサリー)</h2>
      <div class="glossary-grid">
        <div class="glossary-item"><div class="g-term">WBS(Work Breakdown Structure)</div><div class="g-def">プロジェクトスコープを階層的に分解した構成図</div></div>
        <div class="glossary-item"><div class="g-term">ワークパッケージ</div><div class="g-def">WBSの最下層にある、見積り・監視が可能な最小の作業単位</div></div>
        <div class="glossary-item"><div class="g-term">クリティカルパス</div><div class="g-def">プロジェクトの最短完了日数を決める、最も長い一連のアクティビティ</div></div>
        <div class="glossary-item"><div class="g-term">EV / PV / AC</div><div class="g-def">出来高(Earned Value)/計画価値(Planned Value)/実コスト(Actual Cost)</div></div>
        <div class="glossary-item"><div class="g-term">リスクレジスター</div><div class="g-def">プロジェクトのリスク情報(内容、影響度、対応策等)を記録する台帳</div></div>
        <div class="glossary-item"><div class="g-term">ステークホルダーレジスター</div><div class="g-def">ステークホルダーの情報・関心・影響力を記録する台帳</div></div>
        <div class="glossary-item"><div class="g-term">プロダクトバックログ</div><div class="g-def">適応型プロジェクトで管理される、優先順位付けされた要求・作業項目のリスト</div></div>
        <div class="glossary-item"><div class="g-term">スプリントバックログ</div><div class="g-def">1つのスプリント(イテレーション)で取り組む作業項目のリスト</div></div>
        <div class="glossary-item"><div class="g-term">インクリメント</div><div class="g-def">スプリントの結果として完成した、使用可能な成果物</div></div>
        <div class="glossary-item"><div class="g-term">WIP制限(Work In Progress Limit)</div><div class="g-def">Kanbanで用いられる、同時進行できる作業数の上限</div></div>
        <div class="glossary-item"><div class="g-term">RTM(要求トレーサビリティマトリクス)</div><div class="g-def">要求を出所から成果物・テストまで追跡するための表</div></div>
        <div class="glossary-item"><div class="g-term">受け入れ基準(Acceptance Criteria)</div><div class="g-def">成果物が完了・合格とみなされるための具体的条件</div></div>
        <div class="glossary-item"><div class="g-term">OPA(組織のプロセス資産)</div><div class="g-def">組織内部の方針・手順・過去の記録・教訓など</div></div>
        <div class="glossary-item"><div class="g-term">EEF(組織体の環境要因)</div><div class="g-def">市場状況・規制・企業文化など、プロジェクトを取り巻く内外の状況</div></div>
        <div class="glossary-item"><div class="g-term">EQ(感情的知性)</div><div class="g-def">自他の感情を認識し適切にマネジメントする能力</div></div>
      </div>
    </section>

    <!-- ===================== 11. Exam day ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:calendar-event" />SECTION 11</div>
      <h2 id="exam-day">試験当日の心得とリテイクポリシー</h2>

      <h3 id="subheading-19">試験当日の心得(ベストプラクティス)</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li><strong>10分間の休憩の使い方を事前に決めておく。</strong>休憩は75問目終了・全回答レビュー後に発生し、休憩を開始すると前半セクションの問題には戻れません。休憩前に前半の見直しを終える計画を立てましょう。</li>
          <li><strong>迷った問題に時間をかけすぎない。</strong>150問・180分(1問あたり平均1.2分)というペース配分を意識し、判断に迷う問題はいったん保留して先に進む習慣をつけると、時間切れによる未回答を防げます。</li>
          <li><strong>プレテスト問題の存在を意識しすぎない。</strong>どの問題が採点対象外かは受験者にはわからないため、すべての問題に同じ集中力で取り組むことが結果的に最善の戦略です。</li>
          <li><strong>オンライン受験を選ぶ場合は、事前に受験環境(ネットワーク、部屋の条件など)の要件をPMI公式の案内で確認しておく。</strong></li>
        </ul>
      </div>

      <h3 id="subheading-20">リテイク(再受験)ポリシー</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>受験可能回数</td><td>1年間の受験資格期間内に最大3回まで受験可能</td></tr>
            <tr><td>3回不合格の場合</td><td>最後の受験日から1年間、CAPMへの再申請ができない(この待機期間中も他のPMI資格には申請可能)</td></tr>
            <tr><td>受験資格期間の失効</td><td>1年の受験資格期間内に合格できなかった場合、再度申請が必要</td></tr>
            <tr><td>再受験の割引</td><td>受験資格期間内であれば、地域・会員資格に応じた割引価格で再受験可能な場合がある</td></tr>
            <tr><td>手動再採点</td><td>ペーパーベースで受験した場合、45米ドルの手数料で手動再採点を依頼可能</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul><li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.12-15)</a></li></ul>
      </div>
    </section>

    <!-- ===================== 12. CCR ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:refresh" />SECTION 12</div>
      <h2 id="ccr">資格維持(CCRプログラムとPDU)</h2>
      <p>CAPMは取得して終わりではなく、継続的な学習によって維持する必要があります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>更新サイクル</td><td>3年ごとに更新が必要</td></tr>
            <tr><td>必要PDU(Professional Development Unit)</td><td>3年サイクルごとに15PDU</td></tr>
            <tr><td>Education PDU</td><td>最低9PDU。そのうちPMI Talent TriangleのWays of Working、Power Skills、Business Acumenの各領域で最低2PDUが必要</td></tr>
            <tr><td>Giving Back PDU</td><td>最大6PDU(任意。15PDUのすべてをEducationで取得することも可能)</td></tr>
            <tr><td>PDUとして認められる活動</td><td>学習(Learning)、他者への指導(Teaching)、プレゼンテーション、読書、ボランティア活動、コンテンツ制作など、1時間の活動につき原則1PDU</td></tr>
            <tr><td>PDU記録・報告先</td><td>CCRS(Continuing Certification Requirements System)</td></tr>
            <tr><td>更新手続き</td><td>必要PDUを満たしてCCRSで報告し、更新料を支払う</td></tr>
          </tbody>
        </table>
      </div>

      <p>CCR(Continuing Certification Requirements)プログラムの目的は、継続的な学習と専門能力開発を促進し、資格保有者が複雑化するビジネス環境の要求に応え続けられるようにすることにあるとPMIは説明しています。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li>資格取得直後からPDUの記録習慣をつけておくと、更新期限直前に慌てずに済みます。</li>
          <li>業務でのプロジェクト経験や社内勉強会での登壇なども、条件を満たせばPDUとして計上できる場合があるため、CCRSの分類を早めに確認しておくとよいでしょう。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:external-link" />ソース</div>
        <ul>
          <li><a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">CAPM Exam Content Outline(PDF, p.15)</a></li>
          <li><a href="https://www.pmi.org/certifications/certification-resources/maintain" target="_blank" rel="noopener">Maintain & Renew Your Certification</a></li>
          <li><a href="https://ccrs.pmi.org/" target="_blank" rel="noopener">CCRS(PDU報告システム)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 13. Study plan ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:map-2" />SECTION 13</div>
      <h2 id="study-plan">学習ロードマップ例(6週間プラン)</h2>
      <p>
        以下は本ガイドの内容をもとにした学習計画の一例です。PMIが公式に定めたスケジュールではなく、ECOのドメイン構成に沿って独学で進める場合の一般的なアプローチとして参考にしてください。
      </p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_STUDY_PLAN6WEEK" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中…</p>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">6週間の学習ロードマップ例</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>週</th><th>学習内容</th><th>対応する本ガイドの章</th></tr></thead>
          <tbody>
            <tr><td>Week1</td><td>ドメイン1前半: プロジェクト/プログラム/ポートフォリオの区別、PM倫理綱領、課題・リスク・前提・制約</td><td>第6章</td></tr>
            <tr><td>Week2</td><td>ドメイン1後半 + ドメイン2導入: 役割と責任、リーダーシップとマネジメント、組織構造と予測型アプローチの適合性</td><td>第6章・第7章</td></tr>
            <tr><td>Week3</td><td>ドメイン2: WBS、ワークパッケージ、クリティカルパス法、SV/CVの計算練習</td><td>第7章</td></tr>
            <tr><td>Week4</td><td>ドメイン3: アジャイル宣言と原則、Scrum・Kanban・XP・SAFeの比較、イテレーション計画</td><td>第8章</td></tr>
            <tr><td>Week5</td><td>ドメイン4: ステークホルダーの役割、要求収集技法、RTM、プロダクトロードマップ、受け入れ基準</td><td>第9章</td></tr>
            <tr><td>Week6</td><td>総復習: 用語集の見直し、模擬試験でドラッグアンドドロップ・ホットスポット形式に慣れる、弱点ドメインの再学習</td><td>第4章・第10章・全ドメイン</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon class="ti" name="tabler:bulb" />ベストプラクティス</div>
        <ul>
          <li>各週の終わりに、その週のドメインに関する模擬問題を解き、正答率が低いタスクを翌週に再度復習する「スパイラル学習」が効果的です。</li>
          <li>ドメイン1(36%)とドメイン4(27%)で合計63%を占めるため、時間配分に迷った場合はこの2ドメインを優先すると学習効率が上がります。</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 14. Summary ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:flag-3" />SECTION 14</div>
      <h2 id="summary">まとめ</h2>
      <p>
        CAPMは実務経験を問わない、プロジェクトマネジメントのキャリアをこれから始める人に適した入門資格です。試験は「プロジェクトマネジメントの基礎と主要概念(36%)」「予測型・計画重視の手法(17%)」「アジャイルフレームワーク・手法(20%)」「ビジネス分析フレームワーク(27%)」という4つのドメインから出題され、単一の手法だけでなく、予測型・適応型・ビジネス分析を横断的に理解していることが求められます。
      </p>
      <p>学習にあたっては、</p>
      <ol>
        <li>ECOのタスク・イネーブラーを軸に出題範囲を正確に把握すること</li>
        <li>定義の暗記だけでなく、シナリオに基づいた判断力を養うこと</li>
        <li>PMBOK® Guide、Agile Practice Guide、Scrum Guide、Kanban Guide、PMI Guide to Business Analysisなど、公式ソースに立ち返って学習すること</li>
      </ol>
      <p>が合格への近道です。本ガイドが、CAPM学習の全体像を把握するための一助となれば幸いです。</p>
    </section>

    <!-- ===================== 15. References ===================== -->
    <section>
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon class="ti" name="tabler:link" />SECTION 15</div>
      <h2 id="references">参考文献・出典(Sources)</h2>
      <p>本ガイドは以下の一次情報源をもとに作成しています。内容は執筆時点のものであり、試験制度・料金・出題比率は変更される可能性があるため、必ず最新情報をPMI公式サイトでご確認ください。</p>

      <div class="ref-group">
        <h3 id="subheading-21">PMI公式(CAPM関連)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">PMI - Certified Associate in Project Management(CAPM)® Certification</span><a class="ref-url" href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">https://www.pmi.org/certifications/certified-associate-capm</a></li>
          <li><span class="ref-name">PMI - CAPM Examination Content Outline(2023 Exam Update, PDF)</span><a class="ref-url" href="https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf</a></li>
          <li><span class="ref-name">PMI - CAPM Exam Prep Course(オンデマンド)</span><a class="ref-url" href="https://www.pmi.org/dcpdp/sku/el068" target="_blank" rel="noopener">https://www.pmi.org/dcpdp/sku/el068</a></li>
          <li><span class="ref-name">PMI - Authorized Training Partners</span><a class="ref-url" href="https://www.pmi.org/learning/authorized-training-partners" target="_blank" rel="noopener">https://www.pmi.org/learning/authorized-training-partners</a></li>
          <li><span class="ref-name">PMI - Maintain & Renew Your Certification</span><a class="ref-url" href="https://www.pmi.org/certifications/certification-resources/maintain" target="_blank" rel="noopener">https://www.pmi.org/certifications/certification-resources/maintain</a></li>
          <li><span class="ref-name">PMI - CCRS(PDU報告システム)</span><a class="ref-url" href="https://ccrs.pmi.org/" target="_blank" rel="noopener">https://ccrs.pmi.org/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3 id="subheading-22">PMI公式標準・実務ガイド</h3>
        <ul class="ref-list">
          <li><span class="ref-name">PMI - Standards & Publications 一覧</span><a class="ref-url" href="https://www.pmi.org/standards" target="_blank" rel="noopener">https://www.pmi.org/standards</a></li>
          <li><span class="ref-name">PMI - PMBOK® Guide</span><a class="ref-url" href="https://www.pmi.org/standards/pmbok" target="_blank" rel="noopener">https://www.pmi.org/standards/pmbok</a></li>
          <li><span class="ref-name">PMI - Agile Practice Guide</span><a class="ref-url" href="https://www.pmi.org/standards/agile" target="_blank" rel="noopener">https://www.pmi.org/standards/agile</a></li>
          <li><span class="ref-name">PMI - The PMI Guide to Business Analysis</span><a class="ref-url" href="https://www.pmi.org/standards/business-analysis" target="_blank" rel="noopener">https://www.pmi.org/standards/business-analysis</a></li>
          <li><span class="ref-name">PMI - Business Analysis for Practitioners: A Practice Guide(第2版)</span><a class="ref-url" href="https://www.pmi.org/standards/business-analysis-second-edition" target="_blank" rel="noopener">https://www.pmi.org/standards/business-analysis-second-edition</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3 id="subheading-23">PMI倫理綱領</h3>
        <ul class="ref-list">
          <li><span class="ref-name">PMI - Code of Ethics and Professional Conduct(ガイドライン)</span><a class="ref-url" href="https://www.pmi.org/about/ethics/guidelines" target="_blank" rel="noopener">https://www.pmi.org/about/ethics/guidelines</a></li>
          <li><span class="ref-name">PMI - Code of Ethics and Professional Conduct(PDF)</span><a class="ref-url" href="https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf" target="_blank" rel="noopener">https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3 id="subheading-24">アジャイル関連の公式ソース</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Scrum.org / Scrum Guides - The Scrum Guide(2020年版)</span><a class="ref-url" href="https://scrumguides.org/" target="_blank" rel="noopener">https://scrumguides.org/</a></li>
          <li><span class="ref-name">Kanban University - The Official Guide to the Kanban Method</span><a class="ref-url" href="https://kanban.university/kanban-guide/" target="_blank" rel="noopener">https://kanban.university/kanban-guide/</a></li>
          <li><span class="ref-name">Scaled Agile, Inc. - Scaled Agile Framework(SAFe)</span><a class="ref-url" href="https://framework.scaledagile.com/" target="_blank" rel="noopener">https://framework.scaledagile.com/</a></li>
          <li><span class="ref-name">Agile Manifesto - Manifesto for Agile Software Development</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          <li><span class="ref-name">Agile Manifesto - 12 Principles Behind the Agile Manifesto</span><a class="ref-url" href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/principles.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3 id="subheading-25">その他</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Forbes Advisor - CAPM Certification Salary(PMI公式サイトが出典として引用)</span><a class="ref-url" href="https://www.forbes.com/advisor/education/certifications/capm-certification-salary/" target="_blank" rel="noopener">https://www.forbes.com/advisor/education/certifications/capm-certification-salary/</a></li>
        </ul>
      </div>
    </section>

    <footer>
      本ガイドは教育・学習支援を目的として作成された非公式の解説資料です。CAPM®、PMI®、PMBOK®はProject Management Institute, Inc.の登録商標です。正式な試験内容・受験資格・料金は必ず<a href="https://www.pmi.org/certifications/certified-associate-capm" target="_blank" rel="noopener">PMI公式サイト</a>でご確認ください。
    </footer>

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
    grid-template-columns: repeat(4, minmax(160px, 1fr));
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
    padding: 24px;
    text-align: center;
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
  .ref-group h3 { margin-top: 0; }
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
      transition: transform 0.2s ease;
      box-shadow: none;
    }
    .sidebar.open { transform: translateX(0); }
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
</style>
