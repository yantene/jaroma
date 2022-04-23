import { omitChoompu } from "./omitChoompu";
import { unifyYotsugana } from "./unifyYotsugana";

const preprocessors = {
  unifyYotsugana: unifyYotsugana,
  omitChoompu: omitChoompu,
};

export type PreprocessorKind = keyof typeof preprocessors;

export function preprocess(text: string, preps: PreprocessorKind[]): string {
  return preps.reduce((prevText, prep) => preprocessors[prep](prevText), text);
}
