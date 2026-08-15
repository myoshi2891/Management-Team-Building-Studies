/**
 * mermaid 本体の動的 import をアプリ全体で 1 回に収束させる。
 *
 * この singleton を MermaidDiagram.vue の <script setup> 内に置いてはならない。
 * <script setup> のコードは setup() へコンパイルされ **コンポーネントの
 * インスタンスごとに実行される**ため、そこで宣言した変数はモジュールスコープに
 * ならず、図の数だけ import() が走ってしまう（CAPM ページなら 9 回）。
 * 真のモジュールスコープを得るために独立したファイルへ切り出している。
 */
let mermaidModule: Promise<typeof import("mermaid").default> | null = null;

export function loadMermaid(): Promise<typeof import("mermaid").default> {
  mermaidModule ??= import("mermaid").then((m) => m.default);
  return mermaidModule;
}
