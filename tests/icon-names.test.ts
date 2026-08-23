import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import tablerIcons from "@iconify-json/tabler/icons.json";

/*
 * 存在しないアイコン名は型検査にも lint にも build にも引っかからない。
 * @nuxt/icon は実行時に解決を試み、見つからなければ警告を出して空白を描画するだけで、
 * ビルドは成功する（実例: tabler:handshake は Tabler に存在せず本番だけ空白になっていた）。
 *
 * したがって「参照している名前」と「アイコンセットが定義している名前」を
 * ソース走査で突き合わせる契約が要る。ブラウザは不要なのでユニットテストで固定する。
 */

const APP_DIR = join(import.meta.dirname, "..", "app");
const TABLER_NAMES = new Set([
  ...Object.keys(tablerIcons.icons),
  ...Object.keys(tablerIcons.aliases ?? {}),
]);

/** app/ 配下の .vue / .ts を再帰的に集める。 */
function collectSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(path);
    return /\.(vue|ts)$/.test(entry.name) ? [path] : [];
  });
}

/** ソース中の tabler:<name> をすべて拾う（Icon の name 属性・カタログの icon 値の双方）。 */
function collectTablerRefs(): { file: string; icon: string }[] {
  return collectSourceFiles(APP_DIR).flatMap((file) => {
    const source = readFileSync(file, "utf8");
    const matches = source.matchAll(/tabler:([a-z0-9-]+)/g);
    return [...matches].map((match) => ({
      file: file.slice(APP_DIR.length + 1),
      icon: match[1]!,
    }));
  });
}

describe("Tabler アイコン名の実在性", () => {
  it("アイコンセットに定義があり、走査対象が空にならない", () => {
    const refs = collectTablerRefs();

    // 走査そのものが壊れて「参照 0 件で成功」になるのを防ぐ。
    expect(refs.length).toBeGreaterThan(0);

    const unknown = refs
      .filter((ref) => !TABLER_NAMES.has(ref.icon))
      .map((ref) => `${ref.file}: tabler:${ref.icon}`);

    expect(unknown).toEqual([]);
  });
});
