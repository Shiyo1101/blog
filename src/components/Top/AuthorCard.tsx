"use client";

import { BookOpenTextIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { IJCharacter } from "@/components/ui/ichigojam";
import { RetroWindow } from "@/components/ui/retro-window";
import { tagVariants } from "@/components/ui/tag";
import { IJCharacterCodes } from "@/lib/constants";

const SKILLS = ["⭐ IchigoJam検定1級", "📚 技術書執筆"];

const AuthorCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion() === true;
  const isBobbing = isHovered && !prefersReducedMotion;

  return (
    <RetroWindow title="STATUS" className="w-full">
      <div className="flex flex-col gap-5 sm:flex-row">
        <motion.div
          className="mx-auto shrink-0 sm:mx-0"
          animate={{ y: isBobbing ? [-2, 2, -2] : 0 }}
          transition={{
            duration: 1,
            repeat: isBobbing ? Infinity : 0,
            ease: "easeInOut",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex size-24 items-center justify-center border-2 border-border bg-screen text-screen-foreground">
            <IJCharacter
              className="text-5xl"
              characterCodes={IJCharacterCodes.Cat}
            />
          </div>
        </motion.div>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="font-display text-xl text-foreground-strong">
            うっちー（Yoshiki Uchida）
          </p>
          <p className="text-sm leading-relaxed">
            福井県鯖江市出身のWebアプリケーションエンジニア。趣味はツーリングとゲーム。
          </p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {SKILLS.map((skill) => (
              <li key={skill} className={tagVariants()}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-5 space-y-1.5 bg-muted p-3">
        <p className="flex items-center gap-1.5 font-display text-sm text-muted-foreground">
          <BookOpenTextIcon size={16} aria-hidden="true" />
          書籍
        </p>
        <p className="text-foreground-strong">
          「FOR文と配列にチャレンジする Hana道場式プログラミング」
        </p>
        <a
          href="https://hanadojo.official.ec/items/90694010"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-link underline underline-offset-4 hover:decoration-2"
        >
          → 購入はこちらから
        </a>
      </div>
    </RetroWindow>
  );
};

export default AuthorCard;
