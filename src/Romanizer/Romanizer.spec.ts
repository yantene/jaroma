import { romanize } from "./Romanizer";

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
