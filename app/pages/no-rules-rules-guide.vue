<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "book-background",
  "netflix-cycle",
  "talent-density",
  "candor",
  "reduce-controls",
  "chapter-overview",
  "engineering-application",
  "cautions",
  "developer-voices",
  "summary",
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
  title: "『NO RULES RULES』完全ガイド | Netflixのカルチャーを初学者向けに解説",
  description:
    "Reed HastingsとErin Meyer著『No Rules Rules』を初学者向けに要約。タレント・デンシティ、率直なフィードバック、コントロールの撤廃という3つの原則と、ソフトウェア開発チームへの応用ステップをMermaid図解と表で解説します。",
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

const DIAGRAM_NETFLIX_CYCLE = `flowchart LR
A["1 タレントデンシティを高める"] --> B["2 率直さを高める"]
B --> C["3 コントロールを減らす"]
C -->|組織の成長とともに繰り返す| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C box;`;

const DIAGRAM_KEEPER_TEST = `flowchart TD
Q{"このメンバーが転職すると言ったら 全力で引き止めるか"}
Q -->|はい| A["投資を続け 裁量や成長機会を広げる"]
Q -->|いいえ| B["敬意を持って送り出す準備をする"]
B --> C["空いたポジションに優秀な人材を採用する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Q hub;
class A,B,C box;`;

const DIAGRAM_INFORMED_CAPTAIN = `flowchart TD
    subgraph OLD["従来型組織 コントロール型"]
        M1[マネージャー] -->|承認が必要| E1[意思決定]
        E1 --> D1[実行が遅くなる]
    end
    subgraph NEW["Netflix型組織 コンテキスト型"]
        M2[リーダー] -->|背景 目的 制約を共有| E2["Informed Captain 現場の担当者"]
        E2 -->|自律的に意思決定| D2[高速に実行]
        D2 --> S{"うまくいったか"}
        S -->|成功| G[称賛し横展開]
        S -->|失敗| SUN["Sunshining 失敗を公開し学びに変える"]
    end

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class M1,E1,D1,M2,E2,D2,SUN box;
class S hub;
class G done;`;

const DIAGRAM_ROLLOUT_STEPS = `flowchart LR
S1["Step1 採用基準を上げる"] --> S2["Step2 フィードバック文化をつくる"]
S2 --> S3["Step3 権限移譲を進める"]
S3 --> S4["Step4 承認プロセスを削減する"]
S4 --> S5["Step5 透明性を高める"]
S5 --> S6["Step6 チーム構成を見直す"]
S6 -.->|継続的改善| S1

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6 box;`;
</script>

<template>
  <div>
    <a href="#main-content" class="skip-link">本文へスキップ</a>

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
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div class="layout">
      <!-- ===================== Sidebar ===================== -->
      <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="brand-text">
            <div class="brand-title">NO RULES RULES ガイド</div>
            <div class="brand-subtitle">Netflix式カルチャー解説</div>
          </div>
        </div>

        <ul class="sidebar-nav" @keydown.escape="closeSidebar">
          <li>
            <a
              href="#book-background"
              :class="{ active: activeId === 'book-background' }"
              :aria-current="activeId === 'book-background' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:book-2" aria-hidden="true" />1. この本の背景と著者
            </a>
          </li>
          <li>
            <a
              href="#netflix-cycle"
              :class="{ active: activeId === 'netflix-cycle' }"
              :aria-current="activeId === 'netflix-cycle' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:refresh" aria-hidden="true" />2. Netflixサイクル
            </a>
          </li>
          <li>
            <a
              href="#talent-density"
              :class="{ active: activeId === 'talent-density' }"
              :aria-current="activeId === 'talent-density' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:users" aria-hidden="true" />3. タレント・デンシティ
            </a>
          </li>
          <li>
            <a
              href="#candor"
              :class="{ active: activeId === 'candor' }"
              :aria-current="activeId === 'candor' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:message-circle" aria-hidden="true" />4. 率直さ（キャンダー）
            </a>
          </li>
          <li>
            <a
              href="#reduce-controls"
              :class="{ active: activeId === 'reduce-controls' }"
              :aria-current="activeId === 'reduce-controls' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:adjustments" aria-hidden="true" />5. コントロールを減らす
            </a>
          </li>
          <li>
            <a
              href="#chapter-overview"
              :class="{ active: activeId === 'chapter-overview' }"
              :aria-current="activeId === 'chapter-overview' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:list-check" aria-hidden="true" />6. チャプター早見表
            </a>
          </li>
          <li>
            <a
              href="#engineering-application"
              :class="{ active: activeId === 'engineering-application' }"
              :aria-current="activeId === 'engineering-application' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:code" aria-hidden="true" />7. 開発チームへの応用
            </a>
          </li>
          <li>
            <a
              href="#cautions"
              :class="{ active: activeId === 'cautions' }"
              :aria-current="activeId === 'cautions' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:alert-triangle" aria-hidden="true" />8. 注意点・批判的視点
            </a>
          </li>
          <li>
            <a
              href="#developer-voices"
              :class="{ active: activeId === 'developer-voices' }"
              :aria-current="activeId === 'developer-voices' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:quote" aria-hidden="true" />9. 開発者・エンジニアの声
            </a>
          </li>
          <li>
            <a
              href="#summary"
              :class="{ active: activeId === 'summary' }"
              :aria-current="activeId === 'summary' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:flag-3" aria-hidden="true" />10. まとめ
            </a>
          </li>
          <li>
            <a
              href="#references"
              :class="{ active: activeId === 'references' }"
              :aria-current="activeId === 'references' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:link" aria-hidden="true" />11. 参考文献
            </a>
          </li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main id="main-content" class="main-content" tabindex="-1">
        <div class="hero">
          <div class="hero-eyebrow">
            <Icon name="tabler:award" aria-hidden="true" />書籍解説ガイド
          </div>
          <h1>『NO RULES RULES』完全ガイド</h1>
          <p class="hero-lede">
            Netflix共同創業者リード・ヘイスティングスとINSEAD教授エリン・メイヤーが説く、規則に頼らない自由な組織文化のつくり方を、ソフトウェアエンジニアリング組織への応用を交えて初学者向けにステップバイステップで解説します。
          </p>

          <div class="stat-row">
            <div class="stat-card">
              <div class="stat-number">2020年</div>
              <div class="stat-label">原著刊行年</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">3ステップ</div>
              <div class="stat-label">循環するNetflixサイクル</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">200人以上</div>
              <div class="stat-label">取材したNetflix従業員数</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">最終候補</div>
              <div class="stat-label">2020 FT&amp;McKinsey ビジネス書大賞</div>
            </div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <div>
              本ページはAIによるリサーチに基づく非公式の解説資料であり、原著の逐語引用は行っていません。正確な内容は必ず原著 <a href="https://www.norulesrules.com/" target="_blank" rel="noopener">No Rules Rules: Netflix and the Culture of Reinvention</a>（Reed Hastings, Erin Meyer 著）をご確認ください。
            </div>
          </div>
        </div>

        <!-- ===================== 1. Book Background ===================== -->
        <section id="book-background">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:book-2" aria-hidden="true" />SECTION 01
          </div>
          <h2>この本の背景と著者</h2>

          <h3>リード・ヘイスティングスとは</h3>
          <p>リード・ヘイスティングスは1997年にNetflixを共同創業し、会長・共同CEOを務めた人物です。もともとはソフトウェアエンジニア出身で、Netflix以前の1991年に「Pure Software」という会社（Unix/C言語向けデバッグツール「Purify」を開発）を創業しています。</p>
          <p>Pure Softwareは急成長する過程でミスが起こるたびに新しいルールや承認プロセスを追加していった結果、官僚的で創造性に乏しい組織になってしまい、プログラミング言語のトレンドがC++からJavaへ移行する変化に対応できず、最終的に競合のRational Softwareに売却することになりました。この経験からヘイスティングスは「ルールや管理を増やすことが、かえって企業の適応力を奪う」という教訓を得て、Netflixでは正反対のアプローチ――自由と責任（Freedom &amp; Responsibility）を軸にした文化――を意図的に築いていきました。</p>

          <h3>エリン・メイヤーとは</h3>
          <p>エリン・メイヤーは、フランスの名門ビジネススクールINSEADの教授で、異文化マネジメントの世界的権威です。ベストセラー『異文化理解力（The Culture Map）』の著者でもあり、2019年には「世界で最も影響力のあるビジネス思想家50人」の一人に選出されています。本書では、200人以上のNetflix従業員へのインタビューを行い、ヘイスティングスの主張を検証・肉付けする役割を担いました。</p>

          <h3>本書の位置づけ</h3>
          <ul>
            <li>2020年刊行、Financial Times &amp; McKinsey ビジネス書大賞の最終候補</li>
            <li>2020年10月にニューヨーク・タイムズ・ベストセラー入り</li>
            <li>Netflixが公開し、Facebook（当時）のCOOシェリル・サンドバーグが「シリコンバレーから出た中で最も重要な文書」と評したとされる「カルチャーデック」（127枚のスライド）の内容を、体系立てて書籍化したもの</li>
          </ul>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label">
              <Icon name="tabler:external-link" aria-hidden="true" />ソース
            </div>
            <ul>
              <li><a href="https://erinmeyer.com/books/no-rules-rules/" target="_blank" rel="noopener">Erin Meyer公式サイト</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Erin_Meyer" target="_blank" rel="noopener">Erin Meyer - Wikipedia</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 2. Netflix Cycle ===================== -->
        <section id="netflix-cycle">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:refresh" aria-hidden="true" />SECTION 02
          </div>
          <h2>核となる考え方：Netflixサイクル</h2>

          <p>本書の中心的なメッセージは、以下の3ステップの循環プロセスを繰り返すことで、統制（コントロール）に頼らない自由な組織文化を築けるというものです。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram
                  :chart="DIAGRAM_NETFLIX_CYCLE"
                  theme="base"
                  :theme-variables="MERMAID_THEME_VARIABLES"
                />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中...</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">タレント・デンシティ、率直さ、コントロールの撤廃が循環するNetflixサイクル</div>
          </div>

          <p>重要なのは、これが一度きりの改革ではなく、繰り返すサイクルだという点です。Netflixは「DVD郵送レンタル → ストリーミング配信 → オリジナルコンテンツ制作 → グローバル展開」という4回の大きな事業転換を経験してきましたが、そのたびにこのサイクルを回すことで組織文化を再構築してきました。</p>

          <div class="callout note" data-variant="note" data-testid="callout">
            <div class="callout-title" data-testid="callout-label">
              <Icon name="tabler:info-circle" aria-hidden="true" />補足
            </div>
            <p>なぜこの順番なのか？ いきなり管理を外すと組織は崩壊します。まず「優秀な人材」を集め、次に「本音で言い合える関係性」を築いて初めて、安心して「管理を手放す」ことができる、という因果関係になっています。</p>
          </div>
        </section>

        <!-- ===================== 3. Talent Density ===================== -->
        <section id="talent-density">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:users" aria-hidden="true" />SECTION 03
          </div>
          <h2>ステップ1：タレント・デンシティ（人材密度）を高める</h2>

          <h3>基本コンセプト</h3>
          <p>タレント・デンシティとは、「平均的な人材を大勢集める」のではなく「卓越した少数精鋭（Netflixの言葉で"stunning colleagues"＝輝く同僚）」を集めるという考え方です。</p>
          <p>Netflixが重視するのは、パフォーマンスは伝染するという事実です。優秀な人材の周りにいると、他のメンバーも引き上げられて成長しますが、逆に平凡・低パフォーマンスな人材がいると、周囲のモチベーションやアウトプットの質を静かに引き下げてしまいます。</p>
          <p>ソフトウェア開発の世界でしばしば語られる「優秀なプログラマーと平均的なプログラマーの生産性には、数倍〜数十倍の差がある」という趣旨の議論（いわゆる「ロックスター・プログラマー」論）も、本書内で人材密度の重要性を裏付ける例として紹介されています。</p>

          <h3>具体的な実践方法</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>実践項目</th><th>内容</th></tr>
              </thead>
              <tbody>
                <tr><td>市場最高水準の報酬を支払う</td><td>ボーナスではなく基本給で、個人の市場価値の最高水準を払う。ボーナスは「決められた行動」を促すため、柔軟性を損なうと考えられている</td></tr>
                <tr><td>キーパーテストを使う</td><td>マネージャーが定期的に「このメンバーが辞めると言ったら、全力で引き止めるか？」を自問する</td></tr>
                <tr><td>十分なパフォーマンスでも入れ替える</td><td>「及第点（Adequate）」の人材には、手厚い退職金を払って気持ちよく卒業してもらい、より優れた人材を採用する</td></tr>
              </tbody>
            </table>
          </div>

          <h3>キーパーテストの意思決定フロー</h3>
          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram
                  :chart="DIAGRAM_KEEPER_TEST"
                  theme="base"
                  :theme-variables="MERMAID_THEME_VARIABLES"
                />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中...</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">マネージャーが定期的に自問する、キーパーテストの意思決定フロー</div>
          </div>

          <p>初学者向けの補足として、これは「冷酷なリストラ推奨」ではなく、「本人にとっても、より合ったポジションを探すきっかけになる」という前提のもとに語られている点に注意してください（後述する批判点も参照）。</p>
        </section>

        <!-- ===================== 4. Candor ===================== -->
        <section id="candor">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:message-circle" aria-hidden="true" />SECTION 04
          </div>
          <h2>ステップ2：率直さ（キャンダー）を高める</h2>

          <h3>なぜ率直さが必要か</h3>
          <p>タレント・デンシティが高い組織では、遠慮のない率直なフィードバックが機能しやすくなります。本書では「率直さは歯医者に行くようなもの――多少痛くても、放置すると後で大きな問題になる」という趣旨の比喩で説明されています。</p>
          <p>Netflixでは、上司にだけ意見を言うのではなく、あらゆる方向（部下→上司、同僚→同僚含む）へのフィードバックが奨励されており、上司の意見に対してミーティング中に反対意見を述べることも「当然の行動」とされています。言い換えれば、気づいた問題を黙っていることの方が「組織への裏切り」とみなされる文化です。</p>

          <h3>4Aフィードバックモデル</h3>
          <p>率直さが単なる「攻撃」や「人格否定」にならないよう、Netflixでは以下の4つの原則（4A）でフィードバックの質を担保しています。</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>記号</th><th>英語</th><th>意味</th><th>誰の役割か</th></tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>Aim to Assist（助けるために）</td><td>個人攻撃ではなく、相手やチームの成功を助ける意図で伝える</td><td>フィードバックを送る側</td></tr>
                <tr><td>A</td><td>Actionable（行動可能な）</td><td>具体的に何を変えれば良いかが分かる内容にする</td><td>フィードバックを送る側</td></tr>
                <tr><td>A</td><td>Appreciate（感謝する）</td><td>防御的にならず、まず感謝の姿勢で受け止める</td><td>フィードバックを受ける側</td></tr>
                <tr><td>A</td><td>Accept or Discard（受け入れるか、取捨選択する）</td><td>フィードバックをすべて鵜呑みにする必要はなく、最終判断は本人に委ねられる</td><td>フィードバックを受ける側</td></tr>
              </tbody>
            </table>
          </div>

          <h3>サンシャイニングと反対意見の奨励</h3>
          <p>本書ではさらに次の2つの実践が紹介されています。</p>
          <ul>
            <li><strong>サンシャイニング（Sunshining）：</strong>失敗や間違いを隠すのではなく、あえて日の光の下にさらして共有し、組織全体の学びに変える実践</li>
            <li><strong>反対意見を積極的に集める（Farming for Dissent）：</strong>大きな意思決定の前に、あえて反対意見を求めて回り、盲点をつぶしてから前に進む姿勢</li>
          </ul>
          <p>なお、率直さの表現方法には文化差があることにも本書は触れています。共著者エリン・メイヤーの専門である異文化理解の知見を踏まえ、「直接的な物言いを好む文化」と「婉曲的な表現を好む文化」でフィードバックの伝え方を調整する必要性が語られています（後述の開発者レビューでも、オランダ文化の直接性などが具体例として言及されています）。</p>
        </section>

        <!-- ===================== 5. Reduce Controls ===================== -->
        <section id="reduce-controls">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:adjustments" aria-hidden="true" />SECTION 05
          </div>
          <h2>ステップ3：コントロール（管理・統制）を減らす</h2>

          <h3>基本方針：「コントロール」ではなく「コンテキスト」を与える</h3>
          <p>タレント・デンシティと率直さの土台ができて初めて、Netflixは規則や承認プロセスを取り除いていきます。ここでのキーコンセプトが「コンテキストで導く、コントロールでは導かない（Lead with Context, Not Control）」です。</p>
          <p>リーダーの役割は「決裁者」ではなく、「意思決定に必要な背景情報・目的・制約条件を与える人」に変わります。実際の意思決定は、現場でその判断を下すのに最も適した人物――本書ではインフォームド・キャプテン（Informed Captain）と呼ばれる――に委ねられます。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram
                  :chart="DIAGRAM_INFORMED_CAPTAIN"
                  theme="base"
                  :theme-variables="MERMAID_THEME_VARIABLES"
                />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中...</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">従来型のコントロール型組織と、Netflix型のコンテキスト型組織（インフォームド・キャプテン方式）の比較</div>
          </div>

          <h3>具体的に撤廃される代表的な規則</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>規則</th><th>従来型企業</th><th>Netflix</th></tr>
              </thead>
              <tbody>
                <tr><td>休暇ポリシー</td><td>年間日数が規定され、事前承認が必要</td><td>明文化された日数の上限はなく、上司と相談しながら自分で判断する</td></tr>
                <tr><td>出張・経費承認</td><td>上長の事前承認や上限額のルールが必要</td><td>「Netflixの利益を最優先に考えて行動する」という原則のみで、個別承認は不要</td></tr>
                <tr><td>意思決定の承認</td><td>稟議・複数階層の承認フローが必須</td><td>現場のInformed Captainが、周囲に意見を求めた上で自ら決定する</td></tr>
                <tr><td>評価・ボーナス制度</td><td>目標達成度に応じた個人ボーナス</td><td>個人ボーナス無し。市場水準の基本給で報いる</td></tr>
              </tbody>
            </table>
          </div>

          <h3>なぜこれが機能するのか</h3>
          <p>本書は、これらの施策が「単独の福利厚生」ではなく、信頼のシグナルとして機能していると説明しています。会社が従業員を信頼して裁量を渡すことで、従業員側も「信頼に応えよう」という責任感を強め、結果的により責任ある行動につながる、という因果の連鎖です。</p>
          <p>ただし本書自身も、リーダーが自ら長期休暇を取って手本を見せなければ「誰も本当に休暇を取らなくなる」「休暇日数の少なさを競い合う」といった副作用が起こり得ることを認めています。制度だけでなく、リーダーの行動が伴って初めて機能する点は重要な注意点です。</p>
        </section>

        <!-- ===================== 6. Chapter Overview ===================== -->
        <section id="chapter-overview">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:list-check" aria-hidden="true" />SECTION 06
          </div>
          <h2>本の構成（チャプター早見表）</h2>

          <p>初学者が原著を読む際の見取り図として、章立てと対応するテーマをまとめました。</p>

          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>原題（要約）</th><th>対応するテーマ</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>A Great Workplace Is Stunning Colleagues</td><td>タレント・デンシティの重要性</td></tr>
                <tr><td>2</td><td>Say What You Really Think (with Positive Intent)</td><td>率直なフィードバック文化</td></tr>
                <tr><td>3a</td><td>Remove Vacation Policy</td><td>休暇ポリシーの撤廃</td></tr>
                <tr><td>3b</td><td>Remove Travel and Expense Approvals</td><td>経費承認プロセスの撤廃</td></tr>
                <tr><td>4</td><td>Pay Top of Personal Market</td><td>市場最高水準の報酬</td></tr>
                <tr><td>5</td><td>Open the Books</td><td>経営情報の透明化</td></tr>
                <tr><td>6</td><td>No Decision-Making Approvals Needed</td><td>意思決定の承認撤廃</td></tr>
                <tr><td>7</td><td>The Keeper Test</td><td>キーパーテストによる人材の見直し</td></tr>
                <tr><td>8</td><td>A Circle of Feedback</td><td>360度フィードバックの仕組み化</td></tr>
                <tr><td>9</td><td>Lead with Context, Not Control</td><td>コンテキスト型リーダーシップ</td></tr>
                <tr><td>10</td><td>Bring It All to the World!</td><td>文化のグローバル展開</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label">
              <Icon name="tabler:external-link" aria-hidden="true" />ソース
            </div>
            <ul>
              <li><a href="https://www.bookey.app/book/no-rules-rules" target="_blank" rel="noopener">Bookey（章立て参照）</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 7. Engineering Application ===================== -->
        <section id="engineering-application">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:code" aria-hidden="true" />SECTION 07
          </div>
          <h2>ソフトウェア開発チームへの応用ガイド</h2>

          <p>ここからは、世界トップクラスのソフトウェアエンジニア／プロジェクトマネージャーの視点から、本書のエッセンスをエンジニアリング組織で実践するためのステップバイステップガイドを示します。いきなり全てを真似るのではなく、段階的に導入することが重要です。</p>

          <div class="diagram-card">
            <div class="mermaid-wrap">
              <ClientOnly>
                <MermaidDiagram
                  :chart="DIAGRAM_ROLLOUT_STEPS"
                  theme="base"
                  :theme-variables="MERMAID_THEME_VARIABLES"
                />
                <template #fallback>
                  <p class="diagram-loading">図を読み込み中...</p>
                </template>
              </ClientOnly>
            </div>
            <div class="diagram-caption">ソフトウェア開発チームへの段階的な導入ステップ（継続的に繰り返す）</div>
          </div>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">採用基準を上げ、タレント・デンシティを可視化する</div>
                <div class="step-desc">
                  <ul>
                    <li>コードレビューやペアプログラミングでの技術面接を強化し、「一緒に働きたい／このチームに誇りを持てる」水準の人材だけを採用する</li>
                    <li>チームメンバー自身が採用プロセスに関わる仕組みを作る（採用の当事者意識を高める）</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">ブレームレス・ポストモーテム（＝サンシャイニングの実践）を導入する</div>
                <div class="step-desc">
                  <ul>
                    <li>障害対応後の振り返り（ポストモーテム）を「誰が悪いか」ではなく「何が起きたか・どう防ぐか」に焦点化する</li>
                    <li>インシデントの詳細をチーム全体、可能なら社内全体に共有し、同じ失敗を他チームが繰り返さないようにする</li>
                    <li>1on1やスプリントレトロスペクティブで、4Aモデル（助けるため・行動可能・感謝して受け止める・取捨選択できる）を明示的にルール化する</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">意思決定の権限をチームに委譲する</div>
                <div class="step-desc">
                  <ul>
                    <li>技術選定は、実際にコードを書くエンジニアチームが「RFC（Request for Comments）」形式で提案し、関係者から意見を募った上で自分たちで決定する仕組みを作る</li>
                    <li>マネージャーやテックリードの役割を「承認者」から「コンテキスト（ビジネス背景・制約・優先順位）を提供する人」へ再定義する</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">承認プロセスを段階的に削減する</div>
                <div class="step-desc">
                  <ul>
                    <li>例：本番デプロイの承認フローを、テストカバレッジやCIの合格を条件に自動化・簡略化する</li>
                    <li>例：一定額以下の開発ツール購入や外部サービス契約について、事後報告制に変更する</li>
                    <li>一気に全廃するのではなく、信頼できる範囲（チーム、金額、影響範囲）から段階的に緩めていく</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">5</div>
              <div class="step-body">
                <div class="step-title">透明性を高める</div>
                <div class="step-desc">
                  <ul>
                    <li>ロードマップ、OKR、障害対応記録、技術的負債のバックログなどをできる限りオープンにする</li>
                    <li>経営指標やプロダクト指標をエンジニアにも共有し、「なぜこの機能を作るのか」というコンテキストを提供する</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">6</div>
              <div class="step-body">
                <div class="step-title">定期的にチーム構成を見直す（キーパーテストの応用）</div>
                <div class="step-desc">
                  <ul>
                    <li>マネージャーが半期に一度、「このメンバーが転職を検討していると聞いたら、引き止めるために何をするか」を自問する運用ルールを作る</li>
                    <li>「及第点」のパフォーマンスに安住させず、成長機会の提示か、円満な移行支援かのどちらかを早めに判断する</li>
                  </ul>
                </div>
              </div>
            </li>
          </ol>
        </section>

        <!-- ===================== 8. Cautions ===================== -->
        <section id="cautions">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 08
          </div>
          <h2>導入時の注意点・批判的視点</h2>

          <p>本書は高く評価される一方で、実務家や読者からは以下のような懸念点も指摘されています。バランスの取れた理解のために整理します。</p>

          <h3>前提条件が厳しい</h3>
          <p>Netflixの「管理を外す」施策は、すでに高いタレント・デンシティと信頼関係が築かれていることが大前提です。ある開発者ブログのレビューでは、経費承認なしの制度を数年間悪用し、豪華な出張や食事を繰り返していた社員のエピソードが紹介されており、性善説だけに頼る仕組みにはリスクも伴うことが示唆されています。</p>

          <h3>文化として「厳しすぎる」という声もある</h3>
          <p>Goodreadsの読者レビューの中には、Netflixのカルチャーデックを「過度に対立的で、攻撃的だ」と感じたという声もあり、率直さの文化が心理的安全性を損なう可能性への懸念が指摘されています。フィードバック文化を導入する際は、ポジティブな評価や心理的な安心感とのバランスを意識する必要があります。</p>

          <h3>ソフトウェア開発の具体的な手法にはあまり触れていない</h3>
          <p>複数の開発者によるレビューでは、本書はあくまで「企業文化・人事制度」に焦点を当てた内容であり、Netflixのエンジニアリング組織が実際にどのような開発プロセスやアーキテクチャを採用しているかについては、ほとんど触れられていない点が指摘されています。技術的な実践を学びたい場合は、Netflix Tech Blogなど別のソースを参照する必要があります。</p>

          <h3>全ての組織に当てはまるわけではない</h3>
          <p>本書自身も「これはNetflixというユニークな文脈で機能した処方箋であり、万能の正解ではない」という留保をつけています。会社の規模、業種、資金状況、法規制環境によっては、そのまま適用するとむしろリスクになる施策（無制限休暇、経費承認廃止など）も含まれるため、「自社にとってどこまで移植可能か」を慎重に見極めることが推奨されます。</p>
        </section>

        <!-- ===================== 9. Developer Voices ===================== -->
        <section id="developer-voices">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:quote" aria-hidden="true" />SECTION 09
          </div>
          <h2>世界の開発者・エンジニアの声</h2>

          <p>書評サイトやニュースレターから、実際にソフトウェアエンジニアとして働く著者たちのコメントを紹介します（要約・パラフレーズ）。</p>

          <ul>
            <li><strong>Luca Rossi</strong>（エンジニアリングリーダー向けニュースレター「Refactoring」主宰、元CTO）は、本書を「普遍的なルール集ではなく、Netflixという特定の文脈で機能する“特定の処方箋”を説明した本」と位置づけ、読者が自社にそのまま当てはめるのではなく、批判的に検討しながら活用すべきだと論じています。</li>
            <li><strong>DEV Community</strong>のレビュー（開発者 sirech 氏）では、率直なフィードバック文化についての章を高く評価しつつも、フィードバックの伝え方には文化差（例：オランダ文化の直接的な物言い）があることを学べた点を評価しています。一方で、ソフトウェア開発そのものに関する記述が少ない点を残念な点として挙げています。</li>
            <li>ソフトウェアエンジニアの<strong>Mario Fernandez</strong>氏は、Netflixの文化を「思いやりのあるダーウィニズム（compassionate Darwinism）」と表現し、高いパフォーマンスを求めつつも実験や自律的意思決定を促す文化のバランスを評価しています。</li>
            <li>スタッフエンジニアの<strong>Cody Hiar</strong>氏は、「賭け（bets）を立てて実行し、失敗したらサンシャイニングする」というNetflix流の意思決定プロセスを、自身がスタッフエンジニアに昇進する過程で実際に活用したと述べています。</li>
            <li>エンジニアの個人ブログ（ernest.oppet.it）では、経費承認なしの制度のおかげで、あるエンジニアが『ハウス・オブ・カード』のローンチ前夜に急遽購入した新型Samsung TVでアプリのデバッグを行い、ローンチを救ったエピソードが紹介されています。</li>
          </ul>
        </section>

        <!-- ===================== 10. Summary ===================== -->
        <section id="summary">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:flag-3" aria-hidden="true" />SECTION 10
          </div>
          <h2>まとめ：あなたのチームは何から始めるべきか</h2>

          <p>『NO RULES RULES』の核心は、「ルールを無くすこと」自体が目的ではなく、「優秀な人材」「率直な対話」「信頼に基づく自律性」という3つの土台を順番に積み上げることで、結果的にルールが不要になっていくというプロセスにあります。</p>

          <p>初学者・小規模チームがまず取り組みやすいステップは、以下の3つです。</p>
          <ol>
            <li><strong>フィードバックの質を上げる：</strong>4Aモデルを1on1やレトロスペクティブに取り入れる（コストが低く、すぐ始められる）</li>
            <li><strong>ブレームレスな振り返り文化を作る：</strong>障害対応やプロジェクトの失敗を「誰の責任か」ではなく「仕組みの改善」として扱う</li>
            <li><strong>小さな承認プロセスから権限委譲する：</strong>影響範囲が小さい意思決定から、現場に判断を委ねる練習を始める</li>
          </ol>

          <p>大きな制度改革（無制限休暇、経費承認の全廃など）は、これらの土台が組織に根付いてから、慎重に検討することをお勧めします。</p>
        </section>

        <!-- ===================== 11. References ===================== -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow">
            <Icon name="tabler:link" aria-hidden="true" />SECTION 11
          </div>
          <h2>参考文献・ソースURL</h2>

          <p>以下は本ガイド作成にあたり参照した情報源です（2026年8月時点でアクセス確認）。</p>

          <div class="ref-group">
            <h3>公式情報</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Erin Meyer公式サイト（著者本人による書籍紹介）</span><a class="ref-url" href="https://erinmeyer.com/books/no-rules-rules/" target="_blank" rel="noopener">https://erinmeyer.com/books/no-rules-rules/</a></li>
              <li><span class="ref-name">Netflix公式ニュース「'No Rules Rules' explores how Netflix reinvented work culture」</span><a class="ref-url" href="https://about.netflix.com/en/news/no-rules-rules-explores-how-netflix-reinvented-work-culture" target="_blank" rel="noopener">https://about.netflix.com/en/news/no-rules-rules-explores-how-netflix-reinvented-work-culture</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>百科事典</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Erin Meyer - Wikipedia</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Erin_Meyer" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Erin_Meyer</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>読者レビュー</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Goodreads（読者レビュー・批判的意見を含む）</span><a class="ref-url" href="https://www.goodreads.com/book/show/49099937-no-rules-rules" target="_blank" rel="noopener">https://www.goodreads.com/book/show/49099937-no-rules-rules</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>ビジネス書要約</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Admired Leadership「No Rules Rules」書籍要約</span><a class="ref-url" href="https://admiredleadership.com/book-summaries/no-rules-rules/" target="_blank" rel="noopener">https://admiredleadership.com/book-summaries/no-rules-rules/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>著名エンジニアリングリーダーによる書評</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Luca Rossi「No Rules Rules」（ニュースレター Refactoring、元CTOのエンジニアリングリーダー）</span><a class="ref-url" href="https://refactoring.fm/p/no-rules-rules" target="_blank" rel="noopener">https://refactoring.fm/p/no-rules-rules</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>開発者コミュニティ</h3>
            <ul class="ref-list">
              <li><span class="ref-name">DEV Community（開発者 sirech 氏による書評）</span><a class="ref-url" href="https://dev.to/sirech/book-review-no-rules-rules-netflix-and-the-culture-of-reinvention-3d5g" target="_blank" rel="noopener">https://dev.to/sirech/book-review-no-rules-rules-netflix-and-the-culture-of-reinvention-3d5g</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>開発者ブログ</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Mario Fernandez氏（ソフトウェアエンジニア）の書評</span><a class="ref-url" href="https://hceris.com/book-review-no-rules-rules-netflix/" target="_blank" rel="noopener">https://hceris.com/book-review-no-rules-rules-netflix/</a></li>
              <li><span class="ref-name">Cody Hiar氏（スタッフエンジニア）の書評</span><a class="ref-url" href="https://www.codyhiar.com/blog/book-review-no-rules-rules/" target="_blank" rel="noopener">https://www.codyhiar.com/blog/book-review-no-rules-rules/</a></li>
              <li><span class="ref-name">ernest.oppet.it（エンジニアの読書ノート）</span><a class="ref-url" href="https://ernest.oppet.it/2021/02/22/no-rules-rules/" target="_blank" rel="noopener">https://ernest.oppet.it/2021/02/22/no-rules-rules/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>報道機関</h3>
            <ul class="ref-list">
              <li><span class="ref-name">NPR「No Rules Rules」関連報道アーカイブ</span><a class="ref-url" href="https://www.npr.org/tags/912917743/no-rules-rules/archive" target="_blank" rel="noopener">https://www.npr.org/tags/912917743/no-rules-rules/archive</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>書籍要約サービス</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Bookey（章立て参照）</span><a class="ref-url" href="https://www.bookey.app/book/no-rules-rules" target="_blank" rel="noopener">https://www.bookey.app/book/no-rules-rules</a></li>
            </ul>
          </div>
        </section>

        <footer>
          本ページはAIによる教育目的の非公式解説であり、公式のNetflixまたは出版社のコンテンツではありません。『No Rules Rules』および関連する商標は、著者およびPenguin Random House LLCに帰属します。本文の逐語引用は行っておらず、正確な理解のためには必ず原著をお読みください。最終更新: 2026年8月。
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -48px;
  left: 0;
  z-index: 40;
  background: var(--color-paper-raised);
  color: var(--color-indigo);
  padding: 12px 20px;
  border: 1px solid var(--color-border);
  border-radius: 0 0 8px 0;
  transition: top 0.15s ease;
}
.skip-link:focus {
  top: var(--global-nav-height);
}

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

.sidebar-nav a :deep(svg),
.sidebar-nav a :deep(span) {
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

.sidebar-nav a.active :deep(svg),
.sidebar-nav a.active :deep(span) {
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
  color: var(--color-ink-soft);
  margin-top: 6px;
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
  font-size: 16px;
  margin-top: 28px;
}

.disclaimer-box :deep(svg),
.disclaimer-box :deep(span) {
  font-size: 20px;
  flex: none;
  margin-top: 2px;
}

.disclaimer-box a {
  color: var(--color-indigo);
  font-weight: 600;
  text-decoration: underline;
}

section {
  margin: 72px 0;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

section:first-of-type {
  margin-top: 0;
}

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

p {
  margin: 0 0 18px;
}

ul,
ol {
  margin: 0 0 18px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
}

strong {
  font-weight: 600;
  color: var(--color-ink);
}

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

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:nth-child(even) {
  background: var(--color-paper);
}

td strong,
th strong {
  color: var(--color-ink);
}

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

.callout ul {
  margin-bottom: 0;
  padding-left: 20px;
}

.callout p:last-child {
  margin-bottom: 0;
}

.callout.source {
  border-left-color: var(--color-forest);
  background: var(--color-forest-tint);
}

.callout.source .callout-title {
  color: var(--color-forest);
}

.callout.source a {
  color: var(--color-forest);
  font-weight: 500;
  text-decoration: underline;
}

.callout.source ul {
  list-style: none;
  padding-left: 0;
}

.callout.source li {
  margin-bottom: 6px;
  font-size: 16px;
  word-break: break-all;
}

.callout.note {
  border-left-color: var(--color-plum);
}

.callout.note .callout-title {
  color: var(--color-plum);
}

/* ===================== Diagram containers ===================== */
.diagram-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 12px;
  padding: 28px;
  margin: 28px 0;
}

.mermaid-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
}

.diagram-card .diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 14px;
  text-align: center;
}

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 20px 0;
  text-align: center;
}

/* ===================== Step list (roadmap) ===================== */
.step-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
}

.step-list li {
  display: flex;
  gap: 16px;
  margin-bottom: 0;
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

.step-body .step-title {
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 4px;
}

.step-body .step-desc {
  color: var(--color-ink-soft);
  font-size: 16px;
}

.step-body .step-desc ul {
  margin: 8px 0 0;
  padding-left: 20px;
}

.step-body .step-desc li {
  margin-bottom: 4px;
}

/* ===================== Reference list ===================== */
.ref-group {
  margin-bottom: 28px;
}

.ref-group h3 {
  margin-top: 0;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 17px;
  color: var(--color-ink);
  margin-bottom: 12px;
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
  text-decoration: underline;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }
  .sidebar {
    transform: translateX(-100%);
    visibility: hidden;
    transition:
      transform 0.2s ease,
      visibility 0.2s ease;
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
