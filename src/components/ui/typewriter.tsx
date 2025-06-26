import { useState, useEffect, useRef } from "react";

import type { ClassValue } from "clsx";

import { IchigoJamCharacterOfCursor } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * TypewriterコンポーネントのPropsの型定義
 * @param {string[]} texts - 表示する文字列の配列
 * @param {number} delay - 最初のタイピングを開始するまでの遅延時間 (ms)
 * @param {number} [duration=1000] - 1つのテキストを表示し終えてから次のテキストを表示するまでの待ち時間 (ms)
 * @param {number} [typingSpeed=100] - 1文字をタイプする速度 (ms)
 * @param {boolean} [loop=false] - テキスト配列の表示を繰り返すかどうか
 * @param {boolean} [cursorVisible=false] - カーソルを表示するかどうか
 * @param {ClassValue} [className] - 追加のCSSクラス名（TailwindCSS対応）
 */
type TypewriterProps = {
  texts: string[];
  delay: number;
  duration?: number;
  typingSpeed?: number;
  loop?: boolean;
  cursorVisible?: boolean;
  className?: ClassValue;
};

const Typewriter = ({
  texts,
  delay,
  duration = 1000,
  typingSpeed = 100,
  loop = false,
  cursorVisible = false,
  className,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const cursorString = className?.toString().includes("font-ichigojam")
    ? IchigoJamCharacterOfCursor
    : "|";

  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    // エフェクト開始時に完了状態をリセット
    setIsDone(false);

    const type = () => {
      const currentText = texts[textIndexRef.current];

      // 現在のテキストをすべて表示し終えた場合
      if (charIndexRef.current >= currentText.length) {
        // 現在が最後のテキストかどうかを判定
        const isLastText = textIndexRef.current === texts.length - 1;

        // ループしない、かつ最後のテキストなら処理を終了
        if (!loop && isLastText) {
          setIsDone(true); // 完了状態をセット
          return; // ここで再帰を停止
        }

        // 継続する場合、duration待ってから次の処理へ
        timeoutRef.current = setTimeout(() => {
          textIndexRef.current = (textIndexRef.current + 1) % texts.length;
          charIndexRef.current = 0;
          setDisplayedText("");
          type();
        }, duration);
        return;
      }

      const char = currentText[charIndexRef.current];
      setDisplayedText((prev) => prev + char);
      charIndexRef.current += 1;

      timeoutRef.current = setTimeout(type, typingSpeed);
    };

    timeoutRef.current = setTimeout(type, delay);

    // クリーンアップ関数
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setDisplayedText("");
      textIndexRef.current = 0;
      charIndexRef.current = 0;
    };
  }, [texts, delay, duration, typingSpeed, loop]);

  return (
    <p className={cn("text-xl", className)}>
      <span>{displayedText}</span>
      {cursorVisible && !isDone && (
        <span className={cn("ml-1 animate-blink")}>{cursorString}</span>
      )}
    </p>
  );
};

export default Typewriter;
