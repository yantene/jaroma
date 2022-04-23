import { KanaGyo } from "./KanaGyo";
import { kanaTableToRomajiMap } from "./kanaTableToRomajiMap";
import { kunreiRomajiMap } from "./KunreiRomajiMap";
import { RomajiMap } from "./RomajiMap";

const hepburnKanaPatchTable: KanaGyo[] = [
  { shiin: "", kanas: [undefined, "ヰ", undefined, "ヱ", "ヲ"] },
  { shiin: "b", kanas: ["ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ"] },
  { shiin: "sh", kanas: ["シャ", "シ", "シュ", "シェ", "ショ"] },
  { shiin: "ch", kanas: ["チャ", "チ", "チュ", "チェ", "チョ"] },
  { shiin: "ts", kanas: [undefined, undefined, "ツ", undefined, undefined] }, // TODO: 「ツァ」はどうする
  { shiin: "f", kanas: ["ファ", "フィ", "フ", "フェ", "フォ"] },
  { shiin: "j", kanas: ["ジャ", "ジ", "ジュ", "ジェ", "ジョ"] },
  { shiin: "mm", kanas: ["ンマ", "ンミ", "ンム", "ンメ", "ンモ"] },
  { shiin: "mb", kanas: ["ンバ", "ンビ", "ンブ", "ンベ", "ンボ"] },
  { shiin: "mp", kanas: ["ンパ", "ンピ", "ンプ", "ンペ", "ンポ"] },
];

export const hepburnRomajiMap: RomajiMap = {
  ...kunreiRomajiMap,
  ...kanaTableToRomajiMap(hepburnKanaPatchTable),
};
