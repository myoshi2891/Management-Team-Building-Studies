import assert from "node:assert/strict";
import test from "node:test";
import {
	MERMAID_DIAGRAM_DECLARATION,
	MERMAID_DIAGRAM_TYPES,
} from "./mermaid-diagram-types.mjs";

test("MERMAID_DIAGRAM_TYPES lists every diagram type recognized by the audit scripts", () => {
	assert.deepEqual(MERMAID_DIAGRAM_TYPES, [
		"graph",
		"flowchart",
		"sequenceDiagram",
		"mindmap",
		"stateDiagram-v2",
		"gitGraph",
		"erDiagram",
		"classDiagram",
		"journey",
		"timeline",
		"pie",
	]);
});

test("matches every declared diagram type at the start of a chart with no leading directives", () => {
	for (const type of MERMAID_DIAGRAM_TYPES) {
		assert.match(`${type} TD\nA --> B`, MERMAID_DIAGRAM_DECLARATION);
	}
});

test("does not match unknown diagram declarations", () => {
	assert.doesNotMatch("block-beta\ncolumns 1", MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch("quadrantChart\ntitle Reach vs Influence", MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch("", MERMAID_DIAGRAM_DECLARATION);
});

test("does not match a diagram type as a prefix of a longer identifier", () => {
	// "graph" は "graphics" のような後続の単語文字を伴う識別子の一部としてはマッチしない（\b境界）。
	assert.doesNotMatch("graphics TD\nA --> B", MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch("graphTD\nA --> B", MERMAID_DIAGRAM_DECLARATION);
});

test("is case-sensitive with respect to the declared diagram type", () => {
	assert.doesNotMatch("Flowchart TD\nA --> B", MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch("FLOWCHART TD\nA --> B", MERMAID_DIAGRAM_DECLARATION);
});

test("does not match when the diagram declaration is indented from the start of the string", () => {
	// ^ が文字列の先頭にのみアンカーされるため、先頭に空白があると宣言とは認識されない。
	assert.doesNotMatch("  flowchart TD\nA --> B", MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch("\nflowchart TD\nA --> B", MERMAID_DIAGRAM_DECLARATION);
});

test("matches a diagram declaration preceded by a single block %%{...}%% directive", () => {
	assert.match(
		'%%{init: {"flowchart": {"curve": "linear"}}}%%\nflowchart TB\nA --> B',
		MERMAID_DIAGRAM_DECLARATION,
	);
});

test("matches a diagram declaration preceded by a block directive containing nested braces", () => {
	const chart =
		'%%{init: {"theme": "base", "themeVariables": {"primaryColor": "#EEF1F8", "lineColor": "#2E3F72"}}}%%\nsequenceDiagram\nA->>B: ping';
	assert.match(chart, MERMAID_DIAGRAM_DECLARATION);
});

test("matches a diagram declaration preceded by multiple stacked block directives", () => {
	const chart =
		'%%{init: {"theme": "base"}}%%\n%%{wrap}%%\nflowchart TD\nA --> B';
	assert.match(chart, MERMAID_DIAGRAM_DECLARATION);
});

test("matches a diagram declaration preceded by a single line comment (%% ...)", () => {
	assert.match("%% 図の意図を書いた行コメント\nflowchart TB\nA --> B", MERMAID_DIAGRAM_DECLARATION);
});

test("matches a diagram declaration preceded by multiple stacked line comments", () => {
	const chart = "%% first comment\n%% second comment\nflowchart TD\nA --> B";
	assert.match(chart, MERMAID_DIAGRAM_DECLARATION);
});

test("matches a diagram declaration preceded by a mix of block directives and line comments", () => {
	const chart =
		'%%{init: {"theme": "base"}}%%\n%% explanatory comment\nflowchart TD\nA --> B';
	assert.match(chart, MERMAID_DIAGRAM_DECLARATION);
});

test("allows trailing whitespace after a directive line before the newline", () => {
	const chart = '%%{init: {"theme": "base"}}%%   \nflowchart TD\nA --> B';
	assert.match(chart, MERMAID_DIAGRAM_DECLARATION);
});

test("does not match a directive or comment that is not followed by a newline and diagram type", () => {
	// %% コメントは行末までを消費するため、同一行に宣言が続いていても改行がなければマッチしない。
	assert.doesNotMatch("%% comment flowchart TD", MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch('%%{init: {"theme": "base"}}%% flowchart TD', MERMAID_DIAGRAM_DECLARATION);
});

test("does not match when only directives/comments are present without a diagram type", () => {
	assert.doesNotMatch("%%{init: {\"theme\": \"base\"}}%%\n", MERMAID_DIAGRAM_DECLARATION);
	assert.doesNotMatch("%% just a comment\n", MERMAID_DIAGRAM_DECLARATION);
});

test("matches every allowed diagram type when preceded by a leading directive", () => {
	for (const type of MERMAID_DIAGRAM_TYPES) {
		const chart = `%%{init: {"theme": "base"}}%%\n${type} TD\nA --> B`;
		assert.match(chart, MERMAID_DIAGRAM_DECLARATION);
	}
});

test("regex source embeds every diagram type as an alternation", () => {
	for (const type of MERMAID_DIAGRAM_TYPES) {
		assert.ok(
			MERMAID_DIAGRAM_DECLARATION.source.includes(type),
			`expected regex source to include "${type}"`,
		);
	}
});