"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const HeaderMotionWrapper = ({ children }: Props) => {
  const { scrollY } = useScroll();
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
      id="site-header"
      className="sticky top-0 flex items-center justify-between px-4 py-2 ring-4 ring-border h-16 w-full z-50 bg-background/70 backdrop-blur-sm"
      variants={headerVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.header>
  );
};

export default HeaderMotionWrapper;
