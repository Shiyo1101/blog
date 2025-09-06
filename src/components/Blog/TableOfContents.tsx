"use client";

import { TableOfContentsIcon } from "lucide-react";
import { useState } from "react";

import type { MarkdownHeading } from "astro";

type TocProps = {
  headings: MarkdownHeading[];
  isMobile?: boolean;
};

const TableOfContents = ({ headings, isMobile = false }: TocProps) => {
  const [isOpen, setIsOpen] = useState(!isMobile);

  const filteredHeadings = headings.filter((h) => h.depth <= 2);

  const renderHeadings = () => (
    <ul className="space-y-2">
      {filteredHeadings.map((heading) => (
        <li key={heading.slug} className={`ml-${(heading.depth - 1) * 4}`}>
          <a
            href={`#${heading.slug}`}
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
