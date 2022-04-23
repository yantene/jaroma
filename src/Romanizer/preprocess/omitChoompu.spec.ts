import { omitChoompu } from "./omitChoompu";

describe(omitChoompu, () => {
  test("語中に含まれる長音符が削除されること", () => {
    const originalText = "トーテムポール";
    const correctText = "トテムポル";

    const preprocessedText = omitChoompu(originalText);

    expect(preprocessedText).toBe(correctText);
  });

  test("語末の長音符が削除されること", () => {
    const originalText = "コンピューター";
    const correctText = "コンピュタ";

    const preprocessedText = omitChoompu(originalText);

    expect(preprocessedText).toBe(correctText);
  });
});
