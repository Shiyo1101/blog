"use client";

import { type KeyboardEvent, useId, useState } from "react";

import { tagVariants } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

type TagSearchBarProps = {
  tags: string[];
  currentTag?: string;
};

const ALL_POSTS_PATH = "/blog";

const tagPath = (tag: string) => `${ALL_POSTS_PATH}/${tag}`;

/** タグをその場で絞り込み、Enter で先頭のタグのページへ移動する */
const TagSearchBar = ({ tags, currentTag }: TagSearchBarProps) => {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const helpId = useId();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(normalizedQuery),
  );
  const hasNoMatch = normalizedQuery !== "" && filteredTags.length === 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setQuery("");
      return;
    }
    const [firstTag] = filteredTags;
    if (event.key === "Enter" && normalizedQuery !== "" && firstTag) {
      globalThis.location.assign(tagPath(firstTag));
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
      <div className="w-full max-w-xs space-y-1.5">
        <label htmlFor={inputId} className="block font-display text-sm">
          タグで絞り込む
        </label>
        <div
          className={cn(
            "flex items-center gap-2 border-2 bg-card px-3 py-2 transition-shadow duration-150 focus-within:shadow-focus hover:shadow-pixel-sm focus-within:hover:shadow-focus",
            hasNoMatch ? "border-destructive" : "border-border-default",
          )}
        >
          <span aria-hidden="true" className="font-ichigojam text-success">
            &gt;
          </span>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="キーワードを入力"
            aria-describedby={helpId}
            aria-invalid={hasNoMatch}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-foreground-strong outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
          />
        </div>
        <p
          id={helpId}
          aria-live="polite"
          className={cn(
            "text-sm",
            hasNoMatch ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {hasNoMatch
            ? "⚠ 該当するタグがありません。別のキーワードを試してください。"
            : "Enter で先頭のタグへ移動 / Esc でクリア"}
        </p>
      </div>

      <ul aria-label="タグ一覧" className="flex flex-wrap gap-2 pt-7">
        <li>
          <a
            href={ALL_POSTS_PATH}
            aria-current={currentTag === undefined ? "page" : undefined}
            className={tagVariants({ selected: currentTag === undefined })}
          >
            {currentTag === undefined ? "✓ すべて" : "すべて"}
          </a>
        </li>
        {filteredTags.map((tag) => (
          <li key={tag}>
            <a
              href={tagPath(tag)}
              aria-current={currentTag === tag ? "page" : undefined}
              className={tagVariants({ selected: currentTag === tag })}
            >
              {currentTag === tag ? `✓ #${tag}` : `#${tag}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagSearchBar;
