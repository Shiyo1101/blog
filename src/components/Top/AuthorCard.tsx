"use client";

import { BookOpenTextIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { IJCharacter, IJTypography } from "@/components/ui/ichigojam";
import { IJCharacterCodes } from "@/lib/constants";

const AuthorCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="relative border-4 border-card-foreground bg-card p-4 sm:p-6">
        <div className="-mx-2 -mt-2 mb-4 border-2 border-card-foreground bg-accent px-3 py-1">
          <IJTypography as="h2" className="text-xs text-accent-foreground">
            ABOUT THE CREATOR
          </IJTypography>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <motion.div
            className="mx-auto flex-shrink-0 sm:mx-0"
            animate={{
              y: isHovered ? [-2, 2, -2] : 0,
            }}
            transition={{
              duration: 1,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex h-24 w-24 cursor-pointer items-center justify-center border-4 border-primary bg-primary/20 sm:h-32 sm:w-32">
              <IJCharacter
                className="text-5xl sm:text-6xl"
                characterCodes={IJCharacterCodes.Cat}
              />
            </div>
          </motion.div>
          <div className="flex-1 space-y-3">
            <div className="border-2 border-card-foreground bg-background p-2">
              <div className="text-base font-bold sm:text-lg">
                うっちー（Yoshiki Uchida）
              </div>
            </div>
            <div className="border-2 border-card-foreground bg-background p-2">
              <p className="mt-1 text-xs leading-relaxed sm:text-sm">
                福井県鯖江市出身のWebアプリケーションエンジニア。趣味はツーリングとゲーム。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.span
                className="inline-block border-2 border-primary bg-primary px-2 py-1 text-xs text-primary-foreground shadow-[2px_2px_0_0] shadow-primary/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⭐ IchigoJam検定1級
              </motion.span>
              <motion.span
                className="inline-block border-2 border-secondary bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow-[2px_2px_0_0] shadow-secondary/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📚 技術書執筆
              </motion.span>
            </div>
            <motion.div
              className="cursor-pointer border-2 border-accent bg-accent/10 p-2"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mb-1 flex items-center gap-1 text-xs font-bold text-accent sm:text-sm">
                <BookOpenTextIcon size={16} />
                <span>書籍</span>
              </div>
              <p className="text-xs font-bold sm:text-sm">
                「FOR文と配列にチャレンジする Hana道場式プログラミング」
              </p>
              <a
                href="https://hanadojo.official.ec/items/90694010"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-primary hover:text-primary/80 max-md:underline md:hover:underline"
              >
                → 購入はこちらから
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
