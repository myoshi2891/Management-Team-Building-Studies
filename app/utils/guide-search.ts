/*
 * サイト内検索の絞り込み仕様（単一の真実の源）。
 *
 * ハブページ方式ではガイドが 1 クリック遠くなる。その代償をこの検索が相殺するため、
 * 回遊の主導線は件数が増えるほどここへ移る。DOM に依存しない純関数として切り出し、
 * UI（app/components/SiteSearch.vue）は本関数の結果を描くだけに留める。
 *
 * 絞り込みは 2 段構成である。
 *   1. フレーズ段: クエリ全体を 1 つの文字列として照合する
 *   2. AND 段: 空白で分割した語がすべて含まれるものを照合する（語順に依存しない）
 * フレーズ段に 1 件でも当たれば、そこで打ち切って AND 段へ落とさない。
 * 「CAPM ド」で AND 段まで落とすと、navLabel に "CAPM" と "ガイド" を含む
 * 「CAPM 完全ガイド」まで並び、意図した絞り込み（ドメイン群）にならないため。
 */
import {
  GUIDES,
  programNavLabel,
  seriesNavLabel,
  type Guide,
} from "~/utils/guide-catalog";

/**
 * 候補リストの表示上限。
 * 一致件数が多いクエリ（「ガイド」など）で候補が画面を覆わないための打ち切り。
 */
export const SEARCH_RESULT_LIMIT = 12;

/** 検索結果 1 件。どの体系のガイドかを添えて、近い名前の資格を選び分けられるようにする。 */
export type SearchHit = {
  readonly guide: Guide;
  /** 所属プログラムの日本語表記（例: PMI 認定） */
  readonly programLabel: string;
  /** 所属シリーズの日本語表記（例: CAPM） */
  readonly seriesLabel: string;
};

/**
 * 照合用に正規化する。
 * NFKC で全角英数を半角へ畳み（資格の英字略称が全角で打たれる場面が実際にある）、
 * 小文字化で大文字小文字の違いを吸収する。
 */
function normalize(value: string): string {
  return value.normalize("NFKC").toLowerCase();
}

/** 1 ガイドぶんの照合対象をあらかじめ正規化して束ねたもの。 */
type SearchEntry = {
  readonly guide: Guide;
  readonly programLabel: string;
  readonly seriesLabel: string;
  /** navLabel（最優先の照合先） */
  readonly navText: string;
  /** navLabel + title */
  readonly titleText: string;
  /** 上記に description / プログラム名 / シリーズ名 / ルートを足した全体 */
  readonly fullText: string;
};

/*
 * カタログは静的な TS モジュールなので、正規化済みの索引はモジュール初期化時に一度作れば足りる。
 * 検索のたびに 59 件ぶんの normalize を回す必要はない（入力 1 文字ごとに呼ばれる経路のため）。
 */
const ENTRIES: readonly SearchEntry[] = GUIDES.map((guide) => {
  const programLabel = programNavLabel(guide.programId);
  const seriesLabel = seriesNavLabel(guide.seriesId);
  const navText = normalize(guide.navLabel);
  const titleText = `${navText} ${normalize(guide.title)}`;
  const fullText = [
    titleText,
    normalize(guide.description),
    normalize(programLabel),
    normalize(seriesLabel),
    normalize(guide.to),
  ].join(" ");

  return { guide, programLabel, seriesLabel, navText, titleText, fullText };
});

/** 一致しなかったことを表す順位。 */
const NO_MATCH = Number.POSITIVE_INFINITY;

/**
 * 一致の強さを順位（小さいほど上位）で返す。
 * navLabel の前方一致 > navLabel の部分一致 > title の部分一致 > その他の順。
 * @param entry - 照合対象
 * @param terms - すべて含まれている必要のある語
 */
function rank(entry: SearchEntry, terms: readonly string[]): number {
  if (!terms.every((term) => entry.fullText.includes(term))) {
    return NO_MATCH;
  }
  if (!terms.every((term) => entry.navText.includes(term))) {
    return terms.every((term) => entry.titleText.includes(term)) ? 2 : 3;
  }
  // 先頭語が navLabel の頭から始まるものを最上位に置く（打鍵の途中で目的のガイドが最短で出る）。
  return entry.navText.startsWith(terms[0] ?? "") ? 0 : 1;
}

/**
 * 与えた語すべてを含むガイドを、一致の強さ順に集める。
 * 順位が同じものはカタログの定義順（種別 → プログラム → シリーズ → 定義順）を保つ。
 */
function collect(terms: readonly string[]): SearchHit[] {
  return ENTRIES
    .map((entry) => ({ entry, order: rank(entry, terms) }))
    .filter((scored) => scored.order !== NO_MATCH)
    // Array.prototype.sort は安定なので、同順位はカタログの定義順のまま残る。
    .sort((a, b) => a.order - b.order)
    .map(({ entry }) => ({
      guide: entry.guide,
      programLabel: entry.programLabel,
      seriesLabel: entry.seriesLabel,
    }));
}

/**
 * カタログ全体からガイドを絞り込む。
 *
 * 空クエリでは空配列を返す（開いた瞬間に全件が並ぶと、検索ではなく単なる一覧になり選べない）。
 * @param query - 利用者の入力
 * @returns 一致の強い順の候補。最大 {@link SEARCH_RESULT_LIMIT} 件
 */
export function searchGuides(query: string): SearchHit[] {
  const phrase = normalize(query).trim();
  if (phrase === "") {
    return [];
  }

  const phraseHits = collect([phrase]);
  if (phraseHits.length > 0) {
    return phraseHits.slice(0, SEARCH_RESULT_LIMIT);
  }

  const terms = phrase.split(/\s+/u).filter((term) => term !== "");
  return collect(terms).slice(0, SEARCH_RESULT_LIMIT);
}
