import kuromoji from "kuromoji";
import type { IpadicFeatures, Tokenizer } from "kuromoji";

export class Phonetizer {
  #kuromojiBuilder: kuromoji.TokenizerBuilder<IpadicFeatures>;

  constructor(dicPath = "./node_modules/kuromoji/dict/") {
    this.#kuromojiBuilder = kuromoji.builder({ dicPath });
  }

  #tokenizer() {
    return new Promise<Tokenizer<IpadicFeatures>>((done) => {
      this.#kuromojiBuilder.build((_err, tokenizer) => done(tokenizer));
    });
  }

  async phonetize(text: string) {
    const tokenizer = await this.#tokenizer();
    const tokens = tokenizer.tokenize(text);

    return tokens.map(({ surface_form: surfaceForm, pronunciation }) => ({
      surfaceForm,
      pronunciation: (() => {
        if (pronunciation) {
          return pronunciation;
        } else if (/^[ぁ-ゖァ-ヺー]+$/.test(surfaceForm)) {
          return surfaceForm.replaceAll(/[ぁ-ゖ]/g, (c) =>
            String.fromCharCode(c.charCodeAt(0) + 0x60)
          );
        } else {
          return null;
        }
      })(),
    }));
  }
}
