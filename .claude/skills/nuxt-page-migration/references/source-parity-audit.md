# 原本照合監査（Source Parity Audit）— 転写漏れの機械検知

(最終更新日: 2026-08-14)

**目的**: ガイドページ移植で最も多い不具合である**転写漏れ（セクション・リスト項目・
参考リンクの脱落）を、目視ではなくスクリプトとテストで検知する**。

転写漏れは「読めば分かる」類のバグに見えるが、原本が 1,000 行を超えるガイドでは
人間も AI も確実に見落とす。だから**照合は必ず機械にやらせる**。

---

## 0. 前提：原本はリポジトリ直下にある

移行元の HTML / Markdown は**削除禁止**で、リポジトリ直下に置かれている（Git 追跡下）。

```bash
ls *.html   # HTML 原本（デザイン・図解の正）
ls *.md     # Markdown 原本（章立て・本文の正）
```

現時点の原本は CAPM ガイドの 2 形態:

- `Certified-Associate-in-Project-Management.md`（61KB / 見出し 74 / リスト 114 / 表 144 行 / Mermaid 9）
- `Certified-Associate-in-Project-Management.html`（107KB / 同内容 + デザイン + Mermaid `DIAGRAMS` オブジェクト）

> **どちらを正とするか**: 章立て・本文・リンクは `.md`、配色・レイアウト・Mermaid のソースは
> `.html` を正とする。**両方に対して監査を回し、差分の理由を説明できない場合はユーザーに確認する。**
>
> 2 形態は同じ内容のはずだが、片方だけ更新されている可能性は常にある。
> **不一致が数十件以上出たら、まず原本の取り違えや、原本自体の同期漏れを疑う。**

---

## 1. 監査スクリプトの実行

```bash
# リポジトリルートから実行する
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  Certified-Associate-in-Project-Management.html \
  pages/capm.vue
```

出力例（合格）:

```text
要素              原本    page.vue  （参考値。判定は下の照合結果で行う）
listItems             0         0
codeBlocks           11        11
tableRows            41        41
paragraphs           27        27
headings             17        17
externalLinks        16        16
mermaidSources       11        11

判定: ✅ 漏れなし — Green 判定に進んでよい。
```

出力例（不合格）:

```text
❌ page.vue に存在しない原本の見出し (3 件):
  h3: 権限ポリシーの設定
  h3: Webhookでの非同期処理
  h3: カスタムスキルの作成

❌ page.vue に存在しない原本の外部リンク (2 件):
  https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

❌ page.vue 本文に見当たらない原本のリスト項目 (4 件):
  - ファイル読み書き
  - bashコマンド実行

判定: ❌ 転写漏れあり — Green コミット禁止。漏れを転写してから再実行すること。
```

**終了コード**: `0` = 漏れなし / `1` = 漏れあり / `2` = 引数エラー。

### 判定ゲート（ブロッキング）と参考値の区別

| 項目 | 判定 | 理由 |
|---|---|---|
| 見出しの欠落・改変（h1〜h6） | **ブロッキング** | レベルと出現回数を保ったまま全見出しを比較する |
| 外部リンク URL の欠落 | **ブロッキング** | 参考文献セクションの脱落を確実に捉える |
| リスト項目テキストの欠落 | **ブロッキング** | 本文平坦化テキストへの包含判定なのでマークアップ非依存 |
| コードブロック内容の欠落 | **ブロッキング** | タグを除去した正規化内容を出現回数込みで比較する |
| 表行内容の欠落 | **ブロッキング** | セルのマークアップを除去した正規化内容を出現回数込みで比較する |
| 通常段落内容の欠落 | **ブロッキング** | HTML / Markdown / JSX の段落を正規化し、出現回数込みで比較する |
| Mermaid ソースの差分 | **ブロッキング** | 正規化済みソースを順序・内容・出現回数込みで完全一致比較する |
| SVG の欠落・改変 | **ブロッキング** | タグ・幾何属性・表示テキストを正規化して出現回数込みで比較する |
| callout / alert の欠落・改変 | **ブロッキング** | HTML / JSX の variant と本文、Markdown admonition を正規化して比較する |
| `listItems` / `codeBlocks` / `tableRows` / `paragraphs` の件数 | **参考値のみ** | ブロッキング判定は件数そのものではなく、上記の正規化内容で行う |

> 生のタグ件数を判定に使わないのは意図的な設計である。`<li>` 件数でゲートすると
> 「原本 18 / ページ 0」のような正当なカード移植で常時 Red になる。コードブロックと表行は
> タグ件数ではなく、マークアップ非依存の正規化内容を照合する。

### 既知の正当な差分（不合格でも転写漏れではないケース）

| 症状 | 判断 |
|---|---|
| 原本の `h2: 目次` がページに無い | **正当**。ページはサイドバー TOC + `TocObserver` で代替する |
| 原本の `h2: <ページタイトル>` がページに無い | **正当**。スクリプトはページ側 `h1` も照合集合に含めるため通常は検出されない。検出された場合は h1 のテキストが原本と乖離している |
| `⚠️ 原本に存在しない page.vue の見出し` | **要確認**。多くは h1 の追加か見出しの言い換え。**言い換えは 100% 完全移植ルール違反**なので原本の文言へ戻す |
| 長大な `<li>`（コード例や複数段落を含む項目）が「見当たらない」と出る | **要確認**。リスト項目は先頭 40 文字で照合するため、ページ側で項目を「見出し + コードブロック」に分解すると先頭文言が繋がらず検出される。**内容が全て存在するかを人が確認して判断する**（分解自体は原本の構造を保っていれば許容される） |
| 原本 Markdown 側だけ大量に不一致 | Markdown が古い下書きの可能性。HTML 原本で再監査する |

**「正当な差分」と判断した場合は、その理由を Green コミットのメッセージ本文か
`docs/PROGRESS.md` に必ず書き残すこと。** 無言で見逃すと次回の監査でも同じ判断を繰り返す。

---

## 2. 契約テスト S-1 用の期待値を生成する

監査スクリプトは、テストに貼り付ける見出し配列を出力できる。

```bash
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  Certified-Associate-in-Project-Management.html \
  pages/capm.vue \
  --emit-headings
```

```ts
const EXPECTED_H2 = [
  "Managed Agents とは何か",
  "Messages API との違い",
  // ...
] as const;

const EXPECTED_H3 = [
  "ステップ 0: 前提条件を確認する",
  // ...
] as const;
```

これを `tests/pages/<slug>.test.ts` に貼り、**Red フェーズのテストとして先にコミットする**。
実装前なので当然失敗する。これが正しい Red である。

> **なぜテスト内で原本ファイルを直接読まないのか**
> テストが原本ファイルを実行時に読むと、原本を編集しただけでテストの期待値が
> 追随してしまい、**転写漏れを検知できなくなる**（テストが原本のコピーになる）。
> **期待値はスクリプトで機械生成して literal 配列としてテストに固定する**のが本プロジェクトの方針。

---

## 3. `tests/pages/<slug>.test.ts` に書く原本照合契約（S-1〜S-4）

```ts
// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Page from "~/pages/capm.vue";

// --emit-headings の出力をそのまま貼る（順序も原本どおり）
const EXPECTED_H2 = [/* ... */] as const;
const EXPECTED_H3 = [/* ... */] as const;

// 原本の「参考文献 / 外部リンク」セクションの URL を全件列挙する
const EXPECTED_EXTERNAL_LINKS = [
  "https://www.pmi.org/certifications/certified-associate-capm",
  // ...
] as const;

beforeAll(() => {
  // TOC のスクロール連動が IntersectionObserver を使う場合に必要
  global.IntersectionObserver = class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  } as unknown as typeof IntersectionObserver;
});

/** ClientOnly を素通しさせないと、その中の要素が 0 件になる */
const mountPage = () =>
  mount(Page, {
    global: { stubs: { ClientOnly: { template: "<div><slot /></div>" } } },
  });

/** 見出しの表示テキストを比較用に正規化する（空白のゆれのみ吸収する） */
function headingText(el: { text: () => string }): string {
  return el.text().replace(/\s+/g, " ").trim();
}

describe("/capm — 原本照合契約", () => {
  it("S-1: h2 の見出しが原本と完全一致する（順序込み）", () => {
    const actual = mountPage().findAll("h2").map(headingText);
    expect(actual).toEqual([...EXPECTED_H2]);
  });

  it("S-2: h3 の見出しが原本と完全一致する（順序込み）", () => {
    const actual = mountPage().findAll("h3").map(headingText);
    expect(actual).toEqual([...EXPECTED_H3]);
  });

  it("S-3: 原本の外部リンクがすべて存在する", () => {
    const hrefs = new Set(
      mountPage()
        .findAll('a[href^="http"]')
        .map((a) => (a.attributes("href") ?? "").replace(/\/+$/, ""))
    );
    for (const url of EXPECTED_EXTERNAL_LINKS) {
      expect(hrefs.has(url.replace(/\/+$/, ""))).toBe(true);
    }
  });

  it("S-4: 全 h2 / h3 が一意なアンカー id を持ち TOC から到達できる", () => {
    const wrapper = mountPage();
    const ids = wrapper.findAll("h2, h3").map((h) => h.attributes("id"));
    // 全見出しに id がある
    expect(ids.every((id) => Boolean(id))).toBe(true);
    // id が重複しない
    expect(new Set(ids).size).toBe(ids.length);
    // TOC のリンク先がすべて実在する見出しを指す
    const tocHrefs = wrapper
      .findAll('a[href^="#"]')
      .map((a) => (a.attributes("href") ?? "").slice(1));
    for (const href of tocHrefs) {
      expect(ids).toContain(href);
    }
  });
});
```

### `toEqual` で完全一致させる理由

`toHaveLength(15)` のような**件数だけの検証は転写漏れを検知できない**。
セクションを 1 つ落として別の 1 つを重複させれば件数は保たれる。
**配列の完全一致（順序込み）だけが「原本と同じものが同じ順で並んでいる」ことを保証する。**

同じ理由で、以下は契約テストとして**不十分**であり、単独では受け入れない:

```ts
// ❌ 弱すぎる — 何を落としても通ってしまう
expect(wrapper.findAll("h2")).toHaveLength(15);
expect(wrapper.findAll("pre, code").length).toBeGreaterThan(0);
```

---

## 4. 既存ページを保守するときの使い方

既存ページに加筆・修正した場合も、**変更後に必ず監査スクリプトを再実行する**。
「加筆したつもりが別のセクションを消していた」という事故を検出できる。

```bash
# 変更したページだけを監査する
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  <原本>.html \
  pages/<slug>.vue
```

原本そのものを更新した場合（月次更新で新情報を追記した等）は、
**原本 → page.vue の順に反映し、最後に監査を回して両者が揃っていることを確認する**。

---

## 5. 監査で漏れが出たときの手順

1. **修正を急がない**。まず漏れの全件リストを取得する（`--json` で機械可読出力）。
2. 漏れごとに「転写漏れ」か「正当な差分」かを分類する（§1 の表を使う）。
3. 転写漏れは**原本の文言のまま**転写する。要約・言い換えは規約違反。
4. 再度スクリプトを実行し、終了コード `0` を確認する。
5. `tests/pages/<slug>.test.ts` の `EXPECTED_H2` / `EXPECTED_H3` を `--emit-headings` で再生成して更新する。
6. `(bun run test)` を実行して Green を確認する。

```bash
# 機械可読出力（漏れ一覧を JSON で得る）
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  <原本>.html pages/<slug>.vue --json
```

---

## 関連

- `.claude/skills/nuxt-page-migration/SKILL.md` — 移行手順の本体（本監査は Step 1 / Step 3 に組み込まれている）
- `.claude/skills/nuxt-page-migration/references/design-contract-tests.md` — デザイン契約テスト（D-1〜D-4）
- `.claude/rules/tdd-mandatory-cycle.md` — Red / Green / Refactor / Docs のコミット分割と、本監査の必須化
