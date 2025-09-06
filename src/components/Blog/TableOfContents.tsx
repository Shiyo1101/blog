"use client";

import { TableOfContentsIcon } from "lucide-react";
import { useState, useEffect } from "react";

import type { MarkdownHeading } from "astro";

type TocProps = {
  headings: MarkdownHeading[];
  isMobile?: boolean;
};

const TableOfContents = ({ headings, isMobile = false }: TocProps) => {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(!isMobile);

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
      <ul className="space-y-2">
        {filteredHeadings.map((heading) => {
          const isActive = activeId === `#${heading.slug}`;
          const linkClasses = `hover:text-accent/80 ${isActive ? "font-bold text-accent" : ""}`;
          const marginLeftClass = `ml-${(heading.depth - 1) * 4}`;

          return (
            <li key={heading.slug} className={marginLeftClass}>
              <a href={`#${heading.slug}`} className={linkClasses}>
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  if (isMobile) {
    return (
      <details className="border rounded-lg">
        <summary
          className="p-4 font-bold cursor-pointer list-none text-secondary flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <TableOfContentsIcon />
          目次
        </summary>
        <div className="p-4 border-t">{renderHeadings()}</div>
      </details>
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
