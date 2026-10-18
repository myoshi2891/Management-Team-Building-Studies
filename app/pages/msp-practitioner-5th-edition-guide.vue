<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { nextTick, ref } from "vue";
import { useActiveHeading } from "~/composables/useActiveHeading";

const LIGHT_THEME_VARS = {
  fontSize: "16px",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#2E3F72",
  secondaryColor: "#FAF1DF",
  tertiaryColor: "#FFFFFF",
};

const DIAGRAM_THREE_LENSES = `flowchart TB
accTitle: MSP の 3 つのレンズの関係
accDescr: 原則はテーマに方向性を与え、テーマはプロセスの各工程で適用され、プロセスは実践を通じて原則の実現度を検証する循環構造を示す。
subgraph L1["レンズ1: 原則 Principles"]
P["7つの普遍的な指針 プログラム全体を貫く価値観"]
end
subgraph L2["レンズ2: テーマ Themes"]
T["7つの統治領域 継続的に対処し続ける管理側面"]
end
subgraph L3["レンズ3: プロセス Processes"]
PR["7つのライフサイクル工程 段階的・循環的な進め方"]
end

P -->|"方向性を与える"| T
T -->|"各工程で適用される"| PR
PR -->|"実践を通じて 原則の実現度を検証"| P

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class P box
class T hub
class PR done`;

const DIAGRAM_ORG_STRUCTURE = `flowchart TB
accTitle: MSP プログラムの組織構造
accDescr: スポンサリンググループが SRO を任命し、SRO の下にプログラムボードが置かれる。ボードの下にプログラムマネージャーとビジネスチェンジマネージャーが並び、プログラムマネージャーはプログラムオフィスと構成プロジェクト群を統括する。ビジネスチェンジマネージャーはベネフィット実現の説明責任をボードへ負う。
SG["Sponsoring Group スポンサリンググループ  戦略的な投資判断・SROの任命"]
SRO["Senior Responsible Owner  SRO プログラム全体の説明責任を負う 単一の説明責任者 Accountable Owner"]
PB["Programme Board プログラムボード  SROの意思決定を支援"]
PM["Programme Manager プログラムマネージャー  日常運営・プロジェクト群の統合"]
BCM["Business Change Manager(s) ビジネスチェンジマネージャー  ベネフィット実現・業務側の変革"]
PO["Programme Office プログラムオフィス  情報管理・支援機能"]
PROJ["構成プロジェクト群 Constituent Projects"]

SG --> SRO
SRO --> PB
PB --> PM
PB --> BCM
PM --> PO
PM --> PROJ
BCM -.->|"ベネフィット実現の 説明責任"| PB

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
class SG,SRO box
class PB,PM,BCM,PO,PROJ hub`;

const DIAGRAM_THEMES_MAP = `flowchart LR
accTitle: MSP の 7 つのテーマ
accDescr: 組織、設計、正当化、構造、知識、保証、意思決定の 7 テーマを順に並べ、意思決定から組織へ戻る点線で、すべてのテーマが並行して継続的に機能することを示す。
O["Organization 組織"] --> D["Design 設計"]
D --> J["Justification 正当化"]
J --> S["Structure 構造"]
S --> K["Knowledge 知識"]
K --> A["Assurance 保証"]
A --> DE["Decisions 意思決定"]
DE -.->|"すべてのテーマは 並行して継続的に機能する"| O

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
class O,D,J,S,K,A,DE box`;

const DIAGRAM_LIFECYCLE = `flowchart TB
accTitle: MSP プログラムのライフサイクル
accDescr: プログラムの着想から①特定、②成果の設計、③段階的デリバリーの計画、④ケイパビリティの提供、⑤成果の定着、⑥新しい情報の評価へ進む。⑥で継続なら次のトランシェとして②へ戻り、完了または中止と判断すれば⑦終結を経て運用へ完全移行する。
START(["プログラムの着想"]) --> P1["① Identify the Programme プログラムを特定する"]
P1 --> P2["② Design the Outcomes 成果を設計する"]
P2 --> P3["③ Plan Progressive Delivery 段階的デリバリーを計画する"]
P3 --> P4["④ Deliver the Capabilities ケイパビリティを提供する"]
P4 --> P5["⑤ Embed the Outcomes 成果を定着させる"]
P5 --> P6["⑥ Evaluate New Information 新しい情報を評価する"]
P6 -->|"継続: 次のトランシェへ"| P2
P6 -->|"完了/中止判断"| P7["⑦ Close the Programme プログラムを終結する"]
P7 --> END(["プログラム終了 運用への完全移行"])

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26
class P1,P2 box
class P3,P4,P5,P6 hub
class P7 done`;

useSeoMeta({
  title: "MSP® Practitioner 第5版 完全ガイド | 実践適用ステップバイステップ解説",
  description:
    "MSP Practitioner 5th edition の原則・テーマ・プロセスを、シナリオ適用とテーラリングの視点で学ぶ初学者向けガイド",
});

const TOC_ITEMS = [
  { id: "what-is-msp-practitioner", label: "MSPプラクティショナーとは", icon: "tabler:certificate" },
  { id: "exam-overview", label: "試験概要", icon: "tabler:list-check" },
  { id: "three-lenses", label: "3つのレンズ", icon: "tabler:git-branch" },
  { id: "principles", label: "7つの原則", icon: "tabler:clipboard-check" },
  { id: "governance-structure", label: "組織とガバナンス", icon: "tabler:building-bank" },
  { id: "themes", label: "7つのテーマ", icon: "tabler:clipboard-text" },
  { id: "lifecycle", label: "7つのプロセス", icon: "tabler:route" },
  { id: "tailoring", label: "テーラリング", icon: "tabler:refresh" },
  { id: "exam-tips", label: "試験対策のコツ", icon: "tabler:map-2" },
  { id: "best-practices", label: "ベストプラクティス総まとめ", icon: "tabler:flag-3" },
  { id: "references", label: "参考文献・出典", icon: "tabler:link" },
] as const;

const activeId = useActiveHeading(TOC_ITEMS.map((item) => item.id));
const isSidebarOpen = ref(false);
const sidebarToggleRef = ref<HTMLButtonElement | null>(null);

function closeSidebarAndFocusToggle() {
  const wasOpen = isSidebarOpen.value;
  isSidebarOpen.value = false;
  if (wasOpen) {
    nextTick(() => {
      sidebarToggleRef.value?.focus();
    });
  }
}
</script>

<template>
  <div class="doc-layout">
    <button
      ref="sidebarToggleRef"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      :aria-expanded="isSidebarOpen"
      @click="isSidebarOpen = !isSidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav class="sidebar" :class="{ 'is-open': isSidebarOpen }" aria-label="目次">
      <div class="brand-title">MSP® Practitioner 完全ガイド</div>
      <div class="brand-subtitle">第5版・実践適用解説</div>
      <ul class="sidebar-nav">
        <li v-for="item in TOC_ITEMS" :key="item.id">
          <a
            :href="`#${item.id}`"
            :class="{ active: activeId === item.id }"
            @click="closeSidebarAndFocusToggle"
          >
            <Icon :name="item.icon" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          <span>PeopleCert 公式情報に基づく学習ガイド</span>
        </div>
        <h1>
          MSP® プラクティショナー(第5版)学習ガイド ― 初学者のための実践適用ステップバイステップ解説
        </h1>
        <p class="hero-lede">
          対象試験: <strong>MSP® Practitioner, 5th edition</strong>(PeopleCert / 旧AXELOS)<br />公式製品ページ:
          <a
            href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932"
            target="_blank"
            rel="noopener"
            >https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932</a
          >
        </p>
        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">58問 / 70点</div>
            <div class="stat-label">オープンブックのオブジェクティブテスト</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">150分</div>
            <div class="stat-label">試験時間</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">60%</div>
            <div class="stat-label">合格基準</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">7 / 7 / 7</div>
            <div class="stat-label">原則・テーマ・プロセス</div>
          </div>
        </div>
        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは非公式の学習支援資料です。受験にあたっては、必ず<a
            href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932"
            target="_blank"
            rel="noopener"
            >PeopleCert公式サイト</a
          >で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- プレースホルダーセクション（Step 1 以降で順次実装） -->
      <section id="what-is-msp-practitioner">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:certificate" aria-hidden="true" />
          <span>SECTION 01</span>
        </div>
        <h2>はじめに:MSPプラクティショナーとは何か</h2>
        <p>
          <strong>MSP®(Managing Successful Programmes)</strong>
          は、PeopleCert(旧AXELOS)が管理する、世界的に認知されたプログラムマネジメント(複数のプロジェクトや活動を束ねて組織的な変革を実現する管理手法)のベストプラクティスフレームワークです。2020年に刊行された<strong
            >第5版(5th edition)</strong
          >では、俊敏性(アジリティ)・柔軟性・段階的な価値提供を強く意識した構成に刷新されました。
        </p>
        <p>
          第5版の資格体系は Foundation と Practitioner
          の2段階です(参考として、旧第4版の上位資格も併記します)。
        </p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>段階</th>
                <th>目的</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MSP Foundation(基礎)</td>
                <td>
                  MSPの用語・構造(原則・テーマ・プロセス)を<strong>記憶し理解している</strong>ことを確認する試験。暗記中心。
                </td>
              </tr>
              <tr>
                <td><strong>MSP Practitioner(実践)</strong></td>
                <td>
                  MSPの原則・テーマ・プロセスを<strong>実際のシナリオに適用し、テーラリング(調整)できる</strong>ことを確認する試験。応用力中心。
                </td>
              </tr>
              <tr>
                <td>MSP Advanced Practitioner(上級実践)</td>
                <td>
                  <strong>旧第4版(2011年版)の資格で、現在は廃止済み(レガシー)</strong
                  >。第5版の資格体系(Foundation → Practitioner)には含まれない。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Practitionerレベルの学習目標は公式コース概要で次のように明示されています。</p>
        <ul>
          <li>MSPの原則を文脈(コンテキスト)に応じて適用する方法を理解する</li>
          <li>MSPのテーマの関連する側面を文脈に応じて適用・テーラリングする方法を理解する</li>
          <li>MSPのプロセスの関連する側面を文脈に応じて適用・テーラリングする方法を理解する</li>
        </ul>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://ilxgroup.com/uk/training/msp/practitioner"
              target="_blank"
              rel="noopener"
              >https://ilxgroup.com/uk/training/msp/practitioner</a
            >
          </p>
        </div>
        <p>
          つまりFoundationが「知っているか」を問うのに対し、Practitionerは「<strong>与えられたプログラムのシナリオに対して、どのMSPの要素を、どの程度、どのようにテーラリングして適用するのが最適か</strong>」を問う、判断力・応用力の試験です。この違いを常に意識しながら本ガイドを読み進めてください。
        </p>
        <p>
          <strong>受験前提条件(Prerequisite)</strong>:
          MSP第5版Foundation、またはMSP第4版Practitionerのいずれかの保有が必須です。
        </p>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932"
              target="_blank"
              rel="noopener"
              >https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932</a
            >
          </p>
        </div>
      </section>

      <section id="exam-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:list-check" aria-hidden="true" />
          <span>SECTION 02</span>
        </div>
        <h2>試験概要</h2>
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
                <td>58問(一部に小問を含む)、配点合計70点のオブジェクティブテスト方式</td>
              </tr>
              <tr>
                <td>試験時間</td>
                <td>150分</td>
              </tr>
              <tr>
                <td>方式</td>
                <td><strong>オープンブック</strong>(公式MSPマニュアルの持ち込み・参照が可能)</td>
              </tr>
              <tr>
                <td>合格基準</td>
                <td>60%以上の得点</td>
              </tr>
              <tr>
                <td>試験言語</td>
                <td>英語・中国語</td>
              </tr>
              <tr>
                <td>受験前提</td>
                <td>MSP第5版Foundation または MSP第4版Practitioner</td>
              </tr>
              <tr>
                <td>認定有効期間</td>
                <td>3年ごとに更新が必要(CPDポイント60点の取得等)</td>
              </tr>
              <tr>
                <td>学習ボリューム目安</td>
                <td>講座形式により10〜24時間(eラーニング)/ 2〜5日(集合研修)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932"
              target="_blank"
              rel="noopener"
              >https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/MSP-6/msp-practitioner-5th-edition-2932</a
            >
            、
            <a
              href="https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/"
              target="_blank"
              rel="noopener"
              >https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/</a
            >
          </p>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <p>
            <strong>ベストプラクティス</strong>:
            オープンブック試験とはいえ、150分で58問(70点分)を解くには1問あたり平均2〜3分弱しか使えません。マニュアルを試験中に一から探しても間に合わないため、事前学習で「どの情報がマニュアルのどの章にあるか」の<strong>目次感覚</strong>を身につけておくことが合格の鍵になります。本ガイドの章立ては公式マニュアルの構成(原則→テーマ→プロセス)に沿っているため、学習の地図として活用してください。
          </p>
        </div>
      </section>

      <section id="three-lenses">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:git-branch" aria-hidden="true" />
          <span>SECTION 03</span>
        </div>
        <h2>MSPの全体構造:3つのレンズ</h2>
        <p>
          MSP第5版は、プログラムマネジメントを3つの異なる視点(レンズ)から捉える構造になっています。
        </p>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_THREE_LENSES" theme="base" :theme-variables="LIGHT_THEME_VARS" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <ul>
          <li>
            <strong>原則(Principles)</strong>:
            プログラムが成功するために常に守られるべき、普遍的・自己検証的・力を与える(empowering)7つの指針。MSPに沿ったプログラムはこれらの原則に導かれます。原則が守られていなければ、そのプログラムはMSPの原則を効果的に適用できていないことになります。
          </li>
          <li>
            <strong>テーマ(Themes)</strong>:
            プログラムのライフサイクルを通じて<strong>継続的に</strong>対処し続けなければならない、統治(ガバナンス)上の側面。7つあり、いずれも一度整備して終わりではなく、常時見直しが必要です。
          </li>
          <li>
            <strong>プロセス(Processes)</strong>:
            プログラムを立ち上げてから閉じるまでの<strong>段階的・循環的</strong>な活動の流れ。7つの工程で構成され、直線的というより「反復しながら前進する」流れとして描かれます。
          </li>
        </ul>
        <p>
          第5版では、第4版(2011年)で「Transformational Flow」と呼ばれていたプロセス部分が「<strong
            >MSP Programme Lifecycle(プログラムライフサイクル)</strong
          >」という呼称に変わり、段階的(incremental)な価値提供とアジャイル的な繰り返しの性質がより強調されています。
        </p>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://goodelearning.com/msp-5th-edition-whats-changed-about-managing-successful-programmes/"
              target="_blank"
              rel="noopener"
              >https://goodelearning.com/msp-5th-edition-whats-changed-about-managing-successful-programmes/</a
            >
          </p>
        </div>
        <p>
          またテーマの数も、旧版(第4版)の「9つのガバナンステーマ」から<strong>7つのテーマ</strong>へ統合・再編されました。たとえば旧版の「Vision」「Benefits
          Realization Management」「Risk and Issue
          Management」等は、新版では再編され、ビジョン・ベネフィット・プログラムリスク・ターゲットオペレーティングモデル(TOM)は「Design」テーマで一体的に扱われる一方、課題(イシュー)解決のアプローチやリスク対応(リスクへの対処の選択)は「Decisions」テーマで扱われるようになっています。
        </p>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://axelos.com/resource-hub/blog/msp-5th-edition-what-has-changed"
              target="_blank"
              rel="noopener"
              >https://axelos.com/resource-hub/blog/msp-5th-edition-what-has-changed</a
            >
          </p>
        </div>
      </section>

      <section id="principles">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:clipboard-check" aria-hidden="true" />
          <span>SECTION 04</span>
        </div>
        <h2>7つの原則(Principles)とその実践適用</h2>
        <p>
          第5版における7つの原則は、旧版(第4版)から名称・切り口が刷新されており、より現代的な変革リーダーシップの語彙で表現されています。
        </p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>原則(英語)</th>
                <th>原則(和訳)</th>
                <th>一言でいうと</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lead with purpose</td>
                <td>目的を持って導く</td>
                <td>望ましい成果を描き、伝え続ける</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Collaborate across boundaries</td>
                <td>境界を越えて協働する</td>
                <td>組織横断的な効果的ガバナンスを促進する</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Deal with ambiguity</td>
                <td>曖昧さに対処する</td>
                <td>意思決定に伴うリスクを理解し受け入れる</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Align with priorities</td>
                <td>優先順位に整合させる</td>
                <td>新しい情報や創発的な変化に適応する</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Deploy diverse skills</td>
                <td>多様なスキルを配置する</td>
                <td>変化する業務ニーズに応える</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Realize measurable benefits</td>
                <td>測定可能なベネフィットを実現する</td>
                <td>一貫性のある組織能力を設計・提供する</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Bring pace and value</td>
                <td>ペースと価値をもたらす</td>
                <td>段階的に価値を届け続ける</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://www.theknowledgeacademy.com/za/courses/msp-training/msp-training/"
              target="_blank"
              rel="noopener"
              >https://www.theknowledgeacademy.com/za/courses/msp-training/msp-training/</a
            >
            、
            <a
              href="https://zoboko.com/book/8exoemo3/managing-successful-programmes-5th-edition"
              target="_blank"
              rel="noopener"
              >https://zoboko.com/book/8exoemo3/managing-successful-programmes-5th-edition</a
            >
            (公式マニュアルの章立て:第2章 Principles / 2.1〜2.7)
          </p>
        </div>
        <h3>4.1 各原則の意味とPractitionerレベルの適用ポイント</h3>
        <p>
          <strong>① Lead with purpose(目的を持って導く)</strong
          ><br />プログラムは「なぜこの変革が必要か」という明確な目的意識のもとに導かれなければなりません。プログラムマネージャーやSRO(後述)は、ビジョンを繰り返し発信し、意思決定の軸をぶらさないリーダーシップが求められます。
        </p>
        <ul>
          <li>
            <strong>適用のポイント</strong>:
            シナリオ問題では、ビジョンが曖昧・頻繁に変わる・関係者に伝わっていない、といった兆候が「Lead
            with
            purposeの原則が守られていない」ことを示すヒントになります。対応策としては、ビジョンステートメントの再確認・コミュニケーション計画の強化を提案します。
          </li>
        </ul>
        <p>
          <strong>② Collaborate across boundaries(境界を越えて協働する)</strong
          ><br />プログラムは複数の部門・組織・サプライヤーにまたがるため、通常の部門ガバナンスだけでは統治できません。組織横断的な合意形成の仕組みが必要です。
        </p>
        <ul>
          <li>
            <strong>適用のポイント</strong>:
            部門間の対立、サイロ化した意思決定、ステークホルダー間の情報格差が見られるシナリオでは、Organizationテーマにおけるガバナンス構造の見直しや、Sponsoring
            Group(後述)による調整が解決策になります。
          </li>
        </ul>
        <p>
          <strong>③ Deal with ambiguity(曖昧さに対処する)</strong
          ><br />プログラムの初期段階では不確実性が高く、すべてを事前に計画しきることはできません。曖昧さを前提としたリスクベースの意思決定が必要です。
        </p>
        <ul>
          <li>
            <strong>適用のポイント</strong>:
            「情報が不十分なまま意思決定を迫られている」というシナリオでは、Decisionsテーマのデータ収集・オプション分析のアプローチを適用し、段階的に確度を高めていく提案が適切です。
          </li>
        </ul>
        <p>
          <strong>④ Align with priorities(優先順位に整合させる)</strong
          ><br />外部環境や組織戦略は変化し続けるため、プログラムは定期的に優先順位を見直し、必要であれば方向転換(リフォーカス)する柔軟性を持つ必要があります。
        </p>
        <ul>
          <li>
            <strong>適用のポイント</strong>:
            戦略変更や市場環境の変化が描かれるシナリオでは、Evaluate New
            Information(後述プロセス)を通じた計画の見直しが求められているサインです。
          </li>
        </ul>
        <p>
          <strong>⑤ Deploy diverse skills(多様なスキルを配置する)</strong
          ><br />プログラムは技術・チェンジマネジメント・財務・調達など多様な専門性を必要とします。硬直的な組織図ではなく、必要なスキルを機動的に配置できる体制が求められます。
        </p>
        <ul>
          <li>
            <strong>適用のポイント</strong>:
            リソース不足・スキルミスマッチのシナリオでは、Structureテーマのリソースマネジメントとの関連付けが評価されます。
          </li>
        </ul>
        <p>
          <strong>⑥ Realize measurable benefits(測定可能なベネフィットを実現する)</strong
          ><br />※原則6は英語表記で "Realize measurable benefits"
          ですが、公式教材によっては「一貫性のある組織能力(capability)の設計・提供」という説明が併記される場合があります。プログラムの成果は<strong>測定可能な形で定義</strong>され、単発のプロジェクト完了ではなく、実際の便益実現まで追跡されなければなりません。
        </p>
        <ul>
          <li>
            <strong>適用のポイント</strong>:
            「プロジェクトは完了したがベネフィットが計測されていない」というシナリオは典型的な出題パターンです。Design/Justificationテーマのベネフィットマップ・ベネフィットプロファイルの整備を提案します。
          </li>
        </ul>
        <p>
          <strong>⑦ Bring pace and value(ペースと価値をもたらす)</strong
          ><br />すべてを完成させてから価値を届けるのではなく、<strong>段階的(トランシェ単位)に早期から価値を提供</strong>し続けることが重視されます。
        </p>
        <ul>
          <li>
            <strong>適用のポイント</strong>:
            「最終成果物まで何も価値が出ない」計画になっているシナリオでは、Structureテーマのトランシェ設計・Plan
            Progressive Delivery(後述プロセス)の見直しが解答の方向性になります。
          </li>
        </ul>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <p>
            <strong>ベストプラクティス</strong>:
            Practitioner試験では、シナリオ文中の「症状(何がうまくいっていないか)」から、どの原則が損なわれているかを逆引きする訓練が有効です。7原則を「目的→協働→曖昧さ→優先順位→スキル→ベネフィット→ペース」の順で暗唱できるようにし、それぞれに対応する典型的な失敗パターンと解決策(テーマ・プロセスとの紐付け)をセットで覚えましょう。
          </p>
        </div>
      </section>

      <section id="governance-structure">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:building-bank" aria-hidden="true" />
          <span>SECTION 05</span>
        </div>
        <h2>プログラム組織とガバナンス構造</h2>
        <p>
          7つのテーマの中でも「Organization(組織)」テーマはプログラム全体の土台となるため、先に主要な役割と構造を整理します。
        </p>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ORG_STRUCTURE" theme="base" :theme-variables="LIGHT_THEME_VARS" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ロール</th>
                <th>主な責務</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Sponsoring Group(スポンサリンググループ)</strong></td>
                <td>
                  組織戦略とプログラムを結びつける最上位の投資決定機関。SROを任命し、資金・企業リソースを承認する。組織横断的な対立の最終調整も担う。
                </td>
              </tr>
              <tr>
                <td><strong>Senior Responsible Owner (SRO)</strong></td>
                <td>
                  プログラムの成功に対する<strong>単一の説明責任</strong>を負うシニアリーダー。ビジョンとビジネスケースの健全性を守り、主要な意思決定・資金確保・アシュアランス計画の承認を行う。
                </td>
              </tr>
              <tr>
                <td><strong>Programme Board(プログラムボード)</strong></td>
                <td>
                  SROを議長とし、委任された権限(トレランス)の範囲内でプログラムの推進を統治し、助言・挑戦(チャレンジ)・承認を行う機関。最低限、SRO・プログラムマネージャー・BCM・プログラムオフィス責任者で構成される。
                </td>
              </tr>
              <tr>
                <td><strong>Programme Manager</strong></td>
                <td>
                  プログラムの日常運営責任者。構成プロジェクト群の計画・統合・進捗管理を行い、MSPの主要文書の大部分(プログラム戦略、プログラム計画、リスク登録簿等)を作成する。
                </td>
              </tr>
              <tr>
                <td><strong>Business Change Manager (BCM)</strong></td>
                <td>
                  新しい能力を業務運用に組み込み、実際のベネフィット実現を確認する責任者。ベネフィットマップ・ベネフィットプロファイルの作成責任を持つ。複数名配置されることもある。
                </td>
              </tr>
              <tr>
                <td><strong>Programme Office</strong></td>
                <td>
                  情報管理・進捗レポーティング・標準化支援などプログラムマネジメントを下支えする機能。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://www.finance-ni.gov.uk/articles/programme-board"
              target="_blank"
              rel="noopener"
              >https://www.finance-ni.gov.uk/articles/programme-board</a
            >
            、
            <a
              href="https://www.finance-ni.gov.uk/articles/senior-responsible-owner"
              target="_blank"
              rel="noopener"
              >https://www.finance-ni.gov.uk/articles/senior-responsible-owner</a
            >
            、
            <a href="https://eapad.dk/?p=6228" target="_blank" rel="noopener"
              >https://eapad.dk/?p=6228</a
            >
          </p>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" aria-hidden="true" />
            <span>ベストプラクティス</span>
          </div>
          <p>
            <strong>ベストプラクティス(委譲権限/トレランス)</strong>:
            プログラムボードとSROの間、SROとスポンサリンググループの間では、コスト・スケジュール・スコープ・品質・リスク・ベネフィットの6つの側面について<strong>委譲された許容範囲(トレランス)</strong>を明確に定義しておくことが重要です。これにより、些細な判断まで上位機関にエスカレーションする必要がなくなり、意思決定のスピードが確保されます(Decisionsテーマ・Bring
            pace and value原則とも直結する実務ポイントです)。
          </p>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://open-exam-prep.com/study-guides/msp-foundation/organization-and-governance/governance-structure"
              target="_blank"
              rel="noopener"
              >https://open-exam-prep.com/study-guides/msp-foundation/organization-and-governance/governance-structure</a
            >
          </p>
        </div>
      </section>

      <section id="themes">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:clipboard-text" aria-hidden="true" />
          <span>SECTION 06</span>
        </div>
        <h2>7つのテーマ(Themes)詳細解説</h2>
        <p>
          7つのテーマは、プログラムのライフサイクル全体を通じて<strong>継続的に</strong>対処されるガバナンス側面です。Practitionerレベルでは、単にテーマの定義を覚えるのではなく、「このシナリオではどのテーマの、どの側面を、どの程度厚く(あるいは軽く)適用すべきか」というテーラリング判断が問われます。
        </p>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_THEMES_MAP" theme="base" :theme-variables="LIGHT_THEME_VARS" />
            <template #fallback>
              <p class="diagram-loading">図を読み込み中...</p>
            </template>
          </ClientOnly>
        </div>
        <h3>6.1 Organization(組織)テーマ</h3>
        <p>
          <strong>目的</strong>:
          プログラムの統治構造・役割・説明責任を確立し、明確な意思決定経路を設計すること。
        </p>
        <p><strong>主要な構成要素</strong>:</p>
        <ul>
          <li>ガバナンスアプローチ(意思決定の階層・トレランスの設計)</li>
          <li>リスクアペタイト(組織としてどこまでリスクを許容するか)</li>
          <li>組織構造(前章の図参照)と個々のロールの責務</li>
          <li>ガバナンスを支える追加支援オフィス(法務・調達・財務など)</li>
        </ul>
        <p><strong>プラクティショナーでの適用ポイント</strong>:</p>
        <ul>
          <li>
            小規模・単純なプログラムでは、スポンサリンググループとプログラムボードを兼務させる等、階層を圧縮するテーラリングが妥当。
          </li>
          <li>
            複数国・複数事業部にまたがる大規模プログラムでは、地域別・機能別のサブガバナンス層を追加することが正当化される。
          </li>
          <li>
            シナリオに「意思決定が遅い」「誰が最終責任者か不明確」という症状があれば、Organizationテーマの構造見直しが解答の軸になります。
          </li>
        </ul>
        <p><strong>ベストプラクティス</strong>:</p>
        <ul>
          <li>
            ロールと個人を混同しない(1人が複数ロールを兼務することはあっても、責務の所在は明確に保つ)。
          </li>
          <li>
            プログラムボードの人数は「主要な意見を代表できる最小限」に絞り、意思決定の停滞を防ぐ。
          </li>
        </ul>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://zoboko.com/book/8exoemo3/managing-successful-programmes-5th-edition"
              target="_blank"
              rel="noopener"
              >https://zoboko.com/book/8exoemo3/managing-successful-programmes-5th-edition</a
            >
            (第4章 Organization) 、
            <a
              href="https://www.finance-ni.gov.uk/articles/programme-board"
              target="_blank"
              rel="noopener"
              >https://www.finance-ni.gov.uk/articles/programme-board</a
            >
          </p>
        </div>
        <h3>6.2 Design(設計)テーマ</h3>
        <p>
          <strong>目的</strong>:
          プログラムが実現しようとする「将来の望ましい状態」を明確化し、ビジョン・ベネフィット・リスク・ターゲットオペレーティングモデル(TOM)を一体的に設計すること。第5版ではこの4要素が統合され、設計の一貫性が強調されています。
        </p>
        <p><strong>主要な構成要素</strong>:</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>要素</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ビジョンステートメント</td>
                <td>
                  望ましい将来状態を簡潔に描いた文書。多様なステークホルダーが理解できる言葉で書かれ、プログラム全体を通じて参照される「北極星」の役割を果たす。
                </td>
              </tr>
              <tr>
                <td>ベネフィット(便益)</td>
                <td>
                  プログラムが生み出す価値。財務的/非財務的、直接的/間接的など複数の分類がある。トップダウン型(戦略目標から分解)・ボトムアップ型(個別成果から積み上げ)のベネフィットマップで可視化する。
                </td>
              </tr>
              <tr>
                <td>リスク</td>
                <td>
                  プログラムレベルの戦略的リスク・戦術的リスク・運用リスクを識別し、優先順位付けする。
                </td>
              </tr>
              <tr>
                <td>ターゲットオペレーティングモデル(TOM)</td>
                <td>
                  旧版の「ブループリント」に相当する概念。変革後の組織が実際にどう機能するか(プロセス・組織・技術・情報)を描いた設計図。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://axelos.com/resource-hub/blog/msp-5th-edition-what-has-changed"
              target="_blank"
              rel="noopener"
              >https://axelos.com/resource-hub/blog/msp-5th-edition-what-has-changed</a
            >
            、
            <a href="https://open-exam-prep.com/study-guides/msp-foundation/design-and-target-operating-model/design-theme-and-vision" target="_blank" rel="noopener"
              >https://open-exam-prep.com/study-guides/msp-foundation/design-and-target-operating-model/design-theme-and-vision</a
            >
          </p>
        </div>
        <p><strong>プラクティショナーでの適用ポイント</strong>:</p>
        <ul>
          <li>
            ビジョン不在または形骸化しているシナリオ(例:「誰もビジョンステートメントを見たことがない」)は頻出パターン。対応策として、ビジョンの再策定とコミュニケーション計画の強化を提示する。
          </li>
          <li>
            ベネフィットマップとビジネスケース(Justificationテーマ)の整合性が取れていないシナリオでは、テーマ間の連携不足を指摘する視点が評価されます。
          </li>
        </ul>
        <p><strong>ベストプラクティス</strong>:</p>
        <ul>
          <li>
            ビジョンステートメントは「現状(As-Is)」ではなく必ず「将来状態(To-Be)」を描写し、過度に詳細な実装方法には踏み込まない。
          </li>
          <li>
            ベネフィットは定義段階で「誰が」「いつまでに」「どう測定するか」まで具体化し、ベネフィットプロファイルとして文書化する。
          </li>
        </ul>
        <h3>6.3 Justification(正当化)テーマ</h3>
        <p>
          <strong>目的</strong>:
          プログラムへの投資が継続的に正当化されることを保証すること。単発の承認ではなく、ライフサイクル全体を通じた<strong>継続的なビジネスケースの検証</strong>が核心です。
        </p>
        <p><strong>主要な構成要素</strong>:</p>
        <ul>
          <li>ビジネスケース(投資対効果、コスト・便益・リスクのバランス)</li>
          <li>財務計画・キャッシュフロー管理</li>
          <li>資金調達のガバナンス(トランシェごとの投資承認)</li>
        </ul>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/"
              target="_blank"
              rel="noopener"
              >https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/</a
            >
          </p>
        </div>
        <p><strong>プラクティショナーでの適用ポイント</strong>:</p>
        <ul>
          <li>
            「最初の承認以降、ビジネスケースが一度も更新されていない」というシナリオは、Justificationテーマの継続的検証が機能していないことを示す典型例。
          </li>
          <li>
            各トランシェの終了時に「続行/中止(Go/No-Go)」判断がビジネスケースに基づいてなされているかを確認する視点が重要です。
          </li>
        </ul>
        <p><strong>ベストプラクティス</strong>:</p>
        <ul>
          <li>
            ビジネスケースは一度作って終わりにせず、Evaluate New
            Informationプロセスと連動させて定期的に見直す。
          </li>
          <li>
            便益(ベネフィット)側だけでなく、コスト超過・便益未達のリスクも同じ重みで管理する。
          </li>
        </ul>
        <h3>6.4 Structure(構造)テーマ</h3>
        <p>
          <strong>目的</strong>:
          プログラムをどのように段階的に届けるか(デリバリーアプローチ)、どのペースで進めるか、どうリソースを配分するかを計画すること。
        </p>
        <p><strong>主要な構成要素</strong>:</p>
        <ul>
          <li>
            デリバリーアプローチ(ウォーターフォール型・アジャイル/反復型・ハイブリッド型の選択)
          </li>
          <li>適切なペース(トランシェ)の設定</li>
          <li>デリバリー計画・依存関係管理</li>
          <li>ベネフィット実現計画(Benefits Realization Plan)</li>
          <li>リソースマネジメント(人・設備・資金の配分と最適化)</li>
        </ul>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://zoboko.com/book/8exoemo3/managing-successful-programmes-5th-edition"
              target="_blank"
              rel="noopener"
              >https://zoboko.com/book/8exoemo3/managing-successful-programmes-5th-edition</a
            >
            (第7章 Structure) 、
            <a
              href="https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/"
              target="_blank"
              rel="noopener"
              >https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/</a
            >
          </p>
        </div>
        <p><strong>プラクティショナーでの適用ポイント</strong>:</p>
        <ul>
          <li>
            第5版では、プログラムは作業ごとに適したデリバリーアプローチを選択し、状況が求める場合には複数の方式を組み合わせることができます(例:技術的に不確実性が高い部分にはアジャイル/反復型、規制要件が明確な部分にはウォーターフォール型)。ハイブリッドを既定として推奨するものではありません。
          </li>
          <li>
            「最終トランシェまで何のベネフィットも実現しない」設計は、Bring pace and
            value原則違反のサインであり、トランシェの再設計(早期に価値を出せる構成プロジェクトを前倒しする)が解答になります。
          </li>
        </ul>
        <p><strong>ベストプラクティス</strong>:</p>
        <ul>
          <li>
            トランシェの境界は、意味のあるベネフィットが実現できる単位、かつビジネスケースを見直せる自然な区切りに設定する。
          </li>
          <li>
            依存関係(プロジェクト間・外部組織との依存)は、プログラムマネージャーが一元的に可視化・管理する。
          </li>
        </ul>
        <h3>6.5 Knowledge(知識)テーマ</h3>
        <p>
          <strong>目的</strong>:
          プログラムが情報・知識をどのように取得・整理・活用し、経験から学び、継続的改善の文化を醸成するかを定義すること。
        </p>
        <p><strong>主要な構成要素</strong>:</p>
        <ul>
          <li>情報管理(バージョン管理、アクセス制御、データプライバシーの確保)</li>
          <li>知識管理(教訓(レッスンズラーンド)の収集と再利用)</li>
          <li>継続的改善の仕組み</li>
        </ul>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a href="https://goodelearning.com/articles/what-is-msp/" target="_blank" rel="noopener"
              >https://goodelearning.com/articles/what-is-msp/</a
            >
          </p>
        </div>
        <p><strong>プラクティショナーでの適用ポイント</strong>:</p>
        <ul>
          <li>
            「過去の類似プログラムの教訓が今回のプログラムで再現されている失敗」というシナリオは、Knowledgeテーマ(教訓管理)の不備を示す典型パターン。
          </li>
          <li>
            情報の版が混在しメンバーが古い資料を参照しているシナリオでは、情報管理(ドキュメント統制)の強化を提案します。
          </li>
        </ul>
        <p><strong>ベストプラクティス</strong>:</p>
        <ul>
          <li>
            教訓は「収集して終わり」ではなく、次のトランシェの計画立案時に<strong>必ず参照するプロセス</strong>として組み込む。
          </li>
          <li>
            機密情報・個人情報を扱う場合は、アクセス権限の設計をKnowledgeテーマの一部として明示的に計画する。
          </li>
        </ul>
        <h3>6.6 Assurance(保証)テーマ</h3>
        <p>
          <strong>目的</strong>:
          プログラムが正しく統治され、計画通りに進んでいることを独立した視点で確認する仕組みを設計すること。「<strong
            >スリーラインズオブディフェンス(three lines of defense、三線防御)</strong
          >」の考え方に基づき、役割と責任を階層的に整理します。
        </p>
        <p><strong>三線防御モデルの考え方</strong>:</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ライン</th>
                <th>委譲された権限のレベル</th>
                <th>役割</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>第1線</td>
                <td>プロジェクト/業務運用レベル</td>
                <td>プロジェクトおよび業務運用のリスクとコントロールを管理する</td>
              </tr>
              <tr>
                <td>第2線</td>
                <td>プログラムレベル</td>
                <td>プログラムレベルのリスクとコントロールを管理する</td>
              </tr>
              <tr>
                <td>第3線</td>
                <td>企業(エンタープライズ)レベル</td>
                <td>企業レベルのリスクとコントロールを管理する</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          特定の組織(プログラムオフィスや内部監査など)を一律にいずれかの線へ割り当てるものではありません。内部監査は、状況に応じてアシュアランスを提供しうる主体の一つとして位置づけます。
        </p>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a href="https://goodelearning.com/articles/what-is-msp/" target="_blank" rel="noopener"
              >https://goodelearning.com/articles/what-is-msp/</a
            >
          </p>
        </div>
        <p><strong>プラクティショナーでの適用ポイント</strong>:</p>
        <ul>
          <li>
            「プログラムマネージャー自身が自分の進捗を評価するだけで、外部レビューが一度もない」というシナリオは、独立したアシュアランス(内部監査などによる客観的な保証)の欠如を示す典型例。
          </li>
          <li>
            アシュアランス活動は計画段階から<strong>アシュアランスプラン</strong>として明示的に設計し、場当たり的なレビューにしないことが求められます。
          </li>
        </ul>
        <p><strong>ベストプラクティス</strong>:</p>
        <ul>
          <li>
            アシュアランスの独立性(誰が誰をレビューするか)を組織図上で明確にし、利益相反を避ける。
          </li>
          <li>
            高リスクな領域(大規模な資金投入、規制要件が厳しい領域)には、より頻度の高い・より独立性の高いアシュアランスを重点配置する(リスクベースのアシュアランス)。
          </li>
        </ul>
        <h3>6.7 Decisions(意思決定)テーマ</h3>
        <p>
          <strong>目的</strong>:
          プログラムのライフサイクルを通じて発生する意思決定(課題解決、リスク対応、選択肢の評価など)を、一貫した・十分に統治された方法で行うための仕組みを定義すること。
        </p>
        <p><strong>主要な構成要素</strong>:</p>
        <ul>
          <li>課題(イシュー)解決のアプローチ</li>
          <li>リスク対応(回避・低減・転嫁・受容などの選択)</li>
          <li>データ収集とレポーティング</li>
          <li>オプション分析(複数の選択肢を比較評価する手法)</li>
        </ul>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" aria-hidden="true" />
            <span>ソース</span>
          </div>
          <p>
            出典:
            <a
              href="https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/"
              target="_blank"
              rel="noopener"
              >https://goodelearning.com/product/project-program-management/msp-5th-edition-foundation-self-paced-e-learning/</a
            >
          </p>
        </div>
        <p><strong>プラクティショナーでの適用ポイント</strong>:</p>
        <ul>
          <li>
            「同じような課題に対して毎回対応がバラバラ」というシナリオは、Decisionsテーマの一貫したアプローチの欠如を示します。
          </li>
          <li>
            不確実性が高い意思決定(Deal with
            ambiguity原則)では、断定的な結論を急がず、選択肢を並べて比較評価するオプション分析の適用を提案するのが適切です。
          </li>
        </ul>
        <p><strong>ベストプラクティス</strong>:</p>
        <ul>
          <li>
            意思決定の記録(誰が・いつ・どのような根拠で決定したか)を残し、後から説明責任を果たせるようにする。
          </li>
          <li>
            意思決定の権限(トレランス内で誰が決められるか)をOrganizationテーマのガバナンス構造とセットで設計する。
          </li>
        </ul>
      </section>

      <section id="lifecycle">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:route" aria-hidden="true" />
          <span>SECTION 07</span>
        </div>
        <h2>7つのプロセス(プログラムライフサイクル)</h2>
      </section>

      <section id="tailoring">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:refresh" aria-hidden="true" />
          <span>SECTION 08</span>
        </div>
        <h2>テーラリング(Tailoring):MSPを現場に合わせる</h2>
      </section>

      <section id="exam-tips">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:map-2" aria-hidden="true" />
          <span>SECTION 09</span>
        </div>
        <h2>プラクティショナー試験対策:シナリオ適用のコツ</h2>
      </section>

      <section id="best-practices">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:flag-3" aria-hidden="true" />
          <span>SECTION 10</span>
        </div>
        <h2>ベストプラクティス総まとめ表</h2>
      </section>

      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:link" aria-hidden="true" />
          <span>SECTION 11</span>
        </div>
        <h2>参考文献・出典(ソースURL)</h2>
      </section>

      <footer>
        MSP® is a registered trademark of PeopleCert International Limited.
        本ページは非公式の学習資料です。
      </footer>
    </main>
  </div>
</template>

<style scoped>
.doc-layout {
  position: relative;
  min-height: calc(100vh - var(--global-nav-height, 0px));
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: calc(var(--global-nav-height, 0px) + 16px);
  left: 16px;
  z-index: 30;
  width: 42px;
  height: 42px;
  background: var(--color-paper-raised, #ffffff);
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--color-ink, #161b26);
  cursor: pointer;
}

.sidebar {
  position: fixed;
  top: var(--global-nav-height, 0px);
  left: 0;
  width: 288px;
  height: calc(100vh - var(--global-nav-height, 0px));
  overflow-y: auto;
  background: var(--color-paper-raised, #ffffff);
  border-right: 1px solid var(--color-border, #dfe3ea);
  padding: 32px 24px;
  z-index: 20;
}

.brand-title {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 19px;
  color: var(--color-ink, #161b26);
}

.brand-subtitle {
  color: var(--color-ink-faint, #646d7d);
  font-size: 14px;
  margin: 2px 0 24px;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav a {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--color-ink-soft, #4b5566);
  text-decoration: none;
  font-size: 14px;
  border-left: 2px solid transparent;
  transition: all 0.15s ease;
}

.sidebar-nav a:hover,
.sidebar-nav a.active {
  background: var(--color-indigo-tint, #eef1f8);
  color: var(--color-indigo, #2e3f72);
}

.sidebar-nav a.active {
  border-left-color: var(--color-indigo, #2e3f72);
  font-weight: 600;
}

.main-content {
  margin-left: 288px;
  padding: 56px 72px 120px;
  max-width: none;
}

.hero {
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-gold, #b8802a);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

h1 {
  font-family: var(--font-display, serif);
  font-size: 38px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 16px;
  color: var(--color-ink, #161b26);
}

.hero-lede {
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-ink-soft, #4b5566);
  margin-bottom: 24px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.stat-card {
  background: var(--color-paper-raised, #ffffff);
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 10px;
  padding: 18px 20px;
}

.stat-number {
  font-family: var(--font-display, serif);
  font-weight: 700;
  font-size: 24px;
  color: var(--color-indigo, #2e3f72);
}

.stat-label {
  color: var(--color-ink-soft, #4b5566);
  font-size: 13px;
  margin-top: 6px;
  line-height: 1.4;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--color-indigo-tint, #eef1f8);
  border: 1px solid #c7d1ea;
  color: var(--color-indigo, #2e3f72);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.6;
  margin-top: 24px;
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
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-ink-faint, #646d7d);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

h2 {
  font-family: var(--font-display, serif);
  font-size: 29px;
  font-weight: 700;
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink, #161b26);
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

h3 {
  font-family: var(--font-display, serif);
  font-size: 21px;
  font-weight: 600;
  margin: 40px 0 16px;
  color: var(--color-ink, #161b26);
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 32px);
}

p {
  margin: 0 0 18px;
  line-height: 1.75;
}

ul,
ol {
  margin: 0 0 18px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 10px;
  margin: 0 0 24px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  background: var(--color-paper-sunk, #eef0f4);
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-strong, #c7cdd9);
  font-weight: 600;
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-soft, #4b5566);
  vertical-align: top;
  line-height: 1.6;
}

tr:last-child td {
  border-bottom: 0;
}

tbody tr:nth-child(even) {
  background: var(--color-paper, #f6f7f9);
}

.callout {
  border: 1px solid var(--color-border, #dfe3ea);
  border-left: 4px solid var(--color-indigo, #2e3f72);
  background: var(--color-paper-raised, #ffffff);
  border-radius: 10px;
  padding: 18px 24px;
  margin: 24px 0;
}

.callout p {
  margin: 0;
}

.callout-title {
  font-weight: 600;
  color: var(--color-indigo, #2e3f72);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
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

.callout.source .callout-title,
.callout.source a {
  color: var(--color-forest, #1b6e6a);
}

.callout.note {
  border-left-color: var(--color-plum, #8c3a5c);
}

.callout.note .callout-title {
  color: var(--color-plum, #8c3a5c);
}

.mermaid-wrap {
  background: var(--color-paper-raised, #ffffff);
  border: 1px solid var(--color-border, #dfe3ea);
  border-radius: 12px;
  padding: 28px;
  margin: 24px 0;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border, #dfe3ea);
  color: var(--color-ink-faint, #646d7d);
  font-size: 14px;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }
  .sidebar {
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.2s, visibility 0.2s;
  }
  .sidebar.is-open {
    transform: none;
    visibility: visible;
  }
  .main-content {
    margin-left: 0;
    padding: 88px 24px 100px;
  }
  h1 {
    font-size: 30px;
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
