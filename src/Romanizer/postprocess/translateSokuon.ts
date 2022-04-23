// 促音を処理する
export function translateSokuon(text: string): string {
  return text.replaceAll(/ッ(.?)/g, (_match, next: string) =>
    /[aiueo]/.test(next) ? next : `${next}${next}`
  );
}
