/**
 * Mermaid 図の共有テーマ変数。
 *
 * 各ページで同一のテーマ変数オブジェクトを重複定義するのを避けるため、
 * ここに SSoT（Single Source of Truth）として定義する。
 * MermaidDiagram コンポーネントの :theme-variables prop に渡して使う。
 */
export const MERMAID_THEME_VARIABLES: Record<string, string> = {
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
  /*
   * pie 図専用のキー。pie 図を持たないページでは Mermaid が無視するため、
   * ここに含めても副作用はない。ページ側で部分的に上書きすると
   * サイト全体の配色が分裂するので、pie も含めてここを SSoT とする。
   */
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
