import { KanaGyo } from "./KanaGyo";
import { kanaTableToRomajiMap } from "./kanaTableToRomajiMap";
import { RomajiMap } from "./RomajiMap";

const kunreiKanaTable: KanaGyo[] = [
  { shiin: "", kanas: ["ア", "イ", "ウ", "エ", "オ"] },
  { shiin: "k", kanas: ["カ", "キ", "ク", "ケ", "コ"] },
  { shiin: "s", kanas: ["サ", "シ", "ス", "セ", "ソ"] },
  { shiin: "t", kanas: ["タ", "チ", "ツ", "テ", "ト"] },
  { shiin: "n", kanas: ["ナ", "ニ", "ヌ", "ネ", "ノ"] },
  { shiin: "h", kanas: ["ハ", "ヒ", "フ", "ヘ", "ホ"] },
  { shiin: "m", kanas: ["マ", "ミ", "ム", "メ", "モ"] },
  { shiin: "y", kanas: ["ヤ", undefined, "ユ", undefined, "ヨ"] },
  { shiin: "r", kanas: ["ラ", "リ", "ル", "レ", "ロ"] },
  { shiin: "w", kanas: ["ワ", "ヰ", undefined, "ヱ", "ヲ"] },
  { shiin: "g", kanas: ["ガ", "ギ", "グ", "ゲ", "ゴ"] },
  { shiin: "z", kanas: ["ザ", "ジ", "ズ", "ゼ", "ゾ"] },
  { shiin: "d", kanas: ["ダ", "ヂ", "ヅ", "デ", "ド"] },
  { shiin: "b", kanas: ["バ", "ビ", "ブ", "ベ", "ボ"] },
  { shiin: "p", kanas: ["パ", "ピ", "プ", "ペ", "ポ"] },
  { shiin: "ky", kanas: ["キャ", undefined, "キュ", "キェ", "キョ"] },
  { shiin: "gy", kanas: ["ギャ", undefined, "ギュ", "ギェ", "ギョ"] },
  { shiin: "sy", kanas: ["シャ", undefined, "シュ", "シェ", "ショ"] },
  { shiin: "zy", kanas: ["ジャ", undefined, "ジュ", "ジェ", "ジョ"] },
  { shiin: "ty", kanas: ["チャ", undefined, "チュ", "チェ", "チョ"] },
  { shiin: "dy", kanas: ["ヂャ", undefined, "ヂュ", "ヂェ", "ヂョ"] },
  { shiin: "ny", kanas: ["ニャ", undefined, "ニュ", "ニェ", "ニョ"] },
  { shiin: "hy", kanas: ["ヒャ", undefined, "ヒュ", "ヒェ", "ヒョ"] },
  { shiin: "by", kanas: ["ビャ", undefined, "ビュ", "ビェ", "ビョ"] },
  { shiin: "py", kanas: ["ピャ", undefined, "ピュ", "ピェ", "ピョ"] },
  { shiin: "my", kanas: ["ミャ", undefined, "ミュ", "ミェ", "ミョ"] },
  { shiin: "ry", kanas: ["リャ", undefined, "リュ", "リェ", "リョ"] },
  // 捨て仮名のフォールバック
  { shiin: "", kanas: ["ァ", "ィ", "ゥ", "ェ", "ォ"] },
  { shiin: "y", kanas: ["ャ", undefined, "ュ", undefined, "ョ"] },
];

export const kunreiRomajiMap: RomajiMap = {
  ...kanaTableToRomajiMap(kunreiKanaTable),
  ン: "n",
};
