<script setup lang="ts">
import { useSeoMeta } from "#imports";

const LIGHT_THEME_VARS = {
  fontSize: "16px",
  primaryColor: "#FAF1DF",
  primaryBorderColor: "#B8802A",
  primaryTextColor: "#161B26",
  lineColor: "#4B5566",
  secondaryColor: "#EAF4EC",
  tertiaryColor: "#EEF1F8",
};

const DIAGRAM_HIERARCHY = `flowchart TB
A["組織のビジョン 戦略目標"] --> B["ポートフォリオ 戦略目標達成のために選ばれた変革施策の集合"]
B --> C["プログラム 関連プロジェクト群を束ねアウトカムとベネフィットを実現"]
C --> D1["プログラム内プロジェクト プログラムの一部として成果物を生み出す有期的活動"]
B --> D2["単独プロジェクト プログラムに属さずポートフォリオから直接管理される有期的活動"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class B hub;`;

const DIAGRAM_CONTEXT = `flowchart LR
PM["ポートフォリオマネジメント"]
PM --- BAU["定常業務 BAU"]
PM --- SP["戦略計画"]
PM --- RB["資源配分 予算編成"]
PM --- PPM["プロジェクト プログラムマネジメント"]
PM --- PerfM["パフォーマンスマネジメント"]
PM --- CG["コーポレートガバナンス"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PM hub;`;

const DIAGRAM_MOP_MODEL = `flowchart TB
subgraph P["5つの原則"]
    P1["上級管理層のコミットメント"]
    P2["ガバナンスの整合"]
    P3["戦略との整合"]
    P4["ポートフォリオオフィス"]
    P5["活力ある変革文化"]
end

subgraph DC["ポートフォリオ定義サイクル 5プラクティス 逐次的"]
    direction LR
    D1["Understand 理解する"] --> D2["Categorize 分類する"] --> D3["Prioritize 優先順位付け"] --> D4["Balance バランスを取る"] --> D5["Plan 計画する"]
end

OE["組織のエネルギー"]

subgraph DLC["ポートフォリオ デリバリーサイクル 7プラクティス 並行的"]
    L1["マネジメントコントロール"]
    L2["ベネフィットマネジメント"]
    L3["財務マネジメント"]
    L4["リスクマネジメント"]
    L5["ステークホルダーエンゲージメント"]
    L6["組織ガバナンス"]
    L7["リソースマネジメント"]
end

P --> DC
DC -- "ポートフォリオ戦略 デリバリープラン" --> OE
OE --> DLC
DLC -. "実績 学習のフィードバック" .-> DC

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class OE hub;`;

const DIAGRAM_PRINCIPLES = `flowchart TB
C["活力ある変革文化 組織のエネルギーで駆動"]
G["ガバナンスの整合"]
S["戦略との整合"]
O["ポートフォリオオフィス"]
M["上級管理層のコミットメント 土台"]
M --> G
M --> S
M --> O
G --> C
S --> C
O --> C

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class M hub;`;

const DIAGRAM_DRIVER_MODEL = `flowchart LR
A["組織のビジョン 高次戦略"] --> B["戦略目標"] --> C["便益"] --> D["変革施策 プロジェクト プログラム"]`;

const DIAGRAM_FOUR_CS = `flowchart TB
OE["組織のエネルギー"]
OE --> C1["Connection つながり 個人が組織目標にどう結びついているか"]
OE --> C2["Content 満足度 仕事内容への満足度"]
OE --> C3["Context 文脈 環境 組織のプラクティスが仕事の遂行をどう支えるか"]
OE --> C4["Climate 風土 組織が人々の最良の力の発揮をどう支援するか"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class OE hub;`;

const DIAGRAM_DEFINITION_CYCLE = `flowchart LR
U["Understand 理解する"] --> C["Categorize 分類する"] --> P["Prioritize 優先順位付け"] --> B["Balance バランスを取る"] --> PL["Plan 計画する"]
PL --> OUT1["ポートフォリオ戦略 何を届けるか"]
PL --> OUT2["ポートフォリオ デリバリープラン いつ どのように届けるか"]

classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class OUT1,OUT2 done;`;

const DIAGRAM_RISK_REWARD = `flowchart TB
subgraph RR["リスク 報酬マトリクスによるバランス評価の例"]
HH["高リスク 高報酬 複数存在する場合は一部見直しを検討"]
HL["高リスク 低報酬 原則 中止を検討"]
LH["低リスク 高報酬 優良案件として維持"]
LL["低リスク 低報酬 必要最小限に"]
end

classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class LH done;`;

const DIAGRAM_DELIVERY_CYCLE = `flowchart TB
STRAT["ポートフォリオ戦略 デリバリープラン 定義サイクルからのインプット"]
STRAT --> MC["マネジメントコントロール"]
STRAT --> BM["ベネフィットマネジメント"]
STRAT --> FM["財務マネジメント"]
STRAT --> RM["リスクマネジメント"]
STRAT --> SE["ステークホルダーエンゲージメント"]
STRAT --> OG["組織ガバナンス"]
STRAT --> RSM["リソースマネジメント"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class STRAT hub;`;

const DIAGRAM_ROLES = `flowchart TB
PDG["ポートフォリオ ディレクション グループ PDG 投資委員会"]
PPG["ポートフォリオ プログレス グループ PPG デリバリー委員会"]
PD["ポートフォリオ ディレクター PD"]
PM["ポートフォリオ マネージャー"]
PBM["ポートフォリオ ベネフィット マネージャー"]
PPM["プロジェクト プログラムマネージャー PPMs"]

PDG --> PD
PDG --> PPG
PD --> PM
PPG --> PM
PM --> PBM
PM --> PPM

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PDG hub;`;

const DIAGRAM_IMPLEMENTATION_APPROACHES = `flowchart TB
subgraph BB["ビッグバン アプローチ"]
    BB1["すべての進行中 パイプライン施策を一斉にポートフォリオへ組み入れる"]
    BB2["長所 迅速な全体像の獲得"]
    BB3["短所 組織への混乱 抵抗が大きい"]
end
subgraph EV["エボリューショナリー 漸進的 アプローチ"]
    EV1["ポートフォリオマネジメントのプロセスを段階的 計画的に展開"]
    EV2["長所 即時のニーズに対応し早期に価値を実証 BAUへの混乱を抑制"]
    EV3["短所 導入完了までに時間がかかる 優先度の変化により遅延しうる"]
end
subgraph AH["アドホック アプローチ"]
    AH1["場当たり的 非計画的な導入"]
    AH2["P3Oガイドラインでは最も推奨されない"]
end

classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class EV2 done;`;

const DIAGRAM_P3M3_LEVELS = `flowchart TB
L1["レベル1 プロセスの認識"] --> L2["レベル2 反復可能なプロセス"]
L2 --> L3["レベル3 定義されたプロセス"]
L3 --> L4["レベル4 管理されたプロセス"]
L4 --> L5["レベル5 最適化されたプロセス"]

classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class L5 done;`;

const DIAGRAM_RELATED_FRAMEWORKS = `flowchart TB
MoP["MoP Portfolio Management 戦略とポートフォリオ"]
MSP["MSP Managing Successful Programmes プログラムマネジメント"]
P2["PRINCE2 プロジェクトマネジメント"]
P3O["P3O Portfolio Programme and Project Offices オフィス機能の設計"]
P3M3["P3M3 成熟度評価モデル"]

MoP --> MSP --> P2
MoP -. "オフィス機能の設計指針" .-> P3O
MoP -. "成熟度の測定" .-> P3M3

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class MoP hub;`;

useSeoMeta({
  title: "MoP Foundation® 認定資格 完全ガイド | PRINCE2 Portfolio Management Foundation対策",
  description: "PeopleCert MoP Foundation（PRINCE2 Portfolio Management Foundation）試験対策のための、5つの原則・定義サイクル・デリバリーサイクル・主要な役割と文書・導入と成熟度評価を網羅した初学者向け日本語ガイド。",
});
</script>

<template>
  <div class="layout">
    <nav class="sidebar" aria-label="ページ内目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="17" stroke="#B8802A" stroke-width="2" fill="#FAF1DF"/>
          <path d="M18 6L21.5 14.5L30.5 15L23.5 20.5L26 29.5L18 24.5L10 29.5L12.5 20.5L5.5 15L14.5 14.5L18 6Z" fill="#B8802A"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">MoP Foundation</div>
          <div class="brand-subtitle">学習ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li class="nav-group-label">概要・基本概念</li>
        <li><a href="#exam-overview"><Icon name="tabler:certificate" aria-hidden="true" />試験概要</a></li>
        <li><a href="#what-is-portfolio-management"><Icon name="tabler:building-bank" aria-hidden="true" />ポートフォリオマネジメントとは</a></li>
        <li><a href="#mop-framework-overview"><Icon name="tabler:route" aria-hidden="true" />MoP全体像</a></li>

        <li class="nav-group-label">原則と変革文化</li>
        <li><a href="#five-principles"><Icon name="tabler:shield-check" aria-hidden="true" />5つの原則</a></li>
        <li><a href="#organizational-energy"><Icon name="tabler:bolt" aria-hidden="true" />組織のエネルギー</a></li>

        <li class="nav-group-label">2つのサイクル</li>
        <li><a href="#definition-cycle"><Icon name="tabler:list-check" aria-hidden="true" />定義サイクル(5)</a></li>
        <li><a href="#delivery-cycle"><Icon name="tabler:git-branch" aria-hidden="true" />デリバリーサイクル(7)</a></li>

        <li class="nav-group-label">体制とガバナンス</li>
        <li><a href="#key-roles"><Icon name="tabler:users-group" aria-hidden="true" />主要な役割</a></li>
        <li><a href="#key-documents"><Icon name="tabler:clipboard-text" aria-hidden="true" />主要文書</a></li>
        <li><a href="#implementation-and-maturity"><Icon name="tabler:refresh" aria-hidden="true" />導入と成熟度</a></li>

        <li class="nav-group-label">実務・試験対策</li>
        <li><a href="#best-practices-summary"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス早見表</a></li>
        <li><a href="#related-frameworks"><Icon name="tabler:git-merge" aria-hidden="true" />関連フレームワーク</a></li>
        <li><a href="#exam-tips"><Icon name="tabler:target" aria-hidden="true" />試験対策</a></li>
        <li><a href="#references"><Icon name="tabler:link" aria-hidden="true" />参考文献</a></li>
      </ul>
    </nav>

    <main class="main-content">
      <header class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          PEOPLECERT CERTIFICATION STUDY GUIDE
        </div>
        <h1>MoP Foundation（Management of Portfolios）学習ガイド</h1>
        <p class="hero-lede">ポートフォリオマネジメントの基礎から、5つの原則、定義・デリバリーの2つのサイクル、主要な役割と文書、導入アプローチと成熟度評価(P3M3)までを体系的に学ぶ完全ガイド</p>

        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">5</div>
            <div class="stat-label">5つの原則 原則ベースのアプローチ</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">12のプラクティス 定義(5) + デリバリー(7)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">4つの源泉 組織のエネルギー (4Cs)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">5</div>
            <div class="stat-label">5つの成熟度 P3M3 レベル1〜5</div>
          </div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本書は PeopleCert / AXELOS の公式シラバスおよび Management of Portfolios (MoP®) ガイダンスに基づき作成された非公式の学習ガイドです。商標・著作権は各権利者に帰属します。最新の公式シラバスおよび受験要項は <a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MoP-4/mop-foundation-2644" target="_blank" rel="noopener">PeopleCert公式サイト</a> にてご確認ください。</span>
        </div>
      </header>

      <!-- Section 1 -->
      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>このガイドについて(試験概要)</h2>

        <p>MoP Foundation(現在の正式名称は「PRINCE2® Portfolio Management Foundation」)は、PeopleCert社が提供する、ポートフォリオマネジメントの入門資格です。PRINCE2 Portfolio Managementパスウェイの最初のモジュールにあたり、効果的かつ戦略的なポートフォリオマネジメントを行うための原則・技法・プラクティスを学びます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>資格名</td><td>MoP Foundation(PRINCE2 Portfolio Management Foundation)</td></tr>
              <tr><td>前提条件</td><td>なし</td></tr>
              <tr><td>出題形式</td><td>四肢択一(multiple choice)</td></tr>
              <tr><td>問題数</td><td>50問</td></tr>
              <tr><td>試験時間</td><td>40分</td></tr>
              <tr><td>合格基準</td><td>50%以上の正答(25問以上)</td></tr>
              <tr><td>受験形式</td><td>クローズドブック(資料持ち込み不可)</td></tr>
              <tr><td>結果通知</td><td>公式結果は2営業日以内</td></tr>
            </tbody>
          </table>
        </div>

        <p>PeopleCertの「At a Glance」によれば、本資格は主にポートフォリオマネージャーを対象とし、以下の学習アウトカムをカバーします。</p>

        <ul>
          <li>ポートフォリオマネジメントの中核概念・構造・用語</li>
          <li>戦略目標とポートフォリオの整合(Strategic alignment)</li>
          <li>プロジェクト / プログラムの優先順位付け(Prioritization)</li>
          <li>ポートフォリオ全体のリスクマネジメント</li>
          <li>ベネフィット(便益)の定義・測定・追跡</li>
          <li>ガバナンスとコンプライアンス</li>
          <li>ポートフォリオの計画・デリバリー</li>
          <li>チェンジマネジメント</li>
          <li>リソースマネジメント</li>
        </ul>

        <h3>想定される対象読者・応用可能な職種</h3>

        <ul>
          <li>ポートフォリオマネージャー / プログラムマネージャー / プロジェクトマネージャー</li>
          <li>ビジネスチェンジマネージャー</li>
          <li>ベネフィットマネージャー</li>
          <li>ディレクター・オブ・チェンジ</li>
          <li>シニア・リスポンシブル・オーナー(SRO)</li>
          <li>ビジネスアナリスト</li>
          <li>経営会議メンバー</li>
        </ul>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MoP-4/mop-foundation-2644" target="_blank" rel="noopener noreferrer">PeopleCert公式 MoP Foundation商品ページ</a></li>
          </ul>
        </div>
      </section>

      <!-- Section 2 -->
      <section id="what-is-portfolio-management">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
        <h2>ポートフォリオマネジメントとは何か</h2>

        <h3>定義</h3>

        <p>MoPにおける「ポートフォリオ」とは、組織の戦略目標を達成するために選定され、まとめて管理される、プロジェクトおよびプログラムの集合体を指します。「ポートフォリオマネジメント」とは、組織の変革(change)と定常業務(Business as Usual, BAU)とのバランスを最も効果的に保つために協調された、一連の戦略的プロセスと意思決定の集合です。</p>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://archive.vanharen.net/blog/mop-management-of-portfolios-in-3-minutes" target="_blank" rel="noopener noreferrer">Van Haren Publishing「MoP in 3 minutes」</a></li>
          </ul>
        </div>

        <h3>プロジェクト・プログラム・ポートフォリオの違い</h3>

        <p>MoP Foundationでは、この3つの階層の違いを明確に理解することが問われます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <MermaidDiagram :chart="DIAGRAM_HIERARCHY" />
          </div>
          <div class="diagram-caption">組織戦略からプロジェクトまでの階層関係</div>
        </div>

        <p>ポートフォリオには「始まりも終わりもない」という点が、プロジェクトやプログラムとの決定的な違いです。プロジェクトとプログラムは有期的(成果物を出して終了する)ですが、ポートフォリオは組織が戦略を持ち続ける限り継続するマネジメント活動です。</p>

        <h3>ポートフォリオマネジメントが答える3つの根本的な問い</h3>

        <p>MoPは、次の3つの問いに答えるための仕組みとして設計されています。</p>

        <ol>
          <li><strong>正しいことをしているか?(Are we doing the right things?)</strong> 戦略に整合した、正しいプロジェクト・プログラムを選んでいるか</li>
          <li><strong>物事を正しく行っているか?(Are we doing these things right?)</strong> 選んだ施策を効果的・効率的に実行できているか</li>
          <li><strong>効果的なサービスや効率化による便益を、実際に実現できているか?(Are we realising the benefits?)</strong> 変革の結果として期待した便益が得られているか</li>
        </ol>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MoP-4/mop-foundation-2644" target="_blank" rel="noopener noreferrer">PeopleCert公式ページ</a></li>
            <li><a href="https://archive.vanharen.net/blog/mop-management-of-portfolios-in-3-minutes" target="_blank" rel="noopener noreferrer">Van Haren Publishing</a></li>
          </ul>
        </div>

        <h3>戦略的・組織的コンテキスト: 6つの連携機能</h3>

        <p>ポートフォリオマネジメントは単独で機能するものではなく、組織内の以下6つの機能・活動と連携して戦略目標の達成を支えます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <MermaidDiagram :chart="DIAGRAM_CONTEXT" />
          </div>
          <div class="diagram-caption">ポートフォリオマネジメントと連携する6つの機能</div>
        </div>

        <p>ポートフォリオマネジメントは、これら6つの機能と連携することで、組織の戦略目標達成を下支えし、同時に実効性のあるコーポレートガバナンスを実現します。</p>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.qa.com/course-catalogue/courses/management-of-portfolios-mop-foundation-and-practitioner-pbpmopfp/" target="_blank" rel="noopener noreferrer">QA「MoP Foundation」コース概要</a></li>
          </ul>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p><strong>既存プロセスへの橋渡しを設計する。</strong>ポートフォリオオフィスを新設・再稼働する際は、まずこの6機能それぞれの既存プロセス(例: 年次予算編成サイクル、既存のPMOレポーティング)を洗い出し、ポートフォリオマネジメントを「新しい別のプロセス」として並走させるのではなく、既存プロセスに橋渡しする設計にすることが定着の鍵となります。</p>
        </div>
      </section>

      <!-- Section 3 -->
      <section id="mop-framework-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 03</div>
        <h2>MoPフレームワークの全体像</h2>

        <p>MoPは、<strong>5つの原則</strong>、<strong>2つの管理サイクル(定義サイクル・デリバリーサイクル)</strong>、そしてそれらをつなぐ<strong>組織のエネルギー</strong>という3層構造で成り立っています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <MermaidDiagram :chart="DIAGRAM_MOP_MODEL" />
          </div>
          <div class="diagram-caption">MoPフレームワークの全体像(原則・2つのサイクル・組織のエネルギー)</div>
        </div>

        <ul>
          <li><strong>定義サイクル(Definition Cycle)</strong>: 「正しいものを選ぶ」段階。5つのプラクティスは基本的に<strong>逐次的(sequential)</strong>に進みますが、重なり合うこともあります。</li>
          <li><strong>デリバリーサイクル(Delivery Cycle)</strong>: 「選んだものを正しく届ける」段階。7つのプラクティスは基本的に<strong>並行的(parallel)</strong>に進みます。</li>
          <li><strong>組織のエネルギー</strong>: この2つのサイクルをつなぐ「のり」の役割を果たします。</li>
        </ul>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://mop.wiki/management-cycles/" target="_blank" rel="noopener noreferrer">mop.wiki「Portfolio Management Cycles」</a></li>
            <li><a href="https://mop.wiki/" target="_blank" rel="noopener noreferrer">mop.wiki トップページ</a></li>
          </ul>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <p><strong>2つのサイクルを一方通行と誤解しない。</strong>実務では、四半期ごとの戦略レビューのたびに定義サイクルが繰り返され、その間もデリバリーサイクルの7プラクティスは常時並行して回り続けます。デリバリー側からのフィードバック(実績・リスクの顕在化・便益の未達など)が次の定義サイクルの優先順位付けにも反映されるべきです。</p>
        </div>
      </section>

      <!-- Section 4 -->
      <section id="five-principles">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:shield-check" aria-hidden="true" />SECTION 04</div>
        <h2>5つの原則(Principles)</h2>
      </section>

      <!-- Section 5 -->
      <section id="organizational-energy">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:bolt" aria-hidden="true" />SECTION 05</div>
        <h2>組織のエネルギーと活力ある変革文化</h2>
      </section>

      <!-- Section 6 -->
      <section id="definition-cycle">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 06</div>
        <h2>ポートフォリオ定義サイクル(5つのプラクティス)</h2>
      </section>

      <!-- Section 7 -->
      <section id="delivery-cycle">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 07</div>
        <h2>ポートフォリオ・デリバリーサイクル(7つのプラクティス)</h2>
      </section>

      <!-- Section 8 -->
      <section id="key-roles">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 08</div>
        <h2>主要な役割(Key Roles)</h2>
      </section>

      <!-- Section 9 -->
      <section id="key-documents">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 09</div>
        <h2>主要文書(Key Documents)</h2>
      </section>

      <!-- Section 10 -->
      <section id="implementation-and-maturity">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 10</div>
        <h2>導入・定着・成熟度評価</h2>
      </section>

      <!-- Section 11 -->
      <section id="best-practices-summary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:bulb" aria-hidden="true" />SECTION 11</div>
        <h2>プラクティス別ベストプラクティス早見表</h2>
      </section>

      <!-- Section 12 -->
      <section id="related-frameworks">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-merge" aria-hidden="true" />SECTION 12</div>
        <h2>関連フレームワークとの関係</h2>
      </section>

      <!-- Section 13 -->
      <section id="exam-tips">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target" aria-hidden="true" />SECTION 13</div>
        <h2>試験対策のポイント</h2>
      </section>

      <!-- Section 14 -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 14</div>
        <h2>参考文献・ソース一覧</h2>
      </section>

      <footer>
        「MoP」および「Management of Portfolios」はAXELOS Limitedの登録商標です。「PRINCE2」もAXELOS Limitedの登録商標です。本ページはAXELOSまたはPeopleCertの公式資料ではなく、学習支援を目的とした非公式の解説教材です。
      </footer>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: block;
}

.sidebar {
  position: fixed;
  top: var(--global-nav-height, 0px);
  left: 0;
  width: var(--sidebar-width, 288px);
  height: calc(100vh - var(--global-nav-height, 0px));
  overflow-y: auto;
  background: var(--color-paper-raised, #ffffff);
  border-right: 1px solid var(--color-border, #dfe3ea);
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
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 19px;
  color: var(--color-ink, #161b26);
  letter-spacing: 0.02em;
}

.brand-text .brand-subtitle {
  font-size: 14px;
  color: var(--color-ink-faint, #8a93a3);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav .nav-group-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-faint, #8a93a3);
  letter-spacing: 0.06em;
  margin: 22px 0 8px;
  padding-left: 12px;
}

.sidebar-nav .nav-group-label:first-child {
  margin-top: 0;
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
  color: var(--color-ink-soft, #4b5566);
  font-size: 15px;
  line-height: 1.4;
  border-left: 2px solid transparent;
  text-decoration: none;
}

.sidebar-nav a:hover {
  background: var(--color-indigo-tint, #eef1f8);
  color: var(--color-indigo, #2e3f72);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint, #eef1f8);
  color: var(--color-indigo, #2e3f72);
  font-weight: 600;
  border-left: 2px solid var(--color-indigo, #2e3f72);
}

.main-content {
  margin-left: var(--sidebar-width, 288px);
  padding: 56px 72px 120px;
}

.hero {
  margin-bottom: 56px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-gold, #b8802a);
  text-transform: uppercase;
  margin-bottom: 18px;
}

.hero h1 {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 40px;
  line-height: 1.28;
  margin: 0 0 16px;
  color: var(--color-ink, #161b26);
}

.hero .hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft, #4b5566);
  margin: 0 0 28px;
  line-height: 1.6;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(140px, 1fr));
  gap: 16px;
}

.stat-card {
  border: 1px solid var(--color-border, #dfe3ea);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 10px;
  padding: 18px 20px;
}

.stat-card .stat-number {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 28px;
  color: var(--color-indigo, #2e3f72);
  line-height: 1.1;
}

.stat-card .stat-label {
  font-size: 14px;
  color: var(--color-ink-soft, #4b5566);
  margin-top: 6px;
  line-height: 1.4;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--color-info-border, #c7d1ea);
  background: var(--color-info-bg, #eef1f8);
  color: var(--color-info-text, #2e3f72);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 15px;
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
  margin: 72px 0;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-faint, #8a93a3);
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

h2 {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 28px;
  color: var(--color-ink, #161b26);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

h3 {
  font-family: var(--font-display, serif);
  font-weight: 600;
  font-size: 20px;
  color: var(--color-ink, #161b26);
  margin: 40px 0 16px;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

h4 {
  font-family: var(--font-sans, sans-serif);
  font-weight: 600;
  font-size: 16px;
  color: var(--color-ink, #161b26);
  margin: 28px 0 12px;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

/* リストスタイリングの劣化・脱落防止 */
ul, ol {
  margin: 0 0 18px;
  padding-left: 24px;
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.callout {
  border: 1px solid var(--color-border, #dfe3ea);
  border-left: 4px solid var(--color-indigo, #2e3f72);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 10px;
  padding: 20px 24px;
  margin: 28px 0;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
  color: var(--color-indigo, #2e3f72);
  margin-bottom: 10px;
}

.callout ul {
  margin-bottom: 0;
  padding-left: 20px;
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

.callout.source .callout-title {
  color: var(--color-forest, #1b6e6a);
}

.callout.source a {
  color: var(--color-forest, #1b6e6a);
  font-weight: 500;
}

.callout.source ul {
  list-style: none;
  padding-left: 0;
}

.callout.source li {
  margin-bottom: 6px;
  font-size: 14px;
  word-break: break-all;
}

.callout.note {
  border-left-color: var(--color-plum, #8c3a5c);
}

.callout.note .callout-title {
  color: var(--color-plum, #8c3a5c);
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 10px;
  margin: 0 0 24px;
  max-width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 15px;
}

thead th {
  background: var(--color-paper-sunken, #eef0f4);
  text-align: left;
  font-weight: 600;
  color: var(--color-ink, #161b26);
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-strong, #c7cdd9);
  white-space: nowrap;
}

tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-soft, #4b5566);
  vertical-align: top;
}

tbody tr:nth-child(even) {
  background: var(--color-paper, #f6f7f9);
}

.diagram-card {
  border: 1px solid var(--color-border, #dfe3ea);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 12px;
  padding: 24px;
  margin: 28px 0;
}

.diagram-caption {
  font-size: 14px;
  color: var(--color-ink-faint, #8a93a3);
  margin-top: 14px;
  text-align: center;
}

.diagram-loading {
  color: var(--color-ink-faint, #8a93a3);
  font-size: 14px;
  padding: 20px 0;
  text-align: center;
}

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
  border: 1.5px solid var(--color-indigo, #2e3f72);
  color: var(--color-indigo, #2e3f72);
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-body .step-title {
  font-weight: 600;
  color: var(--color-ink, #161b26);
  margin-bottom: 4px;
}

.step-body .step-desc {
  color: var(--color-ink-soft, #4b5566);
  font-size: 15px;
}

.ref-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  font-size: 15px;
}

.ref-list li:last-child {
  border-bottom: none;
}

.ref-list .ref-name {
  color: var(--color-ink, #161b26);
  font-weight: 500;
  display: block;
  margin-bottom: 2px;
}

.ref-list .ref-url {
  color: var(--color-ink-faint, #8a93a3);
  word-break: break-all;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-faint, #8a93a3);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .sidebar {
    display: none;
  }
  .main-content {
    margin-left: 0;
    padding: 32px 24px 80px;
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
