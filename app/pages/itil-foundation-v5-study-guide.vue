<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL Foundation (Version 5) 完全学習ガイド | 初学者のためのステップ・バイ・ステップ解説",
  description: "PeopleCert公式シラバスv5.0に準拠したITIL Foundation (Version 5) の完全学習ガイド。7カテゴリー40問の出題範囲を初学者向けに詳細解説し、各項目のベストプラクティスと出典URLを掲載。",
});

const TOC_SECTIONS = [
  { id: "how-to-use", label: "このガイドの使い方", icon: "tabler:route" },
  { id: "exam-blueprint", label: "出題配点マップ", icon: "tabler:chart-pie" },
  { id: "key-terms", label: "第1章 主要用語と定義", icon: "tabler:clipboard-text" },
  { id: "four-dimensions", label: "第2章 4つの側面", icon: "tabler:building-bank" },
  { id: "product-service-lifecycle", label: "第3章 製品・サービスライフサイクル", icon: "tabler:refresh" },
  { id: "value-system", label: "第4章 ITILバリューシステム", icon: "tabler:certificate" },
  { id: "value-streams", label: "第5章 バリューストリーム", icon: "tabler:timeline" },
  { id: "itil-and-ai", label: "第6章 ITILとAI", icon: "tabler:file-text" },
  { id: "other-frameworks", label: "第7章 他フレームワークとの関係", icon: "tabler:git-branch" },
  { id: "exam-strategy", label: "第8章 出題形式と学習計画", icon: "tabler:list-check" },
  { id: "glossary", label: "付録A 用語集", icon: "tabler:book-2" },
  { id: "management-practices", label: "付録B マネジメントプラクティス", icon: "tabler:clipboard-check" },
  { id: "references", label: "付録C 出典・参考文献", icon: "tabler:link" },
] as const;

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

const activeId = useActiveHeading(TOC_SECTIONS.map((s) => s.id));

const DIAGRAM_EXAM_BLUEPRINT = `flowchart LR
subgraph Exam["ITIL Foundation V5 試験 40問"]
C1["Cat.1 用語と定義 30% 12点"]
C4["Cat.4 Value System 40% 16点"]
C2["Cat.2 4つの側面 10% 4点"]
C3["Cat.3 ライフサイクル 10% 4点"]
C5["Cat.5 バリューストリーム 5% 2点"]
C6["Cat.6 AI 2.5% 1点"]
C7["Cat.7 他フレームワーク 2.5% 1点"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class C2,C3,C5,C6,C7 box;
class C1,C4 hub;`;

const DIAGRAM_SERVICE_OFFERING = `flowchart LR
SO["Service Offering サービス提供物"]
A1["Goods 財の移転 Transfer of Goods"]
A2["Resource Access 資源へのアクセス Access to Resources"]
A3["Service Actions サービスアクション"]
SO --> A1
SO --> A2
SO --> A3
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SO hub;
class A1,A2,A3 box;`;

const DIAGRAM_VALUE_CO_CREATION = `flowchart LR
SP["Service Provider サービスプロバイダー"] -->|"Service Offering の提供"| SC["Service Consumer サービスコンシューマー"]
SC -->|"要求・フィードバック・利用データ"| SP
SP -.->|"協働"| VCC["Value Co-Creation 価値共創"]
SC -.->|"協働"| VCC
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SP,SC box;
class VCC hub;`;

const DIAGRAM_FOUR_DIMENSIONS = `flowchart TB
Core["Products & Services 製品・サービス"]
D1["Organizations and People 組織と人材"]
D2["Information and Technology 情報と技術"]
D3["Partners and Suppliers パートナーと供給者"]
D4["Value Streams and Processes バリューストリームとプロセス"]
PESTLE["外部要因 PESTLE Political Economic Social Technological Legal Environmental"]
D1 --- Core
D2 --- Core
D3 --- Core
D4 --- Core
PESTLE -.->|"影響"| D1
PESTLE -.->|"影響"| D2
PESTLE -.->|"影響"| D3
PESTLE -.->|"影響"| D4
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1,D2,D3,D4 box;
class Core hub;
class PESTLE done;`;

const DIAGRAM_PSLM_ACTIVITIES = `flowchart LR
Discover["1. Discover 発見"] --> Design["2. Design 設計"]
Design --> Acquire["3. Acquire 調達"]
Acquire --> Build["4. Build 構築"]
Build --> Transition["5. Transition 移行"]
Transition --> Operate["6. Operate 運用"]
Operate --> Deliver["7. Deliver 提供"]
Deliver --> Support["8. Support サポート"]
Support -.->|"フィードバック"| Discover
Support -.->|"フィードバック"| Design
Deliver -.->|"フィードバック"| Discover
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Discover,Design,Acquire,Build box;
class Transition,Operate hub;
class Deliver,Support done;`;

const DIAGRAM_VALUE_SYSTEM_OVERVIEW = `flowchart TB
subgraph SVS["ITIL Value System ITIL VS"]
GP["Guiding Principles 指導原則 7項目"]
GOV["Governance ガバナンス"]
VC["Value Chain バリューチェーン 8活動"]
MP["Management Practices マネジメントプラクティス 34"]
CI["Continual Improvement 継続的改善 7ステップ"]
GOV --> VC
GP -.->|"適用"| VC
MP -.->|"支援"| VC
CI -.->|"改善"| VC
end
Opportunity["需要・機会 Opportunity Demand"] --> SVS
SVS --> Value["価値 Value"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class GP,GOV,MP,CI box;
class VC hub;
class Opportunity,Value done;`;

const DIAGRAM_MANAGEMENT_PRACTICES_SPLIT = `flowchart TB
MP["34 Management Practices マネジメントプラクティス"]
G["General Management Practices 汎用マネジメントプラクティス 12"]
PS["Product and Service Management Practices 製品・サービスマネジメントプラクティス 22"]
MP --> G
MP --> PS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class MP hub;
class G,PS box;`;

const DIAGRAM_CONTINUAL_IMPROVEMENT_LOOP = `flowchart LR
V["1. ビジョンは何か？ What is the vision?"] --> W1["2. 現在地は？ Where are we now?"]
W1 --> W2["3. どこを目指すか？ Where do we want to be?"]
W2 --> H["4. どう到達するか？ How do we get there?"]
H --> A["5. 行動する Take action"]
A --> D["6. 到達したか？ Did we get there?"]
D --> M["7. モメンタムの維持 Keep the momentum going"]
M -.->|"繰り返す"| V
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class V,W1,W2,H,A,D,M box;`;
</script>

<template>
  <div class="layout">
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav class="sidebar" id="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">ITIL Foundation® 完全ガイド</div>
          <div class="brand-subtitle">PeopleCert Version 5</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li v-for="s in TOC_SECTIONS" :key="s.id">
          <a
            :href="`#${s.id}`"
            :class="{ active: activeId === s.id }"
            @click="closeSidebar"
          >
            <Icon :name="s.icon" aria-hidden="true" />
            {{ s.label }}
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          <span>PeopleCert公式シラバス v5.0 準拠</span>
        </div>
        <h1>ITIL Foundation (Version 5) 完全学習ガイド</h1>
        <p class="hero-lede">
          本ガイドは、PeopleCert 社が2026年2月に公開した<strong>ITIL&reg; Foundation (Version 5)</strong>公式シラバス(Syllabus v5.0)の7カテゴリー・40問構成に完全準拠し、各出題項目を初学者にもわかりやすい日本語で詳細に解説したものです。英語の専門用語(Product、Service、Value Chain など)はITIL用語として定着しているため、日本語訳と併記する形で原文のまま残しています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">40問</div><div class="stat-label">4択客観式(Objective Test)</div></div>
          <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">非母国語受験者は75分</div></div>
          <div class="stat-card"><div class="stat-number">65%</div><div class="stat-label">合格ライン(26/40問・減点なし)</div></div>
          <div class="stat-card"><div class="stat-number">7カテゴリー</div><div class="stat-label">PeopleCert公式シラバスv5.0準拠</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは公開情報をもとに作成した非公式の学習補助教材です。ITIL Foundation (Version 5) は2026年2月にリリースされたばかりの新しい認定のため、試験直前には必ず<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-5-foundation-version-50-4154" target="_blank" rel="noopener">PeopleCert公式サイト</a>で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- ===================== SECTION 01: このガイドの使い方 ===================== -->
      <section id="how-to-use" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 01</div>
        <h2>このガイドの使い方</h2>

        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>対象試験</td><td>ITIL&reg; Foundation (Version 5)(PeopleCert 認定)</td></tr>
              <tr><td>出題形式</td><td>4択の客観式問題(Objective Test Question)</td></tr>
              <tr><td>問題数</td><td>40問</td></tr>
              <tr><td>試験時間</td><td>60分(非母国語受験者は+25% = 75分)</td></tr>
              <tr><td>合格ライン</td><td>26/40(65%)、減点方式なし</td></tr>
              <tr><td>教材の持ち込み</td><td>不可(クローズドブック)</td></tr>
              <tr><td>出典</td><td>[1] [2]</td></tr>
            </tbody>
          </table>
        </div>

        <h4>学習の進め方(ステップ)</h4>
        <ol>
          <li><strong>第1章〜第7章</strong>はシラバスの7カテゴリーに1対1対応しています。配点の大きい章(特に第1章「主要用語」30%と第4章「ITIL Value System」40%)から着手すると効率的です。</li>
          <li>各章末の<strong>「ベストプラクティス」</strong>ボックスは、実務でその概念をどう活かすかをまとめたものです。試験対策だけでなく、実務理解の定着にも役立ちます。</li>
          <li>第8章の<strong>出題形式と学習計画</strong>を読んでから模擬問題に取り組むと、失点しやすいポイント(Negative問題・List問題など)を事前に把握できます。</li>
          <li>巻末の<strong>付録</strong>には用語集とマネジメントプラクティス34項目の早見表を収録しています。試験直前の総復習に活用してください。</li>
        </ol>
      </section>

      <!-- ===================== SECTION 02: 出題配点マップ ===================== -->
      <section id="exam-blueprint" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" aria-hidden="true" />SECTION 02</div>
        <h2>出題配点マップ(全体像)</h2>

        <p>まず全体の配点バランスを俯瞰しておきましょう。7カテゴリーの合計が40点満点です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>#</th><th>カテゴリー</th><th>配点比率</th><th>配点</th><th>本ガイドの章</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Key ITIL terms and definitions(主要なITIL用語と定義)</td><td>30.0%</td><td>12点</td><td>第1章</td></tr>
              <tr><td>2</td><td>The ITIL Four Dimensions of Product and Service Management(4つの側面)</td><td>10.0%</td><td>4点</td><td>第2章</td></tr>
              <tr><td>3</td><td>The ITIL Product and Service Lifecycle(製品・サービスライフサイクル)</td><td>10.0%</td><td>4点</td><td>第3章</td></tr>
              <tr><td>4</td><td>The ITIL Value System(ITILバリューシステム)</td><td>40.0%</td><td>16点</td><td>第4章</td></tr>
              <tr><td>5</td><td>Value stream identification, mapping, and management(バリューストリーム)</td><td>5.0%</td><td>2点</td><td>第5章</td></tr>
              <tr><td>6</td><td>ITIL and AI(ITILとAI)</td><td>2.5%</td><td>1点</td><td>第6章</td></tr>
              <tr><td>7</td><td>ITIL and other frameworks(他フレームワークとの関係)</td><td>2.5%</td><td>1点</td><td>第7章</td></tr>
              <tr><td colspan="2"><strong>合計</strong></td><td><strong>100%</strong></td><td><strong>40点</strong></td><td></td></tr>
            </tbody>
          </table>
        </div>

        <p>さらに、問題は思考レベル(Bloom's Level)別に<strong>BL1(想起)40% / BL2(理解)60%</strong>の比率で出題されます [2]。つまり単純な暗記だけでなく、「なぜそうなるのか」「どう使い分けるのか」を説明できるレベルの理解が過半数を占める、という点を意識して学習してください。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_EXAM_BLUEPRINT" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">7カテゴリーの配点バランス(Cat.1とCat.4で全体の70%を占める)</div>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:info-circle" aria-hidden="true" /><span data-testid="callout-label">補足</span></div>
          <p><strong>ITIL 4からの主な変更点(参考情報)</strong><br>
          ITIL Foundation (Version 5) は2026年2月12日にリリースされ、ITIL 4を土台にしつつ大きく進化しました。すでにITIL 4を保有している方は、変更点を押さえておくと学習効率が上がります。試験範囲そのものはあくまで本ガイドの7カテゴリーですが、混同しやすい旧知識を整理する目的で一覧化します [8] [9]。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>ITIL 4</th><th>ITIL (Version 5)</th></tr></thead>
              <tbody>
                <tr><td>中核モデル</td><td>Service Value Chain(6活動: Plan, Improve, Engage, Design &amp; Transition, Obtain/Build, Deliver &amp; Support)</td><td>Product and Service Lifecycle Model(PSLM、8活動: Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support)</td></tr>
                <tr><td>マネジメントプラクティス</td><td>34(General 14 / Service 17 / Technical 3 の3分類)</td><td>34(General 12 / Product and Service 22 の2分類)</td></tr>
                <tr><td>AI関連</td><td>明示的な記載なし</td><td>AI・AI Governance・ITIL AI Capability Model(6Cモデル)を新設</td></tr>
                <tr><td>対象範囲</td><td>ITサービス管理が中心</td><td>デジタル製品・サービス管理全般に拡張</td></tr>
                <tr><td>指導原則(Guiding Principles)</td><td>7項目</td><td>7項目(変更なし)</td></tr>
                <tr><td>移行パス</td><td>&mdash;</td><td>ITIL 4保有者向けに「ITIL Foundation Bridge (Version 5)」を用意</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ===================== SECTION 03: 第1章 主要用語と定義 ===================== -->
      <section id="key-terms" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 03</div>
        <h2>第1章: 主要なITIL用語と定義(配点30% / 12点)</h2>

        <p>この章はシラバス最大の配点を占める最重要カテゴリーです。ITILの全体像を理解するための「語彙」を固める章であり、ここでの理解不足はあらゆる章に波及します。焦らず一つずつ定義を積み上げていきましょう。</p>

        <h3>1-1. Digital Product and Service Management とは</h3>
        <p><strong>Digital product and service management(デジタル製品・サービス管理)</strong>とは、組織がデジタル製品やサービスを通じて、需要から成果(アウトカム)まで一貫して価値を創出・提供・改善していく包括的な活動を指します。ITIL 4が「ITサービスマネジメント」を中心に据えていたのに対し、Version 5では「サービス」に加えて「製品(Product)」という概念が正面から取り上げられている点が最大の特徴です [7] [9]。</p>
        <ul>
          <li><strong>Product(製品)</strong>: 組織が持つリソース(人・プロセス・技術など)を特定の形に構成し、消費者に提供できるようにしたもの。</li>
          <li><strong>Service(サービス)</strong>: 製品を通じて実現される、消費者が自ら望む成果を達成できるようにする手段。サービスは常に価値の共創(Value Co-Creation)を伴います。</li>
          <li><strong>Digital product / Digital service(デジタル製品/デジタルサービス)</strong>: デジタル技術によって実現・提供される製品・サービス。データ、ソフトウェア、プラットフォームなどを中核とし、AIや自動化との親和性が高い点が特徴です。</li>
          <li><strong>Goods(財)</strong>: 消費者に所有権が移転する有形・無形の物品。サービスとは異なり、提供後の運用責任は消費者側に移ります。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>Product と Service を混同しない。</strong>実務では「このシステムはProductなのかServiceなのか」を明確に定義すると、責任範囲(誰が価値提供に責任を持つか)がぶれません。社内SaaSツールを例にすると、ツール自体はProduct、そのツールを使って業務課題を解決する取り組み全体がServiceという整理をすると理解しやすくなります。</li>
          </ul>
        </div>

        <h3>1-2. Continual Improvement と ITIL Product and Service Lifecycle(キーコンセプトとしての導入)</h3>
        <ul>
          <li><strong>Continual improvement(継続的改善)</strong>: 組織のあらゆる要素(製品・サービス・プラクティス)を、変化するビジネスニーズに合わせて継続的に見直し、改善し続けるという考え方。詳細な7ステップモデルは第4章で扱いますが、この章では「ITILの全ての活動に埋め込まれた基本概念」として定義を押さえておきます。</li>
          <li><strong>ITIL Product and Service Lifecycle(PSLM)</strong>: 需要の発見から提供・サポートまでを結ぶ一連の活動群。詳細は第3章で扱います。</li>
        </ul>

        <h3>1-3. Utility・Warranty・User Experience・Sustainability(価値の4要素)</h3>
        <p>サービスが消費者にとって「良い」と感じられるかどうかは、次の4つの観点で評価されます。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>用語</th><th>意味</th><th>具体例</th></tr></thead>
            <tbody>
              <tr><td><strong>Utility(有用性)</strong></td><td>サービスが特定の目的に対して「適合しているか(fit for purpose)」。機能面の価値。</td><td>クラウドストレージが必要な容量・速度を満たしているか</td></tr>
              <tr><td><strong>Warranty(安心性)</strong></td><td>サービスが「利用可能であるか(fit for use)」。可用性・キャパシティ・セキュリティ・継続性の保証。</td><td>稼働率99.9%のSLAが守られているか</td></tr>
              <tr><td><strong>User Experience(UX/利用体験)</strong></td><td>利用者がサービスを使う過程で得る主観的な満足度・使いやすさ。</td><td>UIの分かりやすさ、サポート対応の丁寧さ</td></tr>
              <tr><td><strong>Sustainability(持続可能性)</strong></td><td>環境・社会・経済的な持続可能性への配慮。ITIL 4以降で重視され、Version 5でも継続。</td><td>データセンターの省エネ設計、公正な調達</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>4要素をバランスさせる。</strong>Utility(機能)ばかりに注力してWarranty(安定稼働)が疎かになると、機能は良いのに障害が多いサービスになります。逆にWarranty偏重だとイノベーションが停滞します。新機能をリリースする際は、この4要素を毎回チェックリスト化して確認すると、価値創出の抜け漏れを防げます。</li>
          </ul>
        </div>

        <h3>1-4. Service Offering と Service Interactions(サービス提供物とやり取り)</h3>
        <p><strong>Service offering(サービス提供物)</strong>とは、サービスプロバイダーが提供する製品・サービスの内容を、コンポーネントとして具体的に定義したものです。1つのサービス提供物は次の3要素で構成されます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SERVICE_OFFERING" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">Service Offering(サービス提供物)を構成する3要素</div>
        </div>

        <ul>
          <li><strong>Transfer of goods(財の移転)</strong>: 所有権が消費者に移る物理的・デジタル的な財の受け渡し(例: ライセンスキーの付与)。</li>
          <li><strong>Access to resources(資源へのアクセス)</strong>: 所有権は移転しないが、消費者が一時的にリソースを利用できる状態(例: クラウド環境の利用権)。</li>
          <li><strong>Service actions(サービスアクション)</strong>: プロバイダー側が消費者のために実行する作業(例: ヘルプデスクによる問い合わせ対応)。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>サービスカタログでService Offeringを可視化する。</strong>Service catalogue management(付録B参照)と連携させ、各サービス提供物がどの財・資源・アクションで構成されているかをカタログ上に明示すると、営業・サポート双方の認識齟齬を減らせます。</li>
          </ul>
        </div>

        <h3>1-5. Value Co-Creation(価値の共創)</h3>
        <p>ITILの根幹をなす考え方が<strong>Value co-creation(価値共創)</strong>です。価値は組織が一方的に「提供」するものではなく、サービスプロバイダーとサービスコンシューマーが協働して初めて生まれる、という視点です。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_VALUE_CO_CREATION" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">Service ProviderとService Consumerによる価値共創のサイクル</div>
        </div>

        <p>価値共創を評価する上で重要な4つの構成要素があります。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>要素</th><th>定義</th><th>ポイント</th></tr></thead>
            <tbody>
              <tr><td><strong>Output(アウトプット)</strong></td><td>特定の活動から生じる有形・無形の成果物</td><td>あくまで「作られたもの」自体を指す</td></tr>
              <tr><td><strong>Outcome(アウトカム)</strong></td><td>アウトプットの利用によって、ステークホルダーにもたらされる結果</td><td>「その成果物によって何が達成されたか」を指す</td></tr>
              <tr><td><strong>Cost(コスト)</strong></td><td>サービス消費によって発生する費用、またはサービスによって回避できた費用</td><td>消費者側・提供者側双方のコストを含む</td></tr>
              <tr><td><strong>Risk(リスク)</strong></td><td>目的達成に対する不確実性、または損失・機会の可能性</td><td>サービス利用に伴うリスクの受容・移転・軽減の判断が重要</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>OutputとOutcomeを混同しない。</strong>「新しいダッシュボードをリリースした」はOutput、「そのダッシュボードによって意思決定のスピードが上がった」がOutcomeです。プロジェクトの成功指標をOutputだけで測ると、実際のビジネス価値を見誤ります。KPIを設計する際は必ずOutcomeベースの指標を1つ以上含めましょう。</li>
          </ul>
        </div>

        <h3>1-6. Service Relationships(サービス関係)</h3>
        <p>サービスは組織単体で完結せず、複数のステークホルダーの関係性の中で成立します。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>用語</th><th>定義</th></tr></thead>
            <tbody>
              <tr><td><strong>Organization(組織)</strong></td><td>自らの目的を達成するための責任・権限・関係を持つ個人またはグループ</td></tr>
              <tr><td><strong>Service Provider(サービスプロバイダー)</strong></td><td>サービスを提供する役割を担う組織</td></tr>
              <tr><td><strong>Service Consumer(サービスコンシューマー)</strong></td><td>サービスを消費する役割を担う組織。Sponsor・Customer・Userの3ロールを内包する包括的な用語</td></tr>
              <tr><td><strong>Digital Product Vendor(デジタル製品ベンダー)</strong></td><td>デジタル製品を開発・供給する組織。Version 5で明確化された役割</td></tr>
              <tr><td><strong>Sponsor(スポンサー)</strong></td><td>サービス消費の予算を承認する役割</td></tr>
              <tr><td><strong>Customer(カスタマー)</strong></td><td>サービスの要求を定義し、消費に伴う成果に責任を持つ役割</td></tr>
              <tr><td><strong>User(ユーザー)</strong></td><td>実際にサービスを利用する役割</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>3種類のサービス関係の型</strong></p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>関係の型</th><th>特徴</th></tr></thead>
            <tbody>
              <tr><td><strong>Basic(基本型)</strong></td><td>標準化された製品・サービスを、比較的簡単な取引で提供する関係。カスタマイズ性は低い</td></tr>
              <tr><td><strong>Cooperative(協力型)</strong></td><td>継続的なやり取りがあり、消費者のニーズに合わせてある程度の調整を行う関係</td></tr>
              <tr><td><strong>Collaborative/Partnership(協働型)</strong></td><td>双方が共通の目標に向けて深く統合され、戦略的なパートナーシップとして機能する関係</td></tr>
            </tbody>
          </table>
        </div>

        <p>さらに、消費者がサービスと関わる一連の体験を<strong>Service Journey(サービスジャーニー)</strong>と呼びます。認知から利用、継続、終了に至るまでの全接点を指し、UX(利用体験)の質を左右する重要な概念です。</p>

        <p>最後に、サービス品質を裏付ける仕組みとして以下を押さえます。</p>
        <ul>
          <li><strong>Service Quality(サービス品質)</strong>: サービスが期待・要求をどれだけ満たしているかの程度。</li>
          <li><strong>Service Level(サービスレベル)</strong>: 測定可能な指標で表現された、サービスの1つ以上の側面のパフォーマンス目標値。</li>
          <li><strong>SLA(Service Level Agreement/サービスレベル合意書)</strong>: プロバイダーと消費者間で合意されたサービスレベルを文書化したもの。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>関係の型に応じてガバナンスの重さを変える。</strong>Basicな関係にCollaborative型と同じ重厚なガバナンス(定例会議・共同KPIなど)を課すと、コストばかりかさんで両者にメリットがありません。逆に戦略的パートナーにBasic型の対応をすると信頼を損ないます。契約更新のタイミングで関係の型を見直し、ガバナンスの重さを合わせましょう。</li>
          </ul>
        </div>
      </section>

      <!-- ===================== SECTION 04: 第2章 4つの側面 ===================== -->
      <section id="four-dimensions" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 04</div>
        <h2>第2章: ITILの4つの側面(配点10% / 4点)</h2>

        <p>サービスや製品の管理を「一部分だけ」最適化すると、必ず別の場所にひずみが生じます。ITILはこれを防ぐために、常に4つの側面を<strong>ホリスティック(全体論的)</strong>に検討することを求めています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FOUR_DIMENSIONS" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">製品・サービスを取り巻く4つの側面とPESTLE外部要因</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>側面</th><th>範囲</th><th>具体的な検討事項</th></tr></thead>
            <tbody>
              <tr><td><strong>Organizations and People(組織と人材)</strong></td><td>組織構造、文化、役割・責任、必要なスキル・コンピテンシー、リーダーシップスタイル</td><td>適切な人数・スキルセットは確保されているか。心理的安全性のある文化か</td></tr>
              <tr><td><strong>Information and Technology(情報と技術)</strong></td><td>サービスを支える情報、知識、技術、ツール、プラットフォーム、データガバナンス</td><td>データの正確性・機密性は保たれているか。技術的負債は管理されているか</td></tr>
              <tr><td><strong>Partners and Suppliers(パートナーと供給者)</strong></td><td>外部組織との関係、契約、依存関係、エコシステム全体の管理</td><td>供給者選定基準は明確か。重要な依存先の継続性リスクは評価されているか</td></tr>
              <tr><td><strong>Value Streams and Processes(バリューストリームとプロセス)</strong></td><td>組織がどのように活動を構成し、インプットをアウトプットに変換するか</td><td>ムダなプロセスはないか。エンドツーエンドで価値が流れているか</td></tr>
            </tbody>
          </table>
        </div>

        <p>さらに、この4つの側面は組織の外側にある<strong>PESTLE要因</strong>からも常に影響を受けます。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>PESTLE要素</th><th>内容</th><th>例</th></tr></thead>
            <tbody>
              <tr><td><strong>P</strong>olitical(政治的)</td><td>政策、規制、政治的安定性</td><td>政府のデジタル化推進政策</td></tr>
              <tr><td><strong>E</strong>conomic(経済的)</td><td>景気、為替、予算制約</td><td>インフレによるIT予算の圧縮</td></tr>
              <tr><td><strong>S</strong>ocial(社会的)</td><td>人口動態、働き方の変化、消費者行動</td><td>リモートワークの定着</td></tr>
              <tr><td><strong>T</strong>echnological(技術的)</td><td>技術革新、陳腐化のスピード</td><td>生成AIの急速な普及</td></tr>
              <tr><td><strong>L</strong>egal(法的)</td><td>法規制、コンプライアンス要件</td><td>個人情報保護法制の強化</td></tr>
              <tr><td><strong>E</strong>nvironmental(環境的)</td><td>気候変動、サステナビリティ要求</td><td>カーボンニュートラルへの対応要求</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>4つの側面を「チェックリスト」として使う。</strong>新しいサービスや変更を計画する際、必ず4つの側面それぞれについて「このプランは影響がないか」を確認する習慣をつけましょう。たとえば新しいSaaSツールを導入する際、Information and Technology(データ連携)だけでなく、Organizations and People(誰が運用を担うか)、Partners and Suppliers(ベンダーロックインのリスク)、Value Streams and Processes(既存業務フローとの整合性)も同時に検討することで、後工程での手戻りを防げます。</li>
          </ul>
        </div>
      </section>

      <!-- ===================== SECTION 05: 第3章 ライフサイクル ===================== -->
      <section id="product-service-lifecycle" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 05</div>
        <h2>第3章: ITIL 製品・サービスライフサイクル(配点10% / 4点)</h2>

        <h3>3-1. Product and Service Lifecycle Model(PSLM)とは</h3>
        <p>ITIL (Version 5) の最大の構造変化が、この<strong>Product and Service Lifecycle Model(PSLM)</strong>です。ITIL 4の6活動から成る Service Value Chain を置き換える形で、より製品開発の実態(アジャイル・DevOps的な反復開発)に即した<strong>8つの活動</strong>で構成される新モデルが導入されました [9] [10]。</p>

        <p>重要なポイントは、この8活動が<strong>一直線(linear)でも順序固定(sequential)でもない</strong>という点です。状況に応じて活動を行き来し、反復的に使うことが前提とされています [2]。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PSLM_ACTIVITIES" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">PSLM 8活動とフィードバックループ(Support/Deliverから前工程への還元)</div>
        </div>

        <p>大まかな傾向として、前半(Discover〜Build)は<strong>Product(製品)視点</strong>が強く、後半(Deliver・Support)は<strong>Service(サービス)視点</strong>が強くなり、中間の Transition・Operate は両者をつなぐ「橋渡し」の役割を果たします [7]。</p>

        <h3>3-2. 各活動の目的(Purpose)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>#</th><th>活動</th><th>目的(何のためにあるか)</th></tr></thead>
            <tbody>
              <tr><td>1</td><td><strong>Discover(発見)</strong></td><td>市場・消費者のニーズや需要シグナルを把握し、組織戦略やプロダクトロードマップと整合させる</td></tr>
              <tr><td>2</td><td><strong>Design(設計)</strong></td><td>把握したニーズを、技術要件だけでなく利用体験も満たす具体的なソリューション(仕様・プロトタイプ)に落とし込む</td></tr>
              <tr><td>3</td><td><strong>Acquire(調達)</strong></td><td>ソリューションの実現に必要なリソース(人材・技術・第三者サービスなど)を購入・確保・配分する</td></tr>
              <tr><td>4</td><td><strong>Build(構築)</strong></td><td>コンポーネントを開発・構成し、リリース前に十分にテストする</td></tr>
              <tr><td>5</td><td><strong>Transition(移行)</strong></td><td>新規・変更されたソリューションを、混乱なく安全に本番環境へ導入する</td></tr>
              <tr><td>6</td><td><strong>Operate(運用)</strong></td><td>インフラとシステムを日々安定稼働させ、パフォーマンスを監視し続ける</td></tr>
              <tr><td>7</td><td><strong>Deliver(提供)</strong></td><td>合意された条件でサービスを消費者が利用できる状態にし、アクセスや要求への対応を管理する</td></tr>
              <tr><td>8</td><td><strong>Support(サポート)</strong></td><td>インシデントや問題を解決し、通常のサービス運用状態を回復させる。学びをDiscover・Designへ還元する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>「橋渡し」の2活動を軽視しない。</strong>Transition と Operate は地味に見えますが、ここが弱いとどれだけ良いDesignやBuildをしても本番障害やリリース事故につながります。CI/CDパイプラインの整備やモニタリング体制の構築に投資することは、PSLM全体の信頼性を底上げする最も費用対効果の高い施策の一つです。</li>
          </ul>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>Supportをフィードバックループの起点にする。</strong>インシデント対応で得られた知見(根本原因、再発防止策)をナレッジベースに残すだけで終わらせず、定期的にDiscover・Designの担当チームへ共有する仕組み(例: 月次の振り返り会)を作ると、同じ問題の再発を未然に防げます。</li>
          </ul>
        </div>
      </section>

      <!-- ===================== SECTION 06: 第4章 ITILバリューシステム ===================== -->
      <section id="value-system" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 06</div>
        <h2>第4章: ITIL バリューシステム(配点40% / 16点)</h2>

        <p>本章はシラバス最大の配点(40%)を占める、試験合格のカギとなる章です。5つの構成要素(指導原則、ガバナンス、バリューチェーン、マネジメントプラクティス、継続的改善)を順に見ていきます。</p>

        <h3>4-1. ITIL Value System(ITIL VS)の全体像</h3>
        <p><strong>ITIL Value System(ITILバリューシステム)</strong>とは、組織が需要・機会を価値に変換するために、全ての構成要素を統合的に機能させる仕組みです。5つの要素が相互に作用し合います。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_VALUE_SYSTEM_OVERVIEW" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">ITIL Value Systemを構成する5要素の関係</div>
        </div>

        <h3>4-2. ITIL Guiding Principles(指導原則) &mdash; 7項目</h3>
        <p>指導原則はITIL 4から<strong>変更なし</strong>で7項目が継承されています [9]。どんな状況・組織にも普遍的に適用できる推奨事項であり、意思決定の指針として機能します。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>#</th><th>原則</th><th>何を意味するか</th><th>実務での使いどころ</th></tr></thead>
            <tbody>
              <tr><td>1</td><td><strong>Focus on value(価値に焦点を当てる)</strong></td><td>すべての活動を、最終的にステークホルダーへの価値提供に結びつける</td><td>施策着手前に「誰にとってどんな価値があるか」を必ず問う</td></tr>
              <tr><td>2</td><td><strong>Start where you are(現在地から始める)</strong></td><td>ゼロから作り直さず、既存の資産・プロセス・データをまず評価し活用する</td><td>既存システムを安易に「全部作り直そう」としない</td></tr>
              <tr><td>3</td><td><strong>Progress iteratively with feedback(フィードバックを伴う反復的な進化)</strong></td><td>大きく一気に変えるのではなく、小さく試してフィードバックを得ながら進める</td><td>MVP(最小限の実行可能な製品)でまず試す</td></tr>
              <tr><td>4</td><td><strong>Collaborate and promote visibility(協働し可視性を高める)</strong></td><td>部門横断で協力し、進捗や意思決定を透明にする</td><td>ステークホルダーを巻き込んだ共同レビューを定例化する</td></tr>
              <tr><td>5</td><td><strong>Think and work holistically(全体思考で取り組む)</strong></td><td>個別最適ではなく、組織全体・エンドツーエンドでの結果を意識する</td><td>第2章の4つの側面を用いて影響範囲を点検する</td></tr>
              <tr><td>6</td><td><strong>Keep it simple and practical(シンプルかつ実践的に)</strong></td><td>常に価値を生み出す最小限の手順を目指し、複雑さを避ける</td><td>プロセスに不要なステップが残っていないか定期的に棚卸しする</td></tr>
              <tr><td>7</td><td><strong>Optimize and automate(最適化と自動化)</strong></td><td>手作業を減らす前に、まずプロセス自体を最適化し、その上で自動化する</td><td>「自動化する前に、そもそもそのステップは必要か」を問う</td></tr>
            </tbody>
          </table>
        </div>
        <p>すべての原則は<strong>相互に関連</strong>しており、状況に応じて重み付けを変えながら組み合わせて使うことが重要とされています。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>原則同士のトレードオフを意識する。</strong>「Progress iteratively」を優先しすぎると意思決定が遅くなり「Keep it simple」と衝突することがあります。逆に「Optimize and automate」を急ぎすぎると「Start where you are」を無視した過剰投資になりがちです。プロジェクトのキックオフ時に、どの原則を最優先するかをチームで合意しておくと、後々の判断がぶれません。</li>
          </ul>
        </div>

        <h3>4-3. Governance(ガバナンス)</h3>
        <p><strong>Governance(ガバナンス)</strong>とは、組織を評価し、方向づけ、監視する活動のことです。ITIL VSの中で、組織の意思決定の枠組みを提供する「イネーブラー(enabler)」として機能します。</p>
        <ul>
          <li>ガバナンスは組織の最上位(取締役会・経営層)で行われ、方針・優先順位を定めます。</li>
          <li>具体的な活動として「Evaluate(評価)」「Direct(指示)」「Monitor(監視)」のサイクルがあります。</li>
          <li>ガバナンスが有効に機能して初めて、バリューチェーン活動やマネジメントプラクティスが組織戦略と整合して動きます。</li>
        </ul>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>ガバナンスを「監視」だけで終わらせない。</strong>ガバナンスは規制や統制のイメージが強いですが、本質は組織を正しい方向へ導く「イネーブラー」です。監視結果を次の方針決定(Direct)に確実にフィードバックする仕組みを持つことで、形骸化を防げます。</li>
          </ul>
        </div>

        <h3>4-4. Value Chain(バリューチェーン)</h3>
        <p>Version 5では、<strong>Value chain(バリューチェーン)は第3章で学んだPSLMの8活動そのもの</strong>として再定義されています [2] [7]。各活動には、その活動を理解する上でカギとなる用語が紐づいています。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>バリューチェーン活動</th><th>カギとなる用語</th><th>用語の意味</th></tr></thead>
            <tbody>
              <tr><td rowspan="2"><strong>Design</strong></td><td>Product specification(製品仕様)</td><td>製品が満たすべき要件を定義した文書</td></tr>
              <tr><td>Product prototype(製品プロトタイプ)</td><td>検証目的で作成される試作版</td></tr>
              <tr><td rowspan="2"><strong>Build</strong></td><td>Continuous integration(継続的インテグレーション)</td><td>コード変更を頻繁に統合し自動テストする手法</td></tr>
              <tr><td>Continuous delivery / deployment(継続的デリバリー/デプロイメント)</td><td>ビルド成果物をいつでもリリース可能・自動リリース可能にする手法</td></tr>
              <tr><td rowspan="2"><strong>Transition</strong></td><td>Release(リリース)</td><td>本番環境で利用可能になる、1つ以上の変更の集合</td></tr>
              <tr><td>Test(テスト)</td><td>ソリューションが要件を満たすかを検証する活動</td></tr>
              <tr><td rowspan="5"><strong>Operate</strong></td><td>Incident(インシデント)</td><td>サービスの計画外の中断、または品質低下</td></tr>
              <tr><td>Event(イベント)</td><td>サービスマネジメント上で意味を持つ状態変化</td></tr>
              <tr><td>Reliability(信頼性)</td><td>意図した機能を継続して正しく実行できる度合い</td></tr>
              <tr><td>SRE(Site Reliability Engineering)</td><td>ソフトウェア工学の手法を運用に適用し信頼性を高めるアプローチ</td></tr>
              <tr><td>Observability(可観測性)</td><td>システムの内部状態を外部出力から推測できる度合い</td></tr>
              <tr><td><strong>Deliver</strong></td><td>Service request(サービスリクエスト)</td><td>利用者からの、あらかじめ合意された定型サービスの依頼</td></tr>
              <tr><td rowspan="4"><strong>Support</strong></td><td>Disaster(災害)</td><td>事業継続に深刻な影響を及ぼす重大な障害</td></tr>
              <tr><td>Problem(問題)</td><td>1件以上のインシデントの原因、またはその可能性</td></tr>
              <tr><td>Error(エラー)</td><td>設計・実装上の不備</td></tr>
              <tr><td>Known error(既知のエラー)</td><td>原因が特定済みで、恒久対策が未実施の問題</td></tr>
            </tbody>
          </table>
        </div>
        <p>さらに、バリューチェーン全体を支える概念として<strong>Operating model(オペレーティングモデル)</strong>があります。これは組織の目的達成のために、リソース・活動・パートナー・供給者をどのように配置・連携させるかを定めたモデルです。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>ProblemとKnown Errorを混同しない。</strong>ProblemはまだIncidentの根本原因が「未特定」の状態を含みますが、Known Errorは原因が特定済みで暫定対処法まで判明している状態です。この区別を明確にすることで、Problem Management(問題管理)のワークフローの進捗が可視化しやすくなります。</li>
          </ul>
        </div>

        <h3>4-5. Management Practices(マネジメントプラクティス)</h3>
        <p><strong>Management practice(マネジメントプラクティス)</strong>とは、特定の目的を達成するために組織化されたリソース群のことです。ITIL 4では「General/Service/Technical」の3分類・34項目でしたが、Version 5では<strong>Technical分類が廃止</strong>され、以下の<strong>2分類・34項目</strong>に整理されました [3] [4]。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_MANAGEMENT_PRACTICES_SPLIT" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">34のマネジメントプラクティスの2分類</div>
        </div>

        <ul>
          <li><strong>General management practices(汎用マネジメントプラクティス/12項目)</strong>: 一般的な事業経営の領域からサービス管理向けに適用・調整されたプラクティス。</li>
          <li><strong>Product and service management practices(製品・サービスマネジメントプラクティス/22項目)</strong>: ITIL 4の「Service」17項目と「Technical」3項目を統合し、さらにVersion 5で情報セキュリティ管理とサービス財務管理をこちらへ移動した結果、22項目になりました。</li>
        </ul>
        <p>(全34項目の一覧は<a href="#management-practices">付録B</a>を参照してください)</p>
        <p>ITIL Practice Guide(各プラクティスの公式ガイド)は、一貫した構造(目的、価値のある成果、活動、ロール、バリューチェーンとの関係)で整理されており、組織間で共通言語として使えることが最大の利点です。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>全34項目を丸暗記しようとしない。</strong>Foundationレベルで問われるのは各プラクティスの「目的(Purpose)」レベルの理解までです。丸暗記より、「このプラクティスはPSLMのどの活動に最も貢献するか」という関連づけで覚えると記憶に定着しやすく、実務にも応用できます。</li>
          </ul>
        </div>

        <h3>4-6. ITIL Continual Improvement Model(継続的改善モデル)</h3>
        <p>ITILバリューシステムを貫く最後の要素が、<strong>継続的改善モデル</strong>です。7つのステップから成る循環型のモデルで、組織のあらゆるレベル・あらゆる活動に適用できます。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CONTINUAL_IMPROVEMENT_LOOP" theme="base" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">継続的改善モデルの7ステップループ</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>ステップ</th><th>問いかけ</th><th>実務での主なアウトプット</th></tr></thead>
            <tbody>
              <tr><td>1. ビジョン</td><td>大きな方向性は何か</td><td>経営戦略・組織のミッションとの整合確認</td></tr>
              <tr><td>2. 現在地</td><td>現状はどうなっているか</td><td>現状分析、ベースライン測定</td></tr>
              <tr><td>3. 目指す姿</td><td>具体的な目標はどこか</td><td>測定可能な改善目標の設定</td></tr>
              <tr><td>4. 到達方法</td><td>どんな計画で進むか</td><td>改善計画、優先順位付け</td></tr>
              <tr><td>5. 行動</td><td>計画を実行する</td><td>改善施策の実施</td></tr>
              <tr><td>6. 到達確認</td><td>目標を達成したか</td><td>効果測定、KPI評価</td></tr>
              <tr><td>7. モメンタム維持</td><td>成果をどう定着させるか</td><td>次サイクルへの接続、成功の共有</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
          <ul>
            <li><strong>小さく回して大きく育てる。</strong>7ステップを一度に大きなプロジェクトとして回そうとすると停滞しがちです。小さな改善サイクルを高速に回し(例: 2週間スプリント単位)、成功体験を積み重ねながらステップ7の「モメンタム維持」につなげるのが実践的です。</li>
          </ul>
        </div>
      </section>
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
  width: 288px;
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
  font-family: var(--font-display, serif);
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
  text-decoration: none;
  transition: all 0.15s ease;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) {
  font-size: 17px;
  flex: none;
}

.sidebar-overlay {
  display: none;
}

.sidebar-toggle {
  display: none;
}

/* ===================== Main content ===================== */
.main-content {
  margin-left: 288px;
  padding: 48px 56px 96px;
  max-width: 960px;
}

/* ===================== Hero ===================== */
.hero {
  margin-bottom: 56px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--color-border);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 16px;
}

.hero-eyebrow :deep(.iconify),
.hero-eyebrow :deep(svg) {
  font-size: 16px;
}

h1 {
  font-family: var(--font-display, serif);
  font-size: 36px;
  line-height: 1.25;
  color: var(--color-ink);
  letter-spacing: -0.01em;
  margin: 0 0 16px;
  font-weight: 700;
}

.hero-lede {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
}

/* ===================== Stat row ===================== */
.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin: 28px 0;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px 20px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.stat-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(22, 27, 38, 0.05);
}

.stat-number {
  font-family: var(--font-display, serif);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 4px;
}

/* ===================== Disclaimer Box ===================== */
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

/* ===================== Sections ===================== */
:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

section {
  margin-bottom: 64px;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 16px;
}

h2 {
  font-family: var(--font-display, serif);
  font-size: 24px;
  line-height: 1.35;
  color: var(--color-ink);
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-ink);
  font-weight: 700;
}

h3 {
  font-size: 18px;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 32px 0 12px;
  font-weight: 700;
}

h4 {
  font-size: 16px;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 24px 0 8px;
  font-weight: 700;
}

p {
  margin: 0 0 16px;
}

/* Lists styling */
ul {
  list-style-type: disc;
  margin: 0 0 20px 24px;
  padding: 0;
}

ol {
  list-style-type: decimal;
  margin: 0 0 20px 24px;
  padding: 0;
}

li {
  margin-bottom: 8px;
  line-height: 1.65;
}

/* Tables styling */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  background: var(--color-paper-raised);
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
  white-space: nowrap;
}

tr:last-child td {
  border-bottom: none;
}

/* Diagrams */
.diagram-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 24px 20px;
  margin: 24px 0;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 12px;
}

.mermaid-wrap {
  width: 100%;
}

/* Callouts */
.callout {
  border-radius: 10px;
  padding: 20px 24px;
  margin: 24px 0;
  border-left: 4px solid var(--color-indigo);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
}

.callout.practice {
  border-left: 4px solid var(--color-gold);
  background: var(--color-gold-tint);
  border-color: #ECD8B5;
}

.callout.note {
  border-left: 4px solid var(--color-indigo);
  background: var(--color-indigo-tint);
  border-color: var(--color-info-border);
}

.callout.warning {
  border-left: 4px solid var(--color-plum);
  background: var(--color-plum-tint);
  border-color: #E6CCD7;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-ink);
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.note .callout-title {
  color: var(--color-indigo);
}

.callout.warning .callout-title {
  color: var(--color-plum);
}

.callout-title :deep(.iconify),
.callout-title :deep(svg) {
  font-size: 18px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
  }

  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-indigo);
    color: #fff;
    border: none;
    box-shadow: 0 4px 16px rgba(46, 63, 114, 0.35);
    z-index: 30;
    cursor: pointer;
  }

  .sidebar-toggle :deep(.iconify),
  .sidebar-toggle :deep(svg) {
    font-size: 22px;
  }

  .main-content {
    margin-left: 0;
    padding: 32px 20px 80px;
  }
}
</style>
