<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { MERMAID_THEME_VARIABLES } from "~/utils/mermaid-theme";

const TOC_IDS = [
  "what-is-elastic-leadership",
  "three-phases",
  "phase-assessment",
  "team-leader-manifesto",
  "key-techniques",
  "escaping-survival-mode",
  "growing-in-learning-mode",
  "sustaining-self-organization",
  "anti-patterns",
  "line-manager-guidance",
  "practice-checklist",
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
  title: "Elastic Leadership 実践ガイド ― チームを自己組織化へ導くリーダーシップ・フレームワーク",
  description: "Roy Osherove著『Elastic Leadership』をもとに、サバイバル・ラーニング・セルフオーガナイジングの3フェーズモデルと実践テクニックを初学者向けにステップバイステップで解説するガイド。",
});

const DIAGRAM_THREE_PHASE_CYCLE = `flowchart TD
    A["サバイバルモード"] -->|"学習時間を確保する"| B["ラーニングモード"]
    B -->|"スキルが定着する"| C["セルフオーガナイジングモード"]
    C -.->|"状況やメンバーの変化"| A
    B -.->|"新たな火消しが発生"| A
    C -.->|"未知のスキルが必要になる"| B

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B box;
    class C done;`;

const DIAGRAM_PHASE_DECISION_FLOW = `flowchart TD
    Q0["チームの状況を観察する"] --> Q1{"学習に使える時間はあるか"}
    Q1 -->|"ない"| M1["サバイバルモード"]
    Q1 -->|"ある"| Q2{"チームは自力で問題を解決できるか"}
    Q2 -->|"まだ難しい"| M2["ラーニングモード"]
    Q2 -->|"できる"| M3["セルフオーガナイジングモード"]
    M1 --> A1["指示命令型で舵を取る"]
    M2 --> A2["コーチング型で挑戦を促す"]
    M3 --> A3["ファシリテーション型でゴールのみ示す"]
    M1 ~~~ Q2

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q0 hub;
    class Q1,Q2,M1,M2,A1,A2 box;
    class M3,A3 done;`;

const DIAGRAM_SURVIVAL_MODE_STEPS = `flowchart TD
    S1["現在のすべてのコミットメントを洗い出す"] --> S2["経営層に現状を正直に共有する"]
    S2 --> S3["今後30日で完了できる分だけに絞り込む"]
    S3 --> S4["残りは学習時間を織り込んで再見積もりする"]
    S4 --> S5["マルチタスクをやめ1つずつ終わらせる"]
    S5 --> S6["期限が来たらラーニングモードへ切り替える"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5 box;
    class S6 done;`;

const DIAGRAM_TEST_AUTOMATION_SPIRAL = `flowchart LR
    subgraph vicious["悪循環"]
        N1["自動テストを学ぶ時間がない"] --> N2["手動テストを続ける"]
        N2 --> N3["手動テストに時間を奪われる"]
        N3 --> N1
    end
    subgraph virtuous["好循環"]
        P1["自動テストに時間を投資する"] --> P2["手動テストの時間が減る"]
        P2 --> P3["学習に使える時間が増える"]
        P3 --> P1
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class N1,N2,N3 box;
    class P1,P2,P3 done;`;

const DIAGRAM_MANIFESTO_PILLARS = `flowchart TD
    TLM["Team Leader Manifesto"] --> P1["人を機械のように扱わず心理を理解する"]
    TLM --> P2["単一スタイルに固執せずフェーズに応じて変える"]
    TLM --> P3["恐れや不快感を避けず挑戦と実験を歓迎する"]
    TLM --> P4["自分がボトルネックでなくなることを目指す"]
    P1 ~~~ P2
    P2 ~~~ P3
    P3 ~~~ P4

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class TLM hub;
    class P1,P2,P3,P4 box;`;
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
            <div class="brand-title">Elastic Leadership</div>
            <div class="brand-subtitle">実践ガイド</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li>
            <a
              href="#what-is-elastic-leadership"
              :class="{ active: activeId === 'what-is-elastic-leadership' }"
              :aria-current="activeId === 'what-is-elastic-leadership' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:compass" />Elastic Leadershipとは
            </a>
          </li>
          <li>
            <a
              href="#three-phases"
              :class="{ active: activeId === 'three-phases' }"
              :aria-current="activeId === 'three-phases' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:route" />3つのチームフェーズ
            </a>
          </li>
          <li>
            <a
              href="#phase-assessment"
              :class="{ active: activeId === 'phase-assessment' }"
              :aria-current="activeId === 'phase-assessment' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:git-branch" />フェーズの見極め方
            </a>
          </li>
          <li>
            <a
              href="#team-leader-manifesto"
              :class="{ active: activeId === 'team-leader-manifesto' }"
              :aria-current="activeId === 'team-leader-manifesto' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-text" />Team Leader Manifesto
            </a>
          </li>
          <li>
            <a
              href="#key-techniques"
              :class="{ active: activeId === 'key-techniques' }"
              :aria-current="activeId === 'key-techniques' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:tools" />主要な実践テクニック
            </a>
          </li>
          <li>
            <a
              href="#escaping-survival-mode"
              :class="{ active: activeId === 'escaping-survival-mode' }"
              :aria-current="activeId === 'escaping-survival-mode' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:flame" />サバイバルモードからの脱出
            </a>
          </li>
          <li>
            <a
              href="#growing-in-learning-mode"
              :class="{ active: activeId === 'growing-in-learning-mode' }"
              :aria-current="activeId === 'growing-in-learning-mode' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:school" />ラーニングモードで育てる
            </a>
          </li>
          <li>
            <a
              href="#sustaining-self-organization"
              :class="{ active: activeId === 'sustaining-self-organization' }"
              :aria-current="activeId === 'sustaining-self-organization' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:users-group" />セルフオーガナイジングの維持
            </a>
          </li>
          <li>
            <a
              href="#anti-patterns"
              :class="{ active: activeId === 'anti-patterns' }"
              :aria-current="activeId === 'anti-patterns' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:alert-triangle" />よくあるアンチパターン
            </a>
          </li>
          <li>
            <a
              href="#line-manager-guidance"
              :class="{ active: activeId === 'line-manager-guidance' }"
              :aria-current="activeId === 'line-manager-guidance' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:sitemap" />ラインマネージャー向け指針
            </a>
          </li>
          <li>
            <a
              href="#practice-checklist"
              :class="{ active: activeId === 'practice-checklist' }"
              :aria-current="activeId === 'practice-checklist' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:checklist" />実践チェックリスト
            </a>
          </li>
          <li>
            <a
              href="#summary"
              :class="{ active: activeId === 'summary' }"
              :aria-current="activeId === 'summary' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:flag-3" />まとめ
            </a>
          </li>
          <li>
            <a
              href="#references"
              :class="{ active: activeId === 'references' }"
              :aria-current="activeId === 'references' ? 'location' : undefined"
              @click="closeSidebar"
            >
              <Icon name="tabler:link" />参考文献・出典
            </a>
          </li>
        </ul>
      </nav>

      <!-- ===================== Main content ===================== -->
      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:compass" />Roy Osherove 著 Elastic Leadership に基づく解説</div>
          <h1>Elastic Leadership 実践ガイド</h1>
          <p class="hero-lede">
            チームが今どのフェーズ―サバイバル・ラーニング・セルフオーガナイジング―にいるかによって、リーダーが取るべきスタイルは変わるべきである。Roy Osherove氏が提唱するチームリーダーシップ・フレームワークを、初学者向けにステップバイステップで解説します。
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">3</div><div class="stat-label">チームの成熟フェーズ数（サバイバル・ラーニング・セルフオーガナイジング）</div></div>
            <div class="stat-card"><div class="stat-number">2016</div><div class="stat-label">Manning社より書籍『Elastic Leadership』刊行</div></div>
            <div class="stat-card"><div class="stat-number">20年+</div><div class="stat-label">著者Roy Osheroveのソフトウェア業界での経験年数</div></div>
            <div class="stat-card"><div class="stat-number">5%</div><div class="stat-label">著者の体感で真に自己組織化されているチームの割合</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" />
            本ガイドはRoy Osherove氏の書籍『Elastic Leadership: Growing Self-Organizing Teams』（Manning Publications, 2016）、およびInfoQ・Tech Lead Journal・LeadDev等のインタビュー記事・講演といった一次情報をもとに、独自の言葉で要約・再構成した非公式の解説資料です。原文表現や詳細な事例を確認したい場合は、必ず<a href="https://www.manning.com/books/elastic-leadership" target="_blank" rel="noopener">Manning公式の書籍ページ</a>および本文末尾「参考文献・出典」をご参照ください。
          </div>
        </div>

        <section id="what-is-elastic-leadership">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:compass" />SECTION 01</div>
          <h2>Elastic Leadershipとは</h2>

          <p>Elastic Leadership（エラスティックリーダーシップ）は、ソフトウェアエンジニア出身のコンサルタント・研修講師である Roy Osherove（ロイ・オシェロブ）氏が、自身のチームリーダー経験と数々の失敗から体系化したリーダーシップ・フレームワークです。原型は同氏が個人ブログ「5whys.com」に書き溜めた記事群であり、当初は電子書籍として発表された後、Manning社から書籍化・再編集されて刊行されました。</p>

          <p>このフレームワークの中心にある考え方はシンプルです。<strong>チームが今どのフェーズにいるかによって、リーダーが取るべきスタイルは変わるべきである。</strong>多くのリーダーシップ論が「良いアジャイルプラクティスとは何か」を語るのに対し、Elastic Leadershipは「メンバーに実際に行動を変えてもらうにはどうすればよいか」という、実践と理論の隙間を埋めることを目的としています。</p>

          <p>対象読者は、プロジェクトマネージャー、プロダクトオーナー、テックリード、アーキテクト、スクラムマスターなど、組織の中で判断のボトルネックになりやすい立場の人全般です。最終ゴールは、リーダー自身が最終的に「いなくても回るチーム」＝自己組織化されたチームを育てることにあります。</p>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>著者自身、現場で本当の意味で自己組織化されたチームに出会えることは極めて稀であると述べており、多くのチームは慢性的な火消し対応に追われる状態にとどまりがちだと指摘しています。</p>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.manning.com/books/elastic-leadership" target="_blank" rel="noopener">Manning Publications ― Elastic Leadership 書籍公式ページ</a></li>
              <li><a href="https://www.infoq.com/articles/book-review-elastic-leadership/" target="_blank" rel="noopener">InfoQ ― Q&amp;A on the Book Elastic Leadership</a></li>
            </ul>
          </div>
        </section>

        <section id="three-phases">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" />SECTION 02</div>
          <h2>3つのチームフェーズを理解する</h2>

          <p>Elastic Leadershipモデルの核となるのが、チームが取りうる3つの成熟フェーズです。3つのフェーズは一方向に進むだけでなく、外部環境の変化（新規メンバーの加入、担当プロダクトの変更、大規模障害の発生など）によって簡単に逆戻りする点が重要です。数週間、時には数日単位でフェーズが行き来することも珍しくありません。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_THREE_PHASE_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">3つのチームフェーズとその移行トリガー</div>
          </div>

          <div class="table-wrap">
            <table>
              <thead><tr><th>項目</th><th>サバイバルモード</th><th>ラーニングモード</th><th>セルフオーガナイジングモード</th></tr></thead>
              <tbody>
                <tr><td>チームの状態</td><td>常に火消し対応に追われ、学習に使える時間がない</td><td>新しいスキルを身につける余裕がある</td><td>チーム自身の力で大半の問題を解決できる</td></tr>
                <tr><td>適したリーダーシップスタイル</td><td>指示命令型（コマンド＆コントロール）</td><td>コーチング型（挑戦を促す伴走型）</td><td>ファシリテーション型（ゴール提示のみ）</td></tr>
                <tr><td>リーダーの主な仕事</td><td>優先順位の整理とコミットメントの棚卸し</td><td>挑戦の提供・フィードバック・再見積もり支援</td><td>障害物の除去、目標・指標の設計</td></tr>
                <tr><td>心理的な特徴</td><td>ヒーローであることに居心地の良さを感じやすい中毒的状態</td><td>居心地の悪さ・フラストレーションを伴う</td><td>裁量を持って自走できる安心感</td></tr>
              </tbody>
            </table>
          </div>

          <h3>各フェーズの詳細</h3>

          <p><strong>サバイバルモード。</strong>常にビルドの修正や障害対応に追われ、学ぶ時間も、失敗して学び直す余裕もない状態です。逆説的ですが、このモードは多くの人にとって居心地が良い場所でもあります。深夜にビルドを直すヒーローであり続けることに、心理的な充足感やアイデンティティを見出してしまうためです。抜け出すための第一の障壁は技術ではなく心理面にあるとされます。</p>

          <p><strong>ラーニングモード。</strong>チームに新しいスキルを練習する時間的余裕（スラックタイム）がある状態です。多くのリーダーにとって、実はセルフオーガナイジングモードよりもラーニングモードの運営の方が難しいとされます。見積もりをやり直し、あえて非効率で不慣れなやり方に時間を使うことをチームにも経営層にも納得してもらう必要があるためです。</p>

          <p><strong>セルフオーガナイジングモード。</strong>チームがチームリードの集合体のように、直面するほぼすべての課題に対して自力で答えを見つけられる状態です。著者の経験則では、実際にこの状態に到達しているチームは全体のごく一部（体感で5%程度）に過ぎないとされています。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://techleadjournal.dev/episodes/110/" target="_blank" rel="noopener">Tech Lead Journal #110 ― Roy Osherove インタビュー</a></li>
              <li><a href="https://leaddev.com/career-development/elastic-leadership-roy-osherove-conversation" target="_blank" rel="noopener">LeadDev ― Elastic Leadership: Roy Osherove in conversation</a></li>
            </ul>
          </div>
        </section>

        <section id="phase-assessment">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" />SECTION 03</div>
          <h2>フェーズの見極め方</h2>

          <p>Elastic Leadershipにおいてリーダーが日々自問すべき問いは、「今チームはどのフェーズにいるか」、そして「セルフオーガナイジングモードに近づけるために何をすべきか」の2つに集約されます。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_PHASE_DECISION_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">フェーズ判定とリーダーシップスタイルの意思決定フロー</div>
          </div>

          <p>判断の出発点として、著者は次のような自問自答の連鎖を例に挙げています。チームを自己組織化させるには、今足りていないスキルを身につけてもらう必要がある。しかし今はサバイバルモードで、その練習をする時間がない。だからまずサバイバルモードを脱し、学習時間を作らなければならない。そのためには、いったん指示命令型のリーダーシップで舵を取る必要がある。</p>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>このように、最終ゴール（自己組織化）から逆算して「今どのスタイルを取るべきか」を導き出す発想が、Elastic Leadershipの実践における基本パターンです。</p>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.infoq.com/articles/book-review-elastic-leadership/" target="_blank" rel="noopener">InfoQ ― Q&amp;A on the Book Elastic Leadership</a></li>
            </ul>
          </div>
        </section>

        <section id="team-leader-manifesto">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" />SECTION 04</div>
          <h2>Team Leader Manifesto</h2>

          <p>著者は、日々の判断に迷ったときの拠り所として、Team Leader Manifesto（チームリーダー・マニフェスト）という短い価値観の宣言をまとめています。このマニフェストは著者のブログ 5whys.com で公開されており、本ガイドが参照した公開版は Take #4 です。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_MANIFESTO_PILLARS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">Team Leader Manifestoを構成する4本柱</div>
          </div>

          <div class="table-wrap">
            <table>
              <thead><tr><th>柱</th><th>内容の要旨</th></tr></thead>
              <tbody>
                <tr><td>人間中心</td><td>チームメンバーは機械ではない。行動科学・心理学的な理解を、プロセスやツールの理解と同じくらい重視する</td></tr>
                <tr><td>適応的リーダーシップ</td><td>唯一絶対の正しいスタイルを信奉せず、チームの現在地に応じてリーダーシップのかけ方を変え続ける</td></tr>
                <tr><td>挑戦と実験の受容</td><td>チームのために安全を選ぶより挑戦を選ぶ。恐れや居心地の悪さを、新しいスキルを学ぶための自然な副作用として歓迎する</td></tr>
                <tr><td>自己不要化</td><td>自分がいなければチームが動かない状態＝ボトルネックであることを是とせず、自分がどれだけ必要とされなくなったかを成功指標として捉える</td></tr>
              </tbody>
            </table>
          </div>

          <p>InfoQによるインタビュー記事でも、このモデルの核心的なメッセージとして、アジャイルリーダーの最終ゴールは自分自身を不要にすること、つまり真に自己組織化されたチームを作ることにあると述べられています。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.5whys.com/articles/team-leader-manifesto-take-4.html" target="_blank" rel="noopener">5 Whys ― Team Leader Manifesto（本ガイドが参照した公開版）</a></li>
              <li><a href="https://www.infoq.com/articles/book-review-elastic-leadership/" target="_blank" rel="noopener">InfoQ ― Q&amp;A on the Book Elastic Leadership</a></li>
            </ul>
          </div>
        </section>

        <section id="key-techniques">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:tools" />SECTION 05</div>
          <h2>主要な実践テクニック</h2>

          <p>Elastic Leadershipを実践に落とし込むための、具体的な5つのテクニックを紹介します。</p>

          <div class="glossary-grid">
            <div class="glossary-item"><div class="g-term">バス係数（Bus Factor）</div><div class="g-def">もしその人が明日出社できなくなったら、チームの機能が止まってしまう人数を表す指標。リーダーは自分自身のバス係数への寄与を継続的に下げていく必要がある</div></div>
            <div class="glossary-item"><div class="g-term">スラックタイム（Slack Time）</div><div class="g-def">失敗を許容しながら新しいスキルを練習するための学習用の余白時間。サバイバルモードではこの余白が構造的に存在しない</div></div>
            <div class="glossary-item"><div class="g-term">コミットメント言語（Commitment Language）</div><div class="g-def">本人がコントロールできない結果ではなく、本人がコントロールできる行動に対してコミットしてもらう話法。曖昧な約束を防ぐ</div></div>
            <div class="glossary-item"><div class="g-term">クリアリングミーティング（Clearing Meetings）</div><div class="g-def">メンバーが抱えている課題と、それに対してすでに自分で着手し始めていることを共有する場。チームの自走度合いを測る指標になる</div></div>
            <div class="glossary-item"><div class="g-term">専門家はいない、いるのは私たちだけ</div><div class="g-def">経験を積んだリーダーであっても答えを確信して行動しているわけではなく、多くの場合は手探りで意思決定をしていることを直視する考え方</div></div>
          </div>

          <p>特にコミットメント言語については、著者はスプリント末の機能完成そのものへのコミットメントに懐疑的な立場を取っています。本人がコントロールできない完成という結果ではなく、本人がコントロールできる行動（例：関係者への打診メールを本日中に送る）を単位にすることが重要だとされます。</p>

          <p>クリアリングミーティングについては、著者はチームの成熟度を測る上でこれに勝る方法を知らないと述べるほど、この手法を重視しています。</p>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://techleadjournal.dev/episodes/110/" target="_blank" rel="noopener">Tech Lead Journal #110 ― Roy Osherove インタビュー</a></li>
              <li><a href="https://www.5whys.com/" target="_blank" rel="noopener">5 Whys（Roy Osheroveのブログ）</a></li>
            </ul>
          </div>
        </section>

        <section id="escaping-survival-mode">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flame" />SECTION 06</div>
          <h2>ステップバイステップ：サバイバルモードからの脱出</h2>

          <p>サバイバルモードは、船が沈みかけている状態で船長が会議を開くのではなく、まず命令を出す局面にたとえられます。この段階では一時的に指示命令型のリーダーシップを取ることが正当化されますが、あくまで期限付きの措置である点が重要です。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SURVIVAL_MODE_STEPS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">サバイバルモードから脱出する6ステップ</div>
          </div>

          <ol class="step-list">
            <li>
              <div class="step-num" data-testid="step-tag">1</div>
              <div class="step-body">
                <div class="step-title">現状の可視化</div>
                <div class="step-desc">チームが今何にコミットしているかをすべて棚卸しします。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">2</div>
              <div class="step-body">
                <div class="step-title">正直な状況共有</div>
                <div class="step-desc">経営層に対して、このまま進めば状況が悪化する一方であることを率直に伝えます。リーダーの本来の職務価値はまさにこの困難な会話にあります。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">3</div>
              <div class="step-body">
                <div class="step-title">期間を区切った絞り込み</div>
                <div class="step-desc">今後およそ30日間で現実的に完了できる分だけにコミットメントを絞ります。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">4</div>
              <div class="step-body">
                <div class="step-title">残りタスクの再見積もり</div>
                <div class="step-desc">入りきらなかったタスクは、学習コストを織り込んで再見積もりします。3〜5倍程度の時間を要することも珍しくありません。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">5</div>
              <div class="step-body">
                <div class="step-title">マルチタスクの排除</div>
                <div class="step-desc">並行作業をやめ、1つずつ完了させることで実質的なスループットを取り戻します。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">6</div>
              <div class="step-body">
                <div class="step-title">期限到来時の移行</div>
                <div class="step-desc">区切った期間が終わったら、必ずラーニングモードへの移行を実行します。ここで移行せずに漫然と続けてしまうことが最大のアンチパターンです。</div>
              </div>
            </li>
          </ol>

          <p>サバイバルモードが長引く背景には、しばしば学習コストを見積もりに含めないことによる悪循環があります。次の図は、テスト自動化を例にした悪循環と好循環の対比です。</p>

          <div class="diagram-card mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_TEST_AUTOMATION_SPIRAL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
            <div class="diagram-caption">学習投資をめぐる悪循環と好循環</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" />ベストプラクティス</div>
            <ul>
              <li>「お金を稼ぐにはお金が要る」という格言になぞらえ、著者は「時間を作るには時間が要る」という逆説を指摘しています。学習に時間を先行投資することが、結果的にチーム全体の時間的余裕を生み出します。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.infoq.com/presentations/Team-Leadership-in-the-Age-of-Internet/" target="_blank" rel="noopener">InfoQ ― Team Leadership in the Age of Agile（講演）</a></li>
              <li><a href="https://techleadjournal.dev/episodes/110/" target="_blank" rel="noopener">Tech Lead Journal #110 ― Roy Osherove インタビュー</a></li>
            </ul>
          </div>
        </section>

        <section id="growing-in-learning-mode">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:school" />SECTION 07</div>
          <h2>ステップバイステップ：ラーニングモードでチームを育てる</h2>

          <p>ラーニングモードにおけるリーダーの成功指標は、1日・1週間のうちに、自分がボトルネックとして頼られる回数がどれだけ減っているかです。</p>

          <ol class="step-list">
            <li>
              <div class="step-num" data-testid="step-tag">1</div>
              <div class="step-body">
                <div class="step-title">ボトルネック頻度の計測</div>
                <div class="step-desc">どのくらいの頻度で自分にしか解決できない相談が来ているかを意識的に観察します。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">2</div>
              <div class="step-body">
                <div class="step-title">分からないときにどうするかを教える</div>
                <div class="step-desc">答えそのものを与えるのではなく、リーダー自身がどう考えて判断しているかという思考プロセスを共有し、時間をかけて権限とスキルの両方を委譲していきます。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">3</div>
              <div class="step-body">
                <div class="step-title">同席機会の意図的な提供</div>
                <div class="step-desc">普段リーダーだけが出席する会議にメンバーを同席させ、将来的にその役割を引き継げるようにします。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">4</div>
              <div class="step-body">
                <div class="step-title">コミットメント言語の導入</div>
                <div class="step-desc">曖昧な合意を避け、行動レベルでの約束に落とし込みます。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">5</div>
              <div class="step-body">
                <div class="step-title">クリアリングミーティングの実施</div>
                <div class="step-desc">チームの自走度合いを定期的に可視化します。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">6</div>
              <div class="step-body">
                <div class="step-title">コーチングへの投資</div>
                <div class="step-desc">ラーニングモードでは指示ではなくコーチングが中心になります。特に親しい間柄のメンバーへのコーチングほど難しく、多くのリーダーが苦手意識を持つ領域です。</div>
              </div>
            </li>
          </ol>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>ラーニングモードで犯しがちな失敗として、著者は3日間の研修だけ受けさせてすぐ現場に戻し、変化を期待するケースを挙げています。これは学習に必要な時間的余白（スラックタイム）を用意しないまま、成果だけを期待してしまうパターンです。</p>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://leaddev.com/career-development/elastic-leadership-roy-osherove-conversation" target="_blank" rel="noopener">LeadDev ― Elastic Leadership: Roy Osherove in conversation</a></li>
            </ul>
          </div>
        </section>

        <section id="sustaining-self-organization">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" />SECTION 08</div>
          <h2>ステップバイステップ：セルフオーガナイジングモードを維持する</h2>

          <p>チームが自己組織化状態に到達した後も、リーダーの仕事は終わりません。環境変化やメンバーの入れ替わりによって、チームは容易にラーニングモードやサバイバルモードへ後退しうるためです。</p>

          <ol class="step-list">
            <li>
              <div class="step-num" data-testid="step-tag">1</div>
              <div class="step-body">
                <div class="step-title">やり方ではなくゴールを示す</div>
                <div class="step-desc">具体的な手順を指示するのではなく、目標や評価指標（メトリクス）の設計を通じてチームに影響を与えます。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">2</div>
              <div class="step-body">
                <div class="step-title">間接的な影響力を活用する</div>
                <div class="step-desc">直接指示する代わりに、メンバー構成・会議体・評価指標・物理／組織環境といった周囲の力学を調整することで、チームの動き方に影響を与えます。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">3</div>
              <div class="step-body">
                <div class="step-title">状態の継続モニタリング</div>
                <div class="step-desc">セルフオーガナイジングの状態を当然視せず、外部環境やメンバー変化によって再びラーニングモードやサバイバルモードへ戻っていないかを定期的に点検します。この後退は数日単位で起こり得ます。</div>
              </div>
            </li>
            <li>
              <div class="step-num" data-testid="step-tag">4</div>
              <div class="step-body">
                <div class="step-title">障害物の除去に徹する</div>
                <div class="step-desc">チームの意思決定に介入せず、意思決定を妨げる要因（承認プロセス、リソース制約など）を取り除く役割に徹します。</div>
              </div>
            </li>
          </ol>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.infoq.com/presentations/Team-Leadership-in-the-Age-of-Internet/" target="_blank" rel="noopener">InfoQ ― Team Leadership in the Age of Agile（講演）</a></li>
            </ul>
          </div>
        </section>

        <section id="anti-patterns">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" />SECTION 09</div>
          <h2>よくあるアンチパターン</h2>

          <p>Elastic Leadershipの実践でよく見られる失敗パターンを整理しました。自分やチームが当てはまっていないか、定期的に振り返ってみてください。</p>

          <div class="table-wrap">
            <table>
              <thead><tr><th>アンチパターン</th><th>内容</th><th>対処の方向性</th></tr></thead>
              <tbody>
                <tr><td>サバイバルモードの慢性化</td><td>指示命令型が恒常化し、期限付きの措置であることを忘れて延々と火消しを続けてしまう</td><td>移行のための期限（例：30日）を最初に明示し、必ず振り返りと再見積もりを実施する</td></tr>
                <tr><td>ヒーロー依存</td><td>深夜のビルド修正など、常に自分が解決役であることに心理的な満足を覚え、無意識にその状態を維持しようとする</td><td>解決することではなく解決できる人を増やすことを自身の評価軸に置き換える</td></tr>
                <tr><td>学習コストの見積もり漏れ</td><td>新しい手法の導入時に、学習に必要な時間を若干の上乗せ程度にしか見積もらない</td><td>学習を伴うタスクは通常の数倍の時間を要するという前提で再見積もりする</td></tr>
                <tr><td>研修任せの学習</td><td>数日間の研修だけを実施し、現場に戻したら自然に定着すると期待してしまう</td><td>現場でスラックタイムを継続的に確保し、実践と失敗の機会を用意する</td></tr>
                <tr><td>スプリント末コミットメントへの過度な依存</td><td>本人がコントロールできない完成そのものへコミットさせ、未達のたびにチームの士気を損なう</td><td>コントロール可能な行動を単位としたコミットメント言語に切り替える</td></tr>
                <tr><td>セルフオーガナイジングへの過信</td><td>一度自己組織化したチームは変化しないと思い込み、モニタリングを怠る</td><td>環境変化・メンバー変化を継続的に観察し、必要なら意図的に前段階の関わり方へ戻す</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="line-manager-guidance">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:sitemap" />SECTION 10</div>
          <h2>ラインマネージャー向けの指針</h2>

          <p>Elastic Leadershipでは、チームリーダーだけでなく、そのリーダーたちを束ねるラインマネージャー向けの指針も示されています。基本的な考え方は、自分の担当範囲を一段上げても、同じボトルネック解消の論理が適用されるというものです。</p>

          <ul>
            <li>開発者を率いる立場なら、開発者にチームリードとしての考え方を教える。</li>
            <li>チームリードを率いる立場なら、チームリードにリードをリードする考え方を教える。</li>
            <li>常に、自分が担っている役割を相手が体現できるようになるには何を教えればよいかを、一段階上の視点で問い続ける。</li>
          </ul>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>ラインマネージャーマニフェストの核心は、管理下にあるすべてのメンバーにおいて、自己組織化能力と自律性が長期的に育っていくことそのものを、マネジメントの目標に据える点にあります。組織構造上どうしても自分が承認プロセスの結節点にならざるを得ない場面（採用の最終承認など）はあり得ますが、その場合でも自分不在時にどう機能させるかという視点を持ち続けることが推奨されています。</p>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" />ソース</div>
            <ul>
              <li><a href="https://www.5whys.com/" target="_blank" rel="noopener">5 Whys（Roy Osheroveのブログ）</a></li>
              <li><a href="https://www.manning.com/books/elastic-leadership" target="_blank" rel="noopener">Manning Publications ― Elastic Leadership 書籍公式ページ</a></li>
            </ul>
          </div>
        </section>

        <section id="practice-checklist">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checklist" />SECTION 11</div>
          <h2>実践チェックリスト</h2>

          <p>Elastic Leadershipを実践する際に、定期的に立ち返りたい確認項目です。</p>

          <ul>
            <li>今のチームがどのフェーズ（サバイバル・ラーニング・セルフオーガナイジング）にいるかを、根拠とともに言語化できているか</li>
            <li>サバイバルモードであれば、脱出のための期限（目安30日）を設定し、経営層と合意できているか</li>
            <li>学習を伴うタスクの見積もりに、通常の数倍の時間バッファを織り込んでいるか</li>
            <li>自分にしか対応できない業務（バス係数1の業務）を意図的に洗い出し、移譲計画があるか</li>
            <li>メンバーへの依頼や約束の場面で、コントロール可能な行動単位のコミットメント言語を使っているか</li>
            <li>クリアリングミーティングなどを通じて、メンバーが指示を待つ前に動き出しているかを定期的に観察しているか</li>
            <li>セルフオーガナイジングなチームに対しても、環境変化やメンバー変化によるモード後退の兆候を継続的にモニタリングしているか</li>
            <li>自分自身のリーダーシップスタイルを唯一の正解として固定していないか、定期的に見直しているか</li>
          </ul>
        </section>

        <section id="summary">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" />SECTION 12</div>
          <h2>まとめ</h2>

          <p>Elastic Leadershipの本質は、良いリーダーシップスタイルが一つ存在するという発想を手放し、チームの現在地に応じてスタイルを弾性的に変えることにあります。サバイバルモードでは指示型で舵を取り、ラーニングモードでは挑戦を促すコーチングを行い、セルフオーガナイジングモードではゴールだけを示して手を引く。この一連のサイクルを、Team Leader Manifestoという価値観の軸を頼りに、バス係数・スラックタイム・コミットメント言語・クリアリングミーティングといった具体的な技法で支えていく、というのが本フレームワークの全体像です。</p>

          <p>最終的なゴールは、リーダー自身が「いなくても回るチーム」を作ることであり、それはリーダーとしての価値を下げることではなく、むしろ組織にとってより価値の高い存在になることだと著者は繰り返し強調しています。</p>
        </section>

        <section id="references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" />SECTION 13</div>
          <h2>参考文献・出典</h2>

          <p>本ガイドの作成にあたり、2026年8月16日時点で参照可能な以下の一次情報・著名な国際的開発者コミュニティの記事を調査・参照しました。</p>

          <div class="ref-group">
            <h3>公式情報</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Manning Publications ― 書籍公式ページ</span><a class="ref-url" href="https://www.manning.com/books/elastic-leadership" target="_blank" rel="noopener">https://www.manning.com/books/elastic-leadership</a></li>
              <li><span class="ref-name">Elastic Leadership 公式サイト（Roy Osherove）</span><a class="ref-url" href="https://www.elasticleadership.com/" target="_blank" rel="noopener">https://www.elasticleadership.com/</a></li>
              <li><span class="ref-name">5 Whys（Roy Osheroveのブログ／本フレームワークの発祥地）</span><a class="ref-url" href="https://www.5whys.com/" target="_blank" rel="noopener">https://www.5whys.com/</a></li>
              <li><span class="ref-name">Team Leader Manifesto - Take #4（本ガイドが参照した公開版）</span><a class="ref-url" href="https://www.5whys.com/articles/team-leader-manifesto-take-4.html" target="_blank" rel="noopener">https://www.5whys.com/articles/team-leader-manifesto-take-4.html</a></li>
              <li><span class="ref-name">Roy Osherove 個人サイト</span><a class="ref-url" href="https://osherove.com/" target="_blank" rel="noopener">https://osherove.com/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>インタビュー・メディア記事</h3>
            <ul class="ref-list">
              <li><span class="ref-name">InfoQ ― Q&amp;A on the Book Elastic Leadership（Ben Linders）</span><a class="ref-url" href="https://www.infoq.com/articles/book-review-elastic-leadership/" target="_blank" rel="noopener">https://www.infoq.com/articles/book-review-elastic-leadership/</a></li>
              <li><span class="ref-name">InfoQ ― Team Leadership in the Age of Agile（講演）</span><a class="ref-url" href="https://www.infoq.com/presentations/Team-Leadership-in-the-Age-of-Internet/" target="_blank" rel="noopener">https://www.infoq.com/presentations/Team-Leadership-in-the-Age-of-Internet/</a></li>
              <li><span class="ref-name">Tech Lead Journal #110（Henry Suryawirawan）</span><a class="ref-url" href="https://techleadjournal.dev/episodes/110/" target="_blank" rel="noopener">https://techleadjournal.dev/episodes/110/</a></li>
              <li><span class="ref-name">LeadDev ― Elastic Leadership: Roy Osherove in conversation（Suzan Bond）</span><a class="ref-url" href="https://leaddev.com/career-development/elastic-leadership-roy-osherove-conversation" target="_blank" rel="noopener">https://leaddev.com/career-development/elastic-leadership-roy-osherove-conversation</a></li>
              <li><span class="ref-name">Maxcode ― Elastic Leadership for Technical Leaders（講演レポート）</span><a class="ref-url" href="https://www.maxcode.net/blog/elastic-leadership-for-technical-leaders-with-roy-osherove/" target="_blank" rel="noopener">https://www.maxcode.net/blog/elastic-leadership-for-technical-leaders-with-roy-osherove/</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h3>参考モデル</h3>
            <ul class="ref-list">
              <li><span class="ref-name">Tuckman's stages of group development（比較対象の一般的チーム発達モデル）</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development</a></li>
            </ul>
          </div>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" />補足</div>
            <p>本ガイドは上記ソースの内容を独自の言葉で要約・再構成した二次的な解説資料です。正確な原文表現や詳細な事例・体験談を確認したい場合は、必ず書籍本編（Manning版）および上記一次ソースを直接ご参照ください。</p>
          </div>
        </section>

        <footer>
          Elastic Leadership 実践ガイド ｜ 本ページはRoy Osherove氏の著作をもとにした非公式の学習支援コンテンツです。書誌情報・購入は<a href="https://www.manning.com/books/elastic-leadership" target="_blank" rel="noopener">Manning公式ページ</a>をご確認ください。｜ 最終更新: 2026年8月18日
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ===================== Layout & Reset ===================== */
.guide-page {
  background: var(--color-paper);
  color: var(--color-ink);
  min-height: 100vh;
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

.sidebar-nav a:hover {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  text-decoration: none;
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
  border-left: 2px solid var(--color-indigo);
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

/* ===================== Main Content ===================== */
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
  line-height: 1.75;
}

ul, ol {
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

a {
  color: var(--color-indigo);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
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

td strong, th strong {
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

.callout.practice {
  border-left-color: var(--color-gold);
}

.callout.practice .callout-title {
  color: var(--color-gold);
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

/* ===================== Diagram Containers ===================== */
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

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 20px 0;
  text-align: center;
}

/* ===================== Step List ===================== */
.step-list {
  list-style: none;
  margin: 0 0 24px;
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

/* ===================== Glossary ===================== */
.glossary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 16px;
  margin: 24px 0;
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

/* ===================== Reference List ===================== */
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

/* ===================== Responsive ===================== */
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

  .glossary-grid {
    grid-template-columns: 1fr;
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
