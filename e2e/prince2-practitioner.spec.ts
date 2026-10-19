import { expect, test } from "@playwright/test";
import source from "../tests/fixtures/prince2-7-practitioner-contract.json" with { type: "json" };

const ROUTE = "/prince2-7-practitioner-guide";
const WIDTHS = [1440, 1024, 981, 980, 390] as const;

for (const width of WIDTHS) {
  test(`PRINCE2 Practitioner ${width}px: 全図・文字・リスト記号・配色・収まり`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(ROUTE);
    await expect(page.locator("#references")).toBeAttached();
    await expect(page.locator(".mermaid-wrap .mermaid > svg")).toHaveCount(13, { timeout: 60000 });
    await expect(page.locator(".diagram-error")).toHaveCount(0);

    const svgs = page.locator(".mermaid-wrap .mermaid > svg");
    for (const [index, chart] of source.contract.mermaidSources.entries()) {
      const labels = [...chart.matchAll(/"([^"]+)"/g)].map(match => match[1]!.replace(/\s+/g, ""));
      const rendered = (await svgs.nth(index).textContent() ?? "").replace(/\s+/g, "");
      for (const label of labels) expect(rendered).toContain(label);
    }

    const styles = await page.evaluate(() => ({
      lists: [...document.querySelectorAll("main ul, main ol, .sidebar-nav")].map(node => ({
        tag: node.tagName, reference: node.classList.contains("ref-list"),
        nav: node.classList.contains("sidebar-nav"),
        marker: getComputedStyle(node).listStyleType,
        padding: getComputedStyle(node).paddingLeft,
        callout: !!node.closest(".callout"),
      })),
      callouts: [...document.querySelectorAll<HTMLElement>(".callout")].map(node => ({
        variant: node.dataset.variant,
        border: getComputedStyle(node).borderLeftColor,
        title: getComputedStyle(node.querySelector(".callout-title")!).color,
      })),
      headers: [...document.querySelectorAll("thead th")].map(node => getComputedStyle(node).backgroundColor),
      h1: getComputedStyle(document.querySelector("h1")!).fontSize,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      figures: [...document.querySelectorAll(".mermaid-wrap .mermaid > svg")].map(svg => {
        const rect = svg.getBoundingClientRect();
        const frame = svg.closest(".mermaid-scroll")!.getBoundingClientRect();
        return { width: rect.width, frameWidth: frame.width,
          offset: Math.abs((rect.left + rect.right) / 2 - (frame.left + frame.right) / 2) };
      }),
    }));
    for (const list of styles.lists) {
      expect(list.marker).toBe(list.reference || list.nav ? "none" : list.tag === "OL" ? "decimal" : "disc");
      expect(list.padding).toBe(list.reference || list.nav ? "0px" : list.callout && list.tag === "UL" ? "20px" : "24px");
    }
    for (const callout of styles.callouts) {
      const color = callout.variant === "practice" ? "rgb(184, 128, 42)" : "rgb(140, 58, 92)";
      expect(callout.border).toBe(color);
      expect(callout.title).toBe(color);
    }
    expect(styles.headers.every(color => color === "rgb(238, 240, 244)")).toBe(true);
    expect(styles.h1).toBe(width <= 980 ? "32px" : "42px");
    expect(styles.overflow).toBeLessThanOrEqual(0);
    for (const figure of styles.figures) {
      expect(figure.width).toBeGreaterThan(0);
      expect(figure.width).toBeLessThanOrEqual(figure.frameWidth + 1);
      expect(figure.offset).toBeLessThanOrEqual(2);
    }
  });
}

test("PRINCE2 Practitioner: モバイル目次の開閉・フォーカス復帰・アンカー到達", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(ROUTE);
  await expect(page.locator(".mermaid-wrap .mermaid > svg")).toHaveCount(13, { timeout: 60000 });
  const toggle = page.getByRole("button", { name: "目次を開閉する" });
  await expect(page.locator("#sidebar")).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.locator('.sidebar-nav a[href="#references"]').click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await expect(page.locator("#references h2")).toBeInViewport();
  await expect(page.locator('.sidebar-nav a[href="#references"]')).toHaveClass(/active/);
});
