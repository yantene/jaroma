import { preprocess, mainprocess, postprocess, romanize } from "./Romanizer";

describe(preprocess, () => {
  describe("unifyYotsugana", () => {
    test("「ヂ」が「ジ」になること", () => {
      const originalText = "カジバノバカヂカラ";
      const correctText = "カジバノバカジカラ";

      const preprocessedText = preprocess(originalText, ["unifyYotsugana"]);

      expect(preprocessedText).toBe(correctText);
    });

    test("「ヅ」が「ズ」になること", () => {
      const originalText = "イイヅカシノチズ";
      const correctText = "イイズカシノチズ";

      const preprocessedText = preprocess(originalText, ["unifyYotsugana"]);

      expect(preprocessedText).toBe(correctText);
    });
  });

  describe("omitChoompu", () => {
    test("語中に含まれる長音符が削除されること", () => {
      const originalText = "トーテムポール";
      const correctText = "トテムポル";

      const preprocessedText = preprocess(originalText, ["omitChoompu"]);

      expect(preprocessedText).toBe(correctText);
    });

    test("語末の長音符が削除されること", () => {
      const originalText = "コンピューター";
      const correctText = "コンピュタ";

      const preprocessedText = preprocess(originalText, ["omitChoompu"]);

      expect(preprocessedText).toBe(correctText);
    });
  });

  describe("すべて", () => {
    test("「ジュージカラチヂンダツヅラノズジョーニチューイヲハラウ」", () => {
      // 十時から縮んだつづらの頭上に注意を払う
      const originalText =
        "ジュージカラチヂンダツヅラノズジョーニチューイヲハラウ";
      const correctText = "ジュジカラチジンダツズラノズジョニチュイヲハラウ";

      const preprocessedText = preprocess(originalText, [
        "unifyYotsugana",
        "omitChoompu",
      ]);

      expect(preprocessedText).toBe(correctText);
    });
  });
});

describe(mainprocess, () => {
  describe("kunrei", () => {
    test("「ジュジカラチヂンダツヅラノズジョニチュイヲハラウ」", () => {
      const originalText = "ジュジカラチヂンダツヅラノズジョニチュイヲハラウ";
      const correctText = "zyuzikaratidindatuduranozuzyonityuiwoharau";

      const preprocessedText = mainprocess(originalText, "kunrei");

      expect(preprocessedText).toBe(correctText);
    });

    test("「ジュジカラチジンダツズラノズジョニチュイヲハラウ」", () => {
      const originalText = "ジュジカラチジンダツズラノズジョニチュイヲハラウ";
      const correctText = "zyuzikaratizindatuzuranozuzyonityuiwoharau";

      const mainprocessedText = mainprocess(originalText, "kunrei");

      expect(mainprocessedText).toBe(correctText);
    });
  });

  describe("hepburn", () => {
    test("「ジュジカラチヂンダツヅラノズジョニチュイヲハラウ」", () => {
      const originalText = "ジュジカラチヂンダツヅラノズジョニチュイヲハラウ";
      const correctText = "jujikarachidindatsuduranozujonichuioharau";

      const mainprocessedText = mainprocess(originalText, "hepburn");

      expect(mainprocessedText).toBe(correctText);
    });

    test("「ジュジカラチジンダツズラノズジョニチュイヲハラウ」", () => {
      const originalText = "ジュジカラチジンダツズラノズジョニチュイヲハラウ";
      const correctText = "jujikarachijindatsuzuranozujonichuioharau";

      const mainprocessedText = mainprocess(originalText, "hepburn");

      expect(mainprocessedText).toBe(correctText);
    });

    test("「チョットカッテニミナイデヨッ」", () => {
      const originalText = "チョットカッテニミナイデヨッ";
      const correctText = "choッtokaッteniminaideyoッ";

      const mainprocessedText = mainprocess(originalText, "hepburn");

      expect(mainprocessedText).toBe(correctText);
    });
  });
});

describe(postprocess, () => {
  describe("translateSokuon", () => {
    test("「チョットカッテニミナイデヨッ」", () => {
      const originalText = "choッtokaッteniminaideyoッ";
      const correctText = "chottokatteniminaideyo";

      const postprocessedText = postprocess(originalText, ["translateSokuon"]);

      expect(postprocessedText).toBe(correctText);
    });
  });
});

describe(romanize, () => {
  test("「ジュージカラチヂンダツヅラノズジョーニチューイヲハラウ」", () => {
    const originalText =
      "ジュージカラチヂンダツヅラノズジョーニチューイヲハラウ";
    const correctText = "jujikarachijindatsuzuranozujonichuioharau";

    const romanizedText = romanize(originalText);

    expect(romanizedText).toBe(correctText);
  });

  test("「チョットカッテニミナイデヨッ」", () => {
    const originalText = "チョットカッテニミナイデヨッ";
    const correctText = "chottokatteniminaideyo";

    const romanizedText = romanize(originalText);

    expect(romanizedText).toBe(correctText);
  });
});
