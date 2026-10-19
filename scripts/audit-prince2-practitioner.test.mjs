import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { normalizeApprovedSource } from "./audit-prince2-practitioner.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// ユーザー承認済みの唯一の変更。原本の全文・周辺文言を固定する。
const OLD_NOTICE = "本ガイドはPeopleCert社の公式教材そのものではなく、公式シラバスおよび公開情報をもとに独自に作成した非公式の学習補助資料です。PRINCE2&reg;はAXELOS Limitedの登録商標です。実際の試験範囲・出題傾向は、必ず最新の公式シラバスおよび公式教本(PRINCE2 7 Managing Successful Projects)で確認してください。";
const NEW_NOTICE = "本ガイドはPeopleCert社の公式教材そのものではなく、公式シラバスおよび公開情報をもとに独自に作成した非公式の学習補助資料です。PRINCE2&reg;はPeopleCert groupの登録商標です。実際の試験範囲・出題傾向は、必ず最新の公式シラバスおよび公式教本(PRINCE2 7 Managing Successful Projects)で確認してください。";
const OLD_PARAGRAPH = `<p>${OLD_NOTICE}</p>`;
const NEW_PARAGRAPH = `<p>${NEW_NOTICE}</p>`;
const SOURCE = `<main><p>AXELOS Limitedという他の原文は保持する</p><section id="references"><h3>免責事項</h3>${OLD_PARAGRAPH}<p>末尾の別段落</p></section></main>`;

function audit(page) {
  const directory = mkdtempSync(join(tmpdir(), "prince2-audit-test-"));
  try {
    const file = join(directory, "page.vue");
    writeFileSync(file, page);
    return spawnSync(process.execPath, [join(ROOT, "scripts/audit-prince2-practitioner.mjs"), file], {
      cwd: ROOT, encoding: "utf8",
    });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test("参考文献内の承認済み段落だけを正規化し、他の全バイトを維持する", () => {
  assert.equal(normalizeApprovedSource(SOURCE), SOURCE.replace(OLD_PARAGRAPH, NEW_PARAGRAPH));
});

test("承認済み段落が存在しない原本を拒否する", () => {
  assert.throws(() => normalizeApprovedSource(SOURCE.replace(OLD_PARAGRAPH, "")), /1件/);
});

test("承認済み段落の重複を拒否する", () => {
  assert.throws(() => normalizeApprovedSource(SOURCE.replace(OLD_PARAGRAPH, OLD_PARAGRAPH.repeat(2))), /1件/);
});

test("同じ文言でも参考文献の免責事項以外にある場合は拒否する", () => {
  assert.throws(() => normalizeApprovedSource(SOURCE.replace('id="references"', 'id="other"')), /参考文献/);
});

test("参考文献内でも免責事項以外の位置の置換は拒否する", () => {
  assert.throws(() => normalizeApprovedSource(SOURCE.replace("<h3>免責事項</h3>", "<h3>別項目</h3>")), /免責/);
});

test("実際のアーカイブ原本と訂正済みページの監査が成功する", () => {
  const page = readFileSync(join(ROOT, "app/pages/prince2-7-practitioner-guide.vue"), "utf8");
  const result = audit(page);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /承認済み差分/);
});

test("承認済み段落以外の段落脱落を引き続き拒否する", () => {
  const page = readFileSync(join(ROOT, "app/pages/prince2-7-practitioner-guide.vue"), "utf8");
  const changed = page.replace(/<p>本ガイドは以下の一次情報[\s\S]*?<\/p>/, "");
  assert.notEqual(changed, page);
  const result = audit(changed);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /段落/);
});

test("承認済み段落であっても権利者以外の文言改変は拒否する", () => {
  const page = readFileSync(join(ROOT, "app/pages/prince2-7-practitioner-guide.vue"), "utf8");
  assert.ok(page.includes(NEW_PARAGRAPH));
  const changed = page.replace(NEW_PARAGRAPH, NEW_PARAGRAPH.replace("本ガイドは", "資料は"));
  const result = audit(changed);
  assert.equal(result.status, 1, result.stdout + result.stderr);
});

test("承認済み差分があってもMermaidソースの改変を拒否する", () => {
  const page = readFileSync(join(ROOT, "app/pages/prince2-7-practitioner-guide.vue"), "utf8");
  const changed = page.replace('"LO3: 7つのPractices" : 51', '"LO3: 7つのPractices" : 52');
  assert.notEqual(changed, page);
  const result = audit(changed);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /Mermaid/);
});
