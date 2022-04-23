import { hepburnRomajiMap } from "./HepburnRomajiMap";
import { convert } from "./convert";

describe("hepburnRomajiMap", () => {
  test("「ジュジカラチヂンダツヅラノズジョニチュイヲハラウ」", () => {
    const originalText = "ジュジカラチヂンダツヅラノズジョニチュイヲハラウ";
    const correctText = "jujikarachidindatsuduranozujonichuioharau";

    const mainprocessedText = convert(originalText, hepburnRomajiMap);

    expect(mainprocessedText).toBe(correctText);
  });

  test("「ジュジカラチジンダツズラノズジョニチュイヲハラウ」", () => {
    const originalText = "ジュジカラチジンダツズラノズジョニチュイヲハラウ";
    const correctText = "jujikarachijindatsuzuranozujonichuioharau";

    const mainprocessedText = convert(originalText, hepburnRomajiMap);

    expect(mainprocessedText).toBe(correctText);
  });

  test("「チョットカッテニミナイデヨッ」", () => {
    const originalText = "チョットカッテニミナイデヨッ";
    const correctText = "choッtokaッteniminaideyoッ";

    const mainprocessedText = convert(originalText, hepburnRomajiMap);

    expect(mainprocessedText).toBe(correctText);
  });
});
