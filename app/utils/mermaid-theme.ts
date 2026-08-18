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
};
