import type { ClassValue } from "clsx";
import { type ReactNode, useId } from "react";

import { cn } from "@/lib/utils";

type RetroWindowProps = {
  /** 左上のタブに表示する見出し */
  title: string;
  children: ReactNode;
  className?: ClassValue;
  /** 本文の余白などを調整するクラス */
  bodyClassName?: ClassValue;
};

/** ゲームのウィンドウ風の枠（STATUS / SELECT POST / MAP など） */
export const RetroWindow = ({
  title,
  children,
  className,
  bodyClassName,
}: RetroWindowProps) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "border-2 border-border bg-card text-card-foreground shadow-pixel-md",
        className,
      )}
    >
      <h2
        id={titleId}
        className="inline-block bg-border px-3 py-1.5 font-display text-base tracking-widest text-background"
      >
        {title}
      </h2>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
};
