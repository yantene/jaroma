import { unifyYotsugana } from "./unifyYotsugana";

describe(unifyYotsugana, () => {
  test("「ヂ」が「ジ」になること", () => {
    const originalText = "カジバノバカヂカラ";
    const correctText = "カジバノバカジカラ";

    const preprocessedText = unifyYotsugana(originalText);

    expect(preprocessedText).toBe(correctText);
  });

  test("「ヅ」が「ズ」になること", () => {
    const originalText = "イイヅカシノチズ";
    const correctText = "イイズカシノチズ";

    const preprocessedText = unifyYotsugana(originalText);

    expect(preprocessedText).toBe(correctText);
  });
});
