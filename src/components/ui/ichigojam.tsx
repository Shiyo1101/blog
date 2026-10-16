import type { ClassValue } from "clsx";
import type { JSX } from "react";

import {
  IchigoJamCharacterOfCursor,
  type IJCharacterCode,
  IJCharacterCodes,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type IJTypographyProps = {
  children: React.ReactNode;
  className?: ClassValue;
  as?: keyof JSX.IntrinsicElements;
  addCursor?: boolean;
};

const IJTypography = ({
  children,
  className,
  as: Component = "div",
  addCursor = false,
}: IJTypographyProps) => (
  <Component
    className={cn("relative inline-block font-ichigojam text-base", className)}
  >
    {children}
    {addCursor && (
      <span className="absolute top-0 left-[93%] animate-blink">
        {IchigoJamCharacterOfCursor}
      </span>
    )}
  </Component>
);

type IJCharacterProps = {
  as?: keyof JSX.IntrinsicElements;
  characterCodes: string | string[];
  className?: ClassValue;
};

const isIJCharacterCode = (code: string): code is IJCharacterCode =>
  Object.hasOwn(IJCharacterCodes, code);

// 定義済みの文字コード名であれば対応する文字に変換し、それ以外はそのまま表示する
const toIJCharacter = (code: string) =>
  isIJCharacterCode(code) ? IJCharacterCodes[code] : code;

const IJCharacter = ({
  as = "div",
  characterCodes,
  className,
}: IJCharacterProps) => {
  if (characterCodes.length === 0) {
    return null;
  }

  if (typeof characterCodes === "string") {
    return (
      <IJTypography as={as} className={className}>
        {characterCodes}
      </IJTypography>
    );
  }

  return (
    <IJTypography as={as} className={className}>
      {characterCodes.map((code) => toIJCharacter(code)).join("")}
    </IJTypography>
  );
};

export { IJCharacter, IJTypography };
