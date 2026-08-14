import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
	MERMAID_DIAGRAM_DECLARATION,
	MERMAID_DIAGRAM_TYPES,
} from "../../fix-mermaid/scripts/mermaid-diagram-types.mjs";

const auditScript = new URL("./audit_source_parity.mjs", import.meta.url);

function audit(source, page, sourceExtension = "html", pageFileName = "page.tsx") {
	const fixtureDir = mkdtempSync(join(tmpdir(), "source-parity-"));
	const sourcePath = join(fixtureDir, `source.${sourceExtension}`);
	const pagePath = join(fixtureDir, pageFileName);
	writeFileSync(sourcePath, source);
	writeFileSync(pagePath, page);

	try {
		const result = spawnSync(
			process.execPath,
			[auditScript.pathname, sourcePath, pagePath, "--json"],
			{
				encoding: "utf8",
			},
		);
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
		rmSync(fixtureDir, { recursive: true, force: true });
	}
}

test("compares heading level and occurrence count while allowing source h2 to become page h1", () => {
	const result = audit(
		"<h2>Overview</h2><h2>Repeated</h2><h2>Repeated</h2><h3>Details</h3>",
		"<h1>Overview</h1><h2>Repeated</h2><h2>Details</h2>",
	);

	assert.equal(result.status, 1);
	assert.deepEqual(result.json.missingHeadings, [
		{ level: 2, text: "Repeated" },
		{ level: 3, text: "Details" },
	]);
	assert.deepEqual(result.json.extraHeadings, [{ level: 2, text: "Details" }]);
});

test("compares every HTML and Markdown heading level from h1 through h6", () => {
	const html = audit(
		"<h1>Title</h1><h2>Section</h2><h3>Detail</h3><h4>Level four</h4><h5>Level five</h5><h6>Level six</h6>",
		"<h1>Title</h1><h2>Section</h2><h3>Detail</h3><h4>Level four</h4><h5>Changed five</h5>",
	);
	assert.equal(html.status, 1);
	assert.deepEqual(html.json.missingHeadings, [
		{ level: 5, text: "Level five" },
		{ level: 6, text: "Level six" },
	]);

	const markdown = audit(
		"# Title\n\n#### Level four\n\n##### Level five\n\n###### Level six",
		"<h1>Title</h1><h4>Level four</h4><h5>Level five</h5>",
		"md",
	);
	assert.equal(markdown.status, 1);
	assert.deepEqual(markdown.json.missingHeadings, [{ level: 6, text: "Level six" }]);
});

test("treats missing or altered SVG elements as blocking parity failures", () => {
	const source = `<svg viewBox="0 0 20 20"><path d="M0 0 L20 20" stroke-width="2" /></svg>
<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" /></svg>`;
	const matching = audit(
		source,
		`<><svg viewBox="0 0 20 20"><path d="M0 0 L20 20" strokeWidth="2" /></svg>
<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" /></svg></>`,
	);
	assert.equal(matching.status, 0);
	assert.deepEqual(matching.json.missingSvgElements, []);
	assert.deepEqual(matching.json.counts.svgElements, { source: 2, page: 2 });

	const altered = audit(
		source,
		'<svg viewBox="0 0 20 20"><path d="M0 0 L10 10" strokeWidth="2" /></svg>',
	);
	assert.equal(altered.status, 1);
	assert.equal(altered.json.missingSvgElements.length, 2);
});

test("treats missing or altered callout and alert elements as blocking parity failures", () => {
	const source = `<div class="callout warn"><strong>Warning</strong><p>Keep this exact text.</p></div>
<aside class="alert info"><p>Informational text.</p></aside>`;
	const matching = audit(
		source,
		`<><div className={\`\${styles.callout} \${styles.warn}\`}><strong>Warning</strong><p>Keep this exact text.</p></div>
<aside className={\`\${styles.alert} \${styles.info}\`}><p>Informational text.</p></aside></>`,
	);
	assert.equal(matching.status, 0);
	assert.deepEqual(matching.json.missingCalloutElements, []);
	assert.deepEqual(matching.json.counts.calloutElements, { source: 2, page: 2 });

	const altered = audit(
		source,
		'<div className={styles.callout}><strong>Warning</strong><p>Changed text.</p></div>',
	);
	assert.equal(altered.status, 1);
	assert.equal(altered.json.missingCalloutElements.length, 2);
});

test("extracts Markdown admonitions as callout elements", () => {
	const result = audit(
		"> [!WARNING]\n> Keep this exact text.",
		'<aside data-variant="warn"><p>Changed text.</p></aside>',
		"md",
	);

	assert.equal(result.status, 1);
	assert.deepEqual(result.json.counts.calloutElements, { source: 1, page: 1 });
	assert.equal(result.json.missingCalloutElements.length, 1);
});

test("treats normalized code blocks and table rows as blocking parity elements", () => {
	const matching = audit(
		`<pre><code><span>npm</span> test</code></pre>
     <table><tr><th>Name</th><th>Value</th></tr></table>`,
		`<pre><span>npm</span>{" "}test</pre>
     <table><tbody><tr><th>Name</th><th>Value</th></tr></tbody></table>`,
	);
	assert.equal(matching.status, 0);
	assert.deepEqual(matching.json.missingCodeBlocks, []);
	assert.deepEqual(matching.json.missingTableRows, []);

	const missing = audit(
		`<pre>npm test</pre><pre>npm test</pre>
     <table><tr><td>A</td></tr><tr><td>A</td></tr></table>`,
		`<pre>npm test</pre><table><tr><td>A</td></tr></table>`,
	);
	assert.equal(missing.status, 1);
	assert.deepEqual(missing.json.missingCodeBlocks, ["npm test"]);
	assert.deepEqual(missing.json.missingTableRows, ["A"]);
});

test("requires Mermaid sources to match exactly in order and occurrence count", () => {
	const source = `<div class="mermaid">graph TD
A --&gt; B</div>
<div class="mermaid">sequenceDiagram
A-&gt;&gt;B: ping</div>`;
	const matchingPage = `const FIRST = \`graph TD
A --> B\`;
const SECOND = \`sequenceDiagram
A->>B: ping\`;
export default function Page() {
  return <><MermaidDiagram chart={FIRST} /><MermaidDiagram chart={SECOND} /></>;
}`;
	const matching = audit(source, matchingPage);
	assert.equal(matching.status, 0);
	assert.equal(matching.json.mermaidSourcesMatch, true);

	const reversedPage = `const FIRST = \`graph TD
A --> B\`;
const SECOND = \`sequenceDiagram
A->>B: ping\`;
export default function Page() {
  return <><MermaidDiagram chart={SECOND} /><MermaidDiagram chart={FIRST} /></>;
}`;
	const reversed = audit(source, reversedPage);
	assert.equal(reversed.status, 1);
	assert.equal(reversed.json.mermaidSourcesMatch, false);
	assert.deepEqual(reversed.json.pageMermaidSources, [
		"sequenceDiagram\nA->>B: ping",
		"graph TD\nA --> B",
	]);
});

test("does not treat a Markdown Mermaid fence as a normal code block", () => {
	const source = `Intro paragraph.

\`\`\`mermaid
flowchart TD
  A[Start] --> B[Done]
\`\`\``;
	const page = `const CHART = \`flowchart TD
  A[Start] --> B[Done]\`;
export default function Page() {
  return <><p>Intro paragraph.</p><MermaidDiagram chart={CHART} /></>;
}`;

	const result = audit(source, page, "md");

	assert.equal(result.status, 0);
	assert.deepEqual(result.json.missingCodeBlocks, []);
	assert.equal(result.json.mermaidSourcesMatch, true);
});

test("collects DIAGRAMS entries with quoted and unquoted object keys", () => {
	const source = `<script>var DIAGRAMS = {
unquoted: \`flowchart TD
A --> B\`,
"quoted-key": \`sequenceDiagram
A->>B: ping\`
};</script>`;
	const page = `const FIRST = \`flowchart TD
A --> B\`;
const SECOND = \`sequenceDiagram
A->>B: ping\`;
export default function Page() {
  return <><MermaidDiagram chart={FIRST} /><MermaidDiagram chart={SECOND} /></>;
}`;
	const result = audit(source, page);

	assert.equal(result.status, 0);
	assert.equal(result.json.mermaidSourcesMatch, true);
});

test("detects list-item omissions after a shared 40-character prefix", () => {
	const prefix = "abcdefghijklmnopqrstuvwxyz0123456789sharedprefix";
	const result = audit(
		`<ul><li>${prefix} required suffix</li></ul>`,
		`<ul><li>${prefix}</li></ul>`,
	);

	assert.equal(result.status, 1);
	assert.deepEqual(result.json.missingListItems, [`${prefix} required suffix`]);
});

test("requires duplicate source list items to have matching destination occurrences", () => {
	const item = "Repeated migration requirement";
	const result = audit(
		`<ul><li>${item}</li><li>${item}</li></ul>`,
		`<ul><li>${item}</li></ul>`,
	);

	assert.equal(result.status, 1);
	assert.deepEqual(result.json.missingListItems, [item]);
});

test("recognizes every allowed Mermaid diagram declaration including pie", () => {
	const charts = [
		"graph TD\nA --> B",
		"flowchart TD\nA --> B",
		"sequenceDiagram\nA->>B: ping",
		"mindmap\n  root((Root))",
		"stateDiagram-v2\nA --> B",
		"gitGraph\ncommit",
		"erDiagram\nA ||--o{ B : has",
		"classDiagram\nA <|-- B",
		"journey\ntitle Trip",
		"timeline\ntitle History",
		'pie title Share\n"A" : 1',
	];
	const source = charts
		.map((chart) => `<div class="mermaid">${chart}</div>`)
		.join("\n");
	const declarations = charts
		.map((chart, index) => `const CHART_${index} = \`${chart}\`;`)
		.join("\n");
	const diagrams = charts
		.map((_, index) => `<MermaidDiagram chart={CHART_${index}} />`)
		.join("");

	const result = audit(
		source,
		`${declarations}\nexport default function Page() { return <>${diagrams}</>; }`,
	);

	assert.equal(result.status, 0);
	assert.equal(result.json.mermaidSourcesMatch, true);
	assert.equal(result.json.counts.mermaidSources.source, charts.length);
	assert.equal(MERMAID_DIAGRAM_TYPES.length, charts.length);
	for (const chart of charts) assert.match(chart, MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch("block-beta\ncolumns 1", MERMAID_DIAGRAM_DECLARATION);
});

test("treats normalized HTML and Markdown paragraphs as blocking parity elements", () => {
	const matchingHtml = audit(
		"<p>First ordinary paragraph.</p><p>Second ordinary paragraph.</p>",
		"<p>First ordinary paragraph.</p><p>Second ordinary paragraph.</p>",
	);
	assert.equal(matchingHtml.status, 0);
	assert.deepEqual(matchingHtml.json.missingParagraphs, []);

	const missingHtml = audit(
		"<p>First ordinary paragraph.</p><p>Second ordinary paragraph.</p>",
		"<p>First ordinary paragraph.</p>",
	);
	assert.equal(missingHtml.status, 1);
	assert.deepEqual(missingHtml.json.missingParagraphs, [
		"Second ordinary paragraph.",
	]);

	const missingMarkdown = audit(
		`First Markdown paragraph.

Second Markdown paragraph spans
two source lines.`,
		"<p>First Markdown paragraph.</p>",
		"md",
	);
	assert.equal(missingMarkdown.status, 1);
	assert.deepEqual(missingMarkdown.json.missingParagraphs, [
		"Second Markdown paragraph spans two source lines.",
	]);
});

test("accepts .markdown as a Markdown source extension", () => {
	const result = audit(
		"## Markdown heading\n\nOrdinary paragraph.",
		"<><h2>Markdown heading</h2><p>Ordinary paragraph.</p></>",
		"markdown",
	);

	assert.equal(result.status, 0);
	assert.equal(result.json.counts.headings.source, 1);
	assert.equal(result.json.counts.paragraphs.source, 1);
	assert.deepEqual(result.json.missingHeadings, []);
	assert.deepEqual(result.json.missingParagraphs, []);
});

// --------------------------------------------------------------------------
// Vue SFC（Nuxt 移行先）対応
// --------------------------------------------------------------------------

/** Vue SFC を移植先として監査するショートハンド。 */
function auditVue(source, page, sourceExtension = "html") {
	return audit(source, page, sourceExtension, "page.vue");
}

test("inventories markup from the <template> block of a Vue SFC", () => {
	const page = `<script setup lang="ts">
// スクリプト内の文字列は本文として数えない
const NOTE = "Script Only Heading";
</script>

<template>
  <h1>Overview</h1>
  <h3>Details</h3>
</template>
`;
	// 原本 h2 がページ h1 になるのは正当な移植。h3 は h3 のまま維持する。
	const result = auditVue("<h2>Overview</h2><h3>Details</h3>", page);

	assert.equal(result.status, 0);
	assert.deepEqual(result.json.missingHeadings, []);
	assert.deepEqual(result.json.extraHeadings, []);
});

test("does not count text inside <script setup> or <style> as page body text", () => {
	const page = `<script setup lang="ts">
const HIDDEN = "この一文はテンプレートに存在しない";
</script>

<template>
  <p>本文の段落。</p>
</template>

<style scoped>
.note::after { content: "スタイル内の文字列"; }
</style>
`;
	const result = auditVue("<p>本文の段落。</p><p>この一文はテンプレートに存在しない</p>", page);

	assert.equal(result.status, 1);
	assert.deepEqual(result.json.missingParagraphs, ["この一文はテンプレートに存在しない"]);
});

test("resolves Vue mustache interpolation against script constants", () => {
	const page = `<script setup lang="ts">
const PRODUCT = "CAPM";
</script>

<template>
  <p>{{ PRODUCT }} は PMI の認定資格です。</p>
</template>
`;
	const result = auditVue("<p>CAPM は PMI の認定資格です。</p>", page);

	assert.equal(result.status, 0);
	assert.deepEqual(result.json.missingParagraphs, []);
});

test("collects Mermaid sources from bound and literal chart props in Vue", () => {
	const source = `<div class="mermaid">graph TD
A --&gt; B</div>
<div class="mermaid">sequenceDiagram
A-&gt;&gt;B: ping</div>`;
	const page = `<script setup lang="ts">
const FIRST = \`graph TD
A --> B\`;
</script>

<template>
  <MermaidDiagram :chart="FIRST" />
  <MermaidDiagram chart="sequenceDiagram
A->>B: ping" />
</template>
`;
	const result = auditVue(source, page);

	assert.equal(result.status, 0);
	assert.equal(result.json.mermaidSourcesMatch, true);
});

test("detects reversed Mermaid order in a Vue SFC", () => {
	const source = `<div class="mermaid">graph TD
A --&gt; B</div>
<div class="mermaid">sequenceDiagram
A-&gt;&gt;B: ping</div>`;
	const page = `<script setup lang="ts">
const FIRST = \`graph TD
A --> B\`;
const SECOND = \`sequenceDiagram
A->>B: ping\`;
</script>

<template>
  <MermaidDiagram :chart="SECOND" />
  <MermaidDiagram :chart="FIRST" />
</template>
`;
	const result = auditVue(source, page);

	assert.equal(result.status, 1);
	assert.equal(result.json.mermaidSourcesMatch, false);
	assert.deepEqual(result.json.pageMermaidSources, [
		"sequenceDiagram\nA->>B: ping",
		"graph TD\nA --> B",
	]);
});

test("recognizes kebab-case class names as code block wrappers in Vue", () => {
	const result = auditVue(
		"<pre>npm test</pre><pre>npm run build</pre>",
		`<template>
  <div class="code-block">npm test</div>
  <div class="code-block">npm run build</div>
</template>
`,
	);

	assert.equal(result.status, 0);
	assert.deepEqual(result.json.missingCodeBlocks, []);
	assert.deepEqual(result.json.counts.codeBlocks, { source: 2, page: 2 });
});

test("treats a Vue SFC without a <template> block as a parity failure input", () => {
	const result = auditVue("<h2>Overview</h2>", `<script setup lang="ts">\nconst A = 1;\n</script>\n`);

	assert.equal(result.status, 1);
	assert.deepEqual(result.json.missingHeadings, [{ level: 2, text: "Overview" }]);
});

test("human-readable output uses the audited page path instead of page.tsx", () => {
	const fixtureDir = mkdtempSync(join(tmpdir(), "source-parity-label-"));
	const sourcePath = join(fixtureDir, "source.html");
	const pagePath = join(fixtureDir, "guide.vue");
	writeFileSync(sourcePath, "<h2>Missing heading</h2>");
	writeFileSync(pagePath, "<template><p>Body</p></template>");

	try {
		const result = spawnSync(process.execPath, [auditScript.pathname, sourcePath, pagePath], {
			encoding: "utf8",
		});
		assert.equal(result.status, 1);
		assert.match(result.stdout, new RegExp(`${pagePath} に存在しない原本の見出し`));
		assert.doesNotMatch(result.stdout, /page\.tsx/);
	} finally {
		rmSync(fixtureDir, { recursive: true, force: true });
	}
});
