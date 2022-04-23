import { preprocess } from "./preprocess";

describe(preprocess, () => {
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
