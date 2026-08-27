import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const auditScript = new URL("./audit_horizontal_overflow.mjs", import.meta.url);

/**
 * ページ SFC（と任意の基底 CSS）を一時ディレクトリへ書き出して監査する。
 * @param {string} page - .vue ファイルの内容
 * @param {string | null} css - 基底 CSS の内容。null なら --css を渡さない
 * @returns {{status: number | null, json: any}}
 */
function audit(page, css = null) {
	const dir = mkdtempSync(join(tmpdir(), "h-overflow-"));
	const pagePath = join(dir, "page.vue");
	writeFileSync(pagePath, page);

	const args = [auditScript.pathname, pagePath];
	if (css !== null) {
		const cssPath = join(dir, "main.css");
		writeFileSync(cssPath, css);
		args.push("--css", cssPath);
	}
	args.push("--json");

	try {
		const result = spawnSync(process.execPath, args, { encoding: "utf8" });
		const stdout = result.stdout.trim();
		try {
			return { status: result.status, json: JSON.parse(stdout) };
		} catch (error) {
			throw new Error(
				`監査結果を解析できません（終了コード: ${result.status ?? "null"}）\n` +
					`stderr: ${result.stderr.trim() || "(空)"}\nstdout: ${stdout || "(空)"}`,
				{ cause: error },
			);
		}
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

const CLEAN_PAGE = `<template>
  <article><p>本文</p></article>
</template>

<style scoped>
.wrap { padding: 24px; }
</style>
`;

test("違反が無いページは exit 0 を返し、findings が空になる", () => {
	const result = audit(CLEAN_PAGE);

	assert.equal(result.status, 0);
	assert.equal(result.blocking, undefined);
	assert.deepEqual(result.json.findings, []);
	assert.equal(result.json.blocking, false);
});

test("列数固定 x px 下限のグリッドを、溢れ始める幅つきで検出する", () => {
	const result = audit(`<template><div class="domain-grid" /></template>
<style scoped>
.domain-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(160px, 1fr));
  gap: 16px;
}
</style>
`);

	assert.equal(result.status, 1);
	const finding = result.json.findings.find((f) => f.rule === "fixed-column-grid");
	assert.ok(finding, "fixed-column-grid が検出されていない");
	assert.equal(finding.declaration, "grid-template-columns: repeat(4, minmax(160px, 1fr))");
	// 4 x 160px + gap 16px x 3 = 688px を下回ると必ず溢れる
	assert.equal(finding.minimumWidth, 688);
	assert.match(finding.remedy, /auto-fit/);
});

test("gap が無い列数固定グリッドはトラック幅の合計だけを最小幅とする", () => {
	const result = audit(`<template><div class="g" /></template>
<style scoped>
.g { display: grid; grid-template-columns: repeat(3, minmax(200px, 1fr)); }
</style>
`);

	const finding = result.json.findings.find((f) => f.rule === "fixed-column-grid");
	assert.ok(finding);
	assert.equal(finding.minimumWidth, 600);
});

test("auto-fit / auto-fill と下限 0 のグリッドは違反にしない", () => {
	const result = audit(`<template><div /></template>
<style scoped>
.a { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
.b { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
.c { grid-template-columns: repeat(4, minmax(0, 1fr)); }
</style>
`);

	assert.equal(result.status, 0);
	assert.deepEqual(result.json.findings, []);
});

test("表があるのにスクロール容器が無いページを検出する", () => {
	const result = audit(`<template>
  <div class="table-wrap"><table><tr><td>a</td></tr></table></div>
</template>
<style scoped>
.table-wrap { border: 1px solid; }
</style>
`);

	assert.equal(result.status, 1);
	const finding = result.json.findings.find((f) => f.rule === "table-scroll-container");
	assert.ok(finding, "table-scroll-container が検出されていない");
	assert.match(finding.remedy, /overflow-x: auto/);
});

test("表のラッパーに overflow-x があれば違反にしない", () => {
	const result = audit(`<template>
  <div class="table-wrap"><table><tr><td>a</td></tr></table></div>
</template>
<style scoped>
.table-wrap { overflow-x: auto; max-width: 100%; }
</style>
`);

	assert.equal(result.status, 0);
	assert.deepEqual(result.json.findings, []);
});

test("表が無いページにスクロール容器を要求しない", () => {
	const result = audit(CLEAN_PAGE);

	assert.equal(result.json.findings.filter((f) => f.rule === "table-scroll-container").length, 0);
});

test("100vw 幅の指定を検出する（スクロールバー幅ぶん必ず溢れる）", () => {
	const result = audit(`<template><div class="hero" /></template>
<style scoped>
.hero { width: 100vw; }
</style>
`);

	assert.equal(result.status, 1);
	const finding = result.json.findings.find((f) => f.rule === "viewport-width-unit");
	assert.ok(finding, "viewport-width-unit が検出されていない");
	assert.equal(finding.declaration, "width: 100vw");
});

test("--css を渡したとき、基底 CSS に折り返しの保険が無ければ検出する", () => {
	const result = audit(CLEAN_PAGE, "body { margin: 0; }\n");

	assert.equal(result.status, 1);
	const finding = result.json.findings.find((f) => f.rule === "text-wrap-baseline");
	assert.ok(finding, "text-wrap-baseline が検出されていない");
	assert.match(finding.remedy, /overflow-wrap/);
});

test("基底 CSS に overflow-wrap があれば違反にしない", () => {
	const result = audit(CLEAN_PAGE, "body { margin: 0; overflow-wrap: break-word; }\n");

	assert.equal(result.status, 0);
	assert.deepEqual(result.json.findings, []);
});

test("--css を渡さないときは基底 CSS の規則を評価しない", () => {
	const result = audit(CLEAN_PAGE);

	assert.equal(result.json.findings.filter((f) => f.rule === "text-wrap-baseline").length, 0);
});

test("<template> の外にある table は数えない（コメントや script 内の記述）", () => {
	const result = audit(`<script setup lang="ts">
// <table> と書いてあるだけのコメント
const NOTE = "<table>";
</script>
<template><p>本文</p></template>
<style scoped>
.x { color: red; }
</style>
`);

	assert.equal(result.json.findings.filter((f) => f.rule === "table-scroll-container").length, 0);
});

test("複数の違反をすべて列挙する", () => {
	const result = audit(`<template>
  <div class="table-wrap"><table><tr><td>a</td></tr></table></div>
</template>
<style scoped>
.g { grid-template-columns: repeat(4, minmax(160px, 1fr)); }
.hero { width: 100vw; }
</style>
`);

	assert.equal(result.status, 1);
	assert.deepEqual(
		result.json.findings.map((f) => f.rule).sort(),
		["fixed-column-grid", "table-scroll-container", "viewport-width-unit"],
	);
});

test("ファイルが無ければ exit 2 で止まる", () => {
	const result = spawnSync(process.execPath, [auditScript.pathname, "/nonexistent/page.vue"], {
		encoding: "utf8",
	});

	assert.equal(result.status, 2);
});
