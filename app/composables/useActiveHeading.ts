/**
 * サイドバー TOC のスクロール連動。
 *
 * 原本 HTML の setupSidebarHighlight() を移植したもの。原本は
 * IntersectionObserver で `main section[id]` を監視し、交差した節に対応する
 * ナビリンクへ .active を付け替えていた。Vue では DOM を直接触らず、
 * アクティブな id を ref として返し、クラス付与はテンプレートに任せる。
 *
 * @param ids 監視対象セクションの id。TOC の並び順で渡すこと。
 * @returns 現在アクティブなセクションの id（初期値は先頭）
 */
export function useActiveHeading(ids: string[]): Readonly<Ref<string>> {
  // 初期値に先頭を入れる。原本の静的 HTML には .active が無く JS が後付けして
  // いたため、これが無いと初回描画で TOC が全て非アクティブになる。
  const activeId = ref(ids[0] ?? "");

  onMounted(() => {
    if (ids.length === 0) return;
    // 非対応環境では連動を諦める。初期値のままでも TOC は機能する。
    if (typeof IntersectionObserver === "undefined") return;

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const known = new Set(ids);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // 画面外へ出ただけで無選択に戻すと TOC が明滅するため、
          // 交差したときだけ付け替える（原本と同じ挙動）。
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (!known.has(id)) continue;
          activeId.value = id;
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const target of targets) observer.observe(target);
    onBeforeUnmount(() => observer.disconnect());
  });

  return readonly(activeId);
}
