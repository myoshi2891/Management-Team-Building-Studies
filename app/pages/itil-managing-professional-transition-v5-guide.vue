<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL® Managing Professional Transition (Version 5) 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description: "ITIL Managing Professional Transition (Version 5) を初学者向けにステップバイステップで解説。Transformation Model、PSLM 8活動、ITIL Experience Model、AI Capability Model、各項目のベストプラクティスと出典URLを網羅。",
});

const TOC_SECTIONS = [
  { id: "about-mpt", label: "この資格について", icon: "tabler:certificate" },
  { id: "itil-v5-evolution", label: "ITIL(V5)全体像", icon: "tabler:timeline" },
  { id: "foundational-concepts", label: "共通基盤概念", icon: "tabler:building-bank" },
  { id: "exam1-transformation", label: "試験1: Transformation", icon: "tabler:git-branch" },
  { id: "exam2-product-service-experience", label: "試験2: Product/Service/Experience", icon: "tabler:route" },
  { id: "ai-capability-model", label: "ITIL and AI", icon: "tabler:file-text" },
  { id: "itil-other-frameworks", label: "他フレームワークとの関係", icon: "tabler:clipboard-text" },
  { id: "exam-strategy", label: "試験対策のポイント", icon: "tabler:map-2" },
  { id: "study-checklist", label: "学習チェックリスト", icon: "tabler:clipboard-check" },
  { id: "references", label: "参考文献", icon: "tabler:link" },
] as const;

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

const activeId = useActiveHeading(TOC_SECTIONS.map((s) => s.id));

const DIAGRAM_CERTIFICATION_PATHWAY = `flowchart TB
subgraph RouteGeneral["ルート1: 一般的なFoundationルート(前提資格なし)"]
direction TB
FG["ITIL Foundation Version 5"] --> FG2["Product/Service/Experience/ Transformationを個別取得"]
FG2 --> FG3["Managing Professional Version 5"]
FG --> FG4["Strategy/Transformationを個別取得"]
FG4 --> FG5["Strategic Leader Version 5"]
FG --> FG6["Practice Managerモジュールを個別取得"]
FG6 --> FG7["Practice Manager Version 5"]
FG3 --> FG8["ITIL Master Version 5"]
FG5 --> FG8
FG7 --> FG8
end
subgraph Route4MP["ルート2: ITIL 4 Managing Professionalからの移行"]
direction TB
MP4["ITIL 4 Managing Professional 保有"] --> MPT4MP["MPT研修 + Exam1/Exam2 合格"]
MPT4MP --> MP4R["Managing Professional Version 5 認定 (Transformationも認定済み)"]
MP4R --> MP4S["残る Practice Manager・Strategic Leaderを 別途個別取得"]
MP4S --> MP4M["ITIL Master Version 5"]
end
subgraph Route4["ルート3: ITIL 4 Masterからの移行"]
direction TB
M4["ITIL 4 Master 保有"] --> MPT4["MPT研修 + Exam1/Exam2 合格"]
MPT4 --> M4R["Managing Professional・Practice Manager・ Strategic Leaderを一括認定"]
M4R --> M4M["ITIL Master Version 5"]
end
subgraph RouteV3["ルート4: ITIL v3 Masterからの移行"]
direction TB
M3["ITIL v3 Master 保有 (v3 Expertも同様にMPまで)"] --> MPT3["MPT研修 + Exam1/Exam2 合格"]
MPT3 --> M3R["Managing Professional Version 5 認定 (Transformationも認定済み)"]
M3R --> M3S["Practice Manager・Strategic Leaderを 別途個別取得"]
M3S --> M3M["ITIL Master Version 5"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class FG,FG2,FG4,FG6,MP4,M4,M3 box;
class MPT4MP,MP4R,MP4S,MPT4,MPT3,M3R,M3S hub;
class FG3,FG5,FG7,FG8,MP4M,M4R,M4M,M3M done;`;

const DIAGRAM_FOUR_DIMENSIONS = `flowchart TB
Center["ITIL Value System"]
Center --> D1["Organizations and People (組織と人材/AIとの協働を含む)"]
Center --> D2["Information and Technology (AI Capability Model/6Cモデルを含む)"]
Center --> D3["Partners and Suppliers"]
Center --> D4["Value Streams and Processes"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Center hub;
class D1,D2,D3,D4 box;`;

const DIAGRAM_TRANSFORMATION_LAYERS = `flowchart TB
subgraph L1["Governance layer"]
direction TB
G1["方向性・権限・優先順位づけ"]
end
subgraph L2["Positioning layer"]
direction TB
P1["コンテキストと複雑性の把握"]
end
subgraph L3["Execution layer"]
direction TB
E1["計画と実行"]
end
subgraph L4["Learning layer"]
direction TB
Le1["測定・評価・学習"]
end
L1 --> L2
L2 --> L3
L3 --> L4
L4 -.->|学びのフィードバック| L1
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class L1,L2,L3,L4 box;`;

const DIAGRAM_TRANSFORMATION_PATTERNS = `flowchart TD
P1["Initiation pattern (変革の立ち上げ)"]
P2["Governance pattern (変革のガバナンス)"]
P3["Execution pattern (変革の実行)"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P1,P2,P3 box;`;
</script>

<template>
  <div class="guide-layout">
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <div
      v-if="sidebarOpen"
      class="sidebar-backdrop"
      @click="closeSidebar"
    />

    <nav
      class="sidebar"
      :class="{ 'is-open': sidebarOpen }"
      aria-label="目次"
    >
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">ITIL® MPT (V5) 完全ガイド</div>
          <div class="brand-subtitle">Managing Professional Transition</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li v-for="item in TOC_SECTIONS" :key="item.id">
          <a
            :href="`#${item.id}`"
            :class="{ active: activeId === item.id }"
            @click="closeSidebar"
          >
            <Icon :name="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" />PeopleCert公式認定資格ガイド
        </div>
        <h1>ITIL® Managing Professional Transition (Version 5)</h1>
        <p class="hero-lede">
          初学者向け ステップバイステップ解説 + ベストプラクティス
        </p>

        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">2試験</div>
            <div class="stat-label">Transformation + Product/Service/Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100問</div>
            <div class="stat-label">Exam1: 40問 / Exam2: 60問</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">70%</div>
            <div class="stat-label">各試験の合格基準(オープンブック)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">3年</div>
            <div class="stat-label">資格更新サイクル(60 CPD)</div>
          </div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          <span>本ガイドは教育・学習支援を目的とした非公式の解説資料です。ITIL Transformation Model の12ステージの正式名称、各PSLM活動のCSF・メトリクスの正確な文言、試験の最新の出題傾向については、必ず公式eBookおよび<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-managing-professional-transition-version-5-4227" target="_blank" rel="noopener">PeopleCert公式サイト</a>で最新情報をご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 1. About MPT ===================== -->
      <section id="about-mpt">
        <div class="section-eyebrow">
          <Icon name="tabler:certificate" />SECTION 01
        </div>
        <h2>この資格について</h2>

        <h3>ITIL Managing Professional Transition (Version 5) とは何か</h3>
        <p><strong>ITIL® Managing Professional Transition (Version 5)</strong>(以下 MPT)は、すでに ITIL の上級資格を保有している経験豊富なプロフェッショナルが、個別モジュールを一つずつ受講し直すことなく、最新の <strong>ITIL (Version 5)</strong> へ迅速かつ低コストでアップグレードするための「橋渡し(ブリッジ)モジュール」です。</p>

        <p>対象となるのは以下のいずれかの既存資格保持者のみです。</p>
        <ul>
          <li>ITIL 4 Managing Professional</li>
          <li>ITIL 4 Master</li>
          <li>ITIL v3 Expert</li>
          <li>ITIL v3 Master</li>
        </ul>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>上記いずれの前提資格も持たない場合は MPT を受験できません。その場合は ITIL Foundation (Version 5) から開始し、ITIL Product / ITIL Service / ITIL Experience / ITIL Transformation の各モジュールを個別に取得するルートを選びます。</p>
        </div>

        <h3>認定の位置づけ</h3>
        <p>MPT は「研修1本 + 試験2本」で構成されるパッケージです。両方の試験に合格すると <strong>ITIL Managing Professional (Version 5)</strong> の資格が得られます。ITIL 最高位資格 <strong>ITIL Master (Version 5)</strong> に到達するには、これに加えて <strong>ITIL Practice Manager (Version 5)</strong> と <strong>ITIL Strategic Leader (Version 5)</strong> の2資格も必要です(3資格必須)。ただし、保有していた前提資格によってMPT経由での到達範囲が異なります。</p>
        <ul>
          <li><strong>ITIL 4 Managing Professional 保有者:</strong> MPTの2試験合格により、Managing Professional (Version 5) と、中核モジュール <strong>Transformation (Version 5)</strong> の2つが認定されます(Exam 1 が Transformation の試験そのものであるため)。Master に到達するために残るのは Practice Manager と Strategic Leader の2資格で、これらは<strong>別途個別に取得</strong>する必要があります。</li>
          <li><strong>ITIL 4 Master 保有者:</strong> MPTの2試験合格により、Managing Professional に加えて Practice Manager・Strategic Leader も同時に認定され、<strong>ITIL Master (Version 5) まで一括で到達</strong>します。</li>
          <li><strong>ITIL v3 Master 保有者:</strong> MPTの2試験合格で得られるのは Managing Professional(および中核モジュール Transformation の認定)までです。Master に到達するには、Practice Manager と Strategic Leader を<strong>別途個別に取得</strong>する必要があります。</li>
        </ul>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CERTIFICATION_PATHWAY" />
          </ClientOnly>
          <div class="diagram-caption">ITIL Master (Version 5) までの3つの到達ルート(一般的なFoundationルート / ITIL 4 Masterからの移行 / ITIL v3 Masterからの移行)</div>
        </div>

        <h3>試験構成の全体比較</h3>
        <p>MPT は2つの独立した試験から構成され、<strong>どちらから先に受験しても構いません</strong>(別日程での受験も可)。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>項目</th>
                <th>Exam 1: ITIL Transformation (Version 5)</th>
                <th>Exam 2: MPT – Product, Service, Experience (Version 5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>出題数</td>
                <td>40問</td>
                <td>60問</td>
              </tr>
              <tr>
                <td>形式</td>
                <td>多肢選択式(Multiple choice)</td>
                <td>多肢選択式(Multiple choice)</td>
              </tr>
              <tr>
                <td>試験時間</td>
                <td>90分(非母語話者は+25%で約113分)</td>
                <td>120分(非母語話者は+25%で約150分)</td>
              </tr>
              <tr>
                <td>参照可否</td>
                <td>オープンブック(公式 Transformation eBook + シナリオ冊子)</td>
                <td>オープンブック(公式 Product / Service / Experience eBook)</td>
              </tr>
              <tr>
                <td>合格基準</td>
                <td>70%</td>
                <td>70%</td>
              </tr>
              <tr>
                <td>出題スタイル</td>
                <td>シナリオベース(ケーススタディ形式)</td>
                <td>シナリオベース(例: レンタカー会社ケース) + Experience セクション</td>
              </tr>
              <tr>
                <td>受験方式</td>
                <td>オンライン監督下試験(PeopleCert経由)</td>
                <td>オンライン監督下試験(PeopleCert経由)</td>
              </tr>
              <tr>
                <td>主な学習範囲</td>
                <td>Transformation Model の4 Layer(Governance / Positioning / Execution / Learning)、変革パターン</td>
                <td>PSLM 8活動、バリューストリーム、Experience Model、サービスジャーニー</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>2試験は独立採点のため、得意分野から着手する戦略が有効です。「変革・組織改革」の経験が長い方は Transformation から、「プロダクト/サービス運用」の実務経験が長い方は PSE から始めると学習の立ち上がりが早くなります。</p>
        </div>

        <h3>公式教材</h3>
        <p>この認定コースには以下4冊の公式eBookと公式Learner Workbookが含まれます。</p>
        <ul>
          <li>ITIL Product (Version 5) 公式eBook</li>
          <li>ITIL Service (Version 5) 公式eBook</li>
          <li>ITIL Experience (Version 5) 公式eBook</li>
          <li>ITIL Transformation (Version 5) 公式eBook</li>
        </ul>

        <div class="callout note" data-variant="note">
          <div class="callout-title">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p>本ガイドは上記の公式教材および PeopleCert・各アクレディテッド・トレーニング・オーガナイゼーション(ATO)が公開している情報をもとに、初学者向けに再構成した学習補助資料です。公式eBookの正式な記述(成功要因・メトリクスの正確な文言など)については、必ず公式教材を最終参照源としてください。</p>
        </div>

        <h3>資格の更新</h3>
        <ul>
          <li>更新サイクル: <strong>3年ごと</strong></li>
          <li>更新方法: PeopleCert Plus 会員として <strong>60 CPD ポイント</strong> を蓄積するか、同一 Product Suite 内の別モジュールを再受験する</li>
        </ul>
      </section>

      <!-- ===================== 2. ITIL Version 5 Evolution ===================== -->
      <section id="itil-v5-evolution">
        <div class="section-eyebrow">
          <Icon name="tabler:timeline" />SECTION 02
        </div>
        <h2>ITIL (Version 5) 全体像 — v3 / v4 からの進化</h2>

        <p>MPT を学ぶ前提として、ITIL がどのように進化してきたかを理解しておくと、Transformation・PSE いずれの試験でも問われる「なぜこの変更が行われたか」という視点が持てます。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>観点</th>
                <th>ITIL v3(2007)</th>
                <th>ITIL 4(2019)</th>
                <th>ITIL (Version 5)(2026)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>中核モデル</td>
                <td>Service Lifecycle(5段階: Strategy/Design/Transition/Operation/CSI)</td>
                <td>Service Value System + Service Value Chain(6活動)</td>
                <td>ITIL Value System (ITIL VS) + Product and Service Lifecycle Model / PSLM(8活動)</td>
              </tr>
              <tr>
                <td>対象範囲</td>
                <td>ITサービスマネジメント</td>
                <td>ITサービスマネジメント(原則・プラクティス体系)</td>
                <td>デジタル<strong>プロダクト</strong>とサービスの統合マネジメント</td>
              </tr>
              <tr>
                <td>AIの扱い</td>
                <td>想定なし</td>
                <td>言及なし</td>
                <td>Four Dimensionsの「情報と技術」にAI Capability Model(6Cモデル)を新設、「組織と人材」には人とAIの協働を明示的に統合、専用のAI Governanceモジュールも新設</td>
              </tr>
              <tr>
                <td>Guiding Principles</td>
                <td>なし(v3独自の原則)</td>
                <td>7原則</td>
                <td>7原則を<strong>そのまま継承</strong>(変更なし)</td>
              </tr>
              <tr>
                <td>管理プラクティス</td>
                <td>26プロセス+機能</td>
                <td>34プラクティス</td>
                <td>34プラクティス名を<strong>そのまま継承</strong></td>
              </tr>
              <tr>
                <td>認定体系</td>
                <td>Foundation→Practitioner→Intermediate→Expert→Master</td>
                <td>Foundation→Specialist/Strategist/Leader→Master</td>
                <td>Foundation→Practice Manager / Product・Service・Experience・Transformation(Managing Professional) / Strategy・Transformation(Strategic Leader)→Master(Practice Manager+Managing Professional+Strategic Leaderの3資格が必須)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>試験対策としては「何が変わったか」だけでなく「何が変わっていないか」を明確に区別して覚えることが得点に直結します。Guiding Principlesと34プラクティス名は据え置きのため、既存のITIL 4知識はそのまま活用できます。</p>
        </div>
      </section>

      <!-- ===================== 3. Foundational Concepts ===================== -->
      <section id="foundational-concepts">
        <div class="section-eyebrow">
          <Icon name="tabler:building-bank" />SECTION 03
        </div>
        <h2>共通基盤概念 — ITIL Value System・7つのGuiding Principles・Four Dimensions</h2>

        <p>Transformation試験・PSE試験のどちらにも共通して出題される土台となる概念です。</p>

        <h3>ITIL Value System (ITIL VS)</h3>
        <p>ITIL 4 の Service Value System (SVS) の名称が <strong>ITIL Value System (ITIL VS)</strong> に変更されました。これは「サービス」だけでなく「デジタルプロダクト」も価値創出の対象として明示的に含めるための改称であり、構成要素(Guiding Principles、Governance、Product and Service Lifecycle Model、Practices、Continual Improvement)自体の骨格はSVSを踏襲しています。</p>

        <h3>7つの Guiding Principles(変更なし)</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>原則(英語)</th>
                <th>日本語での要点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Focus on value</td>
                <td>すべての活動を「顧客・利害関係者にとっての価値」から逆算して設計する</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Start where you are</td>
                <td>ゼロから作り直さず、既存の資産・プロセス・データを評価してから着手する</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Progress iteratively with feedback</td>
                <td>大きな変更を小さく分割し、フィードバックを得ながら進める</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Collaborate and promote visibility</td>
                <td>サイロを越えた協働と、意思決定・進捗の可視化を重視する</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Think and work holistically</td>
                <td>部分最適ではなく、組織全体・エンドツーエンドの結果に目を向ける</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Keep it simple and practical</td>
                <td>必要最小限の手順にとどめ、価値を生まない複雑さを排除する</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Optimize and automate</td>
                <td>人手作業を最適化したうえで、可能な範囲を自動化・AI活用する</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>Version 5 では特に原則7「Optimize and automate」が AI Capability Model(後述)と直結して出題されやすくなっています。「まず最適化、その後に自動化」という順序を必ず押さえてください。</p>
        </div>

        <h3>Four Dimensions of Product and Service Management</h3>
        <p>4つの側面自体はITIL 4から継続していますが、Version 5では「情報と技術」の次元にAI Capability Model(6Cモデル)が新設され、「組織と人材」の次元には人とAIの協働という観点が明示的に組み込まれた点が変更点です。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FOUR_DIMENSIONS" />
          </ClientOnly>
          <div class="diagram-caption">Four Dimensions of Product and Service Management(ITIL Value Systemを取り巻く4つの側面)</div>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>4つの側面はPESTLE分析(政治・経済・社会・技術・法律・環境)などの外的要因とセットで問われることが多く、「内的な4側面 vs 外的な環境要因」を対比して整理しておくと理解が定着します。</p>
        </div>
      </section>

      <!-- ===================== 4. Exam 1: ITIL Transformation ===================== -->
      <section id="exam1-transformation">
        <div class="section-eyebrow">
          <Icon name="tabler:git-branch" />SECTION 04
        </div>
        <h2>試験1: ITIL Transformation (Version 5)</h2>

        <h3>Transformationの基本概念</h3>
        <p>ITIL Transformation (Version 5) は、組織(またはその一部)を新しい状態へ導く<strong>変革(Transformation)</strong>を体系的に扱うモジュールです。日常的な改善(BAU改善 / Business-As-Usual improvement)とは区別され、以下のような特徴を持つ大規模・複雑な変化を対象とします。</p>
        <ul>
          <li>複数の相互依存領域にまたがる協調的な変化である</li>
          <li>規模・範囲・コスト・リスクにばらつきがある</li>
          <li>しばしば大きな不確実性を伴う</li>
          <li>単一の固定手法では対応できず、状況に応じた柔軟な手法が必要</li>
        </ul>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>「BAU改善」と「Transformation」を混同しないこと。小さな継続的改善はContinual Improvement Modelで扱い、組織構造やオペレーティングモデルそのものを変える取り組みはTransformation Modelで扱う、という切り分けが試験の頻出ポイントです。</p>
        </div>

        <h3>ITIL Transformation Model — 4つの Layer</h3>
        <p>ITIL Transformation Model は、変革の取り組みを <strong>4つの相互接続されたLayer(層)</strong> で構造化します。さらに、その内部は合計12のStage(段階)に分解され、状況(Context)に応じて適応的に適用されます。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>役割</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Governance layer</strong>(ガバナンス層)</td>
                <td>変革の方向性を定め、意思決定権限・説明責任・優先順位づけの枠組みを提供する</td>
              </tr>
              <tr>
                <td><strong>Positioning layer</strong>(ポジショニング層)</td>
                <td>組織が置かれている状況・複雑性・コンテキストを理解し、変革のスコープを見極める</td>
              </tr>
              <tr>
                <td><strong>Execution layer</strong>(実行層)</td>
                <td>実際に変革を計画・実施し、価値を届ける</td>
              </tr>
              <tr>
                <td><strong>Learning layer</strong>(学習層)</td>
                <td>変革の結果を測定・評価し、得られた学びを組織にフィードバックする</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TRANSFORMATION_LAYERS" />
          </ClientOnly>
          <div class="diagram-caption">ITIL Transformation Model の4 Layer(Governance→Positioning→Execution→Learningの循環構造)</div>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>4 Layerは「一方向の直線プロセス」ではなく、Learning layerで得た知見がGovernance layerに継続的にフィードバックされる<strong>循環構造</strong>です。試験では「変革は一度きりで完了するものではない」という前提を問う設問が出やすいです。</p>
        </div>

        <h3>変革の複雑性とコンテキストへの適応</h3>
        <p>組織が置かれる状況は「予測可能で秩序立っている(Ordered/Clear)」ものから「予測不能で混沌としている(Chaotic)」ものまで幅があります。ITIL Transformation Modelはこの違いに応じてアプローチを変える柔軟性を持つことが特徴です。ただし、状況が十分に把握できていない(Confused)場合は、いきなりアプローチを選ぶのではなく、まず状況をOrdered・Complex・Chaoticのいずれかに分類することが先決です。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コンテキストの性質</th>
                <th>適したアプローチの傾向</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>状況が把握できていない(Confused)</td>
                <td>Ordered・Complex・Chaoticのいずれに該当するかを情報収集して分類することを最優先する</td>
              </tr>
              <tr>
                <td>秩序立っている・予測可能</td>
                <td>詳細な事前計画、明確なガバナンス、既知のベストプラクティスの適用</td>
              </tr>
              <tr>
                <td>複雑・不確実性が高い(Complex)</td>
                <td>小さな実験、反復的な学習、適応型ガバナンス</td>
              </tr>
              <tr>
                <td>混沌としている(Chaotic)</td>
                <td>即座の安定化を最優先し、状況を落ち着かせてから通常のアプローチへ移行</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>「すべての変革に同じテンプレートを当てはめない」ことが最重要原則です。秩序立った環境で通用した詳細計画型のガバナンスを、混沌とした環境にそのまま適用すると失敗しやすい、という因果関係を理解しておきましょう。</p>
        </div>

        <h3>変革の3つの共通パターン(Common Patterns)</h3>
        <p>ITIL Transformation Model は、変革の取り組みを分類する <strong>3つの共通パターン</strong> を提示します。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TRANSFORMATION_PATTERNS" />
          </ClientOnly>
          <div class="diagram-caption">変革の3つの共通パターン: Initiation pattern / Governance pattern / Execution pattern</div>
        </div>

        <ul>
          <li><strong>Initiation pattern(立ち上げパターン):</strong> なぜ変革が必要か、どこから着手するかを明確化する</li>
          <li><strong>Governance pattern(ガバナンスパターン):</strong> BAU(通常業務)向けのガバナンスと、変革専用のガバナンスをどう使い分けるかを扱う</li>
          <li><strong>Execution pattern(実行パターン):</strong> 実際に変革をどのように進めるか、実行方式のバリエーションを扱う</li>
        </ul>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>「BAU governance patterns」と「Transformation governance patterns」は明確に別物として区別してください。通常業務のガバナンス機構(変更諮問委員会など)をそのまま大規模変革の意思決定に流用すると、意思決定が遅延し変革が停滞するリスクがあります。</p>
        </div>

        <h3>測定・ツール・学習</h3>
        <p>Transformation Model の Learning layer では、変革の進捗と成果を可視化するためのツール・手法が扱われます。既存のITILおよび隣接するプラクティスから、以下のようなツール群が変革の測定・可視化に活用されます。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ツール / 手法</th>
                <th>主な用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value Stream Mapping (VSM)</td>
                <td>エンドツーエンドの価値の流れを可視化し、ムダ・ボトルネックを特定する</td>
              </tr>
              <tr>
                <td>OKR(Objectives and Key Results)</td>
                <td>変革のゴールと測定可能な成果指標を組織全体で整合させる</td>
              </tr>
              <tr>
                <td>ITIL Maturity Model</td>
                <td>現在の成熟度を評価し、変革の出発点(Positioning)を客観的に把握する</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice">
          <div class="callout-title">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <p>「Start where you are」の原則を実務に落とし込む際、まずITIL Maturity Modelなどで現状を客観的に測定してから変革を計画すると、過剰投資や見当違いな施策を避けられます。</p>
        </div>

        <h3>ITIL and AI(Transformation観点)</h3>
        <p>AIはTransformationにおいても、変革準備・実行そのものを支援する手段として位置づけられます(AI Capability Modelの詳細は<a href="#ai-capability-model">第6章</a>を参照)。変革を主導する立場では、AI導入が「組織構造・役割・意思決定プロセス」にどう影響するかを評価し、ガバナンス層で適切な監督体制を設計することが求められます。</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.guide-layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height));
  background: var(--color-paper);
}

.sidebar-toggle {
  display: none;
}

.sidebar {
  position: sticky;
  top: var(--global-nav-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--global-nav-height));
  overflow-y: auto;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-border);
  padding: 32px 20px 40px;
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 0 8px;
}

.seal {
  flex: none;
  width: 36px;
  height: 36px;
}

.brand-text .brand-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  color: var(--color-ink);
  line-height: 1.3;
}

.brand-text .brand-subtitle {
  font-size: 13px;
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
  font-size: 15px;
  line-height: 1.4;
  text-decoration: none;
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
  padding: 48px 48px 80px;
  max-width: 900px;
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-indigo);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.3;
  margin: 0 0 16px;
}

.hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
  line-height: 1.6;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px 20px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: var(--color-ink-soft);
  margin-top: 4px;
  line-height: 1.4;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-radius: 8px;
  padding: 14px 18px;
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

section {
  margin-bottom: 56px;
  scroll-margin-top: calc(var(--global-nav-height) + 24px);
}

:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 24px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-indigo);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

h3 {
  font-size: 19px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 28px 0 12px;
}

h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 20px 0 8px;
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

li {
  margin-bottom: 6px;
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
}

.callout.note {
  background: var(--color-indigo-tint);
  border-color: var(--color-indigo);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 8px;
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.note .callout-title {
  color: var(--color-indigo);
}

.callout p:last-child {
  margin-bottom: 0;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
}

tr:last-child td {
  border-bottom: none;
}

.mermaid-wrap {
  margin: 28px 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
}

.diagram-caption {
  font-size: 13px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 12px;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-indigo);
    color: #fff;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    cursor: pointer;
    font-size: 24px;
  }

  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    width: 280px;
    height: calc(100vh - var(--global-nav-height));
    z-index: 90;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 80;
  }

  .main-content {
    padding: 32px 20px 60px;
  }
}
</style>
