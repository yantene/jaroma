import type { KanaGyo } from "./KanaGyo";

const kunreiRules: KanaGyo[] = [
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
];

const basicHepburnRules: KanaGyo[] = [
  { shiin: "sh", kanas: ["シャ", "シ", "シュ", "シェ", "ショ"] },
  { shiin: "ch", kanas: ["チャ", "チ", "チュ", "チェ", "チョ"] },
  { shiin: "ts", kanas: [undefined, undefined, "ツ", undefined, undefined] },
  { shiin: "f", kanas: ["ファ", "フィ", "フ", "フェ", "フォ"] },
  { shiin: "j", kanas: ["ジャ", "ジ", "ジュ", "ジェ", "ジョ"] },
];

const hatsuonHepburnRules: KanaGyo[] = [
  { shiin: "mb", kanas: ["ンバ", "ンビ", "ンブ", "ンベ", "ンボ"] },
  { shiin: "mm", kanas: ["ンマ", "ンミ", "ンム", "ンメ", "ンモ"] },
  { shiin: "mp", kanas: ["ンパ", "ンピ", "ンプ", "ンペ", "ンポ"] },
  { shiin: "mby", kanas: ["ンビャ", undefined, "ンビュ", "ンビェ", "ンビョ"] },
  { shiin: "mpy", kanas: ["ンピャ", undefined, "ンピュ", "ンピェ", "ンピョ"] },
  { shiin: "mmy", kanas: ["ンミャ", undefined, "ンミュ", "ンミェ", "ンミョ"] },
];

const hatsuonBoinRules: KanaGyo[] = [
  { shiin: "nn", kanas: ["ンア", "ンイ", "ンウ", "ンエ", "ンオ"] },
];

const wiWeWoToAGyoRules: KanaGyo[] = [
  { shiin: "", kanas: [undefined, "ヰ", undefined, "ヱ", "ヲ"] },
];

const uiUeUoWithSuteganaToWaGyoRules: KanaGyo[] = [
  { shiin: "w", kanas: [undefined, "ウィ", undefined, "ウェ", "ウォ"] },
];

const vaGyoRules: KanaGyo[] = [
  { shiin: "v", kanas: ["ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ"] },
];

const vaGyoToBaGyoRules: KanaGyo[] = [
  { shiin: "b", kanas: ["ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ"] },
];

const vaGyoVuOnlyRules: KanaGyo[] = [
  { shiin: "v", kanas: [undefined, undefined, "ヴ", undefined, undefined] },
];

const aGyoSuteganaFallbackRules: KanaGyo[] = [
  { shiin: "", kanas: ["ァ", "ィ", "ゥ", "ェ", "ォ"] },
];

const yaGyoSuteganaFallbackRules: KanaGyo[] = [
  { shiin: "y", kanas: ["ャ", undefined, "ュ", undefined, "ョ"] },
];

export class RomanizeStyle {
  #rules: KanaGyo[];
  #extraTable: [string, string][];

  constructor(rules: KanaGyo[], extraTable: [string, string][]) {
    this.#rules = rules;
    this.#extraTable = extraTable;
  }

  toTable() {
    return RomanizeStyle.convertRulesAndExtraTableToTable(
      this.#rules,
      this.#extraTable
    );
  }

  toMap() {
    return RomanizeStyle.convertRomajiTableToMap(this.toTable());
  }

  static initializeFromConfigs(
    options: Parameters<typeof RomanizeStyle.generateRules>[0] & {
      unifyYotsugana?: boolean; // ヂをジ、ヅをズとして処理します
      extraTable?: [string, string][]; // 追加の変換ルールを指定します
    } = {}
  ): RomanizeStyle {
    const rules = RomanizeStyle.generateRules(options);

    const extraTable: [string, string][] = [
      ...(options.extraTable ?? []),
      ...(options.unifyYotsugana
        ? RomanizeStyle.generateYotsuganaTable(rules)
        : []),
      ["ン", "n"],
    ];

    return new RomanizeStyle(rules, extraTable);
  }

  static configPresets: {
    [key: string]: Parameters<typeof RomanizeStyle.initializeFromConfigs>[0];
  } = {
    strictHepburn: {
      hepburn: "withHatsuonRule",
      wiWeWoToAGyo: true,
      uiUeUoWithSuteganaToWaGyo: true,
      vaGyo: "b",
      fallbackAGyoSutegana: true,
      fallbackYaGyoSutegana: true,
      ignoreChoon: ["choompu", "sutegana"],
      unifyYotsugana: true,
    },
  };

  static initializeFromPreset(
    preset: keyof typeof RomanizeStyle.configPresets
  ) {
    return RomanizeStyle.initializeFromConfigs(
      RomanizeStyle.configPresets[preset]
    );
  }

  static generateRules(
    options: Parameters<typeof RomanizeStyle.generateBaseRules>[0] & {
      ignoreChoon?: ("choompu" | "sutegana")[]; // 長音（長音符または同一母音に続くア行捨て仮名）を無視します
    }
  ): KanaGyo[] {
    const baseRules = this.generateBaseRules(options);

    return [
      this.generateSokuonRules,
      ...(options.ignoreChoon && options.ignoreChoon.includes("choompu")
        ? [this.generateChoompuRules]
        : []),
      ...(options.ignoreChoon && options.ignoreChoon.includes("sutegana")
        ? [this.generateSuteganaChoonRules]
        : []),
    ].reduce((rules, generator) => [...rules, ...generator(rules)], baseRules);
  }

  static generateBaseRules(options: {
    hepburn?: "withHatsuonRule" | "withoutHatsuonRule"; // ヘボン式を使用します。 withoutHatsuonRule でバ行パ行マ行の前の撥音を m にしません
    hatsuonBoin?: boolean; // 撥音に母音が続く場合、n を二回重ねます
    wiWeWoToAGyo?: boolean; // ヰ、ヱ、ヲをイ、エ、オとして読み替えます
    uiUeUoWithSuteganaToWaGyo?: boolean; // ウィ、ウェ、ウォをワ行として処理します
    vaGyo?: "v" | "b" | "vuOnly"; // ヴァ行を子音 v とするか、b とするか、ヴのみを vu とするか選択します
    fallbackAGyoSutegana?: boolean; // ルール外のア行捨て仮名をア行として読み替えます
    fallbackYaGyoSutegana?: boolean; // ルール外のヤ行捨て仮名をヤ行として読み替えます
  }): KanaGyo[] {
    return [
      ...kunreiRules,
      ...{
        withHatsuonRule: [...basicHepburnRules, ...hatsuonHepburnRules],
        withoutHatsuonRule: basicHepburnRules,
        "": [],
      }[options.hepburn ?? ""],
      ...(options.hatsuonBoin ? hatsuonBoinRules : []),
      ...(options.wiWeWoToAGyo ? wiWeWoToAGyoRules : []),
      ...(options.uiUeUoWithSuteganaToWaGyo
        ? uiUeUoWithSuteganaToWaGyoRules
        : []),
      ...{
        v: vaGyoRules,
        b: vaGyoToBaGyoRules,
        vuOnly: vaGyoVuOnlyRules,
        "": [],
      }[options.vaGyo ?? ""],
      ...(options.fallbackAGyoSutegana ? aGyoSuteganaFallbackRules : []),
      ...(options.fallbackYaGyoSutegana ? yaGyoSuteganaFallbackRules : []),
    ];
  }

  static generateSokuonRules(rules: KanaGyo[]): KanaGyo[] {
    return rules.flatMap(({ shiin, kanas }) => {
      if (shiin === "") return [];

      return [
        {
          shiin: `${shiin.charAt(0)}${shiin}`,
          kanas: kanas.map((kana) => kana && `ッ${kana}`),
        } as KanaGyo,
      ];
    });
  }

  static generateChoompuRules(rules: KanaGyo[]): KanaGyo[] {
    return rules.map(
      ({ shiin, kanas }) =>
        ({
          shiin,
          kanas: kanas.map((kana) => kana && `${kana}ー`),
        } as KanaGyo)
    );
  }

  static generateSuteganaChoonRules(rules: KanaGyo[]): KanaGyo[] {
    return rules.map(({ shiin, kanas }) => ({
      shiin,
      kanas: [
        kanas[0] && `${kanas[0]}ァ`,
        kanas[1] && `${kanas[1]}ィ`,
        kanas[2] && `${kanas[2]}ゥ`,
        kanas[3] && `${kanas[3]}ェ`,
        kanas[4] && `${kanas[4]}ォ`,
      ],
    }));
  }

  static generateYotsuganaTable(rules: KanaGyo[]): [string, string][] {
    const map = this.convertRomajiTableToMap(
      this.convertRulesAndExtraTableToTable(rules, [])
    );
    const di = map.get("ジ");
    const du = map.get("ズ");

    if (di === undefined || du === undefined) return [];

    return [
      ["ヂ", di],
      ["ヅ", du],
    ];
  }

  static kanaGyoToTable({
    shiin: shiin,
    kanas: [kanaA, kanaI, kanaU, kanaE, kanaO],
  }: KanaGyo): [string, string][] {
    return [
      [kanaA, `${shiin}a`],
      [kanaI, `${shiin}i`],
      [kanaU, `${shiin}u`],
      [kanaE, `${shiin}e`],
      [kanaO, `${shiin}o`],
    ].filter((item): item is [string, string] => item[0] != null);
  }

  static convertRulesAndExtraTableToTable(
    rules: KanaGyo[],
    extraTable: [string, string][]
  ): [string, string][] {
    return rules
      .flatMap((kanaGyo) => this.kanaGyoToTable(kanaGyo))
      .concat(extraTable);
  }

  static convertRomajiTableToMap(
    romajiTable: [string, string][]
  ): Map<string, string> {
    return new Map<string, string>(romajiTable);
  }
}
