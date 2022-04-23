import { translateSokuon } from "./translateSokuon";

const postprocessors = {
  translateSokuon: translateSokuon,
};

export type PostprocessorKind = keyof typeof postprocessors;

export function postprocess(text: string, postps: PostprocessorKind[]): string {
  return postps.reduce(
    (prevText, postp) => postprocessors[postp](prevText),
    text
  );
}
