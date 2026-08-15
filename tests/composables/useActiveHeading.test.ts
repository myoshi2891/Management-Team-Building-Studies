import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useActiveHeading } from "~/composables/useActiveHeading";

type ObserverCallback = (entries: Array<Partial<IntersectionObserverEntry>>) => void;

/** 生成された IntersectionObserver を捕まえ、交差イベントを手動で発火させるための土台。 */
interface FakeObserver {
  callback: ObserverCallback;
  options?: IntersectionObserverInit;
  observed: Element[];
  disconnected: boolean;
}

let observers: FakeObserver[] = [];

function installObserver() {
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
        this.record = { callback, options, observed: [], disconnected: false };
        observers.push(this.record);
      }

      record: FakeObserver;

      observe(el: Element) {
        this.record.observed.push(el);
      }

      unobserve() {}

      disconnect() {
        this.record.disconnected = true;
      }
    },
  );
}

/** id を持つ section を本文に用意する（原本の `main section[id]` 構造を模す）。 */
function renderSections(ids: string[]) {
  document.body.innerHTML = `<main>${ids.map((id) => `<section id="${id}"></section>`).join("")}</main>`;
}

/** composable を実コンポーネントのライフサイクル上で動かすためのホスト。 */
function mountWith(ids: string[]) {
  const result: { activeId?: ReturnType<typeof useActiveHeading> } = {};
  const Host = defineComponent({
    setup() {
      result.activeId = useActiveHeading(ids);
      return () => h("div");
    },
  });
  const wrapper = mount(Host, { attachTo: document.body });
  return { wrapper, get activeId() { return result.activeId!; } };
}

function fire(entries: Array<{ id: string; isIntersecting: boolean }>) {
  const observer = observers[0];
  if (!observer) throw new Error("IntersectionObserver が生成されていない");
  observer.callback(
    entries.map(({ id, isIntersecting }) => ({
      target: document.getElementById(id) as Element,
      isIntersecting,
    })),
  );
}

beforeEach(() => {
  installObserver();
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("useActiveHeading", () => {
  const IDS = ["what-is-capm", "roadmap", "eligibility"];

  it("初期値は先頭の id（初回描画から TOC のアクティブ表示が成立する）", () => {
    renderSections(IDS);
    const { activeId } = mountWith(IDS);

    // 原本の静的 HTML には .active クラスが無く JS が後付けしていたため、
    // 移行先では初期状態から先頭がアクティブである必要がある（契約 C-3）。
    expect(activeId.value).toBe("what-is-capm");
  });

  it("id が空なら Observer を作らず、値も空のまま", () => {
    renderSections([]);
    const { activeId } = mountWith([]);

    expect(observers).toHaveLength(0);
    expect(activeId.value).toBe("");
  });

  it("交差した見出しへアクティブが遷移する", async () => {
    renderSections(IDS);
    const { activeId } = mountWith(IDS);
    await flushPromises();

    fire([{ id: "roadmap", isIntersecting: true }]);
    expect(activeId.value).toBe("roadmap");

    fire([{ id: "eligibility", isIntersecting: true }]);
    expect(activeId.value).toBe("eligibility");
  });

  it("交差していないエントリではアクティブを変えない", async () => {
    renderSections(IDS);
    const { activeId } = mountWith(IDS);
    await flushPromises();

    fire([{ id: "roadmap", isIntersecting: true }]);
    fire([{ id: "roadmap", isIntersecting: false }]);

    // 画面外へ出ただけで無選択に戻すと、スクロール中に TOC が明滅する。
    expect(activeId.value).toBe("roadmap");
  });

  it("未知の id は無視する", async () => {
    renderSections([...IDS, "not-in-toc"]);
    const { activeId } = mountWith(IDS);
    await flushPromises();

    fire([{ id: "roadmap", isIntersecting: true }]);
    fire([{ id: "not-in-toc", isIntersecting: true }]);

    expect(activeId.value).toBe("roadmap");
  });

  it("原本と同じ rootMargin で監視する", async () => {
    renderSections(IDS);
    mountWith(IDS);
    await flushPromises();

    expect(observers[0]?.options?.rootMargin).toBe("-20% 0px -70% 0px");
  });

  it("渡された id に対応する section をすべて監視する", async () => {
    renderSections(IDS);
    mountWith(IDS);
    await flushPromises();

    const observedIds = observers[0]?.observed.map((el) => el.id);
    expect(observedIds).toEqual(IDS);
  });

  it("アンマウント時に監視を解除する（リークさせない）", async () => {
    renderSections(IDS);
    const { wrapper } = mountWith(IDS);
    await flushPromises();

    expect(observers[0]?.disconnected).toBe(false);
    wrapper.unmount();
    expect(observers[0]?.disconnected).toBe(true);
  });

  it("IntersectionObserver 非対応環境でも例外を投げず初期値を保つ", async () => {
    renderSections(IDS);
    vi.stubGlobal("IntersectionObserver", undefined);

    const { activeId } = mountWith(IDS);
    await flushPromises();

    expect(activeId.value).toBe("what-is-capm");
  });
});
