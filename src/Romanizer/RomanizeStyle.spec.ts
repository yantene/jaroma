import type { KanaGyo } from "./KanaGyo";
import { RomanizeStyle } from "./RomanizeStyle";

describe("RomanizeStyle", () => {
  describe("ローマ字ルール", () => {
    describe("訓令式（オプションなし）のとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs();
      const map = romanizeStyle.toMap();

      test("「ア」が a になること", () => {
        expect(map.get("ア")).toBe("a");
      });

      test("「キ」が ki になること", () => {
        expect(map.get("キ")).toBe("ki");
      });

      test("「シ」が si になること", () => {
        expect(map.get("シ")).toBe("si");
      });

      test("「ン」が n になること", () => {
        expect(map.get("ン")).toBe("n");
      });

      test("「ンイ」が undefined になること", () => {
        expect(map.get("ンイ")).toBeUndefined();
      });

      test("「ンキ」が undefined になること", () => {
        expect(map.get("ンキ")).toBeUndefined();
      });

      test("「ンブ」が undefined になること", () => {
        expect(map.get("ンブ")).toBeUndefined();
      });

      test("「ヰ」が wi になること", () => {
        expect(map.get("ヰ")).toBe("wi");
      });

      test("「ワ」が wa になること", () => {
        expect(map.get("ワ")).toBe("wa");
      });
    });

    describe("撥音処理を除くヘボン式を使用したとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        hepburn: "withoutHatsuonRule",
      });
      const map = romanizeStyle.toMap();

      test("「ア」が a になること", () => {
        expect(map.get("ア")).toBe("a");
      });

      test("「キ」が ki になること", () => {
        expect(map.get("キ")).toBe("ki");
      });

      test("「シ」が shi になること", () => {
        expect(map.get("シ")).toBe("shi");
      });

      test("「ン」が n になること", () => {
        expect(map.get("ン")).toBe("n");
      });

      test("「ンブ」が undefined になること", () => {
        expect(map.get("ンブ")).toBeUndefined();
      });
    });

    describe("撥音処理を含むヘボン式を使用したとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        hepburn: "withHatsuonRule",
      });
      const map = romanizeStyle.toMap();

      test("「ア」が a になること", () => {
        expect(map.get("ア")).toBe("a");
      });

      test("「キ」が ki になること", () => {
        expect(map.get("キ")).toBe("ki");
      });

      test("「シ」が shi になること", () => {
        expect(map.get("シ")).toBe("shi");
      });

      test("「ン」が n になること", () => {
        expect(map.get("ン")).toBe("n");
      });

      test("「ンブ」が mbu になること", () => {
        expect(map.get("ンブ")).toBe("mbu");
      });
    });

    describe("撥音に母音が続くとき、n を二回重ねる設定をしたとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        hatsuonBoin: true,
      });
      const map = romanizeStyle.toMap();

      test("「ンイ」が nni になること", () => {
        expect(map.get("ンイ")).toBe("nni");
      });

      test("「ンキ」が undefined になること", () => {
        expect(map.get("ンキ")).toBeUndefined();
      });
    });

    describe("「ヰ」「ヱ」「ヲ」をア行とするとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        wiWeWoToAGyo: true,
      });
      const map = romanizeStyle.toMap();

      test("「ヰ」が i になること", () => {
        expect(map.get("ヰ")).toBe("i");
      });

      test("「ワ」が wa になること", () => {
        expect(map.get("ワ")).toBe("wa");
      });
    });

    describe("「ウィ」「ウェ」「ウォ」をワ行とするとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        uiUeUoWithSuteganaToWaGyo: true,
      });
      const map = romanizeStyle.toMap();

      test("「ウィ」が wi になること", () => {
        expect(map.get("ウィ")).toBe("wi");
      });

      test("「ヰ」が wi になること", () => {
        expect(map.get("ヰ")).toBe("wi");
      });

      test("「ワ」が wa になること", () => {
        expect(map.get("ワ")).toBe("wa");
      });
    });

    describe("ヴァ行の子音を v とするとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        vaGyo: "v",
      });
      const map = romanizeStyle.toMap();

      test("「ヴィ」が vi になること", () => {
        expect(map.get("ヴィ")).toBe("vi");
      });

      test("「ヴ」が vu になること", () => {
        expect(map.get("ヴ")).toBe("vu");
      });
    });

    describe("ヴァ行の子音を b とするとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        vaGyo: "b",
      });
      const map = romanizeStyle.toMap();

      test("「ヴィ」が bi になること", () => {
        expect(map.get("ヴィ")).toBe("bi");
      });

      test("「ヴ」が bu になること", () => {
        expect(map.get("ヴ")).toBe("bu");
      });
    });

    describe("ヴァ行のうち、ヴのみを vu とするとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        vaGyo: "vuOnly",
      });
      const map = romanizeStyle.toMap();

      test("「ヴィ」が undefined になること", () => {
        expect(map.get("ヴィ")).toBeUndefined();
      });

      test("「ヴ」が vu になること", () => {
        expect(map.get("ヴ")).toBe("vu");
      });
    });

    describe("ルール外の「ァ」「ィ」「ゥ」「ェ」「ォ」をア行として読み替えるとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        fallbackAGyoSutegana: true,
      });
      const map = romanizeStyle.toMap();

      test("「ツォ」が undefined になること", () => {
        expect(map.get("ツォ")).toBeUndefined();
      });

      test("「ツ」が tu になること", () => {
        expect(map.get("ツ")).toBe("tu");
      });

      test("「ォ」が o になること", () => {
        expect(map.get("ォ")).toBe("o");
      });
    });

    describe("ルール外の「ャ」「ュ」「ョ」をヤ行として読み替えるとき", () => {
      const romanizeStyle = RomanizeStyle.initializeFromConfigs({
        fallbackYaGyoSutegana: true,
      });
      const map = romanizeStyle.toMap();

      test("「デャ」が undefined になること", () => {
        expect(map.get("デャ")).toBeUndefined();
      });
      test("「デ」が de になること", () => {
        expect(map.get("デ")).toBe("de");
      });
      test("「ャ」が ya になること", () => {
        expect(map.get("ャ")).toBe("ya");
      });
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("#toRomajiTable", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("#toMap", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".initializeFromConfigs", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".generateRules", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".generateBaseRules", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".generateSokuonRules", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".generateCoompuRules", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".generateSuteganaChoonRules", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".generateYotsuganaTable", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".kanaGyoToRomajiTable", () => {});

  describe(".convertRulesAndExtraTableToTable", () => {
    test("あ行を渡すと、あ行の RomajiTable が返ること", () => {
      const aGyo: KanaGyo = {
        shiin: "",
        kanas: ["ア", "イ", "ウ", "エ", "オ"],
      };

      const romajiTable = RomanizeStyle.convertRulesAndExtraTableToTable(
        [aGyo],
        []
      );

      expect(romajiTable.find(([kana]) => kana === "ア")?.[1]).toBe("a");
      expect(romajiTable.find(([kana]) => kana === "イ")?.[1]).toBe("i");
      expect(romajiTable.find(([kana]) => kana === "ウ")?.[1]).toBe("u");
      expect(romajiTable.find(([kana]) => kana === "エ")?.[1]).toBe("e");
      expect(romajiTable.find(([kana]) => kana === "オ")?.[1]).toBe("o");
    });

    test("か行を渡すと、か行の RomajiTable が返ること", () => {
      const kaGyo: KanaGyo = {
        shiin: "k",
        kanas: ["カ", "キ", "ク", "ケ", "コ"],
      };

      const romajiTable = RomanizeStyle.convertRulesAndExtraTableToTable(
        [kaGyo],
        []
      );

      expect(romajiTable.find(([kana]) => kana === "カ")?.[1]).toBe("ka");
      expect(romajiTable.find(([kana]) => kana === "キ")?.[1]).toBe("ki");
      expect(romajiTable.find(([kana]) => kana === "ク")?.[1]).toBe("ku");
      expect(romajiTable.find(([kana]) => kana === "ケ")?.[1]).toBe("ke");
      expect(romajiTable.find(([kana]) => kana === "コ")?.[1]).toBe("ko");
    });

    test("や行（や行いおよびや行えを除く）を渡すと、や行の RomajiTable が返ること", () => {
      const yaGyo: KanaGyo = {
        shiin: "y",
        kanas: ["ヤ", undefined, "ユ", undefined, "ヨ"],
      };

      const romajiTable = RomanizeStyle.convertRulesAndExtraTableToTable(
        [yaGyo],
        []
      );

      expect(romajiTable.find(([kana]) => kana === "ヤ")?.[1]).toBe("ya");
      expect(romajiTable.find(([kana]) => kana === "ユ")?.[1]).toBe("yu");
      expect(romajiTable.find(([kana]) => kana === "ヨ")?.[1]).toBe("yo");
    });

    test("や行（や行いおよびや行えを除く）を渡すと、返る RomajiTable の項目数は 3 であること", () => {
      const yaGyo: KanaGyo = {
        shiin: "y",
        kanas: ["ヤ", undefined, "ユ", undefined, "ヨ"],
      };

      const romajiTable = RomanizeStyle.convertRulesAndExtraTableToTable(
        [yaGyo],
        []
      );

      expect(romajiTable).toHaveLength(3);
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe(".convertRomajiTableToMap", () => {});
});
