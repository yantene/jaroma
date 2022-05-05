import type { RomanizeStyle } from "./RomanizeStyle";

type Trie = Map<string, string | Trie>;

export class RomajiTrie {
  #trie: Trie = new Map<string, Trie | string>();
  size = 0;

  constructor(kanaRomajiArray: [string, string][]) {
    kanaRomajiArray.forEach(([kana, romaji]) => {
      this.#setToTrie(kana, romaji, this.#trie);
    });
  }

  static initializeFromRomanizeStyle(romanizeStyle: RomanizeStyle): RomajiTrie {
    return new RomajiTrie(romanizeStyle.toTable());
  }

  #setToTrie(kana: string, romaji: string, trie: Trie) {
    if (kana === "") {
      if (!trie.has("$")) this.size++;

      trie.set("$", romaji);
      return;
    }

    const subTrie =
      (trie.get(kana.charAt(0)) as Trie | undefined) ??
      new Map<string, string | Trie>();

    trie.set(kana.charAt(0), subTrie);
    this.#setToTrie(kana.substring(1), romaji, subTrie);
  }

  #getFromTrieGreedy(
    text: string,
    cursor: number,
    trie: Trie | undefined
  ): { romaji: string; matchedKana: string } | undefined {
    // When no Trie left or no text left (including EOS)
    if (trie === undefined || text.length < cursor) return undefined;

    const subTrie = trie.get(text.charAt(cursor)) as Trie | undefined;
    const result = this.#getFromTrieGreedy(text, cursor + 1, subTrie);

    // When I have already find a longer match
    if (result) return result;

    const romaji = trie.get("$") as string | undefined;

    // When this cursor didn't match
    if (romaji === undefined) return undefined;

    return { romaji, matchedKana: text.substring(0, cursor) };
  }

  getGreedy(
    text: string
  ):
    | { romaji: string; matchedKana: string }
    | { romaji: undefined; matchedKana: undefined } {
    return (
      this.#getFromTrieGreedy(text, 0, this.#trie) ?? {
        romaji: undefined,
        matchedKana: undefined,
      }
    );
  }

  chunk(text: string): { romaji: string | undefined; matchedKana: string }[] {
    const chunks = [];
    let cursor = 0;
    while (cursor < text.length) {
      const remainingText = text.substring(cursor);
      const { romaji, matchedKana } = this.getGreedy(remainingText);
      if (romaji === undefined) {
        chunks.push({ romaji, matchedKana: remainingText });
        break;
      }

      chunks.push({ romaji, matchedKana });
      cursor += matchedKana.length;
    }

    return chunks;
  }
}
