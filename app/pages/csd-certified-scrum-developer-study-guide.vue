<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-guide",
  "what-is-csd",
  "learning-objectives-structure",
  "scrum-foundations-review",
  "category-lean-agile-scrum",
  "category-collaboration",
  "category-architecture-design",
  "category-refactoring",
  "category-tdd",
  "category-ci",
  "xp-integration-map",
  "best-practices-checklist",
  "career-path-renewal",
  "summary",
  "references"
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
  title: "Certified Scrum Developer(CSD) 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description:
    "Scrum AllianceのCSD Learning Objectivesに基づき、CSD認定の学習目標6カテゴリ(Lean/Agile/Scrum、Collaboration、Architecture、Refactoring、TDD、CI)を初学者向けに解説する完全ガイド。",
});

const MERMAID_THEME_VARIABLES = {
  background: "transparent",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#2E3F72",
  secondaryColor: "#FAF1DF",
  secondaryBorderColor: "#B8802A",
  tertiaryColor: "#FFFFFF",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
  fontSize: "16px",
};

const DIAGRAM_DEVELOPER_TRACK_PATH = `flowchart LR
    A["Scrum Foundations\n共通の基礎知識"] --> B["CSD\nCertified Scrum Developer"]
    B --> C["A-CSD\nAdvanced Certified\nScrum Developer"]
    C --> D["CSP-D\nCertified Scrum Professional\nfor Developers"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A box;
    class B hub;
    class C,D done;`;

const DIAGRAM_CSD_ACQUISITION_STEPS = `flowchart TB
    A["Scrum Alliance認定CSDトレーナーによる\n14時間以上の正式トレーニングを受講"] --> B["CSDアセスメントで理解度を証明\n試験形式またはクラス内での実技評価"]
    B --> C["CSDライセンスを受諾し\nScrum Allianceプロフィールに登録"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`;

const DIAGRAM_LO_CATEGORY_TREE = `flowchart TB
    Root["CSD Learning Objectives"]
    Root --> C1["1. Lean, Agile & Scrum"]
    Root --> C2["2. Collaboration & Team Dynamics"]
    Root --> C3["3. Architecture & Design"]
    Root --> C4["4. Refactoring"]
    Root --> C5["5. Test-Driven Development"]
    Root --> C6["6. Continuous Integration"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Root box;
    class C1,C2,C3,C4,C5,C6 hub;`;

const DIAGRAM_EMPIRICISM_PILLARS = `flowchart TB
    Emp["経験主義 Empiricism"]
    Emp --> P1["透明性\nTransparency"]
    Emp --> P2["検査\nInspection"]
    Emp --> P3["適応\nAdaptation"]

    V["スクラムの5つの価値基準"]
    V --> V1["確約 Commitment"]
    V --> V2["集中 Focus"]
    V --> V3["公開 Openness"]
    V --> V4["尊敬 Respect"]
    V --> V5["勇気 Courage"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Emp,P1,P2,P3 box;
    class V,V1,V2,V3,V4,V5 done;`;

const DIAGRAM_DAILY_SCRUM_FLOW = `flowchart LR
    A["前日までの進捗を検査"] --> B["スプリントゴールとの\nギャップを確認"]
    B --> C["翌24時間の計画を\n開発者同士で調整"]
    C --> D["必要に応じて\nスプリントバックログを更新"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D box;`;

const DIAGRAM_BACKLOG_REFINEMENT_LOOP = `flowchart TB
    A["プロダクトバックログアイテムを\n検査する"] --> B{"詳細・見積り・順序は\n十分か?"}
    B -- "不十分" --> C["開発者・POが対話し\nPBIを分割・詳細化・再見積り"]
    C --> A
    B -- "十分" --> D["次のスプリントプランニングで\n選択可能な状態にする"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,C,D box;
    class B hub;`;

const DIAGRAM_DEFINITION_OF_DONE_FLOW = `flowchart LR
    A["Doneの定義"] --> B["インクリメントの\n品質基準を明文化"]
    B --> C["透明性の向上"]
    C --> D["進捗を正しく検査できる"]
    D --> E["的確な適応判断ができる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`;

const DIAGRAM_STAKEHOLDER_COLLAB_LOOP = `flowchart LR
    SP["スプリントプランニング\nステークホルダーの意向を反映"] --> DEV["開発期間中\nユーザーインタビューや\nプロトタイプでのフィードバック収集"]
    DEV --> SR["スプリントレビュー\nインクリメントを提示し\nフィードバックを得る"]
    SR --> SP

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class SP,DEV,SR box;`;

const DIAGRAM_AGILE_ARCHITECTURE_PRINCIPLES = `flowchart TB
    A["アジャイルアーキテクチャの原則"]
    A --> B["創発的アーキテクチャ\n必要になった時点で\n設計を進化させる"]
    A --> C["変更コストを下げる設計\n疎結合・高凝集を志向する"]
    A --> D["継続的なリファクタリングによる\n設計の健全性維持"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D box;`;

const DIAGRAM_REFACTORING_DEFINITION_FLOW = `flowchart LR
    A["リファクタリング前のコード\n振る舞いは変化なし"] --> B["内部構造を\n段階的に改善"]
    B --> C["リファクタリング後のコード\n振る舞いは同じ、構造はより良い"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`;

const DIAGRAM_TDD_RED_GREEN_REFACTOR = `flowchart LR
    R["Red\n失敗するテストを書く"] --> G["Green\nテストを通す\n最小限のコードを書く"]
    G --> F["Refactor\n振る舞いを変えずに\n内部構造を改善する"]
    F --> R

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class R hub;
    class G done;
    class F box;`;

const DIAGRAM_CI_TEAM_BENEFITS = `flowchart TB
    CI["継続的インテグレーション"]
    CI --> A["インクリメントの品質が\nスプリント中を通じて\n継続的に検査できる"]
    CI --> B["Doneの定義における\n自動テスト合格を\n常に満たしやすくなる"]
    CI --> C["複数の開発者が\n同時並行で作業しても\n統合リスクが低い"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class CI hub;
    class A,B,C box;`;

const DIAGRAM_CI_AUTOMATED_PIPELINE = `flowchart LR
    A["コードをコミットまたはプッシュ"] --> B["自動ビルド"]
    B --> C["自動テスト実行\n単体・結合"]
    C --> D["コード品質とカバレッジの\n自動測定"]
    D --> E["結果をチームに\nフィードバック"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`;

const DIAGRAM_XP_PRACTICE_LOOP = `flowchart TB
    TDD["Test-Driven\nDevelopment"] --> Refactor["Refactoring"]
    Refactor --> SimpleDesign["Simple Design"]
    SimpleDesign --> CI["Continuous\nIntegration"]
    CI --> CollectiveOwnership["Collective Code\nOwnership"]
    CollectiveOwnership --> PairProgramming["Pair Programming"]
    PairProgramming --> TDD

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class TDD,Refactor,SimpleDesign,CI,CollectiveOwnership,PairProgramming box;`;

const DIAGRAM_CAREER_PATH_RENEWAL = `flowchart TB
    CSD["CSD取得"] --> Practice["実務でエンジニアリング\nプラクティスを実践"]
    Practice --> Renew["2年ごとにSEUを提出し\n更新手数料を払って更新する"]
    Practice --> Advance["経験を積んで\nA-CSDに挑戦"]
    Advance --> CSPD["さらに経験とSEUを積み\nCSP-Dに挑戦"]
    Renew --> Practice

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Practice,Renew,Advance box;
    class CSD,CSPD hub;`;

</script>

<template>
  <div class="csd-page">
    <div class="layout">
    <button
      ref="sidebarToggle"
      class="sidebar-toggle"
      aria-label="目次メニューを開閉"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      aria-controls="sidebar"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />
    <aside id="sidebar" class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">CSD® 完全ガイド</div>
        <div class="brand-subtitle">Certified Scrum Developer</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">概要</li>
      <li><a :class="{ active: activeId === 'about-guide' }" href="#about-guide" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />このガイドについて</a></li>
      <li><a :class="{ active: activeId === 'what-is-csd' }" href="#what-is-csd" @click="closeSidebar"><Icon name="tabler:award" aria-hidden="true" />CSD認定とは何か</a></li>
      <li><a :class="{ active: activeId === 'learning-objectives-structure' }" href="#learning-objectives-structure" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />学習目標とブルームの分類法</a></li>

      <li class="nav-group-label">土台知識</li>
      <li><a :class="{ active: activeId === 'scrum-foundations-review' }" href="#scrum-foundations-review" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />Scrum Foundationsのおさらい</a></li>

      <li class="nav-group-label">学習目標6カテゴリ</li>
      <li><a :class="{ active: activeId === 'category-lean-agile-scrum' }" href="#category-lean-agile-scrum" @click="closeSidebar"><Icon name="tabler:refresh" aria-hidden="true" />1. Lean, Agile & Scrum</a></li>
      <li><a :class="{ active: activeId === 'category-collaboration' }" href="#category-collaboration" @click="closeSidebar"><Icon name="tabler:users-group" aria-hidden="true" />2. Collaboration & Team Dynamics</a></li>
      <li><a :class="{ active: activeId === 'category-architecture-design' }" href="#category-architecture-design" @click="closeSidebar"><Icon name="tabler:schema" aria-hidden="true" />3. Architecture & Design</a></li>
      <li><a :class="{ active: activeId === 'category-refactoring' }" href="#category-refactoring" @click="closeSidebar"><Icon name="tabler:tool" aria-hidden="true" />4. Refactoring</a></li>
      <li><a :class="{ active: activeId === 'category-tdd' }" href="#category-tdd" @click="closeSidebar"><Icon name="tabler:flask" aria-hidden="true" />5. Test-Driven Development</a></li>
      <li><a :class="{ active: activeId === 'category-ci' }" href="#category-ci" @click="closeSidebar"><Icon name="tabler:git-merge" aria-hidden="true" />6. Continuous Integration</a></li>

      <li class="nav-group-label">統合と実践</li>
      <li><a :class="{ active: activeId === 'xp-integration-map' }" href="#xp-integration-map" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />XPプラクティス統合マップ</a></li>
      <li><a :class="{ active: activeId === 'best-practices-checklist' }" href="#best-practices-checklist" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />ベストプラクティスチェックリスト</a></li>
      <li><a :class="{ active: activeId === 'career-path-renewal' }" href="#career-path-renewal" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />キャリアパスと更新</a></li>

      <li class="nav-group-label">まとめ・参考文献</li>
      <li><a :class="{ active: activeId === 'summary' }" href="#summary" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />まとめ</a></li>
      <li><a :class="{ active: activeId === 'references' }" href="#references" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・出典一覧</a></li>
    </ul>
    </aside>

    <main class="main-content">
      <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance Developer Track</div>
      <h1>Certified Scrum Developer&reg;(CSD&reg;) 完全学習ガイド</h1>
      <p class="hero-lede">
        初学者向け・ステップバイステップ解説版。対象読者: これからCSD認定の取得を目指すソフトウェア開発者、エンジニア、QAエンジニア、スクラムチームメンバー。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">14時間+</div><div class="stat-label">Scrum Alliance認定トレーナーによる正式トレーニング</div></div>
        <div class="stat-card"><div class="stat-number">6カテゴリ</div><div class="stat-label">CSD固有の学習目標カテゴリ数</div></div>
        <div class="stat-card"><div class="stat-number">24個</div><div class="stat-label">CSD学習目標の総数(1.1〜6.3)</div></div>
        <div class="stat-card"><div class="stat-number">2年間</div><div class="stat-label">認定の有効期間(SEUまたは上位認定で更新)</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは学習補助を目的とした非公式の教材です。Scrum Allianceの公式見解や試験内容を保証するものではありません。最新情報は必ず<a href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer" target="_blank" rel="noopener">Scrum Alliance公式ページ</a>をご確認ください。
      </span>
      </div>
    </div>

    <!-- ===================== 01. About This Guide ===================== -->
    <section id="about-guide">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      <h2>このガイドについて</h2>

      <p>このガイドは、Scrum Alliance&reg;が公開している<strong>CSD Learning Objectives(学習目標)</strong>および<strong>Scrum Foundations&reg; Learning Objectives</strong>を一次情報源として、CSD認定コースで扱われる内容を初学者にもわかりやすいステップバイステップ形式で解説したものです。</p>

      <p>CSDは「Developer Track(開発者トラック)」の入門資格であり、スクラムフレームワークの理解に加えて、<strong>アジャイルなソフトウェアエンジニアリングプラクティス</strong>(リファクタリング、テスト駆動開発、継続的インテグレーションなど)の実践力を証明する認定です。単なる知識試験ではなく、Scrum Alliance認定トレーナーによる<strong>14時間以上のライブ形式トレーニング</strong>と、その中で実施される<strong>CSDアセスメント</strong>を通じて取得します。</p>

      <p>本ガイドの構成方針は以下の通りです。</p>
      <ul>
        <li>ASCIIアート(文字だけの図)は使用せず、図解はすべて<strong>Mermaid</strong>で記述</li>
        <li>比較・一覧情報は<strong>Markdownテーブル</strong>で整理</li>
        <li>各学習目標について「説明 → ステップバイステップ → ベストプラクティス → ソース」の4点セットで解説</li>
        <li>巻末に一次情報源・二次情報源のURL一覧を掲載</li>
      </ul>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>本ガイドは学習補助を目的とした非公式の教材です。Scrum Allianceの公式見解や試験内容を保証するものではありません。最新情報は必ず巻末の公式ソースをご確認ください。</p>
      </div>
    </section>

    <!-- ===================== 02. What Is CSD ===================== -->
    <section id="what-is-csd">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:award" aria-hidden="true" />SECTION 02</div>
      <h2>CSD認定とは何か</h2>

      <h3>1.1 CSDの定義</h3>
      <p><strong>Certified Scrum Developer(CSD)</strong>は、Scrum Allianceが提供する認定資格の一つで、次の2点を証明するものです。</p>
      <ol>
        <li><strong>スクラムフレームワークとアジャイル原則の実務理解</strong></li>
        <li><strong>アジャイル環境における実践的なエンジニアリングスキル</strong></li>
      </ol>
      <p>CSMやCSPOがそれぞれ「スクラムマスター」「プロダクトオーナー」という役割にフォーカスするのに対し、CSDは<strong>「開発者(Developer)」というスクラムチームの役割</strong>にフォーカスし、特にソフトウェアを作るチームに向けて設計されています。</p>

      <h3>1.2 Developer Trackにおける位置づけ</h3>
      <p>CSDはDeveloper Trackの<strong>土台となる入門資格</strong>です。CSD取得後は、より高度な資格へとステップアップできます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DEVELOPER_TRACK_PATH" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Scrum Foundationsを土台にCSDからA-CSD、CSP-Dへとステップアップするキャリアパス</div>
      </div>

      <ul>
        <li><strong>CSD</strong>: 開発者トラックの入り口。スクラムの基礎とエンジニアリングプラクティスの基礎を学ぶ</li>
        <li><strong>A-CSD</strong>: CSD取得者が実務経験を積んだ上で挑戦する上位資格</li>
        <li><strong>CSP-D</strong>: 開発者トラックの最上位資格。より高度な実務経験とSEU(後述)が要求される</li>
      </ul>

      <h3>1.3 CSDとCSMの違い</h3>
      <p>よくある質問として「CSDとCSM、どちらを取るべきか」があります。答えは目的次第です。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>CSM(Certified ScrumMaster)</th><th>CSD(Certified Scrum Developer)</th></tr></thead>
          <tbody>
            <tr><td>フォーカス</td><td>人・プロセスのファシリテーション、チームの継続的改善</td><td>技術的卓越性、エンジニアリングプラクティス</td></tr>
            <tr><td>主な対象者</td><td>スクラムマスター、チームリード</td><td>ソフトウェア開発者、エンジニア</td></tr>
            <tr><td>学ぶ核となる能力</td><td>イベントのファシリテーション、障害の除去、チーム支援</td><td>リファクタリング、TDD、CI、アーキテクチャ設計</td></tr>
            <tr><td>前提知識</td><td>Scrum Foundations</td><td>Scrum Foundations + エンジニアリング実務</td></tr>
          </tbody>
        </table>
      </div>
      <p>両方を取得することも可能で、互いに排他的な資格ではありません。</p>

      <h3>1.4 取得要件</h3>
      <p>CSD認定を取得するためのプロセスは次の3ステップです。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CSD_ACQUISITION_STEPS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">正式トレーニングからアセスメント、ライセンス登録までの取得プロセス</div>
      </div>

      <p><strong>ステップバイステップ:</strong></p>
      <ol class="step-list">
        <li>
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">正式トレーニングを受講する</div>
            <div class="step-desc">Scrum Alliance承認済みのCSDトレーナーが提供する、合計14時間以上のライブトレーニングコースを受講する。</div>
          </div>
        </li>
        <li>
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">アセスメントで理解度を証明する</div>
            <div class="step-desc">コース内でスクラムとアジャイルプラクティスの理解度をアセスメントされる(トレーナーの設計により、筆記試験形式の場合もクラス内評価形式の場合もある)。</div>
          </div>
        </li>
        <li>
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">ライセンスを受諾し登録する</div>
            <div class="step-desc">コース修了後、CSDライセンスを受諾し、Scrum Allianceの会員プロフィールに認定を追加する。</div>
          </div>
        </li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>コース選定時は「ハンズオン(実際に手を動かすコーディング演習)」がどの程度含まれるかをシラバスで確認する。CSDは座学よりも実践重視の認定であるため、ペアプログラミングやTDD演習を伴うコースを選ぶと学習効果が高い。</li>
          <li>受講前にScrum Foundations相当の知識(スクラムイベント・作成物の基礎)を予習しておくと、コース内の技術的な議論に集中できる。</li>
        </ul>
      </div>

      <h3>1.5 更新要件とSEU</h3>
      <p>CSD認定の有効期間は<strong>2年間</strong>です。通常の更新経路では、以下の両方を行います。</p>
      <ul>
        <li>更新手数料の支払い</li>
        <li>定められた数の<strong>Scrum Education Units(SEU)</strong>の提出(継続学習の証明)</li>
      </ul>
      <p>ただし、これが唯一の経路ではありません。同じトラックの上位認定コース(A-CSD、CSP-D)を受講して新たな認定を取得した場合、既存のCSD認定は自動的に更新されます。上位認定に進む予定がある場合は、SEUの提出と更新料の支払いを行わなくても認定を維持できます。</p>
      <p>SEUは書籍を読む、ウェビナーを視聴する、カンファレンスに参加するなど、継続的な学習活動によって獲得できます。「一度取ったら終わり」の資格ではなく、<strong>継続的な成長を証明し続ける仕組み</strong>になっている点が特徴です。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>認定取得直後からSEU活動をログに記録しておくと、更新時期に慌てずに済む。技術書の輪読会やLT登壇なども対象になり得るため、日々の学習活動を可視化しておくとよい。</p>
      </div>

      <h3>1.6 学習目標の情報源</h3>
      <p>CSDの学習目標は、以下の一次資料に基づいて設計されています(詳細は巻末の参考文献を参照)。</p>
      <ul>
        <li>The Scrum Guide(Ken Schwaber & Jeff Sutherland, 2020年版)</li>
        <li>Manifesto for Agile Software Development(アジャイルソフトウェア開発宣言)とその背後にある12の原則</li>
        <li>Scrum Allianceが定義するスクラムの価値基準</li>
        <li>Kent Beck著「Extreme Programming Explained: Embrace Change」</li>
        <li>Agile Allianceの「Subway Map to Agile Practices」</li>
      </ul>
    </section>

    <!-- ===================== 03. Learning Objectives Structure ===================== -->
    <section id="learning-objectives-structure">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 03</div>
      <h2>学習目標の全体構造とブルームの分類法</h2>

      <h3>2.1 ブルームの分類法(Bloom's Taxonomy)</h3>
      <p>CSDの学習目標は、それぞれ「学習者が何をできるようになるか」を示す動詞から始まります。これは教育学における<strong>ブルームの分類法</strong>に基づいており、下位(知識の想起)から上位(判断・評価)へと段階的に思考レベルが上がる構造になっています。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>レベル</th><th>説明</th><th>代表的な動詞(英語)</th></tr></thead>
          <tbody>
            <tr><td>Knowledge(知識)</td><td>情報・プロセス・事実・概念を思い出す</td><td>Define, Name, List</td></tr>
            <tr><td>Comprehension(理解)</td><td>情報を解釈し重要性を判断する</td><td>Describe, Discuss, Recognize</td></tr>
            <tr><td>Application(応用)</td><td>知識や概念を実生活に適用する</td><td>Apply, Demonstrate, Illustrate</td></tr>
            <tr><td>Analysis(分析)</td><td>批判的思考で情報を分解・整理する</td><td>Compare, Contrast, Distinguish</td></tr>
            <tr><td>Synthesis(統合)</td><td>知識を使って新しい成果物やプロセスを作る</td><td>Create, Prepare, Organize</td></tr>
            <tr><td>Evaluation(評価)</td><td>判断力を用いて意思決定・問題解決する</td><td>Measure, Assess, Evaluate</td></tr>
          </tbody>
        </table>
      </div>
      </div>
      <p>各学習目標は「このコースを無事修了した学習者は、〜できるようになる」という文の後に続く形で定義されています。たとえば「define refactoring(リファクタリングを定義できる)」はKnowledgeレベル、「demonstrate working together as one team(ワンチームとして働くことを実演できる)」はApplicationレベル、というように読み解くとコースの意図が理解しやすくなります。</p>

      <h3>2.2 6つの学習カテゴリ</h3>
      <p>CSDの学習目標(Scrum Foundationsに追加される部分)は、次の6つのカテゴリに分類されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_LO_CATEGORY_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">CSD Learning Objectivesを構成する6つのカテゴリ</div>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>カテゴリ</th><th>学習目標数</th><th>主な焦点</th></tr></thead>
          <tbody>
            <tr><td>1. Lean, Agile & Scrum</td><td>6個(1.1〜1.6)</td><td>プロダクトバックログ運用、デイリースクラム、Doneの定義</td></tr>
            <tr><td>2. Collaboration & Team Dynamics</td><td>6個(2.1〜2.6)</td><td>チームワーク、ステークホルダーとの協働</td></tr>
            <tr><td>3. Architecture & Design</td><td>3個(3.1〜3.3)</td><td>技術的卓越性、アジャイルな設計原則</td></tr>
            <tr><td>4. Refactoring</td><td>2個(4.1〜4.2)</td><td>リファクタリングの定義と利点</td></tr>
            <tr><td>5. Test-Driven Development</td><td>4個(5.1〜5.4)</td><td>テストファースト、アジャイルテストの質</td></tr>
            <tr><td>6. Continuous Integration</td><td>3個(6.1〜6.3)</td><td>CIの定義、自動化パイプラインの利点</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <h3>2.3 Scrum Foundationsとの関係</h3>
      <p>CSDコースでは、上記6カテゴリに加えて<strong>Scrum Foundations学習目標</strong>(CSM/CSPO/CSDに共通する土台知識)も必ずカバーされます。CSD固有の学習目標は、あくまでScrum Foundationsの上に積み上がる「エンジニアリング寄りの追加レイヤー」という位置づけです。次章でこの土台部分を簡潔におさらいします。</p>
    </section>

    <!-- ===================== 04. Scrum Foundations Review ===================== -->
    <section id="scrum-foundations-review">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 04</div>
      <h2>土台となる知識: Scrum Foundations学習目標のおさらい</h2>

      <p>CSD受講者はScrum Foundationsの内容も理解している前提となるため、ここでは4つのカテゴリを要点だけ整理します。</p>

      <h3>3.1 Scrum Theory(スクラムの理論)— 経験主義</h3>
      <p>スクラムは<strong>経験主義(Empiricism)</strong>に基づくフレームワークです。経験主義は「知識は経験から生まれ、意思決定は観察された事実に基づいて行う」という考え方です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EMPIRICISM_PILLARS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">経験主義の3本柱とスクラムの5つの価値基準</div>
      </div>

      <ul>
        <li><strong>3つの経験主義の柱</strong>: 透明性・検査・適応</li>
        <li><strong>5つのスクラムの価値基準</strong>: 確約・集中・公開・尊敬・勇気</li>
        <li>反復的(Iterative)かつ漸進的(Incremental)なアプローチによって、不確実性の高いプロダクト開発におけるリスクを制御する</li>
      </ul>

      <h3>3.2 The Scrum Team(スクラムチーム)</h3>
      <p>スクラムチームは<strong>プロダクトオーナー・スクラムマスター・開発者</strong>という3つのアカウンタビリティで構成される、機能横断的(Cross-functional)かつ自己管理型(Self-managing)のチームです。CSDが焦点を当てる「開発者」は、この中でインクリメントを実際に作り出す役割を担います。</p>

      <h3>3.3 Scrum Events and Activities(イベントと活動)</h3>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>イベント</th><th>目的</th><th>最大タイムボックス(1か月スプリントの場合)</th></tr></thead>
          <tbody>
            <tr><td>スプリントプランニング</td><td>スプリントで行う作業を計画する</td><td>8時間</td></tr>
            <tr><td>デイリースクラム</td><td>開発者が進捗を同期し翌24時間の計画を調整する</td><td>15分</td></tr>
            <tr><td>スプリントレビュー</td><td>インクリメントを検査しフィードバックを得る</td><td>4時間</td></tr>
            <tr><td>スプリントレトロスペクティブ</td><td>チームの働き方を検査し改善計画を立てる</td><td>3時間</td></tr>
          </tbody>
        </table>
      </div>
      </div>
      <p>プロダクトバックログリファインメントも重要な活動として位置づけられており、スプリント期間中を通じて継続的に行われます。</p>

      <h3>3.4 Scrum Artifacts and Commitments(作成物とコミットメント)</h3>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>作成物</th><th>コミットメント</th><th>役割</th></tr></thead>
          <tbody>
            <tr><td>プロダクトバックログ</td><td>プロダクトゴール</td><td>プロダクトの将来の姿を表す、創発的で並び替え可能な一覧</td></tr>
            <tr><td>スプリントバックログ</td><td>スプリントゴール</td><td>そのスプリントで達成したい単一の目的</td></tr>
            <tr><td>インクリメント</td><td>Doneの定義</td><td>完成の共通理解を満たした、検査可能な成果物の積み重ね</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <p>本章の内容はScrum Alliance「Scrum Foundations Learning Objectives」および公式The Scrum Guideに基づきます(巻末参照)。</p>
      </div>
    </section>

    <!-- ===================== 05. Category 1: Lean, Agile & Scrum ===================== -->
    <section id="category-lean-agile-scrum">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 05</div>
      <h2>カテゴリ1: Lean, Agile & Scrum</h2>

      <p>このカテゴリでは、開発者の日々の作業がスクラムの作成物やイベントとどう結びつくかを学びます。</p>

      <h3>4.1(学習目標1.1)スプリントバックログを活用する</h3>
      <p><strong>説明</strong>: スプリントバックログは、スプリントゴール・選択されたプロダクトバックログアイテム(PBI)・それらを届けるための計画から構成される、開発者が所有する作業計画です。単なるToDoリストではなく、<strong>リアルタイムで更新され続ける、その日その日の作業計画</strong>として機能します。</p>

      <p><strong>ステップバイステップ</strong>:</p>
      <ol class="step-list">
        <li>
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">PBIを配置する</div>
            <div class="step-desc">スプリントプランニングで選択したPBIをスプリントバックログに配置する。</div>
          </div>
        </li>
        <li>
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">タスクに分解する</div>
            <div class="step-desc">PBIを実装可能な単位のタスクに分解する(分解は開発者自身が行う)。</div>
          </div>
        </li>
        <li>
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">毎日更新する</div>
            <div class="step-desc">スプリント期間中、進捗に応じてスプリントバックログを毎日更新する。</div>
          </div>
        </li>
        <li>
          <div class="step-num">4</div>
          <div class="step-body">
            <div class="step-title">計画を調整する</div>
            <div class="step-desc">新しい情報が判明したら、スプリントゴールを損なわない範囲で計画を調整する。</div>
          </div>
        </li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>スプリントバックログは「計画時点で固定」ではなく「生きたドキュメント」として扱う。実装を進める中で見えてきた作業を随時追加・削除してよい。</li>
          <li>タスクの粒度は「1日以内に完了状況を判断できる」大きさに分解すると、デイリースクラムでの状況共有がしやすくなる。</li>
        </ul>
      </div>

      <h3>4.2(学習目標1.2)PBIをインクリメントに変換する責任</h3>
      <p><strong>説明</strong>: プロダクトバックログアイテムをインクリメント(価値の増分)に変換する責任は、開発者を含むスクラムチーム全体にあります。プロダクトオーナーが「何を作るか」の優先順位を示し、開発者が「どう作るか」を決めて実際に動くソフトウェアへと変換します。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「Doneの定義」を満たさない限りインクリメントとして数えない、という基準をチーム全員が共有する。</li>
          <li>PBIの実装中に技術的な不明点が出た場合、実装を止めてプロダクトオーナーと会話するハードルを下げておく。</li>
        </ul>
      </div>

      <h3>4.3(学習目標1.3)デイリースクラムを実践する</h3>
      <p><strong>説明</strong>: デイリースクラムは、開発者がスプリントゴールに向けた進捗を検査し、翌24時間の作業を計画するための15分のイベントです。ステータス報告会ではなく、<strong>開発者自身のための計画調整の場</strong>である点が重要です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DAILY_SCRUM_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">デイリースクラムにおける進捗検査から翌24時間の計画調整までの流れ</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「昨日やったこと・今日やること・障害」の3点フォーマットに固執しすぎず、スプリントゴール達成に向けた対話を優先する。</li>
          <li>詳細な技術議論が必要になった場合は、デイリースクラムの15分内で終わらせず「別途この後話しましょう」と切り出す文化を作る。</li>
        </ul>
      </div>

      <h3>4.4(学習目標1.4)PBIの属性を理解する</h3>
      <p><strong>説明</strong>: 良いプロダクトバックログアイテムには、共通して見られる属性があります。少なくとも3つ挙げるとすれば、次のようなものが代表的です。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>属性</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>説明(Description)</td><td>何を実現したいかが明確に記述されている</td></tr>
            <tr><td>順序(Order)</td><td>プロダクトバックログ内で優先順位づけされている</td></tr>
            <tr><td>見積り(Estimate)</td><td>相対的な規模や複雑さの見積りが付与されている</td></tr>
            <tr><td>価値(Value)</td><td>ビジネス上または顧客にとっての価値が示されている</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース補足</div>
        <p>PBIが備えるべき性質として、業界で広く参照される考え方に<strong>INVEST</strong>(独立している・交渉可能・価値がある・見積り可能・小さい・テスト可能)があります。詳細はAgile Allianceのグロッサリーを参照してください。</p>
      </div>

      <h3>4.5(学習目標1.5)プロダクトバックログリファインメントでの検査と適応</h3>
      <p><strong>説明</strong>: プロダクトバックログリファインメントとは、プロダクトバックログの項目に詳細・見積り・順序を追加していく継続的な活動です。スクラムチームは、この活動を通じてPBIを繰り返し検査し、必要に応じて適応させます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_BACKLOG_REFINEMENT_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">プロダクトバックログリファインメントにおける検査と適応のループ</div>
      </div>

      <p><strong>インスペクト&amp;アダプトの具体例</strong>:</p>
      <ol>
        <li>大きすぎるPBIをユーザーストーリーマッピングなどの手法で小さく分割する。</li>
        <li>実装が進んで得られた技術的知見をもとに見積りを更新する。</li>
        <li>市場や顧客の状況変化に応じてPBIの優先順位を並び替える。</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>リファインメントを「スプリントの最後にまとめてやる」のではなく、スプリント全体を通じて少しずつ実施する(一般的な目安として、開発者の作業時間の約10%を充てるという慣行がよく紹介されます)。</p>
      </div>

      <h3>4.6(学習目標1.6)Doneの定義が透明性を高める仕組み</h3>
      <p><strong>説明</strong>: Doneの定義(Definition of Done)は、インクリメントが満たすべき品質基準を明文化したものです。これにより、チームやステークホルダーは「本当に完成しているのか」を共通の物差しで判断できるようになります。</p>

      <p><strong>透明性を高める要素の例(少なくとも5つ)</strong>:</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>要素</th><th>透明性への貢献</th></tr></thead>
          <tbody>
            <tr><td>コードレビュー完了</td><td>品質基準が満たされたことをチーム全員が確認できる</td></tr>
            <tr><td>自動テスト合格</td><td>動作保証の水準が客観的に示される</td></tr>
            <tr><td>ドキュメント更新</td><td>仕様変更が関係者に共有される</td></tr>
            <tr><td>デプロイ可能な状態</td><td>「完成」が実際にリリース可能な状態を意味することが明確になる</td></tr>
            <tr><td>受け入れ基準の充足</td><td>プロダクトオーナーの期待との整合が確認できる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DEFINITION_OF_DONE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Doneの定義が透明性の向上を通じて的確な適応判断につながる流れ</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>Doneの定義は一度決めたら終わりではなく、チームの能力向上や組織標準の変化に応じて徐々に厳格化していく。複数チームが同じプロダクトに取り組む場合は、Doneの定義を共有・統一する。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <p>本章全体はScrum Alliance「CSD Learning Objectives」カテゴリ1、およびThe Scrum Guideの該当箇所に基づきます。</p>
      </div>
    </section>

    <!-- ===================== 06. Category 2: Collaboration & Team Dynamics ===================== -->
    <section id="category-collaboration">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 06</div>
      <h2>カテゴリ2: Collaboration & Team Dynamics</h2>

      <h3>5.1(学習目標2.1)ワーキンググループとチームの違い</h3>
      <p><strong>説明</strong>: 「ワーキンググループ」と「チーム」は似て非なる概念です。少なくとも3つの違いを理解しておくことが求められます。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>ワーキンググループ</th><th>チーム</th></tr></thead>
          <tbody>
            <tr><td>目標</td><td>個人ごとの目標の集合</td><td>共有された単一の目標</td></tr>
            <tr><td>成果への責任</td><td>個人が自分の成果に責任を持つ</td><td>チーム全体で成果に責任を持つ</td></tr>
            <tr><td>協働の度合い</td><td>情報共有が中心、作業は個別に進む</td><td>作業そのものを協働で進める</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <h3>5.2(学習目標2.2)効果的なチームの属性</h3>
      <p>少なくとも3つの属性が挙げられます。</p>
      <ul>
        <li><strong>心理的安全性</strong>: 失敗やわからないことを言い出せる雰囲気がある</li>
        <li><strong>機能横断性</strong>: チーム内に必要なスキルが揃っている</li>
        <li><strong>自己管理力</strong>: 誰が何をどうやるかをチーム自身で決められる</li>
      </ul>

      <h3>5.3(学習目標2.3)「ワンチームとして働く」を実演する</h3>
      <p><strong>説明</strong>: これはApplicationレベルの目標であり、知識としてではなく行動として実演することが求められます。ペアプログラミングやモブプログラミング、スウォーミング(一つの作業に複数人が協力して取り組むこと)などが典型的な実演方法です。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>個人ごとにタスクを「担当者」として割り当てるのではなく、PBI単位でチームが集まって取り組む「スウォーミング」の考え方を導入すると、属人化を防ぎながらチームとしての一体感が生まれる。</p>
      </div>

      <h3>5.4(学習目標2.4)開発者が顧客・ユーザーと直接対話する利点</h3>
      <p>少なくとも3つの利点が挙げられます。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>利点</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>要求の解像度が上がる</td><td>又聞きによる情報の劣化を防ぎ、意図を正確に把握できる</td></tr>
            <tr><td>フィードバックサイクルが短縮される</td><td>実装の早い段階で誤解を修正できる</td></tr>
            <tr><td>開発者のモチベーション向上</td><td>自分の仕事が誰にどう使われるかを実感できる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <h3>5.5(学習目標2.5)ステークホルダー・顧客・ユーザーとのコラボレーション方法</h3>
      <p>スプリント期間中にコラボレーションが発生し得るタイミングの例です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_STAKEHOLDER_COLLAB_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">スプリントプランニングから開発期間、スプリントレビューを通じたステークホルダーとの協働サイクル</div>
      </div>

      <p>少なくとも3つの方法:</p>
      <ol>
        <li>スプリントレビューにステークホルダーを招き、実際のインクリメントに触れてもらう。</li>
        <li>開発期間中に軽量なユーザビリティテストやモックアップレビューを挟む。</li>
        <li>プロダクトオーナーを介さず、開発者が直接ドメインエキスパートに質問できる関係を築く。</li>
      </ol>

      <h3>5.6(学習目標2.6)チームとして共にインクリメントを共創する</h3>
      <p><strong>説明</strong>: これもApplicationレベルの目標で、「共に作る(Co-create)」ことを実演します。個々人が担当箇所を分担して最後に結合するのではなく、設計段階から実装、テストまでを協働で進めるスタイルを指します。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>実装前に短い「クイックデザインセッション」をチームで行い、インターフェースや責務分担について合意してから着手すると、後工程での手戻りが減る。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <p>本章はScrum Alliance「CSD Learning Objectives」カテゴリ2に基づきます。</p>
      </div>
    </section>

    <!-- ===================== 07. Category 3: Architecture & Design ===================== -->
    <section id="category-architecture-design">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:schema" aria-hidden="true" />SECTION 07</div>
      <h2>カテゴリ3: Architecture & Design</h2>

      <h3>6.1(学習目標3.1)技術的卓越性の利点</h3>
      <p>少なくとも3つの利点が挙げられます。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>利点</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>持続可能なペースの実現</td><td>技術的負債が抑制され、長期にわたり安定した開発速度を維持できる</td></tr>
            <tr><td>変更容易性の向上</td><td>要求変化への対応コストが下がり、アジャイルの本質である「変化への対応」が可能になる</td></tr>
            <tr><td>品質と信頼の向上</td><td>欠陥が減り、ステークホルダーからの信頼を得やすくなる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <h3>6.2(学習目標3.2)アジャイルチームにおける設計プラクティス</h3>
      <p><strong>説明</strong>: アジャイル開発では、大規模な事前設計(Big Design Up Front)ではなく、<strong>創発的設計(Emergent Design)</strong>の考え方を取ります。</p>
      <p><strong>代表的なプラクティスの例</strong>:</p>
      <ul>
        <li><strong>シンプルな設計(Simple Design)</strong>: 「今必要な機能を、最もシンプルな形で実装する」という原則</li>
        <li><strong>クイックデザインセッション</strong>: 実装直前に短時間で設計方針をチームで合意する</li>
        <li><strong>CRCカード(Class-Responsibility-Collaborator)</strong>: オブジェクトの責務と協調関係を簡易に可視化する手法</li>
      </ul>

      <h3>6.3(学習目標3.3)アジャイル環境におけるアーキテクチャの原則</h3>
      <p>少なくとも3つの原則が挙げられます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_AGILE_ARCHITECTURE_PRINCIPLES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">アジャイル環境におけるアーキテクチャの3つの原則</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>アーキテクチャドキュメントを一度作って終わりにせず、実装から得られた知見を反映して継続的に更新する。</li>
          <li>「将来使うかもしれない」機能を先回りして作り込む(過剰設計)を避け、YAGNI(You Aren't Gonna Need It)の原則を意識する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <p>本章はScrum Alliance「CSD Learning Objectives」カテゴリ3に基づきます。関連する実務知見はScrum Allianceのリソースライブラリ記事「Software Architecture in Scrum」でも紹介されています(巻末参照)。</p>
      </div>
    </section>

    <!-- ===================== 08. Category 4: Refactoring ===================== -->
    <section id="category-refactoring">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:tool" aria-hidden="true" />SECTION 08</div>
      <h2>カテゴリ4: Refactoring</h2>

      <h3>7.1(学習目標4.1)リファクタリングを定義する</h3>
      <p><strong>説明</strong>: リファクタリングとは、<strong>ソフトウェアの外部から見た振る舞いを変えずに、内部構造を改善すること</strong>です。バグ修正でも新機能追加でもなく、「コードをきれいにする」ことそのものが目的の活動です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_REFACTORING_DEFINITION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">振る舞いを変えずに内部構造だけを段階的に改善するリファクタリングの考え方</div>
      </div>

      <p><strong>ステップバイステップ(典型的な進め方)</strong>:</p>
      <ol class="step-list">
        <li>
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">テストの存在を確認する</div>
            <div class="step-desc">変更対象のコードに対する自動テストが存在することを確認する(なければ先に用意する)。</div>
          </div>
        </li>
        <li>
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">コードの臭いを特定する</div>
            <div class="step-desc">「コードの臭い(Code Smell)」— 重複コード、長すぎるメソッド、深いネストなど — を特定する。</div>
          </div>
        </li>
        <li>
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">小さな単位で実施する</div>
            <div class="step-desc">小さな単位でリファクタリングを行い、都度テストを実行して振る舞いが変わっていないことを確認する。</div>
          </div>
        </li>
        <li>
          <div class="step-num">4</div>
          <div class="step-body">
            <div class="step-title">コミットを分割する</div>
            <div class="step-desc">コミットを小さく分け、いつでも安全に元に戻せる状態を保つ。</div>
          </div>
        </li>
      </ol>

      <h3>7.2(学習目標4.2)リファクタリングの利点</h3>
      <p>少なくとも3つの利点が挙げられます。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>利点</th><th>アジャイル開発への貢献</th></tr></thead>
          <tbody>
            <tr><td>可読性の向上</td><td>チームメンバー間の理解速度が上がり、コラボレーションが促進される</td></tr>
            <tr><td>変更容易性の向上</td><td>次のPBIを実装する際の変更コストが下がる</td></tr>
            <tr><td>技術的負債の抑制</td><td>スプリントを重ねても開発速度が落ちにくくなる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>リファクタリング専用の「特別なスプリント」を設けるのではなく、日々の開発サイクルの中に小さく組み込む(ボーイスカウトルール: 「来た時よりも美しく」)。</li>
          <li>テストが存在しないレガシーコードに対しては、まず「特性化テスト(Characterization Test)」で現在の振る舞いを固定してからリファクタリングに着手する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <p>本章の定義はMartin Fowler「Refactoring」(refactoring.com)およびAgile Allianceグロッサリーの定義と一致します(巻末参照)。</p>
      </div>
    </section>

    <!-- ===================== 09. Category 5: Test-Driven Development ===================== -->
    <section id="category-tdd">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flask" aria-hidden="true" />SECTION 09</div>
      <h2>カテゴリ5: Test-Driven Development(TDD)</h2>

      <h3>8.1(学習目標5.1)テストファーストという設計・開発アプローチ</h3>
      <p><strong>説明</strong>: テストファースト(Test-First)とは、プロダクションコードを書く前に、まずそのコードが満たすべき振る舞いを検証する<strong>失敗するテスト</strong>を書くアプローチです。これはTDDの出発点であり、単なるテスト手法ではなく<strong>設計手法</strong>として位置づけられます。</p>
      <p><strong>少なくとも3つの利点</strong>:</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>利点</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>設計の明確化</td><td>「どう使われるべきか」を先に考えることで、使いやすいインターフェースが生まれる</td></tr>
            <tr><td>安全網の確保</td><td>実装と同時にリグレッションテストが蓄積される</td></tr>
            <tr><td>スコープの明確化</td><td>「先に書いたテストが対象の振る舞いを検証して通る」ことが、その振る舞いを実装し終えた判断基準になる(PBIの完了は、これに加えてレビュー・ドキュメント・デプロイ可能性・受け入れ基準といったDoneの基準を満たして初めて成立する)</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <h3>8.2(学習目標5.2)伝統的テストとアジャイルテストの違い</h3>
      <p>少なくとも3つの違いが挙げられます。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>伝統的テスト</th><th>アジャイルテスト</th></tr></thead>
          <tbody>
            <tr><td>タイミング</td><td>実装完了後、フェーズの最後にまとめて実施</td><td>実装と並行して継続的に実施</td></tr>
            <tr><td>主な担当</td><td>専任のQAチームが後工程で担当</td><td>開発者を含むチーム全体が責任を持つ</td></tr>
            <tr><td>フィードバック速度</td><td>遅い(フェーズの境目でしか分からない)</td><td>速い(コミットのたびに分かる)</td></tr>
            <tr><td>自動化の比重</td><td>手動テストの比重が高い傾向</td><td>自動テストを土台に据える</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <h3>8.3(学習目標5.3)TDDサイクルにおけるリファクタリングの重要性</h3>
      <p><strong>説明</strong>: TDDは「Red &rarr; Green &rarr; Refactor」という3ステップのサイクルで進みます。リファクタリングのステップを省略してしまうと、テストは通っていても内部構造が徐々に劣化し、TDDの本来の効果が失われてしまいます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TDD_RED_GREEN_REFACTOR" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Red、Green、Refactorを繰り返すTDDのサイクル</div>
      </div>

      <p><strong>ステップバイステップ</strong>:</p>
      <ol class="step-list">
        <li>
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Red</div>
            <div class="step-desc">これから実装する振る舞いを表す、失敗するテストを1つ書く。</div>
          </div>
        </li>
        <li>
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Green</div>
            <div class="step-desc">そのテストを通すために必要最小限のコードを書く(美しさは後回しでよい)。</div>
          </div>
        </li>
        <li>
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">Refactor</div>
            <div class="step-desc">テストが通っている状態を保ちながら、コードの重複を除去し構造を整える。</div>
          </div>
        </li>
        <li>
          <div class="step-num">4</div>
          <div class="step-body">
            <div class="step-title">次のサイクルへ</div>
            <div class="step-desc">次の振る舞いについて1に戻る。</div>
          </div>
        </li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>「Green」の段階では意図的に泥臭い実装を許容し、「Refactor」の段階で初めて設計を磨く、という役割分担を徹底する。両方を同時にやろうとすると、テストが通らない時間が長引きやすい。</p>
      </div>

      <h3>8.4(学習目標5.4)良いアジャイルテストアプローチの質</h3>
      <p>少なくとも3つの質が挙げられます。</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>質</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>高速に実行できる</td><td>開発者が頻繁に実行し続けられるフィードバックループを保つ</td></tr>
            <tr><td>独立している</td><td>テスト同士が互いに依存せず、順序を問わず実行できる</td></tr>
            <tr><td>意図が明確である</td><td>テストコード自体がドキュメントとして機能する(振る舞いの仕様書になる)</td></tr>
            <tr><td>決定的である</td><td>同じ条件では常に同じ結果を返す(Flakyでない)</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>TDDを補完する考え方として、ビジネス側にも理解しやすい形でテストを記述する<strong>BDD(Behavior-Driven Development)</strong>や、顧客と一緒に受け入れ基準を先に定義する<strong>ATDD(Acceptance Test-Driven Development)</strong>もアジャイルテストの重要な発展形です。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <p>本章はScrum Alliance「CSD Learning Objectives」カテゴリ5、およびKent Beck「Extreme Programming Explained」のテストファーストに関する記述、Agile Allianceグロッサリー(TDD / Unit Test / Mock Objects / ATDD / BDD)に基づきます(巻末参照)。</p>
      </div>
    </section>

    <!-- ===================== 10. Category 6: Continuous Integration ===================== -->
    <section id="category-ci">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-merge" aria-hidden="true" />SECTION 10</div>
      <h2>カテゴリ6: Continuous Integration(CI)</h2>

      <h3>9.1(学習目標6.1)継続的インテグレーションの定義と利点</h3>
      <p><strong>説明</strong>: 継続的インテグレーション(Continuous Integration, CI)とは、<strong>開発者が自分の作業を頻繁に(少なくとも1日に1回以上)共有のメインラインに統合し、その都度自動ビルド・自動テストで検証するプラクティス</strong>です。</p>
      <p><strong>少なくとも3つの利点</strong>:</p>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>利点</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>統合の問題を早期発見</td><td>「マージ地獄」を避け、コンフリクトを小さいうちに解決できる</td></tr>
            <tr><td>品質の可視化</td><td>ビルドやテストの成否がチーム全員にリアルタイムで共有される</td></tr>
            <tr><td>リリース準備の常態化</td><td>いつでもリリース可能な状態に近いコードベースを維持できる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <h3>9.2(学習目標6.2)スクラムチームがCIから得られる利益の例</h3>
      <p>少なくとも3つの例が挙げられます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CI_TEAM_BENEFITS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">継続的インテグレーションがスクラムチームにもたらす3つの利益</div>
      </div>

      <ol>
        <li>スプリントレビューで見せるインクリメントが、常に統合済みで動作確認済みの状態になる。</li>
        <li>デイリースクラムで「統合できていない」というブロッカーが発生しにくくなる。</li>
        <li>スプリント終盤に統合作業がまとめて発生する「ミニウォーターフォール」を防げる。</li>
      </ol>

      <h3>9.3(学習目標6.3)自動化されたビルド・テスト・測定パイプラインの利点</h3>
      <p><strong>説明</strong>: CIをさらに一歩進めると、コードのコミットをきっかけに<strong>ビルド &rarr; テスト &rarr; 測定(コード品質やカバレッジの計測)</strong>までを自動で実行する「パイプライン」を構築できます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CI_AUTOMATED_PIPELINE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">コミットからビルド・テスト・測定・フィードバックまでの自動化パイプライン</div>
      </div>

      <p><strong>少なくとも1つの利点</strong>: ビルド・テスト・各種メトリクスの計測といった反復的な確認作業を自動化し、人手で繰り返す手間を減らせるため、フィードバックが速く、かつ一貫した基準で毎回同じように検証される(コードレビュー・探索的テスト・受け入れ確認・リリース判断といった人間による判断を置き換えるものではない)。これにより、開発者は「動くはず」ではなく「検証済み」という確信を持って次の作業に進める。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>パイプラインの実行時間を短く保つ(目安として数分以内)。遅いパイプラインは「後で確認すればいい」という後回しの温床になる。</li>
          <li>テストが失敗した状態のビルドを放置しない文化(Stop the Line)をチームで合意しておく。</li>
          <li>継続的インテグレーションの先には、自動で本番環境への配布まで行う<strong>継続的デプロイメント(Continuous Deployment)</strong>という発展形もある。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <p>本章はScrum Alliance「CSD Learning Objectives」カテゴリ6、Agile Allianceグロッサリー(Continuous Integration / Automated Build / Continuous Deployment)に基づきます(巻末参照)。</p>
      </div>
    </section>

    <!-- ===================== 11. XP Integration Map ===================== -->
    <section id="xp-integration-map">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 11</div>
      <h2>エンジニアリングプラクティス統合マップ(XP &times; Scrum)</h2>

      <p>CSDのカテゴリ3〜6(Architecture & Design、Refactoring、TDD、CI)は、実は単独のプラクティスではなく、<strong>Extreme Programming(XP)</strong>に由来する複数のプラクティスが互いに支え合うことで成立しています。CSD Learning Objectivesの情報源にKent Beckの著書とAgile Allianceの「Subway Map to Agile Practices」が挙げられているのはこのためです。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_XP_PRACTICE_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">TDD・リファクタリング・シンプルな設計・CI・集団所有・ペアプログラミングが互いを支え合う輪</div>
      </div>

      <p>この輪は、どれか一つが欠けると他のプラクティスの効果も弱まる、という相互依存の関係を表しています。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>プラクティス</th><th>このプラクティスを支える理由</th><th>支えられる理由</th></tr></thead>
          <tbody>
            <tr><td>TDD</td><td>安全網としてリファクタリングを可能にする</td><td>シンプルな設計をテストで検証する</td></tr>
            <tr><td>Refactoring</td><td>テストがあるからこそ安全に実行できる</td><td>シンプルな設計を維持し続ける原動力になる</td></tr>
            <tr><td>Simple Design</td><td>リファクタリングによって維持される</td><td>CIで統合しやすいコードベースを生む</td></tr>
            <tr><td>Continuous Integration</td><td>シンプルな設計と自動テストが土台になる</td><td>集団所有制のコードベースを健全に保つ</td></tr>
            <tr><td>Collective Code Ownership</td><td>CIによる頻繁な統合が前提になる</td><td>ペアプログラミングによる知識共有を後押しする</td></tr>
            <tr><td>Pair Programming</td><td>集団所有制の文化を根づかせる</td><td>TDDのRed-Green-Refactorを2人で回すことで質が上がる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>CSDカテゴリ</th><th>対応するXPプラクティス</th><th>Agile Allianceグロッサリー</th></tr></thead>
          <tbody>
            <tr><td>Architecture & Design</td><td>Simple Design, Quick Design Session, CRC Cards</td><td><a href="https://agilealliance.org/glossary/simple-design" target="_blank" rel="noopener">simple-design</a>, <a href="https://agilealliance.org/glossary/crc-cards/" target="_blank" rel="noopener">crc-cards</a></td></tr>
            <tr><td>Refactoring</td><td>Refactoring</td><td><a href="https://agilealliance.org/glossary/refactoring/" target="_blank" rel="noopener">refactoring</a></td></tr>
            <tr><td>Test-Driven Development</td><td>TDD, Unit Tests, Mock Objects, ATDD, BDD</td><td><a href="https://agilealliance.org/glossary/tdd/" target="_blank" rel="noopener">tdd</a>, <a href="https://agilealliance.org/glossary/unit-test/" target="_blank" rel="noopener">unit-test</a></td></tr>
            <tr><td>Continuous Integration</td><td>Continuous Integration, Automated Build, Continuous Deployment</td><td><a href="https://agilealliance.org/glossary/continuous-integration/" target="_blank" rel="noopener">continuous-integration</a></td></tr>
            <tr><td>(関連する協働プラクティス)</td><td>Pair Programming, Collective Ownership</td><td><a href="https://agilealliance.org/glossary/pair-programming" target="_blank" rel="noopener">pair-programming</a>, <a href="https://agilealliance.org/glossary/collective-ownership/" target="_blank" rel="noopener">collective-ownership</a></td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>これらのプラクティスを「どれか1つだけ」導入しようとすると効果が出にくい。たとえばTDDだけを導入してリファクタリングを怠ると、テストコードとプロダクションコードの両方が徐々に複雑化してしまう。可能であれば小さなチームからでもセットで試すことを推奨する。</p>
      </div>
    </section>

    <!-- ===================== 12. Best Practices Checklist ===================== -->
    <section id="best-practices-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 12</div>
      <h2>ベストプラクティス総合チェックリスト</h2>

      <p>CSDで扱う6カテゴリについて、現場で実践する際のチェックリストとして整理しました。</p>

      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>カテゴリ</th><th>チェック項目</th></tr></thead>
          <tbody>
            <tr><td>Lean, Agile & Scrum</td><td>スプリントバックログを毎日更新しているか / Doneの定義がチームで明文化・共有されているか / リファインメントをスプリント全体に分散して実施しているか</td></tr>
            <tr><td>Collaboration & Team Dynamics</td><td>開発者がステークホルダーと直接対話する機会があるか / 個人ではなくチーム単位でPBIに取り組んでいるか</td></tr>
            <tr><td>Architecture & Design</td><td>過剰設計(YAGNI違反)を避けているか / 設計判断をチームで合意する場があるか</td></tr>
            <tr><td>Refactoring</td><td>テストがない状態でリファクタリングを始めていないか / リファクタリングを日常のサイクルに組み込んでいるか</td></tr>
            <tr><td>Test-Driven Development</td><td>テストを実装より先に書く習慣があるか / テストが高速・独立・決定的であるか</td></tr>
            <tr><td>Continuous Integration</td><td>1日1回以上メインラインに統合しているか / ビルド失敗を放置しない文化があるか</td></tr>
          </tbody>
        </table>
      </div>
      </div>
    </section>

    <!-- ===================== 13. Career Path and Renewal ===================== -->
    <section id="career-path-renewal">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 13</div>
      <h2>認定取得後のキャリアパスと更新</h2>

      <h3>12.1 キャリアパス全体像</h3>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CAREER_PATH_RENEWAL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">CSD取得から実践、更新、A-CSD・CSP-Dへのステップアップまでのキャリアパス</div>
      </div>

      <h3>12.2 SEUによる更新の考え方</h3>
      <div class="table-wrap">
        <div class="table-wrap">
        <table>
          <thead><tr><th>学習活動の例</th><th>SEU換算の考え方(目安)</th></tr></thead>
          <tbody>
            <tr><td>Scrum Allianceの記事を読む</td><td>短時間の学習として少量のSEUが認められる</td></tr>
            <tr><td>ウェビナーやカンファレンスセッションに参加する</td><td>参加時間に応じたSEUが認められる</td></tr>
            <tr><td>追加の認定コースを受講する</td><td>まとまった時間分のSEUが認められる</td></tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>実際のSEU算定基準は活動カテゴリごとに定められています。最新の基準は巻末のSEU公式ページで確認してください。</p>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>A-CSDやCSP-Dを見据えている場合、CSD取得直後から「どのプラクティスをどの程度実務に定着させたか」を振り返りとして記録しておくと、上位資格の申請時に実務経験の証跡として活用しやすい。</p>
      </div>
    </section>

    <!-- ===================== 14. Summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 14</div>
      <h2>まとめ</h2>

      <p>CSDは、スクラムの型を知っているだけでなく、<strong>技術的卓越性をチームで追求する姿勢</strong>そのものを評価する資格です。本ガイドで扱った6つのカテゴリは、単独の知識としてではなく、次のような一つのつながりとして理解すると定着しやすくなります。</p>

      <ol>
        <li><strong>Lean, Agile & Scrum</strong>: スクラムの作成物・イベントを正しく運用する土台</li>
        <li><strong>Collaboration & Team Dynamics</strong>: その土台の上でチームとして機能する力</li>
        <li><strong>Architecture & Design</strong>: 変化に強いプロダクトを設計する力</li>
        <li><strong>Refactoring</strong>: 設計を健全に保ち続ける習慣</li>
        <li><strong>Test-Driven Development</strong>: 安全に変更し続けるための安全網</li>
        <li><strong>Continuous Integration</strong>: チーム全体の作業を常に統合された状態に保つ仕組み</li>
      </ol>

      <p>これらはCSDコース内の座学だけで身につくものではなく、<strong>実務での反復練習</strong>によって初めて定着します。認定取得をゴールにするのではなく、認定取得を「実践を始めるきっかけ」として捉えることをおすすめします。</p>
    </section>

    <!-- ===================== 15. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 15</div>
      <h2>参考文献・出典一覧</h2>

      <div class="ref-group">
        <h4>一次情報源(Scrum Alliance公式)</h4>
        <ul class="ref-list">
          <li><span class="ref-name">Certified Scrum Developer(CSD)公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer</a></li>
          <li><span class="ref-name">CSD Learning Objectives(PDF, 2024)</span><a class="ref-url" href="https://www.scrumalliance.org/docs/default-source/certification/learning-objectives/csd_learning_objectives_2024.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/docs/default-source/certification/learning-objectives/csd_learning_objectives_2024.pdf</a></li>
          <li><span class="ref-name">Scrum Foundations Learning Objectives(PDF, 2022)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf</a></li>
          <li><span class="ref-name">Advanced Certified Scrum Developer(A-CSD)公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer</a></li>
          <li><span class="ref-name">Certified Scrum Professional - Developer(CSP-D)公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers</a></li>
          <li><span class="ref-name">Scrum Education Units(SEU)について</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
          <li><span class="ref-name">Scrumの価値基準</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
          <li><span class="ref-name">Software Architecture in Scrum(関連リソース記事)</span><a class="ref-url" href="https://resources.scrumalliance.org/article/software-architecture-scrum" target="_blank" rel="noopener">https://resources.scrumalliance.org/article/software-architecture-scrum</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h4>一次情報源(フレームワーク・原則)</h4>
        <ul class="ref-list">
          <li><span class="ref-name">The Scrum Guide(Ken Schwaber & Jeff Sutherland, 2020)</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
          <li><span class="ref-name">Manifesto for Agile Software Development</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          <li><span class="ref-name">アジャイル宣言の背後にある12の原則</span><a class="ref-url" href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/principles.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h4>二次情報源(エンジニアリングプラクティスの解説)</h4>
        <ul class="ref-list">
          <li><span class="ref-name">Agile Alliance: Subway Map to Agile Practices</span><a class="ref-url" href="https://agilealliance.org/agile101/subway-map-to-agile-practices/" target="_blank" rel="noopener">https://agilealliance.org/agile101/subway-map-to-agile-practices/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Refactoring</span><a class="ref-url" href="https://agilealliance.org/glossary/refactoring/" target="_blank" rel="noopener">https://agilealliance.org/glossary/refactoring/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: TDD</span><a class="ref-url" href="https://agilealliance.org/glossary/tdd/" target="_blank" rel="noopener">https://agilealliance.org/glossary/tdd/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Unit Test</span><a class="ref-url" href="https://agilealliance.org/glossary/unit-test/" target="_blank" rel="noopener">https://agilealliance.org/glossary/unit-test/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Continuous Integration</span><a class="ref-url" href="https://agilealliance.org/glossary/continuous-integration/" target="_blank" rel="noopener">https://agilealliance.org/glossary/continuous-integration/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Continuous Deployment</span><a class="ref-url" href="https://agilealliance.org/glossary/continuous-deployment/" target="_blank" rel="noopener">https://agilealliance.org/glossary/continuous-deployment/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Pair Programming</span><a class="ref-url" href="https://agilealliance.org/glossary/pair-programming/" target="_blank" rel="noopener">https://agilealliance.org/glossary/pair-programming/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Collective Ownership</span><a class="ref-url" href="https://agilealliance.org/glossary/collective-ownership/" target="_blank" rel="noopener">https://agilealliance.org/glossary/collective-ownership/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Simple Design</span><a class="ref-url" href="https://agilealliance.org/glossary/simple-design" target="_blank" rel="noopener">https://agilealliance.org/glossary/simple-design</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Definition of Done</span><a class="ref-url" href="https://agilealliance.org/glossary/definition-of-done/" target="_blank" rel="noopener">https://agilealliance.org/glossary/definition-of-done/</a></li>
          <li><span class="ref-name">Agile Alliance Glossary: Backlog Refinement</span><a class="ref-url" href="https://agilealliance.org/glossary/backlog-refinement/" target="_blank" rel="noopener">https://agilealliance.org/glossary/backlog-refinement/</a></li>
          <li><span class="ref-name">Martin Fowler: Refactoring(refactoring.com)</span><a class="ref-url" href="https://refactoring.com/" target="_blank" rel="noopener">https://refactoring.com/</a></li>
          <li><span class="ref-name">Kent Beck『Extreme Programming Explained: Embrace Change』(書籍, Addison-Wesley)</span><span class="ref-url">オンライン版なし(書籍のみ)</span></li>
        </ul>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>本ガイドは上記の一次・二次情報源をもとに作成した非公式の学習教材です。認定試験の内容や合否基準を保証するものではないため、正式な情報は必ずScrum Alliance公式ページでご確認ください。</p>
      </div>
    </section>



    <footer>
      Certified Scrum Developer&reg;、CSD&reg;、Advanced Certified Scrum Developer&reg;、A-CSD&reg;、Certified Scrum Professional&reg;、CSP&reg;、Scrum Alliance&reg; は Scrum Alliance, Inc. の登録商標です。本ページはScrum Allianceが公開する一次資料に基づいて作成した非公式の学習教材であり、Scrum Allianceによる公式認定コンテンツではありません。
    </footer>
    </main>
    </div>
  </div>
</template>

<style scoped>
.csd-page {
  /* ---- Named palette (paper / ink / indigo / gold / forest / plum) ---- */
  --color-paper:        #F6F7F9;
  --color-paper-raised: #FFFFFF;
  --color-paper-sunken: #EEF0F4;

  --color-ink:          #161B26;
  --color-ink-soft:     #4B5566;
  --color-ink-faint:    #8A93A3;

  --color-border:       #DFE3EA;
  --color-border-strong:#C7CDD9;

  --color-indigo:       #2E3F72;
  --color-indigo-dark:  #1F2C57;
  --color-indigo-tint:  #EEF1F8;

  --color-gold:         #B8802A;
  --color-gold-tint:    #FAF1DF;

  --color-forest:       #1B6E6A;
  --color-forest-tint:  #E7F3F2;

  --color-plum:         #8C3A5C;
  --color-plum-tint:    #F6EAEF;

  --color-success-bg:    #EAF4EC;
  --color-success-text:  #2F6B3D;
  --color-success-border:#BFE0C6;

  --color-info-bg:       #EEF1F8;
  --color-info-text:     #2E3F72;
  --color-info-border:   #C7D1EA;

  /* ---- Typography ---- */
  --font-display: "Source Serif 4", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  --sidebar-width: 288px;

  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.75;
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
  text-decoration: none;
}

.sidebar-nav a i,
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

.sidebar-nav a.active i,
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

.sidebar-overlay {
  display: none;
}

/* ===================== Main content ===================== */
.main-content {
  margin-left: var(--sidebar-width);
  padding: 56px 72px 120px;
  max-width: 1200px;
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

.hero-eyebrow i,
.hero-eyebrow :deep(.iconify) {
  font-size: 17px;
  color: var(--color-gold);
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.disclaimer-box i,
.disclaimer-box :deep(.iconify) {
  font-size: 18px;
  flex: none;
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

.section-eyebrow i,
.section-eyebrow :deep(.iconify) {
  font-size: 17px;
  color: var(--color-ink-faint);
}

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 29px;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  color: var(--color-ink);
  margin: 40px 0 16px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
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

a { color: var(--color-indigo); text-decoration: none; }
a:hover { text-decoration: underline; }

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

.callout-title i,
.callout-title :deep(.iconify) {
  font-size: 18px;
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

.mermaid-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 60px;
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
    visibility: hidden;
    transition: transform 0.2s ease, visibility 0.2s ease;
    box-shadow: none;
  }
  .sidebar.open {
    transform: translateX(0);
    visibility: visible;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  }
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    top: var(--global-nav-height);
    background: rgba(22, 27, 38, 0.5);
    z-index: 15;
  }
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
  .sidebar { transition: none; }
}
</style>
