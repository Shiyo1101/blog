import type { ClassValue } from "clsx";
import type { JSX } from "react";

import { IchigoJamCharacterOfCursor, IJCharacterCodes } from "@/lib/constants";
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
}: IJTypographyProps) => {
  return (
    <Component
      className={cn(
        "font-ichigojam relative inline-block text-base",
        className,
      )}
    >
      {children}
      {addCursor && (
        <span className="absolute left-[93%] top-0 animate-blink">
          {IchigoJamCharacterOfCursor}
        </span>
      )}
    </Component>
  );
};

type IJCharacterProps = {
  as?: keyof JSX.IntrinsicElements;
  characterCodes: string | string[];
  className?: ClassValue;
};

const IJCharacter = ({
  as = "div",
  characterCodes,
  className,
}: IJCharacterProps) => {
  if (!characterCodes || characterCodes.length === 0) {
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
      {characterCodes.map((code, index) => (
        <span key={index}>
          {IJCharacterCodes[code as keyof typeof IJCharacterCodes] || code}
        </span>
      ))}
    </IJTypography>
  );
};

export { IJTypography, IJCharacter };
