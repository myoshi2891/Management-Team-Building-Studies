import { expect, test, type Page } from "@playwright/test";
import { GUIDE_KINDS, type GuideKindId } from "../app/utils/guide-catalog";

/*
 * グローバルナビのスモーク。
 *
 * ユニットテスト（tests/components/SiteHeader.test.ts）は DOM 構造と状態遷移を固定するが、
 * メディアクエリに依存する挙動は jsdom では再現できない。
 * とくに「ポインタデバイスでウィンドウを狭めた状態」（= モバイルレイアウトなのに
 * hover が効く環境）は、hover とクリックの両方が発火して開いた直後に閉じる事故が起きる。
 * この経路はここでしか検知できない。
 */

/*
 * 巡回対象の種別は GUIDE_KINDS（種別定義の SSoT）から導出する。
 * ここに固定配列を置くと種別追加時に二重管理になり、テストは Green のまま
 * 新種別のドロップダウンを一度も開かない（＝静かにカバレッジが欠ける）。
 */
const KIND_IDS: readonly GuideKindId[] = GUIDE_KINDS.map((kind) => kind.id);

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

/*
 * モバイルのハンバーガーを開く。hover / keyboard 版と同じハイドレーション競合があり、
 * リスナーが付く前のタップはネイティブのクリックとして捨てられる
 * （実測: 3 回に 1 回、ナビが開かないまま後続のトリガーが不可視でタイムアウトした）。
 *
 * 再試行を掛けるのは「最初の 1 タップ」だけに留める。ナビが可視になった時点で
 * ハイドレーションは済んでおり、それ以降のタップは素のまま検証してよい
 * （アコーディオン側にも再試行を掛けると、開いた直後に閉じる二重発火のバグを
 *   再試行が覆い隠してしまう）。開いていれば何もしないので再試行で閉じない。
 */
async function openMobileNav(page: Page): Promise<void> {
  const nav = page.locator("#global-nav");
  await expect(async () => {
    if (await nav.isHidden()) await page.locator("[data-testid='nav-toggle']").click({ timeout: 2_000 });
    await expect(nav).toBeVisible({ timeout: 500 });
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

  const trigger = page.locator("#nav-trigger-certifications");
  const panel = page.locator("#nav-panel-certifications");

  await expect(trigger).toHaveClass(/current/);
  await expect(panel).toBeHidden();

  await openWithHover(page, "certifications");
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

    for (const id of KIND_IDS) {
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
 * パネルはハブ（プログラム）へのリンクだけを並べるため、行数はガイド数ではなく
 * プログラム数で決まる（旧メガメニューはガイドを列挙しており、実測でパネル全高が
 * 683px に達して破綻した）。プログラム数の上限は tests/utils/guide-catalog.test.ts が
 * 分類の契約として固定するが、「実際に描いたら画面を覆うか」は実レイアウトでしか
 * 判定できないため、ここで実測する。
 *
 * 縦が最も厳しい常用構成として 1280x720 を使う。
 */
test("デスクトップ: どのパネルを開いても縦にビューポートを覆わない", async ({ page }) => {
  const viewport = { width: 1280, height: 720 };
  await page.setViewportSize(viewport);
  await page.goto("/");

  const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
  const available = viewport.height - headerBox.height;

  for (const id of KIND_IDS) {
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

  for (const id of KIND_IDS) {
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

  const trigger = page.locator("#nav-trigger-books");
  const panel = page.locator("#nav-panel-books");

  await openWithKeyboard(page, "books");

  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("デスクトップ: 閉じているドロップダウンのリンクはタブ順に現れない", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await page.locator("#nav-trigger-certifications").focus();
  await page.keyboard.press("Tab");

  await expect(page.locator("#nav-trigger-books")).toBeFocused();
});

test("モバイル幅: ポインタデバイスでもタップでアコーディオンが開く", async ({ page }) => {
  // Desktop Chrome を狭めた状態を再現する（hover: hover のままモバイルレイアウトになる）。
  await page.setViewportSize(MOBILE);
  await page.goto("/");

  await openMobileNav(page);

  for (const id of KIND_IDS) {
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

  await openMobileNav(page);
  await page.locator("#nav-trigger-practices").click();
  await page.locator("#nav-panel-practices a").first().click();

  // ナビが並べるのはハブ（プログラム）だけなので、先頭は「テーマで学ぶ」の最初のハブ。
  await expect(page).toHaveURL(/\/practices\/career$/);
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
  await openMobileNav(page);

  // カテゴリを開いてリンクにフォーカスを当てる
  await page.locator("#nav-trigger-certifications").click();
  const link = page.locator("#nav-panel-certifications a").first();
  await link.focus();
  await expect(link).toBeFocused();

  // Escape でパネルが閉じトリガーに戻る
  await page.keyboard.press("Escape");
  await expect(page.locator("#nav-panel-certifications")).toBeHidden();
  await expect(page.locator("#nav-trigger-certifications")).toBeFocused();

  // もう一度 Escape でメニュー自体が閉じて nav-toggle に戻る
  await page.keyboard.press("Escape");
  await expect(page.locator("#global-nav")).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("デスクトップ: 外側クリックでパネルが閉じトリガーへフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("#nav-trigger-books");
  const panel = page.locator("#nav-panel-books");

  // キーボードで開く（フォーカスがナビ内に入る）
  await openWithKeyboard(page, "books");

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
  for (const id of KIND_IDS) {
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


/*
 * サイト内検索のスモーク。
 *
 * ユニットテスト（tests/components/SiteSearch.test.ts）が開閉とキーボード操作を固定するが、
 * 「実際に遷移するか」「パネルがヘッダーの overflow-x: clip で切り取られないか」は
 * 実レイアウトと実ルーティングでしか判定できない。
 * 検索はハブ方式でガイドが 1 クリック遠くなる代償を相殺する導線なので、
 * ここが黙って壊れると回遊が成立しなくなる。
 */
test("デスクトップ: 検索から候補を選んでガイドへ遷移する", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("[data-testid='site-search-trigger']");
  const input = page.locator("[data-testid='site-search-input']");

  /*
   * SSG された HTML はボタンが押せる状態で先に描画されるため、goto() 直後のクリックは
   * Vue のリスナーが付く前のネイティブ click になりうる。他のトリガーと同じく冪等に再試行する。
   */
  await expect(async () => {
    if (await input.isHidden()) await trigger.click({ timeout: 2_000 });
    await expect(input).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 10_000 });

  await input.fill("CAPM ド");

  const options = page.locator("[role='option']");
  await expect(options).toHaveCount(4);

  // パネルがヘッダー内枠の右端をはみ出さない（overflow-x: clip で切り取られない）。
  const container = (await page.locator(".global-header-inner").boundingBox())!;
  const panel = (await page.locator(".site-search-panel").boundingBox())!;
  expect(panel.x).toBeGreaterThanOrEqual(container.x - 0.5);
  expect(panel.x + panel.width).toBeLessThanOrEqual(container.x + container.width + 0.5);

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/certified-associate-in-project-management-domain1$/);
});

test("デスクトップ: 検索は Escape で閉じてトリガーへフォーカスが戻る", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const trigger = page.locator("[data-testid='site-search-trigger']");
  const input = page.locator("[data-testid='site-search-input']");

  await expect(async () => {
    if (await input.isHidden()) await trigger.click({ timeout: 2_000 });
    await expect(input).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 10_000 });

  await page.keyboard.press("Escape");
  await expect(input).toBeHidden();
  await expect(trigger).toBeFocused();
});
