<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "chapter-intro",
  "what-is-organizational-agility",
  "systems-thinking-cynefin",
  "organizational-culture",
  "team-topologies",
  "change-management",
  "scaling-agile",
  "learning-organization",
  "measuring-agility",
  "leader-role-modeling",
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
  title:
    "CAL 1™ 学習ガイド 第4章 Leading Agile Organizations(アジャイル組織のリード) | 非公式解説",
  description:
    "Scrum Alliance Certified Agile Leader® 1(CAL 1™)の学習領域「Leading Agile Organizations」を初学者向けに解説する非公式ガイド。組織アジリティ、Cynefin、組織文化、Team Topologies、チェンジマネジメント、スケーリングを網羅。",
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

const DIAGRAM_CHAPTER_OVERVIEW = `flowchart LR
C1["第1章 The Case for Agile Leadership"]
C2["第2章 Agile Leadership in Action"]
C3["第3章 Leading Agile Teams"]
C4["第4章 Leading Agile Organizations"]
C1 --> C2 --> C3 --> C4
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class C1,C2,C3 box;
class C4 hub;`;

const DIAGRAM_SAFE_ORG_AGILITY = `flowchart TB
OA["組織アジリティ Organizational Agility"]
D1["Lean-Thinking People and Agile Teams リーンな人材とアジャイルチーム"]
D2["Lean Business Operations リーンなビジネスオペレーション"]
D3["Strategy Agility 戦略のアジリティ"]
OUT["ビジネスアジリティ 市場の変化に俊敏に対応できる組織"]
OA --> D1
OA --> D2
OA --> D3
D1 --> OUT
D2 --> OUT
D3 --> OUT
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1,D2,D3 box;
class OA hub;
class OUT done;`;

const DIAGRAM_CYNEFIN_FRAMEWORK = `flowchart TB
START["状況を見極める"]
S1["Clear・Simple 単純 因果関係が明白"]
S2["Complicated 煩雑 因果関係は分析すれば分かる"]
S3["Complex 複雑 因果関係は事後にしか分からない"]
S4["Chaotic カオス 因果関係が存在しない、緊急事態"]
S5["Disorder 混沌 どの領域か判断がつかない状態"]
R1["Sense→Categorize→Respond 把握し分類し対応する ベストプラクティスを適用"]
R2["Sense→Analyze→Respond 把握し分析し対応する 専門家に相談しグッドプラクティスを適用"]
R3["Probe→Sense→Respond 小さく試し、結果を見て、対応する 安全に失敗できる実験を行う"]
R4["Act→Sense→Respond まず行動し、把握し、対応する 混乱を止め、秩序を取り戻す"]
START --> S1 --> R1
START --> S2 --> R2
START --> S3 --> R3
START --> S4 --> R4
START --> S5
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,R1,R2,R3,R4 box;
class START hub;
class S5 done;`;

const DIAGRAM_SCHEIN_CULTURE_LEVELS = `flowchart TB
A["Level 1 Artifacts 人工物 目に見えるもの オフィスのレイアウト、服装規定、使われている言葉、儀式や慣習"]
V["Level 2 Espoused Values 標榜される価値観 公式に語られるもの ミッション、行動指針、会議で語られる理想"]
U["Level 3 Basic Underlying Assumptions 根底にある前提 無意識で当たり前とされているもの 本当は何が評価され、何がタブーとされているか"]
A -->|"観察できるが解釈は難しい"| V
V -->|"言葉と実際の行動が一致しているとは限らない"| U
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A box;
class V hub;
class U done;`;

const DIAGRAM_TEAM_TOPOLOGIES = `flowchart TB
subgraph TEAMS["4つの基本チームタイプ"]
direction TB
SA["Stream-aligned Team 特定の価値の流れ プロダクト・サービスを エンドツーエンドで担当する"]
PT["Platform Team 他チームが使う セルフサービス基盤を提供する"]
ET["Enabling Team 専門知識のギャップを埋め、他チームの自律性を高める"]
CS["Complicated-Subsystem Team 高度な専門性が必要な サブシステムを担当する"]
end
SA -.->|"Collaboration 短期集中で協働する"| PT
SA -.->|"X-as-a-Service サービスとして利用する"| PT
ET -.->|"Facilitating コーチング・支援を行う"| SA
SA -.->|"X-as-a-Service サービスとして利用する"| CS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PT,ET,CS box;
class SA hub;`;

const DIAGRAM_KOTTER_EIGHT_STEPS = `flowchart TB
K1["1. 危機意識を高める Create a Sense of Urgency"]
K2["2. 変革を推進する連帯チームを作る Build a Guiding Coalition"]
K3["3. ビジョンと戦略を立てる Form a Vision and Strategy"]
K4["4. 変革のビジョンを周知徹底する Communicate the Vision"]
K5["5. 行動しやすい環境を整える Empower Broad-based Action"]
K6["6. 短期的な成果を生む Generate Short-term Wins"]
K7["7. 成果を活かし、さらなる変革を推進する Sustain Acceleration"]
K8["8. 新しい文化を根づかせる Institutionalize Change into the Culture"]
K1 --> K2 --> K3 --> K4 --> K5 --> K6 --> K7 --> K8
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class K1,K2,K3,K4,K5,K6,K7 box;
class K8 done;`;

const DIAGRAM_SCALING_DECISION_TREE = `flowchart TB
Q1{"本当に今、スケーリングが必要か チーム数・依存関係の実態は"}
Q2{"チームの成熟度は スケーリングに耐えられるか 基本のアジャイル・スクラムが チーム内で機能しているか"}
Q3{"どのくらいの規模で、どんな種類の依存関係が存在するか"}
R1["まずはチーム内の基礎を固める"]
R2["軽量な調整の仕組み Scrum of Scrums 等から始める"]
R3["文脈に合わせてフレームワークを選択・組み合わせる"]
Q1 -->|"必要性が不明確"| R1
Q1 -->|"必要性が明確"| Q2
Q2 -->|"未成熟"| R1
Q2 -->|"成熟している"| Q3
Q3 --> R2
Q3 --> R3
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Q2,Q3 box;
class Q1 hub;
class R1,R2,R3 done;`;

const DIAGRAM_SENGE_LEARNING_DISCIPLINES = `flowchart TB
ST["Systems Thinking システム思考 統合の要となる第5の規律"]
PM["Personal Mastery 自己マスタリー"]
MM["Mental Models メンタルモデル"]
SV["Shared Vision 共有ビジョン"]
TL["Team Learning チーム学習"]
PM --> ST
MM --> ST
SV --> ST
TL --> ST
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PM,MM,SV,TL box;
class ST hub;`;

const DIAGRAM_LEADER_ROLE_MODELING = `flowchart LR
B["リーダーの行動 発言・意思決定・評価"]
O["観察される 組織メンバーによる観察"]
N["規範の形成 「ここではこうするものだ」という暗黙のルールが生まれる"]
C["文化として定着 Basic Underlying Assumption 化"]
B --> O --> N --> C
C -.->|"次の行動の基準になる"| B
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class O,N box;
class B hub;
class C done;`;

const DIAGRAM_CAL1_FULL_OVERVIEW = `flowchart TB
subgraph CH1["第1章 The Case for Agile Leadership"]
direction TB
c1["なぜ今アジャイルリーダーシップが必要とされるのか"]
end
subgraph CH2["第2章 Agile Leadership in Action"]
direction TB
c2["アジャイルリーダーとしてのマインドセットと行動"]
end
subgraph CH3["第3章 Leading Agile Teams"]
direction TB
c3["1つのチームを機能させるサーバントリーダーシップ・心理的安全性"]
end
subgraph CH4["第4章 Leading Agile Organizations"]
direction TB
c4["組織全体というシステムをアジャイルにリードする"]
end
CH1 --> CH2 --> CH3 --> CH4
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class CH1,CH2,CH3 box;
class CH4 hub;`;
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

    <nav id="sidebar" class="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4" />
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1" />
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="brand-text">
          <div class="brand-title">CAL 1™ 学習ガイド</div>
          <div class="brand-subtitle">第4章 組織のリード</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li>
          <a href="#chapter-intro" :class="{ active: activeId === 'chapter-intro' }" @click="closeSidebar">
            <Icon name="tabler:map-2" />0. この章について
          </a>
        </li>
        <li>
          <a href="#what-is-organizational-agility" :class="{ active: activeId === 'what-is-organizational-agility' }" @click="closeSidebar">
            <Icon name="tabler:building-bank" />1. 組織アジリティとは何か
          </a>
        </li>
        <li>
          <a href="#systems-thinking-cynefin" :class="{ active: activeId === 'systems-thinking-cynefin' }" @click="closeSidebar">
            <Icon name="tabler:git-branch" />2. システム思考とCynefin
          </a>
        </li>
        <li>
          <a href="#organizational-culture" :class="{ active: activeId === 'organizational-culture' }" @click="closeSidebar">
            <Icon name="tabler:users" />3. 組織文化を理解する
          </a>
        </li>
        <li>
          <a href="#team-topologies" :class="{ active: activeId === 'team-topologies' }" @click="closeSidebar">
            <Icon name="tabler:sitemap" />4. 組織構造とチームトポロジー
          </a>
        </li>
        <li>
          <a href="#change-management" :class="{ active: activeId === 'change-management' }" @click="closeSidebar">
            <Icon name="tabler:refresh" />5. 変革をリードする
          </a>
        </li>
        <li>
          <a href="#scaling-agile" :class="{ active: activeId === 'scaling-agile' }" @click="closeSidebar">
            <Icon name="tabler:stack-2" />6. アジャイルのスケーリング
          </a>
        </li>
        <li>
          <a href="#learning-organization" :class="{ active: activeId === 'learning-organization' }" @click="closeSidebar">
            <Icon name="tabler:book-2" />7. 学習する組織へ
          </a>
        </li>
        <li>
          <a href="#measuring-agility" :class="{ active: activeId === 'measuring-agility' }" @click="closeSidebar">
            <Icon name="tabler:chart-pie" />8. 組織アジリティを測定する
          </a>
        </li>
        <li>
          <a href="#leader-role-modeling" :class="{ active: activeId === 'leader-role-modeling' }" @click="closeSidebar">
            <Icon name="tabler:user-star" />9. リーダーとしての実践
          </a>
        </li>
        <li>
          <a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar">
            <Icon name="tabler:flag-3" />10. まとめ
          </a>
        </li>
        <li>
          <a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar">
            <Icon name="tabler:link" />11. 参考文献・出典一覧
          </a>
        </li>
      </ul>
    </nav>

    <main id="main-content" class="main-content" tabindex="-1">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" />Scrum Alliance CAL 1™ 非公式学習ガイド
        </div>
        <h1>第4章: Leading Agile Organizations(アジャイル組織のリード)</h1>
        <p class="hero-lede">
          Scrum Alliance の Certified Agile Leader® 1(CAL 1™)の4つの学習領域のうち、最終章「4. Leading Agile Organizations(アジャイル組織のリード)」に関する非公式の学習ログです。フローチャートは Mermaid、図解・比較表は表組みで統一しています。
        </p>

        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-number">4/4</div>
            <div class="stat-label">CAL 1学習領域のうち最終章</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">セクション構成</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">10</div>
            <div class="stat-label">Mermaid 図解</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">19</div>
            <div class="stat-label">参考文献リンク</div>
          </div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ページは教育・学習目的で作成された非公式の解説資料であり、Scrum Alliance の公式教材ではありません。正確な情報は必ず<a href="https://www.scrumalliance.org/get-certified/agile-leader/cal-1" target="_blank" rel="noopener">公式サイト</a>および認定トレーナーが提供する情報をご確認ください。</span>
        </div>
      </div>

      <section id="chapter-intro">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:map-2" />SECTION 00
        </div>
        <h2>この章について</h2>

        <p>CAL 1(Certified Agile Leader® 1)は、4つの学習領域(Learning Objective Areas)で構成されています。本ガイドシリーズではこれまでに以下の3章を扱ってきました。</p>

        <ol>
          <li>The Case for Agile Leadership(アジャイルリーダーシップの必要性)</li>
          <li>Agile Leadership in Action(実践におけるアジャイルリーダーシップ)</li>
          <li>Leading Agile Teams(アジャイルチームのリード) — サーバントリーダーシップ、Tuckman モデル、心理的安全性、Five Dysfunctions など</li>
        </ol>

        <p>第4章「Leading Agile Organizations」は、視座をチームレベルからエンタープライズ(組織全体)レベルへと引き上げます。第3章で学んだ「1つのチームを機能させる力」を、複数チーム・複数部門・組織文化・組織構造という、より大きく複雑なシステムに適用するための考え方とツールを扱います。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CHAPTER_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">CAL 1 全4学習領域の流れと第4章の位置づけ</div>
        </div>

        <p>Scrum Alliance の公式ページでは、CAL 1 全体を通じて「変化の激しい環境に適応できる組織文化を形成し、リスクを抑えながら投資対効果を高める、卓越したリーダーへと成長すること」が目的として説明されています。第4章はその中でも特に、個人やチームを超えた「組織というシステム」をどう見て、どうリードするかに焦点を当てる領域です。</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p><strong>本章の位置づけについて。</strong>CAL 1 は前提条件のない入門レベルの認定であり、Scrum Alliance は本コースの後続として、より組織変革の実務に踏み込む CAL 2(Agile Leader Track)を用意しています。本章はあくまで CAL 1 としての「組織アジリティの基礎的な地図」を提供するものであり、各フレームワークの詳細な導入手順は CAL 2 やより専門的な学習リソースで扱われる範囲です。</p>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://www.scrumalliance.org/get-certified/agile-leader/cal-1" target="_blank" rel="noopener">CAL 1 | Scrum Alliance</a></li>
            <li><a href="https://drive.google.com/file/d/1LpDNidfA_r6J2wFvgRhIWfPw_wEnqjiO/view" target="_blank" rel="noopener">CAL 1 Learning Objectives(公式PDF)</a></li>
          </ul>
        </div>

        <h3>本章で学ぶこと(ステップ一覧)</h3>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ステップ</th>
                <th>テーマ</th>
                <th>一言で言うと</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>組織アジリティとは何か</td>
                <td>「アジャイルなチーム」の集合が、自動的に「アジャイルな組織」になるわけではない</td>
              </tr>
              <tr>
                <td>2</td>
                <td>システム思考 / Cynefin</td>
                <td>問題の性質(単純・煩雑・複雑・カオス)によってリーダーの取るべき行動は変わる</td>
              </tr>
              <tr>
                <td>3</td>
                <td>組織文化</td>
                <td>文化は「作る」ものではなく、行動の積み重ねの結果として「立ち上がる」もの</td>
              </tr>
              <tr>
                <td>4</td>
                <td>組織構造 / チームトポロジー</td>
                <td>組織図はソフトウェアやサービスの構造に反映される(Conway の法則)</td>
              </tr>
              <tr>
                <td>5</td>
                <td>チェンジマネジメント</td>
                <td>変革には「論理(計画)」と「感情(人)」の両輪が必要</td>
              </tr>
              <tr>
                <td>6</td>
                <td>スケーリング</td>
                <td>フレームワークはゴールではなく、コンテキストに応じた手段の1つ</td>
              </tr>
              <tr>
                <td>7</td>
                <td>学習する組織</td>
                <td>心理的安全性とふりかえりの文化をチームから組織全体へ広げる</td>
              </tr>
              <tr>
                <td>8</td>
                <td>測定</td>
                <td>アウトプットではなくアウトカムを測る</td>
              </tr>
              <tr>
                <td>9</td>
                <td>ロールモデリング</td>
                <td>リーダーの行動そのものが、組織文化の最も強力な「アーティファクト」になる</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="what-is-organizational-agility">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:building-bank" />SECTION 01
        </div>
        <h2>組織アジリティ(Organizational Agility)とは何か</h2>

        <h3>定義: チームのアジャイルと組織のアジャイルは別物</h3>

        <p>多くの組織は「スクラムチームを増やせば、組織全体がアジャイルになる」と考えがちです。しかし実際には、開発チームがどれだけアジャイルに働いても、予算編成が年次のウォーターフォールのままだったり、人事評価が個人の目標達成だけを見ていたり、意思決定に何ヶ月もかかる稟議プロセスが残っていたりすると、組織全体としての適応力(アジリティ)は上がりません。</p>

        <p>これを説明する代表的な考え方が、非営利研究機関 Business Agility Institute(BAI)が提唱する<strong>Domains of Business Agility(ビジネスアジリティの領域モデル)</strong>です。このモデルは、組織のアジリティを「顧客」を中心に据えたうえで、複数の相互に関連し合う領域(リーダーシップ / 人材マネジメント / 組織構造・プロセス / 戦略など)にまたがるものとして捉えます。ポイントは、どれか1つの領域だけを改善しても組織全体のアジリティは上がらず、複数の領域が連動して初めて意味のある変化が生まれるという点です。</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p><strong>初学者向けのポイント。</strong>「アジャイル」を doing(スクラムイベントをやっているか)と being(適応的なマインドセットが根づいているか)の両面で捉える必要があります。フレームワークを導入する「doing」だけでは、組織アジリティは実現しません。</p>
        </div>

        <h3>SAFe における Organizational Agility の3つの側面</h3>

        <p>Scaled Agile Framework(SAFe)も、Business Agility を実現するための中核コンピテンシーの1つとして「Organizational Agility(組織アジリティ)」を定義しています。SAFe はこれを次の3つの側面(ディメンション)で説明しています。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SAFE_ORG_AGILITY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">SAFe が定義する組織アジリティの3つの側面とビジネスアジリティへの流れ</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>側面</th>
                <th>内容</th>
                <th>具体例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lean-Thinking People and Agile Teams</td>
                <td>ソリューション提供に関わる全員がリーン / アジャイルの価値観・原則・プラクティスを身につけている状態</td>
                <td>エンジニアだけでなく営業・法務・人事もアジャイルの原則を理解している</td>
              </tr>
              <tr>
                <td>Lean Business Operations</td>
                <td>業務プロセス(予算編成・調達・法務レビューなど)自体をリーン原則で継続的に改善する</td>
                <td>年次予算を四半期ごとの軽量な見直しに変える</td>
              </tr>
              <tr>
                <td>Strategy Agility</td>
                <td>市場の変化を素早く察知し、必要であれば戦略そのものを機動的に転換できる</td>
                <td>四半期ごとに戦略の前提を検証し、必要なら方向転換(ピボット)する</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>チームレベルの改善だけでなく、予算編成・調達・人事評価・法務レビューといった「支援系プロセス」もリーン原則で見直す対象に含める。</li>
            <li>経営レベルの戦略レビューの頻度を年1回から四半期ごとに見直すなど、意思決定サイクルを短くする。</li>
            <li>「アジャイルの導入状況」ではなく「顧客への価値提供までのリードタイム」を組織横断で可視化する。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://framework.scaledagile.com/organizational-agility" target="_blank" rel="noopener">Organizational Agility (OA) | Scaled Agile Framework</a></li>
            <li><a href="https://businessagility.institute/domains/overview" target="_blank" rel="noopener">The Domains of Business Agility | Business Agility Institute</a></li>
            <li><a href="https://cio-wiki.org/wiki/Business_Agility" target="_blank" rel="noopener">Business Agility 概説 | CIO Wiki</a></li>
          </ul>
        </div>
      </section>

      <section id="systems-thinking-cynefin">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:git-branch" />SECTION 02
        </div>
        <h2>システム思考で組織をとらえる: Cynefin フレームワーク</h2>

        <h3>なぜシステム思考が必要か</h3>

        <p>組織を「個々の部品(部署・役職)の集合」として見るのではなく、「相互に影響し合う要素からなる1つのシステム」として見る考え方を<strong>システム思考(Systems Thinking)</strong>と呼びます。MIT の Peter Senge は、著書『The Fifth Discipline(学習する組織)』の中で、システム思考を組織学習を支える中核的な規律(discipline)として位置づけました。</p>

        <p>システム思考が重要である理由はシンプルです。組織で起きる問題の多くは、特定の個人の能力不足ではなく、構造(インセンティブ設計・承認フロー・部門間のインターフェースなど)が生み出しています。構造に手を付けずに個人を叱咤激励しても、根本的な問題は解決しません。</p>

        <h3>Cynefin フレームワーク: 問題の性質を見極める</h3>

        <p>システム思考をリーダーの意思決定に応用したツールの1つが、David Snowden と Mary Boone が Harvard Business Review 誌上で発表した<strong>Cynefin フレームワーク(A Leader's Framework for Decision Making)</strong>です。Cynefin(クネヴィン)はウェールズ語で「生息地」を意味する言葉で、置かれている状況(コンテキスト)に応じてリーダーが取るべき行動が異なることを示します。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CYNEFIN_FRAMEWORK" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Cynefin フレームワークの5領域とリーダーの行動パターン</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>領域</th>
                <th>特徴</th>
                <th>リーダーの行動パターン</th>
                <th>よくある失敗</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clear(単純)</td>
                <td>ベストプラクティスが存在し、誰が見ても因果関係が明らか</td>
                <td>把握 → 分類 → 対応(Sense-Categorize-Respond)</td>
                <td>過信し、状況が複雑化していることに気づかない</td>
              </tr>
              <tr>
                <td>Complicated(煩雑)</td>
                <td>因果関係はあるが、専門知識による分析が必要</td>
                <td>把握 → 分析 → 対応(Sense-Analyze-Respond)</td>
                <td>唯一の正解を専門家に求めすぎ、意思決定が遅くなる</td>
              </tr>
              <tr>
                <td>Complex(複雑)</td>
                <td>因果関係は事後にしか分からない。多くの組織課題がここに属する</td>
                <td>小さく試す → 把握 → 対応(Probe-Sense-Respond)</td>
                <td>複雑な問題を「煩雑」だと誤認し、計画偏重で臨んでしまう</td>
              </tr>
              <tr>
                <td>Chaotic(カオス)</td>
                <td>因果関係が成立しない緊急事態</td>
                <td>行動 → 把握 → 対応(Act-Sense-Respond)</td>
                <td>分析に時間をかけすぎて初動が遅れる</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>多くのエンタープライズ・アジャイル変革(組織構造の変更、文化変革など)は<strong>Complex(複雑)</strong>領域に属します。つまり、詳細な移行計画を1回で完璧に作ることはできず、小さな実験(パイロットチーム、1部門だけの試行導入など)を繰り返しながら学習していくアプローチが適しています。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>大規模な組織変革を始める前に、今取り組んでいる課題が「単純」「煩雑」「複雑」「カオス」のどれに近いかをチームで議論する。</li>
            <li>「複雑」な課題に対しては、最初から完璧な計画を作ろうとせず、安全に失敗できる小さな実験(Safe-to-fail experiment)を設計する。</li>
            <li>カオス状態(重大インシデントなど)では、まず状況を安定させる行動を優先し、原因分析は後回しにする。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://hbr.org/2007/11/a-leaders-framework-for-decision-making" target="_blank" rel="noopener">A Leader's Framework for Decision Making | Harvard Business Review</a>(Snowden, D. &amp; Boone, M., 2007)</li>
            <li><a href="https://infed.org/dir/welcome/peter-senge-and-the-learning-organization/" target="_blank" rel="noopener">Peter Senge and the learning organization | infed.org</a></li>
          </ul>
        </div>
      </section>

      <section id="organizational-culture">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:users" />SECTION 03
        </div>
        <h2>組織文化を理解し、意図的に進化させる</h2>

        <h3>文化とは何か: Edgar Schein の3つのレベル</h3>

        <p>「組織文化を変えよう」という掛け声はよく聞きますが、文化とは具体的に何を指すのでしょうか。MIT の組織心理学者 Edgar Schein は、組織文化を3つのレベルからなる構造として説明しました。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCHEIN_CULTURE_LEVELS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Edgar Schein の組織文化3層モデル</div>
        </div>

        <p>重要なのは、この3つのレベルは往々にして一致しないという点です。「私たちはチャレンジを歓迎する」という標榜された価値観(Level 2)があっても、実際に失敗した人が昇進から外れ続けているなら、組織の根底にある前提(Level 3)は「失敗は許されない」というものです。リーダーが文化を変えたいのであれば、ポスターやスローガン(Level 1・2)ではなく、何が実際に評価され、何が黙認されているか(Level 3)に向き合う必要があります。</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p><strong>初学者向けのポイント。</strong>文化変革の第一歩は、「うちの会社の価値観は?」ではなく、「実際に評価され、昇進し、報われているのはどんな行動か?」を観察することです。</p>
        </div>

        <h3>組織進化の1つの見方: Laloux の発展段階モデル</h3>

        <p>もう1つ、組織構造と文化の発展を歴史的に整理した視点として、Frederic Laloux の著書『Reinventing Organizations』で提示された発展段階モデルがあります。Laloux は組織の発展段階を色で表現し(Red / Amber / Orange / Green / Teal)、最も新しい段階である Teal 型組織の特徴として「自主経営(Self-management)」「全体性(Wholeness)」「存在目的(Evolutionary Purpose)」の3つを挙げています。</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p><strong>批判的に読むためのポイント。</strong>Laloux のモデルは実務家の間で広く参照されていますが、学術的な検証を経た理論というよりは、著者自身が選んだ少数の事例(十数社)に基づく質的な観察です。CAL 1 レベルでは「組織構造や文化には複数の発展段階がありうる」という視点を得るための1つの参照枠として理解し、特定の型(Teal)を唯一の正解として鵜呑みにしないことが重要です。</p>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>文化変革の議論では、まず「今、実際に何が評価されているか」を関係者へのヒアリングや行動観察で洗い出す。</li>
            <li>スローガンやバリューステートメントを新しく作る前に、既存の人事評価制度・昇進基準・予算配分ルールが標榜する価値観と矛盾していないかを点検する。</li>
            <li>リーダー自身の日々の意思決定(誰を昇進させるか、何を許容し何を許容しないか)が、最も強力な文化形成のシグナルであると自覚する。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://mitsloan.mit.edu/ideas-made-to-matter/5-enduring-management-ideas-mit-sloans-edgar-schein" target="_blank" rel="noopener">5 enduring management ideas from MIT Sloan's Edgar Schein | MIT Sloan</a></li>
            <li><a href="https://www.reinventingorganizations.com/" target="_blank" rel="noopener">Reinventing Organizations(公式サイト)</a></li>
          </ul>
        </div>
      </section>

      <section id="team-topologies">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:sitemap" />SECTION 04
        </div>
        <h2>組織構造とチームトポロジーをデザインする</h2>

        <h3>Conway の法則: 組織構造はシステムの設計に反映される</h3>

        <p>1968年、ソフトウェア技術者 Melvin Conway は "How Do Committees Invent?" という論文の中で、次のような趣旨の観察を示しました。「システムを設計する組織は、その組織のコミュニケーション構造をそのままコピーしたような設計を作り出す」というものです。この観察は後に<strong>Conway の法則(Conway's Law)</strong>と呼ばれるようになりました。</p>

        <p>これはソフトウェアアーキテクチャに限った話ではありません。3つの部門が互いに疎にしか連携していなければ、生まれる製品やプロセスも3つに分断された、連携の悪いものになります。逆に、望ましいアーキテクチャやプロセスの形から逆算して組織構造・コミュニケーション構造を設計する考え方を<strong>Reverse Conway Maneuver(逆コンウェイ戦略)</strong>と呼びます。</p>

        <h3>Team Topologies: 4つのチームタイプと3つのインタラクションモード</h3>

        <p>Conway の法則を実務に落とし込むための現代的なフレームワークが、Matthew Skelton と Manuel Pais が提唱した<strong>Team Topologies</strong>です。このフレームワークは、認知負荷(Cognitive Load)を軸に、組織が持つべきチームを4つの基本タイプに整理し、チーム間の関わり方を3つのインタラクションモードに絞り込みます。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_TEAM_TOPOLOGIES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Team Topologies の4つのチームタイプとインタラクションモード</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>チームタイプ</th>
                <th>役割</th>
                <th>主な目的</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stream-aligned Team</td>
                <td>特定の価値の流れ(プロダクトや顧客セグメントなど)をエンドツーエンドで担当</td>
                <td>最も基本となるチーム。他の3タイプはすべてこのチームを支援するために存在する</td>
              </tr>
              <tr>
                <td>Platform Team</td>
                <td>内部向けのセルフサービス基盤(インフラ、共通機能など)を提供</td>
                <td>Stream-aligned Team の認知負荷を減らす</td>
              </tr>
              <tr>
                <td>Enabling Team</td>
                <td>特定分野の専門家が一時的に他チームを支援・コーチングする</td>
                <td>知識のギャップを埋め、自律性を高める(常駐化させない)</td>
              </tr>
              <tr>
                <td>Complicated-Subsystem Team</td>
                <td>高度に専門的な技術が必要なサブシステムを専任で担当</td>
                <td>専門知識を1チームに集約し、他チームの認知負荷を下げる</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>インタラクションモード</th>
                <th>内容</th>
                <th>使い所</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Collaboration</td>
                <td>2チームが期間を区切って密に協働する</td>
                <td>新しい境界線を発見する探索フェーズ</td>
              </tr>
              <tr>
                <td>X-as-a-Service</td>
                <td>明確なインターフェースを介して低コストで利用・提供する</td>
                <td>責任範囲が明確になった後の定常運用</td>
              </tr>
              <tr>
                <td>Facilitating</td>
                <td>一方のチームが他方を一時的に支援・指導する</td>
                <td>Enabling Team が知識移転を行う場面</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Spotify モデルに関する補足</h3>

        <p>「Squads(分隊)」「Tribes(部族)」「Chapters(分科会)」「Guilds(ギルド)」という用語で知られる<strong>Spotify モデル</strong>も、組織構造の参考事例としてよく引用されます。少人数の自律的な Squad を基本単位とし、関連する Squad の集合を Tribe としてまとめる、という考え方です。</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p><strong>適用時の注意点。</strong>Spotify モデルは、あくまで「2012年当時の Spotify という1企業のスナップショット」であり、汎用的な導入テンプレートとして設計されたものではありません。実際、Spotify 自身もその後、紹介された当時のモデルから組織構造を変化させています。他社が名称だけを輸入して構造をコピーしても、Spotify が前提としていた高い信頼関係や自律性の文化が伴わなければ、同じ効果は得られません。「Squad」という名前を採用することと、実際に自律的なチームを作ることは別問題です。</p>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>新しいチーム構造を検討する際は、まず「どんな価値の流れ(ストリーム)が存在するか」を先に定義し、その後にチーム編成を考える(Reverse Conway Maneuver)。</li>
            <li>Enabling Team は「常駐の外部専門家チーム」にせず、一定期間で関わりを終えて自律性を引き渡すことを前提に設計する。</li>
            <li>他社の組織構造(Spotify モデルなど)を導入する際は、名称や見た目だけでなく、その構造を支えている文化的前提(信頼・自律性の許容度)まで含めて検討する。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://www.melconway.com/Home/Conways_Law.html" target="_blank" rel="noopener">Conway's Law(原文公開ページ) | melconway.com</a></li>
            <li><a href="https://teamtopologies.com/key-concepts" target="_blank" rel="noopener">Key concepts | Team Topologies</a></li>
            <li><a href="https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1" target="_blank" rel="noopener">Spotify engineering culture (part 1) | Spotify Engineering</a></li>
          </ul>
        </div>
      </section>

      <section id="change-management">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:refresh" />SECTION 05
        </div>
        <h2>変革をリードする: チェンジマネジメントの実践知</h2>

        <h3>なぜ変革は失敗しやすいのか</h3>

        <p>Harvard のジョン・コッター(John Kotter)は、長年にわたる企業変革の研究から、変革がなぜ頓挫するのかを分析し、体系立った実践知としてまとめました。組織アジリティを高める取り組み自体が「変革プロジェクト」であるため、CAL 1 のリーダーはチェンジマネジメントの基本パターンを理解しておく必要があります。</p>

        <h3>Kotter の8ステップ・プロセス</h3>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_KOTTER_EIGHT_STEPS" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Kotter の変革をリードする8ステップ・プロセス</div>
        </div>

        <p>コッター自身も後年、この8ステップを固定的な直線モデルとしてではなく、並行して回し続けられる「8つのアクセラレーター(accelerator)」として再定義しています。変化が常態化した現代の組織では、8つのステップを一度きりの手順として順番にこなすのではなく、常時並行で回し続けるものとして捉える必要があるということです。</p>

        <h3>補完的なモデル: ADKAR と McKinsey 7S</h3>

        <p>Kotter のモデルが主に「組織・リーダー視点」でトップダウンの変革プロセスを描くのに対して、Prosci 社が開発した<strong>ADKAR モデル</strong>は「個人視点」で変革への適応を捉えます。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ADKAR の要素</th>
                <th>意味</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Awareness(認識)</td>
                <td>なぜ変革が必要かを理解している状態</td>
              </tr>
              <tr>
                <td>Desire(欲求)</td>
                <td>変革に参加し、支持したいという意思がある状態</td>
              </tr>
              <tr>
                <td>Knowledge(知識)</td>
                <td>変革後、どう行動すればよいかを知っている状態</td>
              </tr>
              <tr>
                <td>Ability(能力)</td>
                <td>新しいスキルや行動を実際に発揮できる状態</td>
              </tr>
              <tr>
                <td>Reinforcement(定着)</td>
                <td>変革後の状態を維持するための仕組みがある状態</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>また、組織内の複数要素の整合性を確認するための診断ツールとして、マッキンゼー社が1980年代に発表した<strong>McKinsey 7S フレームワーク</strong>(Strategy / Structure / Systems / Shared Values / Skills / Style / Staff)もよく併用されます。7S フレームワークには要素間の優劣や階層がなく、どこか1つだけを変えても他の要素との整合が取れていなければ変革は定着しない、という考え方が特徴です。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>モデル</th>
                <th>主な視点</th>
                <th>CAL 1 リーダーにとっての使い所</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kotter の8ステップ / アクセラレーター</td>
                <td>組織全体・リーダーシップ行動</td>
                <td>変革の全体設計、推進力の作り方</td>
              </tr>
              <tr>
                <td>ADKAR</td>
                <td>個人の変化への適応プロセス</td>
                <td>現場の1人ひとりが変革に納得し、行動できているかを確認する</td>
              </tr>
              <tr>
                <td>McKinsey 7S</td>
                <td>組織内要素の整合性診断</td>
                <td>新しい働き方(構造)が評価制度(Systems)や文化(Shared Values)と矛盾していないかを点検する</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>変革の初期段階では、データや事実に基づいて「今のままではいけない理由」を具体的に語り、危機意識を作る(Kotter Step 1)。</li>
            <li>経営層だけでなく、現場で影響力のある非公式リーダーも含めた推進チームを組成する(Guiding Coalition)。</li>
            <li>変革の展開が進む中で、現場の個々人が ADKAR のどの段階でつまずいているか(知らないのか、やりたくないのか、やり方が分からないのか)を見極め、支援内容を変える。</li>
            <li>新しい役割やチーム構造(Structure)を導入する際は、評価制度や報酬(Systems)が新しい行動を後押しするものになっているかを7Sの視点で点検する。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://www.kotterinc.com/methodology/8-steps/" target="_blank" rel="noopener">The 8-Step Process for Leading Change | Kotter</a></li>
            <li><a href="https://www.prosci.com/methodology/adkar" target="_blank" rel="noopener">ADKAR Model | Prosci</a></li>
            <li><a href="https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-7-s-framework" target="_blank" rel="noopener">Enduring Ideas: The 7-S Framework | McKinsey</a></li>
          </ul>
        </div>
      </section>

      <section id="scaling-agile">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:stack-2" />SECTION 06
        </div>
        <h2>アジャイルのスケーリング: フレームワーク選択の考え方</h2>

        <h3>スケーリングとは何か、何でないか</h3>

        <p>チーム数が増えてくると、多くの組織は「スケーリングフレームワーク」の導入を検討します。しかし CAL 1 レベルでまず押さえるべきは、<strong>スケーリングとは特定のフレームワーク名を導入することそのものではない</strong>、という点です。スケーリングとは、複数チームが1つの価値提供に向けて効果的に協調できるように、依存関係・コミュニケーション・意思決定の仕組みを設計することを指します。</p>

        <p>判断のステップとしては、次のような順序で考えるとよいでしょう。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SCALING_DECISION_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">スケーリングが本当に必要かを見極める判断フロー</div>
        </div>

        <p>代表的なスケーリングフレームワークには、それぞれ異なる思想があります。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>フレームワーク</th>
                <th>開発元・特徴</th>
                <th>適したコンテキスト</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SAFe(Scaled Agile Framework)</td>
                <td>最も体系的・規範的。ポートフォリオ〜チームまでの階層を包括的に定義</td>
                <td>数百人規模の大企業、規制業界など、包括的な整合の仕組みが必要な組織</td>
              </tr>
              <tr>
                <td>LeSS(Large-Scale Scrum)</td>
                <td>Craig Larman と Bas Vodde が提唱。あくまで「1つのチームのスクラム」を大規模に拡張する発想で、新しい役割をできるだけ追加しない、極力シンプルな構成</td>
                <td>2〜8チーム(Basic LeSS)、8チーム以上(LeSS Huge)で、組織構造自体をシンプル化したい場合</td>
              </tr>
              <tr>
                <td>Nexus</td>
                <td>Scrum.org(Ken Schwaber)が提唱。Scrum の定義を変えず、必要最小限の要素だけを追加して複数チームの連携を実現</td>
                <td>3〜9チーム程度で、単一のプロダクトバックログを扱う場合</td>
              </tr>
              <tr>
                <td>Spotify モデル</td>
                <td>前述の通り、特定企業の文化に根ざした事例であり、公式な「フレームワーク」ではない</td>
                <td>高い自律性の文化がすでに根づいている、比較的少人数の組織</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:info-circle" />補足
          </div>
          <p><strong>初学者向けのポイント。</strong>どのフレームワークにも共通するのは「依存関係を減らし、チームの自律性をできるだけ保つ」という狙いです。フレームワークの名前を覚えることより、自分の組織にどんな依存関係が存在するのかを見極めることの方が重要です。</p>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>フレームワークを選ぶ前に、まず「なぜスケーリングしたいのか(リードタイムの短縮か、品質の向上か、コストか)」という目的を明確にする。</li>
            <li>静的に1つのフレームワークを完璧に導入しようとせず、実際にやってみて学んだことを踏まえて仕組みを継続的に見直す前提で導入する。</li>
            <li>万能の正解(単一の望ましいアプローチ)は存在しないという前提に立ち、コンテキストに応じた複数のプラクティスを組み合わせる。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://framework.scaledagile.com/organizational-agility" target="_blank" rel="noopener">Organizational Agility (OA) | Scaled Agile Framework</a></li>
            <li><a href="https://less.works/less/framework" target="_blank" rel="noopener">LeSS Framework | less.works</a></li>
            <li><a href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">The Nexus Guide | Scrum.org</a></li>
            <li><a href="https://www.businesswire.com/news/home/20231207870163/en" target="_blank" rel="noopener">Scaling Agile 学習目標に関する報道 | Business Wire</a></li>
          </ul>
        </div>
      </section>

      <section id="learning-organization">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:book-2" />SECTION 07
        </div>
        <h2>学習する組織へ: 心理的安全性と学習文化を組織全体に広げる</h2>

        <h3>チームの心理的安全性から組織の学習文化へ</h3>

        <p>第3章では、Google の Project Aristotle の研究などをもとに、チームレベルの心理的安全性がチームパフォーマンスに与える影響を扱いました。第4章では、この考え方をチームの外側、つまり組織全体の学習の仕組みへと拡張します。</p>

        <p>Peter Senge は『The Fifth Discipline』の中で、組織学習を支える5つの規律(discipline)を提示しました。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_SENGE_LEARNING_DISCIPLINES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Peter Senge が提示した学習する組織を支える5つの規律</div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>規律</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personal Mastery(自己マスタリー)</td>
                <td>個人が自らのビジョンを明確にし、現実を客観的に見つめ続ける力</td>
              </tr>
              <tr>
                <td>Mental Models(メンタルモデル)</td>
                <td>自分の思考の前提を自覚し、他者との率直な対話にひらく力</td>
              </tr>
              <tr>
                <td>Shared Vision(共有ビジョン)</td>
                <td>組織として本当に実現したい未来像を、押し付けではなく共に描く力</td>
              </tr>
              <tr>
                <td>Team Learning(チーム学習)</td>
                <td>個人の知見の総和を超える、対話(dialogue)を通じたチームでの学び</td>
              </tr>
              <tr>
                <td>Systems Thinking(システム思考)</td>
                <td>上記4つを統合し、全体のつながりを見る、第5の規律</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Senge はまた、組織が学習を妨げてしまう典型的なパターン(学習障害)を指摘しています。たとえば「自分の役職の範囲でしか物事を考えない」「問題が起きてから対症療法的に反応する」といったパターンです。これらはいずれも、組織全体のつながり(システム)を見ずに、目の前の部分最適だけを追いかけることから生まれます。</p>

        <h3>組織スケールでのふりかえりと「非難のない」文化</h3>

        <p>チームレベルのレトロスペクティブ(ふりかえり)を、部門横断・組織横断のインシデントレビューやポストモーテム(事後検証)にも拡張することが、学習する組織への具体的な一歩になります。ここで重要なのは、個人の失敗を責めるのではなく、失敗を生んだ構造やプロセスに焦点を当てる「ブレームレス(非難のない)」な姿勢を、チームだけでなく組織のマネジメント層まで一貫させることです。マネジメント層が失敗の報告を歓迎せず処罰的な態度を取れば、いくらチームレベルで心理的安全性を作っても、その安全性はすぐに失われてしまいます。</p>

        <p>SAFe が Business Agility の中核コンピテンシーの1つとして定義する「Continuous Learning Culture(継続的学習文化)」も、同様に「学習する組織になること」「イノベーションを奨励すること」「改善への飽くなきコミットメント」の3つの側面から、組織全体での学習の仕組み化を扱っています。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>部門・チームをまたぐ重大インシデントの事後検証(ポストモーテム)を、個人ではなく構造・プロセスに焦点を当てて行うルールを、経営層を含めて明文化する。</li>
            <li>経営会議のアジェンダに「今期学んだこと・仮説が外れたこと」を定例で扱う項目を設ける。</li>
            <li>チームのレトロスペクティブで見えた組織的な障害(インペディメント)を、上位のマネジメント層に定期的にエスカレーションし、対応状況を可視化する仕組みを作る。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://infed.org/dir/welcome/peter-senge-and-the-learning-organization/" target="_blank" rel="noopener">Peter Senge and the learning organization | infed.org</a></li>
            <li><a href="https://framework.scaledagile.com/organizational-agility" target="_blank" rel="noopener">Organizational Agility (OA) | Scaled Agile Framework</a></li>
          </ul>
        </div>
      </section>

      <section id="measuring-agility">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:chart-pie" />SECTION 08
        </div>
        <h2>組織アジリティを測定する</h2>

        <h3>アウトプットではなくアウトカムを測る</h3>

        <p>組織アジリティの測定でリーダーが陥りやすい罠は、測りやすい「アウトプット指標」(完了したストーリーポイント数、スプリント数、実施したセレモニーの回数など)ばかりを追いかけ、本当に重要な「アウトカム指標」(顧客にとっての価値、ビジネス上の成果)を見失うことです。</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>指標の種類</th>
                <th>具体例</th>
                <th>注意点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>アウトプット指標(Output)</td>
                <td>ベロシティ、完了チケット数、スクラムイベントの実施率</td>
                <td>チームの活動量は測れるが、それが価値につながっているかは分からない</td>
              </tr>
              <tr>
                <td>アウトカム指標(Outcome)</td>
                <td>顧客満足度、機能リリースから利用開始までのリードタイム、意思決定にかかる時間(Decision Latency)</td>
                <td>測定にはより多くの工夫とデータ収集の仕組みが必要</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Business Agility Institute は、組織アジリティの成熟度を診断するための複数領域にわたるアセスメントモデルを提供しており、リーダーシップ・組織構造・戦略・オペレーションなど複数の観点から、組織の現在地を定期的に診断することを推奨しています。これらの診断は、他社との比較や優劣を競うためではなく、次にどこへ投資すべきかを見極める「診断ツール」として使うことが重要だとされています。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>「スクラムをやっているか」ではなく「アイデアから顧客への価値提供までにかかる時間(リードタイム)」を組織横断で可視化する。</li>
            <li>成熟度診断やアセスメントの結果を、部門間の優劣を競うランキングとして使わない。診断結果を良く見せるための数字の作り込み(ゲーミング)は、かえって改善を妨げる。</li>
            <li>「決定にどれだけ時間がかかっているか(Decision Latency)」など、普段見過ごされがちな組織的なボトルネックを定点観測する。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://businessagility.institute/domains/overview" target="_blank" rel="noopener">The Domains of Business Agility | Business Agility Institute</a></li>
            <li><a href="https://cio-wiki.org/wiki/Business_Agility" target="_blank" rel="noopener">Business Agility 概説 | CIO Wiki</a></li>
          </ul>
        </div>
      </section>

      <section id="leader-role-modeling">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:user-star" />SECTION 09
        </div>
        <h2>リーダーとしての実践: エンタープライズでのロールモデリング</h2>

        <h3>リーダーの行動そのものが最強の「アーティファクト」</h3>

        <p>第3章では、チームレベルでのサーバントリーダーシップを扱いました。組織レベルでは、その考え方がさらに拡張されます。本章「組織文化を理解し、意図的に進化させる」で扱った Schein の3層構造を思い出してください。組織文化における最も目に見える「Artifact(人工物)」の1つは、実は経営層やリーダー自身の日々の行動です。</p>

        <ul>
          <li>リーダーが会議で何を質問するか</li>
          <li>リーダーが失敗の報告を受けたときにどう反応するか</li>
          <li>リーダーが誰を昇進させ、誰を評価するか</li>
          <li>リーダーが自分自身の間違いをどう認めるか</li>
        </ul>

        <p>これらはすべて、どんなに立派なバリューステートメントよりも雄弁に、組織の「本当の」価値観(Level 3: Basic Underlying Assumptions)を周囲に伝えます。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_LEADER_ROLE_MODELING" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">リーダーの行動が組織文化として定着するまでの循環</div>
        </div>

        <h3>コントローラーではなく、システムの設計者として</h3>

        <p>組織アジリティを高めるリーダーの役割は、すべての意思決定を自らコントロールすることではありません。むしろ、次のようなシステムを設計・調整する役割へとシフトします。</p>

        <ul>
          <li>誰がどのような権限を持って意思決定できるかという構造(Team Topologies やインタラクションモード)</li>
          <li>失敗を安全に報告・学習できる仕組み(ブレームレスな文化)</li>
          <li>現場が自律的に動けるための、明確な目的(Shared Vision)と制約条件</li>
        </ul>

        <p>これは本章「システム思考で組織をとらえる: Cynefin フレームワーク」の内容にも通じます。組織の多くの課題が「Complex(複雑)」領域に属する以上、リーダーが唯一の正解を上から指示することはできません。リーダーの役割は、現場が安全に実験し、学び、適応できる「境界条件」を設計することに変わっていきます。</p>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:bulb" />ベストプラクティス
          </div>
          <ul>
            <li>重要な意思決定の場で、まず自分の意見を述べる前に「このチームはどう考えているか」を尋ねる習慣をつける。</li>
            <li>自分自身が犯した間違いを、部下やチームの前で率直に認め、そこから何を学んだかを共有する。</li>
            <li>評価制度・昇進基準・予算配分ルールが、標榜する価値観(アジリティ、実験と学習の奨励など)と実際に整合しているかを定期的に点検する。</li>
            <li>すべての意思決定を集中管理しようとせず、現場が安全に意思決定できる範囲(権限移譲の境界)を明文化する。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label">
            <Icon name="tabler:external-link" />ソース
          </div>
          <ul>
            <li><a href="https://mitsloan.mit.edu/ideas-made-to-matter/5-enduring-management-ideas-mit-sloans-edgar-schein" target="_blank" rel="noopener">5 enduring management ideas from MIT Sloan's Edgar Schein | MIT Sloan</a></li>
            <li><a href="https://hbr.org/2007/11/a-leaders-framework-for-decision-making" target="_blank" rel="noopener">A Leader's Framework for Decision Making | Harvard Business Review</a></li>
          </ul>
        </div>
      </section>

      <section id="summary">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:flag-3" />SECTION 10
        </div>
        <h2>まとめ: CAL 1 全体像の振り返り</h2>

        <p>本章で扱った「Leading Agile Organizations」の内容を、CAL 1 全体の流れの中で振り返ります。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CAL1_FULL_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">CAL 1 全4章を通じた学びの流れ</div>
        </div>

        <p>第4章のポイントを一言でまとめると、次のようになります。</p>

        <ul>
          <li>組織アジリティは、チームのアジャイル実践の単純な合計ではなく、リーダーシップ・人材・構造・戦略が連動して初めて実現する。</li>
          <li>組織の課題の多くは「複雑(Complex)」領域に属し、唯一の正解を計画するのではなく、小さな実験を重ねて学ぶアプローチが有効。</li>
          <li>組織文化は、標榜される言葉ではなく、実際に評価される行動の積み重ねによって形作られる。</li>
          <li>組織構造(誰と誰が、どうコミュニケーションするか)は、そのままシステムやサービスの設計に反映される(Conway の法則)。</li>
          <li>変革には、組織全体を動かす仕組み(Kotter)と、個人の適応を支える仕組み(ADKAR)の両方が必要。</li>
          <li>スケーリングフレームワークはゴールではなく、コンテキストに応じて選択・調整すべき手段の1つ。</li>
          <li>リーダー自身の日々の行動こそが、組織文化を形作る最も強力な「人工物」である。</li>
        </ul>

        <p>CAL 1 全体を通じて一貫しているのは、「アジャイルリーダーシップとは、特定の役職や資格を指すものではなく、変化に適応し続けられる人・チーム・組織を育てるための、継続的な実践である」という考え方です。</p>
      </section>

      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow">
          <Icon name="tabler:link" />SECTION 11
        </div>
        <h2>参考文献・出典一覧</h2>

        <div class="ref-group">
          <h3>公式コース情報</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Certified Agile Leader 1 (CAL 1) | Scrum Alliance</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/agile-leader/cal-1" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/agile-leader/cal-1</a></li>
            <li><span class="ref-name">CAL 1 Learning Objectives(公式PDF・要アクセス権)</span><a class="ref-url" href="https://drive.google.com/file/d/1LpDNidfA_r6J2wFvgRhIWfPw_wEnqjiO/view" target="_blank" rel="noopener">https://drive.google.com/file/d/1LpDNidfA_r6J2wFvgRhIWfPw_wEnqjiO/view</a></li>
            <li><span class="ref-name">The Agile Manifesto</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>組織アジリティ / Business Agility</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Organizational Agility (OA) | Scaled Agile Framework</span><a class="ref-url" href="https://framework.scaledagile.com/organizational-agility" target="_blank" rel="noopener">https://framework.scaledagile.com/organizational-agility</a></li>
            <li><span class="ref-name">The Domains of Business Agility | Business Agility Institute</span><a class="ref-url" href="https://businessagility.institute/domains/overview" target="_blank" rel="noopener">https://businessagility.institute/domains/overview</a></li>
            <li><span class="ref-name">Business Agility 概説 | CIO Wiki</span><a class="ref-url" href="https://cio-wiki.org/wiki/Business_Agility" target="_blank" rel="noopener">https://cio-wiki.org/wiki/Business_Agility</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>システム思考 / Cynefin</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Snowden, D. J., &amp; Boone, M. E. (2007). A Leader's Framework for Decision Making. Harvard Business Review.</span><a class="ref-url" href="https://hbr.org/2007/11/a-leaders-framework-for-decision-making" target="_blank" rel="noopener">https://hbr.org/2007/11/a-leaders-framework-for-decision-making</a></li>
            <li><span class="ref-name">Peter Senge and the learning organization | infed.org</span><a class="ref-url" href="https://infed.org/dir/welcome/peter-senge-and-the-learning-organization/" target="_blank" rel="noopener">https://infed.org/dir/welcome/peter-senge-and-the-learning-organization/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>組織文化</h3>
          <ul class="ref-list">
            <li><span class="ref-name">5 enduring management ideas from MIT Sloan's Edgar Schein | MIT Sloan</span><a class="ref-url" href="https://mitsloan.mit.edu/ideas-made-to-matter/5-enduring-management-ideas-mit-sloans-edgar-schein" target="_blank" rel="noopener">https://mitsloan.mit.edu/ideas-made-to-matter/5-enduring-management-ideas-mit-sloans-edgar-schein</a></li>
            <li><span class="ref-name">Laloux, F. (2014). Reinventing Organizations. 公式サイト</span><a class="ref-url" href="https://www.reinventingorganizations.com/" target="_blank" rel="noopener">https://www.reinventingorganizations.com/</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>組織構造 / チームトポロジー</h3>
          <ul class="ref-list">
            <li><span class="ref-name">Conway, M. (1968). How Do Committees Invent? 原文公開ページ | melconway.com</span><a class="ref-url" href="https://www.melconway.com/Home/Conways_Law.html" target="_blank" rel="noopener">https://www.melconway.com/Home/Conways_Law.html</a></li>
            <li><span class="ref-name">Key concepts | Team Topologies(Skelton, M. &amp; Pais, M.)</span><a class="ref-url" href="https://teamtopologies.com/key-concepts" target="_blank" rel="noopener">https://teamtopologies.com/key-concepts</a></li>
            <li><span class="ref-name">Spotify engineering culture (part 1) | Spotify Engineering</span><a class="ref-url" href="https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1" target="_blank" rel="noopener">https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>チェンジマネジメント</h3>
          <ul class="ref-list">
            <li><span class="ref-name">The 8-Step Process for Leading Change | Kotter</span><a class="ref-url" href="https://www.kotterinc.com/methodology/8-steps/" target="_blank" rel="noopener">https://www.kotterinc.com/methodology/8-steps/</a></li>
            <li><span class="ref-name">The Prosci ADKAR Model</span><a class="ref-url" href="https://www.prosci.com/methodology/adkar" target="_blank" rel="noopener">https://www.prosci.com/methodology/adkar</a></li>
            <li><span class="ref-name">Enduring Ideas: The 7-S Framework | McKinsey</span><a class="ref-url" href="https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-7-s-framework" target="_blank" rel="noopener">https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-7-s-framework</a></li>
          </ul>
        </div>

        <div class="ref-group">
          <h3>スケーリングフレームワーク</h3>
          <ul class="ref-list">
            <li><span class="ref-name">LeSS Framework | less.works(Larman, C. &amp; Vodde, B.)</span><a class="ref-url" href="https://less.works/less/framework" target="_blank" rel="noopener">https://less.works/less/framework</a></li>
            <li><span class="ref-name">The Nexus Guide | Scrum.org(Schwaber, K.)</span><a class="ref-url" href="https://www.scrum.org/resources/online-nexus-guide" target="_blank" rel="noopener">https://www.scrum.org/resources/online-nexus-guide</a></li>
            <li><span class="ref-name">Scaling Agile 学習目標に関する報道 | Business Wire</span><a class="ref-url" href="https://www.businesswire.com/news/home/20231207870163/en" target="_blank" rel="noopener">https://www.businesswire.com/news/home/20231207870163/en</a></li>
          </ul>
        </div>
      </section>

      <footer>
        Certified Agile Leader, CAL, CAL 1, Scrum Alliance は Scrum Alliance, Inc. の商標です。本ガイドは教育・学習目的で作成されたものであり、Scrum Alliance の公式教材ではありません。CAL 1 の正式な学習内容・出題範囲は、必ず<a href="https://www.scrumalliance.org/get-certified/agile-leader/cal-1" target="_blank" rel="noopener">公式サイト</a>および認定トレーナーが提供する情報を確認してください。
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

.sidebar-nav a.active :deep(.iconify) {
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

/* ===================== Main Content ===================== */
.main-content {
  margin-left: var(--sidebar-width);
  padding: 56px 72px 120px;
}

/* ===================== Hero ===================== */
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

.hero-eyebrow :deep(.iconify) {
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

.disclaimer-box :deep(.iconify),
.disclaimer-box :deep(svg) {
  flex: none;
  font-size: 20px;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}

/* ===================== Sections & Typography ===================== */
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

/* ===================== Diagram Card ===================== */
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

/* ===================== References ===================== */
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
