import { expect, test, type Page } from "@playwright/test";

/*
 * グローバルナビのスモーク。
 *
 * ユニットテスト（tests/components/SiteHeader.test.ts）は DOM 構造と状態遷移を固定するが、
 * メディアクエリに依存する挙動は jsdom では再現できない。
 * とくに「ポインタデバイスでウィンドウを狭めた状態」（= モバイルレイアウトなのに
 * hover が効く環境）は、hover とクリックの両方が発火して開いた直後に閉じる事故が起きる。
 * この経路はここでしか検知できない。
 */

const CATEGORY_IDS = [
  "project-management",
  "engineering-management",
  "engineering-leadership",
  "team-building",
] as const;

const MOBILE = { width: 375, height: 720 };

/*
 * キーボード（Enter）でドロップダウンを開く。
 *
 * SSG された HTML はボタンが押せる状態で先に描画されるため、goto() 直後に
 * focus() → keyboard.press() を送ると Vue のリスナーが付く前のネイティブ click になり、
 * パネルが開かないままタイムアウトする。再試行の効かない一発勝負の操作なので flaky になる。
 *
 * aria-expanded を見てから押すことで再試行を冪等にする（開いているものを閉じない）。
 * ハイドレーション完了の内部フラグには依存しない。
 */
/*
 * hover でドロップダウンを開く。keyboard 版と同じハイドレーション競合があるため、
 * 一度マウスを外してから当て直す形で再試行する（hover は一度当てただけでは
 * リスナーが付いた後に mouseenter が再発火しない）。
 */
async function openWithHover(page: Page, triggerId: string): Promise<void> {
  const panel = page.locator(`#nav-panel-${triggerId}`);
  await expect(async () => {
    await page.mouse.move(0, 0);
    await page.locator(`#nav-trigger-${triggerId}`).hover();
    await expect(panel).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 10_000 });
}

async function openWithKeyboard(page: Page, triggerId: string): Promise<void> {
  const trigger = page.locator(`#nav-trigger-${triggerId}`);
  await expect(async () => {
    await trigger.focus();
    if (await trigger.getAttribute("aria-expanded") === "false") {
      await page.keyboard.press("Enter");
    }
    await expect(page.locator(`#nav-panel-${triggerId}`)).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 10_000 });
}

test("デスクトップ: hover でドロップダウンが開き、現在のページを含むカテゴリーを示す", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/capm");

  const trigger = page.locator("#nav-trigger-project-management");
  const panel = page.locator("#nav-panel-project-management");

  await expect(trigger).toHaveClass(/current/);
  await expect(panel).toBeHidden();

  await openWithHover(page, "project-management");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel.locator("a.current")).toHaveAttribute("href", "/capm");

  // パネルはヘッダーの下端より下に出る（ヘッダーに潜り込んで切れない）。
  // toBeVisible() は visibility が切り替わった時点で通るが、パネルは 160ms かけて
  // translateY(-6px) → translateY(0) するため、直後の boundingBox() はまだ 6px 上にある。
  // 最終位置を見るために expect.poll で落ち着くまで待つ。
  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  await expect
    .poll(async () => (await panel.boundingBox())!.y)
    .toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 2);
});

test("デスクトップ: パネルはトリガー基準に出て、はみ出す分だけ内枠へ退避する", async ({ page }) => {
  /*
   * パネルはトリガーの左端に揃える。右がヘッダー内枠を超える場合だけ、超えた分を左へ退避する。
   *
   * 「常にナビ右端揃え」にすると、はみ出しは消えるがパネルがどの項目のものか読めなくなる
   * （実測でエンジニアリングマネジメントはトリガー右端よりさらに 134px 右に出ていた）。
   * 逆に「常にトリガー左端」だとリーダーシップ・チームビルディングが画面外へ出る。
   * したがって「トリガー基準」と「内枠に収まる」の両方を同時に固定する必要がある。
   *
   * 位置は CSS とレイアウト実測で決まるため jsdom のユニットテストでは検証できない。
   */
  for (const width of [1440, 1240, 1040]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const container = (await page.locator(".global-header-inner").boundingBox())!;

    for (const id of CATEGORY_IDS) {
      await openWithHover(page, id);
      const panel = page.locator(`#nav-panel-${id}`);
      const trigger = (await page.locator(`#nav-trigger-${id}`).boundingBox())!;
      const box = (await panel.boundingBox())!;
      const where = `${id} @${width}px`;

      // 内枠からはみ出さない
      expect(box.x, `${where} が内枠の左へはみ出している`).toBeGreaterThanOrEqual(container.x - 0.5);
      expect(box.x + box.width, `${where} が内枠の右へはみ出している`)
        .toBeLessThanOrEqual(container.x + container.width + 0.5);

      // トリガーより右から始まらない（別の項目の下に出ない）
      expect(box.x, `${where} がトリガーより右から始まっている`).toBeLessThanOrEqual(trigger.x + 0.5);

      // 退避していないならトリガー左端に一致し、退避しているなら内枠右端に接する
      const alignedToTrigger = Math.abs(box.x - trigger.x) <= 0.5;
      const clampedToContainer = Math.abs(box.x + box.width - (container.x + container.width)) <= 0.5;
      expect(alignedToTrigger || clampedToContainer, `${where} がトリガー基準でも内枠右端でもない`).toBe(true);
    }
  }
});

/*
 * ドロップダウンを「開いた状態」の縦方向の契約。
 *
 * シリーズカラムは縦の肥大化を吸収するための構造だが、1 カラムへガイドが集中すると
 * その吸収が効かなくなる（実測: scrum シリーズが 14 件へ膨らみ、パネル全高が約 600px に達した）。
 * カラムあたりの件数上限は tests/utils/guide-catalog.test.ts が分類の契約として固定するが、
 * 「実際に描いたら画面を覆うか」は実レイアウトでしか判定できないため、ここで実測する。
 *
 * 縦が最も厳しい常用構成として 1280x720 を使う。
 */
test("デスクトップ: どのパネルを開いても縦にビューポートを覆わない", async ({ page }) => {
  const viewport = { width: 1280, height: 720 };
  await page.setViewportSize(viewport);
  await page.goto("/");

  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  const available = viewport.height - headerBox.height;

  for (const id of CATEGORY_IDS) {
    await openWithHover(page, id);

    const panel = page.locator(`#nav-panel-${id}`);
    // 開いた直後は translateY(-6px) → 0 のトランジション中で、位置が動いている。
    // 遷移が終わってから一度だけ測り、高さと下端を同じ実測値で判定する
    // （二度測ると「高さは安定後・下端は遷移中」という実在しない状態を検証してしまう）。
    await panel.evaluate((el) =>
      Promise.all(el.getAnimations().map((a) => a.finished.catch(() => undefined))),
    );

    const box = (await panel.boundingBox())!;
    expect(box.height, `${id} のパネル高さがビューポートの残り高さを超えている`)
      .toBeLessThanOrEqual(available);

    // 下端がビューポート内に収まる（ヘッダー直下から開くため、高さが収まれば下端も収まる）。
    expect(box.y + box.height, `${id} のパネル下端が画面外へ出ている`)
      .toBeLessThanOrEqual(viewport.height);
  }
});

test("デスクトップ: パネル内のアイコンが潰れず、ラベルがカラムに収まる", async ({ page }) => {
  /*
   * カラム幅が最長ラベルより狭いと、svg が flex で圧縮され（実測 17px → 15px）
   * テキストがカラムの縁まで張り出す。幅の充足は実レイアウトでしか判定できない。
   */
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  for (const id of CATEGORY_IDS) {
    await openWithHover(page, id);
    const squeezed = await page.locator(`#nav-panel-${id}`).evaluate((el) =>
      [...el.querySelectorAll("a")]
        .map((link) => {
          const icon = link.querySelector("svg")!;
          const label = link.querySelector("span")!;
          const range = document.createRange();
          range.selectNodeContents(label);
          return {
            text: label.textContent?.trim() ?? "",
            iconWidth: Math.round(icon.getBoundingClientRect().width),
            labelWidth: Math.round(label.getBoundingClientRect().width),
            textWidth: Math.ceil(range.getBoundingClientRect().width),
          };
        })
        .filter((link) => link.iconWidth !== 17 || link.textWidth > link.labelWidth + 1),
    );

    expect(squeezed, `${id} に潰れたリンクがある`).toEqual([]);
  }
});

test("デスクトップ: Escape で閉じてトリガーへフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("#nav-trigger-engineering-leadership");
  const panel = page.locator("#nav-panel-engineering-leadership");

  await openWithKeyboard(page, "engineering-leadership");

  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("デスクトップ: 閉じているドロップダウンのリンクはタブ順に現れない", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await page.locator("#nav-trigger-project-management").focus();
  await page.keyboard.press("Tab");

  await expect(page.locator("#nav-trigger-engineering-management")).toBeFocused();
});

test("モバイル幅: ポインタデバイスでもタップでアコーディオンが開く", async ({ page }) => {
  // Desktop Chrome を狭めた状態を再現する（hover: hover のままモバイルレイアウトになる）。
  await page.setViewportSize(MOBILE);
  await page.goto("/");

  await page.locator("[data-testid='nav-toggle']").click();
  await expect(page.locator("#global-nav")).toBeVisible();

  for (const id of CATEGORY_IDS) {
    const trigger = page.locator(`#nav-trigger-${id}`);
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(`#nav-panel-${id}`)).toBeVisible();

    await trigger.click();
    await expect(page.locator(`#nav-panel-${id}`)).toBeHidden();
  }
});

test("モバイル幅: リンクをタップすると遷移してナビが閉じる", async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto("/");

  await page.locator("[data-testid='nav-toggle']").click();
  await page.locator("#nav-trigger-team-building").click();
  await page.locator("#nav-panel-team-building a").first().click();

  // カタログの並べ替えにより、チームビルディングの先頭は「チーム文化」シリーズの Team Geek。
  await expect(page).toHaveURL(/\/team-geek-guide$/);
  await expect(page.locator("#global-nav")).toBeHidden();
});

test("横幅 320px でもヘッダーが横にはみ出さない", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.locator("[data-testid='nav-toggle']")).toBeVisible();
  await expect(page.locator("#global-nav")).toBeHidden();
});

test("ガイドページのサイドバー TOC が固定ヘッダーに隠れない", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/capm");
  // main.css の `scroll-behavior: smooth` により既定の scrollTo はアニメーションになるため、
  // 直後に boundingBox() を読むとスクロール反映前の座標で判定してしまう。
  // behavior: "instant" なら evaluate 内で位置が確定するので、待ち合わせ自体が不要になる。
  // （waitForFunction の既定 polling は rAF。fullyParallel でページが非アクティブだと
  //   rAF が止まり、待ち合わせがそのままタイムアウトしうる。）
  const scrolledY = await page.evaluate(() => {
    window.scrollTo({ top: 1200, behavior: "instant" });
    return window.scrollY;
  });
  expect(scrolledY).toBeGreaterThanOrEqual(1100);

  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  const sidebarBox = (await page.locator(".sidebar-nav").first().boundingBox())!;
  expect(sidebarBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 2);
});

test("モバイル幅: Escape でメニューが閉じて nav-toggle へフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto("/");

  const toggle = page.locator("[data-testid='nav-toggle']");
  await toggle.click();
  await expect(page.locator("#global-nav")).toBeVisible();

  // カテゴリを開いてリンクにフォーカスを当てる
  await page.locator("#nav-trigger-project-management").click();
  const link = page.locator("#nav-panel-project-management a").first();
  await link.focus();
  await expect(link).toBeFocused();

  // Escape でパネルが閉じトリガーに戻る
  await page.keyboard.press("Escape");
  await expect(page.locator("#nav-panel-project-management")).toBeHidden();
  await expect(page.locator("#nav-trigger-project-management")).toBeFocused();

  // もう一度 Escape でメニュー自体が閉じて nav-toggle に戻る
  await page.keyboard.press("Escape");
  await expect(page.locator("#global-nav")).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("デスクトップ: 外側クリックでパネルが閉じトリガーへフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("#nav-trigger-engineering-management");
  const panel = page.locator("#nav-panel-engineering-management");

  // キーボードで開く（フォーカスがナビ内に入る）
  await openWithKeyboard(page, "engineering-management");

  // パネル内のリンクにフォーカスを当ててから外側クリック。
  // クリック先は必ず <main> にする。`locator("main, body")` は CSS セレクタリストを
  // DOM 順で解決するため .first() が <body> になり、body 相対 (10,10) は
  // position: sticky なヘッダーの内側に落ちる（= 外側クリックにならない）。
  await panel.locator("a").first().focus();
  const main = page.locator("main").first();
  await expect
    .poll(async () => (await main.boundingBox())!.y)
    .toBeGreaterThanOrEqual((await page.locator("[data-site-header]").boundingBox())!.height);
  await main.click({ position: { x: 4, y: 4 }, force: true });
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});

/*
 * ドロップダウンを「開いた状態」の横方向の契約。
 *
 * 閉じた状態も含めたページ全体の横スクロール禁止は
 * e2e/no-horizontal-scroll.spec.ts が全ページ x 3 幅で固定している。
 * ここで見るのはそちらに無い観点——パネルを開いたときに
 * .global-header の overflow-x: clip で切り取られていないか——だけ。
 */
test("デスクトップ: どのパネルを開いても切り取られず、横にもはみ出さない", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  // 右寄りのカテゴリーほどはみ出しやすいが、どれか 1 つを見るだけでは
  // カタログの並べ替えで検証対象が入れ替わってしまう。全カテゴリーを見る。
  for (const id of CATEGORY_IDS) {
    await openWithHover(page, id);

    const box = await page.locator(`#nav-panel-${id}`).boundingBox();
    expect(box, `${id} のパネルが描画されていない`).not.toBeNull();
    if (box === null) continue;

    // ヘッダーの overflow-x: clip で切り取られていないこと（左右とも viewport 内）。
    expect(box.x, `${id} のパネルが左へはみ出している`).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, `${id} のパネルが右へはみ出している`).toBeLessThanOrEqual(1440);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${id} を開くと ${overflow}px 横にはみ出す`).toBeLessThanOrEqual(0);
  }
});

