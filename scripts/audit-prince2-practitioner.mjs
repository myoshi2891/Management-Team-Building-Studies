import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "archive/Prince2-7-practitioner-guide/Prince2-7-practitioner-guide.html");
const PAGE = join(ROOT, "app/pages/prince2-7-practitioner-guide.vue");
const AUDITOR = join(ROOT, ".claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs");

// 2026-10-19 ユーザー承認。原本は不変保存し、この段落の権利者だけを訂正する。
// 他の段落や同じ権利者名を一括置換してはならない。
const ORIGINAL_NOTICE = "本ガイドはPeopleCert社の公式教材そのものではなく、公式シラバスおよび公開情報をもとに独自に作成した非公式の学習補助資料です。PRINCE2&reg;はAXELOS Limitedの登録商標です。実際の試験範囲・出題傾向は、必ず最新の公式シラバスおよび公式教本(PRINCE2 7 Managing Successful Projects)で確認してください。";
const ORIGINAL_PARAGRAPH = `<p>${ORIGINAL_NOTICE}</p>`;
const CORRECTED_PARAGRAPH = `<p>${ORIGINAL_NOTICE.replace("AXELOS Limited", "PeopleCert group")}</p>`;

/** 承認済みの1段落だけを補正し、それ以外の原本の全バイトを保持する。 */
export function normalizeApprovedSource(source) {
  if (source.split(ORIGINAL_PARAGRAPH).length !== 2) {
    throw new Error("承認済み原本段落は正確に1件である必要があります。");
  }
  const references = source.match(/<section\b[^>]*\bid=["']references["'][^>]*>[\s\S]*?<\/section>/);
  if (!references) throw new Error("原本の参考文献セクションがありません。");
  if (!references[0].includes(`<h3>免責事項</h3>${ORIGINAL_PARAGRAPH}`)) {
    throw new Error("承認済み段落が参考文献の免責事項直下にありません。");
  }
  return source.replace(ORIGINAL_PARAGRAPH, CORRECTED_PARAGRAPH);
}

/** 一時コピーに限定した補正の後、既存の全文監査をそのまま実行する。 */
function main(page = PAGE) {
  const source = normalizeApprovedSource(readFileSync(SOURCE, "utf8"));
  const directory = mkdtempSync(join(tmpdir(), "prince2-approved-source-"));
  try {
    const normalized = join(directory, "Prince2-7-practitioner-guide.html");
    writeFileSync(normalized, source);
    console.log("承認済み差分: 参考文献末尾の免責段落のAXELOS Limited → PeopleCert group（1箇所）。原本は変更しません。");
    const result = spawnSync(process.execPath, [AUDITOR, normalized, resolve(page)], { stdio: "inherit" });
    if (result.error) throw result.error;
    return result.status ?? 2;
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    process.exitCode = main(process.argv[2]);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 2;
  }
}
