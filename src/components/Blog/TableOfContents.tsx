"use client";

import { useState } from "react";

import type { MarkdownHeading } from "astro";

interface TocProps {
  headings: MarkdownHeading[];
  isMobile?: boolean;
}

const TableOfContents: React.FC<TocProps> = ({
  headings,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(!isMobile);

  const filteredHeadings = headings.filter((h) => h.depth <= 2);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(slug);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderHeadings = () => (
    <ul className="space-y-2">
      {filteredHeadings.map((heading) => (
        <li key={heading.slug} className={`ml-${(heading.depth - 1) * 4}`}>
          <a
            href={`#${heading.slug}`}
            onClick={(e) => handleScroll(e, heading.slug)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (isMobile) {
    return (
      <details className="border rounded-lg">
        <summary
          className="p-4 font-bold cursor-pointer list-none text-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          目次
        </summary>
        <div className="p-4 border-t">{renderHeadings()}</div>
      </details>
    );
  }

  return (
    <nav>
      <h2 className="text-lg font-bold mb-4 text-secondary">目次</h2>
      {renderHeadings()}
    </nav>
  );
};

export default TableOfContents;
