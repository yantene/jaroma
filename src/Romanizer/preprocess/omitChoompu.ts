// 長音符を省略する
export function omitChoompu(text: string): string {
  return text.replaceAll("ー", "");
}

// TODO: 直前と母音の等しい「ァ」「ィ」「ゥ」「ェ」「ォ」を省略する
