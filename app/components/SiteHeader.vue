<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useRoute, watch } from "#imports";
import { groupGuidesByKind, type GuideKindGroup, type GuideKindId, type GuideProgramGroup } from "~/utils/guide-catalog";

const route = useRoute();

/*
 * ナビの項目はガイドカタログ（app/utils/guide-catalog.ts）から導出する。
 * ここで独自の配列を持つと、ホームのカード一覧と二重管理になり登録漏れが起きる。
 *
 * **ナビはプログラム（ハブページ）までしか列挙しない。**
 * ガイド本体のリンクを並べると項目数がガイド数に比例し、必ず破綻する
 * （実測: 59 本の時点でカラム数・カラム内件数の上限へ同時に張り付き、
 * パネル高も 683px に達した）。ガイドの一覧はハブページが担う。
 */
const guideGroups = groupGuidesByKind();

/** 開いているドロップダウン。同時に開けるのは 1 つだけ。 */
const openCategoryId = ref<GuideKindId | null>(null);
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

/**
 * 種別トリガーを現在地として示すか。
 *
 * ナビはガイドを列挙しないため、閲覧中のガイドから辿れる手掛かりはここしかない。
 * 種別インデックス・ハブ・配下のガイドのいずれを見ていても点灯させる。
 * @param group - 種別単位のガイド束
 */
function isCategoryCurrent(group: GuideKindGroup): boolean {
  if (isCurrent(group.kind.to)) return true;
  return group.programGroups.some((item) => isProgramCurrent(item));
}

/**
 * ハブ自身、またはその配下のガイドを見ているか。
 * @param item - プログラム単位のガイド束
 */
function isProgramCurrent(item: GuideProgramGroup): boolean {
  if (isCurrent(item.program.to)) return true;
  return item.guides.some((guide) => isCurrent(guide.to));
}

/**
 * ハブリンクの aria-current。
 * ハブページ自身は "page"、配下のガイドを見ているときは "true"（祖先）で区別する。
 * どちらも同じ値にすると、支援技術には「今そのページにいる」と読まれてしまう。
 * @param item - プログラム単位のガイド束
 */
function programAriaCurrent(item: GuideProgramGroup): "page" | "true" | undefined {
  if (isCurrent(item.program.to)) return "page";
  return item.guides.some((guide) => isCurrent(guide.to)) ? "true" : undefined;
}

function closeAllCategories(): void {
  openCategoryId.value = null;
}

function toggleCategory(id: GuideKindId): void {
  openCategoryId.value = openCategoryId.value === id ? null : id;
}

function openCategoryOnHover(id: GuideKindId): void {
  if (!canHover.value) return;
  openCategoryId.value = id;
}

function closeCategoryOnHover(id: GuideKindId): void {
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
          :key="group.kind.id"
          class="nav-category"
          :class="{ open: openCategoryId === group.kind.id }"
          @mouseenter="openCategoryOnHover(group.kind.id)"
          @mouseleave="closeCategoryOnHover(group.kind.id)"
        >
          <button
            :id="`nav-trigger-${group.kind.id}`"
            type="button"
            class="global-nav-link nav-category-trigger"
            data-testid="nav-category-trigger"
            :class="{ current: isCategoryCurrent(group) }"
            :aria-controls="`nav-panel-${group.kind.id}`"
            :aria-expanded="openCategoryId === group.kind.id ? 'true' : 'false'"
            @click="toggleCategory(group.kind.id)"
          >
            <Icon :name="group.kind.icon" aria-hidden="true" />
            <span>{{ group.kind.navLabel }}</span>
            <Icon class="nav-chevron" name="tabler:chevron-down" aria-hidden="true" />
          </button>

          <!--
            パネルの中身はハブ（プログラム）へのリンクと、種別の総覧リンクだけ。
            行数はガイド数ではなくプログラム数で決まるので、ガイドが増えても太らない。
            data-columns は DOM 契約としての可視化、--nav-panel-columns が実際のグリッド列数。
            ハブ方式では常に 1 カラム（縦に並べる）。
          -->
          <div
            :id="`nav-panel-${group.kind.id}`"
            class="nav-dropdown"
            data-columns="1"
            :style="{ '--nav-panel-columns': 1 }"
          >
            <ul class="nav-program-list" :aria-labelledby="`nav-trigger-${group.kind.id}`">
              <li v-for="item in group.programGroups" :key="item.program.id">
                <NuxtLink
                  :class="{ current: isProgramCurrent(item) }"
                  :to="item.program.to"
                  :aria-current="programAriaCurrent(item)"
                >
                  <Icon :name="item.program.icon" aria-hidden="true" />
                  <span class="nav-program-label">{{ item.program.navLabel }}</span>
                  <span
                    class="nav-program-count"
                    data-testid="nav-program-count"
                    :data-program="item.program.id"
                  >{{ item.guides.length }}</span>
                  <span class="nav-program-summary">{{ item.program.summary }}</span>
                </NuxtLink>
              </li>
            </ul>

            <NuxtLink
              class="nav-panel-all"
              :class="{ current: isCurrent(group.kind.to) }"
              :to="group.kind.to"
              :aria-current="isCurrent(group.kind.to) ? 'page' : undefined"
            >
              <span class="nav-panel-all-label">{{ group.kind.navLabel }}をすべて見る</span>
              <Icon name="tabler:arrow-right" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>

        <!--
          検索はナビの末尾に置く。ハブ方式でガイドが 1 クリック遠くなる代償をここで相殺する。
          モバイル幅ではこの <nav> 自体がハンバーガーの中身になるため、
          ヘッダー最上部の横幅を圧迫しない。
        -->
        <SiteSearch />
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
   * ハブ方式では行数がプログラム数で決まるため、ガイドが増えてもここは伸びない。
   * それでも残すのは、プログラム自体が増えた場合の最後の受け皿として
   * （旧メガメニューではガイド列挙により実測 683px に達し、ヘッダー下の残り 648px を
   * 超えて画面を覆った）。ヘッダー直下からの残り高さで頭打ちにし、内部スクロールへ逃がす。
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

.nav-program-list { margin: 0; padding: 0; list-style: none; min-width: 0; }

/*
 * 1 行 = アイコン / ラベル / 件数 / 説明。説明はラベルの下段へ回り込ませる。
 * grid にするのは、件数を右端へ揃えたまま説明を 2 行目に置くため
 * （flex の折り返しでは件数の位置が行内容に引きずられる）。
 */
.nav-program-list a {
  display: grid;
  grid-template-columns: 17px minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 10px;
  row-gap: 2px;
}

.nav-program-count {
  justify-self: end;
  min-width: 22px;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-size: 11px;
  font-weight: 700;
  text-align: center;
}

.nav-program-summary {
  grid-column: 2 / -1;
  color: var(--color-ink-faint);
  font-size: 11px;
  font-weight: 400;
}

/*
 * 説明は 2 行目で折り返させる（ラベル側の省略表示はそのまま残す）。
 * .nav-dropdown a の white-space: nowrap は継承値なので直接指定で上書きできるが、
 * .nav-dropdown a span の overflow / text-overflow は詳細度 (0,1,2) で後方にあるため、
 * クラス 2 つ分の詳細度を確保してからでないと打ち消せない。
 */
.nav-program-list a .nav-program-summary {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

/* 種別の総覧へ抜ける導線。ハブの一覧とは区切り線で分ける。 */
.nav-panel-all {
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border);
  color: var(--color-indigo);
  font-size: 12px;
}

.nav-panel-all svg { color: currentcolor; }

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
 * 横に並ぶのはホーム + 3 種別の計 4 項目に固定。
 * パネルの縦はプログラム数で決まり、ガイドが何本増えても伸びないため、
 * ブレークポイントの再計算は不要。
 * 幅が増える方向の上限は .nav-dropdown の max-width が担保する。
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
