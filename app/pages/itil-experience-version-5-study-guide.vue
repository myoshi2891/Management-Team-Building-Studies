<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL Experience (Version 5)® 認定資格 完全ガイド | PeopleCert Managing Professional",
  description: "PeopleCert ITIL Experience (Version 5) の出題範囲を、定義・理由・具体例・図解の順で初学者向けに解説する学習ガイド。",
});

const TOC_SECTIONS = [
  { id: "overview", label: "資格概要" },
  { id: "exam-overview", label: "試験概要" },
  { id: "foundations-refresh", label: "基礎概念の復習" },
  { id: "key-concepts", label: "Experienceの主要概念" },
  { id: "experience-framework", label: "体験のフレームワーク" },
  { id: "capturing-experience", label: "体験の捕捉" },
  { id: "service-journey", label: "サービスジャーニー" },
  { id: "itil-and-ai", label: "ITILとAI" },
  { id: "related-frameworks", label: "他フレームワークとの連携" },
  { id: "best-practices-summary", label: "ベストプラクティス総まとめ" },
  { id: "exam-tips", label: "試験対策のポイント" },
  { id: "glossary", label: "用語集" },
  { id: "references", label: "参考文献・ソース" },
] as const;

const activeId = useActiveHeading(TOC_SECTIONS.map((s) => s.id));

const DIAGRAM_PSLC = `flowchart LR
A["Discover"] --> B["Design"]
B --> C["Acquire"]
C --> D["Build"]
D --> E["Transition"]
E --> F["Operate"]
F --> G["Deliver"]
G --> H["Support"]
H -.->|"feedback"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G box;
class H done;`;

const DIAGRAM_STAKEHOLDER_TENSIONS = `flowchart TB
subgraph Consumer["Consumer-side stakeholders"]
U["User 実際にサービスを使う人"]
CU["Customer 要件を定義し成果に責任を持つ"]
CS["Customer Sponsor 予算承認・投資判断を行う"]
end
subgraph Provider["Provider-side stakeholders"]
AG["Agent サービスを実際に提供する担当者"]
PR["Principal 提供責任を最終的に負う"]
PS["Provider Sponsor 提供側の投資判断を行う"]
EN["Enabler 提供を技術的に支える"]
end
Consumer <-->|Tensions| Provider

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class U,CU,CS box;
class AG,PR,PS,EN hub;`;

const DIAGRAM_FOUR_DIMENSIONS = `flowchart TB
EXP["Experience 体験"]
D1["Organizations and People 役割・権限・スキル・文化"] --> EXP
D2["Information and Technology データ品質・UI/UX・AI活用"] --> EXP
D3["Partners and Suppliers 外部委託先の体験品質"] --> EXP
D4["Value Streams and Processes 手続きの摩擦・待ち時間"] --> EXP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class EXP hub;
class D1,D2,D3,D4 box;`;

const DIAGRAM_JOURNEY_ROLE_MAP = `flowchart LR
subgraph Journey["Product and Service Lifecycle across the journey"]
direction LR
S1["Discover"] --> S2["Design"] --> S3["Acquire"] --> S4["Build"] --> S5["Transition"] --> S6["Operate"] --> S7["Deliver"] --> S8["Support"]
end
U["User 使いやすさへの信頼"] -.-> S6
CU["Customer 成果達成への信頼"] -.-> S7
AG["Agent 現実的な運用可能性への信頼"] -.-> S6
PR["Principal 品質保証への信頼"] -.-> S8

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5 box;
class S6,S7 hub;
class S8 done;
class U,CU,AG,PR box;`;

const DIAGRAM_DATA_QUALITY_FLOW = `flowchart LR
P["Primary data"] --> QC["Data quality assessment"]
S["Secondary data"] --> QC
T["Tertiary data"] --> QC
QC --> TR["Trustworthiness"]
QC --> CO["Coherence"]
TR --> DEC["改善アクションの意思決定"]
CO --> DEC

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class P,S,T box;
class QC hub;
class TR,CO box;
class DEC done;`;

const DIAGRAM_SERVICE_JOURNEY7 = `flowchart LR
A["1. Explore 市場・ニーズを探る"] --> B["2. Engage 関係と信頼を構築する"]
B --> C["3. Offer 提供内容を提示し需要を言語化"]
C --> D["4. Agree 期待値を合意・正式化"]
D --> E["5. Onboard 移行し利用を開始する"]
E --> F["6. Co-create 日常利用で価値を共創"]
F --> G["7. Reflect 成果を振り返り改善する"]
G -.->|"次サイクルへ"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F box;
class G done;`;

const DIAGRAM_IMPROVEMENT_LOOP = `flowchart TB
N["Notice 体験シグナルに気づく"] --> I["Interpret シグナルを解釈する"]
I --> H["Hypothesize 改善仮説を立てる"]
H --> EX["Experiment 小さく試す"]
EX --> N

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class N hub;
class I,H,EX box;`;

const DIAGRAM_AI_CAPABILITY_MODEL = `flowchart TB
subgraph Model["ITIL AI Capability Model 6C"]
direction LR
C1["Creation コンテンツ・コード・文書の生成"]
C2["Curation 既存データの品質向上・重複排除"]
C3["Clarification 複雑な内容の要約・案内"]
C4["Cognition パターン検出・予兆分析"]
C5["Communication チャットボット等の自然な対話"]
C6["Coordination 複数アクションの自律的な統制・実行"]
end

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class C1,C2,C3,C4,C5,C6 box;`;
</script>

<template>
  <div class="layout">
    <nav class="sidebar" id="sidebar" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">ITIL Experience® 完全ガイド</div>
          <div class="brand-subtitle">PeopleCert Version 5</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li v-for="item in TOC_SECTIONS" :key="item.id">
          <a
            :href="`#${item.id}`"
            :class="{ active: activeId === item.id }"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          <span>PeopleCert ITIL (Version 5) &middot; Managing Professional</span>
        </div>
        <h1>ITIL® Experience (Version 5) 学習ガイド</h1>
        <p class="hero-lede">
          世界トップクラスのソフトウェアエンジニア兼スクラムマスターの視点から、初学者にもわかりやすいステップバイステップ形式で ITIL® Experience (Version 5) の出題範囲を解説します。各トピックは定義 → 理由 → 具体例 → 図解/表の順で構成し、実務で使えるベストプラクティスと根拠ソースを付記しています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">40問</div><div class="stat-label">出題数(各1点、減点方式なし)</div></div>
          <div class="stat-card"><div class="stat-number">90分</div><div class="stat-label">試験時間(非母国語は113分)</div></div>
          <div class="stat-card"><div class="stat-number">70%</div><div class="stat-label">合格基準(28/40問)</div></div>
          <div class="stat-card"><div class="stat-number">オープンブック</div><div class="stat-label">Official Book のみ持ち込み可</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは公開情報をもとに作成した非公式の学習補助資料です。PeopleCert International Limited の公式教材の代替にはなりません。最新の試験情報は必ず<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-experience-version-5-4177" target="_blank" rel="noopener">PeopleCert公式ページ</a>でご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 00. Overview ===================== -->
      <section id="overview" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 00</div>
        <h2>この試験は何か ── 全体像をつかむ</h2>

        <h3>0.1 定義</h3>
        <p><strong>ITIL® Experience (Version 5)</strong> は、PeopleCert が認定する ITIL (Version 5) 資格体系の中の <strong>Managing Professional (MP) ストリーム</strong> を構成するモジュール資格の1つです。公式ページの説明では、次のように位置づけられています。</p>
        <p><em>"ITIL Experience (Version 5) offers you the expertise you need to embed human-centered and AI-aware design across digital products and services."</em>(人間中心かつ AI を意識した設計を、デジタル製品・サービス全体に組み込む専門知識を提供する)</p>
        <p>つまりこの資格は、「サービスが機能的に正しく動くこと」だけでなく、<strong>「そのサービスを使う人がどう感じ、どう信頼し、どう価値を認識するか」</strong> をマネジメントする専門知識を認定するものです。</p>

        <h3>0.2 なぜこの資格が必要なのか(理由)</h3>
        <ul>
          <li>ITIL 4 までの ITSM フレームワークは「プロセスが正しく回っているか」に重点がありました。</li>
          <li>ITIL (Version 5) は <strong>Digital Product and Service Management (DPSM)</strong> へと軸足を移し、AI ネイティブ化・プロダクト中心思考とあわせて、<strong>Experience(体験)を独立した管理対象</strong> として初めて体系化しました。</li>
          <li>現代の SaaS・デジタルプロダクトでは、SLA を満たしていても「使いにくい」「信頼できない」と感じられれば解約・離反(チャーン)につながります。Experience を測定・改善できる人材が、Product Owner・Solutions Architect・Service Delivery Manager などの役割で高く評価されます。</li>
        </ul>

        <h3>0.3 対象者・前提資格・キャリアパス</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>対象者</td><td>デジタル製品・サービスを <strong>指揮・開発・提供</strong> する専門家。「機能的な成功だけでは不十分」と認識している人</td></tr>
              <tr><td>前提資格(必須)</td><td>次のいずれか1つ:(1)任意の ITIL 4 資格(Foundation 以上) / (2) ITIL Foundation (Version 5) / (3) ITIL Foundation Bridge (Version 5)</td></tr>
              <tr><td>学習形態要件</td><td>認定トレーニング機関(ATO)経由の研修、または ITIL Official eLearning の修了が必要(<strong>修了証明がないと結果が発表されない</strong>)</td></tr>
              <tr><td>代表的なキャリアパス</td><td>Experience Lead / Solutions Architect / Product Owner / Business Relationship Manager / Digital Transformation Manager / AI Governance Manager / Integration Manager / IT Director / Chief Digital Officer</td></tr>
              <tr><td>MP ストリームでの位置づけ</td><td>ITIL Experience / ITIL Product / ITIL Service / ITIL Transformation の4モジュールを揃えると ITIL Managing Professional の称号を取得できる</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>基礎を先に固める。</strong>ITIL Foundation (Version 5) をまだ取得していない場合は、先に ITIL VS・Four Dimensions・Guiding Principles・Product and Service Lifecycle などの基礎を固めてから本ガイドに進むこと。Experience の syllabus は Foundation の用語を前提に進みます。</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-experience-version-5-4177" target="_blank" rel="noopener">PeopleCert 公式製品ページ</a></li>
            <li><a href="https://www.oxfordcollegeoftechnology.com/itil-version-5/itil-experience-version-5/" target="_blank" rel="noopener">前提資格の詳細(Oxford College of Technology)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 01. Exam Overview ===================== -->
      <section id="exam-overview" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 01</div>
        <h2>試験概要(Exam Overview)</h2>

        <h3>1.1 試験形式</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>出題数</td><td>40問(各1点、減点方式なし)</td></tr>
              <tr><td>試験時間</td><td>90分(母国語・業務言語以外で受験する場合は25%延長=113分)</td></tr>
              <tr><td>出題形式</td><td>選択式(Objective Test Questions)</td></tr>
              <tr><td>合格基準</td><td>70%(28/40 問)※後述の注記を参照</td></tr>
              <tr><td>教材持ち込み</td><td><strong>オープンブック</strong>:ITIL® Experience (Version 5) Official Book のみ持ち込み可(書き込み可)。それ以外の教材は不可</td></tr>
              <tr><td>シナリオ</td><td><strong>ITIL Car Rental Scenario</strong>(レンタカー事業)を題材とする。最低1問は Scenario の "Experience" パートを参照する必要がある</td></tr>
              <tr><td>言語</td><td>英語・中国語・フランス語・イタリア語・ポーランド語・ポルトガル語(ブラジル)・スペイン語 など8言語</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p><strong>重要な注記(一次資料の透明性):</strong>2026年2月発行の公式シラバス(Version 5.0 PL=パイロット版)には、合格点・カテゴリ配点・Bloom's Level 配分がいずれも「TBC(To Be Confirmed)」と明記されています。一方で、現行の PeopleCert 公式製品ページでは合格ラインが 70% と明示されています。本ガイドは現行の製品ページの数値を採用しつつ、ベータ版シラバスの段階では数値が確定していなかった経緯を透明性のために残しています。受験直前は必ず PeopleCert 公式ページで最新の合格基準を確認してください。</p>
        </div>

        <h3>1.2 Bloom's Level(BL) ── 出題の「思考レベル」</h3>
        <p>ITIL (Version 5) の試験は、単純暗記だけでなく「理解」「応用」「分析」まで問う設計になっています。各設問には次の4段階の Bloom's Level(BL)が割り当てられます。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>BL</th><th>動詞の例</th><th>求められる思考</th></tr></thead>
            <tbody>
              <tr><td>BL1</td><td>Define / Identify</td><td>用語や概念を <strong>思い出す</strong>(再認・再生)</td></tr>
              <tr><td>BL2</td><td>Describe / Explain / Understand</td><td>概念を <strong>理解し説明できる</strong></td></tr>
              <tr><td>BL3</td><td>Apply</td><td>実際のシナリオに概念を <strong>適用できる</strong></td></tr>
              <tr><td>BL4</td><td>Analyse / Distinguish / Differentiate</td><td>情報を <strong>分析し、行動の妥当性を判断できる</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p>ITIL Experience の syllabus では BL1〜BL4 すべてが使用され、多くの Assessment Criteria が <strong>BL2(理解)</strong> を基礎として設計されています。BL3(適用)と BL4(分析)は「Stakeholder role mapping」「経験の摩擦点の分析」「継続的改善ループの適用」などピンポイントで登場します。</p>

        <h3>1.3 設問タイプ(4種類)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>タイプ</th><th>特徴</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td>設問文+選択肢4つから1つ選ぶ、最も一般的な形式</td></tr>
              <tr><td>Negative</td><td>Standard 問題の設問文が否定形("NOT" など)になったもの。<strong>「やってはいけないこと」を問う学習目標がある場合のみ</strong> 例外的に使用</td></tr>
              <tr><td>Missing word(s)</td><td>文中の空欄に当てはまる語句を4択から選ぶ</td></tr>
              <tr><td>List</td><td>4つの記述のうち <strong>正しいものを2つ</strong> 選ぶ(例:「1と2」「2と3」など組み合わせで解答)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>試験対策:</strong>List 形式は「2つとも正しい組み合わせ」を選ぶため、消去法よりも各記述を個別に○×判定してから組み合わせを絞り込む方が正答率が上がる。Negative 形式は問題文をよく読み、「NOT」「除く」などの否定語を見落とさないこと。</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.oxfordcollegeoftechnology.com/wp-content/uploads/2026/03/ITIL-Version-5-Experience-Syllabus.pdf" target="_blank" rel="noopener">公式シラバス PDF(Version 5.0 PL, February 2026)</a></li>
            <li><a href="https://torque-it.com/product/itil-experience-version-5-including-exam/" target="_blank" rel="noopener">合格ライン・受講対象者(Torque IT)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 02. Foundations Refresh ===================== -->
      <section id="foundations-refresh" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
        <h2>前提となる基礎概念のリフレッシュ(Syllabus Category 1.1)</h2>
        <p>Experience の syllabus は「Category 1: Key ITIL terms and definitions」の中で、Foundation で学ぶ以下5つの概念を土台として再確認することから始まります。すべて <strong>BL2(Explain/Describe/Understand)</strong>。</p>

        <h3>2.1 ITIL Guiding Principles(ITIL指導原則)</h3>
        <h4>定義</h4>
        <p>組織の状況によらず、あらゆる意思決定を導く7つの推奨事項。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>原則</th><th>一言でいうと</th></tr></thead>
            <tbody>
              <tr><td>Focus on value</td><td>すべての活動を価値創出に結びつける</td></tr>
              <tr><td>Start where you are</td><td>ゼロから作らず、既存の資産・データを評価する</td></tr>
              <tr><td>Progress iteratively with feedback</td><td>大きく作りすぎず、小さく作ってフィードバックを得る</td></tr>
              <tr><td>Collaborate and promote visibility</td><td>関係者を巻き込み、作業を可視化する</td></tr>
              <tr><td>Think and work holistically</td><td>部分最適ではなく全体最適で考える</td></tr>
              <tr><td>Keep it simple and practical</td><td>必要最小限で実用的な方法を選ぶ</td></tr>
              <tr><td>Optimize and automate</td><td>人手作業を最適化してから自動化する</td></tr>
            </tbody>
          </table>
        </div>
        <h4>Experience 文脈での理由</h4>
        <p>Experience management は「Start where you are(既存の体験データを評価する)」「Progress iteratively with feedback(小さく試して学ぶ)」と特に強く結びつきます。後述の <strong>notice–interpret–hypothesize–experiment ループ</strong>(6.4節)はこの2原則の具体的な実装形と言えます。</p>

        <h3>2.2 Product・Service・Digital Product/Service の定義</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>用語</th><th>定義</th></tr></thead>
            <tbody>
              <tr><td>Product</td><td>リソースを構成し、consumer に価値を提供できる状態にしたもの</td></tr>
              <tr><td>Service</td><td>consumer が特定のコストやリスクを自ら負担することなく、望む成果を得られるようにする手段</td></tr>
              <tr><td>Digital product / Digital service</td><td>デジタル技術を主たる価値提供手段とする product / service</td></tr>
            </tbody>
          </table>
        </div>

        <h3>2.3 ITIL Product and Service Lifecycle(8段階)</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <MermaidDiagram :chart="DIAGRAM_PSLC" />
          </div>
          <div class="diagram-caption">ITIL Product and Service Lifecycle の8活動(Discover〜Support)</div>
        </div>
        <p>ITIL 4 の Service Value Chain(6活動)を置き換える、より詳細な8活動モデル。Experience の文脈では、この8段階の <strong>どのステップでも "experience moments"(体験の瞬間)が発生しうる</strong> という前提が重要です(4.3節で詳述)。</p>

        <h3>2.4 ITIL Four Dimensions of Product and Service Management</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>次元</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>Organizations and people</td><td>組織構造・文化・スキル(Version 5 では "Organizations, people and AI" セクションを含む)</td></tr>
              <tr><td>Information and technology</td><td>情報管理・技術・<strong>ITIL AI Capability Model(6C)</strong>(7章で詳述)</td></tr>
              <tr><td>Partners and suppliers</td><td>パートナー・サプライヤーとの関係</td></tr>
              <tr><td>Value streams and processes</td><td>価値創出の一連の活動とプロセス</td></tr>
            </tbody>
          </table>
        </div>

        <h3>2.5 ITIL Value System(ITIL VS)</h3>
        <p>Guiding Principles・Governance・Product and Service Lifecycle・Practices・Continual Improvement を包含する、組織全体の価値創出システム全体像。</p>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://itsm.tools/itil-version-5-vs-itil-4-key-changes/" target="_blank" rel="noopener">ITIL (Version 5) の変更点まとめ(Four Dimensions・6Cモデル等)</a></li>
            <li><a href="https://certempire.com/itil-4-vs-itil-5/" target="_blank" rel="noopener">ITIL Version 5 vs ITIL 4 比較</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 03. Key Concepts ===================== -->
      <section id="key-concepts" tabindex="-1">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:brain" aria-hidden="true" />SECTION 03</div>
        <h2>Experience の主要概念(Syllabus Category 1.2) ── BL2</h2>

        <h3>3.1 「Experience(体験)」を人間の反応として定義する</h3>
        <h4>定義</h4>
        <p>ITIL (Version 5) における Experience とは、単なる「満足度」ではなく、<strong>anticipation(予期)・perception(知覚)・evaluation(評価)</strong> という3つのプロセスを通じて生まれる、<strong>feelings(感情)・thoughts(思考)・bodily states(身体的反応)</strong> の総体として定義されます。</p>
        <h4>なぜこの定義が重要か(理由)</h4>
        <ul>
          <li>「体験=アンケートの点数」という誤解を避けるため。ITIL は Experience を <strong>人間の内的反応そのもの</strong> として扱い、測定値(メトリクス)はその反応の一部を映す "仮説" にすぎないと位置づけます(5.1節で詳述)。</li>
          <li>この定義があるからこそ、後述の「Experience Capture は本質的に不完全である」という重要な考え方(5章)が導き出されます。</li>
        </ul>
        <h4>具体例</h4>
        <p>レンタカー予約アプリ(Car Rental Scenario)で、ユーザーが予約完了画面を見た瞬間:</p>
        <ul>
          <li><strong>Anticipation:</strong>予約前に「スムーズに終わるだろう」と期待していた</li>
          <li><strong>Perception:</strong>実際の画面の読み込み速度・UI のわかりやすさを知覚する</li>
          <li><strong>Evaluation:</strong>期待と実際を比較し、「思ったより早かった」「逆に不安になった」など評価が生まれる</li>
        </ul>
        <p>この一連の流れが Experience(体験)そのものであり、単一の CSAT スコアではその一部しか捉えられません。</p>

        <h3>3.2 Digital Experience と Digital Experience System</h3>
        <h4>定義</h4>
        <p>Digital experience(デジタル体験)とは、デジタル製品・サービスとのインタラクションに対する feelings・thoughts・bodily responses(身体反応)。これが積み重なって <strong>digital experience system</strong>(デジタル体験を生み出す一連の要素の集合)を構成します。</p>
        <h4>なぜ重要か</h4>
        <p>Trust(信頼)と Value(価値)は、機能要件の充足だけでは生まれません。ログイン画面の応答速度、通知のトーン、エラーメッセージの分かりやすさなど、<strong>一つひとつのデジタル接点の質の総和</strong> が信頼と価値co-creation(共創)を左右します。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>ベストプラクティス:</strong>デジタルプロダクトの UX 改善プロジェクトでは、機能要件(Functional Requirement)のチェックリストとは別に「Experience チェックリスト」(応答速度・トーン・エラー文言・通知頻度など)を用意し、Design レビューで両方を確認する。</li>
            <li><strong>アンチパターン:</strong>SLA・可用性などの機能指標のみをダッシュボードで追跡し、ユーザーの感情的反応を測る仕組みを一切持たない。</li>
          </ul>
        </div>

        <div class="callout source" data-variant="source" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.itil.com/Itil-News-and-Announcements/itil-version-5-experience-user-experience" target="_blank" rel="noopener">ITIL Experience の UX への焦点解説(itil.com)</a></li>
          </ul>
        </div>
      </section>

      <!-- ===================== 04. Experience Framework ===================== -->
      <section id="experience-framework">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 04</div>
        <h2>ITIL Experience(Syllabus Category 2) ── 体験のフレームワーク全体像</h2>
      </section>

      <!-- ===================== 05. Capturing Experience ===================== -->
      <section id="capturing-experience">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 05</div>
        <h2>Experience の捕捉(Capturing Experience)(Syllabus Category 3)</h2>
      </section>

      <!-- ===================== 06. Service Journey ===================== -->
      <section id="service-journey">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 06</div>
        <h2>サービスジャーニー(Service Journey)(Syllabus Category 4)</h2>
      </section>

      <!-- ===================== 07. ITIL and AI ===================== -->
      <section id="itil-and-ai">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:robot" aria-hidden="true" />SECTION 07</div>
        <h2>ITIL と AI(Syllabus Category 5)</h2>
      </section>

      <!-- ===================== 08. Related Frameworks ===================== -->
      <section id="related-frameworks">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 08</div>
        <h2>ITIL と他のフレームワーク(Syllabus Category 6)</h2>
      </section>

      <!-- ===================== 09. Best Practices Summary ===================== -->
      <section id="best-practices-summary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:table" aria-hidden="true" />SECTION 09</div>
        <h2>ベストプラクティス総まとめ表</h2>
      </section>

      <!-- ===================== 10. Exam Tips ===================== -->
      <section id="exam-tips">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 10</div>
        <h2>試験対策のポイント(まとめ)</h2>
      </section>

      <!-- ===================== 11. Glossary ===================== -->
      <section id="glossary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 11</div>
        <h2>用語集(Glossary)</h2>
      </section>

      <!-- ===================== 12. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 12</div>
        <h2>参考文献・ソース一覧</h2>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height, 0px));
  background: var(--color-paper, #F6F7F9);
  color: var(--color-ink, #161B26);
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: var(--global-nav-height, 0px);
  height: calc(100vh - var(--global-nav-height, 0px));
  overflow-y: auto;
  border-right: 1px solid var(--color-border, #DFE3EA);
  background: var(--color-paper-raised, #FFFFFF);
  padding: 24px 16px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border, #DFE3EA);
}

.seal {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-weight: 700;
  font-size: 15px;
  color: var(--color-ink, #161B26);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 12px;
  color: var(--color-ink-faint, #8A93A3);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-nav a {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-ink-soft, #4B5566);
  text-decoration: none;
  transition: all 0.15s ease;
  line-height: 1.4;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken, #EEF0F4);
  color: var(--color-ink, #161B26);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint, #EEF1F8);
  color: var(--color-indigo, #2E3F72);
  font-weight: 600;
}

.main-content {
  flex: 1;
  min-width: 0;
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border, #DFE3EA);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-gold, #B8802A);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

h1 {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-size: 32px;
  font-weight: 700;
  color: var(--color-ink, #161B26);
  line-height: 1.3;
  margin: 0 0 16px;
}

.hero-lede {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-ink-soft, #4B5566);
  margin-bottom: 24px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--color-paper-raised, #FFFFFF);
  border: 1px solid var(--color-border, #DFE3EA);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.stat-number {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-indigo, #2E3F72);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--color-ink-soft, #4B5566);
  line-height: 1.4;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--color-info-bg, #EEF1F8);
  border: 1px solid var(--color-info-border, #C7D1EA);
  color: var(--color-info-text, #2E3F72);
  border-radius: 8px;
  padding: 14px 18px;
  font-size: 13px;
  line-height: 1.6;
}

.disclaimer-box :deep(.iconify),
.disclaimer-box :deep(svg) {
  flex: none;
  font-size: 18px;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}

.disclaimer-box a {
  color: var(--color-indigo, #2E3F72);
  font-weight: 600;
  text-decoration: underline;
}

section {
  margin-bottom: 48px;
  scroll-margin-top: calc(var(--global-nav-height, 0px) + 24px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-gold, #B8802A);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-serif, "Source Serif 4", Georgia, serif);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink, #161B26);
  line-height: 1.4;
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border, #DFE3EA);
}

@media (max-width: 980px) {
  .layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid var(--color-border, #DFE3EA);
  }
}
</style>
