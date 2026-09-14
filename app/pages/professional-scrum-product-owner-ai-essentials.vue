<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "how-to-use",
  "exam-overview",
  "ai-theory-primer",
  "ai-security-ethics",
  "ai-product-ownership",
  "best-practices-summary",
  "exam-prep",
  "references",
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
  title: "PSPO-AI Essentials® 認定資格 完全ガイド | Professional Scrum Product Owner - AI Essentials 学習ガイド",
  description: "Scrum.org Professional Scrum Product Owner - AI Essentials認定資格の非公式学習ガイド。AI Theory and Primer、AI Security and Ethics、AI Product Ownershipの3カテゴリを初学者向けに解説します。",
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

const DIAGRAM_PSPO_RELATION = `flowchart LR
A["PSPO I 基礎"] --> B["PSPO II 応用"]
B --> C["PSPO III 卓越"]
A -.->|"AI適用を深掘り"| D["PSPO-AI Essentials"]
B -.->|"AI適用を深掘り"| D

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,C box;
class D hub;`;

const DIAGRAM_COURSE_SECTIONS = `flowchart TD
S1["Section1 Visionary"] --> S2["Section2 Customer Representative"]
S2 --> S3["Section3 Experimenter"]
S3 --> S4["Section4 Decision Maker"]
S4 --> S5["Section5 Collaborator and Influencer"]
S5 --> S6["Section6 Orchestrator"]
S6 --> S7["Section7 AI Theory Ethics Security"]
S7 -.->|"基礎知識として全体を支える"| S1

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6 box;
class S7 hub;`;

const DIAGRAM_AI_EVOLUTION = `flowchart LR
A["ルールベースAI 記号主義"] --> B["機械学習 Machine Learning"]
B --> C["深層学習 Deep Learning"]
C --> D["生成AI Generative AI"]
D --> E["エージェンティックAI Agentic AI"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;
class E done;`;

const DIAGRAM_AGENTIC_SEQUENCE = `sequenceDiagram
participant PO as Product Owner
participant Agent as AI Agent
participant PBL as Product Backlog
PO->>Agent: ユーザーフィードバックの収集と分析を依頼
Agent->>Agent: 繰り返し発生する課題パターンを特定
Agent->>PO: 課題パターンのサマリーを提示
PO->>Agent: ドラフトPBIの作成を依頼
Agent->>PBL: ドラフトPBIを追加
PO->>PBL: 内容を精査しOrderingを確定`;

const DIAGRAM_TOKENIZATION_FLOW = `flowchart LR
A["自然言語プロンプト"] --> B["トークン化 Tokenization"]
B --> C["モデル推論 LLM Inference"]
C --> D["次トークンの確率予測を繰り返す"]
D --> E["トークン列をデコード"]
E --> F["自然言語の出力"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F done;`;

const DIAGRAM_FOUR_D_FRAMEWORK = `flowchart LR
D1["Delegation 委任"] --> D2["Description 説明"]
D2 --> D3["Discernment 見極め"]
D3 --> D4["Diligence 責任"]
D4 -.->|"次のタスクへ活かす"| D1

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class D1,D2,D3 box;
class D4 hub;`;

const DIAGRAM_NIST_RMF = `flowchart TD
Gov["Govern 統治"] --> Map["Map リスクの特定"]
Map --> Meas["Measure 測定"]
Meas --> Man["Manage 管理"]
Man -.->|"継続的に見直す"| Gov

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Map,Meas,Man box;
class Gov hub;`;

const DIAGRAM_STANCES_WHEEL = `flowchart TD
V["価値の最大化 Value Maximization"]
V --> S1["The Visionary"]
V --> S2["The Customer Representative"]
V --> S3["The Experimenter"]
V --> S4["The Decision Maker"]
V --> S5["The Collaborator"]
V --> S6["The Influencer"]
V --> S7["The Orchestrator"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6,S7 box;
class V hub;`;

const DIAGRAM_CUSTOMER_FLOW = `flowchart LR
A["顧客インタビューデータ"] --> B["AIによる要約 分析"]
B --> C["ユーザーペルソナのドラフト"]
C --> D["チームでのレビューと検証"]
D --> E["確定したペルソナをディスカバリーに活用"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;
class E done;`;

const DIAGRAM_COLLABORATOR_FLOW = `flowchart TD
Meet["ステークホルダーとの対話 会議"] --> Trans["AIによる文字起こし"]
Trans --> Sum["要点とアクションアイテムの抽出"]
Sum --> Sent["感情分析によるトーンの把握"]
Sent --> Track["要望の分類 優先度付けとトラッキング"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Meet,Trans,Sum,Sent box;
class Track done;`;

const DIAGRAM_STUDY_PLAN = `flowchart TD
A["公式トレーニングを受講する"] --> B["Exam Codeを受領する"]
B --> C["本ガイドで3カテゴリを復習する"]
C --> D["Scrum GuideとEBM Guideを再読する"]
D --> E["自分の言葉で各スタンスのAI活用例を説明できるか確認する"]
E --> F["練習シナリオで自己チェックする"]
F --> G["14日以内を目安に受験する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F box;
class G done;`;
</script>

<template>
  <div class="page-wrapper">
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
      <span>目次</span>
    </button>

    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <nav
      id="guide-sidebar"
      class="sidebar"
      :class="{ 'is-open': sidebarOpen }"
      aria-label="ガイドの目次"
    >
      <div class="sidebar-header">
        <span class="sidebar-title">目次</span>
        <button
          type="button"
          class="sidebar-close"
          aria-label="目次を閉じる"
          @click="closeSidebar"
        >
          <Icon name="tabler:x" aria-hidden="true" />
        </button>
      </div>
      <ul class="toc-list">
        <li>
          <a
            href="#how-to-use"
            :class="{ active: activeId === 'how-to-use' || !activeId }"
            @click="closeSidebar"
          >このガイドの使い方</a>
        </li>
        <li>
          <a
            href="#exam-overview"
            :class="{ active: activeId === 'exam-overview' }"
            @click="closeSidebar"
          >第1部：認定試験の全体像</a>
        </li>
        <li>
          <a
            href="#ai-theory-primer"
            :class="{ active: activeId === 'ai-theory-primer' }"
            @click="closeSidebar"
          >第2部：AI Theory and Primer(AI理論の基礎)</a>
        </li>
        <li>
          <a
            href="#ai-security-ethics"
            :class="{ active: activeId === 'ai-security-ethics' }"
            @click="closeSidebar"
          >第3部：AI Security and Ethics(AIのセキュリティと倫理)</a>
        </li>
        <li>
          <a
            href="#ai-product-ownership"
            :class="{ active: activeId === 'ai-product-ownership' }"
            @click="closeSidebar"
          >第4部：AI Product Ownership(AIを活用したプロダクトオーナーシップ)</a>
        </li>
        <li>
          <a
            href="#best-practices-summary"
            :class="{ active: activeId === 'best-practices-summary' }"
            @click="closeSidebar"
          >第5部：ベストプラクティス総まとめ表</a>
        </li>
        <li>
          <a
            href="#exam-prep"
            :class="{ active: activeId === 'exam-prep' }"
            @click="closeSidebar"
          >第6部：試験対策とシナリオ思考トレーニング</a>
        </li>
        <li>
          <a
            href="#references"
            :class="{ active: activeId === 'references' }"
            @click="closeSidebar"
          >第7部：参考文献・公式ソース一覧</a>
        </li>
      </ul>
    </nav>

    <main class="content">
      <header class="hero">
        <div class="hero-eyebrow">
          <span class="badge badge-primary">Scrum.org</span>
          <span class="badge badge-secondary">AI Essentials</span>
        </div>
        <h1>Professional Scrum Product Owner™ - AI Essentials 完全学習ガイド</h1>
        <p class="hero-subtitle">
          AI時代のプロダクトオーナーシップを基礎から実践まで体系的に学ぶための非公式学習ガイド
        </p>
        <div class="hero-meta">
          <span class="meta-item"><Icon name="tabler:book" aria-hidden="true" />8セクション構成</span>
          <span class="meta-item"><Icon name="tabler:certificate" aria-hidden="true" />コース受講者限定認定</span>
          <span class="meta-item"><Icon name="tabler:clock" aria-hidden="true" />試験時間 30分・20問</span>
          <span class="meta-item"><Icon name="tabler:award" aria-hidden="true" />合格ライン 85%</span>
        </div>
        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは、Scrum.org™ の公式「Professional Scrum Product Owner™ - AI Essentials」認定試験および公式コース「Professional Scrum Product Owner™ - AI Essentials Training」の内容に基づく、非公式の日本語学習ガイドです。Scrum.org 公式の一次情報、関連書籍、関連フレームワーク(NIST AI RMF、EU AI Act、Anthropic 4D AI Fluency Frameworkなど)の公開情報を参照し、初学者が体系的に学べるよう構成しています。最新の公式情報は <a href="https://www.scrum.org/assessments/professional-scrum-product-owner-ai-essentials-certification" target="_blank" rel="noopener">Scrum.org 公式サイト</a> をご確認ください。</span>
        </div>
      </header>

      <article class="doc">
        <!-- Section 1 -->
        <section id="how-to-use">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 00</div>
          <h2>このガイドの使い方</h2>

          <p>PSPO-AI Essentials は、Scrum.org が発行する認定資格の中でもかなり特殊な位置づけです。他の多くの Scrum.org 認定(PSM I や PSPO I など)は誰でもオンラインで受験できますが、この資格は<strong>公式トレーニング「Professional Scrum Product Owner™ - AI Essentials Training」を受講した人だけ</strong>が受験できる、コース連動型(course-gated)の認定です。</p>

          <p>つまり本ガイドは、</p>

          <ul>
            <li>これから公式トレーニングの受講を検討している人が、事前に全体像をつかむため</li>
            <li>公式トレーニングを受講済みで、Exam Code を受け取った後に復習するため</li>
            <li>実務でAIをプロダクトオーナーシップに活かしたいが、体系的に整理された情報が欲しい人のため</li>
          </ul>

          <p>に構成しています。試験そのものは公式コースの受講が前提となるため、本ガイドを読むだけで受験できるわけではない点に注意してください。</p>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title"><Icon name="tabler:info-circle" aria-hidden="true" /><span data-testid="callout-label">補足</span></div>
            <ul>
              <li><strong>本ガイドの構成方針：</strong>ASCIIアートは一切使用せず、フローチャートはすべて Mermaid 記法で記述しています。</li>
              <li>比較・一覧情報はすべて Markdown の表で整理しています。</li>
              <li>英語の専門用語(Machine Learning, Generative AI, Agentic AI, LLM, Hallucination など)はあえて日本語に無理に置き換えず、そのまま併記しています。実務や試験でそのまま英語表記に出会うことが多いためです。</li>
            </ul>
          </div>
        </section>

        <!-- Section 2 -->
        <section id="exam-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 01</div>
          <h2>第1部：認定試験の全体像</h2>

          <p>Scrum.org は2024年秋、AIに関する2つの Essentials 認定を新設しました。1つはスクラムマスター向けの PSM-AI Essentials、もう1つが本ガイドが扱うプロダクトオーナー向けの <strong>PSPO-AI Essentials(Professional Scrum Product Owner™ - AI Essentials)</strong> です。</p>

          <h3>1.1 PSPO-AI Essentials とは何か</h3>
          <p>PSPO-AI Essentials は、「プロダクトオーナーがAIを日々の実務にどのように責任を持って取り入れ、プロダクト価値を最大化できるか」を証明する認定資格です。Scrum.org の公式発表によれば、単にプロンプトの書き方を学ぶ資格ではなく、<strong>AIをScrumフレームワークおよびプロダクトマネジメントの実践にどう統合するか</strong>に焦点を当てています。</p>

          <p>具体的には、次の3つの目的に沿ってAIを活用する力が問われます。</p>

          <ul>
            <li>プロダクトディスカバリー(Product Discovery)の強化</li>
            <li>顧客理解(Customer Understanding)の深化</li>
            <li>実験・検証(Experimentation)と意思決定の高速化</li>
          </ul>

          <p>これらすべてを「responsible and ethical manner(責任を持って、倫理的に)」行うことが強調されている点が、このAI Essentials系認定に共通する特徴です。</p>

          <h3>1.2 受験資格・前提条件</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>受験資格</td><td>Professional Scrum Product Owner™ - AI Essentials Training(公式トレーニング)の受講者のみ</td></tr>
                <tr><td>前提知識</td><td>事前のAI・データサイエンスの知識は不要(コース側の前提)</td></tr>
                <tr><td>受験権利の取得方法</td><td>コース受講後にScrum.orgからExam Codeが発行される</td></tr>
                <tr><td>受験回数</td><td>1回無料。Exam Codeは無期限に有効で、Exam Code受領から14日以内に受験して不合格だった場合は無料の再受験が1回付与される</td></tr>
                <tr><td>受験言語</td><td>英語のみ</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title"><Icon name="tabler:bulb" aria-hidden="true" /><span data-testid="callout-label">ベストプラクティス</span></div>
            <p>Exam Codeは無期限に有効ですが、無料の再受験権が付与されるのは「Exam Code受領から14日以内に受験して不合格だった場合」に限られます。学習のモチベーションが高いコース受講直後、できるだけ早いタイミングで受験する計画を立てるのが得策です。</p>
          </div>

          <h3>1.3 試験形式・出題範囲</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>出題形式</td><td>Multiple Choice(選択式)</td></tr>
                <tr><td>問題数</td><td>20問</td></tr>
                <tr><td>制限時間</td><td>30分</td></tr>
                <tr><td>合格ライン</td><td>85%以上(20問中17問以上の正答が目安)</td></tr>
                <tr><td>言語</td><td>英語</td></tr>
              </tbody>
            </table>
          </div>

          <p>出題は、次の3つのカテゴリに分類されています。この3カテゴリの構成そのものが、学習範囲を整理するうえで最も重要な地図になります。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>カテゴリ</th><th>概要</th></tr></thead>
              <tbody>
                <tr><td><strong>AI Theory and Primer</strong></td><td>AIの基礎知識。歴史、機械学習・深層学習・生成AI・エージェンティックAIの違い、LLMや拡散モデルの仕組み、プロンプトエンジニアリングとトークン化など</td></tr>
                <tr><td><strong>AI Security and Ethics</strong></td><td>責任あるAI利用、AIのリスク(バイアス・ハルシネーションなど)、データプライバシーとセキュリティ、AIに関する法規制の概観</td></tr>
                <tr><td><strong>AI Product Ownership</strong></td><td>プロダクトオーナーの各スタンス(Visionary, Customer Representative, Experimenter, Decision Maker, Collaborator & Influencer, Orchestrator)にAIをどう組み込むか</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" /><span data-testid="callout-label">ソース</span></div>
            <ul>
              <li><a href="https://www.scrum.org/assessments/professional-scrum-product-owner-ai-essentials-certification" target="_blank" rel="noopener">Scrum.org「Professional Scrum Product Owner™ - AI Essentials Certification」公式ページ</a></li>
            </ul>
          </div>

          <h3>1.4 PSPO I / II / III との違い・位置づけ</h3>
          <p>PSPO-AI Essentials は、PSPO I(基礎)・PSPO II(応用)・PSPO III(卓越)の縦のレベル系列とは別軸にある、<strong>横方向の専門特化(AI)系認定</strong>です。公式サイトでも「PSPO™ および PSPO-Advanced コースの上に積み上げる形で、プロダクトオーナーの各スタンスの中でAIをどう応用するかを掘り下げる」と説明されています。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PSPO_RELATION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
            <div class="diagram-caption">PSPO I/II/III とPSPO-AI Essentialsの位置づけ</div>
          </div>

          <p>同様の「AI Essentials」シリーズは、Scrum Master向けの PSM-AI Essentials も存在し、Product Owner版とほぼ同じ設計思想(3カテゴリ、course-gated、85%合格ライン)で作られています。</p>

          <h3>1.5 コースの7セクション構成</h3>
          <p>Scrum.org 公式ブログ(VLOGシリーズ)によれば、PSPO-AI Essentials のトレーニングは次の7つのセクションで構成されています。これは試験の「AI Product Ownership」カテゴリの土台であり、本ガイドの第4部もこの構成に沿って解説します。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>セクション</th><th>テーマ</th><th>学ぶこと(要約)</th></tr></thead>
              <tbody>
                <tr><td>Section 1</td><td>The Visionary Product Owner</td><td>AIでプロダクトビジョン・戦略・ロードマップを効果的に伝える。AIアバターの作成</td></tr>
                <tr><td>Section 2</td><td>The Customer Representative</td><td>AIで顧客の課題・痛み・機会を理解し、プロダクトディスカバリーを強化。ユーザーペルソナ作成の実習</td></tr>
                <tr><td>Section 3</td><td>The Experimenter</td><td>AIでアイデアをブレインストーミングし、検証可能な仮説を立てる。モックアップ生成の実習</td></tr>
                <tr><td>Section 4</td><td>The Decision Maker</td><td>AIを知識豊富なアシスタントとして、プロダクトバックログ管理の意思決定を高度化</td></tr>
                <tr><td>Section 5</td><td>The Collaborator & Influencer</td><td>AIで顧客インタビューの質を高め、会議の文字起こし・要点抽出・感情分析を行う。ステークホルダー要望管理アプリの実習</td></tr>
                <tr><td>Section 6</td><td>The Orchestrator</td><td>AIツールの基礎知識を広げ、状況に応じて最適なツールを選定・設定する。AIエージェント構築の実習</td></tr>
                <tr><td>Section 7</td><td>AI Theory, Ethics, and Security</td><td>AIの歴史、ANI/生成AI/AGIなどの分類、LLMや拡散モデルの理解、モデルの学習方法、プロンプトエンジニアリングとトークン化</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title"><Icon name="tabler:external-link" aria-hidden="true" /><span data-testid="callout-label">ソース</span></div>
            <ul>
              <li><a href="https://www.scrum.org/resources/blog/vlog-why-what-pspo-ai-essentials-course-explained" target="_blank" rel="noopener">Scrum.org Blog「[VLOG] The Why and What of the PSPO-AI Essentials Course, Explained」</a></li>
            </ul>
          </div>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_COURSE_SECTIONS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
            <div class="diagram-caption">PSPO-AI Essentialsコースの7セクション構成</div>
          </div>
        </section>

        <!-- Section 3 (Placeholder for Step 3) -->
        <section id="ai-theory-primer">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 02</div>
          <h2>第2部：AI Theory and Primer(AI理論の基礎)</h2>
          <h3>2.1 AIの全体像と歴史のポイント</h3>
          <h3>2.2 AIの分類：ANI・AGI・ASI</h3>
          <h3>2.3 機械学習(Machine Learning)の基礎</h3>
          <h3>2.4 深層学習(Deep Learning)とニューラルネットワーク</h3>
          <h3>2.5 生成AI(Generative AI)の仕組み</h3>
          <h3>2.6 エージェンティックAI(Agentic AI)とは</h3>
          <h3>2.7 プロンプトエンジニアリングとトークン化(Tokenization)</h3>
          <h3>2.8 効果的なプロンプトのベストプラクティス</h3>
        </section>

        <!-- Section 4 (Placeholder for Step 4) -->
        <section id="ai-security-ethics">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 03</div>
          <h2>第3部：AI Security and Ethics(AIのセキュリティと倫理)</h2>
          <h3>3.1 Responsible AI(責任あるAI)の基本姿勢</h3>
          <h3>3.2 4D AI Fluency Framework(AI流暢性の4Dフレームワーク)</h3>
          <h3>3.3 ハルシネーション(Hallucination)とバイアス(Bias)</h3>
          <h3>3.4 データプライバシーとセキュリティ</h3>
          <h3>3.5 4つのガードレール(Ethical AI for Product Owners)</h3>
          <h3>3.6 規制・法令の概観</h3>
          <h3>3.7 プロダクトオーナーの説明責任(Accountability)</h3>
        </section>

        <!-- Section 5 (Placeholder for Step 5) -->
        <section id="ai-product-ownership">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 04</div>
          <h2>第4部：AI Product Ownership(AIを活用したプロダクトオーナーシップ)</h2>
          <h3>4.1 The Visionary(ビジョナリー)× AI</h3>
          <h3>4.2 The Customer Representative(顧客代表)× AI</h3>
          <h3>4.3 The Experimenter(実験者)× AI</h3>
          <h3>4.4 The Decision Maker(意思決定者)× AI</h3>
          <h3>4.5 The Collaborator & Influencer(協働者・インフルエンサー)× AI</h3>
          <h3>4.6 The Orchestrator(オーケストレーター)— AI時代の新スタンス</h3>
          <h3>4.7 誤解されたスタンスとAI利用の落とし穴</h3>
        </section>

        <!-- Section 6 (Placeholder for Step 6) -->
        <section id="best-practices-summary">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 05</div>
          <h2>第5部：ベストプラクティス総まとめ表</h2>
        </section>

        <!-- Section 7 (Placeholder for Step 6) -->
        <section id="exam-prep">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 06</div>
          <h2>第6部：試験対策とシナリオ思考トレーニング</h2>
          <h3>6.1 学習の進め方</h3>
          <h3>6.2 出題されやすい思考パターン</h3>
          <h3>6.3 練習シナリオ例(自作・非公式)</h3>
        </section>

        <!-- Section 8 (Placeholder for Step 6) -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow">SECTION 07</div>
          <h2>第7部：参考文献・公式ソース一覧</h2>
          <h4>Scrum.org 公式ページ(PSPO-AI Essentials 関連)</h4>
          <h4>Product Owner スタンス関連(Scrum.org)</h4>
          <h4>Scrumの一次情報</h4>
          <h4>AI理論・倫理・フレームワーク関連</h4>
          <h4>補足：コースパートナーによる紹介ページ(ツール例・学習目標の参照用)</h4>
        </section>
      </article>
    </main>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  min-height: 100vh;
  background: var(--color-bg, #f8fafc);
  color: var(--color-ink, #0f172a);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: var(--color-indigo, #3b82f6);
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--color-surface, #ffffff);
  border-right: 1px solid var(--color-border, #e2e8f0);
  position: sticky;
  top: var(--global-nav-height, 64px);
  height: calc(100vh - var(--global-nav-height, 64px));
  overflow-y: auto;
  padding: 24px 16px;
}

.sidebar-header {
  display: none;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink, #0f172a);
}

.sidebar-close {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--color-ink-muted, #64748b);
  cursor: pointer;
  padding: 4px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 6px;
}

.toc-list a {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--color-ink-muted, #64748b);
  font-size: 13px;
  line-height: 1.5;
  text-decoration: none;
  transition: all 0.15s ease;
}

.toc-list a:hover {
  color: var(--color-indigo, #3b82f6);
  background: var(--color-indigo-subtle, #eff6ff);
}

.toc-list a.active {
  color: var(--color-indigo, #3b82f6);
  background: var(--color-indigo-subtle, #eff6ff);
  font-weight: 600;
}

.content {
  flex: 1;
  min-width: 0;
  padding: 32px 48px 64px;
  max-width: 960px;
  margin: 0 auto;
}

.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.hero-eyebrow {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-primary {
  background: #2e3f72;
  color: #ffffff;
}

.badge-secondary {
  background: #eef1f8;
  color: #2e3f72;
}

h1 {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--color-ink, #0f172a);
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-ink-muted, #475569);
  margin-bottom: 24px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-ink-muted, #64748b);
  background: var(--color-surface, #ffffff);
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-border, #e2e8f0);
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid var(--color-info-border, #bfdbfe);
  background: var(--color-info-bg, #eff6ff);
  color: var(--color-info-text, #1e40af);
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

.disclaimer-box a {
  color: inherit;
  text-decoration: underline;
}

.doc section {
  margin-bottom: 64px;
}

.section-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #2e3f72;
  margin-bottom: 8px;
}

:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height, 64px) + 32px);
  color: var(--color-ink, #0f172a);
}

h2 {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #2e3f72;
}

h3 {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  margin: 32px 0 16px;
}

h4 {
  font-size: 15px;
  font-weight: 600;
  margin: 24px 0 12px;
}

p {
  font-size: 15px;
  line-height: 1.75;
  margin-bottom: 16px;
  color: var(--color-ink, #1e293b);
}

.doc ul:not(.toc-list) {
  margin: 0 0 20px;
  padding-left: 24px;
  list-style-type: disc;
}

.doc ul:not(.toc-list) li {
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 6px;
  color: var(--color-ink, #1e293b);
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 8px;
  background: var(--color-surface, #ffffff);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

th {
  background: #eef1f8;
  color: #2e3f72;
  font-weight: 700;
  white-space: nowrap;
}

tbody tr:last-child td {
  border-bottom: none;
}

.callout {
  border-radius: 8px;
  padding: 16px 20px;
  margin: 24px 0;
  font-size: 14px;
  line-height: 1.65;
}

.callout.note {
  background: #f1f5f9;
  border-left: 4px solid #64748b;
  color: #334155;
}

.callout.practice {
  background: #ecfdf5;
  border-left: 4px solid #10b981;
  color: #065f46;
}

.callout.source {
  background: #fefce8;
  border-left: 4px solid #eab308;
  color: #854d0e;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
}

.callout-title :deep(.iconify),
.callout-title :deep(svg) {
  font-size: 18px;
}

.callout p:last-child,
.callout ul:last-child {
  margin-bottom: 0;
}

.mermaid-wrap {
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 8px;
  background: var(--color-surface, #ffffff);
  padding: 20px;
  margin: 24px 0;
  overflow-x: auto;
}

.diagram-caption {
  text-align: center;
  font-size: 13px;
  color: var(--color-ink-muted, #64748b);
  margin-top: 12px;
  font-weight: 500;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: inline-flex;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    height: 100vh;
    z-index: 100;
    transition: left 0.3s ease;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }

  .sidebar.is-open {
    left: 0;
  }

  .sidebar-header {
    display: flex;
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }

  .content {
    padding: 24px 20px 64px;
  }
}
</style>
