import { type ClassValue, clsx } from "clsx";
import { type JSX, useEffect, useRef, useState } from "react";

import { IchigoJamCharacterOfCursor } from "@/lib/ichigojam/characters";
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
 * @param {keyof JSX.IntrinsicElements} [as="div"] - 使用するHTML要素のタイプ
 */
type TypewriterProps = {
  texts: string[];
  delay: number;
  duration?: number;
  typingSpeed?: number;
  loop?: boolean;
  cursorVisible?: boolean;
  className?: ClassValue;
  as?: keyof JSX.IntrinsicElements;
};

const Typewriter = ({
  texts,
  delay,
  duration = 1000,
  typingSpeed = 100,
  loop = false,
  cursorVisible = false,
  className,
  as: Component = "div",
}: TypewriterProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const cursorString = clsx(className).includes("font-ichigojam")
    ? IchigoJamCharacterOfCursor
    : "|";

  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const type = () => {
      const currentText = texts[textIndexRef.current];

      // 現在のテキストをすべて表示し終えた場合
      if (charIndexRef.current >= currentText.length) {
        // 現在が最後のテキストかどうかを判定
        const isLastText = textIndexRef.current === texts.length - 1;

        // ループしない、かつ最後のテキストなら処理を終了
        if (!loop && isLastText) {
          // 完了状態にして再帰を停止
          setIsDone(true);
          return;
        }

        // 継続する場合、duration待ってから次の処理へ
        timeoutRef.current = setTimeout(() => {
          textIndexRef.current = (textIndexRef.current + 1) % texts.length;
          charIndexRef.current = 0;
          setTextIndex(textIndexRef.current);
          setVisibleCount(0);
          type();
        }, duration);
        return;
      }

      charIndexRef.current += 1;
      setVisibleCount(charIndexRef.current);

      timeoutRef.current = setTimeout(type, typingSpeed);
    };

    if (texts.length > 0) {
      timeoutRef.current = setTimeout(type, delay);
    }

    // クリーンアップ時に表示と完了状態をリセットする
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setTextIndex(0);
      setVisibleCount(0);
      setIsDone(false);
      textIndexRef.current = 0;
      charIndexRef.current = 0;
    };
  }, [texts, delay, duration, typingSpeed, loop]);

  // 全文を最初から配置して打った分だけ見せ、改行位置や高さが打ち込み中に変わらないようにする
  const currentText = texts[textIndex] ?? "";
  // 複数のテキストを切り替える場合は、最も長いテキストの大きさを確保する
  const longestText = texts.reduce(
    (longest, text) => (text.length > longest.length ? text : longest),
    "",
  );

  return (
    <Component className={cn("grid text-xl", className)}>
      {/* 支援技術や検索エンジンには、アニメーションを待たずに全文を伝える */}
      <span className="sr-only">{texts.join(" ")}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longestText}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {currentText.slice(0, visibleCount)}
        {/* カーソルは幅を持たない要素に重ねて表示し、文字の配置を変えないようにする */}
        {cursorVisible && !isDone && (
          <span className="relative">
            <span className="absolute left-1 animate-blink">
              {cursorString}
            </span>
          </span>
        )}
        <span className="invisible">{currentText.slice(visibleCount)}</span>
      </span>
    </Component>
  );
};

export default Typewriter;
