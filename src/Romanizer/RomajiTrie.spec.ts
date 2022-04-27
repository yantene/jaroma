import { RomajiTrie } from "./RomajiTrie";

describe(RomajiTrie, () => {
  describe("size", () => {
    test("空配列を引数として渡したとき、size は 0 であること", () => {
      const romajiMap = new RomajiTrie([]);

      expect(romajiMap.size).toBe(0);
    });

    test("重複しないカナローマ字ペアを 5 個コンストラクタに渡すと size は 5 であること", () => {
      const romajiMap = new RomajiTrie([
        ["ア", "a"],
        ["カ", "ka"],
        ["サ", "sa"],
        ["タ", "ta"],
        ["ナ", "na"],
      ]);

      expect(romajiMap.size).toBe(5);
    });

    test("カナローマ字ペアを 5 個コンストラクタに渡し、そのうち 2 ペアのカナが重複していると size は 3 であること", () => {
      const romajiMap = new RomajiTrie([
        ["シ", "si"],
        ["カ", "ka"],
        ["シ", "shi"],
        ["ヲ", "wo"],
        ["ヲ", "o"],
      ]);

      expect(romajiMap.size).toBe(3);
    });

    test("カナローマ字ペアを 5 個コンストラクタに渡し、そのうち 2 ペアのローマ字が重複していても size は 5 であること", () => {
      const romajiMap = new RomajiTrie([
        ["ンオ", "no"],
        ["カ", "ka"],
        ["ノ", "no"],
        ["テ", "te"],
        ["テー", "te"],
      ]);

      expect(romajiMap.size).toBe(5);
    });
  });

  describe("#getGreedy()", () => {
    test("コンストラクタに渡したカナローマ字ペアに含まれるカナを渡すと、全体にマッチし、対応するローマ字が返ること", () => {
      const romajiMap = new RomajiTrie([
        ["ア", "a"],
        ["カ", "ka"],
        ["サ", "sa"],
        ["タ", "ta"],
        ["ナ", "na"],
      ]);

      [
        { kana: "ア", romaji: "a" },
        { kana: "カ", romaji: "ka" },
        { kana: "サ", romaji: "sa" },
        { kana: "タ", romaji: "ta" },
        { kana: "ナ", romaji: "na" },
      ].forEach(({ kana, romaji }) => {
        const { romaji: answeredRomaji, matchedKana } =
          romajiMap.getGreedy(kana);
        expect(answeredRomaji).toBe(romaji);
        expect(matchedKana).toBe(kana);
      });
    });

    test("コンストラクタに渡したカナローマ字ペアに含まれないカナを渡すと、全体にマッチし、undefined が返ること", () => {
      const romajiMap = new RomajiTrie([
        ["ハ", "ha"],
        ["マ", "ma"],
        ["ヤ", "ya"],
        ["ラ", "ra"],
        ["ワ", "wa"],
      ]);

      [
        { kana: "ア", romaji: "a" },
        { kana: "カ", romaji: "ka" },
        { kana: "サ", romaji: "sa" },
        { kana: "タ", romaji: "ta" },
        { kana: "ナ", romaji: "na" },
      ].forEach(({ kana }) => {
        const { romaji: answeredRomaji, matchedKana } =
          romajiMap.getGreedy(kana);
        expect(answeredRomaji).toBeUndefined();
        expect(matchedKana).toBeUndefined();
      });
    });

    test("カナが重複するカナローマ字ペアをコンストラクタに渡して重複するカナを渡すと、全体にマッチし、より後ろのローマ字が返ること", () => {
      const romajiMap = new RomajiTrie([
        ["シ", "si"],
        ["カ", "ka"],
        ["シ", "shi"],
        ["ヲ", "wo"],
        ["ヲ", "o"],
      ]);

      [
        { kana: "シ", romaji: "shi" },
        { kana: "ヲ", romaji: "o" },
      ].forEach(({ kana, romaji }) => {
        const { romaji: answeredRomaji, matchedKana } =
          romajiMap.getGreedy(kana);
        expect(answeredRomaji).toBe(romaji);
        expect(matchedKana).toBe(kana);
      });
    });

    test("ローマ字が重複するカナローマ字ペアをコンストラクタに渡してカナを渡すと、全体にマッチし、対応するローマ字が返ること", () => {
      const romajiMap = new RomajiTrie([
        ["ンオ", "no"],
        ["カ", "ka"],
        ["ノ", "no"],
        ["テ", "te"],
        ["テー", "te"],
      ]);

      [
        { kana: "ンオ", romaji: "no" },
        { kana: "カ", romaji: "ka" },
        { kana: "ノ", romaji: "no" },
        { kana: "テ", romaji: "te" },
        { kana: "テー", romaji: "te" },
      ].forEach(({ kana, romaji }) => {
        const { romaji: answeredRomaji, matchedKana } =
          romajiMap.getGreedy(kana);
        expect(answeredRomaji).toBe(romaji);
        expect(matchedKana).toBe(kana);
      });
    });

    test("前方から部分一致をするカナのパターンが複数ある場合、より長くマッチすること", () => {
      const romajiMap = new RomajiTrie([
        ["ン", "n"],
        ["ブ", "bu"],
        ["ンブ", "mbu"],
      ]);

      const { romaji, matchedKana } = romajiMap.getGreedy("ンブン");

      expect(romaji).toBe("mbu");
      expect(matchedKana).toBe("ンブ");
    });
  });

  describe("#chunk()", () => {
    test("カナローマ字ペアの単位でチャンクが分割されること", () => {
      const romajiMap = new RomajiTrie([
        ["シ", "shi"],
        ["ンブ", "mbu"],
        ["ン", "n"],
      ]);

      const chunks = romajiMap.chunk("シンブンシ");

      expect(chunks.map(({ romaji }) => romaji)).toEqual([
        "shi",
        "mbu",
        "n",
        "shi",
      ]);

      expect(chunks.map(({ matchedKana }) => matchedKana)).toEqual([
        "シ",
        "ンブ",
        "ン",
        "シ",
      ]);
    });
  });
});
