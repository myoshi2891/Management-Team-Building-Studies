<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useNuxtApp } from "#imports";

/*
 * サイト全体で共有する免責事項。書籍の奥付にならって、巻末の小さな組みで置く。
 * ページ側の <footer>（資格団体ごとの商標・非公式表記）とは役割が異なり、
 * こちらはサイト全体の免責と著作権だけを担当する。
 *
 * ---- 固定サイドバーへの退避について ----
 * ガイドページのサイドバーは position: fixed で画面左端を占有し続けるため、
 * 共通フッターを全幅で置くと左端がその下へ潜り込んで読めなくなる。
 *
 * ブレークポイントでは判定しない。サイドバーを解除する幅はページごとに不揃いで
 * （980px が大半だが 1039px / 960px のページもある）、メディアクエリで退避量を
 * 決めると必ず外れるページが出る。実測すればページ側の事情を知る必要が無い。
 */
const sidebarInset = ref(0);
let sidebarResize: ResizeObserver | null = null;

/**
 * 画面左端を覆っているサイドバーの右端を返す。覆っていなければ 0。
 * @returns 退避すべき左からの px 数
 */
function measureSidebarInset(): number {
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  if (!sidebar) return 0;
  // 本文と一緒に流れるサイドバーは重ならない。重なるのは固定配置のときだけ。
  if (window.getComputedStyle(sidebar).position !== "fixed") return 0;

  const rect = sidebar.getBoundingClientRect();
  // 画面外へ退避したオフキャンバス状態（left が負）は覆っていない。
  if (rect.left > 0) return 0;
  return Math.max(0, rect.right);
}

function syncSidebarInset(): void {
  sidebarInset.value = measureSidebarInset();
}

/**
 * いま存在するサイドバーを測り直し、その要素の寸法変化を購読し直す。
 *
 * 一度きりの計測では足りない理由は 2 つある。
 * 1. マウント直後はスタイルが確定していないことがあり、誤った値を焼き付けたまま
 *    固定される（実測: 全体 CSS の box-sizing が効く前は右端が 288px ではなく 336px）。
 * 2. 免責事項は <NuxtPage> の外にあるため遷移で再マウントされないが、.sidebar は
 *    遷移先のページごとに作り直される。前のページの要素を購読したままでは、
 *    遷移先のサイドバーを誰も測らない。
 * したがって購読は「張りっぱなし」ではなく、そのつど張り直す。
 */
function trackSidebar(): void {
  // 前のページの要素への購読を必ず切る。切らずに重ねると解除漏れが積み上がる。
  sidebarResize?.disconnect();
  sidebarResize = null;

  syncSidebarInset();

  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  if (!sidebar) return;
  // jsdom には ResizeObserver が無い。無い環境では上の一度きりの計測のまま動かす。
  const observer = window.ResizeObserver;
  if (!observer) return;
  sidebarResize = new observer(syncSidebarInset);
  sidebarResize.observe(sidebar);
}

let stopPageFinish: (() => void) | undefined;

onMounted(() => {
  trackSidebar();
  // 幅が変わるとサイドバーの出入りが切り替わる。
  window.addEventListener("resize", syncSidebarInset);

  /*
   * 遷移の完了を待ってから測り直す。route の変化を見ると遷移先の DOM がまだ無い
   * 時点で走りうるが、page:finish は <NuxtPage> の Suspense 解決後に呼ばれるため、
   * 遷移先のサイドバーが確実にマウントされている。
   */
  stopPageFinish = useNuxtApp().hook("page:finish", trackSidebar);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncSidebarInset);
  stopPageFinish?.();
  stopPageFinish = undefined;
  sidebarResize?.disconnect();
  sidebarResize = null;
});
</script>

<template>
  <footer
    class="site-disclaimer"
    data-testid="site-disclaimer"
    aria-labelledby="site-disclaimer-heading"
    :style="{ '--disclaimer-inset': `${sidebarInset}px` }"
  >
    <div class="disclaimer-inner">
      <h2 id="site-disclaimer-heading" class="disclaimer-title">免責事項</h2>
      <dl class="disclaimer-terms">
        <dt>情報の正確性</dt>
        <dd>本サイトは学習支援を目的とした非公式の個人制作物です。掲載内容の正確性・完全性・最新性は保証しません。出題範囲・受験料・認定要件などは、各認定団体の公式サイトで必ずご確認ください。</dd>
        <dt>著作権・商標</dt>
        <dd>各資格の名称・ロゴおよび関連する用語は、各権利者の商標または登録商標です。本サイトは、いずれの認定団体とも提携・後援・承認の関係にありません。</dd>
        <dt>責任の範囲</dt>
        <dd>本サイトの利用、または利用できなかったことにより生じた損害、および学習の成果や受験の結果について、運営者は一切の責任を負いません。掲載内容は予告なく変更・削除されることがあります。</dd>
      </dl>
      <p class="disclaimer-copyright">© 2026 Management Studies</p>
    </div>
  </footer>
</template>

<style scoped>
.site-disclaimer {
  /* 実測した固定サイドバーの幅ぶんだけ内容を右へ逃がす。地の帯は全幅のまま。 */
  padding-left: var(--disclaimer-inset, 0px);
  border-top: 1px solid var(--color-border);
  background: var(--color-paper-sunken);
}

.disclaimer-inner {
  width: min(1180px, calc(100% - 48px));
  margin-inline: auto;
  padding-block: 44px 40px;
}

.disclaimer-title {
  /* main.css の h2 は下罫と 29px を持つ。奥付では本文より小さく、罫も持たせない。 */
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

/* 見出し直下の短い金罫。この節で唯一の差し色。 */
.disclaimer-title::after {
  content: "";
  display: block;
  width: 28px;
  height: 1px;
  margin-top: 14px;
  background: var(--color-gold);
}

/*
 * 3 項目を 3 カラムに開き、上のフッターと同じ共通カラム幅いっぱいに広げる。
 * 1 カラムに詰めて幅を余らせると、上のフッターより狭く見えて版面が揃わない。
 * カラムに割ると幅を使い切りながら 1 行あたりの文字数はむしろ短くなる。
 *
 * grid-auto-flow: column と 2 行指定で、dt / dd の対が縦に積まれたまま
 * 横へ流れる（dt1 dd1 | dt2 dd2 | dt3 dd3）。
 */
.disclaimer-terms {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: auto auto;
  grid-auto-flow: column;
  column-gap: 48px;
  margin: 30px 0 0;
}

/* 項目の頭を罫で仕切る。奥付の罫組みで、罫はこの 1 種類だけ使う。 */
.disclaimer-terms dt {
  padding-top: 14px;
  border-top: 1px solid var(--color-border-strong);
  color: var(--color-ink);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.9;
}

.disclaimer-terms dd {
  margin: 6px 0 0;
  color: var(--color-ink-soft);
  font-size: 13px;
  line-height: 1.9;
}

.disclaimer-copyright {
  margin: 30px 0 0;
  color: var(--color-ink-faint);
  font-size: 12px;
  letter-spacing: 0.04em;
}

/*
 * 3 カラムでは 1 行が短くなりすぎる幅から縦積みへ畳む。
 * 変えるのはカラム数だけで、上罫の体裁はそのまま保つ。
 */
@media (max-width: 899px) {
  .disclaimer-terms {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: none;
    grid-auto-flow: row;
  }

  .disclaimer-terms dd + dt {
    margin-top: 22px;
  }
}

@media (max-width: 680px) {
  .disclaimer-inner {
    width: calc(100% - 40px);
    padding-block: 36px 32px;
  }
}
</style>
