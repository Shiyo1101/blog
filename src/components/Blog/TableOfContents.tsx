"use client";

import type { MarkdownHeading } from "astro";
import { List, SquareXIcon, TableOfContentsIcon } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

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
      staggerChildren: 0.05,
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

const TableOfContents = ({ headings, isMobile = false }: TocProps) => {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    setIsClient(true);

    // ViewTransitionの検知
    const handleViewTransitionStart = () => setIsTransitioning(true);
    const handleViewTransitionEnd = () => setIsTransitioning(false);

    document.addEventListener("astro:before-swap", handleViewTransitionStart);
    document.addEventListener("astro:after-swap", handleViewTransitionEnd);

    // 初期ハッシュを設定
    const hash = window.location.hash;
    if (hash) {
      setActiveId(decodeURIComponent(hash));
    }

    // ハッシュ変更の監視
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setActiveId(newHash ? decodeURIComponent(newHash) : "");
    };

    // クリックイベントの監視（View Transition対応）
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute("href");
        if (href) {
          // 少し遅延させてハッシュを更新
          setTimeout(() => {
            setActiveId(decodeURIComponent(href));
          }, 50);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleClick);

    // View Transition後の再設定
    const handleAfterSwap = () => {
      const currentHash = window.location.hash;
      if (currentHash) {
        setActiveId(decodeURIComponent(currentHash));
      }
    };

    document.addEventListener("astro:after-swap", handleAfterSwap);

    return () => {
      document.removeEventListener(
        "astro:before-swap",
        handleViewTransitionStart,
      );
      document.removeEventListener("astro:after-swap", handleViewTransitionEnd);
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("astro:after-swap", handleAfterSwap);
    };
  }, []);

  const filteredHeadings = headings.filter((h) => h.depth <= 2);

  const handleLinkClick = (
    _e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    // ハッシュを即座に更新
    setActiveId(`#${slug}`);

    // モバイルの場合は目次を閉じる
    if (isMobile) {
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const renderHeadings = () => {
    return (
      <motion.ul className="space-y-2" variants={retroMenuVariants}>
        {filteredHeadings.map((heading) => {
          const isActive = isClient && activeId === `#${heading.slug}`;
          const linkClasses = `block py-1 hover:text-accent transition-colors list-none ${
            isActive
              ? "font-bold text-accent border-l-4 border-accent pl-2 -ml-2 bg-accent/10"
              : "hover:pl-2 hover:-ml-2"
          }`;
          const marginLeftClass = heading.depth === 2 ? "ml-4" : "";

          return (
            <motion.li
              key={heading.slug}
              className={marginLeftClass}
              variants={retroListItemVariants}
            >
              <a
                href={`#${heading.slug}`}
                className={linkClasses}
                onClick={(e) => handleLinkClick(e, heading.slug)}
                aria-current={isActive ? "location" : undefined}
              >
                {heading.text}
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    );
  };

  if (isMobile) {
    return (
      <div className="border-2 bg-card overflow-hidden">
        <button
          type="button"
          className="p-4 w-full font-bold cursor-pointer text-secondary flex items-center gap-2 hover:bg-accent/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="toc-content"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: isTransitioning ? 0 : 0.3 }}
          >
            {isOpen ? <SquareXIcon /> : <TableOfContentsIcon />}
          </motion.div>
          目次
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="p-4 border-t"
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
        <h2 className="text-lg font-bold mb-4 text-secondary flex items-center gap-2 border-b-2 pb-2">
          <List size={20} />
          目次
        </h2>
        {renderHeadings()}
      </div>
    </nav>
  );
};

export default TableOfContents;
