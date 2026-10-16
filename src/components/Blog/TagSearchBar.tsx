"use client";

import { SearchIcon, TagIcon, XIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TagSearchBarProps = {
  tags: string[];
  currentTag?: string;
};

const TagSearchBar = ({ tags, currentTag }: TagSearchBarProps) => {
  const [query, setQuery] = useState("");

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
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="タグを絞り込む..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
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
          <div className="flex max-h-60 flex-wrap gap-2 overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog/${tag}`}
                  className={`inline-block border px-2 py-0.5 text-xs transition-colors duration-150 ${
                    currentTag === tag
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary bg-primary/20 text-primary hover:bg-primary/40"
                  }`}
                >
                  #{tag}
                </a>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                タグが見つかりません
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagSearchBar;
