"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** この位置（px）より下で下方向にスクロールしたらヘッダーを隠す */
const HIDE_THRESHOLD_PX = 100;

type Props = {
  children: React.ReactNode;
};

// アニメーションライブラリを読み込まずに済むよう、表示の切り替えは CSS の transition で行う
const HeaderMotionWrapper = ({ children }: Props) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let frameId = 0;

    // スクロール量の変化から、ヘッダーの表示/非表示を切り替える
    const update = () => {
      const latest = globalThis.scrollY;
      const delta = latest - lastScrollY.current;
      setHidden(latest > HIDE_THRESHOLD_PX && delta > 0);
      lastScrollY.current = latest;
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    globalThis.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex min-h-16 w-full items-center justify-between gap-4 border-b-4 border-border bg-background px-4 py-3 transition-transform duration-240 ease-out motion-reduce:transition-none sm:px-10",
        hidden && "-translate-y-full",
      )}
    >
      {children}
    </header>
  );
};

export default HeaderMotionWrapper;
