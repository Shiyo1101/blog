import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** 日本語の1分あたりの読了文字数 */
const JAPANESE_CHARS_PER_MINUTE = 400;
/** 英語の1分あたりの読了単語数 */
const ENGLISH_WORDS_PER_MINUTE = 200;
/** 読了時間の最小値（分） */
const MIN_READING_MINUTES = 1;

// global.css の @theme で追加した値を登録し、既定の値と同じように上書きできるようにする
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ["pixel-sm", "pixel-md", "pixel-lg", "focus"],
      font: ["display", "ichigojam"],
      ease: ["pixel"],
      spacing: ["cursor"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

/**
 * 記事の読了時間を計算
 * @param content - 記事の本文
 * @returns 読了時間（分）
 */
export const calculateReadingTime = (content: string): number => {
  const japaneseChars = content.replaceAll(/[a-zA-Z0-9\s]/gu, "").length;
  const englishWords = content.match(/[a-zA-Z]+/gu)?.length ?? 0;

  const japaneseReadingTime = japaneseChars / JAPANESE_CHARS_PER_MINUTE;
  const englishReadingTime = englishWords / ENGLISH_WORDS_PER_MINUTE;

  const totalReadingTime = Math.ceil(japaneseReadingTime + englishReadingTime);

  return Math.max(MIN_READING_MINUTES, totalReadingTime);
};
