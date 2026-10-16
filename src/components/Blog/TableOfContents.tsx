"use client";

import type { MarkdownHeading } from "astro";
import { List, SquareXIcon, TableOfContentsIcon } from "lucide-react";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

type TocProps = {
  headings: MarkdownHeading[];
  isMobile?: boolean;
};

const retroMenuVariants: Variants = {
  hidden: {
    clipPath: "inset(0 100% 100% 0)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "anticipate",
    },
  },
  visible: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      delayChildren: stagger(0.05),
    },
  },
};

const retroListItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

/** ページ内リンクのクリック後、ハッシュの更新を待つ時間（ms） */
const HASH_UPDATE_DELAY_MS = 50;

// URL のハッシュを外部ストアとして購読する
const subscribeLocationHash = (onChange: () => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  // View Transition 中はハッシュ変更イベントが発火しない場合があるため、ページ内リンクのクリックも監視する
  const handleClick = (e: MouseEvent) => {
    if (
      e.target instanceof Element &&
      e.target.closest('a[href^="#"]') !== null
    ) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onChange, HASH_UPDATE_DELAY_MS);
    }
  };

  globalThis.addEventListener("hashchange", onChange);
  document.addEventListener("astro:after-swap", onChange);
  document.addEventListener("click", handleClick);

  return () => {
    clearTimeout(timeoutId);
    globalThis.removeEventListener("hashchange", onChange);
    document.removeEventListener("astro:after-swap", onChange);
    document.removeEventListener("click", handleClick);
  };
};

const getLocationHash = () => decodeURIComponent(globalThis.location.hash);

// サーバーではハッシュを取得できないため、未選択として描画する
const getServerLocationHash = () => "";

const TableOfContents = ({ headings, isMobile = false }: TocProps) => {
  const activeId = useSyncExternalStore(
    subscribeLocationHash,
    getLocationHash,
    getServerLocationHash,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ViewTransitionの検知
  useEffect(() => {
    const handleViewTransitionStart = () => setIsTransitioning(true);
    const handleViewTransitionEnd = () => setIsTransitioning(false);

    document.addEventListener("astro:before-swap", handleViewTransitionStart);
    document.addEventListener("astro:after-swap", handleViewTransitionEnd);

    return () => {
      document.removeEventListener(
        "astro:before-swap",
        handleViewTransitionStart,
      );
      document.removeEventListener("astro:after-swap", handleViewTransitionEnd);
    };
  }, []);

  const filteredHeadings = headings.filter((h) => h.depth <= 2);

  const renderHeadings = () => (
    <motion.ul
      className="not-prose list-none space-y-2 pl-2 text-foreground"
      variants={retroMenuVariants}
    >
      {filteredHeadings.map((heading) => {
        const isActive = activeId === `#${heading.slug}`;
        const linkClasses = `block py-1 transition-colors no-underline ${
          isActive
            ? "font-bold text-accent border-l-4 border-accent pl-2 -ml-2 bg-accent/10"
            : "hover:text-accent hover:pl-2 hover:-ml-2"
        }`;
        const marginLeftClass = heading.depth === 2 ? "ml-4" : "";

        return (
          <motion.li
            key={heading.slug}
            className={`${marginLeftClass} list-none`}
            variants={retroListItemVariants}
          >
            <a
              href={`#${heading.slug}`}
              className={linkClasses}
              aria-current={isActive ? "location" : undefined}
            >
              {heading.text}
            </a>
          </motion.li>
        );
      })}
    </motion.ul>
  );

  if (isMobile) {
    return (
      <div className="overflow-hidden border-2 bg-card">
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 border-b-2 p-4 text-lg font-bold text-secondary transition-colors hover:bg-accent/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="toc-content"
        >
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: isTransitioning ? 0 : 0.3 }}
          >
            {isOpen ? <SquareXIcon /> : <TableOfContentsIcon />}
          </motion.span>
          目次
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="p-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={isTransitioning ? {} : retroMenuVariants}
              transition={{ duration: isTransitioning ? 0 : undefined }}
            >
              {renderHeadings()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <nav className="sticky top-20">
      <div className="border-2 bg-card p-4">
        <h2 className="mb-4 flex items-center gap-2 border-b-2 pb-2 text-lg font-bold text-secondary">
          <List size={20} />
          目次
        </h2>
        {renderHeadings()}
      </div>
    </nav>
  );
};

export default TableOfContents;
