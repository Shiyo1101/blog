"use client";

import { SearchIcon, TagIcon, XIcon } from "lucide-react";
import { useId, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type TagSearchBarProps = {
  tags: string[];
  currentTag?: string;
};

const TagSearchBar = ({ tags, currentTag }: TagSearchBarProps) => {
  const [query, setQuery] = useState("");
  const searchInputId = useId();

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setQuery("");
        }
      }}
    >
      <DialogTrigger
        render={
          <button
            type="button"
            className="mx-auto flex w-full max-w-3xl items-center gap-2 border-2 border-card-foreground bg-card px-3 py-2 text-xs font-bold tracking-wide transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground"
          >
            <TagIcon size={12} />
            <span className="font-ichigojam">SEARCH BY TAG</span>
            <span className="ml-auto font-normal text-muted-foreground">
              {tags.length}件
            </span>
          </button>
        }
      />

      <DialogContent
        showCloseButton={false}
        className="max-w-md gap-0 rounded-none border-4 border-card-foreground bg-card p-0 shadow-[4px_4px_0_0] max-md:max-w-4/5"
      >
        {/* ヘッダー */}
        <DialogHeader className="gap-0 border-b-2 border-card-foreground bg-primary px-4 py-2">
          <DialogTitle className="flex items-center gap-2 font-ichigojam text-sm font-bold tracking-widest text-primary-foreground">
            <TagIcon size={13} />
            SEARCH BY TAG
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4">
          {/* 検索入力 */}
          <div className="flex items-center gap-2 border-2 border-card-foreground bg-background px-3 py-2">
            <SearchIcon size={13} className="shrink-0 text-muted-foreground" />
            <label htmlFor={searchInputId} className="sr-only">
              タグを絞り込む
            </label>
            <input
              id={searchInputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="タグを絞り込む..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="クリア"
              >
                <XIcon
                  size={13}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                />
              </button>
            )}
          </div>

          {/* タグ一覧 */}
          {filteredTags.length > 0 ? (
            <ul className="flex max-h-60 list-none flex-wrap gap-2 overflow-y-auto">
              {filteredTags.map((tag) => (
                <li key={tag}>
                  <a
                    href={`/blog/${tag}`}
                    aria-current={currentTag === tag ? "page" : undefined}
                    className={cn(
                      "inline-block border border-primary px-2 py-0.5 text-xs transition-colors duration-150",
                      currentTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/20 text-primary hover:bg-primary/40",
                    )}
                  >
                    #{tag}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">
              タグが見つかりません
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagSearchBar;
