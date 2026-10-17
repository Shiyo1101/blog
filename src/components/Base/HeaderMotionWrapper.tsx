"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

/** ヘッダーの表示・非表示の切り替え時間（秒）。トークンの duration.base（240ms）に合わせる */
const HEADER_TRANSITION_SECONDS = 0.24;

type Props = {
  children: React.ReactNode;
};

const HeaderMotionWrapper = ({ children }: Props) => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion() === true;
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // scrollYの変更を検知してヘッダーの表示/非表示を切り替える
  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollY.current;

    if (latest > 100 && delta > 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    lastScrollY.current = latest;
  });

  const headerVariants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 flex min-h-16 w-full items-center justify-between gap-4 border-b-4 border-border bg-background px-4 py-3 sm:px-10"
      variants={headerVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: prefersReducedMotion ? 0 : HEADER_TRANSITION_SECONDS,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.header>
  );
};

export default HeaderMotionWrapper;
