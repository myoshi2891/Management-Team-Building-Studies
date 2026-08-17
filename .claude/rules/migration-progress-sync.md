---
paths:
  - "app/pages/**/*.vue"
  - "app/components/**/*.vue"
  - "app/assets/css/**/*.css"
  - "docs/PROGRESS.md"
---

# docs/PROGRESS.md セッション終了前同期ルール

(最終更新日: 2026-08-17)

HTML → Nuxt.js（Vue）移行セッションでは、**コンテキストが逼迫する前に**必ず以下を実施してセッションを終えること。

## 実行タイミング

**AI エージェントへの厳格な指示**（エージェント種別を問わず適用）:
このプロトコルは提案ではなく絶対的な**ゲート条件（Gate Condition）**である。
ユーザーへ作業完了を報告する前に、以下の手続き（コード変更のコミット → 進捗ファイルの更新 →
進捗ファイルのコミット）を**ユーザーの許可を待たずに自律的に、必ずステップバイステップで**実行すること。
ステップバイステップのコミット分割ルールを無視して一括コミットを行ったり、
コミットせずにユーザーに判断を委ねたりすることは重大な規約違反である。

### 自律コミット前の対象範囲検証（必須・スキップ禁止）

本プロトコルは**ユーザーの許可を待たずにコミットする**ため、意図しないファイルを巻き込む危険がある。
「編集した覚えがあるか」という記憶に頼った判断は、**同一パスにセッション開始前から staged されていた
他者・別セッションの変更**を素通しする（自分もそのファイルを触っているため、名前だけでは区別できない）。
そこで、セッション開始時点の index を基準として機械的に差し引く。

**セッション開始時（最初の `git add` より前）に必ず実行する。**

本スニペットは **fail-closed**（判定できなければ停止）である。`git` の失敗・行数の取得失敗を
「問題なし」と読み替えてはならない。非 0 で終了した時点で作業を開始せず、ユーザーへ報告する。

```bash
# 保存先は必ず git rev-parse --git-dir で解決する。
# linked worktree ではリポジトリ直下の .git が「ディレクトリ」ではなく
# gitdir ポインタの「ファイル」になるため、.git/ 直書きはリダイレクトに失敗する。
GIT_DIR_PATH="$(git rev-parse --git-dir)" || { echo "NG: git-dir を解決できない"; exit 1; }

git diff --cached --name-only > "$GIT_DIR_PATH/session-baseline-staged.txt" \
  || { echo "NG: ベースライン(name-only)の作成に失敗"; exit 1; }
git diff --cached > "$GIT_DIR_PATH/session-baseline-staged.diff" \
  || { echo "NG: ベースライン(diff)の作成に失敗"; exit 1; }

# 本セッションのベースラインであることを後から検証するための ID を発行して保存する。
# ID が無い／食い違う場合、別セッションが残した古いベースラインを使い回している。
SESSION_ID="$(date -u +%Y%m%dT%H%M%SZ)-$$"
printf '%s\n' "$SESSION_ID" > "$GIT_DIR_PATH/session-baseline-id.txt" \
  || { echo "NG: セッション ID の保存に失敗"; exit 1; }

# 行数は「数値であること」を検証してから比較する（空文字や wc の失敗を 0 と誤読しない）。
# wc と tr をパイプで繋ぐと `||` が tr の終了コードしか見ないため、必ず 2 段に分ける。
BASELINE_LINES="$(wc -l < "$GIT_DIR_PATH/session-baseline-staged.txt")" \
  || { echo "NG: 行数の取得に失敗"; exit 1; }
BASELINE_LINES="$(printf '%s' "$BASELINE_LINES" | tr -d '[:space:]')"
case "$BASELINE_LINES" in
  ''|*[!0-9]*) echo "NG: 行数が数値として取得できない: '$BASELINE_LINES'"; exit 1 ;;
esac

[ "$BASELINE_LINES" -eq 0 ] \
  || { echo "NG: 開始時点で $BASELINE_LINES 件が staged 済み"; exit 1; }
echo "OK: index は空（ベースライン確立）"

# index が空でも、本セッションで触る予定のパスに「開始前からの未 staged 変更」が
# 残っていると、後で `git add <path>` した時点で他者・別セッションの編集を
# そのまま自分のコミットへ巻き込む。上の検査は staged しか見ないためこの経路を
# 捕まえられない。よって候補パスごとに作業ツリー側も明示的に確認する。
# 予定が確定していない段階でも docs/PROGRESS.md は必ず含める（本ルールが必ず触るため）。
CANDIDATE_PATHS="docs/PROGRESS.md"   # 例: "docs/PROGRESS.md app/pages/<移行対象>.vue"

for path in $CANDIDATE_PATHS; do
  if git diff --quiet -- "$path"; then
    continue
  else
    DIFF_STATUS=$?
    case "$DIFF_STATUS" in
      1) echo "NG: 開始時点で未 staged の変更が残っている: $path"; exit 1 ;;
      *) echo "NG: git diff が失敗（exit=$DIFF_STATUS, path=$path）。判定不能"; exit 1 ;;
    esac
  fi
done
echo "OK: 候補パスに開始前からの未 staged 変更なし"

echo "SESSION_ID=$SESSION_ID"   # ← この値を控える。コミット直前の検証で必要になる
```

`SESSION_ID` は**シェルの実行単位をまたいで引き継がれない**（1 回の実行ごとに新しいシェルが起動する）。
出力された値を控え、コミット直前の検証で `SESSION_ID=<控えた値>` として明示的に与えること。

非 0 で終了した場合は、その時点で**作業開始前から staged の変更が存在する**か、
**判定自体に失敗している**。いずれも先へ進まず、ユーザーへ該当ファイル・エラー内容を報告して指示を仰ぐ。

**`git commit` の直前に実行する。**

こちらも fail-closed。判定の基準は **「staged なパス集合 ⊆ 本コミットで意図した許可パス集合」**
であり、開始時ベースライン（＝空であることが保証されている）との行差分ではない。
空ファイルとの `diff` から `^<` 行を探す判定は**構造的に 1 行も出ない**ため、
常に「混入なし」を返す空回りになる。同じ形の検査を復活させてはならない。

`git diff` の終了コードは **1（差分あり）と 2 以上（比較そのものの失敗）を必ず分離**し、
`grep` の終了コード 2 以上（読み取り失敗）を「混入なし」と読み替えてはならない。

`SESSION_ID` には、開始時の手順が出力した値をそのまま与える。ファイルの存在確認だけでは
**前のセッションが残したベースラインを流用**しても素通りしてしまうため、必ず ID を照合する。

```bash
SESSION_ID="<開始時に控えた値>"
[ -n "$SESSION_ID" ] || { echo "NG: SESSION_ID が未設定（開始時の手順を飛ばしている）"; exit 1; }

GIT_DIR_PATH="$(git rev-parse --git-dir)" || { echo "NG: git-dir を解決できない"; exit 1; }
BASELINE="$GIT_DIR_PATH/session-baseline-staged.diff"
[ -f "$BASELINE" ] || { echo "NG: ベースラインが無い（開始時の手順を飛ばしている）"; exit 1; }

ID_FILE="$GIT_DIR_PATH/session-baseline-id.txt"
[ -f "$ID_FILE" ] || { echo "NG: ベースライン ID が無い（開始時の手順を飛ばしている）"; exit 1; }
STORED_ID="$(cat "$ID_FILE")" || { echo "NG: ベースライン ID を読めない"; exit 1; }
STORED_ID="$(printf '%s' "$STORED_ID" | tr -d '[:space:]')"
[ "$STORED_ID" = "$SESSION_ID" ] \
  || { echo "NG: ベースラインが本セッションのものではない（stored=$STORED_ID）"; exit 1; }

# 確認表示の 2 コマンドも fail-closed にする。取得に失敗したまま write-tree /
# commit へ進むと、「確認したつもり」の空出力を根拠に先へ進んでしまう。
git status --short \
  || { echo "NG: git status に失敗。判定不能"; exit 1; }            # 作業ツリー全体の変更
git diff --cached --name-only \
  || { echo "NG: git diff --cached に失敗。判定不能"; exit 1; }     # 実際にコミットされるファイル

# 本コミットで意図しているパスを明示列挙する（`git add` に渡したものと一字一句同じにする）。
# ここが判定の基準であり、「空のベースラインとの差分」ではない。
ALLOWED_PATHS="docs/PROGRESS.md"

# (1) 開始時のベースラインが空だったことを機械的に再確認する。
#     空でなければ開始手順が破られており、以降の包含判定に意味が無い。
BASELINE_LINES="$(wc -l < "$GIT_DIR_PATH/session-baseline-staged.txt")" \
  || { echo "NG: ベースライン行数の取得に失敗"; exit 1; }
BASELINE_LINES="$(printf '%s' "$BASELINE_LINES" | tr -d '[:space:]')"
case "$BASELINE_LINES" in
  ''|*[!0-9]*) echo "NG: ベースライン行数が数値でない: '$BASELINE_LINES'"; exit 1 ;;
esac
[ "$BASELINE_LINES" -eq 0 ] \
  || { echo "NG: 開始時点で $BASELINE_LINES 件が staged 済み。判定不能"; exit 1; }

# (2) コミット対象を tree オブジェクトとして凍結する。
#     以降の検証はすべてこの $TREE に対して行い、コミットも $TREE から作る。
#     tree を作った後は index も作業ツリーも読まないため、検証とコミットの間に
#     別プロセスが `git add` / ファイル編集をしても、コミットされる内容は変わらない。
#
#     共有 index（.git/index）から `git write-tree` してはならない。共有 index は
#     別セッションも `git add` する先であり、許可パスと同じファイル（例:
#     docs/PROGRESS.md）を他セッションが staged していた場合、パス名では
#     所有者を区別できないため (3) の包含判定を素通りして混入する。
#     そこで本セッション専用の一時 index を用意し、HEAD を種にして
#     許可パスだけを作業ツリーから読み込む。tree の内容は
#     「HEAD + 許可パスの現在の作業ツリー内容」だけで構成され、共有 index の状態から独立する。
OLD_HEAD="$(git rev-parse HEAD)" || { echo "NG: HEAD を解決できない"; exit 1; }

# GIT_INDEX_FILE の相対パスは cwd 基準で解決されるため、必ず絶対パスで与える
# （--absolute-git-dir を使う。リテラルの絶対パスをファイルへ書かないこと）。
ABS_GIT_DIR="$(git rev-parse --absolute-git-dir)" \
  || { echo "NG: git-dir を絶対パスで解決できない"; exit 1; }

# 一時 index の名前も**セッションごとに一意**にする。固定名（session-commit-index）は
# 共有 index と同じ問題を持ち込む: 別セッションが同時に (2) を実行していると、
# 同じファイルへ read-tree / add してしまい、さらに初期化の `rm -f` が
# 相手の使用中 index を消す。mktemp で排他的に確保して衝突をなくす。
# 後続の fail-closed な exit でも取り残さないよう、片付けは trap に寄せる。
# 削除対象は本セッションの $TMP_INDEX だけで、他セッションの一時 index には触れない。
# trap は mktemp より前に張る。生成直後にシグナルを受けても取りこぼさないよう、
# 変数を空で初期化しておき、ハンドラ側で未生成を判定する。
TMP_INDEX=""
cleanup_tmp_index() {
  if [ -n "$TMP_INDEX" ]; then rm -f "$TMP_INDEX"; fi
}
trap 'cleanup_tmp_index' EXIT
# INT / TERM は「片付け」だけでなく**終了**まで行う。ハンドラ内で exit しないと、
# シグナル処理後に中断地点から実行が再開され、index を消した状態のまま
# 後続の git write-tree / git commit-tree が走ってしまう（fail-open になる）。
trap 'cleanup_tmp_index; exit 130' INT
trap 'cleanup_tmp_index; exit 143' TERM

TMP_INDEX="$(mktemp "$ABS_GIT_DIR/session-commit-index.XXXXXX")" \
  || { echo "NG: 一時 index を作成できない"; exit 1; }
# mktemp が作った空ファイルは index として読めないため、名前だけ予約して実体は git に作らせる。
rm -f "$TMP_INDEX" || { echo "NG: 一時 index を初期化できない"; exit 1; }
export GIT_INDEX_FILE="$TMP_INDEX"

git read-tree "$OLD_HEAD" || { echo "NG: 一時 index へ HEAD を読み込めない"; exit 1; }
# ここでの `git add` は一時 index にのみ書き込む（共有 index は変更されない）。
git add -- $ALLOWED_PATHS || { echo "NG: 許可パスを一時 index へ追加できない"; exit 1; }
TREE="$(git write-tree)" || { echo "NG: 一時 index から tree を作成できない"; exit 1; }

# (3) 凍結した tree が HEAD から変更するパス集合 ⊆ 許可パス集合 を検証する。
#     diff-tree は追加・変更・削除をすべてパスとして列挙するため、
#     削除だけの巻き込みもこの判定で捕まる。
ALLOWED_FILE="$GIT_DIR_PATH/session-allowed-paths.txt"
: > "$ALLOWED_FILE" || { echo "NG: 許可リストを作成できない"; exit 1; }
for path in $ALLOWED_PATHS; do
  printf '%s\n' "$path" >> "$ALLOWED_FILE" || { echo "NG: 許可リストを書けない"; exit 1; }
done

STAGED="$GIT_DIR_PATH/session-staged-now.txt"
git diff-tree -r --name-only --no-commit-id "$OLD_HEAD" "$TREE" > "$STAGED" \
  || { echo "NG: コミット対象の一覧を取得できない"; exit 1; }

UNEXPECTED=0
while IFS= read -r path; do
  [ -n "$path" ] || continue
  if grep -qxF -- "$path" "$ALLOWED_FILE"; then continue; fi
  echo "NG: 許可リストに無いコミット対象: $path"
  UNEXPECTED=$((UNEXPECTED + 1))
done < "$STAGED"
[ "$UNEXPECTED" -eq 0 ] || { echo "NG: 意図しないファイルを巻き込んでいる"; exit 1; }

# (4) 許可パスの作業ツリー内容が $TREE に取り込まれていることを確認する。
#     $TREE は (2) で作業ツリーから直接読んだため一致するのが正常だが、
#     一致しない場合は $TREE の作り方が壊れている（＝検証の前提が崩れている）。
if git diff --quiet -- $ALLOWED_PATHS; then
  echo "OK: 許可パスは一時 index と作業ツリーが一致"
else
  DIFF_STATUS=$?
  case "$DIFF_STATUS" in
    1) echo "NG: 許可パスが一時 index に反映されていない。(2) からやり直す"; exit 1 ;;
    *) echo "NG: git diff が失敗（exit=$DIFF_STATUS）。判定不能"; exit 1 ;;
  esac
fi

# 空コミットは記録として無意味なので止める（許可パスに実変更が無い状態）。
[ -s "$STAGED" ] || { echo "NG: HEAD からの変更が無い。コミットする内容が無い"; exit 1; }
echo "OK: コミット対象は全て許可リスト内"

# (5) 検証済みの $TREE からコミットを作り、HEAD を条件付きで進める。
#     `git commit` は呼ばない（index も作業ツリーも読み直さない）。
#     update-ref の第3引数に $OLD_HEAD を渡すことで、検証後に HEAD が
#     動いていた場合はコミットが失敗し、他者のコミットを踏み潰さない。
COMMIT_MSG="chore(docs): update docs/PROGRESS.md — <作業内容の1行要約>"
NEW_COMMIT="$(git commit-tree "$TREE" -p "$OLD_HEAD" -m "$COMMIT_MSG")" \
  || { echo "NG: コミットオブジェクトを作成できない"; exit 1; }
git update-ref -m "commit: $COMMIT_MSG" HEAD "$NEW_COMMIT" "$OLD_HEAD" \
  || { echo "NG: HEAD の条件付き更新に失敗（検証後に HEAD が動いた）。中止する"; exit 1; }

# 一時 index を片付け、以降のコマンドが共有 index を見るように戻す。
# 削除の成否を確認してから trap を外す。先に trap を外すと、削除に失敗した場合に
# 一時 index を残したまま正常終了してしまい、次回の mktemp 以前に後始末の経路が消える。
rm -f "$TMP_INDEX" || { echo "NG: 一時 index を削除できない"; exit 1; }
trap - EXIT INT TERM
unset GIT_INDEX_FILE
echo "OK: コミット完了 $(git rev-parse --short HEAD)"
```

> [!IMPORTANT]
> 作業ツリー自体は共有されるため、本手順が保証できる粒度は**ファイル単位**である。
> 許可パスと同一のファイルを別セッションが同時に編集していた場合、その内容は
> 作業ツリー経由で $TREE に入る（誰の編集かを Git は区別できない）。
> 完全な分離が必要な場合は `git worktree add` で専用の作業ツリーを切ってから本手順を実行する。

`git commit -- <pathspec>` は **index ではなく作業ツリー**を読むため、検証済みの内容が
コミットされる保証が無い（検証と `git commit` の間の編集をそのまま取り込む）。
上記 (5) のように **`git write-tree` で凍結した tree から `git commit-tree` でコミットを作り、
`git update-ref` の期待値付き更新で HEAD を進める**こと。pathspec 付き `git commit` は使わない。

以下のいずれかに該当する場合は、**コミットせずに停止し、ユーザーへ状況を報告して指示を仰ぐ**。

- 開始時のベースラインが空でなかった（`$GIT_DIR_PATH/session-baseline-staged.txt` が 1 行以上）
- 開始時の `CANDIDATE_PATHS` 検査が未 staged の変更を検出した（`git add` で巻き込む恐れがある）
- 上記 (3) が `許可リストに無いコミット対象` を出力した（意図しない巻き込み）
- 上記 (4) が一時 index と作業ツリーの不一致、または「変更が無い」を検出した
- 上記 (5) の `git update-ref` が失敗した（検証後に HEAD が動いた）
- `git diff --cached --name-only` に、本セッションで自分が編集していないファイルが含まれる
- `git status --short` に、本作業と無関係な未コミット変更が残っており、
  `git add` の指定次第で巻き込む恐れがある

ベースラインファイルは Git ディレクトリ（`git rev-parse --git-dir` の解決先）配下に置くため
コミット対象にならない。

`git add` は `git add -A` / `git add .` を使わず、**対象ファイルを明示列挙する**こと
（例: `git add docs/PROGRESS.md`）。無関係な変更を独断で `git checkout` / `git stash` /
`git reset` で退避・破棄してはならない。

本ファイル中の `bun run <script>` は、`bun` が使えない環境では `npm run <script>` に読み替える
（`package.json` の同じ scripts を実行する）。`bunx nuxi typecheck` は **`npm run typecheck`**
に読み替える（ローカル依存の `node_modules/.bin/nuxi` を実行する）。
**`npx nuxi` は使わない** — バージョン未固定でレジストリから任意の版を取得するため。
ローカルに nuxi が無ければ `npm run typecheck` が非 0 で止まるので、その場で停止して依存を入れ直す。

### 必須（毎ページ・例外なし）

**1ページの `git commit` 完了直後、次の HTML を読み始める前に即実施する。**

これは任意の「区切り」ではなく、次ページ読み込みのための**ゲート条件**。
`docs/PROGRESS.md` が未コミットの状態で次の HTML を読み始めることは禁止。

> [!NOTE]
> `docs/PROGRESS.md` は作成済みで、本ルールは発効している。

### 追加トリガー

- コンテキスト消費が大きくなってきた
- ユーザーが新セッション開始を示唆
- ユーザーが「セッション終了」「仕様書更新して」と言った

## 手順

### 1. ビルド確認

```bash
bun run test           # 契約テストが Green
bun run build          # ビルド成功を確認
bunx nuxi typecheck    # 型エラーなし
bun run test:e2e       # 静的生成 + Playwright スモーク（ページ改修時）
git rev-parse --short HEAD
```

### 2. `docs/PROGRESS.md` を更新

`現在地` テーブルの更新対象フィールド:

| フィールド | 更新内容 |
|---|---|
| `コードコミット HEAD` | `git rev-parse --short HEAD` の実値 + コミットメッセージ要約。**手順 4 の進捗ファイルコミットより前**の、コード側コミットのハッシュを記録する（進捗ファイル自身のコミットハッシュは本フィールドには入らない） |
| `次の作業` | 次セッションで **最初に** 取り掛かるページ（例: `Certified-Associate-in-Project-Management.html §6 ドメイン1 の移行`） |
| `ビルド状態` | `bun run test` / `bun run build` / `bunx nuxi typecheck` / `bun run test:e2e` の最新状態 |
| `テスト数` | `bun run test` の実測値（`tdd-mandatory-cycle.md` のベースライン） |

### 3. `## 次回セッションでの再開プロンプト` を同期

`現在地` の値と一致するように再開プロンプト内の以下を書き換える:

- `コードコミット HEAD: <hash>` の値（`現在地` テーブルと同一のハッシュ＝コード側コミット）
- `次の作業:` の説明（ページ粒度で具体的に）
- 未移行セクション（または未移行 HTML）の残数

### 4. コミット

```bash
# ALLOWED_PATHS="docs/PROGRESS.md" として「自律コミット前の対象範囲検証」の (1)〜(5) を実行する。
# ステージングは (2) が専用の一時 index に対して行うため、共有 index への
# `git add` は不要（行ってはならない。他セッションの index を汚す）。
# コミットは同スニペットの (5)（commit-tree → update-ref）で完結する。
# ここで `git commit` を直接呼んではならない（検証済みの内容が保証されない）。
```

## 禁止

- HEAD 値をコミットせず新セッションに引き継ぐ（ズレが発生する）
- 再開プロンプトと `現在地` が食い違ったままコミットする
- ビルドエラーが残ったままコミットする
