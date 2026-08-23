<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "book-info",
  "why-read",
  "structure-map",
  "part1-quiver",
  "part2-process",
  "part3-versions",
  "beginner-steps",
  "pitfalls",
  "related-books",
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
  title: "Managing Humans 完全ガイド | ソフトウェアエンジニアリングマネージャーのためのベストプラクティス",
  description: "Michael Lopp著『Managing Humans』(第4版)を初心者向けに解説する実践ガイド。1on1、会議運営、意思決定、危機対応をMermaid図解とともに紹介します。",
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

const DIAGRAM_BOOK_STRUCTURE_MAP = `graph TD
A["Managing Humans 第4版"] --> B["Part I The Management Quiver マネジメントの矢筒"]
A --> C["Part II The Process is the Product プロセスこそが成果物"]
A --> D["Part III Versions of You 変容していくあなた"]

B --> B1["人としての向き合い方 Don't Be a Prick / Managers Are Not Evil"]
B --> B2["1on1・会議・意思決定の型 Update/Vent/Disaster / Mandate"]
B --> B3["情報共有とオフサイト運営"]

C --> C1["1.0優先順位ピラミッド Pitch > People > Process > Product"]
C --> C2["危機対応フロー When the Sky Falls"]
C --> C3["思考時間の確保 / プロセスの意義"]

D --> D1["キャリアパスと多様な人材類型"]
D --> D2["ストレス管理・インクルーシブな運営"]
D --> D3["退屈させない・チームを飽きさせない工夫"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,B1,B2,B3,C1,C2,C3,D1,D2,D3 box;`;

const DIAGRAM_ONE_ON_ONE_TRIAGE = `flowchart TD
S["1on1を開始する 『調子はどう?』とあえて曖昧に尋ねる"] --> L["相手の話に耳を傾ける"]
L --> J{"どのタイプの話か"}
J -->|"アップデート型 業務報告寄り"| U["深掘りする質問をして 単なる進捗確認で終わらせない"]
J -->|"ベント型 愚痴・不満"| V["解決策を提示せず 最後まで聞き切ることに徹する"]
J -->|"ディザスター型 感情的な訴え"| D["感情に反応せず 静かに時間を与えて落ち着かせる"]
U --> F["次回の1on1でフォローアップする"]
V --> F
D --> F

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S hub;
class L,J,U,V,D box;
class F done;`;

const DIAGRAM_MEETING_FLOW = `flowchart TD
M1["会議の目的を明確にする"] --> M2{"アラインメント会議か クリエイティブ会議か"}
M2 -->|"アラインメント"| M3["アジェンダに沿って淡々と進行する"]
M2 -->|"クリエイティブ"| M4["発散的な議論を許容しつつ着地点を探る"]
M3 --> M5["参加者の集中度を観察する"]
M4 --> M5
M5 --> M6{"議論から離脱している人はいるか"}
M6 -->|"いる"| M7["質問を投げかけ再エンゲージさせる"]
M6 -->|"いない"| M8["議論を続ける"]
M7 --> M9["結論とネクストアクションを明文化して終了する"]
M8 --> M9

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class M1 hub;
class M2,M3,M4,M5,M6,M7,M8 box;
class M9 done;`;

const DIAGRAM_MANDATE_FLOW = `flowchart LR
D1["①Decide 議論が非生産的になったら決定を下す"] --> D2["②Deliver 決定事項を明確かつ毅然と伝える"]
D2 --> D3["③Deliver Again 個別に理由を説明し反応を受け止める"]
D3 --> D4["反対意見のガス抜きを許容する"]
D4 --> D5["チーム全体が前に進む"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1 hub;
class D2,D3,D4 box;
class D5 done;`;

const DIAGRAM_STABLES_VOLATILES_CYCLE = `flowchart LR
V1["Volatile: リスクを取り破壊的に行動する"] --> V2["1.0リリースを成功させる"]
V2 --> V3["経験を積み プロセスを整備してStableへ移行"]
V3 --> V4["自分に似た人材を採用する"]
V4 --> V5["その中から新たなVolatileが生まれる"]
V5 --> V1

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class V1 hub;
class V2,V3,V4,V5 box;`;

const DIAGRAM_CRISIS_RESPONSE = `flowchart TD
C1["異常事態を検知する"] --> C2["War Room 対策拠点を招集する"]
C2 --> C3["情報収集の幅を優先し、仮の理論を組み立てる"]
C3 --> C4["直接関与していない第三者3名以上に 仮説を検証してもらう"]
C4 --> C5["ホワイトボードにタスクと担当者を明記する"]
C5 --> C6["進捗を社内へ継続的に発信し続ける"]
C6 --> C7{"根本原因は解決したか"}
C7 -->|"いいえ"| C3
C7 -->|"はい"| C8["振り返りを行い再発防止策を残す"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class C1 hub;
class C2,C3,C4,C5,C6,C7 box;
class C8 done;`;

const DIAGRAM_BEGINNER_STEPS_FLOW = `flowchart TD
S1["Step 1 週次1on1を全メンバーに設定する"] --> S2["Step 2 会議にアジェンダとレフェリー役を導入する"]
S2 --> S3["Step 3 チーム内のStable/Volatileのバランスを観察する"]
S3 --> S4["Step 4 意思決定にDecide→Deliver→Deliver Againを使う"]
S4 --> S5["Step 5 有益無益を問わず情報を流し続ける習慣をつける"]
S5 --> S6["Step 6 危機発生時はWar Room方式で対応する"]
S6 --> S7["Step 7 コードやプロダクトから完全に離れない"]
S7 --> S8["Step 8 『ノー』と言える文化と多様なキャリアパスを整える"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1 hub;
class S2,S3,S4,S5,S6,S7 box;
class S8 done;`;
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
          <div class="brand-title">Managing Humans</div>
          <div class="brand-subtitle">実践ガイド</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li><a href="#book-info" :class="{ active: activeId === 'book-info' }" :aria-current="activeId === 'book-info' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />書籍の基本情報</a></li>
        <li><a href="#why-read" :class="{ active: activeId === 'why-read' }" :aria-current="activeId === 'why-read' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />国際的な評価</a></li>
        <li><a href="#structure-map" :class="{ active: activeId === 'structure-map' }" :aria-current="activeId === 'structure-map' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />全体構成マップ</a></li>
        <li><a href="#part1-quiver" :class="{ active: activeId === 'part1-quiver' }" :aria-current="activeId === 'part1-quiver' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:building-bank" aria-hidden="true" />Part I: マネジメントの矢筒</a></li>
        <li><a href="#part2-process" :class="{ active: activeId === 'part2-process' }" :aria-current="activeId === 'part2-process' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:git-branch" aria-hidden="true" />Part II: プロセスこそが成果物</a></li>
        <li><a href="#part3-versions" :class="{ active: activeId === 'part3-versions' }" :aria-current="activeId === 'part3-versions' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />Part III: 変容していくあなた</a></li>
        <li><a href="#beginner-steps" :class="{ active: activeId === 'beginner-steps' }" :aria-current="activeId === 'beginner-steps' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:timeline" aria-hidden="true" />初心者向け8ステップ</a></li>
        <li><a href="#pitfalls" :class="{ active: activeId === 'pitfalls' }" :aria-current="activeId === 'pitfalls' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />よくある落とし穴</a></li>
        <li><a href="#related-books" :class="{ active: activeId === 'related-books' }" :aria-current="activeId === 'related-books' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:book-2" aria-hidden="true" />併読おすすめ書籍</a></li>
        <li><a href="#summary" :class="{ active: activeId === 'summary' }" :aria-current="activeId === 'summary' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />まとめ</a></li>
        <li><a href="#references" :class="{ active: activeId === 'references' }" :aria-current="activeId === 'references' ? 'location' : undefined" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />参考文献・情報源</a></li>
      </ul>
    </nav>

    <!-- ===================== Main Content ===================== -->
    <main class="main-content" id="main-content">
      <div class="hero">
        <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />書籍解説ガイド</div>
        <h1>『Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager』完全ガイド</h1>
        <p class="hero-lede">
          ソフトウェアエンジニアリングマネージャーのためのベストプラクティスをステップバイステップで学ぶ
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">全3部</div><div class="stat-label">The Management Quiver / The Process is the Product / Versions of You</div></div>
          <div class="stat-card"><div class="stat-number">4版</div><div class="stat-label">初版2007年から続く改訂の歴史</div></div>
          <div class="stat-card"><div class="stat-number">約60章</div><div class="stat-label">エピローグを含む第4版の章構成</div></div>
          <div class="stat-card"><div class="stat-number">17件</div><div class="stat-label">本ガイドが参照した情報源URL数</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          本ガイドは、Michael Lopp(ペンネーム「Rands」)による書籍 <em>Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager</em>(第4版、Apress)の内容を、初めてマネジメントに触れる方向けに整理・体系化した学習資料です。原著の詳細な文章の引用は最小限に留め、要点を独自の言葉で解説しています。原著を読む際の「地図」としてご活用ください。
        </div>
      </div>

      <!-- ===================== 01. Book Info ===================== -->
      <section id="book-info">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 01</div>
        <h2>この本の基本情報</h2>

        <div class="table-wrap">
          <table>
            <thead><tr><th>項目</th><th>内容</th></tr></thead>
            <tbody>
              <tr><td>原題</td><td><em>Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager</em>(第4版)</td></tr>
              <tr><td>著者</td><td>Michael Lopp(ブログ名義「Rands」)</td></tr>
              <tr><td>出版社</td><td>Apress(Springer Nature)</td></tr>
              <tr><td>著者の経歴</td><td>Apple、Pinterest、Palantir、Netscape、Symantec、Borland、Slackなどシリコンバレーの主要テック企業でエンジニアリングマネジメントを20年以上経験</td></tr>
              <tr><td>ジャンル</td><td>エンジニアリングマネジメント / 人材マネジメント(実話ベースのエッセイ集、ユーモア混じり)</td></tr>
              <tr><td>構成</td><td>全3部・約60章 + エピローグ(第4版。第3版から2章を削除し、11章を新規追加)</td></tr>
            </tbody>
          </table>
        </div>

        <p>Michael Lopp は自身のブログ「<a href="https://randsinrepose.com/" target="_blank" rel="noopener">Rands in Repose</a>」で発表してきたエッセイをまとめてこの本を執筆しました。もともとは同僚だった <em>Joel on Software</em> の著者 Joel Spolsky が出版を勧めたことがきっかけで書籍化されたと伝えられています。</p>

        <h3>版の変遷</h3>

        <div class="table-wrap">
          <table>
            <thead><tr><th>版</th><th>発行時期の目安</th><th>主な特徴</th></tr></thead>
            <tbody>
              <tr><td>初版</td><td>2007年</td><td>Rands in Reposeの初期エッセイをまとめた最初の書籍化</td></tr>
              <tr><td>第2版</td><td>2012年</td><td>新規14章を追加し、内容を大幅に刷新</td></tr>
              <tr><td>第3版</td><td>2016年</td><td>Slack・Pinterestでの経験を反映した新エピソードを追加</td></tr>
              <tr><td>第4版(本ガイドの対象)</td><td>2021年〜2022年頃</td><td>ストレスへの向き合い方、多様なチーム作り、インクルーシブな会議運営、危機下でのリーダーシップなど、現代的なテーマを拡張</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p><a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ</a>、<a href="https://link.springer.com/book/10.1007/978-1-4842-7116-2" target="_blank" rel="noopener">Springer 書誌ページ</a></p>
        </div>
      </section>

      <!-- ===================== 02. Why Read ===================== -->
      <section id="why-read">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 02</div>
        <h2>なぜこの本が読まれ続けているのか(国際的な評価)</h2>

        <p>この本はエンジニア出身のマネージャーにとって定番の一冊として、世界中の開発者コミュニティで長年参照され続けています。以下は、著名な開発者・技術ブログによる評価の一部です。</p>

        <ul>
          <li>著名なテック業界ニュースレター「The Pragmatic Engineer」(Gergely Orosz運営)の2021年の技術者向け書籍推薦記事では、あるDevelopment Leadが本書について「エンジニアリングマネジメントへの扉を開いてくれた一冊(The book that opened the door for me into engineering management.)」と評しています。(出典: <a href="https://blog.pragmaticengineer.com/holiday-tech-book-recommendations/" target="_blank" rel="noopener">blog.pragmaticengineer.com</a>)</li>
          <li>開発者コミュニティサイト DEV Community に投稿されたレビューでは、マネジメント書籍にありがちな堅苦しさがなく、実用性とエンターテインメント性を両立している点が評価されています。(出典: <a href="https://dev.to/rachelsoderberg/book-review-managing-humans-by-michael-lopp-11fo" target="_blank" rel="noopener">dev.to</a>)</li>
          <li>ソフトウェアエンジニアによる技術ブログ「horia141」のレビューでは、本書は50章以上の短い章立てで構成され、Will Larson著<em>An Elegant Puzzle</em>と同様に著者のブログ記事を再編集した実践的な内容だと紹介されています。(出典: <a href="https://horia141.com/book_reviews/2022-08-08-managing-humans-review" target="_blank" rel="noopener">horia141.com</a>)</li>
          <li>GitHubで4,000以上のスターを集める書籍ノートリポジトリ「mgp/book-notes」では、本書の各章が詳細に要約・整理されており、開発者コミュニティにおける実務リファレンスとして参照されています。(出典: <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">github.com/mgp/book-notes</a>)</li>
          <li>エンジニアリングマネジメント関連リソースをまとめたキュレーションリポジトリ「charlax/engineering-management」でも本書は定番書籍として紹介され、Camille Fournier著<em>The Manager's Path</em>などと並んで頻繁に推薦されています。(出典: <a href="https://github.com/charlax/engineering-management" target="_blank" rel="noopener">github.com/charlax/engineering-management</a>)</li>
          <li>Hacker Newsのディスカッションでも、本書で紹介される「優秀な人材(rockstar)」を無理にマネジメントするコストに関する考え方が、エンジニアリング組織の生産性議論の文脈で引用されています。(出典: <a href="https://news.ycombinator.com/item?id=21508140" target="_blank" rel="noopener">news.ycombinator.com</a>)</li>
        </ul>

        <p>一方で、本書には批判的な評価も存在します。Goodreadsのレビューには、著者の視点がやや皮肉的・否定的すぎると感じる読者や、内容に古さを感じる読者の声もあります。(出典: <a href="https://www.goodreads.com/book/show/1317946.Managing_Humans" target="_blank" rel="noopener">goodreads.com</a>)また、ブログ「Brian's Notes」では10点満点中8点という評価をつけつつも、内容の毒舌さゆえに賛同しにくい部分があることを指摘しています。(出典: <a href="https://www.briansnotes.io/book/managing-humans/" target="_blank" rel="noopener">briansnotes.io</a>)</p>

        <div class="callout note" data-testid="callout" data-variant="note">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
          <p>本書はあくまで著者個人の経験則の集積であり、鵜呑みにせず自分のチームの文脈に照らして取捨選択することが推奨されます。</p>
        </div>
      </section>

      <!-- ===================== 03. Structure Map ===================== -->
      <section id="structure-map">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 03</div>
        <h2>本書全体の構成マップ</h2>

        <p>本書は大きく3部構成になっています。第4版ではこれに加え、ストレス管理・多様性・危機対応といった現代的テーマが各部に組み込まれています。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_BOOK_STRUCTURE_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Managing Humans 第4版の全3部構成とそれぞれの主要トピック</div>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p><a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>。第4版での章構成の変更点は著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> を参照。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている。</p>
        </div>
      </section>

      <!-- ===================== 04. Part I ===================== -->
      <section id="part1-quiver">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 04</div>
        <h2>Part I: The Management Quiver(マネジメントの矢筒)を学ぶ</h2>

        <p>Part Iは、マネージャーが日々の対人関係で使う「道具(矢)」を1つずつ紹介するパートです。初心者マネージャーが最初に身につけるべき基礎スキル群と言えます。</p>

        <h3>主要章と実践ポイント一覧</h3>

        <div class="table-wrap">
          <table>
            <thead><tr><th>章タイトル</th><th>テーマ</th><th>初心者が今日から実践できること</th></tr></thead>
            <tbody>
              <tr><td>Don't Be a Prick</td><td>人としてのマネージャー像</td><td>組織図上の立場に関わらず、誰に対しても一人の人間として向き合う</td></tr>
              <tr><td>Managers Are Not Evil</td><td>マネージャーへの誤解の解消</td><td>自分の仕事の意味をエンジニアでない相手にも分かる言葉で説明する</td></tr>
              <tr><td>Stables and Volatiles</td><td>チームの人材タイプ理解</td><td>チーム内の「安定志向」と「変革志向」のバランスを観察する</td></tr>
              <tr><td>The Rands Test</td><td>組織の健全性チェック</td><td>定例で経営層のビジョンを共有し、誰でも質問できる場を設ける</td></tr>
              <tr><td>How to Run a Meeting</td><td>会議運営</td><td>アジェンダを用意し、レフェリー役として進行に責任を持つ</td></tr>
              <tr><td>The Twinge</td><td>違和感の察知</td><td>データが少なくても違和感(Twinge)を無視せず確認する</td></tr>
              <tr><td>The Update, the Vent, and the Disaster</td><td>1on1の型</td><td>週次30分の1on1を固定し、相手の話を3種類に分類して聞く</td></tr>
              <tr><td>Dissecting the Mandate</td><td>トップダウン決定の伝え方</td><td>Decide→Deliver→Deliver againの手順で意思決定を通す</td></tr>
              <tr><td>Information Starvation</td><td>情報共有の重要性</td><td>有益無益にかかわらず情報を流し続ける習慣をつける</td></tr>
              <tr><td>Fred Hates the Off-Site</td><td>オフサイト運営</td><td>参加者全員に発表の機会を与え、2日以上かけて議論する</td></tr>
              <tr><td>An Engineering Mindset</td><td>技術との距離感</td><td>コードから完全に離れず、開発環境やアーキテクチャの理解を保つ</td></tr>
              <tr><td>Titles Are Toxic</td><td>役職とキャリア</td><td>役職の名称ではなく、実際の職務内容と成長を評価する</td></tr>
              <tr><td>Saying No</td><td>意思決定の勇気</td><td>チームを巻き込みながら「ノー」と言える文化を作る</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>

        <h3>ステップ実践: 健全な1on1の進め方</h3>

        <p>本書で特に有名な概念の一つが「アップデート(Update)」「ベント(Vent)」「ディザスター(Disaster)」という1on1の3分類です。マネージャーはまず相手の話がどのタイプかを見極め、それぞれに応じた聞き方をする必要があります。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_ONE_ON_ONE_TRIAGE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">1on1における3タイプの見極めと対応フロー</div>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />実践のコツ</div>
          <ul>
            <li>1on1は毎週同じ曜日・時間に固定する(相手への「あなたのために時間を確保している」というメッセージになる)。</li>
            <li>最低30分は確保する。人数が多くても時間を削らない。</li>
            <li>ステータス報告に終始しそうな場合は、その中から掘り下げられる話題を探して深掘りする。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>

        <h3>ステップ実践: 会議をレフェリーとして進行する</h3>

        <p>本書では、会議は「アラインメント会議(定型的な情報共有)」と「クリエイティブ会議(難しい問題を解く場)」に大別されます。マネージャーは進行役(レフェリー)として、議論の質と参加者の集中を管理する責任を負います。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_MEETING_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">レフェリーとしての会議進行フロー</div>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />実践のコツ</div>
          <ul>
            <li>会議の目的は「参加者が実務に戻れるようにすること」だと意識する。</li>
            <li>誰も発言しない・進行が止まる状態が30分続いたら、論点が多すぎるサインとして仕切り直す。</li>
            <li>「独裁者」的に発言を止めるのは最終手段。多用すると場全体が萎縮する。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>

        <h3>ステップ実践: トップダウンの意思決定(Mandate)を通す</h3>

        <p>議論が堂々巡りになったとき、マネージャーは「マンデート(Mandate)」、つまり明確な決定を下す必要があります。本書ではこれを3段階のプロセスとして説明しています。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_MANDATE_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">Decide→Deliver→Deliver Againの3段階プロセス</div>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />実践のコツ</div>
          <ul>
            <li>強い意見を持つ人は少数派であり、大多数は「誰かが決めてくれること」を望んでいる場合が多いと理解する。</li>
            <li>決定後、賛成・反対どちらの側にも個別に理由を説明する時間を取る。</li>
            <li>上位組織からの決定を伝える場合は、その背景・根拠を自分の言葉で咀嚼してから伝える。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>

        <h3>Stables(安定志向型)とVolatiles(変革志向型)</h3>

        <p>プロダクトの1.0リリースを境に、チームは「Stable(安定志向)」と「Volatile(変革志向)」という2つの気質に分かれていく、という観察も本書の代表的な概念です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>観点</th><th>Stable(安定志向型)</th><th>Volatile(変革志向型)</th></tr></thead>
            <tbody>
              <tr><td>特徴</td><td>指示や計画を好み、リスクを慎重に評価する</td><td>権威に反発しがちで、リスクを恐れず挑戦する</td></tr>
              <tr><td>強み</td><td>安定した実行力とプロセスの構築力</td><td>破壊的な発想と新しい取り組みを生み出す力</td></tr>
              <tr><td>リスク</td><td>変化への抵抗が強くなりやすい</td><td>継続性に欠け、混乱を招きやすい</td></tr>
              <tr><td>マネジメントの要点</td><td>変化の必要性を丁寧に説明し、抵抗を頭ごなしに否定しない</td><td>破壊力を活かしつつStableとの間で「一時休戦」を仲介する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_STABLES_VOLATILES_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">VolatileがStableへ移行し新たなVolatileを生むサイクル</div>
        </div>

        <p>このサイクルを理解しておくと、「なぜ古参メンバーは保守的になりがちなのか」「なぜ新しく入った人は既存のやり方に反発するのか」を構造的に説明できるようになります。</p>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>
      </section>

      <!-- ===================== 05. Part II ===================== -->
      <section id="part2-process">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 05</div>
        <h2>Part II: The Process is the Product(プロセスこそが成果物)を学ぶ</h2>

        <p>Part IIは、プロダクト開発そのものやチームのプロセス設計に関するテーマを扱います。</p>

        <h3>主要章と実践ポイント一覧</h3>

        <div class="table-wrap">
          <table>
            <thead><tr><th>章タイトル</th><th>テーマ</th><th>実践ポイント</th></tr></thead>
            <tbody>
              <tr><td>1.0</td><td>立ち上げ期の優先順位</td><td>Pitch(構想)→People(人)→Process(プロセス)→Productの順で守るべきものを判断する</td></tr>
              <tr><td>The Process Myth</td><td>プロセスへの向き合い方</td><td>「なぜこのプロセスが必要か」を説明できないプロセスは見直す</td></tr>
              <tr><td>How to Start</td><td>着手できない問題への対処</td><td>「悩む・準備する・始める」の3段階を意識し、まず着手する</td></tr>
              <tr><td>Taking Time to Think</td><td>発想のための時間確保</td><td>リリース直後にブレスト会議とプロトタイプ会議を同じ週に設定する</td></tr>
              <tr><td>The Value of the Soak</td><td>アイデアを寝かせる技術</td><td>能動的に情報収集する「アクティブソーク」と、一晩寝かせる「パッシブソーク」を使い分ける</td></tr>
              <tr><td>Trickle Theory</td><td>着手できないタスクへの対応</td><td>やる気が出ないタスクは他の作業と組み合わせて「ミックスする」</td></tr>
              <tr><td>When the Sky Falls</td><td>危機対応</td><td>War Room方式で情報収集・仮説検証・担当割当・発信のサイクルを回す</td></tr>
              <tr><td>Hacking Is Important</td><td>創造性と安定のバランス</td><td>予測可能性を保ちながらも、意図的に「ハック」する余地を残す</td></tr>
              <tr><td>Entropy Crushers</td><td>プロジェクト / プログラムマネジメント</td><td>PM・プロダクトマネージャー・プログラムマネージャーの役割分担を明確にする</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>

        <h3>「1.0」における優先順位ピラミッド</h3>

        <p>プロダクトの立ち上げ期(1.0)において、著者は守るべき優先順位を4層で説明しています。下位層で失敗するほど、会社全体への影響(コスト)は大きくなるとされています。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>優先順位</th><th>層</th><th>失敗した場合の影響範囲</th></tr></thead>
            <tbody>
              <tr><td>1(最重要・土台)</td><td>Pitch(構想・アイデア)</td><td>会社の存在意義そのものに関わる構造的な失敗</td></tr>
              <tr><td>2</td><td>People(人)</td><td>1.0に本気で取り組めない人材を早めに見極める必要がある</td></tr>
              <tr><td>3</td><td>Process(プロセス)</td><td>完璧である必要はないが、全員が参照できる形で存在させる</td></tr>
              <tr><td>4(最終成果)</td><td>Product(プロダクト)</td><td>社内の思い込みではなく、第三者の目で検証されて初めて成立する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />実践のコツ</div>
          <p>組織図を作りたくなったら要注意のサインと捉える。1.0フェーズで「これは誰の仕事か」を可視化し始めるのは、停滞の始まりであることが多いとされています。</p>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>

        <h3>ステップ実践: 危機対応(When the Sky Falls)</h3>

        <p>本番障害や重大インシデントなど「空が落ちてくる」ような状況にどう対応するか。本書は明確なステップを提示しています。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_CRISIS_RESPONSE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">War Room方式による危機対応のサイクル</div>
        </div>

        <div class="callout practice" data-testid="callout" data-variant="practice">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />実践のコツ</div>
          <ul>
            <li>対応中は自分の名前をタスクの担当者に入れない。マネージャーの役目は実行ではなく調整と情報発信。</li>
            <li>目先の症状を抑える「応急処置」と、根本原因を解決する「本当の治療」を混同しない。</li>
          </ul>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>
      </section>

      <!-- ===================== 06. Part III ===================== -->
      <section id="part3-versions">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 06</div>
        <h2>Part III: Versions of You(変容していくあなた)を学ぶ</h2>

        <p>Part IIIは、キャリアの成長、多様な人材タイプへの向き合い方、そして第4版で拡充されたストレス対応・多様なチーム作り・インクルーシブな会議運営・危機下でのリーダーシップといったテーマを扱います。版によって収録章は異なりますが、代表的なテーマは以下の通りです。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>テーマ領域</th><th>扱われる内容の例</th></tr></thead>
            <tbody>
              <tr><td>採用と初期定着</td><td>電話面接の見極め方、入社後90日間の重要性</td></tr>
              <tr><td>人材の見極め方</td><td>「ベルウェザー(風見鶏)」となる人材の見つけ方、退屈が離職につながるプロセス</td></tr>
              <tr><td>チームの多様性</td><td>完璧主義者と実行重視型、内向型と外向型など、多様な気質への向き合い方</td></tr>
              <tr><td>組織変更</td><td>再編(リオーグ)を行う際の原則</td></tr>
              <tr><td>ストレスと危機下のリーダーシップ(第4版で拡充)</td><td>ストレスへの向き合い方、インクルーシブな会議の運営、危機下でのリーダーの振る舞い</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p><a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ</a>、<a href="https://www.goodreads.com/book/show/58153385" target="_blank" rel="noopener">Goodreads 第4版ページ</a></p>
        </div>

        <h3>「Bored People Quit(退屈な人は辞める)」から学ぶ実践</h3>

        <p>本書で繰り返し引用される代表的な章の一つです。退屈は静かに始まり、気づいたときには手遅れになりやすいという警鐘が中心テーマです。</p>

        <ul>
          <li>メンバーの日常のルーティンに変化がないかを観察する。</li>
          <li>「今、退屈していないか」を直接尋ねる勇気を持つ。</li>
          <li>一人ひとりについて「この人はどこに向かいたいのか」「そのために自分は何をしているか」を答えられるようにしておく。</li>
          <li>つまらない仕事(Shit Work)は公平に配分し、誰がやっているかを把握し、いつ終わるかを伝える。</li>
          <li>マネージャーになっても完全にコードから離れない。エンジニアの思考プロセスへの理解を保つため。</li>
        </ul>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。</p>
        </div>
      </section>

      <!-- ===================== 07. Beginner Steps ===================== -->
      <section id="beginner-steps">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 07</div>
        <h2>初心者マネージャーのための実践ステップバイステップまとめ</h2>

        <p>これまでの内容を、新任エンジニアリングマネージャーが「今週から」着手できる8つのステップとして整理しました。</p>

        <div class="diagram-card">
          <div class="diagram-container mermaid-wrap">
            <ClientOnly>
              <MermaidDiagram :chart="DIAGRAM_BEGINNER_STEPS_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
              <template #fallback>
                <div class="diagram-loading">図を読み込み中...</div>
              </template>
            </ClientOnly>
          </div>
          <div class="diagram-caption">今週から着手できる8ステップの実践ロードマップ</div>
        </div>

        <ol class="step-list">
          <li><div class="step-num">1</div><div class="step-body"><div class="step-title">全メンバーと週次30分の1on1を固定枠で設定する</div><div class="step-desc">対応する章: The Update, the Vent, and the Disaster</div></div></li>
          <li><div class="step-num">2</div><div class="step-body"><div class="step-title">すべての会議にアジェンダを用意し、進行役として時間を管理する</div><div class="step-desc">対応する章: How to Run a Meeting</div></div></li>
          <li><div class="step-num">3</div><div class="step-body"><div class="step-title">誰が安定志向で誰が変革志向かを意識してタスクを割り振る</div><div class="step-desc">対応する章: Stables and Volatiles</div></div></li>
          <li><div class="step-num">4</div><div class="step-body"><div class="step-title">議論が停滞したら「決める・伝える・個別に説明する」の順で決定する</div><div class="step-desc">対応する章: Dissecting the Mandate</div></div></li>
          <li><div class="step-num">5</div><div class="step-body"><div class="step-title">自分だけが知っている情報を溜め込まず共有する</div><div class="step-desc">対応する章: Information Starvation</div></div></li>
          <li><div class="step-num">6</div><div class="step-body"><div class="step-title">障害・炎上時はWar Roomを立て、役割分担と発信を徹底する</div><div class="step-desc">対応する章: When the Sky Falls</div></div></li>
          <li><div class="step-num">7</div><div class="step-body"><div class="step-title">開発環境に触れ続け、エンジニアの言葉で会話できる状態を保つ</div><div class="step-desc">対応する章: An Engineering Mindset</div></div></li>
          <li><div class="step-num">8</div><div class="step-body"><div class="step-title">反対意見を歓迎し、役職に依存しない成長パスを用意する</div><div class="step-desc">対応する章: Titles Are Toxic / Saying No</div></div></li>
        </ol>
      </section>

      <!-- ===================== 08. Pitfalls ===================== -->
      <section id="pitfalls">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 08</div>
        <h2>よくある落とし穴(アンチパターン)</h2>

        <div class="table-wrap">
          <table>
            <thead><tr><th>落とし穴</th><th>なぜ問題か</th><th>本書での対策</th></tr></thead>
            <tbody>
              <tr><td>1on1をステータス報告の場にしてしまう</td><td>メンバーの本音や課題を拾えなくなる</td><td>Update/Vent/Disasterの型で聞き方を切り替える</td></tr>
              <tr><td>会議で誰も進行管理をしない</td><td>議論が発散し、意思決定に至らない</td><td>レフェリーとして参加者の集中度と論点を管理する</td></tr>
              <tr><td>すべてを合議制で決めようとする</td><td>決定が遅れ、チームが疲弊する</td><td>必要な場面ではMandateとして毅然と決定する</td></tr>
              <tr><td>情報を出し惜しみする</td><td>憶測やゴシップが組織の不安を増幅させる</td><td>有益無益を問わず情報を流し続ける</td></tr>
              <tr><td>マネージャーが完全にコードから離れる</td><td>エンジニアとの共通言語を失う</td><td>開発環境に触れ続け、実装への理解を保つ</td></tr>
              <tr><td>役職だけでキャリアパスを設計する</td><td>役職では成長の多様性を捉えきれない</td><td>職務内容と実際の貢献を軸に評価する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p>章立ては第4版の目次(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly 書誌ページ(第4版)</a>)と、著者本人の告知記事 <a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">Rands in Repose「Managing Humans, 4th Edition」</a> に基づく。同記事によれば、第4版では「The Monday Freakout」と「Avoiding the Fez」の2章が削除され、11章が新規に追加され、エピローグが加わっている(本ガイドの各表は削除された2章を含まない)。各章の内容要約にあたっては旧版に基づく章ノート <a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">mgp/book-notes</a> も補助的に参照したが、同ノートは旧版準拠であり、第4版で新規追加された11章とエピローグは扱っていない。章ごとの要約は <a href="https://www.briansnotes.io/book/managing-humans/" target="_blank" rel="noopener">Brian's Notes「Managing Humans」</a> も参考になる。</p>
        </div>
      </section>

      <!-- ===================== 09. Related Books ===================== -->
      <section id="related-books">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:book-2" aria-hidden="true" />SECTION 09</div>
        <h2>併読をおすすめする関連書籍</h2>

        <p>エンジニアリングマネジメント分野の著名な開発者・技術ブログが本書と併せてよく推薦している書籍です。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>書籍</th><th>著者</th><th>本書との関係性</th></tr></thead>
            <tbody>
              <tr><td>The Manager's Path</td><td>Camille Fournier</td><td>よりキャリア段階別に体系化された内容。本書のエピソード集的な構成と対照的で併読が推奨されている</td></tr>
              <tr><td>An Elegant Puzzle: Systems of Engineering Management</td><td>Will Larson</td><td>組織をシステムとして捉える視点を補完する</td></tr>
              <tr><td>Staff Engineer</td><td>Will Larson</td><td>マネジメント以外のキャリアパス(Titles Are Toxicの発展形)を掘り下げる</td></tr>
              <tr><td>The Art of Leadership: Small Things, Done Well</td><td>Michael Lopp(同著者)</td><td>本書の続編ではなく、同著者による独立した関連書。リーダーシップを「日々繰り返す小さな実践」として扱う</td></tr>
              <tr><td>Radical Candor</td><td>Kim Scott</td><td>フィードバックの与え方について、本書の1on1論を補完する</td></tr>
            </tbody>
          </table>
        </div>

        <div class="callout source" data-testid="callout" data-variant="source">
          <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />出典</div>
          <p><a href="https://blog.pragmaticengineer.com/holiday-tech-book-recommendations/" target="_blank" rel="noopener">blog.pragmaticengineer.com</a>、<a href="https://github.com/charlax/engineering-management" target="_blank" rel="noopener">github.com/charlax/engineering-management</a>、<a href="https://randsinrepose.com/books/" target="_blank" rel="noopener">randsinrepose.com/books</a>(著者本人による著作一覧)</p>
        </div>
      </section>

      <!-- ===================== 10. Summary ===================== -->
      <section id="summary">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 10</div>
        <h2>まとめ</h2>

        <p><em>Managing Humans</em> は体系立った理論書ではなく、著者自身のシリコンバレーでの実体験から抽出された「実践知の集積」です。そのため、以下のスタンスで読むことが推奨されます。</p>

        <ol>
          <li><strong>一つの正解として鵜呑みにしない:</strong> 著者自身の経験と組織文化に強く依存した記述が多いため、自分のチームの文脈に照らして取捨選択する。</li>
          <li><strong>概念(フレームワーク)を借りる:</strong> Stables/Volatiles、Update/Vent/Disaster、Decide/Deliver/Deliver Again、War Roomといった「型」は、そのまま自分のチーム運営に応用しやすい。</li>
          <li><strong>短い章単位で実践に落とし込む:</strong> 各章が独立したエッセイなので、直面している課題に近いテーマから拾い読みし、翌週の1on1や会議から試してみる。</li>
        </ol>

        <p>初めてマネージャーになる方にとって、本書は「明日から使える語彙とフレームワーク」を数多く提供してくれる一冊です。批判的な視点を持ちながらも、まずは本ガイドで紹介したステップから実践してみることをおすすめします。</p>
      </section>

      <!-- ===================== 11. References ===================== -->
      <section id="references">
        <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 11</div>
        <h2>参考文献・情報源(URL一覧)</h2>

        <p>本ガイドの作成にあたり、2026年8月19日時点で以下の情報源を参照しました。</p>

        <div class="table-wrap">
          <table>
            <thead><tr><th>No.</th><th>情報源</th><th>URL</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>O'Reilly 書誌ページ(第4版)</td><td><a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">https://www.oreilly.com/library/view/managing-humans-more/9781484271162/</a></td></tr>
              <tr><td>2</td><td>Springer/Apress 書誌ページ(第4版)</td><td><a href="https://link.springer.com/book/10.1007/978-1-4842-7116-2" target="_blank" rel="noopener">https://link.springer.com/book/10.1007/978-1-4842-7116-2</a></td></tr>
              <tr><td>3</td><td>Springer/Apress 書誌ページ(初版)</td><td><a href="https://link.springer.com/book/10.1007/978-1-4302-0271-4" target="_blank" rel="noopener">https://link.springer.com/book/10.1007/978-1-4302-0271-4</a></td></tr>
              <tr><td>4</td><td>Rands in Repose(著者公式ブログ)書籍紹介ページ</td><td><a href="https://randsinrepose.com/books/" target="_blank" rel="noopener">https://randsinrepose.com/books/</a></td></tr>
              <tr><td>5</td><td>Rands in Repose: 第4版発表記事(章構成の変更点の一次情報)</td><td><a href="https://randsinrepose.com/archives/managing-humans-4th-edition/" target="_blank" rel="noopener">https://randsinrepose.com/archives/managing-humans-4th-edition/</a></td></tr>
              <tr><td>5b</td><td>Rands in Repose: 第3版発表記事</td><td><a href="https://randsinrepose.com/archives/managing-humans-third-edition/" target="_blank" rel="noopener">https://randsinrepose.com/archives/managing-humans-third-edition/</a></td></tr>
              <tr><td>6</td><td>mgp/book-notes(GitHub、章ごとの詳細ノート / 旧版に基づく)</td><td><a href="https://github.com/mgp/book-notes/blob/master/managing-humans.markdown" target="_blank" rel="noopener">https://github.com/mgp/book-notes/blob/master/managing-humans.markdown</a></td></tr>
              <tr><td>7</td><td>charlax/engineering-management(GitHub、キュレーションリスト)</td><td><a href="https://github.com/charlax/engineering-management" target="_blank" rel="noopener">https://github.com/charlax/engineering-management</a></td></tr>
              <tr><td>8</td><td>skyzyx/managing-humans(GitHub、推薦リスト)</td><td><a href="https://github.com/skyzyx/managing-humans" target="_blank" rel="noopener">https://github.com/skyzyx/managing-humans</a></td></tr>
              <tr><td>9</td><td>The Pragmatic Engineer(Gergely Orosz)書籍推薦記事</td><td><a href="https://blog.pragmaticengineer.com/holiday-tech-book-recommendations/" target="_blank" rel="noopener">https://blog.pragmaticengineer.com/holiday-tech-book-recommendations/</a></td></tr>
              <tr><td>10</td><td>DEV Community レビュー記事</td><td><a href="https://dev.to/rachelsoderberg/book-review-managing-humans-by-michael-lopp-11fo" target="_blank" rel="noopener">https://dev.to/rachelsoderberg/book-review-managing-humans-by-michael-lopp-11fo</a></td></tr>
              <tr><td>11</td><td>horia141.com レビュー記事</td><td><a href="https://horia141.com/book_reviews/2022-08-08-managing-humans-review" target="_blank" rel="noopener">https://horia141.com/book_reviews/2022-08-08-managing-humans-review</a></td></tr>
              <tr><td>12</td><td>Hacker News ディスカッション</td><td><a href="https://news.ycombinator.com/item?id=21508140" target="_blank" rel="noopener">https://news.ycombinator.com/item?id=21508140</a></td></tr>
              <tr><td>13</td><td>Goodreads(第4版ページ)</td><td><a href="https://www.goodreads.com/book/show/58153385" target="_blank" rel="noopener">https://www.goodreads.com/book/show/58153385</a></td></tr>
              <tr><td>14</td><td>Goodreads(旧版ページ)</td><td><a href="https://www.goodreads.com/book/show/1317946.Managing_Humans" target="_blank" rel="noopener">https://www.goodreads.com/book/show/1317946.Managing_Humans</a></td></tr>
              <tr><td>15</td><td>Brian's Notes 書籍要約ページ</td><td><a href="https://www.briansnotes.io/book/managing-humans/" target="_blank" rel="noopener">https://www.briansnotes.io/book/managing-humans/</a></td></tr>
              <tr><td>16</td><td>Thriftbooks 目次掲載ページ(旧版の目次)</td><td><a href="https://www.thriftbooks.com/w/managing-humans-biting-and-humorous-tales-of-a-software-engineering-manager_michael-lopp/399304/" target="_blank" rel="noopener">https://www.thriftbooks.com/w/managing-humans-biting-and-humorous-tales-of-a-software-engineering-manager_michael-lopp/399304/</a></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        本ガイドはMichael Lopp氏の原著の著作権を尊重し、本文の逐語的な引用を避け、要点を独自の言葉で要約・体系化したものです。詳細な内容や著者ならではのユーモアあふれる語り口については、ぜひ原著(<a href="https://www.oreilly.com/library/view/managing-humans-more/9781484271162/" target="_blank" rel="noopener">O'Reilly版はこちら</a>)を直接お読みください。
      </footer>
    </main>
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
  border-left: 2px solid transparent;
  text-decoration: none;
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
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

section {
  margin: 72px 0;
}

:is(h2, h3) {
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
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  color: var(--color-ink);
  margin: 40px 0 16px;
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
  min-height: 60px;
}

.diagram-loading {
  color: var(--color-ink-faint);
  font-size: 16px;
  padding: 20px 0;
  text-align: center;
}

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

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
}

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
