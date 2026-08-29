<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "introduction",
  "author-overview",
  "organizations",
  "tools",
  "approaches",
  "culture",
  "careers",
  "starter-checklist",
  "industry-reception",
  "conclusion",
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
  title: "An Elegant Puzzle 完全ガイド | エンジニアリングマネジメントの体系的入門",
  description:
    "Will Larson著『An Elegant Puzzle: Systems of Engineering Management』を初学者向けに解説。チームサイジング、4つの状態、ビジョンと戦略、マイグレーション、リオルグなど主要フレームワークをMermaid図とともに紹介。",
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
  pie1: "#C7D1EA",
  pie2: "#AEDBD6",
  pie3: "#F0D9A6",
  pie4: "#E7C0D0",
  pieOpacity: "1",
  pieStrokeColor: "#FFFFFF",
  pieStrokeWidth: "2px",
  pieOuterStrokeWidth: "1px",
  pieOuterStrokeColor: "#DFE3EA",
  pieSectionTextColor: "#161B26",
  pieLegendTextColor: "#161B26",
  pieTitleTextColor: "#161B26",
};

const DIAGRAM_BOOK_STRUCTURE = `flowchart TB
    A["序章 Introduction"] --> B["第1部 組織 Organizations"]
    B --> C["第2部 道具箱 Tools"]
    C --> D["第3部 アプローチ Approaches"]
    D --> E["第4部 文化 Culture"]
    E --> F["第5部 キャリア Careers"]
    F --> G["付録 Appendix"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`;

const DIAGRAM_TEAM_STATES = `flowchart LR
    FB["① Falling Behind バックログが毎週増え続ける"] -->|人を増員する| TW["② Treading Water 重要業務はこなせるが技術的負債は減らない"]
    TW -->|同時進行案件を減らす| RD["③ Repaying Debt 負債返済が雪だるま式に加速する"]
    RD -->|時間を守り抜く| IN["④ Innovating 負債は低水準、士気も高い"]
    IN -.->|油断すると逆戻り| RD
    RD -.->|油断すると逆戻り| TW
    TW -.->|油断すると逆戻り| FB

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class FB box;
    class TW hub;
    class RD hub;
    class IN done;`;

const DIAGRAM_STRATEGY_VISION = `flowchart TB
    A["デザインドキュメントを5本程度書く"] --> B["共通するテーマを抽出する"]
    B --> C["1つのエンジニアリング戦略・特定課題への具体策"]
    C --> D["戦略を5本程度書く"]
    D --> E["2〜3年先の帰結を外挿・予測する"]
    E --> F["1つのエンジニアリングビジョン・組織全体の方向性"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,D,E box;
    class C hub;
    class F done;`;

const DIAGRAM_REORG_STEPS = `flowchart TB
    S1["① 組織変更が本当に必要かを検証する"] --> S2["② 1年後の人員規模を見積もる"]
    S2 --> S3["③ マネジメント比率の目標を設定する"]
    S3 --> S4["④ 論理的なチーム・グループを特定する"]
    S4 --> S5["⑤ チームへの人員配置を計画する"]
    S5 --> S6["⑥ 実行することにコミットする"]
    S6 --> S7["⑦ 新しい組織構造をロールアウトする"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5,S6 box;
    class S7 done;`;

const DIAGRAM_HIRING_FUNNEL = `flowchart LR
    A["ソーシング 候補者を見つける"] --> B["スクリーニング"]
    B --> C["面接ループ"]
    C --> D["デブリーフ・意思決定"]
    D --> E["オファー"]
    E --> F["オンボーディング"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E box;
    class F done;`;
</script>

<template>
  <div class="guide-container">
    <a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>

    <button
      id="sidebarToggle"
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">An Elegant Puzzle 完全ガイド</div>
          <div class="brand-subtitle">エンジニアリングマネジメント入門</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a href="#introduction" :class="{ active: activeId === 'introduction' }" @click="closeSidebar"><Icon name="tabler:info-circle" />はじめに</a></li>
        <li><a href="#author-overview" :class="{ active: activeId === 'author-overview' }" @click="closeSidebar"><Icon name="tabler:user" />著者と本の全体像</a></li>
        <li><a href="#organizations" :class="{ active: activeId === 'organizations' }" @click="closeSidebar"><Icon name="tabler:building-bank" />第1部: 組織設計</a></li>
        <li><a href="#tools" :class="{ active: activeId === 'tools' }" @click="closeSidebar"><Icon name="tabler:tools" />第2部: マネジメントの道具箱</a></li>
        <li><a href="#approaches" :class="{ active: activeId === 'approaches' }" @click="closeSidebar"><Icon name="tabler:route" />第3部: アプローチ</a></li>
        <li><a href="#culture" :class="{ active: activeId === 'culture' }" @click="closeSidebar"><Icon name="tabler:heart" />第4部: 文化</a></li>
        <li><a href="#careers" :class="{ active: activeId === 'careers' }" @click="closeSidebar"><Icon name="tabler:briefcase" />第5部: キャリア</a></li>
        <li><a href="#starter-checklist" :class="{ active: activeId === 'starter-checklist' }" @click="closeSidebar"><Icon name="tabler:checklist" />実践チェックリスト</a></li>
        <li><a href="#industry-reception" :class="{ active: activeId === 'industry-reception' }" @click="closeSidebar"><Icon name="tabler:star" />業界での評価</a></li>
        <li><a href="#conclusion" :class="{ active: activeId === 'conclusion' }" @click="closeSidebar"><Icon name="tabler:flag-3" />まとめ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" />参考文献・情報源</a></li>
      </ul>
    </nav>

    <main id="main-content" class="main-content" tabindex="-1">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" />Stripe Press刊 エンジニアリングマネジメント名著</div>
        <h1>An Elegant Puzzle: Systems of Engineering Management 徹底解説ガイド</h1>
        <p class="hero-lede">
          Will Larson 著『An Elegant Puzzle: Systems of Engineering Management』(Stripe Press, 2019)を、初めてエンジニアリングマネジメント(EM)に触れる人でも理解できるよう、ステップバイステップのベストプラクティスとして再構成した解説ガイドです。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">2019年</div><div class="stat-label">Stripe Press より刊行</div></div>
          <div class="stat-card"><div class="stat-number">5部構成</div><div class="stat-label">組織・道具箱・アプローチ・文化・キャリア</div></div>
          <div class="stat-card"><div class="stat-number">4つの状態</div><div class="stat-label">チームの健全性を診断するフレームワーク</div></div>
          <div class="stat-card"><div class="stat-number">19件</div><div class="stat-label">参考情報源のURLを掲載</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          <span>本ガイドは書籍の内容を独自に要約・解説した非公式の学習支援資料です。書籍そのものではありません。正確な内容は必ず<a href="https://press.stripe.com/an-elegant-puzzle" target="_blank" rel="noopener">出版元(Stripe Press)公式ページ</a>および原著でご確認ください。</span>
        </div>
      </div>

      <section id="introduction">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:info-circle" />SECTION 01</div>
        <h2>はじめに</h2>

        <p>「人は会社を辞めるのではなく、上司(マネージャー)を辞める」という格言があります。エンジニアリングマネジメントは多くの組織にとって死活的に重要でありながら、体系立てて学ぶ機会が少なく、多くの場合は自己流・独学で身につけるしかない分野です。</p>
        <p>Will Larson の『An Elegant Puzzle』は、この状況に対して「エンジニアリング的な思考法」で挑んだ一冊です。著者はソフトウェアエンジニアとしてのバックグラウンドを活かし、マネジメントの難問を感情論やスローガンではなく、<strong>システム思考・メトリクス・具体的なフレームワーク</strong>で解きほぐしていきます。副題の「Systems of Engineering Management」が示す通り、この本の核心は「個々の解決策」よりも「問題を捉えるための仕組み(システム)」にあります。</p>
        <p>本書はもともと著者のブログ「Irrational Exuberance」(lethain.com)に投稿された記事群を土台に再構成されたもので、各トピックが独立した「パズル」として提示されているのが特徴です。目次順に読み進める必要はなく、今直面している課題に応じて必要な章から読むことができます。</p>
      </section>

      <section id="author-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:user" />SECTION 02</div>
        <h2>著者と本の全体像</h2>

        <p>Will Larson は Yahoo、Digg、Uber、Stripe、Calm、Carta でエンジニアリングリーダー・CTO としてキャリアを積み、現在は Imprint の CTO を務めています。日本の JET プログラムで英語教師として1年間過ごした経験もあります。本書のほかに『Staff Engineer: Leadership Beyond the Management Track』や『The Engineering Executive's Primer』、『Crafting Engineering Strategy』なども執筆しています。</p>
        <p>本書は大きく5つのセクション(<strong>組織 / 道具箱 / アプローチ / 文化 / キャリア</strong>)と、参考資料をまとめた付録から構成されています。</p>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_BOOK_STRUCTURE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">本書全体の構成</div>
        </div>
        <p>各章の位置づけを簡単に整理すると、以下のようになります。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>セクション</th>
                <th>扱うテーマ</th>
                <th>こんな時に読む</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>組織(Organizations)</td><td>チームの規模設計、チームの健全性診断、後継者計画</td><td>「そもそも組織の形をどう作るか」を考える時</td></tr>
              <tr><td>道具箱(Tools)</td><td>システム思考、ビジョン / 戦略、メトリクス、マイグレーション、リオルグ</td><td>具体的な意思決定・実行のための「型」が欲しい時</td></tr>
              <tr><td>アプローチ(Approaches)</td><td>急成長企業への適応、権限を超えた影響力の発揮</td><td>権限がない中でどう変化を起こすか悩んでいる時</td></tr>
              <tr><td>文化(Culture)</td><td>インクルーシブな文化づくり、ヒーローカルチャーの弊害</td><td>チームの空気や価値観を変えたい時</td></tr>
              <tr><td>キャリア(Careers)</td><td>採用、面接設計、パフォーマンス評価、キャリアラダー</td><td>採用や評価制度を設計・改善したい時</td></tr>
            </tbody>
          </table>
        </div>
        <p>なお、Stripe Press の公式サイトでもこの本は「サイジング(チームの規模設定)から技術的負債の扱い方、後継者計画まで、エンジニアリングマネジメント特有の課題を扱うガイド」と紹介されています。</p>
      </section>

      <section id="organizations">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 03</div>
        <h2>第1部: 組織設計(Organizations)</h2>

        <h3>1-1. チームの適正規模を決める</h3>
        <p>組織設計における最初の、そして最も基本的な問い、それが「チームの規模をどう決めるか」です。Larson は経験則として、以下のような目安を提示しています。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>役割</th>
                <th>推奨される規模</th>
                <th>理由・補足</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>マネージャーが直接支援するエンジニア数</td><td>6〜8人</td><td>コーチング・調整・戦略立案に十分な時間を確保できる規模</td></tr>
              <tr><td>マネージャー支援下エンジニアが4人未満</td><td>Tech Lead Manager(TLM)化しやすい</td><td>設計・実装業務も抱えることになり、マネージャーとしてのキャリア形成が難しくなりがち</td></tr>
              <tr><td>マネージャー支援下エンジニアが8〜9人超</td><td>「コーチ」役に近づく</td><td>問題対応で手一杯になり、チームへの積極的な投資ができなくなる</td></tr>
              <tr><td>マネージャー・オブ・マネージャーが支援するマネージャー数</td><td>4〜6人</td><td>ステークホルダー調整と組織投資の両立が可能な規模</td></tr>
              <tr><td>オンコール(当番制の障害対応)に必要な人数</td><td>8人前後</td><td>2層構成・24時間365日体制を無理なく維持するための目安</td></tr>
              <tr><td>チームとして機能する最小人数</td><td>4人未満は「チーム」として扱わない</td><td>個人の入れ替わりの影響が大きすぎ、抽象化(=個人差を吸収する仕組み)が機能しない</td></tr>
            </tbody>
          </table>
        </div>
        <p>新しいチームを作る際の具体的な「型」も紹介されています。</p>
        <ol class="step-list">
          <li>
            <div class="step-num">1</div>
            <div class="step-body">
              <div class="step-desc">既存チームを 8〜10人まで拡大する</div>
            </div>
          </li>
          <li>
            <div class="step-num">2</div>
            <div class="step-body">
              <div class="step-desc">そこから 4〜5人ずつの2チームに「分裂(bud)」させる</div>
            </div>
          </li>
          <li>
            <div class="step-num">3</div>
            <div class="step-body">
              <div class="step-desc">空っぽの状態からいきなり新チームを作らない</div>
            </div>
          </li>
          <li>
            <div class="step-num">4</div>
            <div class="step-body">
              <div class="step-desc">マネージャーに8人を超える人数を任せっぱなしにしない</div>
            </div>
          </li>
        </ol>
        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:info-circle" /><span data-testid="callout-label">補足</span></div>
          <p><strong>初学者向けポイント</strong>: この数字はあくまで「ガイドライン」であり「絶対のルール」ではありません。重要なのは、チームの規模が個人ではなく仕組みとして機能するかどうかを常に問い直す姿勢です。</p>
        </div>
        <h3>1-2. チームの「4つの状態」を見極める</h3>
        <p>本書で最も広く引用されているフレームワークの一つが、この「チームの4つの状態」です。ブログ記事「Staying on the path to high-performing teams」でも詳しく展開されています。</p>
        <p>チームは常に、以下の4つの状態のいずれかに位置していると考えます。</p>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_TEAM_STATES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">チームの4つの状態とその移り変わり</div>
        </div>
        <p>それぞれの状態の見分け方と、有効な打ち手(システムとしての解決策)を整理すると次のようになります。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>状態</th>
                <th>見分け方(兆候)</th>
                <th>システムとしての解決策</th>
                <th>マネージャーの戦術的サポート</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>① Falling Behind(後手に回っている)</td><td>毎週バックログが増える。懸命に働いても進捗が乏しい。士気が低い</td><td>増員し、②の状態まで引き上げる</td><td>ユーザーへの期待値調整、小さな成功体験(クイックウィン)の演出</td></tr>
              <tr><td>② Treading Water(現状維持)</td><td>重要業務はこなせるが、技術的負債の返済や新規プロジェクトに手が回らない</td><td>同時並行の作業数(WIP)を減らし、1つずつ完了させる</td><td>個人視点ではなくチーム視点での生産性の可視化</td></tr>
              <tr><td>③ Repaying Debt(負債返済中)</td><td>技術的負債の返済が進み始め、返済すればするほど余力が生まれる「複利」的な効果が出始める</td><td>とにかく時間を守り抜き、途中で中断させない</td><td>ユーザーに対し「表からは見えにくい価値」を粘り強く説明する</td></tr>
              <tr><td>④ Innovating(革新的)</td><td>技術的負債が持続可能な低水準。士気が高く、大半の仕事が新しいユーザーニーズに向いている</td><td>スケジュールに十分な「スラック(余白)」を確保し、品質を保つ</td><td>この状態は「神聖」なもの。安易に解体・異動させない</td></tr>
            </tbody>
          </table>
        </div>
        <p>重要な原則は次の2つです。</p>
        <ul>
          <li><strong>チームは放っておくと「エントロピー」によって後退する</strong>: ④から③、③から②…という逆戻りは自然に起きるため、意図的なマネジメントが必要です。</li>
          <li><strong>各状態には対応する「システムの処方箋」がただ一つ存在し、それを飛ばしていきなり戦術的支援に走ると疲弊するだけで報われない</strong>、と Larson は強調しています。</li>
        </ul>
        <p>なお、高いパフォーマンスを発揮しているチームを安易に解体(人員の入れ替えや異動)することは、チームの「再結成コスト」を招くため、著者は強く注意を促しています。新規採用者は「革新中」のチームではなく、技術的負債を抱えたチームに配属する方が、既存の高パフォーマンスチームを壊さずに済むという考え方も紹介されています。</p>
        <h3>1-3. トップダウン最適化への警鐘</h3>
        <p>組織全体を一つの視点から完璧に最適化しようとする「トップダウン最適化」には限界がある、というのがこの章の主張です。局所的な最適化(各チームが自分たちの状況に応じて意思決定すること)を尊重しつつ、全体としての整合性を取る難しさとその向き合い方が論じられています。</p>
        <h3>1-4. ハイパーグロース下の生産性</h3>
        <p>急成長期の組織では「人を増やせば増やすほど速くなる」という直感が裏切られがちです。新しい人を受け入れる教育コストや、既存メンバーの調整コストが増えることで、採用の限界効用(追加1人あたりの価値)は次第に逓減します。そのため、急成長期には「急拡大の期間」と「定着・チームの一体化(gelling)を待つ期間」を意図的に交互に設けることが推奨されています。</p>
        <h3>1-5. 組織のリスクをどこに置くか</h3>
        <p>組織にはどうしても「弱い部分・技術的負債・機能不全のチーム」といったリスクが生まれます。それをどこに、どのように配置し、可視化し、管理するかという視点が扱われます。リスクを見えない場所に押し込めるのではなく、意図的にオーナーシップを割り当てることが重要だとされています。</p>
        <h3>1-6. 後継者計画(サクセッションプランニング)</h3>
        <p>マネージャー自身が次のポジションに進む、あるいは離脱する際に、チームや組織が機能し続けられるようにする「後継者計画」も扱われます。委譲(デリゲーション)を通じて自分の業務を棚卸しし、それをメンバーの成長機会として提供していくという考え方です。自分のチームだけでなく、同じレベルの同僚(ピア)を支援する視点への移行も、上位の役割へ進むうえで欠かせないとされています。</p>
      </section>

      <section id="tools">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:tools" />SECTION 04</div>
        <h2>第2部: マネジメントの道具箱(Tools)</h2>

        <h3>2-1. すべての土台となる「システム思考」</h3>
        <p>Larson 自身が「本書の真の中心」と位置づけているのが、この「システム思考(Systems Thinking)」の章です。個々の事象を単発の問題として捉えるのではなく、<strong>状態・制約・フロー・フィードバックループ</strong>の集合として捉える視点が、本書全体を貫く思考の軸になっています。</p>
        <p>分散システムの設計に慣れたエンジニアであれば、この視点は直感的に理解しやすいはずです。「なぜこの施策は繰り返し失敗するのか」を個人の能力の問題として片づけるのではなく、「どのフィードバックループが機能不全を起こしているのか」という観点で捉え直すのが、本書に通底するアプローチです。</p>
        <h3>2-2. ビジョンと戦略を書き分ける</h3>
        <p>多くの組織が「エンジニアリング戦略」や「エンジニアリングビジョン」を書くことに苦手意識を持っています。Larson はこれを、驚くほどシンプルな「型」に落とし込んでいます。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>項目</th>
                <th>戦略(Strategy)</th>
                <th>ビジョン(Vision)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>目的</td><td>特定の課題に対して、トレードオフと取るべき行動を明確にする、地に足のついた文書</td><td>直接連携しない人同士でも噛み合った意思決定ができるようにする、志向性の高い文書</td></tr>
              <tr><td>作り方</td><td>複数(5本程度)の設計文書(デザインドキュメント)を書き、その共通点を抽出する</td><td>複数(5本程度)の戦略を書き、その示唆を2〜3年先まで外挿(予測)する</td></tr>
              <tr><td>適した粒度</td><td>個別の技術課題(レイテンシ管理、コスト管理、他チームとの連携方法など)</td><td>組織全体・長期の方向性</td></tr>
              <tr><td>更新頻度の目安</td><td>同じ議論を3〜4回繰り返したら、新しい戦略を書くタイミング</td><td>将来像が霧のように不透明になったら、新しいビジョンを書くタイミング</td></tr>
            </tbody>
          </table>
        </div>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_STRATEGY_VISION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">デザインドキュメントからビジョンへの合成プロセス</div>
        </div>
        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:info-circle" /><span data-testid="callout-label">補足</span></div>
          <p><strong>初学者向けポイント</strong>: 「良いビジョン」を判断する基準は、発表直後の盛り上がりではなく、<strong>2年前に書かれた設計文書と直近の設計文書を比較して、明確な改善が見られるかどうか</strong>だと Larson は述べています。ビジョンや戦略は一度書いて終わりではなく、日々の意思決定の質を底上げするための「生きた道具」として使い続けることが重要です。</p>
        </div>
        <p>なお、ビジョン・戦略に「カルチャー」や「バリュー」を混ぜ込むべきではない、という指摘も本書(および著者のその後のブログ記事)で繰り返し強調されています。これらは全社レベルで扱うべきテーマであり、エンジニアリング組織だけで独自に定義しようとすると、維持コストの高い「価値観のオアシス」を生んでしまうためです。</p>
        <h3>2-3. メトリクスとベースラインで変化を導く</h3>
        <p>組織を広範囲に変化させたいとき、権限(Authority)だけに頼るのはリスクが高いアプローチです。本書では、<strong>メトリクス(測定指標)とベースライン(基準値)を用いて変化を導く</strong>手法が紹介されています。まず現状を測定し、それを可視化・共有することで、権限を行使せずとも自然と改善への機運を作り出す、というアプローチです。地道にプロセスを文書化し、主要な指標を継続的に公開していくことが、権限に頼らない変化を生み出す鍵とされています。</p>
        <h3>2-4. マイグレーションを「安く」保つ</h3>
        <p>Larson は、急成長企業のマネージャーにとって特に重要な2つのスキルとして「マイグレーション(技術移行)を安価に済ませること」と「クリーンな組織再編を行うこと」を挙げています。ここではまずマイグレーションについて扱います。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ベストプラクティス</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>オーナーシップレジストリを整備する</td><td>「これは誰が持っているのか」を即座に検索できる仕組みを作る。オンコールの自動アサインなどにも転用できる、一石二鳥のツール</td></tr>
              <tr><td>ソフトウェアを「柔軟」に設計する</td><td>ポリシー(変わりやすい判断ロジック)をシステムの奥深くに埋め込まず、外側のレイヤーに寄せる(fail open and layer policy)。最良のシステム書き換えは「そもそも起きなかった書き換え」である</td></tr>
              <tr><td>インターフェースを汎用的に保つ</td><td>インターフェースが汎用的であれば、マイグレーションの中でも最も時間のかかる「移行フェーズ」自体を丸ごとスキップできる場合がある</td></tr>
              <tr><td>進行中も完了時も「祝う」、ただし重心は完了時に</td><td>マイグレーションの完了を大きく称賛・可視化することで、次のマイグレーションへの協力も得やすくなる</td></tr>
              <tr><td>スケール変化は「1桁(10倍)」が目安</td><td>システムが生き延びられる成長倍率にはおおよその目安があるため、会社の成長速度(例: 半年で倍増)から逆算して、将来の作り直し頻度を見積もっておく</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:info-circle" /><span data-testid="callout-label">補足</span></div>
          <p><strong>初学者向けポイント</strong>: 新しい基盤を作り上げる作業そのものよりも、その後に続く<strong>「移行フェーズ」——既存の利用箇所を1つずつ新基盤へ切り替え、既存データを移送し、周辺システムを追随させる工程</strong>——こそが本当の生産性の敵になりやすい、という指摘は多くの実務家の共感を呼んでいます。作る側は早期に終わっても、全チームの運用が切り替わるまでマイグレーションは完了しません。</p>
        </div>
        <h3>2-5. 組織再編(リオルグ)を正しく進める</h3>
        <p>組織再編(リオルグ)は強力な手段である一方、乱用すると組織への信頼を損ないます。本書では、組織変更を「思考のための道具」として捉え、以下のような7段階のプランニングフレームワークを提示しています。</p>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_REORG_STEPS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">組織再編(リオルグ)の7段階プランニングフレームワーク</div>
        </div>
        <p>各ステップの要点は以下の通りです。</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ステップ</th>
                <th>要点</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>①需要の検証</td><td>そもそも「組織変更」が適切な手段かどうかを、まず疑ってかかる</td></tr>
              <tr><td>②人員規模の見積もり</td><td>楽観的な成長シナリオ、全ポジションが埋まった場合の規模、過去の採用実績の3つの視点で見積もる</td></tr>
              <tr><td>③比率の設定</td><td>マネージャー1人あたりエンジニア5〜8人程度が一つの目安(状況により調整)</td></tr>
              <tr><td>④チームの定義</td><td>各チームに明確なミッションとオーナーシップを持たせる。物理的な近さやインターフェースの明確さも考慮する</td></tr>
              <tr><td>⑤人員配置</td><td>既存メンバーの中で準備ができている人 / 成長が見込める人、社内異動、社外採用の順に候補を検討する</td></tr>
              <tr><td>⑥コミット</td><td>変更による正味の効果、想定される新体制の持続期間、想定される課題、最も影響を受ける人を整理したうえで意思決定する</td></tr>
              <tr><td>⑦ロールアウト</td><td>決定した構造を実際に展開する</td></tr>
            </tbody>
          </table>
        </div>
        <p>さらに、リオルグの「良し悪し」についても明快な指針が示されています。</p>
        <ul>
          <li><strong>最良のリオルグ</strong>: 構造的な問題を実際に解決するもの</li>
          <li><strong>次点で良いリオルグ</strong>: あえて「やらない」という判断そのもの</li>
          <li><strong>最悪のリオルグ</strong>: 特定の人(people management issue)に向き合うことを避けるために行うもの</li>
        </ul>
        <div class="callout note" data-variant="note" data-testid="callout">
          <div class="callout-title"><Icon name="tabler:info-circle" /><span data-testid="callout-label">補足</span></div>
          <p><strong>初学者向けポイント</strong>: リオルグを「人の問題」から目をそらす手段として使ってしまうと、根本課題は解決されないまま、組織全体が疲弊するだけになります。まずは1on1やコーチングで向き合うべき課題なのか、本当に構造の問題なのかを見極めることが第一歩です。</p>
        </div>
      </section>

      <section id="approaches">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 05</div>
        <h2>第3部: アプローチ(Approaches)</h2>

        <p>第3部は、これまでの章に比べてより多様なトピックを横断的に扱う章です。急成長企業に合わせてマネジメントスタイルをどう適応させるか、自分の正式な権限(オーソリティ)を超えて成果を出したい時にどう振る舞うか、といった、状況に応じた立ち回り方に関する実践的なアドバイスが並びます。ポリシーの例外をどう扱うか、他のマネージャーとの関係性をどう構築するかといったテーマも含まれています。</p>
        <p><strong>ポイント</strong>: この章はレビュアーの間でも「最も雑多(heterogeneous)」と評される章であり、体系だった1つの理論というより、状況別の実践知の集合として読むのが向いています。悩んでいる状況に近いトピックをつまみ読みするアプローチが有効です。</p>
      </section>

      <section id="culture">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:heart" />SECTION 06</div>
        <h2>第4部: 文化(Culture)</h2>

        <p>第4部では、インクルーシブなチーム・組織を育てるための実践的な取り組みが扱われます。特に印象的なのが「自由(Freedom)」を巡る2つの緊張関係、すなわち「〜する自由(Freedom to)」と「〜からの自由(Freedom from)」の対立をどう調和させるかという論点です。</p>
        <p>また、「ヒーローカルチャー」——特定の個人が身を削って火消しを行うことが賞賛される文化——がもたらす弊害についても論じられています。属人的な英雄的行動に依存する組織は、短期的には機能しているように見えても、持続可能性という観点では大きなリスクを抱えていることになります。文化に関する変化は、プロセスの変更に比べて時間がかかるものであり、じっくりと時間をかけて醸成していく必要がある、という位置づけがなされています。</p>
      </section>

      <section id="careers">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:briefcase" />SECTION 07</div>
        <h2>第5部: キャリア(Careers)</h2>

        <p>最終セクションは、面接・採用からパフォーマンスマネジメントまで、エンジニアの「キャリア」に関わる仕組みを扱います。採用はリクルーターの仕事、パフォーマンス評価は人事部の仕組み、と考えがちな新任マネージャーに対し、Larson はこれらを<strong>マネージャー自身が頻繁に活用すべき強力なツール</strong>として捉え直すよう促しています。</p>
        <h3>5-1. 採用ファネルを設計する</h3>
        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_HIRING_FUNNEL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">採用ファネルの流れ</div>
        </div>
        <p>本書では、既存の人脈だけに頼らない「コールドソーシング(見知らぬ候補者への直接アプローチ)」の始め方や、採用ファネルの各段階を計測・最適化していく考え方が紹介されています。ファネルを「なんとなく回す」のではなく、各段階の歩留まりを可視化し、ボトルネックを特定して改善していく——マイグレーションやリオルグと同じ「システム思考」の応用がここでも貫かれています。</p>
        <h3>5-2. パフォーマンスマネジメントとキャリアラダー</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>要素</th>
                <th>概要</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>キャリアラダー</td><td>役割・レベルごとに期待値を明文化した「はしご」。評価や昇進判断の共通言語になる</td></tr>
              <tr><td>パフォーマンス評価区分(Performance Designations)</td><td>「期待通り」「期待以上」など、評価を離散的なカテゴリに落とし込む仕組み</td></tr>
              <tr><td>パフォーマンスサイクル</td><td>評価・フィードバックを一定周期で回す仕組み</td></tr>
              <tr><td>専門ロールの設計(SRE、TPM など)</td><td>一般的なエンジニアリングロールとは異なる専門職種を組織に組み込む際の課題と、成功のための工夫</td></tr>
            </tbody>
          </table>
        </div>
        <h3>5-3. 面接ループを設計する</h3>
        <p>面接ループそのものの設計についても具体的な指針があります。誰がどんな観点を担当するのか、候補者の技術力だけでなく、組織にとって本当に重要な資質をどう見極めるのかを、場当たり的にではなく意図的に設計することが推奨されています。</p>
        <p>なお、著者はその後の実践として、シニアポジションの候補者に「ビジョン・戦略ドキュメントを3〜4人のピアの前でプレゼンし、フィードバックを受ける」「エグゼクティブに1対1でプレゼンし、コミュニケーションの適応力を見る」といった評価プロセスも紹介しており、これは本書のフレームワークをそのまま採用・評価の現場に応用した好例といえます。</p>
      </section>

      <section id="starter-checklist">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checklist" />SECTION 08</div>
        <h2>初学者向け: 明日から使える実践チェックリスト</h2>

        <p>新任のエンジニアリングマネージャーが、本書のエッセンスを実務にすぐ活かすためのチェックリストです。</p>
        <ul>
          <li>自分のチームが「6〜8人」の適正規模から外れていないか確認する</li>
          <li>自分のチームが「4つの状態」のどこにいるかを言語化してみる(Falling Behind / Treading Water / Repaying Debt / Innovating)</li>
          <li>「システムの処方箋」を飛ばして戦術的な対処に走っていないか振り返る</li>
          <li>直近で扱った技術的な意思決定を5つ書き出し、共通するテーマを見つけてみる(=戦略の種)</li>
          <li>チームの「オーナーシップレジストリ」(誰が何を持っているか)が明文化されているか確認する</li>
          <li>進行中・計画中のマイグレーションについて、インターフェースを汎用化することで移行フェーズを省略できないか検討する</li>
          <li>リオルグを検討する前に「これは本当に構造の問題か、人の問題ではないか」を自問する</li>
          <li>採用ファネルの各段階(ソーシング / スクリーニング / 面接 / オファー)の歩留まりを一度数値で把握してみる</li>
          <li>自分のチームで「ヒーローカルチャー」に依存している業務がないか棚卸しする</li>
          <li>自分の業務を棚卸しし、メンバーの成長機会として委譲できるものがないか探す(後継者計画の第一歩)</li>
        </ul>
      </section>

      <section id="industry-reception">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:star" />SECTION 09</div>
        <h2>業界での評価: 著名なエンジニアリングリーダーはどう読んだか</h2>

        <p>本書は発売以来、世界中のエンジニアリングリーダーから継続的に参照されている、EM領域の定番書の一つです。国際的に著名なテック系ライター・エンジニアリングリーダーによる評価の要点を紹介します。</p>
        <ul>
          <li><strong>Gergely Orosz(The Pragmatic Engineer)</strong>: Uber や Stripe での実務経験を経て執筆されたエンジニアリングマネジメント書の中でも「最も実践的(hands-on)」な一冊だと評価しつつ、図版がテキストから離れた位置に配置されている点など、書籍としての編集面には改善の余地があると指摘しています。</li>
          <li><strong>Cindy Sridharan(分散システム領域で知られるエンジニア)</strong>: 本書の特徴を「フレームワークへの落とし込み」と「軽量で実践的なツール提供」の2点に整理し、特に組織・道具箱・アプローチ・文化・キャリアの各章が幅広い読者層に有益だと評価しています。</li>
          <li><strong>Luca Rossi(Refactoring ニュースレター)</strong>: 本書は特定の一つのテーマに沿って書かれた本ではなく、5つの大きなセクションに緩やかに整理された記事の集合体であるとし、その「アンソロジー的な性格」こそが他の同分野の書籍との違いを生んでいると分析しています。</li>
          <li><strong>Tomasz Tunguz(ベンチャーキャピタリスト)</strong>: 「4つの状態」フレームワークを特に取り上げ、外部からは見えにくいチームの健全性を診断するための優れた枠組みだと紹介しています。</li>
          <li><strong>First Round Review</strong>(著名スタートアップ向けメディア): チームサイジングに関するインタビュー記事を掲載し、マネージャー対エンジニアの比率(1:8)や、マネージャー・オブ・マネージャー対エンジニアの比率(1:40)といった数字が、組織内のキャリア機会そのものを規定してしまう構造について深掘りしています。</li>
        </ul>
        <p>一方で、Goodreads や個人ブログのレビューでは「各章のつながりが薄く、ブログ記事の寄せ集めという印象を拭えない」「シリコンバレーの高成長企業を前提とした内容で、規模や成長速度の異なる組織ではそのまま当てはめにくい」といった率直な指摘も少なくありません。実務家の多くは、通読するというより<strong>「今直面している課題に応じて必要な章を辞書的に参照する」使い方</strong>を推奨しています。</p>
      </section>

      <section id="conclusion">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 10</div>
        <h2>まとめ</h2>

        <p>『An Elegant Puzzle』は、エンジニアリングマネジメントという「感覚と経験則に頼りがちな領域」に対して、エンジニアリング的な体系性を持ち込んだ点に最大の価値があります。</p>
        <ul>
          <li>組織設計は「感覚」ではなく、規模・状態・リスクを言語化できる「システム」として捉える</li>
          <li>ビジョン・戦略は難解な芸術ではなく、設計文書やこれまでの戦略を積み上げて「合成」する地道な作業である</li>
          <li>マイグレーションやリオルグのような「面倒な仕事」こそ、事前のフレームワークが最も効いてくる領域である</li>
          <li>採用やパフォーマンス評価も、他部門に任せきりにせず、マネージャー自身が使いこなすべき「道具」である</li>
        </ul>
        <p>初めてマネジメントに携わる人にとっては、すべてを一度に実践する必要はありません。まずは自分のチームが「4つの状態」のどこにいるかを見極めることから始めてみてください。</p>
      </section>

      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 11</div>
        <h2>参考文献・情報源(URL付き)</h2>

        <p>本ガイドは、2026年8月24日時点でのWeb検索に基づき、書籍の公式情報および国際的に著名な開発者・エンジニアリングリーダーによる書評・解説記事を参照して作成しました。</p>
        <div class="ref-group">
          <h3>公式・書籍情報</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Stripe Press 公式書籍ページ</span><a class="ref-url" href="https://press.stripe.com/an-elegant-puzzle" target="_blank" rel="noopener">https://press.stripe.com/an-elegant-puzzle</a></li>
            <li><span class="ref-name">Amazon 書籍ページ</span><a class="ref-url" href="https://www.amazon.com/Elegant-Puzzle-Systems-Engineering-Management/dp/1732265186" target="_blank" rel="noopener">https://www.amazon.com/Elegant-Puzzle-Systems-Engineering-Management/dp/1732265186</a></li>
            <li><span class="ref-name">Goodreads 書籍ページ</span><a class="ref-url" href="https://www.goodreads.com/book/show/45303387-an-elegant-puzzle" target="_blank" rel="noopener">https://www.goodreads.com/book/show/45303387-an-elegant-puzzle</a></li>
          </ul>
        </div>
        <div class="ref-group">
          <h3>著者本人による一次情報(Irrational Exuberance ブログ)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">チームの適正規模(Sizing engineering teams)</span><a class="ref-url" href="https://lethain.com/sizing-engineering-teams/" target="_blank" rel="noopener">https://lethain.com/sizing-engineering-teams/</a></li>
            <li><span class="ref-name">チームの4つの状態(Staying on the path to high-performing teams / Durably excellent teams)</span><a class="ref-url" href="https://lethain.com/durably-excellent-teams/" target="_blank" rel="noopener">https://lethain.com/durably-excellent-teams/</a></li>
            <li><span class="ref-name">戦略とビジョンの書き方(Writing strategies and visions)</span><a class="ref-url" href="https://lethain.com/strategies-visions/" target="_blank" rel="noopener">https://lethain.com/strategies-visions/</a></li>
            <li><span class="ref-name">良いエンジニアリング戦略は退屈である(Write five, then synthesize)</span><a class="ref-url" href="https://lethain.com/good-engineering-strategy-is-boring/" target="_blank" rel="noopener">https://lethain.com/good-engineering-strategy-is-boring/</a></li>
            <li><span class="ref-name">エンジニアリング戦略に含めるべきでないもの</span><a class="ref-url" href="https://lethain.com/things-that-arent-engineering-strategy/" target="_blank" rel="noopener">https://lethain.com/things-that-arent-engineering-strategy/</a></li>
            <li><span class="ref-name">エンジニアリング戦略の実例調査</span><a class="ref-url" href="https://lethain.com/survey-of-engineering-strategies/" target="_blank" rel="noopener">https://lethain.com/survey-of-engineering-strategies/</a></li>
            <li><span class="ref-name">Irrational Exuberance トップページ(著者プロフィール)</span><a class="ref-url" href="https://lethain.com/" target="_blank" rel="noopener">https://lethain.com/</a></li>
            <li><span class="ref-name">Staff Engineer(姉妹書)の戦略・ビジョンに関するガイド</span><a class="ref-url" href="https://staffeng.com/guides/engineering-strategy/" target="_blank" rel="noopener">https://staffeng.com/guides/engineering-strategy/</a></li>
          </ul>
        </div>
        <div class="ref-group">
          <h3>著名な国際的エンジニア・開発者による書評・解説</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Gergely Orosz(The Pragmatic Engineer): An Elegant Puzzle Book Review</span><a class="ref-url" href="https://blog.pragmaticengineer.com/an-elegant-puzzle-book-review/" target="_blank" rel="noopener">https://blog.pragmaticengineer.com/an-elegant-puzzle-book-review/</a></li>
            <li><span class="ref-name">Cindy Sridharan(Medium): Book Review — An Elegant Puzzle</span><a class="ref-url" href="https://copyconstruct.medium.com/book-review-an-elegant-puzzle-f787ad381ce0" target="_blank" rel="noopener">https://copyconstruct.medium.com/book-review-an-elegant-puzzle-f787ad381ce0</a></li>
            <li><span class="ref-name">Luca Rossi(Refactoring ニュースレター): An Elegant Puzzle 書評</span><a class="ref-url" href="https://refactoring.fm/p/an-elegant-puzzle" target="_blank" rel="noopener">https://refactoring.fm/p/an-elegant-puzzle</a></li>
            <li><span class="ref-name">Tomasz Tunguz: The 4 States of an Engineering Team</span><a class="ref-url" href="https://tomtunguz.com/an-elegant-problem-will-larson.md/" target="_blank" rel="noopener">https://tomtunguz.com/an-elegant-problem-will-larson.md/</a></li>
            <li><span class="ref-name">First Round Review: How to Size and Assess Teams From an Eng Lead at Stripe, Uber and Digg</span><a class="ref-url" href="https://review.firstround.com/how-to-size-and-assess-teams-from-an-eng-lead-at-stripe-uber-and-digg/" target="_blank" rel="noopener">https://review.firstround.com/how-to-size-and-assess-teams-from-an-eng-lead-at-stripe-uber-and-digg/</a></li>
          </ul>
        </div>
        <div class="ref-group">
          <h3>その他の実務者による読書メモ・要約(補足参考情報)</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Scott Brady(章ごとの読書メモ)</span><a class="ref-url" href="https://www.scottbrady.io/leadership/book-notes-elegant-puzzle" target="_blank" rel="noopener">https://www.scottbrady.io/leadership/book-notes-elegant-puzzle</a></li>
            <li><span class="ref-name">Manas J. Saloi(要約とハイライト)</span><a class="ref-url" href="https://manassaloi.com/booksummaries/2021/02/14/elegant-puzzle-larson.html" target="_blank" rel="noopener">https://manassaloi.com/booksummaries/2021/02/14/elegant-puzzle-larson.html</a></li>
            <li><span class="ref-name">Dan Lebrero(読書メモ)</span><a class="ref-url" href="https://danlebrero.com/2022/07/06/an-elegant-puzzle-systems-of-engineer-management-book-summary/" target="_blank" rel="noopener">https://danlebrero.com/2022/07/06/an-elegant-puzzle-systems-of-engineer-management-book-summary/</a></li>
          </ul>
        </div>
      </section>

      <footer>
        本ガイドは教育・学習支援を目的とした非公式の解説資料です。『An Elegant Puzzle: Systems of Engineering Management』の著作権は著者 Will Larson および Stripe Press に帰属します。
      </footer>
    </main>
  </div>
</template>

<style scoped>
.guide-container {
  display: block;
  min-height: 100vh;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-indigo);
  color: #fff;
  padding: 8px;
  z-index: 100;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: var(--global-nav-height);
}

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
  text-decoration: none;
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

.main-content {
  margin-left: 288px;
  padding: 56px 72px 120px;
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
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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
  color: var(--color-ink-faint);
  margin-top: 6px;
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

.disclaimer-box a {
  color: var(--color-indigo);
  text-decoration: underline;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 14px;
}

section {
  margin-bottom: 64px;
}

:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  line-height: 1.35;
  margin: 0 0 20px;
  color: var(--color-ink);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 12px;
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  line-height: 1.4;
  margin: 36px 0 16px;
  color: var(--color-ink);
}

h4 {
  font-weight: 600;
  font-size: 18px;
  margin: 28px 0 12px;
  color: var(--color-ink);
}

p {
  margin: 0 0 18px;
  color: var(--color-ink);
  font-size: 16px;
  line-height: 1.75;
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
  color: var(--color-ink);
}

li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 24px 0;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-paper-raised);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
}

th, td {
  padding: 14px 18px;
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

.callout {
  border: 1px solid var(--color-border);
  border-left-width: 4px;
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 20px 24px;
  margin: 28px 0;
}

.callout .callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 10px;
}

.callout .callout-title :deep(.iconify),
.callout .callout-title :deep(svg) {
  font-size: 18px;
}

.callout.note {
  border-left-color: var(--color-plum);
}

.callout.note .callout-title {
  color: var(--color-plum);
}

.mermaid-wrap {
  margin: 28px 0;
}

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

.step-list {
  list-style: none;
  margin: 24px 0;
  padding: 0;
  display: grid;
  gap: 16px;
}

.step-list li {
  display: flex;
  gap: 16px;
  margin-bottom: 0;
  align-items: center;
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

.step-body .step-desc {
  color: var(--color-ink-soft);
  font-size: 16px;
}

.ref-group {
  margin-bottom: 28px;
}

.ref-group :is(h3, h4) {
  margin-top: 0;
}

.ref-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 16px;
}

.ref-list li:last-child {
  border-bottom: none;
}

.ref-list .ref-name {
  color: var(--color-ink);
  font-weight: 500;
  display: block;
  margin-bottom: 2px;
}

.ref-list .ref-url {
  color: var(--color-ink-faint);
  word-break: break-all;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
}

@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }

  .sidebar {
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.2s ease, visibility 0.2s ease;
    box-shadow: none;
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

@media (prefers-reduced-motion: reduce) {
  .sidebar {
    transition: none;
  }
}
</style>
