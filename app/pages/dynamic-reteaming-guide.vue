<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { MERMAID_THEME_VARIABLES } from "~/utils/mermaid-theme";

const TOC_IDS = [
  "introduction",
  "what-is-dynamic-reteaming",
  "why-it-matters",
  "ecocycle",
  "five-patterns",
  "pattern-selection",
  "step-by-step",
  "anti-patterns",
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
  title: "ダイナミック・リチーミング実践ガイド ｜ 変化に強いチームをつくるステップ・バイ・ステップのベストプラクティス",
  description: "Heidi Helfand氏が提唱したダイナミック・リチーミングの基本概念、5つのパターン、実践のためのステップ・バイ・ステップの手順を初学者向けに解説するガイド。",
});

const DIAGRAM_ECOCYCLE = `flowchart TB
    A["フロントループ 立ち上げ 探索"] --> B["フロントループ 成長・成熟 活用"]
    B --> C["バックループの兆し 硬直化・停滞"]
    C --> D["創造的破壊 リチーミングの実行"]
    D --> E["再構成 新しいチームの誕生"]
    E --> A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`;

const DIAGRAM_PATTERN_SELECTION = `flowchart TB
    Start["チームに変化の兆しがある"] --> Q1{"新しい人が加わる、または抜けるだけか?"}
    Q1 -- "はい" --> P1["パターン1 One by One"]
    Q1 -- "いいえ" --> Q2{"チームが大きくなりすぎて意思決定が遅い?"}
    Q2 -- "はい" --> P2["パターン2 Grow and Split"]
    Q2 -- "いいえ" --> Q3{"集中的な新規開発や危機対応が必要?"}
    Q3 -- "はい" --> P3["パターン3 Isolation"]
    Q3 -- "いいえ" --> Q4{"複数チーム、または組織を統合する必要がある?"}
    Q4 -- "はい" --> P4["パターン4 Merging"]
    Q4 -- "いいえ" --> P5["パターン5 Switching"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,Q2,Q3,Q4 box;
    class P1,P2,P3,P4,P5 done;`;

const DIAGRAM_STEP_BY_STEP = `flowchart TB
    S1["Step1 シグナルを察知する"] --> S2["Step2 リチーミングFAQを作成する"]
    S2 --> S3["Step3 チームを巻き込み合意形成する"]
    S3 --> S4["Step4 新チームを正式にキックオフする"]
    S4 --> S5["Step5 移行期をケアする キャリブレーション"]
    S5 --> S6["Step6 ふりかえりを行う"]
    S6 -.-> S1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5 box;
    class S6 done;`;
</script>

<template>
  <div class="layout">
    <button
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
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">ダイナミック・リチーミング</div>
          <div class="brand-subtitle">実践ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li>
          <a href="#introduction" :class="{ active: activeId === 'introduction' }" @click="closeSidebar">
            <Icon name="tabler:certificate" />1. はじめに
          </a>
        </li>
        <li>
          <a href="#what-is-dynamic-reteaming" :class="{ active: activeId === 'what-is-dynamic-reteaming' }" @click="closeSidebar">
            <Icon name="tabler:building-bank" />2. とは何か
          </a>
        </li>
        <li>
          <a href="#why-it-matters" :class="{ active: activeId === 'why-it-matters' }" @click="closeSidebar">
            <Icon name="tabler:chart-pie" />3. なぜ重要なのか
          </a>
        </li>
        <li>
          <a href="#ecocycle" :class="{ active: activeId === 'ecocycle' }" @click="closeSidebar">
            <Icon name="tabler:refresh" />4. チームのエコサイクル
          </a>
        </li>
        <li>
          <a href="#five-patterns" :class="{ active: activeId === 'five-patterns' }" @click="closeSidebar">
            <Icon name="tabler:git-branch" />5. 5つの基本パターン
          </a>
        </li>
        <li>
          <a href="#pattern-selection" :class="{ active: activeId === 'pattern-selection' }" @click="closeSidebar">
            <Icon name="tabler:list-check" />6. パターンの選び方
          </a>
        </li>
        <li>
          <a href="#step-by-step" :class="{ active: activeId === 'step-by-step' }" @click="closeSidebar">
            <Icon name="tabler:route" />7. 実践ステップ
          </a>
        </li>
        <li>
          <a href="#anti-patterns" :class="{ active: activeId === 'anti-patterns' }" @click="closeSidebar">
            <Icon name="tabler:clipboard-text" />8. アンチパターン
          </a>
        </li>
        <li>
          <a href="#checklist" :class="{ active: activeId === 'checklist' }" @click="closeSidebar">
            <Icon name="tabler:clipboard-check" />9. 実践チェックリスト
          </a>
        </li>
        <li>
          <a href="#conclusion" :class="{ active: activeId === 'conclusion' }" @click="closeSidebar">
            <Icon name="tabler:flag-3" />10. まとめ
          </a>
        </li>
        <li>
          <a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar">
            <Icon name="tabler:link" />11. 参考文献・出典
          </a>
        </li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:users" />Heidi Helfand『Dynamic Reteaming』に基づく実践ガイド
        </div>
        <h1>ダイナミック・リチーミング実践ガイド</h1>
        <p class="hero-lede">
          ― 変化に強いチームをつくる、ステップ・バイ・ステップのベストプラクティス
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">基本パターン(One by One 〜 Switching)</div></div>
          <div class="stat-card"><div class="stat-number">6</div><div class="stat-label">実践ステップ(シグナル察知〜ふりかえり)</div></div>
          <div class="stat-card"><div class="stat-number">13</div><div class="stat-label">リチーミングFAQのチェック項目</div></div>
          <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">代表的なアンチパターン</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" />
          <span>本ガイドは、Heidi Helfand氏が提唱した「ダイナミック・リチーミング」の考え方を初学者向けに要約・解説した非公式の学習支援資料です。正確な原文表現や詳細な事例については、必ず一次情報である<a href="https://www.oreilly.com/library/view/dynamic-reteaming-2nd/9781492061281/" target="_blank" rel="noopener">書籍公式ページ(O'Reilly)</a>をご確認ください。</span>
        </div>
      </div>

      <!-- ===================== 1. Introduction ===================== -->
      <section id="introduction">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" />SECTION 01</div>
        <h2>はじめに</h2>

        <p>「優れたチームを作るには、メンバーを固定して長期間維持するのが一番だ」——アジャイルやスクラムの文脈では、長らくこの考え方が「ゴールドスタンダード」とされてきました。</p>

        <p>しかし現実のソフトウェア組織を見渡すと、メンバーが同じ顔ぶれのまま何年も続くチームはむしろ少数派です。入社、退職、異動、昇進、買収、事業ピボット、レイオフ——チームの構成は常に揺れ動いています。</p>

        <p>この「チームは変化するものだ」という前提に正面から向き合い、変化を場当たり的な事故としてではなく、意図的にデザインできる仕組みとして体系化したのが、Heidi Helfand氏が提唱した<strong>ダイナミック・リチーミング(Dynamic Reteaming)</strong>という考え方です。本ガイドでは、その基本概念から、5つの実践パターン、そして実際にリチーミングを進めるためのステップ・バイ・ステップの手順までを、初学者にもわかりやすく解説します。</p>
      </section>

      <!-- ===================== 2. What Is Dynamic Reteaming ===================== -->
      <section id="what-is-dynamic-reteaming">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" />SECTION 02</div>
        <h2>ダイナミック・リチーミングとは何か</h2>

        <p>ダイナミック・リチーミングとは、一言でいえば「<strong>チームの構成を意図的に、かつ継続的に変化させていくこと</strong>」です。単発の組織改編(リオーグ)とは異なり、リチーミングは一度きりのイベントではなく、組織が健全に成長し続けるための恒常的なプラクティスとして位置づけられます。</p>

        <p>重要なのは、次の2つの視点です。</p>

        <ul>
          <li><strong>リチーミングは「起きるもの」でもある:</strong> 人の入退社、異動、体制変更などにより、望むと望まざるとにかかわらずチームは変化します。</li>
          <li><strong>リチーミングは「起こすもの」でもある:</strong> チームの停滞や属人化、事業の変化を察知したときに、意図的にチーム構成を変えることで、組織の学習と成長を促進できます。</li>
        </ul>

        <p>つまりダイナミック・リチーミングは、変化を「管理不能なノイズ」として恐れるのではなく、「組織の学習サイクルの一部」として上手に乗りこなすための実践知の体系だと言えます。</p>
      </section>

      <!-- ===================== 3. Why It Matters ===================== -->
      <section id="why-it-matters">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:chart-pie" />SECTION 03</div>
        <h2>なぜ重要なのか</h2>

        <p>チームの安定性だけを追い求めることには、いくつかの見落とされがちなリスクがあります。逆に、意図を持ってリチーミングを行うことで、次のような効果が期待できます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>効果</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td><strong>知識のサイロ化を防ぐ</strong></td><td>同じメンバーが同じ領域だけを担当し続けると、特定の人にしかわからない「秘伝のタレ」的なコードやドメイン知識が生まれやすくなります。人が動くことで知識が組織内に広がります。</td></tr>
              <tr><td><strong>離職リスクを下げる</strong></td><td>新しい役割や挑戦の機会がないと、優秀な人材ほど停滞を感じて社外に成長機会を求めがちです。リチーミングはキャリアの成長機会を社内に生み出します。</td></tr>
              <tr><td><strong>チーム間の過度な競争を減らす</strong></td><td>固定されたチーム同士が縄張り意識を持つと、組織全体よりも自チームの成果を優先する「セクショナリズム」が生まれやすくなります。人の行き来があると「全体としてのわれわれ」という意識が育ちます。</td></tr>
              <tr><td><strong>硬直化を防ぎ、新しいメンバーを迎えやすくする</strong></td><td>長期間固定されたチームは暗黙のルールや文化が固まりすぎて、新しく加わった人が馴染みにくくなることがあります。適度な変化は組織の受け入れ体制を柔軟に保ちます。</td></tr>
            </tbody>
          </table>
        </div>

        <p>これらは、著者のHeidi Helfand氏がO'Reilly刊『Dynamic Reteaming, 2nd Edition』の中で、リスク低減と持続可能性の観点から整理している論点です(詳細は末尾の参考文献を参照してください)。</p>

        <p>また、Team Topologiesの共著者であるMatthew Skelton氏も、ポッドキャスト「Software Engineering Radio」の中で、組織を健全なまま変化させる技法としてダイナミック・リチーミングを名指しで評価しています。チームトポロジーのような「型」を組織に導入したあとも、事業や価値の流れは変わり続けるため、チームをどう作り替えていくかという観点でダイナミック・リチーミングは補完的な実践として位置づけられています。</p>
      </section>

      <!-- ===================== 4. Ecocycle ===================== -->
      <section id="ecocycle">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" />SECTION 04</div>
        <h2>全体像をつかむ: チームのエコサイクル</h2>

        <p>Helfand氏は、チームの変化を理解するための比喩として「<strong>エコサイクル(ecocycle)</strong>」というモデルを使っています。これは元々、生態系(森林の成長と再生)の変化を説明するために使われてきたモデルを、組織の変化に応用したものです。</p>

        <p>ポイントは、チームには「成長し、成熟していくフロントループ」と「創造的破壊を経て、再構成されるバックループ」という2つの局面があり、これらは一方向の直線ではなく、繰り返し循環するという点です。</p>

        <div class="diagram-card mermaid-wrap">
          <div id="ecocycleDiagram" class="diagram-container">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ECOCYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">チームのエコサイクル: 立ち上げから再構成までの循環</div>
        </div>

        <ul>
          <li><strong>立ち上げ(探索):</strong> 新しいチームが結成され、目的やメンバー間の関係性を模索する段階です。</li>
          <li><strong>成長・成熟(活用):</strong> チームの動き方が確立し、生産性が安定していく段階です。</li>
          <li><strong>硬直化・停滞の兆し:</strong> やり方が固定化し、新しいアイデアが生まれにくくなったり、外部環境の変化についていけなくなったりする段階です。この兆しに気づくことが、次のステップの起点になります。</li>
          <li><strong>創造的破壊:</strong> 意図的、あるいは外的要因によって、既存のチーム構成に変化(=リチーミング)が加えられる段階です。</li>
          <li><strong>再構成:</strong> 変化を経て、新しいチームが生まれ、また探索の段階に戻っていきます。</li>
        </ul>

        <p>このモデルの要点は、「停滞や崩壊」を失敗と捉えるのではなく、次の成長への準備段階として捉え直すことにあります。</p>
      </section>

      <!-- ===================== 5. Five Patterns ===================== -->
      <section id="five-patterns">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 05</div>
        <h2>5つの基本パターン</h2>

        <p>Helfand氏は、数多くのソフトウェア企業への調査をもとに、チームが変化するときに繰り返し現れる<strong>5つの基本パターン</strong>を整理しました。これらは互いに排他的ではなく、組み合わせて使われることもあります。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>パターン</th><th>概要</th><th>主なきっかけの例</th><th>主な効果</th><th>代表的な落とし穴</th></tr></thead>
            <tbody>
              <tr><td><strong>① One by One(一人ずつ)</strong></td><td>一人ずつメンバーを追加・削減していく、最も基本的な変化のパターン</td><td>新規採用、自然退職</td><td>オンボーディングの型化、新しい視点の注入</td><td>ジュニアとシニアの比率が崩れる、メンター役の疲弊</td></tr>
              <tr><td><strong>② Grow and Split(成長と分割)</strong></td><td>チームが大きくなりすぎたときに、複数の小さなチームへ分割する</td><td>ミーティングの長期化、意思決定の遅延、担当領域の拡散</td><td>各チームの機動力・当事者意識の回復</td><td>チームをまたぐ依存関係の発生、分割の先延ばし</td></tr>
              <tr><td><strong>③ Isolation(隔離)</strong></td><td>特定のチームを既存の枠組みから切り離し、集中的に取り組ませる</td><td>新規事業開発、技術的な危機対応、抜本的な方向転換</td><td>集中的なイノベーション、意思決定の高速化</td><td>選民意識(エリート主義)、既存コードの保守放置</td></tr>
              <tr><td><strong>④ Merging(統合)</strong></td><td>複数のチームや組織を1つにまとめる</td><td>事業統合、買収、機能の重複解消</td><td>ペアリングの多様化、組織的な連携強化</td><td>意思決定方法の未整理、大人数化した会議体の機能不全</td></tr>
              <tr><td><strong>⑤ Switching(交代)</strong></td><td>チーム間でメンバーを入れ替える、あるいは一時的に貸し出す</td><td>知識共有、燃え尽き防止、特定分野の技術移転</td><td>属人化の解消、個人の成長機会の創出</td><td>優秀な人材の抱え込み、専門職の偏りによる交代の困難さ</td></tr>
            </tbody>
          </table>
        </div>

        <p>それぞれのパターンについて、もう少し詳しく見ていきましょう。</p>

        <h3>① One by One(一人ずつ)</h3>
        <p>最もシンプルで、日常的に発生するパターンです。新しい人が1人加わる、あるいは1人抜けるだけで、理論上そのチームは「新しいチーム」になります。ベストプラクティスとしては、新しいメンバーの受け入れ前に準備を整えること、メンター(バディ)を割り当てること、ペアプログラミングやシャドーイングを通じて自然に溶け込めるようにすることなどが挙げられます。また、人が「抜ける」ときのプロセス(送別のしかた、引き継ぎ、心理的なケア)も同じくらい重要です。</p>

        <h3>② Grow and Split(成長と分割)</h3>
        <p>チームの人数が増えすぎると、コミュニケーションのコストが指数関数的に増加し、意思決定が遅くなります。「会議が長引いていないか」「意思決定に時間がかかるようになっていないか」「担当している仕事の関連性が薄れていないか」といったシグナルが、分割を検討するタイミングを教えてくれます。分割時は、チームを巻き込んで決定プロセスに参加させること、分割理由を明確に言語化すること、新チームそれぞれのミッションを定義することが推奨されます。</p>

        <h3>③ Isolation(隔離)</h3>
        <p>既存の体制やしがらみから意図的に切り離し、少人数の専任チームに集中して取り組ませるパターンです。新規プロダクトの立ち上げや、大きな技術的負債の解消、緊急のトラブル対応などに向いています。一方で、隔離されたチームが特別扱いされることによる周囲との軋轢(エリート意識)や、隔離期間が終わったあとの「祭りのあとの虚脱感」にも配慮が必要です。</p>

        <h3>④ Merging(統合)</h3>
        <p>複数チーム、あるいは複数組織を1つに統合するパターンです。ペアプログラミングの組み合わせを増やしたい場合や、部門横断の連携を強化したい場合に有効です。ただし、統合後のチームの人数やミーティング体制を見直さないまま進めると、意思決定が滞ったり、暗黙のうちに対立が生まれたりします。企業レベルの統合(M&Aなど)では、レイオフの進め方や情報の曖昧さが混乱を招きやすい点にも注意が必要です。</p>

        <h3>⑤ Switching(交代)</h3>
        <p>チームメンバーを入れ替えたり、一時的に他チームへ「貸し出し」たりするパターンです。知識共有や個人の成長、燃え尽き症候群の予防に効果があります。ただし、特定の人に知識が集中している状態(ナレッジのモノポリー)があると交代自体が難しくなるため、日頃からの知識共有の文化づくりが前提になります。</p>
      </section>

      <!-- ===================== 6. Pattern Selection ===================== -->
      <section id="pattern-selection">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" />SECTION 06</div>
        <h2>どのパターンを選ぶか: 判断フロー</h2>

        <p>「うちのチームには変化の兆しがある。でも、どのパターンを適用すればいいのか？」という初学者向けに、シンプルな判断の目安を示します。あくまで出発点であり、実際には複数のパターンを組み合わせて検討するのが基本です。</p>

        <div class="diagram-card mermaid-wrap">
          <div id="patternSelectionDiagram" class="diagram-container">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PATTERN_SELECTION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">変化の兆しから適用パターンを絞り込む判断フロー</div>
        </div>
      </section>

      <!-- ===================== 7. Step-by-Step Guide ===================== -->
      <section id="step-by-step">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 07</div>
        <h2>ステップ・バイ・ステップ実践ガイド</h2>

        <p>ここからは、実際にリチーミングを計画し、実行するための具体的な手順を、初学者でも迷わないように6つのステップに分解して解説します。</p>

        <div class="diagram-card mermaid-wrap">
          <div id="stepByStepDiagram" class="diagram-container">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_STEP_BY_STEP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">シグナルの察知からふりかえりまでの6ステップ</div>
        </div>

        <h3>Step 1: シグナルを察知する</h3>
        <p>リチーミングは「思いつき」で始めるものではなく、何らかのシグナル(兆候)をきっかけに検討を始めるのが基本です。代表的なシグナルには次のようなものがあります。</p>
        <ul>
          <li>ミーティングの時間がじわじわと長くなってきた</li>
          <li>以前よりも意思決定に時間がかかるようになった</li>
          <li>チームが担当する仕事の関連性が薄れ、バラバラな案件を抱えるようになった</li>
          <li>分散チームで、誰が今どのチームに所属しているか把握しづらくなってきた</li>
          <li>特定のメンバーに知識や作業が集中し、その人が休むと仕事が止まる</li>
        </ul>
        <p>これらのシグナルは、前章のエコサイクルでいう「硬直化・停滞」の局面に対応します。シグナルに気づいたら、それがどのパターンに当てはまりそうかを仮説として立てます。</p>

        <h3>Step 2: リチーミングFAQを作成する</h3>
        <p>いきなり変更を発表するのではなく、関係者の疑問に先回りして答える「リチーミングFAQ」を作成することが推奨されます。次のような項目を整理しておくと、後々の混乱を大きく減らせます。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>#</th><th>FAQ項目</th><th>目的</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>このリチーミングで解決したい課題は何か</td><td>目的の言語化、賛同を得るための土台づくり</td></tr>
              <tr><td>2</td><td>メンバーはどのようにチームへ割り当てられるか</td><td>割り当て方針(トップダウンか、自己選択かなど)の明確化</td></tr>
              <tr><td>3</td><td>メンバーは新しいチーム編成をいつ、どのように知るか</td><td>情報伝達の公平性・透明性の担保</td></tr>
              <tr><td>4</td><td>既存チームにはどんな影響があるか</td><td>巻き添えになるチームへの配慮</td></tr>
              <tr><td>5</td><td>進行中の仕事にはどんな影響があるか</td><td>仕掛かり作業の引き継ぎ計画</td></tr>
              <tr><td>6</td><td>新しいチームの構成(人数・役割)はどうなるか</td><td>新体制の具体像の共有</td></tr>
              <tr><td>7</td><td>変更前後で組織図はどう変わるか</td><td>全体像の可視化</td></tr>
              <tr><td>8</td><td>技術システムや設備の変更は必要か</td><td>権限、環境、ツールの準備</td></tr>
              <tr><td>9</td><td>座席やオフィスレイアウトの変更はあるか</td><td>物理・リモート双方の作業環境の調整</td></tr>
              <tr><td>10</td><td>必要な教育・トレーニングは何か</td><td>スキルギャップの事前把握</td></tr>
              <tr><td>11</td><td>コミュニケーション計画はどうなっているか</td><td>発表のタイミングと伝達経路の設計</td></tr>
              <tr><td>12</td><td>実施スケジュールはどうなっているか</td><td>マイルストーンの共有</td></tr>
              <tr><td>13</td><td>フィードバックはどのように集めるか</td><td>実施後の軌道修正の仕組み</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Step 3: チームを巻き込み合意形成する</h3>
        <p>リチーミングを「上から降ってくる決定」として扱うと、当事者の納得感が失われ、モチベーション低下や離職につながりかねません。可能な範囲でチームメンバー自身を意思決定プロセスに巻き込むことが望ましいとされています。具体的な手法としては、以下のようなものがあります。</p>
        <ul>
          <li>チームメンバーへのアンケートで、希望するチームや役割の意向を確認する</li>
          <li>「チーム選択マーケットプレイス」のような場を設け、メンバー自身が新しいチームを選べるようにする</li>
          <li>マネージャーが最終決定をしつつも、決定に至った理由をオープンに説明する</li>
        </ul>

        <h3>Step 4: 新チームを正式にキックオフする</h3>
        <p>新しいチーム構成が決まったら、非公式なまま運用を始めるのではなく、区切りとして正式なキックオフを行います。キックオフでは、次のような内容を扱うとよいでしょう。</p>
        <ul>
          <li>新チームのミッション・目的の共有</li>
          <li>メンバー同士の自己紹介(経歴、得意分野、期待する働き方など)</li>
          <li>チームとしての作業の進め方(会議体、コミュニケーションルールなど)の合意形成</li>
          <li>当面の優先事項とロードマップの共有</li>
        </ul>

        <h3>Step 5: 移行期をケアする(キャリブレーション)</h3>
        <p>チームが物理的・組織的に再編されたあとも、心理的な「移行」にはさらに時間がかかります。この期間を軽視すると、チームとしてのパフォーマンスが安定するまでに余計な時間がかかってしまいます。移行期のケアとして、以下のような「チーム・キャリブレーション(すり合わせ)セッション」を行うことが有効です。</p>
        <ul>
          <li><strong>歴史のすり合わせ:</strong> それぞれのメンバーが持つ過去の経緯や文脈を共有する</li>
          <li><strong>人と役割のすり合わせ:</strong> 誰が何を担当するのか、役割分担を明確にする</li>
          <li><strong>仕事のすり合わせ:</strong> 現在抱えている仕事の状況や優先順位を共有する</li>
          <li><strong>進め方のすり合わせ:</strong> 開発フローや意思決定の方法をチームとして合意する</li>
        </ul>
        <p>また、変化を受け入れがたく感じるメンバーに対しては、変化の理由を1on1で丁寧に説明したり、「区切りの儀式」(送別会、旧チームへの感謝を伝える場など)を設けたりすることで、心理的な移行を後押しできます。</p>

        <h3>Step 6: ふりかえりを行う</h3>
        <p>リチーミングは「実施して終わり」ではありません。新体制がうまく機能しているかどうかを定期的にふりかえり、必要に応じて微調整を行うことが、次のエコサイクルへの入口になります。</p>
        <ul>
          <li>チーム単位のレトロスペクティブ(ふりかえり)を定期的に実施する</li>
          <li>複数チームにまたがる課題は、マルチチーム・レトロスペクティブで扱う</li>
          <li>リチーミングの取り組み全体についても、施策としての「イニシアチブ・レトロスペクティブ」を行う</li>
          <li>サーベイツールや1on1を通じて、定量・定性の両面から状態を把握する</li>
        </ul>
        <p>この結果は、再びStep 1の「シグナルの察知」へとフィードバックされ、エコサイクルは次の局面へと循環していきます。</p>
      </section>

      <!-- ===================== 8. Anti-Patterns ===================== -->
      <section id="anti-patterns">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" />SECTION 08</div>
        <h2>避けるべきアンチパターン</h2>

        <p>良かれと思って行ったリチーミングが、かえってチームを傷つけてしまうこともあります。代表的なアンチパターンを押さえておきましょう。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>アンチパターン</th><th>内容</th><th>対策のヒント</th></tr></thead>
            <tbody>
              <tr><td><strong>ハイパフォーマンスの伝播を狙った異動</strong></td><td>「優秀な人を薄く広く配置すればチーム全体が良くなる」という発想で、エース人材を各チームに分散させる</td><td>個人の力に依存するのではなく、チームとしての強さを育てることを優先する</td></tr>
              <tr><td><strong>パーセンテージ・アンチパターン</strong></td><td>1人のメンバーを複数チームに「稼働率◯%ずつ」割り当てる</td><td>コンテキストスイッチのコストを認識し、可能な限り1人1チームを基本とする</td></tr>
              <tr><td><strong>標準への迎合による分断</strong></td><td>すでにうまく機能しているチームを、社内標準やベストプラクティスに合わせるためだけに再編する</td><td>「型」に合わせることよりも、チームの実際の成果とチームメンバーの声を優先する</td></tr>
              <tr><td><strong>説明不足な抽象的リチーミング</strong></td><td>経営層や上位組織の都合だけでリチーミングを進め、当事者への説明が不十分なまま実施する</td><td>Step2のFAQやStep3の合意形成プロセスを省略しない</td></tr>
              <tr><td><strong>有害なチームメンバーの放置</strong></td><td>特定のメンバーの問題行動を、チーム編成の工夫だけで誤魔化そうとする</td><td>リチーミングは万能薬ではないと理解し、根本的な対話やマネジメント対応と併用する</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 9. Checklist ===================== -->
      <section id="checklist">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" />SECTION 09</div>
        <h2>実践チェックリスト</h2>

        <p>リチーミングを計画・実施する際に、抜け漏れがないかを確認するためのチェックリストです。</p>

        <ul>
          <li>チームの変化を示すシグナル(会議の長時間化、意思決定の遅延など)を具体的に言語化したか</li>
          <li>想定しているパターン(One by One / Grow and Split / Isolation / Merging / Switching)を明確にしたか</li>
          <li>リチーミングFAQ(目的・割り当て方針・スケジュールなど)を事前に整理したか</li>
          <li>チームメンバーを意思決定プロセスに巻き込む機会を設けたか</li>
          <li>新チームの正式なキックオフを計画したか</li>
          <li>移行期のキャリブレーションセッション(歴史・人と役割・仕事・進め方)を予定したか</li>
          <li>旧チームへの区切り(送別・感謝の共有)を軽視していないか</li>
          <li>実施後のふりかえり(チーム単位・複数チーム単位・施策単位)を計画したか</li>
          <li>今回のアンチパターン一覧に当てはまる進め方をしていないか、再点検したか</li>
        </ul>
      </section>

      <!-- ===================== 10. Conclusion ===================== -->
      <section id="conclusion">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 10</div>
        <h2>まとめ</h2>

        <p>ダイナミック・リチーミングの核心は、「チームは変わらないほうがよい」という思い込みを手放し、変化を組織の学習と成長のための自然なプロセスとして受け入れることにあります。そのうえで、</p>

        <ol>
          <li>チームのエコサイクルという大きな視点で「今どの局面にいるか」を捉え、</li>
          <li>One by One、Grow and Split、Isolation、Merging、Switchingという5つのパターンから状況に合ったものを選び、</li>
          <li>シグナルの察知からふりかえりまでの一連のステップを、当事者を巻き込みながら丁寧に実施する</li>
        </ol>

        <p>——この積み重ねが、変化に強く、学び続けるチームと組織をつくっていきます。</p>
      </section>

      <!-- ===================== 11. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 11</div>
        <h2>参考文献・出典</h2>

        <p>本ガイドは、2026年8月16日時点でのウェブ検索調査にもとづき作成しました。特に、ダイナミック・リチーミングの提唱者であるHeidi Helfand氏本人の著作・発信、および同分野で著名な国際的開発者・組織設計の専門家(Matthew Skelton氏、InfoQ、Martin Fowler氏まわりの言及等)の情報を優先的に参照しています。</p>

        <div class="ref-group">
          <h3>参照した情報源</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Heidi Helfand, <em>Dynamic Reteaming, 2nd Edition</em> (O'Reilly Media) — 書籍公式ページ・目次</span><a class="ref-url" href="https://www.oreilly.com/library/view/dynamic-reteaming-2nd/9781492061281/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/dynamic-reteaming-2nd/9781492061281/</a></li>
            <li><span class="ref-name">InfoQ, "Q&A on the Book Dynamic Reteaming (2-ed)"</span><a class="ref-url" href="https://www.infoq.com/articles/dynamic-reteaming-helfand" target="_blank" rel="noopener">https://www.infoq.com/articles/dynamic-reteaming-helfand</a></li>
            <li><span class="ref-name">InfoQ, サンプルチャプター(Chapter 2: Understanding Teams)PDF</span><a class="ref-url" href="https://res.infoq.com/articles/dynamic-reteaming-helfand/en/resources/Chapter2_DynamicReteaming-1-1597951052416.pdf" target="_blank" rel="noopener">https://res.infoq.com/articles/dynamic-reteaming-helfand/en/resources/Chapter2_DynamicReteaming-1-1597951052416.pdf</a></li>
            <li><span class="ref-name">InfoQ, カンファレンス講演 "Dynamic Reteaming: The Art & Wisdom of Changing Teams"</span><a class="ref-url" href="https://www.infoq.com/presentations/dynamic-change-teams" target="_blank" rel="noopener">https://www.infoq.com/presentations/dynamic-change-teams</a></li>
            <li><span class="ref-name">Software Engineering Radio, "SE Radio 646: Matthew Skelton on Team Topologies" (Dynamic Reteamingへの言及あり)</span><a class="ref-url" href="https://se-radio.net/2024/12/se-radio-646-matthew-skelton-on-team-topologies/" target="_blank" rel="noopener">https://se-radio.net/2024/12/se-radio-646-matthew-skelton-on-team-topologies/</a></li>
            <li><span class="ref-name">Martin Fowler, bliki: Team Topologies</span><a class="ref-url" href="https://martinfowler.com/bliki/TeamTopologies.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TeamTopologies.html</a></li>
            <li><span class="ref-name">GOTO / gotopia.tech, "Dynamic Teams: Reteaming Patterns & Practices" (Charles Humble氏によるHeidi Helfand氏インタビュー)</span><a class="ref-url" href="https://gotopia.tech/articles/321/dynamic-teams-reteaming-patterns-and-practices" target="_blank" rel="noopener">https://gotopia.tech/articles/321/dynamic-teams-reteaming-patterns-and-practices</a></li>
            <li><span class="ref-name">Pluralsight Blog, "Heidi Helfand's five patterns for responsible reteaming"</span><a class="ref-url" href="https://www.pluralsight.com/blog/teams/heidi-helfand-s-five-patterns-for-responsible-reteaming" target="_blank" rel="noopener">https://www.pluralsight.com/blog/teams/heidi-helfand-s-five-patterns-for-responsible-reteaming</a></li>
            <li><span class="ref-name">Heidi Helfand 公式サイト</span><a class="ref-url" href="https://www.heidihelfand.com/" target="_blank" rel="noopener">https://www.heidihelfand.com/</a></li>
            <li><span class="ref-name">Heidi Helfand, Substack「The Team Dynamic」 "HH 004 - Five Patterns of Dynamic Reteaming"</span><a class="ref-url" href="https://heidihelfand.substack.com/p/hh-004-five-patterns-of-dynamic-reteaming" target="_blank" rel="noopener">https://heidihelfand.substack.com/p/hh-004-five-patterns-of-dynamic-reteaming</a></li>
            <li><span class="ref-name">LogRocket Blog, "An introduction to dynamic reteaming"</span><a class="ref-url" href="https://blog.logrocket.com/product-management/introduction-to-dynamic-reteaming/" target="_blank" rel="noopener">https://blog.logrocket.com/product-management/introduction-to-dynamic-reteaming/</a></li>
            <li><span class="ref-name">Team Topologies 公式書籍参考文献リスト (GitHub)</span><a class="ref-url" href="https://github.com/TeamTopologies/Team-Topologies-Book-References/blob/main/Team-Topologies-references-Markdown.md" target="_blank" rel="noopener">https://github.com/TeamTopologies/Team-Topologies-Book-References/blob/main/Team-Topologies-references-Markdown.md</a></li>
            <li><span class="ref-name">InfoQ, "QCon London 2026: Team Topologies as the 'Infrastructure for Agency' with AI" (組織設計トピックの最新動向として参考掲載)</span><a class="ref-url" href="https://www.infoq.com/news/2026/03/ai-agency-team-topologies/" target="_blank" rel="noopener">https://www.infoq.com/news/2026/03/ai-agency-team-topologies/</a></li>
          </ul>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
          <p>本ガイド内の記述は、上記出典の内容を筆者が要約・再構成したものであり、原文からの引用ではありません。正確な原文表現や詳細な事例が必要な場合は、必ず一次情報(特にHeidi Helfand氏の書籍本体)をご参照ください。</p>
        </div>
      </section>

      <footer>
        本ページは学習・教育目的で作成された非公式の要約資料です。「Dynamic Reteaming」はHeidi Helfand氏の著作物です。詳細は<a href="https://www.oreilly.com/library/view/dynamic-reteaming-2nd/9781492061281/" target="_blank" rel="noopener">O'Reilly公式ページ</a>をご確認ください。作成日: 2026年8月17日(2026年8月16日時点の情報にもとづく)
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
}

.sidebar-nav a svg { font-size: 17px; color: var(--color-ink-faint); flex: none; width: 17px; height: 17px; }

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

.sidebar-nav a.active svg { color: var(--color-indigo); }

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

.sidebar-toggle svg { width: 20px; height: 20px; }

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

.hero-eyebrow svg { width: 17px; height: 17px; }

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

.disclaimer-box svg { flex: none; width: 20px; height: 20px; margin-top: 2px; }
.disclaimer-box > span { flex: 1; }

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

.section-eyebrow svg { width: 17px; height: 17px; }

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
em { color: var(--color-ink-soft); }

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

.callout-title svg { width: 18px; height: 18px; }
.callout p:last-child { margin-bottom: 0; }

.callout.practice { border-left-color: var(--color-gold); }
.callout.practice .callout-title { color: var(--color-gold); }

.callout.source { border-left-color: var(--color-forest); background: var(--color-forest-tint); }
.callout.source .callout-title { color: var(--color-forest); }
.callout.source a { color: var(--color-forest); font-weight: 500; }

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
.ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; }

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle { display: flex; }
  .sidebar {
    top: var(--global-nav-height);
    height: calc(100vh - var(--global-nav-height));
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
  html { scroll-behavior: auto; }
  .sidebar { transition: none; }
}
</style>
