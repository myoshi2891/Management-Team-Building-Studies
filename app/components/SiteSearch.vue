<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch, navigateTo } from "#imports";
import { searchGuides, type SearchHit } from "~/utils/guide-search";

/*
 * サイト内検索。
 *
 * ハブページ方式ではガイドが 1 クリック遠くなるため、その代償をここで相殺する。
 * 絞り込みの仕様は app/utils/guide-search.ts（純関数）が正で、本コンポーネントは
 * その結果を描き、開閉とキーボード操作と a11y の紐付けだけを受け持つ。
 *
 * カタログは静的な TS モジュールなので、索引の生成もフェッチも要らない。
 */

/** listbox とその option の id はここから導く（aria-controls / aria-activedescendant の紐付け先）。 */
const listboxId = `site-search-listbox-${useId()}`;

const isOpen = ref(false);
const query = ref("");
/** 選択中の候補の位置。候補があるときは常にどれかを選択済みにする。 */
const activeIndex = ref(0);

const triggerRef = ref<HTMLButtonElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const rootRef = ref<HTMLElement | null>(null);

const hits = computed<SearchHit[]>(() => searchGuides(query.value));
/** 入力があるのに 1 件も無い状態。黙って空にせず、利用者へ伝えるために区別する。 */
const isEmptyResult = computed(() => query.value.trim() !== "" && hits.value.length === 0);

function optionId(index: number): string {
  return `${listboxId}-option-${index}`;
}

/** 選択中の候補の id。候補が無いときは通知しない（存在しない id を指さない）。 */
const activeOptionId = computed(() =>
  hits.value.length > 0 ? optionId(activeIndex.value) : undefined,
);

async function openSearch(): Promise<void> {
  isOpen.value = true;
  await nextTick();
  inputRef.value?.focus();
}

/**
 * 閉じる。
 * @param returnFocus - トリガーへフォーカスを戻すか。戻し先を用意しないと
 * フォーカスが body へ落ち、キーボード利用者はページ先頭からたどり直しになる。
 */
function closeSearch(returnFocus: boolean): void {
  if (!isOpen.value) return;
  isOpen.value = false;
  query.value = "";
  activeIndex.value = 0;
  if (returnFocus) triggerRef.value?.focus();
}

function toggleSearch(): void {
  if (isOpen.value) {
    closeSearch(true);
    return;
  }
  void openSearch();
}

/** 入力が変わったら選択位置を先頭へ戻す（Enter だけで最短到達できる状態を保つ）。 */
watch(query, () => {
  activeIndex.value = 0;
});

/**
 * 候補の選択位置を動かす。端では循環させる
 * （末尾で止まると、行き過ぎたときに逆方向へ押し直す手間が増える）。
 * @param step - 移動量。1 で次、-1 で前
 */
function moveActive(step: number): void {
  const count = hits.value.length;
  if (count === 0) return;
  activeIndex.value = (activeIndex.value + step + count) % count;
}

function goTo(hit: SearchHit | undefined): void {
  if (!hit) return;
  closeSearch(false);
  void navigateTo(hit.guide.to);
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveActive(1);
    return;
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveActive(-1);
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    goTo(hits.value[activeIndex.value]);
    return;
  }
  if (event.key === "Escape") {
    /*
     * SiteHeader は <header> で Escape を受けてドロップダウンを閉じ、フォーカスを退避する。
     * 伝播させると検索のトリガーではなくナビ側へフォーカスを奪われるため、ここで止める。
     */
    event.stopPropagation();
    closeSearch(true);
  }
}

/** 入力欄・テキストエリア等での打鍵か（ショートカットを横取りしないための判定）。 */
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** `/` と Cmd/Ctrl+K で検索を開く（本文を読んでいる途中から最短で呼び出せるようにする）。 */
function handleShortcut(event: KeyboardEvent): void {
  if (isOpen.value) return;
  const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  const isSlash = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
  if (!isCommandK && !isSlash) return;
  if (isTypingTarget(event.target)) return;
  event.preventDefault();
  void openSearch();
}

/** 外側を押したら閉じる。フォーカスは横取りしない（利用者が押した先へ渡す）。 */
function handlePointerDownOutside(event: Event): void {
  if (!isOpen.value) return;
  const target = event.target;
  if (target instanceof Node && rootRef.value?.contains(target)) return;
  closeSearch(false);
}

onMounted(() => {
  document.addEventListener("keydown", handleShortcut);
  document.addEventListener("pointerdown", handlePointerDownOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleShortcut);
  document.removeEventListener("pointerdown", handlePointerDownOutside);
});
</script>

<template>
  <div ref="rootRef" class="site-search" :class="{ open: isOpen }">
    <button
      ref="triggerRef"
      type="button"
      class="site-search-trigger"
      data-testid="site-search-trigger"
      aria-label="ガイドを検索"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="toggleSearch"
    >
      <Icon name="tabler:search" aria-hidden="true" />
      <span class="site-search-trigger-label">検索</span>
    </button>

    <div v-if="isOpen" class="site-search-panel">
      <div class="site-search-field">
        <Icon name="tabler:search" aria-hidden="true" />
        <input
          ref="inputRef"
          v-model="query"
          data-testid="site-search-input"
          type="text"
          role="combobox"
          class="site-search-input"
          placeholder="資格名・書名・キーワードで検索"
          autocomplete="off"
          aria-label="ガイドを検索"
          aria-autocomplete="list"
          aria-expanded="true"
          :aria-controls="listboxId"
          :aria-activedescendant="activeOptionId"
          @keydown="handleKeydown"
        >
      </div>

      <!--
        候補が 0 件でも listbox は出したままにする。
        aria-controls の参照先が消えると、支援技術には壊れた紐付けとして見える。
      -->
      <ul :id="listboxId" class="site-search-results" role="listbox" aria-label="検索候補">
        <li
          v-for="(hit, index) in hits"
          :id="optionId(index)"
          :key="hit.guide.to"
          class="site-search-hit"
          :class="{ active: index === activeIndex }"
          role="option"
          :aria-selected="index === activeIndex ? 'true' : 'false'"
          @click="goTo(hit)"
          @mouseenter="activeIndex = index"
        >
          <Icon :name="hit.guide.icon" aria-hidden="true" />
          <span class="site-search-hit-label" data-testid="search-hit-label">{{ hit.guide.navLabel }}</span>
          <span class="site-search-hit-meta">
            <span data-testid="search-hit-program">{{ hit.programLabel }}</span>
            <span aria-hidden="true">·</span>
            <span data-testid="search-hit-series">{{ hit.seriesLabel }}</span>
          </span>
        </li>
      </ul>

      <!--
        「見つかりません」はライブリージョンで伝える。要素ごと後から挿入すると
        挿入と中身の変化が同時になり、支援技術が読み上げを取りこぼす。
        よってパネルが開いている間は空のまま置き続け、文言だけを差し替える
        （display:none で畳むとライブリージョンごと読み上げ対象から外れるため、
        余白だけを詰める is-quiet を当てる）。
      -->
      <p
        class="site-search-empty"
        :class="{ 'is-quiet': !isEmptyResult }"
        data-testid="search-empty"
        role="status"
      >{{ isEmptyResult ? "一致するガイドが見つかりません。" : "" }}</p>
      <p v-if="!isEmptyResult && hits.length === 0" class="site-search-hint">
        資格名（CAPM・CSPO など）や書名の一部を入力してください。
      </p>
    </div>
  </div>
</template>

<style scoped>
/* パネルの配置基準。パネルはトリガーの右端に揃え、ヘッダー内枠からはみ出させない。 */
.site-search { position: relative; display: flex; align-items: stretch; }

.site-search-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 15px;
  border: 0;
  background: none;
  color: var(--color-ink-soft);
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.site-search-trigger:hover { color: var(--color-indigo); background: var(--color-indigo-tint); }
.site-search.open .site-search-trigger { color: var(--color-indigo-dark); }
.site-search-trigger svg { width: 17px; height: 17px; color: var(--color-ink-faint); }

.site-search-panel {
  position: absolute;
  top: 100%;
  /*
   * 右端揃え。ヘッダーは overflow-x: clip なので、左端揃えにすると
   * ナビ右端にある検索のパネルが切り取られる。
   */
  right: 0;
  z-index: 20;
  width: min(420px, calc(100vw - 32px));
  padding: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  box-shadow: 0 18px 44px rgba(31, 44, 87, 0.14);
}

.site-search-field {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  background: var(--color-paper);
}

.site-search-field svg { flex: none; width: 16px; height: 16px; color: var(--color-ink-faint); }

.site-search-input {
  width: 100%;
  min-width: 0;
  border: 0;
  background: none;
  color: var(--color-ink);
  font-family: inherit;
  font-size: 13px;
}

.site-search-input:focus { outline: none; }

.site-search-results {
  /*
   * 候補は最大 12 件（SEARCH_RESULT_LIMIT）。それでも画面を覆わないよう、
   * ヘッダー直下からの残り高さで頭打ちにして内部スクロールへ逃がす。
   */
  max-height: calc(100vh - var(--global-nav-height) - 120px);
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
}

.site-search-hit {
  display: grid;
  grid-template-columns: 17px minmax(0, 1fr);
  align-items: center;
  column-gap: 10px;
  row-gap: 2px;
  padding: 8px 10px;
  cursor: pointer;
}

.site-search-hit svg { width: 17px; height: 17px; color: var(--color-ink-faint); }
.site-search-hit.active { background: var(--color-indigo-tint); }
.site-search-hit.active svg { color: var(--color-gold); }

.site-search-hit-label {
  min-width: 0;
  overflow: hidden;
  color: var(--color-ink-soft);
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.site-search-hit.active .site-search-hit-label { color: var(--color-indigo-dark); }

.site-search-hit-meta {
  grid-column: 2 / -1;
  display: flex;
  gap: 6px;
  color: var(--color-ink-faint);
  font-size: 11px;
}

.site-search-empty,
.site-search-hint {
  margin: 0;
  padding: 10px;
  color: var(--color-ink-faint);
  font-size: 12px;
}

/* 文言が無いときは場所だけ確保せず余白を畳む（要素自体は残す）。 */
.site-search-empty.is-quiet { padding: 0; }

/* 680px 以下はハンバーガー内に入る。ヘッダー最上部の横幅を圧迫させない。 */
@media (max-width: 680px) {
  .site-search { flex-direction: column; }

  .site-search-trigger {
    justify-content: flex-start;
    width: 100%;
    min-height: 48px;
    padding: 0 24px;
    font-size: 14px;
  }

  /* アコーディオンなので絶対配置ではなく通常フローに戻す。 */
  .site-search-panel {
    position: static;
    width: auto;
    border: 0;
    background: var(--color-paper-sunken);
    box-shadow: none;
  }
}
</style>
