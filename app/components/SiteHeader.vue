<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useRoute, watch } from "#imports";
import { groupGuidesByCategory, type GuideCategoryId, type GuideGroup } from "~/utils/guide-catalog";

const route = useRoute();

/*
 * ナビの項目はガイドカタログ（app/utils/guide-catalog.ts）から導出する。
 * ここで独自の配列を持つと、ホームのカード一覧と二重管理になり登録漏れが起きる。
 */
const guideGroups = groupGuidesByCategory();

/** 開いているドロップダウン。同時に開けるのは 1 つだけ。 */
const openCategoryId = ref<GuideCategoryId | null>(null);
/** モバイル幅のハンバーガーで開くナビ本体。 */
const isMenuOpen = ref(false);
/*
 * hover で開くのは「ポインタデバイス かつ デスクトップレイアウト」のときだけ。
 *
 * ポインタ能力だけで判定すると、デスクトップでウィンドウを狭めた場合に
 * CSS はアコーディオン（クリック操作前提）へ切り替わっているのに hover が生き残り、
 * mouseenter で開いた直後の click がトグルして閉じてしまう。
 * したがって min-width は <style> の 680px ブレークポイントと必ず対で維持する。
 */
const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 681px)";
/*
 * nav-toggle（ハンバーガー）は <style> の 680px ブレークポイントでしか表示されない。
 * DESKTOP_HOVER_QUERY が外れる理由は「幅が狭まった」だけでなく
 * 「デスクトップ幅のまま入力方式が変わった（hover/pointer の変化）」もありうるため、
 * フォーカスの戻し先を決めるには幅だけを見る別のクエリが必要になる。
 */
const MOBILE_LAYOUT_QUERY = "(max-width: 680px)";
const canHover = ref(false);
let hoverMedia: MediaQueryList | null = null;

/** 現在のビューポートがモバイルレイアウト（nav-toggle が可視）かを判定する。 */
function isMobileLayout(): boolean {
  return window.matchMedia?.(MOBILE_LAYOUT_QUERY).matches ?? false;
}

/** フォーカスがナビゲーション内にあるかを判定する。 */
function isFocusInsideNav(): boolean {
  return !!headerRef.value?.contains(document.activeElement);
}

function syncCanHover(event: MediaQueryListEvent | MediaQueryList): void {
  const hadFocus = isFocusInsideNav();
  const closingId = openCategoryId.value;
  canHover.value = event.matches;
  // モバイルレイアウトへ切り替わった瞬間に開きっぱなしのパネルを残さない。
  if (!event.matches) {
    closeAllCategories();
    if (!hadFocus) return;
    if (isMobileLayout()) {
      // モバイルレイアウトへの切替 → 可視になった nav-toggle へ戻す
      headerRef.value?.querySelector<HTMLButtonElement>("[data-testid='nav-toggle']")?.focus();
      return;
    }
    /*
     * デスクトップ幅のまま入力方式だけが変わった場合。
     * nav-toggle は display:none でフォーカスを受け取れず、focus() が無言で失敗して
     * フォーカスが body へ落ちる。閉じたカテゴリのトリガーへ戻し、
     * 戻し先が無ければフォーカスは動かさない。
     */
    if (closingId) {
      headerRef.value?.querySelector<HTMLButtonElement>(`#nav-trigger-${closingId}`)?.focus();
    }
  } else if (hadFocus && closingId) {
    // デスクトップレイアウトへの切替 → カテゴリトリガーへ戻す
    headerRef.value?.querySelector<HTMLButtonElement>(`#nav-trigger-${closingId}`)?.focus();
  }
}

const headerRef = ref<HTMLElement | null>(null);

/**
 * 開いているパネルが、ヘッダー内枠の右端をはみ出す分だけ左へ退避させる。
 *
 * パネルはトリガーの左端に揃えるのが原則。ただしシリーズカラム化で横に広がったため、
 * 右寄りのカテゴリーは素の位置のままだと画面外へ出る（実測: リーダーシップは
 * 1440px 幅で右端が 1490px、チームビルディングは 1715px）。
 * かといって常にナビ右端へ揃えると、パネルがどの項目のものか読めなくなる。
 * そこで「原則トリガー基準・必要な分だけ退避」を実測で満たす。
 *
 * 位置は CSS だけでは決められない（トリガーの x 座標を CSS は知らない）ため、
 * ここだけレイアウト実測に頼る。契約は e2e で固定する。
 */
function clampOpenPanel(): void {
  const header = headerRef.value;
  const id = openCategoryId.value;
  if (!header || id === null) return;

  const panel = header.querySelector<HTMLElement>(`#nav-panel-${id}`);
  const container = header.querySelector<HTMLElement>(".global-header-inner");
  if (!panel || !container) return;

  // モバイルは通常フローのアコーディオン。退避の対象外。
  if (isMobileLayout()) {
    panel.style.removeProperty("--nav-panel-shift");
    return;
  }

  // 前回の退避量が混ざると累積するため、いったん解いてから素の位置を測る。
  panel.style.setProperty("--nav-panel-shift", "0px");
  const panelBox = panel.getBoundingClientRect();
  const containerBox = container.getBoundingClientRect();

  const overflow = panelBox.right - containerBox.right;
  if (overflow <= 0) return;

  // 内枠の左端を超えてまでは退避しない（左へはみ出すのは右へはみ出すより悪い）。
  const shift = Math.min(overflow, panelBox.left - containerBox.left);
  panel.style.setProperty("--nav-panel-shift", `${-Math.round(shift)}px`);
}

function isCurrent(to: string): boolean {
  return route.path === to;
}

function isCategoryCurrent(group: GuideGroup): boolean {
  return group.guides.some((guide) => isCurrent(guide.to));
}

function closeAllCategories(): void {
  openCategoryId.value = null;
}

function toggleCategory(id: GuideCategoryId): void {
  openCategoryId.value = openCategoryId.value === id ? null : id;
}

function openCategoryOnHover(id: GuideCategoryId): void {
  if (!canHover.value) return;
  openCategoryId.value = id;
}

function closeCategoryOnHover(id: GuideCategoryId): void {
  if (!canHover.value) return;
  if (openCategoryId.value === id) closeAllCategories();
}

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value;
  if (!isMenuOpen.value) closeAllCategories();
}

/** Escape は開いていたドロップダウンを閉じ、フォーカスをトリガーへ戻す。 */
function handleEscape(): void {
  const id = openCategoryId.value;
  closeAllCategories();
  if (id === null) {
    isMenuOpen.value = false;
    /*
     * nav-toggle はモバイルレイアウトでしか可視でない。デスクトップ幅で focus() すると
     * 無言で失敗してフォーカスが body へ落ちるため、可視なときだけ戻す。
     * デスクトップでは戻し先が無いのでフォーカスは動かさない。
     */
    if (isMobileLayout()) {
      headerRef.value?.querySelector<HTMLButtonElement>("[data-testid='nav-toggle']")?.focus();
    }
    return;
  }
  const trigger = headerRef.value?.querySelector<HTMLButtonElement>(`#nav-trigger-${id}`);
  trigger?.focus();
}

function handlePointerDownOutside(event: Event): void {
  const header = headerRef.value;
  if (!header) return;
  const target = event.target;
  if (target instanceof Node && header.contains(target)) return;
  const hadFocus = isFocusInsideNav();
  const closingId = openCategoryId.value;
  closeAllCategories();
  isMenuOpen.value = false;
  if (!hadFocus) return;

  /*
   * 戻し先は nav-toggle の可視性で決める。canHover（入力方式）で分岐すると、
   * デスクトップ幅のままタッチ入力に変わった場合に display:none の nav-toggle を
   * 選んでしまい、focus() が無言で失敗してフォーカスが body へ落ちる。
   */
  const fallbackTarget = isMobileLayout()
    // モバイル: 可視な nav-toggle へ戻す
    ? header.querySelector<HTMLButtonElement>("[data-testid='nav-toggle']")
    // デスクトップ: 閉じたカテゴリのトリガーへ戻す（無ければ動かさない）
    : closingId
      ? header.querySelector<HTMLButtonElement>(`#nav-trigger-${closingId}`)
      : null;
  if (!fallbackTarget) return;

  /*
   * ここは pointerdown。ブラウザの既定のフォーカス移動は直後の mousedown で起きるため、
   * 同期的に focus() してもすぐ奪い返される。クリック処理が一巡したあとに退避する。
   *
   * さらに「フォーカスが body へ落ちた場合だけ」に限定する。外側のフォーカス可能な
   * 要素（本文中のリンク等）を押したときにナビへ引き戻すと、利用者の操作を横取りしてしまう。
   */
  requestAnimationFrame(() => {
    const active = document.activeElement;
    if (active === null || active === document.body) fallbackTarget.focus();
  });
}

onMounted(() => {
  document.addEventListener("pointerdown", handlePointerDownOutside);
  // 開いたままウィンドウ幅が変わると退避量が合わなくなる。
  window.addEventListener("resize", clampOpenPanel);

  hoverMedia = window.matchMedia?.(DESKTOP_HOVER_QUERY) ?? null;
  if (!hoverMedia) return;
  canHover.value = hoverMedia.matches;
  // ウィンドウのリサイズでレイアウトが切り替わったら追従する。
  hoverMedia.addEventListener("change", syncCanHover);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handlePointerDownOutside);
  window.removeEventListener("resize", clampOpenPanel);
  hoverMedia?.removeEventListener("change", syncCanHover);
  hoverMedia = null;
});

/*
 * 開いた直後に退避量を決める。flush: "post" で DOM 更新後に測る。
 * パネルは閉じていても DOM に残る（visibility で隠している）ため寸法は取れるが、
 * open クラスの反映後に測るほうが将来の変更に強い。
 */
watch(openCategoryId, (id) => {
  if (id !== null) clampOpenPanel();
}, { flush: "post" });

// 遷移したらパネルを閉じる（モバイルでリンクをタップした後に開きっぱなしにしない）。
watch(() => route.path, () => {
  closeAllCategories();
  isMenuOpen.value = false;
});
</script>

<template>
  <!--
    Escape はヘッダー全体で受ける。<nav> に載せるとハンバーガー（nav-toggle）は
    <nav> の外側にあるため、トグルにフォーカスが残ったままでは Escape が届かず、
    開いたメニューを閉じられない。
  -->
  <header ref="headerRef" class="global-header" data-site-header @keydown.escape="handleEscape">
    <div class="global-header-inner">
      <NuxtLink class="global-brand" to="/" aria-label="Management Studies ホーム">
        <span class="global-brand-mark" aria-hidden="true">M</span>
        <span class="global-brand-copy">
          <strong>Management Studies</strong>
          <small>LEARN · LEAD · GROW</small>
        </span>
      </NuxtLink>

      <button
        type="button"
        class="nav-toggle"
        data-testid="nav-toggle"
        aria-controls="global-nav"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        :aria-label="isMenuOpen ? 'ナビゲーションを閉じる' : 'ナビゲーションを開く'"
        @click="toggleMenu"
      >
        <Icon :name="isMenuOpen ? 'tabler:x' : 'tabler:menu-2'" aria-hidden="true" />
      </button>

      <nav
        id="global-nav"
        aria-label="グローバルナビゲーション"
        :class="{ open: isMenuOpen }"
      >
        <NuxtLink
          class="global-nav-link"
          data-testid="nav-home"
          :class="{ current: isCurrent('/') }"
          to="/"
          :aria-current="isCurrent('/') ? 'page' : undefined"
        >
          <Icon name="tabler:home" aria-hidden="true" />
          <span>ホーム</span>
        </NuxtLink>

        <div
          v-for="group in guideGroups"
          :key="group.category.id"
          class="nav-category"
          :class="{ open: openCategoryId === group.category.id }"
          @mouseenter="openCategoryOnHover(group.category.id)"
          @mouseleave="closeCategoryOnHover(group.category.id)"
        >
          <button
            :id="`nav-trigger-${group.category.id}`"
            type="button"
            class="global-nav-link nav-category-trigger"
            data-testid="nav-category-trigger"
            :class="{ current: isCategoryCurrent(group) }"
            :aria-controls="`nav-panel-${group.category.id}`"
            :aria-expanded="openCategoryId === group.category.id ? 'true' : 'false'"
            @click="toggleCategory(group.category.id)"
          >
            <Icon :name="group.category.icon" aria-hidden="true" />
            <span>{{ group.category.navLabel }}</span>
            <Icon class="nav-chevron" name="tabler:chevron-down" aria-hidden="true" />
          </button>

          <!--
            パネルはシリーズ（カタログの GUIDE_SERIES）ごとのカラムに分ける。
            data-columns は DOM 契約としての可視化、--nav-panel-columns が実際のグリッド列数。
            どちらも seriesGroups.length から導出しており、手で数を書かない。
          -->
          <div
            :id="`nav-panel-${group.category.id}`"
            class="nav-dropdown"
            :data-columns="group.seriesGroups.length"
            :style="{ '--nav-panel-columns': group.seriesGroups.length }"
          >
            <div
              v-for="column in group.seriesGroups"
              :key="column.series?.id ?? '_unassigned'"
              class="nav-series"
            >
              <p
                v-if="column.series"
                :id="`nav-series-${column.series.id}`"
                class="nav-series-label"
              >
                {{ column.series.navLabel }}
              </p>
              <ul :aria-labelledby="column.series ? `nav-series-${column.series.id}` : undefined">
                <li v-for="guide in column.guides" :key="guide.to">
                  <NuxtLink
                    :class="{ current: isCurrent(guide.to) }"
                    :to="guide.to"
                    :aria-current="isCurrent(guide.to) ? 'page' : undefined"
                  >
                    <Icon :name="guide.icon" aria-hidden="true" />
                    <span>{{ guide.navLabel }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.global-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--global-nav-height);
  /*
   * ドロップダウンは閉じていても visibility:hidden で DOM に残る。visibility は
   * レイアウトを占有するため、右寄りのカテゴリーのパネルは素の位置（トリガー左端基準）の
   * ままビューポートを突き抜け、ドキュメント全体に横スクロールを生む
   * （実測: 1440px 幅で 212px。全ガイドページで同量＝ヘッダー由来）。
   *
   * clip は hidden と違いスクロールコンテナを作らないので sticky も
   * position:absolute な子孫の包含ブロックも壊さない。x 軸だけを clip にし
   * y 軸を visible に保てる組み合わせは clip/visible だけで、これによって
   * ヘッダーの下へ開くパネルは切り取られない。
   *
   * 開いたパネルは clampOpenPanel() がヘッダー内枠へ退避させるため、
   * この clip で欠けることはない（e2e で「パネル全体が見えている」を固定）。
   */
  overflow-x: clip;
  overflow-y: visible;
  border-bottom: 1px solid rgba(223, 227, 234, 0.9);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
}

.global-header-inner {
  width: min(100% - 40px, 1440px);
  height: 100%;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.global-brand {
  min-width: max-content;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--color-ink);
}

.global-brand:hover { text-decoration: none; }

.global-brand-mark {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-gold);
  border-radius: 50%;
  color: var(--color-indigo-dark);
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 700;
  line-height: 1;
}

.global-brand-copy { display: grid; line-height: 1.15; }
.global-brand-copy strong { font-family: var(--font-display); font-size: 16px; letter-spacing: 0.01em; }
.global-brand-copy small { margin-top: 5px; color: var(--color-ink-faint); font-size: 8px; font-weight: 700; letter-spacing: 0.18em; }

nav { height: 100%; display: flex; align-items: stretch; }

/* パネルの配置基準。パネルはトリガーの左端に揃える（--nav-panel-shift で退避）。 */
.nav-category { position: relative; display: flex; align-items: stretch; }

.global-nav-link {
  position: relative;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  background: none;
  color: var(--color-ink-soft);
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.global-nav-link::after {
  content: "";
  position: absolute;
  right: 15px;
  bottom: -1px;
  left: 15px;
  height: 2px;
  background: var(--color-gold);
  transform: scaleX(0);
  transition: transform 160ms ease;
}

.global-nav-link:hover { color: var(--color-indigo); text-decoration: none; background: var(--color-indigo-tint); }
.global-nav-link.current { color: var(--color-indigo-dark); }
.global-nav-link.current::after { transform: scaleX(1); }
.global-nav-link svg { width: 17px; height: 17px; color: var(--color-ink-faint); }
.global-nav-link.current svg { color: var(--color-gold); }

/* `.global-nav-link svg`（詳細度 0,1,1）より高い詳細度で上書きする（!important は使わない）。 */
.global-nav-link svg.nav-chevron { width: 13px; height: 13px; transition: transform 160ms ease; }
.nav-category.open .nav-chevron { transform: rotate(180deg); }

/*
 * ドロップダウンは DOM に残したまま visibility で閉じる。
 * display:none と違いトランジションが効き、visibility:hidden はタブ順からも外れるため、
 * 閉じているパネルのリンクへ誤ってフォーカスが入らない。
 */
.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  display: grid;
  /*
   * トラックは内容幅で決める。1fr の等分割にすると、最長ラベルを持つカラムだけ
   * 幅が足りず、svg が flex で圧縮されテキストが縁まで張り出す
   * （実測: 必要 236px に対し 233px しか与えられず 17px → 15px に圧縮）。
   */
  grid-template-columns: repeat(var(--nav-panel-columns, 1), minmax(0, max-content));
  column-gap: 8px;
  /*
   * 幅を明示しないと shrink-to-fit になり、包含ブロック（.nav-category = トリガー 1 個分）
   * の幅が「利用可能幅」として効いてグリッドが min-content まで潰れる
   * （ラベルが省略記号になり、シリーズ見出しが縦積みになる）。
   * 内容幅を起点にし、ビューポートだけを上限にする。
   */
  width: max-content;
  max-width: calc(100vw - 32px);
  /*
   * カテゴリー内のガイドが増えるとパネルが縦にビューポートを覆う
   * （実測: project-management が 683px に対しヘッダー下の残り 648px）。
   * シリーズカラムは横方向にしか肥大を吸収できず、最も高いカラムが伸びると
   * カラムを増やしても高さは減らない。件数の閾値で守るのではなく、
   * ヘッダー直下からの残り高さで頭打ちにし、超えた分は内部スクロールへ逃がす。
   */
  max-height: calc(100vh - var(--global-nav-height) - 16px);
  overflow-y: auto;
  /* ヘッダー内枠の右端をはみ出す分だけ左へ退避する。値は JS が実測して設定する。 */
  margin: 0 0 0 var(--nav-panel-shift, 0px);
  padding: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  box-shadow: 0 18px 44px rgba(31, 44, 87, 0.14);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: opacity 160ms ease, transform 160ms ease, visibility 160ms;
}

.nav-series { min-width: 0; }
.nav-series + .nav-series { padding-left: 8px; border-left: 1px solid var(--color-border); }
.nav-series ul { margin: 0; padding: 0; list-style: none; }

.nav-series-label {
  margin: 0;
  padding: 8px 12px 6px;
  color: var(--color-ink-faint);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.nav-category.open .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/*
 * パネルはナビ基準の右揃えでトリガーの真下に来るとは限らないため、
 * 開いている間はトリガー側に金色の下線を出して、どの項目のパネルかを示す。
 */
.nav-category.open .nav-category-trigger::after { transform: scaleX(1); }

.nav-dropdown a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  color: var(--color-ink-soft);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.nav-dropdown a:hover { background: var(--color-indigo-tint); color: var(--color-indigo); text-decoration: none; }
.nav-dropdown a.current { color: var(--color-indigo-dark); background: var(--color-indigo-tint); }
/* flex-shrink の既定値のままだと、カラム幅が足りないときにアイコンが潰れる。 */
.nav-dropdown a svg { flex: none; width: 17px; height: 17px; color: var(--color-ink-faint); }
/* パネルがビューポート幅で頭打ちになった場合の保険（通常は max-content で収まる）。 */
.nav-dropdown a span { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.nav-dropdown a.current svg { color: var(--color-gold); }

/* ハンバーガーは既定で非表示。モバイル幅のメディアクエリでのみ出す。 */
.nav-toggle {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background: none;
  color: var(--color-ink-soft);
  cursor: pointer;
}

.nav-toggle svg { width: 20px; height: 20px; }

/*
 * 横に並ぶのはホーム + 4 カテゴリーの計 5 項目に固定（カテゴリー集約）。
 * 縦方向はシリーズカラムへの分割（メガメニュー）で吸収するため、
 * ガイドが増えてもブレークポイントの再計算は不要。
 * カラムが増える方向の上限は .nav-dropdown の max-width が担保する。
 */
@media (max-width: 1040px) {
  .global-header-inner { width: calc(100% - 24px); gap: 16px; }
  .global-nav-link { padding-inline: 11px; }
  .global-nav-link::after { right: 11px; left: 11px; }
  .global-brand-copy small { display: none; }
}

/*
 * 680px 以下はハンバーガー + アコーディオン。
 * パネルはヘッダー直下に固定配置する。オフセットは --global-nav-height が SSoT。
 */
@media (max-width: 680px) {
  .nav-toggle { display: flex; }

  nav {
    position: fixed;
    top: var(--global-nav-height);
    right: 0;
    left: 0;
    z-index: 90;
    max-height: calc(100vh - var(--global-nav-height));
    height: auto;
    flex-direction: column;
    align-items: stretch;
    padding: 8px 0 16px;
    overflow-y: auto;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-paper-raised);
    box-shadow: 0 18px 44px rgba(31, 44, 87, 0.14);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity 180ms ease, transform 180ms ease, visibility 180ms;
  }

  nav.open { opacity: 1; visibility: visible; transform: translateY(0); }

  .nav-category { flex-direction: column; }

  .global-nav-link {
    justify-content: flex-start;
    width: 100%;
    min-height: 48px;
    padding: 0 24px;
    font-size: 14px;
  }

  .global-nav-link::after { right: auto; left: 0; width: 3px; height: auto; top: 0; bottom: 0; transform: scaleY(0); }
  .global-nav-link.current::after { transform: scaleY(1); }

  .nav-category-trigger .nav-chevron { margin-left: auto; }

  /* アコーディオンなので絶対配置ではなく通常フローに戻し、カラムも縦積みにする。 */
  .nav-dropdown {
    position: static;
    display: none;
    /* 通常フローでは内容幅ではなく親幅に従わせる（デスクトップの max-content を解く）。 */
    width: auto;
    max-width: none;
    /*
     * 丈とスクロールは外側の nav が持つ。アコーディオンのパネルごとに
     * 頭打ちを掛けると入れ子のスクロール領域ができる（デスクトップの指定を解く）。
     */
    max-height: none;
    overflow-y: visible;
    /* 通常フローのアコーディオンなので退避しない。 */
    margin-left: 0;
    padding: 0;
    border: 0;
    background: var(--color-paper-sunken);
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    transition: none;
  }

  .nav-category.open .nav-dropdown { display: block; }

  /* 縦積みなので区切りは左罫ではなく上罫。 */
  .nav-series + .nav-series {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid var(--color-border);
  }

  .nav-series-label { padding: 12px 24px 2px; }
  .nav-dropdown a { padding: 11px 24px 11px 44px; white-space: normal; }
}

@media (prefers-reduced-motion: reduce) {
  .global-nav-link::after,
  .nav-chevron,
  .nav-dropdown,
  nav { transition: none; }
}
</style>
