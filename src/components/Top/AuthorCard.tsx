"use client";

import { BookOpenTextIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { IJCharacter } from "@/components/ui/ichigojam";
import { IJCharacterCodes } from "@/lib/constants";

const AuthorCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="relative bg-card border-4 border-card-foreground p-4 sm:p-6">
        <div className="bg-accent border-2 border-card-foreground -mx-2 -mt-2 px-3 py-1 mb-4">
          <IJCharacter
            as="h3"
            className="text-accent-foreground text-xs"
            characterCodes="ABOUT THE CREATOR"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div
            className="flex-shrink-0 mx-auto sm:mx-0"
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
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 border-4 border-primary flex items-center justify-center cursor-pointer">
              <IJCharacter
                className="text-5xl sm:text-6xl"
                characterCodes={IJCharacterCodes.Cat}
              />
            </div>
          </motion.div>
          <div className="flex-1 space-y-3">
            <div className="bg-background border-2 border-card-foreground p-2">
              <div className="font-bold text-base sm:text-lg">
                うっちー（Yoshiki Uchida）
              </div>
            </div>
            <div className="bg-background border-2 border-card-foreground p-2">
              <p className="text-xs sm:text-sm leading-relaxed mt-1">
                福井県鯖江市に生まれたWebエンジニア。
                高校生の時に子供向けパソコンであるIchigoJamで
                プログラミングを初めて学ぶ。 趣味はツーリングとゲーム。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.span
                className="inline-block px-2 py-1 text-xs bg-primary shadow-[2px_2px_0_0] shadow-primary/50 text-primary-foreground border-2 border-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⭐ IchigoJam検定1級
              </motion.span>
              <motion.span
                className="inline-block px-2 py-1 text-xs bg-secondary shadow-[2px_2px_0_0] shadow-secondary/50 text-secondary-foreground border-2 border-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📚 技術書執筆
              </motion.span>
            </div>
            <motion.div
              className="bg-accent/10 border-2 border-accent p-2 cursor-pointer"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-1 text-accent font-bold text-xs sm:text-sm mb-1">
                <BookOpenTextIcon size={16} />
                <span>PUBLICATION</span>
              </div>
              <p className="text-xs sm:text-sm font-bold">
                「FOR文と配列にチャレンジする
                <br className="sm:hidden" />
                Hana道場式プログラミング」
              </p>
              <a
                href="https://hanadojo.official.ec/items/90694010"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-primary hover:text-primary/80 mt-1 max-md:underline md:hover:underline"
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
