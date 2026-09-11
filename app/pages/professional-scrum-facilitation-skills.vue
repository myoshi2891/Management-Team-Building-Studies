<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "certification-overview",
  "what-is-facilitation",
  "exam-scope",
  "principles-and-values",
  "facilitator-skills",
  "facilitation-level",
  "facilitating-events",
  "group-dynamics",
  "facilitation-toolkit",
  "diverse-perspectives",
  "exam-prep-roadmap",
  "practice-questions",
  "best-practice-cheatsheet",
  "references"
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
  title: "Professional Scrum Facilitation Skills™ 認定資格 完全ガイド | 出題範囲とベストプラクティス",
  description:
    "Scrum.org公式のProfessional Scrum Facilitation Skills(PSFS)認定資格について、出題範囲・ファシリテーション原則・スキルと資質・イベント別技法・練習問題までを初学者向けに解説するガイドです。",
});

const DIAGRAM_CERTIFICATION_ROADMAP = `flowchart TB
A["Scrumの基礎を固める"] --> B["Professional Scrum Master I を取得する 推奨"]
B --> C["Professional Scrum Facilitation Skills 研修を受講する 任意"]
C --> D["公式のFacilitation関連記事を読み込む"]
D --> E["Facilitation Skills Open 無料模擬試験 を受験する"]
E --> F{"安定して高得点が取れているか"}
F -->|"はい"| G["PSFS本試験を申し込み受験する"]
F -->|"いいえ"| D
G --> H["85%以上でPSFS認定を取得"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G box;
class H done;`;

const DIAGRAM_FACILITATOR_STANCE = `flowchart TB
A["セッションが進行中"] --> B{"自分は議論の内容に利害関係があるか"}
B -->|"ない"| C["中立なファシリテーターとして進行を続ける"]
B -->|"ある"| D["いったんファシリテーター役を離れることを宣言する"]
D --> E["チームメンバーとして意見や提案を述べる"]
E --> F["ファシリテーター役に戻ることを宣言する"]
F --> C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,D,E,F box;
class C done;`;

const DIAGRAM_COMPETENCY_TREE = `flowchart TB
A["Professional Scrum Competencies"] --> B["Developing People and Teams"]
B --> C["Facilitation"]
C --> D["Facilitation Principles and Values"]
C --> E["Applying Facilitation Skills and Techniques"]
D --> D1["ファシリテーション原則とその適用を理解する"]
D --> D2["原則をスクラムイベント等の力学改善に活かす方法を理解する"]
E --> E1["多様な視点とチームダイナミクスの活用方法を理解する"]
E --> E2["チームの協働と参加型意思決定の改善方法を理解する"]
E --> E3["アウトカムに向けて進捗を促す技法の活用方法を理解する"]
E --> E4["弱いアウトカムと強いアウトカムの違いを理解する"]
E --> E5["Groan Zoneを認識し乗り越える方法を理解する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,D1,D2,E1,E2,E3,E4,E5 box;`;

const DIAGRAM_FACILITATION_LEVEL_MODEL = `flowchart TB
A["チームの状況を観察する"] --> B{"チームの効果性は高いか"}
B -->|"高い"| C{"状況の複雑さは高いか"}
B -->|"低い"| D{"状況の複雑さは高いか"}
C -->|"低い"| E["ファシリテーションなし"]
C -->|"高い"| F["軽いファシリテーション"]
D -->|"低い"| G["中程度のファシリテーション"]
D -->|"高い"| H["強いファシリテーション"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D box;
class E,F,G,H done;`;

const DIAGRAM_SPRINT_CYCLE = `flowchart LR
A["Sprint Planning 協調的で透明性の高い環境"] --> B["Sprint Developersが計画を実行する"]
B --> C["Daily Scrum スプリントゴールへの集中を保つ"]
C --> B
B --> D["Sprint Review 参加型で共感的な対話"]
D --> E["Sprint Retrospective 安全な場と合意形成"]
E --> A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`;

const DIAGRAM_TUCKMAN_MODEL = `flowchart LR
A["Forming 形成期"] --> B["Storming 混乱期"]
B --> C["Norming 統一期"]
C --> D["Performing 機能期"]
D --> E["Adjourning 解散期"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D box;
class E done;`;

const DIAGRAM_KANER_DIAMOND = `flowchart LR
A["Divergent Zone 発散 多様な視点とアイデアの探索"] --> B["Groan Zone 混乱 摩擦 停滞感が生じる時期"]
B --> C["Convergent Zone 収束 共通理解への統合"]
C --> D["合意された決定"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B box;
class C,D done;`;

const DIAGRAM_DECISION_TECHNIQUE_SELECTOR = `flowchart TB
A["何を決めたいか"] --> B{"複数案から1つを選ぶ"}
A --> C{"複数案の優先順位をつけたい"}
A --> D{"賛成か反対かを問う"}
B --> E["賛同の度合いも知りたい"]
E --> F["Fist of Five を使う"]
C --> G["全員に平等な発言権を持たせたい"]
G --> H["Dot Voting または White Elephant を使う"]
D --> I["素早く白黒つけたい"]
I --> J["Roman Voting を使う"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,G,I box;
class F,H,J done;`;

const DIAGRAM_EXAM_STUDY_ROADMAP = `flowchart TB
A["Scrum Guideを読み込み Scrumイベントのアウトカムを再確認する"] --> B["Facilitation Learning Seriesの記事を一通り読む"]
B --> C["5つの原則 9つのスキルと資質を自分の言葉で説明できるようにする"]
C --> D["イベントごとのファシリテーション技法を整理する"]
D --> E["Groan Zoneと弱い アウトカム 強い アウトカムの違いを理解する"]
E --> F["Facilitation Skills Open を複数回受験する"]
F --> G{"安定して高得点が取れるか"}
G -->|"いいえ"| B
G -->|"はい"| H["本試験 PSFS を申し込み受験する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E,F,G box;
class H done;`;
</script>

<template>
  <div class="layout">
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      aria-controls="sidebar"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    ></div>
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">PSFS 完全ガイド</div>
          <div class="brand-subtitle">Professional Scrum Facilitation Skills</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a :class="{ active: activeId === 'certification-overview' }" href="#certification-overview" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />1. この資格の概要</a></li>
        <li><a :class="{ active: activeId === 'what-is-facilitation' }" href="#what-is-facilitation" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />2. ファシリテーションとは</a></li>
        <li><a :class="{ active: activeId === 'exam-scope' }" href="#exam-scope" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />3. 出題範囲の全体像</a></li>
        <li><a :class="{ active: activeId === 'principles-and-values' }" href="#principles-and-values" @click="closeSidebar"><Icon name="tabler:scale" aria-hidden="true" />4. 5原則と価値基準</a></li>
        <li><a :class="{ active: activeId === 'facilitator-skills' }" href="#facilitator-skills" @click="closeSidebar"><Icon name="tabler:user-check" aria-hidden="true" />5. スキルと資質</a></li>
        <li><a :class="{ active: activeId === 'facilitation-level' }" href="#facilitation-level" @click="closeSidebar"><Icon name="tabler:adjustments" aria-hidden="true" />6. 必要なレベルの見極め</a></li>
        <li><a :class="{ active: activeId === 'facilitating-events' }" href="#facilitating-events" @click="closeSidebar"><Icon name="tabler:repeat" aria-hidden="true" />7. イベントのファシリテーション</a></li>
        <li><a :class="{ active: activeId === 'group-dynamics' }" href="#group-dynamics" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />8. グループダイナミクスと意思決定</a></li>
        <li><a :class="{ active: activeId === 'facilitation-toolkit' }" href="#facilitation-toolkit" @click="closeSidebar"><Icon name="tabler:tools" aria-hidden="true" />9. 技法ツールキット</a></li>
        <li><a :class="{ active: activeId === 'diverse-perspectives' }" href="#diverse-perspectives" @click="closeSidebar"><Icon name="tabler:messages" aria-hidden="true" />10. 多様な視点への対応</a></li>
        <li><a :class="{ active: activeId === 'exam-prep-roadmap' }" href="#exam-prep-roadmap" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />11. 試験対策ロードマップ</a></li>
        <li><a :class="{ active: activeId === 'practice-questions' }" href="#practice-questions" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />12. 練習問題</a></li>
        <li><a :class="{ active: activeId === 'best-practice-cheatsheet' }" href="#best-practice-cheatsheet" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />13. チートシート</a></li>
        <li><a :class="{ active: activeId === 'references' }" href="#references" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />14. 参考文献・出典</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main id="main-content" class="main-content">


    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />SCRUM.ORG 認定資格ガイド</div>
      <h1>Professional Scrum Facilitation Skills™ 認定資格 完全対策ガイド</h1>
      <p class="hero-lede">
        初学者向けに、出題範囲の各項目をステップバイステップで解説し、各項目・各テクニックにおけるベストプラクティスをまとめた学習ガイドです。すべての図はMermaidで、表形式の情報はMarkdownテーブルで記述しています。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">20問</div><div class="stat-label">多肢選択式、制限時間30分</div></div>
        <div class="stat-card"><div class="stat-number">85%</div><div class="stat-label">合格ライン</div></div>
        <div class="stat-card"><div class="stat-number">200 USD</div><div class="stat-label">受験料 有効期限なし</div></div>
        <div class="stat-card"><div class="stat-number">2領域</div><div class="stat-label">Facilitation Principles and Values / Applying Facilitation Skills and Techniques</div></div>
      </div>

      <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドはScrum.orgの公開情報および関連する業界解説記事を基に、学習目的で独自にまとめた非公式の解説資料です。試験問題そのものを再現したものではありません。最新の出題範囲・受験要項は必ず<a href="https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification" target="_blank" rel="noopener">公式サイト</a>でご確認ください。</span>
        </div>
    </div>

    <!-- ===================== 1. Certification Overview ===================== -->
    <section id="certification-overview">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      <h2>この資格の概要</h2>

      <p>Professional Scrum Facilitation Skills(PSFS)は、Scrum.org が提供する認定資格で、ファシリテーションの原則・スキル・技法をどれだけ理解し、スクラムイベントやその他のチームの対話にどう応用できるかを検証するものです。単なる「一般的なファシリテーション知識」を問う試験ではなく、<strong>スクラムという文脈の中でファシリテーション原則をどう適用するか</strong>を問う点が最大の特徴です。</p>

      <h3>基本情報</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>提供元</td><td>Scrum.org</td></tr>
            <tr><td>レベル</td><td>Intermediate(中級)</td></tr>
            <tr><td>受験形式</td><td>オンライン、自分の好きな場所と時間で受験可能</td></tr>
            <tr><td>問題数</td><td>20問(多肢選択式)</td></tr>
            <tr><td>制限時間</td><td>30分</td></tr>
            <tr><td>合格ライン</td><td>85%以上</td></tr>
            <tr><td>受験言語</td><td>英語(Google翻訳プラグインを使って母国語で受験する人も多い)</td></tr>
            <tr><td>費用</td><td>200 USD</td></tr>
            <tr><td>有効期限</td><td>なし(更新料も不要)</td></tr>
            <tr><td>前提資格</td><td>必須ではないが、Professional Scrum Master I(PSM I)認定の取得が強く推奨される</td></tr>
            <tr><td>公式スタンダード</td><td>The Scrum Guide / The Professional Scrum Competencies</td></tr>
            <tr><td>バッジ発行</td><td>Credly経由でデジタルバッジが発行される</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification" target="_blank" rel="noopener">認定資格ページ</a></li>
          <li><a href="https://www.credly.com/org/scrum-org/badge/professional-scrum-facilitation-skills.1" target="_blank" rel="noopener">Credly バッジページ(Professional Scrum Facilitation Skills™)</a></li>
        </ul>
      </div>

      <h3>誰のための資格か</h3>
      <ul>
        <li>スクラムマスターやスクラムチームのメンバーで、チームの成功をファシリテーションによって後押ししたい人</li>
        <li>アジャイルコーチ、スクラムコーチ、アジャイルコンサルタント</li>
        <li>「Scrumの基本用語は知っているがイベントがうまく回らない」と感じているファシリテーター初学者</li>
      </ul>
      <p>なお公式サイトでは、Scrumの経験がほとんどない人には不向きな試験だと明記されています。PSM Iで学ぶスクラムの基礎(イベント・作成物・価値基準)を土台として、その上にファシリテーションの知識を積み上げる構成になっているためです。</p>

      <h3>資格取得までの流れ</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CERTIFICATION_ROADMAP" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">PSFS資格取得までの推奨ステップ</div>
      </div>

      <h3>出題対象となる「フォーカスエリア」</h3>
      <p>Scrum.orgが定める Professional Scrum Competencies のうち、PSFSの中心となるのは「Developing People and Teams」というコンピテンシーの中の「Facilitation」というフォーカスエリアです。その中は次の2つのサブ項目に分かれます。</p>
      <ul>
        <li><strong>Facilitation Principles and Values</strong>(ファシリテーションの原則と価値観)</li>
        <li><strong>Applying Facilitation Skills and Techniques</strong>(ファシリテーションのスキルと技法の適用)</li>
      </ul>
      <p>ただし、出題がこの2つのサブ項目だけに閉じるわけではありません。PSFSはファシリテーションを「スクラムの文脈の中で」問う試験のため、Scrum Values(スクラムの価値基準)、Scrum Team(スクラムチーム)、Events(スクラムイベント)、Artifacts(作成物)といったスクラムの基礎理解を前提とした上で、上記のFacilitationフォーカスエリアが主要な出題範囲となります。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills" target="_blank" rel="noopener">試験対策ガイダンス(Prove your knowledge of Facilitation Skills)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 2. What is Facilitation ===================== -->
    <section id="what-is-facilitation">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 02</div>
      <h2>ファシリテーションとは何か</h2>

      <h3>定義</h3>
      <p>Scrum.orgはファシリテーションを、関係者全員の参加・当事者意識・創造性を引き出しながら、合意された目的に向けて人々を導くための手法と定義しています。良いファシリテーションは透明性とコラボレーションを生み出し、集団の相乗効果(シナジー)を発揮させ、共通の目的の達成につながります。</p>
      <p>ファシリテーターの役割は、人々が共通のゴールを理解し、それを達成できるよう支援することです。そのために欠かせないのが「中立性」です。ファシリテーターは議論の内容そのものに肩入れせず、あくまで議論が前に進むための「場」と「プロセス」を設計し、導く役割に徹します。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/what-facilitation" target="_blank" rel="noopener">What is Facilitation?</a></li>
        </ul>
      </div>

      <h3>ファシリテーターとスクラムマスターの関係</h3>
      <p>スクラムでは、誰でもファシリテーターになれます。スクラムチームの内部の人(開発者やプロダクトオーナー)でも、外部の人でも構いません。ただし現実には、スクラムマスターがファシリテーターを担うことが最も多いパターンです。</p>
      <p>ここで初学者がつまずきやすいポイントが一つあります。それは「ファシリテーターとして進行している自分」と「チームの一員として意見を言いたい自分」が同一人物の中に同居してしまう場面です。例えばスプリントレトロスペクティブを進行しているスクラムマスターが、同時に開発チームの一員として改善案を提案したくなることがあります。</p>
      <p>このとき重要なのは、<strong>今どちらの立場で話しているのかをチームに明確に伝えること</strong>です。曖昧なまま両方の役割を行き来すると、チームはあなたの発言をどう受け止めればよいか混乱してしまいます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FACILITATOR_STANCE" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">ファシリテーターとしての中立性を保つための役割切り替えフロー</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>ファシリテーションを始める前に「今日は私がファシリテーターとして進行します」と役割を明言する</li>
          <li>発言する前に「今は参加者として話します」と一言添えるだけで、チームの混乱を防げる</li>
          <li>ファシリテーターは「プロセスのオーナー」であって「コンテンツのオーナー」ではない、という原則を常に意識する</li>
          <li>スクラムの枠組みに関すること以外は、チームに「何をすべきか」「どうすべきか」を指示しない</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/blog/scrum-master-facilitator" target="_blank" rel="noopener">The Scrum Master as a Facilitator</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 3. Exam Scope (Professional Scrum Competencies) ===================== -->
    <section id="exam-scope">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 03</div>
      <h2>出題範囲の全体像(Professional Scrum Competencies)</h2>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_COMPETENCY_TREE" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Professional Scrum CompetenciesにおけるFacilitationフォーカスエリアの構造</div>
      </div>

      <h3>各フォーカスエリアの Knowledge Requirements(公式の知識要件)</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>フォーカスエリア</th><th>公式の知識要件(Knowledge Requirements)</th></tr></thead>
          <tbody>
            <tr><td>Facilitation Principles and Values</td><td>・ファシリテーション原則とその適用方法を理解している<br>・ファシリテーション原則がスクラムイベントやその他の対話の力学をどう改善できるかを理解している</td></tr>
            <tr><td>Applying Facilitation Skills and Techniques</td><td>・チームの多様な視点とダイナミクスを活かすファシリテーションスキルの使い方を理解している<br>・チームの協働と参加型意思決定を改善する方法を理解している<br>・アウトカムに向けた進捗を促す複数のファシリテーションスキルと技法の使い方を理解している<br>・弱いアウトカムと強いアウトカムの違いを理解している<br>・「Groan Zone(うなり声ゾーン)」を認識し、乗り越える方法を理解している</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/facilitation-principles-and-values" target="_blank" rel="noopener">Facilitation Principles and Values(フォーカスエリア)</a></li>
          <li><a href="https://www.scrum.org/resources/applying-facilitation-skills-and-techniques" target="_blank" rel="noopener">Applying Facilitation Skills and Techniques(フォーカスエリア)</a></li>
        </ul>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>PSFS試験問題は、この2つのフォーカスエリアに加えて、スクラムの価値基準・スクラムチーム・イベント・作成物についての土台知識(=PSM Iレベルの内容)からも派生して出題されます。「一般的なファシリテーション理論の試験」ではなく「スクラムの文脈でのファシリテーション原則の適用」を問う試験である、という点を繰り返し意識してください。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills" target="_blank" rel="noopener">試験対策ガイダンス(Prove your knowledge of Facilitation Skills)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 4. Principles and Values ===================== -->
    <section id="principles-and-values">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:scale" aria-hidden="true" />SECTION 04</div>
      <h2>ファシリテーションの5原則とスクラムの価値基準</h2>

      <h3>ファシリテーションの5原則</h3>
      <p>スクラムの価値基準(Commitment確約 / Focus集中 / Openness公開 / Respect尊敬 / Courage勇気)はスクラムチームの行動の土台ですが、それを補完する形で、Scrum.orgは次の5つのファシリテーション原則を定義しています。これらはファシリテーターがどんなテクニックを選ぶべきかを判断する際の拠り所になります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>原則</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>Participatory(参加)</td><td>効果的なファシリテーションの核心は、全員の完全な参加と関与である。チームに共有された責任感が生まれる。</td></tr>
            <tr><td>Healthy(安全・健全)</td><td>人々が違いや対立する視点を安心して表明できる、安全な空間をつくること。互いに敬意を持って学び合える環境が必要。</td></tr>
            <tr><td>Transparency(透明性)</td><td>透明性は「見えること」だけでなく「共有された理解があること」で初めて成立する。</td></tr>
            <tr><td>Process(プロセス)</td><td>ファシリテーションは、協調的・包括的で多様な視点を活かす形で、チームが目的に向かって進めるようにするものであるべき。</td></tr>
            <tr><td>Purposeful(目的)</td><td>よくファシリテーションされたセッションには、全員が同意し向かうべき明確な目的がある。</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/facilitation-principles" target="_blank" rel="noopener">Facilitation Principles</a></li>
        </ul>
      </div>

      <h3>スクラムの価値基準から見たファシリテーター行動</h3>
      <p>Scrum.orgのブログ記事「Scrum Values from a Facilitator's Perspective」では、5つのスクラム価値基準それぞれについて、ファシリテーターが体現すべき具体的な行動が紹介されています。要点を以下にまとめます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>スクラムの価値基準</th><th>ファシリテーターの具体的な行動例</th></tr></thead>
          <tbody>
            <tr><td>Commitment(確約)</td><td>目的・人・プロセスにコミットする。事前準備を怠らず、包括的な進行構造を設計する。ルーティンのイベントでも難しいレトロスペクティブでも一貫した姿勢を保つ。内容ではなく進行に対して中立であり続ける。</td></tr>
            <tr><td>Courage(勇気)</td><td>言いにくい真実でも表に出す勇気を持つ。「私たちが話していないことは何か」と問いかける。声の大きい人の発言を遮ってでも、他の人が話す余地をつくる。</td></tr>
            <tr><td>Focus(集中)</td><td>活動そのものではなくアウトカムに焦点を当てる。会議が始まる前から目的に集中する。タイムボックスや視覚的な手がかりを使って進捗をガイドする。</td></tr>
            <tr><td>Openness(公開)</td><td>収束する前に発散的な思考を歓迎する。プロセス・時間配分・力関係について透明性を保つ。進捗を妨げている暗黙の前提を表面化させる。</td></tr>
            <tr><td>Respect(尊敬)</td><td>参加者一人ひとりの立場や感じ方を尊重し、安全に発言できる場を保証する(本ガイド4.1の Healthy 原則とも重なる観点)。</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/blog/scrum-values-facilitators-perspective" target="_blank" rel="noopener">Scrum Values from a Facilitator's Perspective</a></li>
        </ul>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>5原則とスクラムの価値基準は、公式に1対1で対応関係が定義されているわけではありません。試験対策としては「両者は互いに補完し合う関係にある」という位置づけを理解しておけば十分です。無理に1対1のペアで暗記しようとすると、誤った理解につながるので注意してください。</p>
      </div>
    </section>

    <!-- ===================== 5. Skills and Traits of a Facilitator ===================== -->
    <section id="facilitator-skills">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:user-check" aria-hidden="true" />SECTION 05</div>
      <h2>ファシリテーターに必要なスキルと資質</h2>

      <p>Scrum.orgの「Skills and Traits of a Facilitator」では、優れたファシリテーターに共通する資質が紹介されています。初学者はこれらを「性格」ではなく「後天的に磨けるスキル」として捉えることが重要です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>スキル・資質</th><th>内容</th><th>初学者向けの実践のコツ</th></tr></thead>
          <tbody>
            <tr><td>Active Listening(積極的傾聴)</td><td>発言された内容だけでなく、発言されなかったことにも意識を向けて完全に集中して聴く。</td><td>相手が話し終わるまで自分の返答を考えない。要約して聞き返す「パラフレーズ」を習慣にする。</td></tr>
            <tr><td>Encouraging Curiosity(好奇心を促す)</td><td>異なる視点を歓迎し、内省と議論を刺激するオープンな質問を投げかける。</td><td>「なぜ」ではなく「どのように」「何が」で始まる質問を用意しておく。</td></tr>
            <tr><td>Problem Solving(問題解決)</td><td>グループが問題を定義し、明確な問題文に再構成し、幅広い解決策を検討できるよう支援する。</td><td>議論が発散したら「私たちが解決しようとしている問題は何か」と立ち戻る質問をする。</td></tr>
            <tr><td>Resolving Conflict(対立の解消)</td><td>対立は自然なものであり、適切に表現されれば抑え込む必要はないと理解する。建設的かつ敬意を持って扱う。</td><td>対立が起きたら止めるのではなく「その意見の背景にある懸念は何か」と深掘りする。</td></tr>
            <tr><td>Using a Participative Style(参加型スタイルの活用)</td><td>参加者それぞれの快適さのレベルに応じて、全員が積極的に関与できるよう促す。</td><td>声の大きい人だけでなく、静かな人にも発言の機会を意図的に設ける。</td></tr>
            <tr><td>Encouraging Openness(オープンさを促す)</td><td>他者のアイデアや提案、視点に対してグループがオープンであるよう促す。</td><td>「良い / 悪い」を即座に判断せず、まず全てのアイデアを可視化してから評価する。</td></tr>
            <tr><td>Empathizing and Showing Compassion(共感と思いやり)</td><td>他者の感情・視点・行動を理解し、敬意を払う。</td><td>感情的な発言があった場合、内容の是非より先に「そう感じたのですね」と受け止める。</td></tr>
            <tr><td>Demonstrating Leadership(リーダーシップの発揮)</td><td>グループを共通のゴールと目的に導く。</td><td>指示するリーダーシップではなく、問いかけと場づくりによるリーダーシップを意識する。</td></tr>
            <tr><td>Building Consensus(合意形成)</td><td>意見の異なる参加者の間で、実行可能な合意を形成する。</td><td>「全員が100%満足する」ではなく「全員が支持できる」水準を目指す。</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/skills-and-traits-facilitator" target="_blank" rel="noopener">Skills and Traits of a Facilitator</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 6. How Much Facilitation Is Needed ===================== -->
    <section id="facilitation-level">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:adjustments" aria-hidden="true" />SECTION 06</div>
      <h2>どれだけ・どんなファシリテーションが必要か</h2>

      <p>すべての対話に強いファシリテーションが必要なわけではありません。むしろ、健全で自己管理されたスクラムチームには、明示的なファシリテーションがまったく不要な場面も多くあります。Scrum.orgのPatricia Kong氏とGlaudia Califano氏は、必要なファシリテーションの強さを判断するための2軸モデルを提唱しています。</p>

      <h3>2つの軸</h3>
      <ul>
        <li><strong>チームの効果性(Team Effectiveness)</strong>: チームが効果的に協働し、価値を届け、自己回復・自己管理できる能力</li>
        <li><strong>状況の複雑さ(Contextual Complexity)</strong>: 必要とされる合意や確約の種類、対面かリモートかなど、チームが置かれている内外の環境要因を含む状況の複雑さ</li>
      </ul>
      <p>この2軸の組み合わせによって、ファシリテーションのレベルは「なし」「軽い」「中程度」「強い」の4段階に分かれます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_FACILITATION_LEVEL_MODEL" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">チームの効果性と状況の複雑さから必要なファシリテーションの強さを見極める</div>
      </div>

      <h3>具体例</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>状況</th><th>チームの効果性</th><th>状況の複雑さ</th><th>必要なファシリテーション</th></tr></thead>
          <tbody>
            <tr><td>実績のある高効果チームが日常的なブレインストーミングを行う</td><td>高い</td><td>低い</td><td>なし</td></tr>
            <tr><td>同じチームがハイブリッド環境でプロダクトゴールとスプリントゴールを策定する複雑なスプリントプランニングを行う</td><td>高い</td><td>高い</td><td>軽い〜中程度</td></tr>
            <tr><td>ひどいスプリントの直後、組織の人員削減の発表を受けて全員がストレスを抱えている状態でレトロスペクティブを行う</td><td>低下している</td><td>高い</td><td>強い</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>チームの状態は固定的なものではありません。同じチームでも状況によって必要なファシリテーションのレベルは変化します。「このチームはいつも自己管理できているから、もうファシリテーションは不要」と決めつけないことが大切です。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/articles/facilitation-skill-scrum" target="_blank" rel="noopener">When, Why and How Facilitation Skills Help Scrum Teams(InfoQ, Patricia Kong)</a></li>
          <li><a href="https://www.scrum.org/resources/blog/how-facilitation-key-effective-scrum-events" target="_blank" rel="noopener">How Facilitation is Key to Effective Scrum Events</a></li>
        </ul>
      </div>

      <h3>ベストプラクティス</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>テクニックを「知っていること」自体が目的化しないようにする。アイスブレイクや凝った手法は、目的に沿って使われて初めて価値を持つ</li>
          <li>リモート・ハイブリッド環境が増えるほど、対話の意図と目的にフォーカスすることが一層重要になる</li>
          <li>感情的知性(Emotional Intelligence)の高い人は自然と必要なファシリテーションの強さを察知できるが、それだけに頼らず「どれだけ」「どんな種類の」ファシリテーションが必要かを意識的に考える習慣をつける</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 7. Facilitating the Scrum Events ===================== -->
    <section id="facilitating-events">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:repeat" aria-hidden="true" />SECTION 07</div>
      <h2>スクラムイベントのファシリテーション</h2>

      <p>Scrumの5つのイベント(スプリント・デイリースクラム・スプリントプランニング・スプリントレビュー・スプリントレトロスペクティブ)には、それぞれ目的とタイムボックスがあらかじめ定義されています。良いファシリテーションが機能しないと、目的が果たされないまま時間だけが過ぎたり、一部の声だけが反映されたりする「非効果的な会議」に陥ってしまいます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SPRINT_CYCLE" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">スプリントサイクルと各イベントのファシリテーション焦点</div>
      </div>

      <h3>イベント別ファシリテーションの焦点</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>イベント</th><th>目的(アウトプット)</th><th>ファシリテーターの焦点</th><th>推奨されるテクニックの例</th></tr></thead>
          <tbody>
            <tr><td>Daily Scrum</td><td>Developersがスプリントゴールへの進捗を検査し、翌営業日の計画を作る</td><td>品質・確約(スプリントゴール)・障害への対処に焦点を当てた雰囲気をつくる。ステータス報告化を避ける。必要な時だけ観察し質問する。スプリントゴールへの集中を保つ</td><td>パワフルクエスチョン、ウォーキング・ザ・ボード</td></tr>
            <tr><td>Sprint Planning</td><td>スプリントを開始し、実施する作業を計画する(スプリントゴール+選択したPBI+計画)</td><td>明確な目的を持った協調的で透明性の高い環境をつくる。スプリントゴールへの集中を保つ</td><td>Roman Voting、ビジュアライゼーション、パワフルクエスチョン</td></tr>
            <tr><td>Sprint Review</td><td>インクリメントを検査し、必要であればプロダクトバックログを適応させる</td><td>参加型でエネルギッシュな環境をつくる。「反応する」より「聴く」ことを促す。スクラムチームとスポンサー・ステークホルダーの間に共感とシナジーを生む</td><td>プロダクトへの実際の操作体験、Bazaar形式</td></tr>
            <tr><td>Sprint Retrospective</td><td>直近のスプリントを振り返り、最も効果を高める改善点を特定して適応する</td><td>全員が安心して参加できる安全な雰囲気をつくる。言葉にされたこととされなかったことの両方に耳を傾ける。多様な視点に場を開く。合意形成と次のアクションの明確化を行う</td><td>Prime Directive、Perfection Game、Dot Voting、Affinity Mapping</td></tr>
            <tr><td>Sprint</td><td>すべてのイベントを包含するコンテナであり、他の4イベントを通じて継続的にファシリテーションが機能する</td><td>イベントの合間にも透明性と障害対応を促す文化を維持する</td><td>ワーキングアグリーメントの継続的な参照</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-scrum-events" target="_blank" rel="noopener">Facilitation Techniques for Scrum Events(総合ページ)</a></li>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-daily-scrum" target="_blank" rel="noopener">Facilitation Techniques for the Daily Scrum</a></li>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-sprint-planning" target="_blank" rel="noopener">Facilitation Techniques for Sprint Planning</a></li>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-sprint-review" target="_blank" rel="noopener">Facilitation Techniques for the Sprint Review</a></li>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-sprint-retrospective" target="_blank" rel="noopener">Facilitation Techniques for the Sprint Retrospective</a></li>
        </ul>
      </div>

      <h3>良いファシリテーションがない場合に起こる問題</h3>
      <ul>
        <li>イベントの目的そのものが見失われる</li>
        <li>人々が話しすぎるか、まったく話さなくなる</li>
        <li>常に同じ数人の声しか反映されず、他の意見が埋もれる</li>
        <li>タイムボックスを超過しても必要なアクションアイテムが生まれない</li>
        <li>協働し、望む成果に向けて前進する機会そのものを逃してしまう</li>
      </ul>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-scrum-events" target="_blank" rel="noopener">Facilitation Techniques for Scrum Events(総合ページ)</a></li>
        </ul>
      </div>

      <h3>スプリントレビューを「デモ」にしないためのベストプラクティス</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「デモ」「見せる場」という一方通行の場ではなく、学びと発見のための協働的な場として設計する</li>
          <li>ステークホルダーには事前にスプリントゴールを共有し、当日どのように貢献するかを考えてきてもらう</li>
          <li>台本通りに説明するのではなく、実際にステークホルダーにプロダクトを触ってもらい、その様子を観察する</li>
          <li>得られたフィードバックをプロダクトバックログの適応に確実につなげる</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-sprint-review" target="_blank" rel="noopener">Facilitation Techniques for the Sprint Review</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 8. Group Dynamics and Decision Making ===================== -->
    <section id="group-dynamics">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 08</div>
      <h2>グループダイナミクスと意思決定</h2>

      <h3>Tuckmanのチーム発達モデル</h3>
      <p>チームが成果を出せるようになるまでには段階があります。ファシリテーターは、チームが今どの段階にいるかを理解した上で、適切な支援のレベルを調整する必要があります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TUCKMAN_MODEL" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Tuckmanのチーム発達5段階モデル</div>
      </div>

      <ul>
        <li>Forming(形成期): 礼儀正しく振る舞い、互いを探り合う段階</li>
        <li>Storming(混乱期): 礼儀の壁が取れ、意見の衝突が起きやすい段階</li>
        <li>Norming(統一期): 協働のルールや役割分担が定着していく段階</li>
        <li>Performing(機能期): チームが自律的に高い成果を出せる段階</li>
        <li>Adjourning(解散期): チームの役目が終わり解散する段階</li>
      </ul>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Group_dynamics" target="_blank" rel="noopener">Group dynamics(Wikipedia) - Bruce Tuckmanの5段階モデルの一般的整理。当初は Forming / Storming / Norming / Performing の4段階として提唱され、Adjourning(解散期)は後年に追加された段階</a></li>
        </ul>
      </div>

      <h3>Sam Kanerの「参加型意思決定のダイヤモンド」とGroan Zone</h3>
      <p>複雑な問題についてグループで意思決定をする際、最初から一直線に結論に向かえることはほとんどありません。Sam Kaner氏は著書『Facilitator's Guide to Participatory Decision-Making』の中で、発散思考から収束思考に至る過程を「ダイヤモンド」の形で説明し、その中間に訪れる混乱の時期を「Groan Zone(うなり声ゾーン)」と名付けました。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_KANER_DIAMOND" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">Sam Kanerの参加型意思決定のダイヤモンドとGroan Zone</div>
      </div>

      <p>Groan Zoneは、チームが機能不全だから起きるのではなく、多様な視点を持つ人々が複雑な問題に向き合うときに<strong>自然に生じるもの</strong>です。ファシリテーターの役割は、このゾーンを避けることではなく、チームがそこを通り抜けられるよう支援することです。</p>

      <p>Groan Zoneを乗り越えるために大切な3つの姿勢:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>姿勢</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>Openness(開放性)</td><td>互いの視点・ニーズ・懸念を積極的に探索することにオープンであること。積極的に耳を傾けること。</td></tr>
            <tr><td>Courage(勇気)</td><td>自分のアイデアや提案を伝える勇気、正しいことをする勇気を持つこと。集団思考(グループシンク)を避けること。</td></tr>
            <tr><td>Commitment(コミットメント)</td><td>複雑な問題には混乱の期間がつきものだと理解し、共通理解を築き、協働して決定を作り上げるプロセスに向き合い続けること。</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/blog/rollercoaster-group-dynamics-decision-making" target="_blank" rel="noopener">The Rollercoaster of Group Dynamics in Decision Making</a></li>
        </ul>
      </div>

      <h3>弱いアウトカム vs 強いアウトカム</h3>
      <p>出題範囲の知識要件に明記されている「弱いアウトカムと強いアウトカムの違いを理解する」という項目は、PSFS試験特有の重要な観点です。</p>
      <ul>
        <li><strong>弱いアウトカム</strong>: 曖昧なまま終わり、参加者が本当には納得・確約していない結論。表面的には「決まった」ように見えても、後になって蒸し返されたり、実行に移されなかったりする</li>
        <li><strong>強いアウトカム</strong>: 参加者が実際に発言し、懸念が表に出され、Groan Zoneを経た上で導かれた、具体的で実行可能かつ全員が確約できる結論</li>
      </ul>
      <p>ファシリテーターは、タイムボックスの終わりが近づくと「とりあえず何かを決めてしまう」誘惑に駆られがちですが、それは弱いアウトカムを生みやすい典型的な落とし穴です。</p>

      <h3>意思決定ルールの一覧</h3>
      <p>チームがどのように決定を下すかについては、あらかじめ合意しておくことが重要です。以下は代表的な意思決定ルールとその特徴です。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>意思決定ルール</th><th>内容</th><th>メリット</th><th>デメリット</th></tr></thead>
          <tbody>
            <tr><td>多数決(Majority Vote)</td><td>過半数の賛成で決定する</td><td>比較的速く決定できる</td><td>少数派が結論を支持しない可能性がある</td></tr>
            <tr><td>全会一致(Unanimous Vote)</td><td>全員が賛成して初めて決定する</td><td>全員の確約が得られる</td><td>時間がかかる、決定に至らないことがある</td></tr>
            <tr><td>コンセント(Consent)</td><td>「決定に進むことに異議がない」状態で決定する</td><td>全会一致より速く、かつ広い受容を得られる</td><td>「懸念」と「異議」の区別に慣れが必要</td></tr>
            <tr><td>決定者が議論後に決定</td><td>責任者が意見を聞いた上で最終決定する</td><td>議論の材料を反映しつつ速く決められる</td><td>決定者への権限集中に対する不満が出ることがある</td></tr>
            <tr><td>決定者が議論なしで決定</td><td>責任者が単独で決定する</td><td>最も速い</td><td>チームの当事者意識が低下しやすい</td></tr>
            <tr><td>委任(Delegate)</td><td>特定の個人やサブグループに決定を委ねる</td><td>専門性を活かせる</td><td>委任先の判断への信頼が前提になる</td></tr>
            <tr><td>コイントス</td><td>ランダムに決定する</td><td>極めて速い、対立を回避できる</td><td>重要な決定には不向き</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/articles/facilitation-skill-scrum" target="_blank" rel="noopener">When, Why and How Facilitation Skills Help Scrum Teams(InfoQ, Patricia Kong)</a></li>
        </ul>
      </div>

      <h3>沈黙・対立・集団思考への向き合い方</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>沈黙は問題ではない。</strong>沈黙は、声の大きい人に埋もれがちな意見を持つ人が考えをまとめるための貴重な時間になり得る。無理に沈黙を埋めようとせず、意図的に「間」をつくる</li>
          <li><strong>対立を抑え込まない。</strong>「和を乱さないため」に対立を封じ込めると、緊張は解消されずに後で再燃する。対立は多様なアイデアを発見するための仕組みでもある</li>
          <li><strong>集団思考(Groupthink)に注意する。</strong>声の大きい人・権威のある人に合わせて「イエス」と言ってしまう、あるいは「みんなが決めたことでいい」と発言そのものを控えてしまう状態は、後になって「本当は納得していなかった」という不満につながる</li>
          <li><strong>静かにアイデアを書き出す時間をつくる。</strong>全員に付箋(物理でもデジタルでも)に個々にアイデアを書いてもらってから共有する方法は、声の大きさに関係なく全員の考えを可視化するのに有効</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/articles/facilitation-skill-scrum" target="_blank" rel="noopener">When, Why and How Facilitation Skills Help Scrum Teams(InfoQ, Patricia Kong)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 9. Facilitation Technique Toolkit ===================== -->
    <section id="facilitation-toolkit">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:tools" aria-hidden="true" />SECTION 09</div>
      <h2>ファシリテーション技法ツールキット</h2>

      <h3>発散のための技法</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th><th>使いどころ</th></tr></thead>
          <tbody>
            <tr><td>Silent Brainstorming(サイレントブレインストーミング)</td><td>参加者が個別に無言でアイデアを書き出す</td><td>声の大きい人の意見に引っ張られたくないとき</td></tr>
            <tr><td>1-2-4-All</td><td>個人→ペア→4人組→全体、と段階的に意見をまとめていくLiberating Structuresの手法</td><td>大人数でも短時間で全員の意見を集約したいとき</td></tr>
            <tr><td>Crazy 8s</td><td>短時間で複数のアイデアを次々に書き出す発想法</td><td>アイデアの量を増やしたいとき</td></tr>
            <tr><td>Affinity Mapping(親和図法)</td><td>出てきた意見を似た者同士でグルーピングする</td><td>レトロスペクティブで出た意見を整理するとき</td></tr>
          </tbody>
        </table>
      </div>

      <h3>収束・合意形成のための技法</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th><th>使いどころ</th><th>ベストプラクティス</th></tr></thead>
          <tbody>
            <tr><td>Fist of Five(フィストオブファイブ)</td><td>0〜5本の指で賛成度合いを同時に示す</td><td>1つの提案への賛同度を測りたいとき</td><td>事前に「何本以上で決定とするか」の合意基準を決めておく</td></tr>
            <tr><td>Roman Voting(ローマ投票)</td><td>親指を上/下で賛成・反対を示す</td><td>単純なYes/Noの決定をしたいとき</td><td>議論を尽くした後に行う。同調圧力を避けるため一斉に挙げる</td></tr>
            <tr><td>Dot Voting(ドット投票)</td><td>シールや付箋で各自が票を投じる</td><td>複数の選択肢から優先順位をつけたいとき</td><td>票が割れている場合は「合意が弱い」サインと捉え、追加の議論を検討する</td></tr>
            <tr><td>Thirty-Five(サーティファイブ)</td><td>カードを回して合計が35点になるまで加点していく手法</td><td>大人数でも不正なく素早く合意形成したいとき</td><td>ゲーム性を保ちながら真剣な議論に落とし込む</td></tr>
            <tr><td>White Elephant(ホワイトエレファント)</td><td>全員が平等に発言・関与しながら項目を順序づける手法</td><td>声の大きい人だけに偏らず全員の参加を確保したいとき</td><td>「アイデアを生む」ためではなく「既存の項目を並べ替える」ためのものと理解する</td></tr>
            <tr><td>Buy a Feature(バイ・ア・フィーチャー)</td><td>参加者に仮想通貨を配り、欲しい項目に投票する形で優先順位づけをするゲーム</td><td>ステークホルダーを巻き込んだ優先順位づけをしたいとき</td><td>一人では買えない価格設定にすることで、自然な交渉と合意形成を促す</td></tr>
            <tr><td>1-2-4-All(合意形成用途)</td><td>発散だけでなく最終的な合意形成の材料集めにも使える</td><td>チーム全体の合意にじわじわ近づけたいとき</td><td>最終ステップでDot Voting等と組み合わせて決定する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/blog/five-ways-build-consensus" target="_blank" rel="noopener">Five Ways to Build Consensus</a></li>
          <li><a href="https://www.scrum.org/resources/blog/trumpeting-all-voices-be-heard-white-elephant-facilitating-participation" target="_blank" rel="noopener">Trumpeting for all Voices to be Heard with White Elephant</a></li>
          <li><a href="https://www.scrum.org/resources/creating-team-working-agreement" target="_blank" rel="noopener">Creating a Team Working Agreement</a></li>
        </ul>
      </div>

      <h3>意思決定技法の選び方(フロー)</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DECISION_TECHNIQUE_SELECTOR" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">目的別に見る意思決定技法の選び方</div>
      </div>

      <h3>スプリントレトロスペクティブ特有の技法</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td>Prime Directive(プライムディレクティブ)</td><td>「誰もが、その時に知り得た情報とスキル、置かれていた状況の中で最善を尽くしたはずだ」という前提から振り返りを始めるという宣言。犯人探しではなく学びに焦点を当てるための土台となる</td></tr>
            <tr><td>Perfection Game(パーフェクションゲーム)</td><td>あるトピックに対して10点満点で評価し、「なぜその点数なのか」「10点にするには何が必要か」を尋ねることで、建設的な改善案を引き出す手法</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/facilitation-techniques-sprint-retrospective" target="_blank" rel="noopener">Facilitation Techniques for the Sprint Retrospective</a></li>
        </ul>
      </div>

      <h3>Liberating Structures について</h3>
      <p>Liberating Structures(リベレイティング・ストラクチャーズ)は、従来の「発表者中心の会議」やありがちな「フリーディスカッション」の限界を超え、あらゆる参加者の関与を引き出すために設計された、一連の軽量なファシリテーション構造の総称です。1-2-4-Allはその代表例の一つです。PSFSの出題範囲そのものに個々のLiberating Structuresの名称を暗記することは求められていませんが、Credlyのスキルタグにも挙げられている通り、PSFSが扱う「参加型ファシリテーション」という考え方の実践例として理解しておくとよいでしょう。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/blog/power-facilitation-liberating-structures-effective-collaboration" target="_blank" rel="noopener">The Power of Facilitation: Liberating Structures for Effective Collaboration</a></li>
          <li><a href="https://www.credly.com/org/scrum-org/badge/professional-scrum-facilitation-skills.1" target="_blank" rel="noopener">Credly バッジページ(Professional Scrum Facilitation Skills™)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Diverse Perspectives and Difficult Situations ===================== -->
    <section id="diverse-perspectives">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:messages" aria-hidden="true" />SECTION 10</div>
      <h2>多様な視点と難しい状況への対応</h2>

      <h3>内向的なメンバーと外向的なメンバーのバランス</h3>
      <p>グループには自然と、積極的に発言する人と、静かに考えることを好む人がいます。これは補完し合う関係になり得ますが、放っておくと声の大きい人の意見に他のメンバーが流されてしまう「集団思考」につながりやすくなります。</p>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>「静かな人から先に発言してもらう」というやり方は、善意であっても不自然でぎこちなくなりがちで、逆効果になることがある</li>
          <li>代わりに、オープンな問いを投げかけた上で、全員に付箋へ個別に書き出してもらう時間を設けると、発言順に関係なく全員の考えを可視化できる</li>
          <li>出てきた意見をチーム全体で確認する際に Fist of Five や Roman Voting を使うと、理解度や納得度を測りながら議論を深めることができる</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/articles/facilitation-skill-scrum" target="_blank" rel="noopener">When, Why and How Facilitation Skills Help Scrum Teams(InfoQ, Patricia Kong)</a></li>
        </ul>
      </div>

      <h3>対立が表面化したときの対応</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>緊張が高まっている場面で、対立を無視したり打ち切ったりするのは最悪の対応の一つ。適切に扱われれば、対立を乗り越えたチームはむしろ結束が強まる</li>
          <li>感情が高ぶっている場合は、一時的に休憩を挟み、場の温度を下げるという選択肢を持っておく</li>
          <li>ファシリテーションはその場のセッションだけで完結しない。過去のイベント(スプリントプランニングやデイリースクラムなど)で同じ問題がすでに芽生えていなかったかを振り返ることも、ファシリテーターの重要な視点</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/articles/facilitation-skill-scrum" target="_blank" rel="noopener">When, Why and How Facilitation Skills Help Scrum Teams(InfoQ, Patricia Kong)</a></li>
        </ul>
      </div>

      <h3>タイムボックスとアジェンダの扱い方</h3>
      <p>タイムボックスを厳守することは重要ですが、それ自体を目的化してしまうと本末転倒です。時間切れを理由に必要な決定がなされないまま会議を終えてしまうと、そのイベントの目的そのものが果たされなかったことになります。</p>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>スクラムイベントのタイムボックスは「上限」であり、超過は選択肢にならない。アジェンダを柔軟に扱うのは、あくまでこの上限の範囲内での調整として行う</li>
          <li>時間配分を変える場合も「なんとなく続ける」のではなく、チームと合意の上で調整する</li>
          <li>決定に至らなかった論点は、イベントを延長するのではなく、フォローアップの場と担当を明確にした上でイベント外に持ち越す</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/articles/facilitation-skill-scrum" target="_blank" rel="noopener">When, Why and How Facilitation Skills Help Scrum Teams(InfoQ, Patricia Kong)</a></li>
        </ul>
      </div>

      <h3>リモート・ハイブリッド環境でのファシリテーション</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>対面よりもリモート・ハイブリッドの方が、意図と目的を明確にすることの重要性が増す</li>
          <li>デジタルの付箋やドット投票ツールを使うと、匿名性を保ちながら全員の意見を集めやすくなる</li>
          <li>発言のタイミングを平等にするため、挙手機能やチャット機能などのツールを積極的に活用する</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.infoq.com/articles/facilitation-skill-scrum" target="_blank" rel="noopener">When, Why and How Facilitation Skills Help Scrum Teams(InfoQ, Patricia Kong)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 11. Exam Prep and Study Roadmap ===================== -->
    <section id="exam-prep-roadmap">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 11</div>
      <h2>試験対策・学習ロードマップ</h2>

      <h3>出題カテゴリの再確認</h3>
      <p>Scrum.org公式ガイダンスによれば、PSFSの問題は次の2つの大きなカテゴリに分類されます。</p>
      <ul>
        <li><strong>Facilitation Principles and Values</strong></li>
        <li><strong>Applying Facilitation Skills and Techniques</strong></li>
      </ul>
      <p>そしてこれらの問題は、スクラムの価値基準・スクラムチーム・イベント・作成物、そしてFacilitationのフォーカスエリアから導き出されます。「一般的なファシリテーション力を問う試験」ではなく「スクラムの文脈でのファシリテーション適用力を問う試験」であることを最後まで意識してください。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills" target="_blank" rel="noopener">試験対策ガイダンス(Prove your knowledge of Facilitation Skills)</a></li>
        </ul>
      </div>

      <h3>公式の推奨学習リソース</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>リソース</th><th>内容</th><th>URL</th></tr></thead>
          <tbody>
            <tr><td>Scrum Guide</td><td>Scrumの公式ボディ・オブ・ナレッジ。特にイベントのアウトカムに注目する</td><td><a href="https://www.scrum.org/resources/scrum-guide" target="_blank" rel="noopener">scrum.org/resources/scrum-guide</a></td></tr>
            <tr><td>Facilitation(Learning Series)</td><td>ファシリテーションの原則・スキル・技法の全体像を学べる公式コンテンツ</td><td><a href="https://www.scrum.org/resources/what-facilitation" target="_blank" rel="noopener">scrum.org/resources/what-facilitation</a></td></tr>
            <tr><td>Facilitation Principles</td><td>5原則の解説</td><td><a href="https://www.scrum.org/resources/facilitation-principles" target="_blank" rel="noopener">scrum.org/resources/facilitation-principles</a></td></tr>
            <tr><td>Skills and Traits of a Facilitator</td><td>ファシリテーターに必要な資質の解説</td><td><a href="https://www.scrum.org/resources/skills-and-traits-facilitator" target="_blank" rel="noopener">scrum.org/resources/skills-and-traits-facilitator</a></td></tr>
            <tr><td>Facilitation Techniques for Scrum Events</td><td>イベントごとのファシリテーション技法</td><td><a href="https://www.scrum.org/resources/facilitation-techniques-scrum-events" target="_blank" rel="noopener">scrum.org/resources/facilitation-techniques-scrum-events</a></td></tr>
            <tr><td>Facilitation Skills Open</td><td>無料の模擬アセスメント(母集団からランダムに10問出題)</td><td><a href="https://www.scrum.org/facilitation-skills-open" target="_blank" rel="noopener">scrum.org/facilitation-skills-open</a></td></tr>
            <tr><td>Professional Scrum Facilitation Skills 研修コース</td><td>認定トレーナーによる1日研修(受講は必須ではないが強く推奨)</td><td><a href="https://www.scrum.org/courses/professional-scrum-facilitation-skills-training" target="_blank" rel="noopener">scrum.org/courses/professional-scrum-facilitation-skills-training</a></td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills" target="_blank" rel="noopener">試験対策ガイダンス(Prove your knowledge of Facilitation Skills)</a></li>
        </ul>
      </div>

      <h3>学習ロードマップ</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EXAM_STUDY_ROADMAP" theme="base" />
          </ClientOnly>
        </div>
        <div class="diagram-caption">PSFS合格までの学習ロードマップ</div>
      </div>

      <h3>受験当日のベストプラクティス</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>制限時間は30分で20問。1問あたり平均1.5分というタイトな時間配分になるため、迷った問題は一旦フラグを立てて次に進む判断力が必要</li>
          <li>英語での出題だが、Google翻訳プラグインを使って母国語で読むことも可能。事前に翻訳表示に慣れておくとよい</li>
          <li>「一般的に正しそうなファシリテーション論」ではなく「Scrum Guideに沿った文脈で最も適切な選択肢」を選ぶことを常に意識する</li>
          <li>選択肢に複数の技法が並んでいる場合、「発散のための技法か」「収束・合意形成のための技法か」をまず見極めると正答率が上がりやすい</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification" target="_blank" rel="noopener">認定資格ページ</a></li>
          <li><a href="https://www.thescrummaster.co.uk/scrum/how-to-pass-the-professional-scrum-facilitation-skills-psfs-assessment-from-scrum-org/" target="_blank" rel="noopener">How to Pass the PSFS Assessment(The Scrum Master)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 12. Practice Questions ===================== -->
    <section id="practice-questions">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 12</div>
      <h2>練習問題(オリジナル10問)</h2>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>以下は本ガイドの内容の理解度を確認するための、著者オリジナルの練習問題です。Scrum.orgの本試験問題そのものではありません。</p>
      </div>

      <p><strong>Q1.</strong> ファシリテーションの5原則に含まれないものはどれか。</p>
      <p>A. Participatory　B. Healthy　C. Adaptation　D. Transparency　E. Purposeful</p>
      <details><summary>解答と解説</summary>
        <p>正解: C(Adaptationはスクラムの経験主義の柱の一つであり、ファシリテーションの5原則には含まれない。5原則はParticipatory / Healthy / Transparency / Process / Purposefulの5つ。)</p>
      </details>

      <p><strong>Q2.</strong> チームの効果性が高く、状況の複雑さも低い場面で、一般的に推奨されるファシリテーションのレベルはどれか。</p>
      <p>A. 強いファシリテーション　B. ファシリテーションなし　C. 中程度のファシリテーション　D. 常に強いファシリテーションが必要</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(Team EffectivenessとContextual Complexityの2軸モデルにおいて、両方が低リスクな組み合わせでは、明示的なファシリテーションはほとんど不要になる。)</p>
      </details>

      <p><strong>Q3.</strong> Sam Kanerの「参加型意思決定のダイヤモンド」における中間の混乱・摩擦の時期を何と呼ぶか。</p>
      <p>A. Storming Zone　B. Groan Zone　C. Norming Phase　D. Conflict Bridge</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(Groan Zoneは、発散から収束に至る過程で自然に生じる混乱の時期を指す。避けるべきものではなく、乗り越えるべきものとして扱う。)</p>
      </details>

      <p><strong>Q4.</strong> White Elephant技法の主な目的として最も適切なものはどれか。</p>
      <p>A. 新しいアイデアを大量に生み出すこと　B. 全員が平等に関与しながら既存の項目を順序づけること　C. プロダクトバックログから項目を削除すること　D. 単一の提案への賛否を問うこと</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(White Elephantはアイデア創出の技法ではなく、既にある項目を全員参加で並べ替えるための技法である。)</p>
      </details>

      <p><strong>Q5.</strong> デイリースクラムのファシリテーターの焦点として最も適切でないものはどれか。</p>
      <p>A. スプリントゴールへの集中を保つ　B. 各メンバーの進捗をステータス報告として発表させる　C. 品質と確約に焦点を当てた雰囲気をつくる　D. 必要な時だけ観察し質問する</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(Scrum.orgの公式ガイダンスでは、デイリースクラムがステータス報告会になることを避けるべきだと明記されている。)</p>
      </details>

      <p><strong>Q6.</strong> 「決定に進むことに異議がない」状態で意思決定を行うルールを何と呼ぶか。</p>
      <p>A. 全会一致　B. コンセント　C. 多数決　D. 委任</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(コンセントは全員の積極的な賛成までは求めないが、決定に対する重大な異議がないことを確認する意思決定ルールである。)</p>
      </details>

      <p><strong>Q7.</strong> ファシリテーターが「中立性」を保つとはどういうことか、最も適切な説明はどれか。</p>
      <p>A. 議論の内容について一切発言しないこと　B. プロセスの舵取りに専念し、議論の内容そのものに肩入れしないこと　C. 常に多数派の意見を支持すること　D. チームに代わって最終決定を下すこと</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(中立性とは、発言を完全に禁じることではなく、コンテンツではなくプロセスのオーナーであり続けることを意味する。内容に関与したい場合は役割の切り替えを明示すべきである。)</p>
      </details>

      <p><strong>Q8.</strong> 「弱いアウトカム」の特徴として最も適切なものはどれか。</p>
      <p>A. 参加者の懸念が十分に表に出され、確約された結論　B. 曖昧なまま終わり、参加者が本当には納得していない結論　C. Fist of Fiveで満場一致となった結論　D. タイムボックスより早く終わった結論</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(弱いアウトカムとは、表面的には決定したように見えても実際には確約が伴っていない結論を指す。タイムボックス終了間際の「とりあえずの決定」は弱いアウトカムに陥りやすい典型例。)</p>
      </details>

      <p><strong>Q9.</strong> スプリントレビューにおけるファシリテーターの焦点として最も適切なものはどれか。</p>
      <p>A. できるだけ多くの機能をデモすること　B. 参加型でエネルギッシュな環境をつくり、ステークホルダーとの共感とシナジーを築くこと　C. スケジュール通りに終わらせることだけに集中すること　D. 開発チーム内の対立を解消すること</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(Sprint Reviewは一方向のデモではなく、フィードバックを引き出す協働的な学びの場として設計されるべきである。)</p>
      </details>

      <p><strong>Q10.</strong> グループの中で声の大きい人に他のメンバーが同調してしまい、本音を言えなくなる現象を何と呼ぶか。</p>
      <p>A. Groan Zone　B. Groupthink(集団思考)　C. Forming　D. Consent</p>
      <details><summary>解答と解説</summary>
        <p>正解: B(Groupthinkは、和を乱さないために本心とは異なる同意をしてしまう状態を指す。ファシリテーターはこれを防ぐため、個別に意見を書き出す時間を設けるなどの工夫を行う。)</p>
      </details>
    </section>

    <!-- ===================== 13. Best Practice Cheatsheet ===================== -->
    <section id="best-practice-cheatsheet">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 13</div>
      <h2>ベストプラクティス チートシート</h2>

      <h3>イベント別チートシート</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>イベント</th><th>やるべきこと</th><th>避けるべきこと</th></tr></thead>
          <tbody>
            <tr><td>Daily Scrum</td><td>スプリントゴールへの集中を保つ、必要な時だけ質問する</td><td>ステータス報告会にする、毎回同じ3つの質問を機械的に繰り返す</td></tr>
            <tr><td>Sprint Planning</td><td>明確な目的を持った協調的な環境をつくる、パワフルクエスチョンを使う</td><td>プロダクトオーナーだけが一方的に指示する</td></tr>
            <tr><td>Sprint Review</td><td>ステークホルダーに実際にプロダクトを触ってもらう</td><td>台本通りの一方通行のデモに終始する</td></tr>
            <tr><td>Sprint Retrospective</td><td>安全な場をつくり、Prime Directiveから始める</td><td>犯人探しをする、タイムボックス超過を理由に合意形成を放棄する</td></tr>
          </tbody>
        </table>
      </div>

      <h3>汎用ベストプラクティス</h3>
      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>ファシリテーションを始める前に、自分の役割(ファシリテーターか参加者か)を明言する</li>
          <li>テクニックはコレクションを増やすことが目的ではなく、原則(Participatory / Healthy / Transparency / Process / Purposeful)に立ち返って選ぶ</li>
          <li>沈黙・対立を恐れず、むしろ多様な視点を引き出す機会として活用する</li>
          <li>タイムボックスは尊重しつつも、価値ある議論を時間だけを理由に打ち切らない</li>
          <li>「弱いアウトカム」で終わらせないために、Groan Zoneを避けずに通り抜ける</li>
          <li>チームの状態は固定ではないため、毎回「今回はどれだけのファシリテーションが必要か」を見極め直す</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 14. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 14</div>
      <h2>参考文献・出典</h2>

      <div class="ref-group">
        <h3>Scrum.org 公式リソース</h3>
        <ul class="ref-list">
          <li><span class="ref-name">認定資格ページ</span><a class="ref-url" href="https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification</a></li>
          <li><span class="ref-name">試験対策ガイダンス(Prove your knowledge of Facilitation Skills)</span><a class="ref-url" href="https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills" target="_blank" rel="noopener">https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills</a></li>
          <li><span class="ref-name">Facilitation Principles and Values(フォーカスエリア)</span><a class="ref-url" href="https://www.scrum.org/resources/facilitation-principles-and-values" target="_blank" rel="noopener">https://www.scrum.org/resources/facilitation-principles-and-values</a></li>
          <li><span class="ref-name">Applying Facilitation Skills and Techniques(フォーカスエリア)</span><a class="ref-url" href="https://www.scrum.org/resources/applying-facilitation-skills-and-techniques" target="_blank" rel="noopener">https://www.scrum.org/resources/applying-facilitation-skills-and-techniques</a></li>
          <li><span class="ref-name">What is Facilitation?</span><a class="ref-url" href="https://www.scrum.org/resources/what-facilitation" target="_blank" rel="noopener">https://www.scrum.org/resources/what-facilitation</a></li>
          <li><span class="ref-name">Facilitation Principles</span><a class="ref-url" href="https://www.scrum.org/resources/facilitation-principles" target="_blank" rel="noopener">https://www.scrum.org/resources/facilitation-principles</a></li>
          <li><span class="ref-name">Skills and Traits of a Facilitator</span><a class="ref-url" href="https://www.scrum.org/resources/skills-and-traits-facilitator" target="_blank" rel="noopener">https://www.scrum.org/resources/skills-and-traits-facilitator</a></li>
          <li><span class="ref-name">Facilitation Techniques for Scrum Events(総合ページ)</span><a class="ref-url" href="https://www.scrum.org/resources/facilitation-techniques-scrum-events" target="_blank" rel="noopener">https://www.scrum.org/resources/facilitation-techniques-scrum-events</a></li>
          <li><span class="ref-name">Facilitation Techniques for the Daily Scrum</span><a class="ref-url" href="https://www.scrum.org/resources/facilitation-techniques-daily-scrum" target="_blank" rel="noopener">https://www.scrum.org/resources/facilitation-techniques-daily-scrum</a></li>
          <li><span class="ref-name">Facilitation Techniques for Sprint Planning</span><a class="ref-url" href="https://www.scrum.org/resources/facilitation-techniques-sprint-planning" target="_blank" rel="noopener">https://www.scrum.org/resources/facilitation-techniques-sprint-planning</a></li>
          <li><span class="ref-name">Facilitation Techniques for the Sprint Review</span><a class="ref-url" href="https://www.scrum.org/resources/facilitation-techniques-sprint-review" target="_blank" rel="noopener">https://www.scrum.org/resources/facilitation-techniques-sprint-review</a></li>
          <li><span class="ref-name">Facilitation Techniques for the Sprint Retrospective</span><a class="ref-url" href="https://www.scrum.org/resources/facilitation-techniques-sprint-retrospective" target="_blank" rel="noopener">https://www.scrum.org/resources/facilitation-techniques-sprint-retrospective</a></li>
          <li><span class="ref-name">Five Ways to Build Consensus</span><a class="ref-url" href="https://www.scrum.org/resources/blog/five-ways-build-consensus" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/five-ways-build-consensus</a></li>
          <li><span class="ref-name">Trumpeting for all Voices to be Heard with White Elephant</span><a class="ref-url" href="https://www.scrum.org/resources/blog/trumpeting-all-voices-be-heard-white-elephant-facilitating-participation" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/trumpeting-all-voices-be-heard-white-elephant-facilitating-participation</a></li>
          <li><span class="ref-name">The Rollercoaster of Group Dynamics in Decision Making</span><a class="ref-url" href="https://www.scrum.org/resources/blog/rollercoaster-group-dynamics-decision-making" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/rollercoaster-group-dynamics-decision-making</a></li>
          <li><span class="ref-name">Scrum Values from a Facilitator's Perspective</span><a class="ref-url" href="https://www.scrum.org/resources/blog/scrum-values-facilitators-perspective" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/scrum-values-facilitators-perspective</a></li>
          <li><span class="ref-name">How Facilitation is Key to Effective Scrum Events</span><a class="ref-url" href="https://www.scrum.org/resources/blog/how-facilitation-key-effective-scrum-events" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/how-facilitation-key-effective-scrum-events</a></li>
          <li><span class="ref-name">A Facilitator as an (Event) Value Maximiser</span><a class="ref-url" href="https://www.scrum.org/resources/blog/facilitator-event-value-maximiser" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/facilitator-event-value-maximiser</a></li>
          <li><span class="ref-name">The Scrum Master as a Facilitator</span><a class="ref-url" href="https://www.scrum.org/resources/blog/scrum-master-facilitator" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/scrum-master-facilitator</a></li>
          <li><span class="ref-name">The Power of Facilitation: Liberating Structures for Effective Collaboration</span><a class="ref-url" href="https://www.scrum.org/resources/blog/power-facilitation-liberating-structures-effective-collaboration" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/power-facilitation-liberating-structures-effective-collaboration</a></li>
          <li><span class="ref-name">Uncovering the Essentials of Skilled Facilitation for Agile Teams</span><a class="ref-url" href="https://www.scrum.org/resources/blog/uncovering-essentials-skilled-facilitation-agile-teams" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/uncovering-essentials-skilled-facilitation-agile-teams</a></li>
          <li><span class="ref-name">Creating a Team Working Agreement</span><a class="ref-url" href="https://www.scrum.org/resources/creating-team-working-agreement" target="_blank" rel="noopener">https://www.scrum.org/resources/creating-team-working-agreement</a></li>
          <li><span class="ref-name">Facilitation Skills Open(無料模擬試験)</span><a class="ref-url" href="https://www.scrum.org/facilitation-skills-open" target="_blank" rel="noopener">https://www.scrum.org/facilitation-skills-open</a></li>
          <li><span class="ref-name">Professional Scrum Competency: Developing People and Teams</span><a class="ref-url" href="https://www.scrum.org/resources/professional-scrum-competency-developing-people-and-teams" target="_blank" rel="noopener">https://www.scrum.org/resources/professional-scrum-competency-developing-people-and-teams</a></li>
          <li><span class="ref-name">Professional Scrum Facilitation Skills 研修コース</span><a class="ref-url" href="https://www.scrum.org/courses/professional-scrum-facilitation-skills-training" target="_blank" rel="noopener">https://www.scrum.org/courses/professional-scrum-facilitation-skills-training</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>業界解説記事・書籍関連</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Patricia Kong, "When, Why and How Facilitation Skills Help Scrum Teams" (InfoQ)</span><a class="ref-url" href="https://www.infoq.com/articles/facilitation-skill-scrum/" target="_blank" rel="noopener">https://www.infoq.com/articles/facilitation-skill-scrum/</a></li>
          <li><span class="ref-name">Patricia Kong, "Facilitating Professional Scrum Teams: Improve Team Alignment, Effectiveness and Outcomes"(書籍、O'Reilly掲載の抜粋)</span><a class="ref-url" href="https://www.oreilly.com/library/view/facilitating-professional-scrum/9780138196202/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/facilitating-professional-scrum/9780138196202/</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>認定情報</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Credly バッジページ(Professional Scrum Facilitation Skills™)</span><a class="ref-url" href="https://www.credly.com/org/scrum-org/badge/professional-scrum-facilitation-skills.1" target="_blank" rel="noopener">https://www.credly.com/org/scrum-org/badge/professional-scrum-facilitation-skills.1</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>一般的な理論的背景(補足)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Group dynamics / Tuckman's stages(Wikipedia、Bruce Tuckmanの5段階モデルの一般的整理。当初は Forming / Storming / Norming / Performing の4段階として提唱され、Adjourning(解散期)は後年に追加された段階)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Group_dynamics" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Group_dynamics</a></li>
          <li><span class="ref-name">Sam Kaner, "Facilitator's Guide to Participatory Decision-Making"(Groan Zoneの提唱元となった書籍。Scrum.orgのブログ記事内でも参照されている)</span></li>
        </ul>
      </div>

      <p><em>本ガイドはScrum.orgの公開情報および関連する業界解説記事を基に、学習目的で独自にまとめたものです。試験問題そのものを再現したものではありません。最新の出題範囲・受験要項は必ず公式ページでご確認ください。</em></p>
    </section>

    <footer>
      Professional Scrum™、Professional Scrum Facilitation Skills™、PSFS™ は Scrum.org の商標です。本ガイドはScrum.orgとは独立した非公式の学習支援資料であり、学習目的で独自にまとめたものです。最新情報は<a href="https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification" target="_blank" rel="noopener">Scrum.org公式サイト</a>をご確認ください。
    </footer>

  
      <footer>
        Professional Scrum™、Professional Scrum Facilitation Skills™、PSFS™ は Scrum.org の商標です。本ガイドはScrum.orgとは独立した非公式の学習支援資料であり、学習目的で独自にまとめたものです。最新情報は<a href="https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification" target="_blank" rel="noopener">Scrum.org公式サイト</a>をご確認ください。
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* ===================== Layout ===================== */
.layout {
  display: block;
}

/* ===================== Sidebar ===================== */
.sidebar {
  position: fixed;
  top: var(--global-nav-height);
  left: 0;
  width: var(--sidebar-width, 288px);
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
  font-size: 14px;
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

.sidebar-overlay {
  display: none;
}

/* ===================== Main content ===================== */
.main-content {
  margin-left: var(--sidebar-width, 288px);
  padding: 56px 72px 120px;
}

.hero {
  margin-bottom: 56px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
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
  font-size: 38px;
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
  font-size: 14px;
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
  font-size: 15px;
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
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink-faint);
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 16px;
}

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 20px;
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

p {
  margin: 0 0 18px;
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

em {
  color: var(--color-ink-soft);
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
  font-size: 15px;
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
  font-size: 15px;
  color: var(--color-indigo);
  margin-bottom: 10px;
}

.callout-title :deep(.iconify),
.callout-title :deep(svg) {
  font-size: 18px;
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
  font-size: 15px;
  word-break: break-all;
}

.callout.note {
  border-left-color: var(--color-plum);
}

.callout.note .callout-title {
  color: var(--color-plum);
}

/* ===================== Details / Practice Quiz ===================== */
details {
  background: var(--color-paper-sunken);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px 0 24px;
}

details[open] {
  background: var(--color-paper-raised);
}

summary {
  font-weight: 600;
  color: var(--color-indigo);
  cursor: pointer;
  outline: none;
}

details p {
  margin: 12px 0 0;
  font-size: 15px;
  color: var(--color-ink-soft);
}

/* ===================== Diagram containers ===================== */
.diagram-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 12px;
  padding: 28px;
  margin: 28px 0;
}

.diagram-card .diagram-caption {
  font-size: 14px;
  color: var(--color-ink-faint);
  margin-top: 14px;
  text-align: center;
}

.mermaid-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 60px;
}

/* ===================== Reference list ===================== */
.ref-group {
  margin-bottom: 28px;
}

.ref-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ref-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 15px;
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
  font-size: 14px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar-toggle {
    display: flex;
  }

  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    bottom: 0;
    height: calc(100vh - var(--global-nav-height));
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.25s ease, visibility 0s linear 0.25s;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }

  .sidebar.open {
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.25s ease, visibility 0s;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
  }

  .main-content {
    margin-left: 0;
    padding: 32px 24px 80px;
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
