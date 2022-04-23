import { RomajiMap } from "./RomajiMap";

export function convert(text: string, romajiMap: RomajiMap): string {
  return Object.keys(romajiMap)
    .sort((k1, k2) => k2.length - k1.length)
    .reduce(
      (text: string, targetKana: string) =>
        text.replaceAll(targetKana, romajiMap[targetKana] ?? ""),
      text
    );
}
