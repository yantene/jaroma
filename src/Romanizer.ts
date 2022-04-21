interface KanaGyo {
  shiin: string;
  kanas: [string?, string?, string?, string?, string?];
}

function kanaTableToRomajiMap(kanaTable: KanaGyo[]): {
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

const kunreiRomajiMap: { [kana: string]: string } = {
  ...kanaTableToRomajiMap(kunreiKanaTable),
  ン: "n",
};

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

const hepburnRomajiMap: { [kana: string]: string } = {
  ...kunreiRomajiMap,
  ...kanaTableToRomajiMap(hepburnKanaPatchTable),
};

const romajiMaps = {
  kunrei: kunreiRomajiMap,
  hepburn: hepburnRomajiMap,
};

type RomajiMapType = keyof typeof romajiMaps;

export function mainprocess(
  text: string,
  romajiMapType: RomajiMapType = "hepburn"
): string {
  return Object.keys(hepburnRomajiMap)
    .sort((k1, k2) => k2.length - k1.length)
    .reduce(
      (text: string, targetKana: string) =>
        text.replaceAll(
          targetKana,
          romajiMaps[romajiMapType][targetKana] ?? ""
        ),
      text
    );
}

// 四つ仮名を統一する
function unifyYotsugana(text: string): string {
  return text.replaceAll("ヂ", "ジ").replaceAll("ヅ", "ズ");
}

// 長音符を省略する
function omitChoompu(text: string): string {
  return text.replaceAll("ー", "");
}

// TODO: 直前と母音の等しい「ァ」「ィ」「ゥ」「ェ」「ォ」を省略する
const preprocessors = {
  unifyYotsugana: unifyYotsugana,
  omitChoompu: omitChoompu,
};

type PreprocessorType = keyof typeof preprocessors;

export function preprocess(text: string, preps: PreprocessorType[]): string {
  return preps.reduce((prevText, prep) => preprocessors[prep](prevText), text);
}

// 促音を処理する
function translateSokuon(text: string): string {
  return text.replaceAll(/ッ(.?)/g, (_match, next: string) =>
    /[aiueo]/.test(next) ? next : `${next}${next}`
  );
}

const postprocessors = {
  translateSokuon: translateSokuon,
};

type PostprocessorType = keyof typeof postprocessors;

export function postprocess(text: string, postps: PostprocessorType[]): string {
  return postps.reduce(
    (prevText, postp) => postprocessors[postp](prevText),
    text
  );
}

export function romanize(
  katakanaText: string,
  options: {
    preprocessors?: PreprocessorType[];
    romajiMap?: RomajiMapType;
    postprocessors?: PostprocessorType[];
  } = {}
) {
  const preprocessedText = preprocess(
    katakanaText,
    options.preprocessors ?? ["unifyYotsugana", "omitChoompu"]
  );

  const processedText = mainprocess(
    preprocessedText,
    options.romajiMap ?? "hepburn"
  );

  const postprocessedText = postprocess(
    processedText,
    options.postprocessors ?? ["translateSokuon"]
  );

  return postprocessedText;
}
