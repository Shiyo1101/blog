"use client";

import { SquareXIcon, TableOfContentsIcon } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

import type { MarkdownHeading } from "astro";

type TocProps = {
  headings: MarkdownHeading[];
  isMobile?: boolean;
};

const TableOfContents = ({ headings, isMobile = false }: TocProps) => {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);
  const isUserInteractionRef = useRef(false);

  const filteredHeadings = headings.filter((h) => h.depth <= 2);

  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const headingElements: Element[] = [];

    filteredHeadings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        headingElements.push(element);
      }
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isUserInteractionRef.current || isScrollingRef.current) {
          return;
        }

        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top
              ? prev
              : current;
          });

          setActiveId(`#${topEntry.target.id}`);
          if (window.location.hash !== `#${topEntry.target.id}`) {
            history.replaceState(null, "", `#${topEntry.target.id}`);
          }
        }
      },
      {
        rootMargin: "-20% 0% -70% 0%",
        threshold: [0, 0.5, 1.0],
      },
    );

    headingElements.forEach((element) => {
      observerRef.current?.observe(element);
    });
  }, [filteredHeadings]);

  const initializeActiveId = useCallback(() => {
    const hash = window.location.hash;
    if (hash) {
      const decodedHash = decodeURIComponent(hash);
      setActiveId(decodedHash);
    } else if (filteredHeadings.length > 0) {
      setActiveId(`#${filteredHeadings[0].slug}`);
    }
  }, [filteredHeadings]);

  useEffect(() => {
    initializeActiveId();

    const setupTimer = setTimeout(() => {
      setupObserver();
    }, 500);

    const handlePageLoad = () => {
      initializeActiveId();
      setTimeout(() => {
        setupObserver();
      }, 500);
    };

    document.addEventListener("astro:page-load", handlePageLoad);

    return () => {
      clearTimeout(setupTimer);
      document.removeEventListener("astro:page-load", handlePageLoad);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [initializeActiveId, setupObserver]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    e.preventDefault();

    isUserInteractionRef.current = true;
    isScrollingRef.current = true;

    try {
      const element = document.getElementById(slug);
      if (element) {
        setActiveId(`#${slug}`);

        element.scrollIntoView({ behavior: "smooth", block: "start" });

        history.pushState(null, "", `#${slug}`);

        setTimeout(() => {
          isUserInteractionRef.current = false;
          isScrollingRef.current = false;
        }, 1000);
      }
    } catch (error) {
      console.warn("Failed to navigate to heading:", error);
      isUserInteractionRef.current = false;
      isScrollingRef.current = false;
    }
  };

  const renderHeadings = () => {
    return (
      <ul className="space-y-2">
        {filteredHeadings.map((heading) => {
          const isActive = activeId === `#${heading.slug}`;
          const linkClasses = `block py-1 hover:text-accent/80 transition-colors ${
            isActive
              ? "font-bold text-accent border-l-4 border-accent pl-2 -ml-2"
              : "hover:pl-2 hover:-ml-2"
          }`;
          const marginLeftClass = heading.depth === 2 ? "ml-4" : "";

          return (
            <li key={heading.slug} className={marginLeftClass}>
              <a
                href={`#${heading.slug}`}
                className={linkClasses}
                onClick={(e) => handleLinkClick(e, heading.slug)}
                aria-current={isActive ? "location" : undefined}
              >
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
      <div className="border rounded-lg overflow-hidden">
        <button
          className="p-4 w-full font-bold cursor-pointer text-secondary flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-toc"
        >
          <div
            className="transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
          >
            {isOpen ? <SquareXIcon /> : <TableOfContentsIcon />}
          </div>
          目次
        </button>
        {isOpen && (
          <div
            id="mobile-toc"
            className="p-4 border-t"
            style={{
              animation: "slideDown 0.3s ease-out forwards",
            }}
          >
            {renderHeadings()}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav aria-label="目次">
      <h2 className="text-lg font-bold mb-4 text-secondary flex items-center gap-2">
        <TableOfContentsIcon />
        目次
      </h2>
      {renderHeadings()}
    </nav>
  );
};

export default TableOfContents;
