import { KanaGyo } from "./KanaGyo";

export function kanaTableToRomajiMap(kanaTable: KanaGyo[]): {
  [kana: string]: string;
} {
  return kanaTable
    .map(({ shiin: shiin, kanas: [kanaA, kanaI, kanaU, kanaE, kanaO] }) => ({
      ...(kanaA ? { [kanaA]: [shiin, "a"].join("") } : {}),
      ...(kanaI ? { [kanaI]: [shiin, "i"].join("") } : {}),
      ...(kanaU ? { [kanaU]: [shiin, "u"].join("") } : {}),
      ...(kanaE ? { [kanaE]: [shiin, "e"].join("") } : {}),
      ...(kanaO ? { [kanaO]: [shiin, "o"].join("") } : {}),
    }))
    .reduce((pv, cv) => ({ ...pv, ...cv }));
}
