import mermaid from "mermaid";

/**
 * Mermaid の描画挙動をアプリ起動時に一度だけ初期化する。
 *
 * 図のマウントごとに initialize を呼ぶと、同時に描画している別の図の設定を
 * 上書きしてしまうため禁止（.claude/skills/fix-mermaid/SKILL.md Part 4）。
 * 図ごとに変えたい「見た目」は MermaidDiagram.vue が frontmatter config として
 * 個別に埋め込むので、ここには全図共通の描画挙動だけを置く。
 *
 * 値は原本 Certified-Associate-in-Project-Management.html の
 * mermaid.initialize から逐語で移植した。
 */
export default defineNuxtPlugin(() => {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    htmlLabels: true,
    // useMaxWidth はいずれも false。自然サイズを起点にし、列幅への収まりは
    // MermaidDiagram.vue の svg 後処理（max-width:100%）が担当する
    // （.claude/rules/mermaid-diagram-layout.md 不変条件 2）。
    flowchart: {
      useMaxWidth: false,
      nodeSpacing: 45,
      rankSpacing: 48,
      curve: "basis",
    },
    pie: { useMaxWidth: false },
    sequence: { useMaxWidth: false },
    mindmap: { useMaxWidth: false },
  });
});
