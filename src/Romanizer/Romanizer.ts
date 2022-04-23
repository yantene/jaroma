import { postprocess, PostprocessorKind } from "./postprocess/postprocess";
import { preprocess, PreprocessorKind } from "./preprocess/preprocess";
import { convert } from "./romajiMaps/convert";
import { romajiMapSet, RomanizationStyle } from "./romajiMaps/romajiMapSet";

export function romanize(
  katakanaText: string,
  options: {
    preprocessors?: PreprocessorKind[];
    romanizationStyle?: RomanizationStyle;
    postprocessors?: PostprocessorKind[];
  } = {}
) {
  const preprocessedText = preprocess(
    katakanaText,
    options.preprocessors ?? ["unifyYotsugana", "omitChoompu"]
  );

  const processedText = convert(
    preprocessedText,
    romajiMapSet[options.romanizationStyle ?? "hepburn"]
  );

  const postprocessedText = postprocess(
    processedText,
    options.postprocessors ?? ["translateSokuon"]
  );

  return postprocessedText;
}
