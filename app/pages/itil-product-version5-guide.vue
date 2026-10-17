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

const DIAGRAM_LIFECYCLE_OVERVIEW = `flowchart LR
subgraph PRODUCT["プロダクト志向が強い活動"]
direction LR
DIS["Discover 発見"] --> DES["Design 設計"] --> ACQ["Acquire 調達"] --> BLD["Build 構築"]
end
subgraph BRIDGE["橋渡しの活動"]
direction LR
TRA["Transition 移行"] --> OPE["Operate 運用"]
end
subgraph SERVICE["サービス志向が強い活動"]
direction LR
DEL["Deliver 提供"] --> SUP["Support サポート"]
end
BLD --> TRA
OPE --> DEL
SUP -.->|"フィードバック"| DIS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class DIS,DES,ACQ,BLD box
class TRA,OPE hub
class DEL,SUP done`;

const DIAGRAM_DISCOVER_STEPS = `flowchart TB
A["機会・課題の特定 (市場動向・利用者の声・データ分析)"] --> B["ビジョン/ポジショニング/ ポートフォリオと照合"]
B --> C["仮説の設定 (誰に・何を・なぜ)"]
C --> D["初期評価 (実現可能性・市場性・戦略適合度)"]
D --> E["優先順位付けと合意形成"]
E --> F(("アウトプット: 検証済み機会・ プロダクトコンセプト"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_DESIGN_STEPS = `flowchart TB
A["要件の具体化 (機能/非機能)"] --> B["ソリューション設計 (アーキテクチャ・UX)"]
B --> C["プロトタイプ/ 詳細仕様の作成"]
C --> D["リスク・セキュリティ・ コンプライアンス評価"]
D --> E["設計レビューと承認"]
E --> F(("アウトプット: 詳細設計仕様・ アーキテクチャ決定"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_ACQUIRE_STEPS = `flowchart TB
A["必要リソースの特定 (技術/人材/サードパーティ)"] --> B["Make/Buy/Partner の意思決定"]
B --> C["サプライヤー評価・ 調達先の選定"]
C --> D["契約・SLA・ 条件の合意"]
D --> E["オンボーディングと 受け入れ確認"]
E --> F(("アウトプット: 利用可能なリソース・ サプライヤー契約"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_BUILD_STEPS = `flowchart TB
A["設計仕様の 実装計画への分解"] --> B["コンポーネントの 開発・構成・組み立て"]
B --> C["自動化されたテスト (単体/結合/セキュリティ)"]
C --> D["技術的負債の 可視化と管理"]
D --> E["品質ゲートの通過確認"]
E --> F(("アウトプット: テスト済みビルド成果物"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_TRANSITION_STEPS = `flowchart TB
A["移行計画とリスク評価"] --> B["移行アプローチの選定 (一括/段階的/並行稼働)"]
B --> C["リハーサル・ 移行テスト"]
C --> D["運用準備状況の確認 (Operational Readiness)"]
D --> E["本番移行の実行"]
E --> F(("アウトプット: 本番稼働状態・ 移行記録"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_OPERATE_STEPS = `flowchart TB
A["監視・オブザーバビリティ の実装"] --> B["キャパシティ・ 可用性の計画"]
B --> C["日常運用 (パフォーマンス管理)"]
C --> D["異常検知と 自動対応/エスカレーション"]
D --> E["継続性計画の維持 (Continuity Planning)"]
E --> F(("アウトプット: 安定稼働・ 運用データ"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_DELIVER_STEPS = `flowchart TB
A["提供チャネル・ アクセス方法の確定"] --> B["エンタイトルメント/ アクセス権の管理"]
B --> C["サービスリクエストの 受付と履行"]
C --> D["SLA/合意水準に 基づく提供"]
D --> E["利用状況の可視化"]
E --> F(("アウトプット: 利用可能な状態のプロダクト・ 履行済みリクエスト"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_SUPPORT_STEPS = `flowchart TB
A["問い合わせ・ インシデントの受付"] --> B["トリアージと 優先順位付け"]
B --> C["診断と解決 (または回避策の提供)"]
C --> D["根本原因分析 (Problem Management)"]
D --> E["ナレッジの 蓄積とフィードバック"]
E --> F(("アウトプット: 解決済みインシデント・ ナレッジベース更新"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class A,B,C,D,E box
class F done`;

const DIAGRAM_VALUE_STREAM_FEATURE = `flowchart LR
S(("開始: 利用者からの 改善要望")) --> D1["Discover (機会の検証)"]
D1 --> D2["Design (解決策の設計)"]
D2 --> B1["Build (実装とテスト)"]
B1 --> T1["Transition (段階的リリース)"]
T1 --> DL1["Deliver (利用者への公開)"]
DL1 --> E(("完了: 価値の実現"))
DL1 -.->|"利用データ"| D1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
class D1,D2,B1,T1,DL1 box
class S,E hub`;

const DIAGRAM_VALUE_STREAM_INCIDENT = `flowchart LR
S2(("開始: インシデント発生")) --> SU["Support (トリアージ・診断)"]
SU --> O1["Operate (復旧措置)"]
O1 --> SU2["Support (根本原因分析)"]
SU2 --> E2(("完了: 正常状態への復帰・ 再発防止"))
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
class SU,O1,SU2 box
class S2,E2 hub`;
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

      <!-- SECTION 03 -->
      <section id="basic-concepts" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:building-bank" aria-hidden="true" />
          <span>SECTION 03</span>
        </div>
        <h2>基礎概念:デジタルプロダクトとサービス(Category 1)</h2>

        <p>シラバスCategory 1「Digital Products and Services」は、以降すべてのカテゴリの土台となる用語・概念を扱います。</p>
        <h3>プロダクトとサービスの定義</h3>
        <p>ITIL(Version 5)は、ITIL 4から継承した基本定義を土台にしています。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>用語</th>
                <th>定義(要旨)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>プロダクト(Product)</strong></td>
                <td>人・技術・情報などの組織のリソースを、消費者に価値を提供する形に構成したもの</td>
              </tr>
              <tr>
                <td><strong>サービス(Service)</strong></td>
                <td>顧客がコストとリスクを自ら管理することなく、望む成果(outcome)を達成できるよう、価値の共創を可能にする手段</td>
              </tr>
              <tr>
                <td><strong>デジタルプロダクト(Digital Product)</strong></td>
                <td>ソフトウェア・データ・デジタルインターフェースを中核とし、顧客に対して直接的なケイパビリティ(capability)を提供するプロダクト</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>ポイントは、<strong>プロダクトは「ケイパビリティ(できること)」を提供し、サービスは「そのケイパビリティを使って成果を実現するプロセス」を提供する</strong>、という役割分担です。両者は別々の管理対象ではなく、<strong>単一の統合システム</strong>としてマネジメントされるべきだ、というのがITIL Productの中心思想です。</p>

        <h3>デジタルプロダクトの特徴</h3>
        <p>デジタルプロダクトには、物理的なプロダクトと異なる以下のような特徴があります。</p>
        <ul>
          <li><strong>複製・配布コストがほぼゼロ</strong>: 一度構築すれば、追加の利用者への提供コストが極めて低い</li>
          <li><strong>継続的な変更が前提</strong>: リリース後も継続的にアップデート・改善されることが標準</li>
          <li><strong>データを介した即時のフィードバックループ</strong>: 利用状況やテレメトリが即座に観測可能</li>
          <li><strong>サービスとの分離が難しい</strong>: プロダクト単体で価値を持つことは稀で、多くの場合サポートやデリバリーといったサービス的要素と一体で価値を生む</li>
          <li><strong>AIによる能力拡張が前提になりつつある</strong>: 生成・要約・自動化などのAI機能がプロダクトの一部として組み込まれる</li>
        </ul>

        <h3>価値創出のメカニズム(価値共創)</h3>
        <p>ITIL(Version 5)においても、価値は組織が一方的に「提供」するものではなく、<strong>プロバイダーと消費者が協働して創出するもの(Value Co-creation)</strong>という考え方が中心にあります。デジタルプロダクトの文脈では、次の2段階で価値が実現します。</p>
        <ol>
          <li>プロダクトが利用者に<strong>ケイパビリティ</strong>を提供する(例:予約ができる、データを分析できる)</li>
          <li>そのケイパビリティを、サービス(サポート、デリバリー、運用)が<strong>実際の成果</strong>に変換する(例:予約が完了し、旅行という成果が実現する)</li>
        </ol>

        <h3>ITIL Product and Service Lifecycle Modelの目的と範囲</h3>
        <p>ITIL(Version 5)最大の構造的な追加は、Service Value System(SVS)の中核である「Service Value Chain(6活動)」をそのまま残したうえで、これと併存する形で<strong>「ITIL Product and Service Lifecycle Model」(8活動)</strong>という、プロダクトとサービスを統合したライフサイクルモデルが新設されたことです。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Service Value Chain(ITIL 4から継続)</th>
                <th>Product and Service Lifecycle Model(Version 5で新設)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>活動数</td>
                <td>6(Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support)</td>
                <td>8(Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support)</td>
              </tr>
              <tr>
                <td>主眼</td><td>組織全体のサービスバリューチェーン</td><td>プロダクトとサービスを一体とした、より粒度の細かい統合ライフサイクル</td>
              </tr>
              <tr>
                <td>位置づけ</td><td>Service Value System(SVS)の中核として存続</td><td>SVS内でバリューチェーン活動をより具体的に実行する、実務に近いモデルとして併存</td>
              </tr>
              <tr>
                <td>流れ方</td><td>非線形・反復的</td><td>非線形・反復的(バリューストリームとして自由に組合せ可能)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>この8活動は、<strong>厳密な順序を持つ直線的プロセスではなく</strong>、組織が状況に応じて組み合わせる「部品」です。この組合せ方こそが後述の<strong>バリューストリーム(Value Stream)</strong>であり、Category 10で詳しく扱います。</p>
        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>補足</span>
          </div>
          <p>8活動のうち、Discover〜Buildは「プロダクト志向」が強く、Deliver・Supportは「サービス志向」が強く、Transition・Operateはその橋渡し役、という性格分けが一般的な理解として紹介されています(公式教材の正式な分類ではなく、複数の認定トレーニングプロバイダーが共通して説明する整理です)。</p>
        </div>

        <h3>バリューチェーン活動とライフサイクルの関係</h3>
        <p>組織の「バリューチェーン活動」(Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support に相当する、より抽象度の高い組織活動)は、8つのライフサイクル活動を実行するための基盤を提供します。ライフサイクル活動はこのバリューチェーンの上で具体的に実行される、より実務に近い活動という位置づけです。</p>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li>プロダクトとサービスを<strong>分業ではなく1つの連続体</strong>として捉え、組織図上でもプロダクトチームとサービス運用チームの間に壁を作らない</li>
            <li>「これはプロダクトの問題か、サービスの問題か」という二択の議論を避け、<strong>どのライフサイクル活動・どのバリューストリームの問題か</strong>という粒度で会話する</li>
            <li>デジタルプロダクトの特徴(継続的変更、即時フィードバック)を前提に、<strong>一度作って終わりではない予算・体制</strong>を組む</li>
          </ul>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://itsm.tools/itil-version-5-vs-itil-4-key-changes/" target="_blank" rel="noopener">ITIL(Version 5) Changes Explained</a></li>
            <li><a href="https://www.teamdynamix.com/blog/an-introduction-to-the-itil-framework/" target="_blank" rel="noopener">What is ITIL 5? A Guide to the New ITIL Framework</a></li>
            <li><a href="https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation/" target="_blank" rel="noopener">The Definitive Guide to ITIL® Version 5 Foundation(PMG Academy)</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 04 -->
      <section id="lifecycle-overview" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:route" aria-hidden="true" />
          <span>SECTION 04</span>
        </div>
        <h2>ITIL Product and Service Lifecycle Model全体像</h2>

        <p>本章では、5〜12章で個別に解説する8活動の全体像を先に俯瞰します。</p>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_LIFECYCLE_OVERVIEW" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">8つのライフサイクル活動の全体像とフィードバックループ</div>
        </div>
        <p>重要なのは、上図の矢印は<strong>典型的な進行イメージ</strong>であって、<strong>実際には固定された一方向の順序ではない</strong>という点です。組織は自らの状況に応じて、これら8活動の中から必要なものを選び、順序を入れ替え、繰り返し実行しながら「バリューストリーム」を組み立てます(詳細はCategory 10で解説)。</p>

        <h3>各活動の一覧と目的(概要)</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>活動</th>
                <th>一言でいうと</th>
                <th>主な問い</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>Discover</strong></td>
                <td>市場・利用者ニーズを理解する</td>
                <td>「何を作るべきか」</td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong>Design</strong></td>
                <td>ニーズを具体的な解決策に変換する</td>
                <td>「どう作るべきか」</td>
              </tr>
              <tr>
                <td>3</td>
                <td><strong>Acquire</strong></td>
                <td>必要なリソースを調達する</td>
                <td>「作る・買う・借りる、どれか」</td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong>Build</strong></td>
                <td>コンポーネントを構築・統合・テストする</td>
                <td>「動くものを作る」</td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong>Transition</strong></td>
                <td>本番環境へ安全に移行する</td>
                <td>「安全に切り替えるには」</td>
              </tr>
              <tr>
                <td>6</td>
                <td><strong>Operate</strong></td>
                <td>インフラとシステムを稼働させ続ける</td>
                <td>「動き続けさせるには」</td>
              </tr>
              <tr>
                <td>7</td>
                <td><strong>Deliver</strong></td>
                <td>利用者が実際に使える状態にする</td>
                <td>「価値を届けるには」</td>
              </tr>
              <tr>
                <td>8</td>
                <td><strong>Support</strong></td>
                <td>問題やリクエストに対応する</td>
                <td>「正常状態に戻すには」</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>各活動は、シラバス上、共通して次の3つの観点で出題されます。</p>
        <ol>
          <li><strong>Key concepts and practices</strong>(主要概念とその活動を支えるITILプラクティス)</li>
          <li><strong>Steps and outputs</strong>(具体的なステップとアウトプット、BL3で「適用」が問われる)</li>
          <li><strong>Success factors and metrics</strong>(CSFとメトリクス、実効性を高める実践的助言)</li>
        </ol>
        <p>以降の章では、この3観点に沿って8活動をひとつずつ解説します。</p>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.diontraining.com/blogs/news/itil-5-process" target="_blank" rel="noopener">ITIL 5 Process Guide</a></li>
            <li><a href="https://blog.invgate.com/itil-5-what-changes" target="_blank" rel="noopener">ITIL 5 vs ITIL 4: What Changed</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus (公式シラバス)</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 05 -->
      <section id="discover" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:search" aria-hidden="true" />
          <span>SECTION 05</span>
        </div>
        <h2>Discover(発見)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Discoverは、ライフサイクルの起点であり、「<strong>市場や利用者が何を必要としているかを理解し、それを組織の戦略と整合させる</strong>」ことを目的とする活動です。</p>
        <p>シラバスは、Discoverの主要概念として、<strong>ビジョン(Vision)・ポジショニング(Positioning)・ポートフォリオ(Portfolio)</strong> の3つが発見活動にどう情報を与えるかを重視しています。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>要素</th><th>発見活動における役割</th></tr></thead>
            <tbody>
              <tr><td><strong>ビジョン</strong></td><td>組織が長期的に実現したい未来像。どの機会を追求すべきかの判断基準になる</td></tr>
              <tr><td><strong>ポジショニング</strong></td><td>競合・市場の中で自組織のプロダクトをどう位置づけるか。差別化の軸を定める</td></tr>
              <tr><td><strong>ポートフォリオ</strong></td><td>現在保有しているプロダクト・サービスの全体像。新しい機会が既存ポートフォリオとどう関係するかを判断する土台になる</td></tr>
            </tbody>
          </table>
        </div>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DISCOVER_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Discover活動のステップとアウトプット</div>
        </div>
        <p><strong>主なアウトプット</strong>:</p>
        <ul>
          <li>検証された市場機会・課題の定義</li>
          <li>初期のプロダクトコンセプト、または既存プロダクトの改善仮説</li>
          <li>優先順位付けされた機会のリスト(ポートフォリオへのインプット)</li>
        </ul>
        <h3>Discoverを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Discoverでの役割</th></tr></thead>
            <tbody>
              <tr><td>Strategy management</td><td>組織の長期方向性と発見された機会の整合を取る</td></tr>
              <tr><td>Portfolio management</td><td>新しい機会を既存ポートフォリオの中で評価・優先順位付けする</td></tr>
              <tr><td>Business analysis</td><td>利用者・ステークホルダーのニーズを構造化して可視化する</td></tr>
              <tr><td>Relationship management</td><td>顧客・利用者からの継続的なインサイト収集チャネルを維持する</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>戦略と整合した機会が特定できている</td><td>ビジョン/戦略目標にひも付いた発見案件の比率</td></tr>
              <tr><td>意思決定が根拠(エビデンス)に基づいている</td><td>定性・定量データに裏付けられた仮説の割合</td></tr>
              <tr><td>発見から意思決定までのリードタイムが適切</td><td>機会特定〜Go/No-Go判断までの平均日数</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li>「思いつき」ではなく、<strong>利用者インタビュー・利用データ・市場データという複数の証拠源</strong>を突き合わせてから機会を確定させる</li>
            <li>Discoverの結果を<strong>ポートフォリオに即座に反映</strong>し、他の進行中プロダクトとの重複・競合を早期に発見する</li>
            <li>発見のサイクルを<strong>一度きりのフェーズにせず、継続的な活動</strong>として運用する(プロダクトが稼働した後もSupport活動からのフィードバックがDiscoverに還流する設計にする)</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>市場投入前に無駄な投資を回避できる</td><td>ステークホルダーの声が大きい要求と、実際の市場ニーズが乖離するリスク</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.pmgacademy.com/en/articles/itil/the-definitive-guide-to-itil-version-5-foundation/" target="_blank" rel="noopener">The Definitive Guide to ITIL® Version 5 Foundation</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 06 -->
      <section id="design" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:pencil" aria-hidden="true" />
          <span>SECTION 06</span>
        </div>
        <h2>Design(設計)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Designは、Discoverで特定された機会を、<strong>具体的で実現可能な解決策</strong>に変換する活動です。ここでは、機能要件だけでなく、非機能要件(セキュリティ・スケーラビリティ・アクセシビリティなど)も含めた包括的な設計判断が行われます。</p>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DESIGN_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Design活動のステップとアウトプット</div>
        </div>
        <p><strong>主なアウトプット</strong>:</p>
        <ul>
          <li>詳細設計仕様書・アーキテクチャ決定記録</li>
          <li>プロトタイプ、またはユーザーテスト済みのデザイン成果物</li>
          <li>後続のAcquire/Build活動へのインプットとなる技術要件</li>
        </ul>
        <h3>Designを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Designでの役割</th></tr></thead>
            <tbody>
              <tr><td>Architecture management</td><td>全体アーキテクチャとの整合性を確保する</td></tr>
              <tr><td>Service design</td><td>サービスとしての利用体験・運用性を設計に織り込む</td></tr>
              <tr><td>Business analysis</td><td>要件を設計仕様へ翻訳する</td></tr>
              <tr><td>Risk management</td><td>設計上のリスクを早期に特定し軽減策を組み込む</td></tr>
              <tr><td>Information security management</td><td>セキュリティ・バイ・デザインを実現する</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>設計が利用者ニーズを的確に反映している</td><td>ユーザーテストでの合格率・満足度</td></tr>
              <tr><td>設計が後工程で手戻りを起こさない</td><td>Build/Transition段階での設計起因の手戻り件数</td></tr>
              <tr><td>セキュリティ・コンプライアンスが設計段階で担保されている</td><td>設計レビューで検出されたセキュリティ懸念の解消率</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li><strong>人間中心設計(Human-Centred Design)</strong>の手法を用い、実際の利用者を設計プロセスの早い段階から巻き込む</li>
            <li>アーキテクチャ判断は<strong>Architecture Decision Record(ADR)</strong>のような形で記録し、後の意思決定の根拠を追跡可能にする</li>
            <li>「一度に完璧な設計」を目指さず、<strong>検証可能な最小単位の設計→フィードバック→反復</strong>というサイクルを回す</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>手戻りの少ない実装が可能になる</td><td>設計に時間をかけすぎると市場投入(Time to Market)が遅れる</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://itsm.tools/itil-version-5-vs-itil-4-key-changes/" target="_blank" rel="noopener">ITIL(Version 5) Changes Explained</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 07 -->
      <section id="acquire" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:shopping-cart" aria-hidden="true" />
          <span>SECTION 07</span>
        </div>
        <h2>Acquire(調達)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Acquireは、プロダクトを実現するために必要な<strong>リソース(技術・人材・サードパーティサービス)</strong>を、どのように獲得するかを決定・実行する活動です。シラバスは特に、<strong>技術の調達・人材の調達・サードパーティサービスの調達の違い</strong>を理解することを求めています。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>調達対象</th><th>典型的な調達方法</th><th>判断のポイント</th></tr></thead>
            <tbody>
              <tr><td><strong>技術(Technology)</strong></td><td>購入・ライセンス・クラウド利用・自社開発</td><td>Build vs Buy、TCO、ベンダーロックインのリスク</td></tr>
              <tr><td><strong>人材(People)</strong></td><td>社内異動・新規採用・業務委託</td><td>必要スキルの希少性、長期的な内製化戦略</td></tr>
              <tr><td><strong>サードパーティサービス</strong></td><td>アウトソーシング・マネージドサービス契約</td><td>SLA、責任分界点、供給継続性</td></tr>
            </tbody>
          </table>
        </div>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ACQUIRE_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Acquire活動のステップとアウトプット</div>
        </div>
        <h3>Acquireを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Acquireでの役割</th></tr></thead>
            <tbody>
              <tr><td>Supplier management</td><td>サプライヤーの選定・契約・パフォーマンス管理を行う</td></tr>
              <tr><td>Service financial management</td><td>調達コストの予算化・投資対効果の評価を行う</td></tr>
              <tr><td>Workforce and talent management</td><td>必要な人材の獲得・育成計画を支える</td></tr>
              <tr><td>IT asset management</td><td>調達した資産のライフサイクルを記録・管理する</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>調達判断(Make/Buy/Partner)が妥当である</td><td>調達後のコスト超過・遅延の発生率</td></tr>
              <tr><td>サプライヤーが信頼できる</td><td>サプライヤーのSLA達成率</td></tr>
              <tr><td>長期的な供給リスクが管理されている</td><td>単一サプライヤー依存度(ベンダーロックインの指標)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li>Make/Buy/Partnerの判断は、<strong>初期コストだけでなく、TCO(総保有コスト)と将来の柔軟性</strong>の両面で評価する</li>
            <li>重要なサードパーティサービスについては、<strong>単一障害点(Single Point of Failure)にならないよう複数サプライヤー戦略</strong>を検討する</li>
            <li>調達判断の根拠を<strong>ポートフォリオ・ビジョンとの整合性</strong>に照らして記録し、将来の監査・レビューに備える</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>内製できない専門性を迅速に補える</td><td>サプライヤー依存によるガバナンス・セキュリティリスクの増大</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
            <li><a href="https://www.theknowledgeacademy.com/courses/itil-training/itil-5-managing-professional-transition-training-course/" target="_blank" rel="noopener">ITIL® 5 Managing Professional Transition Course</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 08 -->
      <section id="build" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:hammer" aria-hidden="true" />
          <span>SECTION 08</span>
        </div>
        <h2>Build(構築)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Buildは、Design活動で作られた仕様を、実際に<strong>コーディング・設定・組み立て・テスト</strong>して形にする活動です。シラバスは特に「<strong>設計をBuild活動にどう統合するか(integration of design into build)</strong>」を重視しており、設計とビルドを別チームの断絶した工程として扱わないことがポイントになります。</p>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_BUILD_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Build活動のステップとアウトプット</div>
        </div>
        <h3>Buildを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Buildでの役割</th></tr></thead>
            <tbody>
              <tr><td>Software development and management</td><td>ソフトウェアの開発・構成管理を行う</td></tr>
              <tr><td>Infrastructure and platform management</td><td>基盤・プラットフォームの構築を支える</td></tr>
              <tr><td>Change enablement</td><td>ビルド成果物を本番投入可能な変更として評価する</td></tr>
              <tr><td>Knowledge management</td><td>実装判断・既知の制約をチーム間で共有する</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>ビルドの品質が高い</td><td>テストカバレッジ、欠陥密度(Defect Density)</td></tr>
              <tr><td>技術的負債が管理されている</td><td>技術的負債バックログの増減トレンド</td></tr>
              <tr><td>リリース可能な状態を迅速に作れる</td><td>ビルドからデプロイ可能状態までのリードタイム</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li>テスト・ガバナンス・技術的負債管理を<strong>自動化パイプライン(CI/CD)に組み込み</strong>、人手の確認に頼らない品質保証を実現する</li>
            <li><strong>技術的負債を「見えない借金」にせず、バックログとして可視化</strong>し、Discover/Designへのフィードバックとして定期的に扱う</li>
            <li>Design活動の担当者がBuild活動に継続的に関与できる体制(設計と実装の分業を最小化)を作る</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>自動化により高速かつ一貫した品質のリリースが可能になる</td><td>自動化への初期投資と、技術的負債の蓄積による長期的な速度低下リスク</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.diontraining.com/blogs/news/itil-5-process" target="_blank" rel="noopener">ITIL 5 Process Guide, Workflows, Practices & Real Examples</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 09 -->
      <section id="transition" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:transfer" aria-hidden="true" />
          <span>SECTION 09</span>
        </div>
        <h2>Transition(移行)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Transitionは、構築されたプロダクトを<strong>開発環境から本番環境へ、リスクを管理しながら安全に移行する</strong>活動です。シラバスは「プロダクト移行への複数のアプローチ(approaches to product transition)」を理解することを求めており、一括移行・段階的移行・並行稼働など複数の移行戦略があることを前提としています。</p>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_TRANSITION_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Transition活動のステップとアウトプット</div>
        </div>
        <h3>Transitionを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Transitionでの役割</th></tr></thead>
            <tbody>
              <tr><td>Change enablement</td><td>変更の評価・承認・スケジューリングを行う</td></tr>
              <tr><td>Release management</td><td>リリース単位の計画・調整・展開を管理する</td></tr>
              <tr><td>Deployment management</td><td>環境への実際の展開作業を実行する</td></tr>
              <tr><td>Service validation and testing</td><td>本番相当の環境で受け入れ基準を検証する</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>移行に伴う障害・手戻りが最小化されている</td><td>変更起因インシデント率(Change Failure Rate)</td></tr>
              <tr><td>移行の意思決定が迅速である</td><td>変更リードタイム(Lead Time for Changes)</td></tr>
              <tr><td>運用チームが移行後すぐに対応できる</td><td>移行後のEarly Life Support期間中のエスカレーション件数</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li>移行前に<strong>ロールバック計画</strong>を必ず用意し、「戻れない移行」をしない</li>
            <li><strong>運用準備性(Operational Readiness)のチェックリスト</strong>を移行のGoサインの必須条件にする(監視設定、ランブック、オンコール体制の確認など)</li>
            <li>リリース頻度を上げることでリスクを分散する(<strong>小さく・頻繁な移行</strong>は、大きく・稀な移行よりも一般に失敗コストが低い)</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>段階的な移行によりビジネスへの影響を最小化できる</td><td>移行中の並行稼働はコストと複雑性を増大させる</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
            <li><a href="https://blog.invgate.com/itil-5-what-changes" target="_blank" rel="noopener">ITIL 5 vs ITIL 4: What Changed</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 10 -->
      <section id="operate" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:activity" aria-hidden="true" />
          <span>SECTION 10</span>
        </div>
        <h2>Operate(運用)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Operateは、本番稼働しているインフラ・システムを<strong>日々稼働させ続け、パフォーマンスを監視する</strong>活動です。シラバスは「プロダクト運用へのアプローチ(approaches to product operation)」の理解を求めており、SRE(Site Reliability Engineering)的な考え方との親和性が高い領域です。</p>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_OPERATE_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Operate活動のステップとアウトプット</div>
        </div>
        <h3>Operateを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Operateでの役割</th></tr></thead>
            <tbody>
              <tr><td>Monitoring and event management</td><td>システム状態を継続的に監視し異常を検知する</td></tr>
              <tr><td>Availability management</td><td>合意された可用性水準を維持する</td></tr>
              <tr><td>Capacity and performance management</td><td>需要に応じたキャパシティを計画・調整する</td></tr>
              <tr><td>Service continuity management</td><td>大規模障害時の事業継続性を確保する</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>システムが高い信頼性で稼働している</td><td>可用性(Uptime %)、MTTR(平均復旧時間)</td></tr>
              <tr><td>異常を早期に検知できている</td><td>アラートのノイズ比率、検知から対応開始までの時間</td></tr>
              <tr><td>将来の需要に備えられている</td><td>キャパシティ予測の精度</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li><strong>SRE原則(エラーバジェット、SLO/SLI)</strong>を導入し、信頼性と機能開発速度のバランスを定量的に管理する</li>
            <li>監視は「システムが落ちたことを知る」だけでなく、<strong>オブザーバビリティ(ログ・メトリクス・トレースの統合)</strong>によって「なぜ落ちたか」を素早く特定できる状態を目指す</li>
            <li>インシデント対応の<strong>自動化(Auto-remediation)</strong>を、繰り返し発生する既知の問題から優先的に導入する</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>高い信頼性がブランド価値・顧客満足に直結する</td><td>過剰な信頼性投資は機能開発リソースを圧迫する(信頼性とスピードのトレードオフ)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
            <li><a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-product-version-5-4179" target="_blank" rel="noopener">ITIL Product (Version 5) | peoplecert.org(「Reliable and Observable Operations」の記述)</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 11 -->
      <section id="deliver" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:truck-delivery" aria-hidden="true" />
          <span>SECTION 11</span>
        </div>
        <h2>Deliver(提供)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Deliverは、稼働しているプロダクトを<strong>実際に利用者が消費できる状態にする</strong>活動です。シラバスは「プロダクトライフサイクルにおけるサービスデリバリー(service delivery in product lifecycle)」という表現を使っており、Operateが「動かし続ける」ことに主眼を置くのに対し、Deliverは「<strong>利用者の手元に価値を届け、アクセスやリクエストを管理する</strong>」ことに主眼を置きます。</p>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DELIVER_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Deliver活動のステップとアウトプット</div>
        </div>
        <h3>Deliverを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Deliverでの役割</th></tr></thead>
            <tbody>
              <tr><td>Service level management</td><td>合意されたサービス水準(SLA)の遵守を管理する</td></tr>
              <tr><td>Service catalogue management</td><td>利用可能なプロダクト・サービスを一元的に可視化する</td></tr>
              <tr><td>Service request management</td><td>利用者からの標準化されたリクエストを履行する</td></tr>
              <tr><td>Relationship management</td><td>顧客・利用者との関係を維持し、期待値を調整する</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>利用者が迅速に価値へアクセスできている</td><td>オンボーディング完了までのリードタイム</td></tr>
              <tr><td>合意した水準でサービスが提供されている</td><td>SLA達成率</td></tr>
              <tr><td>リクエスト対応が効率的である</td><td>リクエスト充足時間(Request Fulfilment Time)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li>サービスカタログを<strong>常に最新化</strong>し、利用者が「何が使えるか」を自己解決できるセルフサービス化を進める</li>
            <li>頻出するリクエストは<strong>自動化・ワークフロー化</strong>し、人手の介在を最小限にする</li>
            <li>SLAは一方的な約束ではなく、<strong>利用者の実際の期待値とすり合わせた上で設定</strong>する</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>セルフサービス化により運用コストを抑えつつ満足度を高められる</td><td>過度な自動化は複雑な例外リクエストへの対応力を下げるリスクがある</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 12 -->
      <section id="support" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:headset" aria-hidden="true" />
          <span>SECTION 12</span>
        </div>
        <h2>Support(サポート)活動</h2>

        <h3>目的と主要概念</h3>
        <p>Supportは、稼働中に発生する<strong>インシデントやリクエストに対応し、正常な状態を回復する</strong>活動です。多くの利用者にとって、プロダクトとの「最も記憶に残る接点」はSupportであることが多く、体験(Experience)品質に直結する重要な活動として位置づけられます。</p>
        <h3>ステップとアウトプット</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SUPPORT_STEPS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Support活動のステップとアウトプット</div>
        </div>
        <h3>Supportを支える代表的プラクティス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>プラクティス</th><th>Supportでの役割</th></tr></thead>
            <tbody>
              <tr><td>Incident management</td><td>サービス中断からの迅速な復旧を担う</td></tr>
              <tr><td>Problem management</td><td>繰り返し発生する問題の根本原因を特定・除去する</td></tr>
              <tr><td>Service desk</td><td>利用者との単一窓口となる</td></tr>
              <tr><td>Knowledge management</td><td>解決策やFAQをナレッジとして蓄積・再利用可能にする</td></tr>
            </tbody>
          </table>
        </div>
        <h3>成功要因(CSF)とメトリクス(例)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>CSF</th><th>代表的なメトリクス例</th></tr></thead>
            <tbody>
              <tr><td>インシデントが迅速に解決されている</td><td>平均解決時間(MTTR)、一次解決率(First Contact Resolution)</td></tr>
              <tr><td>同じ問題の再発が防止されている</td><td>既知の問題(Known Error)からの再発インシデント件数</td></tr>
              <tr><td>利用者体験が良好である</td><td>サポート満足度(CSAT)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <ul>
            <li>単発のインシデント対応で終わらせず、<strong>Problem Managementに必ず接続</strong>し、根本原因の除去まで責任を持つ</li>
            <li>ナレッジベースを<strong>サポート担当者だけでなく利用者にも公開</strong>し、セルフサービスでの解決を促す</li>
            <li>サポートで得られた知見を<strong>Discover活動へのフィードバックループ</strong>として明示的に接続し、次のプロダクト改善に活かす</li>
          </ul>
        </div>
        <h3>プロダクトベンダー視点でのメリットと課題</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>メリット</th><th>課題</th></tr></thead>
            <tbody>
              <tr><td>ベンダー視点</td><td>高品質なサポートは解約率(チャーン)を下げるロイヤルティの源泉になる</td><td>サポート量の増加はコスト増に直結するため、根本原因解消による「サポート需要そのものの削減」が重要になる</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
            <li><a href="https://www.diontraining.com/blogs/news/itil-5-process" target="_blank" rel="noopener">ITIL 5 Process Guide</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 13 -->
      <section id="lifecycle-management" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:sitemap" aria-hidden="true" />
          <span>SECTION 13</span>
        </div>
        <h2>ライフサイクル全体のマネジメント(Category 10.1)</h2>

        <p>ここまでの8活動は、それぞれ独立した「機能」として解説してきましたが、実際の組織では<strong>これらを状況に応じて組み合わせて使う</strong>ことが求められます。シラバスCategory 10「Lifecycle Management」は、この統合的な視点を扱います。</p>
        <h3>オペレーティングモデルと責任分担</h3>
        <p>「オペレーティングモデル」とは、<strong>8つのライフサイクル活動それぞれの責任を、組織内のどのチーム・役割が担うか</strong>を定義したものです。組織の規模や成熟度によって、以下のようなパターンがあります。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>パターン</th><th>特徴</th><th>適したケース</th></tr></thead>
            <tbody>
              <tr><td>活動別専門チーム型</td><td>Discoverチーム、Buildチームのように活動ごとに専門部隊を置く</td><td>大規模組織、複数プロダクトを並行運用する場合</td></tr>
              <tr><td>クロスファンクショナル・プロダクトチーム型</td><td>1つのプロダクトチームが複数活動を横断的に担う(Discover〜Supportまで)</td><td>プロダクト志向・アジャイル/DevOps文化が浸透した組織</td></tr>
              <tr><td>ハイブリッド型</td><td>中核活動(Design/Build)は専任チーム、周辺活動(Discover/Support)は横断的に協業</td><td>成長過程にある組織、専門性とスピードのバランスを取りたい場合</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <p>どのパターンを選んでも、<strong>「誰がどの活動に対してどんな意思決定権を持つか」を明文化</strong>し、サイロ化(部門間の壁)を防ぐことが最重要です。ITIL Product (Version 5)全体を貫くテーマである「Cross-Functional Value Alignment(部門横断的な価値の整合)」は、まさにこのオペレーティングモデル設計の巧拙にかかっています。</p>
        </div>
        <h3>プロダクトベンダーのバリューストリーム</h3>
        <p><strong>バリューストリーム(Value Stream)</strong>とは、特定の目的(例:新機能をリリースする、インシデントに対応する)を達成するために、8つのライフサイクル活動の中から<strong>必要なものだけを選び、実際の業務フローとして具体化したもの</strong>です。</p>
        <p>以下は、「新機能のアイデアを市場に届ける」という目的で組み立てた、プロダクトベンダーのバリューストリームの例です。</p>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_VALUE_STREAM_FEATURE" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">バリューストリーム例: 新機能のアイデアを市場に届ける</div>
        </div>
        <p>同じ8活動から、<strong>「インシデントに対応する」という別の目的</strong>では、まったく異なるバリューストリームが組み立てられます。</p>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_VALUE_STREAM_INCIDENT" theme="base" :theme-variables="LIGHT_THEME_VARS" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">バリューストリーム例: インシデントに対応する</div>
        </div>
        <p>このように、<strong>同じ8活動という「部品」を、目的別に異なる順序・組合せで再利用するのがバリューストリームの本質</strong>です。ITIL 4で学んだ「Value Stream Mapping」の考え方が、8活動を対象にそのまま拡張されています。</p>
        <h3>バリューストリームがライフサイクル段階を統合する方法</h3>
        <p>バリューストリームがうまく機能するためには、以下の点が重要です。</p>
        <ul>
          <li><strong>各活動間のハンドオフ(引き継ぎ)を最小化</strong>する: Design→Buildのような引き継ぎで情報が失われないよう、共通のツール・ドキュメント基盤を用意する</li>
          <li><strong>フローの可視化</strong>: バリューストリームマッピングを行い、どこに待ち時間(Wait Time)やボトルネックがあるかを可視化する</li>
          <li><strong>フィードバックループを明示的に設計する</strong>: Support→Discoverのように、下流の知見が上流に還流する経路を意図的に作る</li>
        </ul>
        <h3>組織・テクノロジーイネーブルメント</h3>
        <p>ライフサイクル全体を横断してスムーズに機能させるには、次の2つのイネーブルメント(実現要因)が必要です。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>イネーブルメント</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td><strong>組織的イネーブルメント</strong></td><td>部門横断チームの権限設計、共通の評価指標(KPI)、心理的安全性のある文化</td></tr>
              <tr><td><strong>技術的イネーブルメント</strong></td><td>全活動を貫く共通のツールチェーン(バックログ管理・CI/CD・監視基盤)、データの一元管理、AIによる自動化基盤</td></tr>
            </tbody>
          </table>
        </div>
        <h3>デジタルプロダクトマネジメント成功要因(横断的まとめ)</h3>
        <p>各活動のCSF(5〜12章)を横断して見ると、以下の共通パターンが浮かび上がります。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>横断的な成功要因</th><th>該当する活動</th></tr></thead>
            <tbody>
              <tr><td>エビデンスに基づく意思決定</td><td>Discover, Design</td></tr>
              <tr><td>自動化による品質と速度の両立</td><td>Build, Operate</td></tr>
              <tr><td>リスクを管理した変化への対応</td><td>Transition</td></tr>
              <tr><td>利用者体験を中心に据えた運用</td><td>Deliver, Support</td></tr>
              <tr><td>フィードバックループの継続的な還流</td><td>Support → Discover</td></tr>
            </tbody>
          </table>
        </div>
        <h3>プロダクトマネジメントを支える組織構造</h3>
        <p>シラバスは「適切な組織構造をプロダクトマネジメントの成功に適用する(Apply an appropriate organizational structure)」ことをBL3(適用)レベルで求めています。実務上のポイントは以下のとおりです。</p>
        <ul>
          <li>プロダクトオーナー/プロダクトマネージャーに<strong>明確な意思決定権限</strong>を与える(権限のない責任者を作らない)</li>
          <li>サプライヤー・パートナーを含めた<strong>エコシステム全体を見渡せるガバナンス層</strong>を設ける</li>
          <li>組織構造は固定的なものではなく、<strong>プロダクトの成熟度(発見期・成長期・成熟期)に応じて見直す</strong></li>
        </ul>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-product-version-5-4179" target="_blank" rel="noopener">ITIL Product (Version 5) | peoplecert.org(Value Stream Integration and Flow Optimizationの記述)</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
          </ul>
        </div>
      </section>

      <!-- SECTION 14 -->
      <section id="ai-and-frameworks" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:robot" aria-hidden="true" />
          <span>SECTION 14</span>
        </div>
        <h2>ITIL・AI・他フレームワークとの関係(Category 10.2)</h2>

        <h3>ITIL AI Capability Model(6Cモデル)</h3>
        <p>ITIL(Version 5)最大の新機軸のひとつが、<strong>ITIL AI Capability Model(通称「6Cモデル」)</strong>です。これは、AIソリューションが果たす機能を6つのカテゴリに分類し、組織がAI活用のケイパビリティを評価・育成するためのモデルです。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Capability(能力)</th><th>内容</th><th>プロダクトマネジメントでの活用例</th></tr></thead>
            <tbody>
              <tr><td><strong>Creation(創出)</strong></td><td>新しいコンテンツ・コード・ドキュメントを生成する</td><td>設計仕様のドラフト生成、コード自動生成</td></tr>
              <tr><td><strong>Curation(整理)</strong></td><td>既存データの重複を除去し、品質・関連性を高める</td><td>ナレッジベースの整理、重複バックログの統合</td></tr>
              <tr><td><strong>Clarification(明確化)</strong></td><td>複雑な内容の理解を助ける</td><td>インシデントチケットの要約、長文要件の平易化</td></tr>
              <tr><td><strong>Cognition(認知)</strong></td><td>パターンを識別し、隠れた洞察を見つける</td><td>障害の予兆検知、利用データからの機会発見</td></tr>
              <tr><td><strong>Communication(対話)</strong></td><td>自然な対話インターフェースを提供する</td><td>チャットボット、バーチャルアシスタントによる一次対応</td></tr>
              <tr><td><strong>Coordination(調整)</strong></td><td>複数のアクションを自律的に実行・オーケストレーションする</td><td>自動復旧(Auto-remediation)、承認フローの自動化</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>補足</span>
          </div>
          <p>6Cモデルの目的は「どのAI技術を使うべきか」を指定することではなく、<strong>「このAI機能は6つのうちどの役割を果たしているか」を明確に言語化する</strong>ことです(参考: 各能力は異なるリスクプロファイルとガバナンス要件を持つため、この分類がAIガバナンスの出発点になります)。</p>
        </div>
        <h3>AIがプロダクトマネジメントを支援する方法</h3>
        <p>シラバスは、AIが以下のような場面でプロダクトマネジメントを支援すると位置づけています。</p>
        <ul>
          <li><strong>Build活動</strong>: コード生成・自動テストによる開発速度の向上</li>
          <li><strong>Operate活動</strong>: 異常検知・予測的キャパシティ計画</li>
          <li><strong>Deliver/Support活動</strong>: チャットボットによる一次対応、リクエストの自動トリアージ</li>
          <li><strong>Lifecycle Management全体</strong>: 利用データ・フィードバックの分析による、Discoverへのインサイト提供</li>
        </ul>
        <h3>AI・自動化が手法とツールに与える影響</h3>
        <p>AIの浸透により、Discover〜Operateにかけて使われる手法・ツールにも変化が生じています。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>変化の方向性</th><th>具体例</th></tr></thead>
            <tbody>
              <tr><td>分析の高速化</td><td>大量の利用者フィードバックをAIが要約・分類し、Discoverの初期分析を短縮</td></tr>
              <tr><td>開発支援の高度化</td><td>AIコーディングアシスタントによるBuild活動の効率化</td></tr>
              <tr><td>運用の予測化</td><td>障害発生前の予兆検知(Predictive Operations)</td></tr>
              <tr><td>ガバナンスの必要性増大</td><td>AIの判断根拠の説明責任(Explainability)、人間による監督(Human-in-the-loop)の設計</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <p>AIを導入する際は、<strong>「どのCapability(6Cのどれ)を、どの活動に、どの程度の自律性(人間の関与レベル)で適用するか」を明示的に設計</strong>することが、AIガバナンス上の出発点になります。特にCoordination(自律実行)は最もリスクが高いため、人間による承認ゲートを残す設計が推奨されます。</p>
        </div>
        <h3>ITILとDevOpsの補完関係</h3>
        <p>ITIL(Version 5)とDevOpsは競合するフレームワークではなく、<strong>互いを補完する関係</strong>として位置づけられています。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>ITILが強い領域</th><th>DevOpsが強い領域</th></tr></thead>
            <tbody>
              <tr><td>ガバナンス</td><td>ライフサイクル全体のガバナンス・リスク管理・CSF定義</td><td>—</td></tr>
              <tr><td>実行速度</td><td>—</td><td>CI/CD、自動化されたBuild〜Transitionの高速な反復</td></tr>
              <tr><td>統合ポイント</td><td>Build活動の実行手段としてDevOpsのプラクティス(継続的インテグレーション等)を採用</td><td>ITILのCSF・メトリクスをDevOpsパイプラインの品質ゲートとして活用</td></tr>
            </tbody>
          </table>
        </div>
        <p>実務的には、<strong>「何を(What)・なぜ(Why)・どのレベルで(How well)」を定義するのがITILの役割</strong>であり、<strong>「どうやって高速に実現するか(How fast)」を担うのがDevOpsの役割</strong>、という住み分けが一般的な理解です。</p>
        <h3>ITILとPRINCE2の補完関係</h3>
        <p>PRINCE2は<strong>プロジェクトマネジメント</strong>のフレームワークであり、ITIL Productの中では、主にAcquire活動やBuild活動のような<strong>有期性のある取り組み(プロジェクト)</strong>を統制する手段として位置づけられます。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>役割分担</th></tr></thead>
            <tbody>
              <tr><td>ITIL Product</td><td>プロダクトの「継続的なライフサイクル」全体を扱う(終わりのない反復活動)</td></tr>
              <tr><td>PRINCE2</td><td>ライフサイクルの中で発生する「有期のプロジェクト」(大規模な移行や新規構築など)を統制する</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>補足</span>
          </div>
          <p>プロダクトそのものは終わりのない継続的な活動ですが、その中の特定のマイルストーン(大規模リニューアルなど)は、明確な開始・終了を持つプロジェクトとしてPRINCE2的な統制が有効に機能します。</p>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <ul>
            <li><a href="https://itsm.tools/itil-version-5-vs-itil-4-key-changes/" target="_blank" rel="noopener">ITIL (Version 5) Changes Explained: 20 Important Changes from ITIL 4</a></li>
            <li><a href="https://www.pmgacademy.com/en/articles/itil/information-and-technology-in-itil-version-5-the-guide-for-the-ai-era-and-data-governance/" target="_blank" rel="noopener">Information and Technology in ITIL Version 5</a></li>
            <li><a href="https://agilepmhub.com/itil-ai-governance" target="_blank" rel="noopener">ITIL® AI Governance Training & Certification</a></li>
            <li><a href="https://itecor.com/a-new-itil-so-what/" target="_blank" rel="noopener">A new ITIL, so what?</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Product-Syllabus.pdf" target="_blank" rel="noopener">ITIL® Product | Syllabus</a></li>
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
