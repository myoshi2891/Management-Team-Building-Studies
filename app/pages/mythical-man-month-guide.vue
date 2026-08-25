<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-the-book",
  "brooks-law",
  "why-more-people-doesnt-help",
  "chapter-map",
  "step-by-step-best-practices",
  "myth-vs-reality",
  "developer-perspectives",
  "modern-implications",
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
  title: "『人月の神話』完全ガイド ― 初学者のためのステップ・バイ・ステップ実践集",
  description: "Frederick P. Brooks, Jr.著『人月の神話(The Mythical Man-Month)』を初学者向けに解説する実践ガイド。ブルックスの法則、外科手術チーム、第二システム症候群、銀の弾丸などの主要概念を10ステップのベストプラクティスとMermaid図解で紹介する。",
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

const DIAGRAM_IBM_TIMELINE = `flowchart TB
    A["IBM System/360 ハードウェア開発"] --> B["OS/360 ソフトウェア開発プロジェクト"]
    B --> C["深刻なスケジュール遅延"]
    C --> D["人員を追加投入という判断"]
    D --> E["さらなる遅延という逆説的な結果"]
    E --> F["1975年 人月の神話 出版"]
    F --> G["1995年 20周年記念版 No Silver Bullet を含む4章を追加"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`;

const DIAGRAM_VICIOUS_CYCLE = `flowchart TB
    A["スケジュール遅延が発覚"] --> B["管理者が人員を追加"]
    B --> C["新メンバーへの教育・引き継ぎが発生"]
    B --> D["伝達経路の増加"]
    C --> E["既存メンバーの生産性が一時的に低下"]
    D --> E
    E --> F["短期的には進捗がさらに悪化"]
    F --> G["プロジェクトは結果としてより遅れる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`;

const DIAGRAM_STEP_ROADMAP = `flowchart TB
    S1["Step1 見積もりの罠を理解する"] --> S2["Step2 小さく強いチームを組む"]
    S2 --> S3["Step3 概念の統一性を守る"]
    S3 --> S4["Step4 第二システム症候群を警戒する"]
    S4 --> S5["Step5 伝達の仕組みを設計する"]
    S5 --> S6["Step6 小さく作りフィードバックで育てる"]
    S6 --> S7["Step7 進捗を定量的に可視化する"]
    S7 --> S8["Step8 ドキュメントを軽視しない"]
    S8 --> S9["Step9 銀の弾丸はないと理解する"]
    S9 --> S10["Step10 現代の開発体制へ応用する"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5,S6,S7,S8,S9 box;
    class S10 done;`;

const DIAGRAM_SURGICAL_TEAM = `flowchart LR
    Surgeon["主任プログラマ 設計・実装の中核を担う"] --> Copilot["副操縦士 主任のすべてを理解し補佐する"]
    Surgeon --> Admin["管理者 人事・予算・対外調整"]
    Surgeon --> Editor["編集者 ドキュメント整備"]
    Surgeon --> Clerk["記録係 技術記録の維持"]
    Surgeon --> Tool["ツール担当 開発環境の整備"]
    Surgeon --> Tester["テスト担当 試験ケースの設計"]
    Surgeon --> Lawyer["言語専門家 実装の細部を助言"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Surgeon hub;
    class Copilot,Admin,Editor,Clerk,Tool,Tester,Lawyer box;`;

const DIAGRAM_SECOND_SYSTEM_EFFECT = `flowchart TB
    F1["第一システム 制約下で慎重に設計 機能は絞られる"] --> F2["第二システム 自信過剰からあらゆる機能を追加"]
    F2 --> F3["肥大化・複雑化 最も危険な設計"]
    F3 --> F4["第三システム以降 過去の反省を踏まえ成熟した設計に回帰"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class F1,F2 box;
    class F3 hub;
    class F4 done;`;

const DIAGRAM_COMPLEXITY_TREE = `flowchart TB
    C["ソフトウェア開発の複雑さ"] --> E["本質的複雑さ Essential Complexity"]
    C --> A["偶有的複雑さ Accidental Complexity"]
    E --> E1["解くべき問題そのものに内在する複雑さ"]
    E --> E2["ツールや手法では取り除けない"]
    A --> A1["言語・ツール・プロセスなど人間が作り出した複雑さ"]
    A --> A2["エンジニアリングの工夫で削減・除去できる"]
    E1 ~~~ E2
    A1 ~~~ A2
    E ~~~ A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class C hub;
    class E,A,E1,E2,A1 box;
    class A2 done;`;
</script>

<template>
  <div class="layout">
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

    <!-- ===================== Sidebar ===================== -->
    <nav
      id="sidebar"
      class="sidebar"
      :class="{ open: sidebarOpen }"
      aria-label="目次"
    >
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">人月の神話 完全ガイド</div>
          <div class="brand-subtitle">初学者向け実践ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a href="#about-the-book" :class="{ active: activeId === 'about-the-book' }" :aria-current="activeId === 'about-the-book' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />1. この本について</a></li>
        <li><a href="#brooks-law" :class="{ active: activeId === 'brooks-law' }" :aria-current="activeId === 'brooks-law' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:scale" aria-hidden="true" />2. 核心: ブルックスの法則</a></li>
        <li><a href="#why-more-people-doesnt-help" :class="{ active: activeId === 'why-more-people-doesnt-help' }" :aria-current="activeId === 'why-more-people-doesnt-help' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />3. なぜ人を増やしても早くならないのか</a></li>
        <li><a href="#chapter-map" :class="{ active: activeId === 'chapter-map' }" :aria-current="activeId === 'chapter-map' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />4. 章立てマップ</a></li>
        <li><a href="#step-by-step-best-practices" :class="{ active: activeId === 'step-by-step-best-practices' }" :aria-current="activeId === 'step-by-step-best-practices' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />5. ステップ・バイ・ステップ実践</a></li>
        <li><a href="#myth-vs-reality" :class="{ active: activeId === 'myth-vs-reality' }" :aria-current="activeId === 'myth-vs-reality' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:swords" aria-hidden="true" />6. 神話 vs 現実</a></li>
        <li><a href="#developer-perspectives" :class="{ active: activeId === 'developer-perspectives' }" :aria-current="activeId === 'developer-perspectives' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:quote" aria-hidden="true" />7. 著名な開発者たちの評価</a></li>
        <li><a href="#modern-implications" :class="{ active: activeId === 'modern-implications' }" :aria-current="activeId === 'modern-implications' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:refresh" aria-hidden="true" />8. 現代への示唆</a></li>
        <li><a href="#summary" :class="{ active: activeId === 'summary' }" :aria-current="activeId === 'summary' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />9. まとめ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" :aria-current="activeId === 'references' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />10. 参考文献</a></li>
      </ul>
    </nav>

    <!-- ===================== Main Content ===================== -->
    <main id="main-content" class="main-content" tabindex="-1">
      <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />書籍解説ガイド</div>
      <h1>『人月の神話』完全ガイド ― 初学者のためのステップ・バイ・ステップ実践集</h1>
      <p class="hero-lede">
        このガイドは、ソフトウェア工学史上もっとも引用される古典『人月の神話(The Mythical Man-Month)』を、初めて読む方でも実務にすぐ応用できるように、内容は 2026年8月19日時点までの公開情報をウェブ検索し、著名な国際的開発者(Joel Spolsky、apenwarr こと Avery Pennarun、Mark Seemann、Adrian Colyer ほか)の言及も参照して作成しました。出典 URL は末尾の「参考文献」に一覧化しています。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">1975年</div><div class="stat-label">原著初版の刊行年</div></div>
        <div class="stat-card"><div class="stat-number">19+1章</div><div class="stat-label">本編19章とエピローグ</div></div>
        <div class="stat-card"><div class="stat-number">10</div><div class="stat-label">ステップ・バイ・ステップ実践プラン</div></div>
        <div class="stat-card"><div class="stat-number">17件</div><div class="stat-label">参照した情報源の数</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        原著: <em>The Mythical Man-Month: Essays on Software Engineering, Anniversary Edition</em> / Frederick P. Brooks, Jr. (Addison-Wesley Professional) ・ 参照元: <a href="https://www.oreilly.com/library/view/mythical-man-month-the/0201835959/" target="_blank" rel="noopener">O'Reilly 書誌ページ</a>
      </div>
    </div>

    <!-- ===================== 1. About the Book ===================== -->
    <section id="about-the-book">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 01</div>
      <h2>この本について</h2>

      <p>Fred Brooks(フレデリック・P・ブルックス・ジュニア)は、IBM System/360 ファミリーおよびその基本ソフトウェアである OS/360 の開発プロジェクトマネージャーを務めた人物です。1975年に出版された本書は、当時としては史上最大規模だったこのソフトウェアプロジェクトでの実体験―スケジュール遅延、人員追加による混乱、概念の統一性の崩壊―を率直に振り返ったエッセイ集です。</p>

      <p>Brooks 自身、この本を評して「みんなが引用し、何人かが読み、ごく一部の人だけがその通りに実行する」と語ったと伝えられています。この皮肉めいた言葉こそが、本書が半世紀にわたり読み継がれている理由を物語っています。</p>

      <p>Brooks は1999年に ACM チューリング賞(コンピュータ科学における最高の栄誉)を「コンピュータアーキテクチャ、オペレーティングシステム、およびソフトウェア工学への画期的貢献」により受賞し、2022年11月17日に91歳で逝去しました。</p>

      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_IBM_TIMELINE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中...</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">IBM System/360からOS/360開発、そして人月の神話出版までの経緯</div>
      </div>
    </section>

    <!-- ===================== 2. Brooks's Law ===================== -->
    <section id="brooks-law">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:scale" aria-hidden="true" />SECTION 02</div>
      <h2>核心: ブルックスの法則</h2>

      <p>本書のタイトルにもなっている中心命題は「人月(man-month)」という単位そのものが神話であるという指摘です。人月とは「1人が1か月で行える作業量」という仮想的な単位ですが、Brooks は、これを使って人と時間を機械的に交換できると考えることが根本的な誤りだと論じました。</p>

      <p>その帰結が、今日「ブルックスの法則」として知られる一節です。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>「遅れているソフトウェアプロジェクトへの人員追加は、そのプロジェクトをさらに遅らせる」</p>
      </div>

      <p>Brooks は自らこの法則を「とんでもない単純化」と認めつつも、これが多くのプロジェクトに共通する本質的な力学を捉えていると述べています。本書には「子どもを産むには9か月かかる。何人の女性を割り当てようと変わらない」という比喩が登場します。この趣旨を言い換えると「9人の女性を集めても、1か月で赤ん坊は生まれない」となり、作業のすべてが分割可能・並列化可能ではないことを端的に示しています(後者は本書の原文そのままの引用ではなく、広く流布した言い換えです)。</p>

      <h3>ブルックスの法則が成立する主な理由</h3>

      <div class="table-wrap">
        <table>
          <thead><tr><th>要因</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>教育コスト(Ramp-up time)</td><td>新メンバーは既存メンバーから説明を受けて初めて生産的になれる。教育中は既存メンバーの生産性も落ちる</td></tr>
            <tr><td>コミュニケーションオーバーヘッド</td><td>人数が増えるほど、必要な伝達経路の数が急激に増加する</td></tr>
            <tr><td>タスクの逐次性</td><td>ソフトウェア開発の一部作業は本質的に順序依存で並列化できない</td></tr>
            <tr><td>分割コスト</td><td>作業を分割すればするほど、統合・すり合わせという新たな作業が発生する</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 3. Why More People Doesn't Help ===================== -->
    <section id="why-more-people-doesnt-help">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 03</div>
      <h2>なぜ人を増やしても早くならないのか</h2>

      <h3>3.1 コミュニケーション経路の急増</h3>

      <p>チームの人数を n 人とすると、全員が互いに情報をやり取りする必要がある場合、経路の数は組み合わせの数式 <code>n(n-1)/2</code> に従って増加します。これは人数の増加に対して直線的(線形)ではなく、二次関数的に増えることを意味します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>チーム人数 n</th><th>伝達経路数 n(n-1)/2</th></tr></thead>
          <tbody>
            <tr><td>2</td><td>1</td></tr>
            <tr><td>4</td><td>6</td></tr>
            <tr><td>6</td><td>15</td></tr>
            <tr><td>10</td><td>45</td></tr>
            <tr><td>20</td><td>190</td></tr>
            <tr><td>50</td><td>1,225</td></tr>
          </tbody>
        </table>
      </div>

      <p>人数がわずか2.5倍(20人→50人)になっただけで、経路数は6倍以上に膨れ上がります。この非線形な伸びこそが、大人数チームで「声が届かなくなる」実感の正体です。</p>

      <h3>3.2 ブルックスの法則が引き起こす悪循環</h3>

      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_VICIOUS_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中...</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">人員追加がさらなる遅延を招く悪循環</div>
      </div>

      <h3>3.3 例外: 分割可能なタスクには当てはまらない</h3>

      <p>ブルックス自身が本書で述べているとおり、ブルックスの法則が効くのは<strong>メンバー間の緊密な調整が必要な、相互依存性の高い作業</strong>であり、担当者どうしのやり取りをほとんど必要としない分割可能なタスクには当てはまりません。本ガイドの適用例を挙げるなら、既存コードベース全体を手分けしてレビューし、セキュリティ上の問題を洗い出すような作業がこれに当たります(この例は本ガイドによる応用であり、原著や後述の引用元が挙げているものではありません)。</p>
    </section>

    <!-- ===================== 4. Chapter Map ===================== -->
    <section id="chapter-map">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 04</div>
      <h2>章立てマップ(全19章 + エピローグ)</h2>

      <p>20周年記念版(Anniversary Edition)の目次に基づく全体像です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>章</th><th>原題</th><th>要点(初学者向け一言)</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>The Tar Pit</td><td>ソフトウェア開発はなぜ「タールの沼」のように厄介なのかを提示する序章</td></tr>
            <tr><td>2</td><td>The Mythical Man-Month</td><td>人月という単位の危険性とブルックスの法則の提示</td></tr>
            <tr><td>3</td><td>The Surgical Team</td><td>外科手術チームという小人数・高効率のチーム編成モデル</td></tr>
            <tr><td>4</td><td>Aristocracy, Democracy, and System Design</td><td>「概念の統一性」を守るためのアーキテクト中心の設計思想</td></tr>
            <tr><td>5</td><td>The Second-System Effect</td><td>二作目のシステムほど過剰設計に陥りやすいという警鐘</td></tr>
            <tr><td>6</td><td>Passing the Word</td><td>仕様や設計意図をチーム全体に周知する方法</td></tr>
            <tr><td>7</td><td>Why Did the Tower of Babel Fail?</td><td>バベルの塔の寓話に見る、組織とコミュニケーションの失敗</td></tr>
            <tr><td>8</td><td>Calling the Shot</td><td>見積もりが甘くなりがちな理由と対処法</td></tr>
            <tr><td>9</td><td>Ten Pounds in a Five-Pound Sack</td><td>リソース制約下(メモリ・容量など)での設計判断</td></tr>
            <tr><td>10</td><td>The Documentary Hypothesis</td><td>文書化そのものが設計品質を高めるという逆説</td></tr>
            <tr><td>11</td><td>Plan to Throw One Away</td><td>最初に作るものは「捨てる前提」で作るべきという提言</td></tr>
            <tr><td>12</td><td>Sharp Tools</td><td>開発ツールへの投資を惜しまないことの重要性</td></tr>
            <tr><td>13</td><td>The Whole and the Parts</td><td>部分の結合とシステムテストにおける落とし穴</td></tr>
            <tr><td>14</td><td>Hatching a Catastrophe</td><td>大規模な遅延は「小さな遅れの積み重ね」から生まれる</td></tr>
            <tr><td>15</td><td>The Other Face</td><td>プログラムのもう一つの顔=文書としての側面</td></tr>
            <tr><td>16</td><td>No Silver Bullet ― Essence and Accident in Software Engineering</td><td>銀の弾丸は存在しない: 本質的複雑さと偶有的複雑さ</td></tr>
            <tr><td>17</td><td>"No Silver Bullet" Refined</td><td>1986年の主張を10年後に再検証</td></tr>
            <tr><td>18</td><td>Propositions of The Mythical Man-Month: True or False?</td><td>本書の主要命題を20年後の視点で採点し直す</td></tr>
            <tr><td>19</td><td>The Mythical Man-Month after 20 Years</td><td>20年を経てのブルックス自身による総括</td></tr>
            <tr><td>Epilogue</td><td>Fifty Years of Wonder, Excitement, and Joy</td><td>Brooks 自身が関わったコンピューティングの約50年を振り返るエピローグ(追補)</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 5. Step by Step Best Practices ===================== -->
    <section id="step-by-step-best-practices">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 05</div>
      <h2>ステップ・バイ・ステップ ベストプラクティス</h2>

      <p>以下は本書のエッセンスを、実務で使える10のステップに落とし込んだものです。</p>

      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_STEP_ROADMAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中...</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">10ステップのベストプラクティス・ロードマップ</div>
      </div>

      <h3>Step 1｜見積もりの罠を理解する(第2・8章)</h3>
      <ul>
        <li>人は本質的に楽観主義者であり、「今回は問題が起きないだろう」と見積もりを甘くしがちです。</li>
        <li>作業を「実装(コーディング)」だけで見積もらず、設計・テスト・システム統合・文書化を含めた総工数で見積もります。</li>
        <li>「N人月かかる」という見積もりから安易に「では2N人を投入すれば半分の期間で終わる」と逆算しないこと。これは本書が最も強く戒めている誤りです。</li>
      </ul>

      <h3>Step 2｜小さく強いチームを組む(第3章: 外科手術チーム)</h3>
      <p>Harlan Mills が提案し Brooks が発展させた「外科手術チーム」モデルは、実際の外科手術チームになぞらえて、少数精鋭の中心人物とそれを支える専門スタッフでチームを構成する考え方です。</p>

      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_SURGICAL_TEAM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中...</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">外科手術チームの構成 ― 主任プログラマを中心とした支援体制</div>
      </div>

      <ul>
        <li>ポイントは「全員が対等に分業する」のではなく、<strong>設計判断の責任を一人(または少数)に集中させる</strong>ことで概念の統一性とコミュニケーションコストの両方を抑える点にあります。</li>
        <li>現代的な解釈では、これは「テックリード + 支援メンバー」という体制や、マイクロサービスにおける「1チーム1オーナー」原則として応用されています。</li>
      </ul>

      <h3>Step 3｜概念の統一性(コンセプチュアル・インテグリティ)を守る(第4章)</h3>
      <ul>
        <li>Brooks は「システム設計において最も重要なのは概念の統一性である」と述べています。</li>
        <li>機能を増やすたびに「このアイデアは全体の設計思想に本当に合致するか」を問い、合致しなければ機能が優れていても採用を見送る勇気が必要です。</li>
        <li>一部の実装者の思いつきをすべて取り込むと、ユーザーから見て一貫性のない「委員会設計(design by committee)」に陥ります。</li>
      </ul>

      <h3>Step 4｜第二システム症候群を警戒する(第5章)</h3>
      <p>最初のシステムは制約の中で慎重に作られるため簡潔になりがちですが、その成功体験を経て取り組む「二作目」では、開発者は自信を得た結果、これまで我慢してきた機能をすべて詰め込みたくなります。これが<strong>第二システム効果</strong>です。</p>

      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_SECOND_SYSTEM_EFFECT" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中...</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">第一システムから第二システム、そして成熟する第三システムへ</div>
      </div>

      <ul>
        <li>対策として、Brooks はアーキテクトに「機能ごとに要するバイト数・処理時間などのコストを明示させる」ことで自己規律を働かせるよう提案しています。</li>
        <li>実務上は、経験豊富な(=すでに一度「二作目」を通過した)設計者をアーキテクトに据えることが有効だとされています。</li>
      </ul>

      <h3>Step 5｜伝達の仕組みを設計する(第6・7章)</h3>
      <ul>
        <li>「バベルの塔」の寓話は、共通言語(共通の目的意識)を失ったチームがいかに崩壊するかの比喩として使われます。</li>
        <li>定例会議、非公式なチャット、共有の技術記録など、複数のチャネルを併用して仕様や設計意図を周知することが推奨されています。</li>
        <li>現代でいえば、ADR(Architecture Decision Record)、社内 Wiki、Slack の技術チャンネルなどがこの「伝達の仕組み」に相当します。</li>
      </ul>

      <h3>Step 6｜小さく作り、フィードバックで育てる(第11章)</h3>
      <p>最初に書いたコードには、要件理解の不足からくる設計上の欠陥が含まれやすくなります。だからこそ、<strong>動くものを小さく作り、継続的にフィードバックを受け取りながら育てていく</strong>進め方を既定とします。学びを早く得ることが目的であり、作ったものを捨てること自体が目的ではありません。</p>
      <p>第11章の初版では、この考えが次のように「捨てる前提で作れ」という形で述べられていました。</p>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>「パイロット版を作って捨てるかどうかを議論する必要はない。あなたはどのみちそれをやることになる。だから最初からそのつもりで計画せよ」</p>
      </div>

      <p><strong>ただし Brooks 自身が、20周年記念版の第19章でこの提言を撤回に近い形で見直しています。</strong> 「捨てるための試作を1つ作る」という一括の考え方よりも、動くものを少しずつ育てながら継続的にフィードバックを受け取る<strong>漸進的な構築(incremental construction)</strong>のほうが優れている、というのが本人の到達点です。したがって、本章を「使い捨てのプロトタイピングは単独で有効なベストプラクティスである」と読むべきではありません。</p>

      <p>試作を捨てるのは、あくまで<strong>反復の結果として起こりうる選択肢の1つ</strong>です。実務上の指針としては、小さく作って早くフィードバックを得る反復を既定とし、<strong>「最初の試作を捨てる」ことと「土台からすべて作り直す」ことを混同しない</strong>ことが重要です。前者は反復の一部として起こりうる小さな学習であり、後者は別物です。</p>

      <p>実際、apenwarr(Avery Pennarun)は、大規模な「ゼロからの書き直し」自体が第二システム症候群の温床になりやすいと指摘しており、Joel Spolsky が論じた Netscape のフルスクラッチ書き直しの失敗例("Things You Should Never Do, Part I")を教訓として挙げています。</p>

      <h3>Step 7｜進捗を定量的に可視化する(第14章: 破局のふ化)</h3>
      <ul>
        <li>大きな遅延は、ある日突然発生するのではなく「小さな遅れの積み重ね」が見過ごされた結果です。</li>
        <li>マイルストーンは「9割終わった」のような曖昧な自己申告ではなく、成果物単位(動くコード・通過したテストなど)で判定します。</li>
        <li>進捗の遅れを早期に検知し、早期に対処するほど、ブルックスの法則が引き起こす悪循環を避けやすくなります。</li>
      </ul>

      <h3>Step 8｜ドキュメントを軽視しない(第10・15章)</h3>
      <ul>
        <li>Brooks はドキュメント作成そのものを「設計の欠陥をあぶり出す行為」として重視しました。設計を言語化する過程で、曖昧な部分が可視化されるためです。</li>
        <li>アジャイル的な開発では重厚な仕様書は敬遠されがちですが、「なぜその設計にしたか」という意思決定の記録(ADR等)は現代でも高い価値を持ちます。</li>
      </ul>

      <h3>Step 9｜銀の弾丸はないと理解する(第16・17章: No Silver Bullet)</h3>
      <p>1986年の論文 "No Silver Bullet — Essence and Accident in Software Engineering" で Brooks は、ソフトウェア開発の困難さを <strong>本質的複雑さ(essential complexity)</strong> と <strong>偶有的複雑さ(accidental complexity)</strong> に分類しました。</p>

      <div class="mermaid-wrap">
        <ClientOnly>
          <MermaidDiagram :chart="DIAGRAM_COMPLEXITY_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
          <template #fallback>
            <p class="diagram-loading">図を読み込み中...</p>
          </template>
        </ClientOnly>
        <div class="diagram-caption">本質的複雑さと偶有的複雑さの分類</div>
      </div>

      <ul>
        <li>高水準言語やIDE、時分割処理などの技術革新は、あくまで偶有的複雑さを削減してきたにすぎません。</li>
        <li>「このフレームワーク / この手法を導入すれば生産性が10倍になる」という宣伝文句には、本質的複雑さを解決できるのかという視点で懐疑的に向き合うべきだと Brooks は説いています。</li>
      </ul>

      <h3>Step 10｜現代の開発体制へ応用する</h3>
      <ul>
        <li>アジャイル開発における「スモールチーム」「継続的なコミュニケーション」「反復的なプロトタイピング」は、本書の議論(外科手術チーム、コミュニケーション経路の削減、漸増的構築)を<strong>現代的に読み替えた実践</strong>として位置づけられます。Brooks 自身がこれらのアジャイル実践を提唱したわけではありません。</li>
        <li>クラウド・DevOps時代においても、マイクロサービス化はコミュニケーション経路の問題を「組織の分割」によって緩和しようとする試みとして解釈できます(いわゆるコンウェイの法則との接続)。ただしこれは本書の記述そのものではなく<strong>現代的な読み替え</strong>です。コンウェイの法則は Melvin E. Conway が 1968年の論文 "How Do Committees Invent?" で示した命題であり、詳細は「8. 現代への示唆」および参考文献を参照してください。</li>
        <li>生成AIによるコーディング支援が普及した2026年現在をどう位置づけるかは、本書の主張そのものではなく<strong>現代的な読み替え</strong>です。AIは定型的な実装作業を加速しうる一方で、そのことは偶有的複雑さが大きく削減されたことの証明にはなりません。少なくとも、要件を理解し設計判断を下すという本質的複雑さは依然として人間に残されている、という区別は保たれます。この点は次節で詳しく扱います。</li>
      </ul>
    </section>

    <!-- ===================== 6. Myth vs Reality ===================== -->
    <section id="myth-vs-reality">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:swords" aria-hidden="true" />SECTION 06</div>
      <h2>神話 vs 現実: 比較表</h2>

      <div class="table-wrap">
        <table>
          <thead><tr><th>よくある思い込み(神話)</th><th>本書が示す現実</th></tr></thead>
          <tbody>
            <tr><td>人を増やせば、その分だけ早く終わる</td><td>相互依存性の高い作業では、教育コストと伝達コストが生産性の増分を上回ることが多い</td></tr>
            <tr><td>見積もりは「作業量 ÷ 人数」で単純に算出できる</td><td>ソフトウェア開発の作業は分割不可能な部分が多く、人月は等価交換できる単位ではない</td></tr>
            <tr><td>機能を増やせば増やすほど良いシステムになる</td><td>概念の統一性を失ったシステムは、機能が多くても使いにくいものになる</td></tr>
            <tr><td>二作目のシステムは経験を積んだ分、必ず良くなる</td><td>自信過剰から機能を詰め込みすぎる「第二システム症候群」に陥りやすい</td></tr>
            <tr><td>ドキュメント作成は開発速度を遅らせるだけの作業だ</td><td>文書化の過程は設計の曖昧さを可視化し、後工程の手戻りを減らす</td></tr>
            <tr><td>新しい言語・ツール・手法を導入すれば生産性は劇的に向上する</td><td>偶有的複雑さは削減できても、本質的複雑さは技術だけでは解決できない</td></tr>
            <tr><td>最初に書いたコードをそのまま本番運用すればよい</td><td>最初の版は設計上の問題が見つかる可能性が高い。Brooks は20周年記念版で、一括の使い捨て試作よりも、小さく作って継続的にフィードバックを得る漸進的構築を推奨する立場に改めた</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===================== 7. Developer Perspectives ===================== -->
    <section id="developer-perspectives">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:quote" aria-hidden="true" />SECTION 07</div>
      <h2>著名な開発者たちはどう評価しているか</h2>

      <h3>Joel Spolsky(Stack Overflow 共同創業者・元CEO、Fog Creek Software 創業者)</h3>
      <p>自身のブログ Joel on Software で本書に繰り返し言及しており、「凡庸なプログラマー5人を優秀なプログラマー1人の代わりにすることはできない」という論旨のもと、少人数の精鋭チームがなぜ調整コストの面で有利かを説明しています。ここでの論点は、人数を増やすことでは代替できない「調整コスト」と個人の能力差にあります。</p>

      <h3>apenwarr(Avery Pennarun、Tailscale 共同創業者・CEO、git-subtree や sshuttle などの開発者)</h3>
      <p>第二システム症候群を現代のソフトウェア業界の事例(IPv6、Python 3、Perl 6 など)に照らして再解釈し、大規模な「ゼロからの書き直し」プロジェクトがなぜ繰り返し失敗するのかを論じています。Joel Spolsky が指摘した Netscape の全面書き直しの失敗も引用しつつ、50年前の教訓が今なお繰り返されている現実を指摘しています。</p>

      <h3>Mark Seemann(ploeh blog、『Code That Fits in Your Head』などの著者)</h3>
      <p>1986年の "No Silver Bullet" における本質的複雑さと偶有的複雑さの比率について、Brooks の見立て(偶有的複雑さは全体の半分以下)に独自の反証を試みており、本書の主張を鵜呑みにせず批判的に検証する姿勢を示しています。</p>

      <h3>Adrian Colyer(the morning paper、元 Pivotal / SpringSource CTO)</h3>
      <p>技術論文の要約ブログ the morning paper において "No Silver Bullet" を取り上げ、本質的困難と偶有的困難というアリストテレス由来の区分を丁寧に解説するとともに、漸進的な開発の重要性を論じています。</p>
    </section>

    <!-- ===================== 8. Modern Implications ===================== -->
    <section id="modern-implications">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 08</div>
      <h2>現代(アジャイル / DevOps / AI時代)への示唆</h2>

      <ul>
        <li><strong>アジャイル開発との関係</strong>: 頻繁な対話・反復的な開発・小さなチーム編成といったアジャイルの原則の多くは、本書が指摘した「コミュニケーションコストの管理」という課題への一つの回答と位置づけられます。一方で、大規模な仕様書を軽視しすぎる風潮に対しては、Brooks が重視した文書化の意義を再確認する声も見られます。</li>
        <li><strong>マイクロサービス / 組織設計との関係</strong>: システムを疎結合なサービス群に分割する動きは、コミュニケーション経路の急増という問題を「組織構造そのものを分割する」ことで緩和しようとする試みとして解釈できます(Step 10 で触れた読み替えの詳述であり、本書の記述ではなく<strong>現代的な解釈</strong>です)。この解釈の土台にあるのが、Melvin E. Conway が 1968年の論文 "How Do Committees Invent?"(<em>Datamation</em>)で示した「システムを設計する組織は、その組織のコミュニケーション構造を写し取った設計を生み出す」という命題、いわゆるコンウェイの法則です。</li>
        <li><strong>生成AI時代の"銀の弾丸"論争</strong>: AIによるコード生成は定型的な実装作業を加速しうるツールですが、それをもって偶有的複雑さが大幅に削減されたと結論づけることはできません(以下は本書の記述ではなく<strong>現代的な読み替え</strong>です)。実装作業と、「何を作るべきか」「なぜそう設計すべきか」という本質的複雑さの判断は別物であり、後者はなお人間の役割として残ります。AIコーディング(いわゆる vibe coding)の普及が進む中でも、要件定義から設計、テスト、リリースに至る構造化されたプロセスの重要性は変わらないという指摘が、2026年時点の記事でもなされています。</li>
      </ul>
    </section>

    <!-- ===================== 9. Summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 09</div>
      <h2>まとめ</h2>

      <p>『人月の神話』が半世紀以上にわたり読み継がれている理由は、扱っているのが特定の技術やツールではなく、<strong>人間が集団でものを作るときに普遍的に直面する力学</strong>だからです。</p>

      <ul>
        <li>人を増やすことは万能の解決策ではない(ブルックスの法則)</li>
        <li>小さく強いチームと明確な意思決定の中心が、大規模開発における混乱を防ぐ(外科手術チーム、概念の統一性)</li>
        <li>成功体験の直後こそ、過剰設計の罠に陥りやすい(第二システム症候群)</li>
        <li>技術の進歩は偶有的複雑さを減らすが、本質的複雑さは決してゼロにならない(銀の弾丸はない)</li>
      </ul>

      <p>Brooks 自身が述べたように「みんなが引用し、何人かが読み、ごく一部の人だけがその通りに実行する」書物ではなく、実際にチーム運営や見積もりの現場でこれらの原則を意識して「実行する」側に回ることが、このガイドの目的です。</p>
    </section>

    <!-- ===================== 10. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 10</div>
      <h2>参考文献</h2>

      <p>以下は本ガイド作成にあたって参照した情報源です(2026年8月19日時点でアクセス確認済み)。</p>

      <div class="ref-group">
        <ul class="ref-list">
          <li><span class="ref-name">O'Reilly 書誌ページ(本書の目次・概要)</span><a class="ref-url" href="https://www.oreilly.com/library/view/mythical-man-month-the/0201835959/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/mythical-man-month-the/0201835959/</a></li>
          <li><span class="ref-name">Wikipedia: The Mythical Man-Month</span><a class="ref-url" href="https://en.wikipedia.org/wiki/The_Mythical_Man-Month" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/The_Mythical_Man-Month</a></li>
          <li><span class="ref-name">Melvin E. Conway, "How Do Committees Invent?", <em>Datamation</em>, Vol. 14, No. 4, April 1968(コンウェイの法則の原著論文。本ガイドの Step 10 および「8. 現代への示唆」での言及はこの論文に基づく)</span><a class="ref-url" href="https://www.melconway.com/Home/Committees_Paper.html" target="_blank" rel="noopener">https://www.melconway.com/Home/Committees_Paper.html</a></li>
          <li><span class="ref-name">Wikipedia: Brooks's law</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Brooks's_law" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Brooks's_law</a></li>
          <li><span class="ref-name">Wikipedia: No Silver Bullet</span><a class="ref-url" href="https://en.wikipedia.org/wiki/No_Silver_Bullet" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/No_Silver_Bullet</a></li>
          <li><span class="ref-name">Wikipedia: Second-system effect</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Second-system_effect" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Second-system_effect</a></li>
          <li><span class="ref-name">Wikipedia: Fred Brooks(経歴・チューリング賞について)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Fred_Brooks" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Fred_Brooks</a></li>
          <li><span class="ref-name">ACM A.M. Turing Award: Frederick Brooks(受賞理由)</span><a class="ref-url" href="https://amturing.acm.org/award_winners/brooks_1002187.cfm" target="_blank" rel="noopener">https://amturing.acm.org/award_winners/brooks_1002187.cfm</a></li>
          <li><span class="ref-name">Communications of the ACM: In Memoriam: Frederick P. Brooks, Jr. 1931–2022</span><a class="ref-url" href="https://cacm.acm.org/news/in-memoriam-frederick-p-brooks-jr-1931-2022/" target="_blank" rel="noopener">https://cacm.acm.org/news/in-memoriam-frederick-p-brooks-jr-1931-2022/</a></li>
          <li><span class="ref-name">Joel Spolsky, "Hitting the High Notes"(Joel on Software)</span><a class="ref-url" href="https://www.joelonsoftware.com/2005/07/25/hitting-the-high-notes/" target="_blank" rel="noopener">https://www.joelonsoftware.com/2005/07/25/hitting-the-high-notes/</a></li>
          <li><span class="ref-name">Joel Spolsky, "Things You Should Never Do, Part I"(Netscape の全面書き直しの失敗、Joel on Software)</span><a class="ref-url" href="https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/" target="_blank" rel="noopener">https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/</a></li>
          <li><span class="ref-name">apenwarr(Avery Pennarun), "Systems design explains the world: volume 1"</span><a class="ref-url" href="https://apenwarr.ca/log/20201227" target="_blank" rel="noopener">https://apenwarr.ca/log/20201227</a></li>
          <li><span class="ref-name">Mark Seemann, "Yes silver bullet"(ploeh blog)</span><a class="ref-url" href="https://blog.ploeh.dk/2019/07/01/yes-silver-bullet/" target="_blank" rel="noopener">https://blog.ploeh.dk/2019/07/01/yes-silver-bullet/</a></li>
          <li><span class="ref-name">Adrian Colyer, "No Silver Bullet — essence and accident in software engineering"(the morning paper)</span><a class="ref-url" href="https://blog.acolyer.org/2016/09/06/no-silver-bullet-essence-and-accident-in-software-engineering/" target="_blank" rel="noopener">https://blog.acolyer.org/2016/09/06/no-silver-bullet-essence-and-accident-in-software-engineering/</a></li>
          <li><span class="ref-name">Jason Sachs, "In Memoriam: Frederick P. Brooks, Jr. and The Mythical Man-Month"(EmbeddedRelated)</span><a class="ref-url" href="https://www.embeddedrelated.com/showarticle/1484.php" target="_blank" rel="noopener">https://www.embeddedrelated.com/showarticle/1484.php</a></li>
          <li><span class="ref-name">Fred Brooks, "No Silver Bullet: Essence and Accidents of Software Engineering"(原著論文 PDF、UNC 技術報告書)</span><a class="ref-url" href="https://www.cs.unc.edu/techreports/86-020.pdf" target="_blank" rel="noopener">https://www.cs.unc.edu/techreports/86-020.pdf</a></li>
          <li><span class="ref-name">"The Mythical Man Month: 5 Lessons About Software Development"(vibe coding 時代における再評価、2026年)</span><a class="ref-url" href="https://five.co/blog/5-lessons-on-software-development-the-mythical-man-month/" target="_blank" rel="noopener">https://five.co/blog/5-lessons-on-software-development-the-mythical-man-month/</a></li>
        </ul>
      </div>

      <div class="callout note" data-variant="note" data-testid="callout">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>本ガイドは上記情報源を要約・言い換えて作成したものであり、原文からの長文引用は行っていません。詳細な内容については、必ず原著および各リンク先の一次情報をご確認ください。</p>
      </div>
    </section>

    <!-- ===================== end of sections ===================== -->

    <footer>
      Frederick P. Brooks, Jr. 著『人月の神話』の非公式解説ガイドです。原文からの長文引用は行わず、公開情報を要約・言い換えて作成しています。詳細は各セクションおよび「10. 参考文献」に記載の一次情報をご確認ください。
    </footer>
    </main>
  </div>
</template>

<style scoped>

  :root {
    /* ---- Named palette (paper / ink / indigo / gold / forest / plum) ---- */
    --color-paper:        #F6F7F9;
    --color-paper-raised: #FFFFFF;
    --color-paper-sunken: #EEF0F4;

    --color-ink:          #161B26;
    --color-ink-soft:     #4B5566;
    --color-ink-faint:    #8A93A3;

    --color-border:       #DFE3EA;
    --color-border-strong:#C7CDD9;

    --color-indigo:       #2E3F72;
    --color-indigo-dark:  #1F2C57;
    --color-indigo-tint:  #EEF1F8;

    --color-gold:         #B8802A;
    --color-gold-tint:    #FAF1DF;

    --color-forest:       #1B6E6A;
    --color-forest-tint:  #E7F3F2;

    --color-plum:         #8C3A5C;
    --color-plum-tint:    #F6EAEF;

    --color-success-bg:    #EAF4EC;
    --color-success-text:  #2F6B3D;
    --color-success-border:#BFE0C6;

    --color-info-bg:       #EEF1F8;
    --color-info-text:     #2E3F72;
    --color-info-border:   #C7D1EA;

    /* ---- Typography ---- */
    --font-display: "Source Serif 4", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif;
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif;
    --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;

    --sidebar-width: 288px;
  }

  * { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--color-indigo); text-decoration: none; }
  a:hover { text-decoration: underline; }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--color-indigo); outline-offset: 2px; }

  .skip-link {
    position: absolute; top: -48px; left: 0; z-index: 40;
    background: var(--color-paper-raised); color: var(--color-indigo);
    padding: 12px 20px; border: 1px solid var(--color-border); border-radius: 0 0 8px 0;
    transition: top 0.15s ease;
  }
  .skip-link:focus { top: 0; }
  img, svg { max-width: 100%; }

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

  .sidebar-nav .nav-group-label {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-ink-faint);
    letter-spacing: 0.06em;
    margin: 22px 0 8px;
    padding-left: 12px;
  }

  .sidebar-nav .nav-group-label:first-child { margin-top: 0; }

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
  }

  .sidebar-nav a :deep(.iconify) { font-size: 17px; color: var(--color-ink-faint); flex: none; }

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

  h2 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 29px;
    color: var(--color-ink);
    margin: 0 0 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
  }

  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 21px;
    color: var(--color-ink);
    margin: 40px 0 16px;
  }

  h4 {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 17px;
    color: var(--color-ink);
    margin: 28px 0 12px;
  }

  p { margin: 0 0 18px; }

  ul, ol { margin: 0 0 18px; padding-left: 24px; }
  li { margin-bottom: 8px; }

  strong { font-weight: 600; color: var(--color-ink); }

  em { color: var(--color-ink-soft); }

  /* ===================== Domain badge cards ===================== */
  .domain-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(160px, 1fr));
    gap: 16px;
    margin: 28px 0 8px;
  }

  .domain-card {
    border: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    border-radius: 10px;
    padding: 20px;
    border-top: 3px solid var(--d-color);
  }

  .domain-card .domain-pct {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 30px;
    color: var(--d-color);
  }

  .domain-card .domain-name {
    font-size: 16px;
    color: var(--color-ink-soft);
    margin-top: 6px;
  }

  .domain-card.d1 { --d-color: var(--color-indigo); }
  .domain-card.d2 { --d-color: var(--color-forest); }
  .domain-card.d3 { --d-color: var(--color-gold); }
  .domain-card.d4 { --d-color: var(--color-plum); }

  .domain-tag {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    padding: 3px 12px;
    border-radius: 999px;
    margin-bottom: 14px;
  }

  .domain-tag.d1 { background: var(--color-indigo-tint); color: var(--color-indigo); }
  .domain-tag.d2 { background: var(--color-forest-tint); color: var(--color-forest); }
  .domain-tag.d3 { background: var(--color-gold-tint); color: var(--color-gold); }
  .domain-tag.d4 { background: var(--color-plum-tint); color: var(--color-plum); }

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

  .callout ul { margin-bottom: 0; padding-left: 20px; }
  .callout p:last-child { margin-bottom: 0; }

  .callout.practice { border-left-color: var(--color-gold); }
  .callout.practice .callout-title { color: var(--color-gold); }

  .callout.source { border-left-color: var(--color-forest); background: var(--color-forest-tint); }
  .callout.source .callout-title { color: var(--color-forest); }
  .callout.source a { color: var(--color-forest); font-weight: 500; }
  .callout.source ul { list-style: none; padding-left: 0; }
  .callout.source li { margin-bottom: 6px; font-size: 16px; word-break: break-all; }

  .callout.note { border-left-color: var(--color-plum); }
  .callout.note .callout-title { color: var(--color-plum); }

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

  .diagram-container {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 60px;
  }

  .diagram-loading {
    color: var(--color-ink-faint);
    font-size: 16px;
    padding: 20px 0;
  }

  .diagram-error {
    color: var(--color-plum);
    font-size: 16px;
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

  .step-body .step-title { font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
  .step-body .step-desc { color: var(--color-ink-soft); font-size: 16px; }

  /* ===================== Glossary ===================== */
  .glossary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: 16px;
  }

  .glossary-item {
    border: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    border-radius: 10px;
    padding: 16px 20px;
  }

  .glossary-item .g-term {
    font-weight: 600;
    color: var(--color-indigo);
    margin-bottom: 4px;
  }

  .glossary-item .g-def {
    color: var(--color-ink-soft);
    font-size: 16px;
  }

  /* ===================== Reference list ===================== */
  .ref-group { margin-bottom: 28px; }
  .ref-group h4 { margin-top: 0; }
  .ref-list { list-style: none; margin: 0; padding: 0; }
  .ref-list li {
    padding: 12px 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 16px;
  }
  .ref-list li:last-child { border-bottom: none; }
  .ref-list .ref-name { color: var(--color-ink); font-weight: 500; display: block; margin-bottom: 2px; }
  .ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; }

  footer {
    margin-top: 96px;
    padding-top: 32px;
    border-top: 1px solid var(--color-border);
    color: var(--color-ink-faint);
    font-size: 16px;
  }

  code {
    font-family: var(--font-mono);
    background: var(--color-paper-sunken);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 16px;
    color: var(--color-ink);
  }

  /* ===================== Responsive ===================== */
  @media (max-width: 980px) {
    .sidebar-toggle { display: flex; }
    .sidebar {
      transform: translateX(-100%);
      /* 画面外のリンクがキーボードフォーカスを受け取らないよう visibility も落とす */
      visibility: hidden;
      transition: transform 0.2s ease, visibility 0.2s ease;
      box-shadow: none;
    }
    .sidebar.open { transform: translateX(0); visibility: visible; }
    .main-content { margin-left: 0; padding: 88px 24px 100px; }
    .hero h1 { font-size: 32px; }
    .stat-row { grid-template-columns: repeat(2, 1fr); }
    .domain-grid { grid-template-columns: repeat(2, 1fr); }
    .glossary-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 560px) {
    .stat-row { grid-template-columns: 1fr; }
    .domain-grid { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .sidebar { transition: none; }
  }

  .mermaid-wrap {
    border: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    border-radius: 12px;
    padding: 24px 20px 20px;
    margin: 28px 0;
  }

</style>
