import { translateSokuon } from "./translateSokuon";

describe(translateSokuon, () => {
  test("「チョットカッテニミナイデヨッ」", () => {
    const originalText = "choッtokaッteniminaideyoッ";
    const correctText = "chottokatteniminaideyo";

    const postprocessedText = translateSokuon(originalText);

    expect(postprocessedText).toBe(correctText);
  });
});
