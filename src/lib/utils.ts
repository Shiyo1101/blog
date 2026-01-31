import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

/**
 * 記事の読了時間を計算
 * @param content - 記事の本文
 * @returns 読了時間（分）
 */
export const calculateReadingTime = (content: string): number => {
  // 日本語の場合は400文字/分、英語の場合は200単語/分で計算
  const japaneseChars = content.replace(/[a-zA-Z0-9\s]/g, "").length;
  const englishWords = content.match(/[a-zA-Z]+/g)?.length || 0;

  const japaneseReadingTime = japaneseChars / 400;
  const englishReadingTime = englishWords / 200;

  const totalReadingTime = Math.ceil(japaneseReadingTime + englishReadingTime);

  return Math.max(1, totalReadingTime); // 最低1分
};
