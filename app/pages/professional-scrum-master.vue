<script setup lang="ts">
import { useSeoMeta } from "#imports";
import { nextTick, ref } from "vue";
import { useActiveHeading } from "~/composables/useActiveHeading";

const TOC_IDS = [
  "psm-overview",
  "scrum-theory",
  "scrum-team-accountabilities",
  "scrum-events",
  "scrum-artifacts",
  "scrum-master-role",
  "anti-patterns",
  "psm1-exam-prep",
  "psm2-exam-prep",
  "psm3-exam-prep",
  "nexus-scaling",
  "study-roadmap",
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
  title: "Professional Scrum Master(PSM)認定ガイド | PSM I・II・III 試験対策とベストプラクティス",
  description:
    "Scrum.org Professional Scrum Master(PSM I/II/III)認定について、Scrumの理論的基盤から試験対策・ベストプラクティスまでを解説する初学者向け完全ガイド。",
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

const DIAGRAM_CERT_PATH = `flowchart LR
A["Scrum初学者"]
B["PSM I 基礎知識の証明 80問 / 60分 / 85%"]
C["PSM II 実践への応用力の証明 30問 / 90分 / 85%"]
D["PSM III エキスパートレベルの証明 24問エッセイ / 150分"]
E["PSPO I プロダクトオーナー"]
F["PAL I アジャイルリーダーシップ"]
G["PSD I スクラム開発者"]
H["SPS Nexusによるスケーリング"]
A --> B
B --> C
C --> D
B -.->|"関連する認定"| E
B -.->|"関連する認定"| F
B -.->|"関連する認定"| G
C -.->|"スケーリングへ発展"| H

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,E,F,G,H box;
class D done;`;

const DIAGRAM_EMPIRICISM = `flowchart LR
T["透明性 Transparency プロセスと作業を関係者に見える化する"]
I["検査 Inspection 進捗や成果物を頻繁かつ注意深く検査する"]
AD["適応 Adaptation 許容範囲からの逸脱を認識したら迅速に調整する"]
T --> I
I --> AD
AD --> T

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class T,I,AD box;`;

const DIAGRAM_SPRINT_CYCLE = `flowchart TB
PB["プロダクトバックログ Product Backlog"]
SP["① スプリントプランニング Sprint Planning"]
SPRINT["② スプリント 最大1か月 期間中は毎日デイリースクラムを実施"]
SR["③ スプリントレビュー Sprint Review"]
RETRO["④ スプリントレトロスペクティブ Sprint Retrospective"]
INC["インクリメント Increment"]
PB --> SP
SP --> SPRINT
SPRINT --> SR
SR --> RETRO
RETRO --> PB
SPRINT --> INC
INC --> SR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PB hub;
class SP,SPRINT,SR,RETRO box;
class INC done;`;

const DIAGRAM_SM_SERVICE_AREAS = `flowchart TB
SM["スクラムマスター"]
ST["スクラムチームへの奉仕 コーチング / ファシリテーション 障害物の除去 / イベントの支援"]
PO["プロダクトオーナーへの奉仕 効果的なプロダクトゴールの策定支援・プロダクトバックログ管理技法の提示"]
ORG["組織への奉仕 Scrum導入の計画・指導・コーチ 経験主義的アプローチの浸透"]
SM --> ST
SM --> PO
SM --> ORG

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SM hub;
class ST,PO,ORG box;`;

const DIAGRAM_SM_STANCES = `flowchart TB
SM["スクラムマスター"]
S1["① サーバントリーダー チームと顧客のニーズに焦点を当てる"]
S2["② ファシリテーター 合意形成のプロセスを設計・運営する"]
S3["③ コーチ 個人・チーム・組織の学習と成長を促す"]
S4["④ マネージャー チームの健全性と自己組織化の境界を管理する"]
S5["⑤ メンター 自身の経験や知識をアジャイル実践のために伝える"]
S6["⑥ ティーチャー Scrum・経験主義・自己管理の理解を広める"]
S7["⑦ 障害物の除去者 チームの進捗を妨げる問題を解消する"]
S8["⑧ チェンジエージェント スクラムチームが機能する文化づくりを組織に働きかける"]
SM --> S1
SM --> S2
SM --> S3
SM --> S4
SM --> S5
SM --> S6
SM --> S7
SM --> S8

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SM hub;
class S1,S2,S3,S4,S5,S6,S7,S8 box;`;

const DIAGRAM_STUDY_ROADMAP = `flowchart TB
S1["Step 1 Scrum Guide 2020 の通読・精読"]
S2["Step 2 Scrum Open で無料診断"]
S3["Step 3 PSM I 受験・合格"]
S4["Step 4 実務でスクラムマスターとして経験を積む 数ヶ月〜1年以上が目安"]
S5["Step 5 PSM II 対策: シナリオ問題演習と8つのスタンスの実践"]
S6["Step 6 PSM II 受験・合格"]
S7["Step 7 複数チーム・組織横断の課題に取り組む経験を積む"]
S8["Step 8 PSM III 対策: エッセイ練習と経験の言語化"]
S9["Step 9 PSM III 受験・合格"]
S1 --> S2
S2 --> S3
S3 --> S4
S4 --> S5
S5 --> S6
S6 --> S7
S7 --> S8
S8 --> S9

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6,S7,S8 box;
class S9 done;`;
</script>

<template>
  <div class="layout">
    <button
      ref="sidebarToggle"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次メニューを開閉"
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
    />
    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">PSM 完全ガイド</div>
          <div class="brand-subtitle">Professional Scrum Master</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li class="nav-group-label">基礎知識</li>
        <li><a href="#psm-overview" :class="{ active: activeId === 'psm-overview' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />PSM認定の全体像</a></li>
        <li><a href="#scrum-theory" :class="{ active: activeId === 'scrum-theory' }" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />スクラムの理論的基盤</a></li>
        <li><a href="#scrum-team-accountabilities" :class="{ active: activeId === 'scrum-team-accountabilities' }" @click="closeSidebar"><Icon name="tabler:users-group" aria-hidden="true" />スクラムチームと3つのアカウンタビリティ</a></li>
        <li class="nav-group-label">実践とベストプラクティス</li>
        <li><a href="#scrum-events" :class="{ active: activeId === 'scrum-events' }" @click="closeSidebar"><Icon name="tabler:calendar-event" aria-hidden="true" />スクラムイベント</a></li>
        <li><a href="#scrum-artifacts" :class="{ active: activeId === 'scrum-artifacts' }" @click="closeSidebar"><Icon name="tabler:clipboard-text" aria-hidden="true" />スクラムの作成物とコミットメント</a></li>
        <li><a href="#scrum-master-role" :class="{ active: activeId === 'scrum-master-role' }" @click="closeSidebar"><Icon name="tabler:compass" aria-hidden="true" />スクラムマスターの役割とサーバントリーダーシップ</a></li>
        <li><a href="#anti-patterns" :class="{ active: activeId === 'anti-patterns' }" @click="closeSidebar"><Icon name="tabler:alert-triangle" aria-hidden="true" />よくあるアンチパターンと対処法</a></li>
        <li class="nav-group-label">試験対策</li>
        <li><a href="#psm1-exam-prep" :class="{ active: activeId === 'psm1-exam-prep' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />PSM I 試験対策</a></li>
        <li><a href="#psm2-exam-prep" :class="{ active: activeId === 'psm2-exam-prep' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />PSM II 試験対策</a></li>
        <li><a href="#psm3-exam-prep" :class="{ active: activeId === 'psm3-exam-prep' }" @click="closeSidebar"><Icon name="tabler:pencil" aria-hidden="true" />PSM III 試験対策</a></li>
        <li><a href="#nexus-scaling" :class="{ active: activeId === 'nexus-scaling' }" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />スケーリングへの橋渡し(Nexus)</a></li>
        <li class="nav-group-label">ロードマップと参考文献</li>
        <li><a href="#study-roadmap" :class="{ active: activeId === 'study-roadmap' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />学習ロードマップ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・出典</a></li>
      </ul>
    </nav>

    <!-- ===================== Main content ===================== -->
    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum.org 公式アセスメント準拠</div>
        <h1>Professional Scrum Master(PSM)認定ガイド</h1>
        <p class="hero-lede">
          初学者のためのステップバイステップ解説とベストプラクティス集
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">PSM I〜III</div><div class="stat-label">3段階の認定レベル</div></div>
          <div class="stat-card"><div class="stat-number">85%</div><div class="stat-label">PSM I・IIの合格基準</div></div>
          <div class="stat-card"><div class="stat-number">24問</div><div class="stat-label">PSM III(エッセイ形式・150分)</div></div>
          <div class="stat-card"><div class="stat-number">生涯有効</div><div class="stat-label">全レベル共通、更新不要</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは Scrum.org が提供する<strong>Professional Scrum Master™ Assessments</strong>(PSM I / PSM II / PSM III)を対象に、Scrum の理論的基盤から各アセスメントの出題範囲・学習戦略までを体系的に解説するものです。すべての図解は Mermaid、比較情報はすべて Markdown テーブルで表現しています。参照元: <a href="https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-assessments" target="_blank" rel="noopener">Professional Scrum Master Assessments(Scrum.org)</a></span>
        </div>
      </div>

      <!-- ===================== 1. PSM Overview ===================== -->
      <section id="psm-overview">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>PSM認定の全体像</h2>

        <h3>1.1 PSMとは何か</h3>
        <p>Professional Scrum Master™(PSM)は、Scrum の共同考案者 Ken Schwaber が設立した <strong>Scrum.org</strong> が提供する認定制度です。CSM(Certified ScrumMaster、Scrum Alliance)が<strong>16時間の公式コース受講と50問の試験合格の両方</strong>を認定要件とするのに対し、PSM は<strong>知識と理解度を問う試験に合格すること</strong>のみで認定される点が最大の特徴です。研修の受講は必須ではなく、独学でも受験・合格が可能です。</p>
        <p>PSM ファミリーには難易度別に3段階のアセスメントがあります。</p>
        <ul>
          <li><strong>PSM I</strong>: Scrum フレームワークの基礎知識とスクラムマスターのアカウンタビリティの理解を証明する</li>
          <li><strong>PSM II</strong>: 組織内で Scrum を実践し、応用する高度な能力を証明する</li>
          <li><strong>PSM III</strong>: 複数チーム・複雑な組織状況においてスクラムマスタリーを体現する、エキスパートレベルの能力を証明する</li>
        </ul>

        <h3>1.2 資格比較表</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>PSM I</th><th>PSM II</th><th>PSM III</th></tr></thead>
            <tbody>
              <tr><td>難易度</td><td>基礎(Fundamental)</td><td>応用(Advanced)</td><td>エキスパート(Expert)</td></tr>
              <tr><td>受験料</td><td>$200 USD</td><td>$250 USD</td><td>$500 USD</td></tr>
              <tr><td>制限時間</td><td>60分</td><td>90分</td><td>150分(2.5時間)</td></tr>
              <tr><td>問題数</td><td>80問</td><td>30問(一部部分点あり)</td><td>24問(エッセイ形式のみ)</td></tr>
              <tr><td>出題形式</td><td>択一式・複数選択・True/False</td><td>択一式・複数選択・True/False</td><td>エッセイ(記述式)のみ、貼り付け不可・手入力必須</td></tr>
              <tr><td>合格基準</td><td>85%</td><td>85%</td><td>採点担当者による Pass / Did Not Pass 判定</td></tr>
              <tr><td>採点方法</td><td>即時自動採点</td><td>即時自動採点</td><td>Scrum専門家チームによる手動採点(結果通知まで約4週間)</td></tr>
              <tr><td>前提資格</td><td>なし</td><td>なし(PSM I 取得が推奨)</td><td>なし(PSM II 取得が推奨)</td></tr>
              <tr><td>有効期限</td><td>なし(生涯有効)</td><td>なし(生涯有効)</td><td>なし(生涯有効)</td></tr>
              <tr><td>対応言語</td><td>英語・日本語・簡体字中国語(scrum.org.cn 経由)</td><td>英語のみ</td><td>英語のみ</td></tr>
              <tr><td>デジタル資格</td><td>Credly バッジ付与</td><td>Credly バッジ付与</td><td>Credly バッジ付与</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-master-i-certification" target="_blank" rel="noopener">PSM I 公式ページ</a></li>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-master-ii-certification" target="_blank" rel="noopener">PSM II 公式ページ</a></li>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-master-iii-certification" target="_blank" rel="noopener">PSM III 公式ページ</a></li>
          </ul>
        </div>

        <h3>1.3 認定パスの全体図</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CERT_PATH" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">PSM I から PSM III への認定パスと関連する認定</div>
        </div>

        <h3>1.4 その他の関連アセスメント(参考)</h3>
        <p>PSM I・II・III はスクラムマスターのコアパスですが、Scrum.org は役割や専門テーマに応じて複数のアセスメントを用意しています。実務で PSM と併せて検討されることが多いものを簡単に紹介します(詳細は各アセスメントの個別ガイドを参照してください)。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>アセスメント</th><th>対象</th></tr></thead>
            <tbody>
              <tr><td>PSPO I / II(Professional Scrum Product Owner)</td><td>プロダクトオーナーとしての価値最大化の知識</td></tr>
              <tr><td>PSD I(Professional Scrum Developer)</td><td>Scrum チームにおける開発者としての技術プラクティス</td></tr>
              <tr><td>PAL I(Professional Agile Leadership I)</td><td>組織のリーダー層に向けたアジャイルリーダーシップ</td></tr>
              <tr><td>PSU I(Professional Scrum with User Experience)</td><td>UX とスクラムの統合</td></tr>
              <tr><td>SPS(Scaled Professional Scrum)</td><td>Nexus フレームワークによる複数チームのスケーリング</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 2. Scrum Theory ===================== -->
      <section id="scrum-theory">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 02</div>
        <h2>スクラムの理論的基盤</h2>

        <p>PSM 試験全体を通じて最も重要な前提知識が「経験主義(Empiricism)」です。Scrum は経験主義とリーン思考の考え方に基づいた軽量級フレームワークであり、PSM I の設問の多くはこの理論を正しく理解しているかを問う形で出題されます。</p>

        <h3>2.1 経験主義の3本柱</h3>
        <p>経験主義とは、「知識は経験から生まれ、意思決定は観察されたものに基づいて行われる」という考え方です。Scrum ではこれを支える3つの柱が定義されています。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_EMPIRICISM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">経験主義を支える3本柱:透明性・検査・適応の循環</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>柱</th><th>説明</th><th>ベストプラクティス</th></tr></thead>
            <tbody>
              <tr><td>透明性</td><td>プロセスの重要な側面が、それを見る人たちに対して見える必要がある。透明性がなければ検査は誤解を招き、適応の判断も誤る</td><td>「完成」の定義を全員が共有する / 進捗を隠さず可視化するボードや指標を使う / 悪いニュースほど早く共有する文化を作る</td></tr>
              <tr><td>検査</td><td>スクラムの成果物と、ゴールに向けた進捗を頻繁かつ注意深く検査し、望ましくない変化や問題を検知する</td><td>デイリースクラムやスプリントレビューを形骸化させず、実際の作業状況を突き合わせる / 検査しすぎて作業の妨げにならないバランスを取る</td></tr>
              <tr><td>適応</td><td>プロセスや作成される素材が許容範囲を逸脱していると検査で判断された場合、できるだけ早く調整しなければならない</td><td>レトロスペクティブでの気づきを次のスプリントで実際に試す / 検査結果を無視せず、迅速にプロセスや計画を見直す</td></tr>
            </tbody>
          </table>
        </div>

        <h3>2.2 スクラムの5つの価値基準</h3>
        <p>Scrum チームが経験主義とリーン思考の考え方を実践する際に拠り所とするのが、以下の5つの価値基準です。PSM I では単なる暗記ではなく、「この状況はどの価値基準が損なわれているか」を問う応用問題として出題される傾向があります。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>価値基準</th><th>意味</th><th>体現するベストプラクティス</th></tr></thead>
            <tbody>
              <tr><td>確約(Commitment)</td><td>ゴールの達成に人々が個人としてコミットする</td><td>スプリントゴールを全員で合意し、達成に向けてチーム全体で責任を持つ</td></tr>
              <tr><td>集中(Focus)</td><td>スプリントの作業とスクラムチームのゴールに集中する</td><td>WIP(仕掛り作業)を制限し、並行作業を減らす</td></tr>
              <tr><td>公開(Openness)</td><td>スクラムチームとステークホルダーが、作業や課題について公開する</td><td>問題や遅れを隠さず、スプリントレビューで率直にステークホルダーへ共有する</td></tr>
              <tr><td>尊敬(Respect)</td><td>スクラムチームのメンバーが、互いに能力があり自立した人間であると認め合う</td><td>意見の相違を人格攻撃にせず、専門性や自律性を尊重する対話をする</td></tr>
              <tr><td>勇気(Courage)</td><td>スクラムチームのメンバーが、正しいことをする勇気や、困難な問題に取り組む勇気を持つ</td><td>「できない」と言うべきときに言う、対立を避けずに建設的に指摘する</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 3. Scrum Team Accountabilities ===================== -->
      <section id="scrum-team-accountabilities">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 03</div>
        <h2>スクラムチームと3つのアカウンタビリティ</h2>

        <h3>3.1 スクラムチームの基本原則</h3>
        <p>Scrum Guide 2020 では、それまでの「開発チーム(Development Team)」と「スクラムチーム」という二重構造が廃止され、<strong>プロダクトオーナー・スクラムマスター・開発者から構成される単一の「スクラムチーム」</strong>という考え方に統一されました。これは「チームの中のチーム」という対立構造をなくすための重要な改訂です。</p>
        <p>主な原則は以下の通りです。</p>
        <ul>
          <li>小規模である(一般的に10名以下が目安とされる)</li>
          <li>職能横断的(Cross-functional)であり、チーム外に依存せず価値を生み出せる</li>
          <li>自己管理型(Self-managing)であり、誰が・どのように・何に取り組むかをチーム内で決定する</li>
          <li>1つのプロダクトに全体で集中する</li>
        </ul>

        <h3>3.2 3つのアカウンタビリティ比較表</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>アカウンタビリティ</th><th>主な責任</th><th>焦点</th></tr></thead>
            <tbody>
              <tr><td>プロダクトオーナー(Product Owner)</td><td>プロダクトの価値を最大化することに責任を持つ。プロダクトゴールの策定、プロダクトバックログの管理(作成・並び替え・透明性の確保)を担う</td><td>Why / What(何を作るべきか)</td></tr>
              <tr><td>スクラムマスター(Scrum Master)</td><td>スクラムの理論・プラクティスの理解とその実践をチームおよび組織全体に浸透させる責任を持つ。真のリーダーとしてスクラムチームと組織に奉仕する</td><td>How(どうスクラムを機能させるか)</td></tr>
              <tr><td>開発者(Developers)</td><td>スプリントごとに使用可能なインクリメントの一部を作成することにコミットする。計画作成、品質基準の遵守、日々の計画の適応を行う</td><td>How(どう作るか)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <p>Scrum Guide 2020 では「ロール(Role)」という用語が「アカウンタビリティ(Accountability)」に置き換えられました。役職や肩書きではなく「果たすべき説明責任」であることを意識してください。また、PO と SM を一人が兼任することは、価値の最大化とプロセスの規律の間の健全な緊張関係を損なうため避けるべきです。</p>
        </div>

        <h3>3.3 よくある誤解</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>誤解</th><th>正しい理解</th></tr></thead>
            <tbody>
              <tr><td>プロダクトオーナーは要求を右から左に伝える「代理人(プロキシPO)」でよい</td><td>プロダクトオーナーは価値最大化の意思決定権を持つ、単一の説明責任者でなければならない</td></tr>
              <tr><td>スクラムマスターはプロジェクトマネージャーやチームリーダーである</td><td>スクラムマスターには管理権限がなく、サーバントリーダーとしてチームと組織に奉仕する存在である</td></tr>
              <tr><td>開発者は「実装だけする人」であり、計画やプロセス改善には関与しなくてよい</td><td>開発者はスプリント計画、Done基準の遵守、日々の進捗適応すべてに責任を持つ自己管理チームの一員である</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <p>PSM I の試験では、「スクラムマスターがタスクを割り振る」「POが技術的なアーキテクチャを決定する」といった選択肢が典型的な誤答(ディストラクター)として頻出します。「自己管理型チーム」の原則に照らし、誰に決定権があるかを常に判断してください。</p>
        </div>
      </section>

      <!-- ===================== 4. Scrum Events ===================== -->
      <section id="scrum-events">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:calendar-event" aria-hidden="true" />SECTION 04</div>
        <h2>スクラムイベント</h2>

        <p>Scrum には無駄を減らし、透明性を確保するための5つのイベント(Sprint を含む)があります。すべてタイムボックス化されており、必要以上に長くならないよう設計されています。</p>

        <h3>4.0 スプリントサイクル全体図</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SPRINT_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">プロダクトバックログからインクリメントまでのスプリントサイクル</div>
        </div>

        <h3>4.1 スプリント(Sprint)</h3>
        <p>すべてのイベントを内包する「コンテナイベント」。1か月以内の固定された長さで、アイデアを価値に変換する一貫性のある機会を作ります。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>タイムボックス</td><td>1か月以内(通常1〜4週間、多くの現場では2週間)</td></tr>
              <tr><td>目的</td><td>一貫した学習と価値提供のリズムを作る</td></tr>
              <tr><td>重要な原則</td><td>スプリント中はスプリントゴールを危険にさらすような変更はしない / 品質目標を下げない / スコープはプロダクトオーナーと開発者の間で明確化し、再交渉し続けてよい</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>スプリント期間は固定し、途中で安易に延長・短縮しない(リズムの崩壊はチームの学習サイクルを乱す)</li>
            <li>スプリントゴールが陳腐化した(obsolete になった)場合にのみスプリントのキャンセルを検討する。キャンセルの権限を持つのはプロダクトオーナーだけである(頻発する場合は計画の粒度を見直す)</li>
            <li>スプリント開始・終了日を固定し、カレンダーで関係者に周知する</li>
          </ul>
        </div>

        <h3>4.2 スプリントプランニング(Sprint Planning)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>トピック</th><th>問い</th><th>主な参加者</th></tr></thead>
            <tbody>
              <tr><td>トピック1:Why(このスプリントが価値を持つ理由)</td><td>なぜこのスプリントは価値があるのか</td><td>プロダクトオーナーが提案し、チーム全体で合意</td></tr>
              <tr><td>トピック2:What(今スプリントで何を完成させるか)</td><td>何を「完成」とするのか</td><td>開発者が主導し、プロダクトオーナーと対話</td></tr>
              <tr><td>トピック3:How(選択した作業をどう成し遂げるか)</td><td>どのように作業を成し遂げるか</td><td>開発者が計画する</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>タイムボックスは1か月スプリントで最大8時間(期間が短ければ比例して短縮)</li>
            <li>「トピック1(Why)」を省略し、いきなりタスク分解から入らない(スプリントゴールなき計画は形骸化しやすい)</li>
            <li>スプリントゴールは1文で言い切れるレベルまでシンプルにする</li>
          </ul>
        </div>

        <h3>4.3 デイリースクラム(Daily Scrum)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>タイムボックス</td><td>15分</td></tr>
              <tr><td>目的</td><td>スプリントゴールに向けた進捗を検査し、翌24時間の計画を適応させる</td></tr>
              <tr><td>参加者</td><td>開発者(Scrum Guide 2020 以降、進行の義務は開発者にある)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>「昨日やったこと・今日やること・障害物」という3つの質問形式は必須ではなく、チームに合った形式に適応してよい</li>
            <li>スクラムマスターへの「進捗報告会」にしない(あくまでチームが自分たちのために行う検査と適応の場)</li>
            <li>議論が必要な話題は「駐車場(Parking Lot)」に出し、デイリースクラム後に関係者だけで別途話し合う</li>
          </ul>
        </div>

        <h3>4.4 スプリントレビュー(Sprint Review)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>タイムボックス</td><td>1か月スプリントで最大4時間</td></tr>
              <tr><td>目的</td><td>インクリメントを検査し、プロダクトバックログを適応させる。単なるデモではなく、ステークホルダーとの共同作業セッション</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>「発表会」ではなく「ワーキングセッション」として設計する(フィードバックを引き出す双方向の対話にする)</li>
            <li>市場動向・予算・想定タイムライン・競合状況など、プロダクトバックログを取り巻く状況も一緒に検査する</li>
            <li>完成していないものはデモしない(「完成の定義」を満たしたものだけを提示する)</li>
          </ul>
        </div>

        <h3>4.5 スプリントレトロスペクティブ(Sprint Retrospective)</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>タイムボックス</td><td>1か月スプリントで最大3時間</td></tr>
              <tr><td>目的</td><td>品質と効果を高める方法を計画する。個人・相互作用・プロセス・ツール・完成の定義について検査する</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>代表的なファシリテーション手法:KPT(Keep/Problem/Try)、Start-Stop-Continue、セイルボート(Sailboat)などを状況に応じて使い分ける</li>
            <li>出てきた改善アクションのうち最もインパクトが大きいものに絞り、次のスプリントバックログに組み込む</li>
            <li>「犯人探し」にせず、心理的安全性を保つグラウンドルールを最初に共有する</li>
          </ul>
        </div>
      </section>

      <!-- ===================== 5. Scrum Artifacts ===================== -->
      <section id="scrum-artifacts">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-text" aria-hidden="true" />SECTION 05</div>
        <h2>スクラムの作成物とコミットメント</h2>

        <p>各作成物には、進捗を測るための透明性を高める「コミットメント」が対応付けられています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>作成物</th><th>コミットメント</th><th>表すもの</th></tr></thead>
            <tbody>
              <tr><td>プロダクトバックログ</td><td>プロダクトゴール(Product Goal)</td><td>プロダクトの将来の状態、中長期の目的地</td></tr>
              <tr><td>スプリントバックログ</td><td>スプリントゴール(Sprint Goal)</td><td>このスプリントで達成する単一の目的</td></tr>
              <tr><td>インクリメント</td><td>完成の定義(Definition of Done)</td><td>成果物がプロダクトに求められる品質基準を満たしているかの検証可能な条件</td></tr>
            </tbody>
          </table>
        </div>

        <h3>5.1 プロダクトバックログ & プロダクトゴール</h3>
        <p>プロダクトバックログは、プロダクトを改善するために必要なものを含む、創発的で並び替え可能なリストです。プロダクトゴールはプロダクトバックログの長期的な目的地であり、次に達成すべき単一のターゲットです。</p>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <p>定期的なリファインメント(洗練)を通じて、直近のアイテムほど詳細で見積り可能な状態を保つ。プロダクトゴールを達成するまでは、次のゴールに着手しない。</p>
        </div>

        <h3>5.2 スプリントバックログ & スプリントゴール</h3>
        <p>スプリントバックログは、スプリントゴール(Why)・選択されたプロダクトバックログアイテム(What)・インクリメントを届けるための実行可能な計画(How)から構成されます。</p>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <p>スプリントバックログはスプリント中に開発者がリアルタイムで更新する「生きた計画」として扱う。作り込みすぎた事前計画に固執しない。</p>
        </div>

        <h3>5.3 インクリメント & 完成の定義</h3>
        <p>インクリメントは、これまでのすべてのインクリメントの合計であり、完成の定義を満たした具体的な足がかりです。複数のインクリメントがスプリント内で生まれることもあります。</p>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <p>組織全体の標準がある場合、完成の定義はそれを下回ってはならない(下回る場合は「リリース可能」と呼べない)。スクラムチームに完成の定義が存在しない場合、開発者がプロダクトに適した完成の定義を作成しなければならない。</p>
        </div>
      </section>

      <!-- ===================== 6. Scrum Master Role ===================== -->
      <section id="scrum-master-role">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:compass" aria-hidden="true" />SECTION 06</div>
        <h2>スクラムマスターの役割とサーバントリーダーシップ</h2>

        <p>PSM 試験群の核心テーマです。スクラムマスターは、スクラムの理論とプラクティスの理解と実践を、スクラムチームおよび組織全体に確立する責任を負う<strong>真のリーダー(true leader)</strong>と定義されます。管理権限を持つマネージャーではなく、奉仕を通じて影響力を発揮する存在です。</p>

        <h3>6.1 3つの奉仕対象</h3>
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SM_SERVICE_AREAS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">スクラムマスターが奉仕する3つの対象:スクラムチーム・プロダクトオーナー・組織</div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>奉仕対象</th><th>具体的な支援内容</th></tr></thead>
            <tbody>
              <tr><td>スクラムチーム</td><td>自己管理を指導する / 障害物を取り除く / すべてのスクラムイベントが前向きかつ生産的でタイムボックス内に収まるよう支援する</td></tr>
              <tr><td>プロダクトオーナー</td><td>効果的なプロダクトゴールの定義とプロダクトバックログ管理の方法を探すことを支援する / 明確で簡潔なプロダクトバックログアイテムの必要性をチームに理解してもらう / 長期的なプロダクト計画を組織内の文脈で理解してもらう</td></tr>
              <tr><td>組織</td><td>組織へのスクラム導入を指導・トレーニング・コーチする / 組織におけるスクラムの実施方法を計画・助言する / ステークホルダーとスクラムチームの間の障壁を取り除く</td></tr>
            </tbody>
          </table>
        </div>

        <h3>6.2 サーバントリーダーシップとは</h3>
        <p>サーバントリーダーシップとは「まず奉仕し、その結果として導く」という考え方です。地位や権限による統制ではなく、信頼・尊敬・影響力によってチームと組織を動かします。アジャイル宣言の背後にある原則のうち、「動機づけられた人々を中心にプロジェクトを構築する。彼らが必要とする環境と支援を与え、仕事が無事終わるまで彼らを信頼する」という一節は、この考え方と深く結びついています。</p>

        <h3>6.3 スクラムマスターの8つのスタンス</h3>
        <p>Scrum.org の Professional Scrum Trainer である Barry Overeem が提唱した、実務上の振る舞いの型が「8つのスタンス」です。公式試験の出題範囲そのものではありませんが、Scrum.org のリソースとして公開されており、PSM II・III で問われる「状況に応じた振る舞いの使い分け」を理解する上で広く参照されています。</p>

        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SM_STANCES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
          <div class="diagram-caption">スクラムマスターの8つのスタンス(Barry Overeem, Scrum.org)</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>スタンス</th><th>発揮される場面の例</th><th>ベストプラクティス</th></tr></thead>
            <tbody>
              <tr><td>サーバントリーダー</td><td>チームが困難な決断を迫られている場面</td><td>自分の意見を押し付けず、チームが最善の判断を下せるよう支援に徹する</td></tr>
              <tr><td>ファシリテーター</td><td>スプリントレビューやレトロスペクティブの進行</td><td>中立的な立場を保ち、特定の意見に偏らない進行技法(サイレントブレインストーミングなど)を使う</td></tr>
              <tr><td>コーチ</td><td>チームが同じ問題を繰り返している場面</td><td>答えを与えず、問いかけによって気づきを引き出す(コーチングとティーチングを混同しない)</td></tr>
              <tr><td>マネージャー</td><td>チームの自己組織化の境界を定める必要がある場面</td><td>「何を管理し、何をチームに委ねるか」の境界を明確にし、過干渉を避ける</td></tr>
              <tr><td>メンター</td><td>経験の浅いメンバーがアジャイルプラクティスに悩んでいる場面</td><td>自身の経験を一方的に語らず、相手の状況に合わせて選択的に共有する</td></tr>
              <tr><td>ティーチャー</td><td>組織全体がスクラムの原則を誤解している場面</td><td>Scrum Guide に立ち返り、具体例を用いて経験主義の考え方を分かりやすく伝える</td></tr>
              <tr><td>障害物の除去者</td><td>チーム外の要因(承認プロセスの遅延など)で進捗が止まっている場面</td><td>チームが自力で解決できる障害物とスクラムマスターが介入すべき障害物を見極める</td></tr>
              <tr><td>チェンジエージェント</td><td>組織構造がスクラムチームの自己管理を阻害している場面</td><td>一足飛びの改革を狙わず、影響力の輪の中から小さな変化を積み重ねる</td></tr>
            </tbody>
          </table>
        </div>

        <h3>6.4 ファシリテーション技法のベストプラクティス</h3>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li><strong>発散と収束を意識する</strong>: ブレインストーミングなど意見を広げるフェーズと、優先順位付けなど収束させるフェーズを明確に分ける</li>
            <li><strong>サイレントスタート</strong>: 発言力の強い人の意見に引きずられないよう、まず個人で書き出す時間を設けてから共有する</li>
            <li><strong>タイムボックスの可視化</strong>: 残り時間をタイマーで共有し、議論の停滞を防ぐ</li>
            <li><strong>決定事項の記録</strong>: 合意した内容とネクストアクションを必ず明文化し、次のイベントで検査できるようにする</li>
          </ul>
        </div>

        <h3>6.5 コーチング・メンタリング・ティーチングの違い</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>アプローチ</th><th>焦点</th><th>進め方</th></tr></thead>
            <tbody>
              <tr><td>コーチング(Coaching)</td><td>相手の中にある答えを引き出す</td><td>問いかけを中心とし、直接的な助言は控える</td></tr>
              <tr><td>メンタリング(Mentoring)</td><td>自身の経験を伝える</td><td>実体験や知見を共有し、相手の意思決定を支援する</td></tr>
              <tr><td>ティーチング(Teaching)</td><td>知識やスキルを教える</td><td>明確な答えのある事柄について体系的に説明する</td></tr>
            </tbody>
          </table>
        </div>

        <h3>6.6 障害物(Impediment)除去のベストプラクティス</h3>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ol>
            <li><strong>可視化する</strong>: 障害物リストを作り、チーム全員が状況を把握できるようにする</li>
            <li><strong>切り分ける</strong>: チームが自力で解決できるものと、スクラムマスターの介入が必要なものを区別する</li>
            <li><strong>優先順位をつける</strong>: スプリントゴールの達成に対するインパクトの大きさで対応順を決める</li>
            <li><strong>エスカレーションする</strong>: 組織的な障害物は、権限を持つステークホルダーへ適切に働きかける</li>
            <li><strong>再発防止を検討する</strong>: レトロスペクティブで根本原因を扱い、同じ障害物が繰り返し発生しない仕組みを作る</li>
          </ol>
        </div>
      </section>

      <!-- ===================== 7. Anti-patterns ===================== -->
      <section id="anti-patterns">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 07</div>
        <h2>よくあるアンチパターンと対処法</h2>

        <p>PSM II・III では、以下のようなアンチパターンをシナリオ問題の中で見抜けるかが問われます。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>アンチパターン</th><th>症状</th><th>スクラムマスターの対処</th></tr></thead>
            <tbody>
              <tr><td>ScrumBut</td><td>「Scrumをやっているが、○○の部分だけは違う」という部分適用により経験主義が機能しなくなる状態</td><td>なぜそのプラクティスが必要なのかを説明し、逸脱によるリスクを透明化する</td></tr>
              <tr><td>Zombie Scrum</td><td>イベントの形式だけをこなし、検査と適応による実質的な価値創出が起きていない状態</td><td>各イベントの「目的」に立ち返り、形骸化した儀式ではなく本来の意図を取り戻す</td></tr>
              <tr><td>ウォーターマロン・ステータス</td><td>表面上(緑)は順調に見えるが、内部(赤)は問題だらけの報告</td><td>定性的な自己申告だけでなく、実際のインクリメントや検証可能な指標で進捗を確認する</td></tr>
              <tr><td>ミニウォーターフォール・スプリント</td><td>スプリント内で「設計→開発→テスト」を順番に行い、最終盤にまとめてテストする</td><td>スプリント内で継続的に統合・テストを行う技術プラクティス(CI/CDなど)の導入を支援する</td></tr>
              <tr><td>スクラムマスター=書記・秘書化</td><td>議事録係やスケジュール調整係に終始し、本来のコーチング・ファシリテーションの役割を果たしていない</td><td>自身の役割を「サーバントリーダー」として再定義し、雑務は他のメンバーと分担する</td></tr>
              <tr><td>プロキシプロダクトオーナー</td><td>POが意思決定権を持たず、上位の承認待ちで判断が遅延する</td><td>POが実際に意思決定できる権限を持てるよう、組織に働きかける</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== 8. PSM I Exam Prep ===================== -->
      <section id="psm1-exam-prep">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 08</div>
        <h2>PSM I 試験対策</h2>

        <h3>8.1 試験概要</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>受験料</td><td>$200 USD/回</td></tr>
              <tr><td>制限時間</td><td>60分</td></tr>
              <tr><td>問題数</td><td>80問</td></tr>
              <tr><td>出題形式</td><td>択一式・複数選択・True/False</td></tr>
              <tr><td>合格基準</td><td>85%(68/80問)</td></tr>
              <tr><td>難易度</td><td>基礎(Fundamental)</td></tr>
              <tr><td>主な参照資料</td><td>Scrum Guide 2020(全13ページ)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
          <ul>
            <li><a href="https://www.scrum.org/assessments/professional-scrum-master-i-certification" target="_blank" rel="noopener">PSM I 公式ページ</a></li>
          </ul>
        </div>

        <h3>8.2 主な出題範囲</h3>
        <ul>
          <li>スクラムの理論(経験主義・リーン思考・3本柱・5つの価値基準)</li>
          <li>スクラムチームとアカウンタビリティ(PO・SM・開発者)</li>
          <li>5つのスクラムイベントの目的・タイムボックス・参加者</li>
          <li>3つの作成物と3つのコミットメント</li>
          <li>スクラムマスターのアカウンタビリティと組織への奉仕</li>
          <li>Scrum Guide 内の正確な用語・定義(「must」と「should」の違いに注意)</li>
        </ul>

        <h3>8.3 出題傾向の例(オリジナル作成の演習問題)</h3>
        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>以下は本ガイド独自に作成した練習問題であり、実際の試験問題そのものではありません。出題の「雰囲気」をつかむための例としてご利用ください。</p>
        </div>
        <p><strong>Q. スプリントレビューの説明として最も適切なものはどれか(複数選択)。</strong></p>
        <ul>
          <li>A. プロダクトオーナーだけが参加する社内報告会である</li>
          <li>B. インクリメントを検査し、プロダクトバックログを適応させるための共同作業セッションである</li>
          <li>C. 未完成の作業も進捗として発表してよい</li>
          <li>D. スプリントレビューの結果、プロダクトバックログが更新されることがある</li>
        </ul>
        <p><strong>解答例と解説:</strong> 正解は B と D です。スプリントレビューは単なる報告会ではなく、ステークホルダーとスクラムチームが共同で検査と適応を行う場です。完成の定義を満たしていない作業物は提示すべきではありません(Cは誤り)。</p>

        <h3>8.4 学習ステップ(5ステップ)</h3>
        <ol>
          <li><strong>Scrum Guide 2020 を通読する</strong>: まずは全体像を掴むために最初から最後まで一読する</li>
          <li><strong>精読して用語を正確に覚える</strong>: 「must」「should」「may」などの助動詞のニュアンスの違いに注意しながら再読する</li>
          <li><strong>Scrum Open(無料の練習問題)を解く</strong>: Scrum.org が無料公開している Scrum Open で理解度を確認する</li>
          <li><strong>間違えた箇所を Scrum Guide に立ち返って確認する</strong>: 暗記でなく、なぜその答えになるのかを Guide の文言で確認する</li>
          <li><strong>時間配分の練習をする</strong>: 80問を60分で解くため、1問あたり45秒程度のペース感覚を模擬試験で養う</li>
        </ol>

        <h3>8.5 受験当日のベストプラクティス</h3>
        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:check" aria-hidden="true" />ベストプラクティス</div>
          <ul>
            <li>迷った問題は一旦保留し、確実に分かる問題から解答して時間切れを防ぐ</li>
            <li>「best」「most appropriate」のような相対評価を求める設問では、消去法で明確に誤っている選択肢を除外する</li>
            <li>複数選択(Multiple Answer)は、選択数が指定される場合があるため見落とさない</li>
            <li>減点方式ではないため、分からない問題でも必ず何かを選択して解答する</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height));
  background: var(--color-canvas);
  color: var(--color-ink);
}

/* Sidebar Toggle (Mobile) */
.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 30;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-indigo);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.sidebar-overlay {
  display: none;
}

/* Sidebar */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--color-paper);
  border-right: 1px solid var(--color-border);
  padding: 32px 20px;
  position: sticky;
  top: var(--global-nav-height);
  height: calc(100vh - var(--global-nav-height));
  overflow-y: auto;
  z-index: 20;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}

.seal {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.brand-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 12px;
  color: var(--color-ink-soft);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 4px;
}

.nav-group-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-ink-faint);
  margin-top: 20px;
  margin-bottom: 8px;
  padding-left: 12px;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-ink-soft);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
  line-height: 1.4;
}

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) {
  font-size: 16px;
  flex-shrink: 0;
}

.sidebar-nav a:hover {
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.sidebar-nav a.active {
  background: var(--color-gold-subtle);
  color: var(--color-gold-dark, #8a5e1a);
  font-weight: 600;
}

/* Main Content */
.main-content {
  flex: 1;
  min-width: 0;
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 40px 96px;
}

/* Hero */
.hero {
  margin-bottom: 48px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--color-border);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-gold-dark, #8a5e1a);
  background: var(--color-gold-subtle);
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 16px;
}

.hero h1 {
  font-size: 32px;
  font-weight: 800;
  color: var(--color-ink);
  line-height: 1.25;
  margin: 0 0 12px;
}

.hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft);
  line-height: 1.6;
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  background: var(--color-paper);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-indigo);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--color-ink-soft);
  line-height: 1.3;
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
  font-size: 14px;
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

/* Sections */
section {
  margin-bottom: 64px;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-ink);
  margin: 32px 0 12px;
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-ink);
  margin: 0 0 16px;
}

ul, ol {
  padding-left: 24px;
  margin: 0 0 16px;
}

li {
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 8px;
  color: var(--color-ink);
}

/* Tables */
.table-wrap {
  overflow-x: auto;
  max-width: 100%;
  margin: 16px 0 24px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

th {
  background: var(--color-paper-raised);
  font-weight: 600;
  color: var(--color-ink);
  white-space: nowrap;
}

tr:last-child td {
  border-bottom: none;
}

/* Callouts */
.callout {
  border-radius: 8px;
  padding: 16px 20px;
  margin: 20px 0 24px;
  font-size: 14px;
  line-height: 1.6;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
}

.callout.source {
  background: var(--color-paper-raised);
  border-left: 4px solid var(--color-indigo);
}

.callout.source .callout-title {
  color: var(--color-indigo);
}

.callout.practice {
  background: var(--color-gold-subtle);
  border-left: 4px solid var(--color-gold-dark, #8a5e1a);
}

.callout.practice .callout-title {
  color: var(--color-gold-dark, #8a5e1a);
}

.callout.note {
  background: var(--color-info-bg);
  border-left: 4px solid var(--color-info-border);
}

.callout.note .callout-title {
  color: var(--color-info-text);
}

.callout p:last-child {
  margin-bottom: 0;
}

.callout ul {
  margin: 0;
  padding-left: 20px;
}

.callout li:last-child {
  margin-bottom: 0;
}

/* Mermaid wrap */
.mermaid-wrap {
  background: var(--color-paper);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px 16px;
  margin: 24px 0;
  text-align: center;
}

.diagram-caption {
  font-size: 13px;
  color: var(--color-ink-soft);
  margin-top: 12px;
}

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 14px;
  padding: 24px 0;
}

/* Responsive */
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
    padding: 32px 24px 80px;
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
</style>
