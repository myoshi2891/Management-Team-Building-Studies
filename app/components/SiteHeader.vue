<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();

const navigation = [
  { label: "ホーム", to: "/", icon: "tabler:home" },
  { label: "CAPM", to: "/capm", icon: "tabler:certificate" },
  { label: "EMキャリア", to: "/engineering-management-career-path", icon: "tabler:route" },
] as const;

function isCurrent(to: string): boolean {
  return route.path === to;
}
</script>

<template>
  <header class="global-header" data-site-header>
    <div class="global-header-inner">
      <NuxtLink class="global-brand" to="/" aria-label="Management Studies ホーム">
        <span class="global-brand-mark" aria-hidden="true">M</span>
        <span class="global-brand-copy">
          <strong>Management Studies</strong>
          <small>LEARN · LEAD · GROW</small>
        </span>
      </NuxtLink>

      <nav aria-label="グローバルナビゲーション">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          class="global-nav-link"
          :class="{ current: isCurrent(item.to) }"
          :to="item.to"
          :aria-current="isCurrent(item.to) ? 'page' : undefined"
        >
          <Icon :name="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </NuxtLink>
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

.global-nav-link {
  position: relative;
  min-width: 94px;
  padding: 0 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--color-ink-soft);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.global-nav-link::after {
  content: "";
  position: absolute;
  right: 17px;
  bottom: -1px;
  left: 17px;
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

@media (max-width: 720px) {
  .global-header-inner { width: calc(100% - 24px); gap: 10px; }
  .global-brand-copy small { display: none; }
  .global-nav-link { min-width: 66px; padding-inline: 10px; }
  .global-nav-link::after { right: 10px; left: 10px; }
}

@media (max-width: 520px) {
  .global-brand { gap: 8px; }
  .global-brand-mark { width: 34px; height: 34px; }
  .global-brand-copy strong { font-size: 13px; }
  .global-nav-link { min-width: 48px; padding-inline: 10px; }
  .global-nav-link span { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
}

/*
 * 極小画面（320px 等）では、ブランド名を隠してナビ 3 項目を全て残す。
 * .global-brand は min-width: max-content のため縮まず、
 * ブランド名 + ナビ 3 項目が global-header-inner の幅を超えてはみ出す。
 * 到達性（ナビ）を優先し、ブランドは丸マークのみにする
 * （リンクの aria-label がアクセシブル名を保持するため名前は失われない）。
 */
@media (max-width: 400px) {
  .global-brand-copy { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .global-nav-link::after { transition: none; }
}
</style>
