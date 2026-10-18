import type { MarkdownHeading } from "astro";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { useEffect, useId, useState, useSyncExternalStore } from "react";

import { RetroWindow } from "@/components/ui/retro-window";
import { cn } from "@/lib/utils";

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

/** 目次に表示する見出しの最小レベル */
const MIN_TOC_DEPTH = 2;
/** 目次に表示する見出しの最大レベル */
const MAX_TOC_DEPTH = 3;

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
  const contentId = useId();
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

  // 記事タイトルが h1 のため、本文の h2・h3 を目次に表示する
  const filteredHeadings = headings.filter(
    (h) => h.depth >= MIN_TOC_DEPTH && h.depth <= MAX_TOC_DEPTH,
  );

  const renderHeadings = () => (
    <motion.ul
      className="not-prose list-none space-y-0.5"
      variants={retroMenuVariants}
    >
      {filteredHeadings.map((heading) => {
        const isActive = activeId === `#${heading.slug}`;

        return (
          <motion.li
            key={heading.slug}
            className={cn("list-none", heading.depth > MIN_TOC_DEPTH && "ml-4")}
            variants={retroListItemVariants}
          >
            <a
              href={`#${heading.slug}`}
              className={cn(
                "group flex items-start gap-2 px-2 py-1.5 text-sm transition-colors duration-150 hover:bg-inset",
                isActive
                  ? "bg-inset text-foreground-strong"
                  : "text-muted-foreground hover:text-foreground-strong",
              )}
              aria-current={isActive ? "location" : undefined}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "font-display text-success",
                  !isActive && "opacity-0",
                )}
              >
                ▶
              </span>
              {heading.text}
            </a>
          </motion.li>
        );
      })}
    </motion.ul>
  );

  if (isMobile) {
    return (
      <div>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-between gap-2 border-2 border-border bg-card px-4 py-3 font-display shadow-pixel-sm transition-colors duration-150 hover:bg-secondary-hover"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          {isOpen ? "MAP — 目次を閉じる" : "MAP — 目次を開く"}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: isTransitioning ? 0 : 0.24 }}
          >
            ▼
          </motion.span>
        </button>
        <div id={contentId}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mt-2 border-2 border-border bg-card p-2"
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
      </div>
    );
  }

  return (
    <RetroWindow
      as="nav"
      title="MAP"
      className="sticky top-24"
      bodyClassName="p-2"
    >
      {renderHeadings()}
    </RetroWindow>
  );
};

export default TableOfContents;
