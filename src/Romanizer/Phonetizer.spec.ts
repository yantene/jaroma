import { Phonetizer } from "./Phonetizer";

describe("Phonetizer", () => {
  describe("#phonetize()", () => {
    describe("未知語が含まれないとき", () => {
      test("「趣味はマンホールの蓋集め」の発音が正しく取り出されること", async () => {
        const original = "趣味|は|マンホール|の|蓋|集め".split("|");
        const expected = "シュミ|ワ|マンホール|ノ|フタ|アツメ".split("|");

        const phonetizer = new Phonetizer();
        const tokens = await phonetizer.phonetize(original.join(""));

        expect(tokens.map(({ surfaceForm: s }) => s)).toStrictEqual(original);
        expect(tokens.map(({ pronunciation: p }) => p)).toStrictEqual(expected);
      });

      test("「道理で氷を通りで小売した功利を思うわけだ」の発音が正しく取り出されること", async () => {
        const original =
          "道理|で|氷|を|通り|で|小売|し|た|功利|を|思う|わけ|だ".split("|");
        const expected =
          "ドーリ|デ|コーリ|ヲ|トーリ|デ|コウリ|シ|タ|コーリ|ヲ|オモウ|ワケ|ダ".split(
            "|"
          );

        const phonetizer = new Phonetizer();
        const tokens = await phonetizer.phonetize(original.join(""));

        expect(tokens.map(({ surfaceForm: s }) => s)).toStrictEqual(original);
        expect(tokens.map(({ pronunciation: p }) => p)).toStrictEqual(expected);
      });
    });

    describe("未知語が含まれるとき", () => {
      test("かなのみで構成されるテキストが正しく取り出されること", async () => {
        const original = "オフチョベットしたテフをマブガッドしてリットにします";
        const expected = "オフチョベットシタテフヲマブガッドシテリットニシマス";

        const phonetizer = new Phonetizer();
        const tokens = await phonetizer.phonetize(original);

        expect(tokens.map(({ surfaceForm: s }) => s).join("")).toBe(original);
        expect(tokens.map(({ pronunciation: p }) => p).join("")).toBe(expected);
      });

      test("未知熟語を含むテキストでは、その語の pronunciation が null になること", async () => {
        const original = "宇絲舮から聞こえてくるのです";

        const phonetizer = new Phonetizer();
        const tokens = await phonetizer.phonetize(original);

        expect(
          tokens.find(({ surfaceForm }) => surfaceForm === "宇")?.pronunciation
        ).toBeNull();
        expect(
          tokens.find(({ surfaceForm }) => surfaceForm === "絲")?.pronunciation
        ).toBeNull();
        expect(
          tokens.find(({ surfaceForm }) => surfaceForm === "舮")?.pronunciation
        ).toBeNull();
      });
    });
  });
});
