<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "introduction",
  "management-vs-leadership",
  "google-research-foundation",
  "step-by-step-guide",
  "antipatterns",
  "checklist",
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
  title: "リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド",
  description: "初めてテックリード・エンジニアリングマネージャーになった方向けに、国際的に著名なリーダーたちの実践知を基にしたリーダーシップのベストプラクティスをステップバイステップで解説する。",
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
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
  fontSize: "16px",
};

const DIAGRAM_OVERALL_ROADMAP = `flowchart TB
    subgraph PhaseA["フェーズ1 土台をつくる"]
        direction TB
        A1["Step1 マインドセットの転換"]
        A2["Step2 信頼関係の構築 1on1"]
        A1 --> A2
    end
    subgraph PhaseB["フェーズ2 仕組みをつくる"]
        direction TB
        B1["Step3 期待値の明確化"]
        B2["Step4 委譲する"]
        B1 --> B2
    end
    subgraph PhaseC["フェーズ3 対話を深める"]
        direction TB
        C1["Step5 フィードバック"]
        C2["Step6 意思決定とファシリテーション"]
        C1 --> C2
    end
    subgraph PhaseD["フェーズ4 チームを育てる"]
        direction TB
        D1["Step7 心理的安全性の醸成"]
        D2["Step8 継続的な振り返り"]
        D1 --> D2
    end
    PhaseA --> PhaseB --> PhaseC --> PhaseD

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A1,A2,B1,B2,C1,C2,D1,D2 box;`;

const DIAGRAM_ONE_ON_ONE_FLOW = `flowchart TB
    subgraph Before["ミーティング前"]
        direction TB
        B1["アジェンダは相手に決めてもらう"]
        B2["前回のアクション項目を確認する"]
        B1 --> B2
    end
    subgraph During["ミーティング中"]
        direction TB
        M1["軽い雑談で安心できる空気を作る"]
        M2["話す割合は相手7 自分3を意識する"]
        M3["キャリア 障害 成長について話す"]
        M1 --> M2 --> M3
    end
    subgraph After["ミーティング後"]
        direction TB
        A1["合意したアクションを記録する"]
        A2["次回までにフォローアップする"]
        A1 --> A2
    end
    Before --> During --> After

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class B1,B2,M1,M2,M3,A1,A2 box;`;

const DIAGRAM_DELEGATION_FLOW = `flowchart TD
    Start["自分が抱えているタスクがある"] --> Q1{"このタスクは頻繁に発生するか?"}
    Q1 -->|はい| Q2{"作業は単純か?"}
    Q1 -->|いいえ 稀| Q3{"作業は複雑か?"}
    Q2 -->|単純| R1["最優先で委譲する"]
    Q2 -->|複雑| R2["育成機会として計画的に委譲する"]
    Q3 -->|はい 複雑| R3["学習機会として委譲を検討する"]
    Q3 -->|いいえ 単純| R4["自分で対応してよい"]
    R1 --> End["ゴールとエスカレーション基準を伝え 結果を待つ"]
    R2 --> End
    R3 --> End

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,Q2,Q3,R1,R2,R3,R4 box;
    class End done;`;

const DIAGRAM_FEEDBACK_FLOW = `flowchart TD
    Start["メンバーに伝えたいことがある"] --> Q1{"相手への敬意 関心はあるか Care Personally"}
    Q1 -->|薄い 不足している| Fix["先に関係構築を行う"]
    Fix --> Q1
    Q1 -->|ある| Q2{"具体的かつ率直に伝えられそうか Challenge Directly"}
    Q2 -->|曖昧にしてしまいそう| Risk1["Ruinous Empathy 成長を妨げるおそれ"]
    Q2 -->|配慮なく伝えてしまいそう| Risk2["Obnoxious Aggression 信頼を損なうおそれ"]
    Q2 -->|両方満たせる| Good["Radical Candor を実践する"]
    Good --> End["できるだけ早く 個別に 行動そのものに焦点を当てて伝える"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,Q2,Fix,Risk1,Risk2,Good box;
    class End done;`;

const DIAGRAM_DECISION_FLOW = `flowchart TD
    Start["チームで問題が発生した"] --> Q1{"情報収集段階の状況か 選択が必要な決定の段階か"}
    Q1 -->|状況の段階| S1["まず事実を集める"]
    S1 --> S2["関係者の話を聞く Read the Room"]
    S2 --> S3["自分の意見は最後に述べる Act Last"]
    S3 --> Q1
    Q1 -->|決定の段階| D1["選択肢を洗い出す"]
    D1 --> D2{"チーム内で合意形成できるか?"}
    D2 -->|できる| D3["チームに決めさせる エンパワーメント"]
    D2 -->|緊急 できない| D4["リーダーが決定し 理由を明確に説明する"]
    D3 --> End["決定を実行し 結果から学ぶ"]
    D4 --> End

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,S1,S2,S3,D1,D2,D3,D4 box;
    class End done;`;
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
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" />
    </button>

    <!-- ===================== Sidebar ===================== -->
    <nav id="sidebar" class="sidebar" aria-label="目次" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">リーダーの作法</div>
          <div class="brand-subtitle">実践ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a href="#introduction" :class="{ active: activeId === 'introduction' }" @click="closeSidebar"><Icon name="tabler:certificate" />はじめに</a></li>
        <li><a href="#management-vs-leadership" :class="{ active: activeId === 'management-vs-leadership' }" @click="closeSidebar"><Icon name="tabler:git-branch" />マネジメントとリーダーシップ</a></li>
        <li><a href="#google-research-foundation" :class="{ active: activeId === 'google-research-foundation' }" @click="closeSidebar"><Icon name="tabler:building-bank" />Googleの研究が示すもの</a></li>
        <li><a href="#step-by-step-guide" :class="{ active: activeId === 'step-by-step-guide' }" @click="closeSidebar"><Icon name="tabler:route" />ステップバイステップ実践ガイド</a></li>
        <li><a href="#antipatterns" :class="{ active: activeId === 'antipatterns' }" @click="closeSidebar"><Icon name="tabler:list-check" />よくある落とし穴</a></li>
        <li><a href="#checklist" :class="{ active: activeId === 'checklist' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" />初学者向けチェックリスト</a></li>
        <li><a href="#conclusion" :class="{ active: activeId === 'conclusion' }" @click="closeSidebar"><Icon name="tabler:flag-3" />まとめ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" />参考文献</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" />LEADERSHIP GUIDE</div>
        <h1>リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド</h1>
        <p class="hero-lede">
          対象読者: 初めてテックリード・エンジニアリングマネージャーになった方、またはこれからリーダーを目指す方。最終更新: 2026年8月15日時点の情報をもとに作成。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">8ステップ</div><div class="stat-label">実践フレームワークの全体像</div></div>
          <div class="stat-card"><div class="stat-number">10行動</div><div class="stat-label">Google Project Oxygenが示す優れたマネージャーの行動特性</div></div>
          <div class="stat-card"><div class="stat-number">6つ</div><div class="stat-label">初学者が陥りやすいアンチパターン</div></div>
          <div class="stat-card"><div class="stat-number">9件</div><div class="stat-label">参照した一次情報源</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          <span>本ガイドは教育・学習支援を目的とした非公式の解説資料です。引用元の内容は要約・言い換えを中心に構成しており、原文からの引用は最小限に留めています。詳しい内容は各出典の一次情報、特にMichael Loppの著書『The Art of Leadership』の<a href="https://www.oreilly.com/library/view/the-art-of/9781492045687/" target="_blank" rel="noopener">O'Reilly公式ページ</a>をご参照ください。</span>
        </div>
      </div>

      <!-- ===================== 01. Introduction ===================== -->
      <section id="introduction">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" />SECTION 01</div>
        <h2>はじめに</h2>

        <p>「リーダーシップ」と聞くと、カリスマ性や生まれ持った才能が必要な特別なものだと考えてしまいがちです。しかし、著名なエンジニアリングリーダーたちの発信を横断的に見ていくと、共通して語られているのは正反対のことです。リーダーシップは<strong>大きな哲学</strong>ではなく、<strong>小さな習慣の積み重ね</strong>であるという考え方です。</p>

        <p>Netscape・Apple・Slackでリーダーを務めたMichael Lopp(ペンネーム: Rands)は、著書『The Art of Leadership』の中で、リーダーシップとは一貫して実践される小さな行動の集合であり、地位や才能の話ではないと述べています。本ガイドはこの考え方を軸に、初めてリーダーになったソフトウェアエンジニアが最初の数ヶ月で身につけるべき作法を、ステップバイステップで解説します。</p>
      </section>

      <!-- ===================== 02. Management vs Leadership ===================== -->
      <section id="management-vs-leadership">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 02</div>
        <h2>マネジメントとリーダーシップの違い</h2>

        <p>初学者がまず混同しやすいのが「マネジメント」と「リーダーシップ」です。CTOやVPエンジニアリングとして複数の組織を率いてきたWill Larson(Imprint CTO、元Carta CTO、著書『Staff Engineer』『An Elegant Puzzle』)は、エンジニアリング組織における役割を技術的な影響力によるリードと、公式な権限によるマネジメントに分けて説明しています。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>観点</th><th>テックリード(技術リーダーシップ)</th><th>エンジニアリングマネージャー(人のマネジメント)</th></tr>
            </thead>
            <tbody>
              <tr><td>影響力の源泉</td><td>専門知識・技術的信頼</td><td>組織上の役割・評価権限</td></tr>
              <tr><td>主な関心事</td><td>アーキテクチャ、技術的な意思決定、実装品質</td><td>育成、評価、モチベーション、チームの健全性</td></tr>
              <tr><td>典型的な活動</td><td>設計レビュー、技術方針の提示、難易度の高い課題への関与</td><td>1on1、目標設定、キャリア支援、採用</td></tr>
              <tr><td>成功の測り方</td><td>システムの品質・技術的な成果</td><td>チームの成長・定着率・アウトプット</td></tr>
            </tbody>
          </table>
        </div>

        <p>両者は排他的ではなく、多くの現場ではテックリードとエンジニアリングマネージャーがペアで1つのチームを支えます。まずは自分がどちらの役割(あるいは両方)を担っているのかを明確にすることが、リーダーとしての第一歩です。</p>
      </section>

      <!-- ===================== 03. Google Research Foundation ===================== -->
      <section id="google-research-foundation">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 03</div>
        <h2>良いリーダーの土台 — Googleの研究が示すもの</h2>

        <p>Googleは自社のマネージャーを対象にした大規模な社内調査「Project Oxygen」を通じて、優れたマネージャーに共通する行動を特定しました。技術力の高さそのものよりも、コーチングや権限委譲、インクルーシブなチーム環境づくりといった行動特性が、チームの成果や定着率に強く影響することが示されています。なお、心理的安全性をはじめとする「何がチームを効果的にするか」の知見は、Project Oxygenではなく別調査のProject Aristotleによるものです(後述)。以下はGoogleのre:Workが公開している、Project Oxygenの10の行動特性です。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>優れたマネージャーの行動</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>良いコーチである</td></tr>
              <tr><td>2</td><td>チームに権限を委譲し、マイクロマネジメントをしない</td></tr>
              <tr><td>3</td><td>メンバーの成功と幸福に配慮した、インクルーシブなチーム環境をつくる</td></tr>
              <tr><td>4</td><td>生産性が高く、結果を重視する</td></tr>
              <tr><td>5</td><td>良いコミュニケーターである(聞く・伝える)</td></tr>
              <tr><td>6</td><td>キャリア開発を支援し、パフォーマンスについて話し合う</td></tr>
              <tr><td>7</td><td>チームに対する明確なビジョン・戦略を持つ</td></tr>
              <tr><td>8</td><td>チームを助けるための重要な技術スキルを持つ</td></tr>
              <tr><td>9</td><td>組織を横断して協働する</td></tr>
              <tr><td>10</td><td>強い意思決定者である</td></tr>
            </tbody>
          </table>
        </div>

        <p>これらは特別な才能ではなく、後天的に習得できる「行動」として整理されている点が重要です。本ガイドのステップは、この10行動と、後述する複数の著名なリーダーの実践知を統合した内容になっています。</p>
      </section>

      <!-- ===================== 04. Step-by-step guide ===================== -->
      <section id="step-by-step-guide">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 04</div>
        <h2>ステップバイステップ実践ガイド</h2>

        <h3>全体像</h3>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_OVERALL_ROADMAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">8ステップ実践ガイドの全体像(4フェーズ構成)</div>
        </div>

        <p>以下、各ステップを詳しく見ていきます。</p>

        <h3>Step 1: マインドセットを切り替える</h3>

        <p>初めてリーダーになったエンジニアが最初につまずくのは、「自分が最も優れたエンジニアであり続けなければならない」という思い込みです。The Manager's Pathの著者でRent the RunwayのCTOを務めたCamille Fournierは、マネージャーに昇進した直後の人ほど、旧来の「個人としてのアウトプット」に固執しがちだと指摘しています。</p>

        <p>リーダーの成果は「自分が何を作ったか」ではなく「チームが何を生み出せる環境をつくったか」で測られるようになります。この転換ができないと、後述する委譲がうまくいかず、自分がボトルネックになってしまいます。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>自分の1週間のカレンダーを見直す。</strong>「自分でコードを書く時間」と「チームを支援する時間」の比率を把握する</li>
            <li><strong>新しい役割の振る舞いを意識的に示す。</strong>昇進や異動の直後は、周囲がまだ自分を以前の役割で見ていることを自覚する</li>
            <li><strong>「マネジメントは昇進ではなく職種転換である」と捉える。</strong>Michael Loppは、新任マネージャーが陥りがちな「誰も教えてくれない」「互いに愚痴を言い合う」という危機の連鎖(The New Manager Death Spiral)を著書で説明しています。だからこそ、最初から「これは昇進ではなく別の職種への転換だ」と捉えることが重要です</li>
          </ul>
        </div>

        <h3>Step 2: 信頼関係を築く(1on1)</h3>

        <p>信頼はリーダーシップの通貨です。そしてその信頼を積み上げる最も基本的な仕組みが、定期的な1on1ミーティングです。Fournierは1on1を、マネージャーがメンバーに「何に集中すべきか」を理解させ、その集中を実現できるよう支援するための最重要ツールと位置づけています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ONE_ON_ONE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">1on1ミーティングの前・中・後で意識すること</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>1on1は進捗報告の場ではない。</strong>メンバーのための時間であり、議題はできる限り相手に決めてもらう</li>
            <li><strong>具体的な問いを持つ。</strong>Rands(Michael Lopp)は自分の癖や情報の受け取り方を明文化した「How to Rands」というドキュメントを公開し、相手に自分の取扱説明書を渡すという手法を紹介しています。これは新しく組んだメンバーとの信頼構築を早めるのに役立ちます</li>
            <li><strong>キャンセルしない。</strong>1on1を頻繁にキャンセルすることは、メンバーへの最も分かりやすい「あなたは優先度が低い」というメッセージになってしまう</li>
          </ul>
        </div>

        <h3>Step 3: 期待値を明確にする</h3>

        <p>Michael Loppは著書の中で、チーム内で起きる問題の多くを「状況(Situation)」と「決定(Decision)」に分けて捉えることを提案しています。「状況」とはまだ情報収集の段階にある曖昧な事態、「決定」とは複数の選択肢の中から選ぶべき段階にある事態です。この区別ができていないと、まだ情報が足りない段階で拙速に決断してしまったり、逆に決断すべき場面で議論を長引かせてしまったりします。</p>

        <p>期待値を明確にするというのは、この「状況」と「決定」の区別に加えて、「誰が」「何を」「いつまでに」「どの基準で」担うのかをチームと合意しておくことです。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>完了の定義(Doneの基準)を最初にすり合わせる。</strong>タスクを渡すときは、達成条件を先に合意する</li>
            <li><strong>背景を伝える。</strong>「reportを出すこと」に加えて、なぜその仕事が重要なのかを伝える。目的を理解しているチームは自律的に判断できる</li>
            <li><strong>意思決定の所在を明文化する。</strong>定例やドキュメントで、誰が最終的に決めるかを明らかにしておく</li>
          </ul>
        </div>

        <h3>Step 4: 委譲する</h3>

        <p>委譲はリーダーシップにおいて最も難しく、同時に最もレバレッジの効く行動です。AppleでディレクターだったMichael Loppは、この実践を「Delegate Until It Hurts(痛みを感じるまで委譲する)」という強い言葉で表現しています。快適に感じる範囲でしか委譲しない限り、リーダー自身が組織のスケーリングのボトルネックになってしまうという考え方です。</p>

        <p>Camille Fournierは、委譲の判断基準として「頻度」と「複雑さ」の2軸からなるグリッドを提示しています。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th /><th>単純な作業</th><th>複雑な作業</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>頻繁に発生する</strong></td><td>最優先で委譲する(自分が抱え続ける理由がない)</td><td>次世代のリーダーを育てる機会として、計画的に委譲する</td></tr>
              <tr><td><strong>稀にしか発生しない</strong></td><td>自分でやってしまって構わない</td><td>ケースバイケースで判断。学習機会として委譲するのも有効</td></tr>
            </tbody>
          </table>
        </div>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DELEGATION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">委譲すべきかどうかの判断フロー</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>「ゴール」と「エスカレーションの境界線」を伝える。</strong>細かい手順まで指示しない</li>
            <li><strong>重要な仕事こそ育成の機会として渡す。</strong>重要な仕事だからという理由で自分がコントロールを握り続けない</li>
            <li><strong>委譲した後も存在を消さない。</strong>相手がいつでも相談できる状態は保ちつつ、手を出しすぎない</li>
          </ul>
        </div>

        <h3>Step 5: フィードバックを行う</h3>

        <p>フィードバックは先延ばしにするほど難しくなります。GoogleとAppleで幹部を務めたKim Scottは、著書『Radical Candor』の中で、フィードバックを「相手を気にかける度合い(Care Personally)」と「率直に伝える度合い(Challenge Directly)」の2軸で整理しています。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th /><th>率直に伝えない</th><th>率直に伝える</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>相手を気にかけている</strong></td><td>Ruinous Empathy(誤った優しさ) — 曖昧なフィードバックで相手の成長機会を奪う</td><td>Radical Candor(理想) — 誠実で具体的なフィードバック</td></tr>
              <tr><td><strong>相手を気にかけていない</strong></td><td>Manipulative Insincerity(不誠実な回避) — 当たり障りのない対応に終始する</td><td>Obnoxious Aggression(攻撃的な直言) — 配慮のない指摘で信頼を損なう</td></tr>
            </tbody>
          </table>
        </div>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_FEEDBACK_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">Radical Candorに基づくフィードバックの進め方</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>時間を空けずに伝える。</strong>良いフィードバックも悪いフィードバックも先延ばしにしない</li>
            <li><strong>行動と結果について具体的に話す。</strong>人格ではなく行動そのものに焦点を当てる</li>
            <li><strong>一方通行にしない。</strong>自分自身へのフィードバックも積極的に求める</li>
          </ul>
        </div>

        <h3>Step 6: 意思決定とファシリテーション</h3>

        <p>リーダーには「早く自分の意見を言いたくなる衝動」が常につきまといます。Michael Loppは、会議やチームの議論において自分の意見を最後まで保留する「Act Last」という原則、場の空気や力学を読み取る「Read the Room」、そして表面的な報告だけでなく実態を自ら確かめる「Taste the Soup」という3つの姿勢を提唱しています。</p>

        <div class="diagram-card">
          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DECISION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            </ClientOnly>
          </div>
          <div class="diagram-caption">「状況」と「決定」を見極める意思決定フロー</div>
        </div>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>中立的な順序で意見を求める。</strong>役職による固定順ではなく、挙手順・議題の担当順・ランダムなどで参加者に発言してもらい、リーダーは最後に発言して結論を先取りしない</li>
            <li><strong>実際に現場を見に行く。</strong>レポートやダッシュボードの数字だけを信じない</li>
            <li><strong>全ての決定をリーダーが下す必要はない。</strong>チームが決められる問題は、チームに委ねる</li>
          </ul>
        </div>

        <h3>Step 7: 心理的安全性を醸成する</h3>

        <p>Googleは管理職の行動特性を調べたProject Oxygenに続き、チームの効果性を左右する要因を調べたProject Aristotleという調査も行いました。その結果、「誰がチームにいるか」よりも「チームがどのように協働しているか」の方が成果に強く影響することが分かり、その中核にあるのが心理的安全性、すなわちリスクを取って発言しても不利益を受けないとメンバーが感じられる状態でした。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>議論に集中する姿勢を見せる。</strong>会議中はスマートフォンやPCを閉じる</li>
            <li><strong>失敗を隠さなくてよい文化を体現する。</strong>自分自身のミスや分からないことを率直に共有する</li>
            <li><strong>感謝を示してから議論する。</strong>反対意見や異なる視点が出たときこそ大切にする</li>
          </ul>
        </div>

        <h3>Step 8: 継続的に振り返る</h3>

        <p>リーダーシップは一度身につけたら終わりではなく、継続的な実践と振り返りのサイクルです。Will Larsonは自身のブログで、エンジニアリング組織の運営方法を継続的に書き残し、更新し続けるプロセスそのものを重視しています。</p>

        <div class="callout practice" data-variant="practice" data-testid="callout">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
          <ul>
            <li><strong>月次・四半期で振り返りを書き留める。</strong>「うまくいったこと」「うまくいかなかったこと」を自分自身のために記録する</li>
            <li><strong>複数の指標を組み合わせて定点観測する。</strong>チームの健全性は単一の指標で判断せず、リリース頻度・リリース品質・変更失敗率・復旧時間・オンコールの負荷・定性的なフィードバックを組み合わせる(コミット頻度のような活動量の数値は個人の評価には用いない)</li>
            <li><strong>自分のリーダーシップを客観視する機会を作る。</strong>信頼できるメンター、あるいは社外のリーダーコミュニティを持つ</li>
          </ul>
        </div>
      </section>

      <!-- ===================== 05. Antipatterns ===================== -->
      <section id="antipatterns">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 05</div>
        <h2>よくある落とし穴(アンチパターン)</h2>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>アンチパターン</th><th>何が起きるか</th><th>対処のヒント</th></tr>
            </thead>
            <tbody>
              <tr><td>マイクロマネジメント</td><td>メンバーの自律性と当事者意識を奪う</td><td>Step4の委譲グリッドを使い、任せる範囲を明文化する</td></tr>
              <tr><td>委譲した仕事を結局巻き取ってしまう</td><td>チームが育たず、リーダー自身がボトルネックになる</td><td>「痛みを感じるまで委譲する」を合言葉に、我慢する練習をする</td></tr>
              <tr><td>フィードバックの先送り</td><td>小さな問題が大きくなってから初めて指摘することになる</td><td>Step5のフローに沿って、できるだけ早いタイミングで伝える</td></tr>
              <tr><td>派閥化・内輪化したチーム運営</td><td>チーム間の壁が生まれ、組織全体の連携が損なわれる</td><td>部門を横断した協働を評価基準に組み込む</td></tr>
              <tr><td>常に忙しそうにしていることを評価する</td><td>見せかけの労働時間が評価され、持続可能な働き方が損なわれる</td><td>成果とアウトカムで評価し、健全な働き方を自らモデルとして示す</td></tr>
              <tr><td>会議で自分が最初に結論を言ってしまう</td><td>チームの発言が委縮し、多様な視点が出てこなくなる</td><td>Step6の「Act Last」を意識し、発言順を工夫する</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 06. Checklist ===================== -->
      <section id="checklist">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" />SECTION 06</div>
        <h2>初学者向けチェックリスト</h2>

        <ul>
          <li>自分がテックリードなのか、エンジニアリングマネージャーなのか、あるいは両方なのかを言語化できている</li>
          <li>(テックリード)自分が担う技術的な役割の範囲を明文化し、チームと必要な認識合わせができている</li>
          <li>(エンジニアリングマネージャー)自分が管理するメンバー全員と定期的な1on1の枠が確保されている</li>
          <li>直近で少なくとも1つ、意識的にメンバーへ委譲したタスクがある</li>
          <li>直近1週間以内に伝えるべきフィードバックを先送りにしていない</li>
          <li>会議で自分より先にメンバーに発言してもらう工夫をしている</li>
          <li>チームの心理的安全性について、自分なりの観察や仮説を持っている</li>
          <li>月に一度、自分のリーダーシップを振り返る時間を確保している</li>
        </ul>
      </section>

      <!-- ===================== 07. Conclusion ===================== -->
      <section id="conclusion">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 07</div>
        <h2>まとめ</h2>

        <p>リーダーシップは特別な才能ではなく、日々の小さな実践の積み重ねです。マインドセットを切り替え、信頼関係を築き、期待値を明確にし、委譲し、フィードバックを行い、意思決定を適切にファシリテーションし、心理的安全性を醸成し、継続的に振り返る。この8つのステップは、Michael Lopp、Camille Fournier、Will Larson、Gergely Orosz、Kim Scott、そしてGoogleの社内研究といった、国際的に広く読まれているリーダーたちの実践知に共通して見られるパターンです。</p>

        <p>最初から完璧を目指す必要はありません。まずは1つのステップを選び、3ヶ月続けてみることから始めてみてください。</p>
      </section>

      <!-- ===================== 08. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 08</div>
        <h2>参考文献</h2>

        <p>本ガイドの作成にあたり、以下の情報源を参照しました(2026年8月15日時点で確認)。</p>

        <div class="ref-group">
          <h3>書籍</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Michael Lopp, The Art of Leadership, O'Reilly Media, 2020</span><a class="ref-url" href="https://www.oreilly.com/library/view/the-art-of/9781492045687/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/the-art-of/9781492045687/</a></li>
            <li><span class="ref-name">Camille Fournier, The Manager's Path: A Guide for Tech Leaders Navigating Growth and Change, O'Reilly Media</span><a class="ref-url" href="https://www.oreilly.com/library/view/the-managers-path/9781491973882/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/the-managers-path/9781491973882/</a></li>
            <li><span class="ref-name">Gergely Orosz, The Software Engineer's Guidebook</span><a class="ref-url" href="https://www.engguidebook.com/" target="_blank" rel="noopener">https://www.engguidebook.com/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>ブログ・ニュースレター</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Michael Lopp, "How to Rands", Rands in Repose</span><a class="ref-url" href="https://randsinrepose.com/archives/how-to-rands/" target="_blank" rel="noopener">https://randsinrepose.com/archives/how-to-rands/</a></li>
            <li><span class="ref-name">Will Larson, Irrational Exuberance(個人ブログ、Imprint CTO・元Carta CTO)</span><a class="ref-url" href="https://lethain.com/" target="_blank" rel="noopener">https://lethain.com/</a></li>
            <li><span class="ref-name">Will Larson, "Engineering manager archetypes"</span><a class="ref-url" href="https://lethain.com/engineering-manager-archetypes/" target="_blank" rel="noopener">https://lethain.com/engineering-manager-archetypes/</a></li>
            <li><span class="ref-name">Gergely Orosz, The Pragmatic Engineer(ニュースレター)</span><a class="ref-url" href="https://newsletter.pragmaticengineer.com/" target="_blank" rel="noopener">https://newsletter.pragmaticengineer.com/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>フレームワーク・調査</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Kim Scott, Radical Candor(公式サイト、フレームワーク解説)</span><a class="ref-url" href="https://www.radicalcandor.com/our-approach" target="_blank" rel="noopener">https://www.radicalcandor.com/our-approach</a></li>
            <li><span class="ref-name">Google re:Work, "Following the data: The research behind great managers"(Project Oxygen / Project Aristotle)</span><a class="ref-url" href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener">https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers</a></li>
          </ul>
        </div>

        <p class="prose-note">本ガイドは上記ソースの内容を要約・言い換えて構成したものであり、原文からの引用は最小限に留めています。より詳しい内容は各リンク先の一次情報をご参照ください。</p>
      </section>

      <footer>
        &copy; リーダーの作法 実践ガイド。本ページは教育目的の非公式資料であり、引用元の著作権は各権利者に帰属します。書籍・記事名は各社・各著者の商標または著作物です。
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

.sidebar-nav li { margin: 2px 0; }

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

.sidebar-nav a :deep(.iconify) {
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

.sidebar-nav a.active :deep(.iconify) { color: var(--color-indigo); }

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

.hero-eyebrow :deep(.iconify) { font-size: 17px; }

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
  grid-template-columns: repeat(4, minmax(140px, 1fr));
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
  color: var(--color-ink-soft);
  margin-top: 6px;
}

.disclaimer-box {
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 16px;
  margin-top: 28px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  line-height: 1.6;
}

.disclaimer-box :deep(.iconify) {
  flex: none;
  font-size: 20px;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}

.disclaimer-box a {
  color: var(--color-indigo);
  font-weight: 600;
}

section {
  margin: 72px 0;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

section:first-of-type { margin-top: 0; }

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink-faint);
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

.section-eyebrow :deep(.iconify) { font-size: 17px; }

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 29px;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  color: var(--color-ink);
  margin: 40px 0 16px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p { margin: 0 0 18px; }

ul, ol { margin: 0 0 18px; padding-left: 24px; }
li { margin-bottom: 8px; }

strong { font-weight: 600; color: var(--color-ink); }

/* ===================== Tables ===================== */
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  margin: 0 0 24px;
  max-width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 16px;
}

thead th {
  background: var(--color-paper-sunken);
  text-align: left;
  font-weight: 600;
  color: var(--color-ink);
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-strong);
  white-space: nowrap;
}

tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-ink-soft);
  vertical-align: top;
}

tbody tr:last-child td { border-bottom: none; }
tbody tr:nth-child(even) { background: var(--color-paper); }

td strong, th strong { color: var(--color-ink); }

/* ===================== Callouts ===================== */
.callout {
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-indigo);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 20px 24px;
  margin: 28px 0;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  color: var(--color-indigo);
  margin-bottom: 10px;
}

.callout-title :deep(.iconify) { font-size: 18px; }

.callout ul { margin-bottom: 0; padding-left: 20px; }
.callout p:last-child { margin-bottom: 0; }

.callout.practice { border-left-color: var(--color-gold); }
.callout.practice .callout-title { color: var(--color-gold); }

/* ===================== Diagram containers ===================== */
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

.mermaid-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* ===================== Reference list ===================== */
.ref-group { margin-bottom: 28px; }
.ref-group h3 { margin-top: 0; }
.ref-list { list-style: none; margin: 0; padding: 0; }
.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 16px;
}
.ref-list li:last-child { border-bottom: none; }
.ref-list .ref-name { color: var(--color-ink); font-weight: 500; display: block; margin-bottom: 2px; }
.ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; text-decoration: none; }
.ref-list .ref-url:hover { text-decoration: underline; }

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
}

.prose-note { color: var(--color-ink-faint); font-size: 16px; }

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle { display: flex; }
  .sidebar {
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.2s ease, visibility 0.2s ease;
    box-shadow: none;
  }
  .sidebar.open { transform: translateX(0); visibility: visible; }
  .main-content { margin-left: 0; padding: 88px 24px 100px; }
  .hero h1 { font-size: 32px; }
  .stat-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .stat-row { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar { transition: none; }
}
</style>
