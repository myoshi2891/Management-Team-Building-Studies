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

const DIAGRAM_FOUNDATIONFIG2 = `flowchart LR
IN1["Opportunity 機会"] --> VS
IN2["Demand 需要"] --> VS
subgraph VS["ITIL Value System"]
direction TB
GP["Guiding Principles 指導原則"]
GOV["Governance ガバナンス"]
SVC["Service Value Chain サービスバリューチェーン"]
PRAC["34 Management Practices 34の管理プラクティス"]
CI["Continual Improvement 継続的改善"]
GOV --> SVC
GP -.-> SVC
PRAC -.-> SVC
CI -.-> SVC
end
VS --> OUT["Value 価値"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px
class IN1,IN2,OUT box
class VS hub`;

const DIAGRAM_FOUNDATIONFIG3 = `flowchart TB
PESTLE["外部要因PESTLE 政治・経済・社会・技術・法律・環境"]
PESTLE --> D1["① 組織と人材 Organizations and People"]
PESTLE --> D2["② 情報と技術 Information and Technology"]
PESTLE --> D3["③ パートナーと供給者 Partners and Suppliers"]
PESTLE --> D4["④ バリューストリームとプロセス Value Streams and Processes"]
D1 --- CENTER["サービスの 価値提供"]
D2 --- CENTER
D3 --- CENTER
D4 --- CENTER
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px
class D1,D2,D3,D4 box
class CENTER hub`;

const DIAGRAM_FOUNDATIONFIG4 = `flowchart LR
subgraph SVC["Service Value Chain6活動"]
direction LR
P1["Plan"] --- P2["Improve"] --- P3["Engage"] --- P4["Design & Transition"] --- P5["Obtain Build"] --- P6["Deliver & Support"]
end
SVC -->|"より詳細な 8段階モデルへ分解"| PSLM["Product and Service Lifecycle ModelPSLM"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px
class P1,P2,P3,P4,P5,P6 box
class PSLM hub`;

const DIAGRAM_FOUNDATIONFIG5 = `flowchart LR
A["Explore 探索"] --> B["Engage 関与"] --> C["Offer 提示"] --> D["Agree 合意"] --> E["Onboard 導入"] --> F["Co-create 共創"] --> G["Reflect 振り返り"]
G -.->|継続的改善| A
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px
class A,B,C,D,E,F box
class G done`;

const DIAGRAM_FOUNDATIONFIG6 = `flowchart LR
E["Evaluate 評価"] --> D["Direct 指示"] --> M["Monitor 監視"] --> E
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
class E,D,M box`;

const DIAGRAM_FOUNDATIONFIG7 = `flowchart TB
S1["① What is the vision? ビジョンは何か"] --> S2["② Where are we now? 現在地はどこか"]
S2 --> S3["③ Where do we want to be? 目指す姿はどこか"]
S3 --> S4["④ How do we get there? どう到達するか"]
S4 --> S5["⑤ Take action 行動する"]
S5 --> S6["⑥ Are we getting there? 到達できているか"]
S6 --> S7["⑦ How do we keep the momentum going? 改善をどう定着させるか"]
S7 -.->|次の改善サイクルへ| S1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px
class S1,S2,S3,S4,S5,S6 box
class S7 done`;

const DIAGRAM_MODULE1FIG8 = `flowchart TB
subgraph PRODUCT["主に「製品」寄りの活動"]
direction LR
A1["① Discover 発見"] --> A2["② Design 設計"] --> A3["③ Acquire 獲得"] --> A4["④ Build 構築"]
end
subgraph BRIDGE["製品とサービスの橋渡し"]
direction LR
A5["⑤ Transition 移行"] --> A6["⑥ Operate 運用"]
end
subgraph SERVICE["主に「サービス」寄りの活動"]
direction LR
A7["⑦ Deliver 提供"] --> A8["⑧ Support サポート"]
end
PRODUCT --> BRIDGE --> SERVICE
A8 -.->|フィードバックは<br/>どの活動にも還元される| A1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px
class A1,A2,A3,A4,A7,A8 box
class A5,A6 hub`;

const DIAGRAM_DISCOVERFIG9 = `flowchart TB
S1["市場・内部環境の スキャニング"] --> S2["ステークホルダーとの 対話・ニーズ収集"]
S2 --> S3["ビジネス分析による 要件の構造化"]
S3 --> S4["組織戦略・ビジョンとの 整合性チェック"]
S4 --> S5["ポートフォリオへの 反映・優先順位づけ"]
S5 --> S6["ロードマップ・ サービスオファリングの更新"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
class S1,S2,S3,S4,S5,S6 box`;

const DIAGRAM_DESIGNFIG10 = `flowchart TB
S1["要件・機会の 詳細化"] --> S2["アーキテクチャ・ 技術方式の検討"]
S2 --> S3["サービスレベル目標 SLA XLAの組み込み"]
S3 --> S4["プロトタイプ作成・ ユーザー検証"]
S4 --> S5["運用モデル 誰がどう運用するかの設計"]
S5 --> S6["仕様書の確定"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
class S1,S2,S3,S4,S5,S6 box`;

const DIAGRAM_ACQUIREFIG11 = `flowchart TB
S1["必要リソースの 特定技術 人材 サービス"] --> S2["内製 vs 購入の ソーシング戦略決定"]
S2 --> S3["サプライヤー評価・ 選定"]
S3 --> S4["契約・SLA の 締結"]
S4 --> S5["資産としての 登録・配分"]
S5 --> S6["TCO を含めた 予算管理への反映"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
class S1,S2,S3,S4,S5,S6 box`;

const DIAGRAM_BUILDFIG12 = `flowchart TB
S1["コンポーネント単位の 開発"] --> S2["コードレビュー・ 静的解析"]
S2 --> S3["統合 Integration"]
S3 --> S4["機能テスト・ 非機能テスト"]
S4 --> S5["Definition of Done の判定"]
S5 --> S6["Transition 準備 リリース候補の確定"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px
class S1,S2,S3,S4,S5,S6 box`;

const DIAGRAM_TRANSITIONFIG13 = `flowchart TB
S1["変更のリスク評価 Change Enablement"] --> S2["リリース計画の 策定"]
S2 --> S3["展開方式の選定 Big Bang カナリア等"]
S3 --> S4["本番環境への 展開実行"]
S4 --> S5["移行後の 検証Post-Implementation Review"]
S5 --> S6["ロールバック要否の 判断"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px

class S1,S2,S3,S4,S5 box
class S6 hub`;
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
      <section id="foundation-review" class="guide-section" tabindex="-1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
      <h2>前提知識の総復習: ITIL Version 5 の全体構造</h2>

      <p>Service モジュールの各章に入る前に、ITIL (Version 5) の土台となる概念を整理しておきます。すでに Foundation を取得済みの方は復習として、ITIL 4 からの移行者は「何が変わったか」の確認として読んでください。</p>

      <h3>1.1 Product と Service の定義</h3>

      <p>ITIL (Version 5) では、Product と Service を明確に区別して定義します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>用語</th>
            <th>定義</th>
          </tr></thead>
          <tbody>
            <tr>
              <td><strong>Product(製品)</strong></td>
              <td>消費者に価値を提供するために設計された、組織のリソース(人、技術など)の構成</td>
            </tr>
            <tr>
              <td><strong>Service(サービス)</strong></td>
              <td>顧客が特定のコストとリスクを自ら管理することなく、望む成果(アウトカム)の実現を可能にする、価値の共創手段</td>
            </tr>
            <tr>
              <td><strong>Digital Product(デジタル製品)</strong></td>
              <td>デジタル技術に基づく、組織のリソースの組み合わせ</td>
            </tr>
            <tr>
              <td><strong>Digital Service(デジタルサービス)</strong></td>
              <td>デジタル製品に全面的または大部分を依存するサービス</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>具体例</strong>: 銀行のモバイルアプリとその API・基幹システムが「デジタル製品」であり、深夜でも安全かつ即座に振込ができるという「サービス」を成立させています。製品(アプリ)が落ちればサービス(振込体験)も止まり、価値が失われます。この製品とサービスの不可分な関係こそが、ITIL (Version 5) が両者を単一のライフサイクルモデルで扱う理由です。</p>

      <h3>1.2 価値の方程式: アウトプットとアウトカム</h3>

      <p>ITIL 試験で最も誤解されやすい概念の一つです。</p>

      <ul>
        <li><strong>Output(アウトプット)</strong>: 活動によって生み出される有形・無形の成果物(例: 新しい人事システムが稼働した)</li>
        <li><strong>Outcome(アウトカム)</strong>: 1つ以上のアウトプットによって実現される、ステークホルダーにとっての結果(例: 採用リードタイムが30日から10日に短縮された)</li>
      </ul>

      <p>アウトプットを出してもアウトカムが実現しないケース(システムは稼働したが、使いにくくて誰も使わない)は典型的な失敗パターンとして頻出します。</p>

      <p>価値は次の式で概念化されます。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>価値 = (実現したアウトカム + 除去されたコスト + 除去されたリスク) − (課されたコスト + 課されたリスク)</p>
      </div>

      <h3>1.3 ITIL Value System(ITIL VS)の5つの構成要素</h3>

      <p>ITIL 4 の「Service Value System(SVS)」は、Version 5 で <strong>ITIL Value System(ITIL VS)</strong> に改称され、対象範囲が「ITサービス」から「デジタル製品とサービス」全体に拡張されました。構成要素自体は5つのまま維持されています。</p>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FOUNDATIONFIG2" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>構成要素</th>
            <th>役割</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Guiding Principles(指導原則)</td>
              <td>あらゆる状況で組織の意思決定を導く普遍的な推奨事項(7原則)</td>
            </tr>
            <tr>
              <td>Governance(ガバナンス)</td>
              <td>組織を指揮・統制する仕組み。Evaluate–Direct–Monitor(EDM)サイクルで運用</td>
            </tr>
            <tr>
              <td>Service Value Chain(サービスバリューチェーン)</td>
              <td>需要を価値に変換する中核の運用モデル(6つの活動)</td>
            </tr>
            <tr>
              <td>Management Practices(管理プラクティス)</td>
              <td>バリューチェーン活動を実行するための34の「道具箱」</td>
            </tr>
            <tr>
              <td>Continual Improvement(継続的改善)</td>
              <td>あらゆる階層で行われる、パフォーマンスを期待水準に保ち続ける反復活動</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>1.4 指導原則(Guiding Principles)— 7原則の早見表</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>#</th>
            <th>原則</th>
            <th>一言で言うと</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Focus on value(価値に焦点を当てる)</td>
              <td>すべての活動を顧客・ステークホルダーの価値に結びつける</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Start where you are(現在地から始める)</td>
              <td>ゼロから作り直す前に、既存の資産・成果を評価し活用する</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Progress iteratively with feedback(フィードバックを伴う反復的な進化)</td>
              <td>大きく作りすぎず、小さく作ってフィードバックを得る</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Collaborate and promote visibility(協働と可視性の促進)</td>
              <td>サイロを越えて協働し、作業を可視化する</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Think and work holistically(全体的に考え行動する)</td>
              <td>部分最適ではなく、システム全体としての結果を重視する</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Keep it simple and practical(シンプルかつ実践的に)</td>
              <td>価値を生まない手順は削り、最小限の手数で目的を達成する</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Optimize and automate(最適化と自動化)</td>
              <td>自動化の前に最適化する。非効率なプロセスを自動化すると非効率が増幅するだけ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>Service モジュールの文脈では、特に原則7「最適化と自動化」が重要です。監視・自動修復・チャットボットなど AI を活用した運用改善(第8章 Operate、第11章参照)を導入する前に、まず対象プロセスが「シンプルかつ実践的」であるかを確認してください。壊れたプロセスを自動化しても、壊れたまま速くなるだけです。</p>
      </div>

      <h3>1.5 4つの側面(Four Dimensions of Service Management)</h3>

      <p>サービスを一面的(技術だけ、プロセスだけ)に見てしまうと、必ずどこかで破綻します。ITIL は全体最適を保証するために、常に4つの側面をバランスさせることを求めます。外部環境の変化は <strong>PESTLE</strong>(Political, Economic, Social, Technological, Legal, Environmental)の6要因を通じてこれらの側面に影響します。</p>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FOUNDATIONFIG3" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>側面</th>
            <th>要点</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>組織と人材</td>
              <td>文化(心理的安全性)、リーダーシップ、組織構造。コンウェイの法則(システムは組織のコミュニケーション構造を反映する)に留意</td>
            </tr>
            <tr>
              <td>情報と技術</td>
              <td>データ→情報→知識の階層。AI 活用の基盤となる(後述の 6C モデルに接続)</td>
            </tr>
            <tr>
              <td>パートナーと供給者</td>
              <td>自組織だけで完結するサービスは存在しない。ソーシング戦略(内製 vs 外部委託)が鍵</td>
            </tr>
            <tr>
              <td>バリューストリームとプロセス</td>
              <td>組織内外のワークフロー。複雑さのレベルに応じて柔軟に設計する</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>新しいツールや自動化施策を検討する際は、必ず4つの側面すべてに与える影響を点検してください。「情報と技術」だけを強化しても、「組織と人材」(トレーニング不足)や「パートナーと供給者」(回線品質)がボトルネックのままでは、全体のサービス品質は向上しません。</p>
      </div>

      <h3>1.6 サービスバリューチェーン(6活動)と PSLM(8活動)の違い</h3>

      <p>ここは ITIL 4 経験者が最も混同しやすいポイントです。<strong>サービスバリューチェーンは「今も存在する」概念です</strong>。ただし ITIL (Version 5) では、製品とサービスの一気通貫のライフサイクルを表現するために、新たに <strong>Product and Service Lifecycle Model(PSLM)</strong> が導入されました。両者は置き換え関係ではなく、階層が異なる概念として共存します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>比較軸</th>
            <th>Service Value Chain(6活動)</th>
            <th>Product and Service Lifecycle Model(8活動)</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>位置づけ</td>
              <td>ITIL VS の中核運用モデル(普遍的なエンジン)</td>
              <td>個別の製品・サービスが辿る具体的な旅路</td>
            </tr>
            <tr>
              <td>活動</td>
              <td>Plan / Improve / Engage / Design &amp; Transition / Obtain-Build / Deliver &amp; Support</td>
              <td>Discover / Design / Acquire / Build / Transition / Operate / Deliver / Support</td>
            </tr>
            <tr>
              <td>性質</td>
              <td>抽象的・普遍的(レゴブロックのように組み合わせる)</td>
              <td>具体的・反復的(前後の活動を行き来する「エコシステム」)</td>
            </tr>
            <tr>
              <td>主な用途</td>
              <td>バリューストリームを組み立てる際の「部品」</td>
              <td>特定の製品・サービスのライフサイクル管理を可視化する「地図」</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FOUNDATIONFIG4" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <p>Service モジュールの Module 1〜10 は、この右側の <strong>PSLM(8活動)を「サービスプロバイダーの視点」から深掘りする</strong> ことに主眼を置いています。次章以降で1活動ずつ丁寧に見ていきます。</p>

      <h3>1.7 サービス関係性(Service Relationships)とサービスジャーニー</h3>

      <p>PeopleCert の紹介文が明示するとおり、Service モジュールは「サービス関係の管理」を重視します。</p>

      <p><strong>役割の整理</strong>: </p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>役割</th>
            <th>説明</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Service Provider(サービスプロバイダー)</td>
              <td>サービスの提供・サポートに責任を持つ組織の役割</td>
            </tr>
            <tr>
              <td>Service Consumer(サービス消費者)</td>
              <td>サービスを取得・利用して自らの目的を達成する組織の役割</td>
            </tr>
            <tr>
              <td>Digital Product Vendor(デジタル製品ベンダー)</td>
              <td>サービスの基盤となるデジタル製品を開発・改善する組織</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>消費側組織内の三者(Service Consumer Triad)</strong>: </p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>ペルソナ</th>
            <th>関心事</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Sponsor(スポンサー)</td>
              <td>予算承認、費用対効果・ROI</td>
            </tr>
            <tr>
              <td>Customer(カスタマー)</td>
              <td>サービス要件の定義、消費のアウトカムに対する説明責任</td>
            </tr>
            <tr>
              <td>User(ユーザー)</td>
              <td>日々の利用、使いやすさ・UX</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>この三者の利害は必ずしも一致しません(スポンサーは安価なプランを望み、カスタマーは技術要件を定義し、ユーザーは使いやすさを求める)。優れたサービスプロバイダーは、この三者間の緊張関係を理解した上でバランスを取ります。</p>

      <p><strong>サービスジャーニー(7段階)</strong>: サービス関係は、以下の7段階を通じて発展します。</p>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FOUNDATIONFIG5" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>段階</th>
            <th>内容</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Explore</td>
              <td>両者が市場・ニーズ・提供可能な能力を調査する</td>
            </tr>
            <tr>
              <td>Engage</td>
              <td>関係が確立され、初期のコミュニケーションと信頼が構築される</td>
            </tr>
            <tr>
              <td>Offer</td>
              <td>プロバイダーがサービスオファリングを提示し、消費者が需要を明確化する</td>
            </tr>
            <tr>
              <td>Agree</td>
              <td>期待値がすり合わされ、契約や SLA として正式化される</td>
            </tr>
            <tr>
              <td>Onboard</td>
              <td>移行段階。消費者が利用を開始し、ユーザーがトレーニングを受ける</td>
            </tr>
            <tr>
              <td>Co-create</td>
              <td>サービス提供・消費の日常。実際に価値が生成される段階</td>
            </tr>
            <tr>
              <td>Reflect</td>
              <td>パフォーマンスと創出された価値を両者で評価する、継続的改善の段階</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>1.8 品質・サービスレベル・SLA(そして XLA)</h3>

      <p><strong>Service Quality(サービス品質)</strong> と <strong>Service Level(サービスレベル)</strong> は似て非なる概念です。品質は「これは良いサービスだ」という全体的な知覚であり、サービスレベルはそれを測定可能にした客観的指標(例: 「稼働率 99.9%」)です。</p>

      <p>品質を管理可能な指標に変換するため、ITIL (Version 5) は4つのカテゴリーを提示します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>カテゴリー</th>
            <th>定義</th>
            <th>平易な言い換え</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Utility(有用性)</td>
              <td>サービスが「何をするか」。特定のニーズを満たす機能性</td>
              <td>目的に適っているか(fit for purpose)</td>
            </tr>
            <tr>
              <td>Warranty(保証)</td>
              <td>サービスが「どう機能するか」。可用性・キャパシティ・継続性・セキュリティの保証</td>
              <td>使用に適しているか(fit for use)</td>
            </tr>
            <tr>
              <td>Experience(体験)</td>
              <td>ユーザーが「どう感じるか」。機能的・感情的な相互作用の総体</td>
              <td>体験として好ましいか</td>
            </tr>
            <tr>
              <td>Sustainability(持続可能性)</td>
              <td>サービスの「与える影響」。環境・社会・経済的要件への適合</td>
              <td>長期的に許容できるか</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>これらは <strong>Service Level Agreement(SLA)</strong> として文書化され、プロバイダーと顧客の期待値を揃えます。近年の実務では、稼働率のような技術指標(SLA)に加え、体験(Experience)を定量化する <strong>Experience Level Agreement(XLA)</strong> が併用される傾向が強まっており、ITIL (Version 5) はこの潮流を反映して「体験に基づくサービス品質」を明示的に重視しています。</p>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>SLA を「稼働率 99.9%」のような技術指標だけで設計しないでください。Utility・Warranty・Experience・Sustainability の4カテゴリーすべてに対応する目標を最低1つずつ持たせることで、「技術的には正常だが利用者の体験は悪い」という典型的な失敗を防げます。</p>
      </div>

      <h3>1.9 ガバナンスと EDM サイクル</h3>

      <p>ガバナンスとマネジメントは異なります。ガバナンスは「正しいことをしているか」を決める船長であり、マネジメントは「正しいやり方でやっているか」を実行する乗組員です。ガバナンスは以下の3活動からなる <strong>EDM サイクル</strong> を通じて継続的に行われます。</p>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FOUNDATIONFIG6" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>活動</th>
            <th>内容</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Evaluate(評価)</td>
              <td>組織・戦略・ポートフォリオ・関係性を評価し、内外の状況変化を分析する</td>
            </tr>
            <tr>
              <td>Direct(指示)</td>
              <td>評価に基づき、責任を割り当て、戦略の方向性と方針を定める</td>
            </tr>
            <tr>
              <td>Monitor(監視)</td>
              <td>組織のパフォーマンスとプラクティスの遵守状況を監視する</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>1.10 継続的改善モデル(7ステップ)</h3>

      <p>「継続的改善」は ITIL VS の一構成要素であると同時に、単独の管理プラクティスでもあります。7ステップの反復モデルとして定義されており、規模を問わず適用できます。</p>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FOUNDATIONFIG7" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>改善提案を「プロジェクト」として一度きりで終わらせず、必ずステップ⑦「関連性を保ち続ける方法」を組織文化・レトロスペクティブの定例に組み込んでください。改善が文化に根づかないと、組織は元の基準線に静かに後退します。</p>
      </div>

      <h3>1.11 34の管理プラクティス概観</h3>

      <p>ITIL (Version 5) は ITIL 4 から引き続き <strong>34の管理プラクティス</strong> を定義しています(用語の一部微調整はあるものの、大枠は維持)。Service モジュールでは、PSLM の各段階(第3章〜第10章)に紐づく形でこれらのプラクティスを学びます。参考として、ITIL 4 時代の実践的なグルーピング(Practice Manager 資格の3系統)を示します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>系統</th>
            <th>含まれるプラクティス</th>
            <th>主な関心領域</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Monitor, Support and Fulfil(MSF)</td>
              <td>Service Desk / Incident Management / Problem Management / Service Request Management / Monitoring and Event Management</td>
              <td>日々の問い合わせ対応と障害対応</td>
            </tr>
            <tr>
              <td>Plan, Implement and Control(PIC)</td>
              <td>Change Enablement / Deployment Management / Release Management / Service Configuration Management / IT Asset Management</td>
              <td>変更の計画的な実装と統制</td>
            </tr>
            <tr>
              <td>Collaborate, Assure and Improve(CAI)</td>
              <td>Relationship Management / Supplier Management / Service Level Management / Continual Improvement / Information Security Management</td>
              <td>関係性の構築と品質保証</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Service モジュールでは、これらのプラクティスが PSLM の Deliver・Support 段階を中心に登場します(第9章・第10章で詳述)。</p>
    </section>

    
      <section id="module1-key-concepts" class="guide-section" tabindex="-1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 03</div>
      <h2>Module 1: デジタル製品とサービスの主要概念</h2>

      <h3>2.1 このモジュールの狙い</h3>

      <p>Module 1 は、Service モジュール全体の「地図」を描く導入章です。ここで PSLM(Product and Service Lifecycle Model)の全体像と、サービスプロバイダー視点で見たときの意義を理解しておくことで、第3章以降の各段階(Discover〜Support)の学習がスムーズになります。</p>

      <h3>2.2 デジタルサービスの特徴</h3>

      <p>デジタルサービスには、従来型のサービスと比べて次のような特徴があります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>特徴</th>
            <th>説明</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>ソフトウェア基盤への依存</td>
              <td>サービスの提供能力が、デジタル製品(アプリ・API・プラットフォーム)の品質に直結する</td>
            </tr>
            <tr>
              <td>継続的な変化</td>
              <td>CI/CD により、機能追加・修正が高頻度かつ継続的に行われる</td>
            </tr>
            <tr>
              <td>エコシステム化</td>
              <td>クラウド、複数のパートナー・サプライヤーを跨いで提供される</td>
            </tr>
            <tr>
              <td>スケーラビリティ</td>
              <td>需要変動に応じて、人手を介さず能力を伸縮できる</td>
            </tr>
            <tr>
              <td>測定可能性の向上</td>
              <td>テレメトリ・ログ・利用データにより、体験や品質をリアルタイムに可視化できる</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2.3 デジタル製品とサービスによる価値創出</h3>

      <p>前章 1.1〜1.2 で述べたとおり、製品(Product)は価値創出の「能力」を、サービス(Service)は「アウトカムの実現」を担います。Service モジュールでは、この関係を <strong>サービスプロバイダーの立場から</strong> 捉え直します。すなわち、「良い製品を作ること」がゴールなのではなく、「その製品を用いて、消費者が望むアウトカムを、コストとリスクを引き受けた上で確実に実現し続けること」がサービスプロバイダーの使命です。</p>

      <h3>2.4 PSLM の範囲と目的(サービスプロバイダー視点)</h3>

      <p>PSLM は、製品とサービスという従来別々の「部族(tribes)」が担っていた活動を、単一のエコシステムとして統合するモデルです。8つの活動は次のとおりです。</p>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_MODULE1FIG8" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <p><strong>重要な特性</strong>: この図は理解を助けるために左から右への流れとして描いていますが、公式モデルはこれを「固定された順序」とは位置づけていません。実際には、どの活動から別の活動へも行き来でき(例えば Support 中に新たな Discover が生まれる)、複数バージョンの同じ製品・サービスが異なる段階に同時に存在し得る、<strong>非線形なエコシステム</strong> として説明されています。この「行きつ戻りつする現実」を前提に運用を設計することが、Service モジュールの実践的な学びの核心です。</p>

      <h3>2.5 サービスプロバイダー視点で見た PSLM のメリット</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>メリット</th>
            <th>説明</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>手戻りの削減</td>
              <td>要件の伝言ゲームによる誤解が減り、後工程での手戻りが減る</td>
            </tr>
            <tr>
              <td>価値実現の迅速化</td>
              <td>製品チームとサービスチームが「一度で正しく」作業し、受け渡しの往復が減る</td>
            </tr>
            <tr>
              <td>デプロイ・リリースの信頼性向上</td>
              <td>依存関係や非効率が早期に特定・管理される</td>
            </tr>
            <tr>
              <td>障害解決・改善の迅速化</td>
              <td>製品チームとサービスチームがアウトカムに対する責任を共有し、優先順位の共通理解を持てる</td>
            </tr>
            <tr>
              <td>ガバナンスの一元化</td>
              <td>マッピング、活動、技術投資を単一のガバナンスフレームワークで扱える</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2.6 サービスプロバイダー視点で見た PSLM の課題</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>課題</th>
            <th>説明</th>
            <th>対応の方向性</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>組織構造の慣性</td>
              <td>製品チームとサービスチームが別部門・別KPIで動いている場合が多い</td>
              <td>共同のOKR・共同のオンコール体制など、構造面での統合を先に着手する</td>
            </tr>
            <tr>
              <td>スキルギャップ</td>
              <td>サービス運用担当者が製品開発の文脈(アーキテクチャ、コードベース)を理解していない</td>
              <td>シャドーイングやペアオンコールで知識移転を促進する</td>
            </tr>
            <tr>
              <td>ツールのサイロ化</td>
              <td>製品開発ツール(バックログ管理等)と運用ツール(監視・チケット管理等)が分断されている</td>
              <td>テレメトリとインシデント管理、バックログとの連携を自動化する</td>
            </tr>
            <tr>
              <td>ガバナンスの複雑化</td>
              <td>複数のパートナー・サプライヤーを跨ぐサービスでは、単一のガバナンスモデルの適用が難しい</td>
              <td>サプライヤーごとの責任分界点(RACI)を明文化する</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2.7 組織のバリューチェーン活動が PSLM をどう支えるか</h3>

      <p>第1章 1.6 で述べたとおり、サービスバリューチェーンの6活動(Plan / Improve / Engage / Design &amp; Transition / Obtain-Build / Deliver &amp; Support)は、PSLM の8段階それぞれを実行するための「エンジン」として機能します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>バリューチェーン活動</th>
            <th>主に支える PSLM 段階</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Plan</td>
              <td>Discover(方向性の共有)</td>
            </tr>
            <tr>
              <td>Engage</td>
              <td>Discover, Deliver(ステークホルダーとの対話)</td>
            </tr>
            <tr>
              <td>Design &amp; Transition</td>
              <td>Design, Build, Transition</td>
            </tr>
            <tr>
              <td>Obtain/Build</td>
              <td>Acquire, Build</td>
            </tr>
            <tr>
              <td>Deliver &amp; Support</td>
              <td>Operate, Deliver, Support</td>
            </tr>
            <tr>
              <td>Improve</td>
              <td>全段階を横断(継続的改善として)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>組織にPSLMを導入する際は、既存のバリューチェーン活動(特に Engage と Deliver &amp; Support)が、どの部門・どのツールによって担われているかを棚卸しすることから始めてください。ゼロから新しい体制を作るのではなく、「現在地から始める(Start where you are)」原則に従い、既存の強みを PSLM の各段階にマッピングするのが最も現実的な導入手順です。</p>
      </div>
    </section>

    

<section id="module2-discover" class="guide-section" tabindex="-1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:search" aria-hidden="true" />SECTION 04</div>
      <h2>Module 2: Discover(発見)</h2>

      <h3>3.1 目的(Purpose)</h3>

      <p>Discover 活動の目的は、<strong>製品ロードマップとサービスオファリングを、消費者ニーズと組織戦略に継続的に整合させ続けること</strong> です。市場・顧客・内部関係者から需要とニーズを収集し、それを組織の戦略的方向性と突き合わせる、PSLM の起点となる活動です。</p>

      <h3>3.2 主要概念</h3>

      <ul>
        <li><strong>ビジョン(Vision)</strong>: 組織が目指す将来像。Discover 活動のすべての意思決定の判断基準になる</li>
        <li><strong>ポジショニング(Positioning)</strong>: 市場・組織内における製品・サービスの立ち位置。競合や代替手段との違いを明確にする</li>
        <li><strong>ポートフォリオ(Portfolio)</strong>: 組織が保有する製品・サービス・投資機会の全体集合。Discover はポートフォリオの内容を更新するインプットを生み出す</li>
      </ul>

      <p>ビジョン・ポジショニング・ポートフォリオの3つは相互に作用します。ビジョンが方向性を示し、ポジショニングが「どこで戦うか」を定め、ポートフォリオが「何にリソースを割くか」の意思決定を記録します。</p>

      <h3>3.3 Discover を支える有効化プラクティス(Enabling Practices)</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>プラクティス</th>
            <th>Discover における役割</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Business Analysis(ビジネス分析)</td>
              <td>ステークホルダーのニーズを構造化し、要件として言語化する</td>
            </tr>
            <tr>
              <td>Portfolio Management(ポートフォリオ管理)</td>
              <td>発見された機会・需要を、既存の投資・優先順位と照らして評価する</td>
            </tr>
            <tr>
              <td>Relationship Management(関係性管理)</td>
              <td>顧客・パートナーとの対話チャネルを維持し、継続的なニーズ収集を可能にする</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3.4 Discover 活動のステップ</h3>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DISCOVERFIG9" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <h3>3.5 アウトプット(Outputs)</h3>

      <ul>
        <li>更新された製品ロードマップ</li>
        <li>更新されたサービスオファリング案</li>
        <li>ポートフォリオへの反映(新規投資候補、既存サービスの廃止候補を含む)</li>
      </ul>

      <h3>3.6 CSF(重要成功要因)と指標の例</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>CSF</th>
            <th>指標例</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>市場・顧客ニーズを継続的に捕捉できている</td>
              <td>収集されたインサイトの件数 / 四半期、インサイトからロードマップ反映までの平均リードタイム</td>
            </tr>
            <tr>
              <td>発見された機会が組織戦略と整合している</td>
              <td>戦略目標にマッピングされたロードマップ項目の割合</td>
            </tr>
            <tr>
              <td>ステークホルダーとの関係が良好である</td>
              <td>関係性管理における顧客満足度スコア、対話の頻度</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3.7 実践的な推奨事項(ベストプラクティス)</h3>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>需要の「声」を一元化する</strong>: 営業・サポート・SNS・利用ログなど、バラバラなチャネルから上がってくるニーズを単一のバックログまたはインサイト管理ツールに集約してください。分散したままでは優先順位づけができません。</li>
          <li><strong>Discover を一度きりのフェーズにしない</strong>: Support 活動(第10章)で得られたインシデント・問い合わせの傾向は、そのまま次の Discover サイクルへの重要なインプットです。PSLM がエコシステム型である所以はここにあります。</li>
          <li><strong>仮説検証のコストを下げる</strong>: 本格的な Build に入る前に、プロトタイプやコンセプト検証(PoC)で仮説を安価に検証し、Design 段階への手戻りを防いでください。</li>
        </ul>
      </div>
    </section>

    
      <section id="module3-design" class="guide-section" tabindex="-1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:ruler-2" aria-hidden="true" />SECTION 05</div>
      <h2>Module 3: Design(設計)</h2>

      <h3>4.1 目的(Purpose)</h3>

      <p>Design 活動の目的は、<strong>製品とサービスのプロトタイプおよび仕様を作成し、機能性・ユーザー体験・運用モデルを詳細化すること</strong> です。Discover で発見された機会を、実装可能な設計へと落とし込みます。</p>

      <h3>4.2 主要概念</h3>

      <ul>
        <li><strong>仕様(Specification)</strong>: 機能要件・非機能要件(性能、セキュリティ、可用性など)を明文化したもの</li>
        <li><strong>プロトタイプ(Prototype)</strong>: 低コストで検証可能な試作。実装前にユーザー体験や技術的実現可能性を確認する</li>
        <li><strong>運用モデル(Operating Model)</strong>: 誰が、どのプラクティスで、どのように日々の運用を担うかを事前に設計しておく考え方。Design 段階で後工程(Operate・Support)を見据えることが、運用可能性(Operability)の高い設計につながる</li>
      </ul>

      <h3>4.3 Design を支える有効化プラクティス</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>プラクティス</th>
            <th>Design における役割</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Architecture Management(アーキテクチャ管理)</td>
              <td>システム構成要素間の関係性を設計し、将来の拡張性・保守性を担保する</td>
            </tr>
            <tr>
              <td>Service Level Management(サービスレベル管理)</td>
              <td>設計段階から SLA・XLA の目標値を組み込み、「後付けの品質保証」を避ける</td>
            </tr>
            <tr>
              <td>Service Design(サービスデザイン)</td>
              <td>ユーザー体験(UX)を含めた、サービス全体の設計手法を提供する</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>4.4 Design 活動のステップ</h3>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DESIGNFIG10" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <h3>4.5 アウトプット(Outputs)</h3>

      <ul>
        <li>製品・サービスの仕様書</li>
        <li>プロトタイプ</li>
        <li>サービスレベル目標(SLA/XLA のドラフト)</li>
        <li>運用モデルの設計文書</li>
      </ul>

      <h3>4.6 CSF と指標の例</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>CSF</th>
            <th>指標例</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>設計段階で非機能要件が担保されている</td>
              <td>設計レビューでの非機能要件(可用性・セキュリティ等)指摘件数の低さ</td>
            </tr>
            <tr>
              <td>ユーザー体験が検証されている</td>
              <td>プロトタイプに対するユーザビリティテストの実施率、体験スコア</td>
            </tr>
            <tr>
              <td>設計と運用が乖離していない</td>
              <td>Design 段階のレビューに Operate/Support 担当者が参加した割合</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>4.7 実践的な推奨事項(ベストプラクティス)</h3>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>「運用できる設計(Design for Operability)」を徹底する</strong>: 可観測性(ログ・メトリクス・トレース)を後付けにせず、設計段階で組み込んでください。Operate・Support 担当者を Design レビューに巻き込むことが最も効果的な予防策です。</li>
          <li><strong>SLA/XLA は設計の入力であり、事後の交渉材料にしない</strong>: 目標可用性やレスポンスタイムは、アーキテクチャの意思決定(冗長化構成、キャッシュ戦略など)に直結します。設計完了後に SLA を握るのではなく、設計の前提として先に合意してください。</li>
          <li><strong>プロトタイプは「安く速く失敗する」ために使う</strong>: 本番相当の作り込みをする前に、最小限のプロトタイプで技術的リスクとユーザー体験の両方を検証し、Build 段階での手戻りコストを最小化してください。</li>
        </ul>
      </div>
    </section>

    

<section id="module4-acquire" class="guide-section" tabindex="-1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:shopping-cart" aria-hidden="true" />SECTION 06</div>
      <h2>Module 4: Acquire(獲得)</h2>

      <h3>5.1 目的(Purpose)</h3>

      <p>Acquire 活動の目的は、<strong>必要なリソース(技術、人材、サードパーティサービスなど)を効率的に確保・配分すること</strong> です。設計を実現するために「何を、どこから、どう調達するか」を決定する段階です。</p>

      <h3>5.2 技術・人材・サードパーティサービス調達の違い</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>調達対象</th>
            <th>特徴</th>
            <th>主な検討事項</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>技術(ハードウェア・ソフトウェア)</td>
              <td>比較的定型化されている</td>
              <td>ライセンス条件、拡張性、既存アーキテクチャとの整合性</td>
            </tr>
            <tr>
              <td>人材</td>
              <td>採用・育成・外部人材活用のバランスが必要</td>
              <td>スキルギャップの特定、内製 vs 外部委託の判断</td>
            </tr>
            <tr>
              <td>サードパーティサービス</td>
              <td>継続的な関係管理が必要</td>
              <td>SLA の設定、サプライヤーのガバナンス体制、ベンダーロックインのリスク</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>5.3 主要概念</h3>

      <ul>
        <li><strong>ソーシング戦略(Sourcing Strategy)</strong>: 内製(Build)か購入(Buy)か、あるいはハイブリッドかを決定する戦略的判断。コスト、専門性、戦略的重要度によって左右される</li>
        <li><strong>サービス財務管理の視点</strong>: 調達コストは一時費用だけでなく、運用中の継続コスト(TCO: 総所有コスト)まで見積もる必要がある</li>
      </ul>

      <h3>5.4 Acquire を支える有効化プラクティス</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>プラクティス</th>
            <th>Acquire における役割</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Supplier Management(サプライヤー管理)</td>
              <td>外部サプライヤーとの契約・パフォーマンス管理を担う</td>
            </tr>
            <tr>
              <td>IT Asset Management(IT資産管理)</td>
              <td>調達した資産のライフサイクル(登録・追跡・廃棄)を管理する</td>
            </tr>
            <tr>
              <td>Service Financial Management(サービス財務管理)</td>
              <td>調達コストの予算化、投資対効果の評価を担う</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>5.5 Acquire 活動のステップ</h3>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ACQUIREFIG11" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <h3>5.6 アウトプット(Outputs)</h3>

      <ul>
        <li>調達済みのリソース・サービス</li>
        <li>サプライヤー契約・SLA</li>
        <li>更新された IT 資産台帳</li>
      </ul>

      <h3>5.7 CSF と指標の例</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>CSF</th>
            <th>指標例</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>必要なリソースが適時に確保されている</td>
              <td>調達リードタイム、調達遅延によるプロジェクト遅延件数</td>
            </tr>
            <tr>
              <td>サプライヤーの品質が担保されている</td>
              <td>サプライヤー SLA 達成率</td>
            </tr>
            <tr>
              <td>総所有コストが適切に管理されている</td>
              <td>予算対比の調達コスト、TCO の見積り精度</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>5.8 実践的な推奨事項(ベストプラクティス)</h3>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>TCO で判断する</strong>: 初期調達コストの安さだけで判断せず、運用・保守・サポート・将来の拡張コストまで含めた総所有コストで比較検討してください。</li>
          <li><strong>サプライヤー管理を「契約締結後」で終わらせない</strong>: Acquire は一度きりの取引ではなく、Supplier Management プラクティスを通じた継続的な関係管理の起点です。定期的なパフォーマンスレビューを最初から契約に組み込んでください。</li>
          <li><strong>ベンダーロックインのリスクを可視化する</strong>: 特に AI・クラウド関連の調達では、移行コストやデータポータビリティを事前に評価し、将来の選択肢を狭めすぎないようにしてください。</li>
        </ul>
      </div>
    </section>

    
      <section id="module5-build" class="guide-section" tabindex="-1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:hammer" aria-hidden="true" />SECTION 07</div>
      <h2>Module 5: Build(構築)</h2>

      <h3>6.1 目的(Purpose)</h3>

      <p>Build 活動の目的は、<strong>デジタル製品のコンポーネントを開発・統合・テストし、設計を機能するソリューションへと転換すること</strong> です。</p>

      <h3>6.2 Design から Build への統合</h3>

      <p>Design 段階で作成された仕様・プロトタイプ・運用モデルは、Build 段階でそのまま実装の指針となります。両者が断絶していると、「設計と違うものができあがる」という典型的な失敗に陥ります。ITIL (Version 5) は、Design と Build を反復的に行き来すること(アジャイル的な進め方)を許容しており、一方向のウォーターフォールを強制するものではありません。</p>

      <h3>6.3 主要概念</h3>

      <ul>
        <li><strong>統合(Integration)</strong>: 個別に開発されたコンポーネントを組み合わせ、全体として機能させること</li>
        <li><strong>検証とテスト(Validation and Testing)</strong>: 機能要件・非機能要件の両方を検証するプロセス。単体テストから統合テスト、負荷テストまでを含む</li>
        <li><strong>Definition of Done</strong>: 何をもって「構築完了」とするかの合意。テストカバレッジ、コードレビュー、セキュリティスキャンの合格などを含めることが一般的</li>
      </ul>

      <h3>6.4 Build を支える有効化プラクティス</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>プラクティス</th>
            <th>Build における役割</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Software Development and Management(ソフトウェア開発・管理)</td>
              <td>コードの開発、バージョン管理、技術的負債の管理を担う</td>
            </tr>
            <tr>
              <td>Infrastructure and Platform Management(インフラ・プラットフォーム管理)</td>
              <td>開発・テスト環境を含む基盤の構築・維持を担う</td>
            </tr>
            <tr>
              <td>Service Validation and Testing(サービスの検証とテスト)</td>
              <td>機能要件・非機能要件を体系的に検証する</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>6.5 Build 活動のステップ</h3>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_BUILDFIG12" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <h3>6.6 アウトプット(Outputs)</h3>

      <ul>
        <li>構築・テスト済みのプロダクトソリューション</li>
        <li>テスト結果・品質レポート</li>
        <li>リリース候補(Release Candidate)</li>
      </ul>

      <h3>6.7 CSF と指標の例</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>CSF</th>
            <th>指標例</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>品質基準を満たした状態で構築が完了している</td>
              <td>テストカバレッジ、リリース前に検出された欠陥数</td>
            </tr>
            <tr>
              <td>開発サイクルが予測可能である</td>
              <td>ビルド〜テスト完了までのリードタイム、ビルド失敗率</td>
            </tr>
            <tr>
              <td>技術的負債が管理されている</td>
              <td>技術的負債バックログの増減トレンド</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>6.8 実践的な推奨事項(ベストプラクティス)</h3>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>CI(継続的インテグレーション)を早期に導入する</strong>: コンポーネントを統合してから問題が発覚すると手戻りコストが跳ね上がります。小さく頻繁に統合し、早期にフィードバックを得てください。</li>
          <li><strong>非機能要件のテストを後回しにしない</strong>: 機能テストだけでなく、負荷テスト・セキュリティテストを Build 段階のパイプラインに組み込み、Transition 直前に慌てて実施することを避けてください。</li>
          <li><strong>「動くこと」と「Definition of Done」を混同しない</strong>: チームで合意した完了の定義(テスト、ドキュメント、セキュリティ承認など)を明文化し、属人的な判断でリリース候補を確定しないようにしてください。</li>
        </ul>
      </div>
    </section>

    

<section id="module6-transition" class="guide-section" tabindex="-1">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:transfer" aria-hidden="true" />SECTION 08</div>
      <h2>Module 6: Transition(移行)</h2>

      <h3>7.1 目的(Purpose)</h3>

      <p>Transition 活動の目的は、<strong>新規または変更された製品を、安全かつ効果的に本番環境へ導入すること</strong>、およびサプライヤーのオンボーディング・オフボーディングを適切に行うことです。</p>

      <h3>7.2 製品移行へのアプローチ</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>アプローチ</th>
            <th>特徴</th>
            <th>適するケース</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Big Bang(一括移行)</td>
              <td>全ユーザー・全機能を一度に切り替える</td>
              <td>影響範囲が限定的で、ロールバックが容易な場合</td>
            </tr>
            <tr>
              <td>フェーズドロールアウト</td>
              <td>段階的にユーザー層・地域を拡大していく</td>
              <td>大規模なユーザーベース、リスクを抑えたい場合</td>
            </tr>
            <tr>
              <td>Blue-Green デプロイメント</td>
              <td>新旧2系統の環境を並行稼働させ、切替を即座に行う</td>
              <td>ダウンタイムを最小化したい場合</td>
            </tr>
            <tr>
              <td>カナリアリリース</td>
              <td>一部のトラフィックのみ新バージョンへ振り分け、段階的に拡大する</td>
              <td>本番トラフィックでの検証をリスクを抑えて行いたい場合</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>7.3 Transition を支える有効化プラクティス</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>プラクティス</th>
            <th>Transition における役割</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>Change Enablement(変更実現)</td>
              <td>変更のリスク評価と承認プロセスを通じて、安全な変更を実現する</td>
            </tr>
            <tr>
              <td>Release Management(リリース管理)</td>
              <td>複数の変更をまとめてリリース単位として計画・調整する</td>
            </tr>
            <tr>
              <td>Deployment Management(展開管理)</td>
              <td>実際の環境への配置・切替作業を実行する</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>7.4 Transition 活動のステップ</h3>

      <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_TRANSITIONFIG13" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中…</p>
              </template>
            </ClientOnly>
          </div>

      <h3>7.5 アウトプット(Outputs)</h3>

      <ul>
        <li>対象環境に展開され、稼働準備が整った製品・サービス</li>
        <li>リリースノート</li>
        <li>サプライヤーのオンボーディング / オフボーディング記録</li>
      </ul>

      <h3>7.6 CSF と指標の例</h3>

      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>CSF</th>
            <th>指標例</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>変更が安全に本番へ導入されている</td>
              <td>変更起因のインシデント発生率(Change Failure Rate)</td>
            </tr>
            <tr>
              <td>リリースの頻度と安定性が両立している</td>
              <td>デプロイ頻度、平均復旧時間(MTTR)</td>
            </tr>
            <tr>
              <td>ロールバックが迅速に実行できる</td>
              <td>ロールバック所要時間</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>7.7 実践的な推奨事項(ベストプラクティス)</h3>

      <div class="callout practice" data-variant="practice" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>変更の分類に応じて審査の重さを変える</strong>: 低リスクで頻度の高い変更(標準変更)は事前承認済みの自動化パイプラインに乗せ、高リスクな変更にのみ人的なレビューの労力を集中させてください。すべての変更を同じ重さで審査すると、変更管理そのものがボトルネックになります。</li>
          <li><strong>ロールバック手順は展開前に必ず検証しておく</strong>: 本番障害が発生してから初めてロールバック手順を試す、という事態は避けてください。カナリアリリースやBlue-Greenデプロイメントは、ロールバックの容易さという観点でも有効です。</li>
          <li><strong>Deployment Frequency と Change Failure Rate をセットで追う</strong>: リリース頻度だけを追うと品質が犠牲になり、変更失敗率だけを追うとリリースが停滞します。両方を DORA 指標的な発想でバランスさせてください。</li>
        </ul>
      </div>
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
