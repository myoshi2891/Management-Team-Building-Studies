<script setup lang="ts">
import { useSeoMeta } from "#imports";

const DIAGRAM_STUDY_ROADMAP = `flowchart TB
A["Scrum Guideを熟読する 用語・役割・イベント・作成物"] --> B["PSM I / PSM II相当の理解を確立する"]
B --> C["Nexus Guide 2021年版 を複数回通読する"]
C --> D["Nexus Open Assessment 無料 を満点近くまで繰り返す"]
D --> E["Cross-Team Refinement等の公式ブログ ホワイトペーパーで実務パターンを学ぶ"]
E --> F["本ガイドのケーススタディ演習で理解度を検証する"]
F --> G["SPS本試験を受験する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F,G box;`;

const DIAGRAM_SCALE_DECISION_FLOW = `flowchart TD
Start["デリバリーの停滞・スループット不足を感じている"] --> Q1{"単一チームのプロセス改善で解決できるか?"}
Q1 -->|"できる"| Fix["まずチーム内の課題を解決する スケールしない"]
Q1 -->|"できない"| Q2{"本当に同一プロダクトの同一Product Backlogを複数チームで扱う必要があるか?"}
Q2 -->|"いいえ"| Split["プロダクトの分割や別チーム編成を検討する"]
Q2 -->|"はい"| Q3{"チーム数はおおよそ3〜9チームか?"}
Q3 -->|"はい"| ApplyNexus["Nexusフレームワークの適用を検討する"]
Q3 -->|"いいえ 多すぎる"| Multi["Nexus+など複数Nexusの組み合わせを検討する"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Q1,Q2,Q3 hub;
class Start,Fix,Split,Multi box;
class ApplyNexus done;`;

const DIAGRAM_NEXUS_EXTENSION_OVERVIEW = `flowchart LR
subgraph Scrum["標準の Scrum 単一チーム"]
S1["Developers / Product Owner / Scrum Master"]
S2["Sprint Planning / Daily Scrum / Sprint Review / Sprint Retrospective"]
S3["Product Backlog / Sprint Backlog / Increment"]
end

subgraph NexusExt["Nexus による最小限の拡張"]
N1["Nexus Integration Team"]
N2["Cross-Team Refinement / Nexus Sprint Planning / Nexus Daily Scrum / Nexus Sprint Review / Nexus Sprint Retrospective"]
N3["Nexus Sprint Backlog / Integrated Increment"]
end

S1 -.->|"拡張"| N1
S2 -.->|"拡張"| N2
S3 -.->|"拡張"| N3

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class S1,S2,S3 box;
class N1,N2,N3 hub;`;

const DIAGRAM_NEXUS_INTEGRATION_TEAM_COMPOSITION = `flowchart TB
subgraph NIT["Nexus Integration Team"]
PO["Product Owner 単一のProduct Backlogに対して唯一"]
SM["Scrum Master Nexusフレームワークの理解と実践に責任"]
MEM["Nexus Integration Team Members 各Scrum Teamから必要なスキルを持つ人材"]
end

NIT --> Goal["少なくともSprintごとにDoneなIntegrated Incrementを実現する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PO,SM,MEM box;
class Goal done;`;

const DIAGRAM_NEXUS_SPRINT_FLOW = `flowchart LR
A["Cross-Team Refinement 継続的"] --> B["Nexus Sprint Planning"]
B --> C["各チームの Sprint Planning"]
C --> D["Sprint 実行 Nexus Daily Scrum + 各チームDaily Scrum"]
D --> E["Nexus Sprint Review"]
E --> F["Nexus Sprint Retrospective"]
F -.->|"次のSprintへ"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,D,E,F box;`;

const DIAGRAM_CROSS_TEAM_REFINEMENT_BOARD = `flowchart TB
subgraph Board["Cross-Team Refinement Board のイメージ"]
direction LR
S1["対象Sprint N"] --- S2["Sprint N+1"] --- S3["Sprint N+2 目安上限"]
end
Item1["PBI: 大きな要求"] --> Decompose["チーム横断で分解"]
Decompose --> Dep["依存関係を色分けして可視化"]
Dep --> Ready["各チームが引き取れるサイズまで分解されたPBI"]
Ready --> Board

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Item1,Decompose,Ready box;
class Dep hub;`;

const DIAGRAM_NEXUS_ARTIFACTS_COMMITMENTS = `flowchart LR
subgraph PB["Product Backlog"]
PBC["コミットメント: Product Goal"]
end
subgraph NSB["Nexus Sprint Backlog"]
NSBC["コミットメント: Nexus Sprint Goal"]
end
subgraph II["Integrated Increment"]
IIC["コミットメント: Definition of Done"]
end

PB --> NSB --> II

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PB,NSB,II box;
class PBC,NSBC,IIC done;`;

const DIAGRAM_DEPENDENCY_LIFECYCLE = `flowchart LR
A["依存関係が潜在的に発生"] --> B["Cross-Team Refinement / Nexus Daily Scrumで発見"]
B --> C["Cross-Team Refinement Board で可視化・色分け"]
C --> D{"事前に解消できるか?"}
D -->|"できる"| E["Product Backlog の並び替え 再分解で解消"]
D -->|"できない"| F["Nexus Sprint Backlog上でSprint中に管理"]
F --> G["Nexus Daily Scrumで日次フォロー"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,C,E,F,G box;
class D hub;`;

const DIAGRAM_NEXUS_FRAMEWORK_SUMMARY_MAP = `flowchart TB
subgraph Accountabilities["Accountabilities"]
NIT["Nexus Integration Team PO + Scrum Master + Members"]
end

subgraph Events["Events"]
E1["The Sprint"]
E2["Cross-Team Refinement"]
E3["Nexus Sprint Planning"]
E4["Nexus Daily Scrum"]
E5["Nexus Sprint Review"]
E6["Nexus Sprint Retrospective"]
end

subgraph Artifacts["Artifacts & Commitments"]
A1["Product Backlog to Product Goal"]
A2["Nexus Sprint Backlog to Nexus Sprint Goal"]
A3["Integrated Increment to Definition of Done"]
end

NIT --> E1
NIT --> A3
E2 --> A1
E3 --> A2
E1 --> A3
E4 --> A2
E5 --> A3
E6 --> NIT

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class NIT hub;
class E1,E2,E3,E4,E5,E6 box;
class A1,A2,A3 done;`;


const TOC_IDS = [
  "how-to-use-this-guide",
  "what-is-sps",
  "why-scale",
  "nexus-framework-overview",
  "nexus-integration-team",
  "nexus-events",
  "nexus-artifacts",
  "dependency-management-best-practices",
  "framework-comparison",
  "anti-patterns",
  "exam-prep-case-studies",
  "framework-summary-map",
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
  title: "Scaled Professional Scrum(SPS)認定 完全ガイド | Nexusフレームワークで学ぶスケールドスクラム",
  description:
    "Scrum.org Scaled Professional Scrum(SPS)認定試験対策として、Nexusフレームワークの責任・イベント・作成物を初学者にも分かりやすく解説し、実務のベストプラクティスと一次情報源を整理した完全ガイド。",
});
</script>

<template>
  <div class="layout">
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
    <div class="sidebar-brand">
      <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
        <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
        <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brand-text">
        <div class="brand-title">SPS 完全ガイド</div>
        <div class="brand-subtitle">Scaled Professional Scrum</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li class="nav-group-label">はじめに</li>
      <li><a href="#how-to-use-this-guide" :class="{ active: activeId === 'how-to-use-this-guide' }" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />このガイドの読み方</a></li>
      <li><a href="#what-is-sps" :class="{ active: activeId === 'what-is-sps' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />SPS認定とは</a></li>
      <li class="nav-group-label">スケーリングの基礎</li>
      <li><a href="#why-scale" :class="{ active: activeId === 'why-scale' }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />なぜスケールするのか</a></li>
      <li><a href="#nexus-framework-overview" :class="{ active: activeId === 'nexus-framework-overview' }" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />Nexusフレームワーク全体像</a></li>
      <li class="nav-group-label">Nexusの詳細</li>
      <li><a href="#nexus-integration-team" :class="{ active: activeId === 'nexus-integration-team' }" @click="closeSidebar"><Icon name="tabler:users-group" aria-hidden="true" />Nexus Integration Team</a></li>
      <li><a href="#nexus-events" :class="{ active: activeId === 'nexus-events' }" @click="closeSidebar"><Icon name="tabler:calendar-event" aria-hidden="true" />Nexusのイベント</a></li>
      <li><a href="#nexus-artifacts" :class="{ active: activeId === 'nexus-artifacts' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" aria-hidden="true" />Nexusの作成物</a></li>
      <li class="nav-group-label">実務とベストプラクティス</li>
      <li><a href="#dependency-management-best-practices" :class="{ active: activeId === 'dependency-management-best-practices' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />依存関係マネジメント</a></li>
      <li><a href="#framework-comparison" :class="{ active: activeId === 'framework-comparison' }" @click="closeSidebar"><Icon name="tabler:scale" aria-hidden="true" />他フレームワークとの比較</a></li>
      <li><a href="#anti-patterns" :class="{ active: activeId === 'anti-patterns' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />アンチパターン</a></li>
      <li class="nav-group-label">試験対策</li>
      <li><a href="#exam-prep-case-studies" :class="{ active: activeId === 'exam-prep-case-studies' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />試験対策・演習問題</a></li>
      <li><a href="#framework-summary-map" :class="{ active: activeId === 'framework-summary-map' }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />全体マップ</a></li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献</a></li>
    </ul>
  </nav>

    <main class="main-content">
      

    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org 公式アセスメント準拠</div>
      <h1>Scaled Professional Scrum(SPS)認定 完全学習ガイド</h1>
      <p class="hero-lede">
        初学者にも分かるようにゼロから解説します。本ガイドは Scrum.org 公式の Nexus Guide、公式アセスメントページ、および公式ブログ・ホワイトペーパーの内容を基に、独自の言葉で体系化したものです。引用は最小限にとどめ、一次情報源への参照 URL を各章末に明記しています。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">85%以上</div><div class="stat-label">合格ライン</div></div>
        <div class="stat-card"><div class="stat-number">40問</div><div class="stat-label">出題数(60分)</div></div>
        <div class="stat-card"><div class="stat-number">3〜9チーム</div><div class="stat-label">Nexus適用規模の目安</div></div>
        <div class="stat-card"><div class="stat-number">2021年1月版</div><div class="stat-label">コア教材:The Nexus Guide</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは学習支援を目的とした非公式の二次的解説資料であり、Scrum.org による公式教材・公式見解を代替するものではありません。試験直前には必ず最新版の<a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">Nexus Guide</a>と<a href="https://www.scrum.org/assessments/scaled-professional-scrum-certification" target="_blank" rel="noopener">公式アセスメントページ</a>をご確認ください。</span>
      </div>
    </div>

        <!-- ===================== 0. How to use this guide ===================== -->
    <section id="how-to-use-this-guide">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 00</div>
      <h2>このガイドの読み方</h2>

      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>対象試験</td><td>Scaled Professional Scrum™(SPS)Certification(Scrum.org)</td></tr>
            <tr><td>前提知識</td><td>受験資格の要件はありません。ただし Scrum Guide の内容の熟知と Scrum の実務経験が準備として推奨され、「Scrum を知らない人」には勧められない上級試験です</td></tr>
            <tr><td>出題形式</td><td>選択式・複数選択・True/False 混在、40問、60分</td></tr>
            <tr><td>合格ライン</td><td>85%以上(Scrum.org の中でも最も高い合格基準の一つ)</td></tr>
            <tr><td>コア教材</td><td>The Nexus™ Guide(2021年1月版)</td></tr>
            <tr><td>本ガイドの構成</td><td>第1部:試験の全体像 → 第2部:Nexus フレームワークの詳細 → 第3部:実務ベストプラクティス → 第4部:試験対策・演習</td></tr>
          </tbody>
        </table>
      </div>

      <p>本ガイドでは英語の専門用語(Nexus, Sprint, Product Backlog, Sprint Goal, Definition of Done など)はそのまま英語表記を維持し、説明部分は日本語で行います。これは Scrum.org の公式ガイド自体が用語を厳密に定義しているため、翻訳による意味のズレを避けるためです。</p>
    </section>

    <!-- ===================== 1. What is SPS ===================== -->
    <section id="what-is-sps">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
      <h2>Scaled Professional Scrum™ 認定とは何か</h2>

      <h3>1.1 資格の位置づけ</h3>
      <p>SPS 認定は、<strong>Nexus フレームワーク</strong>(Nexus Guide に定義される)を用いて、複数の Scrum Team が単一の Product Backlog から作業し、単一の Integrated Increment を構築する方法についての知識を検証する資格です。Scrum.org 独自の「Professional Scrum Competencies(プロフェッショナル・スクラム・コンピテンシー)」モデルにおいて、「Understanding and Applying the Scrum Framework(スクラムフレームワークの理解と適用)」というコンピテンシーの中に <strong>Scaling(スケーリング)</strong> というフォーカスエリアが存在し、SPS はこのフォーカスエリアを深く掘り下げる資格として位置づけられています。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>Scrum.org の資格は「講座に出席したこと」ではなく「試験に合格したこと」で認定される点が Scrum Alliance 系資格(CSM/CSPO など)と大きく異なります。SPS も同様で、Scaled Professional Scrum with Nexus コースへの参加は必須ではありませんが、強く推奨されています。</p>
      </div>

      <h3>1.2 試験の構造(コミュニティ情報を含む)</h3>
      <p>Scrum.org は個々の設問内容を公開していませんが、SPS を受験・分析したコミュニティの情報を総合すると、出題は大きく2つのカテゴリーに分類できます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>カテゴリー</th><th>内容</th><th>目安割合(非公式)</th></tr></thead>
          <tbody>
            <tr><td>Nexus フレームワークの知識</td><td>Nexus Guide に定義された用語・役割・イベント・作成物に関する事実確認的な設問(PSM Ⅰ における Scrum の設問に相当)</td><td>約80%(残余からの算出値)</td></tr>
            <tr><td>ケーススタディ型設問</td><td>スケールされた Scrum 環境(主に Nexus 環境)の状況が提示され、問題を特定する、または最良のアプローチを選択する設問</td><td>約20%</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:alert-triangle" aria-hidden="true" />この割合は Scrum.org の公式発表ではありません(非公式の目安)</div>
        <p>ケーススタディ型の「約20%」は受験者コミュニティサイト <a href="https://scrum-exams.info/sps/" target="_blank" rel="noopener">Scrum-Exams.info の SPS ページ</a> の記載("Approximately 20% of the SPS exam consists of case studies")に基づくものです。「Nexus フレームワークの知識 約80%」はどこにも公表されておらず、上記20%の<strong>残余として本ガイドが算出した値</strong>です。Scrum.org は <a href="https://www.scrum.org/assessments/scaled-professional-scrum-certification" target="_blank" rel="noopener">公式アセスメントページ</a> でカテゴリー別の出題比率を公表していません。学習配分の参考にとどめ、受験判断の根拠にはしないでください。(確認日: 2026-09-08)</p>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>ケーススタディ型の設問では「唯一の正解」が存在するように見えても、Nexus Guide の原則(経験主義・自己管理・透明性の最大化)に最も忠実な選択肢を選ぶことが鍵になります。表面的なテクニックの暗記よりも、「なぜその Event/Artifact が存在するのか」という目的(purpose)を理解することが得点に直結します。</p>
      </div>

      <h3>1.3 受験対象者</h3>
      <p>Scrum.org は SPS を以下のような、<strong>すでに Scrum の実務経験が豊富な人材</strong>に推奨しています。</p>
      <ul>
        <li>自組織を単一 Scrum Team から複数チーム体制へスケールさせようとしている経験豊富な Scrum Master</li>
        <li>Nexus を使う組織に参加する、またはこれから使う Developers / Product Owner</li>
        <li>Scrum の経験を持つアジャイルコーチ</li>
        <li>複数チームが協働する際の困難を理解したい開発マネージャー</li>
      </ul>
      <p>逆に、Scrum の経験や知識が乏しい人には推奨されていません。</p>

      <h3>1.4 学習ロードマップ(推奨順序)</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_STUDY_ROADMAP" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">SPS 合格までの推奨学習ステップ</div>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/assessments/scaled-professional-scrum-certification" target="_blank" rel="noopener">Scaled Professional Scrum™ Certification(公式アセスメントページ)</a></li>
          <li><a href="https://scrum-exams.info/sps/" target="_blank" rel="noopener">Scaled Professional Scrum(SPS)攻略ガイド:Scrum-Exams.info</a></li>
          <li><a href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">The Professional Scrum Competencies</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 2. Why scale ===================== -->
    <section id="why-scale">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 02</div>
      <h2>大前提:なぜ「スケール」する必要があるのか</h2>
      <p>SPS の学習で最初に押さえるべきなのは、Nexus の仕組みそのものよりも先に「<strong>そもそもスケールすべきかどうか</strong>」という問いです。Scrum.org のトレーニング目標にも明記されている通り、SPS コースの学習目標の一つは「自組織にとって最適な規模を見極め、必要であれば "de-scale"(縮小)する方法を理解すること」です。</p>

      <h3>2.1 スケールの根本原則</h3>
      <p>Nexus Guide は、価値提供の量を増やすために「人を増やす」ことが必ずしも正しい解決策ではないと明言しています。人と製品規模が増えるほど、複雑性・依存関係・協調コスト・コミュニケーション経路の数が増加します。むしろ人数を減らす「縮小(scaling down)」が、より多くの価値を届けるための重要な実践になり得ます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCALE_DECISION_FLOW" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">スケールすべきかどうかの判断フロー</div>
      </div>

      <h3>2.2 依存関係が生まれる2つの根本原因</h3>
      <p>Nexus Guide によれば、チーム間の依存関係は主に次の2種類のミスマッチから生じます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>ミスマッチの種類</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td><strong>プロダクト構造(Product structure)</strong></td><td>プロダクト内の関心事がどれだけ独立して分離されているかによって、統合されたプロダクトリリースを作る際の複雑さが大きく変わる</td></tr>
            <tr><td><strong>コミュニケーション構造(Communication structure)</strong></td><td>チーム内・チーム間の人々のコミュニケーションの取り方が作業の進め方に影響し、伝達やフィードバックの遅延は作業の流れを阻害する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>プロダクトのアーキテクチャ(コンポーネント境界)とチーム境界が一致していない場合、依存関係は構造的に発生し続けます。可能な限り「フィーチャーチーム」(エンドツーエンドで価値を届けられるチーム)を志向し、コンポーネントチーム(特定のレイヤーやモジュールにのみ責任を持つチーム)への過度な依存を避けることが推奨されます。</li>
          <li>コミュニケーション構造の改善は、物理的な席配置よりも「誰が・いつ・何を・誰と話すべきか」を明確にする Nexus のイベント設計(Cross-Team Refinement や Nexus Daily Scrum)によって支えられます。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://scrumorg-website-prod.s3.amazonaws.com/drupal/2021-01/NexusGuide%202021_0.pdf" target="_blank" rel="noopener">The Nexus™ Guide(2021年1月版)PDF</a></li>
          <li><a href="https://www.scrum.org/resources/scaling-scrum" target="_blank" rel="noopener">Scaling Scrum with Nexus(公式)</a></li>
          <li><a href="https://www.scrum.org/resources/blog/scaling-scrum-nexus-and-scrum-studio" target="_blank" rel="noopener">Scaling Scrum with Nexus and Scrum Studio(公式ブログ)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 3. Nexus framework overview ===================== -->
    <section id="nexus-framework-overview">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 03</div>
      <h2>Nexus フレームワーク全体像</h2>

      <h3>3.1 定義</h3>
      <p>Nexus は、<strong>約3〜9個の Scrum Team</strong> が協働して単一のプロダクトを届けるためのフレームワークです。Nexus はただ1人の Product Owner がただ1つの Product Backlog を管理し、すべての Scrum Team がそこから作業を引き出します。Nexus フレームワークは、Nexus 内のチームの作業を結びつける「責任(Accountabilities)」「イベント(Events)」「作成物(Artifacts)」を定義します。</p>
      <p>Nexus は Scrum の基盤の上に構築されており、Scrum を使ったことがある人にとってはその構成要素が馴染み深いものになっています。Nexus は、複数のチームが単一の Product Backlog から作業して単一の Integrated Increment を目標に向けて構築できるようにするために、<strong>絶対に必要な箇所だけ最小限に Scrum を拡張</strong>します。</p>

      <h3>3.2 Nexus の理論(Nexus Theory)</h3>
      <p>Nexus の核心は、Scrum の基盤にあるボトムアップの知性と経験主義を維持・強化しながら、単独チームでは実現できない価値を Scrum Team のグループが届けられるようにすることです。Nexus のゴールは、単一プロダクトに取り組む Scrum Team のグループが届けられる価値をスケールさせることであり、そのために各チームが遭遇する複雑さを軽減します。</p>

      <h3>3.3 Nexus がScrumに追加する3要素</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_NEXUS_EXTENSION_OVERVIEW" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">Nexus が標準の Scrum に加える最小限の拡張</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>拡張要素</th><th>内容の要約</th></tr></thead>
          <tbody>
            <tr><td><strong>Accountabilities(責任)</strong></td><td>Nexus Integration Team が新設され、Nexus が少なくとも Sprint ごとに価値ある使用可能な Integrated Increment を届けることに責任を持つ</td></tr>
            <tr><td><strong>Events(イベント)</strong></td><td>通常の Scrum イベントに追加・付随、または一部を置き換える形でイベントが拡張される。Nexus 全体と個々のチームの両方に資する</td></tr>
            <tr><td><strong>Artifacts(作成物)</strong></td><td>すべての Scrum Team が単一の Product Backlog を使用する。Nexus Sprint Backlog が透明性確保のために存在し、Integrated Increment は Nexus が完成させた統合済み作業の総和を表す</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">Online Nexus Guide(公式)</a></li>
          <li><a href="https://www.scrum.org/resources/blog/overview-nexus-framework-scaling-scrum" target="_blank" rel="noopener">Overview of the Nexus Framework for scaling Scrum(公式ブログ)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 4. Nexus Integration Team ===================== -->
    <section id="nexus-integration-team">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 04</div>
      <h2>Nexus の責任(Accountabilities):Nexus Integration Team</h2>

      <h3>4.1 目的と構成</h3>
      <p><strong>Nexus Integration Team</strong> は、Nexus によって完成された作業の合計である Integrated Increment が、少なくとも Sprint ごとに「Done」の状態で生み出されることに責任を持ちます。複数の Scrum Team が協力して価値ある使用可能な Increment を作るという、Scrum で規定された説明責任を実現可能にする「焦点(フォーカス)」を提供する存在です。</p>
      <p>Nexus Integration Team は次のメンバーで構成されます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_NEXUS_INTEGRATION_TEAM_COMPOSITION" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">Nexus Integration Team の構成と目的</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>役割</th><th>責任の要約</th></tr></thead>
          <tbody>
            <tr><td><strong>Product Owner</strong></td><td>単一の Product Backlog に対する唯一の責任者。Nexus 内 Scrum Team によって統合・実行された作業とプロダクトの価値を最大化する責任を持つ</td></tr>
            <tr><td><strong>Scrum Master(NIT所属)</strong></td><td>Nexus フレームワークが Nexus Guide に記述された通りに理解・実践されることに責任を持つ。同時に Nexus 内の1つ以上の Scrum Team の Scrum Master を兼務することもある</td></tr>
            <tr><td><strong>Nexus Integration Team Members</strong></td><td>各 Scrum Team が Definition of Done を満たす価値ある使用可能な Integrated Increment を届けられるよう、ツールや実践の導入・習得を支援する。コーチング、コンサルティング、依存関係やチーム横断課題への意識喚起が主な活動</td></tr>
          </tbody>
        </table>
      </div>

      <h3>4.2 重要な運用ルール</h3>
      <ul>
        <li>Nexus Integration Team のメンバー構成は、Nexus のその時点でのニーズを反映して<strong>時間とともに変化</strong>してよい(固定チームである必要はない)。</li>
        <li><strong>Nexus Integration Team への所属責任は、個々の Scrum Team メンバーとしての責任より優先される</strong>。ただし NIT としての責任が果たされている限り、各自の Scrum Team メンバーとしても作業を続けられる。この優先順位づけにより、複数チームに影響する課題の解決が最優先されるようになる。</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Nexus Integration Team を「別のチーム(第10のチーム)」として固定化しないこと。実務コミュニティでは "The NIT is simply a subset of us"(NIT は自分たちの一部にすぎない)という考え方が推奨されており、NIT を現場から切り離された「司令塔」にしないことが重要です。</li>
          <li>NIT メンバーは日々のチーム活動の中で潜在的な依存関係に目を光らせ、新しい依存関係を発見したら Cross-Team Refinement の場で速やかに透明化するよう促す役割を担います(詳細は5.2節)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://scrumorg-website-prod.s3.amazonaws.com/drupal/2021-01/NexusGuide%202021_0.pdf" target="_blank" rel="noopener">The Nexus™ Guide(2021年1月版)PDF</a></li>
          <li><a href="https://www.scrum.org/resources/blog/nexus-nutshell" target="_blank" rel="noopener">Nexus In A Nutshell(公式ブログ)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 5. Nexus events ===================== -->
    <section id="nexus-events">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:calendar-event" aria-hidden="true" />SECTION 05</div>
      <h2>Nexus のイベント(Events)詳細解説</h2>
      <p>Nexus はイベントを Scrum に「追加」「前後に配置」、または「一部を置き換える」形で拡張します。Nexus イベントのタイムボックスの長さは、対応する Scrum Guide のイベントの長さに準じ、それに<strong>加えて</strong>設定されます(=対応する Scrum イベントの代わりに短縮するものではありません)。</p>
      <p>規模が大きくなると、Nexus の全メンバーが情報共有や合意形成に参加するのは現実的でない場合があります。したがって、明記されている場合を除き、Nexus イベントにはその目的を最も効果的に達成するために必要なメンバーのみが参加します。</p>

      <h3>5.1 Sprint 全体の流れ</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_NEXUS_SPRINT_FLOW" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">Nexus Sprint のイベントの流れ</div>
      </div>

      <h3>5.2 Cross-Team Refinement(チーム横断リファインメント)</h3>
      <p><strong>目的:</strong> Product Backlog のチーム横断リファインメントは、Nexus 内のチーム間依存関係を削減または排除します。Product Backlog は、依存関係が透明化され、チーム横断で特定され、除去または最小化されるように分解されなければなりません。Product Backlog Item は、非常に大きく曖昧な要求から、単一の Scrum Team が1 Sprint 内で届けられる実行可能な作業へと、段階的に分解が進みます。</p>
      <p>チーム横断リファインメントは規模において二重の目的を果たします。</p>
      <ol>
        <li>どのチームがどの Product Backlog Item を届けるかを予測する助けになる</li>
        <li>チーム間の依存関係を特定する</li>
      </ol>
      <p>リファインメントは継続的な活動であり、頻度・期間・参加者はこの2つの目的を最適化するために変化します。単一チーム Scrum では Product Backlog リファインメントは任意の継続的活動ですが、複数チームが単一 Product Backlog から作業する複雑性が増すため、<strong>Nexus では公式かつ必須のイベント</strong>として格上げされています。</p>

      <h4>5.2.1 実務パターン:Cross-Team Refinement Board</h4>
      <p>Scrum.org 公式ホワイトペーパーおよびブログ記事では、Cross-Team Refinement を可視化するための「ボード」の使い方が具体的に紹介されています。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CROSS_TEAM_REFINEMENT_BOARD" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">Cross-Team Refinement Board のイメージ</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>公式ブログ「8 Tips for Scrum Masters to Improve Cross-Team Refinement in Nexus」より要約:</p>
        <ul>
          <li><strong>代表者は役割ではなく、対象作業の内容で選ぶ。</strong>全メンバーを毎回招集するのは現実的でも必要でもありません。リファインメント対象の Product Backlog Item に応じて、ドメイン知識・技術知識を持つ代表者を各チームから選出します。</li>
          <li><strong>ボードは毎日更新する。</strong>Nexus Sprint Backlog が Nexus Daily Scrum で毎日更新されるのと同様に、Cross-Team Refinement Board も新しい依存関係が発生するたびに毎日更新することで、常に「今わかっている依存関係の実像」を反映させます。</li>
          <li><strong>依存関係の種類を色分けする。</strong>外部依存(他チームや他部門への依存)を少なくとも1色で識別し、組織固有の依存原因があれば追加の色分けを検討します。これにより依存カテゴリーや繰り返し発生する依存を見える化できます。</li>
          <li><strong>先読みしすぎない。</strong>ソフトウェア開発には「未知の未知」が存在するため、どれだけ長くリファインメントや計画をしても全ての依存関係を事前に予測することは不可能です。時間を浪費しないために、<strong>Nexus は先行して1〜3 Sprint分程度</strong>のみをリファインメントの対象にとどめるべきです。</li>
          <li><strong>リファインメントの前半と後半で目的を分ける。</strong>前半は PBI をチームが理解できる粒度まで分解すること、後半は依存関係の特定と解消に集中することが推奨されます。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/blog/8-tips-scrum-masters-improve-cross-team-refinement-nexus" target="_blank" rel="noopener">8 Tips for Scrum Masters to Improve Cross-Team Refinement in Nexus(公式ブログ)</a></li>
          <li><a href="https://scrumorg-website-prod.s3.amazonaws.com/drupal/2016-08/Cross-Team%20Refinement%20in%20Nexus%20whitepaper_0.pdf" target="_blank" rel="noopener">Cross-Team Refinement in Nexus™(公式ホワイトペーパーPDF)</a></li>
          <li><a href="https://www.scrum.org/resources/cross-team-refinement-nexus" target="_blank" rel="noopener">Cross-Team Refinement in Nexus(公式リソースページ)</a></li>
        </ul>
      </div>

      <h3>5.3 Nexus Sprint Planning</h3>
      <p><strong>目的:</strong> Nexus Sprint Planning の目的は、Nexus 内のすべての Scrum Team の活動を単一の Sprint に向けて調整することです。各 Scrum Team からの適切な代表者と Product Owner が集まり、Sprint を計画します。</p>
      <p><strong>成果物:</strong></p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>成果物</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>Nexus Sprint Goal</td><td>Product Goal と整合し、その Sprint で Nexus が達成する目的を記述する</td></tr>
            <tr><td>各チームの Sprint Goal</td><td>Nexus Sprint Goal と整合するように設定される</td></tr>
            <tr><td>単一の Nexus Sprint Backlog</td><td>Nexus 全体の Nexus Sprint Goal に向けた作業を表し、チーム横断の依存関係を透明化する</td></tr>
            <tr><td>各チームの Sprint Backlog</td><td>各チームが Nexus Sprint Goal を支援するために行う作業を透明化する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>実務では「まずチーム横断で依存関係をつぶし、それから各チームが自分たちの Sprint Planning を通常どおり行う」という2段階の流れが推奨されています。Nexus のレイヤーは各チームの Scrum を置き換えるのではなく、その上に乗って整合を取るためのものです。Cross-Team Refinement で十分に依存関係が解消されていれば、Nexus Sprint Planning 自体で新たな依存関係が発生することは最小限に抑えられます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">Online Nexus Guide(公式)</a></li>
          <li><a href="https://accentient.com/blog/nexus-sprint-planning-in-practice/" target="_blank" rel="noopener">Nexus Sprint Planning in Practice(実務解説記事)</a></li>
        </ul>
      </div>

      <h3>5.4 Nexus Daily Scrum</h3>
      <p><strong>目的:</strong> Nexus Daily Scrum の目的は、統合上の課題を特定し、Nexus Sprint Goal に向けた進捗を検査することです。Scrum Team からの適切な代表者が参加し、Integrated Increment の現在の状態を検査し、統合上の課題や新たに発見されたチーム横断の依存関係・影響を特定します。</p>
      <p>各 Scrum Team の Daily Scrum は、Nexus Daily Scrum で提起された統合上の課題に対応することに主眼を置いた、その日の計画を作成することで Nexus Daily Scrum を補完します。Nexus Daily Scrum のみが依存関係や統合課題を提起できる唯一の場ではなく、Sprint 中の作業再計画についてのより詳細な議論のために、チーム横断のコミュニケーションは1日を通じて発生し得ます。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>Scrum.org の公式フォーラムおよび Scaling Scrum のリソース(下記ソース)では、Nexus Daily Scrum の代表者が確認すべき観点として次が挙げられています。</p>
        <ul>
          <li>前日の作業は正しく統合できたか。できなかった場合、その理由は何か</li>
          <li>今日、統合上のリスクとなりうる作業は何か</li>
          <li>Nexus Sprint Backlog を用いて、現在の依存関係を可視化・管理する</li>
        </ul>
        <p><strong>順序の工夫:</strong> Nexus Daily Scrum を各チームの Daily Scrum より<strong>先</strong>に実施すると、チームは Nexus Daily Scrum で提起された依存関係や統合課題への対応を、その日の自チームの計画に反映しやすくなります。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/forum/scrum-forum/46438/nexus-events-team-sprint-planing-sequence-events" target="_blank" rel="noopener">Nexus events: Team Sprint Planning & sequence of events(公式フォーラム)</a></li>
          <li><a href="https://www.scrum.org/resources/scaling-scrum" target="_blank" rel="noopener">Scaling Scrum(Scrum.org)</a></li>
        </ul>
      </div>

      <h3>5.5 Nexus Sprint Review</h3>
      <p><strong>目的:</strong> Nexus Sprint Review は Sprint の終わりに開催され、Nexus が Sprint を通じて構築した Done な Integrated Increment についてフィードバックを得て、今後の適応を決定するために行われます。</p>
      <p>Integrated Increment 全体がステークホルダーからのフィードバックを得る対象であるため、<strong>Nexus Sprint Review は個々の Scrum Team の Sprint Review を置き換えます</strong>(Nexus イベントの中で唯一「置き換え型」のイベントです)。イベント中、Nexus は主要ステークホルダーに作業成果を提示し、Product Goal に向けた進捗が議論されますが、完了したすべての作業を詳細に見せることはできない場合もあります。この情報に基づき、参加者はフィードバックへの対応として Nexus が何をすべきか協働します。Product Backlog はこれらの議論を反映して調整されることがあります。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>すべての作業を1つずつデモすることは現実的ではないため、Product Goal に対するインパクトが大きい機能や、統合によって初めて価値が確認できる機能を優先してデモすることが推奨されます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://scrumorg-website-prod.s3.amazonaws.com/drupal/2021-01/NexusGuide%202021_0.pdf" target="_blank" rel="noopener">The Nexus™ Guide(2021年1月版)PDF</a></li>
        </ul>
      </div>

      <h3>5.6 Nexus Sprint Retrospective</h3>
      <p><strong>目的:</strong> Nexus Sprint Retrospective の目的は、Nexus 全体の品質と効果性を高める方法を計画することです。Nexus は、個人・チーム・相互作用・プロセス・ツール・Definition of Done に関して、直前の Sprint がどうだったかを検査します。</p>
      <p>個々のチームの改善に加えて、各 Scrum Team の Sprint Retrospective は、ボトムアップの知見を使って Nexus 全体に影響する課題に焦点を当てることで、Nexus Sprint Retrospective を補完します。Nexus Sprint Retrospective は Sprint を締めくくるイベントです。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>2021年版 Nexus Guide では、Nexus Sprint Retrospective に対する具体的な進行手順(かつて存在した「Nexus全体→個別チーム→Nexus全体」という3部構成)は、もはや必須のプラクティスとして規定されていません。これらは任意の補完的プラクティスとして扱うべきである、と Scrum.org 自身の書籍解説でも明記されています。したがって「型」を機械的に踏襲するのではなく、Nexus が実際に抱える課題(個人・チーム・相互作用・プロセス・ツール・Doneの定義)に応じて柔軟に設計することが望まれます。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/nexus-framework-scaling-scrum" target="_blank" rel="noopener">The Nexus Framework for Scaling Scrum(公式書籍紹介ページ、正誤・補足あり)</a></li>
          <li><a href="https://www.scrum.org/resources/nexus-guide-change-history" target="_blank" rel="noopener">Nexus Guide Change History(公式)</a></li>
        </ul>
      </div>

      <h3>5.7 イベントまとめ表</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nexus イベント</th><th>対応する Scrum イベント</th><th>種別</th><th>主な参加者</th></tr></thead>
          <tbody>
            <tr><td>The Sprint</td><td>Sprint</td><td>同一(拡張なし)</td><td>全チーム</td></tr>
            <tr><td>Cross-Team Refinement</td><td>Product Backlog Refinement(Nexusでは必須化)</td><td>追加・格上げ</td><td>各チームの代表者 + PO</td></tr>
            <tr><td>Nexus Sprint Planning</td><td>Sprint Planning</td><td>付随(前段階)</td><td>各チームの代表者 + PO</td></tr>
            <tr><td>Nexus Daily Scrum</td><td>Daily Scrum</td><td>付随</td><td>各チームの代表者</td></tr>
            <tr><td>Nexus Sprint Review</td><td>Sprint Review</td><td><strong>置き換え</strong></td><td>ステークホルダー含む全体</td></tr>
            <tr><td>Nexus Sprint Retrospective</td><td>Sprint Retrospective</td><td>付随</td><td>必要なメンバー</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />試験のポイント</div>
        <p>SPS の設問では「Nexus Sprint Review が個々の Sprint Review を"置き換える"唯一のイベントである」という点が頻出のひっかけポイントです。他のイベントはすべて「追加・付随」であり、個々のチームの対応イベントを不要にするものではありません。</p>
      </div>
    </section>

    <!-- ===================== 6. Nexus artifacts ===================== -->
    <section id="nexus-artifacts">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 06</div>
      <h2>Nexus の作成物(Artifacts)とコミットメント</h2>
      <p>作成物は作業や価値を表し、Scrum Guide に記述されている通り透明性を最大化するように設計されています。Nexus Integration Team は、Nexus 内の Scrum Team と協力して、すべての作成物にわたる透明性が達成され、Integrated Increment の状態が広く理解されるようにします。</p>
      <p>Nexus は次の作成物で Scrum を拡張し、それぞれの作成物にはコミットメントが含まれます。これらのコミットメントは、Nexus とそのステークホルダーのために経験主義と Scrum の価値基準を強化するために存在します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_NEXUS_ARTIFACTS_COMMITMENTS" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">Nexus の作成物とコミットメントの対応</div>
      </div>

      <h3>6.1 Product Backlog / Product Goal</h3>
      <p>Nexus 全体・すべての Scrum Team のためにプロダクトを改善するために必要なものを列挙した、<strong>単一の</strong> Product Backlog が存在します。規模において、Product Backlog は依存関係を検出・最小化できるレベルで理解されている必要があります。Product Owner は Product Backlog の内容・可用性・順序づけに責任を持ちます。</p>
      <p>その<strong>コミットメントは Product Goal</strong> です。Product Goal はプロダクトの将来の状態を記述し、Nexus の長期目標として機能します。</p>

      <h3>6.2 Nexus Sprint Backlog / Nexus Sprint Goal</h3>
      <p>Nexus Sprint Backlog は、Nexus Sprint Goal と、個々の Scrum Team の Sprint Backlog に含まれる Product Backlog Item を組み合わせたものです。Sprint 中の依存関係と作業の流れを浮き彫りにするために使われます。Nexus Sprint Backlog は、Sprint を通じて学びが深まるにつれて更新され続けます。Nexus Daily Scrum で進捗を検査できる程度の詳細さを持つべきです。</p>
      <p>その<strong>コミットメントは Nexus Sprint Goal</strong> です。Nexus Sprint Goal は Nexus 全体で単一の目的であり、Nexus 内の各 Scrum Team の作業と Sprint Goal の総和です。チームが別々の取り組みではなく協働するよう促すことで、Sprint 中の Nexus に一貫性と焦点を生み出します。Nexus Sprint Goal は Nexus Sprint Planning イベントで作られ、Nexus Sprint Backlog に追加されます。各 Scrum Team は Sprint 中の作業においてこの目標を意識し続けます。Nexus は、ステークホルダーからのフィードバックを得るために、Nexus Sprint Goal を達成する上で Done になった価値ある使用可能な機能を Nexus Sprint Review でデモすべきです。</p>

      <h3>6.3 Integrated Increment / Definition of Done</h3>
      <p>Integrated Increment は、Product Goal に向けて Nexus によって完成された、統合済みのすべての作業の現時点での総和を表します。Integrated Increment は Nexus Sprint Review で検査されますが、Sprint終了前にステークホルダーに提供されることもあります。Integrated Increment は Definition of Done を満たさなければなりません。</p>
      <p>その<strong>コミットメントは Definition of Done</strong> です。Definition of Done は、統合された作業がプロダクトに求められる品質と測定基準を満たした状態を定義します。Increment は、統合され・価値があり・使用可能であって初めて Done とみなされます。<strong>Nexus Integration Team は、毎 Sprint 開発される Integrated Increment に適用できる Definition of Done に責任を持ちます</strong>。Nexus 内のすべての Scrum Team は、この Definition of Done を定義し遵守しなければなりません。個々の Scrum Team は、自チーム内でより厳格な基準を適用することを選んでもよいですが、Integrated Increment のために合意された基準より緩い基準を適用することはできません。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />試験のポイント</div>
        <p>「個々のチームは Nexus 全体の DoD より<strong>緩い</strong>基準を適用できるか?」という問いに対する答えは明確に<strong>NO</strong>です。より厳しい(stringent)基準の追加は許容されますが、緩和は許されません。この非対称性は頻出論点です。</p>
      </div>

      <p>作成物の状態に基づく意思決定は、その作成物の透明性のレベルによってのみ効果的です。不完全・部分的な情報は、誤った、あるいは欠陥のある意思決定につながります。そして、その意思決定の影響は Nexus の規模において増幅されます。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">Online Nexus Guide(公式)</a></li>
          <li><a href="https://scrumorg-website-prod.s3.amazonaws.com/drupal/2021-01/NexusGuide%202021_0.pdf" target="_blank" rel="noopener">The Nexus™ Guide(2021年1月版)PDF</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 7. Dependency management best practices ===================== -->
    <section id="dependency-management-best-practices">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 07</div>
      <h2>依存関係マネジメントとチーム編成のベストプラクティス</h2>
      <p>SPS 試験のケーススタディ問題(§1.2 の非公式の目安で約20%。出典は <a href="https://scrum-exams.info/sps/" target="_blank" rel="noopener">Scrum-Exams.info</a> であり Scrum.org の公式発表ではない。確認日: 2026-09-08)は、多くの場合「依存関係にどう対処するか」というテーマに集約されます。この章では Nexus Guide 本体を超えて、Scrum.org の公式トレーナー(PST)コミュニティが蓄積してきた実務知見(Nexus with Nexus コースで教えられる「50以上のプラクティス」の一部)を紹介します。</p>

      <h3>7.1 依存関係のライフサイクル</h3>
      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_DEPENDENCY_LIFECYCLE" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">依存関係が発見されてから解消されるまでの流れ</div>
      </div>

      <h3>7.2 チームトポロジーの選択</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>チーム編成方針</th><th>特徴</th><th>依存関係への影響</th></tr></thead>
          <tbody>
            <tr><td><strong>フィーチャーチーム(推奨傾向)</strong></td><td>エンドツーエンドで顧客価値を届けられる、機能軸の職能横断チーム</td><td>チーム間依存を構造的に減らせる</td></tr>
            <tr><td><strong>コンポーネントチーム</strong></td><td>特定のレイヤー・モジュール・技術領域を専門に担当するチーム</td><td>技術的専門性は高いが、機能単位のPBIが複数チームをまたぎやすく依存が増えやすい</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li>Nexus のような複数チーム環境では、依存関係を減らす最も強力なレバーは「イベントの運用改善」以上に「<strong>チームとプロダクトの構造そのものを見直すこと</strong>」です。コンポーネント指向のチーム編成のまま Nexus のイベントだけを整えても、根本的な依存の発生源は解消されません。</li>
          <li>チームの再編成(reshuffling)は依存解消の万能薬ではありません。実務Q&Aでも「経験的な証拠(empirical evidence)に基づいて、より職能横断的なチームを作れる、あるいは依存を排除できるとわかっている場合にのみ、メンバーの入れ替えを検討すべき」であり、恒常的な入れ替えは推奨されないとされています。</li>
        </ul>
      </div>

      <h3>7.3 Product Owner のボトルネック対策</h3>
      <p>Nexus に5チームある場合、単一の Product Owner がすべてのチームの Sprint Planning に出席するのは現実的でないことがあります。この点は実務上よく議論される論点であり、対応としては次のようなプラクティスが挙げられます。</p>
      <ul>
        <li>Nexus Sprint Planning でチーム横断の Nexus Sprint Goal と全体像を Product Owner が直接説明したうえで、各チームの個別 Sprint Planning にも単一の Product Owner が参加して協働する。Nexus に Product Owner は1人だけであり、代理(プロキシ)を立てて参加を肩代わりさせることはしない</li>
        <li>参加の負荷が高い場合は、プロダクトの意図に詳しいステークホルダーやドメイン専門家に助言者として同席してもらう。あくまで Product Owner を補佐する立場であり、Product Owner の参加や意思決定を代替するものではない</li>
        <li>Cross-Team Refinement を通じて、各 PBI の意図・受け入れ基準を事前に十分明確化しておくことで、個別 Sprint Planning での Product Owner への依存を減らす</li>
      </ul>

      <h3>7.4 見積り(Estimation)の扱い</h3>
      <p>Nexus Guide 自体は見積り手法を規定していませんが、実務コミュニティのフォーラムでは以下のようなアプローチが紹介されています。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>アプローチ</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>Cross-Team Refinement 内で T シャツサイズ等の粗い見積り</td><td>大きな Epic レベルの PBI を S/M/L/XL のようなサイズ感でチーム横断的に見積り、チーム割り当ての参考にする</td></tr>
            <tr><td>実装チームでの詳細見積り</td><td>粗い見積りの後、実際に実装するチームが確定してから、そのチーム内でストーリーポイント等の詳細見積りを行う</td></tr>
            <tr><td>No-estimates(見積りなし)アプローチ</td><td>PBI を見積りが不要なほど小さく分解する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <p>実装しないチームが見積りだけを行う「プッシュ見積り」は、精度が低くなりがちで、実装チームの当事者意識を下げるリスクがあるため注意が必要です。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/forum/scrum-forum/35030/nexus-questions-cross-team-dependencies-and-po-availabilities" target="_blank" rel="noopener">Nexus questions: cross-team dependencies and PO availabilities(公式フォーラム)</a></li>
          <li><a href="https://www.scrum.org/forum/scrum-forum/8731/nexus-refinement-meetings-and-estimates" target="_blank" rel="noopener">Nexus Refinement meetings and estimates(公式フォーラム)</a></li>
          <li><a href="https://www.scrum.org/resources/blog/nexus-nutshell" target="_blank" rel="noopener">Nexus In A Nutshell(公式ブログ)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 8. Framework comparison ===================== -->
    <section id="framework-comparison">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:scale" aria-hidden="true" />SECTION 08</div>
      <h2>Nexus と他のスケーリングフレームワークとの比較</h2>
      <p>SPS 試験自体は他フレームワーク(LeSS, SAFe, Scrum@Scale)を直接問うものではありませんが、実務での立ち位置を理解しておくことは Nexus の設計思想を相対的に理解する助けになります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>フレームワーク</th><th>提唱元</th><th>適用規模の目安</th><th>設計思想</th></tr></thead>
          <tbody>
            <tr><td><strong>Nexus</strong></td><td>Scrum.org(Ken Schwaber ら)</td><td>約3〜9 Scrum Team、単一プロダクト</td><td>Scrum を「最小限」拡張し、Scrum の原則からの逸脱を避ける</td></tr>
            <tr><td><strong>LeSS(Large-Scale Scrum)</strong></td><td>Craig Larman, Bas Vodde</td><td>LeSS:最大8チーム、LeSS Huge:それ以上</td><td>「より多くのプラクティスを足す」のではなく「よりシンプルなScrum」を志向し、単一 PO・単一 Product Backlog を維持</td></tr>
            <tr><td><strong>SAFe(Scaled Agile Framework)</strong></td><td>Scaled Agile, Inc.</td><td>大規模〜エンタープライズ全体</td><td>複数レベル(チーム・プログラム・ポートフォリオ)の構造化されたプロセス群を提供</td></tr>
            <tr><td><strong>Scrum@Scale</strong></td><td>Jeff Sutherland</td><td>小規模組織から大企業まで(スケールフリー志向)</td><td>Scrum of Scrums(SoS)を中核に、組織全体へのスケーリングを志向</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />試験のポイント</div>
        <p>SPS の設問において「Nexus は SAFe のような重量級フレームワークを置き換えるものだ」という誤解に基づく選択肢は誤りです。Nexus の設計思想はあくまで「Scrum に対する最小限の拡張(exoskeleton)」であることを繰り返し強調しています。</p>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://prepforscrum.com/scaling-scrum-frameworks-less-safe-nexus-scrum-at-scale/" target="_blank" rel="noopener">Scaling Scrum: LeSS, SAFe, Nexus, or Scrum@Scale?(比較記事)</a></li>
          <li><a href="https://www.scrum-tips.com/agile/nexus-scaling-scrum-framework/" target="_blank" rel="noopener">Nexus - the scaling Scrum framework(解説記事)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 9. Anti-patterns ===================== -->
    <section id="anti-patterns">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 09</div>
      <h2>Nexus の立ち上げと運用:実務上の落とし穴(アンチパターン)</h2>

      <div class="table-wrap">
        <table>
          <thead><tr><th>アンチパターン</th><th>問題点</th><th>あるべき姿</th></tr></thead>
          <tbody>
            <tr><td>Nexus Integration Team を固定の「特別チーム」として組織図に常設する</td><td>現場のチームから乖離した司令塔になり、ボトムアップの知性を損なう</td><td>NIT はニーズに応じて構成が変化する、現場チームの一部という位置づけを保つ</td></tr>
            <tr><td>Cross-Team Refinement を省略、または月1回程度にとどめる</td><td>依存関係の発見が遅れ、Sprint中に大きな手戻りが発生する</td><td>継続的に実施し、少なくとも週次以上の頻度でボードを更新する</td></tr>
            <tr><td>Nexus Sprint Retrospective を必ず「全体→個別→全体」の3部構成で固定する</td><td>2021年版ガイドで必須のプラクティスではなくなったにもかかわらず、形骸化した儀式になる</td><td>Nexus が実際に抱える課題に応じて柔軟に設計する</td></tr>
            <tr><td>個々のチームがNexus全体のDefinition of Doneより緩い基準を適用する</td><td>Integrated Incrementの品質保証が崩れる</td><td>各チームはNexus全体のDoD以上(同等かより厳格)を満たす</td></tr>
            <tr><td>Sprint期間を統合のためだけに延長する</td><td>Scrumのタイムボックスの規律を損ない、フィードバックサイクルを遅らせる</td><td>統合の課題自体をDefinition of DoneやCI/CDなどの技術的実践で解決する</td></tr>
            <tr><td>依存関係が起きるたびにチームを頻繁に再編成する</td><td>チームの安定性・自己管理能力が損なわれる</td><td>経験的根拠に基づく場合のみ、慎重に構造変更を検討する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrum.org/resources/blog/nexus-nutshell" target="_blank" rel="noopener">Nexus In A Nutshell(公式ブログ)</a></li>
          <li><a href="https://www.scrum.org/forum/scrum-forum/35030/nexus-questions-cross-team-dependencies-and-po-availabilities" target="_blank" rel="noopener">Nexus questions: cross-team dependencies and PO availabilities(公式フォーラム)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Exam prep case studies ===================== -->
    <section id="exam-prep-case-studies">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 10</div>
      <h2>試験対策:ケーススタディ形式の演習問題</h2>
      <p>以下は本ガイドの著者が作成したオリジナルの演習問題です(実際の SPS 試験の設問を再現・引用したものではありません)。Nexus Guide の原則理解を検証する目的で作成しています。</p>

      <h3>演習1</h3>
      <p><strong>設問:</strong> あるNexusで、Team AがPBI Xの実装中に、Team Bが担当するモジュールへの変更が必要なことに気づいた。この依存関係が発覚したのはSprintの3日目である。Nexus Guideの原則に最も忠実な対応はどれか。</p>
      <p><strong>選択肢の考え方:</strong></p>
      <ul>
        <li>誤り:「次のCross-Team Refinementまで報告を待つ」→ 依存関係は発見次第、透明化されるべきであり、Nexus Daily Scrumやチーム間の日中コミュニケーションを通じて即座に共有すべきです。</li>
        <li>誤り:「Product Ownerの許可なしにTeam Bのバックログに直接タスクを追加する」→ Product Backlogの内容・順序づけに対する責任はProduct Ownerに一元化されています。</li>
        <li><strong>適切:</strong>「Nexus Daily Scrum(またはチーム間の直接のコミュニケーション)で速やかに共有し、Nexus Sprint Backlog上で依存関係を可視化した上で、両チームと必要に応じてProduct Ownerを交えて対応方針を調整する」</li>
      </ul>

      <h3>演習2</h3>
      <p><strong>設問:</strong> Team CはNexus全体で合意されたDefinition of Doneに「自動テストカバレッジ80%以上」を含めているが、自チームの成熟度に自信があるため、90%を目標に運用している。これはNexus Guide上、許容されるか。</p>
      <p><strong>解説:</strong> 許容されます。個々のScrum Teamは、Nexus全体で合意されたDefinition of Doneより<strong>厳格な</strong>基準を自チーム内で適用することができます。禁止されているのは、合意された基準より<strong>緩い</strong>基準を適用することです。</p>

      <h3>演習3</h3>
      <p><strong>設問:</strong> Nexus Sprint Reviewの目的として最も適切なものはどれか。</p>
      <p><strong>解説:</strong> 正解は「Sprintを通じてNexusが構築したDoneなIntegrated Incrementについてステークホルダーからフィードバックを得て、今後の適応を決定すること」です。個々のチームの作業内容を網羅的に報告することが目的ではなく、また、Nexus Sprint Reviewは個々のScrum TeamのSprint Reviewを置き換える点も重要な理解ポイントです。</p>

      <h3>演習4</h3>
      <p><strong>設問:</strong> ある組織が3チーム体制でNexusの導入を検討しているが、実際にはチーム間の技術的な依存関係がほとんど発生しない、独立性の高いプロダクト構成になっている。この場合の最も適切なアドバイスはどれか。</p>
      <p><strong>解説:</strong> Nexus Guideおよびコースの学習目標は「本当にスケールが必要かどうかをまず見極めること」を重視しています。依存関係がほとんど発生しない構成であれば、Nexusの追加的なイベント・役割によるオーバーヘッドがかえって価値提供を遅らせる可能性があります。プロダクト構造やチーム構成を見直し、必要最小限の協調の仕組み(あるいは緩やかなScrum of Scrums程度)から始め、実際に依存が顕在化した段階でNexusの要素を導入する、という段階的アプローチが妥当です。</p>
    </section>

    <!-- ===================== 11. Framework summary map ===================== -->
    <section id="framework-summary-map">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 11</div>
      <h2>総まとめ図:Nexus フレームワーク全体マップ</h2>

      <div class="diagram-card">
        <div class="mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_NEXUS_FRAMEWORK_SUMMARY_MAP" theme="base" />
              <template #fallback>
                <p class="diagram-loading">図を読み込み中...</p>
              </template>
            </ClientOnly>
          </div>
        <div class="diagram-caption">Nexus の責任・イベント・作成物の全体像</div>
      </div>
    </section>

    <!-- ===================== 12. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 12</div>
      <h2>参考文献・ソース一覧</h2>
      <p>本ガイドの作成にあたり参照した一次情報源・公式リソースを以下にまとめます。学習の際は特に上位の一次情報源(Nexus Guide本体、Scrum Guide、公式アセスメントページ)を繰り返し読み込むことを強く推奨します。</p>

      <div class="ref-group">
        <h3>一次情報源(Scrum.org 公式)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Scaled Professional Scrum™ Certification(公式アセスメントページ)</span><a class="ref-url" href="https://www.scrum.org/assessments/scaled-professional-scrum-certification" target="_blank" rel="noopener">https://www.scrum.org/assessments/scaled-professional-scrum-certification</a></li>
          <li><span class="ref-name">The Nexus™ Guide(2021年1月版・公式PDF)</span><a class="ref-url" href="https://scrumorg-website-prod.s3.amazonaws.com/drupal/2021-01/NexusGuide%202021_0.pdf" target="_blank" rel="noopener">https://scrumorg-website-prod.s3.amazonaws.com/drupal/2021-01/NexusGuide%202021_0.pdf</a></li>
          <li><span class="ref-name">Online Nexus Guide(公式・Web版)</span><a class="ref-url" href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/online-nexus-guide</a></li>
          <li><span class="ref-name">Nexus Guide Change History(改訂履歴・公式)</span><a class="ref-url" href="https://www.scrum.org/resources/nexus-guide-change-history" target="_blank" rel="noopener">https://www.scrum.org/resources/nexus-guide-change-history</a></li>
          <li><span class="ref-name">Scaled Professional Scrum(コース概要・公式)</span><a class="ref-url" href="https://www.scrum.org/courses/scaled-professional-scrum-nexus-training" target="_blank" rel="noopener">https://www.scrum.org/courses/scaled-professional-scrum-nexus-training</a></li>
          <li><span class="ref-name">The Professional Scrum™ Competencies(公式)</span><a class="ref-url" href="https://www.scrum.org/professional-scrum-competencies" target="_blank" rel="noopener">https://www.scrum.org/professional-scrum-competencies</a></li>
          <li><span class="ref-name">Professional Scrum™ Certifications(認定一覧・公式)</span><a class="ref-url" href="https://www.scrum.org/professional-scrum-certifications" target="_blank" rel="noopener">https://www.scrum.org/professional-scrum-certifications</a></li>
          <li><span class="ref-name">Scaling Scrum with Nexus(公式リソースセンター)</span><a class="ref-url" href="https://www.scrum.org/resources/scaling-scrum" target="_blank" rel="noopener">https://www.scrum.org/resources/scaling-scrum</a></li>
          <li><span class="ref-name">Scaling Scrum with Nexus and Scrum Studio(公式ブログ)</span><a class="ref-url" href="https://www.scrum.org/resources/blog/scaling-scrum-nexus-and-scrum-studio" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/scaling-scrum-nexus-and-scrum-studio</a></li>
          <li><span class="ref-name">Overview of the Nexus Framework for scaling Scrum(公式ブログ)</span><a class="ref-url" href="https://www.scrum.org/resources/blog/overview-nexus-framework-scaling-scrum" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/overview-nexus-framework-scaling-scrum</a></li>
          <li><span class="ref-name">8 Tips for Scrum Masters to Improve Cross-Team Refinement in Nexus(公式ブログ)</span><a class="ref-url" href="https://www.scrum.org/resources/blog/8-tips-scrum-masters-improve-cross-team-refinement-nexus" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/8-tips-scrum-masters-improve-cross-team-refinement-nexus</a></li>
          <li><span class="ref-name">Cross-Team Refinement in Nexus(公式リソースページ)</span><a class="ref-url" href="https://www.scrum.org/resources/cross-team-refinement-nexus" target="_blank" rel="noopener">https://www.scrum.org/resources/cross-team-refinement-nexus</a></li>
          <li><span class="ref-name">Cross-Team Refinement in Nexus™(公式ホワイトペーパーPDF)</span><a class="ref-url" href="https://scrumorg-website-prod.s3.amazonaws.com/drupal/2016-08/Cross-Team%20Refinement%20in%20Nexus%20whitepaper_0.pdf" target="_blank" rel="noopener">https://scrumorg-website-prod.s3.amazonaws.com/drupal/2016-08/Cross-Team%20Refinement%20in%20Nexus%20whitepaper_0.pdf</a></li>
          <li><span class="ref-name">Nexus In A Nutshell(公式ブログ)</span><a class="ref-url" href="https://www.scrum.org/resources/blog/nexus-nutshell" target="_blank" rel="noopener">https://www.scrum.org/resources/blog/nexus-nutshell</a></li>
          <li><span class="ref-name">The Nexus Framework for Scaling Scrum(公式書籍紹介ページ)</span><a class="ref-url" href="https://www.scrum.org/resources/nexus-framework-scaling-scrum" target="_blank" rel="noopener">https://www.scrum.org/resources/nexus-framework-scaling-scrum</a></li>
          <li><span class="ref-name">Nexus questions: cross-team dependencies and PO availabilities(公式フォーラム)</span><a class="ref-url" href="https://www.scrum.org/forum/scrum-forum/35030/nexus-questions-cross-team-dependencies-and-po-availabilities" target="_blank" rel="noopener">https://www.scrum.org/forum/scrum-forum/35030/nexus-questions-cross-team-dependencies-and-po-availabilities</a></li>
          <li><span class="ref-name">Nexus Refinement meetings and estimates(公式フォーラム)</span><a class="ref-url" href="https://www.scrum.org/forum/scrum-forum/8731/nexus-refinement-meetings-and-estimates" target="_blank" rel="noopener">https://www.scrum.org/forum/scrum-forum/8731/nexus-refinement-meetings-and-estimates</a></li>
          <li><span class="ref-name">Nexus events: Team Sprint Planning & sequence of events(公式フォーラム)</span><a class="ref-url" href="https://www.scrum.org/forum/scrum-forum/46438/nexus-events-team-sprint-planing-sequence-events" target="_blank" rel="noopener">https://www.scrum.org/forum/scrum-forum/46438/nexus-events-team-sprint-planing-sequence-events</a></li>
          <li><span class="ref-name">The Scrum Guide(公式・scrumguides.org)</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>二次情報源(コミュニティ・実務解説)</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Scaled Professional Scrum(SPS)攻略ガイド・出題傾向分析:Scrum-Exams.info</span><a class="ref-url" href="https://scrum-exams.info/sps/" target="_blank" rel="noopener">https://scrum-exams.info/sps/</a></li>
          <li><span class="ref-name">How To Pass The Scaled Professional Scrum (SPS) Assessment:TheScrumMaster.co.uk</span><a class="ref-url" href="https://www.thescrummaster.co.uk/scrum/how-to-pass-the-scaled-professional-scrum-sps-assessment-from-scrum-org/" target="_blank" rel="noopener">https://www.thescrummaster.co.uk/scrum/how-to-pass-the-scaled-professional-scrum-sps-assessment-from-scrum-org/</a></li>
          <li><span class="ref-name">Scaled Professional Scrum With Nexus コース詳細・学習目標:TheScrumMaster.co.uk</span><a class="ref-url" href="https://www.thescrummaster.co.uk/scaled-professional-scrum/" target="_blank" rel="noopener">https://www.thescrummaster.co.uk/scaled-professional-scrum/</a></li>
          <li><span class="ref-name">Nexus Sprint Planning in Practice(実務解説):Accentient</span><a class="ref-url" href="https://accentient.com/blog/nexus-sprint-planning-in-practice/" target="_blank" rel="noopener">https://accentient.com/blog/nexus-sprint-planning-in-practice/</a></li>
          <li><span class="ref-name">Scaling Scrum:Scrum.org 公式リソース</span><a class="ref-url" href="https://www.scrum.org/resources/scaling-scrum" target="_blank" rel="noopener">https://www.scrum.org/resources/scaling-scrum</a></li>
          <li><span class="ref-name">Nexus Guide 詳細解説(Martin Hinshelwood, Professional Scrum Trainer)</span><a class="ref-url" href="https://engineering-leadership.hinshelwood.com/guides/nexus-guide" target="_blank" rel="noopener">https://engineering-leadership.hinshelwood.com/guides/nexus-guide</a></li>
          <li><span class="ref-name">Nexus - the scaling Scrum framework(解説記事)</span><a class="ref-url" href="https://www.scrum-tips.com/agile/nexus-scaling-scrum-framework/" target="_blank" rel="noopener">https://www.scrum-tips.com/agile/nexus-scaling-scrum-framework/</a></li>
          <li><span class="ref-name">Scaling Scrum: LeSS, SAFe, Nexus, or Scrum@Scale?(比較記事)</span><a class="ref-url" href="https://prepforscrum.com/scaling-scrum-frameworks-less-safe-nexus-scrum-at-scale/" target="_blank" rel="noopener">https://prepforscrum.com/scaling-scrum-frameworks-less-safe-nexus-scrum-at-scale/</a></li>
        </ul>
      </div>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>本ガイドは学習支援を目的とした二次的な要約・解説資料であり、Scrum.org による公式教材・公式見解を代替するものではありません。試験直前には必ず最新版の<a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">Nexus Guide</a>と<a href="https://www.scrum.org/assessments/scaled-professional-scrum-certification" target="_blank" rel="noopener">公式アセスメントページ</a>を確認してください。Nexus Guide は Creative Commons Attribution-ShareAlike 4.0 ライセンスの下で Scrum.org により提供されています。</p>
      </div>
    </section>

    <footer>
      Scaled Professional Scrum™ および Nexus™ は Scrum.org の商標です。本ページは非公式の学習支援資料であり、Scrum.org とは無関係です。The Nexus Guide は Creative Commons Attribution-ShareAlike 4.0 ライセンスの下で提供されています。最新情報は<a href="https://www.scrum.org/assessments/scaled-professional-scrum-certification" target="_blank" rel="noopener">公式サイト</a>をご確認ください。
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

.sidebar-brand .seal {
  width: 40px;
  height: 40px;
  flex: none;
}

.brand-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.2;
}

.brand-subtitle {
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
  margin: 0;
}

.sidebar-nav .nav-group-label {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-ink-faint);
  margin: 20px 0 8px;
  padding-left: 10px;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 16px;
  color: var(--color-ink-soft);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) {
  font-size: 16px;
  color: var(--color-ink-faint);
  flex: none;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  text-decoration: none;
}

.sidebar-nav a:hover :deep(.iconify),
.sidebar-nav a:hover :deep(svg) {
  color: var(--color-indigo);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.sidebar-nav a.active :deep(.iconify),
.sidebar-nav a.active :deep(svg) {
  color: var(--color-indigo);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #fff;
  border: none;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 30;
}

/* ===================== Main Content ===================== */
.main-content {
  margin-left: var(--sidebar-width);
  padding: 48px 48px 120px;
}

.hero {
  margin-bottom: 48px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-indigo);
  background: var(--color-indigo-tint);
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: 40px;
  line-height: 1.25;
  margin: 0 0 16px;
  color: var(--color-ink);
  font-weight: 700;
}

.hero-lede {
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-ink-soft);
  margin-bottom: 24px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 28px 0;
}

.stat-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 18px 20px;
}

.stat-number {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 26px;
  color: var(--color-indigo);
  line-height: 1.2;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-soft);
  margin-top: 4px;
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

/* ===================== Sections ===================== */
section {
  margin-bottom: 64px;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 6px;
}

h2 {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
}

h3 {
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 600;
  color: var(--color-ink);
  margin: 32px 0 12px;
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

/* ===================== Domain badge cards ===================== */
.domain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
  width: 100%;
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

/* ===================== Glossary ===================== */
.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
.ref-group {
  margin-bottom: 28px;
}

.ref-group h4 {
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

  .domain-grid {
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

  .domain-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar {
    transition: none;
  }
}
</style>
