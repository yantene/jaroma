import { Phonetizer } from "./Phonetizer";
import { RomajiTrie } from "./RomajiTrie";
import { RomanizeStyle } from "./RomanizeStyle";

describe("Romanizer", () => {
  describe("strict hepburn", () => {
    const phonetizer = new Phonetizer();
    const romajiTrie = RomajiTrie.initializeFromRomanizeStyle(
      RomanizeStyle.initializeFromPreset("strictHepburn")
    );

    describe("例文「火事場の馬鹿力」のとき", () => {
      test("発音が「カジバノバカジカラ」となること", async () => {
        const original = "火事場の馬鹿力";
        const expected = [
          { surfaceForm: "火事場", pronunciation: "カジバ" },
          { surfaceForm: "の", pronunciation: "ノ" },
          { surfaceForm: "馬鹿力", pronunciation: "バカジカラ" }, // Not "ヂ"
        ];

        const parsed = await phonetizer.phonetize(original);

        expect(parsed).toStrictEqual(expected);
      });

      test('ローマ字表記が "kajiba no bakajikara" になること', () => {
        const originals = ["カジバ", "ノ", "バカジカラ"];
        const expected = [
          [
            { romaji: "ka", matchedKana: "カ" },
            { romaji: "ji", matchedKana: "ジ" },
            { romaji: "ba", matchedKana: "バ" },
          ],
          [{ romaji: "no", matchedKana: "ノ" }],
          [
            { romaji: "ba", matchedKana: "バ" },
            { romaji: "ka", matchedKana: "カ" },
            { romaji: "ji", matchedKana: "ジ" },
            { romaji: "ka", matchedKana: "カ" },
            { romaji: "ra", matchedKana: "ラ" },
          ],
        ];

        const result = originals.map((original) => romajiTrie.chunk(original));

        expect(result).toStrictEqual(expected);
      });
    });

    describe("例文「飯塚市の地図」のとき", () => {
      test("発音が「イーズカシノチズ」となること", async () => {
        const original = "飯塚市の地図";
        const expected = [
          { surfaceForm: "飯塚", pronunciation: "イーズカ" },
          { surfaceForm: "市", pronunciation: "シ" },
          { surfaceForm: "の", pronunciation: "ノ" },
          { surfaceForm: "地図", pronunciation: "チズ" }, // Not "ヂ"
        ];

        const parsed = await phonetizer.phonetize(original);

        expect(parsed).toStrictEqual(expected);
      });

      test('ローマ字表記が "izuka shi no chizu" になること', () => {
        const originals = ["イーズカシ", "ノ", "チズ"]; // Join "イーヅカ" and "シ" manually
        const expected = [
          [
            { romaji: "i", matchedKana: "イー" }, // In general, it might be "ii"...?
            { romaji: "zu", matchedKana: "ズ" },
            { romaji: "ka", matchedKana: "カ" },
            { romaji: "shi", matchedKana: "シ" },
          ],
          [{ romaji: "no", matchedKana: "ノ" }],
          [
            { romaji: "chi", matchedKana: "チ" },
            { romaji: "zu", matchedKana: "ズ" },
          ],
        ];

        const result = originals.map((original) => romajiTrie.chunk(original));

        expect(result).toStrictEqual(expected);
      });
    });

    describe("例文「ちゃちゃっと食ってすぐ行くよっ」のとき", () => {
      test("発音が「チャチャットクッテスグイクヨッ」となること", async () => {
        const original = "ちゃちゃっと食ってすぐ行くよっ";
        const expected = [
          { surfaceForm: "ちゃちゃ", pronunciation: "チャチャ" },
          { surfaceForm: "っと", pronunciation: "ット" },
          { surfaceForm: "食っ", pronunciation: "クッ" },
          { surfaceForm: "て", pronunciation: "テ" },
          { surfaceForm: "すぐ", pronunciation: "スグ" },
          { surfaceForm: "行く", pronunciation: "イク" },
          { surfaceForm: "よっ", pronunciation: "ヨッ" },
        ];

        const parsed = await phonetizer.phonetize(original);

        expect(parsed).toStrictEqual(expected);
      });

      test('ローマ字表記が "izuka shi no chizu" になること', () => {
        const originals = ["チャチャット", "クッテ", "スグイク", "ヨッ"]; // Editted manually
        const expected = [
          [
            { romaji: "cha", matchedKana: "チャ" },
            { romaji: "cha", matchedKana: "チャ" },
            { romaji: "tto", matchedKana: "ット" },
          ],
          [
            { romaji: "ku", matchedKana: "ク" },
            { romaji: "tte", matchedKana: "ッテ" },
          ],
          [
            { romaji: "su", matchedKana: "ス" },
            { romaji: "gu", matchedKana: "グ" },
            { romaji: "i", matchedKana: "イ" },
            { romaji: "ku", matchedKana: "ク" },
          ],
          [
            { romaji: "yo", matchedKana: "ヨ" },
            { romaji: undefined, matchedKana: "ッ" },
          ],
        ];

        const result = originals.map((original) => romajiTrie.chunk(original));

        expect(result).toStrictEqual(expected);
      });
    });

    describe("例文「トーテムポールは古代のコンピューター」のとき", () => {
      test("発音が「トーテムポールワコダイノコンピューター」となること", async () => {
        const original = "トーテムポールは古代のコンピューター";
        const expected = [
          { surfaceForm: "トーテム", pronunciation: "トーテム" },
          { surfaceForm: "ポール", pronunciation: "ポール" },
          { surfaceForm: "は", pronunciation: "ワ" },
          { surfaceForm: "古代", pronunciation: "コダイ" },
          { surfaceForm: "の", pronunciation: "ノ" },
          { surfaceForm: "コンピューター", pronunciation: "コンピューター" },
        ];

        const parsed = await phonetizer.phonetize(original);

        expect(parsed).toStrictEqual(expected);
      });

      test('ローマ字表記が "totemuporu wa kodai no kompyuta" になること', () => {
        const originals = [
          "トーテムポール",
          "ワ",
          "コダイ",
          "ノ",
          "コンピューター",
        ]; // Editted manually
        const expected = [
          [
            { romaji: "to", matchedKana: "トー" },
            { romaji: "te", matchedKana: "テ" },
            { romaji: "mu", matchedKana: "ム" },
            { romaji: "po", matchedKana: "ポー" },
            { romaji: "ru", matchedKana: "ル" },
          ],
          [{ romaji: "wa", matchedKana: "ワ" }],
          [
            { romaji: "ko", matchedKana: "コ" },
            { romaji: "da", matchedKana: "ダ" },
            { romaji: "i", matchedKana: "イ" },
          ],
          [{ romaji: "no", matchedKana: "ノ" }],
          [
            { romaji: "ko", matchedKana: "コ" },
            { romaji: "mpyu", matchedKana: "ンピュー" },
            { romaji: "ta", matchedKana: "ター" },
          ],
        ];

        const result = originals.map((original) => romajiTrie.chunk(original));

        expect(result).toStrictEqual(expected);
      });
    });

    describe("例文「十時から縮んだつづらの頭上に注意を払う」のとき", () => {
      test("発音が「ジュージカラチジンダツズラノズジョーニチューイヲハラウ」となること", async () => {
        const original = "十時から縮んだつづらの頭上に注意を払う";
        const expected = [
          { surfaceForm: "十", pronunciation: "ジュー" },
          { surfaceForm: "時", pronunciation: "ジ" },
          { surfaceForm: "から", pronunciation: "カラ" },
          { surfaceForm: "縮ん", pronunciation: "チジン" },
          { surfaceForm: "だ", pronunciation: "ダ" },
          { surfaceForm: "つづら", pronunciation: "ツズラ" },
          { surfaceForm: "の", pronunciation: "ノ" },
          { surfaceForm: "頭上", pronunciation: "ズジョー" },
          { surfaceForm: "に", pronunciation: "ニ" },
          { surfaceForm: "注意", pronunciation: "チューイ" },
          { surfaceForm: "を", pronunciation: "ヲ" },
          { surfaceForm: "払う", pronunciation: "ハラウ" },
        ];

        const parsed = await phonetizer.phonetize(original);

        expect(parsed).toStrictEqual(expected);
      });

      test('ローマ字表記が "juji kara chijinda tsuzura no zujo ni chui o harau" になること', () => {
        const originals =
          "ジュージ|カラ|チジンダ|ツズラ|ノ|ズジョー|ニ|チューイ|ヲ|ハラウ".split(
            "|"
          ); // Editted manually
        const expected = [
          [
            { romaji: "ju", matchedKana: "ジュー" },
            { romaji: "ji", matchedKana: "ジ" },
          ],
          [
            { romaji: "ka", matchedKana: "カ" },
            { romaji: "ra", matchedKana: "ラ" },
          ],
          [
            { romaji: "chi", matchedKana: "チ" },
            { romaji: "ji", matchedKana: "ジ" },
            { romaji: "n", matchedKana: "ン" },
            { romaji: "da", matchedKana: "ダ" },
          ],
          [
            { romaji: "tsu", matchedKana: "ツ" },
            { romaji: "zu", matchedKana: "ズ" },
            { romaji: "ra", matchedKana: "ラ" },
          ],
          [{ romaji: "no", matchedKana: "ノ" }],
          [
            { romaji: "zu", matchedKana: "ズ" },
            { romaji: "jo", matchedKana: "ジョー" },
          ],
          [{ romaji: "ni", matchedKana: "ニ" }],
          [
            { romaji: "chu", matchedKana: "チュー" },
            { romaji: "i", matchedKana: "イ" },
          ],
          [{ romaji: "o", matchedKana: "ヲ" }],
          [
            { romaji: "ha", matchedKana: "ハ" },
            { romaji: "ra", matchedKana: "ラ" },
            { romaji: "u", matchedKana: "ウ" },
          ],
        ];

        const result = originals.map((original) => romajiTrie.chunk(original));

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
