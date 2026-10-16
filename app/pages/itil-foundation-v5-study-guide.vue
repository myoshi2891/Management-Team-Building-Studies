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
