// @vitest-environment node
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const REPO_ROOT = fileURLToPath(new URL("../../", import.meta.url));

// 移動前に原本のバイト列から確定した SHA-256。原本は改変せずアーカイブする。
const ORIGINAL_HASHES = {
  "Prince2-7-practitioner-guide.html": "d7234f1dd762cb8740ed8f19d9357493b475122b8d201279de3a13830bd1b081",
  "Prince2-7-practitioner-guide.md": "aa42a61c57b1455ccebe0a3105516ce20a3239a84a1be9f98dec1aaaf5d31a8e"
};

for (const [file, hash] of Object.entries(ORIGINAL_HASHES)) {
  it(`原本 ${file} はルートから移動され、アーカイブでバイト単位に保存される`, () => {
    expect(existsSync(resolve(REPO_ROOT, file))).toBe(false);
    const archived = readFileSync(resolve(REPO_ROOT, "archive/Prince2-7-practitioner-guide", file));
    expect(createHash("sha256").update(archived).digest("hex")).toBe(hash);
  });
}
