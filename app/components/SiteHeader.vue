<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();

const navigation = [
  { label: "ホーム", to: "/", icon: "tabler:home" },
  { label: "CAPM", to: "/capm", icon: "tabler:certificate" },
  { label: "CAPM D1", to: "/certified-associate-in-project-management-domain1", icon: "tabler:award" },
  { label: "PMP", to: "/pmp-certification-guide", icon: "tabler:certificate" },
  { label: "EMキャリア", to: "/engineering-management-career-path", icon: "tabler:route" },
  { label: "チームリード術", to: "/engineering-team-leadership-guide", icon: "tabler:users-group" },
  { label: "EM入門", to: "/engineering-manager-guide", icon: "tabler:school" },
  { label: "リチーミング", to: "/dynamic-reteaming-guide", icon: "tabler:refresh" },
  { label: "統括責任者", to: "/engineering-executive-playbook", icon: "tabler:briefcase" },
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

/*
 * ヘッダーの内容幅は「ブランド幅 + inner の gap + 6 × リンクの min-width」で決まる。
 * .global-brand は min-width: max-content、ナビ 6 項目は min-width で下限が決まるため、
 * この合計が global-header-inner の使える幅を超えた時点で横にはみ出す
 * （ブレークポイントの閾値は Chromium での実測に基づく）。
 *
 * 各段の内容幅 ≦ 使える幅（= ビューポート幅 - inner の左右余白）:
 *   ~881px 以上 : 212 + 32 + 6×94 = 808 ≦ vw - 40  → vw ≧ 848
 *    721-880px  : 212 + 32 + 6×66 = 640 ≦ vw - 40  → vw ≧ 680
 *    681-720px  : 212 + 10 + 6×66 = 618 ≦ vw - 24  → vw ≧ 642
 *    561-680px  : 175 + 10 + 6×48 = 473 ≦ vw - 24  → vw ≧ 497
 *    401-560px  :  34 + 10 + 6×48 = 332 ≦ vw - 24  → vw ≧ 356
 *    ~400px 以下:  34 + 10 + 6×40 = 284 ≦ vw - 24  → vw ≧ 308
 */

/*
 * 880px 以下ではリンクの min-width の下限だけを下げる。
 * リンクの自然幅（アイコン + ラベル）は約 113px でこの下限を上回るため、
 * 余裕のある幅では見た目が変わらず、狭まった時だけ縮小が効く。
 */
@media (max-width: 880px) {
  .global-nav-link { min-width: 66px; padding-inline: 10px; }
  .global-nav-link::after { right: 10px; left: 10px; }
}

@media (max-width: 720px) {
  .global-header-inner { width: calc(100% - 24px); gap: 10px; }
  .global-brand-copy small { display: none; }
}

/* 6 項目のラベルを保ったままでは収まらない。ラベルを隠してアイコンのみにする */
@media (max-width: 680px) {
  .global-brand { gap: 8px; }
  .global-brand-mark { width: 34px; height: 34px; }
  .global-brand-copy strong { font-size: 13px; }
  .global-nav-link { min-width: 48px; padding-inline: 10px; }
  .global-nav-link span { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
}

/*
 * 560px 以下では、ブランド名を隠してナビ 6 項目を全て残す。
 * 到達性（ナビ）を優先し、ブランドは丸マークのみにする
 * （680px 以下で視覚的に隠したリンクのラベル span は DOM に残るため、
 *   支援技術にはアクセシブル名として引き続き読み上げられる）。
 */
@media (max-width: 560px) {
  .global-brand-copy { display: none; }
}

/* 極小画面（320px 等）。ブランド名を隠すだけでは収まらないため、リンクをさらに詰める */
@media (max-width: 400px) {
  .global-nav-link { min-width: 40px; padding-inline: 4px; }
  .global-nav-link::after { right: 4px; left: 4px; }
}

@media (prefers-reduced-motion: reduce) {
  .global-nav-link::after { transition: none; }
}
</style>
