import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Mermaid 初期化プラグインの設定契約。
 *
 * 描画挙動（useMaxWidth 等）はレイアウト不変条件
 * （.claude/rules/mermaid-diagram-layout.md）と直結するため、
 * 値そのものをテストで固定する。
 */
const { initialize } = vi.hoisted(() => ({ initialize: vi.fn() }));

vi.mock("mermaid", () => ({ default: { initialize } }));

async function loadPluginConfig(): Promise<Record<string, unknown>> {
  vi.resetModules();
  initialize.mockClear();

  const plugin = await import("~/plugins/mermaid.client");
  // defineNuxtPlugin はオブジェクト形式・関数形式のどちらも受け付ける。
  // 本プラグインは関数形式なので、そのまま呼べば initialize が走る。
  const setup = plugin.default as unknown as (nuxtApp: unknown) => void;
  setup({});

  expect(initialize).toHaveBeenCalledTimes(1);
  return initialize.mock.calls[0]?.[0] as Record<string, unknown>;
}

describe("plugins/mermaid.client", () => {
  let config: Record<string, unknown>;

  beforeEach(async () => {
    config = await loadPluginConfig();
  });

  it("外部由来のラベルを埋め込まれても実行されないよう securityLevel は strict", () => {
    expect(config.securityLevel).toBe("strict");
  });

  it("自然サイズを起点にするため useMaxWidth は全図種で false", () => {
    expect(config.flowchart).toMatchObject({ useMaxWidth: false });
    expect(config.sequence).toMatchObject({ useMaxWidth: false });
    expect(config.mindmap).toMatchObject({ useMaxWidth: false });
    expect(config.pie).toMatchObject({ useMaxWidth: false });
  });

  it("描画は MermaidDiagram.vue が制御するため startOnLoad は false", () => {
    expect(config.startOnLoad).toBe(false);
  });
});
