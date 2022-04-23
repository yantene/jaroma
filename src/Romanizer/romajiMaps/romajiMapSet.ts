import { hepburnRomajiMap } from "./HepburnRomajiMap";
import { kunreiRomajiMap } from "./KunreiRomajiMap";

export const romajiMapSet = {
  kunrei: kunreiRomajiMap,
  hepburn: hepburnRomajiMap,
};

export type RomanizationStyle = keyof typeof romajiMapSet;
