<script setup lang="ts">
import { loadMermaid } from "~/utils/mermaid-loader";

/**
 * Mermaid 図解の共有コンポーネント。
 *
 * サイト全体の図解レイアウト（中央寄せ・列幅への縮小フィット）の
 * 唯一の真実の源（SSoT）。ページ側 <style scoped> で .mermaid や svg の
 * 幅・配置を再指定してはならない（.claude/rules/mermaid-diagram-layout.md）。
 *
 * DOM は 2 層構造:
 *   外側 .mermaid-scroll = width:100%（フレームとして列幅を占める）
 *   内側 .mermaid        = flex + justify-content:center（中央寄せ担当）
 *   svg                  = onMounted の後処理で max-width:100% 化し列幅に収める
 *
 * template には root の兄弟になるコメントを置かないこと。コメントも VNode
 * として数えられるためコンポーネントが多重ルートになり、テストの
 * wrapper.element が実要素ではなく合成ノードを指すようになる。
 */
const props = defineProps<{
  /** Mermaid ソース。先頭にインデントがあると構文エラーになるため左端揃えで渡す。 */
  chart: string;
  /** 既定は "base"。原本 HTML がライトテーマ前提のため。 */
  theme?: string;
  /** theme="base" のときだけ意味を持つ。参照が安定するようモジュール定数を渡すこと。 */
  themeVariables?: Record<string, string>;
  /** ノード数が少なく viewBox が肥大する図だけに使う逃がし弁。 */
  maxHeight?: string;
}>();

/** viewBox 下端の余白。シーケンス図などで下端が切れるのを防ぐ。 */
const VIEWBOX_HEIGHT_PADDING = 15;

const el = ref<HTMLElement | null>(null);
const failed = ref(false);
const diagramId = `m-${useId()}`;

/**
 * 図ごとの見た目設定を frontmatter として Mermaid ソースの先頭に埋め込む。
 * mermaid.initialize をマウントごとに呼ぶと同時描画中の別の図を壊すため、
 * 見た目はグローバル設定ではなくソース埋め込みで分離する。
 * JSON のオブジェクトリテラルは YAML の flow mapping として妥当。
 */
function chartWithConfig(): string {
  const config = {
    theme: props.theme ?? "base",
    themeVariables: { fontSize: "16px", ...props.themeVariables },
  };
  return `---\nconfig: ${JSON.stringify(config)}\n---\n${props.chart}`;
}

/** viewBox の高さを広げつつ、幅を実寸 px として style に固定する。 */
function extendViewBoxHeight(svgEl: SVGElement, extra: number): void {
  const viewBox = svgEl.getAttribute("viewBox");
  if (!viewBox) return;

  const parts = viewBox.split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return;

  const [minX, minY, width, height] = parts as [number, number, number, number];
  // 実寸を style.width に移すことで、max-width:100% と組み合わせたときに
  // 「収まるなら自然サイズ・はみ出すなら列幅まで縮小」が成立する。
  svgEl.style.width = `${width}px`;
  svgEl.setAttribute("viewBox", `${minX} ${minY} ${width} ${height + extra}`);
}

onMounted(async () => {
  // フォント確定前に描画するとラベル寸法を誤測定し、文字がノードからはみ出す。
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // フォント読み込みの失敗は描画を止める理由にならない。そのまま続行する。
    }
  }

  try {
    const mermaid = await loadMermaid();
    const { svg } = await mermaid.render(diagramId, chartWithConfig());
    if (!el.value) return;
    el.value.innerHTML = svg;

    const svgEl = el.value.querySelector("svg");
    if (!svgEl) return;

    // 属性を残したまま max-width をかけると縦横比が崩れるため先に除去する。
    svgEl.removeAttribute("width");
    svgEl.removeAttribute("height");
    extendViewBoxHeight(svgEl, VIEWBOX_HEIGHT_PADDING);
    // mermaid が付ける inline の max-width を上書きする。CSS では inline に負ける。
    svgEl.style.maxWidth = "100%";
    svgEl.style.height = "auto";
    svgEl.style.overflow = "visible";
    svgEl.style.maxHeight = props.maxHeight ?? "";
  } catch (error) {
    failed.value = true;
    console.error(`Mermaid render error [${diagramId}]:`, error);
  }
});
</script>

<template>
  <div class="mermaid-scroll" style="width: 100%">
    <p v-if="failed" class="diagram-error">図の読み込みに失敗しました。</p>
    <div
      v-else
      ref="el"
      class="mermaid"
      style="display: flex; justify-content: center; min-height: 4rem"
    />
  </div>
</template>

<style scoped>
/*
 * .diagram-error はこのコンポーネントの内部で描画されるため、
 * ページ側の <style scoped> からは到達できない。したがってスタイルも
 * コンポーネントが持つ。配色は原本 HTML の .diagram-error から逐語移植。
 * レイアウト（幅・配置）は template の inline style が担当しており、
 * ここには書かない（.claude/rules/mermaid-diagram-layout.md）。
 */
.diagram-error {
  color: var(--color-plum);
  font-size: 16px;
}
</style>
