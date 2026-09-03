#!/usr/bin/env node
/**
 * 原本（リポジトリ直下の *.html または *.md）と移植先 Vue SFC（pages/*.vue）の
 * 要素インベントリを機械照合し、転写漏れを検出する監査スクリプト。
 *
 * 依存パッケージなし。node / bun どちらでも動く（ESM）。
 * 移植先は .vue が本命。旧 Next.js 資産の照合用に .tsx も受け付ける。
 *
 * 使い方:
 *   node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
 *     Certified-Associate-in-Project-Management.md \
 *     pages/capm.vue
 *
 *   # 契約テストへ貼り付ける見出し配列を生成する
 *   ... --emit-headings
 *
 *   # CI / スクリプトから使う
 *   ... --json
 *
 * 終了コード:
 *   0 = 漏れなし（Green 判定に進んでよい）
 *   1 = 漏れあり（見出し・SVG・callout/alert・本文要素のいずれかが不足または改変）
 *   2 = 引数エラー / ファイル未検出
 */

import { readFileSync } from "node:fs";
import { MERMAID_DIAGRAM_DECLARATION } from "../../fix-mermaid/scripts/mermaid-diagram-types.mjs";

// --------------------------------------------------------------------------
// テキスト正規化
// --------------------------------------------------------------------------

/**
 * Normalize text for comparison across source and JSX content.
 * @param {string} raw - The text to normalize.
 * @returns {string} The normalized comparison key.
 */
function normalize(raw) {
  return raw
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .replace(/[`*_~]/g, "")
    .trim();
}

/**
 * Creates a comparison key that ignores whitespace, leading numbering, punctuation, and letter case.
 * @param {string} raw - The display text to normalize for comparison.
 * @returns {string} The normalized comparison key.
 */
function matchKey(raw) {
  return (
    normalize(raw)
      // ① 先に空白を全除去する。「4 つの」と「4つの」を同一視するため、
      //    採番除去より前に行わないと数字の扱いが原本側とページ側で食い違う。
      .replace(/\s+/g, "")
      // ② 区切り記号を伴う先頭の採番だけを落とす（"3." / "2)" / "1：" ）。
      //    区切りのない "4つのコアコンセプト" の先頭数字は本文の一部なので残す。
      .replace(/^\d+(?:[.–-]\d+)*[.)：:]/, "")
      // ③ 句読点・括弧・記号の表記ゆれを吸収する。
      .replace(/[.,、。：:；;！!？?"'“”‘’（）()［］[\]{}／/\\|・･–—-]/g, "")
      .toLowerCase()
  );
}

/**
 * Decodes common HTML character references in a string.
 * @param {string} raw - The string containing HTML character references.
 * @returns {string} The decoded string.
 */
function decodeEntities(raw) {
  return raw
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&rarr;/g, "→")
    .replace(/&amp;/g, "&");
}

/**
 * Extracts display text from an HTML or JSX fragment.
 * @param {string} fragment - The markup fragment containing tags or JSX expressions.
 * @returns {string} The decoded display text with tags and expressions removed.
 */
function stripMarkup(fragment) {
  return decodeEntities(
    fragment
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/\{\s*"([^"]*)"\s*\}/g, "$1")
      .replace(/\{\s*'([^']*)'\s*\}/g, "$1")
      .replace(/\{[^{}]*\}/g, "")
      .replace(/<[^>]*>/g, "")
  );
}

/** Finds the closing bracket of a markup tag while ignoring attribute expressions. */
function findMarkupTagEnd(markup, tagStart) {
  let quote = "";
  let braceDepth = 0;
  let escaped = false;
  for (let index = tagStart + 1; index < markup.length; index += 1) {
    const character = markup[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
    } else if (character === "{") {
      braceDepth += 1;
    } else if (character === "}") {
      braceDepth = Math.max(0, braceDepth - 1);
    } else if (character === ">" && braceDepth === 0) {
      return index;
    }
  }
  return -1;
}

/** Collects normalized rendered text-node keys from a markup fragment. */
function collectTextNodeKeys(markup) {
  const keys = [];
  const renderedMarkup = markup.replace(/<!--[\s\S]*?-->/g, "");
  const tagRe = /<(?:\/?[A-Za-z][\w.:-]*\b|\/?>)/g;
  let depth = 0;
  let tag = tagRe.exec(renderedMarkup);
  while (tag !== null) {
    const tagEnd = findMarkupTagEnd(renderedMarkup, tag.index);
    if (tagEnd === -1) break;
    const tagText = renderedMarkup.slice(tag.index, tagEnd + 1);
    const isClosing = tagText.startsWith("</");
    const isSelfClosing = /\/\s*>$/.test(tagText);
    if (isClosing) depth = Math.max(0, depth - 1);
    else if (!isSelfClosing) depth += 1;

    if (depth > 0) {
      const nextTag = renderedMarkup.indexOf("<", tagEnd + 1);
      const textEnd = nextTag === -1 ? renderedMarkup.length : nextTag;
      const key = matchKey(stripMarkup(renderedMarkup.slice(tagEnd + 1, textEnd)));
      if (key) keys.push(key);
    }

    tagRe.lastIndex = tagEnd + 1;
    tag = tagRe.exec(renderedMarkup);
  }
  return keys;
}

/**
 * Extracts JSX roots returned by functions so declarations, comparisons, and
 * other non-rendered TypeScript cannot contribute text-node matches.
 * @param {string} src - Complete TSX source.
 * @returns {string} Returned JSX roots concatenated in source order.
 */
function collectTsxReturnMarkup(src) {
  const roots = [];
  const returnRe = /\breturn\s*(?:\(\s*)?(?=<)/g;
  let returned = returnRe.exec(src);
  while (returned !== null) {
    const rootStart = returnRe.lastIndex;
    const tagRe = /<(?:\/?[A-Za-z][\w.:-]*\b|\/?>)/g;
    tagRe.lastIndex = rootStart;
    let depth = 0;
    let started = false;
    let tag = tagRe.exec(src);
    while (tag !== null) {
      const tagEnd = findMarkupTagEnd(src, tag.index);
      if (tagEnd === -1) break;
      const tagText = src.slice(tag.index, tagEnd + 1);
      const isClosing = tagText.startsWith("</");
      const isSelfClosing = /\/\s*>$/.test(tagText);
      if (isClosing) depth = Math.max(0, depth - 1);
      else if (!isSelfClosing) depth += 1;
      started = true;
      if (started && depth === 0) {
        roots.push(src.slice(rootStart, tagEnd + 1));
        returnRe.lastIndex = tagEnd + 1;
        break;
      }
      tagRe.lastIndex = tagEnd + 1;
      tag = tagRe.exec(src);
    }
    returned = returnRe.exec(src);
  }
  return roots.join("\n");
}

/**
 * Removes Markdown links, images, and HTML tags from an inline fragment.
 * @param {string} raw - The raw Markdown inline fragment.
 * @returns {string} The fragment with links, images, and HTML tags removed.
 */
function stripMarkdownInline(raw) {
  return raw
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "");
}

/**
 * Normalize code block or table row content for markup-independent comparison.
 * @param {string} raw - Element content that may contain HTML or JSX markup.
 * @returns {string} Text with markup and JSX whitespace expressions removed.
 */
function normalizeElementContent(raw) {
  return normalize(stripMarkup(raw));
}

/**
 * Creates a normalized comparison signature for an SVG fragment.
 * @param {string} raw - The raw SVG markup to normalize.
 * @returns {string} A JSON-encoded signature containing normalized tags, attributes, and text.
 */
function normalizeSvgElement(raw) {
  const tags = [];
  const tagRe = /<([A-Za-z][\w:.-]*)\b([^>]*)\/?\s*>/g;
  let tag = tagRe.exec(raw);
  while (tag !== null) {
    const attributes = [];
    const attributeRe =
      /([:@A-Za-z_][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*(?:"([^"]*)"|'([^']*)'|([^{}]+))\s*\})/g;
    let attribute = attributeRe.exec(tag[2]);
    while (attribute !== null) {
      const name = attribute[1].replace(/-/g, "").toLowerCase();
      if (name !== "class" && name !== "classname") {
        attributes.push([
          name,
          normalize(decodeEntities(attribute[2] ?? attribute[3] ?? attribute[4] ?? attribute[5] ?? attribute[6] ?? "")),
        ]);
      }
      attribute = attributeRe.exec(tag[2]);
    }
    attributes.sort(([left], [right]) => left.localeCompare(right));
    tags.push([tag[1].toLowerCase(), attributes]);
    tag = tagRe.exec(raw);
  }
  return JSON.stringify({ tags, text: normalize(stripMarkup(raw)) });
}

/**
 * Creates a markup-independent comparison key for a callout or alert element.
 * @param {string} openingTag - The element's opening tag, including its type markers.
 * @param {string} content - The element's body content.
 * @returns {string} A normalized key containing the callout types and content.
 */
function normalizeCalloutElement(openingTag, content) {
  const markers = new Set();
  const markerSource = `${openingTag} ${openingTag.match(/styles\.([\w-]+)/g)?.join(" ") ?? ""}`;
  // マーカー名は前後を語境界で挟む。境界を省くと `alertBanner` から `alert` を、
  // `calloutExtra` から `callout` を拾い、検出側（collectMarkupCalloutElements）の
  // 境界規則と食い違って原本・移植先で別のマーカー集合になる。
  for (const marker of markerSource.matchAll(
    /(?<![\w-])(?:callout|alert|warning|warn|note|info|tip|success|good)(?![\w-])/gi
  )) {
    const value = marker[0].toLowerCase();
    markers.add(value === "warning" ? "warn" : value === "note" ? "info" : value);
  }
  return `${[...markers].sort().join("|")}::${matchKey(stripMarkup(content))}`;
}

/**
 * Extracts and normalizes SVG elements from source text.
 * @param {string} src - The source text to inspect.
 * @return {string[]} The normalized SVG elements found in the source text.
 */
function collectSvgElements(src) {
  return (src.match(/<svg\b[\s\S]*?<\/svg>/gi) ?? []).map(normalizeSvgElement);
}

/**
 * Collects callout and alert elements from markup source.
 * @param {string} src - The markup source to inspect.
 * @returns {Array} The normalized callout and alert elements found in the source.
 */
function collectMarkupCalloutElements(src) {
  return extractElementContents(src, (openingTag) =>
    /<(?:Callout|Alert)\b|(?:class|className)\s*=\s*(?:["'][^"']*(?<![\w-])(?:callout|alert)(?![\w-])|\{[^}]*(?<![\w$.])styles\.(?:callout|alert)(?![\w-]))|data-(?:testid|variant)\s*=\s*["'](?:callout|alert|warn|warning|info|note|good|success|tip)(?![\w-])/i.test(
      openingTag
    )
  ).map(({ openingTag, content }) => normalizeCalloutElement(openingTag, content));
}

/**
 * Extract supported Markdown callouts and classify them by variant.
 * @param {string} src - Markdown source containing callout blocks.
 * @return {string[]} Callout keys in the form `warn::key`, `info::key`, or `tip::key`, based on the callout type and normalized body.
 */
function collectMarkdownCalloutElements(src) {
  const callouts = [];
  const lines = src.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const marker = /^\s*>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i.exec(lines[index]);
    if (!marker) continue;
    const body = [];
    while (index + 1 < lines.length) {
      const quoted = /^\s*>\s?(.*)$/.exec(lines[index + 1]);
      if (!quoted) break;
      body.push(quoted[1]);
      index += 1;
    }
    const variant = /WARNING|CAUTION/i.test(marker[1])
      ? "warn"
      : /NOTE|IMPORTANT/i.test(marker[1])
        ? "info"
        : "tip";
    callouts.push(`${variant}::${matchKey(stripMarkdownInline(body.join(" ")))}`);
  }
  return callouts;
}

/**
 * Removes fenced code block markers and their contents from Markdown text.
 * @param {string} src - The Markdown text to process.
 * @return {string} The text with fenced code blocks removed.
 */
function stripMarkdownFences(src) {
  let inFence = false;
  return src
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return "";
      }
      return inFence ? "" : line;
    })
    .join("\n");
}

/**
 * Normalizes Mermaid source while preserving indentation that carries syntactic meaning.
 * @param {string} raw - The Mermaid source to normalize.
 * @returns {string} The normalized source for content and order comparisons.
 */
function normalizeMermaidSource(raw) {
  const lines = decodeEntities(raw).replace(/\r\n?/g, "\n").split("\n");
  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines.at(-1)?.trim() === "") lines.pop();
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const commonIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(commonIndent).trimEnd()).join("\n");
}

/**
 * Extracts the contents and source positions of matching non-nested HTML or JSX tags.
 * @param {string} src - The source markup to scan.
 * @param {string} tag - The tag name to match.
 * @return {{index: number, content: string}[]} The matched contents and their starting positions.
 */
function extractTagContents(src, tag) {
  const results = [];
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  let match = re.exec(src);
  while (match !== null) {
    results.push({ index: match.index, content: match[1] });
    match = re.exec(src);
  }
  return results;
}

/**
 * Extracts JSX elements whose opening tags satisfy a predicate, including their nested content.
 * @param {string} src - The source text to scan.
 * @param {function(string): boolean} predicate - Determines whether an opening tag should be extracted.
 * @returns {Array<{index: number, openingTag: string, content: string}>} The extracted elements and their source positions.
 */
function extractElementContents(src, predicate) {
  const results = [];
  const openingRe = /<([A-Za-z][\w.-]*)\b[^>]*>/g;
  let opening = openingRe.exec(src);
  while (opening !== null) {
    const openingTag = opening[0];
    if (!openingTag.endsWith("/>") && predicate(openingTag)) {
      const tag = opening[1];
      const nestedRe = new RegExp(`<\\/?${tag}\\b[^>]*>`, "g");
      nestedRe.lastIndex = openingRe.lastIndex;
      let depth = 1;
      let nested = nestedRe.exec(src);
      while (nested !== null) {
        if (nested[0].startsWith(`</${tag}`)) depth -= 1;
        else if (!nested[0].endsWith("/>")) depth += 1;
        if (depth === 0) {
          results.push({
            index: opening.index,
            openingTag,
            content: src.slice(openingRe.lastIndex, nested.index),
          });
          openingRe.lastIndex = nestedRe.lastIndex;
          break;
        }
        nested = nestedRe.exec(src);
      }
    }
    opening = openingRe.exec(src);
  }
  return results;
}

/**
 * Extracts string constant declarations from TSX source.
 * @param {string} src - The complete TSX source text.
 * @return {Map<string, string>} A map from constant names to string values.
 */
function collectStringConstants(src) {
  const constants = new Map();
  const constantRe =
    /\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*(?:String\.raw\s*)?(`([\s\S]*?)`|"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')\s*;/g;
  let constant = constantRe.exec(src);
  while (constant !== null) {
    constants.set(constant[1], constant[3] ?? constant[4] ?? constant[5] ?? "");
    constant = constantRe.exec(src);
  }
  return constants;
}

/**
 * Resolves simple string constant references embedded in JSX content.
 * @param {string} content - The JSX element content.
 * @param {Map<string, string>} constants - The string constants available for resolution.
 * @returns {string} The content with recognized constant references replaced by their values.
 */
function resolveStringConstants(content, constants) {
  return content.replace(/\{\s*([A-Za-z_$][\w$]*)\s*\}/g, (expression, name) =>
    constants.has(name) ? constants.get(name) : expression
  );
}

/**
 * Collects Mermaid diagram sources from HTML in document order.
 * @param {string} src - The complete HTML source.
 * @returns {string[]} The normalized Mermaid sources found in Mermaid blocks and diagram definitions.
 */
function collectHtmlMermaidSources(src) {
  const sources = [];
  const divRe = /<div\b([^>]*\bclass=["'][^"']*\bmermaid\b[^"']*["'][^>]*)>([\s\S]*?)<\/div>/gi;
  let div = divRe.exec(src);
  while (div !== null) {
    sources.push({ index: div.index, source: normalizeMermaidSource(div[2]) });
    div = divRe.exec(src);
  }

  const diagramEntryRe = /(?:["'][^"']+["']|[A-Za-z_$][\w$]*)\s*:\s*`([\s\S]*?)`/g;
  let entry = diagramEntryRe.exec(src);
  while (entry !== null) {
    sources.push({ index: entry.index, source: normalizeMermaidSource(entry[1]) });
    entry = diagramEntryRe.exec(src);
  }

  return sources
    .sort((a, b) => a.index - b.index)
    .map(({ source }) => source)
    .filter((source) => MERMAID_DIAGRAM_DECLARATION.test(source));
}

/**
 * Collect normalized Mermaid chart sources from `MermaidDiagram` components in occurrence order.
 * @param {string} src - The complete contents of `page.tsx`.
 * @returns {string[]} The normalized Mermaid sources, or unresolved-reference markers for constants that cannot be resolved.
 */
function collectTsxMermaidSources(src) {
  const constants = collectStringConstants(src);

  const sources = [];
  const componentRe = /<MermaidDiagram\b[^>]*\bchart\s*=\s*(?:\{\s*([A-Za-z_$][\w$]*)\s*\}|\{\s*`([\s\S]*?)`\s*\}|["']([^"']*)["'])[^>]*\/?>/g;
  let component = componentRe.exec(src);
  while (component !== null) {
    const raw = component[2] ?? component[3] ?? constants.get(component[1]);
    sources.push(raw === undefined ? `__UNRESOLVED__:${component[1]}` : normalizeMermaidSource(raw));
    component = componentRe.exec(src);
  }
  return sources;
}

/**
 * Normalizes a URL for comparison.
 * @param {string} url - The raw URL string.
 * @return {string} The URL without its query, fragment, or trailing slashes, converted to lowercase.
 */
function normalizeUrl(url) {
  return url
    .trim()
    .replace(/[#?].*$/, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

// --------------------------------------------------------------------------
// インベントリ抽出
// --------------------------------------------------------------------------

/**
 * Extracts structural elements and external links from Markdown source.
 *
 * @param {string} src - The complete Markdown source to inspect.
 * @return {Object} An inventory containing headings, list items, code blocks, table rows, paragraphs, Mermaid sources, SVG elements, callouts, and external links with occurrence counts where applicable.
 */
function inventoryMarkdown(src) {
  const lines = src.split(/\r?\n/);
  const proseSource = stripMarkdownFences(src);
  const headings = [];
  const listTexts = [];
  let listItems = 0;
  let codeBlocks = 0;
  let tableRows = 0;
  let inFence = false;
  let fenceLanguage = "";
  let fenceLines = [];
  const codeBlockTexts = [];
  const tableRowTexts = [];
  const mermaidSources = [];
  const paragraphTexts = [];
  let paragraphLines = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    paragraphTexts.push(normalize(stripMarkdownInline(paragraphLines.join(" "))));
    paragraphLines = [];
  };

  for (const line of lines) {
    const fence = /^\s*(```|~~~)\s*([^\s]*)/.exec(line);
    if (fence) {
      flushParagraph();
      if (!inFence) {
        codeBlocks += 1;
        fenceLanguage = fence[2].toLowerCase();
        fenceLines = [];
      } else {
        const rawBlock = fenceLines.join("\n");
        if (fenceLanguage === "mermaid") {
          mermaidSources.push(normalizeMermaidSource(rawBlock));
        } else {
          codeBlockTexts.push(normalize(rawBlock));
        }
      }
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      fenceLines.push(line);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (heading) {
      flushParagraph();
      headings.push({
        level: heading[1].length,
        text: normalize(stripMarkdownInline(heading[2])),
      });
      continue;
    }
    const listItem = /^\s*(?:[-*+]|\d+\.)\s+(\S.*)$/.exec(line);
    if (listItem) {
      flushParagraph();
      listItems += 1;
      listTexts.push(normalize(stripMarkdownInline(listItem[1])));
      continue;
    }
    if (/^\s*\|.*\|\s*$/.test(line) && !/^\s*\|?\s*:?-{3,}/.test(line)) {
      flushParagraph();
      tableRows += 1;
      tableRowTexts.push(normalize(stripMarkdownInline(line.replace(/^\s*\||\|\s*$/g, ""))));
      continue;
    }
    if (
      line.trim() === "" ||
      /^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line) ||
      /^\s*(?:>|<[^>]+>)/.test(line) ||
      /^\s*\|?\s*:?-{3,}/.test(line)
    ) {
      flushParagraph();
      continue;
    }
    paragraphLines.push(line.trim());
  }
  flushParagraph();

  return {
    headings,
    listTexts,
    listItems,
    codeBlocks,
    tableRows,
    codeBlockTexts,
    tableRowTexts,
    paragraphTexts,
    mermaidSources,
    svgElements: collectSvgElements(proseSource),
    calloutElements: collectMarkdownCalloutElements(proseSource),
    externalLinks: collectUrls(src),
  };
}

/**
 * Builds an inventory of headings and content elements found in an HTML document.
 * @param {string} src - The complete HTML source.
 * @return {Object} The extracted headings, element counts, normalized content, Mermaid sources, SVG elements, callouts, and external links.
 */
function inventoryHtml(src) {
  const documentBody = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(src)?.[1] ?? src;
  const body = documentBody
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<div\b[^>]*\bclass=["'][^"']*\bdiagram-loading\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "");
  const headings = [];
  const headingRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match = headingRe.exec(body);
  while (match !== null) {
    headings.push({ level: Number(match[1]), text: normalize(stripMarkup(match[2])) });
    match = headingRe.exec(body);
  }

  const listTexts = [];
  const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let li = liRe.exec(body);
  while (li !== null) {
    listTexts.push(normalize(stripMarkup(li[1])));
    li = liRe.exec(body);
  }

  const codeBlockTexts = extractTagContents(body, "pre").map(({ content }) =>
    normalizeElementContent(content)
  );
  const tableRowTexts = extractTagContents(body, "tr").map(({ content }) =>
    normalizeElementContent(content)
  );
  const paragraphTexts = extractTagContents(body, "p").map(({ content }) =>
    normalizeElementContent(content)
  );

  return {
    headings,
    listTexts,
    listItems: countMatches(body, /<li\b/gi),
    codeBlocks: codeBlockTexts.length,
    tableRows: tableRowTexts.length,
    codeBlockTexts,
    tableRowTexts,
    paragraphTexts,
    mermaidSources: collectHtmlMermaidSources(src),
    svgElements: collectSvgElements(body),
    calloutElements: collectMarkupCalloutElements(body),
    externalLinks: collectUrls(body),
  };
}

/**
 * Builds a normalized content inventory from TSX source for migration comparison.
 * @param {string} src - The complete contents of the `page.tsx` file.
 * @returns {Object} The inventory of headings, lists, code blocks, table rows, paragraphs, Mermaid sources, SVGs, callouts, and external links.
 */
function inventoryTsx(src) {
  const headings = [];
  // h1 も採取する。原本の h2 タイトルがページの h1 になるのは正当な移植であり、
  // h2/h3 だけを見ると偽陽性になるため。
  const headingRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g;
  let match = headingRe.exec(src);
  while (match !== null) {
    headings.push({ level: Number(match[1]), text: normalize(stripMarkup(match[2])) });
    match = headingRe.exec(src);
  }

  const constants = collectStringConstants(src);
  const returnedJsx = collectTsxReturnMarkup(src);
  const returnedMarkup = resolveStringConstants(
    returnedJsx || (/^\s*</.test(src) ? src : ""),
    constants
  );
  const preBlocks = extractTagContents(src, "pre");
  const styledBlocks = extractElementContents(src, (openingTag) =>
    /className=\{\s*styles\.code(?:Block|Wrap|Card)\s*\}/.test(openingTag)
  ).filter(
    ({ content }) =>
      !/<pre\b/.test(content) &&
      !/className=\{\s*styles\.code(?:Block|Wrap|Card)\s*\}/.test(content)
  );
  const codeBlockTexts = [...preBlocks, ...styledBlocks]
    .sort((a, b) => a.index - b.index)
    .map(({ content }) => normalizeElementContent(resolveStringConstants(content, constants)));
  const tableRowTexts = extractTagContents(src, "tr").map(({ content }) =>
    normalizeElementContent(content)
  );
  const paragraphTexts = extractTagContents(src, "p").map(({ content }) =>
    normalizeElementContent(resolveStringConstants(content, constants))
  );

  return {
    headings,
    // ページ側は <li> を使わずカード / div で組むことがあるため、
    // 本文全体の平坦化テキストを照合対象にする（マークアップ非依存の漏れ検知）。
    flatText: matchKey(stripMarkup(returnedMarkup)),
    textNodeKeys: collectTextNodeKeys(returnedMarkup),
    listItems: countMatches(src, /<li\b/g),
    codeBlocks: codeBlockTexts.length,
    tableRows: tableRowTexts.length,
    codeBlockTexts,
    tableRowTexts,
    paragraphTexts,
    mermaidSources: collectTsxMermaidSources(src),
    svgElements: collectSvgElements(src),
    calloutElements: collectMarkupCalloutElements(src),
    externalLinks: collectUrls(src),
  };
}

// --------------------------------------------------------------------------
// Vue SFC（Nuxt 移行先）
// --------------------------------------------------------------------------

/**
 * Extracts the markup of the outermost `<template>` block of a Vue SFC.
 *
 * 本文のインベントリは `<template>` の中だけを対象にする。`<script setup>` や
 * `<style>` の文字列を本文として数えると、原本に存在しない「余分な本文」が
 * 発生して監査結果が信用できなくなるため。
 *
 * @param {string} src - The complete contents of the `.vue` file.
 * @returns {string} The template markup, or an empty string when no template block exists.
 */
function extractVueTemplate(src) {
  const open = /<template(?:\s[^>]*)?>/i.exec(src);
  if (open === null) return "";
  const start = open.index + open[0].length;
  const end = src.lastIndexOf("</template>");
  return end > start ? src.slice(start, end) : "";
}

/**
 * Resolves Vue mustache interpolation (`{{ NAME }}`) against script-level string constants.
 * @param {string} content - The template content.
 * @param {Map<string, string>} constants - The string constants available for resolution.
 * @returns {string} The content with recognized constant references replaced by their values.
 */
function resolveVueInterpolation(content, constants) {
  return content.replace(/\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g, (expression, name) =>
    constants.has(name) ? constants.get(name) : expression
  );
}

/**
 * Collect normalized Mermaid chart sources from `MermaidDiagram` components in occurrence order.
 *
 * Vue はバインド (`:chart="NAME"`) とリテラル (`chart="graph TD…"`) の両方を取りうる。
 *
 * @param {string} template - The `<template>` markup.
 * @param {Map<string, string>} constants - The script-level string constants.
 * @returns {string[]} The normalized Mermaid sources, or unresolved-reference markers.
 */
function collectVueMermaidSources(template, constants) {
  const sources = [];
  const componentRe =
    /<(?:MermaidDiagram|mermaid-diagram)\b[^>]*?\s(?::chart|v-bind:chart)\s*=\s*"([^"]*)"[^>]*?\/?>|<(?:MermaidDiagram|mermaid-diagram)\b[^>]*?\schart\s*=\s*"([^"]*)"[^>]*?\/?>/g;
  let component = componentRe.exec(template);
  while (component !== null) {
    const bound = component[1];
    const literal = component[2];
    if (bound !== undefined) {
      // バインド値が識別子なら定数を解決し、テンプレートリテラルならそのまま使う
      const identifier = /^\s*([A-Za-z_$][\w$]*)\s*$/.exec(bound);
      if (identifier !== null) {
        const value = constants.get(identifier[1]);
        sources.push(
          value === undefined
            ? `__UNRESOLVED__:${identifier[1]}`
            : normalizeMermaidSource(value)
        );
      } else {
        sources.push(normalizeMermaidSource(bound.replace(/^\s*`|`\s*$/g, "")));
      }
    } else if (literal !== undefined) {
      sources.push(normalizeMermaidSource(decodeEntities(literal)));
    }
    component = componentRe.exec(template);
  }
  return sources;
}

/**
 * Builds a normalized content inventory from a Vue SFC for migration comparison.
 * @param {string} src - The complete contents of the `.vue` file.
 * @returns {Object} The inventory of headings, lists, code blocks, table rows, paragraphs, Mermaid sources, SVGs, callouts, and external links.
 */
function inventoryVue(src) {
  const constants = collectStringConstants(src);
  const rawTemplate = extractVueTemplate(src);
  const template = resolveVueInterpolation(rawTemplate, constants)
    .replace(/<template\s+#fallback>[\s\S]*?<\/template>/gi, "")
    .replace(/<(p|div)\b[^>]*\bclass=["'][^"']*\bdiagram-loading\b[^"']*["'][^>]*>[\s\S]*?<\/\1>/gi, "");

  const headings = [];
  const headingRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g;
  let match = headingRe.exec(template);
  while (match !== null) {
    headings.push({ level: Number(match[1]), text: normalize(stripMarkup(match[2])) });
    match = headingRe.exec(template);
  }

  const preBlocks = extractTagContents(template, "pre");
  // Vue は CSS Modules ではなく通常のクラス名を使うため、kebab-case / camelCase の
  // どちらでもコードブロックのラッパーとして認識する。
  const styledBlocks = extractElementContents(template, (openingTag) =>
    /\bclass\s*=\s*"[^"]*\bcode[-_]?(?:block|wrap|card)\b/i.test(openingTag)
  ).filter(
    ({ content }) =>
      !/<pre\b/.test(content) &&
      !/\bclass\s*=\s*"[^"]*\bcode[-_]?(?:block|wrap|card)\b/i.test(content)
  );
  const codeBlockTexts = [...preBlocks, ...styledBlocks]
    .sort((a, b) => a.index - b.index)
    .map(({ content }) => normalizeElementContent(content));
  const tableRowTexts = extractTagContents(template, "tr").map(({ content }) =>
    normalizeElementContent(content)
  );
  const paragraphTexts = extractTagContents(template, "p").map(({ content }) =>
    normalizeElementContent(content)
  );

  return {
    headings,
    flatText: matchKey(stripMarkup(template)),
    textNodeKeys: collectTextNodeKeys(template),
    listItems: countMatches(template, /<li\b/g),
    codeBlocks: codeBlockTexts.length,
    tableRows: tableRowTexts.length,
    codeBlockTexts,
    tableRowTexts,
    paragraphTexts,
    mermaidSources: collectVueMermaidSources(template, constants),
    svgElements: collectSvgElements(template),
    calloutElements: collectMarkupCalloutElements(template),
    // 参考文献リンクは <script setup> の配列定数に持つこともあるためファイル全体から採る
    externalLinks: collectUrls(src),
  };
}

/**
 * Counts the matches found by a regular expression in a string.
 * @param {string} src - The string to search.
 * @param {RegExp} re - The regular expression used for matching.
 * @returns {number} The number of matches.
 */
function countMatches(src, re) {
  return (src.match(re) ?? []).length;
}

/**
 * Collects unique external URLs from text.
 *
 * @param {string} src - The text to scan.
 * @returns {Set<string>} The normalized URLs found in the text.
 */
function collectUrls(src) {
  const urls = new Set();
  const re = /https?:\/\/[^\s"'`)<>\]}\\]+/g;
  let match = re.exec(src);
  while (match !== null) {
    urls.add(normalizeUrl(match[0]));
    match = re.exec(src);
  }
  return urls;
}

/**
 * Identifies source values that occur more often than their corresponding page values.
 *
 * @param {Array} sourceValues - Source values in occurrence order.
 * @param {Array} pageValues - Values found in the destination page.
 * @param {Function} [key=(value) => value] - Function that derives the comparison key for each value.
 * @return {Array} Source values missing from the destination, preserving duplicate occurrences and source order.
 */
function missingOccurrences(sourceValues, pageValues, key = (value) => value) {
  const remaining = new Map();
  for (const value of pageValues) {
    const valueKey = key(value);
    remaining.set(valueKey, (remaining.get(valueKey) ?? 0) + 1);
  }
  return sourceValues.filter((value) => {
    const valueKey = key(value);
    const count = remaining.get(valueKey) ?? 0;
    if (count === 0) return true;
    remaining.set(valueKey, count - 1);
    return false;
  });
}

// --------------------------------------------------------------------------
// 照合
// --------------------------------------------------------------------------

/**
 * Compares source and migrated-page inventories and reports migration discrepancies.
 *
 * @param {object} source - Inventory extracted from the source document.
 * @param {object} page - Inventory extracted from the migrated page.
 * @returns {object} Comparison results, including missing elements, extra headings, count differences, Mermaid matches, and the blocking status.
 */
function compare(source, page) {
  const consumedPageHeadings = new Set();
  const missingHeadings = source.headings.filter((sourceHeading) => {
    const key = matchKey(sourceHeading.text);
    let pageIndex = page.headings.findIndex(
      (pageHeading, index) =>
        !consumedPageHeadings.has(index) &&
        pageHeading.level === sourceHeading.level &&
        matchKey(pageHeading.text) === key
    );
    // 原本の h2 ページタイトルを移植先の h1 に昇格するケースだけを許可する。
    if (pageIndex === -1 && sourceHeading.level === 2) {
      pageIndex = page.headings.findIndex(
        (pageHeading, index) =>
          !consumedPageHeadings.has(index) && pageHeading.level === 1 && matchKey(pageHeading.text) === key
      );
    }
    // 原本の h4 を移植先の h3 に昇格するケース（アクセシビリティ階層スキップ是正）も許可する。
    if (pageIndex === -1 && sourceHeading.level === 4) {
      pageIndex = page.headings.findIndex(
        (pageHeading, index) =>
          !consumedPageHeadings.has(index) && pageHeading.level === 3 && matchKey(pageHeading.text) === key
      );
    }
    if (pageIndex === -1) return true;
    consumedPageHeadings.add(pageIndex);
    return false;
  });
  const extraHeadings = page.headings.filter((_, index) => !consumedPageHeadings.has(index));

  const missingLinks = [...source.externalLinks].filter((u) => !page.externalLinks.has(u));

  // リスト項目はページ側が <li> でなくカードでも照合できるよう本文と比較する。
  // 短い項目は別の単語内での偶然一致を避けるため、要素境界で区切られた
  // テキストノードとの完全一致を使う。長い項目は後半の欠落を見逃さないよう、
  // 正規化した項目全体を平坦化テキストから occurrence-aware に消費する。
  let remainingPageText = page.flatText;
  const remainingShortTextNodes = new Map();
  for (const key of page.textNodeKeys ?? []) {
    remainingShortTextNodes.set(key, (remainingShortTextNodes.get(key) ?? 0) + 1);
  }
  const missingListItems = source.listTexts.filter((text) => {
    const key = matchKey(text);
    if (key.length < 8) {
      const count = remainingShortTextNodes.get(key) ?? 0;
      if (count === 0) return true;
      remainingShortTextNodes.set(key, count - 1);
      return false;
    }
    const pageIndex = remainingPageText.indexOf(key);
    if (pageIndex === -1) return true;
    remainingPageText =
      remainingPageText.slice(0, pageIndex) +
      "\0".repeat(key.length) +
      remainingPageText.slice(pageIndex + key.length);
    return false;
  });
  const missingCodeBlocks = missingOccurrences(source.codeBlockTexts, page.codeBlockTexts, matchKey);
  const missingTableRows = missingOccurrences(source.tableRowTexts, page.tableRowTexts, matchKey);
  const missingParagraphs = missingOccurrences(source.paragraphTexts, page.paragraphTexts, matchKey);
  const missingSvgElements = missingOccurrences(source.svgElements, page.svgElements);
  const missingCalloutElements = missingOccurrences(source.calloutElements, page.calloutElements);
  const mermaidSourcesMatch =
    source.mermaidSources.length === page.mermaidSources.length &&
    source.mermaidSources.every((value, index) => value === page.mermaidSources[index]);

  const counts = {
    listItems: { source: source.listItems, page: page.listItems },
    codeBlocks: { source: source.codeBlocks, page: page.codeBlocks },
    tableRows: { source: source.tableRows, page: page.tableRows },
    paragraphs: { source: source.paragraphTexts.length, page: page.paragraphTexts.length },
    headings: { source: source.headings.length, page: page.headings.length },
    externalLinks: { source: source.externalLinks.size, page: page.externalLinks.size },
    mermaidSources: { source: source.mermaidSources.length, page: page.mermaidSources.length },
    svgElements: { source: source.svgElements.length, page: page.svgElements.length },
    calloutElements: { source: source.calloutElements.length, page: page.calloutElements.length },
  };

  const blocking =
    missingHeadings.length > 0 ||
    missingLinks.length > 0 ||
    missingListItems.length > 0 ||
    missingCodeBlocks.length > 0 ||
    missingTableRows.length > 0 ||
    missingParagraphs.length > 0 ||
    missingSvgElements.length > 0 ||
    missingCalloutElements.length > 0 ||
    !mermaidSourcesMatch;

  return {
    missingHeadings,
    extraHeadings,
    missingLinks,
    missingListItems,
    missingCodeBlocks,
    missingTableRows,
    missingParagraphs,
    missingSvgElements,
    missingCalloutElements,
    mermaidSourcesMatch,
    sourceMermaidSources: source.mermaidSources,
    pageMermaidSources: page.mermaidSources,
    counts,
    blocking,
  };
}

// --------------------------------------------------------------------------
// エントリポイント
// --------------------------------------------------------------------------

function main() {
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const positional = args.filter((a) => !a.startsWith("--"));

if (positional.length < 2) {
  console.error(
    "usage: audit_source_parity.mjs <source.(md|html)> <page.(vue|tsx)> [--json] [--emit-headings]"
  );
  return 2;
}

const [sourcePath, pagePath] = positional;
const pageLabel = pagePath;

let sourceText;
let pageText;
try {
  sourceText = readFileSync(sourcePath, "utf8");
  pageText = readFileSync(pagePath, "utf8");
} catch (error) {
  console.error(`読み込み失敗: ${error instanceof Error ? error.message : String(error)}`);
  return 2;
}

const sourceInventory = /\.(?:md|markdown)$/i.test(sourcePath)
  ? inventoryMarkdown(sourceText)
  : inventoryHtml(sourceText);
// 移植先は Vue SFC が本命。旧 Next.js 資産の照合用に .tsx も受け付ける。
const pageInventory = /\.vue$/i.test(pagePath) ? inventoryVue(pageText) : inventoryTsx(pageText);
const result = compare(sourceInventory, pageInventory);

if (flags.has("--emit-headings")) {
  // 契約テスト S-1 に貼り付ける期待値配列を出力する
  for (let level = 1; level <= 6; level += 1) {
    const headings = sourceInventory.headings.filter((h) => h.level === level).map((h) => h.text);
    console.log(`const EXPECTED_H${level} = [`);
    for (const text of headings) console.log(`  ${JSON.stringify(text)},`);
    console.log(`] as const;${level < 6 ? "\n" : ""}`);
  }
  return 0;
}

if (flags.has("--json")) {
  console.log(
    JSON.stringify(
      {
        source: sourcePath,
        page: pagePath,
        ...result,
        missingHeadings: result.missingHeadings,
        extraHeadings: result.extraHeadings,
      },
      null,
      2
    )
  );
  return result.blocking ? 1 : 0;
}

console.log(`source: ${sourcePath}`);
console.log(`page  : ${pagePath}\n`);
console.log(`要素              原本    ${pageLabel}  （参考値。判定は下の照合結果で行う）`);
for (const [key, value] of Object.entries(result.counts)) {
  console.log(
    `${key.padEnd(16)}  ${String(value.source).padStart(5)}  ${String(value.page).padStart(8)}`
  );
}

if (result.missingHeadings.length > 0) {
  console.log(`\n❌ ${pageLabel} に存在しない原本の見出し (${result.missingHeadings.length} 件):`);
  for (const h of result.missingHeadings) console.log(`  h${h.level}: ${h.text}`);
}
if (result.missingLinks.length > 0) {
  console.log(`\n❌ ${pageLabel} に存在しない原本の外部リンク (${result.missingLinks.length} 件):`);
  for (const u of result.missingLinks) console.log(`  ${u}`);
}
if (result.missingListItems.length > 0) {
  console.log(`\n❌ ${pageLabel} 本文に見当たらない原本のリスト項目 (${result.missingListItems.length} 件):`);
  for (const t of result.missingListItems) console.log(`  - ${t}`);
}
if (result.missingCodeBlocks.length > 0) {
  console.log(`\n❌ ${pageLabel} に存在しない原本のコードブロック (${result.missingCodeBlocks.length} 件):`);
  for (const text of result.missingCodeBlocks) console.log(`  ${JSON.stringify(text)}`);
}
if (result.missingTableRows.length > 0) {
  console.log(`\n❌ ${pageLabel} に存在しない原本の表行 (${result.missingTableRows.length} 件):`);
  for (const text of result.missingTableRows) console.log(`  ${JSON.stringify(text)}`);
}
if (result.missingParagraphs.length > 0) {
  console.log(`\n❌ ${pageLabel} に存在しない原本の段落 (${result.missingParagraphs.length} 件):`);
  for (const text of result.missingParagraphs) console.log(`  ${JSON.stringify(text)}`);
}
if (result.missingSvgElements.length > 0) {
  console.log(`\n❌ ${pageLabel} に存在しないか改変された原本の SVG (${result.missingSvgElements.length} 件)`);
}
if (result.missingCalloutElements.length > 0) {
  console.log(
    `\n❌ ${pageLabel} に存在しないか改変された原本の callout/alert (${result.missingCalloutElements.length} 件)`
  );
}
if (!result.mermaidSourcesMatch) {
  console.log("\n❌ Mermaid ソースが原本と順序・出現回数込みで一致しません:");
  console.log(`  原本: ${JSON.stringify(result.sourceMermaidSources)}`);
  console.log(`  page: ${JSON.stringify(result.pageMermaidSources)}`);
}
if (result.extraHeadings.length > 0) {
  console.log(`\n⚠️ 原本に存在しない ${pageLabel} の見出し (${result.extraHeadings.length} 件、要確認):`);
  for (const h of result.extraHeadings) console.log(`  h${h.level}: ${h.text}`);
}

console.log(
  result.blocking
    ? "\n判定: ❌ 移行漏れあり — Green コミット禁止。漏れを転写してから再実行すること。"
    : "\n判定: ✅ 漏れなし — Green 判定に進んでよい。"
);
return result.blocking ? 1 : 0;
}

process.exitCode = main();
