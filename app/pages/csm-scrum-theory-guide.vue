<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-guide",
  "scrum-definition",
  "empiricism-lean",
  "three-pillars",
  "five-values",
  "iterative-incremental",
  "partial-implementation",
  "agile-manifesto",
  "overview-diagram",
  "practice-quiz",
  "summary-checklist",
  "references",
];

const activeId = useActiveHeading(TOC_IDS);
const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

const DIAGRAM_SCRUM_CYCLE = `flowchart LR
    A["プロダクトオーナーが 複雑な問題をプロダクトバックログに整理する"] --> B["スクラムチームが スプリント内で価値あるインクリメントを作り出す"]
    B --> C["スクラムチームとステークホルダーが 結果を検査し、次のスプリントに向けて適応する"]
    C -.->|"繰り返す Repeat"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`;

const DIAGRAM_PILLARS_CYCLE = `flowchart LR
    T["透明性 Transparency"] --> I["検査 Inspection"]
    I --> AD["適応 Adaptation"]
    AD -.->|"次のサイクルへ"| T

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class T hub;
    class I,AD box;`;

const DIAGRAM_INCREMENTAL_DELIVERY = `flowchart LR
    S1["スプリント1 機能A"] --> S2["スプリント2 機能A + B"]
    S2 --> S3["スプリント3 機能A + B + C"]
    S3 --> S4["スプリント4 機能A + B + C + D リリース可能な状態"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1,S2,S3 box;
    class S4 done;`;

const DIAGRAM_PARTIAL_IMPLEMENTATION_CHAIN = `flowchart TD
    P["Scrumの一部だけを導入 例えばレトロスペクティブを省略"] --> Q["透明性が低下する"]
    Q --> R["検査が不正確 不十分になる"]
    R --> S["適応の判断を誤る、または適応できない"]
    S --> T["経験主義のサイクルが機能しなくなる"]
    T --> U["リスクの増大 ムダの蓄積 Scrumへの誤った評価"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class P hub;
    class Q,R,S,T,U box;`;

const DIAGRAM_OVERALL_STRUCTURE = `flowchart TB
    subgraph F["理論的基盤"]
        E["経験主義 Empiricism"]
        L["リーンシンキング Lean Thinking"]
    end
    F --> P["経験主義の3本柱・透明性・検査・適応"]
    V["スクラムの5つの価値観・確約・集中・公開・尊敬・勇気"] -->|"作業・行動・振る舞いを方向づける"| P
    P -->|"価値観が体現されることで機能する"| TR["信頼 Trust"]
    TR --> O["予測可能性の向上とリスクの制御・反復的・漸進的なインクリメント"]
    O --> AL["アジャイル宣言の価値観・原則との整合"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class E,L,P,V box;
    class TR hub;
    class O,AL done;`;

useSeoMeta({
  title: "CSM® Scrum理論の基礎(Scrum Theory) 完全ガイド | 初学者向けステップバイステップ解説",
  description: "Scrum Alliance Certified ScrumMaster(CSM)のScrum Foundations Learning Objectives「Scrum Theory」(LO1.1-1.7)を、Scrum Guide 2020とScrum Alliance公式資料に基づき初学者向けに解説する完全ガイド。",
});
</script>

<template>
  <div class="guide-page">
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
            <div class="brand-title">Scrum Theory 完全ガイド</div>
            <div class="brand-subtitle">CSM® 試験対応</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li>
            <a href="#about-guide" :class="{ active: activeId === 'about-guide' }" :aria-current="activeId === 'about-guide' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:certificate" />このガイドについて
            </a>
          </li>
          <li>
            <a href="#scrum-definition" :class="{ active: activeId === 'scrum-definition' }" :aria-current="activeId === 'scrum-definition' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:book" />Scrumの定義
            </a>
          </li>
          <li>
            <a href="#empiricism-lean" :class="{ active: activeId === 'empiricism-lean' }" :aria-current="activeId === 'empiricism-lean' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:eye" />経験主義とリーンシンキング
            </a>
          </li>
          <li>
            <a href="#three-pillars" :class="{ active: activeId === 'three-pillars' }" :aria-current="activeId === 'three-pillars' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:columns" />経験主義の3本柱
            </a>
          </li>
          <li>
            <a href="#five-values" :class="{ active: activeId === 'five-values' }" :aria-current="activeId === 'five-values' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:heart-handshake" />5つの価値観
            </a>
          </li>
          <li>
            <a href="#iterative-incremental" :class="{ active: activeId === 'iterative-incremental' }" :aria-current="activeId === 'iterative-incremental' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:refresh" />反復的・漸進的アプローチ
            </a>
          </li>
          <li>
            <a href="#partial-implementation" :class="{ active: activeId === 'partial-implementation' }" :aria-current="activeId === 'partial-implementation' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:alert-triangle" />部分的導入の欠点
            </a>
          </li>
          <li>
            <a href="#agile-manifesto" :class="{ active: activeId === 'agile-manifesto' }" :aria-current="activeId === 'agile-manifesto' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:git-branch" />アジャイル宣言との整合性
            </a>
          </li>
          <li>
            <a href="#overview-diagram" :class="{ active: activeId === 'overview-diagram' }" :aria-current="activeId === 'overview-diagram' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:sitemap" />全体像のまとめ
            </a>
          </li>
          <li>
            <a href="#practice-quiz" :class="{ active: activeId === 'practice-quiz' }" :aria-current="activeId === 'practice-quiz' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:list-check" />理解度チェック
            </a>
          </li>
          <li>
            <a href="#summary-checklist" :class="{ active: activeId === 'summary-checklist' }" :aria-current="activeId === 'summary-checklist' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:flag-3" />学習到達度チェックリスト
            </a>
          </li>
          <li>
            <a href="#references" :class="{ active: activeId === 'references' }" :aria-current="activeId === 'references' ? 'location' : undefined" @click="closeSidebar">
              <Icon name="tabler:link" />参考文献・ソース一覧
            </a>
          </li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" />Scrum Alliance® Certified ScrumMaster®(CSM®)</div>
          <h1>Scrum理論の基礎(Scrum Theory) ― CSM®試験対応 初学者向け完全ガイド</h1>
          <p class="hero-lede">
            対象資格: Scrum Alliance® Certified ScrumMaster®(CSM®) / 対象範囲: Scrum Foundations Learning Objectives カテゴリー1「Scrum Theory」(LO 1.1〜1.7) / レベル: 初学者〜Scrumを学び始めたばかりの方
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">50問</div><div class="stat-label">1時間の選択式試験</div></div>
            <div class="stat-card"><div class="stat-number">37問以上</div><div class="stat-label">合格ライン(74%)の正解数</div></div>
            <div class="stat-card"><div class="stat-number">16時間</div><div class="stat-label">認定講師(CST)による受講が必須</div></div>
            <div class="stat-card"><div class="stat-number">LO 1.1-1.7</div><div class="stat-label">本ガイドが扱うScrum Theoryの範囲</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" />
            <div>
              本ガイドは学習支援を目的とした非公式の解説資料であり、Scrum Alliance®による公式教材ではありません。試験の出題範囲・受験資格・料金などの最新情報は必ず<a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance公式サイト</a>でご確認ください。
            </div>
          </div>
        </div>

        <!-- ===================== 01. About this guide ===================== -->
        <section id="about-guide">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" />SECTION 01</div>
          <h2>このガイドについて</h2>

          <h3>CSM®試験の全体像</h3>
          <p>CSM®は、Scrum Alliance®が提供する入門レベルのScrumマスター認定資格です。認定講師(CST®)による16時間のトレーニングコースを受講した後、オンラインの選択式試験(50問中37問正解=74%以上で合格)を受験します。試験は1時間以内に完了する必要があり、最初のウェルカムメール受信日から90日以内であれば受験費用込みで2回まで受験できます(90日を過ぎた場合や2回を超える場合も受験できますが、1回につき25米ドルの受験料が必要です)。</p>

          <h3>「Scrum Theory」はどこに位置づけられるか</h3>
          <p>Scrum Allianceの公式資料を確認すると、CSM®のLearning Objectives(学習目標)は以下の3カテゴリーに分かれています。</p>
          <ol>
            <li>Scrum(チームの責務、イベント、アーティファクト)</li>
            <li>Scrum Master Core Competencies(ファシリテーション、コーチングなど)</li>
            <li>Service to the Scrum Team, Product Owner, and Organization(組織への貢献)</li>
          </ol>
          <p>これらに加えて、CSM®とCSPO®の両方が共通の土台として学ぶ<strong>Scrum Foundations Learning Objectives</strong>という文書が存在し、その中の最初のカテゴリーが、まさに本ガイドのテーマである<strong>「Scrum Theory(Scrumの理論)」</strong>です。つまりScrum Theoryは、CSM資格特有の内容ではなく、<strong>Scrumを学ぶすべての人が最初に身につけるべき土台</strong>として公式に位置づけられています。</p>

          <p>Scrum Foundations Learning Objectivesの「Scrum Theory」セクションは、以下の7つの学習目標(LO)で構成されています。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>LO番号</th><th>学習目標(原文の要約)</th><th>本ガイドの該当セクション</th></tr></thead>
              <tbody>
                <tr><td>1.1</td><td>Scrumを定義できる</td><td><a href="#scrum-definition">Scrumの定義</a></td></tr>
                <tr><td>1.2</td><td>Scrumの5つの価値観を列挙できる</td><td><a href="#five-values">5つの価値観</a></td></tr>
                <tr><td>1.3</td><td>経験主義(Empiricism)を定義できる</td><td><a href="#empiricism-lean">経験主義とリーンシンキング</a></td></tr>
                <tr><td>1.4</td><td>経験主義の3本柱を列挙できる</td><td><a href="#three-pillars">経験主義の3本柱</a></td></tr>
                <tr><td>1.5</td><td>反復的・漸進的アプローチの利点を3つ以上説明できる</td><td><a href="#iterative-incremental">反復的・漸進的アプローチ</a></td></tr>
                <tr><td>1.6</td><td>Scrumを部分的にしか導入しなかった場合の欠点を2つ以上説明できる</td><td><a href="#partial-implementation">部分的導入の欠点</a></td></tr>
                <tr><td>1.7</td><td>Scrumがアジャイル宣言の価値観・原則とどう整合しているか説明できる</td><td><a href="#agile-manifesto">アジャイル宣言との整合性</a></td></tr>
              </tbody>
            </table>
          </div>
          <p>これらのLOは、Manifesto for Agile Software Development、Scrum Alliance公式のScrum Valuesページ、そして<strong>Scrum Guide(スクラムガイド)2020年版</strong>を根拠資料として作成されています。したがって本ガイドも、この3つの一次情報源に忠実に沿って解説します。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>Scrum Theoryは「暗記事項」ではなく「判断基準」として学ぶ。</strong>試験対策としてだけでなく、実務でスプリントの進め方に迷ったときに立ち返る原則として理解する。</li>
              <li><strong>学習の際は必ず一次情報源(Scrum Guide本文)を自分の目で読む。</strong>二次的な解説記事だけに頼ると、2020年版で削除・変更された用語を誤って覚えてしまうリスクがある。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">Scrum Alliance - Certified ScrumMaster(CSM)認定ページ</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance - CSM Learning Objectives(PDF)</a></li>
              <li><a href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">Scrum Alliance - Scrum Foundations Learning Objectives(PDF)</a></li>
              <li><a href="https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test" target="_blank" rel="noopener">Scrum Alliance Support - How do I take the CSM test?</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 02. Scrum definition (LO 1.1) ===================== -->
        <section id="scrum-definition">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book" />SECTION 02</div>
          <h2>Scrumの定義(LO 1.1)</h2>

          <h3>Scrumとは何か</h3>
          <p><em>Scrumは、人々・チーム・組織が、複雑な問題に対する適応的な解決策を通じて価値を生み出すことを助ける、軽量級のフレームワークである。</em>(Scrum Guide本文の趣旨を要約)</p>
          <p>ここで重要なのは、Scrumが「方法論(methodology)」ではなく「フレームワーク(framework)」だと明言されている点です。Scrumはプロジェクトの進め方を細部まで規定するものではなく、<strong>経験主義に基づく理論を実装するために最低限必要な要素だけ</strong>を定義した、意図的に不完全な骨組みです。具体的な技法(見積り手法やタスク管理ツールなど)はチームが状況に応じて自由に組み合わせるべきものとされています。</p>

          <h3>Scrumの由来</h3>
          <p>Scrumという名称は、1986年にHirotaka Takeuchi(一橋大学)とIkujiro Nonaka(一橋大学)がHarvard Business Reviewに寄稿した論文「The New New Product Development Game」に由来します。この論文は、高いパフォーマンスを発揮するクロスファンクショナルなチームを、ラグビーの「スクラム」になぞらえて論じたものです。その後1995年、Ken SchwaberとJeff Sutherlandが、米国テキサス州オースティンで開催されたOOPSLAカンファレンスにおいて、Scrumを正式なフレームワークとして初めて発表しました。</p>

          <h3>Scrumのサイクルを図で理解する</h3>
          <p>Scrum Guideは、Scrumの本質を次の3ステップの繰り返しとして説明しています。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCRUM_CYCLE" theme="base" />
            </ClientOnly>
            <div class="diagram-caption">プロダクトバックログの整理からインクリメント作成、検査と適応までの反復サイクル</div>
          </div>

          <p>このサイクルの中に、後述する「経験主義の3本柱(透明性・検査・適応)」がすでに埋め込まれていることに注目してください。Scrumの定義そのものが、経験主義を体現する構造になっています。</p>

          <h3>「軽量」であることの意味</h3>
          <p>Scrumは、Scrum Master/Product Owner/Developersという3つの責務、5つのイベント、3つのアーティファクトと3つのコミットメントという、必要最小限のルールだけで構成されています。必須の要素を省略したり、Scrumの定義と矛盾する変更を加えたりすると、それは「Scrumではない何か」になってしまう、とScrum Guideの末尾(End Note)で明言されています。一方で、Scrumのフレームワークの内側でさまざまな技法・手法・プラクティスを併用すること自体は妨げられません(この点は「部分的導入の欠点」のセクションで詳しく扱います)。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>「ルールが厳しい手法」ではなく「必要最小限の骨組み」として説明する。</strong>チームに新しくScrumを紹介するときは、その中身の詰め方はチームに委ねられたフレームワークだと伝える。</li>
              <li><strong>「なぜこのイベント・ルールが存在するのか」を経験主義(透明性・検査・適応)に立ち返って説明できるようにしておく。</strong>都度これができると、チームの納得感が高まる。</li>
              <li><strong>Scrumが元々ソフトウェア開発から生まれた経緯を知っておく。</strong>マーケティングやHRなど非IT領域での応用を説明する際の説得力が増す(Scrum Allianceも「ソフトウェア開発に起源を持ちながら、今日ではあらゆる業種で使われている」と説明している)。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide(2020年版)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance - What is Scrum?</a></li>
              <li><a href="https://hbr.org/1986/01/the-new-new-product-development-game" target="_blank" rel="noopener">Takeuchi &amp; Nonaka, "The New New Product Development Game," Harvard Business Review, 1986</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 03. Empiricism and lean thinking (LO 1.3) ===================== -->
        <section id="empiricism-lean">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:eye" />SECTION 03</div>
          <h2>Scrumの理論的基盤: 経験主義とリーンシンキング(LO 1.3)</h2>

          <h3>経験主義(Empiricism)の定義</h3>
          <p><em>Scrumは経験主義とリーンシンキングに基づいている。経験主義とは、知識は経験から得られ、意思決定は観察されたことに基づいて行われるという考え方である。</em>(Scrum Guide本文の趣旨を要約)</p>
          <p>ポイントは「観察されたこと(what is observed)」に基づいて意思決定を行うという部分です。これは、事前に立てた計画や予測ではなく、<strong>実際に起きた事実</strong>を判断の拠り所にするという考え方です。ソフトウェア開発のような「複雑(complex)」な領域では、未来に何が起こるかを正確に予測することはできません。Scrum Guideも「複雑な環境では、これから何が起こるかは分からない。前向きな意思決定に使えるのは、すでに起きたことだけである」と述べています。</p>

          <h3>リーンシンキング(Lean Thinking)</h3>
          <p>もう一つの理論的基盤がリーンシンキングです。リーンシンキングは、<strong>ムダを減らし、本質的な要素に焦点を当てる</strong>という考え方で、トヨタ生産方式に代表される製造業の改善思想に由来します。Scrumにおいては、次のような形で表れます。</p>
          <ul>
            <li>タイムボックス(時間の上限を決めること)によって、会議や作業に無制限に時間を費やすムダを防ぐ</li>
            <li>プロダクトバックログを「今必要な分だけ」詳細化する(過剰な事前計画というムダを避ける)</li>
            <li>インクリメントを小さく頻繁にリリースすることで、作りすぎ・手戻りというムダを最小化する</li>
          </ul>

          <h3>経験的プロセス制御 vs 予測型(決定論的)プロセス制御</h3>
          <p>初学者がつまずきやすいポイントとして、「経験的プロセス制御(empirical process control)」と、従来型のプロジェクト管理で使われる「予測型(決定論的)プロセス制御」の違いを整理しておきます。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>予測型(決定論的)アプローチ</th><th>経験的(Scrum)アプローチ</th></tr></thead>
              <tbody>
                <tr><td>計画の前提</td><td>要件・スコープは事前にほぼ確定できる</td><td>要件は不確実で、進めながら明らかになる(創発的)</td></tr>
                <tr><td>進捗の判断基準</td><td>事前計画に対する消化率</td><td>実際に検査可能な「インクリメント」の状態</td></tr>
                <tr><td>変化への対応</td><td>変更管理プロセスを経て計画を修正</td><td>各スプリントの終わりに定期的に適応する</td></tr>
                <tr><td>適した問題領域</td><td>単純(simple)〜煩雑(complicated)な問題</td><td>複雑(complex)で先が読めない問題</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>「経験主義」は必ず「観察された事実に基づく意思決定」という一文とセットで説明する。</strong>抽象的に「柔軟な考え方」とだけ説明すると、ニュアンスを問う設問に対応できなくなる。</li>
              <li><strong>チームメンバーには天気予報の例で説明すると理解が早い。</strong>1週間後の天気を完璧に予測するのは難しいが、「今、外を見て傘が必要かどうか」は正確に判断できる。Scrumはこの考え方をプロダクト開発に応用したものである。</li>
              <li><strong>定例会議やドキュメントを定期的に棚卸しする習慣をチームに根付かせる。</strong>「本当に価値を生んでいるか」をリーンシンキングの観点から問い直す。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide(2020年版)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 04. Three pillars (LO 1.4) ===================== -->
        <section id="three-pillars">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:columns" />SECTION 04</div>
          <h2>経験主義の3本柱(LO 1.4)</h2>

          <h3>3本柱の全体像</h3>
          <p>Scrum Guideは、経験主義を支える3つの柱として「透明性(Transparency)」「検査(Inspection)」「適応(Adaptation)」を挙げています。この3つは独立した概念ではなく、各反復のなかで<strong>透明性 → 検査 → 適応</strong>という一方向に進む連鎖として機能します。そして適応の結果はふたたび透明性の対象となり、次の反復で同じ連鎖が繰り返されます。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PILLARS_CYCLE" theme="base" />
            </ClientOnly>
            <div class="diagram-caption">透明性から検査、適応へと続く経験主義の3本柱の連鎖</div>
          </div>

          <p>Scrum Guideはこの連鎖について「透明性は検査を可能にする。透明性のない検査は、誤解を招き、ムダになる」「検査は適応を可能にする。適応のない検査は無意味である」という趣旨を述べています。つまり、3本柱のどれか一つでも欠けると、経験主義そのものが機能しなくなります。</p>

          <h3>各柱の詳細</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>柱</th><th>定義</th><th>Scrumにおける実現手段</th></tr></thead>
              <tbody>
                <tr><td><strong>透明性(Transparency)</strong></td><td>進行中のプロセスや作業の状態が、それを行う人・受け取る人の両方にとって見える状態であること。重要な意思決定は3つのアーティファクト(プロダクトバックログ、スプリントバックログ、インクリメント)の見え方に基づいて行われる</td><td>Definition of Done、プロダクトバックログの並び順、Sprint Reviewでのデモなど</td></tr>
                <tr><td><strong>検査(Inspection)</strong></td><td>アーティファクトや目標に向けた進捗を、望ましくないズレや問題を検出するために、頻繁かつ丁寧に確認すること</td><td>Daily Scrum、Sprint Review、Sprint Retrospectiveなど5つのイベントが提供するリズム(cadence)</td></tr>
                <tr><td><strong>適応(Adaptation)</strong></td><td>プロセスや成果物が許容範囲を逸脱していると判明した場合、できるだけ早く調整を行うこと</td><td>スプリントバックログの見直し、プロダクトバックログの並び替え、次スプリントへの改善アクションの反映</td></tr>
              </tbody>
            </table>
          </div>
          <p>Scrum Guideはさらに「適応は、関係者が権限を与えられておらず自己管理的でない場合、より困難になる」とも述べています。つまり適応を機能させるには、チームに実際の意思決定権(自己管理性)が必要であるという点が、試験でも狙われやすいポイントです。</p>

          <h3>「信頼(Trust)」の位置づけ(柱ではなく、柱によって築かれるもの)</h3>
          <p><strong>経験主義の柱は透明性・検査・適応の3つであり、「信頼」は柱ではありません。</strong>2020年版のScrum Guideで「信頼」が登場するのは経験主義のセクションではなく価値観のセクションで、「これらの価値観がスクラムチームと関係者に体現されたとき、経験主義の3本柱(透明性・検査・適応)が息を吹き込まれ、信頼が築かれる」という趣旨の記述です。つまり信頼は5つの価値観を体現した結果として築かれるものであり、柱と並列に置かれるものではありません。なお、信頼を「経験主義を支える隠れた第4の要素」と表現するのはScrum.orgのブログによる補足的な解釈であって、Scrum Guideの定義ではありません。試験では「経験主義の3本柱は何か」と問われるため、答えは常に透明性・検査・適応の3つです。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>透明性を高める実践: </strong>プロダクトバックログを常に最新の状態に保ち、誰でも参照できる場所に置く。Definition of Doneをチーム全員が同じ言葉で説明できるようにする。</li>
              <li><strong>検査を機能させる実践: </strong>Daily Scrumを「進捗報告会」ではなく「スプリントゴールへの到達可能性を検査する場」として運営する。検査の頻度をイベントの設計に委ね、場当たり的にしない。</li>
              <li><strong>適応を機能させる実践: </strong>検査で見つかった問題を先送りせず、可能な限り早く調整する。チームに実際の意思決定権がなければ検査しても適応できないため、スクラムマスターは組織的な障害(権限の壁)を取り除く役割を担う。</li>
              <li><strong>3本柱はセットで機能することを強調する。</strong>「透明性だけ高くて検査していない」といった状態を、チームの自己診断のチェックリストとして使う。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide(2020年版)</a></li>
              <li><a href="https://scrumguides.org/revisions.html" target="_blank" rel="noopener">Scrum Guide Revision History</a></li>
              <li><a href="https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism" target="_blank" rel="noopener">Scrum.org Blog - "The Three - Wait: Four - Elements of Empiricism"</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 05. Five values (LO 1.2) ===================== -->
        <section id="five-values">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:heart-handshake" />SECTION 05</div>
          <h2>Scrumの5つの価値観(LO 1.2)</h2>

          <h3>5つの価値観とは</h3>
          <p>Scrum Guideは「Scrumを成功裏に使うには、人々が5つの価値観をより上手に体現できるようになることが必要である」と述べ、次の5つを挙げています。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>価値観(英語)</th><th>日本語</th><th>Scrum Guideの説明の要約</th></tr></thead>
              <tbody>
                <tr><td>Commitment</td><td>確約(コミットメント)</td><td>スクラムチームはゴールの達成と、互いに支え合うことを確約する</td></tr>
                <tr><td>Focus</td><td>集中(フォーカス)</td><td>チームの主な焦点はスプリントの作業であり、ゴールに向けて最善の進捗を目指す</td></tr>
                <tr><td>Openness</td><td>公開(オープンネス)</td><td>スクラムチームと関係者は、作業や課題についてオープンである</td></tr>
                <tr><td>Respect</td><td>尊敬(リスペクト)</td><td>チームメンバーは互いを有能で自立した人間として尊重し合う</td></tr>
                <tr><td>Courage</td><td>勇気(カレッジ)</td><td>正しいことを行い、難しい問題に取り組む勇気を持つ</td></tr>
              </tbody>
            </table>
          </div>
          <p>Scrum Alliance公式ページも、それぞれの価値観について実務的な言い換えを提示しています。例えば「Commitment」については「チームは達成できると信じられる作業しか引き受けず、過剰なコミットメントを避ける」、「Courage」については「現状に対して『No』と言う、助けを求める、新しいことを試す勇気を持つ」といった具体的な行動例が示されています。</p>

          <h3>価値観と3本柱・信頼の関係</h3>
          <p>Scrum Guideは、価値観と経験主義の3本柱の関係を次のように位置づけています。「これらの価値観は、スクラムチームの作業・行動・振る舞いに方向性を与える。意思決定・行動・Scrumの使い方は、これらの価値観を強化するものであるべきで、損なうものであってはならない」という趣旨です。つまり価値観は、3本柱を機能させるための<strong>行動規範</strong>であり、両者は独立したものではなく一体として学ぶ必要があります。</p>

          <h3>各価値観のベストプラクティス</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>価値観</th><th>体現するための具体的な実践(ベストプラクティス)</th></tr></thead>
              <tbody>
                <tr><td>Commitment</td><td>スプリントプランニングで「できると確信できる分だけ」を選ぶ。過去のベロシティを参考にしつつ、根拠のない楽観的な見積りを避ける</td></tr>
                <tr><td>Focus</td><td>スプリント中の割り込みタスクを可視化し、スプリントゴールとの関連性をチームで判断してから受け入れる</td></tr>
                <tr><td>Openness</td><td>Sprint Reviewやレトロスペクティブで、進捗だけでなく「困っていること」も率直に共有する文化を作る</td></tr>
                <tr><td>Respect</td><td>レトロスペクティブでは個人を責めず、プロセスや仕組みに焦点を当てたフィードバックを行う</td></tr>
                <tr><td>Courage</td><td>「この見積りは根拠が薄い」「このやり方は非効率だ」と気づいたときに、役職に関係なく発言できる心理的安全性を整える</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス(スクラムマスター視点)</div>
            <ul>
              <li><strong>レトロスペクティブの冒頭で価値観を振り返る時間を設ける。</strong>ポスターや壁掛けとして掲示するだけでなく、「今スプリント、どの価値観が体現できていたか/できていなかったか」を確認する。</li>
              <li><strong>新しいメンバーには文脈込みで価値観を伝える。</strong>5つの価値観を「ルール」としてではなく「なぜこの価値観が必要なのか(経験主義を機能させるため)」という理由とセットで伝える。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide(2020年版)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">Scrum Alliance - Scrum Values</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 06. Iterative and incremental (LO 1.5) ===================== -->
        <section id="iterative-incremental">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" />SECTION 06</div>
          <h2>反復的・漸進的アプローチの利点(LO 1.5)</h2>

          <h3>「反復的」と「漸進的」の違い</h3>
          <p>Scrum Guideは「Scrumは反復的・漸進的なアプローチを採用し、予測可能性を最適化し、リスクを制御する」と述べています。この2つの言葉はセットで語られることが多いですが、意味は異なります。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>用語</th><th>意味</th><th>具体例</th></tr></thead>
              <tbody>
                <tr><td><strong>反復的(Iterative)</strong></td><td>同じサイクル(スプリント)を繰り返しながら、学びやフィードバックをもとに軌道修正していくこと</td><td>毎スプリントの終わりにレビューとレトロスペクティブを行い、次のスプリントの計画に反映する</td></tr>
                <tr><td><strong>漸進的(Incremental)</strong></td><td>既存のプロダクトに対して、小さな改善・機能追加を積み重ねていくこと</td><td>各スプリントで完成した機能を少しずつ積み上げ、プロダクト全体を作り上げていく</td></tr>
              </tbody>
            </table>
          </div>
          <p>Scrumはこの2つを組み合わせることで、「小さく作って、検証して、積み上げる」というサイクルを実現しています。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_INCREMENTAL_DELIVERY" theme="base" />
            </ClientOnly>
            <div class="diagram-caption">スプリントを重ねるごとに機能が積み上がる漸進的デリバリーの流れ</div>
          </div>

          <h3>反復的・漸進的アプローチの利点(3つ以上)</h3>
          <p>Scrum GuideとScrum Alliance公式ページを根拠に、代表的な利点を整理します。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>利点</th><th>説明</th></tr></thead>
              <tbody>
                <tr><td>1. 予測可能性の向上とリスクの制御</td><td>小さいサイクルで検証を繰り返すため、大きな手戻りが起きる前に軌道修正でき、プロジェクト全体のリスクを抑えられる</td></tr>
                <tr><td>2. 早いフィードバックループ</td><td>動くインクリメントを早期かつ頻繁に届けることで、ステークホルダーからのフィードバックを早い段階で得られる</td></tr>
                <tr><td>3. 変化するニーズへの対応力向上</td><td>市場要件や優先順位の変化に応じて、次のスプリントで計画を調整できる</td></tr>
                <tr><td>4. ボトルネックの可視化</td><td>継続的にインクリメントを検査することで、価値提供を妨げているチームや組織のボトルネックを発見しやすくなる</td></tr>
                <tr><td>5. ステークホルダーへの透明性向上</td><td>動くプロダクトインクリメントを頻繁に提供することで、進捗が「報告」ではなく「実物」で伝わる</td></tr>
                <tr><td>6. ムダの削減</td><td>問題を早期に発見できるため、誤った方向に長時間・大量のリソースを投じてしまうムダを防げる(リーンシンキングとの接続)</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>スプリントの長さは「短ければ短いほど良い」わけではない。</strong>Scrum Guideも、期間が長すぎるとスプリントゴールが無効になったり複雑性やリスクが増したりする可能性がある一方、短いスプリントは学習サイクルを増やしリスクを限定できると説明している。チームの成熟度・プロダクトの不確実性に応じて適切な長さ(1ヶ月以内)を選ぶ。</li>
              <li><strong>Sprint ReviewやRetrospectiveで得た学びを、次のスプリントプランニングに確実に反映する仕組みを作る。</strong>改善アクションをプロダクトバックログやスプリントバックログに明示的に追加する。</li>
              <li><strong>バーンダウン・バーンアップチャートは経験主義の代わりにはならない。</strong>ツールの数値だけを信じず、実際のインクリメントの状態(検査可能な事実)を優先する。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide(2020年版)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance - What is Scrum?</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 07. Partial implementation (LO 1.6) ===================== -->
        <section id="partial-implementation">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" />SECTION 07</div>
          <h2>Scrumを部分的に導入した場合の欠点(LO 1.6)</h2>

          <h3>「部分的な導入」とは何か</h3>
          <p>Scrum Guideは末尾(End Note)で次のように明言しています。</p>
          <p><em>Scrumは無料で、このガイドの中で提供されている。本書で説明されているScrumフレームワークは不変である。Scrumの一部だけを実装することは可能だが、その結果はScrumではない。</em>(Scrum Guide本文の趣旨を要約)</p>
          <p>これは非常に重要な一文です。Scrumはイベント・アーティファクト・責務・ルールが相互に依存し合う設計になっているため、都合の良い部分だけをつまみ食いすると、フレームワーク全体が機能しなくなります。この現象は、コミュニティでは俗に<strong>「Scrum-But(スクラム・バット)」</strong>(=「Scrumを使っているが、〇〇だけはやっていない」という状態)と呼ばれています。</p>

          <h3>Scrum Allianceが指摘する「機械的なScrum(Mechanical Scrum)」</h3>
          <p>Scrum Allianceの公式ページも、価値観と経験主義を体現せずにイベントの形だけをなぞる状態を「機械的なScrum(mechanical scrum)」と呼び、次のように述べています。</p>
          <p><em>Scrumの価値観と経験主義を体現せずにScrumを実践すること(=機械的なScrum)は可能だが、Scrumがもたらす真の恩恵は、チームと組織がScrumの価値観と経験主義を体現したときにのみ得られる。</em>(Scrum Alliance公式ページの趣旨を要約)</p>

          <h3>部分的導入がもたらす代表的な欠点(2つ以上)</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>欠点</th><th>内容</th></tr></thead>
              <tbody>
                <tr><td>1. 経験主義の3本柱が機能不全に陥る</td><td>例えばレトロスペクティブを省略すると「検査」と「適応」の機会が失われ、プロセス改善のサイクルが止まる。Daily Scrumを省略すると、スプリントゴールに対する日次の検査ができなくなる</td></tr>
                <tr><td>2. 意思決定の質が低下し、リスクが増大する</td><td>Scrum Guideも「透明性の低いアーティファクトは、価値を損ない、リスクを高める意思決定につながる」と述べている。一部のイベントやアーティファクトを省略すると、この透明性が下がり、誤った判断をするリスクが高まる</td></tr>
                <tr><td>3. 「機械的なScrum」に陥り、恩恵が得られない</td><td>イベントの形式だけをなぞり、価値観(確約・集中・公開・尊敬・勇気)が体現されないと、Scrumを導入した「つもり」でも実際の効果(早いフィードバック、リスク低減など)が得られない</td></tr>
                <tr><td>4. ムダが蓄積し、リーンシンキングの目的を損なう</td><td>問題の発見が遅れることで、誤った方向への投資が続き、結果的にムダ(手戻り、非効率な作業)が増える</td></tr>
                <tr><td>5. 「Scrumが機能しなかった」という誤った結論につながる</td><td>部分的な導入で失敗した場合、原因が「導入が不完全だったこと」にあるにもかかわらず、「Scrumというフレームワーク自体が悪い」と誤解されるケースが実務でよく見られる</td></tr>
              </tbody>
            </table>
          </div>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PARTIAL_IMPLEMENTATION_CHAIN" theme="base" />
            </ClientOnly>
            <div class="diagram-caption">Scrumの部分的導入が経験主義の機能不全とリスク増大に至る因果連鎖</div>
          </div>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>5つのイベント・3つのアーティファクト・3つの責務を一体のフレームワークとして導入する。</strong>「まずはDaily Scrumだけ」のように一部だけを試すのではなく、段階的に導入する場合も「今は部分的な導入であり、Scrumそのものではない」という認識をチームと組織の双方で共有する。</li>
              <li><strong>イベントが「形骸化」していないかを定期的に点検する。</strong>「Sprint Reviewがステータス報告会になっていないか」「Retrospectiveがただの雑談になっていないか」を確認する。</li>
              <li><strong>「なぜこの要素が必要なのか」を経験主義の3本柱に結び付けて組織に説明する。</strong>安易な省略を防ぎやすくなる。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide(2020年版)</a></li>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance - What is Scrum?</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 08. Agile Manifesto alignment (LO 1.7) ===================== -->
        <section id="agile-manifesto">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 08</div>
          <h2>アジャイル宣言とScrumの整合性(LO 1.7)</h2>

          <h3>アジャイル宣言の背景</h3>
          <p>2001年2月、米国ユタ州スノーバードに集まった17名のソフトウェア開発者(Kent Beck、Ken Schwaber、Jeff Sutherland、Martin Fowlerなど)が、それぞれが提唱していた軽量な開発手法(Scrum、XPなど)に共通する価値観を議論し、「Manifesto for Agile Software Development(アジャイルソフトウェア開発宣言)」としてまとめました。Scrum Allianceも、この宣言が2001年2月11日に公開されたことを明記しています。</p>

          <h3>アジャイル宣言の4つの価値</h3>
          <p>アジャイル宣言は、次の4つの対比構造で価値観を表現しています。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>重視するもの</th><th>相対的に重視度が下がるもの</th></tr></thead>
              <tbody>
                <tr><td>個人と対話</td><td>プロセスやツール</td></tr>
                <tr><td>動くソフトウェア</td><td>包括的なドキュメント</td></tr>
                <tr><td>顧客との協調</td><td>契約交渉</td></tr>
                <tr><td>変化への対応</td><td>計画に従うこと</td></tr>
              </tbody>
            </table>
          </div>
          <p>宣言文には「右記の事柄にも価値があることを認めながらも、私たちは左記の事柄をより重視する」という趣旨が明記されており、右側を全否定しているわけではない点に注意が必要です。</p>

          <h3>Scrumはアジャイル宣言の価値観・原則をどう体現しているか</h3>
          <p>Scrum AllianceはCSM Learning Objectivesの根拠資料としてアジャイル宣言を明示的に挙げており、Scrumはアジャイル宣言の価値観・原則を具体的な仕組みに落とし込んだフレームワークだと位置づけられます。代表的な対応関係を整理すると、次のようになります。</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>アジャイル宣言の価値観・原則(趣旨の要約)</th><th>Scrumにおける具体的な体現</th></tr></thead>
              <tbody>
                <tr><td>個人と対話を、プロセスやツールより重視する</td><td>Daily Scrumでの直接対話、自己管理型のScrumチーム、Scrum Masterによるファシリテーション</td></tr>
                <tr><td>動くソフトウェアを、包括的なドキュメントより重視する</td><td>インクリメントとDefinition of Done(「完成」の基準は文書ではなく動く成果物)</td></tr>
                <tr><td>顧客との協調を、契約交渉より重視する</td><td>Sprint Reviewでのステークホルダーとの協働、プロダクトオーナーによる継続的な優先順位付け</td></tr>
                <tr><td>変化への対応を、計画に従うことより重視する</td><td>スプリントごとのプロダクトバックログの見直し、経験主義に基づく適応</td></tr>
                <tr><td>価値あるソフトウェアを早く継続的に届ける(原則1)</td><td>1ヶ月以内のタイムボックスであるスプリントと、頻繁なインクリメントのリリース</td></tr>
                <tr><td>開発の後期であっても要求の変更を歓迎する(原則2)</td><td>プロダクトバックログの創発性(emergent)、スプリントゴールを守りつつスコープを柔軟に調整する仕組み</td></tr>
                <tr><td>自己組織的なチームから最良のアーキテクチャ・要求・設計が生まれる</td><td>クロスファンクショナルで自己管理型(self-managing)なScrumチームの設計</td></tr>
                <tr><td>シンプルさ(ムダなく作る量を最大化する技術)を大切にする</td><td>リーンシンキングに基づくタイムボックス、必要最小限のフレームワーク設計</td></tr>
              </tbody>
            </table>
          </div>
          <p>このように、Scrumはアジャイル宣言の「思想(マインドセット)」を、スプリント・イベント・アーティファクトという<strong>具体的で実行可能な仕組み</strong>に変換したものだと理解すると、LO 1.7の趣旨(Scrumとアジャイル宣言の整合性の説明)に対応できます。</p>

          <div class="callout practice" data-variant="practice" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li><strong>「ScrumとAgileは同じものか」には、両者の関係を整理して答える。</strong>「Agileは価値観と原則の集合(アジャイル宣言)であり、Scrumはその価値観・原則を実践するための具体的なフレームワークの一つ」と説明する。</li>
              <li><strong>Scrumを導入する際は、背後にあるアジャイル宣言の価値観・原則とセットで説明する。</strong>単に「イベントとルール」を教えるより、「なぜこのルールがあるのか」への納得感が高まる。</li>
              <li><strong>アジャイル宣言の12の原則を一度は原文(日本語版)で読む。</strong>Scrumのどの要素がどの原則に対応しているかを自分なりに整理しておくと、CSM試験の応用的な設問にも対応しやすくなる。</li>
            </ul>
          </div>

          <div class="callout source" data-variant="source" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">Scrum Alliance - What is Scrum?</a></li>
              <li><a href="https://agilemanifesto.org/" target="_blank" rel="noopener">Manifesto for Agile Software Development(英語原文)</a></li>
              <li><a href="https://agilemanifesto.org/iso/ja/manifesto.html" target="_blank" rel="noopener">アジャイルソフトウェア開発宣言(公式日本語訳)</a></li>
              <li><a href="https://agilemanifesto.org/iso/ja/principles.html" target="_blank" rel="noopener">アジャイル宣言の背後にある原則(公式日本語訳)</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 09. Overview diagram ===================== -->
        <section id="overview-diagram">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:sitemap" />SECTION 09</div>
          <h2>Scrum Theory 全体像のまとめ図</h2>

          <p>ここまで解説してきたScrum Theoryの構成要素を、1つの図に整理します。</p>

          <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_OVERALL_STRUCTURE" theme="base" />
            </ClientOnly>
            <div class="diagram-caption">経験主義とリーンシンキングを土台としたScrum Theory全体の構造</div>
          </div>

          <p>この図が示す通り、Scrum Theoryは「経験主義とリーンシンキング」を土台とし、その上に「経験主義の3本柱」が立ちます。「5つの価値観」は3本柱から生まれるものではなく、逆にScrum Teamの作業・行動・振る舞いを方向づけるものです。価値観がチームとその周囲の人々に体現されて初めて3本柱が実際に機能し、その結果として「信頼」が築かれます。そしてこの信頼を土台に「予測可能性の向上とリスクの制御」というScrumの実利的な効果が得られる、という相互作用の構造になっています。そしてこの構造全体が、アジャイル宣言の思想を具体化したものである、という位置づけです。</p>
        </section>

        <!-- ===================== 10. Practice quiz ===================== -->
        <section id="practice-quiz">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 10</div>
          <h2>理解度チェック(練習問題)</h2>

          <p>以下は、本ガイドの内容をもとに作成した<strong>オリジナルのpractice問題</strong>です(実際のCSM試験問題そのものではありません)。各LOの理解度確認にご活用ください。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>#</th><th>問題</th><th>解答・解説</th></tr></thead>
              <tbody>
                <tr><td>Q1</td><td>Scrum Guideにおいて、Scrumが基づいているとされる2つの理論的基盤は何か。</td><td>経験主義(Empiricism)とリーンシンキング(Lean Thinking)</td></tr>
                <tr><td>Q2</td><td>経験主義の3本柱を、正しい連鎖の順序で答えよ。</td><td>透明性(Transparency)→検査(Inspection)→適応(Adaptation)</td></tr>
                <tr><td>Q3</td><td>「透明性のない検査」は、Scrum Guideによればどのような状態とされているか。</td><td>「誤解を招き、ムダになる(misleading and wasteful)」状態</td></tr>
                <tr><td>Q4</td><td>Scrumの5つの価値観のうち、「チームの主な焦点をスプリントの作業に置く」ことを表す価値観はどれか。</td><td>Focus(集中)</td></tr>
                <tr><td>Q5</td><td>「反復的(Iterative)」と「漸進的(Incremental)」の違いを、それぞれ一文で説明せよ。</td><td>反復的: 同じサイクルを繰り返しながら学びをもとに軌道修正すること。漸進的: 既存のプロダクトに対して小さな改善・機能追加を積み重ねること</td></tr>
                <tr><td>Q6</td><td>Scrum Allianceが「機械的なScrum」と呼ぶ状態とは、どのような状態か。</td><td>Scrumの価値観と経験主義を体現せず、イベントの形式だけをなぞって実践している状態</td></tr>
                <tr><td>Q7</td><td>Scrum Guideの末尾(End Note)は、Scrumを部分的にしか実装しなかった場合の結果について、何と述べているか。</td><td>「Scrumの一部だけを実装することは可能だが、その結果はScrumではない」という趣旨</td></tr>
                <tr><td>Q8</td><td>アジャイル宣言の4つの価値のうち、「変化への対応」と対になっている(相対的に重視度が下がるとされる)事柄は何か。</td><td>「計画に従うこと」</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ===================== 11. Summary checklist ===================== -->
        <section id="summary-checklist">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 11</div>
          <h2>まとめ: 学習到達度チェックリスト</h2>

          <ul>
            <li>Scrumが「フレームワーク」であり「方法論」ではないことを、自分の言葉で説明できる(LO 1.1)</li>
            <li>Scrumの5つの価値観(確約・集中・公開・尊敬・勇気)を、順不同で全て挙げられる(LO 1.2)</li>
            <li>経験主義の定義(「観察されたことに基づく意思決定」)を正確に説明できる(LO 1.3)</li>
            <li>経験主義の3本柱(透明性・検査・適応)を、その連鎖関係とともに説明できる(LO 1.4)</li>
            <li>反復的・漸進的アプローチの利点を3つ以上、具体例とともに挙げられる(LO 1.5)</li>
            <li>Scrumを部分的にしか導入しなかった場合の欠点を2つ以上、具体例とともに挙げられる(LO 1.6)</li>
            <li>Scrumがアジャイル宣言の価値観・原則とどのように整合しているか、具体的な対応関係を説明できる(LO 1.7)</li>
          </ul>
          <p>これら7項目すべてに自信を持ってチェックできるようになれば、CSM試験の「Scrum Theory」領域に対する準備は整ったと言えます。次のステップとして、Scrum Foundationsの残り3カテゴリー(The Scrum Team/Scrum Events and Activities/Scrum Artifacts and Commitments)、および CSM固有のLearning Objectives(Scrum Master Core CompetenciesやService to the Scrum Team, Product Owner, and Organizationなど)へと学習を進めることをお勧めします。</p>
        </section>

        <!-- ===================== 12. References ===================== -->
        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 12</div>
          <h2>参考文献・ソース一覧</h2>

          <p>本ガイドの内容は、以下の一次情報源に基づいて作成しています。</p>

          <div class="ref-group">
            <h3>Scrum Guide</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Scrum Guide(2020年11月版) / Ken Schwaber &amp; Jeff Sutherland</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
              <li><span class="ref-name">Scrum Guide 2020 PDF(US版)</span><a class="ref-url" href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" target="_blank" rel="noopener">https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf</a></li>
              <li><span class="ref-name">Scrum Guide Revision History</span><a class="ref-url" href="https://scrumguides.org/revisions.html" target="_blank" rel="noopener">https://scrumguides.org/revisions.html</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>Scrum Alliance</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Certified ScrumMaster(CSM)認定ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster</a></li>
              <li><span class="ref-name">Certified ScrumMaster Learning Objectives(2022年1月版, PDF)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf</a></li>
              <li><span class="ref-name">Scrum Foundations Learning Objectives(2022年1月版, PDF)</span><a class="ref-url" href="https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf</a></li>
              <li><span class="ref-name">What is Scrum?(Scrum values / Empiricism and iteration を含む)</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum</a></li>
              <li><span class="ref-name">Scrum Values</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
              <li><span class="ref-name">Support - How do I take the CSM test?</span><a class="ref-url" href="https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test" target="_blank" rel="noopener">https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>Manifesto for Agile Software Development</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Manifesto for Agile Software Development(英語原文)</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
              <li><span class="ref-name">アジャイルソフトウェア開発宣言(公式日本語訳)</span><a class="ref-url" href="https://agilemanifesto.org/iso/ja/manifesto.html" target="_blank" rel="noopener">https://agilemanifesto.org/iso/ja/manifesto.html</a></li>
              <li><span class="ref-name">アジャイル宣言の背後にある原則(公式日本語訳)</span><a class="ref-url" href="https://agilemanifesto.org/iso/ja/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/iso/ja/principles.html</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>その他の一次・二次資料</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Takeuchi, H. &amp; Nonaka, I., "The New New Product Development Game," Harvard Business Review, 1986</span><a class="ref-url" href="https://hbr.org/1986/01/the-new-new-product-development-game" target="_blank" rel="noopener">https://hbr.org/1986/01/the-new-new-product-development-game</a></li>
              <li><span class="ref-name">Scrum.org Blog - "The Three - Wait: Four - Elements of Empiricism"(Stefan Wolpers)</span><a class="ref-url" href="https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism</a></li>
            </ul>
          </div>

          <div class="callout note" data-variant="note" data-testid="callout">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>本ガイドはScrum Alliance®の公式試験問題そのものを含んでいません。「理解度チェック」の練習問題は、公開されているLearning Objectivesをもとに独自に作成したオリジナル問題です。Scrum Guideの著作権表記: <em>The Scrum Guide is &copy; 2020 Ken Schwaber and Jeff Sutherland. Content from The Scrum Guide is used under the terms of the Creative Commons - Attribution - Share-Alike License v. 4.0.</em>(<a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" target="_blank" rel="noopener">creativecommons.org/licenses/by-sa/4.0/legalcode</a>)</p>
          </div>
        </section>

        <footer>
          Scrum®, Scrum Alliance®, Certified ScrumMaster®, CSM® は Scrum Alliance, Inc. の登録商標です。本ガイドの内容はThe Scrum Guide(2020, Ken Schwaber &amp; Jeff Sutherland)を出典とし、Creative Commons - Attribution - Share-Alike License v4.0の条件のもとで利用しています。本ガイドはいかなる形でもScrum Allianceによる公認・提携を意味しません。
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: block;
}

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
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar-nav a :deep(.icon),
.sidebar-nav a i {
  font-size: 17px;
  color: var(--color-ink-faint);
  flex: none;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  text-decoration: none;
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.sidebar-nav a.active :deep(.icon),
.sidebar-nav a.active i {
  color: var(--color-indigo);
}

.main-content {
  margin-left: var(--sidebar-width);
  padding: 56px 72px 120px;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: var(--color-paper-raised);
  border: none;
  box-shadow: 0 4px 12px rgba(22, 27, 38, 0.2);
  cursor: pointer;
  z-index: 30;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.hero {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 36px;
  margin-bottom: 56px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 18px;
}

h1 {
  font-family: var(--font-display);
  font-size: 38px;
  line-height: 1.3;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}

.hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 18px 20px;
  text-align: center;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.1;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-soft);
  margin-top: 6px;
}

.disclaimer-box {
  background: var(--color-gold-tint);
  border: 1px solid #E6D0A6;
  border-radius: 10px;
  padding: 16px 20px;
  margin-top: 28px;
  font-size: 16px;
  color: #7A5318;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  line-height: 1.6;
}

.disclaimer-box :deep(svg),
.disclaimer-box :deep(.icon),
.disclaimer-box i {
  font-size: 20px;
  color: var(--color-gold);
  flex: none;
  margin-top: 3px;
}

.disclaimer-box a {
  color: #5C3D0E;
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
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

h2 {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.35;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.4;
  font-weight: 600;
  color: var(--color-ink);
  margin: 36px 0 16px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p {
  margin: 0 0 18px;
  color: var(--color-ink);
  line-height: 1.7;
}

ul, ol {
  margin: 0 0 20px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.table-wrap {
  overflow-x: auto;
  margin: 24px 0;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  max-width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
}

thead {
  background: var(--color-indigo);
  color: #FFFFFF;
}

th {
  padding: 14px 18px;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-size: 16px;
  border: none;
}

td {
  padding: 14px 18px;
  border-top: 1px solid var(--color-border);
  vertical-align: top;
  line-height: 1.6;
}

tbody tr:nth-child(even) {
  background: var(--color-paper-sunken);
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 14px;
  font-style: italic;
}

.callout {
  border-radius: 10px;
  padding: 20px 24px;
  margin: 28px 0;
  border-left: 4px solid;
}

.callout-title {
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.callout.practice {
  background: var(--color-success-bg);
  border-color: var(--color-success-text);
  color: #1E4627;
}

.callout.practice .callout-title {
  color: var(--color-success-text);
}

.callout.source {
  background: var(--color-info-bg);
  border-color: var(--color-indigo);
  color: var(--color-indigo-dark);
}

.callout.source .callout-title {
  color: var(--color-indigo);
}

.callout.note {
  background: var(--color-gold-tint);
  border-color: var(--color-gold);
  color: #614311;
}

.callout.note .callout-title {
  color: var(--color-gold);
}

.callout ul {
  margin: 0;
  padding-left: 20px;
}

.callout li {
  margin-bottom: 8px;
}

.callout p:last-child {
  margin-bottom: 0;
}

.ref-group {
  margin-bottom: 28px;
}

.ref-group h3 {
  margin-top: 0;
}

.ref-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ref-list li {
  padding: 12px 0;
  border-bottom: 1px dashed var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ref-list li:last-child {
  border-bottom: none;
}

.ref-name {
  font-weight: 600;
  color: var(--color-ink);
}

.ref-url {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--color-indigo);
  word-break: break-all;
}

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  font-size: 16px;
  color: var(--color-ink-faint);
  line-height: 1.6;
}

@media (max-width: 1039px) {
  .sidebar {
    transform: translateX(-100%);
    /* 画面外のリンクがキーボードフォーカスを受け取らないよう visibility も落とす */
    visibility: hidden;
    transition: transform 0.25s ease, visibility 0.25s ease;
  }

  .sidebar.open {
    transform: translateX(0);
    visibility: visible;
    box-shadow: 4px 0 20px rgba(22, 27, 38, 0.15);
  }

  .main-content {
    margin-left: 0;
    padding: 88px 24px 100px;
  }

  .sidebar-toggle {
    display: flex;
  }

  .stat-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  h1 { font-size: 28px; }
  h2 { font-size: 23px; }
  h3 { font-size: 19px; }
  .stat-row { grid-template-columns: 1fr; }
}
</style>
