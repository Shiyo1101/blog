"use client";

import { SquareXIcon, TableOfContentsIcon } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useState, useEffect } from "react";

import type { MarkdownHeading } from "astro";

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

  useEffect(() => {
    const updateActiveId = () => {
      setActiveId(decodeURIComponent(window.location.hash));
    };

    updateActiveId();
    window.addEventListener("hashchange", updateActiveId);
    return () => {
      window.removeEventListener("hashchange", updateActiveId);
    };
  }, []);

  const filteredHeadings = headings.filter((h) => h.depth <= 2);

  const renderHeadings = () => {
    return (
      <motion.ul className="space-y-2" variants={retroMenuVariants}>
        {filteredHeadings.map((heading) => {
          const isActive = activeId === `#${heading.slug}`;
          const linkClasses = `hover:text-accent/80 transition-colors ${isActive ? "not-prose max-md:underline font-bold text-accent" : ""}`;
          const marginLeftClass = `ml-${(heading.depth - 1) * 4}`;

          return (
            <motion.li
              key={heading.slug}
              className={marginLeftClass}
              variants={retroListItemVariants}
            >
              <a href={`#${heading.slug}`} className={linkClasses}>
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
      <div className="border rounded-lg overflow-hidden">
        <button
          className="p-4 w-full font-bold cursor-pointer text-secondary flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
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
              variants={retroMenuVariants}
            >
              {renderHeadings()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <nav>
      <h2 className="text-lg font-bold mb-4 text-secondary flex items-center gap-2">
        <TableOfContentsIcon />
        目次
      </h2>
      {renderHeadings()}
    </nav>
  );
};

export default TableOfContents;
