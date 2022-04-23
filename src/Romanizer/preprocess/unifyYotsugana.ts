// 四つ仮名を統一する
export function unifyYotsugana(text: string): string {
  return text.replaceAll("ヂ", "ジ").replaceAll("ヅ", "ズ");
}
