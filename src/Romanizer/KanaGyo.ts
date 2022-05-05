export interface KanaGyo {
  shiin: string;
  kanas: [
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined
  ];
}

export function isKanaGyo(obj: unknown): obj is KanaGyo {
  const kanaGyo = obj as KanaGyo;
  return (
    typeof kanaGyo === "object" &&
    kanaGyo !== null &&
    "shiin" in kanaGyo &&
    typeof kanaGyo.shiin === "string" &&
    "kanas" in kanaGyo &&
    0 in kanaGyo.kanas &&
    (typeof kanaGyo.kanas[0] === "string" ||
      typeof kanaGyo.kanas[0] === "undefined") &&
    1 in kanaGyo.kanas &&
    (typeof kanaGyo.kanas[1] === "string" ||
      typeof kanaGyo.kanas[1] === "undefined") &&
    2 in kanaGyo.kanas &&
    (typeof kanaGyo.kanas[2] === "string" ||
      typeof kanaGyo.kanas[2] === "undefined") &&
    3 in kanaGyo.kanas &&
    (typeof kanaGyo.kanas[3] === "string" ||
      typeof kanaGyo.kanas[3] === "undefined") &&
    4 in kanaGyo.kanas &&
    (typeof kanaGyo.kanas[4] === "string" ||
      typeof kanaGyo.kanas[4] === "undefined")
  );
}
