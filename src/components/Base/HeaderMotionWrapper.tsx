import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  isTopPage: boolean;
};

const HeaderMotionWrapper = ({ children, isTopPage }: Props) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // scrollYの変更を検知してヘッダーの表示/非表示を切り替える
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isTopPage) return;

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
      className={`flex items-center justify-between p-2 border-4 h-16 w-full z-50 bg-background/70 backdrop-blur-sm ${
        isTopPage ? "fixed" : "sticky top-0"
      }`}
      variants={headerVariants}
      animate={isTopPage ? "visible" : hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.header>
  );
};

export default HeaderMotionWrapper;
