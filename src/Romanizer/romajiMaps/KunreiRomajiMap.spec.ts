import { kunreiRomajiMap } from "./KunreiRomajiMap";
import { convert } from "./convert";

describe("kunreiRomajiMap", () => {
  test("「ジュジカラチヂンダツヅラノズジョニチュイヲハラウ」", () => {
    const originalText = "ジュジカラチヂンダツヅラノズジョニチュイヲハラウ";
    const correctText = "zyuzikaratidindatuduranozuzyonityuiwoharau";

    const preprocessedText = convert(originalText, kunreiRomajiMap);

    expect(preprocessedText).toBe(correctText);
  });

  test("「ジュジカラチジンダツズラノズジョニチュイヲハラウ」", () => {
    const originalText = "ジュジカラチジンダツズラノズジョニチュイヲハラウ";
    const correctText = "zyuzikaratizindatuzuranozuzyonityuiwoharau";

    const mainprocessedText = convert(originalText, kunreiRomajiMap);

    expect(mainprocessedText).toBe(correctText);
  });
});
